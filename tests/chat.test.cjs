const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const extension = path.join(__dirname, '..', 'extension');
const source = fs.readFileSync(path.join(extension, 'wallet-interactions.js'), 'utf8');
const sandbox = { setTimeout, clearTimeout, console };
vm.createContext(sandbox);
vm.runInContext(source, sandbox);
const api = sandbox.SubruuWalletInteractions;
const plain = value => JSON.parse(JSON.stringify(value));
const context = () => ({ sessionId: 'local-session', isCurrent: () => true });
const batch = () => ({ mode: 'live-chat-batch', sourceLang: 'eng', targetLang: 'zh', text: JSON.stringify([{ id: '1', author: 'Alice', text: 'Hello 👋' }, { id: '2', text: 'Goodbye' }]) });
const success = message => ({ ok: true, data: { requestId: message.payload.requestId, translations: message.payload.messages.map(item => ({ id: item.id, translation: `translated:${item.text}` })), billing: { chargedCredits: 2.5, availableCredits: 17.5, reservedCredits: 0, usage: { sttMs: 1000, chatCharacters: 18 } } } });

test('batches use worker messages, preserve IDs and reorder results without forwarding credentials', async () => {
  let sent;
  const client = api.create({ randomId: () => 'request-1', sendMessage: async message => {
    sent = message;
    const response = success(message);
    response.data.translations.reverse();
    response.data.secret = 'must-not-reach-page';
    return response;
  } });
  const result = await client.translate({ ...context(), headers: { Authorization: 'must-not-leave-context' } }, batch());
  assert.equal(sent.type, 'TEXTAMISU_CHAT_TRANSLATE');
  assert.equal(sent.sessionId, 'local-session');
  assert.equal(sent.payload.mode, 'live-chat');
  assert.equal(sent.payload.sourceLanguage, 'en');
  assert.equal(sent.payload.targetLanguage, 'zh-TW');
  assert.deepEqual(plain(sent.payload.messages).map(item => item.id), ['1', '2']);
  assert.deepEqual(JSON.parse(result.translation).map(item => item.id), ['1', '2']);
  assert.equal(result.billing.chargedCredits, 2.5);
  assert.equal(result.billingProtocol, 'textamisu');
  assert.equal(result.receipt, undefined);
  assert.equal(result.secret, undefined);
  assert.equal(JSON.stringify(sent).includes('must-not'), false);
});

test('auto is preserved and explicit language error does not fall back to a provider', async () => {
  let calls = 0;
  const client = api.create({ randomId: () => 'auto', sendMessage: async message => {
    calls++;
    assert.equal(message.payload.sourceLanguage, 'auto');
    return { ok: false, code: 'source_language_required', error: 'source_language_required' };
  } });
  await assert.rejects(client.translate(context(), { ...batch(), sourceLang: 'auto' }), error => error.code === 'source_language_required');
  assert.equal(calls, 1);
});

test('reply text is literal even when it resembles JSON', async () => {
  let sent;
  const client = api.create({ randomId: () => 'reply', sendMessage: async message => { sent = message; return success(message); } });
  const text = '[{"id":"unrelated","text":"literal"}]';
  const result = await client.translate(context(), { mode: 'reply', text, sourceLang: 'zh', targetLang: 'jpn' });
  assert.equal(sent.payload.mode, 'reply');
  assert.equal(sent.payload.messages[0].text, text);
  assert.equal(sent.payload.targetLanguage, 'ja');
  assert.equal(result.translation, `translated:${text}`);
});

test('reply input accepts 1,000 code points and rejects excess without a billed dispatch', async () => {
  let calls = 0;
  const client = api.create({ randomId: () => 'length', sendMessage: async message => { calls++; return success(message); } });
  await client.translate(context(), { mode: 'reply', text: '😀'.repeat(1000), sourceLang: 'zh', targetLang: 'ja' });
  await assert.rejects(client.translate(context(), { mode: 'reply', text: '😀'.repeat(1001), sourceLang: 'zh', targetLang: 'ja' }), error => error.code === 'reply_too_long');
  assert.equal(calls, 1);
});

