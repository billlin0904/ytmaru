const {chromium}=require('playwright');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const fixture=fs.mkdtempSync(path.join(os.tmpdir(),'ytmaru-voice-'));
 const extension=path.join(fixture,'extension');fs.cpSync(path.resolve('extension'),extension,{recursive:true});
 if(process.argv.includes('--baseline')) {
  const {execFileSync}=require('node:child_process');
  for(const name of ['content-script.js','service-worker.js'])fs.writeFileSync(path.join(extension,name),execFileSync('git',['show','138ddb1:extension/'+name]));
 }
 fs.appendFileSync(path.join(extension,'service-worker.js'),'\nglobalThis.__seed = value => { nt=value; at=value[0]; };');
 const content=path.join(extension,'content-script.js');
 fs.writeFileSync(content,fs.readFileSync(content,'utf8').replace('  function ei() {','  window.__renderVoiceFixture = text => { F.currentOriginal="original"; F.currentTranslation=text; F.subtitleDisplayBlank=false; F.subtitleHadContent=true; ei(); };\n  function ei() {'));
 fs.appendFileSync(path.join(extension,'offscreen.js'),'\nchrome.runtime.onMessage.addListener((m,s,reply)=>{ if(m.type==="QA_AUDIO_STATE") { reply({paused:textamisuNarrationAudio?.paused,time:textamisuNarrationAudio?.currentTime,error:textamisuNarrationAudio?.error?.code}); } });');
 const context=await chromium.launchPersistentContext(path.join(fixture,'profile'),{channel:'chromium',executablePath:process.env.YTMARU_BROWSER_EXECUTABLE,headless:true,args:['--disable-extensions-except='+extension,'--load-extension='+extension]});
 try{
 const requests=[],errors=[];let fail=false;
 const wav=Buffer.alloc(44+16000*2*2);wav.write('RIFF');wav.writeUInt32LE(wav.length-8,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);wav.writeUInt32LE(16000,24);wav.writeUInt32LE(32000,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(wav.length-44,40);for(let n=0;n<32000;n++)wav.writeInt16LE(Math.round(Math.sin(n*2*Math.PI*440/16000)*3000),44+n*2);
 await context.route(/^https?:\/\//,r=>r.abort());
 await context.route('https://www.youtube.com/watch?*',r=>r.fulfill({contentType:'text/html',body:'<html><body><video></video></body></html>'}));
 await context.route('https://textamisu.com/**',async r=>{const url=new URL(r.request().url());requests.push(url.pathname);if(url.pathname.endsWith('/tts')){await r.fulfill({status:fail?502:200,contentType:'application/json',body:JSON.stringify(fail?{error:'voice_unavailable',message:'Voice service unavailable'}:{audioBase64:wav.toString('base64'),mimeType:'audio/mpeg'})});return;}await r.fulfill({contentType:'application/json',body:JSON.stringify({sessionId:'remote-fixture',totalMinutes:100,billing:{availableCredits:100}})});});
 const worker=context.serviceWorkers()[0]||await context.waitForEvent('serviceworker');
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto('https://www.youtube.com/watch?v=voice-fixture');
 const tabId=await worker.evaluate(async()=>{await TextamisuApi.saveConfig({token:'pt_sk_fixture_only'});const [tab]=await chrome.tabs.query({url:'https://www.youtube.com/watch?v=voice-fixture'});const config={sourceLang:'eng',targetLang:'zh',provider:'textamisu',sttProvider:'textamisu',syncEnabled:false,videoSyncEnabled:false,liveChatEnabled:false,voiceTranslationEnabled:true};__seed([{sessionId:'voice-local',tabId:tab.id,displayTabId:tab.id,sourceTabId:tab.id,config}]);await chrome.storage.session.set({'textamisuLive:voice-local':{sessionId:'remote-fixture'}});await chrome.scripting.executeScript({target:{tabId:tab.id},files:['wallet-interactions.js','live-chat-shared.js','caption-balance-display.js','content-script.js']});await chrome.tabs.sendMessage(tab.id,{type:'LIVE_SUBTITLE_INIT',sessionId:'voice-local',config});return tab.id;});
 const render=text=>worker.evaluate(async({tabId,text})=>{await chrome.scripting.executeScript({target:{tabId},func:t=>window.__renderVoiceFixture(t),args:[text]});},{tabId,text});
 await render('這是一段配音測試。');
 if(process.argv.includes('--baseline')) {await page.waitForTimeout(1000);assert.equal(requests.filter(x=>x.endsWith('/tts')).length,0);console.log('REPRODUCED: rendered translation produces zero TTS requests in previous version');return;}
 await page.getByText('配音已送出播放',{exact:true}).waitFor({timeout:15000});
 const audio=await worker.evaluate(()=>chrome.runtime.sendMessage({type:'QA_AUDIO_STATE'}));assert.equal(audio.paused,false,JSON.stringify(audio));assert.ok(!audio.error);
 await render('這是一段配音測試。');assert.equal(requests.filter(x=>x.endsWith('/tts')).length,1,'rerender must not duplicate paid TTS');
 fail=true;await render('第二段用來測試失敗提示。');await page.getByText(/配音失敗：/).waitFor();assert.ok(await page.getByText('第二段用來測試失敗提示。',{exact:true}).count());
 assert.deepEqual(errors,[]);console.log('PASS: real renderer -> worker -> mock API -> native offscreen audio playing; deduplication and visible failure verified');
 }finally{await context.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

