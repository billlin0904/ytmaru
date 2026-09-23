const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {webcrypto}=require('node:crypto');

function fixture(overrides={}) {
 const saved={},calls=[];
 const context=vm.createContext({Blob,ArrayBuffer,Uint8Array,Float32Array,DataView,TextEncoder,DOMException,AbortController,atob,btoa,crypto:webcrypto,
  chrome:{runtime:{id:'fixture',getURL:path=>'chrome-extension://fixture/'+path},storage:{local:{
   get:async key=>({[key]:saved[key]===undefined?undefined:structuredClone(saved[key])}),
   set:async values=>Object.assign(saved,structuredClone(values)),
  }}},xo:overrides.active|| (async id=>id==='local'||id==='other'?{tabs:[8]}:null),Zo:session=>session.tabs,
  TextamisuApi:{stt:async(id,payload,options)=>{calls.push({type:'stt',id,payload,options});return {text:'hello'};},
   translate:async(id,payload,options)=>{calls.push({type:'translate',id,payload,options});return {translation:'你好'};},
   session:async(id,options)=>{calls.push({type:'status',id,options});return {sessionId:id};},...overrides.api},
 });
 vm.runInContext(fs.readFileSync('extension/textamisu-pipeline.js','utf8'),context);
 context.TextamisuPipeline.session=async id=>({sessionId:'remote-'+id});
 context.TextamisuPipeline.end=async id=>calls.push({type:'end',id});
 const code=fs.readFileSync('extension/service-worker.js','utf8'),start=code.indexOf('async function handleTextamisuMessage'),end=code.indexOf('\nconst e =',start);
 vm.runInContext(code.slice(start,end),context);
 const sender={id:'fixture',url:'chrome-extension://fixture/offscreen.html'};
 return {saved,calls,sender,context,send:(message,source=sender)=>context.handleTextamisuMessage(message,source),
  pending:()=>vm.runInContext('textamisuRequests.size',context),pendingSaves:()=>vm.runInContext('textamisuSaves.size',context),
  wav:seconds=>Buffer.from(context.TextamisuPipeline.encodeWav(new Float32Array(16000*seconds))).toString('base64')};
}
const message=(type,payload={},extra={})=>({type,sessionId:'local',rpcId:'call-1',payload,...extra});
const caption={requestId:'stable-caption',sttRequestIds:['stable-stt'],text:'Hello',sourceLanguage:'eng',targetLanguage:'zh'};
const status=()=>message('TEXTAMISU_SESSION_STATUS');

test('only the exact manager or matching runner can dispatch capture RPCs',async()=>{
 const f=fixture();
 for(const sender of [
  {id:'other',url:f.sender.url},
  {id:'fixture',url:'https://www.youtube.com/watch?v=fixture',tab:{id:8}},
  {id:'fixture',url:'chrome-extension://fixture/popup.html'},
  {id:'fixture',url:f.sender.url+'?runnerSessionId=other'},
  {id:'fixture',url:f.sender.url+'?runnerSessionId=local&extra=1'},
 ]) assert.equal((await f.send(status(),sender)).ok,false);
 assert.equal(f.calls.length,0);assert.equal(f.pending(),0);
 const result=await f.send(status(),{id:'fixture',url:f.sender.url+'?runnerSessionId=local'});
 assert.equal(result.ok,true);assert.equal(f.calls[0].id,'remote-local');assert.equal(f.pending(),0);
});

test('a runner cannot start or end a different local session',async()=>{
 const f=fixture(),runner={id:'fixture',url:f.sender.url+'?runnerSessionId=local'};
 for(const type of ['TEXTAMISU_SESSION_START','TEXTAMISU_SESSION_END']) {
  assert.equal((await f.send({type,sessionId:'other'},runner)).ok,false);
  assert.equal((await f.send({type,sessionId:'local'},{id:'fixture',url:'chrome-extension://fixture/popup.html'})).ok,false);
 }
 assert.equal(f.calls.length,0);
 assert.equal((await f.send({type:'TEXTAMISU_SESSION_START',sessionId:'local'},runner)).ok,true);
 assert.equal((await f.send({type:'TEXTAMISU_SESSION_END',sessionId:'local'},runner)).ok,true);
 assert.deepEqual(f.calls,[{type:'end',id:'local'}]);
});

