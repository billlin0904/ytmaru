/* Account balance is supplied by Textamisu, never estimated from legacy rates. */
(function (global) {
  "use strict";
  const amount = value => typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
  const format = value => value === null ? "--" : value.toLocaleString("en-US", { maximumFractionDigits: 6 });
  function statusNote(error) {
    if (error?.status === 401) return "Textamisu token 已失效，請到擴充功能設定重新輸入。";
    if (error?.status === 403) return "Textamisu token 權限不足，請確認額度與字幕讀取權限。";
    if (error?.status === 404 || error?.code === "live_session_unavailable") return "無法取得即時字幕工作階段（404），請確認 Textamisu API 與工作階段。";
    if (["balance_timeout", "request_timeout"].includes(error?.code) || error?.status === 408) return "Textamisu 回應逾時，將自動重試。";
    if (error?.code === "wrong-session" || error?.reason === "wrong-session") return "字幕工作階段已結束，請重新啟動字幕。";
    if (error?.code === "session_pending") return "字幕工作階段尚未就緒，將自動更新本次用量。";
    return "無法取得最新額度，將自動重試。";
  }
  function estimate(snapshot) {
    if (!snapshot) return { summary: "額度讀取中", balance: "讀取中", time: "讀取中", rate: "Textamisu", note: "", sessionUsage: "本次已扣 -- credits" };
    if (!snapshot.billing) {
      const account = amount(snapshot.credits?.totalMinutes);
      return {
        summary: "帳戶 " + format(account) + " credits · 本次用量待同步",
        balance: "帳戶餘額 " + format(account) + " credits",
        time: "尚未取得", rate: "尚未取得", sessionUsage: "本次已扣尚未取得",
        note: statusNote(snapshot.balanceError || { code: "session_pending" }) + " 帳戶餘額尚未扣除工作階段預留額度。",
        accountCredits: account, remainingCredits: null, reservedCredits: null, chargedCredits: null,
        remainingSeconds: null, creditsPerHour: null,
      };
    }
    const billing = snapshot.billing || {}, rates = billing.rates || {};
    const available = amount(billing.availableCredits), reserved = amount(billing.reservedCredits), charged = amount(billing.chargedCredits);
    const rate = [];
    if (amount(rates.sttCreditsPerMinute) !== null) rate.push("辨識 " + format(rates.sttCreditsPerMinute) + " credits／分鐘");
    if (amount(rates.captionCreditsPerMinute) !== null) rate.push("字幕 " + format(rates.captionCreditsPerMinute) + " credits／分鐘");
    if (amount(rates.chatInputCharactersPerCredit) > 0) rate.push("聊天每 " + format(rates.chatInputCharactersPerCredit) + " 字／credit");
    const sessionUsage = "本次已扣 " + format(charged) + " credits";
    return {
      summary: "可用 " + format(available) + " credits · " + sessionUsage,
      balance: "可用 " + format(available) + "／預留 " + format(reserved) + " credits",
      time: format(charged) + " credits",
      rate: rate.join(" · ") || "Textamisu",
      note: "依 Textamisu 回傳的實際額度與用量顯示。",
      sessionUsage, remainingCredits: available, reservedCredits: reserved, chargedCredits: charged,
      remainingSeconds: null, creditsPerHour: null,
    };
  }
  function createMonitor({ request = message => chrome.runtime.sendMessage(message), now = Date.now, setTimer = setTimeout, clearTimer = clearTimeout } = {}) {
    let context = null, snapshot = null, failure = null, timer = null, cancelPending = null, generation = 0, running = false, lastPoll = -Infinity, rendered = null;
    function render() {
      if (!context?.root) return;
      const view = estimate(snapshot);
      if (!context.active || !context.sessionId) {
        Object.assign(view, { summary: "字幕尚未啟動", balance: "尚未取得", time: "尚未取得", rate: "Textamisu", note: "啟動字幕後會讀取額度與本次用量。", sessionUsage: "" });
      } else if (failure) {
        view.summary = snapshot ? "額度待更新" : "額度暫時無法讀取";
        view.balance = snapshot ? view.balance + "（上次資料）" : "暫時無法讀取";
        if (!snapshot) { view.time = "尚未取得"; view.rate = "尚未取得"; }
        view.note = statusNote(failure);
      }
      rendered = view;
      const tooltip = [view.balance, view.sessionUsage, view.rate, view.note].filter(Boolean).join("\n");
      for (const field of context.root.querySelectorAll("[data-balance-field]")) {
        field.textContent = view[field.dataset.balanceField] || "";
        if (field.dataset.balanceField === "summary") field.title = tooltip;
        if (field.dataset.balanceField === "balance") {
          const label = field.closest?.(".usage-row")?.querySelector("dt");
          if (label) label.textContent = snapshot?.billing ? "可用／預留" : "帳戶餘額";
        }
        if (field.dataset.balanceField === "time") {
          const label = field.closest?.(".usage-row")?.querySelector("dt");
          if (label) label.textContent = "本次已扣";
        }
      }
    }
    function stop() {
      generation++;
      if (timer !== null) clearTimer(timer);
      cancelPending?.();
      timer = null; context = null; snapshot = null; failure = null; running = false; lastPoll = -Infinity; rendered = null;
    }
    async function poll() {
      if (!context?.active || running) return;
      running = true; lastPoll = now();
      const current = generation, sessionId = context.sessionId;
      try {
        // Also bound the extension message itself: a stopped/restarted worker
        // may never complete the request, independently of HTTP timeouts.
        const reply = await new Promise((resolve, reject) => {
          let settled = false;
          const finish = (callback, value) => {
            if (settled) return;
            settled = true; clearTimer(deadline);
            if (cancelPending === cancel) cancelPending = null;
            callback(value);
          };
          const cancel = () => finish(reject, { code: "cancelled" });
          const deadline = setTimer(() => finish(reject, { code: "balance_timeout" }), 8000);
          cancelPending = cancel;
          Promise.resolve().then(() => settled ? undefined : request({ type: "GET_SUBTITLE_BALANCE", sessionId }))
            .then(value => finish(resolve, value), error => finish(reject, error));
        });
        if (current !== generation) return;
        if (!reply?.ok || reply.sessionId !== sessionId) throw reply || { code: "balance_unavailable" };
        if ((!reply.billing || typeof reply.billing !== "object") && amount(reply.credits?.totalMinutes) === null) throw { code: "balance_unavailable" };
        snapshot = { credits: reply.credits, billing: reply.billing, balanceState: reply.balanceState, balanceError: reply.balanceError };
        failure = null;
      } catch (error) {
        if (current !== generation) return;
        failure = error || { code: "balance_unavailable" };
      } finally {
        if (current === generation) {
          running = false; render();
          timer = setTimer(() => { timer = null; poll(); }, failure || !snapshot?.billing ? 5000 : 30000);
        }
      }
    }
    return {
      update(next) {
        if (!next.active || !next.sessionId) { stop(); context = next; render(); return; }
        if (context && context.sessionId !== next.sessionId) stop();
        context = next; render();
        if (!running && timer === null && now() - lastPoll >= 30000) poll();
      },
      stop,
      summary: () => rendered?.summary || "",
    };
  }
  function renderMetrics(panel, fields, metrics) {
    if (!panel) return;
    for (const field of fields || []) {
      const visible = Object.hasOwn(metrics, field.dataset.usageField);
      const row = field.closest?.(".usage-row");
      if (row) { row.hidden = !visible; row.style.display = visible ? "" : "none"; }
      field.textContent = visible ? metrics[field.dataset.usageField] : "";
    }
    for (const note of panel.querySelectorAll(".usage-note")) {
      if (!note.hasAttribute("data-balance-field")) { note.hidden = true; note.style.display = "none"; }
    }
    for (const section of panel.querySelectorAll(".usage-section")) {
      const rows = [...section.querySelectorAll(".usage-row")];
      section.hidden = rows.length > 0 && rows.every(row => row.hidden);
      section.style.display = section.hidden ? "none" : "";
    }
    const title = panel.querySelector(".usage-panel-title");
    if (title) title.textContent = "Textamisu 用量與狀態";
  }
  const api = { estimate, hourlyRate: () => null, createMonitor, renderMetrics };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  global.SubruuCaptionBalance = api;
})(globalThis);
