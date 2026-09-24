(() => {
  const e = "ai-live-subtitle-mvp-root",
    t = "data-live-subtitle-mirror-capture";
  let n = null,
    a = null;
  if (window.__aiLiveSubtitleMvp?.dispose)
    try {
      window.__aiLiveSubtitleMvp.dispose("reinjected");
    } catch (e) {
      console.warn(
        "[live-subtitle] previous content script cleanup failed:",
        e.message,
      );
    }
  for (const t of document.querySelectorAll(`#${e}`)) t.remove();
  const i = "liveSubtitleConfig",
    s = "liveSubtitleLatencyProfile:v1",
    r = ["dual", "translation", "original", "large", "side"],
    o = {
      dual: "雙語",
      translation: "只譯",
      original: "只原",
      large: "長段",
      side: "側欄",
    },
    l = {
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
    d = {
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
    },
    c = {
      original: { maxChars: 180, maxWords: 32 },
      translation: { maxChars: 140, maxWords: 36 },
    },
    u = 18,
    m = 1.25,
    y = 0.15,
    p = [250, 1e3, 2500, 5e3],
    g = 6e4,
    f = 520,
    S = "liveSubtitleAuth",
    h = 15e3,
    b = ["/interaction-translate", "/live-caption-translate", "/translate"],
    v = {
      system:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      "noto-sans":
        '"Noto Sans TC", "Noto Sans JP", "Noto Sans", Inter, system-ui, sans-serif',
      "source-han":
        '"Source Han Sans TC", "Source Han Sans JP", "Noto Sans TC", system-ui, sans-serif',
      rounded:
        '"Arial Rounded MT Bold", "Noto Sans TC", Inter, system-ui, sans-serif',
      serif: '"Noto Serif TC", "Noto Serif JP", Georgia, serif',
      mono: '"SFMono-Regular", "Cascadia Mono", "Noto Sans Mono", ui-monospace, monospace',
    },
    M = 56,
    w = 300,
    T = 260,
    k = 6500,
    x = 25e4,
    A = 120,
    C = 1.2,
    R = 0.5,
    D = 4200,
    L = 0.08,
    B = 3e4,
    E = 0.35,
    P = 8e3,
    I = 5e3,
    U = 0.25,
    _ = 0.35,
    q = 0.8,
    O = 2.5,
    V = 1.5,
    $ = 800,
    W = "fast",
    N = 0.25,
    G = "live-subtitle-mse-audio-hook",
    H = 180,
    F = {
      config: {},
      sessionId: null,
      role: "display",
      mounted: !1,
      locked: !1,
      collapsed: !1,
      positionMode: "bottom",
      mode: "dual",
      opacity: 0.94,
      fontSize: 26,
      fontFamily: "system",
      equalBilingualFontSize: !1,
      originalColor: "#d8e2f2",
      translationColor: "#ffffff",
      subtitleMaxRows: 2,
      layout: { left: 80, top: 420, width: 720, height: 132 },
      status: "待命",
      usage: null,
      latency: null,
      usagePanelOpen: !1,
      settingsPanelOpen: !1,
      interactionPanelManualPosition: !1,
      interactionPanelLayout: { left: 16, top: 72, width: 420, height: f },
      replyPanelOpen: !1,
      replyText: "",
      replyTranslation: "",
      replyStatus: "輸入文字後翻譯成創作者語言",
      replyBusy: !1,
      replyError: "",
      chatPanelOpen: !1,
      chatSourceLanguage: null,
      chatItems: [],
      chatStatus: "直播留言翻譯會顯示在這裡",
      chatError: "",
      chatAutoScroll: !0,
      lastDetectedSourceLang: "",
      pendingOriginal: "",
      pendingOriginalUpdatedAt: 0,
      currentOriginal: "",
      currentTranslation: "",
      translationSource: "",
      translationUpdatedAt: 0,
      activeSegment: null,
      segmentQueue: [],
      subtitleTimelineCache: [],
      subtitleTimelineCacheContext: "",
      subtitleTimelineCacheBytes: 0,
      displayMediaContextKey: "",
      lastQueueSignature: "",
      largeSegmentHistory: [],
      visibleLineCapacity: 0,
      subtitleRenderSignature: "",
      largeRenderSignature: "",
      subtitleSequence: 0,
      subtitleQueueSequence: 0,
      subtitleDisplayStats: {
        receivedResponses: 0,
        receivedSegments: 0,
        queuedSegments: 0,
        duplicateSegments: 0,
        displayedSegments: 0,
        droppedSegments: 0,
        translationErrors: 0,
      },
      subtitleHadContent: !1,
      lastSubtitleActivityAt: 0,
      subtitleFading: !1,
      subtitleDisplayBlank: !1,
      displayedOriginalText: "",
      displayedSegmentHistory: [],
      draftOriginal: "",
      draftTranslation: "",
      finalOriginal: "",
      finalTranslation: "",
      sync: {
        enabled: !1,
        singleTabMediaSync: !1,
        mode: "auto",
        fixedDelaySeconds: 6,
        adaptiveDelayEnabled: !1,
        subtitleBufferTargetSegments: 3,
        subtitleOffsetSeconds: 0,
        targetDelaySeconds: 6,
        actualDelaySeconds: null,
        viewerMediaTime: null,
        viewerWallTimeMs: 0,
        viewerPlaybackRate: 1,
        liveEdgeSeconds: null,
        sourcePreloadEnabled: !1,
        sourcePreloadMaxLeadSeconds: 60,
        sourcePreloadPlaybackRate: 1,
        sourcePreloadRate: 1,
        lastSourcePreloadRateCommandAt: 0,
        platform: "html5",
        sourceTiming: null,
        sourceToViewerTimelineOffsetSeconds: null,
        sourceToViewerTimelineOffsetCandidateSeconds: null,
        sourceToViewerTimelineOffsetCandidateSamples: 0,
        sourceToViewerTimelineOffsetCandidateStartedAtMs: 0,
        sourceToViewerTimelineOffsetLastStableAtMs: 0,
        sourceToViewerTimelineOffsetContinuityActive: !1,
        sourceToViewerTimelineOffsetContinuityDelaySeconds: null,
        ready: !1,
        status: "",
        latencySamples: [],
        requiredDelaySamples: [],
        coverageHoldSamples: [],
        latencyPercentiles: null,
        latencyProfile: {
          version: 1,
          bucketHours: 2,
          providers: {},
          updatedAt: null,
        },
        latencyProfileLoaded: !1,
        lastLatencyProviderKey: "default",
        displayErrorSamples: [],
        autoCorrectionErrorSamples: [],
        lastDisplayErrorSeconds: null,
        displayedSegmentCount: 0,
        overToleranceCount: 0,
        autoCorrectionSeconds: 0,
        delayArmed: !1,
        delayArmedAt: 0,
        vodAligned: !1,
        lockedDelaySeconds: null,
        recommendedDelaySeconds: null,
        lastSourceRestoreAt: 0,
        lastSourceFollowRequestAt: 0,
        lastSourceFollowRequestKey: "",
        sourceAdPlaying: !1,
        viewerAdPlaying: !1,
        adHold: !1,
        adHoldStartedAt: 0,
        adStateKey: "",
        lastAdSkipAttemptAt: 0,
        lastMonitorAt: 0,
        delayBuffering: !1,
        delayBufferStartedAt: 0,
        liveStartupClockStartedAtMs: 0,
        adaptiveSubtitleHold: !1,
        adaptiveSubtitleHoldStartedAt: 0,
        adaptiveSubtitleHoldTargetSeconds: null,
        adaptiveSubtitleHoldPendingKey: "",
        adaptiveSubtitleHoldTimedOutKey: "",
        lastSpeechActivityAt: 0,
        speechActivityStartedAt: 0,
        lastAdaptiveDelayIncreaseAt: 0,
        singleTabMseFirstCueShown: !1,
        singleTabMseInitialCueShortcutDisabled: !1,
        subtitleBufferPrimed: !1,
        delayBuildProgressSeconds: 0,
        delayBuildTargetSeconds: null,
        delayAnchorMediaTime: null,
        delayAnchorSourceMediaTime: null,
        lastDelayCorrectionAt: 0,
        lastSeekTargetSeconds: null,
        pendingViewerSeek: null,
        subtitleSeekGuard: {
          active: !1,
          targetMediaTime: null,
          targetDelaySeconds: null,
          startedAtMs: 0,
          expiresAtMs: 0,
          reason: "",
          sequence: 0,
        },
        cachedSubtitleReplay: {
          active: !1,
          targetMediaTime: null,
          cacheStartMediaTime: null,
          cacheEndMediaTime: null,
          allowRedisplay: !1,
          startedAtMs: 0,
          lastStatusAtMs: 0,
        },
        cachedSubtitleReplayGuard: {
          active: !1,
          targetMediaTime: null,
          cacheEndMediaTime: null,
          startedAtMs: 0,
          segments: [],
        },
        timelineGapHold: {
          active: !1,
          key: "",
          startedAtMs: 0,
          lastLogAtMs: 0,
          pausedViewer: !1,
          softHold: !1,
          previousEndMediaTime: null,
          nextStartMediaTime: null,
          pendingRange: null,
        },
        pendingSubtitleRanges: [],
        completedSubtitleRanges: [],
        subtitlePipelineRangeVersions: {},
        mseSubtitleCoverageHold: {
          active: !1,
          key: "",
          startedAtMs: 0,
          lastLogAtMs: 0,
          pausedViewer: !1,
          previousEndMediaTime: null,
        },
        pendingCachedReplayActivation: !1,
        lastCachedReplayResumeAttemptAtMs: 0,
        cacheReplayStartupHoldStartedAtMs: 0,
        ignoreViewerSeekUntilMs: 0,
        ignoreViewerPlaybackUntilMs: 0,
        startupAutoplayBlockCount: 0,
        lastStartupAutoplayBlockLogAtMs: 0,
        viewerStartupMediaWarmupActive: !1,
        startupAlignmentTargetMediaTime: null,
        startupAlignmentStartedAtMs: 0,
        startupAlignmentIgnoreUntilMs: 0,
        startupAlignmentEchoIgnoredCount: 0,
        viewerStallTrackMediaTime: null,
        viewerStallTrackAtMs: 0,
        viewerStallRecoveryStage: 0,
        viewerStallLastRecoveryAtMs: 0,
        lastUntrustedPauseAutoResumeAtMs: 0,
        internalViewerSeekTarget: null,
        internalViewerSeekUntilMs: 0,
        startupSeekGuardUntilMs: 0,
        startupResumeAnchorMediaTime: null,
        startupResumeAnchorArmedAtMs: 0,
        startupResumePlaybackStartedAtMs: 0,
        startupResumeAnchorUntilMs: 0,
        startupResumeAnchorStableSamples: 0,
        startupResumeAnchorRestoreCount: 0,
        viewerNativeDvrUnavailable: !1,
        viewerPlaybackBlocked: !1,
        viewerPlaybackBlockedAtMs: 0,
        viewerPlaybackBlockNoticeSentAtMs: 0,
        userPaused: !1,
        mseStartupWaitActive: !1,
        mseStartupWaitReleased: !1,
        mseStartupWaitStartedAt: 0,
        mseStartupWaitReadyAt: 0,
        mseStartupWaitLastTimeoutLogAt: 0,
        mseStartupBuiltDelayInsaneLogAt: 0,
        mseStartupWaitReason: "",
        mseStartupWaitTargetMediaTime: null,
        mseStartupWaitResumeRequested: !1,
        singleTabMseStartupGate: {
          active: !1,
          phase: "idle",
          strategy: "audible-preload-single-seek-back",
          seekBackOnRelease: !0,
          anchorMediaTime: null,
          startedAtMs: 0,
          preloadingStartedAtMs: 0,
          firstAudioCapturedAtMs: 0,
          firstAudioWarningLogged: !1,
          releasedAtMs: 0,
          baselineSegmentCount: 0,
          baselineRawLeadSeconds: 0,
          rawLeadSeconds: 0,
          rawLeadGainSeconds: 0,
          rawCaptureRate: 0,
          preloadedMediaSeconds: 0,
          lastRawLeadGrowthAtMs: 0,
          lastRawLeadSampleAtMs: 0,
          readyLeadSeconds: 0,
          requiredLeadSeconds: 0,
          countdownTargetSeconds: 0,
          latencyP95Seconds: null,
          latencySource: "",
          lastReadinessAtMs: 0,
          playbackRetryCount: 0,
          lastPlayAttemptAtMs: 0,
          lastPlaybackMediaTime: null,
          lastPlaybackProgressAtMs: 0,
          unbufferedAnchorRecoveryCount: 0,
          lastProgressLogAtMs: 0,
          timelineResetPending: !1,
          timelineRevision: null,
          seekCatchup: !1,
          resumeRequested: !1,
          videoWasPaused: !1,
          holdAppliedAtMs: 0,
          holdTimeoutMs: 0,
          mediaContextKey: "",
          configuredMediaContextKey: "",
          viewerMediaSwitchEpoch: null,
        },
        singleTabMseInternalPauseUntilMs: 0,
        mseReleaseActivateTargetMediaTime: null,
        pauseContinuedLoadingUntilMs: 0,
        suspendAutoAlignUntilMs: 0,
        lastViewerTimelineJumpAtMs: 0,
        lastViewerTimelineJumpFrom: null,
        lastViewerTimelineJumpTo: null,
        lastViewerTimelineJumpReason: "",
        lastViewerTimelineJumpHandledAtMs: 0,
        lastViewerClockRebaseAtMs: 0,
        lastViewerClockRebaseMediaTime: null,
        lastViewerClockRebaseLiveLagSeconds: null,
        lastViewerClockRebaseIgnoreUntilMs: 0,
        lastRawViewerClockSample: null,
        lastFrozenViewerClockSampleLogAtMs: 0,
        sourceBehindViewerDetectedAtMs: 0,
        sourceBehindViewerSamples: 0,
        sourceBehindViewerLastRecoveryAtMs: 0,
        lastSubtitleProjectionRejectLogAtMs: 0,
        lastTrustedViewerSeekIntentAtMs: 0,
        lastTrustedViewerSeekIntentKind: "",
        lastTrustedViewerPlaybackIntentAtMs: 0,
        lastTrustedViewerPlaybackIntentAction: "",
        lastTrustedViewerPlaybackIntentKind: "",
        lastViewerSeekEventAtMs: 0,
        lastViewerSeekEventTarget: null,
        latestViewerSeekingAtMs: 0,
        latestViewerSeekingTarget: null,
        untrustedViewerReloadStartedAtMs: 0,
        untrustedViewerReloadExpectedMediaTime: null,
        untrustedViewerReloadLastLogAtMs: 0,
        untrustedViewerReloadRecoveryAttempts: 0,
      },
      mseAudio: {
        enabled: !1,
        installed: !1,
        appendCount: 0,
        segmentCount: 0,
        sourceBufferCount: 0,
        audioSourceBufferCount: 0,
        unknownAppendCount: 0,
        ignoredAppendCount: 0,
        bytes: 0,
        lastLeadSeconds: null,
        maxLeadSeconds: 0,
        lastBufferedStart: null,
        lastBufferedEnd: null,
        lastReadySubtitleLeadSeconds: null,
        lastRequiredSubtitleLeadSeconds: null,
        lastMimeType: "",
        lastIgnoredReason: "",
        hookVersion: null,
        hookVersionReportedAt: 0,
        installDocumentId: "",
        installDocumentReadyState: "",
        installedDuringDocumentLoading: !1,
        hookInstalledAt: null,
        lastSegmentAt: 0,
        lastStatusAt: 0,
        lastStatusSampleAt: 0,
        lastStatusState: "",
        statusWindowStartedAt: 0,
        statusWindowBaseline: null,
        statusLeadSampleCount: 0,
        statusLeadSampleSum: 0,
        statusLeadSampleMin: null,
        statusLeadSampleMax: null,
        statusReasonCounts: {},
        recentStatusSamples: [],
        anomalyLogAtByKey: {},
      },
    };
  let z = null,
    K = null,
    j = null,
    Q = null,
    J = null,
    Y = null,
    X = 0,
    Z = 0,
    ee = !1,
    te = !1,
    ne = !1,
    ae = "",
    ie = null;
  const se = new Set(),
    re = new Set(),
    oe = [],
    le = { href: "", checkedAt: 0, value: !1 };
  let de,
    ce,
    ue,
    me = {},
    ye = null,
    pe = [],
    ge = null,
    fe = null,
    Se = null,
    he = !1,
    be = null,
    ve = null,
    Me = 0,
    we = !1,
    Te = !1,
    ke = 0,
    xe = null,
    Ae = "",
    Ce = "",
    Re = null,
    De = null,
    Le = null,
    Be = "",
    Ee = Id(),
    Pe = null,
    Ie = 0,
    Ue = null,
    _e = 0,
    qe = !1,
    Oe = null,
    Ve = null,
    $e = 0,
    We = null,
    Ne = !1,
    Ge = null,
    He = null,
    Fe = null,
    ze = null,
    Ke = null,
    je = null,
    Qe = null,
    Je = null,
    Ye = 0,
    Xe = null,
    Ze = null,
    et = null,
    tt = null,
    nt = "",
    at = 0,
    it = !1,
    st = {
      href: "",
      checkedAt: 0,
      value: !1,
      classification: "unknown",
      evidence: "uninitialized",
    };
  async function rt(e, t = {}) {
    const n = Math.max(0, vu(t.timeoutMs) ?? 1e4),
      a = Math.max(1, vu(t.pollMs) ?? 100),
      i = Date.now();
    let s = e || Yd(),
      r = !1,
      o = !1;
    F.sync.viewerStartupMediaWarmupActive = !0;
    try {
      for (; s && Date.now() - i <= n; ) {
        const e = Number(s.readyState) || 0,
          n = ot(s, vu(t.targetMediaTime) ?? vu(s.currentTime));
        if (e >= 2 || n) {
          const a = {
            ready: !0,
            video: s,
            waitedMs: Math.max(0, Date.now() - i),
            readyState: e,
            networkState: Number(s.networkState) || 0,
            bufferedReady: n,
            playAttempted: r,
            playBlocked: o,
          };
          return (
            Ja("sync.viewer_startup_media.ready", {
              reason: ku(t.reason || "startup"),
              targetMediaTime: vu(t.targetMediaTime),
              currentTime: vu(s.currentTime),
              ...a,
              video: void 0,
            }),
            a
          );
        }
        if (!r && s.paused) {
          ((r = !0), So(10800));
          try {
            const e = s.play();
            e?.catch &&
              e.catch(() => {
                o = !0;
              });
          } catch {
            o = !0;
          }
        }
        await new Promise((e) => window.setTimeout(e, a));
        const l = Yd();
        l && l !== s && ((s = l), (r = !1), (o = !1));
      }
      const e = {
        ready: !1,
        video: s,
        waitedMs: Math.max(0, Date.now() - i),
        readyState: Number(s?.readyState) || 0,
        networkState: Number(s?.networkState) || 0,
        paused: Boolean(s?.paused),
        currentTime: vu(s?.currentTime),
        bufferedRanges: lt(s),
        playAttempted: r,
        playBlocked: o,
      };
      return (
        Ja(
          "sync.viewer_startup_media.timeout",
          {
            reason: ku(t.reason || "startup"),
            targetMediaTime: vu(t.targetMediaTime),
            ...e,
            video: void 0,
          },
          "error",
        ),
        e
      );
    } finally {
      F.sync.viewerStartupMediaWarmupActive = !1;
    }
  }
  function ot(e, t = null) {
    const n = vu(t);
    if (null === n) return !1;
    for (const [t, a] of lt(e)) if (n >= t - 0.05 && n < a - 0.05) return !0;
    return !1;
  }
  function lt(e) {
    const t = e?.buffered,
      n = [];
    if (!t?.length) return n;
    for (let e = 0; e < t.length; e += 1)
      try {
        const a = vu(t.start(e)),
          i = vu(t.end(e));
        null !== a && null !== i && i - a >= 0.05 && n.push([a, i]);
      } catch {}
    return n;
  }
  function dt(e = {}) {
    const t = vu(e.currentTime),
      n = Array.isArray(e.bufferedRanges) ? e.bufferedRanges : [];
    return [
      `readyState=${Number(e.readyState) || 0}`,
      `networkState=${Number(e.networkState) || 0}`,
      `currentTime=${null === t ? "?" : yn(t)}`,
      `buffered=${n.length ? JSON.stringify(n.map((e) => e.map(yn))) : "[]"}`,
    ].join(", ");
  }
  function ct(e, t, n) {
    if ("LIVE_SUBTITLE_CONTENT_SCRIPT_PROBE" !== e?.type)
      if ("LIVE_SUBTITLE_PAGE_INFO_REQUEST" !== e?.type)
        if ("LIVE_SUBTITLE_MSE_HOOK_STATUS" !== e?.type) {
          if ("LIVE_SUBTITLE_FAILURE" === e?.type)
            return (F.sessionId && F.sessionId !== e.sessionId) ||
              e.mediaContextKey !== yc()
              ? void n({ ok: !0, ignored: !0, reason: "stale-failure" })
              : ((F.sessionId = null),
                zt({ resume: !1 }),
                Yo(
                  e.config || {},
                  e.mediaContextKey,
                  "service-failure",
                  e.message,
                ),
                void n({ ok: !0 }));
          if ("LIVE_SUBTITLE_INIT" === e?.type)
            return (
              (async function (e = {}, t = null) {
                const n = ku(t || "");
                if (tt && nt === n)
                  return (await tt, void (yt(e, t) && pr(e, { sessionId: t })));
                const a = at + 1;
                ((at = a), (nt = n));
                const i = (async function (e = {}, t = null, n = 0) {
                  if ((Qe?.remove(), (Qe = null), yt(e, t)))
                    return (
                      pr(e, { sessionId: t }),
                      Kt(),
                      void Ja(
                        "session.overlay_init_reused",
                        {
                          sessionId: t,
                          mediaContextKey: mt(e),
                          cachedTimelineSegments: Array.isArray(
                            F.subtitleTimelineCache,
                          )
                            ? F.subtitleTimelineCache.length
                            : 0,
                          queuedSegments: Array.isArray(F.segmentQueue)
                            ? F.segmentQueue.length
                            : 0,
                        },
                        "info",
                      )
                    );
                  const a = mt(F.config || {}),
                    i = mt(e);
                  Boolean(a && i && a !== i) &&
                    No("overlay-media-context-change");
                  const o = F.sessionId !== t;
                  (F.sessionId && o && ((Ge = null), Ts()),
                    o &&
                      (function (e = {}) {
                        (J?.cancel(),
                          Q?.reset(),
                          bs(),
                          (Z += 1),
                          ds(),
                          cs(),
                          (oe.length = 0),
                          se.clear(),
                          re.clear(),
                          (X = 0),
                          (ee = !1),
                          (te = !1),
                          (ne = !1),
                          (ae = ""),
                          !1 !== e.clearItems && (F.chatItems = []),
                          (F.chatStatus = "直播留言翻譯會顯示在這裡"),
                          (F.chatError = ""),
                          (F.chatSourceLanguage = null),
                          (F.chatAutoScroll = !0));
                      })(),
                    "source" === F.role
                      ? (Sr(), gr(), Ur(), wr())
                      : "display" === F.role && jr(),
                    (F.config = e),
                    (F.sessionId = t),
                    (F.role = "display"),
                    (F.status = "連線準備中"),
                    sl(),
                    Wo("subtitle-reset", { log: !1 }),
                    rl(),
                    (Ke = null),
                    xn(),
                    En(),
                    Uc(),
                    (F.pendingOriginal = ""),
                    (F.pendingOriginalUpdatedAt = 0),
                    (F.currentOriginal = ""),
                    (F.currentTranslation = ""),
                    (F.translationSource = ""),
                    (F.translationUpdatedAt = 0),
                    (F.activeSegment = null),
                    (F.segmentQueue = []),
                    Ka(),
                    (F.displayMediaContextKey = Wa()),
                    (F.lastQueueSignature = ""),
                    (F.largeSegmentHistory = []),
                    (F.visibleLineCapacity = 0),
                    (F.subtitleRenderSignature = ""),
                    (F.largeRenderSignature = ""),
                    (F.subtitleSequence = 0),
                    (F.subtitleQueueSequence = 0),
                    (F.subtitleDisplayStats = {
                      receivedResponses: 0,
                      receivedSegments: 0,
                      queuedSegments: 0,
                      duplicateSegments: 0,
                      displayedSegments: 0,
                      droppedSegments: 0,
                      translationErrors: 0,
                    }),
                    (F.subtitleHadContent = !1),
                    (F.lastSubtitleActivityAt = 0),
                    (F.subtitleFading = !1),
                    (F.subtitleDisplayBlank = !1),
                    (F.usage = null),
                    (F.latency = null),
                    (F.displayedOriginalText = ""),
                    (F.displayedSegmentHistory = []),
                    (pe = []),
                    (F.draftOriginal = ""),
                    (F.draftTranslation = ""),
                    (F.finalOriginal = ""),
                    (F.finalTranslation = ""),
                    (F.sync.singleTabMseFirstCueShown = !1),
                    (F.sync.singleTabMseInitialCueShortcutDisabled = !1),
                    (F.sync.subtitleBufferPrimed = !1),
                    (F.sync.latencySamples = []),
                    (F.sync.requiredDelaySamples = []),
                    (F.sync.coverageHoldSamples = []),
                    (F.sync.cacheReplayStartupHoldStartedAtMs = 0),
                    (F.sync.latencyPercentiles = null),
                    va(),
                    (F.sync.delayArmed = !1),
                    (F.sync.delayArmedAt = 0),
                    (F.sync.vodAligned = !1),
                    (F.sync.viewerWallTimeMs = 0),
                    (F.sync.viewerPlaybackRate = 1),
                    (F.sync.platform = "html5"),
                    (F.sync.sourceTiming = null),
                    Fl(),
                    (F.sync.lockedDelaySeconds = null),
                    (F.sync.recommendedDelaySeconds = null),
                    (F.sync.latencyPercentiles = null),
                    (F.sync.lastMonitorAt = 0),
                    (F.sync.lastSourceFollowRequestAt = 0),
                    (F.sync.lastSourceFollowRequestKey = ""),
                    (F.sync.sourceAdPlaying = !1),
                    (F.sync.viewerAdPlaying = !1),
                    (F.sync.adHold = !1),
                    (F.sync.adHoldStartedAt = 0),
                    (F.sync.adStateKey = ""),
                    (F.sync.lastAdSkipAttemptAt = 0),
                    (F.sync.pendingViewerSeek = null),
                    (F.sync.delayBuffering = !1),
                    (F.sync.delayBufferStartedAt = 0),
                    Bc(),
                    (F.sync.delayAnchorMediaTime = null),
                    (F.sync.delayAnchorSourceMediaTime = null),
                    (F.sync.ignoreViewerSeekUntilMs = 0),
                    (F.sync.ignoreViewerPlaybackUntilMs = 0),
                    (F.sync.startupAutoplayBlockCount = 0),
                    (F.sync.lastStartupAutoplayBlockLogAtMs = 0),
                    (F.sync.viewerStartupMediaWarmupActive = !1),
                    (F.sync.startupAlignmentTargetMediaTime = null),
                    (F.sync.startupAlignmentStartedAtMs = 0),
                    (F.sync.startupAlignmentIgnoreUntilMs = 0),
                    (F.sync.startupAlignmentEchoIgnoredCount = 0),
                    (F.sync.viewerStallTrackMediaTime = null),
                    (F.sync.viewerStallTrackAtMs = 0),
                    (F.sync.viewerStallRecoveryStage = 0),
                    (F.sync.viewerStallLastRecoveryAtMs = 0),
                    (F.sync.lastUntrustedPauseAutoResumeAtMs = 0),
                    (F.sync.internalViewerSeekTarget = null),
                    (F.sync.internalViewerSeekUntilMs = 0),
                    (F.sync.startupSeekGuardUntilMs = 0),
                    md("subtitle-reset", Yd(), { log: !1 }),
                    (F.sync.viewerPlaybackBlocked = !1),
                    (F.sync.viewerPlaybackBlockedAtMs = 0),
                    (F.sync.viewerPlaybackBlockNoticeSentAtMs = 0),
                    (F.sync.userPaused = !1),
                    (F.sync.lastTrustedViewerPlaybackIntentAtMs = 0),
                    (F.sync.lastTrustedViewerPlaybackIntentAction = ""),
                    (F.sync.lastTrustedViewerPlaybackIntentKind = ""),
                    (F.sync.mseStartupWaitActive = !1),
                    (F.sync.mseStartupWaitReleased = !1),
                    (F.sync.mseStartupWaitStartedAt = 0),
                    (F.sync.mseStartupWaitReadyAt = 0),
                    (F.sync.mseStartupWaitLastTimeoutLogAt = 0),
                    (F.sync.mseStartupWaitReason = ""),
                    (F.sync.mseStartupWaitTargetMediaTime = null),
                    (F.sync.mseStartupWaitResumeRequested = !1),
                    (F.sync.singleTabMseInternalPauseUntilMs = 0),
                    rl(),
                    (Ke = null),
                    (F.sync.pauseContinuedLoadingUntilMs = 0),
                    (F.sync.suspendAutoAlignUntilMs = 0),
                    (function (e = {}) {
                      Wo("config-reset", { log: !1 });
                      const t =
                          !1 !== e.syncEnabled &&
                          Boolean(
                            e.videoSyncEnabled ??
                              e.youtubeSyncEnabled ??
                              e.syncEnabled,
                          ),
                        n =
                          Boolean(
                            e.singleTabMediaSync || e.youtubeVodSingleTabSync,
                          ) && !t,
                        a = Cu(
                          Number(
                            e.syncDelaySeconds ||
                              e.youtubeSyncDelaySeconds ||
                              6,
                          ) || 6,
                          2,
                          A,
                        ),
                        i = Cu(
                          Number(
                            e.syncSubtitleOffsetSeconds ||
                              e.subtitleOffsetSeconds ||
                              0,
                          ) || 0,
                          -2,
                          2,
                        ),
                        s =
                          "auto" ===
                          String(
                            e.syncDelayMode ||
                              e.youtubeSyncDelayMode ||
                              "fixed",
                          ).toLowerCase()
                            ? "auto"
                            : "fixed",
                        r = e.videoPlatform || nc(location.href);
                      ((F.sync.platform = r),
                        (F.sync.enabled = (t || n) && tc()),
                        (F.sync.singleTabMediaSync = F.sync.enabled && n),
                        (F.sync.mode = s),
                        (F.sync.fixedDelaySeconds = a),
                        (F.sync.adaptiveDelayEnabled =
                          Boolean(e.adaptiveSyncDelayEnabled) && !n),
                        (F.sync.subtitleBufferTargetSegments = mr(
                          e.subtitleBufferTargetSegments,
                        )),
                        (F.sync.subtitleOffsetSeconds = i),
                        (F.sync.lastLatencyProviderKey = Dd(
                          e.provider || F.sync.lastLatencyProviderKey,
                        )),
                        (F.sync.targetDelaySeconds = a),
                        (F.sync.actualDelaySeconds = null),
                        (F.sync.viewerMediaTime = null),
                        (F.sync.viewerWallTimeMs = 0),
                        (F.sync.viewerPlaybackRate = 1),
                        (F.sync.liveEdgeSeconds = null),
                        (F.sync.sourcePreloadEnabled = !1),
                        (F.sync.sourcePreloadMaxLeadSeconds = Ir(
                          e.sourcePreloadMaxLeadSeconds,
                        )),
                        (F.sync.sourcePreloadPlaybackRate = 1),
                        (F.sync.sourcePreloadRate = 1),
                        (F.sync.lastSourcePreloadRateCommandAt = 0),
                        (F.sync.sourceTiming = null),
                        (F.sync.sourceToViewerTimelineOffsetSeconds = null),
                        Fl(),
                        (F.sync.ready = !1),
                        (F.sync.status = F.sync.enabled
                          ? F.sync.singleTabMediaSync
                            ? "單分頁音軌對齊準備中"
                            : "等待影片 live buffer"
                          : ""),
                        va(),
                        (F.sync.delayArmed = !1),
                        (F.sync.delayArmedAt = 0),
                        (F.sync.vodAligned = !1),
                        (F.sync.lockedDelaySeconds = null),
                        (F.sync.recommendedDelaySeconds = null),
                        (F.sync.lastSourceRestoreAt = 0),
                        (F.sync.lastSourceFollowRequestAt = 0),
                        (F.sync.lastSourceFollowRequestKey = ""),
                        (F.sync.lastViewerTimelineJumpAtMs = 0),
                        (F.sync.lastViewerTimelineJumpFrom = null),
                        (F.sync.lastViewerTimelineJumpTo = null),
                        (F.sync.lastViewerTimelineJumpReason = ""),
                        (F.sync.lastViewerTimelineJumpHandledAtMs = 0),
                        (F.sync.lastViewerSeekEventAtMs = 0),
                        (F.sync.lastViewerSeekEventTarget = null),
                        (F.sync.latestViewerSeekingAtMs = 0),
                        (F.sync.latestViewerSeekingTarget = null),
                        (F.sync.sourceAdPlaying = !1),
                        (F.sync.viewerAdPlaying = !1),
                        (F.sync.adHold = !1),
                        (F.sync.adHoldStartedAt = 0),
                        (F.sync.adStateKey = ""),
                        (F.sync.lastAdSkipAttemptAt = 0),
                        (F.sync.lastMonitorAt = 0),
                        (F.sync.delayBuffering = !1),
                        (F.sync.delayBufferStartedAt = 0),
                        (F.sync.adaptiveSubtitleHold = !1),
                        (F.sync.adaptiveSubtitleHoldStartedAt = 0),
                        (F.sync.adaptiveSubtitleHoldTargetSeconds = null),
                        (F.sync.adaptiveSubtitleHoldPendingKey = ""),
                        (F.sync.adaptiveSubtitleHoldTimedOutKey = ""),
                        (F.sync.lastSpeechActivityAt = 0),
                        (F.sync.speechActivityStartedAt = 0),
                        (F.sync.singleTabMseFirstCueShown = !1),
                        (F.sync.singleTabMseInitialCueShortcutDisabled = !1),
                        (F.sync.subtitleBufferPrimed = !1),
                        (F.sync.lastAdaptiveDelayIncreaseAt = 0),
                        Bc(),
                        (F.sync.delayAnchorMediaTime = null),
                        (F.sync.delayAnchorSourceMediaTime = null),
                        (F.sync.lastDelayCorrectionAt = 0),
                        (F.sync.lastSeekTargetSeconds = null),
                        (F.sync.pendingViewerSeek = null),
                        (F.sync.cacheReplayStartupHoldStartedAtMs = 0),
                        (F.sync.ignoreViewerSeekUntilMs = 0),
                        (F.sync.ignoreViewerPlaybackUntilMs = 0),
                        (F.sync.startupAutoplayBlockCount = 0),
                        (F.sync.lastStartupAutoplayBlockLogAtMs = 0),
                        (F.sync.viewerStartupMediaWarmupActive = !1),
                        (F.sync.startupAlignmentTargetMediaTime = null),
                        (F.sync.startupAlignmentStartedAtMs = 0),
                        (F.sync.startupAlignmentIgnoreUntilMs = 0),
                        (F.sync.startupAlignmentEchoIgnoredCount = 0));
                      const o =
                        F.sync.singleTabMediaSync && !0 !== e.sourceIsLiveStream
                          ? vu(e.initialPlaybackMediaTime)
                          : null;
                      if (null !== o && o >= 0) {
                        const e = Date.now(),
                          t = Cu(1e3 * (a + 15), 3e4, 12e4);
                        ((F.sync.startupAlignmentTargetMediaTime = o),
                          (F.sync.startupAlignmentStartedAtMs = e),
                          (F.sync.startupAlignmentIgnoreUntilMs = e + t));
                      }
                      ((F.sync.viewerStallTrackMediaTime = null),
                        (F.sync.viewerStallTrackAtMs = 0),
                        (F.sync.viewerStallRecoveryStage = 0),
                        (F.sync.viewerStallLastRecoveryAtMs = 0),
                        (F.sync.lastUntrustedPauseAutoResumeAtMs = 0),
                        (F.sync.internalViewerSeekTarget = null),
                        (F.sync.internalViewerSeekUntilMs = 0),
                        (F.sync.startupSeekGuardUntilMs =
                          F.sync.enabled && !0 === e.sourceIsLiveStream
                            ? Date.now() + P
                            : 0),
                        md("config-reset", Yd(), { log: !1 }),
                        (F.sync.viewerPlaybackBlocked = !1),
                        (F.sync.viewerPlaybackBlockedAtMs = 0),
                        (F.sync.viewerPlaybackBlockNoticeSentAtMs = 0),
                        (F.sync.userPaused = !1),
                        (F.sync.lastTrustedViewerPlaybackIntentAtMs = 0),
                        (F.sync.lastTrustedViewerPlaybackIntentAction = ""),
                        (F.sync.lastTrustedViewerPlaybackIntentKind = ""),
                        (F.sync.mseStartupWaitActive = !1),
                        (F.sync.mseStartupWaitReleased = !1),
                        (F.sync.mseStartupWaitStartedAt = 0),
                        (F.sync.mseStartupWaitReadyAt = 0),
                        (F.sync.mseStartupWaitLastTimeoutLogAt = 0),
                        (F.sync.mseStartupWaitReason = ""),
                        (F.sync.mseStartupWaitTargetMediaTime = null),
                        (F.sync.mseStartupWaitResumeRequested = !1),
                        (F.sync.singleTabMseInternalPauseUntilMs = 0),
                        rl(),
                        (Ke = null),
                        (F.sync.pauseContinuedLoadingUntilMs = 0),
                        (F.sync.suspendAutoAlignUntilMs = 0),
                        (F.sync.lastViewerSeekEventAtMs = 0),
                        (F.sync.lastViewerSeekEventTarget = null),
                        (F.sync.latestViewerSeekingAtMs = 0),
                        (F.sync.latestViewerSeekingTarget = null),
                        to());
                    })(e),
                    await (async function () {
                      if (!F.sync.latencyProfileLoaded) {
                        try {
                          const e = await chrome.storage?.local?.get?.(s);
                          F.sync.latencyProfile = (function (e = null) {
                            const t = {
                              version: 1,
                              bucketHours: 2,
                              providers: {},
                              updatedAt: null,
                            };
                            F.sync.latencyProfile = t;
                            const n =
                              e?.providers && "object" == typeof e.providers
                                ? e.providers
                                : {};
                            for (const [e, t] of Object.entries(n)) {
                              const n = Dd(e),
                                a =
                                  t?.buckets && "object" == typeof t.buckets
                                    ? t.buckets
                                    : {};
                              for (const [e, t] of Object.entries(a)) {
                                const a = kd(t);
                                a.length && (xd(n, e).samples = a);
                              }
                            }
                            return ((t.updatedAt = e?.updatedAt || null), t);
                          })(e?.[s]);
                        } catch {
                          F.sync.latencyProfile = {
                            version: 1,
                            bucketHours: 2,
                            providers: {},
                            updatedAt: null,
                          };
                        }
                        F.sync.latencyProfileLoaded = !0;
                      }
                    })(),
                    pt(n, t),
                    await (async function () {
                      const e = sr(),
                        t = await chrome.storage.local.get(e);
                      if (t[e]) {
                        const n = t[e];
                        ((F.collapsed = Boolean(n.collapsed)),
                          (F.locked = Boolean(n.locked)),
                          (F.positionMode =
                            "floating" === n.positionMode
                              ? "floating"
                              : "bottom"),
                          (F.usagePanelOpen = Boolean(n.usagePanelOpen)),
                          (F.settingsPanelOpen = Boolean(n.settingsPanelOpen)),
                          (F.layout = { ...F.layout, ...(n.layout || {}) }),
                          (F.interactionPanelLayout = mi({
                            ...F.interactionPanelLayout,
                            ...(n.interactionPanelLayout || {}),
                          })),
                          (F.interactionPanelManualPosition = Boolean(
                            n.interactionPanelManualPosition,
                          )),
                          r.includes(F.mode) || (F.mode = "dual"),
                          (F.opacity = rr(F.opacity)),
                          (F.fontSize = lr(F.fontSize)),
                          (F.subtitleMaxRows = 2),
                          (F.largeSegmentHistory = []),
                          (F.segmentQueue = []),
                          (F.activeSegment = null),
                          (F.displayedSegmentHistory = []),
                          (F.visibleLineCapacity = 0),
                          (F.subtitleRenderSignature = ""),
                          (F.largeRenderSignature = ""),
                          (F.subtitleSequence = 0),
                          (F.subtitleQueueSequence = 0),
                          (F.subtitleDisplayStats = {
                            receivedResponses: 0,
                            receivedSegments: 0,
                            queuedSegments: 0,
                            duplicateSegments: 0,
                            displayedSegments: 0,
                            droppedSegments: 0,
                            translationErrors: 0,
                          }),
                          (F.subtitleHadContent = !1),
                          (F.lastSubtitleActivityAt = 0),
                          (F.subtitleFading = !1),
                          (F.subtitleDisplayBlank = !1),
                          (function () {
                            if ("bottom" === F.positionMode && !F.collapsed)
                              return;
                            const e = F.collapsed
                              ? { width: 280, height: 30 }
                              : di();
                            li(e.width, e.height);
                          })());
                      }
                      ((F.replyPanelOpen = !1), (F.chatPanelOpen = !1));
                    })(),
                    pt(n, t),
                    yr(e),
                    ht(e, t),
                    Kt(),
                    await (async function (e = {}) {
                      const t = vu(e.initialPlaybackMediaTime);
                      if (
                        !e.syncEnabled ||
                        e.singleTabMediaSync ||
                        e.sourceIsLiveStream ||
                        null === t ||
                        t < 0
                      )
                        return {
                          aligned: !1,
                          skipped: !0,
                          reason: "not-applicable",
                        };
                      const n = Date.now(),
                        a = Cu(
                          1e3 *
                            (Math.max(
                              0,
                              vu(
                                e.effectiveSyncDelaySeconds ??
                                  e.syncDelaySeconds,
                              ) || 0,
                            ) +
                              15),
                          3e4,
                          12e4,
                        );
                      ((F.sync.startupAlignmentTargetMediaTime = t),
                        (F.sync.startupAlignmentStartedAtMs = n),
                        (F.sync.startupAlignmentIgnoreUntilMs = n + a),
                        (F.sync.startupAlignmentEchoIgnoredCount = 0));
                      let i = Yd();
                      const s = n;
                      for (; !i && Date.now() - s < 2500; )
                        (await new Promise((e) => window.setTimeout(e, 100)),
                          (i = Yd()));
                      if (!i) throw new Error("viewer 啟動時找不到影片");
                      const r = await rt(i, { reason: "startup-before-align" });
                      if (((i = r.video || i), !r.ready))
                        throw new Error(
                          `viewer 播放器尚未取得可播放資料 (${dt(r)})`,
                        );
                      const o = _o(i, t, { preserveVodStartupAnchor: !0 });
                      F.sync.startupAlignmentTargetMediaTime = o;
                      const l = vu(i.currentTime),
                        d = null === l || Math.abs(l - o) > _;
                      let c = { reached: !0, attempts: [] };
                      if (
                        d &&
                        ((c = await Po(i, o, {
                          requestedTargetMediaTime: t,
                          seekId: `viewer-startup:${F.sessionId || "pending"}`,
                        })),
                        !c.reached)
                      )
                        throw new Error("viewer 無法對齊字幕起點");
                      const u = await rt(i, {
                        reason: "startup-after-align",
                        targetMediaTime: o,
                      });
                      if (((i = u.video || i), !u.ready))
                        throw new Error(
                          `viewer 對齊後沒有可播放資料 (${dt(u)})`,
                        );
                      return (
                        bo(i, o),
                        (F.sync.ignoreViewerSeekUntilMs = Math.max(
                          Number(F.sync.ignoreViewerSeekUntilMs) || 0,
                          Date.now() + 1200,
                        )),
                        Ja(
                          "sync.viewer_startup_anchor.aligned",
                          {
                            requestedMediaTime: yn(t),
                            targetMediaTime: yn(o),
                            beforeMediaTime: yn(l),
                            afterMediaTime: yn(vu(i.currentTime)),
                            seekNeeded: d,
                            attempts: Array.isArray(c.attempts)
                              ? c.attempts.length
                              : 0,
                            waitedForVideoMs: Math.max(0, Date.now() - s),
                            readyState: Number(i.readyState) || 0,
                            networkState: Number(i.networkState) || 0,
                          },
                          "info",
                        ),
                        {
                          aligned: !0,
                          seekNeeded: d,
                          requestedMediaTime: t,
                          targetMediaTime: o,
                          currentTime: vu(i.currentTime),
                        }
                      );
                    })(e),
                    pt(n, t),
                    ll("init", { retry: !0 }),
                    F.sync.enabled ? qr() : (Or(), Kr(Yd())),
                    ei());
                })(e, t, a);
                tt = i;
                try {
                  await i;
                } finally {
                  tt === i && ((tt = null), (nt = ""));
                }
              })(e.config, e.sessionId)
                .then(() => n({ ok: !0, mounted: F.mounted, role: F.role }))
                .catch((e) => {
                  (console.warn(
                    "[live-subtitle] overlay init failed:",
                    e.message,
                  ),
                    n({ ok: !1, error: e?.message || "字幕匡初始化失敗" }));
                }),
              !0
            );
          if ("LIVE_SUBTITLE_SOURCE_INIT" !== e?.type) {
            if ("LIVE_SUBTITLE_SOURCE_CAPTURE_READY" === e?.type)
              return "source" !== F.role
                ? void n({ ok: !1, ignored: !0, reason: "not-source" })
                : ((async function (e = {}) {
                    const t = ku(e.sessionId || "");
                    if (!Te || !t || t !== ku(F.sessionId || "") || t !== Ae)
                      return {
                        released: !1,
                        ignored: !0,
                        reason: "inactive-or-stale-session",
                      };
                    const n = Yd();
                    if (!n) throw new Error("找不到來源影片");
                    const a =
                        vu(e.initialPlaybackMediaTime) ??
                        vu(xe) ??
                        vu(n.currentTime),
                      i = vu(n.currentTime);
                    let s = { reached: !0, attempts: [] };
                    if (
                      null !== a &&
                      (null === i || Math.abs(i - a) > _) &&
                      ((s = await Po(n, _o(n, a), {
                        requestedTargetMediaTime: a,
                        seekId: `startup-capture:${t}`,
                      })),
                      !s.reached)
                    )
                      throw new Error("來源影片無法回到字幕起點");
                    null !== a && Vt("source-startup-capture-ready", a);
                    const r = Math.max(0, Date.now() - (ke || Date.now()));
                    ((Te = !1),
                      (ke = 0),
                      (xe = null),
                      (Ae = ""),
                      (Ce = t),
                      (we = !1));
                    let o = !1;
                    try {
                      const e = n.play();
                      e?.catch &&
                        (await e.catch(() => {
                          o = !0;
                        }));
                    } catch {
                      o = !0;
                    }
                    return (
                      (o || n.paused) && Dr("startup-capture-ready"),
                      _r(n, {
                        sourceStartupCaptureReady: !0,
                        sourceStartupCaptureTargetMediaTime: a,
                        sourceStartupCaptureHeldMs: r,
                      }),
                      Ja(
                        "sync.source_startup_capture_hold.released",
                        {
                          targetMediaTime: a,
                          beforeMediaTime: i,
                          currentTime: vu(n.currentTime),
                          heldMs: r,
                          seekReached: Boolean(s.reached),
                          seekAttempts: Array.isArray(s.attempts)
                            ? s.attempts.length
                            : 0,
                          playBlocked: o,
                          paused: Boolean(n.paused),
                        },
                        o ? "warn" : "info",
                      ),
                      {
                        released: !0,
                        targetMediaTime: a,
                        currentTime: vu(n.currentTime),
                        heldMs: r,
                        playBlocked: o,
                      }
                    );
                  })(e)
                    .then((e) => n({ ok: !0, role: F.role, ...e }))
                    .catch((e) => {
                      (console.warn(
                        "[live-subtitle] source capture release failed:",
                        e.message,
                      ),
                        n({
                          ok: !1,
                          error: e?.message || "來源音訊起點放行失敗",
                        }));
                    }),
                  !0);
            if ("LIVE_SUBTITLE_MSE_AUDIO_REFRESH" !== e?.type)
              if ("LIVE_SUBTITLE_MSE_AUDIO_REPOST" !== e?.type)
                if ("WALLET_CACHE_AUTHORITY" !== e?.type)
                  if ("LIVE_SUBTITLE_CONFIG_UPDATE" !== e?.type)
                    if ("LIVE_SUBTITLE_EVENT" !== e?.type)
                      if ("LIVE_SUBTITLE_SOURCE_TIMING" === e?.type)
                        "source" !== F.role &&
                          ((function (e = null) {
                            if (!F.sync.enabled || !e || !1 === e.found) return;
                            if (!Hr(e)) return;
                            const t =
                              !0 === e.isLiveStream &&
                              !0 !== F.sync.sourceTiming?.isLiveStream;
                            if (
                              (t &&
                                !F.sync.singleTabMediaSync &&
                                (F.sync.startupSeekGuardUntilMs = Math.max(
                                  vu(F.sync.startupSeekGuardUntilMs) || 0,
                                  Date.now() + P,
                                )),
                              (F.sync.sourceTiming = {
                                ...e,
                                currentTime: vu(e.currentTime),
                                wallTimeMs: vu(e.wallTimeMs) || Date.now(),
                                playbackRate: vu(e.playbackRate) || 1,
                                paused: Boolean(e.paused),
                                liveEdgeSeconds: vu(e.liveEdgeSeconds),
                                actualDelaySeconds: vu(e.actualDelaySeconds),
                                mediaContextKey: Va(e.mediaContextKey || ""),
                                observedMediaContextKey: Va(
                                  e.observedMediaContextKey || "",
                                ),
                                canonicalMediaUrl: ku(
                                  e.canonicalMediaUrl || "",
                                ),
                                adPlaying: Boolean(e.adPlaying),
                                adSkippable: Boolean(e.adSkippable),
                                adReason: e.adReason || "",
                                adPlatform: e.adPlatform || e.platform || "",
                                seekId: e.seekId || null,
                                requestedTargetMediaTime: vu(
                                  e.requestedTargetMediaTime,
                                ),
                                actualSeekTargetMediaTime: vu(
                                  e.actualSeekTargetMediaTime,
                                ),
                              }),
                              t && Fr(F.sync.sourceTiming),
                              F.sync.delayBuffering &&
                                !F.sync.delayArmed &&
                                !0 === F.sync.sourceTiming.isLiveStream)
                            ) {
                              const e = Date.now();
                              ed(Wl(F.sync.sourceTiming, e), e);
                            }
                          })(e.timing),
                          Vr());
                      else {
                        if ("LIVE_SUBTITLE_SOURCE_SEEK" === e?.type)
                          return "source" === F.role
                            ? ((async function (e = {}) {
                                const t = vu(e.targetMediaTime);
                                if (null === t || t < 0)
                                  return (
                                    Ja(
                                      "sync.source_seek.invalid_target_rejected",
                                      {
                                        seekId: e.seekId || null,
                                        requestedTargetMediaTime: t,
                                      },
                                      "warn",
                                    ),
                                    {
                                      reached: !1,
                                      failureReason:
                                        "invalid-source-seek-target",
                                    }
                                  );
                                const n = (function (e = {}, t = null) {
                                  const n = vu(t) ?? vu(e.targetMediaTime) ?? 0;
                                  return `${ku(e.seekId || "no-seek-id")}:${n.toFixed(3)}`;
                                })(e, t);
                                if (Ue?.key === n) return Ue.promise;
                                const a = _e + 1;
                                _e = a;
                                const i = (async function (e = {}, t, n) {
                                  if (!dc())
                                    return {
                                      reached: !1,
                                      failureReason:
                                        "source-media-context-mismatch",
                                    };
                                  const a = Yd();
                                  if (!a)
                                    return {
                                      reached: !1,
                                      failureReason: "source-video-not-found",
                                    };
                                  const i = _o(a, t);
                                  we = !1;
                                  const s = await Po(a, i, {
                                    requestedTargetMediaTime: t,
                                    seekId: e.seekId || null,
                                  });
                                  if ((Ur(), s.reached)) {
                                    Vt("source-seek", i);
                                    try {
                                      const e = a.play();
                                      e?.catch && e.catch(() => {});
                                    } catch {}
                                  } else
                                    try {
                                      ((we = !0), a.pause());
                                    } catch {}
                                  const r = Qd("source", a);
                                  if (n !== _e)
                                    return (
                                      Ja(
                                        "sync.source_seek.stale_result_ignored",
                                        {
                                          seekId: e.seekId || null,
                                          requestedTargetMediaTime: t,
                                          actualSeekTargetMediaTime: i,
                                          currentTime: vu(r.currentTime),
                                          reached: s.reached,
                                          serial: n,
                                          latestSerial: _e,
                                        },
                                        "warn",
                                      ),
                                      {
                                        reached: !1,
                                        stale: !0,
                                        failureReason: "superseded-source-seek",
                                      }
                                    );
                                  const o = vu(r.currentTime);
                                  return (
                                    Ja(
                                      s.reached
                                        ? "sync.source_seek.success"
                                        : "sync.source_seek.failed",
                                      {
                                        seekId: e.seekId || null,
                                        requestedTargetMediaTime: t,
                                        actualSeekTargetMediaTime: i,
                                        currentTime: o,
                                        reached: s.reached,
                                        attempts: s.attempts,
                                        sourcePreloadEnabled: !1,
                                        transcriberPreparedBeforeSourceSeek:
                                          !0 ===
                                          e.transcriberPreparedBeforeSourceSeek,
                                        requestedSourcePreloadRate: vu(
                                          e.sourcePreloadPlaybackRate,
                                        ),
                                        actualSourcePlaybackRate: vu(
                                          a.playbackRate,
                                        ),
                                        failureReason: s.failureReason || "",
                                        error: s.error || "",
                                      },
                                      s.reached ? "info" : "warn",
                                    ),
                                    chrome.runtime
                                      .sendMessage({
                                        type: "LIVE_SUBTITLE_MEDIA_TIMING",
                                        sessionId: F.sessionId,
                                        role: "source",
                                        timing: {
                                          ...r,
                                          seekId:
                                            (s.reached && e.seekId) || null,
                                          failedSeekId: s.reached
                                            ? null
                                            : e.seekId || null,
                                          seekSucceeded: Boolean(s.reached),
                                          seekFailureReason:
                                            s.failureReason || "",
                                          requestedTargetMediaTime: t,
                                          actualSeekTargetMediaTime: i,
                                        },
                                      })
                                      .catch(() => {}),
                                    {
                                      reached: Boolean(s.reached),
                                      requestedTargetMediaTime: t,
                                      actualSeekTargetMediaTime: i,
                                      currentTime: o,
                                      attempts: s.attempts,
                                      failureReason: s.failureReason || "",
                                      error: s.error || "",
                                    }
                                  );
                                })(e, t, a).finally(() => {
                                  Ue?.serial === a && (Ue = null);
                                });
                                return (
                                  (Ue = { key: n, serial: a, promise: i }),
                                  i
                                );
                              })(e)
                                .then((e) =>
                                  n({
                                    ok: !1 !== e?.reached,
                                    role: F.role,
                                    ...(e || {}),
                                  }),
                                )
                                .catch((e) => {
                                  (console.warn(
                                    "[live-subtitle] source seek failed:",
                                    e.message,
                                  ),
                                    n({
                                      ok: !1,
                                      role: F.role,
                                      error:
                                        e?.message || "來源音訊起點對齊失敗",
                                    }));
                                }),
                              !0)
                            : void n({
                                ok: !1,
                                ignored: !0,
                                reason: "not-source",
                              });
                        if ("LIVE_SUBTITLE_SOURCE_PLAYBACK" === e?.type)
                          "source" === F.role &&
                            (async function (e = {}) {
                              if (!dc()) return;
                              const t = Yd();
                              if (!t) return;
                              const n =
                                "pause" === e.action
                                  ? "pause"
                                  : "play" === e.action
                                    ? "play"
                                    : "";
                              if (!n) return;
                              if ("play" === n && Te)
                                return (
                                  fr(t, "source-play-deferred"),
                                  void _r(t, {
                                    sourceStartupCapturePlayDeferred: !0,
                                    sourceStartupCaptureTargetMediaTime: vu(xe),
                                  })
                                );
                              const a =
                                  "pause" === n
                                    ? Pr(
                                        t,
                                        e.continuedLoadingMs ?? 0,
                                        e.viewerTiming || null,
                                      )
                                    : Er(0),
                                i = a.continuedLoadingMs;
                              "pause" === n &&
                                a.capped &&
                                Ja("sync.source_pause_continuation.capped", {
                                  requestedMs: a.requestedMs,
                                  continuedLoadingMs: i,
                                  currentLeadSeconds: yn(a.currentLeadSeconds),
                                  maximumLeadSeconds: yn(a.maximumLeadSeconds),
                                  sourceMediaTime: yn(vu(t.currentTime)),
                                  viewerMediaTime: yn(
                                    vu(e.viewerTiming?.currentTime),
                                  ),
                                });
                              try {
                                if ("pause" === n && i > 0)
                                  ((we = !1),
                                    Rr(),
                                    (function (e, t) {
                                      const n = Br(t);
                                      if ((Ur(), !e || n <= 0)) return !1;
                                      const a = Date.now();
                                      ((Ie = a + n), (we = !1));
                                      try {
                                        if (e.paused) {
                                          const t = e.play();
                                          t?.catch && t.catch(() => {});
                                        }
                                      } catch {}
                                      Pe = window.setTimeout(() => {
                                        if (((Pe = null), (Ie = 0), !dc()))
                                          return;
                                        const e = Yd();
                                        if (e) {
                                          we = !0;
                                          try {
                                            e.paused || e.pause();
                                          } catch {}
                                          _r(e, {
                                            pauseContinuationExpired: !0,
                                          });
                                        }
                                      }, n);
                                    })(t, i));
                                else if ("pause" === n)
                                  ((we = !0), Rr(), Ur(), t.pause());
                                else {
                                  ((we = !1), Ur());
                                  const e = t.play();
                                  (e?.catch && e.catch(() => {}),
                                    Dr("source-play-command"));
                                }
                              } catch {
                                "play" === n && Dr("source-play-command");
                              }
                              _r(t, {
                                pauseContinuationUntilMs: Ie || null,
                                pauseContinuationRequestedMs: a.requestedMs,
                                pauseContinuationAppliedMs: i,
                                pauseContinuationCurrentLeadSeconds:
                                  a.currentLeadSeconds,
                                pauseContinuationMaximumLeadSeconds:
                                  a.maximumLeadSeconds,
                              });
                            })(e).catch((e) => {
                              console.warn(
                                "[live-subtitle] source playback sync failed:",
                                e.message,
                              );
                            });
                        else if ("LIVE_SUBTITLE_SOURCE_RATE" === e?.type)
                          "source" === F.role &&
                            (function (e = {}) {
                              Ja("sync.source_preload.rate_ignored", {
                                requestedRate: vu(e.playbackRate),
                                reason: "source-playback-rate-control-removed",
                              });
                            })(e);
                        else {
                          if (
                            "LIVE_SUBTITLE_NATIVE_CANDIDATES_REQUEST" ===
                            e?.type
                          ) {
                            if ("source" === F.role) {
                              const t = xr(e.reason || "request", {
                                force: !0,
                              });
                              n({
                                ok: !0,
                                role: F.role,
                                count: t.count || 0,
                                nativeCandidateDiagnostics:
                                  t.candidateDiagnostics || null,
                              });
                            } else
                              n({ ok: !1, role: F.role, error: "not-source" });
                            return;
                          }
                          if ("LIVE_SUBTITLE_STOP" === e?.type) {
                            if (!ut(e, { requireSession: !0 })) return;
                            if (
                              (sl(),
                              bt(),
                              Sr(),
                              gr(),
                              Ur(),
                              Or(),
                              e.pauseMedia && Cr(),
                              "source" === F.role)
                            )
                              return;
                            ((F.sessionId = null),
                              zt({ resume: !e.pauseMedia }));
                          } else if ("LIVE_SUBTITLE_SOURCE_STOP" === e?.type) {
                            if (!ut(e, { requireSession: !0 })) return;
                            (bt(),
                              Sr(),
                              gr(),
                              Ur(),
                              e.pauseMedia
                                ? Cr()
                                : e.resumeMedia &&
                                  (function () {
                                    const e = Yd();
                                    if (e && e.paused)
                                      try {
                                        const t = e.play();
                                        t?.catch && t.catch(() => {});
                                      } catch {}
                                  })(),
                              "source" === F.role &&
                                de?.isConnected &&
                                ((F.sessionId = null),
                                de.remove(),
                                (F.mounted = !1)));
                          }
                        }
                      }
                    else {
                      if ("source" === F.role)
                        return void n({
                          ok: !1,
                          accepted: !1,
                          retryable: !1,
                          reason: "source-tab-does-not-display-subtitles",
                          deliveryId: e.event?.deliveryId || "",
                        });
                      if (!ut(e, { requireSession: !0 }))
                        return void n({
                          ok: !1,
                          accepted: !1,
                          retryable: !1,
                          reason: "stale-session",
                          deliveryId: e.event?.deliveryId || "",
                        });
                      try {
                        const t = (function (e = {}) {
                          if ("source" === F.role)
                            return {
                              accepted: !1,
                              retryable: !1,
                              reason: "source-role",
                            };
                          if (
                            (function (e = {}) {
                              const t = (function (e = {}) {
                                return ku(
                                  e?.sessionId ||
                                    e?.context?.sessionId ||
                                    e?.sync?.sessionId ||
                                    e?.latency?.sessionId ||
                                    "",
                                );
                              })(e);
                              if (!t) return !1;
                              const n = ku(F.sessionId || "");
                              return !(
                                !n ||
                                t === n ||
                                (Ja(
                                  "subtitle.event.drop_session_mismatch",
                                  {
                                    kind: ku(e.kind || ""),
                                    status: ku(e.status || ""),
                                    eventSessionId: t,
                                    currentSessionId: n,
                                    pageUrl: ku(
                                      e.pageUrl || e.context?.pageUrl || "",
                                    ).slice(0, 180),
                                    currentUrl: ku(location.href).slice(0, 180),
                                  },
                                  "warn",
                                ),
                                0)
                              );
                            })(e)
                          )
                            return {
                              accepted: !1,
                              retryable: !1,
                              reason: "stale-session-context",
                            };
                          if (
                            "status" === e.kind &&
                            ("stopped" === e.status || "已停止" === e.message)
                          )
                            return (
                              (F.sessionId = null),
                              zt(),
                              { accepted: !0, reason: "stopped" }
                            );
                          if (
                            (function (e = {}) {
                              return (
                                !!Xt() &&
                                !!Yt(e) &&
                                ((F.sync.pendingCachedReplayActivation = !1),
                                xo(),
                                Ja(
                                  "subtitle.cache.disabled_drop",
                                  {
                                    kind: ku(e.kind || ""),
                                    provider: ku(
                                      e.provider || e.latency?.provider || "",
                                    ),
                                    cacheReplay: !0 === e.cacheReplay,
                                    cacheHit: !0 === e.cacheHit,
                                    segments: Array.isArray(e.segments)
                                      ? e.segments.length
                                      : 0,
                                    pageUrl: ku(
                                      e.pageUrl ||
                                        e.context?.pageUrl ||
                                        e.sync?.pageUrl ||
                                        "",
                                    ).slice(0, 180),
                                  },
                                  "info",
                                ),
                                !0)
                              );
                            })(e)
                          )
                            return {
                              accepted: !1,
                              retryable: !1,
                              reason: "subtitle-cache-disabled",
                            };
                          if (
                            ((function (e = {}) {
                              const t = Wa() || $a(e);
                              t &&
                                (F.displayMediaContextKey
                                  ? (F.displayMediaContextKey !== t &&
                                      (!(function (e, t, n = {}) {
                                        (sl(),
                                          Wo("media-context-change", {
                                            log: !1,
                                            seekBack: !1,
                                          }),
                                          rl(),
                                          (Ke = null),
                                          xn(),
                                          En(),
                                          Uc(),
                                          en(),
                                          ma("media-context-change", {
                                            resume: !1,
                                          }),
                                          ga("media-context-change", {
                                            resume: !1,
                                          }),
                                          To(),
                                          Ka(),
                                          (F.pendingOriginal = ""),
                                          (F.pendingOriginalUpdatedAt = 0),
                                          (F.displayedOriginalText = ""),
                                          (F.displayedSegmentHistory = []),
                                          (F.finalOriginal = ""),
                                          (F.finalTranslation = ""),
                                          (F.subtitleHadContent = !1),
                                          (F.lastSubtitleActivityAt = 0),
                                          (F.subtitleSequence = 0),
                                          (F.subtitleQueueSequence = 0),
                                          (F.subtitleDisplayStats = {
                                            receivedResponses: 0,
                                            receivedSegments: 0,
                                            queuedSegments: 0,
                                            duplicateSegments: 0,
                                            displayedSegments: 0,
                                            droppedSegments: 0,
                                            translationErrors: 0,
                                          }),
                                          (F.sync.singleTabMseFirstCueShown =
                                            !1),
                                          (F.sync.singleTabMseInitialCueShortcutDisabled =
                                            !1),
                                          (F.sync.subtitleBufferPrimed = !1),
                                          (F.sync.pendingSubtitleRanges = []),
                                          (F.sync.subtitlePipelineRangeVersions =
                                            {}),
                                          (F.sync.pendingCachedReplayActivation =
                                            !1),
                                          (F.sync.lastCachedReplayResumeAttemptAtMs = 0),
                                          (F.sync.cacheReplayStartupHoldStartedAtMs = 0),
                                          (F.sync.mseStartupWaitActive = !1),
                                          (F.sync.mseStartupWaitReleased = !1),
                                          (F.sync.mseStartupWaitStartedAt = 0),
                                          (F.sync.mseStartupWaitReadyAt = 0),
                                          (F.sync.mseStartupWaitLastTimeoutLogAt = 0),
                                          (F.sync.mseStartupBuiltDelayInsaneLogAt = 0),
                                          (F.sync.mseStartupWaitReason = ""),
                                          (F.sync.mseStartupWaitTargetMediaTime =
                                            null),
                                          (F.sync.mseStartupWaitResumeRequested =
                                            !1),
                                          (F.status = "影片已切換，等待新字幕"),
                                          Ja(
                                            "subtitle.media_context.changed",
                                            {
                                              previousContext: e,
                                              currentContext: t,
                                              kind: ku(n.kind || ""),
                                              currentUrl: ku(
                                                location.href,
                                              ).slice(0, 180),
                                              eventUrl: ku(
                                                n.pageUrl ||
                                                  n.href ||
                                                  n.sourceUrl ||
                                                  n.context?.pageUrl ||
                                                  "",
                                              ).slice(0, 180),
                                            },
                                            "warn",
                                          ));
                                      })(F.displayMediaContextKey, t, e),
                                      (F.displayMediaContextKey = t)),
                                    !F.sync.enabled &&
                                      F.sessionId &&
                                      "display" === F.role &&
                                      mt(F.config) &&
                                      mt(F.config) !== t &&
                                      cc())
                                  : (F.displayMediaContextKey = t));
                            })(e),
                            F.mounted || Kt(),
                            Ga(),
                            (function (e = {}) {
                              if (
                                !e ||
                                "status" === e.kind ||
                                "error" === e.kind ||
                                "usage" === e.kind
                              )
                                return !1;
                              const t = $a(e);
                              if (!t) return !1;
                              const n = Wa();
                              return !(
                                !n ||
                                t === n ||
                                (Ja(
                                  "subtitle.event.drop_context_mismatch",
                                  {
                                    kind: ku(e.kind || ""),
                                    eventContext: t,
                                    currentContext: n,
                                    pageUrl: ku(
                                      e.pageUrl ||
                                        e.sync?.pageUrl ||
                                        e.context?.pageUrl ||
                                        "",
                                    ).slice(0, 180),
                                    currentUrl: ku(location.href).slice(0, 180),
                                  },
                                  "warn",
                                ),
                                0)
                              );
                            })(e))
                          )
                            return {
                              accepted: !1,
                              retryable: !1,
                              reason: "stale-media-context",
                            };
                          if ("status" === e.kind)
                            (("switching-source" !== e.status &&
                              "media-context-reset" !== e.status) ||
                              (Bn({
                                blank: !0,
                                clearPending: !0,
                                clearQueue: !0,
                                clearHistory: !0,
                              }),
                              Ka(),
                              (F.displayedOriginalText = "")),
                              (F.status = e.message || e.status || "字幕中"));
                          else if ("speech-activity" === e.kind)
                            !(function (e = {}) {
                              if (!1 === e.active || !1 === e.speech) return;
                              const t = Date.now();
                              ((F.sync.lastSpeechActivityAt = t),
                                F.sync.speechActivityStartedAt ||
                                  (F.sync.speechActivityStartedAt = t),
                                (F.sync.adaptiveSubtitleHoldTimedOutKey = ""));
                            })(e);
                          else if ("subtitle-pipeline-range" === e.kind)
                            !(function (e = {}) {
                              if (!F.sync) return;
                              Nn();
                              const t = Vn(e),
                                n = (function (e = {}, t = null) {
                                  const n = ku(
                                    e.pipelineRangeId ||
                                      e.rangeId ||
                                      e.segmentId ||
                                      e.requestId ||
                                      "",
                                  );
                                  if (n) return n;
                                  const a = t || Vn(e);
                                  return a ? `${yn(a.start)}:${yn(a.end)}` : "";
                                })(e, t);
                              if (!t || !n) return;
                              const a = vu(e.deliverySequence),
                                i =
                                  F.sync.subtitlePipelineRangeVersions ||
                                  (F.sync.subtitlePipelineRangeVersions = {}),
                                s = vu(i[n]);
                              if (null !== a && null !== s && a < s)
                                return void Ja(
                                  "subtitle.pipeline_range.stale_delivery_ignored",
                                  {
                                    pipelineRangeId: n,
                                    stage: ku(
                                      e.stage ||
                                        e.phase ||
                                        e.status ||
                                        "pending",
                                    ),
                                    deliverySequence: a,
                                    latestDeliverySequence: s,
                                    mediaStartTime: yn(t.start),
                                    mediaEndTime: yn(t.end),
                                  },
                                  "warn",
                                );
                              if ((null !== a && (i[n] = a), $n(e)))
                                return (
                                  (function (e = {}, t = null, n = "") {
                                    if (!F.sync || !t || !n) return null;
                                    const a = ku(
                                        e.stage ||
                                          e.phase ||
                                          e.status ||
                                          "done",
                                      ).toLowerCase(),
                                      i = ku(
                                        e.reason || e.outcome || "",
                                      ).toLowerCase(),
                                      s =
                                        "no-text" === a ||
                                        "empty" === a ||
                                        "silence" === i,
                                      r = vu(
                                        e.timelineRevision ??
                                          e.sync?.timelineRevision,
                                      ),
                                      o = [
                                        n,
                                        null === r ? "na" : r,
                                        yn(t.start),
                                        yn(t.end),
                                      ].join(":"),
                                      l = {
                                        key: n,
                                        completionKey: o,
                                        start: t.start,
                                        end: t.end,
                                        stage: a,
                                        reason: i,
                                        noText: s,
                                        failed:
                                          /^(failed|error|dropped|stale|stopped)$/.test(
                                            a,
                                          ),
                                        timelineRevision: r,
                                        deliverySequence: vu(
                                          e.deliverySequence,
                                        ),
                                        mediaContextKey: Wa(),
                                        completedAtMs: Date.now(),
                                      },
                                      d = Array.isArray(
                                        F.sync.completedSubtitleRanges,
                                      )
                                        ? F.sync.completedSubtitleRanges
                                        : [],
                                      c = d.findIndex(
                                        (e) => e.completionKey === o,
                                      );
                                    (c >= 0 ? (d[c] = l) : d.push(l),
                                      (F.sync.completedSubtitleRanges =
                                        d.slice(-1800)));
                                  })(e, t, n),
                                  Wn({ key: n, range: t }),
                                  void (function (e = {}, t = null) {
                                    const n = F.sync?.singleTabMseStartupGate;
                                    if (
                                      !(
                                        n?.active &&
                                        F.sessionId &&
                                        t &&
                                        "stt-quality-rejected" === e.reason &&
                                        $n(e)
                                      )
                                    )
                                      return !1;
                                    if (
                                      e.sessionId &&
                                      e.sessionId !== F.sessionId
                                    )
                                      return !1;
                                    if (
                                      e.mediaContextKey &&
                                      e.mediaContextKey !== Wa()
                                    )
                                      return !1;
                                    const a = vu(e.timelineRevision),
                                      i = vu(n.timelineRevision);
                                    if (null !== a && null !== i && a !== i)
                                      return !1;
                                    const s = vu(n.anchorMediaTime);
                                    !(
                                      null === s ||
                                      t.start > s + 0.05 ||
                                      t.end <= s
                                    ) && Xo("startup-stt-quality-rejected");
                                  })(e, t)
                                );
                              const r = Date.now(),
                                o = Array.isArray(F.sync.pendingSubtitleRanges)
                                  ? F.sync.pendingSubtitleRanges
                                  : [],
                                l = {
                                  key: n,
                                  start: t.start,
                                  end: t.end,
                                  stage: ku(
                                    e.stage || e.phase || e.status || "pending",
                                  ),
                                  updatedAtMs: r,
                                  expiresAtMs: r + 3e4,
                                },
                                d = o.findIndex((e) => e.key === n);
                              (d >= 0
                                ? (o[d] = {
                                    ...o[d],
                                    ...l,
                                    start: Math.min(o[d].start, l.start),
                                    end: Math.max(o[d].end, l.end),
                                  })
                                : o.push(l),
                                (F.sync.pendingSubtitleRanges = o.slice(-64)));
                            })(e);
                          else if ("mse-readiness" === e.kind)
                            !(function (e = {}) {
                              const t = sa({
                                trigger: ku(e.reason || "canonical-readiness"),
                                event: e,
                                segments: [],
                                allowReadinessLedger:
                                  !F.sync.mseStartupWaitActive ||
                                  F.sync.mseStartupWaitReleased,
                                allowActualSubtitleBuffer: !0,
                              });
                              if (F.sync.mseStartupWaitReleased) return t;
                              if (
                                !F.sync.mseStartupWaitActive ||
                                !_l() ||
                                !$l(e)
                              )
                                return t;
                              const n =
                                e.sync?.mseStartupReadiness ||
                                e.mseStartupReadiness ||
                                {};
                              if (
                                ![
                                  n.startupReleaseReadyDecision?.range,
                                  n.readySubtitleLeadDecision?.range,
                                  ...(Array.isArray(n.startupReleaseReadyRanges)
                                    ? n.startupReleaseReadyRanges
                                    : []),
                                  ...(Array.isArray(n.readySubtitleRanges)
                                    ? n.readySubtitleRanges
                                    : []),
                                ].some((e) => {
                                  const t = cn(e);
                                  return Boolean(t && t.end > t.start);
                                })
                              )
                                return (
                                  Ja(
                                    "mse.startup_wait.canonical_readiness_unready_ignored",
                                    {
                                      reason: ku(e.reason || "mse-readiness"),
                                      mediaTime: vu(
                                        e.sync?.mediaTime ?? e.mediaTime,
                                      ),
                                      mediaTimeEnd: vu(
                                        e.sync?.mediaTimeEnd ?? e.mediaTimeEnd,
                                      ),
                                      readySubtitleLeadSeconds: vu(
                                        n.readySubtitleLeadSeconds,
                                      ),
                                      releaseRequiredLeadSeconds: vu(
                                        n.releaseRequiredLeadSeconds,
                                      ),
                                      startupReleaseReady:
                                        !0 === n.startupReleaseReady,
                                    },
                                    "warn",
                                  ),
                                  !1
                                );
                              const a = Al(e, []);
                              if (!a.coverageReady || (Cl() && !a.leadReady))
                                return (ul(e, [], a), !1);
                              (Ja("mse.startup_wait.canonical_readiness", {
                                reason: ku(
                                  e.reason || "mse-readiness-delivered",
                                ),
                                readyLeadSeconds: a.readyLeadSeconds,
                                requiredLeadSeconds: a.requiredLeadSeconds,
                                coverageGapSeconds: a.coverageGapSeconds,
                                staleGapSeconds: a.staleGapSeconds,
                                releaseProbeMediaTime: a.releaseProbeMediaTime,
                                coverageStartMediaTime:
                                  a.coverageStartMediaTime,
                                coverageEndMediaTime: a.coverageEndMediaTime,
                              }),
                                Il("mse-readiness-delivered", e, [], {
                                  forced: !1,
                                  readyLeadSeconds: a.readyLeadSeconds,
                                  requiredLeadSeconds: a.requiredLeadSeconds,
                                  maxCoverageGapSeconds:
                                    a.maxCoverageGapSeconds,
                                  rawLeadSeconds: a.rawLeadSeconds,
                                  rawLeadReleaseReady: a.rawLeadReleaseReady,
                                  vodRawAudioLeadReady: a.vodRawAudioLeadReady,
                                  coverageGapSeconds: a.coverageGapSeconds,
                                  staleGapSeconds: a.staleGapSeconds,
                                  releaseProbeMediaTime:
                                    a.releaseProbeMediaTime,
                                  coverageStartMediaTime:
                                    a.coverageStartMediaTime,
                                  coverageEndMediaTime: a.coverageEndMediaTime,
                                  audioCoveredLeadingGap: Boolean(
                                    a.audioCoveredLeadingGap,
                                  ),
                                  audioCoverageStartMediaTime: vu(
                                    a.audioCoverageStartMediaTime,
                                  ),
                                  leadingGapAwaitingPipeline: Boolean(
                                    a.leadingGapAwaitingPipeline,
                                  ),
                                  leadingGapPendingPipelineRange:
                                    a.leadingGapPendingPipelineRange,
                                }));
                            })(e);
                          else if ("transcript" === e.kind) {
                            if (!e.isFinal && jt())
                              return {
                                accepted: !1,
                                retryable: !1,
                                reason: "interim-disabled",
                              };
                            if (
                              (function (e = {}) {
                                const t = Zt();
                                if (!t) return !1;
                                const n = dn(e, []);
                                return !(
                                  !n ||
                                  rn(n, t, { allowFuture: $l(e) }) ||
                                  (pn("transcript", 1, e, t, n), 0)
                                );
                              })(e)
                            )
                              return {
                                accepted: !1,
                                retryable: !1,
                                reason: "seek-guard",
                              };
                            const t = ku(e.text);
                            (F.activeSegment ||
                              0 !== F.segmentQueue.length ||
                              (F.status = e.isFinal
                                ? "已定稿，等待同步翻譯"
                                : "辨識中"),
                              (F.pendingOriginal = t || F.pendingOriginal),
                              t &&
                                ((F.pendingOriginalUpdatedAt = Date.now()),
                                (F.sync.adaptiveSubtitleHoldTimedOutKey = "")),
                              t &&
                                F.subtitleHadContent &&
                                Xa() &&
                                (En(),
                                (F.subtitleFading = !1),
                                (F.subtitleDisplayBlank = !1)),
                              t && Xa() && An(),
                              e.isFinal
                                ? ((F.finalOriginal = t),
                                  (F.draftOriginal = ""))
                                : (F.draftOriginal = t));
                          } else if ("translation" === e.kind) {
                            if (!e.isFinal && jt())
                              return {
                                accepted: !1,
                                retryable: !1,
                                reason: "interim-disabled",
                              };
                            const t = ku(e.translation),
                              n =
                                ku(e.original) ||
                                F.pendingOriginal ||
                                F.draftOriginal ||
                                F.finalOriginal,
                              a = (function (e, t, n) {
                                const a = Array.isArray(e.segments)
                                    ? e.segments
                                    : [],
                                  i = $a(e) || Wa(),
                                  s = $l(e, a),
                                  r =
                                    e.sync?.mseStartupReadiness ||
                                    e.mseStartupReadiness ||
                                    null,
                                  o = s && !1 !== e.isFinal ? Tl(e) : [],
                                  l = (function (e) {
                                    const t = [];
                                    for (const n of e || []) {
                                      const e = t[t.length - 1];
                                      (e && Jt(e, n)) || t.push(n);
                                    }
                                    return t;
                                  })(
                                    a
                                      .map((t, n) => ({
                                        id: String(t.id || `segment-${n + 1}`),
                                        order: Number.isFinite(Number(t.order))
                                          ? Number(t.order)
                                          : n,
                                        original: ku(t.original),
                                        translation: ku(t.translation),
                                        segmentationMethod: ku(
                                          t.segmentationMethod ||
                                            t.method ||
                                            "",
                                        ),
                                        splitReason: ku(
                                          t.splitReason || t.reason || "",
                                        ),
                                        isComplete: Boolean(t.isComplete),
                                        mediaTime: vu(
                                          t.mediaTime ?? t.media_time,
                                        ),
                                        displayAfterMediaTime: vu(
                                          t.displayAfterMediaTime ??
                                            t.display_after_media_time,
                                        ),
                                        audioStartMediaTime: vu(
                                          t.audioStartMediaTime ??
                                            t.audio_start_media_time,
                                        ),
                                        audioEndMediaTime: vu(
                                          t.audioEndMediaTime ??
                                            t.audio_end_media_time,
                                        ),
                                        mediaTimeEnd: vu(
                                          t.mediaTimeEnd ?? t.media_time_end,
                                        ),
                                        timingSource: ku(
                                          t.timingSource || t.source || "",
                                        ),
                                        fallbackDisplayed: Boolean(
                                          t.fallbackDisplayed ||
                                            e.fallbackDisplayed,
                                        ),
                                        lateAfterOriginalFallback: Boolean(
                                          t.lateAfterOriginalFallback ||
                                            e.lateAfterOriginalFallback,
                                        ),
                                        cacheCandidateId: ku(
                                          t.cacheCandidateId || "",
                                        ),
                                        walletCacheRequestId: String(
                                          t.walletCacheRequestId || "",
                                        ),
                                        mseFinal: Boolean(
                                          t.mseFinal || (s && !0 === e.isFinal),
                                        ),
                                        mseStartupReadiness:
                                          t.mseStartupReadiness || r,
                                        mseProcessedAudioRanges: Array.isArray(
                                          t.mseProcessedAudioRanges,
                                        )
                                          ? t.mseProcessedAudioRanges
                                          : o,
                                        mediaContextKey: Va(
                                          t.mediaContextKey ||
                                            t.videoKey ||
                                            t.cacheVideoKey ||
                                            i ||
                                            "",
                                        ),
                                      }))
                                      .filter(
                                        (e) =>
                                          e.original &&
                                          e.translation &&
                                          (!e.walletCacheRequestId ||
                                            (!0 ===
                                              F.config?.walletCacheManaged &&
                                              F.config.walletCacheRequestIds?.includes(
                                                e.walletCacheRequestId,
                                              ))),
                                      )
                                      .map((t) => Qt(t, e))
                                      .filter(
                                        (e) => !e.timelineProjectionRejected,
                                      )
                                      .sort(Ra)
                                      .map((e, t) => ({ ...e, order: t })),
                                  );
                                if (l.length) return l;
                                if (a.some((e) => e.walletCacheRequestId))
                                  return [];
                                if (!t || !n) return [];
                                const d = Qt(
                                  {
                                    id: "segment-1",
                                    order: 0,
                                    original: t,
                                    translation: n,
                                    segmentationMethod: "fallback",
                                    splitReason: "single-pair-fallback",
                                    isComplete: !0,
                                    mseFinal: Boolean(s && !0 === e.isFinal),
                                    mseStartupReadiness: r,
                                    mseProcessedAudioRanges: o,
                                    mediaTime: vu(e.mediaTime),
                                    displayAfterMediaTime: vu(
                                      e.displayAfterMediaTime,
                                    ),
                                    mediaContextKey: i,
                                  },
                                  e,
                                );
                                return d.timelineProjectionRejected ? [] : [d];
                              })(e, n, t);
                            (e.isFinal &&
                              (function (e = {}) {
                                const t = Vn(e);
                                t && Wn({ range: t });
                              })(e),
                              (F.lastDetectedSourceLang = $i(
                                e.detectedLang ||
                                  e.segmentation?.sourceLanguage ||
                                  F.lastDetectedSourceLang,
                                F.lastDetectedSourceLang,
                              )),
                              (function (e = {}, t = []) {
                                if (!F.sync.enabled) return;
                                const n = vu(
                                    e.sync?.pipelineLatencyMs ??
                                      e.pipelineLatencyMs ??
                                      e.latencyMs,
                                  ),
                                  a = (function (e = {}, t = [], n = null) {
                                    const a = e.sync || {},
                                      i = vu(a.translationReadyAtMs),
                                      s = vu(
                                        a.pipelineStartMs ??
                                          a.audioStartWallTimeMs ??
                                          a.sourceWallTimeMs ??
                                          a.transcriptReceivedAtMs,
                                      );
                                    if (null !== i && null !== s && i > s)
                                      return i - s;
                                    const r = vu(
                                        a.sourceMediaTime ?? e.sourceMediaTime,
                                      ),
                                      o = (function (e = []) {
                                        const t = (Array.isArray(e) ? e : [])
                                          .map((e) => Aa(e))
                                          .filter((e) => null !== e);
                                        return t.length ? Math.min(...t) : null;
                                      })(t);
                                    if (null !== r && null !== o && r > o)
                                      return 1e3 * (r - o);
                                    const l = vu(
                                      a.pipelineLatencyMs ??
                                        e.pipelineLatencyMs ??
                                        n,
                                    );
                                    return null !== l && l > 0 ? l : null;
                                  })(e, t, n);
                                if (
                                  (null === n || n <= 0) &&
                                  (null === a || a <= 0)
                                )
                                  return;
                                (null !== n &&
                                  n > 0 &&
                                  (F.sync.latencySamples.push(n),
                                  F.sync.latencySamples.length > 60 &&
                                    (F.sync.latencySamples =
                                      F.sync.latencySamples.slice(-60))),
                                  null !== a &&
                                    a > 0 &&
                                    (F.sync.requiredDelaySamples.push(a),
                                    F.sync.requiredDelaySamples.length > 180 &&
                                      (F.sync.requiredDelaySamples =
                                        F.sync.requiredDelaySamples.slice(
                                          -180,
                                        ))));
                                const i = null !== a && a > 0 ? a : n;
                                if (null !== i && i > 0) {
                                  const t = Dd(
                                    e.provider || e.model || F.config?.provider,
                                  );
                                  ((F.sync.lastLatencyProviderKey = t),
                                    (function (e, t = Rd(), n = Date.now()) {
                                      const a = vu(e);
                                      if (null === a || a <= 0) return;
                                      const i = (function (e = Date.now()) {
                                        const t = Ld(e);
                                        return `h${String(t).padStart(2, "0")}`;
                                      })(n);
                                      for (const e of [Dd(t), "all"]) {
                                        const t = xd(e, i);
                                        t.samples = kd([
                                          ...(t.samples || []),
                                          { ms: a, t: n },
                                        ]);
                                      }
                                      ((F.sync.latencyProfile.updatedAt =
                                        new Date(n).toISOString()),
                                        Je && window.clearTimeout(Je),
                                        (Je = window.setTimeout(() => {
                                          ((Je = null), Ed().catch(() => {}));
                                        }, 2e3)));
                                    })(i, t));
                                }
                                ((F.sync.recommendedDelaySeconds = Md()),
                                  "auto" !== F.sync.mode ||
                                    F.sync.delayArmed ||
                                    F.sync.delayBuffering ||
                                    F.sync.pendingViewerSeek ||
                                    (F.sync.targetDelaySeconds =
                                      F.sync.recommendedDelaySeconds));
                              })(e, a),
                              (F.latency = Fc(e.latency || e.sync || e)),
                              e.isFinal &&
                                ((F.subtitleDisplayStats.receivedResponses += 1),
                                (F.subtitleDisplayStats.receivedSegments +=
                                  a.length)));
                            const i = (function (e = null) {
                              const t = vu(e?.totalMs);
                              return null === t ? "" : `延遲 ${Su(t / 1e3)}`;
                            })(F.latency);
                            if (
                              ((F.status = `${e.isFinal ? `已翻譯 ${a.length || 1} 段` : `字幕隊列 ${a.length || 1} 段`}${i ? ` · ${i}` : ""}`),
                              !e.isFinal && t)
                            )
                              return (
                                An(),
                                (F.currentOriginal = n),
                                (F.currentTranslation = t),
                                (F.translationSource =
                                  n || F.translationSource),
                                (F.translationUpdatedAt = Date.now()),
                                (F.draftOriginal = n),
                                (F.draftTranslation = t),
                                (F.status = "即時字幕" + (i ? ` · ${i}` : "")),
                                Cn(),
                                ei(),
                                Ja(
                                  "subtitle.interim_preview.displayed",
                                  {
                                    original: {
                                      chars: Array.from(n).length,
                                      preview: n.slice(0, 160),
                                    },
                                    translation: {
                                      chars: Array.from(t).length,
                                      preview: t.slice(0, 160),
                                    },
                                    mediaTime: vu(
                                      e.sync?.sourceMediaStartTime ??
                                        e.mediaTime,
                                    ),
                                    mediaTimeEnd: vu(
                                      e.sync?.sourceMediaEndTime ??
                                        e.sync?.mediaTimeEnd,
                                    ),
                                    timingSource: e.sync?.timingSource || "",
                                    provider: e.provider || "",
                                  },
                                  "info",
                                ),
                                {
                                  accepted: !0,
                                  reason: "interim-preview-replaced",
                                }
                              );
                            (a.length
                              ? ((function (e, t = {}) {
                                  const n = Date.now(),
                                    a =
                                      F.segmentQueue.length +
                                      (F.activeSegment ? 1 : 0),
                                    i = vu(
                                      t.timelineRevision ??
                                        t.sync?.timelineRevision,
                                    ),
                                    s = $l(t, e),
                                    r =
                                      t.sync?.mseStartupReadiness ||
                                      t.mseStartupReadiness ||
                                      null,
                                    o = s && !1 !== t.isFinal ? Tl(t) : [],
                                    l = e.map((l, d) =>
                                      gn(
                                        {
                                          ...l,
                                          timelineRevision:
                                            vu(l?.timelineRevision) ?? i,
                                          mseBufferedSource:
                                            !0 === l?.mseBufferedSource || s,
                                          mseFinal: Boolean(
                                            l?.mseFinal ||
                                              (s && !0 === t.isFinal),
                                          ),
                                          mseStartupReadiness:
                                            l?.mseStartupReadiness || r,
                                          mseProcessedAudioRanges:
                                            Array.isArray(
                                              l?.mseProcessedAudioRanges,
                                            )
                                              ? l.mseProcessedAudioRanges
                                              : o,
                                        },
                                        n,
                                        {
                                          incomingBatchIndex: d,
                                          incomingBatchSize: e.length,
                                          queueBacklogAtEnqueue: a,
                                        },
                                      ),
                                    ),
                                    d = Yt(t);
                                  d && La(l, t);
                                  const c = d
                                      ? l
                                      : (function (e, t = {}) {
                                          if (
                                            ya() ||
                                            (F.sync.enabled &&
                                              !F.sync.singleTabMediaSync)
                                          )
                                            return Array.isArray(e) ? e : [];
                                          const n = Pa();
                                          if (
                                            !Array.isArray(e) ||
                                            !e.length ||
                                            !F.subtitleTimelineCache.length ||
                                            (!F.sync.cachedSubtitleReplay
                                              ?.active &&
                                              !n)
                                          )
                                            return e;
                                          const a = n?.segments?.length
                                              ? n.segments.slice()
                                              : F.subtitleTimelineCache.slice(),
                                            i = n
                                              ? (function (e = Pa()) {
                                                  if (!e?.segments?.length)
                                                    return [];
                                                  const t = e.segments
                                                      .filter(
                                                        (e) =>
                                                          !0 !==
                                                          e?.fallbackDisplayed,
                                                      )
                                                      .map((e) => on(e))
                                                      .filter(
                                                        (e) =>
                                                          e && e.end > e.start,
                                                      )
                                                      .sort(
                                                        (e, t) =>
                                                          e.start - t.start ||
                                                          e.end - t.end,
                                                      ),
                                                    n = [];
                                                  for (const e of t) {
                                                    const t = n[n.length - 1];
                                                    !t || e.start > t.end + 1.1
                                                      ? n.push({
                                                          start: e.start,
                                                          end: e.end,
                                                        })
                                                      : (t.end = Math.max(
                                                          t.end,
                                                          e.end,
                                                        ));
                                                  }
                                                  return n.map((e) => ({
                                                    displayAfterMediaTime:
                                                      e.start,
                                                    mediaTime: e.start,
                                                    audioStartMediaTime:
                                                      e.start,
                                                    audioEndMediaTime: e.end,
                                                    mediaTimeEnd: e.end,
                                                  }));
                                                })(n)
                                              : a,
                                            s = [],
                                            r = [];
                                          for (const n of e) {
                                            const e = on(n, t),
                                              o = vu(e?.start),
                                              l = vu(e?.end);
                                            if (
                                              null === o ||
                                              null === l ||
                                              l <= o
                                            ) {
                                              (s.push(n), a.push(n));
                                              continue;
                                            }
                                            const d = l - o,
                                              c = Ia({ start: o, end: l }, i),
                                              u = Math.max(0, d - c),
                                              m = d > 0 ? c / d : 0;
                                            (!0 === n.fallbackDisplayed ||
                                              !a.some((e) => {
                                                if (!0 !== e?.fallbackDisplayed)
                                                  return !1;
                                                const t = Aa(e),
                                                  n = Ca(e);
                                                return (
                                                  null !== t &&
                                                  null !== n &&
                                                  n > o &&
                                                  t < l
                                                );
                                              })) &&
                                            m >= 0.92 &&
                                            u <= 0.35
                                              ? r.push({
                                                  segment: n,
                                                  coverageRatio: m,
                                                  coveredSeconds: c,
                                                  uncoveredSeconds: u,
                                                })
                                              : (s.push(n),
                                                a.push(n),
                                                i.push(n));
                                          }
                                          if (r.length) {
                                            const t = r[0];
                                            Ja(
                                              "subtitle.timeline.drop_covered_duplicate",
                                              {
                                                droppedSegments: r.length,
                                                incomingSegments: e.length,
                                                mediaTime: Aa(t.segment),
                                                mediaTimeEnd: Ca(t.segment),
                                                coverageRatio: yn(
                                                  t.coverageRatio,
                                                ),
                                                coveredSeconds: yn(
                                                  t.coveredSeconds,
                                                ),
                                                uncoveredSeconds: yn(
                                                  t.uncoveredSeconds,
                                                ),
                                                original: ku(
                                                  t.segment?.original,
                                                ).slice(0, 160),
                                              },
                                              "info",
                                            );
                                          }
                                          return s;
                                        })(l, t),
                                    u = Sn(
                                      c,
                                      [
                                        F.activeSegment,
                                        ...F.segmentQueue,
                                        ...F.subtitleTimelineCache,
                                      ].filter(Boolean),
                                      "incoming-fallback",
                                    );
                                  d || La(u, t);
                                  const m = (function (e, t = {}) {
                                      if (!Yt(t)) return e;
                                      const n = (function () {
                                          const e = Qd("viewer"),
                                            t = vu(e?.currentTime);
                                          if (
                                            e?.found &&
                                            null !== t &&
                                            t >= 0 &&
                                            (t > 0.25 ||
                                              (Number(e.readyState) >= 1 &&
                                                !0 !== e.seeking))
                                          )
                                            return {
                                              mediaTime: t,
                                              timing: e,
                                              clockReady: !0,
                                            };
                                          const n = td();
                                          if (null !== n && n > 0.25)
                                            return {
                                              mediaTime: n,
                                              timing: {
                                                currentTime: n,
                                                wallTimeMs: Date.now(),
                                                playbackRate:
                                                  F.sync.viewerPlaybackRate ||
                                                  1,
                                                paused:
                                                  0 ===
                                                  F.sync.viewerPlaybackRate,
                                              },
                                            };
                                          const a = vu(
                                            F.config
                                              ?.initialPlaybackMediaTime ??
                                              F.config?.initialMediaTime ??
                                              F.config
                                                ?.pageCurrentTimeSeconds ??
                                              F.config?.startSeconds,
                                          );
                                          if (null !== a && a > 0.25)
                                            return {
                                              mediaTime: a,
                                              timing: {
                                                currentTime: a,
                                                wallTimeMs: Date.now(),
                                                playbackRate:
                                                  e?.playbackRate || 1,
                                                paused: Boolean(e?.paused),
                                              },
                                            };
                                          const i = (function (e = "") {
                                            try {
                                              const t = new URL(
                                                e,
                                                location.href,
                                              );
                                              return (function (e = "") {
                                                const t = String(e || "")
                                                  .trim()
                                                  .toLowerCase();
                                                if (!t) return null;
                                                if (/^\d+(?:\.\d+)?$/.test(t))
                                                  return Math.max(0, Number(t));
                                                if (/^\d+(?:\.\d+)?s$/.test(t))
                                                  return Math.max(
                                                    0,
                                                    Number(t.slice(0, -1)),
                                                  );
                                                const n = t.match(
                                                  /^(?:(\d+(?:\.\d+)?)h)?(?:(\d+(?:\.\d+)?)m)?(?:(\d+(?:\.\d+)?)s?)?$/,
                                                );
                                                if (
                                                  !n ||
                                                  (!n[1] && !n[2] && !n[3])
                                                )
                                                  return null;
                                                const a =
                                                  3600 * Number(n[1] || 0) +
                                                  60 * Number(n[2] || 0) +
                                                  Number(n[3] || 0);
                                                return Number.isFinite(a)
                                                  ? Math.max(0, a)
                                                  : null;
                                              })(
                                                t.searchParams.get("t") ||
                                                  t.searchParams.get("start") ||
                                                  t.hash.replace(/^#/, ""),
                                              );
                                            } catch {
                                              return null;
                                            }
                                          })(location.href);
                                          return null !== i && i > 0.25
                                            ? {
                                                mediaTime: i,
                                                timing: {
                                                  currentTime: i,
                                                  wallTimeMs: Date.now(),
                                                  playbackRate:
                                                    e?.playbackRate || 1,
                                                  paused: Boolean(e?.paused),
                                                },
                                              }
                                            : null !== t
                                              ? {
                                                  mediaTime: t,
                                                  timing: e,
                                                  clockReady: !1,
                                                }
                                              : {
                                                  mediaTime: 0,
                                                  timing: e,
                                                  clockReady: !1,
                                                };
                                        })(),
                                        a = vu(n?.mediaTime);
                                      if (
                                        null === a ||
                                        a < 0 ||
                                        (a <= 0.25 && !0 !== n?.clockReady)
                                      )
                                        return (
                                          (F.sync.pendingCachedReplayActivation =
                                            !0),
                                          Ja(
                                            "subtitle.cache.initial_replay_deferred",
                                            {
                                              targetMediaTime: a,
                                              incomingSegments: Array.isArray(e)
                                                ? e.length
                                                : 0,
                                              cacheSegments:
                                                F.subtitleTimelineCache.length,
                                            },
                                            "warn",
                                          ),
                                          []
                                        );
                                      const i = ko(a);
                                      if (!i?.queueSegments?.length)
                                        return (
                                          (F.status =
                                            "目前時間沒有快取字幕，等待即時字幕補齊"),
                                          (F.sync.pendingCachedReplayActivation =
                                            !0),
                                          Ja(
                                            "subtitle.cache.initial_replay_miss",
                                            {
                                              targetMediaTime: a,
                                              incomingSegments: Array.isArray(e)
                                                ? e.length
                                                : 0,
                                              cacheSegments:
                                                F.subtitleTimelineCache.length,
                                            },
                                            "warn",
                                          ),
                                          []
                                        );
                                      const s = Vl(),
                                        r = Do(a, i, "initial-replay");
                                      if (s && !r) {
                                        const e = Lo(a, i, "initial-replay");
                                        return (
                                          (F.status =
                                            "已找到部分快取字幕，正在提前補齊後續缺口"),
                                          (F.sync.pendingCachedReplayActivation =
                                            !0),
                                          Ja(
                                            "subtitle.cache.initial_replay_prefetch_hold",
                                            {
                                              targetMediaTime: a,
                                              cacheStartMediaTime: vu(
                                                i.cacheStartMediaTime,
                                              ),
                                              cacheEndMediaTime: vu(
                                                i.cacheEndMediaTime,
                                              ),
                                              contiguousCacheEndMediaTime: vu(
                                                e.contiguousCacheEndMediaTime,
                                              ),
                                              cacheLeadSeconds: vu(
                                                e.cacheLeadSeconds,
                                              ),
                                              minLeadSeconds: vu(
                                                e.minLeadSeconds,
                                              ),
                                              latencyP95Seconds: vu(
                                                e.latencyP95Seconds,
                                              ),
                                              latencySource: ku(
                                                e.latencySource || "",
                                              ),
                                            },
                                            "info",
                                          ),
                                          []
                                        );
                                      }
                                      ((F.sync.pendingCachedReplayActivation =
                                        !1),
                                        xn(),
                                        Uc(),
                                        F.sync.cachedSubtitleReplay?.active ||
                                          To());
                                      const o = Date.now();
                                      return (
                                        (F.sync.cachedSubtitleReplay = {
                                          active: !0,
                                          targetMediaTime: a,
                                          cacheStartMediaTime:
                                            i.cacheStartMediaTime,
                                          cacheEndMediaTime:
                                            i.cacheEndMediaTime,
                                          allowRedisplay: !1,
                                          startedAtMs: o,
                                          lastStatusAtMs: 0,
                                        }),
                                        Ea(i.queueSegments, a),
                                        (F.sync.pendingViewerSeek = null),
                                        (F.sync.delayBuffering = !1),
                                        (F.sync.delayArmed = !0),
                                        (F.sync.delayArmedAt = o),
                                        (F.sync.ready = !0),
                                        (F.sync.targetDelaySeconds = bd()),
                                        (vu(F.sync.lockedDelaySeconds) ?? 0) <
                                          2 &&
                                          (F.sync.lockedDelaySeconds = null),
                                        (F.sync.viewerMediaTime = a),
                                        (F.sync.viewerWallTimeMs =
                                          vu(n?.timing?.wallTimeMs) || o),
                                        (F.sync.viewerPlaybackRate = n?.timing
                                          ?.paused
                                          ? 0
                                          : vu(n?.timing?.playbackRate) || 1),
                                        (F.status = "使用已快取字幕回放"),
                                        (F.largeSegmentHistory =
                                          i.contextSegments.map((e) => ({
                                            ...e,
                                            cacheReplay: !0,
                                          }))),
                                        (F.displayedOriginalText =
                                          i.contextSegments
                                            .map((e) => ku(e.original))
                                            .filter(Boolean)
                                            .join(" ")),
                                        (F.subtitleHadContent =
                                          i.contextSegments.length > 0 ||
                                          i.queueSegments.length > 0),
                                        (F.subtitleFading = !1),
                                        (F.subtitleDisplayBlank = !1),
                                        Ja(
                                          "subtitle.cache.initial_replay_start",
                                          {
                                            targetMediaTime: a,
                                            cacheStartMediaTime:
                                              i.cacheStartMediaTime,
                                            cacheEndMediaTime:
                                              i.cacheEndMediaTime,
                                            queuedSegments:
                                              i.queueSegments.length,
                                            contextSegments:
                                              i.contextSegments.length,
                                            incomingSegments: Array.isArray(e)
                                              ? e.length
                                              : 0,
                                            cacheSegments:
                                              F.subtitleTimelineCache.length,
                                          },
                                          "info",
                                        ),
                                        i.queueSegments.map((e) => ({
                                          ...e,
                                          cacheReplay: !0,
                                        }))
                                      );
                                    })(u, t),
                                    y = (function (e, t = {}) {
                                      const n = Zt();
                                      if (!n || !Array.isArray(e) || !e.length)
                                        return e;
                                      const a = [],
                                        i = [],
                                        s = $l(t, e);
                                      for (const r of e) {
                                        const e = on(r, t);
                                        !e || rn(e, n, { allowFuture: s })
                                          ? a.push(r)
                                          : i.push({ segment: r, range: e });
                                      }
                                      return i.length
                                        ? ((F.subtitleDisplayStats.droppedSegments +=
                                            i.length),
                                          pn(
                                            "translation",
                                            i.length,
                                            t,
                                            n,
                                            (function (e = []) {
                                              const t = e
                                                .map((e) => e?.range)
                                                .filter(
                                                  (e) => null !== vu(e?.start),
                                                );
                                              return t.length
                                                ? {
                                                    start: Math.min(
                                                      ...t.map((e) => e.start),
                                                    ),
                                                    end: Math.max(
                                                      ...t.map((e) => e.end),
                                                    ),
                                                  }
                                                : null;
                                            })(i),
                                          ),
                                          a)
                                        : e;
                                    })(m, t),
                                    p = (function (e, t = {}) {
                                      if (
                                        !Sa() ||
                                        !Array.isArray(e) ||
                                        !e.length
                                      )
                                        return e;
                                      if (
                                        !Array.isArray(
                                          F.displayedSegmentHistory,
                                        ) ||
                                        !F.displayedSegmentHistory.length
                                      )
                                        return e;
                                      const n = [],
                                        a = [];
                                      for (const i of e) {
                                        const e = vn(i, t);
                                        e.reason
                                          ? a.push({ segment: i, decision: e })
                                          : n.push(i);
                                      }
                                      if (!a.length) return e;
                                      F.subtitleDisplayStats.droppedSegments +=
                                        a.length;
                                      const i = a[0] || {};
                                      return (
                                        Ja(
                                          "subtitle.queue.drop_visible_timeline_overlap",
                                          {
                                            reason: i.decision?.reason || "",
                                            droppedSegments: a.length,
                                            incomingSegments: e.length,
                                            eventMediaTime: vu(
                                              t.mediaTime ??
                                                t.displayAfterMediaTime ??
                                                t.sync?.mediaTime,
                                            ),
                                            mediaTime: Aa(i.segment),
                                            mediaTimeEnd: Ca(i.segment),
                                            latestDisplayed: Tn(),
                                            coverageRatio: yn(
                                              i.decision?.coverageRatio,
                                            ),
                                            coveredSeconds: yn(
                                              i.decision?.coveredSeconds,
                                            ),
                                            uncoveredSeconds: yn(
                                              i.decision?.uncoveredSeconds,
                                            ),
                                            viewerMediaTime: yn(
                                              i.decision?.viewerMediaTime,
                                            ),
                                            original: ku(
                                              i.segment?.original,
                                            ).slice(0, 160),
                                          },
                                          "warn",
                                        ),
                                        n
                                      );
                                    })(
                                      (function (e) {
                                        if (
                                          !e.length ||
                                          !F.displayedSegmentHistory.length
                                        )
                                          return e;
                                        let t = 0;
                                        for (const n of e) {
                                          if (!bn(n)) break;
                                          t += 1;
                                        }
                                        return t <= 0
                                          ? e
                                          : ((F.subtitleDisplayStats.droppedSegments +=
                                              t),
                                            Ja(
                                              "subtitle.queue.drop_displayed_duplicate",
                                              {
                                                droppedSegments: t,
                                                incomingSegments: e.length,
                                                firstDropped:
                                                  e[0]?.original || "",
                                                firstKept: e[t]?.original || "",
                                              },
                                              "warn",
                                            ),
                                            e.slice(t));
                                      })(y),
                                      t,
                                    );
                                  if (!Yn(p)) return;
                                  const g = F.activeSegment
                                      ? p.findIndex((e) =>
                                          Jt(e, F.activeSegment),
                                        )
                                      : -1,
                                    f = g >= 0 ? p.slice(g + 1) : p,
                                    S = F.segmentQueue.length,
                                    h = Sn(F.segmentQueue, f, "display-queue"),
                                    b =
                                      !0 === t.cacheUpgrade
                                        ? (function (e = [], t = []) {
                                            const n = new Set(
                                                (t || []).map(Fa),
                                              ),
                                              a = new Set((t || []).map(Ha));
                                            return n.size
                                              ? (e || []).filter(
                                                  (e) =>
                                                    !n.has(Fa(e)) ||
                                                    a.has(Ha(e)),
                                                )
                                              : e;
                                          })(h, f)
                                        : h,
                                    v = fn(b, f),
                                    M = Yn(v),
                                    w = Yn(F.segmentQueue);
                                  M &&
                                    M !== w &&
                                    ((F.lastQueueSignature = M),
                                    (F.segmentQueue = v),
                                    (F.subtitleDisplayStats.queuedSegments +=
                                      Math.max(0, v.length - S)),
                                    F.sync.singleTabMseFirstCueShown &&
                                      !F.sync.subtitleBufferPrimed &&
                                      sa({
                                        trigger: "actual-subtitle-buffer-ready",
                                        event: t,
                                        segments: v,
                                        allowReadinessLedger: !1,
                                        allowActualSubtitleBuffer: !0,
                                      }),
                                    (function (e = {}) {
                                      if (!F.activeSegment || !ye) return !0;
                                      const t = F.segmentQueue[0] || null,
                                        n = vu(F.activeSegment.displayedAtMs),
                                        a = vu(
                                          F.activeSegment
                                            .plannedDisplayDurationMs,
                                        );
                                      return (
                                        !(aa(F.activeSegment) > 0) &&
                                        (!(!t || null === Aa(t)) ||
                                          (!(
                                            null !== n &&
                                            null !== a &&
                                            Date.now() - n < a
                                          ) &&
                                            !ba(F.activeSegment) &&
                                            (!!e.isFinal ||
                                              (function () {
                                                if (!fa() || !F.activeSegment)
                                                  return !1;
                                                if (ba(F.activeSegment))
                                                  return !1;
                                                const e = oa(F.activeSegment);
                                                return null !== e && e > C;
                                              })())))
                                      );
                                    })(t) && (ga("subtitle-ready"), kn()));
                                })(a, e),
                                (function (e = {}, t = []) {
                                  const n = sa({
                                    trigger: ku(
                                      e.reason || "mse-final-readiness",
                                    ),
                                    event: e,
                                    segments: t,
                                    allowReadinessLedger:
                                      !F.sync.mseStartupWaitActive ||
                                      F.sync.mseStartupWaitReleased,
                                    allowActualSubtitleBuffer: !0,
                                  });
                                  if (F.sync.mseStartupWaitReleased || !_l())
                                    return n;
                                  if (!1 === e.isFinal) return !1;
                                  if (!dn(e, t)) return !1;
                                  if (!$l(e, t) && !al()) return !1;
                                  if (
                                    !F.sync.mseStartupWaitActive ||
                                    !vu(F.sync.mseStartupWaitStartedAt)
                                  ) {
                                    if (
                                      ((F.sync.mseStartupWaitReadyAt =
                                        Date.now()),
                                      Ja(
                                        "mse.startup_wait.release_without_start",
                                        {
                                          segmentCount: Array.isArray(t)
                                            ? t.length
                                            : 0,
                                          sourceType:
                                            e.sync?.sourceType ||
                                            e.sourceType ||
                                            "",
                                          audioInputMode:
                                            e.sync?.audioInputMode ||
                                            e.audioInputMode ||
                                            "",
                                          mediaTime: vu(
                                            e.sync?.mediaTime ?? e.mediaTime,
                                          ),
                                          mediaTimeEnd: vu(
                                            e.sync?.mediaTimeEnd ??
                                              e.mediaTimeEnd,
                                          ),
                                        },
                                        "warn",
                                      ),
                                      !(vl() > 0))
                                    )
                                      return Il("llm-final-translation", e, t, {
                                        forced: !1,
                                        withoutStart: !0,
                                      });
                                    {
                                      const e = Yd();
                                      ((F.sync.mseStartupWaitActive = !0),
                                        (F.sync.mseStartupWaitReleased = !1),
                                        (F.sync.mseStartupWaitStartedAt = Sl()),
                                        (F.sync.mseStartupWaitReason =
                                          "late-prime"),
                                        (F.sync.mseStartupWaitTargetMediaTime =
                                          vu(e?.currentTime)),
                                        (F.sync.mseStartupWaitResumeRequested =
                                          Boolean(
                                            F.sync
                                              .mseStartupWaitResumeRequested ||
                                              !F.sync.userPaused ||
                                              (e && !e.paused),
                                          )),
                                        gd(
                                          e,
                                          Math.max(
                                            0,
                                            vu(F.sync.targetDelaySeconds) ??
                                              vu(F.config?.syncDelaySeconds) ??
                                              0,
                                          ),
                                        ),
                                        (F.sync.ready = !1));
                                    }
                                  }
                                  F.sync.mseStartupWaitReadyAt = Date.now();
                                  const a = Al(e, t);
                                  if (!a.coverageReady)
                                    return (
                                      Ja(
                                        "mse.startup_wait.coverage_gap_hold",
                                        {
                                          readyLeadSeconds: a.readyLeadSeconds,
                                          requiredLeadSeconds:
                                            a.requiredLeadSeconds,
                                          maxCoverageGapSeconds:
                                            a.maxCoverageGapSeconds,
                                          rawLeadSeconds: a.rawLeadSeconds,
                                          rawLeadReleaseReady: Boolean(
                                            a.rawLeadReleaseReady,
                                          ),
                                          vodRawAudioLeadReady: Boolean(
                                            a.vodRawAudioLeadReady,
                                          ),
                                          coverageGapSeconds:
                                            a.coverageGapSeconds,
                                          staleGapSeconds: a.staleGapSeconds,
                                          releaseProbeMediaTime:
                                            a.releaseProbeMediaTime,
                                          coverageStartMediaTime:
                                            a.coverageStartMediaTime,
                                          coverageEndMediaTime:
                                            a.coverageEndMediaTime,
                                          leadingGapAwaitingPipeline: Boolean(
                                            a.leadingGapAwaitingPipeline,
                                          ),
                                          leadingGapPendingPipelineRange:
                                            a.leadingGapPendingPipelineRange,
                                          segmentCount: Array.isArray(t)
                                            ? t.length
                                            : 0,
                                        },
                                        "warn",
                                      ),
                                      ul(e, t, a),
                                      !1
                                    );
                                  const i = Cl();
                                  if (!a.leadReady && i)
                                    return (ul(e, t, a), !1);
                                  (a.leadReady ||
                                    Ja(
                                      "mse.startup_wait.ready_lead_low_release",
                                      {
                                        readyLeadSeconds: a.readyLeadSeconds,
                                        requiredLeadSeconds:
                                          a.requiredLeadSeconds,
                                        maxCoverageGapSeconds:
                                          a.maxCoverageGapSeconds,
                                        rawLeadSeconds: a.rawLeadSeconds,
                                        rawLeadReleaseReady: Boolean(
                                          a.rawLeadReleaseReady,
                                        ),
                                        vodRawAudioLeadReady: Boolean(
                                          a.vodRawAudioLeadReady,
                                        ),
                                        coverageGapSeconds:
                                          a.coverageGapSeconds,
                                        releaseProbeMediaTime:
                                          a.releaseProbeMediaTime,
                                        coverageStartMediaTime:
                                          a.coverageStartMediaTime,
                                        coverageEndMediaTime:
                                          a.coverageEndMediaTime,
                                        segmentCount: Array.isArray(t)
                                          ? t.length
                                          : 0,
                                      },
                                      "info",
                                    ),
                                    Il("llm-final-translation", e, t, {
                                      forced: !1,
                                      readyLeadSeconds: a.readyLeadSeconds,
                                      requiredLeadSeconds:
                                        a.requiredLeadSeconds,
                                      maxCoverageGapSeconds:
                                        a.maxCoverageGapSeconds,
                                      rawLeadSeconds: a.rawLeadSeconds,
                                      rawLeadReleaseReady:
                                        a.rawLeadReleaseReady,
                                      vodRawAudioLeadReady:
                                        a.vodRawAudioLeadReady,
                                      coverageGapSeconds: a.coverageGapSeconds,
                                      staleGapSeconds: a.staleGapSeconds,
                                      releaseProbeMediaTime:
                                        a.releaseProbeMediaTime,
                                      coverageStartMediaTime:
                                        a.coverageStartMediaTime,
                                      coverageEndMediaTime:
                                        a.coverageEndMediaTime,
                                      audioCoveredLeadingGap: Boolean(
                                        a.audioCoveredLeadingGap,
                                      ),
                                      audioCoverageStartMediaTime: vu(
                                        a.audioCoverageStartMediaTime,
                                      ),
                                      leadingGapAwaitingPipeline: Boolean(
                                        a.leadingGapAwaitingPipeline,
                                      ),
                                      leadingGapPendingPipelineRange:
                                        a.leadingGapPendingPipelineRange,
                                    }));
                                })(e, a),
                                Vo())
                              : t &&
                                (An(),
                                (F.currentOriginal = n),
                                (F.currentTranslation = t),
                                (F.translationSource =
                                  n || F.translationSource),
                                (F.translationUpdatedAt = Date.now()),
                                (F.pendingOriginal = ""),
                                (F.pendingOriginalUpdatedAt = 0),
                                (F.draftOriginal = ""),
                                Vo(),
                                Cn()),
                              e.isFinal &&
                                ((F.finalTranslation = t),
                                (F.draftTranslation = "")));
                          } else
                            "translation-error" === e.kind
                              ? ((F.subtitleDisplayStats.translationErrors += 1),
                                (!0 !== e.clearPending &&
                                  !1 !== e.recoverable) ||
                                  (function (e) {
                                    const t = Ya(e);
                                    t &&
                                      (jn(F.pendingOriginal, t) &&
                                        (F.pendingOriginal = ""),
                                      jn(F.draftOriginal, t) &&
                                        (F.draftOriginal = ""),
                                      jn(F.finalOriginal, t) &&
                                        (F.finalOriginal = ""),
                                      F.pendingOriginal ||
                                        F.draftOriginal ||
                                        (F.draftTranslation = ""),
                                      F.pendingOriginal ||
                                        (F.pendingOriginalUpdatedAt = 0));
                                  })(e.original),
                                (F.status =
                                  e.message || "翻譯失敗，等待下一句"),
                                F.activeSegment ||
                                  F.segmentQueue.length ||
                                  Qn() ||
                                  (F.subtitleDisplayBlank = !1),
                                Pn() || Cn())
                              : "error" === e.kind
                                ? (function (e = "") {
                                    return _l() && Pt(e);
                                  })(e.message)
                                  ? ((F.status = "MSE audio buffer 連線恢復中"),
                                    Et(e.message || "display-error"))
                                  : (F.status = e.message || "發生錯誤")
                                : "usage" === e.kind &&
                                  (Rs(e.usage || e),
                                  F.usage.latency &&
                                    (F.latency = F.usage.latency));
                          return (
                            ei(),
                            { accepted: !0, reason: "event-accepted" }
                          );
                        })(e.event);
                        n({
                          ok: !1 !== t?.accepted,
                          accepted: !1 !== t?.accepted,
                          retryable: !1 !== t?.retryable,
                          reason: t?.reason || "event-accepted",
                          deliveryId: e.event?.deliveryId || "",
                        });
                      } catch (t) {
                        (console.error(
                          "[live-subtitle] event delivery failed:",
                          t,
                        ),
                          n({
                            ok: !1,
                            accepted: !1,
                            retryable: !0,
                            reason: "content-event-handler-failed",
                            error: t?.message || String(t),
                            deliveryId: e.event?.deliveryId || "",
                          }));
                      }
                    }
                  else
                    try {
                      (pr(e.config || {}, {
                        sessionId: e.sessionId,
                        requiresRestart: Boolean(e.requiresRestart),
                        restartReasons: e.restartReasons || [],
                      }),
                        "source" === F.role && gt(F.config),
                        n({ ok: !0, role: F.role, mounted: F.mounted }));
                    } catch (e) {
                      (console.warn(
                        "[live-subtitle] config update failed:",
                        e.message,
                      ),
                        n({ ok: !1, error: e?.message || "字幕設定套用失敗" }));
                    }
                else
                  n(
                    (function (e) {
                      if (
                        e.sessionId !== F.sessionId ||
                        e.videoKey !== Wa() ||
                        !Number.isSafeInteger(e.revision) ||
                        e.revision <=
                          Number(F.config?.walletCacheAuthorityRevision || 0)
                      )
                        return { ok: !0, ignored: !0 };
                      const t = new Set(
                        (e.requestIds || [])
                          .filter((e) => "string" == typeof e)
                          .slice(0, 2),
                      );
                      F.config = {
                        ...F.config,
                        walletCacheManaged: !0,
                        walletCacheRequestIds: [...t],
                        walletCacheAuthorityRevision: e.revision,
                        cachedSubtitleCoverageRanges: e.coverageRanges || [],
                        cachedSubtitleCoverageReliable: !0,
                      };
                      const n = new Map(
                          (F.subtitleTimelineCache || [])
                            .filter((e) => t.has(e.walletCacheRequestId))
                            .map((e) => [Ha(e), e]),
                        ),
                        a = (e) => {
                          if (
                            !e?.walletCacheRequestId ||
                            t.has(e.walletCacheRequestId)
                          )
                            return e;
                          const a = n.get(Ha(e));
                          return a
                            ? {
                                ...e,
                                walletCacheRequestId: a.walletCacheRequestId,
                              }
                            : null;
                        };
                      if (
                        ((F.subtitleTimelineCache = (
                          F.subtitleTimelineCache || []
                        )
                          .map(a)
                          .filter(Boolean)),
                        (F.subtitleTimelineCacheBytes = za(
                          F.subtitleTimelineCache,
                        )),
                        (F.segmentQueue = (F.segmentQueue || [])
                          .map(a)
                          .filter(Boolean)),
                        (F.largeSegmentHistory = (F.largeSegmentHistory || [])
                          .map(a)
                          .filter(Boolean)),
                        F.activeSegment?.walletCacheRequestId)
                      ) {
                        const e = a(F.activeSegment);
                        e
                          ? (F.activeSegment = e)
                          : (xn(),
                            (F.activeSegment = null),
                            (F.currentOriginal = ""),
                            (F.currentTranslation = ""),
                            (F.translationSource = ""),
                            (F.translationUpdatedAt = 0),
                            (F.subtitleRenderSignature = ""),
                            (F.largeRenderSignature = ""),
                            F.segmentQueue.length ? kn() : ei());
                      }
                      return { ok: !0 };
                    })(e),
                  );
              else
                try {
                  if (e.sessionId && F.sessionId && e.sessionId !== F.sessionId)
                    return void n({
                      ok: !0,
                      ignored: !0,
                      reason: "stale-session",
                    });
                  const t = Mt(e);
                  n({ ok: !0, role: F.role, requestPosted: t, requested: t });
                } catch (e) {
                  (console.warn(
                    "[live-subtitle] MSE audio repost failed:",
                    e.message,
                  ),
                    n({
                      ok: !1,
                      error: e?.message || "MSE audio repost failed",
                    }));
                }
            else
              try {
                if (e.sessionId && F.sessionId && e.sessionId !== F.sessionId)
                  return void n({
                    ok: !0,
                    ignored: !0,
                    reason: "stale-session",
                  });
                (e.config && (F.config = e.config),
                  e.sessionId && (F.sessionId = e.sessionId),
                  ht(F.config, F.sessionId, {
                    retryPostedSegments:
                      Boolean(e.retryPostedSegments) || Pt(e.reason || ""),
                  }),
                  n({
                    ok: !0,
                    role: F.role,
                    mseAudioEnabled: F.mseAudio.enabled,
                  }));
              } catch (e) {
                (console.warn(
                  "[live-subtitle] MSE audio refresh failed:",
                  e.message,
                ),
                  n({
                    ok: !1,
                    error: e?.message || "MSE audio refresh failed",
                  }));
              }
          } else
            try {
              (!(function (e = {}, t = null) {
                (sl(),
                  gr(),
                  (F.config = e),
                  (F.sessionId = t),
                  (F.role = "source"),
                  zt(),
                  Or(),
                  Ur(),
                  (function (e = {}, t = null) {
                    const n = ku(t || ""),
                      a = Boolean(
                        e.sourceStartupCaptureHold &&
                          e.syncEnabled &&
                          !e.singleTabMediaSync,
                      );
                    if (a && n && n === Ce)
                      return (
                        (Te = !1),
                        (ke = 0),
                        (xe = null),
                        (Ae = ""),
                        (we = !1),
                        Ja("sync.source_startup_capture_hold.rearm_ignored", {
                          reason: "already-released-session",
                        }),
                        !1
                      );
                    if (
                      ((Te = a),
                      (ke = a ? Date.now() : 0),
                      (xe = a ? vu(e.initialPlaybackMediaTime) : null),
                      (Ae = a ? n : ""),
                      (we = a),
                      !a)
                    )
                      return !1;
                    const i = fr(Yd(), "source-init");
                    Ja(
                      "sync.source_startup_capture_hold.armed",
                      {
                        targetMediaTime: vu(xe),
                        audioInputMode: ku(e.audioInputMode || ""),
                        held: i,
                      },
                      i ? "info" : "warn",
                    );
                  })(e, t),
                  ht(e, t),
                  gt(e),
                  (function () {
                    Sr({ preserveMirrorCaptureLayout: !0 });
                    const e = () => {
                      if (!dc()) return;
                      const e = Yd();
                      (fr(e, "source-probe"), vr(e, "source-probe"));
                      const t = Qd("source", e || void 0);
                      (!(function (e = null, t = null) {
                        "source" === F.role &&
                          F.sessionId &&
                          F.config?.syncEnabled &&
                          !F.config?.singleTabMediaSync &&
                          e &&
                          t?.paused &&
                          !t.adPlaying &&
                          !we &&
                          Dr("source-paused-watchdog", 12e3);
                      })(e, t),
                        chrome.runtime
                          .sendMessage({
                            type: "LIVE_SUBTITLE_MEDIA_TIMING",
                            sessionId: F.sessionId,
                            role: "source",
                            timing: t,
                          })
                          .catch(() => {}));
                    };
                    (e(),
                      (Se = window.setInterval(e, 250)),
                      (function () {
                        if ((Tr(), !kr())) return;
                        const e = (e = "poll") => {
                          kr() && dc() && xr(e);
                        };
                        if (
                          (e("start"),
                          (De = window.setInterval(() => {
                            e("poll");
                          }, 500)),
                          "function" == typeof PerformanceObserver)
                        )
                          try {
                            Le = new PerformanceObserver(() => {
                              e("performance");
                            });
                            try {
                              Le.observe({ type: "resource", buffered: !0 });
                            } catch {
                              Le.observe({ entryTypes: ["resource"] });
                            }
                          } catch {
                            Le = null;
                          }
                      })(),
                      Dr("probe-start"));
                  })(),
                  Te || Dr("source-init"));
              })(e.config, e.sessionId),
                n({ ok: !0, role: F.role }));
            } catch (e) {
              (console.warn("[live-subtitle] source init failed:", e.message),
                n({ ok: !1, error: e?.message || "來源分頁初始化失敗" }));
            }
        } else {
          try {
            vt();
          } catch {}
          const e = Yd();
          n({
            ok: !0,
            installed: Boolean(F.mseAudio.installed),
            hookVersion: vu(F.mseAudio.hookVersion),
            expectedHookVersion: 29,
            installDocumentId: F.mseAudio.installDocumentId || "",
            installDocumentReadyState:
              F.mseAudio.installDocumentReadyState || "",
            installedDuringDocumentLoading:
              !0 === F.mseAudio.installedDuringDocumentLoading,
            installedAt: vu(F.mseAudio.hookInstalledAt),
            currentTime: vu(e?.currentTime),
            paused: Boolean(e?.paused),
            readyState: Math.max(0, Number(e?.readyState || 0)),
          });
        }
      else n(Pd());
    else n({ ok: !0, ready: !0 });
  }
  function ut(e = {}, t = {}) {
    const n = ku(e.sessionId || ""),
      a = ku(F.sessionId || "");
    return n ? !!a && n === a : !t.requireSession && !a;
  }
  function mt(e = {}) {
    return (
      Va(
        e.viewerMediaContextKey ||
          e.sourceMediaContextKey ||
          e.cacheVideoKey ||
          "",
      ) ||
      gc(e.canonicalPageUrl || e.pageUrl || "") ||
      ""
    );
  }
  function yt(e = {}, t = null) {
    if (!t || F.sessionId !== t || "display" !== F.role || !F.mounted)
      return !1;
    const n = mt(F.config || {}),
      a = mt(e);
    if (n && a) return n === a;
    const i = F.config?.canonicalPageUrl || F.config?.pageUrl || "",
      s = e.canonicalPageUrl || e.pageUrl || "";
    return Boolean(i && s && uc(i, s));
  }
  function pt(e, t) {
    if (e !== at || F.sessionId !== t || "display" !== F.role)
      throw new Error("viewer 字幕初始化已被新的 session 取代");
  }
  function gt(e = F.config || {}) {
    return (
      ft(
        e?.mirrorCaptureLayout
          ? "legacy-source-layout-disabled"
          : "source-layout-preserved",
      ),
      !1
    );
  }
  function ft(e = "source-stopped") {
    const n =
        document.getElementById?.(
          "ai-live-subtitle-source-mirror-capture-style",
        ) || null,
      a = "youtube-cover" === document.documentElement?.getAttribute?.(t),
      i = Boolean(he || be?.isConnected || n?.isConnected || a);
    return (
      document.documentElement?.removeAttribute?.(t),
      be?.isConnected && be.remove(),
      n?.isConnected && n !== be && n.remove(),
      (be = null),
      (he = !1),
      i &&
        Ja(
          "mirror.source_capture_layout",
          { action: "restored", mode: "youtube-cover", reason: e },
          "info",
        ),
      i
    );
  }
  function St(e = F.config || {}) {
    return !(
      (!e.mseAudioBufferEnabled && "mse-audio-buffer" !== e.audioInputMode) ||
      (e.syncEnabled && !e.singleTabMediaSync && "source" !== F.role)
    );
  }
  function ht(e = F.config || {}, t = F.sessionId, n = {}) {
    St(e)
      ? ((F.mseAudio.enabled = !0),
        Ft(Date.now(), { clearHistory: !0 }),
        window.postMessage(
          {
            target: G,
            type: "enable",
            sessionId: t || F.sessionId || "",
            mediaContextKey: yc(),
            maxFutureLeadSeconds: qt(e),
            minMediaTime: Ot(e),
            retryPostedSegments:
              !1 !== n.retryPostedSegments && Boolean(t || F.sessionId),
          },
          "*",
        ),
        wt(),
        kt(),
        (Oe = window.setInterval(kt, 2e3)),
        Tt(),
        (Ve = window.setInterval(() => {
          $t("", { forceSummary: !0 });
        }, 3e4)),
        vt(),
        $t("啟用 MSE audio buffer 讀取"))
      : bt();
  }
  function bt() {
    F.mseAudio.enabled &&
      ($t("停用 MSE audio buffer 讀取", { forceSummary: !0 }),
      (F.mseAudio.enabled = !1),
      wt(),
      Tt(),
      window.postMessage(
        { target: G, type: "disable", sessionId: F.sessionId || "" },
        "*",
      ));
  }
  function vt() {
    window.postMessage(
      {
        target: G,
        type: "snapshot",
        sessionId: F.sessionId || "",
        mediaContextKey: yc(),
        maxFutureLeadSeconds: qt(),
        minMediaTime: Ot(),
      },
      "*",
    );
  }
  function Mt(e = {}) {
    return !(
      !F.mseAudio.enabled ||
      !St() ||
      (window.postMessage(
        {
          target: G,
          type: "repost-range",
          sessionId: e.sessionId || F.sessionId || "",
          mediaContextKey: yc(),
          mediaStartTime: vu(e.mediaStartTime),
          mediaEndTime: vu(e.mediaEndTime),
          reason: String(e.reason || "mse-decode-partial"),
          maxAttempt: Math.max(1, Math.round(Number(e.maxAttempt || 1) || 1)),
          maxFutureLeadSeconds: qt(),
          minMediaTime: Ot(),
        },
        "*",
      ),
      $t("要求 MSE audio 重新投遞缺失片段"),
      0)
    );
  }
  function wt() {
    Oe && (window.clearInterval(Oe), (Oe = null));
  }
  function Tt() {
    Ve && (window.clearInterval(Ve), (Ve = null));
  }
  function kt() {
    F.mseAudio.enabled &&
      St() &&
      window.postMessage(
        {
          target: G,
          type: "window",
          sessionId: F.sessionId || "",
          mediaContextKey: yc(),
          maxFutureLeadSeconds: qt(),
          minMediaTime: Ot(),
        },
        "*",
      );
  }
  function xt(e = {}) {
    if (e.source !== window) return;
    const t = e.data || {};
    if (
      "live-subtitle-debug" === t?.target &&
      "LIVE_SUBTITLE_DEBUG_SNAPSHOT_REQUEST" === t.type
    )
      return void (function (e = "") {
        if (Yc())
          try {
            window.postMessage(
              {
                source: "live-subtitle-content",
                target: "live-subtitle-debug",
                type: "LIVE_SUBTITLE_DEBUG_SNAPSHOT",
                requestId: String(e || ""),
                payload: At(),
              },
              "*",
            );
          } catch {}
      })(t.requestId);
    if (
      "live-subtitle-mse-audio-hook" !== t.source ||
      "live-subtitle-content" !== t.target
    )
      return;
    if (t.sessionId && F.sessionId && t.sessionId !== F.sessionId) return;
    const n = t.payload || {};
    return "installed" === t.type || "enabled" === t.type
      ? ((F.mseAudio.installed = !0),
        Dt(n.stats || n, { messageType: t.type, payload: n }),
        Lt(t.type, n),
        "installed" === t.type &&
          F.mseAudio.enabled &&
          St() &&
          ht(F.config, F.sessionId),
        void $t("YouTube audio buffer hook 已就緒"))
      : "disabled" !== t.type
        ? "unavailable" === t.type
          ? ((F.mseAudio.installed = !1),
            (F.mseAudio.lastIgnoredReason = String(
              n.reason || "mse-audio-hook-unavailable",
            )),
            void $t(
              `YouTube audio buffer hook 不可用：${F.mseAudio.lastIgnoredReason}`,
            ))
          : "reset" === t.type
            ? (Bt(n), void $t("YouTube audio buffer 已重置"))
            : "diagnostic" === t.type
              ? (Dt(n.stats || n, { messageType: t.type, payload: n }),
                (F.mseAudio.lastIgnoredReason = String(
                  n.reason || F.mseAudio.lastIgnoredReason || "",
                )),
                (function (e = {}) {
                  const t = String(e.reason || "");
                  if (!t) return;
                  const n = Date.now();
                  F.mseAudio.diagnosticLogAtByReason ||
                    (F.mseAudio.diagnosticLogAtByReason = {});
                  const a = e.priority ? 1e3 : 5e3;
                  if (n - (F.mseAudio.diagnosticLogAtByReason[t] || 0) < a)
                    return;
                  F.mseAudio.diagnosticLogAtByReason[t] = n;
                  const { stats: i, bytes: s, initBytes: r, ...o } = e;
                  Ja(
                    "mse.audio_buffer.diagnostic",
                    {
                      ...o,
                      hookVersion: vu(
                        e.stats?.hookVersion ?? F.mseAudio.hookVersion,
                      ),
                    },
                    e.priority ? "warn" : "info",
                  );
                })(n),
                void $t(
                  F.mseAudio.lastIgnoredReason
                    ? `MSE audio 診斷：${F.mseAudio.lastIgnoredReason}`
                    : "MSE audio 診斷",
                ))
              : "snapshot" === t.type
                ? ((F.mseAudio.installed = !0),
                  Dt(n.stats || n, { messageType: t.type, payload: n }),
                  Lt(t.type, n),
                  void $t())
                : "source-buffer" === t.type || "buffer-snapshot" === t.type
                  ? (Dt(n, { messageType: t.type, payload: n }), void $t())
                  : void (
                      "audio-segment" === t.type &&
                      (function (e = {}) {
                        if (!F.mseAudio.enabled || !St()) return;
                        const t = yc(),
                          n = Va(e.mediaContextKey || "");
                        if (t && (!n || n !== t))
                          return (
                            Ja(
                              "mse.audio_buffer.media_context_rejected",
                              {
                                reason: n
                                  ? "media-context-mismatch"
                                  : "missing-media-context",
                                expectedMediaContextKey: t,
                                payloadMediaContextKey: n,
                                sequence: vu(e.sequence),
                                capturedAtMs: vu(e.capturedAtMs),
                              },
                              "warn",
                            ),
                            void window.postMessage(
                              {
                                target: G,
                                type: "reset",
                                sessionId: F.sessionId || "",
                                reason: "content-media-context-rejected",
                                mediaContextKey: t,
                                clearAll: !0,
                                clearCodecState: !0,
                                maxFutureLeadSeconds: qt(),
                                minMediaTime: Ot(),
                              },
                              "*",
                            )
                          );
                        const a =
                          e.bytes instanceof ArrayBuffer ? e.bytes : null;
                        if (!a?.byteLength) return;
                        const i =
                          e.initBytes instanceof ArrayBuffer
                            ? e.initBytes
                            : null;
                        (Dt(e),
                          (function (e = {}) {
                            const t = vu(e.currentTime);
                            if (null === t) return !0;
                            const n = Ut(e),
                              a = _t(e),
                              i = Ot();
                            return !(
                              (null !== a && null !== i && a <= i) ||
                              (null !== n && n > t + qt())
                            );
                          })(e)
                            ? ((F.mseAudio.segmentCount += 1),
                              (F.mseAudio.appendCount = Math.max(
                                F.mseAudio.appendCount || 0,
                                Number(e.sequence) || F.mseAudio.segmentCount,
                              )),
                              (F.mseAudio.bytes += a.byteLength),
                              (F.mseAudio.lastSegmentAt = Date.now()),
                              chrome.runtime
                                .sendMessage({
                                  target: "service-worker",
                                  type: "MSE_AUDIO_SEGMENT",
                                  sessionId: F.sessionId || "",
                                  segment: {
                                    sequence: Math.round(
                                      Number(e.sequence) ||
                                        F.mseAudio.segmentCount,
                                    ),
                                    mimeType:
                                      e.uploadMimeType ||
                                      e.mimeType ||
                                      "application/octet-stream",
                                    originalMimeType: e.mimeType || "",
                                    extension: e.uploadExtension || "",
                                    bytesBase64: It(a),
                                    initBytesBase64: i?.byteLength ? It(i) : "",
                                    byteLength: a.byteLength,
                                    initByteLength: i?.byteLength || 0,
                                    capturedAtMs:
                                      vu(e.capturedAtMs) || Date.now(),
                                    currentTime: vu(e.currentTime),
                                    bufferedStart: vu(e.bufferedStart),
                                    bufferedEnd: vu(e.bufferedEnd),
                                    durationSeconds: vu(e.durationSeconds),
                                    mediaRangeSource: String(
                                      e.mediaRangeSource || "",
                                    ),
                                    mediaStartTime: Ut(e),
                                    mediaEndTime: _t(e),
                                    clusterSliceIndex: vu(e.clusterSliceIndex),
                                    clusterSliceCount: vu(e.clusterSliceCount),
                                    leadSeconds: vu(e.leadSeconds),
                                    maxLeadSeconds: vu(e.maxLeadSeconds),
                                    timestampOffset: vu(e.timestampOffset),
                                    repostAttempt: Math.max(
                                      0,
                                      Math.round(
                                        Number(e.repostAttempt || 0) || 0,
                                      ),
                                    ),
                                    hookVersion: vu(e.hookVersion),
                                    mediaContextKey: n || t,
                                  },
                                })
                                .then((e) => {
                                  if (!1 === e?.ok || e?.ignored) {
                                    const t = e.reason || e.error || "unknown";
                                    ($t(
                                      `MSE audio segment relay skipped: ${t}`,
                                    ),
                                      Et(t));
                                  }
                                })
                                .catch((e) => {
                                  const t =
                                    e?.message || "runtime message failed";
                                  ($t(`MSE audio segment relay failed: ${t}`),
                                    Et(t));
                                }),
                              $t())
                            : $t(
                                "略過距離目前播放點太遠的 YouTube audio buffer",
                              ));
                      })(n)
                    )
        : void (F.mseAudio.enabled = !1);
  }
  function At() {
    const e = Date.now(),
      t = Ct(F.activeSegment),
      n = Array.isArray(F.segmentQueue)
        ? F.segmentQueue.slice(0, 8).map((e) => Ct(e))
        : [],
      a = Array.isArray(F.largeSegmentHistory)
        ? F.largeSegmentHistory.slice(-8).map((e) => Ct(e))
        : [];
    return {
      at: new Date(e).toISOString(),
      sessionId: F.sessionId || "",
      role: F.role,
      status: F.status || "",
      mode: F.mode || "",
      sync: {
        enabled: Boolean(F.sync.enabled),
        singleTabMediaSync: Boolean(F.sync.singleTabMediaSync),
        targetDelaySeconds: vu(F.sync.targetDelaySeconds),
        actualDelaySeconds: vu(F.sync.actualDelaySeconds),
        viewerMediaTime: vu(F.sync.viewerMediaTime),
        sourceMediaTime: vu(F.sync.sourceTiming?.currentTime),
        ready: Boolean(F.sync.ready),
        diagnostics: Ma(),
        mseStartupWait: {
          active: Boolean(F.sync.mseStartupWaitActive),
          released: Boolean(F.sync.mseStartupWaitReleased),
          startedAt: vu(F.sync.mseStartupWaitStartedAt),
          readyAt: vu(F.sync.mseStartupWaitReadyAt),
          singleTabGate: {
            active: Boolean(F.sync.singleTabMseStartupGate?.active),
            phase: ku(F.sync.singleTabMseStartupGate?.phase || "idle"),
            anchorMediaTime: vu(
              F.sync.singleTabMseStartupGate?.anchorMediaTime,
            ),
            preloadElapsedMs: F.sync.singleTabMseStartupGate
              ?.preloadingStartedAtMs
              ? Math.max(
                  0,
                  e - F.sync.singleTabMseStartupGate.preloadingStartedAtMs,
                )
              : 0,
            preloadedMediaSeconds: vu(
              F.sync.singleTabMseStartupGate?.preloadedMediaSeconds,
            ),
            rawLeadSeconds: vu(F.sync.singleTabMseStartupGate?.rawLeadSeconds),
            rawLeadGainSeconds: vu(
              F.sync.singleTabMseStartupGate?.rawLeadGainSeconds,
            ),
            rawCaptureRate: vu(F.sync.singleTabMseStartupGate?.rawCaptureRate),
            readyLeadSeconds: vu(
              F.sync.singleTabMseStartupGate?.readyLeadSeconds,
            ),
            requiredLeadSeconds: vu(
              F.sync.singleTabMseStartupGate?.requiredLeadSeconds,
            ),
            playbackRetryCount: Math.max(
              0,
              Number(F.sync.singleTabMseStartupGate?.playbackRetryCount) || 0,
            ),
          },
        },
      },
      mseAudio: {
        ...F.mseAudio,
        lastSegmentAgeMs: F.mseAudio.lastSegmentAt
          ? Math.max(0, e - F.mseAudio.lastSegmentAt)
          : null,
      },
      subtitle: {
        active: t,
        queue: n,
        history: a,
        displayedHistory: Array.isArray(F.displayedSegmentHistory)
          ? F.displayedSegmentHistory.slice(-12)
          : [],
        stats: { ...F.subtitleDisplayStats },
        queueLength: Array.isArray(F.segmentQueue) ? F.segmentQueue.length : 0,
        timelineCacheLength: Array.isArray(F.subtitleTimelineCache)
          ? F.subtitleTimelineCache.length
          : 0,
        currentOriginal: Rt(F.currentOriginal),
        currentTranslation: Rt(F.currentTranslation),
      },
      usage: F.usage
        ? {
            creditsUsed: vu(F.usage.creditsUsed),
            elapsedSeconds: vu(F.usage.elapsedSeconds),
            llmCallCount: vu(F.usage.llmCallCount),
            totalTokens: vu(F.usage.totalTokens),
          }
        : null,
    };
  }
  function Ct(e = null) {
    return e
      ? {
          original: Rt(e.original),
          translation: Rt(e.translation),
          order: vu(e.order),
          mediaTime: vu(e.mediaTime),
          displayAfterMediaTime: vu(e.displayAfterMediaTime),
          audioStartMediaTime: vu(e.audioStartMediaTime),
          audioEndMediaTime: vu(e.audioEndMediaTime),
          mediaTimeEnd: vu(e.mediaTimeEnd),
          targetMediaTime: Aa(e),
          targetMediaTimeEnd: Ca(e),
          timingSource: e.timingSource || "",
          queueSequence: vu(e.queueSequence),
          displaySequence: vu(e.displaySequence),
          syncDisplayErrorSeconds: vu(e.syncDisplayErrorSeconds),
          skipped: Boolean(e.skipped),
        }
      : null;
  }
  function Rt(e = "", t = 120) {
    const n = ku(e);
    return n ? (n.length > t ? `${n.slice(0, t - 1)}…` : n) : "";
  }
  function Dt(e = {}, t = {}) {
    F.mseAudio.installed = !0;
    const n = String(
      e.installDocumentId ?? t.payload?.installDocumentId ?? "",
    ).trim();
    n && (F.mseAudio.installDocumentId = n);
    const a = String(
      e.installDocumentReadyState ?? t.payload?.installDocumentReadyState ?? "",
    ).trim();
    (a && (F.mseAudio.installDocumentReadyState = a),
      (!0 !== e.installedDuringDocumentLoading &&
        !0 !== t.payload?.installedDuringDocumentLoading) ||
        (F.mseAudio.installedDuringDocumentLoading = !0));
    const i = vu(e.installedAt ?? t.payload?.installedAt);
    null !== i && (F.mseAudio.hookInstalledAt = i);
    const s = vu(e.hookVersion ?? t.payload?.hookVersion);
    if (null !== s) {
      const e = vu(F.mseAudio.hookVersion);
      ((F.mseAudio.hookVersion = s),
        (e !== s ||
          Boolean(t.payload?.reinstallSkipped) ||
          s < 29 ||
          Date.now() - (F.mseAudio.hookVersionReportedAt || 0) > 3e4) &&
          ((F.mseAudio.hookVersionReportedAt = Date.now()),
          Ja(
            "mse.hook.version",
            {
              hookVersion: s,
              expectedHookVersion: 29,
              messageType: t.messageType || "",
              reinstallSkipped: Boolean(t.payload?.reinstallSkipped),
            },
            s < 29 ? "warn" : "info",
          )));
    }
    const r = vu(e.leadSeconds ?? e.lastLeadSeconds);
    null !== r &&
      ((F.mseAudio.lastLeadSeconds = r),
      (F.mseAudio.maxLeadSeconds = Math.max(
        F.mseAudio.maxLeadSeconds || 0,
        r,
      )));
    const o = vu(e.maxLeadSeconds);
    null !== o &&
      (F.mseAudio.maxLeadSeconds = Math.max(F.mseAudio.maxLeadSeconds || 0, o));
    const l = vu(e.sourceBufferCount);
    null !== l &&
      (F.mseAudio.sourceBufferCount = Math.max(
        F.mseAudio.sourceBufferCount || 0,
        l,
      ));
    const d = vu(e.audioSourceBufferCount);
    null !== d &&
      (F.mseAudio.audioSourceBufferCount = Math.max(
        F.mseAudio.audioSourceBufferCount || 0,
        d,
      ));
    const c = vu(e.unknownAppendCount);
    null !== c &&
      (F.mseAudio.unknownAppendCount = Math.max(
        F.mseAudio.unknownAppendCount || 0,
        c,
      ));
    const u = vu(e.ignoredAppendCount);
    (null !== u &&
      (F.mseAudio.ignoredAppendCount = Math.max(
        F.mseAudio.ignoredAppendCount || 0,
        u,
      )),
      (F.mseAudio.lastBufferedStart = vu(
        e.bufferedStart ?? e.lastBufferedStart,
      )),
      (F.mseAudio.lastBufferedEnd = vu(e.bufferedEnd ?? e.lastBufferedEnd)),
      (e.mimeType || e.lastMimeType) &&
        (F.mseAudio.lastMimeType = String(e.mimeType || e.lastMimeType || "")),
      e.lastIgnoredReason &&
        (F.mseAudio.lastIgnoredReason = String(e.lastIgnoredReason || "")));
  }
  function Lt(e, t = {}) {
    null === vu(t.hookVersion ?? t.stats?.hookVersion) &&
      null === vu(F.mseAudio.hookVersion) &&
      Dt({ hookVersion: 0 }, { messageType: `${e}-versionless`, payload: t });
  }
  function Bt(e = {}) {
    ((F.mseAudio.segmentCount = 0),
      (F.mseAudio.bytes = 0),
      (F.mseAudio.sourceBufferCount = 0),
      (F.mseAudio.audioSourceBufferCount = 0),
      (F.mseAudio.unknownAppendCount = 0),
      (F.mseAudio.ignoredAppendCount = 0),
      (F.mseAudio.lastLeadSeconds = null),
      (F.mseAudio.maxLeadSeconds = 0),
      (F.mseAudio.lastBufferedStart = null),
      (F.mseAudio.lastBufferedEnd = null),
      (F.mseAudio.lastReadySubtitleLeadSeconds = null),
      (F.mseAudio.lastRequiredSubtitleLeadSeconds = null),
      (F.mseAudio.lastIgnoredReason = ""),
      (F.mseAudio.lastSegmentAt = 0),
      e?.stats && Dt(e.stats, { messageType: "reset", payload: e }));
  }
  function Et(e = "") {
    if (!F.sessionId || !F.mseAudio.enabled) return;
    if (!Pt(e)) return;
    const t = Date.now();
    t - $e < 3e3 ||
      (($e = t),
      chrome.runtime
        .sendMessage({
          type: "LIVE_SUBTITLE_MSE_AUDIO_REFRESH_REQUEST",
          sessionId: F.sessionId || "",
          retryPostedSegments: !0,
          reason: String(e || "mse-audio-relay-issue").slice(0, 180),
        })
        .then((e) => {
          e?.ok && $t("MSE audio hook refresh requested");
        })
        .catch(() => {}));
  }
  function Pt(e = "") {
    return /no-offscreen|offscreen-not-ready|runner-not-found|offscreen relay failed|Could not establish connection|Receiving end does not exist|Extension context invalidated|message port closed|runtime message failed/i.test(
      String(e || ""),
    );
  }
  function It(e) {
    const t =
      e instanceof ArrayBuffer
        ? new Uint8Array(e)
        : ArrayBuffer.isView(e)
          ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
          : new Uint8Array();
    let n = "";
    for (let e = 0; e < t.length; e += 32768)
      n += String.fromCharCode(...t.subarray(e, e + 32768));
    return btoa(n);
  }
  function Ut(e = {}) {
    const t = vu(e.mediaStartTime);
    if (null !== t) return t;
    const n = vu(e.bufferedStart),
      a = vu(e.bufferedEnd),
      i = Math.max(0.5, Math.min(8, Number(e.durationSeconds) || 5));
    return null !== a ? Math.max(n ?? 0, a - i) : n;
  }
  function _t(e = {}) {
    return vu(e.mediaEndTime ?? e.bufferedEnd);
  }
  function qt(e = F.config || {}) {
    const t = vu(e.mseAudioMaxFutureLeadSeconds);
    if (null !== t) return Cu(t, 20, H);
    const n = vu(
        e.effectiveSyncDelaySeconds ??
          e.syncDelaySeconds ??
          F.sync?.targetDelaySeconds,
      ),
      a = (null !== n ? n : 0) + 85;
    return Cu(Math.max(150, a), 20, H);
  }
  function Ot(e = F.config || {}) {
    const t = Yd(),
      n = F.sync.singleTabMseStartupGate,
      a =
        (n?.active && e.singleTabMediaSync && n.mediaContextKey === yc()
          ? vu(n.anchorMediaTime)
          : null) ??
        vu(t?.currentTime) ??
        vu(F.sync.sourceTiming?.currentTime) ??
        vu(F.sync.viewerMediaTime);
    if (null === a) return null;
    const i = Boolean(e.singleTabMediaSync || !e.syncEnabled),
      s =
        vu(F.sync.lockedDelaySeconds) ??
        vu(e.effectiveSyncDelaySeconds) ??
        vu(e.syncDelaySeconds) ??
        vu(F.sync.targetDelaySeconds) ??
        0,
      r = i ? 2 : s + 5;
    return Math.max(0, Math.round(1e3 * (a - r)) / 1e3);
  }
  function Vt(e = "timeline-reset", t = null) {
    (F.mseAudio.enabled || St()) &&
      (Bt(),
      window.postMessage(
        {
          target: G,
          type: "reset",
          sessionId: F.sessionId || "",
          mediaContextKey: yc(),
          reason: e,
          targetMediaTime: vu(t),
          maxFutureLeadSeconds: qt(),
          minMediaTime: Ot(),
        },
        "*",
      ));
  }
  function $t(e = "", t = {}) {
    if (!F.mseAudio.enabled) return;
    const n = Date.now(),
      a = vu(F.mseAudio.lastLeadSeconds),
      i = vu(F.mseAudio.maxLeadSeconds),
      s =
        null !== a
          ? `MSE audio buffer ${Pc(a)} / max ${Pc(i || a)}`
          : e || "等待 YouTube audio buffer";
    "display" === F.role &&
      F.config?.singleTabMediaSync &&
      ((F.status = s), ei());
    const r = (function (e = "", t = null) {
      return Gt(e, "")
        ? "degraded"
        : F.mseAudio.installed
          ? null === t
            ? "waiting-buffer"
            : t < 0.25
              ? "low-buffer"
              : "active"
          : "waiting-hook";
    })(e, a);
    !(function ({
      now: e = Date.now(),
      reason: t = "",
      lead: n = null,
      statusState: a = "",
    } = {}) {
      if (t) {
        const e = String(t).slice(0, 120);
        F.mseAudio.statusReasonCounts[e] =
          Math.max(0, Number(F.mseAudio.statusReasonCounts[e] || 0)) + 1;
      }
      if (e - (F.mseAudio.lastStatusSampleAt || 0) < 2500) return;
      ((F.mseAudio.lastStatusSampleAt = e),
        null !== n &&
          ((F.mseAudio.statusLeadSampleCount += 1),
          (F.mseAudio.statusLeadSampleSum += n),
          (F.mseAudio.statusLeadSampleMin =
            null === F.mseAudio.statusLeadSampleMin
              ? n
              : Math.min(F.mseAudio.statusLeadSampleMin, n)),
          (F.mseAudio.statusLeadSampleMax =
            null === F.mseAudio.statusLeadSampleMax
              ? n
              : Math.max(F.mseAudio.statusLeadSampleMax, n))));
      const i = Array.isArray(F.mseAudio.recentStatusSamples)
        ? F.mseAudio.recentStatusSamples
        : [];
      i.push({
        atMs: e,
        state: a,
        leadSeconds: n,
        bufferedEnd: vu(F.mseAudio.lastBufferedEnd),
        segmentCount: F.mseAudio.segmentCount,
        ignoredAppendCount: F.mseAudio.ignoredAppendCount,
        reason: String(t || "").slice(0, 120),
      });
      const s = e - 6e4;
      F.mseAudio.recentStatusSamples = i
        .filter((e) => Number(e.atMs || 0) >= s)
        .slice(-24);
    })({ now: n, reason: e, lead: a, statusState: r });
    const o = F.mseAudio.lastStatusState,
      l = r !== o,
      d = Gt(e, r);
    if (
      ((F.mseAudio.lastStatusState = r),
      d &&
      (function (e, t = Date.now()) {
        F.mseAudio.anomalyLogAtByKey || (F.mseAudio.anomalyLogAtByKey = {});
        return !(
          t - Number(F.mseAudio.anomalyLogAtByKey[e] || 0) < 5e3 ||
          ((F.mseAudio.anomalyLogAtByKey[e] = t), 0)
        );
      })(d, n)
        ? Wt(
            "mse.audio_buffer.anomaly",
            {
              ...Nt(e, s, a, i),
              previousState: o,
              state: r,
              recentSamples: F.mseAudio.recentStatusSamples.slice(),
            },
            "warn",
          )
        : l &&
          Wt(
            "mse.audio_buffer.state_changed",
            { ...Nt(e, s, a, i), previousState: o, state: r },
            "degraded" === r ? "warn" : "info",
          ),
      !(
        Boolean(t.forceSummary) ||
        n -
          (F.mseAudio.lastStatusAt || F.mseAudio.statusWindowStartedAt || n) >=
          3e4
      ))
    )
      return;
    const c = F.mseAudio.statusWindowBaseline || Ht(),
      u = Math.max(0, Number(F.mseAudio.statusLeadSampleCount || 0));
    (Wt(
      "mse.audio_buffer.summary",
      {
        ...Nt(e, s, a, i),
        state: r,
        windowStartedAtMs: F.mseAudio.statusWindowStartedAt || n,
        windowEndedAtMs: n,
        windowDurationMs: Math.max(
          0,
          n - (F.mseAudio.statusWindowStartedAt || n),
        ),
        samples: u,
        leadSecondsMin: vu(F.mseAudio.statusLeadSampleMin),
        leadSecondsAvg:
          u > 0
            ? Math.round((F.mseAudio.statusLeadSampleSum / u) * 1e3) / 1e3
            : null,
        leadSecondsMax: vu(F.mseAudio.statusLeadSampleMax),
        segmentCountDelta: Math.max(
          0,
          F.mseAudio.segmentCount - c.segmentCount,
        ),
        appendCountDelta: Math.max(0, F.mseAudio.appendCount - c.appendCount),
        unknownAppendCountDelta: Math.max(
          0,
          F.mseAudio.unknownAppendCount - c.unknownAppendCount,
        ),
        ignoredAppendCountDelta: Math.max(
          0,
          F.mseAudio.ignoredAppendCount - c.ignoredAppendCount,
        ),
        bytesDelta: Math.max(0, F.mseAudio.bytes - c.bytes),
        reasonCounts: { ...(F.mseAudio.statusReasonCounts || {}) },
      },
      "degraded" === r ? "warn" : "info",
    ),
      (F.mseAudio.lastStatusAt = n),
      Ft(n, { preserveLastStatusAt: !0 }));
  }
  function Wt(e, t, n = "info") {
    chrome.runtime
      .sendMessage({
        target: "offscreen",
        type: "APPEND_EVENT_LOG",
        sessionId: F.sessionId || "",
        event: { type: e, source: "content-script", level: n, data: t },
      })
      .catch(() => {});
  }
  function Nt(e, t, n, a) {
    return {
      reason: e,
      message: t,
      enabled: F.mseAudio.enabled,
      installed: F.mseAudio.installed,
      sourceBufferCount: F.mseAudio.sourceBufferCount,
      audioSourceBufferCount: F.mseAudio.audioSourceBufferCount,
      segmentCount: F.mseAudio.segmentCount,
      appendCount: F.mseAudio.appendCount,
      unknownAppendCount: F.mseAudio.unknownAppendCount,
      ignoredAppendCount: F.mseAudio.ignoredAppendCount,
      bytes: F.mseAudio.bytes,
      leadSeconds: n,
      maxLeadSeconds: a,
      bufferedStart: F.mseAudio.lastBufferedStart,
      bufferedEnd: F.mseAudio.lastBufferedEnd,
      mimeType: F.mseAudio.lastMimeType,
      lastIgnoredReason: F.mseAudio.lastIgnoredReason,
      lastSegmentAgeMs: F.mseAudio.lastSegmentAt
        ? Math.max(0, Date.now() - F.mseAudio.lastSegmentAt)
        : null,
      hookVersion: vu(F.mseAudio.hookVersion),
    };
  }
  function Gt(e = "", t = "") {
    const n = String(e || "").trim();
    return (n || "degraded" === t) &&
      /(不可用|失敗|failed|error|relay skipped|stale|version mismatch|context invalidated|message port closed|no-offscreen|offscreen-not-ready|runner-not-found)/i.test(
        n,
      )
      ? n.toLowerCase().slice(0, 160)
      : "";
  }
  function Ht() {
    return {
      segmentCount: Math.max(0, Number(F.mseAudio.segmentCount || 0)),
      appendCount: Math.max(0, Number(F.mseAudio.appendCount || 0)),
      unknownAppendCount: Math.max(
        0,
        Number(F.mseAudio.unknownAppendCount || 0),
      ),
      ignoredAppendCount: Math.max(
        0,
        Number(F.mseAudio.ignoredAppendCount || 0),
      ),
      bytes: Math.max(0, Number(F.mseAudio.bytes || 0)),
    };
  }
  function Ft(e = Date.now(), t = {}) {
    ((F.mseAudio.statusWindowStartedAt = e),
      (F.mseAudio.statusWindowBaseline = Ht()),
      (F.mseAudio.statusLeadSampleCount = 0),
      (F.mseAudio.statusLeadSampleSum = 0),
      (F.mseAudio.statusLeadSampleMin = null),
      (F.mseAudio.statusLeadSampleMax = null),
      (F.mseAudio.statusReasonCounts = {}),
      (F.mseAudio.lastStatusSampleAt = 0),
      t.preserveLastStatusAt || (F.mseAudio.lastStatusAt = e),
      t.clearHistory &&
        ((F.mseAudio.recentStatusSamples = []),
        (F.mseAudio.lastStatusState = ""),
        (F.mseAudio.anomalyLogAtByKey = {})));
  }
  function zt(e = {}) {
    (a?.stop(),
      bs(),
      sl(),
      Wo("overlay-unmounted", { log: !1, resume: e.resume }),
      md("overlay-unmounted", Yd(), { log: !1 }),
      ds(),
      bt(),
      Bn({ blank: !0, clearPending: !0, clearQueue: !0 }),
      de?.isConnected && de.remove(),
      (F.mounted = !1));
  }
  function Kt() {
    (de ||
      ((de = document.createElement("div")),
      (de.id = e),
      (ce = de.attachShadow({ mode: "open" })),
      (ce.innerHTML = `\n      <style>\n        :host {\n          color-scheme: dark;\n          font-family: var(--subtitle-font-family, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft JhengHei", sans-serif);\n          position: fixed;\n          z-index: 2147483647;\n\n          --ov-bg: rgba(10, 14, 24, var(--subtitle-opacity, 0.94));\n          --ov-bg-solid: rgba(10, 14, 24, 0.96);\n          --ov-surface: rgba(255, 255, 255, 0.06);\n          --ov-surface-2: rgba(255, 255, 255, 0.10);\n          --ov-surface-3: rgba(255, 255, 255, 0.16);\n          --ov-border: rgba(255, 255, 255, 0.11);\n          --ov-border-strong: rgba(255, 255, 255, 0.22);\n          --ov-text: #ffffff;\n          --ov-text-2: #b8c5da;\n          --ov-text-3: #8693ac;\n          --ov-accent: #4a84ff;\n          --ov-accent-2: #6c9bff;\n          --ov-accent-soft: rgba(74, 132, 255, 0.22);\n          --ov-accent-soft-hover: rgba(74, 132, 255, 0.34);\n          --ov-live: #2dd4a6;\n          --ov-live-soft: rgba(45, 212, 166, 0.22);\n          --ov-warn: #fbbf24;\n          --ov-danger: #ff7a6a;\n          --ov-danger-soft: rgba(255, 122, 106, 0.22);\n          --ov-mono: ui-monospace, "JetBrains Mono", "SF Mono", "Menlo", monospace;\n        }\n\n        .subtitle-window {\n          background: var(--ov-bg);\n          border: 1px solid var(--ov-border);\n          border-radius: 10px;\n          box-shadow:\n            0 20px 50px rgba(0, 0, 0, 0.45),\n            0 1px 0 rgba(255, 255, 255, 0.06) inset;\n          box-sizing: border-box;\n          color: var(--ov-text);\n          min-height: 56px;\n          min-width: 220px;\n          overflow: visible;\n          pointer-events: auto;\n          position: relative;\n          resize: none;\n          transition: background 160ms ease, border-color 160ms ease, box-shadow 160ms ease;\n          width: 720px;\n        }\n\n        .subtitle-window.transparent-mode:not(:hover):not(.usage-open):not(.collapsed) {\n          background: transparent;\n          border-color: transparent;\n          box-shadow: none;\n          pointer-events: none;\n        }\n\n        .subtitle-window.transparent-mode:hover,\n        .subtitle-window.transparent-mode.usage-open {\n          background: var(--ov-bg-solid);\n          border-color: var(--ov-border-strong);\n          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);\n        }\n\n        .subtitle-window.transparent-mode:not(:hover):not(.usage-open):not(.collapsed) .toolbar,\n        .subtitle-window.transparent-mode:not(:hover):not(.usage-open):not(.collapsed) .resize-handle {\n          height: 0;\n          opacity: 0;\n          overflow: hidden;\n          padding-bottom: 0;\n          padding-top: 0;\n          pointer-events: none;\n        }\n\n        .subtitle-window.transparent-mode:not(:hover):not(.usage-open):not(.collapsed) .body {\n          height: 100%;\n          padding-bottom: 2px;\n          padding-top: 2px;\n          pointer-events: auto;\n        }\n\n        .subtitle-window.locked {\n          cursor: default;\n        }\n\n        /* After the startup hint expires, an empty subtitle box must not\n           cover silent footage. Controls remain available on hover/focus. */\n        .subtitle-window.startup-quiet:not(:hover):not(:focus-within):not(.usage-open):not(.settings-open):not(.collapsed) {\n          background: transparent;\n          border-color: transparent;\n          box-shadow: none;\n          pointer-events: none;\n        }\n\n        .subtitle-window.startup-quiet:not(:hover):not(:focus-within):not(.usage-open):not(.settings-open):not(.collapsed) .toolbar,\n        .subtitle-window.startup-quiet:not(:hover):not(:focus-within):not(.usage-open):not(.settings-open):not(.collapsed) .resize-handle {\n          opacity: 0;\n        }\n\n        .subtitle-window.startup-quiet:not(.collapsed) .body {\n          pointer-events: none !important;\n        }\n\n        .subtitle-window.startup-quiet .toolbar { pointer-events: auto; }\n\n        /* =========================================================\n           Toolbar\n           ========================================================= */\n\n        .toolbar {\n          align-items: center;\n          background: linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.03));\n          border-bottom: 1px solid var(--ov-border);\n          cursor: grab;\n          display: flex;\n          flex-wrap: nowrap;\n          gap: 4px;\n          height: 30px;\n          padding: 0 10px 0 8px;\n          transition: height 160ms ease, opacity 160ms ease, padding 160ms ease;\n          user-select: none;\n        }\n\n        .locked .toolbar {\n          cursor: default;\n        }\n\n        .toolbar:active:not(.locked) {\n          cursor: grabbing;\n        }\n\n        .tb-sep {\n          align-self: stretch;\n          flex: 0 0 auto;\n          margin: 6px 2px;\n          width: 1px;\n          background: var(--ov-border);\n        }\n\n        /* =========================================================\n           Status pill (signature VU meter)\n           ========================================================= */\n\n        .status-pill {\n          align-items: center;\n          background: var(--ov-surface);\n          border: 1px solid var(--ov-border);\n          border-radius: 999px;\n          color: var(--ov-live);\n          display: inline-flex;\n          flex: 2 1 0;\n          gap: 6px;\n          height: 24px;\n          letter-spacing: 0.02em;\n          min-width: 130px;\n          padding: 0 12px 0 10px;\n          white-space: nowrap;\n        }\n\n        .status-pill .vu {\n          align-items: flex-end;\n          display: inline-flex;\n          flex: 0 0 auto;\n          gap: 2px;\n          height: 11px;\n          width: 13px;\n        }\n\n        .status-pill .vu i {\n          background: currentColor;\n          border-radius: 1px;\n          display: block;\n          height: 100%;\n          opacity: 1;\n          transform-origin: 50% 100%;\n          width: 3px;\n          animation: vu-bar 0.95s ease-in-out infinite;\n        }\n\n        .status-pill .vu i:nth-child(1) { animation-delay: -0.15s; animation-duration: 0.82s; }\n        .status-pill .vu i:nth-child(2) { animation-delay: -0.45s; animation-duration: 1.05s; }\n        .status-pill .vu i:nth-child(3) { animation-delay: -0.30s; animation-duration: 0.96s; }\n\n        .subtitle-window.collapsed .status-pill .vu i {\n          animation: none;\n          transform: scaleY(0.4);\n        }\n\n        .status {\n          color: inherit;\n          flex: 1 1 auto;\n          font-size: 11.5px;\n          font-weight: 800;\n          min-width: 0;\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;\n        }\n\n        /* =========================================================\n           Font size control (toolbar)\n           ========================================================= */\n\n        .font-control {\n          align-items: center;\n          background: var(--ov-surface);\n          border: 1px solid var(--ov-border);\n          border-radius: 7px;\n          display: inline-flex;\n          flex: 0 0 auto;\n          gap: 0;\n          height: 24px;\n          padding: 0;\n        }\n\n        .font-control button {\n          background: transparent;\n          border: 0;\n          border-radius: 0;\n          color: var(--ov-text);\n          font: 800 12px/1 Inter, ui-sans-serif, system-ui, sans-serif;\n          height: 22px;\n          min-width: 24px;\n          padding: 0 6px;\n        }\n\n        .font-control button:hover {\n          background: var(--ov-surface-2);\n          color: var(--ov-text);\n        }\n\n        .font-control button:first-child {\n          border-bottom-left-radius: 6px;\n          border-top-left-radius: 6px;\n        }\n\n        .font-control button:last-child {\n          border-bottom-right-radius: 6px;\n          border-top-right-radius: 6px;\n        }\n\n        .font-size-display {\n          background: transparent;\n          border-left: 1px solid var(--ov-border);\n          border-right: 1px solid var(--ov-border);\n          color: var(--ov-text);\n          flex: 0 0 auto;\n          font: 700 11px/1 var(--ov-mono);\n          font-variant-numeric: tabular-nums;\n          letter-spacing: -0.01em;\n          min-width: 28px;\n          padding: 0 8px;\n          text-align: center;\n        }\n\n        @keyframes vu-bar {\n          0%, 100% { transform: scaleY(0.24); }\n          50%      { transform: scaleY(1); }\n        }\n\n        /* =========================================================\n           Toolbar buttons\n           ========================================================= */\n\n        button {\n          align-items: center;\n          background: var(--ov-surface);\n          border: 1px solid transparent;\n          border-radius: 6px;\n          color: var(--ov-text-2);\n          cursor: pointer;\n          display: inline-flex;\n          flex: 0 0 auto;\n          font: 800 11.5px/1 Inter, ui-sans-serif, system-ui, "Microsoft JhengHei", sans-serif;\n          height: 24px;\n          justify-content: center;\n          letter-spacing: 0;\n          min-width: 32px;\n          padding: 0 9px;\n          transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease;\n        }\n\n        button[hidden] {\n          display: none !important;\n        }\n\n        button:hover {\n          background: var(--ov-surface-2);\n          color: var(--ov-text);\n        }\n\n        button:focus-visible {\n          outline: none;\n          box-shadow: 0 0 0 2px rgba(74, 132, 255, 0.55);\n        }\n\n        button.close-button {\n          background: transparent;\n          border: 1px solid var(--ov-border);\n          color: var(--ov-text-2);\n          font-size: 14px;\n          font-weight: 600;\n          line-height: 1;\n          min-width: 22px;\n          padding: 0;\n          width: 22px;\n        }\n\n        button.close-button:hover {\n          background: rgba(255, 122, 106, 0.30);\n          border-color: rgba(255, 122, 106, 0.55);\n          color: #fff;\n        }\n\n        button.quota {\n          background: var(--ov-surface);\n          border: 1px solid var(--ov-border);\n          border-radius: 999px;\n          color: var(--ov-text);\n          font-family: var(--ov-mono);\n          font-size: 11px;\n          font-variant-numeric: tabular-nums;\n          font-weight: 700;\n          height: auto;\n          min-height: 22px;\n          letter-spacing: -0.01em;\n          line-height: 12px;\n          max-width: calc(100% - 200px);\n          min-width: 0;\n          overflow: visible;\n          padding: 0 10px;\n          white-space: normal;\n        }\n\n        button.quota:hover,\n        button.quota[aria-expanded="true"] {\n          background: var(--ov-surface-2);\n          border-color: var(--ov-border-strong);\n        }\n\n        button.quota[aria-expanded="true"] {\n          color: var(--ov-accent-2);\n          border-color: rgba(108, 155, 255, 0.50);\n        }\n\n        button.quota.active {\n          color: var(--ov-text);\n        }\n\n        button.toggle-active {\n          background: var(--ov-accent-soft);\n          border-color: rgba(108, 155, 255, 0.40);\n          color: #fff;\n        }\n\n        button.toggle-active:hover {\n          background: var(--ov-accent-soft-hover);\n          border-color: rgba(108, 155, 255, 0.65);\n        }\n\n        /* =========================================================\n           Usage panel\n           ========================================================= */\n\n        .usage-panel {\n          background: var(--ov-bg-solid);\n          border: 1px solid var(--ov-border-strong);\n          border-radius: 12px;\n          box-shadow: 0 22px 56px rgba(0, 0, 0, 0.50);\n          box-sizing: border-box;\n          color: var(--ov-text);\n          display: none;\n          font-size: 11.5px;\n          line-height: 1.4;\n          max-height: calc(100vh - 64px);\n          overflow-y: auto;\n          padding: 12px 14px 14px;\n          pointer-events: auto;\n          position: absolute;\n          right: 8px;\n          scrollbar-color: var(--ov-border-strong) transparent;\n          scrollbar-width: thin;\n          top: 42px;\n          width: min(440px, calc(100vw - 24px));\n          z-index: 4;\n        }\n\n        .usage-panel::-webkit-scrollbar { width: 8px; }\n        .usage-panel::-webkit-scrollbar-thumb {\n          background: var(--ov-border-strong);\n          border: 2px solid var(--ov-bg-solid);\n          border-radius: 999px;\n        }\n        .usage-panel::-webkit-scrollbar-track { background: transparent; }\n\n        .subtitle-window.usage-open .usage-panel {\n          display: block;\n        }\n\n        .usage-panel-title {\n          color: var(--ov-text);\n          font-size: 13px;\n          font-weight: 800;\n          letter-spacing: -0.015em;\n          margin-bottom: 12px;\n        }\n\n        .usage-section {\n          margin-top: 12px;\n        }\n\n        .usage-section:first-of-type {\n          margin-top: 0;\n        }\n\n        .usage-section-head {\n          color: var(--ov-text-3);\n          font-size: 10px;\n          font-weight: 800;\n          letter-spacing: 0.10em;\n          margin-bottom: 6px;\n          padding-left: 1px;\n          text-transform: uppercase;\n        }\n\n        .usage-grid {\n          background: var(--ov-surface);\n          border: 1px solid var(--ov-border);\n          border-radius: 8px;\n          display: grid;\n          gap: 0;\n          margin: 0;\n          padding: 2px 0;\n        }\n\n        .usage-row {\n          align-items: baseline;\n          display: flex;\n          gap: 12px;\n          justify-content: space-between;\n          padding: 7px 10px;\n        }\n\n        .usage-row + .usage-row {\n          border-top: 1px solid var(--ov-border);\n        }\n\n        .usage-row dt {\n          color: var(--ov-text-3);\n          font-size: 11px;\n          font-weight: 700;\n          letter-spacing: 0;\n          margin: 0;\n          white-space: nowrap;\n        }\n\n        .usage-row dd {\n          color: var(--ov-text);\n          font-family: var(--ov-mono);\n          font-size: 11.5px;\n          font-variant-numeric: tabular-nums;\n          font-weight: 600;\n          letter-spacing: -0.01em;\n          margin: 0;\n          text-align: right;\n          word-break: break-word;\n        }\n\n        .usage-row.primary dt {\n          color: var(--ov-text-2);\n        }\n\n        .usage-row.primary dd {\n          color: var(--ov-accent-2);\n          font-size: 13px;\n          font-weight: 700;\n        }\n\n        .usage-row[hidden] {\n          display: none;\n        }\n\n        .usage-note {\n          border-top: 1px solid var(--ov-border);\n          color: var(--ov-text-3);\n          font-size: 10.5px;\n          font-weight: 500;\n          line-height: 1.45;\n          margin-top: 12px;\n          padding-top: 10px;\n        }\n\n        /* =========================================================\n           Settings panel\n           ========================================================= */\n\n        .settings-panel {\n          background: var(--ov-bg-solid);\n          border: 1px solid var(--ov-border-strong);\n          border-radius: 12px;\n          box-shadow: 0 22px 56px rgba(0, 0, 0, 0.50);\n          box-sizing: border-box;\n          color: var(--ov-text);\n          display: none;\n          font-size: 12px;\n          line-height: 1.4;\n          max-height: calc(100vh - 64px);\n          overflow-y: auto;\n          padding: 14px 14px 16px;\n          pointer-events: auto;\n          position: absolute;\n          right: 8px;\n          scrollbar-color: var(--ov-border-strong) transparent;\n          scrollbar-width: thin;\n          top: 42px;\n          width: min(360px, calc(100vw - 24px));\n          z-index: 4;\n        }\n\n        .settings-panel::-webkit-scrollbar { width: 8px; }\n        .settings-panel::-webkit-scrollbar-thumb {\n          background: var(--ov-border-strong);\n          border: 2px solid var(--ov-bg-solid);\n          border-radius: 999px;\n        }\n\n        .subtitle-window.settings-open .settings-panel {\n          display: block;\n        }\n\n        .settings-title {\n          color: var(--ov-text);\n          font-size: 13px;\n          font-weight: 800;\n          letter-spacing: -0.015em;\n          margin-bottom: 4px;\n        }\n\n        .settings-sub {\n          color: var(--ov-text-3);\n          font-size: 11px;\n          font-weight: 600;\n          margin-bottom: 14px;\n        }\n\n        .settings-field {\n          display: grid;\n          gap: 6px;\n          margin-bottom: 12px;\n        }\n\n        .settings-field > .settings-label {\n          align-items: baseline;\n          color: var(--ov-text-2);\n          display: flex;\n          font-size: 11px;\n          font-weight: 700;\n          justify-content: space-between;\n          letter-spacing: 0.01em;\n          line-height: 1.2;\n        }\n\n        .settings-value {\n          color: var(--ov-text);\n          font-family: var(--ov-mono);\n          font-size: 11px;\n          font-variant-numeric: tabular-nums;\n          font-weight: 700;\n        }\n\n        .settings-row {\n          display: grid;\n          gap: 8px;\n          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n          margin-bottom: 12px;\n        }\n\n        .settings-panel select,\n        .settings-panel input[type="number"] {\n          background: var(--ov-surface);\n          border: 1px solid var(--ov-border);\n          border-radius: 7px;\n          color: var(--ov-text);\n          font: 600 12px/1.2 Inter, ui-sans-serif, system-ui, "Microsoft JhengHei", sans-serif;\n          min-height: 32px;\n          outline: none;\n          padding: 5px 9px;\n          transition: border-color 120ms ease, box-shadow 120ms ease;\n          width: 100%;\n        }\n\n        .settings-panel select {\n          appearance: none;\n          background-image:\n            linear-gradient(45deg, transparent 50%, var(--ov-text-3) 50%),\n            linear-gradient(135deg, var(--ov-text-3) 50%, transparent 50%);\n          background-position:\n            calc(100% - 14px) 14px,\n            calc(100% - 9px) 14px;\n          background-repeat: no-repeat;\n          background-size: 5px 5px;\n          cursor: pointer;\n          padding-right: 26px;\n        }\n\n        .settings-panel select:focus,\n        .settings-panel input:focus {\n          border-color: rgba(108, 155, 255, 0.65);\n          box-shadow: 0 0 0 3px rgba(74, 132, 255, 0.20);\n        }\n\n        .settings-font-preview {\n          background: var(--ov-surface);\n          border: 1px dashed var(--ov-border-strong);\n          border-radius: 8px;\n          color: var(--ov-text);\n          display: block;\n          font-size: 16px;\n          font-weight: 600;\n          letter-spacing: 0;\n          line-height: 1.4;\n          margin-top: 8px;\n          padding: 10px 12px;\n          text-align: center;\n          transition: font-family 120ms ease;\n        }\n\n        .settings-slider {\n          -webkit-appearance: none;\n          appearance: none;\n          background: transparent;\n          cursor: pointer;\n          height: 18px;\n          margin: 0;\n          padding: 0;\n          width: 100%;\n        }\n\n        .settings-slider::-webkit-slider-runnable-track {\n          background: var(--ov-border-strong);\n          border-radius: 999px;\n          height: 4px;\n        }\n\n        .settings-slider::-webkit-slider-thumb {\n          -webkit-appearance: none;\n          appearance: none;\n          background: var(--ov-accent);\n          border: 3px solid var(--ov-bg-solid);\n          border-radius: 999px;\n          box-shadow: 0 0 0 1px var(--ov-accent-2);\n          cursor: pointer;\n          height: 18px;\n          margin-top: -7px;\n          transition: transform 120ms ease;\n          width: 18px;\n        }\n\n        .settings-slider::-webkit-slider-thumb:hover {\n          transform: scale(1.08);\n        }\n\n        .settings-slider::-moz-range-track {\n          background: var(--ov-border-strong);\n          border-radius: 999px;\n          height: 4px;\n        }\n\n        .settings-slider::-moz-range-thumb {\n          background: var(--ov-accent);\n          border: 3px solid var(--ov-bg-solid);\n          border-radius: 999px;\n          box-shadow: 0 0 0 1px var(--ov-accent-2);\n          cursor: pointer;\n          height: 18px;\n          width: 18px;\n        }\n\n        .settings-toggle {\n          align-items: center;\n          background: var(--ov-surface);\n          border: 1px solid var(--ov-border);\n          border-radius: 8px;\n          cursor: pointer;\n          display: flex;\n          gap: 10px;\n          margin-bottom: 12px;\n          padding: 9px 11px;\n          transition: background-color 120ms ease, border-color 120ms ease;\n        }\n\n        .settings-toggle:hover {\n          background: var(--ov-surface-2);\n          border-color: var(--ov-border-strong);\n        }\n\n        .settings-toggle-text {\n          display: grid;\n          flex: 1;\n          gap: 2px;\n          min-width: 0;\n        }\n\n        .settings-toggle-title {\n          color: var(--ov-text);\n          font-size: 12px;\n          font-weight: 700;\n        }\n\n        .settings-toggle-desc {\n          color: var(--ov-text-3);\n          font-size: 10.5px;\n          font-weight: 500;\n        }\n\n        .settings-switch {\n          flex: 0 0 auto;\n          height: 20px;\n          position: relative;\n          width: 34px;\n        }\n\n        .settings-switch input {\n          cursor: pointer;\n          inset: 0;\n          margin: 0;\n          opacity: 0;\n          position: absolute;\n          width: 100%;\n          z-index: 1;\n        }\n\n        .settings-switch-track {\n          background: #4a5468;\n          border-radius: 999px;\n          inset: 0;\n          position: absolute;\n          transition: background-color 180ms ease;\n        }\n\n        .settings-switch-track::after {\n          background: #ffffff;\n          border-radius: 999px;\n          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);\n          content: "";\n          height: 16px;\n          left: 2px;\n          position: absolute;\n          top: 2px;\n          transition: transform 180ms ease;\n          width: 16px;\n        }\n\n        .settings-switch input:checked + .settings-switch-track {\n          background: var(--ov-accent);\n        }\n\n        .settings-switch input:checked + .settings-switch-track::after {\n          transform: translateX(14px);\n        }\n\n        .settings-color-row {\n          align-items: center;\n          background: var(--ov-surface);\n          border: 1px solid var(--ov-border);\n          border-radius: 8px;\n          display: flex;\n          gap: 8px;\n          padding: 4px 10px 4px 4px;\n        }\n\n        .settings-color-row input[type="color"] {\n          background: transparent;\n          border: 0;\n          cursor: pointer;\n          height: 28px;\n          padding: 0;\n          width: 28px;\n        }\n\n        .settings-color-row input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }\n        .settings-color-row input[type="color"]::-webkit-color-swatch {\n          border: 1px solid var(--ov-border-strong);\n          border-radius: 5px;\n        }\n\n        .settings-color-hex {\n          color: var(--ov-text-2);\n          font-family: var(--ov-mono);\n          font-size: 11px;\n          letter-spacing: 0.04em;\n          text-transform: uppercase;\n        }\n\n        .settings-actions {\n          border-top: 1px solid var(--ov-border);\n          color: var(--ov-text-3);\n          display: flex;\n          font-size: 10.5px;\n          font-weight: 600;\n          gap: 8px;\n          justify-content: flex-end;\n          margin-top: 8px;\n          padding-top: 10px;\n        }\n\n        .settings-reset-button {\n          background: var(--ov-surface);\n          border: 1px solid var(--ov-border);\n          border-radius: 7px;\n          color: var(--ov-text-2);\n          cursor: pointer;\n          font: 800 11px/1 Inter, sans-serif;\n          height: 28px;\n          padding: 0 12px;\n        }\n\n        .settings-reset-button:hover {\n          background: var(--ov-surface-2);\n          border-color: var(--ov-border-strong);\n          color: var(--ov-text);\n        }\n\n        /* =========================================================\n           Interaction window (chat + reply)\n           ========================================================= */\n\n        .interaction-window {\n          background: var(--ov-bg-solid);\n          border: 1px solid var(--ov-border-strong);\n          border-radius: 12px;\n          box-shadow: 0 22px 56px rgba(0, 0, 0, 0.50);\n          box-sizing: border-box;\n          color: var(--ov-text);\n          display: none;\n          gap: 12px;\n          grid-template-rows: auto minmax(0, 1fr);\n          max-height: calc(100vh - 16px);\n          min-height: 300px;\n          min-width: 320px;\n          overflow: hidden;\n          padding: 14px;\n          pointer-events: auto;\n          position: fixed;\n          z-index: 2147483646;\n        }\n\n        .interaction-window.open {\n          display: grid;\n        }\n\n        .interaction-header {\n          align-items: flex-start;\n          cursor: grab;\n          display: flex;\n          gap: 8px;\n          justify-content: space-between;\n          user-select: none;\n        }\n\n        .interaction-header:active {\n          cursor: grabbing;\n        }\n\n        .interaction-header-actions,\n        .live-chat-header-actions {\n          align-items: center;\n          display: flex;\n          flex: 0 0 auto;\n          gap: 6px;\n        }\n\n        .interaction-mini-button,\n        .live-chat-scroll-bottom {\n          align-items: center;\n          background: var(--ov-surface-2);\n          border: 1px solid var(--ov-border);\n          border-radius: 7px;\n          color: var(--ov-text);\n          cursor: pointer;\n          display: inline-flex;\n          font: 800 11px/1 Inter, ui-sans-serif, system-ui, "Microsoft JhengHei", sans-serif;\n          height: 28px;\n          justify-content: center;\n          min-width: 42px;\n          padding: 0 10px;\n          transition: background-color 120ms ease, border-color 120ms ease;\n        }\n\n        .interaction-mini-button:hover,\n        .live-chat-scroll-bottom:hover {\n          background: var(--ov-surface-3);\n          border-color: var(--ov-border-strong);\n        }\n\n        .interaction-mini-button[hidden],\n        .live-chat-scroll-bottom[hidden] {\n          display: none;\n        }\n\n        .interaction-title {\n          color: var(--ov-text);\n          font-size: 13px;\n          font-weight: 800;\n          letter-spacing: -0.015em;\n          line-height: 1.2;\n        }\n\n        .interaction-subtitle {\n          color: var(--ov-text-3);\n          font-size: 11px;\n          font-weight: 600;\n          line-height: 1.35;\n          margin-top: 3px;\n        }\n\n        .interaction-content {\n          display: grid;\n          gap: 12px;\n          grid-template-rows: minmax(150px, 1fr) auto;\n          min-height: 0;\n          overflow: hidden;\n        }\n\n        .reply-window,\n        .live-chat-window {\n          box-sizing: border-box;\n          display: none;\n          min-height: 0;\n        }\n\n        .reply-window.open,\n        .live-chat-window.open {\n          display: grid;\n        }\n\n        .reply-window {\n          border-top: 1px solid var(--ov-border);\n          gap: 10px;\n          grid-template-rows: auto auto minmax(56px, auto) auto auto;\n          padding-top: 12px;\n        }\n\n        .reply-header,\n        .live-chat-header {\n          align-items: center;\n          display: flex;\n          gap: 8px;\n          justify-content: space-between;\n        }\n\n        .reply-title,\n        .live-chat-title {\n          color: var(--ov-text);\n          font-size: 12.5px;\n          font-weight: 800;\n          letter-spacing: -0.01em;\n          line-height: 1.2;\n        }\n\n        .live-chat-batch-note {\n          background: var(--ov-surface);\n          border: 1px solid var(--ov-border);\n          border-radius: 999px;\n          color: var(--ov-text-3);\n          font-size: 10px;\n          font-weight: 700;\n          letter-spacing: 0.04em;\n          line-height: 1;\n          padding: 5px 8px;\n          text-transform: uppercase;\n        }\n\n        .live-chat-scroll-bottom {\n          min-width: 50px;\n        }\n\n        .reply-target,\n        .reply-status {\n          color: var(--ov-text-3);\n          font-size: 11px;\n          font-weight: 600;\n          line-height: 1.4;\n        }\n\n        .reply-input,\n        .reply-output {\n          background: var(--ov-surface);\n          border: 1px solid var(--ov-border);\n          border-radius: 8px;\n          box-sizing: border-box;\n          color: var(--ov-text);\n          font: 600 13px/1.5 Inter, ui-sans-serif, system-ui, "Microsoft JhengHei", sans-serif;\n          min-height: 72px;\n          outline: none;\n          padding: 9px 11px;\n          resize: vertical;\n          transition: border-color 120ms ease, box-shadow 120ms ease, background-color 120ms ease;\n          width: 100%;\n        }\n\n        .reply-input::placeholder {\n          color: var(--ov-text-3);\n        }\n\n        .reply-input:focus {\n          background: var(--ov-surface-2);\n          border-color: rgba(108, 155, 255, 0.65);\n          box-shadow: 0 0 0 3px rgba(74, 132, 255, 0.20);\n        }\n\n        .reply-output {\n          color: var(--ov-text-2);\n          margin: 0;\n          max-height: 160px;\n          overflow: auto;\n          white-space: pre-wrap;\n        }\n\n        .reply-actions {\n          display: grid;\n          gap: 8px;\n          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n        }\n\n        .reply-actions button {\n          height: 34px;\n          min-width: 0;\n        }\n\n        .reply-actions button[data-action="reply-translate"] {\n          background: var(--ov-accent);\n          border-color: var(--ov-accent);\n          color: #fff;\n        }\n\n        .reply-actions button[data-action="reply-translate"]:hover {\n          background: var(--ov-accent-2);\n          border-color: var(--ov-accent-2);\n        }\n\n        .reply-window.busy .reply-actions button[data-action="reply-translate"] {\n          opacity: 0.65;\n        }\n\n        .reply-window.error .reply-status {\n          color: var(--ov-danger);\n        }\n\n        .live-chat-window {\n          gap: 10px;\n          grid-template-rows: auto auto minmax(120px, 1fr) auto;\n        }\n\n        .live-chat-list {\n          display: grid;\n          align-content: start;\n          gap: 3px;\n          min-height: 0;\n          overflow-y: auto;\n          padding-right: 4px;\n          scrollbar-color: var(--ov-border-strong) transparent;\n          scrollbar-width: thin;\n        }\n\n        .live-chat-list::-webkit-scrollbar { width: 6px; }\n        .live-chat-list::-webkit-scrollbar-thumb {\n          background: var(--ov-border-strong);\n          border-radius: 999px;\n        }\n\n        .live-chat-item {\n          min-width: 0;\n          margin: 0;\n          background: transparent;\n          border: 0;\n          border-radius: 0;\n          display: block;\n          padding: 4px 0;\n        }\n        .live-chat-item.with-avatar { display: grid; grid-template-columns: 24px minmax(0, 1fr); column-gap: 8px; }\n        .live-chat-avatar { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; margin-top: 1px; }\n        .live-chat-body { min-width: 0; line-height: 1.5; text-align: start; }\n        .live-chat-author-badge { display: inline-block; width: 14px; height: 14px; object-fit: contain; vertical-align: middle; margin-right: 5px; }\n\n        .live-chat-author {\n          display: inline;\n          margin-right: 6px;\n          color: var(--ov-text-2);\n          font-size: 14px;\n          font-weight: 600;\n          line-height: 1.5;\n          min-width: 0;\n          overflow-wrap: anywhere;\n          white-space: normal;\n          unicode-bidi: plaintext;\n        }\n        .live-chat-author[data-role="member"] { color: #2ba640; }\n        .live-chat-author[data-role="moderator"] { color: #6a9bff; }\n        .live-chat-author[data-role="owner"] { color: #e8b91d; }\n\n        .live-chat-original,\n        .live-chat-translation {\n          min-width: 0;\n          unicode-bidi: plaintext;\n          margin: 0;\n          overflow-wrap: anywhere;\n          white-space: pre-wrap;\n        }\n\n        .live-chat-original {\n          display: inline;\n          color: var(--ov-text-2);\n          font-size: 14px;\n          line-height: 1.5;\n        }\n\n        .live-chat-translation {\n          display: block;\n          margin-top: 2px;\n          color: var(--ov-text);\n          font-size: 14px;\n          font-weight: 500;\n          line-height: 1.45;\n        }\n\n        .live-chat-item.pending .live-chat-translation {\n          color: var(--ov-text-3);\n          font-weight: 600;\n        }\n\n        .live-chat-status {\n          color: var(--ov-text-3);\n          font-size: 11px;\n          font-weight: 600;\n          line-height: 1.4;\n        }\n\n        .live-chat-window.error .live-chat-status {\n          color: var(--ov-danger);\n        }\n\n        .interaction-resize-handle {\n          bottom: 0;\n          cursor: nwse-resize;\n          height: 24px;\n          position: absolute;\n          right: 0;\n          touch-action: none;\n          width: 24px;\n          z-index: 4;\n        }\n\n        .interaction-resize-handle::after {\n          background:\n            linear-gradient(135deg, transparent 50%, var(--ov-border-strong) 50%, var(--ov-border-strong) 60%, transparent 60%, transparent 70%, var(--ov-border-strong) 70%, var(--ov-border-strong) 80%, transparent 80%);\n          bottom: 4px;\n          content: "";\n          display: block;\n          height: 12px;\n          position: absolute;\n          right: 4px;\n          width: 12px;\n        }\n\n        /* =========================================================\n           Subtitle body\n           ========================================================= */\n\n        .body {\n          box-sizing: border-box;\n          display: grid;\n          gap: 4px;\n          overflow: hidden;\n          padding: 4px 14px 6px;\n        }\n\n        .subtitle-window:not(.large-mode) .body {\n          grid-template-rows: minmax(0, 1fr);\n          height: calc(100% - 30px);\n        }\n\n        .subtitle-lines {\n          display: flex;\n          flex-direction: column;\n          gap: 6px;\n          justify-content: flex-end;\n          min-height: 0;\n          opacity: 1;\n          overflow: hidden;\n          transition: opacity 260ms ease;\n        }\n\n        .subtitle-window.single-line-mode .subtitle-lines {\n          gap: 0;\n          justify-content: center;\n        }\n\n        .subtitle-window.single-line-mode .body {\n          padding: 2px 10px 4px;\n        }\n\n        .subtitle-window.subtitle-fading .subtitle-lines,\n        .subtitle-window.subtitle-empty .subtitle-lines {\n          opacity: 0;\n        }\n\n        .subtitle-window.transparent-mode.subtitle-empty .subtitle-lines {\n          opacity: 0.82;\n        }\n\n        .subtitle-line {\n          display: grid;\n          gap: 3px;\n          min-width: 0;\n        }\n\n        .subtitle-line-original,\n        .subtitle-line-translation {\n          -webkit-box-orient: vertical;\n          display: -webkit-box;\n          letter-spacing: 0;\n          margin: 0;\n          overflow: hidden;\n          overflow-wrap: anywhere;\n          text-align: center;\n          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.72);\n          white-space: pre-wrap;\n        }\n\n        .subtitle-window.transparent-mode:not(:hover):not(.usage-open) .subtitle-line-original,\n        .subtitle-window.transparent-mode:not(:hover):not(.usage-open) .subtitle-line-translation,\n        .subtitle-window.transparent-mode:not(:hover):not(.usage-open) .original,\n        .subtitle-window.transparent-mode:not(:hover):not(.usage-open) .translation,\n        .subtitle-window.transparent-mode:not(:hover):not(.usage-open) .large-original,\n        .subtitle-window.transparent-mode:not(:hover):not(.usage-open) .large-translation,\n        .subtitle-window.transparent-mode:not(:hover):not(.usage-open) .large-empty {\n          -webkit-text-stroke: 0.45px rgba(0, 0, 0, 0.68);\n          text-shadow:\n            0 2px 3px rgba(0, 0, 0, 0.92),\n            0 0 10px rgba(0, 0, 0, 0.9),\n            0 0 22px rgba(0, 0, 0, 0.72);\n        }\n\n        .subtitle-window.transparent-mode.subtitle-empty .subtitle-line.locator {\n          justify-items: center;\n        }\n\n        .subtitle-window.transparent-mode.subtitle-empty .subtitle-line.locator .subtitle-line-original {\n          display: none !important;\n        }\n\n        .subtitle-window.transparent-mode.subtitle-empty .subtitle-line.locator .subtitle-line-translation {\n          color: rgba(255, 255, 255, 0.78);\n          display: block !important;\n          font-size: max(13px, calc(var(--subtitle-font-size, 28px) * 0.46));\n          font-weight: 800;\n          letter-spacing: 0;\n          line-height: 1.2;\n          text-align: center;\n        }\n\n        .subtitle-line-original {\n          color: var(--subtitle-original-color, #d8e2f2);\n          font-size: calc(var(--subtitle-font-size, 28px) * var(--subtitle-original-scale, 0.62));\n          font-weight: 650;\n          line-height: 1.28;\n        }\n\n        .subtitle-line-translation {\n          color: var(--subtitle-translation-color, #ffffff);\n          font-size: var(--subtitle-font-size, 28px);\n          font-weight: 850;\n          line-height: 1.28;\n        }\n\n        .subtitle-line.active .subtitle-line-translation {\n          font-weight: 900;\n        }\n\n        .subtitle-window.single-line-mode .subtitle-line {\n          gap: 1px;\n        }\n\n        .subtitle-window.single-line-mode .subtitle-line-original {\n          -webkit-line-clamp: 1;\n          color: #c5d4eb;\n          display: -webkit-box;\n          font-size: calc(var(--subtitle-font-size, 28px) * var(--subtitle-original-single-scale, 0.5));\n          line-height: 1.1;\n          white-space: normal;\n        }\n\n        .subtitle-window.single-line-mode .subtitle-line-translation {\n          -webkit-line-clamp: 2;\n          font-size: calc(var(--subtitle-font-size, 28px) * 0.86);\n          line-height: 1.14;\n          overflow: hidden;\n          overflow-wrap: anywhere;\n          text-overflow: clip;\n          white-space: normal;\n        }\n\n        .subtitle-window.single-line-mode.large-mode .body {\n          display: grid;\n          gap: 0;\n          grid-template-rows: minmax(0, 1fr);\n          height: calc(100% - 38px);\n          padding: 8px 12px 10px;\n        }\n\n        .subtitle-window.single-line-mode.large-mode .subtitle-lines {\n          align-content: center;\n          display: grid;\n        }\n\n        .subtitle-window.single-line-mode.large-mode .large-lines {\n          display: none;\n        }\n\n        .subtitle-window.translation-only .subtitle-line-original,\n        .subtitle-window.original-only .subtitle-line-translation {\n          display: none;\n        }\n\n        .subtitle-window.translation-only .subtitle-line,\n        .subtitle-window.original-only .subtitle-line {\n          gap: 0;\n        }\n\n        .subtitle-window:not(.large-mode) .body > .original,\n        .subtitle-window:not(.large-mode) .body > .translation {\n          display: none;\n        }\n\n        .original,\n        .translation {\n          -webkit-box-orient: vertical;\n          display: -webkit-box;\n          letter-spacing: 0;\n          line-height: 1.28;\n          margin: 0;\n          overflow: hidden;\n          overflow-wrap: anywhere;\n          text-align: center;\n          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.72);\n        }\n\n        .original {\n          -webkit-line-clamp: 2;\n          color: var(--subtitle-original-color, #d8e2f2);\n          font-size: calc(var(--subtitle-font-size, 28px) * var(--subtitle-original-scale, 0.62));\n          font-weight: 650;\n        }\n\n        .translation {\n          -webkit-line-clamp: 2;\n          color: var(--subtitle-translation-color, #ffffff);\n          font-size: var(--subtitle-font-size, 28px);\n          font-weight: 850;\n        }\n\n        .subtitle-window.original-only .original,\n        .subtitle-window.translation-only .translation {\n          -webkit-line-clamp: 3;\n        }\n\n        .subtitle-window.translation-only .original,\n        .subtitle-window.original-only .translation {\n          display: none;\n        }\n\n        .large-lines {\n          display: none;\n        }\n\n        .subtitle-measure {\n          contain: layout style paint;\n          left: -10000px;\n          pointer-events: none;\n          position: absolute;\n          top: -10000px;\n          visibility: hidden;\n        }\n\n        .subtitle-measure .subtitle-lines {\n          display: flex !important;\n          flex-direction: column;\n          justify-content: flex-start;\n          overflow: visible;\n        }\n\n        .subtitle-measure.measure-stack .subtitle-lines {\n          gap: 6px !important;\n        }\n\n        .subtitle-measure.measure-stack .subtitle-line {\n          gap: 3px !important;\n        }\n\n        .subtitle-measure.measure-stack .subtitle-line-original {\n          -webkit-line-clamp: unset !important;\n          display: -webkit-box !important;\n          font-size: calc(var(--subtitle-font-size, 28px) * var(--subtitle-original-scale, 0.62)) !important;\n          line-height: 1.28 !important;\n          white-space: pre-wrap !important;\n        }\n\n        .subtitle-measure.measure-stack .subtitle-line-translation {\n          -webkit-line-clamp: unset !important;\n          display: -webkit-box !important;\n          font-size: var(--subtitle-font-size, 28px) !important;\n          line-height: 1.28 !important;\n          overflow: hidden !important;\n          text-overflow: clip !important;\n          white-space: pre-wrap !important;\n        }\n\n        .subtitle-window.large-mode .body {\n          gap: 0;\n          grid-template-rows: minmax(0, 1fr);\n          height: calc(100% - 30px);\n          padding: 6px 16px 8px;\n        }\n\n        .subtitle-window.side-mode {\n          background: var(--ov-bg);\n          border-color: var(--ov-border-strong);\n        }\n\n        .subtitle-window.side-mode.transparent-mode:hover,\n        .subtitle-window.side-mode.transparent-mode.usage-open {\n          background: var(--ov-bg-solid);\n        }\n\n        .subtitle-window.side-mode .body {\n          gap: 0;\n          grid-template-rows: minmax(0, 1fr);\n          height: calc(100% - 30px);\n          padding: 6px 14px 8px;\n        }\n\n        .subtitle-window.large-mode .original,\n        .subtitle-window.large-mode .translation,\n        .subtitle-window.large-mode .subtitle-lines,\n        .subtitle-window.side-mode .original,\n        .subtitle-window.side-mode .translation,\n        .subtitle-window.side-mode .subtitle-lines {\n          display: none;\n        }\n\n        .subtitle-window.large-mode .large-lines,\n        .subtitle-window.side-mode .large-lines {\n          align-content: start;\n          display: grid;\n          gap: 10px;\n          min-height: 0;\n          opacity: 1;\n          overflow-y: auto;\n          padding-right: 4px;\n          scrollbar-width: thin;\n          transition: opacity 260ms ease;\n        }\n\n        .subtitle-window.side-mode .large-lines {\n          gap: 12px;\n          overscroll-behavior: contain;\n          padding-right: 8px;\n        }\n\n        .subtitle-window.subtitle-fading .large-lines,\n        .subtitle-window.subtitle-empty .large-lines {\n          opacity: 0;\n        }\n\n        .subtitle-window.transparent-mode.subtitle-empty .large-lines {\n          opacity: 0.82;\n        }\n\n        .large-line {\n          border-bottom: 1px solid var(--ov-border);\n          display: grid;\n          gap: 4px;\n          padding: 0 0 10px;\n        }\n\n        .large-line:last-child {\n          border-bottom: 0;\n          padding-bottom: 0;\n        }\n\n        .large-original,\n        .large-translation {\n          letter-spacing: 0;\n          margin: 0;\n          overflow-wrap: anywhere;\n          text-align: left;\n          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.72);\n        }\n\n        .large-original {\n          color: var(--subtitle-original-color, #aebed4);\n          font-size: calc(var(--subtitle-font-size, 28px) * var(--subtitle-original-large-scale, 0.46));\n          font-weight: 650;\n          line-height: 1.3;\n        }\n\n        .large-translation {\n          color: var(--subtitle-translation-color, #ffffff);\n          font-size: calc(var(--subtitle-font-size, 28px) * 0.7);\n          font-weight: 820;\n          line-height: 1.32;\n        }\n\n        .large-line.active .large-translation {\n          color: var(--subtitle-translation-color, #ffffff);\n          font-weight: 900;\n        }\n\n        .subtitle-window.side-mode .large-line {\n          border-bottom-color: var(--ov-border);\n          padding-bottom: 12px;\n        }\n\n        .subtitle-window.side-mode .large-original {\n          color: var(--subtitle-original-color, #9fb0c8);\n          font-size: max(12px, calc(var(--subtitle-font-size, 28px) * var(--subtitle-original-large-scale, 0.46)));\n          line-height: 1.35;\n        }\n\n        .subtitle-window.side-mode .large-translation {\n          color: var(--subtitle-translation-color, #ffffff);\n          font-size: max(16px, calc(var(--subtitle-font-size, 28px) * 0.62));\n          line-height: 1.38;\n        }\n\n        .subtitle-window.side-mode .large-line.active {\n          background: var(--ov-accent-soft);\n          border-left: 2px solid var(--ov-accent);\n          border-radius: 7px;\n          margin: 0 -8px;\n          padding: 8px 8px 12px 10px;\n        }\n\n        .large-empty {\n          color: rgba(255, 255, 255, 0.76);\n          font-size: calc(var(--subtitle-font-size, 28px) * 0.7);\n          font-weight: 800;\n          line-height: 1.35;\n          margin: 0;\n          text-align: center;\n        }\n\n        .subtitle-window.transparent-mode.subtitle-empty .large-empty {\n          color: rgba(255, 255, 255, 0.78);\n          font-size: max(13px, calc(var(--subtitle-font-size, 28px) * 0.46));\n        }\n\n        /* =========================================================\n           Collapsed + resize handle\n           ========================================================= */\n\n        .subtitle-window.collapsed {\n          min-height: 38px;\n          width: 280px;\n        }\n\n        .subtitle-window.collapsed .toolbar {\n          border-bottom: 0;\n        }\n\n        .subtitle-window.collapsed .body,\n        .subtitle-window.collapsed .resize-handle {\n          display: none;\n        }\n\n        .resize-handle {\n          bottom: 0;\n          cursor: nwse-resize;\n          height: 24px;\n          position: absolute;\n          right: 0;\n          touch-action: none;\n          width: 24px;\n          z-index: 5;\n          transition: opacity 160ms ease;\n        }\n\n        .resize-handle::after {\n          background:\n            linear-gradient(135deg,\n              transparent 0%, transparent 45%,\n              var(--ov-border-strong) 45%, var(--ov-border-strong) 55%,\n              transparent 55%, transparent 65%,\n              var(--ov-border-strong) 65%, var(--ov-border-strong) 75%,\n              transparent 75%);\n          bottom: 5px;\n          content: "";\n          display: block;\n          height: 12px;\n          position: absolute;\n          right: 5px;\n          width: 12px;\n          transition: background 160ms ease;\n        }\n\n        .resize-handle:hover::after {\n          background:\n            linear-gradient(135deg,\n              transparent 0%, transparent 45%,\n              var(--ov-text-2) 45%, var(--ov-text-2) 55%,\n              transparent 55%, transparent 65%,\n              var(--ov-text-2) 65%, var(--ov-text-2) 75%,\n              transparent 75%);\n        }\n/* Responsive caption toolbar: size against the subtitle box, not the viewport. */\n.subtitle-window {\n  display: grid;\n  grid-template-rows: auto minmax(0, 1fr);\n}\n.subtitle-window .toolbar {\n  box-sizing: border-box;\n  flex-wrap: wrap;\n  height: auto;\n  min-height: 30px;\n  padding: 3px 8px;\n  border-radius: 9px 9px 0 0;\n}\n.subtitle-window .toolbar > * { max-width: 100%; }\n.subtitle-window .toolbar .status-pill {\n  flex: 1 1 100px;\n  min-width: 72px;\n  letter-spacing: 0;\n}\n.subtitle-window .toolbar button.quota {\n  flex: 0 1 auto;\n  max-width: 100%;\n  min-width: 0;\n  overflow-wrap: anywhere;\n  letter-spacing: 0;\n}\n.subtitle-window .toolbar .tb-sep { display: none; }\n.subtitle-window:not(.collapsed) .body {\n  grid-row: 2;\n  height: auto;\n  min-height: 0;\n  min-width: 0;\n}\n.subtitle-window .usage-panel,\n.subtitle-window .settings-panel {\n  grid-row: 2;\n  top: 8px;\n}\n.subtitle-window.transparent-mode:not(:hover):not(.usage-open):not(.settings-open):not(.collapsed) .toolbar {\n  height: 0;\n  min-height: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  border-bottom: 0;\n}\n.subtitle-window.collapsed .toolbar {\n  flex-wrap: nowrap;\n  min-height: 36px;\n}\n.subtitle-window.collapsed .toolbar > :not(.close-button):not(.status-pill):not([data-action="collapse"]) {\n  display: none;\n}\n\n      </style>\n      <section class="subtitle-window" role="region" aria-label="AI live subtitle">\n        <div class="toolbar">\n          <button class="close-button" data-action="close" title="關閉字幕" aria-label="關閉字幕">×</button>\n          <span class="status-pill">\n            <span class="vu" aria-hidden="true"><i></i><i></i><i></i></span>\n            <span class="status">待命</span>\n          </span>\n          <button class="quota" data-action="usage-toggle" data-balance-field="summary" title="剩餘額度與本次用量" aria-expanded="false">Textamisu 額度讀取中</button>\n          <span class="tb-sep" aria-hidden="true"></span>\n          <div class="font-control" role="group" aria-label="字體大小">\n            <button data-action="font-down" title="縮小字體" aria-label="縮小字體">A−</button>\n            <span class="font-size-display" data-font-size-display title="目前字體大小">28</span>\n            <button data-action="font-up" title="放大字體" aria-label="放大字體">A+</button>\n          </div>\n          <button data-action="opacity" title="調整背景明暗">深淺</button>\n          <button data-action="transparent-toggle" title="透明模式：滑鼠移開只留字幕" aria-pressed="false">透明</button>\n          <span class="tb-sep" aria-hidden="true"></span>\n          <button data-action="mode" title="切換原文/翻譯/大視窗/旁側長條">雙語</button>\n          <button data-action="chat-toggle" title="直播聊天：留言翻譯與寫回覆">聊天</button>\n          <span class="tb-sep" aria-hidden="true"></span>\n          <button data-action="settings-toggle" title="字幕外觀設定" aria-expanded="false" aria-label="字幕外觀設定">設定</button>\n          <button data-action="collapse" title="縮小字幕匡" aria-label="縮小字幕匡">-</button>\n        </div>\n        <aside class="usage-panel" aria-live="polite">\n          <div class="usage-panel-title">Textamisu 用量與狀態</div>\n          <div class="usage-section">\n            <div class="usage-section-head">Textamisu 額度</div>\n            <dl class="usage-grid">\n              <div class="usage-row"><dt>可用／預留</dt><dd data-balance-field="balance">讀取中</dd></div>\n              <div class="usage-row primary"><dt>本次已扣</dt><dd data-balance-field="time">讀取中</dd></div>\n              <div class="usage-row"><dt>計費方式</dt><dd data-balance-field="rate">Textamisu</dd></div>\n            </dl>\n            <div class="usage-note" data-balance-field="note">等待 Textamisu 回傳實際額度。</div>\n          </div>\n          <div class="usage-section">\n            <div class="usage-section-head">音訊與批次</div>\n            <dl class="usage-grid">\n              <div class="usage-row"><dt>開啟時間</dt><dd data-usage-field="elapsed">0s</dd></div>\n              <div class="usage-row"><dt>音訊時長</dt><dd data-usage-field="stt">0s</dd></div>\n              <div class="usage-row"><dt>VAD</dt><dd data-usage-field="vad">等待樣本</dd></div>\n              <div class="usage-row"><dt>批次</dt><dd data-usage-field="batch">等待樣本</dd></div>\n            </dl>\n          </div>\n          <div class="usage-section">\n            <div class="usage-section-head">字幕狀態</div>\n            <dl class="usage-grid">\n              <div class="usage-row"><dt>字幕流</dt><dd data-usage-field="pipeline">等待樣本</dd></div>\n              <div class="usage-row"><dt>字幕緩衝</dt><dd data-usage-field="subtitleBuffer">未播 0 段</dd></div>\n              <div class="usage-row"><dt>延遲</dt><dd data-usage-field="latency">等待樣本</dd></div>\n              <div class="usage-row"><dt>同步</dt><dd data-usage-field="sync">等待樣本</dd></div>\n              <div class="usage-row"><dt>翻譯服務</dt><dd data-usage-field="provider">Textamisu</dd></div>\n              <div class="usage-row"><dt>用量來源</dt><dd data-usage-field="source">Textamisu API</dd></div>\n            </dl>\n          </div>\n        </aside>\n        <aside class="settings-panel" aria-live="polite" aria-label="字幕外觀設定">\n          <div class="settings-title">字幕外觀</div>\n          <div class="settings-sub">所有變更會即時套用並保存。</div>\n\n          <label class="settings-field">\n            <span class="settings-label">顯示模式</span>\n            <select data-settings="mode">\n              <option value="dual">原文 + 翻譯</option>\n              <option value="translation">只顯示翻譯</option>\n              <option value="original">只顯示原文</option>\n              <option value="large">長文隊列</option>\n              <option value="side">旁側長條</option>\n            </select>\n          </label>\n\n          <div class="settings-field">\n            <div class="settings-label">\n              <span>字體大小</span>\n              <span class="settings-value" data-settings-value="fontSize">28 px</span>\n            </div>\n            <input class="settings-slider" type="range" min="18" max="84" step="1" data-settings="fontSize">\n          </div>\n\n          <label class="settings-field">\n            <span class="settings-label">字體</span>\n            <select data-settings="fontFamily">\n              <option value="system">系統字體</option>\n              <option value="noto-sans">Noto Sans</option>\n              <option value="source-han">思源黑體</option>\n              <option value="rounded">圓體</option>\n              <option value="serif">明體 / 襯線</option>\n              <option value="mono">等寬字體</option>\n            </select>\n            <span class="settings-font-preview" data-font-preview aria-hidden="true">字幕翻譯範例 · Subtitle Preview · 1234</span>\n          </label>\n\n          <label class="settings-toggle">\n            <span class="settings-toggle-text">\n              <span class="settings-toggle-title">雙語字體大小一致</span>\n              <span class="settings-toggle-desc">原文與翻譯使用同樣大小</span>\n            </span>\n            <span class="settings-switch">\n              <input type="checkbox" data-settings="equalBilingualFontSize">\n              <span class="settings-switch-track" aria-hidden="true"></span>\n            </span>\n          </label>\n\n          <div class="settings-field">\n            <div class="settings-label">\n              <span>背景深度</span>\n              <span class="settings-value" data-settings-value="opacity">94%</span>\n            </div>\n            <input class="settings-slider" type="range" min="0" max="0.98" step="0.02" data-settings="opacity">\n          </div>\n\n          <div class="settings-row">\n            <div>\n              <div class="settings-label" style="margin-bottom: 6px;">原文字色</div>\n              <label class="settings-color-row">\n                <input type="color" data-settings="originalColor" value="#d8e2f2">\n                <span class="settings-color-hex" data-settings-value="originalColor">#d8e2f2</span>\n              </label>\n            </div>\n            <div>\n              <div class="settings-label" style="margin-bottom: 6px;">翻譯字色</div>\n              <label class="settings-color-row">\n                <input type="color" data-settings="translationColor" value="#ffffff">\n                <span class="settings-color-hex" data-settings-value="translationColor">#ffffff</span>\n              </label>\n            </div>\n          </div>\n\n          <div class="settings-actions">\n            <button class="settings-reset-button" type="button" data-action="settings-reset">重設預設值</button>\n          </div>\n        </aside>\n        <div class="body">\n          <div class="subtitle-lines" aria-live="polite"></div>\n          <p class="original">${si("等待語音...", "Waiting for speech…")}</p>\n          <p class="translation">${si("翻譯會顯示在這裡", "Translations will appear here")}</p>\n          <div class="large-lines" aria-live="polite"></div>\n          <div class="subtitle-measure" aria-hidden="true"></div>\n        </div>\n        <span class="resize-handle"></span>\n      </section>\n      <section class="interaction-window" role="dialog" aria-label="直播聊天翻譯">\n        <div class="interaction-header">\n          <div>\n            <div class="interaction-title">直播聊天</div>\n            <div class="interaction-subtitle">留言翻譯，也可以翻譯想回覆的內容</div>\n          </div>\n          <div class="interaction-header-actions">\n            <button class="interaction-mini-button" data-action="reply-toggle-inline" title="展開回覆翻譯">寫回覆</button>\n            <button class="close-button" data-action="interaction-close" title="關閉直播聊天" aria-label="關閉直播聊天">×</button>\n          </div>\n        </div>\n        <div class="interaction-content">\n          <section class="live-chat-window" role="region" aria-label="直播留言翻譯">\n            <div class="live-chat-header">\n              <div class="live-chat-title">留言翻譯</div>\n              <div class="live-chat-header-actions">\n                <button class="live-chat-scroll-bottom" data-action="chat-scroll-bottom" title="回到最新聊天室翻譯" hidden>到底</button>\n                <span class="live-chat-batch-note">2s 批次翻譯</span>\n              </div>\n            </div>\n            <label class="chat-source-language-field" style="display:flex;align-items:center;gap:8px;margin:8px 12px;font-size:12px"><span>留言原文語言</span><select data-chat-source-language aria-label="留言原文語言" style="min-width:0;flex:1;padding:6px;border:1px solid #566175;border-radius:6px;background:#1b2433;color:#f5f7fa"><option value="">選擇留言原文語言</option><option value="en">英語</option><option value="ja">日語</option><option value="ko">韓語</option><option value="th">泰語</option><option value="zh-TW">中文</option></select></label>\n            <div class="live-chat-list" aria-live="polite"></div>\n            <div class="live-chat-status">直播留言翻譯會顯示在這裡</div>\n          </section>\n          <section class="reply-window" role="region" aria-label="直播回覆翻譯">\n            <div class="reply-header">\n              <div>\n                <div class="reply-title">回覆翻譯</div>\n                <div class="reply-target">目標語言：-</div>\n              </div>\n            </div>\n            <textarea class="reply-input" rows="3" placeholder="輸入想回覆的內容"></textarea>\n            <p class="reply-output">翻譯結果會顯示在這裡</p>\n            <div class="reply-actions">\n              <button data-action="reply-translate">翻譯</button>\n              <button data-action="reply-send">翻譯並送出</button>\n              <button data-action="reply-copy">複製</button>\n            </div>\n            <div class="reply-status">輸入文字後翻譯成創作者語言</div>\n          </section>\n        </div>\n        <span class="interaction-resize-handle"></span>\n      </section>\n    `),
      (me = {
        window: ce.querySelector(".subtitle-window"),
        toolbar: ce.querySelector(".toolbar"),
        status: ce.querySelector(".status"),
        quota: ce.querySelector(".quota"),
        usagePanel: ce.querySelector(".usage-panel"),
        usageFields: ce.querySelectorAll("[data-usage-field]"),
        settingsPanel: ce.querySelector(".settings-panel"),
        settingsControls: ce.querySelectorAll("[data-settings]"),
        settingsValues: ce.querySelectorAll("[data-settings-value]"),
        settingsToggleButton: ce.querySelector(
          'button[data-action="settings-toggle"]',
        ),
        interactionPanel: ce.querySelector(".interaction-window"),
        interactionHeader: ce.querySelector(".interaction-header"),
        interactionResize: ce.querySelector(".interaction-resize-handle"),
        replyPanel: ce.querySelector(".reply-window"),
        replyInput: ce.querySelector(".reply-input"),
        replyOutput: ce.querySelector(".reply-output"),
        replyStatus: ce.querySelector(".reply-status"),
        replyTarget: ce.querySelector(".reply-target"),
        replyInlineButton: ce.querySelector(
          'button[data-action="reply-toggle-inline"]',
        ),
        replyTranslateButton: ce.querySelector(
          'button[data-action="reply-translate"]',
        ),
        replyCopyButton: ce.querySelector('button[data-action="reply-copy"]'),
        replySendButton: ce.querySelector('button[data-action="reply-send"]'),
        chatToggleButton: ce.querySelector('button[data-action="chat-toggle"]'),
        chatPanel: ce.querySelector(".live-chat-window"),
        chatList: ce.querySelector(".live-chat-list"),
        chatBottomButton: ce.querySelector(
          'button[data-action="chat-scroll-bottom"]',
        ),
        chatStatus: ce.querySelector(".live-chat-status"),
        chatSourceLanguage: ce.querySelector('[data-chat-source-language]'),
        subtitleLines: ce.querySelector(".subtitle-lines"),
        original: ce.querySelector(".original"),
        translation: ce.querySelector(".translation"),
        largeLines: ce.querySelector(".large-lines"),
        measure: ce.querySelector(".subtitle-measure"),
        modeButton: ce.querySelector('button[data-action="mode"]'),
        transparentButton: ce.querySelector(
          'button[data-action="transparent-toggle"]',
        ),
        collapseButton: ce.querySelector('button[data-action="collapse"]'),
        fontSizeDisplay: ce.querySelector("[data-font-size-display]"),
        fontPreview: ce.querySelector("[data-font-preview]"),
        resize: ce.querySelector(".resize-handle"),
        collapseBody: ce.querySelector(".body"),
      }),
      (ue = me.window),
      me.toolbar.addEventListener("pointerdown", er),
      me.resize.addEventListener("pointerdown", ar),
      me.interactionHeader?.addEventListener("pointerdown", tr),
      me.interactionResize?.addEventListener("pointerdown", nr),
      me.chatList?.addEventListener("scroll", Zi, { passive: !0 }),
      me.chatList?.addEventListener("wheel", (e) => e.stopPropagation(), {
        passive: !0,
      }),
      ce.addEventListener("click", Xs),
      me.chatSourceLanguage?.addEventListener("change", changeChatSourceLanguage),
      (function () {
        if (me.settingsControls) {
          for (const e of me.settingsControls) {
            if (!e.dataset.settings) continue;
            const t = "range" === e.type || "color" === e.type;
            (e.addEventListener(t ? "input" : "change", () => Zs(e)),
              t && e.addEventListener("change", () => Zs(e)));
          }
          me.settingsPanel?.addEventListener("click", (e) =>
            e.stopPropagation(),
          );
        }
      })(),
      me.replyInput?.addEventListener("input", () => {
        ((F.replyText = me.replyInput.value),
          F.replyError && (F.replyError = ""),
          F.replyTranslation &&
            !F.replyBusy &&
            (F.replyStatus = "內容已修改，請重新翻譯"),
          qi());
      })),
      de.isConnected || Au().appendChild(de),
      (F.mounted = !0),
      Qc(F.usage));
  }
  function jt() {
    return Boolean(
      !1 === F.config?.interimTranslationsEnabled ||
        !1 === F.config?.syncInterimTranslationsEnabled,
    );
  }
  function Qt(e = {}, t = {}) {
    if (
      !F.sync.enabled ||
      F.sync.singleTabMediaSync ||
      !0 !== F.sync.sourceTiming?.isLiveStream ||
      Yt(t)
    )
      return e;
    const n = Xl(),
      a = Gl(F.sync.sourceTiming, n),
      i = a ?? vu(F.sync.sourceToViewerTimelineOffsetCandidateSeconds),
      s = (function (e, t = null, n = Date.now()) {
        const a = vu(e),
          i = Wl(F.sync.sourceTiming, n),
          s = Wl(t || Xl(n), n);
        if (null === a || null === i || null === s)
          return {
            valid: !1,
            reason: "clock-mapping-unavailable",
            sourceMediaTime: i,
            viewerMediaTime: s,
            projectedSourceMediaTime: null,
            projectedLeadSeconds: null,
          };
        const r = i + a,
          o = r - s,
          l = Math.max(
            0,
            vu(F.sync.lockedDelaySeconds) ??
              vu(F.sync.targetDelaySeconds) ??
              vu(F.sync.fixedDelaySeconds) ??
              0,
          ),
          d = Math.max(180, l + Ir(F.sync.sourcePreloadMaxLeadSeconds) + 30);
        return {
          valid: o >= -2.5 && o <= d,
          reason:
            o < -2.5
              ? "source-behind-viewer"
              : o > d
                ? "source-too-far-ahead"
                : "",
          sourceMediaTime: i,
          viewerMediaTime: s,
          projectedSourceMediaTime: r,
          projectedLeadSeconds: o,
          maxLeadSeconds: d,
        };
      })(i, n);
    if (!s.valid)
      return (
        (function (e = {}, t = null, n = {}) {
          const a = Date.now();
          a - (vu(F.sync.lastSubtitleProjectionRejectLogAtMs) || 0) < 5e3 ||
            ((F.sync.lastSubtitleProjectionRejectLogAtMs = a),
            Ja(
              "sync.subtitle_projection.rejected_clock_mismatch",
              {
                reason: ku(e.reason || "clock-mapping-unavailable"),
                sourceMediaTime: yn(e.sourceMediaTime),
                viewerMediaTime: yn(e.viewerMediaTime),
                projectedSourceMediaTime: yn(e.projectedSourceMediaTime),
                projectedLeadSeconds: yn(e.projectedLeadSeconds),
                maxLeadSeconds: yn(e.maxLeadSeconds),
                stableOffsetSeconds: yn(
                  F.sync.sourceToViewerTimelineOffsetSeconds,
                ),
                candidateOffsetSeconds: yn(
                  F.sync.sourceToViewerTimelineOffsetCandidateSeconds,
                ),
                selectedOffsetSeconds: yn(t),
                eventMediaTime: yn(
                  n.mediaTime ?? n.displayAfterMediaTime ?? n.sync?.mediaTime,
                ),
              },
              "warn",
            ));
        })(s, i, t),
        {
          ...e,
          timelineProjectionRejected: !0,
          timelineProjectionRejectReason: s.reason,
        }
      );
    const r = { ...e };
    for (const t of [
      "mediaTime",
      "displayAfterMediaTime",
      "audioStartMediaTime",
      "audioEndMediaTime",
      "mediaTimeEnd",
    ]) {
      const n = vu(e[t]);
      null !== n && (r[t] = n + i);
    }
    return (
      (r.sourceTimelineOffsetSeconds = i),
      (r.sourceTimelineOffsetStable = null !== a),
      r
    );
  }
  function Jt(e, t) {
    if (!e || !t) return !1;
    if (Xn(e) !== Xn(t)) return !1;
    const n = Aa(e),
      a = Aa(t);
    if (null !== n && null !== a) return Math.abs(n - a) < 1;
    const i = ku(e.id),
      s = ku(t.id);
    return !(!i || !s || i !== s || /^segment-\d+$/i.test(i));
  }
  function Yt(e = {}) {
    if (!e || "object" != typeof e) return !1;
    if (!0 === e.cacheReplay || !0 === e.cacheHit) return !0;
    const t = ku(e.provider || e.latency?.provider || "");
    if ("sql-subtitle-cache" === t || "cached-subtitle" === t) return !0;
    const n = ku(e.segmentation?.method || e.segmentation?.preference || "");
    return "sql_subtitle_cache" === n || "cached" === n;
  }
  function Xt() {
    return Boolean(F.config?.disableSubtitleCache);
  }
  function Zt(e = Date.now()) {
    const t = F.sync.subtitleSeekGuard;
    return t?.active
      ? e > (vu(t.expiresAtMs) || 0)
        ? (en(), null)
        : Boolean(
              F.sync.pendingViewerSeek ||
                F.sync.delayBuffering ||
                F.sync.cachedSubtitleReplay?.active,
            ) || e - (vu(t.startedAtMs) || 0) <= 18e3
          ? t
          : (en(), null)
      : null;
  }
  function en() {
    const e = vu(F.sync.subtitleSeekGuard?.sequence) || 0;
    F.sync.subtitleSeekGuard = {
      active: !1,
      targetMediaTime: null,
      targetDelaySeconds: null,
      releaseMediaTime: null,
      startedAtMs: 0,
      expiresAtMs: 0,
      reason: "",
      sequence: e,
    };
  }
  function tn(e = {}) {
    const t = vu(e.targetMediaTime);
    if (null === t) return null;
    const n = Date.now(),
      a = vu(F.sync.subtitleSeekGuard?.sequence) || 0,
      i = vu(e.targetDelaySeconds);
    return (
      (F.sync.subtitleSeekGuard = {
        active: !0,
        targetMediaTime: t,
        targetDelaySeconds: i,
        releaseMediaTime: null,
        startedAtMs: n,
        expiresAtMs: n + g,
        reason: ku(e.reason || "viewer-seek"),
        sequence: a + 1,
      }),
      (F.sync.lastSeekTargetSeconds = t),
      F.sync.subtitleSeekGuard
    );
  }
  function nn(e, t = null, n = "source-actual-seek") {
    const a = vu(e);
    if (null === a) return;
    const i = Zt();
    if (!i)
      return void tn({ targetMediaTime: a, targetDelaySeconds: t, reason: n });
    i.targetMediaTime = a;
    const s = vu(t);
    (null !== s && (i.targetDelaySeconds = s),
      (i.reason = ku(n || i.reason || "source-actual-seek")),
      (i.expiresAtMs = Date.now() + g),
      (F.sync.lastSeekTargetSeconds = a));
  }
  function an(e, t = "mse-startup-release") {
    const n = vu(e);
    if (null === n) return !1;
    let a = Zt();
    if (
      (a ||
        (a = tn({
          targetMediaTime: n,
          targetDelaySeconds:
            vu(F.sync.targetDelaySeconds) ?? vu(F.sync.fixedDelaySeconds),
          reason: t,
        })),
      !a)
    )
      return !1;
    const i = vu(a.releaseMediaTime);
    return (
      (a.releaseMediaTime = null === i ? n : Math.min(i, n)),
      (a.reason = ku(t || a.reason || "mse-startup-release")),
      (a.expiresAtMs = Date.now() + g),
      Ja("subtitle.seek_guard.reanchored", {
        targetMediaTime: vu(a.targetMediaTime),
        releaseMediaTime: a.releaseMediaTime,
        targetDelaySeconds: vu(a.targetDelaySeconds),
        guardReason: a.reason || "",
        guardSequence: vu(a.sequence),
        allowed: sn(a),
      }),
      !0
    );
  }
  function sn(e = Zt()) {
    const t = vu(e?.targetMediaTime);
    if (null === t) return null;
    const n = vu(e.releaseMediaTime),
      a = null === n ? t : Math.min(t, n),
      i = td(),
      s = Math.max(t, i ?? t),
      r =
        vu(e.targetDelaySeconds) ??
        vu(F.sync.targetDelaySeconds) ??
        vu(F.sync.fixedDelaySeconds) ??
        0,
      o = Math.max(45, r + 20);
    return { min: Math.max(0, a - 2.5), max: s + o };
  }
  function rn(e, t, n = {}) {
    const a = sn(t);
    if (!a) return !0;
    const i = vu(e?.start),
      s = vu(e?.end) ?? i;
    if (null === i) return !0;
    const r = Math.min(i, s ?? i),
      o = Math.max(i, s ?? i),
      l = vu(t?.releaseMediaTime),
      d = vu(t?.targetMediaTime),
      c = l ?? d;
    return !(
      (null !== c && o <= c + R) ||
      o < a.min ||
      !(!0 === n.allowFuture || r <= a.max)
    );
  }
  function on(e, t = {}) {
    const n = mn([
      Aa(e),
      e?.mediaTime,
      t.displayAfterMediaTime,
      t.mediaTime,
      t.sync?.displayAfterMediaTime,
      t.sync?.mediaTime,
    ]);
    if (null === n) return null;
    const a = mn([
      Ca(e),
      e?.mediaTimeEnd,
      t.sync?.audioEndMediaTime,
      t.sync?.mediaTimeEnd,
      t.mediaTimeEnd,
      n,
    ]);
    return { start: Math.min(n, a ?? n), end: Math.max(n, a ?? n) };
  }
  function ln(e = {}) {
    const t = mn([
        vu(e.audioStartMediaTime),
        vu(e.displayAfterMediaTime),
        vu(e.mediaTime),
      ]),
      n = mn([vu(e.audioEndMediaTime), vu(e.mediaTimeEnd)]);
    return null === t || null === n || n <= t
      ? null
      : { start: Math.min(t, n), end: Math.max(t, n) };
  }
  function dn(e = {}, t = []) {
    const n = (Array.isArray(t) ? t : []).map((e) => ln(e)).filter(Boolean);
    if (n.length)
      return {
        start: Math.min(...n.map((e) => e.start)),
        end: Math.max(...n.map((e) => e.end)),
      };
    const a = (Array.isArray(t) ? t : [])
      .map((t) => on(t, e))
      .filter((e) => e && e.end > e.start);
    if (a.length)
      return {
        start: Math.min(...a.map((e) => e.start)),
        end: Math.max(...a.map((e) => e.end)),
      };
    const i = mn([
      e.sync?.audioStartMediaTime,
      e.sync?.sourceMediaStartTime,
      e.sync?.displayAfterMediaTimeStart,
      e.displayAfterMediaTime,
      e.mediaTime,
      e.sync?.displayAfterMediaTime,
      e.sync?.mediaTime,
    ]);
    if (null === i) return null;
    const s = mn([
      e.sync?.audioEndMediaTime,
      e.sync?.sourceMediaEndTime,
      e.sync?.displayAfterMediaTimeEnd,
      e.sync?.mediaTimeEnd,
      e.mediaTimeEnd,
      i,
    ]);
    return { start: Math.min(i, s ?? i), end: Math.max(i, s ?? i) };
  }
  function cn(e = null) {
    const t = vu(e?.start),
      n = vu(e?.end);
    return null === t || null === n
      ? null
      : { start: Math.min(t, n), end: Math.max(t, n) };
  }
  function un(e = null, t = null) {
    const n = vu(t);
    return null !== n && e
      ? e.start <= n && e.end >= n
        ? 0
        : e.start > n
          ? e.start - n
          : n - e.end
      : 0;
  }
  function mn(e = []) {
    for (const t of e) {
      const e = vu(t);
      if (null !== e) return e;
    }
    return null;
  }
  function yn(e) {
    const t = vu(e);
    return null === t ? null : Math.round(1e3 * t) / 1e3;
  }
  function pn(e, t, n = {}, a = {}, i = null) {
    const s = sn(a);
    Ja(
      "subtitle.seek_guard.drop",
      {
        kind: e,
        droppedSegments: t,
        targetMediaTime: vu(a.targetMediaTime),
        targetDelaySeconds: vu(a.targetDelaySeconds),
        releaseMediaTime: vu(a.releaseMediaTime),
        guardReason: a.reason || "",
        guardSequence: vu(a.sequence),
        eventMediaTime: vu(
          n.mediaTime ?? n.displayAfterMediaTime ?? n.sync?.mediaTime,
        ),
        range: i,
        allowed: s,
      },
      "warn",
    );
  }
  function gn(e, t = Date.now(), n = {}) {
    if (null !== vu(e?.queueSequence)) return e;
    const a = td(),
      i = Aa(e),
      s = null === i ? null : ra(e);
    return (
      (F.subtitleQueueSequence += 1),
      {
        ...e,
        queueSequence: F.subtitleQueueSequence,
        queuedAtMs: t,
        queuedViewerMediaTime: a,
        queuedTargetMediaTime: i,
        queuedSecondsUntilDisplay: null !== a && null !== s ? s - a : null,
        queueBacklogAtEnqueue: Math.max(
          0,
          Math.round(vu(n.queueBacklogAtEnqueue) || 0),
        ),
        incomingBatchIndex: Math.max(
          0,
          Math.round(vu(n.incomingBatchIndex) || 0),
        ),
        incomingBatchSize: Math.max(
          1,
          Math.round(vu(n.incomingBatchSize) || 1),
        ),
      }
    );
  }
  function fn(e, t) {
    const n = [];
    for (const a of [...(e || []), ...(t || [])])
      a?.original &&
        a?.translation &&
        (hn(n, a)
          ? (F.subtitleDisplayStats.duplicateSegments += 1)
          : n.push(a));
    return Da(n);
  }
  function Sn(e = [], t = [], n = "queue") {
    const a = (t || []).filter((e) => {
      const t = ku(e?.original),
        n = ku(e?.translation);
      return Boolean(!0 !== e?.fallbackDisplayed && t && n && t !== n && on(e));
    });
    if (!a.length) return e;
    const i = [],
      s = (e || []).filter((e) => {
        if (!0 !== e?.fallbackDisplayed) return !0;
        const t = on(e),
          n = vu(t?.start),
          s = vu(t?.end);
        if (null === n || null === s || s <= n) return !0;
        const r = Va(e.mediaContextKey || ""),
          o = a.filter((e) => {
            const t = Va(e.mediaContextKey || "");
            if (r && t && r !== t) return !1;
            const a = on(e);
            return Boolean(a && a.end > n && a.start < s);
          });
        if (!o.length) return !0;
        const l = s - n,
          d = Ia({ start: n, end: s }, o),
          c = Math.max(0, l - d),
          u = l > 0 ? d / l : 0,
          m = (function (e, t = []) {
            const n = vu(e?.start),
              a = vu(e?.end);
            if (null === n || null === a || a <= n) return [];
            const i = (t || [])
              .map((e) => {
                const t = Aa(e),
                  i = Ca(e);
                return null === t || null === i
                  ? null
                  : { start: Math.max(n, t), end: Math.min(a, i) };
              })
              .filter((e) => e && e.end > e.start)
              .sort((e, t) => e.start - t.start);
            if (!i.length) return [{ start: n, end: a }];
            const s = [];
            let r = n;
            for (const e of i)
              if (
                (e.start > r && s.push({ start: r, end: e.start }),
                (r = Math.max(r, e.end)),
                r >= a)
              )
                break;
            return (r < a && s.push({ start: r, end: a }), s);
          })({ start: n, end: s }, o),
          y = td(),
          p = Boolean(
            d > 0 &&
              null !== y &&
              m.length > 0 &&
              m.every((e) => e.end <= y + N),
          );
        return (
          !((u >= 0.92 && c <= 0.35) || p) ||
          (i.push({
            segment: e,
            coverageRatio: u,
            coveredSeconds: d,
            uncoveredSeconds: c,
            onlyUncoveredPrefixAlreadyPassed: p,
            viewerMediaTime: y,
          }),
          !1)
        );
      });
    if (i.length) {
      const e = i[0];
      Ja(
        "subtitle.queue.supersede_pending_fallback",
        {
          phase: n,
          droppedSegments: i.length,
          incomingSegments: a.length,
          mediaTime: Aa(e.segment),
          mediaTimeEnd: Ca(e.segment),
          coverageRatio: yn(e.coverageRatio),
          coveredSeconds: yn(e.coveredSeconds),
          uncoveredSeconds: yn(e.uncoveredSeconds),
          onlyUncoveredPrefixAlreadyPassed: Boolean(
            e.onlyUncoveredPrefixAlreadyPassed,
          ),
          viewerMediaTime: yn(e.viewerMediaTime),
          original: ku(e.segment?.original).slice(0, 160),
        },
        "info",
      );
    }
    return s;
  }
  function hn(e, t) {
    return e.some((e) => Jt(e, t));
  }
  function bn(e) {
    const t = Xn(e);
    if (!t) return !1;
    const n = Aa(e);
    return (
      null !== n &&
      F.displayedSegmentHistory.some(
        (e) =>
          e.key === t && null !== e.mediaTime && Math.abs(e.mediaTime - n) <= 1,
      )
    );
  }
  function vn(e, t = {}) {
    const n = on(e, t),
      a = vu(n?.start),
      i = vu(n?.end);
    if (null === a || null === i || i <= a) return { reason: "" };
    const s = i - a,
      r = Mn({ start: a, end: i }),
      o = Math.max(0, s - r),
      l = s > 0 ? r / s : 0,
      d = td(),
      c = Tn(),
      u = vu(c?.start);
    if (null !== u && a < u - 0.25 && i <= u + 0.25) {
      if (l >= 0.92 && o <= 0.35)
        return {
          reason: "behind-newer-displayed-range",
          coverageRatio: l,
          coveredSeconds: r,
          uncoveredSeconds: o,
          viewerMediaTime: d,
        };
      const e = Math.max(1, ha());
      return null !== d && d > i + e
        ? {
            reason: "behind-newer-unrecoverable",
            coverageRatio: l,
            coveredSeconds: r,
            uncoveredSeconds: o,
            viewerMediaTime: d,
          }
        : {
            reason: "",
            coverageRatio: l,
            coveredSeconds: r,
            uncoveredSeconds: o,
            viewerMediaTime: d,
          };
    }
    return l >= 0.92 && o <= 0.35
      ? (function (e = {}, t = {}, n = {}) {
          if (
            !Boolean(e.lateAfterOriginalFallback || t.lateAfterOriginalFallback)
          )
            return !1;
          const a = ku(e.original),
            i = ku(e.translation);
          if (!a || !i || a === i) return !1;
          const s = vu(n.start),
            r = vu(n.end);
          return (
            !(null === s || null === r || r <= s) &&
            wn().some(
              (e) =>
                !(
                  Math.max(0, Math.min(r, e.end) - Math.max(s, e.start)) <= L
                ) &&
                (!!e.fallbackDisplayed ||
                  Boolean(
                    e.original && e.translation && e.original === e.translation,
                  )),
            )
          );
        })(e, t, { start: a, end: i })
        ? {
            reason: "",
            coverageRatio: l,
            coveredSeconds: r,
            uncoveredSeconds: o,
            viewerMediaTime: d,
            replacement: !0,
          }
        : {
            reason: "already-covered-by-visible-range",
            coverageRatio: l,
            coveredSeconds: r,
            uncoveredSeconds: o,
            viewerMediaTime: d,
          }
      : {
          reason: "",
          coverageRatio: l,
          coveredSeconds: r,
          uncoveredSeconds: o,
          viewerMediaTime: d,
        };
  }
  function Mn(e) {
    const t = vu(e?.start),
      n = vu(e?.end);
    if (null === t || null === n || n <= t) return 0;
    const a = wn()
      .map((e) => ({ start: Math.max(t, e.start), end: Math.min(n, e.end) }))
      .filter((e) => e.end > e.start)
      .sort((e, t) => e.start - t.start);
    let i = 0,
      s = null;
    for (const e of a)
      null === s || e.start > s
        ? ((i += e.end - e.start), (s = e.end))
        : e.end > s && ((i += e.end - s), (s = e.end));
    return i;
  }
  function wn() {
    return (F.displayedSegmentHistory || [])
      .map((e) => {
        const t = vu(e?.mediaTime),
          n = vu(e?.mediaTimeEnd) ?? t;
        return null === t || null === n
          ? null
          : {
              start: Math.min(t, n),
              end: Math.max(t, n),
              displayedAtMs: vu(e?.displayedAtMs) || 0,
              original: ku(e?.original || ""),
              translation: ku(e?.translation || ""),
              fallbackDisplayed: Boolean(e?.fallbackDisplayed),
            };
      })
      .filter(Boolean);
  }
  function Tn() {
    const e = wn();
    return e.length
      ? e.reduce(
          (e, t) =>
            e
              ? t.displayedAtMs !== e.displayedAtMs
                ? t.displayedAtMs > e.displayedAtMs
                  ? t
                  : e
                : t.start >= e.start
                  ? t
                  : e
              : t,
          null,
        )
      : null;
  }
  function kn() {
    (xn(),
      (function () {
        if (
          "sql-wallet-v1" !== F.config?.walletBillingProtocol ||
          !F.sync.singleTabMediaSync ||
          !ya() ||
          F.sync.singleTabMseStartupGate?.active ||
          F.sync.mseStartupWaitActive
        )
          return 0;
        const e = td();
        if (null === e) return 0;
        const t = [];
        ((F.segmentQueue = F.segmentQueue.filter((n) => {
          const a = Ca(n),
            i =
              null === a
                ? null
                : ra({ displayAfterMediaTime: a }, { includeEarlyGuard: !1 });
          return null === i || i > e || (t.push(n), !1);
        })),
          t.length &&
            ((F.subtitleDisplayStats.droppedSegments += t.length),
            Ja(
              "subtitle.queue.drop_expired_mse",
              {
                droppedSegments: t.length,
                viewerMediaTime: e,
                mediaTime: Aa(t[0]),
                mediaTimeEnd: Ca(t.at(-1)),
              },
              "warn",
            )),
          t.length);
      })());
    const e = F.activeSegment,
      t = aa(e);
    if (t > 0)
      return (
        (F.activeSegment = e),
        (ye = window.setTimeout(() => {
          ((ye = null), kn());
        }, t)),
        void ei()
      );
    !(function () {
      if (!fa()) return;
      const e = F.segmentQueue.length,
        t = [];
      ((F.segmentQueue = F.segmentQueue.filter(
        (e) => !la(e) || (t.push(e), !1),
      )),
        t.length &&
          ((F.subtitleDisplayStats.droppedSegments += t.length),
          xa("queue-prune", t[0], t.length, e)),
        F.segmentQueue.length > 8 && (F.status = "追上音軌中"));
    })();
    const n = F.segmentQueue[0];
    if (!n) {
      const t = (function (e) {
        if (!fa() || !e) return 0;
        const t = td(),
          n = Ca(e);
        if (null === t || null === n) return 0;
        const a =
          ra({ displayAfterMediaTime: n }, { includeEarlyGuard: !1 }) - t;
        return a <= 0 ? 0 : Cu(1e3 * a, 60, k);
      })(e);
      if (t > 0)
        return (
          (F.activeSegment = e),
          (ye = window.setTimeout(() => {
            ((ye = null), kn());
          }, t)),
          void ei()
        );
      const n = (function (e) {
        if (
          !(function (e) {
            if (!e || !fa()) return !1;
            if (!ya()) return !1;
            if (
              F.sync.pendingViewerSeek ||
              F.sync.delayBuffering ||
              F.sync.userPaused
            )
              return !1;
            if (F.segmentQueue.length > 0) return !1;
            const t = Ca(e) ?? Tn()?.end,
              n = td();
            return (
              null !== t && null !== n && !(!Hn(t) && !On()) && n >= t - 0.35
            );
          })(e)
        )
          return (ga("not-needed", { resume: !1 }), 0);
        const t = Ca(e) ?? Tn()?.end;
        if (null === t) return 0;
        const n = Hn(t),
          a = `${yn(t)}:${Xn(e).slice(0, 80)}`,
          i = Date.now(),
          s =
            F.sync.mseSubtitleCoverageHold ||
            (F.sync.mseSubtitleCoverageHold = {});
        (s.key !== a &&
          ((s.active = !0),
          (s.key = a),
          (s.startedAtMs = i),
          (s.lastLogAtMs = 0),
          (s.previousEndMediaTime = t),
          (s.pausedViewer = !1),
          pa(t, "coverage-frontier")),
          (s.pendingRange = n
            ? { start: n.start, end: n.end, stage: n.stage || "" }
            : null));
        const r = Math.max(0, i - (vu(s.startedAtMs) || i)),
          o = Boolean(n) || On(),
          l = s.pausedViewer && n ? B : 6500;
        return r >= l || !o
          ? (ga(r >= l ? "timeout" : "pipeline-idle", { resume: !0 }), 0)
          : ((!s.lastLogAtMs || i - s.lastLogAtMs > 1500) &&
              ((s.lastLogAtMs = i),
              Ja(
                "mse.subtitle_coverage_hold",
                {
                  heldMs: r,
                  maxHoldMs: l,
                  previousEndMediaTime: yn(t),
                  viewerMediaTime: yn(td()),
                  queueLength: F.segmentQueue.length,
                  pausedViewer: Boolean(s.pausedViewer),
                  pendingRange: n
                    ? {
                        start: yn(n.start),
                        end: yn(n.end),
                        stage: n.stage || "",
                      }
                    : null,
                  pendingTextAgeMs: In(),
                  speechActivityAgeMs: Un(),
                  original: ku(e?.original).slice(0, 160),
                },
                "warn",
              )),
            250);
      })(e);
      return n > 0
        ? ((F.activeSegment = e),
          Rn(),
          (ye = window.setTimeout(() => {
            ((ye = null), kn());
          }, n)),
          void ei())
        : ((F.activeSegment = null),
          (function (e) {
            if (!fa() || !e) return !1;
            const t = td(),
              n = Ca(e);
            if (null !== t && null !== n)
              return (
                t >= ra({ displayAfterMediaTime: n }, { includeEarlyGuard: !1 })
              );
            const a = oa(e);
            return null !== a && a > C;
          })(e)
            ? ((F.subtitleFading = !1),
              (F.subtitleDisplayBlank = !1),
              Cn({ fromNow: !0 }),
              void ei())
            : (Cn({ fromNow: !0 }), void ei()));
    }
    const a = (function (e) {
      if (
        !(function (e) {
          if (!fa()) return !1;
          if (
            !F.config?.mseAudioBufferEnabled &&
            "mse-audio-buffer" !== F.config?.audioInputMode
          )
            return !1;
          if (F.sync.cachedSubtitleReplay?.active) return !1;
          if (F.sync.pendingViewerSeek || F.sync.delayBuffering) return !1;
          if (ca(3)) return !1;
          const t = Aa(e),
            n = td();
          if (null === t || null === n) return !1;
          const a = ua(e);
          return (
            !!(a && n >= a.previousEnd - 0.35 && n <= a.nextStart && Gn(a)) ||
            Math.abs(n - t) <= Math.max(1, ha())
          );
        })(e)
      )
        return (
          (function (e) {
            return da(e).preserve;
          })(e) ||
            ma(
              (function (e, t = "not-needed") {
                if (F.sync.pendingViewerSeek || F.sync.delayBuffering)
                  return "gap-skipped-by-seek";
                if (ca(3)) return "gap-obsolete-playhead";
                const n = ua(e);
                if (!n || n.gapSeconds <= 3) return "gap-filled";
                const a = td();
                return null !== a && a > n.nextStart + Math.max(1, ha())
                  ? "gap-expired"
                  : On()
                    ? t
                    : "pipeline-idle";
              })(e, "not-needed"),
            ),
          0
        );
      const t = ua(e);
      if (!t || t.gapSeconds <= 3) return (ma("gap-filled"), 0);
      const n = Gn(t),
        a = ya() ? Boolean(n) : Boolean(n) || On();
      if (!a) return (ma("pipeline-idle"), 0);
      const i = `${yn(t.previousEnd)}:${yn(t.nextStart)}:${Xn(e).slice(0, 80)}`,
        s = Date.now(),
        r = F.sync.timelineGapHold || (F.sync.timelineGapHold = {});
      (r.key !== i &&
        ((r.active = !0),
        (r.key = i),
        (r.startedAtMs = s),
        (r.lastLogAtMs = 0),
        (r.pausedViewer = !1),
        (r.softHold = !0),
        (r.previousEndMediaTime = t.previousEnd),
        (r.nextStartMediaTime = t.nextStart),
        (r.pendingRange = null),
        ya() && pa(t.previousEnd, "timeline-gap")),
        (r.nextStartMediaTime = t.nextStart),
        (r.pendingRange = n
          ? { start: n.start, end: n.end, stage: n.stage || "" }
          : null));
      const o = Math.max(0, s - (vu(r.startedAtMs) || s)),
        l = n ? Math.max(6500, 3e4) : ya() ? 1e4 : 6500;
      if (o >= l) {
        const i = Mn({ start: t.previousEnd, end: t.nextStart }),
          d = Math.max(0, t.gapSeconds - i);
        return Boolean(r.pausedViewer && d > L && a && o < B)
          ? ((!r.lastLogAtMs || s - r.lastLogAtMs > 1500) &&
              ((r.lastLogAtMs = s),
              Ja(
                "subtitle.queue.timeline_gap_hold.extended",
                {
                  reason: "paused-gap-still-missing",
                  gapSeconds: yn(t.gapSeconds),
                  stillMissingSeconds: yn(d),
                  previousEndMediaTime: yn(t.previousEnd),
                  nextStartMediaTime: yn(t.nextStart),
                  pendingRange: n
                    ? {
                        start: yn(n.start),
                        end: yn(n.end),
                        stage: n.stage || "",
                      }
                    : null,
                  pausedViewer: Boolean(r.pausedViewer),
                  heldMs: o,
                  maxHoldMs: l,
                  hardHoldMaxMs: B,
                  queueLength: F.segmentQueue.length,
                  original: ku(e?.original).slice(0, 160),
                },
                "warn",
              )),
            250)
          : (ma("gap-expired"), 0);
      }
      return (
        (!r.lastLogAtMs || s - r.lastLogAtMs > 1500) &&
          ((r.lastLogAtMs = s),
          Ja(
            "subtitle.queue.timeline_gap_hold",
            {
              gapSeconds: yn(t.gapSeconds),
              previousEndMediaTime: yn(t.previousEnd),
              nextStartMediaTime: yn(t.nextStart),
              pendingRange: n
                ? { start: yn(n.start), end: yn(n.end), stage: n.stage || "" }
                : null,
              pausedViewer: Boolean(r.pausedViewer),
              heldMs: o,
              maxHoldMs: l,
              queueLength: F.segmentQueue.length,
              original: ku(e?.original).slice(0, 160),
            },
            "warn",
          )),
        250
      );
    })(n);
    if (a > 0)
      return (
        Rn(),
        (ye = window.setTimeout(() => {
          ((ye = null), kn());
        }, a)),
        void ei()
      );
    const i = (function (e) {
      if (!F.sync.enabled) return 0;
      const t = Aa(e),
        n = td(),
        a = null !== t && null !== n ? ra(e) - n : null,
        i =
          null !== a
            ? (function (e, t, n) {
                const a = vu(n),
                  i = Boolean(
                    F.sync.mseStartupWaitActive &&
                      !F.sync.mseStartupWaitReleased &&
                      !String(F.sync.mseStartupWaitReason || "").includes(
                        "seek",
                      ),
                  );
                if (
                  !F.sync.singleTabMediaSync ||
                  !ya() ||
                  F.sync.singleTabMseStartupGate?.active ||
                  F.sync.singleTabMseFirstCueShown ||
                  F.sync.singleTabMseInitialCueShortcutDisabled ||
                  F.sync.subtitleBufferPrimed ||
                  null === a ||
                  a <= 0 ||
                  !$l({}, [e]) ||
                  !0 !== e?.mseFinal ||
                  !0 === e?.fallbackDisplayed ||
                  !0 === e?.timelineRecovery ||
                  !0 === e?.cacheReplay ||
                  F.sync.cachedSubtitleReplay?.active ||
                  F.sync.pendingViewerSeek ||
                  (F.sync.delayBuffering && !i) ||
                  String(F.sync.mseStartupWaitReason || "").includes("seek") ||
                  Zt() ||
                  F.activeSegment ||
                  ku(F.currentTranslation) ||
                  F.subtitleDisplayStats.displayedSegments > 0 ||
                  F.displayedSegmentHistory.length > 0 ||
                  F.largeSegmentHistory.length > 0
                )
                  return { immediate: !1, futureLeadSeconds: a };
                const s = Va(
                    e?.mediaContextKey || e?.pageUrl || e?.sourceUrl || "",
                  ),
                  r = Wa();
                if (s && r && s !== r)
                  return { immediate: !1, futureLeadSeconds: a };
                const o = (function (e, t) {
                  const n = vu(t),
                    a = Aa(e),
                    i = Ca(e) ?? a,
                    s = e?.mseStartupReadiness,
                    r = [
                      s?.startupReleaseReadyDecision?.range,
                      ...(Array.isArray(s?.startupReleaseReadyRanges)
                        ? s.startupReleaseReadyRanges
                        : []),
                      s?.readySubtitleLeadDecision?.range,
                      ...(Array.isArray(s?.readySubtitleRanges)
                        ? s.readySubtitleRanges
                        : []),
                    ]
                      .map((e) => cn(e))
                      .filter(Boolean),
                    o = [
                      ...(Array.isArray(s?.audioCoverageRanges)
                        ? s.audioCoverageRanges
                        : []),
                      ...(Array.isArray(e?.mseProcessedAudioRanges)
                        ? e.mseProcessedAudioRanges
                        : []),
                    ]
                      .map((e) => cn(e))
                      .filter(Boolean);
                  if (null === n || null === a || !e?.mseFinal)
                    return {
                      ready: !1,
                      reason: "missing-final-timeline",
                      viewer: n,
                      cueStart: a,
                      cueEnd: i,
                    };
                  if (!r.length && !o.length)
                    return {
                      ready: !1,
                      reason: "coverage-proof-missing",
                      viewer: n,
                      cueStart: a,
                      cueEnd: i,
                    };
                  const l = Math.min(n, a),
                    d = Math.max(n, a),
                    c =
                      (Array.isArray(s?.knownHoles) ? s.knownHoles : [])
                        .map((e) => cn(e))
                        .filter(Boolean)
                        .find((e) => e.end > l + L && e.start < d - L) || null;
                  if (c)
                    return {
                      ready: !1,
                      reason: "known-coverage-hole",
                      viewer: n,
                      cueStart: a,
                      cueEnd: i,
                      overlappingHole: c,
                    };
                  const u =
                    a > n + L ? Gn({ previousEnd: n, nextStart: a }) : null;
                  if (u)
                    return {
                      ready: !1,
                      reason: "leading-range-still-processing",
                      viewer: n,
                      cueStart: a,
                      cueEnd: i,
                      pendingRange: u,
                    };
                  const m = [...r, ...o];
                  return a <= n + N || wl(m, n, a, 0.35)
                    ? {
                        ready: !0,
                        reason: r.length
                          ? "readiness-ledger-contiguous"
                          : "processed-audio-contiguous",
                        viewer: n,
                        cueStart: a,
                        cueEnd: i,
                        readyRanges: r,
                        processedAudioRanges: o,
                      }
                    : {
                        ready: !1,
                        reason: "future-island",
                        viewer: n,
                        cueStart: a,
                        cueEnd: i,
                        readyRanges: r,
                        processedAudioRanges: o,
                      };
                })(e, t);
                return o.ready
                  ? {
                      immediate: !0,
                      futureLeadSeconds: a,
                      viewerMediaTime: vu(t),
                      targetMediaTime: Aa(e),
                      targetDisplayMediaTime: ra(e),
                      coverage: o,
                    }
                  : { immediate: !1, futureLeadSeconds: a, coverage: o };
              })(e, n, a)
            : { immediate: !1 };
      if (i.immediate)
        return (
          !0 !== e.singleTabMseInitialCueImmediate &&
            ((e.singleTabMseInitialCueImmediate = !0),
            Ja(
              "subtitle.single_tab_mse.first_cue_immediate",
              {
                viewerMediaTime: yn(i.viewerMediaTime),
                cueMediaTime: yn(i.targetMediaTime),
                cueDisplayMediaTime: yn(i.targetDisplayMediaTime),
                bypassedWaitMs: Math.round(1e3 * i.futureLeadSeconds),
                coverageProof: ku(i.coverage?.reason || ""),
                readyRangeCount: i.coverage?.readyRanges?.length || 0,
                processedAudioRangeCount:
                  i.coverage?.processedAudioRanges?.length || 0,
                queueLength: F.segmentQueue.length,
                bufferPrimed: !1,
                preciseMediaTimeScheduling: !1,
              },
              "info",
            )),
          0
        );
      if (
        (function (e = Date.now()) {
          if (!ud(e)) return !1;
          const t = vu(F.sync.startupResumePlaybackStartedAtMs) || 0;
          return !t || e - t < 750;
        })() &&
        (null === a || a > 0)
      )
        return 60;
      if (!F.sync.ready) return 60;
      if (null === t || null === n) return 0;
      const s = vu(F.sync.mseReleaseActivateTargetMediaTime),
        r = Ca(e);
      return null !== s && t <= s + 1 && (null === r || r >= s - N)
        ? ((F.sync.mseReleaseActivateTargetMediaTime = null), 0)
        : a <= 0
          ? 0
          : Cu(1e3 * a, 60, 700);
    })(n);
    if (i > 0)
      return (
        Rn(),
        (ye = window.setTimeout(() => {
          ((ye = null), kn());
        }, i)),
        void ei()
      );
    if (la(n)) {
      const e = F.segmentQueue.shift();
      return (
        (F.subtitleDisplayStats.droppedSegments += 1),
        xa("activate", e),
        void kn()
      );
    }
    if (
      (function (e, t = "display") {
        const n = Zt();
        if (!n) return !1;
        const a = on(e);
        return !(
          !a ||
          rn(a, n, { allowFuture: $l({}, [e]) }) ||
          ((F.subtitleDisplayStats.droppedSegments += 1),
          pn(
            t,
            1,
            {
              mediaTime: a.start,
              mediaTimeEnd: a.end,
              displayAfterMediaTime: Aa(e),
              sync: { mediaTime: a.start, mediaTimeEnd: a.end },
            },
            n,
            a,
          ),
          0)
        );
      })(n, "display")
    )
      return (F.segmentQueue.shift(), void kn());
    if (
      Sa() &&
      Array.isArray(F.displayedSegmentHistory) &&
      F.displayedSegmentHistory.length
    ) {
      const e = vn(n);
      if (e.reason)
        return (
          F.segmentQueue.shift(),
          (F.subtitleDisplayStats.droppedSegments += 1),
          Ja(
            "subtitle.queue.drop_visible_timeline_overlap",
            {
              reason: e.reason,
              phase: "display",
              droppedSegments: 1,
              mediaTime: Aa(n),
              mediaTimeEnd: Ca(n),
              latestDisplayed: Tn(),
              coverageRatio: yn(e.coverageRatio),
              coveredSeconds: yn(e.coveredSeconds),
              uncoveredSeconds: yn(e.uncoveredSeconds),
              viewerMediaTime: yn(e.viewerMediaTime),
              original: ku(n?.original).slice(0, 160),
            },
            "warn",
          ),
          void kn()
        );
    }
    (!0 !== n.singleTabMseInitialCueImmediate &&
      (function (e) {
        if (!F.sync.mseStartupWaitActive || F.sync.mseStartupWaitReleased)
          return !1;
        if (!_l()) return !1;
        const t = {
          reason: "display-segment-covered",
          sync: {
            sourceType: "mse-audio-buffer",
            audioInputMode: "mse-audio-buffer",
          },
        };
        if (!$l(t, [e])) return !1;
        const n = on(e, t),
          a = Dl(),
          i = vu(n?.start),
          s = vu(n?.end);
        if (null === a || null === i || null === s) return !1;
        const r = { ...t, sync: { ...t.sync, mediaTime: i, mediaTimeEnd: s } },
          o = Al(r, [e]);
        o.coverageReady &&
          Il("display-segment-covered", r, [e], {
            forced: !1,
            readyLeadSeconds: o.readyLeadSeconds,
            requiredLeadSeconds: o.requiredLeadSeconds,
            maxCoverageGapSeconds: o.maxCoverageGapSeconds,
            rawLeadSeconds: o.rawLeadSeconds,
            rawLeadReleaseReady: o.rawLeadReleaseReady,
            vodRawAudioLeadReady: o.vodRawAudioLeadReady,
            coverageGapSeconds: o.coverageGapSeconds,
            staleGapSeconds: o.staleGapSeconds,
            releaseProbeMediaTime: o.releaseProbeMediaTime,
            coverageStartMediaTime: o.coverageStartMediaTime,
            coverageEndMediaTime: o.coverageEndMediaTime,
            leadingGapAwaitingPipeline: o.leadingGapAwaitingPipeline,
            leadingGapPendingPipelineRange: o.leadingGapPendingPipelineRange,
          });
      })(n),
      F.segmentQueue.shift());
    const s = (function (e) {
      F.subtitleSequence += 1;
      const t = ec(),
        n = Aa(e),
        a = Ta(),
        i = ka(),
        s =
          "visible-video-current-time" === t.source && null !== n
            ? t.mediaTime - (n + i)
            : null;
      return {
        ...e,
        displaySequence: F.subtitleSequence,
        displayedAtMs: Date.now(),
        syncDisplayErrorSeconds: s ?? oa(e),
        subtitleEffectiveOffsetSeconds: i,
        subtitlePresentationLeadSeconds: Math.max(0, -a),
        viewerMediaTime: t.mediaTime,
        viewerPlaybackRate: t.playbackRate,
        viewerPaused: t.paused,
        viewerVideoVisible: t.visible,
        viewerVideoCandidateCount: t.candidateCount,
        viewerClockSource: t.source,
      };
    })(n);
    ((F.activeSegment = s),
      (F.currentOriginal = s.original),
      (F.currentTranslation = s.translation),
      (F.translationSource = s.original),
      (F.translationUpdatedAt = Date.now()),
      (F.pendingOriginal = ""),
      (F.pendingOriginalUpdatedAt = 0),
      (F.draftOriginal = ""),
      An(),
      (function (e) {
        if (!e?.original || !e?.translation) return;
        if (F.largeSegmentHistory.some((t) => Jt(t, e))) return;
        F.largeSegmentHistory.push(e);
        const t = Math.max(18, 8, u);
        F.largeSegmentHistory.length > t &&
          (F.largeSegmentHistory = F.largeSegmentHistory.slice(-t));
      })(s),
      (function (e) {
        const t = ku(e);
        t &&
          (F.displayedOriginalText.endsWith(t) ||
            (F.displayedOriginalText = (function (e) {
              const t = Array.from(e);
              return t.length <= 1800 ? e : t.slice(-1800).join("").trim();
            })(ku(`${F.displayedOriginalText} ${t}`))));
      })(s.original),
      (function (e) {
        const t = Xn(e);
        t &&
          (F.displayedSegmentHistory.push({
            key: t,
            mediaTime: Aa(e),
            mediaTimeEnd: Ca(e),
            displayedAtMs: Date.now(),
            original: ku(e.original),
            translation: ku(e.translation),
            fallbackDisplayed: Boolean(e.fallbackDisplayed),
          }),
          F.displayedSegmentHistory.length > 96 &&
            (F.displayedSegmentHistory = F.displayedSegmentHistory.slice(-96)));
      })(s),
      (function (e) {
        const t = F.sync.timelineGapHold;
        if (!t?.active && !t?.key) return;
        const n = da(e);
        if (
          void 0 !== n.holdStart &&
          void 0 !== n.holdEnd &&
          void 0 !== n.rangeStart &&
          void 0 !== n.rangeEnd
        )
          return n.preserve
            ? ((t.previousEndMediaTime = Math.max(n.holdStart, n.rangeEnd)),
              (t.lastLogAtMs = 0),
              void Ja(
                "subtitle.queue.timeline_gap_hold.partial_fill",
                {
                  reason: "subtitle-ready-partial-gap-fill",
                  previousEndMediaTime: yn(n.holdStart),
                  nextStartMediaTime: yn(n.holdEnd),
                  displayedStartMediaTime: yn(n.rangeStart),
                  displayedEndMediaTime: yn(n.rangeEnd),
                  stillMissingSeconds: yn(n.stillMissingSeconds),
                  pausedViewer: Boolean(t.pausedViewer),
                  queueLength: F.segmentQueue.length,
                  pendingRange: t.pendingRange
                    ? {
                        start: yn(t.pendingRange.start),
                        end: yn(t.pendingRange.end),
                        stage: t.pendingRange.stage || "",
                      }
                    : null,
                  original: ku(e?.original).slice(0, 160),
                },
                "warn",
              ))
            : void ma("subtitle-ready");
        ma("subtitle-ready");
      })(s),
      (F.subtitleDisplayStats.displayedSegments += 1),
      (function (e) {
        if (
          F.sync.singleTabMseFirstCueShown ||
          !F.sync.singleTabMediaSync ||
          !ya() ||
          !0 !== e?.mseFinal ||
          !$l({}, [e])
        )
          return !1;
        F.sync.singleTabMseFirstCueShown = !0;
      })(s),
      (function (e, t = null) {
        const n = vu(e);
        if (null === n) return;
        if (!0 === t?.singleTabMseInitialCueImmediate) return;
        if (
          ((F.sync.lastDisplayErrorSeconds = n),
          !0 === t?.cacheReplay ||
            (t &&
              (function (e) {
                const t = Pa(),
                  n = on(e);
                return (
                  !(!t || !n) &&
                  t.segments.some((e) => {
                    const t = on(e);
                    return Boolean(
                      t &&
                        Math.min(n.end, t.end) - Math.max(n.start, t.start) > L,
                    );
                  })
                );
              })(t)))
        )
          return;
        const a = vu(t?.queuedSecondsUntilDisplay),
          i = vu(t?.queueBacklogAtEnqueue),
          s = vu(t?.incomingBatchIndex),
          r = Boolean(
            t &&
              null !== a &&
              a >= 0.75 &&
              0 === i &&
              0 === s &&
              Math.abs(n) < C &&
              !0 !== t.timelineRecovery &&
              !0 !== t.lateAfterOriginalFallback &&
              !0 !== t.fallbackDisplayed,
          );
        ((F.sync.displayedSegmentCount += 1),
          Math.abs(n) > 0.3 && (F.sync.overToleranceCount += 1),
          F.sync.displayErrorSamples.push(n),
          F.sync.displayErrorSamples.length > 60 &&
            (F.sync.displayErrorSamples =
              F.sync.displayErrorSamples.slice(-60)),
          r &&
            (F.sync.autoCorrectionErrorSamples.push(n),
            F.sync.autoCorrectionErrorSamples.length > 60 &&
              (F.sync.autoCorrectionErrorSamples =
                F.sync.autoCorrectionErrorSamples.slice(-60)),
            (function () {
              if (!F.sync.enabled || !F.sync.ready) return;
              const e = F.sync.autoCorrectionErrorSamples
                .slice(-8)
                .map((e) => vu(e))
                .filter((e) => null !== e);
              if (e.length < 5) return;
              const t = [...e].sort((e, t) => e - t),
                n = Math.floor(t.length / 2),
                a = t.length % 2 ? t[n] : (t[n - 1] + t[n]) / 2;
              if (Math.abs(a) < 0.12) return;
              const i = vu(F.sync.autoCorrectionSeconds) ?? 0,
                s = Cu(0.35 * -a, -0.08, 0.08),
                r = Cu(i + s, -0.35, 0.35);
              Math.abs(r - i) < 0.005 || (F.sync.autoCorrectionSeconds = r);
            })()));
      })(s.syncDisplayErrorSeconds, s),
      (s.plannedDisplayDurationMs = (function (e) {
        const t = F.segmentQueue[0] || null,
          n = ta(e),
          a = oa(e),
          i = na(e, a)
            ? (function (e, t, n = ta(e)) {
                const a = Math.max(0, vu(t) ?? 0),
                  i = ha(),
                  s = Cu((a - C) / Math.max(0.1, i - C), 0, 1),
                  r = Math.round(D - 1200 * s),
                  o = Cu(n, 2200, D);
                return Cu(Math.max(r, o), 3e3, D);
              })(e, a, n)
            : null,
          s = (function (e, t = null) {
            if (!F.sync.enabled || !F.sync.ready) return null;
            const n = td();
            if (null === n) return null;
            if (null !== Aa(t))
              return Cu(1e3 * (ra(t, { includeEarlyGuard: !1 }) - n), 650, k);
            const a = Ca(e);
            if (null === a) return null;
            const i = ra(
              { displayAfterMediaTime: a },
              { includeEarlyGuard: !1 },
            );
            return i <= n ? null : Cu(1e3 * (i - n), 650, k);
          })(e, t);
        if (null !== s)
          return t
            ? ea(e, t) || null === i
              ? s
              : Math.max(s, i)
            : null === i
              ? Math.max(s, n)
              : Math.max(s, i, n);
        if (t) {
          const e = td(),
            n = Aa(t);
          if (null !== e && null !== n) {
            const n = Cu(1e3 * (ra(t, { includeEarlyGuard: !1 }) - e), 650, k);
            return null === i ? n : Math.max(n, i);
          }
        }
        return null !== i ? Math.max(i, n) : n;
      })(s)),
      (function (e) {
        const t = Aa(e),
          n = Ca(e),
          a = F.sessionId,
          i = vu(F.sync.subtitleSeekGuard?.sequence) || 0,
          s = {
            notificationId: [
              a,
              i,
              vu(e.displaySequence) || 0,
              yn(t),
              yn(n),
            ].join(":"),
            original: e.original,
            translation: e.translation,
            order: e.order,
            segmentationMethod: e.segmentationMethod || "",
            mediaTime: vu(e.mediaTime),
            displayAfterMediaTime: vu(e.displayAfterMediaTime),
            audioStartMediaTime: vu(e.audioStartMediaTime),
            audioEndMediaTime: vu(e.audioEndMediaTime),
            mediaTimeEnd: vu(e.mediaTimeEnd),
            targetMediaTime: t,
            targetMediaTimeEnd: n,
            timingSource: e.timingSource || "",
            queueSequence: vu(e.queueSequence),
            displaySequence: vu(e.displaySequence),
            seekSequence: i,
            syncDisplayErrorSeconds: vu(e.syncDisplayErrorSeconds),
            subtitleEffectiveOffsetSeconds: vu(
              e.subtitleEffectiveOffsetSeconds,
            ),
            subtitlePresentationLeadSeconds: vu(
              e.subtitlePresentationLeadSeconds,
            ),
            queuedAtMs: vu(e.queuedAtMs),
            queuedViewerMediaTime: vu(e.queuedViewerMediaTime),
            queuedTargetMediaTime: vu(e.queuedTargetMediaTime),
            queuedSecondsUntilDisplay: vu(e.queuedSecondsUntilDisplay),
            queueBacklogAtEnqueue: vu(e.queueBacklogAtEnqueue),
            incomingBatchIndex: vu(e.incomingBatchIndex),
            incomingBatchSize: vu(e.incomingBatchSize),
            plannedDisplayDurationMs: vu(e.plannedDisplayDurationMs),
            sourceTimelineOffsetSeconds: vu(e.sourceTimelineOffsetSeconds),
            sourceTimelineOffsetStable: Boolean(e.sourceTimelineOffsetStable),
            viewerMediaTime: vu(e.viewerMediaTime),
            viewerPlaybackRate: vu(e.viewerPlaybackRate),
            viewerPaused: Boolean(e.viewerPaused),
            viewerVideoVisible: Boolean(e.viewerVideoVisible),
            viewerVideoCandidateCount: vu(e.viewerVideoCandidateCount),
            viewerClockSource: e.viewerClockSource || "",
            fallbackDisplayed: Boolean(e.fallbackDisplayed),
            lateAfterOriginalFallback: Boolean(e.lateAfterOriginalFallback),
            cacheCandidateId: ku(e.cacheCandidateId || ""),
            skipped: Boolean(e.skipped),
            displayedAt: new Date().toISOString(),
          },
          r = `${a}:`;
        ((pe = pe.filter((e) => ku(e?.notificationId || "").startsWith(r))),
          pe.push(s),
          pe.length > 24 && (pe = pe.slice(-24)),
          Qa(
            {
              type: "LIVE_SUBTITLE_SEGMENT_DISPLAYED",
              sessionId: a,
              segment: s,
              segments: [...pe],
            },
            0,
          ));
      })(s),
      ei(),
      (ye = window.setTimeout(() => {
        ((ye = null), kn());
      }, s.plannedDisplayDurationMs)));
  }
  function xn() {
    ye && (window.clearTimeout(ye), (ye = null));
  }
  function An() {
    (En(),
      (F.subtitleWaitExpired = !1),
      (F.subtitleHadContent = !0),
      (F.subtitleFading = !1),
      (F.subtitleDisplayBlank = !1),
      (F.lastSubtitleActivityAt = Date.now()));
  }
  function Cn(e = {}) {
    if (!F.subtitleHadContent || F.subtitleDisplayBlank) return;
    En();
    const t = (F.sync.enabled, 2e3),
      n = e.fromNow
        ? 0
        : Math.max(
            0,
            Date.now() - (vu(F.lastSubtitleActivityAt) || Date.now()),
          ),
      a = Math.max(0, t - n);
    ge = window.setTimeout(() => {
      ((ge = null), Ln());
    }, a);
  }
  function Rn() {
    if (!F.subtitleWaitExpired)
      return F.currentOriginal || F.currentTranslation || Jn() || Za() || Pn()
        ? (fe || ((F.subtitleFading = !1), (F.subtitleDisplayBlank = !1)),
          void (function () {
            if (ge || fe || F.subtitleWaitExpired) return;
            const e = Dn();
            null !== e &&
              (ge = window.setTimeout(() => {
                ((ge = null), Ln({ whileWaiting: !0 }));
              }, e));
          })())
        : void Bn({ blank: !0 });
  }
  function Dn() {
    if ("side" === F.mode || F.sync.userPaused || Yd()?.paused) return null;
    const e =
      vu(F.activeSegment?.displayedAtMs) || vu(F.lastSubtitleActivityAt);
    if (!e) return null;
    const t = Cu(vu(F.activeSegment?.plannedDisplayDurationMs) || 0, 0, k),
      n = (F.sync.enabled, 2e3),
      a = e + t + n - Date.now(),
      i = Ca(F.activeSegment),
      s = td(),
      r = vu(Yd()?.playbackRate) || 1,
      o =
        F.sync.enabled && null !== i && null !== s
          ? ((ra({ displayAfterMediaTime: i }, { includeEarlyGuard: !1 }) - s) /
              r) *
              1e3 +
            n
          : 0;
    return Math.max(0, Math.round(a), Math.round(o));
  }
  function Ln(e = {}) {
    if (!F.subtitleHadContent || F.subtitleDisplayBlank) return;
    const t = !0 === e.whileWaiting && 0 === Dn();
    (e.whileWaiting && !t) ||
      ((t || (!F.activeSegment && !F.segmentQueue.length)) &&
        (("side" === F.mode && F.largeSegmentHistory.length) ||
          (!t && Pn && Pn() && Jn && Jn()) ||
          ((F.subtitleFading = !0),
          ei(),
          (fe = window.setTimeout(() => {
            ((fe = null),
              (function (e = {}) {
                fe && (window.clearTimeout(fe), (fe = null));
                const t = !0 === e.whileWaiting && 0 === Dn();
                e.whileWaiting && !t
                  ? ((F.subtitleFading = !1), ei())
                  : t
                    ? (Ja("subtitle.display.wait_expired", {
                        displaySequence:
                          F.activeSegment?.displaySequence ??
                          F.subtitleSequence,
                        displayedForMs: Math.max(
                          0,
                          Date.now() -
                            (F.activeSegment?.displayedAtMs ||
                              F.lastSubtitleActivityAt),
                        ),
                        plannedDisplayDurationMs:
                          F.activeSegment?.plannedDisplayDurationMs ?? null,
                        viewerMediaTime: yn(td()),
                        queueLength: F.segmentQueue.length,
                        pendingText: Pn(),
                      }),
                      (F.subtitleWaitExpired = !0),
                      Bn({ blank: !0 }),
                      ei())
                    : F.activeSegment || F.segmentQueue.length
                      ? ((F.subtitleFading = !1), ei())
                      : Pn && Pn() && Jn && Jn()
                        ? ((F.subtitleFading = !1),
                          (F.subtitleDisplayBlank = !1),
                          ei())
                        : "side" === F.mode && F.largeSegmentHistory.length
                          ? ((F.currentOriginal = ""),
                            (F.currentTranslation = ""),
                            (F.subtitleFading = !1),
                            (F.subtitleDisplayBlank = !1),
                            ei())
                          : ((F.pendingOriginal = ""),
                            (F.pendingOriginalUpdatedAt = 0),
                            (F.currentOriginal = ""),
                            (F.currentTranslation = ""),
                            (F.translationSource = ""),
                            (F.translationUpdatedAt = 0),
                            (F.largeSegmentHistory = []),
                            (F.draftOriginal = ""),
                            (F.draftTranslation = ""),
                            (F.finalOriginal = ""),
                            (F.finalTranslation = ""),
                            (F.subtitleFading = !1),
                            (F.subtitleDisplayBlank = !0),
                            ei());
              })(e));
          }, 420)))));
  }
  function Bn(e = {}) {
    e.clearQueue &&
      (xn(),
      (F.segmentQueue = []),
      ma("queue-cleared", { resume: !1 }),
      ga("queue-cleared", { resume: !1 }));
    const t = e.clearHistory || (e.blank && e.clearPending && e.clearQueue);
    ((F.activeSegment = null),
      (F.currentOriginal = ""),
      (F.currentTranslation = ""),
      (F.translationSource = ""),
      (F.translationUpdatedAt = 0),
      t &&
        ((F.largeSegmentHistory = []),
        (F.displayedSegmentHistory = []),
        (F.subtitleRenderSignature = ""),
        (F.largeRenderSignature = "")),
      (F.subtitleFading = !1),
      (F.subtitleDisplayBlank = Boolean(e.blank)),
      e.clearPending &&
        ((F.pendingOriginal = ""),
        (F.pendingOriginalUpdatedAt = 0),
        (F.draftOriginal = ""),
        (F.draftTranslation = ""),
        (F.finalOriginal = ""),
        (F.finalTranslation = "")));
  }
  function En() {
    (ge && (window.clearTimeout(ge), (ge = null)),
      fe && (window.clearTimeout(fe), (fe = null)));
  }
  function Pn() {
    return Boolean(F.pendingOriginal || F.draftOriginal);
  }
  function In() {
    const e = vu(F.pendingOriginalUpdatedAt) || 0;
    return e ? Math.max(0, Date.now() - e) : 0;
  }
  function Un() {
    const e = vu(F.sync.lastSpeechActivityAt) || 0;
    return e ? Math.max(0, Date.now() - e) : 1 / 0;
  }
  function _n(e = Fn()) {
    const t =
        vu(F.sync.lockedDelaySeconds) ??
        vu(F.sync.targetDelaySeconds) ??
        F.sync.fixedDelaySeconds ??
        6,
      n = Math.max(Kn(e), Math.max(0, Number(t) || 0));
    return Cu(Math.round(1e3 * (n + 4)), 12e3, 45e3);
  }
  function qn(e = Fn()) {
    return Un() <= _n(e);
  }
  function On(e = Fn()) {
    return (
      (function (e = Fn()) {
        return !!Pn() && In() <= _n(e);
      })(e) || qn(e)
    );
  }
  function Vn(e = {}) {
    const t = e.sync || {},
      n = vu(
        e.mediaStartTime ??
          e.sourceMediaStartTime ??
          e.audioStartMediaTime ??
          t.sourceMediaStartTime ??
          t.audioStartMediaTime ??
          t.mediaTime,
      ),
      a = vu(
        e.mediaEndTime ??
          e.sourceMediaEndTime ??
          e.audioEndMediaTime ??
          t.sourceMediaEndTime ??
          t.audioEndMediaTime ??
          t.mediaTimeEnd ??
          t.mediaTime,
      );
    return null === n || null === a || a <= n
      ? null
      : { start: Math.min(n, a), end: Math.max(n, a) };
  }
  function $n(e = {}) {
    if (!0 === e.done || !1 === e.active) return !0;
    const t = ku(
      e.stage || e.phase || e.status || e.reason || "",
    ).toLowerCase();
    return /^(done|complete|completed|translated|translation-ready|failed|error|ignored|dropped|no-text|empty|stale|stopped)$/.test(
      t,
    );
  }
  function Wn(e = {}) {
    const t = Array.isArray(F.sync?.pendingSubtitleRanges)
      ? F.sync.pendingSubtitleRanges
      : [];
    if (!t.length) return 0;
    const n = ku(e.key || ""),
      a = e.range || null;
    let i = 0;
    return (
      (F.sync.pendingSubtitleRanges = t.filter((e) => {
        const t = n && e.key === n,
          s =
            !n &&
            a &&
            (function (e = {}, t = {}) {
              const n = vu(e.start),
                a = vu(e.end),
                i = vu(t.start),
                s = vu(t.end);
              return (
                null !== n &&
                null !== a &&
                null !== i &&
                null !== s &&
                Math.abs(n - i) <= L &&
                Math.abs(a - s) <= L
              );
            })(e, a);
        return (!t && !s) || ((i += 1), !1);
      })),
      i
    );
  }
  function Nn(e = Date.now()) {
    const t = Array.isArray(F.sync?.pendingSubtitleRanges)
      ? F.sync.pendingSubtitleRanges
      : [];
    t.length &&
      (F.sync.pendingSubtitleRanges = t.filter(
        (t) => !t.expiresAtMs || t.expiresAtMs > e,
      ));
  }
  function Gn(e = null) {
    if (!e) return null;
    Nn();
    const t = { start: vu(e.previousEnd), end: vu(e.nextStart) };
    return null === t.start || null === t.end || t.end <= t.start
      ? null
      : (F.sync.pendingSubtitleRanges || []).find((e) =>
          (function (e = {}, t = {}) {
            const n = vu(e.start),
              a = vu(e.end),
              i = vu(t.start),
              s = vu(t.end);
            if (null === n || null === a || null === i || null === s) return !1;
            if (a <= n || s <= i) return !1;
            const r = Math.max(n, i),
              o = Math.min(a, s),
              l = Math.max(0, o - r);
            if (l <= L) return !1;
            const d = Math.max(0, s - i),
              c = n <= i + Math.min(1.2, Math.max(L, 0.25 * d)),
              u = Math.min(Math.max(0.75, 0.35 * d), Math.max(0.75, d));
            return c || l >= u;
          })(e, t),
        ) || null;
  }
  function Hn(e = null) {
    const t = vu(e);
    return null === t
      ? null
      : (Nn(),
        (F.sync.pendingSubtitleRanges || [])
          .filter((e) => {
            const n = vu(e.start),
              a = vu(e.end);
            return (
              !(null === n || null === a || a <= n) && a > t + L && n <= t + 1.2
            );
          })
          .sort((e, t) => e.start - t.start)[0] || null);
  }
  function Fn() {
    return F.sync.enabled &&
      !F.sync.singleTabMediaSync &&
      F.sync.adaptiveDelayEnabled
      ? mr(F.sync.subtitleBufferTargetSegments)
      : 0;
  }
  function zn(e = Xc(), t = Fn()) {
    return t <= 0
      ? e.ready > 0
      : e.hasTimedCoverage
        ? e.bufferSeconds + U >= e.targetSeconds
        : e.ready >= t;
  }
  function Kn(e = Fn()) {
    return e <= 0 ? 6 : Cu(6 + e, 6, 14);
  }
  function jn(e, t) {
    const n = Ya(e);
    return !(!n || !t) && (n === t || n.includes(t) || t.includes(n));
  }
  function Qn() {
    return Boolean(
      ku(F.currentTranslation) ||
        ku(F.activeSegment?.translation) ||
        F.largeSegmentHistory.some((e) => ku(e?.translation)),
    );
  }
  function Jn() {
    if (!Qn()) return !1;
    const e = vu(F.lastSubtitleActivityAt) || 0,
      t = (F.sync.enabled, 2420);
    return (
      !!(e && Date.now() - e < t) ||
      Boolean(F.activeSegment || F.segmentQueue.length)
    );
  }
  function Yn(e) {
    return e.map(Zn).filter(Boolean).join("|");
  }
  function Xn(e) {
    return `${ku(e.original)}\n${ku(e.translation)}`;
  }
  function Zn(e) {
    const t = Xn(e);
    if (!t) return "";
    const n = Aa(e),
      a = Ca(e),
      i = null === n ? "na" : String(Math.round(10 * n) / 10),
      s = null === a ? "na" : String(Math.round(10 * a) / 10);
    return `${Va(e?.mediaContextKey || e?.videoKey || e?.cacheVideoKey || "")}\n${i}-${s}\n${t}`;
  }
  function ea(e, t = F.segmentQueue[0] || null) {
    if (!(F.sync.enabled && F.sync.ready && e && t)) return !1;
    if (
      !Boolean(!0 === e.cacheReplay || !0 === t.cacheReplay || $l({}, [e, t]))
    )
      return !1;
    const n = Aa(e),
      a = Aa(t);
    return null !== n && null !== a && a > n + 0.001;
  }
  function ta(e) {
    const t = Array.from(ku(e.original)).length,
      n = Array.from(ku(e.translation)).length;
    return Cu(2e3 + 70 * Math.max(Math.round(0.65 * t), n), 3600, k);
  }
  function na(e, t = oa(e)) {
    if (!fa()) return !1;
    const n = vu(t);
    return null !== n && n > C;
  }
  function aa(e, t = Date.now()) {
    if (!e) return 0;
    if (ea(e)) return 0;
    const n = vu(e.displayedAtMs),
      a = vu(e.plannedDisplayDurationMs),
      i = vu(e.syncDisplayErrorSeconds);
    if (null === n || null === a || !na(e, i)) return 0;
    const s = Math.max(3e3, Math.min(a, D));
    return Math.max(0, s - Math.max(0, t - n));
  }
  function ia(e = {}, t = [], n = {}) {
    const a = n.safety || Al(e, t),
      i = Xc(0),
      s = Math.max(
        0,
        mn([n.requiredLeadSeconds, a.requiredLeadSeconds, Bl(e)]) || 0,
      ),
      r = Boolean(
        !1 !== n.allowReadinessLedger &&
          !0 === a.coverageReady &&
          !0 === a.leadReady,
      ),
      o = Boolean(
        !1 !== n.allowActualSubtitleBuffer &&
          s > 0 &&
          i.hasTimedCoverage &&
          i.bufferSeconds + N >= s &&
          (null === i.gapSeconds || i.gapSeconds <= 1.25),
      );
    return {
      ready: r || o,
      proof: r ? "readiness-ledger" : o ? "actual-subtitle-buffer" : "",
      readyBufferSeconds: r
        ? Math.max(0, vu(a.readyLeadSeconds) || 0)
        : Math.max(0, vu(i.bufferSeconds) || 0),
      targetBufferSeconds: s,
      readinessLedgerReady: r,
      actualSubtitleBufferReady: o,
      safety: a,
      stats: i,
    };
  }
  function sa(e = {}) {
    const t = e.event || {},
      n = e.segments || [];
    if (
      !F.sync.singleTabMediaSync ||
      !ya() ||
      F.sync.subtitleBufferPrimed ||
      !0 === e.forced ||
      !$l(t, n)
    )
      return !1;
    const a = e.decision || ia(t, n, e);
    if (!a.ready) return !1;
    F.sync.subtitleBufferPrimed = !0;
    const i = a.stats || Xc(0),
      s = (Array.isArray(n) ? n : [])[0] || null;
    return (
      Ja(
        "subtitle.single_tab_mse.buffer_primed",
        {
          trigger: ku(e.trigger || "mse-startup-release"),
          proof: a.proof,
          readySegments: i.ready,
          queuedSegments: i.queued,
          bufferSeconds: yn(i.bufferSeconds),
          readyBufferSeconds: yn(a.readyBufferSeconds),
          targetBufferSeconds: yn(a.targetBufferSeconds),
          viewerMediaTime: yn(i.playbackMediaTime),
          cueMediaTime: yn(Aa(s)),
          cueMediaTimeEnd: yn(Ca(s)),
          firstCueShown: Boolean(F.sync.singleTabMseFirstCueShown),
          preciseMediaTimeScheduling: !0,
        },
        "info",
      ),
      !0
    );
  }
  function ra(e, t = {}) {
    const n = Aa(e);
    if (null === n) return null;
    const a = (t.includeEarlyGuard, 0);
    return n + ka() + a;
  }
  function oa(e) {
    if (!F.sync.enabled || !F.sync.ready) return null;
    const t = Aa(e),
      n = td();
    return null === t || null === n ? null : n - (t + ka());
  }
  function la(e, t = oa(e)) {
    if (!fa()) return !1;
    if (ba(e)) return !1;
    const n = vu(t),
      a = td();
    if (null === a) return !1;
    const i = ha(),
      s = Boolean(
        F.sync.pendingViewerSeek || F.sync.delayBuffering || Zt() || dd(),
      ),
      r = Boolean(
        !0 === e?.mseBufferedSource &&
          !0 !== e?.fallbackDisplayed &&
          !0 !== e?.timelineRecovery &&
          !0 !== e?.cacheReplay,
      ),
      o = Ca(e);
    if (null !== o) {
      const t = ra({ displayAfterMediaTime: o }, { includeEarlyGuard: !1 }),
        n = Boolean(
          e?.timelineRecovery ||
            e?.cacheReplay ||
            F.sync.timelineGapHold?.pausedViewer ||
            F.sync.mseSubtitleCoverageHold?.pausedViewer,
        );
      if (
        ya() &&
        n &&
        !(function (e = null, t = null) {
          if (0 !== (vu(F.sync.viewerPlaybackRate) ?? 1)) return !1;
          if (
            !Boolean(
              F.sync.timelineGapHold?.pausedViewer ||
                F.sync.mseSubtitleCoverageHold?.pausedViewer,
            )
          )
            return !1;
          const n = vu(e),
            a = vu(t);
          return null === n || null === a || n - a <= 1;
        })(a, t) &&
        a - t > R
      )
        return !0;
      if (
        (function (e, t, n) {
          const a = vu(t),
            i = vu(n);
          if (null === a || null === i) return !1;
          const s = a - i;
          if (s <= R) return !1;
          if (e?.cacheReplay) return !0;
          const r = Zt(),
            o = ku(r?.reason || "");
          if (
            !/mse-startup|cached-replay|viewer-seeking|source-actual-seek/.test(
              o,
            )
          )
            return !1;
          const l = vu(r?.releaseMediaTime ?? r?.targetMediaTime);
          return !!(null !== l && i <= l + R) || s > ha();
        })(e, a, t)
      )
        return !0;
      if (s && !r && a - t > i) return !0;
    }
    return s && !r && null !== n && n > Math.max(30, 2 * i);
  }
  function da(e) {
    const t = F.sync.timelineGapHold;
    if (!t?.active && !t?.key) return { preserve: !1 };
    const n = vu(t.previousEndMediaTime),
      a = vu(t.nextStartMediaTime),
      i = ln(e) || on(e),
      s = vu(i?.start),
      r = vu(i?.end);
    if (null === n || null === a || null === s || null === r || r <= s)
      return { preserve: !1 };
    const o = r > n + L && s < a - L,
      l = o ? Math.max(n, Math.min(a, r)) : n,
      d = Math.max(0, a - l);
    return {
      preserve: o && d > 3,
      holdStart: n,
      holdEnd: a,
      rangeStart: s,
      rangeEnd: r,
      stillMissingSeconds: d,
    };
  }
  function ca(e = 3) {
    const t = Yd();
    if (!t || !Number.isFinite(t.duration) || t.duration <= 0) return !1;
    const n = vu(t.currentTime);
    return null !== n && t.duration - n <= e;
  }
  function ua(e) {
    const t = Aa(e);
    if (null === t) return null;
    const n =
      wn()
        .filter((e) => e.start <= t + 0.05)
        .sort((e, t) => t.end - e.end)[0] || null;
    if (!n) return null;
    const a = Math.max(0, t - n.end);
    return { previousEnd: n.end, nextStart: t, gapSeconds: a };
  }
  function ma(e = "cleared", t = {}) {
    const n = F.sync.timelineGapHold;
    if (!n?.active && !n?.key) return;
    const a =
        Boolean(n.pausedViewer) &&
        !1 !== t.resume &&
        !F.sync.userPaused &&
        !F.sync.pendingViewerSeek &&
        !F.sync.delayBuffering &&
        !F.sync.mseStartupWaitActive,
      i = vu(n.previousEndMediaTime),
      s = Math.max(0, Date.now() - (vu(n.startedAtMs) || Date.now()));
    if (
      ((F.sync.timelineGapHold = {
        active: !1,
        key: "",
        startedAtMs: 0,
        lastLogAtMs: 0,
        pausedViewer: !1,
        softHold: !1,
        previousEndMediaTime: null,
        nextStartMediaTime: null,
        pendingRange: null,
      }),
      n.pausedViewer || n.softHold)
    ) {
      const t = vu(n.nextStartMediaTime),
        r = null !== i && null !== t ? Math.max(0, t - i) : null,
        o = null !== i && null !== t ? Mn({ start: i, end: t }) : null,
        l = null !== r && null !== o ? Math.max(0, r - o) : null;
      Ja(
        "subtitle.queue.timeline_gap_hold.released",
        {
          reason: e,
          heldMs: s,
          resumed: a,
          softHold: Boolean(n.softHold),
          previousEndMediaTime: yn(i),
          nextStartMediaTime: yn(t),
          pendingRange: n.pendingRange
            ? {
                start: yn(n.pendingRange.start),
                end: yn(n.pendingRange.end),
                stage: n.pendingRange.stage || "",
              }
            : null,
          filledSeconds: yn(o),
          stillMissingSeconds: yn(l),
          viewerMediaTime: yn(td()),
          queueLength: F.segmentQueue.length,
        },
        "subtitle-ready" === e ? "info" : "warn",
      );
    }
    a && fd(Yd());
  }
  function ya() {
    return Boolean(
      F.config?.mseAudioBufferEnabled ||
        "mse-audio-buffer" === F.config?.audioInputMode,
    );
  }
  function pa(e = null, t = "coverage-frontier") {
    const n = Yd();
    return (
      !!n &&
      ((F.sync.viewerMediaTime = vu(n.currentTime) ?? F.sync.viewerMediaTime),
      (F.sync.viewerWallTimeMs = Date.now()),
      (F.sync.viewerPlaybackRate = n.paused ? 0 : vu(n.playbackRate) || 1),
      (F.sync.status = "下一段 MSE 字幕追趕中"),
      Ja(
        "mse.subtitle_coverage_hold.soft",
        {
          reason: t,
          previousEndMediaTime: yn(e),
          viewerMediaTime: yn(F.sync.viewerMediaTime),
          paused: Boolean(n.paused),
          pendingTextAgeMs: In(),
          speechActivityAgeMs: Un(),
        },
        "warn",
      ),
      !1)
    );
  }
  function ga(e = "subtitle-ready", t = {}) {
    const n = F.sync.mseSubtitleCoverageHold;
    if (!n?.active && !n?.key) return !1;
    if (
      "subtitle-ready" === e &&
      !(function (e = F.sync.mseSubtitleCoverageHold) {
        const t = vu(e?.previousEndMediaTime);
        if (null === t) return !1;
        const n = F.segmentQueue
          .map((e) => on(e))
          .filter(Boolean)
          .sort((e, t) => e.start - t.start);
        for (const e of n) if (!(e.end <= t + 0.01)) return e.start <= t + 2.5;
        return !1;
      })(n)
    ) {
      const e =
        F.segmentQueue
          .map((e) => on(e))
          .filter(Boolean)
          .sort((e, t) => e.start - t.start)[0] || null;
      return (
        Ja(
          "mse.subtitle_coverage_hold.release_deferred",
          {
            reason: "queue-does-not-cover-frontier",
            queueLength: F.segmentQueue.length,
            viewerMediaTime: yn(td()),
            previousEndMediaTime: yn(n.previousEndMediaTime),
            nextQueuedStartMediaTime: yn(e?.start),
            nextQueuedEndMediaTime: yn(e?.end),
            coverageGapSeconds: yn(
              e && null !== vu(n.previousEndMediaTime)
                ? Math.max(0, e.start - vu(n.previousEndMediaTime))
                : null,
            ),
            pausedViewer: Boolean(n.pausedViewer),
          },
          "warn",
        ),
        !1
      );
    }
    const a = Math.max(0, Date.now() - (vu(n.startedAtMs) || Date.now()));
    return (
      (F.sync.mseSubtitleCoverageHold = {
        active: !1,
        key: "",
        startedAtMs: 0,
        lastLogAtMs: 0,
        previousEndMediaTime: null,
        pendingRange: null,
      }),
      Ja(
        "mse.subtitle_coverage_hold.released",
        {
          reason: e,
          heldMs: a,
          queueLength: F.segmentQueue.length,
          viewerMediaTime: yn(td()),
          previousEndMediaTime: yn(n.previousEndMediaTime),
          pausedViewer: Boolean(n.pausedViewer),
        },
        "subtitle-ready" === e ? "info" : "warn",
      ),
      n.pausedViewer &&
        !1 !== t.resume &&
        ((F.sync.viewerPlaybackBlocked = !1),
        (F.sync.viewerPlaybackBlockedAtMs = 0),
        fd(Yd())),
      !0
    );
  }
  function fa() {
    return Boolean(
      F.sync.enabled && F.sync.ready && !F.sync.singleTabMediaSync,
    );
  }
  function Sa() {
    return (
      !!fa() ||
      Boolean(
        F.sync.enabled &&
          F.sync.ready &&
          F.sync.singleTabMediaSync &&
          F.sync.subtitleBufferPrimed &&
          ya(),
      )
    );
  }
  function ha() {
    return Cu(0.75 * (vu(vd()) ?? 6), 4, 9);
  }
  function ba(e) {
    if (
      !(function (e) {
        const t = Aa(e),
          n = Ca(e);
        return null !== t && null !== n && n > t + 0.05;
      })(e)
    )
      return !1;
    const t = td(),
      n = Ca(e);
    return (
      null !== t &&
      null !== n &&
      t < ra({ displayAfterMediaTime: n }, { includeEarlyGuard: !1 })
    );
  }
  function va() {
    ((F.sync.displayErrorSamples = []),
      (F.sync.autoCorrectionErrorSamples = []),
      (F.sync.lastDisplayErrorSeconds = null),
      (F.sync.displayedSegmentCount = 0),
      (F.sync.overToleranceCount = 0),
      (F.sync.autoCorrectionSeconds = 0));
  }
  function Ma() {
    const e = F.sync.displayErrorSamples
      .map((e) => vu(e))
      .filter((e) => null !== e);
    if (!F.sync.enabled) return { enabled: !1, text: "off" };
    if (!e.length)
      return {
        enabled: !0,
        ready: F.sync.ready,
        sampleCount: 0,
        text: F.sync.ready ? "等待樣本" : "字幕準備中",
      };
    const t = e.map((e) => Math.abs(e)),
      n = t.reduce((e, t) => e + t, 0) / t.length,
      a = Math.max(...t),
      i = e.filter((e) => Math.abs(e) > 0.3).length;
    return {
      enabled: !0,
      ready: F.sync.ready,
      sampleCount: e.length,
      displayedSegmentCount: F.sync.displayedSegmentCount,
      lastSeconds: F.sync.lastDisplayErrorSeconds,
      avgAbsSeconds: n,
      maxAbsSeconds: a,
      rollingOverToleranceCount: i,
      overToleranceCount: F.sync.overToleranceCount,
      autoCorrectionSeconds: vu(F.sync.autoCorrectionSeconds) ?? 0,
      toleranceSeconds: 0.3,
    };
  }
  function wa(e = Ma()) {
    if (e.text) return e.text;
    if (!e.enabled) return "off";
    if (!e.sampleCount) return e.ready ? "等待樣本" : "字幕準備中";
    const t =
        e.rollingOverToleranceCount > 0
          ? ` / >${e.toleranceSeconds.toFixed(1)}s ${e.rollingOverToleranceCount}`
          : "",
      n =
        Math.abs(e.autoCorrectionSeconds || 0) >= 0.01
          ? ` / auto ${Ic(e.autoCorrectionSeconds)}`
          : "";
    return `last ${Ic(e.lastSeconds)} / avg ${e.avgAbsSeconds.toFixed(2)}s / max ${e.maxAbsSeconds.toFixed(2)}s${n}${t}`;
  }
  function Ta() {
    return "display" !== F.role ||
      !F.sync.enabled ||
      F.sync.singleTabMediaSync ||
      ("youtube" !== F.sync.platform && !ac()) ||
      !0 !== F.sync.sourceTiming?.isLiveStream
      ? 0
      : -0.9;
  }
  function ka() {
    return Cu(
      F.sync.subtitleOffsetSeconds +
        (vu(F.sync.autoCorrectionSeconds) ?? 0) +
        Ta(),
      -2,
      2,
    );
  }
  function xa(e, t, n = 1, a = null) {
    const i = td(),
      s = Aa(t),
      r = Ca(t);
    Ja(
      "subtitle.queue.drop_stale_late",
      {
        reason: e,
        droppedSegments: n,
        previousQueueLength: vu(a),
        viewerMediaTime: i,
        mediaTime: s,
        mediaTimeEnd: r,
        displayErrorSeconds: oa(t),
        hardDropSeconds: ha(),
        queueSequence: vu(t?.queueSequence),
        original: ku(t?.original).slice(0, 160),
      },
      "warn",
    );
  }
  function Aa(e) {
    return vu(
      e?.displayAfterMediaTime ?? e?.audioStartMediaTime ?? e?.mediaTime,
    );
  }
  function Ca(e) {
    return vu(e?.audioEndMediaTime ?? e?.mediaTimeEnd ?? e?.mediaEndTime);
  }
  function Ra(e, t) {
    const n = Aa(e),
      a = Aa(t);
    if (null !== n && null !== a && Math.abs(n - a) > 0.001) return n - a;
    const i = vu(e?.displaySequence),
      s = vu(t?.displaySequence);
    if (null !== i && null !== s && i !== s) return i - s;
    const r = vu(e?.queueSequence),
      o = vu(t?.queueSequence);
    if (null !== r && null !== o && r !== o) return r - o;
    const l = vu(e?.order) ?? 0,
      d = vu(t?.order) ?? 0;
    return l !== d
      ? l - d
      : (vu(e?.displayedAtMs) ?? 0) - (vu(t?.displayedAtMs) ?? 0);
  }
  function Da(e) {
    return Array.isArray(e) ? e.slice().sort(Ra) : [];
  }
  function La(e, t = {}) {
    if (
      !(function (e = {}) {
        const t = qa(e);
        return (
          !t ||
          (F.subtitleTimelineCacheContext &&
            F.subtitleTimelineCacheContext !== t &&
            Ka(),
          (F.subtitleTimelineCacheContext = t),
          !0)
        );
      })(t)
    )
      return;
    const n = (Array.isArray(e) ? e : [])
      .map((e) =>
        (function (e, t = {}) {
          if (
            !e?.original ||
            !e?.translation ||
            !0 === e.fallbackDisplayed ||
            !0 === t.fallbackDisplayed
          )
            return null;
          const n = Aa(e);
          if (null === n) return null;
          const a = Ca(e),
            i = ku(t.id || t.requestId || t.sequence || "");
          return {
            ...e,
            id: ku(e.id) || `cached-${Math.round(1e3 * n)}`,
            mediaTime: vu(e.mediaTime) ?? n,
            displayAfterMediaTime: vu(e.displayAfterMediaTime),
            audioStartMediaTime: vu(e.audioStartMediaTime),
            audioEndMediaTime: a,
            mediaTimeEnd: vu(e.mediaTimeEnd),
            cachedAtMs: Date.now(),
            updatedAtMs: Date.now(),
            sourceEventId: i,
            timelineRevision: vu(
              e.timelineRevision ??
                t.timelineRevision ??
                t.sync?.timelineRevision,
            ),
            cacheReplay: !1,
          };
        })(e, t),
      )
      .filter(Boolean);
    if (!n.length) return;
    const a = new Map(F.subtitleTimelineCache.map((e) => [Ha(e), e]));
    if (!0 === t.cacheUpgrade) {
      const e = new Set(n.map(Fa)),
        t = new Set(n.map(Ha));
      for (const [n, i] of [...a.entries()])
        e.has(Fa(i)) && !t.has(n) && a.delete(n);
    }
    let i = 0,
      s = 0;
    for (const e of n) {
      const t = vu(e.timelineRevision);
      let n = !1;
      if (null !== t)
        for (const [s, r] of [...a.entries()]) {
          if (!Ua(r, e)) continue;
          const o = vu(r.timelineRevision);
          null !== o && o !== t && (t > o ? (a.delete(s), (i += 1)) : (n = !0));
        }
      if (n) {
        s += 1;
        continue;
      }
      const r = Ha(e),
        o = a.get(r);
      a.set(
        r,
        o
          ? {
              ...o,
              ...e,
              cachedAtMs: o.cachedAtMs || e.cachedAtMs,
              updatedAtMs: Date.now(),
            }
          : e,
      );
    }
    (i || s) &&
      Ja(
        "subtitle.timeline.cache_revision_replaced",
        {
          incomingRevision: vu(t.timelineRevision ?? t.sync?.timelineRevision),
          replacedOlderSegments: i,
          ignoredOlderIncomingSegments: s,
          incomingSegments: n.length,
        },
        "info",
      );
    const r = Da(Sn([...a.values()], n, "timeline-cache"));
    ((F.subtitleTimelineCache = r.length > 24e3 ? r.slice(-24e3) : r),
      (F.subtitleTimelineCacheBytes = za(F.subtitleTimelineCache)));
  }
  function Ba() {
    F.sync.cachedSubtitleReplayGuard = {
      active: !1,
      targetMediaTime: null,
      cacheEndMediaTime: null,
      startedAtMs: 0,
      segments: [],
    };
  }
  function Ea(e = [], t = null) {
    const n = Da(
      (Array.isArray(e) ? e : []).filter((e) => {
        if (!0 === e?.fallbackDisplayed) return !1;
        const t = on(e);
        return null !== vu(t?.start) && null !== vu(t?.end) && t.end > t.start;
      }),
    );
    if (!n.length) return (Ba(), null);
    const a = n.reduce((e, t) => Math.max(e, vu(Ca(t)) ?? e), 0);
    return (
      (F.sync.cachedSubtitleReplayGuard = {
        active: !0,
        targetMediaTime: vu(t),
        cacheEndMediaTime: a,
        startedAtMs: Date.now(),
        segments: n,
      }),
      F.sync.cachedSubtitleReplayGuard
    );
  }
  function Pa() {
    const e = F.sync.cachedSubtitleReplayGuard;
    if (!e?.active || !Array.isArray(e.segments) || !e.segments.length)
      return null;
    if (!Na()) return (Ba(), null);
    const t = td(),
      n = vu(e.cacheEndMediaTime);
    return null !== t && null !== n && t > n + m ? (Ba(), null) : e;
  }
  function Ia(e, t = []) {
    const n = vu(e?.start),
      a = vu(e?.end);
    if (null === n || null === a || a <= n) return 0;
    const i = (t || [])
      .map((e) => {
        const t = Aa(e),
          i = Ca(e);
        return null === t || null === i
          ? null
          : { start: Math.max(n, t), end: Math.min(a, i) };
      })
      .filter((e) => e && e.end > e.start)
      .sort((e, t) => e.start - t.start);
    let s = 0,
      r = null;
    for (const e of i)
      null === r || e.start > r
        ? ((s += e.end - e.start), (r = e.end))
        : e.end > r && ((s += e.end - r), (r = e.end));
    return s;
  }
  function Ua(e, t) {
    return (
      (function (e, t) {
        const n = Va(e?.mediaContextKey || ""),
          a = Va(t?.mediaContextKey || "");
        if (n && a && n !== a) return 0;
        const i = on(e),
          s = on(t);
        if (!i || !s) return 0;
        const r = i.end - i.start,
          o = s.end - s.start,
          l = Math.min(r, o);
        return l <= 0
          ? 0
          : Math.max(0, Math.min(i.end, s.end) - Math.max(i.start, s.start)) /
              l;
      })(e, t) >= 0.6
    );
  }
  function _a(e, t = []) {
    const n = on(e),
      a = vu(n?.start),
      i = vu(n?.end);
    if (null === a || null === i || i <= a)
      return {
        skip: !1,
        reason: "",
        coverageRatio: 0,
        coveredSeconds: 0,
        uncoveredSeconds: 0,
      };
    const s = (Array.isArray(t) ? t : []).filter((t) => {
      if (!t) return !1;
      const n = Va(t.mediaContextKey || ""),
        a = Va(e.mediaContextKey || "");
      return !(n && a && n !== a);
    });
    if (s.some((t) => Jt(t, e)))
      return {
        skip: !0,
        reason: "exact-segment-duplicate",
        coverageRatio: 1,
        coveredSeconds: i - a,
        uncoveredSeconds: 0,
      };
    const r = s.filter((t) => Ua(t, e));
    if (!r.length)
      return {
        skip: !1,
        reason: "",
        coverageRatio: 0,
        coveredSeconds: 0,
        uncoveredSeconds: i - a,
      };
    const o = i - a,
      l = Ia({ start: a, end: i }, r),
      d = Math.max(0, o - l),
      c = o > 0 ? l / o : 0,
      u = c >= 0.92 && d <= 0.35;
    return {
      skip: u,
      reason: u ? "timeline-fully-covered" : "",
      coverageRatio: c,
      coveredSeconds: l,
      uncoveredSeconds: d,
    };
  }
  function qa(e = {}) {
    const t = Oa(e);
    if (t) return t;
    const n = Va(
      F.config?.viewerMediaContextKey || F.config?.sourceMediaContextKey || "",
    );
    return (
      n ||
      gc(
        e.pageUrl ||
          e.href ||
          e.sourceUrl ||
          e.mediaUrl ||
          e.sync?.pageUrl ||
          e.sync?.href ||
          e.sync?.sourceUrl ||
          e.sync?.mediaUrl ||
          e.context?.pageUrl ||
          e.context?.sourceUrl ||
          F.config?.pageUrl ||
          F.sync.sourceTiming?.href ||
          location.href,
      ) ||
      ""
    );
  }
  function Oa(e = {}) {
    return Va(
      e.videoKey ||
        e.cacheVideoKey ||
        e.mediaContextKey ||
        e.context?.videoKey ||
        e.context?.cacheVideoKey ||
        e.segmentation?.track?.videoKey ||
        e.segmentation?.videoKey ||
        "",
    );
  }
  function Va(e = "") {
    const t = ku(e).trim();
    return t
      ? /^[a-z][a-z0-9_-]*:/i.test(t)
        ? t
        : /^[A-Za-z0-9_-]{6,}$/.test(t)
          ? `youtube:${t}`
          : ""
      : "";
  }
  function $a(e = {}) {
    const t = Oa(e);
    if (t) return t;
    const n =
      e.pageUrl ||
      e.href ||
      e.sourceUrl ||
      e.mediaUrl ||
      e.sync?.pageUrl ||
      e.sync?.href ||
      e.sync?.sourceUrl ||
      e.sync?.mediaUrl ||
      e.context?.pageUrl ||
      e.context?.sourceUrl ||
      "";
    return n ? gc(n) : "";
  }
  function Wa() {
    return (
      yc() ||
      Va(
        F.config?.viewerMediaContextKey ||
          F.config?.sourceMediaContextKey ||
          "",
      ) ||
      gc(F.config?.pageUrl || "") ||
      gc(F.sync.sourceTiming?.href || "") ||
      ""
    );
  }
  function Na() {
    const e = F.subtitleTimelineCacheContext || "";
    if (!e) return !0;
    const t = yc() || qa();
    return !t || e === t;
  }
  function Ga() {
    if (!F.subtitleTimelineCacheContext || !F.subtitleTimelineCache.length)
      return;
    const e = yc() || "";
    e && e !== F.subtitleTimelineCacheContext && Ka();
  }
  function Ha(e) {
    const t = Aa(e);
    return `${null === t ? "na" : Math.round(10 * t) / 10}\n${Xn(e)}`;
  }
  function Fa(e) {
    const t = Aa(e);
    return `${null === t ? "na" : Math.round(10 * t) / 10}\n${ku(e.original)}`;
  }
  function za(e = F.subtitleTimelineCache) {
    let t = 0;
    for (const n of e || [])
      ((t += Array.from(ku(n.original)).length),
        (t += Array.from(ku(n.translation)).length),
        (t += 180));
    return Math.max(0, Math.round(2 * t));
  }
  function Ka() {
    ((F.subtitleTimelineCache = []),
      (F.subtitleTimelineCacheContext = ""),
      (F.subtitleTimelineCacheBytes = 0),
      F.sync && (F.sync.completedSubtitleRanges = []),
      xo(),
      Ba());
  }
  function ja() {
    const e = F.subtitleTimelineCache || [],
      t = e[0] || null,
      n = e[e.length - 1] || null,
      a = (function (e = F.subtitleTimelineCache, t = 8) {
        const n = Da(e || []),
          a = [];
        let i = null;
        return (
          n.forEach((e, s) => {
            const r = Aa(e);
            if (null === r) return;
            const o = Zc(e, Aa(n[s + 1])) ?? r;
            if (!i || r - i.end > t)
              return ((i = { start: r, end: o, segments: 1 }), void a.push(i));
            ((i.end = Math.max(i.end, o)), (i.segments += 1));
          }),
          { rangeCount: a.length, ranges: a.slice(0, 20) }
        );
      })(e);
    return {
      segments: e.length,
      bytes: F.subtitleTimelineCacheBytes || za(e),
      context: F.subtitleTimelineCacheContext || "",
      firstMediaTime: Aa(t),
      lastMediaTime: Ca(n) ?? Aa(n),
      rangeCount: a.rangeCount,
      ranges: a.ranges,
      maxSegments: 24e3,
    };
  }
  function Qa(e, t) {
    chrome.runtime
      .sendMessage(e)
      .then((e) => {
        if (!0 !== e?.ok)
          throw new Error(
            e?.error || "display notification was not acknowledged",
          );
      })
      .catch(() => {
        const n = p[Math.min(t, p.length - 1)];
        n &&
          window.setTimeout(() => {
            F.sessionId === e.sessionId && Qa(e, t + 1);
          }, n);
      });
  }
  function Ja(e, t = {}, n = "info") {
    F.sessionId &&
      chrome.runtime
        .sendMessage({
          type: "LIVE_SUBTITLE_CLIENT_EVENT_LOG",
          sessionId: F.sessionId,
          event: {
            type: e,
            level: n,
            source: "content-script",
            clientTimeMs: Date.now(),
            data: t,
          },
        })
        .catch(() => {});
  }
  function Ya(e) {
    return Array.from(ku(e))
      .filter(
        (e) =>
          !/[\s、。，,.!?！？?…・「」『』（）()[\]{}"'`~\-—_:：;；/\\|]/.test(
            e,
          ),
      )
      .join("");
  }
  function Xa() {
    return !0 === F.config?.showTranscriptWhileTranslating || !F.sync.enabled;
  }
  function Za() {
    return Boolean((F.pendingOriginal || F.draftOriginal) && Xa());
  }
  function ei() {
    if (!ue) return;
    const e = oi(),
      t =
        !F.sync.enabled || F.sync.ready || F.sync.viewerPlaybackBlocked
          ? null
          : ti()
            ? ai()
              ? null
              : Lc()
                ? {
                    original: si("已找到快取字幕", "Cached subtitles found"),
                    translation: si(
                      "正在對齊目前畫面，很快就能開始。",
                      "Aligning subtitles with the current video. Starting shortly.",
                    ),
                  }
                : {
                    original: si("正在努力產生字幕中...", "Loading subtitles…"),
                    translation: ii(),
                  }
            : null,
      n = Boolean(t),
      a =
        "translation" === F.mode
          ? "translation-only"
          : "original" === F.mode
            ? "original-only"
            : "large" === F.mode
              ? "large-mode"
              : "side" === F.mode
                ? "side-mode"
                : "";
    if (
      ((ue.className = [
        "subtitle-window",
        a,
        F.usagePanelOpen ? "usage-open" : "",
        F.settingsPanelOpen ? "settings-open" : "",
        F.locked ? "locked" : "",
        F.collapsed ? "collapsed" : "",
        F.opacity <= 0.02 ? "transparent-mode" : "",
        F.subtitleFading && !n ? "subtitle-fading" : "",
        e && !n ? "subtitle-empty" : "",
      ]
        .filter(Boolean)
        .join(" ")),
      (me.status.textContent = (function () {
        if (!F.sync.enabled) return F.status;
        if (ai()) return F.status;
        const e = F.sync.status || "同步準備中";
        return `${F.status} · ${e}`;
      })()),
      me.quota &&
        ((me.quota.textContent = Kc(F.usage)),
        (me.quota.title = jc(F.usage)),
        me.quota.setAttribute("aria-expanded", String(F.usagePanelOpen)),
        me.quota.classList.toggle("active", Boolean(F.usage?.creditsUsed))),
      Qc(F.usage),
      (function () {
        if (me.settingsControls?.length) {
          for (const e of me.settingsControls) {
            const t = e.dataset.settings;
            if (t)
              switch (t) {
                case "mode":
                  e.value = or(F.mode, "dual");
                  break;
                case "fontSize":
                  e.value = String(lr(F.fontSize));
                  break;
                case "fontFamily":
                  e.value = dr(F.fontFamily);
                  break;
                case "equalBilingualFontSize":
                  e.checked = Boolean(F.equalBilingualFontSize);
                  break;
                case "opacity":
                  e.value = String(rr(F.opacity));
                  break;
                case "originalColor":
                  e.value = ur(F.originalColor, "#d8e2f2");
                  break;
                case "translationColor":
                  e.value = ur(F.translationColor, "#ffffff");
              }
          }
          if (me.settingsValues?.length)
            for (const e of me.settingsValues) {
              const t = e.dataset.settingsValue;
              "fontSize" === t
                ? (e.textContent = `${lr(F.fontSize)} px`)
                : "opacity" === t
                  ? (e.textContent = `${Math.round(100 * rr(F.opacity))}%`)
                  : "originalColor" === t
                    ? (e.textContent = ur(F.originalColor, "#d8e2f2"))
                    : "translationColor" === t &&
                      (e.textContent = ur(F.translationColor, "#ffffff"));
            }
          (me.settingsToggleButton &&
            (me.settingsToggleButton.setAttribute(
              "aria-expanded",
              String(Boolean(F.settingsPanelOpen)),
            ),
            me.settingsToggleButton.classList.toggle(
              "toggle-active",
              Boolean(F.settingsPanelOpen),
            )),
            me.fontPreview &&
              (me.fontPreview.style.fontFamily = cr(F.fontFamily)));
        }
      })(),
      qi(),
      Ki(),
      ji(),
      me.modeButton && (me.modeButton.textContent = o[F.mode] || o.dual),
      me.collapseButton)
    ) {
      me.collapseButton.textContent = F.collapsed ? "+" : "-";
      const e = F.collapsed ? "展開字幕匡" : "縮小字幕匡";
      ((me.collapseButton.title = e),
        me.collapseButton.setAttribute("aria-label", e));
    }
    if (
      (me.fontSizeDisplay &&
        (me.fontSizeDisplay.textContent = String(lr(F.fontSize))),
      me.transparentButton)
    ) {
      const e = F.opacity <= 0.02;
      (me.transparentButton.classList.toggle("toggle-active", e),
        me.transparentButton.setAttribute("aria-pressed", String(e)),
        (me.transparentButton.title = e
          ? "關閉透明模式"
          : "透明模式：滑鼠移開只留字幕"));
    }
    (ue.style.setProperty("--subtitle-opacity", String(F.opacity)),
      ue.style.setProperty("--subtitle-font-size", `${F.fontSize}px`),
      ue.style.setProperty("--subtitle-font-family", cr(F.fontFamily)),
      ue.style.setProperty(
        "--subtitle-original-scale",
        F.equalBilingualFontSize ? "1" : "0.62",
      ),
      ue.style.setProperty(
        "--subtitle-original-single-scale",
        F.equalBilingualFontSize ? "0.86" : "0.5",
      ),
      ue.style.setProperty(
        "--subtitle-original-large-scale",
        F.equalBilingualFontSize ? "0.7" : "0.46",
      ),
      ue.style.setProperty("--subtitle-original-color", F.originalColor),
      ue.style.setProperty("--subtitle-translation-color", F.translationColor),
      (function () {
        if (F.collapsed) {
          const e = "280px",
            t = "30px";
          if ("bottom" === F.positionMode)
            Object.assign(de.style, {
              bottom: "36px",
              height: "",
              left: "calc(50vw - 140px)",
              position: "fixed",
              top: "auto",
              width: e,
            });
          else {
            const t = li(280, 30);
            Object.assign(de.style, {
              bottom: "auto",
              left: `${t.left}px`,
              position: "fixed",
              top: `${t.top}px`,
              width: e,
            });
          }
          return ((ue.style.height = t), void (ue.style.width = e));
        }
        if ("side" === F.mode && "floating" !== F.positionMode) {
          const e = (function () {
            const e = 12,
              t = Math.max(320, window.innerWidth || 0),
              n = Math.max(360, window.innerHeight || 0),
              a = Cu(
                F.layout.width > 520 || F.layout.width < w
                  ? 380
                  : F.layout.width,
                w,
                Math.min(520, Math.max(w, t - 24)),
              ),
              i = Math.max(T, n - 64 - e);
            let s = 64,
              r = Cu(
                F.layout.height < T ? i : F.layout.height,
                T,
                Math.max(T, n - 24),
              ),
              o = t - a - e;
            const l = (function () {
              const e = Array.from(
                document.querySelectorAll("video.html5-main-video, video"),
              );
              for (const t of e) {
                if ("function" != typeof t.getBoundingClientRect) continue;
                const e = t.getBoundingClientRect();
                if (!(!e || e.width < 160 || e.height < 120)) return e;
              }
              return null;
            })();
            return (
              l &&
                ((s = Cu(l.top, e, Math.max(e, n - T - e))),
                (r = Cu(
                  Math.max(l.height, F.layout.height < T ? 0 : F.layout.height),
                  T,
                  Math.max(T, n - s - e),
                )),
                (o =
                  l.right + 12 + a <= t - e
                    ? l.right + 12
                    : l.left - 12 - a >= e
                      ? l.left - 12 - a
                      : t - a - e)),
              {
                left: Math.round(Cu(o, e, Math.max(e, t - a - e))),
                top: Math.round(s),
                width: Math.round(a),
                height: Math.round(r),
              }
            );
          })();
          (Object.assign(de.style, {
            bottom: "auto",
            height: "",
            left: `${e.left}px`,
            position: "fixed",
            top: `${e.top}px`,
            width: `${e.width}px`,
          }),
            (ue.style.height = `${e.height}px`),
            (ue.style.width = `${e.width}px`));
        } else if ("bottom" === F.positionMode) {
          const e = "large" === F.mode ? "86vw" : "70vw",
            t = "large" === F.mode ? "7vw" : "15vw",
            n =
              "large" === F.mode
                ? `${Cu(Math.max(F.layout.height, 260), 220, Math.max(260, 0.55 * window.innerHeight))}px`
                : `${F.layout.height}px`;
          (Object.assign(de.style, {
            bottom: "36px",
            height: "",
            left: t,
            position: "fixed",
            top: "auto",
            width: e,
          }),
            (ue.style.height = n),
            (ue.style.width = e));
        } else {
          const { width: e, height: t } = di(),
            n = li(e, t);
          (Object.assign(de.style, {
            bottom: "auto",
            left: `${n.left}px`,
            position: "fixed",
            top: `${n.top}px`,
            width: `${e}px`,
          }),
            (ue.style.height = `${t}px`),
            (ue.style.width = `${e}px`));
        }
      })());
    const i = (function (e = oi()) {
        const t = !e && Boolean(F.currentOriginal && F.currentTranslation),
          n = Xa();
        return {
          original: e
            ? ""
            : t
              ? F.currentOriginal
              : (n && F.pendingOriginal) || "",
          translation: e ? "" : t ? F.currentTranslation : "",
        };
      })(!n && e),
      s = n ? t.original : i.original,
      r = n ? t.translation : i.translation,
      l =
        !n &&
        (e ||
          (function (e, t) {
            return (
              !(!F.sync.enabled || e || t) &&
              !F.sync.viewerPlaybackBlocked &&
              (!F.subtitleHadContent ||
                !(
                  F.currentOriginal ||
                  F.currentTranslation ||
                  F.largeSegmentHistory.length ||
                  Pn()
                ))
            );
          })(s, r)),
      d = l ? "" : _c(s, "original") || Ti(),
      c = l ? "" : _c(r, "translation") || ki(Boolean(s));
    ((me.original.textContent = d),
      (me.original.title = s && s !== d ? s : ""),
      (me.translation.textContent = c),
      (me.translation.title = r && r !== c ? r : ""),
      (function (e, t, n = !1) {
        if (!me.subtitleLines) return;
        const a = (function (e, t) {
          const n = (function (e, t) {
              const n = [...F.largeSegmentHistory, F.activeSegment].filter(
                  Boolean,
                ),
                a = n.some((e) => ku(e.translation));
              (t || ((e || t) && !a)) &&
                n.push({
                  id: "current-display",
                  order: n.length,
                  original: e,
                  translation: t || "",
                  segmentationMethod: "current",
                  splitReason: "",
                  isComplete: !1,
                });
              const i = new Map();
              for (const e of n) {
                const t = Xn(e);
                t && i.set(t, e);
              }
              return Da([...i.values()]).slice(-18);
            })(e, t),
            a = (function (e) {
              const t = Math.max(1, Math.min(Math.round(Number(e) || 1), u)),
                n = Math.max(
                  0,
                  Math.min(Math.round(Number(F.visibleLineCapacity) || 0), u),
                );
              if (!n || n === t || 1 !== Math.abs(n - t)) return t;
              const a = Ai(),
                i = (function (e, t) {
                  const n = Math.min(e, t),
                    a = Math.max(e, t);
                  return 1 === n && 2 === a ? 560 : 0;
                })(n, t);
              if (i) {
                if (t > n && a < i + 28) return n;
                if (t < n) return a <= i - 28 ? t : n;
              }
              const s = Math.max(n, t),
                r = Pi(s, 1 === s),
                o = Ii();
              if (o) {
                if (t > n && o < r + 18) return n;
                if (t < n && o > r - 18) return n;
              }
              return t;
            })(Ci());
          return (
            Ui(a),
            n.length
              ? { segments: Si(n, a), lineCapacity: a }
              : { segments: [], lineCapacity: a }
          );
        })(e, t);
        if (
          ((F.visibleLineCapacity = a.lineCapacity),
          Ui(a.lineCapacity),
          (ue.dataset.visibleLines = String(a.lineCapacity)),
          (ue.dataset.lineMode = 1 === a.lineCapacity ? "single" : "stack"),
          ("large" === F.mode && a.lineCapacity > 1) || "side" === F.mode)
        )
          return void pi();
        if (n)
          return void (Mi()
            ? yi(
                [
                  {
                    id: "transparent-locator",
                    order: 0,
                    original: "",
                    translation: wi(),
                    pending: !0,
                    locator: !0,
                  },
                ],
                "",
                a.lineCapacity,
              )
            : pi());
        const i = F.activeSegment ? Xn(F.activeSegment) : "";
        a.segments.length
          ? yi(a.segments, i, a.lineCapacity)
          : ri()
            ? yi([vi(e)], i, a.lineCapacity)
            : pi();
      })(s, r, l),
      (function (e, t, n = !1) {
        if (!me.largeLines) return;
        if ("large" !== F.mode && "side" !== F.mode) return void _i();
        if ("large" === F.mode && 1 === F.visibleLineCapacity) return void _i();
        if (n)
          return void (Mi()
            ? (function () {
                const e = `large-locator::${wi()}`;
                if (e === F.largeRenderSignature) return;
                me.largeLines.replaceChildren();
                const t = document.createElement("p");
                ((t.className = "large-empty"),
                  (t.textContent = wi()),
                  me.largeLines.appendChild(t),
                  (F.largeRenderSignature = e));
              })()
            : _i());
        const a = (function (e, t) {
          const n = "side" === F.mode ? 18 : 8,
            a = "side" === F.mode ? n : 2,
            i = "side" === F.mode ? n : 8,
            s = [
              ...F.largeSegmentHistory.slice(-a),
              F.activeSegment,
              ...F.segmentQueue.slice(0, i),
            ].filter(Boolean);
          !s.length &&
            e &&
            t &&
            s.push({
              id: "large-current",
              order: 0,
              original: e,
              translation: t,
              segmentationMethod: "current",
              splitReason: "",
              isComplete: !1,
            });
          const r = new Map();
          for (const e of s) {
            const t = Xn(e);
            t && r.set(t, e);
          }
          return Da([...r.values()]).slice(-n);
        })(e, t);
        if (!a.length) {
          if (!ri()) return void _i();
          const t = `large-empty::${ku(e)}`;
          if (t === F.largeRenderSignature) return;
          me.largeLines.replaceChildren();
          const n = document.createElement("p");
          return (
            (n.className = "large-empty"),
            (n.textContent = e ? si("翻譯中...", "Translating…") : Ti()),
            me.largeLines.appendChild(n),
            void (F.largeRenderSignature = t)
          );
        }
        const i = F.activeSegment ? Xn(F.activeSegment) : "",
          s = gi("large", a, i, F.mode);
        if (s !== F.largeRenderSignature) {
          me.largeLines.replaceChildren();
          for (const e of a) {
            const t = document.createElement("section");
            t.className = ["large-line", Xn(e) === i ? "active" : ""]
              .filter(Boolean)
              .join(" ");
            const n = document.createElement("p");
            ((n.className = "large-original"), (n.textContent = e.original));
            const a = document.createElement("p");
            ((a.className = "large-translation"),
              (a.textContent = e.translation),
              t.append(n, a),
              me.largeLines.appendChild(t));
          }
          F.largeRenderSignature = s;
        }
      })(s, r, l),
      ue.classList.toggle("single-line-mode", 1 === F.visibleLineCapacity),
      ue.classList.toggle("subtitle-empty", l),
      ue.classList.toggle("startup-quiet", l && ai()),
      ue.classList.toggle("subtitle-fading", F.subtitleFading && !n),
      (function (e = !1) {
        if (!F.sessionId) return;
        const t = Date.now();
        if (!e && t - Mu < 2e3) return;
        const n = (function () {
          const e =
            me.translation?.clientWidth ||
            (ue?.clientWidth ? Math.max(0, ue.clientWidth - 24) : 0) ||
            F.layout.width ||
            720;
          if (!e || e < 80) return null;
          const t = lr(F.fontSize),
            n = (function (e, t) {
              try {
                Tu || (Tu = document.createElement("canvas"));
                const n = Tu.getContext("2d");
                if (!n) return null;
                n.font = `${e}px ${t}`;
                const a = "每天都要努力學習字幕顯示寬度測量",
                  i = "The quick brown fox jumps over the lazy dog",
                  s = n.measureText(a).width / Array.from(a).length,
                  r = n.measureText(i).width / i.length;
                return !Number.isFinite(s) || s <= 0
                  ? null
                  : {
                      wide: s,
                      narrow: Number.isFinite(r) && r > 0 ? r : 0.5 * s,
                    };
              } catch {
                return null;
              }
            })(t, cr(F.fontFamily)),
            a = n?.wide || t,
            i = n ? Cu(n.narrow / n.wide, 0.3, 1) : 0.5;
          return {
            unitsPerLine: Math.max(6, Math.floor(e / a)),
            narrowCharWeight: Math.round(100 * i) / 100,
            rowsPerSegment: 1 === F.visibleLineCapacity ? 1 : 2,
            originalFontScale: F.equalBilingualFontSize ? 1 : 0.62,
            widthPx: Math.round(e),
            fontSizePx: t,
          };
        })();
        if (!n) return;
        const a = [
          n.unitsPerLine,
          n.rowsPerSegment,
          Math.round(100 * n.narrowCharWeight),
          Math.round(100 * n.originalFontScale),
        ].join(":");
        ((Mu = t),
          (e || a !== wu) &&
            ((wu = a),
            chrome.runtime
              .sendMessage({
                type: "LIVE_SUBTITLE_DISPLAY_METRICS",
                sessionId: F.sessionId,
                metrics: n,
              })
              .catch(() => {})));
      })());
  }
  function ti() {
    if (!F.sync.enabled) return !1;
    const e = ku(F.sync.status || "");
    return Boolean(
      F.sync.delayBuffering ||
        /建立.*延遲|產生字幕|字幕準備|同步聲音|同步音訊/.test(e),
    );
  }
  function ni() {
    const e = F.sync.singleTabMseStartupGate,
      t = e?.active ? vu(e.startedAtMs) : null,
      n = null !== t && t > 0,
      a = n ? vu(e.countdownTargetSeconds || e.requiredLeadSeconds) : null,
      i =
        (null !== a && a > 0 ? a : null) ??
        vu(F.sync.delayBuildTargetSeconds) ??
        vu(F.sync.targetDelaySeconds) ??
        vu(F.sync.fixedDelaySeconds),
      s = n
        ? Math.max(0, (Date.now() - t) / 1e3)
        : (vu(F.sync.delayBuildProgressSeconds) ??
          vu(F.sync.actualDelaySeconds) ??
          0);
    return {
      target: i,
      progress: i > 0 ? Cu(s, 0, i) : s,
      complete: i > 0 && s >= i,
    };
  }
  function ai() {
    return Boolean(
      F.sync.enabled && !F.sync.viewerPlaybackBlocked && ti() && ni().complete,
    );
  }
  function ii() {
    const { target: e, progress: t, complete: n } = ni();
    return n
      ? ""
      : null === e || e <= 0
        ? si(
            "麻煩稍等一下，我們正在同步聲音與字幕。",
            "Please wait while we synchronize the audio and subtitles.",
          )
        : si(
            `麻煩稍等一下，我們正在同步聲音與字幕 · ${Pc(t)} / ${Pc(e)}`,
            `Synchronizing audio and subtitles · ${Pc(t)} / ${Pc(e)}`,
          );
  }
  function si(e, t) {
    const n = String(F.config?.uiLocale || "")
      .trim()
      .toLowerCase()
      .replace(/_/g, "-");
    return "en" === n || n.startsWith("en-") ? t : e;
  }
  function ri() {
    if (F.sync.enabled && F.sync.viewerPlaybackBlocked) return !0;
    if (ai()) return !1;
    if (ti()) return !0;
    const e = Yd();
    return !!e && Boolean(e.paused);
  }
  function oi() {
    return (
      ("side" !== F.mode || !F.largeSegmentHistory.length) &&
      !F.sync.viewerPlaybackBlocked &&
      (!!F.subtitleWaitExpired ||
        ((!F.subtitleDisplayBlank || !Jn()) &&
          Boolean(
            F.subtitleDisplayBlank &&
              !Za() &&
              !F.activeSegment &&
              0 === F.segmentQueue.length,
          )))
    );
  }
  function li(e, t, n = 8) {
    const a = Math.max(320, window.innerWidth || 0),
      i = Math.max(360, window.innerHeight || 0),
      s = Math.max(80, Number(e) || 220),
      r = Math.max(48, Number(t) || M),
      o = Math.max(n, a - s - n),
      l = Math.max(n, i - r - n),
      d = Math.round(Cu(0.12 * a, n, o)),
      c = Math.round(Cu(0.62 * i, n, l)),
      u = vu(F.layout.left) ?? d,
      m = vu(F.layout.top) ?? c,
      y = Math.round(Cu(u, n, o)),
      p = Math.round(Cu(m, n, l));
    return ((F.layout.left = y), (F.layout.top = p), { left: y, top: p });
  }
  function di() {
    const e = "side" === F.mode ? w : 220,
      t = "side" === F.mode ? T : M,
      n = Math.max(e, window.innerWidth - 20),
      a =
        "side" === F.mode
          ? Math.max(t, window.innerHeight - 20)
          : Math.max(t, 0.75 * window.innerHeight);
    return {
      width: Cu(F.layout.width, e, n),
      height: Cu(F.layout.height, t, a),
    };
  }
  function ci() {
    if (F.collapsed || "large" === F.mode || "side" === F.mode) return;
    const e = Pi(1, !0) + 4,
      t = Math.max(M, 0.75 * window.innerHeight),
      n = Cu(e, M, t);
    F.layout.height < n && (F.layout.height = n);
  }
  function ui() {
    if (!me.interactionPanel) return;
    const e = F.interactionPanelManualPosition
      ? mi(F.interactionPanelLayout)
      : (function (
          e = (function () {
            const e = [
              "ytd-live-chat-frame",
              "#chat",
              "#chat-container",
              "iframe[src*='youtube.com/live_chat']",
              "[data-test-selector='chat-room-component-layout']",
              "[data-a-target='right-column-chat-bar']",
              "[data-a-target='chat-scroller']",
              ".chat-room",
            ];
            for (const t of e)
              for (const e of document.querySelectorAll(t)) {
                if (!e || "function" != typeof e.getBoundingClientRect)
                  continue;
                if (!xc(e)) continue;
                const t = e.getBoundingClientRect();
                if (!(!t || t.width < 160 || t.height < 160)) return t;
              }
            return null;
          })(),
        ) {
          const t = Math.max(320, window.innerWidth || 0),
            n = Math.max(360, window.innerHeight || 0),
            a = Math.min(560, t - 16),
            i = Math.min(720, n - 16),
            s = e && Number(e.width) > 160 && Number(e.height) > 160 ? e : null,
            r = Cu(s ? Math.round(s.width - 16) : 420, 320, a),
            o = Cu(
              s
                ? Math.min(
                    Math.round(0.58 * s.height),
                    Math.round(s.height - 88),
                    f,
                  )
                : f,
              300,
              i,
            ),
            l = Cu(
              s ? Math.round(s.left + s.width - r - 8) : t - r - 16,
              8,
              Math.max(8, t - r - 8),
            ),
            d = Cu(s ? Math.round(s.top + 8) : 72, 8, Math.max(8, n - o - 8));
          return {
            left: Math.round(l),
            top: Math.round(d),
            width: Math.round(r),
            height: Math.round(o),
          };
        })();
    (Object.assign(me.interactionPanel.style, {
      bottom: "auto",
      height: `${e.height}px`,
      left: `${e.left}px`,
      top: `${e.top}px`,
      width: `${e.width}px`,
    }),
      F.interactionPanelManualPosition && (F.interactionPanelLayout = e));
  }
  function mi(e = {}) {
    const t = Math.max(320, window.innerWidth || 0),
      n = Math.max(360, window.innerHeight || 0),
      a = Cu(Math.round(Number(e.width) || 420), 320, Math.min(560, t - 16)),
      i = Cu(Math.round(Number(e.height) || f), 300, Math.min(720, n - 16));
    return {
      left: Math.round(Cu(Number(e.left) || 8, 8, Math.max(8, t - a - 8))),
      top: Math.round(Cu(Number(e.top) || 8, 8, Math.max(8, n - i - 8))),
      width: a,
      height: i,
    };
  }
  function yi(e, t, n) {
    const a = gi("normal", e, t, n);
    if (a !== F.subtitleRenderSignature) {
      me.subtitleLines.replaceChildren();
      for (const n of e) bi(me.subtitleLines, n, t);
      ((F.subtitleRenderSignature = a), fi(me.subtitleLines));
    } else fi(me.subtitleLines);
  }
  function pi() {
    (F.subtitleRenderSignature || me.subtitleLines?.children?.length) &&
      (me.subtitleLines.replaceChildren(), (F.subtitleRenderSignature = ""));
  }
  function gi(e, t, n, a) {
    const i = (t || [])
      .map((e) =>
        [Xn(e), e.pending ? "pending" : "", Xn(e) === n ? "active" : ""].join(
          "~",
        ),
      )
      .join("|");
    return [e, a, n, i].join("::");
  }
  function fi(e) {
    if (!e) return;
    const t = () => {
      const t = Math.max(0, (e.scrollHeight || 0) - (e.clientHeight || 0));
      e.scrollTop = t;
    };
    (t(),
      "function" == typeof window.requestAnimationFrame &&
        window.requestAnimationFrame(t));
  }
  function Si(e, t = Ci()) {
    if (!e.length) return [];
    const n = Math.max(1, Math.min(t, e.length)),
      a = e.slice(-n),
      i = xi(1 === t);
    if (!i || !me.measure) return a;
    let s = a;
    for (; s.length > 1 && hi(s, 1 === t) > i; ) s = s.slice(1);
    return s;
  }
  function hi(e, t = !1) {
    if (!me.measure) return 0;
    const n = Ai();
    ((me.measure.style.width = `${n}px`),
      me.measure.classList.toggle("measure-single-line", Boolean(t)),
      me.measure.classList.toggle("measure-stack", !t),
      me.measure.replaceChildren());
    const a = document.createElement("div");
    a.className = "subtitle-lines";
    const i = F.activeSegment ? Xn(F.activeSegment) : "";
    for (const t of e) bi(a, t, i);
    return (me.measure.appendChild(a), a.scrollHeight);
  }
  function bi(e, t, n) {
    const a = document.createElement("section");
    a.className = [
      "subtitle-line",
      Xn(t) === n ? "active" : "",
      t.pending ? "pending" : "",
      t.locator ? "locator" : "",
    ]
      .filter(Boolean)
      .join(" ");
    const i = document.createElement("p");
    ((i.className = "subtitle-line-original"),
      (i.textContent = t.original || ""));
    const s = document.createElement("p");
    ((s.className = "subtitle-line-translation"),
      (s.textContent =
        t.translation ||
        (t.original
          ? si("翻譯中...", "Translating…")
          : si("翻譯會顯示在這裡", "Translations will appear here"))),
      a.append(i, s),
      e.appendChild(a));
  }
  function vi(e) {
    const t = ku(e);
    return {
      id: "empty-display",
      order: 0,
      original: t || Ti(),
      translation: t ? si("翻譯中...", "Translating…") : ki(!1),
      pending: !0,
    };
  }
  function Mi() {
    return F.opacity <= 0.02 && !F.collapsed && ri();
  }
  function wi() {
    return F.sync.enabled && F.sync.viewerPlaybackBlocked
      ? si(
          "透明模式 · 請點影片播放",
          "Transparent mode · Click the video to play",
        )
      : F.sync.enabled && F.sync.delayBuffering
        ? si("透明模式 · 字幕準備中", "Transparent mode · Loading subtitles")
        : si("透明模式 · 等待字幕", "Transparent mode · Waiting for subtitles");
  }
  function Ti() {
    return ri()
      ? F.sync.enabled && F.sync.viewerPlaybackBlocked
        ? si("請點影片播放", "Click the video to play")
        : F.sync.enabled && F.sync.delayBuffering
          ? si("正在努力產生字幕中...", "Loading subtitles…")
          : si("等待語音...", "Waiting for speech…")
      : "";
  }
  function ki(e = !1) {
    return e
      ? si("翻譯中...", "Translating…")
      : ri()
        ? F.sync.enabled && F.sync.viewerPlaybackBlocked
          ? si(
              "已暫停來源端，播放後會繼續同步字幕",
              "The source is paused. Subtitle sync will continue after playback resumes.",
            )
          : F.sync.enabled && F.sync.delayBuffering
            ? si(
                "麻煩稍等一下，我們正在同步聲音與字幕。",
                "Please wait while we synchronize the audio and subtitles.",
              )
            : si("翻譯會顯示在這裡", "Translations will appear here")
        : "";
  }
  function xi(e = 1 === F.visibleLineCapacity) {
    const t = Ii();
    if (t) return Math.max(0, t - 30 - Ei(Boolean(e)));
    if (!me.collapseBody)
      return Math.max(0, (F.layout.height || 0) - 30 - Ei(Boolean(e)));
    const n = window.getComputedStyle(me.collapseBody),
      a = Number.parseFloat(n.paddingTop) || 0,
      i = Number.parseFloat(n.paddingBottom) || 0;
    return Math.max(0, me.collapseBody.clientHeight - a - i);
  }
  function Ai() {
    if (!me.collapseBody) return F.layout.width;
    const e = window.getComputedStyle(me.collapseBody),
      t = Number.parseFloat(e.paddingLeft) || 0,
      n = Number.parseFloat(e.paddingRight) || 0;
    return Math.max(120, me.collapseBody.clientWidth - t - n);
  }
  function Ci() {
    const e = Di(!1),
      t = Ri(Ai(), e),
      n = Di(1 === t);
    return Math.max(1, Math.min(t, n, u));
  }
  function Ri(e = Ai(), t = null) {
    const n = vu(e) ?? Ai(),
      a = vu(t) ?? Di(!1),
      i = Math.max(2, a);
    return n <= 560 && i <= 2
      ? 1
      : n <= 820 && i <= 2
        ? 2
        : Math.max(1, Math.min(i, u));
  }
  function Di(e = !1) {
    const t = xi(e);
    return t ? Li(t, e) : 1;
  }
  function Li(e, t = !1) {
    const { segmentHeight: n, segmentGap: a } = Bi(t);
    return Math.max(1, Math.floor((e + a) / Math.max(14, n + a)));
  }
  function Bi(e = !1) {
    const t = 1.28 * F.fontSize,
      n = F.fontSize * (F.equalBilingualFontSize ? 1 : 0.62) * 1.28,
      a = 0.86 * F.fontSize * 1.14 * 2,
      i = F.fontSize * (F.equalBilingualFontSize ? 0.86 : 0.5) * 1.1 * 1;
    return {
      segmentHeight: e
        ? "original" === F.mode
          ? i
          : "translation" === F.mode
            ? a
            : i + 1 + a
        : "original" === F.mode
          ? n
          : "translation" === F.mode
            ? t
            : n + 3 + t,
      segmentGap: 6,
    };
  }
  function Ei(e = !1) {
    return e ? 6 : 10;
  }
  function Pi(e, t = !1) {
    const n = Math.max(1, Math.min(Math.round(Number(e) || 1), u)),
      a = Math.max(30, Number(me.toolbar?.clientHeight) || 0),
      { segmentHeight: i, segmentGap: s } = Bi(t),
      r = n * i + Math.max(0, n - 1) * s;
    return Math.ceil(a + Ei(t) + r);
  }
  function Ii() {
    const e = vu(F.layout?.height),
      t = vu(ue?.clientHeight);
    return e ? Math.max(0, e) : Math.max(0, t || 0);
  }
  function Ui(e) {
    ue && ue.classList.toggle("single-line-mode", 1 === Number(e));
  }
  function _i() {
    (F.largeRenderSignature || me.largeLines?.children?.length) &&
      (me.largeLines.replaceChildren(), (F.largeRenderSignature = ""));
  }
  function qi() {
    if (me.replyPanel) {
      if (
        (me.replyPanel.classList.toggle("open", F.replyPanelOpen),
        me.replyPanel.classList.toggle("busy", F.replyBusy),
        me.replyPanel.classList.toggle("error", Boolean(F.replyError)),
        me.replyInlineButton &&
          ((me.replyInlineButton.hidden = F.replyPanelOpen),
          me.replyInlineButton.setAttribute(
            "aria-expanded",
            String(F.replyPanelOpen),
          )),
        me.replyInput &&
          me.replyInput.value !== F.replyText &&
          ce?.activeElement !== me.replyInput &&
          (me.replyInput.value = F.replyText),
        me.replyOutput &&
          (me.replyOutput.textContent =
            F.replyTranslation || "翻譯結果會顯示在這裡"),
        me.replyStatus &&
          (me.replyStatus.textContent =
            F.replyStatus || "輸入文字後翻譯成創作者語言"),
        me.replyTarget)
      ) {
        const e = Vi();
        me.replyTarget.textContent = `目標語言：${Wi(e)} (${e})`;
      }
      (me.replyTranslateButton &&
        ((me.replyTranslateButton.disabled = F.replyBusy || !ku(F.replyText)),
        (me.replyTranslateButton.textContent = F.replyBusy
          ? "翻譯中"
          : "翻譯")),
        me.replyCopyButton &&
          (me.replyCopyButton.disabled =
            F.replyBusy || !ku(F.replyTranslation)),
        me.replySendButton &&
          ((me.replySendButton.disabled =
            isChatReplay() ||
            F.replyBusy ||
            F.replySending ||
            !ku(F.replyText) ||
            (F.replyLastSentSession === F.sessionId &&
              F.replyLastSentText === F.replyText)),
          (me.replySendButton.title = isChatReplay() ? "聊天重播無法送出留言。" : "翻譯並送出"),
          (me.replySendButton.textContent = F.replySending
            ? "處理中…"
            : "翻譯並送出")),
        F.replySending &&
          (me.replyTranslateButton && (me.replyTranslateButton.disabled = !0),
          me.replyCopyButton && (me.replyCopyButton.disabled = !0)),
        me.replyInput && (me.replyInput.readOnly = Boolean(F.replySending)));
    }
  }
  async function Oi() {
    const e = {
      text: ku(F.replyText),
      sourceLang: $i(F.config?.targetLang || "zh", "zh", {
        keepTraditionalChinese: !0,
      }),
      targetLang: Vi(),
      mode: "reply",
      provider: hs(),
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
    ((F.replyBusy = !0),
      (F.replyError = ""),
      (F.replyStatus = `翻譯成 ${Wi(e.targetLang)} 中...`),
      qi());
    const t = await vs(e, { purpose: "reply" });
    Ms(t, { purpose: "reply" });
    const n = Ss(t);
    if (!n) throw new Error("翻譯結果為空，請稍後再試。");
    return (
      (F.replyTranslation = n),
      (F.replyStatus = `已翻譯成 ${Wi(e.targetLang)}，可複製到聊天室。`),
      (F.replyBusy = !1),
      (F.replyError = ""),
      qi(),
      n
    );
  }
  function Vi() {
    const configured = $i(F.config?.sourceLang || "", "", { keepAuto: !0 });
    if (configured && configured !== "auto") return configured;
    const detected = $i(F.lastDetectedSourceLang || "", "", { keepAuto: !0 });
    return detected && detected !== "auto" ? detected : "auto";
  }
  function $i(e, t = "", n = {}) {
    const a = String(e || "")
      .toLowerCase()
      .trim();
    return a
      ? n.keepAuto && "auto" === a
        ? "auto"
        : n.keepTraditionalChinese &&
            ["zh", "zh-hant", "zh-tw", "traditional-chinese"].includes(a)
          ? "zh"
          : ["zh-hant", "zh-tw", "traditional-chinese"].includes(a)
            ? "zho"
            : l[a] || a || t
      : t;
  }
  function Wi(e) {
    return d[e] || e || "-";
  }
  function Ni(e) {
    const t = String(e || "")
      .trim()
      .replace(/\/+$/, "");
    if (!t) throw new Error("後端 URL 未設定。");
    return t.startsWith("http://") || t.startsWith("https://")
      ? t
      : `https://${t}`;
  }
  async function Gi() {
    throw new Error("舊版遠端服務已停用，翻譯請求由背景服務處理。");
  }
  function Fi(e, t, n = null) {
    let a = !1,
      i = null;
    return new Promise((s) => {
      ((i = setTimeout(() => {
        ((a = !0), s(n));
      }, t)),
        Promise.resolve(e)
          .then((e) => {
            a || s(e);
          })
          .catch(() => {
            a || s(n);
          })
          .finally(() => {
            i && clearTimeout(i);
          }));
    });
  }
  async function zi(e, t = {}, n = 15e3) {
    const a = new AbortController(),
      i = setTimeout(() => a.abort(), n);
    try {
      const n = await fetch(e, { ...t, signal: a.signal }),
        i = await n.json().catch(() => ({}));
      if (!n.ok) {
        const e = new Error(i.error || `後端請求失敗 ${n.status}`);
        throw ((e.status = n.status), (e.response = i), e);
      }
      return i;
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
      clearTimeout(i);
    }
  }
  function chatSourceLanguage() {
    const raw=F.chatSourceLanguage===null ? F.config?.sourceLang : F.chatSourceLanguage;
    const value=String(raw||'').trim().toLowerCase();
    return ({en:'en',eng:'en',ja:'ja',jpn:'ja',ko:'ko',kor:'ko',th:'th',tha:'th',zh:'zh-TW',zho:'zh-TW',cmn:'zh-TW','zh-tw':'zh-TW','zh-hant':'zh-TW'})[value]||'';
  }
  function changeChatSourceLanguage() {
    F.chatSourceLanguage=me.chatSourceLanguage?.value||'';
    resetChatForLanguageChange();
  }
  function resetChatForLanguageChange() {
    J?.cancel(); Z+=1; ds(); cs(); oe.length=0; se.clear(); re.clear();
    F.chatItems=[]; ee=false; te=false; ae='';
    F.chatError='';
    F.chatStatus=chatSourceLanguage() ? '等待聊天室新留言...' : '請先選擇留言原文語言，才能開始翻譯。';
    Ki(); ji();
  }
  function youtubeChatPresence() {
    if(!ac()) return {available:false,replay:false};
    const visible=node=>{
      if(!node?.isConnected) return false;
      const rect=node.getBoundingClientRect();
      if(rect.width<=0||rect.height<=0||!node.getClientRects().length) return false;
      for(let ancestor=node;ancestor;ancestor=ancestor.parentElement) {
        if(ancestor.hidden||ancestor.hasAttribute('collapsed')||ancestor.getAttribute('aria-hidden')==='true') return false;
        const style=ancestor.ownerDocument.defaultView.getComputedStyle(ancestor);
        if(style.display==='none'||['hidden','collapse'].includes(style.visibility)) return false;
      }
      return true;
    };
    // The live-chat iframe may be navigated without exposing a src attribute.
    // Inspect only its visible embedding element; never read its document.
    if(window!==window.top && !visible(window.frameElement)) return {available:false,replay:false};
    const frames=Array.from(document.querySelectorAll('iframe')).filter(visible);
    const urls=[location.href,...frames.map(frame=>frame.getAttribute('src')).filter(Boolean)];
    for(const value of urls) {
      try {
        const url=new URL(value,location.href);
        if((url.hostname==='youtube.com'||url.hostname.endsWith('.youtube.com')) && /^\/live_chat(?:_replay)?\/?$/.test(url.pathname)) return {available:true,replay:url.pathname.includes('_replay')};
      } catch {}
    }
    const embedded=frames.some(frame=>frame.id==='chatframe' && !String(frame.getAttribute('src')||'').trim() && !String(frame.src||'').trim() && visible(frame.closest('ytd-live-chat-frame')));
    return {available:embedded || Array.from(document.querySelectorAll('yt-live-chat-app')).some(visible),replay:false};
  }
  function isChatReplay() {
    const chat=youtubeChatPresence();
    return chat.available && (chat.replay || !Pd()?.isLiveStream);
  }
  function Ki() {
    const e = Ys();
    const language=chatSourceLanguage();
    if(me.chatSourceLanguage) me.chatSourceLanguage.value=language;
    if(e && F.chatPanelOpen && !language) F.chatStatus='請先選擇留言原文語言，才能開始翻譯。';
    (me.chatToggleButton &&
      ((me.chatToggleButton.hidden = !e),
      (me.chatToggleButton.disabled = !e),
      me.chatToggleButton.setAttribute("aria-hidden", String(!e)),
      (me.chatToggleButton.title = e
        ? "直播聊天：留言翻譯與寫回覆"
        : "此頁面沒有可讀取的聊天室")),
      e || ((F.chatPanelOpen = !1), ds()),
      me.chatPanel &&
        (me.chatPanel.classList.toggle("open", e && Qi()),
        me.chatPanel.classList.toggle("error", Boolean(F.chatError)),
        me.chatStatus &&
          (me.chatStatus.textContent = e
            ? `精選翻譯 · ${F.chatStatus || "等待聊天室留言..."}`
            : "此頁面沒有可讀取的聊天室。"),
        Yi(),
        e && language && F.chatPanelOpen && !z && !K && ls()));
  }
  function ji() {
    if (!me.interactionPanel) return;
    const e = Ys(),
      t = Qi();
    (me.interactionPanel.classList.toggle("open", t),
      me.interactionPanel.classList.toggle(
        "chat-enabled",
        e && F.chatPanelOpen,
      ),
      me.interactionPanel.classList.toggle("reply-enabled", F.replyPanelOpen),
      me.interactionPanel.classList.toggle("busy", Boolean(F.replyBusy || ee)),
      me.interactionPanel.classList.toggle(
        "error",
        Boolean(F.replyError || F.chatError),
      ),
      t && ui());
  }
  function Qi() {
    return Boolean(F.replyPanelOpen || F.chatPanelOpen);
  }
  function Ji(e = {}) {
    ((e.openReply || e.focusReply) && (F.replyPanelOpen = !0),
      e.openChat &&
        Ys() &&
        ((F.chatPanelOpen = !0), (F.chatAutoScroll = !0), ls()),
      qi(),
      Ki(),
      ji(),
      e.focusReply && setTimeout(() => me.replyInput?.focus?.(), 0));
  }
  function Yi() {
    if (!me.chatList) return;
    const e = ss(),
      t = e[e.length - 1]?.id || "",
      n = me.chatList.dataset.lastId !== t,
      a = me.chatList.scrollTop,
      i = (function (e = F.chatItems) {
        return e.filter((e) => e && !rs(e)).length;
      })(),
      s = n && (F.chatAutoScroll || es()),
      r =
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
          .join("|") + `|empty-pending:${e.length ? 0 : i}`;
    if (me.chatList.dataset.signature === r)
      return (s && Xi({ force: !0 }), void ts());
    if (
      ((me.chatList.dataset.signature = r),
      (me.chatList.dataset.lastId = t),
      e.length && globalThis.SubruuLiveChat?.reconcileMessageElements)
    )
      return (
        SubruuLiveChat.reconcileMessageElements(me.chatList, e, () => {
          F.chatAutoScroll && Xi({ force: !0 });
        }),
        (F.chatAutoScroll || s) && Xi({ force: !0 }),
        void ts()
      );
    if ((me.chatList.replaceChildren(), !e.length)) {
      const e = document.createElement("div");
      e.className = "live-chat-item pending";
      const t = document.createElement("p");
      return (
        (t.className = "live-chat-translation"),
        (t.textContent =
          !chatSourceLanguage() ? "請先選擇留言原文語言，才能開始翻譯。" : i > 0 ? `翻譯中 ${gu(i)} 則聊天室留言...` : "等待直播聊天室留言..."),
        e.appendChild(t),
        me.chatList.appendChild(e),
        s && Xi({ force: !0 }),
        void ts()
      );
    }
    for (const t of e) {
      if (globalThis.SubruuLiveChat?.createMessageElement) {
        me.chatList.appendChild(
          SubruuLiveChat.createMessageElement(document, t, () => {
            s && Xi({ force: !0 });
          }),
        );
        continue;
      }
      const e = document.createElement("section");
      e.className = ["live-chat-item", "error" === t.status ? "error" : ""]
        .filter(Boolean)
        .join(" ");
      const n = document.createElement("div");
      ((n.className = "live-chat-author"),
        (n.textContent = t.author || "聊天室"),
        (n.title = t.author || ""),
        (n.dir = "auto"));
      const a = document.createElement("p");
      ((a.className = "live-chat-original"),
        globalThis.SubruuLiveChat
          ? SubruuLiveChat.renderParts(a, t.parts, t.text, () =>
              Xi({ force: !0 }),
            )
          : (a.textContent = t.text));
      const i = document.createElement("p");
      ((i.className = "live-chat-translation"),
        (i.textContent = t.translation || "翻譯失敗"),
        e.append(n, a),
        t.imageOnly || e.appendChild(i),
        me.chatList.appendChild(e));
    }
    (s ? Xi({ force: !0 }) : (me.chatList.scrollTop = a), ts());
  }
  function Xi(e = {}) {
    me.chatList &&
      (e.force || F.chatAutoScroll
        ? ((me.chatList.scrollTop = Math.max(
            0,
            me.chatList.scrollHeight - me.chatList.clientHeight,
          )),
          globalThis.SubruuLiveChat?.followBottom(me.chatList),
          (F.chatAutoScroll = !0),
          ts())
        : ts());
  }
  function Zi() {
    ((F.chatAutoScroll = es()), ts());
  }
  function es(e = me.chatList) {
    if (!e) return !0;
    const t = Math.max(0, Number(e.scrollHeight) || 0),
      n = Math.max(0, Number(e.clientHeight) || 0);
    return t <= n + 24 || t - n - Math.max(0, Number(e.scrollTop) || 0) <= 24;
  }
  function ts() {
    if (!me.chatBottomButton) return;
    const e = ss().length > 0,
      t = es();
    ((me.chatBottomButton.hidden = !e || t),
      (me.chatBottomButton.disabled = !e || t),
      me.chatBottomButton.setAttribute(
        "aria-hidden",
        String(me.chatBottomButton.hidden),
      ));
  }
  function ns() {
    return (
      (Q ||= globalThis.SubruuLiveChat?.createTimeline(() => {
        const e = Yd();
        return {
          timeMs:
            e && Number.isFinite(e.currentTime) ? 1e3 * e.currentTime : null,
          playing: Boolean(e && !e.paused && e.readyState >= 2),
          seeking: Boolean(e?.seeking),
          rate: e?.playbackRate || 1,
        };
      })),
      Q
    );
  }
  function as(e) {
    const t = e.timing?.sourceClock;
    if (!t || !Number.isFinite(t.currentTime)) return null;
    const n =
        t.paused &&
        Number.isFinite(t.seekableEndSeconds) &&
        F.sync.sourceTiming?.isLiveStream
          ? t.seekableEndSeconds - (t.liveLagSeconds || 0)
          : t.currentTime,
      a = Zl(n, {
        ...F.sync.sourceTiming,
        ...t,
        currentTime: n,
        liveEdgeSeconds:
          t.seekableEndSeconds ?? F.sync.sourceTiming?.liveEdgeSeconds,
        isLiveStream: t.isLiveStream || F.sync.sourceTiming?.isLiveStream,
      });
    return null === a ? null : 1e3 * a;
  }
  function is() {
    if (F.chatPanelOpen) {
      for (const e of F.chatItems)
        Number.isFinite(e.dueTimeMs) || (e.dueTimeMs = as(e));
      ns()?.sample(F.chatItems);
      for (const e of F.chatItems) e.translationClosed && re.delete(e.key);
      (Yi(), ys());
    }
  }
  function ss(e = F.chatItems) {
    return ns()
      ? Q.display(e, 40)
      : globalThis.SubruuLiveChat?.displayReadyItems
        ? SubruuLiveChat.displayReadyItems(e, 40)
        : e.filter((e) => rs(e)).slice(-40);
  }
  function rs(e = {}) {
    return Number.isFinite(e.dueTimeMs)
      ? Boolean(e.presented || e.translationClosed || "done" === e.status)
      : "error" === e.status ||
          !(!e.imageOnly || "done" !== e.status) ||
          (!!ku(e.translation) &&
            ("done" === e.status || "error" === e.status));
  }
  function os() {
    if (F.chatItems.length <= 160) return;
    const e = ss(),
      t = new Set(e.map((e) => e.id)),
      n = F.chatItems.filter((e) => e && !t.has(e.id) && !e.omitted),
      a = Math.max(0, 160 - e.length),
      i = a ? n.slice(-a) : [],
      s = new Set([...e, ...i].map((e) => e.id)),
      r = F.chatItems.filter((e) => !s.has(e.id));
    if (!r.length) return;
    const o = new Set(r.map((e) => e.id));
    for (const e of r) e?.key && re.delete(e.key);
    for (let e = oe.length - 1; e >= 0; e -= 1)
      o.has(oe[e]?.id) && oe.splice(e, 1);
    F.chatItems = F.chatItems.filter((e) => s.has(e.id));
  }
  function ls() {
    if (!F.chatPanelOpen || !Ys() || !chatSourceLanguage()) return;
    const e = Js();
    (e &&
      e !== Y &&
      (ds({ keepTimer: !0 }),
      (Y = e),
      (z = new MutationObserver(() => us())),
      z.observe(e.body || e.documentElement, { childList: !0, subtree: !0 })),
      K || (K = setInterval(us, 1500)),
      j || (j = setInterval(is, 100)),
      us());
  }
  function ds(e = {}) {
    (!e.keepTimer && j && (clearInterval(j), (j = null)),
      z && (z.disconnect(), (z = null)),
      (Y = null),
      !e.keepTimer && K && (clearInterval(K), (K = null)),
      cs());
  }
  function cs() {
    ie && (clearTimeout(ie), (ie = null));
  }
  async function us() {
    if (!F.chatPanelOpen || !Ys() || !chatSourceLanguage()) return;
    const e = Z,
      t = Js();
    let n =
      !F.sessionId && t
        ? (function (e = document) {
            if (!e?.querySelectorAll) return [];
            const t = Array.from(
                e.querySelectorAll(
                  [
                    "yt-live-chat-text-message-renderer",
                    "yt-live-chat-paid-message-renderer",
                    "yt-live-chat-paid-sticker-renderer",
                    "yt-live-chat-membership-item-renderer",
                  ].join(","),
                ),
              ),
              n = Array.from(
                e.querySelectorAll('[data-a-target="chat-line-message"]'),
              ),
              a = Os(e);
            return [...t.map(_s), ...n.map(qs), ...a.map(Ns)]
              .filter((e) => e.text)
              .slice(-80);
          })(t).slice(-12)
        : [];
    if (!n.length) {
      const t = await (async function () {
        if (te) return [];
        const e = Z;
        te = !0;
        try {
          const t = await Fi(
            chrome.runtime.sendMessage({
              type: "LIVE_CHAT_SCAN_FRAMES",
              sessionId: F.sessionId || "",
              syncPlayback: !0,
              source: "active-session",
              useSourceTab: !0,
            }),
            2500,
            { ok: !1, timeout: !0 },
          );
          return e !== Z
            ? []
            : t?.ok
              ? ((ne = !0 === t.scannedLiveChatFrame),
                (ae = ""),
                Array.isArray(t.messages)
                  ? t.messages
                      .map((e) => ({
                        author: ku(e.author),
                        text: ku(e.text),
                        platform: ku(e.platform),
                        sourceMessageId: ku(e.sourceMessageId),
                        timing: e.timing,
                        authorMeta:
                          globalThis.SubruuLiveChat?.normalizeAuthorMeta(
                            e.authorMeta,
                          ),
                        parts:
                          globalThis.SubruuLiveChat?.normalizeParts(e.parts) ||
                          [],
                      }))
                      .filter((e) => e.text)
                  : [])
              : ((ae =
                  t?.error ||
                  (t?.timeout
                    ? "聊天室讀取較慢，正在重試..."
                    : "聊天室讀取失敗，正在重試...")),
                []);
        } catch {
          return (e === Z && (ae = "聊天室讀取失敗，正在重試..."), []);
        } finally {
          e === Z && (te = !1);
        }
      })();
      if (e !== Z) return;
      t.length && (n = t.slice(-12));
    }
    if (ae && !n.length)
      return ((F.chatStatus = F.chatError || ae), void Ki());
    if (!t && !ne && !n.length)
      return (
        (F.chatStatus = F.chatError || "找不到聊天室，請確認直播聊天室已開啟。"),
        void Ki()
      );
    if (!n.length)
      return (
        (F.chatStatus = F.chatError || "等待聊天室留言..."),
        void Ki()
      );
    let a = 0;
    for (const e of n) ms(e) && (a += 1);
    a &&
      ((F.chatStatus = F.chatError || `已擷取 ${F.chatItems.length} 則留言，翻譯中...`), Ki());
  }
  function ms(e) {
    const t = ku(e.text);
    if (!t) return !1;
    const n = ku(e.author),
      a = ku(e.platform),
      i = ku(e.sourceMessageId),
      s = globalThis.SubruuLiveChat?.normalizeParts(e.parts) || [],
      r = globalThis.SubruuLiveChat?.normalizeAuthorMeta(e.authorMeta),
      o = (function (e = {}) {
        const t = Qs(e.sourceMessageId || e.messageId || "");
        if (t) return `id:${Qs(e.platform || "unknown") || "unknown"}:${t}`;
        const n = Qs(e.author || ""),
          a = Qs(e.text || ""),
          i = (e.parts || [])
            .filter((e) => "image" === e.type)
            .map((e) => e.src)
            .join("|");
        return a ? `${n}:${a}${i ? ":" + i : ""}` : "";
      })({ author: n, text: t, platform: a, sourceMessageId: i, parts: s });
    if (!o) return !1;
    if (se.has(o) || re.has(o)) {
      const e = F.chatItems.find((e) => e.key === o);
      return !(
        !e ||
        !n ||
        (e.author === n &&
          JSON.stringify(e.authorMeta || null) === JSON.stringify(r || null)) ||
        ((e.author = n), r ? (e.authorMeta = r) : delete e.authorMeta, 0)
      );
    }
    (se.add(o), re.add(o));
    const l = {
      id: "chat-" + ++X,
      key: o,
      author: n,
      text: t,
      platform: a,
      sourceMessageId: i,
      timing: e.timing,
      dueTimeMs: as(e),
      ...(r ? { authorMeta: r } : {}),
      ...(s.length ? { parts: s } : {}),
      sessionGeneration: Z,
      translation: "",
      status: "pending",
    };
    return (
      F.chatItems.push(l),
      os(),
      globalThis.SubruuLiveChat?.imageOnlyMessage(s, t)
        ? ((l.imageOnly = !0),
          (l.translation = ""),
          (l.status = "done"),
          re.delete(o),
          !0)
        : (oe.push(l), ys(), !0)
    );
  }
  function ys(e = {}) {
    if (!F.chatPanelOpen || !chatSourceLanguage() || !oe.length || ee) return;
    const t = (function (e = oe, t = {}) {
      return (
        Boolean(t.immediate) ||
        (function (e = oe) {
          return e.reduce((e, t) => e + ps(t), 0);
        })(e) >= 650
      );
    })(oe, e);
    if (ie) {
      if (!t) return;
      (clearTimeout(ie), (ie = null));
    }
    ie = setTimeout(
      () => {
        ((ie = null),
          (async function () {
            if (ee) return;
            ie && (clearTimeout(ie), (ie = null));
            const e = Z;
            ((J ||= SubruuLiveChat.createBatchRunner({
              onSettled: () => ys({ immediate: !0 }),
            })),
              (ee = !0));
            try {
              for (; e === Z && F.chatPanelOpen && oe.length && J.available; ) {
                const t = gs();
                if (!t.length) break;
                await J.run(
                  t,
                  (n) => fs(t, { generation: e, lease: n }),
                  () => e === Z && F.chatPanelOpen,
                );
              }
            } finally {
              e === Z && ((ee = !1), oe.length && ys());
            }
          })());
      },
      t ? 0 : 2e3,
    );
  }
  function ps(e = {}) {
    return Array.from(`${e.author || ""} ${e.text || ""}`).length;
  }
  function gs() {
    if (ns()) {
      const e = Q.take(oe, F.chatItems, ps, 650);
      for (const e of F.chatItems) e.translationClosed && re.delete(e.key);
      return e;
    }
    const e = [];
    let t = 0;
    for (; oe.length && e.length < 12; ) {
      const n = oe.shift();
      if (!n || !F.chatItems.some((e) => e.id === n.id)) {
        n?.key && re.delete(n.key);
        continue;
      }
      const a = ps(n);
      if (e.length && t + a > 650) {
        oe.unshift(n);
        break;
      }
      (e.push(n), (t += a));
    }
    return e;
  }
  async function fs(e = [], t = {}) {
    const n = Number.isFinite(Number(t.generation)) ? Number(t.generation) : Z;
    if (n !== Z) return;
    if(!chatSourceLanguage()) { F.chatStatus='請先選擇留言原文語言，才能開始翻譯。'; Ki(); return; }
    const a = e.filter((e) => e && F.chatItems.some((t) => t.id === e.id));
    if (a.length) {
      for (const e of a) e.status = "translating";
      ((F.chatStatus = `批次翻譯 ${a.length} 則聊天室留言中...`),
        (F.chatError = ""),
        Ki());
      try {
        const e = (function (e = []) {
            const t = e
                .map((e, t) => ({
                  id: String(t + 1),
                  author: ku(e.author || ""),
                  text: ku(e.text || ""),
                }))
                .filter((e) => e.text),
              n = t.reduce((e, t) => e + ps(t), 0);
            return {
              ...((a = JSON.stringify(t)),
              {
                text: ku(a),
                sourceLang: chatSourceLanguage(),
                targetLang: $i(F.config?.targetLang || "zh", "zh", {
                  keepTraditionalChinese: !0,
                }),
                mode: "live-chat",
                provider: hs(),
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
                  "Translate this live chat message for a viewer. Keep names, emoji, memes, and tone. Return only the translated message.",
              }),
              mode: "live-chat-batch",
              maxOriginalChars: 850,
              maxSegments: t.length,
              maxOutputTokens: Math.min(
                800,
                Math.max(240, 160 + 45 * t.length + Math.ceil(0.9 * n)),
              ),
              translationDeadlineMs: 1e4,
              estimatedTranslationLatencyMs: 2200,
              translationStyle:
                'Translate each live chat item independently for a viewer. Input is a JSON array with id, author, text. Return only valid minified JSON array, no markdown, in the same order: [{"id":"1","translation":"translated message"}]. Preserve every id, names, emoji, memes, numbers, and tone. Do not merge, summarize, omit, or answer messages.',
            };
            var a;
          })(a),
          i = await vs(e, {
            purpose: "chat-batch",
            requestIsCurrent: () =>
              !1 !== t.lease?.isCurrent() && a.some((e) => ns()?.eligible(e)),
            onDispatched: () => {
              t.lease && (t.lease.dispatched = !0);
            },
          });
        if (n !== Z) return;
        if (
          (Ms(i, { purpose: "chat-batch", itemCount: a.length }),
          !1 === t.lease?.isCurrent() && !t.lease.dispatched)
        )
          return;
        const s = (function (e, t = []) {
            const n = (function (e) {
              const t = ku(e);
              if (!t) return [];
              const n = (function (e) {
                const t = e
                    .replace(/^```(?:json)?\s*/i, "")
                    .replace(/\s*```$/i, "")
                    .trim(),
                  n = t.indexOf("["),
                  a = t.lastIndexOf("]");
                return n < 0 || a <= n ? "" : t.slice(n, a + 1);
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
                      ? { id: t[1] || t[2], translation: ku(t[3]) }
                      : null;
                  })
                  .filter(Boolean);
              })(t);
            })(Ss(e));
            if (!n.length) return [];
            const a = new Map(),
              i = new Map();
            return (
              n.forEach((e, t) => {
                if ("string" == typeof e) return void i.set(t, ku(e));
                if (!e || "object" != typeof e) return;
                const n = ku(
                    e.translation ||
                      e.translatedText ||
                      e.text ||
                      e.value ||
                      "",
                  ),
                  s = ku(e.id || e.index || e.number || "");
                (s && a.set(s, n), i.set(t, n));
              }),
              t.map((e, t) => a.get(String(t + 1)) || i.get(t) || "")
            );
          })(i, a),
          r = [];
        for (let e = 0; e < a.length; e += 1) {
          const n = a[e];
          if (!F.chatItems.includes(n)) continue;
          const i = ku(s[e]);
          i
            ? (ns()
                ? Q.accept(n, i, { dispatched: !0 === t.lease?.dispatched })
                : ((n.translation = i), (n.status = "done")),
              re.delete(n.key))
            : r.push(n);
        }
        if (r.length)
          for (const e of r)
            (SubruuLiveChat.expireTranslation(e, "missing-result"),
              re.delete(e.key));
        ((F.chatStatus = `已翻譯 ${F.chatItems.filter((e) => "done" === e.status).length} 則留言`),
          (F.chatError = ""),
          os());
      } catch (e) {
        if (n !== Z) return;
        if (!F.chatPanelOpen) return;
        for (const e of a)
          (SubruuLiveChat.expireTranslation(e, "request-failed"),
            re.delete(e.key));
        F.chatError = e.message || "聊天室批次翻譯失敗";
        F.chatStatus = F.chatError;
      } finally {
        n === Z && Ki();
      }
    }
  }
  function Ss(e) {
    return ku(
      e?.segments
        ?.map((e) => e.translation)
        .filter(Boolean)
        .join(" ") ||
        e?.translatedText ||
        e?.translation ||
        e?.text ||
        "",
    );
  }
  function hs() {
    return (
      ku(
        F.config?.interactionProvider ||
          F.config?.fastProvider ||
          F.config?.provider,
      ) || "lt-a"
    );
  }
  function bs() {
    const e = n;
    ((n = null),
      e &&
        e
          .close()
          .catch(() =>
            console.warn("[live-subtitle] 互動翻譯授權停止尚未確認"),
          ));
  }
  async function vs(e, t = {}) {
    const sessionId = F.sessionId, generation = Z;
    if(e.mode!=='reply' && !chatSourceLanguage()) throw new Error('請先選擇留言原文語言，才能開始翻譯。');
    if (!globalThis.SubruuWalletInteractions)
      throw new Error("請重新載入插件後再使用互動翻譯。");
    n ||= globalThis.SubruuWalletInteractions.create();
    const result = await n.translate({
      sessionId,
      isCurrent: () => F.sessionId === sessionId && Z === generation && (e.mode === "reply" ? F.replyPanelOpen : F.chatPanelOpen),
      requestIsCurrent: t.requestIsCurrent,
      onDispatched: t.onDispatched,
    }, e);
    F.usage = globalThis.SubruuWalletInteractions.usageSnapshot(result.billing, F.usage || {});
    return result;
  }
  function Ms(e = {}, t = {}) {
    if (["sql-wallet-v1", "textamisu"].includes(e.billingProtocol)) return;
    const n = (function (e = {}, t = {}) {
      const n = e?.usage || null;
      if (!n || "object" != typeof n) return null;
      const a = Ls(n, [
          "inputTokens",
          "input_tokens",
          "promptTokens",
          "prompt_tokens",
        ]),
        i = Ls(n, [
          "visibleOutputTokens",
          "visible_output_tokens",
          "candidatesTokenCount",
        ]),
        s = Ls(n, ["thinkingTokens", "thinking_tokens", "thoughtsTokenCount"]),
        r =
          Ls(n, [
            "outputTokens",
            "output_tokens",
            "completionTokens",
            "completion_tokens",
          ]) || i + s,
        o = Ls(n, ["totalTokens", "total_tokens"]) || a + r;
      if (o <= 0 && a <= 0 && r <= 0) return null;
      const l = e?.pricing || {},
        d = Math.min(
          a,
          Ls(n, [
            "cachedInputTokens",
            "cached_input_tokens",
            "cachedPromptTokens",
            "cached_prompt_tokens",
          ]),
        ),
        c = (function (e, t, n, a = {}) {
          const i = Number(a.inputPerMillion || 0),
            s =
              Number(
                a.cachedInputPerMillion ??
                  a.cacheReadPerMillion ??
                  a.cacheHitPerMillion ??
                  i,
              ) || 0,
            r =
              Number(
                a.cacheWriteInputPerMillion ??
                  a.cacheCreateInputPerMillion ??
                  a.cacheWritePerMillion ??
                  i,
              ) || 0,
            o = Math.max(0, Number(e) || 0),
            l = Math.min(o, Math.max(0, Number(t) || 0)),
            d = Math.min(Math.max(0, o - l), Math.max(0, Number(n) || 0));
          return Ds(Math.max(0, o - l - d), i) + Ds(l, s) + Ds(d, r);
        })(
          a,
          d,
          Math.min(
            Math.max(0, a - d),
            Ls(n, [
              "cacheWriteInputTokens",
              "cache_write_input_tokens",
              "cacheCreationInputTokens",
              "cache_creation_input_tokens",
            ]),
          ),
          l,
        ),
        u = Ds(i || r, l.outputPerMillion),
        m = Ds(s, l.outputPerMillion),
        y = Ds(r, l.outputPerMillion),
        p = c + y,
        g = Ls(n, ["costUSD", "cost_usd", "cost"]) || p,
        f = ku(e?.fallbackFromProvider || ""),
        S = {
          deltaInputTokens: a,
          deltaOutputTokens: r,
          deltaVisibleOutputTokens: i || (s ? 0 : r),
          deltaThinkingTokens: s,
          deltaTotalTokens: o,
          deltaCallCount: 1,
          deltaCostUSD: Bs(g),
          deltaInputCostUSD: Bs(c),
          deltaOutputCostUSD: Bs(y),
          deltaVisibleOutputCostUSD: Bs(u),
          deltaThinkingCostUSD: Bs(m),
          deltaFallbackCount: f ? 1 : 0,
          fallbackProvider: ku(e?.provider || ""),
          fallbackFromProvider: f,
          fallbackReason: ku(e?.fallbackReason || ""),
          provider: ku(e?.provider || ""),
          providerName: ku(e?.providerName || e?.provider || ""),
          purpose: ku(t.purpose || ""),
          itemCount: Math.max(0, Math.round(Number(t.itemCount) || 0)),
        },
        h = ws(t.purpose),
        b = {
          deltaAudioMs: 0,
          totalAudioMs: 0,
          sessionElapsedSeconds: F.usage?.elapsedSeconds || 0,
          audioChunks: 0,
          usageCategory: h,
          llm: S,
        },
        v = $c(S);
      return (
        "live-chat" === h && (b.liveChatUsage = v),
        "reply" === h && (b.replyUsage = v),
        b
      );
    })(e, t);
    n &&
      ((function (e = {}) {
        const t = qc(F.usage || {}),
          n = e.llm || {},
          a = ku(e.usageCategory || ws(n.purpose)),
          i = $c(n),
          s = {
            ...t,
            totalCostUSD: Bs(t.totalCostUSD + bu(n.deltaCostUSD)),
            llmCostUSD: Bs(t.llmCostUSD + bu(n.deltaCostUSD)),
            totalTokens: t.totalTokens + Math.round(bu(n.deltaTotalTokens)),
            inputTokens: t.inputTokens + Math.round(bu(n.deltaInputTokens)),
            outputTokens: t.outputTokens + Math.round(bu(n.deltaOutputTokens)),
            visibleOutputTokens:
              t.visibleOutputTokens +
              Math.round(bu(n.deltaVisibleOutputTokens)),
            thinkingTokens:
              t.thinkingTokens + Math.round(bu(n.deltaThinkingTokens)),
            llmCallCount: t.llmCallCount + Math.round(bu(n.deltaCallCount)),
            llmFallbackCount:
              t.llmFallbackCount + Math.round(bu(n.deltaFallbackCount)),
            inputCostUSD: Bs(t.inputCostUSD + bu(n.deltaInputCostUSD)),
            outputCostUSD: Bs(t.outputCostUSD + bu(n.deltaOutputCostUSD)),
            visibleOutputCostUSD: Bs(
              t.visibleOutputCostUSD + bu(n.deltaVisibleOutputCostUSD),
            ),
            thinkingCostUSD: Bs(t.thinkingCostUSD + bu(n.deltaThinkingCostUSD)),
            provider: ku(n.provider || t.provider),
            providerName: ku(n.providerName || t.providerName),
            source: "local-estimate",
            updatedAt: new Date().toISOString(),
          };
        ("live-chat" === a
          ? (s.liveChatUsage = Wc(t.liveChatUsage, i))
          : "reply" === a && (s.replyUsage = Wc(t.replyUsage, i)),
          (s.creditsUsed = uu(s.totalCostUSD)),
          (F.usage = Oc(F.usage, s)),
          Qc(F.usage),
          me.quota &&
            ((me.quota.textContent = Kc(F.usage)),
            (me.quota.title = jc(F.usage)),
            me.quota.classList.toggle(
              "active",
              Boolean(F.usage?.creditsUsed),
            )));
      })(n),
      (async function (e = {}) {
        if (!F.sessionId) return;
        const t = await (async function (e = {}) {
          if (!F.sessionId) return !1;
          const t = await chrome.runtime.sendMessage({
            type: "LIVE_SUBTITLE_PANEL_USAGE_DELTA",
            sessionId: F.sessionId,
            usage: e,
          });
          return Boolean(t?.ok && !t.ignored);
        })(e).catch(() => !1);
        t ||
          (function (e = {}) {
            ((Ge = xs(Ge, e)),
              We ||
                (We = window.setInterval(() => {
                  ks().catch((e) => {
                    console.warn(
                      "[live-subtitle] panel usage heartbeat failed:",
                      e.message,
                    );
                  });
                }, 1e4)));
          })(e);
      })(n).catch((e) => {
        console.warn("[live-subtitle] panel usage queue failed:", e.message);
      }));
  }
  function ws(e = "") {
    const t = ku(e);
    return "chat" === t || "chat-batch" === t || t.startsWith("chat-")
      ? "live-chat"
      : "reply" === t
        ? "reply"
        : t || "panel";
  }
  function Ts() {
    We && (window.clearInterval(We), (We = null));
  }
  async function ks() {
    if (Ne || !Ge || !F.sessionId) return !1;
    Ne = !0;
    const e = Ge;
    Ge = null;
    try {
      return (
        await (async function (e = {}) {
          if (!F.sessionId) return;
          const t = Ni(F.config?.backendUrl),
            n = await Gi(),
            a = await zi(
              `${t}/caption-sessions/${encodeURIComponent(F.sessionId)}/usage`,
              {
                method: "POST",
                headers: n,
                body: JSON.stringify({ usage: e, final: !1 }),
              },
              5e3,
            );
          a?.billing &&
            ((F.usage = Oc(
              F.usage,
              (function (e = {}) {
                return qc({
                  ...e,
                  creditsUsed: e.totalCreditsUsed,
                  inputTokens: e.llmInputTokens,
                  outputTokens: e.llmOutputTokens,
                  visibleOutputTokens: e.llmVisibleOutputTokens,
                  thinkingTokens: e.llmThinkingTokens,
                  inputCostUSD: e.llmInputCostUSD,
                  outputCostUSD: e.llmOutputCostUSD,
                  visibleOutputCostUSD: e.llmVisibleOutputCostUSD,
                  thinkingCostUSD: e.llmThinkingCostUSD,
                  llmFallbackCount: e.llmFallbackCount,
                  source: "remote-billing",
                });
              })(a.billing),
            )),
            Qc(F.usage),
            me.quota &&
              ((me.quota.textContent = Kc(F.usage)),
              (me.quota.title = jc(F.usage)),
              me.quota.classList.toggle(
                "active",
                Boolean(F.usage?.creditsUsed),
              )));
        })(e),
        Ge || Ts(),
        !0
      );
    } catch (t) {
      throw ((Ge = xs(e, Ge)), t);
    } finally {
      Ne = !1;
    }
  }
  function xs(e = null, t = null) {
    const n = As(e),
      a = As(t);
    return {
      deltaAudioMs: 0,
      totalAudioMs: 0,
      sessionElapsedSeconds: Math.max(
        n.sessionElapsedSeconds,
        a.sessionElapsedSeconds,
      ),
      audioChunks: 0,
      usageCategory: a.usageCategory || n.usageCategory,
      llm: Cs(n.llm, a.llm),
      liveChatUsage: Wc(n.liveChatUsage, a.liveChatUsage),
      replyUsage: Wc(n.replyUsage, a.replyUsage),
    };
  }
  function As(e = {}) {
    const t = e && "object" == typeof e ? e : {},
      n = t.llm && "object" == typeof t.llm ? t.llm : {};
    return {
      deltaAudioMs: 0,
      totalAudioMs: 0,
      sessionElapsedSeconds: Math.max(0, bu(t.sessionElapsedSeconds)),
      audioChunks: 0,
      usageCategory: ku(t.usageCategory),
      llm: {
        deltaInputTokens: Math.max(0, Math.round(bu(n.deltaInputTokens))),
        deltaOutputTokens: Math.max(0, Math.round(bu(n.deltaOutputTokens))),
        deltaVisibleOutputTokens: Math.max(
          0,
          Math.round(bu(n.deltaVisibleOutputTokens)),
        ),
        deltaThinkingTokens: Math.max(0, Math.round(bu(n.deltaThinkingTokens))),
        deltaTotalTokens: Math.max(0, Math.round(bu(n.deltaTotalTokens))),
        deltaCallCount: Math.max(0, Math.round(bu(n.deltaCallCount))),
        deltaCostUSD: Bs(n.deltaCostUSD),
        deltaInputCostUSD: Bs(n.deltaInputCostUSD),
        deltaOutputCostUSD: Bs(n.deltaOutputCostUSD),
        deltaVisibleOutputCostUSD: Bs(n.deltaVisibleOutputCostUSD),
        deltaThinkingCostUSD: Bs(n.deltaThinkingCostUSD),
        deltaFallbackCount: Math.max(0, Math.round(bu(n.deltaFallbackCount))),
        fallbackProvider: ku(n.fallbackProvider),
        fallbackFromProvider: ku(n.fallbackFromProvider),
        fallbackReason: ku(n.fallbackReason),
        provider: ku(n.provider),
        providerName: ku(n.providerName),
        purpose: ku(n.purpose),
        itemCount: Math.max(0, Math.round(bu(n.itemCount))),
      },
      liveChatUsage: Vc(t.liveChatUsage || t.chatUsage || t.liveChat),
      replyUsage: Vc(t.replyUsage || t.reply),
    };
  }
  function Cs(e = {}, t = {}) {
    return {
      deltaInputTokens: Math.max(
        0,
        Math.round(bu(e.deltaInputTokens) + bu(t.deltaInputTokens)),
      ),
      deltaOutputTokens: Math.max(
        0,
        Math.round(bu(e.deltaOutputTokens) + bu(t.deltaOutputTokens)),
      ),
      deltaVisibleOutputTokens: Math.max(
        0,
        Math.round(
          bu(e.deltaVisibleOutputTokens) + bu(t.deltaVisibleOutputTokens),
        ),
      ),
      deltaThinkingTokens: Math.max(
        0,
        Math.round(bu(e.deltaThinkingTokens) + bu(t.deltaThinkingTokens)),
      ),
      deltaTotalTokens: Math.max(
        0,
        Math.round(bu(e.deltaTotalTokens) + bu(t.deltaTotalTokens)),
      ),
      deltaCallCount: Math.max(
        0,
        Math.round(bu(e.deltaCallCount) + bu(t.deltaCallCount)),
      ),
      deltaCostUSD: Bs(bu(e.deltaCostUSD) + bu(t.deltaCostUSD)),
      deltaInputCostUSD: Bs(bu(e.deltaInputCostUSD) + bu(t.deltaInputCostUSD)),
      deltaOutputCostUSD: Bs(
        bu(e.deltaOutputCostUSD) + bu(t.deltaOutputCostUSD),
      ),
      deltaVisibleOutputCostUSD: Bs(
        bu(e.deltaVisibleOutputCostUSD) + bu(t.deltaVisibleOutputCostUSD),
      ),
      deltaThinkingCostUSD: Bs(
        bu(e.deltaThinkingCostUSD) + bu(t.deltaThinkingCostUSD),
      ),
      deltaFallbackCount: Math.max(
        0,
        Math.round(bu(e.deltaFallbackCount) + bu(t.deltaFallbackCount)),
      ),
      fallbackProvider: ku(t.fallbackProvider || e.fallbackProvider),
      fallbackFromProvider: ku(
        t.fallbackFromProvider || e.fallbackFromProvider,
      ),
      fallbackReason: ku(t.fallbackReason || e.fallbackReason),
      provider: ku(t.provider || e.provider),
      providerName: ku(t.providerName || e.providerName),
      purpose: ku(t.purpose || e.purpose),
      itemCount: Math.max(0, Math.round(bu(e.itemCount) + bu(t.itemCount))),
    };
  }
  function Rs(e = {}) {
    return ((F.usage = Oc(F.usage, e)), F.usage);
  }
  function Ds(e, t) {
    const n = Number(e) || 0,
      a = Number(t) || 0;
    return n <= 0 || a <= 0 ? 0 : (n * a) / 1e6;
  }
  function Ls(e, t = []) {
    for (const n of t) {
      const t = Number(e?.[n]);
      if (Number.isFinite(t) && t > 0) return t;
    }
    return 0;
  }
  function Bs(e) {
    const t = Number(e);
    return !Number.isFinite(t) || t <= 0 ? 0 : Math.round(1e9 * t) / 1e9;
  }
  function Es(e, t, n = {}) {
    return "/live-caption-translate" === t
      ? {
          ...e,
          isFinal: !0,
          maxOriginalChars: e.maxOriginalChars || 500,
          maxSegments: 1,
          segmentationMode: "sentence",
          segmentationPreference: "sentence",
          latencyMode: "tight",
          latencySlackMs: 0,
          translationDeadlineMs: e.translationDeadlineMs || 1e4,
          sttElapsedMs: e.sttElapsedMs || 0,
          estimatedTranslationLatencyMs:
            e.estimatedTranslationLatencyMs || 1800,
          translationStyle: e.translationStyle || Ps(n.purpose),
        }
      : "/translate" === t
        ? {
            text: e.text,
            sourceLang: e.sourceLang || "auto",
            targetLang: e.targetLang || "zh",
          }
        : e;
  }
  function Ps(e = "") {
    return "reply" === e
      ? "Translate this live chat reply naturally and briefly for the streamer. Return only the translated message."
      : "chat" === e
        ? "Translate this live chat message for a viewer. Keep names, emoji, memes, and tone. Return only the translated message."
        : "chat-batch" === e
          ? "Translate each live chat item independently. Return only a JSON array of translated messages in the same order."
          : "Return only the translated text.";
  }
  function Is(e) {
    return "/interaction-translate" === e
      ? Math.min(h, 1e4)
      : "/live-caption-translate" === e
        ? h
        : Math.min(h, 12e3);
  }
  function Us(e) {
    const t = Number(e?.status || 0);
    return 401 !== t && 403 !== t && 402 !== t;
  }
  function _s(e) {
    const t =
        globalThis.SubruuLiveChat?.readAuthor(e) ||
        zs(
          e.querySelector("#author-name") ||
            e.querySelector("yt-live-chat-author-chip"),
        ),
      n =
        e.querySelector("#message") ||
        e.querySelector("#sticker") ||
        e.querySelector("#content, #header-content-primary-column"),
      a = globalThis.SubruuLiveChat?.readParts(n) || [],
      i = a.length ? SubruuLiveChat.plainText(a) : zs(n);
    return {
      author: t,
      text: ku(
        [zs(e.querySelector("#purchase-amount, #content-primary-column")), i]
          .filter(Boolean)
          .join(" "),
      ),
      platform: "youtube",
      authorMeta: globalThis.SubruuLiveChat?.readAuthorMeta(e),
      ...(a.length ? { parts: a } : {}),
      sourceMessageId: js(e),
    };
  }
  function qs(e) {
    const t =
        globalThis.SubruuLiveChat?.readAuthor(e) ||
        zs(e.querySelector('[data-a-target="chat-message-username"]')),
      n = Array.from(
        e.querySelectorAll(
          '[data-a-target="chat-message-text"], .text-fragment',
        ),
      ),
      a =
        e.querySelector(
          '[data-a-target="chat-line-message-body"], [data-test-selector="chat-line-message-body"]',
        ) || e,
      i = globalThis.SubruuLiveChat?.readParts(a) || [];
    return {
      author: t,
      text: ku(
        i.length
          ? SubruuLiveChat.plainText(i)
          : n.length
            ? n.map(zs).join(" ")
            : zs(e),
      ),
      platform: "twitch",
      ...(i.length ? { parts: i } : {}),
      sourceMessageId: js(e),
    };
  }
  function Os(e = document) {
    if (!e?.querySelectorAll) return [];
    if (
      !(function (e = document) {
        try {
          const t = String(e?.location?.href || location.href || "");
          return /(^|\.)instagram\.com$/i.test(
            new URL(t, location.href).hostname,
          );
        } catch {
          return oc();
        }
      })(e)
    )
      return [];
    const t = [
        ...e.querySelectorAll('div[role="dialog"] ul li'),
        ...e.querySelectorAll("main ul li"),
        ...e.querySelectorAll("section ul li"),
        ...e.querySelectorAll('div[aria-label*="comment" i]'),
        ...e.querySelectorAll('div[aria-label*="留言" i]'),
        ...Vs(e),
      ],
      n = new Set();
    return t.filter(
      (e) =>
        !(!e || n.has(e)) &&
        (n.add(e),
        (function (e) {
          const t = zs(e);
          if (!t || t.length < 2) return !1;
          if (t.length > 500) return !1;
          const n = Gs(e),
            a = Hs(e, n);
          return Boolean(a && (n || /instagram\.com/i.test(location.hostname)));
        })(e)),
    );
  }
  function Vs(e = document) {
    return Array.from(
      e.querySelectorAll(
        [
          'a[href^="/"]:not([href*="/p/"]):not([href*="/reel/"]):not([href*="/stories/"])',
          "strong",
          'span[dir="auto"]',
        ].join(","),
      ),
    )
      .filter($s)
      .map(Ws)
      .filter(Boolean);
  }
  function $s(e) {
    const t = ku(e?.textContent || "");
    if (!/^[a-z0-9._]{2,30}$/i.test(t)) return !1;
    const n = String(e?.getAttribute?.("href") || "");
    return (
      !n ||
      (!/\/(?:p|reel|stories|explore|direct|accounts|about|developer)\//i.test(
        n,
      ) &&
        /^\/[a-z0-9._]+\/?$/i.test(n))
    );
  }
  function Ws(e) {
    const t = ku(e?.textContent || "");
    let n = e?.parentElement || null;
    for (let e = 0; n && e < 8; e += 1, n = n.parentElement) {
      const e = zs(n);
      if (
        e &&
        !(e.length > 500) &&
        e.includes(t) &&
        !n.querySelector?.("video") &&
        Hs(n, t)
      )
        return n;
    }
    return null;
  }
  function Ns(e) {
    const t = Gs(e);
    return {
      author: t,
      text: Hs(e, t),
      platform: "instagram",
      sourceMessageId: js(e),
    };
  }
  function Gs(e) {
    const t = e.querySelector(
      [
        'a[href^="/"]:not([href*="/p/"]):not([href*="/reel/"]):not([href*="/stories/"])',
        "h3",
        "strong",
      ].join(","),
    );
    return ku(t?.textContent || "");
  }
  function Hs(e, t = "") {
    const n = ku(t);
    let a = ku(
      (function (e = []) {
        const t = [];
        for (const n of e) n && n !== t[t.length - 1] && t.push(n);
        return t;
      })(
        Array.from(
          e.querySelectorAll(
            'span[dir="auto"], div[dir="auto"], span:not([aria-hidden="true"])',
          ),
        )
          .map(zs)
          .filter((e) => e && e !== n && !Fs(e)),
      ).join(" "),
    );
    if ((n && a.startsWith(n) && (a = ku(a.slice(n.length))), a)) return a;
    let i = zs(e);
    return (
      n && i.startsWith(n) && (i = ku(i.slice(n.length))),
      Fs(i) ? "" : i
    );
  }
  function Fs(e) {
    const t = ku(e);
    return !(
      t &&
      !/^(reply|view replies?|see translation|send message|add a comment|liked by|verified|live)$/i.test(
        t,
      ) &&
      !/^(回覆|查看回覆|查看翻譯|傳送訊息|新增留言|直播|返信|返答)$/i.test(t) &&
      !/^\d+[smhdw]$/i.test(t) &&
      !/^\d+\s*(秒|分鐘|小时|小時|天|週|周)$/i.test(t) &&
      !/^\d+$/.test(t)
    );
  }
  function zs(e) {
    if (!e) return "";
    const t = [],
      n = (e) => {
        if (!e) return;
        if (3 === Number(e.nodeType))
          return void (e.textContent && t.push(e.textContent));
        if (1 !== Number(e.nodeType)) return;
        const a = String(e.tagName || e.nodeName || "").toUpperCase();
        if (["STYLE", "SCRIPT", "TEMPLATE", "NOSCRIPT"].includes(a)) return;
        if ("IMG" === a || "SVG" === a) {
          const n = Ks(e, ["alt", "aria-label", "title"]);
          return void (n && t.push(n));
        }
        if ("BR" === a) return void t.push(" ");
        const i = Array.from(e.childNodes || []);
        i.length ? i.forEach(n) : e.textContent && t.push(e.textContent);
      };
    return (n(e), ku(t.join(" ")));
  }
  function Ks(e, t = []) {
    for (const n of t) {
      const t = ku(e?.getAttribute?.(n) || "");
      if (t) return t;
    }
    return "";
  }
  function js(e) {
    return (
      Ks(e, ["data-message-id", "data-comment-id", "data-id", "id"]) ||
      ku(e?.id || "")
    );
  }
  function Qs(e) {
    return ku(e).toLowerCase().replace(/\s+/g, "").trim();
  }
  function Js() {
    if (document.querySelector('[data-a-target="chat-line-message"]'))
      return document;
    if (oc() && Os(document).length) return document;
    for (const e of document.querySelectorAll("iframe")) {
      const t = String(e.src || "");
      if (/youtube\.com\/live_chat|youtube\.com\/live_chat_replay/i.test(t))
        try {
          if (e.contentDocument?.querySelectorAll) return e.contentDocument;
        } catch {}
    }
    return document.querySelector("yt-live-chat-app") ? document : null;
  }
  function Ys() {
    if(youtubeChatPresence().available) return true;
    const e = Date.now();
    if (le.href === location.href && e - le.checkedAt < 2e3) return le.value;
    const t = Pd(),
      n = Boolean(
        t?.isLiveStream && (t.isYouTube || t.isTwitch || t.isInstagram),
      );
    return ((le.href = location.href), (le.checkedAt = e), (le.value = n), n);
  }
  function Xs(e) {
    const t = e.target.closest("button[data-action]");
    if (!t) return;
    const n = t.dataset.action;
    if (
      ("font-down" === n && ((F.fontSize = Math.max(16, F.fontSize - 2)), ci()),
      "font-up" === n && ((F.fontSize = Math.min(84, F.fontSize + 2)), ci()),
      "opacity" === n &&
        (F.opacity = (function (e) {
          const t = [0.98, 0.94, 0.86, 0.72],
            n = rr(e),
            a = t.findIndex((e) => Math.abs(e - n) <= 0.035);
          return a >= 0
            ? t[(a + 1) % t.length]
            : n <= 0.02
              ? 0.94
              : n < 0.92
                ? 0.98
                : 0.86;
        })(F.opacity)),
      "transparent-toggle" === n && (F.opacity = F.opacity <= 0.02 ? 0.94 : 0),
      "mode" === n && (F.mode = r[(r.indexOf(F.mode) + 1) % r.length]),
      "usage-toggle" === n &&
        ((F.usagePanelOpen = !F.usagePanelOpen),
        F.usagePanelOpen && (F.settingsPanelOpen = !1),
        Qc(F.usage)),
      "settings-toggle" === n &&
        ((F.settingsPanelOpen = !F.settingsPanelOpen),
        F.settingsPanelOpen && (F.usagePanelOpen = !1)),
      "settings-reset" === n)
    )
      return (
        (F.mode = "dual"),
        (F.fontSize = 28),
        (F.fontFamily = "system"),
        (F.equalBilingualFontSize = !1),
        (F.opacity = 0.94),
        (F.originalColor = "#d8e2f2"),
        (F.translationColor = "#ffffff"),
        ci(),
        ir(),
        void ei()
      );
    if ("reply-toggle" === n || "reply-toggle-inline" === n)
      return (
        Ji({ focusReply: !0, openReply: !0, openChat: !1 }),
        ir(),
        void ei()
      );
    if ("reply-close" === n || "chat-close" === n || "interaction-close" === n)
      return (
        bs(),
        (F.replyPanelOpen = !1),
        (F.chatPanelOpen = !1),
        ds(),
        qi(),
        Ki(),
        ji(),
        ir(),
        void ei()
      );
    if ("reply-translate" !== n)
      if ("reply-send" !== n)
        if ("reply-copy" !== n) {
          if ("chat-toggle" === n)
            return (
              Ji({ focusReply: !1, openReply: !1, openChat: !0 }),
              ir(),
              void ei()
            );
          if ("chat-scroll-bottom" === n)
            return ((F.chatAutoScroll = !0), void Xi({ force: !0 }));
          if ("close" === n)
            return (
              zt(),
              void chrome.runtime
                .sendMessage({
                  type: "STOP_LIVE_SUBTITLE",
                  sessionId: F.sessionId || null,
                })
                .catch(() => {})
            );
          ("collapse" === n && (F.collapsed = !F.collapsed), ir(), ei());
        } else
          (async function () {
            const e = ku(F.replyTranslation);
            if (!e) throw new Error("目前沒有可複製的翻譯。");
            if (!navigator.clipboard?.writeText)
              throw new Error("此頁面無法使用剪貼簿 API。");
            (await navigator.clipboard.writeText(e),
              (F.replyStatus = "已複製翻譯。"),
              (F.replyError = ""),
              qi());
          })().catch((e) => {
            ((F.replyError = e.message),
              (F.replyStatus = e.message || "複製失敗"),
              qi());
          });
      else {
        if (!e.isTrusted) return;
        !(async function () {
          if(isChatReplay()) { F.replyError=F.replyStatus='聊天重播無法送出留言，可翻譯後複製。'; qi(); return; }
          if (
            F.replyBusy ||
            F.replySending ||
            (F.replyLastSentSession === F.sessionId &&
              F.replyLastSentText === F.replyText)
          )
            return;
          const e = F.sessionId,
            t = Z,
            n = F.replyText,
            a = () =>
              F.sessionId === e &&
              Z === t &&
              F.replyPanelOpen &&
              F.replyText === n;
          ((F.replySending = !0), (F.replyError = ""), qi());
          try {
            (await globalThis.SubruuLiveChat.translateAndSend({
              sessionId: e,
              isCurrent: a,
              translate: Oi,
              sendMessage: (e) => chrome.runtime.sendMessage(e),
            }),
              a() &&
                ((F.replyLastSentText = n),
                (F.replyLastSentSession = e),
                (F.replyStatus = "已送交原聊天室，請以原聊天室的顯示為準。")));
          } catch (t) {
            a() &&
              (t.uncertain &&
                ((F.replyLastSentText = n), (F.replyLastSentSession = e)),
              (F.replyError = t.message),
              (F.replyStatus = t.message));
          } finally {
            ((F.replySending = !1), (F.replyBusy = !1), qi());
          }
        })();
      }
    else {
      if (F.replySending) return;
      Oi().catch((e) => {
        ((F.replyBusy = !1),
          (F.replyError = e.message),
          (F.replyStatus = e.message || "翻譯失敗"),
          qi());
      });
    }
  }
  function Zs(e) {
    const t = e.dataset.settings;
    if (t) {
      switch (t) {
        case "mode":
          F.mode = or(e.value, F.mode || "dual");
          break;
        case "fontSize":
          ((F.fontSize = lr(e.value)), ci());
          break;
        case "fontFamily":
          F.fontFamily = dr(e.value);
          break;
        case "equalBilingualFontSize":
          F.equalBilingualFontSize = Boolean(e.checked);
          break;
        case "opacity":
          F.opacity = rr(e.value);
          break;
        case "originalColor":
          F.originalColor = ur(e.value, "#d8e2f2");
          break;
        case "translationColor":
          F.translationColor = ur(e.value, "#ffffff");
          break;
        default:
          return;
      }
      (ir(), ei());
    }
  }
  function er(e) {
    if (F.locked || e.target.closest("button")) return;
    (e.preventDefault(), (F.positionMode = "floating"));
    const t = e.clientX,
      n = e.clientY,
      a = F.layout.left,
      i = F.layout.top,
      s = (e) => {
        ((F.layout.left = Cu(a + e.clientX - t, 8, window.innerWidth - 120)),
          (F.layout.top = Cu(i + e.clientY - n, 8, window.innerHeight - 60)),
          ei());
      },
      r = () => {
        (window.removeEventListener("pointermove", s),
          window.removeEventListener("pointerup", r),
          ir());
      };
    (window.addEventListener("pointermove", s),
      window.addEventListener("pointerup", r));
  }
  function tr(e) {
    if (e.target.closest("button, textarea, input")) return;
    e.preventDefault();
    const t = me.interactionPanel?.getBoundingClientRect(),
      n = mi({
        ...(F.interactionPanelManualPosition ? F.interactionPanelLayout : {}),
        left: t?.left ?? F.interactionPanelLayout.left,
        top: t?.top ?? F.interactionPanelLayout.top,
        width: t?.width ?? F.interactionPanelLayout.width,
        height: t?.height ?? F.interactionPanelLayout.height,
      });
    ((F.interactionPanelManualPosition = !0), (F.interactionPanelLayout = n));
    const a = e.clientX,
      i = e.clientY,
      s = (e) => {
        ((F.interactionPanelLayout = mi({
          ...n,
          left: n.left + e.clientX - a,
          top: n.top + e.clientY - i,
        })),
          ui());
      },
      r = () => {
        (window.removeEventListener("pointermove", s),
          window.removeEventListener("pointerup", r),
          ir());
      };
    (window.addEventListener("pointermove", s),
      window.addEventListener("pointerup", r));
  }
  function nr(e) {
    (e.preventDefault(), e.stopPropagation());
    const t = me.interactionPanel?.getBoundingClientRect(),
      n = mi({
        ...(F.interactionPanelManualPosition ? F.interactionPanelLayout : {}),
        left: t?.left ?? F.interactionPanelLayout.left,
        top: t?.top ?? F.interactionPanelLayout.top,
        width: t?.width ?? F.interactionPanelLayout.width,
        height: t?.height ?? F.interactionPanelLayout.height,
      });
    ((F.interactionPanelManualPosition = !0), (F.interactionPanelLayout = n));
    const a = e.clientX,
      i = e.clientY,
      s = (e) => {
        ((F.interactionPanelLayout = mi({
          ...n,
          width: n.width + e.clientX - a,
          height: n.height + e.clientY - i,
        })),
          ui());
      },
      r = () => {
        (window.removeEventListener("pointermove", s),
          window.removeEventListener("pointerup", r),
          ir());
      };
    (window.addEventListener("pointermove", s),
      window.addEventListener("pointerup", r));
  }
  function ar(e) {
    (e.preventDefault(), (F.positionMode = "floating"));
    const t = e.clientX,
      n = e.clientY,
      a = F.layout.width,
      i = F.layout.height,
      s = (e) => {
        const s = "side" === F.mode ? w : 220,
          r = "side" === F.mode ? T : M,
          o =
            "side" === F.mode
              ? Math.max(r, window.innerHeight - 20)
              : Math.max(r, 0.7 * window.innerHeight);
        F.layout.width = Cu(
          a + e.clientX - t,
          s,
          Math.max(s, window.innerWidth - 20),
        );
        const l = Cu(i + e.clientY - n, r, o);
        ((F.layout.height = (function (
          e,
          t = F.layout.width,
          n = 56,
          a = 0.7 * window.innerHeight,
        ) {
          const i = Cu(e, n, a);
          if ("large" === F.mode || "side" === F.mode) return i;
          const s = Li(Math.max(0, i - 30 - Ei(!1)), !1),
            r = Ri(t, s),
            o = Math.max(1, Math.min(r, s, u));
          return Cu(Pi(o, 1 === o), n, a);
        })(l, F.layout.width, r, o)),
          ei());
      },
      r = () => {
        (window.removeEventListener("pointermove", s),
          window.removeEventListener("pointerup", r),
          ir());
      };
    (window.addEventListener("pointermove", s),
      window.addEventListener("pointerup", r));
  }
  function ir() {
    const e = {
      collapsed: F.collapsed,
      layout: F.layout,
      interactionPanelLayout: F.interactionPanelLayout,
      interactionPanelManualPosition: F.interactionPanelManualPosition,
      locked: F.locked,
      positionMode: F.positionMode,
      usagePanelOpen: F.usagePanelOpen,
      settingsPanelOpen: F.settingsPanelOpen,
      updatedAt: new Date().toISOString(),
      version: 2,
    };
    (chrome.storage.local.set({ [sr()]: e }).catch(() => {}),
      (async function () {
        const e = await chrome.storage.local.get(i),
          t = e?.[i] && "object" == typeof e[i] ? e[i] : {};
        await chrome.storage.local.set({
          [i]: {
            ...t,
            overlayMode: or(F.mode),
            overlayFontSize: lr(F.fontSize),
            overlayFontFamily: dr(F.fontFamily),
            overlayEqualBilingualFontSize: Boolean(F.equalBilingualFontSize),
            overlayOpacity: rr(F.opacity),
            overlayOriginalColor: ur(F.originalColor, "#d8e2f2"),
            overlayTranslationColor: ur(F.translationColor, "#ffffff"),
            overlayAppearanceUpdatedAt: new Date().toISOString(),
          },
        });
      })().catch(() => {}));
  }
  function sr() {
    return `liveSubtitleOverlayLayout:${location.hostname || "default"}`;
  }
  function rr(e) {
    const t = Number(e);
    return Number.isFinite(t) ? Cu(t, 0, 0.98) : 0.94;
  }
  function or(e, t = "dual") {
    const n = String(e || t || "dual")
      .toLowerCase()
      .trim();
    return r.includes(n) ? n : t;
  }
  function lr(e) {
    const t = Math.round(Number(e));
    return Number.isFinite(t) ? Cu(t, 16, 84) : 26;
  }
  function dr(e, t = "system") {
    const n = String(e || t || "system")
      .toLowerCase()
      .trim();
    return Object.prototype.hasOwnProperty.call(v, n) ? n : t;
  }
  function cr(e) {
    return v[dr(e)] || v.system;
  }
  function ur(e, t) {
    const n = String(e || "").trim();
    return (
      (/^#[0-9a-f]{6}$/i.test(n)
        ? n.toLowerCase()
        : /^#[0-9a-f]{3}$/i.test(n)
          ? `#${n
              .slice(1)
              .split("")
              .map((e) => `${e}${e}`)
              .join("")}`.toLowerCase()
          : "") || t
    );
  }
  function mr(e) {
    const t = Math.round(Number(e));
    return Number.isFinite(t) ? Cu(t, 1, 8) : 3;
  }
  function yr(e = {}) {
    if (
      Object.prototype.hasOwnProperty.call(e, "overlayMode") ||
      Object.prototype.hasOwnProperty.call(e, "overlayOpacity") ||
      Object.prototype.hasOwnProperty.call(e, "overlayFontSize") ||
      Object.prototype.hasOwnProperty.call(e, "overlayFontFamily") ||
      Object.prototype.hasOwnProperty.call(
        e,
        "overlayEqualBilingualFontSize",
      ) ||
      Object.prototype.hasOwnProperty.call(e, "overlayOriginalColor") ||
      Object.prototype.hasOwnProperty.call(e, "overlayTranslationColor")
    ) {
      if (
        ((F.mode = or(e.overlayMode, F.mode)),
        (F.opacity = rr(e.overlayOpacity ?? F.opacity)),
        (F.fontSize = lr(e.overlayFontSize ?? F.fontSize)),
        (F.fontFamily = dr(e.overlayFontFamily ?? F.fontFamily)),
        (F.equalBilingualFontSize = Boolean(e.overlayEqualBilingualFontSize)),
        (F.originalColor = ur(
          e.overlayOriginalColor ?? F.originalColor,
          "#d8e2f2",
        )),
        (F.translationColor = ur(
          e.overlayTranslationColor ?? F.translationColor,
          "#ffffff",
        )),
        (F.subtitleMaxRows = 2),
        ci(),
        "side" === F.mode)
      )
        return (
          (F.layout.width < w || F.layout.width > 520) &&
            (F.layout.width = 380),
          void (
            F.layout.height < T &&
            (F.layout.height = Math.round(
              Cu(0.72 * window.innerHeight, T, window.innerHeight - 24),
            ))
          )
        );
      "large" !== F.mode && F.layout.height < M && (F.layout.height = 132);
    }
  }
  function pr(e = {}, t = {}) {
    if (t.sessionId && F.sessionId && t.sessionId !== F.sessionId)
      return { ok: !0, ignored: !0, reason: "stale-session" };
    const previousChatLanguage = chatSourceLanguage();
    const n = Xt(),
      a = !1 !== F.config?.mseSeekCatchupEnabled,
      i = Boolean(F.sync.singleTabMediaSync);
    if (
      ((F.config = { ...(F.config || {}), ...e }),
      !n &&
        Xt() &&
        (Ka(),
        (F.sync.pendingCachedReplayActivation = !1),
        Ja("subtitle.cache.disabled", { reason: "config-update" }, "info")),
      "source" === F.role)
    )
      return (vr(Yd(), "config-update"), { ok: !0, role: F.role });
    (yr(F.config),
      (function (e = {}) {
        const t = F.sync.enabled,
          n = F.sync.singleTabMediaSync,
          a =
            !1 !== e.syncEnabled &&
            Boolean(
              e.videoSyncEnabled ?? e.youtubeSyncEnabled ?? e.syncEnabled,
            ),
          i = Boolean(e.singleTabMediaSync || e.youtubeVodSingleTabSync) && !a,
          s = Cu(
            Number(e.syncDelaySeconds || e.youtubeSyncDelaySeconds || 6) || 6,
            2,
            A,
          ),
          r = Cu(
            Number(
              e.syncSubtitleOffsetSeconds || e.subtitleOffsetSeconds || 0,
            ) || 0,
            -2,
            2,
          ),
          o =
            "auto" ===
            String(
              e.syncDelayMode || e.youtubeSyncDelayMode || "fixed",
            ).toLowerCase()
              ? "auto"
              : "fixed",
          l = e.videoPlatform || F.sync.platform || nc(location.href);
        ((F.sync.platform = l),
          (F.sync.enabled = (a || i) && tc()),
          (F.sync.singleTabMediaSync = F.sync.enabled && i),
          (F.sync.mode = o),
          (F.sync.fixedDelaySeconds = s),
          (F.sync.adaptiveDelayEnabled =
            Boolean(e.adaptiveSyncDelayEnabled) && !i),
          (F.sync.subtitleBufferTargetSegments = mr(
            e.subtitleBufferTargetSegments,
          )),
          (F.sync.subtitleOffsetSeconds = r),
          (F.sync.lastLatencyProviderKey = Dd(
            e.provider || F.sync.lastLatencyProviderKey,
          )),
          (F.sync.sourcePreloadEnabled = !1),
          (F.sync.sourcePreloadMaxLeadSeconds = Ir(
            e.sourcePreloadMaxLeadSeconds,
          )),
          (F.sync.sourcePreloadPlaybackRate = 1),
          !n &&
            F.sync.singleTabMediaSync &&
            ((F.sync.singleTabMseFirstCueShown = !1),
            (F.sync.singleTabMseInitialCueShortcutDisabled = !1),
            (F.sync.subtitleBufferPrimed = !1)),
          F.sync.delayArmed
            ? "auto" === o && (F.sync.recommendedDelaySeconds = Md())
            : ((F.sync.targetDelaySeconds = s),
              F.sync.delayBuffering && Ec(F.sync.delayBuildProgressSeconds, s)),
          !t && F.sync.enabled
            ? ((F.sync.ready = !1),
              (F.sync.status = F.sync.singleTabMediaSync
                ? "單分頁音軌對齊準備中"
                : "等待影片 live buffer"))
            : F.sync.enabled ||
              ((F.sync.status = ""),
              (F.sync.ready = !1),
              (F.sync.delayBuffering = !1),
              (F.sync.adaptiveSubtitleHold = !1)));
      })(F.config));
    const s = Boolean(
      a &&
        !1 === F.config.mseSeekCatchupEnabled &&
        String(F.sync.mseStartupWaitReason || "").includes("seek"),
    );
    if (
      (s && Go(vu(F.sync.mseStartupWaitTargetMediaTime), "config-disabled"), !s)
    ) {
      const e = Boolean(!i && F.sync.singleTabMediaSync);
      F.sync.singleTabMediaSync && !e
        ? Ja(
            "mse.single_tab_startup.config_update_preserved",
            {
              initialPlaybackMediaTime: vu(F.config?.initialPlaybackMediaTime),
              viewerMediaTime: vu(Yd()?.currentTime),
              waitActive: Boolean(F.sync.mseStartupWaitActive),
              waitReleased: Boolean(F.sync.mseStartupWaitReleased),
              gateActive: Boolean(F.sync.singleTabMseStartupGate?.active),
              gatePhase: ku(F.sync.singleTabMseStartupGate?.phase || ""),
            },
            "info",
          )
        : ll("config-update", { retry: !0 });
    }
    return (
      previousChatLanguage !== chatSourceLanguage() && resetChatForLanguageChange(),
      F.sync.enabled ? qr() : (Or(), Kr(Yd())),
      t.requiresRestart &&
        (F.status = "設定已套用；音訊管線設定需重新啟動字幕後生效"),
      ei(),
      { ok: !0, role: F.role }
    );
  }
  function gr() {
    ((Te = !1), (ke = 0), (xe = null), (Ae = ""), (we = !1));
  }
  function fr(e = null, t = "startup-capture-hold") {
    if (!Te) return !1;
    const n = e || Yd();
    if (!n) return !1;
    const a = vu(xe),
      i = vu(n.currentTime);
    null !== a && (null === i || Math.abs(i - a) > _) && cd(n, a);
    try {
      n.paused || n.pause();
    } catch {
      return !1;
    }
    return ((we = !0), Boolean(n.paused));
  }
  function Sr(e = {}) {
    (Se && (window.clearInterval(Se), (Se = null)),
      Rr(),
      Tr(),
      wr(),
      e.preserveMirrorCaptureLayout || ft(e.reason || "source-probe-stopped"));
  }
  function hr() {
    const e = F.config || {};
    return Boolean(
      "source" === F.role &&
        F.sessionId &&
        e.syncEnabled &&
        !e.singleTabMediaSync &&
        (e.mseAudioBufferEnabled ||
          "mse-audio-buffer" === e.audioInputMode ||
          !0 === e.mirrorDelayEnabled),
    );
  }
  function br() {
    const e = F.config || {};
    return Boolean(
      "source" === F.role &&
        F.sessionId &&
        !0 === e.liveSharedEnabled &&
        !0 === e.liveSharedConsumer &&
        e.syncEnabled &&
        !e.singleTabMediaSync,
    );
  }
  function vr(e = null, t = "source-audio") {
    return (
      !!e &&
      (br()
        ? (function (e = null, t = "shared-live-consumer") {
            if (!br() || !e) return !1;
            const n = Mr(e);
            let a = !1;
            try {
              e.muted || ((e.muted = !0), (a = !0));
            } catch {
              return !1;
            }
            return (
              a &&
                n &&
                !n.reported &&
                ((n.reported = !0),
                Ja("sync.shared_live_consumer.source_muted", {
                  reason: t,
                  originalMuted: n.muted,
                  originalVolume: n.volume,
                })),
              a
            );
          })(e, t)
        : hr()
          ? (function (e = null, t = "source-capture") {
              if (!hr() || !e) return !1;
              const n = Mr(e);
              let a = !1;
              try {
                (e.muted && ((e.muted = !1), (a = !0)),
                  Number(e.volume) <= 0 && ((e.volume = 1), (a = !0)));
              } catch {
                return !1;
              }
              return (
                a &&
                  n &&
                  !n.reported &&
                  ((n.reported = !0),
                  Ja(
                    "sync.source_capture.audio_enabled",
                    {
                      reason: t,
                      originalMuted: n.muted,
                      originalVolume: n.volume,
                      currentMuted: Boolean(e.muted),
                      currentVolume: vu(e.volume),
                    },
                    "warn",
                  )),
                a
              );
            })(e, t)
          : wr())
    );
  }
  function Mr(e) {
    return e
      ? (Re?.video !== e &&
          (wr(),
          (Re = {
            video: e,
            muted: Boolean(e.muted),
            volume: Number.isFinite(Number(e.volume)) ? Number(e.volume) : 1,
            reported: !1,
          })),
        Re)
      : null;
  }
  function wr() {
    const e = Re;
    if (((Re = null), !e?.video)) return !1;
    try {
      return ((e.video.muted = e.muted), (e.video.volume = e.volume), !0);
    } catch {
      return !1;
    }
  }
  function Tr() {
    if ((De && (window.clearInterval(De), (De = null)), Le)) {
      try {
        Le.disconnect();
      } catch {}
      Le = null;
    }
    Be = "";
  }
  function kr() {
    if ("source" !== F.role || !F.sessionId) return !1;
    const e = F.config || {};
    return (
      !(
        !e.nativeStreamDelayEnabled ||
        !["instagram-native", "twitch-hls"].includes(e.nativeStreamDelayKind)
      ) ||
      (["instagram", "twitch"].includes(e.videoPlatform) &&
        "mirror-delay" === e.captionMode)
    );
  }
  function xr(e = "poll", t = {}) {
    const n = Pd(),
      a = (n.nativeMediaCandidates || [])
        .filter((e) => e?.type && "blob" !== e.type && e.url)
        .slice(0, 10),
      i = n.nativeCandidateDiagnostics || null;
    if (!a.length) {
      if (t.force || "start" === e || "request" === e) {
        const a = `empty:${e}:${JSON.stringify(i || {})}`;
        (a !== Be || t.force) &&
          ((Be = a),
          Ja(
            "native.candidates.empty",
            {
              reason: e,
              pageUrl: location.href,
              platform: n.platform,
              hasVideo: !0 === n.hasVideo,
              isLiveStream: !0 === n.isLiveStream,
              candidateDiagnostics: i,
            },
            "warn",
          ));
      }
      return { count: 0, candidates: [], candidateDiagnostics: i };
    }
    const s = a
      .map((e) => `${e.type}:${e.url}:${e.manifestSignature || ""}`)
      .join("|");
    return s !== Be || t.force
      ? ((Be = s),
        Ja(
          "native.candidates.detected",
          {
            reason: e,
            count: a.length,
            types: Ar(a, "type"),
            sources: Ar(a, "source"),
            hasDash: a.some((e) => "dash" === e.type),
            hasHls: a.some((e) => "hls" === e.type),
            hasMp4: a.some((e) => "mp4" === e.type),
            hasInlineManifest: a.some((e) => !0 === e.inlineManifest),
            candidateDiagnostics: i,
            pageUrl: location.href,
          },
          "info",
        ),
        chrome.runtime
          .sendMessage({
            type: "LIVE_SUBTITLE_NATIVE_CANDIDATES",
            sessionId: F.sessionId,
            role: "source",
            pageUrl: location.href,
            reason: e,
            capturedAtMs: Date.now(),
            pageInfo: {
              platform: n.platform,
              isLiveStream: n.isLiveStream,
              hasVideo: n.hasVideo,
              timing: n.timing,
              nativeCandidateDiagnostics: i,
            },
            nativeMediaCandidates: a,
          })
          .catch(() => {}),
        { count: a.length, candidates: a, candidateDiagnostics: i })
      : {
          count: a.length,
          candidates: a,
          candidateDiagnostics: i,
          skipped: !0,
        };
  }
  function Ar(e = [], t = "") {
    return [
      ...new Set(
        e.map((e) => String(e?.[t] || "").slice(0, 80)).filter(Boolean),
      ),
    ].slice(0, 8);
  }
  function Cr() {
    const e = Yd();
    if (e && !e.paused)
      try {
        e.pause();
      } catch {}
  }
  function Rr() {
    (ve && (window.clearInterval(ve), (ve = null)), (Me = 0));
  }
  function Dr(e = "source-wake", t = 8e3) {
    if ("source" !== F.role || !F.sessionId) return !1;
    const n = Math.max(300, Number(t) || 8e3);
    return (
      (Me = Math.max(Me || 0, Date.now() + n)),
      Lr(e)
        ? (Rr(), !0)
        : (ve ||
            (ve = window.setInterval(() => {
              Date.now() > Me
                ? (Rr(),
                  _r(Yd(), { sourceWakeReason: e, sourceWakeExpired: !0 }))
                : Lr(e) && Rr();
            }, 300)),
          !0)
    );
  }
  function Lr(e = "source-wake") {
    if ("source" !== F.role || !F.sessionId) return !0;
    if (!dc()) return !1;
    const t = Yd();
    if (!t) return !1;
    if (Te) return (fr(t, e), !0);
    let n = !1;
    try {
      if (t.paused) {
        n = !0;
        const a = t.play();
        a?.then
          ? a
              .then(() => {
                _r(t, {
                  sourceWakeReason: e,
                  sourceWakePlayed: !0,
                  pauseContinuationUntilMs: Ie || null,
                });
              })
              .catch(() => {})
          : a?.catch && a.catch(() => {});
      }
    } catch {
      n = !0;
    }
    return (
      _r(t, {
        sourceWakeReason: e,
        sourceWakeAttempted: n,
        pauseContinuationUntilMs: Ie || null,
      }),
      !t.paused
    );
  }
  function Br(e) {
    const t = Math.round(Number(e));
    return !Number.isFinite(t) || t <= 0 ? 0 : Math.min(t, 6e4);
  }
  function Er(e, t = {}) {
    const n = Br(e),
      a = Math.max(0, vu(t.targetDelaySeconds) || 0),
      i = vu(t.actualDelaySeconds),
      s = Cu(vu(t.sourcePlaybackRate) || 1, 0.25, 4);
    if (!n || null === i)
      return {
        requestedMs: n,
        continuedLoadingMs: n,
        currentLeadSeconds: i,
        maximumLeadSeconds: a + n / 1e3,
        capped: !1,
      };
    const r = a + n / 1e3,
      o = Math.max(0, r - Math.max(0, i)),
      l = Math.min(n, Math.max(0, Math.round((o / s) * 1e3)));
    return {
      requestedMs: n,
      continuedLoadingMs: l,
      currentLeadSeconds: Math.max(0, i),
      maximumLeadSeconds: r,
      capped: l < n,
    };
  }
  function Pr(e = null, t = 6e4, n = null) {
    const a = Date.now(),
      i = e ? Qd("source", e) : F.sync.sourceTiming,
      s = Boolean(i?.isLiveStream || n?.isLiveStream),
      r = vu(i?.wallTimeMs),
      o = i?.href || "",
      l = n?.href || location.href;
    let d = null;
    if (
      Boolean(
        i &&
          !1 !== i.found &&
          null !== r &&
          a - r >= -1e3 &&
          a - r <= 2500 &&
          (!o || !l || uc(o, l)),
      )
    ) {
      const e = Wl(i, a),
        t = Wl(n, a),
        r = s ? ("display" === F.role ? Zl(e, i, n, a) : null) : e;
      null !== r && null !== t && (d = Math.max(0, r - t));
    }
    return Er(t, {
      targetDelaySeconds:
        mn([
          n?.targetDelaySeconds,
          F.sync.lockedDelaySeconds,
          F.sync.targetDelaySeconds,
          F.sync.fixedDelaySeconds,
          F.config?.syncDelaySeconds,
        ]) || 0,
      actualDelaySeconds: d,
      sourcePlaybackRate: vu(i?.playbackRate ?? e?.playbackRate) || 1,
    });
  }
  function Ir(e) {
    const t = Number(e);
    return Number.isFinite(t) ? Cu(t, 10, 60) : 60;
  }
  function Ur() {
    (Pe && (window.clearTimeout(Pe), (Pe = null)), (Ie = 0));
  }
  function _r(e = null, t = {}) {
    chrome.runtime
      .sendMessage({
        type: "LIVE_SUBTITLE_MEDIA_TIMING",
        sessionId: F.sessionId,
        role: "source",
        timing: { ...Qd("source", e || void 0), ...t },
      })
      .catch(() => {});
  }
  function qr() {
    (Or(), Vr(), (He = window.setInterval(Vr, 250)));
  }
  function Or() {
    (He && (window.clearInterval(He), (He = null)), jr());
  }
  function Vr() {
    if (!F.sync.enabled) return;
    if (
      (Ga(),
      !(function () {
        const e = F.config?.pageUrl || F.sync.sourceTiming?.href || "",
          t = Va(
            F.config?.viewerMediaContextKey ||
              F.config?.sourceMediaContextKey ||
              "",
          ),
          n = yc();
        if (t && n) {
          if (t === n) return !0;
          if (pc(t) && pc(n))
            return (
              No("display-media-context-change"),
              cc(),
              Gr({
                ready: !1,
                status: F.sync.singleTabMediaSync
                  ? "影片已切換，正在準備新字幕"
                  : "viewer 已切換影片，正在同步 source",
              }),
              !1
            );
        }
        return (
          !!uc(e, location.href) ||
          (No("display-media-context-change"),
          cc(),
          Gr({
            ready: !1,
            status: F.sync.singleTabMediaSync
              ? "影片已切換，正在準備新字幕"
              : "viewer 已切換影片，正在同步 source",
          }),
          !1)
        );
      })())
    )
      return;
    const e = Yd();
    if (!e) return void Gr({ ready: !1, status: "等待影片" });
    let t = Qd("viewer", e);
    (Kr(e),
      (function (e, t, n = Date.now()) {
        const a = vu(F.sync.untrustedViewerReloadStartedAtMs) || 0,
          i = vu(F.sync.untrustedViewerReloadExpectedMediaTime),
          s = vu(t);
        if (!a || null === i || null === s) return !1;
        const r = Math.max(0, n - a),
          o = Math.max(O, Math.min(12, r / 1e3 + 2));
        if (s <= V || Math.abs(s - i) > o) return !1;
        const l = Math.max(
          0,
          Number(F.sync.untrustedViewerReloadRecoveryAttempts) || 0,
        );
        (rd(s, e || Xe, n),
          to(),
          Ja(
            "sync.viewer_reload_seek.recovered",
            {
              reason: "sync-monitor",
              viewerMediaTime: yn(s),
              expectedMediaTime: yn(i),
              elapsedMs: r,
              recoveryAttempts: l,
            },
            "info",
          ));
      })(e, t.currentTime));
    const n = zr(e, t, Date.now(), "sync-monitor"),
      a = yd(e, t);
    a && (t = Qd("viewer", e));
    const i = !a && !n && id(t, "sync-monitor");
    if (
      !(a || n || i) &&
      ld(t.currentTime, "sync-monitor") &&
      (function (e, t = null, n = "sync-monitor") {
        if ("display" !== F.role || !F.sync.enabled) return !1;
        if (
          !F.sync.singleTabMediaSync &&
          (F.sync.pendingViewerSeek || F.sync.delayBuffering)
        )
          return !1;
        const a = vu(F.sync.lastViewerTimelineJumpAtMs) || 0;
        if (!a || a === (vu(F.sync.lastViewerTimelineJumpHandledAtMs) || 0))
          return !1;
        const i =
          vu(t?.currentTime) ??
          vu(e?.currentTime) ??
          vu(F.sync.lastViewerTimelineJumpTo);
        if (null === i) return !1;
        if (!0 === t?.isLiveStream && !Ql(i, t))
          return (
            (F.sync.lastViewerTimelineJumpHandledAtMs = a),
            Jl(i, t, `${n}:timeline-jump`),
            !1
          );
        const s = Date.now();
        return F.sync.singleTabMediaSync
          ? ((F.sync.lastViewerTimelineJumpHandledAtMs = a),
            lo(e, i, s, {
              eventType: "timeline-jump",
              detectionSource: `${n}:timeline-jump`,
              fromMediaTime: vu(F.sync.lastViewerTimelineJumpFrom),
            }))
          : uo(s, i, "timeline-jump")
            ? ((F.sync.lastViewerTimelineJumpHandledAtMs = a), !1)
            : no(e, i, `${n}:timeline-jump`, s)
              ? ((F.sync.lastViewerTimelineJumpHandledAtMs = a), !0)
              : ((F.sync.lastViewerTimelineJumpHandledAtMs = a),
                Ja(
                  "sync.viewer_seek.detected_from_timeline_jump",
                  {
                    reason: n,
                    fromMediaTime: vu(F.sync.lastViewerTimelineJumpFrom),
                    targetMediaTime: i,
                    jumpSeconds: Math.abs(
                      i - (vu(F.sync.lastViewerTimelineJumpFrom) ?? i),
                    ),
                    pendingViewerSeek: Boolean(F.sync.pendingViewerSeek),
                    delayBuffering: Boolean(F.sync.delayBuffering),
                  },
                  "warn",
                ),
                oo(e, i, "viewer-seeking-timeline-jump", s, {
                  skipTimelineJumpNote: !0,
                }));
      })(e, t, "sync-monitor")
    )
      return;
    if (
      (il(e, "sync-monitor") && (t = Qd("viewer", e)),
      (F.sync.viewerMediaTime = t.currentTime),
      (F.sync.viewerWallTimeMs = t.wallTimeMs || Date.now()),
      (F.sync.viewerPlaybackRate = t.paused ? 0 : t.playbackRate || 1),
      (F.sync.liveEdgeSeconds = t.liveEdgeSeconds),
      t.isLiveStream
        ? (F.sync.actualDelaySeconds = t.actualDelaySeconds)
        : F.sync.sourceTiming ||
          F.sync.delayArmed ||
          (F.sync.actualDelaySeconds = null),
      (F.sync.viewerAdPlaying = Boolean(t.adPlaying)),
      (function (e, t, n = Date.now()) {
        const a = Boolean(
            "display" === F.role &&
              F.sync.singleTabMediaSync &&
              ya() &&
              F.mseAudio.enabled &&
              !0 !== t?.isLiveStream,
          ),
          i = Boolean(!F.sync.singleTabMediaSync && F.sync.delayArmed),
          s = Boolean(
            F.sync.mseStartupWaitActive ||
              F.sync.delayBuffering ||
              F.sync.adaptiveSubtitleHold ||
              F.sync.timelineGapHold?.pausedViewer ||
              F.sync.mseSubtitleCoverageHold?.pausedViewer ||
              F.sync.subtitleSeekGuard?.active ||
              n < (vu(F.sync.startupSeekGuardUntilMs) || 0),
          );
        if (
          !F.sync.enabled ||
          (!i && !a) ||
          (a && !F.sync.ready) ||
          F.sync.userPaused ||
          F.sync.pendingViewerSeek ||
          s ||
          F.sync.adHold ||
          F.sync.viewerAdPlaying ||
          Xr(n) ||
          eo("pause", n) ||
          t.paused ||
          t.seeking ||
          t.ended ||
          t.adPlaying ||
          !0 === t.isLiveStream
        )
          return ($r(null, n), !1);
        const r = vu(t.currentTime);
        if (null === r) return ($r(null, n), !1);
        const o = vu(F.sync.viewerStallTrackMediaTime);
        if (null === o || Math.abs(r - o) > 0.4) return ($r(r, n), !1);
        const l = n - (vu(F.sync.viewerStallTrackAtMs) || n);
        if (l < 8e3) return !1;
        if (n - (vu(F.sync.viewerStallLastRecoveryAtMs) || 0) < 8e3) return !1;
        F.sync.viewerStallLastRecoveryAtMs = n;
        const d = (Number(F.sync.viewerStallRecoveryStage) || 0) + 1;
        F.sync.viewerStallRecoveryStage = d;
        const c = a ? lt(e) : [],
          u = c.length ? c[c.length - 1] : null,
          m = vu(u?.[0]),
          y = vu(u?.[1]),
          p = y ?? vu(F.mseAudio.lastBufferedEnd),
          g = Boolean(a && null !== m && null !== y && r > y + 0.01);
        let f = null,
          S = "";
        if (
          d >= 2 &&
          !0 !== t.isLiveStream &&
          (Number(e?.readyState) >= 2 || g)
        )
          if (g) {
            const e = Math.max(m + 0.01, y - 0.25);
            e < r - 0.01 && ((f = e), (S = "backward-to-buffered-tail"));
          } else {
            const e = Kl(t),
              n =
                null !== e.end
                  ? Math.min(r + 0.1, Math.max(0, e.end - 0.5))
                  : r + 0.1;
            n > r + 0.01 && ((f = n), (S = "forward-nudge"));
          }
        const h = vu(F.mseAudio.lastSegmentAt) || 0;
        (Ja(
          "sync.viewer_playback.stall_recovery",
          {
            stage: d,
            stalledMs: l,
            mode: a ? "single-tab-mse-vod" : "viewer-sync",
            singleTabMediaSync: Boolean(F.sync.singleTabMediaSync),
            viewerMediaTime: yn(r),
            actualDelaySeconds: yn(F.sync.actualDelaySeconds),
            readyState: Number(t?.readyState ?? e?.readyState) || 0,
            networkState: Number(t?.networkState ?? e?.networkState) || 0,
            appendCount: Math.max(0, Number(F.mseAudio.appendCount) || 0),
            segmentCount: Math.max(0, Number(F.mseAudio.segmentCount) || 0),
            lastSegmentAgeMs: h ? Math.max(0, n - h) : null,
            bufferedEnd: yn(p),
            bufferedRangeStart: yn(m),
            playheadPastBufferedEnd: g,
            recoverySeekTarget: yn(f),
            recoverySeekDirection: S,
            bufferedLeadSeconds: null === p ? null : yn(Math.max(0, p - r)),
          },
          "warn",
        ),
          So());
        try {
          const t = e.play();
          t?.catch && t.catch(() => {});
        } catch {}
        null !== f && cd(e, f, { forceInternal: a });
      })(e, t),
      (function (e, t = "sync-tick") {
        if (
          !ya() ||
          !F.sync.enabled ||
          !F.sync.ready ||
          null !== Ze ||
          F.sync.singleTabMediaSync ||
          !Na() ||
          !Array.isArray(F.subtitleTimelineCache) ||
          !F.subtitleTimelineCache.length
        )
          return !1;
        const n = vu(e) ?? td();
        if (null === n) return !1;
        const a = Math.max(12, vu(vd()) || 6),
          i = Array.isArray(F.segmentQueue) ? F.segmentQueue : [],
          s = [F.activeSegment, ...i].filter(Boolean),
          r = [];
        let o = 0;
        for (const e of Da(F.subtitleTimelineCache)) {
          const t = Aa(e),
            l = Ca(e) ?? t;
          if (
            null !== t &&
            null !== l &&
            !(
              l < n - 0 ||
              t > n + a ||
              bn(e) ||
              (F.activeSegment && Jt(F.activeSegment, e)) ||
              vn(e).reason ||
              hn(i, e)
            )
          )
            if (_a(e, s).skip) o += 1;
            else if ((r.push(e), s.push(e), r.length >= 1800)) break;
        }
        const l = r.map((e) =>
            gn({ ...e, cacheReplay: !1, timelineRecovery: !0 }, Date.now()),
          ),
          d =
            Date.now() - (vu(F.sync.lastTimelineOverlapSkipLogAtMs) || 0) >=
            5e3;
        o > 0 &&
          (l.length || d) &&
          ((F.sync.lastTimelineOverlapSkipLogAtMs = Date.now()),
          Ja(
            "subtitle.timeline.skip_overlapping_version",
            {
              reason: t,
              viewerMediaTime: yn(n),
              skippedSegments: o,
              occupiedSegments: s.length,
              cacheSegments: F.subtitleTimelineCache.length,
            },
            "info",
          ));
        let c = !1;
        if (l.length) {
          !(function (e = [], t = null) {
            const n = Array.isArray(e) ? e.filter(Boolean) : [];
            if (!n.length) return Pa();
            const a = Pa(),
              i = vu(a?.startedAtMs),
              s = Ea(
                [...(a?.segments || []), ...n],
                vu(a?.targetMediaTime) ?? vu(t),
              );
            s && null !== i && (s.startedAtMs = i);
          })(l, n);
          const e = fn(i, l);
          Yn(e) !== Yn(i) &&
            ((F.segmentQueue = e),
            (F.lastQueueSignature = Yn(e)),
            (F.subtitleDisplayStats.queuedSegments += Math.max(
              0,
              e.length - i.length,
            )),
            (F.subtitleHadContent = !0),
            (F.subtitleFading = !1),
            (F.subtitleDisplayBlank = !1),
            (c = !0),
            Ja(
              "subtitle.timeline.reconciled",
              {
                reason: t,
                viewerMediaTime: yn(n),
                recoveredSegments: l.length,
                queueLength: e.length,
                firstRecoveredMediaTime: yn(Aa(l[0])),
                lastRecoveredMediaTime: yn(Ca(l[l.length - 1])),
              },
              "warn",
            ));
        }
        const u = Ca(F.activeSegment),
          m = null !== u && n >= u - 0 && aa(F.activeSegment) <= 0;
        Boolean(F.segmentQueue.length && (!F.activeSegment || !ye || m)) &&
          kn();
      })(t.currentTime, "sync-monitor"),
      F.sync.singleTabMediaSync)
    )
      return void (function (e) {
        (F.sync.singleTabMseStartupGate?.active
          ? ((F.sync.ready = !1),
            (F.sync.viewerMediaTime =
              vu(e.currentTime) ?? F.sync.viewerMediaTime),
            (F.sync.viewerWallTimeMs = Date.now()),
            (F.sync.viewerPlaybackRate = e.paused
              ? 0
              : vu(e.playbackRate) || 1),
            (F.sync.status = jo()),
            Jo("sync-tick"))
          : ((F.sync.ready = null !== e.currentTime),
            (F.sync.status = e.isLiveStream
              ? "直播：單分頁音軌對齊"
              : "一般影片：單分頁音軌對齊")),
          (F.sync.lastMonitorAt = Date.now()),
          F.sync.singleTabMseStartupGate?.active ||
            F.sync.cachedSubtitleReplay?.active ||
            Ro(vu(e.currentTime), "single-tab-starved"),
          chrome.runtime
            .sendMessage({
              type: "LIVE_SUBTITLE_MEDIA_TIMING",
              sessionId: F.sessionId,
              role: "single-tab",
              timing: Wr(e),
            })
            .catch(() => {}),
          ei());
      })(t);
    const s = vd();
    F.sync.targetDelaySeconds = s;
    let r = null;
    F.sync.delayArmed ||
      F.sync.pendingViewerSeek ||
      ((r = tl(e, {
        targetDelaySeconds: s,
        buildProgressSeconds: F.sync.delayBuildProgressSeconds,
        builtDelaySeconds: F.sync.actualDelaySeconds,
      })),
      r ||
        (function (e, t = null) {
          if (!e || F.sync.singleTabMediaSync || !F.sync.enabled) return !1;
          if (F.sync.delayArmed || F.sync.pendingViewerSeek) return !1;
          gd(e, t) &&
            ((F.sync.viewerMediaTime =
              vu(e.currentTime) ?? F.sync.viewerMediaTime),
            (F.sync.viewerWallTimeMs = Date.now()),
            (F.sync.viewerPlaybackRate = 0),
            (F.sync.ready = !1));
        })(e, s));
    const o = F.sync.sourceTiming;
    if (o && uc(o.href, location.href)) {
      const n = t.isLiveStream || o.isLiveStream ? "直播" : "一般影片",
        a = (function (e, t = null, n = null, a = "一般影片", i = null) {
          const s = Boolean(t?.adPlaying),
            r = Boolean(n?.adPlaying);
          if (
            ((F.sync.viewerAdPlaying = s),
            (F.sync.sourceAdPlaying = r),
            !s && !r)
          )
            return F.sync.adHold
              ? ((F.sync.adHold = !1),
                (F.sync.adHoldStartedAt = 0),
                (F.sync.adStateKey = ""),
                (F.sync.delayArmed = !1),
                (F.sync.delayBuffering = !0),
                (F.sync.delayBufferStartedAt = Date.now()),
                (F.sync.lockedDelaySeconds = null),
                (F.sync.actualDelaySeconds = null),
                (F.sync.delayAnchorMediaTime = null),
                (F.sync.delayAnchorSourceMediaTime = null),
                Bc(i),
                e && !F.sync.userPaused && gd(e, i),
                Ja("sync.ad_hold.end", { label: a, targetDelaySeconds: vu(i) }),
                { ready: !1, status: `${a}：廣告結束，重新建立字幕延遲` })
              : null;
          const o = `${r ? "source" : ""}:${s ? "viewer" : ""}`;
          ((F.sync.adHold && F.sync.adStateKey === o) ||
            ((F.sync.adHold = !0),
            (F.sync.adHoldStartedAt = Date.now()),
            (F.sync.adStateKey = o),
            (F.sync.delayArmed = !1),
            (F.sync.lockedDelaySeconds = null),
            (F.sync.actualDelaySeconds = null),
            (F.sync.delayAnchorMediaTime = null),
            (F.sync.delayAnchorSourceMediaTime = null),
            ho(),
            Ja(
              "sync.ad_hold.start",
              {
                label: a,
                sourceAd: r,
                viewerAd: s,
                sourceReason: n?.adReason || "",
                viewerReason: t?.adReason || "",
                sourceSkippable: Boolean(n?.adSkippable),
                viewerSkippable: Boolean(t?.adSkippable),
              },
              "warn",
            )),
            r && !s && gd(e, i));
          return {
            ready: !1,
            status:
              r && s
                ? `${a}：廣告播放中，暫停字幕同步`
                : r
                  ? `${a}：source 廣告中，暫停字幕音訊擷取`
                  : `${a}：viewer 廣告中，等待正片恢復`,
          };
        })(e, t, o, n, s);
      if (a)
        return (
          (F.sync.ready = a.ready),
          (F.sync.status = a.status),
          (F.sync.lastMonitorAt = Date.now()),
          void ei()
        );
      if (F.sync.userPaused)
        return void (function (e, t, n = "一般影片") {
          const a = Zl(Wl(t), t, e),
            i = vu(e?.currentTime),
            s =
              null !== a && null !== i
                ? Math.max(0, a - i)
                : F.sync.actualDelaySeconds;
          null !== s && ((F.sync.actualDelaySeconds = s), Nr(e, s, a));
          const r =
            vu(F.sync.delayBuildTargetSeconds) ??
            vu(F.sync.targetDelaySeconds) ??
            vu(F.sync.fixedDelaySeconds);
          if (
            F.sync.delayBuffering &&
            null !== s &&
            null !== r &&
            Ec(s, r) >= r - U
          ) {
            const e =
              "fixed" === F.sync.mode
                ? Math.max(r, F.sync.fixedDelaySeconds)
                : r;
            return (
              (F.sync.delayArmed = !0),
              (F.sync.delayArmedAt = Date.now()),
              (F.sync.delayBuffering = !1),
              (F.sync.delayBufferStartedAt = 0),
              (F.sync.delayBuildTargetSeconds = e),
              (F.sync.delayBuildProgressSeconds = e),
              (F.sync.lockedDelaySeconds = e),
              (F.sync.targetDelaySeconds = e),
              (F.sync.ready = !0),
              (F.sync.lastMonitorAt = Date.now()),
              (F.sync.status = "字幕準備好了，按播放後繼續同步"),
              void ei()
            );
          }
          ((F.sync.ready = !0),
            (F.sync.lastMonitorAt = Date.now()),
            (F.sync.status = (function (e = "一般影片", t = null) {
              const n = Date.now(),
                a = vu(F.sync.pauseContinuedLoadingUntilMs) || 0,
                i = Math.ceil(Math.max(0, a - n) / 1e3);
              return !t?.paused && i > 0
                ? `${e}：使用者暫停，source 繼續加載 ${fu(i)}`
                : `${e}：使用者暫停，source 已暫停`;
            })(n, t)),
            ei());
        })(t, o, n);
      const i = (function (e, t, n, a = "一般影片", i = null) {
        const s = vu(t?.currentTime) ?? td();
        if (
          (F.sync.cachedSubtitleReplay?.active || Ro(s, "sync-tick-starved"),
          Vl())
        )
          return (xo(), null);
        const r = F.sync.cachedSubtitleReplay;
        if (!r?.active) return null;
        const o = s;
        if (null === o) return null;
        !(function (e) {
          const t = F.sync.cachedSubtitleReplay;
          if (!t?.active) return;
          if ((F.activeSegment ? 1 : 0) + F.segmentQueue.length >= 18) return;
          const n = ko(e);
          if (!n?.queueSegments?.length) return;
          const a = Boolean(t.allowRedisplay),
            i = n.queueSegments
              .filter((e) => !Jt(e, F.activeSegment))
              .filter((t) => a || !Co(t, e))
              .map((e) => gn({ ...e, cacheReplay: !0 }, Date.now())),
            s = fn(F.segmentQueue, i);
          (Yn(s) !== Yn(F.segmentQueue) &&
            ((F.segmentQueue = s), (F.lastQueueSignature = Yn(s))),
            (t.cacheEndMediaTime = n.cacheEndMediaTime));
        })(o);
        const l = vu(ja().lastMediaTime),
          d = Zl(Wl(n), n, t),
          c = null !== d ? Math.max(0, d - o) : F.sync.actualDelaySeconds;
        null !== c && ((F.sync.actualDelaySeconds = c), Nr(t, c, d));
        const u =
          vu(i) ?? F.sync.targetDelaySeconds ?? F.sync.fixedDelaySeconds;
        if (null !== d && c <= u + U) return (xo(), null);
        if (
          null !== l &&
          o > l + m &&
          !F.activeSegment &&
          !F.segmentQueue.length
        )
          return (xo(), null);
        ((F.sync.delayArmed = !0),
          (F.sync.delayBuffering = !1),
          (F.sync.pendingViewerSeek = null),
          (F.sync.ready = !0),
          (F.sync.viewerMediaTime = o),
          (F.sync.viewerWallTimeMs = Date.now()),
          (F.sync.viewerPlaybackRate = t?.paused
            ? 0
            : vu(t?.playbackRate) || 1));
        const y = null === l ? null : Math.max(0, l - o),
          p = Date.now();
        return (
          p - (vu(r.lastStatusAtMs) || 0) >= 1e3 &&
            ((r.lastStatusAtMs = p), (r.cacheEndMediaTime = l)),
          {
            ready: !0,
            status: `${a}：快取字幕回放${null !== y ? ` · 前方 ${Pc(y)}` : ""}`,
          }
        );
      })(0, t, o, n, s);
      if (i)
        return (
          (F.sync.ready = i.ready),
          (F.sync.status = i.status),
          (F.sync.lastMonitorAt = Date.now()),
          void ei()
        );
      if (
        !F.sync.pendingViewerSeek &&
        Date.now() < F.sync.suspendAutoAlignUntilMs
      )
        return (
          (F.sync.ready = !1),
          (F.sync.status = `${n}：偵測跳轉，準備同步 source`),
          (F.sync.lastMonitorAt = Date.now()),
          void ei()
        );
      const r = (function (e, t, n, a = "一般影片") {
        const i = F.sync.pendingViewerSeek;
        if (!i) return null;
        let s = (function (e) {
          const t = F.sync.sourceTiming;
          if (!e || !t || t.seekId !== e.id) return e?.targetMediaTime ?? null;
          const n = vu(t.actualSeekTargetMediaTime),
            a = Zl(n, t, Xl());
          return (
            null !== a &&
              Math.abs(a - e.targetMediaTime) > _ &&
              ((e.targetMediaTime = a),
              (F.sync.viewerMediaTime = a),
              (F.sync.viewerWallTimeMs = Date.now()),
              (F.sync.lastSeekTargetSeconds = a),
              nn(a, e.targetDelaySeconds, "source-actual-seek"),
              (function (e, t = "source-actual-seek") {
                if (!F.sync.mseStartupWaitActive) return !1;
                if (!String(F.sync.mseStartupWaitReason || "").includes("seek"))
                  return !1;
                const n = vu(e);
                if (null === n) return !1;
                const a = vu(F.sync.mseStartupWaitTargetMediaTime);
                !(null !== a && Math.abs(a - n) <= _) &&
                  ((F.sync.mseStartupWaitTargetMediaTime = n),
                  Ja("mse.startup_wait.seek_target_updated", {
                    reason: t,
                    previousTargetMediaTime: a,
                    targetMediaTime: n,
                  }));
              })(a, "source-actual-seek")),
            null !== n && (e.sourceTargetMediaTime = n),
            e.targetMediaTime
          );
        })(i);
        (bo(e, s),
          (function (e, t = null) {
            if (!e || e.sourceSeekAcknowledged) return !1;
            const n = Yl(e.targetMediaTime, F.sync.sourceTiming, t);
            if (
              ((e.sourceTargetResolutionReason = n.reason),
              (e.sourceTargetClamped = n.clamped),
              null === n.sourceTargetMediaTime)
            )
              return !1;
            const a = vu(e.sourceTargetMediaTime);
            ((e.sourceTargetMediaTime = n.sourceTargetMediaTime),
              null === a || Math.abs(a - n.sourceTargetMediaTime));
          })(i, t));
        const r = F.sync.sourceTiming?.seekId === i.id;
        r &&
        (function (e, t = null) {
          if (!e || !t || t.seekId !== e.id) return !1;
          if (!1 === t.seekSucceeded) return !1;
          const n =
            vu(t.actualSeekTargetMediaTime) ??
            vu(e.sourceTargetMediaTime) ??
            vu(e.targetMediaTime);
          if (null === n) return !1;
          const a = Wl(t, Date.now()) ?? vu(t.currentTime);
          return null !== a && Math.abs(a - n) <= 1.25;
        })(i, F.sync.sourceTiming)
          ? (i.sourceSeekAcknowledged = !0)
          : r &&
            (function (e, t = null, n = null) {
              if (!e || !t) return;
              const a = Date.now();
              if (a - (vu(e.lastRejectedSourceSeekLogAtMs) || 0) < 1500) return;
              e.lastRejectedSourceSeekLogAtMs = a;
              const i = Wl(t, a) ?? vu(t.currentTime);
              Ja(
                "sync.viewer_seek.source_ack_rejected",
                {
                  seekId: e.id,
                  targetMediaTime: vu(n) ?? vu(e.targetMediaTime),
                  sourceTargetMediaTime: vu(e.sourceTargetMediaTime),
                  sourceMediaTime: vu(i),
                  currentTime: vu(t.currentTime),
                  actualSeekTargetMediaTime: vu(t.actualSeekTargetMediaTime),
                  requestedTargetMediaTime: vu(t.requestedTargetMediaTime),
                  seekSucceeded: !0 === t.seekSucceeded,
                  seekFailureReason: ku(t.seekFailureReason || ""),
                },
                "warn",
              );
            })(i, F.sync.sourceTiming, s);
        const o = Date.now();
        if (null === vu(i.sourceTargetMediaTime) && zl(F.sync.sourceTiming, t))
          return {
            ready: !1,
            status: `${a}：等待 source / viewer 直播時間軸穩定`,
          };
        !i.sourceSeekAcknowledged &&
          o - i.lastSourceCommandAtMs > 900 &&
          vo(i, t, !1);
        const l = Zl(Wl(F.sync.sourceTiming), F.sync.sourceTiming, t);
        if (null === l)
          return { ready: !1, status: `${a}：跳轉後等待 source 跟跳` };
        if (!i.sourceSeekAcknowledged)
          return { ready: !1, status: `${a}：跳轉後等待 source 確認跳轉` };
        if (l < s - _)
          return { ready: !1, status: `${a}：跳轉後等待 source 跟跳` };
        const d = i.targetDelaySeconds || n,
          c = Math.max(0, l - s),
          u = d;
        ((F.sync.actualDelaySeconds = c),
          (F.sync.targetDelaySeconds = d),
          (F.sync.lockedDelaySeconds = u),
          Nr(t, c, l));
        const m = Ec(c, F.sync.targetDelaySeconds);
        if (c >= F.sync.targetDelaySeconds - U) {
          cl(s, "seek-session-timeline-ready");
          const t = tl(e, {
            targetDelaySeconds: d,
            buildProgressSeconds: m,
            builtDelaySeconds: c,
            reason: "viewer-seek-ready",
          });
          if (t) return t;
          const n = Boolean(F.sync.userPaused);
          return (
            (F.sync.pendingViewerSeek = null),
            (F.sync.delayBuffering = !1),
            (F.sync.delayArmed = !0),
            (F.sync.delayArmedAt = o),
            (F.sync.delayAnchorMediaTime = null),
            (F.sync.delayAnchorSourceMediaTime = null),
            (F.sync.viewerMediaTime = s),
            (F.sync.viewerWallTimeMs = o),
            (F.sync.lockedDelaySeconds = u),
            pd(o),
            fd(e, {
              startupAnchorMediaTime: s,
              startupAnchorReason: "viewer-seek-delay-ready",
            }),
            (F.sync.viewerPlaybackRate = e?.paused
              ? 0
              : Number(e?.playbackRate) || 1),
            {
              ready: !0,
              status: n ? "字幕準備好了，按播放後繼續同步" : Cc(a, c),
            }
          );
        }
        return {
          ready: !1,
          status: `${a}：跳轉後正在努力產生字幕 ${Pc(m)} / ${Pc(F.sync.targetDelaySeconds)}`,
        };
      })(e, t, s, n);
      if (r)
        return (
          (F.sync.ready = r.ready),
          (F.sync.status = r.status),
          (F.sync.lastMonitorAt = Date.now()),
          void ei()
        );
      const l = (function (e, t, n, a = "一般影片") {
        if (!e || !t) return { ready: !1, status: "等待影片" };
        const i = F.sync.sourceTiming;
        if (!i) return { ready: !1, status: "等待來源時間碼" };
        if (!Hr(i)) return { ready: !1, status: "viewer/source 影片不一致" };
        (zr(e, t, Date.now(), "delay-arm"),
          !F.sync.delayArmed &&
            F.sync.delayBuffering &&
            !0 === i.isLiveStream &&
            !0 === t.isLiveStream &&
            null === vu(F.sync.delayAnchorSourceMediaTime) &&
            Fr(i));
        const s = Wl(i),
          r = ed(s),
          o = null === r ? Zl(s, i, t) : null,
          l = r ?? o,
          d = td() ?? vu(t.currentTime);
        if (null === l || null === d)
          return { ready: !1, status: "等待來源時間碼" };
        const c = vu(t.duration),
          u = vu(t.seekableStartSeconds) ?? 0,
          m =
            vu(t.seekableEndSeconds) ??
            (null !== c ? Math.max(0, c - 0.25) : l),
          y = (function ({
            sourceTiming: e,
            viewerTiming: t,
            sourceMediaTime: n,
            targetDelay: a,
            seekableStart: i,
            maxSeekTime: s,
          }) {
            const r = Math.max(0, Number(a) || 0),
              o = n - r,
              l = Cu(o, i, s),
              d = Math.max(0, n - l),
              c = d + E < r,
              u = o < i - E,
              m = Boolean(t?.isLiveStream || e?.isLiveStream) && i > 0.45,
              y = Boolean(e?.paused),
              p = F.sync.delayBuffering
                ? Math.max(
                    0,
                    Date.now() -
                      (vu(F.sync.delayBufferStartedAt) || Date.now()),
                  )
                : 0,
              g = Math.max(2e3, 1e3 * r + 250),
              f = c && u && m,
              S = c && y,
              h = c && p >= g && d >= 0.35,
              b = f || S || h;
            return {
              targetMediaTime: l,
              idealTargetMediaTime: o,
              requestedDelaySeconds: r,
              reachableDelaySeconds: d,
              effectiveDelaySeconds: b ? d : r,
              useReachableDelay: b,
              limitedReason: f
                ? "live-window"
                : S
                  ? "source-paused"
                  : h
                    ? "timeout"
                    : "",
            };
          })({
            sourceTiming: i,
            viewerTiming: t,
            sourceMediaTime: l,
            targetDelay: n,
            seekableStart: u,
            maxSeekTime: m,
          }),
          p = Math.max(0, l - d);
        if (
          (function (
            {
              video: e = null,
              viewerTiming: t = null,
              sourceTiming: n = null,
              sourceMediaTime: a = null,
              viewerMediaTime: i = null,
              targetDelaySeconds: s = null,
              label: r = "直播",
            } = {},
            o = Date.now(),
          ) {
            const l = vu(a),
              d = vu(i),
              c = null !== l && null !== d ? l - d : null;
            if (
              !Boolean(
                F.sync.enabled &&
                  !F.sync.singleTabMediaSync &&
                  F.sync.delayArmed &&
                  !F.sync.pendingViewerSeek &&
                  !F.sync.delayBuffering &&
                  !F.sync.adHold &&
                  !F.sync.userPaused &&
                  !0 === n?.isLiveStream &&
                  !0 === t?.isLiveStream &&
                  null !== c,
              ) ||
              c >= -2.5
            )
              return (qo(), !1);
            if (!F.sync.sourceBehindViewerDetectedAtMs)
              return (
                (F.sync.sourceBehindViewerDetectedAtMs = o),
                (F.sync.sourceBehindViewerSamples = 1),
                Ja(
                  "sync.source_clock.behind_viewer_detected",
                  {
                    label: r,
                    sourceMediaTime: yn(l),
                    viewerMediaTime: yn(d),
                    sourceLeadSeconds: yn(c),
                    targetDelaySeconds: yn(s),
                    sourceCurrentTime: yn(n?.currentTime),
                    viewerCurrentTime: yn(t?.currentTime),
                    timelineOffsetSeconds: yn(
                      F.sync.sourceToViewerTimelineOffsetSeconds,
                    ),
                  },
                  "warn",
                ),
                !1
              );
            F.sync.sourceBehindViewerSamples =
              Math.max(1, Number(F.sync.sourceBehindViewerSamples) || 1) + 1;
            const u = o - F.sync.sourceBehindViewerDetectedAtMs;
            if (F.sync.sourceBehindViewerSamples < 3 || u < 1200) return !1;
            return (
              o - (vu(F.sync.sourceBehindViewerLastRecoveryAtMs) || 0) < 15e3 ||
              ((F.sync.sourceBehindViewerLastRecoveryAtMs = o),
              Ja(
                "sync.source_clock.behind_viewer_recovery",
                {
                  label: r,
                  detectedForMs: u,
                  samples: F.sync.sourceBehindViewerSamples,
                  sourceMediaTime: yn(l),
                  viewerMediaTime: yn(d),
                  sourceLeadSeconds: yn(c),
                  targetDelaySeconds: yn(s),
                  sourceCurrentTime: yn(n?.currentTime),
                  viewerCurrentTime: yn(t?.currentTime),
                  sourceLiveEdgeSeconds: yn(n?.liveEdgeSeconds),
                  viewerLiveEdgeSeconds: yn(t?.liveEdgeSeconds),
                  timelineOffsetSeconds: yn(
                    F.sync.sourceToViewerTimelineOffsetSeconds,
                  ),
                },
                "error",
              ),
              qo(),
              oo(e || Xe, d, "source-clock-behind-viewer", o, {
                skipTimelineJumpNote: !0,
              }))
            );
          })({
            video: e,
            viewerTiming: t,
            sourceTiming: i,
            sourceMediaTime: l,
            viewerMediaTime: d,
            targetDelaySeconds: y.effectiveDelaySeconds,
            label: a,
          })
        )
          return {
            ready: !1,
            status: `${a}：偵測到來源時間軸錯位，正在重新同步`,
          };
        if ((Nr(t, p, l), F.sync.delayArmed)) {
          F.sync.sourceToViewerTimelineOffsetContinuityActive &&
            (F.sync.sourceToViewerTimelineOffsetContinuityDelaySeconds = p);
          const i = (function (e, t, n = "直播", a = null) {
            if (
              !F.sync.adaptiveDelayEnabled ||
              !F.sync.enabled ||
              F.sync.singleTabMediaSync
            )
              return Oo(e, t, n, a, { resume: !1 });
            if (
              !F.sync.delayArmed ||
              F.sync.pendingViewerSeek ||
              F.sync.userPaused ||
              F.sync.viewerPlaybackBlocked
            )
              return null;
            const i = Fn(),
              s = Xc(i),
              r = s.ready,
              o = zn(s, i);
            i > 0 && o && (F.sync.subtitleBufferPrimed = !0);
            const l = Pn(),
              d = qn(i),
              c = l || d,
              u = Ya(F.pendingOriginal || F.draftOriginal || ""),
              m = u || F.sync.adaptiveSubtitleHoldPendingKey || "",
              y = Boolean(m && m === F.sync.adaptiveSubtitleHoldTimedOutKey),
              p =
                F.sync.adaptiveSubtitleHold ||
                In() >= 250 ||
                (d &&
                  (function () {
                    const e = vu(F.sync.speechActivityStartedAt) || 0,
                      t = vu(F.sync.lastSpeechActivityAt) || 0;
                    return e && t ? Math.max(0, t - e) : 0;
                  })() >= 180),
              g = i > 0 && !F.sync.subtitleBufferPrimed && !o,
              f = i > 0 ? (F.sync.adaptiveSubtitleHold ? !o : r <= 0) : !o;
            if (!(i > 0 ? g || f : !o) || y || !p || !c)
              return F.sync.adaptiveSubtitleHold
                ? Oo(e, t, n, a, { resume: !0 })
                : null;
            const S =
                vu(F.sync.lockedDelaySeconds) ??
                vu(F.sync.targetDelaySeconds) ??
                F.sync.fixedDelaySeconds,
              h = vu(F.sync.adaptiveSubtitleHoldStartedAt) || Date.now();
            F.sync.adaptiveSubtitleHold ||
              ((F.sync.adaptiveSubtitleHold = !0),
              (F.sync.adaptiveSubtitleHoldStartedAt = h),
              (F.sync.adaptiveSubtitleHoldPendingKey = u),
              (F.sync.adaptiveSubtitleHoldTargetSeconds = Cu(
                Math.max(S, t) + Kn(i),
                2,
                A,
              )),
              Ja(
                "sync.subtitle_buffer.hold_start",
                {
                  label: n,
                  actualDelaySeconds: t,
                  targetSegments: i,
                  targetBufferSeconds: s.targetSeconds,
                  readyBufferSeconds: s.bufferSeconds,
                  bufferFrontierMediaTime: s.frontierMediaTime,
                  readySegments: r,
                  pending: Boolean(l),
                  recentSpeech: Boolean(d),
                  lockedDelaySeconds: S,
                  targetDelaySeconds: F.sync.adaptiveSubtitleHoldTargetSeconds,
                },
                "warn",
              ));
            const b = vu(F.sync.adaptiveSubtitleHoldTargetSeconds) || S;
            (gd(e, b),
              (F.sync.ready = !1),
              (F.sync.actualDelaySeconds = t),
              (F.sync.targetDelaySeconds = Math.max(
                S,
                Math.min(b, Math.max(t, S)),
              )),
              Ec(t, b));
            if (Math.max(0, (Date.now() - h) / 1e3) >= Kn(i) && !c)
              return (
                (F.sync.adaptiveSubtitleHoldTimedOutKey = m),
                Oo(e, t, n, a, { resume: !0, timedOut: !0 })
              );
            const v = (function (e = Fn()) {
                if (e <= 0) return "";
                const t = Xc(e);
                return t.hasTimedCoverage
                  ? `緩衝 ${Pc(Math.min(t.bufferSeconds, t.targetSeconds))}/${Pc(t.targetSeconds)} · ${t.ready}段`
                  : `緩衝 ${Math.min(t.ready, e)}/${e}`;
              })(i),
              M = c
                ? d
                  ? "有人聲，等字幕完成"
                  : "等待字幕完成"
                : `最多 ${Pc(b)}`;
            return {
              ready: !1,
              status: `${n}：暫停等待字幕生成 ${Pc(t)} / ${M}${v ? ` / ${v}` : ""}`,
            };
          })(e, p, a, y);
          return (
            i ||
            ((F.sync.delayBuffering = !1),
            Bc(),
            (F.sync.actualDelaySeconds = p),
            (F.sync.targetDelaySeconds = F.sync.lockedDelaySeconds ?? n),
            F.sync.viewerPlaybackBlocked && t.paused
              ? { ready: !1, status: "字幕準備好了，請點影片播放以開始同步" }
              : F.sync.userPaused && t.paused
                ? { ready: !1, status: "影片已暫停，字幕最多繼續預載 1 分鐘" }
                : { ready: !0, status: Cc(a, p, y) })
          );
        }
        return (function ({
          video: e,
          sourceTiming: t,
          viewerMediaTime: n,
          sourceMediaTime: a,
          targetInfo: i,
          targetDelay: s,
          seekableStart: r,
          maxSeekTime: o,
          label: l,
        }) {
          const d = Date.now(),
            c = (function (e = {}) {
              const t = Math.max(
                  0,
                  vu(e.effectiveDelaySeconds) ??
                    vu(e.requestedDelaySeconds) ??
                    F.sync.fixedDelaySeconds,
                ),
                n = vu(F.sync.delayBuildTargetSeconds);
              return F.sync.delayBuffering && null !== n
                ? e.useReachableDelay && t < n - E
                  ? t
                  : n
                : t;
            })(i),
            u = !0 === t?.isLiveStream,
            m = vu(e?.currentTime) ?? n;
          if (u && null === m)
            return { ready: !1, status: "等待直播播放器時間碼" };
          let y = vu(F.sync.delayAnchorMediaTime);
          if (
            (null === y &&
              ((y = u
                ? m
                : Cu(
                    (function (e, t) {
                      if (e?.isLiveStream) {
                        const n = vu(e.currentTime),
                          a = vu(F.sync.sourceToViewerTimelineOffsetSeconds);
                        return null !== n && null !== a ? n + a : t;
                      }
                      if (!e?.isLiveStream) {
                        const e = vu(
                          F.config?.initialPlaybackMediaTime ??
                            F.config?.initialMediaTime ??
                            F.config?.pageCurrentTimeSeconds ??
                            F.config?.startSeconds,
                        );
                        if (null !== e) return e;
                      }
                      return t;
                    })(t, a),
                    r,
                    o,
                  )),
              (F.sync.delayAnchorMediaTime = y),
              (F.sync.lastSeekTargetSeconds = y)),
            gd(e, c),
            !u &&
              (null === m || Math.abs(m - y) > 0.45) &&
              ((F.sync.lastDelayCorrectionAt = d),
              (F.sync.lastSeekTargetSeconds = y),
              !cd(e, y)))
          ) {
            const e = Math.max(0, a - (m ?? y));
            return (
              (F.sync.viewerMediaTime = m ?? n),
              (F.sync.viewerWallTimeMs = d),
              (F.sync.viewerPlaybackRate = 0),
              (F.sync.actualDelaySeconds = e),
              (F.sync.targetDelaySeconds = s),
              { ready: !1, status: Dc(l, Ec(e, c), c, i) }
            );
          }
          ((F.sync.viewerMediaTime = y),
            (F.sync.viewerWallTimeMs = d),
            (F.sync.viewerPlaybackRate = 0));
          const p = Math.max(0, a - y),
            g = c;
          ((F.sync.actualDelaySeconds = p),
            F.sync.sourceToViewerTimelineOffsetContinuityActive &&
              (F.sync.sourceToViewerTimelineOffsetContinuityDelaySeconds = p),
            (F.sync.targetDelaySeconds = s));
          const f = Ec(p, c);
          if (p >= c - U) {
            const t = tl(e, {
              targetDelaySeconds: c,
              buildProgressSeconds: f,
              builtDelaySeconds: p,
              targetInfo: i,
            });
            if (t) return t;
            const n = Boolean(F.sync.userPaused);
            if (
              (pd(d),
              (F.sync.delayArmed = !0),
              fd(e, {
                startupAnchorMediaTime: u ? y : null,
                startupAnchorReason: "source-delay-ready",
              }),
              (F.sync.vodAligned = !0),
              (F.sync.delayArmed = !0),
              (F.sync.delayArmedAt = d),
              (F.sync.delayBuffering = !1),
              n)
            ) {
              const e = i.useReachableDelay
                ? c
                : Math.max(c, s, F.sync.fixedDelaySeconds);
              ((F.sync.delayBuildTargetSeconds = e),
                (F.sync.delayBuildProgressSeconds = e));
            } else Bc();
            return (
              (F.sync.delayAnchorMediaTime = null),
              (F.sync.delayAnchorSourceMediaTime = null),
              (F.sync.lockedDelaySeconds = g),
              (F.sync.targetDelaySeconds = s),
              (F.sync.actualDelaySeconds = p),
              (F.sync.viewerMediaTime = y),
              (F.sync.viewerWallTimeMs = d),
              (F.sync.viewerPlaybackRate = e?.paused
                ? 0
                : Number(e?.playbackRate) || 1),
              {
                ready: !0,
                status: n ? "字幕準備好了，按播放後繼續同步" : Cc(l, p, i),
              }
            );
          }
          return { ready: !1, status: Dc(l, f, c, i) };
        })({
          video: e,
          sourceTiming: i,
          viewerMediaTime: d,
          sourceMediaTime: l,
          targetInfo: y,
          targetDelay: n,
          seekableStart: u,
          maxSeekTime: m,
          label: a,
        });
      })(e, t, s, n);
      return (
        (F.sync.ready = l.ready),
        (F.sync.status = l.status),
        (F.sync.lastMonitorAt = Date.now()),
        void ei()
      );
    }
    if (
      !t.isLiveStream ||
      (t.seekable &&
        null !== t.liveEdgeSeconds &&
        null !== t.actualDelaySeconds)
    )
      if (
        (function (e) {
          if (!0 !== e?.isLiveStream) return !1;
          const t = vu(e.actualDelaySeconds);
          return null !== t && t <= 480;
        })(t)
      ) {
        if (!F.sync.delayArmed)
          return (
            (function (e, t, n) {
              if (!0 === t?.isLiveStream) {
                gd(e, n);
                const a = vu(F.sync.delayBufferStartedAt) || Date.now(),
                  i = Math.max(0, (Date.now() - a) / 1e3);
                return (
                  (F.sync.viewerMediaTime =
                    vu(e?.currentTime) ?? t.currentTime),
                  (F.sync.viewerWallTimeMs = Date.now()),
                  (F.sync.viewerPlaybackRate = 0),
                  (F.sync.actualDelaySeconds = i),
                  (F.sync.targetDelaySeconds = n),
                  Ec(i, n),
                  i < n - U
                    ? ((F.sync.ready = !1),
                      void (F.sync.status = Dc("直播", i, n)))
                    : ((F.sync.delayArmed = !0),
                      (F.sync.delayArmedAt = Date.now()),
                      (F.sync.lockedDelaySeconds = n),
                      (F.sync.actualDelaySeconds = n),
                      (F.sync.ready = !0),
                      fd(e, {
                        startupAnchorMediaTime: F.sync.viewerMediaTime,
                        startupAnchorReason: "fixed-live-delay-ready",
                      }),
                      (F.sync.status = Ac(n)),
                      void (F.sync.lastMonitorAt = Date.now()))
                );
              }
              const a = Math.max(
                  t.seekableStartSeconds ?? 0,
                  t.liveEdgeSeconds - n,
                ),
                i = t.actualDelaySeconds,
                s = Math.abs(i - n) <= E;
              if (!(s || cd(e, a)))
                return void Gr({ ready: !1, status: "固定延遲建立中" });
              const r = s ? i : Math.max(0, t.liveEdgeSeconds - a);
              ((F.sync.viewerMediaTime = s ? t.currentTime : a),
                (F.sync.actualDelaySeconds = r),
                (F.sync.targetDelaySeconds = n),
                (F.sync.lockedDelaySeconds = r),
                (F.sync.delayArmed = !0),
                (F.sync.delayArmedAt = Date.now()),
                (F.sync.ready = !0),
                (F.sync.status = Ac(r)),
                (F.sync.lastMonitorAt = Date.now()));
            })(e, t, s),
            void ei()
          );
        ((F.sync.ready = !0),
          (F.sync.status = Ac(t.actualDelaySeconds)),
          (F.sync.lastMonitorAt = Date.now()),
          ei());
      } else Gr({ ready: !1, status: r?.status || "等待來源時間碼" });
    else Gr({ ready: !1, status: "等待影片 live buffer" });
  }
  function $r(e = null, t = Date.now()) {
    ((F.sync.viewerStallTrackMediaTime = vu(e)),
      (F.sync.viewerStallTrackAtMs =
        null === F.sync.viewerStallTrackMediaTime ? 0 : t),
      (F.sync.viewerStallRecoveryStage = 0));
  }
  function Wr(e = {}) {
    const t = F.sync.singleTabMseStartupGate,
      n = t?.active
        ? {
            active: !0,
            phase: t.phase,
            sessionId: F.sessionId,
            mediaContextKey: t.mediaContextKey,
            anchorMediaTime: vu(t.anchorMediaTime),
            remainingMs: Math.max(0, Number(t.deadlineAtMs || 0) - Date.now()),
          }
        : { active: !1 };
    if (!Boolean(e?.paused))
      return (
        (F.sync.singleTabMseInternalPauseUntilMs = 0),
        {
          ...(e || {}),
          captionStartup: n,
          pauseAffectsStt: !0,
          internalPlaybackPause: !1,
        }
      );
    const a = Date.now(),
      i = Boolean(
        !F.sync.userPaused &&
          a < (vu(F.sync.singleTabMseInternalPauseUntilMs) || 0),
      );
    return {
      ...(e || {}),
      captionStartup: n,
      pauseAffectsStt: !i,
      internalPlaybackPause: i,
    };
  }
  function Nr(e = {}, t = null, n = null) {
    if (
      "display" !== F.role ||
      !F.sync.enabled ||
      F.sync.singleTabMediaSync ||
      !F.sessionId
    )
      return;
    const a = vu(t);
    if (null === a) return;
    const i = Date.now();
    i - Ye < 500 ||
      ((Ye = i),
      chrome.runtime
        .sendMessage({
          type: "LIVE_SUBTITLE_MEDIA_TIMING",
          sessionId: F.sessionId,
          role: "display",
          timing: {
            ...(e || {}),
            role: "display",
            currentTime: vu(e?.currentTime),
            sourceMediaTime: vu(n),
            sourceTimelineOffsetSeconds: vu(
              F.sync.sourceToViewerTimelineOffsetSeconds,
            ),
            sourceTimelineOffsetStable:
              null !== vu(F.sync.sourceToViewerTimelineOffsetSeconds),
            actualDelaySeconds: a,
            wallTimeMs: vu(e?.wallTimeMs) || i,
            href: location.href,
          },
        })
        .catch(() => {}));
  }
  function Gr(e) {
    (Object.assign(F.sync, e), ei());
  }
  function Hr(e = {}) {
    const t = e.href || e.pageUrl || "",
      n = Va(e.mediaContextKey || "") || gc(e.canonicalMediaUrl || t),
      a = Va(F.config?.sourceMediaContextKey || ""),
      i = Va(F.config?.viewerMediaContextKey || ""),
      s = yc();
    if (n && a && n !== a) return !1;
    if (n && i && n !== i) return !1;
    if (s && i && s !== i && pc(s) && pc(i)) return !1;
    if (n) return !0;
    const r = F.config?.canonicalPageUrl || F.config?.pageUrl || location.href;
    return !t || (uc(t, r) && uc(t, location.href));
  }
  function Fr(e = null, t = Date.now()) {
    if (
      !F.sync.enabled ||
      F.sync.singleTabMediaSync ||
      F.sync.delayArmed ||
      !F.sync.delayBuffering ||
      !0 !== e?.isLiveStream
    )
      return !1;
    const n = Yd();
    if (!n || !n.paused) return !1;
    const a = Qd("viewer", n),
      i = vu(e.currentTime),
      s = vu(a.currentTime);
    if (null === i || null === s) return !1;
    const r = Nl(e, t),
      o = Nl(a, t),
      l = null === r || null === o ? null : o - r,
      d = null === r ? null : Math.max(0, r - i),
      c = null === o ? null : Math.max(0, o - s),
      u = s - i,
      m = null === l ? null : Math.abs(i + l - s),
      y = s;
    return (
      (F.sync.delayAnchorMediaTime = y),
      (F.sync.delayAnchorSourceMediaTime = i),
      (F.sync.lastSeekTargetSeconds = y),
      (F.sync.viewerMediaTime = y),
      (F.sync.viewerWallTimeMs = t),
      (F.sync.viewerPlaybackRate = 0),
      (F.sync.sourceToViewerTimelineOffsetSeconds = u),
      (F.sync.sourceToViewerTimelineOffsetLastStableAtMs = t),
      (F.sync.sourceToViewerTimelineOffsetContinuityActive = !0),
      (F.sync.sourceToViewerTimelineOffsetContinuityDelaySeconds = 0),
      Hl(),
      Ja("sync.live_startup_anchor.seeded", {
        sourceAnchorMediaTime: yn(i),
        viewerAnchorMediaTime: yn(y),
        viewerMediaTimeBeforeAlign: yn(s),
        viewerLagBeforeAlignSeconds:
          null === s ? null : Math.round(1e3 * Math.max(0, y - s)) / 1e3,
        timelineOffsetSeconds: Math.round(1e3 * u) / 1e3,
        edgeTimelineOffsetSeconds:
          null === l ? null : Math.round(1e3 * l) / 1e3,
        edgeRealignSeconds: null === m ? null : Math.round(1e3 * m) / 1e3,
        sourceLiveLagSeconds: null === d ? null : Math.round(1e3 * d) / 1e3,
        viewerLiveLagSeconds: null === c ? null : Math.round(1e3 * c) / 1e3,
        sourceLiveEdgeSeconds: yn(r),
        viewerLiveEdgeSeconds: yn(o),
        anchorBasis: "viewer-current-time-no-seek",
      }),
      !0
    );
  }
  function zr(e, t = null, n = Date.now(), a = "viewer-clock-ready") {
    if (
      !e ||
      !F.sync.enabled ||
      F.sync.singleTabMediaSync ||
      F.sync.delayArmed ||
      !F.sync.delayBuffering ||
      !0 !== F.sync.sourceTiming?.isLiveStream ||
      ("youtube" !== F.sync.platform && !ac()) ||
      F.sync.pendingViewerSeek ||
      Xr(n)
    )
      return !1;
    const i = t || Qd("viewer", e);
    if (!e.paused || !1 === i?.paused || !0 !== i?.isLiveStream) return !1;
    const s = vu(F.sync.delayAnchorMediaTime),
      r = vu(i.currentTime ?? e.currentTime);
    if (null === s || null === r) return !1;
    const o = r - s;
    if (Math.abs(o) <= O) return !1;
    const l = vu(F.sync.sourceToViewerTimelineOffsetSeconds),
      d = null === l ? null : l + o;
    ((F.sync.delayAnchorMediaTime = r),
      (F.sync.lastSeekTargetSeconds = r),
      rd(r, e, n),
      (F.sync.lastRawViewerClockSample = nd(i, n)),
      Hl());
    let c = 0;
    return (
      null !== d &&
        ((F.sync.sourceToViewerTimelineOffsetSeconds = d),
        (F.sync.sourceToViewerTimelineOffsetLastStableAtMs = n),
        (F.sync.sourceToViewerTimelineOffsetContinuityActive = !0),
        (c = sd(d, 0))),
      Ja(
        "sync.live_startup_anchor.viewer_refreshed",
        {
          reason: ku(a || "viewer-clock-ready"),
          previousViewerAnchorMediaTime: yn(s),
          nextViewerAnchorMediaTime: yn(r),
          anchorDeltaSeconds: yn(o),
          previousTimelineOffsetSeconds: yn(l),
          nextTimelineOffsetSeconds: yn(d),
          sourceMediaTime: yn(F.sync.sourceTiming?.currentTime),
          viewerLiveEdgeSeconds: yn(i.seekableEndSeconds ?? i.liveEdgeSeconds),
          shiftedSegments: c,
        },
        "warn",
      ),
      !0
    );
  }
  function Kr(e) {
    if ("display" !== F.role || (!F.sync.enabled && !io())) return;
    if (!e || Xe === e) return;
    const t = Xe,
      n = Xd(t);
    if (
      (jr(),
      (Xe = e),
      Xe.addEventListener("seeking", ao, !0),
      Xe.addEventListener("seeked", ao, !0),
      Xe.addEventListener("pause", mo, !0),
      Xe.addEventListener("play", mo, !0),
      it ||
        ("function" == typeof document?.addEventListener &&
          (document.addEventListener("pointerdown", Qr, !0),
          document.addEventListener("keydown", Jr, !0),
          (it = !0))),
      t)
    ) {
      const e = Xd(Xe);
      Ja(
        "sync.viewer_video_listener.rebound",
        {
          previousConnected: n.connected,
          previousVisible: n.visible,
          previousEnded: n.ended,
          previousArea: Math.round(n.area),
          nextVisible: e.visible,
          nextArea: Math.round(e.area),
          nextMainPlayer: e.inMainPlayer,
        },
        "warn",
      );
    }
  }
  function jr() {
    Xe &&
      (Xe.removeEventListener("seeking", ao, !0),
      Xe.removeEventListener("seeked", ao, !0),
      Xe.removeEventListener("pause", mo, !0),
      Xe.removeEventListener("play", mo, !0),
      (Xe = null),
      it &&
        (document.removeEventListener?.("pointerdown", Qr, !0),
        document.removeEventListener?.("keydown", Jr, !0),
        (it = !1)),
      po(),
      Ze && (window.clearTimeout(Ze), (Ze = null)),
      (F.sync.latestViewerSeekingAtMs = 0),
      (F.sync.latestViewerSeekingTarget = null));
  }
  function Qr(e = null) {
    if (!1 === e?.isTrusted) return;
    const t = e?.target;
    if (!t || "function" != typeof t.closest) return;
    let n = null;
    try {
      n = t.closest(
        [
          ".ytp-progress-bar-container",
          ".ytp-progress-bar",
          "[data-a-target*='seek']",
          "[data-test-selector*='seek']",
          "[role='slider'][aria-label*='seek' i]",
          "[role='slider'][aria-label*='搜尋' i]",
          "[role='slider'][aria-label*='進度' i]",
        ].join(","),
      );
    } catch {
      n = null;
    }
    if (n) return void Yr("progress-control");
    let a = null;
    try {
      a = t.closest(
        [
          "video",
          ".ytp-play-button",
          "[data-a-target='player-play-pause-button']",
          "[data-test-selector='player-play-pause-button']",
          "[aria-label*='播放' i]",
          "[aria-label*='暫停' i]",
          "[aria-label*='play' i]",
          "[aria-label*='pause' i]",
        ].join(","),
      );
    } catch {
      a = null;
    }
    a && Zr(Xe?.paused ? "play" : "pause", "playback-control");
  }
  function Jr(e = null) {
    if (!1 === e?.isTrusted || e?.metaKey || e?.ctrlKey || e?.altKey) return;
    const t = e?.target,
      n = ku(t?.tagName).toLowerCase();
    if ("input" === n || "textarea" === n || t?.isContentEditable) return;
    const a = ku(e?.key);
    " " === a || ["k", "K", "MediaPlayPause", "Play", "Pause"].includes(a)
      ? Zr(Xe?.paused ? "play" : "pause", `key:${a || "Space"}`)
      : (/^[0-9]$/.test(a) ||
          [
            "ArrowLeft",
            "ArrowRight",
            "Home",
            "End",
            "j",
            "J",
            "l",
            "L",
          ].includes(a)) &&
        Yr(`key:${a}`);
  }
  function Yr(e = "user-seek", t = Date.now()) {
    (to(),
      (F.sync.lastTrustedViewerSeekIntentAtMs = t),
      (F.sync.lastTrustedViewerSeekIntentKind = ku(e || "user-seek")));
  }
  function Xr(e = Date.now()) {
    const t = vu(F.sync.lastTrustedViewerSeekIntentAtMs) || 0;
    return t > 0 && e - t <= 3500;
  }
  function Zr(e = "", t = "user-playback", n = Date.now()) {
    const a = "pause" === e ? "pause" : "play" === e ? "play" : "";
    a &&
      ((F.sync.lastTrustedViewerPlaybackIntentAtMs = n),
      (F.sync.lastTrustedViewerPlaybackIntentAction = a),
      (F.sync.lastTrustedViewerPlaybackIntentKind = ku(t || "user-playback")));
  }
  function eo(e = "", t = Date.now()) {
    const n = vu(F.sync.lastTrustedViewerPlaybackIntentAtMs) || 0;
    if (!n || t - n > 3500) return !1;
    const a = ku(F.sync.lastTrustedViewerPlaybackIntentAction);
    return !e || a === e;
  }
  function to() {
    ((F.sync.untrustedViewerReloadStartedAtMs = 0),
      (F.sync.untrustedViewerReloadExpectedMediaTime = null),
      (F.sync.untrustedViewerReloadRecoveryAttempts = 0));
  }
  function no(e, t, n = "viewer-seek", a = Date.now()) {
    if (
      !ac() ||
      !F.sync.enabled ||
      F.sync.singleTabMediaSync ||
      !F.sync.delayArmed ||
      F.sync.pendingViewerSeek ||
      F.sync.delayBuffering ||
      Xr(a)
    )
      return !1;
    const i = vu(t),
      s = vu(F.sync.viewerMediaTime);
    if (null === i || null === s) return !1;
    const r = vu(F.sync.untrustedViewerReloadStartedAtMs) || 0,
      o = vu(F.sync.untrustedViewerReloadExpectedMediaTime),
      l = r > 0 ? Math.max(0, a - r) : 0,
      d = Math.max(O, Math.min(12, l / 1e3 + 2));
    if (Boolean(r > 0 && null !== o && i > V && Math.abs(i - o) <= d)) {
      const t = Math.max(
        0,
        Number(F.sync.untrustedViewerReloadRecoveryAttempts) || 0,
      );
      return (
        rd(i, e || Xe, a),
        od(i),
        to(),
        Ja(
          "sync.viewer_reload_seek.recovered",
          {
            reason: ku(n),
            viewerMediaTime: yn(i),
            expectedMediaTime: yn(o),
            elapsedMs: l,
            recoveryAttempts: t,
          },
          "info",
        ),
        !0
      );
    }
    const c = Math.abs(i - s) <= O,
      u = Math.max(15, (vu(F.sync.targetDelaySeconds) || 0) + 2),
      m = i <= V && s >= u;
    if (!c && !m) return !1;
    if (c) (rd(i, e || Xe, a), od(i), to());
    else {
      if (r && null !== o) {
        if (l > 3e4)
          return (
            Ja(
              "sync.viewer_reload_seek.recovery_expired",
              {
                reason: ku(n),
                viewerMediaTime: yn(i),
                expectedMediaTime: yn(o),
                elapsedMs: l,
                recoveryAttempts: Math.max(
                  0,
                  Number(F.sync.untrustedViewerReloadRecoveryAttempts) || 0,
                ),
              },
              "warn",
            ),
            to(),
            !1
          );
      } else
        ((F.sync.untrustedViewerReloadStartedAtMs = a),
          (F.sync.untrustedViewerReloadExpectedMediaTime = s),
          (F.sync.untrustedViewerReloadRecoveryAttempts = 0));
      const t = vu(F.sync.untrustedViewerReloadExpectedMediaTime) ?? s;
      ((F.sync.untrustedViewerReloadRecoveryAttempts =
        Math.max(0, Number(F.sync.untrustedViewerReloadRecoveryAttempts) || 0) +
        1),
        cd(e || Xe, t),
        od(i));
    }
    const y = vu(F.sync.untrustedViewerReloadLastLogAtMs) || 0;
    return (
      (!y || a - y >= 2e3) &&
        ((F.sync.untrustedViewerReloadLastLogAtMs = a),
        Ja(
          "sync.viewer_reload_seek.ignored",
          {
            reason: ku(n),
            detectionMode: c
              ? "stable-media-clock"
              : "transient-reset-to-start",
            viewerMediaTime: yn(i),
            stableMediaTime: yn(s),
            recoveryAttempts: Math.max(
              0,
              Number(F.sync.untrustedViewerReloadRecoveryAttempts) || 0,
            ),
            readyState: Number(e?.readyState) || 0,
            networkState: Number(e?.networkState) || 0,
          },
          m ? "warn" : "info",
        )),
      !0
    );
  }
  function ao(e = null) {
    if ("display" !== F.role || (!F.sync.enabled && !io())) return;
    const t = Date.now(),
      n = e?.target instanceof HTMLVideoElement ? e.target : Xe,
      a = vu(n?.currentTime),
      i = ku(e?.type || "");
    if (!F.sync.enabled && io())
      return void (function (e, t, n = "", a = Date.now()) {
        const i = vu(t) ?? vu(e?.currentTime);
        if (!e || null === i) return !1;
        const s = vu(F.sync.lastViewerSeekEventTarget),
          r = vu(F.sync.lastViewerSeekEventAtMs) || 0;
        if (null !== s && a - r <= 5e3 && Math.abs(i - s) <= _) return !1;
        ((F.sync.lastViewerSeekEventAtMs = a),
          (F.sync.lastViewerSeekEventTarget = i),
          Ze && window.clearTimeout(Ze),
          ho({
            targetMediaTime: i,
            targetDelaySeconds: 0,
            reason: "instant-overlay-seek",
            armGuard: !1,
          }),
          (F.status = "偵測跳轉，重新建立即時字幕"),
          Ja(
            "sync.instant_overlay.seek",
            {
              eventType: ku(n),
              targetMediaTime: yn(i),
              viewerPaused: Boolean(e.paused),
            },
            "warn",
          ),
          ei(),
          (Ze = window.setTimeout(() => {
            ((Ze = null), Mo(e, i, "instant-overlay-seek"));
          }, 800)));
      })(n, a, i, t);
    if (F.sync.singleTabMediaSync)
      return void lo(n, a, t, {
        eventType: i,
        detectionSource: `event:${i || "unknown"}`,
      });
    const s = Qd("viewer", n);
    uo(t, a, i) ||
      (ad(s, t)
        ? Ja(
            "sync.viewer_clock_rebase.echo_ignored",
            {
              eventType: ku(i || "unknown"),
              targetMediaTime: yn(a),
              liveLagSeconds: yn(s.actualDelaySeconds),
              rebaseMediaTime: yn(F.sync.lastViewerClockRebaseMediaTime),
              rebaseLiveLagSeconds: yn(
                F.sync.lastViewerClockRebaseLiveLagSeconds,
              ),
            },
            "info",
          )
        : id(s, `event:${i || "unknown"}`, t, {
            allowUnintentionalSeekFallback: !Xr(t),
          }) ||
          no(n || Xe, a, `event:${i || "unknown"}`, t) ||
          (!0 !== s.isLiveStream || Ql(a, s)
            ? so(n, t, a, i) ||
              (function (e, t) {
                const n = F.sync.pendingViewerSeek,
                  a = vu(n?.targetMediaTime),
                  i = vu(n?.requestedAtMs) || 0;
                return (
                  !(
                    null === a ||
                    null === t ||
                    e - i > 15e3 ||
                    Math.abs(t - a) > _
                  ) && (od(t), !0)
                );
              })(t, a) ||
              ro(t, a, i) ||
              ("seeking" === i &&
                null !== a &&
                ((F.sync.latestViewerSeekingAtMs = t),
                (F.sync.latestViewerSeekingTarget = a)),
              oo(n || Xe, a, "viewer-seeking", t))
            : Jl(a, s, `event:${i || "unknown"}`)));
  }
  function io() {
    return "instant-overlay" === F.config?.captionMode;
  }
  function so(e, t, n, a = "") {
    if ("seeked" !== a) return !1;
    const i = vu(F.sync.latestViewerSeekingTarget),
      s = vu(F.sync.latestViewerSeekingAtMs) || 0;
    if (null === i || null === n || t - s > 2500 || Math.abs(n - i) <= 8)
      return !1;
    const r = !!e && cd(e, i);
    return (
      (F.sync.viewerMediaTime = i),
      (F.sync.viewerWallTimeMs = t),
      (F.sync.viewerPlaybackRate = 0),
      Ja(
        "sync.viewer_seek.stale_seeked_ignored",
        {
          staleTargetMediaTime: yn(n),
          latestTargetMediaTime: yn(i),
          elapsedMs: Math.max(0, t - s),
          restored: r,
        },
        "warn",
      ),
      !0
    );
  }
  function ro(e, t, n = "") {
    const a = vu(t),
      i = vu(F.sync.lastViewerSeekEventTarget),
      s = vu(F.sync.lastViewerSeekEventAtMs) || 0;
    return !(
      null === a ||
      null === i ||
      e - s > 5e3 ||
      Math.abs(a - i) > _ ||
      (od(a),
      Ja(
        "sync.viewer_seek.duplicate_ignored",
        {
          eventType: ku(n),
          targetMediaTime: yn(a),
          previousTargetMediaTime: yn(i),
          elapsedMs: Math.max(0, e - s),
          pendingViewerSeek: Boolean(F.sync.pendingViewerSeek),
          delayBuffering: Boolean(F.sync.delayBuffering),
        },
        "info",
      ),
      0)
    );
  }
  function oo(e, t = null, n = "viewer-seeking", a = Date.now(), i = {}) {
    const s = Qd("viewer", e || Xe);
    if (!0 === s.isLiveStream && !Ql(t, s)) return (Jl(t, s, n), !1);
    (to(),
      (F.sync.startupAlignmentTargetMediaTime = null),
      (F.sync.startupAlignmentStartedAtMs = 0),
      (F.sync.startupAlignmentIgnoreUntilMs = 0),
      (F.sync.startupAlignmentEchoIgnoredCount = 0),
      Ze && window.clearTimeout(Ze),
      (F.sync.lastViewerSeekEventAtMs = a),
      (F.sync.lastViewerSeekEventTarget = vu(t)),
      i?.skipTimelineJumpNote || ld(t, n, a),
      rd(t, e || Xe, a),
      od(t),
      (F.sync.suspendAutoAlignUntilMs = a + 2500),
      (F.sync.ready = !1),
      (F.sync.status = "偵測跳轉，準備同步 source"));
    const r = bd();
    (null !== t &&
      (ho({ targetMediaTime: t, targetDelaySeconds: r, reason: n }),
      nl(t, r, n)),
      ei());
    const o = vu(t);
    return (
      (Ze = window.setTimeout(() => {
        ((Ze = null),
          (function (e, t = null) {
            if (!e || !F.sync.enabled || F.sync.singleTabMediaSync) return;
            const n = Qd("viewer", e),
              a = vu(t) ?? vu(n.currentTime);
            if (null === a) return;
            const i =
              null === t ? n : { ...n, currentTime: a, wallTimeMs: Date.now() };
            if (!0 === i.isLiveStream && !Ql(a, i))
              return void Jl(a, i, "debounced-request");
            const s = F.sync.pendingViewerSeek;
            if (
              s &&
              Math.abs(s.targetMediaTime - a) <= _ &&
              Date.now() - s.requestedAtMs < 1e3
            )
              return;
            const r = bd();
            if (
              (function (e, t, n = null, a = null) {
                const i = ko(t);
                if (!i || !i.queueSegments.length) {
                  const e = ja();
                  return (
                    Ja(
                      "subtitle.cache.replay_miss",
                      {
                        targetMediaTime: yn(t),
                        cacheSegments: e.segments,
                        cacheStartMediaTime: yn(e.firstMediaTime),
                        cacheEndMediaTime: yn(e.lastMediaTime),
                        cacheContext: e.context || "",
                        currentContext: Wa(),
                        contextMatches: Na(),
                      },
                      "warn",
                    ),
                    !1
                  );
                }
                const s = vu(a) ?? bd(),
                  r = Lo(t, i, "seek-replay");
                if (_l() && !r.ready)
                  return (
                    Ja(
                      "mse.startup_wait.cache_replay_hold",
                      {
                        reason: "seek-replay",
                        targetMediaTime: vu(t),
                        cacheStartMediaTime: vu(i.cacheStartMediaTime),
                        cacheEndMediaTime: vu(i.cacheEndMediaTime),
                        contiguousCacheStartMediaTime: vu(
                          r.contiguousCacheStartMediaTime,
                        ),
                        contiguousCacheEndMediaTime: vu(
                          r.contiguousCacheEndMediaTime,
                        ),
                        contiguousCacheGapSeconds: vu(
                          r.contiguousCacheGapSeconds,
                        ),
                        cacheLeadSeconds: vu(r.cacheLeadSeconds),
                        coverageGapSeconds: vu(r.coverageGapSeconds),
                        staleGapSeconds: vu(r.staleGapSeconds),
                        minLeadSeconds: vu(r.minLeadSeconds),
                        latencyP95Seconds: vu(r.latencyP95Seconds),
                        latencySource: ku(r.latencySource || ""),
                        waitReason: String(F.sync.mseStartupWaitReason || ""),
                      },
                      "warn",
                    ),
                    !1
                  );
                const o = Vl(),
                  l = Do(t, i, "seek-replay");
                if (o && !l) return !1;
                (tn({
                  targetMediaTime: t,
                  targetDelaySeconds: a,
                  reason: "cached-replay-seek",
                }),
                  xn(),
                  En(),
                  Uc(),
                  To(),
                  (F.sync.pendingViewerSeek = null),
                  (F.sync.delayBuffering = !1),
                  (F.sync.delayArmed = !0),
                  (F.sync.delayArmedAt = Date.now()),
                  (F.sync.ready = !0));
                const d = vu(F.sync.lockedDelaySeconds);
                ((F.sync.targetDelaySeconds = s),
                  (F.sync.lockedDelaySeconds =
                    null !== d && d >= s - E ? d : s),
                  (F.sync.cachedSubtitleReplay = {
                    active: !0,
                    targetMediaTime: t,
                    cacheStartMediaTime: i.cacheStartMediaTime,
                    cacheEndMediaTime: i.cacheEndMediaTime,
                    allowRedisplay: Ao(t),
                    startedAtMs: Date.now(),
                    lastStatusAtMs: 0,
                  }),
                  Ea(i.queueSegments, t),
                  (F.sync.viewerMediaTime = t),
                  (F.sync.viewerWallTimeMs = Date.now()),
                  (F.sync.viewerPlaybackRate = n?.paused
                    ? 0
                    : vu(n?.playbackRate) || 1),
                  (F.status = "使用已快取字幕回放"),
                  (F.largeSegmentHistory = i.contextSegments.map((e) => ({
                    ...e,
                    cacheReplay: !0,
                  }))),
                  (F.displayedOriginalText = i.contextSegments
                    .map((e) => ku(e.original))
                    .filter(Boolean)
                    .join(" ")),
                  (F.segmentQueue = i.queueSegments.map((e) =>
                    gn({ ...e, cacheReplay: !0 }, Date.now()),
                  )),
                  (F.lastQueueSignature = Yn(F.segmentQueue)),
                  (F.subtitleHadContent =
                    F.largeSegmentHistory.length > 0 ||
                    F.segmentQueue.length > 0),
                  (F.subtitleFading = !1),
                  (F.subtitleDisplayBlank = !1),
                  pd(Date.now()),
                  Ja(
                    "subtitle.cache.replay_start",
                    {
                      targetMediaTime: t,
                      cacheStartMediaTime: i.cacheStartMediaTime,
                      cacheEndMediaTime: i.cacheEndMediaTime,
                      queuedSegments: i.queueSegments.length,
                      contextSegments: i.contextSegments.length,
                      skippedNearlyEndedSegments:
                        i.skippedNearlyEndedSegments || 0,
                      cacheSegments: F.subtitleTimelineCache.length,
                      cacheBytes: F.subtitleTimelineCacheBytes,
                    },
                    "info",
                  ));
                const c = `${F.sessionId || "cache-seek"}:${Date.now()}:${Math.round(1e3 * t)}`,
                  u = wo(i),
                  m = n || Qd("viewer", e || void 0),
                  y = vu(r.contiguousCacheEndMediaTime),
                  p = t + s,
                  g = null === y ? p : Math.max(t, y - 2),
                  f = Math.max(p, g),
                  S = Yl(f, F.sync.sourceTiming, m);
                return (
                  Ja(
                    vo(
                      {
                        id: c,
                        targetMediaTime: t,
                        sourceTargetMediaTime: S.sourceTargetMediaTime,
                        sourceTargetResolutionReason: S.reason,
                        sourceTargetClamped: S.clamped,
                        targetDelaySeconds: s,
                        requestedAtMs: Date.now(),
                        lastSourceCommandAtMs: 0,
                        sourceSeekAcknowledged: !1,
                        lastRejectedSourceSeekLogAtMs: 0,
                        cachedSubtitleReplay: !0,
                        cachedSubtitleCoverageRanges: u,
                      },
                      m,
                      !0,
                    )
                      ? "subtitle.cache.replay_source_seek_sent"
                      : "subtitle.cache.replay_source_seek_deferred",
                    {
                      seekId: c,
                      targetMediaTime: t,
                      sourceProjectionViewerTime: f,
                      sourceTargetMediaTime: S.sourceTargetMediaTime,
                      sourceTargetResolutionReason: S.reason,
                      sourceAdvanceSeconds: Math.max(0, f - t),
                      contiguousCacheEndMediaTime: y,
                      sourceOverlapSeconds: 2,
                      targetDelaySeconds: s,
                      queuedSegments: i.queueSegments.length,
                      coverageRanges: u.length,
                    },
                    "info",
                  ),
                  kn(),
                  !0
                );
              })(e, a, i, r)
            )
              return void ei();
            const o = `${F.sessionId || "seek"}:${Date.now()}:${Math.round(1e3 * a)}`,
              l = Yl(a, F.sync.sourceTiming, i);
            ((F.sync.pendingViewerSeek = {
              id: o,
              targetMediaTime: a,
              sourceTargetMediaTime: l.sourceTargetMediaTime,
              sourceTargetResolutionReason: l.reason,
              sourceTargetClamped: l.clamped,
              targetDelaySeconds: r,
              requestedAtMs: Date.now(),
              lastSourceCommandAtMs: 0,
              sourceSeekAcknowledged: !1,
              lastRejectedSourceSeekLogAtMs: 0,
            }),
              (F.sync.delayArmed = !1),
              (F.sync.suspendAutoAlignUntilMs = 0),
              (F.sync.delayBuffering = !0),
              (F.sync.delayBufferStartedAt = Date.now()),
              (F.sync.delayAnchorMediaTime = null),
              (F.sync.delayAnchorSourceMediaTime = null),
              Bc(r),
              (F.sync.ready = !1),
              (F.sync.status = `跳轉後正在努力產生字幕 0.0s / ${Pc(r)}`));
            const d = (function (
              e,
              t = null,
              n = "viewer-seek",
              a = Date.now(),
            ) {
              const i = vu(e),
                s = Zt(a),
                r = vu(s?.targetMediaTime),
                o = vu(s?.startedAtMs) || 0;
              if (
                null === i ||
                null === r ||
                Math.abs(i - r) > _ ||
                a - o > Math.max(1e3, 1300)
              )
                return !1;
              if (_l()) {
                const e = vu(F.sync.mseStartupWaitTargetMediaTime);
                if (
                  !F.sync.mseStartupWaitActive ||
                  F.sync.mseStartupWaitReleased ||
                  null === e ||
                  Math.abs(i - e) > _
                )
                  return !1;
              }
              return (
                nn(i, t, n),
                Ja("sync.viewer_seek.preflight_reused", {
                  targetMediaTime: yn(i),
                  targetDelaySeconds: vu(t),
                  guardSequence: vu(s.sequence),
                  guardAgeMs: Math.max(0, a - o),
                  mseStartupWaitActive: Boolean(F.sync.mseStartupWaitActive),
                }),
                !0
              );
            })(a, r, "viewer-seek");
            (d ||
              (ho({
                targetMediaTime: a,
                targetDelaySeconds: r,
                reason: "viewer-seek",
              }),
              nl(a, r, "viewer-seek")),
              bo(e, a),
              vo(F.sync.pendingViewerSeek, i, !0),
              ei());
          })(e || Xe, o));
      }, 800)),
      !0
    );
  }
  function lo(e, t, n = Date.now(), a = {}) {
    if (!e) return !1;
    const i = vu(t) ?? vu(e.currentTime);
    if (null === i) return !1;
    const s = ku(a.eventType || "");
    if (uo(n, i, s)) return !1;
    if (so(e, n, i, s)) return !1;
    if (ro(n, i, s)) return !1;
    ((F.sync.startupAlignmentTargetMediaTime = null),
      (F.sync.startupAlignmentStartedAtMs = 0),
      (F.sync.startupAlignmentIgnoreUntilMs = 0),
      (F.sync.startupAlignmentEchoIgnoredCount = 0));
    const r = vu(a.fromMediaTime) ?? td(n, { preferStateClock: !0 });
    ((F.sync.lastViewerSeekEventAtMs = n),
      (F.sync.lastViewerSeekEventTarget = i),
      "seeking" === s &&
        ((F.sync.latestViewerSeekingAtMs = n),
        (F.sync.latestViewerSeekingTarget = i)),
      rd(i, e, n),
      od(i),
      Ze && window.clearTimeout(Ze),
      (F.sync.suspendAutoAlignUntilMs = n + 2500),
      (F.sync.ready = !1),
      (F.sync.status = "偵測跳轉，重新建立字幕時間軸"),
      ho({
        targetMediaTime: i,
        targetDelaySeconds:
          F.sync.targetDelaySeconds || F.sync.fixedDelaySeconds,
        reason: "single-tab-seek",
      }),
      xo());
    const o = (function (e, t = null) {
        if (!F.sync.singleTabMediaSync || !ya()) return null;
        const n = vu(e);
        if (null === n) return null;
        const a = ko(n, { allowProvenNoTextLeadingGap: !0 });
        if (!a?.queueSegments?.length) {
          const e = ja();
          return (
            Ja(
              "subtitle.cache.single_tab_seek_miss",
              {
                targetMediaTime: yn(n),
                cacheSegments: e.segments,
                cacheStartMediaTime: yn(e.firstMediaTime),
                cacheEndMediaTime: yn(e.lastMediaTime),
                cacheContext: e.context || "",
                currentContext: Wa(),
                contextMatches: Na(),
              },
              e.segments ? "warn" : "info",
            ),
            null
          );
        }
        const i = Date.now(),
          s = a.queueSegments.filter((e) => {
            const t = vu(Ca(e));
            if (null !== t) return t > n;
            const a = vu(Aa(e));
            return null !== a && a >= n;
          }),
          r = s.map((e) =>
            gn({ ...e, cacheReplay: !0, singleTabSeekReplay: !0 }, i),
          ),
          o = wo({ queueSegments: r });
        if (!o.length) return null;
        ((F.sync.pendingCachedReplayActivation = !1),
          (F.sync.ready = !0),
          (F.sync.mseStartupWaitReleased = !0),
          (F.sync.mseStartupWaitActive = !1),
          (F.sync.mseStartupWaitReadyAt = i),
          (F.sync.mseStartupWaitReason = ""),
          (F.sync.mseStartupWaitTargetMediaTime = null),
          (F.sync.mseStartupWaitResumeRequested = !1),
          (F.sync.delayBuffering = !1),
          (F.sync.delayBufferStartedAt = 0),
          (F.sync.delayArmed = !0),
          (F.sync.delayArmedAt = i),
          (F.sync.viewerMediaTime = n),
          (F.sync.viewerWallTimeMs = vu(t?.wallTimeMs) || i),
          (F.sync.viewerPlaybackRate = t?.paused
            ? 0
            : vu(t?.playbackRate) || 1),
          (F.segmentQueue = r),
          (F.lastQueueSignature = Yn(r)),
          (F.subtitleDisplayStats.queuedSegments += r.length),
          (F.subtitleHadContent = !0),
          (F.subtitleFading = !1),
          (F.subtitleDisplayBlank = !1),
          (F.status = "使用已完成字幕銜接跳轉位置"),
          Ea(r, n));
        const l = Eo({ ...a, queueSegments: s }, n);
        return (
          Ja(
            "subtitle.cache.single_tab_seek_rehydrated",
            {
              targetMediaTime: yn(n),
              queuedSegments: r.length,
              cacheStartMediaTime: yn(a.cacheStartMediaTime),
              cacheEndMediaTime: yn(a.cacheEndMediaTime),
              contiguousCacheStartMediaTime: yn(l?.start),
              contiguousCacheEndMediaTime: yn(l?.end),
              coverageRanges: o.length,
              skippedExpiredSegments: Math.max(
                0,
                a.queueSegments.length - s.length,
              ),
              skippedNearlyEndedSegments: a.skippedNearlyEndedSegments || 0,
              leadingNoTextCovered: !0 === a.leadingNoTextCoverage?.covered,
              leadingNoTextGapSeconds: yn(a.leadingNoTextCoverage?.gapSeconds),
              leadingNoTextRangeCount: a.leadingNoTextCoverage?.rangeCount || 0,
              exactMediaTimeScheduling: !0,
              duplicateInferenceSuppressed: !0,
            },
            "info",
          ),
          kn(),
          { replay: a, queueSegments: r, coverageRanges: o }
        );
      })(i, Qd("viewer", e)),
      l = !1 !== F.config?.mseSeekCatchupEnabled;
    o
      ? Wo("single-tab-seek-cache-hit", { log: !1, seekBack: !1 })
      : l
        ? Zo("single-tab-seek", {
            anchorMediaTime: i,
            resumeRequested: !F.sync.userPaused,
            supersede: !0,
            waitForTimelineReset: !0,
          })
        : Go(i, "developer-setting");
    let d = !1;
    try {
      d = xc(e);
    } catch {
      d = !1;
    }
    (Ja(
      "sync.single_tab_seek.detected",
      {
        eventType: s,
        detectionSource: ku(a.detectionSource || "single-tab-seek"),
        fromMediaTime: yn(r),
        targetMediaTime: yn(i),
        jumpSeconds: null === r ? null : yn(Math.abs(i - r)),
        viewerVisible: d,
        primaryVideoSelected: Yd() === e,
        staleSubtitleCleared: !0,
        mseAudioTimelineReset: !0,
        seekCatchupEnabled: l,
        cachedSubtitleReplay: Boolean(o),
        cachedSubtitleSegments: o?.queueSegments?.length || 0,
        cachedSubtitleCoverageRanges: o?.coverageRanges?.length || 0,
      },
      "warn",
    ),
      ei());
    const c = {
        sessionId: ku(F.sessionId || ""),
        mediaContextKey: Wa(),
        seekSequence: vu(F.sync.subtitleSeekGuard?.sequence),
        targetMediaTime: i,
      },
      u = (t = 1) => {
        Ze = null;
        const n = co(c);
        n
          ? Ja(
              "mse.audio_buffer.seek_reset_repost_skipped",
              {
                reason: n,
                attempt: t,
                targetMediaTime: yn(i),
                currentSeekTarget: yn(F.sync.lastViewerSeekEventTarget),
                scheduledSeekSequence: c.seekSequence,
                currentSeekSequence: vu(F.sync.subtitleSeekGuard?.sequence),
              },
              "info",
            )
          : Mo(e, i, "single-tab-seek", {
              cachedSubtitleReplay: Boolean(o),
              cachedSubtitleCoverageRanges: o?.coverageRanges || [],
            }).then((e) => {
              const n = co(c);
              if (n)
                return void Ja(
                  "mse.audio_buffer.seek_reset_repost_skipped",
                  {
                    reason: n,
                    attempt: t,
                    targetMediaTime: yn(i),
                    currentSeekTarget: yn(F.sync.lastViewerSeekEventTarget),
                    scheduledSeekSequence: c.seekSequence,
                    currentSeekSequence: vu(F.sync.subtitleSeekGuard?.sequence),
                  },
                  "info",
                );
              const a = vu(e?.timelineRevision);
              if (
                !0 !== e?.ok ||
                !0 !== e?.offscreenResetApplied ||
                !Number.isInteger(a) ||
                a < 1
              ) {
                const n = ku(
                  e?.error || "offscreen timeline reset was not applied",
                );
                return t < 2
                  ? (Ja(
                      "mse.audio_buffer.seek_reset_retry_scheduled",
                      {
                        attempt: t,
                        nextAttempt: t + 1,
                        retryDelayMs: 350,
                        targetMediaTime: yn(i),
                        error: n,
                      },
                      "warn",
                    ),
                    void (Ze = window.setTimeout(() => {
                      u(t + 1);
                    }, 350)))
                  : (Ja(
                      "mse.audio_buffer.seek_reset_repost_blocked",
                      {
                        reason: "offscreen-reset-not-applied",
                        attempts: t,
                        targetMediaTime: yn(i),
                        error: n,
                      },
                      "error",
                    ),
                    void Wo("single-tab-seek-reset-failed", {
                      seekBack: !1,
                      restoreAudio: !0,
                    }));
              }
              (Vt("single-tab-seek", i),
                (function (e, t = null) {
                  const n = F.sync.singleTabMseStartupGate,
                    a = vu(e),
                    i = vu(n?.anchorMediaTime);
                  if (
                    !n?.active ||
                    !n.timelineResetPending ||
                    null === a ||
                    null === i ||
                    Math.abs(a - i) > _
                  )
                    return !1;
                  ((n.timelineResetPending = !1),
                    (n.timelineRevision = vu(t)),
                    Ja(
                      "mse.single_tab_startup.timeline_reset_ready",
                      {
                        anchorMediaTime: i,
                        targetMediaTime: a,
                        timelineRevision: n.timelineRevision,
                        preloadElapsedMs: n.preloadingStartedAtMs
                          ? Math.max(0, Date.now() - n.preloadingStartedAtMs)
                          : 0,
                      },
                      "info",
                    ),
                    window.setTimeout(() => {
                      pl("single-tab-seek-reset-ready");
                    }, 0));
                })(i, a),
                Ja(
                  "mse.audio_buffer.seek_reset_repost",
                  {
                    attempt: t,
                    targetMediaTime: yn(i),
                    offscreenResetApplied: !0,
                    timelineRevision: a,
                  },
                  "info",
                ));
            });
      };
    return (
      (Ze = window.setTimeout(() => {
        u(1);
      }, 800)),
      !0
    );
  }
  function co(e = {}) {
    const t = ku(e.sessionId || "");
    if (!t || ku(F.sessionId || "") !== t) return "session-changed";
    const n = Va(e.mediaContextKey || "");
    if (n && Wa() !== n) return "media-context-changed";
    if (vu(F.sync.subtitleSeekGuard?.sequence) !== vu(e.seekSequence))
      return "superseded-seek";
    const a = vu(e.targetMediaTime),
      i = vu(F.sync.lastViewerSeekEventTarget);
    return null === a || null === i || Math.abs(i - a) > _
      ? "superseded-seek"
      : "";
  }
  function uo(e, t, n = "") {
    if (
      F.sync.delayBuffering &&
      !F.sync.pendingViewerSeek &&
      (function (e) {
        const t =
          vu(F.sync.delayAnchorMediaTime) ?? vu(F.sync.lastSeekTargetSeconds);
        if (null === t) return !1;
        const n = vu(e);
        return null === n || Math.abs(n - t) <= q;
      })(t)
    )
      return !0;
    const a = vu(F.sync.startupAlignmentTargetMediaTime),
      i = vu(F.config?.initialPlaybackMediaTime),
      s = Boolean(null !== a && null !== i && Math.abs(a - i) <= q),
      r = Boolean(
        s &&
          !Xr(e) &&
          (e < (vu(F.sync.startupAlignmentIgnoreUntilMs) || 0) ||
            !F.sync.delayArmed ||
            (F.sync.mseStartupWaitActive && !F.sync.mseStartupWaitReleased)),
      );
    if (null !== a && null !== t && Math.abs(t - a) <= q && !Xr(e))
      return (
        (F.sync.startupAlignmentEchoIgnoredCount =
          Math.max(0, Number(F.sync.startupAlignmentEchoIgnoredCount) || 0) +
          1),
        od(t),
        Ja("sync.viewer_startup_seek_echo.ignored", {
          targetMediaTime: yn(t),
          startupTargetMediaTime: yn(a),
          elapsedMs: Math.max(
            0,
            e - (vu(F.sync.startupAlignmentStartedAtMs) || e),
          ),
          ignoredCount: F.sync.startupAlignmentEchoIgnoredCount,
          delayArmed: Boolean(F.sync.delayArmed),
          delayBuffering: Boolean(F.sync.delayBuffering),
        }),
        !0
      );
    if (r) {
      const e = Xe || Yd(),
        n = vu(e?.currentTime) ?? vu(t);
      return (
        bo(e, a),
        (F.sync.startupAlignmentEchoIgnoredCount =
          Math.max(0, Number(F.sync.startupAlignmentEchoIgnoredCount) || 0) +
          1),
        od(t),
        Ja(
          "sync.viewer_startup_anchor.drift_restored",
          {
            eventMediaTime: yn(t),
            beforeMediaTime: yn(n),
            targetMediaTime: yn(a),
            afterMediaTime: yn(vu(e?.currentTime)),
            ignoredCount: F.sync.startupAlignmentEchoIgnoredCount,
            delayArmed: Boolean(F.sync.delayArmed),
            waitActive: Boolean(F.sync.mseStartupWaitActive),
            waitReleased: Boolean(F.sync.mseStartupWaitReleased),
          },
          "warn",
        ),
        !0
      );
    }
    if (e < (vu(F.sync.startupSeekGuardUntilMs) || 0)) return !0;
    const o = Math.max(
        vu(F.sync.ignoreViewerSeekUntilMs) || 0,
        vu(F.sync.internalViewerSeekUntilMs) || 0,
      ),
      l = vu(F.sync.internalViewerSeekTarget),
      d = null !== l && null !== t && Math.abs(t - l) <= q,
      c = Xr(e);
    return d && !c
      ? (e >= o &&
          "seeked" === ku(n) &&
          ((F.sync.ignoreViewerSeekUntilMs = 0),
          (F.sync.internalViewerSeekUntilMs = 0),
          (F.sync.internalViewerSeekTarget = null),
          od(t),
          Ja(
            "sync.viewer_internal_seek.delayed_echo_ignored",
            {
              eventType: "seeked",
              targetMediaTime: yn(t),
              internalTargetMediaTime: yn(l),
              expiredByMs: Math.max(0, e - o),
            },
            "info",
          )),
        !0)
      : c
        ? ((F.sync.ignoreViewerSeekUntilMs = 0),
          (F.sync.internalViewerSeekUntilMs = 0),
          (F.sync.internalViewerSeekTarget = null),
          !1)
        : !(
            e >= o ||
            (null !== l &&
              null !== t &&
              ((F.sync.ignoreViewerSeekUntilMs = 0),
              (F.sync.internalViewerSeekUntilMs = 0),
              (F.sync.internalViewerSeekTarget = null),
              1))
          );
  }
  function mo(e = null) {
    if ("display" !== F.role || F.sync.singleTabMediaSync || !F.sync.enabled)
      return;
    const t = Date.now(),
      n = e?.target instanceof HTMLVideoElement ? e.target : Xe,
      a = "pause" === e?.type ? "pause" : "play" === e?.type ? "play" : "";
    if (!n || !a) return;
    const i = eo(a, t),
      s = vu(n.currentTime),
      r = Boolean(vu(F.sync.untrustedViewerReloadStartedAtMs));
    if (!i && (r || (null !== s && s <= V)) && no(n, s, `viewer-${a}`, t))
      return;
    if ("play" === a && al()) {
      if (!i)
        return (
          (F.sync.userPaused = !1),
          (F.sync.mseStartupWaitResumeRequested = !0),
          il(n, "play-during-seek-wait"),
          (F.sync.status = "跳轉後等待第一批 MSE 字幕覆蓋新位置"),
          void ei()
        );
      !(function (e = null, t = "trusted-play") {
        if (!al()) return !1;
        const n = e || Yd(),
          a = Date.now(),
          i = vu(F.sync.mseStartupWaitTargetMediaTime),
          s = vu(F.sync.mseStartupWaitStartedAt),
          r = String(F.sync.mseStartupWaitReason || "viewer-seek");
        (sl(),
          rl(),
          (Ke = null),
          (F.sync.mseStartupWaitReleased = !0),
          (F.sync.mseStartupWaitActive = !1),
          (F.sync.mseStartupWaitReadyAt = a),
          (F.sync.mseStartupWaitReason = ""),
          (F.sync.mseStartupWaitTargetMediaTime = null),
          (F.sync.mseStartupWaitResumeRequested = !1),
          (F.sync.pendingViewerSeek = null),
          (F.sync.delayBuffering = !1),
          (F.sync.delayBufferStartedAt = 0),
          (F.sync.delayArmed = !0),
          (F.sync.delayArmedAt = a),
          (F.sync.ready = !0),
          (F.sync.userPaused = !1),
          (F.sync.viewerMediaTime = vu(n?.currentTime) ?? i),
          (F.sync.viewerWallTimeMs = a),
          (F.sync.viewerPlaybackRate = n?.paused
            ? 0
            : vu(n?.playbackRate) || 1),
          Bc(),
          pd(a),
          (F.sync.status = "已依使用者播放指令繼續，字幕在背景追趕"),
          Ja(
            "mse.startup_wait.user_play_override",
            {
              reason: t,
              waitReason: r,
              waitTargetMediaTime: i,
              viewerMediaTime: vu(n?.currentTime),
              waitElapsedMs: null === s ? null : Math.max(0, a - s),
              readyLeadSeconds: vu(F.mseAudio?.lastReadySubtitleLeadSeconds),
              rawLeadSeconds: vu(F.mseAudio?.lastLeadSeconds),
            },
            "info",
          ));
      })(n, "trusted-play-during-seek-wait");
    }
    if (
      "play" === a &&
      !F.sync.viewerStartupMediaWarmupActive &&
      !F.sync.delayArmed &&
      !F.sync.pendingViewerSeek &&
      (F.sync.delayBuffering || !F.sync.ready)
    ) {
      const e =
        vu(F.sync.delayBuildTargetSeconds) ??
        vu(F.sync.targetDelaySeconds) ??
        vu(F.sync.fixedDelaySeconds);
      ((F.sync.userPaused = !1),
        (F.sync.pauseContinuedLoadingUntilMs = 0),
        gd(n, e),
        (F.sync.viewerMediaTime = vu(n.currentTime) ?? F.sync.viewerMediaTime),
        (F.sync.viewerWallTimeMs = t),
        (F.sync.viewerPlaybackRate = 0),
        (F.sync.ready = !1),
        (F.sync.startupAutoplayBlockCount =
          Math.max(0, Number(F.sync.startupAutoplayBlockCount) || 0) + 1));
      const a = vu(F.sync.lastStartupAutoplayBlockLogAtMs) || 0;
      return (
        (!a || t - a >= 5e3) &&
          ((F.sync.lastStartupAutoplayBlockLogAtMs = t),
          Ja("sync.viewer_startup_autoplay.blocked", {
            count: F.sync.startupAutoplayBlockCount,
            viewerMediaTime: yn(F.sync.viewerMediaTime),
            buildProgressSeconds: vu(F.sync.delayBuildProgressSeconds),
            targetDelaySeconds: e,
          })),
        (F.sync.status = "正在努力產生字幕，準備好後會自動播放"),
        void ei()
      );
    }
    if (t < (vu(F.sync.ignoreViewerPlaybackUntilMs) || 0) && !i) return;
    const o = Qd("viewer", n);
    if (
      (id(o, `viewer-${a}`) || ld(o.currentTime, `viewer-${a}`),
      (F.sync.viewerMediaTime = o.currentTime),
      (F.sync.viewerWallTimeMs = o.wallTimeMs || Date.now()),
      (F.sync.viewerPlaybackRate = "pause" === a ? 0 : o.playbackRate || 1),
      "pause" === a &&
        (function (e = {}, t = Date.now()) {
          const n = eo("pause", t),
            a = Boolean(
              !F.sync.delayArmed && (F.sync.delayBuffering || !F.sync.ready),
            ),
            i = Boolean(
              F.sync.delayArmed && t - (vu(F.sync.delayArmedAt) || 0) <= 3e3,
            );
          if ((a || i) && !n)
            return (
              (F.sync.userPaused = !1),
              (F.sync.pauseContinuedLoadingUntilMs = 0),
              (F.sync.ignoreViewerPlaybackUntilMs = Math.max(
                vu(F.sync.ignoreViewerPlaybackUntilMs) || 0,
                t + $,
              )),
              !0
            );
          if (
            Boolean(
              F.sync.timelineGapHold?.pausedViewer ||
                F.sync.mseSubtitleCoverageHold?.pausedViewer,
            ) &&
            !n
          )
            return (
              (F.sync.userPaused = !1),
              (F.sync.pauseContinuedLoadingUntilMs = 0),
              (F.sync.ignoreViewerPlaybackUntilMs = Math.max(
                vu(F.sync.ignoreViewerPlaybackUntilMs) || 0,
                t + $,
              )),
              !0
            );
          if (F.sync.userPaused) return !1;
          if (!F.sync.pendingViewerSeek && !F.sync.mseStartupWaitActive)
            return !1;
          const s = vu(e?.currentTime),
            r =
              vu(F.sync.pendingViewerSeek?.targetMediaTime) ??
              vu(F.sync.mseStartupWaitTargetMediaTime) ??
              vu(F.sync.delayAnchorMediaTime) ??
              vu(F.sync.lastSeekTargetSeconds);
          return (
            !(null !== s && null !== r && Math.abs(s - r) > q) &&
            ((F.sync.ignoreViewerPlaybackUntilMs = Math.max(
              vu(F.sync.ignoreViewerPlaybackUntilMs) || 0,
              t + $,
            )),
            !0)
          );
        })(o, t))
    )
      return (
        (F.sync.userPaused = !1),
        (F.sync.viewerPlaybackBlocked = !1),
        (F.sync.viewerPlaybackBlockedAtMs = 0),
        (F.sync.status = "字幕同步暫停播放，等待新位置字幕"),
        void ei()
      );
    const l = (function (e = "", t = Date.now()) {
      return (
        !!eo(e, t) &&
        ((F.sync.lastTrustedViewerPlaybackIntentAtMs = 0),
        (F.sync.lastTrustedViewerPlaybackIntentAction = ""),
        (F.sync.lastTrustedViewerPlaybackIntentKind = ""),
        !0)
      );
    })(a, t);
    ((F.sync.userPaused = "pause" === a),
      (F.sync.viewerPlaybackBlocked = !1),
      (F.sync.viewerPlaybackBlockedAtMs = 0),
      Ja(
        "pause" === a
          ? "sync.viewer_playback.paused"
          : "sync.viewer_playback.resumed",
        {
          trustedIntent: l,
          viewerMediaTime: yn(o.currentTime),
          actualDelaySeconds: yn(F.sync.actualDelaySeconds),
          delayArmed: Boolean(F.sync.delayArmed),
        },
        "pause" !== a || l ? "info" : "warn",
      ));
    let d = null;
    if (F.sync.userPaused) {
      ((F.sync.mseStartupWaitResumeRequested = !1),
        (d = Pr(null, 6e4, {
          ...o,
          actualDelaySeconds: vu(F.sync.actualDelaySeconds),
          targetDelaySeconds:
            vu(F.sync.lockedDelaySeconds) ??
            vu(F.sync.targetDelaySeconds) ??
            vu(F.sync.fixedDelaySeconds),
        })));
      const e = d.continuedLoadingMs;
      ((F.sync.pauseContinuedLoadingUntilMs = e > 0 ? Date.now() + e : 0),
        (F.sync.status =
          e > 0
            ? `使用者暫停，source 繼續加載 ${fu(Math.ceil(e / 1e3))}`
            : "使用者暫停，source 已達一分鐘緩衝上限"),
        go(),
        l ||
          (function (e, t = Date.now()) {
            if (
              !F.sync.enabled ||
              F.sync.singleTabMediaSync ||
              !F.sync.delayArmed
            )
              return;
            const n = vu(F.sync.lastUntrustedPauseAutoResumeAtMs) || 0;
            t - n < 3e4
              ? Ja(
                  "sync.viewer_playback.untrusted_pause_respected",
                  { sinceLastAutoResumeMs: t - n },
                  "warn",
                )
              : (po(),
                (et = window.setTimeout(() => {
                  ((et = null),
                    (function (e, t) {
                      if (
                        !F.sync.enabled ||
                        F.sync.singleTabMediaSync ||
                        !F.sync.userPaused
                      )
                        return;
                      const n = e && document.contains(e) ? e : Yd();
                      if (!n || !n.paused) return;
                      if (
                        (vu(F.sync.lastTrustedViewerPlaybackIntentAtMs) || 0) >
                        t
                      )
                        return;
                      if (
                        F.sync.pendingViewerSeek ||
                        F.sync.delayBuffering ||
                        Qd("viewer", n).adPlaying
                      )
                        return;
                      ((F.sync.lastUntrustedPauseAutoResumeAtMs = Date.now()),
                        (F.sync.userPaused = !1),
                        (F.sync.pauseContinuedLoadingUntilMs = 0),
                        So());
                      let a = !1;
                      try {
                        const e = n.play();
                        e?.catch &&
                          e.catch(() => {
                            a = !0;
                          });
                      } catch {
                        a = !0;
                      }
                      window.setTimeout(() => {
                        const e = !n.paused;
                        (Ja(
                          "sync.viewer_playback.untrusted_pause_auto_resumed",
                          {
                            resumed: e,
                            playRejected: a,
                            viewerMediaTime: yn(vu(n.currentTime)),
                          },
                          e ? "info" : "warn",
                        ),
                          e
                            ? (fo(), yo("play", Qd("viewer", n)))
                            : ((F.sync.userPaused = !0), go()));
                      }, 400);
                    })(e, t));
                }, 4e3)));
          })(n, t));
    } else
      (po(),
        (F.sync.pauseContinuedLoadingUntilMs = 0),
        (function (e = Date.now()) {
          !F.sync.enabled ||
            F.sync.singleTabMediaSync ||
            F.sync.pendingViewerSeek ||
            F.sync.delayArmed ||
            !F.sync.delayBuffering ||
            ((F.sync.ignoreViewerSeekUntilMs = Math.max(
              vu(F.sync.ignoreViewerSeekUntilMs) || 0,
              e + 1500,
            )),
            (F.sync.internalViewerSeekUntilMs = 0),
            (F.sync.internalViewerSeekTarget = null));
        })(t),
        (F.sync.status = (function () {
          if (F.sync.delayBuffering && !F.sync.delayArmed) {
            const e = Math.max(0, vu(F.sync.delayBuildProgressSeconds) ?? 0),
              t =
                vu(F.sync.delayBuildTargetSeconds) ??
                vu(F.sync.targetDelaySeconds) ??
                vu(F.sync.fixedDelaySeconds);
            return null !== t
              ? `播放恢復，繼續產生字幕 ${Pc(e)} / ${Pc(t)}`
              : "播放恢復，繼續等待字幕同步";
          }
          return "播放恢復，等待字幕同步";
        })()),
        fo());
    (ei(),
      yo(a, o, {
        continuedLoadingMs: ("pause" === a && d?.continuedLoadingMs) || 0,
        pauseContinuedLoadingPlan: d,
      }));
  }
  function yo(e, t = null, n = {}) {
    if (!e || !F.sync.enabled || F.sync.singleTabMediaSync) return;
    const a = "pause" === e ? Br(n.continuedLoadingMs) : 0;
    chrome.runtime
      .sendMessage({
        type: "LIVE_SUBTITLE_VIEWER_PLAYBACK",
        sessionId: F.sessionId,
        action: e,
        viewerTiming: {
          ...(t || {}),
          actualDelaySeconds: vu(F.sync.actualDelaySeconds),
          targetDelaySeconds:
            vu(F.sync.lockedDelaySeconds) ??
            vu(F.sync.targetDelaySeconds) ??
            vu(F.sync.fixedDelaySeconds),
        },
        continuedLoadingMs: a,
        pauseContinuedLoadingPlan: n.pauseContinuedLoadingPlan || null,
      })
      .catch(() => {});
  }
  function po() {
    et && (window.clearTimeout(et), (et = null));
  }
  function go() {
    (xn(),
      En(),
      F.subtitleHadContent &&
        (F.currentOriginal || F.currentTranslation || F.activeSegment) &&
        ((F.subtitleFading = !1), (F.subtitleDisplayBlank = !1)));
  }
  function fo() {
    (xn(),
      En(),
      F.activeSegment || F.segmentQueue.length
        ? (ye = window.setTimeout(() => {
            ((ye = null), kn());
          }, 0))
        : F.subtitleHadContent && Cn());
  }
  function So(e = 800) {
    const t = Math.max($, Number(e) || 0);
    F.sync.ignoreViewerPlaybackUntilMs = Date.now() + t;
  }
  function ho(e = {}) {
    (!(function (e = {}) {
      const t = [
        F.activeSegment,
        ...(Array.isArray(F.segmentQueue) ? F.segmentQueue : []),
        ...(Array.isArray(F.largeSegmentHistory) ? F.largeSegmentHistory : []),
      ].filter((e) => e?.original && e?.translation && on(e));
      if (!t.length) return 0;
      const n = F.subtitleTimelineCache.length;
      La(t, {
        pageUrl: F.config?.pageUrl || location.href,
        mediaContextKey: F.subtitleTimelineCacheContext || Wa(),
      });
      const a = Math.max(0, F.subtitleTimelineCache.length - n);
      (Ja(
        "subtitle.cache.seek_snapshot",
        {
          reason: ku(e.reason || "viewer-seek"),
          targetMediaTime: yn(e.targetMediaTime),
          candidateSegments: t.length,
          addedSegments: a,
          cacheSegments: F.subtitleTimelineCache.length,
          cacheContext: F.subtitleTimelineCacheContext || "",
        },
        "info",
      ),
        t.length);
    })(e),
      Ba(),
      !1 === e.armGuard ? en() : tn(e),
      ga("viewer-seek", { resume: !1 }),
      xn(),
      En(),
      Uc(),
      (F.pendingOriginal = ""),
      (F.pendingOriginalUpdatedAt = 0),
      (F.sync.lastSpeechActivityAt = 0),
      (F.sync.speechActivityStartedAt = 0),
      (F.sync.pendingSubtitleRanges = []),
      (F.sync.subtitlePipelineRangeVersions = {}),
      (F.currentOriginal = ""),
      (F.currentTranslation = ""),
      (F.translationSource = ""),
      (F.translationUpdatedAt = 0),
      (F.activeSegment = null),
      (F.segmentQueue = []),
      (F.lastQueueSignature = ""),
      (F.largeSegmentHistory = []),
      (F.subtitleRenderSignature = ""),
      (F.largeRenderSignature = ""),
      (pe = []),
      (F.subtitleDisplayStats = {
        receivedResponses: 0,
        receivedSegments: 0,
        queuedSegments: 0,
        duplicateSegments: 0,
        displayedSegments: 0,
        droppedSegments: 0,
        translationErrors: 0,
      }),
      (F.subtitleHadContent = !1),
      (F.lastSubtitleActivityAt = 0),
      (F.subtitleFading = !1),
      (F.subtitleDisplayBlank = !1),
      (F.displayedOriginalText = ""),
      (F.displayedSegmentHistory = []),
      (F.draftOriginal = ""),
      (F.draftTranslation = ""),
      (F.finalOriginal = ""),
      (F.finalTranslation = ""),
      F.sync.singleTabMediaSync &&
        ya() &&
        (F.sync.singleTabMseInitialCueShortcutDisabled = !0),
      va());
  }
  function bo(e, t, n = {}) {
    if (!e) return;
    const a = Boolean(e.paused),
      i = vu(e.currentTime);
    (null !== i &&
      Math.abs(i - t) > _ &&
      cd(e, t, { forceInternal: !0 === n.forceInternal }),
      !0 === n.forceInternal &&
        (function (e = 2500) {
          F.sync.singleTabMediaSync &&
            (F.sync.singleTabMseInternalPauseUntilMs = Math.max(
              vu(F.sync.singleTabMseInternalPauseUntilMs) || 0,
              Date.now() + Math.max(250, Number(e) || 2500),
            ));
        })());
    try {
      e.paused || (So(2600), e.pause());
    } catch {}
    (a || (F.sync.userPaused = !1),
      (F.sync.viewerMediaTime = t),
      (F.sync.viewerWallTimeMs = Date.now()),
      (F.sync.viewerPlaybackRate = 0));
  }
  function vo(e, t, n) {
    if (!e) return !1;
    const a = vu(e.sourceTargetMediaTime);
    return !(
      null === a ||
      a < 0 ||
      ((e.lastSourceCommandAtMs = Date.now()),
      chrome.runtime
        .sendMessage({
          type: "LIVE_SUBTITLE_VIEWER_SEEK",
          sessionId: F.sessionId,
          seekId: e.id,
          targetMediaTime: a,
          viewerTargetMediaTime: e.targetMediaTime,
          targetDelaySeconds: e.targetDelaySeconds,
          resetTimeline: Boolean(n),
          cachedSubtitleReplay: !0 === e.cachedSubtitleReplay,
          cachedSubtitleCoverageRanges: Array.isArray(
            e.cachedSubtitleCoverageRanges,
          )
            ? e.cachedSubtitleCoverageRanges
            : [],
          viewerTiming: t || null,
        })
        .catch(() => {}),
      0)
    );
  }
  function Mo(e = null, t = null, n = "timeline-reset", a = {}) {
    const i = Qd("viewer", e || void 0);
    let s = null;
    try {
      s = chrome.runtime.sendMessage({
        type: "LIVE_SUBTITLE_TIMELINE_RESET",
        sessionId: F.sessionId,
        targetMediaTime: vu(t) ?? vu(i.currentTime),
        targetDelaySeconds: bd(),
        reason: n,
        cachedSubtitleReplay: !0 === a.cachedSubtitleReplay,
        cachedSubtitleCoverageRanges: Array.isArray(
          a.cachedSubtitleCoverageRanges,
        )
          ? a.cachedSubtitleCoverageRanges
          : [],
        viewerTiming: i,
      });
    } catch (e) {
      return Promise.resolve({
        ok: !1,
        error: ku(e?.message || e || "timeline reset failed"),
      });
    }
    return Promise.resolve(s).catch((e) => ({
      ok: !1,
      error: ku(e?.message || e || "timeline reset failed"),
    }));
  }
  function wo(e = {}) {
    return (Array.isArray(e.queueSegments) ? e.queueSegments : [])
      .map((e) => ({ start: vu(Aa(e)), end: vu(Ca(e)) }))
      .filter((e) => null !== e.start && null !== e.end && e.end > e.start);
  }
  function To() {
    ((F.pendingOriginal = ""),
      (F.pendingOriginalUpdatedAt = 0),
      (F.currentOriginal = ""),
      (F.currentTranslation = ""),
      (F.translationSource = ""),
      (F.translationUpdatedAt = 0),
      (F.activeSegment = null),
      (F.segmentQueue = []),
      (F.lastQueueSignature = ""),
      (F.largeSegmentHistory = []),
      (F.subtitleRenderSignature = ""),
      (F.largeRenderSignature = ""),
      (F.subtitleFading = !1),
      (F.subtitleDisplayBlank = !1),
      (F.draftOriginal = ""),
      (F.draftTranslation = ""));
  }
  function ko(e, t = {}) {
    const n = vu(e);
    if (null === n) return null;
    if (!Na()) return null;
    const a = Da(F.subtitleTimelineCache || []).filter(
      (e) => !0 !== e?.fallbackDisplayed && null !== Aa(e),
    );
    if (!a.length) return null;
    const i = a.map((e, t) => {
        const n = Aa(e);
        return { segment: e, start: n, end: Zc(e, Aa(a[t + 1])) ?? n };
      }),
      s = m;
    let r = i.findIndex((e) => e.end >= n - s && e.start <= n + 8),
      o = null;
    if (r < 0 && !0 === t.allowProvenNoTextLeadingGap) {
      const e = i.findIndex((e) => e.end > n && e.start > n);
      if (e >= 0) {
        const t = i[e],
          a = t.start - n;
        if (a > 8 && a <= 120) {
          const a = (function (e, t) {
            const n = vu(e),
              a = vu(t);
            if (null === n || null === a || a <= n)
              return { covered: !0, gapSeconds: 0, rangeCount: 0, ranges: [] };
            const i = Wa(),
              s = (
                Array.isArray(F.sync?.completedSubtitleRanges)
                  ? F.sync.completedSubtitleRanges
                  : []
              ).filter(
                (e) =>
                  (!e.mediaContextKey || !i || e.mediaContextKey === i) &&
                  e.end > n &&
                  e.start < a,
              ),
              r = s.filter(
                (e) =>
                  !0 !== e.noText &&
                  Math.min(a, e.end) - Math.max(n, e.start) > y,
              );
            if (r.length)
              return {
                covered: !1,
                gapSeconds: a - n,
                rangeCount: 0,
                blockingRangeCount: r.length,
                ranges: [],
              };
            const o = s
              .filter((e) => !0 === e.noText)
              .map((e) => ({ start: e.start, end: e.end }));
            return {
              covered: wl(o, n, Math.max(n, a - y), y),
              gapSeconds: a - n,
              rangeCount: o.length,
              blockingRangeCount: 0,
              ranges: o,
            };
          })(n, t.start);
          a.covered && ((r = e), (o = a));
        }
      }
    }
    if (r < 0) return null;
    let l = r,
      d = 0;
    for (; l < i.length - 1; ) {
      const e = i[l];
      if (e.end - n >= 1.25) break;
      const t = i.findIndex(
        (t, a) => a > l && t.end > e.end + 0.01 && t.start - n <= 1.25,
      );
      if (t < 0) break;
      ((d += t - l), (l = t));
    }
    const c = i[l],
      u = c.start > n ? c.start - n : n - c.end;
    if (u > 8 && !0 !== o?.covered) return null;
    const p = i
        .slice(l)
        .filter((e) => e.end >= n - s)
        .slice(0, 1800)
        .map((e) => e.segment),
      g = i
        .slice(0, l)
        .filter((e) => e.end >= n - 10)
        .map((e) => e.segment)
        .slice(-18),
      f = p[p.length - 1] || c.segment;
    return {
      queueSegments: p,
      contextSegments: g,
      cacheStartMediaTime: Aa(a[0]),
      cacheEndMediaTime: Ca(f) ?? Aa(f),
      targetMediaTime: n,
      skippedNearlyEndedSegments: d,
      leadingNoTextCoverage: o ? { ...o, gapSeconds: u } : null,
    };
  }
  function xo() {
    F.sync.cachedSubtitleReplay = {
      active: !1,
      targetMediaTime: null,
      cacheStartMediaTime: null,
      cacheEndMediaTime: null,
      allowRedisplay: !1,
      startedAtMs: 0,
      lastStatusAtMs: 0,
    };
  }
  function Ao(e = null, t = Date.now()) {
    if (!dd(t)) return !1;
    const n = vu(F.sync.lastViewerTimelineJumpFrom),
      a = vu(F.sync.lastViewerTimelineJumpTo);
    if (null === n || null === a || a >= n - 8) return !1;
    const i = vu(e);
    if (null === i) return !0;
    const s = bd();
    return Math.abs(i - a) <= Math.max(8, s + 2);
  }
  function Co(e, t) {
    if (!bn(e)) return !1;
    const n = vu(t),
      a = Ca(e);
    return null === n || null === a || a < n - R;
  }
  function Ro(e, t = "queue-starved") {
    if (F.sync.cachedSubtitleReplay?.active) return !1;
    if (F.activeSegment) return !1;
    if (!F.subtitleTimelineCache.length) return !1;
    const n = vu(e);
    if (null === n) return !1;
    const a = Ao(n);
    if (
      !F.sync.pendingCachedReplayActivation &&
      !0 !== F.config?.hybridSubtitleCacheMode &&
      !0 !== F.config?.cacheReplayMode &&
      !a
    )
      return !1;
    const i = F.segmentQueue.length ? vu(Aa(F.segmentQueue[0])) : null;
    if (F.segmentQueue.length && (null === i || i - n <= 8)) return !1;
    const s = Date.now();
    if (s - (vu(F.sync.lastCachedReplayResumeAttemptAtMs) || 0) < 1e3)
      return !1;
    F.sync.lastCachedReplayResumeAttemptAtMs = s;
    const r = ko(n);
    if (!r?.queueSegments?.length) return !1;
    const o = Lo(n, r, t);
    if (_l() && !o.ready)
      return (
        Ja(
          "mse.startup_wait.cache_replay_hold",
          {
            reason: t,
            targetMediaTime: n,
            cacheStartMediaTime: vu(r.cacheStartMediaTime),
            cacheEndMediaTime: vu(r.cacheEndMediaTime),
            contiguousCacheStartMediaTime: vu(o.contiguousCacheStartMediaTime),
            contiguousCacheEndMediaTime: vu(o.contiguousCacheEndMediaTime),
            contiguousCacheGapSeconds: vu(o.contiguousCacheGapSeconds),
            cacheLeadSeconds: vu(o.cacheLeadSeconds),
            coverageGapSeconds: vu(o.coverageGapSeconds),
            staleGapSeconds: vu(o.staleGapSeconds),
            minLeadSeconds: vu(o.minLeadSeconds),
            latencyP95Seconds: vu(o.latencyP95Seconds),
            latencySource: ku(o.latencySource || ""),
            waitReason: String(F.sync.mseStartupWaitReason || ""),
          },
          "warn",
        ),
        !1
      );
    let l = a
      ? r.queueSegments.slice()
      : r.queueSegments.filter((e) => !Jt(e, F.activeSegment) && !Co(e, n));
    if (
      (null !== i &&
        (l = l.filter((e) => {
          const t = vu(Aa(e));
          return null !== t && t < i - 0.25;
        })),
      !l.length)
    )
      return !1;
    const d = Vl(),
      c = Do(n, r, t);
    if (d && !c) return !1;
    ((F.sync.pendingCachedReplayActivation = !1),
      (F.sync.cachedSubtitleReplay = {
        active: !0,
        targetMediaTime: n,
        cacheStartMediaTime: r.cacheStartMediaTime,
        cacheEndMediaTime: r.cacheEndMediaTime,
        allowRedisplay: a,
        startedAtMs: s,
        lastStatusAtMs: 0,
      }),
      Ea(l, n),
      (F.sync.pendingViewerSeek = null),
      (F.sync.delayBuffering = !1),
      (F.sync.delayArmed = !0),
      (F.sync.delayArmedAt = s),
      (F.sync.ready = !0));
    const u = bd(),
      m = vu(F.sync.lockedDelaySeconds);
    ((F.sync.targetDelaySeconds = u),
      (F.sync.lockedDelaySeconds = null !== m && m >= u - E ? m : u));
    const y = l.map((e) => gn({ ...e, cacheReplay: !0 }, s));
    return (
      (F.segmentQueue = F.segmentQueue.length ? fn(F.segmentQueue, y) : y),
      (F.lastQueueSignature = Yn(F.segmentQueue)),
      (F.subtitleHadContent = !0),
      (F.subtitleFading = !1),
      (F.subtitleDisplayBlank = !1),
      (F.status = "使用已快取字幕回放"),
      Ja(
        "subtitle.cache.replay_resume",
        {
          reason: t,
          targetMediaTime: n,
          queuedSegments: y.length,
          queueGapSeconds: null !== i ? Math.round(1e3 * (i - n)) / 1e3 : null,
          rewatching: a,
          cacheStartMediaTime: r.cacheStartMediaTime,
          cacheEndMediaTime: r.cacheEndMediaTime,
          cacheSegments: F.subtitleTimelineCache.length,
        },
        "info",
      ),
      kn(),
      !0
    );
  }
  function Do(e, t = {}, n = "cache-replay-covered") {
    if (!Vl()) return !1;
    const a = Lo(e, t, n);
    if (!a.ready)
      return (
        Ja(
          "mse.startup_wait.cache_replay_hold",
          {
            reason: n,
            targetMediaTime: vu(e),
            cacheStartMediaTime: vu(t.cacheStartMediaTime),
            cacheEndMediaTime: vu(t.cacheEndMediaTime),
            contiguousCacheStartMediaTime: vu(a.contiguousCacheStartMediaTime),
            contiguousCacheEndMediaTime: vu(a.contiguousCacheEndMediaTime),
            contiguousCacheGapSeconds: vu(a.contiguousCacheGapSeconds),
            cacheLeadSeconds: vu(a.cacheLeadSeconds),
            coverageGapSeconds: vu(a.coverageGapSeconds),
            staleGapSeconds: vu(a.staleGapSeconds),
            minLeadSeconds: vu(a.minLeadSeconds),
            latencyP95Seconds: vu(a.latencyP95Seconds),
            latencySource: ku(a.latencySource || ""),
            waitReason: String(F.sync.mseStartupWaitReason || ""),
          },
          "warn",
        ),
        !1
      );
    (a.fastStartReleased
      ? Ja(
          "mse.startup_wait.cache_replay_fast_release",
          {
            reason: n,
            targetMediaTime: vu(e),
            cacheLeadSeconds: vu(a.cacheLeadSeconds),
            minLeadSeconds: vu(a.minLeadSeconds),
            fastStartLeadSeconds: vu(a.fastStartLeadSeconds),
            holdElapsedMs: vu(a.holdElapsedMs),
            contiguousCacheStartMediaTime: vu(a.contiguousCacheStartMediaTime),
            contiguousCacheEndMediaTime: vu(a.contiguousCacheEndMediaTime),
          },
          "info",
        )
      : a.boundedStartReleased &&
        Ja(
          "mse.startup_wait.cache_replay_bounded_release",
          {
            reason: n,
            targetMediaTime: vu(e),
            cacheLeadSeconds: vu(a.cacheLeadSeconds),
            minLeadSeconds: vu(a.minLeadSeconds),
            fastStartLeadSeconds: vu(a.fastStartLeadSeconds),
            holdElapsedMs: vu(a.holdElapsedMs),
            maxHoldMs: vu(a.maxHoldMs),
            contiguousCacheStartMediaTime: vu(a.contiguousCacheStartMediaTime),
            contiguousCacheEndMediaTime: vu(a.contiguousCacheEndMediaTime),
          },
          "warn",
        ),
      (F.sync.cacheReplayStartupHoldStartedAtMs = 0),
      (F.sync.mseStartupWaitReleased = !0),
      (F.sync.mseStartupWaitActive = !1));
    const i = Ul();
    return (
      an(e, "mse-startup-cache-replay"),
      rl(),
      (Ke = null),
      (F.sync.mseStartupWaitReadyAt = Date.now()),
      Ja("mse.startup_wait.released", {
        reason: "cache-replay-covered",
        cacheReplayReason: n,
        forced: !1,
        sourceType: "subtitle-cache",
        audioInputMode: "subtitle-cache",
        segmentCount: Array.isArray(t.queueSegments)
          ? t.queueSegments.length
          : 0,
        releaseMediaTime: vu(i.viewerMediaTime),
        targetMediaTime: vu(e),
        cacheStartMediaTime: vu(t.cacheStartMediaTime),
        cacheEndMediaTime: vu(t.cacheEndMediaTime),
        contiguousCacheStartMediaTime: vu(a.contiguousCacheStartMediaTime),
        contiguousCacheEndMediaTime: vu(a.contiguousCacheEndMediaTime),
        contiguousCacheGapSeconds: vu(a.contiguousCacheGapSeconds),
        cacheLeadSeconds: vu(a.cacheLeadSeconds),
        minLeadSeconds: vu(a.minLeadSeconds),
        latencyP95Seconds: vu(a.latencyP95Seconds),
        latencySource: ku(a.latencySource || ""),
        releasedDelaySeconds: i.delaySeconds,
        targetDelaySeconds: i.targetDelaySeconds,
        resumed: i.resumed,
      }),
      (F.sync.status = "已用快取字幕銜接，MSE 字幕繼續補齊"),
      !0
    );
  }
  function Lo(e, t = {}, n = "") {
    const a =
        String(F.sync.mseStartupWaitReason || "").includes("seek") ||
        String(n || "").includes("seek"),
      i = Boolean(!a && !0 === F.config?.hybridSubtitleCacheMode);
    if (!a && !i)
      return {
        ready: !0,
        cacheLeadSeconds: null,
        coverageGapSeconds: 0,
        staleGapSeconds: 0,
        minLeadSeconds: null,
      };
    const s = vu(e) ?? vu(F.sync.mseStartupWaitTargetMediaTime),
      r = Eo(t, s),
      o = vu(r?.start ?? t.cacheStartMediaTime),
      l = vu(r?.end ?? t.cacheEndMediaTime),
      d = i ? Bo() : null,
      c = a ? Math.max(4, bd()) : 4,
      u = d?.leadSeconds ?? c;
    if (null === s || null === o || null === l)
      return {
        ready: !1,
        cacheLeadSeconds: null,
        coverageGapSeconds: null,
        staleGapSeconds: null,
        minLeadSeconds: u,
        latencyP95Seconds: d?.latencyP95Seconds ?? null,
        latencySource: d?.latencySource || "",
      };
    const m = Math.max(0, o - s),
      y = Math.max(0, s - l),
      p = Math.max(0, l - s),
      g = Math.max(U, Pl()),
      f = m <= g && y <= g,
      S = p + N >= u,
      h = Math.min(u, 10),
      b = Cu(1e3 * u, 1e4, 3e4);
    let v = 0,
      M = !1,
      w = !1,
      T = !1;
    if (i) {
      const e = m <= U && y <= U;
      if (((M = e && p + N >= h), (w = M && !S), e && p >= 1 && !S && !w)) {
        const e = Date.now();
        (vu(F.sync.cacheReplayStartupHoldStartedAtMs) > 0 ||
          (F.sync.cacheReplayStartupHoldStartedAtMs = e),
          (v = Math.max(0, e - F.sync.cacheReplayStartupHoldStartedAtMs)),
          (T = v >= b));
      }
    }
    return {
      ready: f && (S || w || T),
      cacheLeadSeconds: p,
      coverageGapSeconds: m,
      staleGapSeconds: y,
      minLeadSeconds: u,
      fastStartLeadSeconds: h,
      maxHoldMs: b,
      maxCoverageGapSeconds: g,
      contiguousCacheStartMediaTime: vu(r?.start),
      contiguousCacheEndMediaTime: vu(r?.end),
      contiguousCacheGapSeconds: vu(r?.maxGapSeconds),
      fullRunwayReady: S,
      fastStartEligible: M,
      fastStartReleased: w,
      boundedStartReleased: T,
      holdElapsedMs: v,
      latencyP95Seconds: d?.latencyP95Seconds ?? null,
      latencySource: d?.latencySource || "",
    };
  }
  function Bo() {
    const e = Math.max(
        0,
        ...[
          F.sync.fixedDelaySeconds,
          F.sync.targetDelaySeconds,
          F.config?.syncDelaySeconds,
        ]
          .map((e) => vu(e))
          .filter((e) => null !== e),
      ),
      t = Ad(Rd()),
      n = t.samples.length >= 5 ? Td(t.samples, t.source) : null,
      a = F.sync.latencyPercentiles,
      i = mn([
        n?.p95Seconds,
        (vu(a?.sampleCount) || 0) >= 5 ? a?.p95Seconds : null,
      ]),
      s = ku(
        n?.source ||
          (null !== i ? a?.source || "recent-session" : "configured-delay"),
      ),
      r = null === i ? 0 : i + 2;
    return {
      leadSeconds: Cu(Math.max(10, e, r), 10, 60),
      configuredDelaySeconds: e,
      latencyP95Seconds: i,
      latencySource: s,
    };
  }
  function Eo(e = {}, t = null) {
    const n = vu(t);
    if (null === n) return null;
    const a = (Array.isArray(e.queueSegments) ? e.queueSegments : [])
      .map((e) => on(e))
      .filter((e) => e && e.end >= e.start)
      .map((e) => ({ start: vu(e.start), end: vu(e.end) }))
      .filter((e) => null !== e.start && null !== e.end && e.end > e.start)
      .sort((e, t) => e.start - t.start);
    if (!a.length) return null;
    const i = Math.min(Pl(), 1.1);
    let s = null,
      r = null;
    for (const e of a)
      if (null !== r) {
        if (e.start > r + i) break;
        r = Math.max(r, e.end);
      } else {
        if (e.end < n - U) continue;
        ((s = e.start), (r = e.end));
      }
    return null === s || null === r
      ? null
      : { start: s, end: r, maxGapSeconds: i };
  }
  async function Po(e, t, n = {}) {
    const a = [];
    let i = "";
    for (let n = 1; n <= 2; n += 1) {
      const s = vu(e?.currentTime);
      let r = !1;
      try {
        r = cd(e, t);
      } catch (e) {
        ((i = e?.message || "seek threw"), (r = !1));
      }
      const o = r ? await Io(e, t, 3200) : Uo(e, t),
        l = vu(e?.currentTime);
      if (
        (a.push({
          attempt: n,
          didSeek: r,
          reached: o,
          beforeTime: s,
          afterTime: l,
        }),
        o)
      )
        return { reached: !0, attempts: a, failureReason: "", error: "" };
      n < 2 && (await new Promise((e) => window.setTimeout(e, 120)));
    }
    return {
      reached: !1,
      attempts: a,
      failureReason: "source-current-time-not-near-target",
      error: i,
      seekId: n.seekId || null,
      requestedTargetMediaTime: vu(n.requestedTargetMediaTime),
    };
  }
  function Io(e, t, n = 1600) {
    return e
      ? Uo(e, t)
        ? Promise.resolve(!0)
        : new Promise((a) => {
            let i = !1,
              s = null;
            const r = (t) => {
                i ||
                  ((i = !0),
                  s && window.clearTimeout(s),
                  e.removeEventListener("seeked", o, !0),
                  e.removeEventListener("timeupdate", o, !0),
                  a(t));
              },
              o = () => {
                Uo(e, t) && r(!0);
              };
            (e.addEventListener("seeked", o, !0),
              e.addEventListener("timeupdate", o, !0),
              (s = window.setTimeout(() => r(!1), n)),
              o());
          })
      : Promise.resolve(!1);
  }
  function Uo(e, t) {
    const n = vu(e?.currentTime);
    return null !== n && Math.abs(n - t) <= _;
  }
  function _o(e, t, n = {}) {
    const a = Qd("seek-target", e),
      i = vu(a.seekableStartSeconds) ?? 0,
      s = vu(a.seekableEndSeconds),
      r = vu(a.duration);
    return (("boolean" == typeof F.config?.sourceIsLiveStream &&
      F.config.sourceIsLiveStream) ??
      !0 === a.isLiveStream) ||
      !0 !== n.preserveVodStartupAnchor
      ? Cu(t, i, s ?? (null !== r ? Math.max(0, r - 0.25) : t))
      : Cu(t, 0, null !== r ? Math.max(0, r - 0.25) : Math.max(t, s ?? t));
  }
  function qo() {
    ((F.sync.sourceBehindViewerDetectedAtMs = 0),
      (F.sync.sourceBehindViewerSamples = 0));
  }
  function Oo(e, t, n = "直播", a = null, i = {}) {
    if (!F.sync.adaptiveSubtitleHold) return null;
    const s =
        vu(F.sync.lockedDelaySeconds) ??
        vu(F.sync.targetDelaySeconds) ??
        F.sync.fixedDelaySeconds,
      r = Cu(Math.max(s, vu(t) ?? s), 2, A);
    ((F.sync.adaptiveSubtitleHold = !1),
      (F.sync.adaptiveSubtitleHoldStartedAt = 0),
      (F.sync.adaptiveSubtitleHoldTargetSeconds = null),
      (F.sync.adaptiveSubtitleHoldPendingKey = ""),
      i.timedOut || (F.sync.adaptiveSubtitleHoldTimedOutKey = ""),
      (F.sync.delayBuffering = !1),
      Bc(),
      (F.sync.lockedDelaySeconds = r),
      (F.sync.targetDelaySeconds = r),
      (F.sync.actualDelaySeconds = t),
      (F.sync.lastAdaptiveDelayIncreaseAt = Date.now()),
      i.resume && fd(e));
    const o = Xc();
    return (
      Ja(
        "sync.subtitle_buffer.hold_end",
        {
          label: n,
          actualDelaySeconds: t,
          nextLockedDelaySeconds: r,
          timedOut: Boolean(i.timedOut),
          resumed: Boolean(i.resume),
          targetSegments: Fn(),
          readySegments: o.ready,
          readyBufferSeconds: o.bufferSeconds,
          targetBufferSeconds: o.targetSeconds,
          bufferFrontierMediaTime: o.frontierMediaTime,
        },
        i.timedOut ? "warn" : "info",
      ),
      {
        ready: !0,
        status: `${Cc(n, t, a)} / 已自動加長到 ${Pc(r)}${i.timedOut ? "，等待下一段字幕" : ""}`,
      }
    );
  }
  function Vo() {
    if (!F.sync.adaptiveSubtitleHold) return !1;
    const e = Fn();
    if (
      !(function (e = Fn()) {
        return zn(Xc(e), e);
      })(e)
    )
      return !1;
    e > 0 && (F.sync.subtitleBufferPrimed = !0);
    const t = Yd(),
      n = Qd("viewer", t),
      a = Oo(
        t,
        vu(F.sync.actualDelaySeconds) ??
          vu(n.actualDelaySeconds) ??
          vu(F.sync.lockedDelaySeconds) ??
          F.sync.fixedDelaySeconds,
        Boolean(F.sync.sourceTiming?.isLiveStream || n.isLiveStream)
          ? "直播"
          : "一般影片",
        null,
        { resume: !0 },
      );
    return !!a && ((F.sync.ready = a.ready), (F.sync.status = a.status), !0);
  }
  function $o() {
    je && (window.clearTimeout(je), (je = null));
  }
  function Wo(e = "reset", t = {}) {
    const n = F.sync.singleTabMseStartupGate || {
        active: !1,
        phase: "idle",
        strategy: "audible-preload-single-seek-back",
        seekBackOnRelease: !0,
        anchorMediaTime: null,
        startedAtMs: 0,
        preloadingStartedAtMs: 0,
        firstAudioCapturedAtMs: 0,
        firstAudioWarningLogged: !1,
        releasedAtMs: 0,
        baselineSegmentCount: 0,
        baselineRawLeadSeconds: 0,
        rawLeadSeconds: 0,
        rawLeadGainSeconds: 0,
        rawCaptureRate: 0,
        preloadedMediaSeconds: 0,
        lastRawLeadGrowthAtMs: 0,
        lastRawLeadSampleAtMs: 0,
        readyLeadSeconds: 0,
        requiredLeadSeconds: 0,
        countdownTargetSeconds: 0,
        latencyP95Seconds: null,
        latencySource: "",
        lastReadinessAtMs: 0,
        playbackRetryCount: 0,
        lastPlayAttemptAtMs: 0,
        lastPlaybackMediaTime: null,
        lastPlaybackProgressAtMs: 0,
        unbufferedAnchorRecoveryCount: 0,
        lastProgressLogAtMs: 0,
        timelineResetPending: !1,
        timelineRevision: null,
        seekCatchup: !1,
        resumeRequested: !1,
        videoWasPaused: !1,
        holdAppliedAtMs: 0,
        holdTimeoutMs: 0,
        mediaContextKey: "",
        configuredMediaContextKey: "",
        viewerMediaSwitchEpoch: null,
      },
      a = Boolean(n.active),
      i = a ? Yd() : null,
      s = vu(n.anchorMediaTime),
      r = !n.mediaContextKey || n.mediaContextKey === yc(),
      o = mt(F.config || {}),
      l = Boolean(
        !n.configuredMediaContextKey || !o || n.configuredMediaContextKey === o,
      ),
      d = vu(n.viewerMediaSwitchEpoch),
      c = vu(F.config?.viewerMediaSwitchEpoch),
      u = Boolean(null === d || null === c || d === c),
      m = Boolean(
        a &&
          !1 !== n.seekBackOnRelease &&
          !0 === t.seekBack &&
          r &&
          l &&
          u &&
          i &&
          null !== s,
      );
    (m && bo(i, s, { forceInternal: !0 }),
      $o(),
      (F.sync.singleTabMseInternalPauseUntilMs = 0));
    const y = Boolean(
      a &&
        i &&
        r &&
        l &&
        u &&
        n.resumeRequested &&
        !1 !== t.resume &&
        i.paused &&
        !F.sync.userPaused,
    );
    if (y) {
      So(1800);
      try {
        const e = i.play();
        e?.catch && e.catch(() => {});
      } catch {}
    }
    (a &&
      !1 !== t.log &&
      Ja(
        "mse.single_tab_startup.cancelled",
        {
          reason: e,
          phase: n.phase || "",
          anchorMediaTime: s,
          seekBack: m,
          resumed: y,
          strategy: ku(n.strategy || ""),
          mediaContextMatched: r,
          configuredMediaContextMatched: l,
          mediaSwitchEpochMatched: u,
          rawLeadSeconds: vu(n.rawLeadSeconds),
          readyLeadSeconds: vu(n.readyLeadSeconds),
          requiredLeadSeconds: vu(n.requiredLeadSeconds),
          preloadedMediaSeconds: vu(n.preloadedMediaSeconds),
          elapsedMs: n.startedAtMs
            ? Math.max(0, Date.now() - n.startedAtMs)
            : 0,
        },
        "info",
      ),
      (F.sync.singleTabMseStartupGate = {
        active: !1,
        phase: "idle",
        strategy: "audible-preload-single-seek-back",
        seekBackOnRelease: !0,
        anchorMediaTime: null,
        startedAtMs: 0,
        preloadingStartedAtMs: 0,
        firstAudioCapturedAtMs: 0,
        firstAudioWarningLogged: !1,
        releasedAtMs: 0,
        baselineSegmentCount: 0,
        baselineRawLeadSeconds: 0,
        rawLeadSeconds: 0,
        rawLeadGainSeconds: 0,
        rawCaptureRate: 0,
        preloadedMediaSeconds: 0,
        lastRawLeadGrowthAtMs: 0,
        lastRawLeadSampleAtMs: 0,
        readyLeadSeconds: 0,
        requiredLeadSeconds: 0,
        countdownTargetSeconds: 0,
        latencyP95Seconds: null,
        latencySource: "",
        lastReadinessAtMs: 0,
        playbackRetryCount: 0,
        lastPlayAttemptAtMs: 0,
        lastPlaybackMediaTime: null,
        lastPlaybackProgressAtMs: 0,
        unbufferedAnchorRecoveryCount: 0,
        lastProgressLogAtMs: 0,
        timelineResetPending: !1,
        timelineRevision: null,
        seekCatchup: !1,
        resumeRequested: !1,
        videoWasPaused: !1,
        holdAppliedAtMs: 0,
        holdTimeoutMs: 0,
        mediaContextKey: "",
        configuredMediaContextKey: "",
        viewerMediaSwitchEpoch: null,
      }));
  }
  function No(e = "media-context-mismatch") {
    const t = mt(F.config || {}),
      n = yc();
    if (!t || !n || t === n) return !1;
    const a = Boolean(F.sync.singleTabMseStartupGate?.active),
      i = null !== Ze;
    return (
      Wo(e, { seekBack: !1, restoreAudio: !0, log: a }),
      sl(),
      rl(),
      (Ke = null),
      Ze && (window.clearTimeout(Ze), (Ze = null)),
      (F.sync.pendingViewerSeek = null),
      (F.sync.mseStartupWaitActive = !1),
      (F.sync.mseStartupWaitReleased = !1),
      (F.sync.mseStartupWaitStartedAt = 0),
      (F.sync.mseStartupWaitReadyAt = 0),
      (F.sync.mseStartupWaitReason = ""),
      (F.sync.mseStartupWaitTargetMediaTime = null),
      (F.sync.mseStartupWaitResumeRequested = !1),
      (F.sync.delayBuffering = !1),
      (F.sync.delayBufferStartedAt = 0),
      en(),
      (a || i) &&
        Ja(
          "mse.single_tab_startup.media_context_cancelled",
          {
            reason: e,
            configuredMediaContextKey: t,
            activeMediaContextKey: n,
            gateWasActive: a,
            hadPendingReset: i,
          },
          "warn",
        ),
      !0
    );
  }
  function Go(e = null, t = "disabled") {
    const n = Yd(),
      a = F.sync.singleTabMseStartupGate,
      i = Boolean(a?.active),
      s = vu(a?.preloadedMediaSeconds);
    return (
      Wo(`seek-catchup-${t}`, { seekBack: !1, restoreAudio: !0 }),
      sl(),
      rl(),
      (Ke = null),
      (F.sync.mseStartupWaitReleased = !0),
      (F.sync.mseStartupWaitActive = !1),
      (F.sync.mseStartupWaitReadyAt = Date.now()),
      (F.sync.mseStartupWaitReason = ""),
      (F.sync.mseStartupWaitTargetMediaTime = null),
      (F.sync.mseStartupWaitResumeRequested = !1),
      (F.sync.delayBuffering = !1),
      (F.sync.delayBufferStartedAt = 0),
      (F.sync.delayArmed = !0),
      (F.sync.delayArmedAt = Date.now()),
      (F.sync.ready = !0),
      (F.sync.viewerMediaTime = vu(n?.currentTime) ?? vu(e)),
      (F.sync.viewerWallTimeMs = Date.now()),
      (F.sync.viewerPlaybackRate = n?.paused ? 0 : vu(n?.playbackRate) || 1),
      (F.sync.status = F.sync.userPaused
        ? "已跳轉；按播放後繼續，未完成字幕會略過"
        : "已跳轉；字幕在背景追趕，未完成字幕會略過"),
      Bc(),
      Ja(
        "mse.single_tab_seek.catchup_bypassed",
        {
          reason: t,
          targetMediaTime: vu(e),
          viewerMediaTime: vu(n?.currentTime),
          viewerPaused: Boolean(n?.paused),
          wasActive: i,
          preloadedMediaSeconds: s,
          timelineResetStillRequired: !0,
        },
        "info",
      ),
      !0
    );
  }
  function Ho() {
    const e = Bo(),
      t = Math.max(
        0,
        ...[F.sync.fixedDelaySeconds, F.config?.syncDelaySeconds]
          .map((e) => vu(e))
          .filter((e) => null !== e),
      ),
      n = vu(e.latencyP95Seconds),
      a = null === n ? 0 : n + 2;
    return {
      leadSeconds: Cu(Math.max(10, t, a), 10, 30),
      configuredDelaySeconds: t,
      latencyP95Seconds: n,
      latencySource: ku(e.latencySource || "configured-default"),
    };
  }
  function Fo(e = Yd(), t = null) {
    const n =
        vu(t) ??
        vu(F.sync.singleTabMseStartupGate?.anchorMediaTime) ??
        vu(e?.currentTime),
      a = [],
      i = lt(e);
    if (null !== n && i.length) {
      const e = i.find(([e, t]) => e <= n + 0.08 && t >= n + 0.08);
      return e ? Cu(Math.max(0, e[1] - n), 0, H) : 0;
    }
    const s = vu(F.mseAudio.lastBufferedStart),
      r = vu(F.mseAudio.lastBufferedEnd);
    if (
      (null !== n &&
        null !== r &&
        (null === s || s <= n + 0.25) &&
        r >= n &&
        a.push(r - n),
      null !== n)
    )
      for (const [t, i] of lt(e)) t <= n + 0.25 && i >= n && a.push(i - n);
    const o = vu(F.mseAudio.lastLeadSeconds);
    return (null !== o && a.push(o), Cu(Math.max(0, ...a), 0, H));
  }
  function zo(e = Yd(), t = Date.now()) {
    const n = F.sync.singleTabMseStartupGate;
    if (!n?.active) return 0;
    const a = Fo(e, n.anchorMediaTime);
    (a > Math.max(0, vu(n.rawLeadSeconds) || 0) + 0.08 &&
      (n.lastRawLeadGrowthAtMs = t),
      (n.rawLeadSeconds = a),
      (n.rawLeadGainSeconds = Math.max(
        0,
        a - Math.max(0, vu(n.baselineRawLeadSeconds) || 0),
      )));
    const i = n.preloadingStartedAtMs
      ? Math.max(0, (t - n.preloadingStartedAtMs) / 1e3)
      : 0;
    n.rawCaptureRate = i > 0.1 ? n.rawLeadGainSeconds / i : 0;
    const s = vu(e?.currentTime),
      r = vu(n.anchorMediaTime),
      o = vu(n.lastPlaybackMediaTime);
    return (
      null !== s &&
        (null === o || Math.abs(s - o) > 0.08) &&
        (n.lastPlaybackProgressAtMs = t),
      (n.lastPlaybackMediaTime = s),
      (n.preloadedMediaSeconds =
        null !== s && null !== r ? Math.max(0, s - r) : 0),
      (n.lastRawLeadSampleAtMs = t),
      a
    );
  }
  function Ko(e = Yd(), t = "preload", n = Date.now()) {
    const a = F.sync.singleTabMseStartupGate;
    if (!a?.active || !e || F.sync.userPaused) return !1;
    ((a.lastPlayAttemptAtMs = n), So(1800));
    try {
      const n = e.play();
      return (
        n?.catch &&
          n.catch((e) => {
            a.active &&
              Ja(
                "mse.single_tab_startup.play_blocked",
                {
                  reason: t,
                  phase: a.phase,
                  error: ku(e?.message || String(e || "play rejected")),
                },
                "warn",
              );
          }),
        !0
      );
    } catch (e) {
      return (
        Ja(
          "mse.single_tab_startup.play_blocked",
          {
            reason: t,
            phase: a.phase,
            error: ku(e?.message || String(e || "play failed")),
          },
          "warn",
        ),
        !1
      );
    }
  }
  function jo(e = Date.now()) {
    const t = F.sync.singleTabMseStartupGate || {},
      n = Math.max(0, vu(t.readyLeadSeconds) || 0),
      a = Math.max(10, vu(t.requiredLeadSeconds) || 10),
      i = Math.max(0, vu(t.rawLeadSeconds) || 0),
      s = t.startedAtMs ? Math.max(0, (e - t.startedAtMs) / 1e3) : 0;
    return t.firstAudioCapturedAtMs
      ? `正在準備字幕 · 已等待 ${Pc(s)} / ${Pc(a)} · 原始緩衝 ${Pc(i)} · 字幕 ${Pc(n)}`
      : `正在準備字幕 · 已等待 ${Pc(s)} / ${Pc(a)} · 正在取得音訊`;
  }
  function Qo() {
    return (
      $o(),
      !!F.sync.singleTabMseStartupGate?.active &&
        ((je = window.setTimeout(() => {
          ((je = null), Jo("timer"));
        }, 200)),
        !0)
    );
  }
  function Jo(e = "monitor") {
    const t = F.sync.singleTabMseStartupGate;
    if (!t?.active || !ql()) return (t?.active && Wo("config-inactive"), !1);
    if (t.deadlineAtMs > 0 && Date.now() >= t.deadlineAtMs)
      return (Xo("startup-deadline-expired"), !1);
    const n = Yd();
    if (!n)
      return (
        (F.sync.ready = !1),
        (F.sync.status = "正在尋找影片播放器，準備完整字幕"),
        Qo(),
        ei(),
        !0
      );
    const a = Date.now(),
      i = Math.max(0, a - (t.startedAtMs || a)),
      s = zo(n, a),
      r = Math.max(0, Number(F.mseAudio.segmentCount) || 0),
      o = Boolean(
        r > t.baselineSegmentCount ||
          (F.mseAudio.lastSegmentAt &&
            F.mseAudio.lastSegmentAt >= t.startedAtMs - 2e3) ||
          (s >= 0.5 &&
            Math.max(0, Number(F.mseAudio.audioSourceBufferCount) || 0) > 0),
      );
    return (
      o && !t.firstAudioCapturedAtMs
        ? ((t.firstAudioCapturedAtMs = a),
          Ja(
            "mse.single_tab_startup.audio_ready",
            {
              elapsedMs: Math.max(0, a - t.startedAtMs),
              anchorMediaTime: vu(t.anchorMediaTime),
              playbackMediaTime: vu(n.currentTime),
              preloadedMediaSeconds: vu(t.preloadedMediaSeconds),
              rawLeadSeconds: s,
              segmentCount: r,
            },
            "info",
          ))
        : !o &&
          !t.firstAudioWarningLogged &&
          a - t.startedAtMs >= 4e3 &&
          ((t.firstAudioWarningLogged = !0),
          Ja(
            "mse.single_tab_startup.audio_waiting",
            {
              elapsedMs: Math.max(0, a - t.startedAtMs),
              anchorMediaTime: vu(t.anchorMediaTime),
              playbackMediaTime: vu(n.currentTime),
              rawLeadSeconds: s,
              segmentCount: r,
              audioSourceBufferCount: Math.max(
                0,
                Number(F.mseAudio.audioSourceBufferCount) || 0,
              ),
            },
            "warn",
          )),
      n.paused &&
        t.resumeRequested &&
        !F.sync.userPaused &&
        a - (t.lastPlayAttemptAtMs || 0) >= 1e3 &&
        ((t.playbackRetryCount += 1), Ko(n, "audible-preload-retry", a)),
      t.holdTimeoutMs > 0 &&
        i >= t.holdTimeoutMs &&
        (Ja(
          "mse.single_tab_startup.preload_timeout_extended",
          {
            reason: "subtitle-coverage-not-ready",
            elapsedMs: i,
            holdTimeoutMs: t.holdTimeoutMs,
            anchorMediaTime: vu(t.anchorMediaTime),
            playbackMediaTime: vu(n.currentTime),
            rawLeadSeconds: s,
            readyLeadSeconds: vu(t.readyLeadSeconds),
            requiredLeadSeconds: vu(t.requiredLeadSeconds),
            muted: Boolean(n.muted),
          },
          "warn",
        ),
        (t.timeoutExtendedAtMs = a),
        (t.holdTimeoutMs = 0)),
      (F.sync.ready = !1),
      (F.sync.actualDelaySeconds = i / 1e3),
      (F.sync.status = jo(a)),
      (function (e = "monitor", t = Date.now()) {
        const n = F.sync.singleTabMseStartupGate;
        !n?.active ||
          t - (n.lastProgressLogAtMs || 0) < 5e3 ||
          ((n.lastProgressLogAtMs = t),
          Ja(
            "mse.single_tab_startup.progress",
            {
              reason: e,
              phase: n.phase,
              anchorMediaTime: vu(n.anchorMediaTime),
              elapsedMs: n.startedAtMs ? Math.max(0, t - n.startedAtMs) : 0,
              preloadElapsedMs: n.preloadingStartedAtMs
                ? Math.max(0, t - n.preloadingStartedAtMs)
                : 0,
              preloadedMediaSeconds: vu(n.preloadedMediaSeconds),
              rawLeadSeconds: vu(n.rawLeadSeconds),
              rawLeadGainSeconds: vu(n.rawLeadGainSeconds),
              rawCaptureRate: vu(n.rawCaptureRate),
              readyLeadSeconds: vu(n.readyLeadSeconds),
              requiredLeadSeconds: vu(n.requiredLeadSeconds),
              segmentCount: Math.max(0, Number(F.mseAudio.segmentCount) || 0),
              playbackRetryCount: Math.max(
                0,
                Number(n.playbackRetryCount) || 0,
              ),
            },
            "info",
          ));
      })(e, a),
      Qo(),
      ei(),
      !0
    );
  }
  function Yo(e, t, n = "", a = "") {
    if (yc() !== t || F.sessionId) return;
    Qe?.remove();
    const i = document.createElement("div");
    (i.setAttribute("role", "alert"),
      Object.assign(i.style, {
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "2147483647",
        maxWidth: "min(520px, calc(100vw - 32px))",
        padding: "16px",
        background: "#181c23",
        color: "#fff",
        border: "1px solid #747b86",
        borderRadius: "8px",
        font: "15px/1.6 system-ui",
      }));
    const s = document.createElement("div");
    s.textContent = a
      ? `字幕已停止：${String(a).slice(0, 500)}`
      : "startup-stt-quality-rejected" === n
        ? "開頭音訊無法可靠辨識，已停止這次字幕處理。歌曲或演唱會可嘗試歌唱模式；原影片可正常播放。"
        : "這次字幕未能及時準備完成，已停止處理。請確認連線後重新開始。";
    const r = document.createElement("button");
    r.textContent = "重新開始字幕";
    const o = document.createElement("button");
    o.textContent = "關閉";
    for (const e of [r, o])
      Object.assign(e.style, {
        margin: "12px 8px 0 0",
        padding: "8px 12px",
        border: "1px solid #969da8",
        borderRadius: "4px",
        color: "#fff",
        background: "#303740",
        cursor: "pointer",
        font: "inherit",
      });
    ((o.onclick = () => {
      (i.remove(), Qe === i && (Qe = null));
    }),
      (r.onclick = async () => {
        if (yc() !== t || F.sessionId) o.onclick();
        else {
          r.disabled = !0;
          try {
            const t = await chrome.runtime.sendMessage({
              type: "START_LIVE_SUBTITLE",
              config: e,
            });
            if (!1 === t?.ok)
              throw new Error(t.error || "請從插件重新開始字幕");
            i.remove();
          } catch (e) {
            ((s.textContent = ku(e.message || "請從插件重新開始字幕")),
              (r.disabled = !1));
          }
        }
      }),
      i.append(s, r, o),
      document.documentElement.appendChild(i),
      (Qe = i));
  }
  function Xo(e = "startup-deadline-expired") {
    const t = F.sync.singleTabMseStartupGate;
    if (!t?.active || t.failureRequested || !F.sessionId) return !1;
    const n = F.sessionId,
      a = { ...F.config },
      i = t.mediaContextKey;
    return (
      (t.failureRequested = !0),
      Ja(
        "mse.single_tab_startup.failed",
        {
          reason: e,
          anchorMediaTime: t.anchorMediaTime,
          elapsedMs: Math.max(0, Date.now() - t.startedAtMs),
          rawLeadSeconds: t.rawLeadSeconds,
          readyLeadSeconds: t.readyLeadSeconds,
        },
        "error",
      ),
      $o(),
      rl(),
      sl(),
      "startup-stt-quality-rejected" === e &&
        Wo(e, { log: !1, seekBack: !0, resume: !0 }),
      (t.active = !1),
      (t.phase = "failed"),
      (F.sync.mseStartupWaitActive = !1),
      (F.sync.delayBuffering = !1),
      (Ke = null),
      bt(),
      (F.status = "字幕準備失敗，正在停止處理"),
      ei(),
      chrome.runtime
        .sendMessage({ type: "STOP_LIVE_SUBTITLE", sessionId: n })
        .then((t) => {
          !1 === t?.ok ||
            (F.sessionId && F.sessionId !== n) ||
            ((F.sessionId = null), zt({ resume: !1 }), Yo(a, i, e));
        })
        .catch(() => {}),
      !0
    );
  }
  function Zo(e = "config", t = {}) {
    if (No(`${e}:media-context-mismatch`)) return !1;
    if (!ql()) return !1;
    const n = F.sync.singleTabMseStartupGate,
      a = vu(t.anchorMediaTime);
    if (
      n?.active &&
      null !== a &&
      null !== vu(n.anchorMediaTime) &&
      Math.abs(n.anchorMediaTime - a) <= _
    )
      return !0;
    if (n?.active && null === a) return !0;
    const i = Yd();
    if (!i) return !1;
    const s = Boolean(i.paused);
    Wo("reprime", { log: !1, resume: !1, seekBack: !1 });
    const r = Date.now(),
      o = Ho(),
      l = mn([
        a,
        i.currentTime,
        F.config?.initialPlaybackMediaTime,
        F.sync.viewerMediaTime,
      ]);
    if (null === l) return !1;
    const d = {
      active: !0,
      phase: "preloading",
      strategy: "audible-preload-single-seek-back",
      seekBackOnRelease: !0,
      anchorMediaTime: null,
      startedAtMs: 0,
      preloadingStartedAtMs: 0,
      firstAudioCapturedAtMs: 0,
      firstAudioWarningLogged: !1,
      releasedAtMs: 0,
      baselineSegmentCount: 0,
      baselineRawLeadSeconds: 0,
      rawLeadSeconds: 0,
      rawLeadGainSeconds: 0,
      rawCaptureRate: 0,
      preloadedMediaSeconds: 0,
      lastRawLeadGrowthAtMs: 0,
      lastRawLeadSampleAtMs: 0,
      readyLeadSeconds: 0,
      requiredLeadSeconds: 0,
      countdownTargetSeconds: 0,
      latencyP95Seconds: null,
      latencySource: "",
      lastReadinessAtMs: 0,
      playbackRetryCount: 0,
      lastPlayAttemptAtMs: 0,
      lastPlaybackMediaTime: null,
      lastPlaybackProgressAtMs: 0,
      unbufferedAnchorRecoveryCount: 0,
      lastProgressLogAtMs: 0,
      timelineResetPending: !1,
      timelineRevision: null,
      seekCatchup: !1,
      resumeRequested: !1,
      videoWasPaused: !1,
      holdAppliedAtMs: 0,
      holdTimeoutMs: 0,
      mediaContextKey: "",
      configuredMediaContextKey: "",
      viewerMediaSwitchEpoch: null,
    };
    return (
      (d.anchorMediaTime = l),
      (d.startedAtMs = r),
      (d.preloadingStartedAtMs = r),
      (d.baselineSegmentCount = Math.max(
        0,
        Number(F.mseAudio.segmentCount) || 0,
      )),
      (d.baselineRawLeadSeconds = Fo(i, l)),
      (d.rawLeadSeconds = d.baselineRawLeadSeconds),
      (d.lastRawLeadGrowthAtMs = r),
      (d.lastRawLeadSampleAtMs = r),
      (d.lastPlaybackMediaTime = vu(i.currentTime)),
      (d.lastPlaybackProgressAtMs = r),
      (d.seekCatchup = Boolean(
        !0 === t.waitForTimelineReset || ku(e || "").includes("seek"),
      )),
      (d.requiredLeadSeconds = d.seekCatchup ? 6 : o.leadSeconds),
      (d.countdownTargetSeconds = d.requiredLeadSeconds),
      (d.latencyP95Seconds = o.latencyP95Seconds),
      (d.latencySource = o.latencySource),
      (d.timelineResetPending = !0 === t.waitForTimelineReset),
      (d.resumeRequested = t.resumeRequested ?? !F.sync.userPaused),
      (d.videoWasPaused = s),
      (d.holdAppliedAtMs = 0),
      (d.mediaContextKey = yc()),
      (d.configuredMediaContextKey = mt(F.config || {})),
      (d.viewerMediaSwitchEpoch = vu(F.config?.viewerMediaSwitchEpoch)),
      (F.sync.singleTabMseStartupGate = d),
      (F.sync.mseStartupWaitActive = !0),
      (F.sync.mseStartupWaitReleased = !1),
      (F.sync.mseStartupWaitStartedAt = r),
      (F.sync.mseStartupWaitReadyAt = 0),
      (F.sync.mseStartupWaitReason = `single-tab-mse-startup:${ku(e || "config")}`),
      (d.holdTimeoutMs = d.seekCatchup
        ? 3e4
        : bl({ requiredLeadSeconds: d.requiredLeadSeconds })),
      (d.deadlineAtMs =
        r +
        Math.min(
          12e4,
          Math.max(d.holdTimeoutMs, 1e3 * d.requiredLeadSeconds + 3e4),
        )),
      (F.sync.mseStartupWaitTargetMediaTime = l),
      (F.sync.mseStartupWaitResumeRequested = d.resumeRequested),
      (F.sync.delayBuffering = !0),
      (F.sync.delayBufferStartedAt = r),
      Bc(o.leadSeconds),
      (F.sync.ready = !1),
      (F.sync.viewerMediaTime = l),
      (F.sync.viewerWallTimeMs = r),
      (F.sync.viewerPlaybackRate = i.paused ? 0 : vu(i.playbackRate) || 1),
      (F.sync.status = jo(r)),
      Ja(
        "mse.single_tab_startup.preloading",
        {
          reason: e,
          strategy: d.strategy,
          anchorMediaTime: l,
          videoWasPaused: s,
          viewerPausedInPlace: !1,
          viewerMuted: Boolean(i.muted),
          rawLeadSeconds: d.rawLeadSeconds,
          baselineSegmentCount: d.baselineSegmentCount,
          requiredLeadSeconds: d.requiredLeadSeconds,
          configuredDelaySeconds: o.configuredDelaySeconds,
          latencyP95Seconds: o.latencyP95Seconds,
          latencySource: o.latencySource,
          holdTimeoutMs: d.holdTimeoutMs,
          seekCatchup: d.seekCatchup,
          timelineResetPending: d.timelineResetPending,
        },
        "info",
      ),
      Boolean(
        d.rawLeadSeconds >= 0.5 &&
          (F.mseAudio.lastSegmentAt >= r - 2e3 ||
            Math.max(0, Number(F.mseAudio.audioSourceBufferCount) || 0) > 0),
      ) &&
        ((d.firstAudioCapturedAtMs = r),
        Ja(
          "mse.single_tab_startup.audio_ready",
          {
            elapsedMs: 0,
            existingBuffer: !0,
            anchorMediaTime: l,
            playbackMediaTime: vu(i.currentTime),
            preloadedMediaSeconds: 0,
            rawLeadSeconds: d.rawLeadSeconds,
            segmentCount: d.baselineSegmentCount,
          },
          "info",
        )),
      i.paused && d.resumeRequested && !F.sync.userPaused
        ? Ko(i, "initial-audible-preload", r)
        : (d.lastPlayAttemptAtMs = r),
      Qo(),
      ei(),
      !0
    );
  }
  function el() {
    return _l() && !F.sync.mseStartupWaitReleased;
  }
  function tl(e, t = {}) {
    if (!el()) return null;
    const n =
        vu(t.targetDelaySeconds) ??
        vu(F.sync.targetDelaySeconds) ??
        F.sync.fixedDelaySeconds,
      a =
        vu(t.buildProgressSeconds) ?? vu(F.sync.delayBuildProgressSeconds) ?? 0,
      i = vu(t.builtDelaySeconds) ?? vu(F.sync.actualDelaySeconds) ?? a,
      s = null !== vu(n) ? n + 60 : null,
      r = null !== s && null !== vu(i) && i > s;
    if (r) {
      const e = vu(F.sync.mseStartupBuiltDelayInsaneLogAt) || 0;
      Date.now() - e > 5e3 &&
        ((F.sync.mseStartupBuiltDelayInsaneLogAt = Date.now()),
        Ja(
          "sync.built_delay_insane",
          {
            rawBuiltDelaySeconds: i,
            targetDelaySeconds: vu(n),
            sanityCeilingSeconds: s,
            buildProgressSeconds: a,
            waitReason: String(F.sync.mseStartupWaitReason || t.reason || ""),
            waitTargetMediaTime: vu(F.sync.mseStartupWaitTargetMediaTime),
          },
          "warn",
        ));
    }
    const o = r ? a : i,
      l = t.targetInfo || null,
      d = vu(t.targetMediaTime);
    (F.sync.mseStartupWaitActive
      ? null === vu(F.sync.mseStartupWaitTargetMediaTime) &&
        null !== d &&
        (F.sync.mseStartupWaitTargetMediaTime = d)
      : ((F.sync.mseStartupWaitActive = !0),
        (F.sync.mseStartupWaitStartedAt = Sl()),
        (F.sync.mseStartupWaitReason = ku(t.reason || l?.reason || "startup")),
        (F.sync.mseStartupWaitTargetMediaTime = d),
        Ja("mse.startup_wait.start", {
          targetDelaySeconds: n,
          builtDelaySeconds: o,
          reason: F.sync.mseStartupWaitReason,
          targetMediaTime: vu(F.sync.mseStartupWaitTargetMediaTime),
          targetInfo: l,
        })),
      (F.sync.userPaused && e?.paused) ||
        (F.sync.mseStartupWaitResumeRequested = !0));
    const c = fl(n) + 1e4,
      u = hl();
    if (u > c) {
      const e = vu(F.sync.mseStartupWaitLastTimeoutLogAt) || 0;
      Date.now() - e > 5e3 &&
        ((F.sync.mseStartupWaitLastTimeoutLogAt = Date.now()),
        Ja(
          "mse.startup_wait.first_subtitle_wait_extended",
          {
            elapsedMs: u,
            noticeWaitMs: c,
            targetDelaySeconds: n,
            builtDelaySeconds: o,
            waitReason: String(F.sync.mseStartupWaitReason || ""),
            waitTargetMediaTime: vu(F.sync.mseStartupWaitTargetMediaTime),
          },
          "warn",
        ));
    }
    return (
      gd(e, n),
      (F.sync.ready = !1),
      (F.sync.actualDelaySeconds = o),
      (F.sync.targetDelaySeconds = n),
      (F.sync.viewerPlaybackRate = 0),
      { ready: !1, status: dl(a, n, o) }
    );
  }
  function nl(e, t = null, n = "viewer-seek") {
    if (!_l()) return !1;
    const a = vu(e);
    (sl(),
      rl(),
      (Ke = null),
      (F.sync.mseStartupWaitReleased = !1),
      (F.sync.mseStartupWaitActive = !0),
      (F.sync.mseStartupWaitStartedAt = Date.now()),
      (F.sync.mseStartupWaitReadyAt = 0),
      (F.sync.mseStartupWaitReason = ku(n || "viewer-seek")),
      (F.sync.mseStartupWaitTargetMediaTime = a));
    const i = Yd();
    ((F.sync.mseStartupWaitResumeRequested = Boolean(
      F.sync.mseStartupWaitResumeRequested ||
        !F.sync.userPaused ||
        (i && !i.paused),
    )),
      (F.mseAudio.lastLeadSeconds = null),
      (F.mseAudio.maxLeadSeconds = 0),
      (F.sync.status = "跳轉後等待第一批 MSE 字幕覆蓋新位置"));
    const s = il(i, "seek-rearmed");
    return (
      Ja("mse.startup_wait.seek_rearmed", {
        reason: F.sync.mseStartupWaitReason,
        targetMediaTime: a,
        targetDelaySeconds: vu(t),
        audioInputMode: String(F.config?.audioInputMode || ""),
        mseAudioBufferEnabled: Boolean(F.config?.mseAudioBufferEnabled),
        viewerHeld: s,
        viewerPaused: Boolean(i?.paused),
        viewerMediaTime: vu(i?.currentTime),
        resumeRequested: Boolean(F.sync.mseStartupWaitResumeRequested),
      }),
      !0
    );
  }
  function al() {
    return Boolean(
      !F.sync.singleTabMseStartupGate?.active &&
        F.sync.mseStartupWaitActive &&
        !F.sync.mseStartupWaitReleased &&
        _l() &&
        String(F.sync.mseStartupWaitReason || "").includes("seek"),
    );
  }
  function il(e = null, t = "seek-wait") {
    if (!al()) return !1;
    const n = vu(F.sync.mseStartupWaitTargetMediaTime),
      a = e || Yd();
    if (!a || null === n) return !1;
    const i = Boolean(a.paused),
      s = vu(a.currentTime),
      r = null === s ? null : Math.abs(s - n);
    bo(a, n);
    const o = Boolean(a.paused);
    return (
      (F.sync.ready = !1),
      (F.sync.viewerMediaTime = vu(a.currentTime) ?? n),
      (F.sync.viewerWallTimeMs = Date.now()),
      (F.sync.viewerPlaybackRate = 0),
      ((!i && o) || (null !== r && r > _)) &&
        Ja(
          "mse.startup_wait.viewer_held",
          {
            reason: t,
            targetMediaTime: n,
            beforeMediaTime: s,
            afterMediaTime: vu(a.currentTime),
            driftSeconds: r,
            wasPaused: i,
            viewerPaused: o,
          },
          o ? "info" : "warn",
        ),
      o
    );
  }
  function sl() {
    Fe && (window.clearTimeout(Fe), (Fe = null));
  }
  function rl() {
    ze && (window.clearTimeout(ze), (ze = null));
  }
  function ol(e = "config", t = {}) {
    if (
      !(function (e = "") {
        const t = String(e || "");
        return (
          "init" === t ||
          "config-update" === t ||
          "test-init" === t ||
          "test-delayed-video" === t
        );
      })(e)
    )
      return;
    const n = F.config || {};
    Ja(
      "mse.startup_wait.prime_skipped",
      {
        reason: e,
        role: F.role || "",
        syncEnabled: Boolean(F.sync.enabled),
        singleTabMediaSync: Boolean(F.sync.singleTabMediaSync),
        waitActive: Boolean(F.sync.mseStartupWaitActive),
        waitReleased: Boolean(F.sync.mseStartupWaitReleased),
        configEnabled: !0 === n.mseStartupBoostEnabled,
        configMode: String(n.mseStartupBoostMode || ""),
        mseAudioBufferEnabled: Boolean(n.mseAudioBufferEnabled),
        audioInputMode: String(n.audioInputMode || ""),
        ...t,
      },
      "info",
    );
  }
  function ll(e = "config", t = {}) {
    if (ql()) return (sl(), Zo(e));
    if (!el()) return (ol(e, { skipReason: "config-or-state" }), sl(), !1);
    if (F.sync.mseStartupWaitActive) return (sl(), !0);
    const n = Yd();
    if (!n)
      return (
        ol(e, { skipReason: "no-video", retry: Boolean(t.retry) }),
        t.retry &&
          (function (e = "config", t = Date.now()) {
            if (!el()) return (sl(), !1);
            if (F.sync.mseStartupWaitActive || F.sync.mseStartupWaitReleased)
              return (sl(), !1);
            const n = vu(t) || Date.now();
            Date.now() - n > 8e3
              ? (sl(),
                Ja(
                  "mse.startup_wait.prime_timeout",
                  { reason: e, maxWaitMs: 8e3 },
                  "warn",
                ))
              : Fe ||
                (Fe = window.setTimeout(() => {
                  ((Fe = null),
                    ll(`${e}:retry`, { retry: !0, startedAtMs: n }));
                }, 250));
          })(e, t.startedAtMs),
        !1
      );
    const a = vu(F.sync.targetDelaySeconds) ?? vu(F.sync.fixedDelaySeconds),
      i =
        vu(F.sync.actualDelaySeconds) ??
        vu(F.sync.delayBuildProgressSeconds) ??
        0,
      s = mn([
        F.sync.startupAlignmentTargetMediaTime,
        F.config?.initialPlaybackMediaTime,
        n.currentTime,
      ]),
      r = tl(n, {
        targetDelaySeconds: a,
        buildProgressSeconds: F.sync.delayBuildProgressSeconds,
        builtDelaySeconds: i,
        targetMediaTime: s,
        targetInfo: { reason: e },
      });
    return (
      !!r &&
      (sl(), (F.sync.ready = r.ready), (F.sync.status = r.status), ei(), !0)
    );
  }
  function dl(e = 0, t = null, n = null) {
    const a = vu(F.sync.mseStartupWaitStartedAt) || Date.now(),
      i = Math.max(0, (Date.now() - a) / 1e3),
      s = vu(t),
      r = vl(),
      o = r > 0 ? Math.min(i, r / 1e3) : Math.max(0, vu(e) ?? vu(n) ?? 0),
      l = null !== s ? `延遲 ${Pc(o)} / ${Pc(s)}` : `延遲 ${Pc(o)}`;
    return `等待第一批 MSE 字幕 ${Pc(i)} · ${l}`;
  }
  function cl(e, t = "session-timeline-ready") {
    if (!al()) return !1;
    const n = vu(e) ?? vu(F.sync.mseStartupWaitTargetMediaTime);
    if (null === n) return !1;
    const a = ko(n);
    if (!a?.queueSegments?.length) return !1;
    const i = Eo(a, n),
      s = vu(i?.start),
      r = vu(i?.end);
    if (null === s || null === r || r <= s) return !1;
    const o = {
        isFinal: !0,
        reason: t,
        sourceType: "mse-audio-buffer",
        audioInputMode: "mse-audio-buffer",
        sync: {
          sourceType: "mse-audio-buffer",
          audioInputMode: "mse-audio-buffer",
          mediaTime: s,
          mediaTimeEnd: r,
          audioStartMediaTime: s,
          audioEndMediaTime: r,
          mseStartupReadiness: {
            readySubtitleLeadSeconds: Math.max(0, r - n),
            readySubtitleRanges: [{ start: s, end: r }],
            readySubtitleLeadDecision: { range: { start: s, end: r } },
          },
        },
      },
      l = Al(o, a.queueSegments);
    return (
      !(!l.coverageReady || !l.leadReady) &&
      (Ja("mse.startup_wait.session_timeline_ready", {
        reason: t,
        targetMediaTime: n,
        coverageStartMediaTime: s,
        coverageEndMediaTime: r,
        readyLeadSeconds: l.readyLeadSeconds,
        requiredLeadSeconds: l.requiredLeadSeconds,
        coverageGapSeconds: l.coverageGapSeconds,
        segmentCount: a.queueSegments.length,
      }),
      Il(t, o, a.queueSegments, {
        forced: !1,
        readyLeadSeconds: l.readyLeadSeconds,
        requiredLeadSeconds: l.requiredLeadSeconds,
        maxCoverageGapSeconds: l.maxCoverageGapSeconds,
        rawLeadSeconds: l.rawLeadSeconds,
        rawLeadReleaseReady: l.rawLeadReleaseReady,
        vodRawAudioLeadReady: l.vodRawAudioLeadReady,
        coverageGapSeconds: l.coverageGapSeconds,
        staleGapSeconds: l.staleGapSeconds,
        releaseProbeMediaTime: l.releaseProbeMediaTime,
        coverageStartMediaTime: l.coverageStartMediaTime,
        coverageEndMediaTime: l.coverageEndMediaTime,
        audioCoveredLeadingGap: Boolean(l.audioCoveredLeadingGap),
        audioCoverageStartMediaTime: vu(l.audioCoverageStartMediaTime),
        leadingGapAwaitingPipeline: Boolean(l.leadingGapAwaitingPipeline),
        leadingGapPendingPipelineRange: l.leadingGapPendingPipelineRange,
      }))
    );
  }
  function ul(e = {}, t = [], n = {}) {
    const a = Date.now(),
      i = vu(Ke?.startedAtMs) || a,
      s = Ke;
    Ke = {
      event: e,
      segments: Array.isArray(t) ? t.slice() : [],
      startedAtMs: i,
      coverageTimeoutLoggedAtMs: vu(s?.coverageTimeoutLoggedAtMs) || 0,
      minimumDelayLoggedAtMs: vu(s?.minimumDelayLoggedAtMs) || 0,
      safety: n,
      releaseReason: ku(
        s?.releaseReason || e.reason || "llm-final-translation",
      ),
      releaseOptions: s?.releaseOptions || {},
      minimumDelayOnly: !1,
    };
    const r = Math.max(0, a - i);
    ((F.sync.status =
      !1 === n.coverageReady
        ? `第一批 MSE 字幕在 ${Pc(n.coverageGapSeconds)} 後，等待貼近播放點`
        : `正在處理前方時間軸 ${Pc(n.readyLeadSeconds)} / ${Pc(n.requiredLeadSeconds)}`),
      Ja(
        "mse.startup_wait.ready_lead_hold",
        {
          readyLeadSeconds: n.readyLeadSeconds,
          requiredLeadSeconds: n.requiredLeadSeconds,
          coverageReady: n.coverageReady,
          coverageGapSeconds: n.coverageGapSeconds,
          staleGapSeconds: n.staleGapSeconds,
          maxCoverageGapSeconds: n.maxCoverageGapSeconds,
          rawLeadSeconds: n.rawLeadSeconds,
          rawLeadReleaseReady: Boolean(n.rawLeadReleaseReady),
          vodRawAudioLeadReady: Boolean(n.vodRawAudioLeadReady),
          releaseProbeMediaTime: n.releaseProbeMediaTime,
          coverageStartMediaTime: n.coverageStartMediaTime,
          coverageEndMediaTime: n.coverageEndMediaTime,
          leadingGapAwaitingPipeline: Boolean(n.leadingGapAwaitingPipeline),
          leadingGapPendingPipelineRange: n.leadingGapPendingPipelineRange,
          heldMs: r,
          maxHoldMs: !1 === n.coverageReady ? gl() : null,
          segmentCount: Array.isArray(t) ? t.length : 0,
        },
        "info",
      ),
      ml());
  }
  function ml() {
    (rl(),
      (ze = window.setTimeout(() => {
        ((ze = null), pl("ready-lead-hold-cap"));
      }, 250)));
  }
  function yl(e, t, n, a, i, s = {}) {
    const r = F.sync.singleTabMseStartupGate;
    if (r?.active && r.deadlineAtMs > 0 && Date.now() >= r.deadlineAtMs)
      return (Xo(i), !1);
    const o = "coverage-gap" === i,
      l = o
        ? "mse.startup_wait.coverage_gap_timeout_hold"
        : "mse.startup_wait.ready_lead_timeout_hold",
      d = Date.now();
    return (
      d - (vu(e.coverageTimeoutLoggedAtMs) || 0) >= 5e3 &&
        ((e.coverageTimeoutLoggedAtMs = d),
        Ja(
          l,
          {
            reason: n,
            heldMs: a,
            maxHoldMs: o ? gl() : bl(t),
            startupWaitElapsedMs: vu(s.startupWaitElapsedMs),
            startupTotalWaitCapMs: vu(s.startupTotalWaitCapMs),
            readyLeadSeconds: vu(t.readyLeadSeconds),
            requiredLeadSeconds: vu(t.requiredLeadSeconds),
            maxCoverageGapSeconds: vu(t.maxCoverageGapSeconds),
            rawLeadSeconds: vu(t.rawLeadSeconds),
            rawLeadReleaseReady: Boolean(t.rawLeadReleaseReady),
            vodRawAudioLeadReady: Boolean(t.vodRawAudioLeadReady),
            coverageGapSeconds: vu(t.coverageGapSeconds),
            releaseProbeMediaTime: vu(t.releaseProbeMediaTime),
            coverageStartMediaTime: vu(t.coverageStartMediaTime),
            coverageEndMediaTime: vu(t.coverageEndMediaTime),
            leadingGapAwaitingPipeline: Boolean(t.leadingGapAwaitingPipeline),
            leadingGapPendingPipelineRange: t.leadingGapPendingPipelineRange,
            segmentCount: Array.isArray(e.segments) ? e.segments.length : 0,
          },
          "warn",
        )),
      (F.sync.status = o
        ? "字幕覆蓋仍有缺口，等待補齊後再播放"
        : "字幕前方緩衝未達目標，等待連續字幕後再播放"),
      ml(),
      ei(),
      !1
    );
  }
  function pl(e = "ready-lead-hold-cap") {
    if (!Ke || F.sync.mseStartupWaitReleased) return !1;
    const t = Ke,
      n = Ml();
    if (n > 0) {
      const e = vl(),
        t = Math.max(0, e - n);
      return (
        (F.sync.status = `字幕已準備，正在建立固定延遲 ${Pc(t / 1e3)} / ${Pc(e / 1e3)}`),
        ml(),
        !1
      );
    }
    if (
      String(F.sync.mseStartupWaitReason || "").includes("seek") &&
      cl(vu(F.sync.mseStartupWaitTargetMediaTime), `${e}:session-timeline`)
    )
      return !0;
    const a = Math.max(0, Date.now() - (vu(t.startedAtMs) || Date.now())),
      i = Al(t.event, t.segments);
    if (((t.safety = i), !1 === i.coverageReady)) {
      const n = gl(),
        s = hl();
      return a < n
        ? ((F.sync.status = `第一批 MSE 字幕在 ${Pc(i.coverageGapSeconds)} 後，等待貼近播放點`),
          ml(),
          !1)
        : yl(t, i, e, Math.max(a, s), "coverage-gap");
    }
    if (Cl() && !i.leadReady) {
      const n = hl(),
        s = String(F.sync.mseStartupWaitReason || "").includes("seek")
          ? Math.max(
              fl() + 2e3 - 250,
              vu(F.sync.singleTabMseStartupGate?.holdTimeoutMs) || 0,
            )
          : null,
        r = bl(i);
      return a >= r || (null !== s && n >= s)
        ? yl(t, i, e, a, "ready-lead", {
            startupWaitElapsedMs: n,
            startupTotalWaitCapMs: s,
            readyLeadHoldMaxMs: r,
          })
        : ((F.sync.status = String(F.sync.mseStartupWaitReason || "").includes(
            "seek",
          )
            ? `跳轉位置正在準備 ${Pc(i.readyLeadSeconds)} / ${Pc(i.requiredLeadSeconds)}`
            : `正在努力產生字幕，已處理 ${Pc(i.readyLeadSeconds)} / ${Pc(i.requiredLeadSeconds)}`),
          ml(),
          !1);
    }
    return (
      Ja(
        !0 === t.minimumDelayOnly
          ? "mse.startup_wait.minimum_delay_released"
          : "mse.startup_wait.ready_lead_hold_released",
        {
          reason: e,
          heldMs: a,
          readyLeadSeconds: vu(i.readyLeadSeconds),
          requiredLeadSeconds: vu(i.requiredLeadSeconds),
          maxCoverageGapSeconds: vu(i.maxCoverageGapSeconds),
          rawLeadSeconds: vu(i.rawLeadSeconds),
          rawLeadReleaseReady: Boolean(i.rawLeadReleaseReady),
          vodRawAudioLeadReady: Boolean(i.vodRawAudioLeadReady),
          coverageGapSeconds: vu(i.coverageGapSeconds),
          releaseProbeMediaTime: vu(i.releaseProbeMediaTime),
          coverageStartMediaTime: vu(i.coverageStartMediaTime),
          coverageEndMediaTime: vu(i.coverageEndMediaTime),
          leadingGapAwaitingPipeline: Boolean(i.leadingGapAwaitingPipeline),
          leadingGapPendingPipelineRange: i.leadingGapPendingPipelineRange,
          readyLeadHoldCap: !1,
          coverageReady: !0,
        },
        i.leadReady ? "info" : "warn",
      ),
      Il(t.releaseReason || "llm-final-translation", t.event, t.segments, {
        ...(t.releaseOptions || {}),
        forced: !1,
        readyLeadHoldCap: !1,
        readyLeadSeconds: vu(i.readyLeadSeconds),
        requiredLeadSeconds: vu(i.requiredLeadSeconds),
        maxCoverageGapSeconds: vu(i.maxCoverageGapSeconds),
        rawLeadSeconds: vu(i.rawLeadSeconds),
        rawLeadReleaseReady: Boolean(i.rawLeadReleaseReady),
        vodRawAudioLeadReady: Boolean(i.vodRawAudioLeadReady),
        coverageGapSeconds: vu(i.coverageGapSeconds),
        staleGapSeconds: vu(i.staleGapSeconds),
        releaseProbeMediaTime: vu(i.releaseProbeMediaTime),
        coverageStartMediaTime: vu(i.coverageStartMediaTime),
        coverageEndMediaTime: vu(i.coverageEndMediaTime),
        audioCoveredLeadingGap: Boolean(i.audioCoveredLeadingGap),
        audioCoverageStartMediaTime: vu(i.audioCoverageStartMediaTime),
        leadingGapAwaitingPipeline: Boolean(i.leadingGapAwaitingPipeline),
        leadingGapPendingPipelineRange: i.leadingGapPendingPipelineRange,
      })
    );
  }
  function gl() {
    const e = Array.isArray(F.sync.coverageHoldSamples)
      ? F.sync.coverageHoldSamples
      : [];
    let t = 13e3;
    if (e.length >= 5) {
      const n = [...e].sort((e, t) => e - t);
      t =
        n[Math.min(n.length - 1, Math.max(0, Math.ceil(0.95 * n.length) - 1))] +
        2500;
    }
    return Cu(t, 8e3, 18e3);
  }
  function fl(e = null) {
    const t =
      vu(e) ??
      vu(F.sync.delayBuildTargetSeconds) ??
      vu(F.sync.targetDelaySeconds) ??
      vu(F.sync.fixedDelaySeconds) ??
      15;
    return 1e3 * Math.max(0, t);
  }
  function Sl() {
    return Date.now();
  }
  function hl() {
    const e = vu(F.sync.mseStartupWaitStartedAt) || Date.now();
    return Math.max(0, Date.now() - e);
  }
  function bl(e = {}) {
    const t = String(F.sync.mseStartupWaitReason || "");
    if (t.includes("seek") && ql()) return 3e4;
    if (t.includes("seek")) return 5e3;
    const n = Math.max(6, vu(e.requiredLeadSeconds) ?? 12);
    return Cu(Math.round(1e3 * n + 1e4), 13e3, 45e3);
  }
  function vl() {
    if (String(F.sync.mseStartupWaitReason || "").includes("seek")) return 0;
    if (ql()) return 0;
    const e = F.config || {};
    if (
      _l() &&
      null !==
        (function () {
          const e = Date.parse(String(F.config?.startedAt || ""));
          if (!Number.isFinite(e)) return null;
          const t = Date.now() - e;
          return t < 0 || t > 6e4 ? null : e;
        })()
    )
      return fl();
    const t = String(e.provider || "")
        .toLowerCase()
        .trim(),
      n = String(e.sttProvider || "")
        .toLowerCase()
        .trim(),
      a = ("lt-l" === t || "lt-c" === t) && "st-b" === n,
      i = String(e.syncDelaySafetyPolicy || (a ? "economy" : ""))
        .toLowerCase()
        .trim(),
      s =
        !0 === e.syncDelaySafetyMseActive ||
        (a && !0 === e.mseAudioBufferEnabled && !0 !== e.singleTabMediaSync);
    if (!i || !s) return 0;
    const r = 1e3 * Math.max(0, vu(e.syncDelaySafetyMinimumSeconds) || 0),
      o = Math.max(
        0,
        ...[
          F.sync.delayBuildTargetSeconds,
          F.sync.targetDelaySeconds,
          F.sync.fixedDelaySeconds,
          e.syncDelaySeconds,
        ]
          .map((e) => vu(e))
          .filter((e) => null !== e)
          .map((e) => 1e3 * e),
      );
    return Math.max(o, r);
  }
  function Ml() {
    if (!F.sync.mseStartupWaitActive || F.sync.mseStartupWaitReleased) return 0;
    const e = vl();
    return e <= 0 ? 0 : Math.max(0, e - hl());
  }
  function wl(e, t, n, a = 0) {
    if (!Array.isArray(e) || !e.length) return !1;
    if (!(n > t)) return !0;
    const i = e
      .map((e) => ({ start: vu(e?.start), end: vu(e?.end) }))
      .filter((e) => null !== e.start && null !== e.end && e.end >= e.start)
      .sort((e, t) => e.start - t.start);
    let s = t;
    for (const e of i) {
      if (e.start > s + a) break;
      if ((e.end > s && (s = e.end), s >= n)) return !0;
    }
    return s >= n;
  }
  function Tl(e = {}) {
    if (!$l(e) || !1 === e.isFinal) return [];
    const t = e.sync || e.latency || {},
      n = (Array.isArray(t.chunkMediaRanges) ? t.chunkMediaRanges : [])
        .map((e) =>
          cn({
            start: e?.start ?? e?.mediaStartTime,
            end: e?.end ?? e?.mediaEndTime,
          }),
        )
        .filter(Boolean),
      a = mn([
        t.audioStartMediaTime,
        t.sourceMediaStartTime,
        e.audioStartMediaTime,
        e.sourceMediaStartTime,
      ]),
      i = mn([
        t.audioEndMediaTime,
        t.sourceMediaEndTime,
        e.audioEndMediaTime,
        e.sourceMediaEndTime,
      ]);
    return [
      ...n,
      null !== a && null !== i && i > a ? { start: a, end: i } : null,
    ].filter(Boolean);
  }
  function kl() {
    const e = Wa();
    return (
      Array.isArray(F.sync?.completedSubtitleRanges)
        ? F.sync.completedSubtitleRanges
        : []
    )
      .filter(
        (t) =>
          !(
            !0 !== t?.noText ||
            !0 === t?.failed ||
            (t.mediaContextKey && e && t.mediaContextKey !== e)
          ),
      )
      .map((e) => cn(e))
      .filter(Boolean);
  }
  function xl(e = {}, t = null, n = null) {
    const a = vu(t),
      i = vu(n);
    if (null === a || null === i || i <= a) return !1;
    const s = e.sync?.mseStartupReadiness || e.mseStartupReadiness || {};
    return (Array.isArray(s.knownHoles) ? s.knownHoles : []).some((e) => {
      const t = vu(e?.start),
        n = vu(e?.end);
      return null !== t && null !== n && Math.min(n, i) - Math.max(t, a) > 0.01;
    });
  }
  function Al(e = {}, t = []) {
    const n = Dl(),
      a =
        (function (e = {}, t = null, n = []) {
          const a = e.sync?.mseStartupReadiness || e.mseStartupReadiness || {},
            i = Rl(e),
            s = [
              i ? a.startupReleaseReadyDecision?.range : null,
              ...(i && Array.isArray(a.startupReleaseReadyRanges)
                ? a.startupReleaseReadyRanges
                : []),
              a.readySubtitleLeadDecision?.range,
              ...(Array.isArray(a.readySubtitleRanges)
                ? a.readySubtitleRanges
                : []),
              dn(e, n),
            ]
              .map((e) => cn(e))
              .filter(Boolean)
              .sort((e, t) => e.start - t.start);
          if (!s.length) return null;
          const r = vu(t);
          if (null !== r) {
            const e = Pl(),
              t = s
                .filter((t) => t.start <= r + e && t.end >= r - N)
                .sort((e, t) => un(e, r) - un(t, r) || t.end - e.end)[0];
            if (t) return t;
            const n = s
              .slice()
              .sort(
                (e, t) =>
                  un(e, r) - un(t, r) || e.start - t.start || t.end - e.end,
              )[0];
            if (n) return n;
          }
          return s.reduce((e, t) => (t.end > e.end ? t : e), s[0]);
        })(e, n, t) || dn(e, t),
      i = vu(a?.start),
      s = vu(a?.end),
      r = null !== n && null !== s ? Math.max(0, s - n) : null,
      o = Ll(e),
      l = (function (e = {}, t = [], n = null) {
        const a = Ll(e);
        if (null !== a && a > 0) return Math.max(0, a);
        const i = dn(e, t),
          s = vu(i?.end),
          r = vu(n) ?? Dl();
        return null !== s && null !== r
          ? Math.max(0, s - r)
          : F.sync.singleTabMseStartupGate?.active
            ? 0
            : 12;
      })(e, t, n),
      d = Math.max(0, ...[r, o, l].filter((e) => null !== vu(e))),
      c = Bl(e),
      u = Pl(),
      m = (function (e = {}) {
        return mn([
          e.mseStartupReadiness?.rawLeadSeconds,
          e.sync?.mseStartupReadiness?.rawLeadSeconds,
          e.sync?.rawLeadSeconds,
          F.mseAudio.lastLeadSeconds,
          F.mseAudio.maxLeadSeconds,
        ]);
      })(e),
      y = (function (e = null) {
        if (!String(F.sync.mseStartupWaitReason || "").includes("seek"))
          return !1;
        const t = vu(e);
        return null !== t && t >= 30;
      })(m),
      p = Boolean(!ql() && El(e) && null !== m && m + N >= c),
      g = String(F.sync.mseStartupWaitReason || "").includes("seek"),
      f = !g && ql(),
      S = g || f,
      h =
        null !== n && null !== i && i > n
          ? f
            ? (function (e = null) {
                if (!e) return null;
                Nn();
                const t = vu(e.previousEnd),
                  n = vu(e.nextStart);
                return null === t || null === n || n <= t
                  ? null
                  : (F.sync.pendingSubtitleRanges || []).find((e) => {
                      const a = vu(e.start),
                        i = vu(e.end);
                      return (
                        !(null === a || null === i || i <= a) &&
                        Math.min(i, n) - Math.max(a, t) > 0.01
                      );
                    }) || null;
              })({ previousEnd: n, nextStart: i })
            : Gn({ previousEnd: n, nextStart: i })
          : null,
      b =
        S && !h
          ? vu(
              (function (e = {}, t = null, n = null, a = {}) {
                const i = vu(t),
                  s = vu(n);
                if (null === i || null === s) return n;
                const r = s - i,
                  o = Math.max(0, vu(a.maxLeadingGapSeconds) ?? 3);
                if (r <= 0 || r > o) return n;
                const l =
                    e.sync?.mseStartupReadiness || e.mseStartupReadiness || {},
                  d = Tl(e),
                  c = !0 === a.requireConfirmedNoText,
                  u = c
                    ? [...kl(), ...d]
                    : [
                        ...(Array.isArray(l.audioCoverageRanges)
                          ? l.audioCoverageRanges
                          : []),
                        ...d,
                      ].filter(Boolean);
                return u.length
                  ? xl(e, i, s) ||
                    (c &&
                      (function (e = null, t = null) {
                        const n = vu(e),
                          a = vu(t);
                        if (null === n || null === a || a <= n) return !1;
                        const i = Wa();
                        return (
                          Array.isArray(F.sync?.completedSubtitleRanges)
                            ? F.sync.completedSubtitleRanges
                            : []
                        ).some((e) => {
                          if (
                            !0 !== e?.failed ||
                            (e.mediaContextKey && i && e.mediaContextKey !== i)
                          )
                            return !1;
                          const t = vu(e.start),
                            s = vu(e.end);
                          return (
                            null !== t &&
                            null !== s &&
                            Math.min(s, a) - Math.max(t, n) > 0.01
                          );
                        });
                      })(i, s))
                    ? n
                    : wl(u, i, s, 0.35)
                      ? i
                      : n
                  : n;
              })(e, n, i, {
                maxLeadingGapSeconds: f ? 120 : 3,
                requireConfirmedNoText: f,
              }),
            )
          : i,
      v = S && null !== i && null !== b && b < i,
      M = b ?? i,
      w = S && xl(e, n, i),
      T = h,
      k = Boolean(T),
      x = w || k ? U : u,
      A = null !== n && null !== M ? Math.max(0, M - n) : 0,
      C = null !== n && null !== s ? Math.max(0, n - s) : 0,
      R = S ? N : u,
      D = null === n || (!S && null === i) || (null !== i && A <= x && C <= R),
      L = e.sync?.mseStartupReadiness || e.mseStartupReadiness || {},
      B = F.sync.singleTabMseStartupGate,
      E = !B?.active || !0 !== B.timelineResetPending,
      P = Boolean(E && (B?.active || !Rl(e) || !0 === L.startupReleaseReady)),
      I = {
        ready: D,
        coverageReady: D,
        leadReady: Boolean(P && (d + N >= c || p)),
        startupProducerReady: P,
        timelineResetReady: E,
        readyLeadSeconds: d,
        requiredLeadSeconds: c,
        maxCoverageGapSeconds: x,
        staleGapToleranceSeconds: R,
        rawLeadSeconds: m,
        rawLeadReleaseReady: y,
        vodRawAudioLeadReady: p,
        coverageGapSeconds: A,
        staleGapSeconds: C,
        releaseProbeMediaTime: n,
        coverageStartMediaTime: i,
        coverageEndMediaTime: s,
        audioCoveredLeadingGap: v,
        audioCoverageStartMediaTime: v ? b : null,
        leadingGapHasKnownHole: w,
        leadingGapAwaitingPipeline: k,
        leadingGapPendingPipelineRange: T
          ? {
              key: ku(T.key || ""),
              stage: ku(T.stage || ""),
              start: vu(T.start),
              end: vu(T.end),
            }
          : null,
      };
    return (
      (function (e = {}, t = {}) {
        const n = F.sync.singleTabMseStartupGate;
        if (!n?.active) return !1;
        const a = Date.now();
        if (
          ((n.readyLeadSeconds = Math.max(0, vu(e.readyLeadSeconds) || 0)),
          (n.requiredLeadSeconds = Math.max(
            n.requiredLeadSeconds || 0,
            vu(e.requiredLeadSeconds) || 0,
          )),
          (n.lastReadinessAtMs = a),
          !1 === e.coverageReady &&
            !e.leadingGapAwaitingPipeline &&
            Number(e.coverageGapSeconds) > 0.1 &&
            (n.anchorRepostAttempts || 0) < 2 &&
            a - (n.anchorRepostAtMs || 0) >= 2e3)
        ) {
          const t = vu(n.anchorMediaTime),
            i = vu(e.coverageStartMediaTime);
          null !== t &&
            null !== i &&
            i > t &&
            ((n.anchorRepostAttempts = (n.anchorRepostAttempts || 0) + 1),
            (n.anchorRepostAtMs = a),
            Mt({
              sessionId: F.sessionId,
              mediaStartTime: t,
              mediaEndTime: Math.min(i, t + 30),
              maxAttempt: 2,
              reason: "single-tab-startup-anchor-gap",
            }),
            Ja(
              "mse.single_tab_startup.anchor_repost",
              {
                anchorMediaTime: t,
                endMediaTime: Math.min(i, t + 30),
                attempt: n.anchorRepostAttempts,
              },
              "warn",
            ));
        }
        ((F.mseAudio.lastReadySubtitleLeadSeconds = n.readyLeadSeconds),
          (F.mseAudio.lastRequiredSubtitleLeadSeconds = n.requiredLeadSeconds));
        const i = vu(e.rawLeadSeconds);
        (null !== i &&
          i > n.rawLeadSeconds &&
          ((n.rawLeadSeconds = i), (n.lastRawLeadGrowthAtMs = a)),
          (F.sync.status = jo(a)),
          Boolean(t));
      })(I, e),
      I
    );
  }
  function Cl() {
    return Boolean(
      _l() ||
        String(F.sync.mseStartupWaitReason || "").includes("seek") ||
        Lc(),
    );
  }
  function Rl(e = {}) {
    const t = String(
        (e?.mseStartupReadiness || e?.sync?.mseStartupReadiness || {}).mode ||
          e?.mseStartupBoostMode ||
          "",
      )
        .toLowerCase()
        .trim(),
      n = String(F.sync.mseStartupWaitReason || "").includes("seek");
    return (
      !(!0 !== F.config?.mseStartupBoostEnabled && !n) &&
      Boolean(t === W || String(F.config?.mseStartupBoostMode || "") === W)
    );
  }
  function Dl() {
    const e = Yd();
    return mn([
      F.sync.mseStartupWaitTargetMediaTime,
      e?.currentTime,
      F.sync.viewerMediaTime,
      Wl(F.sync.sourceTiming, Date.now()),
      F.sync.sourceTiming?.currentTime,
    ]);
  }
  function Ll(e = {}) {
    const t = e.mseStartupReadiness || e.sync?.mseStartupReadiness || {};
    return mn([
      Rl(e) ? t.startupReleaseReadyLeadSeconds : null,
      e.mseStartupReadiness?.readySubtitleLeadSeconds,
      e.sync?.mseStartupReadiness?.readySubtitleLeadSeconds,
      e.sync?.readySubtitleLeadSeconds,
      e.readySubtitleLeadSeconds,
    ]);
  }
  function Bl(e = {}) {
    if (Lc()) return Bo().leadSeconds;
    if (ql()) {
      const e = vu(F.sync.singleTabMseStartupGate?.requiredLeadSeconds);
      return null !== e && e > 0 ? e : Ho().leadSeconds;
    }
    const t = e.mseStartupReadiness || e.sync?.mseStartupReadiness || {},
      n =
        String(F.sync.mseStartupWaitReason || "").includes("seek") ||
        !0 === t.seekRealtimeBridge,
      a = El(e);
    if (n && !0 !== F.config?.mseStartupBoostEnabled)
      return Cu(fl() / 1e3, 6, 30);
    if (!n && (a || !0 !== F.config?.mseStartupBoostEnabled) && vl() > 0)
      return Cu(fl() / 1e3, 6, 30);
    if (Rl(e)) {
      const a = mn([
          t.startupReleaseLeadSeconds,
          e.sync?.startupReleaseLeadSeconds,
          e.startupReleaseLeadSeconds,
        ]),
        i = mn([
          t.releaseRequiredLeadSeconds,
          t.requiredLeadSeconds,
          e.sync?.mseStartupReadiness?.releaseRequiredLeadSeconds,
          e.sync?.requiredLeadSeconds,
          e.requiredLeadSeconds,
        ]);
      return Cu(n ? (a ?? 7) : Math.max(a ?? 7, i ?? 0), 6, n ? 11 : 30);
    }
    const i = mn([
      e.mseStartupReadiness?.releaseRequiredLeadSeconds,
      e.mseStartupReadiness?.requiredLeadSeconds,
      e.sync?.mseStartupReadiness?.releaseRequiredLeadSeconds,
      e.sync?.mseStartupReadiness?.requiredLeadSeconds,
      e.sync?.requiredLeadSeconds,
      e.requiredLeadSeconds,
    ]);
    return Cu(
      mn([
        i,
        F.sync.latencyPercentiles?.p90Seconds,
        F.sync.latencyPercentiles?.p95Seconds,
      ]) ?? 12,
      6,
      30,
    );
  }
  function El(e = {}) {
    if (
      String(F.sync.mseStartupWaitReason || "").includes("seek") ||
      !0 === e.mseStartupReadiness?.seekRealtimeBridge ||
      !0 === e.sync?.mseStartupReadiness?.seekRealtimeBridge ||
      !0 !== F.config?.msePcmPrimaryOnly
    )
      return !1;
    const t = String(F.config?.sourceLiveClassification || "")
      .trim()
      .toLowerCase();
    return (
      "live" !== t &&
      ("vod" === t ||
        !1 ===
          [
            e.sync?.isLiveStream,
            e.isLiveStream,
            F.sync.sourceTiming?.isLiveStream,
          ].find((e) => "boolean" == typeof e))
    );
  }
  function Pl() {
    return String(F.sync.mseStartupWaitReason || "").includes("seek") ? 1 : 3.5;
  }
  function Il(e = "llm-final-translation", t = {}, n = [], a = {}) {
    if (!a.forced && Ml() > 0)
      return (function (e = "llm-final-translation", t = {}, n = [], a = {}) {
        const i = Date.now(),
          s = Ke,
          r = vu(s?.startedAtMs) || i,
          o = vl(),
          l = hl(),
          d = Math.max(0, o - l);
        return (
          (Ke = {
            event: t,
            segments: Array.isArray(n) ? n.slice() : [],
            startedAtMs: r,
            coverageTimeoutLoggedAtMs: vu(s?.coverageTimeoutLoggedAtMs) || 0,
            minimumDelayLoggedAtMs: vu(s?.minimumDelayLoggedAtMs) || i,
            safety: s?.safety || null,
            releaseReason: ku(e || s?.releaseReason || "llm-final-translation"),
            releaseOptions: { ...(s?.releaseOptions || {}), ...(a || {}) },
            minimumDelayOnly: !s || !0 === s.minimumDelayOnly,
          }),
          (F.sync.status = `字幕已準備，正在建立固定延遲 ${Pc(l / 1e3)} / ${Pc(o / 1e3)}`),
          s?.minimumDelayLoggedAtMs ||
            Ja(
              "mse.startup_wait.minimum_delay_hold",
              {
                reason: Ke.releaseReason,
                elapsedMs: l,
                remainingMs: d,
                targetMs: o,
                targetDelaySeconds: o / 1e3,
                policy: ku(F.config?.syncDelaySafetyPolicy || ""),
                segmentCount: Array.isArray(n) ? n.length : 0,
              },
              "info",
            ),
          ml(),
          ei(),
          !1
        );
      })(e, t, n, a);
    const i = a.forced
        ? null
        : ia(t, n, {
            ...a,
            allowReadinessLedger: !0,
            allowActualSubtitleBuffer: !0,
          }),
      s = Ke,
      r = vl(),
      o = r > 0 ? hl() : 0;
    ((F.sync.mseStartupWaitReleased = !0), (F.sync.mseStartupWaitActive = !1));
    const l = Ul();
    return (
      an(l.viewerMediaTime, "mse-startup-release"),
      rl(),
      !a.forced &&
        r <= 0 &&
        s &&
        !0 !== s.minimumDelayOnly &&
        (function (e) {
          const t = vu(e);
          null === t ||
            t <= 0 ||
            (F.sync.coverageHoldSamples.push(t),
            F.sync.coverageHoldSamples.length > 40 &&
              (F.sync.coverageHoldSamples =
                F.sync.coverageHoldSamples.slice(-40)));
        })(Date.now() - (vu(s.startedAtMs) || Date.now())),
      (Ke = null),
      (F.sync.mseStartupWaitReadyAt =
        F.sync.mseStartupWaitReadyAt || Date.now()),
      Ja("mse.startup_wait.released", {
        reason: ku(t.reason || e || "llm-final-translation"),
        forced: Boolean(a.forced),
        segmentCount: Array.isArray(n) ? n.length : 0,
        sourceType: t.sync?.sourceType || t.sourceType || "",
        audioInputMode: t.sync?.audioInputMode || t.audioInputMode || "",
        mediaTime: vu(t.sync?.mediaTime ?? t.mediaTime),
        mediaTimeEnd: vu(t.sync?.mediaTimeEnd ?? t.mediaTimeEnd),
        releaseMediaTime: vu(l.viewerMediaTime),
        releasedDelaySeconds: l.delaySeconds,
        targetDelaySeconds: l.targetDelaySeconds,
        readyLeadSeconds: vu(
          a.readyLeadSeconds ??
            t.mseStartupReadiness?.readySubtitleLeadSeconds ??
            t.sync?.mseStartupReadiness?.readySubtitleLeadSeconds,
        ),
        requiredLeadSeconds: vu(
          a.requiredLeadSeconds ??
            t.mseStartupReadiness?.releaseRequiredLeadSeconds ??
            t.sync?.mseStartupReadiness?.releaseRequiredLeadSeconds,
        ),
        maxCoverageGapSeconds: vu(a.maxCoverageGapSeconds),
        rawLeadSeconds: vu(a.rawLeadSeconds),
        rawLeadReleaseReady: Boolean(a.rawLeadReleaseReady),
        vodRawAudioLeadReady: Boolean(a.vodRawAudioLeadReady),
        coverageGapSeconds: vu(a.coverageGapSeconds),
        staleGapSeconds: vu(a.staleGapSeconds),
        releaseProbeMediaTime: vu(a.releaseProbeMediaTime),
        coverageStartMediaTime: vu(a.coverageStartMediaTime),
        coverageEndMediaTime: vu(a.coverageEndMediaTime),
        audioCoveredLeadingGap: Boolean(a.audioCoveredLeadingGap),
        audioCoverageStartMediaTime: vu(a.audioCoverageStartMediaTime),
        leadingGapAwaitingPipeline: Boolean(a.leadingGapAwaitingPipeline),
        leadingGapPendingPipelineRange:
          a.leadingGapPendingPipelineRange || null,
        waitReason: String(F.sync.mseStartupWaitReason || ""),
        waitTargetMediaTime: vu(F.sync.mseStartupWaitTargetMediaTime),
        withoutStart: Boolean(a.withoutStart),
        readyLeadHoldCap: Boolean(a.readyLeadHoldCap),
        startupWaitOpenedPlayback: Boolean(a.startupWaitOpenedPlayback),
        firstSubtitleWaitElapsedMs: vu(a.firstSubtitleWaitElapsedMs),
        firstSubtitleOpenPlaybackAfterMs: vu(
          a.firstSubtitleOpenPlaybackAfterMs,
        ),
        coverageGapStalledOpenPlayback: Boolean(
          a.coverageGapStalledOpenPlayback,
        ),
        minimumWallWaitMs: r,
        minimumWallWaitElapsedMs: o,
        minimumWallWaitSatisfied: r <= 0 || o >= r,
        resumed: l.resumed,
        resumeRequested: l.resumeRequested,
      }),
      a.forced ||
        sa({
          trigger: ku(t.reason || e || "mse-startup-release"),
          event: t,
          segments: n,
          decision: i,
          forced: !1,
        }),
      (F.sync.status = l.resumed
        ? "第一批 MSE 字幕完成，開始播放"
        : "第一批 MSE 字幕完成，準備播放"),
      !F.activeSegment &&
        F.segmentQueue.length &&
        ((F.sync.mseReleaseActivateTargetMediaTime = vu(l.viewerMediaTime)),
        kn()),
      window.setTimeout(() => {
        F.sync.enabled && !F.sync.singleTabMediaSync && Vr();
      }, 0),
      !0
    );
  }
  function Ul() {
    const e = Yd(),
      t = (function (e = Yd(), t = "subtitle-ready") {
        const n = F.sync.singleTabMseStartupGate;
        if (!n?.active) return null;
        const a = Date.now(),
          i = vu(n.anchorMediaTime);
        zo(e, a);
        const s = vu(e?.currentTime) ?? i,
          r = Boolean(
            !1 !== n.seekBackOnRelease &&
              e &&
              null !== i &&
              null !== s &&
              Math.abs(s - i) > _,
          );
        r && bo(e, i, { forceInternal: !0 });
        const o = vu(e?.currentTime) ?? i;
        ($o(),
          (F.sync.singleTabMseInternalPauseUntilMs = 0),
          (n.active = !1),
          (n.phase = "released"),
          (n.releasedAtMs = a));
        const l = n.preloadingStartedAtMs
          ? Math.max(0, a - n.preloadingStartedAtMs)
          : 0;
        return (
          Ja(
            "mse.single_tab_startup.released",
            {
              reason: t,
              strategy: ku(n.strategy || "audible-preload-single-seek-back"),
              anchorMediaTime: i,
              preloadEndMediaTime: s,
              releaseMediaTime: o,
              totalElapsedMs: n.startedAtMs
                ? Math.max(0, a - n.startedAtMs)
                : 0,
              preloadElapsedMs: l,
              preloadedMediaSeconds: vu(n.preloadedMediaSeconds),
              rawLeadSeconds: vu(n.rawLeadSeconds),
              rawLeadGainSeconds: vu(n.rawLeadGainSeconds),
              rawCaptureRate: vu(n.rawCaptureRate),
              readyLeadSeconds: vu(n.readyLeadSeconds),
              requiredLeadSeconds: vu(n.requiredLeadSeconds),
              playbackRetryCount: Math.max(
                0,
                Number(n.playbackRetryCount) || 0,
              ),
              timelineResetPending: Boolean(n.timelineResetPending),
              timelineRevision: vu(n.timelineRevision),
              singleSeekBack: r,
              viewerMuted: Boolean(e?.muted),
            },
            "info",
          ),
          {
            anchorMediaTime: o,
            preloadEndMediaTime: s,
            singleSeekBack: r,
            preloadElapsedMs: l,
            preloadedMediaSeconds: n.preloadedMediaSeconds,
            rawLeadSeconds: n.rawLeadSeconds,
            readyLeadSeconds: n.readyLeadSeconds,
            requiredLeadSeconds: n.requiredLeadSeconds,
          }
        );
      })(e, "mse-startup-wait-released"),
      n = Date.now(),
      a = e ? Qd("viewer", e) : null,
      i = Zl(Wl(F.sync.sourceTiming, n), F.sync.sourceTiming, a, n),
      s =
        vu(t?.anchorMediaTime) ??
        vu(e?.currentTime) ??
        vu(a?.currentTime) ??
        vu(F.sync.viewerMediaTime),
      r = null !== i && null !== s ? Math.max(0, i - s) : null,
      o = vu(F.sync.delayBuildProgressSeconds) ?? vu(F.sync.actualDelaySeconds),
      l = [
        vu(F.sync.delayBuildTargetSeconds),
        vu(F.sync.targetDelaySeconds),
        vu(F.sync.fixedDelaySeconds),
      ].filter((e) => null !== e),
      d = _l() ? (l.length ? Math.max(...l) : null) : (l[0] ?? null),
      c = vu(F.sync.mseStartupWaitStartedAt),
      u = null !== c ? Math.max(0, (n - c) / 1e3) : null,
      m = Math.max(0, vu(o) ?? 0, vu(u) ?? 0),
      y = Math.max(0, r ?? o ?? m),
      p = null !== d ? Math.min(d, Math.max(y, m)) : Math.max(y, m),
      g = Math.max(0, p);
    (pd(n),
      (F.sync.vodAligned = !0),
      (F.sync.delayArmed = !0),
      (F.sync.delayArmedAt = n),
      (F.sync.delayBuffering = !1),
      (F.sync.delayBufferStartedAt = 0),
      (F.sync.pendingViewerSeek = null),
      (F.sync.delayAnchorMediaTime = null),
      (F.sync.delayAnchorSourceMediaTime = null),
      (F.sync.lockedDelaySeconds = g),
      (F.sync.targetDelaySeconds = g),
      (F.sync.actualDelaySeconds = g),
      (F.sync.ready = !0),
      (F.sync.viewerMediaTime = s),
      (F.sync.viewerWallTimeMs = n),
      (F.sync.viewerPlaybackRate = e?.paused ? 0 : vu(e?.playbackRate) || 1),
      Bc());
    const f = Boolean(e?.paused),
      S = Boolean(F.sync.mseStartupWaitResumeRequested || !F.sync.userPaused);
    F.sync.mseStartupWaitResumeRequested && (F.sync.userPaused = !1);
    const h =
      !!S &&
      fd(e, {
        startupAnchorMediaTime:
          !0 === F.sync.sourceTiming?.isLiveStream ? s : null,
        startupAnchorReason: "mse-startup-wait-released",
      });
    return (
      (F.sync.mseStartupWaitResumeRequested = !1),
      (F.sync.viewerPlaybackRate = e?.paused
        ? 0
        : vu(e?.playbackRate) || F.sync.viewerPlaybackRate || 1),
      {
        delaySeconds: g,
        targetDelaySeconds: d,
        viewerMediaTime: s,
        resumed: Boolean(f && e && (h || !e.paused)),
        resumeRequested: Boolean(h),
      }
    );
  }
  function _l() {
    const e = F.config || {};
    if ("display" !== F.role) return !1;
    if (!F.sync.enabled) return !1;
    if (F.sync.singleTabMediaSync) return ql(e);
    if (!Ol(e)) return !1;
    const t = String(e.mseStartupBoostMode || "");
    return (
      (!0 !== e.mseStartupBoostEnabled ||
        t === W ||
        "wait-first-mse" === t ||
        "mse-fast-llm" === t) &&
      Boolean(
        e.mseAudioBufferEnabled || "mse-audio-buffer" === e.audioInputMode,
      )
    );
  }
  function ql(e = F.config || {}) {
    if ("display" !== F.role) return !1;
    if (!F.sync.enabled || !F.sync.singleTabMediaSync) return !1;
    if (!Ol(e)) return !1;
    if (!e.mseAudioBufferEnabled && "mse-audio-buffer" !== e.audioInputMode)
      return !1;
    if (!0 === e.sourceIsLiveStream) return !1;
    if (
      "live" ===
      String(e.sourceLiveClassification || "")
        .toLowerCase()
        .trim()
    )
      return !1;
    if (!0 === F.sync.sourceTiming?.isLiveStream) return !1;
    const t = Yd();
    return !t || !0 !== Qd("viewer", t).isLiveStream;
  }
  function Ol(e = F.config || {}) {
    if (!0 === e.mseBatchSttPipelineEnabled) return !0;
    if (!1 === e.mseBatchSttPipelineEnabled) return !1;
    const t = String(e.sttProvider || "")
      .toLowerCase()
      .trim();
    return (
      !t ||
      "st-a" === t ||
      "st-b" === t ||
      "st-e" === t ||
      "st-h" === t ||
      "st-e" === t ||
      "st-f" === t ||
      "st-g" === t
    );
  }
  function Vl() {
    return _l() && !F.sync.mseStartupWaitReleased;
  }
  function $l(e = {}, t = []) {
    if (!1 === e.isFinal) return !1;
    const n = e.sync || e.latency || {};
    return (
      !("mse-readiness" !== e.kind || !n.mseStartupReadiness) ||
      "mse-audio-buffer" === n.sourceType ||
      "mse-audio-buffer" === n.audioInputMode ||
      "mse-audio-buffer" === e.sourceType ||
      "mse-audio-buffer" === e.audioInputMode ||
      (Array.isArray(t) ? t : []).some(
        (e) =>
          !0 === e.mseBufferedSource ||
          "source-media-range" === e.timingSource ||
          "source-media-range-estimate" === e.timingSource ||
          "stt-word-timing-remapped-to-source-range" === e.timingSource,
      )
    );
  }
  function Wl(e = null, t = Date.now()) {
    const n = vu(e?.currentTime);
    if (null === n) return null;
    const a = vu(e?.wallTimeMs) || t,
      i = e?.paused ? 0 : vu(e?.playbackRate) || 1,
      s = Math.max(0, t - a) / 1e3,
      r = n + s * i,
      o = vu(e?.liveEdgeSeconds),
      l = vu(e?.duration);
    if (null !== o) return Math.min(r, o + s * i);
    const d = l;
    return null !== d ? Math.min(r, d) : r;
  }
  function Nl(e = null, t = Date.now()) {
    if (!jl(e)) return null;
    const n = vu(e?.liveEdgeSeconds ?? e?.seekableEndSeconds);
    if (null === n) return null;
    const a = vu(e?.wallTimeMs) || t;
    return n + Math.max(0, t - a) / 1e3;
  }
  function Gl(e = null, t = null, n = Date.now()) {
    if (!0 !== e?.isLiveStream || !0 !== t?.isLiveStream) return null;
    const a = vu(F.sync.sourceToViewerTimelineOffsetSeconds);
    if (F.sync.viewerNativeDvrUnavailable) return (Hl(), a);
    if (ud(n)) return (Hl(), a);
    const i = Nl(e, n),
      s = Nl(t, n);
    if (null === i || null === s) return null;
    const r = s - i;
    if (
      null !== a &&
      F.sync.sourceToViewerTimelineOffsetContinuityActive &&
      (function (e, t, n, a, i = Date.now()) {
        if (F.sync.pendingViewerSeek) return !1;
        const s = Wl(n, i),
          r = Wl(a, i),
          o = F.sync.sourceToViewerTimelineOffsetContinuityActive
            ? (vu(F.sync.sourceToViewerTimelineOffsetContinuityDelaySeconds) ??
              vu(F.sync.actualDelaySeconds))
            : vu(F.sync.actualDelaySeconds);
        if (null === s || null === r || null === o) return !0;
        const l = s + e - r,
          d = s + t - r,
          c = Math.abs(l - o);
        return Math.abs(d - o) + 2 >= c;
      })(a, r, e, t, n)
    )
      return (Hl(), (F.sync.sourceToViewerTimelineOffsetLastStableAtMs = n), a);
    if (null !== a && Math.abs(r - a) <= 2) {
      const e = 0.8 * a + 0.2 * r;
      return (
        (F.sync.sourceToViewerTimelineOffsetSeconds = e),
        (F.sync.sourceToViewerTimelineOffsetLastStableAtMs = n),
        Hl(),
        e
      );
    }
    const o = vu(F.sync.sourceToViewerTimelineOffsetCandidateSeconds);
    if (null === o || Math.abs(r - o) > 2)
      return (
        (F.sync.sourceToViewerTimelineOffsetCandidateSeconds = r),
        (F.sync.sourceToViewerTimelineOffsetCandidateSamples = 1),
        (F.sync.sourceToViewerTimelineOffsetCandidateStartedAtMs = n),
        null
      );
    const l =
        Math.max(
          1,
          Math.round(
            Number(F.sync.sourceToViewerTimelineOffsetCandidateSamples) || 1,
          ),
        ) + 1,
      d = o + (r - o) / l;
    ((F.sync.sourceToViewerTimelineOffsetCandidateSeconds = d),
      (F.sync.sourceToViewerTimelineOffsetCandidateSamples = l));
    const c = vu(F.sync.sourceToViewerTimelineOffsetCandidateStartedAtMs) || n;
    return l < 4 || n - c < 600
      ? null
      : ((F.sync.sourceToViewerTimelineOffsetSeconds = d),
        (F.sync.sourceToViewerTimelineOffsetLastStableAtMs = n),
        (function (e, t, n = "") {
          const a = vu(e),
            i = vu(t);
          if (null === a || null === i) return 0;
          const s = i - a;
          if (Math.abs(s) < 2) return 0;
          const r = sd(i, 0);
          Ja(
            "sync.subtitle_timeline.offset_rebased",
            {
              reason: ku(n || "stable-offset-changed"),
              previousTimelineOffsetSeconds: yn(a),
              nextTimelineOffsetSeconds: yn(i),
              offsetDeltaSeconds: yn(s),
              shiftedSegments: r,
            },
            "warn",
          );
        })(a, d, "live-edge-candidate-settled"),
        Hl(),
        d);
  }
  function Hl() {
    ((F.sync.sourceToViewerTimelineOffsetCandidateSeconds = null),
      (F.sync.sourceToViewerTimelineOffsetCandidateSamples = 0),
      (F.sync.sourceToViewerTimelineOffsetCandidateStartedAtMs = 0));
  }
  function Fl() {
    ((F.sync.sourceToViewerTimelineOffsetSeconds = null),
      (F.sync.sourceToViewerTimelineOffsetLastStableAtMs = 0),
      (F.sync.sourceToViewerTimelineOffsetContinuityActive = !1),
      (F.sync.sourceToViewerTimelineOffsetContinuityDelaySeconds = null),
      (F.sync.viewerNativeDvrUnavailable = !1),
      (F.sync.lastViewerClockRebaseAtMs = 0),
      (F.sync.lastViewerClockRebaseMediaTime = null),
      (F.sync.lastViewerClockRebaseLiveLagSeconds = null),
      (F.sync.lastViewerClockRebaseIgnoreUntilMs = 0),
      (F.sync.lastRawViewerClockSample = null),
      (F.sync.lastFrozenViewerClockSampleLogAtMs = 0),
      (F.sync.sourceBehindViewerDetectedAtMs = 0),
      (F.sync.sourceBehindViewerSamples = 0),
      (F.sync.sourceBehindViewerLastRecoveryAtMs = 0),
      (F.sync.lastSubtitleProjectionRejectLogAtMs = 0),
      (F.sync.lastTrustedViewerSeekIntentAtMs = 0),
      (F.sync.lastTrustedViewerSeekIntentKind = ""),
      Hl());
  }
  function zl(e = null, t = null) {
    return !0 === e?.isLiveStream || !0 === t?.isLiveStream;
  }
  function Kl(e = null) {
    const t = vu(e?.rawSeekableStartSeconds ?? e?.seekableStartSeconds),
      n = vu(e?.seekableEndSeconds ?? e?.liveEdgeSeconds);
    return { start: t, end: n, valid: null !== n && (null === t || n >= t) };
  }
  function jl(e = null) {
    if (!0 !== e?.isLiveStream) return !1;
    const t = vu(e?.currentTime),
      n = Kl(e);
    return !(
      null === t ||
      !n.valid ||
      (null !== n.start && t < n.start - 3) ||
      (null !== n.end && t > n.end + 3) ||
      (null === n.start && null !== n.end && n.end - t > 86400)
    );
  }
  function Ql(e, t = null) {
    const n = vu(e);
    if (null === n || n < 0) return !1;
    if (!0 !== t?.isLiveStream) return !0;
    const a = Kl(t);
    return !(
      !a.valid ||
      (null !== a.start && n < a.start - 3) ||
      (null !== a.end && n > a.end + 3)
    );
  }
  function Jl(e, t = null, n = "") {
    const a = Kl(t);
    Ja(
      "sync.viewer_seek.invalid_live_clock_ignored",
      {
        reason: ku(n || ""),
        targetMediaTime: vu(e),
        currentTime: vu(t?.currentTime),
        rawSeekableStartSeconds: vu(t?.rawSeekableStartSeconds),
        seekableStartSeconds: vu(t?.seekableStartSeconds),
        seekableEndSeconds: vu(t?.seekableEndSeconds),
        liveEdgeSeconds: vu(t?.liveEdgeSeconds),
        rangeStart: a.start,
        rangeEnd: a.end,
      },
      "warn",
    );
  }
  function Yl(e, t = F.sync.sourceTiming, n = null, a = Date.now()) {
    const i = vu(e);
    if (null === i || i < 0)
      return {
        sourceTargetMediaTime: null,
        reason: "invalid-viewer-target",
        clamped: !1,
      };
    const s = n || Xl(a);
    if (zl(t, s)) {
      if (!Ql(i, s))
        return {
          sourceTargetMediaTime: null,
          reason: "viewer-target-outside-live-range",
          clamped: !1,
        };
      if (!jl(t) || !jl(s))
        return {
          sourceTargetMediaTime: null,
          reason: "live-timing-not-ready",
          clamped: !1,
        };
    }
    const r = (function (e, t = F.sync.sourceTiming, n = null, a = Date.now()) {
      const i = vu(e);
      if (null === i) return null;
      const s = n || Xl(a),
        r = Gl(t, s, a);
      return null === r && zl(t, s) ? null : null === r ? i : i - r;
    })(i, t, s, a);
    if (null === r || r < 0)
      return {
        sourceTargetMediaTime: null,
        reason: "source-projection-unavailable",
        clamped: !1,
      };
    const o = Kl(t),
      l = Math.max(0, o.start ?? 0),
      d = o.end,
      c = null === d ? Math.max(l, r) : Cu(r, l, Math.max(l, d));
    return {
      sourceTargetMediaTime: c,
      reason: "",
      clamped: Math.abs(c - r) > _,
    };
  }
  function Xl(e = Date.now()) {
    const t = Yd();
    return t
      ? Qd("viewer", t)
      : {
          isLiveStream: !0 === F.sync.sourceTiming?.isLiveStream,
          currentTime: vu(F.sync.viewerMediaTime),
          liveEdgeSeconds: vu(F.sync.liveEdgeSeconds),
          wallTimeMs: vu(F.sync.viewerWallTimeMs) || e,
          playbackRate: vu(F.sync.viewerPlaybackRate) || 1,
          paused: 0 === F.sync.viewerPlaybackRate,
        };
  }
  function Zl(e, t = F.sync.sourceTiming, n = null, a = Date.now()) {
    const i = vu(e);
    if (null === i) return null;
    const s = n || Xl(a),
      r = Gl(t, s, a);
    return null === r && zl(t, s) ? null : null === r ? i : i + r;
  }
  function ed(e, t = Date.now()) {
    const n = vu(e),
      a = vu(F.sync.delayAnchorSourceMediaTime),
      i = vu(F.sync.delayAnchorMediaTime);
    if (
      null === n ||
      null === a ||
      null === i ||
      F.sync.delayArmed ||
      !0 !== F.sync.sourceTiming?.isLiveStream
    )
      return null;
    if ("youtube" !== F.sync.platform && !ac()) return i + (n - a);
    const s = (function (e = F.sync.sourceTiming, t = Date.now()) {
        if (
          F.sync.delayArmed ||
          !F.sync.delayBuffering ||
          !0 !== e?.isLiveStream ||
          !0 === e.paused
        )
          return null;
        const n = vu(F.sync.liveStartupClockStartedAtMs);
        if (null !== n && n > 0) return n;
        const a = Math.min(t, vu(e.wallTimeMs) || t),
          i = vu(F.sync.delayBufferStartedAt) || 0,
          s = Math.max(a, i);
        return (
          (F.sync.liveStartupClockStartedAtMs = s),
          Ja("sync.live_startup_clock.started", {
            sourceObservedAtMs: a,
            viewerHeldAtMs: i || null,
            startedAtMs: s,
            sourceMediaTime: yn(e.currentTime),
            viewerAnchorMediaTime: yn(F.sync.delayAnchorMediaTime),
          }),
          s
        );
      })(F.sync.sourceTiming, t),
      r = null === s ? 0 : Math.max(0, (t - s) / 1e3),
      o = i + r,
      l = o - n,
      d = vu(F.sync.sourceToViewerTimelineOffsetSeconds);
    return (
      (F.sync.sourceToViewerTimelineOffsetSeconds = l),
      (F.sync.sourceToViewerTimelineOffsetLastStableAtMs = t),
      (F.sync.sourceToViewerTimelineOffsetContinuityActive = !0),
      (F.sync.sourceToViewerTimelineOffsetContinuityDelaySeconds = r),
      Hl(),
      null !== d &&
        Math.abs(l - d) >= 2 &&
        Ja(
          "sync.live_startup_clock.rebased",
          {
            previousOffsetSeconds: yn(d),
            nextOffsetSeconds: yn(l),
            offsetDeltaSeconds: yn(l - d),
            sourceAnchorMediaTime: yn(a),
            sourceMediaTime: yn(n),
            viewerAnchorMediaTime: yn(i),
            elapsedSeconds: yn(r),
          },
          "warn",
        ),
      o
    );
  }
  function td(e = Date.now(), t = {}) {
    if (ud(e)) {
      const t = vu(F.sync.startupResumeAnchorMediaTime),
        n = vu(F.sync.startupResumePlaybackStartedAtMs) || 0;
      if (null !== t)
        return (
          t +
          (n ? Math.max(0, e - n) / 1e3 : 0) *
            (vu(F.sync.viewerPlaybackRate) || 1)
        );
    }
    if ("display" === F.role && !0 !== t.preferStateClock) {
      const e = ec();
      if (null !== e.mediaTime && e.visible) return e.mediaTime;
    }
    const n = vu(F.sync.viewerMediaTime);
    if (null === n) return null;
    const a = vu(F.sync.viewerWallTimeMs),
      i = vu(F.sync.viewerPlaybackRate),
      s = null === i ? 1 : i;
    if (!a) return n;
    const r = n + (Math.max(0, e - a) / 1e3) * s,
      o = vu(F.sync.liveEdgeSeconds);
    return null !== o ? Math.min(r, o) : r;
  }
  function nd(e = null, t = Date.now()) {
    if (!0 !== e?.isLiveStream) return null;
    const n = vu(e.currentTime),
      a = vu(e.seekableEndSeconds ?? e.liveEdgeSeconds);
    return null === n || null === a
      ? null
      : {
          currentTime: n,
          liveEdgeSeconds: a,
          liveLagSeconds: Math.max(0, a - n),
          observedAtMs: t,
          playbackRate: e.paused ? 0 : vu(e.playbackRate) || 1,
          paused: Boolean(e.paused),
        };
  }
  function ad(e = null, t = Date.now()) {
    if (t >= (vu(F.sync.lastViewerClockRebaseIgnoreUntilMs) || 0)) return !1;
    const n = vu(e?.currentTime),
      a = vu(F.sync.lastViewerClockRebaseMediaTime);
    if (null === n || null === a) return !1;
    const i = vu(F.sync.lastViewerClockRebaseAtMs) || t,
      s = e?.paused ? 0 : vu(e?.playbackRate) || 1,
      r = a + (Math.max(0, t - i) / 1e3) * s;
    if (Math.abs(n - r) <= 1.5) return !0;
    const o = vu(e?.actualDelaySeconds),
      l = vu(F.sync.lastViewerClockRebaseLiveLagSeconds);
    return Boolean(
      null !== o && null !== l && Math.abs(o - l) <= 2 && Math.abs(n - r) <= 3,
    );
  }
  function id(e = null, t = "viewer-timing", n = Date.now(), a = {}) {
    const i = (function () {
        const e = F.sync.lastRawViewerClockSample;
        if (!e || "object" != typeof e) return null;
        const t = vu(e.currentTime),
          n = vu(e.liveEdgeSeconds),
          a = vu(e.observedAtMs);
        return null === t || null === n || null === a
          ? null
          : {
              currentTime: t,
              liveEdgeSeconds: n,
              liveLagSeconds: Math.max(0, vu(e.liveLagSeconds) ?? n - t),
              observedAtMs: a,
              playbackRate: vu(e.playbackRate) ?? 1,
              paused: Boolean(e.paused),
            };
      })(),
      s = nd(e, n),
      r = () => {
        s && (F.sync.lastRawViewerClockSample = s);
      },
      o = vu(F.sync.sourceToViewerTimelineOffsetSeconds),
      l = !0 === a?.allowUnintentionalSeekFallback;
    if (
      !0 !== e?.isLiveStream ||
      !0 !== F.sync.sourceTiming?.isLiveStream ||
      F.sync.singleTabMediaSync ||
      (null === o && !l) ||
      F.sync.pendingViewerSeek?.sourceSeekAcknowledged
    )
      return (r(), !1);
    if (ad(e, n)) return (r(), !0);
    const d = i,
      c = vu(s?.currentTime),
      u = vu(s?.liveEdgeSeconds);
    if (!d || null === c || null === u) return (r(), !1);
    const m = d.paused !== s.paused,
      y = c - d.currentTime,
      p = u - d.liveEdgeSeconds,
      g = Math.max(0, u - c),
      f = Math.max(0, n - d.observedAtMs) / 1e3,
      S = d.paused ? 0 : f * (vu(d.playbackRate) || 1),
      h = f,
      b = y - S,
      v = p - h,
      M = Math.abs(b - v);
    if (Boolean(Math.abs(y) <= 0.1 && Math.abs(p) <= 0.1)) {
      const e = vu(F.sync.lastFrozenViewerClockSampleLogAtMs) || 0;
      return (
        f >= 1 &&
          n - e >= 1e4 &&
          ((F.sync.lastFrozenViewerClockSampleLogAtMs = n),
          Ja(
            "sync.viewer_clock_sample.frozen_ignored",
            {
              reason: ku(t || "viewer-timing"),
              sampleAgeMs: Math.round(1e3 * f),
              currentMediaTime: yn(c),
              currentLiveEdgeSeconds: yn(u),
              liveLagSeconds: yn(g),
              previousTimelineOffsetSeconds: yn(o),
            },
            "warn",
          )),
        !1
      );
    }
    const w = !(
      Math.abs(b) < 12 ||
      Math.abs(v) < 12 ||
      M > 3 ||
      Math.abs(g - d.liveLagSeconds) > 2
    );
    if (m && !w) return (r(), !1);
    const T = Boolean(l && ac() && Math.abs(b) >= 3);
    if (!w && !T) return (r(), !1);
    const k = vu(F.sync.actualDelaySeconds),
      x = w ? (b + v) / 2 : b,
      A = null === o ? null : o + x,
      C = Boolean(F.sync.pendingViewerSeek || null !== Ze),
      R = Boolean(F.sync.pendingViewerSeek?.lastSourceCommandAtMs);
    (Ze && (window.clearTimeout(Ze), (Ze = null)),
      (F.sync.pendingViewerSeek = null),
      C &&
        null !== vu(F.sync.lockedDelaySeconds) &&
        ((F.sync.delayArmed = !0),
        (F.sync.delayBuffering = !1),
        (F.sync.delayBufferStartedAt = 0),
        (F.sync.ready = !0),
        (F.sync.mseStartupWaitActive = !1),
        (F.sync.mseStartupWaitReleased = !0),
        en()));
    const D = null === A ? 0 : sd(A, x);
    return (
      null !== A && (F.sync.sourceToViewerTimelineOffsetSeconds = A),
      (F.sync.sourceToViewerTimelineOffsetLastStableAtMs = n),
      (F.sync.sourceToViewerTimelineOffsetContinuityActive = !0),
      (F.sync.sourceToViewerTimelineOffsetContinuityDelaySeconds = k),
      Hl(),
      rd(c, Xe, n),
      (F.sync.liveEdgeSeconds = u),
      null !== k && (F.sync.actualDelaySeconds = k),
      (F.sync.lastViewerClockRebaseAtMs = n),
      (F.sync.lastViewerClockRebaseMediaTime = c),
      (F.sync.lastViewerClockRebaseLiveLagSeconds = g),
      (F.sync.lastViewerClockRebaseIgnoreUntilMs = n + 2500),
      (F.sync.lastViewerTimelineJumpAtMs = 0),
      (F.sync.lastViewerTimelineJumpFrom = null),
      (F.sync.lastViewerTimelineJumpTo = null),
      (F.sync.lastViewerTimelineJumpReason = ""),
      (F.sync.lastViewerTimelineJumpHandledAtMs = 0),
      (F.sync.lastViewerSeekEventAtMs = 0),
      (F.sync.lastViewerSeekEventTarget = null),
      (F.sync.latestViewerSeekingAtMs = 0),
      (F.sync.latestViewerSeekingTarget = null),
      (F.sync.suspendAutoAlignUntilMs = 0),
      r(),
      Ja(
        "sync.viewer_clock_rebase.ignored",
        {
          reason: ku(t || "viewer-timing"),
          detectionMode: w ? "clock-invariant" : "no-user-seek-intent",
          trustedSeekIntentKind: ku(F.sync.lastTrustedViewerSeekIntentKind),
          trustedSeekIntentAgeMs: Math.max(
            0,
            n - (vu(F.sync.lastTrustedViewerSeekIntentAtMs) || n),
          ),
          previousMediaTime: yn(d.currentTime),
          currentMediaTime: yn(c),
          previousLiveEdgeSeconds: yn(d.liveEdgeSeconds),
          currentLiveEdgeSeconds: yn(u),
          previousLiveLagSeconds: yn(d.liveLagSeconds),
          currentLiveLagSeconds: yn(g),
          currentDeltaSeconds: yn(y),
          liveEdgeDeltaSeconds: yn(p),
          sampleAgeSeconds: yn(f),
          expectedCurrentDeltaSeconds: yn(S),
          expectedLiveEdgeDeltaSeconds: yn(h),
          currentOriginShiftSeconds: yn(b),
          liveEdgeOriginShiftSeconds: yn(v),
          rebaseDeltaSeconds: yn(x),
          commonDeltaErrorSeconds: yn(M),
          previousTimelineOffsetSeconds: yn(o),
          nextTimelineOffsetSeconds: yn(A),
          priorActualDelaySeconds: yn(k),
          shiftedSegments: D,
          pendingSeekHadStarted: C,
          pendingSeekCommandSent: R,
        },
        "warn",
      ),
      !0
    );
  }
  function sd(e, t = 0) {
    let n = 0;
    const a = (t) => {
      if (!t || "object" != typeof t) return t;
      const a = vu(t.sourceTimelineOffsetSeconds);
      if (null === a) return t;
      const i = e - a,
        s = { ...t };
      for (const e of [
        "mediaTime",
        "displayAfterMediaTime",
        "audioStartMediaTime",
        "audioEndMediaTime",
        "mediaTimeEnd",
      ]) {
        const n = vu(t[e]);
        null !== n && (s[e] = n + i);
      }
      return ((s.sourceTimelineOffsetSeconds = e), (n += 1), s);
    };
    ((F.activeSegment = a(F.activeSegment)),
      (F.segmentQueue = F.segmentQueue.map(a)),
      (F.subtitleTimelineCache = F.subtitleTimelineCache.map(a)),
      (F.largeSegmentHistory = F.largeSegmentHistory.map(a)),
      (F.displayedSegmentHistory = F.displayedSegmentHistory.map(a)),
      (F.lastQueueSignature = Yn(F.segmentQueue)),
      (F.subtitleRenderSignature = ""),
      (F.largeRenderSignature = ""));
    const i = (e, n) => {
      const a = vu(e?.[n]);
      null !== a && (e[n] = a + t);
    };
    return (
      F.sync.subtitleSeekGuard?.active &&
        (i(F.sync.subtitleSeekGuard, "targetMediaTime"),
        i(F.sync.subtitleSeekGuard, "releaseMediaTime")),
      F.sync.cachedSubtitleReplay?.active &&
        (i(F.sync.cachedSubtitleReplay, "targetMediaTime"),
        i(F.sync.cachedSubtitleReplay, "cacheStartMediaTime"),
        i(F.sync.cachedSubtitleReplay, "cacheEndMediaTime")),
      i(F.sync, "delayAnchorMediaTime"),
      i(F.sync, "lastSeekTargetSeconds"),
      i(F.sync, "mseStartupWaitTargetMediaTime"),
      i(F.sync, "mseReleaseActivateTargetMediaTime"),
      i(F.sync.timelineGapHold, "previousEndMediaTime"),
      i(F.sync.timelineGapHold, "nextStartMediaTime"),
      i(F.sync.mseSubtitleCoverageHold, "previousEndMediaTime"),
      n
    );
  }
  function rd(e, t = null, n = Date.now()) {
    const a = vu(e);
    if (null === a) return !1;
    ((F.sync.viewerMediaTime = a), (F.sync.viewerWallTimeMs = n));
    const i = t?.paused
      ? 0
      : (vu(t?.playbackRate) ?? vu(F.sync.viewerPlaybackRate) ?? 1);
    return ((F.sync.viewerPlaybackRate = i), !0);
  }
  function od(e) {
    const t = vu(e);
    if (null === t) return !1;
    const n = vu(F.sync.lastViewerTimelineJumpAtMs) || 0,
      a = vu(F.sync.lastViewerTimelineJumpTo);
    return !(
      !n ||
      null === a ||
      Math.abs(a - t) > _ ||
      ((F.sync.lastViewerTimelineJumpHandledAtMs = n), 0)
    );
  }
  function ld(e, t = "viewer-timing", n = Date.now()) {
    const a = vu(e);
    if (null === a) return !1;
    const i = td(n, { preferStateClock: !0 });
    if (null === i) return !1;
    const s = Math.abs(a - i),
      r = vu(F.sync.targetDelaySeconds) ?? vu(F.sync.fixedDelaySeconds) ?? 0;
    if (s < (Xr(n) ? 8 : Math.max(8, r + 2))) return !1;
    const o = vu(F.sync.viewerMediaTime),
      l = vu(F.sync.viewerWallTimeMs) || 0,
      d = null === o ? null : Math.abs(a - o);
    if (
      F.sync.delayArmed &&
      !F.sync.pendingViewerSeek &&
      !F.sync.delayBuffering &&
      !Xr(n) &&
      null !== d &&
      d <= O
    ) {
      rd(a, Xe, n);
      const e = vu(F.sync.untrustedViewerReloadLastLogAtMs) || 0;
      return (
        (!e || n - e >= 2e3) &&
          ((F.sync.untrustedViewerReloadLastLogAtMs = n),
          Ja(
            "sync.viewer_clock_stall.seek_ignored",
            {
              reason: ku(t || "viewer-timing"),
              viewerMediaTime: yn(a),
              lastObservedMediaTime: yn(o),
              estimatedMediaTime: yn(i),
              rawDeltaSeconds: yn(d),
              estimatedJumpSeconds: yn(s),
              observationGapMs: l > 0 ? Math.max(0, n - l) : null,
            },
            "warn",
          )),
        !1
      );
    }
    return (
      (F.sync.lastViewerTimelineJumpAtMs = n),
      (F.sync.lastViewerTimelineJumpFrom = i),
      (F.sync.lastViewerTimelineJumpTo = a),
      (F.sync.lastViewerTimelineJumpReason = ku(t || "viewer-timing")),
      (F.sync.lastViewerTimelineJumpHandledAtMs = 0),
      !0
    );
  }
  function dd(e = Date.now()) {
    const t = vu(F.sync.lastViewerTimelineJumpAtMs) || 0;
    return t > 0 && e - t <= 3e3;
  }
  function cd(e, t, n = {}) {
    const a = Boolean(
        "display" === F.role &&
          F.sync.enabled &&
          (!F.sync.singleTabMediaSync || !0 === n.forceInternal),
      ),
      i = Date.now() + 1200;
    try {
      if (
        a &&
        ((F.sync.ignoreViewerSeekUntilMs = i),
        (F.sync.internalViewerSeekUntilMs = i),
        (F.sync.internalViewerSeekTarget = t),
        !F.sync.delayArmed &&
          F.sync.delayBuffering &&
          !F.sync.pendingViewerSeek)
      ) {
        const e = Cu(
            1e3 *
              (Math.max(
                0,
                vu(F.sync.delayBuildTargetSeconds) ??
                  vu(F.sync.targetDelaySeconds) ??
                  vu(F.sync.fixedDelaySeconds) ??
                  0,
              ) +
                15),
            3e4,
            12e4,
          ),
          n = vu(F.sync.startupAlignmentTargetMediaTime);
        ((null === n || Math.abs(n - t) > q) &&
          ((F.sync.startupAlignmentStartedAtMs = Date.now()),
          (F.sync.startupAlignmentEchoIgnoredCount = 0)),
          (F.sync.startupAlignmentTargetMediaTime = t),
          (F.sync.startupAlignmentIgnoreUntilMs = Math.max(
            vu(F.sync.startupAlignmentIgnoreUntilMs) || 0,
            Date.now() + e,
          )));
      }
      return ((e.currentTime = t), !0);
    } catch {
      return (
        a &&
          F.sync.internalViewerSeekTarget === t &&
          ((F.sync.ignoreViewerSeekUntilMs = 0),
          (F.sync.internalViewerSeekUntilMs = 0),
          (F.sync.internalViewerSeekTarget = null)),
        !1
      );
    }
  }
  function ud(e = Date.now()) {
    const t = vu(F.sync.startupResumeAnchorMediaTime),
      n = vu(F.sync.startupResumeAnchorUntilMs) || 0;
    return null !== t && n > e;
  }
  function md(e = "settled", t = null, n = {}) {
    const a = vu(F.sync.startupResumeAnchorMediaTime),
      i = vu(F.sync.startupResumeAnchorArmedAtMs) || 0,
      s = vu(F.sync.startupResumePlaybackStartedAtMs) || 0,
      r = Math.max(0, Number(F.sync.startupResumeAnchorRestoreCount) || 0),
      o = Math.max(0, Number(F.sync.startupResumeAnchorStableSamples) || 0),
      l = null !== a;
    return (
      (F.sync.startupResumeAnchorMediaTime = null),
      (F.sync.startupResumeAnchorArmedAtMs = 0),
      (F.sync.startupResumePlaybackStartedAtMs = 0),
      (F.sync.startupResumeAnchorUntilMs = 0),
      (F.sync.startupResumeAnchorStableSamples = 0),
      (F.sync.startupResumeAnchorRestoreCount = 0),
      l &&
        !1 !== n.log &&
        Ja(
          "sync.viewer_startup_resume_anchor.settled",
          {
            reason: ku(e || "settled"),
            anchorMediaTime: yn(a),
            viewerMediaTime: yn(vu(t?.currentTime)),
            armedForMs: i ? Math.max(0, Date.now() - i) : null,
            playbackSettledForMs: s ? Math.max(0, Date.now() - s) : null,
            restoreCount: r,
            stableSamples: o,
          },
          "stable" === e ? "info" : "warn",
        ),
      l
    );
  }
  function yd(e, t = null, n = Date.now()) {
    if (!ud(n))
      return (
        null !== vu(F.sync.startupResumeAnchorMediaTime) &&
          md("guard-expired", e),
        !1
      );
    const a = vu(F.sync.startupResumeAnchorMediaTime);
    if (!e || null === a || F.sync.userPaused)
      return (md(F.sync.userPaused ? "user-paused" : "video-missing", e), !0);
    const i = t || Qd("viewer", e);
    if (e.paused || i?.paused) return !0;
    let s = vu(F.sync.startupResumePlaybackStartedAtMs) || 0;
    s ||
      ((s = n),
      (F.sync.startupResumePlaybackStartedAtMs = n),
      (F.sync.startupResumeAnchorUntilMs = Math.max(
        vu(F.sync.startupResumeAnchorUntilMs) || 0,
        n + I,
      )));
    const r = vu(e.playbackRate) || 1,
      o = Math.max(0, n - s) / 1e3,
      l = a + o * r,
      d = vu(i?.currentTime ?? e.currentTime);
    if (null === d) return !0;
    const c = d - l;
    if (Math.abs(c) > 0.8) {
      const e =
        Math.max(0, Number(F.sync.startupResumeAnchorRestoreCount) || 0) + 1;
      return (
        (F.sync.startupResumeAnchorStableSamples = 0),
        (F.sync.startupResumeAnchorRestoreCount = e),
        1 === e &&
          Ja(
            "sync.viewer_startup_resume_anchor.drift_observed",
            {
              anchorMediaTime: yn(a),
              expectedMediaTime: yn(l),
              observedMediaTime: yn(d),
              driftSeconds: yn(c),
              elapsedSeconds: yn(o),
            },
            "warn",
          ),
        !0
      );
    }
    return (
      (F.sync.startupResumeAnchorStableSamples =
        Math.max(0, Number(F.sync.startupResumeAnchorStableSamples) || 0) + 1),
      Math.max(0, n - s) >= 3200 &&
        F.sync.startupResumeAnchorStableSamples >= 3 &&
        md("stable", e),
      !0
    );
  }
  function pd(e = Date.now()) {
    if (!F.sync.enabled || F.sync.singleTabMediaSync) return;
    const t =
      e +
      (!0 === F.sync.sourceTiming?.isLiveStream ||
      !0 === F.config?.sourceIsLiveStream
        ? P
        : 2500);
    F.sync.startupSeekGuardUntilMs = Math.max(
      vu(F.sync.startupSeekGuardUntilMs) || 0,
      t,
    );
  }
  function gd(e, t = null) {
    if (!e) return !1;
    F.sync.delayBuffering
      ? null !== t && Ec(F.sync.delayBuildProgressSeconds, t)
      : ((F.sync.delayBuffering = !0),
        (F.sync.delayBufferStartedAt = Date.now()),
        Bc(t));
    try {
      return (e.paused || (So(), e.pause()), !0);
    } catch {
      return !1;
    }
  }
  function fd(e, t = {}) {
    if (F.sync.userPaused)
      return ((F.sync.status = "字幕準備好了，按播放後繼續同步"), !1);
    if (
      ((F.sync.delayBuffering = !1),
      (F.sync.delayBufferStartedAt = 0),
      Bc(),
      !e)
    )
      return !1;
    const n = Date.now();
    if (
      F.sync.viewerPlaybackBlocked &&
      n - (vu(F.sync.viewerPlaybackBlockedAtMs) || 0) < 2500
    )
      return !1;
    const a = vu(t.startupAnchorMediaTime),
      i =
        null !== a &&
        (function (e, t, n = "startup-delay-ready", a = Date.now()) {
          const i = vu(t),
            s =
              !0 === F.sync.sourceTiming?.isLiveStream ||
              !0 === F.config?.sourceIsLiveStream;
          return e &&
            null !== i &&
            F.sync.enabled &&
            !F.sync.singleTabMediaSync &&
            s
            ? ((F.sync.startupResumeAnchorMediaTime = i),
              (F.sync.startupResumeAnchorArmedAtMs = a),
              (F.sync.startupResumePlaybackStartedAtMs = e.paused ? 0 : a),
              (F.sync.startupResumeAnchorUntilMs = a + I),
              (F.sync.startupResumeAnchorStableSamples = 0),
              (F.sync.startupResumeAnchorRestoreCount = 0),
              (F.sync.startupSeekGuardUntilMs = Math.max(
                vu(F.sync.startupSeekGuardUntilMs) || 0,
                a + P,
              )),
              Ja("sync.viewer_startup_resume_anchor.armed", {
                reason: ku(n || "startup-delay-ready"),
                anchorMediaTime: yn(i),
                viewerMediaTime: yn(vu(e.currentTime)),
                guardMs: I,
              }),
              !0)
            : (md("not-applicable", e, { log: !1 }), !1);
        })(e, a, t.startupAnchorReason || "startup-delay-ready", n);
    if (!e.paused) return (i && yd(e, Qd("viewer", e)), !0);
    if (i && ac()) {
      const t = F.sessionId;
      return (
        chrome.runtime
          .sendMessage({
            type: "LIVE_SUBTITLE_COMMIT_STARTUP_VIEWER_ANCHOR",
            sessionId: t,
            targetMediaTime: a,
          })
          .then((n) => {
            if (F.sync.enabled && F.sessionId === t && !F.sync.userPaused) {
              if (
                (!0 === n?.liveDvrKnown &&
                  !1 === n?.liveDvrEnabled &&
                  !0 !== n?.pageCommandHandled &&
                  (F.sync.viewerNativeDvrUnavailable = !0),
                Ja(
                  "sync.viewer_startup_resume_anchor.page_committed",
                  {
                    ok: !0 === n?.ok,
                    pageCommandHandled: !0 === n?.pageCommandHandled,
                    method: ku(n?.method),
                    targetMediaTime: yn(a),
                    beforeMediaTime: yn(n?.beforeMediaTime),
                    resumedMediaTime: yn(n?.resumedMediaTime),
                    relativeSeekSeconds: yn(n?.relativeSeekSeconds),
                    committedMediaTime: yn(n?.committedMediaTime),
                    verifiedMediaTime: yn(n?.verifiedMediaTime),
                    verificationDriftSeconds: yn(n?.verificationDriftSeconds),
                    commitAttempts: Math.max(0, Number(n?.commitAttempts) || 0),
                    liveDvrKnown: !0 === n?.liveDvrKnown,
                    liveDvrEnabled: !0 === n?.liveDvrEnabled,
                    seekByAvailable: !0 === n?.seekByAvailable,
                    progressBefore: n?.progressBefore || null,
                    progressAfterResume: n?.progressAfterResume || null,
                    progressAfterCommit: n?.progressAfterCommit || null,
                    paused: !0 === n?.paused,
                    error: ku(n?.error),
                  },
                  !0 === n?.pageCommandHandled ? "info" : "warn",
                ),
                !0 === n?.pageCommandHandled)
              )
                return (
                  (F.sync.viewerPlaybackBlocked = !1),
                  (F.sync.viewerPlaybackBlockedAtMs = 0),
                  (F.sync.viewerPlaybackRate = e.paused
                    ? 0
                    : Number(e.playbackRate) || 1),
                  yd(e, Qd("viewer", e)),
                  e.paused &&
                    window.setTimeout(() => {
                      F.sync.enabled &&
                        F.sessionId === t &&
                        !F.sync.userPaused &&
                        e.paused &&
                        (md("page-commit-paused", e), Sd(e, !1));
                    }, 180),
                  void ei()
                );
              (md("page-commit-failed", e), Sd(e, !1));
            }
          })
          .catch(() => {
            F.sync.enabled &&
              F.sessionId === t &&
              !F.sync.userPaused &&
              (md("page-commit-error", e), Sd(e, !1));
          }),
        !0
      );
    }
    return Sd(e, i);
  }
  function Sd(e, t = !1) {
    try {
      So();
      const n = e.play();
      return (
        t && yd(e, Qd("viewer", e)),
        n?.then &&
          n
            .then(() => {
              ((F.sync.viewerPlaybackBlocked = !1),
                (F.sync.viewerPlaybackBlockedAtMs = 0),
                (F.sync.viewerPlaybackRate = e.paused
                  ? 0
                  : Number(e.playbackRate) || 1),
                t && yd(e, Qd("viewer", e)),
                ei());
            })
            .catch((t) => {
              hd(e, t);
            }),
        window.setTimeout(() => {
          !F.sync.enabled ||
            F.sync.singleTabMediaSync ||
            F.sync.userPaused ||
            (e.paused && hd(e));
        }, 650),
        !0
      );
    } catch {
      return (hd(e), !1);
    }
  }
  function hd(e, t = null) {
    const n = Date.now();
    (md("playback-blocked", e),
      (F.sync.viewerPlaybackBlocked = !0),
      (F.sync.viewerPlaybackBlockedAtMs = n),
      (F.sync.viewerPlaybackRate = 0),
      (F.sync.ready = !1),
      (F.sync.status = "字幕準備好了，請點影片播放以開始同步"),
      go(),
      ei(),
      n - (vu(F.sync.viewerPlaybackBlockNoticeSentAtMs) || 0) < 900 ||
        ((F.sync.viewerPlaybackBlockNoticeSentAtMs = n),
        yo("pause", Qd("viewer", e)),
        t?.message &&
          console.warn("[live-subtitle] viewer autoplay blocked:", t.message)));
  }
  function bd() {
    const e = (function (e = F.config || {}) {
        const t =
            vu(e.effectiveSyncDelaySeconds) ??
            vu(e.syncDelaySeconds) ??
            vu(e.youtubeSyncDelaySeconds),
          n =
            vu(F.sync.fixedDelaySeconds) ?? vu(F.sync.targetDelaySeconds) ?? 6;
        return Cu(t ?? n, 2, A);
      })(),
      t = vu(F.sync.fixedDelaySeconds),
      n = vu(F.sync.delayBuildTargetSeconds),
      a = vu(F.sync.targetDelaySeconds),
      i = vu(F.sync.lockedDelaySeconds);
    let s = Math.max(e, null !== t ? t : 0, null !== n ? n : 0);
    return (
      null !== a && a >= 1.65 && (s = Math.max(s, a)),
      null !== i && i >= s - E && (s = Math.max(s, i)),
      Cu(s, 2, A)
    );
  }
  function vd() {
    if (F.sync.delayArmed)
      return Cu(
        vu(F.sync.lockedDelaySeconds) ??
          vu(F.sync.targetDelaySeconds) ??
          F.sync.fixedDelaySeconds,
        2,
        A,
      );
    const e = vu(F.sync.delayBuildTargetSeconds);
    if (F.sync.delayBuffering && null !== e) {
      const t = vu(F.sync.targetDelaySeconds);
      return Cu(Math.max(e, t ?? e), 2, A);
    }
    return (function () {
      const e = Math.max(
        wd(F.sync.requiredDelaySamples, 60).length,
        wd(F.sync.latencySamples, 20).length,
      );
      return "fixed" === F.sync.mode || e < 5 ? F.sync.fixedDelaySeconds : Md();
    })();
  }
  function Md() {
    const e = F.sync.latencyPercentiles,
      t = wd(F.sync.requiredDelaySamples, 60),
      n = wd(F.sync.latencySamples, 20),
      a = Ad(Rd()),
      i = a.samples.length >= 5,
      s = i || t.length >= 5,
      r = i ? a.samples : s ? t : n,
      o = i ? a.source : s ? "required:recent" : "pipeline:recent";
    if (((F.sync.latencyPercentiles = Td(r, o)), r.length < 5))
      return F.sync.fixedDelaySeconds;
    const l = F.sync.latencyPercentiles;
    let d =
      (r.length >= 20
        ? l.p97Seconds
        : r.length >= 12
          ? l.p95Seconds
          : l.p80Seconds) + (s ? 0.4 : 0.8);
    const c = vu(F.sync.recommendedDelaySeconds),
      u = (vu(e?.sampleCount) || 0) >= 5;
    return (
      null !== c &&
        u &&
        (d = d > c ? Math.min(d, c + 1.5) : Math.max(d, c - 0.15)),
      Cu(d, 2, A)
    );
  }
  function wd(e, t) {
    return (Array.isArray(e) ? e : [])
      .slice(-t)
      .map((e) => vu(e))
      .filter((e) => null !== e && e > 0);
  }
  function Td(e, t = "pipeline") {
    const n = wd(e, e?.length || 0);
    if (!n.length)
      return {
        source: t,
        sampleCount: 0,
        p50Seconds: null,
        p80Seconds: null,
        p90Seconds: null,
        p95Seconds: null,
        p97Seconds: null,
        p99Seconds: null,
        tailGapSeconds: null,
      };
    const a = [...n].sort((e, t) => e - t),
      i = (e) => {
        const t = Math.min(
          a.length - 1,
          Math.max(0, Math.ceil(a.length * e) - 1),
        );
        return a[t] / 1e3;
      },
      s = i(0.95),
      r = i(0.99);
    return {
      source: t,
      sampleCount: a.length,
      p50Seconds: i(0.5),
      p80Seconds: i(0.8),
      p90Seconds: i(0.9),
      p95Seconds: s,
      p97Seconds: i(0.97),
      p99Seconds: r,
      tailGapSeconds: Math.max(0, r - s),
    };
  }
  function kd(e = []) {
    const t = Date.now();
    return (Array.isArray(e) ? e : [])
      .map((e) =>
        "number" == typeof e ? { ms: e, t: t } : { ms: vu(e?.ms), t: vu(e?.t) },
      )
      .filter(
        (e) => null !== e.ms && e.ms > 0 && null !== e.t && t - e.t <= 12096e5,
      )
      .slice(-80);
  }
  function xd(e, t) {
    const n = F.sync.latencyProfile || {
      version: 1,
      bucketHours: 2,
      providers: {},
      updatedAt: null,
    };
    F.sync.latencyProfile = n;
    const a = Dd(e);
    return (
      (n.providers[a] = n.providers[a] || { buckets: {} }),
      (n.providers[a].buckets[t] = n.providers[a].buckets[t] || {
        samples: [],
      }),
      n.providers[a].buckets[t]
    );
  }
  function Ad(e = Rd(), t = Date.now()) {
    const n = (function (e = Date.now()) {
        const t = Ld(e);
        return [(t - 2 + 24) % 24, t, (t + 2) % 24].map(
          (e) => `h${String(e).padStart(2, "0")}`,
        );
      })(t),
      a = Dd(e),
      i = Cd(a, n);
    if (i.length >= 5)
      return { samples: i, source: `required:time ${Bd(t)} ${a}` };
    const s = "all" === a ? [] : Cd("all", n);
    return s.length >= 5
      ? { samples: s, source: `required:time ${Bd(t)} all` }
      : { samples: [], source: "" };
  }
  function Cd(e, t = []) {
    const n = F.sync.latencyProfile?.providers?.[Dd(e)],
      a = n?.buckets || {};
    return t.flatMap((e) => kd(a[e]?.samples || []).map((e) => e.ms));
  }
  function Rd() {
    return Dd(
      F.sync.lastLatencyProviderKey ||
        F.config?.provider ||
        F.usage?.provider ||
        "default",
    );
  }
  function Dd(e) {
    return (
      String(e || "default")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9._:-]+/g, "-")
        .replace(/^-+|-+$/g, "") || "default"
    );
  }
  function Ld(e = Date.now()) {
    const t = new Date(e).getHours();
    return 2 * Math.floor(t / 2);
  }
  function Bd(e = Date.now()) {
    const t = Ld(e),
      n = (t + 2) % 24;
    return `h${String(t).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
  }
  async function Ed() {
    Je && (window.clearTimeout(Je), (Je = null));
    const e = F.sync.latencyProfile || {
      version: 1,
      bucketHours: 2,
      providers: {},
      updatedAt: null,
    };
    (!(function (e = F.sync.latencyProfile) {
      if (e?.providers)
        for (const t of Object.values(e.providers)) {
          const e = t?.buckets || {};
          for (const [t, n] of Object.entries(e))
            ((n.samples = kd(n.samples || [])),
              n.samples.length || delete e[t]);
        }
    })(e),
      await chrome.storage?.local?.set?.({ [s]: e }));
  }
  function Pd() {
    const e = Yd(),
      t = Qd("page", e),
      n = nc(location.href),
      a = ac() ? Sc() : "",
      i = a ? `youtube:${a}` : gc(location.href),
      s = ac()
        ? Tc(e, t)
        : {
            status: t.isLiveStream ? "live" : "vod",
            evidence: t.isLiveStream
              ? `${n}-live-context`
              : `${n}-finite-media`,
          },
      r = "live" === s.status,
      o = Mc(t),
      l = (function (e = null) {
        const t = [],
          n = new Set(),
          a = Id(),
          i = (e, a = "unknown") => {
            const i = $d(e);
            if (!i || n.has(i)) return;
            const s = (function (e = "") {
              const t = String(e || "").toLowerCase();
              return t.startsWith("blob:")
                ? "blob"
                : /\.m3u8(?:$|[?#])/.test(t) || t.includes("m3u8")
                  ? "hls"
                  : /\.mpd(?:$|[?#])/.test(t) ||
                      t.includes("dash_manifest") ||
                      /\/dash(?:[/?#]|$)/.test(t)
                    ? "dash"
                    : /\.(?:mp4|m4v|mov)(?:$|[?#])/.test(t)
                      ? "mp4"
                      : "";
            })(i);
            s &&
              (n.add(i),
              t.push({
                url: i,
                type: s,
                source: a,
                playable: "blob" !== s,
                score: Gd(i, s, a),
              }));
          };
        e && (i(e.currentSrc, "video.currentSrc"), i(e.src, "video.src"));
        for (const e of Array.from(document.querySelectorAll("video, source")))
          (i(e.currentSrc, `${e.localName}.currentSrc`),
            i(e.src, `${e.localName}.src`));
        !(function (e, t, n = null) {
          if ("function" != typeof e) return;
          const a = [
              "src",
              "href",
              "content",
              "data-src",
              "data-url",
              "data-video-url",
              "data-mpd",
              "data-hls",
            ],
            i = (t, n) => {
              for (const a of _d(t)) e(a, n);
            },
            s = Array.from(
              document.querySelectorAll(
                "video, source, link, meta, [src], [href], [data-src], [data-url], [data-video-url], [data-mpd], [data-hls]",
              ),
            );
          n &&
            ((n.mediaNodeCount = s.length),
            (n.mediaNodeScanCount = Math.min(s.length, 400)));
          for (const e of s.slice(0, 400))
            for (const t of a) {
              const a = e.getAttribute?.(t);
              a &&
                (n && (n.mediaAttributeScanCount += 1),
                i(a, `${e.localName || "node"}.${t}`));
            }
          const r = Array.from(
            document.querySelectorAll(
              'script[type="application/json"], script[type="application/ld+json"], script:not([src])',
            ),
          );
          n &&
            ((n.scriptNodeCount = r.length),
            (n.scriptNodeScanCount = Math.min(r.length, 40)));
          for (const e of r.slice(0, 40)) {
            const a = e.textContent || "";
            if (!a || !/cdninstagram|fbcdn|fbsbx|dash|m3u8|mpd/i.test(a))
              continue;
            n &&
              ((n.matchedScriptNodeCount += 1),
              a.length > x && (n.largeScriptNodeCount += 1));
            const s = Ud(a);
            (n &&
              ((n.scriptSnippetCount += s.length),
              (n.keywordWindowCount += Math.max(0, s.length - 1))),
              s.forEach((e, n) => {
                const a =
                  0 === n ? "script.inline" : `script.inline.window${n}`;
                if ((i(e, a), "function" == typeof t))
                  for (const n of Wd(e)) t(n, `${a}.mpd`);
              }));
          }
        })(
          i,
          (e, a = "unknown") => {
            const i = Nd(e);
            if (!i) return;
            const s = (function (e = "") {
              const t = String(e || "").match(
                /<BaseURL\b[^>]*>([\s\S]*?)<\/BaseURL>/i,
              );
              if (t) {
                const e = $d(
                  (function (e = "") {
                    return qd(e)
                      .replace(/<[^>]+>/g, "")
                      .trim();
                  })(t[1]),
                );
                if (e && /instagram|cdninstagram|fbcdn|fbsbx|facebook/i.test(e))
                  return e;
              }
              for (const t of _d(e)) {
                const e = $d(t);
                if (e) return e;
              }
              return "";
            })(i);
            if (!s) return;
            const r = `inline-dash:${(function (e = "") {
              let t = 2166136261;
              const n = String(e || "");
              for (let e = 0; e < n.length; e += 1)
                ((t ^= n.charCodeAt(e)), (t = Math.imul(t, 16777619)));
              return (t >>> 0).toString(16);
            })(i)}`;
            n.has(r) ||
              (n.add(r),
              t.push({
                url: s,
                type: "dash",
                source: a,
                playable: !0,
                inlineManifest: !0,
                manifestText: i,
                manifestBaseUrl: s,
                manifestSignature: r,
                score: Gd(s, "dash", a) + 10,
              }));
          },
          a,
        );
        const s = window.performance?.getEntriesByType?.("resource") || [];
        a.performanceResourceCount = s.length;
        for (const e of s) i(e.name, "performance.resource");
        const r = t.sort((e, t) => t.score - e.score);
        return (
          (Ee = {
            ...a,
            candidateCount: r.length,
            returnedCandidateCount: Math.min(r.length, 20),
            inlineManifestCount: r.filter((e) => !0 === e.inlineManifest)
              .length,
          }),
          r.slice(0, 20).map(({ score: e, ...t }) => t)
        );
      })(e);
    return {
      ok: !0,
      href: location.href,
      platform: n,
      isYouTube: ac(),
      isTwitch: sc(),
      isInstagram: oc(),
      videoId: a,
      mediaContextKey: i,
      canonicalMediaUrl: a ? fc(a) : location.href,
      hasVideo: !1 !== t.found,
      isLiveStream: r,
      liveClassification: s.status,
      liveEvidence: s.evidence,
      liveBufferSeconds: o,
      canSeekLiveBuffer: wc(t, o),
      timing: t,
      nativeMediaCandidates: l,
      nativeCandidateDiagnostics: Ee,
    };
  }
  function Id() {
    return {
      generatedAtMs: Date.now(),
      mediaNodeCount: 0,
      mediaNodeScanCount: 0,
      mediaAttributeScanCount: 0,
      performanceResourceCount: 0,
      scriptNodeCount: 0,
      scriptNodeScanCount: 0,
      matchedScriptNodeCount: 0,
      largeScriptNodeCount: 0,
      scriptSnippetCount: 0,
      keywordWindowCount: 0,
      candidateCount: 0,
      returnedCandidateCount: 0,
      inlineManifestCount: 0,
    };
  }
  function Ud(e = "") {
    const t = String(e || "");
    if (!t) return [];
    const n = [],
      a = [],
      i = new Set(),
      s = (e, s) => {
        const r = Math.max(0, Math.min(t.length, Math.floor(e))),
          o = Math.max(r, Math.min(t.length, Math.ceil(s)));
        if (o <= r) return;
        if (a.some((e) => r >= e.start && o <= e.end)) return;
        if (
          a.some((e) => {
            return (
              (t = r),
              (n = o),
              (a = e.start),
              (i = e.end),
              Math.max(0, Math.min(n, i) - Math.max(t, a)) /
                Math.max(1, Math.min(n - t, i - a)) >
                0.82
            );
            var t, n, a, i;
          })
        )
          return;
        const l = `${r}:${o}`;
        i.has(l) ||
          (i.add(l), a.push({ start: r, end: o }), n.push(t.slice(r, o)));
      };
    s(0, Math.min(t.length, x));
    const r = Math.floor(13e4),
      o = [
        /cdninstagram|fbcdn|fbsbx|dash_manifest|broadcast_dash_manifest|dash_abr_playback_url|m3u8|\.mpd|<MPD/gi,
        /playback_url/gi,
      ];
    for (const e of o) {
      e.lastIndex = 0;
      let a = null;
      for (; (a = e.exec(t)) && n.length < 9; ) s(a.index - r, a.index + r);
    }
    return n;
  }
  function _d(e = "") {
    const t = qd(e);
    if (!t) return [];
    const n = new Set(),
      a =
        /(?:https?:)?\/\/[^\s"'<>\\]+?(?:\.m3u8|\.mpd|dash_manifest|\/dash\/|\.mp4|\.m4v|\.mov)(?:[^\s"'<>\\]*)?/gi;
    for (const e of t.matchAll(a)) {
      const t = Vd(e[0]);
      t &&
        /instagram|cdninstagram|fbcdn|fbsbx|facebook|ttvnw|hls\.live-video\.net/i.test(
          t,
        ) &&
        n.add(t);
    }
    return [...n].slice(0, 40);
  }
  function qd(e = "") {
    let t = String(e || "");
    if (!t) return "";
    const n = new Set();
    for (let e = 0; e < 4 && !n.has(t); e += 1) {
      n.add(t);
      const e = t;
      if (((t = Od(t)), t === e)) break;
    }
    return t;
  }
  function Od(e = "") {
    let t = String(e || "");
    return (
      (t = t
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, '"')
        .replace(/&apos;/gi, "'")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&#x2f;/gi, "/")
        .replace(/&#47;/g, "/")
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .replace(/\\u([0-9a-f]{4})/gi, (e, t) => {
          const n = Number.parseInt(t, 16);
          return n >= 32 && n <= 126 ? String.fromCharCode(n) : e;
        })
        .replace(/\\x([0-9a-f]{2})/gi, (e, t) => {
          const n = Number.parseInt(t, 16);
          return n >= 32 && n <= 126 ? String.fromCharCode(n) : e;
        })
        .replace(/\\\//g, "/")
        .replace(/\\\\/g, "\\")),
      (function (e = "") {
        const t = String(e || "");
        try {
          return decodeURIComponent(t);
        } catch {
          return t.replace(/%(3a|2f|5c|26|3f|3d|25|23|2e|2d|5f|7e)/gi, (e, t) =>
            String.fromCharCode(Number.parseInt(t, 16)),
          );
        }
      })(t)
    );
  }
  function Vd(e = "") {
    return String(e || "")
      .replace(/[),.;\]}]+$/g, "")
      .replace(/&quot;.*$/g, "")
      .trim();
  }
  function $d(e = "") {
    const t = String(e || "").trim();
    if (!t) return "";
    if (t.startsWith("blob:")) return t;
    try {
      return new URL(t, location.href).href;
    } catch {
      return "";
    }
  }
  function Wd(e = "") {
    const t = qd(e);
    if (!t || !/<(?:\?xml[^>]*>\s*)?MPD[\s>]/i.test(t)) return [];
    const n = [],
      a = /(?:<\?xml[^>]*>\s*)?<MPD[\s\S]*?<\/MPD>/gi;
    for (const e of t.matchAll(a)) {
      const t = Nd(e[0]);
      if ((t && n.push(t), n.length >= 4)) break;
    }
    return n;
  }
  function Nd(e = "") {
    const t = String(e || "").trim();
    return !t || t.length > 24e4
      ? ""
      : /<MPD[\s>]/i.test(t) &&
          /<\/MPD>/i.test(t) &&
          /cdninstagram|fbcdn|fbsbx|facebook/i.test(t)
        ? t
        : "";
  }
  function Gd(e, t, n) {
    let a = 0;
    return (
      "dash" === t
        ? (a += 90)
        : "hls" === t
          ? (a += 85)
          : "mp4" === t
            ? (a += 50)
            : "blob" === t && (a += 5),
      /instagram|cdninstagram|fbcdn|fbsbx|facebook/i.test(e) && (a += 20),
      /usher\.ttvnw\.net|\.ttvnw\.net|hls\.live-video\.net/i.test(e) &&
        (a += 20),
      /usher\.ttvnw\.net\/api\/channel\/hls\/[^/]+\.m3u8/i.test(e) && (a += 25),
      /live|broadcast|dash|manifest|m3u8/i.test(e) && (a += 15),
      /video\./i.test(n) && (a += 8),
      /performance/i.test(n) && (a += 3),
      a
    );
  }
  function Hd(e = [], t = {}) {
    for (const n of e) {
      let e = [];
      try {
        e = Array.from(document.querySelectorAll(n));
      } catch {
        e = [];
      }
      for (const n of e) if (n && (!1 === t.visible || xc(n))) return n;
    }
    return null;
  }
  function Fd(e = []) {
    return zd(
      e
        .filter(Boolean)
        .map((e) =>
          [
            e.textContent,
            e.getAttribute?.("aria-label"),
            e.getAttribute?.("title"),
          ]
            .filter(Boolean)
            .join(" "),
        )
        .filter(Boolean)
        .join(" "),
    );
  }
  function zd(e = "") {
    return String(e || "")
      .replace(/\s+/g, " ")
      .trim();
  }
  function Kd(e = "") {
    const t = String(e || "").toLowerCase();
    return (
      !!t &&
      (t.includes("skip ad") ||
        t.includes("skip ads") ||
        t.includes("ad will end") ||
        t.includes("commercial break") ||
        t.includes("advertisement") ||
        t.includes("略過廣告") ||
        t.includes("跳過廣告") ||
        t.includes("廣告") ||
        t.includes("広告") ||
        t.includes("publicidad"))
    );
  }
  function jd(e, t = "") {
    if (!e || !1 === F.config?.autoSkipAds) return !1;
    const n = Date.now();
    if (n - (vu(F.sync.lastAdSkipAttemptAt) || 0) < 2500) return !1;
    F.sync.lastAdSkipAttemptAt = n;
    try {
      return (
        e.click(),
        Ja("ad.skip_button.clicked", {
          platform: t,
          text: zd(e.textContent || e.getAttribute?.("aria-label") || "").slice(
            0,
            80,
          ),
        }),
        !0
      );
    } catch (e) {
      return (
        Ja(
          "ad.skip_button.failed",
          { platform: t, error: e?.message || "click failed" },
          "warn",
        ),
        !1
      );
    }
  }
  function Qd(e, t = null) {
    const n = t || Yd(),
      a = Date.now(),
      i = yc(),
      s =
        Va(
          "source" === e
            ? F.config?.sourceMediaContextKey ||
                F.config?.viewerMediaContextKey ||
                ""
            : F.config?.viewerMediaContextKey ||
                F.config?.sourceMediaContextKey ||
                "",
        ) || i,
      r = ac() ? Sc() : "",
      o = r ? fc(r) : F.config?.canonicalPageUrl || location.href;
    if (!n)
      return {
        role: e,
        found: !1,
        currentTime: null,
        liveEdgeSeconds: null,
        actualDelaySeconds: null,
        wallTimeMs: a,
        mediaContextKey: s,
        observedMediaContextKey: i,
        canonicalMediaUrl: o,
        href: location.href,
      };
    const l = n.seekable,
      d = l?.length || 0,
      c = d ? Jd(l, "start", 0) : null,
      u = d ? Jd(l, "end", d - 1) : null,
      m = Number.isFinite(n.currentTime) ? n.currentTime : null,
      y = Number.isFinite(n.duration) && n.duration > 0 ? n.duration : null,
      p = { currentTime: m, duration: y, seekableEndSeconds: u },
      g = ac() ? Tc(n, p) : null,
      f = g
        ? "live" === g.status
        : (function (e = null, t = {}) {
            return (
              !(!e || e.duration !== 1 / 0) ||
              (ac()
                ? (function (e = null, t = {}) {
                    return "live" === Tc(e, t).status;
                  })(e, t)
                : sc()
                  ? (function (e = null, t = {}) {
                      if (e && e.duration === 1 / 0) return !0;
                      const n = location.pathname.split("/").filter(Boolean);
                      if ("videos" === n[0]?.toLowerCase()) return !1;
                      const a = vu(t.duration),
                        i = vu(t.currentTime),
                        s = vu(t.seekableEndSeconds);
                      if (null === a && null !== i && null !== s) return !0;
                      const r = [
                        document.querySelector('[data-a-target="stream-title"]')
                          ?.textContent || "",
                        document.querySelector(
                          '[data-a-target="player-overlay-click-handler"]',
                        )?.textContent || "",
                        document.querySelector('[aria-label*="LIVE" i]')
                          ?.textContent || "",
                        document.querySelector('[aria-label*="直播" i]')
                          ?.textContent || "",
                      ].join(" ");
                      return (
                        !!/live|直播|配信中|ライブ/i.test(r) ||
                        Boolean(n[0] && !vc.has(n[0].toLowerCase()) && e)
                      );
                    })(e, t)
                  : oc()
                    ? (function (e = null, t = {}) {
                        if (!oc()) return !1;
                        if (e && e.duration === 1 / 0) return !0;
                        const n = location.pathname
                          .split("/")
                          .filter(Boolean)
                          .map((e) => e.toLowerCase());
                        if (e && (n.includes("live") || "stories" === n[0]))
                          return !0;
                        const a = vu(t.duration),
                          i = vu(t.currentTime),
                          s = vu(t.seekableEndSeconds);
                        if (null === a && null !== i && null !== s) return !0;
                        const r = [
                            ...document.querySelectorAll(
                              [
                                '[aria-label*="LIVE" i]',
                                '[aria-label*="Live" i]',
                                '[aria-label*="直播" i]',
                                '[aria-label*="ライブ" i]',
                                '[aria-label*="라이브" i]',
                                'svg[aria-label*="LIVE" i]',
                                'svg[aria-label*="直播" i]',
                                'svg[aria-label*="ライブ" i]',
                                'svg[aria-label*="라이브" i]',
                              ].join(","),
                            ),
                          ],
                          o = [
                            document.title || "",
                            ...r
                              .slice(0, 40)
                              .map(
                                (e) =>
                                  `${e.getAttribute("aria-label") || ""} ${e.textContent || ""}`,
                              ),
                          ].join(" ");
                        return (
                          !!/\bLIVE\b|直播|ライブ|라이브/i.test(o) && Boolean(e)
                        );
                      })(e, t)
                    : (function (e = null, t = {}) {
                        if (e && e.duration === 1 / 0) return !0;
                        const n = vu(t.duration),
                          a = vu(t.currentTime),
                          i = vu(t.seekableEndSeconds);
                        if (null !== n && null !== a && null !== i) {
                          const e = n - a,
                            t = i - a;
                          return (
                            n > 60 && e >= -2 && e <= 3 && t >= -2 && t <= 3
                          );
                        }
                        return !1;
                      })(e, t))
            );
          })(n, p),
      S = (function ({
        currentTime: e,
        duration: t,
        seekableEndSeconds: n,
        isLiveStream: a,
      }) {
        a &&
          Number.isFinite(e) &&
          (Number.isFinite(t) && t - e > 86400 && (t = null),
          Number.isFinite(n) && n - e > 86400 && (n = null));
        const i = Number.isFinite(t) && t > 0,
          s = Number.isFinite(n);
        if (i && Number.isFinite(e)) {
          const i = t - e,
            r = s ? n - e : null,
            o = i >= -2 && i <= 480,
            l =
              s && (Math.abs(n - t) > A || (null !== r && r > 480 && i <= 480));
          if (a && (!s || (o && (ac() || l)))) return t;
        }
        return s ? n : i ? t : null;
      })({
        currentTime: m,
        duration: y,
        seekableEndSeconds: u,
        isLiveStream: f,
      }),
      h = (function (e, t) {
        return Number.isFinite(e)
          ? Number.isFinite(t)
            ? e <= t + 1
              ? e
              : null
            : e
          : null;
      })(c, S),
      b = null !== m && null !== S ? Math.max(0, S - m) : null,
      v = f ? b : null,
      M = (function (e = null) {
        const t = nc(location.href),
          n =
            (e || Yd(),
            {
              adPlaying: !1,
              adSkippable: !1,
              adReason: "",
              adPlatform: t,
              adSkipText: "",
            });
        if ("youtube" === t) {
          const e = Hd(
              [
                ".html5-video-player.ad-showing",
                ".html5-video-player.ad-interrupting",
              ],
              { visible: !1 },
            ),
            t = Hd([
              ".ytp-ad-skip-button",
              ".ytp-ad-skip-button-modern",
              ".ytp-skip-ad-button",
              ".ytp-ad-skip-button-container button",
              "button[class*='ytp-ad-skip']",
            ]),
            a = Hd([
              ".ytp-ad-player-overlay",
              ".ytp-ad-preview-container",
              ".ytp-ad-simple-ad-badge",
              ".ytp-ad-text",
              ".ytp-ad-duration-remaining",
              ".ytp-ad-message-container",
            ]),
            i = Fd([t, a]),
            s = Boolean(e || t || a || Kd(i));
          return (
            t && jd(t, "youtube"),
            {
              ...n,
              adPlaying: s,
              adSkippable: Boolean(t),
              adReason: e
                ? "youtube-player-ad-class"
                : a
                  ? "youtube-ad-marker"
                  : t
                    ? "youtube-skip-button"
                    : Kd(i)
                      ? "youtube-ad-text"
                      : "",
              adSkipText: zd(
                t?.textContent || t?.getAttribute?.("aria-label") || "",
              ),
            }
          );
        }
        if ("twitch" === t) {
          const e = Hd([
              "[data-a-target='video-ad-label']",
              "[data-a-target='video-ad-countdown']",
              "[data-a-target='player-overlay-commercial-break']",
              "[data-a-target*='video-ad']",
              "[class*='commercial-break']",
              "[class*='video-ad']",
            ]),
            t = Hd([
              "[data-a-target='video-ad-skip-button']",
              "button[data-a-target*='skip']",
              "button[class*='skip']",
            ]),
            a = Fd([e, t]),
            i = Boolean(e || t || Kd(a));
          return (
            t && jd(t, "twitch"),
            {
              ...n,
              adPlaying: i,
              adSkippable: Boolean(t),
              adReason: e
                ? "twitch-ad-marker"
                : t
                  ? "twitch-skip-button"
                  : Kd(a)
                    ? "twitch-ad-text"
                    : "",
              adSkipText: zd(
                t?.textContent || t?.getAttribute?.("aria-label") || "",
              ),
            }
          );
        }
        return n;
      })(n);
    return {
      role: e,
      found: !0,
      currentTime: m,
      duration: y,
      ended: Boolean(n.ended),
      seeking: Boolean(n.seeking),
      readyState: Number(n.readyState) || 0,
      networkState: Number(n.networkState) || 0,
      isLiveStream: f,
      liveClassification: g?.status || (f ? "live" : "vod"),
      liveEvidence: g?.evidence || "platform-context",
      platform: nc(location.href),
      paused: Boolean(n.paused),
      muted: Boolean(n.muted),
      volume: Number.isFinite(Number(n.volume)) ? Number(n.volume) : null,
      playbackRate: Number(n.playbackRate) || 1,
      seekable: d > 0,
      seekableStartSeconds: h,
      rawSeekableStartSeconds: c,
      seekableEndSeconds: u,
      liveEdgeSeconds: S,
      mediaRemainingSeconds: b,
      actualDelaySeconds: v,
      ...M,
      wallTimeMs: a,
      mediaContextKey: s,
      observedMediaContextKey: i,
      canonicalMediaUrl: o,
      href: location.href,
    };
  }
  function Jd(e, t, n) {
    try {
      const a = e[t](n);
      return Number.isFinite(a) ? a : null;
    } catch {
      return null;
    }
  }
  function Yd() {
    const e = [
        ...document.querySelectorAll("video.html5-main-video"),
        ...document.querySelectorAll("video"),
      ],
      t = [...new Set(e)].filter((e) => e instanceof HTMLVideoElement);
    if (!t.length) return null;
    const n = t
      .map((e) => ({ video: e, score: Zd(e) }))
      .sort((e, t) => t.score - e.score)[0].video;
    return (function (e, t) {
      if (!e || e === t) return e === t;
      const n = Xd(e);
      if (!n.connected || !n.visible || n.ended || n.area < 16e3) return !1;
      const a = Xd(t);
      if (!a.connected || !a.visible || a.ended) return !0;
      if (a.inMainPlayer && !n.inMainPlayer) return !1;
      if (n.inMainPlayer && !a.inMainPlayer) return !0;
      if (n.readyState <= 0 && a.readyState >= 2) return !1;
      return !(a.area >= 1.6 * n.area && a.area - n.area >= 12e4);
    })(Xe, n)
      ? Xe
      : n;
  }
  function Xd(e) {
    if (!(e instanceof HTMLVideoElement))
      return {
        connected: !1,
        visible: !1,
        ended: !0,
        area: 0,
        inMainPlayer: !1,
        readyState: 0,
        paused: !0,
      };
    let t = !1,
      n = !1,
      a = 0,
      i = !1;
    try {
      ((t = document.contains(e)), (n = t && xc(e)));
      const s = e.getBoundingClientRect?.();
      ((a =
        Math.max(0, s?.width || e.clientWidth || 0) *
        Math.max(0, s?.height || e.clientHeight || 0)),
        (i = Boolean(
          e.matches?.("video.html5-main-video") && e.closest?.("#movie_player"),
        )));
    } catch {
      ((t = document.contains(e)),
        (a =
          Math.max(0, e.clientWidth || 0) * Math.max(0, e.clientHeight || 0)));
    }
    return {
      connected: t,
      visible: n,
      ended: Boolean(e.ended),
      area: a,
      inMainPlayer: i,
      readyState: vu(e.readyState) || 0,
      paused: Boolean(e.paused),
    };
  }
  function Zd(e) {
    const t = Xd(e);
    return (
      (t.visible ? 1e12 : 0) +
      (t.inMainPlayer ? 1e11 : 0) +
      (e.ended ? 0 : 1e10) +
      (e.paused ? 0 : 1e9) +
      1e6 * (e.readyState || 0) +
      t.area +
      (e === document.pictureInPictureElement ? 1e5 : 0)
    );
  }
  function ec() {
    const e = [
        ...new Set([
          ...document.querySelectorAll("video.html5-main-video"),
          ...document.querySelectorAll("video"),
        ]),
      ].filter((e) => e instanceof HTMLVideoElement),
      t = Yd(),
      n = vu(t?.currentTime);
    let a = !1;
    try {
      a = Boolean(t && xc(t));
    } catch {
      a = !1;
    }
    return {
      mediaTime: n,
      playbackRate:
        null === n ? null : t?.paused ? 0 : vu(t?.playbackRate) || 1,
      paused: Boolean(t?.paused),
      visible: a,
      candidateCount: e.length,
      source:
        null !== n && a
          ? "visible-video-current-time"
          : "estimated-viewer-clock",
    };
  }
  function tc() {
    return (
      "http:" === location.protocol ||
      "https:" === location.protocol ||
      /^https?:/i.test(location.href || "")
    );
  }
  function nc(e = "") {
    return ic(e)
      ? "youtube"
      : rc(e)
        ? "twitch"
        : lc(e)
          ? "instagram"
          : (function (e = "") {
                try {
                  const t = new URL(e, location.href);
                  return /(^|\.)missav\.ai$/i.test(t.hostname);
                } catch {
                  return !1;
                }
              })(e)
            ? "missav"
            : (function (e = "") {
                  try {
                    const t = new URL(e, location.href);
                    return /(^|\.)xvideos\.com$/i.test(t.hostname);
                  } catch {
                    return !1;
                  }
                })(e)
              ? "xvideos"
              : "html5";
  }
  function ac() {
    return ic(location.href);
  }
  function ic(e = "") {
    try {
      const t = new URL(e, location.href);
      return (
        /(^|\.)youtube\.com$/i.test(t.hostname) ||
        /(^|\.)youtu\.be$/i.test(t.hostname)
      );
    } catch {
      return !1;
    }
  }
  function sc() {
    return rc(location.href);
  }
  function rc(e = "") {
    try {
      const t = new URL(e, location.href);
      return /(^|\.)twitch\.tv$/i.test(t.hostname);
    } catch {
      return !1;
    }
  }
  function oc() {
    return lc(location.href);
  }
  function lc(e = "") {
    try {
      const t = new URL(e, location.href);
      return /(^|\.)instagram\.com$/i.test(t.hostname);
    } catch {
      return !1;
    }
  }
  function dc() {
    const e = Va(
        F.config?.sourceMediaContextKey ||
          F.config?.viewerMediaContextKey ||
          "",
      ),
      t = yc();
    if (e && t) {
      if (e === t) return !0;
      if (pc(e) && pc(t)) {
        const t = e.slice(8);
        return (t && ac() && location.replace(fc(t)), !1);
      }
    }
    if (uc(F.config?.pageUrl || "", location.href)) return !0;
    const n = bc(F.config?.pageUrl || "");
    return (n && ac() && location.replace(fc(n)), !1);
  }
  function cc() {
    if ("display" !== F.role || !F.sessionId) return !1;
    if (!F.sync.enabled && "instant-overlay" !== F.config?.captionMode)
      return !1;
    const e = ac() ? Sc() : "",
      t = e ? fc(e) : "",
      n = yc() || location.href;
    if (!n) return !1;
    const a = Date.now();
    if (
      F.sync.lastSourceFollowRequestKey === n &&
      a - (vu(F.sync.lastSourceFollowRequestAt) || 0) < 3e3
    )
      return !0;
    ((F.sync.lastSourceFollowRequestKey = n),
      (F.sync.lastSourceFollowRequestAt = a));
    const i = Qd("viewer", Yd());
    return (
      Ja("viewer.media_change.requested", {
        mediaContextKey: n,
        currentMediaTime: vu(i?.currentTime),
        singleTabMediaSync: Boolean(F.sync.singleTabMediaSync),
        pageUrl: String(location.href || "").slice(0, 180),
      }),
      chrome.runtime
        .sendMessage({
          type: "LIVE_SUBTITLE_VIEWER_MEDIA_CHANGED",
          sessionId: F.sessionId,
          href: location.href,
          canonicalHref: t,
          mediaContextKey: n,
          title: document.title || "",
          timing: i,
        })
        .then((e) => {
          const t = yc() || location.href,
            a = String(
              e?.targetKey ||
                gc(e?.config?.pageUrl || e?.sourceUrl || "") ||
                "",
            );
          e?.superseded
            ? Ja("viewer.media_change.response_superseded", {
                requestedMediaContextKey: n,
                currentMediaContextKey: t,
                responseMediaContextKey: a,
                supersededBy: String(e.supersededBy || ""),
                reason: String(e.reason || ""),
              })
            : e?.ok &&
              e.config &&
              (t !== n || (a && a !== n)
                ? Ja(
                    "viewer.media_change.response_stale",
                    {
                      requestedMediaContextKey: n,
                      currentMediaContextKey: t,
                      responseMediaContextKey: a,
                    },
                    "warn",
                  )
                : ((F.config = e.config),
                  Ja("viewer.media_change.response_applied", {
                    mediaContextKey: n,
                    switchEpoch: vu(e.switchEpoch),
                    unchanged: Boolean(e.unchanged),
                  })));
        })
        .catch(() => {}),
      !0
    );
  }
  function uc(e = "", t = "") {
    const n = mc(e),
      a = mc(t);
    if (n && a && n === a) return !0;
    const i = gc(e),
      s = gc(t);
    return i && s
      ? i === s
      : (function (e = "", t = "") {
          const n = bc(e),
            a = bc(t);
          return !(!n || !a) && n === a;
        })(e, t);
  }
  function mc(e = "") {
    try {
      const t = new URL(e, location.href),
        n = t.hostname.toLowerCase().replace(/^www\./, ""),
        a = t.pathname.replace(/\/+$/, "") || "/";
      return `${t.protocol.toLowerCase()}//${n}${a.toLowerCase()}${t.search}`;
    } catch {
      return "";
    }
  }
  function yc() {
    if (ac()) {
      const e = Sc();
      if (e) return `youtube:${e}`;
    }
    return gc(location.href) || "";
  }
  function pc(e = "") {
    return /^youtube:[A-Za-z0-9_-]{6,}$/i.test(String(e || "").trim());
  }
  function gc(e = "") {
    try {
      const t = new URL(e, location.href),
        n = t.hostname.toLowerCase();
      if (/(^|\.)youtube\.com$/i.test(n) || /(^|\.)youtu\.be$/i.test(n)) {
        const e = bc(t.href);
        if (e) return `youtube:${e}`;
        return (
          (function (e = "") {
            const t = String(e || "")
              .split("/")
              .filter(Boolean);
            if ("live" !== t[t.length - 1]?.toLowerCase()) return "";
            if (2 === t.length) {
              const e = String(t[0] || "")
                  .replace(/^@/, "")
                  .toLowerCase(),
                n = new Set([
                  "account",
                  "embed",
                  "feed",
                  "gaming",
                  "live",
                  "playlist",
                  "premium",
                  "results",
                  "shorts",
                  "upload",
                  "watch",
                ]);
              if (e && !n.has(e)) return `youtube-live-alias:handle:${e}`;
            }
            return 3 === t.length &&
              ["channel", "c", "user"].includes(
                String(t[0] || "").toLowerCase(),
              )
              ? `youtube-live-alias:${String(t[0]).toLowerCase()}:${String(t[1] || "").toLowerCase()}`
              : "";
          })(t.pathname) || ""
        );
      }
      if (/(^|\.)twitch\.tv$/i.test(n)) {
        const e = t.pathname.split("/").filter(Boolean);
        return "videos" === e[0] && e[1]
          ? `twitch:video:${e[1].toLowerCase()}`
          : "popout" === e[0] && e[1]
            ? `twitch:channel:${e[1].toLowerCase()}`
            : e[0] && !vc.has(e[0].toLowerCase())
              ? `twitch:channel:${e[0].toLowerCase()}`
              : "";
      }
      if (/(^|\.)instagram\.com$/i.test(n)) {
        const e = t.pathname.split("/").filter(Boolean);
        return e.length ? `instagram:${e.join("/").toLowerCase()}` : "";
      }
      if (/(^|\.)missav\.(?:ai|ws)$/i.test(n)) {
        const e = t.pathname.split("/").filter(Boolean);
        return e.length ? `missav:${e.join("/").toLowerCase()}` : "";
      }
      if (/(^|\.)xvideos\.com$/i.test(n)) {
        const e = t.pathname.split("/").filter(Boolean),
          n = String(e[0] || "").toLowerCase();
        return /^video(?:\.|\d)/i.test(n)
          ? `xvideos:${n}`
          : "embedframe" === n && e[1]
            ? `xvideos:embedframe:${String(e[1]).toLowerCase()}`
            : "";
      }
      return `${t.origin.toLowerCase()}${t.pathname.replace(/\/+$/, "").toLowerCase()}`;
    } catch {
      return "";
    }
  }
  function fc(e) {
    return `https://www.youtube.com/watch?v=${encodeURIComponent(e)}`;
  }
  function Sc() {
    if (!ac()) return "";
    const e = hc(bc(location.href));
    if (e) return e;
    const t = document.querySelector("ytd-watch-flexy[video-id]"),
      n = hc(t?.getAttribute?.("video-id"));
    if (n) return n;
    const a = hc(
      document.querySelector('meta[itemprop="videoId"]')?.content ||
        document
          .querySelector('meta[itemprop="videoId"]')
          ?.getAttribute?.("content"),
    );
    if (a) return a;
    for (const e of [
      'link[rel="canonical"]',
      'meta[property="og:url"]',
      'meta[name="twitter:url"]',
    ]) {
      const t = document.querySelector(e),
        n = hc(
          bc(
            t?.href ||
              t?.content ||
              t?.getAttribute?.("href") ||
              t?.getAttribute?.("content") ||
              "",
          ),
        );
      if (n) return n;
    }
    for (const e of document.querySelectorAll("script")) {
      const t = e.textContent || "";
      if (!t.includes("ytInitialPlayerResponse")) continue;
      const n = kc(t, "ytInitialPlayerResponse"),
        a = hc(n?.videoDetails?.videoId);
      if (a) return a;
    }
    return "";
  }
  function hc(e = "") {
    const t = String(e || "").trim();
    return /^[A-Za-z0-9_-]{6,64}$/.test(t) ? t : "";
  }
  function bc(e = "") {
    try {
      const t = new URL(e, location.href);
      if (/(^|\.)youtu\.be$/i.test(t.hostname))
        return t.pathname.split("/").filter(Boolean)[0] || "";
      if (!/(^|\.)youtube\.com$/i.test(t.hostname)) return "";
      if ("/watch" === t.pathname) return t.searchParams.get("v") || "";
      const n = t.pathname.split("/").filter(Boolean);
      if (["live", "shorts", "embed"].includes(n[0])) return n[1] || "";
    } catch {
      return "";
    }
    return "";
  }
  ((window.__aiLiveSubtitleMvp = {
    state: F,
    dispose: function () {
      (a?.stop(), (at += 1), (tt = null), (nt = ""));
      try {
        chrome.runtime.onMessage.removeListener(ct);
      } catch {}
      (ds(),
        bt(),
        Sr(),
        Rr(),
        Ur(),
        to(),
        md("content-script-disposed", Yd(), { log: !1 }),
        sl(),
        Wo("content-script-disposed", { log: !1, seekBack: !1 }),
        Or(),
        xn(),
        En(),
        Ka(),
        cs(),
        ks().catch(() => {}),
        Ts(),
        qe && ((qe = !1), window.removeEventListener("message", xt)),
        Ed().catch(() => {}),
        de?.isConnected && de.remove(),
        (F.mounted = !1));
    },
  }),
    chrome.runtime.onMessage.addListener(ct),
    qe || ((qe = !0), window.addEventListener("message", xt)),
    document.addEventListener("fullscreenchange", xu),
    document.addEventListener("webkitfullscreenchange", xu),
    chrome.runtime.sendMessage({ type: "CONTENT_READY" }).catch(() => {}));
  const vc = new Set([
    "directory",
    "downloads",
    "inventory",
    "jobs",
    "p",
    "products",
    "settings",
    "subscriptions",
    "team",
    "turbo",
  ]);
  function Mc(e = {}) {
    if (!0 !== e?.isLiveStream) return null;
    const t = vu(e.seekableStartSeconds),
      n = vu(e.liveEdgeSeconds ?? e.seekableEndSeconds);
    return null === t || null === n ? null : Math.max(0, n - t);
  }
  function wc(e = {}, t = null) {
    if (!0 !== e?.isLiveStream) return !1;
    const n = vu(t) ?? Mc(e);
    return null !== n && n >= Math.min(2, 2);
  }
  function Tc(e = null, t = {}) {
    if (!ac()) return { status: "unknown", evidence: "not-youtube" };
    const n = Date.now(),
      a = "unknown" === st.classification ? 250 : 2e3;
    if (st.href === location.href && n - st.checkedAt < a)
      return { status: st.classification, evidence: st.evidence };
    const i = (function (e = null) {
      if (e && e.duration === 1 / 0)
        return { status: "live", evidence: "video-duration-infinity" };
      const t = (function () {
        const e = Sc();
        if (!e) return null;
        for (const t of document.querySelectorAll("script")) {
          const n = t.textContent || "";
          if (!n.includes("ytInitialPlayerResponse")) continue;
          const a = kc(n, "ytInitialPlayerResponse");
          if (!a || String(a?.videoDetails?.videoId || "") !== e) continue;
          const i =
              a?.microformat?.playerMicroformatRenderer?.liveBroadcastDetails
                ?.isLiveNow,
            s = a?.videoDetails?.isLiveContent,
            r = String(a?.playabilityStatus?.status || "").toUpperCase();
          if (!0 === i) return !0;
          if (!1 !== i || !0 !== s || !r || "OK" === r) {
            if (!1 === i) return !1;
            if (!1 === s) return !1;
            if (!0 === s && a?.playabilityStatus?.liveStreamability) return !0;
          }
        }
        return null;
      })();
      if (null !== t)
        return {
          status: t ? "live" : "vod",
          evidence: "yt-initial-player-response",
        };
      const n = document.querySelector(".html5-video-player");
      if (n?.classList.contains("ytp-live"))
        return { status: "live", evidence: "ytp-live-class" };
      const a = document.querySelector(".ytp-live-badge");
      if (
        a &&
        xc(a) &&
        /live|直播|ライブ/i.test(
          a.textContent || a.getAttribute("aria-label") || "",
        )
      )
        return { status: "live", evidence: "visible-live-badge" };
      const i = document.querySelector(
        "#info, #info-contents, ytd-watch-metadata",
      );
      return /正在觀看|watching now|視聴中|人が視聴中|viewers/i.test(
        i?.textContent || "",
      )
        ? { status: "live", evidence: "watching-now-metadata" }
        : (function () {
              const e = Sc(),
                t = document.querySelectorAll("script");
              for (const n of t) {
                const t = n.textContent || "";
                if (
                  (!e ||
                    !t.includes('"videoId":') ||
                    t.includes(`"videoId":"${e}"`)) &&
                  (t.includes('"isLiveNow":true') ||
                    t.includes('\\"isLiveNow\\":true'))
                )
                  return !0;
              }
              return !1;
            })()
          ? { status: "live", evidence: "page-script-live-flag" }
          : { status: "unknown", evidence: "youtube-live-state-not-ready" };
    })(e, t);
    return (
      (st = {
        href: location.href,
        checkedAt: n,
        value: "live" === i.status,
        classification: i.status,
        evidence: i.evidence,
      }),
      i
    );
  }
  function kc(e = "", t = "") {
    const n = String(e || ""),
      a = String(t || "");
    if (!n || !a) return null;
    let i = n.indexOf(a);
    for (; i >= 0; ) {
      const e = n.indexOf("=", i + a.length);
      if (e < 0 || e - i > 80) return null;
      const t = n.indexOf("{", e + 1);
      if (t < 0 || t - e > 40) {
        i = n.indexOf(a, i + a.length);
        continue;
      }
      let s = 0,
        r = !1,
        o = !1;
      for (let e = t; e < n.length; e += 1) {
        const a = n[e];
        if (r) o ? (o = !1) : "\\" === a ? (o = !0) : '"' === a && (r = !1);
        else if ('"' === a) r = !0;
        else if ("{" === a) s += 1;
        else if ("}" === a && ((s -= 1), 0 === s))
          try {
            return JSON.parse(n.slice(t, e + 1));
          } catch {
            break;
          }
      }
      i = n.indexOf(a, i + a.length);
    }
    return null;
  }
  function xc(e) {
    if (!e.getClientRects().length) return !1;
    const t = window.getComputedStyle(e);
    return (
      "none" !== t.display &&
      "hidden" !== t.visibility &&
      Number(t.opacity || 1) > 0
    );
  }
  function Ac(e) {
    const t =
        F.sync.lockedDelaySeconds ??
        F.sync.targetDelaySeconds ??
        F.sync.fixedDelaySeconds,
      n = vu(F.sync.recommendedDelaySeconds),
      a = Pc(e),
      i = Pc(t);
    return Rc(n, t)
      ? `音軌對齊 ${a} / 固定 ${i} / ${F.sync.delayArmed ? "下次建議" : "建議"} ${Pc(n)}`
      : `音軌對齊 ${a} / 固定 ${i}`;
  }
  function Cc(e, t, n = null) {
    const a =
        F.sync.lockedDelaySeconds ??
        F.sync.targetDelaySeconds ??
        F.sync.fixedDelaySeconds,
      i = vu(F.sync.recommendedDelaySeconds),
      s = Pc(t),
      r = Pc(a),
      o = F.sync.sourcePreloadEnabled
        ? ` / 預載 ${du(F.sync.sourcePreloadRate)}`
        : "",
      l = vu(n?.requestedDelaySeconds),
      d = null !== l && l > a + E ? ` / 目標 ${Pc(l)}` : "";
    return Rc(i, a)
      ? `${e}：source 延遲 ${s} / 固定 ${r}${d}${o} / ${F.sync.delayArmed ? "下次建議" : "建議"} ${Pc(i)}`
      : `${e}：source 延遲 ${s} / 固定 ${r}${d}${o}`;
  }
  function Rc(e, t) {
    const n = vu(e),
      a = vu(t);
    return null !== n && null !== a && Math.abs(n - a) > E;
  }
  function Dc(e, t, n, a = null) {
    if (Lc()) return `${e}：已找到快取字幕，正在對齊目前畫面`;
    const i = vu(a?.requestedDelaySeconds);
    return a?.useReachableDelay && null !== i && i > n + E
      ? `${e}：正在努力產生字幕 ${Pc(t)} / ${Pc(n)}，目標 ${Pc(i)} 暫不可用`
      : `${e}：正在努力產生字幕 ${Pc(t)} / ${Pc(n)}`;
  }
  function Lc() {
    return Boolean(
      !0 === F.config?.hybridSubtitleCacheMode &&
        F.sync.mseStartupWaitActive &&
        !F.sync.mseStartupWaitReleased &&
        !F.sync.cachedSubtitleReplay?.active,
    );
  }
  function Bc(e = null) {
    const t = vu(e);
    ((F.sync.liveStartupClockStartedAtMs = 0),
      (F.sync.delayBuildProgressSeconds = 0),
      (F.sync.delayBuildTargetSeconds = null !== t ? Math.max(0, t) : null));
  }
  function Ec(e, t = null) {
    const n = vu(t);
    null !== n && (F.sync.delayBuildTargetSeconds = Math.max(0, n));
    const a = vu(F.sync.delayBuildTargetSeconds),
      i = Math.max(0, vu(e) ?? 0),
      s = Math.max(0, vu(F.sync.delayBuildProgressSeconds) ?? 0);
    let r = Math.max(s, i);
    return (
      null !== a && a > 0 && (r = Math.min(r, a)),
      (F.sync.delayBuildProgressSeconds = r),
      r
    );
  }
  function Pc(e) {
    const t = Number(e);
    return Number.isFinite(t) ? `${t.toFixed(t >= 10 ? 0 : 1)}s` : "-";
  }
  function Ic(e) {
    const t = vu(e);
    return null === t ? "--" : `${t > 0 ? "+" : ""}${t.toFixed(2)}s`;
  }
  function Uc() {
    ((F.sync.adaptiveSubtitleHold = !1),
      (F.sync.adaptiveSubtitleHoldStartedAt = 0),
      (F.sync.adaptiveSubtitleHoldTargetSeconds = null),
      (F.sync.adaptiveSubtitleHoldPendingKey = ""),
      (F.sync.adaptiveSubtitleHoldTimedOutKey = ""),
      (F.sync.lastSpeechActivityAt = 0),
      (F.sync.speechActivityStartedAt = 0),
      F.sync.delayBuffering &&
        F.sync.delayArmed &&
        ((F.sync.delayBuffering = !1),
        (F.sync.delayBufferStartedAt = 0),
        Bc()));
  }
  function _c(e, t) {
    const n = ku(e);
    if (!n) return "";
    const a = (function (e) {
      const t = c[e] || c.translation,
        n = ue?.clientWidth || F.layout.width || 720,
        a = ue?.clientHeight || F.layout.height || 132,
        i = Cu(n / 720, 0.75, 1.7),
        s = Cu((a - 30) / 102, 0.7, 1.8),
        r = Math.sqrt(i * s);
      return {
        maxChars: Math.max(24, Math.round(t.maxChars * r)),
        maxWords: Math.max(8, Math.round(t.maxWords * r)),
      };
    })(t);
    if (
      n.length <= a.maxChars &&
      (function (e) {
        return e.split(/\s+/).filter(Boolean).length;
      })(n) <= a.maxWords
    )
      return n;
    const i = (function (e, t) {
      const n = e.split(/\s+/).filter(Boolean);
      if (n.length > 1) {
        let e = n.slice(-t.maxWords);
        for (; e.length > 1 && e.join(" ").length > t.maxChars; )
          e = e.slice(1);
        return e.join(" ");
      }
      return Array.from(e).slice(-t.maxChars).join("");
    })(n, a);
    return i && i !== n ? `… ${i}` : i;
  }
  function qc(e = {}) {
    const t = Math.max(0, Math.ceil(bu(e.creditsUsed))),
      n = Math.max(0, bu(e.totalCostUSD)),
      a = Math.max(
        0,
        bu(e.sessionElapsedSeconds || e.elapsedSeconds || e.openSeconds),
      ),
      i = Math.max(0, bu(e.sttDurationSeconds || e.audioSeconds)),
      s = Math.max(
        i,
        bu(
          e.sttRawDurationSeconds ||
            e.rawSttDurationSeconds ||
            e.originalAudioSeconds,
        ),
      ),
      r = cu(e.sttAudioSpeed || e.audioSpeed),
      o = Math.max(
        0,
        bu(e.sttSpeedSavedAudioSeconds || e.audioSpeedSavedSeconds) ||
          Math.max(0, s - i),
      ),
      l = bu(e.capturedAudioSeconds || e.captureAudioSeconds),
      d = Math.max(s, i, l),
      c = Math.max(
        0,
        bu(e.vadSkippedAudioSeconds || e.vadSkippedSeconds) ||
          Math.max(0, d - s),
      ),
      u = Math.max(0, bu(e.sttCostUSD)),
      m = Math.max(0, Math.round(bu(e.contextResearchRequestCount))),
      y = Math.max(0, Math.round(bu(e.contextResearchInputTokens))),
      p = Math.max(0, Math.round(bu(e.contextResearchOutputTokens))),
      g = Math.max(y + p, Math.round(bu(e.contextResearchTotalTokens))),
      f = Math.max(0, bu(e.contextResearchCostUSD)),
      S = Math.max(0, Math.ceil(bu(e.contextResearchCreditsUsed))),
      h = Math.max(0, bu(e.llmCostUSD)),
      b = ku(e.llmBillingMode || "provider-usage"),
      v = Math.max(0, Math.round(bu(e.llmUserCreditsPerHour))),
      M = Math.max(0, bu(e.llmFixedUsageSeconds)),
      w = Boolean(e.llmUsageDetailsHidden || "fixed-time" === b),
      T = Math.max(0, Math.round(bu(e.totalTokens))),
      k = Math.max(0, Math.round(bu(e.inputTokens))),
      x = Math.max(0, Math.round(bu(e.outputTokens))),
      A = Math.max(0, Math.round(bu(e.thinkingTokens))),
      C = Math.max(0, Math.round(bu(e.visibleOutputTokens))) || (A ? 0 : x),
      R = Math.max(0, Math.round(bu(e.llmCallCount))),
      D = Math.max(0, Math.round(bu(e.llmFallbackCount || e.fallbackCount))),
      L = Math.max(0, bu(e.inputCostUSD)),
      B = Math.max(0, bu(e.outputCostUSD)),
      E = Math.max(0, bu(e.thinkingCostUSD)),
      P = Math.max(0, bu(e.visibleOutputCostUSD)) || (E ? 0 : B),
      I = Math.max(
        0,
        Math.round(bu(e.fallbackInputTokens || e.llmFallbackInputTokens)),
      ),
      U = Math.max(
        0,
        Math.round(bu(e.fallbackOutputTokens || e.llmFallbackOutputTokens)),
      ),
      _ = Math.max(
        0,
        Math.round(bu(e.fallbackThinkingTokens || e.llmFallbackThinkingTokens)),
      ),
      q =
        Math.max(
          0,
          Math.round(
            bu(
              e.fallbackVisibleOutputTokens || e.llmFallbackVisibleOutputTokens,
            ),
          ),
        ) || (_ ? 0 : U),
      O = Math.max(
        0,
        Math.round(bu(e.fallbackTotalTokens || e.llmFallbackTotalTokens)) ||
          I + U,
      ),
      V = Math.max(0, bu(e.fallbackCostUSD || e.llmFallbackCostUSD)),
      $ = Math.max(0, bu(e.fallbackInputCostUSD || e.llmFallbackInputCostUSD)),
      W = Math.max(
        0,
        bu(e.fallbackOutputCostUSD || e.llmFallbackOutputCostUSD),
      ),
      N = Math.max(
        0,
        bu(e.fallbackVisibleOutputCostUSD || e.llmFallbackVisibleOutputCostUSD),
      ),
      G = Math.max(
        0,
        bu(e.fallbackThinkingCostUSD || e.llmFallbackThinkingCostUSD),
      ),
      H = N || (G ? 0 : W),
      F = Math.max(
        0,
        Math.round(
          bu(
            e.deadlineRescueCount ||
              e.llmDeadlineRescueCount ||
              e.totalDeadlineRescueCount ||
              e.deltaDeadlineRescueCount,
          ),
        ),
      ),
      z = Math.max(
        0,
        bu(
          e.deadlineRescueCostUSD ||
            e.llmDeadlineRescueCostUSD ||
            e.totalDeadlineRescueCostUSD ||
            e.deltaDeadlineRescueCostUSD,
        ),
      ),
      K = Math.max(
        0,
        Math.round(
          bu(
            e.providerErrorRescueCount ||
              e.llmProviderErrorRescueCount ||
              e.totalProviderErrorRescueCount ||
              e.deltaProviderErrorRescueCount,
          ),
        ),
      ),
      j = Math.max(
        0,
        bu(
          e.providerErrorRescueCostUSD ||
            e.llmProviderErrorRescueCostUSD ||
            e.totalProviderErrorRescueCostUSD ||
            e.deltaProviderErrorRescueCostUSD,
        ),
      ),
      Q = Math.max(0, Math.round(bu(e.audioChunks))),
      J = (function (e = {}) {
        const t = Math.max(0, Math.round(bu(e.batchesSent || e.callsSent))),
          n = Math.max(
            0,
            Math.round(bu(e.segmentsSent || e.translatedSegments)),
          ),
          a = Math.max(0, Math.round(bu(e.estimatedCallsWithoutBatch))),
          i = Math.max(0, Math.round(bu(e.savedCalls || (a ? a - t : 0))));
        return {
          enabled: Boolean(e.enabled),
          queuedSegments: Math.max(0, Math.round(bu(e.queuedSegments))),
          pendingSegments: Math.max(0, Math.round(bu(e.pendingSegments))),
          batchesSent: t,
          segmentsSent: n,
          estimatedCallsWithoutBatch: a,
          savedCalls: i,
          averageSegmentsPerCall: Math.max(0, bu(e.averageSegmentsPerCall)),
          lastBatchSize: Math.max(0, Math.round(bu(e.lastBatchSize))),
          lastWaitMs: Math.max(0, Math.round(bu(e.lastWaitMs))),
          targetWaitMs: Math.max(0, Math.round(bu(e.targetWaitMs))),
          playbackSafeWaitMs: Math.max(0, Math.round(bu(e.playbackSafeWaitMs))),
          delaySeconds: Math.max(0, bu(e.delaySeconds)),
          maxSegments: Math.max(0, Math.round(bu(e.maxSegments))),
          maxChars: Math.max(0, Math.round(bu(e.maxChars))),
          latency: Hc(e.latency || e.pipelineLatency || {}),
        };
      })(e.finalBatch || e.batch || {}),
      Y = (function (e = {}) {
        return {
          finalTranscripts: Math.max(0, Math.round(bu(e.finalTranscripts))),
          finalTranscriptChars: Math.max(
            0,
            Math.round(bu(e.finalTranscriptChars)),
          ),
          translationRequests: Math.max(
            0,
            Math.round(bu(e.translationRequests)),
          ),
          translationResponses: Math.max(
            0,
            Math.round(bu(e.translationResponses)),
          ),
          translationErrors: Math.max(0, Math.round(bu(e.translationErrors))),
          emptyTranslations: Math.max(0, Math.round(bu(e.emptyTranslations))),
          emittedSegments: Math.max(0, Math.round(bu(e.emittedSegments))),
          pendingFinalMerges: Math.max(0, Math.round(bu(e.pendingFinalMerges))),
          translationRetries: Math.max(0, Math.round(bu(e.translationRetries))),
          fallbackDisplayedSegments: Math.max(
            0,
            Math.round(bu(e.fallbackDisplayedSegments)),
          ),
        };
      })(e.subtitlePipeline || e.pipelineStats || {}),
      X = Fc(e.latency || e.pipelineLatency || e),
      Z = Vc(e.liveChatUsage || e.chatUsage || e.liveChat || {}),
      ee = Vc(e.replyUsage || e.reply || {});
    return {
      creditsUsed: t,
      totalCostUSD: n,
      billingProtocol:
        "sql-wallet-v1" === e.billingProtocol ? "sql-wallet-v1" : "",
      billingSessionId: ku(e.billingSessionId || ""),
      billingRevision: Number.isSafeInteger(e.billingRevision)
        ? e.billingRevision
        : -1,
      fundingWallet: ku(e.fundingWallet || ""),
      passCreditsUsed: Math.max(0, bu(e.passCreditsUsed)),
      passCallCount: Math.max(0, bu(e.passCallCount)),
      passAudioSeconds: Math.max(0, bu(e.passAudioSeconds)),
      generalCreditsUsed: Math.max(0, bu(e.generalCreditsUsed)),
      economyCreditsUsed: Math.max(0, bu(e.economyCreditsUsed)),
      elapsedSeconds: a,
      sttDurationSeconds: i,
      sttRawDurationSeconds: s,
      sttAudioSpeed: r,
      localSttAudioSeconds: Math.max(0, bu(e.localSttAudioSeconds)),
      sttUsageSource:
        "local-reported" === e.sttUsageSource ? "local-reported" : "",
      sttSpeedSavedAudioSeconds: o,
      capturedAudioSeconds: d,
      vadSkippedAudioSeconds: c,
      vadSentRatio: d > 0 ? s / d : 1,
      vadEnabled: Boolean(e.vadEnabled),
      vadProvider: ku(e.vadProvider || ""),
      sttCostUSD: u,
      contextResearchRequestCount: m,
      contextResearchInputTokens: y,
      contextResearchOutputTokens: p,
      contextResearchTotalTokens: g,
      contextResearchCostUSD: f,
      contextResearchCreditsUsed: S,
      llmCostUSD: h,
      llmBillingMode: b,
      llmUserCreditsPerHour: v,
      llmFixedUsageSeconds: M,
      llmUsageDetailsHidden: w,
      totalTokens: T,
      inputTokens: k,
      outputTokens: x,
      visibleOutputTokens: C,
      thinkingTokens: A,
      llmCallCount: R,
      llmFallbackCount: D,
      inputCostUSD: L,
      outputCostUSD: B,
      visibleOutputCostUSD: P,
      thinkingCostUSD: E,
      fallbackInputTokens: I,
      fallbackOutputTokens: U,
      fallbackVisibleOutputTokens: q,
      fallbackThinkingTokens: _,
      fallbackTotalTokens: O,
      fallbackCostUSD: V,
      fallbackInputCostUSD: $,
      fallbackOutputCostUSD: W,
      fallbackVisibleOutputCostUSD: H,
      fallbackThinkingCostUSD: G,
      deadlineRescueCount: F,
      deadlineRescueCostUSD: z,
      providerErrorRescueCount: K,
      providerErrorRescueCostUSD: j,
      audioChunks: Q,
      batch: J,
      subtitlePipeline: Y,
      latency: X,
      liveChatUsage: Z,
      replyUsage: ee,
      provider: ku(e.provider || ""),
      providerName: ku(e.providerName || ""),
      source: ku(e.source || "local-estimate"),
      updatedAt: ku(e.updatedAt || ""),
    };
  }
  function Oc(e = null, t = {}) {
    const n = qc(t || {});
    if (!e) return n;
    const a = qc(e);
    if (
      a.billingSessionId &&
      n.billingSessionId &&
      a.billingSessionId !== n.billingSessionId
    )
      return n;
    if ("sql-wallet-v1" === n.billingProtocol)
      return "sql-wallet-v1" === a.billingProtocol &&
        a.billingSessionId === n.billingSessionId &&
        a.billingRevision > n.billingRevision
        ? a
        : n;
    if ("sql-wallet-v1" === a.billingProtocol) return a;
    const i = {
      ...n,
      creditsUsed: Math.max(a.creditsUsed, n.creditsUsed),
      totalCostUSD: Math.max(a.totalCostUSD, n.totalCostUSD),
      elapsedSeconds: Math.max(a.elapsedSeconds, n.elapsedSeconds),
      sttDurationSeconds: Math.max(a.sttDurationSeconds, n.sttDurationSeconds),
      sttRawDurationSeconds: Math.max(
        a.sttRawDurationSeconds,
        n.sttRawDurationSeconds,
      ),
      sttSpeedSavedAudioSeconds: Math.max(
        a.sttSpeedSavedAudioSeconds,
        n.sttSpeedSavedAudioSeconds,
      ),
      capturedAudioSeconds: Math.max(
        a.capturedAudioSeconds,
        n.capturedAudioSeconds,
      ),
      vadSkippedAudioSeconds: Math.max(
        a.vadSkippedAudioSeconds,
        n.vadSkippedAudioSeconds,
      ),
      sttCostUSD: Math.max(a.sttCostUSD, n.sttCostUSD),
      contextResearchRequestCount: Math.max(
        a.contextResearchRequestCount,
        n.contextResearchRequestCount,
      ),
      contextResearchInputTokens: Math.max(
        a.contextResearchInputTokens,
        n.contextResearchInputTokens,
      ),
      contextResearchOutputTokens: Math.max(
        a.contextResearchOutputTokens,
        n.contextResearchOutputTokens,
      ),
      contextResearchTotalTokens: Math.max(
        a.contextResearchTotalTokens,
        n.contextResearchTotalTokens,
      ),
      contextResearchCostUSD: Math.max(
        a.contextResearchCostUSD,
        n.contextResearchCostUSD,
      ),
      contextResearchCreditsUsed: Math.max(
        a.contextResearchCreditsUsed,
        n.contextResearchCreditsUsed,
      ),
      llmCostUSD: Math.max(a.llmCostUSD, n.llmCostUSD),
      llmBillingMode: n.llmBillingMode || a.llmBillingMode,
      llmUserCreditsPerHour: Math.max(
        a.llmUserCreditsPerHour,
        n.llmUserCreditsPerHour,
      ),
      llmFixedUsageSeconds: Math.max(
        a.llmFixedUsageSeconds,
        n.llmFixedUsageSeconds,
      ),
      llmUsageDetailsHidden: a.llmUsageDetailsHidden || n.llmUsageDetailsHidden,
      totalTokens: Math.max(a.totalTokens, n.totalTokens),
      inputTokens: Math.max(a.inputTokens, n.inputTokens),
      outputTokens: Math.max(a.outputTokens, n.outputTokens),
      visibleOutputTokens: Math.max(
        a.visibleOutputTokens,
        n.visibleOutputTokens,
      ),
      thinkingTokens: Math.max(a.thinkingTokens, n.thinkingTokens),
      llmCallCount: Math.max(a.llmCallCount, n.llmCallCount),
      llmFallbackCount: Math.max(a.llmFallbackCount, n.llmFallbackCount),
      inputCostUSD: Math.max(a.inputCostUSD, n.inputCostUSD),
      outputCostUSD: Math.max(a.outputCostUSD, n.outputCostUSD),
      visibleOutputCostUSD: Math.max(
        a.visibleOutputCostUSD,
        n.visibleOutputCostUSD,
      ),
      thinkingCostUSD: Math.max(a.thinkingCostUSD, n.thinkingCostUSD),
      fallbackInputTokens: Math.max(
        a.fallbackInputTokens,
        n.fallbackInputTokens,
      ),
      fallbackOutputTokens: Math.max(
        a.fallbackOutputTokens,
        n.fallbackOutputTokens,
      ),
      fallbackVisibleOutputTokens: Math.max(
        a.fallbackVisibleOutputTokens,
        n.fallbackVisibleOutputTokens,
      ),
      fallbackThinkingTokens: Math.max(
        a.fallbackThinkingTokens,
        n.fallbackThinkingTokens,
      ),
      fallbackTotalTokens: Math.max(
        a.fallbackTotalTokens,
        n.fallbackTotalTokens,
      ),
      fallbackCostUSD: Math.max(a.fallbackCostUSD, n.fallbackCostUSD),
      fallbackInputCostUSD: Math.max(
        a.fallbackInputCostUSD,
        n.fallbackInputCostUSD,
      ),
      fallbackOutputCostUSD: Math.max(
        a.fallbackOutputCostUSD,
        n.fallbackOutputCostUSD,
      ),
      fallbackVisibleOutputCostUSD: Math.max(
        a.fallbackVisibleOutputCostUSD,
        n.fallbackVisibleOutputCostUSD,
      ),
      fallbackThinkingCostUSD: Math.max(
        a.fallbackThinkingCostUSD,
        n.fallbackThinkingCostUSD,
      ),
      deadlineRescueCount: Math.max(
        a.deadlineRescueCount,
        n.deadlineRescueCount,
      ),
      deadlineRescueCostUSD: Math.max(
        a.deadlineRescueCostUSD,
        n.deadlineRescueCostUSD,
      ),
      providerErrorRescueCount: Math.max(
        a.providerErrorRescueCount,
        n.providerErrorRescueCount,
      ),
      providerErrorRescueCostUSD: Math.max(
        a.providerErrorRescueCostUSD,
        n.providerErrorRescueCostUSD,
      ),
      audioChunks: Math.max(a.audioChunks, n.audioChunks),
      vadEnabled: a.vadEnabled || n.vadEnabled,
      vadProvider: n.vadProvider || a.vadProvider,
      sttProvider: n.sttProvider || a.sttProvider,
      provider: n.provider || a.provider,
      providerName: n.providerName || a.providerName,
      source: n.source || a.source,
      updatedAt: n.updatedAt || a.updatedAt,
      latency: n.latency || a.latency,
      batch: Gc(a.batch, n.batch),
      subtitlePipeline: Gc(a.subtitlePipeline, n.subtitlePipeline),
      liveChatUsage: Nc(a.liveChatUsage, n.liveChatUsage),
      replyUsage: Nc(a.replyUsage, n.replyUsage),
    };
    return (
      (i.sttRawDurationSeconds = Math.max(
        i.sttRawDurationSeconds,
        i.sttDurationSeconds,
      )),
      (i.capturedAudioSeconds = Math.max(
        i.capturedAudioSeconds,
        i.sttRawDurationSeconds,
        i.sttDurationSeconds,
      )),
      (i.vadSentRatio =
        i.capturedAudioSeconds > 0
          ? i.sttRawDurationSeconds / i.capturedAudioSeconds
          : 1),
      (i.creditsUsed = Math.max(i.creditsUsed, uu(i.totalCostUSD))),
      qc(i)
    );
  }
  function Vc(e = {}) {
    const t = Math.max(0, Math.round(bu(e.inputTokens || e.deltaInputTokens))),
      n = Math.max(0, Math.round(bu(e.outputTokens || e.deltaOutputTokens))),
      a = Math.max(
        0,
        Math.round(bu(e.thinkingTokens || e.deltaThinkingTokens)),
      ),
      i =
        Math.max(
          0,
          Math.round(bu(e.visibleOutputTokens || e.deltaVisibleOutputTokens)),
        ) || (a ? 0 : n),
      s = Math.max(
        0,
        Math.round(bu(e.totalTokens || e.deltaTotalTokens)) || t + n,
      ),
      r = Math.max(0, bu(e.inputCostUSD || e.deltaInputCostUSD)),
      o = Math.max(0, bu(e.outputCostUSD || e.deltaOutputCostUSD)),
      l = Math.max(0, bu(e.thinkingCostUSD || e.deltaThinkingCostUSD)),
      d =
        Math.max(
          0,
          bu(e.visibleOutputCostUSD || e.deltaVisibleOutputCostUSD),
        ) || (l ? 0 : o),
      c = Math.max(
        0,
        bu(e.totalCostUSD || e.costUSD || e.deltaCostUSD) || r + o,
      );
    return {
      creditsUsed: Math.max(
        0,
        Math.ceil(bu(e.creditsUsed || e.credits) || uu(c)),
      ),
      totalCostUSD: c,
      totalTokens: s,
      inputTokens: t,
      outputTokens: n,
      visibleOutputTokens: i,
      thinkingTokens: a,
      llmCallCount: Math.max(
        0,
        Math.round(bu(e.llmCallCount || e.deltaCallCount)),
      ),
      llmFallbackCount: Math.max(
        0,
        Math.round(bu(e.llmFallbackCount || e.deltaFallbackCount)),
      ),
      inputCostUSD: r,
      outputCostUSD: o,
      visibleOutputCostUSD: d,
      thinkingCostUSD: l,
      itemCount: Math.max(0, Math.round(bu(e.itemCount))),
      updatedAt: ku(e.updatedAt || ""),
    };
  }
  function $c(e = {}) {
    return Vc({
      inputTokens: e.deltaInputTokens,
      outputTokens: e.deltaOutputTokens,
      visibleOutputTokens: e.deltaVisibleOutputTokens,
      thinkingTokens: e.deltaThinkingTokens,
      totalTokens: e.deltaTotalTokens,
      llmCallCount: e.deltaCallCount,
      llmFallbackCount: e.deltaFallbackCount,
      totalCostUSD: e.deltaCostUSD,
      inputCostUSD: e.deltaInputCostUSD,
      outputCostUSD: e.deltaOutputCostUSD,
      visibleOutputCostUSD: e.deltaVisibleOutputCostUSD,
      thinkingCostUSD: e.deltaThinkingCostUSD,
      itemCount: e.itemCount,
      updatedAt: new Date().toISOString(),
    });
  }
  function Wc(e = {}, t = {}) {
    const n = Vc(e),
      a = Vc(t);
    return Vc({
      creditsUsed: n.creditsUsed + a.creditsUsed,
      totalCostUSD: Bs(n.totalCostUSD + a.totalCostUSD),
      totalTokens: n.totalTokens + a.totalTokens,
      inputTokens: n.inputTokens + a.inputTokens,
      outputTokens: n.outputTokens + a.outputTokens,
      visibleOutputTokens: n.visibleOutputTokens + a.visibleOutputTokens,
      thinkingTokens: n.thinkingTokens + a.thinkingTokens,
      llmCallCount: n.llmCallCount + a.llmCallCount,
      llmFallbackCount: n.llmFallbackCount + a.llmFallbackCount,
      inputCostUSD: Bs(n.inputCostUSD + a.inputCostUSD),
      outputCostUSD: Bs(n.outputCostUSD + a.outputCostUSD),
      visibleOutputCostUSD: Bs(n.visibleOutputCostUSD + a.visibleOutputCostUSD),
      thinkingCostUSD: Bs(n.thinkingCostUSD + a.thinkingCostUSD),
      itemCount: n.itemCount + a.itemCount,
      updatedAt: a.updatedAt || n.updatedAt,
    });
  }
  function Nc(e = {}, t = {}) {
    const n = Vc(e),
      a = Vc(t);
    return Vc({
      creditsUsed: Math.max(n.creditsUsed, a.creditsUsed),
      totalCostUSD: Math.max(n.totalCostUSD, a.totalCostUSD),
      totalTokens: Math.max(n.totalTokens, a.totalTokens),
      inputTokens: Math.max(n.inputTokens, a.inputTokens),
      outputTokens: Math.max(n.outputTokens, a.outputTokens),
      visibleOutputTokens: Math.max(
        n.visibleOutputTokens,
        a.visibleOutputTokens,
      ),
      thinkingTokens: Math.max(n.thinkingTokens, a.thinkingTokens),
      llmCallCount: Math.max(n.llmCallCount, a.llmCallCount),
      llmFallbackCount: Math.max(n.llmFallbackCount, a.llmFallbackCount),
      inputCostUSD: Math.max(n.inputCostUSD, a.inputCostUSD),
      outputCostUSD: Math.max(n.outputCostUSD, a.outputCostUSD),
      visibleOutputCostUSD: Math.max(
        n.visibleOutputCostUSD,
        a.visibleOutputCostUSD,
      ),
      thinkingCostUSD: Math.max(n.thinkingCostUSD, a.thinkingCostUSD),
      itemCount: Math.max(n.itemCount, a.itemCount),
      updatedAt: a.updatedAt || n.updatedAt,
    });
  }
  function Gc(e = {}, t = {}) {
    const n = { ...(e || {}), ...(t || {}) };
    for (const a of new Set([
      ...Object.keys(e || {}),
      ...Object.keys(t || {}),
    ])) {
      const i = vu(e?.[a]),
        s = vu(t?.[a]);
      (null === i && null === s) || (n[a] = Math.max(i || 0, s || 0));
    }
    return n;
  }
  function Hc(e = {}) {
    return {
      source: ku(e.source || ""),
      sampleCount: Math.max(0, Math.round(bu(e.sampleCount))),
      p95Seconds: vu(e.p95Seconds),
      p99Seconds: vu(e.p99Seconds),
    };
  }
  function Fc(e = {}) {
    if (!e || "object" != typeof e) return null;
    const t = zc(e, ["totalMs", "pipelineLatencyMs", "latencyMs"]),
      n = zc(e, ["sttMs", "sttLatencyMs"]),
      a = zc(e, ["sttFromAudioEndMs"]),
      i = zc(e, ["queueMs", "translationQueueMs"]),
      s = zc(e, ["llmMs", "translationLatencyMs"]);
    return null === t && null === n && null === s
      ? null
      : {
          totalMs: t,
          sttMs: n,
          sttFromAudioEndMs: a,
          queueMs: i,
          llmMs: s,
          updatedAt: Date.now(),
        };
  }
  function zc(e, t) {
    for (const n of t) {
      const t = vu(e[n]);
      if (null !== t) return Math.max(0, Math.round(t));
      if (n.endsWith("Ms")) {
        const t = vu(e[n.replace(/Ms$/, "Seconds")]);
        if (null !== t) return Math.max(0, Math.round(1e3 * t));
      }
    }
    return null;
  }
  function Kc() { return a?.summary() || "Textamisu 額度讀取中"; }

  function jc(e = {}) {
    e = e || {};
    return [Kc(), "音訊：" + fu(e.sttDurationSeconds || 0), "延遲：" + ru(F.latency || e.latency)].join("\n");
  }

  function Qc(e) {
    if (!me.usagePanel || !me.usageFields) return;
    if (!a && globalThis.SubruuCaptionBalance) a = SubruuCaptionBalance.createMonitor();
    a?.update({ root: ce, config: F.config || {}, sessionId: F.sessionId, active: F.mounted && "display" === F.role });
    const usage = e || qc();
    globalThis.SubruuCaptionBalance?.renderMetrics(me.usagePanel, me.usageFields, {
      elapsed: fu(usage.elapsedSeconds), stt: fu(usage.sttDurationSeconds),
      vad: usage.vadEnabled ? "省 " + fu(usage.vadSkippedAudioSeconds) + "／送 " + hu(usage.vadSentRatio) : "off",
      batch: au(usage.batch || {}), pipeline: iu(usage.subtitlePipeline || {}), subtitleBuffer: eu(),
      latency: ru(F.latency || usage.latency), sync: wa(), provider: "Textamisu", source: "Textamisu API",
    });
  }

  function Jc(e, t) {
    if ("fixed-time" !== e.llmBillingMode)
      return `${gu(e.totalTokens)} tokens / ${gu(e.llmCallCount)} calls / ${mu(e.llmCostUSD)} / ${gu(t)} credits`;
    const n = Math.max(0, Math.round(bu(e.llmUserCreditsPerHour))) || 3e3;
    return `${fu(e.llmFixedUsageSeconds)} / ${gu(n)} credits/hr / ${gu(t)} credits`;
  }
  function Yc() {
    const e = F.config || {},
      t = e.auth || {},
      n = t.claims || {},
      a = { ...(t.features || {}), ...(n.features || {}) },
      i = String(e.role || t.role || n.role || "")
        .toLowerCase()
        .trim();
    return Boolean(
      !0 === e.developerUi ||
        !0 === e.devMode ||
        !0 === e.debugOverlay ||
        !0 === t.developerUi ||
        !0 === a.developerUi ||
        !0 === a.devUi ||
        ["admin", "developer", "dev", "tester"].includes(i),
    );
  }
  function Xc(e = Fn()) {
    const t = e,
      n = F.activeSegment ? 1 : 0,
      a = Array.isArray(F.segmentQueue) ? F.segmentQueue.length : 0,
      i = !ku(F.currentTranslation) || n || a ? 0 : 1,
      s = Math.max(i, n + a),
      r = (function (e = Fn()) {
        const t = vu(e) ?? 0;
        if (t <= 0) return 0;
        const n =
          vu(F.sync.lockedDelaySeconds) ??
          vu(F.sync.targetDelaySeconds) ??
          vu(F.sync.fixedDelaySeconds) ??
          6;
        return Cu(1 * t, 1, Math.max(1, n - 0.5));
      })(t),
      o = (function (e = 0) {
        const t = Da([
            ...(F.activeSegment ? [F.activeSegment] : []),
            ...(Array.isArray(F.segmentQueue) ? F.segmentQueue : []),
          ]),
          n = t
            .map((e, n) => {
              const a = Aa(e);
              if (null === a) return null;
              const i = Zc(e, Aa(t[n + 1]));
              return null !== i && i > a
                ? { segment: e, start: a, end: i }
                : null;
            })
            .filter(Boolean);
        if (!n.length)
          return {
            bufferSeconds: 0,
            frontierMediaTime: null,
            playbackMediaTime: td(),
            contiguousReadySegments: 0,
            hasTimedCoverage: !1,
            gapSeconds: null,
          };
        const a = td() ?? Aa(F.activeSegment) ?? n[0].start;
        let i = a,
          s = 0,
          r = null;
        for (const t of n) {
          if (t.end <= a + 0.01) continue;
          const n = t.start - i;
          if (n > 1.25) {
            r = n;
            break;
          }
          if (((i = Math.max(i, t.end)), (s += 1), e > 0 && i - a >= e)) break;
        }
        return {
          bufferSeconds: Math.max(0, i - a),
          frontierMediaTime: i,
          playbackMediaTime: a,
          contiguousReadySegments: s,
          hasTimedCoverage: !0,
          gapSeconds: r,
        };
      })(r);
    return {
      target: t,
      targetSeconds: r,
      ready: s,
      active: n,
      queued: a,
      unplayed: a,
      contiguousReadySegments: o.contiguousReadySegments,
      bufferSeconds: o.bufferSeconds,
      frontierMediaTime: o.frontierMediaTime,
      playbackMediaTime: o.playbackMediaTime,
      hasTimedCoverage: o.hasTimedCoverage,
      gapSeconds: o.gapSeconds,
      workInFlight: On(t),
      recentSpeech: qn(t),
      latencyPercentiles: F.sync.latencyPercentiles || Td([], "required"),
    };
  }
  function Zc(e, t = null) {
    const n = Aa(e);
    if (null === n) return null;
    const a = Ca(e);
    return null !== a && a > n
      ? a
      : null !== t && t > n
        ? t
        : n +
          (function (e) {
            return Cu(ta(e) / 1e3, 1, 6.5);
          })(e);
  }
  function eu() {
    const e = Xc(),
      t = (function (e = F.sync.latencyPercentiles) {
        if (!e || !e.sampleCount) return "";
        const t = vu(e.p95Seconds),
          n = vu(e.p99Seconds);
        return null === t || null === n
          ? ""
          : `${e.source || "latency"} p95 ${Pc(t)} / p99 ${Pc(n)} / n ${gu(e.sampleCount)}`;
      })(e.latencyPercentiles),
      n = [
        `未播 ${gu(e.unplayed)} 段`,
        `ready ${gu(e.ready)}/${gu(e.target)}`,
        e.hasTimedCoverage
          ? `buffer ${Pc(e.bufferSeconds)}/${Pc(e.targetSeconds)}`
          : "buffer 無時間碼",
        `播放中 ${gu(e.active)}`,
      ];
    return (
      e.hasTimedCoverage &&
        (n.push(`frontier ${Pc(e.frontierMediaTime ?? 0)}`),
        null !== e.gapSeconds && n.push(`gap ${Pc(e.gapSeconds)}`)),
      t && n.push(t),
      e.workInFlight && n.push(e.recentSpeech ? "語音處理中" : "翻譯處理中"),
      n.join(" / ")
    );
  }
  function tu(e = {}) {
    const t = Vc(e.liveChatUsage || {}),
      n = Vc(e.replyUsage || {}),
      a = t.creditsUsed + n.creditsUsed,
      i = t.totalCostUSD + n.totalCostUSD,
      s = t.totalTokens + n.totalTokens,
      r = t.inputTokens + n.inputTokens,
      o = t.outputTokens + n.outputTokens,
      l = t.visibleOutputTokens + n.visibleOutputTokens,
      d = t.thinkingTokens + n.thinkingTokens,
      c = t.llmCallCount + n.llmCallCount,
      u = t.llmFallbackCount + n.llmFallbackCount,
      m = t.inputCostUSD + n.inputCostUSD,
      y = t.outputCostUSD + n.outputCostUSD,
      p = t.visibleOutputCostUSD + n.visibleOutputCostUSD,
      g = t.thinkingCostUSD + n.thinkingCostUSD;
    return {
      subtitle: {
        creditsUsed: Math.max(0, e.creditsUsed - a),
        totalCostUSD: Math.max(0, e.totalCostUSD - i),
        totalTokens: Math.max(0, e.totalTokens - s),
        inputTokens: Math.max(0, e.inputTokens - r),
        outputTokens: Math.max(0, e.outputTokens - o),
        visibleOutputTokens: Math.max(0, e.visibleOutputTokens - l),
        thinkingTokens: Math.max(0, e.thinkingTokens - d),
        llmCallCount: Math.max(0, e.llmCallCount - c),
        llmFallbackCount: Math.max(0, e.llmFallbackCount - u),
        inputCostUSD: Math.max(0, e.inputCostUSD - m),
        outputCostUSD: Math.max(0, e.outputCostUSD - y),
        visibleOutputCostUSD: Math.max(0, e.visibleOutputCostUSD - p),
        thinkingCostUSD: Math.max(0, e.thinkingCostUSD - g),
        itemCount: 0,
      },
      liveChat: t,
      reply: n,
    };
  }
  function nu(e = {}) {
    const t = [`${gu(e.creditsUsed)} credits`, mu(e.totalCostUSD)];
    return (
      e.totalTokens && t.push(`${gu(e.totalTokens)} tokens`),
      e.llmCallCount && t.push(`${gu(e.llmCallCount)} calls`),
      e.itemCount && t.push(`${gu(e.itemCount)} 則`),
      t.join(" / ")
    );
  }
  function au(e = {}) {
    if (!e.enabled && !e.queuedSegments && !e.segmentsSent) return "off";
    const t =
        e.averageSegmentsPerCall > 0
          ? ` / avg ${e.averageSegmentsPerCall.toFixed(1)}`
          : "",
      n = e.pendingSegments > 0 ? ` / pending ${gu(e.pendingSegments)}` : "",
      a = e.targetWaitMs > 0 ? ` / window ${su(e.targetWaitMs)}` : "",
      i = e.lastWaitMs > 0 ? ` / wait ${su(e.lastWaitMs)}` : "",
      s = e.latency?.sampleCount
        ? ` / ${e.latency.source || "latency"} p95 ${Pc(e.latency.p95Seconds)} p99 ${Pc(e.latency.p99Seconds)}`
        : "";
    return `${gu(e.segmentsSent)} seg / ${gu(e.batchesSent)} calls / saved ${gu(e.savedCalls)}${t}${n}${a}${i}${s}`;
  }
  function iu(e = {}) {
    const t = F.subtitleDisplayStats || {},
      n = Math.max(0, Math.round(Number(e.finalTranscripts) || 0)),
      a = Math.max(0, Math.round(Number(e.translationRequests) || 0)),
      i = Math.max(0, Math.round(Number(e.translationResponses) || 0)),
      s = Math.max(0, Math.round(Number(e.emittedSegments) || 0)),
      r = Math.max(0, Math.round(Number(e.translationErrors) || 0)),
      o = Math.max(0, Math.round(Number(e.emptyTranslations) || 0)),
      l = Math.max(0, Math.round(Number(e.pendingFinalMerges) || 0)),
      d = Math.max(0, Math.round(Number(e.translationRetries) || 0)),
      c = Math.max(0, Math.round(Number(e.fallbackDisplayedSegments) || 0)),
      u = Math.max(0, Math.round(Number(t.displayedSegments) || 0)),
      m = Math.max(0, Math.round(Number(t.queuedSegments) || 0)),
      y = Math.max(0, Math.round(Number(t.duplicateSegments) || 0)),
      p = Math.max(0, Math.round(Number(t.droppedSegments) || 0)),
      g = Math.max(0, Math.round(Number(t.receivedResponses) || 0)),
      f = Math.max(0, Math.round(Number(t.translationErrors) || 0));
    if (
      !(n || a || i || s || r || o || l || d || c || u || m || y || p || g || f)
    )
      return "等待樣本";
    const S = [
      `STT ${gu(n)}`,
      `LLM ${gu(i)}/${gu(a)}`,
      `seg ${gu(s)}`,
      `UI ${gu(u)}/${gu(Math.max(m, g))}`,
    ];
    return (
      l && S.push(`merge ${gu(l)}`),
      d && S.push(`retry ${gu(d)}`),
      c && S.push(`fallback ${gu(c)}`),
      y && S.push(`dup ${gu(y)}`),
      p && S.push(`drop ${gu(p)}`),
      r && S.push(`err ${gu(r)}`),
      o && S.push(`empty ${gu(o)}`),
      f && f !== r && S.push(`UI err ${gu(f)}`),
      S.join(" / ")
    );
  }
  function su(e) {
    const t = Math.max(0, Number(e) || 0);
    return t < 1e3 ? `${Math.round(t)}ms` : `${(t / 1e3).toFixed(1)}s`;
  }
  function ru(e = null) {
    if (!e) return F.sync.enabled ? wa() : "等待樣本";
    const t = [],
      n = vu(e.totalMs),
      a = vu(e.sttMs),
      i = vu(e.llmMs),
      s = vu(e.queueMs),
      r = vu(e.sttFromAudioEndMs);
    return (
      null !== n && t.push(`total ${Su(n / 1e3)}`),
      null !== a && t.push(`STT ${Su(a / 1e3)}`),
      null !== i && t.push(`LLM ${Su(i / 1e3)}`),
      null !== s && s >= 100 && t.push(`queue ${Su(s / 1e3)}`),
      null !== r && t.push(`STT-end ${Su(r / 1e3)}`),
      t.join(" / ") || "等待樣本"
    );
  }
  function ou(e) {
    if ("local-reported" === e.sttUsageSource)
      return `${fu(e.localSttAudioSeconds)} 本機${e.sttDurationSeconds > 0 ? ` / 雲端 ${fu(e.sttDurationSeconds)}` : ""}`;
    const t = fu(e.sttDurationSeconds);
    return !e.sttAudioSpeed || e.sttAudioSpeed <= 1
      ? t
      : `${t} billed / raw ${fu(e.sttRawDurationSeconds)} / ${du(e.sttAudioSpeed)} / 省 ${fu(e.sttSpeedSavedAudioSeconds)}`;
  }
  function lu(e) {
    return !e.sttAudioSpeed || e.sttAudioSpeed <= 1
      ? "off"
      : `${du(e.sttAudioSpeed)}，raw ${fu(e.sttRawDurationSeconds)} → billed ${fu(e.sttDurationSeconds)}，省 ${fu(e.sttSpeedSavedAudioSeconds)}`;
  }
  function du(e) {
    const t = cu(e);
    return `${t.toFixed(t % 1 == 0 ? 0 : 1)}x`;
  }
  function cu(e) {
    const t = Number(e);
    return 1.5 === t || 2 === t ? t : 1;
  }
  function uu(e) {
    const t = Math.max(0, Number(e) || 0);
    return t > 0 ? Math.ceil(1e5 * t) : 0;
  }
  function mu(e) {
    const t = Math.max(0, Number(e) || 0);
    return t > 0 ? `$${t.toFixed(6)}` : "$0";
  }
  function yu(e) {
    return e.providerName || e.provider || "-";
  }
  function pu(e) {
    const t = new Date(e);
    return Number.isNaN(t.getTime())
      ? ""
      : t.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
  }
  function gu(e) {
    return Math.max(0, Math.round(Number(e) || 0)).toLocaleString();
  }
  function fu(e) {
    const t = Math.max(0, Math.round(Number(e) || 0)),
      n = Math.floor(t / 60),
      a = t % 60;
    return n ? `${n}m ${String(a).padStart(2, "0")}s` : `${a}s`;
  }
  function Su(e) {
    const t = Math.max(0, Number(e) || 0);
    return t < 1
      ? `${Math.round(1e3 * t)}ms`
      : t < 10
        ? `${t.toFixed(1)}s`
        : fu(t);
  }
  function hu(e) {
    const t = Math.min(100, Math.max(0, 100 * Number(e) || 0));
    return `${Math.round(t)}%`;
  }
  function bu(e) {
    const t = Number(e);
    return Number.isFinite(t) ? t : 0;
  }
  function vu(e) {
    if (null == e || "" === e) return null;
    const t = Number(e);
    return Number.isFinite(t) ? t : null;
  }
  let Mu = 0,
    wu = "",
    Tu = null;
  function ku(e) {
    return String(e || "")
      .replace(/\s+/g, " ")
      .trim();
  }
  function xu() {
    de && Au().appendChild(de);
  }
  function Au() {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.documentElement
    );
  }
  function Cu(e, t, n) {
    return Math.min(Math.max(e, t), n);
  }
})();
