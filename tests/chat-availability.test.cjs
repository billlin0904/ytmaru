const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('extension/content-script.js','utf8');
function between(start,end) {
 const from=source.indexOf(start),to=source.indexOf(end,from+start.length);
 assert.ok(from>=0&&to>from);return source.slice(from,to);
}

test('replay iframe is available even after finite VOD availability was cached false',()=>{
 let frames=[],live=false;
 const window={};window.top=window;
 const ownerDocument={defaultView:{getComputedStyle:()=>({display:'block',visibility:'visible'})}};
 const context=vm.createContext({URL,Date,window,location:{href:'https://www.youtube.com/watch?v=fixture'},le:{},ac:()=>true,Pd:()=>({isLiveStream:live,isYouTube:true}),document:{querySelectorAll:selector=>selector==='iframe'?frames.map(src=>({isConnected:true,ownerDocument,getBoundingClientRect:()=>({width:300,height:200}),getClientRects:()=>[{}],hasAttribute:()=>false,getAttribute:attribute=>attribute==='src'?src:null})):[],querySelector:()=>null}});
 vm.runInContext(between('  function youtubeChatPresence()', '  function Ki()')+between('  function Ys()', '  function Xs('),context);
 assert.equal(context.Ys(),false);
 frames=['https://www.youtube.com/live_chat_replay?v=fixture'];
 assert.equal(context.Ys(),true);assert.equal(context.isChatReplay(),true);
 frames=['https://www.youtube.com/live_chat?v=fixture'];live=true;
 assert.equal(context.Ys(),true);assert.equal(context.isChatReplay(),false);
 frames=['https://youtube.com.attacker.invalid/live_chat_replay?v=fixture'];live=false;
 assert.equal(context.Ys(),false,'a lookalike host is not a YouTube chat iframe');
 frames=[];assert.equal(context.Ys(),false,'ordinary finite videos still have no chat entry');
});

test('chat language follows only an explicit selection or supported configured source, never inferred speech',()=>{
 const F={chatSourceLanguage:null,config:{sourceLang:'auto',lastDetectedSourceLang:'jpn',detectedSourceLang:'jpn'}};
 const context=vm.createContext({F});vm.runInContext(between('  function chatSourceLanguage()', '  function changeChatSourceLanguage()'),context);
 assert.equal(context.chatSourceLanguage(),'');
 F.chatSourceLanguage='ja';assert.equal(context.chatSourceLanguage(),'ja');assert.equal(F.config.sourceLang,'auto');
 F.chatSourceLanguage='';assert.equal(context.chatSourceLanguage(),'');
 F.chatSourceLanguage=null;F.config.sourceLang='jpn';assert.equal(context.chatSourceLanguage(),'ja');
 F.config.sourceLang='zh';assert.equal(context.chatSourceLanguage(),'zh-TW');
 F.config.sourceLang='fr';assert.equal(context.chatSourceLanguage(),'');
});

test('a backend error arriving after the batch lease expires remains visible without reviving stale messages',async()=>{
 const item={id:'one',key:'key',author:'Viewer',text:'こんにちは',status:'pending'},F={chatItems:[item],chatPanelOpen:true,config:{targetLang:'zh'}};
 const context=vm.createContext({F,Z:1,re:new Set(['key']),chatSourceLanguage:()=> 'ja',ku:value=>String(value||'').trim(),$i:value=>value,hs:()=> 'textamisu',ps:()=>5,Ki:()=>{},
  vs:async()=>{throw new Error('Textamisu 點數不足');},SubruuLiveChat:{expireTranslation:item=>{item.translationClosed=true;item.status='done';}}});
 vm.runInContext(between('  async function fs(', '  function Ss('),context);
 await context.fs([item],{generation:1,lease:{isCurrent:()=>false}});
 assert.equal(F.chatError,'Textamisu 點數不足');assert.equal(F.chatStatus,F.chatError);
 assert.equal(item.translationClosed,true);assert.equal(item.status,'done');assert.equal(item.translation,undefined);
});
