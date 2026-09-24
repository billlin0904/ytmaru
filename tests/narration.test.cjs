const {test}=require('node:test');
const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../extension/service-worker.js'),'utf8');
const functions=source.slice(source.indexOf('function textamisuQueueNarration('),source.indexOf('async function oi(e, t)'));
function fixture({tts=async()=>({audioBase64:'fixture'}),active=true}={}){
 const calls=[],statuses=[],played=[];
 const context=vm.createContext({console,Date,textamisuNarrationContext:new Map(),xo:async()=>active?{}:null,Xi:async()=>{},TextamisuPipeline:{session:async()=>({sessionId:'remote'})},TextamisuApi:{tts:async(id,payload)=>{calls.push(payload.text);return tts();}},chrome:{tabs:{sendMessage:async(id,value)=>statuses.push(value)},runtime:{sendMessage:async value=>{played.push(value);return {ok:true};}}}});
 vm.runInContext(functions,context);
 return {calls,statuses,played,queue:(text,config={})=>context.textamisuQueueNarration({sessionId:'local',tabId:1,config},{notificationId:text,translation:text})};
}
test('narration queues every pending cue in order and deduplicates display repeats',async()=>{
 let release;const pending=new Promise(r=>release=r);let count=0;
 const f=fixture({tts:async()=>{if(!count++)await pending;return {audioBase64:'fixture'};}});
 const work=f.queue('first');await new Promise(r=>setImmediate(r));
 f.queue('middle');f.queue('latest');f.queue('latest');release();await work;
 assert.deepEqual(f.calls,['first','middle','latest']);assert.equal(f.played.length,3);
 await f.queue('latest');assert.equal(f.calls.length,3);
});
test('failed narration reports error and allows following cues without stopping captions',async()=>{
 let count=0;const f=fixture({tts:async()=>{if(!count++)throw new Error('voice unavailable');return {audioBase64:'fixture'};}});
 await f.queue('first');await f.queue('second');
 assert.deepEqual(f.calls,['first','second']);assert.equal(f.played.length,1);
 assert.ok(f.statuses.some(x=>x.phase==='error'));assert.equal(f.statuses.at(-1).phase,'played');
});
test('disabled narration and ended sessions do not call paid voice API',async()=>{
 const off=fixture();await off.queue('text',{voiceTranslationEnabled:false});assert.equal(off.calls.length,0);
 const stopped=fixture({active:false});await stopped.queue('text');assert.equal(stopped.calls.length,0);
});
