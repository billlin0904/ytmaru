const {test}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function fixture(){
 const instances=[];
 class Audio {
  constructor(src){this.src=src;this.pauses=0;instances.push(this);}
  async play(){this.played=true;}
  pause(){this.pauses++;}
  removeAttribute(){this.src='';}
  load(){}
 }
 const s=fs.readFileSync('extension/offscreen.js','utf8');
 const ctx=vm.createContext({Audio,console});
 vm.runInContext(s.slice(s.indexOf('let textamisuNarrationAudio = null;'),s.indexOf('function hc(e = {})')),ctx);
 return {instances,add:(id='session')=>ctx.fc({type:'PLAY_TTS_AUDIO',sessionId:id,audioBase64:'A'.repeat(40)}),stop:id=>ctx.textamisuStopNarration(id)};
}
test('audio plays FIFO without pausing the current sentence',async()=>{
 const f=fixture();await f.add();const next=await f.add();await f.add();
 assert.equal(next.queued,true);assert.equal(f.instances.length,1);assert.equal(f.instances[0].pauses,0);
 f.instances[0].onended();assert.equal(f.instances.length,2);
 f.instances[1].onended();assert.equal(f.instances.length,3);
 f.instances[2].onended();assert.equal(f.instances.length,3);
});
test('stop clears pending audio and releases playing audio',async()=>{
 const f=fixture();await f.add();await f.add();f.stop('session');
 assert.equal(f.instances[0].pauses,1);assert.equal(f.instances[0].src,'');assert.equal(f.instances.length,1);
 await f.add('new');assert.equal(f.instances.length,2);
});
test('an audio decoding error advances to the next sentence',async()=>{
 const f=fixture();await f.add();await f.add();f.instances[0].onerror();assert.equal(f.instances.length,2);
});
