const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const source = readFileSync(join(__dirname, '../extension/textamisu-api.js'), 'utf8');
const TOKEN = 'pt_sk_test_credential';

function setup(responses = [], protocol = 'chrome-extension:') {
  const local = {}, session = { ytmaruTextamisuToken: TOKEN }, calls = [], access = [];
  const store = (values, name) => ({
    get: async key => ({ [key]: values[key] }),
    set: async input => Object.assign(values, input),
    remove: async key => { delete values[key]; },
    setAccessLevel: async value => { access.push({ name, ...value }); },
  });
  const context = vm.createContext({
    location: { protocol }, chrome: { runtime: { id: 'test-extension' }, storage: { local: store(local, 'local'), session: store(session, 'session') } },
    URL, Blob, FormData, AbortController, DOMException, setTimeout, clearTimeout, Date,
    fetch: async (url, init) => {
      calls.push({ url, ...init });
      const next = responses.shift();
      if (!next) throw new Error('Unexpected request');
      if (next instanceof Error) throw next;
      if (typeof next === 'function') return next(url, init);
      return new Response(JSON.stringify(next.body ?? {}), { status: next.status || 200, headers: { 'Content-Type': 'application/json', 'Retry-After': '0.001' } });
    },
  });
  vm.runInContext(source, context);
  return { api: context.TextamisuApi, local, session, calls, access };
}

test('credential stays in trusted session storage; only base URL persists', async () => {
  const { api, local, session, access } = setup();
  const value = await api.saveConfig({ token: TOKEN, baseUrl: 'https://textamisu.com/api/agent/v1/' });
  assert.equal(value.configured, true);
  assert.equal(JSON.stringify(local).includes(TOKEN), false);
  assert.equal(session.ytmaruTextamisuToken, TOKEN);
  assert.deepEqual(access, [{ name: 'session', accessLevel: 'TRUSTED_CONTEXTS' }]);
  await api.clearToken();
  assert.equal((await api.getConfig()).token, '');
  assert.equal(local.ytmaruTextamisuApi.baseUrl, 'https://textamisu.com/api/agent/v1');
});

test('webpage/content context cannot access credentials', async () => {
  const { api, calls } = setup([], 'https:');
  await assert.rejects(api.getConfig(), /trusted extension/);
  await assert.rejects(api.credits(), /trusted extension/);
  assert.equal(calls.length, 0);
});

test('base URL validation rejects insecure hosts and embedded credentials', async () => {
  const { api } = setup();
  assert.throws(() => api.normalizeBaseUrl('http://example.com/api'), /HTTPS/);
  assert.throws(() => api.normalizeBaseUrl('https://user:password@example.com/api'), /HTTPS/);
  assert.throws(() => api.normalizeBaseUrl('https://example.com/api?token=abc'), /HTTPS/);
  assert.equal(api.normalizeBaseUrl('http://localhost:8787/api/'), 'http://localhost:8787/api');
  await assert.rejects(api.saveConfig({ token: 'not-an-api-token' }), /pt_sk_/);
});

test('202 polls operation without resubmitting an accepted POST', async () => {
  const { api, calls } = setup([
    { status: 202, body: { state: 'pending' } },
    { status: 202, body: { state: 'pending' } },
    { body: { state: 'completed', result: { translation: '你好' }, billing: { usedMinutes: 0.01 } } },
  ]);
  const result = await api.translate('session-a', { requestId: 'request-a', sttRequestIds: ['stt-a'], text: 'Hello', sourceLanguage: 'eng', targetLanguage: 'zh' });
  assert.equal(result.translation, '你好');
  assert.equal(result.billing.usedMinutes, 0.01);
  assert.deepEqual(calls.map(call => call.method), ['POST', 'GET', 'GET']);
  assert.ok(calls.slice(1).every(call => call.url.endsWith('/live-sessions/session-a/operations/request-a')));
  assert.equal(JSON.parse(calls[0].body).targetLanguage, 'zh-TW');
  assert.equal(calls[0].headers.Authorization, `Bearer ${TOKEN}`);
  assert.equal(calls[0].credentials, 'omit');
  assert.equal(calls[0].redirect, 'error');
  assert.equal(calls[0].body.includes(TOKEN), false);
});

