(() => {
  const e = (e, t = 0, a = null) =>
      Object.assign(
        new Error(e),
        { code: e, status: t },
        !0 === a?.terminal
          ? {
              terminal: !0,
              usagePending: !0 === a.usagePending,
              ...(!1 === a.providerCalled ? { providerCalled: !1 } : {}),
            }
          : {},
      ),
    t = {
      create: function ({
        fetch: t = globalThis.fetch,
        now: a = () => performance.now(),
        report: r = () => {},
      } = {}) {
        const s = new Set(),
          n = (t) =>
            t.reason instanceof Error ? t.reason : e("wallet_session_changed");
        function o(e, t) {
          return t.aborted
            ? Promise.reject(n(t))
            : new Promise((a, r) => {
                const s = () => r(n(t));
                (t.addEventListener("abort", s, { once: !0 }),
                  Promise.resolve(e)
                    .then(a, r)
                    .finally(() => t.removeEventListener("abort", s)));
              });
        }
        function i(e, t) {
          return new Promise((a, r) => {
            if (t.aborted) return r(n(t));
            const s = () => {
                (clearTimeout(o), r(n(t)));
              },
              o = setTimeout(() => {
                (t.removeEventListener("abort", s), a());
              }, e);
            t.addEventListener("abort", s, { once: !0 });
          });
        }
        return {
          request: async function ({
            backendUrl: l,
            sessionId: d,
            requestId: c,
            stage: u,
            timeoutMs: w,
            getHeaders: _,
            makeRequest: h,
            isCurrent: m,
            signal: f,
            inspectOnly: g = !1,
            remainingBudgetMs: p,
          }) {
            if (!(["stt", "llm"].includes(u) && d && c && Number.isFinite(w)))
              throw e("wallet_request_invalid");
            if (w <= 0) throw e("wallet_deadline_expired");
            const v = a(),
              b = v + Math.min(12e4, w),
              M = new AbortController(),
              E = () => {
                const e = p?.();
                return Math.max(
                  0,
                  Math.min(b - a(), Number.isFinite(e) ? e : 1 / 0),
                );
              },
              y = () => {
                if (M.signal.aborted) throw n(M.signal);
                if (!1 === m?.()) throw e("wallet_session_changed");
                if (E() <= 0) throw e("wallet_deadline_expired");
              },
              T = () => M.abort(f?.reason || e("wallet_session_changed"));
            (f?.addEventListener("abort", T, { once: !0 }), f?.aborted && T());
            const q = setTimeout(
                () => M.abort(e("wallet_deadline_expired")),
                Math.max(1, E()),
              ),
              x = setInterval(() => {
                try {
                  y();
                } catch (e) {
                  M.abort(e);
                }
              }, 200);
            s.add(M);
            let C = null,
              I = 0,
              P = 0,
              R = !1,
              L = 0,
              $ = 0;
            try {
              y();
              const s = await o(_(), M.signal);
              y();
              const w = a(),
                f = {};
              for (const [e, t] of Object.entries(s || {}))
                /^(authorization|x-api-key)$/i.test(e) && (f[e] = t);
              const p = `${l}/caption-wallet-sessions/${encodeURIComponent(d)}`,
                b = async (a, r, s = !1) => {
                  y();
                  const i = new AbortController(),
                    l = () => i.abort(n(M.signal));
                  M.signal.addEventListener("abort", l, { once: !0 });
                  const d = s
                    ? setTimeout(
                        () => i.abort(e("wallet_result_read_timeout")),
                        Math.min(4e3, E()),
                      )
                    : null;
                  try {
                    const e = await o(
                        t(a, {
                          ...r,
                          redirect: "error",
                          cache: "no-store",
                          signal: i.signal,
                        }),
                        i.signal,
                      ),
                      s = await o(e.json(), i.signal);
                    return (y(), { data: s, status: e.status, ok: e.ok });
                  } finally {
                    (clearTimeout(d), M.signal.removeEventListener("abort", l));
                  }
                };
              if (g)
                return await b(
                  `${p}/operations/${encodeURIComponent(c)}`,
                  { method: "GET", headers: f },
                  !0,
                );
              const T = await o(
                new Promise((t, r) => {
                  let n = null,
                    l = !1;
                  const d = async () => {
                      try {
                        for (;;) {
                          y();
                          const r = await o(h(E()), M.signal);
                          (y(), P++, (C ??= a()));
                          const n = await b(
                            `${p}/${"stt" === u ? "stt" : "translate"}`,
                            {
                              method: "POST",
                              ...r,
                              headers: { ...s, ...r.headers },
                            },
                          );
                          if (
                            "wallet_cost_pending_stop" === n.data?.error ||
                            ("wallet_translation_unavailable_stop" ===
                              n.data?.error &&
                              !0 === n.data.sessionStopped)
                          )
                            return void t(n);
                          if (
                            429 !== n.status ||
                            ![
                              "wallet_concurrency_limit",
                              "wallet_request_rate_limit",
                            ].includes(n.data?.error)
                          ) {
                            if (!n.ok)
                              throw e(
                                n.data.error ||
                                  "wallet_provider_request_failed",
                                n.status,
                                n.data,
                              );
                            if (n.data?.translationError)
                              throw e("wallet_translation_failed", 502);
                            return void t(n);
                          }
                          {
                            if (L >= 8) throw e(n.data.error, n.status);
                            const t = Math.min(4e3, 500 * 2 ** L);
                            if (E() <= t + 500) throw e(n.data.error, n.status);
                            (L++, ($ += t), await i(t, M.signal));
                          }
                        }
                      } catch (e) {
                        ((n = e),
                          ((e) =>
                            !0 === e.terminal ||
                            "wallet_translation_failed" === e.code ||
                            (e.status >= 400 &&
                              e.status < 500 &&
                              ![
                                "wallet_translation_dispatched",
                                "wallet_translation_reserved",
                                "wallet_stt_dispatched",
                                "wallet_stt_reserved",
                              ].includes(e.code)))(e) ||
                          M.signal.aborted ||
                          !1 === m?.()
                            ? r(e)
                            : w());
                      }
                    },
                    w = async () => {
                      if (!l) {
                        l = !0;
                        try {
                          for (; I < 12; ) {
                            let a;
                            (y(), I++);
                            try {
                              a = await b(
                                `${p}/operations/${encodeURIComponent(c)}`,
                                { method: "GET", headers: f },
                                !0,
                              );
                            } catch (e) {
                              y();
                            }
                            if (200 === a?.status) {
                              const r = a.data;
                              if (
                                r.requestId !== c ||
                                r.stage !== u ||
                                !r.result ||
                                !["settled", "usage-pending"].includes(r.state)
                              )
                                throw e("wallet_result_invalid");
                              if (r.result.translationError)
                                throw e("wallet_translation_failed", 502);
                              if (r.result.sttError)
                                throw e(
                                  r.result.sttError,
                                  r.result.sttErrorStatus || 503,
                                  { terminal: !0, providerCalled: !1 },
                                );
                              return (
                                (R = !0),
                                void t({
                                  status: 200,
                                  ok: !0,
                                  data: {
                                    ...r.result,
                                    receipt: r.receipt,
                                    usagePending: !0 === r.usagePending,
                                    duplicate: !0,
                                    cacheEvidenceRecorded:
                                      !0 === r.cacheEvidenceRecorded,
                                  },
                                })
                              );
                            }
                            if (
                              404 === a?.status &&
                              "wallet_operation_not_found" === a.data.error &&
                              n &&
                              P < 2
                            )
                              ((n = null), d());
                            else if (
                              a &&
                              (!0 === a.data?.terminal ||
                                [400, 401, 402, 403, 409, 410].includes(
                                  a.status,
                                ) ||
                                "wallet_translation_failed" === a.data?.error)
                            )
                              throw e(
                                a.data.error || "wallet_result_unavailable",
                                a.status,
                                a.data,
                              );
                            await i(
                              Math.min(
                                5e3,
                                Math.max(500, E() / Math.max(1, 12 - I)),
                              ),
                              M.signal,
                            );
                          }
                        } catch (e) {
                          r(e);
                        }
                      }
                    };
                  (d(), i(Math.min(5e3, E() / 3), M.signal).then(w, () => {}));
                }),
                M.signal,
              );
              return (
                r({
                  stage: u,
                  requestId: c,
                  totalMs: Math.round(a() - v),
                  prepareMs: Math.round(w - v),
                  dispatchAfterMs: Math.round((C ?? a()) - v),
                  sends: P,
                  resultReads: I,
                  recovered: R,
                  admissionRetries: L,
                  admissionWaitMs: $,
                }),
                T
              );
            } catch (e) {
              throw (
                r({
                  stage: u,
                  requestId: c,
                  totalMs: Math.round(a() - v),
                  sends: P,
                  resultReads: I,
                  errorCode: e.code || "wallet_transport_failed",
                  recovered: !1,
                  admissionRetries: L,
                  admissionWaitMs: $,
                }),
                e
              );
            } finally {
              (clearTimeout(q),
                clearInterval(x),
                f?.removeEventListener("abort", T),
                M.abort(e("wallet_request_finished")),
                s.delete(M));
            }
          },
          close: function () {
            for (const t of s) t.abort(e("wallet_session_changed"));
            s.clear();
          },
        };
      },
    };
  "undefined" != typeof module && module.exports
    ? (module.exports = t)
    : (globalThis.LiveSubtitleWalletTransport = t);
})();
