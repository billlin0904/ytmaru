/* Account balance is supplied by Textamisu, never estimated from legacy rates. */
(function (global) {
  "use strict";
  const amount = value => typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
  const format = value => value === null ? "--" : value.toLocaleString("en-US", { maximumFractionDigits: 6 });
  function estimate(snapshot) {
    if (!snapshot) return { summary: "額度讀取中", balance: "讀取中", time: "讀取中", rate: "Textamisu", note: "", sessionUsage: "本次已扣 -- credits" };
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
    let context = null, snapshot = null, failed = false, timer = null, generation = 0, running = false, lastPoll = -Infinity, rendered = null;
    function render() {
      if (!context?.root) return;
      const view = estimate(snapshot);
      if (failed) {
        view.summary = snapshot ? "額度待更新" : "額度暫時無法讀取";
        view.balance = snapshot ? view.balance + "（上次資料）" : "暫時無法讀取";
        view.note = "無法取得最新額度，請稍後再試。";
      }
      rendered = view;
      const tooltip = [view.balance, view.sessionUsage, view.rate, view.note].filter(Boolean).join("\n");
      for (const field of context.root.querySelectorAll("[data-balance-field]")) {
        field.textContent = view[field.dataset.balanceField] || "";
        if (field.dataset.balanceField === "summary") field.title = tooltip;
        if (field.dataset.balanceField === "time") {
          const label = field.closest?.(".usage-row")?.querySelector("dt");
          if (label) label.textContent = "本次已扣";
        }
      }
    }
    function stop() {
      generation++;
      if (timer !== null) clearTimer(timer);
      timer = null; context = null; snapshot = null; failed = false; running = false; lastPoll = -Infinity; rendered = null;
    }
    async function poll() {
      if (!context?.active || running) return;
      running = true; lastPoll = now();
      const current = generation, sessionId = context.sessionId;
      try {
        const reply = await request({ type: "GET_SUBTITLE_BALANCE", sessionId });
        if (current !== generation) return;
        if (!reply?.ok || reply.sessionId !== sessionId || !reply.billing || typeof reply.billing !== "object") throw new Error("balance unavailable");
        snapshot = { credits: reply.credits, billing: reply.billing };
        failed = false;
      } catch {
        if (current !== generation) return;
        failed = true;
      } finally {
        if (current === generation) {
          running = false; render();
          timer = setTimer(() => { timer = null; poll(); }, failed ? 5000 : 30000);
        }
      }
    }
    return {
      update(next) {
        if (!next.active || !next.sessionId) { stop(); return; }
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
