/* Prevent dormant legacy paths from contacting the previous provider. */
(() => {
  const forbidden = (input) => {
    const url=new URL(typeof input==='string'||input instanceof URL ? input : input.url,globalThis.location?.href);
    return /(?:^|\.)(?:subruu\.com|live-subtitle\.com|salad\.cloud)$/.test(url.hostname)
      || /^(?:subtitle-translate-|subruu-wallet-)/.test(url.hostname)
      || ['identitytoolkit.googleapis.com','securetoken.googleapis.com'].includes(url.hostname)
      || /^\/(?:caption-|live-caption-|stream-stt|features\/)/.test(url.pathname);
  };
  const fetchOriginal=globalThis.fetch.bind(globalThis);
  globalThis.fetch=(input,options)=>forbidden(input) ? Promise.reject(Object.assign(new Error('此服務尚無 Textamisu API 對應功能'),{code:'textamisu_feature_unavailable'})) : fetchOriginal(input,options);
  if(globalThis.WebSocket) {
    const Original=globalThis.WebSocket;
    globalThis.WebSocket=class extends Original { constructor(url,protocols) { if(forbidden(url)) throw new Error('Textamisu 使用 HTTP 分段辨識'); super(url,protocols); } };
  }
})();
