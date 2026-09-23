/* Provider boundary shared by the capture document and service worker. */
(() => {
  const language = (value) => ({eng:'en',jpn:'ja',kor:'ko',tha:'th',zho:'zh-TW',cmn:'zh-TW',zh:'zh-TW','zh-tw':'zh-TW'}[String(value).toLowerCase()] || value || 'auto');
  const sessionKey = (id) => `textamisuLive:${id}`;
  const starting = new Map();
  async function session(localId) {
    if (!localId) throw new Error('缺少字幕工作階段');
    const key = sessionKey(localId);
    const saved = (await chrome.storage.session.get(key))[key];
    if (saved?.sessionId) return saved;
    // Only the service worker creates sessions, so chat and audio starting at
    // the same time cannot create two separately rounded billing sessions.
    if (typeof document !== 'undefined') {
      const reply=await chrome.runtime.sendMessage({type:'TEXTAMISU_SESSION_START',sessionId:localId});
      if(!reply?.ok) throw Object.assign(new Error(reply?.error||'Textamisu 工作階段建立失敗'),{status:reply?.status,code:reply?.code});
      return reply.data;
    }
    if (!starting.has(localId)) starting.set(localId, (async () => {
      const value = await TextamisuApi.startSession();
      await chrome.storage.session.set({[key]:value});
      return value;
    })().finally(() => starting.delete(localId)));
    return starting.get(localId);
  }
  async function end(localId) {
    const key = sessionKey(localId);
    const value = (await chrome.storage.session.get(key))[key];
    if (!value?.sessionId) return;
    await TextamisuApi.endSession(value.sessionId);
    await chrome.storage.session.remove(key);
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
    const remote=await session(localId), samples=await normalizeAudio(input), parts=[];
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
      const result=await TextamisuApi.stt(remote.sessionId,{audio:new Blob([wav],{type:'audio/wav'}),mimeType:'audio/wav',requestId,sourceLanguage:language(metadata.sourceLang),audioSpeed:Number(metadata.audioSpeed)||1},{signal});
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
  globalThis.TextamisuPipeline={language,session,end,stt,encodeWav,wavSamples,normalizeAudio};
})();
