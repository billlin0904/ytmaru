import './textamisu-network-guard.js';
import './textamisu-api.js';
import './textamisu-pipeline.js';
chrome.storage.session.setAccessLevel({accessLevel:'TRUSTED_CONTEXTS'}).catch(console.error);
async function handleTextamisuMessage(message,sender) {
 let running;
 try {
  if(sender?.id!==chrome.runtime.id) throw new Error('無效的擴充功能來源');
  const internal=String(sender.url||'').startsWith(chrome.runtime.getURL(''));
  const privileged=['TEXTAMISU_STT','TEXTAMISU_TRANSLATE','TEXTAMISU_SESSION_STATUS','TEXTAMISU_REQUEST_ABORT','TEXTAMISU_SAVE_SEGMENT'].includes(message.type);
  if(privileged || ['TEXTAMISU_SESSION_START','TEXTAMISU_SESSION_END'].includes(message.type)) {
   const page=chrome.runtime.getURL('offscreen.html');
   if(sender.url!==page && sender.url!==`${page}?runnerSessionId=${encodeURIComponent(message.sessionId)}`) throw new Error('此操作僅限字幕擷取文件');
   textamisuIdentifier(message.sessionId);
  }
  if(privileged) {
   textamisuIdentifier(message.rpcId);
   if(message.type==='TEXTAMISU_REQUEST_ABORT') {
    const pending=textamisuRequests.get(message.rpcId);
    if(pending && pending.sessionId===message.sessionId && pending.senderUrl===sender.url) pending.controller.abort(new DOMException('已取消請求','AbortError'));
    return {ok:true};
   }
   if(message.type!=='TEXTAMISU_SAVE_SEGMENT') {
    if(textamisuRequests.has(message.rpcId)) throw new Error('背景請求識別碼重複');
    running={sessionId:message.sessionId,senderUrl:sender.url,controller:new AbortController()};
    // Register before awaiting storage so an immediate abort cannot be lost.
    textamisuRequests.set(message.rpcId,running);
   }
  }
  if(message.type==='TEXTAMISU_SESSION_END') {
   if(!internal) throw new Error('無效的來源');
   for(const pending of textamisuRequests.values()) if(pending.sessionId===message.sessionId) pending.controller.abort(new DOMException('字幕工作階段已結束','AbortError'));
   await TextamisuPipeline.end(message.sessionId); return {ok:true};
  }
  const active=await xo(message.sessionId);
  if(!active || (!internal&&!Zo(active).includes(Number(sender.tab?.id)))) throw new Error('字幕工作階段已結束');
  if(message.type==='TEXTAMISU_SESSION_START') { if(!internal) throw new Error('無效的來源'); return {ok:true,data:await TextamisuPipeline.session(message.sessionId)}; }
  if(message.type==='TEXTAMISU_SAVE_SEGMENT') return {ok:true,data:await textamisuSaveSegment(message.sessionId,message.payload)};
  if(message.type==='TEXTAMISU_TTS') {
   const payload=textamisuTtsPayload(message.payload),remote=await TextamisuPipeline.session(message.sessionId);
   const result=await TextamisuApi.tts(remote.sessionId,payload);
   if(!await xo(message.sessionId)) throw new Error('字幕工作階段已結束');
   return {ok:true,data:result};
  }
  if(running) {
   const signal=running.controller.signal;
   if(signal.aborted) throw signal.reason;
   // Validate and reconstruct only the fixed operation's bounded fields. No URL,
   // headers, credentials, remote session ID or fetch options cross this boundary.
   const payload=message.type==='TEXTAMISU_STT' ? textamisuSttPayload(message.payload)
    : message.type==='TEXTAMISU_TRANSLATE' ? textamisuCaptionPayload(message.payload) : null;
   const remote=await TextamisuPipeline.session(message.sessionId);
   if(signal.aborted) throw signal.reason;
   if(!await xo(message.sessionId)) throw new Error('字幕工作階段已結束');
   const result=message.type==='TEXTAMISU_STT' ? await TextamisuApi.stt(remote.sessionId,payload,{signal})
    : message.type==='TEXTAMISU_TRANSLATE' ? await TextamisuApi.translate(remote.sessionId,payload,{signal})
    : await TextamisuApi.session(remote.sessionId,{signal});
   if(signal.aborted) throw signal.reason;
   if(!await xo(message.sessionId)) throw new Error('字幕工作階段已結束');
   return {ok:true,data:result};
  }
  if(message.type==='TEXTAMISU_CHAT_TRANSLATE') {
   const remote=await TextamisuPipeline.session(message.sessionId), payload=message.payload||{};
   const result=await TextamisuApi.chatTranslate(remote.sessionId,{...payload,sourceLanguage:TextamisuPipeline.language(payload.sourceLanguage),targetLanguage:TextamisuPipeline.language(payload.targetLanguage)});
   if(!await xo(message.sessionId)) throw new Error('字幕工作階段已結束');
   return {ok:true,data:result};
  }
  return {ok:false,error:'不支援的 Textamisu 訊息'};
 } catch(error) { return {ok:false,error:error.message,name:error.name,code:error.code,status:error.status,requestId:error.requestId}; }
 finally { if(running && textamisuRequests.get(message.rpcId)===running) textamisuRequests.delete(message.rpcId); }
}
const textamisuRequests=new Map(), textamisuSaves=new Map(), textamisuNarrationContext=new Map();
function textamisuIdentifier(value) {
 if(typeof value!=='string'||!/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(value)) throw new Error('無效的背景請求識別碼');
 return value;
}
function textamisuText(value,max,optional=false) {
 if(optional && (value===undefined || value===null || value==='')) return '';
 if(typeof value!=='string'||(!optional&&!value.trim())||value.includes('\0')||Array.from(value).length>max) throw new Error('字幕文字為空白或超過長度限制');
 return value;
}
function textamisuSttPayload(payload={}) {
 const encoded=payload.audioBase64;
 if(typeof encoded!=='string'||encoded.length<4328||encoded.length>1280060||encoded.length%4||!/^[A-Za-z0-9+/]*={0,2}$/.test(encoded)||payload.audioSpeed!==1) throw new Error('無效或過大的 WAV 音訊');
 const raw=atob(encoded),bytes=Uint8Array.from(raw,c=>c.charCodeAt(0));
 if(bytes.length<3244||bytes.length>960044) throw new Error('音訊長度須介於 0.1 至 30 秒');
 const samples=TextamisuPipeline.wavSamples(bytes.buffer);
 if(!samples||samples.length<1600||samples.length>480000) throw new Error('音訊須為 16kHz 單聲道 PCM WAV');
 return {audio:new Blob([bytes],{type:'audio/wav'}),mimeType:'audio/wav',requestId:textamisuIdentifier(payload.requestId),sourceLanguage:TextamisuPipeline.language(textamisuText(payload.sourceLanguage,32)),audioSpeed:1};
}
function textamisuCaptionPayload(payload={}) {
 if(!Array.isArray(payload.sttRequestIds)||payload.sttRequestIds.length<1||payload.sttRequestIds.length>12) throw new Error('字幕須有 1 至 12 筆語音辨識來源');
 return {requestId:textamisuIdentifier(payload.requestId),sttRequestIds:payload.sttRequestIds.map(textamisuIdentifier),text:textamisuText(payload.text,4000),sourceLanguage:TextamisuPipeline.language(textamisuText(payload.sourceLanguage,32)),targetLanguage:TextamisuPipeline.language(textamisuText(payload.targetLanguage,32)),previousSourceContext:textamisuText(payload.previousSourceContext,1500,true)};
}
function textamisuTtsPayload(payload={}) {
 return {text:textamisuText(payload.text,240),previousText:textamisuText(payload.previousText,500,true)};
}
async function textamisuSaveSegment(localId,payload={}) {
 const metadata=payload.metadata||{},input=payload.segment||{},segment={};
 const fields={original:8000,translation:8000,language:32,translatedTo:32,segmentationMethod:120,splitReason:256,requestId:200,createdAt:64};
 for(const [key,max] of Object.entries(fields)) if(input[key]!==undefined) segment[key]=input[key]===null ? null : textamisuText(input[key],max,true);
 for(const key of ['order','mediaTime','displayAfterMediaTime','audioStartMediaTime','audioEndMediaTime']) if(input[key]!==undefined) {
  if(input[key]!==null && (typeof input[key]!=='number'||!Number.isFinite(input[key])||Math.abs(input[key])>1e12)) throw new Error('無效的字幕時間');
  segment[key]=input[key];
 }
 if(input.latency!==undefined) {
  if(input.latency===null) segment.latency=null;
  else {
   if(typeof input.latency!=='object'||Array.isArray(input.latency)||Object.keys(input.latency).length>64) throw new Error('無效的字幕延遲資料');
   segment.latency={};
   for(const [key,value] of Object.entries(input.latency)) {
    if(!/^[A-Za-z][A-Za-z0-9_]{0,63}$/.test(key)||(value!==null&&!['number','string','boolean'].includes(typeof value))||typeof value==='number'&&!Number.isFinite(value)||typeof value==='string'&&value.length>200) throw new Error('無效的字幕延遲資料');
    Object.defineProperty(segment.latency,key,{value,enumerable:true});
   }
  }
 }
 const initial={sessionId:localId,pageUrl:textamisuText(metadata.pageUrl,4096,true),pageTitle:textamisuText(metadata.pageTitle,1000,true),sourceLang:textamisuText(metadata.sourceLang,32,true),targetLang:textamisuText(metadata.targetLang,32,true),startedAt:textamisuText(metadata.startedAt,64,true)||new Date().toISOString(),savedTo:'local-mvp-fallback',segments:[]};
 const prior=textamisuSaves.get(localId)||Promise.resolve();
 const pending=prior.catch(()=>{}).then(async()=>{
  const key=`liveSubtitleSession:${localId}`,saved=(await chrome.storage.local.get(key))[key]||initial;
  if(!Array.isArray(saved.segments)) saved.segments=[];
  if(saved.segments.length>=10000) throw new Error('本機字幕已達儲存上限');
  saved.segments.push(segment);saved.updatedAt=new Date().toISOString();
  if(JSON.stringify(saved).length>4*1024*1024) throw new Error('本機字幕已達儲存上限');
  await chrome.storage.local.set({[key]:saved});return {saved:true};
 });
 textamisuSaves.set(localId,pending);
 try { return await pending; } finally { if(textamisuSaves.get(localId)===pending) textamisuSaves.delete(localId); }
}
const e = new Map(),
  t = "offscreen.html",
  a = new Map(),
  n = new Map(),
  r = new Map(),
  i = "popup.html",
  s = "activeLiveSubtitleSession",
  o = "activeLiveSubtitleSessions",
  c = "lastLiveSubtitleReusableSession",
  l = "subtitle-translate-67b5d",
  d = "AIzaSyCGbS_67-COo9Ex4KvzeRjbRrniM_qr5B8",
  u = "https://textamisu.com/api/agent/v1",
  m = !1,
  f = "https://subruu-wallet-qa-702065401683.us-central1.run.app",
  g = "walletQaOriginalProfile";
let h = !1;
const p = 2,
  b = "liveSubtitleAuth",
  y = "liveSubtitleAnonymousAuth",
  w = "liveSubtitleInstallCredential",
  S = "/caption-anonymous/bootstrap",
  v = 12e3,
  I = 65536,
  T = 992,
  M = 80,
  k = 1200,
  E = "liveSubtitleLastStartFailure",
  C = 3e5,
  L = new Set([
    "https://subruu.com",
    "https://live-subtitle.com",
    "https://subtitle-translate-67b5d.web.app",
    "https://subtitle-translate-67b5d.firebaseapp.com",
  ]),
  A = 6,
  D = 2,
  R = 120,
  _ = 10,
  N = 10,
  P = 10,
  U = 20,
  x = 25,
  B = 10,
  V = 3,
  K = 86400,
  q = 10,
  O = 24,
  $ = 20,
  F = 30,
  H = "fast",
  j = "wait-first-mse",
  W = "mse-fast-llm",
  G = 30,
  z = 30,
  J = 10,
  Y = 12,
  Q = 4500,
  X = 200,
  Z = 0.35,
  ee = 3,
  te = 1200,
  ae = 1800,
  ne = 600,
  re = 0.35,
  ie = "lt-h",
  se = 8e3,
  oe = 250,
  ce = 3e5,
  le = 15e3,
  de = 7e3,
  ue = 350,
  me = 24e4,
  fe = [9101, 9102],
  ge = 6e4,
  he = 100663296,
  pe = 320,
  be = 4e3,
  ye = 2e4,
  we = 12e4,
  Se = [
    { id: 9121, urlFilter: "||instagram.com/" },
    { id: 9122, urlFilter: "||cdninstagram.com/" },
    { id: 9123, urlFilter: "||fbcdn.net/" },
    { id: 9124, urlFilter: "||fbsbx.com/" },
    { id: 9125, urlFilter: "||facebook.com/" },
  ],
  ve = Se.map((e) => e.id),
  Ie = "viewer-sync",
  Te = "mse-audio-buffer",
  Me = "instant-overlay",
  ke = "mirror-delay",
  Ee = 12e3,
  Ce = 25e3,
  Le = 6e4,
  Ae = 3,
  De = 6e3,
  Re = 4500,
  _e = 2500,
  Ne = 1e4,
  Pe = 15e3,
  Ue = 15e3,
  xe = 3e3,
  Be = 750,
  Ve = 6e3,
  Ke = 8,
  qe = 160,
  Oe = !0,
  $e = 60,
  Fe = 1,
  He = 2,
  je = !1,
  We = {
    "lt-a": 4,
    "lt-b": 4,
    "lt-d": 25,
    "lt-c": 25,
    "lt-l": 4,
    "lt-j": 4,
    "textGatewayA-gpt-5.6-luna": 10,
    "lt-k": 4,
    "lt-n": 4,
    textEngineD: 10,
    "lt-h": 6,
    "lt-i": 6,
  },
  Ge = {
    "st-e": 10,
    "st-h": 10,
    "st-f": 10,
    "st-g": 10,
    "st-a": 12,
    "st-b": 12,
    "st-i": 10,
    "st-j": 6,
    "st-k": 8,
    "st-l": 8,
    "st-m": 8,
  },
  ze = {
    "lt-a": "lt-a",
    "lt-b": "lt-b",
    "lt-c": "lt-c",
    "lt-d": "lt-d",
    "lt-j": "lt-j",
    "lt-m": "textGatewayA-gpt-5.6-luna",
    "lt-e": "lt-e",
    "lt-f": "lt-f",
    "lt-g": "lt-g",
    "lt-h": "lt-h",
    "lt-i": "lt-i",
    "lt-k": "lt-k",
    "lt-l": "lt-l",
    "lt-n": "lt-n",
  },
  Je = {
    "st-a": "st-a",
    "st-b": "st-b",
    "st-i": "st-i",
    "st-j": "st-j",
    "st-c": "st-c",
    "st-d": "st-d",
    "st-e": "st-e",
    "st-f": "st-f",
    "st-g": "st-g",
    "st-h": "st-h",
    "st-k": "st-k",
    "st-l": "st-l",
    "st-m": "st-m",
  },
  Ye = {
    zh: "zho",
    cmn: "zho",
    en: "eng",
    ja: "jpn",
    ko: "kor",
    es: "spa",
    fr: "fra",
    de: "deu",
    hi: "hin",
    ar: "ara",
    pt: "por",
    ru: "rus",
    bn: "ben",
    id: "ind",
    vi: "vie",
    hy: "hye",
    as: "asm",
    az: "aze",
    be: "bel",
    bs: "bos",
    bg: "bul",
    my: "mya",
    ca: "cat",
    hr: "hrv",
    cs: "ces",
    da: "dan",
    nl: "nld",
    et: "est",
    fi: "fin",
    ka: "kat",
    el: "ell",
    gu: "guj",
    he: "heb",
    hu: "hun",
    is: "isl",
    ga: "gle",
    it: "ita",
    kn: "kan",
    kk: "kaz",
    km: "khm",
    ky: "kir",
    ku: "kur",
    lo: "lao",
    lv: "lav",
    lt: "lit",
    mk: "mkd",
    ms: "msa",
    ml: "mal",
    mt: "mlt",
    mi: "mri",
    mr: "mar",
    mn: "mon",
    ne: "nep",
    no: "nor",
    or: "ori",
    ps: "pus",
    fa: "fas",
    pl: "pol",
    pa: "pan",
    ro: "ron",
    sr: "srp",
    sd: "snd",
    sk: "slk",
    sl: "slv",
    so: "som",
    sw: "swa",
    sv: "swe",
    ta: "tam",
    tg: "tgk",
    te: "tel",
    th: "tha",
    tr: "tur",
    uk: "ukr",
    ur: "urd",
    uz: "uzb",
    cy: "cym",
    wo: "wol",
    xh: "xho",
    yo: "yor",
    zu: "zul",
    af: "afr",
    am: "amh",
    ha: "hau",
    ig: "ibo",
  },
  Qe = new Set([
    "afr",
    "amh",
    "ara",
    "hye",
    "asm",
    "ast",
    "aze",
    "bel",
    "ben",
    "bos",
    "bul",
    "mya",
    "yue",
    "cat",
    "ceb",
    "nya",
    "hrv",
    "ces",
    "dan",
    "nld",
    "eng",
    "est",
    "fil",
    "fin",
    "fra",
    "ful",
    "glg",
    "lug",
    "kat",
    "deu",
    "ell",
    "guj",
    "hau",
    "heb",
    "hin",
    "hun",
    "isl",
    "ibo",
    "ind",
    "gle",
    "ita",
    "jpn",
    "jav",
    "kea",
    "kan",
    "kaz",
    "khm",
    "kor",
    "kur",
    "kir",
    "lao",
    "lav",
    "lin",
    "lit",
    "luo",
    "ltz",
    "mkd",
    "msa",
    "mal",
    "mlt",
    "zho",
    "mri",
    "mar",
    "mon",
    "nep",
    "nso",
    "nor",
    "oci",
    "ori",
    "pus",
    "fas",
    "pol",
    "por",
    "pan",
    "ron",
    "rus",
    "srp",
    "sna",
    "snd",
    "slk",
    "slv",
    "som",
    "spa",
    "swa",
    "swe",
    "tam",
    "tgk",
    "tel",
    "tha",
    "tur",
    "ukr",
    "umb",
    "urd",
    "uzb",
    "vie",
    "cym",
    "wol",
    "xho",
    "yor",
    "zul",
  ]),
  Xe = new Set([
    "eng",
    "spa",
    "fra",
    "ita",
    "por",
    "nld",
    "deu",
    "tur",
    "rus",
    "ara",
    "hin",
    "jpn",
    "kor",
    "vie",
    "ukr",
    "pol",
    "swe",
    "ces",
    "nor",
    "dan",
    "bul",
    "fin",
    "hrv",
    "slk",
    "zho",
    "hun",
    "ron",
    "est",
  ]),
  Ze = new Set([
    "zho",
    "eng",
    "yue",
    "ara",
    "deu",
    "fra",
    "spa",
    "por",
    "ind",
    "ita",
    "kor",
    "rus",
    "tha",
    "vie",
    "jpn",
    "tur",
    "hin",
    "msa",
    "nld",
    "swe",
    "dan",
    "fin",
    "pol",
    "ces",
    "fil",
    "fas",
    "ell",
    "hun",
    "mkd",
    "ron",
  ]),
  et = Object.freeze({
    afr: "af",
    amh: "am",
    ara: "ar",
    hye: "hy",
    asm: "as",
    aze: "az",
    bel: "be",
    ben: "bn",
    bos: "bs",
    bul: "bg",
    mya: "my",
    yue: "yue",
    cat: "ca",
    hrv: "hr",
    ces: "cs",
    dan: "da",
    nld: "nl",
    eng: "en",
    est: "et",
    fil: "tl",
    fin: "fi",
    fra: "fr",
    glg: "gl",
    kat: "ka",
    deu: "de",
    ell: "el",
    guj: "gu",
    hau: "ha",
    heb: "he",
    hin: "hi",
    hun: "hu",
    isl: "is",
    ind: "id",
    ita: "it",
    jpn: "ja",
    jav: "jw",
    kan: "kn",
    kaz: "kk",
    khm: "km",
    kor: "ko",
    lao: "lo",
    lav: "lv",
    lin: "ln",
    lit: "lt",
    ltz: "lb",
    mkd: "mk",
    msa: "ms",
    mal: "ml",
    mlt: "mt",
    zho: "zh",
    mri: "mi",
    mar: "mr",
    mon: "mn",
    nep: "ne",
    nor: "no",
    oci: "oc",
    pus: "ps",
    fas: "fa",
    pol: "pl",
    por: "pt",
    pan: "pa",
    ron: "ro",
    rus: "ru",
    srp: "sr",
    sna: "sn",
    snd: "sd",
    slk: "sk",
    slv: "sl",
    som: "so",
    spa: "es",
    swa: "sw",
    swe: "sv",
    tam: "ta",
    tgk: "tg",
    tel: "te",
    tha: "th",
    tur: "tr",
    ukr: "uk",
    urd: "ur",
    uzb: "uz",
    vie: "vi",
    cym: "cy",
    yor: "yo",
  }),
  tt = new Set([
    "directory",
    "downloads",
    "inventory",
    "jobs",
    "p",
    "products",
    "settings",
    "subscriptions",
    "team",
    "turbo",
  ]);
let at = null,
  nt = null,
  rt = null;
const it = new Map(),
  st = new Map(),
  ot = new Map();
let ct = Promise.resolve();
const lt = new Map(),
  dt = new Map(),
  ut = new Map(),
  mt = new Map(),
  ft = new Map(),
  gt = new Map(),
  ht = new Map(),
  pt = new Map();
let bt = Promise.resolve();
const yt = new Map();
let wt = null,
  St = null,
  vt = Promise.resolve();
async function It() {
  chrome.action?.setPopup && (await chrome.action.setPopup({ popup: i }));
}
if (
  (It().catch((e) => {
    console.warn(
      "[service-worker] native action popup restore skipped:",
      e.message,
    );
  }),
  chrome.runtime.onInstalled?.addListener(() => {
    (It().catch((e) => {
      console.warn(
        "[service-worker] native action popup install restore skipped:",
        e.message,
      );
    }),
      At().catch((e) => {
        console.warn(
          "[service-worker] anonymous install bootstrap skipped:",
          e.message,
        );
      }));
  }),
  chrome.runtime.onStartup?.addListener(() => {
    (It().catch((e) => {
      console.warn(
        "[service-worker] native action popup startup restore skipped:",
        e.message,
      );
    }),
      At().catch((e) => {
        console.warn(
          "[service-worker] anonymous startup bootstrap skipped:",
          e.message,
        );
      }));
  }),
  chrome.runtime.onMessage.addListener(
    (e, t, a) => (
      Tt(e, t)
        .then(a)
        .catch((e) => {
          (console.error("[service-worker]", e),
            a({ ok: !1, error: e.message }));
        }),
      !0
    ),
  ),
  chrome.runtime.onMessageExternal.addListener(
    (e, t, a) => (
      Mt(e, t)
        .then(a)
        .catch((e) => {
          (console.error("[service-worker external]", e),
            a({ ok: !1, error: e.message }));
        }),
      !0
    ),
  ),
  chrome.tabs.onRemoved?.addListener((e) => {
    (mt.delete(Number(e)),
      bo(e, "tab-removed"),
      Ji(e).catch((e) => {
        console.warn(
          "[service-worker] tab removal cleanup skipped:",
          e.message,
        );
      }));
  }),
  chrome.tabs.onReplaced?.addListener((e, t) => {
    (mt.delete(Number(t)),
      bo(t, "tab-replaced"),
      Ji(t).catch((e) => {
        console.warn(
          "[service-worker] replaced tab cleanup skipped:",
          e.message,
        );
      }));
  }),
  chrome.tabs.onUpdated?.addListener((e, t, a) => {
    (t?.url && or(e, t.url),
      "complete" === t?.status &&
        po(e, a).catch((e) => {
          yo(e) ||
            console.warn(
              "[service-worker] managed tab navigation rehydrate skipped:",
              e.message,
            );
        }));
  }),
  chrome.webRequest?.onBeforeRequest?.addListener)
)
  try {
    chrome.webRequest.onBeforeRequest.addListener(
      (e) => {
        const t = Gn(e);
        t &&
          Wn(e, t).catch((e) => {
            Jn(e) ||
              console.warn(
                "[service-worker] Twitch original HLS request capture skipped:",
                e.message,
              );
          });
      },
      {
        urls: [
          "https://usher.ttvnw.net/*",
          "https://*.ttvnw.net/*",
          "https://*.hls.live-video.net/*",
        ],
        types: ["xmlhttprequest", "media", "other"],
      },
    );
  } catch (e) {
    console.warn(
      "[service-worker] Twitch original HLS listener unavailable:",
      e.message,
    );
  }
async function Tt(e, t) {
  if(String(e?.type||'').startsWith('TEXTAMISU_')) return handleTextamisuMessage(e,t);
  switch (e?.type) {
    case "WALLET_QA_PROFILE":
      return Et(e, t);
    case "START_LIVE_SUBTITLE":
      if (h) throw new Error("正在切換測試環境，請稍候。");
      return !0 === e.popupHandoff ? dn(e, t) : un(e, t);
    case "UPDATE_LIVE_SUBTITLE_CONFIG":
      return Tn(e, t);
    case "STOP_LIVE_SUBTITLE":
      return In(e, t);
    case "GET_LIVE_SUBTITLE_STATUS": {
      const a = await Vo(e, t, { validate: !0 }),
        n = await Uo({ validate: !0 }),
        r = (a && n.find((e) => e.sessionId === a.sessionId)) || null;
      return {
        ok: !0,
        active: Boolean(r),
        activeCount: n.length,
        editableConfig: Ko(r, t),
        tabId: r?.tabId ?? null,
        captureTabId: r?.captureTabId ?? r?.tabId ?? null,
        displayTabId: r?.displayTabId ?? r?.tabId ?? null,
        captionMode: r?.captionMode ?? r?.config?.captionMode ?? Ie,
        syncDelayMode: r?.config?.syncDelayMode || "fixed",
        syncEnabled: Boolean(r?.syncEnabled),
        singleTabMediaSync: Boolean(r?.singleTabMediaSync),
        mseAudioBufferEnabled: Boolean(r?.config?.mseAudioBufferEnabled),
        mirrorDelayEnabled: Boolean(r?.mirrorDelayEnabled),
        nativeStreamDelayEnabled: Boolean(r?.nativeStreamDelayEnabled),
        nativeStreamDelayKind: r?.config?.nativeStreamDelayKind || "",
        liveSharedEnabled: Boolean(r?.liveShared?.enabled),
        liveSharedRole: r?.liveShared?.role || "",
        liveSharedStreamId: r?.liveShared?.streamId || "",
        liveSharedParticipantCount: Math.max(
          0,
          Number(r?.liveShared?.participantCount || 0),
        ),
        sessionId: r?.sessionId ?? null,
        sttContext: r
          ? {
              status: String(r.config?.automaticSttContextStatus || "idle"),
              videoId: String(r.config?.automaticSttContextVideoId || ""),
              prompt: Ln(r.config).prompt,
              keywords: Ln(r.config).keywords,
              editablePrompt:
                !0 === r.config?.automaticSttContextEditableApplied
                  ? Mn(r.config?.sttPrompt, I).trim()
                  : "",
              editableKeywords:
                !0 === r.config?.automaticSttContextEditableApplied
                  ? kn(r.config?.sttKeywords)
                  : [],
              basePrompt: Mn(r.config?.automaticSttContextBasePrompt, I).trim(),
              baseKeywords: kn(r.config?.automaticSttContextBaseKeywords),
              editableApplied:
                !0 === r.config?.automaticSttContextEditableApplied,
              translationPrompt:
                Ln(r.config).translationPrompt ||
                Mn(r.config?.translationPrompt, k).trim(),
              reviewPrompt: Mn(
                r.config?.automaticSttContextReviewPrompt,
                1600,
              ).trim(),
              reviewKeywords: kn(
                r.config?.automaticSttContextReviewKeywords,
              ).slice(0, 100),
              reviewGeneratedAt: String(
                r.config?.automaticSttContextReviewGeneratedAt || "",
              ),
              translationPromptEstimatedTokens: Math.max(
                0,
                Math.round(
                  Number(
                    r.config?.automaticTranslationPromptEstimatedTokens || 0,
                  ),
                ),
              ),
              generatedAt: String(
                r.config?.automaticSttContextGeneratedAt || "",
              ),
              searchDirection: sc(r.config?.sttContextSearchDirection || ""),
              cacheHit: !0 === r.config?.automaticSttContextCacheHit,
              elapsedMs: Math.max(
                0,
                Math.round(Number(r.config?.automaticSttContextElapsedMs || 0)),
              ),
            }
          : null,
        lastStartFailure: await vn(),
      };
    }
    case "GET_LIVE_SUBTITLE_AUTH_SESSION":
      return Lt();
    case "GET_WALLET_CONTEXT_CONSENT": {
      if (
        t?.id !== chrome.runtime.id ||
        !String(t.url || "").startsWith(chrome.runtime.getURL(""))
      )
        return { ok: !1, allowed: !1 };
      const { auth: a } = await Lt();
      if (!a?.uid || a.uid !== e.uid) return { ok: !1, allowed: !1 };
      const n = `walletContextConsent:${a.uid}:${String(e.backendUrl || "").replace(/\/+$/, "")}`,
        r = await chrome.storage.local.get(n);
      return { ok: !0, allowed: 1 === r[n]?.version && !0 === r[n]?.accepted };
    }
    case "SIGN_OUT_LIVE_SUBTITLE_AUTH":
      if (h) throw new Error("正在切換測試環境，請稍候。");
      return Dt();
    case "OFFSCREEN_EVENT":
      return Bn(e.event, e.sessionId);
    case "AUTOMATIC_STT_CONTEXT_STATUS":
      return Rn(e);
    case "MIRROR_MEDIA_CHUNK":
      return "mirror-viewer" === e.target
        ? { ok: !0, ignored: !0 }
        : (await On(e), { ok: !0 });
    case "MIRROR_VIEWER_READY":
      return $n(e, t);
    case "MIRROR_VIEWER_CLOSED":
      return jn(e, t);
    case "GET_TWITCH_HLS_PLAYBACK":
      return fr(e, t);
    case "GET_NATIVE_STREAM_PLAYBACK":
      return gr(e, t);
    case "REFRESH_NATIVE_STREAM_CANDIDATES":
      return _r(e, t);
    case "FETCH_NATIVE_STREAM_RESOURCE":
      return Pr(e, t);
    case "FETCH_TWITCH_HLS_RESOURCE":
      return Pr({ ...e, nativeStreamKind: "twitch-hls" }, t);
    case "RESTART_MIRROR_CHUNK_FALLBACK":
      return si(e, t);
    case "OFFSCREEN_STOPPED":
      return (await ji(e.reason, e.sessionId, e.failureNotice), { ok: !0 });
    case "CONTENT_READY":
      return Mo(t.tab?.id, { source: "content-ready", requireMounted: !1 });
    case "LIVE_SUBTITLE_SEGMENT_DISPLAYED":
      return oi(e, t);
    case "LIVE_SUBTITLE_CLIENT_EVENT_LOG":
      return (await ci(e, t), { ok: !0 });
    case "MSE_AUDIO_SEGMENT":
      return di(e, t);
    case "VOD_AUDIO_PREFETCH_SOURCE":
      return ui(e, t);
    case "VOD_AUDIO_PREFETCH_HLS_FETCH":
      return fi(e, t);
    case "VOD_AUDIO_PREFETCH_HLS_CANCEL":
      return gi(e, t);
    case "LIVE_SUBTITLE_MSE_AUDIO_REPOST_REQUEST":
      return pi(e, t);
    case "LIVE_SUBTITLE_MSE_AUDIO_REFRESH_REQUEST":
      return hi(e, t);
    case "GET_SUBTITLE_BALANCE":
      return No(e, t);
    case "LIVE_SUBTITLE_PANEL_USAGE_DELTA":
      return bi(e, t);
    case "LIVE_SUBTITLE_MEDIA_TIMING":
      return (await wi(e, t), { ok: !0 });
    case "LIVE_SUBTITLE_SHARED_TIMELINE_ANCHOR":
      return Si(e, t);
    case "LIVE_SUBTITLE_DISPLAY_METRICS":
      return yi(e, t);
    case "LIVE_SUBTITLE_NATIVE_CANDIDATES":
      return Dr(e, t);
    case "LIVE_SUBTITLE_VIEWER_SEEK":
      return Ri(e, t);
    case "LIVE_SUBTITLE_TIMELINE_RESET":
      return Ni(e, t);
    case "LIVE_SUBTITLE_VIEWER_PLAYBACK":
      return Pi(e, t);
    case "LIVE_SUBTITLE_COMMIT_STARTUP_VIEWER_ANCHOR":
      return Di(e, t);
    case "LIVE_SUBTITLE_SOURCE_END_GUARD":
      return Ui(e);
    case "LIVE_SUBTITLE_SOURCE_RATE":
      return xi(e, t);
    case "LIVE_SUBTITLE_VIEWER_MEDIA_CHANGED":
      return Bi(e, t);
    case "LIVE_CHAT_SCAN_FRAMES": {
      const a = await As(e, t);
      return null === a
        ? { ok: !1, error: "mirror session is not active" }
        : Ls(a, e.syncPlayback ? String(e.sessionId || "") : "");
    }
    case "LIVE_CHAT_REPLY_PREPARE":
      return Ns(e, t);
    case "LIVE_CHAT_REPLY_SEND":
      return Ps(e, t);
    default:
      return { ok: !1, error: `Unknown message type: ${e?.type}` };
  }
}
async function Mt(e, t) {
return {ok:false,error:'請從擴充功能設定 Textamisu API token'};
}
function kt(e) {
  return /^wallet-qa-(general|economy|both|pass|expired|empty)$/.test(
    String(e || ""),
  );
}
async function Et(e, t) {
  throw new Error("此入口僅供開發版 QA 頁面使用。");
}
function Ct(e) {
  try {
    const t = chrome.runtime.sendMessage?.({
      type: "LIVE_SUBTITLE_AUTH_UPDATED",
      auth: {
        uid: e?.uid || "",
        email: e?.email || "",
        expiresAt: e?.expiresAt || 0,
        isAnonymous: qt(e),
      },
    });
    t?.catch?.(() => null);
  } catch {}
}
async function Lt(e = {}) {
const config=await TextamisuApi.getConfig(); return {ok:true,auth:config.token ? {provider:'textamisu',authenticated:true}:null};
}
async function At() {
await chrome.storage.session.setAccessLevel({accessLevel:'TRUSTED_CONTEXTS'}); return {ok:true};
}
async function Dt() {
await TextamisuApi.clearToken(); return {ok:true,auth:null};
}
function Rt(e) {
  const t = vt.then(e, e);
  return ((vt = t.catch(() => null)), t);
}
function _t(e = {}) {
  return Boolean(e?.idToken && !qt(e));
}
async function Nt() {
  const e = await chrome.storage.local.get(b);
  return e?.[b] || null;
}
async function Pt(e) {
  return Rt(async () => {
    const t = (await chrome.storage.local.get(y))[y];
    return (
      await chrome.storage.local.set({ [b]: { ...e, isAnonymous: !1 } }),
      t?.uid === e.uid && (await chrome.storage.local.remove(y)),
      Nt()
    );
  });
}
async function Ut(e, t = {}) {
  return Rt(async () => {
    const a = await Nt(),
      n = { [y]: e };
    ((!0 !== t.activate && _t(a)) || (n[b] = e),
      await chrome.storage.local.set(n));
    const r = await Nt();
    return _t(r) ? r : e;
  });
}
async function xt(e, t) {
  return Rt(async () => {
    const a = await Nt();
    if (a?.idToken && e?.idToken && a.idToken !== e.idToken) return a;
    const n = { [b]: t };
    return (qt(t) && (n[y] = t), await chrome.storage.local.set(n), t);
  });
}
async function Bt(e, t = {}) {
  return Rt(async () => {
    const a = await Nt();
    return a?.idToken && e?.idToken && a.idToken !== e.idToken
      ? a
      : (await chrome.storage.local.remove(t.removeAnonymous ? [b, y] : b),
        null);
  });
}
function Vt(e = {}) {
  const t = Kt(e);
  return {
    uid: e.uid || "",
    email: e.email || "",
    idToken: e.idToken || "",
    refreshToken: e.refreshToken || "",
    expiresAt: e.expiresAt || 0,
    isAnonymous: qt(e),
    providerId: e.providerId || (qt(e) ? "anonymous" : ""),
    role: t.role,
    developerUi: t.developerUi,
    anonymousTrialReady: !0 === e.anonymousTrialReady,
    anonymousTrialCredits: Math.max(
      0,
      Math.round(Number(e.anonymousTrialCredits || 0)),
    ),
    anonymousTrialWallet:
      "economy" === e.anonymousTrialWallet ? "economy" : "general",
    anonymousTrialReason: e.anonymousTrialReason || "",
  };
}
function Kt(e = {}) {
  if (qt(e)) return { role: "guest", developerUi: !1 };
  let t = {};
  try {
    t = Za(e.idToken || "");
  } catch {
    t = {};
  }
  const a = [e.role, e.userRole, t.role, t.roles, t.captionRoles],
    n = [
      ...new Set(
        a
          .flatMap((e) =>
            Array.isArray(e) ? e : String(e || "").split(/[,\s]+/),
          )
          .map((e) =>
            String(e || "")
              .toLowerCase()
              .trim(),
          )
          .filter(Boolean),
      ),
    ],
    r = { ...(t.features || {}), ...(e.features || {}) },
    i = Boolean(
      !0 === e.developerUi ||
        !0 === r.developerUi ||
        !0 === r.devUi ||
        !0 === r.advancedUi ||
        !0 === t.developer ||
        !0 === t.dev ||
        !0 === t.developerUi ||
        !0 === t.captionDeveloper ||
        !0 === t.captionDev ||
        n.some((e) => ["admin", "developer", "dev", "tester"].includes(e)),
    );
  return {
    role: i ? (n.includes("admin") ? "admin" : "developer") : "user",
    developerUi: i,
  };
}
function qt(e = {}) {
  if (!e || "object" != typeof e) return !1;
  if (!0 === e.isAnonymous || "anonymous" === e.providerId) return !0;
  try {
    const t = Za(e.idToken || "");
    return "anonymous" === t.firebase?.sign_in_provider;
  } catch {
    return !1;
  }
}
async function Ot(e = {}) {
  const t = await chrome.storage.local.get(y),
    a = t?.[y] || null;
  if (a?.idToken && a?.refreshToken) return Ut(a, e);
  wt ||
    (wt = $t().finally(() => {
      wt = null;
    }));
  const n = await wt;
  return !0 === e.activate && qt(n) ? Ut(n, { activate: !0 }) : n;
}
async function $t() {
  await Ft();
  const e = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${d}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnSecureToken: !0 }),
      },
    ),
    t = await e.json().catch(() => ({}));
  if (!(e.ok && t.idToken && t.refreshToken && t.localId)) {
    const a =
        t?.error?.message || `Firebase anonymous sign-in failed: ${e.status}`,
      n = new Error(an(a));
    throw ((n.firebaseCode = a), n);
  }
  return Ut({
    uid: t.localId,
    email: "",
    displayName: "",
    idToken: t.idToken,
    refreshToken: t.refreshToken,
    expiresAt: Date.now() + 1e3 * Number(t.expiresIn || 3600),
    emailVerified: !1,
    providerId: "anonymous",
    isAnonymous: !0,
    anonymousTrialReady: !1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}
async function Ft() {
  const e = await chrome.storage.local.get(w),
    t = e?.[w] || null;
  if (/^[A-Za-z0-9_-]{43,128}$/.test(String(t?.key || ""))) return t;
  const a = new Uint8Array(32);
  crypto.getRandomValues(a);
  const n = { version: 1, key: Ht(a), createdAt: new Date().toISOString() };
  return (await chrome.storage.local.set({ [w]: n }), n);
}
function Ht(e) {
  let t = "";
  for (const a of e) t += String.fromCharCode(a);
  return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
async function jt(e, t = {}) {
  return qt(e) && (!0 !== e.anonymousTrialReady || t.refreshPolicy)
    ? St ||
        ((St = (async () => {
          const t = await Ft(),
            a = await chrome.storage.local.get("liveSubtitleConfig"),
            n = Yt(Qt(a?.liveSubtitleConfig?.backendUrl || u));
          let r = null,
            i = null;
          for (const a of n)
            try {
              r = await ea(a, S, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${e.idToken}`,
                  "X-Live-Subtitle-Install-Key": t.key,
                },
                timeoutMs: v,
                label: "anonymous trial bootstrap",
              });
              break;
            } catch (e) {
              i = e;
            }
          if (!r?.ok) throw i || new Error("anonymous trial bootstrap failed");
          const s = {
              ...e,
              isAnonymous: !0,
              providerId: "anonymous",
              anonymousTrialReady: !0,
              anonymousTrialCredits: Math.max(
                0,
                Math.round(Number(r.trialCredits || 0)),
              ),
              anonymousTrialWallet:
                "economy" === r.trialWallet ||
                "economy" === r.account?.anonymousTrialWallet
                  ? "economy"
                  : "general",
              anonymousTrialReason: String(r.reason || ""),
              anonymousTrialBootstrappedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            o = await Ut(s);
          return (qt(o) && Ct(o), o);
        })().finally(() => {
          St = null;
        })),
        St)
    : e;
}
async function Wt(e) {
  if (!e?.idToken) throw zt("登入資料不完整，請重新登入。", "MISSING_ID_TOKEN");
  if (!Gt(e)) return e;
  if (!e.refreshToken)
    throw zt("缺少 refresh token，請重新登入。", "MISSING_REFRESH_TOKEN");
  const t = await fetch(
      `https://securetoken.googleapis.com/v1/token?key=${d}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: e.refreshToken,
        }),
      },
    ),
    a = await t.json().catch(() => ({}));
  if (!t.ok) {
    const e = a?.error?.message || `Firebase token refresh failed: ${t.status}`,
      n = nn(e),
      r = sn(e) ? zt(n, e) : new Error(n);
    throw ((r.firebaseCode = e), r);
  }
  return xt(e, {
    ...e,
    uid: a.user_id || e.uid || "",
    idToken: a.id_token,
    refreshToken: a.refresh_token || e.refreshToken,
    expiresAt: Date.now() + 1e3 * Number(a.expires_in || 3600),
    updatedAt: new Date().toISOString(),
  });
}
function Gt(e, t = 3e5) {
  const a = Number(e?.expiresAt || en(e?.idToken) || 0);
  return !e?.idToken || !a || a - Date.now() <= t;
}
function zt(e, t = "") {
  const a = new Error(e);
  return ((a.firebaseCode = t), (a.permanentAuthFailure = !0), a);
}
async function Jt(e, t = {}, a = 3e4, n = "fetch") {
  const r = new AbortController(),
    i = t.signal || null,
    s = () => r.abort();
  i && (i.aborted ? r.abort() : i.addEventListener("abort", s, { once: !0 }));
  const o = setTimeout(() => r.abort(), Math.max(1e3, a));
  try {
    const a = await fetch(e, { ...t, signal: r.signal }),
      i = await a.text();
    let s = {};
    try {
      s = i ? JSON.parse(i) : {};
    } catch {
      s = { raw: i };
    }
    if (!a.ok) {
      const e = s?.userMessage || s?.message || s?.error || "",
        t = new Error(`${n} failed: ${a.status}${e ? ` ${e}` : ""}`);
      throw ((t.status = a.status), (t.code = s?.code || ""), (t.data = s), t);
    }
    return s;
  } finally {
    (clearTimeout(o), i && i.removeEventListener("abort", s));
  }
}
function Yt(e) {
  const t = Qt(e) || u,
    a = new Set([
      "http://localhost:8080",
      "http://127.0.0.1:8080",
      "https://subtitle-translate-api-5evcqmw4jq-as.a.run.app",
      "https://subtitle-translate-api-702065401683.asia-southeast1.run.app",
    ]);
  return [...new Set(a.has(t) ? [t, u] : [t])];
}
function Qt(e = "") {
  return String(e || "")
    .trim()
    .replace(/\/+$/, "");
}
function Xt(e, t = "application/json") {
  const a = {};
  return (
    t && (a["Content-Type"] = t),
    e?.idToken && (a.Authorization = `Bearer ${e.idToken}`),
    a
  );
}
async function Zt() {
const result=await Lt(); if(!result.auth) throw new Error('請先在插件設定 Textamisu API token'); return result.auth;
}
async function ea(e, t, a = {}) {
throw Object.assign(new Error('此服務尚無 Textamisu API 對應功能'),{code:'textamisu_feature_unavailable'});
}
function ta(e = "") {
  const t = String(e || "");
  if (!t) return null;
  let a = yt.get(t);
  return (
    a ||
      ((a = {
        lastSyncAtMs: 0,
        syncInFlight: null,
        publishInFlight: null,
        publishQueue: [],
        deliveredCursors: new Set(),
        standardTimelineAnchor: null,
      }),
      yt.set(t, a)),
    a
  );
}
function aa(e = {}) {
  return Boolean(
    e?.liveShared?.enabled &&
      e.liveShared.streamId &&
      !0 === e.config?.liveSharedEnabled,
  );
}
function na(e = {}) {
  return aa(e) && "consumer" === e.liveShared.role;
}
function ra(e = null) {
  if (!e || "object" != typeof e) return null;
  const t = dl(e.sourceWallTimeMs ?? e.programDateTimeMs);
  if (null !== t) return t;
  const a = dl(e.wallTimeMs),
    n = dl(e.actualDelaySeconds);
  return null === a || null === n ? null : Math.round(a - 1e3 * Math.max(0, n));
}
function ia(e = {}, t = null) {
  if (!aa(e) || !t || "object" != typeof t) return null;
  const a = dl(t.currentTime),
    n = dl(t.wallTimeMs) || Date.now(),
    r = ra(t),
    i = ta(e.sessionId);
  if (
    ((i.latestSourceTiming = {
      mediaTimeSeconds: a,
      observedAtMs: n,
      actualDelaySeconds: dl(t.actualDelaySeconds),
      playbackRate: t.paused ? 0 : dl(t.playbackRate) || 1,
      paused: Boolean(t.paused),
    }),
    null === r)
  )
    return i.standardTimelineAnchor;
  const s = i?.standardTimelineAnchor;
  if ("program-date-time" === s?.confidence) return s;
  const o = {
    sourceWallTimeMs: r,
    observedAtMs: n,
    mediaTimeSeconds: a,
    confidence: "live-edge-estimate",
    updatedAtMs: Date.now(),
  };
  return ((i.standardTimelineAnchor = o), o);
}
function sa(e = null, t = null) {
  if (!e || "object" != typeof e) return {};
  const a = dl(e.currentTime),
    n = t ? (ia(t, e)?.sourceWallTimeMs ?? null) : ra(e);
  return {
    ...(null === a ? {} : { mediaTimeSeconds: a }),
    ...(null === n ? {} : { sourceWallTimeMs: n }),
  };
}
async function oa({
  sessionId: e,
  normalizedConfig: t,
  platform: a,
  sourceTab: n,
  pageInfo: r,
} = {}) {
return {enabled:false,reason:'textamisu-api'};
}
function ca(e = {}, t = {}) {
  const a = e.liveShared || {},
    n = {
      ...a,
      ...t,
      enabled: void 0 !== t.enabled ? Boolean(t.enabled) : Boolean(a.enabled),
    },
    r = n.enabled && "consumer" === n.role;
  return {
    ...e,
    liveShared: n,
    liveSharedConsumer: r,
    config: {
      ...(e.config || {}),
      liveSharedEnabled: n.enabled,
      liveSharedStreamId: n.streamId || "",
      liveSharedStreamKey: n.streamKey || "",
      liveSharedRole: n.role || "",
      liveSharedConsumer: r,
      liveSharedTimelineMode: n.timelineMode || "",
      liveSharedParticipantCount: Math.max(0, Number(n.participantCount || 0)),
    },
  };
}
function la(e = {}, t = "") {
  const a = e.event && "object" == typeof e.event ? e.event : {},
    n = Math.max(0, Number(e.cursor || 0));
  return {
    ...a,
    kind: "translation",
    isFinal: !0,
    sharedLiveReplay: !0,
    sharedLiveCursor: n,
    deliveryId: `live-share:${e.segmentUid || n}`,
    sessionId: t,
    context: { ...(a.context || {}), sessionId: t, sharedLiveReplay: !0 },
    sync: { ...(a.sync || {}), sessionId: t },
  };
}
async function da(e = {}, t = []) {
  if (!aa(e) || !Array.isArray(t) || !t.length)
    return {
      delivered: 0,
      cursor: Math.max(0, Number(e.liveShared?.cursor || 0)),
    };
  const a = ta(e.sessionId);
  let n = Math.max(0, Number(e.liveShared?.cursor || 0)),
    r = 0;
  for (const i of t) {
    const t = Math.max(0, Number(i?.cursor || 0));
    if (!t || t <= n || a.deliveredCursors.has(t)) continue;
    const s = await Bn(la(i, e.sessionId), e.sessionId);
    if (!s?.ok || !1 === s.accepted) break;
    for (a.deliveredCursors.add(t); a.deliveredCursors.size > 600; )
      a.deliveredCursors.delete(a.deliveredCursors.values().next().value);
    ((n = Math.max(n, t)), (r += 1));
  }
  if (n !== Number(e.liveShared?.cursor || 0)) {
    const t = await xo(e.sessionId);
    t &&
      ((e = ca(t, { cursor: n, lastSharedSegmentAtMs: Date.now() })),
      await Fo(e));
  }
  return { delivered: r, cursor: n };
}
function ua(e = {}) {
  const t = Array.isArray(e.segments)
    ? e.segments
        .slice(0, 30)
        .map((e) => ({
          original: e.original || "",
          translation: e.translation || "",
          order: e.order,
          id: e.id || "",
          segmentUid: e.segmentUid || "",
          mediaTime: e.mediaTime,
          displayAfterMediaTime: e.displayAfterMediaTime,
          audioStartMediaTime: e.audioStartMediaTime,
          audioEndMediaTime: e.audioEndMediaTime,
          mediaTimeEnd: e.mediaTimeEnd,
          sourceStartWallTimeMs: e.sourceStartWallTimeMs,
          sourceEndWallTimeMs: e.sourceEndWallTimeMs,
          segmentationMethod: e.segmentationMethod || "",
          splitReason: e.splitReason || "",
          timingSource: e.timingSource || "",
          queueSequence: e.queueSequence,
          translationStatus: e.translationStatus || "",
          qualityStatus: e.qualityStatus || "",
          isComplete: !1 !== e.isComplete,
        }))
    : [];
  return {
    kind: "translation",
    isFinal: !0 === e.isFinal,
    fallbackDisplayed: !0 === e.fallbackDisplayed,
    originalFallback: !0 === e.originalFallback,
    original: e.original || "",
    translation: e.translation || "",
    segments: t,
    segmentation: e.segmentation || null,
    mediaTime: e.mediaTime,
    displayAfterMediaTime: e.displayAfterMediaTime,
    sync: e.sync || null,
    deliveryId: e.deliveryId || "",
    requestId: e.requestId || e.context?.requestId || "",
  };
}
function ma(e = null, t = null) {
  const a = dl(t),
    n = e?.standardTimelineAnchor;
  return null !== a && n
    ? Math.round(n.sourceWallTimeMs + (a - n.observedAtMs))
    : null;
}
function fa(e = {}, t = {}) {
  if ("program-date-time" !== e.liveShared?.timelineMode) return t;
  const a = ta(e.sessionId),
    n = a?.standardTimelineAnchor;
  if (!n) return null;
  const r = { ...(t.sync || {}) };
  for (const e of [
    "audioStartWallTimeMs",
    "audioEndWallTimeMs",
    "sourceWallTimeMs",
  ]) {
    const t = ma(a, r[e]);
    null !== t && (r[e] = t);
  }
  const i = dl(r.mediaTime ?? t.mediaTime),
    s = dl(
      r.sourceWallTimeMs ?? r.audioEndWallTimeMs ?? r.audioStartWallTimeMs,
    ),
    o = Array.isArray(t.segments)
      ? t.segments.map((e) => {
          const t = { ...e },
            n = ma(a, e.sourceStartWallTimeMs),
            r = ma(a, e.sourceEndWallTimeMs),
            o = dl(
              e.displayAfterMediaTime ?? e.audioStartMediaTime ?? e.mediaTime,
            ),
            c = dl(e.audioEndMediaTime ?? e.mediaTimeEnd);
          return (
            null !== n
              ? (t.sourceStartWallTimeMs = n)
              : null !== i &&
                null !== s &&
                null !== o &&
                (t.sourceStartWallTimeMs = Math.round(s + 1e3 * (o - i))),
            null !== r
              ? (t.sourceEndWallTimeMs = r)
              : null !== i &&
                null !== s &&
                null !== c &&
                (t.sourceEndWallTimeMs = Math.round(s + 1e3 * (c - i))),
            t
          );
        })
      : [];
  return {
    ...t,
    segments: o,
    sync: {
      ...r,
      timingSource:
        "program-date-time" === n.confidence
          ? "shared-live-program-date-time"
          : "shared-live-live-edge-estimate",
    },
  };
}
async function ga(e = {}, t = {}) {
  if (
    !aa(e) ||
    "producer" !== e.liveShared.role ||
    "translation" !== t?.kind ||
    !0 !== t?.isFinal ||
    !0 === t?.sharedLiveReplay
  )
    return;
  const a = ta(e.sessionId),
    n = ua(t),
    r = String(
      n.deliveryId ||
        `${n.sync?.mediaTime || n.mediaTime || Date.now()}:${n.original}`,
    );
  a.publishQueue.some((e) => e.key === r) ||
    (a.publishQueue.push({ key: r, event: n, attempts: 0, nextAttemptAtMs: 0 }),
    a.publishQueue.length > 80 &&
      a.publishQueue.splice(0, a.publishQueue.length - 80),
    await ha(e.sessionId));
}
async function ha(e = "") {
  const t = ta(e);
  return !t || t.publishInFlight
    ? t?.publishInFlight || null
    : ((t.publishInFlight = (async () => {
        let a = await xo(e);
        for (
          ;
          aa(a) && "producer" === a.liveShared.role && t.publishQueue.length;

        ) {
          const n = t.publishQueue[0];
          if (n.nextAttemptAtMs > Date.now()) break;
          const r = await Zt();
          if (!r?.idToken) break;
          try {
            const e = fa(a, n.event);
            if (!e) break;
            const i = await ea(
              a.config.backendUrl,
              "/caption-live-share/segments",
              {
                method: "POST",
                headers: Xt(r),
                body: JSON.stringify({
                  streamId: a.liveShared.streamId,
                  sessionId: a.sessionId,
                  leaseToken: a.liveShared.leaseToken,
                  sourceLang: a.config.sourceLang || "auto",
                  targetLang: a.config.targetLang || "zh",
                  requestId: e.deliveryId || n.key,
                  events: [e],
                }),
                timeoutMs: Ve,
                label: "live subtitle share publish",
              },
            );
            (t.publishQueue.shift(),
              await li(a.sessionId, "subtitle.live_share.published", {
                streamId: a.liveShared.streamId,
                stored: i?.stored || 0,
                duplicate: i?.duplicate || 0,
                rejected: i?.rejected || 0,
              }).catch(() => {}));
          } catch (e) {
            ((n.attempts += 1),
              (n.nextAttemptAtMs =
                Date.now() + Math.min(5e3, 350 * 2 ** Math.min(n.attempts, 4))),
              n.attempts >= 8 &&
                (t.publishQueue.shift(),
                await li(
                  a.sessionId,
                  "subtitle.live_share.publish_failed",
                  {
                    streamId: a.liveShared.streamId,
                    attempts: n.attempts,
                    error: e.message,
                  },
                  "error",
                ).catch(() => {})));
            break;
          }
          a = await xo(e);
        }
      })().finally(() => {
        t.publishInFlight = null;
      })),
      t.publishInFlight);
}
async function pa(e = {}) {
  if (
    !aa(e) ||
    "producer" !== e.liveShared.role ||
    !0 === e.liveShared.producerCaptureStarted
  )
    return e;
  const t = e.captureTabId || e.sourceTabId || e.tabId;
  (await ko(t, {
    type: "LIVE_SUBTITLE_CONFIG_UPDATE",
    sessionId: e.sessionId,
    config: {
      ...(e.config || {}),
      liveSharedRole: "producer",
      liveSharedConsumer: !1,
    },
  }),
    await Xi(),
    await ss({
      tabId: t,
      sessionId: e.sessionId,
      config: {
        ...(e.config || {}),
        liveSharedRole: "producer",
        liveSharedConsumer: !1,
      },
    }));
  const a = ca((await xo(e.sessionId)) || e, {
    producerCaptureStarted: !0,
    promotedAtMs: Date.now(),
  });
  return (
    await Fo(a),
    await Bn(
      {
        kind: "status",
        status: "live-share-producer",
        message: "已接手產生本場共享字幕",
        sessionId: a.sessionId,
      },
      a.sessionId,
    ).catch(() => {}),
    a
  );
}
async function ba(e = {}) {
  if (!aa(e) || !0 !== e.liveShared.producerCaptureStarted) return e;
  await xn(e.sessionId, { notify: !1, reason: "live-share-demoted" });
  const t = ca((await xo(e.sessionId)) || e, {
    producerCaptureStarted: !1,
    demotedAtMs: Date.now(),
  });
  await Fo(t);
  const a = t.captureTabId || t.sourceTabId || t.tabId;
  return (
    await ko(a, {
      type: "LIVE_SUBTITLE_CONFIG_UPDATE",
      sessionId: t.sessionId,
      config: t.config,
    }),
    t
  );
}
async function ya(e = {}, t = null, a = {}) {
  if (!aa(e)) return null;
  const n = ta(e.sessionId),
    r = Date.now();
  return !a.force && r - n.lastSyncAtMs < Be
    ? ("producer" === e.liveShared.role && (await ha(e.sessionId)), null)
    : (n.syncInFlight ||
        ((n.lastSyncAtMs = r),
        (n.syncInFlight = (async () => {
          const a = await xo(e.sessionId);
          if (!aa(a)) return null;
          const n = await Zt();
          if (!n?.idToken) return null;
          const r = Date.now(),
            i = await ea(a.config.backendUrl, "/caption-live-share/sync", {
              method: "POST",
              headers: Xt(n),
              body: JSON.stringify({
                streamId: a.liveShared.streamId,
                sessionId: a.sessionId,
                leaseToken: a.liveShared.leaseToken || "",
                previousRole: a.liveShared.role || "",
                cursor: Math.max(0, Number(a.liveShared.cursor || 0)),
                clientTimeMs: r,
                ...sa(t, a),
              }),
              timeoutMs: Ve,
              label: "live subtitle share sync",
            }),
            s = Date.now(),
            o = r + (s - r) / 2,
            c = a.liveShared.role || "consumer";
          let l = ca(a, {
            role: i.role || c,
            leaseToken:
              i.leaseToken ||
              ("producer" === i.role && a.liveShared.leaseToken) ||
              "",
            participantCount: Math.max(0, Number(i.participantCount || 0)),
            serverTimeOffsetMs: Number(i.serverTimeMs || o) - o,
            leaseExpiresAtMs: Number(i.leaseExpiresAtMs || 0),
            lastSyncAtMs: s,
          });
          (await Fo(l),
            c !== l.liveShared.role &&
              (await li(
                l.sessionId,
                "subtitle.live_share.role_changed",
                {
                  streamId: l.liveShared.streamId,
                  previousRole: c,
                  role: l.liveShared.role,
                  participantCount: l.liveShared.participantCount,
                },
                "warn",
              ).catch(() => {}),
              (l =
                "producer" === l.liveShared.role ? await pa(l) : await ba(l))));
          const d = await da(l, i.segments || []);
          return (
            (l = (await xo(l.sessionId)) || l),
            !i.segments?.length &&
              Number(i.latestCursor || 0) > 0 &&
              Number(l.liveShared.cursor || 0) <= 0 &&
              ((l = ca(l, { cursor: Number(i.latestCursor || 0) })),
              await Fo(l)),
            "producer" === l.liveShared.role && (await ha(l.sessionId)),
            { response: i, delivery: d }
          );
        })()
          .catch(
            async (t) => (
              await li(
                e.sessionId,
                "subtitle.live_share.sync_failed",
                { streamId: e.liveShared?.streamId || "", error: t.message },
                "warn",
              ).catch(() => {}),
              null
            ),
          )
          .finally(() => {
            n.syncInFlight = null;
          }))),
      n.syncInFlight);
}
async function wa(e = {}, t = "stop") {
  if (!aa(e)) return;
  const a = await Zt();
  (a?.idToken &&
    (await ea(e.config.backendUrl, "/caption-live-share/leave", {
      method: "POST",
      headers: Xt(a),
      body: JSON.stringify({
        streamId: e.liveShared.streamId,
        sessionId: e.sessionId,
        reason: t,
      }),
      timeoutMs: Ve,
      label: "live subtitle share leave",
    }).catch((e) => {
      console.warn(
        "[service-worker] live subtitle share leave skipped:",
        e.message,
      );
    })),
    yt.delete(String(e.sessionId || "")));
}
class Sa {
  constructor({
    owner: e,
    saved: t,
    request: a,
    persist: n,
    deliver: r,
    authority: i,
    billing: s,
    now: o = Date.now,
    id: c = () => crypto.randomUUID(),
  }) {
    ((this.owner = { ...e }),
      (this.request = a),
      (this.persist = n),
      (this.deliver = r),
      (this.authority = i),
      (this.billing = s),
      (this.now = o),
      (this.id = c),
      (this.flight = null),
      (this.lastTick = null),
      (this.lastAttempt = 0));
    const l = 1 === t?.version && JSON.stringify(t.owner) === JSON.stringify(e);
    ((this.state = l
      ? structuredClone(t)
      : {
          version: 1,
          owner: this.owner,
          grants: [],
          pendingRead: null,
          closed: !1,
        }),
      (this.positionMs = null),
      (this.playing = !1),
      (this.missUntilMs = 0),
      (this.lastResult = null));
  }
  save() {
    return this.persist(structuredClone(this.state));
  }
  ranges() {
    return this.state.grants
      .filter((e) => !e.closed)
      .flatMap((e) => e.coverageRanges);
  }
  notify() {
    return (
      (this.state.authorityRevision = Math.max(
        1e3 * this.now(),
        (this.state.authorityRevision || 0) + 1,
      )),
      this.authority({
        requestIds: this.state.grants
          .filter((e) => !e.closed)
          .map((e) => e.requestId),
        coverageRanges: this.ranges(),
        revision: this.state.authorityRevision,
      })
    );
  }
  async start(e) {
    if (this.state.closed) throw new Error("wallet_cache_watch_closed");
    this.positionMs = Math.max(0, Math.round(e));
    const t = this.state.grants.find(
      (e) =>
        !e.closed &&
        e.scope.startMs <= this.positionMs &&
        e.scope.endMs > this.positionMs,
    );
    if (t?.intent && !this.flight) {
      ((this.state.pendingRead = t.intent),
        (this.state.pendingEpoch = this.state.epoch || 0),
        (this.flight = this.readWindow(t.intent.startMs).finally(() => {
          this.flight = null;
        })));
      try {
        return (await this.flight, this.lastResult);
      } catch (e) {
        if (
          ![
            "wallet_cache_snapshot_unavailable",
            "wallet_cache_read_closed",
          ].includes(e.data?.error)
        )
          throw e;
        ((this.state.pendingRead = null),
          (t.closed = !0),
          await this.report(t, !0));
      }
    } else if (!t && this.state.grants.some((e) => !e.closed)) {
      this.state.epoch = (this.state.epoch || 0) + 1;
      for (const e of this.state.grants) e.closed = !0;
      await this.notify();
    }
    return (await this.pump(!0), this.lastResult);
  }
  observe(e) {
    if (this.state.closed) return;
    const t = dl(e?.currentTime),
      a = dl(e?.wallTimeMs ?? this.now()),
      n = dl(e?.playbackRate ?? 1);
    if (
      null === t ||
      t < 0 ||
      null === a ||
      (this.lastTick && a <= this.lastTick.wall)
    )
      return;
    const r = Math.round(1e3 * t),
      i = this.lastTick;
    ((this.positionMs = r),
      (this.playing = !0 !== e.paused && !0 !== e.seeking && n > 0));
    const s = i ? a - i.wall : 0,
      o = i ? r - i.position : 0;
    let c = !1;
    if (
      i?.playing &&
      this.playing &&
      s > 0 &&
      s <= 15e3 &&
      o > 0 &&
      o <= Math.min(15e3, Math.max(1e3, s * n + 1200))
    ) {
      const e = r - Math.min(o, s * n + 500);
      for (const t of this.state.grants)
        t.closed ||
          (t.watchedMs = Math.min(
            t.watchBudgetMs,
            t.watchedMs +
              Ei(
                { coverageReliable: !0, coverageRanges: t.coverageRanges },
                e,
                r,
              ),
          ));
    } else if (
      i &&
      (!0 === e.seeking ||
        o < -250 ||
        o > Math.max(15e3, s * Math.max(1, n || 1) + 1200))
    ) {
      this.state.epoch = (this.state.epoch || 0) + 1;
      for (const e of this.state.grants) e.closed = !0;
      ((this.missUntilMs = 0), (c = !0));
    }
    for (const e of this.state.grants)
      !e.closed &&
        (r >= e.scope.endMs || e.watchedMs >= e.watchBudgetMs) &&
        ((e.closed = !0), (c = !0));
    ((this.lastTick = { position: r, wall: a, playing: this.playing }),
      c && this.notify().catch(() => {}),
      this.pump().catch((e) => {
        this.lastError = e;
      }));
  }
  async report(e, t) {
    const a = e.watchedMs;
    await this.save();
    const n = await this.request("cache/usage", {
      requestId: e.requestId,
      totalReadMs: a,
      final: t,
    });
    if (
      n.receipt?.requestId !== e.requestId ||
      n.receipt.reportedReadMs < a ||
      (t && !["settled", "cancelled"].includes(n.receipt.status))
    )
      throw new Error("wallet_cache_receipt_invalid");
    ((e.reportedMs = Math.max(e.reportedMs || 0, a)),
      (e.reportedAtMs = this.now()),
      t && (this.state.grants = this.state.grants.filter((t) => t !== e)),
      await this.save(),
      await this.billing(n.billing));
  }
  async readWindow(e) {
    const t = Math.min(
      2147483647,
      ...this.state.grants
        .filter((t) => !t.closed && t.scope.startMs > e)
        .map((e) => e.scope.startMs),
    );
    this.state.pendingRead || (this.state.pendingEpoch = this.state.epoch || 0);
    const a = this.state.pendingEpoch || 0,
      n = this.state.pendingRead || {
        requestId: `cache:${this.id()}`,
        url: this.owner.url,
        sourceLanguage: this.owner.sourceLanguage,
        targetLanguage: this.owner.targetLanguage,
        startMs: e,
        endMs: Math.min(t, e + 6e4),
      };
    if (((this.state.pendingRead = n), await this.save(), this.state.closed))
      return;
    const r = await this.request("cache/read", n);
    if ("sql-wallet-v1" !== r.billingProtocol)
      throw new Error("wallet_cache_protocol_invalid");
    if (r.cacheHit) {
      const e = r.readGrant,
        t = r.scope;
      if (
        e?.requestId !== n.requestId ||
        t?.videoKey !== this.owner.videoKey ||
        t.startMs !== n.startMs ||
        !Number.isSafeInteger(t.endMs) ||
        t.endMs > n.endMs ||
        t.endMs <= t.startMs ||
        !Number.isSafeInteger(e.watchBudgetMs) ||
        e.watchBudgetMs < 1 ||
        e.watchBudgetMs > t.endMs - t.startMs ||
        !Array.isArray(r.coverageRanges) ||
        !Array.isArray(r.segments)
      )
        throw new Error("wallet_cache_grant_invalid");
      const i = {
        requestId: e.requestId,
        intent: n,
        scope: t,
        coverageRanges: r.coverageRanges,
        watchBudgetMs: e.watchBudgetMs,
        watchedMs: 0,
        reportedMs: 0,
        reportedAtMs: this.now(),
        closed: this.state.closed || a !== (this.state.epoch || 0),
      };
      (this.state.grants.some((t) => t.requestId === e.requestId) ||
        this.state.grants.push(i),
        (this.state.pendingRead = null),
        await this.save(),
        i.closed ||
          (await this.notify(),
          this.state.closed || (await this.deliver(r), (this.lastResult = r))),
        await this.billing(r.billing));
    } else
      ((this.state.pendingRead = null),
        (this.missUntilMs = n.endMs),
        (this.lastResult = null),
        await this.save());
  }
  pump(e = !1) {
    return (
      this.flight ||
        (this.flight = (async () => {
          if (!e && this.now() - this.lastAttempt < 2e3) return;
          this.lastAttempt = this.now();
          for (const e of [...this.state.grants])
            e.closed || this.state.closed
              ? await this.report(e, !0)
              : e.watchedMs > e.reportedMs &&
                this.now() - e.reportedAtMs >= 1e4 &&
                (await this.report(e, !1));
          if (this.state.closed) return;
          const t = this.state.grants.filter((e) => !e.closed);
          if (
            t.length >= 2 ||
            null === this.positionMs ||
            (!e && !this.playing)
          )
            return;
          const a = t.length
            ? Math.max(...t.map((e) => e.scope.endMs))
            : this.positionMs;
          (this.state.pendingRead ||
            e ||
            !(
              a - this.positionMs > 3e4 ||
              this.positionMs < this.missUntilMs - 1e4
            )) &&
            (await this.readWindow(a));
        })().finally(() => {
          this.flight = null;
        })),
      this.flight
    );
  }
  async close() {
    ((this.state.closed = !0),
      (this.lastResult = null),
      (this.state.epoch = (this.state.epoch || 0) + 1));
    for (const e of this.state.grants) e.closed = !0;
    if (
      (await this.notify(),
      await this.save(),
      this.flight && (await this.flight.catch(() => {})),
      await this.pump(!0),
      this.state.pendingRead)
    ) {
      const e = this.state.pendingRead.requestId;
      await this.save();
      const t = await this.request("cache/usage", {
        requestId: e,
        totalReadMs: 0,
        final: !0,
      }).catch((t) => {
        if (
          403 === t.status &&
          "wallet_cache_read_not_authorized" === t.data?.error
        )
          return { receipt: { requestId: e, status: "cancelled" } };
        throw t;
      });
      if (
        t.receipt?.requestId !== e ||
        !["settled", "cancelled"].includes(t.receipt.status)
      )
        throw new Error("wallet_cache_receipt_invalid");
      ((this.state.pendingRead = null),
        await this.save(),
        await this.billing(t.billing));
    }
  }
}
async function va(e) {
  const t = bt
    .catch(() => {})
    .then(async () => {
      const t = "walletCacheWatchJournal",
        a = (await chrome.storage.local.get(t))[t] || {},
        n = `${e.owner.uid}:${e.owner.sessionId}`;
      (!e.closed || e.pendingRead || e.grants.length ? (a[n] = e) : delete a[n],
        await chrome.storage.local.set({ [t]: a }));
    });
  return ((bt = t), t);
}
function Ia(e) {
  return async (t, a) => {
    const n = await Zt();
    if (n?.uid !== e.uid || !n.idToken)
      throw new Error("wallet_cache_account_changed");
    return ea(
      e.backendUrl,
      `/caption-wallet-sessions/${encodeURIComponent(e.sessionId)}/${t}`,
      {
        method: "POST",
        headers: Xt(n),
        body: JSON.stringify(a),
        timeoutMs: Re,
        label: "wallet subtitle cache",
      },
    );
  };
}
async function Ta(e, t) {
  const a = e.sessionId,
    n = (pt.get(a) || Promise.resolve()).catch(() => {}).then(() => Ma(e, t));
  pt.set(a, n);
  try {
    return await n;
  } finally {
    pt.get(a) === n && pt.delete(a);
  }
}
async function Ma(e, t) {
  const a = Ra(e);
  if (!t?.uid || !e.sessionId || !/^youtube:[A-Za-z0-9_-]{11}$/.test(a))
    throw new Error("wallet_cache_identity_missing");
  const n = {
      uid: t.uid,
      sessionId: e.sessionId,
      backendUrl: Qt(e.backendUrl),
      videoKey: a,
      url: `https://www.youtube.com/watch?v=${a.slice(8)}`,
      sourceLanguage: e.sourceLang || "auto",
      targetLanguage: e.targetLang || "zh",
    },
    r = ht.get(n.sessionId);
  if (r && JSON.stringify(r.owner) === JSON.stringify(n) && !r.state.closed)
    return r;
  r && (await r.close());
  const i = await chrome.storage.local.get("walletCacheWatchJournal");
  let s = i.walletCacheWatchJournal?.[`${n.uid}:${n.sessionId}`];
  if (s && JSON.stringify(s.owner) !== JSON.stringify(n)) {
    if (s.owner.uid !== t.uid || s.owner.backendUrl !== n.backendUrl)
      throw new Error("wallet_cache_account_changed");
    const e = new Sa({
      owner: s.owner,
      saved: s,
      persist: va,
      request: Ia(s.owner),
      authority: async () => {},
      deliver: async () => {},
      billing: async () => {},
    });
    (await e.close(), (s = null));
  }
  const o = () =>
      nt.find(
        (e) =>
          e.sessionId === n.sessionId &&
          e.config?.walletBillingUid === n.uid &&
          Qt(e.config?.backendUrl) === n.backendUrl &&
          Ra(e.config) === n.videoKey &&
          (e.config.sourceLang || "auto") === n.sourceLanguage &&
          (e.config.targetLang || "zh") === n.targetLanguage,
      ),
    c = new Sa({
      owner: n,
      saved: s,
      persist: va,
      request: Ia(n),
      authority: async ({ requestIds: t, coverageRanges: a, revision: r }) => {
        const i = {
          walletCacheManaged: !0,
          walletCacheRequestIds: t,
          walletCacheAuthorityRevision: r,
          hybridSubtitleCacheMode: !0,
          cachedSubtitleCoverageReliable: !0,
          cachedSubtitleCoverageSource: "sql-wallet-grant",
          cachedSubtitleCoverageRanges: a,
        };
        Object.assign(e, i);
        const s = o();
        if (!s) return;
        ((s.config = { ...s.config, ...i }),
          (s.hybridSubtitleCacheMode = !0),
          Ho(s));
        const c = {
          type: "WALLET_CACHE_AUTHORITY",
          sessionId: n.sessionId,
          videoKey: n.videoKey,
          requestIds: t,
          coverageRanges: a,
          revision: r,
        };
        (await ko(s.displayTabId || s.tabId, c),
          o() &&
            (await ds()) &&
            (await chrome.runtime
              .sendMessage({ ...c, target: "offscreen" })
              .catch(() => {})));
      },
      deliver: async (e) => {
        const t = o();
        t &&
          (await ko(t.displayTabId || t.tabId, {
            type: "LIVE_SUBTITLE_EVENT",
            sessionId: n.sessionId,
            event: qa(e, t.config),
          }));
      },
      billing: async (e) => {
        const t = o();
        !t ||
          e?.sessionId !== n.sessionId ||
          "sql-wallet-v1" !== e.billingProtocol ||
          Number(e.revision) <
            Number(t.lastCachedSubtitleBilling?.revision || 0) ||
          ((t.lastCachedSubtitleBilling = e),
          Ho(t),
          await ko(t.displayTabId || t.tabId, {
            type: "LIVE_SUBTITLE_EVENT",
            sessionId: n.sessionId,
            event: { kind: "usage", usage: e },
          }));
      },
    });
  return (ht.set(n.sessionId, c), c);
}
async function ka(e, t) {
  await Ea(t, e);
  const a = await ea(e.backendUrl, "/caption-sessions/start", {
    method: "POST",
    headers: Xt(t),
    body: JSON.stringify({
      sessionId: e.sessionId,
      provider: e.sttProvider,
      translationProvider: e.provider,
      saveEnabled: !1,
      context: {
        mode: e.captionMode || "instant-overlay",
        sourceLang: e.sourceLang || "auto",
        targetLang: e.targetLang || "zh",
        live: e.sourceIsLiveStream ?? null,
      },
    }),
    timeoutMs: Re,
    label: "wallet subtitle session start",
  });
  if ("sql-wallet-v1" !== a.billingProtocol || a.sessionId !== e.sessionId)
    throw new Error("wallet_cache_protocol_invalid");
  Object.assign(e, {
    walletBillingProtocol: a.billingProtocol,
    walletBillingUid: t.uid,
    fundingWallet: a.wallet,
    walletCacheManaged: !0,
    hybridSubtitleCacheMode: !0,
    walletSttPolicy: a.sttPolicy,
    walletAllowAlternateLlm: !0 === a.allowAlternateLlm,
    walletSessionStart: {
      uid: t.uid,
      sessionId: e.sessionId,
      backendUrl: Qt(e.backendUrl),
      sttProvider: e.sttProvider,
      provider: e.provider,
      startedAtMs: Date.now(),
      response: a,
    },
  });
  const n = await Ta(e, t);
  return (
    (await n.start(
      Math.round(
        1e3 *
          Math.max(
            0,
            Number(e.initialPlaybackMediaTime ?? e.currentMediaTime) || 0,
          ),
      ),
    )) || {
      ok: !0,
      billingProtocol: "sql-wallet-v1",
      cacheHit: !1,
      reason: "not-found",
    }
  );
}
async function Ea(e, t) {
  const a = await chrome.storage.local.get("walletCacheWatchJournal");
  for (const n of Object.values(a.walletCacheWatchJournal || {})) {
    if (
      1 !== n?.version ||
      n.owner?.uid !== e.uid ||
      n.owner.backendUrl !== Qt(t.backendUrl) ||
      n.owner.sessionId === t.sessionId ||
      nt.some((e) => e.sessionId === n.owner.sessionId)
    )
      continue;
    const a =
      ht.get(n.owner.sessionId) ||
      new Sa({
        owner: n.owner,
        saved: n,
        persist: va,
        request: Ia(n.owner),
        authority: async () => {},
        deliver: async () => {},
        billing: async () => {},
      });
    (await a.close(),
      await Ia(n.owner)("end", {}),
      ht.delete(n.owner.sessionId));
  }
}
async function Ca(e = {}, t = null, a = {}) {
  if ("sql-wallet-v1" === e.walletBillingProtocol) {
    if (Na(e) || !0 === e.sourceIsLiveStream) return { ok: !0, cacheHit: !1 };
    const n = await Ta(e, t);
    return (
      (await n.start(
        Math.round(
          1e3 *
            Math.max(
              0,
              Number(a.mediaTimeSeconds ?? e.initialPlaybackMediaTime) || 0,
            ),
        ),
      )) || { ok: !0, cacheHit: !1 }
    );
  }
  const n = _a(e);
  if (!n) return { ok: !0, cacheHit: !1, reason: "missing-page-url" };
  const r = new URLSearchParams({
    url: n,
    sourceLang: e.sourceLang || "auto",
    targetLang: e.targetLang || "zh",
    markRead: !0 === a.markRead ? "true" : "false",
  });
  a.limit && r.set("limit", String(a.limit));
  const i = dl(
    a.mediaTimeSeconds ?? e.initialPlaybackMediaTime ?? e.currentMediaTime,
  );
  return (
    null !== i && r.set("mediaTimeSeconds", String(i)),
    e.sttProvider && r.set("sttProvider", String(e.sttProvider)),
    e.sttAudioSpeed && r.set("sttAudioSpeed", String(e.sttAudioSpeed)),
    e.provider && r.set("llmProvider", String(e.provider)),
    r.set("sttPromptApplied", dc(e.sttPrompt) ? "true" : "false"),
    r.set("sttKeywordCount", String(uc(e.sttKeywords).length)),
    e.sttContextSearchDirection &&
      r.set("sttContextSearchDirection", sc(e.sttContextSearchDirection)),
    ea(e.backendUrl, `/caption-video-subtitles?${r.toString()}`, {
      headers: Xt(t, ""),
      timeoutMs: a.timeoutMs || De,
      label: "subtitle cache read",
    })
  );
}
function La(e = {}) {
  return Boolean(
    e?.ok && e.cacheHit && Array.isArray(e.segments) && e.segments.length > 0,
  );
}
function Aa(e = {}) {
  return String(e.track?.videoKey || e.video?.videoKey || "").trim();
}
function Da(e = {}, t = {}) {
  if (!La(e)) return !1;
  const a = Ra(t),
    n = Aa(e);
  return !a || (!!n && a === n);
}
function Ra(e = {}) {
  return (
    String(
      e.viewerMediaContextKey ||
        e.sourceMediaContextKey ||
        e.cacheVideoKey ||
        "",
    ).trim() ||
    El(_a(e)) ||
    ""
  );
}
function _a(e = {}) {
  const t = String(e.canonicalPageUrl || "").trim();
  if (Tl(t)) return t;
  const a = String(e.viewerMediaContextKey || e.sourceMediaContextKey || "")
    .trim()
    .match(/^youtube:([A-Za-z0-9_-]{6,})$/i);
  return a?.[1] ? no(a[1]) : String(e.pageUrl || "").trim();
}
function Na(e = {}) {
return true;
}
function Pa(e = {}) {
  const t = (Array.isArray(e.segments) ? e.segments : [])
      .map((e) => {
        const t = dl(
            e.startMs ?? e.start_ms ?? e.mediaTimeMs ?? e.media_time_ms,
          ),
          a = dl(
            e.endMs ?? e.end_ms ?? e.mediaTimeEndMs ?? e.media_time_end_ms,
          ),
          n = dl(
            e.mediaTime ??
              e.displayAfterMediaTime ??
              e.audioStartMediaTime ??
              e.sourceMediaStartTime,
          ),
          r = dl(e.mediaTimeEnd ?? e.audioEndMediaTime ?? e.sourceMediaEndTime),
          i = t ?? (null === n ? null : 1e3 * n),
          s = a ?? (null === r ? null : 1e3 * r);
        return null === i || null === s || s <= i
          ? null
          : {
              startMs: Math.max(0, Math.round(i)),
              endMs: Math.max(0, Math.round(s)),
              segments: 1,
              source: "subtitle-segments",
              reason: "exact-delivered-segment",
            };
      })
      .filter(Boolean)
      .sort((e, t) => e.startMs - t.startMs || e.endMs - t.endMs),
    a = [];
  for (const e of t) {
    const t = a[a.length - 1];
    !t || e.startMs > t.endMs
      ? a.push({ ...e })
      : ((t.endMs = Math.max(t.endMs, e.endMs)), (t.segments += 1));
  }
  return a;
}
function Ua(e = {}) {
  const t = Array.isArray(e.coverageRanges) ? e.coverageRanges : [];
  if (!0 === e.coverageReliable && t.length)
    return {
      ranges: t,
      reliable: !0,
      source: e.coverageSource || e.track?.coverageSource || "processed-audio",
    };
  const a = Pa(e);
  return a.length
    ? { ranges: a, reliable: !0, source: "subtitle-segments" }
    : {
        ranges: t,
        reliable: !1,
        source: e.coverageSource || e.track?.coverageSource || "",
      };
}
function xa(e = {}, t = {}) {
  const a = Ua(t);
  return {
    ...e,
    captionMode: Me,
    syncEnabled: !1,
    youtubeSyncEnabled: !1,
    videoSyncEnabled: !1,
    singleTabMediaSync: !0,
    youtubeVodSingleTabSync: !0,
    mirrorDelayEnabled: !1,
    nativeStreamDelayEnabled: !1,
    nativeStreamDelayKind: "",
    sourcePreloadEnabled: !1,
    sourcePreloadPlaybackRate: 1,
    sourcePreloadMaxLeadSeconds: 0,
    adaptiveSyncDelayEnabled: !1,
    syncDelayMode: "fixed",
    syncDelaySeconds: 0,
    baseSyncDelaySeconds: 0,
    batchWaitSeconds: 0,
    effectiveSyncDelaySeconds: 0,
    syncSubtitleOffsetSeconds: 0,
    lowLatencyStt: !1,
    cacheReplayMode: !0,
    cacheReplaySource: "sql-subtitle-cache",
    cacheTrackId: t.track?.trackId || "",
    cacheVideoKey: t.track?.videoKey || t.video?.videoKey || "",
    cacheReadCreditsPerHour: t.readCreditsPerHour || xe,
    cachedSubtitleCoverageRanges: a.ranges,
    cachedSubtitleCoverageReliable: a.reliable,
    cachedSubtitleCoverageSource: a.source,
    saveEnabled: !1,
    syncRole: "youtube-sql-cache",
    videoPlatform: "youtube",
  };
}
function Ba(e = {}) {
  return {
    ...e,
    cacheReplayMode: !1,
    cacheReplaySource: "",
    hybridSubtitleCacheMode: !1,
    cacheTrackId: "",
    cacheVideoKey: "",
    cachedSubtitleCoverageRanges: [],
    cachedSubtitleCoverageReliable: !1,
    cachedSubtitleCoverageSource: "",
    cachedSubtitlePartial: !1,
  };
}
function Va(e = {}, t = {}) {
  const a = Ua(t);
  return {
    ...e,
    cacheReplayMode: !0,
    cacheReplaySource: "sql-subtitle-cache",
    hybridSubtitleCacheMode: !0,
    cacheTrackId: t.track?.trackId || "",
    cacheVideoKey: t.track?.videoKey || t.video?.videoKey || "",
    cacheReadCreditsPerHour: t.readCreditsPerHour || xe,
    cachedSubtitleCoverageRanges: a.ranges,
    cachedSubtitleCoverageReliable: a.reliable,
    cachedSubtitleCoverageSource: a.source,
    cachedSubtitlePartial: Boolean(t.partial || !0 !== t.coverageReliable),
  };
}
function Ka(e = {}) {
  const t = Ua(e);
  return {
    trackId: e.track?.trackId || "",
    videoKey: e.track?.videoKey || e.video?.videoKey || "",
    coverageRanges: t.ranges,
    coverageReliable: t.reliable,
    coverageSource: t.source,
    creditsPerHour: e.readCreditsPerHour || xe,
    totalReadMs: 0,
    lastSentTotalReadMs: 0,
    lastMediaTime: null,
    lastWallTimeMs: 0,
    lastHeartbeatAtMs: 0,
    heartbeatSequence: 0,
    remoteSessionStarted: !0,
  };
}
function qa(e = {}, t = {}) {
  const a = (Array.isArray(e.segments) ? e.segments : []).map((t) =>
      e.readGrant?.requestId
        ? { ...t, walletCacheRequestId: e.readGrant.requestId }
        : t,
    ),
    n = a
      .map((e) => String(e.original || "").trim())
      .filter(Boolean)
      .join(" "),
    r = a
      .map((e) => String(e.translation || "").trim())
      .filter(Boolean)
      .join(" "),
    i = t.pageUrl || e.video?.canonicalUrl || e.track?.pageUrl || "",
    s = Aa(e);
  return {
    kind: "translation",
    isFinal: !0,
    cacheHit: !0,
    cacheReplay: !0,
    provider: "sql-subtitle-cache",
    pageUrl: i,
    cacheVideoKey: s,
    context: {
      pageUrl: i,
      sourceUrl: i,
      videoKey: s,
      sessionId: t.sessionId || null,
    },
    original: n,
    translation: r,
    segments: a,
    detectedLang:
      e.track?.sourceLang || e.requestedSourceLang || t.sourceLang || "auto",
    readCreditsPerHour: e.readCreditsPerHour || xe,
    segmentation: {
      method: "sql_subtitle_cache",
      preference: "cached",
      reason: "read from SQL video subtitle cache",
      sourceLanguage:
        e.track?.sourceLang || e.requestedSourceLang || t.sourceLang || "auto",
      targetLanguage:
        e.track?.targetLang || e.requestedTargetLang || t.targetLang || "zh",
      coverageRanges: e.coverageRanges || [],
      coverageReliable: !0 === e.coverageReliable,
      coverageSource: e.coverageSource || e.track?.coverageSource || "",
      partial: Boolean(e.partial),
      track: e.track || null,
    },
    latency: { provider: "sql-subtitle-cache", cacheHit: !0, latencyMs: 0 },
  };
}
async function Oa(e = {}, t = null, a = {}) {
  if (!t?.idToken || !e.sessionId)
    throw new Error("請先登入後再讀取快取字幕。");
  return ea(e.backendUrl, "/caption-sessions/start", {
    method: "POST",
    headers: Xt(t),
    body: JSON.stringify({
      uid: t.uid,
      idToken: t.idToken,
      sessionId: e.sessionId,
      pageUrl: _a(e),
      originalPageUrl: e.pageUrl || "",
      pageTitle: e.pageTitle || "",
      durationSeconds: dl(e.pageDurationSeconds ?? e.durationSeconds),
      mediaTimeSeconds: dl(e.initialPlaybackMediaTime ?? e.currentMediaTime),
      sourceLang: e.sourceLang || "auto",
      targetLang: e.targetLang || "zh",
      provider: "cached-subtitle",
      sttAudioSpeed: 1,
      translationProvider: "sql-subtitle-cache",
      saveEnabled: !1,
      billingProtocolVersion: 2,
      extensionVersion:
        ("function" == typeof chrome.runtime?.getManifest &&
          chrome.runtime.getManifest().version) ||
        "",
      clientBuildFingerprint: "cached-subtitle-billing-v2",
      cacheTrackId: a.track?.trackId || "",
      cacheVideoKey: a.track?.videoKey || a.video?.videoKey || "",
    }),
    timeoutMs: Re,
    label: "cached subtitle session start",
  });
}
async function $a(e = {}, t = null) {
  if (!t?.idToken || !e.sessionId)
    throw new Error("請先登入後再讀取快取字幕。");
  if ("sql-wallet-v1" === e.walletBillingProtocol) return ka(e, t);
  try {
    return await ea(e.backendUrl, "/caption-video-subtitles/start-session", {
      method: "POST",
      headers: Xt(t),
      body: JSON.stringify({
        uid: t.uid,
        idToken: t.idToken,
        sessionId: e.sessionId,
        pageUrl: _a(e),
        originalPageUrl: e.pageUrl || "",
        mediaContextKey: Ra(e),
        videoKey: Ra(e),
        videoId: e.youtubeVideoId || Tl(_a(e)),
        pageTitle: e.pageTitle || "",
        durationSeconds: dl(e.pageDurationSeconds ?? e.durationSeconds),
        mediaTimeSeconds: dl(e.initialPlaybackMediaTime ?? e.currentMediaTime),
        sourceLang: e.sourceLang || "auto",
        targetLang: e.targetLang || "zh",
        sttProvider: e.sttProvider || "",
        sttAudioSpeed: e.sttAudioSpeed || 1,
        sttPromptApplied: Boolean(dc(e.sttPrompt)),
        sttKeywordCount: uc(e.sttKeywords).length,
        sttContextSearchDirection: sc(e.sttContextSearchDirection),
        sttContextCustom: !0 === e.sttContextCustom,
        llmProvider: e.provider || "",
      }),
      timeoutMs: Re,
      label: "cached subtitle session start",
    });
  } catch (a) {
    if ("wallet_protocol_required" !== a.code) throw a;
    return ka(e, t);
  }
}
async function Fa({
  sourceTab: e,
  sessionId: t,
  normalizedConfig: a,
  platform: n,
}) {
return null;
}
const Ha = 240,
  ja = 12e4,
  Wa = 1500,
  Ga = 600;
function za(e) {
  return new Promise((t) => setTimeout(t, e));
}
function Ja(e, t = {}, a = {}, n = null) {
  const r = t.pageUrl || a.video?.canonicalUrl || "",
    i = String(
      a.track?.videoKey || a.video?.videoKey || t.cacheVideoKey || "",
    ).trim();
  return {
    kind: "translation",
    isFinal: !0,
    cacheHit: !0,
    cacheReplay: !0,
    cacheUpgrade: !0,
    provider: "sql-subtitle-cache",
    pageUrl: r,
    cacheVideoKey: i,
    context: { pageUrl: r, sourceUrl: r, videoKey: i, sessionId: n },
    original: e
      .map((e) => String(e.original || "").trim())
      .filter(Boolean)
      .join(" "),
    translation: e
      .map((e) => String(e.translation || "").trim())
      .filter(Boolean)
      .join(" "),
    segments: e,
    detectedLang: a.track?.sourceLang || t.sourceLang || "auto",
    segmentation: {
      method: "sql_subtitle_cache_upgrade",
      preference: "cached",
      reason: "retranslated cached subtitles with a higher-grade LLM",
      sourceLanguage: a.track?.sourceLang || t.sourceLang || "auto",
      targetLanguage: a.track?.targetLang || t.targetLang || "zh",
      track: a.track || null,
    },
    latency: { provider: "sql-subtitle-cache", cacheHit: !0, latencyMs: 0 },
  };
}
async function Ya(e = {}) {
  const t = e.sessionId,
    a = e.config || {},
    n = a.provider || "",
    r = a.pageUrl || "",
    i = e.displayTabId || e.tabId;
  if (!(t && r && n && i)) return;
  await za(Wa);
  let s = 0,
    o = 0,
    c = 0,
    l = 0,
    d = 0;
  for (; o < Ha; ) {
    if (!at || at.sessionId !== t) return;
    const e = await Zt();
    if (!e?.idToken) return;
    let u = null;
    try {
      u = await ea(a.backendUrl, "/caption-video-subtitles/retranslate", {
        method: "POST",
        headers: Xt(e),
        body: JSON.stringify({
          uid: e.uid,
          idToken: e.idToken,
          sessionId: t,
          pageUrl: r,
          sourceLang: a.sourceLang || "auto",
          targetLang: a.targetLang || "zh",
          llmProvider: n,
          startMs: s,
          maxLlmCalls: 2,
          requestId: `${t}:upgrade:${o}`,
        }),
        timeoutMs: ja,
        label: "subtitle upgrade",
      });
    } catch (e) {
      if (((c += 1), c > 3))
        return void console.warn(
          "[service-worker] subtitle upgrade stopped after repeated errors:",
          e.message,
        );
      await za(3e3 * c);
      continue;
    }
    if (((c = 0), (o += 1), !u?.ok)) return;
    const m = Array.isArray(u.segments) ? u.segments : [];
    if (
      (m.length &&
        ((d += m.length),
        await ko(i, {
          type: "LIVE_SUBTITLE_EVENT",
          sessionId: t,
          event: Ja(m, a, u, t),
        })),
      u.billing &&
        (await ko(i, {
          type: "LIVE_SUBTITLE_EVENT",
          sessionId: t,
          event: { kind: "usage", usage: u.billing },
        })),
      u.done)
    )
      return void (await ko(i, {
        type: "LIVE_SUBTITLE_EVENT",
        sessionId: t,
        event: {
          kind: "status",
          status: "cached-subtitle-upgraded",
          message:
            d > 0
              ? `字幕已升級為更高品質翻譯（${d.toLocaleString("en-US")} 段）`
              : "快取字幕已是最高品質",
        },
      }));
    const f = Number(u.nextStartMs);
    if (!Number.isFinite(f) || f <= s) {
      if (((l += 1), l >= 2)) return;
    } else ((l = 0), (s = f));
    await za(Ga);
  }
}
function Qa(e) {
  const t = e?.url ? new URL(e.url).origin : "";
  if (!L.has(t)) throw new Error("未授權的登入來源。");
}
async function Xa(e) {
  if (!e?.idToken || !e?.refreshToken)
    throw new Error("登入資料不完整，請重新登入。");
  const t = Za(e.idToken),
    a = String(t.user_id || t.sub || "");
  if (!a) throw new Error("Firebase token 無法對應到會員。");
  if (e.uid && e.uid !== a)
    throw new Error("Firebase token 與會員資料不一致。");
  const n = String(t.iss || ""),
    r = String(t.aud || "");
  if (n !== `https://securetoken.google.com/${l}` || r !== l)
    throw new Error("Firebase token 專案不一致，請重新登入。");
  const i = 1e3 * Number(t.exp || 0);
  if (!Number.isFinite(i) || i <= Date.now())
    throw new Error("Firebase 登入已失效，請重新登入。");
  if (!1 === t.email_verified || !1 === e.emailVerified)
    throw new Error("Email 尚未驗證，請先完成信箱驗證。");
  return {
    uid: a,
    email: String(t.email || e.email || ""),
    displayName: String(t.name || e.displayName || ""),
    idToken: e.idToken,
    refreshToken: e.refreshToken,
    expiresAt: i,
    emailVerified: !1 !== t.email_verified && !1 !== e.emailVerified,
    providerId: e.providerId || "google.com",
    updatedAt: new Date().toISOString(),
  };
}
function Za(e) {
  try {
    const t = String(e || "").split(".")[1] || "",
      a = t
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(t.length + ((4 - (t.length % 4)) % 4), "=");
    return JSON.parse(atob(a));
  } catch {
    throw new Error("Firebase token 格式錯誤，請重新登入。");
  }
}
function en(e) {
  try {
    const t = e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"),
      a = t.padEnd(t.length + ((4 - (t.length % 4)) % 4), "="),
      n = JSON.parse(atob(a)),
      r = 1e3 * Number(n.exp);
    return Number.isFinite(r) ? r : 0;
  } catch {
    return 0;
  }
}
function tn(e) {
  return (
    {
      INVALID_ID_TOKEN: "Firebase 登入已失效，請重新登入。",
      USER_NOT_FOUND: "找不到此 Firebase 會員。",
      USER_DISABLED: "此帳號已停用。",
    }[e] || e
  );
}
function an(e) {
  return (
    {
      OPERATION_NOT_ALLOWED: "後端尚未開啟免登入試用，請稍後再試。",
      TOO_MANY_ATTEMPTS_TRY_LATER: "免登入試用建立過於頻繁，請稍後再試。",
      USER_DISABLED: "此試用身分已停用。",
    }[e] || e
  );
}
function nn(e) {
  return (
    {
      INVALID_REFRESH_TOKEN: "登入已過期，請重新登入。",
      TOKEN_EXPIRED: "登入已過期，請重新登入。",
      USER_NOT_FOUND: "找不到此 Firebase 會員。",
      USER_DISABLED: "此帳號已停用。",
    }[e] || e
  );
}
function rn(e) {
  return (
    !!e &&
    (!0 === e.permanentAuthFailure ||
      sn(e.firebaseCode || e.code || e.message || ""))
  );
}
function sn(e) {
  return [
    "INVALID_REFRESH_TOKEN",
    "TOKEN_EXPIRED",
    "USER_NOT_FOUND",
    "USER_DISABLED",
    "MISSING_ID_TOKEN",
    "MISSING_REFRESH_TOKEN",
  ].includes(String(e || ""));
}
function on(e = {}, t = {}) {
  const a = Number(e.tabId ?? t.tab?.id);
  return Number.isFinite(a) ? a : null;
}
function cn(e = null, t = null) {
  if (!e || !t?.id || Number(e.tabId) !== Number(t.id)) return null;
  const a = e.pageInfo;
  return Os(a, t.url || "")
    ? !1 === a?.timing?.found ||
      Number(a?.timing?.readyState || 0) < 2 ||
      null === dl(a?.timing?.currentTime)
      ? null
      : e
    : null;
}
async function ln(e = null) {
  const t = await mn(e).catch(() => null);
  if (!t?.id) return null;
  const a = await Rl(
    chrome.tabs.sendMessage(t.id, { type: "LIVE_SUBTITLE_PAGE_INFO_REQUEST" }),
    700,
    null,
  );
  return !a?.ok ||
    !1 === a?.timing?.found ||
    Number(a?.timing?.readyState || 0) < 2 ||
    null === dl(a?.timing?.currentTime)
    ? null
    : {
        tabId: Number(t.id),
        capturedAtMs: Date.now(),
        source: "service-worker-receipt",
        pageInfo: a,
      };
}
async function dn(e, t) {
  if (t?.url !== chrome.runtime.getURL("popup.html"))
    throw new Error("Invalid popup startup sender");
  const a = Number(e.tabId);
  if (!Number.isSafeInteger(a) || a <= 0)
    throw new Error("Invalid popup startup tab");
  const n = await chrome.tabs.get(a);
  if (n.url !== e.expectedTabUrl)
    throw new Error("影片分頁已切換，請重新按開始字幕。");
  const r = new URL(n.url).origin;
  if (
    !/^https?:\/\//.test(r) ||
    !(await chrome.permissions.contains({ origins: [`${r}/*`] }))
  )
    return {
      ok: !1,
      needsPagePermission: !0,
      error: "需要先允許網站存取權限。",
    };
  if (e.config?.sttContextAutoResearchEnabled)
    throw new Error("智慧搜尋需先完成費用確認。");
  const i = { ...e.config };
  return (
    delete i.auth,
    await chrome.storage.local.set({ liveSubtitleConfig: i }),
    un({ ...e, config: i }, t)
  );
}
function un(e = {}, t = {}) {
  const a = on(e, t),
    n = Number.isFinite(a) ? `tab:${a}` : "active-tab",
    r = ot.get(n);
  if (r) return r;
  const i = e.startPlaybackSnapshot
      ? Promise.resolve(e.startPlaybackSnapshot)
      : ln(a).catch(() => null),
    s = ct.catch(() => {}),
    o = Promise.all([s, i]).then(([, t]) =>
      wn(e.config, { requestedTabId: a, startPlaybackSnapshot: t }),
    );
  return (
    (ct = o.catch(() => {})),
    ot.set(n, o),
    o
      .finally(() => {
        ot.get(n) === o && ot.delete(n);
      })
      .catch(() => {}),
    o
  );
}
async function mn(e = null) {
  if (Number.isFinite(Number(e))) {
    const t = await chrome.tabs.get(Number(e)).catch(() => null);
    if (t?.id) return t;
  }
  const [t] = await chrome.tabs.query({ active: !0, currentWindow: !0 });
  return t || null;
}
let fn = 0;
async function gn(e, t = {}) {
  const a = Date.now();
  (("start-enter" !== e && fn) || (fn = a),
    await Promise.resolve(
      chrome.storage?.local?.set?.({
        liveSubtitleStartProgress: {
          stage: String(e || "unknown"),
          atMs: a,
          startedAtMs: fn,
          elapsedMs: Math.max(0, a - fn),
          ...t,
        },
      }),
    ).catch(() => {}));
}
async function hn(e = null) {
  if (
    !Number.isInteger(Number(e?.id)) ||
    !e?.url ||
    !chrome.scripting?.executeScript
  )
    return;
  try {
    const t = new URL(e.url);
    if (!["http:", "https:"].includes(t.protocol)) return;
  } catch {
    return;
  }
  const t = Number(e.id);
  let a = null;
  for (let e = 0; e < 3; e += 1)
    try {
      return void (await us(
        { target: { tabId: t }, func: () => !0 },
        2500,
        "site access probe",
      ));
    } catch (e) {
      if (((a = e), pn(e)))
        throw new Error(
          "Chrome 尚未授予這個影片網站的存取權。請回到影片分頁，按「開始字幕」並允許網站存取。",
        );
      if (!Ms(e)) throw e;
      (await Es(t, 3e3, 250).catch(() => null), await Dl(100));
    }
  if (Ms(a))
    throw new Error("影片頁面仍在載入，請稍候再試；字幕未取得音訊或產生用量。");
  throw a;
}
function pn(e = null) {
  return /Cannot access contents of url|Cannot access a chrome|host permission|activeTab permission|Extension has not been invoked|The extensions gallery cannot be scripted/i.test(
    String(e?.message || e || ""),
  );
}
function bn(e, t) {
  return qt(t) && "economy" === t.anonymousTrialWallet
    ? {
        ...e,
        sttProvider: "st-m",
        provider: "lt-n",
        sttAudioSpeed: 1,
        llmFallbackMode: "off",
        sttContextAutoResearchEnabled: !1,
        sttContextRefreshEnabled: !1,
      }
    : e;
}
async function yn(e, t = {}) {
  await gn("start-enter", { requestedTabId: dl(t.requestedTabId) });
  let a = await Zt();
  qt(a) && (a = await jt(a, { refreshPolicy: !0 }));
  let n = Vc(fc(bn(e || {}, a)));
  const r = $c(n),
    i = tl(n.syncDelaySeconds),
    s = await mn(t.requestedTabId);
  if (!s?.id) throw new Error("找不到目前分頁");
  const o = cn(t.startPlaybackSnapshot, s),
    c = o?.pageInfo || null;
  ((n = Dn(n, s.url || "")),
    await gn("tab-resolved", {
      tabId: s.id,
      playbackSnapshotCaptured: Boolean(c),
      playbackSnapshotMediaTime: dl(c?.timing?.currentTime),
    }));
  const l = await Uo({ validate: !0 });
  await gn("sessions-loaded", { tabId: s.id, sessionCount: l.length });
  const d = l.filter((e) => Zo(e).includes(Number(s.id))),
    u = d[0] || null,
    m = ac(n.captionMode),
    f =
      m === Ie || m === ke
        ? (await oo(u, s)) ||
          (await oo(await Yo(), s, { requireCompletedStart: !0 }))
        : null;
  await gn("reusable-tabs-resolved", { tabId: s.id });
  let g = f?.sourceTab || s;
  const h = new Set(Qi([s.id, g?.id])),
    p = l.filter((e) => Zo(e).some((e) => h.has(e)));
  (await ec(p.map((e) => e.sessionId)),
    await gn("concurrency-ready", { tabId: s.id }));
  for (const e of p)
    ((e.cachedSubtitleMode || e.hybridSubtitleCacheMode) &&
      (await Ai(e, {
        reason: "restart",
        endRemote: !e.hybridSubtitleCacheMode,
      })),
      await wa(e, "restart"),
      await zi(e, {
        pauseManagedMedia: Boolean(e.syncEnabled),
        notifyDisplayStop: !0,
      }),
      await xn(e.sessionId, { notify: !1, endRemote: !0, reason: "restart" }),
      await Wo(e.sessionId));
  await gn("previous-sessions-cleaned", { tabId: s.id });
  const b = await co({
    activeTab: s,
    reusableTabs: f,
    sourceTab: g,
    activePageInfoSnapshot: c,
  });
  if (
    (await gn("reusable-context-ready", { tabId: s.id }),
    (g = b.sourceTab || g),
    !tc(g.url))
  )
    throw new Error(
      "請先切到要翻譯的影片分頁，再從工具列開啟插件並按開始字幕。",
    );
  await hn(g);
  const y = crypto.randomUUID();
  let w = null;
  (await Cs(g.id),
    await gn("source-script-ready", {
      tabId: g.id,
      sessionId: y,
      maxWaitMs: 6300,
    }),
    (w = await Us(g.id).catch(
      (e) => (
        console.warn(
          "[service-worker] video page info unavailable:",
          e.message,
        ),
        null
      ),
    )));
  const S = g.url || w?.href || w?.canonicalMediaUrl || "";
  let v = null;
  if (
    null === dl(b.sourceStartupSeekTargetMediaTime) &&
    null === dl(b.sourceStartSeconds)
  ) {
    const e = dl(c?.timing?.currentTime);
    Boolean(null !== e && !xc(c) && Os(c, S))
      ? (v = {
          pageInfo: w,
          mediaTime: e,
          reportedMediaTime: e,
          isLiveStream: !1,
          source: `start-request-snapshot:${String(o?.source || "unknown")}`,
          waitedMs: 0,
          sampleCount: 1,
        })
      : ((v = await xs({
          tabId: g.id,
          expectedUrl: S,
          initialPageInfo: w,
          preferCurrentPageTiming: Boolean(
            w?.timing?.found && Number(w?.timing?.readyState || 0) >= 2,
          ),
        })),
        (w = v.pageInfo || w));
  }
  const I = await Bs({ tabId: g.id, expectedUrl: S, initialPageInfo: w });
  ((w = I.pageInfo || w),
    await gn("source-info-ready", { tabId: g.id, sessionId: y }));
  const T = lo({ sourcePageInfo: w, reusableStartContext: b });
  T &&
    ((b.sourceStartupSeekTargetMediaTime = T.targetMediaTime),
    (b.sourceStartupLiveDelaySeconds = T.viewerLiveDelaySeconds));
  let M =
    dl(b.sourceStartupSeekTargetMediaTime) ??
    dl(b.sourceStartSeconds) ??
    dl(v?.mediaTime) ??
    dl(w?.timing?.currentTime);
  const k = gl(g.url),
    E = I.status,
    C = "live" === E,
    L = nc({
      enabled: !0 === n.smartRoutingEnabled,
      requestedCaptionMode: m,
      platform: k,
      sourceLiveClassification: E,
      mseSupported: hl(g.url) && Pn(n.sttProvider),
    }),
    A = L.captionMode,
    D = "youtube" === k || "twitch" === k || "instagram" === k,
    R = jc(n.sttProvider),
    N = Boolean(C && ("youtube" === k || "twitch" === k) && Qc(n)),
    U = Fc(n, { policy: r, mseAudioBufferEnabled: !1 }),
    V = Boolean(C && D && Oc(n)),
    K = V ? B : n.syncDelaySeconds,
    q = V ? B : "lightning" === r ? _ : x,
    O = C && D ? Math.max(Zc(k, K), U.minimumSeconds, q) : null;
  N
    ? (n = {
        ...n,
        sttProvider: Xc(R, n.sourceLang),
        syncDelayMode: "fixed",
        syncDelaySeconds: O,
        baseSyncDelaySeconds: O,
        batchWaitSeconds: 0,
        effectiveSyncDelaySeconds: O,
        mseStartupBoostEnabled: !1,
      })
    : C &&
      D &&
      (n = {
        ...n,
        syncDelaySeconds: O,
        baseSyncDelaySeconds: O,
        effectiveSyncDelaySeconds: O,
      });
  const $ = Boolean(C && A === Te),
    F = Boolean(
      C &&
        "youtube" === k &&
        A === Ie &&
        !0 === w?.youtubeLiveDvrKnown &&
        !1 === w?.youtubeLiveDvrEnabled,
    ),
    H = $ ? Me : F ? ke : A,
    j = pc(H, g.url, w);
  if (H === ke && !j) throw new Error(bc(g.url, w));
  const W = Sc(H, g.url, w),
    G = Boolean(W),
    z =
      "twitch-hls" === W
        ? Yn(w, g.url) || sr(g.id, g.url)
        : "instagram-native" === W
          ? vc(w)
          : null,
    J = z && "twitch-hls" === W ? { ...z, sourceTabId: g.id } : z,
    Y = Uc(n, g.url, w, {
      platform: k,
      captionMode: H,
      mirrorDelayEnabled: j,
      nativeStreamDelayEnabled: G,
      sourceLiveClassification: E,
    }),
    Q = gc(H),
    X = Boolean(Y && !Q && "st-j" === jc(n.sttProvider)),
    Z = Boolean(Y && Nn(n.sttProvider)),
    ee = Boolean(Y && !X && Pn(n.sttProvider)),
    te = Boolean(Y && (Q || ee)),
    ae = te && Boolean(n.mseAudioBufferSingleTab || Q),
    ne = Fc({ ...n, captionMode: H }, { policy: r, mseAudioBufferEnabled: te }),
    re = Math.max(tl(n.syncDelaySeconds), ne.minimumSeconds);
  n = { ...n, syncDelaySeconds: re };
  let ie = null;
  te &&
    hl(g.url || "") &&
    ((ie = await Ss(g, w)),
    (ie.staleReloaded || ie.documentStartReloaded) &&
      ((w = await Us(g.id).catch(() => w)),
      (M = dl(ie.restoredMediaTime) ?? dl(w?.timing?.currentTime) ?? M)));
  const se = ae
      ? Math.max(tl(n.syncDelaySeconds), P)
      : G
        ? sl(n.syncDelaySeconds)
        : tl(n.syncDelaySeconds),
    oe = al(n.batchWaitSeconds),
    ce = G ? sl(se + oe) : tl(se + oe),
    le = Kc(n.syncDelayMode),
    de = H !== Me && !ae && (j || Nc(n, g.url, w)),
    ue = H !== Me && !j && (ae || Pc(n, g.url, w)),
    me =
      !1 !== n.msePcmPrimaryOnly &&
      te &&
      Nn(n.sttProvider) &&
      ((de && !ue) || (ue && "youtube" !== k)),
    fe = Boolean(de && !ue && !j && !G && "youtube" === k),
    ge = te && Pn(n.sttProvider) && "st-d" !== jc(n.sttProvider),
    he = String(
      w?.mediaContextKey || El(w?.canonicalMediaUrl || g.url || "") || "",
    ).trim();
  let pe = {
    ...n,
    captionAccountUid: a?.uid || "",
    captionMode: H,
    sourceIsLiveStream: C,
    sourceLiveClassification: E,
    sourceLiveEvidence: I.evidence,
    sourceLiveClassificationProbeWaitedMs: I.waitedMs,
    sourceLiveClassificationProbeSamples: I.sampleCount,
    sourceLiveClassificationPlayerProbeSamples: I.playerProbeCount,
    sourceLiveEdgeGrowthSeconds: I.edgeGrowthSeconds,
    smartRoutingEnabled: L.enabled,
    smartRoutingApplied: L.applied,
    smartRoutingReason: L.reason,
    smartRoutingRequestedCaptionMode: L.requestedCaptionMode,
    smartRoutingResolvedCaptionMode: H,
    liveMseFallbackApplied: $,
    youtubeLiveDvrKnown: !0 === w?.youtubeLiveDvrKnown,
    youtubeLiveDvrEnabled: !0 === w?.youtubeLiveDvrEnabled,
    youtubeNoDvrMirrorApplied: F,
    liveRealtimeFastStartupApplied: N,
    speechEngineIHyMtLiveTenSecondApplied: V,
    liveRealtimeRequestedSttProvider: R,
    liveRealtimeSttProvider: N ? n.sttProvider : "",
    liveRealtimeTargetDelaySeconds: C ? O : null,
    syncDelayMode: le,
    syncDelaySeconds: ce,
    baseSyncDelaySeconds: se,
    batchWaitSeconds: oe,
    effectiveSyncDelaySeconds: ce,
    syncDelaySafetyPolicy: ne.policy,
    syncDelaySafetyMinimumSeconds: ne.minimumSeconds,
    syncDelaySafetyMseActive: ne.mseActive,
    syncDelaySafetyAdjustedFromSeconds: ne.policy && re !== i ? i : null,
    mseStartupBoostEnabled: Boolean(n.mseStartupBoostEnabled && ge),
    mseSeekCatchupEnabled: !1 !== n.mseSeekCatchupEnabled,
    mseStartupBoostMode: rl(n.mseStartupBoostMode),
    mseStartupBoostTargetSeconds: nl(n.mseStartupBoostTargetSeconds),
    disableSubtitleCache: Na(n),
    adaptiveSyncDelayEnabled: "auto" === le && !ue,
    sourcePreloadEnabled: !1,
    sourceStartupCaptureHold: fe,
    sourcePreloadPlaybackRate: 1,
    sourcePreloadMaxLeadSeconds: ol(n.sourcePreloadMaxLeadSeconds),
    syncEnabled: de,
    singleTabMediaSync: ue,
    mseAudioBufferEnabled: te,
    mseBatchSttPipelineEnabled: Z,
    audioPrefetchEnabled: !0 === n.audioPrefetchEnabled && te && !C,
    mseSegmentSttPipelineEnabled: ee,
    realtimeViewerSyncPcmApplied: X,
    mseAudioBufferSingleTab: ae,
    msePcmPrimaryOnly: me,
    audioInputMode: te ? "mse-audio-buffer" : "tab-capture",
    youtubeVodSingleTabSync: te || Boolean(n.youtubeVodSingleTabSync),
    mirrorDelayEnabled: j,
    mirrorCaptureLayout: "",
    nativeStreamDelayEnabled: G,
    nativeStreamDelayKind: W,
    nativeStreamCandidate: J,
    nativeStreamCandidateCapturedAt: J
      ? new Date(Number(J.capturedAtMs) || Date.now()).toISOString()
      : "",
    nativeStreamCandidateSource: J?.source || "",
    nativeStreamBridgeMode: "twitch-hls" === W ? "original-page-hls" : "",
    lowLatencyStt: !de || ue || H === Me,
    syncRole: j
      ? G
        ? `${k}-native`
        : `${k}-mirror`
      : H === Me
        ? Me
        : de
          ? `${k}-viewer`
          : ue
            ? `${k}-single-tab`
            : "single-tab",
    videoPlatform: k,
    mseHookVersion: dl(ie?.hookVersion),
    mseHookStaleReloaded: Boolean(ie?.staleReloaded),
    mseHookDocumentStartReloaded: Boolean(ie?.documentStartReloaded),
    mseHookDocumentStartVerified: Boolean(ie?.documentStartVerified),
    mseHookPlaybackRestored: Boolean(ie?.playbackRestored),
    sessionId: y,
    pageUrl: g.url,
    canonicalPageUrl: w?.canonicalMediaUrl || g.url || "",
    sourceMediaContextKey: he,
    viewerMediaContextKey: he,
    youtubeVideoId: w?.videoId || Tl(w?.canonicalMediaUrl || g.url || ""),
    pageTitle: g.title || "",
    reuseExistingViewerTimeline: Boolean(C && b.preserveDisplayTab),
    reusedViewerInitialMediaTime: dl(b.activePageInfo?.timing?.currentTime),
    initialPlaybackMediaTime: M ?? dl(w?.timing?.currentTime),
    pageDurationSeconds: dl(w?.timing?.duration ?? w?.duration),
    saveEnabled: !1,
    startedAt: new Date().toISOString(),
  };
  const be = await oa({
    sessionId: y,
    normalizedConfig: pe,
    platform: k,
    sourceTab: g,
    pageInfo: w,
  });
  if (be?.enabled) {
    const e = "consumer" === be.role;
    pe = {
      ...pe,
      liveSharedEnabled: !0,
      liveSharedStreamId: be.streamId,
      liveSharedStreamKey: be.streamKey,
      liveSharedRole: be.role,
      liveSharedTimelineMode: be.timelineMode,
      liveSharedParticipantCount: Math.max(0, Number(be.participantCount || 0)),
      liveSharedConsumer: e,
      sourceStartupCaptureHold: !e && pe.sourceStartupCaptureHold,
    };
  } else
    !0 === pe.liveSharedEnabled &&
      (pe = {
        ...pe,
        liveSharedEnabled: !1,
        liveSharedUnavailableReason: be?.reason || "unavailable",
      });
  let ye = null,
    we = null;
  const Se = Date.now();
  await gn("subtitle-cache-checking", {
    tabId: g.id,
    sessionId: y,
    timeoutMs: Re,
    expectedLookupMs: _e,
    syncDelaySeconds: pe.effectiveSyncDelaySeconds,
  });
  try {
    ye = await Fa({
      sourceTab: g,
      sessionId: y,
      normalizedConfig: pe,
      platform: k,
    });
  } catch (e) {
    const t = await xo(y).catch(() => null);
    throw (
      t?.cachedSubtitleMode &&
        (await Ai(t, { reason: "start-failed" }), await Wo(y)),
      e
    );
  }
  if (
    (await gn("subtitle-cache-checked", {
      tabId: g.id,
      sessionId: y,
      cacheLookupElapsedMs: Math.max(0, Date.now() - Se),
      cacheHit: Boolean(ye),
      hybridCache: Boolean(ye?.hybridSubtitleCacheMode),
      syncDelaySeconds: pe.effectiveSyncDelaySeconds,
    }),
    ye?.hybridSubtitleCacheMode)
  )
    ((we = ye), (pe = ye.cachedConfig || pe));
  else if (ye) return (await Do(), ye);
  ("consumer" !== be?.role && (await Xi()),
    await gn("offscreen-ready", { tabId: g.id, sessionId: y }));
  let ve = g,
    Ee = !1,
    Ce = !1,
    Le = null,
    Ae = !1;
  const De = {
    tabId: g.id,
    captureTabId: g.id,
    sourceTabId: g.id,
    displayTabId: de ? null : g.id,
    captionMode: H,
    syncEnabled: de,
    singleTabMediaSync: ue,
    mseAudioBufferEnabled: te,
    mirrorDelayEnabled: j,
    nativeStreamDelayEnabled: G,
    liveShared: be?.enabled
      ? {
          enabled: !0,
          streamId: be.streamId,
          streamKey: be.streamKey,
          role: be.role || "consumer",
          leaseToken: be.leaseToken || "",
          leaseExpiresAtMs: Number(be.leaseExpiresAtMs || 0),
          timelineMode: be.timelineMode || "",
          participantCount: Math.max(0, Number(be.participantCount || 0)),
          serverTimeOffsetMs: Number(be.serverTimeOffsetMs || 0),
          cursor: 0,
          producerCaptureStarted: !1,
          joinedAtMs: Number(be.joinedAtMs || Date.now()),
        }
      : null,
    liveSharedConsumer: "consumer" === be?.role,
    hybridSubtitleCacheMode: Boolean(we || pe.walletCacheManaged),
    cachedSubtitle: we?.cachedSubtitle || null,
    starting: !0,
    sessionId: y,
    config: pe,
    startedAt: Date.now(),
  };
  (await Fo(De),
    await gn("session-created", { tabId: g.id, sessionId: y }),
    o &&
      (await li(y, "sync.start_request_playback_snapshot.accepted", {
        source: String(o.source || "unknown"),
        mediaTime: dl(c?.timing?.currentTime),
        capturedAtMs: dl(o.capturedAtMs),
        acceptedAtMs: Date.now(),
        ageMs: Math.max(0, Date.now() - Number(o.capturedAtMs || Date.now())),
        pageUrl: String(c?.href || s.url || "").slice(0, 180),
        mediaContextKey: String(c?.mediaContextKey || ""),
      })));
  try {
    if (
      (j
        ? (await Cs(g.id, void 0, { mseAudioHook: vs(g, pe) }),
          await Lo(
            g.id,
            { type: "LIVE_SUBTITLE_SOURCE_INIT", config: pe, sessionId: y },
            "來源分頁初始化失敗",
          ),
          (ve = await js(g, {
            sessionId: y,
            config: pe,
            reusableDisplayTab: f?.displayTab,
          })),
          (Ee = Boolean(
            ve?.id && ve.id !== g.id && ve.id !== f?.displayTab?.id,
          )),
          await Fo({ ...De, tabId: ve.id, displayTabId: ve.id, config: pe }))
        : de
          ? (await Cs(g.id, void 0, { mseAudioHook: vs(g, pe) }),
            await Lo(
              g.id,
              { type: "LIVE_SUBTITLE_SOURCE_INIT", config: pe, sessionId: y },
              "來源分頁初始化失敗",
            ),
            await go(g.id, y, pe, b),
            (ve = await Fs(g, f?.displayTab, {
              preserveReusableDisplay: Boolean(b.preserveDisplayTab),
              startSeconds: pe.initialPlaybackMediaTime,
              isLiveStream: C,
            })),
            (Ee = Boolean(
              ve?.id && ve.id !== g.id && ve.id !== f?.displayTab?.id,
            )),
            await Fo({ ...De, tabId: ve.id, displayTabId: ve.id }),
            await Cs(ve.id),
            await Lo(
              ve.id,
              { type: "LIVE_SUBTITLE_INIT", config: pe, sessionId: y },
              "字幕匡初始化失敗",
              { requireMounted: !0 },
            ))
          : (await Cs(ve.id, void 0, { mseAudioHook: vs(ve, pe) }),
            await Lo(
              ve.id,
              { type: "LIVE_SUBTITLE_INIT", config: pe, sessionId: y },
              "字幕匡初始化失敗",
              { requireMounted: !0 },
            )),
      await gn("display-ready", {
        tabId: ve.id,
        sourceTabId: g.id,
        sessionId: y,
      }),
      be?.enabled && ve?.id)
    ) {
      const e = await xo(y);
      e &&
        (await Bn(
          {
            kind: "status",
            status:
              "consumer" === be.role
                ? "live-share-cache"
                : "live-share-producer",
            message:
              "consumer" === be.role
                ? `已連上本場共享字幕 · ${Math.max(1, Number(be.participantCount || 1))} 人同步`
                : "正在產生本場共享字幕",
            sessionId: y,
          },
          y,
        ),
        await da(e, be.segments || []));
    }
    (we?.cacheResult &&
      ve?.id &&
      (await ko(ve.id, {
        type: "LIVE_SUBTITLE_EVENT",
        sessionId: y,
        event: {
          kind: "status",
          status: "hybrid-cache-ready",
          message: `已讀取部分快取字幕 ${we.cacheResult.segments.length.toLocaleString("en-US")} 段，缺口將即時補字幕`,
        },
      }),
      await ko(ve.id, {
        type: "LIVE_SUBTITLE_EVENT",
        sessionId: y,
        event: qa(we.cacheResult, pe),
      })),
      await (async () => {
        const e = () => {
          if (Ae) throw new Error("subtitle startup aborted");
        };
        if ((e(), "consumer" !== be?.role)) {
          if (
            (await ss({ tabId: g.id, sessionId: y, config: pe, guard: e }),
            e(),
            be?.enabled)
          ) {
            const e = await xo(y);
            e && (await Fo(ca(e, { producerCaptureStarted: !0 })));
          }
          (v &&
            (await li(y, "sync.startup_playback_anchor.resolved", {
              pageUrl: String(g.url || "").slice(0, 180),
              reportedMediaTime: v.reportedMediaTime,
              resolvedMediaTime: v.mediaTime,
              resolutionSource: v.source,
              waitedMs: v.waitedMs,
              sampleCount: v.sampleCount,
              isLiveStream: v.isLiveStream,
            })),
            await li(
              y,
              "sync.startup_live_classification.resolved",
              {
                pageUrl: String(g.url || "").slice(0, 180),
                status: I.status,
                evidence: I.evidence,
                waitedMs: I.waitedMs,
                sampleCount: I.sampleCount,
                playerProbeCount: I.playerProbeCount,
                edgeGrowthSeconds: I.edgeGrowthSeconds,
                smartRoutingEnabled: L.enabled,
                smartRoutingApplied: L.applied,
                smartRoutingReason: L.reason,
                smartRoutingRequestedCaptionMode: L.requestedCaptionMode,
                smartRoutingResolvedCaptionMode: H,
                mseAudioBufferEnabled: te,
                syncDelaySafetyPolicy: ne.policy,
                syncDelaySafetyMinimumSeconds: ne.minimumSeconds,
              },
              "unknown" === I.status ? "warn" : "info",
            ),
            await gn("capture-ready", {
              tabId: ve?.id || g.id,
              sourceTabId: g.id,
              sessionId: y,
            }),
            vs(g, pe) &&
              (await Eo(g.id, pe, y, {
                tab: g,
                reason: "offscreen-ready",
                retryPostedSegments: !0,
              }),
              e()));
        } else {
          const e = await xo(y);
          e && (await ya(e, w?.timing || null, { force: !0 }));
        }
      })(),
      await (({ correctReusableLiveAlignment: e = !1 } = {}) =>
        !pe.sourceStartupCaptureHold || Ce
          ? Promise.resolve()
          : Le ||
            ((Le = (async () => {
              if (Ae) throw new Error("subtitle startup aborted");
              if (e) {
                const e = await fo({
                  sourceTab: g,
                  displayTab: ve,
                  sessionId: y,
                  normalizedConfig: pe,
                  reusableStartContext: b,
                });
                null !== e && (pe.initialPlaybackMediaTime = e);
              }
              if (Ae) throw new Error("subtitle startup aborted");
              (await Lo(
                g.id,
                {
                  type: "LIVE_SUBTITLE_SOURCE_CAPTURE_READY",
                  sessionId: y,
                  initialPlaybackMediaTime: pe.initialPlaybackMediaTime,
                },
                "來源音訊起點放行失敗",
                { timeoutMs: 5e3 },
              ),
                (Ce = !0));
            })().catch((e) => {
              throw ((Le = null), e);
            })),
            Le))({ correctReusableLiveAlignment: !0 }),
      j &&
        ve?.id &&
        chrome.tabs?.update &&
        (await chrome.tabs.update(ve.id, { active: !0 }).catch(() => {})));
  } catch (e) {
    Ae = !0;
    const t = Sn(De, c?.timing || w?.timing);
    throw (
      De.hybridSubtitleCacheMode &&
        (await Ai(De, { reason: "start-failed", endRemote: !1 }).catch(
          () => {},
        )),
      await ko(ve.id, {
        type: "LIVE_SUBTITLE_EVENT",
        sessionId: y,
        event: { kind: "error", message: e.message },
      }),
      await zi(
        {
          ...De,
          tabId: ve?.id || De.tabId,
          displayTabId: (de && ve?.id) || De.displayTabId,
        },
        {
          pauseManagedMedia: !1,
          pauseDisplayMedia: de || t,
          pauseSourceMedia: !1,
          resumeSourceMedia: Boolean(pe.sourceStartupCaptureHold),
          notifyDisplayStop: t,
        },
      ),
      (await ds()) &&
        (await chrome.runtime
          .sendMessage({
            target: "offscreen",
            type: "STOP_TAB_AUDIO_CAPTURE",
            sessionId: y,
          })
          .catch(() => {})),
      await Wo(y),
      await Go(y),
      Ee &&
        ve?.id &&
        ve.id !== g.id &&
        (chrome.tabs?.remove &&
          (await chrome.tabs.remove(ve.id).catch(() => {})),
        chrome.tabs?.update &&
          (await chrome.tabs.update(g.id, { active: !0 }).catch(() => {}))),
      await Do(),
      await Wi(g.id, y, pe, e.message),
      e
    );
  }
  const Ne = await xo(y);
  return (
    Ne && (await Fo({ ...Ne, starting: !1 })),
    await Do(),
    await gn("complete", { tabId: ve.id, sourceTabId: g.id, sessionId: y }),
    {
      ok: !0,
      tabId: ve.id,
      captureTabId: g.id,
      displayTabId: ve.id,
      captionMode: H,
      syncEnabled: de,
      singleTabMediaSync: ue,
      mseAudioBufferEnabled: te,
      mirrorDelayEnabled: j,
      nativeStreamDelayEnabled: G,
      nativeStreamDelayKind: W,
      liveSharedEnabled: Boolean(be?.enabled),
      liveSharedRole: be?.role || "",
      liveSharedStreamId: be?.streamId || "",
      liveSharedSegments: be?.segments?.length || 0,
      hybridSubtitleCacheMode: Boolean(we || pe.walletCacheManaged),
      cacheHit: Boolean(we),
      cachePartial: Boolean(
        we &&
          (we.cacheResult?.partial || !0 !== we.cacheResult?.coverageReliable),
      ),
      cacheSegments: we?.cacheResult?.segments?.length || 0,
      sttProvider: pe.sttProvider,
      provider: pe.provider,
      effectiveSyncDelaySeconds: pe.effectiveSyncDelaySeconds,
      liveRealtimeFastStartupApplied: Boolean(
        pe.liveRealtimeFastStartupApplied,
      ),
      realtimeViewerSyncPcmApplied: Boolean(pe.realtimeViewerSyncPcmApplied),
      sourceIsLiveStream: Boolean(pe.sourceIsLiveStream),
      sessionId: y,
    }
  );
}
async function wn(e, t = {}) {
  try {
    const a = await yn(e, t);
    return (
      await Promise.resolve(chrome.storage?.local?.remove?.(E)).catch(() => {}),
      a
    );
  } catch (e) {
    await gn("failed", {
      requestedTabId: dl(t.requestedTabId),
      message: String(e?.message || e || "啟動失敗").slice(0, 500),
    });
    const a = {
      message: String(e?.message || e || "啟動失敗").slice(0, 500),
      atMs: Date.now(),
    };
    throw (
      await Promise.resolve(chrome.storage?.local?.set?.({ [E]: a })).catch(
        () => {},
      ),
      e
    );
  }
}
function Sn(e = {}, t = null) {
  return (
    !0 === e.singleTabMediaSync &&
    !0 !== e.syncEnabled &&
    !0 !== e.config?.sourceIsLiveStream &&
    !0 === t?.paused
  );
}
async function vn() {
  const e = await Promise.resolve(chrome.storage?.local?.get?.(E)).catch(
      () => ({}),
    ),
    t = e?.[E],
    a = Number(t?.atMs || 0);
  return !t?.message || !Number.isFinite(a) || Date.now() - a > C
    ? null
    : { message: String(t.message).slice(0, 500), atMs: a };
}
async function In(e = {}, t = {}) {
  const a = await Vo(e, t, { validate: !0 });
  return a
    ? ((a.cachedSubtitleMode || a.hybridSubtitleCacheMode) &&
        (await Ai(a, {
          reason: "stop",
          endRemote: !a.hybridSubtitleCacheMode,
        })),
      await wa(a, "stop"),
      await zi(a, { pauseManagedMedia: Boolean(a?.syncEnabled) }),
      await Wo(a.sessionId),
      await Do(),
      await xn(a?.sessionId),
      { ok: !0 })
    : (await Do(), { ok: !0, inactive: !0 });
}
async function Tn(e = {}, t = {}) {
  const a = await Vo(e, t, { validate: !0 });
  if (!a) return { ok: !0, active: !1, inactive: !0 };
  const n = fc(e.config || {});
  let { config: r, requiresRestart: i, restartReasons: s } = _n(a, n);
  if (await ds()) {
    const e = await chrome.runtime.sendMessage({
      target: "offscreen",
      type: "UPDATE_CAPTURE_CONFIG",
      sessionId: a.sessionId,
      config: r,
      requiresRestart: i,
      restartReasons: s,
    });
    if (!1 === e?.ok) return e;
    (e?.effectiveProvider && (r = { ...r, provider: e.effectiveProvider }),
      (i = i || !0 === e?.requiresRestart),
      (s = [...new Set([...s, ...(e?.restartReasons || [])])]));
  }
  const o = {
    ...a,
    captionMode: r.captionMode,
    syncEnabled: Boolean(r.syncEnabled),
    singleTabMediaSync: Boolean(r.singleTabMediaSync),
    mirrorDelayEnabled: Boolean(r.mirrorDelayEnabled),
    nativeStreamDelayEnabled: Boolean(r.nativeStreamDelayEnabled),
    config: r,
  };
  await Fo(o);
  const c = {
      type: "LIVE_SUBTITLE_CONFIG_UPDATE",
      sessionId: o.sessionId,
      config: r,
      requiresRestart: i,
      restartReasons: s,
    },
    l = o.displayTabId || o.tabId,
    d = Qi([o.captureTabId, o.sourceTabId]).filter((e) => e !== l);
  o.mirrorDelayEnabled
    ? await chrome.runtime
        .sendMessage({ target: "mirror-viewer", ...c })
        .catch(() => {})
    : l && (await ko(l, c));
  for (const e of d) await ko(e, c);
  return {
    ok: !0,
    active: !0,
    updated: !0,
    requiresRestart: i,
    restartReasons: s,
    config: r,
  };
}
function Mn(e, t) {
  return Array.from(String(e || ""))
    .slice(0, Math.max(0, t))
    .join("");
}
function kn(e) {
  let t = Array.isArray(e) ? e : [];
  if (!Array.isArray(e) && "string" == typeof e)
    try {
      const a = JSON.parse(e);
      t = Array.isArray(a) ? a : [];
    } catch {
      t = e.split(/[\n,;]+/u);
    }
  const a = [],
    n = new Set();
  for (const e of t) {
    const t = Mn(
      String(e || "")
        .replace(/[\u0000-\u001f\u007f<>]/gu, " ")
        .replace(/\s+/gu, " ")
        .trim(),
      M,
    );
    if (!t) continue;
    let r = t.toLowerCase();
    try {
      r = t.normalize("NFKC").toLocaleLowerCase("und");
    } catch {}
    if (!n.has(r) && (n.add(r), a.push(t), a.length >= T)) break;
  }
  return a;
}
function En(e = {}) {
  const t = !0 === e?.automaticSttContextEditableApplied;
  return {
    prompt: Mn(t ? e?.automaticSttContextBasePrompt : e?.sttPrompt, I).trim(),
    keywords: kn(t ? e?.automaticSttContextBaseKeywords : e?.sttKeywords),
  };
}
function Cn(e, t, a = {}) {
  const n = Mn(e, I).trim(),
    r = Mn(a.prompt, I).trim(),
    i = [];
  for (const e of [n, r]) e && !i.includes(e) && i.push(e);
  return {
    prompt: Mn(i.join("\n\n"), I).trim(),
    keywords: kn([...kn(t), ...kn(a.keywords)]),
  };
}
function Ln(e = {}) {
  const t = Mn(e?.automaticSttPrompt, I).trim(),
    a = Mn(e?.automaticSttContextReviewPrompt, 1600).trim(),
    n = [];
  for (const e of [a, t]) e && !n.includes(e) && n.push(e);
  const r = Mn(e?.automaticTranslationPrompt, k).trim(),
    i = Mn(e?.automaticSttContextReviewTranslationPrompt, 800).trim(),
    s = [];
  for (const e of [i, r]) e && !s.includes(e) && s.push(e);
  return {
    prompt: Mn(n.join("\n\n"), I).trim(),
    keywords: kn([
      ...kn(e?.automaticSttContextReviewKeywords),
      ...kn(e?.automaticSttKeywords),
    ]),
    translationPrompt: Mn(s.join("\n\n"), k).trim(),
  };
}
function An(e = {}) {
  const t = String(e?.config?.youtubeVideoId || "").trim();
  if (/^[A-Za-z0-9_-]{11}$/u.test(t)) return t;
  const a = String(
    e?.config?.sourceMediaContextKey || e?.config?.viewerMediaContextKey || "",
  );
  if (a.startsWith("youtube:")) {
    const e = a.slice(8);
    if (/^[A-Za-z0-9_-]{11}$/u.test(e)) return e;
  }
  return Tl(e?.config?.canonicalPageUrl || e?.config?.pageUrl || "");
}
function Dn(e = {}, t = "") {
  if (!0 === e?.sttContextCustom) return e;
  const a = Tl(t),
    n = String(
      e?.automaticSttContextVideoId || e?.translationPromptVideoId || "",
    ).trim(),
    r = cc(e);
  if (/^prompt-[a-f0-9]{16,64}$/u.test(n) && n === r) return e;
  if (!n || n === a) return e;
  const i =
    !0 === e?.automaticSttContextEditableApplied
      ? En(e)
      : { prompt: "", keywords: [] };
  return {
    ...e,
    sttPrompt: i.prompt,
    sttKeywords: i.keywords,
    translationPrompt: "",
    translationPromptVideoId: "",
    automaticSttContextStatus: "idle",
    automaticSttContextVideoId: "",
    automaticSttPrompt: "",
    automaticSttKeywords: [],
    automaticTranslationPrompt: "",
    automaticTranslationPromptEstimatedTokens: 0,
    automaticSttContextEditableApplied: !1,
    automaticSttContextBasePrompt: i.prompt,
    automaticSttContextBaseKeywords: i.keywords,
    automaticSttContextReviewPrompt: "",
    automaticSttContextReviewKeywords: [],
    automaticSttContextReviewTranslationPrompt: "",
    automaticSttContextReviewGeneratedAt: "",
    automaticSttContextGeneratedAt: "",
    automaticSttContextCacheHit: !1,
    automaticSttContextElapsedMs: 0,
  };
}
async function Rn(e = {}) {
  const t = String(e.sessionId || "").trim(),
    a = String(e.videoId || "").trim(),
    n = String(e.contextId || a).trim(),
    r = /^prompt-[a-f0-9]{16,64}$/u.test(n),
    i = /^[A-Za-z0-9_-]{11}$/u.test(n);
  if (!t || (!r && !i))
    return { ok: !0, ignored: !0, reason: "invalid-identity" };
  const s = await xo(t);
  if (!s) return { ok: !0, ignored: !0, reason: "stale-session" };
  if (i && An(s) !== a) return { ok: !0, ignored: !0, reason: "stale-video" };
  if (r && !sc(s.config?.sttContextSearchDirection))
    return { ok: !0, ignored: !0, reason: "stale-prompt-context" };
  if (r && cc(s.config) !== n)
    return { ok: !0, ignored: !0, reason: "stale-prompt-context" };
  const o = ["loading", "ready", "error"].includes(
      String(e.status || "").toLowerCase(),
    )
      ? String(e.status).toLowerCase()
      : "error",
    c = "ready" === o ? Mn(e.prompt, I).trim() : "",
    l = "ready" === o ? kn(e.keywords) : [],
    d = "ready" === o ? Mn(e.translationPrompt, k).trim() : "",
    u = "ready" === o ? Mn(e.basePrompt, I).trim() : "",
    m = "ready" === o ? kn(e.baseKeywords) : [],
    f = u || m.length ? { prompt: u, keywords: m } : En(s.config || {}),
    g = "ready" === o ? Mn(e.reviewPrompt, 1600).trim() : "",
    h = "ready" === o ? kn(e.reviewKeywords).slice(0, 100) : [],
    p = "ready" === o ? Mn(e.reviewTranslationPrompt, 800).trim() : "",
    b = Ln({
      automaticSttPrompt: c,
      automaticSttKeywords: l,
      automaticTranslationPrompt: d,
      automaticSttContextReviewPrompt: g,
      automaticSttContextReviewKeywords: h,
      automaticSttContextReviewTranslationPrompt: p,
    }),
    y = Cn(b.prompt, b.keywords, f),
    w = "ready" === o ? Mn(e.editablePrompt, I).trim() : "",
    S = "ready" === o ? kn(e.editableKeywords) : [],
    v =
      "ready" === o
        ? { prompt: w || y.prompt, keywords: S.length ? S : y.keywords }
        : f,
    T = {
      ...s,
      config: {
        ...(s.config || {}),
        sttPrompt: v.prompt,
        sttKeywords: v.keywords,
        automaticSttContextStatus: o,
        automaticSttContextVideoId: n,
        automaticSttPrompt: c,
        automaticSttKeywords: l,
        automaticTranslationPrompt: d,
        automaticTranslationPromptEstimatedTokens:
          "ready" === o
            ? Math.max(
                0,
                Math.round(Number(e.translationPromptEstimatedTokens || 0)),
              )
            : 0,
        automaticSttContextEditableApplied: "ready" === o,
        automaticSttContextBasePrompt: f.prompt,
        automaticSttContextBaseKeywords: f.keywords,
        automaticSttContextReviewPrompt: g,
        automaticSttContextReviewKeywords: h,
        automaticSttContextReviewTranslationPrompt: p,
        automaticSttContextReviewGeneratedAt:
          "ready" === o ? String(e.reviewGeneratedAt || "") : "",
        automaticSttContextGeneratedAt:
          "ready" === o ? String(e.generatedAt || "") : "",
        automaticSttContextCacheHit: "ready" === o && !0 === e.cacheHit,
        automaticSttContextPromptChars:
          "ready" === o ? Array.from(c).length : 0,
        automaticSttContextKeywordCount: "ready" === o ? l.length : 0,
        sttContextSearchDirection: sc(
          ("ready" === o && e.searchDirection) ||
            s.config?.sttContextSearchDirection,
        ),
        automaticSttContextElapsedMs: Math.max(
          0,
          Math.round(Number(e.elapsedMs || 0)),
        ),
        automaticSttContextError: "error" === o ? Mn(e.error, 300) : "",
      },
    };
  return (
    await Fo(T),
    {
      ok: !0,
      updated: !0,
      status: o,
      contextId: n,
      videoId: a,
      promptChars: Array.from(b.prompt).length,
      keywordCount: b.keywords.length,
      translationPromptChars: Array.from(b.translationPrompt).length,
    }
  );
}
function _n(e = {}, t = {}) {
  const a = e.config || {},
    n = [],
    r = { ...a },
    i = [
      "backendUrl",
      "targetLang",
      "sttLanguageMode",
      "sttContextAutoResearchEnabled",
      "sttContextSearchDirection",
      "sttContextRefreshEnabled",
      "sttContextRefreshIntervalMinutes",
      "sttContextCustom",
      "sttPrompt",
      "sttKeywords",
      "translationPrompt",
      "translationPromptVideoId",
      "sourceLanguageHints",
      "provider",
      "segmentationMode",
      "translationStyle",
      "maxOriginalChars",
      "maxSegments",
      "overlayMode",
      "overlayFontSize",
      "overlayFontFamily",
      "overlayEqualBilingualFontSize",
      "overlayOpacity",
      "overlayOriginalColor",
      "overlayTranslationColor",
      "syncDelayMode",
      "syncDelaySeconds",
      "batchWaitSeconds",
      "mseStartupBoostEnabled",
      "mseSeekCatchupEnabled",
      "mseStartupBoostMode",
      "mseStartupBoostTargetSeconds",
      "mseStartupBoostProvider",
      "disableSubtitleCache",
      "adaptiveSyncDelayEnabled",
      "subtitleBufferTargetSegments",
      "syncSubtitleOffsetSeconds",
      "finalBatchingEnabled",
      "saveEnabled",
      "developerUi",
      "uiMode",
      "uiLocale",
      "interactionProvider",
      "fastProvider",
      "panelTranslateEndpoints",
    ];
  for (const e of i)
    Object.prototype.hasOwnProperty.call(t, e) && (r[e] = t[e]);
  Object.prototype.hasOwnProperty.call(t, "sourceLang") &&
    ((r.sourceLang = t.sourceLang),
    Nn(a.sttProvider) || n.push("source-language"));
  const s = Object.prototype.hasOwnProperty.call(t, "captionMode")
    ? ac(t.captionMode)
    : a.captionMode;
  s && s !== a.captionMode && n.push("caption-mode");
  const o = [
    "audioPrefetchEnabled",
    "sttProvider",
    "sttAudioSpeed",
    "speechEngineAWsUrl",
    "vadEnabled",
    "vadProvider",
    "localVadGateEnabled",
    "batchSttMinSegmentMs",
    "batchSttMaxSegmentMs",
    "batchSttTargetSegmentMs",
    "batchSttPipelineReserveMs",
    "batchSttOverlapMs",
  ];
  for (const e of o)
    Object.prototype.hasOwnProperty.call(t, e) &&
      (("audioPrefetchEnabled" === e && !1 === t[e]) ||
        (JSON.stringify(t[e]) !== JSON.stringify(a[e]) && n.push(e)));
  ((r.captionMode = a.captionMode || ac(t.captionMode)),
    (r.syncEnabled = a.syncEnabled),
    (r.singleTabMediaSync = a.singleTabMediaSync),
    (r.mseAudioBufferEnabled = a.mseAudioBufferEnabled),
    (r.audioInputMode = a.audioInputMode),
    (r.audioPrefetchEnabled =
      !0 === a.audioPrefetchEnabled && !1 !== t.audioPrefetchEnabled),
    (r.youtubeVodSingleTabSync = a.youtubeVodSingleTabSync),
    (r.mirrorDelayEnabled = a.mirrorDelayEnabled),
    (r.mirrorCaptureLayout = ""),
    (r.nativeStreamDelayEnabled = a.nativeStreamDelayEnabled),
    (r.nativeStreamDelayKind = a.nativeStreamDelayKind || ""),
    (r.nativeStreamCandidate = a.nativeStreamCandidate || null),
    (r.videoPlatform = a.videoPlatform),
    (r.sessionId = a.sessionId || e.sessionId),
    (r.pageUrl = a.pageUrl),
    (r.pageTitle = a.pageTitle),
    (r.startedAt = a.startedAt),
    (r.sttProvider = a.sttProvider),
    (r.sttAudioSpeed = a.sttAudioSpeed),
    (r.speechEngineAWsUrl = a.speechEngineAWsUrl),
    (r.sourcePreloadEnabled = !1),
    (r.sourcePreloadPlaybackRate = 1),
    (r.sourcePreloadMaxLeadSeconds = 0),
    (r.lowLatencyStt = a.lowLatencyStt));
  const c = Kc(r.syncDelayMode);
  r.syncDelayMode = c;
  const l = Object.prototype.hasOwnProperty.call(t, "syncDelaySeconds")
      ? t.syncDelaySeconds
      : (a.baseSyncDelaySeconds ?? a.syncDelaySeconds),
    d = r.nativeStreamDelayEnabled ? sl(l) : tl(l),
    u = al(
      Object.prototype.hasOwnProperty.call(t, "batchWaitSeconds")
        ? t.batchWaitSeconds
        : a.batchWaitSeconds,
    ),
    m = r.nativeStreamDelayEnabled ? sl(d + u) : tl(d + u);
  return (
    (r.baseSyncDelaySeconds = d),
    (r.batchWaitSeconds = u),
    (r.effectiveSyncDelaySeconds = m),
    (r.syncDelaySeconds = m),
    (r.adaptiveSyncDelayEnabled = "auto" === c && !r.singleTabMediaSync),
    {
      config: r,
      requiresRestart: n.length > 0,
      restartReasons: [...new Set(n)],
    }
  );
}
function Nn(e) {
  const t = jc(e);
  return (
    "st-a" === t ||
    "st-b" === t ||
    "st-i" === t ||
    "st-k" === t ||
    "st-l" === t ||
    "st-m" === t ||
    Wc(t)
  );
}
function Pn(e) {
  const t = jc(e);
  return "st-c" === t || "st-j" === t || Nn(t);
}
function Un(e) {
  const t = jc(e);
  return "st-a" === t || "st-k" === t;
}
async function xn(e = null, t = {}) {
  const a = !1 !== t.notify,
    n = (await ds())
      ? await Rl(
          chrome.runtime
            .sendMessage({
              target: "offscreen",
              type: "STOP_TAB_AUDIO_CAPTURE",
              sessionId: e,
              notify: a,
              ...(!0 === t.endRemote ? { endRemote: !0 } : {}),
              reason: t.reason || null,
            })
            .catch((e) => ({ ok: !1, error: e.message })),
          Ee,
          { ok: !1, timeout: !0 },
        )
      : { ok: !0 };
  n?.timeout
    ? console.warn(
        "[service-worker] offscreen stop timed out; keeping the offscreen document alive for other sessions.",
      )
    : !1 === n?.ok &&
      console.warn(
        "[service-worker] offscreen stop skipped:",
        n.error || "unknown error",
      );
  try {
    const t = Number(n?.remainingSessions);
    (!e || (Number.isFinite(t) && t <= 0)) &&
      (await ds()) &&
      (await chrome.offscreen.closeDocument());
  } catch (e) {
    console.warn("[service-worker] offscreen close skipped:", e.message);
  }
}
async function Bn(e, t = null) {
  const a = String(t || "");
  if (!a)
    return (
      console.warn(
        "[service-worker] dropped offscreen event without sessionId",
        { kind: e?.kind || "", status: e?.status || "" },
      ),
      {
        ok: !1,
        delivered: !1,
        accepted: !1,
        retryable: !1,
        reason: "missing-session-id",
      }
    );
  const n = await xo(a);
  if (!Gi(n, t))
    return {
      ok: !1,
      delivered: !1,
      accepted: !1,
      retryable: !0,
      reason: "session-not-active",
    };
  if (qn(e, a))
    return (
      console.warn(
        "[service-worker] dropped offscreen event with stale session context",
        {
          sessionId: a,
          eventSessionId: Kn(e),
          kind: e?.kind || "",
          status: e?.status || "",
        },
      ),
      {
        ok: !1,
        delivered: !1,
        accepted: !1,
        retryable: !1,
        reason: "stale-event-session",
      }
    );
  const r = n?.displayTabId || (n?.syncEnabled ? null : n?.tabId);
  if (!r && !n?.mirrorDelayEnabled)
    return {
      ok: !1,
      delivered: !1,
      accepted: !1,
      retryable: !0,
      reason: "display-tab-unavailable",
    };
  let i = null;
  if (
    (n?.mirrorDelayEnabled
      ? (i = await chrome.runtime
          .sendMessage({
            target: "mirror-viewer",
            type: "LIVE_SUBTITLE_EVENT",
            sessionId: n.sessionId,
            event: e,
          })
          .then((e) => ({ ok: !0, response: e }))
          .catch((e) => ({ ok: !1, error: e?.message || String(e) })))
      : ((i = await ko(r, {
          type: "LIVE_SUBTITLE_EVENT",
          sessionId: n.sessionId,
          event: e,
        })),
        i?.ok || (i = await Vn(n, r, e, i))),
    "error" === e?.kind && (await Do()),
    !i?.ok)
  )
    return {
      ok: !1,
      delivered: !1,
      accepted: !1,
      retryable: !0,
      reason: "display-relay-failed",
      error: i?.error || "display relay failed",
    };
  const s = i.response;
  return (
    "translation" === e?.kind &&
      !0 === e?.isFinal &&
      !0 !== e?.sharedLiveReplay &&
      "producer" === n?.liveShared?.role &&
      (await ga(n, e).catch((e) => {
        console.warn(
          "[service-worker] shared live subtitle publish queued after error:",
          e.message,
        );
      })),
    {
      ok: !0,
      delivered: !0,
      accepted: !1 !== s?.accepted,
      retryable: !1 !== s?.retryable,
      reason: s?.reason || "display-acknowledged",
      deliveryId: s?.deliveryId || e?.deliveryId || "",
    }
  );
}
async function Vn(e, t, a, n = {}) {
  const r = String(n?.error || "");
  if (!Co({ message: r })) return n;
  const i = await ho(t);
  if (!i?.id || !tc(i.url || "")) return n;
  try {
    const s = await po(t, i);
    if (!s?.ok || s?.ignored) return n;
    const o = await ko(t, {
      type: "LIVE_SUBTITLE_EVENT",
      sessionId: e.sessionId,
      event: a,
    });
    return (
      li(
        e.sessionId,
        o?.ok
          ? "session.display_relay_recovered"
          : "session.display_relay_recovery_failed",
        {
          displayTabId: t,
          deliveryId: a?.deliveryId || "",
          eventKind: a?.kind || "",
          initialError: r,
          retryError: o?.error || "",
          contentScriptInjected: Boolean(s?.contentScriptInjected),
          mediaContextKey: s?.mediaContextKey || "",
        },
        o?.ok ? "warn" : "error",
      ).catch(() => {}),
      o
    );
  } catch (i) {
    return yo(i)
      ? n
      : (li(
          e.sessionId,
          "session.display_relay_recovery_failed",
          {
            displayTabId: t,
            deliveryId: a?.deliveryId || "",
            eventKind: a?.kind || "",
            initialError: r,
            retryError: i?.message || String(i),
          },
          "error",
        ).catch(() => {}),
        { ...n, error: i?.message || r || "display relay recovery failed" });
  }
}
function Kn(e = {}) {
  return String(
    e?.sessionId ||
      e?.context?.sessionId ||
      e?.sync?.sessionId ||
      e?.latency?.sessionId ||
      "",
  );
}
function qn(e = {}, t = "") {
  const a = Kn(e);
  return Boolean(a && t && a !== t);
}
async function On(e = {}) {
  ((at = await xo(e.sessionId)),
    Gi(at, e.sessionId) &&
      at?.mirrorDelayEnabled &&
      (await chrome.runtime
        .sendMessage({
          target: "mirror-viewer",
          type: "MIRROR_MEDIA_CHUNK",
          sessionId: at.sessionId,
          mimeType: e.mimeType || "",
          sequence: e.sequence || 0,
          capturedAtMs: e.capturedAtMs || Date.now(),
          byteLength: e.byteLength || 0,
          chunkBase64: e.chunkBase64 || "",
        })
        .catch(() => {})));
}
async function $n(e = {}, t = {}) {
  return (
    (at = await xo(e.sessionId)),
    at?.mirrorDelayEnabled && Gi(at, e.sessionId)
      ? ((at = await Hn(at, t)),
        t.tab?.id && t.tab.id !== at.displayTabId
          ? { ok: !1, error: "mirror viewer tab mismatch" }
          : {
              ok: !0,
              sessionId: at.sessionId,
              config: at.config,
              sourceTitle: at.config?.pageTitle || "",
              sourceUrl: at.config?.pageUrl || "",
            })
      : { ok: !1, error: "mirror session is not active" }
  );
}
function Fn(e = {}, t = "") {
  const a = String(e.url || e.tab?.url || "");
  if (!a || !t) return !1;
  try {
    const e = new URL(a),
      n = new URL(chrome.runtime.getURL("mirror-viewer.html"));
    return (
      e.origin === n.origin &&
      e.pathname === n.pathname &&
      e.searchParams.get("sessionId") === String(t)
    );
  } catch {
    return !1;
  }
}
async function Hn(e = {}, t = {}) {
  const a = Number(t.tab?.id);
  if (!e?.mirrorDelayEnabled || !Number.isFinite(a) || !Fn(t, e.sessionId))
    return e;
  if (a === Number(e.displayTabId)) return e;
  const n = await ho(e.displayTabId);
  if (n?.id && Fn({ url: n.url }, e.sessionId)) return e;
  const r = { ...e, tabId: a, displayTabId: a };
  return (
    await Fo(r),
    li(
      r.sessionId,
      "session.mirror_viewer_rebound",
      {
        previousDisplayTabId: dl(e.displayTabId),
        displayTabId: a,
        starting: !0 === e.starting,
      },
      "warn",
    ).catch(() => {}),
    r
  );
}
async function jn(e = {}, t = {}) {
  const a = await xo(e.sessionId);
  if (!a?.mirrorDelayEnabled || !Gi(a, e.sessionId))
    return { ok: !0, inactive: !0 };
  if (!Fn(t, e.sessionId))
    return { ok: !1, error: "invalid mirror viewer sender" };
  const n = Number(t.tab?.id);
  return Number.isFinite(n)
    ? a.displayTabId && n !== a.displayTabId
      ? { ok: !1, error: "mirror viewer tab mismatch" }
      : (await ho(n))
        ? { ok: !0, released: !1, deferredToTabRemoval: !0 }
        : (await Yi(a, "mirror viewer closed", {
            removedTabId: n,
            reason: "mirror-viewer-closed",
          }),
          { ok: !0, released: !0 })
    : { ok: !1, error: "mirror viewer tab missing" };
}
async function Wn(e = {}, t = null) {
  const a = Number(e.tabId);
  if (!Number.isFinite(a) || a < 0) return !1;
  const n = ri(e.url);
  if (!n || !Zn(n)) return !1;
  const r = t || zn(a, await Uo()),
    i = r?.config?.pageUrl || "",
    s = eo(i),
    o = String(e.initiator || e.documentUrl || "");
  let c = eo(o) ? o : "";
  if (!c) {
    const e = await ho(a);
    c = e?.url || "";
  }
  const l = eo(c);
  if (s && l && s !== l) return !1;
  const d = i || c,
    u = eo(d);
  if (!u) return !1;
  const m = Qn(
    {
      url: n,
      type: "hls",
      source: "webRequest.original-page",
      capturedAtMs: Number(e.timeStamp) || Date.now(),
      requestType: e.type || "",
      channelLogin: u,
      channelVerified: !0,
      sourceTabId: a,
    },
    d,
  );
  if (!m) return !1;
  const f = lr(r),
    g = Qn(r?.config?.nativeStreamCandidate, d);
  if (g?.master && !m.master) return !0;
  const h = ir(a, m, d, { force: f });
  return r && h
    ? (await dr(r.sessionId, h, {
        sourceTabId: a,
        reason: "webRequest.original-page",
        force: f,
      }),
      !0)
    : Boolean(h);
}
function Gn(e = {}) {
  const t = Number(e.tabId);
  if (!Number.isFinite(t) || t < 0) return null;
  const a = ri(e.url);
  return a && Zn(a) ? zn(t, Array.isArray(nt) ? nt : at ? [at] : []) : null;
}
function zn(e, t = []) {
  const a = Number(e);
  return (
    (Number.isFinite(a) &&
      Array.isArray(t) &&
      t.find(
        (e) =>
          "twitch-hls" === e?.config?.nativeStreamDelayKind &&
          Qi([e.captureTabId, e.sourceTabId]).includes(a),
      )) ||
    null
  );
}
function Jn(e) {
  return /\bNo SW\b|Extension context invalidated|message port closed/i.test(
    e?.message || String(e || ""),
  );
}
function Yn(e = null, t = "") {
  const a = Array.isArray(e?.nativeMediaCandidates)
      ? e.nativeMediaCandidates
      : [],
    n = t || e?.href || e?.pageUrl || e?.url || e?.timing?.href || "";
  return (
    a
      .map((e) => Qn(e, n))
      .filter((e) => Xn(e, n))
      .sort((e, t) => ar(t, n) - ar(e, n))[0] || null
  );
}
function Qn(e = null, t = "") {
  if (!e || "object" != typeof e) return null;
  const a = ri(e.url || e.masterUrl || e.streamUrl, t);
  if (!a || !Zn(a)) return null;
  const n = eo(t),
    r = tr(a),
    i = String(e.channelLogin || e.ownerChannel || "")
      .trim()
      .toLowerCase();
  if (i && !/^[a-z0-9_]+$/.test(i)) return null;
  if (r && i && r !== i) return null;
  const s = r || i || n;
  if (n && s && n !== s) return null;
  const o = Number(e.sourceTabId),
    c = "boolean" == typeof e.channelVerified;
  return {
    url: a,
    type: "hls",
    source: String(e.source || "source-probe").slice(0, 80),
    capturedAtMs: Number(e.capturedAtMs) || Date.now(),
    channelLogin: s || "",
    channelVerified: c ? !0 === e.channelVerified : Boolean(r || i),
    sourceTabId: Number.isFinite(o) ? o : null,
    master: er(a),
    requestType: String(e.requestType || "").slice(0, 40),
  };
}
function Xn(e = null, t = "") {
  const a = Qn(e, t);
  if (!a?.channelVerified || !a.channelLogin) return !1;
  const n = eo(t);
  return !n || a.channelLogin === n;
}
function Zn(e = "") {
  try {
    const t = new URL(e);
    return /\.m3u8$/i.test(t.pathname);
  } catch {
    return !1;
  }
}
function er(e = "") {
  try {
    const t = new URL(e);
    return (
      "usher.ttvnw.net" === t.hostname.toLowerCase() &&
      /\/api\/channel\/hls\/[^/]+\.m3u8$/i.test(t.pathname)
    );
  } catch {
    return !1;
  }
}
function tr(e = "") {
  try {
    const t = new URL(e).pathname.match(/\/api\/channel\/hls\/([^/]+)\.m3u8$/i);
    return t ? decodeURIComponent(t[1]).toLowerCase() : "";
  } catch {
    return "";
  }
}
function ar(e = null, t = "") {
  const a = Qn(e, t);
  if (!a) return 0;
  let n = a.master ? 100 : 50;
  (a.channelLogin && a.channelLogin === eo(t) && (n += 20),
    a.source.includes("webRequest") && (n += 8),
    a.source.includes("performance") && (n += 4));
  const r = Math.max(0, Date.now() - a.capturedAtMs);
  return (r <= 15e3 ? (n += 6) : r <= ce && (n += 2), n);
}
function nr(e = null, t = null) {
  if (!e?.url || !t?.url) return !1;
  if (e.channelLogin && t.channelLogin && e.channelLogin !== t.channelLogin)
    return !1;
  if (
    Number.isFinite(Number(e.sourceTabId)) &&
    Number.isFinite(Number(t.sourceTabId)) &&
    Number(e.sourceTabId) !== Number(t.sourceTabId)
  )
    return !1;
  if (e.url === t.url) return !0;
  const a = rr(e.url),
    n = rr(t.url);
  return Boolean(a && n && a === n);
}
function rr(e = "") {
  try {
    const t = new URL(e),
      a = t.searchParams.get("sig") || "",
      n = t.searchParams.get("token") || "";
    return a || n
      ? `${t.hostname.toLowerCase()}${t.pathname}|sig=${a}|token=${n}`
      : "";
  } catch {
    return "";
  }
}
function ir(e, t = null, a = "", n = {}) {
  const r = Number(e),
    i = Qn(t, a);
  if (!Number.isFinite(r) || !i) return null;
  const s = { ...i, sourceTabId: r },
    o = Qn(mt.get(r), a);
  if (o && nr(o, s)) {
    const e = {
      ...o,
      ...s,
      url: o.url,
      master: o.master,
      capturedAtMs: Math.max(o.capturedAtMs || 0, s.capturedAtMs || 0),
    };
    return (mt.set(r, e), e);
  }
  const c = o ? Math.max(0, Date.now() - Number(o.capturedAtMs || 0)) : 1 / 0;
  return !o || !0 === n.force || s.master || !o.master || c > ce
    ? (mt.set(r, s), s)
    : o;
}
function sr(e, t = "", a = {}) {
  const n = Number(e),
    r = Qn(mt.get(n), t);
  if (!r) return null;
  if (Number.isFinite(Number(r.sourceTabId)) && Number(r.sourceTabId) !== n)
    return null;
  const i = Math.max(0, Date.now() - Number(r.capturedAtMs || 0));
  return !a.allowStale && i > ce ? null : r;
}
function or(e, t = "") {
  const a = Number(e);
  if (!Number.isFinite(a)) return !1;
  const n = mt.get(a);
  if (!n) return !1;
  const r = String(n.channelLogin || tr(n.url || ""))
      .trim()
      .toLowerCase(),
    i = eo(t);
  return !((r && i && r === i) || (mt.delete(a), 0));
}
function cr(e = null, t = null, a = {}) {
  return !(
    !t ||
    (e &&
      (nr(e, t) ||
        (e.master && !t.master) ||
        (!0 !== a.force &&
          (e.master || !t.master) &&
          (!e.channelLogin ||
            !t.channelLogin ||
            e.channelLogin === t.channelLogin))))
  );
}
function lr(e = null, t = Date.now()) {
  const a = Date.parse(
    String(e?.config?.nativeStreamCandidateRefreshRequestedAt || ""),
  );
  return Number.isFinite(a) && Math.max(0, t - a) <= le;
}
async function dr(e = "", t = null, a = {}) {
  const n = String(e || "");
  if (!n) return { ok: !1, updated: !1, reason: "missing-session" };
  const r = (ft.get(n) || Promise.resolve())
    .catch(() => {})
    .then(async () => {
      const e = await xo(n);
      if (!e || "twitch-hls" !== e.config?.nativeStreamDelayKind)
        return { ok: !1, updated: !1, reason: "inactive-twitch-session" };
      const r = Number(a.sourceTabId || e.captureTabId || e.sourceTabId),
        i = Qi([e.captureTabId, e.sourceTabId]);
      if (Number.isFinite(r) && i.length && !i.includes(r))
        return { ok: !1, updated: !1, reason: "source-tab-mismatch" };
      const s = e.config?.pageUrl || "",
        o = Qn(t, s);
      if (!o) return { ok: !1, updated: !1, reason: "invalid-candidate" };
      if (
        Number.isFinite(Number(o.sourceTabId)) &&
        Number.isFinite(r) &&
        Number(o.sourceTabId) !== r
      )
        return { ok: !1, updated: !1, reason: "candidate-source-tab-mismatch" };
      ir(r, o, s, { force: !0 === a.force });
      const c = Qn(e.config?.nativeStreamCandidate, s),
        l = lr(e);
      if (nr(c, o)) {
        if (!l && !0 !== a.force)
          return { ok: !0, updated: !1, candidate: c || o };
        if (l)
          return { ok: !0, updated: !1, refreshPending: !0, candidate: c || o };
        const t = {
          ...e,
          config: {
            ...(e.config || {}),
            nativeStreamCandidate: c || o,
            nativeStreamCandidateCapturedAt: new Date(
              o.capturedAtMs || Date.now(),
            ).toISOString(),
            nativeStreamCandidateSource:
              a.reason || o.source || "original-page-hls",
            nativeStreamCandidateRefreshRequestedAt: "",
            nativeStreamCandidateRefreshReason: "",
            nativeStreamCandidateRefreshStatus: 0,
            nativeStreamBridgeMode: "original-page-hls",
          },
        };
        return (
          (at = t),
          await Fo(t),
          { ok: !0, updated: !1, refreshed: !0, candidate: c || o }
        );
      }
      if (!cr(c, o, { force: !0 === a.force || l }))
        return { ok: !0, updated: !1, candidate: c || o };
      const d = `${Date.now()}:${String(a.reason || o.source || "original-hls").slice(0, 40)}`,
        u = {
          ...e,
          config: {
            ...(e.config || {}),
            nativeStreamCandidate: o,
            nativeStreamCandidateCapturedAt: new Date(
              o.capturedAtMs || Date.now(),
            ).toISOString(),
            nativeStreamCandidateSource:
              a.reason || o.source || "original-page-hls",
            nativeStreamCandidateReloadToken: d,
            nativeStreamCandidateRefreshRequestedAt: "",
            nativeStreamCandidateRefreshReason: "",
            nativeStreamCandidateRefreshStatus: 0,
            nativeStreamBridgeMode: "original-page-hls",
          },
        };
      return (
        (at = u),
        await Fo(u),
        u.displayTabId &&
          (await Rr(u, o, a.reason || o.source || "original-page-hls")),
        { ok: !0, updated: !0, candidate: o }
      );
    });
  ft.set(n, r);
  try {
    return await r;
  } finally {
    ft.get(n) === r && ft.delete(n);
  }
}
async function ur(e = null) {
  const t = Number(e?.captureTabId || e?.sourceTabId || e?.tabId),
    a = e?.config?.pageUrl || "";
  let n = mr([e?.config?.nativeStreamCandidate, sr(t, a)], a);
  if (n) return { candidate: n, waitedMs: 0, sourceTabId: t };
  Number.isFinite(t) &&
    (await ko(t, {
      type: "LIVE_SUBTITLE_NATIVE_CANDIDATES_REQUEST",
      sessionId: e?.sessionId || "",
      reason: "twitch-viewer-playback-request",
    }));
  const r = Date.now();
  for (; Date.now() - r <= se; ) {
    const i = await xo(e?.sessionId);
    if (((n = mr([i?.config?.nativeStreamCandidate, sr(t, a)], a)), n))
      return { candidate: n, waitedMs: Date.now() - r, sourceTabId: t };
    await Dl(oe);
  }
  const i = mr(
    [e?.config?.nativeStreamCandidate, sr(t, a, { allowStale: !0 })],
    a,
  );
  return {
    candidate: i,
    waitedMs: Date.now() - r,
    sourceTabId: t,
    stale: Boolean(i),
  };
}
function mr(e = [], t = "") {
  return (
    e
      .map((e) => Qn(e, t))
      .filter(Boolean)
      .sort((e, a) => ar(a, t) - ar(e, t))[0] || null
  );
}
async function fr(e = {}, t = {}) {
  if (
    ((at = await xo(e.sessionId)),
    !at?.mirrorDelayEnabled ||
      !at?.nativeStreamDelayEnabled ||
      !Gi(at, e.sessionId))
  )
    return { ok: !1, error: "Twitch HLS session is not active" };
  if (((at = await Hn(at, t)), t.tab?.id && t.tab.id !== at.displayTabId))
    return { ok: !1, error: "Twitch HLS viewer tab mismatch" };
  const a = eo(at.config?.pageUrl || "");
  if (!a)
    return { ok: !1, error: "找不到 Twitch 頻道名稱，無法建立原頁 HLS 橋接。" };
  const n = await Xr();
  if (!n.ok)
    return {
      ok: !1,
      error: `${n.error || "Twitch HLS header rule 啟用失敗"}；請在 chrome://extensions 重新載入插件後再試。`,
    };
  const r = il(e.delaySeconds ?? at.config?.syncDelaySeconds),
    i = await ur(at),
    s = i?.candidate || null;
  if (!s)
    return {
      ok: !1,
      error: `尚未從原 Twitch 分頁監聽到 HLS playlist，已等待 ${Math.round(Number(i?.waitedMs || 0) / 1e3)} 秒。請確認原頁直播正在播放後再試。`,
      bridgeMode: "original-page-hls",
    };
  await dr(at.sessionId, s, {
    sourceTabId: i.sourceTabId,
    reason: s.source || "original-page-hls",
  });
  const o = await xo(at.sessionId);
  return {
    ok: !0,
    mode: "twitch-hls",
    channelLogin: a,
    masterUrl: s.url,
    streamUrl: s.url,
    streamType: "hls",
    streamReloadToken: o?.config?.nativeStreamCandidateReloadToken || "",
    bridgeMode: "original-page-hls",
    candidateSource: s.source || "",
    candidateCapturedAtMs: s.capturedAtMs || 0,
    candidateStale: Boolean(i?.stale),
    delaySeconds: r,
    maxDelaySeconds: G,
    headerRuleActive: !0,
  };
}
async function gr(e = {}, t = {}) {
  if (
    ((at = await xo(e.sessionId)),
    !at?.mirrorDelayEnabled ||
      !at?.nativeStreamDelayEnabled ||
      !Gi(at, e.sessionId))
  )
    return { ok: !1, error: "native stream session is not active" };
  if (((at = await Hn(at, t)), t.tab?.id && t.tab.id !== at.displayTabId))
    return { ok: !1, error: "native stream viewer tab mismatch" };
  const a = at.config?.nativeStreamDelayKind || "";
  if ("twitch-hls" === a) return fr(e, t);
  if ("instagram-native" !== a)
    return {
      ok: !1,
      error: `unsupported native stream kind: ${a || "unknown"}`,
    };
  const n = await hr(at),
    r = n?.candidate || null;
  if (!r)
    return {
      ok: !1,
      error: br(n?.diagnostics),
      diagnostics: n?.diagnostics || null,
    };
  const i = await Zr();
  if (!i.ok)
    return {
      ok: !1,
      error: `${i.error || "Instagram 原始串流 header rule 啟用失敗"}；請在 chrome://extensions 重新載入插件後再試。`,
    };
  const s = sl(e.delaySeconds ?? at.config?.syncDelaySeconds);
  return {
    ok: !0,
    mode: "instagram-native",
    streamUrl: r.url,
    streamType: r.type,
    streamInlineManifest: Boolean(r.inlineManifest),
    streamManifestText: (r.inlineManifest && r.manifestText) || "",
    streamManifestBaseUrl: r.manifestBaseUrl || r.url,
    streamManifestSignature: r.manifestSignature || "",
    streamReloadToken: at?.config?.nativeStreamCandidateReloadToken || "",
    source: r.source || "",
    delaySeconds: s,
    maxDelaySeconds: z,
    headerRuleActive: !0,
  };
}
async function hr(e = null) {
  const t = Ic(e?.config?.nativeStreamCandidate),
    a = yr(e),
    n = !!t && Sr(e);
  if (t && !n)
    return {
      candidate: t,
      diagnostics: {
        ...a,
        storedCandidate: !0,
        candidateType: t.type,
        candidateSource: t.source || "",
        candidateAgeMs: Ir(e),
      },
    };
  const r = e?.captureTabId || e?.sourceTabId || e?.tabId;
  if (!r)
    return {
      candidate: t,
      diagnostics: {
        ...a,
        storedCandidate: Boolean(t),
        storedCandidateRefreshWanted: Boolean(n),
        candidateAgeMs: Ir(e),
        endedReason: t
          ? "stored-candidate-no-source-tab"
          : "missing-source-tab-id",
      },
    };
  const i = Date.now();
  let s = t;
  for (; Date.now() - i <= de; ) {
    ((a.attempts += 1), (a.elapsedMs = Date.now() - i));
    try {
      const t = await ho(r);
      if (
        ((a.sourceTabExists = Boolean(t?.id)),
        (a.sourceTabUrl = Ar(t?.url || "")),
        !t?.id || !tc(t.url || ""))
      ) {
        a.endedReason = "source-tab-not-injectable";
        break;
      }
      await Cs(t.id);
      const o = await Us(t.id, 1800).catch(() => null);
      if (
        ((a.lastPageInfo = wr(o)),
        (a.lastCandidateCount = Array.isArray(o?.nativeMediaCandidates)
          ? o.nativeMediaCandidates.length
          : 0),
        (a.lastCandidateTypes = Cr(o?.nativeMediaCandidates, "type")),
        (a.lastCandidateSources = Cr(o?.nativeMediaCandidates, "source")),
        (a.lastInlineManifestCount = Lr(o?.nativeMediaCandidates)),
        pr(o, t.url || ""))
      ) {
        a.endedReason = "not-live-page";
        break;
      }
      if (((s = vc(o)), s)) {
        const t = {
          ...e,
          config: {
            ...kr(e.config || {}),
            nativeStreamCandidate: s,
            nativeStreamCandidateCapturedAt: new Date().toISOString(),
            nativeStreamCandidateReloadToken: n
              ? Mr("candidate-refresh")
              : e.config?.nativeStreamCandidateReloadToken || "",
          },
        };
        return (
          (at = t),
          await Fo(t),
          {
            candidate: s,
            diagnostics: {
              ...a,
              endedReason: "candidate-found",
              storedCandidateRefreshWanted: Boolean(n),
              candidateType: s.type,
              candidateSource: s.source || "",
              candidateAgeMs: Ir(t),
              elapsedMs: Date.now() - i,
            },
          }
        );
      }
    } catch (e) {
      ((a.lastError = String(e?.message || e || "").slice(0, 240)),
        console.warn(
          "[service-worker] Instagram native candidate refresh skipped:",
          e.message,
        ));
    }
    await Dl(ue);
  }
  return {
    candidate: s,
    diagnostics: {
      ...a,
      storedCandidate: Boolean(t && s),
      storedCandidateRefreshWanted: Boolean(n),
      candidateAgeMs: Ir(e),
      endedReason: a.endedReason || "timeout",
      elapsedMs: Date.now() - i,
    },
  };
}
function pr(e = null, t = "") {
  if (!e || "object" != typeof e) return !1;
  if (!0 === e.hasVideo) return !1;
  const a = e.href || e.timing?.href || t || "";
  return !!yl(a || t) && !vl(a) && !vl(t);
}
function br(e = null) {
  const t = e?.lastPageInfo || null,
    a = Math.round(Number(e?.elapsedMs || de) / 1e3);
  return "not-live-page" === e?.endedReason
    ? "這個 Instagram live URL 目前沒有直播播放器，可能直播已結束或頁面已轉回個人頁。請打開正在播放的 IG Live 後重新開始字幕。"
    : !1 === t?.hasVideo
      ? "目前 Instagram 頁面沒有可播放影片。請確認直播畫面已載入，而不是停在個人頁、限動列表或直播結束頁。"
      : !1 === t?.isLiveStream || !1 === t?.timingLive
        ? "目前 Instagram 頁面偵測到的影片不是直播，無法建立原始串流延遲播放。請切到正在進行的 IG Live 後再試。"
        : Number(e?.lastCandidateCount) > 0
          ? `已抓到 ${e.lastCandidateCount} 個 Instagram 媒體候選，但沒有可播放的 DASH/HLS 原始串流。請重新載入直播頁後再試。`
          : `找不到可播放的 Instagram 原始串流候選，已等待 ${a} 秒。請確認直播畫面已載入並重新開始字幕。`;
}
function yr(e = null) {
  return {
    waitMs: de,
    pollMs: ue,
    sourceTabId: e?.captureTabId || e?.sourceTabId || e?.tabId || null,
    attempts: 0,
    elapsedMs: 0,
    storedCandidate: !1,
    sourceTabExists: null,
    sourceTabUrl: "",
    lastPageInfo: null,
    lastCandidateCount: 0,
    lastCandidateTypes: [],
    lastCandidateSources: [],
    lastInlineManifestCount: 0,
    candidateAgeMs: Ir(e),
    storedCandidateRefreshWanted: Sr(e),
    lastError: "",
    endedReason: "",
  };
}
function wr(e = null) {
  return e && "object" == typeof e
    ? {
        platform: e.platform || "",
        hasVideo: !0 === e.hasVideo,
        isLiveStream: !0 === e.isLiveStream,
        liveBufferSeconds: Number.isFinite(Number(e.liveBufferSeconds))
          ? Math.round(10 * Number(e.liveBufferSeconds)) / 10
          : null,
        nativeCandidateCount: Array.isArray(e.nativeMediaCandidates)
          ? e.nativeMediaCandidates.length
          : 0,
        inlineManifestCount: Lr(e.nativeMediaCandidates),
        nativeCandidateDiagnostics: Er(e.nativeCandidateDiagnostics),
        timingFound: !1 !== e.timing?.found,
        timingLive: !0 === e.timing?.isLiveStream,
        href: Ar(e.href || e.timing?.href || ""),
      }
    : null;
}
function Sr(e = null) {
  if (!Ic(e?.config?.nativeStreamCandidate)) return !1;
  if (vr(e)) return !0;
  const t = Ir(e);
  return null !== t && t > we;
}
function vr(e = null, t = Date.now()) {
  const a = Tr(e?.config?.nativeStreamCandidateRefreshRequestedAt);
  return null !== a && t - a <= ye;
}
function Ir(e = null, t = Date.now()) {
  const a = Tr(e?.config?.nativeStreamCandidateCapturedAt);
  return null === a ? null : Math.max(0, t - a);
}
function Tr(e) {
  if (null == e || "" === e) return null;
  const t = Number(e);
  if (Number.isFinite(t) && t > 0) return t;
  const a = Date.parse(String(e));
  return Number.isFinite(a) ? a : null;
}
function Mr(e = "") {
  return `${Date.now()}:${String(e || "refresh").slice(0, 40)}`;
}
function kr(e = {}) {
  return {
    ...e,
    nativeStreamCandidateRefreshRequestedAt: "",
    nativeStreamCandidateRefreshReason: "",
    nativeStreamCandidateRefreshStatus: 0,
  };
}
function Er(e = null) {
  return e && "object" == typeof e
    ? {
        mediaNodeCount: Math.round(Number(e.mediaNodeCount) || 0),
        mediaNodeScanCount: Math.round(Number(e.mediaNodeScanCount) || 0),
        mediaAttributeScanCount: Math.round(
          Number(e.mediaAttributeScanCount) || 0,
        ),
        performanceResourceCount: Math.round(
          Number(e.performanceResourceCount) || 0,
        ),
        scriptNodeCount: Math.round(Number(e.scriptNodeCount) || 0),
        scriptNodeScanCount: Math.round(Number(e.scriptNodeScanCount) || 0),
        matchedScriptNodeCount: Math.round(
          Number(e.matchedScriptNodeCount) || 0,
        ),
        largeScriptNodeCount: Math.round(Number(e.largeScriptNodeCount) || 0),
        scriptSnippetCount: Math.round(Number(e.scriptSnippetCount) || 0),
        keywordWindowCount: Math.round(Number(e.keywordWindowCount) || 0),
        candidateCount: Math.round(Number(e.candidateCount) || 0),
        returnedCandidateCount: Math.round(
          Number(e.returnedCandidateCount) || 0,
        ),
        inlineManifestCount: Math.round(Number(e.inlineManifestCount) || 0),
      }
    : null;
}
function Cr(e = [], t = "") {
  return Array.isArray(e)
    ? [
        ...new Set(
          e.map((e) => String(e?.[t] || "").slice(0, 80)).filter(Boolean),
        ),
      ].slice(0, 8)
    : [];
}
function Lr(e = []) {
  return Array.isArray(e)
    ? e.filter(
        (e) => !0 === e?.inlineManifest || !0 === e?.streamInlineManifest,
      ).length
    : 0;
}
function Ar(e = "") {
  const t = String(e || "");
  if (!t) return "";
  try {
    const e = new URL(t);
    return (
      (e.search = e.search ? "?..." : ""),
      (e.hash = ""),
      e.href.slice(0, 180)
    );
  } catch {
    return t.split("?")[0].slice(0, 180);
  }
}
async function Dr(e = {}, t = {}) {
  const a = await xo(e.sessionId);
  if (
    !a?.mirrorDelayEnabled ||
    !a?.nativeStreamDelayEnabled ||
    !Gi(a, e.sessionId)
  )
    return { ok: !0, ignored: !0, reason: "inactive-session" };
  const n = Number(t.tab?.id),
    r = Qi([a.captureTabId, a.sourceTabId, a.tabId]);
  if (Number.isFinite(n) && r.length && !r.includes(n))
    return { ok: !1, error: "native stream candidate tab mismatch" };
  const i = a.config?.nativeStreamDelayKind || "";
  if ("twitch-hls" === i) {
    const t =
        e.pageUrl ||
        e.pageInfo?.href ||
        e.pageInfo?.timing?.href ||
        a.config?.pageUrl ||
        "",
      r = eo(a.config?.pageUrl || ""),
      i = eo(t);
    if (r && i && r !== i)
      return { ok: !0, ignored: !0, reason: "twitch-channel-mismatch" };
    const s = Yn(
      {
        nativeMediaCandidates:
          e.nativeMediaCandidates || e.pageInfo?.nativeMediaCandidates || [],
        href: t,
      },
      t,
    );
    if (!s) return { ok: !0, ignored: !0, reason: "no-twitch-hls-candidate" };
    const o = Number(e.capturedAtMs) || Date.now(),
      c = Qn(
        {
          ...s,
          capturedAtMs: o,
          source: e.reason || s.source || "source-probe",
          sourceTabId: n,
        },
        t,
      ),
      l = ir(n, c, t);
    return dr(a.sessionId, l, {
      sourceTabId: n,
      reason: e.reason || c?.source || "source-probe",
    });
  }
  if ("instagram-native" !== i)
    return { ok: !0, ignored: !0, reason: "unsupported-native-kind" };
  const s = vc({
    nativeMediaCandidates:
      e.nativeMediaCandidates || e.pageInfo?.nativeMediaCandidates || [],
    href:
      e.pageUrl ||
      e.pageInfo?.href ||
      e.pageInfo?.timing?.href ||
      a.config?.pageUrl ||
      "",
  });
  if (!s) return { ok: !0, ignored: !0, reason: "no-playable-candidate" };
  const o = Ic(a.config?.nativeStreamCandidate);
  if (o && Mc(o, s)) {
    const t = Sr(a),
      n = kr({
        ...(a.config || {}),
        nativeStreamCandidate: s,
        nativeStreamCandidateCapturedAt: new Date(
          Number.isFinite(Number(e.capturedAtMs))
            ? Number(e.capturedAtMs)
            : Date.now(),
        ).toISOString(),
        nativeStreamCandidateSource: e.reason || s.source || "source-probe",
        nativeStreamCandidateReloadToken: t
          ? Mr(e.reason || "candidate-refresh")
          : a.config?.nativeStreamCandidateReloadToken || "",
      }),
      r = { ...a, config: n };
    return (
      (at = r),
      await Fo(r),
      t
        ? (await Rr(r, s, e.reason || "candidate-refresh"),
          { ok: !0, updated: !0, refreshed: !0, candidate: s })
        : {
            ok: !0,
            updated: !1,
            refreshedAt: n.nativeStreamCandidateCapturedAt,
            candidate: s,
          }
    );
  }
  const c = o ? _c(o) : 0,
    l = _c(s);
  if (o && l < c)
    return {
      ok: !0,
      updated: !1,
      candidate: o,
      ignoredCandidate: s,
      reason: "lower-ranked-candidate",
    };
  const d = {
    ...a,
    config: {
      ...kr(a.config || {}),
      nativeStreamCandidate: s,
      nativeStreamCandidateCapturedAt: new Date(
        Number.isFinite(Number(e.capturedAtMs))
          ? Number(e.capturedAtMs)
          : Date.now(),
      ).toISOString(),
      nativeStreamCandidateSource: e.reason || s.source || "source-probe",
      nativeStreamCandidateReloadToken: Mr(
        e.reason || s.source || "candidate-update",
      ),
    },
  };
  return (
    (at = d),
    await Fo(d),
    await Rr(d, s, e.reason || s.source || "source-probe"),
    { ok: !0, updated: !0, candidate: s }
  );
}
async function Rr(e = null, t = null, a = "") {
  e?.displayTabId &&
    t &&
    ("twitch-hls" !== (e.config?.nativeStreamDelayKind || "")
      ? await chrome.runtime
          .sendMessage({
            target: "mirror-viewer",
            type: "LIVE_SUBTITLE_NATIVE_PLAYBACK_UPDATE",
            sessionId: e.sessionId,
            playback: {
              ok: !0,
              mode: "instagram-native",
              streamUrl: t.url,
              streamType: t.type,
              streamInlineManifest: Boolean(t.inlineManifest),
              streamManifestText: (t.inlineManifest && t.manifestText) || "",
              streamManifestBaseUrl: t.manifestBaseUrl || t.url,
              streamManifestSignature: t.manifestSignature || "",
              streamReloadToken:
                e.config?.nativeStreamCandidateReloadToken || "",
              source: t.source || "",
              reason: String(a || "").slice(0, 120),
              delaySeconds: sl(e.config?.syncDelaySeconds),
              maxDelaySeconds: z,
            },
          })
          .catch((e) => {
            console.warn(
              "[service-worker] native stream viewer update skipped:",
              e.message,
            );
          })
      : await chrome.runtime
          .sendMessage({
            target: "mirror-viewer",
            type: "LIVE_SUBTITLE_NATIVE_PLAYBACK_UPDATE",
            sessionId: e.sessionId,
            playback: {
              ok: !0,
              mode: "twitch-hls",
              masterUrl: t.url,
              streamUrl: t.url,
              streamType: "hls",
              streamReloadToken:
                e.config?.nativeStreamCandidateReloadToken || "",
              bridgeMode: "original-page-hls",
              source: t.source || "",
              capturedAtMs: t.capturedAtMs || 0,
              reason: String(a || "").slice(0, 120),
              delaySeconds: il(e.config?.syncDelaySeconds),
              maxDelaySeconds: G,
            },
          })
          .catch((e) => {
            console.warn(
              "[service-worker] Twitch original HLS viewer update skipped:",
              e.message,
            );
          }));
}
async function _r(e = {}, t = {}) {
  let a = await xo(e.sessionId);
  if (
    !a?.mirrorDelayEnabled ||
    !a?.nativeStreamDelayEnabled ||
    !Gi(a, e.sessionId)
  )
    return { ok: !1, error: "native stream session is not active" };
  if (((a = await Hn(a, t)), t.tab?.id && t.tab.id !== a.displayTabId))
    return { ok: !1, error: "native stream refresh tab mismatch" };
  const n = a.config?.nativeStreamDelayKind || "";
  if ("twitch-hls" === n) {
    const t = await Nr(a, {
      reason: e.reason || "viewer-playback-error",
      status: e.status || 0,
      finalUrl:
        e.finalUrl || e.url || a.config?.nativeStreamCandidate?.url || "",
    });
    return {
      ok: !0,
      requested: t,
      throttled: !t,
      reason: e.reason || "viewer-playback-error",
    };
  }
  if ("instagram-native" !== n)
    return { ok: !0, ignored: !0, reason: "unsupported-native-kind" };
  const r = await xr(a, {
    reason: e.reason || "viewer-playback-error",
    status: e.status || 0,
    finalUrl: e.finalUrl || e.url || a.config?.nativeStreamCandidate?.url || "",
  });
  return {
    ok: !0,
    requested: r,
    throttled: !r,
    reason: e.reason || "viewer-playback-error",
  };
}
async function Nr(e = null, t = {}) {
  const a = Number(e?.captureTabId || e?.sourceTabId || e?.tabId);
  if (!Number.isFinite(a) || !e?.sessionId) return !1;
  const n = Date.now();
  if (n - (ut.get(e.sessionId) || 0) < be) return !1;
  ut.set(e.sessionId, n);
  const r = {
    ...e,
    config: {
      ...(e.config || {}),
      nativeStreamCandidateRefreshRequestedAt: new Date(n).toISOString(),
      nativeStreamCandidateRefreshReason: String(
        t.reason || "viewer-playback-error",
      ).slice(0, 120),
      nativeStreamCandidateRefreshStatus: Math.round(Number(t.status) || 0),
    },
  };
  return (
    (at = r),
    await Fo(r),
    await ko(a, {
      type: "LIVE_SUBTITLE_NATIVE_CANDIDATES_REQUEST",
      sessionId: e.sessionId,
      reason: t.reason || "viewer-playback-error",
      status: t.status || 0,
      finalUrl: Ar(t.finalUrl || ""),
    }),
    !0
  );
}
async function Pr(e = {}, t = {}) {
  at = await xo(e.sessionId);
  let a = at;
  if (
    !a?.mirrorDelayEnabled ||
    !a?.nativeStreamDelayEnabled ||
    !Gi(a, e.sessionId)
  )
    return { ok: !1, error: "native stream session is not active" };
  if (
    ((a = await Hn(a, t)), (at = a), t.tab?.id && t.tab.id !== a.displayTabId)
  )
    return { ok: !1, error: "native stream viewer tab mismatch" };
  const n = ti(e.nativeStreamKind || a.config?.nativeStreamDelayKind),
    r = ni(
      e.url,
      n,
      e.baseUrl ||
        a.config?.nativeStreamCandidate?.url ||
        a.config?.pageUrl ||
        "",
    );
  if (!r) return { ok: !1, error: `${ai(n)} resource URL is not allowed` };
  const i = "text" === e.responseType ? "text" : "arraybuffer",
    s = Date.now(),
    o = Vr(e, n, i, r),
    c = o ? qr(a.sessionId, n, r, e.requestHeaders) : "";
  if (o) {
    const e = jr(a.sessionId, c);
    if (e)
      return (
        (e.hitCount = (e.hitCount || 0) + 1),
        (e.lastHitAt = Date.now()),
        {
          ok: !0,
          responseType: i,
          status: e.status || 200,
          finalUrl: e.finalUrl || r,
          contentType: e.contentType || "",
          elapsedMs: Date.now() - s,
          byteLength: e.byteLength || e.buffer?.byteLength || 0,
          base64: ii(e.buffer),
          fromDashBufferPool: !0,
          dashBufferPool: Yr(a.sessionId),
        }
      );
  }
  const l = {
      credentials: "instagram-native" === n ? "include" : "omit",
      redirect: "follow",
      cache: "no-store",
      headers: Or(e.requestHeaders),
    },
    d = await fetch(r, { ...l }),
    u = d.headers.get("content-type") || "",
    m = d.url || r;
  if (!d.ok)
    return (
      Ur(n, d.status) &&
        (await xr(a, {
          status: d.status,
          finalUrl: m,
          reason: "resource-fetch-error",
        }).catch(() => {})),
      {
        ok: !1,
        status: d.status,
        statusText: d.statusText || "",
        finalUrl: m,
        contentType: u,
        elapsedMs: Date.now() - s,
        error: `${ai(n)} fetch failed: HTTP ${d.status}`,
      }
    );
  if ("text" === i) {
    const e = await d.text();
    return {
      ok: !0,
      responseType: i,
      status: d.status,
      finalUrl: m,
      contentType: u,
      elapsedMs: Date.now() - s,
      byteLength: e.length,
      text: e,
    };
  }
  const f = await d.arrayBuffer();
  return (
    o &&
      Fr(r, u, f.byteLength) &&
      Wr(a.sessionId, c, {
        buffer: f,
        byteLength: f.byteLength,
        status: d.status,
        finalUrl: m,
        contentType: u,
        createdAt: Date.now(),
        lastHitAt: 0,
        hitCount: 0,
      }),
    {
      ok: !0,
      responseType: i,
      status: d.status,
      finalUrl: m,
      contentType: u,
      elapsedMs: Date.now() - s,
      byteLength: f.byteLength,
      base64: ii(f),
      fromDashBufferPool: !1,
      dashBufferPool: o ? Yr(a.sessionId) : null,
    }
  );
}
function Ur(e = "", t = 0) {
  return "instagram-native" === e && [401, 403, 404, 410].includes(Number(t));
}
async function xr(e = null, t = {}) {
  const a = e?.sourceTabId || e?.captureTabId || e?.tabId;
  if (!a || !e?.sessionId) return !1;
  const n = Date.now();
  if (n - (ut.get(e.sessionId) || 0) < be) return !1;
  ut.set(e.sessionId, n);
  const r = {
    ...e,
    config: {
      ...(e.config || {}),
      nativeStreamCandidateRefreshRequestedAt: new Date(n).toISOString(),
      nativeStreamCandidateRefreshReason: String(
        t.reason || "resource-fetch-error",
      ).slice(0, 120),
      nativeStreamCandidateRefreshStatus: Math.round(Number(t.status) || 0),
    },
  };
  return (
    (at = r),
    await Fo(r),
    await ko(a, {
      type: "LIVE_SUBTITLE_NATIVE_CANDIDATES_REQUEST",
      sessionId: e.sessionId,
      reason: t.reason || "resource-fetch-error",
      status: t.status || 0,
      finalUrl: Ar(t.finalUrl || ""),
    }),
    !0
  );
}
async function Br(e = {}, t = {}) {
  return Pr({ ...e, nativeStreamKind: "twitch-hls" }, t);
}
function Vr(e = {}, t = "", a = "", n = "") {
  return (
    "instagram-native" === t &&
    "arraybuffer" === a &&
    !!e.dashBufferPool &&
    Kr(n)
  );
}
function Kr(e = "") {
  try {
    const t = new URL(e);
    if ("https:" !== t.protocol) return !1;
    const a = t.hostname.toLowerCase();
    return (
      a.endsWith(".cdninstagram.com") ||
      a.endsWith(".fbcdn.net") ||
      a.endsWith(".fbsbx.com") ||
      a.endsWith(".instagram.com") ||
      a.endsWith(".facebook.com")
    );
  } catch {
    return !1;
  }
}
function qr(e = "", t = "", a = "", n = {}) {
  const r = $r(n.Range || n.range);
  return `${e}:${t}:${a}${r ? `#range=${r}` : ""}`;
}
function Or(e = {}) {
  const t = {},
    a = $r(e.Range || e.range);
  a && /^bytes=\d*-\d*$/i.test(a) && (t.Range = a);
  const n = $r(e.Accept || e.accept);
  return (n && n.length <= 160 && (t.Accept = n), t);
}
function $r(e = "") {
  return String(e || "")
    .replace(/[\r\n]/g, "")
    .trim();
}
function Fr(e = "", t = "", a = 0) {
  if (!a || a > he) return !1;
  const n = String(e || "").toLowerCase(),
    r = String(t || "").toLowerCase();
  return (
    !/\.mpd(?:$|[?#])/.test(n) &&
    !n.includes("dash_manifest") &&
    !(r.includes("dash+xml") || r.includes("xml") || r.includes("json"))
  );
}
function Hr(e = "") {
  const t = String(e || "default");
  let a = dt.get(t);
  return (
    a ||
      ((a = {
        entries: new Map(),
        byteLength: 0,
        createdAt: Date.now(),
        lastPrunedAt: 0,
        hits: 0,
        misses: 0,
      }),
      dt.set(t, a)),
    Gr(t, a),
    a
  );
}
function jr(e = "", t = "") {
  const a = Hr(e),
    n = a.entries.get(t);
  return n
    ? Date.now() - (n.createdAt || 0) > ge
      ? (zr(a, t), (a.misses += 1), null)
      : ((a.hits += 1), n)
    : ((a.misses += 1), null);
}
function Wr(e = "", t = "", a = {}) {
  const n = Hr(e);
  (zr(n, t),
    n.entries.set(t, a),
    (n.byteLength += a.byteLength || a.buffer?.byteLength || 0),
    Gr(String(e || "default"), n));
}
function Gr(e = "", t = null) {
  const a = t || dt.get(String(e || "default"));
  if (!a) return;
  const n = Date.now();
  for (const [e, t] of a.entries) n - (t.createdAt || 0) > ge && zr(a, e);
  for (; a.byteLength > he || a.entries.size > pe; ) {
    const e = Jr(a);
    if (!e) break;
    zr(a, e);
  }
  a.lastPrunedAt = n;
}
function zr(e, t) {
  const a = e.entries.get(t);
  a &&
    (e.entries.delete(t),
    (e.byteLength = Math.max(
      0,
      e.byteLength - (a.byteLength || a.buffer?.byteLength || 0),
    )));
}
function Jr(e) {
  let t = "",
    a = 1 / 0;
  for (const [n, r] of e.entries) {
    const e = r.lastHitAt || r.createdAt || 0;
    e < a && ((a = e), (t = n));
  }
  return t;
}
function Yr(e = "") {
  const t = Hr(e);
  return {
    ttlSeconds: Math.round(60),
    maxBytes: he,
    byteLength: t.byteLength,
    items: t.entries.size,
    hits: t.hits,
    misses: t.misses,
  };
}
function Qr(e = "") {
  e && dt.delete(String(e));
}
async function Xr() {
  if (!chrome.declarativeNetRequest?.updateSessionRules)
    return { ok: !1, error: "缺少 declarativeNetRequest 權限" };
  const e = [ei(fe[0], "||ttvnw.net/"), ei(fe[1], "||hls.live-video.net/")];
  try {
    return (
      await chrome.declarativeNetRequest.updateSessionRules({
        removeRuleIds: fe,
        addRules: e,
      }),
      { ok: !0 }
    );
  } catch (e) {
    return (
      console.warn("[service-worker] Twitch HLS DNR setup failed:", e.message),
      { ok: !1, error: e.message }
    );
  }
}
async function Zr() {
  if (!chrome.declarativeNetRequest?.updateSessionRules)
    return { ok: !1, error: "缺少 declarativeNetRequest 權限" };
  const e = Se.map((e) => ei(e.id, e.urlFilter));
  try {
    return (
      await chrome.declarativeNetRequest.updateSessionRules({
        removeRuleIds: ve,
        addRules: e,
      }),
      { ok: !0 }
    );
  } catch (e) {
    return (
      console.warn(
        "[service-worker] Instagram native stream DNR setup failed:",
        e.message,
      ),
      { ok: !1, error: e.message }
    );
  }
}
function ei(e, t) {
  const a = chrome.runtime.getURL("").replace(/\/$/, "");
  return {
    id: e,
    priority: 1,
    action: {
      type: "modifyHeaders",
      requestHeaders: [{ header: "Origin", operation: "remove" }],
      responseHeaders: [
        { header: "Access-Control-Allow-Origin", operation: "set", value: a },
        {
          header: "Access-Control-Allow-Credentials",
          operation: "set",
          value: "true",
        },
        {
          header: "Access-Control-Allow-Methods",
          operation: "set",
          value: "GET, OPTIONS",
        },
        {
          header: "Access-Control-Allow-Headers",
          operation: "set",
          value: "*",
        },
      ],
    },
    condition: {
      urlFilter: t,
      initiatorDomains: [new URL(a).hostname],
      resourceTypes: ["xmlhttprequest", "media", "other"],
    },
  };
}
function ti(e = "") {
  const t = String(e || "")
    .trim()
    .toLowerCase();
  return "twitch-hls" === t
    ? "twitch-hls"
    : "instagram-native" === t
      ? "instagram-native"
      : "";
}
function ai(e = "") {
  return "twitch-hls" === e
    ? "Twitch HLS"
    : "instagram-native" === e
      ? "Instagram native stream"
      : "Native stream";
}
function ni(e = "", t = "", a = "") {
  const n = ti(t);
  return "twitch-hls" === n
    ? ri(e, a)
    : "instagram-native" === n
      ? Ec(e, a)
      : "";
}
function ri(e = "", t = "") {
  try {
    const a = new URL(String(e || ""), t || void 0);
    if ("https:" !== a.protocol) return "";
    const n = a.hostname.toLowerCase();
    return "usher.ttvnw.net" === n ||
      "hls.live-video.net" === n ||
      n.endsWith(".ttvnw.net") ||
      n.endsWith(".hls.live-video.net")
      ? a.href
      : "";
  } catch {
    return "";
  }
}
function ii(e) {
  const t = new Uint8Array(e);
  let a = "";
  for (let e = 0; e < t.length; e += 32768) {
    const n = t.subarray(e, e + 32768);
    a += String.fromCharCode(...n);
  }
  return btoa(a);
}
async function si(e = {}, t = {}) {
  if (
    ((at = await xo(e.sessionId)),
    !at?.mirrorDelayEnabled || !Gi(at, e.sessionId))
  )
    return { ok: !1, error: "mirror session is not active" };
  if (
    ((at = await Hn(at, t)),
    t.tab?.id && at.displayTabId && t.tab.id !== at.displayTabId)
  )
    return { ok: !1, error: "mirror viewer tab mismatch" };
  const a = at.captureTabId || at.sourceTabId || at.tabId,
    n = await ho(a);
  if (!n?.id || !tc(n.url || ""))
    return {
      ok: !1,
      error: "找不到可擷取的 Twitch 來源分頁，無法切回鏡像延遲。",
    };
  const r = {
      ...(at.config || {}),
      nativeStreamDelayEnabled: !1,
      nativeStreamDelayKind: "",
      syncRole: "twitch-mirror",
      hlsFallbackReason: String(e.reason || "").slice(0, 240),
      fallbackStartedAt: new Date().toISOString(),
    },
    i = {
      ...at,
      captureTabId: n.id,
      sourceTabId: n.id,
      mirrorDelayEnabled: !0,
      nativeStreamDelayEnabled: !1,
      config: r,
    };
  return (
    await Fo(i),
    await ko(n.id, {
      type: "LIVE_SUBTITLE_SOURCE_INIT",
      config: r,
      sessionId: at.sessionId,
    }),
    await xn(at.sessionId, { notify: !1, reason: "hls-fallback" }),
    await Xi(),
    await ss({ tabId: n.id, sessionId: at.sessionId, config: r }),
    await Do(),
    { ok: !0, config: r }
  );
}
async function textamisuNarrateDisplayed(active, segment = {}) {
  const text = String(segment?.translation || "").trim().slice(0, 240);
  if (!text) return { ok: !0, ignored: !0, reason: "empty-translation" };
  const sessionId = String(active.sessionId || "");
  if (!sessionId) return { ok: !1, error: "missing narration session" };
  const previousText = textamisuNarrationContext.get(sessionId) || "";
  const remote = await TextamisuPipeline.session(sessionId);
  const result = await TextamisuApi.tts(remote.sessionId, { text, previousText });
  const played = await chrome.runtime.sendMessage({
    target: "offscreen", type: "PLAY_TTS_AUDIO", sessionId,
    audioBase64: result.audioBase64, mimeType: result.mimeType || "audio/mpeg",
    volume: active.config?.voiceTranslationVolume,
  });
  if (!played?.ok) throw new Error(played?.error || "語音播放準備失敗");
  textamisuNarrationContext.set(sessionId, text);
  return { ok: !0, played: !0 };
}
async function oi(e, t) {
  const a = await Vo(e, t);
  if (!Gi(a, e.sessionId))
    return { ok: !1, retryable: !1, reason: "session-not-active" };
  // This event can originate from a source or mirror display tab. Once the
  // local session is confirmed, narration must not depend on that routing.
  try {
    await textamisuNarrateDisplayed(a, e.segment || {});
  } catch (error) {
    console.warn("[service-worker] narration failed:", error?.message || error);
  }
  const n = t.tab?.id;
  if (a?.syncEnabled && a?.displayTabId && n !== a.displayTabId)
    return { ok: !1, retryable: !1, reason: "not-display-tab" };
  if (n !== a?.displayTabId && n !== a?.captureTabId && n !== a?.tabId)
    return { ok: !1, retryable: !1, reason: "unmanaged-tab" };
  if (!(await ds()))
    return { ok: !1, retryable: !0, reason: "offscreen-unavailable" };
  try {
    const t =
        Array.isArray(e.segments) && e.segments.length
          ? e.segments
          : [e.segment || {}],
      n = await chrome.runtime.sendMessage({
        target: "offscreen",
        type: "DISPLAYED_SUBTITLE_SEGMENT",
        sessionId: a.sessionId,
        segment: e.segment || null,
        segments: t,
      }),
      r = t.map((e) => String(e?.notificationId || "")).filter(Boolean),
      i = new Set(
        Array.isArray(n?.recordedNotificationIds)
          ? n.recordedNotificationIds
              .map((e) => String(e || ""))
              .filter(Boolean)
          : [],
      ),
      s = String(e.segment?.notificationId || r.at(-1) || ""),
      o = String(n?.notificationId || "");
    const delivered = !0 === n?.ok && !0 !== n?.ignored && !0 === n?.recorded && r.length > 0 && r.every((e) => i.has(e)) && o === s;
    if (!delivered) return { ok: !1, retryable: !1 !== n?.retryable, reason: n?.reason || "offscreen-display-not-recorded", error: n?.error || "" };
    return { ok: !0, delivered: !0, reason: n?.duplicate ? "duplicate" : "recorded" };
  } catch (e) {
    return {
      ok: !1,
      retryable: !0,
      reason: "offscreen-relay-failed",
      error: e?.message || String(e),
    };
  }
}
async function ci(e, t) {
  const a = await Vo(e, t);
  if (!Gi(a, e.sessionId)) return;
  const n = t.tab?.id;
  (n === a?.captureTabId || n === a?.displayTabId || n === a?.tabId) &&
    (await ds()) &&
    (await chrome.runtime
      .sendMessage({
        target: "offscreen",
        type: "APPEND_EVENT_LOG",
        sessionId: a.sessionId,
        event: e.event || null,
        events: e.events || null,
      })
      .catch((e) => {
        console.warn(
          "[service-worker] client event log relay skipped:",
          e.message,
        );
      }));
}
async function li(e, t, a = {}, n = "info") {
  const r = String(e || "");
  if (!r || !t) return !1;
  try {
    if (!(await ds())) return !1;
    const e = await chrome.runtime.sendMessage({
      target: "offscreen",
      type: "APPEND_EVENT_LOG",
      sessionId: r,
      event: {
        type: t,
        source: "service-worker",
        level: n,
        data: { ...a, sessionId: r },
      },
    });
    return !1 !== e?.ok;
  } catch (e) {
    return (
      console.warn(`[service-worker] ${t} event log skipped:`, e?.message || e),
      !1
    );
  }
}
async function di(e, t) {
  const a = await Vo(e, t);
  if (!Gi(a, e.sessionId))
    return { ok: !0, ignored: !0, reason: "stale-session" };
  const n = t.tab?.id;
  if (
    n !== a?.captureTabId &&
    n !== a?.sourceTabId &&
    n !== a?.displayTabId &&
    n !== a?.tabId
  )
    return { ok: !0, ignored: !0, reason: "unmanaged-tab" };
  const r = Ra(a?.config || {}),
    i = String(e.segment?.mediaContextKey || "").trim(),
    s = El(t.tab?.url || "");
  if (r && (!i || i !== r || (s && s !== r))) {
    const t = i ? "media-context-mismatch" : "missing-media-context";
    return (
      await li(
        a.sessionId,
        "mse.audio_buffer.media_context_rejected",
        {
          reason: t,
          expectedMediaContextKey: r,
          segmentMediaContextKey: i,
          senderMediaContextKey: s,
          senderTabId: n,
          sequence: e.segment?.sequence ?? null,
        },
        "warn",
      ),
      { ok: !0, ignored: !0, reason: t }
    );
  }
  if (!(await ds())) return { ok: !0, ignored: !0, reason: "no-offscreen" };
  const o = await chrome.runtime
    .sendMessage({
      target: "offscreen",
      type: "MSE_AUDIO_SEGMENT",
      sessionId: a.sessionId,
      segment: e.segment || null,
    })
    .catch((e) => ({ ok: !1, error: e?.message || "offscreen relay failed" }));
  return o?.ignored && "duplicate-segment" === o.reason
    ? {
        ok: !0,
        duplicate: !0,
        sequence: o.sequence ?? e.segment?.sequence ?? null,
      }
    : !o?.ok || o.ignored
      ? {
          ok: Boolean(o?.ok),
          ignored: !0,
          reason: o?.reason || o?.error || "offscreen-not-ready",
        }
      : {
          ok: !0,
          queued: Boolean(o.queued),
          sequence: o.sequence ?? e.segment?.sequence ?? null,
          leadSeconds: o.leadSeconds ?? null,
          maxLeadSeconds: o.maxLeadSeconds ?? null,
        };
}
async function ui(e, t) {
  const a = (e) => ({ ok: !1, reason: e });
  if (
    t?.id !== chrome.runtime.id ||
    String(t.url || "").split(/[?#]/)[0] !==
      chrome.runtime.getURL("offscreen.html")
  )
    return a("prefetch-caller-rejected");
  const n = await Vo(e, t);
  if (
    !Gi(n, e.sessionId) ||
    !0 !== n.config?.audioPrefetchEnabled ||
    n.config?.sourceIsLiveStream ||
    !n.config?.mseAudioBufferEnabled
  )
    return a("prefetch-disabled");
  const r = Ra(n.config),
    i = /^youtube:([\w-]{11})$/.exec(r);
  if (!r || r !== e.mediaKey) return a("prefetch-platform-unavailable");
  const s = n.captureTabId || n.sourceTabId || n.tabId,
    o = await Us(s);
  if (o?.mediaContextKey !== r || xc(o)) return a("prefetch-media-changed");
  if (!i) {
    let n;
    try {
      n = new URL(o.href).hostname;
    } catch {
      return a("prefetch-platform-unavailable");
    }
    if (!/(^|\.)missav\.(ai|ws)$/.test(n))
      return a("prefetch-platform-unavailable");
    await us({
      target: { tabId: s },
      world: "MAIN",
      files: ["prefetch-hls-discovery.js", "prefetch-hls-page-fetch.js"],
    });
    const [i] = await us({
        target: { tabId: s },
        world: "MAIN",
        func: (e) => globalThis.SubruuHlsDiscovery.discoverBoundHls(e),
        args: [o.href],
      }),
      c = i?.result,
      l = await Vo(e, t);
    return Gi(l, e.sessionId) && Ra(l.config) === r
      ? !c?.ok ||
        !c.mediaBound ||
        !1 !== c.live ||
        !Array.isArray(c.fragments) ||
        c.fragments.length > 128 ||
        !Number.isFinite(c.durationSeconds) ||
        c.durationSeconds <= 0
        ? a("prefetch-hls-source-unavailable")
        : { ...c, mediaKey: r }
      : a("prefetch-session-changed");
  }
  if (
    !(await chrome.permissions.contains({
      origins: ["https://*.googlevideo.com/*"],
    }))
  )
    return a("prefetch-permission-missing");
  await us({
    target: { tabId: s },
    world: "MAIN",
    files: ["prefetch-source-discovery.js"],
  });
  const [c] = await us({
      target: { tabId: s },
      world: "MAIN",
      func: (e) => globalThis.SubruuPrefetchDiscovery.discoverYouTubeAudio(e),
      args: [i[1]],
    }),
    l = await Vo(e, t);
  if (
    !Gi(l, e.sessionId) ||
    Ra(l.config) !== r ||
    !0 !== l.config?.audioPrefetchEnabled
  )
    return a("prefetch-session-changed");
  const d = c?.result;
  if (!d?.ok)
    return a(
      new Set([
        "video-id-invalid",
        "video-context-changed",
        "player-response-unavailable",
        "player-response-stale",
        "live-not-supported",
        "media-timeline-unverified",
        "no-direct-audio-source",
        "audio-track-unverified",
        "sabr-source-unobserved",
        "sabr-client-unavailable",
        "sabr-format-unavailable",
      ]).has(d?.reason)
        ? d.reason
        : "prefetch-source-unavailable",
    );
  if (
    d.videoId !== i[1] ||
    !Number.isFinite(d.durationSeconds) ||
    d.durationSeconds <= 0
  )
    return a("prefetch-source-unverified");
  const u = d.candidates?.[0];
  let m;
  try {
    m = new URL("sabr" === d.kind ? d.url : u?.url);
  } catch {
    return a("prefetch-source-invalid");
  }
  if (
    "https:" !== m.protocol ||
    !m.hostname.endsWith(".googlevideo.com") ||
    m.username ||
    m.password ||
    m.port
  )
    return a("prefetch-source-invalid");
  if ("sabr" === d.kind) {
    const e = d.formats?.[0];
    return "string" != typeof d.ustreamerConfig ||
      d.ustreamerConfig.length > 65536 ||
      !e ||
      !Number.isInteger(e.itag) ||
      !/^audio\/(webm|mp4)(;|$)/i.test(e.mimeType || "") ||
      !/^\d+$/.test(String(e.lastModified || "")) ||
      "string" != typeof d.clientInfo?.clientVersion ||
      d.clientInfo.clientVersion.length > 100
      ? a("prefetch-source-invalid")
      : {
          ok: !0,
          kind: "sabr",
          videoId: d.videoId,
          mediaKey: r,
          durationSeconds: d.durationSeconds,
          url: m.href,
          ustreamerConfig: d.ustreamerConfig,
          clientInfo: d.clientInfo,
          formats: [e],
          source: d.source,
        };
  }
  return {
    ok: !0,
    mediaKey: r,
    durationSeconds: d.durationSeconds,
    url: m.href,
    trackId: u.audioTrackId,
    source: d.source,
  };
}
function mi(e) {
  return (
    e?.id === chrome.runtime.id &&
    String(e.url || "").split(/[?#]/)[0] ===
      chrome.runtime.getURL("offscreen.html")
  );
}
async function fi(e, t) {
  const a = (e) => ({ ok: !1, reason: e });
  if (!mi(t)) return a("prefetch-caller-rejected");
  const n = await Vo(e, t);
  if (
    !Gi(n, e.sessionId) ||
    !0 !== n.config?.audioPrefetchEnabled ||
    n.config?.sourceIsLiveStream ||
    Ra(n.config) !== e.mediaKey
  )
    return a("prefetch-session-changed");
  if (
    "string" != typeof e.requestId ||
    !e.requestId ||
    e.requestId.length > 150 ||
    r.has(e.requestId) ||
    [...r.values()].filter((t) => t.sessionId === e.sessionId).length >= 2 ||
    "string" != typeof e.url ||
    e.url.length > 8192
  )
    return a("prefetch-hls-page-busy");
  const i = n.captureTabId || n.sourceTabId || n.tabId,
    s = {
      sessionId: n.sessionId,
      tabId: i,
      mediaKey: e.mediaKey,
      cancelled: !1,
    };
  r.set(e.requestId, s);
  try {
    const n = await Us(i);
    if (s.cancelled) return a("prefetch-cancelled");
    if (n?.mediaContextKey !== e.mediaKey || xc(n))
      return a("prefetch-media-changed");
    const [r] = await us(
        {
          target: { tabId: i },
          world: "MAIN",
          func: async (e) => {
            try {
              return await globalThis.SubruuHlsPageFetch.readResource(e);
            } catch (e) {
              return {
                ok: !1,
                reason: /^prefetch-[a-z-]+$/.test(e?.code || "")
                  ? e.code
                  : "prefetch-hls-page-failed",
              };
            }
          },
          args: [
            {
              requestId: e.requestId,
              sessionId: e.sessionId,
              pageUrl: n.href,
              url: e.url,
              range: e.range || null,
              maxBytes: e.maxBytes,
            },
          ],
        },
        15e3,
        "HLS prefetch resource",
      ),
      o = await Vo(e, t);
    return Gi(o, e.sessionId) &&
      !0 === o.config?.audioPrefetchEnabled &&
      Ra(o.config) === e.mediaKey
      ? r?.result || a("prefetch-hls-page-failed")
      : a("prefetch-session-changed");
  } catch {
    return a("prefetch-hls-page-failed");
  } finally {
    (await us(
      {
        target: { tabId: i },
        world: "MAIN",
        func: (e, t) => globalThis.SubruuHlsPageFetch?.cancel(e, t),
        args: [e.requestId, e.sessionId],
      },
      2e3,
      "HLS prefetch cleanup",
    ).catch(() => {}),
      r.get(e.requestId) === s && r.delete(e.requestId));
  }
}
async function gi(e, t) {
  if (!mi(t)) return { ok: !1 };
  const a = r.get(e.requestId);
  if (!a || a.sessionId !== e.sessionId || a.mediaKey !== e.mediaKey)
    return { ok: !0, cancelled: !1 };
  a.cancelled = !0;
  const n = await us(
    {
      target: { tabId: a.tabId },
      world: "MAIN",
      func: (e, t) => globalThis.SubruuHlsPageFetch?.cancel(e, t),
      args: [e.requestId, e.sessionId],
    },
    2e3,
    "HLS prefetch cancel",
  ).catch(() => null);
  return {
    ok: !0,
    cancelled: !0,
    deliveryFenced: !0,
    nativeAcknowledged: Array.isArray(n),
  };
}
async function hi(e, t) {
  const a = await Vo(e, t);
  if (!Gi(a, e.sessionId))
    return { ok: !0, ignored: !0, reason: "stale-session" };
  const n = Ra(a?.config || {}),
    r = El(t.tab?.url || ""),
    i = a?.displayTabId || a?.tabId;
  if (a?.singleTabMediaSync && t.tab?.id === i && n && r && r !== n)
    return (
      await li(a.sessionId, "mse.audio_buffer.refresh_deferred", {
        reason: "single-tab-media-change-pending",
        expectedMediaContextKey: n,
        senderMediaContextKey: r,
        senderTabId: t.tab?.id ?? null,
      }),
      { ok: !0, ignored: !0, reason: "single-tab-media-change-pending" }
    );
  const s = a?.sourceTabId || a?.captureTabId || a?.tabId || t.tab?.id,
    o = await ho(s);
  return o?.id
    ? ((await ds()) ||
        (await Xi(),
        await ss({
          tabId: o.id,
          sessionId: a.sessionId,
          config: a.config || {},
        })),
      await Eo(o.id, a.config || {}, a.sessionId, {
        tab: o,
        retryPostedSegments: !0 === e.retryPostedSegments,
        reason: e.reason || "content-request",
      }),
      { ok: !0 })
    : { ok: !1, error: "source tab unavailable" };
}
async function pi(e, t) {
  const a = await Vo(e, t);
  if (!Gi(a, e.sessionId))
    return { ok: !0, ignored: !0, reason: "stale-session" };
  const n = a?.sourceTabId || a?.captureTabId || a?.tabId,
    r = await ho(n);
  return r?.id
    ? Lo(
        r.id,
        {
          type: "LIVE_SUBTITLE_MSE_AUDIO_REPOST",
          sessionId: a.sessionId,
          mediaStartTime: Number.isFinite(Number(e.mediaStartTime))
            ? Number(e.mediaStartTime)
            : null,
          mediaEndTime: Number.isFinite(Number(e.mediaEndTime))
            ? Number(e.mediaEndTime)
            : null,
          reason: e.reason || "mse-decode-partial",
          maxAttempt: Math.max(1, Math.round(Number(e.maxAttempt || 1) || 1)),
        },
        "MSE audio repost failed",
        { timeoutMs: 1200 },
      )
    : { ok: !1, error: "source tab unavailable" };
}
async function bi(e, t) {
  const a = await Vo(e, t);
  if (!Gi(a, e.sessionId))
    return { ok: !0, ignored: !0, reason: "stale-session" };
  const n = t.tab?.id;
  if (n && n !== a?.captureTabId && n !== a?.displayTabId && n !== a?.tabId)
    return { ok: !0, ignored: !0, reason: "unmanaged-tab" };
  if (!(await ds())) return { ok: !0, ignored: !0, reason: "no-offscreen" };
  const r = await chrome.runtime
    .sendMessage({
      target: "offscreen",
      type: "PANEL_USAGE_DELTA",
      sessionId: a.sessionId,
      usage: e.usage || null,
    })
    .catch((e) => ({ ok: !1, error: e?.message || "offscreen relay failed" }));
  return !r?.ok || r.ignored
    ? {
        ok: Boolean(r?.ok),
        ignored: !0,
        reason: r?.reason || r?.error || "offscreen-not-ready",
      }
    : r;
}
async function yi(e, t) {
  const a = await Vo(e, t);
  if (!a) return { ok: !0, ignored: !0, reason: "no-session" };
  const n = t.tab?.id;
  return n && n !== a.captureTabId && n !== a.displayTabId && n !== a.tabId
    ? { ok: !0, ignored: !0, reason: "unmanaged-tab" }
    : a.syncEnabled &&
        a.displayTabId &&
        n === a.captureTabId &&
        n !== a.displayTabId
      ? { ok: !0, ignored: !0, reason: "source-tab-in-sync-mode" }
      : (await ds())
        ? (await chrome.runtime
            .sendMessage({
              target: "offscreen",
              type: "SUBTITLE_DISPLAY_METRICS",
              sessionId: a.sessionId,
              metrics: e.metrics || null,
            })
            .catch((e) => ({
              ok: !1,
              error: e?.message || "offscreen relay failed",
            }))) || { ok: !1 }
        : { ok: !0, ignored: !0, reason: "no-offscreen" };
}
async function wi(e, t) {
  let a = await Vo(e, t);
  const n = t.tab?.id === a?.captureTabId,
    r = t.tab?.id === a?.displayTabId,
    i = Boolean(a?.syncEnabled && n),
    s = Boolean(a?.syncEnabled && r),
    o = Boolean(a?.singleTabMediaSync && n),
    c = Boolean(a?.hybridSubtitleCacheMode && n);
  if (!(i || s || o || c)) return;
  let l = e.timing || null;
  if (n && a?.syncEnabled && l) {
    const e = String(
        a.config?.sourceMediaContextKey ||
          El(a.config?.canonicalPageUrl || a.config?.pageUrl || "") ||
          "",
      ).trim(),
      t = String(
        l.mediaContextKey ||
          El(l.canonicalMediaUrl || l.href || l.pageUrl || "") ||
          "",
      ).trim();
    if (e && t && e !== t) return;
  }
  if (
    !(
      a?.cachedSubtitleMode ||
      a?.hybridSubtitleCacheMode ||
      a?.config?.walletCacheManaged
    ) ||
    (await Ii(a, l, t), !a?.cachedSubtitleMode)
  ) {
    if (
      (n && a?.syncEnabled && !0 === l?.isLiveStream && (a = await vi(a, l)),
      n && "twitch-hls" === a?.config?.nativeStreamDelayKind && l)
    ) {
      l = { ...l, sourceProgramClock: _l(a, l) };
      const e = Number(l.actualDelaySeconds);
      (!Number.isFinite(e) || e < 0 || e > 86400) &&
        (l.actualDelaySeconds = null);
    }
    if (await ds()) {
      const e =
        s && !n ? "VIEWER_MEDIA_TIMING_UPDATE" : "SOURCE_MEDIA_TIMING_UPDATE";
      await chrome.runtime.sendMessage({
        target: "offscreen",
        type: e,
        sessionId: a.sessionId,
        timing: l,
      });
    }
    (n &&
      a.syncEnabled &&
      a.displayTabId &&
      !a.mirrorDelayEnabled &&
      (await ko(a.displayTabId, {
        type: "LIVE_SUBTITLE_SOURCE_TIMING",
        sessionId: a.sessionId,
        timing: l,
      })),
      aa(a) &&
        (await ya(a, l).catch((e) => {
          console.warn(
            "[service-worker] live subtitle share timing sync skipped:",
            e.message,
          );
        })));
  }
}
async function Si(e = {}, t = {}) {
  const a = await Vo(e, t);
  if (
    !aa(a) ||
    "program-date-time" !== a.liveShared?.timelineMode ||
    t.tab?.id !== a.displayTabId
  )
    return { ok: !0, ignored: !0, reason: "shared-live-timeline-inactive" };
  const n = dl(e.observedAtMs) || Date.now(),
    r = dl(e.sourceWallTimeMs),
    i = dl(e.viewerSourceWallTimeMs),
    s = dl(e.liveEdgeSourceWallTimeMs),
    o = ta(a.sessionId),
    c = dl(o.latestSourceTiming?.actualDelaySeconds),
    l = null !== s && null !== c ? Math.round(s - 1e3 * Math.max(0, c)) : r;
  if (
    null === l ||
    Math.abs(Date.now() - n) > 15e3 ||
    Math.abs(Date.now() - l) > 6e5
  )
    return { ok: !1, ignored: !0, reason: "invalid-program-date-time-anchor" };
  const d = "program-date-time" === o.standardTimelineAnchor?.confidence;
  return (
    (o.standardTimelineAnchor = {
      sourceWallTimeMs: Math.round(l),
      viewerSourceWallTimeMs: null === i ? null : Math.round(i),
      observedAtMs: Math.round(n),
      mediaTimeSeconds: dl(e.mediaTimeSeconds),
      confidence: "program-date-time",
      updatedAtMs: Date.now(),
    }),
    d ||
      (await li(a.sessionId, "subtitle.live_share.timeline_ready", {
        streamId: a.liveShared.streamId,
        timelineMode: "program-date-time",
        delayMs: Math.max(0, Math.round(Number(e.delayMs || 0))),
        sourceActualDelayMs: null === c ? null : Math.round(1e3 * c),
        role: a.liveShared.role || "",
      }).catch(() => {})),
    "producer" === a.liveShared.role &&
      ha(a.sessionId).catch((e) => {
        console.warn(
          "[service-worker] shared live publish after timeline anchor failed:",
          e.message,
        );
      }),
    { ok: !0, confidence: "program-date-time" }
  );
}
async function vi(e = {}, t = null) {
  if (
    !e?.sessionId ||
    !0 !== t?.isLiveStream ||
    !0 === e.config?.runtimeLiveClassificationRecorded
  )
    return e;
  const a = dl(
      e.config?.effectiveSyncDelaySeconds ?? e.config?.syncDelaySeconds,
    ),
    n = String(e.config?.syncDelaySafetyPolicy || "")
      .toLowerCase()
      .trim(),
    r = Oc(e.config) ? B : "lightning" === n ? _ : x,
    i = null !== a && a < r,
    s = {
      ...e,
      config: {
        ...(e.config || {}),
        sourceIsLiveStream: !0,
        sourceLiveClassification: "live",
        sourceLiveEvidence: "runtime-media-timing",
        runtimeLiveClassificationRecorded: !0,
        nextRecommendedSyncDelaySeconds: i
          ? r
          : (e.config?.nextRecommendedSyncDelaySeconds ?? null),
      },
    };
  return (
    await Fo(s),
    await li(
      s.sessionId,
      i
        ? "sync.delay_undershoot_detected"
        : "sync.runtime_live_classification_confirmed",
      {
        startupClassification: e.config?.sourceLiveClassification || "unknown",
        startupEvidence: e.config?.sourceLiveEvidence || "",
        configuredDelaySeconds: a,
        recommendedDelaySeconds: i ? r : null,
        syncDelaySafetyPolicy: n,
        currentMediaTime: dl(t?.currentTime),
        currentLiveEdgeSeconds: dl(t?.liveEdgeSeconds ?? t?.seekableEndSeconds),
      },
      i ? "warn" : "info",
    ),
    i &&
      (await Bn(
        {
          kind: "status",
          status: "delay-undershoot",
          message: `已確認為直播；本場延遲偏短，下次建議至少 ${r} 秒`,
          sessionId: s.sessionId,
          context: { sessionId: s.sessionId },
        },
        s.sessionId,
      ).catch(() => {})),
    s
  );
}
async function Ii(e = {}, t = null, a = {}) {
  if (e?.config?.walletCacheManaged) {
    if (!t || !Ti(e, a)) return;
    const n =
      t.mediaContextKey || El(t.canonicalMediaUrl || t.href || t.pageUrl || "");
    if (n && n !== Ra(e.config)) return;
    const r = e.config,
      i = () =>
        nt.some(
          (t) =>
            t.sessionId === e.sessionId &&
            t.config?.walletBillingUid === r.walletBillingUid &&
            Ra(t.config) === Ra(r) &&
            t.config.sourceLang === r.sourceLang &&
            t.config.targetLang === r.targetLang &&
            t.config.backendUrl === r.backendUrl,
        );
    if (!i()) return;
    const s = ht.get(e.sessionId);
    if (
      s &&
      !s.state.closed &&
      s.owner.uid === r.walletBillingUid &&
      s.owner.videoKey === Ra(r) &&
      s.owner.sourceLanguage === (r.sourceLang || "auto") &&
      s.owner.targetLanguage === (r.targetLang || "zh")
    )
      return !0 === t.isLiveStream || Na(r)
        ? void (await s.close())
        : void s.observe(t);
    const o = await Zt();
    if (!i() || o?.uid !== r.walletBillingUid || !0 === t.isLiveStream || Na(r))
      return;
    const c = await Ta(e.config, o);
    return void (i() && c.observe(t));
  }
  const n =
    (Array.isArray(nt)
      ? nt.find((t) => t?.sessionId === e?.sessionId)
      : null) || e;
  if ((!n?.cachedSubtitleMode && !n?.hybridSubtitleCacheMode) || !t) return;
  if (!Ti(n, a)) return;
  const r = { ...(n.cachedSubtitle || {}) },
    i = dl(t.currentTime),
    s = dl(t.wallTimeMs ?? Date.now()),
    o = dl(t.playbackRate ?? 1),
    c = !0 === t.paused || null === o || o <= 0;
  if (null === i || i < 0 || null === s) return;
  const l = dl(r.lastMediaTime),
    d = dl(r.lastWallTimeMs);
  if (null !== d && s <= d) return;
  let u = 0;
  if (
    !c &&
    !t.seeking &&
    !0 !== r.lastPaused &&
    !0 !== r.lastSeeking &&
    null !== l &&
    null !== d &&
    d > 0
  ) {
    const e = 1e3 * (i - l),
      t = s - d,
      a = Math.min(Ue, Math.max(1e3, t * o + 1200));
    e > 0 &&
      t > 0 &&
      t <= Pe &&
      e <= a &&
      (u = Ei(r, 1e3 * i - Math.min(e, t * o + 500), 1e3 * i));
  }
  ((r.lastMediaTime = i),
    (r.lastWallTimeMs = s),
    (r.lastPaused = c),
    (r.lastSeeking = !0 === t.seeking),
    u > 0 &&
      (r.totalReadMs = Math.max(
        0,
        Math.round(Number(r.totalReadMs || 0) + u),
      )));
  const m = Mi(n, r),
    f = Date.now();
  u > 0 &&
  r.totalReadMs > Number(r.lastSentTotalReadMs || 0) &&
  f - Number(r.lastHeartbeatAtMs || 0) >= Ne
    ? await Ci(m).catch((e) => {
        console.warn(
          "[service-worker] cached subtitle usage heartbeat skipped:",
          e.message,
        );
      })
    : u > 0 &&
      f - Number(r.lastPersistedAtMs || 0) >= Ne &&
      ((r.lastPersistedAtMs = f), await Fo(Mi(m, r)));
}
function Ti(e = {}, t = {}) {
  const a = Number(t?.tab?.id),
    n = e?.displayTabId,
    r = Number(n);
  if (e?.syncEnabled && (null == n || !Number.isFinite(r) || r <= 0)) return !1;
  const i = Number(e?.displayTabId ?? e?.tabId);
  return !Number.isFinite(a) || !Number.isFinite(i) || a === i;
}
function Mi(e = {}, t = {}, a = {}) {
  const n = String(e?.sessionId || ""),
    r = {
      ...((n && Array.isArray(nt)
        ? nt.find((e) => e?.sessionId === n)
        : null) || e),
      ...a,
      cachedSubtitle: t,
    };
  return (Ho(r), r);
}
function ki(e = {}, t = null) {
  const a = Number(t);
  if (!Number.isFinite(a)) return !1;
  if (!0 !== e.coverageReliable) return !1;
  const n = Array.isArray(e.coverageRanges) ? e.coverageRanges : [];
  if (!n.length) return !1;
  const r = 1e3 * a;
  return n.some((e) => {
    const t = Number(e.startMs ?? e.start_ms ?? 0),
      a = Number(e.endMs ?? e.end_ms ?? 0);
    return (
      Number.isFinite(t) &&
      Number.isFinite(a) &&
      a > t &&
      r >= t - 500 &&
      r <= a + 500
    );
  });
}
function Ei(e = {}, t, a) {
  if (
    !0 !== e.coverageReliable ||
    !Number.isFinite(t) ||
    !Number.isFinite(a) ||
    t < 0 ||
    a <= t
  )
    return 0;
  const n = (Array.isArray(e.coverageRanges) ? e.coverageRanges : [])
    .map((e) => ({
      start: dl(e?.startMs ?? e?.start_ms),
      end: dl(e?.endMs ?? e?.end_ms),
    }))
    .filter(
      (e) =>
        null !== e.start &&
        null !== e.end &&
        e.end > e.start &&
        e.end > t &&
        e.start < a,
    )
    .map((e) => ({ start: Math.max(t, e.start), end: Math.min(a, e.end) }))
    .sort((e, t) => e.start - t.start);
  let r = 0,
    i = t;
  for (const e of n)
    ((r += Math.max(0, e.end - Math.max(i, e.start))),
      (i = Math.max(i, e.end)));
  return Math.round(r);
}
async function Ci(e = {}, t = {}) {
  const a = String(e?.sessionId || "");
  if (!a) return !1;
  const n = (gt.get(a) || Promise.resolve())
    .catch(() => {})
    .then(() =>
      Li(
        (Array.isArray(nt) ? nt.find((e) => e?.sessionId === a) : null) || e,
        t,
      ),
    );
  gt.set(a, n);
  try {
    return await n;
  } finally {
    gt.get(a) === n && gt.delete(a);
  }
}
async function Li(e = {}, t = {}) {
  if (e?.config?.walletCacheManaged) {
    const a = await Zt();
    if (a?.uid !== e.config.walletBillingUid) return !1;
    const n = await Ta(e.config, a);
    return (
      t.final ? (await n.close(), ht.delete(e.sessionId)) : await n.pump(!0),
      !0
    );
  }
  if ((!e?.cachedSubtitleMode && !e?.hybridSubtitleCacheMode) || !e.sessionId)
    return !1;
  const a = await Zt();
  if (!a?.idToken) return !1;
  const n = { ...(e.cachedSubtitle || {}) },
    r = Math.max(0, Math.round(Number(n.totalReadMs || 0)));
  if (!t.final && r <= Number(n.lastSentTotalReadMs || 0)) return !1;
  if (!t.final && Date.now() - Number(n.lastHeartbeatAtMs || 0) < Ne) return !1;
  n.heartbeatSequence =
    Math.max(0, Math.round(Number(n.heartbeatSequence || 0))) + 1;
  const i = {
      clientUsageId: `${e.sessionId}:subtitle-cache:${n.heartbeatSequence}`,
      clientUsageSequence: n.heartbeatSequence,
      cachedSubtitle: {
        totalReadMs: r,
        trackId: n.trackId || "",
        videoKey: n.videoKey || "",
      },
    },
    s = await ea(
      e.config?.backendUrl,
      `/caption-sessions/${e.sessionId}/usage`,
      {
        method: "POST",
        headers: Xt(a),
        body: JSON.stringify({
          uid: a.uid,
          idToken: a.idToken,
          usage: i,
          final: Boolean(t.final),
        }),
        timeoutMs: Re,
        label: "cached subtitle usage",
      },
    ),
    o = Array.isArray(nt) ? nt.find((t) => t?.sessionId === e.sessionId) : null,
    c = { ...(o?.cachedSubtitle || n) };
  ((c.heartbeatSequence = Math.max(
    Number(c.heartbeatSequence || 0),
    Number(n.heartbeatSequence || 0),
  )),
    (c.lastSentTotalReadMs = Math.max(Number(c.lastSentTotalReadMs || 0), r)),
    (c.lastHeartbeatAtMs = Date.now()));
  const l = Mi(o || e, c, {
    lastCachedSubtitleBilling:
      s?.billing ||
      o?.lastCachedSubtitleBilling ||
      e.lastCachedSubtitleBilling ||
      null,
  });
  await Fo(l);
  const d = l.displayTabId || l.tabId;
  return (
    d &&
      s?.billing &&
      (await ko(d, {
        type: "LIVE_SUBTITLE_EVENT",
        sessionId: l.sessionId,
        event: { kind: "usage", usage: s.billing },
      })),
    await li(l.sessionId, "subtitle.cache.usage_heartbeat", {
      totalReadMs: r,
      cachedSubtitleReadMs: Number(s?.billing?.cachedSubtitleReadMs || 0),
      cachedSubtitleReadSeconds: Number(
        s?.billing?.cachedSubtitleReadSeconds || 0,
      ),
      cachedSubtitleCostUSD: Number(s?.billing?.cachedSubtitleCostUSD || 0),
      deltaCredits: Number(s?.deltaCredits || 0),
      trackId: n.trackId || "",
      videoKey: n.videoKey || "",
    }),
    !0
  );
}
async function Ai(e = {}, t = {}) {
  if (
    !(
      e?.cachedSubtitleMode ||
      e?.hybridSubtitleCacheMode ||
      e?.config?.walletCacheManaged
    ) ||
    !e.sessionId
  )
    return;
  try {
    await Ci(e, { final: !0 });
  } catch (e) {
    console.warn(
      "[service-worker] cached subtitle final usage skipped:",
      e.message,
    );
  }
  if (!1 === t.endRemote) return;
  const a = await Zt();
  if (!a?.idToken) return;
  const n = "sql-wallet-v1" === e.config?.walletBillingProtocol;
  if (!n || a.uid === e.config.walletBillingUid)
    try {
      await ea(
        e.config?.backendUrl,
        `/${n ? "caption-wallet-sessions" : "caption-sessions"}/${e.sessionId}/end`,
        {
          method: "POST",
          headers: Xt(a),
          body: JSON.stringify({
            uid: a.uid,
            idToken: a.idToken,
            durationMs: e.startedAt
              ? Date.now() - Number(e.startedAt || Date.now())
              : null,
            reason: t.reason || "cached-subtitle-stop",
          }),
          timeoutMs: Re,
          label: "cached subtitle session end",
        },
      );
    } catch (e) {
      console.warn(
        "[service-worker] cached subtitle session end skipped:",
        e.message,
      );
    }
}
async function Di(e, t) {
  const a = await Vo(e, t);
  if (((at = a), !a?.syncEnabled))
    return { ok: !1, error: "sync session is not active" };
  if (t.tab?.id !== a.displayTabId)
    return {
      ok: !1,
      error: "startup viewer anchor ignored from non-display tab",
    };
  const n = Number(e.targetMediaTime);
  if (!Number.isFinite(n) || n < 0)
    return { ok: !1, error: "startup viewer anchor is missing" };
  const r = await chrome.scripting.executeScript({
      target: { tabId: t.tab.id },
      world: "MAIN",
      args: [n],
      func: async (e) => {
        const t = document.getElementById("movie_player"),
          a =
            document.querySelector("video.html5-main-video") ||
            document.querySelector("video");
        if (!a) return { ok: !1, error: "viewer video not found" };
        const n = () => {
          let e = null;
          try {
            e =
              "function" == typeof t?.getProgressState
                ? t.getProgressState()
                : null;
          } catch {
            e = null;
          }
          const n = a.seekable,
            r = n?.length || 0,
            i = (e, t) => {
              try {
                const a = n?.[e]?.(t);
                return Number.isFinite(a) ? a : null;
              } catch {
                return null;
              }
            };
          return {
            current: Number.isFinite(Number(e?.current))
              ? Number(e.current)
              : Number.isFinite(a.currentTime)
                ? a.currentTime
                : null,
            duration: Number.isFinite(Number(e?.duration))
              ? Number(e.duration)
              : Number.isFinite(a.duration)
                ? a.duration
                : null,
            loaded: Number.isFinite(Number(e?.loaded))
              ? Number(e.loaded)
              : null,
            seekableStart: r ? i("start", 0) : null,
            seekableEnd: r ? i("end", r - 1) : null,
            playerState:
              "function" == typeof t?.getPlayerState
                ? t.getPlayerState()
                : null,
          };
        };
        let r = null;
        try {
          r = "function" == typeof t?.getVideoData ? t.getVideoData() : null;
        } catch {
          r = null;
        }
        const i = [r?.isLiveDvrEnabled, r?.isDvrEnabled].find(
            (e) => "boolean" == typeof e,
          ),
          s = "boolean" == typeof i,
          o = !0 === i,
          c = "function" == typeof t?.seekBy,
          l = Number(a.currentTime),
          d = n();
        let u = "html5-media";
        try {
          ("function" == typeof t?.playVideo ? t.playVideo() : await a.play(),
            await new Promise((e) => setTimeout(e, 180)));
          const r = Number(a.currentTime),
            i = n(),
            m = Number.isFinite(r) ? Math.max(0, r - e) : 0;
          let f = 0,
            g = null,
            h = null,
            p = null,
            b = !1;
          const y = 0.9;
          for (let n = 1; n <= 2 && !b; n += 1) {
            ((f = n),
              1 === n && c && m > y
                ? (t.seekBy(-m), (u = "youtube-player-seekBy-after-play"))
                : "function" == typeof t?.seekTo
                  ? (t.seekTo(e, !0), (u = "youtube-player-api-after-play"))
                  : (a.currentTime = e));
            const r = Date.now();
            (await new Promise((e) => setTimeout(e, 120)),
              (g = Number(a.currentTime)));
            let i = 0;
            for (let t = 0; t < 12; t += 1) {
              await new Promise((e) => setTimeout(e, 50));
              const t = Date.now();
              h = Number(a.currentTime);
              const n = e + Math.max(0, t - r) / 1e3;
              if (
                ((p = Number.isFinite(h) ? h - n : null),
                !a.paused && null !== p && Math.abs(p) <= y)
              ) {
                if ((i || (i = t), t - i >= 300)) {
                  b = !0;
                  break;
                }
              } else i = 0;
            }
          }
          const w = n();
          return {
            ok: b,
            verified: b,
            method: u,
            beforeMediaTime: Number.isFinite(l) ? l : null,
            resumedMediaTime: Number.isFinite(r) ? r : null,
            relativeSeekSeconds: Number.isFinite(m) ? m : null,
            committedMediaTime: Number.isFinite(g) ? g : null,
            verifiedMediaTime: Number.isFinite(h) ? h : null,
            verificationDriftSeconds: Number.isFinite(p) ? p : null,
            commitAttempts: f,
            liveDvrKnown: s,
            liveDvrEnabled: o,
            seekByAvailable: c,
            progressBefore: d,
            progressAfterResume: i,
            progressAfterCommit: w,
            paused: Boolean(a.paused),
            error: b ? "" : "startup DVR commit did not remain stable",
          };
        } catch (e) {
          return {
            ok: !1,
            method: u,
            error: String(
              e?.message || e || "startup viewer anchor commit failed",
            ),
          };
        }
      },
    }),
    i = r?.[0]?.result || {};
  return {
    ok: !0 === i.ok,
    pageCommandHandled: !0 === i.ok && !0 === i.verified,
    ...i,
  };
}
async function Ri(e, t) {
  const a = await Vo(e, t);
  if (((at = a), !a?.syncEnabled))
    return { ok: !1, error: "sync session is not active" };
  if (t.tab?.id !== a.displayTabId)
    return { ok: !1, error: "viewer seek ignored from non-display tab" };
  const n = Number(e.targetMediaTime);
  if (!Number.isFinite(n) || n < 0)
    return { ok: !1, error: "viewer seek target is missing" };
  const r = Number(e.viewerTargetMediaTime),
    i = Number.isFinite(r) && r >= 0 ? r : n,
    s = !0 === e.cachedSubtitleReplay,
    o = _i(e.cachedSubtitleCoverageRanges),
    c = e.seekId ? `${a.sessionId}:${e.seekId}` : "",
    l = c ? lt.get(c) : null;
  if (l) return (await l, { ok: !0 });
  const d = !1 !== e.resetTimeline && (await ds()),
    u = Boolean(
      d &&
        !s &&
        a.config?.mseStartupBoostEnabled &&
        rl(a.config?.mseStartupBoostMode) === H &&
        a.config?.mseAudioBufferEnabled &&
        !a.singleTabMediaSync,
    ),
    m = Boolean(u || (d && s)),
    f = d
      ? chrome.runtime
          .sendMessage({
            target: "offscreen",
            type: "RESET_SUBTITLE_TIMELINE",
            sessionId: a.sessionId,
            seekId: e.seekId || null,
            targetMediaTime: n,
            viewerTargetMediaTime: i,
            targetDelaySeconds:
              e.targetDelaySeconds ?? a.config?.syncDelaySeconds ?? null,
            cachedSubtitleReplay: s,
            cachedSubtitleCoverageRanges: o,
            viewerTiming: e.viewerTiming || null,
          })
          .catch((e) => {
            console.warn(
              "[service-worker] offscreen seek reset skipped:",
              e.message,
            );
          })
      : Promise.resolve(),
    g = async () => {
      a.captureTabId &&
        (await ko(a.captureTabId, {
          type: "LIVE_SUBTITLE_SOURCE_SEEK",
          sessionId: a.sessionId,
          seekId: e.seekId || null,
          targetMediaTime: n,
          targetDelaySeconds:
            e.targetDelaySeconds ?? a.config?.syncDelaySeconds ?? null,
          sourcePreloadEnabled: !1,
          sourcePreloadPlaybackRate: 1,
          sourcePreloadMaxLeadSeconds: ol(
            a.config?.sourcePreloadMaxLeadSeconds,
          ),
          transcriberPreparedBeforeSourceSeek: u,
        }));
    };
  if (m) {
    const e = (async () => {
      (await f, await g());
    })();
    c && lt.set(c, e);
    try {
      await e;
    } finally {
      c && lt.get(c) === e && lt.delete(c);
    }
  } else (await g(), await f);
  return { ok: !0 };
}
function _i(e = []) {
  return (Array.isArray(e) ? e : [])
    .slice(0, 80)
    .map((e) => ({ start: dl(e?.start), end: dl(e?.end) }))
    .filter((e) => null !== e.start && null !== e.end && e.end > e.start);
}
async function Ni(e, t) {
  const a = await Vo(e, t),
    n = t.tab?.id === a?.captureTabId,
    r = t.tab?.id === a?.displayTabId;
  if (!a || (!n && !r))
    return { ok: !1, error: "timeline reset ignored from non-session tab" };
  const i = Number(e.targetMediaTime);
  if (!Number.isFinite(i) || i < 0)
    return { ok: !1, error: "timeline reset target is missing" };
  const s = !0 === e.cachedSubtitleReplay,
    o = _i(e.cachedSubtitleCoverageRanges);
  if (!(await ds()))
    return {
      ok: !1,
      offscreenResetApplied: !1,
      error: "offscreen timeline reset is unavailable",
    };
  let c = null;
  try {
    const t = await chrome.runtime.sendMessage({
      target: "offscreen",
      type: "RESET_SUBTITLE_TIMELINE",
      sessionId: a.sessionId,
      seekId: e.seekId || null,
      targetMediaTime: i,
      targetDelaySeconds:
        e.targetDelaySeconds ?? a.config?.syncDelaySeconds ?? null,
      cachedSubtitleReplay: s,
      cachedSubtitleCoverageRanges: o,
      viewerTiming: e.viewerTiming || null,
      reason: e.reason || "timeline-reset",
    });
    c = Number(t?.timelineRevision);
    const n = String(t?.sessionId || "").trim();
    if (
      !0 !== t?.ok ||
      !0 === t?.ignored ||
      n !== a.sessionId ||
      !Number.isInteger(c) ||
      c < 1
    )
      return {
        ok: !1,
        offscreenResetApplied: !1,
        error: String(
          t?.error || t?.reason || "offscreen timeline reset was rejected",
        ),
      };
  } catch (e) {
    return (
      console.warn(
        "[service-worker] offscreen timeline reset failed:",
        e.message,
      ),
      {
        ok: !1,
        offscreenResetApplied: !1,
        error: String(e?.message || e || "offscreen timeline reset failed"),
      }
    );
  }
  return { ok: !0, offscreenResetApplied: !0, timelineRevision: c };
}
async function Pi(e, t) {
  const a = await Vo(e, t);
  if (!a?.syncEnabled) return { ok: !1, error: "sync session is not active" };
  if (t.tab?.id !== a.displayTabId)
    return { ok: !1, error: "viewer playback ignored from non-display tab" };
  const n = "pause" === e.action ? "pause" : "play" === e.action ? "play" : "";
  if (!n) return { ok: !1, error: "viewer playback action is missing" };
  const r = "pause" === n ? Al(e.continuedLoadingMs) : 0,
    i = r > 0 ? Date.now() + r : null;
  return (
    (await ds()) &&
      (await chrome.runtime
        .sendMessage({
          target: "offscreen",
          type: "VIEWER_MEDIA_TIMING_UPDATE",
          sessionId: a.sessionId,
          timing: {
            ...(e.viewerTiming || {}),
            paused: "pause" === n,
            pauseContinuationUntilMs: i,
            continuedLoadingMs: r,
            wallTimeMs: Date.now(),
          },
        })
        .catch((e) => {
          console.warn(
            "[service-worker] viewer playback timing relay skipped:",
            e.message,
          );
        })),
    a.captureTabId &&
      (await ko(a.captureTabId, {
        type: "LIVE_SUBTITLE_SOURCE_PLAYBACK",
        sessionId: a.sessionId,
        action: n,
        viewerTiming: e.viewerTiming || null,
        continuedLoadingMs: r,
      })),
    { ok: !0 }
  );
}
async function Ui(e = {}) {
  return (
    (at = await xo(e.sessionId)),
    at?.syncEnabled && at.captureTabId
      ? (await ko(at.captureTabId, {
          type: "LIVE_SUBTITLE_SOURCE_PLAYBACK",
          sessionId: at.sessionId,
          action: "pause",
          reason: e.reason || "source-vod-ended",
          timing: e.timing || null,
        }),
        { ok: !0 })
      : { ok: !1, error: "sync session is not active" }
  );
}
async function xi(e, t) {
  return (
    await Vo(e, t),
    { ok: !1, error: "source playback-rate control has been removed" }
  );
}
async function Bi(e, t) {
  const a = await Vo(e, t),
    n = a?.sessionId || `tab:${t.tab?.id || "unknown"}`,
    r = to(e.href || e.url || e.timing?.href || t.tab?.url || ""),
    i = to(e.canonicalHref || ""),
    s = i || r,
    o = El(s) || s,
    c = String(e.mediaContextKey || "").trim();
  if (c && o && c !== o)
    return {
      ok: !1,
      superseded: !0,
      reason: "viewer-media-context-changed-before-request",
      targetKey: o,
      requestedTargetKey: c,
    };
  let l = it.get(n);
  if (
    ((l && "object" == typeof l && !l.disposed) ||
      ((l = {
        sessionKey: n,
        epoch: 0,
        currentJob: null,
        pendingJob: null,
        drainPromise: null,
        disposed: !1,
      }),
      it.set(n, l)),
    l.currentJob?.targetKey === o)
  )
    return l.currentJob.promise;
  if (l.pendingJob?.targetKey === o) return l.pendingJob.promise;
  const d = Vi({
    epoch: l.epoch + 1,
    targetKey: o,
    message: {
      ...e,
      href: s,
      viewerPageUrl: r,
      canonicalHref: i,
      mediaContextKey: o,
    },
    sender: t,
    session: a,
  });
  return (
    (l.epoch = d.epoch),
    l.pendingJob &&
      l.pendingJob.resolve(
        Ki(l.pendingJob, d.targetKey, "newer-viewer-target-queued"),
      ),
    l.currentJob &&
      l.currentJob.targetKey !== d.targetKey &&
      (l.currentJob.supersededBy = d.targetKey),
    (l.pendingJob = d),
    l.drainPromise ||
      (l.drainPromise = qi(n, l).finally(() => {
        ((l.drainPromise = null),
          it.get(n) !== l || l.pendingJob || l.currentJob || it.delete(n));
      })),
    d.promise
  );
}
function Vi({ epoch: e, targetKey: t, message: a, sender: n, session: r }) {
  let i;
  return {
    epoch: e,
    targetKey: t,
    message: a,
    sender: n,
    session: r,
    promise: new Promise((e) => {
      i = e;
    }),
    resolve: i,
    supersededBy: "",
  };
}
function Ki(e, t = "", a = "viewer-media-change-superseded") {
  return {
    ok: !1,
    superseded: !0,
    reason: a,
    targetKey: e?.targetKey || "",
    supersededBy: t || e?.supersededBy || "",
  };
}
async function qi(e, t) {
  for (; !t.disposed && t.pendingJob; ) {
    const a = t.pendingJob;
    let n;
    ((t.pendingJob = null), (t.currentJob = a));
    try {
      Oi(e, a.epoch, a.targetKey);
      const t = await Vo(a.message, a.sender);
      (Oi(e, a.epoch, a.targetKey),
        (n = await Hi(a.message, a.sender, t, {
          sessionKey: e,
          epoch: a.epoch,
          targetKey: a.targetKey,
        })));
    } catch (e) {
      $i(e)
        ? ((n = Ki(a, a.supersededBy, e.message)),
          await li(
            a.session?.sessionId || a.message?.sessionId,
            "viewer.media_change.superseded",
            {
              targetKey: a.targetKey,
              supersededBy: a.supersededBy || t.pendingJob?.targetKey || "",
              epoch: a.epoch,
              reason: e.message,
            },
            "info",
          ))
        : ((n = {
            ok: !1,
            error: e?.message || "viewer media change failed",
            targetKey: a.targetKey,
          }),
          await li(
            a.session?.sessionId || a.message?.sessionId,
            "viewer.media_change.failed",
            { targetKey: a.targetKey, epoch: a.epoch, error: n.error },
            "error",
          ));
    }
    (a.resolve(n), t.currentJob === a && (t.currentJob = null));
  }
}
function Oi(e, t, a) {
  const n = it.get(e),
    r = n?.currentJob;
  if (
    !n ||
    n.disposed ||
    n.epoch !== t ||
    r?.epoch !== t ||
    r?.targetKey !== a
  ) {
    const e = new Error("viewer-media-change-superseded");
    throw ((e.code = "VIEWER_MEDIA_CHANGE_SUPERSEDED"), e);
  }
  return !0;
}
function $i(e) {
  return (
    "VIEWER_MEDIA_CHANGE_SUPERSEDED" === e?.code ||
    /viewer-media-change-superseded/i.test(e?.message || "")
  );
}
async function Fi(e, t, a, n = null) {
  const r = () => !n || Oi(n.sessionKey, n.epoch, n.targetKey);
  r();
  const i = a.displayTabId || a.tabId;
  if (!i || t.tab?.id !== i)
    return {
      ok: !1,
      error: "single-tab media change ignored from non-display tab",
    };
  const s = to(
      e.viewerPageUrl || e.href || e.url || e.timing?.href || t.tab?.url || "",
    ),
    o = to(e.canonicalHref || ""),
    c = o || s;
  if (!c) return { ok: !1, error: "single-tab media url is missing" };
  if (!tc(c)) return { ok: !1, error: "single-tab media url is not supported" };
  const l = await Us(i, 1800).catch(() => null);
  r();
  const d = await xs({
    tabId: i,
    expectedUrl: c,
    initialPageInfo: l,
    reportedTiming: e.timing || null,
    guard: r,
  });
  r();
  const u = d.pageInfo || l,
    m =
      String(u?.mediaContextKey || "").trim() ||
      El(c) ||
      String(e.mediaContextKey || "").trim();
  if (!m) return { ok: !1, error: "single-tab media context is missing" };
  if (n?.targetKey && n.targetKey !== m) {
    const e = new Error("viewer-media-change-superseded-target-mismatch");
    throw ((e.code = "VIEWER_MEDIA_CHANGE_SUPERSEDED"), e);
  }
  const f = Ra(a.config || {});
  if (f === m) return { ok: !0, unchanged: !0, config: a.config, targetKey: m };
  const g = to(u?.canonicalMediaUrl || o || s || c) || c,
    h = dl(d.mediaTime),
    p = gl(g || c);
  let b = {
    ...Ba(a.config),
    pageUrl: g,
    canonicalPageUrl: g,
    sourceMediaContextKey: m,
    viewerMediaContextKey: m,
    youtubeVideoId: Tl(g || c),
    pageTitle: e.title || t.tab?.title || u?.title || a.config?.pageTitle || "",
    videoPlatform: p,
    syncRole: `${p}-single-tab`,
    sourceIsLiveStream: !0 === d.isLiveStream,
    sourceLiveClassification: Bc(u),
    initialPlaybackMediaTime: h,
    pageDurationSeconds: dl(u?.timing?.duration ?? u?.duration),
    viewerMediaSwitchEpoch: n?.epoch || 0,
  };
  const y = {
    ...a,
    tabId: i,
    captureTabId: i,
    sourceTabId: i,
    displayTabId: i,
    config: b,
  };
  (await li(a.sessionId, "single_tab.media_change.started", {
    previousTargetKey: f,
    targetKey: m,
    epoch: n?.epoch || 0,
    displayTabId: i,
    reportedMediaTime: d.reportedMediaTime,
    resolvedMediaTime: h,
    playbackAnchorSource: d.source,
    playbackAnchorWaitedMs: d.waitedMs,
    playbackAnchorSampleCount: d.sampleCount,
  }),
    r(),
    await ko(i, {
      type: "LIVE_SUBTITLE_EVENT",
      sessionId: a.sessionId,
      event: {
        kind: "status",
        status: "media-context-reset",
        message: "影片已切換，正在準備新字幕",
        mediaContextKey: m,
        pageUrl: g,
      },
    }),
    await xn(a.sessionId, { notify: !1, reason: "single-tab-media-change" }),
    r());
  let w = null;
  if ("youtube" === p && !Na(b))
    try {
      const e = await Zt();
      if (e?.idToken) {
        const t = await $a({ ...b, sessionId: y.sessionId }, e);
        (r(), Da(t, b) && (w = t));
      }
    } catch (e) {
      console.warn(
        "[service-worker] single-tab subtitle cache read on video switch skipped:",
        e.message,
      );
    }
  w && (b = Va(b, w));
  const S = {
    ...y,
    hybridSubtitleCacheMode: Boolean(w),
    cachedSubtitle: w ? Ka(w) : null,
    config: b,
  };
  return (
    await Lo(
      i,
      { type: "LIVE_SUBTITLE_INIT", config: b, sessionId: S.sessionId },
      "單分頁換片後字幕匡初始化失敗",
      { requireMounted: !0, timeoutMs: 8e3 },
    ),
    r(),
    w &&
      (await ko(i, {
        type: "LIVE_SUBTITLE_EVENT",
        sessionId: S.sessionId,
        event: {
          kind: "status",
          status: "hybrid-cache-ready",
          message: `已讀取部分快取字幕 ${w.segments.length.toLocaleString("en-US")} 段，缺口將即時補字幕`,
        },
      }),
      await ko(i, {
        type: "LIVE_SUBTITLE_EVENT",
        sessionId: S.sessionId,
        event: qa(w, b),
      })),
    await Xi(),
    r(),
    await ss({ tabId: i, sessionId: S.sessionId, config: b, guard: r }),
    r(),
    await Fo(S),
    r(),
    await Eo(i, b, S.sessionId, {
      tab: { ...t.tab, id: i, url: s || g },
      reason: "single-tab-media-change",
      retryPostedSegments: !0,
      timeoutMs: 5e3,
    }),
    r(),
    await Do(),
    await li(S.sessionId, "single_tab.media_change.committed", {
      previousTargetKey: f,
      targetKey: m,
      epoch: n?.epoch || 0,
      displayTabId: i,
      initialPlaybackMediaTime: h,
      cacheHit: Boolean(w),
    }),
    {
      ok: !0,
      singleTabMediaSync: !0,
      sourceTabId: i,
      displayTabId: i,
      sourceUrl: g,
      targetKey: m,
      switchEpoch: n?.epoch || 0,
      config: b,
    }
  );
}
async function Hi(e, t, a = null, n = null) {
  const r = a || (await Vo(e, t)),
    i = () => !n || Oi(n.sessionKey, n.epoch, n.targetKey);
  if ((i(), So(r)))
    return t.tab?.id !== (r.displayTabId || r.tabId)
      ? { ok: !1, error: "wrong-display-tab" }
      : vo(r, await chrome.tabs.get(t.tab.id), await Us(t.tab.id), i);
  if (r?.singleTabMediaSync) return Fi(e, t, r, n);
  if (!r?.syncEnabled || r?.mirrorDelayEnabled)
    return { ok: !1, error: "source/viewer sync session is not active" };
  if (t.tab?.id !== r.displayTabId)
    return {
      ok: !1,
      error: "viewer media change ignored from non-display tab",
    };
  const s = to(e.href || e.url || e.timing?.href || t.tab?.url || "");
  if (!s) return { ok: !1, error: "viewer media url is missing" };
  if (!tc(s)) return { ok: !1, error: "viewer media url is not supported" };
  if (!fl(s))
    return {
      ok: !1,
      error: "viewer media url does not support source/viewer sync",
    };
  const o = await xs({
    tabId: t.tab?.id,
    expectedUrl: s,
    reportedTiming: e.timing || null,
    guard: i,
  });
  i();
  const c = dl(o.mediaTime),
    l = ao(s, { startSeconds: c, isLiveStream: o.isLiveStream }),
    d = El(l) || l;
  if (n?.targetKey && n.targetKey !== d) {
    const e = new Error("viewer-media-change-superseded-target-mismatch");
    throw ((e.code = "VIEWER_MEDIA_CHANGE_SUPERSEDED"), e);
  }
  if (Ml(r.config?.pageUrl || "", l))
    return { ok: !0, unchanged: !0, config: r.config, targetKey: d };
  const u = r.captureTabId || r.sourceTabId,
    m = r.displayTabId;
  if (!u || !m) return { ok: !1, error: "source/viewer tabs are missing" };
  const f = gl(l),
    g = {
      ...Ba(r.config),
      pageUrl: l,
      canonicalPageUrl: l,
      sourceMediaContextKey: d,
      youtubeVideoId: Tl(l),
      pageTitle: e.title || t.tab?.title || r.config?.pageTitle || "",
      videoPlatform: f,
      syncRole: `${f}-viewer`,
      startedAt: r.config?.startedAt || new Date().toISOString(),
      initialPlaybackMediaTime: c,
      viewerMediaContextKey: d,
      viewerMediaSwitchEpoch: n?.epoch || 0,
    },
    h = {
      ...r,
      tabId: m,
      captureTabId: u,
      sourceTabId: u,
      displayTabId: m,
      config: g,
    };
  (await Fo(h),
    i(),
    await li(h.sessionId, "viewer.media_change.started", {
      targetKey: d,
      epoch: n?.epoch || 0,
      sourceTabId: u,
      displayTabId: m,
      reportedMediaTime: o.reportedMediaTime,
      resolvedMediaTime: c,
      playbackAnchorSource: o.source,
      playbackAnchorWaitedMs: o.waitedMs,
      playbackAnchorSampleCount: o.sampleCount,
      isLiveStream: o.isLiveStream,
    }),
    i(),
    await ko(m, {
      type: "LIVE_SUBTITLE_EVENT",
      sessionId: h.sessionId,
      event: {
        kind: "status",
        status: "switching-source",
        message: "viewer 已切換影片，正在同步來源分頁",
      },
    }),
    await xn(r.sessionId, { notify: !1, reason: "viewer-media-change" }),
    i(),
    await chrome.tabs.update(u, { url: l }),
    i());
  const p = await ro(u);
  (i(), await Cs(u), i());
  let b = { ...g, pageTitle: p?.title || g.pageTitle || "" },
    y = null;
  if ("youtube" === f && !Na(b))
    try {
      const e = await Zt();
      if (e?.idToken) {
        const t = await $a({ ...b, sessionId: h.sessionId }, e);
        (i(),
          Da(t, b)
            ? (y = t)
            : La(t) &&
              console.warn(
                "[service-worker] subtitle cache ignored on video switch: video key mismatch",
                { expectedKey: El(b.pageUrl || ""), actualKey: Aa(t) },
              ));
      }
    } catch (e) {
      console.warn(
        "[service-worker] subtitle cache read on video switch skipped:",
        e.message,
      );
    }
  y && (b = Va(b, y));
  const w = {
    ...h,
    hybridSubtitleCacheMode: Boolean(y),
    cachedSubtitle: y ? Ka(y) : null,
    config: b,
  };
  return (
    i(),
    await Fo(w),
    i(),
    await Lo(
      u,
      { type: "LIVE_SUBTITLE_SOURCE_INIT", config: b, sessionId: w.sessionId },
      "來源分頁切換初始化失敗",
    ),
    i(),
    await Lo(
      m,
      { type: "LIVE_SUBTITLE_INIT", config: b, sessionId: w.sessionId },
      "viewer 切換後字幕匡初始化失敗",
      { requireMounted: !0 },
    ),
    i(),
    y &&
      (await ko(m, {
        type: "LIVE_SUBTITLE_EVENT",
        sessionId: w.sessionId,
        event: {
          kind: "status",
          status: "hybrid-cache-ready",
          message: `已讀取部分快取字幕 ${y.segments.length.toLocaleString("en-US")} 段，缺口將即時補字幕`,
        },
      }),
      await ko(m, {
        type: "LIVE_SUBTITLE_EVENT",
        sessionId: w.sessionId,
        event: qa(y, b),
      })),
    await Xi(),
    i(),
    await is(w.sessionId, u, "viewer-media-change-capture-start"),
    await ss({ tabId: u, sessionId: w.sessionId, config: b, guard: i }),
    i(),
    b.sourceStartupCaptureHold &&
      (await Lo(
        u,
        {
          type: "LIVE_SUBTITLE_SOURCE_CAPTURE_READY",
          sessionId: w.sessionId,
          initialPlaybackMediaTime: b.initialPlaybackMediaTime,
        },
        "換片後來源音訊起點放行失敗",
        { timeoutMs: 5e3 },
      ),
      i()),
    await Do(),
    i(),
    await li(w.sessionId, "viewer.media_change.committed", {
      targetKey: d,
      epoch: n?.epoch || 0,
      sourceTabId: u,
      displayTabId: m,
    }),
    {
      ok: !0,
      sourceTabId: u,
      displayTabId: m,
      sourceUrl: l,
      targetKey: d,
      switchEpoch: n?.epoch || 0,
      config: b,
    }
  );
}
async function ji(e, t = null, a = "") {
  if (!t)
    return void console.warn(
      "[service-worker] ignored offscreen stopped without sessionId",
    );
  const n = await xo(t);
  if (!Gi(n, t)) return;
  const r = n.sessionId,
    i = n.displayTabId || n.tabId;
  (i &&
    (await ko(i, {
      type: "LIVE_SUBTITLE_EVENT",
      sessionId: r,
      event: { kind: "status", status: "stopped", message: e || "已停止" },
    })),
    await zi(n, { pauseManagedMedia: Boolean(n.syncEnabled) }),
    zo(r, "offscreen-stopped"),
    await Wo(r),
    await Do(),
    await xn(r, { notify: !1, reason: "runner-stopped" }),
    a && (await Wi(n.mirrorDelayEnabled ? n.captureTabId : i, r, n.config, a)));
}
async function Wi(e, t, a, n) {
  e &&
    n &&
    (await ko(e, {
      type: "LIVE_SUBTITLE_FAILURE",
      sessionId: t,
      config: a,
      mediaContextKey: Ra(a || {}),
      message: String(n).slice(0, 500),
    }));
}
function Gi(e, t = null) {
  return !(!e || (t && e.sessionId !== t));
}
async function zi(e, t = {}) {
  if (!e) return;
  const a = Boolean(t.pauseManagedMedia),
    n = void 0 === t.pauseDisplayMedia ? a : Boolean(t.pauseDisplayMedia),
    r = void 0 === t.pauseSourceMedia ? a : Boolean(t.pauseSourceMedia),
    i = Boolean(t.resumeSourceMedia) && !r,
    s = !1 !== t.notifyDisplayStop,
    o = Number(t.removedTabId),
    c = e.displayTabId || e.tabId,
    l = Qi([e.captureTabId, e.sourceTabId]).filter((e) => e !== c && e !== o);
  c &&
    c !== o &&
    s &&
    (e.mirrorDelayEnabled
      ? await chrome.runtime
          .sendMessage({
            target: "mirror-viewer",
            type: "LIVE_SUBTITLE_STOP",
            sessionId: e.sessionId,
            pauseMedia: n,
          })
          .catch(() => {})
      : await ko(c, {
          type: "LIVE_SUBTITLE_STOP",
          sessionId: e.sessionId,
          pauseMedia: n,
        }));
  for (const t of l)
    await ko(t, {
      type: "LIVE_SUBTITLE_SOURCE_STOP",
      sessionId: e.sessionId,
      pauseMedia: r,
      resumeMedia: i,
    });
}
async function Ji(e) {
  const t = await Uo(),
    a = Number(e);
  for (const e of t)
    Qi([e.tabId, e.captureTabId, e.sourceTabId, e.displayTabId]).includes(a) &&
      (await Yi(e, `managed tab ${a} removed`, { removedTabId: a }));
}
async function Yi(e, t = "stale session", a = {}) {
  if (!e) return;
  const n = e.sessionId;
  (console.warn("[service-worker] clearing stale subtitle session:", t),
    (e.cachedSubtitleMode || e.hybridSubtitleCacheMode) &&
      (await Ai(e, {
        reason: a.reason || t || "stale-session",
        endRemote: !e.hybridSubtitleCacheMode,
      })),
    await wa(e, a.reason || t || "stale-session"),
    zo(n, t),
    await zi(e, {
      pauseManagedMedia: Boolean(e.syncEnabled),
      notifyDisplayStop: !0,
      removedTabId: a.removedTabId,
    }),
    await Wo(n),
    await Do(),
    await xn(n, { reason: a.reason || t || "stale-session" }));
}
function Qi(e = []) {
  return [
    ...new Set(e.map((e) => Number(e)).filter((e) => Number.isFinite(e))),
  ];
}
async function Xi() {
  (await ds()) ||
    (await chrome.offscreen.createDocument({
      url: t,
      reasons: ["USER_MEDIA", "AUDIO_PLAYBACK"],
      justification:
        "Capture tab audio and play translated live narration.",
    }));
}
function Zi(e = {}) {
  return {
    extensionVersion:
      "string" ==
        typeof (e = e && "object" == typeof e ? e : {}).extensionVersion &&
      /^\d+\.\d+\.\d+(?:\.\d+)?$/.test(e.extensionVersion) &&
      e.extensionVersion.length <= 40
        ? e.extensionVersion
        : "",
    extensionId:
      "string" == typeof e.extensionId && /^[a-p]{32}$/.test(e.extensionId)
        ? e.extensionId
        : "",
    releaseChannel: ["formal", "test", "store", "unknown"].includes(
      e.releaseChannel,
    )
      ? e.releaseChannel
      : "unknown",
    installationType: [
      "admin",
      "development",
      "normal",
      "sideload",
      "other",
      "unknown",
    ].includes(e.installationType)
      ? e.installationType
      : "unknown",
    buildMetadataSource:
      "service-worker" === e.buildMetadataSource ? "service-worker" : "unknown",
  };
}
function es(e = {}, t = "", a = null) {
  e = e && "object" == typeof e ? e : {};
  const n = a?.installType || "unknown";
  let r = "unknown";
  if (/\btest\b|測試/i.test(String(e.name || ""))) r = "test";
  else if ("fdhjjimjclphneajgcajolflaodiblkp" === t && "normal" === n)
    try {
      const t = new URL(a.updateUrl || e.update_url || "");
      "https:" === t.protocol &&
        "clients2.google.com" === t.hostname &&
        "/service/update2/crx" === t.pathname &&
        (r = "store");
    } catch {}
  else
    "kfdcnelkajbjoiknjgnbkdchhejkhhdf" === t &&
      "川流字幕subruu" === e.name &&
      (r = "formal");
  return Zi({
    extensionVersion: e.version,
    extensionId: t,
    releaseChannel: r,
    installationType: n,
    buildMetadataSource: "service-worker",
  });
}
let ts = null;
async function as(e) {
  e = e || {};
  let t,
    a = {};
  try {
    a = e.runtime.getManifest();
  } catch {}
  ts ||
    (ts = Promise.resolve()
      .then(() => e.management?.getSelf?.())
      .catch(() => null));
  const n = await Promise.race([
    ts,
    new Promise((e) => {
      t = setTimeout(() => e(null), 120);
    }),
  ]);
  return (clearTimeout(t), es(a, e.runtime?.id || "", n));
}
async function ns({ streamId: e, tabId: t, sessionId: a, config: n }) {
  const r = await as(chrome),
    i = await Rl(
      chrome.runtime.sendMessage({
        target: "offscreen",
        type: "START_TAB_AUDIO_CAPTURE",
        clientBuildMetadata: r,
        streamId: e,
        tabId: t,
        sessionId: a,
        config: n,
      }),
      Ce,
      { ok: !1, timeout: !0 },
    );
  if (i?.timeout)
    throw new Error("offscreen 音訊擷取啟動逾時，請重載插件後再試。");
  if (!i?.ok) throw new Error(i?.error || "offscreen 音訊擷取啟動失敗");
}
async function rs(e, t = null) {
  const a = Number(e);
  if (!Number.isFinite(a) || !(await ds())) return { ok: !0, stopped: 0 };
  const n = await Rl(
    chrome.runtime
      .sendMessage({
        target: "offscreen",
        type: "STOP_TAB_AUDIO_CAPTURE_FOR_TAB",
        tabId: a,
        exceptSessionId: t || null,
        notify: !1,
        reason: "same-tab-capture-recovery",
      })
      .catch((e) => ({ ok: !1, error: e.message })),
    Ee,
    { ok: !1, timeout: !0 },
  );
  return (
    n?.stopped > 0 &&
      console.warn(
        `[service-worker] released ${n.stopped} stale capture session(s) for tab ${a}.`,
      ),
    n
  );
}
async function is(e, t, a = "capture-start") {
  const n = await xo(e);
  if (!n) throw new Error(`stale session aborted before ${a}`);
  if (!Qi([n.captureTabId, n.sourceTabId, n.tabId]).includes(Number(t)))
    throw new Error(`stale session tab mismatch before ${a}`);
  const r = await Bo(t);
  if (r?.sessionId && r.sessionId !== n.sessionId)
    throw new Error(`capture tab now belongs to another session before ${a}`);
  return n;
}
async function ss({ tabId: e, sessionId: t, config: a, guard: n = null }) {
  const r = async () => {
    "function" == typeof n && (await n());
  };
  let i = null;
  const s = [0, 350, 900],
    o = os(a) && !cs(a);
  for (let n = 0; n < s.length; n += 1) {
    (await r(),
      await is(t, e, `attempt-${n + 1}`),
      n > 0 &&
        (console.warn(
          "[service-worker] retrying tab capture after active stream cleanup.",
        ),
        await xn(t, { notify: !1, reason: "capture-retry-cleanup" }),
        await rs(e, t),
        await Dl(s[n]),
        await r(),
        await is(t, e, `retry-${n + 1}`),
        await Xi(),
        await r()));
    let c = null;
    try {
      return (
        (c = await chrome.tabCapture.getMediaStreamId({ targetTabId: e })),
        await r(),
        await ns({ streamId: c, tabId: e, sessionId: t, config: a }),
        void (await r())
      );
    } catch (c) {
      i = c;
      const l = ls(c);
      if (o && !0 !== a?.msePcmPrimaryOnly && (!l || n === s.length - 1))
        return (
          await r(),
          await is(t, e, "mse-audio-only-fallback"),
          console.warn(
            "[service-worker] tab capture failed; starting MSE audio buffer without tab stream:",
            c.message,
          ),
          await ns({
            streamId: null,
            tabId: e,
            sessionId: t,
            config: {
              ...a,
              tabCaptureOptional: !0,
              audioInputMode: "mse-audio-buffer",
              mseAudioBufferEnabled: !0,
            },
          }),
          void (await r())
        );
      if (!l || n === s.length - 1) throw c;
    }
  }
  throw i || new Error("offscreen 音訊擷取啟動失敗");
}
function os(e = {}) {
  return !(
    (!0 !== e.mseAudioBufferEnabled &&
      "mse-audio-buffer" !== e.audioInputMode) ||
    e.mirrorDelayEnabled ||
    e.nativeStreamDelayEnabled
  );
}
function cs(e = {}) {
  if (!0 !== e.mseStartupBoostEnabled) return !1;
  if (rl(e.mseStartupBoostMode) !== H) return !1;
  const t = jc(e.sttProvider),
    a = Yc(e.sourceLang);
  return Boolean(a && a !== t);
}
function ls(e) {
  return /active stream|already.*captur|currently.*captur|Cannot capture/i.test(
    e?.message || "",
  );
}
async function ds() {
  const e = chrome.runtime.getURL(t);
  return (
    (
      await chrome.runtime.getContexts({
        contextTypes: ["OFFSCREEN_DOCUMENT"],
        documentUrls: [e],
      })
    ).length > 0
  );
}
async function us(e, t = 4e3, a = "script injection") {
  let n = null;
  try {
    return await Promise.race([
      chrome.scripting.executeScript(e),
      new Promise((e, r) => {
        n = setTimeout(() => {
          r(new Error(`${a} timed out after ${t}ms`));
        }, t);
      }),
    ]);
  } finally {
    null !== n && clearTimeout(n);
  }
}
async function ms(e) {
  await us(
    { target: { tabId: e }, files: ["mse-audio-hook.js"], world: "MAIN" },
    4e3,
    "MSE hook injection",
  );
}
const fs = 29,
  gs = new Map();
async function hs(e) {
  try {
    return await chrome.tabs.sendMessage(e, {
      type: "LIVE_SUBTITLE_MSE_HOOK_STATUS",
    });
  } catch {
    return null;
  }
}
function ps(e, t = {}) {
  const a = dl(e?.hookVersion),
    n = String(e?.installDocumentId || "").trim(),
    r = String(e?.installDocumentReadyState || "");
  return !(
    !e?.installed ||
    null === a ||
    a <= 0 ||
    !n ||
    !r ||
    a < (t.minimumVersion || 0) ||
    (t.previousDocumentId && n === t.previousDocumentId) ||
    (t.requireDocumentStart &&
      (!0 !== e.installedDuringDocumentLoading || "loading" !== r))
  );
}
async function bs(e, t = 3e3, a = {}) {
  const n = Date.now() + t;
  let r = null;
  for (; Date.now() < n; ) {
    if (((r = await hs(e)), ps(r, a))) return r;
    await Dl(250);
  }
  return r;
}
function ys(e, t) {
  const a = dl(t);
  if (null === a || a <= 3) return null;
  try {
    const t = new URL(String(e || ""));
    return "youtube.com" !== t.hostname.replace(/^www\./, "") ||
      "/watch" !== t.pathname
      ? null
      : (t.searchParams.set("t", `${Math.max(0, Math.floor(a))}s`),
        t.toString());
  } catch {
    return null;
  }
}
async function ws(e, t, a = {}) {
  const n = dl(t);
  if (null === n || n <= 1)
    return {
      restored: !1,
      skipped: !0,
      reason: "near-start",
      restoredMediaTime: n,
    };
  const r = await us(
    {
      target: { tabId: e },
      world: "MAIN",
      args: [{ targetMediaTime: n, resumePlayback: !0 === a.resumePlayback }],
      func: async ({ targetMediaTime: e, resumePlayback: t }) => {
        const a = (e) => new Promise((t) => setTimeout(t, e)),
          n = () => {
            const e = Array.from(document.querySelectorAll("video"));
            return (
              e
                .map((e) => {
                  let t = 0;
                  try {
                    const a = e.getBoundingClientRect();
                    t =
                      Math.max(0, Number(a.width) || 0) *
                      Math.max(0, Number(a.height) || 0);
                  } catch {
                    t = 0;
                  }
                  return { video: e, score: (e.paused ? 0 : 1e12) + t };
                })
                .sort((e, t) => t.score - e.score)[0]?.video || null
            );
          };
        let r = n();
        const i = Date.now();
        for (; (!r || Number(r.readyState || 0) < 1) && Date.now() - i < 8e3; )
          (await a(100), (r = n()));
        if (!r) return { restored: !1, reason: "video-not-found" };
        let s = Math.max(0, Number(e) || 0);
        const o = Number(r.duration);
        Number.isFinite(o) && o > 0 && (s = Math.min(s, Math.max(0, o - 0.25)));
        try {
          const e = r.seekable;
          if (e?.length) {
            const t = Number(e.start(0)),
              a = Number(e.end(e.length - 1));
            Number.isFinite(t) &&
              Number.isFinite(a) &&
              a >= t &&
              (s = Math.min(Math.max(s, t), Math.max(t, a - 0.05)));
          }
        } catch {}
        let c = "";
        try {
          r.currentTime = s;
        } catch (e) {
          c = String(e?.message || e || "seek-failed");
        }
        let l = Number(r.currentTime);
        for (
          let e = 0;
          e < 30 && !(Number.isFinite(l) && Math.abs(l - s) <= 1.5);
          e += 1
        )
          (await a(100), (l = Number(r.currentTime)));
        const d = Number.isFinite(l) && Math.abs(l - s) <= 1.5;
        let u = !r.paused;
        if (d && t && r.paused)
          try {
            (await r.play(), (u = !r.paused));
          } catch {
            u = !1;
          }
        return {
          restored: d,
          requestedMediaTime: Number(e),
          targetMediaTime: s,
          restoredMediaTime: Number.isFinite(l) ? l : null,
          playbackResumed: u,
          paused: Boolean(r.paused),
          readyState: Number(r.readyState || 0),
          error: c,
        };
      },
    },
    12e3,
    "MSE reload playback restore",
  );
  return r?.[0]?.result || { restored: !1, reason: "restore-result-missing" };
}
async function Ss(e, t) {
  const a = {
      hookVersion: null,
      staleReloaded: !1,
      documentStartReloaded: !1,
      documentStartVerified: !1,
      playbackRestored: !1,
      restoredMediaTime: null,
    },
    n = await bs(e.id, 750),
    r = Boolean(
      n?.installed &&
        null !== dl(n?.hookVersion) &&
        String(n?.installDocumentId || "").trim() &&
        !0 === n?.installedDuringDocumentLoading &&
        "loading" === String(n?.installDocumentReadyState || ""),
    );
  let i = n;
  if (!r) {
    try {
      await ms(e.id);
    } catch (e) {
      console.warn("[service-worker] MSE hook inject failed:", e.message);
    }
    i = await bs(e.id, 2500);
  }
  a.hookVersion = dl(i?.hookVersion);
  const s = Boolean(
      i?.installed && null !== a.hookVersion && a.hookVersion < fs,
    ),
    o = Boolean(!r && hl(e.url || ""));
  if (!s && !o)
    return (
      (a.documentStartVerified =
        r && null !== a.hookVersion && a.hookVersion >= fs),
      a
    );
  const c = String(i?.installDocumentId || n?.installDocumentId || "").trim(),
    l = gs.get(e.id);
  if (l && c && l.documentId === c)
    throw new Error(
      "MSE 音訊擷取尚未就緒；這個頁面已重新整理過一次，請確認已更新並重新載入插件後再試。",
    );
  (gs.set(e.id, {
    documentId: c || `missing:${String(e.url || "")}`,
    attemptedAt: Date.now(),
  }),
    (a.staleReloaded = s),
    (a.documentStartReloaded = o),
    console.warn(`[service-worker] reloading source tab ${e.id} for MSE hook`, {
      hookVersion: a.hookVersion,
      expectedHookVersion: fs,
      staleHook: s,
      needsDocumentStartReload: o,
    }));
  const d = dl(i?.currentTime ?? t?.timing?.currentTime),
    u = "boolean" == typeof i?.paused ? !i.paused : !1 === t?.timing?.paused,
    m = ys(e.url, d);
  try {
    (m
      ? await chrome.tabs.update(e.id, { url: m })
      : await chrome.tabs.reload(e.id),
      await so(e.id, 2e4));
  } catch (e) {
    throw (
      console.warn("[service-worker] source tab reload failed:", e.message),
      new Error(`MSE 音訊攔截需要重新整理頁面，但重新整理失敗：${e.message}`)
    );
  }
  try {
    await Cs(e.id, void 0, { mseAudioHook: !0 });
  } catch (e) {
    console.warn("[service-worker] content script reinject failed:", e.message);
  }
  ((i = await bs(e.id, 6e3, {
    minimumVersion: fs,
    previousDocumentId: c,
    requireDocumentStart: !0,
  })),
    (a.hookVersion = dl(i?.hookVersion)));
  const f = String(i?.installDocumentId || "").trim();
  if (
    ((a.documentStartVerified = Boolean(
      i?.installed &&
        null !== a.hookVersion &&
        a.hookVersion >= fs &&
        !0 === i?.installedDuringDocumentLoading &&
        "loading" === String(i?.installDocumentReadyState || "") &&
        Boolean(f) &&
        (!c || f !== c),
    )),
    !a.documentStartVerified)
  )
    throw (
      console.warn("[service-worker] MSE preflight snapshot did not settle", {
        expectedHookVersion: fs,
        hookVersion: a.hookVersion,
        documentChanged: Boolean(f && f !== c),
        installDocumentReadyState: i?.installDocumentReadyState || "",
        installedDuringDocumentLoading:
          !0 === i?.installedDuringDocumentLoading,
      }),
      gs.set(e.id, {
        documentId: f || c || `missing:${String(e.url || "")}`,
        attemptedAt: Date.now(),
      }),
      new Error(
        "MSE 音訊攔截重新載入後仍未通過啟動檢查，已停止本次字幕以避免產生漏段。",
      )
    );
  if (
    (gs.delete(e.id), m || (!wl(e.url || "") && !Sl(e.url || "")) || null === d)
  )
    a.restoredMediaTime = dl(i?.currentTime ?? d);
  else {
    const t = await ws(e.id, d, { resumePlayback: u });
    if (
      ((a.playbackRestored = !0 === t?.restored),
      (a.restoredMediaTime = dl(t?.restoredMediaTime)),
      d > 1 && !a.playbackRestored)
    ) {
      const t = Sl(e.url || "") ? "Xvideos" : "MissAV";
      throw new Error(
        `${t} 重新整理後無法恢復原播放位置，已停止本次字幕以避免時間軸錯位。`,
      );
    }
  }
  return a;
}
function vs(e = {}, t = {}) {
  return !!Is(t) && hl(e?.url || t?.pageUrl || "");
}
function Is(e = {}) {
  return Boolean(
    e?.mseAudioBufferEnabled || gc(e?.captionMode) || gc(e?.audioInputMode),
  );
}
async function Ts(e, t = {}) {
  (t.mseAudioHook && (await ms(e)),
    await us(
      {
        target: { tabId: e },
        files: [
          "wallet-interactions.js",
          "live-chat-shared.js",
          "caption-balance-display.js",
          "content-script.js",
        ],
      },
      4e3,
      "content script injection",
    ));
}
function Ms(e) {
  return /Frame with ID .* was removed|No frame with id|frame.*removed|The frame was removed|document unloaded|navigation.*in progress|script injection timed out|hook injection timed out/i.test(
    e?.message || "",
  );
}
async function ks(e, t = 400) {
  return Rl(
    chrome.tabs.sendMessage(e, { type: "LIVE_SUBTITLE_CONTENT_SCRIPT_PROBE" }),
    t,
    null,
  )
    .then((e) => !0 === e?.ready)
    .catch(() => !1);
}
async function Es(e, t = 3e3, a = 350) {
  const n = Date.now();
  let r = 0,
    i = "",
    s = null;
  for (; Date.now() - n < t; ) {
    const t = await chrome.tabs.get(e).catch(() => null);
    if (!t?.id) throw new Error("影片分頁已關閉，無法啟動字幕。");
    s = t;
    const n = String(t.url || ""),
      o = String(t.pendingUrl || "");
    if ("complete" === t.status && tc(n) && !o) {
      if (i !== n) ((i = n), (r = Date.now()));
      else if (Date.now() - r >= a) return t;
    } else ((i = ""), (r = 0));
    await Dl(100);
  }
  return s?.id && tc(s.url || "") ? s : null;
}
async function Cs(e, t = 3e4, a = {}) {
  const n = Date.now();
  let r = null,
    i = 0,
    s = !1;
  for (; Date.now() - n < t; ) {
    if (await ks(e, 600)) return;
    try {
      return void (await Ts(e, a));
    } catch (a) {
      r = a;
      const o = await chrome.tabs.get(e).catch(() => null);
      if (!o?.id) throw new Error("影片分頁已關閉，無法啟動字幕。");
      if (Ms(a)) {
        if (((i += 1), await ks(e))) return;
        const r = Math.max(0, t - (Date.now() - n));
        if (
          (await Es(e, Math.min(3e3, r)).catch(() => null),
          !s &&
            i >= 2 &&
            /timed out/i.test(a?.message || "") &&
            Date.now() - n < t - 5e3)
        ) {
          ((s = !0), await chrome.tabs.reload(e).catch(() => {}));
          const a = Math.max(0, t - (Date.now() - n));
          await Es(e, Math.min(1e4, a)).catch(() => null);
        }
      } else await Dl(250);
    }
  }
  if (Ms(r))
    throw new Error(`影片分頁持續重新載入，字幕無法完成掛載：${r.message}`);
  throw new Error(r?.message || "content script 注入逾時");
}
async function Ls(e, t = "") {
  const a = Number(e);
  if (!Number.isFinite(a))
    return { ok: !1, error: "缺少目前分頁 ID，無法掃描聊天室。" };
  let n = await chrome.scripting.executeScript({
    target: { tabId: a, allFrames: !0 },
    func: Ds,
    args: [t],
  });
  if (n.some((e) => e.result?.needsChatHelper)) {
    const e = [
      ...new Set(
        n.filter((e) => e.result?.needsChatHelper).map((e) => e.frameId),
      ),
    ];
    if (e.some((e) => !Number.isInteger(e) || e < 0))
      return {
        ok: !1,
        code: "chat-frame-unavailable",
        error: "聊天室分頁正在載入，稍後會自動重試。",
      };
    (await chrome.scripting.executeScript({
      target: { tabId: a, frameIds: e },
      files: ["live-chat-shared.js"],
    }),
      (n = await chrome.scripting.executeScript({
        target: { tabId: a, allFrames: !0 },
        func: Ds,
        args: [t],
      })));
  }
  const r = [],
    i = new Set();
  let s = !1, chatReplay = false;
  for (const e of n || []) {
    const a = e?.result || {};
    a.isLiveChatFrame && (s = !0);
    a.chatReplay === true && (chatReplay = true);
    for (const e of a.messages || []) {
      const a = Rs(e.text);
      if (!a) continue;
      const n = Rs(e.author),
        s = Rs(e.platform),
        o = Rs(e.sourceMessageId),
        c = (e.parts || [])
          .filter((e) => "image" === e.type)
          .map((e) => e.src)
          .join("|"),
        l = o
          ? `id:${s.toLowerCase() || "unknown"}:${o.toLowerCase()}`
          : `${n.toLowerCase().replace(/\s+/g, "")}:${a.toLowerCase().replace(/\s+/g, "")}:${c}`;
      if (i.has(l)) continue;
      i.add(l);
      const d = Array.isArray(e.parts)
          ? e.parts
              .slice(0, 120)
              .map((e) => ({
                type: e?.type,
                text: String(e?.text || "").slice(0, 2e3),
                src: String(e?.src || "").slice(0, 2048),
                alt: String(e?.alt || "").slice(0, 100),
                kind: "sticker" === e?.kind ? "sticker" : "emote",
              }))
          : [],
        u = e.authorMeta,
        m =
          u && "object" == typeof u
            ? {
                avatar: String(u.avatar || "").slice(0, 2048),
                role: ["owner", "moderator", "member"].includes(u.role)
                  ? u.role
                  : "viewer",
                badges: Array.isArray(u.badges)
                  ? u.badges
                      .slice(0, 3)
                      .map((e) => ({
                        src: String(e?.src || "").slice(0, 2048),
                        label: String(e?.label || "").slice(0, 80),
                      }))
                  : [],
              }
            : null,
        f =
          t && Number.isFinite(e.timing?.observedAtMs)
            ? {
                observedAtMs: e.timing.observedAtMs,
                basis: "dom-first-observed",
                sourceClock: e.timing.sourceClock || null,
              }
            : null;
      r.push({
        author: n,
        text: a,
        platform: s,
        sourceMessageId: o,
        ...(f ? { timing: f } : {}),
        ...(d.length ? { parts: d } : {}),
        ...(m ? { authorMeta: m } : {}),
      });
    }
  }
  return !s && n.some((e) => e.result?.needsChatHelper)
    ? {
        ok: !1,
        code: "chat-helper-unavailable",
        error: "聊天室擷取元件尚未就緒，稍後會自動重試。",
      }
    : { ok: !0, scannedLiveChatFrame: s, chatAvailable: s, chatReplay, messages: r.slice(-80) };
}
async function As(e = {}, t = {}) {
  const a = await Vo(e, t),
    n = Number(t.tab?.id),
    r = Boolean(
      e.sessionId ||
        "active-session" === e.source ||
        e.useSourceTab ||
        "capture" === e.sourceTab,
    );
  return !r || (a && Gi(a, e.sessionId))
    ? (r &&
        (n === a.tabId ||
          n === a.displayTabId ||
          n === a.captureTabId ||
          n === a.sourceTabId) &&
        (a.captureTabId || a.sourceTabId)) ||
        n
    : null;
}
function Ds(e = "") {
  const t = globalThis.SubruuLiveChat;
  if (
    !(t?.version >= 3) ||
    [
      "readAuthor",
      "readAuthorMeta",
      "readParts",
      "plainText",
      "trackSourceMessages",
    ].some((e) => "function" != typeof t[e])
  )
    return { needsChatHelper: !0, messages: [] };
  function a(e) {
    return String(e || "")
      .replace(/\s+/g, " ")
      .trim();
  }
  function n(e) {
    if (!e) return "";
    const t = [],
      n = (e) => {
        if (!e) return;
        if (3 === Number(e.nodeType))
          return void (e.textContent && t.push(e.textContent));
        if (1 !== Number(e.nodeType)) return;
        const a = String(e.tagName || e.nodeName || "").toUpperCase();
        if (["STYLE", "SCRIPT", "TEMPLATE", "NOSCRIPT"].includes(a)) return;
        if ("IMG" === a || "SVG" === a) {
          const a = r(e, ["alt", "aria-label", "title"]);
          return void (a && t.push(a));
        }
        if ("BR" === a) return void t.push(" ");
        const i = Array.from(e.childNodes || []);
        i.length ? i.forEach(n) : e.textContent && t.push(e.textContent);
      };
    return (n(e), a(t.join(" ")));
  }
  function r(e, t = []) {
    for (const n of t) {
      const t = a(e?.getAttribute?.(n) || "");
      if (t) return t;
    }
    return "";
  }
  function i(e) {
    return (
      r(e, ["data-message-id", "data-comment-id", "data-id", "id"]) ||
      a(e?.id || "")
    );
  }
  function s(e) {
    const t = SubruuLiveChat.readAuthor(e, n(e.querySelector("#author-chip"))),
      r = SubruuLiveChat.readParts(
        e.querySelector("#message") ||
          e.querySelector("#sticker") ||
          e.querySelector("#content, #header-content-primary-column"),
      ),
      s = SubruuLiveChat.plainText(r);
    return {
      author: t,
      text: a(
        [n(e.querySelector("#purchase-amount, #content-primary-column")), s]
          .filter(Boolean)
          .join(" "),
      ),
      platform: "youtube",
      authorMeta: SubruuLiveChat.readAuthorMeta(e),
      parts: r,
      sourceMessageId: i(e),
    };
  }
  function o(e) {
    const t = SubruuLiveChat.readAuthor(e),
      n =
        e.querySelector(
          '[data-a-target="chat-line-message-body"], [data-test-selector="chat-line-message-body"]',
        ) || e,
      r = SubruuLiveChat.readParts(n);
    return {
      author: t,
      text: a(SubruuLiveChat.plainText(r)),
      platform: "twitch",
      parts: r,
      sourceMessageId: i(e),
    };
  }
  function c(e) {
    return n(
      e.querySelector(
        [
          'a[href^="/"]:not([href*="/p/"]):not([href*="/reel/"]):not([href*="/stories/"])',
          "h3",
          "strong",
        ].join(","),
      ),
    );
  }
  function l(e) {
    const t = a(e);
    return !(
      t &&
      !/^(reply|view replies?|see translation|send message|add a comment|liked by|verified|live)$/i.test(
        t,
      ) &&
      !/^(回覆|查看回覆|查看翻譯|傳送訊息|新增留言|直播|返信|返答)$/i.test(t) &&
      !/^\d+[smhdw]$/i.test(t) &&
      !/^\d+\s*(秒|分鐘|小时|小時|天|週|周)$/i.test(t) &&
      !/^\d+$/.test(t)
    );
  }
  function d(e, t = "") {
    const r = a(t);
    let i = a(
      (function (e = []) {
        const t = [];
        for (const a of e) a && a !== t[t.length - 1] && t.push(a);
        return t;
      })(
        Array.from(
          e.querySelectorAll(
            'span[dir="auto"], div[dir="auto"], span:not([aria-hidden="true"])',
          ),
        )
          .map(n)
          .filter((e) => e && e !== r && !l(e)),
      ).join(" "),
    );
    if ((r && i.startsWith(r) && (i = a(i.slice(r.length))), i)) return i;
    let s = n(e);
    return (r && s.startsWith(r) && (s = a(s.slice(r.length))), l(s) ? "" : s);
  }
  function u(e) {
    const t = c(e);
    return {
      author: t,
      text: d(e, t),
      platform: "instagram",
      sourceMessageId: i(e),
    };
  }
  function m(e) {
    const t = n(e);
    if (!/^[a-z0-9._]{2,30}$/i.test(t)) return !1;
    const a = String(e?.getAttribute?.("href") || "");
    return (
      !a ||
      (!/\/(?:p|reel|stories|explore|direct|accounts|about|developer)\//i.test(
        a,
      ) &&
        /^\/[a-z0-9._]+\/?$/i.test(a))
    );
  }
  function f(e) {
    const t = n(e);
    let a = e?.parentElement || null;
    for (let e = 0; a && e < 8; e += 1, a = a.parentElement) {
      const e = n(a);
      if (
        e &&
        !(e.length > 500) &&
        e.includes(t) &&
        !a.querySelector?.("video") &&
        d(a, t)
      )
        return a;
    }
    return null;
  }
  const g = Array.from(
      document.querySelectorAll(
        [
          "yt-live-chat-text-message-renderer",
          "yt-live-chat-paid-message-renderer",
          "yt-live-chat-paid-sticker-renderer",
          "yt-live-chat-membership-item-renderer",
        ].join(","),
      ),
    ),
    h = Array.from(
      document.querySelectorAll('[data-a-target="chat-line-message"]'),
    ),
    p = (function () {
      if (!/(^|\.)instagram\.com$/i.test(location.hostname)) return [];
      const e = [
          ...document.querySelectorAll('div[role="dialog"] ul li'),
          ...document.querySelectorAll("main ul li"),
          ...document.querySelectorAll("section ul li"),
          ...document.querySelectorAll('div[aria-label*="comment" i]'),
          ...document.querySelectorAll('div[aria-label*="留言" i]'),
          ...Array.from(
            document.querySelectorAll(
              [
                'a[href^="/"]:not([href*="/p/"]):not([href*="/reel/"]):not([href*="/stories/"])',
                "strong",
                'span[dir="auto"]',
              ].join(","),
            ),
          )
            .filter(m)
            .map(f)
            .filter(Boolean),
        ],
        t = new Set();
      return e.filter(
        (e) =>
          !(!e || t.has(e)) &&
          (t.add(e),
          (function (e) {
            const t = n(e);
            if (!t || t.length < 2 || t.length > 500) return !1;
            const a = c(e),
              r = d(e, a);
            return Boolean(
              r && (a || /instagram\.com/i.test(location.hostname)),
            );
          })(e)),
      );
    })(),
    b =
      /youtube\.com\/live_chat|youtube\.com\/live_chat_replay/i.test(
        location.href,
      ) ||
      Boolean(
        document.querySelector("yt-live-chat-app, ytd-live-chat-frame"),
      ) ||
      g.length > 0 ||
      h.length > 0 ||
      p.length > 0,
    y = [
      ...g.map((e) => ({ node: e, message: s(e) })),
      ...h.map((e) => ({ node: e, message: o(e) })),
      ...p.map((e) => ({ node: e, message: u(e) })),
    ];
  const visibleChatElement=node=>{
    if(!node?.isConnected) return false;
    const rect=node.getBoundingClientRect();
    if(rect.width<=0||rect.height<=0||!node.getClientRects().length) return false;
    for(let ancestor=node;ancestor;ancestor=ancestor.parentElement) {
      if(ancestor.hidden||ancestor.hasAttribute('collapsed')||ancestor.getAttribute('aria-hidden')==='true') return false;
      const style=ancestor.ownerDocument.defaultView.getComputedStyle(ancestor);
      if(style.display==='none'||['hidden','collapse'].includes(style.visibility)) return false;
    }
    return true;
  };
  const chatContextVisible=window===window.top || visibleChatElement(window.frameElement);
  const chatFrames=Array.from(document.querySelectorAll('iframe')).filter(visibleChatElement);
  const chatUrls=chatContextVisible ? [location.href,...chatFrames.map(frame=>frame.getAttribute('src')).filter(Boolean)] : [];
  let chatReplay=false, youtubeChatFrame=false;
  for(const value of chatUrls) {
    try {
      const url=new URL(value,location.href);
      if((url.hostname==='youtube.com'||url.hostname.endsWith('.youtube.com')) && /^\/live_chat(?:_replay)?\/?$/.test(url.pathname)) {
        youtubeChatFrame=true;
        if(url.pathname.includes('_replay')) chatReplay=true;
      }
    } catch {}
  }
  const onYouTube=location.hostname==='youtube.com'||location.hostname.endsWith('.youtube.com');
  const embeddedYouTubeChat=chatFrames.some(frame=>frame.id==='chatframe' && !String(frame.getAttribute('src')||'').trim() && !String(frame.src||'').trim() && visibleChatElement(frame.closest('ytd-live-chat-frame')));
  return {
    isLiveChatFrame: onYouTube ? chatContextVisible && (youtubeChatFrame || embeddedYouTubeChat || Array.from(document.querySelectorAll('yt-live-chat-app')).some(visibleChatElement) || g.some(visibleChatElement)) : b,
    chatReplay,
    messages: (e
      ? SubruuLiveChat.trackSourceMessages(`${e}:${location.href}`, y)
      : y.map((e) => e.message)
    )
      .filter((e) => e.text)
      .slice(-80),
  };
}
function Rs(e) {
  return String(e || "")
    .replace(/\s+/g, " ")
    .trim();
}
async function _s(e, t) {
  await import("./live-chat-shared.js");
  const a = await Vo(e, t);
  if (
    !(
      e.sessionId &&
      a &&
      Gi(a, e.sessionId) &&
      t.id === chrome.runtime.id &&
      0 === t.frameId &&
      Number.isInteger(t.tab?.id) &&
      [a.tabId, a.displayTabId, a.captureTabId, a.sourceTabId].includes(
        t.tab.id,
      )
    )
  )
    throw new Error("字幕工作已結束或來源視窗不符，未送出。");
  const n = a.captureTabId || a.sourceTabId || a.tabId,
    r = await chrome.tabs.get(n),
    i = SubruuLiveChat.roomKey(r.url);
  if (!i || (r.pendingUrl && SubruuLiveChat.roomKey(r.pendingUrl) !== i))
    throw new Error(
      "目前僅支援原 YouTube／Twitch 直播聊天室；來源切換中或平台不支援。",
    );
  return {
    tabId: n,
    roomKey: i,
    senderTabId: t.tab.id,
    sessionId: e.sessionId,
  };
}
async function Ns(e, t) {
  try {
    const n = await _s(e, t),
      r = await chrome.scripting.executeScript({
        target: { tabId: n.tabId, allFrames: !0 },
        func: SubruuLiveChat.composerAction,
        args: [{ action: "inspect", roomKey: n.roomKey }],
      }),
      i = r.filter((e) => e.result?.ok);
    if (1 !== i.length)
      return {
        ok: !1,
        error:
          i.length > 1
            ? "找到多個聊天室輸入框，為避免發錯位置，未送出。"
            : r.find((e) => e.result?.error?.includes("草稿"))?.result.error ||
              "找不到可發言的原聊天室，請確認已登入、展開聊天室且不是重播。",
      };
    for (const [e, t] of a) t.expiresAt < Date.now() && a.delete(e);
    if (a.size >= 50) return { ok: !1, error: "待處理回覆過多，請稍後再試。" };
    const s = crypto.randomUUID(),
      o = i[0];
    return (
      a.set(s, {
        ...n,
        frameId: o.frameId,
        documentId: o.documentId,
        expiresAt: Date.now() + 9e4,
        consumed: !1,
        result: null,
      }),
      { ok: !0, grantId: s, platform: o.result.platform, limit: o.result.limit }
    );
  } catch (e) {
    return { ok: !1, error: e.message || "無法準備原聊天室。" };
  }
}
async function Ps(e, t) {
  const n = a.get(e.grantId);
  if (!n || n.expiresAt < Date.now())
    return { ok: !1, error: "送出授權已過期，未重新發送。", uncertain: !1 };
  try {
    const a = await _s(e, t);
    if (
      a.senderTabId !== n.senderTabId ||
      a.sessionId !== n.sessionId ||
      a.tabId !== n.tabId ||
      a.roomKey !== n.roomKey
    )
      throw new Error("影片或聊天室已切換，未送出。");
    const r = Rs(e.text);
    if (!r || r.length > 2e3) throw new Error("回覆內容無效或過長。");
    if (n.consumed) {
      if (n.text !== r) throw new Error("同一送出授權不可改寫內容。");
      return n.result;
    }
    return (
      (n.consumed = !0),
      (n.text = r),
      (n.result = chrome.scripting
        .executeScript({
          target: {
            tabId: n.tabId,
            ...(n.documentId
              ? { documentIds: [n.documentId] }
              : { frameIds: [n.frameId] }),
          },
          func: SubruuLiveChat.composerAction,
          args: [{ action: "send", roomKey: n.roomKey, text: r }],
        })
        .then(
          (e) =>
            e[0]?.result || {
              ok: !1,
              uncertain: !0,
              error: "送出狀態未確認，請查看原聊天室，勿重複送出。",
            },
        )
        .catch(() => ({
          ok: !1,
          uncertain: !0,
          error: "送出時連線中斷，請查看原聊天室，勿重複送出。",
        }))),
      n.result
    );
  } catch (e) {
    return { ok: !1, uncertain: !1, error: e.message };
  }
}
async function Us(e, t = 2500) {
  const a = Date.now();
  let n = null;
  for (; Date.now() - a < t; ) {
    try {
      const t = await chrome.tabs.sendMessage(e, {
        type: "LIVE_SUBTITLE_PAGE_INFO_REQUEST",
      });
      if (t?.ok) return t;
    } catch (e) {
      n = e;
    }
    await Dl(200);
  }
  throw new Error(n?.message || "頁面資訊取得逾時");
}
async function xs({
  tabId: e,
  expectedUrl: t = "",
  initialPageInfo: a = null,
  reportedTiming: n = null,
  preferCurrentPageTiming: r = !1,
  guard: i = null,
} = {}) {
  const s = "function" == typeof i ? i : () => !0,
    o = dl(n?.currentTime),
    c = Qs(t);
  let l = Os(a, t) ? a : null,
    d = l?.timing || n || null,
    u = dl(l?.timing?.currentTime) ?? o,
    m = Boolean(xc(l) || !0 === n?.isLiveStream),
    f = l ? 1 : 0,
    g = l ? "page-info" : n ? "reported-timing" : "unavailable";
  const h = Date.now(),
    p = Boolean(r && !1 !== l?.timing?.found && null !== u);
  if (Boolean(!p && !m && null !== c && c > Z && (null === u || c - u >= 3)))
    return {
      pageInfo: l,
      mediaTime: c,
      reportedMediaTime: o,
      isLiveStream: m,
      source: "url-start-time-ahead",
      waitedMs: 0,
      sampleCount: f,
    };
  if (!p && null !== u && u > Z)
    return {
      pageInfo: l,
      mediaTime: u,
      reportedMediaTime: o,
      isLiveStream: m,
      source: g,
      waitedMs: 0,
      sampleCount: f,
    };
  if (!p && !m && null !== c && c > Z)
    return {
      pageInfo: l,
      mediaTime: c,
      reportedMediaTime: o,
      isLiveStream: m,
      source: "url-start-time",
      waitedMs: 0,
      sampleCount: f,
    };
  if (!Number.isInteger(Number(e)) || !Il(t))
    return {
      pageInfo: l,
      mediaTime: u,
      reportedMediaTime: o,
      isLiveStream: m,
      source: g,
      waitedMs: 0,
      sampleCount: f,
    };
  const b = u;
  let y = u,
    w = u;
  for (; Date.now() - h < Q; ) {
    s();
    const a = Q - (Date.now() - h);
    (await Dl(Math.max(1, Math.min(X, a))), s());
    const n = await Us(Number(e), 700).catch(() => null);
    if ((s(), !Os(n, t))) continue;
    ((l = n), (d = n?.timing || d), (m = Boolean(xc(n) || m)), (f += 1));
    const r = dl(d?.currentTime);
    if (null === r) continue;
    if (((y = r), p && !0 !== d?.seeking))
      return {
        pageInfo: l,
        mediaTime: r,
        reportedMediaTime: o,
        isLiveStream: m,
        source: "preferred-page-clock",
        waitedMs: Date.now() - h,
        sampleCount: f,
      };
    const i = w;
    if (
      ((w = r),
      (m && r > Z) ||
        (null !== i && r - i >= 3) ||
        ((null === b || b <= Z) && r >= 6))
    )
      return {
        pageInfo: l,
        mediaTime: r,
        reportedMediaTime: o,
        isLiveStream: m,
        source: m ? "live-page-clock" : "youtube-resumed-position",
        waitedMs: Date.now() - h,
        sampleCount: f,
      };
    const c = Date.now() - h;
    if (c >= te && !1 === d?.paused && r <= 3)
      return {
        pageInfo: l,
        mediaTime: b ?? 0,
        reportedMediaTime: o,
        isLiveStream: m,
        source: "confirmed-video-beginning",
        waitedMs: c,
        sampleCount: f,
      };
  }
  return {
    pageInfo: l,
    mediaTime: p ? y : b,
    reportedMediaTime: o,
    isLiveStream: m,
    source: p
      ? "preferred-page-clock-timeout"
      : null === b
        ? "playback-position-unavailable"
        : "stable-zero-position",
    waitedMs: Date.now() - h,
    sampleCount: f,
  };
}
async function Bs({
  tabId: e,
  expectedUrl: t = "",
  initialPageInfo: a = null,
  guard: n = null,
} = {}) {
  const r = "function" == typeof n ? n : () => !0;
  let i = Os(a, t) ? a : null,
    s = Bc(i),
    o = i?.liveEvidence || i?.timing?.liveEvidence || "initial-page-info",
    c = i ? 1 : 0,
    l = 0,
    d = qs(i),
    u = d;
  const m = Date.now();
  if ("live" === s && Number.isInteger(Number(e)) && Il(t)) {
    const a = await Vs(Number(e), t);
    return (
      (l += 1),
      ("live" !== a.status && "vod" !== a.status) ||
        ((s = a.status), (o = a.evidence || o), (i = Ks(i, a, t))),
      {
        pageInfo: i,
        status: s,
        evidence: o,
        waitedMs: Date.now() - m,
        sampleCount: c,
        playerProbeCount: l,
        edgeGrowthSeconds: 0,
      }
    );
  }
  if ("unknown" !== s || !Number.isInteger(Number(e)) || !Il(t))
    return {
      pageInfo: i,
      status: s,
      evidence: o,
      waitedMs: 0,
      sampleCount: c,
      playerProbeCount: l,
      edgeGrowthSeconds: 0,
    };
  const f = async () => {
    r();
    const a = await Vs(Number(e), t);
    return (
      r(),
      (l += 1),
      ("live" === a.status || "vod" === a.status) &&
        ((s = a.status), (o = a.evidence), (i = Ks(i, a, t)), !0)
    );
  };
  if (await f())
    return {
      pageInfo: i,
      status: s,
      evidence: o,
      waitedMs: Date.now() - m,
      sampleCount: c,
      playerProbeCount: l,
      edgeGrowthSeconds: 0,
    };
  for (; Date.now() - m < ae; ) {
    r();
    const a = ae - (Date.now() - m);
    (await Dl(Math.max(1, Math.min(ne, a))), r());
    const n = await Us(Number(e), Math.max(100, Math.min(700, a))).catch(
      () => null,
    );
    if ((r(), !Os(n, t))) continue;
    ((i = n),
      (c += 1),
      (s = Bc(n)),
      (o = n?.liveEvidence || n?.timing?.liveEvidence || o));
    const g = qs(n);
    null !== g && (null === d && (d = g), (u = g));
    const h = null !== d && null !== u ? Math.max(0, u - d) : 0;
    if ("unknown" !== s)
      return {
        pageInfo: i,
        status: s,
        evidence: o,
        waitedMs: Date.now() - m,
        sampleCount: c,
        playerProbeCount: l,
        edgeGrowthSeconds: h,
      };
    if (h >= re)
      return {
        pageInfo: {
          ...i,
          isLiveStream: !0,
          liveClassification: "live",
          liveEvidence: "seekable-edge-growth",
        },
        status: "live",
        evidence: "seekable-edge-growth",
        waitedMs: Date.now() - m,
        sampleCount: c,
        playerProbeCount: l,
        edgeGrowthSeconds: h,
      };
    if (await f())
      return {
        pageInfo: i,
        status: s,
        evidence: o,
        waitedMs: Date.now() - m,
        sampleCount: c,
        playerProbeCount: l,
        edgeGrowthSeconds: h,
      };
  }
  return {
    pageInfo: i,
    status: "unknown",
    evidence: o || "youtube-live-probe-inconclusive",
    waitedMs: Date.now() - m,
    sampleCount: c,
    playerProbeCount: l,
    edgeGrowthSeconds: null !== d && null !== u ? Math.max(0, u - d) : 0,
  };
}
async function Vs(e, t = "") {
  const a = Tl(t);
  if (!Number.isInteger(Number(e)) || !a)
    return { status: "unknown", evidence: "yt-player-probe-invalid-context" };
  try {
    const t = await us(
        {
          target: { tabId: Number(e) },
          world: "MAIN",
          func: function (e) {
            const t = (e = "") => {
                try {
                  const t = new URL(String(e || ""), location.href);
                  if ("/watch" === t.pathname)
                    return t.searchParams.get("v") || "";
                  const a = t.pathname.split("/").filter(Boolean);
                  if (["live", "shorts", "embed"].includes(a[0]))
                    return a[1] || "";
                } catch {
                  return "";
                }
                return "";
              },
              a = document.getElementById("movie_player");
            if (!a)
              return {
                status: "unknown",
                evidence: "yt-player-not-ready",
                currentVideoId: t(location.href),
              };
            let n = null,
              r = null;
            try {
              n = "function" == typeof a.getVideoData ? a.getVideoData() : null;
            } catch {
              n = null;
            }
            try {
              ((r =
                "function" == typeof a.getPlayerResponse
                  ? a.getPlayerResponse()
                  : null),
                "string" == typeof r && (r = JSON.parse(r)));
            } catch {
              r = null;
            }
            if (!r?.videoDetails) {
              const e = globalThis.ytInitialPlayerResponse;
              e && "object" == typeof e && (r = e);
            }
            const i = String(n?.video_id || n?.videoId || ""),
              s = String(r?.videoDetails?.videoId || ""),
              o = String(
                document
                  .querySelector("ytd-watch-flexy[video-id]")
                  ?.getAttribute?.("video-id") || "",
              ),
              c = t(location.href) || i || s || o;
            if (!c || c !== e)
              return {
                status: "unknown",
                evidence: "yt-player-media-context-mismatch",
                currentVideoId: c,
                playerVideoId: i || s || o,
              };
            if (i && i !== e)
              return {
                status: "unknown",
                evidence: "yt-player-video-data-stale",
                currentVideoId: c,
                playerVideoId: i,
              };
            if (
              (s && s !== e && (r = null),
              !i && !String(r?.videoDetails?.videoId || ""))
            )
              return {
                status: "unknown",
                evidence: "yt-player-video-id-not-ready",
                currentVideoId: c,
              };
            const l =
                r?.microformat?.playerMicroformatRenderer?.liveBroadcastDetails
                  ?.isLiveNow,
              d = r?.videoDetails?.isLiveContent,
              u = n?.isLive,
              m = n?.isLiveContent,
              f = [
                r?.videoDetails?.isLiveDvrEnabled,
                r?.videoDetails?.isDvrEnabled,
                n?.isLiveDvrEnabled,
                n?.isDvrEnabled,
              ].find((e) => "boolean" == typeof e),
              g = {
                liveDvrKnown: "boolean" == typeof f,
                liveDvrEnabled: !0 === f,
              },
              h = String(r?.playabilityStatus?.status || "").toUpperCase();
            return !0 === l
              ? {
                  status: "live",
                  evidence: "yt-player-response-live-now",
                  currentVideoId: c,
                  ...g,
                }
              : (!0 !== d && !0 !== m) || !h || "OK" === h
                ? !1 === l
                  ? {
                      status: "vod",
                      evidence: "yt-player-response-not-live-now",
                      currentVideoId: c,
                    }
                  : !1 === d
                    ? {
                        status: "vod",
                        evidence: "yt-player-response-vod",
                        currentVideoId: c,
                      }
                    : !1 === m && !0 !== d
                      ? {
                          status: "vod",
                          evidence: "yt-player-video-data-vod",
                          currentVideoId: c,
                        }
                      : !0 === u
                        ? {
                            status: "live",
                            evidence: "yt-player-video-data-live",
                            currentVideoId: c,
                            ...g,
                          }
                        : !1 === u && !0 !== m && !0 !== d
                          ? {
                              status: "vod",
                              evidence: "yt-player-video-data-not-live",
                              currentVideoId: c,
                            }
                          : {
                              status: "unknown",
                              evidence: "yt-player-live-state-not-ready",
                              currentVideoId: c,
                              ...g,
                            }
                : {
                    status: "unknown",
                    evidence: "yt-player-scheduled-live-not-ready",
                    currentVideoId: c,
                  };
          },
          args: [a],
        },
        1e3,
        "YouTube player live classification",
      ),
      n = t?.[0]?.result;
    return "live" === n?.status || "vod" === n?.status
      ? n
      : { status: "unknown", evidence: n?.evidence || "yt-player-probe-empty" };
  } catch (e) {
    return {
      status: "unknown",
      evidence: "yt-player-probe-unavailable",
      error: String(e?.message || e || "").slice(0, 160),
    };
  }
}
function Ks(e = null, t = {}, a = "") {
  const n = "live" === t.status ? "live" : "vod",
    r = t.evidence || "yt-player-main-world",
    i = e?.videoId || t.currentVideoId || Tl(a),
    s = "live" === n && !0 === t.liveDvrKnown,
    o = s ? !0 === t.liveDvrEnabled : null;
  return {
    ...(e || {}),
    ok: !0,
    href: e?.href || a,
    videoId: i,
    mediaContextKey: i ? `youtube:${i}` : e?.mediaContextKey || "",
    canonicalMediaUrl: i ? no(i) : e?.canonicalMediaUrl || a,
    hasVideo: !0,
    isLiveStream: "live" === n,
    liveClassification: n,
    liveEvidence: r,
    youtubeLiveDvrKnown: s,
    youtubeLiveDvrEnabled: o,
    canSeekLiveBuffer: s
      ? o && !0 === e?.canSeekLiveBuffer
      : e?.canSeekLiveBuffer,
    timing: {
      ...(e?.timing || {}),
      found: !0,
      isLiveStream: "live" === n,
      liveClassification: n,
      liveEvidence: r,
      href: e?.timing?.href || e?.href || a,
    },
  };
}
function qs(e = null) {
  return dl(
    e?.timing?.liveEdgeSeconds ??
      e?.timing?.seekableEndSeconds ??
      e?.liveEdgeSeconds ??
      e?.seekableEndSeconds,
  );
}
function Os(e = null, t = "") {
  if (!e?.ok) return !1;
  const a = e.href || e.timing?.href || "";
  if (!a || !t) return !0;
  if (Ml(a, t)) return !0;
  const n = String(
      e.mediaContextKey || El(e.canonicalMediaUrl || "") || "",
    ).trim(),
    r = El(t);
  return Boolean(n && r && n === r);
}
async function $s(e, t = {}) {
  const a = { active: !0, openerTabId: e.id, url: zs(e.url, t) };
  return (
    Number.isInteger(Number(e.windowId)) && (a.windowId = Number(e.windowId)),
    "number" == typeof e.index && (a.index = e.index + 1),
    ro((await chrome.tabs.create(a)).id)
  );
}
async function Fs(e, t = null, a = {}) {
  const n = zs(e.url, a);
  return Gs(e, t) && chrome.tabs?.update
    ? a.preserveReusableDisplay && Ml(t.url || "", n)
      ? (await chrome.tabs.update(t.id, { active: !0 }).catch(() => {}),
        ro(t.id))
      : (await chrome.tabs.update(t.id, { active: !0, url: n }), ro(t.id))
    : $s(e, a);
}
async function Hs(e, { sessionId: t, config: a } = {}) {
  const n = Ws(e, { sessionId: t, config: a }),
    r = { active: !1, openerTabId: e.id, url: n };
  return (
    Number.isInteger(Number(e.windowId)) && (r.windowId = Number(e.windowId)),
    "number" == typeof e.index && (r.index = e.index + 1),
    chrome.tabs.create(r)
  );
}
async function js(
  e,
  { sessionId: t, config: a, reusableDisplayTab: n = null } = {},
) {
  const r = Ws(e, { sessionId: t, config: a });
  return Gs(e, n) && chrome.tabs?.update
    ? (await chrome.tabs.update(n.id, { url: r }), so(n.id))
    : Hs(e, { sessionId: t, config: a });
}
function Ws(e, { sessionId: t, config: a } = {}) {
  const n = new URL(chrome.runtime.getURL("mirror-viewer.html"));
  n.searchParams.set("sessionId", t || "");
  const r = a?.nativeStreamDelayEnabled
    ? sl(a?.syncDelaySeconds)
    : tl(a?.syncDelaySeconds);
  return (
    n.searchParams.set("delay", String(r)),
    n.searchParams.set("source", e?.url || ""),
    n.searchParams.set("uiLocale", String(a?.uiLocale || "zh_TW")),
    n.href
  );
}
function Gs(e, t = null) {
  return Boolean(e?.id && t?.id && t.id !== e.id);
}
function zs(e = "", t = {}) {
  const a = Tl(e);
  if (a) {
    const e = new URL("https://www.youtube.com/watch");
    (e.searchParams.set("v", a), e.searchParams.set("autoplay", "1"));
    const n = dl(t.startSeconds);
    return (
      !t.isLiveStream &&
        null !== n &&
        n > 0 &&
        e.searchParams.set("t", `${Math.max(0, Math.floor(n))}s`),
      e.href
    );
  }
  return Zs(e) || e;
}
const Js = $s,
  Ys = zs;
function Qs(e = "") {
  try {
    const t = new URL(String(e || ""));
    return Xs(
      t.searchParams.get("t") ||
        t.searchParams.get("start") ||
        t.hash.replace(/^#/, ""),
    );
  } catch {
    return null;
  }
}
function Xs(e = "") {
  const t = String(e || "")
    .trim()
    .toLowerCase();
  if (!t) return null;
  if (/^\d+(?:\.\d+)?$/.test(t)) return Math.max(0, Number(t));
  if (/^\d+(?:\.\d+)?s$/.test(t)) return Math.max(0, Number(t.slice(0, -1)));
  const a = t.match(
    /^(?:(\d+(?:\.\d+)?)h)?(?:(\d+(?:\.\d+)?)m)?(?:(\d+(?:\.\d+)?)s?)?$/,
  );
  if (!a || (!a[1] && !a[2] && !a[3])) return null;
  const n =
    3600 * Number(a[1] || 0) + 60 * Number(a[2] || 0) + Number(a[3] || 0);
  return Number.isFinite(n) ? Math.max(0, n) : null;
}
function Zs(e = "") {
  try {
    const t = new URL(e);
    if (!bl(t.href)) return "";
    const a = t.pathname.split("/").filter(Boolean),
      n = (a[0] || "").toLowerCase(),
      r = a[1] || "";
    if ("videos" === n && r)
      return `https://www.twitch.tv/videos/${encodeURIComponent(r)}`;
    if ("popout" === n && r)
      return `https://www.twitch.tv/${encodeURIComponent(r)}`;
    if (n && !tt.has(n))
      return `https://www.twitch.tv/${encodeURIComponent(a[0])}`;
  } catch {
    return "";
  }
  return "";
}
function eo(e = "") {
  try {
    const t = new URL(e);
    if (!bl(t.href)) return "";
    const a = t.pathname.split("/").filter(Boolean),
      n = (a[0] || "").toLowerCase();
    if (!n || tt.has(n) || "videos" === n) return "";
    if ("popout" === n) {
      const e = (a[1] || "").toLowerCase();
      return e && !tt.has(e) ? e : "";
    }
    return n;
  } catch {
    return "";
  }
}
function to(e = "") {
  try {
    const t = new URL(String(e || ""));
    return /^https?:$/i.test(t.protocol) ? t.href : "";
  } catch {
    return "";
  }
}
function ao(e = "", t = {}) {
  const a = Tl(e);
  return a ? no(a, t) : Zs(e) || e;
}
function no(e, t = {}) {
  const a = new URL("https://www.youtube.com/watch");
  a.searchParams.set("v", e);
  const n = dl(t.startSeconds);
  return (
    !t.isLiveStream &&
      null !== n &&
      n > 0 &&
      a.searchParams.set("t", `${Math.max(0, Math.floor(n))}s`),
    a.href
  );
}
async function ro(e, t = 15e3) {
  const a = Date.now();
  for (; Date.now() - a < t; ) {
    const t = await chrome.tabs.get(e).catch(() => null);
    if (t?.id && tc(t.url || "") && "complete" === t.status) return t;
    await Dl(250);
  }
  const n = await chrome.tabs.get(e).catch(() => null);
  if (n?.id && tc(n.url || "")) return n;
  throw new Error("viewer 分頁載入逾時");
}
async function io(e, t, a = 15e3) {
  const n = Date.now();
  let r = "",
    i = "",
    s = null;
  for (; Date.now() - n < a; ) {
    const a = await chrome.tabs.get(e).catch((e) => ((s = e), null));
    if (((r = String(a?.url || "")), a?.id && tc(r) && Ml(r, t)))
      try {
        await Cs(e, 1200);
        const n = await Us(e, 1e3);
        if (((i = String(n?.href || n?.timing?.href || "")), i && Ml(i, t)))
          return a;
      } catch (e) {
        s = e;
      }
    await Dl(250);
  }
  throw new Error(
    [
      "source 分頁換片逾時",
      `expected=${El(t) || t}`,
      `tab=${El(r) || r || "unknown"}`,
      `page=${El(i) || i || "unknown"}`,
      s?.message ? `detail=${s.message}` : "",
    ]
      .filter(Boolean)
      .join(" · "),
  );
}
async function so(e, t = 15e3) {
  const a = Date.now();
  for (; Date.now() - a < t; ) {
    const t = await chrome.tabs.get(e).catch(() => null);
    if (t?.id && "complete" === t.status) return t;
    await Dl(250);
  }
  const n = await chrome.tabs.get(e).catch(() => null);
  if (n?.id) return n;
  throw new Error("viewer 分頁載入逾時");
}
async function oo(e = null, t = null, a = {}) {
  if (!e || !t?.id) return null;
  if (a.requireCompletedStart && !0 !== e.startCompleted) return null;
  if (
    !Qi([e.tabId, e.captureTabId, e.sourceTabId, e.displayTabId]).includes(
      Number(t.id),
    )
  )
    return null;
  const n = e.captureTabId || e.sourceTabId || e.tabId,
    r = await ho(n);
  if (!r?.id || !tc(r.url || "")) return null;
  const i = e.displayTabId || e.tabId;
  return { sourceTab: r, displayTab: await ho(i) };
}
async function co({
  activeTab: e = null,
  reusableTabs: t = null,
  sourceTab: a = null,
  activePageInfoSnapshot: n = null,
} = {}) {
  if (!e?.id || !a?.id || e.id === a.id)
    return {
      sourceTab: a,
      activePageInfo: null,
      sourceStartSeconds: null,
      preserveDisplayTab: !1,
    };
  if (t?.displayTab?.id !== e.id)
    return {
      sourceTab: a,
      activePageInfo: null,
      sourceStartSeconds: null,
      preserveDisplayTab: !1,
    };
  if (!fl(e.url || ""))
    return {
      sourceTab: a,
      activePageInfo: null,
      sourceStartSeconds: null,
      preserveDisplayTab: !1,
    };
  let r = Os(n, e.url || "") ? n : null;
  if (!r)
    try {
      ((e = await io(e.id, e.url || "", 5e3)), (r = await Us(e.id, 1800)));
      const t = await xs({
        tabId: e.id,
        expectedUrl: e.url || r?.href || "",
        initialPageInfo: r,
        preferCurrentPageTiming: !0,
      });
      ((r = t.pageInfo || r),
        r?.timing &&
          null !== dl(t.mediaTime) &&
          (r = { ...r, timing: { ...r.timing, currentTime: t.mediaTime } }));
    } catch (e) {
      console.warn(
        "[service-worker] reusable viewer page info unavailable:",
        e.message,
      );
    }
  const i = r?.timing || null,
    s = xc(r),
    o = dl(i?.currentTime),
    c = s ? null : o,
    l = s ? Boolean(r?.hasVideo || i?.found) : null !== c,
    d = ao(e.url || "", { startSeconds: c, isLiveStream: s });
  if (!d || !tc(d) || !chrome.tabs?.update)
    return {
      sourceTab: a,
      activePageInfo: r,
      sourceStartSeconds: c,
      preserveDisplayTab: l,
    };
  const u = Ml(a.url || "", d),
    m = null !== c && Il(d) && (u || Il(a.url || ""));
  return !u || m
    ? (await chrome.tabs.update(a.id, { url: d, active: !1 }),
      {
        sourceTab: (a = await io(a.id, d)),
        activePageInfo: r,
        sourceStartSeconds: c,
        preserveDisplayTab: l,
      })
    : {
        sourceTab: a,
        activePageInfo: r,
        sourceStartSeconds: c,
        preserveDisplayTab: l,
      };
}
function lo({ sourcePageInfo: e = null, reusableStartContext: t = null } = {}) {
  const a = t?.activePageInfo || null;
  if (!xc(e) || !xc(a)) return null;
  const n = e?.timing || null,
    r = a?.timing || null,
    i = uo(n),
    s = uo(r),
    o = dl(r?.currentTime);
  if (null === i || null === s || null === o) return null;
  const c = dl(n?.wallTimeMs) || Date.now(),
    l = dl(r?.wallTimeMs) || c,
    d = Math.max(0, c - l) / 1e3,
    u = s + d,
    m = o + d * (r?.paused ? 0 : dl(r?.playbackRate) || 1),
    f = Math.max(0, u - m),
    g = Math.max(0, i - f),
    h = dl(n?.seekableStartSeconds) ?? 0,
    p = dl(n?.seekableEndSeconds) ?? i,
    b = Math.max(0, h),
    y = Math.max(b, p),
    w = Math.min(y, Math.max(b, g));
  return {
    targetMediaTime: w,
    requestedTargetMediaTime: g,
    viewerLiveDelaySeconds: f,
    sourceLiveEdge: i,
    viewerLiveEdge: u,
    sourceWindowLimited: Math.abs(w - g) > 0.05,
  };
}
function uo(e = null) {
  const t = dl(e?.currentTime),
    a = dl(e?.rawSeekableStartSeconds ?? e?.seekableStartSeconds),
    n = dl(e?.seekableEndSeconds ?? e?.liveEdgeSeconds);
  if (null !== t && null !== a && t < a - 3) return null;
  if (null !== t && null !== n && t > n + 3) return null;
  if (null !== t && null === a && null !== n && n - t > K) return null;
  if (null !== n) return n;
  const r = dl(e?.actualDelaySeconds);
  return null === t || null === r ? null : Math.max(0, t + Math.max(0, r));
}
const mo = 2.5;
async function fo({
  sourceTab: e,
  displayTab: t,
  sessionId: a,
  normalizedConfig: n,
  reusableStartContext: r,
} = {}) {
  if (
    !0 !== n?.sourceIsLiveStream ||
    !0 !== n?.syncEnabled ||
    null === dl(r?.sourceStartupSeekTargetMediaTime) ||
    !Number.isInteger(Number(e?.id)) ||
    !Number.isInteger(Number(t?.id)) ||
    t.id === e.id
  )
    return null;
  let i = null,
    s = null;
  try {
    [i, s] = await Promise.all([Us(e.id, 1800), Us(t.id, 1800)]);
  } catch (e) {
    return (
      console.warn(
        "[service-worker] startup alignment recheck skipped:",
        e.message,
      ),
      null
    );
  }
  const o = lo({
      sourcePageInfo: i,
      reusableStartContext: { activePageInfo: s },
    }),
    c = dl(r.sourceStartupSeekTargetMediaTime);
  if (!o || null === c) return null;
  const l = o.targetMediaTime - c;
  return Math.abs(l) < mo
    ? null
    : ((r.sourceStartupSeekTargetMediaTime = o.targetMediaTime),
      (r.sourceStartupLiveDelaySeconds = o.viewerLiveDelaySeconds),
      await li(
        a,
        "sync.source_startup_alignment.corrected",
        {
          correctionSeconds: Math.round(1e3 * l) / 1e3,
          previousTargetMediaTime: c,
          targetMediaTime: o.targetMediaTime,
          sourceCurrentTime: dl(i?.timing?.currentTime),
          viewerLiveDelaySeconds: dl(o.viewerLiveDelaySeconds),
          sourceLiveEdgeSeconds: dl(o.sourceLiveEdge),
          viewerLiveEdgeSeconds: dl(o.viewerLiveEdge),
          sourceWindowLimited: Boolean(o.sourceWindowLimited),
        },
        "warn",
      ),
      o.targetMediaTime);
}
async function go(e, t, a = {}, n = {}) {
  const r =
    dl(n?.sourceStartupSeekTargetMediaTime) ?? dl(n?.sourceStartSeconds);
  null === r ||
    r <= 0 ||
    (await Lo(
      e,
      {
        type: "LIVE_SUBTITLE_SOURCE_SEEK",
        sessionId: t,
        seekId: `startup:${t}:${Math.round(1e3 * r)}`,
        targetMediaTime: r,
        targetDelaySeconds: a.syncDelaySeconds ?? null,
        startupAlignment: !0,
        startupLiveDelaySeconds: dl(n?.sourceStartupLiveDelaySeconds),
        resetTimeline: !0,
      },
      "來源音訊起點對齊失敗",
      { timeoutMs: 7e3 },
    ));
}
async function ho(e) {
  const t = Number(e);
  return Number.isFinite(t) ? chrome.tabs.get(t).catch(() => null) : null;
}
function po(e, t = {}) {
  const a = Number(e);
  if (!Number.isFinite(a))
    return Promise.resolve({ ok: !0, ignored: !0, reason: "invalid-tab" });
  const n = String(t?.url || ""),
    r = El(n) || n || `tab:${a}`,
    i = st.get(a);
  if (i && !i.disposed && i.targetKey === r) return i.promise;
  i && (i.disposed = !0);
  const s = { targetKey: r, disposed: !1, promise: null },
    o = () => {
      if (s.disposed || st.get(a) !== s) {
        const e = new Error("managed-tab-navigation-rehydrate-superseded");
        throw ((e.code = "MANAGED_TAB_REHYDRATE_SUPERSEDED"), e);
      }
    };
  return (
    (s.promise = (async () => (
      await Dl(150),
      o(),
      wo(a, t, { targetKey: r, assertCurrentNavigation: o })
    ))().finally(() => {
      st.get(a) === s && st.delete(a);
    })),
    st.set(a, s),
    s.promise
  );
}
function bo(e, t = "cancelled") {
  const a = Number(e);
  if (!Number.isFinite(a)) return;
  const n = st.get(a);
  (n && (n.disposed = !0), st.delete(a));
}
function yo(e) {
  return (
    "MANAGED_TAB_REHYDRATE_SUPERSEDED" === e?.code ||
    /managed-tab-navigation-rehydrate-superseded/i.test(e?.message || "")
  );
}
async function wo(e, t = {}, a = {}) {
  const n = Number(e),
    r =
      "function" == typeof a.assertCurrentNavigation
        ? a.assertCurrentNavigation
        : () => {};
  r();
  let i = await Bo(n);
  if ((r(), !i)) return { ok: !0, ignored: !0, reason: "no-managed-session" };
  if (i.starting) return { ok: !0, ignored: !0, reason: "session-starting" };
  const s = (await ho(n)) || t;
  if ((r(), !s?.id || !tc(s.url || "")))
    return { ok: !0, ignored: !0, reason: "tab-url-not-injectable" };
  const o = El(s.url || "") || String(s.url || "");
  if (a.targetKey && o && o !== a.targetKey) {
    const e = new Error("managed-tab-navigation-rehydrate-superseded");
    throw ((e.code = "MANAGED_TAB_REHYDRATE_SUPERSEDED"), e);
  }
  const c = n === Number(i.captureTabId || i.sourceTabId || i.tabId);
  let l = !1,
    d = null;
  try {
    d = await Us(n, 600);
  } catch {
    (r(),
      await Cs(n, 6e3, { mseAudioHook: c && vs(s, i.config || {}) }),
      (l = !0),
      (d = await Us(n, 1500)));
  }
  if ((r(), So(i))) {
    const e = await vo(i, s, d, r);
    if ((r(), e.stopped || !1 === e.ok)) return e;
    i = (await Bo(n)) || i;
  }
  const u = await Io(i, s, a);
  r();
  const m = await Mo(n, {
    source: "tab-navigation-complete",
    required: !0,
    requireMounted: !0,
  });
  return (
    r(),
    (i = (await Bo(n)) || i),
    u?.reset &&
      m?.ok &&
      !m.ignored &&
      (await Eo(n, i.config || {}, i.sessionId, {
        tab: s,
        reason: "navigation-timeline-reset",
        retryPostedSegments: !0,
      }),
      r()),
    m?.ok &&
      !m.ignored &&
      "display" === m.role &&
      l &&
      (i.cachedSubtitleMode || i.hybridSubtitleCacheMode) &&
      (await To(i, n)),
    m?.ok &&
      !m.ignored &&
      (await li(i.sessionId, "session.tab_rehydrated", {
        tabId: n,
        role: m.role || "",
        mediaContextKey: o,
        contentScriptInjected: l,
      })),
    { ...m, timelineRecovery: u, contentScriptInjected: l, mediaContextKey: o }
  );
}
function So(e = {}) {
  return Boolean(
    e.sessionId &&
      !e.starting &&
      !e.syncEnabled &&
      !e.singleTabMediaSync &&
      !e.mirrorDelayEnabled &&
      !e.cachedSubtitleMode &&
      !e.hybridSubtitleCacheMode &&
      Number(e.captureTabId || e.tabId) === Number(e.displayTabId || e.tabId),
  );
}
async function vo(e, t, a, n = () => {}) {
  n();
  const r = Ra(e.config || {}),
    i = String(a?.mediaContextKey || El(t.url || "") || "");
  if (i && i === r)
    return { ok: !0, unchanged: !0, config: e.config, targetKey: i };
  const s = gl(t.url || "");
  if (!a?.hasVideo || !i || ("youtube" === s && !i.startsWith("youtube:")))
    return (
      await li(e.sessionId, "capture.navigation.no_media", {
        tabId: t.id,
        previousTargetKey: r,
        targetKey: i,
      }),
      await In({ sessionId: e.sessionId }, { tab: t }),
      { ok: !0, stopped: !0, reason: "left-media-page" }
    );
  const o = a.canonicalMediaUrl || t.url,
    c = dl(a.timing?.currentTime ?? a.currentTime) ?? 0,
    l = {
      ...Ba(e.config),
      pageUrl: o,
      canonicalPageUrl: o,
      sourceMediaContextKey: i,
      viewerMediaContextKey: i,
      youtubeVideoId: Tl(o),
      pageTitle: a.title || t.title || "",
      videoPlatform: s,
      initialPlaybackMediaTime: c,
      pageDurationSeconds: dl(a.timing?.duration),
      sourceIsLiveStream: xc(a),
      sourceLiveClassification: Bc(a),
    },
    d = await chrome.runtime.sendMessage({
      target: "offscreen",
      type: "CHANGE_CAPTURE_MEDIA_CONTEXT",
      sessionId: e.sessionId,
      config: l,
      targetMediaTime: c,
    });
  if ((n(), !d?.ok || d.ignored || d.mediaContextKey !== i))
    return {
      ok: !1,
      retryable: !0,
      error: d?.error || d?.reason || "media-context-update-failed",
    };
  const u = await Bo(t.id);
  return (
    n(),
    u?.sessionId !== e.sessionId
      ? { ok: !1, superseded: !0, reason: "session-changed" }
      : (await Fo({ ...u, config: l }),
        await Lo(
          t.id,
          { type: "LIVE_SUBTITLE_INIT", sessionId: e.sessionId, config: l },
          "換片後字幕初始化失敗",
          { requireMounted: !0, timeoutMs: 8e3 },
        ),
        n(),
        await li(e.sessionId, "instant_tab.media_change.committed", {
          previousTargetKey: r,
          targetKey: i,
          timelineRevision: d.timelineRevision,
          tabId: t.id,
        }),
        {
          ok: !0,
          config: l,
          targetKey: i,
          timelineRevision: d.timelineRevision,
        })
  );
}
async function Io(e = {}, t = {}, a = {}) {
  const n = e.config || {};
  if (
    e.starting ||
    !e.singleTabMediaSync ||
    e.syncEnabled ||
    e.cachedSubtitleMode ||
    e.hybridSubtitleCacheMode ||
    !1 !== n.sourceIsLiveStream ||
    (!n.mseAudioBufferEnabled && "mse-audio-buffer" !== n.audioInputMode)
  )
    return { reset: !1 };
  const r = Ra(n);
  if (!r || El(t.url || "") !== r)
    return { reset: !1, reason: "different-media" };
  const i = a.assertCurrentNavigation || (() => {}),
    s = await xs({
      tabId: t.id,
      expectedUrl: t.url,
      initialPageInfo: await Us(t.id),
      preferCurrentPageTiming: !0,
    });
  i();
  const o = dl(s.mediaTime),
    c = await Bo(t.id);
  if ((i(), null === o || o < 0 || c?.sessionId !== e.sessionId || c.starting))
    return { reset: !1, reason: "session-changed-or-no-clock" };
  if (!(await ds()))
    throw new Error("重新整理後找不到字幕工作，請重新開始字幕。");
  i();
  const l = await chrome.runtime.sendMessage({
    target: "offscreen",
    type: "RESET_SUBTITLE_TIMELINE",
    sessionId: e.sessionId,
    seekId: `navigation:${t.id}:${Date.now()}`,
    reason: "single-tab-document-navigation",
    targetMediaTime: o,
    targetDelaySeconds: n.syncDelaySeconds ?? null,
    viewerTiming: s.pageInfo?.timing || null,
  });
  if (
    (i(),
    !l?.ok ||
      l.ignored ||
      l.sessionId !== e.sessionId ||
      !Number.isInteger(l.timelineRevision) ||
      l.timelineRevision < 1)
  )
    throw new Error("重新整理後字幕時間軸恢復失敗，請重新開始字幕。");
  return (
    await li(e.sessionId, "session.mse_navigation_timeline_reset", {
      tabId: t.id,
      targetMediaTime: o,
      timelineRevision: l.timelineRevision,
      mediaContextKey: r,
    }),
    { reset: !0, targetMediaTime: o, timelineRevision: l.timelineRevision }
  );
}
async function To(e = {}, t = null) {
  const a = Number(t);
  if (!Number.isFinite(a) || !e?.sessionId || !e?.config?.backendUrl)
    return { ok: !1, ignored: !0, reason: "missing-session-context" };
  const n = await Zt();
  if (!n?.idToken) return { ok: !1, ignored: !0, reason: "missing-auth" };
  try {
    const t = await Ca(e.config, n, {
      markRead: !1,
      mediaTimeSeconds: e.config.initialPlaybackMediaTime,
      timeoutMs: De,
    });
    if (!Da(t, e.config))
      return (
        await li(
          e.sessionId,
          "subtitle.cache.rehydrate_miss",
          {
            tabId: a,
            expectedVideoKey: Ra(e.config),
            actualVideoKey: Aa(t),
            reason: t?.reason || "cache-unavailable",
          },
          "warn",
        ),
        { ok: !1, ignored: !0, reason: "cache-unavailable" }
      );
    const r = await ko(a, {
        type: "LIVE_SUBTITLE_EVENT",
        sessionId: e.sessionId,
        event: {
          kind: "status",
          status: e.hybridSubtitleCacheMode
            ? "hybrid-cache-ready"
            : "cached-subtitle-ready",
          message: e.hybridSubtitleCacheMode
            ? `已恢復部分快取字幕 ${t.segments.length.toLocaleString("en-US")} 段，缺口將即時補字幕`
            : `已恢復快取字幕 ${t.segments.length.toLocaleString("en-US")} 段`,
        },
      }),
      i = await ko(a, {
        type: "LIVE_SUBTITLE_EVENT",
        sessionId: e.sessionId,
        event: qa(t, e.config),
      });
    if (!i.ok)
      throw new Error(i.error || "cached subtitle replay delivery failed");
    return (
      await li(e.sessionId, "subtitle.cache.rehydrated", {
        tabId: a,
        videoKey: Aa(t),
        segments: t.segments.length,
        hybrid: Boolean(e.hybridSubtitleCacheMode),
        statusDelivered: Boolean(r.ok),
        markRead: !1,
      }),
      { ok: !0, segments: t.segments.length }
    );
  } catch (t) {
    return (
      await li(
        e.sessionId,
        "subtitle.cache.rehydrate_failed",
        { tabId: a, error: String(t?.message || t || "").slice(0, 300) },
        "warn",
      ).catch(() => {}),
      { ok: !1, error: t?.message || String(t) }
    );
  }
}
async function Mo(e, t = {}) {
  const a = Number(e);
  if (!Number.isFinite(a))
    return { ok: !0, ignored: !0, reason: "invalid-tab" };
  const n = await Bo(a);
  if (!n) return { ok: !0, ignored: !0, reason: "no-managed-session" };
  const r = Number(n.captureTabId || n.sourceTabId || n.tabId),
    i = Number(n.displayTabId || n.tabId),
    s = Boolean(
      n.starting && n.syncEnabled && Number.isFinite(i) && i === a && i !== r,
    );
  if (n.starting && "startup" !== t.source && !s)
    return { ok: !0, ignored: !0, reason: "session-starting" };
  const o = a === r;
  if (!o && a !== i) return { ok: !0, ignored: !0, reason: "unmanaged-tab" };
  const c = Boolean(n.syncEnabled && o),
    l = {
      type: c ? "LIVE_SUBTITLE_SOURCE_INIT" : "LIVE_SUBTITLE_INIT",
      config: n.config,
      sessionId: n.sessionId,
    },
    d = c ? "來源分頁導覽恢復失敗" : "字幕 viewer 導覽恢復失敗";
  if (t.required)
    await Lo(a, l, d, {
      requireMounted: !c && !1 !== t.requireMounted,
      timeoutMs: 6e3,
    });
  else {
    const e = await ko(a, l);
    if (!e.ok)
      return { ok: !1, error: e.error || d, role: c ? "source" : "display" };
  }
  return (
    c &&
      n.config?.sourceStartupCaptureHold &&
      !1 === n.starting &&
      (await Lo(
        a,
        {
          type: "LIVE_SUBTITLE_SOURCE_CAPTURE_READY",
          sessionId: n.sessionId,
          initialPlaybackMediaTime: n.config?.initialPlaybackMediaTime,
        },
        "來源分頁重掛後音訊起點放行失敗",
        { timeoutMs: 5e3 },
      ),
      await li(
        n.sessionId,
        "sync.source_startup_capture_hold.rehydrated_release",
        { tabId: a, source: String(t.source || "") },
      )),
    {
      ok: !0,
      sessionId: n.sessionId,
      role: c ? "source" : "display",
      source: String(t.source || ""),
    }
  );
}
async function ko(e, t) {
  try {
    return { ok: !0, response: await chrome.tabs.sendMessage(e, t) };
  } catch (e) {
    return (
      console.warn("[service-worker] tab message skipped:", e.message),
      { ok: !1, error: e?.message || String(e) }
    );
  }
}
async function Eo(e, t = {}, a = "", n = {}) {
  const r = n.tab || (await ho(e));
  if (!r?.id) return { ok: !1, error: "source tab unavailable" };
  if (!vs(r, t))
    return { ok: !0, ignored: !0, reason: "mse-audio-hook-not-requested" };
  const i = {
    type: "LIVE_SUBTITLE_MSE_AUDIO_REFRESH",
    config: t,
    sessionId: a,
    reason: n.reason || "",
    retryPostedSegments: Boolean(n.retryPostedSegments),
  };
  try {
    return await Lo(r.id, i, "MSE audio hook refresh failed", {
      timeoutMs: Number(n.timeoutMs || 1200),
    });
  } catch (e) {
    if (!Co(e)) throw e;
    console.warn(
      "[service-worker] reconnecting MSE audio source hook:",
      e.message,
    );
  }
  return (
    await Cs(r.id, void 0, { mseAudioHook: !0 }),
    await Lo(
      r.id,
      { type: "LIVE_SUBTITLE_SOURCE_INIT", config: t, sessionId: a },
      "來源分頁初始化失敗",
      { timeoutMs: 5e3 },
    ),
    Lo(r.id, i, "MSE audio hook refresh failed", {
      timeoutMs: Number(n.timeoutMs || 5e3),
    })
  );
}
function Co(e) {
  return /Could not establish connection|Receiving end does not exist|Extension context invalidated|message port closed|content script 無回應/i.test(
    e?.message || "",
  );
}
async function Lo(e, t, a = "分頁初始化失敗", n = {}) {
  const r = Number(n.timeoutMs || 6e3),
    i = Date.now();
  let s = null;
  for (; Date.now() - i < r; )
    try {
      const r = await chrome.tabs.sendMessage(e, t);
      if (!1 === r?.ok) throw new Error(r.error || a);
      if (n.requireMounted && r && !1 === r.mounted)
        throw new Error("字幕匡未掛載");
      return r || { ok: !0 };
    } catch (e) {
      ((s = e), await Dl(250));
    }
  throw new Error(`${a}: ${s?.message || "content script 無回應"}`);
}
async function Ao(e) {
  (await chrome.action.setBadgeText({ text: e ? "ON" : "" }),
    await chrome.action.setBadgeBackgroundColor({
      color: e ? "#16a34a" : "#64748b",
    }));
}
async function Do() {
  const e = await Uo();
  await Ao(e.length > 0);
}
function Ro(e) {
  const t = (e) =>
    Number.isSafeInteger(e?.availableCredits) && e.availableCredits >= 0
      ? e.availableCredits
      : null;
  if (1 !== e?.schemaVersion || null === t(e.general) || null === t(e.economy))
    throw new Error("Invalid wallet balance");
  const a = e.economyPass;
  return {
    status: "ready",
    fetchedAt: Date.now(),
    wallets: {
      general: { availableCredits: t(e.general) },
      economy: {
        availableCredits: t(e.economy),
        enabled: !1 !== e.economy.enabled,
      },
      economyPass: a
        ? { active: !0 === a.active, endsAtMs: a.endsAtMs, status: a.status }
        : null,
      routingPolicy: "automatic" === e.routingPolicy ? "automatic" : "manual",
      allowGeneralContinuation: !0 === e.allowGeneralContinuation,
    },
  };
}
async function _o() {
  const e = await chrome.storage.local.get([b, y]);
  return e?.[b] || e?.[y] || null;
}
async function No(e, t) {
  if(t.id!==chrome.runtime.id) return {ok:false,reason:'invalid-sender'};
  const active=await xo(e.sessionId);
  const mirror=String(t.url||'').split('?')[0]===chrome.runtime.getURL('mirror-viewer.html');
  if(!active || (!mirror && !Zo(active).includes(Number(t.tab?.id)))) return {ok:false,reason:'wrong-session'};
  const key=`textamisuLive:${e.sessionId}`, remote=(await chrome.storage.session.get(key))[key];
  const [accountResult, sessionResult]=await Promise.allSettled([
    TextamisuApi.credits({timeoutMs:6000}),
    remote?.sessionId ? TextamisuApi.session(remote.sessionId,{timeoutMs:6000}) : Promise.resolve(null),
  ]);
  const candidate=accountResult.status==='fulfilled' ? accountResult.value : null;
  const credits=typeof candidate?.totalMinutes==='number' && Number.isFinite(candidate.totalMinutes) && candidate.totalMinutes>=0 ? candidate : null;
  const candidateBilling=sessionResult.status==='fulfilled' ? sessionResult.value?.billing : null;
  const billing=candidateBilling && typeof candidateBilling==='object' && !Array.isArray(candidateBilling)
    && ['availableCredits','reservedCredits','chargedCredits'].every(field=>typeof candidateBilling[field]==='number' && Number.isFinite(candidateBilling[field]) && candidateBilling[field]>=0)
    ? candidateBilling : null;
  const classify=(error, fallback, isSession=false)=>{
    const timeout=error?.name==='TimeoutError' || error?.code==='request_timeout';
    const status=timeout ? 408 : Number(error?.status)||0;
    const code=isSession && status===404 ? 'live_session_unavailable' : timeout ? 'request_timeout' : typeof error?.code==='string' ? error.code : error?.transportError ? 'network_error' : fallback;
    return {code,status};
  };
  const balanceError=billing ? null : !remote?.sessionId
    ? {code:'session_pending',status:0}
    : classify(sessionResult.status==='rejected' ? sessionResult.reason : null,'billing_unavailable',true);
  const balanceState=billing ? 'ready' : remote?.sessionId ? 'session-error' : 'session-pending';
  if(!billing && !credits) {
    const accountError=classify(accountResult.status==='rejected' ? accountResult.reason : null,'credits_unavailable');
    const error=[accountError,balanceError].find(value=>[401,403].includes(value?.status))
      || (sessionResult.status==='rejected' ? balanceError : accountResult.status==='rejected' ? accountError : balanceState==='session-error' ? balanceError : accountError);
    return {ok:false,sessionId:e.sessionId,code:error.code,status:error.status,balanceState,balanceError};
  }
  return {ok:true,sessionId:e.sessionId,credits,billing,balanceState,...(balanceError ? {balanceError} : {})};
}
async function Po(e = {}) {
  if (at) return e.validate ? await Oo(at) : at;
  const t = await Uo(e);
  return ((at = t[0] || null), e.validate ? await Oo(at) : at);
}
async function Uo(e = {}) {
  if (Array.isArray(nt)) return e.validate ? await qo(nt) : nt;
  const t = await chrome.storage.session.get([o, s]),
    a = Array.isArray(t?.[o]) ? t[o] : t?.[s] ? [t[s]] : [];
  return ((nt = Xo(a.filter(Boolean))), e.validate ? await qo(nt) : nt);
}
async function xo(e, t = {}) {
  const a = String(e || "");
  return (a && (await Uo(t)).find((e) => e.sessionId === a)) || null;
}
async function Bo(e, t = {}) {
  const a = Number(e);
  return (
    (Number.isFinite(a) && (await Uo(t)).find((e) => Zo(e).includes(a))) || null
  );
}
async function Vo(e = {}, t = {}, a = {}) {
  if (void 0 !== e.sessionId && null !== e.sessionId && "" !== e.sessionId)
    return "string" == typeof e.sessionId ? xo(e.sessionId, a) : null;
  for (const t of ["tabId", "currentTabId", "displayTabId", "captureTabId"]) {
    if (!Object.hasOwn(e, t)) continue;
    const n = e[t],
      r =
        "number" == typeof n || ("string" == typeof n && /^\d+$/.test(n))
          ? Number(n)
          : NaN;
    return Number.isInteger(r) && r >= 0 ? Bo(r, a) : null;
  }
  if (t.tab) {
    const e = t.tab.id;
    return Number.isInteger(e) && e >= 0 ? Bo(e, a) : null;
  }
  return Po(a);
}
function Ko(e, t = {}) {
  if (!e || "undefined" == typeof chrome || t.id !== chrome.runtime.id)
    return null;
  try {
    const e = new URL(t.url || ""),
      a = new URL(chrome.runtime.getURL("popup.html"));
    if (
      e.protocol !== a.protocol ||
      e.host !== a.host ||
      e.pathname !== a.pathname
    )
      return null;
  } catch {
    return null;
  }
  const a = e.config || {};
  return Object.fromEntries(
    [
      "sourceLang",
      "targetLang",
      "sttProvider",
      "provider",
      "sttAudioSpeed",
      "sttLanguageMode",
      "sourceLanguageHints",
      "sttPrompt",
      "sttKeywords",
      "sttContextCustom",
      "translationPrompt",
      "translationPromptVideoId",
      "sttContextAutoResearchEnabled",
      "sttContextSearchDirection",
      "sttContextRefreshEnabled",
      "sttContextRefreshIntervalMinutes",
      "automaticSttContextStatus",
      "automaticSttContextVideoId",
      "automaticSttPrompt",
      "automaticSttKeywords",
      "automaticSttContextEditableApplied",
      "automaticSttContextBasePrompt",
      "automaticSttContextBaseKeywords",
      "llmFallbackMode",
      "segmentationMode",
      "vadEnabled",
      "autoSkipAds",
      "mseSeekCatchupEnabled",
      "audioPrefetchEnabled",
      "disableSubtitleCache",
      "mseStartupBoostEnabled",
      "mseStartupBoostMode",
      "mseStartupBoostTargetSeconds",
      "subtitleBufferTargetSegments",
      "finalBatchingEnabled",
    ]
      .filter((e) => Object.hasOwn(a, e))
      .map((e) => [e, a[e]]),
  );
}
async function qo(e = []) {
  const t = [];
  for (const a of e) {
    const e = await Oo(a);
    e && t.push(e);
  }
  return ((nt = Xo(t)), (at = nt[0] || null), await jo(), nt);
}
async function Oo(e) {
  if (!e) return null;
  const t = Number(e.startedAt || 0);
  if (e.syncEnabled && !e.displayTabId && t && Date.now() - t < 3e4) return e;
  const a = e.displayTabId || e.tabId,
    n = e.captureTabId || e.tabId,
    [r, i, s] = await Promise.all([$o(a), $o(n), ds()]),
    o = !e.cachedSubtitleMode && !na(e);
  return !r || !i || (o && !s)
    ? (await Yi(e, `display=${r} capture=${i} offscreen=${s}`), null)
    : e;
}
async function $o(e) {
  const t = Number(e);
  if (!Number.isFinite(t)) return !1;
  try {
    return (await chrome.tabs.get(t), !0);
  } catch {
    return !1;
  }
}
async function Fo(e) {
  const t = await Uo();
  ((nt = Xo([e, ...t.filter((t) => t.sessionId !== e.sessionId)])),
    (at = nt[0] || null),
    (rt = Qo(e)),
    await jo());
}
function Ho(e) {
  if (!e?.sessionId) return null;
  const t = Array.isArray(nt) ? nt : [];
  return (
    (nt = Xo([e, ...t.filter((t) => t?.sessionId !== e.sessionId)])),
    (at = nt[0] || e),
    at
  );
}
async function jo() {
  const e = Xo(Array.isArray(nt) ? nt : []);
  ((nt = e),
    (at = e[0] || null),
    await chrome.storage.session.set({ [o]: e, [s]: at, [c]: rt }));
}
async function Wo(e = null) {
  if (!e) {
    ((at = null), (nt = []), dt.clear());
    for (const e of [...st.keys()]) bo(e, "all-sessions-cleared");
    for (const e of [...it.keys()]) Jo(e, "all-sessions-cleared");
    return void (await chrome.storage.session.remove([s, o]));
  }
  zo(e, "clear-active-session");
  const t = await Uo(),
    a = t.find((t) => t.sessionId === e);
  for (const e of Zo(a || {})) bo(e, "session-cleared");
  ((nt = t.filter((t) => t.sessionId !== e)), (at = nt[0] || null), await jo());
}
async function Go(e = "") {
  const t = String(e || "");
  if (!t) return;
  const a = await Yo();
  String(a?.sessionId || "") === t &&
    ((rt = null), await chrome.storage.session.remove(c).catch(() => {}));
}
function zo(e = "", t = "") {
  const a = String(e || "");
  a &&
    (Qr(a),
    yt.delete(a),
    ft.delete(a),
    Jo(a, t || "session-resources-released"),
    Jo(`session:${a}`, t || "session-resources-released"));
}
function Jo(e, t = "viewer-media-change-cancelled") {
  const a = it.get(e);
  (a &&
    "object" == typeof a &&
    ((a.disposed = !0),
    (a.epoch = Math.max(0, Number(a.epoch || 0)) + 1),
    a.pendingJob?.resolve &&
      (a.pendingJob.resolve(Ki(a.pendingJob, "", t)), (a.pendingJob = null)),
    a.currentJob?.resolve && a.currentJob.resolve(Ki(a.currentJob, "", t))),
    it.delete(e));
}
async function Yo() {
  if (rt) return rt;
  const e = await chrome.storage.session.get(c);
  return ((rt = e?.[c] || null), rt);
}
function Qo(e) {
  if (!e) return null;
  const t = e.captureTabId || e.sourceTabId || e.tabId;
  return Number.isFinite(Number(t))
    ? {
        tabId: e.tabId ?? null,
        captureTabId: t,
        sourceTabId: t,
        displayTabId: e.displayTabId ?? null,
        captionMode: e.captionMode ?? e.config?.captionMode ?? Ie,
        syncEnabled: Boolean(e.syncEnabled),
        singleTabMediaSync: Boolean(e.singleTabMediaSync),
        mirrorDelayEnabled: Boolean(e.mirrorDelayEnabled),
        startCompleted: !1 === e.starting || !0 === e.cachedSubtitleMode,
        sessionId: e.sessionId || "",
        config: e.config || {},
        startedAt: e.startedAt || Date.now(),
        rememberedAt: Date.now(),
      }
    : null;
}
function Xo(e = []) {
  const t = new Set(),
    a = [];
  for (const n of e) {
    const e = n?.sessionId;
    e && !t.has(e) && (t.add(e), a.push(n));
  }
  return a;
}
function Zo(e = {}) {
  return Qi([e.tabId, e.captureTabId, e.sourceTabId, e.displayTabId]);
}
async function ec(e = null) {
  const t = await Uo({ validate: !0 }),
    a = new Set(
      (Array.isArray(e) ? e : [e]).map((e) => String(e || "")).filter(Boolean),
    );
  if (!(t.filter((e) => !a.has(e.sessionId)).length < 3))
    throw new Error("目前最多同時開啟 3 個字幕分頁，請先停止其中一個字幕。");
}
function tc(e = "") {
  return e.startsWith("http://") || e.startsWith("https://");
}
function ac(e) {
  const t = String(e || "")
    .toLowerCase()
    .trim();
  return ["mse-audio-buffer", "youtube-mse", "mse", "youtube-buffer"].includes(
    t,
  )
    ? Te
    : [
          "instant-overlay",
          "instant",
          "single-tab",
          "single-tab-instant",
        ].includes(t)
      ? Me
      : [
            "mirror-delay",
            "twitch-mirror",
            "twitch-mirror-delay",
            "instagram-mirror",
            "ig-mirror",
            "ig-mirror-delay",
          ].includes(t)
        ? ke
        : Ie;
}
function nc({
  enabled: e = !1,
  requestedCaptionMode: t = Ie,
  platform: a = "",
  sourceLiveClassification: n = "unknown",
  mseSupported: r = !1,
} = {}) {
  const i = ac(t),
    s = String(a || "")
      .toLowerCase()
      .trim(),
    o = ["live", "vod"].includes(n) ? n : "unknown";
  if (!e || (i !== Ie && i !== ke))
    return {
      enabled: !1,
      applied: !1,
      requestedCaptionMode: i,
      captionMode: i,
      reason: e ? "explicit-caption-mode" : "disabled",
    };
  let c = Me,
    l = "generic-html5";
  return (
    "vod" === o && r
      ? ((c = Te), (l = `${s}-vod-mse`))
      : "youtube" === s && "vod" !== o
        ? ((c = Ie), (l = `youtube-${o}`))
        : ("twitch" !== s && "instagram" !== s) ||
          ((c = "vod" === o ? Me : ke), (l = `${s}-${o}`)),
    {
      enabled: !0,
      applied: !0,
      requestedCaptionMode: i,
      captionMode: c,
      reason: l,
    }
  );
}
function rc(e) {
  if (Array.isArray(e)) return e;
  const t = String(e || "").trim();
  if (!t) return [];
  if (t.startsWith("["))
    try {
      const e = JSON.parse(t);
      if (Array.isArray(e)) return e;
    } catch {}
  return t.split(/[\n,;]+/u);
}
function ic(e) {
  const t = String(e || "auto")
    .toLowerCase()
    .trim();
  return ["auto", "single", "multi"].includes(t) ? t : "auto";
}
function sc(e) {
  return String(e || "")
    .replace(/\r\n?/gu, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]+/gu, " ")
    .replace(/[ \t]+/gu, " ")
    .replace(/\n{3,}/gu, "\n\n")
    .trim()
    .slice(0, 1e3);
}
function oc(e) {
  let t = 0xcbf29ce484222325n;
  for (const a of Array.from(String(e || "")))
    ((t ^= BigInt(a.codePointAt(0))),
      (t = BigInt.asUintN(64, 0x100000001b3n * t)));
  return t.toString(16).padStart(16, "0");
}
function cc(e = {}) {
  const t = sc(e?.sttContextSearchDirection);
  return t ? `prompt-${oc(t)}` : "";
}
function lc(e) {
  const t = Math.round(Number(e));
  return [3, 5, 10].includes(t) ? t : 3;
}
function dc(e) {
  return String(e || "")
    .replace(/\r\n?/gu, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]+/gu, " ")
    .replace(/[ \t]+/gu, " ")
    .replace(/\n{3,}/gu, "\n\n")
    .trim()
    .slice(0, 65536);
}
function uc(e) {
  const t = [],
    a = new Set();
  for (const n of rc(e)) {
    const e = String(n || "")
      .replace(/[<>\r\n]/gu, " ")
      .replace(/[\u0000-\u001f\u007f]+/gu, " ")
      .replace(/\s+/gu, " ")
      .trim()
      .slice(0, 80);
    if (!e) continue;
    const r = e.normalize("NFKC").toLocaleLowerCase();
    if (!a.has(r) && (a.add(r), t.push(e), t.length >= 992)) break;
  }
  return t;
}
function mc(e, t = "auto") {
  const a = zc(t),
    n = Math.max(0, 4 - ("auto" === a ? 0 : 1)),
    r = [],
    i = new Set("auto" === a ? [] : [a]);
  for (const t of rc(e)) {
    const e = zc(t);
    if (e && "auto" !== e && !i.has(e) && (i.add(e), r.push(e), r.length >= n))
      break;
  }
  return r;
}
function fc(e = {}) {
 e={...e,apiProvider:'textamisu',sttProvider:'st-a',provider:'lt-n',sttAudioSpeed:1,disableSubtitleCache:true,liveSharedEnabled:false,sttContextAutoResearchEnabled:false,sttContextRefreshEnabled:false,llmFallbackMode:'off',sttEmptyRetryEnabled:false,mseStartupBoostEnabled:false};
 delete e.auth; delete e.walletBillingProtocol; delete e.walletSessionStart;
  const t = ac(e.captionMode || e.displayMode),
    a = gc(e.captionMode || e.displayMode) || !0 === e.mseAudioBufferEnabled,
    n = Hc(e.provider),
    r = zc(e.sourceLang || "auto"),
    i = el(e.sttProvider, r).provider,
    s = ll(e.sttAudioSpeed, i),
    o = ic(e.sttLanguageMode),
    c = !1 !== e.sttContextAutoResearchEnabled,
    l = sc(e.sttContextSearchDirection),
    d = !1 !== e.sttContextRefreshEnabled,
    u = lc(e.sttContextRefreshIntervalMinutes),
    m = !0 === e.sttContextCustom,
    f = dc(e.sttPrompt),
    g = uc(e.sttKeywords),
    h = mc(e.sourceLanguageHints, r),
    p = Gc(i, n);
  return t !== Me
    ? {
        ...e,
        provider: p,
        sourceLang: r,
        sttProvider: i,
        sttAudioSpeed: s,
        sttLanguageMode: o,
        sttContextAutoResearchEnabled: c,
        sttContextSearchDirection: l,
        sttContextRefreshEnabled: d,
        sttContextRefreshIntervalMinutes: u,
        sttContextCustom: m,
        sttPrompt: f,
        sttKeywords: g,
        sourceLanguageHints: h,
        sourcePreloadEnabled: !1,
        mseAudioBufferEnabled: a,
        mseAudioBufferSingleTab: gc(e.captionMode || e.displayMode),
        audioInputMode: a
          ? "mse-audio-buffer"
          : e.audioInputMode || "tab-capture",
        captionMode: t,
      }
    : {
        ...e,
        provider: p,
        sourceLang: r,
        sttProvider: i,
        sttAudioSpeed: s,
        sttLanguageMode: o,
        sttContextAutoResearchEnabled: c,
        sttContextSearchDirection: l,
        sttContextRefreshEnabled: d,
        sttContextRefreshIntervalMinutes: u,
        sttContextCustom: m,
        sttPrompt: f,
        sttKeywords: g,
        sourceLanguageHints: h,
        sourcePreloadEnabled: !1,
        mseAudioBufferEnabled: !1,
        mseAudioBufferSingleTab: !1,
        audioInputMode: e.audioInputMode || "tab-capture",
        captionMode: t,
        syncEnabled: !1,
        youtubeSyncEnabled: !1,
        videoSyncEnabled: !1,
        singleTabMediaSync: !1,
        adaptiveSyncDelayEnabled: !1,
        subtitleBufferTargetSegments: e.subtitleBufferTargetSegments || 3,
        finalBatchingEnabled: !1,
      };
}
function gc(e) {
  return ["mse-audio-buffer", "youtube-mse", "mse", "youtube-buffer"].includes(
    String(e || "")
      .toLowerCase()
      .trim(),
  );
}
function hc(e = {}) {
  return ac(e.captionMode || e.displayMode) === Me;
}
function pc(e, t = "", a = null) {
  return (
    e === ke &&
    !!tc(t) &&
    (!a || !0 === a.hasVideo) &&
    (Il(t) || bl(t) || yl(t))
  );
}
function bc(e = "", t = null) {
  return yl(e)
    ? !1 === t?.isLiveStream || !0 !== t?.hasVideo
      ? "找不到可播放的 Instagram 直播，請確認直播仍在進行後再開啟直播延遲同步。"
      : "Instagram 直播延遲同步目前只能在直播播放器頁面啟用。"
    : bl(e)
      ? "找不到可播放的 Twitch 直播，請確認直播仍在進行後再開啟直播延遲同步。"
      : pl(e)
        ? "找不到可播放的 YouTube 直播，請確認直播仍在進行後再開啟直播延遲同步。"
        : "直播延遲同步目前支援 YouTube、Twitch 與 Instagram 直播頁面，請改用單分頁即時字幕或切到直播分頁。";
}
function yc(e, t = "", a = null) {
  return !(
    e !== ke ||
    !eo(t) ||
    (a && !0 !== a.hasVideo) ||
    (a && !1 === a.isLiveStream)
  );
}
function wc(e, t = "", a = null) {
  return !(
    e !== ke ||
    !yl(t) ||
    (a && !0 !== a.hasVideo) ||
    (a && !1 === a.isLiveStream)
  );
}
function Sc(e, t = "", a = null) {
  return yc(e, t, a) ? "twitch-hls" : wc(e, t, a) ? "instagram-native" : "";
}
function vc(e = null) {
  const t = Array.isArray(e?.nativeMediaCandidates)
      ? e.nativeMediaCandidates
      : [],
    a = e?.href || e?.pageUrl || e?.url || e?.timing?.href || "";
  return (
    t
      .map((e) => Ic(e, a))
      .filter(Boolean)
      .sort((e, t) => _c(t) - _c(e))[0] || null
  );
}
function Ic(e = null, t = "") {
  if (!e || "object" != typeof e) return null;
  const a = Tc(e.manifestText || e.streamManifestText || ""),
    n = Rc(
      e.type ||
        e.url ||
        e.manifestBaseUrl ||
        e.streamManifestBaseUrl ||
        (a ? "dash" : ""),
    );
  if (!["dash", "hls", "mp4"].includes(n)) return null;
  const r = "dash" === n ? a : "",
    i = r ? Ec(e.manifestBaseUrl || e.streamManifestBaseUrl || e.url, t) : "",
    s = Ec(e.url || i, t);
  if (!s) return null;
  const o = { url: s, type: n, source: String(e.source || "").slice(0, 80) };
  return (
    r &&
      ((o.inlineManifest = !0),
      (o.manifestText = r),
      (o.manifestBaseUrl = i || s),
      (o.manifestSignature = String(
        e.manifestSignature ||
          e.streamManifestSignature ||
          `inline-dash:${kc(r)}`,
      ).slice(0, 80))),
    o
  );
}
function Tc(e = "") {
  const t = String(e || "")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .trim();
  return !t || t.length > me
    ? ""
    : /<MPD[\s>]/i.test(t) && /<\/MPD>/i.test(t)
      ? t
      : "";
}
function Mc(e = null, t = null) {
  return (
    !(!e || !t) &&
    e.url === t.url &&
    e.type === t.type &&
    Boolean(e.inlineManifest) === Boolean(t.inlineManifest) &&
    String(e.manifestSignature || "") === String(t.manifestSignature || "")
  );
}
function kc(e = "") {
  let t = 2166136261;
  const a = String(e || "");
  for (let e = 0; e < a.length; e += 1)
    ((t ^= a.charCodeAt(e)), (t = Math.imul(t, 16777619)));
  return (t >>> 0).toString(16);
}
function Ec(e = "", t = "") {
  const a = Ac(e);
  if (!a || a.startsWith("blob:")) return "";
  try {
    const e = new URL(a, t || void 0);
    Cc(e, a, t);
    const n = e.hostname.toLowerCase();
    if (
      "instagram.com" === n ||
      n.endsWith(".instagram.com") ||
      n.endsWith(".cdninstagram.com") ||
      n.endsWith(".fbcdn.net") ||
      n.endsWith(".fbsbx.com") ||
      n.endsWith(".facebook.com")
    )
      return e.href;
  } catch {}
  return "";
}
function Cc(e, t = "", a = "") {
  if (e && !e.search && Lc(t))
    try {
      const t = new URL(a);
      t.search && (e.search = t.search);
    } catch {}
}
function Lc(e = "") {
  const t = String(e || "").trim();
  return Boolean(t) && !/^[a-z][a-z0-9+.-]*:/i.test(t) && !t.startsWith("//");
}
function Ac(e = "") {
  let t = String(e || "").trim();
  if (!t) return "";
  const a = new Set();
  for (let e = 0; e < 4 && !a.has(t); e += 1) {
    a.add(t);
    const e = t;
    if (((t = Dc(t).trim()), t === e)) break;
  }
  return t;
}
function Dc(e = "") {
  let t = String(e || "");
  t = t
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#x2f;/gi, "/")
    .replace(/&#47;/g, "/")
    .replace(/\\u([0-9a-f]{4})/gi, (e, t) => {
      const a = Number.parseInt(t, 16);
      return a >= 32 && a <= 126 ? String.fromCharCode(a) : e;
    })
    .replace(/\\x([0-9a-f]{2})/gi, (e, t) => {
      const a = Number.parseInt(t, 16);
      return a >= 32 && a <= 126 ? String.fromCharCode(a) : e;
    })
    .replace(/\\\//g, "/")
    .replace(/\\\\/g, "\\");
  try {
    return decodeURIComponent(t);
  } catch {
    return t.replace(/%(3a|2f|5c|26|3f|3d|25|23|2e|2d|5f|7e)/gi, (e, t) =>
      String.fromCharCode(Number.parseInt(t, 16)),
    );
  }
}
function Rc(e = "") {
  const t = String(e || "").toLowerCase();
  return "dash" === t ||
    /\.mpd(?:$|[?#])/.test(t) ||
    t.includes("dash_manifest") ||
    /\/dash(?:[/?#]|$)/.test(t)
    ? "dash"
    : "hls" === t || /\.m3u8(?:$|[?#])/.test(t) || t.includes("m3u8")
      ? "hls"
      : "mp4" === t || /\.(?:mp4|m4v|mov)(?:$|[?#])/.test(t)
        ? "mp4"
        : "";
}
function _c(e = {}) {
  return "dash" === e.type
    ? 35
    : "hls" === e.type
      ? 30
      : "mp4" === e.type
        ? 10
        : 0;
}
function Nc(e = {}, t = "", a = null) {
  return (
    !hc(e) &&
    ac(e.captionMode || e.displayMode) !== ke &&
    !1 !== e.syncEnabled &&
    !1 !== e.youtubeSyncEnabled &&
    !!fl(t) &&
    (pl(t)
      ? !!Il(t) || (!0 === a?.hasVideo && !0 === a?.isLiveStream)
      : !yl(t) &&
        !bl(t) &&
        !0 === a?.hasVideo &&
        !0 === a?.isLiveStream &&
        !0 === a?.canSeekLiveBuffer)
  );
}
function Pc(e = {}, t = "", a = null) {
  return !(
    hc(e) ||
    ac(e.captionMode || e.displayMode) === ke ||
    !1 === e.syncEnabled ||
    !1 === e.youtubeSyncEnabled ||
    !tc(t) ||
    Il(t) ||
    !0 !== a?.hasVideo ||
    Nc(e, t, a)
  );
}
function Uc(e = {}, t = "", a = null, n = {}) {
  const r = n.captionMode || ac(e.captionMode || e.displayMode);
  return (
    !(!0 !== e.mseAudioBufferEnabled && !gc(r)) &&
    r !== Me &&
    r !== ke &&
    !n.mirrorDelayEnabled &&
    !n.nativeStreamDelayEnabled &&
    !1 !== e.syncEnabled &&
    !1 !== e.youtubeSyncEnabled &&
    !(!tc(t) || !hl(t)) &&
    (!a || !0 === a.hasVideo) &&
    "vod" ===
      String(n.sourceLiveClassification || Bc(a))
        .toLowerCase()
        .trim()
  );
}
function xc(e = null) {
  return "live" === Bc(e);
}
function Bc(e = null) {
  const t = String(e?.liveClassification || e?.timing?.liveClassification || "")
    .toLowerCase()
    .trim();
  return "live" === t || "vod" === t
    ? t
    : !0 === e?.isLiveStream ||
        !0 === e?.timing?.isLiveStream ||
        !0 === e?.timingLive
      ? "live"
      : "unknown";
}
function Vc(e = {}) {
  if (hc(e)) return fc(e);
  if (!1 === e.syncEnabled) return e;
  const t = tl(e.syncDelaySeconds),
    a = Kc(e.syncDelayMode);
  return {
    ...e,
    syncDelayMode: a,
    syncDelaySeconds: t,
    batchWaitSeconds: al(e.batchWaitSeconds),
    adaptiveSyncDelayEnabled: "auto" === a,
  };
}
function Kc(e) {
  return "auto" ===
    String(e || "")
      .toLowerCase()
      .trim()
    ? "auto"
    : "fixed";
}
function qc(e = {}) {
  const t = Hc(e.provider),
    a = jc(e.sttProvider);
  if ("lt-n" === t && "st-m" === a) return B;
  const n = We[t] || 6,
    r = Ge[a] || 0;
  return tl(Math.max(n, r));
}
function Oc(e = {}) {
  return "st-m" === jc(e.sttProvider) && "lt-n" === Hc(e.provider);
}
function $c(e = {}) {
  const t = Hc(e.provider),
    a = jc(e.sttProvider);
  return "lt-h" !== t || ("st-m" !== a && "st-j" !== a && "st-d" !== a)
    ? ("lt-l" !== t && "lt-c" !== t) || ("st-m" !== a && "st-b" !== a)
      ? ""
      : "economy"
    : "lightning";
}
function Fc(e = {}, t = {}) {
  ac(e.captionMode || e.displayMode);
  const a = t.policy || $c(e);
  if ("lightning" === a) return { policy: a, minimumSeconds: _, mseActive: !1 };
  if ("economy" === a) {
    const e = !0 === t.mseAudioBufferEnabled;
    return { policy: a, minimumSeconds: e ? N : U, mseActive: e };
  }
  return { policy: "", minimumSeconds: 2, mseActive: !1 };
}
function Hc(e) {
  const t = String(e || "lt-e")
    .toLowerCase()
    .trim();
  return ze[t] || t || "lt-e";
}
function jc(e) {
  const t = String(e || "st-d")
      .toLowerCase()
      .trim(),
    a = Je[t] || t || "st-d";
  return "st-h" === a || "st-h" === a || "st-h" === a || "st-h" === a
    ? "st-h"
    : "st-e" === a ||
        "st-e" === a ||
        "t3-integrated" === a ||
        "st-e" === a ||
        "st-e" === a
      ? "st-e"
      : "st-f" === a || "st-f" === a || "st-f" === a
        ? "st-f"
        : "st-g" === a || "st-g" === a || "st-g" === a || "st-g" === a
          ? "st-g"
          : a;
}
function Wc(e) {
  const t = jc(e);
  return "st-e" === t || "st-h" === t || "st-f" === t || "st-g" === t;
}
function Gc(e, t) {
  const a = jc(e),
    n = Hc(t);
  return "st-f" === a
    ? "lt-e"
    : "st-g" === a
      ? "lt-f"
      : "st-h" === a
        ? "lt-a"
        : "st-e" !== a || "lt-a" === n || "lt-b" === n
          ? n
          : "lt-b";
}
function zc(e) {
  const t = String(e || "auto")
    .toLowerCase()
    .trim();
  if (!t || "auto" === t) return "auto";
  const a = Ye[t] || t;
  return Qe.has(a) ? a : "auto";
}
function Jc(e, t) {
  const a = jc(e),
    n = zc(t);
  return (
    !n ||
    "auto" === n ||
    ("st-i" === a || "st-j" === a
      ? Xe.has(n)
      : "st-b" === a
        ? Boolean(et[n])
        : "st-m" === a
          ? Ze.has(n)
          : ("st-d" !== a && "st-a" !== a) || Qe.has(n))
  );
}
function Yc(e) {
  return Jc("st-j", e) ? "st-j" : "st-d";
}
function Qc(e = {}) {
return false;
}
function Xc(e, t) {
  const a = jc(e);
  return "st-j" === a ? Yc(t) : a;
}
function Zc(e, t) {
  const a = String(e || "").toLowerCase(),
    n = "twitch" === a ? sl(t) : tl(t),
    r = "twitch" === a ? Y : J;
  return Math.max(r, n);
}
function el(e, t) {
return {provider:'st-a',reason:'textamisu-http'};
}
function tl(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(Math.max(t, 2), R) : 6;
}
function al(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(Math.max(t, 0), q) : 0;
}
function nl(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(Math.max(t, $), F) : O;
}
function rl(e) {
  const t = String(e || H)
    .toLowerCase()
    .trim();
  return t === j ? j : t === W ? W : H;
}
function il(e) {
  const t = Number(e),
    a = Math.min(6, G);
  return Number.isFinite(t) ? Math.min(Math.max(t, 2), G) : a;
}
function sl(e) {
  const t = Number(e),
    a = Math.min(6, z);
  return Number.isFinite(t) ? Math.min(Math.max(t, 2), z) : a;
}
function ol(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(Math.max(t, 10), $e) : $e;
}
function cl(e) {
  const t = Number(e);
  return t >= 2 ? 2 : t >= 1.5 ? 1.5 : 1;
}
function ll(e, t) {
  return Un(t) ? cl(e) : 1;
}
function dl(e) {
  if (null == e || "" === e) return null;
  const t = Number(e);
  return Number.isFinite(t) ? t : null;
}
const ul = Nc,
  ml = Pc;
function fl(e = "") {
  return pl(e) || bl(e);
}
function gl(e = "") {
  return pl(e)
    ? "youtube"
    : bl(e)
      ? "twitch"
      : yl(e)
        ? "instagram"
        : wl(e)
          ? "missav"
          : Sl(e)
            ? "xvideos"
            : "html5";
}
function hl(e = "") {
  return pl(e) || wl(e) || Sl(e);
}
function pl(e = "") {
  try {
    const t = new URL(e);
    return (
      /(^|\.)youtube\.com$/i.test(t.hostname) ||
      /(^|\.)youtu\.be$/i.test(t.hostname)
    );
  } catch {
    return !1;
  }
}
function bl(e = "") {
  try {
    const t = new URL(e);
    return /(^|\.)twitch\.tv$/i.test(t.hostname);
  } catch {
    return !1;
  }
}
function yl(e = "") {
  try {
    const t = new URL(e);
    return /(^|\.)instagram\.com$/i.test(t.hostname);
  } catch {
    return !1;
  }
}
function wl(e = "") {
  try {
    const t = new URL(e);
    return /(^|\.)missav\.(?:ai|ws)$/i.test(t.hostname);
  } catch {
    return !1;
  }
}
function Sl(e = "") {
  try {
    const t = new URL(e);
    return /(^|\.)xvideos\.com$/i.test(t.hostname);
  } catch {
    return !1;
  }
}
function vl(e = "") {
  try {
    return new URL(e).pathname.split("/").filter(Boolean).includes("live");
  } catch {
    return !1;
  }
}
function Il(e = "") {
  return Boolean(Tl(e));
}
function Tl(e = "") {
  try {
    const t = new URL(e);
    if (/(^|\.)youtu\.be$/i.test(t.hostname))
      return t.pathname.split("/").filter(Boolean)[0] || "";
    if (!/(^|\.)youtube\.com$/i.test(t.hostname)) return "";
    if ("/watch" === t.pathname) return t.searchParams.get("v") || "";
    const a = t.pathname.split("/").filter(Boolean);
    if (["live", "shorts", "embed"].includes(a[0])) return a[1] || "";
  } catch {
    return "";
  }
  return "";
}
function Ml(e = "", t = "") {
  const a = kl(e),
    n = kl(t);
  if (a && n && a === n) return !0;
  const r = El(e),
    i = El(t);
  return r && i ? r === i : Ll(e, t);
}
function kl(e = "") {
  try {
    const t = new URL(e),
      a = t.hostname.toLowerCase().replace(/^www\./, ""),
      n = t.pathname.replace(/\/+$/, "") || "/";
    return `${t.protocol.toLowerCase()}//${a}${n.toLowerCase()}${t.search}`;
  } catch {
    return "";
  }
}
function El(e = "") {
  try {
    const t = new URL(e),
      a = t.hostname.toLowerCase();
    if (/(^|\.)youtube\.com$/i.test(a) || /(^|\.)youtu\.be$/i.test(a)) {
      const e = Tl(t.href);
      if (e) return `youtube:${e}`;
      return Cl(t.pathname) || "";
    }
    if (/(^|\.)twitch\.tv$/i.test(a)) {
      const e = t.pathname.split("/").filter(Boolean);
      if ("videos" === e[0] && e[1])
        return `twitch:video:${e[1].toLowerCase()}`;
      if ("popout" === e[0] && e[1])
        return `twitch:channel:${e[1].toLowerCase()}`;
      if (e[0] && !tt.has(e[0].toLowerCase()))
        return `twitch:channel:${e[0].toLowerCase()}`;
    }
    if (/(^|\.)instagram\.com$/i.test(a)) {
      const e = t.pathname.split("/").filter(Boolean);
      return e.length ? `instagram:${e.join("/").toLowerCase()}` : "";
    }
    if (/(^|\.)missav\.(?:ai|ws)$/i.test(a)) {
      const e = t.pathname.split("/").filter(Boolean);
      return e.length ? `missav:${e.join("/").toLowerCase()}` : "";
    }
    if (/(^|\.)xvideos\.com$/i.test(a)) {
      const e = t.pathname.split("/").filter(Boolean),
        a = String(e[0] || "").toLowerCase();
      return /^video(?:\.|\d)/i.test(a)
        ? `xvideos:${a}`
        : "embedframe" === a && e[1]
          ? `xvideos:embedframe:${String(e[1]).toLowerCase()}`
          : "";
    }
  } catch {
    return "";
  }
  return "";
}
function Cl(e = "") {
  const t = String(e || "")
    .split("/")
    .filter(Boolean);
  if ("live" !== t[t.length - 1]?.toLowerCase()) return "";
  if (2 === t.length) {
    const e = String(t[0] || "")
        .replace(/^@/, "")
        .toLowerCase(),
      a = new Set([
        "account",
        "embed",
        "feed",
        "gaming",
        "live",
        "playlist",
        "premium",
        "results",
        "shorts",
        "upload",
        "watch",
      ]);
    if (e && !a.has(e)) return `youtube-live-alias:handle:${e}`;
  }
  return 3 === t.length &&
    ["channel", "c", "user"].includes(String(t[0] || "").toLowerCase())
    ? `youtube-live-alias:${String(t[0]).toLowerCase()}:${String(t[1] || "").toLowerCase()}`
    : "";
}
function Ll(e = "", t = "") {
  const a = Tl(e),
    n = Tl(t);
  return !(!a || !n) && a === n;
}
function Al(e) {
  const t = Math.round(Number(e));
  return !Number.isFinite(t) || t <= 0 ? 0 : Math.min(t, Le);
}
function Dl(e) {
  return new Promise((t) => setTimeout(t, e));
}
function Rl(e, t, a) {
  return new Promise((n) => {
    const r = setTimeout(() => n(a), t);
    Promise.resolve(e).then(
      (e) => {
        (clearTimeout(r), n(e));
      },
      (e) => {
        (clearTimeout(r), n({ ok: !1, error: e?.message || String(e) }));
      },
    );
  });
}
function _l(t, a) {
  const n = Date.now(),
    r = `${t.sessionId}:${t.captureTabId}`;
  for (const [t, a] of e) n - a.lastUsedAt > 6e4 && e.delete(t);
  let i = e.get(r);
  (i ||
    ((i = { lastUsedAt: n, requestedAt: 0, pending: !1, sample: null }),
    e.set(r, i)),
    (i.lastUsedAt = n),
    !i.pending &&
      n - i.requestedAt >= 1e3 &&
      ((i.pending = !0),
      (i.requestedAt = n),
      us(
        {
          target: { tabId: t.captureTabId },
          world: "MAIN",
          func: Nl,
          args: [a.href || t.config?.pageUrl || ""],
        },
        1500,
        "Twitch content clock",
      )
        .then((e) => {
          i.sample = e?.[0]?.result || null;
        })
        .catch(() => {
          i.sample = null;
        })
        .finally(() => {
          i.pending = !1;
        })));
  const s = i.sample;
  if (!s || a.paused || a.seeking || a.adPlaying || !0 !== a.isLiveStream)
    return null;
  const o = Number(a.wallTimeMs) - s.observedAtMs;
  if (!Number.isFinite(o) || o < -250 || o > 2500 || s.href !== a.href)
    return null;
  const c = s.mediaTime + (o / 1e3) * (Number(a.playbackRate) || 1);
  return !Number.isFinite(Number(a.currentTime)) ||
    Math.abs(c - Number(a.currentTime)) > 0.75
    ? null
    : { ...s };
}
function Nl(e) {
  if (
    location.href !== e ||
    !/(^|\.)twitch\.tv$/.test(location.hostname) ||
    /^\/videos\//.test(location.pathname)
  )
    return null;
  const t = [...document.querySelectorAll("video")]
    .filter((e) => !e.paused && !e.seeking && e.readyState >= 2)
    .sort(
      (e, t) => t.clientWidth * t.clientHeight - e.clientWidth * e.clientHeight,
    )[0];
  if (!t || !Number.isFinite(t.currentTime)) return null;
  const a = performance.now() + 8,
    n = new Set(),
    r = [];
  for (let e = t, i = 0; e && i < 20; e = e.parentElement, i += 1) {
    const t = Object.keys(e).find(
      (e) =>
        e.startsWith("__reactFiber$") ||
        e.startsWith("__reactInternalInstance$"),
    );
    for (
      let i = t && e[t], s = 0;
      i && s < 40 && performance.now() < a && !n.has(i);
      i = i.return, s += 1
    ) {
      n.add(i);
      for (const e of [i.memoizedProps, i.stateNode?.props, i.stateNode])
        if (e && "object" == typeof e)
          for (const t of [e.mediaPlayerInstance, e.player, e.mediaPlayer])
            t && "object" == typeof t && r.push(t, t.core);
    }
  }
  for (const e of new Set(r))
    if (e && !(performance.now() > a))
      try {
        const a =
            "function" == typeof e.getPlaybackStats
              ? e.getPlaybackStats()
              : null,
          n =
            a?.hlsLatencyBroadcaster ??
            ("function" == typeof e.getLiveLatency ? e.getLiveLatency() : null);
        if ("number" != typeof n || !Number.isFinite(n) || n <= 0 || n > 120)
          continue;
        const r = Date.now();
        return {
          programTimeMs: r - 1e3 * n,
          mediaTime: t.currentTime,
          observedAtMs: r,
          broadcasterLatencySeconds: n,
          method:
            null != a?.hlsLatencyBroadcaster
              ? "twitch-playback-stats"
              : "twitch-live-latency",
          href: location.href,
        };
      } catch {}
  return null;
}
((globalThis.__aiLiveSubtitleMvpDebug = {
  getActiveSession: Po,
  startLiveSubtitle: yn,
  stopLiveSubtitle: In,
}),
  globalThis.__LIVE_SUBTITLE_SERVICE_WORKER_TEST__ &&
    (globalThis.__liveSubtitleServiceWorkerTest = {
      applyStartupSyncDelayRecommendation: Vc,
      assertTrustedAuthSender: Qa,
      assertStartTabHostPermission: hn,
      classifySyncDelaySafetyEngine: $c,
      bytesToBase64Url: Ht,
      ensureInstallCredential: Ft,
      getOrCreateAnonymousAuthSession: Ot,
      ensureAnonymousTrialBootstrap: jt,
      isStoredAnonymousAuth: qt,
      publicStoredAuthSession: Vt,
      extractJwtExpiresAt: en,
      getStoredAuthSession: Lt,
      getStartupSyncDelayRecommendation: qc,
      handleExternalMessage: Mt,
      findTwitchHlsSessionForTab: zn,
      isFirebaseTokenExpiring: Gt,
      normalizeCaptionMode: ac,
      normalizeCaptionModeConfig: fc,
      removeStaleAutomaticSttContext: Dn,
      resolveSyncDelaySafetyRule: Fc,
      trustedAuthOrigins: [...L],
      verifyFirebaseSession: Xa,
    }));

