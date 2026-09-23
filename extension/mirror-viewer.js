!(function () {
  const e = 30,
    t = 0.35,
    n = 100663296,
    r = "igdashpool",
    a = new URLSearchParams(location.search),
    o = a.get("sessionId") || "",
    i = a.get("uiLocale") || "zh_TW";
  let s = oo(Number(a.get("delay")) || 6, 2, 120),
    l = Math.round(1e3 * s);
  const u = 1600,
    c = "https://subtitle-translate-api-us-5evcqmw4jq-uc.a.run.app",
    d = "liveSubtitleConfig",
    m = "liveSubtitleAuth",
    f = ["dual", "translation", "original", "large", "side"],
    h = {
      dual: "雙語",
      translation: "翻譯",
      original: "原文",
      large: "長文",
      side: "旁側",
    },
    p = {
      system:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft JhengHei", sans-serif',
      "noto-sans":
        '"Noto Sans TC", "Noto Sans CJK TC", "Microsoft JhengHei", sans-serif',
      "source-han":
        '"Source Han Sans TC", "Noto Sans CJK TC", "Microsoft JhengHei", sans-serif',
      rounded:
        'ui-rounded, "SF Pro Rounded", "Arial Rounded MT Bold", "Microsoft JhengHei", sans-serif',
      serif: '"Noto Serif TC", "Source Han Serif TC", "Songti TC", serif',
      mono: 'ui-monospace, "JetBrains Mono", "SFMono-Regular", Consolas, monospace',
    },
    g = {
      en: "eng",
      ja: "jpn",
      ko: "kor",
      es: "spa",
      fr: "fra",
      de: "deu",
      pt: "por",
      ru: "rus",
      id: "ind",
      vi: "vie",
      th: "tha",
      cmn: "zho",
      zh: "zho",
    },
    y = {
      zh: "繁體中文",
      zho: "普通話中文",
      yue: "粵語",
      eng: "英語",
      jpn: "日語",
      kor: "韓語",
      spa: "西班牙語",
      fra: "法語",
      deu: "德語",
      por: "葡萄牙語",
      rus: "俄語",
      ind: "印尼語",
      vie: "越南語",
      tha: "泰語",
      auto: "自動",
    },
    S = {
      shell: document.querySelector(".mirror-shell"),
      panel: document.getElementById("subtitlePanel"),
      toolbar: document.getElementById("subtitleToolbar"),
      video: document.getElementById("mirrorVideo"),
      status: document.getElementById("statusText"),
      quota: document.getElementById("usageToggleButton"),
      usagePanel: document.getElementById("usagePanel"),
      usageFields: document.querySelectorAll?.("[data-usage-field]") || [],
      settingsPanel: document.getElementById("settingsPanel"),
      settingsControls: document.querySelectorAll?.("[data-settings]") || [],
      settingsValues:
        document.querySelectorAll?.("[data-settings-value]") || [],
      settingsToggle: document.getElementById("settingsToggleButton"),
      settingsReset: document.getElementById("settingsResetButton"),
      fontPreview: document.getElementById("fontPreview"),
      fontDown: document.getElementById("fontDownButton"),
      fontUp: document.getElementById("fontUpButton"),
      fontSizeDisplay: document.getElementById("fontSizeDisplay"),
      opacity: document.getElementById("opacityButton"),
      transparent: document.getElementById("transparentButton"),
      fullscreen: document.getElementById("fullscreenButton"),
      mode: document.getElementById("modeButton"),
      chatToggle: document.getElementById("chatToggleButton"),
      replyToggle: document.getElementById("replyToggleButton"),
      collapse: document.getElementById("collapseButton"),
      original: document.getElementById("originalText"),
      translation: document.getElementById("translationText"),
      subtitleLines: document.getElementById("subtitleLines"),
      largeLines: document.getElementById("largeLines"),
      measure: document.getElementById("subtitleMeasure"),
      stop: document.getElementById("stopButton"),
      resize: document.getElementById("resizeHandle"),
      interactionPanel: document.getElementById("interactionPanel"),
      interactionHeader: document.getElementById("interactionHeader"),
      interactionResize: document.getElementById("interactionResizeHandle"),
      chatPanel: document.getElementById("chatPanel"),
      chatClose: document.getElementById("chatCloseButton"),
      chatBottom: document.getElementById("chatBottomButton"),
      chatList: document.getElementById("chatList"),
      chatStatus: document.getElementById("chatStatus"),
      replyPanel: document.getElementById("replyPanel"),
      replyTarget: document.getElementById("replyTarget"),
      replyInput: document.getElementById("replyInput"),
      replyOutput: document.getElementById("replyOutput"),
      replyStatus: document.getElementById("replyStatus"),
      replyTranslate: document.getElementById("replyTranslateButton"),
      replyCopy: document.getElementById("replyCopyButton"),
      replySend: document.getElementById("replySendButton"),
    };
  let b = null,
    v = "",
    w = null,
    M = "",
    T = null,
    C = null,
    k = null,
    L = "",
    E = "",
    D = "",
    U = "",
    x = "",
    $ = "",
    N = "",
    I = null,
    A = null,
    B = !1,
    P = null,
    R = null,
    F = !1,
    O = null,
    H = null,
    _ = !1,
    q = Yt(),
    W = null,
    z = $t(),
    V = 0,
    j = 0,
    K = 0,
    J = null,
    G = [],
    Y = null;
  const X = new Map(),
    Q = new Set();
  let Z = new Set(),
    ee = null,
    te = [],
    ne = [],
    re = !1,
    ae = !1,
    oe = !1,
    ie = !1,
    se = 0,
    le = 0,
    ue = 0,
    ce = 0,
    de = !1,
    me = null,
    fe = 0,
    he = 0,
    pe = 0,
    ge = 0,
    ye = 1e3,
    Se = 0,
    be = 0,
    ve = "";
  const we = new Map();
  let Me = null,
    Te = null;
  const Ce = [];
  let ke = { uiLocale: i },
    Le = or("鏡像延遲準備中", "Preparing mirror delay"),
    Ee = "",
    De = ya(),
    Ue = null,
    xe = null;
  const $e = (function () {
      const e =
        (function () {
          try {
            const e = localStorage.getItem("mirrorViewerUi");
            return e ? JSON.parse(e) : null;
          } catch {
            return null;
          }
        })() || {};
      return {
        fontSize: oo(e.fontSize ?? 28, 18, 84),
        opacity: oo(e.opacity ?? 0.94, 0, 0.98),
        mode: f.includes(e.mode) ? e.mode : "dual",
        fontFamily: Wa(e.fontFamily),
        collapsed: Boolean(e.collapsed),
        usagePanelOpen: !1,
        settingsPanelOpen: !1,
        equalBilingualFontSize: Boolean(e.equalBilingualFontSize),
        originalColor: qa(e.originalColor, "#d8e2f2"),
        translationColor: qa(e.translationColor, "#ffffff"),
        panelLayout:
          e.panelLayout && "object" == typeof e.panelLayout
            ? Ja(e.panelLayout)
            : null,
        interactionLayout:
          e.interactionLayout && "object" == typeof e.interactionLayout
            ? Ka(e.interactionLayout)
            : null,
      };
    })(),
    Ne = {
      open: !1,
      items: [],
      status: "按「聊」後開始翻譯直播聊天室",
      error: "",
      autoScroll: !0,
    },
    Ie = {
      open: !1,
      text: "",
      translation: "",
      status: "輸入文字後翻譯成創作者語言",
      error: "",
      busy: !1,
    };
  let Ae = null,
    Be = null,
    Pe = null,
    Re = null,
    Fe = null,
    Oe = !1,
    He = null,
    _e = !1,
    qe = 0,
    We = 0,
    ze = null,
    Ve = null,
    je = !1,
    Ke = null,
    Je = !1;
  const Ge = new Set(),
    Ye = new Set(),
    Xe = [];
  function Qe() {
    if (
      ((w = null),
      (M = ""),
      (G = []),
      (Y = null),
      (ie = !1),
      (se = 0),
      (le = 0),
      (ue = 0),
      (ce = 0),
      (de = !1),
      me && (window.clearTimeout(me), (me = null)),
      v)
    ) {
      try {
        URL.revokeObjectURL(v);
      } catch {}
      v = "";
    }
    b = null;
  }
  function Ze() {
    return (
      document.fullscreenElement || document.webkitFullscreenElement || null
    );
  }
  function et() {
    return Ze() === S.shell;
  }
  async function tt() {
    if (Ze()) {
      const e = document.exitFullscreen || document.webkitExitFullscreen;
      if ("function" != typeof e)
        throw new Error(
          or("瀏覽器不支援退出全螢幕", "The browser cannot exit fullscreen"),
        );
      return (await e.call(document), nt(), !1);
    }
    const e = S.shell?.requestFullscreen || S.shell?.webkitRequestFullscreen;
    if ("function" != typeof e)
      throw new Error(or("瀏覽器不支援全螢幕", "Fullscreen is not supported"));
    return (await e.call(S.shell), nt(), !0);
  }
  function nt() {
    const e = et();
    if ((S.shell?.classList.toggle("fullscreen-active", e), !S.fullscreen))
      return e;
    const t = e ? or("退出", "Exit") : or("全螢幕", "Fullscreen"),
      n = e
        ? or("退出全螢幕", "Exit fullscreen")
        : or("全螢幕顯示影片與字幕", "Show video and subtitles in fullscreen");
    return (
      (S.fullscreen.textContent = t),
      (S.fullscreen.title = n),
      S.fullscreen.setAttribute("aria-label", n),
      S.fullscreen.setAttribute("aria-pressed", String(e)),
      e
    );
  }
  function rt(e = {}) {
    Je ||
      (Ar(),
      (Je = !0),
      Rt({ force: !0 }),
      Za(),
      e.notifyClosed &&
        o &&
        chrome.runtime
          .sendMessage({ type: "MIRROR_VIEWER_CLOSED", sessionId: o })
          .catch(() => {}));
  }
  function at(t = {}) {
    ((ke = { ...(ke || {}), ...t }),
      ir(),
      Va(t),
      (L = ke.nativeStreamDelayKind || L || ""));
    const n = st() ? e : 120;
    ((s = oo(Number(ke.syncDelaySeconds) || s, 2, n)),
      (l = Math.round(1e3 * s)),
      Qa(),
      Ha(),
      jr());
  }
  function ot() {
    return "twitch-hls" === L || "twitch-hls" === ke?.nativeStreamDelayKind;
  }
  function it() {
    return (
      "instagram-native" === L ||
      "instagram-native" === ke?.nativeStreamDelayKind
    );
  }
  function st() {
    return ot() || it();
  }
  function lt() {
    return ot() ? "Twitch HLS" : it() ? "Instagram 原始串流" : "原始串流";
  }
  function ut(e = {}) {
    const t = String(e.masterUrl || e.streamUrl || "").trim();
    if (!t || !Vt(t, "twitch-hls") || !/\.m3u8(?:$|[?#])/i.test(t))
      throw new Error("原 Twitch 分頁回傳的 HLS playlist 無效。");
    if (
      (jt(t),
      yt(t, "hls", "", e.streamReloadToken || ""),
      (s = oo(Number(e.delaySeconds) || s, 2, 30)),
      (l = Math.round(1e3 * s)),
      Qa(),
      !window.Hls)
    )
      throw new Error("hls.js 未載入，請重新載入插件。");
    if (window.Hls.isSupported?.()) {
      const n = xt("twitch-hls");
      ((T = new window.Hls(Dt(n))),
        (function (e, t = {}) {
          const n = window.Hls;
          n &&
            (e.on(n.Events.MANIFEST_LOADING, () => {
              Xa("Twitch HLS playlist 請求中");
            }),
            e.on(n.Events.MANIFEST_LOADED, () => {
              Xa("Twitch HLS playlist 已取得，解析中");
            }),
            e.on(n.Events.MANIFEST_PARSED, (n, r = {}) => {
              yn();
              const a = In(r.levels || e.levels || []);
              (a >= 0 && ((e.startLevel = a), (e.autoLevelCapping = a)),
                Ot("native.hls.manifest_parsed", {
                  mode: "twitch-hls",
                  levelCount: (r.levels || e.levels || []).length,
                  selectedLevel: a,
                  delaySeconds: s,
                }));
              const o =
                  "original-page-hls" === t.bridgeMode ? " · 原頁橋接" : "",
                i = `Twitch HLS 原始串流 · 固定延遲 ${so(s)}${o}`;
              (Xa(bn(i)), wn(i));
            }),
            e.on(n.Events.LEVEL_LOADED, (e, t = {}) => {
              (yn(), An(t.details));
              const n = Math.round(Number(t.details?.totalduration || 0));
              if (n > 0) {
                const e = `Twitch HLS 原始串流 · window ${so(n)} / 延遲 ${so(s)}`;
                (Xa(bn(e)), wn(e));
              }
              (Rt(), cr());
            }),
            e.on(n.Events.ERROR, (t, r = {}) => {
              const a =
                  r?.response?.code ||
                  r?.response?.status ||
                  r?.networkDetails?.status ||
                  "",
                o = r?.response?.url || r?.url || r?.context?.url || "",
                i = o ? ` ${Sn(o)}` : "",
                s = `${r?.details || r?.type || "unknown"}${a ? ` HTTP ${a}` : ""}${i}`;
              if (!r?.fatal)
                return (
                  Ot(
                    "native.hls.recoverable_error",
                    { mode: "twitch-hls", detail: s, fatal: !1 },
                    "warn",
                  ),
                  void Xa(`Twitch HLS 自動恢復中：${s}`)
                );
              (Ot(
                "native.hls.fatal_error",
                {
                  mode: "twitch-hls",
                  detail: s,
                  type: r.type || "",
                  responseCode: a,
                },
                "error",
              ),
                r.type === n.ErrorTypes.NETWORK_ERROR
                  ? (zt("hls-network-error", { status: a, finalUrl: o }).catch(
                      () => {},
                    ),
                    gn(`Twitch HLS 網路錯誤：${s}`),
                    Xa(`Twitch HLS 網路錯誤，向原分頁更新 playlist：${s}`),
                    e.startLoad())
                  : r.type === n.ErrorTypes.MEDIA_ERROR
                    ? (Xa(`Twitch HLS 媒體錯誤，嘗試恢復：${s}`),
                      e.recoverMediaError())
                    : Xa(`Twitch HLS 播放失敗：${s}`));
            }));
        })(T, e),
        T.on(window.Hls.Events.MEDIA_ATTACHED, () => {
          (Xa("Twitch HLS 載入 playlist 中"),
            gn("等待 Twitch HLS playlist 載入逾時"),
            T.loadSource(t));
        }),
        T.attachMedia(S.video));
    } else {
      if (!S.video.canPlayType("application/vnd.apple.mpegurl"))
        throw new Error(
          "此 Chrome 不支援 HLS.js / MSE，無法啟用 Twitch HLS 延遲。",
        );
      {
        S.video.src = t;
        const e = `Twitch HLS 原始串流 · 固定延遲 ${so(s)}`;
        (Xa(e),
          S.video.addEventListener(
            "loadedmetadata",
            () => {
              wn(e);
            },
            { once: !0 },
          ));
      }
    }
  }
  function ct(e = {}) {
    const t = e.playback && "object" == typeof e.playback ? e.playback : e,
      n = String(t.masterUrl || t.streamUrl || t.url || "").trim();
    return n && Vt(n, "twitch-hls") && /\.m3u8(?:$|[?#])/i.test(n)
      ? {
          ok: !0,
          mode: "twitch-hls",
          masterUrl: n,
          streamUrl: n,
          streamType: "hls",
          streamReloadToken: String(
            t.streamReloadToken || t.reloadToken || "",
          ).slice(0, 120),
          bridgeMode: String(t.bridgeMode || "original-page-hls").slice(0, 80),
          source: String(t.source || t.candidateSource || "").slice(0, 120),
          reason: String(t.reason || e.reason || "").slice(0, 120),
          delaySeconds: oo(Number(t.delaySeconds) || s, 2, 30),
        }
      : null;
  }
  function dt(e = {}) {
    return `hls:${ft(e.masterUrl || e.streamUrl || "")}`;
  }
  function mt() {
    return `hls:${ft(D)}`;
  }
  function ft(e = "") {
    const t = String(e || "").trim();
    if (!t) return "";
    try {
      const e = new URL(t),
        n = e.searchParams.get("sig") || "",
        r = e.searchParams.get("token") || "";
      return n || r
        ? `${e.hostname.toLowerCase()}${e.pathname}|sig=${n}|token=${r}`
        : e.href;
    } catch {
      return t;
    }
  }
  async function ht(e = {}) {
    if (re || !ot()) return;
    const t = ct(e);
    t &&
      dt(t) !== mt() &&
      ((A = t),
      I && window.clearTimeout(I),
      (I = window.setTimeout(() => {
        ((I = null),
          (async function () {
            if (re || B || !A) return;
            const e = A;
            if (((A = null), dt(e) !== mt())) {
              ((B = !0),
                Ot("native.playback.update", {
                  mode: "twitch-hls",
                  source: e.source || "",
                  reason: e.reason || "",
                  bridgeMode: e.bridgeMode || "original-page-hls",
                  from: Sn(D || ""),
                  to: Sn(e.masterUrl || ""),
                }));
              try {
                if (
                  ((s = e.delaySeconds),
                  (l = Math.round(1e3 * s)),
                  Qa(),
                  T?.loadSource)
                )
                  return (
                    jt(e.masterUrl),
                    yt(e.masterUrl, "hls", "", e.streamReloadToken || ""),
                    ae || F || Mn(),
                    Xa("Twitch HLS 更新播放憑證中 · 保留目前緩衝"),
                    gn("Twitch HLS 更新播放憑證逾時"),
                    T.loadSource(e.masterUrl),
                    void T.startLoad?.()
                  );
                (hn(), pn(), ut(e));
              } finally {
                ((B = !1), A && ht({ playback: A }).catch(() => {}));
              }
            }
          })().catch((e) => {
            Ot(
              "native.playback.update_error",
              {
                mode: "twitch-hls",
                error: String(e?.message || e || "").slice(0, 240),
              },
              "warn",
            );
          }));
      }, 700)));
  }
  function pt(t = {}) {
    const n = t.playback && "object" == typeof t.playback ? t.playback : t,
      r = String(n.streamUrl || n.url || n.candidate?.url || "").trim(),
      a = eo(n.streamType || n.type || n.candidate?.type || r),
      o =
        "dash" === a
          ? sn(
              n.streamManifestText ||
                n.manifestText ||
                n.candidate?.manifestText ||
                "",
            )
          : "",
      i = on(
        n.streamManifestBaseUrl ||
          n.manifestBaseUrl ||
          n.candidate?.manifestBaseUrl ||
          r,
      );
    return o || (r && an(r))
      ? o && !i
        ? null
        : ["dash", "hls", "mp4"].includes(a)
          ? {
              ok: !0,
              mode: "instagram-native",
              streamUrl: r || i,
              streamType: a,
              streamInlineManifest: Boolean(o),
              streamManifestText: o,
              streamManifestBaseUrl: i || r,
              streamManifestSignature: String(
                n.streamManifestSignature ||
                  n.manifestSignature ||
                  n.candidate?.manifestSignature ||
                  "",
              ).slice(0, 120),
              streamReloadToken: String(
                n.streamReloadToken ||
                  n.reloadToken ||
                  n.candidate?.reloadToken ||
                  "",
              ).slice(0, 120),
              source: String(n.source || n.candidate?.source || "").slice(
                0,
                120,
              ),
              reason: String(n.reason || t.reason || "").slice(0, 120),
              delaySeconds: oo(Number(n.delaySeconds) || s, 2, e),
            }
          : null
      : null;
  }
  async function gt(e = {}) {
    if (re || !it()) return;
    const t = pt(e);
    t &&
      bt(t) !== St() &&
      ((A = t),
      I && window.clearTimeout(I),
      (I = window.setTimeout(() => {
        ((I = null),
          (async function () {
            if (re || B || !A) return;
            const e = A;
            if (((A = null), bt(e) !== St())) {
              ((B = !0),
                Ot("native.playback.update", {
                  mode: "instagram-native",
                  streamType: e.streamType,
                  source: e.source || "",
                  reason: e.reason || "",
                  from: Sn(D || ""),
                  to: Sn(e.streamUrl || ""),
                }));
              try {
                ((s = e.delaySeconds),
                  (l = Math.round(1e3 * s)),
                  Qa(),
                  hn(),
                  pn(),
                  jt(e.streamManifestBaseUrl || e.streamUrl),
                  yt(
                    e.streamUrl,
                    e.streamType,
                    e.streamManifestSignature || "",
                    e.streamReloadToken || "",
                  ),
                  (q = Yt()),
                  "dash" === e.streamType
                    ? await vt(e)
                    : "hls" === e.streamType
                      ? Et(e)
                      : Ut(e));
              } finally {
                ((B = !1), A && gt({ playback: A }).catch(() => {}));
              }
            }
          })().catch((e) => {
            Ot(
              "native.playback.update_error",
              {
                mode: "instagram-native",
                streamType: A?.streamType || "",
                error: String(e?.message || e || "").slice(0, 240),
              },
              "warn",
            );
          }));
      }, 700)));
  }
  function yt(e = "", t = "", n = "", r = "") {
    ((D = String(e || "")),
      (U = eo(t || e)),
      (x = String(n || "")),
      ($ = String(r || "")));
  }
  function St() {
    return `${U}:${D}:${x}:${$}`;
  }
  function bt(e = {}) {
    return `${eo(e.streamType || e.streamUrl)}:${String(e.streamUrl || "")}:${String(e.streamManifestSignature || "")}:${String(e.streamReloadToken || "")}`;
  }
  async function vt(e = {}) {
    if (!window.shaka?.Player)
      throw new Error("Shaka Player 未載入，請重新載入插件。");
    try {
      window.shaka.polyfill?.installAll?.();
    } catch {}
    C = new window.shaka.Player();
    try {
      C.configure({
        manifest: {
          defaultPresentationDelay: s,
          retryParameters: {
            maxAttempts: 4,
            baseDelay: 600,
            backoffFactor: 1.8,
            fuzzFactor: 0.2,
          },
        },
        streaming: {
          bufferingGoal: wt(s),
          rebufferingGoal: En(s),
          bufferBehind: Math.max(45, s + 20),
          startAtSegmentBoundary: !0,
          lowLatencyMode: !1,
          liveSync: {
            enabled: !0,
            targetLatency: s,
            targetLatencyTolerance: 1,
            minPlaybackRate: 0.97,
            maxPlaybackRate: 1,
          },
          retryParameters: {
            maxAttempts: 4,
            baseDelay: 600,
            backoffFactor: 1.8,
            fuzzFactor: 0.2,
          },
        },
        abr: { enabled: !0 },
      });
    } catch {}
    const t = (function (e) {
      if (!e?.getNetworkingEngine || !window.shaka?.net?.NetworkingEngine)
        return !1;
      if (!_)
        try {
          (window.shaka.net.NetworkingEngine.registerScheme(r, ln, 3, !1),
            (_ = !0));
        } catch {
          _ = !0;
        }
      const t = e.getNetworkingEngine();
      if (!t?.registerRequestFilter) return !1;
      try {
        return (
          t.registerRequestFilter((e, t = {}) => {
            Array.isArray(t.uris) &&
              ((t.uris = t.uris.map((e) =>
                (function (e = "") {
                  const t = Kt(e, "instagram-native");
                  return an(t)
                    ? t.startsWith(`${r}:`)
                      ? t
                      : `${r}:${encodeURIComponent(t)}`
                    : t;
                })(e),
              )),
              (t.allowCrossSiteCredentials = !0));
          }),
          (W = {
            startedAtMs: Date.now(),
            requests: 0,
            hits: 0,
            bytes: 0,
            items: 0,
            poolBytes: 0,
          }),
          !0
        );
      } catch {
        return !1;
      }
    })(C);
    !(function (e, t = {}) {
      e?.addEventListener &&
        (e.addEventListener("loaded", () => {
          const e = t.source ? ` · ${t.source}` : "",
            n = `Instagram DASH 原始串流 · 固定延遲 ${so(s)}${e}`;
          (Xa(vn(n)), wn(n));
        }),
        e.addEventListener("buffering", (e = {}) => {
          R
            ? Ln()
            : (Ot(
                "native.dash.buffering",
                {
                  buffering: Boolean(e.buffering),
                  delaySeconds: s,
                  pool: W
                    ? {
                        requests: W.requests,
                        hits: W.hits,
                        items: W.items,
                        poolBytes: W.poolBytes,
                      }
                    : null,
                },
                e.buffering ? "warn" : "info",
              ),
              Xa(
                e.buffering
                  ? "Instagram DASH 緩衝中"
                  : `Instagram DASH 原始串流播放中 · 固定延遲 ${so(s)}`,
              ));
        }),
        e.addEventListener("error", (e = {}) => {
          const t = fn(e?.detail || e).slice(0, 240);
          (Ot("native.dash.error", { message: t, delaySeconds: s }, "error"),
            Wt("dash-player-error", { finalUrl: D, error: t }).catch(() => {}),
            Xa(`Instagram DASH 播放錯誤：${t.slice(0, 180)}`));
        }));
    })(C, e);
    const n = e.streamManifestText
        ? (function (e = "", t = "") {
            Lt();
            const n = (function (e = "", t = "") {
                const n = sn(e);
                if (!n) return "";
                const r = on(t);
                return r
                  ? (function (e = "", t = "") {
                      return String(e || "")
                        .replace(
                          /(<BaseURL\b[^>]*>)([\s\S]*?)(<\/BaseURL>)/gi,
                          (e, n, r, a) => {
                            const o = Mt(Ct(r), t);
                            return o ? `${n}${kt(o)}${a}` : e;
                          },
                        )
                        .replace(
                          /\b(media|initialization|sourceURL|index)=("([^"]*)"|'([^']*)')/gi,
                          (e, n, r, a, o) => {
                            const i = Mt(Ct(void 0 !== a ? a : o), t);
                            if (!i) return e;
                            const s = r.startsWith("'") ? "'" : '"';
                            return `${n}=${s}${(function (e = "") {
                              return kt(e)
                                .replace(/"/g, "&quot;")
                                .replace(/'/g, "&apos;");
                            })(i)}${s}`;
                          },
                        );
                    })(n, r)
                  : n;
              })(e, t),
              r = new Blob([n], { type: "application/dash+xml" });
            return ((N = URL.createObjectURL(r)), N);
          })(e.streamManifestText, e.streamManifestBaseUrl || e.streamUrl)
        : e.streamUrl,
      a = e.streamManifestText ? " · inline MPD" : "";
    Xa(
      `Instagram DASH 原始串流載入中 · 固定延遲 ${so(s)}${a}${t ? " · DASH pool 60s" : ""}`,
    );
    try {
      (await C.attach(S.video), await C.load(n));
      const t = e.source ? ` · ${e.source}` : "",
        r = `Instagram DASH 原始串流 · 固定延遲 ${so(s)}${t}`;
      (Xa(vn(r)), wn(r));
    } catch (e) {
      throw new Error(`Instagram DASH 播放來源載入失敗：${fn(e)}`);
    }
  }
  function wt(t = s) {
    const n = oo(Number(t) || s || 2, 2, e);
    return oo(n + 8, 12, 42);
  }
  function Mt(e = "", t = "") {
    const n = String(e || "").trim();
    if (!n || n.startsWith("data:") || n.startsWith("blob:")) return "";
    try {
      const e = new URL(n, t);
      return (Tt(e, n, t), an(e.href) ? e.href : "");
    } catch {
      return "";
    }
  }
  function Tt(e, t = "", n = "") {
    if (
      e &&
      !e.search &&
      (function (e = "") {
        const t = String(e || "").trim();
        return (
          Boolean(t) && !/^[a-z][a-z0-9+.-]*:/i.test(t) && !t.startsWith("//")
        );
      })(t)
    )
      try {
        const t = new URL(n, location.href);
        t.search && (e.search = t.search);
      } catch {}
  }
  function Ct(e = "") {
    return String(e || "")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&apos;/gi, "'")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">");
  }
  function kt(e = "") {
    return String(e || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function Lt() {
    if (N) {
      try {
        URL.revokeObjectURL(N);
      } catch {}
      N = "";
    }
  }
  function Et(e = {}) {
    if (!window.Hls) throw new Error("hls.js 未載入，請重新載入插件。");
    if (window.Hls.isSupported?.()) {
      const t = xt("instagram-native");
      ((T = new window.Hls(Dt(t))),
        (function (e, t = {}) {
          const n = window.Hls;
          n &&
            (e.on(n.Events.MANIFEST_LOADING, () => {
              Xa("Instagram HLS playlist 請求中");
            }),
            e.on(n.Events.MANIFEST_LOADED, () => {
              Xa("Instagram HLS playlist 已取得，解析中");
            }),
            e.on(n.Events.MANIFEST_PARSED, (n, r = {}) => {
              yn();
              const a = In(r.levels || e.levels || []);
              (a >= 0 && ((e.startLevel = a), (e.autoLevelCapping = a)),
                Ot("native.hls.manifest_parsed", {
                  mode: t.mode || "instagram-native",
                  levelCount: (r.levels || e.levels || []).length,
                  selectedLevel: a,
                  delaySeconds: s,
                }));
              const o = t.source ? ` · ${t.source}` : "",
                i = `Instagram HLS 原始串流 · 固定延遲 ${so(s)}${o}`;
              (Xa(vn(i)), wn(i));
            }),
            e.on(n.Events.LEVEL_LOADED, (e, t = {}) => {
              (yn(), An(t.details));
              const n = Math.round(Number(t.details?.totalduration || 0));
              if (n > 0) {
                const e = `Instagram HLS 原始串流 · window ${so(n)} / 延遲 ${so(s)}`;
                (Xa(vn(e)), wn(e));
              }
              (Rt(), cr());
            }),
            e.on(n.Events.ERROR, (t, r = {}) => {
              const a =
                  r?.response?.code ||
                  r?.response?.status ||
                  r?.networkDetails?.status ||
                  "",
                o = r?.response?.url || r?.url || r?.context?.url || "",
                i = o ? ` ${Sn(o)}` : "",
                s = `${r?.details || r?.type || "unknown"}${a ? ` HTTP ${a}` : ""}${i}`;
              if (!r?.fatal)
                return (
                  Ot(
                    "native.hls.recoverable_error",
                    { mode: "instagram-native", detail: s, fatal: !1 },
                    "warn",
                  ),
                  void Xa(`Instagram HLS 自動恢復中：${s}`)
                );
              (Ot(
                "native.hls.fatal_error",
                {
                  mode: "instagram-native",
                  detail: s,
                  type: r.type || "",
                  responseCode: a,
                },
                "error",
              ),
                r.type === n.ErrorTypes.NETWORK_ERROR
                  ? (Wt("hls-network-error", { status: a, finalUrl: o }).catch(
                      () => {},
                    ),
                    gn(`Instagram HLS 網路錯誤：${s}`),
                    Xa(`Instagram HLS 網路錯誤，重新載入串流：${s}`),
                    e.startLoad())
                  : r.type === n.ErrorTypes.MEDIA_ERROR
                    ? (Xa(`Instagram HLS 媒體錯誤，嘗試恢復：${s}`),
                      e.recoverMediaError())
                    : Xa(`Instagram HLS 播放失敗：${s}`));
            }));
        })(T, e),
        T.on(window.Hls.Events.MEDIA_ATTACHED, () => {
          (Xa("Instagram HLS playlist 請求中"),
            gn("等待 Instagram HLS playlist 載入逾時"),
            T.loadSource(e.streamUrl));
        }),
        T.attachMedia(S.video));
    } else {
      if (!S.video.canPlayType("application/vnd.apple.mpegurl"))
        throw new Error(
          "此 Chrome 不支援 HLS.js / MSE，無法啟用 Instagram HLS 延遲。",
        );
      {
        S.video.src = e.streamUrl;
        const t = `Instagram HLS 原始串流 · 固定延遲 ${so(s)}`;
        (Xa(t),
          S.video.addEventListener(
            "loadedmetadata",
            () => {
              wn(t);
            },
            { once: !0 },
          ));
      }
    }
  }
  function Dt(e) {
    return {
      loader: e,
      pLoader: e,
      fLoader: e,
      enableWorker: !0,
      workerPath: chrome.runtime.getURL("vendor/hls.worker.js"),
      liveSyncDuration: s,
      liveMaxLatencyDuration: Math.max(s + 60 + 8, 1.35 * s),
      maxLiveSyncPlaybackRate: 1,
      liveSyncOnStallIncrease: 0,
      liveSyncMode: "buffered",
      startOnSegmentBoundary: !0,
      lowLatencyMode: !1,
      fragLoadingTimeOut: 2e4,
      fragLoadingMaxRetry: 4,
      fragLoadingRetryDelay: 500,
      fragLoadingMaxRetryTimeout: 4e3,
      maxBufferHole: 0.5,
      nudgeMaxRetry: 5,
      backBufferLength: Math.max(90, s + 60),
      maxBufferLength: Math.max(90, s + 60),
      maxMaxBufferLength: Math.max(120, s + 60 + 30),
    };
  }
  function Ut(e = {}) {
    S.video.src = e.streamUrl;
    const t = `Instagram 原始影片串流 · 固定延遲 ${so(s)}`;
    (Xa(t),
      S.video.addEventListener(
        "loadedmetadata",
        () => {
          wn(t);
        },
        { once: !0 },
      ));
  }
  function xt(e = "twitch-hls") {
    const t = cn(e),
      n = dn(t);
    return class {
      constructor(e) {
        ((this.config = e || {}),
          (this.context = null),
          (this.callbacks = null),
          (this.stats = null),
          (this.aborted = !1));
      }
      load(e, r, a) {
        ((this.context = e),
          (this.callbacks = a),
          (this.config = r || this.config || {}),
          (this.aborted = !1));
        const o = self.performance?.now?.() || Date.now();
        this.stats = (function (e) {
          return {
            aborted: !1,
            loaded: 0,
            retry: 0,
            total: 0,
            chunkCount: 0,
            bwEstimate: 0,
            loading: { start: e, first: 0, end: 0 },
            parsing: { start: 0, end: 0 },
            buffering: { start: 0, first: 0, end: 0 },
          };
        })(o);
        const i = (function (e = {}) {
            const t = String(e.type || "").toLowerCase();
            return (
              !("manifest" !== t && "level" !== t && !t.includes("track")) ||
              /\.m3u8(?:$|[?#])/i.test(String(e.url || ""))
            );
          })(e)
            ? "text"
            : "arraybuffer",
          s = oo(Number(this.config.timeout) || 2e4, 4e3, 45e3),
          l = Kt(e.url, t);
        (function (e, t) {
          let n = null;
          return new Promise((r, a) => {
            ((n = window.setTimeout(() => {
              a(
                new Error(
                  `Native stream resource fetch timed out after ${Math.round(t / 1e3)}s`,
                ),
              );
            }, t)),
              Promise.resolve(e)
                .then(r)
                .catch(a)
                .finally(() => {
                  n && window.clearTimeout(n);
                }));
          });
        })(
          Ht({
            nativeStreamKind: t,
            url: l,
            responseType: i,
            requestHeaders: e.headers || {},
            timeoutMs: s,
          }),
          s,
        )
          .then((r) => {
            if (this.aborted) return;
            if (!r?.ok)
              throw new Error(r?.error || `${n} resource fetch failed`);
            const s =
                "text" === i
                  ? String(r.text || "")
                  : r.data instanceof ArrayBuffer
                    ? r.data
                    : no(r.base64 || ""),
              u = r.byteLength || ("text" === i ? s.length : s.byteLength || 0),
              c = self.performance?.now?.() || Date.now();
            (Pt({
              nativeStreamKind: t,
              responseType: i,
              url: l,
              finalUrl: r.finalUrl || e.url,
              status: r.status || 200,
              elapsedMs: r.elapsedMs || Math.max(1, Math.round(c - o)),
              byteLength: u,
              fromDashBufferPool: Boolean(r.fromDashBufferPool),
              relay: r.relay || "",
              ok: !0,
            }),
              (this.stats.loaded = u),
              (this.stats.total = u),
              (this.stats.chunkCount = 1),
              (this.stats.loading.first = this.stats.loading.first || c),
              (this.stats.loading.end = c),
              a.onSuccess(
                { url: r.finalUrl || e.url, data: s, code: r.status || 200 },
                this.stats,
                e,
                { status: r.status || 200, url: r.finalUrl || e.url },
              ));
          })
          .catch((r) => {
            if (this.aborted) return;
            const s = self.performance?.now?.() || Date.now();
            (Pt({
              nativeStreamKind: t,
              responseType: i,
              url: l,
              elapsedMs: Math.max(1, Math.round(s - o)),
              byteLength: 0,
              ok: !1,
              error: r?.message || `${n} resource fetch failed`,
            }),
              (this.stats.loading.first = this.stats.loading.first || s),
              (this.stats.loading.end = s),
              a.onError(
                { code: 0, text: r?.message || `${n} resource fetch failed` },
                e,
                null,
                this.stats,
              ));
          });
      }
      abort() {
        ((this.aborted = !0), this.stats && (this.stats.aborted = !0));
      }
      destroy() {
        (this.abort(), (this.callbacks = null), (this.context = null));
      }
    };
  }
  function $t(e = "") {
    return {
      mode: e,
      startedAtMs: Date.now(),
      lastSummaryAtMs: 0,
      requests: 0,
      failures: 0,
      slowRequests: 0,
      bytes: 0,
      poolHits: 0,
      directRequests: 0,
      relayRequests: 0,
      maxElapsedMs: 0,
      lastError: "",
    };
  }
  function Nt(e = "") {
    ((z = $t(e)),
      (q = Yt()),
      (V = 0),
      (j = 0),
      Ot("native.playback.start", {
        mode: e,
        delaySeconds: s,
        sourceUrl: a.get("source") || "",
      }));
  }
  function It(e = {}, t = "") {
    const n = Date.now(),
      r = e?.diagnostics || null,
      a = String(r?.endedReason || "");
    (V &&
      "source-tab-not-injectable" !== a &&
      "missing-source-tab-id" !== a &&
      n - V < 5e3) ||
      ((V = n),
      Ot(
        "native.playback.wait_candidate",
        {
          mode: "instagram-native",
          error: String(t || e?.error || "").slice(0, 240),
          retryMs: 1500,
          retryLogIntervalMs: 5e3,
          delaySeconds: s,
          diagnostics: At(r),
        },
        "source-tab-not-injectable" === a || "missing-source-tab-id" === a
          ? "error"
          : "warn",
      ));
  }
  function At(e = null) {
    if (!e || "object" != typeof e) return null;
    const t =
      e.lastPageInfo && "object" == typeof e.lastPageInfo
        ? e.lastPageInfo
        : null;
    return {
      waitMs: Math.round(Number(e.waitMs) || 0),
      pollMs: Math.round(Number(e.pollMs) || 0),
      attempts: Math.round(Number(e.attempts) || 0),
      elapsedMs: Math.round(Number(e.elapsedMs) || 0),
      endedReason: String(e.endedReason || "").slice(0, 80),
      sourceTabId: e.sourceTabId ?? null,
      sourceTabExists:
        null === e.sourceTabExists ? null : Boolean(e.sourceTabExists),
      sourceTabUrl: Sn(e.sourceTabUrl || ""),
      storedCandidate: Boolean(e.storedCandidate),
      storedCandidateRefreshWanted: Boolean(e.storedCandidateRefreshWanted),
      candidateAgeMs: Number.isFinite(Number(e.candidateAgeMs))
        ? Math.round(Number(e.candidateAgeMs))
        : null,
      lastCandidateCount: Math.round(Number(e.lastCandidateCount) || 0),
      lastCandidateTypes: Array.isArray(e.lastCandidateTypes)
        ? e.lastCandidateTypes.slice(0, 8)
        : [],
      lastCandidateSources: Array.isArray(e.lastCandidateSources)
        ? e.lastCandidateSources.slice(0, 8)
        : [],
      lastError: String(e.lastError || "").slice(0, 180),
      lastPageInfo: t
        ? {
            platform: t.platform || "",
            hasVideo: !0 === t.hasVideo,
            isLiveStream: !0 === t.isLiveStream,
            liveBufferSeconds: Number.isFinite(Number(t.liveBufferSeconds))
              ? Number(t.liveBufferSeconds)
              : null,
            timingFound: !1 !== t.timingFound,
            timingLive: !0 === t.timingLive,
            nativeCandidateDiagnostics: Bt(t.nativeCandidateDiagnostics),
            href: Sn(t.href || ""),
          }
        : null,
    };
  }
  function Bt(e = null) {
    return e && "object" == typeof e
      ? {
          mediaNodeCount: Math.round(Number(e.mediaNodeCount) || 0),
          mediaNodeScanCount: Math.round(Number(e.mediaNodeScanCount) || 0),
          mediaAttributeScanCount: Math.round(
            Number(e.mediaAttributeScanCount) || 0,
          ),
          performanceResourceCount: Math.round(
            Number(e.performanceResourceCount) || 0,
          ),
          scriptNodeCount: Math.round(Number(e.scriptNodeCount) || 0),
          scriptNodeScanCount: Math.round(Number(e.scriptNodeScanCount) || 0),
          matchedScriptNodeCount: Math.round(
            Number(e.matchedScriptNodeCount) || 0,
          ),
          largeScriptNodeCount: Math.round(Number(e.largeScriptNodeCount) || 0),
          scriptSnippetCount: Math.round(Number(e.scriptSnippetCount) || 0),
          keywordWindowCount: Math.round(Number(e.keywordWindowCount) || 0),
          candidateCount: Math.round(Number(e.candidateCount) || 0),
          returnedCandidateCount: Math.round(
            Number(e.returnedCandidateCount) || 0,
          ),
          inlineManifestCount: Math.round(Number(e.inlineManifestCount) || 0),
        }
      : null;
  }
  function Pt(e = {}) {
    const t = z || $t(e.nativeStreamKind || "");
    ((z = t),
      (t.requests += 1),
      (t.bytes += Math.max(0, Number(e.byteLength) || 0)),
      (t.maxElapsedMs = Math.max(
        t.maxElapsedMs || 0,
        Math.round(Number(e.elapsedMs) || 0),
      )),
      e.fromDashBufferPool && (t.poolHits += 1),
      "direct-fetch" === e.relay || "viewer-memory-pool" === e.relay
        ? (t.directRequests += 1)
        : e.relay && (t.relayRequests += 1));
    const n = Math.round(Number(e.elapsedMs) || 0),
      r = e.ok ? "warn" : "error";
    if (!e.ok)
      return (
        (t.failures += 1),
        (t.lastError = String(e.error || "").slice(0, 240)),
        void Ot("native.resource.fetch_error", Ft(e), r)
      );
    (n >= 2500 &&
      ((t.slowRequests += 1), Ot("native.resource.slow_fetch", Ft(e), "warn")),
      Rt());
  }
  function Rt(e = {}) {
    const t = z;
    if (!t?.requests) return;
    const n = Date.now();
    (!e.force && n - (t.lastSummaryAtMs || 0) < 1e4) ||
      ((t.lastSummaryAtMs = n),
      Ot(
        "native.resource.summary",
        {
          mode: t.mode || L || "",
          requests: t.requests,
          failures: t.failures,
          slowRequests: t.slowRequests,
          bytes: t.bytes,
          poolHits: t.poolHits,
          directRequests: t.directRequests,
          relayRequests: t.relayRequests,
          maxElapsedMs: t.maxElapsedMs,
          elapsedMs: n - (t.startedAtMs || n),
          lastError: t.lastError || "",
        },
        t.failures ? "warn" : "info",
      ));
  }
  function Ft(e = {}) {
    return {
      mode: e.nativeStreamKind || L || "",
      responseType: e.responseType || "",
      status: e.status || 0,
      elapsedMs: Math.round(Number(e.elapsedMs) || 0),
      byteLength: Math.round(Number(e.byteLength) || 0),
      fromDashBufferPool: Boolean(e.fromDashBufferPool),
      relay: e.relay || "",
      url: Sn(e.finalUrl || e.url || ""),
      error: String(e.error || "").slice(0, 240),
    };
  }
  function Ot(e, t = {}, n = "info") {
    o &&
      chrome?.runtime?.sendMessage &&
      chrome.runtime
        .sendMessage({
          type: "LIVE_SUBTITLE_CLIENT_EVENT_LOG",
          sessionId: o,
          event: {
            type: e,
            level: n,
            source: "mirror-viewer",
            clientTimeMs: Date.now(),
            data: t,
          },
        })
        .catch(() => {});
  }
  async function Ht(e = {}) {
    const t = cn(e.nativeStreamKind),
      n = { ...e, nativeStreamKind: t, url: Kt(e.url, t) };
    try {
      return await _t(n);
    } catch (e) {
      return (
        (function (e = {}, t = null) {
          const n = Date.now();
          n - j < 1e4 ||
            ((j = n),
            Ot(
              "native.resource.direct_fetch_fallback",
              {
                mode: cn(e.nativeStreamKind),
                responseType: e.responseType || "",
                url: Sn(e.url || ""),
                error: String(t?.message || t || "").slice(0, 240),
              },
              "warn",
            ));
        })(n, e),
        qt(n)
      );
    }
  }
  async function _t(e = {}) {
    const t = cn(e.nativeStreamKind),
      n = String(e.url || "");
    if (!Vt(n, t)) throw new Error(`${dn(t)} direct fetch URL is not allowed`);
    const r = "text" === e.responseType ? "text" : "arraybuffer",
      a = performance?.now?.() || Date.now(),
      o = oo(Number(e.timeoutMs) || 25e3, 4e3, 45e3),
      i = "undefined" != typeof AbortController ? new AbortController() : null,
      s = i ? window.setTimeout(() => i.abort(), o) : null;
    try {
      const o = await fetch(n, {
          method: "GET",
          credentials: "instagram-native" === t ? "include" : "omit",
          redirect: "follow",
          cache: "no-store",
          headers: Jt(e.requestHeaders),
          signal: i?.signal,
        }),
        s = o.headers.get("content-type") || "",
        l = o.url || n;
      if (!o.ok)
        throw new Error(`${dn(t)} direct fetch failed: HTTP ${o.status}`);
      if ("text" === r) {
        const e = await o.text();
        return {
          ok: !0,
          responseType: r,
          status: o.status,
          finalUrl: l,
          contentType: s,
          elapsedMs: Math.max(
            1,
            Math.round((performance?.now?.() || Date.now()) - a),
          ),
          byteLength: e.length,
          text: e,
          relay: "direct-fetch",
        };
      }
      const u = await o.arrayBuffer();
      return {
        ok: !0,
        responseType: r,
        status: o.status,
        finalUrl: l,
        contentType: s,
        elapsedMs: Math.max(
          1,
          Math.round((performance?.now?.() || Date.now()) - a),
        ),
        byteLength: u.byteLength,
        data: u,
        relay: "direct-fetch",
      };
    } catch (e) {
      if ("AbortError" === e?.name)
        throw new Error(`${dn(t)} direct fetch timed out`);
      throw e;
    } finally {
      s && window.clearTimeout(s);
    }
  }
  function qt(e = {}) {
    const t = cn(e.nativeStreamKind),
      n = "text" === e.responseType ? "text" : "arraybuffer";
    return chrome.runtime
      .sendMessage({
        type:
          "twitch-hls" === t
            ? "FETCH_TWITCH_HLS_RESOURCE"
            : "FETCH_NATIVE_STREAM_RESOURCE",
        sessionId: o,
        nativeStreamKind: t,
        url: e.url,
        responseType: n,
        dashBufferPool: Boolean(e.dashBufferPool),
        baseUrl: E || "",
        requestHeaders: e.requestHeaders || {},
      })
      .then((e) => ({
        ...(e || {}),
        relay: e?.relay || "service-worker-relay",
      }));
  }
  async function Wt(e = "viewer-playback-error", t = {}) {
    if (!it() || !o || !chrome?.runtime?.sendMessage) return !1;
    const n = Date.now();
    if (n - K < 4e3)
      return (
        Ot(
          "native.playback.refresh_throttled",
          {
            mode: "instagram-native",
            reason: String(e || "").slice(0, 120),
            streamType: U || "",
            url: Sn(t.finalUrl || D || ""),
          },
          "warn",
        ),
        !1
      );
    K = n;
    const r = await chrome.runtime
      .sendMessage({
        type: "REFRESH_NATIVE_STREAM_CANDIDATES",
        sessionId: o,
        reason: e,
        status: t.status || 0,
        finalUrl: t.finalUrl || t.url || D || "",
        streamType: U || "",
      })
      .catch((e) => ({ ok: !1, error: e?.message || String(e || "") }));
    return (
      Ot(
        "native.playback.refresh_requested",
        {
          mode: "instagram-native",
          reason: String(e || "").slice(0, 120),
          requested: Boolean(r?.requested),
          throttled: Boolean(r?.throttled),
          status: Math.round(Number(t.status) || 0),
          streamType: U || "",
          url: Sn(t.finalUrl || D || ""),
          error: !1 === r?.ok ? String(r.error || "").slice(0, 180) : "",
        },
        !1 === r?.ok ? "error" : "warn",
      ),
      Boolean(r?.requested)
    );
  }
  async function zt(e = "viewer-playback-error", t = {}) {
    if (!ot() || !o || !chrome?.runtime?.sendMessage) return !1;
    const n = Date.now();
    if (n - K < 4e3)
      return (
        Ot(
          "native.playback.refresh_throttled",
          {
            mode: "twitch-hls",
            reason: String(e || "").slice(0, 120),
            url: Sn(t.finalUrl || D || ""),
          },
          "warn",
        ),
        !1
      );
    K = n;
    const r = await chrome.runtime
      .sendMessage({
        type: "REFRESH_NATIVE_STREAM_CANDIDATES",
        sessionId: o,
        reason: e,
        status: t.status || 0,
        finalUrl: t.finalUrl || t.url || D || "",
        streamType: "hls",
      })
      .catch((e) => ({ ok: !1, error: e?.message || String(e || "") }));
    return (
      Ot(
        "native.playback.refresh_requested",
        {
          mode: "twitch-hls",
          reason: String(e || "").slice(0, 120),
          requested: Boolean(r?.requested),
          throttled: Boolean(r?.throttled),
          status: Math.round(Number(t.status) || 0),
          url: Sn(t.finalUrl || D || ""),
          error: !1 === r?.ok ? String(r.error || "").slice(0, 180) : "",
        },
        !1 === r?.ok ? "error" : "warn",
      ),
      Boolean(r?.requested)
    );
  }
  function Vt(e = "", t = "") {
    try {
      const n = new URL(e);
      if ("https:" !== n.protocol) return !1;
      const r = n.hostname.toLowerCase();
      return "instagram-native" === t
        ? an(e)
        : "twitch-hls" === t &&
            ("usher.ttvnw.net" === r ||
              r.endsWith(".ttvnw.net") ||
              r.endsWith(".hls.live-video.net") ||
              r.endsWith(".twitch.tv"));
    } catch {
      return !1;
    }
  }
  function jt(e = "") {
    E = String(e || "");
  }
  function Kt(e = "", t = "") {
    const n = String(e || "").trim();
    if (!n) return "";
    if (/^[a-z][a-z0-9+.-]*:/i.test(n)) return n;
    const r = E || a.get("source") || location.href;
    try {
      const e = new URL(n, r);
      "instagram-native" === cn(t) && Tt(e, n, r);
      const a = e.href,
        o = cn(t);
      return ("instagram-native" === o && an(a)) ||
        ("twitch-hls" === o && Vt(a, "twitch-hls"))
        ? a
        : n;
    } catch {
      return n;
    }
  }
  function Jt(e = {}) {
    const t = {},
      n = Gt(e.Range || e.range);
    n && /^bytes=\d*-\d*$/i.test(n) && (t.Range = n);
    const r = Gt(e.Accept || e.accept);
    return (r && r.length <= 160 && (t.Accept = r), t);
  }
  function Gt(e = "") {
    return String(e || "")
      .replace(/[\r\n]/g, "")
      .trim();
  }
  function Yt() {
    return {
      entries: new Map(),
      byteLength: 0,
      hits: 0,
      misses: 0,
      createdAt: Date.now(),
      lastPrunedAt: 0,
    };
  }
  function Xt(e = "", t = {}) {
    const n = Gt(t.Range || t.range);
    return `${String(e || "")}${n ? `#range=${n}` : ""}`;
  }
  function Qt(e = "") {
    tn();
    const t = q.entries.get(e);
    return t
      ? Date.now() - (t.createdAt || 0) > 6e4
        ? (en(e), (q.misses += 1), null)
        : ((t.hitCount = (t.hitCount || 0) + 1),
          (t.lastHitAt = Date.now()),
          (q.hits += 1),
          t)
      : ((q.misses += 1), null);
  }
  function Zt(e = "", t = {}) {
    (en(e),
      q.entries.set(e, t),
      (q.byteLength += t.byteLength || t.data?.byteLength || 0),
      tn(!0));
  }
  function en(e = "") {
    const t = q.entries.get(e);
    t &&
      (q.entries.delete(e),
      (q.byteLength = Math.max(
        0,
        q.byteLength - (t.byteLength || t.data?.byteLength || 0),
      )));
  }
  function tn(e = !1) {
    const t = Date.now();
    if (e || !(t - (q.lastPrunedAt || 0) < 2500)) {
      q.lastPrunedAt = t;
      for (const [e, n] of q.entries.entries())
        t - (n.createdAt || 0) > 6e4 && en(e);
      for (; q.byteLength > n || q.entries.size > 320; ) {
        const e = [...q.entries.entries()].sort(
          (e, t) =>
            (e[1].lastHitAt || e[1].createdAt || 0) -
            (t[1].lastHitAt || t[1].createdAt || 0),
        )[0]?.[0];
        if (!e) break;
        en(e);
      }
    }
  }
  function nn(e = "", t = "", r = 0) {
    if (!r || r > n) return !1;
    const a = String(e || "").toLowerCase(),
      o = String(t || "").toLowerCase();
    return (
      !/\.mpd(?:$|[?#])/.test(a) &&
      !a.includes("dash_manifest") &&
      !(o.includes("dash+xml") || o.includes("xml") || o.includes("json"))
    );
  }
  function rn() {
    return (
      tn(),
      {
        ttlSeconds: 60,
        maxBytes: n,
        byteLength: q.byteLength,
        items: q.entries.size,
        hits: q.hits,
        misses: q.misses,
      }
    );
  }
  function an(e = "") {
    try {
      const t = new URL(e);
      if ("https:" !== t.protocol) return !1;
      const n = t.hostname.toLowerCase();
      return (
        "instagram.com" === n ||
        n.endsWith(".instagram.com") ||
        n.endsWith(".cdninstagram.com") ||
        n.endsWith(".fbcdn.net") ||
        n.endsWith(".fbsbx.com") ||
        n.endsWith(".facebook.com")
      );
    } catch {
      return !1;
    }
  }
  function on(e = "") {
    const t = String(e || "").trim();
    if (!t) return "";
    try {
      const e = new URL(t, location.href);
      return an(e.href) ? e.href : "";
    } catch {
      return "";
    }
  }
  function sn(e = "") {
    const t = String(e || "")
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .trim();
    return !t || t.length > 24e4
      ? ""
      : /<MPD[\s>]/i.test(t) && /<\/MPD>/i.test(t)
        ? t
        : "";
  }
  function ln(e, t = {}, n, a, o) {
    const i = (function (e = "") {
        const t = String(e || ""),
          n = `${r}:`;
        if (!t.startsWith(n)) return t;
        try {
          return decodeURIComponent(t.slice(n.length));
        } catch {
          return "";
        }
      })(e),
      s = performance?.now?.() || Date.now(),
      l = Xt(i, t.headers || {}),
      u = Qt(l);
    return (function (e) {
      const t = window.shaka?.util?.AbortableOperation;
      return t?.notAbortable
        ? t.notAbortable(e)
        : "function" == typeof t
          ? new t(e, () => Promise.resolve())
          : { promise: e, abort: () => Promise.resolve() };
    })(
      Promise.resolve(
        u
          ? {
              ok: !0,
              data: u.data,
              responseType: "arraybuffer",
              status: u.status || 200,
              finalUrl: u.finalUrl || i,
              contentType: u.contentType || "",
              elapsedMs: 0,
              byteLength: u.byteLength || u.data?.byteLength || 0,
              fromDashBufferPool: !0,
              relay: "viewer-memory-pool",
              dashBufferPool: rn(),
            }
          : Ht({
              nativeStreamKind: "instagram-native",
              url: i,
              responseType: "arraybuffer",
              requestHeaders: t.headers || {},
              dashBufferPool: !0,
              timeoutMs: 25e3,
            }),
      )
        .then((e) => {
          if (!e?.ok)
            throw new Error(e?.error || "Instagram DASH pool fetch failed");
          const n = e.data instanceof ArrayBuffer ? e.data : no(e.base64 || ""),
            r = Math.max(
              1,
              Math.round((performance?.now?.() || Date.now()) - s),
            );
          return (
            !e.fromDashBufferPool &&
              nn(i, e.contentType || "", n.byteLength) &&
              Zt(l, {
                data: n,
                byteLength: n.byteLength,
                status: e.status || 200,
                finalUrl: e.finalUrl || i,
                contentType: e.contentType || "",
                createdAt: Date.now(),
                lastHitAt: 0,
                hitCount: 0,
              }),
            (function (e = {}, t = 0) {
              W &&
                ((W.requests += 1),
                (W.bytes += Math.max(0, Number(t) || 0)),
                e.fromDashBufferPool && (W.hits += 1),
                e.dashBufferPool &&
                  ((W.items = e.dashBufferPool.items || 0),
                  (W.poolBytes = e.dashBufferPool.byteLength || 0)));
            })(e, n.byteLength),
            Pt({
              nativeStreamKind: "instagram-native",
              responseType: "arraybuffer",
              url: i,
              finalUrl: e.finalUrl || i,
              status: e.status || 200,
              elapsedMs: e.elapsedMs || r,
              byteLength: n.byteLength,
              fromDashBufferPool: Boolean(e.fromDashBufferPool),
              relay: e.relay || "",
              ok: !0,
            }),
            "function" == typeof o && o(un(e)),
            "function" == typeof a && a(r, n.byteLength, 0),
            {
              uri: e.finalUrl || i,
              originalUri: i,
              data: n,
              status: e.status || 200,
              headers: un(e),
              fromCache: Boolean(e.fromDashBufferPool),
              originalRequest: t,
            }
          );
        })
        .catch((e) => {
          const t = Math.max(
            1,
            Math.round((performance?.now?.() || Date.now()) - s),
          );
          throw (
            Pt({
              nativeStreamKind: "instagram-native",
              responseType: "arraybuffer",
              url: i,
              elapsedMs: t,
              byteLength: 0,
              ok: !1,
              error: e?.message || "Instagram DASH pool fetch failed",
            }),
            e
          );
        }),
    );
  }
  function un(e = {}) {
    const t = {};
    return (
      e.contentType && (t["content-type"] = e.contentType),
      void 0 !== e.byteLength &&
        (t["content-length"] = String(e.byteLength || 0)),
      e.fromDashBufferPool && (t["x-live-subtitle-dash-pool"] = "hit"),
      t
    );
  }
  function cn(e = "") {
    const t = String(e || "")
      .trim()
      .toLowerCase();
    return "twitch-hls" === t
      ? "twitch-hls"
      : "instagram-native" === t
        ? "instagram-native"
        : "twitch-hls";
  }
  function dn(e = "") {
    return "instagram-native" === e
      ? "Instagram HLS"
      : "twitch-hls" === e
        ? "Twitch HLS"
        : "原始串流";
  }
  function mn(e = 0) {
    return new Promise((t) =>
      window.setTimeout(t, Math.max(0, Number(e) || 0)),
    );
  }
  function fn(e) {
    if (!e) return "unknown";
    const t = ao(e.code),
      n = to(e.message || ""),
      r = Array.isArray(e.data) ? e.data.map((e) => to(e)).filter(Boolean) : [],
      a = r.length ? ` · ${r.slice(0, 2).join(" · ")}` : "";
    return null !== t && n
      ? `${n}${a}`
      : null !== t
        ? `Shaka Error ${t}${a}`
        : to(String(e)) || "unknown";
  }
  function hn() {
    (Mn(),
      kn(),
      (function () {
        if ((yn(), T)) {
          try {
            T.destroy();
          } catch {}
          T = null;
        }
      })(),
      (function () {
        if ((Lt(), !C)) return;
        const e = C;
        C = null;
        try {
          const t = e.destroy?.();
          t?.catch && t.catch(() => {});
        } catch {}
      })());
  }
  function pn() {
    (Mn(), kn(), (F = !1), (ae = !1), (oe = !1), nr());
    try {
      S.video.pause();
    } catch {}
    S.video.removeAttribute("src");
    try {
      S.video.load();
    } catch {}
  }
  function gn(e) {
    (yn(),
      (k = window.setTimeout(() => {
        ((k = null),
          Xa(`${e || "Twitch HLS 載入逾時"}；保留原始 HLS 模式並持續重試。`),
          ot() && zt("hls-startup-timeout", { finalUrl: D }).catch(() => {}));
        try {
          T?.startLoad?.();
        } catch {}
      }, 9e3)));
  }
  function yn() {
    k && (window.clearTimeout(k), (k = null));
  }
  function Sn(e = "") {
    try {
      const t = new URL(e),
        n = t.pathname.split("/").filter(Boolean).slice(-1)[0] || "";
      return `${t.hostname}${n ? `/${n.slice(0, 40)}` : ""}`;
    } catch {
      return String(e || "").slice(0, 80);
    }
  }
  function bn(e) {
    return S.video.paused ? `${e} · 已緩衝，點播放開始` : e;
  }
  function vn(e) {
    return S.video.paused ? `${e} · 已緩衝，點播放開始` : e;
  }
  function wn(t = "") {
    if (st() && !re && !ae) {
      if (!F)
        return R
          ? ((R.status = t || R.status || lt()), void Ln())
          : void (function (t = "") {
              (Mn({ keepState: !1 }),
                (F = !1),
                (ae = !1),
                (oe = !1),
                nr(),
                S.shell.classList.add("waiting"));
              try {
                S.video.pause();
              } catch {}
              const n = oo(Number(s) || 2, 2, e);
              ((R = {
                status: t || lt(),
                startedAtMs: Date.now(),
                targetDelaySeconds: n,
                lastPrimeAtMs: 0,
                lastPrimeTargetTime: null,
                lastProgressSeconds: 0,
                readyToPlay: !1,
              }),
                Ln(),
                (P = window.setInterval(Ln, 250)));
            })(t || lt());
      Xa(vn(t || `${lt()} 原始串流`));
    }
  }
  function Mn(e = {}) {
    (P && (window.clearInterval(P), (P = null)), e.keepState || (R = null));
  }
  function Tn(e = "buffer-underrun") {
    if (!ot() || !ae || re) return !1;
    if (oe) return !1;
    if (H) return (Cn(), !0);
    const t = En(s);
    H = { reason: e, startedAtMs: Date.now(), targetBufferSeconds: t };
    try {
      S.video.pause();
    } catch {}
    return (
      Ot(
        "native.playback.rebuffer_start",
        {
          mode: "twitch-hls",
          reason: e,
          delaySeconds: s,
          targetBufferSeconds: t,
          currentTime: ao(S.video.currentTime),
        },
        "warn",
      ),
      (O = window.setInterval(Cn, 250)),
      Cn(),
      !0
    );
  }
  function Cn() {
    if (!H || re || !ot()) return;
    const e = ao(S.video.currentTime),
      t = null !== e ? Dn(e, S.video.buffered) : 0,
      n = H.targetBufferSeconds || En(s);
    if (
      (Xa(`Twitch HLS 穩定緩衝 ${so(t)} / ${so(n)} · 補足後繼續播放`),
      t + 0.05 < n)
    )
      return;
    const r = H;
    (kn({ keepPaused: !0 }),
      Ot("native.playback.rebuffer_ready", {
        mode: "twitch-hls",
        reason: r.reason,
        waitedMs: Math.max(0, Date.now() - r.startedAtMs),
        aheadSeconds: Math.round(10 * t) / 10,
        targetBufferSeconds: n,
        delaySeconds: s,
      }),
      (oe = !0),
      S.video
        .play()
        .catch((e) => {
          (Xa("Twitch HLS 已補足緩衝，請點播放繼續"),
            Ot(
              "native.playback.rebuffer_resume_failed",
              {
                mode: "twitch-hls",
                message: String(
                  e?.message || e || "playback resume failed",
                ).slice(0, 180),
              },
              "warn",
            ));
        })
        .finally(() => {
          oe = !1;
        }));
  }
  function kn(e = {}) {
    (O && (window.clearInterval(O), (O = null)),
      (H = null),
      e.keepPaused || (oe = !1));
  }
  function Ln() {
    if (!R || re || !st()) return;
    const n = oo(Number(R.targetDelaySeconds) || s, 2, e),
      r = (function (e) {
        const n = Math.max(
            0,
            (Date.now() - (R?.startedAtMs || Date.now())) / 1e3,
          ),
          r = xn();
        if (r) {
          const a = Math.max(0, r.end - r.start);
          return {
            source: "seekable",
            elapsedSeconds: n,
            progressSeconds: Math.min(e, n, a),
            seekWindowSeconds: a,
            limitedReason: a + t < e ? "seek-window" : "",
            targetTime: oo(r.end - e, r.start, r.end),
            liveEdgeSeconds: r.end,
          };
        }
        const a = $n(S.video.buffered);
        if (a) {
          const r = ao(S.video.currentTime) || a.start,
            o = Math.max(0, a.end - r);
          return {
            source: "buffered",
            elapsedSeconds: n,
            progressSeconds: Math.min(e, n, o),
            limitedReason: o + t < e ? "buffer" : "",
            bufferAheadSeconds: o,
          };
        }
        return {
          source: "elapsed",
          elapsedSeconds: n,
          progressSeconds: S.video.readyState >= 1 ? Math.min(e, n) : 0,
        };
      })(n),
      a = oo(
        Math.max(R.lastProgressSeconds || 0, r.progressSeconds || 0),
        0,
        n,
      );
    ((R.lastProgressSeconds = a),
      rr(a, n),
      Xa(
        (function (e, t, n, r = {}) {
          const a =
              void 0 !== r.seekWindowSeconds
                ? ` · live window ${so(r.seekWindowSeconds)}`
                : void 0 !== r.bufferAheadSeconds
                  ? ` · 前方 ${so(r.bufferAheadSeconds)}`
                  : "",
            o = r.limitedReason ? " · 可達後自動開始" : "";
          return `${lt()} 建立固定延遲 ${so(t)} / ${so(n)}${a}${o}`;
        })(R.status, a, n, r),
      ),
      (function (e = {}, t = s) {
        if (!R || !e || !Number.isFinite(e.targetTime)) return !1;
        const n = Un(e, t);
        if ((Number(e.progressSeconds) || 0) + 1.5 < Math.max(0, n)) return !1;
        const r = Date.now(),
          a = Number(e.targetTime),
          o = ao(R.lastPrimeTargetTime);
        if (
          r - (R.lastPrimeAtMs || 0) < 750 &&
          null !== o &&
          Math.abs(o - a) < 0.5
        )
          return !1;
        const i = ao(S.video.currentTime);
        if (null !== i && Math.abs(i - a) <= 0.35) return !1;
        try {
          return (
            (S.video.currentTime = a),
            (R.lastPrimeAtMs = r),
            (R.lastPrimeTargetTime = a),
            !0
          );
        } catch {
          return !1;
        }
      })(r, n));
    const o = a + t >= n,
      i = Un(r, n),
      u =
        !o &&
        Boolean(r.limitedReason) &&
        i >= 2 &&
        a + t >= i &&
        (r.elapsedSeconds || 0) >= i + 1.2;
    if (!o && !u) return;
    const c = o ? n : i;
    if (
      !(function (e = {}, t = s) {
        if (!e) return !1;
        const n = ro(e.targetTime, S.video.currentTime);
        if (null === n) return !1;
        if (Dn(n, S.video.buffered) >= En(t)) return !0;
        return Un(e, t) < 2;
      })(r, c)
    ) {
      const e = Math.max(0, (Date.now() - (R.startedAtMs || Date.now())) / 1e3),
        t = ro(r.targetTime, S.video.currentTime),
        n = null !== t ? Dn(t, S.video.buffered) : 0,
        a = En(c),
        o = Math.min(a, 3);
      if (e < Math.max(30, c + 3) && n < o)
        return void Xa(
          (function (e = "", t = {}) {
            const n = ro(t.targetTime, S.video.currentTime),
              r = null !== n ? Dn(n, S.video.buffered) : 0,
              a = En(Un(t, s));
            return `${lt()} 準備播放片段 ${so(r)} / ${so(a)} · 正在穩定直播畫面`;
          })(R.status, r),
        );
      Ot(
        "native.playback.startup_buffer_fallback",
        {
          mode: ot() ? "twitch-hls" : "instagram-native",
          waitedSeconds: Math.round(10 * e) / 10,
          aheadSeconds: Math.round(10 * n) / 10,
          targetBufferSeconds: a,
          fallbackBufferSeconds: o,
          delaySeconds: c,
        },
        "warn",
      );
    }
    ((R.readyToPlay = !0),
      (F = !0),
      Mn({ keepState: !0 }),
      c < n &&
        (function (t) {
          ((s = oo(Number(t) || s, 2, e)),
            (l = Math.round(1e3 * s)),
            Qa(),
            R && (R.status = `${lt()} 原始串流 · 可用延遲 ${so(s)}`));
        })(c),
      (function (e) {
        const t = xn();
        if (!t) return !1;
        const n = oo(t.end - e, t.start, t.end),
          r = ao(S.video.currentTime);
        if (null === r || Math.abs(r - n) > 0.35)
          try {
            S.video.currentTime = n;
          } catch {
            return !1;
          }
      })(c));
    const d = R.status || lt();
    ((R = null),
      ot()
        ? Nn(d)
        : (function (e) {
            !oe &&
              S.video.paused &&
              ((oe = !0),
              S.video
                .play()
                .catch(() => {
                  Xa(vn(e || "Instagram 原始串流"));
                })
                .finally(() => {
                  oe = !1;
                }));
          })(d));
  }
  function En(t = s) {
    const n = oo(Number(t) || s, 2, e);
    return oo(n - 1, 1.5, 6);
  }
  function Dn(e, t = S.video?.buffered) {
    const n = ao(e);
    if (null === n || !t?.length) return 0;
    try {
      for (let e = 0; e < t.length; e += 1) {
        const r = ao(t.start(e)),
          a = ao(t.end(e));
        if (!(null === r || null === a || a <= r) && n + 0.05 >= r && n < a)
          return Math.max(0, a - n);
      }
    } catch {
      return 0;
    }
    return 0;
  }
  function Un(e = {}, t) {
    const n = ro(e.seekWindowSeconds, e.bufferAheadSeconds, e.progressSeconds);
    return null === n ? t : oo(n, 0, t);
  }
  function xn() {
    if (C?.seekRange)
      try {
        const e = C.seekRange(),
          t = ao(e?.start),
          n = ao(e?.end);
        if (null !== t && null !== n && n > t) return { start: t, end: n };
      } catch {}
    return $n(S.video.seekable);
  }
  function $n(e) {
    if (!e?.length) return null;
    try {
      const t = e.length - 1,
        n = ao(e.start(t)),
        r = ao(e.end(t));
      if (null !== n && null !== r && r > n) return { start: n, end: r };
    } catch {
      return null;
    }
    return null;
  }
  function Nn(e) {
    !oe &&
      S.video.paused &&
      ((oe = !0),
      S.video
        .play()
        .catch((t) => {
          ((F = !0),
            Ot(
              "native.playback.autoplay_blocked",
              {
                mode: "twitch-hls",
                error: String(t?.message || t || "autoplay blocked").slice(
                  0,
                  180,
                ),
                delaySeconds: s,
              },
              "warn",
            ),
            Xa(bn(e || "Twitch HLS 原始串流")));
        })
        .finally(() => {
          oe = !1;
        }));
  }
  function In(e = []) {
    let t = -1,
      n = -1;
    return (
      e.forEach((e, r) => {
        const a =
          Number(e.width || 0) * Number(e.height || 0) * 1e3 +
          Number(e.frameRate || e.attrs?.["FRAME-RATE"] || 0) +
          Number(e.bitrate || 0) / 1e7;
        a > n && ((n = a), (t = r));
      }),
      t
    );
  }
  function An(e = null) {
    const t = (Array.isArray(e?.fragments) ? e.fragments : [])
      .map((e, t) => {
        const n = ao(e.start),
          r = ao(e.duration),
          a = ro(
            e.programDateTime,
            e.rawProgramDateTime ? Date.parse(e.rawProgramDateTime) : null,
          );
        return null === n || null === r || null === a
          ? null
          : {
              videoStartSeconds: n,
              videoEndSeconds: n + r,
              sourceStartWallTimeMs: a,
              sourceEndWallTimeMs: a + 1e3 * r,
              sequence: e.sn || t + 1,
            };
      })
      .filter(Boolean);
    t.length &&
      ((ne = t),
      (Fe = {
        wallTimeMs: Date.now(),
        sourceTimeMs: t[t.length - 1].sourceEndWallTimeMs,
      }),
      pr(),
      Bn());
  }
  function Bn() {
    if (re || !o || !0 !== ke?.liveSharedEnabled || !ot() || !ne.length) return;
    const e = hr(),
      t = ne[ne.length - 1],
      n = ao(t?.sourceEndWallTimeMs);
    if (null === e || null === n) return;
    const r = Date.now();
    chrome.runtime
      .sendMessage({
        type: "LIVE_SUBTITLE_SHARED_TIMELINE_ANCHOR",
        sessionId: o,
        observedAtMs: r,
        mediaTimeSeconds: ao(S.video.currentTime),
        viewerSourceWallTimeMs: e,
        liveEdgeSourceWallTimeMs: n,
        sourceWallTimeMs: e + l,
        delayMs: l,
      })
      .catch(() => {});
  }
  async function Pn(e) {
    if (re) return;
    if (st()) return;
    const t = ao(e.sequence);
    if (null !== t) {
      if (Q.has(t)) return;
      if ((Q.add(t), Q.size > 600)) {
        const e = t - 500;
        for (const t of Array.from(Q)) t < e && Q.delete(t);
      }
    }
    fe += 1;
    const n = e.mimeType || "video/webm";
    let r = null;
    try {
      r = await (async function (e) {
        if (e.chunkBlob instanceof Blob) return e.chunkBlob.arrayBuffer();
        if (e.chunk instanceof ArrayBuffer) return e.chunk;
        if (e.chunk?.buffer instanceof ArrayBuffer) return e.chunk.buffer;
        if (Array.isArray(e.chunk)) return new Uint8Array(e.chunk).buffer;
        if ("string" == typeof e.chunkBase64 && e.chunkBase64)
          try {
            return no(e.chunkBase64);
          } catch {
            return null;
          }
        return null;
      })(e);
    } catch {
      r = null;
    }
    if (!r) return void Xa(`鏡像 chunk ${e.sequence || fe} 無法讀取`);
    const a = ao(e.capturedAtMs) || Date.now();
    if (ge) {
      const e = a - ge;
      e >= 250 && e <= 4e3 && (ye = oo(e, 250, 4e3));
    }
    ((ge = a),
      ae ||
        (function (e) {
          const t = ao(e);
          if (null === t) return Se;
          (pe || (pe = t), rr(Math.max(0, t - pe + Math.max(1, ye)) / 1e3));
        })(a));
    const o = {
        bytes: r,
        mimeType: n,
        capturedAtMs: a,
        sequence: t || fe,
        byteLength: ao(e.byteLength) || r.byteLength || 0,
      },
      i = jn();
    if (i <= 0 || (ae && (ie || Yn() < Gn())))
      return (
        Rn(ie ? "rebuffering" : "low-buffer"),
        G.push(o),
        Fn(),
        void Xa(sr(`鏡像播放緩衝 · ${he}/${fe}`))
      );
    const s = window.setTimeout(() => {
      (X.delete(s), G.push(o), Fn(), Xa(sr(`鏡像播放緩衝 · ${he}/${fe}`)));
    }, i);
    (X.set(s, { chunk: o, dueAtMs: Date.now() + i }),
      ae || Xa(sr(`建立鏡像延遲中 · 已收 ${fe} 段`)));
  }
  function Rn(e = "low-buffer") {
    if (!X.size) return 0;
    const t = Array.from(X.entries()).sort(
      (e, t) =>
        (ao(e[1]?.chunk?.sequence) || 0) - (ao(t[1]?.chunk?.sequence) || 0),
    );
    for (const [e, n] of t)
      (window.clearTimeout(e), X.delete(e), n?.chunk && G.push(n.chunk));
    return (
      tr(
        "mirror.playback.scheduled_chunks_released",
        { reason: e, releasedChunks: t.length },
        { force: !0, level: "warn" },
      ),
      Fn(),
      t.length
    );
  }
  function Fn() {
    if (re || !G.length) return;
    const e = G[0];
    if (
      (function (e) {
        if (w || !b || "open" !== b.readyState) return Boolean(w);
        const t = MediaSource.isTypeSupported(e) ? e : "video/webm";
        if (!MediaSource.isTypeSupported(t))
          return (Xa(`不支援鏡像格式：${e}`), !1);
        ((M = t), (w = b.addSourceBuffer(t)));
        try {
          w.mode = "sequence";
        } catch {}
        return (
          w.addEventListener("updateend", () => {
            (de
              ? (de = !1)
              : (function () {
                  if (!Y) return;
                  const e = Y;
                  Y = null;
                  const t = ao(e.videoStartSeconds) || 0,
                    n = Hn(),
                    r = Math.max(0.25, ye / 1e3),
                    a = Math.max(t + 0.05, n || t + r),
                    o = Math.max(250, Math.round(1e3 * (a - t)) || ye),
                    i = ao(e.capturedAtMs) || Date.now(),
                    s = i - o;
                  (ne.push({
                    videoStartSeconds: t,
                    videoEndSeconds: a,
                    sourceStartWallTimeMs: s,
                    sourceEndWallTimeMs: i,
                    sequence: e.sequence || ne.length + 1,
                  }),
                    pr(),
                    (function () {
                      const e = Yn();
                      if (ae)
                        if (ie) {
                          if (e < Jn())
                            return void Xa(sr("鏡像正在重新累積穩定緩衝"));
                          if (oe) return;
                        } else {
                          if (S.video.paused) return;
                          if (!S.video.paused && e < Gn())
                            return void Xa(sr("鏡像緩衝偏低"));
                          if (!S.video.paused) return;
                        }
                      else {
                        const e = Qn(Kn());
                        if (!e) return void Xa(sr("建立鏡像延遲中"));
                        if (!Zn(e)) return;
                        if (oe) return;
                      }
                      ((oe = !0),
                        S.video.play().catch(() => {
                          ((oe = !1),
                            Xa(
                              ie
                                ? sr("鏡像正在重新累積穩定緩衝")
                                : "請點播放以開始鏡像延遲",
                            ));
                        }));
                    })(),
                    cr());
                })(),
              Fn(),
              Wn(),
              tr("mirror.playback.buffer_summary"));
          }),
          w.addEventListener("error", () => {
            Xa(`鏡像 buffer 錯誤 (${M})`);
          }),
          w.addEventListener("abort", () => {
            Xa(`鏡像 buffer 中止 (${M})`);
          }),
          !0
        );
      })(e.mimeType) &&
      !w.updating
    )
      try {
        ((Y = { ...e, videoStartSeconds: Hn() }),
          w.appendBuffer(e.bytes),
          G.shift(),
          (he += 1),
          Xa(sr(`鏡像緩衝中 · ${he}/${fe}`)));
      } catch (t) {
        if (((Y = null), On(t))) {
          e.appendRetryCount = Math.max(0, Number(e.appendRetryCount) || 0) + 1;
          const t =
              e.appendRetryCount <= 1
                ? 30
                : Math.max(3, 30 / 2 ** (e.appendRetryCount - 1)),
            n = qn(Date.now(), {
              force: !0,
              reason: "quota-exceeded",
              backBufferSeconds: t,
              minTrimSeconds: 1,
            });
          if (
            (tr(
              "mirror.playback.append_quota_exceeded",
              {
                retryCount: e.appendRetryCount,
                emergencyBackBufferSeconds: t,
                recoveryTrimStarted: n,
              },
              { force: !0, level: "warn" },
            ),
            n)
          )
            return;
          if (e.appendRetryCount < 3) return void window.setTimeout(Fn, 250);
        } else G.shift();
        (Xa(t.message || `鏡像播放失敗 (${M})`),
          tr(
            "mirror.playback.append_error",
            {
              name: String(t?.name || "Error").slice(0, 80),
              message: String(t?.message || t || "append failed").slice(0, 240),
              retryCount: Math.max(0, Number(e.appendRetryCount) || 0),
            },
            { force: !0, level: "error" },
          ),
          On(t) || window.setTimeout(Fn, 0));
      }
  }
  function On(e) {
    const t = String(e?.name || "").toLowerCase(),
      n = String(e?.message || e || "").toLowerCase();
    return "quotaexceedederror" === t || n.includes("quota");
  }
  function Hn() {
    const e = w?.buffered || S.video.buffered;
    if (!e?.length) return 0;
    try {
      return e.end(e.length - 1);
    } catch {
      return 0;
    }
  }
  function _n(e, t, n = 120, r = 15) {
    const a = ao(e),
      o = Math.max(1, Number(n) || 120),
      i = Math.max(0.1, Number(r) || 15);
    if (null === a || a < o + i || !t?.length) return null;
    try {
      const e = Math.max(0, a - o),
        n = ao(t.start(0));
      return null === n || e - n < i ? null : { start: n, end: e };
    } catch {
      return null;
    }
  }
  function qn(e = Date.now(), t = {}) {
    const n = Boolean(t.force);
    if (
      !w ||
      w.updating ||
      (!n && G.length > 0) ||
      de ||
      (!n &&
        (!ae ||
          !S.video.paused ||
          ie ||
          le ||
          S.video.readyState < 3 ||
          Yn() < 2 * Gn() ||
          e - ce < 6e4))
    )
      return !1;
    const r = _n(
      S.video.currentTime,
      w.buffered,
      t.backBufferSeconds,
      t.minTrimSeconds,
    );
    if (!r) return !1;
    try {
      return (
        (de = !0),
        (ce = e),
        w.remove(r.start, r.end),
        tr(
          "mirror.playback.buffer_trim",
          {
            reason: String(t.reason || "paused-idle"),
            emergency: n,
            removeStartSeconds: Number(r.start.toFixed(3)),
            removeEndSeconds: Number(r.end.toFixed(3)),
          },
          { force: !0 },
        ),
        !0
      );
    } catch {
      return ((de = !1), !1);
    }
  }
  function Wn(e = Date.now()) {
    return !(
      me ||
      !ae ||
      !S.video.paused ||
      ie ||
      de ||
      e - ce < 6e4 ||
      ((me = window.setTimeout(() => {
        ((me = null), qn());
      }, 500)),
      0)
    );
  }
  function zn(e = l, t = lr()) {
    const n = Math.max(1850, Math.round(Number(e) || 0)),
      r = Math.max(t ? 12e3 : 8e3, 0.9 * n),
      a = Math.max(u, n - 250);
    return oo(r, u, Math.min(24e3, a));
  }
  function Vn() {
    return zn(l, lr());
  }
  function jn() {
    return Math.max(0, l - Vn());
  }
  function Kn() {
    return Vn();
  }
  function Jn() {
    return oo(0.12 * Vn(), 1600, 3e3);
  }
  function Gn() {
    return oo(0.3 * Vn(), 1200, 7e3);
  }
  function Yn() {
    const e = ao(S.video.currentTime) || 0,
      t = w?.buffered || S.video.buffered;
    return Math.max(0, 1e3 * Dn(e, t));
  }
  function Xn(e, t = ae) {
    return Boolean(t) && Math.max(0, Number(e) || 0) < 600;
  }
  function Qn(e, t = w?.buffered || S.video.buffered) {
    if (!t?.length) return null;
    const n = Math.max(u, Math.max(0, Number(e) || 0) - 250),
      r = [];
    try {
      for (let e = 0; e < t.length; e += 1) {
        const n = ao(t.start(e)),
          a = ao(t.end(e));
        null === n ||
          null === a ||
          a <= n ||
          r.push({
            index: e,
            start: n,
            end: a,
            durationMs: Math.max(0, 1e3 * (a - n)),
          });
      }
    } catch {
      return null;
    }
    return r.find((e) => e.durationMs >= n) || null;
  }
  function Zn(e) {
    if (!e) return !1;
    const t = ao(S.video.currentTime),
      n = null === t ? 0 : 1e3 * Dn(t, w?.buffered || S.video.buffered);
    if (null !== t && t + 0.05 >= e.start && t < e.end && n >= Kn() - 250)
      return !0;
    try {
      const n = t;
      return (
        (S.video.currentTime = e.start + 0.01),
        tr(
          "mirror.playback.start_range_selected",
          {
            previousTime: n,
            selectedRangeIndex: e.index,
            selectedRangeStartMs: Math.round(1e3 * e.start),
            selectedRangeEndMs: Math.round(1e3 * e.end),
            selectedRangeDurationMs: Math.round(e.durationMs),
          },
          { force: !0 },
        ),
        !0
      );
    } catch {
      return !1;
    }
  }
  function er(e = {}) {
    const t = Math.round(Kn()),
      n = Math.max(1, Math.round(ye));
    let r = null;
    try {
      r = S.video.getVideoPlaybackQuality?.() || null;
    } catch {}
    return {
      videoWidth: ao(S.video.videoWidth),
      videoHeight: ao(S.video.videoHeight),
      totalVideoFrames: ao(r?.totalVideoFrames),
      droppedVideoFrames: ao(r?.droppedVideoFrames),
      delayMs: Math.round(l),
      bufferAheadMs: Math.round(Yn()),
      bufferedEndMs: Math.max(0, Math.round(1e3 * Hn())),
      targetBufferMs: t,
      resumeBufferMs: Math.round(Jn()),
      lowBufferWarningMs: Math.round(Gn()),
      releaseDelayMs: Math.round(jn()),
      estimatedChunkDurationMs: n,
      estimatedTargetChunks: Number((t / n).toFixed(2)),
      currentTimeMs: Math.max(
        0,
        Math.round(1e3 * (ao(S.video.currentTime) || 0)),
      ),
      bufferedRangeCount: Number(
        (w?.buffered || S.video.buffered)?.length || 0,
      ),
      readyState: ao(S.video.readyState),
      networkState: ao(S.video.networkState),
      receivedChunkCount: fe,
      appendedChunkCount: he,
      appendQueueLength: G.length,
      scheduledChunkCount: X.size,
      playbackStarted: ae,
      playbackPaused: Boolean(S.video.paused),
      mirrorRebuffering: ie,
      mirrorBufferTrimInProgress: de,
      mirrorDecoderWaiting: le > 0,
      lastMirrorBufferTrimAgeMs: ce ? Math.max(0, Date.now() - ce) : null,
      ...e,
    };
  }
  function tr(e, t = {}, n = {}) {
    if (st()) return;
    const r = Date.now();
    (!n.force && r - ue < 3e4) || ((ue = r), Ot(e, er(t), n.level || "info"));
  }
  function nr() {
    ((pe = 0), (ge = 0), (Se = 0));
  }
  function rr(e, t = s) {
    const n = Math.max(0, Number(t) || 0),
      r = Math.max(0, Number(e) || 0);
    return ((Se = Math.max(Se, r)), n > 0 && (Se = Math.min(Se, n)), Se);
  }
  function ar() {
    if (re || ae) return null;
    const e = Math.max(0, Number(s) || 0),
      t = rr(R ? Math.max(0, Number(R.lastProgressSeconds) || 0) : 0, e);
    return e
      ? {
          original: or("正在努力產生字幕中...", "Loading subtitles…"),
          translation: or(
            `麻煩稍等一下，我們正在同步聲音與字幕 · ${so(t)} / ${so(e)}`,
            `Synchronizing audio and subtitles · ${so(t)} / ${so(e)}`,
          ),
          progressSeconds: t,
          targetSeconds: e,
        }
      : {
          original: or("正在努力產生字幕中...", "Loading subtitles…"),
          translation: or(
            "麻煩稍等一下，我們正在同步聲音與字幕。",
            "Please wait while we synchronize the audio and subtitles.",
          ),
          progressSeconds: t,
          targetSeconds: e,
        };
  }
  function or(e, t) {
    const n = String(ke?.uiLocale || "")
      .trim()
      .toLowerCase()
      .replace(/_/g, "-");
    return "en" === n || n.startsWith("en-") ? t : e;
  }
  function ir() {
    const e = String(ke?.uiLocale || "")
        .trim()
        .toLowerCase()
        .replace(/_/g, "-"),
      t = "en" === e || e.startsWith("en-");
    document.documentElement?.setAttribute?.("lang", t ? "en" : "zh-Hant");
  }
  function sr(e) {
    const t = Qn(0),
      n = t ? Math.max(0, Math.round(t.durationMs)) : 0,
      r = Math.round(Yn()),
      a = Math.round(Kn());
    if (!ae)
      return or(
        `${e} · 播放緩衝 ${io(n)} / ${io(a)} · 固定延遲 ${io(l)}`,
        `${e} · Playback buffer ${io(n)} / ${io(a)} · Fixed delay ${io(l)}`,
      );
    const o = X.size ? or(` · 排程 ${X.size}`, ` · Scheduled ${X.size}`) : "";
    return or(`${e} · 前方 ${io(r)}${o}`, `${e} · Ahead ${io(r)}${o}`);
  }
  function lr() {
    const e = to(ke?.videoPlatform || "").toLowerCase(),
      t = to(ke?.pageUrl || a.get("source") || "").toLowerCase();
    return "instagram" === e || t.includes("instagram.com");
  }
  function ur(e, t) {
    if (
      Number.isFinite(t) &&
      Number.isFinite(e.endSourceWallTimeMs) &&
      t > e.endSourceWallTimeMs + 2e3
    )
      return "expired-display-window";
    const n = we.get(e.key);
    return !n || (n.fallbackDisplayed && !e.fallbackDisplayed && ve === e.key)
      ? Me &&
        e.key !== Me.key &&
        e.endSourceWallTimeMs <= Me.targetSourceWallTimeMs
        ? "superseded-by-newer-cue"
        : ""
      : "already-displayed";
  }
  function cr() {
    if (re) return;
    if (!te.length) return void gr();
    if (!fr()) return;
    const e = hr();
    if (null === e && !st()) return;
    const t = te.length;
    ((te = te.filter((t) => !ur(t, e))),
      te.length < t &&
        Ot(
          "subtitle.mirror.queue_pruned",
          { removed: t - te.length, remaining: te.length },
          "info",
        ));
    const n = Date.now();
    if (n - be < 450) return;
    const r = te.findIndex((t) => mr(t, e, n));
    if (r < 0) return;
    const [a] = te.splice(r, 1),
      o = be ? n - be : null;
    for (
      be = n,
        ve = a.key,
        Me = a,
        we.set(a.key, { fallbackDisplayed: a.fallbackDisplayed });
      we.size > 512;

    )
      we.delete(we.keys().next().value);
    const i = (function (e, t) {
        const n = to(e),
          r = to(t);
        if (!n && !r) return 0;
        const a = `${n}\n${r}`,
          o = Ce[Ce.length - 1];
        (o?.key === a
          ? (o.renderedAtMs = Date.now())
          : (Ce.push({
              key: a,
              original: n,
              translation: r,
              renderedAtMs: Date.now(),
            }),
            Ce.length > 80 && Ce.splice(0, Ce.length - 80)),
          (S.original.textContent = n || " "),
          (S.translation.textContent = r || " "),
          S.panel.classList.remove("subtitle-empty", "subtitle-fading"),
          yr());
        const i = (function (e = "", t = "") {
          Te && window.clearTimeout(Te);
          const n = Sr(e, t);
          return (
            (Te = window.setTimeout(() => {
              ((Te = null),
                "large" !== $e.mode &&
                  "side" !== $e.mode &&
                  S.panel.classList.add("subtitle-fading"));
            }, n)),
            n
          );
        })(n, r);
        return (Ie.open && jr(), i);
      })(a.original, a.translation),
      s = dr(a, e, n);
    Ot(
      "subtitle.displayed",
      {
        original: a.original,
        translation: a.translation,
        order: a.order,
        segmentationMethod: a.segmentationMethod,
        mediaTime: a.mediaTime,
        displayAfterMediaTime: a.displayAfterMediaTime,
        audioStartMediaTime: a.audioStartMediaTime,
        audioEndMediaTime: a.audioEndMediaTime,
        mediaTimeEnd: a.mediaTimeEnd,
        targetMediaTime: a.targetMediaTime,
        targetMediaTimeEnd: a.targetMediaTimeEnd,
        timingSource: a.timingSource,
        queueSequence: a.queueSequence,
        plannedDisplayDurationMs: i,
        previousDisplayDurationMs: o,
        fallbackDisplayed: a.fallbackDisplayed,
        ...s,
        displayedAt: new Date(n).toISOString(),
      },
      s.schedulerLateSeconds > 0.5 ? "warn" : "info",
    );
  }
  function dr(e = {}, t = null, n = Date.now()) {
    const r = ao(e.targetSourceWallTimeMs),
      a = ao(t),
      o = ao(e.targetPlaybackWallTimeMs),
      i = ao(e.queuedSourceWallTimeMs),
      s = st() ? 460 : 340,
      l = null !== r ? r - s : null,
      u = null !== r && null !== a ? a - r : null,
      c = null !== l && null !== a ? a - l : null !== o ? n - (o - s) : null,
      d = null !== l && null !== i ? l - i : null;
    return {
      syncDisplayErrorSeconds: null !== u ? u / 1e3 : null,
      schedulerLateSeconds: null !== c ? c / 1e3 : null,
      subtitlePresentationLeadSeconds: s / 1e3,
      readyLeadSeconds: null !== d ? d / 1e3 : null,
      queuedForMs: Math.max(0, n - (ao(e.queuedAtMs) || n)),
      targetSourceWallTimeMs: r,
      currentSourceWallTimeMs: a,
      targetPlaybackWallTimeMs: o,
      viewerMediaTime: ao(S.video.currentTime),
      viewerPlaybackRate: ao(S.video.playbackRate),
      viewerPaused: Boolean(S.video.paused),
      viewerClockSource: st()
        ? "native-media-timeline"
        : "mirror-media-timeline",
      sourceClockMethod: e.sourceClockMethod || "",
      sourceBroadcasterLatencySeconds:
        e.sourceBroadcasterLatencySeconds ?? null,
      mirrorRebuffering: ie,
    };
  }
  function mr(e, t, n = Date.now()) {
    if (!e) return !1;
    if (st()) {
      if (!fr()) return !1;
      if (Number.isFinite(t) && Number.isFinite(e.targetSourceWallTimeMs))
        return t >= e.targetSourceWallTimeMs - 460;
      const r = ao(e.targetPlaybackWallTimeMs);
      return !(null === r || !fr()) && n >= r - 460;
    }
    return t >= e.targetSourceWallTimeMs - 340;
  }
  function fr() {
    return ae && !S.video.paused && S.video.readyState >= 2;
  }
  function hr() {
    if (!ne.length || !Number.isFinite(S.video.currentTime)) return null;
    const e = S.video.currentTime,
      t = ne.find((t) => e >= t.videoStartSeconds && e <= t.videoEndSeconds);
    if (t) return t.sourceStartWallTimeMs + 1e3 * (e - t.videoStartSeconds);
    const n = ne[0];
    if (e < n.videoStartSeconds)
      return n.sourceStartWallTimeMs - 1e3 * (n.videoStartSeconds - e);
    const r = ne[ne.length - 1];
    return r.sourceEndWallTimeMs + 1e3 * (e - r.videoEndSeconds);
  }
  function pr() {
    const e = Math.max(0, S.video.currentTime - 60);
    ne = ne.filter((t, n) => n === ne.length - 1 || t.videoEndSeconds >= e);
  }
  function gr() {
    ee && (window.clearInterval(ee), (ee = null));
  }
  function yr() {
    if (!S.subtitleLines || !S.largeLines) return;
    (S.subtitleLines.replaceChildren(), S.largeLines.replaceChildren());
    const e = ar();
    if (!e && Ce.length)
      (S.panel.classList.remove("subtitle-empty"),
        Ce.forEach((e, t) => {
          const n = t === Ce.length - 1,
            r = document.createElement("div");
          r.className = "subtitle-line" + (n ? " active" : "");
          const a = document.createElement("p");
          ((a.className = "subtitle-line-original"),
            (a.textContent = e.original || " "));
          const o = document.createElement("p");
          ((o.className = "subtitle-line-translation"),
            (o.textContent = e.translation || " "),
            r.append(a, o),
            S.subtitleLines.appendChild(r));
          const i = document.createElement("section");
          i.className = "large-line" + (n ? " active" : "");
          const s = document.createElement("p");
          ((s.className = "large-original"),
            (s.textContent = e.original || " "));
          const l = document.createElement("p");
          ((l.className = "large-translation"),
            (l.textContent = e.translation || " "),
            i.append(s, l),
            S.largeLines.appendChild(i));
        }),
        (S.largeLines.scrollTop = S.largeLines.scrollHeight),
        br());
    else {
      const t = Boolean(e) || S.video.paused || ie;
      if ((S.panel.classList.toggle("subtitle-empty", !t), t)) {
        S.panel.classList.remove("subtitle-fading");
        const t = document.createElement("div");
        t.className = "subtitle-line locator active";
        const n = document.createElement("p");
        n.className = "subtitle-line-original";
        const r = document.createElement("p");
        ((r.className = "subtitle-line-translation"),
          (n.textContent = e?.original || ""),
          (r.textContent =
            e?.translation ||
            or(
              "影片暫停中，字幕會在播放後繼續",
              "Video paused. Subtitles will continue after playback resumes.",
            )),
          t.append(n, r),
          S.subtitleLines.appendChild(t));
        const a = document.createElement("p");
        ((a.className = "large-empty"),
          (a.textContent = r.textContent),
          S.largeLines.appendChild(a));
      }
      br();
    }
  }
  function Sr(e = "", t = "") {
    const n = Array.from(to(e)).length,
      r = Array.from(to(t)).length;
    return oo(1800 + 70 * Math.max(Math.round(0.55 * n), r), 3200, 6500);
  }
  function br() {
    if (!S.panel || $e.collapsed) return;
    const e = Math.max(
        0,
        S.panel.clientHeight - (S.toolbar?.clientHeight || 30),
      ),
      t = Math.max(112, 3.15 * $e.fontSize);
    S.panel.classList.toggle("single-line-mode", e < t);
  }
  function vr(e) {
    ((Ne.open = Boolean(e)),
      Ne.open
        ? ((Ne.status = Ne.items.length
            ? Ne.status
            : `正在擷取 ${ia()} 聊天室...`),
          Yr(),
          Tr())
        : (Ar(), Cr(), Yr()),
      Mr());
  }
  function wr() {
    (Ar(), (Ne.open = !1), (Ie.open = !1), Cr(), Yr(), jr(), Mr());
  }
  function Mr() {
    const e = Ne.open || Ie.open;
    (S.interactionPanel.classList.toggle("open", e),
      S.chatPanel.classList.toggle("open", Ne.open),
      S.replyPanel.classList.toggle("open", Ie.open),
      S.chatToggle.classList.toggle("toggle-active", e),
      S.replyToggle.classList.toggle("toggle-active", Ie.open),
      S.replyToggle.setAttribute("aria-expanded", String(Ie.open)),
      (S.replyToggle.textContent = Ie.open ? "隱藏回覆" : "寫回覆"),
      (S.replyToggle.title = Ie.open ? "隱藏回覆翻譯" : "展開回覆翻譯"));
  }
  function Tr() {
    Ne.open &&
      !Ae &&
      (Dr(),
      (Ae = window.setInterval(Dr, 1500)),
      Be || (Be = window.setInterval(Er, 100)));
  }
  function Cr() {
    (Be && (window.clearInterval(Be), (Be = null)),
      Ae && (window.clearInterval(Ae), (Ae = null)),
      $r());
  }
  function kr() {
    return (
      (Pe ||= globalThis.SubruuLiveChat?.createTimeline(() => ({
        timeMs: hr(),
        playing: ae && !S.video.paused && S.video.readyState >= 2 && !ie,
        seeking: S.video.seeking,
        rate: S.video.playbackRate,
      }))),
      Pe
    );
  }
  function Lr(e) {
    const t = e.timing?.observedAtMs;
    if (!Number.isFinite(t)) return null;
    if (!st()) return t;
    if (!Fe) return null;
    const n = e.timing?.sourceClock,
      r =
        Number.isFinite(n?.seekableEndSeconds) &&
        Number.isFinite(n?.currentTime)
          ? n.seekableEndSeconds - n.currentTime
          : null,
      a = n?.liveLagSeconds,
      o =
        null !== r &&
        r >= -0.5 &&
        r <= 120 &&
        Number.isFinite(a) &&
        a >= 0 &&
        a <= 120
          ? a
          : 0;
    return Fe.sourceTimeMs + t - Fe.wallTimeMs - 1e3 * o;
  }
  function Er() {
    if (Ne.open && !re) {
      for (const e of Ne.items)
        Number.isFinite(e.dueTimeMs) || (e.dueTimeMs = Lr(e));
      kr()?.sample(Ne.items);
      for (const e of Ne.items) e.translationClosed && Ye.delete(e.key);
      (Xr(), xr());
    }
  }
  async function Dr() {
    if (!Ne.open || Oe || re) return;
    const e = We;
    Oe = !0;
    try {
      const t = await ma(
        chrome.runtime.sendMessage({
          type: "LIVE_CHAT_SCAN_FRAMES",
          sessionId: o,
          syncPlayback: !0,
          source: "active-session",
        }),
        3e3,
        { ok: !1, timeout: !0 },
      );
      if (e !== We) return;
      if (!t?.ok)
        return (
          (Ne.status =
            t?.error || `找不到來源聊天室，請確認 ${ia()} 直播頁仍開著。`),
          void Yr()
        );
      const n = Array.isArray(t.messages)
        ? t.messages
            .map((e) => ({
              author: to(e.author),
              text: to(e.text),
              platform: to(e.platform),
              sourceMessageId: to(e.sourceMessageId),
              timing: e.timing,
              authorMeta: globalThis.SubruuLiveChat?.normalizeAuthorMeta(
                e.authorMeta,
              ),
              parts: globalThis.SubruuLiveChat?.normalizeParts(e.parts) || [],
            }))
            .filter((e) => e.text)
            .slice(-24)
        : [];
      if (!n.length)
        return (
          (Ne.status = t.scannedLiveChatFrame
            ? `等待 ${ia()} 聊天室留言...`
            : "找不到聊天室，請確認來源分頁聊天室已展開。"),
          void Yr()
        );
      let r = 0;
      for (const e of n) Ur(e) && (r += 1);
      r && ((Ne.status = `已擷取 ${Ne.items.length} 則留言，翻譯中...`), Yr());
    } catch (e) {
      ((Ne.status = e.message || "聊天室擷取失敗"),
        (Ne.error = Ne.status),
        Yr());
    } finally {
      Oe = !1;
    }
  }
  function Ur(e) {
    const t = to(e.text);
    if (!t) return !1;
    const n = to(e.author),
      r = to(e.platform),
      a = to(e.sourceMessageId),
      o = globalThis.SubruuLiveChat?.normalizeParts(e.parts) || [],
      i = globalThis.SubruuLiveChat?.normalizeAuthorMeta(e.authorMeta),
      s = aa({ author: n, text: t, platform: r, sourceMessageId: a, parts: o });
    if (!s) return !1;
    if (Ge.has(s) || Ye.has(s)) {
      const e = Ne.items.find((e) => e.key === s);
      return !(
        !e ||
        !n ||
        (e.author === n &&
          JSON.stringify(e.authorMeta || null) === JSON.stringify(i || null)) ||
        ((e.author = n), i ? (e.authorMeta = i) : delete e.authorMeta, 0)
      );
    }
    (Ge.add(s), Ye.add(s));
    const l = {
      id: "chat-" + ++qe,
      key: s,
      author: n,
      text: t,
      platform: r,
      sourceMessageId: a,
      timing: e.timing,
      dueTimeMs: Lr(e),
      ...(i ? { authorMeta: i } : {}),
      ...(o.length ? { parts: o } : {}),
      generation: We,
      translation: "",
      status: "pending",
    };
    return (
      Ne.items.push(l),
      ea(),
      globalThis.SubruuLiveChat?.imageOnlyMessage(o, t)
        ? ((l.imageOnly = !0),
          (l.translation = ""),
          (l.status = "done"),
          Ye.delete(s),
          !0)
        : (Xe.push(l), xr(), !0)
    );
  }
  function xr(e = {}) {
    if (!Ne.open || !Xe.length || _e) return;
    const t =
      Boolean(e.immediate) ||
      (function (e = []) {
        return e.reduce((e, t) => e + oa(t), 0);
      })(Xe) >= 650;
    if (He) {
      if (!t) return;
      $r();
    }
    He = window.setTimeout(
      () => {
        ((He = null),
          (async function () {
            if (_e) return;
            $r();
            const e = We;
            ((Re ||= SubruuLiveChat.createBatchRunner({
              onSettled: () => xr({ immediate: !0 }),
            })),
              (_e = !0));
            try {
              for (; e === We && Ne.open && Xe.length && Re.available; ) {
                const t = Nr();
                if (!t.length) break;
                await Re.run(
                  t,
                  (n) => Ir(t, { generation: e, lease: n }),
                  () => e === We && Ne.open && !re,
                );
              }
            } finally {
              e === We && ((_e = !1), Xe.length && xr());
            }
          })());
      },
      t ? 0 : 2e3,
    );
  }
  function $r() {
    He && (window.clearTimeout(He), (He = null));
  }
  function Nr() {
    if (kr()) {
      const e = Pe.take(Xe, Ne.items, oa, 650);
      for (const e of Ne.items) e.translationClosed && Ye.delete(e.key);
      return e;
    }
    const e = [];
    let t = 0;
    for (; Xe.length && e.length < 12; ) {
      const n = Xe.shift();
      if (!n || !Ne.items.some((e) => e.id === n.id)) {
        n?.key && Ye.delete(n.key);
        continue;
      }
      const r = oa(n);
      if (e.length && t + r > 650) {
        Xe.unshift(n);
        break;
      }
      (e.push(n), (t += r));
    }
    return e;
  }
  async function Ir(e = [], t = {}) {
    const n = Number.isFinite(Number(t.generation)) ? Number(t.generation) : We;
    if (n !== We) return;
    const r = e.filter((e) => e && Ne.items.some((t) => t.id === e.id));
    if (r.length) {
      for (const e of r) e.status = "translating";
      ((Ne.status = `批次翻譯 ${r.length} 則聊天室留言中...`),
        (Ne.error = ""),
        Yr());
      try {
        const e = (function (e = []) {
            const t = e
                .map((e, t) => ({
                  id: String(t + 1),
                  author: to(e.author || ""),
                  text: to(e.text || ""),
                }))
                .filter((e) => e.text),
              n = t.reduce((e, t) => e + oa(t), 0);
            return {
              text: JSON.stringify(t),
              sourceLang: ua(ke.sourceLang || "auto", "auto", { keepAuto: !0 }),
              targetLang: ua(ke.targetLang || "zh", "zh", {
                keepTraditionalChinese: !0,
              }),
              mode: "live-chat-batch",
              provider: la(),
              forceTargetLang: !0,
              isFinal: !0,
              maxOriginalChars: 850,
              maxSegments: t.length,
              maxOutputTokens: Math.min(
                900,
                Math.max(240, 160 + 45 * t.length + Math.ceil(0.9 * n)),
              ),
              segmentationPreference: "sentence",
              latencyMode: "tight",
              translationDeadlineMs: 1e4,
              sttElapsedMs: 0,
              estimatedTranslationLatencyMs: 2200,
              translationStyle:
                'Translate each live chat item independently for a viewer. Input is a JSON array with id, author, text. Return only valid minified JSON array, no markdown, in the same order: [{"id":"1","translation":"translated message"}]. Preserve every id, names, emoji, memes, numbers, and tone. Do not merge, summarize, omit, or answer messages.',
            };
          })(r),
          a = await Br(e, {
            requestIsCurrent: () =>
              !1 !== t.lease?.isCurrent() && r.some((e) => kr()?.eligible(e)),
            onDispatched: () => {
              t.lease && (t.lease.dispatched = !0);
            },
          });
        if (n !== We) return;
        if (
          ((async function (e = {}, t = 0) {
            return Fr(e, "live-chat", "chat-batch", t);
          })(a, r.length).catch(() => {}),
          !1 === t.lease?.isCurrent() && !t.lease.dispatched)
        )
          return;
        const o = (function (e, t = []) {
          const n = (function (e) {
              const t = to(e);
              if (!t) return [];
              const n = (function (e) {
                const t = e
                    .replace(/^```(?:json)?\s*/i, "")
                    .replace(/\s*```$/i, "")
                    .trim(),
                  n = t.indexOf("["),
                  r = t.lastIndexOf("]");
                return n < 0 || r <= n ? "" : t.slice(n, r + 1);
              })(t);
              if (n)
                try {
                  const e = JSON.parse(n);
                  if (Array.isArray(e)) return e;
                  if (Array.isArray(e?.translations)) return e.translations;
                  if (Array.isArray(e?.items)) return e.items;
                  if (Array.isArray(e?.results)) return e.results;
                } catch {}
              return (function (e) {
                return e
                  .split(/\s*(?:\n|(?=\[\d+\])|(?=\d+[.)、：:]))\s*/)
                  .map((e) => e.trim())
                  .filter(Boolean)
                  .map((e) => {
                    const t = e.match(/^(?:\[(\d+)\]|(\d+)[.)、：:])\s*(.+)$/);
                    return t
                      ? { id: t[1] || t[2], translation: to(t[3]) }
                      : null;
                  })
                  .filter(Boolean);
              })(t);
            })(
              to(
                e?.segments
                  ?.map((e) => e.translation)
                  .filter(Boolean)
                  .join(" ") ||
                  e?.translatedText ||
                  e?.translation ||
                  e?.text ||
                  "",
              ),
            ),
            r = new Map(),
            a = new Map();
          return (
            n.forEach((e, t) => {
              if ("string" == typeof e) return void a.set(t, to(e));
              if (!e || "object" != typeof e) return;
              const n = to(
                  e.translation || e.translatedText || e.text || e.value || "",
                ),
                o = to(e.id || e.index || e.number || "");
              (o && r.set(o, n), a.set(t, n));
            }),
            t.map((e, t) => r.get(String(t + 1)) || a.get(t) || "")
          );
        })(a, r);
        for (let e = 0; e < r.length; e += 1) {
          const n = r[e];
          if (!Ne.items.includes(n)) continue;
          const a = to(o[e]);
          (kr()
            ? Pe.accept(n, a, { dispatched: !0 === t.lease?.dispatched })
            : ((n.translation = a), (n.status = a ? "done" : "error")),
            Ye.delete(n.key));
        }
        ((Ne.status = `已翻譯 ${Ne.items.filter((e) => "done" === e.status).length} 則留言`),
          ea());
      } catch (e) {
        if (n !== We) return;
        if (!1 === t.lease?.isCurrent()) return;
        for (const e of r)
          (SubruuLiveChat.expireTranslation(e, "request-failed"),
            Ye.delete(e.key));
        ((Ne.status = e.message || "聊天室翻譯失敗"), (Ne.error = Ne.status));
      } finally {
        n === We && Yr();
      }
    }
  }
  function Ar() {
    const e = Ue;
    ((Ue = null),
      e &&
        e
          .close()
          .catch(() =>
            console.warn("[mirror-viewer] 互動翻譯授權停止尚未確認"),
          ));
  }
  async function Br(e, t = {}) {
    const sessionId = o, generation = We;
    if (!globalThis.SubruuWalletInteractions)
      throw new Error("請重新載入插件後再使用互動翻譯。");
    Ue ||= globalThis.SubruuWalletInteractions.create();
    const result = await Ue.translate({
      sessionId,
      isCurrent: () => !re && o === sessionId && We === generation && (e.mode === "reply" ? Ie.open : Ne.open),
      requestIsCurrent: t.requestIsCurrent,
      onDispatched: t.onDispatched,
    }, e);
    De = globalThis.SubruuWalletInteractions.usageSnapshot(result.billing, De);
    Ca(De);
    return result;
  }
  async function Pr() {
    throw new Error("舊版遠端服務已停用，翻譯請求由背景服務處理。");
  }
  async function Fr(e = {}, t = "panel", n = "", r = 0) {
    if (["sql-wallet-v1", "textamisu"].includes(e.billingProtocol)) return;
    if (!o) return;
    const a = e?.usage || {},
      i = fa(a, [
        "inputTokens",
        "input_tokens",
        "promptTokens",
        "prompt_tokens",
      ]),
      s = fa(a, [
        "visibleOutputTokens",
        "visible_output_tokens",
        "candidatesTokenCount",
      ]),
      l = fa(a, ["thinkingTokens", "thinking_tokens", "thoughtsTokenCount"]),
      u =
        fa(a, [
          "outputTokens",
          "output_tokens",
          "completionTokens",
          "completion_tokens",
        ]) || s + l,
      c = fa(a, ["totalTokens", "total_tokens"]) || i + u;
    if (c <= 0 && i <= 0 && u <= 0) return;
    const d = e?.pricing || {},
      m = Math.min(
        i,
        fa(a, [
          "cachedInputTokens",
          "cached_input_tokens",
          "cachedPromptTokens",
          "cached_prompt_tokens",
        ]),
      ),
      f = (function (e, t, n, r = {}) {
        const a = Number(r.inputPerMillion || 0),
          o =
            Number(
              r.cachedInputPerMillion ??
                r.cacheReadPerMillion ??
                r.cacheHitPerMillion ??
                a,
            ) || 0,
          i =
            Number(
              r.cacheWriteInputPerMillion ??
                r.cacheCreateInputPerMillion ??
                r.cacheWritePerMillion ??
                a,
            ) || 0,
          s = Math.max(0, Number(e) || 0),
          l = Math.min(s, Math.max(0, Number(t) || 0)),
          u = Math.min(Math.max(0, s - l), Math.max(0, Number(n) || 0));
        return ha(Math.max(0, s - l - u), a) + ha(l, o) + ha(u, i);
      })(
        i,
        m,
        Math.min(
          Math.max(0, i - m),
          fa(a, [
            "cacheWriteInputTokens",
            "cache_write_input_tokens",
            "cacheCreationInputTokens",
            "cache_creation_input_tokens",
          ]),
        ),
        d,
      ),
      h = ha(u, d.outputPerMillion),
      p = ha(s || u, d.outputPerMillion),
      g = ha(l, d.outputPerMillion),
      y = fa(a, ["costUSD", "cost_usd", "cost"]) || f + h,
      S = to(e?.fallbackFromProvider || ""),
      b = {
        deltaAudioMs: 0,
        totalAudioMs: 0,
        audioChunks: 0,
        usageCategory: t,
        llm: {
          deltaInputTokens: i,
          deltaOutputTokens: u,
          deltaVisibleOutputTokens: s || (l ? 0 : u),
          deltaThinkingTokens: l,
          deltaTotalTokens: c,
          deltaCallCount: 1,
          deltaCostUSD: pa(y),
          deltaInputCostUSD: pa(f),
          deltaOutputCostUSD: pa(h),
          deltaVisibleOutputCostUSD: pa(p),
          deltaThinkingCostUSD: pa(g),
          deltaFallbackCount: S ? 1 : 0,
          provider: to(e?.provider || ""),
          providerName: to(e?.providerName || e?.provider || ""),
          fallbackFromProvider: S,
          fallbackProvider: to(e?.provider || ""),
          fallbackReason: to(e?.fallbackReason || ""),
          purpose: n,
          itemCount: Math.max(0, Math.round(Number(r) || 0)),
        },
      },
      v = (function (e = {}) {
        const t = pa(e.deltaCostUSD);
        return {
          creditsUsed: ga(t),
          totalCostUSD: t,
          totalTokens: Math.max(0, Math.round(Number(e.deltaTotalTokens) || 0)),
          inputTokens: Math.max(0, Math.round(Number(e.deltaInputTokens) || 0)),
          outputTokens: Math.max(
            0,
            Math.round(Number(e.deltaOutputTokens) || 0),
          ),
          visibleOutputTokens: Math.max(
            0,
            Math.round(Number(e.deltaVisibleOutputTokens) || 0),
          ),
          thinkingTokens: Math.max(
            0,
            Math.round(Number(e.deltaThinkingTokens) || 0),
          ),
          llmCallCount: Math.max(0, Math.round(Number(e.deltaCallCount) || 0)),
          llmFallbackCount: Math.max(
            0,
            Math.round(Number(e.deltaFallbackCount) || 0),
          ),
          inputCostUSD: pa(e.deltaInputCostUSD),
          outputCostUSD: pa(e.deltaOutputCostUSD),
          visibleOutputCostUSD: pa(e.deltaVisibleOutputCostUSD),
          thinkingCostUSD: pa(e.deltaThinkingCostUSD),
          provider: to(e.provider || ""),
          providerName: to(e.providerName || e.provider || ""),
          fallbackFromProvider: to(e.fallbackFromProvider || ""),
          fallbackProvider: to(e.fallbackProvider || ""),
          fallbackReason: to(e.fallbackReason || ""),
          itemCount: Math.max(0, Math.round(Number(e.itemCount) || 0)),
          updatedAt: new Date().toISOString(),
        };
      })(b.llm);
    ("live-chat" === t && (b.liveChatUsage = v),
      "reply" === t && (b.replyUsage = v));
    const w = await (async function (e = {}) {
      if (!o) return !1;
      const t = await chrome.runtime.sendMessage({
        type: "LIVE_SUBTITLE_PANEL_USAGE_DELTA",
        sessionId: o,
        usage: e,
      });
      return Boolean(t?.ok && !t.ignored);
    })(b).catch(() => !1);
    w ||
      (function (e = {}) {
        ((Ke = _r(Ke, e)),
          ze ||
            (ze = window.setInterval(() => {
              Hr().catch((e) => {
                console.warn(
                  "[mirror-viewer] panel usage heartbeat failed:",
                  e.message,
                );
              });
            }, 1e4)));
      })(b);
  }
  function Or() {
    ze && (window.clearInterval(ze), (ze = null));
  }
  async function Hr() {
    if (je || !Ke || !o) return !1;
    je = !0;
    const e = Ke;
    Ke = null;
    try {
      return (
        await (async function (e = {}) {
          const t = ca(ke.backendUrl || c),
            n = await Pr();
          await da(
            `${t}/caption-sessions/${encodeURIComponent(o)}/usage`,
            {
              method: "POST",
              headers: n,
              body: JSON.stringify({ usage: e, final: !1 }),
            },
            5e3,
          );
        })(e),
        Ke || Or(),
        !0
      );
    } catch (t) {
      throw ((Ke = _r(e, Ke)), t);
    } finally {
      je = !1;
    }
  }
  function _r(e = null, t = null) {
    const n = qr(e),
      r = qr(t);
    return {
      deltaAudioMs: 0,
      totalAudioMs: 0,
      audioChunks: 0,
      usageCategory: r.usageCategory || n.usageCategory,
      llm: zr(n.llm, r.llm),
      liveChatUsage: Vr(n.liveChatUsage, r.liveChatUsage),
      replyUsage: Vr(n.replyUsage, r.replyUsage),
    };
  }
  function qr(e = {}) {
    const t = e && "object" == typeof e ? e : {},
      n = t.llm && "object" == typeof t.llm ? t.llm : {};
    return {
      deltaAudioMs: 0,
      totalAudioMs: 0,
      audioChunks: 0,
      usageCategory: to(t.usageCategory || ""),
      llm: {
        deltaInputTokens: Ba(n.deltaInputTokens),
        deltaOutputTokens: Ba(n.deltaOutputTokens),
        deltaVisibleOutputTokens: Ba(n.deltaVisibleOutputTokens),
        deltaThinkingTokens: Ba(n.deltaThinkingTokens),
        deltaTotalTokens: Ba(n.deltaTotalTokens),
        deltaCallCount: Ba(n.deltaCallCount),
        deltaCostUSD: pa(n.deltaCostUSD),
        deltaInputCostUSD: pa(n.deltaInputCostUSD),
        deltaOutputCostUSD: pa(n.deltaOutputCostUSD),
        deltaVisibleOutputCostUSD: pa(n.deltaVisibleOutputCostUSD),
        deltaThinkingCostUSD: pa(n.deltaThinkingCostUSD),
        deltaFallbackCount: Ba(n.deltaFallbackCount),
        provider: to(n.provider || ""),
        providerName: to(n.providerName || ""),
        fallbackFromProvider: to(n.fallbackFromProvider || ""),
        fallbackProvider: to(n.fallbackProvider || ""),
        fallbackReason: to(n.fallbackReason || ""),
        purpose: to(n.purpose || ""),
        itemCount: Ba(n.itemCount),
      },
      liveChatUsage: Wr(t.liveChatUsage || t.chatUsage || t.liveChat),
      replyUsage: Wr(t.replyUsage || t.reply),
    };
  }
  function Wr(e = {}) {
    const t = e && "object" == typeof e ? e : {};
    return {
      creditsUsed: Ba(t.creditsUsed || t.credits),
      totalCostUSD: pa(t.totalCostUSD || t.costUSD || t.deltaCostUSD),
      totalTokens: Ba(t.totalTokens || t.deltaTotalTokens),
      inputTokens: Ba(t.inputTokens || t.deltaInputTokens),
      outputTokens: Ba(t.outputTokens || t.deltaOutputTokens),
      visibleOutputTokens: Ba(
        t.visibleOutputTokens || t.deltaVisibleOutputTokens,
      ),
      thinkingTokens: Ba(t.thinkingTokens || t.deltaThinkingTokens),
      llmCallCount: Ba(t.llmCallCount || t.deltaCallCount),
      llmFallbackCount: Ba(t.llmFallbackCount || t.deltaFallbackCount),
      inputCostUSD: pa(t.inputCostUSD || t.deltaInputCostUSD),
      outputCostUSD: pa(t.outputCostUSD || t.deltaOutputCostUSD),
      visibleOutputCostUSD: pa(
        t.visibleOutputCostUSD || t.deltaVisibleOutputCostUSD,
      ),
      thinkingCostUSD: pa(t.thinkingCostUSD || t.deltaThinkingCostUSD),
      itemCount: Ba(t.itemCount),
      updatedAt: to(t.updatedAt || ""),
    };
  }
  function zr(e = {}, t = {}) {
    return {
      deltaInputTokens: Ba(e.deltaInputTokens) + Ba(t.deltaInputTokens),
      deltaOutputTokens: Ba(e.deltaOutputTokens) + Ba(t.deltaOutputTokens),
      deltaVisibleOutputTokens:
        Ba(e.deltaVisibleOutputTokens) + Ba(t.deltaVisibleOutputTokens),
      deltaThinkingTokens:
        Ba(e.deltaThinkingTokens) + Ba(t.deltaThinkingTokens),
      deltaTotalTokens: Ba(e.deltaTotalTokens) + Ba(t.deltaTotalTokens),
      deltaCallCount: Ba(e.deltaCallCount) + Ba(t.deltaCallCount),
      deltaCostUSD: pa(
        Number(e.deltaCostUSD || 0) + Number(t.deltaCostUSD || 0),
      ),
      deltaInputCostUSD: pa(
        Number(e.deltaInputCostUSD || 0) + Number(t.deltaInputCostUSD || 0),
      ),
      deltaOutputCostUSD: pa(
        Number(e.deltaOutputCostUSD || 0) + Number(t.deltaOutputCostUSD || 0),
      ),
      deltaVisibleOutputCostUSD: pa(
        Number(e.deltaVisibleOutputCostUSD || 0) +
          Number(t.deltaVisibleOutputCostUSD || 0),
      ),
      deltaThinkingCostUSD: pa(
        Number(e.deltaThinkingCostUSD || 0) +
          Number(t.deltaThinkingCostUSD || 0),
      ),
      deltaFallbackCount: Ba(e.deltaFallbackCount) + Ba(t.deltaFallbackCount),
      provider: to(t.provider || e.provider || ""),
      providerName: to(t.providerName || e.providerName || ""),
      fallbackFromProvider: to(
        t.fallbackFromProvider || e.fallbackFromProvider || "",
      ),
      fallbackProvider: to(t.fallbackProvider || e.fallbackProvider || ""),
      fallbackReason: to(t.fallbackReason || e.fallbackReason || ""),
      purpose: to(t.purpose || e.purpose || ""),
      itemCount: Ba(e.itemCount) + Ba(t.itemCount),
    };
  }
  function Vr(e = {}, t = {}) {
    return {
      creditsUsed: Ba(e.creditsUsed) + Ba(t.creditsUsed),
      totalCostUSD: pa(
        Number(e.totalCostUSD || 0) + Number(t.totalCostUSD || 0),
      ),
      totalTokens: Ba(e.totalTokens) + Ba(t.totalTokens),
      inputTokens: Ba(e.inputTokens) + Ba(t.inputTokens),
      outputTokens: Ba(e.outputTokens) + Ba(t.outputTokens),
      visibleOutputTokens:
        Ba(e.visibleOutputTokens) + Ba(t.visibleOutputTokens),
      thinkingTokens: Ba(e.thinkingTokens) + Ba(t.thinkingTokens),
      llmCallCount: Ba(e.llmCallCount) + Ba(t.llmCallCount),
      llmFallbackCount: Ba(e.llmFallbackCount) + Ba(t.llmFallbackCount),
      inputCostUSD: pa(
        Number(e.inputCostUSD || 0) + Number(t.inputCostUSD || 0),
      ),
      outputCostUSD: pa(
        Number(e.outputCostUSD || 0) + Number(t.outputCostUSD || 0),
      ),
      visibleOutputCostUSD: pa(
        Number(e.visibleOutputCostUSD || 0) +
          Number(t.visibleOutputCostUSD || 0),
      ),
      thinkingCostUSD: pa(
        Number(e.thinkingCostUSD || 0) + Number(t.thinkingCostUSD || 0),
      ),
      itemCount: Ba(e.itemCount) + Ba(t.itemCount),
      updatedAt: t.updatedAt || e.updatedAt || "",
    };
  }
  function jr() {
    (S.replyPanel.classList.toggle("busy", Ie.busy),
      S.replyPanel.classList.toggle("error", Boolean(Ie.error)),
      S.replyInput.value !== Ie.text &&
        document.activeElement !== S.replyInput &&
        (S.replyInput.value = Ie.text),
      (S.replyOutput.textContent = Ie.translation || "翻譯結果會顯示在這裡"),
      (S.replyStatus.textContent = Ie.status || "輸入文字後翻譯成創作者語言"));
    const e = Jr();
    ((S.replyTarget.textContent = `目標語言：${Gr(e)} (${e})`),
      (S.replyTranslate.disabled = Ie.busy || !to(Ie.text)),
      (S.replyTranslate.textContent = Ie.busy ? "翻譯中" : "翻譯"),
      (S.replyCopy.disabled = Ie.busy || !to(Ie.translation)),
      S.replySend &&
        ((S.replySend.disabled =
          Ie.busy ||
          Ie.sending ||
          !to(Ie.text) ||
          (Ie.lastSentSession === o && Ie.lastSentText === Ie.text)),
        (S.replySend.textContent = Ie.sending ? "處理中…" : "翻譯並送出")),
      Ie.sending &&
        ((S.replyTranslate.disabled = !0), (S.replyCopy.disabled = !0)),
      (S.replyInput.readOnly = Boolean(Ie.sending)));
  }
  async function Kr() {
    const e = {
      text: to(Ie.text),
      sourceLang: ua(ke.targetLang || "zh", "zh", {
        keepTraditionalChinese: !0,
      }),
      targetLang: Jr(),
      mode: "reply",
      provider: la(),
      forceTargetLang: !0,
      isFinal: !0,
      maxOriginalChars: 500,
      maxSegments: 1,
      segmentationPreference: "sentence",
      latencyMode: "tight",
      translationDeadlineMs: 8e3,
      sttElapsedMs: 0,
      estimatedTranslationLatencyMs: 1800,
      translationStyle:
        "Translate this live chat reply naturally and briefly for the streamer. Return only the translated message.",
    };
    if (!e.text) throw new Error("請先輸入要回覆的內容。");
    ((Ie.busy = !0),
      (Ie.error = ""),
      (Ie.status = `翻譯成 ${Gr(e.targetLang)} 中...`),
      jr());
    try {
      const t = await Br(e);
      (async function (e = {}) {
        return Fr(e, "reply", "reply", 1);
      })(t).catch(() => {});
      const n = (function (e) {
        return to(
          e?.segments
            ?.map((e) => e.translation)
            .filter(Boolean)
            .join(" ") ||
            e?.translatedText ||
            e?.translation ||
            e?.text ||
            "",
        );
      })(t);
      if (!n) throw new Error("翻譯結果為空，請稍後再試。");
      return (
        (Ie.translation = n),
        (Ie.status = `已翻譯成 ${Gr(e.targetLang)}，可複製到聊天室。`),
        (Ie.busy = !1),
        (Ie.error = ""),
        jr(),
        n
      );
    } catch (e) {
      throw (
        (Ie.busy = !1),
        (Ie.error = e.message || "翻譯失敗"),
        (Ie.status = Ie.error),
        jr(),
        e
      );
    }
  }
  function Jr() {
    const configured = ua(ke.sourceLang || "", "", { keepAuto: !0 });
    if (configured && configured !== "auto") return configured;
    const detected = ua(ke.detectedSourceLang || ke.lastDetectedSourceLang || "", "", { keepAuto: !0 });
    return detected && detected !== "auto" ? detected : "auto";
  }
  function Gr(e) {
    return y[e] || e || "-";
  }
  function Yr() {
    (S.chatPanel.classList.toggle("open", Ne.open),
      S.chatPanel.classList.toggle("error", Boolean(Ne.error)),
      (S.chatStatus.textContent = `精選翻譯 · ${Ne.status || `等待 ${ia()} 聊天室留言...`}`),
      Xr());
  }
  function Xr() {
    const e = Qr(),
      t = e[e.length - 1]?.id || "",
      n = S.chatList.dataset.lastId !== t,
      r = S.chatList.scrollTop,
      a = Ne.items.filter((e) => e && !Zr(e)).length,
      o = n && (Ne.autoScroll || na()),
      i =
        e
          .map((e) =>
            JSON.stringify([
              e.id,
              e.status,
              e.translation,
              e.author,
              e.authorMeta,
            ]),
          )
          .join("|") + `|empty-pending:${e.length ? 0 : a}`;
    if (S.chatList.dataset.signature === i)
      return (o && ta({ force: !0 }), void ra());
    if (
      ((S.chatList.dataset.signature = i),
      (S.chatList.dataset.lastId = t),
      e.length && globalThis.SubruuLiveChat?.reconcileMessageElements)
    )
      return (
        SubruuLiveChat.reconcileMessageElements(S.chatList, e, () => {
          Ne.autoScroll && ta({ force: !0 });
        }),
        (Ne.autoScroll || o) && ta({ force: !0 }),
        void ra()
      );
    if ((S.chatList.replaceChildren(), !e.length)) {
      const e = document.createElement("div");
      e.className = "live-chat-item pending";
      const t = document.createElement("p");
      return (
        (t.className = "live-chat-translation"),
        (t.textContent =
          a > 0
            ? `翻譯中 ${Ra(a)} 則聊天室留言...`
            : `等待 ${ia()} 聊天室留言...`),
        e.appendChild(t),
        S.chatList.appendChild(e),
        o && ta({ force: !0 }),
        void ra()
      );
    }
    for (const t of e) {
      if (globalThis.SubruuLiveChat?.createMessageElement) {
        S.chatList.appendChild(
          SubruuLiveChat.createMessageElement(document, t, () => {
            o && ta({ force: !0 });
          }),
        );
        continue;
      }
      const e = document.createElement("section");
      e.className = [
        "live-chat-item",
        "error" === t.status ? "error" : "",
        "pending" === t.status || "translating" === t.status ? "pending" : "",
      ]
        .filter(Boolean)
        .join(" ");
      const n = document.createElement("div");
      ((n.className = "live-chat-author"),
        (n.textContent = t.author || ia()),
        (n.title = t.author || ""),
        (n.dir = "auto"));
      const r = document.createElement("p");
      ((r.className = "live-chat-original"),
        globalThis.SubruuLiveChat
          ? SubruuLiveChat.renderParts(r, t.parts, t.text, () =>
              ta({ force: !0 }),
            )
          : (r.textContent = t.text));
      const a = document.createElement("p");
      ((a.className = "live-chat-translation"),
        (a.textContent = t.translation || "翻譯中..."),
        e.append(n, r),
        t.imageOnly || e.appendChild(a),
        S.chatList.appendChild(e));
    }
    (o ? ta({ force: !0 }) : (S.chatList.scrollTop = r), ra());
  }
  function Qr() {
    return kr()
      ? Pe.display(Ne.items, 50)
      : globalThis.SubruuLiveChat?.displayReadyItems
        ? SubruuLiveChat.displayReadyItems(Ne.items, 50)
        : Ne.items.filter((e) => Zr(e)).slice(-50);
  }
  function Zr(e = {}) {
    return Number.isFinite(e.dueTimeMs)
      ? Boolean(e.presented || e.translationClosed || "done" === e.status)
      : "error" === e.status ||
          !(!e.imageOnly || "done" !== e.status) ||
          (!!to(e.translation) &&
            ("done" === e.status || "error" === e.status));
  }
  function ea() {
    if (Ne.items.length <= 180) return;
    const e = Qr(),
      t = new Set(e.map((e) => e.id)),
      n = Ne.items.filter((e) => e && !t.has(e.id) && !e.omitted),
      r = Math.max(0, 180 - e.length),
      a = r ? n.slice(-r) : [],
      o = new Set([...e, ...a].map((e) => e.id)),
      i = Ne.items.filter((e) => !o.has(e.id));
    for (const e of i) e?.key && Ye.delete(e.key);
    for (let e = Xe.length - 1; e >= 0; e -= 1)
      i.some((t) => t.id === Xe[e]?.id) && Xe.splice(e, 1);
    Ne.items = Ne.items.filter((e) => o.has(e.id));
  }
  function ta(e = {}) {
    e.force || Ne.autoScroll
      ? ((S.chatList.scrollTop = Math.max(
          0,
          S.chatList.scrollHeight - S.chatList.clientHeight,
        )),
        globalThis.SubruuLiveChat?.followBottom(S.chatList),
        (Ne.autoScroll = !0),
        ra())
      : ra();
  }
  function na() {
    const e = Math.max(0, Number(S.chatList.scrollHeight) || 0),
      t = Math.max(0, Number(S.chatList.clientHeight) || 0);
    return (
      e <= t + 24 ||
      e - t - Math.max(0, Number(S.chatList.scrollTop) || 0) <= 24
    );
  }
  function ra() {
    const e = Qr().length > 0,
      t = na();
    ((S.chatBottom.hidden = !e || t), (S.chatBottom.disabled = !e || t));
  }
  function aa(e = {}) {
    const t = Pa(e.sourceMessageId || e.messageId || "");
    if (t) return `id:${Pa(e.platform || "unknown") || "unknown"}:${t}`;
    const n = Pa(e.author || ""),
      r = Pa(e.text || ""),
      a = (e.parts || [])
        .filter((e) => "image" === e.type)
        .map((e) => e.src)
        .join("|");
    return r ? `${n}:${r}${a ? ":" + a : ""}` : "";
  }
  function oa(e = {}) {
    return Array.from(`${e.author || ""} ${e.text || ""}`).length;
  }
  function ia() {
    const e = String(ke.videoPlatform || ke.platform || "")
      .toLowerCase()
      .trim();
    return "instagram" === e
      ? "Instagram"
      : "twitch" === e
        ? "Twitch"
        : "youtube" === e
          ? "YouTube"
          : "直播";
  }
  function sa(e = {}) {
    (Re?.cancel(),
      Pe?.reset(),
      Ar(),
      (We += 1),
      $r(),
      (Xe.length = 0),
      Ge.clear(),
      Ye.clear(),
      (qe = 0),
      (_e = !1),
      (Oe = !1),
      !1 !== e.clearItems && (Ne.items = []),
      (Ne.status = "按「聊」後開始翻譯直播聊天室"),
      (Ne.error = ""),
      (Ne.autoScroll = !0));
  }
  function la() {
    return (
      to(ke?.interactionProvider || ke?.fastProvider || ke?.provider) || "lt-a"
    );
  }
  function ua(e, t = "", n = {}) {
    const r = String(e || "")
      .toLowerCase()
      .trim();
    return r
      ? n.keepAuto && "auto" === r
        ? "auto"
        : n.keepTraditionalChinese &&
            ["zh", "zh-hant", "zh-tw", "traditional-chinese"].includes(r)
          ? "zh"
          : ["zh-hant", "zh-tw", "traditional-chinese"].includes(r)
            ? "zho"
            : g[r] || r || t
      : t;
  }
  function ca(e) {
    const t = String(e || "")
      .trim()
      .replace(/\/+$/, "");
    if (!t) throw new Error("後端 URL 未設定。");
    return t.startsWith("http://") || t.startsWith("https://")
      ? t
      : `https://${t}`;
  }
  async function da(e, t = {}, n = 15e3) {
    const r = new AbortController(),
      a = window.setTimeout(() => r.abort(), n);
    try {
      const n = await fetch(e, { ...t, signal: r.signal }),
        a = await n.json().catch(() => ({}));
      if (!n.ok) {
        const e = new Error(a.error || `後端請求失敗 ${n.status}`);
        throw ((e.status = n.status), (e.response = a), e);
      }
      return a;
    } catch (e) {
      if ("AbortError" === e?.name) {
        const e = new Error(`翻譯逾時（${Math.round(n / 1e3)}s）`);
        throw ((e.status = 504), e);
      }
      if (e instanceof TypeError) {
        const e = new Error(
          "後端連線失敗，請檢查後端 URL、VPN 或 Cloud Run 狀態。",
        );
        throw ((e.status = 0), e);
      }
      throw e;
    } finally {
      window.clearTimeout(a);
    }
  }
  function ma(e, t, n = null) {
    let r = !1,
      a = null;
    return new Promise((o) => {
      ((a = window.setTimeout(() => {
        ((r = !0), o(n));
      }, t)),
        Promise.resolve(e)
          .then((e) => {
            r || o(e);
          })
          .catch(() => {
            r || o(n);
          })
          .finally(() => {
            a && window.clearTimeout(a);
          }));
    });
  }
  function fa(e, t = []) {
    for (const n of t) {
      const t = Number(e?.[n]);
      if (Number.isFinite(t) && t > 0) return t;
    }
    return 0;
  }
  function ha(e, t) {
    const n = Number(e) || 0,
      r = Number(t) || 0;
    return n <= 0 || r <= 0 ? 0 : (n * r) / 1e6;
  }
  function pa(e) {
    const t = Number(e);
    return !Number.isFinite(t) || t <= 0 ? 0 : Math.round(1e9 * t) / 1e9;
  }
  function ga(e) {
    const t = Math.max(0, Number(e) || 0);
    return t > 0 ? Math.ceil(1e5 * t) : 0;
  }
  function ya(e = {}) {
    const t = (t, n = 0) => Math.max(0, Number(e?.[t] ?? n) || 0),
      n = (t, n = 0) => Math.max(0, Math.round(Number(e?.[t] ?? n) || 0)),
      r = t("sttDurationSeconds", e.audioSeconds),
      a = Math.max(
        r,
        t(
          "sttRawDurationSeconds",
          e.rawSttDurationSeconds || e.originalAudioSeconds,
        ),
      ),
      o = [1.5, 2].includes(Number(e.sttAudioSpeed || e.audioSpeed))
        ? Number(e.sttAudioSpeed || e.audioSpeed)
        : 1,
      i = Math.max(a, t("capturedAudioSeconds", e.captureAudioSeconds)),
      s = t("fallbackCostUSD", e.llmFallbackCostUSD),
      l = n("providerErrorRescueCount", e.llmProviderErrorRescueCount),
      u = n(
        "deadlineRescueCount",
        e.llmDeadlineRescueCount ||
          e.totalDeadlineRescueCount ||
          (l ? 0 : e.llmFallbackCount),
      );
    return {
      creditsUsed: n("creditsUsed"),
      totalCostUSD: t("totalCostUSD"),
      billingProtocol:
        "sql-wallet-v1" === e.billingProtocol ? "sql-wallet-v1" : "",
      billingSessionId: to(e.billingSessionId || ""),
      billingRevision: Number.isSafeInteger(e.billingRevision)
        ? e.billingRevision
        : -1,
      fundingWallet: to(e.fundingWallet || ""),
      passCreditsUsed: n("passCreditsUsed"),
      passCallCount: n("passCallCount"),
      passAudioSeconds: t("passAudioSeconds"),
      generalCreditsUsed: n("generalCreditsUsed"),
      economyCreditsUsed: n("economyCreditsUsed"),
      elapsedSeconds: t(
        "sessionElapsedSeconds",
        e.elapsedSeconds || e.openSeconds,
      ),
      sttDurationSeconds: r,
      sttRawDurationSeconds: a,
      sttAudioSpeed: o,
      sttSpeedSavedAudioSeconds: t(
        "sttSpeedSavedAudioSeconds",
        Math.max(0, a - r),
      ),
      capturedAudioSeconds: i,
      vadSkippedAudioSeconds: t("vadSkippedAudioSeconds", Math.max(0, i - a)),
      vadEnabled: Boolean(e.vadEnabled),
      sttCostUSD: t("sttCostUSD"),
      localSttAudioSeconds: t("localSttAudioSeconds"),
      sttUsageSource:
        "local-reported" === e.sttUsageSource ? "local-reported" : "",
      llmCostUSD: t("llmCostUSD"),
      totalTokens: n("totalTokens"),
      inputTokens: n("inputTokens"),
      outputTokens: n("outputTokens"),
      visibleOutputTokens: n(
        "visibleOutputTokens",
        e.thinkingTokens ? 0 : e.outputTokens,
      ),
      thinkingTokens: n("thinkingTokens"),
      llmCallCount: n("llmCallCount"),
      llmFallbackCount: n("llmFallbackCount", e.fallbackCount),
      inputCostUSD: t("inputCostUSD"),
      outputCostUSD: t("outputCostUSD"),
      visibleOutputCostUSD: t(
        "visibleOutputCostUSD",
        e.thinkingCostUSD ? 0 : e.outputCostUSD,
      ),
      thinkingCostUSD: t("thinkingCostUSD"),
      fallbackCostUSD: s,
      deadlineRescueCount: u,
      deadlineRescueCostUSD: t(
        "deadlineRescueCostUSD",
        e.llmDeadlineRescueCostUSD || s,
      ),
      providerErrorRescueCount: l,
      providerErrorRescueCostUSD: t(
        "providerErrorRescueCostUSD",
        e.llmProviderErrorRescueCostUSD,
      ),
      provider: to(e.provider || ""),
      providerName: to(e.providerName || ""),
      source: to(e.source || "local-estimate"),
      updatedAt: to(e.updatedAt || ""),
      batch: ba(e.finalBatch || e.batch || {}),
      pipeline: va(e.subtitlePipeline || e.pipelineStats || e.pipeline || {}),
      latency: wa(e.latency || e.pipelineLatency || e),
      liveChatUsage: Sa(e.liveChatUsage || e.chatUsage || e.liveChat || {}),
      replyUsage: Sa(e.replyUsage || e.reply || {}),
    };
  }
  function Sa(e = {}) {
    const t = Math.max(
        0,
        Number(e.totalCostUSD || e.costUSD || e.deltaCostUSD) || 0,
      ),
      n = Math.max(
        0,
        Math.round(Number(e.totalTokens || e.deltaTotalTokens) || 0),
      );
    return {
      creditsUsed: Math.max(
        0,
        Math.ceil(Number(e.creditsUsed || e.credits) || ga(t)),
      ),
      totalCostUSD: t,
      totalTokens: n,
      llmCallCount: Math.max(
        0,
        Math.round(Number(e.llmCallCount || e.deltaCallCount) || 0),
      ),
      itemCount: Math.max(0, Math.round(Number(e.itemCount) || 0)),
    };
  }
  function ba(e = {}) {
    return {
      enabled: Boolean(e.enabled),
      segmentsSent: Math.max(
        0,
        Math.round(Number(e.segmentsSent || e.translatedSegments) || 0),
      ),
      batchesSent: Math.max(
        0,
        Math.round(Number(e.batchesSent || e.callsSent) || 0),
      ),
      savedCalls: Math.max(0, Math.round(Number(e.savedCalls) || 0)),
      pendingSegments: Math.max(
        0,
        Math.round(Number(e.pendingSegments || e.queuedSegments) || 0),
      ),
      averageSegmentsPerCall: Math.max(
        0,
        Number(e.averageSegmentsPerCall) || 0,
      ),
      targetWaitMs: Math.max(0, Number(e.targetWaitMs) || 0),
      lastWaitMs: Math.max(0, Number(e.lastWaitMs) || 0),
    };
  }
  function va(e = {}) {
    return {
      finalTranscripts: Math.max(
        0,
        Math.round(Number(e.finalTranscripts) || 0),
      ),
      translationRequests: Math.max(
        0,
        Math.round(Number(e.translationRequests) || 0),
      ),
      translationResponses: Math.max(
        0,
        Math.round(Number(e.translationResponses) || 0),
      ),
      emittedSegments: Math.max(0, Math.round(Number(e.emittedSegments) || 0)),
      translationErrors: Math.max(
        0,
        Math.round(Number(e.translationErrors) || 0),
      ),
      fallbackDisplayedSegments: Math.max(
        0,
        Math.round(Number(e.fallbackDisplayedSegments) || 0),
      ),
    };
  }
  function wa(e = {}) {
    const t = (...t) => {
        for (const n of t) {
          const t = ao(e?.[n]);
          if (null !== t) return Math.max(0, t);
        }
        return null;
      },
      n = {
        totalMs: t("totalMs", "pipelineLatencyMs", "latencyMs"),
        sttMs: t("sttMs", "sttLatencyMs"),
        queueMs: t("queueMs", "translationQueueMs"),
        llmMs: t("llmMs", "translationLatencyMs"),
        sttFromAudioEndMs: t("sttFromAudioEndMs"),
      };
    return Object.values(n).some((e) => null !== e) ? n : null;
  }
  function Ma(e = null, t = {}) {
    const n = ya(e || {}),
      r = ya(t || {});
    if (
      n.billingSessionId &&
      r.billingSessionId &&
      n.billingSessionId !== r.billingSessionId
    )
      return r;
    if ("sql-wallet-v1" === r.billingProtocol)
      return "sql-wallet-v1" === n.billingProtocol &&
        n.billingSessionId === r.billingSessionId &&
        n.billingRevision > r.billingRevision
        ? n
        : r;
    if ("sql-wallet-v1" === n.billingProtocol) return n;
    const a = [
        "creditsUsed",
        "totalCostUSD",
        "elapsedSeconds",
        "sttDurationSeconds",
        "sttRawDurationSeconds",
        "sttSpeedSavedAudioSeconds",
        "capturedAudioSeconds",
        "vadSkippedAudioSeconds",
        "sttCostUSD",
        "llmCostUSD",
        "totalTokens",
        "inputTokens",
        "outputTokens",
        "visibleOutputTokens",
        "thinkingTokens",
        "llmCallCount",
        "llmFallbackCount",
        "inputCostUSD",
        "outputCostUSD",
        "visibleOutputCostUSD",
        "thinkingCostUSD",
        "fallbackCostUSD",
        "deadlineRescueCount",
        "deadlineRescueCostUSD",
        "providerErrorRescueCount",
        "providerErrorRescueCostUSD",
      ],
      o = { ...n, ...r };
    for (const e of a) o[e] = Math.max(n[e] || 0, r[e] || 0);
    return (
      (o.vadEnabled = n.vadEnabled || r.vadEnabled),
      (o.provider = r.provider || n.provider),
      (o.providerName = r.providerName || n.providerName),
      (o.source = r.source || n.source),
      (o.updatedAt = r.updatedAt || n.updatedAt),
      (o.batch = Ta(n.batch, r.batch)),
      (o.pipeline = Ta(n.pipeline, r.pipeline)),
      (o.liveChatUsage = Ta(n.liveChatUsage, r.liveChatUsage)),
      (o.replyUsage = Ta(n.replyUsage, r.replyUsage)),
      (o.latency = r.latency || n.latency),
      (o.creditsUsed = Math.max(o.creditsUsed, ga(o.totalCostUSD))),
      o
    );
  }
  function Ta(e = {}, t = {}) {
    const n = { ...e, ...t };
    for (const r of new Set([
      ...Object.keys(e || {}),
      ...Object.keys(t || {}),
    ])) {
      const a = ao(e?.[r]),
        o = ao(t?.[r]);
      (null === a && null === o) || (n[r] = Math.max(a || 0, o || 0));
    }
    return n;
  }
  function Ca(e = De) {
    if (!xe && globalThis.SubruuCaptionBalance) xe = SubruuCaptionBalance.createMonitor();
    xe?.update({ root: S.panel, config: ke, sessionId: o, active: !re && !Je });
    const usage = e || ya();
    if (S.quota) {
      S.quota.textContent = xe?.summary() || "Textamisu 額度讀取中";
      S.quota.title = "音訊：" + Na(usage.sttDurationSeconds) + "／延遲：" + xa(usage.latency);
      S.quota.classList.remove("active");
    }
    globalThis.SubruuCaptionBalance?.renderMetrics(S.usagePanel, S.usageFields, {
      elapsed: Na(usage.elapsedSeconds), stt: Na(usage.sttDurationSeconds),
      vad: usage.vadEnabled ? "省 " + Na(usage.vadSkippedAudioSeconds) : "off",
      batch: Da(usage.batch), pipeline: Ua(usage.pipeline), subtitleBuffer: "未播 " + Ra(te.length) + " 段／已顯示 " + Ra(Ce.length) + " 段",
      latency: xa(usage.latency), provider: "Textamisu", source: "Textamisu API",
    });
  }

  function ka(e = {}) {
    const t = [`${Ra(e.creditsUsed)} credits`, $a(e.totalCostUSD)];
    return (
      e.totalTokens && t.push(`${Ra(e.totalTokens)} tokens`),
      e.llmCallCount && t.push(`${Ra(e.llmCallCount)} calls`),
      e.itemCount && t.push(`${Ra(e.itemCount)} 則`),
      t.join(" / ")
    );
  }
  function La(e, t) {
    return `${Ra(e)} tokens / ${$a(t)} / ${Ra(ga(t))} credits`;
  }
  function Ea(e = {}) {
    if ("local-reported" === e.sttUsageSource)
      return `${Na(e.localSttAudioSeconds)} 本機${e.sttDurationSeconds > 0 ? ` / 雲端 ${Na(e.sttDurationSeconds)}` : ""}`;
    const t = Na(e.sttDurationSeconds);
    return !e.sttAudioSpeed || e.sttAudioSpeed <= 1
      ? t
      : `${t} billed / raw ${Na(e.sttRawDurationSeconds)} / ${e.sttAudioSpeed}x / 省 ${Na(e.sttSpeedSavedAudioSeconds)}`;
  }
  function Da(e = {}) {
    if (!e.enabled && !e.segmentsSent && !e.pendingSegments) return "off";
    const t = [
      `${Ra(e.segmentsSent)} seg`,
      `${Ra(e.batchesSent)} calls`,
      `saved ${Ra(e.savedCalls)}`,
    ];
    return (
      e.averageSegmentsPerCall &&
        t.push(`avg ${e.averageSegmentsPerCall.toFixed(1)}`),
      e.pendingSegments && t.push(`pending ${Ra(e.pendingSegments)}`),
      e.targetWaitMs && t.push(`window ${Ia(e.targetWaitMs / 1e3)}`),
      e.lastWaitMs && t.push(`wait ${Ia(e.lastWaitMs / 1e3)}`),
      t.join(" / ")
    );
  }
  function Ua(e = {}) {
    if (!e.finalTranscripts && !e.translationRequests && !e.emittedSegments)
      return "等待樣本";
    const t = [
      `STT ${Ra(e.finalTranscripts)}`,
      `LLM ${Ra(e.translationResponses)}/${Ra(e.translationRequests)}`,
      `seg ${Ra(e.emittedSegments)}`,
    ];
    return (
      e.fallbackDisplayedSegments &&
        t.push(`fallback ${Ra(e.fallbackDisplayedSegments)}`),
      e.translationErrors && t.push(`err ${Ra(e.translationErrors)}`),
      t.join(" / ")
    );
  }
  function xa(e = null) {
    if (!e) return "等待樣本";
    const t = [];
    return (
      null !== e.totalMs && t.push(`total ${Ia(e.totalMs / 1e3)}`),
      null !== e.sttMs && t.push(`STT ${Ia(e.sttMs / 1e3)}`),
      null !== e.llmMs && t.push(`LLM ${Ia(e.llmMs / 1e3)}`),
      null !== e.queueMs &&
        e.queueMs >= 100 &&
        t.push(`queue ${Ia(e.queueMs / 1e3)}`),
      null !== e.sttFromAudioEndMs &&
        t.push(`STT-end ${Ia(e.sttFromAudioEndMs / 1e3)}`),
      t.join(" / ") || "等待樣本"
    );
  }
  function $a(e) {
    const t = Math.max(0, Number(e) || 0);
    return t > 0 ? `$${t.toFixed(6)}` : "$0";
  }
  function Na(e) {
    const t = Math.max(0, Math.round(Number(e) || 0)),
      n = Math.floor(t / 60),
      r = t % 60;
    return n ? `${n}m ${String(r).padStart(2, "0")}s` : `${r}s`;
  }
  function Ia(e) {
    const t = Math.max(0, Number(e) || 0);
    return t < 1
      ? `${Math.round(1e3 * t)}ms`
      : t < 10
        ? `${t.toFixed(1)}s`
        : Na(t);
  }
  function Aa(e) {
    const t = new Date(e);
    return Number.isNaN(t.getTime())
      ? ""
      : t.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
  }
  function Ba(e) {
    const t = Number(e);
    return !Number.isFinite(t) || t <= 0 ? 0 : Math.round(t);
  }
  function Pa(e) {
    return to(e).toLowerCase().replace(/\s+/g, "");
  }
  function Ra(e) {
    const t = Number(e);
    return Number.isFinite(t) ? Math.round(t).toLocaleString("en-US") : "0";
  }
  function Fa(e, t, n, r) {
    ((S.interactionPanel.style.left = `${Math.round(e)}px`),
      (S.interactionPanel.style.top = `${Math.round(t)}px`),
      (S.interactionPanel.style.right = "auto"),
      (S.interactionPanel.style.bottom = "auto"),
      (S.interactionPanel.style.width = `${Math.round(n)}px`),
      (S.interactionPanel.style.height = `${Math.round(r)}px`));
  }
  function Oa() {
    const e = S.interactionPanel.getBoundingClientRect();
    (($e.interactionLayout = {
      left: Math.round(e.left),
      top: Math.round(e.top),
      width: Math.round(e.width),
      height: Math.round(e.height),
    }),
      _a());
  }
  function Ha() {
    if (
      (S.panel.style.setProperty("--subtitle-font-size", `${$e.fontSize}px`),
      S.panel.style.setProperty("--subtitle-font-family", za($e.fontFamily)),
      S.panel.style.setProperty("--subtitle-opacity", String($e.opacity)),
      S.panel.style.setProperty(
        "--subtitle-original-scale",
        $e.equalBilingualFontSize ? "1" : "0.62",
      ),
      S.panel.style.setProperty(
        "--subtitle-original-single-scale",
        $e.equalBilingualFontSize ? "0.86" : "0.5",
      ),
      S.panel.style.setProperty(
        "--subtitle-original-large-scale",
        $e.equalBilingualFontSize ? "0.7" : "0.46",
      ),
      S.panel.style.setProperty("--subtitle-original-color", $e.originalColor),
      S.panel.style.setProperty(
        "--subtitle-translation-color",
        $e.translationColor,
      ),
      S.panel.classList.toggle("original-only", "original" === $e.mode),
      S.panel.classList.toggle("translation-only", "translation" === $e.mode),
      S.panel.classList.toggle("large-mode", "large" === $e.mode),
      S.panel.classList.toggle("side-mode", "side" === $e.mode),
      S.panel.classList.toggle("collapsed", $e.collapsed),
      S.panel.classList.toggle("transparent-mode", $e.opacity <= 0.02),
      S.panel.classList.toggle("usage-open", $e.usagePanelOpen),
      S.panel.classList.toggle("settings-open", $e.settingsPanelOpen),
      (S.mode.textContent = h[$e.mode] || h.dual),
      (S.collapse.textContent = $e.collapsed ? "+" : "-"),
      (S.collapse.title = $e.collapsed ? "展開字幕匡" : "縮小字幕匡"),
      S.collapse.setAttribute("aria-label", S.collapse.title),
      S.fontSizeDisplay &&
        (S.fontSizeDisplay.textContent = String($e.fontSize)),
      S.quota &&
        S.quota.setAttribute("aria-expanded", String($e.usagePanelOpen)),
      S.settingsToggle &&
        (S.settingsToggle.setAttribute(
          "aria-expanded",
          String($e.settingsPanelOpen),
        ),
        S.settingsToggle.classList.toggle(
          "toggle-active",
          $e.settingsPanelOpen,
        )),
      S.transparent)
    ) {
      const e = $e.opacity <= 0.02;
      (S.transparent.classList.toggle("toggle-active", e),
        S.transparent.setAttribute("aria-pressed", String(e)),
        (S.transparent.title = e
          ? "關閉透明模式"
          : "透明模式：滑鼠移開只留字幕"));
    }
    if ($e.interactionLayout) {
      const e = Ka($e.interactionLayout);
      Fa(e.left, e.top, e.width, e.height);
    }
    if ($e.panelLayout) {
      const e = Ja($e.panelLayout);
      Ga(e.left, e.top, e.width, e.height);
    }
    const e = Ce[Ce.length - 1];
    ("large" === $e.mode || "side" === $e.mode
      ? S.panel.classList.remove("subtitle-fading")
      : e &&
        S.panel.classList.toggle(
          "subtitle-fading",
          Date.now() - e.renderedAtMs >= Sr(e.original, e.translation),
        ),
      (function () {
        for (const e of S.settingsControls || []) {
          const t = e.dataset.settings;
          ("mode" === t && (e.value = $e.mode),
            "fontSize" === t && (e.value = String($e.fontSize)),
            "fontFamily" === t && (e.value = $e.fontFamily),
            "equalBilingualFontSize" === t &&
              (e.checked = $e.equalBilingualFontSize),
            "opacity" === t && (e.value = String($e.opacity)),
            "originalColor" === t && (e.value = $e.originalColor),
            "translationColor" === t && (e.value = $e.translationColor));
        }
        for (const e of S.settingsValues || []) {
          const t = e.dataset.settingsValue;
          ("fontSize" === t && (e.textContent = `${$e.fontSize} px`),
            "opacity" === t &&
              (e.textContent = `${Math.round(100 * $e.opacity)}%`),
            "originalColor" === t && (e.textContent = $e.originalColor),
            "translationColor" === t && (e.textContent = $e.translationColor));
        }
        S.fontPreview && (S.fontPreview.style.fontFamily = za($e.fontFamily));
      })(),
      Ca(),
      yr(),
      Mr());
  }
  function _a() {
    try {
      localStorage.setItem("mirrorViewerUi", JSON.stringify($e));
    } catch {}
    (async function () {
      if (!chrome.storage?.local) return;
      const e = await chrome.storage.local.get(d),
        t = e?.[d] && "object" == typeof e[d] ? e[d] : {};
      await chrome.storage.local.set({
        [d]: {
          ...t,
          overlayMode: $e.mode,
          overlayFontSize: $e.fontSize,
          overlayFontFamily: $e.fontFamily,
          overlayEqualBilingualFontSize: $e.equalBilingualFontSize,
          overlayOpacity: $e.opacity,
          overlayOriginalColor: $e.originalColor,
          overlayTranslationColor: $e.translationColor,
          overlayAppearanceUpdatedAt: new Date().toISOString(),
        },
      });
    })().catch(() => {});
  }
  function qa(e, t) {
    const n = String(e || "").trim();
    return /^#[0-9a-f]{6}$/i.test(n) ? n.toLowerCase() : t;
  }
  function Wa(e) {
    const t = String(e || "system")
      .toLowerCase()
      .trim();
    return Object.prototype.hasOwnProperty.call(p, t) ? t : "system";
  }
  function za(e) {
    return p[Wa(e)] || p.system;
  }
  function Va(e = {}) {
    if (!e || "object" != typeof e) return !1;
    if (
      ![
        "overlayMode",
        "overlayFontSize",
        "overlayFontFamily",
        "overlayEqualBilingualFontSize",
        "overlayOpacity",
        "overlayOriginalColor",
        "overlayTranslationColor",
      ].some((t) => Object.prototype.hasOwnProperty.call(e, t))
    )
      return !1;
    (($e.mode = f.includes(e.overlayMode) ? e.overlayMode : $e.mode),
      ($e.fontSize = oo(e.overlayFontSize ?? $e.fontSize, 18, 84)),
      ($e.fontFamily = Wa(e.overlayFontFamily ?? $e.fontFamily)),
      Object.prototype.hasOwnProperty.call(
        e,
        "overlayEqualBilingualFontSize",
      ) &&
        ($e.equalBilingualFontSize = Boolean(e.overlayEqualBilingualFontSize)),
      ($e.opacity = oo(e.overlayOpacity ?? $e.opacity, 0, 0.98)),
      ($e.originalColor = qa(e.overlayOriginalColor, $e.originalColor)),
      ($e.translationColor = qa(
        e.overlayTranslationColor,
        $e.translationColor,
      )));
    try {
      localStorage.setItem("mirrorViewerUi", JSON.stringify($e));
    } catch {}
    return !0;
  }
  function ja(e) {
    const t = e.dataset.settings;
    ("mode" === t && ($e.mode = f.includes(e.value) ? e.value : "dual"),
      "fontSize" === t && ($e.fontSize = oo(e.value, 18, 84)),
      "fontFamily" === t && ($e.fontFamily = Wa(e.value)),
      "equalBilingualFontSize" === t &&
        ($e.equalBilingualFontSize = Boolean(e.checked)),
      "opacity" === t && ($e.opacity = oo(e.value, 0, 0.98)),
      "originalColor" === t && ($e.originalColor = qa(e.value, "#d8e2f2")),
      "translationColor" === t &&
        ($e.translationColor = qa(e.value, "#ffffff")),
      _a(),
      Ha());
  }
  function Ka(e = {}) {
    const t = oo(e.width || 390, 320, Math.max(320, window.innerWidth - 16)),
      n = oo(e.height || 560, 300, Math.max(300, window.innerHeight - 16));
    return {
      left: oo(
        e.left ?? window.innerWidth - t - 14,
        8,
        Math.max(8, window.innerWidth - t - 8),
      ),
      top: oo(e.top ?? 70, 8, Math.max(8, window.innerHeight - n - 8)),
      width: t,
      height: n,
    };
  }
  function Ja(e = {}) {
    const t = oo(e.width || 720, 220, Math.max(220, window.innerWidth - 16)),
      n = oo(e.height || 132, 82, Math.max(82, window.innerHeight - 16));
    return {
      left: oo(
        e.left ?? (window.innerWidth - t) / 2,
        8,
        Math.max(8, window.innerWidth - t - 8),
      ),
      top: oo(
        e.top ?? window.innerHeight - n - 28,
        8,
        Math.max(8, window.innerHeight - n - 8),
      ),
      width: t,
      height: n,
    };
  }
  function Ga(e, t, n, r) {
    ((S.panel.style.left = `${Math.round(e)}px`),
      (S.panel.style.top = `${Math.round(t)}px`),
      (S.panel.style.bottom = "auto"),
      (S.panel.style.width = `${Math.round(n)}px`),
      (S.panel.style.height = `${Math.round(r)}px`),
      (S.panel.style.transform = "none"),
      br());
  }
  function Ya() {
    const e = S.panel.getBoundingClientRect();
    (($e.panelLayout = {
      left: Math.round(e.left),
      top: Math.round(e.top),
      width: Math.round(e.width),
      height: Math.round(e.height),
    }),
      _a());
  }
  function Xa(e, t = "media") {
    ("pipeline" === t
      ? (Ee = e || "")
      : (Le = e || or("鏡像延遲中", "Mirror delay active")),
      (S.status.textContent = [Le, Ee].filter(Boolean).join(" · ")),
      Ce.length || yr());
  }
  function Qa() {
    const e = ot() ? "HLS " : it() ? or("原生 ", "Native ") : "";
    (S.panel.dataset &&
      (S.panel.dataset.delayLabel = `${e}${or("延遲", "Delay")} ${so(s)}`),
      Ca(De));
  }
  function Za() {
    (xe?.stop(),
      I && (window.clearTimeout(I), (I = null)),
      (A = null),
      (B = !1),
      (D = ""),
      (U = ""),
      (x = ""));
    for (const e of X.keys()) window.clearTimeout(e);
    (X.clear(), me && (window.clearTimeout(me), (me = null)));
    for (const e of Z) window.clearTimeout(e);
    if (
      (Z.clear(),
      Te && (window.clearTimeout(Te), (Te = null)),
      gr(),
      (G = []),
      (Y = null),
      (te = []),
      we.clear(),
      (Me = null),
      Q.clear(),
      hn(),
      Qe(),
      (q = Yt()),
      Hr().catch(() => {}),
      Or(),
      Ve && (window.clearInterval(Ve), (Ve = null)),
      J)
    ) {
      try {
        J.close();
      } catch {}
      J = null;
    }
    (Cr(), sa());
  }
  function eo(e = "") {
    const t = String(e || "").toLowerCase();
    return "dash" === t ||
      /\.mpd(?:$|[?#])/.test(t) ||
      t.includes("dash_manifest") ||
      /\/dash(?:[/?#]|$)/.test(t)
      ? "dash"
      : "hls" === t || /\.m3u8(?:$|[?#])/.test(t) || t.includes("m3u8")
        ? "hls"
        : ("mp4" === t || /\.(?:mp4|m4v|mov)(?:$|[?#])/.test(t), "mp4");
  }
  function to(e) {
    return String(e || "")
      .replace(/\s+/g, " ")
      .trim();
  }
  function no(e) {
    const t = atob(e),
      n = new Uint8Array(t.length);
    for (let e = 0; e < t.length; e += 1) n[e] = t.charCodeAt(e);
    return n.buffer;
  }
  function ro(...e) {
    for (const t of e) {
      const e = ao(t);
      if (null !== e) return e;
    }
    return null;
  }
  function ao(e) {
    if (null == e || "" === e) return null;
    const t = Number(e);
    return Number.isFinite(t) ? t : null;
  }
  function oo(e, t, n) {
    const r = Number(e);
    return Number.isFinite(r) ? Math.min(Math.max(r, t), n) : t;
  }
  function io(e) {
    const t = Math.max(0, Number(e) || 0);
    return `${(t / 1e3).toFixed(t >= 9500 ? 0 : 1)}s`;
  }
  function so(e) {
    const t = Number(e);
    return Number.isFinite(t)
      ? Number.isInteger(t)
        ? `${t}s`
        : `${t.toFixed(1)}s`
      : "0s";
  }
  globalThis.__LIVE_SUBTITLE_MIRROR_VIEWER_TEST__
    ? (globalThis.__liveSubtitleMirrorViewerTest = {
        buildInstagramDashViewerPoolKey: Xt,
        fetchNativeStreamResourceDirect: _t,
        fetchNativeStreamResourceViaServiceWorker: qt,
        fetchNativeStreamResourceWithFallback: Ht,
        getInstagramDashViewerPoolEntry: Qt,
        clearTimers: Za,
        handleInstagramNativePlaybackUpdate: gt,
        handleTwitchHlsPlaybackUpdate: ht,
        isDirectNativeFetchUrl: Vt,
        requestInstagramNativeCandidateRefresh: Wt,
        requestTwitchOriginalHlsCandidateRefresh: zt,
        normalizeNativeFetchRequestHeaders: Jt,
        putInstagramDashViewerPoolEntry: Zt,
        resolveNativeStreamResourceUrl: Kt,
        applyLiveSubtitleConfigUpdate: at,
        setCurrentNativeStream: yt,
        setNativeStreamResourceBaseUrl: jt,
        normalizeInstagramNativePlaybackUpdate: pt,
        normalizeTwitchHlsPlaybackUpdate: ct,
        resolveInstagramDashPlaybackBufferGoalSeconds: wt,
        resolveNativePlaybackBufferTargetSeconds: En,
        isSubtitleCueDue: mr,
        buildSubtitleDisplayTelemetry: dr,
        finiteNumberOrNull: ao,
        shouldStoreInstagramDashViewerPoolEntry: nn,
        summarizeInstagramDashViewerBufferPool: rn,
        getBufferedAheadAtTime: Dn,
        resolveMirrorPlaybackBufferTargetMs: zn,
        getTargetPlaybackBufferMs: Vn,
        getMirrorChunkReleaseDelayMs: jn,
        getResumeBufferMs: Jn,
        getLowBufferWarningMs: Gn,
        getMirrorFullscreenElement: Ze,
        isMirrorShellFullscreen: et,
        syncMirrorFullscreenState: nt,
        toggleMirrorFullscreen: tt,
        resolveMirrorStartupPlayableRange: Qn,
        shouldTreatMirrorWaitingAsUnderrun: Xn,
        getMirrorBufferDebugState: () => er(),
        getMirrorStartupWaitingSubtitleForTest: ar,
        setMirrorStartupProgressForTest: (e = 0) => rr(e),
        resetMirrorStartupProgressForTest: nr,
        resolveMirrorBufferTrimRange: _n,
        ensureNativeStreamDelayGate: wn,
        tickNativeStreamDelayGate: Ln,
        startNativeRebufferGate: Tn,
        tickNativeRebufferGate: Cn,
        requestTwitchHlsPlayback: Nn,
        resetVideoElementForNativePlayback: pn,
        getNativeStartupDebugState: () => ({
          prepared: F,
          gateActive: Boolean(R),
          rebufferGateActive: Boolean(H),
          playbackStarted: ae,
          playbackStartRequested: oe,
        }),
        setNativeStartupGateElapsedForTest: (e = 0) => {
          R && (R.startedAtMs = Date.now() - 1e3 * Math.max(0, Number(e) || 0));
        },
        setPlaybackStartedForTest: (e) => {
          ae = Boolean(e);
        },
        liveChatMessageKey: aa,
        enqueueLiveChatMessage: Ur,
        resetMirrorLiveChatState: sa,
        getLiveChatDebugState: () => ({
          items: Ne.items.map((e) => ({ ...e })),
          seenCount: Ge.size,
          pendingCount: Ye.size,
          queueLength: Xe.length,
        }),
        video: S.video,
      })
    : (ir(),
      Ha(),
      Qa(),
      Ca(),
      yr(),
      window.MediaSource
        ? ((b = new MediaSource()),
          b.addEventListener("sourceopen", Fn),
          (S.video.autoplay = !1),
          (v = URL.createObjectURL(b)),
          (S.video.src = v),
          S.shell.classList.add("waiting"))
        : Xa("此 Chrome 不支援 MediaSource，無法播放鏡像延遲畫面。"),
      (function () {
        try {
          S.video.controlsList?.add?.("nofullscreen");
        } catch {}
        (S.fullscreen?.addEventListener("click", () => {
          tt().catch((e) => {
            Xa(
              or(
                `無法切換全螢幕：${String(e?.message || e || "未知錯誤")}`,
                `Unable to toggle fullscreen: ${String(e?.message || e || "unknown error")}`,
              ),
            );
          });
        }),
          S.video.addEventListener("dblclick", (e) => {
            (e.preventDefault(), e.stopPropagation(), tt().catch(() => {}));
          }),
          document.addEventListener("fullscreenchange", nt),
          document.addEventListener("webkitfullscreenchange", nt),
          nt());
      })(),
      S.stop.addEventListener("click", () => {
        ((re = !0),
          chrome.runtime
            .sendMessage({ type: "STOP_LIVE_SUBTITLE" })
            .catch(() => {}),
          Xa("已停止"),
          wr(),
          Za());
      }),
      S.quota.addEventListener("click", () => {
        (($e.usagePanelOpen = !$e.usagePanelOpen),
          $e.usagePanelOpen && ($e.settingsPanelOpen = !1),
          _a(),
          Ha());
      }),
      S.settingsToggle.addEventListener("click", () => {
        (($e.settingsPanelOpen = !$e.settingsPanelOpen),
          $e.settingsPanelOpen && ($e.usagePanelOpen = !1),
          _a(),
          Ha());
      }),
      S.settingsReset.addEventListener("click", () => {
        (($e.mode = "dual"),
          ($e.fontSize = 28),
          ($e.fontFamily = "system"),
          ($e.equalBilingualFontSize = !1),
          ($e.opacity = 0.94),
          ($e.originalColor = "#d8e2f2"),
          ($e.translationColor = "#ffffff"),
          _a(),
          Ha());
      }),
      S.fontDown.addEventListener("click", () => {
        (($e.fontSize = oo($e.fontSize - 2, 18, 84)), _a(), Ha());
      }),
      S.fontUp.addEventListener("click", () => {
        (($e.fontSize = oo($e.fontSize + 2, 18, 84)), _a(), Ha());
      }),
      S.opacity.addEventListener("click", () => {
        (($e.opacity = (function (e) {
          const t = [0.98, 0.94, 0.86, 0.72],
            n = oo(Number(e), 0, 0.98),
            r = t.findIndex((e) => Math.abs(e - n) <= 0.035);
          return r >= 0
            ? t[(r + 1) % t.length]
            : n <= 0.02
              ? 0.94
              : n < 0.92
                ? 0.98
                : 0.86;
        })($e.opacity)),
          _a(),
          Ha());
      }),
      S.transparent.addEventListener("click", () => {
        (($e.opacity = $e.opacity <= 0.02 ? 0.94 : 0), _a(), Ha());
      }),
      S.mode.addEventListener("click", () => {
        (($e.mode = (function (e) {
          const t = f.indexOf(e);
          return f[(t + 1) % f.length] || "dual";
        })($e.mode)),
          _a(),
          Ha());
      }),
      S.chatToggle.addEventListener("click", () => {
        vr(!Ne.open);
      }),
      S.replyToggle.addEventListener("click", () => {
        !(function (e, t = {}) {
          ((Ie.open = Boolean(e)),
            Ie.open && !Ne.open && (Ne.open = !0),
            jr(),
            Yr(),
            Mr(),
            Ne.open && Tr(),
            Ie.open &&
              t.focus &&
              window.setTimeout(() => S.replyInput.focus(), 0));
        })(!Ie.open, { focus: !0 });
      }),
      S.collapse.addEventListener("click", () => {
        (($e.collapsed = !$e.collapsed), _a(), Ha());
      }),
      S.toolbar.addEventListener("pointerdown", function (e) {
        if (0 !== e.button || e.target.closest("button")) return;
        e.preventDefault();
        const t = S.panel.getBoundingClientRect(),
          n = e.clientX - t.left,
          r = e.clientY - t.top;
        (S.toolbar.setPointerCapture?.(e.pointerId),
          Ga(t.left, t.top, t.width, t.height));
        const a = (e) => {
            Ga(
              oo(e.clientX - n, 8, window.innerWidth - t.width - 8),
              oo(e.clientY - r, 8, window.innerHeight - t.height - 8),
              t.width,
              t.height,
            );
          },
          o = () => {
            (S.toolbar.removeEventListener("pointermove", a),
              S.toolbar.removeEventListener("pointerup", o),
              S.toolbar.removeEventListener("pointercancel", o),
              Ya());
          };
        (S.toolbar.addEventListener("pointermove", a),
          S.toolbar.addEventListener("pointerup", o, { once: !0 }),
          S.toolbar.addEventListener("pointercancel", o, { once: !0 }));
      }),
      S.resize.addEventListener("pointerdown", function (e) {
        if (0 !== e.button) return;
        e.preventDefault();
        const t = S.panel.getBoundingClientRect(),
          n = e.clientX,
          r = e.clientY;
        (S.resize.setPointerCapture?.(e.pointerId),
          Ga(t.left, t.top, t.width, t.height));
        const a = (e) => {
            const a = oo(
                t.width + e.clientX - n,
                260,
                window.innerWidth - t.left - 8,
              ),
              o = oo(
                t.height + e.clientY - r,
                82,
                window.innerHeight - t.top - 8,
              );
            Ga(t.left, t.top, a, o);
          },
          o = () => {
            (S.resize.removeEventListener("pointermove", a),
              S.resize.removeEventListener("pointerup", o),
              S.resize.removeEventListener("pointercancel", o),
              Ya());
          };
        (S.resize.addEventListener("pointermove", a),
          S.resize.addEventListener("pointerup", o, { once: !0 }),
          S.resize.addEventListener("pointercancel", o, { once: !0 }));
      }),
      S.chatClose.addEventListener("click", wr),
      S.chatBottom.addEventListener("click", function () {
        ((Ne.autoScroll = !0), ta({ force: !0 }));
      }),
      S.chatList.addEventListener(
        "scroll",
        function () {
          ((Ne.autoScroll = na()), ra());
        },
        { passive: !0 },
      ),
      S.chatList.addEventListener("wheel", (e) => e.stopPropagation(), {
        passive: !0,
      }),
      S.interactionHeader.addEventListener("pointerdown", function (e) {
        if (0 !== e.button || e.target.closest("button, textarea, input"))
          return;
        e.preventDefault();
        const t = S.interactionPanel.getBoundingClientRect(),
          n = e.clientX - t.left,
          r = e.clientY - t.top;
        (S.interactionHeader.setPointerCapture?.(e.pointerId),
          Fa(t.left, t.top, t.width, t.height));
        const a = (e) => {
            Fa(
              oo(e.clientX - n, 8, window.innerWidth - t.width - 8),
              oo(e.clientY - r, 8, window.innerHeight - t.height - 8),
              t.width,
              t.height,
            );
          },
          o = () => {
            (S.interactionHeader.removeEventListener("pointermove", a),
              S.interactionHeader.removeEventListener("pointerup", o),
              S.interactionHeader.removeEventListener("pointercancel", o),
              Oa());
          };
        (S.interactionHeader.addEventListener("pointermove", a),
          S.interactionHeader.addEventListener("pointerup", o, { once: !0 }),
          S.interactionHeader.addEventListener("pointercancel", o, {
            once: !0,
          }));
      }),
      S.interactionResize.addEventListener("pointerdown", function (e) {
        if (0 !== e.button) return;
        e.preventDefault();
        const t = S.interactionPanel.getBoundingClientRect(),
          n = e.clientX,
          r = e.clientY;
        (S.interactionResize.setPointerCapture?.(e.pointerId),
          Fa(t.left, t.top, t.width, t.height));
        const a = (e) => {
            const a = oo(
                t.width + e.clientX - n,
                320,
                window.innerWidth - t.left - 8,
              ),
              o = oo(
                t.height + e.clientY - r,
                300,
                window.innerHeight - t.top - 8,
              );
            Fa(t.left, t.top, a, o);
          },
          o = () => {
            (S.interactionResize.removeEventListener("pointermove", a),
              S.interactionResize.removeEventListener("pointerup", o),
              S.interactionResize.removeEventListener("pointercancel", o),
              Oa());
          };
        (S.interactionResize.addEventListener("pointermove", a),
          S.interactionResize.addEventListener("pointerup", o, { once: !0 }),
          S.interactionResize.addEventListener("pointercancel", o, {
            once: !0,
          }));
      }),
      (function () {
        for (const e of S.settingsControls || []) {
          const t =
            "range" === e.type || "color" === e.type ? "input" : "change";
          e.addEventListener(t, () => ja(e));
        }
        S.settingsPanel.addEventListener("pointerdown", (e) =>
          e.stopPropagation(),
        );
      })(),
      S.replyInput.addEventListener("input", () => {
        ((Ie.text = S.replyInput.value),
          (Ie.error = ""),
          Ie.translation && !Ie.busy && (Ie.status = "內容已修改，請重新翻譯"),
          jr());
      }),
      S.replyInput.addEventListener("keydown", (e) => {
        Ie.sending ||
          ((e.metaKey || e.ctrlKey) &&
            "Enter" === e.key &&
            (e.preventDefault(),
            Kr().catch((e) => {
              ((Ie.busy = !1),
                (Ie.error = e.message || "翻譯失敗"),
                (Ie.status = Ie.error),
                jr());
            })));
      }),
      S.replyTranslate.addEventListener("click", () => {
        Ie.sending ||
          Kr().catch((e) => {
            ((Ie.busy = !1),
              (Ie.error = e.message || "翻譯失敗"),
              (Ie.status = Ie.error),
              jr());
          });
      }),
      S.replyCopy.addEventListener("click", () => {
        (async function () {
          const e = to(Ie.translation);
          if (!e) throw new Error("目前沒有可複製的翻譯。");
          if (!navigator.clipboard?.writeText)
            throw new Error("此頁面無法使用剪貼簿 API。");
          (await navigator.clipboard.writeText(e),
            (Ie.status = "已複製翻譯。"),
            (Ie.error = ""),
            jr());
        })().catch((e) => {
          ((Ie.error = e.message || "複製失敗"), (Ie.status = Ie.error), jr());
        });
      }),
      S.replySend?.addEventListener("click", (e) => {
        e.isTrusted &&
          (async function () {
            if (
              Ie.busy ||
              Ie.sending ||
              (Ie.lastSentSession === o && Ie.lastSentText === Ie.text)
            )
              return;
            const e = o,
              t = We,
              n = Ie.text,
              r = () => !re && o === e && We === t && Ie.open && Ie.text === n;
            ((Ie.sending = !0), (Ie.error = ""), jr());
            try {
              (await SubruuLiveChat.translateAndSend({
                sessionId: e,
                isCurrent: r,
                translate: Kr,
                sendMessage: (e) => chrome.runtime.sendMessage(e),
              }),
                r() &&
                  ((Ie.lastSentText = n),
                  (Ie.lastSentSession = e),
                  (Ie.status = "已送交原聊天室，請以原聊天室的顯示為準。")));
            } catch (t) {
              r() &&
                (t.uncertain &&
                  ((Ie.lastSentText = n), (Ie.lastSentSession = e)),
                (Ie.error = t.message),
                (Ie.status = t.message));
            } finally {
              ((Ie.sending = !1), (Ie.busy = !1), jr());
            }
          })();
      }),
      S.video.addEventListener("playing", () => {
        const e = ae;
        if (
          (me && (window.clearTimeout(me), (me = null)),
          !st() && ie && Yn() < Jn())
        ) {
          oe = !1;
          try {
            S.video.pause();
          } catch {}
          return void Xa(sr("鏡像正在重新累積穩定緩衝"));
        }
        const t = se ? Math.max(0, Date.now() - se) : 0,
          n = le ? Math.max(0, Date.now() - le) : 0,
          r = !st() && t > 0;
        (kn({ keepPaused: !0 }),
          rr(s, s),
          (ae = !0),
          (F = !0),
          (oe = !1),
          (ie = !1),
          (se = 0),
          (le = 0),
          S.shell.classList.remove("waiting"));
        const a =
          S.video.videoWidth && S.video.videoHeight
            ? ` · ${S.video.videoWidth}x${S.video.videoHeight}`
            : "";
        st()
          ? Xa(`${lt()} 播放中 · 固定延遲 ${so(s)}${a}`)
          : (!e || r
              ? tr(
                  r ? "mirror.playback.resumed" : "mirror.playback.started",
                  { stallDurationMs: t },
                  { force: !0 },
                )
              : n > 0 &&
                tr(
                  "mirror.playback.decoder_resumed",
                  { decoderWaitDurationMs: n },
                  { force: !0 },
                ),
            Xa(`播放鏡像延遲中${a}`));
      }),
      S.video.addEventListener("pause", () => {
        st() || !ae || ie || Wn();
      }),
      S.video.addEventListener("play", () => {
        if (st()) {
          if (H) {
            try {
              S.video.pause();
            } catch {}
            return void Cn();
          }
          if (R && !R.readyToPlay) {
            try {
              S.video.pause();
            } catch {}
            Ln();
          }
          return;
        }
        if (ae) {
          if (ie && Yn() < Jn()) {
            try {
              S.video.pause();
            } catch {}
            Xa(sr("鏡像正在重新累積穩定緩衝"));
          }
          return;
        }
        const e = Qn(Kn());
        if (!e || !Zn(e)) {
          try {
            S.video.pause();
          } catch {}
          Xa(sr("建立鏡像延遲中"));
        }
      }),
      S.video.addEventListener("waiting", () => {
        if (R) return void Ln();
        if (st())
          return ot() && ae
            ? void Tn("media-waiting")
            : void Xa(`${lt()} 緩衝中`);
        const e = Xn(Yn());
        if (e) {
          ((ie = !0),
            (le = 0),
            (oe = !1),
            se || (se = Date.now()),
            Rn("media-waiting"));
          try {
            S.video.pause();
          } catch {}
        } else ae && !le && (le = Date.now());
        (tr(
          "mirror.playback.waiting",
          { controlledRebuffer: e, transientDecoderWait: ae && !e },
          { force: !0, level: "warn" },
        ),
          e ? Xa(sr("鏡像正在重新累積穩定緩衝")) : ae || Xa(sr("鏡像緩衝中")));
      }),
      S.video.addEventListener("loadedmetadata", () => {
        const e =
          S.video.videoWidth && S.video.videoHeight
            ? `${S.video.videoWidth}x${S.video.videoHeight}`
            : "metadata";
        R
          ? Ln()
          : st()
            ? Xa(`${lt()} 資料已載入 · ${e}`)
            : Xa(`鏡像資料已載入 · ${e}`);
      }),
      S.video.addEventListener("error", () => {
        const e = S.video.error;
        Xa(`鏡像播放錯誤 ${e?.code || ""} ${e?.message || ""}`.trim());
      }),
      (function () {
        if ("undefined" != typeof BroadcastChannel)
          try {
            ((J = new BroadcastChannel(
              `live-subtitle-mirror:${o || "default"}`,
            )),
              J.addEventListener("message", (e) => {
                const t = e?.data || {};
                "MIRROR_MEDIA_CHUNK" === t?.type &&
                  ((t.sessionId && o && t.sessionId !== o) || Pn(t));
              }));
          } catch {
            J = null;
          }
      })(),
      chrome.runtime.onMessage.addListener((e) => {
        if (
          !(
            "mirror-viewer" !== e?.target ||
            (e.sessionId && o && e.sessionId !== o)
          )
        )
          if ("MIRROR_MEDIA_CHUNK" === e.type) Pn(e);
          else if ("LIVE_SUBTITLE_EVENT" === e.type)
            !(function (e) {
              if (!e || re) return;
              if ("status" === e.kind)
                return void (e.message && Xa(e.message, "pipeline"));
              if ("error" === e.kind)
                return void Xa(e.message || "字幕發生錯誤", "pipeline");
              if ("usage" === e.kind)
                return ((De = Ma(De, e.usage || {})), void Ca(De));
              if ("translation" !== e.kind) return;
              !(function (e, t) {
                const n = t
                  .map((t, n) =>
                    (function (e, t, n) {
                      const r = to(t.original || e.original || ""),
                        a = to(t.translation || e.translation || "");
                      if (!r && !a) return null;
                      const o = (function (e, t, n) {
                          const r = ro(
                              t.displayAfterMediaTime,
                              t.audioStartMediaTime,
                              t.mediaTime,
                              e.displayAfterMediaTime,
                              e.mediaTime,
                            ),
                            a = e.sync?.sourceProgramClock;
                          if (
                            ot() &&
                            null !== r &&
                            Number.isFinite(a?.programTimeMs) &&
                            Number.isFinite(a?.mediaTime)
                          )
                            return a.programTimeMs + 1e3 * (r - a.mediaTime);
                          const o = ao(e.sync?.mediaTime),
                            i = ro(
                              e.sync?.sourceWallTimeMs,
                              e.sync?.audioEndWallTimeMs,
                              e.sync?.transcriptReceivedAtMs,
                            );
                          if (null !== r && null !== o && null !== i)
                            return i + 1e3 * (r - o);
                          const s = ro(
                            e.sync?.audioStartWallTimeMs,
                            e.sync?.sourceWallTimeMs,
                            e.sync?.transcriptReceivedAtMs,
                          );
                          return null !== s ? s + 900 * n : Date.now();
                        })(e, t, n),
                        i = (function () {
                          const e = ao(
                            ke?.syncSubtitleOffsetSeconds ??
                              ke?.subtitleOffsetSeconds,
                          );
                          return null === e
                            ? 0
                            : Math.round(1e3 * oo(e, -2, 2));
                        })(),
                        s = ro(
                          t.displayAfterMediaTime,
                          t.audioStartMediaTime,
                          t.mediaTime,
                          e.displayAfterMediaTime,
                          e.mediaTime,
                        ),
                        u = ro(
                          t.mediaTimeEnd,
                          t.audioEndMediaTime,
                          e.sync?.mediaTimeEnd,
                        ),
                        c =
                          null !== s && null !== u && u > s
                            ? 1e3 * (u - s)
                            : 6500;
                      if (
                        null !== s &&
                        null !== u &&
                        Array.from(r).length >
                          Math.max(256, Math.ceil((c / 1e3) * 60 + 64))
                      )
                        return (
                          Ot(
                            "subtitle.mirror.cue_rejected",
                            {
                              reason: "impossible-text-density",
                              textChars: Array.from(r).length,
                              targetMediaTime: s,
                              targetMediaTimeEnd: u,
                            },
                            "warn",
                          ),
                          null
                        );
                      const d = Number.isFinite(o) ? o + l + i : null;
                      return {
                        original: r,
                        translation: a,
                        order: ao(t.order),
                        segmentationMethod:
                          t.segmentationMethod || e.segmentation?.method || "",
                        mediaTime: ao(t.mediaTime),
                        displayAfterMediaTime: ao(t.displayAfterMediaTime),
                        audioStartMediaTime: ao(t.audioStartMediaTime),
                        audioEndMediaTime: ao(t.audioEndMediaTime),
                        mediaTimeEnd: ro(t.mediaTimeEnd, t.audioEndMediaTime),
                        targetMediaTime: ro(
                          t.displayAfterMediaTime,
                          t.audioStartMediaTime,
                          t.mediaTime,
                          e.displayAfterMediaTime,
                          e.mediaTime,
                        ),
                        targetMediaTimeEnd: ro(
                          t.mediaTimeEnd,
                          t.audioEndMediaTime,
                          e.sync?.mediaTimeEnd,
                        ),
                        timingSource:
                          t.timingSource || e.sync?.timingSource || "",
                        sourceClockMethod: ot()
                          ? e.sync?.sourceProgramClock?.method ||
                            "uncalibrated-capture-clock"
                          : "capture-clock",
                        sourceBroadcasterLatencySeconds: ao(
                          e.sync?.sourceProgramClock?.broadcasterLatencySeconds,
                        ),
                        queueSequence: ao(t.queueSequence),
                        targetSourceWallTimeMs: Number.isFinite(o) ? o + i : o,
                        targetPlaybackWallTimeMs: d,
                        queuedAtMs: Date.now(),
                        queuedSourceWallTimeMs: ae ? hr() : null,
                        endSourceWallTimeMs: o + i + c,
                        fallbackDisplayed:
                          !0 === t.fallbackDisplayed ||
                          !0 === e.fallbackDisplayed,
                        key: `${Math.round(o / 500)}\n${r}`,
                      };
                    })(e, t, n),
                  )
                  .filter(Boolean);
                if (n.length) {
                  for (const e of n) {
                    const t = ur(e, ae ? hr() : null);
                    if (t) {
                      Ot(
                        "subtitle.mirror.cue_rejected",
                        {
                          reason: t,
                          targetMediaTime: e.targetMediaTime,
                          targetMediaTimeEnd: e.targetMediaTimeEnd,
                          fallbackDisplayed: e.fallbackDisplayed,
                        },
                        "info",
                      );
                      continue;
                    }
                    const n = te.findIndex((t) => t.key === e.key);
                    n >= 0
                      ? te[n].fallbackDisplayed &&
                        !e.fallbackDisplayed &&
                        (te[n] = e)
                      : te.push(e);
                  }
                  (te.sort(
                    (e, t) =>
                      e.targetSourceWallTimeMs - t.targetSourceWallTimeMs,
                  ),
                    te.length <= 80 || (te = te.slice(-80)),
                    ee || re || (ee = window.setInterval(cr, 80)),
                    cr());
                }
              })(
                e,
                Array.isArray(e.segments) && e.segments.length
                  ? e.segments
                  : [
                      {
                        original: e.original || "",
                        translation: e.translation || "",
                      },
                    ],
              );
            })(e.event || {});
          else if ("LIVE_SUBTITLE_CONFIG_UPDATE" === e.type) at(e.config || {});
          else if ("LIVE_SUBTITLE_NATIVE_PLAYBACK_UPDATE" === e.type) {
            const t = e.playback?.mode || e.mode || "";
            ("twitch-hls" === t ? ht(e) : gt(e)).catch((e) => {
              Ot(
                "native.playback.update_error",
                {
                  mode: t || "instagram-native",
                  error: String(e?.message || e || "").slice(0, 240),
                },
                "warn",
              );
            });
          } else
            "LIVE_SUBTITLE_STOP" === e.type &&
              ((re = !0), Xa("已停止"), vr(!1), Za());
      }),
      window.addEventListener(
        "pagehide",
        () => {
          rt({ notifyClosed: !0 });
        },
        { once: !0 },
      ),
      window.addEventListener(
        "beforeunload",
        () => {
          rt({ notifyClosed: !0 });
        },
        { once: !0 },
      ),
      Ve || (Ve = window.setInterval(Bn, 750)),
      (async function () {
        try {
          const t = await chrome.runtime.sendMessage({
            type: "MIRROR_VIEWER_READY",
            sessionId: o,
          });
          if (t?.ok && t.config) {
            ((ke = { ...(ke || {}), ...(t.config || {}) }),
              ir(),
              Va(ke),
              (L = ke.nativeStreamDelayKind || ""));
            const n = st() ? e : 120;
            ((s = oo(Number(t.config.syncDelaySeconds) || s, 2, n)),
              (l = Math.round(1e3 * s)),
              Qa(),
              Ha(),
              jr(),
              ot()
                ? (async function (e = {}) {
                    if (re) return;
                    (Nt("twitch-hls"),
                      hn(),
                      Qe(),
                      pn(),
                      Xa(
                        e.sourceTitle
                          ? `Twitch HLS 延遲準備中 · ${e.sourceTitle}`
                          : "Twitch HLS 延遲準備中",
                      ));
                    const t = await ma(
                      chrome.runtime.sendMessage({
                        type: "GET_TWITCH_HLS_PLAYBACK",
                        sessionId: o,
                        delaySeconds: s,
                      }),
                      1e4,
                      { ok: !1, error: "等待原 Twitch 分頁 HLS 來源逾時" },
                    );
                    if (!t?.ok || !t.masterUrl)
                      throw new Error(
                        t?.error || "Twitch HLS 播放來源建立失敗",
                      );
                    ut(t);
                  })(t).catch((e) => {
                    Xa(
                      `${e.message || "Twitch HLS 啟動失敗"}；保留原始 HLS 模式，避免切回高負載鏡像。`,
                    );
                  })
                : it()
                  ? (async function (t = {}) {
                      if (re) return;
                      (Nt("instagram-native"),
                        hn(),
                        Qe(),
                        pn(),
                        Xa(
                          "Instagram 原始串流延遲準備中" +
                            (t.sourceTitle ? ` · ${t.sourceTitle}` : ""),
                        ));
                      let n = null;
                      for (
                        ;
                        !re &&
                        ((n = await ma(
                          chrome.runtime.sendMessage({
                            type: "GET_NATIVE_STREAM_PLAYBACK",
                            sessionId: o,
                            delaySeconds: s,
                          }),
                          1e4,
                          { ok: !1, error: "Instagram 原始串流來源取得逾時" },
                        )),
                        !n?.ok || !n.streamUrl);

                      ) {
                        const e = n?.error || "Instagram 原始串流來源建立失敗";
                        (It(n, e),
                          Xa(
                            `${e}；等待直播串流 manifest，維持低運算原生模式重試中。`,
                          ),
                          await mn(1500));
                      }
                      if (re) return;
                      if (!n?.ok || !n.streamUrl)
                        throw new Error(
                          n?.error || "Instagram 原始串流來源建立失敗",
                        );
                      ((s = oo(Number(n.delaySeconds) || s, 2, e)),
                        (l = Math.round(1e3 * s)),
                        Qa());
                      const r = eo(n.streamType || n.streamUrl);
                      (jt(n.streamManifestBaseUrl || n.streamUrl),
                        yt(
                          n.streamUrl,
                          r,
                          n.streamManifestSignature || "",
                          n.streamReloadToken || "",
                        ),
                        "dash" !== r
                          ? "hls" !== r
                            ? Ut(n)
                            : Et(n)
                          : await vt(n));
                    })(t).catch((e) => {
                      Xa(
                        `${e.message || "Instagram 原始串流啟動失敗"}；未切回高負載鏡像。`,
                      );
                    })
                  : Xa(
                      t.sourceTitle
                        ? or(
                            `鏡像延遲準備中 · ${t.sourceTitle}`,
                            `Preparing mirror delay · ${t.sourceTitle}`,
                          )
                        : or("鏡像延遲準備中", "Preparing mirror delay"),
                    ));
          } else t?.error && Xa(t.error);
        } catch {
          Xa(or("等待鏡像 session", "Waiting for mirror session"));
        }
      })());
})();
