const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '..', 'extension', 'offscreen.js'), 'utf8');

function functionText(name, next) {
  const start = source.indexOf(`function ${name}(`);
  return source.slice(start, source.indexOf(`\nfunction ${next}(`, start));
}

function setup() {
  const state = { committedText: '', pendingDeltaText: '', pendingDeltaQueuedAtMs: 0, pendingDeltaTiming: null };
  const scope = {
    sy: () => state,
    wD: text => String(text || '').trim(),
    qR: text => ({ text }),
    OR: text => String(text || '').toLowerCase(),
    Bv: text => /[.!?]$/.test(text),
    Uv: () => 12,
    Nx: () => {},
    GR: text => text,
    xn: 1000,
    Date,
  };
  vm.createContext(scope);
  vm.runInContext(functionText('Lv', '_v') + '\n' + functionText('_v', 'Bv') + '\n' + functionText('Dv', 'Iv'), scope);
  return { state, run: scope.Dv };
}

test('held transcripts retain all STT evidence on release without altering latest media timing', () => {
  const { state, run } = setup();
  const first = { timing: { mediaTime: 1, walletSttRequestIds: ['stt-first'] }, language: 'en' };
  assert.equal(run('Hello', first), '');
  const second = { timing: { mediaTime: 2, walletSttRequestIds: ['stt-second'] }, language: 'en' };
  assert.equal(run('world', second), '');
  const final = { timing: { mediaTime: 3, walletSttRequestIds: ['stt-third'], marker: 'latest' }, language: 'en' };
  assert.equal(run('today.', final), 'Hello world today.');
  assert.deepEqual(Array.from(final.timing.walletSttRequestIds), ['stt-first', 'stt-second', 'stt-third']);
  assert.equal(final.timing.mediaTime, 3);
  assert.equal(final.timing.marker, 'latest');
  assert.equal(state.pendingDeltaTiming, null);
  assert.equal(state.pendingDeltaText, '');
  assert.deepEqual(first.timing.walletSttRequestIds, ['stt-first']);
});

test('evidence is deduplicated and cleared before the next independent transcript', () => {
  const { run } = setup();
  run('Hello', { timing: { walletSttRequestIds: ['same'] } });
  const release = { timing: { walletSttRequestIds: ['same', 'other'] } };
  run('world.', release);
  assert.deepEqual(Array.from(release.timing.walletSttRequestIds), ['same', 'other']);
  const next = { timing: { walletSttRequestIds: ['next'] } };
  assert.equal(run('New sentence.', next), 'New sentence.');
  assert.deepEqual(next.timing.walletSttRequestIds, ['next']);
});

test('Av forwards the merged timing object produced by Dv to Ev', () => {
  const scope = {
    PS: () => false, wD: text => text, rP: value => value,
    bv: () => ({}), Ov: value => value, Fv: () => [], QA: () => ({}),
    fg: () => 'textamisu', vu: () => [], DS: () => false, ED: () => false, ib: () => false,
    gc: { config: {}, lastFinalText: '' },
    Dv: (text, delta) => { delta.timing = { ...delta.timing, walletSttRequestIds: ['older', ...delta.timing.walletSttRequestIds] }; return text; },
    Ev: (text, timing) => { scope.delivered = { text, timing }; return true; },
  };
  vm.createContext(scope);
  vm.runInContext(functionText('Av', 'Rv'), scope);
  assert.equal(scope.Av({ text: 'Hello.', sttRequestIds: ['current'] }, { id: 3 }, {}), true);
  assert.deepEqual(Array.from(scope.delivered.timing.walletSttRequestIds), ['older', 'current']);
});
