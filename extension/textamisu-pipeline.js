/* Provider boundary shared by the capture document and service worker. */
(() => {
  const language = (value) => ({eng:'en',jpn:'ja',kor:'ko',tha:'th',zho:'zh-TW',cmn:'zh-TW',zh:'zh-TW','zh-tw':'zh-TW'}[String(value).toLowerCase()] || value || 'auto');
  const sessionKey = (id) => `textamisuLive:${id}`;
  const starting = new Map();
  let recovery;
  function recoverSessions() {
    if (!recovery) recovery = (async () => {
      const records = await chrome.storage.local.get(null);
      for (const [key, remoteId] of Object.entries(records)) {
        if (!key.startsWith('textamisuRemote:')) continue;
        const id = key.slice('textamisuRemote:'.length);
        if ((await chrome.storage.session.get(sessionKey(id)))[sessionKey(id)]) continue;
        try { await TextamisuApi.endSession(remoteId); }
        catch (error) { if (![404,410].includes(error.status)) throw error; }
        await chrome.storage.local.remove('textamisuRemote:' + id);
      }
    })().catch(error => { recovery = null; throw error; });
    return recovery;
  }
  const inDocument = () => typeof document !== 'undefined';
  function abortError(signal) { return signal?.reason || new DOMException('已取消請求','AbortError'); }
  function rpc(type, localId, payload, signal) {
    if (signal?.aborted) return Promise.reject(abortError(signal));
    const rpcId=crypto.randomUUID();
    return new Promise((resolve,reject) => {
      const abort=() => {
        chrome.runtime.sendMessage({type:'TEXTAMISU_REQUEST_ABORT',sessionId:localId,rpcId}).catch(()=>{});
        reject(abortError(signal));
      };
      signal?.addEventListener('abort',abort,{once:true});
      chrome.runtime.sendMessage({type,sessionId:localId,rpcId,...(payload ? {payload} : {})}).then(reply => {
        if (signal?.aborted) return reject(abortError(signal));
        if (!reply?.ok) return reject(Object.assign(new Error(reply?.error||'Textamisu 背景請求失敗'),{name:reply?.name||'Error',status:reply?.status,code:reply?.code,requestId:reply?.requestId}));
        resolve(reply.data);
      },reject).finally(()=>signal?.removeEventListener('abort',abort));
    });
  }
  function audioBase64(bytes) {
    const data=new Uint8Array(bytes),parts=[];
    for(let offset=0;offset<data.length;offset+=32768) parts.push(String.fromCharCode(...data.subarray(offset,offset+32768)));
    return btoa(parts.join(''));
  }
  async function session(localId) {
    if (!localId) throw new Error('缺少字幕工作階段');
    // Real offscreen documents only have chrome.runtime. Never read storage or
    // credentials there, including the runner iframe used by concurrent tabs.
    if (inDocument()) return rpc('TEXTAMISU_SESSION_START',localId);
    await recoverSessions();
    const key = sessionKey(localId);
    const saved = (await chrome.storage.session.get(key))[key];
    if (saved?.sessionId) return saved;
    // Only the service worker creates sessions, so chat and audio starting at
    // the same time cannot create two separately rounded billing sessions.
    if (!starting.has(localId)) starting.set(localId, (async () => {
      const value = await TextamisuApi.startSession();
      await chrome.storage.local.set({['textamisuRemote:' + localId]:value.sessionId});
      await chrome.storage.session.set({[key]:value});
      return value;
    })().finally(() => starting.delete(localId)));
    return starting.get(localId);
  }
  async function end(localId) {
    if (inDocument()) return rpc('TEXTAMISU_SESSION_END',localId);
    // A stop can race the first start request; wait for its stored ID before
    // closing it instead of leaving an orphaned remote session.
    if (starting.has(localId)) await starting.get(localId);
    const key = sessionKey(localId);
    const value = (await chrome.storage.session.get(key))[key];
    if (!value?.sessionId) return;
    await TextamisuApi.endSession(value.sessionId);
    await chrome.storage.session.remove(key);
    await chrome.storage.local.remove('textamisuRemote:' + localId);
  }
  function encodeWav(samples, rate = 16000) {
    const data = new ArrayBuffer(44 + samples.length * 2), view = new DataView(data);
    const str = (offset, value) => { for (let i=0;i<value.length;i++) view.setUint8(offset+i,value.charCodeAt(i)); };
    str(0,'RIFF'); view.setUint32(4,36+samples.length*2,true); str(8,'WAVE'); str(12,'fmt ');
    view.setUint32(16,16,true); view.setUint16(20,1,true); view.setUint16(22,1,true);
    view.setUint32(24,rate,true); view.setUint32(28,rate*2,true); view.setUint16(32,2,true); view.setUint16(34,16,true);
    str(36,'data'); view.setUint32(40,samples.length*2,true);
    for (let i=0;i<samples.length;i++) { const x=Math.max(-1,Math.min(1,samples[i])); view.setInt16(44+i*2,Math.round(x*(x<0?32768:32767)),true); }
    return data;
  }
  function wavSamples(bytes) {
    const view = new DataView(bytes), str = (p,n) => String.fromCharCode(...new Uint8Array(bytes,p,n));
    if (bytes.byteLength<44 || str(0,4)!=='RIFF' || str(8,4)!=='WAVE') return null;
    let format, pcm;
    for (let p=12;p+8<=bytes.byteLength;) {
      const length=view.getUint32(p+4,true), end=p+8+length;
      if (end>bytes.byteLength) return null;
      if (str(p,4)==='fmt ' && length>=16) format={type:view.getUint16(p+8,true),channels:view.getUint16(p+10,true),rate:view.getUint32(p+12,true),bits:view.getUint16(p+22,true)};
      if (str(p,4)==='data') pcm={offset:p+8,length};
      p=end+(length%2);
    }
    if (!format || !pcm || format.type!==1 || format.channels!==1 || format.rate!==16000 || format.bits!==16 || pcm.length%2) return null;
    const samples=new Float32Array(pcm.length/2);
    for(let i=0;i<samples.length;i++) samples[i]=view.getInt16(pcm.offset+i*2,true)/32768;
    return samples;
  }
  async function normalizeAudio(input) {
    const bytes=input instanceof Blob ? await input.arrayBuffer() : ArrayBuffer.isView(input) ? input.buffer.slice(input.byteOffset,input.byteOffset+input.byteLength) : input.slice(0);
    const pcm=wavSamples(bytes);
    if(pcm) return pcm;
    const context=new AudioContext({sampleRate:16000});
    try {
      const decoded=await context.decodeAudioData(bytes);
      const render=new OfflineAudioContext(1,Math.ceil(decoded.duration*16000),16000);
      const source=render.createBufferSource(); source.buffer=decoded; source.connect(render.destination); source.start();
      return (await render.startRendering()).getChannelData(0);
    } finally { await context.close(); }
  }
  async function digest(bytes) {
    return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)), n=>n.toString(16).padStart(2,'0')).join('');
  }
  async function stt(localId, input, metadata, signal) {
    if(signal?.aborted) throw abortError(signal);
    const remote=inDocument() ? null : await session(localId), samples=await normalizeAudio(input), parts=[];
    if (!samples.length) throw new Error('音訊是空的');
    for(let offset=0;offset<samples.length;) {
      if(signal?.aborted) throw new DOMException('已取消辨識','AbortError');
      if(samples.length<1600) throw new Error('音訊長度須至少 0.1 秒');
      let end=Math.min(samples.length,offset+480000);
      const tail=samples.length-end;
      if(tail>0 && tail<1600) end-=1600-tail;
      const wav=encodeWav(samples.subarray(offset,end));
      // Same segment and bytes keep the same id across transport retries; new
      // timeline generations must be distinct even when their audio is identical.
      const key=new TextEncoder().encode(`${metadata.requestId||metadata.segmentId||''}:${metadata.timelineRevision||0}:${metadata.sourceLang||'auto'}:${metadata.audioSpeed||1}:${offset}:${await digest(wav)}`);
      const requestId=`stt-${await digest(key)}`;
      const payload={requestId,sourceLanguage:language(metadata.sourceLang),audioSpeed:Number(metadata.audioSpeed)||1};
      const result=inDocument()
        ? await rpc('TEXTAMISU_STT',localId,{...payload,audioBase64:audioBase64(wav)},signal)
        : await TextamisuApi.stt(remote.sessionId,{...payload,audio:new Blob([wav],{type:'audio/wav'}),mimeType:'audio/wav'},{signal});
      parts.push({...result,offset:offset/16000,requestId});
      offset=end;
    }
    return {text:parts.map(p=>p.text||'').filter(Boolean).join(' '),language:parts.find(p=>p.language)?.language,
      detected_languages:parts.filter(p=>p.language).map(p=>({code:p.language})),
      sttRequestIds:parts.map(p=>p.requestId),
      segments:parts.flatMap(p=>(p.segments||[]).map(s=>({...s,start:s.start+p.offset,end:s.end+p.offset}))),
      durationMs:parts.reduce((n,p)=>n+(p.durationMs||0),0),billableDurationMs:parts.reduce((n,p)=>n+(p.billableDurationMs||0),0),
      audioSpeed:Number(metadata.audioSpeed)||1,billing:parts.at(-1)?.billing};
  }
  async function translate(localId,payload,{signal}={}) {
    if(inDocument()) return rpc('TEXTAMISU_TRANSLATE',localId,payload,signal);
    return TextamisuApi.translate((await session(localId)).sessionId,payload,{signal});
  }
  async function status(localId,{signal}={}) {
    if(inDocument()) return rpc('TEXTAMISU_SESSION_STATUS',localId,undefined,signal);
    return TextamisuApi.session((await session(localId)).sessionId,{signal});
  }
  function saveSegment(localId,metadata,segment) {
    return rpc('TEXTAMISU_SAVE_SEGMENT',localId,{metadata,segment});
  }
  globalThis.TextamisuPipeline={language,session,end,stt,translate,status,saveSegment,encodeWav,wavSamples,normalizeAudio};
})();