test('capture RPC reconstructs bounded WAV and preserves operation IDs without forwarding fetch options',async()=>{
 const f=fixture(),audioBase64=f.wav(1);
 const result=await f.send(message('TEXTAMISU_STT',{audioBase64,requestId:'stable-stt',sourceLanguage:'eng',audioSpeed:1,url:'https://untrusted.invalid',headers:{Authorization:'forged'},token:'forged'}));
 assert.equal(result.ok,true);assert.equal(f.calls[0].payload.requestId,'stable-stt');assert.equal(f.calls[0].payload.sourceLanguage,'en');
 assert.equal(f.calls[0].payload.audio.size,32044);assert.equal(f.calls[0].payload.audio.type,'audio/wav');
 assert.deepEqual(Object.keys(f.calls[0].payload).sort(),['audio','audioSpeed','mimeType','requestId','sourceLanguage']);
 assert.equal((await f.send(message('TEXTAMISU_TRANSLATE',{...caption,authorization:'forged',baseUrl:'https://untrusted.invalid'}))).ok,true);
 const translated=f.calls[1].payload;
 assert.equal(translated.requestId,'stable-caption');assert.equal(translated.sttRequestIds[0],'stable-stt');assert.equal(translated.targetLanguage,'zh-TW');
 assert.deepEqual(Object.keys(translated).sort(),['previousSourceContext','requestId','sourceLanguage','sttRequestIds','targetLanguage','text']);
 assert.equal(f.pending(),0);
});

test('malformed, oversized and accelerated audio never reaches the provider',async()=>{
 const f=fixture(),valid={audioBase64:f.wav(.1),requestId:'stable-stt',sourceLanguage:'en',audioSpeed:1};
 for(const change of [{audioBase64:'invalid'},{audioBase64:f.wav(.05)},{audioBase64:f.wav(30.1)},{audioBase64:'!'.repeat(4332)},{audioSpeed:2},{requestId:'bad/request'}]) {
  assert.equal((await f.send(message('TEXTAMISU_STT',{...valid,...change}))).ok,false);
  assert.equal(f.pending(),0);
 }
 for(const change of [{sttRequestIds:[]},{sttRequestIds:Array(13).fill('id')},{text:'x'.repeat(4001)},{previousSourceContext:'x'.repeat(1501)}])
  assert.equal((await f.send(message('TEXTAMISU_TRANSLATE',{...caption,...change}))).ok,false);
 assert.equal(f.calls.length,0);
});

test('abort is confined to the request sender and local session, then releases the registry',async()=>{
 let entered,signal;
 const ready=new Promise(resolve=>entered=resolve);
 const f=fixture({api:{translate:async(_id,_payload,options)=>{
  signal=options.signal;entered();return new Promise((_resolve,reject)=>signal.addEventListener('abort',()=>reject(signal.reason),{once:true}));
 }}});
 const pending=f.send(message('TEXTAMISU_TRANSLATE',caption));await ready;
 assert.equal(f.pending(),1);
 assert.equal((await f.send(message('TEXTAMISU_REQUEST_ABORT',{}, {sessionId:'other'}))).ok,true);
 assert.equal(signal.aborted,false);
 assert.equal((await f.send(message('TEXTAMISU_REQUEST_ABORT'),{id:'fixture',url:f.sender.url+'?runnerSessionId=local'})).ok,true);
 assert.equal(signal.aborted,false);
 assert.equal((await f.send(message('TEXTAMISU_REQUEST_ABORT'),{id:'fixture',url:'https://youtube.com',tab:{id:8}})).ok,false);
 assert.equal(signal.aborted,false);
 assert.equal((await f.send(message('TEXTAMISU_TRANSLATE',caption))).ok,false,'duplicate transport ID cannot replace the pending owner');
 assert.equal(f.pending(),1);
 assert.equal((await f.send(message('TEXTAMISU_REQUEST_ABORT'))).ok,true);
 assert.equal((await pending).name,'AbortError');assert.equal(f.pending(),0);
});

