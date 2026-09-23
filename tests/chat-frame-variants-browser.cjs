const assert=require('node:assert/strict');

module.exports=async function chatFrameVariants({context,worker,requests}) {
 const results=[];
 const cases=[
  {name:'visible',expected:true,hostAttrs:'',hostStyle:'',frameStyle:''},
  {name:'hidden',expected:false,hostAttrs:'hidden',hostStyle:'',frameStyle:''},
  {name:'collapsed',expected:false,hostAttrs:'collapsed',hostStyle:'',frameStyle:''},
  {name:'aria-hidden',expected:false,hostAttrs:'aria-hidden="true"',hostStyle:'',frameStyle:''},
  {name:'zero-frame',expected:false,hostAttrs:'',hostStyle:'',frameStyle:'width:0;height:0;border:0'},
  {name:'zero-host',expected:false,hostAttrs:'',hostStyle:'width:0;height:0;overflow:hidden',frameStyle:'width:0;height:0;border:0'},
  {name:'nonchat-src',expected:false,hostAttrs:'',hostStyle:'',frameStyle:'',src:'about:blank'},
 ];
 for(const item of cases) {
  const sessionId='chat-src-less-'+item.name,url='https://www.youtube.com/watch?v='+sessionId;
  await context.route(url,route=>route.fulfill({contentType:'text/html; charset=utf-8',body:`<!doctype html><html><meta charset="utf-8"><body><video width="700" height="300"></video><ytd-live-chat-frame id="chat" ${item.hostAttrs} style="display:block;width:320px;height:200px;${item.hostStyle}"><iframe id="chatframe" ${item.src?'src="'+item.src+'"':''} style="width:100%;height:100%;${item.frameStyle}"></iframe></ytd-live-chat-frame></body></html>`}));
  const tab=await context.newPage();await tab.goto(url);
  const geometry=await tab.locator('#chatframe').evaluate(frame=>({srcAttribute:frame.getAttribute('src'),srcProperty:frame.src,width:frame.getBoundingClientRect().width,height:frame.getBoundingClientRect().height}));
  assert.equal(geometry.srcAttribute,item.src||null);assert.equal(geometry.srcProperty,item.src||'');
  if(item.expected)assert.ok(geometry.width>0&&geometry.height>0);
  const before=requests.length;
  const tabId=await worker.evaluate(async({url,sessionId})=>{
   const [current]=await chrome.tabs.query({url});
   const config={sourceLang:'auto',targetLang:'zh',provider:'textamisu',sttProvider:'textamisu',uiLocale:'zh_TW',syncEnabled:false,videoSyncEnabled:false,pageUrl:url};
   __ytmaruSeedSessions([{sessionId,tabId:current.id,sourceTabId:current.id,displayTabId:current.id,config}]);
   await chrome.scripting.executeScript({target:{tabId:current.id},files:['wallet-interactions.js','live-chat-shared.js','caption-balance-display.js','content-script.js']});
   const initialized=await chrome.tabs.sendMessage(current.id,{type:'LIVE_SUBTITLE_INIT',sessionId,config});
   if(!initialized?.ok)throw new Error('Unable to initialize src-less chat fixture');
   return current.id;
  },{url,sessionId});
  const toggle=tab.locator('[data-action="chat-toggle"]');await toggle.waitFor({state:'attached'});
  assert.equal(await toggle.isVisible(),item.expected,`${item.name}: chat entry visibility must match the rendered chat frame`);
  const scanned=await worker.evaluate(async({tabId,sessionId})=>{
   const [result]=await chrome.scripting.executeScript({target:{tabId},func:sessionId=>chrome.runtime.sendMessage({type:'LIVE_CHAT_SCAN_FRAMES',sessionId,source:'active-session',useSourceTab:true,syncPlayback:true}),args:[sessionId]});
   return result.result;
  },{tabId,sessionId});
  assert.equal(scanned.ok,true);assert.equal(scanned.chatAvailable,item.expected,`${item.name}: worker scan and content UI must agree`);
  assert.equal(scanned.messages.length,0,'availability must not invent chat messages');
  if(item.expected) {
   await toggle.click();await tab.locator('select[data-chat-source-language]').waitFor({state:'visible'});
   assert.match(await tab.locator('.live-chat-status').innerText(),/請先選擇留言原文語言/);
   await tab.screenshot({path:'test-results/chat-src-less-visible.png',fullPage:true});
  }
  assert.ok(!requests.slice(before).some(request=>request.method==='POST'),'availability detection must not create a paid API operation');
  results.push({variant:item.name,entryVisible:item.expected,workerChatAvailable:scanned.chatAvailable,srcAttribute:geometry.srcAttribute,srcProperty:geometry.srcProperty,paidOperations:0});
  await worker.evaluate(()=>__ytmaruSeedSessions([]));await tab.close();
 }
 return results;
};
