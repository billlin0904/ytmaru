const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');

const worker = readFileSync(join(__dirname, '../extension/service-worker.js'), 'utf8');
const start = worker.indexOf('async function No(e, t) {');
const end = worker.indexOf('\nasync function Po(', start);
assert.ok(start >= 0 && end > start, 'balance handler can be isolated for testing');
const handler = worker.slice(start, end);
const billing = { availableCredits: 42, reservedCredits: 2, chargedCredits: 3 };
const account = { totalMinutes: 44, account: { email: 'fixture@example.test' } };
const apiError = (status, code) => Object.assign(new Error('API failure'), { status, code });
const deferred = () => {
  let resolve;
  const promise = new Promise(done => { resolve = done; });
  return { promise, resolve };
};
function setup({ remote = true, active = true, credits = async () => account, session = async () => ({ billing }) } = {}) {
  const calls = [], keys = [];
  const context = vm.createContext({
    chrome: {
      runtime: { id: 'extension-id', getURL: path => 'chrome-extension://extension-id/' + path },
      storage: {
        session: { get: async key => {
          keys.push(key);
          assert.equal(key, 'textamisuLive:local', 'handler reads only the session mapping, never credentials');
          return remote ? { [key]: { sessionId: 'remote-id' } } : {};
        } },
        local: { get: async () => { throw new Error('Balance must not read persistent credentials'); } },
      },
    },
    xo: async id => active && id === 'local' ? { sessionId: id, tabId: 7 } : null,
    Zo: value => [value.tabId],
    TextamisuApi: {
      credits: async options => { calls.push({ type: 'credits', options }); return credits(options); },
      session: async (id, options) => { calls.push({ type: 'session', id, options }); return session(id, options); },
      startSession: () => { throw new Error('A balance read must not create sessions'); },
    },
    TextamisuPipeline: { session: () => { throw new Error('A balance read must not create sessions'); } },
  });
  vm.runInContext(handler, context);
  return {
    calls, keys,
    read: (sender = { id: 'extension-id', url: 'https://www.youtube.com/watch?v=test', tab: { id: 7 } }) => context.No({ sessionId: 'local' }, sender),
  };
}

test('balance reads account and session concurrently with independent six-second deadlines', async () => {
  const accountWait = deferred(), sessionWait = deferred();
  const harness = setup({ credits: () => accountWait.promise, session: () => sessionWait.promise });
  const resultPromise = harness.read();
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(harness.calls.map(call => call.type), ['credits', 'session']);
  for (const call of harness.calls) assert.equal(call.options.timeoutMs, 6000);
  assert.equal(harness.calls[1].id, 'remote-id');
  sessionWait.resolve({ billing });
  accountWait.resolve(account);
  const result = await resultPromise;
  assert.equal(result.ok, true);
  assert.equal(result.balanceState, 'ready');
  assert.equal(result.sessionId, 'local');
  assert.equal(result.credits, account);
  assert.equal(result.billing, billing);
  assert.equal(result.balanceError, undefined);
});

test('real session billing remains ready when the account endpoint fails', async () => {
  const result = await setup({ credits: async () => { throw apiError(503, 'upstream_unavailable'); } }).read();
  assert.equal(result.ok, true);
  assert.equal(result.balanceState, 'ready');
  assert.equal(result.credits, null);
  assert.equal(result.billing, billing);
});

test('missing remote session returns actual account points without creating a session or usage', async () => {
  const harness = setup({ remote: false, credits: async () => ({ totalMinutes: 0 }) });
  const result = await harness.read();
  assert.equal(result.ok, true);
  assert.equal(result.credits.totalMinutes, 0);
  assert.equal(result.billing, null);
  assert.equal(result.balanceState, 'session-pending');
  assert.equal(result.balanceError.code, 'session_pending');
  assert.deepEqual(harness.calls.map(call => call.type), ['credits']);
  assert.deepEqual(harness.keys, ['textamisuLive:local']);
  assert.equal(JSON.stringify(result).includes('chargedCredits'), false);
});

test('session 404 retains actual account points and reports unavailable without inferring deployment', async () => {
  const result = await setup({ session: async () => { throw apiError(404, 'not_found'); } }).read();
  assert.equal(result.ok, true);
  assert.equal(result.credits, account);
  assert.equal(result.billing, null);
  assert.equal(result.balanceState, 'session-error');
  assert.equal(result.balanceError.code, 'live_session_unavailable');
  assert.equal(result.balanceError.status, 404);
});

