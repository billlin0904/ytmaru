/* Popup settings remain local; all model requests and account data use Textamisu. */
(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const CONFIG_KEY = "liveSubtitleConfig";
  const DEFAULTS = {
    apiProvider: "textamisu", backendUrl: TextamisuApi.DEFAULT_BASE_URL,
    captionMode: "viewer-sync", smartRoutingEnabled: true, liveSharedEnabled: false,
    sourceLang: "auto", targetLang: "zh", sttProvider: "st-a", provider: "lt-n", sttAudioSpeed: 1,
    sttLanguageMode: "auto", sttPrompt: "", sttKeywords: [], sourceLanguageHints: [], translationPrompt: "",
    sttContextAutoResearchEnabled: false, sttContextSearchDirection: "", sttContextRefreshEnabled: false,
    sttContextRefreshIntervalMinutes: 3, sttContextCustom: false,
    vadEnabled: false, llmFallbackMode: "off", segmentationMode: "auto",
    overlayMode: "dual", overlayFontSize: 22, overlayFontFamily: "system", overlayEqualBilingualFontSize: false,
    overlayOpacity: 0.98, overlayOriginalColor: "#d8e2f2", overlayTranslationColor: "#ffffff",
    syncEnabled: true, syncDelayMode: "fixed", syncDelaySeconds: 10, batchWaitSeconds: 0,
    mseAudioBufferEnabled: true, mseBatchSttPipelineEnabled: true, mseSegmentSttPipelineEnabled: true,
    audioInputMode: "mse-audio-buffer", mseStartupBoostEnabled: false, audioPrefetchEnabled: false,
    voiceTranslationEnabled: true, voiceTranslationVolume: 0.8,
    mseSeekCatchupEnabled: true, mseStartupBoostMode: "fast", mseStartupBoostTargetSeconds: 24,
    disableSubtitleCache: true, adaptiveSyncDelayEnabled: false, sourcePreloadEnabled: false,
    sourcePreloadMaxLeadSeconds: 60, autoSkipAds: true, subtitleBufferTargetSegments: 3,
    syncSubtitleOffsetSeconds: 0, finalBatchingEnabled: true, saveEnabled: false,
    translationStyle: "Subtitle style: concise, natural Traditional Chinese when target is zh, no explanations.",
  };
  let settings = { ...DEFAULTS }, busy = false, configured = false, active = false, saveTimer;
  const numberKeys = new Set(Object.keys(DEFAULTS).filter(key => typeof DEFAULTS[key] === "number"));
  const arrayKeys = new Set(["sttKeywords", "sourceLanguageHints"]);
  function message(text, error = false) { $("message").textContent = text || ""; $("message").classList.toggle("error", error); }
  function setStatus(label, state = "idle") { $("statusLabel").textContent = label; $("statusLabel").removeAttribute("data-i18n"); $("statusPill").className = `status-pill ${state}`; }
  function buttons() { $("startButton").disabled = busy || !configured; $("stopButton").disabled = busy || !active; }
  async function currentTab() { const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); if (!tab?.id) throw new Error("請先開啟要翻譯的影片分頁。"); return tab; }
  async function send(type, extra = {}) { const tab = await currentTab(); return chrome.runtime.sendMessage({ type, tabId: tab.id, ...extra }); }
  function readSettings() {
    const next = { ...settings };
    for (const key of Object.keys(DEFAULTS)) {
      const field = $(key); if (!field) continue;
      if (field.type === "checkbox") next[key] = field.checked;
      else if (arrayKeys.has(key)) { try { next[key] = JSON.parse(field.value || "[]"); } catch { next[key] = []; } }
      else if (numberKeys.has(key)) next[key] = Number.isFinite(Number(field.value)) ? Number(field.value) : DEFAULTS[key];
      else next[key] = field.value;
    }
    // Provider aliases select the existing batch pipeline; they never select another service.
    Object.assign(next, { apiProvider: "textamisu", sttProvider: "st-a", provider: "lt-n", llmFallbackMode: "off", liveSharedEnabled: false, sttContextAutoResearchEnabled: false, sttContextRefreshEnabled: false, saveEnabled: false });
    next.sttAudioSpeed = 1;
    next.syncDelaySeconds = Math.max(2, Math.min(120, Number(next.syncDelaySeconds) || 10));
    next.overlayEqualBilingualFontSize = $("overlayEqualFontSizeButton")?.getAttribute("aria-pressed") === "true";
    next.uiLocale = globalThis.PopupI18n?.getLocale?.() || "zh_TW";
    return next;
  }
  function applySettings() {
    for (const [key, value] of Object.entries(settings)) {
      const field = $(key); if (!field) continue;
      if (field.type === "checkbox") field.checked = Boolean(value);
      else field.value = arrayKeys.has(key) ? JSON.stringify(value || []) : String(value ?? "");
    }
    $("overlayEqualFontSizeButton")?.setAttribute("aria-pressed", String(Boolean(settings.overlayEqualBilingualFontSize)));
    for (const kind of ["source", "target"]) renderLanguage(kind);
    renderKeywords();
  }
  async function persist() {
    clearTimeout(saveTimer);
    settings = readSettings();
    await chrome.storage.local.set({ [CONFIG_KEY]: settings });
    const result = await send("UPDATE_LIVE_SUBTITLE_CONFIG", { config: settings }).catch(() => null);
    if (result?.requiresRestart) message("設定已儲存；重新開始字幕後套用音訊設定。");
  }
  function scheduleSave() { clearTimeout(saveTimer); saveTimer = setTimeout(() => persist().catch(error => message(error.message, true)), 300); }
  function renderLanguage(kind) {
    const select = $(`${kind}Lang`), list = $(`${kind}LangList`), search = $(`${kind}LangSearch`);
    const query = (search?.value || "").trim().toLowerCase();
    $(`${kind}LangTriggerLabel`).textContent = select.selectedOptions[0]?.textContent.trim() || select.value;
    $(`${kind}LangTriggerLabel`).removeAttribute("data-i18n");
    list.replaceChildren();
    const matches = [...select.options].filter(option => !option.disabled && (!query || `${option.value} ${option.textContent}`.toLowerCase().includes(query)));
    for (const option of matches) {
      const item = document.createElement("li"); item.className = "lang-option"; item.setAttribute("role", "option"); item.setAttribute("aria-selected", String(option.selected)); item.tabIndex = 0;
      item.textContent = option.textContent.trim();
      const choose = () => { select.value = option.value; select.dispatchEvent(new Event("change", { bubbles: true })); closeLanguage(kind); renderLanguage(kind); };
      item.addEventListener("click", choose); item.addEventListener("keydown", event => { if (["Enter", " "].includes(event.key)) { event.preventDefault(); choose(); } }); list.append(item);
    }
    $(`${kind}LangCount`).textContent = String(matches.length); $(`${kind}LangEmpty`).hidden = matches.length > 0;
    if ($(`${kind}LangSearchClear`)) $(`${kind}LangSearchClear`).hidden = !query;
  }
  function closeLanguage(kind) { $(`${kind}LangPanel`).hidden = true; $(`${kind}LangTrigger`).setAttribute("aria-expanded", "false"); }
  function wireLanguages() {
    for (const kind of ["source", "target"]) {
      $(`${kind}LangTrigger`).addEventListener("click", () => {
        const panel = $(`${kind}LangPanel`), open = panel.hidden; closeLanguage(kind === "source" ? "target" : "source"); panel.hidden = !open;
        $(`${kind}LangTrigger`).setAttribute("aria-expanded", String(open)); if (open) { renderLanguage(kind); $(`${kind}LangSearch`).focus(); }
      });
      $(`${kind}LangSearch`).addEventListener("input", () => renderLanguage(kind));
      $(`${kind}LangSearchClear`).addEventListener("click", () => { $(`${kind}LangSearch`).value = ""; renderLanguage(kind); $(`${kind}LangSearch`).focus(); });
      $(`${kind}Lang`).addEventListener("change", () => renderLanguage(kind));
    }
    document.addEventListener("keydown", event => { if (event.key === "Escape") for (const kind of ["source", "target"]) closeLanguage(kind); });
    document.addEventListener("click", event => { if (!event.target.closest("[data-combobox-panel], [data-combobox-trigger]")) for (const kind of ["source", "target"]) closeLanguage(kind); });
  }
  function renderKeywords() {
    const keywords = Array.isArray(settings.sttKeywords) ? settings.sttKeywords : [];
    const input = $("sttKeywordInput"); if (input) input.value = keywords.join(", ");
    if ($("sttKeywordCount")) $("sttKeywordCount").textContent = `${keywords.length}/992`;
    if ($("sttPromptCount")) $("sttPromptCount").textContent = String(settings.sttPrompt.length);
  }
  async function refreshAccount() {
    const config = await TextamisuApi.getConfig(); configured = Boolean(config.token); buttons();
    $("textamisuBaseUrl").value = config.baseUrl;
    $("textamisuToken").placeholder = configured ? "已儲存；輸入可更換 token" : "pt_sk_…";
    $("authState").textContent = configured ? "驗證中" : "尚未設定";
    $("authEmailLabel").textContent = "";
    for (const key of ["accountBalance", "eligibleMinutes", "textMinutes", "outputMinutes"]) $(key).textContent = "--";
    if (!configured) { $("accountHint").textContent = "輸入 Textamisu token 後即可開始。"; return null; }
    try {
      const data = await TextamisuApi.credits(), credits = data.credits || data;
      const minute = value => Number.isFinite(Number(value)) && value !== null && value !== undefined ? Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 }) : "--";
      $("authState").textContent = "已連線"; $("authEmailLabel").textContent = data.account?.email || "";
      $("accountBalance").textContent = minute(credits.eligibleMinutes ?? credits.totalMinutes); $("eligibleMinutes").textContent = minute(credits.eligibleMinutes);
      $("textMinutes").textContent = minute(credits.textMinutes); $("outputMinutes").textContent = minute(credits.outputMinutes);
      $("accountHint").textContent = "額度來自 Textamisu；實際用量由 API 回覆。";
      return data;
    } catch (error) { $("authState").textContent = "連線失敗"; $("accountHint").textContent = error.message; throw error; }
  }
  async function saveToken() {
    busy = true; buttons();
    try {
      const baseUrl = TextamisuApi.normalizeBaseUrl($("textamisuBaseUrl").value);
      const origin = new URL(baseUrl).origin + "/*";
      if (!(await chrome.permissions.contains({ origins: [origin] })) && !(await chrome.permissions.request({ origins: [origin] }))) throw new Error("未授予 Textamisu API 網址的存取權。");
      const token = $("textamisuToken").value.trim();
      await TextamisuApi.saveConfig({ baseUrl, ...(token ? { token } : {}) });
      $("textamisuToken").value = ""; settings.backendUrl = baseUrl; $("backendUrl").value = baseUrl;
      await persist(); await refreshAccount(); message("Textamisu token 已儲存並驗證。");
    } catch (error) { message(error.message, true); }
    finally { busy = false; buttons(); }
  }
  async function start() {
    busy = true; buttons(); setStatus("啟動中", "starting"); message("正在建立字幕工作…");
    try {
      if (!(await TextamisuAuth.status()).configured) throw new Error("請先輸入 Textamisu token。");
      const tab = await currentTab();
      if (!/^https?:\/\//i.test(tab.url || "")) throw new Error("請先切到要翻譯的影片分頁。");
      await persist();
      const result = await chrome.runtime.sendMessage({ type: "START_LIVE_SUBTITLE", tabId: tab.id, config: readSettings() });
      if (!result?.ok) throw new Error(result?.error || "字幕啟動失敗。");
      active = true; setStatus("字幕中", "active"); message("字幕已啟動。");
    } catch (error) { setStatus("錯誤", "error"); message(error.message, true); }
    finally { busy = false; buttons(); }
  }
  async function stop() {
    busy = true; buttons();
    try { const result = await send("STOP_LIVE_SUBTITLE"); if (!result?.ok) throw new Error(result?.error || "停止失敗。"); active = false; setStatus("待命"); message("已停止字幕。"); }
    catch (error) { message(error.message, true); }
    finally { busy = false; buttons(); }
  }
  async function refreshStatus() {
    if (busy) return;
    const result = await send("GET_LIVE_SUBTITLE_STATUS").catch(() => null);
    if (result) { active = Boolean(result.active); setStatus(active ? "字幕中" : "待命", active ? "active" : "idle"); buttons(); }
  }
  async function init() {
    await globalThis.PopupI18n?.ready;
    const stored = (await chrome.storage.local.get(CONFIG_KEY))[CONFIG_KEY] || {};
    for (const key of Object.keys(DEFAULTS)) if (Object.hasOwn(stored, key)) settings[key] = stored[key];
    const api = await TextamisuApi.getConfig();
    Object.assign(settings, { backendUrl: api.baseUrl, apiProvider: "textamisu", sttProvider: "st-a", provider: "lt-n", sttAudioSpeed: 1, llmFallbackMode: "off", sttContextAutoResearchEnabled: false, sttContextRefreshEnabled: false, liveSharedEnabled: false });
    if (!["auto", "zh", "eng", "jpn", "kor", "tha"].includes(settings.sourceLang)) settings.sourceLang = "auto";
    if (!["zh", "eng", "jpn", "kor", "tha"].includes(settings.targetLang)) settings.targetLang = "zh";
    settings.sttPrompt = String(settings.sttPrompt || "");
    settings.sttKeywords = Array.isArray(settings.sttKeywords) ? settings.sttKeywords : [];
    // Old model prices do not apply to the user's Textamisu account.
    $("sttProviderHint").textContent = "由 Textamisu API 進行語音辨識"; $("providerHint").textContent = "由 Textamisu API 翻譯成目標語言";
    $("sttAudioSpeedHint").textContent = "保持原始音訊時長（1×）"; $("sttAudioSpeedHint").removeAttribute("data-i18n");
    for (const id of ["sttContextAutoResearchEnabled", "sttContextRefreshEnabled", "sttContextResearchButton"]) { if ($(id)) { $(id).disabled = true; $(id).title = "Textamisu API 尚未提供自動搜尋接口"; } }
    if ($("sttContextResearchStatus")) { $("sttContextResearchStatus").textContent = "自訂提示與詞彙保留在設定中；目前 Textamisu API 不接受自動搜尋或 STT 提示。"; $("sttContextResearchStatus").removeAttribute("data-i18n"); }
    applySettings(); wireLanguages();
    for (const key of Object.keys(DEFAULTS)) { const field = $(key); if (!field) continue; field.addEventListener("change", scheduleSave); if (["text", "number", "range", "color"].includes(field.type) || field.tagName === "TEXTAREA") field.addEventListener("input", scheduleSave); }
    $("sttKeywordInput")?.addEventListener("change", () => { settings.sttKeywords = [...new Set($("sttKeywordInput").value.split(/[,，、\n]+/).map(value => value.trim()).filter(Boolean))].slice(0, 992); $("sttKeywords").value = JSON.stringify(settings.sttKeywords); renderKeywords(); scheduleSave(); });
    $("sttPrompt")?.addEventListener("input", () => { $("sttPromptCount").textContent = String($("sttPrompt").value.length); });
    $("advancedToggle").addEventListener("click", () => { const open = $("popupPanel").classList.toggle("advanced-open"); $("advancedToggle").classList.toggle("is-open", open); $("advancedToggle").setAttribute("aria-expanded", String(open)); $("settingsViewLabel").textContent = open ? "進階設定" : "快速設定"; });
    $("audioPrefetchEnabled")?.addEventListener("change", async event => { if (event.target.checked && !(await chrome.permissions.request({ origins: ["https://*.googlevideo.com/*"] }))) event.target.checked = false; await persist(); });
    $("saveTokenButton").addEventListener("click", saveToken);
    $("refreshCreditsButton").addEventListener("click", () => refreshAccount().catch(error => message(error.message, true)));
    $("clearTokenButton").addEventListener("click", async () => { await TextamisuApi.clearToken(); $("textamisuToken").value = ""; await refreshAccount(); message("已清除本次瀏覽器工作階段的 token。"); });
    $("startButton").addEventListener("click", start); $("stopButton").addEventListener("click", stop);
    $("overlayEqualFontSizeButton")?.addEventListener("click", () => { const button = $("overlayEqualFontSizeButton"); button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true")); scheduleSave(); });
    await Promise.allSettled([refreshAccount(), refreshStatus()]);
    setInterval(() => refreshStatus(), 2500);
  }
  init().catch(error => { message(error.message, true); setStatus("初始化失敗", "error"); });
})();
