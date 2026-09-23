(() => {
  const e = (e) =>
      "string" == typeof e ? e.normalize("NFC").replace(/\s+/gu, "") : "",
    t = Object.freeze({
      create: function ({
        owner: t,
        send: n,
        isCurrent: r = () => !0,
        log: s = () => {},
        now: i = Date.now,
        maxGroups: o = 64,
        maxBytes: a = 1048576,
        ttlMs: c = 24e4,
        maxAttempts: l = 4,
        autoFlush: d = !0,
      }) {
        const u = new Map(),
          f = new Map();
        let m = 0,
          g = !1,
          p = !0,
          y = null,
          h = null,
          b = null;
        t = Object.freeze({ ...t });
        const M = (e, t) => {
            try {
              s(e, t);
            } catch {}
          },
          w = () => {
            try {
              return !g && r(t);
            } catch {
              return !1;
            }
          };
        function A(e, t, n = !1) {
          const r = u.get(e);
          if (r) {
            for (u.delete(e), m -= r.bytes, f.set(e, i()); f.size > 256; )
              f.delete(f.keys().next().value);
            M(n ? "published" : "rejected", {
              requestId: e,
              reason: t,
              pieces: r.pieces.length,
              confirmed: r.confirmed.size,
              attempts: r.attempts,
            });
          }
        }
        function x() {
          for (const [e, t] of u)
            !t.sending && i() - t.createdAt >= c && A(e, "evidence-expired");
          for (const [e, t] of f) i() - t >= c && f.delete(e);
        }
        function v() {
          if ((y && clearTimeout(y), (y = null), !d || !w() || h || !u.size))
            return;
          const e = Math.min(
            ...Array.from(u.values(), (e) =>
              e.confirmed.size === e.pieces.length
                ? e.nextAttemptAt
                : e.createdAt + c,
            ),
          );
          y = setTimeout(
            () => {
              ((y = null), S().catch(() => {}));
            },
            Math.max(20, e - i()),
          );
        }
        function z(e, t = "display-rejected") {
          const n = u.get(e);
          return !!n && (n.sending && b?.abort(), A(e, t), v(), !0);
        }
        async function E(e, r) {
          const s = new AbortController();
          let o, a;
          ((b = s), (e.sending = !0), e.attempts++);
          const c = new Promise((e, t) => {
              ((a = () =>
                t(
                  Object.assign(new Error("Cache publication cancelled"), {
                    code: "cache-publication-aborted",
                  }),
                )),
                s.signal.addEventListener("abort", a, { once: !0 }),
                (o = setTimeout(
                  () => s.abort(),
                  Math.max(1, Math.min(4e3, r)),
                )));
            }),
            d = Promise.resolve().then(() => {
              if (!w() || s.signal.aborted)
                throw Object.assign(new Error("Cache owner changed"), {
                  status: 403,
                });
              return n({ owner: t, body: e.body, signal: s.signal });
            });
          try {
            const t = await Promise.race([d, c]);
            if (!w()) return void j("owner-changed");
            if (u.get(e.id) !== e) return;
            A(
              e.id,
              !0 === t?.stored ? "stored" : t?.reason || "backend-rejected",
              !0 === t?.stored,
            );
          } catch (t) {
            if (!w()) return void j("owner-changed");
            if (u.get(e.id) !== e) return;
            const n = Number(t.status || t.statusCode || 0);
            e.attempts >= l || (n >= 400 && n < 500 && ![408, 429].includes(n))
              ? A(e.id, `publish-failed:${n || "transport"}`)
              : ((e.nextAttemptAt =
                  i() + Math.min(15e3, 1e3 * 2 ** (e.attempts - 1))),
                M("retry", {
                  requestId: e.id,
                  attempt: e.attempts,
                  status: n,
                  waitMs: e.nextAttemptAt - i(),
                }));
          } finally {
            (clearTimeout(o),
              s.signal.removeEventListener("abort", a),
              b === s && (b = null),
              (e.sending = !1));
          }
        }
        function S({ force: e = !1, maxWaitMs: t = 8e3 } = {}) {
          if (h) return h;
          if (!w()) return (j("owner-changed"), Promise.resolve(!1));
          (y && clearTimeout(y), (y = null), x());
          const n = i() + Math.max(1, Math.min(8e3, t)),
            r = Array.from(u.values()).filter(
              (t) => t.body && (e || t.nextAttemptAt <= i()),
            );
          return (
            (h = (async () => {
              let e = !1;
              for (const t of r) {
                if (!w() || i() >= n) break;
                u.get(t.id) === t && (await E(t, n - i()), (e = !0));
              }
              return e;
            })().finally(() => {
              ((h = null), v());
            })),
            h
          );
        }
        function j(e = "owner-changed") {
          ((g = !0), (p = !1), y && clearTimeout(y), (y = null), b?.abort());
          for (const t of u.keys()) A(t, e);
          f.clear();
        }
        return {
          register: function (t, n) {
            if (!w() || !p) return !1;
            if (
              (x(),
              "string" != typeof t ||
                !t ||
                t.length > 200 ||
                f.has(t) ||
                !Array.isArray(n) ||
                !n.length ||
                n.length > 72)
            )
              return !1;
            const r = [];
            for (const t of n) {
              if (
                "string" != typeof t?.original ||
                !e(t.original) ||
                t.original.length > 2400 ||
                "string" != typeof t.translation ||
                !e(t.translation) ||
                t.translation.length > 4e3 ||
                ![t.startMs, t.endMs].every(Number.isSafeInteger) ||
                t.startMs < 0 ||
                t.endMs - t.startMs < 120
              )
                return !1;
              r.push({
                original: t.original,
                translation: t.translation,
                startMs: t.startMs,
                endMs: t.endMs,
              });
            }
            const s = JSON.stringify(r),
              c = new TextEncoder().encode(s).length;
            if (c > Math.min(a, 12e4)) return !1;
            const l = u.get(t);
            if (l) return l.identity === s;
            for (; u.size >= o || m + c > a; ) {
              const e = Array.from(u.values()).find((e) => !e.sending);
              if (!e) return !1;
              A(e.id, "queue-capacity");
            }
            return (
              u.set(t, {
                id: t,
                identity: s,
                pieces: r,
                confirmed: new Map(),
                bytes: c,
                attempts: 0,
                createdAt: i(),
                nextAttemptAt: i() + 250,
                sending: !1,
                body: null,
              }),
              (m += c),
              v(),
              !0
            );
          },
          confirm: function (t, n, r) {
            if (!w()) return !1;
            const s = u.get(t),
              o = s?.pieces[n];
            return !(
              !o ||
              !Number.isInteger(n) ||
              (!s.confirmed.has(n) &&
                (r?.skipped ||
                r?.fallbackDisplayed ||
                r?.lateAfterOriginalFallback ||
                e(r?.original) !== e(o.original) ||
                e(r?.translation) !== e(o.translation) ||
                !Number.isFinite(r?.syncDisplayErrorSeconds) ||
                Math.abs(r.syncDisplayErrorSeconds) > 1
                  ? (z(t, "display-invalid"), 1)
                  : (s.confirmed.set(n, {
                      ...o,
                      displayVerified: !0,
                      displaySyncErrorSeconds: r.syncDisplayErrorSeconds,
                    }),
                    s.confirmed.size === s.pieces.length &&
                      ((s.body = JSON.stringify({
                        translationRequestId: t,
                        segments: s.pieces.map((e, t) => s.confirmed.get(t)),
                      })),
                      (s.nextAttemptAt = i() + 250)),
                    v(),
                    0)))
            );
          },
          reject: z,
          flush: S,
          finish: async function () {
            p = !1;
            for (const [e, t] of u) t.body || A(e, "stopped-before-display");
            const e = i() + 8e3;
            (h && (await h),
              w() && i() < e && (await S({ force: !0, maxWaitMs: e - i() })),
              j("session-ended"));
          },
          close: j,
          owner: t,
          snapshot: () => ({
            closed: g,
            groups: u.size,
            bytes: m,
            ready: Array.from(u.values()).filter((e) => e.body).length,
            inFlight: Boolean(h),
          }),
        };
      },
    });
  ((globalThis.SubruuWalletCachePublication = t),
    "undefined" != typeof module && module.exports && (module.exports = t));
})();
