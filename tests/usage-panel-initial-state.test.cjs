const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Read the shipped markup, before any script, usage event or API response can
// replace it. A renderer that merely hides old prices cannot satisfy this test.
const extension = path.join(__dirname, '..', 'extension');
for (const [file, marker, hasSync] of [
  ['content-script.js', '<aside class="usage-panel"', true],
  ['mirror-viewer.html', '<aside id="usagePanel"', false],
]) {
  test(`${file} initial panel contains real billing placeholders and timing metrics only`, () => {
    const source = fs.readFileSync(path.join(extension, file), 'utf8');
    const start = source.indexOf(marker);
    assert.ok(start >= 0, 'usage panel must exist');
    const panel = source.slice(start, source.indexOf('</aside>', start) + 8);
    assert.doesNotMatch(panel, /slow_credit|USD|智慧搜尋|錢包扣款|吃到飽|\$|估算|tokens/);
    assert.match(panel, /Textamisu 用量與狀態/);
    assert.match(panel, /data-balance-field="balance">讀取中/);
    assert.match(panel, /data-balance-field="time">讀取中/);
    assert.match(panel, /data-balance-field="rate">Textamisu/);
    const fields = [...panel.matchAll(/data-usage-field="([^"]+)"/g)].map(match => match[1]);
    const expected = ['elapsed', 'stt', 'vad', 'batch', 'pipeline', 'subtitleBuffer', 'latency', ...(hasSync ? ['sync'] : []), 'provider', 'source'];
    assert.deepEqual(fields, expected);
    assert.doesNotMatch(panel, /data-dev-only|hidden/);
  });
}

function readFunction(file, name) {
  const source = fs.readFileSync(path.join(extension, file), 'utf8');
  const start = source.indexOf(`  function ${name}(`);
  assert.ok(start >= 0, `${name} must exist`);
  const end = source.indexOf('\n  function ', start + 14);
  return source.slice(start, end);
}

test('content tooltip accepts the real initial null usage before any usage event', () => {
  const scope = { a: null, F: { usage: null, latency: null, sync: { enabled: false } } };
  vm.createContext(scope);
  vm.runInContext(['Kc', 'jc', 'fu', 'ru'].map(name => readFunction('content-script.js', name)).join('\n'), scope);
  assert.equal(scope.jc(scope.F.usage), 'Textamisu 額度讀取中\n音訊：0s\n延遲：等待樣本');
  assert.match(scope.jc({ sttDurationSeconds: 65 }), /音訊：1m 05s/);
});

test('content metric render handles null usage and null nested timing state', () => {
  const rendered = [];
  const requireTimingObject = value => { assert.ok(value && typeof value === 'object'); return '等待樣本'; };
  const scope = {
    a: null, ce: {}, me: { usagePanel: {}, usageFields: [] },
    F: { usage: null, latency: null, sync: { enabled: false }, mounted: true, role: 'display', sessionId: 'initial' },
    qc: () => ({}), au: requireTimingObject, iu: requireTimingObject, eu: () => '未播 0 段', wa: () => '等待樣本',
    SubruuCaptionBalance: { createMonitor: () => ({ update() {} }), renderMetrics: (_, __, metrics) => rendered.push(metrics) },
  };
  vm.createContext(scope);
  vm.runInContext(['Qc', 'fu', 'ru'].map(name => readFunction('content-script.js', name)).join('\n'), scope);
  scope.Qc(null);
  scope.Qc({ batch: null, subtitlePipeline: null });
  assert.equal(rendered.length, 2);
  assert.equal(rendered[0].stt, '0s');
  assert.equal(rendered[0].latency, '等待樣本');
});

test('mirror initial quota and metric render accept null usage without a synthetic usage event', () => {
  const rendered = [];
  const requireTimingObject = value => { assert.ok(value && typeof value === 'object'); return '等待樣本'; };
  const quota = { classList: { remove() {} } };
  const scope = {
    xe: null, S: { panel: {}, quota, usagePanel: {}, usageFields: [] }, De: null, ke: {}, o: 'initial', re: false, Je: false,
    ya: () => ({}), Da: requireTimingObject, Ua: requireTimingObject,
    Na: value => `${Number(value) || 0}s`, xa: () => '等待樣本', Ra: String, te: [], Ce: [],
    SubruuCaptionBalance: { createMonitor: () => ({ update() {}, summary: () => '' }), renderMetrics: (_, __, metrics) => rendered.push(metrics) },
  };
  vm.createContext(scope);
  vm.runInContext(readFunction('mirror-viewer.js', 'Ca'), scope);
  scope.Ca(null);
  scope.Ca({ batch: null, pipeline: null });
  assert.equal(rendered.length, 2);
  assert.equal(quota.textContent, 'Textamisu 額度讀取中');
  assert.equal(quota.title, '音訊：0s／延遲：等待樣本');
});