test('an abort during session lookup is remembered before a provider call begins',async()=>{
 let release,lookedUp;
 const gate=new Promise(resolve=>release=resolve),entered=new Promise(resolve=>lookedUp=resolve);
 const f=fixture({active:async()=>{lookedUp();await gate;return {tabs:[8]};}});
 const pending=f.send(message('TEXTAMISU_TRANSLATE',caption));await entered;
 await f.send(message('TEXTAMISU_REQUEST_ABORT'));release();
 assert.equal((await pending).name,'AbortError');assert.equal(f.calls.length,0);assert.equal(f.pending(),0);
});

test('provider failures retain status/code while the pending registry is cleared',async()=>{
 const f=fixture({api:{session:async()=>{throw Object.assign(new Error('mock unauthorized'),{status:401,code:'invalid_token'});}}});
 const result=await f.send(status());
 assert.equal(result.ok,false);assert.equal(result.status,401);assert.equal(result.code,'invalid_token');assert.equal(f.pending(),0);
});

test('subtitle save uses only the fixed local key and serializes concurrent appends',async()=>{
 const f=fixture();
 const payload={key:'ytmaruTextamisuToken',metadata:{sessionId:'forged',pageUrl:'https://youtube.com/fixture',pageTitle:'Fixture',unknown:'ignored'},segment:{original:'Hello',translation:'你好',order:1,mediaTime:0,latency:{totalMs:1000,sttFromAudioEndMs:null,audioStartWallTimeMs:null},token:'forged',unknown:'ignored'}};
 const results=await Promise.all([f.send(message('TEXTAMISU_SAVE_SEGMENT',payload)),f.send(message('TEXTAMISU_SAVE_SEGMENT',{...payload,segment:{original:'Second',order:2}},{rpcId:'save-2'}))]);
 assert.ok(results.every(result=>result.ok));assert.deepEqual(Object.keys(f.saved),['liveSubtitleSession:local']);
 const stored=f.saved['liveSubtitleSession:local'];
 assert.equal(stored.sessionId,'local');assert.equal(stored.segments.length,2);assert.equal(stored.segments[0].original,'Hello');assert.equal(stored.segments[1].original,'Second');
 assert.equal(stored.unknown,undefined);assert.equal(stored.segments[0].token,undefined);assert.equal(stored.segments[0].unknown,undefined);assert.equal(stored.segments[0].latency.sttFromAudioEndMs,null);assert.equal(stored.segments[0].latency.audioStartWallTimeMs,null);assert.equal(f.pendingSaves(),0);
 assert.equal(f.calls.length,0,'saving subtitles is not an API operation');
});

test('subtitle storage rejects oversized fields and bounds each session',async()=>{
 const f=fixture();
 for(const segment of [{original:'x'.repeat(8001)},{mediaTime:Infinity},{latency:{bad:[]}}])
  assert.equal((await f.send(message('TEXTAMISU_SAVE_SEGMENT',{segment}))).ok,false);
 assert.equal(Object.keys(f.saved).length,0);
 f.saved['liveSubtitleSession:local']={segments:Array.from({length:10000},()=>({original:'x'}))};
 assert.equal((await f.send(message('TEXTAMISU_SAVE_SEGMENT',{segment:{original:'overflow'}}))).ok,false);
 assert.equal(f.saved['liveSubtitleSession:local'].segments.length,10000);
 f.saved['liveSubtitleSession:local']={segments:[{original:'x'.repeat(4*1024*1024)}]};
 assert.equal((await f.send(message('TEXTAMISU_SAVE_SEGMENT',{segment:{original:'overflow'}}))).ok,false);
 assert.equal(f.saved['liveSubtitleSession:local'].segments.length,1);assert.equal(f.pendingSaves(),0);
});
