const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {webcrypto}=require('node:crypto');
function fixture(local = {}) {
  const saved={},calls=[];
  let starts=0;
  const context=vm.createContext({console,Blob,ArrayBuffer,Uint8Array,Float32Array,DataView,TextEncoder,DOMException,crypto:webcrypto,
    chrome:{storage:{local:{get:async key=>key===null?{...local}:{[key]:local[key]},set:async values=>Object.assign(local,values),remove:async key=>delete local[key]},session:{get:async key=>({[key]:saved[key]}),set:async values=>Object.assign(saved,values),remove:async key=>delete saved[key]}}},
    TextamisuApi:{startSession:async()=>{starts++;return {sessionId:'remote-1'};},endSession:async id=>calls.push({end:id}),stt:async(id,payload,options)=>{calls.push({id,payload,options});const length=(await payload.audio.arrayBuffer()).byteLength;return {text:'hello',language:'en',segments:[{start:0,end:1,text:'hello'}],durationMs:(length-44)/32,billableDurationMs:(length-44)/32,billing:{chargedCredits:1}};}}});
  vm.runInContext(fs.readFileSync('extension/textamisu-pipeline.js','utf8'),context);
  return {api:context.TextamisuPipeline,calls,saved,local,starts:()=>starts};
}
test('parallel audio/chat starts share one persisted remote billing session',async()=>{
  const f=fixture(); await Promise.all([f.api.session('a'),f.api.session('a')]); assert.equal(f.starts(),1);
  await f.api.session('a'); assert.equal(f.starts(),1);
  await f.api.end('a'); assert.deepEqual(f.calls,[{end:'remote-1'}]); assert.equal(Object.keys(f.saved).length,0);
  await f.api.end('a'); assert.equal(f.starts(),1);
});
test('PCM WAV stays mono 16k and clips bounded samples',()=>{
  const f=fixture(),wav=f.api.encodeWav(new Float32Array([-2,-.5,0,.5,2])),read=f.api.wavSamples(wav);
  assert.equal(read.length,5); assert.equal(read[0],-1); assert.ok(Math.abs(read[3]-.5)<.0001); assert.ok(read[4]<1);
  assert.equal(f.api.wavSamples(new ArrayBuffer(2)),null);
});
test('long audio splits at 30s, keeps all STT IDs and preserves segment offsets',async()=>{
  const f=fixture(),signal=new AbortController().signal;
  const result=await f.api.stt('a',f.api.encodeWav(new Float32Array(16000*31)),{segmentId:'seg1',sourceLang:'eng'},signal);
  assert.equal(f.calls.length,2); assert.equal(result.durationMs,31000); assert.equal(result.sttRequestIds.length,2);
  assert.equal(result.segments[1].start,30); assert.equal(f.calls[0].payload.sourceLanguage,'en'); assert.equal(f.calls[0].options.signal,signal);
  assert.ok(f.calls.every(c=>c.payload.audio.size<=960044));
});
test('transport retry reuses IDs; new generation and source language use distinct IDs',async()=>{
  const f=fixture(),audio=f.api.encodeWav(new Float32Array(1600));
  const a=await f.api.stt('a',audio,{segmentId:'same',sourceLang:'eng'});
  const b=await f.api.stt('a',audio,{segmentId:'same',sourceLang:'eng'});
  const c=await f.api.stt('a',audio,{segmentId:'same',sourceLang:'jpn'});
  const d=await f.api.stt('a',audio,{segmentId:'same',sourceLang:'eng',timelineRevision:2});
  assert.equal(a.sttRequestIds[0],b.sttRequestIds[0]); assert.notEqual(a.sttRequestIds[0],c.sttRequestIds[0]); assert.notEqual(a.sttRequestIds[0],d.sttRequestIds[0]);
});
test('audio just over 30 seconds does not leave a subminimum trailing request',async()=>{
  const f=fixture();
  const result=await f.api.stt('a',f.api.encodeWav(new Float32Array(480160)),{segmentId:'tail'});
  assert.equal(result.durationMs,30010);assert.equal(f.calls.length,2);
  assert.ok(f.calls.every(c=>c.payload.audio.size>=3244 && c.payload.audio.size<=960044));
});
test('aborted audio never submits a paid STT operation',async()=>{
  const f=fixture(),controller=new AbortController();controller.abort();
  await assert.rejects(f.api.stt('a',f.api.encodeWav(new Float32Array(10)),{},controller.signal),{name:'AbortError'});
  assert.equal(f.calls.length,0);
});

test('reload closes journaled orphan sessions before creating a replacement',async()=>{
  const f=fixture({'textamisuRemote:old':'remote-old'});
  await f.api.session('new');
  assert.deepEqual(f.calls,[{end:'remote-old'}]);
  assert.equal(f.local['textamisuRemote:old'],undefined);
  assert.equal(f.local['textamisuRemote:new'],'remote-1');
  await f.api.end('new');
  assert.deepEqual(f.local,{});
});
test('recovery keeps sessions still owned by the current worker lifetime',async()=>{
  const f=fixture({'textamisuRemote:other':'remote-other'});
  f.saved['textamisuLive:other']={sessionId:'remote-other'};
  await f.api.session('new');
  assert.deepEqual(f.calls,[]);
  assert.equal(f.local['textamisuRemote:other'],'remote-other');
});
