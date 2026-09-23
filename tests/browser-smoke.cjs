const {chromium}=require('playwright');
const fs=require('fs'),os=require('os'),path=require('path'),assert=require('assert/strict');
(async()=>{
 const fixture=fs.mkdtempSync(path.join(os.tmpdir(),'ytmaru-qa-'));
 const extension=path.join(fixture,'extension');
 fs.cpSync(path.resolve('extension'),extension,{recursive:true});
 // Seed local session ownership in the isolated fixture without requesting a
 // real tabCapture grant. This hook exists only in this temporary test copy.
 fs.appendFileSync(path.join(extension,'service-worker.js'),'\nglobalThis.__ytmaruSeedSessions = value => { nt=value; at=value[0]||null; };\n');
 const context=await chromium.launchPersistentContext(path.join(fixture,'profile'),{channel:process.env.YTMARU_BROWSER_CHANNEL||'chromium',headless:true,args:['--disable-extensions-except='+extension,'--load-extension='+extension]});
 try {
 fs.mkdirSync('test-results',{recursive:true}); const requests=[],errors=[];
 await context.route('https://textamisu.com/**', async route=>{
  const request=route.request(),url=new URL(request.url()); requests.push({method:request.method(),path:url.pathname});
  const billing={rates:{sttCreditsPerMinute:1,captionCreditsPerMinute:1,chatInputCharactersPerCredit:1000},usage:{sttMs:1000,captionMs:1000,chatCharacters:0},chargedCredits:2,availableCredits:98,reservedCredits:0};
  let data;
  if(url.pathname.endsWith('/credits')) data={account:{email:'qa@example.invalid'},totalMinutes:100,textMinutes:100,outputMinutes:100,eligibleMinutes:100};
  else if(url.pathname.endsWith('/live-sessions')) data={sessionId:'remote-qa',billing};
  else if(url.pathname.endsWith('/stt')) data={requestId:'mock-stt',text:'Hello world.',language:'en',durationMs:1000,billableDurationMs:1000,segments:[{start:0,end:1,text:'Hello world.'}],billing};
  else if(url.pathname.endsWith('/translate')) {const body=request.postDataJSON();assert.ok(body.sttRequestIds.length);assert.equal(body.sourceLanguage,'en');assert.equal(body.targetLanguage,'zh-TW');data={requestId:body.requestId,translation:'你好世界。',segments:[{order:0,original:body.text,translation:'你好世界。',isComplete:true}],billing};}
  else if(url.pathname.endsWith('/chat-translate')) {const body=request.postDataJSON();data={requestId:body.requestId,translations:body.messages.map(item=>({id:item.id,translation:'你好。'})),billing};}
  else data={sessionId:'remote-qa',billing};
  await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(data)});
 });
 context.on('request',request=>{if(/subruu|subtitle-translate-|salad\.cloud|googleapis/.test(request.url())) errors.push('Legacy network: '+request.url());});
 const worker=context.serviceWorkers()[0]||await context.waitForEvent('serviceworker');
 const id=new URL(worker.url()).host;
 await worker.evaluate(async()=>{await TextamisuApi.saveConfig({token:'pt_sk_fixture_only'}); await TextamisuPipeline.session('qa-local');});
 const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
 await page.goto(`chrome-extension://${id}/offscreen.html`);
 const result=await page.evaluate(async()=>{
  gc.sessionId='qa-local';gc.isStopping=false;gc.stopRequestedAtMs=0;gc.config=PP({sourceLang:'auto',targetLang:'zh'});
  gc.remoteSessionStarted=true;gc.remoteSessionStartPromise=null;
  const audio=TextamisuPipeline.encodeWav(new Float32Array(16000));
  const response=await pv(audio,{segmentId:'qa-segment',sourceLang:'auto',mimeType:'audio/wav'},{});
  const stt=await response.json();
  const translated=await bA({requestId:'caption-qa',text:stt.text,sourceLang:'auto',targetLang:'zh',walletSttRequestIds:stt.sttRequestIds},30000);
  return {stt:stt.text,ids:stt.sttRequestIds,translation:translated.translation};
 });
 assert.equal(result.translation,'你好世界。');assert.equal(result.ids.length,1);
 await context.route('https://www.youtube.com/watch?v=ytmaru-fixture',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><title>ytmaru test fixture</title><p>Mock video page</p>'}));
 const video=await context.newPage();await video.goto('https://www.youtube.com/watch?v=ytmaru-fixture');
 const chat=await worker.evaluate(async()=>{
  const [tab]=await chrome.tabs.query({url:'https://www.youtube.com/watch?v=ytmaru-fixture'});
  await chrome.scripting.executeScript({target:{tabId:tab.id},files:['wallet-interactions.js']});
  __ytmaruSeedSessions([{sessionId:'qa-local',tabId:tab.id,sourceTabId:tab.id,displayTabId:tab.id,config:{}}]);
  const [result]=await chrome.scripting.executeScript({target:{tabId:tab.id},func:async()=>{
   try { let canReadToken=false;
   try {canReadToken=Boolean((await chrome.storage.session.get('ytmaruTextamisuToken')).ytmaruTextamisuToken);}catch{}
   const translated=await SubruuWalletInteractions.create().translate({sessionId:'qa-local',isCurrent:()=>true},{mode:'live-chat-batch',sourceLang:'eng',targetLang:'zh',text:JSON.stringify([{id:'chat1',text:'Hello'}])});
   return {canReadToken,translation:translated.translation}; } catch(error) {return {error:String(error),stack:error.stack};}
  }});
  return result.result;
 });
 assert.equal(chat.error,undefined);assert.equal(chat.canReadToken,false);assert.equal(JSON.parse(chat.translation)[0].translation,'你好。');
 // Closing the local session first must still allow the capture document to
 // close its existing server session; no new server session may be created.
 await worker.evaluate(()=>{__ytmaruSeedSessions([]);});
 const ended=await page.evaluate(()=>chrome.runtime.sendMessage({type:'TEXTAMISU_SESSION_END',sessionId:'qa-local'}));
 assert.equal(ended.ok,true);
 assert.equal(requests.filter(r=>r.path.endsWith('/live-sessions')).length,1);
 const popup=await context.newPage();popup.on('pageerror',error=>errors.push(error.message));
 await popup.goto(`chrome-extension://${id}/popup.html`);
 await popup.waitForTimeout(500);
 assert.equal(await popup.locator('#statusLabel').innerText(),'待命');
 assert.equal(await popup.locator('#authState').innerText(),'已連線');
 assert.equal(await popup.locator('#accountBalance').innerText(),'100');
 console.log(JSON.stringify({id,result,chat,ended,requests,errors},null,2));
 await popup.screenshot({path:'test-results/popup.png',fullPage:true});
 assert.equal(errors.length,0);
 } finally { await context.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
