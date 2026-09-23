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
      return new Response(next.raw === undefined ? JSON.stringify(next.body ?? {}) : next.raw, { status: next.status || 200, headers: { 'Content-Type': 'application/json', 'Retry-After': '0.001', ...next.headers } });
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

test('non-JSON errors identify the method, route category, status, and safe content type', async () => {
  for (const [status, expected] of [[200, /回傳網頁而非 JSON/], [404, /直播 API 是否已部署/], [502, /閘道或後端/], [503, /閘道或後端/]]) {
    const { api, calls } = setup([{ status, raw: `<html>private response ${TOKEN}</html>`, headers: { 'Content-Type': 'text/html; charset=utf-8' } }]);
    await assert.rejects(api.startSession(), error => {
      assert.equal(error.status, status); assert.equal(error.code, 'invalid_json');
      assert.match(error.message, expected); assert.match(error.message, /POST \/live-sessions/);
      assert.ok(error.message.includes(`HTTP ${status}`)); assert.match(error.message, /Content-Type: text\/html/);
      assert.equal(error.data.contentType, 'text/html');
      assert.doesNotMatch(JSON.stringify({ message: error.message, data: error.data }), /private response|<html>|pt_sk_/);
      return true;
    });
    assert.equal(calls.length, 1);
  }
});

test('non-JSON auth failures retain the standard 401/403 meaning', async () => {
  for (const [status, expected] of [[401, /token 無效或已失效/], [403, /沒有執行此操作的權限/]]) {
    const { api, calls } = setup([{ status, raw: '<html>denied</html>', headers: { 'Content-Type': 'text/html' } }]);
    await assert.rejects(api.startSession(), error => {
      assert.equal(error.status, status); assert.match(error.message, expected);
      assert.match(error.message, /POST \/live-sessions/); assert.match(error.message, /Content-Type: text\/html/);
      return true;
    });
    assert.equal(calls.length, 1);
  }
});

test('diagnostics redact identifiers and URLs and allowlist header content types', async () => {
  for (const [header, expected] of [[`text/${TOKEN}; url=https://secret.invalid/?credential=private`, 'other'], ['', 'missing'], ['TEXT/PLAIN; charset=utf-8', 'text/plain']]) {
    const { api, calls } = setup([{ status: 404, raw: `private body ${TOKEN}`, headers: { 'Content-Type': header } }]);
    await api.saveConfig({ baseUrl: 'https://private-host.invalid/secret-base/api/agent/v1' });
    await assert.rejects(api.session(`private-id-${TOKEN}?credential=private`), error => {
      assert.equal(error.data.route, '/live-sessions/:id'); assert.equal(error.data.method, 'GET');
      assert.equal(error.data.contentType, expected);
      assert.doesNotMatch(JSON.stringify({ message: error.message, data: error.data }), /private|pt_sk_|credential|secret|<html>|https?:/);
      return true;
    });
    assert.equal(calls.length, 1);
  }
});

test('HTML and empty 2xx/502/503 charged responses recover the same operation without another POST', async () => {
  for (const response of [
    ...[200, 502, 503].map(status => ({ status, raw: '<html>upstream response unavailable</html>', headers: { 'Content-Type': 'text/html' } })),
    { status: 200, raw: '' }, { status: 200, raw: ' \r\n\t ' }, { status: 204, raw: null },
  ]) {
    const { api, calls } = setup([
      response,
      { body: { state: 'succeeded', translation: '已處理', billing: { chargedCredits: 1 } } },
    ]);
    const result = await api.translate('s', { requestId: 'html-recovery', text: 'Hello' });
    assert.equal(result.translation, '已處理'); assert.equal(result.billing.chargedCredits, 1);
    assert.deepEqual(calls.map(call => call.method), ['POST', 'GET']);
    assert.ok(calls[1].url.endsWith('/operations/html-recovery'));
  }
});

test('recovery HTML or generic JSON 404 never authorizes a duplicate charged POST', async () => {
  for (const missing of [
    { status: 404, raw: '<html>not found</html>', headers: { 'Content-Type': 'text/html' } },
    { status: 404, body: { error: 'not_found' } },
    { status: 404, body: { code: 'session_not_found' } },
  ]) {
    const { api, calls } = setup([new TypeError('Lost charged POST response'), missing]);
    await assert.rejects(api.translate('s', { requestId: 'unknown-result', text: 'Hello' }), error => error.status === 404);
    assert.deepEqual(calls.map(call => call.method), ['POST', 'GET']);
  }
});

test('malformed successful operation lookup stays on GET recovery', async () => {
  const { api, calls } = setup([
    { status: 503, raw: '<html>gateway failure</html>', headers: { 'Content-Type': 'text/html' } },
    { status: 200, raw: '<html>temporary proxy page</html>', headers: { 'Content-Type': 'text/html' } },
    { body: { state: 'succeeded', translation: '完成' } },
  ]);
  assert.equal((await api.translate('s', { requestId: 'lookup-recovery', text: 'Hello' })).translation, '完成');
  assert.deepEqual(calls.map(call => call.method), ['POST', 'GET', 'GET']);
});

test('HTML 401 or 409 on charged submission is not retried', async () => {
  for (const status of [401, 409]) {
    const { api, calls } = setup([{ status, raw: '<html>rejected</html>', headers: { 'Content-Type': 'text/html' } }]);
    await assert.rejects(api.translate('s', { requestId: 'rejected', text: 'Hello' }), error => error.status === status && error.code === 'invalid_json');
    assert.deepEqual(calls.map(call => call.method), ['POST']);
  }
});

test('session creation requires a nonempty session ID even after HTTP 200 JSON', async () => {
  for (const raw of ['{}', 'null', '[]', '{"sessionId":""}', '{"sessionId":"   "}', '{"sessionId":123}']) {
    const { api, calls } = setup([{ raw }]);
    await assert.rejects(api.startSession(), error => {
      assert.equal(error.status, 200); assert.equal(error.code, 'invalid_session_response');
      assert.match(error.message, /工作階段 ID/); assert.match(error.message, /POST \/live-sessions/);
      assert.match(error.message, /HTTP 200/); assert.match(error.message, /Content-Type: application\/json/);
      return true;
    });
    assert.equal(calls.length, 1);
  }
  const { api } = setup([{ body: { sessionId: 'valid-session', billing: { availableCredits: 10 } } }]);
  const value = await api.startSession();
  assert.equal(value.sessionId, 'valid-session'); assert.equal(value.billing.availableCredits, 10);
});

test('empty and whitespace responses never become successful account or session results, including HTTP 204', async () => {
  for (const response of [{ status: 200, raw: '' }, { status: 200, raw: ' \r\n\t ' }, { status: 204, raw: null }]) {
    for (const [operation, args] of [['credits', []], ['session', ['s']], ['startSession', []], ['endSession', ['s']]]) {
      const { api, calls } = setup([response]);
      await assert.rejects(api[operation](...args), error => {
        assert.equal(error.code, 'invalid_json'); assert.equal(error.status, response.status);
        assert.match(error.message, /未回傳有效 JSON/); assert.ok(error.message.includes(`HTTP ${response.status}`));
        return true;
      });
      assert.equal(calls.length, 1);
    }
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