test('session timeout retains account balance and its error classification', async () => {
  const result = await setup({ session: async () => { throw new DOMException('Timed out', 'TimeoutError'); } }).read();
  assert.equal(result.ok, true);
  assert.equal(result.billing, null);
  assert.equal(result.balanceError.code, 'request_timeout');
  assert.equal(result.balanceError.status, 408);
});

test('authentication failures remain actionable when neither endpoint supplies data', async () => {
  const result = await setup({
    credits: async () => { throw apiError(401, 'token_invalid'); },
    session: async () => { throw apiError(404, 'not_found'); },
  }).read();
  assert.equal(result.ok, false);
  assert.equal(result.code, 'token_invalid');
  assert.equal(result.status, 401);
  assert.equal(result.balanceError.code, 'live_session_unavailable');
});

test('no usable data preserves session404, timeout, and account-only failure codes', async () => {
  const cases = [
    { options: { credits: async () => null, session: async () => { throw apiError(404, 'not_found'); } }, code: 'live_session_unavailable', status: 404 },
    { options: { credits: async () => null, session: async () => { throw new DOMException('Timed out', 'TimeoutError'); } }, code: 'request_timeout', status: 408 },
    { options: { remote: false, credits: async () => { throw apiError(401, 'token_missing'); } }, code: 'token_missing', status: 401 },
    { options: { credits: async () => { throw apiError(503, 'upstream_unavailable'); }, session: async () => ({}) }, code: 'upstream_unavailable', status: 503 },
  ];
  for (const { options, code, status } of cases) {
    const result = await setup(options).read();
    assert.equal(result.ok, false);
    assert.equal(result.code, code);
    assert.equal(result.status, status);
  }
});

test('invalid account values and missing billing are never fabricated as zero usage', async () => {
  for (const totalMinutes of [undefined, null, '44', NaN, Infinity, -1]) {
    const result = await setup({ credits: async () => ({ totalMinutes }), session: async () => ({}) }).read();
    assert.equal(result.ok, false);
    assert.equal(result.code, 'billing_unavailable');
    assert.equal(JSON.stringify(result).includes('chargedCredits'), false);
  }
});

test('incomplete or invalid billing remains a session error while preserving real account points', async () => {
  const invalid = [{}, [], 'billing', null,
    { ...billing, availableCredits: -1 }, { ...billing, reservedCredits: '2' },
    { ...billing, chargedCredits: NaN }, { ...billing, availableCredits: Infinity },
    { availableCredits: 42, reservedCredits: 2 },
  ];
  for (const value of invalid) {
    const result = await setup({ session: async () => ({ billing: value }) }).read();
    assert.equal(result.ok, true);
    assert.equal(result.credits, account);
    assert.equal(result.billing, null);
    assert.equal(result.balanceState, 'session-error');
    assert.equal(result.balanceError.code, 'billing_unavailable');
  }
  const zero = { availableCredits: 0, reservedCredits: 0, chargedCredits: 0 };
  const result = await setup({ session: async () => ({ billing: zero }) }).read();
  assert.equal(result.billing, zero);
  assert.equal(result.balanceState, 'ready');
});

test('invalid senders and wrong local sessions are rejected before any account or storage read', async () => {
  const harness = setup();
  assert.equal((await harness.read({ id: 'other-extension' })).reason, 'invalid-sender');
  assert.equal((await harness.read({ id: 'extension-id', url: 'https://example.test', tab: { id: 8 } })).reason, 'wrong-session');
  assert.deepEqual(harness.calls, []);
  assert.deepEqual(harness.keys, []);
  const stopped = setup({ active: false });
  assert.equal((await stopped.read()).reason, 'wrong-session');
  assert.equal(stopped.calls.length, 0);
  assert.equal(stopped.keys.length, 0);
});

test('the matching extension mirror page can read its active local session', async () => {
  const result = await setup().read({ id: 'extension-id', url: 'chrome-extension://extension-id/mirror-viewer.html?sessionId=local' });
  assert.equal(result.ok, true);
  assert.equal(result.balanceState, 'ready');
});
