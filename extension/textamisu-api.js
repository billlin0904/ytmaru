/* Textamisu Agent API. Load only in trusted extension pages and workers. */
(() => {
  "use strict";
  const CONFIG_KEY = "ytmaruTextamisuApi";
  const TOKEN_KEY = "ytmaruTextamisuToken";
  const DEFAULT_BASE_URL = "https://textamisu.com/api/agent/v1";
  const LANGUAGE_CODES = { eng: "en", jpn: "ja", kor: "ko", tha: "th", zh: "zh-TW", zho: "zh-TW", "zh-hant": "zh-TW", "zh-tw": "zh-TW" };
  function trusted() {
    if (!globalThis.chrome?.runtime?.id || globalThis.location?.protocol !== "chrome-extension:") throw new Error("Textamisu credentials require a trusted extension context.");
  }
  function normalizeBaseUrl(value) {
    let url;
    try { url = new URL(String(value || DEFAULT_BASE_URL).trim()); }
    catch { throw new Error("請輸入有效的 Textamisu API 網址。"); }
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if ((url.protocol !== "https:" && !(url.protocol === "http:" && local)) || url.username || url.password || url.search || url.hash) throw new Error("API 網址必須使用 HTTPS；僅 localhost 可使用 HTTP。");
    return url.href.replace(/\/+$/, "");
  }
  async function getConfig() {
    trusted();
    const [local, session] = await Promise.all([chrome.storage.local.get(CONFIG_KEY), chrome.storage.session.get(TOKEN_KEY)]);
    return { baseUrl: normalizeBaseUrl(local[CONFIG_KEY]?.baseUrl), token: String(session[TOKEN_KEY] || "") };
  }
  async function saveConfig(input = {}) {
    trusted();
    const current = await getConfig();
    const next = { baseUrl: normalizeBaseUrl(input.baseUrl ?? current.baseUrl), token: String(input.token ?? current.token).trim() };
    if (next.token && !/^pt_sk_[A-Za-z0-9_-]+$/.test(next.token)) throw new Error("請輸入以 pt_sk_ 開頭的 Textamisu API token。");
    await chrome.storage.session.setAccessLevel({ accessLevel: "TRUSTED_CONTEXTS" });
    await chrome.storage.local.set({ [CONFIG_KEY]: { baseUrl: next.baseUrl } });
    if (next.token) await chrome.storage.session.set({ [TOKEN_KEY]: next.token });
    else await chrome.storage.session.remove(TOKEN_KEY);
    return { baseUrl: next.baseUrl, configured: Boolean(next.token) };
  }
  async function clearToken() { return saveConfig({ token: "" }); }
  function language(value, fallback = "auto") {
    const code = String(value || fallback).trim().toLowerCase();
    return LANGUAGE_CODES[code] || code;
  }
  function apiError(status, data, token = "") {
    const code = data?.code || data?.errorCode || data?.error?.code || (typeof data?.error === "string" ? data.error : "textamisu_api_error");
    const detail = typeof data?.message === "string" ? data.message : typeof data?.error?.message === "string" ? data.error.message : typeof data?.error === "string" ? data.error : "";
    const labels = { 401: "Textamisu token 無效或已失效。", 402: "Textamisu 可用額度不足。", 403: "這個 token 沒有執行此操作的權限。", 409: "請求識別碼已用於不同內容，請重新開始字幕。", 429: "請求過於頻繁，請稍後再試。" };
    let message = labels[status] || detail || `Textamisu API 請求失敗（${status}）。`;
    if (token) message = message.split(token).join("[redacted]");
    const error = new Error(message.slice(0, 500));
    error.status = status;
    error.code = /^[a-z][a-z0-9_]{0,99}$/.test(String(code)) && !String(code).startsWith("pt_sk_") ? String(code) : "textamisu_api_error";
    error.data = { code: error.code, status };
    return error;
  }
  function sessionPath(id) {
    if (!id || typeof id !== "string") throw new Error("缺少 Textamisu session ID。");
    return `/live-sessions/${encodeURIComponent(id)}`;
  }
  function responseDiagnostic(method, path, contentType) {
    // Never include the configured URL, query, user identifiers, or arbitrary
    // response headers/body in a diagnostic shown by the popup/content script.
    const type = String(contentType || "").split(";")[0].trim().toLowerCase();
    const allowedTypes = ["application/json", "application/problem+json", "text/html", "text/plain", "application/octet-stream"];
    const safeType = allowedTypes.includes(type) ? type : type ? "other" : "missing";
    const route = ["/credits", "/live-sessions"].includes(path) ? path
      : /^\/live-sessions\/[^/]+\/operations\/[^/]+$/.test(path) ? "/live-sessions/:id/operations/:requestId"
      : /^\/live-sessions\/[^/]+\/(stt|translate|chat-translate|end)$/.test(path) ? "/live-sessions/:id/" + path.split("/").at(-1)
      : /^\/live-sessions\/[^/]+$/.test(path) ? "/live-sessions/:id" : "unknown-route";
    return { method: ["GET", "POST"].includes(method) ? method : "OTHER", route, contentType: safeType };
  }
  function responseError(status, diagnostic, code, message, token = "") {
    const error = apiError(status, { code, message }, token);
    error.message += `（${diagnostic.method} ${diagnostic.route}；HTTP ${status}；Content-Type: ${diagnostic.contentType}）`;
    error.data = { ...error.data, ...diagnostic };
    return error;
  }
  async function request(path, { method = "GET", body, signal, timeoutMs = 45000 } = {}) {
    const config = await getConfig();
    if (!config.token) throw apiError(401, { code: "token_missing" });
    if (!path.startsWith("/") || path.startsWith("//")) throw new Error("Invalid API path.");
    const controller = new AbortController();
    const abort = () => controller.abort(signal?.reason);
    if (signal?.aborted) abort(); else signal?.addEventListener("abort", abort, { once: true });
    const timer = setTimeout(() => controller.abort(new DOMException("Textamisu API request timed out", "TimeoutError")), Math.max(1, timeoutMs));
    const multipart = body instanceof FormData;
    try {
      let response, raw;
      try {
        response = await fetch(config.baseUrl + path, {
          method,
          headers: { Authorization: `Bearer ${config.token}`, Accept: "application/json", ...(!multipart && body !== undefined ? { "Content-Type": "application/json" } : {}) },
          ...(body !== undefined ? { body: multipart ? body : JSON.stringify(body) } : {}),
          credentials: "omit", redirect: "error", cache: "no-store", signal: controller.signal,
        });
        raw = await response.text();
      } catch (error) {
        // A lost response does not tell us whether the server accepted the operation.
        if (!signal?.aborted && error && typeof error === "object") error.transportError = true;
        throw error;
      }
      const diagnostic = responseDiagnostic(method, path, response.headers.get("content-type"));
      let data;
      try { data = JSON.parse(raw); }
      catch {
        const message = response.status === 404 ? "Textamisu API 路徑回傳 404；請確認 API 網址與直播 API 是否已部署。"
          : [502, 503].includes(response.status) ? "Textamisu API 閘道或後端暫時無法使用。"
          : response.ok && diagnostic.contentType === "text/html" ? "Textamisu API 回傳網頁而非 JSON；請確認 API 網址與後端部署版本。"
          : "Textamisu API 未回傳有效 JSON；請確認 API 網址與回應格式。";
        throw responseError(response.status, diagnostic, "invalid_json", message, config.token);
      }
      if (!response.ok) throw apiError(response.status, data, config.token);
      return { status: response.status, data, diagnostic, retryAfter: Math.min(5000, Math.max(250, Number(response.headers.get("retry-after")) * 1000 || 750)) };
    } finally { clearTimeout(timer); signal?.removeEventListener("abort", abort); }
  }
  async function pause(ms, signal) {
    if (signal?.aborted) throw signal.reason || new DOMException("Aborted", "AbortError");
    await new Promise((resolve, reject) => {
      const done = () => { signal?.removeEventListener("abort", abort); resolve(); };
      const timer = setTimeout(done, ms);
      const abort = () => { clearTimeout(timer); signal?.removeEventListener("abort", abort); reject(signal.reason || new DOMException("Aborted", "AbortError")); };
      signal?.addEventListener("abort", abort, { once: true });
    });
  }
  function operationResult(data) {
    const state = data?.state || data?.status;
    if (["failed", "cancelled", "canceled", "expired"].includes(state)) throw apiError(Number(data.errorStatus) || (state === "failed" ? 502 : 409), data);
    if (state === "payment_required") throw apiError(402, data);
    return data?.result && typeof data.result === "object" ? { ...data.result, ...(data.billing ? { billing: data.billing } : {}) } : data;
  }
  function pendingError(requestId) {
    const error = new Error("尚未能確認 Textamisu 工作結果，請稍後查詢同一筆工作。");
    error.status = 202; error.code = "operation_pending"; error.requestId = requestId;
    return error;
  }
  function budgetOptions(options, deadline, requestId) {
    if (options.signal?.aborted) throw options.signal.reason || new DOMException("Aborted", "AbortError");
    const remaining = deadline - Date.now();
    if (remaining <= 0) throw pendingError(requestId);
    return { ...options, timeoutMs: Math.min(Number(options.timeoutMs) || 45000, remaining) };
  }
  function ambiguous(error, options) {
    return !options.signal?.aborted && (error.transportError || error.name === "TimeoutError" || [502, 503].includes(error.status)
      || (error.code === "invalid_json" && error.status >= 200 && error.status < 300));
  }
  async function lookupOperation(sessionId, requestId, options, deadline, allowMissing = false) {
    for (;;) {
      try {
        return await request(`${sessionPath(sessionId)}/operations/${encodeURIComponent(requestId)}`, budgetOptions(options, deadline, requestId));
      } catch (error) {
        // An HTML 404 or generic proxy 404 does not prove the charged operation
        // is absent. Only this explicit backend JSON code allows resubmission.
        if (allowMissing && error.status === 404 && error.code === "operation_not_found") return null;
        if (!ambiguous(error, options)) throw error;
        await pause(Math.min(750, Math.max(1, deadline - Date.now())), options.signal);
      }
    }
  }
  async function settle(sessionId, requestId, first, options = {}) {
    let response = first;
    const deadline = options.deadlineAt || Date.now() + Math.min(120000, Number(options.pollTimeoutMs) || 120000);
    while (response.status === 202) {
      if (Date.now() >= deadline) throw pendingError(requestId);
      await pause(Math.min(response.retryAfter, Math.max(1, deadline - Date.now())), options.signal);
      response = await lookupOperation(sessionId, requestId, options, deadline);
    }
    return operationResult(response.data);
  }
  async function operation(sessionId, requestId, options = {}) {
    if (!requestId) throw new Error("缺少 Textamisu request ID。");
    const deadlineAt = Date.now() + Math.min(120000, Number(options.pollTimeoutMs) || 120000);
    return settle(sessionId, requestId, await lookupOperation(sessionId, requestId, options, deadlineAt), { ...options, deadlineAt });
  }
  async function submit(sessionId, action, body, requestId, options = {}) {
    if (!requestId) throw new Error("缺少 Textamisu request ID。");
    const deadline = Date.now() + Math.min(120000, Number(options.pollTimeoutMs) || 120000);
    let attempts = 0, missingRetries = 0;
    for (;;) {
      let response;
      try {
        response = await request(`${sessionPath(sessionId)}/${action}`, { ...budgetOptions(options, deadline, requestId), method: "POST", body });
      } catch (error) {
        if (options.signal?.aborted) throw options.signal.reason || error;
        // The server rejects this condition before creating an operation. Reuse the exact ID/body.
        if (action === "translate" && error.status === 409 && error.code === "stt_translation_busy") {
          if (Date.now() >= deadline) throw error;
          await pause(Math.min(2000, 500 + attempts++ * 250, Math.max(1, deadline - Date.now())), options.signal);
          continue;
        }
        if (!ambiguous(error, options)) throw error;
        response = await lookupOperation(sessionId, requestId, options, deadline, true);
        if (!response) {
          // Retry a lost submission only after the server confirms this ID does not exist.
          if (missingRetries++ >= 2) throw error;
          await pause(Math.min(500 + missingRetries * 250, Math.max(1, deadline - Date.now())), options.signal);
          continue;
        }
      }
      return settle(sessionId, requestId, response, { ...options, deadlineAt: deadline });
    }
  }
  async function stt(sessionId, payload, options = {}) {
    const audio = payload.audio instanceof Blob ? payload.audio : new Blob([payload.audio], { type: payload.mimeType || "audio/wav" });
    if (!audio.size) throw new Error("沒有可辨識的音訊。");
    const speed = Number(payload.audioSpeed ?? 1);
    if (speed !== 1) throw new Error("Textamisu 音訊速度必須為 1，以原始時間計算音訊長度。");
    const form = new FormData();
    form.append("file", audio, "caption.wav");
    form.append("requestId", payload.requestId);
    form.append("sourceLanguage", language(payload.sourceLanguage));
    form.append("audioSpeed", String(speed));
    return submit(sessionId, "stt", form, payload.requestId, options);
  }
  async function translate(sessionId, payload, options = {}) {
    return submit(sessionId, "translate", {
      requestId: payload.requestId, sttRequestIds: Array.isArray(payload.sttRequestIds) ? payload.sttRequestIds : [], text: String(payload.text || ""),
      sourceLanguage: language(payload.sourceLanguage), targetLanguage: language(payload.targetLanguage, "zh-TW"),
      ...(payload.previousSourceContext ? { previousSourceContext: String(payload.previousSourceContext) } : {}),
    }, payload.requestId, options);
  }
  async function chatTranslate(sessionId, payload, options = {}) {
    return submit(sessionId, "chat-translate", {
      requestId: payload.requestId,
      messages: (payload.messages || []).map(item => ({ id: String(item.id), text: String(item.text || ""), ...(item.author ? { author: String(item.author) } : {}) })),
      sourceLanguage: language(payload.sourceLanguage), targetLanguage: language(payload.targetLanguage, "zh-TW"), mode: payload.mode === "reply" ? "reply" : "live-chat",
    }, payload.requestId, options);
  }
  globalThis.TextamisuApi = Object.freeze({
    CONFIG_KEY, TOKEN_KEY, DEFAULT_BASE_URL, normalizeBaseUrl, language, getConfig, saveConfig, clearToken,
    credits: async (options = {}) => (await request("/credits", options)).data,
    startSession: async (options = {}) => {
      const response = await request("/live-sessions", { ...options, method: "POST", body: {} });
      if (typeof response.data?.sessionId !== "string" || !response.data.sessionId.trim()) {
        throw responseError(response.status, response.diagnostic, "invalid_session_response", "Textamisu API 未回傳有效的工作階段 ID；請確認直播 API 是否已部署。");
      }
      return response.data;
    },
    session: async (id, options = {}) => (await request(sessionPath(id), options)).data,
    endSession: async (id, options = {}) => (await request(`${sessionPath(id)}/end`, { ...options, method: "POST", body: {} })).data,
    stt, translate, chatTranslate, operation,
  });
})();
