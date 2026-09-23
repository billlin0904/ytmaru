const assert=require('node:assert/strict');

// A real, finite media clock is needed by the production chat timeline. Keep
// audio synthetic and local: this fixture never captures a user's video.
function mediaUrl() {
 const rate=8000,samples=rate*60,buffer=Buffer.alloc(44+samples*2);
 buffer.write('RIFF',0);buffer.writeUInt32LE(buffer.length-8,4);buffer.write('WAVEfmt ',8);
 buffer.writeUInt32LE(16,16);buffer.writeUInt16LE(1,20);buffer.writeUInt16LE(1,22);
 buffer.writeUInt32LE(rate,24);buffer.writeUInt32LE(rate*2,28);buffer.writeUInt16LE(2,32);buffer.writeUInt16LE(16,34);
 buffer.write('data',36);buffer.writeUInt32LE(samples*2,40);
 return 'data:audio/wav;base64,'+buffer.toString('base64');
}

module.exports=async function chatReplayBrowser({context,worker,id,billing,waitUntil}) {
 const audio=mediaUrl(),calls=[],results=[];
 let apiError=null;
 await context.route('https://textamisu.com/api/agent/v1/live-sessions/remote-chat-replay/chat-translate',async route=>{
  const body=route.request().postDataJSON();calls.push(body);
  assert.equal(await route.request().headerValue('authorization'),'Bearer pt_sk_fixture_only');
  assert.equal(body.mode,'live-chat');assert.equal(body.sourceLanguage,'ja');assert.equal(body.targetLanguage,'zh-TW');
  assert.ok(body.messages.every(item=>item.id&&item.text));
  assert.doesNotMatch(JSON.stringify(body),/pt_sk_|Bearer/);
  if(apiError) {
   const error=apiError;if(error.delay)await new Promise(resolve=>setTimeout(resolve,error.delay));
   return route.fulfill({status:error.status,contentType:'application/json',body:JSON.stringify({code:error.code,error:error.message})});
  }
  return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({requestId:body.requestId,translations:body.messages.map(item=>({id:item.id,translation:'聊天室翻譯：'+item.text})),billing})});
 });
 await context.route('https://www.youtube.com/live_chat_replay?*',route=>route.fulfill({contentType:'text/html; charset=utf-8',body:`<!doctype html><html><body><yt-live-chat-app><div id="items"></div><yt-live-chat-message-input-renderer><div id="input" contenteditable="true"></div><div id="send-button"><button onclick="window.sentCount=(window.sentCount||0)+1">Send</button></div></yt-live-chat-message-input-renderer></yt-live-chat-app></body></html>`}));
 for(const surface of ['content','mirror'])for(const replay of [false,true]) {
  const sessionId=`chat-${surface}-${replay?'replay':'vod'}`,videoUrl='https://www.youtube.com/watch?v='+sessionId;
  await context.route(videoUrl,route=>route.fulfill({contentType:'text/html; charset=utf-8',body:`<!doctype html><html><head><meta charset="utf-8"><title>Isolated ${sessionId}</title></head><body style="background:#171b25;color:white"><video controls muted loop autoplay src="${audio}" width="700" height="350"></video>${replay?'<ytd-live-chat-frame><iframe id="chatframe" src="https://www.youtube.com/live_chat_replay?v=chat-replay"></iframe></ytd-live-chat-frame>':''}</body></html>`}));
  const sourceTab=await context.newPage();await sourceTab.setViewportSize({width:1280,height:900});await sourceTab.goto(videoUrl);
  await sourceTab.locator('video').evaluate(async video=>{video.muted=true;await video.play();});
  const config={sourceLang:'auto',targetLang:'zh',provider:'textamisu',sttProvider:'textamisu',uiLocale:'zh_TW',syncEnabled:false,videoSyncEnabled:false,liveChatEnabled:true,pageUrl:videoUrl};
  const tabId=await worker.evaluate(async({videoUrl,sessionId,config,surface})=>{
   const [current]=await chrome.tabs.query({url:videoUrl});
   __ytmaruSeedSessions([{sessionId,tabId:current.id,sourceTabId:current.id,displayTabId:current.id,mirrorDelayEnabled:surface==='mirror',config}]);
   await chrome.storage.session.set({['textamisuLive:'+sessionId]:{sessionId:'remote-chat-replay'}});
   await chrome.scripting.executeScript({target:{tabId:current.id},func:()=>{
    const original=chrome.runtime.sendMessage.bind(chrome.runtime);globalThis.__chatUiQA={messages:[]};
    chrome.runtime.sendMessage=function(message,...args){__chatUiQA.messages.push({type:message?.type,config:message?.config});return original(message,...args);};
   }});
   if(surface==='content') {
    await chrome.scripting.executeScript({target:{tabId:current.id},files:['wallet-interactions.js','live-chat-shared.js','caption-balance-display.js','content-script.js']});
    const initialized=await chrome.tabs.sendMessage(current.id,{type:'LIVE_SUBTITLE_INIT',sessionId,config});
    if(!initialized?.ok)throw new Error('Chat fixture initialization failed');
   }
   return current.id;
  },{videoUrl,sessionId,config,surface});
  const tab=surface==='content'?sourceTab:await context.newPage();
  if(surface==='mirror') {
   await tab.setViewportSize({width:1280,height:900});await tab.goto(`chrome-extension://${id}/mirror-viewer.html?sessionId=${sessionId}&uiLocale=zh_TW`);
   await tab.evaluate(()=>{
    const original=chrome.runtime.sendMessage.bind(chrome.runtime);globalThis.__chatUiQA={messages:[]};
    chrome.runtime.sendMessage=function(message,...args){__chatUiQA.messages.push({type:message?.type,config:message?.config});return original(message,...args);};
   });
   await tab.locator('#mirrorVideo').evaluate((video,audio)=>{video.src=audio;video.muted=true;video.loop=true;},audio);
   await tab.waitForFunction(()=>document.getElementById('mirrorVideo').readyState>=3);
   await tab.evaluate(async()=>{__ytmaruSeedMirrorMedia();await document.getElementById('mirrorVideo').play();});
  }
  async function observedMessages() {
   if(surface==='mirror')return tab.evaluate(()=>__chatUiQA.messages);
   return worker.evaluate(async tabId=>{
    const [result]=await chrome.scripting.executeScript({target:{tabId},func:()=>__chatUiQA.messages});return result.result;
   },tabId);
  }
  async function closeCase() {await worker.evaluate(()=>__ytmaruSeedSessions([]));await tab.close();if(tab!==sourceTab)await sourceTab.close();}
  const toggle=tab.locator(surface==='content'?'[data-action="chat-toggle"]':'#chatToggleButton');await toggle.waitFor({state:'attached'});
  if(!replay) {
   assert.equal(await toggle.isHidden(),true,'finite VOD without a chat iframe must not offer chat translation');
   results.push({surface,replay,chatHidden:true});await closeCase();continue;
  }
  await toggle.waitFor({state:'visible',timeout:6000});await toggle.click();
  const selector=tab.locator('select[data-chat-source-language]'),status=tab.locator('.live-chat-status');
  await selector.waitFor({state:'visible'});assert.equal(await selector.inputValue(),'');
  assert.match(await status.innerText(),/請先選擇留言原文語言/);
  const paidBefore=calls.length;
  // Wait longer than both the normal 1.5s scan and 2s batch timers.
  await tab.waitForTimeout(2200);assert.equal(calls.length,paidBefore,'auto without a chosen chat language must never dispatch a paid request');
  const before=await observedMessages();
  if(surface==='content')assert.ok(!before.some(message=>message.type==='LIVE_CHAT_SCAN_FRAMES'),'unconfigured chat must not enqueue messages');
  await selector.selectOption('ja');
  await waitUntil(async()=>{
   const values=await worker.evaluate(tabId=>chrome.scripting.executeScript({target:{tabId,allFrames:true},func:()=>location.pathname==='/live_chat_replay'&&Boolean(globalThis.SubruuLiveChat)}),tabId);
   return values.some(value=>value.result);
  },'production helper injected into the replay frame');
  // Ds() injects then immediately primes trackSourceMessages. Add only new
  // messages after that initial scan, as a real replay does while playing.
  await waitUntil(async()=>/等待.*聊天室留言/.test(await status.innerText()),'replay scan completed');
  const frame=sourceTab.frame({url:/\/live_chat_replay\?/});assert.ok(frame);
  async function appendMessage(key,text) {
   await frame.evaluate(({key,text})=>{
    const node=document.createElement('yt-live-chat-text-message-renderer');node.id=key;
    const author=document.createElement('span');author.id='author-name';author.textContent='Fixture viewer';
    const message=document.createElement('span');message.id='message';message.textContent=text;
    node.append(author,message);document.querySelector('#items').append(node);
   },{key,text});
  }
  await appendMessage('new-replay-1','こんにちは');
  await waitUntil(async()=>/聊天室翻譯：こんにちは/.test(await tab.locator('.live-chat-list').innerText()),'Japanese replay message translated and displayed',10000);
  assert.equal(calls.length,paidBefore+1);
  for(const error of [
   {status:402,code:'insufficient_credits',message:'測試額度不足，請補充 Textamisu 點數。'},
   {status:400,code:'source_language_required',message:'請先選擇聊天室原文語言。'},
   {status:401,code:'invalid_token',message:'Textamisu token 已失效（慢回覆測試）。',delay:5500},
  ]) {
   apiError=error;const beforeFailure=calls.length;
   await appendMessage('error-'+error.status,'失敗'+error.status);
   await waitUntil(async()=>{const value=await status.innerText();return value.includes(error.message)||(/額度|點數/.test(value)&&error.status===402)||(/語言/.test(value)&&error.status===400)||(/token|權杖/.test(value)&&error.status===401);},'chat service error is visible even after the five-second batch lease',12000);
   assert.equal(calls.length,beforeFailure+1,'a displayed service failure must not loop paid retries');
   assert.doesNotMatch(await status.innerText(),/翻譯中/);
   const visibleError=await status.innerText();await tab.waitForTimeout(1700);
   assert.equal(await status.innerText(),visibleError,'the next chat scan must not erase the actionable service error');
  }
  apiError=null;
  const observed={messages:await observedMessages(),sourceLang:await worker.evaluate(sessionId=>__ytmaruSessionSourceLang(sessionId),sessionId)};
  assert.equal(observed.sourceLang,'auto','the independent chat selection must preserve automatic speech detection');
  assert.ok(!observed.messages.some(message=>/^LIVE_CHAT_REPLY_(PREPARE|SEND)$/.test(message.type)),'reading chat translation must not invoke any chatroom send path');
  assert.equal(await frame.evaluate(()=>window.sentCount||0),0);assert.equal(await frame.locator('#input').innerText(),'');
  await tab.screenshot({path:`test-results/chat-replay-${surface}-error.png`,fullPage:true});
  results.push({surface,replay,sourceLang:observed.sourceLang,selectedChatLanguage:await selector.inputValue(),translated:true,errorShown:true,paidRequests:calls.length-paidBefore,sentMessages:0});
  await closeCase();
 }
 return results;
};