test('stale requests are never dispatched and stale responses cannot update a new session', async () => {
  let calls = 0;
  let current = true;
  const client = api.create({ randomId: () => 'stale', sendMessage: async message => { calls++; current = false; return success(message); } });
  await assert.rejects(client.translate({ ...context(), requestIsCurrent: () => false }, batch()), error => error.code === 'chat_request_expired');
  assert.equal(calls, 0);
  await assert.rejects(client.translate({ ...context(), isCurrent: () => current }, batch()), error => error.code === 'chat_session_changed');
});

test('closing the panel settles outstanding local requests', async () => {
  const client = api.create({ randomId: () => 'close', sendMessage: () => new Promise(() => {}) });
  const request = client.translate(context(), batch());
  await client.close();
  await assert.rejects(request, error => error.code === 'chat_session_changed');
});

test('invalid or incomplete IDs are rejected instead of attaching translations to the wrong message', async () => {
  const client = api.create({ randomId: () => 'ids', sendMessage: async message => {
    const response = success(message);
    response.data.translations.pop();
    return response;
  } });
  await assert.rejects(client.translate(context(), batch()), error => error.code === 'chat_response_incomplete');
  await assert.rejects(client.translate(context(), { ...batch(), text: '[{"id":"1","text":"a"},{"id":"1","text":"b"}]' }), error => error.code === 'chat_request_invalid');
});

test('a retry of the same logical request reuses its ID, changed contents get a new ID', async () => {
  const ids = [];
  let nextId = 0;
  const client = api.create({ randomId: () => String(++nextId), sendMessage: async message => { ids.push(message.payload.requestId); return success(message); } });
  const request = batch();
  await client.translate(context(), request);
  await client.translate(context(), request);
  request.text = JSON.stringify([{ id: '1', text: 'changed' }]);
  await client.translate(context(), request);
  assert.deepEqual(ids, ['1', '1', '2']);
});

test('unsupported research never dispatches and billing uses only server-reported values', async () => {
  const client = api.create({ sendMessage: () => { throw new Error('unexpected dispatch'); } });
  await assert.rejects(client.research(), error => error.code === 'context_research_unavailable');
  const billing = { chargedCredits: 1.25, availableCredits: 8.75, usage: { sttMs: 2500, chatCharacters: 50 } };
  const result = api.usageSnapshot(billing, {});
  assert.equal(result.creditsUsed, 1.25);
  assert.equal(result.sttDurationSeconds, 2.5);
  assert.equal(result.totalCostUSD, undefined);
  assert.equal(result.walletCharges, undefined);
});

test('both chat entry points reach the adapter without reading credentials', async () => {
  for (const [file, functionName, nextName, initial] of [
    ['content-script.js', 'vs', 'Ms', 'let n = null, Z = 1; const F = { sessionId: "local", chatPanelOpen: true, usage: {} };'],
    ['mirror-viewer.js', 'Br', 'Pr', 'let Ue = null, o = "local", We = 1, re = false, De = {}; const Ne = { open: true }, Ie = { open: false }; function Ca() {}'],
  ]) {
    const text = fs.readFileSync(path.join(extension, file), 'utf8');
    const start = text.indexOf(`  async function ${functionName}(e, t = {}) {`);
    const after = text.indexOf(`function ${nextName}(`, start);
    const end = text.lastIndexOf('\n  ', after);
    const scope = { SubruuWalletInteractions: api, setTimeout, clearTimeout };
    vm.createContext(scope);
    let calls = 0;
    scope.SubruuWalletInteractions = { create: () => ({ translate: async ctx => { calls++; assert.equal(ctx.headers, undefined); assert.equal(ctx.sessionId, 'local'); return { translation: 'ok' }; } }), usageSnapshot: (_, previous) => previous };
    vm.runInContext(initial + '\n' + text.slice(start, end) + `\nglobalThis.run = ${functionName};`, scope);
    assert.equal((await scope.run({ mode: 'live-chat', text: 'a' })).translation, 'ok');
    assert.equal(calls, 1);
  }
});
