const assert = require('node:assert/strict');
const { test } = require('node:test');
const balance = require('../extension/caption-balance-display.js');

const billing = {
  rates: { sttCreditsPerMinute: 1, captionCreditsPerMinute: 0.5, chatInputCharactersPerCredit: 1000 },
  usage: { sttMs: 500, captionMs: 500, chatCharacters: 10 },
  chargedCredits: 0.0125,
  availableCredits: 8.7375,
  reservedCredits: 1.25,
};
const flush = () => new Promise(resolve => setImmediate(resolve));
function fakeRoot() {
  const label = { textContent: '預估可用時間' };
  const fields = Object.fromEntries(['summary', 'balance', 'time', 'rate', 'note'].map(name => [name, {
    dataset: { balanceField: name }, textContent: '', title: '',
    closest: () => ({ querySelector: () => label }),
  }]));
  return { fields, label, querySelectorAll: () => Object.values(fields) };
}
function monitorHarness(request) {
  const timers = new Map();
  let time = 0, next = 0;
  const monitor = balance.createMonitor({ request, now: () => time,
    setTimer: (callback, delay) => { timers.set(++next, { callback, delay }); return next; },
    clearTimer: id => timers.delete(id),
  });
  return { monitor, timers, tick: async () => {
    const [id, timer] = timers.entries().next().value;
    timers.delete(id); time += timer.delay; timer.callback(); await flush();
  } };
}

test('available credit and charges come from session billing without rounding or legacy cost estimates', () => {
  const view = balance.estimate({ credits: { totalMinutes: 99 }, billing }, { creditsUsed: 9999, totalCostUSD: 9999 });
  assert.equal(view.remainingCredits, 8.7375);
  assert.equal(view.chargedCredits, 0.0125);
  assert.equal(view.reservedCredits, 1.25);
  assert.match(view.summary, /8\.7375 credits/);
  assert.match(view.time, /0\.0125 credits/);
  assert.match(view.rate, /1,000 字／credit/);
  assert.equal(view.remainingSeconds, null);
  assert.equal(view.creditsPerHour, null);
  assert.equal(balance.hourlyRate({ model: 'legacy' }), null);
  assert.doesNotMatch(JSON.stringify(view), /USD|9999|99 credits|wallet/);
  assert.equal(balance.estimate({ credits: { totalMinutes: 99 } }).remainingCredits, null);
});

test('monitor accepts the worker billing shape and labels actual charged credits', async () => {
  const root = fakeRoot(), sent = [];
  const harness = monitorHarness(async message => {
    sent.push(message); return { ok: true, sessionId: message.sessionId, credits: { totalMinutes: 99 }, billing };
  });
  harness.monitor.update({ root, sessionId: 'local', active: true, usage: { totalCostUSD: 1000 } });
  await flush();
  assert.deepEqual(sent, [{ type: 'GET_SUBTITLE_BALANCE', sessionId: 'local' }]);
  assert.equal(root.label.textContent, '本次已扣');
  assert.equal(root.fields.time.textContent, '0.0125 credits');
  assert.match(root.fields.balance.textContent, /可用 8\.7375／預留 1\.25/);
  assert.equal(harness.timers.values().next().value.delay, 30000);
  harness.monitor.stop();
  assert.equal(harness.timers.size, 0);
});

test('failed polling keeps last actual values marked stale and retries without displaying zero', async () => {
  let count = 0;
  const root = fakeRoot();
  const harness = monitorHarness(async message => ++count === 1
    ? { ok: true, sessionId: message.sessionId, billing }
    : { ok: false, reason: 'offline' });
  harness.monitor.update({ root, sessionId: 'local', active: true });
  await flush();
  await harness.tick();
  assert.equal(harness.monitor.summary(), '額度待更新');
  assert.match(root.fields.balance.textContent, /8\.7375.*上次資料/);
  assert.equal(root.fields.time.textContent, '0.0125 credits');
  assert.equal(harness.timers.values().next().value.delay, 5000);
  harness.monitor.stop();
});

test('switching sessions ignores the previous session response and does not add an orphan poll', async () => {
  const pending = new Map(), root = fakeRoot();
  const harness = monitorHarness(message => new Promise(resolve => pending.set(message.sessionId, resolve)));
  harness.monitor.update({ root, sessionId: 'old', active: true });
  await flush();
  harness.monitor.update({ root, sessionId: 'new', active: true });
  await flush();
  pending.get('new')({ ok: true, sessionId: 'new', billing: { ...billing, availableCredits: 7 } });
  await flush();
  pending.get('old')({ ok: true, sessionId: 'old', billing });
  await flush();
  assert.match(harness.monitor.summary(), /可用 7 credits/);
  assert.equal(harness.timers.size, 1);
  harness.monitor.stop();
});