test('STT-reference contention retries exact request ID and body', async () => {
  const { api, calls } = setup([
    { status: 409, body: { error: '這段語音正在翻譯', code: 'stt_translation_busy' } },
    { body: { translation: '早安' } },
  ]);
  const result = await api.translate('s', { requestId: 'stable-id', sttRequestIds: ['stt-1'], text: 'Morning', sourceLanguage: 'eng', targetLanguage: 'zh' });
  assert.equal(result.translation, '早安');
  assert.equal(calls.length, 2);
  assert.equal(calls[0].body, calls[1].body);
  assert.equal(JSON.parse(calls[1].body).requestId, 'stable-id');
});

test('lost POST response recovers the accepted operation with only one charge-producing request', async () => {
  const { api, calls } = setup([
    new TypeError('Connection lost after submission'),
    { status: 202, body: { state: 'pending' } },
    { body: { state: 'succeeded', translation: '你好', billing: { chargedCredits: 1 } } },
  ]);
  const result = await api.translate('s', { requestId: 'lost-response', sttRequestIds: ['stt-1'], text: 'Hello', sourceLanguage: 'eng', targetLanguage: 'zh' });
  assert.equal(result.translation, '你好');
  assert.equal(result.billing.chargedCredits, 1);
  assert.deepEqual(calls.map(call => call.method), ['POST', 'GET', 'GET']);
  assert.ok(calls.slice(1).every(call => call.url.endsWith('/operations/lost-response')));
});

test('502/503 responses recover by operation ID without resubmitting', async () => {
  for (const status of [502, 503]) {
    const { api, calls } = setup([
      { status, body: { error: 'Gateway response lost' } },
      { body: { state: 'succeeded', translation: '你好' } },
    ]);
    const result = await api.translate('s', { requestId: 'gateway-id', text: 'Hello' });
    assert.equal(result.translation, '你好');
    assert.deepEqual(calls.map(call => call.method), ['POST', 'GET']);
  }
});

test('request timeout recovers the same operation while user cancellation does not', async () => {
  const blockedFetch = (_url, init) => new Promise((_resolve, reject) => {
    init.signal.addEventListener('abort', () => reject(init.signal.reason), { once: true });
  });
  const { api, calls } = setup([
    blockedFetch,
    { body: { state: 'succeeded', translation: '你好' } },
  ]);
  assert.equal((await api.translate('s', { requestId: 'timeout-id', text: 'Hello' }, { timeoutMs: 10 })).translation, '你好');
  assert.deepEqual(calls.map(call => call.method), ['POST', 'GET']);
  const cancelled = setup([blockedFetch]);
  const controller = new AbortController();
  const work = cancelled.api.translate('s', { requestId: 'cancel-id', text: 'Hello' }, { signal: controller.signal });
  setTimeout(() => controller.abort(new DOMException('Cancelled', 'AbortError')), 10);
  await assert.rejects(work, error => error.name === 'AbortError');
  assert.equal(cancelled.calls.length, 1);
});

test('only a confirmed missing operation allows retrying the identical POST body', async () => {
  const { api, calls } = setup([
    new TypeError('Connection lost'),
    { status: 503 },
    { status: 404, body: { code: 'operation_not_found' } },
    { body: { state: 'succeeded', translation: '你好' } },
  ]);
  assert.equal((await api.translate('s', { requestId: 'stable-recovery-id', text: 'Hello' })).translation, '你好');
  assert.deepEqual(calls.map(call => call.method), ['POST', 'GET', 'GET', 'POST']);
  assert.equal(calls[0].body, calls[3].body);
});

