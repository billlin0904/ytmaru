const {test}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const s=fs.readFileSync('extension/popup.js','utf8');
const ctx=vm.createContext({Date:{now:()=>20000}});
vm.runInContext(s.slice(s.indexOf('  function startupProgressText('),s.indexOf('  async function start()')),ctx);
test('startup progress identifies the last completed stage without exposing stored data',()=>{
 const text=ctx.startupProgressText({stage:'session-created',atMs:15000,startedAtMs:11000,token:'secret'},10000);
 assert.match(text,/session-created/);assert.match(text,/10 秒/);assert.doesNotMatch(text,/secret/);
});
test('startup progress ignores stale records from a previous start',()=>{
 assert.match(ctx.startupProgressText({stage:'complete',atMs:9000,startedAtMs:1000},10000),/waiting-background/);
 assert.match(ctx.startupProgressText(undefined,10000),/waiting-background/);
});
