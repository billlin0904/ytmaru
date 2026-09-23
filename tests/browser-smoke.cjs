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
 fs.mkdirSync('test-results',{recursive:true}); const requests=[],errors=[],quotaResults=[];
 let balanceFixture=null,missingSessionFixture=false;
 const billing={rates:{sttCreditsPerMinute:1,captionCreditsPerMinute:1,chatInputCharactersPerCredit:1000},usage:{sttMs:1000,captionMs:1000,chatCharacters:0},chargedCredits:2,availableCredits:98,reservedCredits:0};
 context.on('page',tab=>tab.on('pageerror',error=>errors.push(`${tab.url()}: ${error.message}`)));
 // Deny any unmocked network request. The browser fixture must never contact a
 // real video site or translation service, including after a regression.
 await context.route(/^https?:\/\//,route=>route.abort('blockedbyclient'));
 await context.route('https://textamisu.com/**', async route=>{
  const request=route.request(),url=new URL(request.url()); requests.push({method:request.method(),path:url.pathname});
  if(missingSessionFixture&&request.method()==='POST'&&url.pathname.endsWith('/live-sessions')){
   // Express-style HTML is deliberately not JSON. Include private-looking
   // fixture text so the assertion also catches accidental response-body leaks.
   await route.fulfill({status:404,contentType:'text/html; charset=utf-8',body:'<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Error</title></head><body><pre>Cannot POST /api/agent/v1/live-sessions</pre><!-- DO_NOT_EXPOSE_RESPONSE_BODY pt_sk_fixture_only --></body></html>'});return;
  }
  const current=balanceFixture;
  const balanceRequest=request.method()==='GET'&&(url.pathname.endsWith('/credits')||url.pathname.endsWith('/'+current?.remoteId));
  if(current&&balanceRequest){current.requests++;await current.gate;}
  if(current&&request.method()==='GET'&&url.pathname.endsWith('/'+current.remoteId)&&current.mode==='missing'){
   await route.fulfill({status:404,contentType:'application/json',body:JSON.stringify({error:{code:'not_found',message:'Fixture session is unavailable'}})});return;
  }
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
 await context.route('https://www.youtube.com/watch?*',route=>route.fulfill({contentType:'text/html; charset=utf-8',body:'<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><title>ytmaru test fixture</title><body style="background:#171b25;color:#dae1ef;font-family:system-ui;margin:40px"><h1>ytmaru 隔離測試影片</h1><video controls width="960" height="360" style="background:#080b11"></video></body></html>'}));
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
 await page.close();await video.close();

 // Exercise the real offscreen startup -> runtime message -> worker -> API
 // path with a missing deployment route. Do not call the API directly or
 // replace the production startup function with a test-only implementation.
 missingSessionFixture=true;
 const missingStartIndex=requests.length;
 const missingCapture=await context.newPage();
 await missingCapture.goto(`chrome-extension://${id}/offscreen.html`);
 await worker.evaluate(async()=>{
  const [tab]=await chrome.tabs.query({url:chrome.runtime.getURL('offscreen.html')});
  __ytmaruSeedSessions([{sessionId:'qa-missing-route',tabId:tab.id,sourceTabId:tab.id,displayTabId:tab.id,config:{}}]);
 });
 const missingSessionRoute=await missingCapture.evaluate(async()=>{
  gc.sessionId='qa-missing-route';gc.isStopping=false;gc.stopRequestedAtMs=0;
  gc.config=PP({sourceLang:'eng',targetLang:'zh'});
  gc.remoteSessionStarted=false;gc.remoteSessionStartPromise=null;
  try {await Tx();return {ok:true,remoteSessionStarted:gc.remoteSessionStarted};}
  catch(error){return {ok:false,message:error.message,status:error.status,remoteSessionStarted:gc.remoteSessionStarted};}
 });
 assert.equal(missingSessionRoute.ok,false);
 assert.equal(missingSessionRoute.status,404);
 assert.equal(missingSessionRoute.remoteSessionStarted,false);
 assert.match(missingSessionRoute.message,/POST \/live-sessions/);
 assert.match(missingSessionRoute.message,/HTTP 404/);
 assert.match(missingSessionRoute.message,/Content-Type: text\/html/);
 assert.match(missingSessionRoute.message,/路徑回傳 404/);
 assert.match(missingSessionRoute.message,/請確認 API 網址與直播 API 是否已部署/);
 assert.doesNotMatch(JSON.stringify(missingSessionRoute),/<!DOCTYPE|<html|Cannot POST|DO_NOT_EXPOSE_RESPONSE_BODY|pt_sk_|Bearer/);
 const missingPosts=requests.slice(missingStartIndex).filter(request=>request.method==='POST');
 assert.deepEqual(missingPosts,[{method:'POST',path:'/api/agent/v1/live-sessions'}],'a failed session start must not retry creation or send STT/chat/translation');
 const missingRemote=await worker.evaluate(async()=>{
  __ytmaruSeedSessions([]);
  return (await chrome.storage.session.get('textamisuLive:qa-missing-route'))['textamisuLive:qa-missing-route']||null;
 });
 assert.equal(missingRemote,null,'failed creation must not persist a usable remote session');
 await missingCapture.close();missingSessionFixture=false;

 async function waitUntil(check,label,timeout=5000){
  const deadline=Date.now()+timeout;
  while(Date.now()<deadline){if(await check())return;await new Promise(resolve=>setTimeout(resolve,50));}
  throw new Error('Timed out: '+label);
 }
 function cleanPanel(text,label){
  assert.doesNotMatch(text,/slow_credit|USD|智慧搜尋|\$/i,label+' must not contain legacy billing');
  for(const metric of ['音訊時長','字幕緩衝','延遲'])assert.ok(text.includes(metric),label+' missing '+metric);
 }
 // These are the production injection order and startup message. No test-only
 // renderer or synthetic usage event is used: the first open itself must work.
 async function quotaCase(surface,mode){
  const sessionId=`quota-${surface}-${mode}`,remoteId=`remote-${sessionId}`;
  let release;
  const gate=new Promise(resolve=>{release=resolve;});
  balanceFixture={mode,remoteId,requests:0,gate};
  const tab=await context.newPage();
  await tab.setViewportSize({width:1280,height:900});
  const videoUrl=`https://www.youtube.com/watch?v=${sessionId}`;
  await tab.goto(videoUrl);
  const config={sourceLang:'eng',targetLang:'zh',provider:'textamisu',sttProvider:'textamisu',uiLocale:'zh_TW',syncEnabled:false,videoSyncEnabled:false,liveChatEnabled:false};
  const tabId=await worker.evaluate(async({videoUrl,sessionId,remoteId,mode,config,surface})=>{
   const [current]=await chrome.tabs.query({url:videoUrl});
   __ytmaruSeedSessions([{sessionId,tabId:current.id,sourceTabId:current.id,displayTabId:current.id,mirrorDelayEnabled:surface==='mirror',config}]);
   if(mode!=='pending')await chrome.storage.session.set({['textamisuLive:'+sessionId]:{sessionId:remoteId}});
   if(surface==='content'){
    await chrome.scripting.executeScript({target:{tabId:current.id},files:['wallet-interactions.js','live-chat-shared.js','caption-balance-display.js','content-script.js']});
    const initialized=await chrome.tabs.sendMessage(current.id,{type:'LIVE_SUBTITLE_INIT',sessionId,config});
    if(!initialized?.ok)throw new Error('LIVE_SUBTITLE_INIT failed: '+JSON.stringify(initialized));
   }
   return current.id;
  },{videoUrl,sessionId,remoteId,mode,config,surface});
  if(surface==='mirror')await tab.goto(`chrome-extension://${id}/mirror-viewer.html?sessionId=${sessionId}&uiLocale=zh_TW`);
  const panel=tab.locator(surface==='content'?'.usage-panel':'#usagePanel');
  const toggle=tab.locator(surface==='content'?'button[data-action="usage-toggle"]':'#usageToggleButton');
  await toggle.waitFor({state:'attached'});
  // Include hidden initial markup, so obsolete rows cannot merely be hidden
  // after a balance update to make this assertion pass.
  cleanPanel(await panel.textContent(),`${surface}/${mode} initial mount`);
  if(await toggle.getAttribute('aria-expanded')!=='true')await toggle.click();
  await panel.waitFor({state:'visible'});
  cleanPanel(await panel.innerText(),`${surface}/${mode} first open`);
  await waitUntil(()=>balanceFixture.requests>0,`${surface}/${mode} balance request`);
  assert.match(await panel.innerText(),/讀取中/,`${surface}/${mode} pending request state`);
  // Use the real drag interaction to bring the downward-opening panel into
  // view. Keep the initial mount/open assertions above at the default position.
  const handle=await tab.locator('.status-pill').boundingBox();
  await tab.mouse.move(handle.x+handle.width/2,handle.y+handle.height/2);
  await tab.mouse.down();
  await tab.mouse.move(handle.x+handle.width/2,30,{steps:10});
  await tab.mouse.up();
  const bounds=await panel.boundingBox();
  assert.ok(bounds&&bounds.y>=0&&bounds.y+bounds.height<=900,`${surface}/${mode} full panel must fit screenshot after toolbar drag`);
  if(mode==='ready')await tab.screenshot({path:`test-results/${surface}-quota-loading.png`,fullPage:true});
  release();
  const expected=mode==='ready'?/可用 98／預留 0 credits/:/帳戶餘額 100 credits/;
  await waitUntil(async()=>expected.test(await panel.innerText()),`${surface}/${mode} balance result`,9000);
  const text=await panel.innerText();cleanPanel(text,`${surface}/${mode} result`);
  assert.doesNotMatch(text,/讀取中/,`${surface}/${mode} must leave loading state`);
  if(mode==='ready'){
   assert.match(text,/本次已扣\s*2 credits/);assert.match(text,/字幕 1 credits／分鐘/);
  }else{
   assert.match(text,/本次已扣\s*尚未取得/);assert.match(text,mode==='missing'?/404/:/尚未就緒/);
   assert.doesNotMatch(text,/可用 100|預留 0/,`${surface}/${mode} must not invent usable or reserved balance`);
   assert.equal(await panel.locator('[data-balance-field="balance"]').evaluate(element=>element.closest('.usage-row').querySelector('dt').textContent),'帳戶餘額');
  }
  await tab.screenshot({path:`test-results/${surface}-quota-${mode}.png`,fullPage:true});
  quotaResults.push({surface,mode,tabId,text});
  await worker.evaluate(()=>__ytmaruSeedSessions([]));
  await tab.close();balanceFixture=null;
 }
 for(const surface of ['content','mirror'])for(const mode of ['ready','pending','missing'])await quotaCase(surface,mode);

 const popup=await context.newPage();popup.on('pageerror',error=>errors.push(error.message));
 await popup.goto(`chrome-extension://${id}/popup.html`);
 await popup.waitForTimeout(500);
 assert.equal(await popup.locator('#statusLabel').innerText(),'待命');
 assert.equal(await popup.locator('#authState').innerText(),'已連線');
 assert.equal(await popup.locator('#accountBalance').innerText(),'100');
 const report={id,result,chat,ended,missingSessionRoute,quotaResults,requests,errors};
 fs.writeFileSync('test-results/browser-smoke.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));
 await popup.screenshot({path:'test-results/popup.png',fullPage:true});
 assert.equal(errors.length,0);
 } finally { await context.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
