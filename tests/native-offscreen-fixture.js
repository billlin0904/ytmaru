/* Copied into an isolated extension fixture only; never shipped in extension/. */
(() => {
  const exchanges = [];
  let abortController, abortResult;
  const originalSend = chrome.runtime.sendMessage.bind(chrome.runtime);
  chrome.runtime.sendMessage = function(message, ...rest) {
    const entry = { type: message?.type || '', tokenInRequest: JSON.stringify(message).includes('pt_sk_fixture_only') };
    exchanges.push(entry);
    const result = originalSend(message, ...rest);
    if (result?.then) result.then(value => {
      entry.tokenInReply = JSON.stringify(value ?? null).includes('pt_sk_fixture_only');
    }, () => {});
    return result;
  };
  chrome.runtime.onMessage.addListener((message, _sender, reply) => {
    if (message?.type !== 'QA_NATIVE_OFFSCREEN') return;
    const role = ic ? 'runner' : 'manager';
    if (message.role !== role || (ic && message.sessionId !== ic)) return;
    const run = async () => {
      const features = { role, storageAvailable: typeof chrome.storage !== 'undefined', runtimeAvailable: Boolean(chrome.runtime?.sendMessage), url: location.href };
      if (message.action === 'hello') return features;
      if (message.action === 'create-runner') { await Sc(message.sessionId); return features; }
      if (message.action === 'end') { await kx(); return { ...features, remoteSessionStarted: gc.remoteSessionStarted, exchanges }; }
      if (message.action === 'start-abort') {
        abortController=new AbortController();
        abortResult=TextamisuPipeline.translate(message.sessionId,{requestId:'qa-abort',sttRequestIds:['stable-stt'],text:'Hello',sourceLanguage:'en',targetLanguage:'zh-TW'},{signal:abortController.signal})
          .then(()=>({completed:true}),error=>({name:error.name,code:error.code}));
        return {started:true};
      }
      if (message.action === 'abort') { abortController.abort(); return await abortResult; }
      gc.sessionId=message.sessionId;gc.isStopping=false;gc.stopRequestedAtMs=0;
      gc.config=PP({sourceLang:message.action==='missing'?'eng':'auto',targetLang:'zh'});
      gc.remoteSessionStarted=false;gc.remoteSessionStartPromise=null;
      if (message.action === 'missing') {
        try { await Tx(); return { ok:true, remoteSessionStarted:gc.remoteSessionStarted }; }
        catch(error) { return { ok:false, message:error.message, status:error.status, remoteSessionStarted:gc.remoteSessionStarted }; }
      }
      if (message.action !== 'pipeline') throw new Error('Unknown native fixture action');
      await Tx();
      const remote = await TextamisuPipeline.session(message.sessionId);
      const audio=TextamisuPipeline.encodeWav(new Float32Array(16000));
      const response=await pv(audio,{segmentId:`qa-native-${role}`,sourceLang:'auto',mimeType:'audio/wav'},{});
      const stt=await response.json();
      const translated=await bA({requestId:`caption-native-${role}`,text:stt.text,sourceLang:'auto',targetLang:'zh',walletSttRequestIds:stt.sttRequestIds},30000);
      const usageReady=await Cx();
      gc.config.saveEnabled=true;
      await yx({original:stt.text,translation:translated.translation,order:1,language:'en',translatedTo:'zh-TW',latency:{totalMs:1000,sttFromAudioEndMs:null,audioStartWallTimeMs:null}});
      return { ...features, stt:stt.text, ids:stt.sttRequestIds, translation:translated.translation, remoteId:remote.sessionId, usageReady, billing:gc.textamisuBilling, exchanges };
    };
    run().then(value=>reply({fixtureOk:true,value}),error=>reply({fixtureOk:false,error:error.message,stack:error.stack}));
    return true;
  });
})();