test('recovery honors the original deadline without issuing another POST', async () => {
  const { api, calls } = setup([new TypeError('Lost POST'), { status: 503 }]);
  await assert.rejects(api.translate('s', { requestId: 'deadline-id', text: 'Hello' }, { pollTimeoutMs: 15 }), error => error.code === 'operation_pending' && error.requestId === 'deadline-id');
  assert.deepEqual(calls.map(call => call.method), ['POST', 'GET']);
});

test('402 and unrelated 409 are not retried', async () => {
  for (const [status, code] of [[402, 'insufficient_credits'], [409, 'idempotency_conflict']]) {
    const { api, calls } = setup([{ status, body: { error: code } }]);
    await assert.rejects(api.translate('s', { requestId: 'r', sttRequestIds: ['stt-1'], text: 'hello' }), error => error.status === status && error.code === code);
    assert.equal(calls.length, 1);
  }
});

test('STT submits WAV multipart with stable request ID and normalized language', async () => {
  const { api, calls } = setup([{ body: { text: 'Hello', durationMs: 1000 } }]);
  const result = await api.stt('s', { audio: new Blob([new Uint8Array(32044)], { type: 'audio/wav' }), mimeType: 'audio/wav', requestId: 'wav-1', sourceLanguage: 'eng', audioSpeed: 1 });
  assert.equal(result.text, 'Hello');
  assert.ok(calls[0].body instanceof FormData);
  assert.equal(calls[0].body.get('sourceLanguage'), 'en');
  assert.equal(calls[0].body.get('requestId'), 'wav-1');
  assert.equal(calls[0].body.get('file').type, 'audio/wav');
  assert.equal(calls[0].headers['Content-Type'], undefined);
  await assert.rejects(api.stt('s', { audio: new Blob(['wav']), requestId: 'too-fast', audioSpeed: 2 }), /必須為 1/);
  assert.equal(calls.length, 1);
});

test('chat translates identified messages without token in body', async () => {
  const { api, calls } = setup([{ body: { translations: [{ id: 'a', translation: '你好' }] } }]);
  const result = await api.chatTranslate('s', { requestId: 'chat-1', messages: [{ id: 'a', author: 'viewer', text: 'Hello' }], sourceLanguage: 'eng', targetLanguage: 'zh', mode: 'live-chat' });
  assert.equal(result.translations[0].id, 'a');
  const body = JSON.parse(calls[0].body);
  assert.deepEqual(body.messages, [{ id: 'a', author: 'viewer', text: 'Hello' }]);
  assert.equal(calls[0].body.includes(TOKEN), false);
});

test('errors redact a credential echoed in a server message', async () => {
  const { api } = setup([{ status: 500, body: { error: 'upstream_error', message: `Rejected ${TOKEN}` } }]);
  await assert.rejects(api.credits(), error => !error.message.includes(TOKEN) && !JSON.stringify(error.data).includes(TOKEN));
});

test('flat backend failure and cancellation outcomes do not become empty successes', async () => {
  for (const [state, code] of [['failed', 'upstream_failed'], ['cancelled', 'session_ended']]) {
    const { api } = setup([{ body: { state, error: { code } } }]);
    await assert.rejects(api.operation('s', 'r'), error => error.code === code);
  }
  const { api } = setup([{ body: { state: 'succeeded', translation: '你好', billing: { chargedCredits: 1 } } }]);
  const result = await api.operation('s', 'r');
  assert.equal(result.translation, '你好');
  assert.equal(result.billing.chargedCredits, 1);
});

test('aborting pending recovery stops without another request', async () => {
  const { api, calls } = setup([{ status: 202, body: { state: 'pending' } }]);
  const controller = new AbortController();
  const promise = api.translate('s', { requestId: 'r', text: 'hello' }, { signal: controller.signal });
  setTimeout(() => controller.abort(new DOMException('Cancelled', 'AbortError')), 20);
  await assert.rejects(promise, error => error.name === 'AbortError');
  assert.equal(calls.length, 1);
});
