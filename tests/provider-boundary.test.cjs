const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
test('legacy HTTP and WebSocket paths are blocked while Textamisu and media remain allowed',async()=>{
 const calls=[],context=vm.createContext({URL,location:{href:'chrome-extension://fixture/'},fetch:async url=>{calls.push(url);return {ok:true};},WebSocket:class{constructor(url){calls.push(url);}}});
 vm.runInContext(fs.readFileSync('extension/textamisu-network-guard.js','utf8'),context);
 for(const url of ['https://subruu.com/api','https://subtitle-translate-any.run.app/x','https://abc.salad.cloud/asr','https://identitytoolkit.googleapis.com/x','https://textamisu.com/caption-sessions/start']) await assert.rejects(context.fetch(url),{code:'textamisu_feature_unavailable'});
 assert.throws(()=>new context.WebSocket('wss://abc.salad.cloud/stream'));
 await context.fetch('https://textamisu.com/api/agent/v1/live-sessions');await context.fetch('https://video.googlevideo.com/media');
 assert.equal(calls.length,2);
});
function workerFixture(active) {
 const code=fs.readFileSync('extension/service-worker.js','utf8'),start=code.indexOf('async function handleTextamisuMessage'),end=code.indexOf('\nconst e =',start),calls=[];
 const context=vm.createContext({chrome:{runtime:{id:'fixture',getURL:()=> 'chrome-extension://fixture/'}},xo:async()=>active,Zo:session=>session.tabs,
  TextamisuPipeline:{end:async id=>calls.push({end:id}),session:async()=>({sessionId:'remote'}),language:value=>value},
  TextamisuApi:{chatTranslate:async()=>{calls.push({chat:true});return {translations:[]};}}});
 vm.runInContext(code.slice(start,end),context);
 return {calls,send:context.handleTextamisuMessage};
}
test('stopping after local cleanup still closes remote session from a trusted page',async()=>{
 const f=workerFixture(null),result=await f.send({type:'TEXTAMISU_SESSION_END',sessionId:'local'},{id:'fixture',url:'chrome-extension://fixture/offscreen.html'});
 assert.equal(result.ok,true);assert.deepEqual(f.calls,[{end:'local'}]);
});
test('unrelated tabs and external senders cannot dispatch paid translations or close sessions',async()=>{
 const f=workerFixture({tabs:[8]}),message={type:'TEXTAMISU_CHAT_TRANSLATE',sessionId:'local',payload:{}};
 assert.equal((await f.send(message,{id:'fixture',url:'https://youtube.com',tab:{id:9}})).ok,false);
 assert.equal((await f.send(message,{id:'other',url:'https://youtube.com',tab:{id:8}})).ok,false);
 assert.equal((await f.send({...message,type:'TEXTAMISU_SESSION_END'},{id:'fixture',url:'https://youtube.com',tab:{id:8}})).ok,false);
 assert.equal(f.calls.length,0);
});