test('account balance is usable before the remote session exists without fabricating charges or available credits', async () => {
  const root = fakeRoot();
  const harness = monitorHarness(async message => ({ ok: true, sessionId: message.sessionId,
    credits: { totalMinutes: 12.5 }, billing: null, balanceState: 'session-pending', balanceError: { code: 'session_pending' } }));
  harness.monitor.update({ root, sessionId: 'local', active: true });
  await flush();
  assert.match(root.fields.balance.textContent, /帳戶餘額 12\.5 credits/);
  assert.equal(root.fields.time.textContent, '尚未取得');
  assert.match(root.fields.note.textContent, /尚未就緒/);
  assert.match(root.fields.note.textContent, /尚未扣除.*預留/);
  assert.doesNotMatch(root.fields.summary.textContent, /可用|讀取中/);
  assert.equal(harness.timers.values().next().value.delay, 5000);
  harness.monitor.stop();
});

test('a lost worker reply times out, ignores late data and then recovers on retry', async () => {
  let resolveFirst, calls = 0;
  const root = fakeRoot();
  const harness = monitorHarness(message => ++calls === 1 ? new Promise(resolve => { resolveFirst = resolve; })
    : Promise.resolve({ ok: true, sessionId: message.sessionId, billing }));
  harness.monitor.update({ root, sessionId: 'local', active: true });
  await flush();
  assert.equal(harness.timers.values().next().value.delay, 8000);
  await harness.tick();
  assert.match(root.fields.note.textContent, /逾時/);
  assert.equal(root.fields.time.textContent, '尚未取得');
  assert.doesNotMatch(root.fields.summary.textContent, /讀取中/);
  resolveFirst({ ok: true, sessionId: 'local', billing: { ...billing, availableCredits: 999 } });
  await flush();
  assert.doesNotMatch(root.fields.balance.textContent, /999/);
  assert.equal(harness.timers.size, 1);
  await harness.tick();
  assert.match(root.fields.summary.textContent, /8\.7375 credits/);
  assert.equal(harness.timers.size, 1);
  harness.monitor.stop();
});

test('401 and session 404 are actionable and no initial error leaves loading placeholders', async () => {
  for (const reply of [
    { ok: false, status: 401, code: 'unauthorized' },
    { ok: true, sessionId: 'local', credits: { totalMinutes: 0 }, billing: null,
      balanceState: 'session-error', balanceError: { status: 404, code: 'live_session_unavailable' } },
  ]) {
    const root = fakeRoot(), harness = monitorHarness(async () => reply);
    harness.monitor.update({ root, sessionId: 'local', active: true });
    await flush();
    assert.doesNotMatch(Object.values(root.fields).map(field => field.textContent).join(' '), /讀取中/);
    assert.match(root.fields.note.textContent, reply.ok ? /404/ : /token.*重新輸入/);
    assert.equal(root.fields.time.textContent, '尚未取得');
    if (reply.ok) assert.match(root.fields.balance.textContent, /帳戶餘額 0 credits/);
    harness.monitor.stop();
  }
});

test('inactive or stopped views show a finite state and cancel pending requests', async () => {
  const root = fakeRoot();
  let resolve;
  const harness = monitorHarness(() => new Promise(done => { resolve = done; }));
  harness.monitor.update({ root, sessionId: null, active: false });
  assert.equal(root.fields.summary.textContent, '字幕尚未啟動');
  assert.equal(harness.timers.size, 0);
  harness.monitor.update({ root, sessionId: 'local', active: true });
  await flush();
  harness.monitor.update({ root, sessionId: 'local', active: false });
  resolve({ ok: true, sessionId: 'local', billing });
  await flush();
  assert.equal(harness.timers.size, 0);
  assert.equal(root.fields.summary.textContent, '字幕尚未啟動');
});

test('cost rows and their old notes are hidden while audio and latency metrics remain', () => {
  const title = { textContent: '' };
  const row = () => ({ hidden: false, style: {} });
  const rows = [row(), row(), row(), row()];
  const fields = ['elapsed', 'latency', 'llmCost', 'usd'].map((name, index) => ({
    dataset: { usageField: name }, closest: () => rows[index], textContent: 'old',
  }));
  const notes = [false, true].map(account => ({ hasAttribute: () => account, style: {}, hidden: false }));
  const sections = [[rows[0], rows[1]], [rows[2], rows[3]]].map(items => ({ querySelectorAll: () => items, style: {}, hidden: false }));
  const panel = { querySelector: () => title, querySelectorAll: selector => selector === '.usage-note' ? notes : sections };
  balance.renderMetrics(panel, fields, { elapsed: '2 分鐘', latency: '500ms' });
  assert.deepEqual(fields.map(field => field.textContent), ['2 分鐘', '500ms', '', '']);
  assert.deepEqual(rows.map(item => item.hidden), [false, false, true, true]);
  assert.deepEqual(sections.map(item => item.hidden), [false, true]);
  assert.equal(notes[0].style.display, 'none');
  assert.equal(notes[1].hidden, false);
  assert.equal(title.textContent, 'Textamisu 用量與狀態');
});
