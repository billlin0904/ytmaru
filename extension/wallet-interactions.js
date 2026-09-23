(() => {
  const fail = (code, message) => Object.assign(new Error(message), { code, textamisuInteraction: true });
  const language = value => ({ eng: "en", jpn: "ja", kor: "ko", tha: "th", zho: "zh-TW", zh: "zh-TW", "zh-tw": "zh-TW", "zh-hant": "zh-TW" }[String(value || "").toLowerCase()] || String(value || "auto"));

  function messagesFor(request) {
    let messages;
    if (request.mode === "live-chat-batch") {
      try { messages = JSON.parse(request.text); }
      catch { throw fail("chat_request_invalid", "聊天室批次格式無效，請重新開啟聊天室。"); }
    } else {
      messages = [{ id: "1", text: request.text }];
    }
    if (!Array.isArray(messages) || !messages.length || messages.length > 12)
      throw fail("chat_request_invalid", "聊天室批次必須包含 1 至 12 則留言。");
    const ids = new Set();
    return messages.map(message => {
      if (!message || typeof message.id !== "string" || !message.id || ids.has(message.id) || typeof message.text !== "string" || !message.text.trim())
        throw fail("chat_request_invalid", "聊天室留言格式無效。");
      ids.add(message.id);
      return { id: message.id, ...(typeof message.author === "string" ? { author: message.author } : {}), text: message.text };
    });
  }

  function normalizeResult(data, requestId, messages, batch) {
    if (data?.requestId !== requestId || !Array.isArray(data.translations))
      throw fail("chat_response_invalid", "聊天室翻譯回應格式不符，請稍後再試。");
    const expected = new Set(messages.map(message => message.id));
    const translated = new Map();
    for (const item of data.translations) {
      if (!item || typeof item.id !== "string" || !expected.has(item.id) || translated.has(item.id) || typeof item.translation !== "string")
        throw fail("chat_response_invalid", "聊天室翻譯回應的留言編號不符。");
      translated.set(item.id, item.translation);
    }
    if (translated.size !== messages.length)
      throw fail("chat_response_incomplete", "聊天室翻譯未傳回全部留言，請稍後再試。");
    const translations = messages.map(message => ({ id: message.id, translation: translated.get(message.id) }));
    return {
      requestId,
      translations,
      ...(data.billing && typeof data.billing === "object" ? { billing: data.billing } : {}),
      billingProtocol: "textamisu",
      translation: batch ? JSON.stringify(translations) : translations[0].translation,
    };
  }

  globalThis.SubruuWalletInteractions = Object.freeze({
    create: function ({ sendMessage = message => chrome.runtime.sendMessage(message), randomId = () => crypto.randomUUID(), timeoutMs = 100000 } = {}) {
      let closed = false;
      const requests = new WeakMap();
      const pending = new Set();
      const assertCurrent = context => {
        if (closed || !context.sessionId || context.isCurrent?.() === false)
          throw fail("chat_session_changed", "字幕工作階段已結束，請重新開始。");
      };
      return {
        translate: async function (context, request) {
          assertCurrent(context);
          if (context.requestIsCurrent?.() === false)
            throw fail("chat_request_expired", "留言已過時，改翻譯下一批。");
          const messages = messagesFor(request);
          if (request.mode === "reply" && Array.from(messages[0].text).length > 1000)
            throw fail("reply_too_long", "單則回覆最多 1,000 字，請縮短內容。");
          const mode = request.mode === "reply" ? "reply" : "live-chat";
          const sourceLanguage = language(request.sourceLang);
          const targetLanguage = language(request.targetLang);
          const identity = JSON.stringify({ sessionId: context.sessionId, messages, mode, sourceLanguage, targetLanguage });
          let remembered = requests.get(request);
          if (remembered?.identity !== identity) {
            remembered = { identity, requestId: randomId() };
            requests.set(request, remembered);
          }
          const requestId = remembered.requestId;
          let timer;
          let rejectPending;
          const cancelled = new Promise((_, reject) => {
            rejectPending = reject;
            timer = setTimeout(() => reject(fail("chat_request_timeout", "翻譯尚未完成，請稍後再試。")), Math.min(100000, Math.max(1000, timeoutMs)));
          });
          pending.add(rejectPending);
          try {
            // Only the worker owns service credentials and performs network requests.
            context.onDispatched?.();
            const response = await Promise.race([
              Promise.resolve().then(() => sendMessage({
                type: "TEXTAMISU_CHAT_TRANSLATE",
                sessionId: context.sessionId,
                payload: { requestId, messages, sourceLanguage, targetLanguage, mode },
              })),
              cancelled,
            ]);
            assertCurrent(context);
            if (!response?.ok) {
              const code = response?.code || response?.error?.code || (typeof response?.error === "string" ? response.error : "chat_translation_failed");
              const message = code === "source_language_required"
                ? "聊天室需要明確的原文語言，請在「留言原文語言」選擇語言後再試。"
                : code === "target_language_required"
                  ? "請先選擇回覆的目標語言。"
                  : response?.error?.message || response?.message || (typeof response?.error === "string" ? response.error : "聊天室翻譯失敗，請稍後再試。");
              throw fail(code, message);
            }
            return normalizeResult(response.data, requestId, messages, request.mode === "live-chat-batch");
          } finally {
            clearTimeout(timer);
            pending.delete(rejectPending);
          }
        },
        research: async function () {
          throw fail("context_research_unavailable", "目前的翻譯服務尚未提供遠端語境研究。");
        },
        close: async function () {
          closed = true;
          for (const reject of pending) reject(fail("chat_session_changed", "字幕工作階段已結束。"));
          pending.clear();
        },
      };
    },
    confirmInPanel: function (panel, feature, signal) {
      if (!panel?.isConnected || signal.aborted || feature === "context-research") return Promise.resolve(false);
      return new Promise(resolve => {
        const layer = panel.ownerDocument.createElement("div"), shadow = layer.attachShadow({ mode: "open" });
        Object.assign(layer.style, { position: "absolute", inset: "0", zIndex: "20" });
        shadow.innerHTML = '<style>:host{display:block}section{padding:20px;background:#11151d;color:white;font:14px/1.6 system-ui}button{margin:8px;padding:8px 12px}</style><section role="alertdialog" aria-label="Textamisu 文字翻譯計費確認"><h2>文字翻譯</h2><p>聊天室與回覆依輸入文字累計，每 1,000 字扣 1 credit。單則回覆最多 1,000 字。實際扣款以 Textamisu 回傳結果為準。</p><button data-cancel>暫不啟用</button><button data-accept>同意按輸入字數扣點</button></section>';
        let settled = false;
        const finish = accepted => { if (settled) return; settled = true; signal.removeEventListener("abort", abort); layer.remove(); resolve(accepted); };
        const abort = () => finish(false);
        signal.addEventListener("abort", abort, { once: true });
        shadow.querySelector("[data-cancel]").onclick = () => finish(false);
        shadow.querySelector("[data-accept]").onclick = () => finish(true);
        layer.addEventListener("keydown", event => { if (event.key === "Escape") finish(false); });
        panel.appendChild(layer);
        shadow.querySelector("[data-cancel]").focus();
      });
    },
    usageSnapshot: function (billing, previous = {}) {
      if (!billing || typeof billing !== "object") return previous;
      const snapshot = { ...previous, billingProtocol: "textamisu", source: "remote-billing", textamisuBilling: billing };
      // Preserve service-reported credit amounts; do not invent USD or wallet receipts.
      if (Number.isFinite(billing.chargedCredits)) snapshot.creditsUsed = billing.chargedCredits;
      if (Number.isFinite(billing.availableCredits)) snapshot.availableCredits = billing.availableCredits;
      if (Number.isFinite(billing.reservedCredits)) snapshot.reservedCredits = billing.reservedCredits;
      if (Number.isFinite(billing.usage?.sttMs)) snapshot.sttDurationSeconds = billing.usage.sttMs / 1000;
      if (Number.isFinite(billing.usage?.chatCharacters)) snapshot.chatCharacters = billing.usage.chatCharacters;
      return snapshot;
    },
    contextConsentKey: function (e, t) {
      return `walletContextConsent:${e}:${String(t).replace(/\/+$/, "")}`;
    },
  });
})();
