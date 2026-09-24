const e = "wss://disabled.invalid/managed-stt",
  t = "managed-realtime",
  n = "managed-batch",
  a = "/caption-stt-token",
  r = "/caption-stt",
  i = new Set([
    "sttPrompt",
    "sttKeywords",
    "translationKeywords",
    "translationContext",
    "sttLanguageMode",
    "sourceLanguageHints",
  ]),
  o = 2800,
  s = 8,
  l = 16384,
  c = 65536,
  d = 992,
  u = 80,
  m = 50,
  g = 2e3,
  p = 1200,
  f = "/caption-stt-context/research",
  h = 45e3,
  S = "/caption-stt-context/review",
  M = 15e3,
  v = 80,
  y = "/caption-live-stt",
  b = "/live-caption-integrated",
  T = "https://textamisu.com/api/agent/v1",
  w = 0.55,
  k = 0.5,
  C = 80,
  A = 300,
  R = 750,
  x = 4e3,
  E = 1e4,
  P = 1e4,
  D = 2500,
  I = 2e3,
  L = 3500,
  _ = 1e4,
  B = 2e4,
  U = 2,
  q = 5e3,
  F = 1e4,
  O = 160,
  N = 240,
  H = 800,
  G = 20,
  W = 5e3,
  $ = 3,
  V = 4e3,
  j = 1,
  K = 8e3,
  z = 5e3,
  Q = 50,
  J = 1500,
  X = [0, 250, 750],
  Z = "st-d",
  Y = "st-a",
  ee = "st-b",
  te = "st-i",
  ne = "st-c",
  ae = "st-j",
  re = "st-k",
  ie = "st-l",
  oe = "st-m",
  se = "st-disabled",
  le = "st-e",
  ce = "st-h",
  de = le,
  ue = "st-f",
  me = "st-g",
  ge = "managed-live",
  pe = "/caption-live-translate",
  fe = "/caption-direct-stt-ticket",
  he = 15e3,
  Se = "lt-k",
  Me = "lt-h",
  ve = "/caption-direct-translate-ticket",
  ye = 8e3,
  be = 8e3,
  Te = 2500,
  we = 3e4,
  ke = 75e3,
  Ce = 750,
  Ae = 15e3,
  Re = 5e3,
  xe = 15e3,
  Ee = 2e4,
  Pe = 750,
  De = 15e3,
  Ie = "managed-live",
  Le = !1,
  _e = {
    "lt-a": "lt-a",
    "lt-b": "lt-b",
    "lt-c": "lt-c",
    "lt-d": "lt-d",
    "lt-j": "lt-j",
    "lt-m": "textGatewayA-gpt-5.6-luna",
    "lt-e": "lt-e",
    "lt-f": "lt-f",
    "lt-g": "lt-g",
    "lt-h": "lt-h",
    "lt-i": "lt-i",
    "lt-k": Se,
    "lt-l": "lt-l",
    "lt-n": "lt-n",
  },
  Be = {
    "st-a": Y,
    "st-b": ee,
    "st-i": te,
    "st-j": ae,
    "st-c": ne,
    "st-d": Z,
    "st-e": de,
    "st-f": ue,
    "st-g": me,
    "st-h": ce,
    "st-k": re,
    "st-l": ie,
    "st-m": oe,
  },
  Ue = {
    zh: "zho",
    cmn: "zho",
    en: "eng",
    ja: "jpn",
    ko: "kor",
    es: "spa",
    fr: "fra",
    de: "deu",
    hi: "hin",
    ar: "ara",
    pt: "por",
    ru: "rus",
    bn: "ben",
    id: "ind",
    vi: "vie",
    hy: "hye",
    as: "asm",
    az: "aze",
    be: "bel",
    bs: "bos",
    bg: "bul",
    my: "mya",
    ca: "cat",
    hr: "hrv",
    cs: "ces",
    da: "dan",
    nl: "nld",
    et: "est",
    fi: "fin",
    ka: "kat",
    el: "ell",
    gu: "guj",
    he: "heb",
    hu: "hun",
    is: "isl",
    ga: "gle",
    it: "ita",
    kn: "kan",
    kk: "kaz",
    km: "khm",
    ky: "kir",
    ku: "kur",
    lo: "lao",
    lv: "lav",
    lt: "lit",
    mk: "mkd",
    ms: "msa",
    ml: "mal",
    mt: "mlt",
    mi: "mri",
    mr: "mar",
    mn: "mon",
    ne: "nep",
    no: "nor",
    or: "ori",
    ps: "pus",
    fa: "fas",
    pl: "pol",
    pa: "pan",
    ro: "ron",
    sr: "srp",
    sd: "snd",
    sk: "slk",
    sl: "slv",
    so: "som",
    sw: "swa",
    sv: "swe",
    ta: "tam",
    tg: "tgk",
    te: "tel",
    th: "tha",
    tr: "tur",
    uk: "ukr",
    ur: "urd",
    uz: "uzb",
    cy: "cym",
    wo: "wol",
    xh: "xho",
    yo: "yor",
    zu: "zul",
    af: "afr",
    am: "amh",
    ha: "hau",
    ig: "ibo",
  },
  qe = new Set([
    "afr",
    "amh",
    "ara",
    "hye",
    "asm",
    "ast",
    "aze",
    "bel",
    "ben",
    "bos",
    "bul",
    "mya",
    "yue",
    "cat",
    "ceb",
    "nya",
    "hrv",
    "ces",
    "dan",
    "nld",
    "eng",
    "est",
    "fil",
    "fin",
    "fra",
    "ful",
    "glg",
    "lug",
    "kat",
    "deu",
    "ell",
    "guj",
    "hau",
    "heb",
    "hin",
    "hun",
    "isl",
    "ibo",
    "ind",
    "gle",
    "ita",
    "jpn",
    "jav",
    "kea",
    "kan",
    "kaz",
    "khm",
    "kor",
    "kur",
    "kir",
    "lao",
    "lav",
    "lin",
    "lit",
    "luo",
    "ltz",
    "mkd",
    "msa",
    "mal",
    "mlt",
    "zho",
    "mri",
    "mar",
    "mon",
    "nep",
    "nso",
    "nor",
    "oci",
    "ori",
    "pus",
    "fas",
    "pol",
    "por",
    "pan",
    "ron",
    "rus",
    "srp",
    "sna",
    "snd",
    "slk",
    "slv",
    "som",
    "spa",
    "swa",
    "swe",
    "tam",
    "tgk",
    "tel",
    "tha",
    "tur",
    "ukr",
    "umb",
    "urd",
    "uzb",
    "vie",
    "cym",
    "wol",
    "xho",
    "yor",
    "zul",
  ]),
  Fe = new Set([
    "eng",
    "spa",
    "fra",
    "ita",
    "por",
    "nld",
    "deu",
    "tur",
    "rus",
    "ara",
    "hin",
    "jpn",
    "kor",
    "vie",
    "ukr",
    "pol",
    "swe",
    "ces",
    "nor",
    "dan",
    "bul",
    "fin",
    "hrv",
    "slk",
    "zho",
    "hun",
    "ron",
    "est",
  ]),
  Oe = new Set([
    "zho",
    "eng",
    "yue",
    "ara",
    "deu",
    "fra",
    "spa",
    "por",
    "ind",
    "ita",
    "kor",
    "rus",
    "tha",
    "vie",
    "jpn",
    "tur",
    "hin",
    "msa",
    "nld",
    "swe",
    "dan",
    "fin",
    "pol",
    "ces",
    "fil",
    "fas",
    "ell",
    "hun",
    "mkd",
    "ron",
  ]),
  Ne = Object.freeze({
    afr: "af",
    amh: "am",
    ara: "ar",
    hye: "hy",
    asm: "as",
    aze: "az",
    bel: "be",
    ben: "bn",
    bos: "bs",
    bul: "bg",
    mya: "my",
    yue: "yue",
    cat: "ca",
    hrv: "hr",
    ces: "cs",
    dan: "da",
    nld: "nl",
    eng: "en",
    est: "et",
    fil: "tl",
    fin: "fi",
    fra: "fr",
    glg: "gl",
    kat: "ka",
    deu: "de",
    ell: "el",
    guj: "gu",
    hau: "ha",
    heb: "he",
    hin: "hi",
    hun: "hu",
    isl: "is",
    ind: "id",
    ita: "it",
    jpn: "ja",
    jav: "jw",
    kan: "kn",
    kaz: "kk",
    khm: "km",
    kor: "ko",
    lao: "lo",
    lav: "lv",
    lin: "ln",
    lit: "lt",
    ltz: "lb",
    mkd: "mk",
    msa: "ms",
    mal: "ml",
    mlt: "mt",
    zho: "zh",
    mri: "mi",
    mar: "mr",
    mon: "mn",
    nep: "ne",
    nor: "no",
    oci: "oc",
    pus: "ps",
    fas: "fa",
    pol: "pl",
    por: "pt",
    pan: "pa",
    ron: "ro",
    rus: "ru",
    srp: "sr",
    sna: "sn",
    snd: "sd",
    slk: "sk",
    slv: "sl",
    som: "so",
    spa: "es",
    swa: "sw",
    swe: "sv",
    tam: "ta",
    tgk: "tg",
    tel: "te",
    tha: "th",
    tur: "tr",
    ukr: "uk",
    urd: "ur",
    uzb: "uz",
    vie: "vi",
    cym: "cy",
    yor: "yo",
  }),
  He = "ws://127.0.0.1:8787/ws",
  Ge = 16e3,
  We = 625e-7,
  $e = 125e-6,
  Ve = 1,
  je = new Set([1, 1.5, 2]),
  Ke = 220,
  ze = 2500,
  Qe = 1e4,
  Je = 2500,
  Xe = 3500,
  Ze = 6500,
  Ye = 500,
  et = 320,
  tt = 2400,
  nt = 3e3,
  at = 4e3,
  rt = 500,
  it = 8e3,
  ot = {
    "lt-l": 5500,
    "lt-c": 5500,
    "lt-d": 5500,
    "lt-j": 6500,
    "textGatewayA-gpt-5.6-luna": 3500,
    "lt-n": 6500,
    "lt-a": 6500,
    "lt-b": 6500,
    textEngineC: 6500,
    "lt-f": 6500,
    textEngineD: 6500,
    "lt-h": 6500,
    "lt-i": 6500,
  },
  st = 3e3,
  lt = 16e3,
  ct = 850,
  dt = 80,
  ut = 9e3,
  mt = 15,
  gt = 3,
  pt = 3,
  ft = 4,
  ht = 2,
  St = [500, 1500],
  Mt = 250,
  vt = 12e3,
  yt = 26e3,
  bt = 6e3,
  Tt = oe,
  wt = Y,
  kt = Object.freeze({ [ee]: 3600, [ae]: 3200, [Y]: 3e3, [oe]: 2200 }),
  Ct = 1800,
  At = 600,
  Rt = 500,
  xt = 250,
  Et = 200,
  Pt = 3200,
  Dt = 5e3,
  It = 900,
  Lt = 80,
  _t = 10,
  Bt = 12e4,
  Ut = 3,
  qt = 3500,
  Ft = 3e4,
  Ot = 8,
  Nt = 3,
  Ht = 5,
  Gt = "off",
  Wt = "local-energy",
  $t = "silero",
  Vt = 0.006,
  jt = 0.0028,
  Kt = 60,
  zt = 850,
  Qt = 280,
  Jt = 0.5,
  Xt = 0.35,
  Zt = 500,
  Yt = 512,
  en = 32,
  tn = 2,
  nn = 500,
  an = 1200,
  rn = 2.5,
  on = 3.25,
  sn = 3,
  ln = 30,
  cn = 3,
  dn = 5,
  un = 20,
  mn = 3500,
  gn = 15e3,
  pn = 15,
  fn = 48,
  hn = 8,
  Sn = 220,
  Mn = 0,
  vn = 1800,
  yn = 1300,
  bn = 5e3,
  Tn = 6500,
  wn = 5e3,
  kn = 6500,
  Cn = 8e3,
  An = 1800,
  Rn = 2600,
  xn = 3200,
  En = 480,
  Pn = 96,
  Dn = 240,
  In = 1400,
  Ln = 6,
  _n = 0.5 / 3600,
  Bn = 0.22 / 3600,
  Un = 75e-6,
  qn = 0.017 / 60,
  Fn = 0.02 / 3600,
  On = 2e4,
  Nn = 2e-4 / 60,
  Hn = 2,
  Gn = (333e-6 / 100) * 2,
  Wn = 0.024 / 3600,
  $n = 35e-7,
  Vn = 21e-6,
  jn = 0.0368 / 60,
  Kn = 1e5,
  zn = "textGatewayA-gpt-5.6-luna",
  Qn = 15e3,
  Jn = 0.15,
  Xn = 0.18,
  Zn = 600,
  Yn = 1,
  ea = 2,
  ta = 420,
  na = 80,
  aa = 150,
  ra = 1200,
  ia = 1800,
  oa = 2.5,
  sa = 15,
  la = 15e3,
  ca = 6,
  da = 10,
  ua = 20,
  ma = 120,
  ga = 480,
  pa = 60,
  fa = 12e4,
  ha = 350,
  Sa = 650,
  Ma = 2400,
  va = 1200,
  ya = 700,
  ba = 450,
  Ta = 900,
  wa = 20,
  ka = 2,
  Ca = 520,
  Aa = 16,
  Ra = 2400,
  xa = 4,
  Ea = 900,
  Pa = 3,
  Da = 320,
  Ia = 45e3,
  La = 1200,
  _a = 4e3,
  Ba = 5e3,
  Ua = 15,
  qa = 120,
  Fa = 3,
  Oa = 650,
  Na = 4500,
  Ha = 2e4,
  Ga = 900,
  Wa = 400,
  $a = 2400,
  Va = 42,
  ja = 10,
  Ka = 26,
  za = 0.5,
  Qa = 2,
  Ja = 0.62,
  Xa = 12,
  Za = 120,
  Ya = 12,
  er = 4,
  tr = 40,
  nr = 24,
  ar = 75,
  rr = 1,
  ir = 60,
  or = 300,
  sr = 3,
  lr = 6e3,
  cr = 6e4,
  dr = 3e5,
  ur = 3e4,
  mr = 3e4,
  gr = 1.5,
  pr = 120,
  fr = 3e4,
  hr = 3,
  Sr = 12e4,
  Mr = 1.5,
  vr = 75,
  yr = 180,
  br = 2,
  Tr = 24,
  wr = 18e4,
  kr = 0.9,
  Cr = 1.15,
  Ar = 0.75,
  Rr = 0.18,
  xr = 2500,
  Er = 0.5,
  Pr = 1.2,
  Dr = 10,
  Ir = 6,
  Lr = 4,
  _r = 1.5,
  Br = 0.6,
  Ur = 1,
  qr = 24,
  Fr = 8,
  Or = 1.5,
  Nr = 0.8,
  Hr = 12e3,
  Gr = 3e3,
  Wr = 3e4,
  $r = 1e3,
  Vr = 500,
  jr = 1e4,
  Kr = 10,
  zr = 512,
  Qr = 0.12,
  Jr = 1.5,
  Xr = 3,
  Zr = 3.5,
  Yr = 5,
  ei = 6,
  ti = 7,
  ni = 8,
  ai = 2,
  ri = 8,
  ii = 10,
  oi = 12,
  si = 750,
  li = 0.8,
  ci = 0.18,
  di = 2,
  ui = 5,
  mi = 900,
  gi = 1,
  pi = 3,
  fi = 2,
  hi = 0.2,
  Si = 0.12,
  Mi = 1.5,
  vi = 3,
  yi = 0.12,
  bi = 2,
  Ti = 10,
  wi = 90,
  ki = 12,
  Ci = 90,
  Ai = 3.5,
  Ri = 12,
  xi = $e,
  Ei = 512,
  Pi = 20,
  Di = 2e3,
  Ii = 900,
  Li = 2200,
  _i = 5e3,
  Bi = 2500,
  Ui = 12e3,
  qi = 12e4,
  Fi = 45e3,
  Oi = 900,
  Ni = 4e3,
  Hi = 2500,
  Gi = 5500,
  Wi = 250,
  $i = 6500,
  Vi = 250,
  ji = 1800,
  Ki = 600,
  zi = 1800,
  Qi = 3e3,
  Ji = 1500,
  Xi = 250,
  Zi = 7e3,
  Yi = 15e3,
  eo = 350,
  to = 0,
  no = 500,
  ao = 6e3,
  ro = 900,
  io = 1,
  oo = 80,
  so = 40,
  lo = 5,
  co = 0.97,
  uo = 0.1,
  mo = 2,
  go = 80,
  po = 5,
  fo = 12096e5,
  ho = {
    "lt-l": 3500,
    "lt-a": 5e3,
    "lt-b": 5200,
    "lt-j": 4500,
    "textGatewayA-gpt-5.6-luna": 9e3,
    "lt-c": 9e3,
    "lt-d": 9e3,
    [Se]: 2e3,
    "lt-n": 3500,
    textEngineD: 3500,
    "lt-h": 3500,
    "lt-i": 3500,
  },
  So = {
    "lt-l": 1500,
    "lt-a": 1200,
    "lt-b": 1400,
    "lt-j": 2200,
    "textGatewayA-gpt-5.6-luna": 5500,
    "lt-c": 7e3,
    "lt-d": 7e3,
    [Se]: 1e3,
    "lt-n": 1400,
    textEngineD: 1800,
    "lt-h": 1800,
    "lt-i": 1800,
  },
  Mo = {
    "lt-l": 2,
    "lt-c": 2,
    "lt-d": 2,
    "lt-j": 2,
    "textGatewayA-gpt-5.6-luna": 1,
    "lt-a": 2,
    "lt-b": 2,
    "lt-n": 2,
    textEngineD: 2,
    "lt-h": 2,
    "lt-i": 2,
  },
  vo = {
    "lt-l": 420,
    "lt-c": 420,
    "lt-d": 420,
    "lt-j": 520,
    "textGatewayA-gpt-5.6-luna": 260,
    "lt-a": 520,
    "lt-b": 520,
    "lt-n": 520,
    textEngineD: 520,
    "lt-h": 520,
    "lt-i": 520,
  },
  yo = 2200,
  bo = 10,
  To = 5e3,
  wo = 4,
  ko = 14,
  Co = 14,
  Ao = 42,
  Ro = 7,
  xo = 18,
  Eo = 3,
  Po = 3,
  Do = 2,
  Io = 2,
  Lo = 12e4,
  _o = 8960,
  Bo = 2,
  Uo = 1500,
  qo = 15e3,
  Fo = 165e3,
  Oo = 18e4,
  No = 1800,
  Ho = 1500,
  Go = 8e3,
  Wo = 15e3,
  $o = 2500,
  Vo = 6e4,
  jo = 1.5,
  Ko = 256,
  zo = 5,
  Qo = 250,
  Jo = 10,
  Xo = 3200,
  Zo = 2500,
  Yo = 3,
  es = 3200,
  ts = 80,
  ns = 32,
  as = 500,
  rs = 250,
  is = 2e3,
  os = 2500,
  ss = 3200,
  ls = 350,
  cs = 5,
  ds = 3,
  us = 0.35,
  ms = 3e6,
  gs = 35e6,
  ps = 12e6,
  fs = 1e7,
  hs = Object.freeze([
    { pixels: 921600, standard: 4e6, high: 6e6 },
    { pixels: 2073600, standard: 1e7, high: 12e6 },
    { pixels: 3686400, standard: 15e6, high: 24e6 },
    { pixels: 1 / 0, standard: 3e7, high: 35e6 },
  ]),
  Ss = 201326592,
  Ms = 2,
  vs = 30,
  ys = 1e4,
  bs = 0,
  Ts = 1e3,
  ws = 1e3,
  ks = 1e3,
  Cs = 8e3,
  As = 45e3,
  Rs = 5e3,
  xs = 1200,
  Es = 1200,
  Ps = 0.02,
  Ds = 0.24,
  Is = 0.32,
  Ls = 0.12,
  _s = 0.16,
  Bs = 0.08,
  Us = 0.92,
  qs = 450,
  Fs = 1e4,
  Os = 2e4,
  Ns = 3e4,
  Hs = 3500,
  Gs = 5e3,
  Ws = 8e3,
  $s = 8e3,
  Vs = 1e4,
  js = 12e3,
  Ks = 6,
  zs = 20,
  Qs = 12,
  Js = 1e3,
  Xs = 3e4,
  Zs = 8,
  Ys = 48,
  el = 8,
  tl = 1200,
  nl = 250,
  al = 1.25,
  rl = 5,
  il = 15,
  ol = 2.25,
  sl = 150,
  ll = 180,
  cl = 45,
  dl = 29,
  ul = 1e4,
  ml = 12e3,
  gl = 8,
  pl = 30,
  fl = 5,
  hl = 5,
  Sl = 0.75,
  Ml = 240,
  vl = 6e5,
  yl = 2500,
  bl = 8,
  Tl = 12,
  wl = 6e3,
  kl = 24,
  Cl = 20,
  Al = 30,
  Rl = "fast",
  xl = "wait-first-mse",
  El = "mse-fast-llm",
  Pl = ae,
  Dl = "lt-h",
  Il = 12,
  Ll = 24,
  _l = 24,
  Bl = 3,
  Ul = 2,
  ql = 2500,
  Fl = 7,
  Ol = 11,
  Nl = 4,
  Hl = 7,
  Gl = 2,
  Wl = 0.75,
  $l = 12,
  Vl = 2.5,
  jl = 1,
  Kl = 0.995,
  zl = 0.6,
  Ql = 160,
  Jl = 0.75,
  Xl = 18,
  Zl = 60,
  Yl = 80,
  ec = 15e3,
  tc = 4e3,
  nc = 1500,
  ac = globalThis.location?.href || "chrome-extension://local/offscreen.html",
  rc = new URL(ac).origin,
  ic = new URL(ac).searchParams.get("runnerSessionId") || "",
  oc = 3e4,
  sc = 18e3,
  lc = 2500,
  cc =
    "mse-ahead-pcm-v114-prefetch-v3-recovery-v6-repeat-v1-live-fallback-v2-outage-stop-v1-replay-failure-v1",
  dc = [0, 100, 250, 500, 1e3, 2e3, 4e3, 4e3];
let uc = Promise.resolve();
const mc = new Map(),
  gc = {
    audioContext: null,
    mediaStream: null,
    captureTrackEndCleanups: [],
    mirrorRecorder: null,
    mirrorBroadcastChannel: null,
    mirrorChunkSequence: 0,
    mirrorMimeType: "",
    monitorNode: null,
    processorNode: null,
    sourceNode: null,
    sileroVad: null,
    sileroVadInitPromise: null,
    sileroVadGeneration: 0,
    sileroVadState: "idle",
    sileroVadProbability: null,
    sileroVadSpeech: !1,
    sileroVadLastFrameAtMs: 0,
    sileroPcmVad: null,
    sileroPcmVadInitPromise: null,
    sileroPcmVadState: "idle",
    sileroPcmVadFrameCollector: null,
    sileroPcmVadAnalysisQueue: Promise.resolve(),
    sileroPcmVadWindowCount: 0,
    sileroPcmVadFallbackCount: 0,
    websocket: null,
    speechGatewayHLiveBatchSocket: null,
    speechGatewayHLiveBatchConnectPromise: null,
    speechGatewayHLiveBatchConnectionId: 0,
    speechGatewayHLiveBatchRequestSequence: 0,
    speechGatewayHLiveBatchPending: new Map(),
    speechGatewayHLiveBatchHeartbeatTimer: null,
    speechGatewayHLiveBatchReconnectTimer: null,
    speechGatewayHLiveBatchReconnectAttempts: 0,
    textEngineGSocket: null,
    textEngineGConnectPromise: null,
    textEngineGConnectionId: 0,
    textEngineGRequestSequence: 0,
    textEngineGPending: new Map(),
    textEngineGHeartbeatTimer: null,
    textEngineGLeaseTimer: null,
    textEngineGReconnectTimer: null,
    textEngineGReconnectAttempts: 0,
    textEngineGLastInboundAtMs: 0,
    textEngineGAccepting: !0,
    localSpeechEngineAMseSockets: new Set(),
    localSpeechEngineAHttpControllers: new Set(),
    localSpeechEngineAMseRequestSequence: 0,
    speechEngineARealtimeFallbackPending: !1,
    speechEngineARealtimeConnectPromise: null,
    speechEngineARealtimeStandbySocket: null,
    speechEngineARealtimeDrainingSocket: null,
    speechEngineARealtimeRotationPrepareTimer: null,
    speechEngineARealtimeRotationForceTimer: null,
    speechEngineARealtimeRotationDrainTimer: null,
    speechEngineARealtimeRotationPreparing: !1,
    speechEngineARealtimeRotationForcePending: !1,
    speechEngineARealtimeRotationDeadlineAtMs: 0,
    speechEngineARealtimeRotationBufferedMessages: [],
    speechEngineARealtimeRotationSequence: 0,
    speechEngineARealtimeRotationEpoch: 0,
    speechEngineARealtimeLastUpstreamMessageAtMs: 0,
    speechEngineARealtimeStallRotateAtMs: 0,
    speechEngineARealtimeLastSpeechAtMs: 0,
    speechEngineARealtimeSpeechRunStartedAtMs: 0,
    speechEngineARealtimeRecoveryChunks: [],
    speechEngineARealtimeRecoveryMs: 0,
    speechEngineARealtimeRecoveryActive: !1,
    speechEngineARealtimeRecoveryLastLogAtMs: 0,
    translationTimer: null,
    usageHeartbeatTimer: null,
    usageHeartbeatInFlight: !1,
    usageHeartbeatConsecutiveFailures: 0,
    usageHeartbeatLastSuccessAtMs: 0,
    billingStopRequested: !1,
    eventLogFlushTimer: null,
    remoteSessionStarted: !1,
    remoteSessionStartPromise: null,
    automaticSttContextResearchController: null,
    walletContextClient: null,
    walletContextClosing: null,
    automaticSttContextResearchGeneration: 0,
    automaticSttContextResearchSessionId: "",
    automaticSttContextResearchVideoId: "",
    automaticSttContextRequestSequence: 0,
    automaticSttContextReviewTimer: null,
    automaticSttContextReviewController: null,
    automaticSttContextReviewInFlight: !1,
    automaticSttContextReviewSequence: 0,
    automaticSttContextLastReviewedTranscript: "",
    config: null,
    sessionId: null,
    tabId: null,
    isStopping: !1,
    stopRequestedAtMs: 0,
    acceptingNewSttWork: !0,
    isResettingWebSocket: !1,
    suppressWebSocketCloseUntilMs: 0,
    isTranslating: !1,
    activeSttProvider: Z,
    timelineRevision: 0,
    transcriberConnectionId: 0,
    translationRequestId: 0,
    activeTranslationRequestId: 0,
    activeTranslationCount: 0,
    activeFinalTranslationCount: 0,
    activeTranslationRequests: new Map(),
    activeBatchSttUploads: new Map(),
    batchSttUploadSequence: 0,
    pendingFinalTranslation: null,
    pendingInterimTranslation: null,
    finalTranslationBatch: [],
    finalTranslationBatchTimer: null,
    finalTranslationRetryTimers: new Set(),
    finalBatchStats: {
      enabled: !1,
      queuedSegments: 0,
      batchesSent: 0,
      segmentsSent: 0,
      estimatedCallsWithoutBatch: 0,
      savedCalls: 0,
      lastBatchSize: 0,
      lastWaitMs: 0,
    },
    translationLatencySamples: [],
    sttLatencySamplesByProvider: {},
    sttDeadlineHedgeProviderHealth: {},
    sttDeadlineHedgeUsage: xy(),
    pipelineLatencySamples: [],
    pipelineLatencyBuckets: {},
    pipelineLatencyStats: null,
    eventLogQueue: [],
    eventLogSequence: 0,
    eventDeliverySequence: 0,
    eventLogFlushInFlight: !1,
    eventLogDropped: 0,
    eventLogDroppedTotal: 0,
    eventLogDroppedReportedTotal: 0,
    lastClientStatusLogSignature: "",
    lastClientStatusLoggedAtMs: 0,
    lastMseReadinessLogSignature: "",
    lastMseReadinessLoggedAtMs: 0,
    lastUsageSnapshotSignature: "",
    lastUsageSnapshotLoggedAtMs: 0,
    displayedSegmentNotificationIds: new Set(),
    displayedSegmentNotificationOrder: [],
    videoSubtitleCachePendingDisplayCandidates: new Map(),
    walletCachePublicationQueue: null,
    videoSubtitleCacheQueue: [],
    videoSubtitleCacheCoverageQueue: [],
    videoSubtitleCacheContextKey: "",
    videoSubtitleCacheFlushTimer: null,
    videoSubtitleCacheFlushInFlight: !1,
    videoSubtitleCacheDropped: 0,
    videoSubtitleCacheQualityRejectedCount: 0,
    videoSubtitleCacheQualityRejectionReasons: {},
    videoSubtitleCacheFirstQueuedAt: 0,
    videoSubtitleCacheLastFlushAt: 0,
    videoSubtitleCacheEndFlushAt: 0,
    adaptiveSyncDelaySeconds: null,
    lastPipelineLatency: null,
    interimTranslationTimeout: null,
    interimTranslationVersion: 0,
    currentInterimText: "",
    lastInterimText: "",
    lastFinalText: "",
    pendingRealtimeCommittedTranscripts: [],
    realtimePlainCommitFallbacks: new Map(),
    realtimeCommittedSequence: 0,
    realtimeFinalTranscriptSeen: !1,
    mseStartupInterimTranslationRequested: !1,
    translationTimelineReservations: [],
    translationTimelineReservationSequence: 0,
    lastInterimTranslationAt: 0,
    lastRealtimeAudioSentAtMs: 0,
    lastRealtimeTranscriptAtMs: 0,
    lastRealtimeCommitAudioMs: 0,
    realtimeCommitPending: !1,
    realtimeCommitSentAtMs: 0,
    realtimeCommitSequence: 0,
    lastRealtimeCoverageCommitAudioMs: 0,
    pendingRealtimeCommitCoverageRanges: [],
    speechEngineALastTranscript: "",
    speechEngineACommittedTranscript: "",
    speechEngineALastCommitAt: 0,
    speechEngineAPendingStartedAt: 0,
    speechEngineAPendingUpdatedAt: 0,
    speechEngineAPendingTiming: null,
    speechEngineAPendingText: "",
    speechEngineAHypothesisHistory: [],
    speechEngineAQuietCommitTimer: null,
    speechEngineAHardCommitTimer: null,
    speechEngineARotationPending: !1,
    speechEngineATranscriptRevisionCount: 0,
    speechEngineARealtimeReconnectTimer: null,
    speechEngineARealtimeReconnectAttempts: 0,
    textEngineCLiveInputTranscript: "",
    textEngineCLiveOutputTranscript: "",
    textEngineCLiveCommittedOutput: "",
    textEngineCLiveUsage: Vy(),
    lastHeartbeatTextEngineCLiveUsage: Vy(),
    displayedOriginalText: "",
    scheduledOriginalText: "",
    originalFallbackDeadlineHealth: dC(),
    confirmedSegments: [],
    sourceMediaTiming: null,
    sourceTimingReceivedAt: 0,
    subtitleDisplayMetrics: null,
    sourceEndedGuardActive: !1,
    sourceEndedGuardStartedAt: 0,
    sourceEndedGuardReason: "",
    sourceEndedGuardMseSegmentsIgnored: 0,
    expectedSourceSeekTargetMediaTime: null,
    expectedViewerSeekTargetMediaTime: null,
    expectedSourceSeekId: "",
    expectedSourceSeekStartedAtMs: 0,
    expectedSourceSeekConfirmedAtMs: 0,
    expectedSourceSeekConfirmedWallTimeMs: 0,
    expectedSourceSeekUntilMs: 0,
    lastIgnoredSourceSeekTimingAtMs: 0,
    sourceAdAudioSkippedMs: 0,
    sourceAdLastSkipLogAt: 0,
    viewerMediaTiming: null,
    viewerTimingReceivedAt: 0,
    mediaPlaybackPausedForStt: !1,
    mediaPlaybackPausedReason: "",
    sourcePauseDebounceTimer: null,
    sourcePauseDebounceStartedAtMs: 0,
    sourcePauseDebounceSessionId: "",
    captureMediaClock: null,
    lastTranscriptTiming: null,
    currentInterimTiming: null,
    sentAudioChunks: 0,
    totalAudioMs: 0,
    sttBillableAudioMs: 0,
    sttTimingAudioMs: 0,
    captureAudioMs: 0,
    sentAudioTimeline: [],
    vad: Ry(),
    lastSpeechActivityEventAt: 0,
    batchStt: Ey(),
    mseAudio: Py(),
    msePcmCoverageWatchdog: ym(),
    msePcmCoverageWatchdogTimer: null,
    mseCoverageLedger: Jd(),
    mseCompletedTimelineProcessedCoverageSeconds: 0,
    mseTranscribedAudioRanges: [],
    mseStartupBoost: Dy(),
    lowLeadFastLlm: Iy(),
    lastUsageHeartbeatAudioMs: 0,
    walletBillingSnapshot: null,
    lastUsageHeartbeatBillableAudioMs: 0,
    lastUsageHeartbeatContentMs: 0,
    lunaBillingUsageMs: 0,
    usageHeartbeatSequence: 0,
    pendingUsageHeartbeatId: "",
    pendingPanelUsageDelta: null,
    sttBillingWatchdogBillableAudioMs: 0,
    sttBillingWatchdogGrowthAtMs: Date.now(),
    sttBillingWatchdogLastLogAtMs: 0,
    llmUsage: {
      inputTokens: 0,
      outputTokens: 0,
      visibleOutputTokens: 0,
      thinkingTokens: 0,
      totalTokens: 0,
      callCount: 0,
      costUSD: 0,
      inputCostUSD: 0,
      outputCostUSD: 0,
      visibleOutputCostUSD: 0,
      thinkingCostUSD: 0,
      fallbackInputTokens: 0,
      fallbackOutputTokens: 0,
      fallbackVisibleOutputTokens: 0,
      fallbackThinkingTokens: 0,
      fallbackTotalTokens: 0,
      fallbackCostUSD: 0,
      fallbackInputCostUSD: 0,
      fallbackOutputCostUSD: 0,
      fallbackVisibleOutputCostUSD: 0,
      fallbackThinkingCostUSD: 0,
      fallbackCount: 0,
      deadlineRescueCount: 0,
      deadlineRescueCostUSD: 0,
      providerErrorRescueCount: 0,
      providerErrorRescueCostUSD: 0,
      providerFailoverCount: 0,
      lastFallbackProvider: "",
      lastFallbackFromProvider: "",
      lastFallbackReason: "",
      lastFallbackKind: "",
      provider: "",
      providerName: "",
    },
    lastHeartbeatLLMUsage: {
      inputTokens: 0,
      outputTokens: 0,
      visibleOutputTokens: 0,
      thinkingTokens: 0,
      totalTokens: 0,
      callCount: 0,
      costUSD: 0,
      inputCostUSD: 0,
      outputCostUSD: 0,
      visibleOutputCostUSD: 0,
      thinkingCostUSD: 0,
      fallbackInputTokens: 0,
      fallbackOutputTokens: 0,
      fallbackVisibleOutputTokens: 0,
      fallbackThinkingTokens: 0,
      fallbackTotalTokens: 0,
      fallbackCostUSD: 0,
      fallbackInputCostUSD: 0,
      fallbackOutputCostUSD: 0,
      fallbackVisibleOutputCostUSD: 0,
      fallbackThinkingCostUSD: 0,
      fallbackCount: 0,
      deadlineRescueCount: 0,
      deadlineRescueCostUSD: 0,
      providerErrorRescueCount: 0,
      providerErrorRescueCostUSD: 0,
      providerFailoverCount: 0,
      lastFallbackProvider: "",
      lastFallbackFromProvider: "",
      lastFallbackReason: "",
      lastFallbackKind: "",
      provider: "",
      providerName: "",
    },
    subtitlePipelineStats: jy(),
  };
async function pc(e = {}) {
  if ("START_TAB_AUDIO_CAPTURE" === e.type)
    return (await bc(() => wc(e)), { ok: !0 });
  if ("STOP_TAB_AUDIO_CAPTURE" === e.type)
    return e.sessionId && gc.sessionId && e.sessionId !== gc.sessionId
      ? { ok: !0, ignored: !0, reason: "stale-session" }
      : (await bc(() =>
          Pc(e.reason || "使用者停止", {
            notify: !1 !== e.notify,
            ...(!0 === e.endRemote ? { endRemote: !0 } : {}),
          }),
        ),
        { ok: !0 });
  if ("DISPLAYED_SUBTITLE_SEGMENT" === e.type) {
    const t =
        Array.isArray(e.segments) && e.segments.length
          ? e.segments
          : [e.segment || {}],
      n = [];
    let a = 0,
      r = 0,
      i = 0;
    for (const e of t) {
      const t = wD(e?.notificationId || "");
      if (t) {
        if ((n.push(t), !gc.displayedSegmentNotificationIds.has(t))) {
          for (
            gc.displayedSegmentNotificationIds.add(t),
              gc.displayedSegmentNotificationOrder.push(t);
            gc.displayedSegmentNotificationOrder.length > 4e3;

          ) {
            const e = gc.displayedSegmentNotificationOrder.shift();
            e && gc.displayedSegmentNotificationIds.delete(e);
          }
          BR(e?.original);
          const n = cx(e || {});
          (n.accepted && (r += 1), n.rejected && (i += 1), (a += 1));
        }
        Nx("subtitle.displayed", Xx(e || {}), {
          source: "content-script",
          level: e?.skipped ? "warn" : "info",
          eventId: `subtitle_displayed:${t}`,
        });
      }
    }
    const o = wD(e.segment?.notificationId || n.at(-1) || "");
    return {
      ok: n.length > 0,
      recorded: n.length > 0,
      duplicate: 0 === a,
      newlyRecorded: a,
      cacheAccepted: r,
      cacheRejected: i,
      notificationId: o,
      recordedNotificationIds: n,
    };
  }
  if ("MSE_AUDIO_SEGMENT" === e.type) return wg(e);
  if ("WALLET_CACHE_AUTHORITY" === e.type) return Zd(e);
  if ("UPDATE_CAPTURE_CONFIG" === e.type) {
    if (e.sessionId && gc.sessionId && e.sessionId !== gc.sessionId)
      return { ok: !0, ignored: !0, reason: "stale-session" };
    const t = gc.config || {},
      n =
        "sql-wallet-v1" === t.walletBillingProtocol &&
        void 0 !== e.config?.provider &&
        qP(e.config.provider) !== qP(t.provider),
      a = [
        ...new Set([
          ...(e.restartReasons || []),
          ...(n ? ["translation-provider-wallet"] : []),
        ]),
      ];
    return (
      (gc.config = PP({
        ...t,
        ...(e.config || {}),
        ...("sql-wallet-v1" === t.walletBillingProtocol
          ? {
              provider: t.provider,
              walletBillingProtocol: t.walletBillingProtocol,
              fundingWallet: t.fundingWallet,
            }
          : {}),
        sttProvider: t.sttProvider,
        sttAudioSpeed: t.sttAudioSpeed,
        sourcePreloadEnabled: t.sourcePreloadEnabled,
        sourcePreloadPlaybackRate: t.sourcePreloadPlaybackRate,
      })),
      !0 === t.audioPrefetchEnabled &&
        !0 !== gc.config.audioPrefetchEnabled &&
        tg(),
      (!1 !== gc.config.sttContextAutoResearchEnabled &&
        t.sourceLang === gc.config.sourceLang) ||
        (nM("settings-changed"), aM({ abort: !0 })),
      fA(gc.config.provider) &&
      "en" === Cd() &&
      "sql-wallet-v1" !== gc.config.walletBillingProtocol
        ? ((gc.textEngineGAccepting = !0),
          xd().catch((e) => {
            Nx(
              "llm.textEngineG.ws.hot_config_connect_failed",
              { error: e?.message || String(e || "") },
              { source: "offscreen", provider: Se, level: "warn" },
            );
          }))
        : (gc.textEngineGSocket || gc.textEngineGConnectPromise) &&
          Gd("provider changed", { rejectPending: !0 }),
      Nx(
        "capture.config_updated",
        {
          provider: gc.config.provider,
          sourceLang: gc.config.sourceLang,
          targetLang: gc.config.targetLang,
          sttLanguageMode: gc.config.sttLanguageMode,
          sttLanguageHintCount: qS(gc.config.sourceLanguageHints, 4).length,
          sttPromptChars: String(gc.config.sttPrompt || "").length,
          sttKeywordCount: qS(gc.config.sttKeywords, d).length,
          syncDelayMode: gc.config.syncDelayMode,
          syncDelaySeconds: gc.config.syncDelaySeconds,
          baseSyncDelaySeconds: gc.config.baseSyncDelaySeconds,
          batchWaitSeconds: gc.config.batchWaitSeconds,
          effectiveSyncDelaySeconds: gc.config.effectiveSyncDelaySeconds,
          subtitleBufferTargetSegments: gc.config.subtitleBufferTargetSegments,
          requiresRestart: Boolean(e.requiresRestart || n),
          restartReasons: a,
        },
        {
          source: "offscreen",
          level: e.requiresRestart || n ? "warn" : "info",
        },
      ),
      dM(),
      sM(),
      {
        ok: !0,
        requiresRestart: Boolean(e.requiresRestart || n),
        restartReasons: a,
        ...(n ? { effectiveProvider: t.provider } : {}),
      }
    );
  }
  if ("APPEND_EVENT_LOG" === e.type) {
    const t = Array.isArray(e.events) ? e.events : e.event ? [e.event] : [];
    for (const e of t)
      (jg(e),
        Nx(e?.type || e?.kind || "client.event", e?.data || e || {}, {
          source: e?.source || "content-script",
          level: e?.level || "info",
          requestId: e?.requestId,
          provider: e?.provider,
          model: e?.model,
          clientTimeMs: e?.clientTimeMs,
          sequence: e?.sequence,
        }));
    return { ok: !0, queued: t.length };
  }
  return "PANEL_USAGE_DELTA" === e.type
    ? e.sessionId && gc.sessionId && e.sessionId !== gc.sessionId
      ? { ok: !0, ignored: !0, reason: "stale-session" }
      : {
          ok: !0,
          queued: ME(e.usage || null),
          hasPendingUsage: PE(gc.pendingPanelUsageDelta),
        }
    : "SOURCE_MEDIA_TIMING_UPDATE" === e.type
      ? (LA(e.timing), { ok: !0 })
      : "VIEWER_MEDIA_TIMING_UPDATE" === e.type
        ? (WA(e.timing), { ok: !0 })
        : "SUBTITLE_DISPLAY_METRICS" === e.type
          ? { ok: !0, accepted: jT(e.metrics) }
          : "RESET_SUBTITLE_TIMELINE" === e.type
            ? (await xA(e),
              {
                ok: !0,
                sessionId: gc.sessionId || "",
                timelineRevision: gc.timelineRevision,
              })
            : "CHANGE_CAPTURE_MEDIA_CONTEXT" === e.type
              ? EA(e)
              : {
                  ok: !1,
                  error: `Unknown offscreen runner command: ${e.type}`,
                };
}
let textamisuNarrationAudio = null;
async function fc(e = {}) {
  const t = String(e.sessionId || "").trim();
  if ("PLAY_TTS_AUDIO" === e.type) {
    const encoded = String(e.audioBase64 || "");
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(encoded) || encoded.length < 32 || encoded.length > 360000) return { ok: !1, error: "無效的朗讀音訊" };
    textamisuNarrationAudio?.pause();
    const audio = new Audio(`data:audio/mpeg;base64,${encoded}`);
    textamisuNarrationAudio = audio;
    audio.volume = Math.max(0, Math.min(1, Number.isFinite(Number(e.volume)) ? Number(e.volume) : .8));
    await audio.play();
    return { ok: !0, playing: !0 };
  }
  if ("START_TAB_AUDIO_CAPTURE" === e.type) {
    if (!t) return { ok: !1, error: "missing sessionId for offscreen runner" };
    await Sc(t);
    const n = mc.get(t),
      a = Number(e.tabId);
    return (n && Number.isFinite(a) && (n.tabId = a), yc(t, e, oc));
  }
  if ("STOP_TAB_AUDIO_CAPTURE_FOR_TAB" === e.type) {
    const t = Number(e.tabId);
    if (!Number.isFinite(t))
      return { ok: !1, error: "missing tabId for offscreen runner cleanup" };
    const n = String(e.exceptSessionId || "").trim(),
      a = [...mc.entries()]
        .filter(([e, a]) => e !== n && Number(a?.tabId) === t)
        .map(([e]) => e),
      r = [];
    for (const t of a) r.push(await Mc(t, e));
    return {
      ok: r.every((e) => !1 !== e?.ok),
      stopped: r.length,
      remainingSessions: mc.size,
      results: r,
    };
  }
  if ("STOP_TAB_AUDIO_CAPTURE" === e.type) {
    if (!t) {
      const t = [];
      for (const n of [...mc.keys()]) t.push(await Mc(n, e));
      return {
        ok: t.every((e) => !1 !== e?.ok),
        stopped: t.length,
        remainingSessions: mc.size,
        results: t,
      };
    }
    return { ...(await Mc(t, e)), remainingSessions: mc.size };
  }
  return t
    ? mc.has(t)
      ? { ...(await yc(t, e, hc(e))), remainingSessions: mc.size }
      : "DISPLAYED_SUBTITLE_SEGMENT" === e.type
        ? {
            ok: !1,
            retryable: !0,
            reason: "runner-not-found",
            remainingSessions: mc.size,
          }
        : {
            ok: !0,
            ignored: !0,
            reason: "runner-not-found",
            remainingSessions: mc.size,
          }
    : "DISPLAYED_SUBTITLE_SEGMENT" === e.type
      ? { ok: !1, retryable: !0, reason: "missing-session-id" }
      : { ok: !0, ignored: !0, reason: "missing-session-id" };
}
function hc(e = {}) {
  return "DISPLAYED_SUBTITLE_SEGMENT" === e.type ? lc : oc;
}
async function Sc(e) {
  const t = mc.get(e);
  if (t?.frame?.contentWindow) return t.frame;
  const n = document.createElement("iframe");
  ((n.hidden = !0),
    n.setAttribute("aria-hidden", "true"),
    (n.dataset.runnerSessionId = e),
    (n.src = `${chrome.runtime.getURL("offscreen.html")}?runnerSessionId=${encodeURIComponent(e)}`));
  const a = new Promise((e, t) => {
    const a = setTimeout(() => t(new Error("offscreen runner 載入逾時")), 1e4);
    (n.addEventListener(
      "load",
      () => {
        (clearTimeout(a), e());
      },
      { once: !0 },
    ),
      n.addEventListener(
        "error",
        () => {
          (clearTimeout(a), t(new Error("offscreen runner 載入失敗")));
        },
        { once: !0 },
      ));
  });
  (document.body.appendChild(n),
    mc.set(e, { frame: n, createdAt: Date.now() }));
  try {
    await a;
  } catch (t) {
    throw (vc(e), t);
  }
  return n;
}
async function Mc(e, t = {}) {
  if (!mc.has(e)) return { ok: !0, ignored: !0, reason: "runner-not-found" };
  const n = await yc(
    e,
    { ...t, type: "STOP_TAB_AUDIO_CAPTURE", sessionId: e },
    oc,
  );
  return (!1 !== n?.ok && vc(e), n);
}
function vc(e) {
  const t = mc.get(e);
  mc.delete(e);
  try {
    t?.frame?.remove();
  } catch {}
}
function yc(e, t, n = 3e4) {
  const a = mc.get(e),
    r = a?.frame?.contentWindow;
  if (!r)
    return Promise.resolve({
      ok: !1,
      error: "offscreen runner is not available",
    });
  const i = `${e}:${Date.now()}:${Math.random().toString(16).slice(2)}`;
  return new Promise((a) => {
    const o = setTimeout(() => {
      (window.removeEventListener("message", s),
        a({
          ok: !1,
          timeout: !0,
          error: "offscreen runner command timed out",
        }));
    }, n);
    function s(t) {
      if (t.source !== r || t.origin !== rc) return;
      const n = t.data || {};
      "offscreen-manager" === n?.target &&
        n.runnerSessionId === e &&
        n.requestId === i &&
        (clearTimeout(o),
        window.removeEventListener("message", s),
        a(
          n.result || {
            ok: !1,
            retryable: !0,
            reason: "empty-runner-response",
            error: "offscreen runner returned no result",
          },
        ));
    }
    (window.addEventListener("message", s),
      r.postMessage(
        {
          target: "offscreen-runner",
          runnerSessionId: e,
          requestId: i,
          message: t,
        },
        rc,
      ));
  });
}
function bc(e) {
  const t = uc.catch(() => {}).then(e);
  return ((uc = t.catch(() => {})), t);
}
function Tc(e = {}) {
  return {
    extensionVersion:
      "string" ==
        typeof (e = e && "object" == typeof e ? e : {}).extensionVersion &&
      /^\d+\.\d+\.\d+(?:\.\d+)?$/.test(e.extensionVersion) &&
      e.extensionVersion.length <= 40
        ? e.extensionVersion
        : "",
    extensionId:
      "string" == typeof e.extensionId && /^[a-p]{32}$/.test(e.extensionId)
        ? e.extensionId
        : "",
    releaseChannel: ["formal", "test", "store", "unknown"].includes(
      e.releaseChannel,
    )
      ? e.releaseChannel
      : "unknown",
    installationType: [
      "admin",
      "development",
      "normal",
      "sideload",
      "other",
      "unknown",
    ].includes(e.installationType)
      ? e.installationType
      : "unknown",
    buildMetadataSource:
      "service-worker" === e.buildMetadataSource ? "service-worker" : "unknown",
  };
}
async function wc({
  streamId: e,
  tabId: t,
  sessionId: n,
  config: a,
  clientBuildMetadata: r,
}) {
  await Pc("restart", {
    notify: !1,
    endRemote: Boolean(gc.sessionId && gc.sessionId !== n),
  });
  const i = cu(n);
  (xP(),
    (gc.mseCompletedTimelineProcessedCoverageSeconds = i),
    zR(),
    (gc.config = PP(a)),
    (gc.clientBuildMetadata = Tc(r)),
    (gc.sessionId = n),
    (gc.tabId = t),
    (gc.mseAdmissionPending = !0),
    (gc.mseAdmissionReplayNeeded = !1),
    (gc.mseAudio = { ...Py(), enabled: zm(), startedAtMs: Date.now() }),
    (gc.mseStartupBoost = Ly(gc.config)),
    (gc.lowLeadFastLlm = Iy()),
    (gc.isStopping = !1),
    (gc.stopRequestedAtMs = 0),
    (gc.acceptingNewSttWork = !0),
    (gc.textEngineGAccepting = !0),
    Od({ resetAttempts: !0 }),
    wd({ resetAttempts: !0 }),
    (gc.remoteSessionStarted = !1),
    (gc.remoteSessionStartPromise = null),
    (gc.usageHeartbeatConsecutiveFailures = 0),
    (gc.usageHeartbeatLastSuccessAtMs = 0),
    (gc.billingStopRequested = !1),
    Nx(
      "capture.start_requested",
      {
        ...gc.clientBuildMetadata,
        tabId: t,
        sttProvider: gc.config.sttProvider,
        provider: gc.config.provider,
        captionMode: gc.config.captionMode,
        sourceIsLiveStream: Boolean(gc.config.sourceIsLiveStream),
        sourceLiveClassification:
          gc.config.sourceLiveClassification || "unknown",
        initialPlaybackMediaTime: aP(gc.config.initialPlaybackMediaTime),
        sourceLiveEvidence: gc.config.sourceLiveEvidence || "",
        sourceLiveClassificationProbeWaitedMs: rP(
          gc.config.sourceLiveClassificationProbeWaitedMs,
        ),
        sourceLiveClassificationProbeSamples: rP(
          gc.config.sourceLiveClassificationProbeSamples,
        ),
        sourceLiveClassificationPlayerProbeSamples: rP(
          gc.config.sourceLiveClassificationPlayerProbeSamples,
        ),
        liveMseFallbackApplied: Boolean(gc.config.liveMseFallbackApplied),
        speechEngineIHyMtLiveTenSecondApplied: Boolean(
          gc.config.speechEngineIHyMtLiveTenSecondApplied,
        ),
        syncEnabled: gc.config.syncEnabled,
        singleTabMediaSync: gc.config.singleTabMediaSync,
        sourcePreloadEnabled: gc.config.sourcePreloadEnabled,
        sourcePreloadMaxLeadSeconds: gc.config.sourcePreloadMaxLeadSeconds,
        mseAudioBufferEnabled: Boolean(gc.config.mseAudioBufferEnabled),
        mseHookVersion: rP(gc.config.mseHookVersion),
        mseHookStaleReloaded: Boolean(gc.config.mseHookStaleReloaded),
        audioInputMode: gc.config.audioInputMode || "",
        syncDelaySeconds: gc.config.syncDelaySeconds,
        baseSyncDelaySeconds: gc.config.baseSyncDelaySeconds,
        batchWaitSeconds: gc.config.batchWaitSeconds,
        syncDelaySafetyPolicy: gc.config.syncDelaySafetyPolicy || "",
        syncDelaySafetyMinimumSeconds: rP(
          gc.config.syncDelaySafetyMinimumSeconds,
        ),
        syncDelaySafetyMseActive: Boolean(gc.config.syncDelaySafetyMseActive),
        syncDelaySafetyAdjustedFromSeconds: rP(
          gc.config.syncDelaySafetyAdjustedFromSeconds,
        ),
        finalBatchingEnabled: Boolean(gc.config.finalBatchingEnabled),
        mseFinalBatchingForced: VT(),
        effectiveSyncDelaySeconds: gc.config.effectiveSyncDelaySeconds,
        mseStartupBoostEnabled: Boolean(gc.config.mseStartupBoostEnabled),
        mseStartupBoostMode: gc.config.mseStartupBoostMode || "",
        mseStartupBoostTargetSeconds: gc.config.mseStartupBoostTargetSeconds,
        mseStartupBoostProvider: gc.config.mseStartupBoostProvider || "",
        mseStartupBoostActive: Boolean(gc.mseStartupBoost?.active),
        mseStartupBoostSwitched: Boolean(gc.mseStartupBoost?.switched),
        mseStartupBoostStandardProvider:
          gc.mseStartupBoost?.standardProvider || "",
        mseStartupBoostStandardSttProvider:
          gc.mseStartupBoost?.standardSttProvider || "",
        mseStartupBoostFastProvider: gc.mseStartupBoost?.fastProvider || "",
        subtitleBufferTargetSegments: gc.config.subtitleBufferTargetSegments,
        resumedMseProcessedCoverageSeconds: aP(i),
        clientBuildFingerprint: cc,
        expectedMseHookVersion: dl,
        featureFlags: Cc(),
      },
      { source: "offscreen" },
    ),
    gc.mseAudio.enabled && !Ym() && Vg("capture-start"));
  try {
    if (Ac(e))
      return (
        vP("mse-audio-buffer", "等待 YouTube audio buffer"),
        Nx(
          "capture.mse_audio_only_ready",
          {
            tabId: t,
            syncEnabled: Boolean(gc.config.syncEnabled),
            syncDelaySeconds: gc.config.syncDelaySeconds,
            audioInputMode: gc.config.audioInputMode || "",
          },
          { source: "offscreen" },
        ),
        void (await Ec({
          readyStatus: "mse-audio-buffer",
          readyMessage: "等待 YouTube audio buffer",
        }))
      );
    (vP("starting", "正在擷取分頁音訊"),
      (gc.mediaStream = await ub(e, {
        video:
          gc.config.mirrorDelayEnabled && !gc.config.nativeStreamDelayEnabled,
      })),
      Ic(gc.mediaStream),
      Nx(
        "capture.audio_stream_ready",
        {
          tabId: t,
          audioTracks: gc.mediaStream.getAudioTracks().length,
          videoTracks: gc.mediaStream.getVideoTracks().length,
          mirrorDelayEnabled: Boolean(gc.config.mirrorDelayEnabled),
          nativeStreamDelayEnabled: Boolean(gc.config.nativeStreamDelayEnabled),
        },
        { source: "offscreen" },
      ),
      gb(),
      (gc.audioContext = new AudioContext()),
      (gc.sourceNode = gc.audioContext.createMediaStreamSource(gc.mediaStream)),
      (gc.monitorNode = gc.audioContext.createGain()),
      (gc.monitorNode.gain.value = gc.config.syncEnabled ? 0 : 1),
      gc.sourceNode.connect(gc.monitorNode),
      gc.monitorNode.connect(gc.audioContext.destination),
      (gc.processorNode = gc.audioContext.createScriptProcessor(4096, 1, 1)),
      (gc.processorNode.onaudioprocess = Qd),
      gc.sourceNode.connect(gc.processorNode),
      gc.processorNode.connect(gc.audioContext.destination),
      wy().catch(() => {}),
      await Ec());
  } catch (e) {
    throw (await Pc("啟動失敗", { notify: !1 }), xP(), e);
  }
}
function kc() {
  const e = Tc(gc.clientBuildMetadata);
  Nx(
    "client.build_fingerprint",
    {
      fingerprint: cc,
      ...e,
      expectedMseHookVersion: dl,
      featureFlags: Cc(),
      sttProvider: gc.config?.sttProvider || "",
      provider: gc.config?.provider || "",
      audioInputMode: gc.config?.audioInputMode || "",
      mseAudioBufferEnabled: Boolean(gc.config?.mseAudioBufferEnabled),
      syncDelaySeconds: rP(gc.config?.syncDelaySeconds),
      batchWaitSeconds: rP(gc.config?.batchWaitSeconds),
    },
    { source: "offscreen" },
  );
}
function Cc() {
  return {
    readyLeadCatchup: !0,
    audioPrefetchEnabled: !0 === gc.config?.audioPrefetchEnabled,
    audioPrefetchSabr: !0,
    audioPrefetchHls: !0,
    mseCoverageLedger: !0,
    pcmPrimaryAudio: !0,
    parallelFastStartupBatch: !0,
    deferredMseStartupTranscriberConnect: !0,
    deferredMseStartupRemoteSession: !0,
    pcmOnlyStt: Ym(),
    mseAheadDecodedPcm: Ym(),
    mseEncodedAudioForStt: !Ym(),
    reactiveGapBackfill: !1,
    speechEngineARealtimePcmRecovery: !0,
    speechEngineARealtimeProviderLock: !0,
    speechEngineARealtimeSameProviderRecovery: !0,
    strictTimelineGeneration: !0,
    mseCatchupDeadlineBypass: !0,
    displayBudgetMetrics: "function" == typeof jT,
  };
}
function Ac(e) {
  return (
    !e && !Ym() && !eD() && !By() && Boolean(zm() && JP(gc.config?.sttProvider))
  );
}
function Rc() {
  return Boolean(
    gc.config?.sourceStartupCaptureHold && zm() && Sg() && $y() === ae,
  );
}
function xc() {
  return Boolean(gc.config?.sourceStartupCaptureHold && zm() && Sg());
}
async function Ec(e = {}) {
  const t = Tx();
  ((gc.remoteSessionStartPromise = t),
    t.then(
      () => {
        gc.remoteSessionStartPromise === t &&
          (gc.remoteSessionStartPromise = null);
      },
      () => {
        gc.remoteSessionStartPromise === t &&
          (gc.remoteSessionStartPromise = null);
      },
    ),
    await t,
    dM());
  const n = Uc();
  (Rc()
    ? (Nx(
        "capture.transcriber_connect_deferred",
        {
          reason: "mse-pcm-buffer-can-cover-connect",
          activeSttProvider: gc.activeSttProvider,
          standardSttProvider: gc.mseStartupBoost?.standardSttProvider || "",
          sourceStartupCaptureHold: Boolean(
            gc.config?.sourceStartupCaptureHold,
          ),
        },
        { source: "offscreen" },
      ),
      n.catch((e) => {
        (Nx(
          "capture.transcriber_connect_deferred_failed",
          {
            error: e?.message || String(e || ""),
            activeSttProvider: gc.activeSttProvider,
            standardSttProvider: gc.mseStartupBoost?.standardSttProvider || "",
          },
          { source: "offscreen", level: "warn" },
        ),
          qx(e, "transcriber-connect"));
      }))
    : await n,
    (gc.mseAdmissionPending = !1),
    mg(),
    !0 === gc.config?.audioPrefetchEnabled && ng(),
    Ad() &&
      xd().catch((e) => {
        (Nx(
          "llm.textEngineG.ws.preconnect_failed",
          { error: e?.message || String(e || "") },
          { source: "offscreen", provider: Se, level: "warn" },
        ),
          Nd({ reason: e?.message || "preconnect-failed" }));
      }),
    kc(),
    Tm(),
    jx({ force: !0 }).catch((e) => {
      console.warn("[offscreen] event log start flush skipped:", e.message);
    }),
    (gc.translationTimer = setInterval(DT, yn)),
    (gc.usageHeartbeatTimer = setInterval(() => {
      (NE(), Cx().catch(Ix));
    }, _)),
    vP(e.readyStatus || "listening", e.readyMessage || "字幕中"));
}
async function Pc(e = "已停止", t = { notify: !0 }) {
  (gc.walletCaptionTransport?.close(),
    gc.audioPrefetchController && tg(),
    nM(e),
    aM({ abort: !0 }));
  const n = Boolean(!1 !== t.notify && !1 !== t.drainBatchPipeline && lg());
  ((gc.stopRequestedAtMs = Date.now()),
    (gc.mseAdmissionPending = !1),
    (gc.mseAdmissionReplayNeeded = !1),
    (gc.acceptingNewSttWork = !1),
    (gc.textEngineGAccepting = !1),
    (gc.isStopping = !n),
    Nx(
      "capture.stop_requested",
      {
        reason: e,
        notify: Boolean(t.notify),
        totalAudioMs: gc.totalAudioMs,
        sentAudioChunks: gc.sentAudioChunks,
        activeSttProvider: gc.activeSttProvider,
      },
      { source: "offscreen" },
    ),
    clearInterval(gc.translationTimer),
    (gc.translationTimer = null),
    NT(),
    Uw(),
    bm(),
    Jg(gc.mseAudio),
    Xg(gc.mseAudio),
    Zg(gc.mseAudio),
    wd({ resetAttempts: !0 }),
    Kc({ resetAttempts: !0 }),
    Od({ resetAttempts: !0 }),
    Gd("capture-stop", { rejectPending: !0 }),
    bd("capture-stop"),
    clearInterval(gc.usageHeartbeatTimer),
    (gc.usageHeartbeatTimer = null),
    Th("capture-stop"));
  let a = 0;
  try {
    a = MP({ endStream: !0 });
  } catch {}
  if (
    (fb(),
    await Dc(),
    a > 0 && (await fD(a)),
    lg() && (await lb(ut), n && (await cb(Ha))),
    (gc.isStopping = !0),
    Jc("capture-stop", { rejectPending: !0 }),
    Fc("capture-stop"),
    Td(e),
    gc.websocket)
  ) {
    try {
      gc.websocket.close(1e3, e);
    } catch {}
    gc.websocket = null;
  }
  (await Dc(),
    dx("session-ended-before-display"),
    await vx({ force: !0, final: !0, close: !0, reason: "capture-stop" }).catch(
      (e) => {
        console.warn(
          "[offscreen] final subtitle cache flush skipped:",
          e.message,
        );
      },
    ),
    NE(null, { final: !0, forceEventLog: !0 }),
    await zx({ force: !0, final: !0, reason: "capture-stop" }).catch((e) => {
      console.warn("[offscreen] final event log flush skipped:", e.message);
    }));
  const r =
    !0 === t.endRemote && "sql-wallet-v1" === gc.config?.walletBillingProtocol;
  ((t.notify || r) &&
    (t.notify &&
      !t.skipFinalUsageHeartbeat &&
      (await Cx({ final: !0 }).catch((e) => {
        console.warn("[offscreen] final usage heartbeat skipped:", e.message);
      })),
    await zx({
      force: !0,
      final: !0,
      reason: "capture-stop-after-heartbeat",
    }).catch(() => {}),
    await kx(),
    t.notify &&
      (await chrome.runtime.sendMessage({
        type: "OFFSCREEN_STOPPED",
        reason: e,
        sessionId: gc.sessionId || null,
        failureNotice: t.failureNotice || "",
      }))),
    Vx());
}
async function Dc() {
  (Lc(),
    ef(),
    await Cy(),
    gc.processorNode &&
      ((gc.processorNode.onaudioprocess = null),
      Bc(gc.processorNode),
      (gc.processorNode = null)),
    gc.sourceNode && (Bc(gc.sourceNode), (gc.sourceNode = null)),
    gc.monitorNode && (Bc(gc.monitorNode), (gc.monitorNode = null)),
    gc.mediaStream &&
      (gc.mediaStream.getTracks().forEach((e) => {
        try {
          e.stop();
        } catch {}
      }),
      (gc.mediaStream = null)),
    gc.audioContext &&
      (await gc.audioContext.close().catch(() => {}),
      (gc.audioContext = null)));
}
function Ic(e) {
  Lc();
  const t = "function" == typeof e?.getTracks ? e.getTracks() : [];
  for (const e of t) {
    if (!e || "function" != typeof e.addEventListener) continue;
    const t = gc.sessionId,
      n = gc.tabId,
      a = e.kind || "unknown",
      r = () => _c({ sessionId: t, tabId: n, trackKind: a });
    (e.addEventListener("ended", r, { once: !0 }),
      gc.captureTrackEndCleanups.push(() => {
        try {
          e.removeEventListener("ended", r);
        } catch {}
      }));
  }
}
function Lc() {
  const e = gc.captureTrackEndCleanups.splice(0);
  for (const t of e) t();
}
function _c(e = {}) {
  !gc.isStopping &&
    gc.mediaStream &&
    ((e.sessionId && gc.sessionId && e.sessionId !== gc.sessionId) ||
      (Nx(
        "capture.track_ended",
        {
          tabId: e.tabId ?? gc.tabId,
          trackKind: e.trackKind || "unknown",
          sessionId: e.sessionId || gc.sessionId || "",
        },
        { source: "offscreen", level: "warn" },
      ),
      bc(async () =>
        gc.isStopping || !gc.mediaStream
          ? { ok: !0, ignored: !0 }
          : e.sessionId && gc.sessionId && e.sessionId !== gc.sessionId
            ? { ok: !0, ignored: !0, reason: "stale-track-ended" }
            : Pc("分頁音訊已中斷", { notify: !0, drainBatchPipeline: !1 }),
      ).catch((e) => {
        console.warn(
          "[offscreen] capture track ended cleanup skipped:",
          e.message,
        );
      })));
}
function Bc(e) {
  try {
    e.disconnect();
  } catch {}
}
async function Uc() {
  if (((gc.activeSttProvider = $y()), EP(), YP(gc.activeSttProvider)))
    return qc();
  if (QP()) return await Oc();
  if (gc.activeSttProvider === ae)
    try {
      return await sd();
    } catch (e) {
      if (Ny("connect-failed")) return Uc();
      if (
        md("initial-connect-failed", { error: e?.message || String(e || "") })
      )
        return;
      throw e;
    }
  if (gc.activeSttProvider === ne) return await od();
  if (gc.activeSttProvider === se) return await Wd();
  try {
    return await Yc();
  } catch (e) {
    if (Ny("connect-failed")) return Uc();
    throw e;
  }
}
function qc() {
  ((gc.websocket = null),
    (gc.transcriberConnectionId += 1),
    xT(),
    vP(
      "connected",
      ZP(gc.activeSttProvider)
        ? "迅聽 Mini 即時版 MSE 加速已啟用"
        : "本機 speechEngineA MSE 音訊已啟用",
    ));
}
function Fc(e = "cancelled") {
  const t = Array.from(gc.localSpeechEngineAMseSockets || []);
  for (const n of t) {
    n.__mseCancelReason = e;
    try {
      n.close(1e3, e);
    } catch {}
  }
  gc.localSpeechEngineAMseSockets?.clear?.();
  const n = Array.from(gc.localSpeechEngineAHttpControllers || []);
  for (const t of n) {
    t.__mseCancelReason = e;
    try {
      t.abort();
    } catch {}
  }
  return (gc.localSpeechEngineAHttpControllers?.clear?.(), t.length + n.length);
}
async function Oc() {
  if (
    ((gc.websocket = null),
    (gc.transcriberConnectionId += 1),
    $f(gc.batchStt),
    (gc.batchStt = Ey()),
    gc.activeSttProvider === ie)
  )
    try {
      await Gc();
    } catch (e) {
      if (
        (Nx(
          "stt.speechGatewayH_live.ws.preconnect_failed",
          { error: e?.message || String(e || "") },
          { source: "offscreen", provider: ie, level: "warn" },
        ),
        "sql-wallet-v1" === gc.config?.walletBillingProtocol)
      )
        throw e;
    }
  vP("connected", `${aD()} 已啟用`);
}
function Nc() {
  return JSON.stringify([
    gc.sessionId,
    gc.config?.backendUrl || T,
    gc.config?.sourceLang || "auto",
    gc.config?.walletBillingProtocol || "",
    gc.timelineRevision || 0,
    tE(),
  ]);
}
async function Hc() {
  const e = Nc(),
    t =
      "sql-wallet-v1" === gc.config?.walletBillingProtocol
        ? await gP()
        : await uP();
  if (!t?.idToken)
    throw new Error("請先在插件登入，GPT Live 聽寫需要 Firebase token。");
  const n = new URL(gc.config?.backendUrl || T);
  if (e !== Nc()) throw new Error("字幕工作已切換");
  if ("sql-wallet-v1" === gc.config?.walletBillingProtocol && !gc.sessionId)
    throw new Error("缺少字幕工作識別碼");
  return (
    (n.protocol = "https:" === n.protocol ? "wss:" : "ws:"),
    (n.pathname =
      "sql-wallet-v1" === gc.config?.walletBillingProtocol
        ? `/caption-wallet-sessions/${encodeURIComponent(gc.sessionId)}/live-stt`
        : y),
    (n.search = ""),
    n.searchParams.set("sourceLang", gc.config?.sourceLang || "auto"),
    gc.sessionId && n.searchParams.set("sessionId", gc.sessionId),
    {
      url: n.toString(),
      scope: e,
      uid: t.uid,
      protocols: ["firebase-auth", t.idToken],
    }
  );
}
async function Gc() {
  const e = gc.speechGatewayHLiveBatchSocket,
    t = Nc();
  if (
    (e && e.__speechGatewayHLiveScope !== t && Jc("settings changed"),
    e?.readyState === WebSocket.OPEN &&
      e.__speechGatewayHLiveScope === t &&
      !0 === e.__speechGatewayHLiveBatchReady)
  )
    return e;
  if (gc.speechGatewayHLiveBatchConnectPromise)
    return gc.speechGatewayHLiveBatchConnectPromise;
  Kc();
  const n = gc.speechGatewayHLiveBatchConnectionId + 1;
  gc.speechGatewayHLiveBatchConnectionId = n;
  const a = (async () => {
    const e = await Hc();
    if (n !== gc.speechGatewayHLiveBatchConnectionId || gc.isStopping)
      throw new Error("GPT Live 長連線建立已取消");
    return new Promise((t, a) => {
      const r = new WebSocket(e.url, e.protocols);
      ((r.__speechGatewayHLiveScope = e.scope),
        (r.__speechGatewayHLiveUid = e.uid),
        (r.__speechGatewayHLiveBatchConnectionId = n),
        (r.__speechGatewayHLiveBatchReady = !1),
        (r.__speechGatewayHLiveBatchExpectedClose = !1),
        (gc.speechGatewayHLiveBatchSocket = r));
      let i = !1;
      const o = (e = null) => {
          i || ((i = !0), clearTimeout(s), e ? a(e) : t(r));
        },
        s = setTimeout(() => {
          const e = new Error("GPT Live 長連線 ready 逾時");
          ((e.code = "speechGatewayH_LIVE_WS_READY_TIMEOUT"),
            (r.__speechGatewayHLiveBatchExpectedClose = !0));
          try {
            r.close(1e3, "ready timeout");
          } catch {}
          o(e);
        }, xe);
      (r.addEventListener("open", () => {
        Nx(
          "stt.speechGatewayH_live.ws.open",
          { connectionId: n, persistent: !0 },
          { source: "offscreen", provider: ie },
        );
      }),
        r.addEventListener("message", (e) => {
          let t = null;
          try {
            t = JSON.parse(String(e.data || ""));
          } catch {
            return;
          }
          if ("ready" === t.type) {
            if (
              n !== gc.speechGatewayHLiveBatchConnectionId ||
              gc.speechGatewayHLiveBatchSocket !== r
            )
              return;
            return (
              (r.__speechGatewayHLiveBatchReady = !0),
              (gc.speechGatewayHLiveBatchReconnectAttempts = 0),
              Vc(r, n),
              Nx(
                "stt.speechGatewayH_live.ws.ready",
                {
                  connectionId: n,
                  persistent: !0 === t.persistent,
                  language: t.language || gc.config?.sourceLang || "auto",
                },
                { source: "offscreen", provider: ie },
              ),
              void o()
            );
          }
          Wc(t, r, n);
        }),
        r.addEventListener("error", () => {
          const e = new Error("GPT Live 長連線發生網路錯誤");
          ((e.code = "speechGatewayH_LIVE_WS_ERROR"), o(e));
        }),
        r.addEventListener("close", (e) => {
          const t = new Error(pD("GPT Live 長連線已關閉", e));
          ((t.code = "speechGatewayH_LIVE_WS_CLOSED"), o(t), $c(r, n, e));
        }));
    });
  })();
  gc.speechGatewayHLiveBatchConnectPromise = a;
  try {
    return await a;
  } finally {
    gc.speechGatewayHLiveBatchConnectPromise === a &&
      (gc.speechGatewayHLiveBatchConnectPromise = null);
  }
}
function Wc(e = {}, t, n) {
  if (
    n !== gc.speechGatewayHLiveBatchConnectionId ||
    t !== gc.speechGatewayHLiveBatchSocket
  )
    return;
  if ("pong" === e.type || "transcription.accepted" === e.type) return;
  const a = String(e.requestId || "");
  if ("transcription.completed" === e.type) {
    const t = gc.speechGatewayHLiveBatchPending.get(a);
    if (!t || t.connectionId !== n) return;
    return (
      gc.speechGatewayHLiveBatchPending.delete(a),
      clearTimeout(t.timeout),
      void t.resolve(Xc(e.data || {}, 200))
    );
  }
  if ("transcription.error" !== e.type) {
    if ("error" === e.type) {
      const a = new Error(e.message || "GPT Live 長連線後端錯誤");
      ((a.code = e.code || "speechGatewayH_LIVE_WS_SERVER_ERROR"),
        Qc(n, a),
        (t.__speechGatewayHLiveBatchExpectedClose = !1));
      try {
        t.close(1011, "server error");
      } catch {}
    }
  } else {
    const t = gc.speechGatewayHLiveBatchPending.get(a);
    if (!t || t.connectionId !== n) return;
    (gc.speechGatewayHLiveBatchPending.delete(a), clearTimeout(t.timeout));
    const r = dP(e.status || 502, 400, 599);
    t.resolve(
      Xc(
        {
          error: e.message || "GPT Live 轉錄失敗",
          code: e.code || "speechGatewayH_LIVE_TRANSCRIBE_ERROR",
          retryAfterMs: rP(e.retryAfterMs),
        },
        r,
      ),
    );
  }
}
function $c(e, t, n = {}) {
  jc(e);
  const a = !0 === e.__speechGatewayHLiveBatchExpectedClose;
  gc.speechGatewayHLiveBatchSocket === e &&
    (gc.speechGatewayHLiveBatchSocket = null);
  const r = new Error(pD("GPT Live 長連線已關閉", n));
  ((r.code = "speechGatewayH_LIVE_WS_CLOSED"),
    Qc(t, r),
    Nx(
      "stt.speechGatewayH_live.ws.closed",
      {
        connectionId: t,
        code: Number(n?.code || 0),
        reason: n?.reason || "",
        expected: a,
      },
      { source: "offscreen", provider: ie, level: a ? "info" : "warn" },
    ),
    a ||
      gc.isStopping ||
      !gc.acceptingNewSttWork ||
      gc.activeSttProvider !== ie ||
      zc({ reason: n?.reason || `code ${n?.code || 0}` }));
}
function Vc(e, t) {
  (jc(),
    (gc.speechGatewayHLiveBatchHeartbeatTimer = setInterval(() => {
      if (
        gc.speechGatewayHLiveBatchSocket === e &&
        t === gc.speechGatewayHLiveBatchConnectionId &&
        e.readyState === WebSocket.OPEN
      )
        try {
          e.send(JSON.stringify({ type: "ping", atMs: Date.now() }));
        } catch {}
      else jc(e);
    }, Ee)));
}
function jc(e = null) {
  (e &&
    gc.speechGatewayHLiveBatchSocket &&
    gc.speechGatewayHLiveBatchSocket !== e) ||
    (gc.speechGatewayHLiveBatchHeartbeatTimer &&
      clearInterval(gc.speechGatewayHLiveBatchHeartbeatTimer),
    (gc.speechGatewayHLiveBatchHeartbeatTimer = null));
}
function Kc(e = {}) {
  (gc.speechGatewayHLiveBatchReconnectTimer &&
    clearTimeout(gc.speechGatewayHLiveBatchReconnectTimer),
    (gc.speechGatewayHLiveBatchReconnectTimer = null),
    e.resetAttempts && (gc.speechGatewayHLiveBatchReconnectAttempts = 0));
}
function zc(e = {}) {
  if (
    gc.speechGatewayHLiveBatchReconnectTimer ||
    gc.isStopping ||
    !gc.acceptingNewSttWork ||
    gc.activeSttProvider !== ie
  )
    return !1;
  gc.speechGatewayHLiveBatchReconnectAttempts += 1;
  const t = Math.min(
    De,
    Pe * 2 ** Math.max(0, gc.speechGatewayHLiveBatchReconnectAttempts - 1),
  );
  return (
    (gc.speechGatewayHLiveBatchReconnectTimer = setTimeout(() => {
      ((gc.speechGatewayHLiveBatchReconnectTimer = null),
        Gc().catch((t) => {
          (Nx(
            "stt.speechGatewayH_live.ws.reconnect_failed",
            {
              attempt: gc.speechGatewayHLiveBatchReconnectAttempts,
              reason: e.reason || "",
              error: t?.message || String(t || ""),
            },
            { source: "offscreen", provider: ie, level: "warn" },
          ),
            zc({ reason: t?.message || "reconnect-failed" }));
        }));
    }, t)),
    !0
  );
}
function Qc(e, t) {
  for (const [n, a] of gc.speechGatewayHLiveBatchPending.entries()) {
    if (a.connectionId !== e) continue;
    (gc.speechGatewayHLiveBatchPending.delete(n), clearTimeout(a.timeout));
    const r = new Error(t?.message || "GPT Live 長連線已關閉");
    ((r.name = t?.name || "Error"),
      (r.code = t?.code || "speechGatewayH_LIVE_WS_CLOSED"),
      (r.speechGatewayHLiveWsSent = !0 === a.sent),
      a.reject(r));
  }
}
function Jc(e = "closed", t = {}) {
  (Kc({ resetAttempts: !1 !== t.resetAttempts }), jc());
  const n = gc.speechGatewayHLiveBatchSocket,
    a = Number(
      n?.__speechGatewayHLiveBatchConnectionId ||
        gc.speechGatewayHLiveBatchConnectionId ||
        0,
    );
  if (
    ((gc.speechGatewayHLiveBatchSocket = null),
    (gc.speechGatewayHLiveBatchConnectPromise = null),
    (gc.speechGatewayHLiveBatchConnectionId = a + 1),
    !1 !== t.rejectPending)
  ) {
    const t = new Error(`GPT Live 長連線已關閉：${e}`);
    ((t.code = "speechGatewayH_LIVE_WS_CLOSED"), Qc(a, t));
  }
  if (!n) return !1;
  n.__speechGatewayHLiveBatchExpectedClose = !0;
  try {
    n.readyState !== WebSocket.CLOSED && n.close(1e3, String(e).slice(0, 100));
  } catch {}
  return !0;
}
function Xc(e, t = 200) {
  const n = Math.round(dP(t, 100, 599)),
    a = JSON.stringify(e || {});
  return "function" == typeof Response
    ? new Response(a, {
        status: n,
        headers: { "Content-Type": "application/json" },
      })
    : {
        ok: n >= 200 && n < 300,
        status: n,
        json: async () => JSON.parse(a),
        text: async () => a,
      };
}
async function Zc(e, t = {}, n = {}) {
  const a = rP(n.startedAtMs) || Date.now(),
    r = Math.max(1e3, Math.round(Number(n.timeoutMs) || 3e4)),
    i = await Gc(),
    o =
      "sql-wallet-v1" === gc.config?.walletBillingProtocol
        ? await gP()
        : await uP();
  if (!o?.idToken || o.uid !== i.__speechGatewayHLiveUid)
    throw (
      Jc("account changed"),
      Object.assign(new Error("登入帳號已改變，請重新開始字幕。"), {
        code: "wallet_session_changed",
      })
    );
  sv(t, "before-speechGatewayH-live-send");
  const s = Number(i.__speechGatewayHLiveBatchConnectionId || 0),
    l = gc.speechGatewayHLiveBatchRequestSequence + 1;
  gc.speechGatewayHLiveBatchRequestSequence = l;
  const c = String(t.requestId || `batch-${l}`),
    d = `${c}:${s}:${l}`,
    u = Math.max(0, Date.now() - a),
    m = Math.max(1e3, r - u),
    g = e instanceof Uint8Array ? e : new Uint8Array(e || []);
  return new Promise((e, n) => {
    const a = setTimeout(() => {
        const e = gc.speechGatewayHLiveBatchPending.get(d);
        if (!e) return;
        gc.speechGatewayHLiveBatchPending.delete(d);
        const t = new Error(`GPT Live STT 轉錄逾時（${Math.round(r / 1e3)}s）`);
        ((t.code = "speechGatewayH_LIVE_TRANSCRIBE_TIMEOUT"),
          (t.speechGatewayHLiveWsSent = !0 === e.sent),
          n(t));
      }, m),
      o = {
        connectionId: s,
        generationRequestId: c,
        resolve: e,
        reject: n,
        timeout: a,
        sent: !1,
      };
    gc.speechGatewayHLiveBatchPending.set(d, o);
    try {
      (i.send(
        JSON.stringify({
          ...t,
          type: "transcribe",
          requestId: d,
          generationRequestId: c,
          timelineRevision: rP(t.timelineRevision) ?? gc.timelineRevision,
          audioBase64: TD(g),
        }),
      ),
        (o.sent = !0));
    } catch (e) {
      (gc.speechGatewayHLiveBatchPending.delete(d),
        clearTimeout(a),
        (e.speechGatewayHLiveWsSent = !1),
        n(e));
    }
  });
}
async function Yc() {
  const e =
    "sql-wallet-v1" === gc.config?.walletBillingProtocol
      ? await ed("st-d")
      : null;
  vP("token", "正在取得 STT token");
  const n = e ? "" : await zd(),
    a = gc.transcriberConnectionId + 1;
  gc.transcriberConnectionId = a;
  const r = id(),
    i = new URLSearchParams({
      model_id: t,
      token: n,
      include_timestamps: "true",
      include_language_detection: "true",
      commit_strategy: r,
      vad_silence_threshold_secs: String(
        gc.config.vadSilenceThresholdSecs ?? w,
      ),
      vad_threshold: String(gc.config.vadThreshold ?? k),
      min_speech_duration_ms: String(gc.config.minSpeechDurationMs ?? C),
      min_silence_duration_ms: String(gc.config.minSilenceDurationMs ?? A),
    });
  (gc.config.sourceLang &&
    "auto" !== gc.config.sourceLang &&
    i.set("language_code", gc.config.sourceLang),
    (gc.websocket = e
      ? new WebSocket(e.url, e.protocols)
      : new WebSocket(jd(i))),
    e && td(gc.websocket, e),
    gc.websocket.addEventListener("open", () => {
      a === gc.transcriberConnectionId && vP("connected", "STT 已連線");
    }),
    gc.websocket.addEventListener("message", (e) => {
      a === gc.transcriberConnectionId && Db(e.data);
    }),
    gc.websocket.addEventListener("error", () => {
      a === gc.transcriberConnectionId && yP("STT WebSocket 發生錯誤");
    }),
    gc.websocket.addEventListener("close", (e) => {
      a === gc.transcriberConnectionId &&
        !gc.isStopping &&
        !gc.isResettingWebSocket &&
        Date.now() > gc.suppressWebSocketCloseUntilMs &&
        yP(pD("STT 連線已關閉", e));
    }),
    await dD(gc.websocket),
    e && (await nd(gc.websocket)));
}
async function ed(e) {
  const t = Nc(),
    n = gc.activeSttProvider,
    a = await gP();
  if (!a?.idToken || !a.uid) throw new Error("請先登入會員");
  if (t !== Nc() || n !== gc.activeSttProvider || gc.isStopping)
    throw new Error("字幕工作已切換");
  const r = new URL(gc.config.backendUrl || T);
  ((r.protocol = "https:" === r.protocol ? "wss:" : "ws:"),
    (r.pathname = `/caption-wallet-sessions/${encodeURIComponent(gc.sessionId)}/stream-stt`),
    (r.search = ""),
    r.searchParams.set("route", e),
    r.searchParams.set("sourceLang", gc.config.sourceLang || "auto"),
    r.searchParams.set("audioSpeed", String(zP())));
  const i = LP(e);
  if (i !== LP(gc.config.sttProvider)) {
    if (!Wy(i, "startup")) throw new Error("目前未允許額外付費的辨識加速");
    (r.searchParams.set("purpose", "startup"),
      r.searchParams.set("generation", String(gc.timelineRevision || 0)));
  }
  if ("st-d" === e) {
    r.searchParams.set("commitStrategy", id());
    for (const [e, t] of [
      ["vadSilenceThresholdSecs", w],
      ["vadThreshold", k],
      ["minSpeechDurationMs", C],
      ["minSilenceDurationMs", A],
    ])
      r.searchParams.set(e, String(gc.config[e] ?? t));
  }
  return {
    url: r.toString(),
    protocols: ["firebase-auth", a.idToken],
    wallet: !0,
    scope: t,
    uid: a.uid,
    startup: "startup" === r.searchParams.get("purpose"),
  };
}
function td(e, t) {
  ((e.__walletRealtime = t),
    (e.__walletCheckpointSequence = 0),
    e.addEventListener("message", (t) => {
      let n;
      try {
        n = JSON.parse(PT(t.data));
      } catch {
        return;
      }
      ("ready" !== n?.type && "session_started" !== n?.message_type) ||
        (e.__walletReady = !0);
    }),
    e.addEventListener("close", () => {
      t.startup &&
        e.__walletReady &&
        gc.websocket === e &&
        t.scope === Nc() &&
        Ny("stream-ended") &&
        Uc().catch((e) => yP(e.message));
    }));
}
function nd(e) {
  return e.__walletReady
    ? Promise.resolve()
    : new Promise((t, n) => {
        const a = (a) => {
            (clearTimeout(o),
              e.removeEventListener("message", i),
              e.removeEventListener("close", r),
              e.removeEventListener("error", r),
              a ? (e.close(), n(a)) : t());
          },
          r = () => a(new Error("即時辨識連線失敗")),
          i = () => {
            e.__walletReady && a();
          },
          o = setTimeout(() => a(new Error("等待即時辨識連線逾時")), 2e4);
        (e.addEventListener("message", i),
          e.addEventListener("close", r),
          e.addEventListener("error", r));
      });
}
function ad(e, t, n, a) {
  if (
    gc.isStopping ||
    gc.stopRequestedAtMs ||
    e.__walletRealtime?.scope !== Nc()
  )
    throw new Error("字幕工作已切換");
  const r = HE()
    ? mM({ chunks: [n], timelineRevision: gc.timelineRevision })
    : null;
  if (HE() && !r) throw new Error("缺少音訊時間範圍");
  const i = 32e3 * a;
  for (let n = 0; n < t.length; n += i) {
    const a = Math.min(t.length, n + i),
      o = r ? r.endMs - r.startMs : 0;
    e.send(
      JSON.stringify({
        type: "wallet_audio",
        audio: TD(t.subarray(n, a)),
        ...(r
          ? {
              audioWindow: {
                ...r,
                startMs: Math.round(r.startMs + (o * n) / t.length),
                endMs: Math.round(r.startMs + (o * a) / t.length),
              },
            }
          : {}),
      }),
    );
  }
}
function rd() {
  const e = gc.websocket;
  if (!e?.__walletRealtime || !HE()) return Promise.resolve();
  if (e.__walletCheckpointPending) return e.__walletCheckpointPending;
  const t = "checkpoint-" + ++e.__walletCheckpointSequence,
    n = new Promise((n, a) => {
      const r = (t) => {
          (clearTimeout(s),
            e.removeEventListener("message", i),
            e.removeEventListener("close", o),
            t ? a(t) : n());
        },
        i = (e) => {
          let n;
          try {
            n = JSON.parse(PT(e.data));
          } catch {
            return;
          }
          "wallet_checkpoint" === n?.type && n.id === t && r();
        },
        o = () => r(new Error("即時音訊連線已結束")),
        s = setTimeout(() => r(new Error("音訊用量確認逾時")), 8e3);
      (e.addEventListener("message", i), e.addEventListener("close", o));
      try {
        e.send(JSON.stringify({ type: "wallet_checkpoint", id: t }));
      } catch (e) {
        r(e);
      }
    });
  return (
    (e.__walletCheckpointPending = n.finally(() => {
      e.__walletCheckpointPending = null;
    })),
    e.__walletCheckpointPending
  );
}
function id() {
  return Sg() ? "manual" : "vad";
}
async function od() {
  const e = gc.transcriberConnectionId + 1;
  ((gc.transcriberConnectionId = e), xT());
  const t = Kd();
  (vP("connecting", "正在連線 speechEngineA local ASR"),
    (gc.websocket = new WebSocket(t)),
    (gc.websocket.binaryType = "arraybuffer"),
    (gc.websocket.__liveSubtitleSessionReady = !1),
    gc.websocket.addEventListener("open", () => {
      e === gc.transcriberConnectionId &&
        (gc.websocket.send(
          JSON.stringify({
            type: "config",
            language: oD(gc.config.sourceLang),
          }),
        ),
        vP("connected", "speechEngineA local ASR 已連線"));
    }),
    gc.websocket.addEventListener("message", (t) => {
      e === gc.transcriberConnectionId && Fb(t.data);
    }),
    gc.websocket.addEventListener("error", () => {
      e === gc.transcriberConnectionId &&
        yP("speechEngineA local ASR WebSocket 發生錯誤");
    }),
    gc.websocket.addEventListener("close", (t) => {
      e === gc.transcriberConnectionId &&
        !gc.isStopping &&
        !gc.isResettingWebSocket &&
        Date.now() > gc.suppressWebSocketCloseUntilMs &&
        yP(`speechEngineA local ASR 連線已關閉 (${t.code})`);
    }),
    await dD(gc.websocket),
    gc.config?.sourceStartupCaptureHold && (await uD(gc.websocket, e)));
}
async function sd() {
  if (
    !0 === gc.websocket?.__speechEngineARealtimeManaged &&
    "active" === gc.websocket?.__speechEngineARealtimeRole &&
    gc.websocket?.readyState === WebSocket.OPEN &&
    !0 === gc.websocket?.__liveSubtitleSessionReady
  )
    return gc.websocket;
  if (gc.speechEngineARealtimeConnectPromise)
    return gc.speechEngineARealtimeConnectPromise;
  const e = gc.transcriberConnectionId + 1;
  gc.transcriberConnectionId = e;
  const t = (async () => {
    (wd(), Td("connection-replaced"), xT());
    const t = await Vd();
    if (
      e !== gc.transcriberConnectionId ||
      gc.isStopping ||
      !1 === gc.acceptingNewSttWork ||
      LP(gc.activeSttProvider) !== ae
    )
      throw new Error("迅聽 Mini 連線建立已被較新的字幕狀態取代");
    vP("connecting", "正在連線迅聽 Mini 即時版");
    const n = ld(t, e, "active");
    if (
      ((gc.websocket = n),
      await dD(n),
      (gc.config?.sourceStartupCaptureHold || t.wallet) && (await uD(n, e)),
      e !== gc.transcriberConnectionId ||
        gc.websocket !== n ||
        "active" !== n.__speechEngineARealtimeRole)
    )
      throw new Error("迅聽 Mini 連線在 ready 前已被取代");
    return n;
  })();
  gc.speechEngineARealtimeConnectPromise = t;
  try {
    return await t;
  } finally {
    gc.speechEngineARealtimeConnectPromise === t &&
      (gc.speechEngineARealtimeConnectPromise = null);
  }
}
function ld(e, t, n = "active") {
  const a = new WebSocket(e.url, e.protocols);
  return (
    (a.binaryType = "arraybuffer"),
    (a.__liveSubtitleSessionReady = !1),
    (a.__speechEngineARealtimeManaged = !0),
    (a.__speechEngineARealtimeRole = n),
    (a.__speechEngineAConnectionId = t),
    (a.__speechEngineAExpectedClose = !1),
    (a.__speechEngineAReadyAtMs = 0),
    e.wallet && td(a, e),
    a.addEventListener("open", () => {
      t === gc.transcriberConnectionId &&
        "retired" !== a.__speechEngineARealtimeRole &&
        (e.wallet ||
          a.send(
            JSON.stringify({
              type: "config",
              language: oD(gc.config.sourceLang),
            }),
          ),
        "active" === a.__speechEngineARealtimeRole &&
          vP(
            "connecting",
            e.wallet
              ? "已連接字幕服務，等待語音辨識就緒"
              : "迅聽 Mini 已直連 Salad，等待 GPU ready",
          ));
    }),
    a.addEventListener("message", (e) => {
      dd(a, e.data, t);
    }),
    a.addEventListener("error", () => {
      t !== gc.transcriberConnectionId ||
        a.__speechEngineAExpectedClose ||
        ("active" === a.__speechEngineARealtimeRole
          ? vP("connecting", "迅聽 Mini GPU 暫時無法連線，準備重試")
          : "standby" === a.__speechEngineARealtimeRole &&
            Nx(
              "stt.speechEngineA_realtime.rotation_standby_error",
              {
                rotationSequence: gc.speechEngineARealtimeRotationSequence + 1,
              },
              { source: "offscreen", level: "warn", provider: ae },
            ));
    }),
    a.addEventListener("close", (e) => {
      ud(a, e, t);
    }),
    a
  );
}
function cd(e) {
  try {
    return JSON.parse(PT(e));
  } catch {
    return null;
  }
}
function dd(e, t, n) {
  if (
    n !== gc.transcriberConnectionId ||
    "retired" === e.__speechEngineARealtimeRole
  )
    return;
  const a = cd(t),
    r = e.__speechEngineARealtimeRole;
  if (
    ("active" === r &&
      gc.websocket === e &&
      (gc.speechEngineARealtimeLastUpstreamMessageAtMs = Date.now()),
    "ready" === a?.type)
  )
    return (
      (e.__liveSubtitleSessionReady = !0),
      (e.__speechEngineAReadyAtMs = Date.now()),
      void ("active" === r && gc.websocket === e
        ? (Fb(t), xf("connection-ready"), fd(e, n))
        : "standby" === r &&
          gc.speechEngineARealtimeStandbySocket === e &&
          (Nx(
            "stt.speechEngineA_realtime.rotation_standby_ready",
            {
              rotationSequence: gc.speechEngineARealtimeRotationSequence + 1,
              activeAgeMs: Math.max(
                0,
                Date.now() -
                  (rP(gc.websocket?.__speechEngineAReadyAtMs) || Date.now()),
              ),
              forcePending: !0 === gc.speechEngineARealtimeRotationForcePending,
            },
            { source: "offscreen", provider: ae },
          ),
          (gc.speechEngineARealtimeRotationForcePending ||
            Date.now() >= gc.speechEngineARealtimeRotationDeadlineAtMs) &&
            Md("force-deadline")))
    );
  if ("standby" !== r) {
    if ("draining" === r)
      return (
        Fb(t),
        void (
          "final" === a?.type &&
          !0 !== a.endpoint &&
          vd(e, "terminal-final")
        )
      );
    if ("active" === r && gc.websocket === e) {
      if (gc.speechEngineARealtimeDrainingSocket) {
        const e = gc.speechEngineARealtimeRotationBufferedMessages;
        return (e.push(t), void (e.length > Ko && e.splice(0, e.length - Ko)));
      }
      (Fb(t),
        "final" === a?.type &&
          !0 ===
            gc.speechEngineARealtimeStandbySocket?.__liveSubtitleSessionReady &&
          Md("safe-final-boundary"));
    }
  } else
    "error" === a?.type &&
      Nx(
        "stt.speechEngineA_realtime.rotation_standby_rejected",
        { code: wD(a.code || ""), message: wD(a.message || "") },
        { source: "offscreen", level: "warn", provider: ae },
      );
}
function ud(e, t, n) {
  if (n !== gc.transcriberConnectionId) return;
  const a = e.__speechEngineARealtimeRole;
  if ("retired" !== a)
    if ("draining" !== a) {
      if ("standby" === a)
        return (
          gc.speechEngineARealtimeStandbySocket === e &&
            (gc.speechEngineARealtimeStandbySocket = null),
          (e.__speechEngineARealtimeRole = "retired"),
          void (
            e.__speechEngineAExpectedClose ||
            (Nx(
              "stt.speechEngineA_realtime.rotation_standby_closed",
              {
                closeCode: Number(t?.code) || 0,
                closeReason: wD(t?.reason || ""),
              },
              { source: "offscreen", level: "warn", provider: ae },
            ),
            Sd(gc.websocket, n))
          )
        );
      if (
        "active" === a &&
        (gc.websocket === e && (gc.websocket = null),
        (e.__speechEngineARealtimeRole = "retired"),
        !e.__speechEngineAExpectedClose &&
          (bd("unexpected-active-close"),
          !gc.isStopping &&
            !gc.isResettingWebSocket &&
            Date.now() > gc.suppressWebSocketCloseUntilMs))
      ) {
        if (
          md("socket-closed", {
            closeCode: Number(t?.code) || 0,
            closeReason: wD(t?.reason || ""),
          })
        )
          return;
        kd(t) || yP(`迅聽 Mini 即時版連線已關閉 (${t.code})`);
      }
    } else vd(e, "old-socket-closed");
}
function md(e = "connection-lost", t = {}) {
  if (
    gc.isStopping ||
    !1 === gc.acceptingNewSttWork ||
    LP(gc.activeSttProvider) !== ae ||
    !gc.mediaStream
  )
    return !1;
  if (gc.speechEngineARealtimeRecoveryActive && !gc.websocket)
    return (
      kd({
        code: Number(t.closeCode) || 0,
        reason: wD(t.closeReason || t.error || e),
      }),
      !1
    );
  const n = wD(gc.speechEngineALastTranscript),
    a = n ? $b(n) : wD(gc.speechEngineAPendingText || gc.currentInterimText);
  a &&
    fT(
      a,
      n,
      gc.speechEngineAPendingTiming ||
        gc.currentInterimTiming ||
        QA(null, { isFinal: !0 }),
      {
        reason: "same-provider-recovery",
        pendingText: a,
        pendingAgeMs: Math.max(
          0,
          Date.now() - (rP(gc.speechEngineAPendingStartedAt) || Date.now()),
        ),
      },
    );
  const r = Af();
  gc.speechEngineARealtimeRecoveryActive = !0;
  const i = Td("same-provider-recovery");
  ((gc.websocket = null), uT(), (gc.vad = Ry()));
  const o = Rf(r, e),
    s = kd({
      code: Number(t.closeCode) || 0,
      reason: wD(t.closeReason || t.error || e),
    });
  return (
    Nx(
      "stt.speechEngineA_realtime.same_provider_recovery_activated",
      {
        reason: wD(e) || "connection-lost",
        recoveryProvider: ae,
        pendingTextChars: Array.from(a).length,
        totalAudioMs: Math.round(gc.totalAudioMs || 0),
        sttBillableAudioMs: Math.round(QE()),
        recoveryChunks: o.chunks,
        recoveryDurationMs: o.durationMs,
        recoverySegments: o.segments,
        recoveryMediaStartTime: aP(o.mediaStartTime),
        recoveryMediaEndTime: aP(o.mediaEndTime),
        closedSockets: i,
        reconnectScheduled: s,
        ...t,
      },
      { source: "offscreen", level: "warn", provider: ae },
    ),
    vP("connecting", "迅聽 Mini 連線中斷，正在以相同聽寫服務補轉並重連"),
    !0
  );
}
function gd(e, t, n = null) {
  return Boolean(
    e &&
      !e.__walletRealtime &&
      gc.websocket === e &&
      "active" === e.__speechEngineARealtimeRole &&
      t === gc.transcriberConnectionId &&
      (null === n || n === gc.speechEngineARealtimeRotationEpoch) &&
      LP(gc.activeSttProvider) === ae &&
      !1 !== gc.acceptingNewSttWork &&
      !gc.isStopping &&
      !gc.isResettingWebSocket,
  );
}
function pd() {
  (gc.speechEngineARealtimeRotationPrepareTimer &&
    clearTimeout(gc.speechEngineARealtimeRotationPrepareTimer),
    gc.speechEngineARealtimeRotationForceTimer &&
      clearTimeout(gc.speechEngineARealtimeRotationForceTimer),
    (gc.speechEngineARealtimeRotationPrepareTimer = null),
    (gc.speechEngineARealtimeRotationForceTimer = null),
    (gc.speechEngineARealtimeRotationForcePending = !1),
    (gc.speechEngineARealtimeRotationDeadlineAtMs = 0));
}
function fd(e, t) {
  if (!gd(e, t)) return !1;
  (pd(), (gc.speechEngineARealtimeRotationEpoch += 1));
  const n = gc.speechEngineARealtimeRotationEpoch,
    a = rP(e.__speechEngineAReadyAtMs) || Date.now(),
    r = Math.max(0, Date.now() - a),
    i = Math.max(0, Fo - r),
    o = Math.max(0, Oo - r);
  return (
    (gc.speechEngineARealtimeRotationDeadlineAtMs = a + Oo),
    (gc.speechEngineARealtimeRotationPrepareTimer = setTimeout(() => {
      ((gc.speechEngineARealtimeRotationPrepareTimer = null),
        hd(e, t, n).catch((a) => {
          (Nx(
            "stt.speechEngineA_realtime.rotation_prepare_failed",
            {
              error: a.message || String(a || ""),
              rotationSequence: gc.speechEngineARealtimeRotationSequence + 1,
            },
            { source: "offscreen", level: "warn", provider: ae },
          ),
            Sd(e, t, n));
        }));
    }, i)),
    (gc.speechEngineARealtimeRotationForceTimer = setTimeout(() => {
      ((gc.speechEngineARealtimeRotationForceTimer = null),
        gd(e, t, n) &&
          (!0 !==
          gc.speechEngineARealtimeStandbySocket?.__liveSubtitleSessionReady
            ? ((gc.speechEngineARealtimeRotationForcePending = !0),
              Nx(
                "stt.speechEngineA_realtime.rotation_force_waiting",
                {
                  activeAgeMs: Math.max(0, Date.now() - a),
                  hasStandbySocket: Boolean(
                    gc.speechEngineARealtimeStandbySocket,
                  ),
                },
                { source: "offscreen", level: "warn", provider: ae },
              ),
              gc.speechEngineARealtimeStandbySocket ||
                gc.speechEngineARealtimeRotationPreparing ||
                Sd(e, t, n, 0))
            : Md("force-deadline")));
    }, o)),
    !0
  );
}
async function hd(e, t, n) {
  if (!gd(e, t, n)) return !1;
  if (
    gc.speechEngineARealtimeStandbySocket ||
    gc.speechEngineARealtimeRotationPreparing
  )
    return !1;
  gc.speechEngineARealtimeRotationPreparing = !0;
  try {
    const a = await Vd();
    if (!gd(e, t, n)) return !1;
    const r = ld(a, t, "standby");
    return (
      (gc.speechEngineARealtimeStandbySocket = r),
      Nx(
        "stt.speechEngineA_realtime.rotation_standby_opening",
        {
          rotationSequence: gc.speechEngineARealtimeRotationSequence + 1,
          activeAgeMs: Math.max(
            0,
            Date.now() - (rP(e.__speechEngineAReadyAtMs) || Date.now()),
          ),
        },
        { source: "offscreen", provider: ae },
      ),
      await dD(r),
      !0
    );
  } finally {
    gc.speechEngineARealtimeRotationPreparing = !1;
  }
}
function Sd(e, t, n = null, a = 1500) {
  const r = n ?? gc.speechEngineARealtimeRotationEpoch;
  return !(
    !gd(e, t, r) ||
    gc.speechEngineARealtimeStandbySocket ||
    gc.speechEngineARealtimeRotationPreparing ||
    gc.speechEngineARealtimeRotationPrepareTimer ||
    ((gc.speechEngineARealtimeRotationPrepareTimer = setTimeout(
      () => {
        ((gc.speechEngineARealtimeRotationPrepareTimer = null),
          hd(e, t, r).catch((n) => {
            (Nx(
              "stt.speechEngineA_realtime.rotation_prepare_failed",
              { error: n.message || String(n || ""), retry: !0 },
              { source: "offscreen", level: "warn", provider: ae },
            ),
              Sd(e, t, r));
          }));
      },
      Math.max(0, a),
    )),
    0)
  );
}
function Md(e = "safe-final-boundary") {
  const t = gc.websocket,
    n = gc.speechEngineARealtimeStandbySocket,
    a = gc.transcriberConnectionId;
  if (
    !gd(t, a) ||
    !n ||
    n.readyState !== WebSocket.OPEN ||
    !0 !== n.__liveSubtitleSessionReady
  )
    return !1;
  (pd(),
    (gc.speechEngineARealtimeRotationPreparing = !1),
    (gc.speechEngineARealtimeStandbySocket = null),
    (gc.speechEngineARealtimeDrainingSocket = t),
    (gc.speechEngineARealtimeRotationBufferedMessages = []),
    (gc.speechEngineARealtimeRotationSequence += 1),
    (t.__speechEngineARealtimeRole = "draining"),
    (t.__speechEngineAExpectedClose = !0),
    (n.__speechEngineARealtimeRole = "active"),
    (gc.websocket = n),
    fd(n, a),
    (gc.speechEngineARealtimeRotationDrainTimer = setTimeout(() => {
      ((gc.speechEngineARealtimeRotationDrainTimer = null),
        vd(t, "drain-timeout"));
    }, No)),
    Nx(
      "stt.speechEngineA_realtime.rotation_switched",
      {
        rotationSequence: gc.speechEngineARealtimeRotationSequence,
        reason: e,
        oldSocketAgeMs: Math.max(
          0,
          Date.now() - (rP(t.__speechEngineAReadyAtMs) || Date.now()),
        ),
        standbyReadyAgeMs: Math.max(
          0,
          Date.now() - (rP(n.__speechEngineAReadyAtMs) || Date.now()),
        ),
        drainMs: No,
      },
      { source: "offscreen", provider: ae },
    ));
  try {
    t.send(JSON.stringify({ type: "stop" }));
  } catch {
    vd(t, "stop-send-failed");
  }
  return !0;
}
function vd(e, t = "terminal-final") {
  if (!e || gc.speechEngineARealtimeDrainingSocket !== e) return !1;
  (gc.speechEngineARealtimeRotationDrainTimer &&
    clearTimeout(gc.speechEngineARealtimeRotationDrainTimer),
    (gc.speechEngineARealtimeRotationDrainTimer = null),
    (gc.speechEngineARealtimeDrainingSocket = null));
  const n = gc.speechEngineARealtimeRotationBufferedMessages.splice(0);
  ((e.__speechEngineAExpectedClose = !0),
    (e.__speechEngineARealtimeRole = "retired"));
  try {
    e.readyState !== WebSocket.CLOSED && e.close(1e3, "rotation drained");
  } catch {}
  xT();
  for (const e of n) Fb(e);
  return (
    Nx(
      "stt.speechEngineA_realtime.rotation_drained",
      {
        rotationSequence: gc.speechEngineARealtimeRotationSequence,
        reason: t,
        replayedMessages: n.length,
      },
      { source: "offscreen", provider: ae },
    ),
    !0
  );
}
function yd(e, t) {
  if (!e) return !1;
  ((e.__speechEngineAExpectedClose = !0),
    (e.__speechEngineARealtimeRole = "retired"));
  try {
    e.readyState !== WebSocket.CLOSED && e.close(1e3, t);
  } catch {}
  return !0;
}
function bd(e = "cancelled") {
  (pd(),
    gc.speechEngineARealtimeRotationDrainTimer &&
      clearTimeout(gc.speechEngineARealtimeRotationDrainTimer),
    (gc.speechEngineARealtimeRotationDrainTimer = null),
    (gc.speechEngineARealtimeRotationEpoch += 1),
    (gc.speechEngineARealtimeRotationPreparing = !1));
  const t = gc.speechEngineARealtimeStandbySocket,
    n = gc.speechEngineARealtimeDrainingSocket;
  ((gc.speechEngineARealtimeStandbySocket = null),
    (gc.speechEngineARealtimeDrainingSocket = null),
    (gc.speechEngineARealtimeRotationBufferedMessages = []));
  let a = 0;
  return (yd(t, e) && (a += 1), n !== t && yd(n, e) && (a += 1), a);
}
function Td(e = "cancelled") {
  const t =
    !0 === gc.websocket?.__speechEngineARealtimeManaged ? gc.websocket : null;
  let n = bd(e);
  return (
    t && (gc.websocket === t && (gc.websocket = null), yd(t, e) && (n += 1)),
    n
  );
}
function wd(e = {}) {
  (gc.speechEngineARealtimeReconnectTimer &&
    clearTimeout(gc.speechEngineARealtimeReconnectTimer),
    (gc.speechEngineARealtimeReconnectTimer = null),
    e.resetAttempts && (gc.speechEngineARealtimeReconnectAttempts = 0));
}
function kd(e = {}) {
  if (
    "sql-wallet-v1" === gc.config?.walletBillingProtocol &&
    1008 === Number(e.code)
  )
    return !1;
  if (
    gc.isStopping ||
    !1 === gc.acceptingNewSttWork ||
    LP(gc.activeSttProvider) !== ae ||
    !gc.mediaStream
  )
    return !1;
  if (gc.speechEngineARealtimeConnectPromise) return !0;
  if (gc.speechEngineARealtimeReconnectTimer) return !0;
  const t =
    Math.max(0, Number(gc.speechEngineARealtimeReconnectAttempts) || 0) + 1;
  gc.speechEngineARealtimeReconnectAttempts = t;
  const n = Math.min(qo, Uo * 2 ** Math.min(4, t - 1));
  return (
    Nx(
      "stt.speechEngineA_realtime.reconnect_scheduled",
      {
        attempt: t,
        delayMs: n,
        closeCode: Number(e?.code) || 0,
        closeReason: wD(e?.reason || ""),
      },
      { source: "offscreen", level: "warn", provider: ae },
    ),
    vP("connecting", `迅聽 Mini GPU 準備中，${Math.ceil(n / 1e3)} 秒後重試`),
    (gc.speechEngineARealtimeReconnectTimer = setTimeout(() => {
      ((gc.speechEngineARealtimeReconnectTimer = null),
        !gc.isStopping &&
          !1 !== gc.acceptingNewSttWork &&
          LP(gc.activeSttProvider) === ae &&
          gc.mediaStream &&
          sd().catch((e) => {
            (Nx(
              "stt.speechEngineA_realtime.reconnect_failed",
              { attempt: t, error: e.message || String(e || "") },
              { source: "offscreen", level: "warn", provider: ae },
            ),
              kd({ code: 0, reason: e.message || "connect-failed" }));
          }));
    }, n)),
    !0
  );
}
function Cd(e = gc.config?.sourceLang) {
  const t = String(e || "")
    .toLowerCase()
    .trim()
    .replace(/_/g, "-");
  return "en" === t || "eng" === t || t.startsWith("en-")
    ? "en"
    : "ja" === t || "jpn" === t || t.startsWith("ja-")
      ? "ja"
      : "";
}
function Ad() {
  return Boolean(
    "sql-wallet-v1" !== gc.config?.walletBillingProtocol &&
      !1 !== gc.textEngineGAccepting &&
      !gc.isStopping &&
      fA(gc.config?.provider) &&
      "en" === Cd(),
  );
}
async function Rd() {
  const e = await uP();
  if (!e?.idToken)
    throw new Error(
      "請先在插件登入，Salad 即譯實驗引擎 直連需要 Firebase token。",
    );
  const t = new URL(gc.config?.backendUrl || T);
  ((t.pathname = ve), (t.search = ""));
  const n = new AbortController(),
    a = setTimeout(() => n.abort(), ye);
  let r,
    i = {};
  try {
    r = await fetch(t.toString(), {
      method: "POST",
      headers: hP(e),
      body: JSON.stringify({
        sourceLang: gc.config?.sourceLang || "eng",
        targetLang: gc.config?.targetLang || "zh",
        sessionId: gc.sessionId || "",
      }),
      signal: n.signal,
    });
    const a = await r.text();
    try {
      i = a ? JSON.parse(a) : {};
    } catch {
      i = {};
    }
  } catch (e) {
    if ("AbortError" === e?.name)
      throw new Error("取得 Salad 即譯實驗引擎 直連票券逾時");
    throw new Error(`取得 Salad 即譯實驗引擎 直連票券失敗: ${e?.message || e}`);
  } finally {
    clearTimeout(a);
  }
  if (!r?.ok)
    throw new Error(
      i.error || `取得 Salad 即譯實驗引擎 直連票券失敗 (${r?.status || 0})`,
    );
  const o = new URL(String(i.url || "")),
    s =
      "ws:" === o.protocol &&
      ["127.0.0.1", "localhost", "[::1]"].includes(o.hostname);
  if ("wss:" !== o.protocol && !s)
    throw new Error("Salad 即譯實驗引擎 直連票券回傳了不安全的 WebSocket URL");
  const l = Array.isArray(i.protocols)
    ? i.protocols.map((e) => String(e || "").trim()).filter(Boolean)
    : [];
  if ("opus-ticket" !== l[0] || 2 !== l.length)
    throw new Error("Salad 即譯實驗引擎 直連票券格式錯誤");
  if (Number(i.expiresAtMs || 0) <= Date.now() + 5e3)
    throw new Error("Salad 即譯實驗引擎 直連票券已過期");
  return (
    Nx(
      "llm.textEngineG.direct_ticket",
      {
        transport: i.transport || "direct-salad",
        host: o.host,
        sourceLanguage: i.sourceLanguage || i.sourceLang || "en",
        targetLanguage: i.targetLanguage || i.targetLang || "zh_Hant",
        expiresInMs: Math.max(0, Number(i.expiresAtMs || 0) - Date.now()),
      },
      { source: "offscreen", provider: Se },
    ),
    {
      url: o.toString(),
      protocols: l,
      transport: i.transport || "direct-salad",
      expiresAtMs: Number(i.expiresAtMs || 0),
    }
  );
}
async function xd() {
  if (!Ad())
    throw new Error(
      "Salad 即譯實驗引擎 direct transport only supports English final subtitles",
    );
  if (
    gc.textEngineGSocket?.readyState === WebSocket.OPEN &&
    !0 === gc.textEngineGSocket?.__textEngineGReady
  )
    return gc.textEngineGSocket;
  if (gc.textEngineGConnectPromise) return gc.textEngineGConnectPromise;
  const e = Math.max(0, Number(gc.textEngineGConnectionId) || 0) + 1;
  gc.textEngineGConnectionId = e;
  const t = (async () => {
    const t = gc.textEngineGSocket;
    if (t) {
      t.__textEngineGExpectedClose = !0;
      try {
        t.close(1e3, "connection replaced");
      } catch {}
      gc.textEngineGSocket = null;
    }
    Nx(
      "llm.textEngineG.ws.connecting",
      {
        connectionId: e,
        attempt: Math.max(0, Number(gc.textEngineGReconnectAttempts) || 0),
      },
      { source: "offscreen", provider: Se },
    );
    const n = await Rd();
    if (e !== gc.textEngineGConnectionId || !1 === gc.textEngineGAccepting)
      throw new Error("Salad 即譯實驗引擎 connection was superseded");
    const a = Ed(n, e);
    if (
      ((gc.textEngineGSocket = a),
      await Ld(a, e),
      e !== gc.textEngineGConnectionId || gc.textEngineGSocket !== a)
    )
      throw new Error("Salad 即譯實驗引擎 connection changed before ready");
    return ((gc.textEngineGReconnectAttempts = 0), a);
  })();
  gc.textEngineGConnectPromise = t;
  try {
    return await t;
  } catch (e) {
    throw (
      gc.isStopping ||
        !1 === gc.textEngineGAccepting ||
        Nd({ reason: e?.message || "connect-failed" }),
      e
    );
  } finally {
    gc.textEngineGConnectPromise === t && (gc.textEngineGConnectPromise = null);
  }
}
function Ed(e, t) {
  const n = new WebSocket(e.url, e.protocols);
  return (
    (n.__textEngineGReady = !1),
    (n.__textEngineGExpectedClose = !1),
    (n.__textEngineGConnectionId = t),
    (n.__textEngineGExpiresAtMs = Number(e.expiresAtMs || 0)),
    (n.__textEngineGMaxInflight = 1),
    n.addEventListener("open", () => {
      t === gc.textEngineGConnectionId &&
        gc.textEngineGSocket === n &&
        ((gc.textEngineGLastInboundAtMs = Date.now()),
        Nx(
          "llm.textEngineG.ws.open",
          { connectionId: t },
          { source: "offscreen", provider: Se },
        ));
    }),
    n.addEventListener("message", (e) => {
      Dd(n, e.data, t);
    }),
    n.addEventListener("error", () => {
      t !== gc.textEngineGConnectionId ||
        n.__textEngineGExpectedClose ||
        Nx(
          "llm.textEngineG.ws.error",
          { connectionId: t },
          { source: "offscreen", provider: Se, level: "warn" },
        );
    }),
    n.addEventListener("close", (e) => {
      Id(n, e, t);
    }),
    n
  );
}
function Pd(e) {
  try {
    return JSON.parse(PT(e));
  } catch {
    return null;
  }
}
function Dd(e, t, n) {
  if (n !== gc.textEngineGConnectionId || gc.textEngineGSocket !== e) return;
  const a = Pd(t);
  if (!a || "object" != typeof a)
    return void Nx(
      "llm.textEngineG.ws.invalid_message",
      { connectionId: n },
      { source: "offscreen", provider: Se, level: "warn" },
    );
  if (((gc.textEngineGLastInboundAtMs = Date.now()), "ready" === a.type))
    return (
      (e.__textEngineGReady = !0),
      (e.__textEngineGMaxInflight = Math.max(
        1,
        Math.round(Number(a.max_inflight || 1)),
      )),
      (gc.textEngineGReconnectAttempts = 0),
      _d(e, n),
      Fd(e, n),
      void Nx(
        "llm.textEngineG.ws.ready",
        {
          connectionId: n,
          sourceLanguage: a.source_language || "",
          targetLanguage: a.target_language || "",
          heartbeatSeconds: Number(a.heartbeat_seconds || 0),
          maxInflight: Number(a.max_inflight || 0),
        },
        { source: "offscreen", provider: Se },
      )
    );
  if ("heartbeat" === a.type || "pong" === a.type) return;
  const r = String(a.id || ""),
    i =
      gc.textEngineGPending instanceof Map
        ? gc.textEngineGPending.get(r)
        : null;
  if (i) {
    if (
      (gc.textEngineGPending.delete(r),
      clearTimeout(i.timeout),
      "error" === a.type)
    ) {
      const e = new Error(
        a.message || `Salad 即譯實驗引擎 error: ${a.code || "unknown"}`,
      );
      return (
        (e.code = a.code || "textEngineG_error"),
        (e.retryAfterMs = Number(a.retry_after_ms || 0)),
        void i.reject(e)
      );
    }
    if ("translation" === a.type)
      try {
        i.resolve(vA(a, i.originalText));
      } catch (e) {
        i.reject(e);
      }
    else
      i.reject(
        new Error(
          `Unexpected Salad 即譯實驗引擎 response: ${a.type || "unknown"}`,
        ),
      );
  } else
    ("translation" !== a.type && "error" !== a.type) ||
      Nx(
        "llm.textEngineG.late_response_ignored",
        { connectionId: n, messageId: r, responseType: a.type },
        { source: "offscreen", provider: Se, level: "warn" },
      );
}
function Id(e, t, n) {
  const a = n === gc.textEngineGConnectionId && gc.textEngineGSocket === e;
  (a && (gc.textEngineGSocket = null),
    a && Bd(),
    a && Ud(),
    Hd(n, new Error(pD("Salad 即譯實驗引擎 連線已關閉", t))),
    Nx(
      "llm.textEngineG.ws.close",
      {
        connectionId: n,
        closeCode: Number(t?.code || 0),
        closeReason: wD(t?.reason || ""),
        expected: Boolean(e.__textEngineGExpectedClose),
      },
      {
        source: "offscreen",
        provider: Se,
        level: e.__textEngineGExpectedClose ? "info" : "warn",
      },
    ),
    a && !e.__textEngineGExpectedClose && Nd(t));
}
function Ld(e, t) {
  return !0 === e?.__textEngineGReady
    ? Promise.resolve(e)
    : new Promise((n, a) => {
        const r = setTimeout(() => {
            (l(), a(new Error("Salad 即譯實驗引擎 GPU ready 逾時")));
          }, be),
          i = (a) => {
            if (t !== gc.textEngineGConnectionId) return;
            const r = Pd(a.data);
            "ready" === r?.type && (l(), n(e));
          },
          o = () => {
            (l(), a(new Error("Salad 即譯實驗引擎 GPU 無法就緒")));
          },
          s = (e) => {
            (l(), a(new Error(pD("Salad 即譯實驗引擎 GPU 連線已關閉", e))));
          },
          l = () => {
            (clearTimeout(r),
              e.removeEventListener("message", i),
              e.removeEventListener("error", o),
              e.removeEventListener("close", s));
          };
        (e.addEventListener("message", i),
          e.addEventListener("error", o),
          e.addEventListener("close", s));
      });
}
function _d(e, t) {
  (Bd(),
    (gc.textEngineGLastInboundAtMs = Date.now()),
    (gc.textEngineGHeartbeatTimer = setInterval(() => {
      if (
        t !== gc.textEngineGConnectionId ||
        gc.textEngineGSocket !== e ||
        e.readyState !== WebSocket.OPEN ||
        !0 !== e.__textEngineGReady
      )
        return void Bd();
      const n = Math.max(0, Date.now() - (gc.textEngineGLastInboundAtMs || 0));
      if (n >= ke) {
        Nx(
          "llm.textEngineG.ws.heartbeat_timeout",
          { connectionId: t, idleMs: n },
          { source: "offscreen", provider: Se, level: "warn" },
        );
        try {
          e.close(4e3, "heartbeat timeout");
        } catch {}
      } else
        try {
          e.send(
            JSON.stringify({
              type: "ping",
              id: `heartbeat-${t}-${Date.now()}`,
              client_time_ms: Date.now(),
            }),
          );
        } catch (n) {
          Nx(
            "llm.textEngineG.ws.heartbeat_send_failed",
            { connectionId: t, error: n?.message || String(n || "") },
            { source: "offscreen", provider: Se, level: "warn" },
          );
          try {
            e.close(4001, "heartbeat send failed");
          } catch {}
        }
    }, we)));
}
function Bd() {
  (gc.textEngineGHeartbeatTimer && clearInterval(gc.textEngineGHeartbeatTimer),
    (gc.textEngineGHeartbeatTimer = null));
}
function Ud() {
  (gc.textEngineGLeaseTimer && clearTimeout(gc.textEngineGLeaseTimer),
    (gc.textEngineGLeaseTimer = null));
}
function qd(e) {
  if (!(gc.textEngineGPending instanceof Map)) return 0;
  let t = 0;
  for (const n of gc.textEngineGPending.values())
    Number(n?.connectionId || 0) === Number(e || 0) && (t += 1);
  return t;
}
function Fd(e, t) {
  Ud();
  const n = Number(e?.__textEngineGExpiresAtMs || 0);
  if (!n) return;
  const a = () => {
      if (t !== gc.textEngineGConnectionId || gc.textEngineGSocket !== e)
        return;
      const r = n - Date.now();
      if (r > 500 && qd(t) > 0)
        gc.textEngineGLeaseTimer = setTimeout(
          a,
          Math.min(250, Math.max(25, r - 500)),
        );
      else {
        e.__textEngineGExpectedClose = !1;
        try {
          e.close(4004, "ticket lease renewal");
        } catch {
          Nd({ reason: "ticket lease renewal" });
        }
      }
    },
    r = Math.max(0, n - Date.now() - Re);
  gc.textEngineGLeaseTimer = setTimeout(a, r);
}
function Od(e = {}) {
  (gc.textEngineGReconnectTimer && clearTimeout(gc.textEngineGReconnectTimer),
    (gc.textEngineGReconnectTimer = null),
    e.resetAttempts && (gc.textEngineGReconnectAttempts = 0));
}
function Nd(e = {}) {
  if (!Ad() || gc.textEngineGReconnectTimer) return !1;
  const t = Math.max(0, Number(gc.textEngineGReconnectAttempts) || 0) + 1;
  gc.textEngineGReconnectAttempts = t;
  const n = Math.min(Ae, Ce * 2 ** Math.min(5, t - 1)),
    a = Math.max(250, Math.round(n * (0.5 + 0.5 * Math.random())));
  return (
    Nx(
      "llm.textEngineG.ws.reconnect_scheduled",
      {
        attempt: t,
        delayMs: a,
        closeCode: Number(e?.code || 0),
        reason: wD(e?.reason || ""),
      },
      { source: "offscreen", provider: Se, level: "warn" },
    ),
    (gc.textEngineGReconnectTimer = setTimeout(() => {
      ((gc.textEngineGReconnectTimer = null),
        Ad() &&
          xd().catch((e) => {
            (Nx(
              "llm.textEngineG.ws.reconnect_failed",
              { attempt: t, error: e?.message || String(e || "") },
              { source: "offscreen", provider: Se, level: "warn" },
            ),
              Nd({ reason: e?.message || "reconnect-failed" }));
          }));
    }, a)),
    !0
  );
}
function Hd(e, t) {
  if (!(gc.textEngineGPending instanceof Map)) return 0;
  let n = 0;
  for (const [a, r] of gc.textEngineGPending.entries())
    r?.connectionId === e &&
      (gc.textEngineGPending.delete(a),
      clearTimeout(r.timeout),
      r.reject(t),
      (n += 1));
  return n;
}
function Gd(e = "closed", t = {}) {
  (Bd(), Ud(), !1 !== t.clearReconnect && Od());
  const n = gc.textEngineGSocket,
    a = Number(n?.__textEngineGConnectionId || gc.textEngineGConnectionId || 0);
  if (
    (!1 !== t.invalidate && (gc.textEngineGConnectionId = a + 1),
    (gc.textEngineGSocket = null),
    (gc.textEngineGConnectPromise = null),
    !1 !== t.rejectPending && Hd(a, new Error(`Salad 即譯實驗引擎 ${e}`)),
    !n)
  )
    return !1;
  n.__textEngineGExpectedClose = !0;
  try {
    n.readyState !== WebSocket.CLOSED && n.close(1e3, String(e).slice(0, 100));
  } catch {}
  return !0;
}
async function Wd() {
  const e = gc.transcriberConnectionId + 1;
  ((gc.transcriberConnectionId = e), ET());
  const t = await $d();
  (vP("connecting", "正在連線 即時翻譯實驗模式"),
    (gc.websocket = new WebSocket(t)),
    gc.websocket.addEventListener("open", () => {
      e === gc.transcriberConnectionId &&
        vP("connected", "即時翻譯實驗模式 已連線");
    }),
    gc.websocket.addEventListener("message", (t) => {
      e === gc.transcriberConnectionId && hT(t.data);
    }),
    gc.websocket.addEventListener("error", () => {
      e === gc.transcriberConnectionId &&
        yP("即時翻譯實驗模式 WebSocket 發生錯誤");
    }),
    gc.websocket.addEventListener("close", (t) => {
      e === gc.transcriberConnectionId &&
        !gc.isStopping &&
        !gc.isResettingWebSocket &&
        Date.now() > gc.suppressWebSocketCloseUntilMs &&
        yP(`即時翻譯實驗模式 連線已關閉 (${t.code})`);
    }),
    await dD(gc.websocket));
}
async function $d() {
  const e = await uP();
  if (!e?.idToken)
    throw new Error(
      "請先在插件登入，即時翻譯實驗模式 後端代理需要 Firebase token。",
    );
  const t = new URL(gc.config.backendUrl || T);
  return (
    (t.protocol = "https:" === t.protocol ? "wss:" : "ws:"),
    (t.pathname = pe),
    (t.search = ""),
    t.searchParams.set("targetLang", gc.config.targetLang || "zh"),
    gc.sessionId && t.searchParams.set("sessionId", gc.sessionId),
    t.searchParams.set("idToken", e.idToken),
    t.toString()
  );
}
async function Vd(e = {}) {
  if ("sql-wallet-v1" === gc.config?.walletBillingProtocol) return ed("st-j");
  const t = await uP();
  if (!t?.idToken)
    throw new Error("請先在插件登入，迅聽 Mini 即時版需要 Firebase token。");
  const n = new URL(gc.config.backendUrl || T);
  ((n.pathname = fe), (n.search = ""));
  const a = new AbortController(),
    r = setTimeout(() => a.abort(), he),
    i = Date.now();
  let o,
    s = {};
  try {
    o = await fetch(n.toString(), {
      method: "POST",
      headers: hP(t),
      body: JSON.stringify({
        sourceLang: gc.config.sourceLang || "auto",
        sessionId: e.sessionId || gc.sessionId || "",
      }),
      signal: a.signal,
    });
    const r = await o.text();
    try {
      s = r ? JSON.parse(r) : {};
    } catch {
      s = {};
    }
  } catch (e) {
    if ("AbortError" === e?.name) throw new Error("取得迅聽 Mini 直連票券逾時");
    throw new Error(`取得迅聽 Mini 直連票券失敗: ${e.message}`);
  } finally {
    clearTimeout(r);
  }
  if (!o?.ok)
    throw new Error(
      s.error || `取得迅聽 Mini 直連票券失敗 (${o?.status || 0})`,
    );
  const l = new URL(String(s.url || "")),
    c =
      "ws:" === l.protocol &&
      ["127.0.0.1", "localhost", "[::1]"].includes(l.hostname);
  if ("wss:" !== l.protocol && !c)
    throw new Error("迅聽 Mini 直連票券回傳了不安全的 WebSocket URL");
  const d = Array.isArray(s.protocols)
    ? s.protocols.map((e) => String(e || "").trim()).filter(Boolean)
    : [];
  if (2 !== d.length || d.some((e) => e.length > 4096))
    throw new Error("迅聽 Mini 直連票券格式錯誤");
  if (Number(s.expiresAtMs || 0) <= Date.now() + 5e3)
    throw new Error("迅聽 Mini 直連票券已過期");
  let u = "",
    m = null;
  if (s.httpUrl) {
    const e = new URL(String(s.httpUrl || "")),
      t =
        "http:" === e.protocol &&
        ["127.0.0.1", "localhost", "[::1]"].includes(e.hostname);
    if ("https:" !== e.protocol && !t)
      throw new Error("迅聽 Mini 直連票券回傳了不安全的 HTTP URL");
    if (e.host !== l.host)
      throw new Error("迅聽 Mini HTTP 與 WebSocket 直連主機不一致");
    if (
      ((u = e.toString()),
      !s.httpHeaders ||
        "object" != typeof s.httpHeaders ||
        Array.isArray(s.httpHeaders))
    )
      throw new Error("迅聽 Mini HTTP 直連票券格式錯誤");
    const n = Object.entries(s.httpHeaders)
      .map(([e, t]) => [String(e || "").trim(), String(t || "").trim()])
      .filter(([e, t]) => e && t && e.length <= 128 && t.length <= 4096);
    if (n.length < 2) throw new Error("迅聽 Mini HTTP 直連票券缺少必要標頭");
    m = Object.fromEntries(n);
  }
  const g = Math.max(0, Date.now() - i);
  return (
    Nx(
      "stt.speechEngineA_realtime.direct_ticket",
      {
        transport: s.transport || "direct-salad",
        host: l.host,
        httpUploadAvailable: Boolean(u),
        language: s.language || "",
        expiresInMs: Math.max(0, Number(s.expiresAtMs || 0) - Date.now()),
        leaseMs: Number(s.leaseMs || 0),
        ticketLatencyMs: g,
      },
      { source: "offscreen", provider: ae },
    ),
    {
      url: l.toString(),
      protocols: d,
      httpUrl: u,
      httpHeaders: m,
      transport: "direct-salad",
      ticketLatencyMs: g,
    }
  );
}
function jd(t = new URLSearchParams()) {
  const n = String(gc.config?.realtimeSttWsUrl || e).trim() || e,
    a = new URL(n);
  if (!/^wss?:$/.test(a.protocol))
    throw new Error("Realtime STT URL 必須是 ws:// 或 wss://");
  const r = new URLSearchParams(a.search);
  for (const [e, n] of t.entries()) r.set(e, n);
  return ((a.search = r.toString()), a.toString());
}
function Kd() {
  const e = String(gc.config.speechEngineAWsUrl || He).trim(),
    t = new URL(e || He);
  if (!/^wss?:$/.test(t.protocol))
    throw new Error("speechEngineA WS URL 必須是 ws:// 或 wss://");
  return (
    t.searchParams.set("language", oD(gc.config.sourceLang)),
    t.toString()
  );
}
async function zd() {
  const e = new AbortController(),
    t = setTimeout(() => e.abort(), E);
  let n;
  try {
    n = await fetch(`${gc.config.backendUrl}${a}`, {
      method: "POST",
      headers: await SP(),
      signal: e.signal,
    });
  } catch (e) {
    if ("AbortError" === e?.name)
      throw new Error("STT token 取得逾時，請檢查後端 URL、VPN 或網路連線。");
    throw new Error(`STT token 取得失敗: ${e.message}`);
  } finally {
    clearTimeout(t);
  }
  let r = {},
    i = "";
  if ("function" == typeof n.text) {
    i = await n.text().catch(() => "");
    try {
      r = i ? JSON.parse(i) : {};
    } catch {
      r = {};
    }
  } else "function" == typeof n.json && (r = await n.json().catch(() => ({})));
  if (!n.ok) {
    const e = wD(r.error || r.message || i);
    throw new Error(`STT token 取得失敗: ${n.status}${e ? ` - ${e}` : ""}`);
  }
  if (!r.token) throw new Error("後端沒有回傳 token");
  return r.token;
}
function Qd(e) {
  if ((db(e), gc.captureContextSwitchInFlight)) return;
  const t = tf();
  if (((eg() || rg() || ig() || sg()) && !t && Zu(e), cg() && !dg())) return;
  if (t) return void lf("audio-callback-paused");
  if ((cf(), QP())) return void Km(e);
  const n = LP(gc.activeSttProvider),
    a = n === ae,
    r = gc.websocket,
    i = Boolean(r && r.readyState === WebSocket.OPEN),
    o = Boolean(
      i && (![ne, ae].includes(n) || !0 === r.__liveSubtitleSessionReady),
    );
  if (!o && !a) return;
  const s = ly(
    e.inputBuffer.getChannelData(0),
    gc.audioContext?.sampleRate || Ge,
  );
  if (!s) return;
  ((gc.captureAudioMs += s.durationMs), $A());
  const l = dy(s);
  if (o) for (const e of l) gf(r, e);
  else {
    for (const e of l) kf(e);
    ((gc.speechEngineARealtimeRecoveryActive = !0),
      i || kd({ reason: "audio-buffered-without-ready-socket" }));
    const e = Date.now();
    e - (gc.speechEngineARealtimeRecoveryLastLogAtMs || 0) >= 5e3 &&
      ((gc.speechEngineARealtimeRecoveryLastLogAtMs = e),
      Nx(
        "stt.speechEngineA_realtime.recovery_audio_buffered",
        {
          chunks: gc.speechEngineARealtimeRecoveryChunks?.length || 0,
          durationMs: Math.round(gc.speechEngineARealtimeRecoveryMs || 0),
          hasSocket: Boolean(r),
          socketOpen: i,
          socketReady: !0 === r?.__liveSubtitleSessionReady,
        },
        { source: "offscreen", level: "warn", provider: ae },
      ));
  }
}
function Jd() {
  return {
    version: 1,
    sessionId: "",
    timelineRevision: 0,
    nextClaimId: 1,
    entries: [],
    pcmSegmentsScheduled: 0,
    mseSegmentsClaimed: 0,
    duplicateSecondsPrevented: 0,
    supersededMseSegments: 0,
    lastSnapshotAtMs: 0,
  };
}
function Xd() {
  const e = gc.sessionId || "",
    t = gc.timelineRevision;
  let n = gc.mseCoverageLedger;
  return (
    (n && n.sessionId === e && n.timelineRevision === t) ||
      ((n = Jd()),
      (n.sessionId = e),
      (n.timelineRevision = t),
      (gc.mseCoverageLedger = n),
      Yd(n)),
    n
  );
}
function Zd(e) {
  if (
    !e.sessionId ||
    e.sessionId !== gc.sessionId ||
    e.videoKey !== tE() ||
    !Number.isSafeInteger(e.revision) ||
    e.revision <= Number(gc.config?.walletCacheAuthorityRevision || 0)
  )
    return { ok: !0, ignored: !0 };
  gc.config = {
    ...gc.config,
    walletCacheManaged: !0,
    walletCacheAuthorityRevision: e.revision,
    hybridSubtitleCacheMode: !0,
    cachedSubtitleCoverageReliable: !0,
    cachedSubtitleCoverageSource: "sql-wallet-grant",
    cachedSubtitleCoverageRanges: DP(e.coverageRanges || []),
  };
  const t = Xd();
  return (
    (t.entries = t.entries.filter(
      (e) =>
        !(
          "cache" === e.owner &&
          ("cache-covered" === e.route || "database-cache" === e.outcome)
        ),
    )),
    gc.mseAudio && (gc.mseAudio.cacheCoveredRanges = []),
    Yd(t),
    { ok: !0 }
  );
}
function Yd(e = gc.mseCoverageLedger) {
  if (!e || !gc.config?.hybridSubtitleCacheMode) return 0;
  if (!0 !== gc.config.cachedSubtitleCoverageReliable) return 0;
  const t = Array.isArray(gc.config.cachedSubtitleCoverageRanges)
    ? gc.config.cachedSubtitleCoverageRanges
    : [];
  let n = 0;
  for (const a of t) {
    const t = rP(a?.startMs ?? a?.start_ms),
      r = rP(a?.endMs ?? a?.end_ms);
    if (null === t || null === r || r <= t) continue;
    const i = Math.max(0, t / 1e3),
      o = Math.max(i, r / 1e3);
    (e.entries.push({
      id: `coverage-${e.nextClaimId}`,
      start: i,
      end: o,
      owner: "cache",
      route: "cache-covered",
      stage: "cache-ready",
      sequence: 0,
      segmentId: null,
      sessionId: gc.sessionId || "",
      timelineRevision: gc.timelineRevision,
      createdAtMs: Date.now(),
      progressAtMs: Date.now(),
      outcome: "database-cache",
    }),
      (e.nextClaimId += 1),
      (n += 1));
  }
  return n;
}
function eu(e = "") {
  return [
    "buffering",
    "queued",
    "uploading",
    "transcribed",
    "subtitle-ready",
    "subtitle-unavailable",
    "cache-ready",
  ].includes(String(e || ""));
}
function tu(e = "") {
  return "subtitle-ready" === e || "cache-ready" === e;
}
function nu(e = {}) {
  return Boolean(
    "mse" === e?.owner &&
      "subtitle-unavailable" === e?.stage &&
      !0 !== e?.pcmRecoveryAttempted &&
      !e?.pcmRecoveryClaimId,
  );
}
function au(e = "") {
  return (
    {
      buffering: 1,
      queued: 2,
      uploading: 3,
      transcribed: 4,
      "subtitle-ready": 5,
      "subtitle-unavailable": 5,
      "cache-ready": 5,
      released: -1,
      failed: -1,
      cancelled: -1,
    }[String(e || "")] ?? 0
  );
}
function ru(e = Xd()) {
  const t = Date.now();
  return (
    (e.entries = (Array.isArray(e.entries) ? e.entries : [])
      .filter(
        (e) =>
          e &&
          e.sessionId === (gc.sessionId || "") &&
          e.timelineRevision === gc.timelineRevision &&
          (eu(e.stage) || t - (rP(e.progressAtMs) || t) < 6e4),
      )
      .slice(-512)),
    e
  );
}
function iu(e, t) {
  const n = rP(e),
    a = rP(t);
  return null === n || null === a || a <= n
    ? null
    : { start: Math.max(0, n), end: Math.max(0, a) };
}
function ou(e = {}) {
  const t = ru(),
    n = Boolean(e.readyOnly),
    a = Boolean(e.processedOnly),
    r = t.entries
      .filter((e) =>
        n
          ? tu(e.stage)
          : a
            ? "cache" !== e.owner &&
              ("transcribed" === e.stage || "subtitle-ready" === e.stage)
            : eu(e.stage),
      )
      .map((e) => ({ start: e.start, end: e.end }))
      .sort((e, t) => e.start - t.start),
    i = [];
  for (const e of r) {
    const t = i[i.length - 1];
    t && e.start <= t.end + (a ? 0 : Qr)
      ? (t.end = Math.max(t.end, e.end))
      : i.push({ ...e });
  }
  return i;
}
function su() {
  return zm() ? fm(ou({ processedOnly: !0 }), 0, Number.MAX_SAFE_INTEGER) : 0;
}
function lu() {
  return zm()
    ? Math.max(
        0,
        Number(gc.mseCompletedTimelineProcessedCoverageSeconds) || 0,
      ) + su()
    : 0;
}
function cu(e = "") {
  const t = wD(gc.sessionId || ""),
    n = wD(e || "");
  return t && t === n ? lu() : 0;
}
function du(e = "timeline-reset") {
  if (!zm()) return 0;
  const t = su();
  return t <= 0
    ? 0
    : ((gc.mseCompletedTimelineProcessedCoverageSeconds =
        Math.max(
          0,
          Number(gc.mseCompletedTimelineProcessedCoverageSeconds) || 0,
        ) + t),
      Nx(
        "billing.mse_processed_coverage_checkpoint",
        {
          reason: wD(e) || "timeline-reset",
          timelineRevision: gc.timelineRevision,
          timelineCoverageSeconds: aP(t),
          completedCoverageSeconds: aP(
            gc.mseCompletedTimelineProcessedCoverageSeconds,
          ),
        },
        { source: "offscreen" },
      ),
      t);
}
function uu(e, t) {
  const n = iu(e, t);
  if (!n) return [];
  const a = ou().filter((e) => e.end > n.start && e.start < n.end),
    r = [];
  let i = n.start;
  for (const e of a)
    if (
      (e.start > i + Qr && r.push({ start: i, end: Math.min(n.end, e.start) }),
      (i = Math.max(i, Math.min(n.end, e.end))),
      i >= n.end - Qr)
    )
      break;
  return (
    i < n.end - Qr && r.push({ start: i, end: n.end }),
    r.filter((e) => e.end > e.start)
  );
}
function mu(e, t) {
  const n = iu(e, t);
  if (!n) return [];
  const a = ru()
      .entries.filter(
        (e) => "mse" === e?.owner && "subtitle-unavailable" === e?.stage,
      )
      .sort((e, t) => e.start - t.start || e.end - t.end),
    r = new Map();
  for (const e of a) {
    const t =
        null === e.segmentId || void 0 === e.segmentId
          ? ""
          : String(e.segmentId),
      n = t ? `segment:${t}` : `claim:${e.id}`,
      a = r.get(n) || [];
    (a.push(e), r.set(n, a));
  }
  const i = [];
  for (const e of r.values()) {
    let t = [];
    const n = () => {
      t.length &&
        (t.every((e) => nu(e)) &&
          i.push({
            start: t[0].start,
            end: Math.max(...t.map((e) => e.end)),
            entries: t.slice(),
            sourceClaimIds: t.map((e) => e.id),
            segmentId: t[0].segmentId ?? null,
          }),
        (t = []));
    };
    for (const a of e) {
      const e = t[t.length - 1] || null;
      (e && a.start > e.end + Qr && n(), t.push(a));
    }
    n();
  }
  return i
    .filter((e) => e.start >= n.start - Qr && e.end <= n.end + Qr)
    .sort((e, t) => e.start - t.start || e.end - t.end);
}
function gu(e, t) {
  return [
    ...uu(e, t).map((e) => ({ ...e, type: "uncovered" })),
    ...mu(e, t).map((e) => ({
      start: e.start,
      end: e.end,
      type: "subtitle-unavailable-recovery",
      sourceClaimId: e.sourceClaimIds[0] || null,
      sourceClaimIds: e.sourceClaimIds,
      segmentId: e.segmentId,
    })),
  ].sort((e, t) => {
    const n = e.start - t.start;
    return (
      n ||
      ("subtitle-unavailable-recovery" === e.type ? 0 : 1) -
        ("subtitle-unavailable-recovery" === t.type ? 0 : 1) ||
      e.end - t.end
    );
  });
}
function pu(e = null, t = null, n = null) {
  if (!e || "uncovered" !== e.type) return !1;
  const a = rP(t),
    r = rP(n),
    i = rP(e.start),
    o = rP(e.end);
  return (
    !(null === a || null === r || null === i || null === o || o <= i) &&
    !(i > a + Qr || o - i >= li || o >= r - Qr) &&
    Xd().entries.some(
      (e) =>
        eu(e.stage) &&
        e.start >= o - Qr &&
        e.start <= o + Qr &&
        e.end > e.start,
    )
  );
}
function fu(e = [], t = null, n = null) {
  const a = Array.isArray(e) ? e : [],
    r = a[0] || null;
  return pu(r, t, n)
    ? { candidates: a.slice(1), skipped: r }
    : { candidates: a, skipped: null };
}
function hu(e = {}, t = {}) {
  return "pcm" !== String(t.owner || "pcm")
    ? null
    : mu(e.start, e.end).find(
        (t) =>
          Math.abs(t.start - e.start) <= Qr && Math.abs(t.end - e.end) <= Qr,
      ) || null;
}
function Su(e = {}, t = {}) {
  if ("mse" !== t.owner) return null;
  const n = Math.max(0, Math.round(Number(t.sequence || 0) || 0));
  return (
    (n &&
      Xd().entries.find(
        (t) =>
          "mse" === t.owner &&
          t.sequence === n &&
          "subtitle-unavailable" !== t.stage &&
          eu(t.stage) &&
          Math.max(0, Math.min(t.end, e.end) - Math.max(t.start, e.start)) > 0,
      )) ||
    null
  );
}
function Mu(e, t, n = {}) {
  const a = iu(e, t);
  if (!a) return { claimed: !1, reason: "invalid-range" };
  const r = ru(),
    i = Su(a, n);
  if (i)
    return (
      (i.start = Math.min(i.start, a.start)),
      (i.end = Math.max(i.end, a.end)),
      (i.progressAtMs = Date.now()),
      { claimed: !0, continued: !0, claimId: i.id, entry: i }
    );
  if ("cache" !== n.owner && pp(a.start, a.end))
    return { claimed: !1, reason: "subtitle-cache" };
  const o = hu(a, n),
    s = o?.entries || [],
    l = new Set(s.map((e) => e.id)),
    c = r.entries.filter(
      (e) => eu(e.stage) && e.end > a.start && e.start < a.end,
    ),
    d = Boolean(s.length && c.length === l.size && c.every((e) => l.has(e.id))),
    u = uu(a.start, a.end),
    m = u.reduce((e, t) => e + (t.end - t.start), 0),
    g = a.end - a.start;
  if (!d && m < g - Qr)
    return (
      (r.duplicateSecondsPrevented += Math.max(0, g - m)),
      Nx(
        "mse.coverage.claim_rejected",
        {
          reason: "owned-range",
          owner: String(n.owner || "pcm"),
          route: String(n.route || n.owner || "pcm"),
          sequence: Math.max(0, Math.round(Number(n.sequence || 0) || 0)),
          mediaStartTime: aP(a.start),
          mediaEndTime: aP(a.end),
          durationSeconds: aP(g),
          uncoveredSeconds: aP(m),
          uncoveredRanges: u.map((e) => ({
            start: aP(e.start),
            end: aP(e.end),
          })),
          blockingEntries: c.map((e) => ({
            id: e.id,
            owner: e.owner,
            route: e.route,
            stage: e.stage,
            sequence: e.sequence,
            pcmRecoveryAttempted: !0 === e.pcmRecoveryAttempted,
            pcmRecoveryClaimId: e.pcmRecoveryClaimId || null,
            start: aP(e.start),
            end: aP(e.end),
          })),
        },
        { source: "offscreen", level: "warn" },
      ),
      {
        claimed: !1,
        reason: "owned-range",
        uncoveredSeconds: m,
        duplicateSeconds: Math.max(0, g - m),
      }
    );
  const p = Date.now(),
    f = {
      id: `coverage-${r.nextClaimId}`,
      start: a.start,
      end: a.end,
      owner: String(n.owner || "pcm"),
      route: String(n.route || n.owner || "pcm"),
      stage: n.stage || ("cache" === n.owner ? "cache-ready" : "buffering"),
      sequence: Math.max(0, Math.round(Number(n.sequence || 0) || 0)),
      segmentId: null,
      sessionId: gc.sessionId || "",
      timelineRevision: gc.timelineRevision,
      createdAtMs: p,
      progressAtMs: p,
      outcome: "",
      pcmRecovery: d,
      pcmRecoverySourceClaimId: d ? s[0].id : null,
      pcmRecoverySourceClaimIds: d ? s.map((e) => e.id) : [],
    };
  if (((r.nextClaimId += 1), r.entries.push(f), d))
    for (const e of s)
      ((e.pcmRecoveryAttempted = !0),
        (e.pcmRecoveryClaimId = f.id),
        (e.pcmRecoveryClaimedAtMs = p),
        (e.progressAtMs = p));
  return (
    "pcm" === f.owner && (r.pcmSegmentsScheduled += 1),
    "mse" === f.owner && (r.mseSegmentsClaimed += 1),
    ru(r),
    Nx(
      "mse.coverage.claimed",
      {
        claimId: f.id,
        owner: f.owner,
        route: f.route,
        stage: f.stage,
        sequence: f.sequence,
        mediaStartTime: aP(f.start),
        mediaEndTime: aP(f.end),
        durationSeconds: aP(f.end - f.start),
      },
      { source: "offscreen" },
    ),
    d &&
      Nx(
        "mse.coverage.pcm_recovery_claimed",
        {
          claimId: f.id,
          sourceClaimId: s[0].id,
          sourceClaimIds: s.map((e) => e.id),
          sourceSegmentId: o.segmentId,
          sourceOwner: s[0].owner,
          sourceRoute: s[0].route,
          sourceOutcome: s[0].outcome || "",
          mediaStartTime: aP(f.start),
          mediaEndTime: aP(f.end),
          durationSeconds: aP(f.end - f.start),
        },
        { source: "offscreen", level: "warn" },
      ),
    { claimed: !0, continued: !1, claimId: f.id, entry: f }
  );
}
function vu(e = {}) {
  const t = Array.isArray(e.mseCoverageClaimIds) ? e.mseCoverageClaimIds : [],
    n = (e.chunks || []).map((e) => e?.mseCoverageClaimId).filter(Boolean);
  return Array.from(new Set([...t, ...n]));
}
function yu(e = {}) {
  return Array.from(
    new Set(
      (Array.isArray(e.mseSpeechRetryClaimIds)
        ? e.mseSpeechRetryClaimIds
        : []
      ).filter(Boolean),
    ),
  );
}
function bu(e = {}, t = "") {
  return (
    e.pendingTranslationGroups && "object" == typeof e.pendingTranslationGroups
      ? Object.values(e.pendingTranslationGroups)
      : []
  ).some(
    (e) =>
      (!t || e?.kind === t) &&
      Array.isArray(e?.pendingPieceKeys) &&
      e.pendingPieceKeys.length > 0,
  );
}
function Tu(e = {}) {
  const t = Array.from(new Set((e.claimIds || []).filter(Boolean))),
    n = String(e.groupId || ""),
    a = Math.max(1, Math.round(Number(e.pieceCount) || 1)),
    r = "speech-retry" === e.kind ? "speech-retry" : "primary";
  if (!t.length || !n) return [];
  const i = ru(),
    o = [];
  for (const e of i.entries)
    t.includes(e.id) &&
      !tu(e.stage) &&
      ((e.pendingTranslationGroups &&
        "object" == typeof e.pendingTranslationGroups) ||
        (e.pendingTranslationGroups = {}),
      e.pendingTranslationGroups[n] ||
        (e.pendingTranslationGroups[n] = {
          kind: r,
          pieceCount: a,
          pendingPieceKeys: Array.from({ length: a }, (e, t) => `${n}:${t}`),
        }),
      "primary" === r &&
        ((e.primaryTranslationExpected = !0), (e.primarySubtitleReady = !1)),
      (e.progressAtMs = Date.now()),
      o.push(e.id));
  return (
    o.length &&
      Nx(
        "mse.coverage.translation_group_pending",
        {
          claimIds: o,
          groupId: n,
          kind: r,
          pieceCount: a,
          sttSegmentId: e.sttSegmentId ?? null,
        },
        { source: "offscreen" },
      ),
    o
  );
}
function wu(e = []) {
  const t = (Array.isArray(e) ? e : [])
      .map((e) => {
        const t = String(e?.groupId || ""),
          n = Math.max(0, Math.round(Number(e?.pieceIndex) || 0)),
          a = Array.from(
            new Set(
              (Array.isArray(e?.claimIds) ? e.claimIds : []).filter(Boolean),
            ),
          );
        return t && a.length
          ? { groupId: t, pieceIndex: n, claimIds: a }
          : null;
      })
      .filter(Boolean),
    n = {
      resolvedPieces: 0,
      completedPrimaryClaimIds: [],
      completedSpeechRetryCounts: {},
    };
  if (!t.length) return n;
  const a = ru(),
    r = new Set();
  for (const e of t) {
    const t = `${e.groupId}:${e.pieceIndex}`;
    for (const i of a.entries) {
      if (!e.claimIds.includes(i.id)) continue;
      const a = i.pendingTranslationGroups?.[e.groupId];
      if (
        a &&
        Array.isArray(a.pendingPieceKeys) &&
        a.pendingPieceKeys.includes(t)
      ) {
        if (
          ((a.pendingPieceKeys = a.pendingPieceKeys.filter((e) => e !== t)),
          (n.resolvedPieces += 1),
          !a.pendingPieceKeys.length)
        ) {
          const t = "speech-retry" === a.kind ? "speech-retry" : "primary";
          (delete i.pendingTranslationGroups[e.groupId],
            "speech-retry" === t
              ? (n.completedSpeechRetryCounts[i.id] =
                  Math.max(0, Number(n.completedSpeechRetryCounts[i.id]) || 0) +
                  1)
              : bu(i, "primary") ||
                ((i.primarySubtitleReady = !0), r.add(i.id)));
        }
        i.progressAtMs = Date.now();
      }
    }
  }
  return (
    (n.completedPrimaryClaimIds = Array.from(r)),
    n.resolvedPieces &&
      Nx(
        "mse.coverage.translation_piece_resolved",
        {
          resolvedPieces: n.resolvedPieces,
          completedPrimaryClaimIds: n.completedPrimaryClaimIds,
          completedSpeechRetryCounts: n.completedSpeechRetryCounts,
        },
        { source: "offscreen" },
      ),
    n
  );
}
function ku(e = [], t = 0, n = {}) {
  const a = new Set((e || []).filter(Boolean)),
    r = Math.max(0, Math.round(Number(t) || 0));
  if (!a.size || !r) return 0;
  const i = ru();
  let o = 0;
  for (const e of i.entries)
    a.has(e.id) &&
      ((e.speechRetryExpected = !0),
      (e.pendingSpeechRetryCount =
        Math.max(0, Number(e.pendingSpeechRetryCount) || 0) + r),
      (e.primarySubtitleReady = !1),
      (e.speechRetrySubtitleReady = !1),
      (e.progressAtMs = Date.now()),
      (o += 1));
  return (
    o &&
      Nx(
        "mse.coverage.speech_retry_pending",
        {
          claimIds: Array.from(a),
          retryCount: r,
          segmentId: n.segmentId ?? null,
          ranges: Array.isArray(n.ranges) ? n.ranges : [],
        },
        { source: "offscreen", level: "warn" },
      ),
    o
  );
}
function Cu(e = [], t = {}) {
  const n = new Set((e || []).filter(Boolean));
  if (!n.size) return 0;
  const a = ru();
  let r = 0;
  for (const e of a.entries)
    n.has(e.id) &&
      e.speechRetryExpected &&
      ((e.pendingSpeechRetryCount = Math.max(
        0,
        (Number(e.pendingSpeechRetryCount) || 0) -
          Math.max(1, Math.round(Number(t.count) || 1)),
      )),
      0 === e.pendingSpeechRetryCount && (e.speechRetrySubtitleReady = !0),
      (e.progressAtMs = Date.now()),
      (r += 1));
  return (
    r &&
      Nx(
        "mse.coverage.speech_retry_resolved",
        {
          claimIds: Array.from(n),
          segmentId: t.segmentId ?? null,
          outcome: t.outcome || "",
          resolved: r,
        },
        { source: "offscreen", level: "error" === t.outcome ? "warn" : "info" },
      ),
    r
  );
}
function Au(e = {}, t = "retry-silence") {
  const n = yu(e);
  return !(
    !ZM(e) ||
    !n.length ||
    (Cu(n, { segmentId: e.id, outcome: t }),
    Pu(n, "subtitle-ready", {
      segmentId: e.id,
      outcome: t,
      speechRetryCompletion: !0,
    }),
    0)
  );
}
function Ru(e = []) {
  const t = Array.from(new Set((e || []).filter(Boolean)));
  if (!t.length) return !0;
  const n = Xd().entries.filter((e) => t.includes(e.id));
  return n.length === t.length && n.every((e) => tu(e.stage));
}
function xu(e = []) {
  const t = new Set((e || []).filter(Boolean)),
    n = Xd().entries.filter((e) => t.has(e.id));
  return n.length
    ? {
        start: Math.min(...n.map((e) => e.start)),
        end: Math.max(...n.map((e) => e.end)),
      }
    : null;
}
function Eu(e = []) {
  const t = new Set((e || []).filter(Boolean));
  return t.size
    ? $p(
        ru()
          .entries.filter((e) => t.has(e.id))
          .map((e) => ({ start: e.start, end: e.end }))
          .sort((e, t) => e.start - t.start || e.end - t.end),
        Qr,
      )
    : [];
}
function Pu(e = [], t = "queued", n = {}) {
  const a = new Set((e || []).filter(Boolean));
  if (!a.size) return 0;
  const r = ru(),
    i = au(t);
  let o = 0,
    s = 0;
  const l = [];
  for (const e of r.entries) {
    if (!a.has(e.id)) continue;
    if ("subtitle-ready" === t) {
      n.speechRetryCompletion
        ? (e.speechRetrySubtitleReady =
            0 === (Number(e.pendingSpeechRetryCount) || 0))
        : e.primaryTranslationExpected || (e.primarySubtitleReady = !0);
      const t = bu(e),
        a = !1 !== e.primarySubtitleReady,
        r = !e.speechRetryExpected || !0 === e.speechRetrySubtitleReady;
      if (t || !a || !r) {
        ((e.progressAtMs = Date.now()),
          void 0 !== n.outcome && (e.outcome = String(n.outcome || "")),
          (s += 1));
        continue;
      }
    }
    const r = au(e.stage);
    if (!(i >= 0 && r > i)) {
      if (
        ((e.stage = t),
        (e.progressAtMs = Date.now()),
        void 0 !== n.segmentId && (e.segmentId = n.segmentId),
        void 0 !== n.outcome && (e.outcome = String(n.outcome || "")),
        tu(t))
      ) {
        const a = Du(e.outcome);
        "subtitle-ready" === t &&
        !0 !== n.displayVerified &&
        /(?:translation|translated|caption)/.test(
          wD(e.outcome).toLowerCase(),
        ) &&
        !/(?:fallback|error|failed)/.test(wD(e.outcome).toLowerCase())
          ? (e.cacheCoverageAwaitingDisplay = !0)
          : a && !e.cacheCoverageQueued
            ? ((e.cacheCoverageQueued = !0),
              l.push({ start: e.start, end: e.end, outcome: e.outcome }))
            : a ||
              e.cacheCoverageRejectedRecorded ||
              ((e.cacheCoverageRejectedRecorded = !0),
              l.push({
                start: e.start,
                end: e.end,
                outcome: e.outcome || "unverified-ready",
                status: "failed",
              }));
      } else
        ("failed" !== t && "cancelled" !== t && "subtitle-unavailable" !== t) ||
          e.cacheCoverageRejectedRecorded ||
          ((e.cacheCoverageRejectedRecorded = !0),
          l.push({
            start: e.start,
            end: e.end,
            outcome: e.outcome || t,
            status: "failed",
          }));
      o += 1;
    }
  }
  for (const e of l)
    fx(
      { sourceMediaStartTime: e.start, sourceMediaEndTime: e.end },
      {
        source: "pipeline-ready",
        reason: e.outcome || "subtitle-ready",
        status: e.status || "complete",
      },
    );
  return (
    o &&
      Nx(
        "mse.coverage.progress",
        {
          claimIds: Array.from(a),
          stage: t,
          segmentId: n.segmentId ?? null,
          outcome: n.outcome || "",
          updated: o,
        },
        {
          source: "offscreen",
          level:
            "failed" === t || "cancelled" === t || "subtitle-unavailable" === t
              ? "warn"
              : "info",
        },
      ),
    s &&
      Nx(
        "mse.coverage.subtitle_ready_deferred",
        {
          claimIds: Array.from(a),
          segmentId: n.segmentId ?? null,
          speechRetryCompletion: Boolean(n.speechRetryCompletion),
          outcome: n.outcome || "",
          deferred: s,
        },
        { source: "offscreen", level: "warn" },
      ),
    o
  );
}
function Du(e = "") {
  const t = wD(e).toLowerCase();
  return (
    !!t &&
    !/(?:fallback|error|failed|cancel|ignored|unverified)/.test(t) &&
    /(?:translation|translated|subtitle|silence|timeline-already-covered|no-translation-needed|integrated-caption|cache)/.test(
      t,
    )
  );
}
function Iu(e = {}, t = "queued", n = {}) {
  return Pu(vu(e), t, { segmentId: e.id, ...n });
}
function Lu(e, t, n = "subtitle-ready", a = {}) {
  const r = iu(e, t);
  return r
    ? Pu(
        Xd()
          .entries.filter(
            (e) =>
              eu(e.stage) &&
              Math.max(0, Math.min(e.end, r.end) - Math.max(e.start, r.start)) /
                Math.max(0.001, e.end - e.start) >=
                0.5,
          )
          .map((e) => e.id),
        n,
        a,
      )
    : 0;
}
function _u(e = {}, t = "released") {
  return Iu(e, "released", { outcome: t });
}
function Bu(e = null) {
  const t = rP(e);
  if (null === t) return 0;
  const n = hm(ou({ readyOnly: !0 }), t, t + ll, Jr);
  return Math.max(0, (rP(n.coveredEnd) ?? t) - t);
}
function Uu(e, t) {
  const n = rP(e),
    a = rP(t);
  if (null === n || null === a || a <= n) return 0;
  const r = ru(),
    i = r.entries.filter(
      (e) =>
        "mse" === e.owner &&
        ("buffering" === e.stage || "queued" === e.stage) &&
        e.start >= n - Qr &&
        e.end <= a + Qr,
    );
  if (!i.length) return 0;
  const o = new Set(i.map((e) => e.id)),
    s = sy(),
    l = s.chunks.length;
  ((s.chunks = s.chunks.filter((e) => !o.has(e?.mseCoverageClaimId))),
    (s.durationMs = oy(s.chunks)),
    l !== s.chunks.length && ($f(s), s.chunks.length && Jf(s)));
  const c = s.queue.length,
    d = [];
  for (const e of s.queue) {
    const t = vu(e);
    if (t.some((e) => o.has(e))) {
      for (const e of t) o.add(e);
      nh(e, "ignored", {
        done: !0,
        active: !1,
        reason: "pcm-ground-truth-superseded-mse",
      });
    } else d.push(e);
  }
  s.queue = d;
  const u = Array.from(o);
  return (
    Pu(u, "cancelled", { outcome: "pcm-ground-truth-superseded-mse" }),
    (r.supersededMseSegments += i.length),
    Nx(
      "mse.coverage.mse_superseded_by_pcm",
      {
        claimIds: u,
        claims: i.length,
        mediaStartTime: aP(Math.min(...i.map((e) => e.start))),
        mediaEndTime: aP(Math.max(...i.map((e) => e.end))),
        removedPendingChunks: l - s.chunks.length,
        removedQueuedSegments: Math.max(0, c - d.length),
      },
      { source: "offscreen", level: "warn" },
    ),
    i.length
  );
}
function qu(e = {}) {
  const t = Boolean(e.startup),
    n = Boolean(e.seekCatchup),
    a = rP(e.deadlineLeadSeconds),
    r = n
      ? { minSeconds: 6, preferredSeconds: 7, maxSeconds: 8 }
      : t
        ? { minSeconds: 3, preferredSeconds: Zr, maxSeconds: 5 }
        : { minSeconds: 8, preferredSeconds: ii, maxSeconds: oi },
    i = ek(),
    o = Math.max(
      0,
      rP(gc.config?.effectiveSyncDelaySeconds ?? gc.config?.syncDelaySeconds) ||
        0,
    ),
    s = Jy(),
    l = Xh(pg()),
    c = qC(),
    d = l + c + ba,
    u = Math.max(s, d),
    m = yh(),
    g = Lg(),
    p = Math.max(
      Number(m.targetReadySeconds || 0) + 8,
      r.maxSeconds + u / 1e3 + 5,
    ),
    f = Boolean(!t && m.active && g >= p),
    h = r.preferredSeconds + u / 1e3 + 0.75,
    S = Boolean(null !== a && a < h);
  if (!Boolean(!n && o > 0 && (null === i || i < _l) && (!f || S)))
    return {
      ...r,
      deadlineConstrained: !1,
      syncDelaySeconds: o,
      pipelineReserveMs: u,
      configuredPipelineReserveMs: s,
      measuredPipelineReserveMs: d,
      sttReserveMs: l,
      llmReserveMs: c,
      readySubtitleLeadSeconds: i,
      deadlineLeadSeconds: a,
      deadlineRiskThresholdSeconds: h,
      observedDeadlineRisk: S,
      rawLeadSeconds: rP(m.rawLeadSeconds),
      contiguousPcmLeadSeconds: g,
      hasBufferedCatchupRunway: f,
    };
  const M = null === a ? o : Math.max(0, Math.min(o, a)),
    v = dP((1e3 * M - u - si) / 1e3, Zr, r.preferredSeconds);
  return {
    minSeconds: dP(v - 0.5, 3, v),
    preferredSeconds: v,
    maxSeconds: dP(v + 0.75, v, r.maxSeconds),
    deadlineConstrained: !0,
    syncDelaySeconds: o,
    pipelineReserveMs: u,
    configuredPipelineReserveMs: s,
    measuredPipelineReserveMs: d,
    sttReserveMs: l,
    llmReserveMs: c,
    readySubtitleLeadSeconds: i,
    deadlineLeadSeconds: a,
    availableDeadlineLeadSeconds: M,
    deadlineRiskThresholdSeconds: h,
    observedDeadlineRisk: S,
    rawLeadSeconds: rP(m.rawLeadSeconds),
    contiguousPcmLeadSeconds: g,
    hasBufferedCatchupRunway: f,
  };
}
function Fu(e = null, t = Date.now()) {
  const n = qu({ startup: !1, seekCatchup: !1 }),
    a = rP(e),
    r = Nm(t),
    i = null !== a && null !== r ? a - r : null,
    o = Math.max(
      0,
      rP(gc.config?.effectiveSyncDelaySeconds ?? gc.config?.syncDelaySeconds) ||
        0,
    ),
    s = Math.max(0, (rP(n.pipelineReserveMs) || 0) / 1e3),
    l = Math.max(o, s) + 5,
    c = Boolean(null !== i && i <= l);
  return {
    ...(c ? qu({ startup: !0, seekCatchup: !1 }) : n),
    groundTruthGapUrgent: c,
    gapLeadSeconds: i,
    urgentLeadThresholdSeconds: l,
  };
}
function Ou(e = [], t = null, n = null, a = {}) {
  const r = rP(t),
    i = rP(n);
  if (null === r || null === i || i <= r) return null;
  const o = Boolean(a.blockedTail),
    s = a.windowProfile || qu(a),
    l = s.minSeconds,
    c = s.preferredSeconds,
    d = s.maxSeconds,
    u = i - r;
  if (u < l) {
    const e = a.allowShortBlockedTail ? Qr : li;
    return o && u >= e ? i : null;
  }
  const m = Math.min(i, r + d);
  for (const t of e) {
    const e = rP(t?.sourceMediaEndTime);
    if (
      !(null === e || e < r + l || e > m) &&
      !fy(
        t.rawCaptureSamples ||
          t.captureSamples ||
          t.samples ||
          new Float32Array(),
        { useRecentSilero: !1 },
      ).isSpeech &&
      e >= r + c - 0.25
    )
      return e;
  }
  return u >= d ? Math.min(i, r + d) : o ? i : null;
}
function Nu(e = [], t = null, n = null, a = {}) {
  const r = iu(t, n);
  if (!r) return !1;
  const i = { owner: "pcm", route: "pcm-primary", stage: "buffering" };
  a.pcmSubtitleUnavailableRecovery
    ? (i.route = "pcm-subtitle-unavailable-recovery")
    : a.mseInitialGapFill && (i.route = "pcm-initial-gap-fill");
  const o = Mu(r.start, r.end, i);
  if (!o.claimed) return !1;
  const s = pm(e, r.start, r.end);
  if (!s.chunks.length || s.coveredSeconds < 0.95 * (r.end - r.start))
    return (
      Pu([o.claimId], "released", { outcome: "pcm-ring-incomplete" }),
      !1
    );
  const l = wD(a.batchSttProviderOverride || ""),
    c = l ? LP(l) : pg(),
    d = rP(e[0]?.sourceMediaStartTime),
    u = nD(c) ? Math.max(d ?? r.start, r.start - 1) : r.start,
    m = u < r.start - 0.05 ? pm(e, u, r.end) : null,
    g = m?.chunks?.length
      ? hm(
          m.chunks.map((e) => ({
            start: rP(e.sourceMediaStartTime),
            end: rP(e.sourceMediaEndTime),
          })),
          u,
          r.end,
          0.05,
        )
      : null,
    p = g?.covered ? m : s,
    f = sP(p.chunks.map((e) => rP(e.sourceMediaStartTime))) ?? r.start,
    h = Math.max(0, r.start - f),
    S = h >= 0.05,
    M = sy(),
    v = p.chunks.map((e) =>
      Df({
        ...e,
        sourceType: "mse-audio-buffer",
        msePcmPrimary: !0,
        msePcmPrimaryContextOverlap: S,
        mseCoverageClaimId: o.claimId,
      }),
    ),
    y = S
      ? s.chunks.map((e) =>
          Df({
            ...e,
            sourceType: "mse-audio-buffer",
            msePcmPrimary: !0,
            msePcmPrimaryCore: !0,
            msePcmPrimaryContextOverlap: !1,
            mseCoverageClaimId: o.claimId,
          }),
        )
      : v,
    b = {
      id: M.nextSegmentId,
      chunks: v,
      durationMs: Math.round(
        v.reduce((e, t) => e + (rP(t.durationMs) || 0), 0),
      ),
      reason: wD(a.reason || "mse-pcm-primary") || "mse-pcm-primary",
      deadlineMediaTime: r.start,
      mseCoverageClaimIds: [o.claimId],
      mseCoverageCoreStartMediaTime: r.start,
      mseCoverageCoreEndMediaTime: r.end,
      msePcmPrimaryContextOverlap: S,
      msePcmPrimaryContextStartMediaTime: f,
      msePcmPrimaryContextSeconds: h,
      msePcmPrimaryCoreChunks: y,
      mseAheadDecoded: Boolean(a.mseAheadDecoded),
      mseAheadDecodedIdleTailFlush: Boolean(a.mseAheadDecodedIdleTailFlush),
      mseGroundTruthGapUrgent: Boolean(a.mseGroundTruthGapUrgent),
      mseInitialGapFill: Boolean(a.mseInitialGapFill),
      msePcmSubtitleUnavailableRecovery: !0 === o.entry?.pcmRecovery,
      msePcmRecoverySourceClaimId: o.entry?.pcmRecoverySourceClaimId || null,
      msePcmRecoverySourceClaimIds: Array.isArray(
        o.entry?.pcmRecoverySourceClaimIds,
      )
        ? o.entry.pcmRecoverySourceClaimIds.slice()
        : [],
      mseAheadDecodedPcmLeadSeconds: rP(a.decodedPcmLeadSeconds),
      mseStartupCatchup: Boolean(a.startupCatchup),
      batchSttProviderOverride: l ? LP(l) : void 0,
      batchSttProviderSelectionLockReason: wD(
        a.batchSttProviderSelectionLockReason || "",
      ),
      timelineRevision: gc.timelineRevision,
      createdAtMs: Date.now(),
    };
  return (
    (M.nextSegmentId += 1),
    Nx(
      "mse.coverage.pcm_primary_queued",
      {
        claimId: o.claimId,
        segmentId: b.id,
        mediaStartTime: aP(r.start),
        mediaEndTime: aP(r.end),
        durationMs: b.durationMs,
        uploadStartMediaTime: aP(f),
        contextSeconds: aP(h),
        startup: Boolean(a.startup),
        startupReason: wD(a.startupReason || ""),
        startupCatchup: Boolean(a.startupCatchup),
        sttProvider: b.batchSttProviderOverride || pg(),
        actualSttProvider: fg(b),
        providerSelectionLockReason:
          b.batchSttProviderSelectionLockReason || "",
        ringSpanSeconds: aP(
          rP(a.ringSpanSeconds) ?? (gc.pcmGroundTruthRingMs || 0) / 1e3,
        ),
        mseAheadDecoded: Boolean(a.mseAheadDecoded),
        mseAheadDecodedIdleTailFlush: Boolean(a.mseAheadDecodedIdleTailFlush),
        mseGroundTruthGapUrgent: Boolean(a.mseGroundTruthGapUrgent),
        mseInitialGapFill: Boolean(a.mseInitialGapFill),
        pcmSubtitleUnavailableRecovery: !0 === o.entry?.pcmRecovery,
        pcmRecoverySourceClaimId: o.entry?.pcmRecoverySourceClaimId || null,
        pcmRecoverySourceClaimIds: Array.isArray(
          o.entry?.pcmRecoverySourceClaimIds,
        )
          ? o.entry.pcmRecoverySourceClaimIds.slice()
          : [],
        decodedPcmLeadSeconds: aP(a.decodedPcmLeadSeconds),
        windowProfile: a.windowProfile
          ? {
              minSeconds: aP(a.windowProfile.minSeconds),
              preferredSeconds: aP(a.windowProfile.preferredSeconds),
              maxSeconds: aP(a.windowProfile.maxSeconds),
              deadlineConstrained: Boolean(a.windowProfile.deadlineConstrained),
              syncDelaySeconds: aP(a.windowProfile.syncDelaySeconds),
              pipelineReserveMs: Math.round(
                a.windowProfile.pipelineReserveMs || 0,
              ),
              configuredPipelineReserveMs: Math.round(
                a.windowProfile.configuredPipelineReserveMs || 0,
              ),
              measuredPipelineReserveMs: Math.round(
                a.windowProfile.measuredPipelineReserveMs || 0,
              ),
              sttReserveMs: Math.round(a.windowProfile.sttReserveMs || 0),
              llmReserveMs: Math.round(a.windowProfile.llmReserveMs || 0),
              readySubtitleLeadSeconds: aP(
                a.windowProfile.readySubtitleLeadSeconds,
              ),
              deadlineLeadSeconds: aP(a.windowProfile.deadlineLeadSeconds),
              availableDeadlineLeadSeconds: aP(
                a.windowProfile.availableDeadlineLeadSeconds,
              ),
              deadlineRiskThresholdSeconds: aP(
                a.windowProfile.deadlineRiskThresholdSeconds,
              ),
              observedDeadlineRisk: Boolean(
                a.windowProfile.observedDeadlineRisk,
              ),
            }
          : null,
      },
      { source: "offscreen" },
    ),
    a.mseInitialGapFill &&
      Nx(
        "mse.coverage.initial_pcm_gap_fill_scheduled",
        {
          claimId: o.claimId,
          segmentId: b.id,
          mediaStartTime: aP(r.start),
          mediaEndTime: aP(r.end),
          initialProcessingFloorMediaTime: aP(Og()),
          firstAcceptedMseMediaStartTime: aP(
            gc.mseAudio?.firstAcceptedMediaStartTime,
          ),
        },
        { source: "offscreen" },
      ),
    Yf(b),
    !0
  );
}
function Hu(e = {}, t = "") {
  const n = Array.isArray(e.chunks) ? e.chunks : [];
  if (!YM(e)) return n;
  if (nD(t)) return n;
  const a = Array.isArray(e.msePcmPrimaryCoreChunks)
    ? e.msePcmPrimaryCoreChunks
    : [];
  return a.length ? a : n;
}
function Gu(e = {}, t = "") {
  const n = LP(t || fg(e)),
    a = Array.isArray(e.chunks) ? e.chunks : [],
    r = Hu(e, n),
    i = Boolean(YM(e) && nD(n) && r === a),
    o = Math.max(0, oy(r) || rP(e.durationMs) || 0),
    s = sP(r.map((e) => rP(e?.sourceMediaStartTime)));
  return {
    ...e,
    chunks: r,
    durationMs: o,
    batchSttProviderOverride: n,
    msePcmPrimaryContextOverlap: i,
    msePcmPrimaryContextStartMediaTime: i
      ? (s ?? rP(e.msePcmPrimaryContextStartMediaTime))
      : rP(e.mseCoverageCoreStartMediaTime),
    msePcmPrimaryContextSeconds: i
      ? Math.max(0, rP(e.msePcmPrimaryContextSeconds) || 0)
      : 0,
    sttProviderAudioView: i ? "context-plus-core" : "core",
  };
}
function Wu() {
  const e = gc.mseStartupBoost || {};
  return Boolean(
    e.enabled &&
      e.active &&
      !e.switched &&
      e.mode === Rl &&
      !0 === e.batchOnlyAfterSeek &&
      !0 !== e.startupReleaseReady,
  );
}
function $u() {
  const e = gc.mseStartupBoost || {};
  return Boolean(
    e.enabled &&
      e.active &&
      !e.switched &&
      e.mode === Rl &&
      !0 !== e.batchOnlyAfterSeek &&
      !0 === e.initialBatchCatchupStarted,
  );
}
function Vu() {
  const e = gc.mseStartupBoost || {};
  return Boolean(
    $u() &&
      !0 !== e.initialBatchCatchupFirstReady &&
      Math.max(0, Number(e.initialBatchCatchupSegmentsQueued) || 0) < 2,
  );
}
function ju() {
  const e = gc.mseStartupBoost || {};
  if (
    !e.enabled ||
    !e.active ||
    e.switched ||
    e.mode !== Rl ||
    (!0 !== e.batchOnlyAfterSeek && !0 !== e.initialBatchCatchupStarted)
  )
    return "";
  const t = pg();
  return QP(t) && BP(t, gc.config?.sourceLang) ? t : "";
}
function Ku() {
  return !0 !== (gc.mseStartupBoost || {}).batchOnlyAfterSeek ? "" : ju();
}
function zu(e = "startup-release-ready", t = Date.now()) {
  const n = gc.mseStartupBoost || {};
  if (
    !n.enabled ||
    !n.active ||
    n.switched ||
    n.mode !== Rl ||
    !0 === n.batchOnlyAfterSeek ||
    !0 !== n.startupReleaseReady
  )
    return !1;
  if (n.initialBatchCatchupStarted) return !1;
  ((n.initialBatchCatchupStarted = !0),
    (n.initialBatchCatchupStartedAtMs = t),
    (n.initialBatchCatchupReason = wD(e) || "startup-release-ready"));
  const a = rP(n.startupReleaseReadyDecision?.range?.end),
    r = Fk(t) ?? zA(t),
    i =
      null === a && null !== r
        ? Hp(
            r,
            $p(
              [...Op(n.startupReleaseReadyRanges), ...ou({ readyOnly: !0 })],
              1,
            ),
            Vl,
          )
        : null;
  return (
    (n.initialBatchCatchupStartMediaTime = a ?? rP(i?.end)),
    Nx(
      "mse.startup_boost.batch_catchup_started",
      {
        reason: n.initialBatchCatchupReason,
        startupReleaseReadyAtMs: rP(n.startupReleaseReadyAtMs) || 0,
        startupReleaseReadyLeadSeconds:
          rP(n.startupReleaseReadyLeadSeconds) || 0,
        mediaStartTime: aP(n.initialBatchCatchupStartMediaTime),
        sttProvider: ju(),
        llmProvider: n.standardProvider || qP(gc.config?.provider),
      },
      { source: "offscreen" },
    ),
    qg(t),
    Ju(t),
    !0
  );
}
function Qu() {
  const e = gc.mseStartupBoost || {};
  return Boolean(
    e.enabled &&
      e.active &&
      !e.switched &&
      e.mode === Rl &&
      !0 !== e.batchOnlyAfterSeek &&
      !0 !== e.initialBatchCatchupStarted &&
      gc.activeSttProvider === Z,
  );
}
function Ju(e = Date.now()) {
  const t = eg(),
    n = !t && rg(),
    a = t ? null : og(),
    r = Boolean(a);
  if (!t && !n && !r) return !1;
  if (gc.isStopping || !1 === gc.acceptingNewSttWork) return !1;
  if (Qu()) return !1;
  const i = gc.mseStartupBoost || {},
    o = gc.pcmGroundTruthRing || [],
    s = rP(o[0]?.sourceMediaStartTime),
    l = rP(o[o.length - 1]?.sourceMediaEndTime);
  if (null === s || null === l || l <= s) return !1;
  const c = Math.min(l - ci, r ? a.end : Number.MAX_SAFE_INTEGER);
  if (c <= s) return !1;
  const d = $u() ? rP(i.initialBatchCatchupStartMediaTime) : null,
    u = r ? Math.max(s, a.start) : null === d ? s : Math.max(s, d);
  if (c <= u) return !1;
  t && Uu(u, c);
  const m = Nm(e);
  let g = 0;
  for (let t = 0; t < 2; t += 1) {
    const t = fu(gu(u, c), s, c);
    if (t.skipped) {
      const e = `${aP(t.skipped.start)}:${aP(t.skipped.end)}`,
        n = gc.msePcmCoverageWatchdog || (gc.msePcmCoverageWatchdog = ym());
      n.lastBoundaryGapSignature !== e &&
        ((n.lastBoundaryGapSignature = e),
        Nx(
          "mse.coverage.leading_clock_boundary_tolerated",
          {
            mediaStartTime: aP(t.skipped.start),
            mediaEndTime: aP(t.skipped.end),
            durationSeconds: aP(t.skipped.end - t.skipped.start),
            ringStartMediaTime: aP(s),
            availableMediaEndTime: aP(c),
            timelineRevision: gc.timelineRevision,
          },
          { source: "offscreen", level: "warn" },
        ));
    }
    const a = t.candidates.filter((e) =>
      r
        ? "uncovered" === e.type
        : !n || "subtitle-unavailable-recovery" === e.type,
    );
    if (!a.length) break;
    const l = a[0],
      d = "subtitle-unavailable-recovery" === l.type,
      p = Wu(),
      f = Vu(),
      h = p || f,
      S = ju(),
      M = d ? CM(S) : "";
    if (d && !M) break;
    const v = 0 === Xd().pcmSegmentsScheduled || h,
      y = r || l.end < c - Qr,
      b = qu({
        startup: v,
        seekCatchup: h,
        deadlineLeadSeconds: null === m ? null : l.start - m,
      }),
      T = d
        ? l.end
        : Ou(o, l.start, l.end, {
            startup: v,
            seekCatchup: h,
            blockedTail: y,
            allowShortBlockedTail: r,
            windowProfile: b,
          });
    if (null === T || T <= l.start) break;
    if (
      !Nu(o, l.start, T, {
        startup: v,
        reason: d
          ? "mse-pcm-subtitle-unavailable-recovery"
          : r
            ? "mse-pcm-initial-gap-fill"
            : void 0,
        startupReason: d
          ? "subtitle-unavailable-recovery"
          : r
            ? "single-tab-initial-gap-fill"
            : p
              ? "seek-catchup"
              : f
                ? "initial-batch-catchup"
                : v
                  ? "first-segment"
                  : "",
        startupCatchup: $u(),
        batchSttProviderOverride: d ? M : S,
        batchSttProviderSelectionLockReason: d
          ? "pcm-subtitle-unavailable-recovery"
          : "",
        windowProfile: b,
        mseInitialGapFill: r,
        pcmSubtitleUnavailableRecovery: d,
      })
    )
      break;
    if (gc.config?.hybridSubtitleCacheMode) {
      const t = Nm(e);
      Nx(
        "subtitle.cache.gap_prefetch_scheduled",
        {
          mediaStartTime: aP(l.start),
          mediaEndTime: aP(T),
          viewerMediaTime: aP(t),
          leadSeconds: null === t ? null : aP(Math.max(0, l.start - t)),
          availableMediaEndTime: aP(c),
          maxPrefetchLeadSeconds: ir,
          cacheCoverageSource: gc.config.cachedSubtitleCoverageSource || "",
          deadlineConstrained: Boolean(b.deadlineConstrained),
        },
        { source: "offscreen" },
      );
    }
    (f &&
      (i.initialBatchCatchupSegmentsQueued =
        Math.max(0, Number(i.initialBatchCatchupSegmentsQueued) || 0) + 1),
      (g += 1));
  }
  return (g && Xu("pcm-scheduled", e), g > 0);
}
function Xu(e = "periodic", t = Date.now()) {
  const n = ru();
  if ("periodic" === e && t - (n.lastSnapshotAtMs || 0) < 1e4) return !1;
  n.lastSnapshotAtMs = t;
  const a = n.entries.filter((e) => eu(e.stage)),
    r = fm(ou({ processedOnly: !0 }), 0, Number.MAX_SAFE_INTEGER),
    i = a.reduce((e, t) => ((e[t.stage] = (e[t.stage] || 0) + 1), e), {});
  return (
    Nx(
      "mse.coverage.snapshot",
      {
        reason: e,
        entries: a.length,
        uniqueSeconds: aP(r),
        billedSttSeconds: aP((gc.sttBillableAudioMs || 0) / 1e3),
        duplicateRatio:
          r > 0
            ? aP(Math.max(0, (gc.sttBillableAudioMs || 0) / 1e3 - r) / r)
            : 0,
        duplicateSecondsPrevented: aP(n.duplicateSecondsPrevented),
        pcmSegmentsScheduled: n.pcmSegmentsScheduled,
        mseSegmentsClaimed: n.mseSegmentsClaimed,
        supersededMseSegments: n.supersededMseSegments,
        stageCounts: i,
      },
      { source: "offscreen" },
    ),
    !0
  );
}
function Zu(e) {
  if (uy()) return;
  const t = gc.mseAudio || null;
  if (null !== rP(t?.seekTargetMediaTime) && !0 !== t?.seekAnchorEstablished) {
    const e = Date.now();
    return void (
      e - (rP(t.seekAnchorWaitLogAtMs) || 0) >= 3e3 &&
      ((t.seekAnchorWaitLogAtMs = e),
      Nx(
        "pcm.ground_truth.seek_anchor_wait",
        {
          seekTargetMediaTime: aP(t.seekTargetMediaTime),
          expectedSeekConfirmed: Boolean(gc.expectedSourceSeekConfirmedAtMs),
          sourceMediaTime: aP(VA(e)),
          msePlaybackMediaTime: aP(jA(e)),
        },
        { source: "offscreen", level: "warn" },
      ))
    );
  }
  const n = Yu(
    ly(e.inputBuffer.getChannelData(0), gc.audioContext?.sampleRate || Ge),
  );
  if (!n) return;
  const a = gc.pcmGroundTruthRing || (gc.pcmGroundTruthRing = []),
    r = a[a.length - 1] || null,
    i = rP(r?.sourceMediaEndTime),
    o = rP(n.sourceMediaStartTime);
  if (null !== i && null !== o && Math.abs(o - i) > Mr) {
    const e = a.length,
      t = gc.pcmGroundTruthRingMs || 0;
    ((a.length = 0),
      (gc.pcmGroundTruthRingMs = 0),
      (gc.msePcmCoverageWatchdog = ym()),
      Nx(
        "pcm.ground_truth.timeline_discontinuity",
        {
          phase: "ring-boundary",
          previousEndMediaTime: aP(i),
          nextStartMediaTime: aP(o),
          gapSeconds: aP(o - i),
          droppedChunks: e,
          droppedMs: Math.round(t),
        },
        { source: "offscreen", level: "warn" },
      ));
  }
  for (
    a.push(n),
      gc.pcmGroundTruthRingMs = (gc.pcmGroundTruthRingMs || 0) + n.durationMs;
    a.length && gc.pcmGroundTruthRingMs > Sr;

  )
    ((gc.pcmGroundTruthRingMs -= a[0].durationMs), a.shift());
  Cm();
}
function Yu(e = null, t = Date.now()) {
  if (!e) return null;
  const n = Math.max(0, rP(e.durationMs) || 0) / 1e3;
  if (n <= 0) return null;
  const a =
      gc.pcmGroundTruthClock ||
      (gc.pcmGroundTruthClock = {
        mediaEndTime: null,
        wallTimeMs: 0,
        lastSource: "",
      }),
    r = rP(e.sourceMediaStartTime),
    i = rP(e.sourceMediaEndTime),
    o = sP([i, VA(t), jA(t)]),
    s = dP(
      sP([
        gc.sourceMediaTiming?.paused
          ? null
          : gc.sourceMediaTiming?.playbackRate,
        gc.mseAudio?.lastSourcePlaybackRate,
        1,
      ]) || 1,
      0.25,
      4,
    ),
    l = null !== r && null !== i ? Math.max(0, i - r) : null,
    c = l && l > 0 ? l : n * s,
    d = rP(a.mediaEndTime);
  let u = o,
    m = null !== i ? "source-probe" : null !== o ? "mse-current-time" : "";
  if (null !== d) {
    const e = d + c;
    if (null === u) ((u = e), (m = "pcm-continuity"));
    else if (Math.abs(u - e) <= Mr)
      ((u = e), (m = `${m || "source-probe"}+continuity`));
    else {
      const t = gc.pcmGroundTruthRing?.length || 0,
        n = gc.pcmGroundTruthRingMs || 0;
      ((gc.pcmGroundTruthRing = []),
        (gc.pcmGroundTruthRingMs = 0),
        (gc.msePcmCoverageWatchdog = ym()),
        (m = `${m || "source-probe"}+reset`),
        Nx(
          "pcm.ground_truth.timeline_discontinuity",
          {
            phase: "clock-anchor",
            previousEndMediaTime: aP(d),
            continuousEndMediaTime: aP(e),
            observedEndMediaTime: aP(u),
            jumpSeconds: aP(u - e),
            playbackRate: aP(s),
            droppedChunks: t,
            droppedMs: Math.round(n),
          },
          { source: "offscreen", level: "warn" },
        ));
    }
  }
  if (null === u) return null;
  const g = Math.max(0, u - c);
  return (
    (a.mediaEndTime = u),
    (a.wallTimeMs = t),
    (a.lastSource = m || "unknown"),
    {
      ...e,
      sourceMediaStartTime: g,
      sourceMediaEndTime: u,
      sourcePlaybackRate: s,
      groundTruthTimingSource: a.lastSource,
    }
  );
}
function em(e, t, n = 0, a = {}) {
  const r = rP(e),
    i = rP(t);
  if (null === r || null === i || i - r < Pr) return !1;
  if (zm() && Xd().version >= 1) return !1;
  if (pp(r, i)) return !1;
  const o = gc.mseCoverageHoles || (gc.mseCoverageHoles = []),
    s = wD(a.kind || "mse-gap") || "mse-gap",
    l = wD(a.reason || "mse-discontinuity-gap") || "mse-discontinuity-gap",
    c = `${s}:${Math.max(0, Math.round(Number(n) || 0))}:${aP(r)}:${aP(i)}`,
    d = vm(r, i, Date.now(), { allowTranscribedCoverage: Mm(l) });
  if (d.covered)
    return (
      Nx(
        "mse.audio_buffer.gap_backfill_hole_skipped_covered",
        {
          mediaStartTime: aP(r),
          mediaEndTime: aP(i),
          reason: l,
          coverageReason: d.reason,
          coverageRatio: aP(d.coverageRatio),
          coveredSeconds: aP(d.coveredSeconds),
          contiguousCoveredEnd: aP(d.contiguousCoveredEnd),
          gapStart: aP(d.gapStart),
          gapEnd: aP(d.gapEnd),
          scheduledRoute: d.scheduledRoute || "",
          scheduledAgeMs: Math.round(rP(d.scheduledAgeMs) || 0),
        },
        { source: "offscreen" },
      ),
      !1
    );
  const u = tm(o, r, i);
  if (u) {
    const e = { start: u.start, end: u.end, cursor: rP(u.backfillCursor) };
    return (
      (u.start = Math.min(u.start, r)),
      (u.end = Math.max(u.end, i)),
      (u.backfillCursor = Math.min(rP(u.backfillCursor) ?? u.start, r)),
      (u.detectedAtMs = Math.min(rP(u.detectedAtMs) || Date.now(), Date.now())),
      (u.reason = nm(u.reason, l)),
      Nx(
        "mse.audio_buffer.gap_backfill_hole_merged",
        {
          mediaStartTime: aP(r),
          mediaEndTime: aP(i),
          mergedStartMediaTime: aP(u.start),
          mergedEndMediaTime: aP(u.end),
          previousStartMediaTime: aP(e.start),
          previousEndMediaTime: aP(e.end),
          previousCursorMediaTime: aP(e.cursor),
          nextCursorMediaTime: aP(u.backfillCursor),
          reason: l,
          mergedReason: u.reason,
          pipelineRangeId: u.pipelineRangeId || "",
        },
        { source: "offscreen", level: "warn" },
      ),
      rh(u.start, u.end, "gap-merged", {
        pipelineRangeId: u.pipelineRangeId || "",
        reason: u.reason,
      }),
      !1
    );
  }
  return (
    o.push({
      start: r,
      end: i,
      sequence: Math.max(0, Math.round(Number(n) || 0)),
      pipelineRangeId: c,
      reason: l,
      detectedAtMs: Date.now(),
      backfillCursor: r,
      lastBackfillAtMs: 0,
      backfilled: !1,
    }),
    rh(r, i, "gap-detected", { pipelineRangeId: c, reason: l }),
    o.length > qr && o.splice(0, o.length - qr),
    !0
  );
}
function tm(e = [], t = null, n = null) {
  const a = rP(t),
    r = rP(n);
  if (null === a || null === r || r <= a) return null;
  const i = Math.max(0.001, r - a);
  let o = null,
    s = 0;
  for (const t of e || []) {
    if (!t || t.backfilled) continue;
    const e = rP(t.start),
      n = rP(t.end);
    if (null === e || null === n || n <= e) continue;
    const l = Math.max(0, Math.min(r, n) - Math.max(a, e));
    if (l <= 0) continue;
    const c = l / i,
      d = l / Math.max(0.001, n - e);
    if (
      !((Math.abs(e - a) < 0.5 && Math.abs(n - r) < 0.5) || c >= Nr || d >= Nr)
    )
      continue;
    const u = Math.max(c, d);
    u > s && ((o = t), (s = u));
  }
  return o;
}
function nm(e = "", t = "") {
  const n = [e, t]
    .flatMap((e) => String(e || "").split("+"))
    .map((e) => e.trim())
    .filter(Boolean);
  return Array.from(new Set(n)).join("+") || "mse-gap";
}
function am(e, t, n = 0, a = {}) {
  const r = rP(e),
    i = rP(t);
  if (null === r || null === i || i - r < Pr) return 0;
  const o = Math.max(Pr, rP(a.chunkSeconds) || ki),
    s = Math.max(o, rP(a.maxSeconds) || Ci),
    l = Math.min(i, r + s);
  let c = Math.max(0, r),
    d = 0,
    u = 0;
  const m = 1e3 * Math.max(0, Math.round(Number(n) || 0));
  for (; l - c >= Pr; ) {
    const e = Math.min(l, c + o);
    (em(c, e, m + d, a) && (u += 1), (c = e), (d += 1));
  }
  return u;
}
function rm({
  mediaStartTime: e = null,
  playbackTime: t = null,
  sequence: n = 0,
} = {}) {
  const a = rP(t),
    r = rP(e);
  if (null === a || null === r) return !1;
  if (r - a < Pr) return !1;
  if (!hg()) return !1;
  const i = gc.mseStartupBoost || {};
  if (i.mode !== xl && i.mode !== El) return !1;
  const o = gc.mseAudio || (gc.mseAudio = Py()),
    s = rP(o.firstAcceptedMediaStartTime) ?? r;
  if (Math.abs(r - s) > 0.75) return !1;
  const l = rP(o.leadingCoverageBackfillEndTime),
    c = Math.min(s, a + wi);
  let d = Math.max(0, a);
  if ((null !== l && l > d && (d = Math.min(l, c)), c - d < Pr)) return !1;
  const u = am(d, c, n, {
    kind: "mse-leading-gap",
    reason: "mse-leading-coverage-gap",
    chunkSeconds: Ti,
    maxSeconds: wi,
  });
  return (
    (o.leadingCoverageBackfillEndTime = Math.max(l || 0, c)),
    Nx(
      "mse.audio_buffer.leading_gap_backfill_registered",
      {
        sequence: Math.max(0, Math.round(Number(n) || 0)),
        playbackTime: aP(a),
        firstMseStartTime: aP(s),
        registeredEndTime: aP(c),
        chunkCount: u,
        chunkSeconds: Ti,
        maxSeconds: wi,
      },
      { source: "offscreen", level: "warn" },
    ),
    u > 0
  );
}
function im(e, t) {
  const n = rP(e),
    a = rP(t);
  if (null === n || null === a || a <= n) return;
  const r = Array.isArray(gc.mseTranscribedAudioRanges)
    ? gc.mseTranscribedAudioRanges
    : [];
  (r.push({ start: n, end: a }), r.sort((e, t) => e.start - t.start));
  const i = [];
  for (const e of r) {
    const t = i[i.length - 1];
    t && e.start <= t.end + xi
      ? (t.end = Math.max(t.end, e.end))
      : i.push({ start: e.start, end: e.end });
  }
  (i.length > Ei && i.splice(0, i.length - Ei),
    (gc.mseTranscribedAudioRanges = i));
}
function om(e = {}) {
  if (!ib(e)) return;
  const t = sp(e);
  t && im(t.start, t.end);
}
function sm(e, t) {
  const n = rP(e),
    a = rP(t);
  if (null === n || null === a || a <= n) return !1;
  const r = gc.mseTranscribedAudioRanges;
  return !(!Array.isArray(r) || !r.length) && hm(r, n, a, xi).covered;
}
function lm(e, t) {
  const n = rP(e),
    a = rP(t);
  return null === n || null === a || a <= n
    ? { covered: !1, coveredSeconds: 0, coverageRatio: 0, coveredEnd: n }
    : hm(
        Array.isArray(gc.mseTranscribedAudioRanges)
          ? gc.mseTranscribedAudioRanges
          : [],
        n,
        a,
        xi,
      );
}
function cm({
  current: e = null,
  coveredRange: t = null,
  futureRange: n = null,
  reason: a = "mse-subtitle-coverage-gap",
  sequence: r = 0,
} = {}) {
  const i = rP(e);
  if (null === i || gc.isStopping || !zm()) return !1;
  if (!QP(pg())) return !1;
  const o = Op(gc.mseStartupBoost?.readySubtitleRanges),
    s = rP(t?.end),
    l =
      o.filter((e) => e.end <= i + 1).sort((e, t) => t.end - e.end)[0] || null,
    c =
      n ||
      o
        .filter((e) => e.start > (s ?? i) + 1)
        .sort((e, t) => e.start - t.start)[0] ||
      null,
    d = Math.max(0, s ?? rP(l?.end) ?? i),
    u = rP(c?.start);
  if (
    null === u ||
    u - d < ("mse-subtitle-gap-after-covering-range" === a ? Ai : Pr)
  )
    return !1;
  const m = Math.min(u, d + Ci);
  if ("mse-subtitle-gap-after-covering-range" === a && m - d <= Ri && sm(d, m))
    return (
      Nx(
        "mse.audio_buffer.subtitle_gap_skipped_transcribed_silence",
        {
          reason: a,
          playbackTime: aP(i),
          gapStartMediaTime: aP(d),
          gapEndMediaTime: aP(m),
          transcribedRangeCount: Array.isArray(gc.mseTranscribedAudioRanges)
            ? gc.mseTranscribedAudioRanges.length
            : 0,
        },
        { source: "offscreen" },
      ),
      !1
    );
  const g = am(d, u, r, {
    kind: "mse-subtitle-coverage-gap",
    reason: a,
    chunkSeconds: ki,
    maxSeconds: Ci,
  });
  return (
    !!g &&
    (Nx(
      "mse.audio_buffer.subtitle_coverage_gap_backfill_registered",
      {
        reason: a,
        playbackTime: aP(i),
        gapStartMediaTime: aP(d),
        gapEndMediaTime: aP(Math.min(u, d + Ci)),
        futureRange: c ? { start: aP(c.start), end: aP(c.end) } : null,
        coveredRange: t ? { start: aP(t.start), end: aP(t.end) } : null,
        chunkCount: g,
      },
      { source: "offscreen", level: "warn" },
    ),
    !0)
  );
}
function dm(e = null, t = null) {
  const n = rP(t),
    a = rP(e?.start),
    r = rP(e?.end);
  if (null === n || null === a || null === r || r <= a) return !1;
  if (a - n < Pr) return !1;
  const i = cm({
    current: n,
    coveredRange: Hp(n, gc.mseStartupBoost?.readySubtitleRanges),
    futureRange: e,
    reason: "mse-subtitle-gap-before-future-range",
    sequence: e.sequence,
  });
  return (i && jm(), i);
}
function um(e, t) {
  const n = gc.mseCoverageHoles;
  if (!n?.length) return;
  const a = rP(e),
    r = rP(t);
  if (!(null === a || null === r || r <= a))
    for (const e of n)
      e.backfilled ||
        (Math.max(0, Math.min(r, e.end) - Math.max(a, e.start)) /
          Math.max(0.001, e.end - e.start) >=
          0.8 &&
          ((e.backfilled = !0),
          rh(e.start, e.end, "gap-covered", {
            pipelineRangeId: e.pipelineRangeId || "",
            reason: "mse-repost-covered",
            done: !0,
            active: !1,
          })));
}
function mm(e, t, n) {
  const a = rP(e),
    r = rP(t);
  return null === a || null === r ? null : a + (r - a) * dP(rP(n) || 0, 0, 1);
}
function gm(e = {}, t = null, n = null) {
  const a = rP(e.sourceMediaStartTime),
    r = rP(e.sourceMediaEndTime),
    i = rP(t),
    o = rP(n);
  if (null === a || null === r || null === i || null === o || r <= a || o <= i)
    return null;
  const s = Math.max(a, i),
    l = Math.min(r, o);
  if (l - s < We) return null;
  const c =
    e.rawCaptureSamples || e.captureSamples || e.samples || new Float32Array();
  if (!c.length) return null;
  const d = r - a,
    u = dP((s - a) / d, 0, 1),
    m = dP((l - a) / d, u, 1),
    g = ay(Math.floor(u * c.length), 0, c.length),
    p = ay(Math.ceil(m * c.length), g, c.length);
  if (p <= g) return null;
  const f = c.slice(g, p),
    h = Math.max(0, 1e3 * (l - s)),
    S = Math.max(0, (f.length / Ge) * 1e3);
  return {
    ...e,
    rawCaptureSamples: f,
    captureSamples: f,
    samples: f,
    durationMs: h,
    captureDurationMs: S,
    sourceMediaStartTime: s,
    sourceMediaEndTime: l,
    captureStartMs: mm(e.captureStartMs, e.captureEndMs, u),
    captureEndMs: mm(e.captureStartMs, e.captureEndMs, m),
    captureStartWallTimeMs: mm(
      e.captureStartWallTimeMs,
      e.captureEndWallTimeMs ?? e.capturedAtMs,
      u,
    ),
    captureEndWallTimeMs: mm(
      e.captureStartWallTimeMs,
      e.captureEndWallTimeMs ?? e.capturedAtMs,
      m,
    ),
    capturedAtMs:
      mm(
        e.captureStartWallTimeMs,
        e.captureEndWallTimeMs ?? e.capturedAtMs,
        m,
      ) ?? e.capturedAtMs,
    preparedForStt: !1,
  };
}
function pm(e = [], t = null, n = null) {
  const a = rP(t),
    r = rP(n);
  if (null === a || null === r || r <= a)
    return { chunks: [], coveredMs: 0, coveredSeconds: 0 };
  const i = [];
  let o = 0;
  for (const t of Array.isArray(e) ? e : []) {
    const e = gm(t, a, r);
    if (!e) continue;
    i.push(e);
    const n = rP(e.sourceMediaStartTime),
      s = rP(e.sourceMediaEndTime);
    null !== n && null !== s && s > n && (o += s - n);
  }
  return { chunks: i, coveredMs: Math.round(1e3 * o), coveredSeconds: o };
}
function fm(e = [], t = null, n = null) {
  const a = rP(t),
    r = rP(n);
  if (null === a || null === r || r <= a) return 0;
  const i = (Array.isArray(e) ? e : [])
    .map((e) => ({
      start: Math.max(a, rP(e?.start) ?? a),
      end: Math.min(r, rP(e?.end) ?? a),
    }))
    .filter((e) => e.end > e.start)
    .sort((e, t) => e.start - t.start);
  let o = 0,
    s = null;
  for (const e of i)
    null === s || e.start > s
      ? ((o += e.end - e.start), (s = e.end))
      : e.end > s && ((o += e.end - s), (s = e.end));
  return o;
}
function hm(e = [], t = null, n = null, a = 0) {
  const r = rP(t),
    i = rP(n),
    o = Math.max(0, rP(a) ?? 0);
  if (null === r || null === i || i <= r)
    return {
      covered: !1,
      coveredSeconds: 0,
      coverageRatio: 0,
      coveredEnd: r,
      gapStart: r,
      gapEnd: i,
    };
  const s = Op(e);
  let l = r,
    c = 0;
  for (const e of s) {
    if (e.end <= l) continue;
    if (e.start > l + o) {
      const t = fm(s, r, i);
      return {
        covered: !1,
        coveredSeconds: t,
        coverageRatio: t / Math.max(0.001, i - r),
        coveredEnd: l,
        gapStart: l,
        gapEnd: Math.min(i, e.start),
      };
    }
    const t = Math.min(i, Math.max(l, e.end));
    if ((t > l && ((c += t - l), (l = t)), l >= i - o))
      return {
        covered: !0,
        coveredSeconds: i - r,
        coverageRatio: 1,
        coveredEnd: i,
        gapStart: null,
        gapEnd: null,
      };
  }
  const d = fm(s, r, i);
  return {
    covered: !1,
    coveredSeconds: d,
    coverageRatio: d / Math.max(0.001, i - r),
    coveredEnd: l,
    gapStart: l,
    gapEnd: i,
  };
}
function Sm(e, t, n = Date.now()) {
  const a = rP(e),
    r = rP(t);
  if (null === a || null === r || r <= a) return null;
  const i = gc.mseAudio || {},
    o = (Array.isArray(i.scheduledRanges) ? i.scheduledRanges : [])
      .map((e) => {
        const t = rP(e?.start),
          a = rP(e?.end);
        return null === t || null === a || a <= t
          ? null
          : {
              ...e,
              start: t,
              end: a,
              ageMs: Math.max(0, n - sP([e.progressAtMs, e.addedAtMs, n])),
            };
      })
      .filter(Boolean),
    s = hm(o, a, r, 1);
  if (!s.covered) return null;
  const l =
    o
      .filter((e) => Math.min(r, e.end) - Math.max(a, e.start) > 0)
      .sort((e, t) => e.ageMs - t.ageMs)[0] || null;
  if (!l) return null;
  const c = String(l.stage || "").endsWith("uploading") ? Wr : hg() ? Gr : Hr;
  return {
    route: l.route || "scheduled",
    stage: l.stage || "scheduled",
    ageMs: l.ageMs,
    fresh: l.ageMs <= c,
    coverageRatio: s.coverageRatio,
    coveredSeconds: s.coveredSeconds,
    contiguousCoveredEnd: s.coveredEnd,
    gapStart: s.gapStart,
    gapEnd: s.gapEnd,
  };
}
function Mm(e = "") {
  return !String(e || "").startsWith("mse-subtitle-gap");
}
function vm(e, t, n = Date.now(), a = {}) {
  const r = rP(e),
    i = rP(t);
  if (null === r || null === i || i <= r)
    return { covered: !1, reason: "invalid-range" };
  if (pp(r, i)) return { covered: !0, reason: "subtitle-cache" };
  const o = xm(r, i);
  if (o.covered)
    return {
      covered: !0,
      reason: "ready-subtitles",
      coverageRatio: o.coverageRatio,
      coveredSeconds: o.coveredSeconds,
      contiguousCoveredEnd: o.contiguousCoveredEnd,
      gapStart: o.gapStart,
      gapEnd: o.gapEnd,
    };
  const s = !1 === a.allowTranscribedCoverage ? null : lm(r, i);
  if (s?.covered)
    return {
      covered: !0,
      reason: "transcribed-audio",
      coverageRatio: s.coverageRatio,
      coveredSeconds: s.coveredSeconds,
      contiguousCoveredEnd: s.coveredEnd,
      gapStart: s.gapStart,
      gapEnd: s.gapEnd,
    };
  const l = Sm(r, i, n);
  return l
    ? l.fresh
      ? {
          covered: !0,
          reason: "fresh-scheduled",
          scheduledRoute: l.route,
          scheduledStage: l.stage,
          scheduledAgeMs: l.ageMs,
          coverageRatio: l.coverageRatio,
          coveredSeconds: l.coveredSeconds,
          contiguousCoveredEnd: l.contiguousCoveredEnd,
          gapStart: l.gapStart,
          gapEnd: l.gapEnd,
        }
      : {
          covered: !1,
          reason: "stale-scheduled-not-ready",
          scheduledRoute: l.route,
          scheduledStage: l.stage,
          scheduledAgeMs: l.ageMs,
          coverageRatio: l.coverageRatio,
          coveredSeconds: l.coveredSeconds,
          contiguousCoveredEnd: l.contiguousCoveredEnd,
          gapStart: l.gapStart,
          gapEnd: l.gapEnd,
        }
    : { covered: !1, reason: "not-covered" };
}
function ym() {
  return {
    cursorMediaTime: null,
    lastCheckAtMs: 0,
    lastProgressAtMs: 0,
    lastProgressMediaTime: null,
    schedulableSinceMs: 0,
    lastStallLogAtMs: 0,
    lastErrorSignature: "",
    lastErrorAtMs: 0,
    lastBoundaryGapSignature: "",
  };
}
function bm() {
  gc.msePcmCoverageWatchdogTimer &&
    (clearInterval(gc.msePcmCoverageWatchdogTimer),
    (gc.msePcmCoverageWatchdogTimer = null));
}
function Tm() {
  !gc.msePcmCoverageWatchdogTimer &&
    zm() &&
    (gc.msePcmCoverageWatchdogTimer = setInterval(() => {
      !gc.isStopping && !1 !== gc.acceptingNewSttWork && gc.sessionId
        ? Cm(Date.now(), { trigger: "heartbeat" })
        : bm();
    }, Vr));
}
function wm(e, t, n, a = "") {
  const r = gc.msePcmCoverageWatchdog || (gc.msePcmCoverageWatchdog = ym()),
    i = t?.message || String(t || "unknown scheduler error"),
    o = `${e}:${i}`;
  (o === r.lastErrorSignature && n - r.lastErrorAtMs < jr) ||
    ((r.lastErrorSignature = o),
    (r.lastErrorAtMs = n),
    Nx(
      "mse.coverage.scheduler_error",
      {
        lane: e,
        trigger: a,
        error: i,
        pcmRingSeconds: aP((gc.pcmGroundTruthRingMs || 0) / 1e3),
        timelineRevision: gc.timelineRevision,
      },
      { source: "offscreen", level: "error" },
    ));
}
function km(e, t = "") {
  if (!eg()) return !1;
  const n = gc.msePcmCoverageWatchdog || (gc.msePcmCoverageWatchdog = ym()),
    a = Array.isArray(gc.pcmGroundTruthRing) ? gc.pcmGroundTruthRing : [],
    r = rP(a[0]?.sourceMediaStartTime),
    i = rP(a[a.length - 1]?.sourceMediaEndTime);
  if (null === r || null === i || i <= r)
    return ((n.schedulableSinceMs = 0), !1);
  const o = i - ci,
    s =
      fu(gu(r, o), r, o).candidates.filter((e) => "uncovered" === e.type)[0] ||
      null;
  if (!s) return ((n.schedulableSinceMs = 0), !1);
  const l = Nm(e),
    c = qu({
      startup: 0 === Xd().pcmSegmentsScheduled,
      seekCatchup: Wu(),
      deadlineLeadSeconds: null === l ? null : s.start - l,
    }),
    d = Math.max(0, Math.min(s.end, o) - s.start);
  return d < c.minSeconds
    ? ((n.schedulableSinceMs = 0), !1)
    : (n.schedulableSinceMs || (n.schedulableSinceMs = e),
      !(
        e - n.schedulableSinceMs < 3e3 ||
        e - n.lastStallLogAtMs < jr ||
        ((n.lastStallLogAtMs = e),
        Nx(
          "mse.coverage.pcm_primary_stalled",
          {
            trigger: t,
            mediaStartTime: aP(s.start),
            mediaEndTime: aP(s.end),
            ringStartMediaTime: aP(r),
            ringEndMediaTime: aP(i),
            viewerMediaTime: aP(l),
            schedulableSeconds: aP(d),
            minWindowSeconds: aP(c.minSeconds),
            stalledMs: Math.max(0, e - n.schedulableSinceMs),
            lastProgressAtMs: rP(n.lastProgressAtMs) || 0,
            lastProgressMediaTime: aP(n.lastProgressMediaTime),
            timelineRevision: gc.timelineRevision,
          },
          { source: "offscreen", level: "error" },
        ),
        0)
      ));
}
function Cm(e = Date.now(), t = {}) {
  const n = gc.msePcmCoverageWatchdog || (gc.msePcmCoverageWatchdog = ym());
  if (e - n.lastCheckAtMs < $r) return !1;
  n.lastCheckAtMs = e;
  const a = wD(t.trigger || "audio-callback") || "audio-callback",
    r = "function" == typeof t.sourceScheduler ? t.sourceScheduler : Ju,
    i = "function" == typeof t.aheadScheduler ? t.aheadScheduler : qg;
  let o = !1,
    s = 0;
  try {
    o = Boolean(r(e));
  } catch (t) {
    wm("source-pcm", t, e, a);
  }
  try {
    s = eg() ? Math.max(0, Number(i(e)) || 0) : 0;
  } catch (t) {
    wm("ahead-decoded-pcm", t, e, a);
  }
  return (
    o
      ? ((n.lastProgressAtMs = e),
        (n.lastProgressMediaTime = rP(
          gc.pcmGroundTruthRing?.[gc.pcmGroundTruthRing.length - 1]
            ?.sourceMediaEndTime,
        )),
        (n.schedulableSinceMs = 0))
      : km(e, a),
    s > 0 || o
  );
}
function Am(e, t) {
  return vm(e, t).covered;
}
function Rm(e = [], t = null) {
  const n = Array.isArray(e) ? e : [],
    a = n
      .map((e) =>
        sP([e?.audioStartMediaTime, e?.displayAfterMediaTime, e?.mediaTime]),
      )
      .filter((e) => null !== e),
    r = n
      .map((e) =>
        sP([
          e?.mediaTimeEnd,
          e?.audioEndMediaTime,
          e?.mediaTime,
          e?.displayAfterMediaTime,
        ]),
      )
      .filter((e) => null !== e),
    i = BC(t),
    o = UC(t);
  if (
    (null !== i && a.push(i), null !== o && r.push(o), !a.length || !r.length)
  )
    return null;
  const s = Math.min(...a),
    l = Math.max(...r);
  return !Number.isFinite(s) || !Number.isFinite(l) || l <= s
    ? null
    : { start: s, end: l };
}
function xm(e, t) {
  const n = rP(e),
    a = rP(t);
  if (null === n || null === a || a <= n)
    return {
      covered: !1,
      reason: "invalid-range",
      coverageRatio: 0,
      coveredSeconds: 0,
    };
  const r = Op(gc.mseStartupBoost?.readySubtitleRanges),
    i = fm(r, n, a),
    o = i / Math.max(0.001, a - n),
    s = hm(r, n, a, 1),
    l = s.covered && o >= Kl;
  return {
    covered: l,
    reason: l ? "ready-subtitles" : "not-covered",
    coverageRatio: o,
    coveredSeconds: i,
    contiguousCovered: s.covered,
    contiguousCoveredEnd: s.coveredEnd,
    gapStart: s.gapStart,
    gapEnd: s.gapEnd,
    readyRanges: r,
  };
}
function Em(e = [], t = null) {
  if (!zm()) return { ignored: !1, reason: "not-mse-session" };
  const n = Rm(e, t);
  if (!n) return { ignored: !1, reason: "missing-range" };
  const a = xm(n.start, n.end);
  return a.covered
    ? {
        ignored: !0,
        reason: "mse-ready-range-already-covered",
        range: n,
        coverageRatio: a.coverageRatio,
        coveredSeconds: a.coveredSeconds,
        contiguousCovered: a.contiguousCovered,
        contiguousCoveredEnd: a.contiguousCoveredEnd,
        gapStart: a.gapStart,
        gapEnd: a.gapEnd,
      }
    : {
        ignored: !1,
        reason: a.reason,
        range: n,
        coverageRatio: a.coverageRatio,
        coveredSeconds: a.coveredSeconds,
        contiguousCovered: a.contiguousCovered,
        contiguousCoveredEnd: a.contiguousCoveredEnd,
        gapStart: a.gapStart,
        gapEnd: a.gapEnd,
      };
}
function Pm(e = null, t = !1) {
  return Boolean(e?.ignored && !t);
}
function Dm(e = null) {
  if (!zm()) return null;
  const t = rP(e);
  return null === t ? null : { start: Math.max(0, t - 5), end: t + ih() };
}
function Im(e = Date.now()) {
  return Dm(sP([Fk(e), rP(gc.expectedSourceSeekTargetMediaTime)]));
}
function Lm(e = null, t = null, n = null) {
  const a = rP(t),
    r = rP(n);
  return (
    !(!e || null === a || null === r || r <= a) && r >= e.start && a <= e.end
  );
}
function _m(e = null) {
  return e && gc.finalTranslationBatch.length
    ? gc.finalTranslationBatch.filter(
        (t) => zp(t?.timing) && Lm(e, BC(t.timing), UC(t.timing)),
      )
    : [];
}
function Bm(e = {}, t = null) {
  const n = t || Im();
  if (!n) return !1;
  if (!ib(e) && !bh(e)) return !1;
  const a = sp(e);
  return !!a && Lm(n, a.start, a.end);
}
function Um(e = null) {
  const t = gc.batchStt;
  return t
    ? {
        nextSegmentId: Math.max(1, Math.round(Number(t.nextSegmentId) || 1)),
        queue: e ? (t.queue || []).filter((t) => Bm(t, e)) : [],
      }
    : null;
}
function qm(e = null) {
  if (!e) return 0;
  const t = sy();
  if (
    ((t.nextSegmentId = Math.max(t.nextSegmentId, e.nextSegmentId)),
    !e.queue.length)
  )
    return 0;
  for (const n of e.queue)
    ((n.timelineRevision = gc.timelineRevision),
      t.queue.push(n),
      nh(n, "queued", { reason: "seek-retained" }));
  const n = oh(e.queue);
  return (
    Nx(
      "stt.batch.seek_retained",
      {
        queuedSegments: e.queue.length,
        mediaStartTime: aP(n.start),
        mediaEndTime: aP(n.end),
      },
      { source: "offscreen" },
    ),
    hS(),
    e.queue.length
  );
}
function Fm(e = null) {
  return e
    ? (Array.isArray(gc.mseAudio?.scheduledRanges)
        ? gc.mseAudio.scheduledRanges
        : []
      ).filter((t) => Lm(e, rP(t?.start), rP(t?.end)))
    : [];
}
function Om(e, t = Date.now()) {
  const n = rP(e);
  if (null === n) return null;
  const a = Fk(t);
  return null === a ? null : n - a;
}
function Nm(e = Date.now()) {
  const t = Fk(e) ?? Nk(e);
  if (gc.sourceEndedGuardActive || !eD()) return t ?? zA(e);
  const n = zA(e),
    a = rP(gc.viewerMediaTiming?.actualDelaySeconds);
  return null !== n && null !== a ? Math.max(0, n - Math.max(0, a)) : (t ?? n);
}
function Hm() {
  const e = rP(gc.config?.mseSttUploadViewerBehindDropSeconds);
  return null !== e ? dP(e, 1, pl) : 8;
}
function Gm(e = {}, t = null) {
  if (!ib(e)) return null;
  const n = rP(t);
  if (null === n) return null;
  const a = sp(e),
    r = rP(a?.end);
  return null === r ? null : n - r;
}
function Wm(e = {}, t = null) {
  if (!bh(e)) return !1;
  const n = Gm(e, t);
  return null !== n && n > Hm();
}
function $m(e = sy(), t = null) {
  const n = e.queue || [],
    a = rP(t);
  if (!n.length || null === a) return 0;
  const r = Hm();
  let i = 0;
  for (let e = n.length - 1; e >= 0; e -= 1) {
    const t = n[e];
    if (!Wm(t, a)) continue;
    const o = sp(t),
      s = Gm(t, a);
    (n.splice(e, 1),
      lp(t, "viewer-behind-before-upload"),
      _u(t, "viewer-behind-before-upload"),
      nh(t, "ignored", {
        done: !0,
        active: !1,
        reason: "viewer-behind-before-upload",
      }),
      Nx(
        "stt.batch.upload_dropped_viewer_behind",
        {
          segmentId: t.id,
          reason: "viewer-behind-before-upload",
          mediaStartTime: aP(o?.start),
          mediaEndTime: aP(o?.end),
          viewerMediaTime: aP(a),
          behindSeconds: aP(s),
          maxBehindSeconds: r,
          queuedSegments: n.length,
        },
        { source: "offscreen", level: "warn" },
      ),
      (i += 1));
  }
  return i;
}
function Vm() {
  const e = fg({});
  if (e === ne || e === ae) return 1;
  if (e === oe) return zm() && fh() ? 3 : 4;
  const t = rP(gc.config?.batchSttMaxConcurrentUploads);
  return null !== t ? dP(Math.round(t), 1, 20) : zm() ? 3 : mt;
}
function jm(e = Date.now()) {
  if (zm() && Xd().version >= 1) return;
  const t = gc.mseCoverageHoles;
  if (!t?.length || !QP() || gc.isStopping || !1 === gc.acceptingNewSttWork)
    return;
  const n = gc.pcmGroundTruthRing || [];
  if (!n.length) return;
  const a = rP(n[n.length - 1]?.sourceMediaEndTime),
    r = Nm(e),
    i = Hm();
  let o = 0;
  for (const s of t) {
    if (s.backfilled) continue;
    if (e - s.detectedAtMs < xr) continue;
    if (null === a) continue;
    const t = Math.max(s.start, rP(s.backfillCursor) ?? s.start);
    if (null !== r && s.end < r - i) {
      ((s.backfilled = !0),
        (s.lastBackfillAtMs = e),
        Nx(
          "mse.audio_buffer.gap_backfill_hole_dropped_viewer_behind",
          {
            holeStartMediaTime: aP(s.start),
            holeEndMediaTime: aP(s.end),
            cursorMediaTime: aP(t),
            viewerMediaTime: aP(r),
            behindSeconds: aP(r - s.end),
            maxBehindSeconds: i,
            reason: s.reason || "",
          },
          { source: "offscreen", level: "warn" },
        ),
        rh(s.start, s.end, "ignored", {
          pipelineRangeId: s.pipelineRangeId || "",
          reason: "viewer-behind-before-backfill",
          done: !0,
          active: !1,
        }));
      continue;
    }
    const l = Math.min(s.end, a - Er),
      c = Math.max(0, s.end - t),
      d = Math.max(0, l - t),
      u = Om(t, e),
      m = null !== u && u <= 8,
      g = null !== u && u <= Or,
      p = l >= s.end - 0.001 && c <= Dr ? Pr : g ? 4 : 6;
    if (d < p) continue;
    let f = Math.min(s.end, t + Dr, l);
    if ((s.end - f < Pr && l >= s.end && (f = s.end), f - t < Pr)) continue;
    const h = vm(t, f, e, { allowTranscribedCoverage: Mm(s.reason) });
    if (h.covered) {
      ((s.backfillCursor = f),
        (s.lastBackfillAtMs = e),
        (s.backfilled = f >= s.end - 0.001),
        Nx(
          "mse.audio_buffer.gap_backfill_skipped_covered",
          {
            mediaStartTime: aP(t),
            mediaEndTime: aP(f),
            holeStartMediaTime: aP(s.start),
            holeEndMediaTime: aP(s.end),
            partial: !s.backfilled,
            leadSeconds: aP(u),
            waitedMs: Math.round(e - s.detectedAtMs),
            coverageReason: h.reason,
            coverageRatio: aP(h.coverageRatio),
            coveredSeconds: aP(h.coveredSeconds),
            contiguousCoveredEnd: aP(h.contiguousCoveredEnd),
            gapStart: aP(h.gapStart),
            gapEnd: aP(h.gapEnd),
            scheduledRoute: h.scheduledRoute || "",
            scheduledAgeMs: Math.round(rP(h.scheduledAgeMs) || 0),
          },
          { source: "offscreen" },
        ));
      continue;
    }
    "stale-scheduled-not-ready" === h.reason &&
      Nx(
        "mse.audio_buffer.gap_backfill_scheduled_stale",
        {
          mediaStartTime: aP(t),
          mediaEndTime: aP(f),
          holeStartMediaTime: aP(s.start),
          holeEndMediaTime: aP(s.end),
          waitedMs: Math.round(e - s.detectedAtMs),
          scheduledRoute: h.scheduledRoute || "",
          scheduledAgeMs: Math.round(rP(h.scheduledAgeMs) || 0),
          leadSeconds: aP(u),
        },
        { source: "offscreen", level: "warn" },
      );
    const S = pm(n, t, f),
      M = Math.max(0.001, f - t);
    if (!S.chunks.length) {
      const e = rP(n[0]?.sourceMediaStartTime);
      null !== e &&
        e > t + Pr &&
        ((s.backfillCursor = Math.min(s.end, e)),
        Nx(
          "mse.audio_buffer.gap_backfill_ring_missed",
          {
            mediaStartTime: aP(t),
            mediaEndTime: aP(f),
            ringStartMediaTime: aP(e),
            holeStartMediaTime: aP(s.start),
            holeEndMediaTime: aP(s.end),
          },
          { source: "offscreen", level: "warn" },
        ));
      continue;
    }
    if (S.coveredSeconds / M < Br) continue;
    const v = pm(n, Math.max(0, t - _r), f),
      y = v.chunks.length ? v.chunks : S.chunks,
      b = v.chunks.length ? v.coveredMs : S.coveredMs,
      T = v.chunks.length ? v.coveredSeconds : S.coveredSeconds,
      w = sP(y.map((e) => rP(e.sourceMediaStartTime))) ?? t,
      k = lP(y.map((e) => rP(e.sourceMediaEndTime))) ?? f,
      C = Math.max(0, t - w),
      A = { start: t, end: f };
    ((s.backfillCursor = f),
      (s.lastBackfillAtMs = e),
      (s.backfilled = f >= s.end - 0.001));
    const R = sy(),
      x = y.map((e) =>
        Df({ ...e, sourceType: "mse-audio-buffer", mseGapBackfill: !0 }),
      ),
      E = {
        id: R.nextSegmentId,
        chunks: x,
        durationMs:
          Math.round(x.reduce((e, t) => e + (rP(t.durationMs) || 0), 0)) ||
          Math.round(b),
        reason: "mse-gap-backfill",
        deadlineMediaTime: A.start,
        mseBackfillUrgent: m,
        mseBackfillTargetStartMediaTime: A.start,
        mseBackfillTargetEndMediaTime: A.end,
        mseBackfillContextStartMediaTime: w,
        mseBackfillContextEndMediaTime: k,
        mseBackfillContextSeconds: C,
        timelineRevision: gc.timelineRevision,
        createdAtMs: Date.now(),
      };
    if (
      ((R.nextSegmentId += 1),
      dp(
        gc.mseAudio || {},
        "scheduledRanges",
        { start: A.start, end: A.end, sequence: s.sequence },
        { route: "gap-backfill" },
      ),
      Nx(
        "mse.audio_buffer.gap_backfill",
        {
          mediaStartTime: aP(A.start),
          mediaEndTime: aP(A.end),
          holeStartMediaTime: aP(s.start),
          holeEndMediaTime: aP(s.end),
          partial: !s.backfilled,
          chunks: y.length,
          durationMs: Math.round(b),
          targetDurationMs: Math.round(1e3 * M),
          targetCoveredMs: Math.round(S.coveredMs),
          contextStartMediaTime: aP(w),
          contextEndMediaTime: aP(k),
          contextSeconds: aP(C),
          contextCoveredSeconds: aP(T),
          waitedMs: Math.round(e - s.detectedAtMs),
          firstBackfillDelayMs: Math.round(
            (s.firstBackfillAtMs || e) - s.detectedAtMs,
          ),
          leadSeconds: aP(u),
          urgent: m,
          critical: g,
          minReadySeconds: aP(p),
          ringSpanSeconds: aP((gc.pcmGroundTruthRingMs || 0) / 1e3),
          timingSource: y[y.length - 1]?.groundTruthTimingSource || "",
        },
        { source: "offscreen" },
      ),
      s.firstBackfillAtMs || (s.firstBackfillAtMs = e),
      rh(A.start, A.end, "gap-backfill-queued", {
        pipelineRangeId: s.pipelineRangeId || "",
        segmentId: E.id,
        reason: s.backfilled
          ? "pcm-ground-truth-backfill"
          : "pcm-ground-truth-incremental-backfill",
        done: !1,
        active: !0,
      }),
      Yf(E),
      (o += 1),
      o >= 1)
    )
      break;
  }
  gc.mseCoverageHoles = t.filter(
    (t) => !t.backfilled || e - t.detectedAtMs < 6e4,
  );
}
function Km(e) {
  const t = ly(
    e.inputBuffer.getChannelData(0),
    gc.audioContext?.sampleRate || Ge,
  );
  if (!t) return;
  ((gc.captureAudioMs += t.durationMs), $A());
  const n = dy(t);
  if (!n.length) return void Ff();
  const a = Ah();
  for (const e of n) Ih(e, a);
}
function zm() {
  return Boolean(
    gc.config?.mseAudioBufferEnabled ||
      "mse-audio-buffer" === gc.config?.audioInputMode,
  );
}
function Qm(e = gc.mseStartupBoost || {}) {
  return {
    ...e,
    readySubtitleRanges: Array.isArray(e.readySubtitleRanges)
      ? e.readySubtitleRanges.map((e) => ({ ...e }))
      : [],
    startupReleaseReadyRanges: Array.isArray(e.startupReleaseReadyRanges)
      ? e.startupReleaseReadyRanges.map((e) => ({ ...e }))
      : [],
    startupFinalSttAudioRanges: Array.isArray(e.startupFinalSttAudioRanges)
      ? e.startupFinalSttAudioRanges.map((e) => ({ ...e }))
      : [],
    startupProcessedAudioRanges: Array.isArray(e.startupProcessedAudioRanges)
      ? e.startupProcessedAudioRanges.map((e) => ({ ...e }))
      : [],
    startupReadyIntervalSamplesMs: Array.isArray(
      e.startupReadyIntervalSamplesMs,
    )
      ? [...e.startupReadyIntervalSamplesMs]
      : [],
  };
}
function Jm(e = gc.mseAudio || {}, t = Date.now()) {
  return !(
    !e ||
    !gc.config ||
    e.noSegmentFallbackOriginalConfig ||
    ((e.noSegmentFallbackOriginalConfig = { ...gc.config }),
    (e.noSegmentFallbackOriginalBoost = Qm()),
    (e.noSegmentFallbackActivatedAtMs = t),
    0)
  );
}
function Xm(e = gc.mseAudio || {}, t = {}) {
  if (!e?.noSegmentFallbackActivated || !e.noSegmentFallbackOriginalConfig)
    return { eligible: !1, reason: "no-recoverable-fallback" };
  if (!yp(t.bytes ?? t.bytesBase64).byteLength)
    return { eligible: !1, reason: "missing-mse-audio-bytes" };
  if ((rP(t.hookVersion) ?? 0) < dl)
    return { eligible: !1, reason: "stale-mse-hook-version" };
  const n = String(
      e.noSegmentFallbackOriginalConfig.viewerMediaContextKey ||
        e.noSegmentFallbackOriginalConfig.sourceMediaContextKey ||
        e.noSegmentFallbackOriginalConfig.cacheVideoKey ||
        "",
    ).trim(),
    a = String(t.mediaContextKey || "").trim();
  if (n && (!a || a !== n))
    return {
      eligible: !1,
      reason: a ? "media-context-mismatch" : "missing-media-context",
    };
  if (gc.sourceEndedGuardActive)
    return { eligible: !1, reason: "source-vod-ended" };
  const r = LP(
    e.noSegmentFallbackOriginalBoost?.standardSttProvider ||
      e.noSegmentFallbackOriginalConfig.sttProvider ||
      gc.activeSttProvider,
  );
  if (!JP(r))
    return { eligible: !1, reason: "provider-does-not-accept-encoded-audio" };
  const i = rP(t.mediaStartTime),
    o = rP(t.mediaEndTime),
    s = rP(t.currentTime);
  if (null === i || null === o || o <= i)
    return { eligible: !1, reason: "missing-media-range" };
  const l = dP(
      rP(e.noSegmentFallbackOriginalConfig.mseAudioMaxFutureLeadSeconds) ?? ll,
      1,
      ll,
    ),
    c = s ?? zA(Date.now());
  if (null !== c && (o < c - al || i > c + l))
    return { eligible: !1, reason: "outside-current-playback-window" };
  const d = rP(e.seekTargetMediaTime);
  return null === d || !0 === e.seekAnchorEstablished || tp(i, o, d)
    ? null !== d && o < d - al
      ? { eligible: !1, reason: "before-seek-target" }
      : {
          eligible: !0,
          reason: "valid-future-mse-segment",
          mediaStartTime: i,
          mediaEndTime: o,
          sourceCurrentTime: s,
          recoveryProvider: r,
        }
    : { eligible: !1, reason: "seek-anchor-pending" };
}
function Zm(e = gc.mseAudio || {}, t = {}) {
  const n = Xm(e, t);
  if (!n.eligible) return n;
  const a = rP(e.noSegmentFallbackActivatedAtMs) || Date.now();
  return (
    (gc.config = { ...e.noSegmentFallbackOriginalConfig }),
    (gc.mseStartupBoost = e.noSegmentFallbackOriginalBoost
      ? Qm(e.noSegmentFallbackOriginalBoost)
      : Ly(gc.config)),
    (gc.activeSttProvider = LP(
      gc.mseStartupBoost?.active && !gc.mseStartupBoost?.switched
        ? $y()
        : gc.config.sttProvider,
    )),
    (e.noSegmentFallbackActivated = !1),
    (e.noSegmentFallbackUnavailableLogged = !1),
    (e.noSegmentFallbackCountdownStartedAtMs = 0),
    (e.noSegmentFallbackEvidence = ""),
    (e.noSegmentFallbackRecoveredAtMs = Date.now()),
    (e.noSegmentFallbackRecoveryCount =
      Math.max(0, Number(e.noSegmentFallbackRecoveryCount) || 0) + 1),
    (e.enabled = !0),
    (e.bridgeClosedReason = "no-mse-segment-fallback-recovered"),
    Xg(e),
    (e.noSegmentFallbackOriginalConfig = null),
    (e.noSegmentFallbackOriginalBoost = null),
    null !== rP(e.seekTargetMediaTime) &&
      !0 !== e.seekAnchorEstablished &&
      ((e.seekAnchorEstablished = !0),
      (e.seekAnchorEstablishedAtMs = Date.now()),
      (e.seekAnchorSource = "no-segment-fallback-recovery")),
    Nx(
      "mse.audio_buffer.no_segment_recovered",
      {
        fallbackElapsedMs: Math.max(0, Date.now() - a),
        recoveryCount: e.noSegmentFallbackRecoveryCount,
        mediaStartTime: aP(n.mediaStartTime),
        mediaEndTime: aP(n.mediaEndTime),
        sourceCurrentTime: aP(n.sourceCurrentTime),
        leadSeconds:
          null === n.sourceCurrentTime
            ? null
            : aP(n.mediaStartTime - n.sourceCurrentTime),
        seekTargetMediaTime: aP(e.seekTargetMediaTime),
        seekAnchorSource: e.seekAnchorSource || "",
        audioInputMode: gc.config.audioInputMode,
        mseAudioBufferEnabled: Boolean(gc.config.mseAudioBufferEnabled),
        provider: n.recoveryProvider,
      },
      { source: "offscreen", level: "warn" },
    ),
    vP("mse-no-segment-recovered", "MSE 前方音訊已恢復，字幕重新使用預載緩衝"),
    { ...n, recovered: !0 }
  );
}
function Ym() {
  return Boolean(
    (!0 === gc.config?.msePcmPrimaryOnly ||
      (Number.isInteger(gc.prefetchPcmGeneration) &&
        gc.prefetchPcmGeneration === gc.timelineRevision)) &&
      zm() &&
      QP(pg()),
  );
}
function eg() {
  return Boolean(Ym() && QP(pg()));
}
function tg() {
  (gc.audioPrefetchController?.stop(), (gc.audioPrefetchController = null));
}
function ng() {
  if (
    (tg(),
    !0 !== gc.config?.audioPrefetchEnabled ||
      !zm() ||
      eD() ||
      !QP(pg()) ||
      !globalThis.SubruuPrefetchController)
  )
    return;
  const e = () => ({
      enabled: !0 === gc.config?.audioPrefetchEnabled,
      accepting:
        !1 !== gc.acceptingNewSttWork &&
        !gc.isStopping &&
        !gc.sourceEndedGuardActive,
      live: eD(),
      sessionId: gc.sessionId,
      generation: gc.timelineRevision,
      mediaKey: tE(),
      playbackTime: Nm(Date.now()),
      floor: Og(),
      suspended:
        gc.sourceAdPlaying ||
        gc.sourceEndedGuardActive ||
        gc.sourceMediaTiming?.pauseContinuationExpired,
    }),
    t = e(),
    n = globalThis.SubruuPrefetchController.createController({
      snapshot: e,
      resolve: () =>
        chrome.runtime.sendMessage({
          type: "VOD_AUDIO_PREFETCH_SOURCE",
          sessionId: t.sessionId,
          mediaKey: t.mediaKey,
        }),
      reader: async (e, n) => {
        if ("hls" === e.kind) {
          const a = await import("./vendor/mediabunny/mediabunny.min.mjs"),
            r = globalThis.SubruuHlsPcm.createHlsPcmSource({
              source: e,
              library: a,
              signal: n,
              refresh: () =>
                chrome.runtime.sendMessage({
                  type: "VOD_AUDIO_PREFETCH_SOURCE",
                  sessionId: t.sessionId,
                  mediaKey: t.mediaKey,
                }),
              fetch: globalThis.SubruuHlsTransport.createTransport({
                sessionId: t.sessionId,
                mediaKey: t.mediaKey,
              }),
              maxMediaTime: () => {
                const e = Nm(Date.now());
                return null === e ? NaN : e + 60;
              },
            });
          return ((r.sourceKind = "hls"), r);
        }
        if ("sabr" === e.kind) {
          const t = (
            await import("./vendor/googlevideo/prefetch-sabr.mjs")
          ).createSabrReader({
            source: e,
            signal: n,
            maxMediaTime: () => {
              const e = Nm(Date.now());
              return null === e ? NaN : e + 60;
            },
          });
          return ((t.sourceKind = "sabr"), (t.descriptor = e), t);
        }
        return globalThis.SubruuPrefetchRange.createRangeReader({
          url: e.url,
          signal: n,
          allowUrl: (e) => e.hostname.endsWith(".googlevideo.com"),
        });
      },
      open: async (e) => {
        if ("hls" === e.sourceKind) return e;
        const t = await import("./vendor/mediabunny/mediabunny.min.mjs");
        return "sabr" === e.sourceKind
          ? globalThis.SubruuSabrPcm.createSabrPcmSource({
              reader: e,
              library: t,
              source: e.descriptor,
              maxMediaTime: () => {
                const e = Nm(Date.now());
                return null === e ? NaN : e + 60;
              },
            })
          : globalThis.SubruuPrefetchAudio.openIndexedAudio({
              reader: e,
              library: t,
            });
      },
      leadSeconds: (e) =>
        ["sabr", "hls"].includes(e.sourceKind)
          ? 60 - e.segmentSeconds - 0.1
          : 60,
      uncovered: (e, t) => uu(e, t),
      accept: (e, t) => ag(e, t),
      event: (e, n) => {
        gc.sessionId === t.sessionId &&
          gc.timelineRevision === t.generation &&
          Nx(`audio.prefetch.${e}`, n, {
            source: "offscreen",
            level: "fallback" === e ? "warn" : "info",
          });
      },
    });
  ((gc.audioPrefetchController = n),
    n.done
      .catch(() => {})
      .finally(() => {
        gc.audioPrefetchController === n && (gc.audioPrefetchController = null);
      }));
}
function ag(e, t) {
  if (
    gc.isStopping ||
    !1 === gc.acceptingNewSttWork ||
    gc.sessionId !== t.sessionId ||
    gc.timelineRevision !== t.generation ||
    tE() !== t.mediaKey
  )
    return !1;
  const n = SD(e.samples, e.sampleRate, Ge);
  if (!n.length) return !1;
  const a = Date.now();
  gc.prefetchPcmGeneration !== gc.timelineRevision &&
    (Ym() ||
      Xf({ force: !0, preserveOverlap: !1, reason: "prefetch-pcm-handoff" }),
    (gc.prefetchPcmGeneration = gc.timelineRevision));
  const r = Pg(gc.mseAudio, {
    samples: n,
    rawCaptureSamples: n,
    captureSamples: n,
    sourceType: "mse-ahead-decoded-pcm",
    sessionId: t.sessionId,
    timelineRevision: t.generation,
    sourceMediaStartTime: e.mediaStartTime,
    sourceMediaEndTime: e.mediaEndTime,
    captureStartMs: 1e3 * e.mediaStartTime,
    captureEndMs: 1e3 * e.mediaEndTime,
    captureStartWallTimeMs: a,
    captureEndWallTimeMs: a,
    capturedAtMs: a,
    durationMs: 1e3 * (e.mediaEndTime - e.mediaStartTime),
    captureDurationMs: (n.length / Ge) * 1e3,
    sourcePlaybackRate: 1,
    preparedForStt: !1,
    mseAheadDecoded: !0,
    prefetchSource: !0,
    mseMediaRangeSource: "prefetch-container-pts",
  });
  return (r.length && (qg(a), Fg(gc.mseAudio, a)), r.length > 0);
}
function rg() {
  return Boolean(zm() && QP(pg()) && mu(0, Number.MAX_SAFE_INTEGER).length > 0);
}
function ig(e = Date.now()) {
  if (
    !0 !== gc.config?.singleTabMediaSync ||
    !zm() ||
    Ym() ||
    !QP(pg()) ||
    eD()
  )
    return !1;
  const t = Math.max(
    rP(gc.mseAudio?.startedAtMs) || 0,
    rP(gc.mseAudio?.resetAtMs) || 0,
    rP(gc.expectedSourceSeekStartedAtMs) || 0,
    rP(gc.mseStartupBoost?.startedAtMs) || 0,
  );
  return (
    !(t <= 0 || e < t) &&
    e - t <=
      dP(
        1e3 *
          Math.max(
            7,
            rP(gc.config?.effectiveSyncDelaySeconds) || 0,
            rP(gc.config?.syncDelaySeconds) || 0,
          ) +
          6e4,
        6e4,
        Sr,
      )
  );
}
function og() {
  if (
    !0 !== gc.config?.singleTabMediaSync ||
    !zm() ||
    Ym() ||
    !QP(pg()) ||
    eD()
  )
    return null;
  const e = Og(),
    t = rP(gc.mseAudio?.firstAcceptedMediaStartTime);
  if (null === e || null === t || t - e < Pr) return null;
  const n = Math.min(t, e + wi);
  return uu(e, n).some((e) => e.end - e.start >= Qr)
    ? { start: e, end: n }
    : null;
}
function sg() {
  return (
    !(
      !0 !== gc.config?.singleTabMediaSync ||
      !zm() ||
      Ym() ||
      !QP(pg()) ||
      eD()
    ) &&
    null !== Og() &&
    (null === rP(gc.mseAudio?.firstAcceptedMediaStartTime) || Boolean(og()))
  );
}
function lg() {
  return Boolean(
    QP(gc.activeSttProvider) || YP(gc.activeSttProvider) || (zm() && JP(pg())),
  );
}
function cg() {
  return (
    !!zm() &&
    (LP(gc.activeSttProvider) === ae
      ? ZP(gc.activeSttProvider)
      : LP(gc.activeSttProvider) === ne
        ? XP(gc.activeSttProvider)
        : QP())
  );
}
function dg(e = Date.now()) {
  if (!zm() || !QP()) return !1;
  if (!gc.mediaStream) return !1;
  const t = gc.mseAudio || {};
  if (t.bridgeClosedAtMs) return !1;
  const n = gc.mseStartupBoost || {};
  return (
    !n.enabled ||
      !n.active ||
      n.switched ||
      (n.mode !== xl && n.mode !== El) ||
      (t.tabCaptureBridgeDisabledLogged ||
        ((t.tabCaptureBridgeDisabledLogged = !0),
        Nx(
          "mse.audio_buffer.bridge_disabled",
          {
            reason: "mse-audio-buffer-only",
            boostMode: n.mode || "",
            message:
              "MSE audio-buffer sessions do not mix tab-capture chunks into the batch pipeline.",
          },
          { source: "offscreen" },
        )),
      ug("tab-capture-bridge-disabled", { boostMode: n.mode || "" })),
    !1
  );
}
function ug(e = "mse-audio-ready", t = {}) {
  const n = gc.mseAudio || (gc.mseAudio = Py());
  return (
    !n.bridgeClosedAtMs &&
    ((n.bridgeClosedAtMs = Date.now()),
    (n.bridgeClosedReason = String(e || "mse-audio-ready")),
    Nx(
      "mse.audio_buffer.bridge_closed",
      {
        reason: n.bridgeClosedReason,
        segmentsReceived: Math.max(0, Number(n.segmentsReceived) || 0),
        standardSegmentsScheduled: Math.max(
          0,
          Number(n.standardSegmentsScheduled) || 0,
        ),
        lastAcceptedMediaStartTime: aP(n.lastAcceptedMediaStartTime),
        lastAcceptedMediaEndTime: aP(n.lastAcceptedMediaEndTime),
        ...t,
      },
      { source: "offscreen" },
    ),
    !0)
  );
}
function mg() {
  if (
    !gc.mseAdmissionReplayNeeded ||
    gc.mseAdmissionPending ||
    !gc.sessionId ||
    gc.isStopping ||
    !1 === gc.acceptingNewSttWork ||
    !zm()
  )
    return !1;
  gc.mseAdmissionReplayNeeded = !1;
  const e = gc.sessionId,
    t = gc.timelineRevision;
  return (
    Promise.resolve()
      .then(() =>
        chrome.runtime.sendMessage({
          type: "LIVE_SUBTITLE_MSE_AUDIO_REFRESH_REQUEST",
          sessionId: e,
          reason: "offscreen-runtime-ready",
          retryPostedSegments: !0,
        }),
      )
      .then((n) => {
        gc.sessionId !== e ||
          gc.timelineRevision !== t ||
          gc.isStopping ||
          Nx(
            "mse.audio_buffer.admission_replay",
            {
              accepted: !0 === n?.ok && !0 !== n?.ignored,
              activeSttProvider: gc.activeSttProvider,
              reason: n?.reason || n?.error || "runtime-ready",
            },
            { source: "offscreen", level: !0 === n?.ok ? "info" : "warn" },
          );
      })
      .catch((n) => {
        gc.sessionId !== e ||
          gc.timelineRevision !== t ||
          gc.isStopping ||
          Nx(
            "mse.audio_buffer.admission_replay_failed",
            { error: n.message },
            { source: "offscreen", level: "warn" },
          );
      }),
    !0
  );
}
function gg() {
  const e = LP(gc.activeSttProvider);
  return e === ae
    ? By(e)
      ? JP(pg())
      : ZP(e)
    : e === ne
      ? XP(e)
      : Boolean(JP(e) || (hg() && JP(pg())));
}
function pg() {
  return LP(
    (gc.mseStartupBoost || {}).standardSttProvider ||
      gc.config?.sttProvider ||
      gc.activeSttProvider ||
      Y,
  );
}
function fg(e = {}) {
  const t = LP(e.batchSttProviderOverride || pg()),
    n = wD(e.batchSttProviderSelectionLockReason || "");
  return "sql-wallet-v1" === gc.config?.walletBillingProtocol
    ? t
    : ((!e.batchSttProviderOverride ||
        ("empty-alternate-rescue" !== n &&
          "quality-rejected-rescue" !== n &&
          "pcm-subtitle-unavailable-recovery" !== n)) &&
        $h(t) &&
        Wh(t, gc.config?.sourceLang)) ||
        t;
}
function hg() {
  const e = gc.mseStartupBoost || {};
  return Boolean(e.enabled && e.active && !e.switched);
}
function Sg() {
  const e = gc.mseStartupBoost || {};
  return hg() && e.mode === Rl;
}
function Mg() {
  const e = gc.mseStartupBoost || {};
  return hg() && e.mode === El;
}
function vg(e = Date.now()) {
  if (!Sg()) return !1;
  if (!By(gc.activeSttProvider)) return !1;
  if (!gc.mediaStream) return !1;
  const t = rP(gc.lastRealtimeAudioSentAtMs) || 0,
    n = rP(gc.lastRealtimeTranscriptAtMs) || 0,
    a = Math.max(t, n);
  return a > 0 && e - a <= wl;
}
function yg(e, t = {}, n = Date.now()) {
  const a = rP(e),
    r = Math.max(rP(t.startedAtMs) || 0, rP(t.resetAtMs) || 0);
  return null === a || a <= 0 || a < r || a > n ? n : a;
}
function bg(e, t, n, a, r) {
  if (
    "sql-wallet-v1" !== gc.config?.walletBillingProtocol ||
    e.seekAnchorEstablished ||
    !["seek-anchor-pending", "captured-before-timeline-reset"].includes(r)
  )
    return null;
  const i = rP(e.seekTargetMediaTime),
    o = rP(t.mediaStartTime),
    s = rP(t.mediaEndTime),
    l = rP(t.currentTime),
    c = null !== i && null !== l && Math.abs(l - i) <= il ? Math.max(i, l) : i;
  if (
    null === i ||
    null === o ||
    null === s ||
    o < i ||
    s <= o ||
    s > c + ap() ||
    s - o > cl
  )
    return null;
  const d = e.seekDeferredSegments || (e.seekDeferredSegments = new Map()),
    u = `${t.sequence}:${o}:${s}:${t.clusterSliceIndex ?? ""}`;
  if (d.has(u)) return { ok: !0, queued: !0, deferred: !0, duplicate: !0 };
  const m = n.byteLength + (a?.byteLength || 0);
  return d.size >= 96 || (e.seekDeferredBytes || 0) + m > 25165824
    ? { ok: !1, ignored: !0, reason: "seek-anchor-buffer-full" }
    : (d.set(u, {
        ...t,
        bytes: n,
        initBytes: a,
        bytesBase64: void 0,
        initBytesBase64: void 0,
        repostAttempt: Math.max(1, Number(t.repostAttempt) || 0),
        deferredAtMs: Date.now(),
      }),
      (e.seekDeferredBytes = (e.seekDeferredBytes || 0) + m),
      Nx(
        "mse.audio_buffer.seek_segment_deferred",
        {
          sequence: t.sequence,
          mediaStartTime: o,
          mediaEndTime: s,
          timelineRevision: gc.timelineRevision,
          pendingSegments: d.size,
          bytes: e.seekDeferredBytes,
        },
        { source: "offscreen" },
      ),
      { ok: !0, queued: !0, deferred: !0 });
}
function Tg(e) {
  if (!e.seekAnchorEstablished || !e.seekDeferredSegments?.size) return;
  const t = [...e.seekDeferredSegments.values()].sort(
    (e, t) => e.mediaStartTime - t.mediaStartTime,
  );
  (e.seekDeferredSegments.clear(), (e.seekDeferredBytes = 0));
  const n = aE();
  Promise.resolve().then(() => {
    if (
      gc.mseAudio !== e ||
      !iE(n, aE()) ||
      gc.isStopping ||
      !1 === gc.acceptingNewSttWork
    )
      return;
    let a = 0;
    for (const e of t) {
      if (Date.now() - e.deferredAtMs > 12e4) continue;
      const t = wg({ sessionId: gc.sessionId, segment: e });
      t?.ok && !t.ignored && (a += 1);
    }
    Nx(
      "mse.audio_buffer.seek_segments_replayed",
      {
        timelineRevision: gc.timelineRevision,
        segments: t.length,
        replayed: a,
      },
      { source: "offscreen" },
    );
  });
}
function wg(e = {}) {
  if (e.sessionId && gc.sessionId && e.sessionId !== gc.sessionId)
    return { ok: !0, ignored: !0, reason: "stale-session" };
  if (!gc.config) return { ok: !0, ignored: !0, reason: "mse-audio-disabled" };
  if (!0 === gc.mseAdmissionPending)
    return (
      (gc.mseAdmissionReplayNeeded = !0),
      { ok: !0, ignored: !0, retryable: !0, reason: "offscreen-not-ready" }
    );
  const t = e.segment || {},
    n = gc.mseAudio || (gc.mseAudio = Py());
  if (!zm()) {
    const e = Zm(n, t);
    if (!e.recovered)
      return { ok: !0, ignored: !0, reason: e.reason || "mse-audio-disabled" };
  }
  if (!gg())
    return {
      ok: !0,
      ignored: !0,
      reason: "provider-does-not-accept-encoded-audio",
    };
  const a = tE(),
    r = String(t.mediaContextKey || "").trim();
  if (a && (!r || r !== a)) {
    const e = r ? "media-context-mismatch" : "missing-media-context";
    return (
      Nx(
        "mse.audio_buffer.media_context_rejected",
        {
          reason: e,
          expectedMediaContextKey: a,
          payloadMediaContextKey: r,
          sequence: rP(t.sequence),
          capturedAtMs: rP(t.capturedAtMs),
        },
        { source: "offscreen", level: "warn" },
      ),
      { ok: !0, ignored: !0, reason: e }
    );
  }
  const i = yp(t.bytes ?? t.bytesBase64);
  if (!i.byteLength) return { ok: !1, error: "missing MSE audio bytes" };
  n.mediaContextKey = r || a || n.mediaContextKey || "";
  const o = rP(t.hookVersion);
  n.hookVersion = o;
  const s = o ?? 0,
    l = Math.max(0, Math.round(Number(t.sequence) || 0));
  if (
    (s < dl &&
      !n.hookVersionMismatchLogged &&
      ((n.hookVersionMismatchLogged = !0),
      Nx(
        "mse.hook.version_mismatch",
        {
          hookVersion: o,
          effectiveHookVersion: s,
          expectedHookVersion: dl,
          sequence: rP(t.sequence),
          mediaRangeSource: t.mediaRangeSource || "",
          message:
            "MSE hook version is older than expected; hard refresh the source page after extension reload.",
        },
        { source: "offscreen", level: "warn" },
      ),
      vP("mse-hook-version-mismatch", "擴充功能已更新，請重新整理影片分頁")),
    s < dl)
  )
    return (
      (n.staleHookSegmentsIgnored =
        Math.max(0, Number(n.staleHookSegmentsIgnored) || 0) + 1),
      (n.staleHookSegmentsIgnored <= 3 ||
        n.staleHookSegmentsIgnored % 20 == 0) &&
        Nx(
          "mse.audio_buffer.segment_ignored",
          {
            sequence: l,
            reason: "stale-mse-hook-version",
            hookVersion: o,
            effectiveHookVersion: s,
            expectedHookVersion: dl,
            ignoredCount: n.staleHookSegmentsIgnored,
          },
          { source: "offscreen", level: "warn" },
        ),
      Ym() ||
        Ng(n, {
          sequence: l,
          hookVersion: o,
          effectiveHookVersion: s,
          expectedHookVersion: dl,
          reason: "stale-mse-hook-version",
        }),
      {
        ok: !0,
        ignored: !0,
        reason: "stale-mse-hook-version",
        sequence: l,
        hookVersion: o,
      }
    );
  (Xg(n), (n.noSegmentFallbackCountdownStartedAtMs = 0));
  const c = Math.max(0, Math.round(Number(t.repostAttempt || 0) || 0)),
    d = rP(t.clusterSliceIndex),
    u = rP(t.clusterSliceCount),
    m = null !== d && null !== u && u > 1;
  if (l && l <= (n.lastSequence || 0) && !c && !m)
    return { ok: !0, ignored: !0, reason: "duplicate-segment", sequence: l };
  const g = yp(t.initBytes ?? t.initBytesBase64),
    p = rP(t.mediaStartTime),
    f = rP(t.mediaEndTime),
    h = rP(t.durationSeconds),
    S = String(t.mediaRangeSource || "");
  if (gc.sourceEndedGuardActive) {
    gc.sourceEndedGuardMseSegmentsIgnored =
      Math.max(0, Number(gc.sourceEndedGuardMseSegmentsIgnored) || 0) + 1;
    const e = gc.sourceEndedGuardMseSegmentsIgnored;
    return (
      (1 !== e && e % 100 != 0) ||
        Nx(
          "mse.audio_buffer.segment_ignored",
          {
            sequence: l,
            reason: "source-vod-ended",
            mediaStartTime: p,
            mediaEndTime: f,
            mediaRangeSource: S,
            ignoredCount: e,
          },
          { source: "offscreen", level: "warn" },
        ),
      { ok: !0, ignored: !0, reason: "source-vod-ended", sequence: l }
    );
  }
  const M = sP([t.durationMs, null !== h ? 1e3 * h : null]),
    v = dP(
      (null !== p && null !== f && f > p ? 1e3 * (f - p) : M) || Rs,
      1,
      As,
    ),
    y = Math.max(0, rP(t.capturedAtMs) || Date.now());
  let b = y;
  const T = rP(t.currentTime),
    w = ep({
      state: n,
      payload: t,
      capturedAtMs: b,
      mediaStartTime: p,
      mediaEndTime: f,
      sourceCurrentTime: T,
    });
  if (w) {
    const e = bg(n, t, i, g, w);
    return e
      ? { ...e, sequence: l }
      : (Nx(
          "mse.audio_buffer.segment_ignored",
          {
            sequence: l,
            reason: w,
            capturedAtMs: b,
            mediaStartTime: p,
            mediaEndTime: f,
            mediaRangeSource: S,
            sourceCurrentTime: T,
            seekTargetMediaTime: n.seekTargetMediaTime,
            resetAtMs: n.resetAtMs,
            leadSeconds: rP(t.leadSeconds),
          },
          { source: "offscreen", level: "warn" },
        ),
        { ok: !0, ignored: !0, reason: w, sequence: l });
  }
  if (
    ((b = yg(y, n)),
    null !== rP(n.seekTargetMediaTime) &&
      !0 !== n.seekAnchorEstablished &&
      ((n.seekAnchorEstablished = !0),
      (n.seekAnchorEstablishedAtMs = Date.now()),
      (n.seekAnchorSource = "mse-range"),
      Nx(
        "mse.audio_buffer.seek_anchor_established",
        {
          sequence: l,
          source: n.seekAnchorSource,
          seekTargetMediaTime: aP(n.seekTargetMediaTime),
          mediaStartTime: aP(p),
          mediaEndTime: aP(f),
          sourceCurrentTime: aP(T),
        },
        { source: "offscreen" },
      )),
    Tg(n),
    Ym())
  )
    return kg({
      state: n,
      payload: t,
      bytes: i,
      initBytes: g,
      hookVersion: o,
      sequence: l,
      mediaStartTime: p,
      mediaEndTime: f,
      mediaRangeSource: S,
      sourceCurrentTime: T,
      capturedAtMs: b,
      durationMs: v,
    });
  Sp(n, { sequence: l, mediaStartTime: p, mediaEndTime: f });
  const k = gc.captureAudioMs,
    C = k + v,
    A = bp(t.mimeType || t.originalMimeType),
    R = Tp(t.extension, A),
    x = {
      encodedAudio: !0,
      sourceType: "mse-audio-buffer",
      bytes: i,
      initBytes: g.byteLength ? g : null,
      mimeType: A,
      extension: R,
      durationMs: v,
      captureDurationMs: v,
      capturedAtMs: b,
      originalCapturedAtMs: y,
      captureStartWallTimeMs: b !== y ? b : Math.max(0, b - v),
      captureEndWallTimeMs: b,
      captureStartMs: k,
      captureEndMs: C,
      sourceMediaStartTime: p,
      sourceMediaEndTime: f,
      sourcePlaybackRate: 1,
      mseSequence: l,
      mseLeadSeconds: rP(t.leadSeconds),
      mseMediaRangeSource: S,
      mseBufferedStart: rP(t.bufferedStart),
      mseBufferedEnd: rP(t.bufferedEnd),
      mseHookVersion: o,
      mseClusterSliceIndex: d,
      mseClusterSliceCount: u,
      mseRepostAttempt: c,
      preparedForStt: !0,
      sttAudioSpeed: 1,
      billableDurationMs: v,
    };
  ((gc.captureAudioMs = C),
    null !== T &&
      ((n.lastSourceCurrentTime = T),
      (n.lastSourceCurrentTimeAtMs = b),
      (n.lastSourcePlaybackRate = 1)),
    null === f && $A(),
    (n.enabled = !0),
    (n.lastSegmentAtMs = Date.now()),
    (n.segmentsReceived += 1),
    (n.bytesReceived += i.byteLength),
    (n.lastSequence = c ? n.lastSequence : l || n.lastSequence),
    (n.lastLeadSeconds = rP(t.leadSeconds)),
    (n.maxLeadSeconds = Math.max(
      n.maxLeadSeconds || 0,
      rP(t.maxLeadSeconds) || n.lastLeadSeconds || 0,
    )),
    (n.lastBufferedStart = rP(t.bufferedStart)),
    (n.lastBufferedEnd = rP(t.bufferedEnd)),
    (n.lastMimeType = A),
    null !== p &&
      null === rP(n.firstAcceptedMediaStartTime) &&
      (n.firstAcceptedMediaStartTime = p),
    null !== p && (n.lastAcceptedMediaStartTime = p),
    null !== f &&
      ((n.lastAcceptedMediaEndTime = f),
      (n.maxAcceptedMediaEndTime = Math.max(
        rP(n.maxAcceptedMediaEndTime) ?? f,
        f,
      ))),
    um(p, f));
  const E = Fk(Date.now()) ?? T;
  rm({ mediaStartTime: p, playbackTime: E, sequence: l });
  const P = Dp("mse-segment", E),
    D = rp(x, {
      sequence: l,
      mediaStartTime: p,
      mediaEndTime: f,
      sourceCurrentTime: T,
      capturedAtMs: b,
      leadSeconds: n.lastLeadSeconds,
      readiness: P,
    });
  if ("standard" !== D.route)
    return {
      ok: !0,
      ignored: !0,
      reason: D.reason,
      route: D.route,
      sequence: l,
      durationMs: v,
      leadSeconds: n.lastLeadSeconds,
      maxLeadSeconds: n.maxLeadSeconds,
      rawLeadSeconds: aP(P.rawLeadSeconds),
      usableLeadSeconds: P.usableLeadSeconds,
      readySubtitleLeadSeconds: P.readySubtitleLeadSeconds,
      recommendedStartupWaitSeconds: P.recommendedStartupWaitSeconds,
      requiredLeadSeconds: D.requiredLeadSeconds,
      deadlineSeconds: D.deadlineSeconds,
    };
  x.mseCoverageClaimId = D.coverageClaimId || "";
  const I = Bf(x);
  return (
    dg()
      ? l &&
        (n.segmentsReceived <= 3 || n.segmentsReceived % 10 == 0) &&
        Nx(
          "mse.audio_buffer.bridge_kept",
          {
            reason: "mse-segment-ahead-of-playhead",
            sequence: l,
            mediaStartTime: p,
            mediaEndTime: f,
            sourceMediaTime: aP(VA()),
            readySubtitleRanges: Wp(gc.mseStartupBoost?.readySubtitleRanges),
          },
          { source: "offscreen" },
        )
      : ug("standard-mse-batch-accepted", {
          sequence: l,
          mediaStartTime: p,
          mediaEndTime: f,
          flushed: Boolean(I),
        }),
    I
      ? ((n.segmentsQueued += 1), (n.segmentsBuffered = 0))
      : (n.segmentsBuffered += 1),
    (1 !== n.segmentsReceived && n.segmentsReceived % 5 != 0) ||
      (vP(
        "mse-audio-buffer",
        `MSE audio ${sb(v)} · lead ${wp(n.lastLeadSeconds)}`,
      ),
      Nx(
        "mse.audio_buffer.segment",
        {
          sequence: l,
          repostAttempt: c,
          clusterSliceIndex: d,
          clusterSliceCount: u,
          durationMs: Math.round(v),
          bytes: i.byteLength,
          initBytes: g.byteLength,
          mimeType: A,
          mediaStartTime: p,
          mediaEndTime: f,
          mediaRangeSource: S,
          sourceCurrentTime: T,
          playbackMediaTime: zA(b),
          leadSeconds: n.lastLeadSeconds,
          maxLeadSeconds: n.maxLeadSeconds,
          bufferedStart: n.lastBufferedStart,
          bufferedEnd: n.lastBufferedEnd,
          hookVersion: o,
          receivedSegments: n.segmentsReceived,
          bufferedSegments: n.segmentsBuffered,
          queuedBatches: n.segmentsQueued,
        },
        { source: "offscreen" },
      )),
    {
      ok: !0,
      queued: Boolean(I),
      buffered: !I,
      sequence: l,
      durationMs: v,
      leadSeconds: n.lastLeadSeconds,
      maxLeadSeconds: n.maxLeadSeconds,
      rawLeadSeconds: aP(P.rawLeadSeconds),
      usableLeadSeconds: P.usableLeadSeconds,
      readySubtitleLeadSeconds: P.readySubtitleLeadSeconds,
      recommendedStartupWaitSeconds: P.recommendedStartupWaitSeconds,
    }
  );
}
function kg({
  state: e,
  payload: t,
  bytes: n,
  initBytes: a,
  hookVersion: r,
  sequence: i,
  mediaStartTime: o,
  mediaEndTime: s,
  mediaRangeSource: l,
  sourceCurrentTime: c,
  capturedAtMs: d,
  durationMs: u,
} = {}) {
  ((e.enabled = !0),
    (e.lastSegmentAtMs = Date.now()),
    (e.segmentsReceived += 1),
    (e.bytesReceived += n?.byteLength || 0),
    (e.lastSequence = i || e.lastSequence),
    (e.lastLeadSeconds = rP(t?.leadSeconds)),
    (e.maxLeadSeconds = Math.max(
      e.maxLeadSeconds || 0,
      rP(t?.maxLeadSeconds) || e.lastLeadSeconds || 0,
    )),
    (e.lastBufferedStart = rP(t?.bufferedStart)),
    (e.lastBufferedEnd = rP(t?.bufferedEnd)),
    (e.lastMimeType = bp(t?.mimeType || t?.originalMimeType)),
    null !== c &&
      ((e.lastSourceCurrentTime = c),
      (e.lastSourceCurrentTimeAtMs = d),
      (e.lastSourcePlaybackRate = rP(gc.sourceMediaTiming?.playbackRate) || 1)),
    null !== o &&
      null === rP(e.firstAcceptedMediaStartTime) &&
      (e.firstAcceptedMediaStartTime = o),
    null !== o && (e.lastAcceptedMediaStartTime = o),
    null !== s &&
      ((e.lastAcceptedMediaEndTime = s),
      (e.maxAcceptedMediaEndTime = Math.max(
        rP(e.maxAcceptedMediaEndTime) ?? s,
        s,
      ))));
  const m = Dp("mse-lookahead-observed", Fk(Date.now()) ?? c),
    g = Ag({
      state: e,
      payload: t,
      bytes: n,
      initBytes: a,
      hookVersion: r,
      sequence: i,
      mediaStartTime: o,
      mediaEndTime: s,
      mediaRangeSource: l,
      sourceCurrentTime: c,
      capturedAtMs: d,
      durationMs: u,
    });
  return (
    (1 !== e.segmentsReceived && e.segmentsReceived % 20 != 0) ||
      Nx(
        "mse.audio_buffer.lookahead_observed",
        {
          sequence: i,
          hookVersion: r,
          mediaStartTime: aP(o),
          mediaEndTime: aP(s),
          mediaRangeSource: l,
          durationMs: Math.round(u || 0),
          leadSeconds: aP(e.lastLeadSeconds),
          rawLeadSeconds: aP(m.rawLeadSeconds),
          readySubtitleLeadSeconds: aP(m.readySubtitleLeadSeconds),
          decodedPcmLeadSeconds: aP(e.aheadDecodedPcmLeadSeconds),
          decodeScheduled: Boolean(g.scheduled),
          decodeReason: g.reason || "",
          sttSource: "mse-ahead-decoded-pcm+source-tab-pcm-fallback",
        },
        { source: "offscreen" },
      ),
    {
      ok: !0,
      ignored: !g.scheduled,
      route: g.scheduled ? "mse-ahead-decode" : "pcm-primary",
      reason: g.reason || "mse-lookahead-observation-only",
      decodeScheduled: Boolean(g.scheduled),
      sequence: i,
      durationMs: u,
      leadSeconds: e.lastLeadSeconds,
      rawLeadSeconds: aP(m.rawLeadSeconds),
      readySubtitleLeadSeconds: m.readySubtitleLeadSeconds,
      decodedPcmLeadSeconds: aP(e.aheadDecodedPcmLeadSeconds),
    }
  );
}
function Cg({
  sequence: e = 0,
  mediaStartTime: t = null,
  mediaEndTime: n = null,
  payload: a = {},
} = {}) {
  return [
    gc.timelineRevision,
    Math.max(0, Math.round(Number(e) || 0)),
    aP(t),
    aP(n),
    Math.max(0, Math.round(Number(a?.clusterSliceIndex || 0) || 0)),
    Math.max(0, Math.round(Number(a?.repostAttempt || 0) || 0)),
  ].join(":");
}
function Ag({
  state: e,
  payload: t = {},
  bytes: n,
  initBytes: a,
  hookVersion: r,
  sequence: i,
  mediaStartTime: o,
  mediaEndTime: s,
  mediaRangeSource: l,
  sourceCurrentTime: c,
  capturedAtMs: d,
  durationMs: u,
} = {}) {
  if (!e || e !== gc.mseAudio || !Ym())
    return { scheduled: !1, reason: "ahead-decode-disabled" };
  const m = rP(o),
    g = rP(s);
  if (null === m || null === g || g <= m)
    return { scheduled: !1, reason: "ahead-decode-missing-range" };
  const p = Og();
  if (null !== p && g <= p + Qr)
    return { scheduled: !1, reason: "ahead-decode-before-startup-anchor" };
  if (pp(m, g)) return { scheduled: !1, reason: "ahead-decode-cache-covered" };
  if (sm(m, g))
    return { scheduled: !1, reason: "ahead-decode-already-transcribed" };
  const f = Nm(d || Date.now()),
    h = null === f ? null : m - f;
  if (null !== h && h > yr)
    return { scheduled: !1, reason: "ahead-decode-too-far" };
  if (null !== f && g < f - 8)
    return { scheduled: !1, reason: "ahead-decode-behind-viewer" };
  const S =
      e.aheadDecodePendingKeys instanceof Set
        ? e.aheadDecodePendingKeys
        : (e.aheadDecodePendingKeys = new Set()),
    M = Cg({ sequence: i, mediaStartTime: m, mediaEndTime: g, payload: t });
  if (S.has(M)) return { scheduled: !1, reason: "ahead-decode-duplicate" };
  const v = Array.isArray(e.aheadDecodeQueue)
    ? e.aheadDecodeQueue
    : (e.aheadDecodeQueue = []);
  return v.length >= Tr
    ? ((e.aheadDecodeRejected =
        Math.max(0, Number(e.aheadDecodeRejected) || 0) + 1),
      Nx(
        "mse.ahead_decode.rejected",
        {
          reason: "decode-queue-full",
          sequence: i,
          mediaStartTime: aP(m),
          mediaEndTime: aP(g),
          queuedJobs: v.length,
          activeJobs: Math.max(0, Number(e.aheadDecodeActive) || 0),
        },
        { source: "offscreen", level: "warn" },
      ),
      { scheduled: !1, reason: "ahead-decode-queue-full" })
    : (S.add(M),
      v.push({
        key: M,
        sessionId: gc.sessionId || "",
        timelineRevision: gc.timelineRevision,
        bytes: yp(n).slice(),
        initBytes: yp(a).slice(),
        mimeType: bp(t.mimeType || t.originalMimeType),
        extension: Tp(
          t.extension || t.uploadExtension,
          t.mimeType || t.originalMimeType,
        ),
        hookVersion: r,
        sequence: i,
        mediaStartTime: m,
        mediaEndTime: g,
        mediaRangeSource: String(l || ""),
        sourceCurrentTime: rP(c),
        capturedAtMs: Math.max(0, rP(d) || Date.now()),
        expectedDurationMs: Math.max(0, rP(u) || 1e3 * (g - m)),
        enqueuedAtMs: Date.now(),
        clusterSliceIndex: rP(t.clusterSliceIndex),
        clusterSliceCount: rP(t.clusterSliceCount),
        repostAttempt: Math.max(
          0,
          Math.round(Number(t.repostAttempt || 0) || 0),
        ),
      }),
      (e.aheadDecodeScheduled =
        Math.max(0, Number(e.aheadDecodeScheduled) || 0) + 1),
      Rg(e),
      { scheduled: !0, reason: "mse-ahead-decode-scheduled", leadSeconds: h });
}
function Rg(e = gc.mseAudio) {
  if (!e || e !== gc.mseAudio) return;
  const t = Array.isArray(e.aheadDecodeQueue) ? e.aheadDecodeQueue : [];
  for (
    e.aheadDecodeActive = Math.max(0, Number(e.aheadDecodeActive) || 0);
    t.length && e.aheadDecodeActive < 2;

  ) {
    const n = t.shift();
    ((e.aheadDecodeActive += 1),
      xg(e, n)
        .catch((t) => {
          ((e.aheadDecodeRejected =
            Math.max(0, Number(e.aheadDecodeRejected) || 0) + 1),
            Nx(
              "mse.ahead_decode.rejected",
              {
                reason: "decode-exception",
                sequence: n?.sequence || 0,
                mediaStartTime: aP(n?.mediaStartTime),
                mediaEndTime: aP(n?.mediaEndTime),
                error: t?.message || String(t || ""),
              },
              { source: "offscreen", level: "warn" },
            ));
        })
        .finally(() => {
          ((e.aheadDecodeActive = Math.max(
            0,
            (Number(e.aheadDecodeActive) || 1) - 1,
          )),
            e.aheadDecodePendingKeys?.delete?.(n?.key),
            e === gc.mseAudio && Rg(e));
        }));
  }
}
async function xg(e, t = {}) {
  if (
    !e ||
    e !== gc.mseAudio ||
    t.timelineRevision !== gc.timelineRevision ||
    t.sessionId !== (gc.sessionId || "")
  )
    return (
      e &&
        (e.aheadDecodeStale = Math.max(0, Number(e.aheadDecodeStale) || 0) + 1),
      !1
    );
  const n = Date.now(),
    a = HM(
      [
        {
          encodedAudio: !0,
          bytes: t.bytes,
          initBytes: t.initBytes,
          mimeType: t.mimeType,
          extension: t.extension,
          durationMs: t.expectedDurationMs,
          sourceMediaStartTime: t.mediaStartTime,
          sourceMediaEndTime: t.mediaEndTime,
          mseSequence: t.sequence,
        },
      ],
      { filenamePrefix: "caption-mse-ahead", segmentId: t.sequence || "chunk" },
    ),
    r = await VM(a.bytes, {
      reportError: !0,
      sequence: t.sequence,
      mimeType: t.mimeType,
      sessionId: t.sessionId,
      timelineRevision: t.timelineRevision,
    }),
    i = Math.max(0.001, t.mediaEndTime - t.mediaStartTime),
    o = Math.max(0, rP(r?.durationSeconds) || 0),
    s = o / i,
    l = Math.abs(o - i) <= Ar || (s >= kr && s <= Cr);
  if (!r?.samples?.length || !l)
    return (
      (e.aheadDecodeRejected =
        Math.max(0, Number(e.aheadDecodeRejected) || 0) + 1),
      Nx(
        "mse.ahead_decode.rejected",
        {
          reason: r?.samples?.length ? "duration-mismatch" : "decode-empty",
          sequence: t.sequence,
          mediaStartTime: aP(t.mediaStartTime),
          mediaEndTime: aP(t.mediaEndTime),
          expectedSeconds: aP(i),
          decodedSeconds: aP(o),
          durationRatio: aP(s),
          encodedBytes: a.bytes.byteLength,
          decodeLatencyMs: Date.now() - n,
          fallback: "source-tab-decoded-pcm",
        },
        { source: "offscreen", level: "warn" },
      ),
      !1
    );
  if (
    e !== gc.mseAudio ||
    t.timelineRevision !== gc.timelineRevision ||
    t.sessionId !== (gc.sessionId || "")
  )
    return (
      (e.aheadDecodeStale = Math.max(0, Number(e.aheadDecodeStale) || 0) + 1),
      !1
    );
  let c = {
    samples: r.samples,
    rawCaptureSamples: r.samples,
    captureSamples: r.samples,
    sourceType: "mse-ahead-decoded-pcm",
    durationMs: 1e3 * i,
    captureDurationMs: 1e3 * o,
    capturedAtMs: t.capturedAtMs,
    captureStartWallTimeMs: t.capturedAtMs,
    captureEndWallTimeMs: t.capturedAtMs,
    captureStartMs: 1e3 * t.mediaStartTime,
    captureEndMs: 1e3 * t.mediaEndTime,
    sourceMediaStartTime: t.mediaStartTime,
    sourceMediaEndTime: t.mediaEndTime,
    sourcePlaybackRate: 1,
    preparedForStt: !1,
    mseAheadDecoded: !0,
    mseDecodedFromEncoded: !0,
    mseSequence: t.sequence,
    mseLeadSeconds:
      null === rP(t.sourceCurrentTime)
        ? null
        : t.mediaStartTime - t.sourceCurrentTime,
    mseMediaRangeSource: t.mediaRangeSource,
    mseHookVersion: t.hookVersion,
    mseClusterSliceIndex: t.clusterSliceIndex,
    mseClusterSliceCount: t.clusterSliceCount,
    mseRepostAttempt: t.repostAttempt,
    mseEncodedBytes: a.bytes.byteLength,
    mseDecodedDurationSeconds: o,
  };
  const d = Og();
  if (
    null !== d &&
    c.sourceMediaStartTime < d &&
    ((c = gm(c, d, c.sourceMediaEndTime)), !c)
  )
    return !1;
  const u = Eg(e, c);
  if (!u) return !1;
  e.aheadDecodeCompleted = Math.max(0, Number(e.aheadDecodeCompleted) || 0) + 1;
  const m = Date.now();
  e.lastAheadDecodeCompletedAtMs = m;
  const g = Nm(m),
    p = null === g ? null : u.sourceMediaStartTime - g,
    f = qg(m);
  return (
    Fg(e, m),
    Nx(
      "mse.ahead_decode.completed",
      {
        sequence: t.sequence,
        mediaStartTime: aP(u.sourceMediaStartTime),
        mediaEndTime: aP(u.sourceMediaEndTime),
        expectedSeconds: aP(i),
        decodedSeconds: aP(o),
        durationRatio: aP(s),
        decodeLatencyMs: Date.now() - n,
        encodedBytes: a.bytes.byteLength,
        pcmSamples: u.samples.length,
        viewerMediaTime: aP(g),
        computeLeadSeconds: aP(p),
        decodedPcmLeadSeconds: aP(e.aheadDecodedPcmLeadSeconds),
        decodedPcmMaxLeadSeconds: aP(e.aheadDecodedPcmMaxLeadSeconds),
        decodedRingSeconds: aP((e.aheadDecodedPcmMs || 0) / 1e3),
        queuedSegments: Math.max(0, Number(f) || 0),
      },
      { source: "offscreen" },
    ),
    !0
  );
}
function Eg(e, t = {}) {
  return Pg(e, t)[0] || null;
}
function Pg(e, t = {}) {
  if (!e || e !== gc.mseAudio) return [];
  if (void 0 !== t.sessionId && t.sessionId !== gc.sessionId) return [];
  if (
    void 0 !== t.timelineRevision &&
    t.timelineRevision !== gc.timelineRevision
  )
    return [];
  const n = rP(t.sourceMediaStartTime),
    a = rP(t.sourceMediaEndTime);
  if (null === n || null === a || a <= n || !t.samples?.length) return [];
  const r = (
      Array.isArray(e.aheadDecodedPcmChunks) ? e.aheadDecodedPcmChunks : []
    )
      .filter(
        (e) =>
          e?.samples?.length &&
          null !== rP(e.sourceMediaStartTime) &&
          null !== rP(e.sourceMediaEndTime) &&
          e.sourceMediaEndTime > e.sourceMediaStartTime,
      )
      .sort((e, t) => e.sourceMediaStartTime - t.sourceMediaStartTime),
    i = Rh(
      n,
      a,
      r.map((e) => ({
        start: e.sourceMediaStartTime,
        end: e.sourceMediaEndTime,
      })),
    )
      .map((e) => (e.start === n && e.end === a ? t : gm(t, e.start, e.end)))
      .filter(Boolean);
  return i.length
    ? (r.push(...i),
      r.sort((e, t) => e.sourceMediaStartTime - t.sourceMediaStartTime),
      (e.aheadDecodedPcmChunks = r),
      Dg(e),
      Ig(e),
      i)
    : [];
}
function Dg(e = gc.mseAudio, t = Date.now()) {
  if (!e) return 0;
  const n = Nm(t);
  let a = Array.isArray(e.aheadDecodedPcmChunks) ? e.aheadDecodedPcmChunks : [];
  null !== n &&
    (a = a.filter(
      (e) =>
        null === rP(e?.sourceMediaEndTime) || e.sourceMediaEndTime >= n - 5,
    ));
  let r = oy(a);
  for (; a.length > 1 && r > wr; ) {
    const e = a.shift();
    r -= Math.max(0, rP(e?.durationMs) || 0);
  }
  return (
    (e.aheadDecodedPcmChunks = a),
    (e.aheadDecodedPcmMs = Math.max(0, r)),
    a.length
  );
}
function Ig(e = gc.mseAudio, t = Date.now()) {
  if (!e) return 0;
  const n = Array.isArray(e.aheadDecodedPcmChunks)
      ? e.aheadDecodedPcmChunks
      : [],
    a = Nm(t),
    r = lP(n.map((e) => rP(e?.sourceMediaEndTime))),
    i = null === a || null === r ? 0 : Math.max(0, r - a);
  return (
    (e.aheadDecodedPcmLeadSeconds = i),
    (e.aheadDecodedPcmMaxLeadSeconds = Math.max(
      Math.max(0, Number(e.aheadDecodedPcmMaxLeadSeconds) || 0),
      i,
    )),
    i
  );
}
function Lg(e = null, t = Date.now()) {
  const n = rP(e) ?? Nm(t) ?? Nk(t);
  if (null === n) return 0;
  const a = $p(
    [
      ...(Array.isArray(gc.pcmGroundTruthRing) ? gc.pcmGroundTruthRing : []),
      ...(Array.isArray(gc.mseAudio?.aheadDecodedPcmChunks)
        ? gc.mseAudio.aheadDecodedPcmChunks
        : []),
    ].map((e) => ({
      start: rP(e?.sourceMediaStartTime),
      end: rP(e?.sourceMediaEndTime),
    })),
    Rr,
  )
    .filter((e) => e.end > e.start)
    .sort((e, t) => e.start - t.start)
    .find((e) => e.start <= n + Qr && e.end >= n - Qr);
  return a ? Math.max(0, a.end - n) : 0;
}
function _g(e = [], t = 0, n = null, a = null) {
  const r = rP(n),
    i = rP(a);
  if (null === r || null === i) return !1;
  if (r < i - Qr) return !0;
  const o = e[t] || null,
    s = e[t + 1] || null,
    l = rP(o?.end),
    c = rP(s?.start);
  return Boolean(null !== l && null !== c && c > l + Qr);
}
function Bg(e = Date.now()) {
  const t = Og() ?? Nm(e) ?? Nk(e);
  if (null === t) return null;
  const n = hm(ou(), t, t + vr, Qr);
  return {
    floor: t,
    frontier: rP(n.coveredEnd) ?? t,
    gapStart: rP(n.gapStart) ?? t,
    gapEnd: rP(n.gapEnd),
  };
}
function Ug(e = null, t = null, n = Date.now()) {
  if (!eg()) return 0;
  if (gc.isStopping || !1 === gc.acceptingNewSttWork) return 0;
  const a = rP(e),
    r = rP(t);
  if (null === a || null === r || r <= a) return 0;
  const i = Array.isArray(gc.pcmGroundTruthRing) ? gc.pcmGroundTruthRing : [],
    o = rP(i[0]?.sourceMediaStartTime),
    s = rP(i[i.length - 1]?.sourceMediaEndTime);
  if (null === o || null === s || s <= o) return 0;
  const l = Math.max(a, o),
    c = Math.min(r, s - ci);
  if (c <= l) return 0;
  const d = c >= r - Qr;
  Uu(l, c);
  const u = uu(l, c)[0];
  if (!u) return 0;
  const m = Fu(u.start, n),
    g = Ou(i, u.start, u.end, {
      startup: !1,
      seekCatchup: !1,
      blockedTail: d,
      allowShortBlockedTail: d,
      windowProfile: m,
    });
  return null === g || g <= u.start
    ? 0
    : Nu(i, u.start, g, {
          startup: !1,
          windowProfile: m,
          mseGroundTruthGapUrgent: m.groundTruthGapUrgent,
          reason: "mse-ground-truth-gap",
        })
      ? (Nx(
          "mse.ahead_decode.gap_pcm_queued",
          {
            mediaStartTime: aP(u.start),
            mediaEndTime: aP(g),
            schedulingFrontierMediaTime: aP(a),
            futureIslandStartMediaTime: aP(r),
            groundTruthRingStartMediaTime: aP(o),
            groundTruthRingEndMediaTime: aP(s),
            viewerMediaTime: aP(Nm(n)),
            gapLeadSeconds: aP(m.gapLeadSeconds),
            urgentLeadThresholdSeconds: aP(m.urgentLeadThresholdSeconds),
            urgentWindow: Boolean(m.groundTruthGapUrgent),
          },
          { source: "offscreen", level: "warn" },
        ),
        Xu("mse-ground-truth-gap", n),
        1)
      : 0;
}
function qg(e = Date.now(), t = {}) {
  if (!eg()) return 0;
  if (gc.isStopping || !1 === gc.acceptingNewSttWork) return 0;
  if (Qu()) return 0;
  const n = gc.mseAudio;
  if (!n) return 0;
  Dg(n, e);
  const a = Array.isArray(n.aheadDecodedPcmChunks)
    ? n.aheadDecodedPcmChunks
    : [];
  if (!a.length) return 0;
  const r = $p(
      a.map((e) => ({
        start: rP(e?.sourceMediaStartTime),
        end: rP(e?.sourceMediaEndTime),
      })),
      Rr,
    )
      .filter((e) => e.end > e.start)
      .sort((e, t) => e.start - t.start),
    i = gc.mseStartupBoost || {},
    o = Og(),
    s = Nm(e),
    l = null === s ? null : s + vr,
    c = Boolean(t.flushIdleTail);
  let d = 0;
  for (let t = 0; t < r.length; t += 1) {
    const s = r[t];
    if (d >= 2) break;
    if (null !== l && s.start > l + Qr) continue;
    const u = Bg(e);
    if (u && s.start > u.frontier + Rr) {
      const t =
        a.find((e) => {
          const t = rP(e?.sourceMediaStartTime),
            n = rP(e?.sourceMediaEndTime);
          return null !== t && null !== n && n > s.start && t < s.end;
        }) || {};
      Mp(u.frontier, s.start, t);
      const r = Ug(u.frontier, s.start, e);
      d += r;
      const i = Array.isArray(gc.pcmGroundTruthRing)
          ? gc.pcmGroundTruthRing
          : [],
        o = `${Math.round(10 * u.frontier)}:${Math.round(10 * s.start)}`;
      vp(n.aheadDeferredAtByKey, o, e, fr) &&
        Nx(
          "mse.ahead_decode.future_island_parallel",
          {
            schedulingFloorMediaTime: aP(u.floor),
            schedulingFrontierMediaTime: aP(u.frontier),
            futureIslandStartMediaTime: aP(s.start),
            futureIslandEndMediaTime: aP(s.end),
            missingSeconds: aP(s.start - u.frontier),
            groundTruthGapQueued: r,
            parallelScheduling: !0,
            groundTruthRingStartMediaTime: aP(rP(i[0]?.sourceMediaStartTime)),
            groundTruthRingEndMediaTime: aP(
              rP(i[i.length - 1]?.sourceMediaEndTime),
            ),
            sequence: Math.max(0, Math.round(Number(t.sequence || 0) || 0)),
          },
          { source: "offscreen", level: "warn" },
        );
    }
    const m = s.end - ci,
      g = null === o ? s.start : Math.max(s.start, o);
    if (m <= g) continue;
    const p = uu(g, m);
    for (const o of p) {
      if (d >= 2) break;
      const s = Wu(),
        l = Vu(),
        u = s || l,
        g = 0 === Xd().pcmSegmentsScheduled || u,
        p = qu({ startup: g, seekCatchup: u }),
        f = _g(r, t, o.end, m),
        h = li,
        S = Boolean(
          c && t === r.length - 1 && o.end >= m - Qr && o.end - o.start >= h,
        ),
        M = f || S,
        v = Ou(a, o.start, o.end, {
          startup: g,
          seekCatchup: u,
          blockedTail: M,
          windowProfile: p,
        });
      null === v ||
        v <= o.start ||
        (Nu(a, o.start, v, {
          startup: g,
          startupReason: s
            ? "seek-ahead-decode"
            : l
              ? "initial-ahead-decode"
              : g
                ? "first-ahead-decode"
                : "",
          startupCatchup: $u(),
          batchSttProviderOverride: ju(),
          windowProfile: p,
          reason: "mse-ahead-decoded-pcm",
          mseAheadDecoded: !0,
          mseAheadDecodedIdleTailFlush: S,
          ringSpanSeconds: (n.aheadDecodedPcmMs || 0) / 1e3,
          decodedPcmLeadSeconds: Ig(n, e),
        }) &&
          (l &&
            (i.initialBatchCatchupSegmentsQueued =
              Math.max(0, Number(i.initialBatchCatchupSegmentsQueued) || 0) +
              1),
          (d += 1)));
    }
  }
  return (d && Xu("mse-ahead-decoded-pcm", e), d);
}
function Fg(e = gc.mseAudio, t = Date.now()) {
  if (!e || e !== gc.mseAudio) return !1;
  if (gc.isStopping || !1 === gc.acceptingNewSttWork) return !1;
  Zg(e);
  const n = gc.sessionId || "",
    a = gc.timelineRevision,
    r = rP(t) || Date.now();
  return (
    (e.aheadDecodedIdleTailFlushTimer = setTimeout(() => {
      if (
        ((e.aheadDecodedIdleTailFlushTimer = null),
        e !== gc.mseAudio ||
          gc.isStopping ||
          !1 === gc.acceptingNewSttWork ||
          (gc.sessionId || "") !== n ||
          gc.timelineRevision !== a ||
          rP(e.lastAheadDecodeCompletedAtMs) !== r)
      )
        return;
      const t = Date.now(),
        i = qg(t, { flushIdleTail: !0 });
      i <= 0 ||
        Nx(
          "mse.ahead_decode.idle_tail_flushed",
          {
            idleMs: Math.max(0, t - r),
            queuedSegments: i,
            decodedPcmLeadSeconds: aP(Ig(e, t)),
            decodedRingSeconds: aP((e.aheadDecodedPcmMs || 0) / 1e3),
          },
          { source: "offscreen" },
        );
    }, mi)),
    !0
  );
}
function Og() {
  return eD()
    ? null
    : 0 === gc.timelineRevision
      ? rP(gc.config?.initialPlaybackMediaTime)
      : sP([
          rP(gc.mseAudio?.seekTargetMediaTime),
          rP(gc.expectedSourceSeekTargetMediaTime),
        ]);
}
function Ng(e = gc.mseAudio || {}, t = {}) {
  if (!e || e.staleHookFallbackActivated) return !1;
  const n = Math.max(0, Number(e.staleHookSegmentsIgnored) || 0),
    a = Math.max(0, Number(e.segmentsReceived) || 0);
  if (!n || a > 0) return !1;
  const r = Date.now(),
    i = r - (rP(e.startedAtMs) || r);
  if (i < ul) return (Hg(e, t, ul - i), !1);
  if (!gc.mediaStream)
    return (
      e.staleHookFallbackUnavailableLogged ||
        ((e.staleHookFallbackUnavailableLogged = !0),
        Nx(
          "mse.audio_buffer.stale_hook_fallback_unavailable",
          {
            ...t,
            ignoredSegments: n,
            acceptedSegments: a,
            elapsedMs: Math.round(i),
            hasTabCaptureStream: !1,
          },
          { source: "offscreen", level: "error" },
        ),
        vP(
          "mse-hook-version-mismatch",
          "MSE hook 版本過舊，請重新整理影片分頁",
        )),
      !1
    );
  (Jg(e),
    (e.staleHookFallbackActivated = !0),
    (e.enabled = !1),
    (e.bridgeClosedAtMs = e.bridgeClosedAtMs || r),
    (e.bridgeClosedReason = "stale-hook-fallback"));
  const o = Yg("stale-hook-fallback");
  return (
    (gc.config = {
      ...(gc.config || {}),
      mseAudioBufferEnabled: !1,
      audioInputMode: "tab-capture",
      mseStartupBoostEnabled: !1,
      mseStartupBoostMode: "",
      mseStartupBoostActive: !1,
    }),
    (gc.mseStartupBoost = Ly(gc.config)),
    Qg("stale-hook-fallback"),
    Nx(
      "mse.audio_buffer.stale_hook_fallback",
      {
        ...t,
        ignoredSegments: n,
        acceptedSegments: a,
        elapsedMs: Math.round(i),
        hasTabCaptureStream: !0,
        droppedMseChunks: o.chunks,
        droppedMseDurationMs: o.durationMs,
        audioInputMode: gc.config.audioInputMode,
        mseAudioBufferEnabled: Boolean(gc.config.mseAudioBufferEnabled),
      },
      { source: "offscreen", level: "warn" },
    ),
    vP("mse-stale-hook-fallback", "MSE hook 過舊，已降級為分頁音訊字幕"),
    !0
  );
}
function Hg(e = gc.mseAudio || {}, t = {}, n = 1e4) {
  if (!e || e.staleHookFallbackTimer || e.staleHookFallbackActivated) return !1;
  const a = dP(n, 0, ul);
  return (
    (e.staleHookFallbackTimer = setTimeout(() => {
      ((e.staleHookFallbackTimer = null),
        e === gc.mseAudio &&
          Ng(e, {
            ...t,
            reason: t.reason || "stale-mse-hook-version-timeout",
            timer: !0,
          }));
    }, a)),
    !0
  );
}
function Gg(e = Date.now()) {
  if (
    !gc.sessionId ||
    !0 !== gc.config?.singleTabMediaSync ||
    !0 === gc.config?.sourceIsLiveStream
  )
    return !1;
  const t = gc.mseCoverageLedger;
  if (
    !t ||
    t.sessionId !== gc.sessionId ||
    t.timelineRevision !== gc.timelineRevision
  )
    return !1;
  const n = KA(e);
  return (
    !(null === rP(n.mediaTime) || null === rP(n.ageMs) || n.ageMs > ml) &&
    (t.entries || []).some(
      (e) =>
        "cache" === e?.owner &&
        "session-replay" === e.route &&
        "cache-ready" === e.stage &&
        e.sessionId === gc.sessionId &&
        e.timelineRevision === gc.timelineRevision &&
        Number.isFinite(e.start) &&
        Number.isFinite(e.end) &&
        e.start <= n.mediaTime &&
        e.end > n.mediaTime,
    )
  );
}
function Wg(e = gc.mseAudio || {}, t = gc.sourceMediaTiming) {
  if (!e || e.segmentsReceived > 0)
    return { eligible: !1, reason: "mse-segment-received", evidence: "" };
  if (Gg())
    return { eligible: !1, reason: "session-replay-ready", evidence: "" };
  if (Boolean(t && null !== rP(t.currentTime))) {
    if (t.ended) return { eligible: !1, reason: "source-ended", evidence: "" };
    if (t.adPlaying)
      return { eligible: !1, reason: "source-ad-playing", evidence: "" };
    if (t.paused)
      return { eligible: !1, reason: "source-paused", evidence: "" };
    if (t.seeking)
      return { eligible: !1, reason: "source-seeking", evidence: "" };
    const e = rP(t.readyState);
    return null !== e && e < 2
      ? { eligible: !1, reason: "source-loading", evidence: "" }
      : { eligible: !0, reason: "source-playing", evidence: "source-playing" };
  }
  const n = rP(e.noSegmentFallbackHookActivityAtMs);
  return null !== n && n > 0
    ? { eligible: !0, reason: "hook-activity", evidence: "hook-activity" }
    : { eligible: !1, reason: "waiting-for-playback-or-hook", evidence: "" };
}
function $g(e = gc.mseAudio || {}, t = "not-eligible", n = Date.now()) {
  if (!e) return !1;
  const a = rP(e.noSegmentFallbackCountdownStartedAtMs),
    r = null !== a && a > 0 ? a : null;
  return (
    Xg(e),
    (e.noSegmentFallbackCountdownStartedAtMs = 0),
    (e.noSegmentFallbackEvidence = ""),
    null !== r &&
      (Nx(
        "mse.audio_buffer.no_segment_countdown_reset",
        {
          reason: t,
          elapsedMs: Math.max(0, Math.round(n - r)),
          sourcePaused: Boolean(gc.sourceMediaTiming?.paused),
          sourceReadyState: rP(gc.sourceMediaTiming?.readyState),
        },
        { source: "offscreen" },
      ),
      !0)
  );
}
function Vg(e = "state-update", t = Date.now()) {
  const n = gc.mseAudio || (gc.mseAudio = Py());
  if (
    !gc.config ||
    !zm() ||
    Ym() ||
    !n.enabled ||
    n.noSegmentFallbackActivated ||
    n.segmentsReceived > 0
  )
    return (Xg(n), { armed: !1, reason: "not-applicable", evidence: "" });
  const a = Wg(n);
  if (!a.eligible) return ($g(n, a.reason, t), { armed: !1, ...a });
  const r = rP(n.noSegmentFallbackCountdownStartedAtMs);
  let i = null !== r && r > 0 ? r : null;
  null === i &&
    ((i = t),
    (n.noSegmentFallbackCountdownStartedAtMs = i),
    (n.noSegmentFallbackEvidence = a.evidence),
    Nx(
      "mse.audio_buffer.no_segment_countdown_started",
      {
        reason: e,
        evidence: a.evidence,
        sourceMediaTime: aP(gc.sourceMediaTiming?.currentTime),
        sourceReadyState: rP(gc.sourceMediaTiming?.readyState),
        sourceBufferCount: Math.max(
          0,
          Number(n.noSegmentFallbackHookSourceBufferCount) || 0,
        ),
        appendCount: Math.max(
          0,
          Number(n.noSegmentFallbackHookAppendCount) || 0,
        ),
        delayMs: ml,
      },
      { source: "offscreen" },
    ));
  const o = Math.max(0, t - i);
  return (
    Kg(n, Math.max(0, ml - o)),
    {
      armed: !0,
      reason: a.reason,
      evidence: a.evidence,
      startedAtMs: i,
      elapsedMs: o,
    }
  );
}
function jg(e = {}, t = Date.now()) {
  const n = String(e?.type || e?.kind || "");
  if (!n.startsWith("mse.")) return !1;
  const a = e?.data && "object" == typeof e.data ? e.data : e,
    r = a?.stats && "object" == typeof a.stats ? a.stats : {},
    i = Math.max(
      0,
      Number(a.sourceBufferCount) || 0,
      Number(a.audioSourceBufferCount) || 0,
      Number(r.sourceBufferCount) || 0,
      Number(r.audioSourceBufferCount) || 0,
    ),
    o = Math.max(
      0,
      Number(a.appendCount) || 0,
      Number(a.audioAppendCount) || 0,
      Number(a.unknownAppendCount) || 0,
      Number(a.ignoredAppendCount) || 0,
      Number(r.appendCount) || 0,
      Number(r.audioAppendCount) || 0,
      Number(r.unknownAppendCount) || 0,
      Number(r.ignoredAppendCount) || 0,
    ),
    s = String(a.reason || ""),
    l =
      "mse.audio_buffer.diagnostic" === n &&
      /(?:append-buffer|source-buffer)/i.test(s) &&
      !/inactive-media-source/i.test(s);
  if (i <= 0 && o <= 0 && !l) return !1;
  const c = gc.mseAudio || (gc.mseAudio = Py());
  return (
    (c.noSegmentFallbackHookActivityAtMs = t),
    (c.noSegmentFallbackHookSourceBufferCount = Math.max(
      Number(c.noSegmentFallbackHookSourceBufferCount) || 0,
      i,
    )),
    (c.noSegmentFallbackHookAppendCount = Math.max(
      Number(c.noSegmentFallbackHookAppendCount) || 0,
      o,
    )),
    Vg("hook-activity", t),
    !0
  );
}
function Kg(e = gc.mseAudio || {}, t = 12e3) {
  return !(
    !e ||
    e.noSegmentFallbackTimer ||
    e.noSegmentFallbackActivated ||
    ((e.noSegmentFallbackTimer = setTimeout(
      () => {
        ((e.noSegmentFallbackTimer = null),
          e !== gc.mseAudio || e.noSegmentFallbackActivated || zg(e));
      },
      dP(t, 0, ml),
    )),
    0)
  );
}
function zg(e = gc.mseAudio || {}) {
  if (!e || e.noSegmentFallbackActivated || e.segmentsReceived > 0) return !1;
  if (!gc.config || !zm() || !e.enabled) return !1;
  const t = Date.now(),
    n = Wg(e);
  if (!n.eligible) return ($g(e, n.reason, t), !1);
  const a = rP(e.noSegmentFallbackCountdownStartedAtMs),
    r = null !== a && a > 0 ? a : null;
  if (null === r) return (Vg("deadline-check", t), !1);
  const i = t - r;
  if (i < ml) return (Kg(e, ml - i), !1);
  if (!gc.mediaStream)
    return (
      e.noSegmentFallbackUnavailableLogged ||
        ((e.noSegmentFallbackUnavailableLogged = !0),
        Nx(
          "mse.audio_buffer.no_segment_fallback_unavailable",
          {
            elapsedMs: Math.round(i),
            evidence: e.noSegmentFallbackEvidence || n.evidence,
            acceptedSegments: Math.round(Number(e.segmentsReceived) || 0),
            hasTabCaptureStream: !1,
          },
          { source: "offscreen", level: "error" },
        ),
        vP("mse-no-audio-segments", "尚未收到 MSE 音訊，請重新整理影片分頁")),
      !1
    );
  (Xg(e),
    Jg(e),
    Jm(e, t),
    (e.noSegmentFallbackActivated = !0),
    (e.enabled = !1),
    (e.bridgeClosedAtMs = e.bridgeClosedAtMs || t),
    (e.bridgeClosedReason = "no-mse-segment-fallback"));
  const o = Yg("no-mse-segment-fallback");
  return (
    (gc.config = {
      ...(gc.config || {}),
      mseAudioBufferEnabled: !1,
      audioInputMode: "tab-capture",
      mseStartupBoostEnabled: !1,
      mseStartupBoostMode: "",
      mseStartupBoostActive: !1,
    }),
    (gc.mseStartupBoost = Ly(gc.config)),
    Qg("no-mse-segment-fallback"),
    Nx(
      "mse.audio_buffer.no_segment_fallback",
      {
        elapsedMs: Math.round(i),
        evidence: e.noSegmentFallbackEvidence || n.evidence,
        acceptedSegments: Math.round(Number(e.segmentsReceived) || 0),
        hasTabCaptureStream: !0,
        droppedMseChunks: o.chunks,
        droppedMseDurationMs: o.durationMs,
        audioInputMode: gc.config.audioInputMode,
        mseAudioBufferEnabled: Boolean(gc.config.mseAudioBufferEnabled),
      },
      { source: "offscreen", level: "warn" },
    ),
    vP("mse-no-segment-fallback", "MSE 音訊未啟動，已降級為分頁音訊字幕"),
    !0
  );
}
function Qg(e = "mse-fallback") {
  return !(
    gc.isStopping ||
    gc.activeSttProvider !== ae ||
    gc.websocket ||
    gc.speechEngineARealtimeFallbackPending ||
    ((gc.speechEngineARealtimeFallbackPending = !0),
    sd()
      .then(() => {
        Nx(
          "stt.speechEngineA_realtime.mse_fallback_connected",
          { reason: e, audioInputMode: gc.config?.audioInputMode || "" },
          { source: "offscreen", provider: ae },
        );
      })
      .catch((t) => {
        (Nx(
          "stt.speechEngineA_realtime.mse_fallback_failed",
          { reason: e, error: t.message || String(t || "") },
          { source: "offscreen", level: "error", provider: ae },
        ),
          md("mse-transport-connect-failed", {
            error: t.message || String(t || ""),
          }) || yP(`迅聽 Mini 即時版降級連線失敗: ${t.message}`));
      })
      .finally(() => {
        gc.speechEngineARealtimeFallbackPending = !1;
      }),
    0)
  );
}
function Jg(e = gc.mseAudio || {}) {
  e?.staleHookFallbackTimer &&
    (clearTimeout(e.staleHookFallbackTimer), (e.staleHookFallbackTimer = null));
}
function Xg(e = gc.mseAudio || {}) {
  e?.noSegmentFallbackTimer &&
    (clearTimeout(e.noSegmentFallbackTimer), (e.noSegmentFallbackTimer = null));
}
function Zg(e = gc.mseAudio || {}) {
  e?.aheadDecodedIdleTailFlushTimer &&
    (clearTimeout(e.aheadDecodedIdleTailFlushTimer),
    (e.aheadDecodedIdleTailFlushTimer = null));
}
function Yg(e = "stale-hook-fallback") {
  const t = sy();
  if (!Vf(t)) return { chunks: 0, durationMs: 0 };
  $f(t);
  const n = t.chunks.length,
    a = Math.round(oy(t.chunks));
  return (
    (t.chunks = []),
    (t.durationMs = 0),
    Nx(
      "stt.batch.mse_pending_dropped_for_fallback",
      { reason: e, chunks: n, durationMs: a },
      { source: "offscreen", level: "warn" },
    ),
    { chunks: n, durationMs: a }
  );
}
function ep({
  state: e = {},
  payload: t = {},
  capturedAtMs: n = 0,
  mediaStartTime: a = null,
  mediaEndTime: r = null,
  sourceCurrentTime: i = null,
} = {}) {
  const o = rP(e.resetAtMs) || 0;
  if (
    o > 0 &&
    n > 0 &&
    n < o - nl &&
    !np({ state: e, mediaStartTime: a, mediaEndTime: r, playbackMediaTime: i })
  )
    return "captured-before-timeline-reset";
  const s = rP(e.seekTargetMediaTime);
  if (null !== s && !0 !== e.seekAnchorEstablished) {
    const e = tp(a, r, s),
      t = !(null !== a && null !== r) && null !== i && Math.abs(i - s) <= il;
    if (!e && !t) return "seek-anchor-pending";
  }
  if (null !== s && null !== r && r < s - al) return "before-seek-target";
  const l = i ?? zA(n),
    c = null !== l && null !== a ? a - l : rP(t.leadSeconds),
    d = null !== l && null !== r ? r - l : rP(t.leadSeconds),
    u = ap(),
    m = rP(t.leadSeconds),
    g = null !== m && m <= u + 0.5;
  return null !== c && c > 180
    ? "too-far-ahead"
    : null !== d && d > 180
      ? "too-far-ahead-end"
      : null !== c && c > u && !g
        ? "too-far-ahead"
        : null !== d && d > u && !g
          ? "too-far-ahead-end"
          : null !== a && null !== r && r > a && r - a > cl
            ? "media-range-too-large"
            : "";
}
function tp(e, t, n) {
  const a = rP(e),
    r = rP(t),
    i = rP(n);
  return (
    !(null === a || null === r || null === i || r <= a) &&
    r >= i - al &&
    a <= i + 5
  );
}
function np({
  state: e = {},
  mediaStartTime: t = null,
  mediaEndTime: n = null,
  playbackMediaTime: a = null,
} = {}) {
  const r = rP(e.seekTargetMediaTime);
  if (null === r) return !1;
  const i = rP(t),
    o = rP(n);
  if (null === i || null === o || o <= i) return !1;
  if (!0 !== e.seekAnchorEstablished) return tp(i, o, r);
  if (o < r - al) return !1;
  const s = ap();
  return !(i > Math.max(r, rP(a) ?? r) + s);
}
function ap() {
  const e = rP(gc.config?.mseAudioMaxFutureLeadSeconds);
  if (null !== e) return dP(e, 20, ll);
  const t =
    rP(gc.config?.effectiveSyncDelaySeconds ?? gc.config?.syncDelaySeconds) ||
    0;
  return dP(Math.max(sl, t + 85), 20, ll);
}
function rp(e = {}, t = {}) {
  const n = gc.mseAudio || (gc.mseAudio = Py());
  cp(n);
  const a = op({
    start: t.mediaStartTime ?? e.sourceMediaStartTime,
    end: t.mediaEndTime ?? e.sourceMediaEndTime,
    sequence: t.sequence ?? e.mseSequence,
  });
  if (!a)
    return (
      (n.standardSegmentsScheduled =
        Math.max(0, Number(n.standardSegmentsScheduled) || 0) + 1),
      { route: "standard", reason: "no-media-range" }
    );
  const r = sP([
      Nm(t.capturedAtMs || Date.now()),
      t.sourceCurrentTime,
      zA(t.capturedAtMs || Date.now()),
    ]),
    i = null !== r ? a.start - r : null,
    o = ip();
  if (pp(a.start, a.end))
    return (
      (n.cacheCoveredSegments =
        Math.max(0, Number(n.cacheCoveredSegments) || 0) + 1),
      Mu(a.start, a.end, {
        owner: "cache",
        route: "cache-covered",
        stage: "cache-ready",
        sequence: a.sequence,
      }),
      dp(n, "cacheCoveredRanges", a, { route: "cache-covered" }),
      hp("cache-covered", {
        ...a,
        deadlineSeconds: i,
        requiredLeadSeconds: o,
        playbackTime: r,
      }),
      {
        route: "cache-covered",
        reason: "subtitle-cache-covered",
        deadlineSeconds: aP(i),
        requiredLeadSeconds: o,
      }
    );
  if (vg() && !(null === i || i >= o))
    return (
      (n.fastFallbackSegments =
        Math.max(0, Number(n.fastFallbackSegments) || 0) + 1),
      dp(n, "fastCoveredRanges", a, { route: "fast-fallback" }),
      hp("fast-fallback", {
        ...a,
        deadlineSeconds: i,
        requiredLeadSeconds: o,
        playbackTime: r,
        fastProvider: gc.mseStartupBoost?.fastProvider || Dl,
      }),
      {
        route: "fast-fallback",
        reason: "deadline-covered-by-fast-pipeline",
        deadlineSeconds: aP(i),
        requiredLeadSeconds: o,
      }
    );
  const s = Mu(a.start, a.end, {
    owner: "mse",
    route: "mse-lookahead",
    stage: "buffering",
    sequence: a.sequence,
  });
  if (!s.claimed)
    return (
      (n.duplicateSegmentsSkipped =
        Math.max(0, Number(n.duplicateSegmentsSkipped) || 0) + 1),
      hp(
        "duplicate",
        {
          ...a,
          deadlineSeconds: i,
          requiredLeadSeconds: o,
          playbackTime: r,
          coverageReason: s.reason || "owned-range",
        },
        "warn",
      ),
      {
        route: "duplicate",
        reason: s.reason || "mse-range-already-owned",
        duplicateSeconds: aP(s.duplicateSeconds),
        deadlineSeconds: aP(i),
        requiredLeadSeconds: o,
      }
    );
  const l = yh(r);
  return (
    (n.standardSegmentsScheduled =
      Math.max(0, Number(n.standardSegmentsScheduled) || 0) + 1),
    s.continued ||
      dp(n, "scheduledRanges", a, {
        route: "standard",
        coverageClaimId: s.claimId,
        stage: "buffering",
      }),
    hp("standard", {
      ...a,
      deadlineSeconds: i,
      requiredLeadSeconds: o,
      playbackTime: r,
      startupBatchWindow: eb({ sourceType: "mse-audio-buffer" }),
      readyCatchup: l,
      coverageClaimId: s.claimId,
      coverageContinuation: Boolean(s.continued),
    }),
    {
      route: "standard",
      reason: "deadline-safe-for-standard",
      coverageClaimId: s.claimId,
      coverageContinuation: Boolean(s.continued),
      deadlineSeconds: aP(i),
      requiredLeadSeconds: o,
    }
  );
}
function ip() {
  const e = rP(gc.config?.mseStandardRequiredLeadSeconds);
  return null !== e ? dP(e, 3, 90) : aP(kp() / 1e3 + 5);
}
function op(e = {}) {
  const t = rP(e.start),
    n = rP(e.end);
  return null === t || null === n || n <= t
    ? null
    : {
        start: t,
        end: n,
        sequence: Math.max(0, Math.round(Number(e.sequence || 0) || 0)),
        addedAtMs: Date.now(),
      };
}
function sp(e = {}) {
  const t = Array.isArray(e.chunks) ? e.chunks : [],
    n = sP(t.map((e) => e.sourceMediaStartTime)),
    a = lP(t.map((e) => e.sourceMediaEndTime));
  if (null !== n && null !== a && a > n) return { start: n, end: a };
  const r = wv(n, a, rP(e.durationMs) || oy(t));
  return null !== r.start && null !== r.end && r.end > r.start
    ? { start: r.start, end: r.end }
    : null;
}
function lp(e = {}, t = "uncovered") {
  const n = gc.mseAudio || null,
    a = sp(e);
  if (!n || !a) return 0;
  let r = 0;
  for (const e of [
    "scheduledRanges",
    "fastCoveredRanges",
    "cacheCoveredRanges",
  ]) {
    const t = Array.isArray(n[e]) ? n[e] : [],
      i = [];
    for (const e of t) {
      const t = rP(e.start),
        n = rP(e.end);
      (null !== t && null !== n
        ? Math.max(0, Math.min(n, a.end) - Math.max(t, a.start))
        : 0) /
        Math.max(0.001, a.end - a.start) >=
      0.5
        ? (r += 1)
        : i.push(e);
    }
    n[e] = i;
  }
  return (
    r &&
      Nx(
        "mse.audio_buffer.scheduler_range_forgotten",
        {
          reason: t,
          segmentId: e.id,
          mediaStartTime: aP(a.start),
          mediaEndTime: aP(a.end),
          removed: r,
        },
        { source: "offscreen", level: "warn" },
      ),
    r
  );
}
function cp(e = gc.mseAudio || {}) {
  const t = Date.now();
  for (const n of [
    "scheduledRanges",
    "fastCoveredRanges",
    "cacheCoveredRanges",
  ]) {
    const a = Array.isArray(e[n]) ? e[n] : [];
    e[n] = a.filter((e) => t - (Number(e.addedAtMs) || t) <= vl).slice(-240);
  }
}
function dp(e = gc.mseAudio || {}, t = "scheduledRanges", n = {}, a = {}) {
  const r = Array.isArray(e[t]) ? e[t] : [];
  (r.push({
    start: aP(n.start),
    end: aP(n.end),
    sequence: Math.max(0, Math.round(Number(n.sequence || 0) || 0)),
    addedAtMs: Date.now(),
    ...a,
  }),
    (e[t] = r.slice(-240)));
}
function up(e = {}, t = "scheduled") {
  const n = gc.mseAudio || null,
    a = sp(e);
  if (!n || !a) return 0;
  const r = Date.now();
  let i = 0;
  for (const e of n.scheduledRanges || []) {
    const n = rP(e?.start),
      o = rP(e?.end);
    null === n ||
      null === o ||
      o <= n ||
      Math.max(0, Math.min(o, a.end) - Math.max(n, a.start)) /
        Math.max(0.001, Math.min(o - n, a.end - a.start)) <
        0.5 ||
      ((e.stage = t), (e.progressAtMs = r), (i += 1));
  }
  return i;
}
function mp(e = gc.mseAudio || {}, t = {}) {
  return [
    ...(Array.isArray(e.scheduledRanges) ? e.scheduledRanges : []),
    ...(Array.isArray(e.fastCoveredRanges) ? e.fastCoveredRanges : []),
    ...(Array.isArray(e.cacheCoveredRanges) ? e.cacheCoveredRanges : []),
  ].some((e) => gp(e, t));
}
function gp(e = {}, t = {}) {
  const n = rP(e.start),
    a = rP(e.end),
    r = rP(t.start),
    i = rP(t.end);
  if (null === n || null === a || null === r || null === i) return !1;
  const o = Math.max(0.001, i - r);
  return (
    Math.max(0, Math.min(a, i) - Math.max(n, r)) / o >= 0.85 ||
    (Math.abs(n - r) <= Sl && Math.abs(a - i) <= Sl)
  );
}
function pp(e, t) {
  if (!gc.config?.hybridSubtitleCacheMode) return !1;
  if (!0 !== gc.config.cachedSubtitleCoverageReliable) return !1;
  const n = rP(e),
    a = rP(t);
  if (null === n || null === a || a <= n) return !1;
  const r = Array.isArray(gc.config.cachedSubtitleCoverageRanges)
    ? gc.config.cachedSubtitleCoverageRanges
    : [];
  if (!r.length) return !1;
  const i = Math.max(0, Math.round(1e3 * (n + 0.25))),
    o = Math.max(i, Math.round(1e3 * (a - 0.25)));
  return r.some((e) => {
    const t = rP(e.startMs ?? e.start_ms),
      n = rP(e.endMs ?? e.end_ms);
    return (
      null !== t &&
      null !== n &&
      n > t &&
      i >= t - 500 &&
      o <= n + 500 &&
      fp(e, t, n)
    );
  });
}
function fp(e = {}, t = null, n = null) {
  const a = rP(t ?? e.startMs ?? e.start_ms),
    r = rP(n ?? e.endMs ?? e.end_ms);
  if (null === a || null === r || r <= a) return !1;
  const i = (r - a) / 1e3,
    o = Math.max(
      0,
      Math.round(
        Number(
          e.segments ??
            e.segmentCount ??
            e.segment_count ??
            e.subtitleCount ??
            0,
        ) || 0,
      ),
    );
  return !(o <= 0) && (i <= 8 || i / o <= Tl);
}
function hp(e, t = {}, n = "info") {
  const a = gc.mseAudio || {},
    r = Date.now();
  ("standard" !== e || r - (Number(a.schedulerLastLogAtMs) || 0) >= yl) &&
    ((a.schedulerLastLogAtMs = r),
    Nx(
      "mse.audio_buffer.scheduler",
      {
        route: e,
        mediaStartTime: aP(t.start),
        mediaEndTime: aP(t.end),
        sequence: Math.max(0, Math.round(Number(t.sequence || 0) || 0)),
        playbackTime: aP(t.playbackTime),
        deadlineSeconds: aP(t.deadlineSeconds),
        requiredLeadSeconds: aP(t.requiredLeadSeconds),
        startupBatchWindow: Boolean(t.startupBatchWindow),
        readyCatchupActive: Boolean(t.readyCatchup?.active),
        readyCatchupReason: t.readyCatchup?.reason || "",
        readySubtitleLeadSeconds: aP(t.readyCatchup?.readyLeadSeconds),
        rawLeadSeconds: aP(t.readyCatchup?.rawLeadSeconds),
        targetReadySeconds: aP(t.readyCatchup?.targetReadySeconds),
        fastProvider: t.fastProvider || "",
        standardSegmentsScheduled: Math.max(
          0,
          Number(a.standardSegmentsScheduled) || 0,
        ),
        fastFallbackSegments: Math.max(0, Number(a.fastFallbackSegments) || 0),
        cacheCoveredSegments: Math.max(0, Number(a.cacheCoveredSegments) || 0),
        duplicateSegmentsSkipped: Math.max(
          0,
          Number(a.duplicateSegmentsSkipped) || 0,
        ),
      },
      { source: "offscreen", level: n },
    ));
}
function Sp(e = {}, t = {}) {
  const n = rP(e.lastAcceptedMediaEndTime),
    a = rP(t.mediaStartTime);
  if (null === n || null === a) return !1;
  if (Math.abs(a - n) <= ol) return !1;
  const r = rP(e.maxAcceptedMediaEndTime),
    i = null !== r ? Math.max(n, r) : n;
  a - i > ol && (Mp(i, a, t), em(i, a, t.sequence));
  const o = sy(),
    s = Array.from(new Set((o.chunks || []).map(Uf)));
  if (s.includes("mse-audio-buffer")) {
    const e = Math.round(oy(o.chunks)),
      r = Ky({ chunks: o.chunks }),
      i = a - n;
    if (e >= r) {
      const l = o.chunks.length,
        c = Xf({ force: !0, reason: "mse-discontinuity-gap" });
      return (
        Nx(
          "mse.audio_buffer.discontinuity_flush",
          {
            sequence: t.sequence,
            previousEnd: n,
            nextStart: a,
            gapSeconds: i,
            flushed: c,
            flushedChunks: l,
            flushedDurationMs: e,
            minMs: r,
            pendingSourceTypes: s,
          },
          { source: "offscreen", level: "warn" },
        ),
        !1
      );
    }
    if (e >= xs) {
      const l = o.chunks.length,
        c = Xf({ force: !0, reason: "mse-discontinuity-gap-cut" });
      return (
        Nx(
          "mse.audio_buffer.discontinuity_flush",
          {
            sequence: t.sequence,
            previousEnd: n,
            nextStart: a,
            gapSeconds: i,
            flushed: c,
            flushedChunks: l,
            flushedDurationMs: e,
            minMs: r,
            belowMinSegment: !0,
            pendingSourceTypes: s,
          },
          { source: "offscreen", level: "warn" },
        ),
        !1
      );
    }
    $f(o);
    const l = o.chunks.length;
    return (
      _u({ chunks: o.chunks }, "mse-discontinuity-drop-pending"),
      (o.chunks = []),
      (o.durationMs = 0),
      Nx(
        "mse.audio_buffer.discontinuity_drop_pending",
        {
          sequence: t.sequence,
          previousEnd: n,
          nextStart: a,
          gapSeconds: i,
          droppedChunks: l,
          droppedDurationMs: e,
          minMs: r,
          pendingSourceTypes: s,
        },
        { source: "offscreen", level: "warn" },
      ),
      !0
    );
  }
  $f(o);
  const l = o.chunks.length,
    c = Math.round(oy(o.chunks));
  return (
    _u({ chunks: o.chunks }, "mse-discontinuity-reset"),
    (o.chunks = []),
    (o.durationMs = 0),
    Nx(
      "mse.audio_buffer.discontinuity_reset",
      {
        sequence: t.sequence,
        previousEnd: n,
        nextStart: a,
        gapSeconds: a - n,
        droppedChunks: l,
        droppedDurationMs: c,
        pendingSourceTypes: s,
      },
      { source: "offscreen", level: "warn" },
    ),
    !0
  );
}
function Mp(e, t, n = {}) {
  const a = t - e;
  if (!(a > gr && a <= pr)) return;
  const r = `${Math.round(10 * e)}:${Math.round(10 * t)}`,
    i = Date.now();
  vp((gc.mseAudio || (gc.mseAudio = Py())).gapRepostAtByKey, r, i, fr) &&
    chrome.runtime
      .sendMessage({
        type: "LIVE_SUBTITLE_MSE_AUDIO_REPOST_REQUEST",
        sessionId: gc.sessionId || "",
        mediaStartTime: e,
        mediaEndTime: t,
        reason: "mse-gap",
        maxAttempt: 1,
      })
      .then((r) => {
        const i = Boolean(r?.requestPosted ?? r?.requested);
        Nx(
          "mse.audio_buffer.gap_repost_requested",
          {
            sequence: Math.max(0, Math.round(Number(n.sequence || 0) || 0)),
            mediaStartTime: aP(e),
            mediaEndTime: aP(t),
            gapSeconds: aP(a),
            ok: Boolean(r?.ok),
            ignored: Boolean(r?.ignored),
            requestPosted: i,
            recoveredUnknownUntilHookDiagnostic: i,
            reason: r?.reason || r?.error || "",
          },
          { source: "offscreen", level: r?.ok && i ? "warn" : "error" },
        );
      })
      .catch((r) => {
        Nx(
          "mse.audio_buffer.gap_repost_requested",
          {
            sequence: Math.max(0, Math.round(Number(n.sequence || 0) || 0)),
            mediaStartTime: aP(e),
            mediaEndTime: aP(t),
            gapSeconds: aP(a),
            ok: !1,
            ignored: !1,
            reason: r?.message || "mse gap repost request failed",
          },
          { source: "offscreen", level: "warn" },
        );
      });
}
function vp(e, t, n, a, r = 64) {
  if (!(e instanceof Map)) return !0;
  if (n - (rP(e.get(t)) || 0) < a) return !1;
  for (e.set(t, n); e.size > r; ) e.delete(e.keys().next().value);
  return !0;
}
function yp(e) {
  if (!e) return new Uint8Array();
  if (e instanceof Uint8Array) return e;
  if (e instanceof ArrayBuffer) return new Uint8Array(e);
  if (ArrayBuffer.isView(e))
    return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
  if ("string" == typeof e)
    try {
      const t = e.includes(",") ? e.slice(e.indexOf(",") + 1) : e,
        n = atob(t.replace(/\s+/g, "")),
        a = new Uint8Array(n.length);
      for (let e = 0; e < n.length; e += 1) a[e] = 255 & n.charCodeAt(e);
      return a;
    } catch {
      return new Uint8Array();
    }
  if ("number" == typeof e.byteLength && "function" == typeof e.slice)
    try {
      return new Uint8Array(e.slice(0));
    } catch {}
  return Array.isArray(e) ? new Uint8Array(e) : new Uint8Array();
}
function bp(e = "") {
  const t = String(e || "")
    .split(";")[0]
    .trim()
    .toLowerCase();
  return /^audio\/[a-z0-9.+-]+$/.test(t)
    ? t
    : t.includes("webm")
      ? "audio/webm"
      : (t.includes("mp4") || t.includes("m4a") || t.includes("aac"),
        "audio/mp4");
}
function Tp(e = "", t = "") {
  const n = String(e || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  if (["m4a", "mp4", "webm", "ogg", "mp3", "aac", "wav"].includes(n)) return n;
  const a = bp(t);
  return a.includes("webm")
    ? "webm"
    : a.includes("ogg")
      ? "ogg"
      : a.includes("mpeg")
        ? "mp3"
        : a.includes("aac")
          ? "aac"
          : a.includes("wav")
            ? "wav"
            : "m4a";
}
function wp(e) {
  const t = rP(e);
  return null === t ? "?" : `${t.toFixed(1)}s`;
}
function kp() {
  const e = Xy({ sourceType: "mse-audio-buffer" }),
    t = Jy(),
    n = qC();
  return Math.max(0, Math.round(e + t + n + 2e3));
}
function Cp() {
  const e = Gs + Jy() + qC() + 2e3,
    t = qy((gc.mseStartupBoost || {}).targetReadySeconds);
  return dP(Math.max(e / 1e3, t), 6, Al);
}
function Ap(e = []) {
  const t = Op(e),
    n = LP(gc.mseStartupBoost?.fastSttProvider || gc.activeSttProvider),
    a = [];
  for (const e of t) {
    const t = Mu(e.start, e.end, {
      owner: "realtime",
      route: "fast-realtime",
      stage: "subtitle-ready",
    });
    t.claimed && t.claimId && a.push(t.claimId);
  }
  return (
    a.length &&
      Nx(
        "mse.coverage.realtime_ready_registered",
        {
          claimIds: a,
          ranges: t.map((e) => ({ start: aP(e.start), end: aP(e.end) })),
        },
        { source: "offscreen", provider: n },
      ),
    a
  );
}
function Rp(e = null) {
  if (!Sg()) return [];
  if (!By(e?.sttProvider)) return [];
  if ("tab-capture" !== e?.sourceType) return [];
  const t = Op(e?.realtimeProcessedAudioRanges);
  if (!t.length) return [];
  const n = gc.mseStartupBoost || (gc.mseStartupBoost = Dy());
  return (
    (n.startupProcessedAudioRanges = $p(
      [...Op(n.startupProcessedAudioRanges), ...t],
      Qr,
    ).slice(-80)),
    Ap(t),
    t
  );
}
function xp(e = null) {
  if (!Sg()) return [];
  if (!By(e?.sttProvider)) return [];
  if ("tab-capture" !== e?.sourceType) return [];
  const t = Op(e?.realtimeProcessedAudioRanges);
  if (!t.length) return [];
  const n = gc.mseStartupBoost || (gc.mseStartupBoost = Dy());
  return (
    (n.startupFinalSttAudioRanges = $p(
      [...Op(n.startupFinalSttAudioRanges), ...t],
      Qr,
    ).slice(-80)),
    Nx(
      "mse.audio_buffer.final_stt_coverage",
      {
        ranges: t.map((e) => ({ start: aP(e.start), end: aP(e.end) })),
        startupFinalSttAudioRanges: Wp(n.startupFinalSttAudioRanges),
      },
      { source: "offscreen", provider: LP(e?.sttProvider) },
    ),
    t
  );
}
function Ep() {
  const e = qP((gc.mseStartupBoost || {}).fastProvider || Dl);
  return aP((La + (So[e] || Ma)) / 1e3 + Wl);
}
function Pp(e, t = Date.now()) {
  const n = gc.mseStartupBoost || (gc.mseStartupBoost = Dy());
  if (n.mode !== Rl)
    return (
      (n.startupReleaseLeadSeconds = 7),
      (n.startupReleaseReadyLeadSeconds = 0),
      (n.startupReleaseReadyOnlyLeadSeconds = 0),
      (n.startupReleasePendingTranslationReserveSeconds = 0),
      (n.startupReleaseUsedPendingFinalStt = !1),
      (n.startupReleaseReadyRanges = []),
      (n.startupReleaseReadyDecision = null),
      (n.startupReleaseReady = !1),
      (n.startupReleaseReadyCurrent = !1),
      (n.startupReleaseReadyAtMs = 0),
      (n.initialBatchCatchupStarted = !1),
      (n.initialBatchCatchupStartedAtMs = 0),
      (n.initialBatchCatchupReason = ""),
      (n.initialBatchCatchupStartMediaTime = null),
      (n.initialBatchCatchupSegmentsQueued = 0),
      (n.initialBatchCatchupFirstReady = !1),
      (n.initialBatchCatchupFirstReadyAtMs = 0),
      (n.initialBatchCatchupReadySegmentId = null),
      (n.initialBatchCatchupLastDeferredSignature = ""),
      (n.initialBatchCatchupFastLlmClaimKey = ""),
      (n.initialBatchCatchupFastLlmClaimedAtMs = 0),
      void (n.initialRealtimeBridgeClosedAtMs = 0)
    );
  const a = rP(e),
    r = Op(n.readySubtitleRanges),
    i = $p(
      [
        ...r,
        ...(r.length ? Op(n.startupProcessedAudioRanges) : []),
        ...ou({ readyOnly: !0 }),
      ],
      1,
    ),
    o = null === a ? null : Hp(a, i, Vl),
    s = o ? Op(n.startupFinalSttAudioRanges) : [],
    l = $p([...i, ...s], 1),
    c = null !== a && o ? Hp(a, l, Vl) : null,
    d = rP(c?.end),
    u = rP(o?.end),
    m = null !== a && null !== d ? Math.max(0, d - a) : 0,
    g = null !== a && null !== u ? Math.max(0, u - a) : 0,
    p = Boolean(null !== d && null !== u && d > u + Qr),
    f = p ? Ep() : 0,
    h = Boolean(!p || g >= f),
    S = {
      current: aP(a),
      mode: n.mode,
      reason: o
        ? h
          ? p
            ? "final-stt-runway-ready"
            : "delivered-subtitle-runway-ready"
          : "pending-final-translation-reserve-short"
        : "delivered-subtitle-runway-missing",
      range: c ? { start: aP(c.start), end: aP(c.end) } : null,
      leadSeconds: aP(m),
      readyOnlyLeadSeconds: aP(g),
      pendingTranslationReserveSeconds: aP(f),
      usedPendingFinalStt: p,
      rangeCount: l.length,
    },
    M = rP(n.startupReadyFrontierMediaTime);
  if (null !== d && (null === M || d > M + 0.1)) {
    const e = rP(n.startupReadyFrontierAtMs) || 0;
    if (e > 0 && null !== M) {
      const a = Math.max(0, t - e);
      a > 0 &&
        (n.startupReadyIntervalSamplesMs.push(a),
        n.startupReadyIntervalSamplesMs.length > $l &&
          (n.startupReadyIntervalSamplesMs =
            n.startupReadyIntervalSamplesMs.slice(-12)));
    }
    ((n.startupReadyFrontierMediaTime = d), (n.startupReadyFrontierAtMs = t));
  }
  const v = (
      Array.isArray(n.startupReadyIntervalSamplesMs)
        ? n.startupReadyIntervalSamplesMs
        : []
    )
      .map(rP)
      .filter((e) => null !== e && e > 0)
      .sort((e, t) => e - t),
    y = v.length
      ? v[Math.min(v.length - 1, Math.max(0, Math.ceil(0.9 * v.length) - 1))]
      : 0,
    b = !0 === n.seekRealtimeBridge ? 4 : 7,
    T = !0 === n.seekRealtimeBridge ? 7 : Ol,
    w = dP(Math.max(b, y / 1e3 + 2), b, T);
  ((n.startupReleaseLeadSeconds = aP(w)),
    (n.startupReleaseReadyLeadSeconds = aP(m)),
    (n.startupReleaseReadyOnlyLeadSeconds = aP(g)),
    (n.startupReleasePendingTranslationReserveSeconds = aP(f)),
    (n.startupReleaseUsedPendingFinalStt = p),
    (n.startupReleaseReadyRanges = l),
    (n.startupReleaseReadyDecision = S));
  const k = Boolean(c && m + Jr >= w && h);
  ((n.startupReleaseReadyCurrent = k),
    k &&
      ((n.startupReleaseReady = !0),
      (n.startupReleaseReadyAtMs = n.startupReleaseReadyAtMs || t),
      zu("startup-release-ready", t)));
}
function Dp(e = "mse-audio", t = null) {
  const n = gc.mseStartupBoost || (gc.mseStartupBoost = Dy()),
    a = gc.mseAudio || {},
    r = Date.now(),
    i = rP(t) ?? Fk(r) ?? zA(r),
    o = rP(a.lastAcceptedMediaEndTime ?? a.lastBufferedEnd),
    s =
      null !== i && null !== o
        ? Math.max(0, o - i)
        : Math.max(0, rP(a.lastLeadSeconds) || 0),
    l = kp() / 1e3,
    c = Math.max(0, s - l),
    d = Ip(i),
    u = qy(n.targetReadySeconds),
    m = Math.max(0, u - d),
    g = Cp();
  return (
    (n.usableMseLeadSeconds = aP(c) || 0),
    (n.readySubtitleLeadSeconds = aP(d) || 0),
    (n.recommendedStartupWaitSeconds = aP(m)),
    (n.releaseRequiredLeadSeconds = g),
    Pp(i, r),
    r - (n.lastStatusAtMs || 0) >= ql &&
      ((n.lastStatusAtMs = r),
      Nx(
        "mse.audio_buffer.readiness",
        {
          reason: e,
          mode: n.mode || Rl,
          activeBoost: Boolean(n.active && !n.switched),
          rawLeadSeconds: aP(s),
          usableLeadSeconds: n.usableMseLeadSeconds,
          readySubtitleLeadSeconds: n.readySubtitleLeadSeconds,
          readySubtitleRanges: Wp(n.readySubtitleRanges),
          targetReadySeconds: u,
          recommendedStartupWaitSeconds: n.recommendedStartupWaitSeconds,
          releaseRequiredLeadSeconds: g,
          startupReleaseLeadSeconds: n.startupReleaseLeadSeconds,
          startupReleaseReadyLeadSeconds: n.startupReleaseReadyLeadSeconds,
          startupReleaseReadyOnlyLeadSeconds:
            n.startupReleaseReadyOnlyLeadSeconds,
          startupReleasePendingTranslationReserveSeconds:
            n.startupReleasePendingTranslationReserveSeconds,
          startupReleaseUsedPendingFinalStt: Boolean(
            n.startupReleaseUsedPendingFinalStt,
          ),
          startupReleaseReadyRanges: Wp(n.startupReleaseReadyRanges),
          startupProcessedAudioRanges: Wp(n.startupProcessedAudioRanges),
          startupFinalSttAudioRanges: Wp(n.startupFinalSttAudioRanges),
          startupReleaseReadyDecision: n.startupReleaseReadyDecision || null,
          startupReleaseReady: Boolean(n.startupReleaseReady),
          startupReleaseReadyCurrent: Boolean(n.startupReleaseReadyCurrent),
          startupReleaseReadyAtMs: rP(n.startupReleaseReadyAtMs) || 0,
          initialBatchCatchupStarted: Boolean(n.initialBatchCatchupStarted),
          initialBatchCatchupStartedAtMs:
            rP(n.initialBatchCatchupStartedAtMs) || 0,
          initialBatchCatchupStartMediaTime: rP(
            n.initialBatchCatchupStartMediaTime,
          ),
          initialBatchCatchupSegmentsQueued: Math.max(
            0,
            Number(n.initialBatchCatchupSegmentsQueued) || 0,
          ),
          initialBatchCatchupFirstReady: Boolean(
            n.initialBatchCatchupFirstReady,
          ),
          initialBatchCatchupFirstReadyAtMs:
            rP(n.initialBatchCatchupFirstReadyAtMs) || 0,
          startupReadyIntervalSamplesMs: n.startupReadyIntervalSamplesMs
            .slice(-4)
            .map(Math.round),
          processingReserveMs: kp(),
          playbackTime: i,
          mediaEnd: o,
        },
        { source: "offscreen" },
      )),
    Qp(e, i),
    kw(e, i),
    {
      rawLeadSeconds: s,
      usableLeadSeconds: n.usableMseLeadSeconds,
      readySubtitleLeadSeconds: n.readySubtitleLeadSeconds,
      readySubtitleRanges: Wp(n.readySubtitleRanges),
      readySubtitleLeadDecision: n.readySubtitleLeadDecision || null,
      playbackTime: i,
      targetReadySeconds: u,
      recommendedStartupWaitSeconds: n.recommendedStartupWaitSeconds,
      releaseRequiredLeadSeconds: g,
      startupReleaseLeadSeconds: n.startupReleaseLeadSeconds,
      startupReleaseReadyLeadSeconds: n.startupReleaseReadyLeadSeconds,
      startupReleaseReadyOnlyLeadSeconds: n.startupReleaseReadyOnlyLeadSeconds,
      startupReleasePendingTranslationReserveSeconds:
        n.startupReleasePendingTranslationReserveSeconds,
      startupReleaseUsedPendingFinalStt: Boolean(
        n.startupReleaseUsedPendingFinalStt,
      ),
      startupReleaseReadyRanges: Wp(n.startupReleaseReadyRanges),
      startupProcessedAudioRanges: Wp(n.startupProcessedAudioRanges),
      startupFinalSttAudioRanges: Wp(n.startupFinalSttAudioRanges),
      startupReleaseReadyDecision: n.startupReleaseReadyDecision || null,
      startupReleaseReady: Boolean(n.startupReleaseReady),
      startupReleaseReadyCurrent: Boolean(n.startupReleaseReadyCurrent),
      startupReleaseReadyAtMs: rP(n.startupReleaseReadyAtMs) || 0,
      initialBatchCatchupStarted: Boolean(n.initialBatchCatchupStarted),
      initialBatchCatchupStartedAtMs: rP(n.initialBatchCatchupStartedAtMs) || 0,
      initialBatchCatchupStartMediaTime: rP(
        n.initialBatchCatchupStartMediaTime,
      ),
      initialBatchCatchupSegmentsQueued: Math.max(
        0,
        Number(n.initialBatchCatchupSegmentsQueued) || 0,
      ),
      initialBatchCatchupFirstReady: Boolean(n.initialBatchCatchupFirstReady),
      initialBatchCatchupFirstReadyAtMs:
        rP(n.initialBatchCatchupFirstReadyAtMs) || 0,
    }
  );
}
function Ip(e = null) {
  const t = gc.mseStartupBoost || {},
    n = e ?? zA(Date.now());
  if (null === n)
    return (
      (t.readySubtitleLeadDecision = {
        current: null,
        mode: t.mode || "",
        reason: "no-playback-time",
      }),
      0
    );
  const a = Bu(n),
    r = ou({ readyOnly: !0 }),
    i = r.find((e) => e.start <= n + Jr && e.end >= n - Jr) || null;
  return (
    (t.readySubtitleLeadDecision = {
      current: aP(n),
      mode: t.mode || "",
      reason: i ? "coverage-ledger-ready" : "coverage-ledger-not-ready",
      range: i ? { start: aP(i.start), end: aP(i.end) } : null,
      leadSeconds: aP(a),
      rangeCount: r.length,
    }),
    a
  );
}
function Lp(e = null) {
  gc.mseStartupBoost;
  const t = Date.now(),
    n = e ?? Nk(t) ?? zA(t);
  return null === n ? 0 : Bu(n);
}
function _p(e = null) {
  const t = sP([e?.rawLeadSeconds, e?.mseStartupReadiness?.rawLeadSeconds]),
    n = rP(
      gc.mseAudio?.lastAcceptedMediaEndTime ?? gc.mseAudio?.lastBufferedEnd,
    );
  if (null !== t && null !== n) return Math.max(0, n - t);
  const a = Date.now(),
    r = Fk(a);
  if (null !== r) return r;
  const i = zA(a);
  return null !== i ? i : sP([e?.sourceMediaTime, e?.msePlaybackMediaTime]);
}
function Bp(e = null, t = null, n = "batch-subtitle-ready", a = Date.now()) {
  const r = gc.mseStartupBoost || {};
  if (!$u() || !0 === r.initialBatchCatchupFirstReady || !zp(e)) return !1;
  const i = LP(e?.sttProvider);
  if (!QP(i)) return !1;
  const o = _p(e),
    s = sP([t?.end, UC(e)]),
    l = null !== o && null !== s ? Math.max(0, s - o) : 0,
    c = null === o ? 0 : Lp(o),
    d = wD(n) || "batch-subtitle-ready";
  let u = "";
  if (
    ("llm-final-translation-delivered" === d ||
    "ready-timeline-already-covered" === d
      ? l + Jr < 7
        ? (u = "batch-translation-lead-short")
        : c + Jr < 7 && (u = "continuous-ready-lead-short")
      : (u = "batch-translation-not-delivered"),
    u)
  ) {
    const n = [u, e?.sttSegmentId ?? "", aP(o), aP(s), aP(l), aP(c)].join(":");
    return (
      r.initialBatchCatchupLastDeferredSignature !== n &&
        ((r.initialBatchCatchupLastDeferredSignature = n),
        Nx(
          "mse.startup_boost.batch_catchup_deferred",
          {
            reason: u,
            deliveryReason: d,
            segmentId: e?.sttSegmentId ?? null,
            playbackTime: aP(o),
            mediaStartTime: aP(t?.start ?? BC(e)),
            mediaEndTime: aP(s),
            batchReadyLeadSeconds: aP(l),
            continuousReadyLeadSeconds: aP(c),
            requiredReadyLeadSeconds: 7,
            sttProvider: i,
          },
          { source: "offscreen", provider: i, level: "warn" },
        )),
      !1
    );
  }
  ((r.initialBatchCatchupFirstReady = !0),
    (r.initialBatchCatchupFirstReadyAtMs = a),
    (r.initialBatchCatchupReadySegmentId = e?.sttSegmentId ?? null),
    (r.initialBatchCatchupLastDeferredSignature = ""));
  try {
    MP({ endStream: !0 });
  } catch {}
  Td("mse-batch-catchup-ready");
  try {
    gc.websocket?.close?.();
  } catch {}
  return (
    (gc.websocket = null),
    (gc.activeSttProvider = i),
    (r.initialRealtimeBridgeClosedAtMs = a),
    Nx(
      "mse.startup_boost.batch_catchup_ready",
      {
        reason: d,
        segmentId: r.initialBatchCatchupReadySegmentId,
        mediaStartTime: aP(t?.start ?? BC(e)),
        mediaEndTime: aP(t?.end ?? UC(e)),
        sttProvider: i,
        playbackTime: aP(o),
        batchReadyLeadSeconds: aP(l),
        continuousReadyLeadSeconds: aP(c),
        requiredReadyLeadSeconds: 7,
        queuedCatchupSegments: Math.max(
          0,
          Number(r.initialBatchCatchupSegmentsQueued) || 0,
        ),
        startupReleaseReadyAtMs: rP(r.startupReleaseReadyAtMs) || 0,
        catchupStartedAtMs: rP(r.initialBatchCatchupStartedAtMs) || 0,
      },
      { source: "offscreen", provider: i },
    ),
    Ju(a),
    !0
  );
}
function Up(e = [], t = null, n = "translation-ready") {
  if (!zm()) return null;
  const a = gc.mseStartupBoost || (gc.mseStartupBoost = Dy()),
    r = BC(t),
    i = UC(t),
    o = Array.isArray(t?.mseCoverageClaimIds) ? t.mseCoverageClaimIds : [],
    s = Eu(o),
    l = (Array.isArray(e) ? e : [])
      .map((e) => {
        const t = sP([
            e?.audioStartMediaTime,
            e?.displayAfterMediaTime,
            e?.mediaTime,
          ]),
          n = sP([
            e?.mediaTimeEnd,
            e?.audioEndMediaTime,
            e?.mediaTime,
            e?.displayAfterMediaTime,
          ]);
        return null === t || null === n || n <= t
          ? null
          : { start: Math.max(0, t), end: Math.max(0, n) };
      })
      .filter(Boolean),
    c =
      s.length && l.length
        ? l.flatMap((e) =>
            s
              .map((t) => ({
                start: Math.max(e.start, t.start),
                end: Math.min(e.end, t.end),
              }))
              .filter((e) => e.end > e.start),
          )
        : l.length
          ? l
          : s;
  if (
    (!c.length &&
      null !== r &&
      null !== i &&
      i > r &&
      c.push({ start: Math.max(0, r), end: Math.max(0, i) }),
    !c.length)
  )
    return null;
  const d = Math.min(...c.map((e) => e.start)),
    u = Math.max(...c.map((e) => e.end));
  let m = d,
    g = u;
  for (const e of c)
    a.readySubtitleRanges = Fp(a.readySubtitleRanges, e.start, e.end);
  if (
    ((a.readySubtitleEndMediaTime = Math.max(
      rP(a.readySubtitleEndMediaTime) || 0,
      u,
    )),
    o.length)
  ) {
    const e = wu(t?.mseTranslationPieces);
    let a = !1;
    for (const [r, i] of Object.entries(e.completedSpeechRetryCounts))
      ((a = !0),
        Cu([r], { segmentId: t?.sttSegmentId ?? null, outcome: n, count: i }));
    if (
      (!e.resolvedPieces &&
        t?.msePartialSpeechRetry &&
        ((a = !0), Cu(o, { segmentId: t?.sttSegmentId ?? null, outcome: n })),
      Pu(o, "subtitle-ready", {
        outcome: n,
        segmentId: t?.sttSegmentId ?? null,
        speechRetryCompletion: a,
      }),
      !Ru(o))
    ) {
      const r = Dp("translation-pieces-pending", _p(t));
      return (
        Nx(
          "mse.audio_buffer.subtitle_ready_deferred",
          {
            reason: n,
            claimIds: o,
            speechRetryCompletion: a,
            resolvedTranslationPieces: e.resolvedPieces,
            completedPrimaryClaimIds: e.completedPrimaryClaimIds,
            readySubtitleLeadSeconds: r.readySubtitleLeadSeconds,
            readinessPlaybackTime: aP(r.playbackTime),
          },
          { source: "offscreen", level: "warn" },
        ),
        r
      );
    }
    const r = xu(o);
    r && ((m = Math.min(m, r.start)), (g = Math.max(g, r.end)));
  } else Lu(m, g, "subtitle-ready", { outcome: n });
  let p = Bp(t, { start: m, end: g }, n);
  const f = Rp(t);
  let h = Dp(n, _p(t));
  return (
    p ||
      ((p = Bp(t, { start: m, end: g }, n)),
      p && (h = Dp(`${n}-batch-handoff-ready`, _p(t)))),
    Nx(
      "mse.audio_buffer.subtitle_ready",
      {
        reason: n,
        mode: a.mode || Rl,
        readySubtitleStartMediaTime: aP(m),
        readySubtitleEndMediaTime: a.readySubtitleEndMediaTime,
        deliveredSubtitleRanges: c.map((e) => ({
          start: aP(e.start),
          end: aP(e.end),
        })),
        realtimeProcessedAudioRanges: f.map((e) => ({
          start: aP(e.start),
          end: aP(e.end),
        })),
        startupProcessedAudioRanges: Wp(a.startupProcessedAudioRanges),
        readySubtitleRanges: Wp(a.readySubtitleRanges),
        readySubtitleLeadSeconds: h.readySubtitleLeadSeconds,
        readySubtitleLeadDecision: a.readySubtitleLeadDecision || null,
        readinessPlaybackTime: aP(h.playbackTime),
        targetReadySeconds: h.targetReadySeconds,
        releaseRequiredLeadSeconds: h.releaseRequiredLeadSeconds,
        startupReleaseLeadSeconds: h.startupReleaseLeadSeconds,
        startupReleaseReadyLeadSeconds: h.startupReleaseReadyLeadSeconds,
        startupReleaseReadyRanges: Wp(h.startupReleaseReadyRanges),
        startupReleaseReadyDecision: h.startupReleaseReadyDecision || null,
        startupReleaseReady: Boolean(h.startupReleaseReady),
        initialBatchCatchupStarted: Boolean(a.initialBatchCatchupStarted),
        initialBatchCatchupFirstReady: Boolean(a.initialBatchCatchupFirstReady),
        initialBatchCatchupReady: p,
        segmentCount: Array.isArray(e) ? e.length : 0,
      },
      { source: "offscreen" },
    ),
    h
  );
}
function qp(e = [], t = null, n = "translation-delivered") {
  try {
    return Up(e, t, n);
  } catch (a) {
    return (
      Nx(
        "mse.coverage.delivery_commit_error",
        {
          reason: n,
          error: a?.message || String(a),
          mediaStartTime: aP(BC(t)),
          mediaEndTime: aP(UC(t)),
          segmentCount: Array.isArray(e) ? e.length : 0,
        },
        { source: "offscreen", level: "error" },
      ),
      null
    );
  }
}
function Fp(e = [], t, n) {
  const a = rP(t),
    r = rP(n);
  if (null === a || null === r || r < a)
    return Array.isArray(e) ? e.slice(-80) : [];
  const i = [...(Array.isArray(e) ? e : []), { start: a, end: r }]
      .filter((e) => null !== rP(e?.start) && null !== rP(e?.end))
      .map((e) => ({ start: rP(e.start), end: rP(e.end) }))
      .sort((e, t) => e.start - t.start),
    o = [];
  for (const e of i) {
    const t = o[o.length - 1];
    !t || e.start > t.end + 1
      ? o.push({ start: e.start, end: e.end })
      : (t.end = Math.max(t.end, e.end));
  }
  return o.slice(-80);
}
function Op(e = []) {
  return (Array.isArray(e) ? e : [])
    .map((e) => ({ start: rP(e?.start), end: rP(e?.end) }))
    .filter((e) => null !== e.start && null !== e.end && e.end >= e.start)
    .sort((e, t) => e.start - t.start);
}
function Np(e, t = []) {
  const n = rP(e);
  return (
    (null !== n &&
      Array.isArray(t) &&
      Op(t).find((e) => e.end >= n - 1 && e.start <= n + Vl)) ||
    null
  );
}
function Hp(e, t = [], n = 2.5) {
  const a = rP(e),
    r = Math.max(0, rP(n) ?? Vl);
  if (null === a || !Array.isArray(t)) return null;
  const i = Op(t),
    o = i.findIndex((e) => e.end >= a - 1 && e.start <= a + r);
  if (o < 0) return null;
  const s = { ...i[o] };
  for (let e = o + 1; e < i.length; e += 1) {
    const t = i[e];
    if (t.start > s.end + 1) break;
    s.end = Math.max(s.end, t.end);
  }
  return s;
}
function Gp(e, t = [], n = null) {
  const a = rP(e),
    r = rP(n);
  if (null === a || null === r || !Array.isArray(t)) return null;
  const i = Op(t).filter((e) => e.end >= a && e.start - a <= r);
  return i.length ? i.reduce((e, t) => (t.end > e.end ? t : e), i[0]) : null;
}
function Wp(e = []) {
  return (Array.isArray(e) ? e : [])
    .slice(-8)
    .map((e) => ({ start: aP(e.start), end: aP(e.end) }));
}
function $p(e = [], t = 0) {
  const n = (Array.isArray(e) ? e : [])
      .map((e) => ({ start: rP(e?.start), end: rP(e?.end) }))
      .filter((e) => null !== e.start && null !== e.end && e.end >= e.start)
      .sort((e, t) => e.start - t.start),
    a = [];
  for (const e of n) {
    const n = a[a.length - 1];
    n && e.start <= n.end + t
      ? (n.end = Math.max(n.end, e.end))
      : a.push({ start: e.start, end: e.end });
  }
  return a;
}
function Vp() {
  const e = gc.mseAudio || {},
    t = [];
  for (const n of [
    "scheduledRanges",
    "fastCoveredRanges",
    "cacheCoveredRanges",
  ])
    for (const a of Array.isArray(e[n]) ? e[n] : []) t.push(a);
  return $p(t)
    .slice(-16)
    .map((e) => ({ start: aP(e.start), end: aP(e.end) }));
}
function jp() {
  return (Array.isArray(gc.mseCoverageHoles) ? gc.mseCoverageHoles : [])
    .map((e) => {
      if (!e || e.backfilled) return null;
      const t = Math.max(
          rP(e.start) ?? 0,
          rP(e.backfillCursor) ?? rP(e.start) ?? 0,
        ),
        n = rP(e.end);
      return null === n || n <= t ? null : { start: aP(t), end: aP(n) };
    })
    .filter(Boolean)
    .slice(-16)
    .map((e) => ({ start: e.start, end: e.end }));
}
function Kp(e = {}, t = null) {
  if (!t) return e;
  const n = {
    mode: Fy(t.mode || gc.mseStartupBoost?.mode),
    rawLeadSeconds: rP(t.rawLeadSeconds) || 0,
    usableLeadSeconds: rP(t.usableLeadSeconds) || 0,
    readySubtitleLeadSeconds: rP(t.readySubtitleLeadSeconds) || 0,
    readySubtitleRanges: Wp(t.readySubtitleRanges),
    audioCoverageRanges: Vp(),
    knownHoles: jp(),
    readySubtitleLeadDecision: t.readySubtitleLeadDecision || null,
    targetReadySeconds: rP(t.targetReadySeconds) || 0,
    recommendedStartupWaitSeconds: rP(t.recommendedStartupWaitSeconds) || 0,
    releaseRequiredLeadSeconds: rP(t.releaseRequiredLeadSeconds) || Cp(),
    startupReleaseLeadSeconds: rP(t.startupReleaseLeadSeconds) || 7,
    startupReleaseReadyLeadSeconds: rP(t.startupReleaseReadyLeadSeconds) || 0,
    startupReleaseReadyOnlyLeadSeconds:
      rP(t.startupReleaseReadyOnlyLeadSeconds) || 0,
    startupReleasePendingTranslationReserveSeconds:
      rP(t.startupReleasePendingTranslationReserveSeconds) || 0,
    startupReleaseUsedPendingFinalStt:
      !0 === t.startupReleaseUsedPendingFinalStt,
    startupReleaseReadyRanges: Wp(t.startupReleaseReadyRanges),
    startupProcessedAudioRanges: Wp(t.startupProcessedAudioRanges),
    startupFinalSttAudioRanges: Wp(t.startupFinalSttAudioRanges),
    startupReleaseReadyDecision: t.startupReleaseReadyDecision || null,
    startupReleaseReady: !0 === t.startupReleaseReady,
    startupReleaseReadyCurrent: !0 === t.startupReleaseReadyCurrent,
    startupReleaseReadyAtMs: rP(t.startupReleaseReadyAtMs) || 0,
    seekRealtimeBridge: !0 === t.seekRealtimeBridge,
    initialBatchCatchupStarted: !0 === t.initialBatchCatchupStarted,
    initialBatchCatchupStartedAtMs: rP(t.initialBatchCatchupStartedAtMs) || 0,
    initialBatchCatchupStartMediaTime: rP(t.initialBatchCatchupStartMediaTime),
    initialBatchCatchupSegmentsQueued: Math.max(
      0,
      Number(t.initialBatchCatchupSegmentsQueued) || 0,
    ),
    initialBatchCatchupFirstReady: !0 === t.initialBatchCatchupFirstReady,
    initialBatchCatchupFirstReadyAtMs:
      rP(t.initialBatchCatchupFirstReadyAtMs) || 0,
  };
  return {
    ...(e || {}),
    rawLeadSeconds: n.rawLeadSeconds,
    usableLeadSeconds: n.usableLeadSeconds,
    readySubtitleLeadSeconds: n.readySubtitleLeadSeconds,
    requiredLeadSeconds: n.releaseRequiredLeadSeconds,
    mseStartupReadiness: n,
  };
}
function zp(e = null) {
  return (
    !!e &&
    ("mse-audio-buffer" === e.sourceType ||
      ("tab-capture" !== e.sourceType &&
        "tab-capture" !== e.audioInputMode &&
        ("mse-audio-buffer" === e.audioInputMode ||
          ("source-media-range" === e.timingSource &&
            e.sttProvider &&
            JP(e.sttProvider)))))
  );
}
function Qp(e = "ready", t = null) {
  const n = gc.mseStartupBoost || {};
  if (!n.enabled || !n.active || n.switched) return !1;
  if (
    n.mode === Rl &&
    !0 !== n.batchOnlyAfterSeek &&
    !0 !== n.initialBatchCatchupFirstReady
  )
    return !1;
  const a = rP(t) ?? Nk(Date.now()),
    r =
      n.mode === xl || n.mode === El
        ? Lp(a)
        : rP(n.readySubtitleLeadSeconds) || 0,
    i = qy(n.targetReadySeconds),
    o = Jp();
  if (r < o) return !1;
  if (!n.initialRealtimeBridgeClosedAtMs) {
    try {
      MP({ endStream: !0 });
    } catch {}
    Td("mse-startup-boost-switched");
    try {
      gc.websocket?.close?.();
    } catch {}
  }
  ((gc.websocket = null),
    (gc.activeSttProvider = pg()),
    (n.active = !1),
    (n.switched = !0),
    (n.switchedAtMs = Date.now()),
    Nx(
      "mse.startup_boost.switched",
      {
        reason: e,
        readySubtitleLeadSeconds: r,
        targetReadySeconds: o,
        configuredTargetReadySeconds: i,
        standardSttProvider: n.standardSttProvider,
        standardProvider: n.standardProvider,
        fastSttProvider: n.fastSttProvider,
        fastProvider: n.fastProvider,
        initialBatchCatchupStartedAtMs:
          rP(n.initialBatchCatchupStartedAtMs) || 0,
        initialBatchCatchupFirstReadyAtMs:
          rP(n.initialBatchCatchupFirstReadyAtMs) || 0,
        initialBatchCatchupReadySegmentId:
          n.initialBatchCatchupReadySegmentId ?? null,
        initialBatchCatchupFastLlmClaimKey:
          n.initialBatchCatchupFastLlmClaimKey || "",
        initialBatchCatchupFastLlmClaimedAtMs:
          rP(n.initialBatchCatchupFastLlmClaimedAtMs) || 0,
        mode: n.mode || Rl,
      },
      { source: "offscreen" },
    ));
  const s =
    n.mode === xl || n.mode === El ? "第一批字幕已完成" : "已切回標準模式";
  return (
    vP("mse-audio-buffer", `MSE 字幕緩衝 ${r.toFixed(1)}s，${s}`),
    Ju(Date.now()),
    !0
  );
}
function Jp() {
  const e = gc.mseStartupBoost || {},
    t = qy(e.targetReadySeconds);
  if (e.mode === Rl && !0 === e.initialBatchCatchupFirstReady) return 7;
  const n = LP(e.standardSttProvider || gc.config?.sttProvider),
    a = e.mode === Rl && !0 !== e.batchOnlyAfterSeek && n === ee ? Al : t;
  return dP(Math.max(a, Cp()), Cl, Al);
}
function Xp(e = gc.sourceMediaTiming) {
  if (!e?.isLiveStream) return !1;
  const t = gc.config || {};
  return Boolean(
    t.syncEnabled || t.mirrorDelayEnabled || t.nativeStreamDelayEnabled,
  );
}
function Zp() {
  return Boolean(gc.sourcePauseDebounceTimer && Xp());
}
function Yp(e = "source-media-paused") {
  ef();
  const t = gc.sessionId || "";
  ((gc.sourcePauseDebounceStartedAtMs = Date.now()),
    (gc.sourcePauseDebounceSessionId = t),
    (gc.sourcePauseDebounceTimer = setTimeout(() => {
      gc.sourcePauseDebounceTimer = null;
      const n = !t || gc.sessionId === t,
        a = gc.sourceMediaTiming;
      if (!n || gc.isStopping || !a?.paused || a.adPlaying || of())
        return (
          (gc.sourcePauseDebounceStartedAtMs = 0),
          void (gc.sourcePauseDebounceSessionId = "")
        );
      ((gc.sourcePauseDebounceStartedAtMs = 0),
        (gc.sourcePauseDebounceSessionId = ""),
        lf(e));
    }, nc)));
}
function ef() {
  (gc.sourcePauseDebounceTimer &&
    (clearTimeout(gc.sourcePauseDebounceTimer),
    (gc.sourcePauseDebounceTimer = null)),
    (gc.sourcePauseDebounceStartedAtMs = 0),
    (gc.sourcePauseDebounceSessionId = ""));
}
function tf() {
  if (!gc.config || gc.isStopping) return !1;
  if (gc.sourceEndedGuardActive) return !0;
  if (nf(gc.sourceMediaTiming)) return !0;
  if (of()) return !1;
  const e = Boolean(
      gc.sourceMediaTiming?.paused &&
        !1 !== gc.sourceMediaTiming?.pauseAffectsStt &&
        !gc.sourceMediaTiming?.adPlaying &&
        !Zp(),
    ),
    t =
      rf() &&
      Boolean(gc.viewerMediaTiming?.paused && !gc.viewerMediaTiming?.adPlaying);
  return e || t;
}
function nf(e = null) {
  if (!gc.config?.hybridSubtitleCacheMode) return !1;
  if (!0 !== gc.config.cachedSubtitleCoverageReliable) return !1;
  if (!e || e.adPlaying || e.isLiveStream) return !1;
  const t = rP(e.currentTime);
  return null !== t && af(t);
}
function af(e) {
  const t = rP(e);
  if (null === t) return !1;
  const n = Array.isArray(gc.config?.cachedSubtitleCoverageRanges)
    ? gc.config.cachedSubtitleCoverageRanges
    : [];
  if (!n.length) return !1;
  const a = 1e3 * t;
  return n.some((e) => {
    const t = rP(e.startMs ?? e.start_ms),
      n = rP(e.endMs ?? e.end_ms);
    return (
      null !== t &&
      null !== n &&
      n > t &&
      fp(e, t, n) &&
      a >= t - 500 &&
      a <= n + 500
    );
  });
}
function rf() {
  const e = gc.config || {};
  return !(e.syncEnabled && !e.singleTabMediaSync);
}
function of(e = Date.now()) {
  const t = rP(gc.sourceMediaTiming?.pauseContinuationUntilMs),
    n = rP(gc.viewerMediaTiming?.pauseContinuationUntilMs);
  return Math.max(t || 0, n || 0) > e;
}
function sf(e = Date.now()) {
  const t = rP(gc.sourceMediaTiming?.pauseContinuationUntilMs),
    n = rP(gc.viewerMediaTiming?.pauseContinuationUntilMs),
    a = Math.max(t || 0, n || 0);
  return Math.max(0, a - e);
}
function lf(e = "media-paused") {
  const t = e || "media-paused";
  gc.mediaPlaybackPausedForStt ||
    ((gc.mediaPlaybackPausedForStt = !0),
    (gc.mediaPlaybackPausedReason = t),
    df(t),
    Nx(
      "capture.stt_paused",
      {
        reason: t,
        sourcePaused: Boolean(gc.sourceMediaTiming?.paused),
        viewerPaused: Boolean(gc.viewerMediaTiming?.paused),
        pauseContinuationRemainingMs: Math.round(sf()),
        totalAudioMs: Math.round(gc.totalAudioMs || 0),
        sttBillableAudioMs: Math.round(gc.sttBillableAudioMs || 0),
        pendingBatchAudioMs: Math.round(sy().durationMs || 0),
        queuedBatchSegments: sy().queue.length,
      },
      { source: "offscreen" },
    ),
    vP(
      "paused",
      "hybrid-cache-covered" === t
        ? "快取字幕覆蓋中，STT 已暫停計費"
        : "影片暫停，STT 已暫停計費",
    ));
}
function cf() {
  if (!gc.mediaPlaybackPausedForStt) return;
  const e = gc.mediaPlaybackPausedReason || "media-paused";
  ((gc.mediaPlaybackPausedForStt = !1),
    (gc.mediaPlaybackPausedReason = ""),
    (gc.vad = Ry()),
    Nx(
      "capture.stt_resumed",
      {
        previousReason: e,
        totalAudioMs: Math.round(gc.totalAudioMs || 0),
        sttBillableAudioMs: Math.round(gc.sttBillableAudioMs || 0),
      },
      { source: "offscreen" },
    ),
    vP("listening", "字幕中"));
}
function df(e = "media-paused") {
  if (QP()) sy().chunks.length && Xf({ force: !0, reason: e });
  else
    try {
      MP();
    } catch {}
}
function uf(e, t, n) {
  const a = ly(t, n);
  a && pf(e, a);
}
function mf(e, t, n) {
  const a = ly(t, n);
  a && bf(e, a);
}
function gf(e, t) {
  gc.activeSttProvider !== ne && gc.activeSttProvider !== ae
    ? gc.activeSttProvider !== se
      ? pf(e, t)
      : Pf(e, t)
    : bf(e, t);
}
function pf(e, t) {
  const n = Df(t),
    a = MD(n.samples);
  if (!a.byteLength) return;
  const r = {
    message_type: "input_audio_chunk",
    audio_base_64: TD(new Uint8Array(a.buffer)),
    commit: !1,
    sample_rate: Ge,
  };
  (e.__walletRealtime
    ? ad(e, new Uint8Array(a.buffer), n, 2)
    : e.send(JSON.stringify(r)),
    _f(n),
    gc.activeSttProvider === Z &&
      ((gc.lastRealtimeAudioSentAtMs = Date.now()), yf()));
}
function ff() {
  if (!Sg()) {
    const e = oP(
      gc.config?.effectiveSyncDelaySeconds ?? gc.config?.syncDelaySeconds,
    );
    return !0 === gc.config?.syncEnabled &&
      !0 !== gc.config?.singleTabMediaSync &&
      null !== e &&
      e <= 12
      ? wn
      : kn;
  }
  return !0 === gc.mseStartupBoost?.startupReleaseReady ? Tn : bn;
}
function hf(e, t) {
  const n = rP(e),
    a = rP(t);
  if (null === n || null === a || a <= n) return [];
  const r = [];
  for (const e of gc.sentAudioTimeline || []) {
    const t = rP(e?.sentStartMs),
      i = rP(e?.sentEndMs),
      o = rP(e?.sourceMediaStartTime),
      s = rP(e?.sourceMediaEndTime);
    if (null === t || null === i || null === o || null === s || i <= t || s < o)
      continue;
    const l = Math.max(n, t),
      c = Math.min(a, i);
    if (c <= l) continue;
    const d = i - t,
      u = s - o,
      m = dP((l - t) / d, 0, 1),
      g = dP((c - t) / d, 0, 1);
    r.push({ start: o + u * m, end: o + u * g });
  }
  return $p(r, Qr);
}
function Sf(e, t, n) {
  if (!Sg()) return [];
  const a = hf(e, t);
  return a.length
    ? (gc.pendingRealtimeCommitCoverageRanges.push({
        commitSequence: n,
        timelineRevision: gc.timelineRevision,
        sentStartMs: e,
        sentEndMs: t,
        mediaRanges: a,
        createdAtMs: Date.now(),
      }),
      (gc.pendingRealtimeCommitCoverageRanges =
        gc.pendingRealtimeCommitCoverageRanges.slice(-8)),
      Nx(
        "stt.realtime.commit_coverage_registered",
        {
          commitSequence: n,
          sentStartMs: Math.round(e),
          sentEndMs: Math.round(t),
          mediaRanges: a.map((e) => ({ start: aP(e.start), end: aP(e.end) })),
        },
        { source: "offscreen", provider: Z },
      ),
      a)
    : [];
}
function Mf() {
  const e = gc.timelineRevision;
  gc.pendingRealtimeCommitCoverageRanges = (
    gc.pendingRealtimeCommitCoverageRanges || []
  ).filter((t) => t?.timelineRevision === e);
  const t = gc.pendingRealtimeCommitCoverageRanges.findIndex(
    (t) => t?.timelineRevision === e,
  );
  if (t < 0) return [];
  const [n] = gc.pendingRealtimeCommitCoverageRanges.splice(t, 1),
    a = $p(n?.mediaRanges || [], Qr);
  return (
    a.length &&
      Nx(
        "stt.realtime.commit_coverage_consumed",
        {
          commitSequences: [n.commitSequence],
          remainingCommits: gc.pendingRealtimeCommitCoverageRanges.length,
          mediaRanges: a.map((e) => ({ start: aP(e.start), end: aP(e.end) })),
        },
        { source: "offscreen", provider: Z },
      ),
    a
  );
}
function vf() {
  const e = LP(gc.activeSttProvider);
  if (!By(e)) return [];
  const t = Math.max(0, rP(gc.lastRealtimeCoverageCommitAudioMs) || 0),
    n = Math.max(0, rP(gc.sttTimingAudioMs) || 0);
  if (n <= t) return [];
  const a = hf(t, n);
  return (
    (gc.lastRealtimeCommitAudioMs = n),
    (gc.lastRealtimeCoverageCommitAudioMs = n),
    (gc.realtimeCommitSequence += 1),
    a.length &&
      Nx(
        "stt.realtime.commit_coverage_consumed",
        {
          commitSequences: [gc.realtimeCommitSequence],
          sentStartMs: Math.round(t),
          sentEndMs: Math.round(n),
          mediaRanges: a.map((e) => ({ start: aP(e.start), end: aP(e.end) })),
        },
        { source: "offscreen", provider: e },
      ),
    a
  );
}
function yf(e = Date.now()) {
  const t = ff();
  if (gc.activeSttProvider !== Z) return !1;
  if (!gc.websocket || gc.websocket.readyState !== WebSocket.OPEN) return !1;
  const n = wD(gc.currentInterimText),
    a = Math.max(0, rP(gc.sttTimingAudioMs) || 0),
    r = Math.max(0, rP(gc.lastRealtimeCommitAudioMs) || 0);
  if (a - r < t) return !1;
  const i = rP(gc.realtimeCommitSentAtMs) || 0,
    o = i > 0 ? Math.max(0, e - i) : 0;
  if (gc.realtimeCommitPending && o < Cn) return !1;
  const s = Math.max(0, rP(gc.lastRealtimeCoverageCommitAudioMs) || 0);
  (MP(),
    (gc.lastRealtimeCommitAudioMs = a),
    (gc.lastRealtimeCoverageCommitAudioMs = a),
    (gc.realtimeCommitPending = !0),
    (gc.realtimeCommitSentAtMs = e),
    (gc.realtimeCommitSequence += 1),
    Sf(s, a, gc.realtimeCommitSequence));
  const l = Sg()
    ? "mse-fast-bridge"
    : "instant-overlay" === gc.config?.captionMode ||
        !0 !== gc.config?.syncEnabled
      ? "instant-overlay"
      : "viewer-sync";
  return (
    Nx(
      "stt.realtime.periodic_commit",
      {
        commitSequence: gc.realtimeCommitSequence,
        mode: l,
        targetAudioMs: t,
        sentAudioMs: Math.round(a),
        audioSinceLastCommitMs: Math.round(a - r),
        textChars: Array.from(n).length,
        replacedStalePendingCommit: i > 0 && o >= Cn,
      },
      { source: "offscreen", provider: Z },
    ),
    !0
  );
}
function bf(e, t) {
  const n = Df(t);
  if (!n.samples.byteLength) return;
  const a = Math.max(0, rP(gc.sttTimingAudioMs) || 0);
  (e.__walletRealtime
    ? ad(
        e,
        new Uint8Array(
          n.samples.buffer,
          n.samples.byteOffset,
          n.samples.byteLength,
        ),
        n,
        4,
      )
    : e.send(n.samples.buffer),
    _f(n),
    gc.activeSttProvider === ae &&
      kf(n, {
        sentStartMs: a,
        sentEndMs: Math.max(a, rP(gc.sttTimingAudioMs) || a),
      }),
    By(gc.activeSttProvider) && (gc.lastRealtimeAudioSentAtMs = Date.now()),
    Ef(e));
}
function Tf(e = {}, t = {}) {
  const n =
      e.samples instanceof Float32Array
        ? e.samples
        : new Float32Array(e.samples || []),
    a = e.rawCaptureSamples || e.captureSamples || n,
    r = (a instanceof Float32Array ? a : new Float32Array(a || [])).slice(),
    i = a === e.samples ? r : n.slice();
  return {
    ...e,
    samples: i,
    rawCaptureSamples: r,
    captureSamples: r,
    realtimeSentStartMs: rP(t.sentStartMs),
    realtimeSentEndMs: rP(t.sentEndMs),
    speechEngineARealtimeRecovery: !0,
    timelineRevision: gc.timelineRevision,
  };
}
function wf() {
  const e = (gc.speechEngineARealtimeRecoveryChunks || []).length;
  return (
    (gc.speechEngineARealtimeRecoveryChunks = []),
    (gc.speechEngineARealtimeRecoveryMs = 0),
    e
  );
}
function kf(e = {}, t = {}) {
  if (gc.activeSttProvider !== ae) return !1;
  const n = Tf(e, t),
    a = Math.max(0, rP(n.durationMs) || 0);
  if (!n.samples.length || a <= 0) return !1;
  const r =
      gc.speechEngineARealtimeRecoveryChunks ||
      (gc.speechEngineARealtimeRecoveryChunks = []),
    i = r[r.length - 1] || null,
    o = rP(i?.sourceMediaEndTime),
    s = rP(n.sourceMediaStartTime);
  if (null !== o && null !== s && Math.abs(s - o) > jo) {
    const e = wf();
    Nx(
      "stt.speechEngineA_realtime.recovery_timeline_reset",
      {
        previousEndMediaTime: aP(o),
        nextStartMediaTime: aP(s),
        gapSeconds: aP(s - o),
        droppedChunks: e,
      },
      { source: "offscreen", level: "warn", provider: ae },
    );
  }
  const l =
    gc.speechEngineARealtimeRecoveryChunks ||
    (gc.speechEngineARealtimeRecoveryChunks = []);
  for (
    l.push(n),
      gc.speechEngineARealtimeRecoveryMs =
        Math.max(0, rP(gc.speechEngineARealtimeRecoveryMs) || 0) + a;
    l.length && gc.speechEngineARealtimeRecoveryMs > Vo;

  ) {
    const e = l.shift();
    gc.speechEngineARealtimeRecoveryMs = Math.max(
      0,
      gc.speechEngineARealtimeRecoveryMs - Math.max(0, rP(e?.durationMs) || 0),
    );
  }
  return !0;
}
function Cf(e = null) {
  const t = gc.speechEngineARealtimeRecoveryChunks || [];
  if (!t.length || !e) return 0;
  const n = UC(e),
    a = sP([e.audioEndMs, e.audioStartMs]);
  if (null === n && null === a) return 0;
  const r = [];
  let i = 0;
  for (const e of t) {
    if (rP(e.timelineRevision) !== gc.timelineRevision) {
      i += 1;
      continue;
    }
    const t = rP(e.sourceMediaEndTime),
      o = rP(e.realtimeSentEndMs);
    (
      null !== n && null !== t
        ? t <= n + 0.05
        : null !== a && null !== o && o <= a + 50
    )
      ? (i += 1)
      : r.push(e);
  }
  return (
    (gc.speechEngineARealtimeRecoveryChunks = r),
    (gc.speechEngineARealtimeRecoveryMs = oy(r)),
    i
  );
}
function Af() {
  const e = (gc.speechEngineARealtimeRecoveryChunks || []).filter(
    (e) => rP(e.timelineRevision) === gc.timelineRevision,
  );
  return (
    (gc.speechEngineARealtimeRecoveryChunks = []),
    (gc.speechEngineARealtimeRecoveryMs = 0),
    e
  );
}
function Rf(e = [], t = "connection-lost") {
  const n = Array.isArray(e) ? e.filter(Boolean) : [],
    a = Math.round(oy(n)),
    r = sP(n.map((e) => rP(e.sourceMediaStartTime))),
    i = lP(n.map((e) => rP(e.sourceMediaEndTime)));
  if (!n.length || a <= 0)
    return {
      chunks: 0,
      durationMs: 0,
      segments: 0,
      mediaStartTime: r,
      mediaEndTime: i,
    };
  const o = sy(),
    s = o.nextSegmentId;
  for (const e of n)
    Bf({
      ...e,
      preparedForStt: !1,
      speechEngineARealtimeRecovery: !0,
      speechEngineARealtimeRecoveryReason: wD(t) || "connection-lost",
    });
  o.chunks.length &&
    Xf({
      force: !0,
      reason: "speechEngineA-realtime-recovery",
      preserveOverlap: !1,
    });
  const l = Math.max(0, o.nextSegmentId - s);
  return (
    Nx(
      "stt.speechEngineA_realtime.recovery_backfill_queued",
      {
        reason: wD(t) || "connection-lost",
        chunks: n.length,
        durationMs: a,
        segments: l,
        mediaStartTime: aP(r),
        mediaEndTime: aP(i),
      },
      { source: "offscreen", level: "warn", provider: ae },
    ),
    {
      chunks: n.length,
      durationMs: a,
      segments: l,
      mediaStartTime: r,
      mediaEndTime: i,
    }
  );
}
function xf(e = "connection-ready") {
  if (LP(gc.activeSttProvider) !== ae)
    return {
      chunks: 0,
      durationMs: 0,
      segments: 0,
      mediaStartTime: null,
      mediaEndTime: null,
    };
  const t = Rf(Af(), e);
  return (
    (gc.speechEngineARealtimeRecoveryActive = !1),
    t.chunks &&
      Nx(
        "stt.speechEngineA_realtime.buffered_audio_handoff",
        {
          reason: e,
          chunks: t.chunks,
          durationMs: t.durationMs,
          segments: t.segments,
          mediaStartTime: aP(t.mediaStartTime),
          mediaEndTime: aP(t.mediaEndTime),
        },
        { source: "offscreen", level: "warn", provider: ae },
      ),
    t
  );
}
function Ef(e, t = Date.now()) {
  if (gc.activeSttProvider !== ae) return !1;
  if (
    !e ||
    gc.websocket !== e ||
    "active" !== e.__speechEngineARealtimeRole ||
    !0 !== e.__liveSubtitleSessionReady ||
    gc.speechEngineARealtimeDrainingSocket
  )
    return !1;
  const n = rP(e.__speechEngineAReadyAtMs) || t,
    a = rP(gc.speechEngineARealtimeLastSpeechAtMs) || 0;
  if (!a || t - a > $o) return !1;
  const r = Math.max(
    rP(gc.lastRealtimeTranscriptAtMs) || 0,
    rP(gc.speechEngineARealtimeSpeechRunStartedAtMs) || 0,
    n,
  );
  if (t - r < Go) return !1;
  const i = Math.max(
    rP(gc.speechEngineARealtimeLastUpstreamMessageAtMs) || 0,
    n,
  );
  return (
    !(t - i < Go) &&
    !(
      t - (rP(gc.speechEngineARealtimeStallRotateAtMs) || 0) < Wo ||
      ((gc.speechEngineARealtimeStallRotateAtMs = t),
      Nx(
        "stt.speechEngineA_realtime.transcript_stalled",
        {
          silentForMs: Math.round(t - r),
          upstreamSilentForMs: Math.round(t - i),
          socketAgeMs: Math.round(t - n),
          lastSpeechAgeMs: Math.round(t - a),
          recoveryDurationMs: Math.round(
            gc.speechEngineARealtimeRecoveryMs || 0,
          ),
          recoveryChunks: gc.speechEngineARealtimeRecoveryChunks?.length || 0,
          sttBillableAudioMs: Math.round(QE()),
          hasStandbySocket: Boolean(gc.speechEngineARealtimeStandbySocket),
          standbyReady:
            !0 ===
            gc.speechEngineARealtimeStandbySocket?.__liveSubtitleSessionReady,
        },
        { source: "offscreen", level: "warn", provider: ae },
      ),
      md("transcript-stalled", {
        silentForMs: Math.round(t - r),
        upstreamSilentForMs: Math.round(t - i),
        lastSpeechAgeMs: Math.round(t - a),
      }) ||
        ((gc.speechEngineARealtimeRotationForcePending = !0),
        gc.speechEngineARealtimeRotationPrepareTimer &&
          (clearTimeout(gc.speechEngineARealtimeRotationPrepareTimer),
          (gc.speechEngineARealtimeRotationPrepareTimer = null)),
        gc.speechEngineARealtimeStandbySocket ||
          gc.speechEngineARealtimeRotationPreparing ||
          Sd(e, gc.transcriberConnectionId, null, 0)),
      0)
    )
  );
}
function Pf(e, t) {
  const n = Df(t),
    a = MD(n.samples);
  a.byteLength &&
    (e.send(
      JSON.stringify({
        type: "audio",
        data: TD(new Uint8Array(a.buffer)),
        mimeType: "audio/pcm;rate=16000",
      }),
    ),
    _f(n));
}
function Df(e, t = {}) {
  const n = void 0 !== t.audioSpeedOverride && null !== t.audioSpeedOverride,
    a = Boolean(t.force);
  if (e?.encodedAudio) {
    const t = Math.max(0, rP(e.durationMs) || Rs);
    return {
      ...e,
      bytes: yp(e.bytes),
      initBytes: e.initBytes ? yp(e.initBytes) : null,
      mimeType: bp(e.mimeType),
      extension: Tp(e.extension, e.mimeType),
      durationMs: t,
      billableDurationMs: Math.max(0, rP(e.billableDurationMs) ?? t),
      sttAudioSpeed: 1,
      sourcePlaybackRate: 1,
      sttAudioTransformFactor: 1,
      sttAudioSpeedAlreadyApplied: !1,
      preparedForStt: !0,
    };
  }
  if (e?.preparedForStt && !a && !n) return e;
  const r = If(e),
    i = KP(
      n ? t.audioSpeedOverride : Lf(r),
      gc.activeSttProvider || gc.config?.sttProvider,
    ),
    o = i / r,
    s =
      e.rawCaptureSamples ||
      e.captureSamples ||
      e.samples ||
      new Float32Array(),
    l = Wv(s, o),
    c = Math.max(0, rP(e.durationMs) || ((s?.length || 0) / Ge) * 1e3);
  return {
    ...e,
    rawCaptureSamples: s,
    samples: l,
    billableDurationMs: Math.max(0, c / Math.max(1, i)),
    sttAudioSpeed: i,
    sourcePlaybackRate: r,
    sttAudioTransformFactor: o,
    sttAudioSpeedAlreadyApplied: i > 1,
    preparedForStt: !0,
  };
}
function If(e = {}) {
  const t = rP(e.sourcePlaybackRate);
  return null !== t ? dP(t, 1, 2) : 1;
}
function Lf(e = 1) {
  return zP();
}
function _f(e) {
  const t = e.samples?.length ? (e.samples.length / Ge) * 1e3 : 0,
    n = Math.max(0, rP(e.durationMs) || t),
    a = Math.max(0, rP(e.billableDurationMs) ?? n),
    r = gc.sttTimingAudioMs,
    i = r + n;
  ((gc.sentAudioChunks += 1),
    (gc.sttTimingAudioMs = i),
    (gc.totalAudioMs += n),
    (gc.sttBillableAudioMs += a),
    gc.sttBillableAudioMs > (gc.sttBillingWatchdogBillableAudioMs || 0) &&
      ((gc.sttBillingWatchdogBillableAudioMs = gc.sttBillableAudioMs),
      (gc.sttBillingWatchdogGrowthAtMs = Date.now())),
    gc.sentAudioTimeline.push({
      sentStartMs: r,
      sentEndMs: i,
      billableDurationMs: a,
      captureDurationMs: rP(e.captureDurationMs),
      sourcePlaybackRate: rP(e.sourcePlaybackRate),
      sourceMediaStartTime: rP(e.sourceMediaStartTime),
      sourceMediaEndTime: rP(e.sourceMediaEndTime),
      captureStartMs: rP(e.captureStartMs),
      captureEndMs: rP(e.captureEndMs),
      captureStartWallTimeMs: rP(e.captureStartWallTimeMs),
      captureEndWallTimeMs: rP(e.captureEndWallTimeMs ?? e.capturedAtMs),
    }),
    gc.sentAudioTimeline.length > an &&
      gc.sentAudioTimeline.splice(0, gc.sentAudioTimeline.length - an));
}
function Bf(e) {
  const t = sy(),
    n = Df(e);
  (qf(t, n) && $f(t), t.chunks.push(n), (t.durationMs += n.durationMs));
  const a = Gf({ chunks: t.chunks });
  return a.active
    ? a.flush
      ? ($f(t), Wf(a))
      : (Jf(t), !1)
    : t.durationMs >= Xy({ chunks: t.chunks })
      ? ($f(t), Xf({ reason: "target-window", preserveOverlap: !0 }))
      : (Jf(t), !1);
}
function Uf(e = {}) {
  return e.sourceType
    ? String(e.sourceType)
    : e.encodedAudio
      ? "mse-audio-buffer"
      : "tab-capture";
}
function qf(e = sy(), t = {}) {
  if (!e.chunks?.length) return !1;
  const n = Uf(t),
    a = Array.from(new Set(e.chunks.map(Uf)));
  if (1 === a.length && a[0] === n) return !1;
  $f(e);
  const r = e.chunks.length,
    i = Math.round(oy(e.chunks)),
    o = Math.min(Ky({ chunks: e.chunks }), Es);
  return i >= o
    ? (Nx(
        "stt.batch.input_source_switch_flush",
        {
          from: a,
          to: n,
          flushed: Xf({
            force: !0,
            reason: "input-source-switch",
            preserveOverlap: !1,
          }),
          flushedChunks: r,
          flushedDurationMs: i,
          minFlushMs: o,
        },
        { source: "offscreen", level: "warn" },
      ),
      !0)
    : (_u({ chunks: e.chunks }, "input-source-switch-reset"),
      (e.chunks = []),
      (e.durationMs = 0),
      Nx(
        "stt.batch.input_source_switch_reset",
        { from: a, to: n, droppedChunks: r, droppedDurationMs: i },
        { source: "offscreen", level: "warn" },
      ),
      !0);
}
function Ff() {
  const e = sy();
  if (!e.chunks.length) return;
  const t = Gf({ chunks: e.chunks });
  t.active ? t.flush && Wf(t) : Xf({ reason: "vad-silence" });
}
function Of(e = {}) {
  if (ib(e)) return !1;
  const t = Array.isArray(e.chunks) ? e.chunks : [];
  return !(t.length && !t.every((e) => "tab-capture" === Uf(e))) && QP(fg(e));
}
function Nf(e = {}) {
  return Boolean(Of(e) && fg(e) === oe);
}
function Hf(e = []) {
  let t = 0,
    n = 0,
    a = 0,
    r = 0,
    i = 0,
    o = "";
  for (const i of e) {
    if (!0 !== i?.localVadAnalyzed) continue;
    const e = Math.max(0, rP(i.durationMs) || 0);
    ((t += e),
      !0 === i.localVadSpeech && (n += e),
      i.localVadProvider === $t ? (a += e) : (r += e));
  }
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const n = e[t];
    if (!0 !== n?.localVadAnalyzed || !0 === n.localVadSpeech) break;
    (o || (o = n.localVadProvider || Wt),
      (i += Math.max(0, rP(n.durationMs) || 0)));
  }
  return {
    analyzedMs: t,
    speechMs: n,
    sileroAnalyzedMs: a,
    energyAnalyzedMs: r,
    trailingSilenceMs: i,
    trailingSilenceProvider: o,
  };
}
function Gf(e = {}) {
  if (!Of(e)) return { active: !1, flush: !1 };
  const t = Array.isArray(e.chunks) ? e.chunks : [],
    n = fg(e),
    a = oy(t),
    r = Ky(e),
    i = Xy(e),
    o = zy(e),
    s = Hf(t),
    l = {
      active: !0,
      flush: !1,
      provider: n,
      durationMs: a,
      minMs: r,
      targetMs: i,
      maxMs: o,
      ...s,
    };
  return a >= o
    ? { ...l, flush: !0, reason: "adaptive-max-window", preserveOverlap: !0 }
    : a < r
      ? l
      : s.speechMs >= Ye &&
          s.trailingSilenceMs >= et &&
          s.trailingSilenceProvider === $t
        ? {
            ...l,
            flush: !0,
            reason: "adaptive-silero-boundary",
            preserveOverlap: !1,
          }
        : a >= i && s.speechMs >= Ye
          ? {
              ...l,
              flush: !0,
              reason: "adaptive-target-window",
              preserveOverlap: !0,
            }
          : l;
}
function Wf(e = {}) {
  if (
    !Xf({
      reason: e.reason || "adaptive-window",
      preserveOverlap: !1 !== e.preserveOverlap,
    })
  )
    return !1;
  const t = LP(e.provider || pg());
  return (
    Nx(
      "stt.batch.adaptive_window_flush",
      {
        provider: t,
        reason: e.reason || "adaptive-window",
        durationMs: Math.round(e.durationMs || 0),
        analyzedMs: Math.round(e.analyzedMs || 0),
        speechMs: Math.round(e.speechMs || 0),
        sileroAnalyzedMs: Math.round(e.sileroAnalyzedMs || 0),
        energyAnalyzedMs: Math.round(e.energyAnalyzedMs || 0),
        trailingSilenceMs: Math.round(e.trailingSilenceMs || 0),
        trailingSilenceProvider: e.trailingSilenceProvider || "",
        minMs: Math.round(e.minMs || 0),
        targetMs: Math.round(e.targetMs || 0),
        maxMs: Math.round(e.maxMs || 0),
        preserveOverlap: !1 !== e.preserveOverlap,
      },
      { source: "offscreen", provider: t },
    ),
    !0
  );
}
function $f(e = gc.batchStt) {
  e?.mseIdleFlushTimer &&
    (clearTimeout(e.mseIdleFlushTimer), (e.mseIdleFlushTimer = null));
}
function Vf(e = sy()) {
  return Boolean(e?.chunks?.length && ib({ chunks: e.chunks }));
}
function jf(e = sy()) {
  const t = sP((e.chunks || []).map((e) => rP(e.sourceMediaStartTime)));
  if (null === t) return null;
  const n = Nk() ?? zA(Date.now());
  return null === n ? null : t - n;
}
function Kf(e, t) {
  if (t < xs) return { flush: !1 };
  const n = jf(e);
  return tb({ chunks: e.chunks }) && t < $s
    ? {
        flush: !1,
        reason: "salad-speechEngineI-mse-window",
        deadlineSeconds: n,
      }
    : null === n
      ? { flush: !1 }
      : n > Jy() / 1e3 + 2
        ? { flush: !1, deadlineSeconds: n }
        : { flush: !0, reason: "mse-deadline-flush", deadlineSeconds: n };
}
function zf(e = "mse-idle-window") {
  const t = sy();
  if (!Vf(t)) return !1;
  const n = oy(t.chunks),
    a = Ky({ chunks: t.chunks });
  let r = !1,
    i = !1,
    o = null;
  if (n < a) {
    const a = Kf(t, n);
    if (!a.flush) return (Qf(t), !1);
    ((e = a.reason), (o = a.deadlineSeconds ?? null), (r = !0), (i = !0));
  }
  const s = t.chunks.length,
    l = Xy({ chunks: t.chunks });
  if (!Xf({ reason: e, force: r, preserveOverlap: !1 })) return !1;
  const c = gc.mseAudio || {};
  return (
    (c.segmentsQueued = Math.max(0, Number(c.segmentsQueued) || 0) + 1),
    (c.segmentsBuffered = 0),
    Nx(
      "mse.audio_buffer.idle_flush",
      {
        reason: e,
        chunks: s,
        durationMs: Math.round(n),
        minMs: a,
        targetMs: l,
        belowMinSegment: i,
        deadlineSeconds: aP(o),
      },
      { source: "offscreen" },
    ),
    !0
  );
}
function Qf(e = sy()) {
  e.mseIdleFlushTimer ||
    (Vf(e) &&
      (e.mseIdleFlushTimer = setTimeout(() => {
        ((e.mseIdleFlushTimer = null), zf());
      }, tl)));
}
function Jf(e = sy()) {
  if (($f(e), !Vf(e))) return !1;
  const t = oy(e.chunks),
    n = Xy({ chunks: e.chunks });
  return (
    vP("mse-audio-buffer", `MSE buffer ${sb(t)} / ${sb(n)}`),
    (e.mseIdleFlushTimer = setTimeout(() => {
      ((e.mseIdleFlushTimer = null), zf());
    }, tl)),
    !0
  );
}
function Xf(e = {}) {
  const t = sy();
  if (!t.chunks.length) return !1;
  const n = oy(t.chunks),
    a = Boolean(e.force);
  if (!a && n < Ky({ chunks: t.chunks })) return !1;
  $f(t);
  const r = t.chunks.slice(),
    i = oy(r),
    o = ob({ chunks: r }),
    s = Boolean(e.preserveOverlap) && !a && i > o + 200,
    l = !FM(r),
    c =
      s && l
        ? iy(r, o).map((e) => ({ ...e, adaptiveBatchOverlapRetained: !0 }))
        : [];
  ((t.chunks = c), (t.durationMs = oy(c)));
  const d = {
    id: t.nextSegmentId,
    chunks: r,
    durationMs: i,
    reason: e.reason || (a ? "commit" : "window"),
    batchSttProviderOverride:
      r.length && r.every((e) => e?.speechEngineARealtimeRecovery)
        ? ae
        : void 0,
    speechEngineARealtimeRecovery: r.some(
      (e) => e?.speechEngineARealtimeRecovery,
    ),
    sessionId: gc.sessionId || "",
    timelineRevision: gc.timelineRevision,
    createdAtMs: Date.now(),
  };
  if (((t.nextSegmentId += 1), Zf(r))) {
    gc.digitalSilenceDurationMs = (gc.digitalSilenceDurationMs || 0) + i;
    const e = Date.now();
    return (
      (!gc.lastDigitalSilenceLogAtMs ||
        e - gc.lastDigitalSilenceLogAtMs >= 1e4) &&
        ((gc.lastDigitalSilenceLogAtMs = e),
        Nx(
          "capture.digital_silence",
          {
            segmentId: d.id,
            skippedAudioMs: Math.round(gc.digitalSilenceDurationMs),
            audioContextState: gc.audioContext?.state || "unknown",
            sourceMuted: gc.sourceMediaTiming?.muted ?? null,
            sourcePaused: gc.sourceMediaTiming?.paused ?? null,
          },
          { source: "offscreen", level: "warn" },
        )),
      gc.digitalSilenceDurationMs >= 8e3 &&
        vP("source-audio-silent", "來源目前沒有聲音，等待音訊恢復"),
      !0
    );
  }
  return (
    (gc.digitalSilenceDurationMs = 0),
    (gc.lastDigitalSilenceLogAtMs = 0),
    Yf(d),
    !0
  );
}
function Zf(e = []) {
  return (
    e.length > 0 &&
    e.every(
      (e) =>
        "tab-capture" === e?.sourceType &&
        e.samples instanceof Float32Array &&
        e.samples.length > 0 &&
        e.samples.every((e) => 0 === e),
    )
  );
}
function Yf(e) {
  if (
    ((e.captureGeneration ??= gc.captureGeneration),
    (e.authUid ??= gc.config?.auth?.uid || ""),
    !1 === gc.acceptingNewSttWork)
  )
    return (
      _u(e, "stt-work-closed"),
      void nh(e, "ignored", { done: !0, active: !1, reason: "stt-work-closed" })
    );
  const t = sy();
  (wD(e.sessionId || "") || (e.sessionId = gc.sessionId || ""),
    (e.mseCoverageClaimIds = vu(e)),
    Iu(e, "queued"),
    t.queue.push(e),
    nh(e, "queued", { reason: e.reason || "" }),
    vP("stt-batch", `${aD(fg(e))} 排隊 ${sb(e.durationMs)}`),
    hS());
}
function eh(e = {}) {
  return sP((e.chunks || []).map((e) => rP(e.sourceMediaStartTime)));
}
function th(e = {}) {
  return lP((e.chunks || []).map((e) => rP(e.sourceMediaEndTime)));
}
function nh(e = {}, t = "pending", n = {}) {
  if (!ib(e)) return !1;
  const a = sp(e);
  return (
    !!a &&
    (bP({
      kind: "subtitle-pipeline-range",
      stage: t,
      segmentId: e.id,
      pipelineRangeId: `stt:${e.id}`,
      mediaStartTime: a.start,
      mediaEndTime: a.end,
      durationMs: Math.round(rP(e.durationMs) || 0),
      timelineRevision: rP(e.timelineRevision),
      reason: n.reason || e.reason || "",
      done: Boolean(n.done),
      active: !1 !== n.active,
    }),
    !0)
  );
}
function ah(e = null, t = "pending", n = {}) {
  if (!zp(e)) return !1;
  const a = BC(e),
    r = UC(e);
  return !(
    null === a ||
    null === r ||
    r <= a ||
    (bP({
      kind: "subtitle-pipeline-range",
      stage: t,
      segmentId: e.sttSegmentId || n.segmentId || "",
      pipelineRangeId: e.sttSegmentId ? `stt:${e.sttSegmentId}` : "",
      mediaStartTime: a,
      mediaEndTime: r,
      durationMs: Math.round(rP(e.audioDurationMs) || 1e3 * Math.max(0, r - a)),
      timelineRevision: rP(n.timelineRevision),
      requestId: n.requestId || "",
      reason: n.reason || "",
      done: Boolean(n.done),
      active: !1 !== n.active,
    }),
    0)
  );
}
function rh(e, t, n = "pending", a = {}) {
  const r = rP(e),
    i = rP(t);
  if (null === r || null === i || i <= r) return !1;
  const o = `${aP(r)}:${aP(i)}`;
  return (
    bP({
      kind: "subtitle-pipeline-range",
      stage: n,
      segmentId: a.segmentId || "",
      pipelineRangeId: a.pipelineRangeId || `mse-gap:${o}`,
      mediaStartTime: r,
      mediaEndTime: i,
      durationMs: Math.round(rP(a.durationMs) || 1e3 * (i - r)),
      timelineRevision: rP(a.timelineRevision ?? gc.timelineRevision),
      requestId: a.requestId || "",
      reason: a.reason || "",
      done: Boolean(a.done),
      active: !1 !== a.active,
    }),
    !0
  );
}
function ih() {
  const e = rP(gc.config?.mseSttUploadMaxLeadSeconds),
    t = null !== e ? dP(e, 20, 180) : zm() ? ap() : ar;
  return gc.config?.hybridSubtitleCacheMode &&
    !0 === gc.config?.cachedSubtitleCoverageReliable
    ? Math.min(t, ir)
    : t;
}
function oh(e = []) {
  const t = [],
    n = [];
  for (const a of e || []) {
    const e = eh(a),
      r = th(a);
    (null !== e && t.push(e), null !== r && n.push(r));
  }
  return {
    start: t.length ? Math.min(...t) : null,
    end: n.length ? Math.max(...n) : null,
  };
}
function sh(e, t = {}, n, a, r, i = null) {
  const o = Date.now();
  if (o - (e.lastUploadHoldLogAtMs || 0) < 1e4) return;
  e.lastUploadHoldLogAtMs = o;
  const s = oh(e.queue || []);
  Nx(
    "stt.batch.upload_held_far_ahead",
    {
      leadSeconds: aP(n),
      maxLeadSeconds: a,
      queuedSegments: r,
      toleranceSeconds: 1,
      playbackTime: aP(i),
      mediaStartTime: aP(eh(t)),
      mediaEndTime: aP(th(t)),
      queueStartMediaTime: aP(s.start),
      queueEndMediaTime: aP(s.end),
      overLimitSeconds: aP(Math.max(0, (rP(n) || 0) - a)),
    },
    { source: "offscreen" },
  );
}
function lh(e, t, n, a) {
  const r = Date.now();
  r - (e.lastUploadHoldBypassLogAtMs || 0) < 1e4 ||
    ((e.lastUploadHoldBypassLogAtMs = r),
    Nx(
      "stt.batch.upload_hold_bypassed_startup",
      {
        leadSeconds: aP(t),
        maxLeadSeconds: n,
        queuedSegments: a,
        readySubtitleEndMediaTime: rP(
          gc.mseStartupBoost?.readySubtitleEndMediaTime,
        ),
        readySubtitleLeadSeconds: rP(
          gc.mseStartupBoost?.readySubtitleLeadSeconds,
        ),
        targetReadySeconds: rP(gc.mseStartupBoost?.targetReadySeconds),
        startupCatchupMaxLeadSeconds: ph(),
        boostMode: gc.mseStartupBoost?.mode || "",
        boostActive: Boolean(
          gc.mseStartupBoost?.active && !gc.mseStartupBoost?.switched,
        ),
      },
      { source: "offscreen" },
    ));
}
function ch(e, t = {}, n, a, r) {
  const i = Date.now();
  i - (e.lastGapRecoveryHoldBypassLogAtMs || 0) < 5e3 ||
    ((e.lastGapRecoveryHoldBypassLogAtMs = i),
    Nx(
      "stt.batch.upload_hold_bypassed_gap_repost",
      {
        segmentId: t.id,
        leadSeconds: aP(n),
        maxLeadSeconds: a,
        queuedSegments: r,
        mediaStartTime: aP(eh(t)),
        mediaEndTime: aP(th(t)),
        reason: t.reason || "",
        repostAttempts: (t.chunks || [])
          .map((e) =>
            Math.max(0, Math.round(Number(e?.mseRepostAttempt || 0) || 0)),
          )
          .filter((e) => e > 0),
      },
      { source: "offscreen" },
    ));
}
function dh(e, t, n, a) {
  const r = Date.now();
  r - (e.lastStartupCoverageHoldLogAtMs || 0) < 3e3 ||
    ((e.lastStartupCoverageHoldLogAtMs = r),
    Nx(
      "stt.batch.startup_upload_held_ahead",
      {
        leadSeconds: aP(t),
        maxLeadSeconds: n,
        queuedSegments: a,
        readySubtitleEndMediaTime: rP(
          gc.mseStartupBoost?.readySubtitleEndMediaTime,
        ),
        boostMode: gc.mseStartupBoost?.mode || "",
        boostActive: Boolean(
          gc.mseStartupBoost?.active && !gc.mseStartupBoost?.switched,
        ),
      },
      { source: "offscreen" },
    ));
}
function uh(e = {}, t = null, n = Date.now()) {
  if (!ib(e) || bh(e)) return !1;
  if (!fh(n)) return !1;
  const a = rP(t),
    r = eh(e);
  if (null === a || null === r) return !1;
  if (r - a < Pr) return !1;
  const i = am(a, r, e.id || 0, {
    kind: "mse-startup-upload-gap",
    reason: "mse-startup-target-window-before-playhead",
    chunkSeconds: Ti,
    maxSeconds: wi,
  });
  return (
    !!i &&
    (Nx(
      "mse.audio_buffer.startup_upload_gap_backfill_registered",
      {
        segmentId: e.id || null,
        playbackTime: aP(a),
        segmentStartMediaTime: aP(r),
        gapSeconds: aP(r - a),
        chunkCount: i,
      },
      { source: "offscreen", level: "warn" },
    ),
    jm(n),
    !0)
  );
}
function mh() {
  const e = rP(gc.config?.mseStartupSttUploadMaxLeadSeconds);
  return null !== e ? dP(e, 0, 15) : 3;
}
function gh() {
  return Math.max(mh(), Cp());
}
function ph() {
  const e = rP(gc.config?.mseStartupBoostCatchupUploadMaxLeadSeconds);
  if (null !== e) return dP(e, ar, ll);
  const t = qy((gc.mseStartupBoost || {}).targetReadySeconds),
    n = kp() / 1e3;
  return dP(Math.max(ih(), t + n + 5 + Pi), ar, ll);
}
function fh(e = Date.now()) {
  if (Hk(e)) return !0;
  const t = gc.mseStartupBoost || {};
  if (
    t.enabled &&
    t.active &&
    !t.switched &&
    t.mode === Rl &&
    !0 === t.batchOnlyAfterSeek
  )
    return !0 !== t.startupReleaseReady;
  if (t.enabled) {
    const e = rP(t.readySubtitleEndMediaTime);
    return !(
      (null !== e && e > 0) ||
      !t.active ||
      t.switched ||
      (t.mode &&
        t.mode !== xl &&
        t.mode !== El &&
        (t.mode !== Rl || !0 !== t.batchOnlyAfterSeek))
    );
  }
  return !t.enabled && Xk() && Zk(e) ? !hh(e) : Xk() && Zk(e);
}
function hh(e = Date.now()) {
  if (!Xk()) return !1;
  if (!1 !== gc.viewerMediaTiming?.paused) return !1;
  const t = Date.parse(String(gc.config?.startedAt || "")),
    n = Number.isFinite(t)
      ? t
      : (rP(gc.mseAudio?.startedAtMs) ?? rP(gc.mseStartupBoost?.startedAtMs));
  if (!Number.isFinite(n)) return !0;
  const a = Math.max(
    0,
    1e3 *
      (rP(
        gc.config?.effectiveSyncDelaySeconds ?? gc.config?.syncDelaySeconds,
      ) || 0),
  );
  return e - n >= Math.max(0, a - 500);
}
function Sh(e = {}, t = null, n = Date.now()) {
  const a = sy();
  if (!ib(e)) return !1;
  if (!fh(n)) return ((a.startupCoverageHoldStartMs = 0), !1);
  const r = rP(t);
  return !(
    null === r ||
    ((gc.config?.hybridSubtitleCacheMode &&
      !0 === gc.config?.cachedSubtitleCoverageReliable &&
      r <= ir) ||
    r <= gh()
      ? ((a.startupCoverageHoldStartMs = 0), 1)
      : (a.startupCoverageHoldStartMs || (a.startupCoverageHoldStartMs = n),
        n - a.startupCoverageHoldStartMs > lr))
  );
}
function Mh(e = {}, t = Date.now()) {
  return !!ib(e) && fh(t);
}
function vh(e = {}, t = null, n = Date.now()) {
  if (!ib(e)) return !1;
  const a = gc.mseStartupBoost || {};
  if (!a.enabled || !a.active || a.switched) return !1;
  if (a.mode !== El) return !1;
  const r = rP(t);
  return null !== r && !(r > ph()) && Lp(Nk(n)) < qy(a.targetReadySeconds);
}
function yh(e = null, t = Date.now()) {
  if (!zm()) return { active: !1, reason: "mse-disabled" };
  const n = rP(e) ?? Nk(t) ?? zA(t);
  if (null === n) return { active: !1, reason: "no-playback-time" };
  const a = gc.mseAudio || {},
    r = rP(a.lastAcceptedMediaEndTime ?? a.lastBufferedEnd),
    i =
      null !== r ? Math.max(0, r - n) : Math.max(0, rP(a.lastLeadSeconds) || 0),
    o = Lp(n),
    s = Cp(),
    l = Math.max(0, Number(a.standardSegmentsScheduled) || 0),
    c = i >= s && i >= o + 8,
    d = o < s,
    u = d && c && l < Ys;
  return {
    active: u,
    reason: u
      ? "ready-lead-behind-raw-audio"
      : d
        ? c
          ? "catchup-segment-budget-exhausted"
          : "raw-audio-not-far-enough"
        : "ready-lead-caught-up",
    playbackTime: n,
    rawLeadSeconds: i,
    readyLeadSeconds: o,
    targetReadySeconds: s,
    readyFrontierMediaTime: n + o,
    scheduledSegments: l,
  };
}
function bh(e = {}) {
  return (
    !!ZM(e) ||
    "mse-gap-backfill" === String(e.reason || "") ||
    !!(e.chunks || []).some((e) => e?.mseGapBackfill) ||
    (!!ib(e) &&
      (!!String(e.reason || "").startsWith("mse-discontinuity-gap") ||
        (e.chunks || []).some(
          (e) =>
            Math.max(0, Math.round(Number(e?.mseRepostAttempt || 0) || 0)) > 0,
        )))
  );
}
function Th(e = "capture-stop") {
  if (!lg()) return !1;
  const t = sy(),
    n = t.queue.length,
    a = Math.round(
      t.queue.reduce(
        (e, t) => e + Math.max(0, rP(t.durationMs) || oy(t.chunks || [])),
        0,
      ),
    ),
    r = t.chunks.length,
    i = Math.round(oy(t.chunks));
  if (!n && !r) return !1;
  ($f(t), wh());
  for (const n of t.queue) _u(n, e);
  return (
    t.chunks.length && _u({ chunks: t.chunks }, e),
    (t.queue = []),
    (t.chunks = []),
    (t.durationMs = 0),
    Nx(
      "stt.batch.pending_uploads_dropped_on_stop",
      {
        reason: e,
        queuedSegments: n,
        queuedDurationMs: a,
        bufferedChunks: r,
        bufferedDurationMs: i,
        activeUploads: Math.max(0, Number(t.activeUploads) || 0),
        isUploading: Boolean(t.isUploading),
      },
      { source: "offscreen", level: "warn" },
    ),
    !0
  );
}
function wh() {
  gc.batchQueuePumpTimer &&
    (clearInterval(gc.batchQueuePumpTimer), (gc.batchQueuePumpTimer = null));
}
function kh() {
  gc.batchQueuePumpTimer ||
    (gc.batchQueuePumpTimer = setInterval(() => {
      sy().queue.length ? hS() : wh();
    }, Di));
}
function Ch(e = sy()) {
  const t = e.queue || [];
  let n = 0;
  for (let e = t.length - 1; e >= 0; e -= 1) {
    const a = t[e],
      r = rP(a?.timelineRevision);
    null !== r &&
      r !== gc.timelineRevision &&
      (t.splice(e, 1),
      lp(a, "stale-timeline-revision"),
      _u(a, "stale-timeline-revision"),
      nh(a, "ignored", {
        done: !0,
        active: !1,
        reason: "stale-timeline-revision",
      }),
      (n += 1));
  }
  return (
    n &&
      Nx(
        "stt.batch.stale_timeline_queue_dropped",
        {
          droppedSegments: n,
          currentRevision: gc.timelineRevision,
          queuedSegments: t.length,
        },
        { source: "offscreen", level: "warn" },
      ),
    n
  );
}
function Ah() {
  const e = gc.sessionId || "",
    t = gc.timelineRevision;
  return $p(
    ru()
      .entries.filter(
        (n) =>
          "cache" === n?.owner &&
          "cache-ready" === n.stage &&
          n.sessionId === e &&
          n.timelineRevision === t,
      )
      .map((e) => ({ start: e.start, end: e.end })),
    $e,
  );
}
function Rh(e, t, n = []) {
  const a = iu(e, t);
  if (!a) return [];
  let r = a.start;
  const i = [];
  for (const e of n || []) {
    const t = rP(e?.start),
      n = rP(e?.end);
    if (!(null === t || null === n || n <= t || n <= r + $e)) {
      if (t >= a.end - $e) break;
      if (
        (t > r + $e && i.push({ start: r, end: Math.min(t, a.end) }),
        (r = Math.max(r, Math.min(a.end, n))),
        r >= a.end - $e)
      )
        break;
    }
  }
  return (
    r < a.end - $e && i.push({ start: r, end: a.end }),
    i.filter((e) => e.end - e.start >= We)
  );
}
function xh(e = {}, t = []) {
  if (
    "tab-capture" !== Uf(e) ||
    e?.encodedAudio ||
    !(e.rawCaptureSamples || e.captureSamples || e.samples)?.length
  )
    return { eligible: !1, changed: !1, chunks: [e], removedDurationMs: 0 };
  const n = rP(e.sourceMediaStartTime),
    a = rP(e.sourceMediaEndTime);
  if (null === n || null === a || a <= n)
    return { eligible: !1, changed: !1, chunks: [e], removedDurationMs: 0 };
  const r = Rh(n, a, t);
  if (r.reduce((e, t) => e + (t.end - t.start), 0) >= a - n - $e)
    return { eligible: !0, changed: !1, chunks: [e], removedDurationMs: 0 };
  const i = r.map((t) => gm(e, t.start, t.end)).filter(Boolean),
    o = oy(i);
  return {
    eligible: !0,
    changed: !0,
    chunks: i,
    removedDurationMs: Math.max(0, 1e3 * (a - n) - o),
  };
}
function Eh(e = {}) {
  const t = { ...e };
  for (const e of Object.keys(t))
    e.startsWith("sttDeadlineHedge") && delete t[e];
  return (
    (t.speechIntervalOffsets = null),
    (t.speechIntervalsPromise = null),
    (t.sttDeadlineHedgeTriggered = !1),
    (t.sttDeadlineHedgeRescue = !1),
    (t.sttDeadlineHedgeTriggerReason = ""),
    (t.sttDeadlineHedgeWinnerRole = ""),
    (t.sttDeadlineHedgeWinnerProvider = ""),
    (t.sttDeadlineHedgeReserveMs = 0),
    (t.lastBatchSttAttemptProvider = ""),
    (t.emptySttRetryActive = !1),
    delete t.sttAudioSpeed,
    delete t.billableDurationMs,
    delete t.sttProviderAudioView,
    delete t.timelineRevisionIgnored,
    t
  );
}
function Ph(e = sy(), t = {}) {
  const n = Array.isArray(e.chunks) ? e.chunks : [];
  if (!n.length || !n.every((e) => "tab-capture" === Uf(e)))
    return { action: "none", durationMs: 0 };
  const a = oy(n),
    r = Ky({ chunks: n }),
    i = n.every((e) => !0 === e?.adaptiveBatchOverlapRetained);
  if (!i && a > 0) {
    const e = Xf({
      force: !0,
      reason: "session-cache-discontinuity",
      preserveOverlap: !1,
    });
    return (
      Nx(
        "stt.batch.session_cache_discontinuity_flush",
        {
          durationMs: Math.round(a),
          minMs: r,
          belowMinSegment: a < r,
          flushed: e,
          previousEndMediaTime: aP(t.previousEndMediaTime),
          nextStartMediaTime: aP(t.nextStartMediaTime),
          reason: t.reason || "cache-boundary",
        },
        { source: "offscreen" },
      ),
      { action: e ? "flushed" : "none", durationMs: a }
    );
  }
  return (
    $f(e),
    _u({ chunks: n }, "session-cache-discontinuity-reset"),
    (e.chunks = []),
    (e.durationMs = 0),
    Nx(
      "stt.batch.session_cache_discontinuity_reset",
      {
        durationMs: Math.round(a),
        minMs: r,
        belowMinSegment: a < r,
        overlapOnly: i,
        previousEndMediaTime: aP(t.previousEndMediaTime),
        nextStartMediaTime: aP(t.nextStartMediaTime),
        reason: t.reason || "cache-boundary",
      },
      { source: "offscreen" },
    ),
    { action: "reset", durationMs: a }
  );
}
function Dh(e = sy(), t = {}, n = "cache-gap") {
  const a = Array.isArray(e.chunks) ? e.chunks : [];
  if (!a.length) return { action: "none", durationMs: 0 };
  const r = lP(a.map((e) => rP(e.sourceMediaEndTime))),
    i = rP(t.sourceMediaStartTime);
  return null === r || null === i || Math.abs(i - r) <= $e
    ? { action: "none", durationMs: 0 }
    : Ph(e, { previousEndMediaTime: r, nextStartMediaTime: i, reason: n });
}
function Ih(e = {}, t = null) {
  const n = null === t ? Ah() : t;
  if (!n.length)
    return { changed: !1, appendedChunks: 1, flushedSegments: Bf(e) ? 1 : 0 };
  const a = xh(e, n);
  if (!a.eligible || !a.changed)
    return { changed: !1, appendedChunks: 1, flushedSegments: Bf(e) ? 1 : 0 };
  a.removedDurationMs > 0 &&
    (Xd().duplicateSecondsPrevented += a.removedDurationMs / 1e3);
  const r = rP(e.sourceMediaStartTime),
    i = rP(e.sourceMediaEndTime);
  let o = 0;
  if (a.chunks.length) {
    for (let e = 0; e < a.chunks.length; e += 1) {
      const t = a.chunks[e];
      ("flushed" ===
        (e > 0
          ? Ph(sy(), {
              previousEndMediaTime: a.chunks[e - 1]?.sourceMediaEndTime,
              nextStartMediaTime: t.sourceMediaStartTime,
              reason: "cache-created-island",
            })
          : Dh(sy(), t, "cache-created-island")
        ).action && (o += 1),
        Bf(t) && (o += 1));
    }
    const e = rP(a.chunks[a.chunks.length - 1]?.sourceMediaEndTime);
    null !== i &&
      null !== e &&
      i - e >= We &&
      "flushed" ===
        Ph(sy(), {
          previousEndMediaTime: e,
          nextStartMediaTime: i,
          reason: "cache-covered-tail",
        }).action &&
      (o += 1);
  } else
    "flushed" ===
      Ph(sy(), {
        previousEndMediaTime: r,
        nextStartMediaTime: i,
        reason: "fully-cache-covered",
      }).action && (o += 1);
  return (
    Nx(
      "stt.batch.session_cache_ingress_filtered",
      {
        action: a.chunks.length ? "trimmed" : "dropped",
        timelineRevision: gc.timelineRevision,
        mediaStartTime: aP(r),
        mediaEndTime: aP(i),
        removedDurationMs: Math.round(a.removedDurationMs),
        retainedChunks: a.chunks.length,
        retainedRanges: a.chunks.map((e) => ({
          start: aP(e.sourceMediaStartTime),
          end: aP(e.sourceMediaEndTime),
        })),
      },
      { source: "offscreen" },
    ),
    {
      changed: !0,
      appendedChunks: a.chunks.length,
      flushedSegments: o,
      removedDurationMs: a.removedDurationMs,
    }
  );
}
function Lh(e = {}, t = [], n = sy()) {
  const a = rP(e.timelineRevision),
    r = Array.isArray(e.chunks) ? e.chunks : [];
  if (
    null === a ||
    a !== gc.timelineRevision ||
    !r.length ||
    vu(e).length ||
    ib(e) ||
    !r.every(
      (e) =>
        "tab-capture" === Uf(e) &&
        !e?.encodedAudio &&
        (e.rawCaptureSamples || e.captureSamples || e.samples)?.length,
    )
  )
    return { changed: !1, segments: [e], removedDurationMs: 0 };
  let i = !1;
  const o = [];
  for (const n of r) {
    const a = xh(n, t);
    if (!a.eligible)
      return { changed: !1, segments: [e], removedDurationMs: 0 };
    ((i = i || a.changed), o.push(...a.chunks));
  }
  if (!i) return { changed: !1, segments: [e], removedDurationMs: 0 };
  const s = [];
  for (const e of o) {
    const n = rP(e.sourceMediaStartTime),
      a = s[s.length - 1],
      r = lP((a || []).map((e) => rP(e.sourceMediaEndTime))),
      i =
        null !== n &&
        null !== r &&
        n > r &&
        t.some((e) => {
          const t = rP(e?.start),
            a = rP(e?.end);
          return null !== t && null !== a && a > r && t < n;
        });
    a?.length && !i && null !== n && null !== r && n <= r + $e
      ? a.push(e)
      : s.push([e]);
  }
  const l = Math.max(0, rP(e.durationMs) || oy(r)),
    c = s.map((t, a) => ({
      ...Eh(e),
      id: 0 === a && void 0 !== e.id ? e.id : n.nextSegmentId++,
      chunks: t,
      durationMs: oy(t),
      mseCoverageClaimIds: [],
      sessionCacheCoverageFiltered: !0,
      sessionCacheCoverageOriginalSegmentId: e.id ?? null,
    })),
    d = c.reduce((e, t) => e + t.durationMs, 0);
  return { changed: !0, segments: c, removedDurationMs: Math.max(0, l - d) };
}
function _h(e = sy()) {
  const t = Array.isArray(e.queue) ? e.queue : [];
  if (!t.length)
    return { droppedSegments: 0, splitSegments: 0, removedDurationMs: 0 };
  const n = Ah();
  if (!n.length)
    return { droppedSegments: 0, splitSegments: 0, removedDurationMs: 0 };
  let a = 0,
    r = 0,
    i = 0;
  for (let o = 0; o < t.length; ) {
    const s = t[o],
      l = sp(s),
      c = Lh(s, n, e);
    c.changed
      ? ((i += c.removedDurationMs),
        t.splice(o, 1, ...c.segments),
        c.segments.length
          ? ((r += 1), (o += c.segments.length))
          : ((a += 1),
            lp(s, "session-cache-covered-before-stt"),
            _u(s, "session-cache-covered-before-stt"),
            nh(s, "ignored", {
              done: !0,
              active: !1,
              reason: "session-cache-covered-before-stt",
            })),
        Nx(
          "stt.batch.session_cache_coverage_filtered",
          {
            segmentId: s?.id ?? null,
            action: c.segments.length ? "split" : "dropped",
            timelineRevision: gc.timelineRevision,
            mediaStartTime: aP(l?.start),
            mediaEndTime: aP(l?.end),
            removedDurationMs: Math.round(c.removedDurationMs),
            retainedSegments: c.segments.length,
            retainedRanges: c.segments.map((e) => {
              const t = sp(e);
              return { start: aP(t?.start), end: aP(t?.end) };
            }),
          },
          { source: "offscreen" },
        ))
      : (o += 1);
  }
  return (
    i > 0 && (Xd().duplicateSecondsPrevented += i / 1e3),
    { droppedSegments: a, splitSegments: r, removedDurationMs: i }
  );
}
function Bh(e = sy(), t = null) {
  const n = e.queue || [],
    a = rP(t);
  if (n.length < 2 || null === a) return 0;
  const r = gc.sourceMediaTiming || {},
    i = !1 === r.isLiveStream ? rP(r.duration) : null,
    o = Math.max(
      90,
      ih() + 1,
      (rP(
        gc.config?.effectiveSyncDelaySeconds ?? gc.config?.syncDelaySeconds,
      ) || 0) + 60,
    ),
    s = Math.max(or, 2 * o),
    l = n.map((e) => sp(e)),
    c = l.map((e) => {
      const t = rP(e?.start),
        n = rP(e?.end) ?? t;
      return null === t || null === n
        ? null
        : t <= a && n >= a
          ? 0
          : n < a
            ? a - n
            : t - a;
    });
  if (!c.some((e) => null !== e && e <= o)) return 0;
  const d = [],
    u = [];
  for (let e = n.length - 1; e >= 0; e -= 1) {
    const t = c[e];
    if (null === t || t <= s) continue;
    const r = n[e],
      o = l[e],
      m = rP(o?.start),
      g = rP(o?.end) ?? m;
    null !== i && null !== m && null !== g && m >= a && m >= 0 && g <= i + 3
      ? u.push({
          segmentId: r?.id ?? null,
          mediaStartTime: aP(m),
          mediaEndTime: aP(g),
          distanceSeconds: aP(t),
        })
      : (n.splice(e, 1),
        lp(r, "cross-clock-queue-island"),
        _u(r, "cross-clock-queue-island"),
        nh(r, "ignored", {
          done: !0,
          active: !1,
          reason: "cross-clock-queue-island",
        }),
        d.push({
          segmentId: r?.id ?? null,
          mediaStartTime: aP(o?.start),
          mediaEndTime: aP(o?.end),
          distanceSeconds: aP(t),
        }));
  }
  return (
    u.length &&
      Date.now() - (rP(e.lastCrossClockVodPreservedLogAtMs) || 0) >= 1e4 &&
      ((e.lastCrossClockVodPreservedLogAtMs = Date.now()),
      Nx(
        "stt.batch.cross_clock_vod_future_preserved",
        {
          preservedSegments: u.length,
          preserved: u.slice(0, 8),
          playbackTime: aP(a),
          duration: aP(i),
          hardDistanceSeconds: aP(s),
          queuedSegments: n.length,
        },
        { source: "offscreen" },
      )),
    d.length &&
      Nx(
        "stt.batch.cross_clock_queue_dropped",
        {
          droppedSegments: d.length,
          dropped: d.slice(0, 8),
          playbackTime: aP(a),
          nearDistanceSeconds: aP(o),
          hardDistanceSeconds: aP(s),
          queuedSegments: n.length,
          queueRange: oh(n),
        },
        { source: "offscreen", level: "error" },
      ),
    d.length
  );
}
function Uh(e = sy()) {
  const t = e.queue || [];
  if (!t.length) return;
  if ((Ch(e), _h(e), !t.length)) return;
  let n = 0;
  const a = Nm();
  if (null !== a && ($m(e, a), Bh(e, a), !t.length)) return;
  const r = t.map(eh);
  if (r.some((e) => null === e)) return t.shift();
  const i = t
    .map((e, t) => t)
    .sort((e, n) => qh(t[e], r[e], t[n], r[n], a) || e - n);
  ((n = i[0]), null !== a && uh(t[n], a));
  let o = null;
  for (const n of i) {
    const i = t[n];
    if (null === a) {
      o = n;
      break;
    }
    const s = r[n] - a,
      l = ih(),
      c = l + 1;
    if (!Sh(i, s)) {
      if (s > c) {
        if (!(bh(i) || Mh(i) || vh(i, s))) {
          if (gc.isStopping) {
            const e = Math.round(oy(t.flatMap((e) => e.chunks || [])));
            return (
              Nx(
                "stt.batch.far_ahead_dropped_on_stop",
                {
                  droppedSegments: t.length,
                  droppedDurationMs: e,
                  leadSeconds: aP(s),
                  maxLeadSeconds: l,
                  hardHoldLeadSeconds: c,
                  toleranceSeconds: 1,
                },
                { source: "offscreen", level: "warn" },
              ),
              void (t.length = 0)
            );
          }
          sh(e, i, s, l, t.length, a);
          continue;
        }
        bh(i) ? ch(e, i, s, l, t.length) : lh(e, s, l, t.length);
      }
      o = n;
      break;
    }
    dh(e, s, gh(), t.length);
  }
  if (null !== o)
    return (
      o > 0 &&
        Nx(
          "stt.batch.queue_reordered",
          {
            segmentId: t[o]?.id,
            mediaStartTime: aP(r[o]),
            skippedSegments: o,
            skippedMediaStartTimes: r.slice(0, o).map((e) => aP(e)),
            queuedSegments: t.length,
          },
          { source: "offscreen" },
        ),
      t.splice(o, 1)[0]
    );
  kh();
}
function qh(e = {}, t = null, n = {}, a = null, r = null) {
  const i = Oh(e, t, r),
    o = Oh(n, a, r);
  if (i !== o) return i - o;
  const s = rP(r);
  if (null !== s && (ib(e) || ib(n))) {
    const r = Fh(e, t, s),
      i = Fh(n, a, s);
    if (r !== i) return r - i;
  }
  const l = rP(t),
    c = rP(a);
  return null !== l && null !== c && l !== c ? l - c : 0;
}
function Fh(e = {}, t = null, n = null) {
  const a = rP(n),
    r = sp(e),
    i = rP(r?.start) ?? rP(t),
    o = rP(r?.end) ?? i;
  return null === a || null === i || null === o
    ? Number.MAX_SAFE_INTEGER
    : i <= a && o >= a
      ? 0
      : o < a
        ? a - o
        : i - a;
}
function Oh(e = {}, t = null, n = null) {
  const a = rP(t),
    r = rP(n);
  if (!bh(e)) {
    if (!ib(e)) return 5;
    const t = yh(r);
    return t.active && null !== a && null !== r
      ? a <= (rP(t.readyFrontierMediaTime) ?? r) + Vl
        ? 1
        : a <= r + t.targetReadySeconds + 5
          ? 2
          : 4
      : 5;
  }
  return e.mseBackfillUrgent || (null !== a && null !== r && a - r <= 8)
    ? 0
    : 3;
}
function Nh(e) {
  const t = String(e?.message || e || "");
  return /(?:HTTP\s*(?:408|409|425|429|5\d\d)\b|fetch failed|network(?:error)?|socket|ECONN|ETIMEDOUT|timeout|timed out|逾時)/i.test(
    t,
  );
}
function Hh(e = null) {
  return (
    "CAPTION_GENERATION_IN_PROGRESS" === e?.code ||
    /CAPTION_GENERATION_IN_PROGRESS|相同字幕時間範圍正在由另一個請求處理/i.test(
      String(e?.message || e || ""),
    )
  );
}
function Gh(e = {}, t = null) {
  return Hh(t)
    ? ""
    : ib(e) && Nh(t)
      ? e.batchSttProviderFailoverUsed ||
        "empty-alternate-rescue" === e.batchSttProviderSelectionLockReason ||
        "quality-rejected-rescue" === e.batchSttProviderSelectionLockReason ||
        "pcm-subtitle-unavailable-recovery" ===
          e.batchSttProviderSelectionLockReason
        ? ""
        : Wh(LP(e.lastBatchSttAttemptProvider || fg(e)), gc.config?.sourceLang)
      : "";
}
function Wh(e = "", t = gc.config?.sourceLang) {
  const n = LP(e);
  return nD(n) ? zh(t) : n === oe && BP(wt, t) && Wy(wt, "rescue") ? wt : "";
}
function $h(e = "", t = Date.now()) {
  const n = LP(e),
    a = rP(gc.sttDeadlineHedgeProviderHealth?.[n]?.openUntilMs);
  return null !== a && a > t;
}
function Vh(e = {}) {
  if ("fallback" !== e.role) return;
  const t = LP(e.provider);
  if (t !== Tt) return;
  (gc.sttDeadlineHedgeProviderHealth &&
    "object" == typeof gc.sttDeadlineHedgeProviderHealth) ||
    (gc.sttDeadlineHedgeProviderHealth = {});
  const n = gc.sttDeadlineHedgeProviderHealth[t] || {};
  if (e.ok)
    return void (gc.sttDeadlineHedgeProviderHealth[t] = {
      failureCount: 0,
      openUntilMs: 0,
      lastSuccessAtMs: Date.now(),
      lastError: "",
    });
  if (!Nh(e.error)) return;
  const a = Date.now(),
    r = {
      failureCount: Math.max(0, Math.round(n.failureCount || 0)) + 1,
      openUntilMs: a + Bt,
      lastFailureAtMs: a,
      lastError: e.error?.message || String(e.error || ""),
    };
  ((gc.sttDeadlineHedgeProviderHealth[t] = r),
    Nx(
      "stt.batch.deadline_hedge_provider_circuit_opened",
      {
        provider: t,
        failureCount: r.failureCount,
        cooldownMs: Bt,
        openUntilMs: r.openUntilMs,
        error: r.lastError,
      },
      { source: "offscreen", provider: t, level: "warn" },
    ));
}
function jh(e = "", t = null, n = "batch-stt-error") {
  if (
    "sql-wallet-v1" === gc.config?.walletBillingProtocol &&
    !["wallet_stt_timeout", "stt_provider_timeout"].includes(t?.code)
  )
    return !1;
  const a = LP(e);
  if (!a || !Nh(t)) return !1;
  (gc.sttDeadlineHedgeProviderHealth &&
    "object" == typeof gc.sttDeadlineHedgeProviderHealth) ||
    (gc.sttDeadlineHedgeProviderHealth = {});
  const r = Date.now(),
    i = gc.sttDeadlineHedgeProviderHealth[a] || {},
    o = (rP(i.openUntilMs) || 0) > r,
    s = {
      failureCount: Math.max(0, Math.round(i.failureCount || 0)) + 1,
      openUntilMs: Math.max(rP(i.openUntilMs) || 0, r + Bt),
      lastFailureAtMs: r,
      lastError: t?.message || String(t || ""),
    };
  return (
    (gc.sttDeadlineHedgeProviderHealth[a] = s),
    o ||
      Nx(
        "stt.batch.provider_circuit_opened",
        {
          provider: a,
          reason: n,
          failureCount: s.failureCount,
          cooldownMs: Bt,
          openUntilMs: s.openUntilMs,
          fallbackProvider: Wh(a, gc.config?.sourceLang),
          error: s.lastError,
        },
        { source: "offscreen", provider: a, level: "warn" },
      ),
    !0
  );
}
function Kh(e = "") {
  const t = LP(e),
    n = gc.sttDeadlineHedgeProviderHealth?.[t];
  return !(
    !n ||
    (rP(n.openUntilMs) || 0) > Date.now() ||
    ((gc.sttDeadlineHedgeProviderHealth[t] = {
      failureCount: 0,
      openUntilMs: 0,
      lastSuccessAtMs: Date.now(),
      lastError: "",
    }),
    Nx(
      "stt.batch.provider_circuit_closed",
      {
        provider: t,
        previousFailureCount: Math.max(0, Math.round(n.failureCount || 0)),
      },
      { source: "offscreen", provider: t },
    ),
    0)
  );
}
function zh(e = gc.config?.sourceLang) {
  return BP(Tt, e) && !$h(Tt) && Wy(Tt, "rescue")
    ? Tt
    : BP(wt, e) && Wy(wt, "rescue")
      ? wt
      : "";
}
function Qh(e = {}, t = "") {
  if (!gc.config?.syncEnabled || gc.config?.singleTabMediaSync) return !1;
  if ("off" === lD(gc.config?.llmFallbackMode)) return !1;
  const n = Array.isArray(e.chunks) ? e.chunks : [],
    a =
      "tab-capture" === e.sourceType ||
      "tab-capture" === e.audioInputMode ||
      (n.length > 0 && n.every((e) => "tab-capture" === Uf(e)));
  return (
    !((!ib(e) && !a) || e.batchSttProviderFailoverUsed) &&
    !!nD(LP(t || fg(e))) &&
    Boolean(zh(gc.config?.sourceLang))
  );
}
function Jh(e, t) {
  const n = LP(e),
    a = rP(t);
  if (!n || null === a || a <= 0) return;
  (gc.sttLatencySamplesByProvider &&
    "object" == typeof gc.sttLatencySamplesByProvider) ||
    (gc.sttLatencySamplesByProvider = {});
  const r = Array.isArray(gc.sttLatencySamplesByProvider[n])
    ? gc.sttLatencySamplesByProvider[n]
    : [];
  (r.push(a), (gc.sttLatencySamplesByProvider[n] = r.slice(-80)));
}
function Xh(e) {
  const t = LP(e),
    n = Array.isArray(gc.sttLatencySamplesByProvider?.[t])
      ? gc.sttLatencySamplesByProvider[t].filter(
          (e) => Number.isFinite(e) && e > 0,
        )
      : [];
  if (n.length < _t) return Math.max(1, Math.round(kt[t] || vt));
  const a = [...n].sort((e, t) => e - t),
    r = 0.9 * (a.length - 1),
    i = Math.floor(r),
    o = Math.ceil(r),
    s = a[i],
    l = a[o];
  return Math.round(s + (l - s) * (r - i));
}
function Zh(e = {}, t = Date.now()) {
  const n = fg(e);
  if (!Qh(e, n))
    return { enabled: !1, reason: "not-eligible", primaryProvider: n };
  const a = zk(bv(e), t);
  if (null === a)
    return {
      enabled: !1,
      reason: "display-deadline-unavailable",
      primaryProvider: n,
    };
  const r = zh(gc.config?.sourceLang);
  if (!r)
    return {
      enabled: !1,
      reason: "fallback-language-unsupported",
      primaryProvider: n,
    };
  const i = Math.round(Xh(r)),
    o = Math.round(Xh(n)),
    s = yw(),
    l = Math.max(1, Math.round(UE(s) ? Ct : So[s] || Ct)),
    c = Math.min(Rt, Math.max(0, Math.round(Sk()))),
    d = i + l + c + At,
    u = Math.max(0, Math.min(o, Math.max(0, a - xt))),
    m = Math.max(0, a - d),
    g = Boolean(e.mseAheadDecoded),
    p = g ? m : Math.min(u, m),
    f = Math.round(dP(i + It, Pt, Dt));
  return {
    enabled: !0,
    reason: "display-deadline",
    primaryProvider: n,
    fallbackProvider: r,
    fastLlmProvider: s,
    displayDeadlineMs: Math.max(0, Math.round(a)),
    displayDeadlineAtMs: t + Math.max(0, Math.round(a)),
    primarySttP90Ms: o,
    primaryObservationMs: u,
    deadlineOnlyHedge: g,
    fallbackSttP90Ms: i,
    fastLlmP90Ms: l,
    batchWaitMs: c,
    deliverySafetyMs: At,
    reserveMs: d,
    launchDelayMs: Math.max(0, Math.round(p)),
    launchAtMs: t + Math.max(0, Math.round(p)),
    latestSafeLaunchDelayMs: Math.max(0, Math.round(m)),
    latestSafeLaunchAtMs: t + Math.max(0, Math.round(m)),
    predictedRescueCompletionMs: Math.max(0, Math.round(p + d)),
    predictedRescueLatenessMs: Math.max(0, Math.round(p + d - a)),
    fallbackTimeoutMs: f,
  };
}
function Yh(e = {}, t = "") {
  const n = rP(e?.batchSttClientTimeoutMsOverride);
  if (null !== n) return Math.round(dP(n, 1e3, qi));
  if (!nD(LP(t || fg(e)))) return 0;
  const a = sp(e),
    r = rP(a?.start),
    i = Gk(Date.now()),
    o = i.mediaTime,
    s = $k(r, i);
  if (null === s || null === o) return yt;
  const l = Math.max(0, 1e3 * (s - o));
  return Math.round(dP(l - bt, vt, yt));
}
function eS(e = {}, t = "", n = {}) {
  const a = Gu(e, t);
  return {
    ...a,
    chunks: Array.isArray(a.chunks) ? [...a.chunks] : [],
    batchSttProviderOverride: LP(t),
    batchSttProviderSelectionLockReason: wD(
      n.providerSelectionLockReason || "",
    ),
    batchSttClientTimeoutMsOverride: rP(n.timeoutMs),
    speechIntervalOffsets: null,
    speechIntervalsPromise: null,
    sttDeadlineHedgeAttemptRole: n.role || "primary",
  };
}
function tS(e = {}) {
  const t =
      wD(gc.sessionId || "caption-session").slice(0, 80) || "caption-session",
    n =
      wD(e.id || "segment")
        .replace(/[^a-zA-Z0-9_.-]+/g, "-")
        .slice(0, 48) || "segment";
  return `${t}-hedge-${gc.timelineRevision}-${n}-${Date.now().toString(36)}`;
}
function nS(e = {}, t = {}) {
  if ("sql-wallet-v1" === gc.config?.walletBillingProtocol) return null;
  if (LP(t.fallbackProvider) !== ae) return null;
  if (e.sttDeadlineHedgeFallbackConnectionOutcomePromise)
    return e.sttDeadlineHedgeFallbackConnectionOutcomePromise;
  const n = Date.now();
  ((e.sttDeadlineHedgeFallbackPrefetchStatus = "pending"),
    (e.sttDeadlineHedgeFallbackPrefetchStartedAtMs = n));
  const a = Vd({ sessionId: tS(e) }).then(
    (t) => {
      const a = Math.max(0, Date.now() - n);
      return (
        (e.sttDeadlineHedgeFallbackPrefetchStatus = "ready"),
        (e.sttDeadlineHedgeFallbackPrefetchLatencyMs = a),
        (e.sttDeadlineHedgeFallbackTicketLatencyMs = Math.max(
          0,
          Math.round(rP(t?.ticketLatencyMs) || a),
        )),
        Nx(
          "stt.batch.deadline_hedge_prefetch_end",
          {
            segmentId: e.id,
            provider: ae,
            ok: !0,
            latencyMs: a,
            ticketLatencyMs: e.sttDeadlineHedgeFallbackTicketLatencyMs,
          },
          { source: "offscreen", provider: ae },
        ),
        { ok: !0, connection: t, latencyMs: a }
      );
    },
    (t) => {
      const a = Math.max(0, Date.now() - n);
      return (
        (e.sttDeadlineHedgeFallbackPrefetchStatus = "failed"),
        (e.sttDeadlineHedgeFallbackPrefetchLatencyMs = a),
        (e.sttDeadlineHedgeFallbackPrefetchError =
          t?.message || String(t || "")),
        Nx(
          "stt.batch.deadline_hedge_prefetch_end",
          {
            segmentId: e.id,
            provider: ae,
            ok: !1,
            latencyMs: a,
            error: e.sttDeadlineHedgeFallbackPrefetchError,
          },
          { source: "offscreen", provider: ae, level: "warn" },
        ),
        { ok: !1, error: t, latencyMs: a }
      );
    },
  );
  return ((e.sttDeadlineHedgeFallbackConnectionOutcomePromise = a), a);
}
function aS(e = {}, t = {}) {
  ((e.speechIntervalOffsets = t.speechIntervalOffsets || null),
    (e.speechIntervalsPromise = t.speechIntervalsPromise || null),
    (e.pcmWindowVadSharedState =
      t.pcmWindowVadSharedState || e.pcmWindowVadSharedState || null),
    (e.pcmWindowVadDecision =
      t.pcmWindowVadDecision || e.pcmWindowVadDecision || null));
}
async function rS(e = {}, t = {}) {
  if (e?.mseDecodePartial)
    return { kind: "decode-partial", text: "", speechDetected: !1, usable: !0 };
  if (
    (e?.data && "object" == typeof e.data && (e.data = BM(e.data, t)),
    MS(e?.data, t))
  )
    return {
      kind: "quality-rejected",
      text: "",
      speechDetected: !0,
      usable: !1,
    };
  const n = wD(e?.data?.text || e?.data?.transcript || "");
  if (n && !ED(n))
    return { kind: "text", text: n, speechDetected: !0, usable: !0 };
  await JM(t);
  const a = PM(t),
    r = Hv(e?.uploadChunks || []),
    i =
      t.pcmWindowVadDecision ||
      (r.length ? fy(r, { useRecentSilero: !ib(t) }) : null),
    o = Boolean((a || 0) > 0 || i?.isSpeech);
  return {
    kind: o ? "empty-speech" : "silence",
    text: n,
    speechDetected: o,
    usable: !1,
  };
}
async function iS({
  segment: e,
  provider: t,
  role: n,
  audioSpeed: a,
  timeoutMs: r = null,
  transcribe: i = fM,
} = {}) {
  const o = eS(e, t, { role: n, timeoutMs: r }),
    s = Date.now();
  o.sttDeadlineHedgeAttemptStartedAtMs = s;
  try {
    const e = await i(o, a, { role: n, provider: t }),
      r = await rS(e, o);
    return {
      ok: !0,
      role: n,
      provider: LP(t),
      result: e,
      attemptSegment: o,
      classification: r,
      latencyMs: Math.max(0, Date.now() - s),
      completedAtMs: Date.now(),
    };
  } catch (e) {
    return {
      ok: !1,
      role: n,
      provider: LP(t),
      error: e,
      attemptSegment: o,
      classification: {
        kind: "error",
        text: "",
        speechDetected: !1,
        usable: !1,
      },
      latencyMs: Math.max(0, Date.now() - s),
      completedAtMs: Date.now(),
    };
  }
}
function oS(e = "") {
  const t = LP(e);
  return t === Y
    ? Bn
    : t === ee
      ? 6666666666666667e-21
      : t === te
        ? Gn
        : t === ne
          ? 0
          : t === ae
            ? Wn
            : t === re
              ? Un
              : t === ie
                ? qn
                : t === oe
                  ? Fn
                  : _n;
}
function sS(e = {}) {
  if (!e.ok) return 0;
  const t = rP(e.result?.data?.sttCostUSD);
  return null !== t && t >= 0
    ? t
    : (Math.max(0, rP(e.result?.billableDurationMs) || 0) / 1e3) *
        oS(e.provider);
}
function lS(e = {}, t = {}) {
  const n = e.ok ? Math.max(0, rP(e.result?.billableDurationMs) || 0) : 0;
  ((e.ok &&
    (n > 0 ||
      "text" === e.classification?.kind ||
      "decode-partial" === e.classification?.kind)) ||
    ("fallback" === e.role && !e.ok && Nh(e.error))) &&
    Jh(e.provider, e.latencyMs);
  const a = sS(e);
  if ("fallback" === e.role && e.ok) {
    const e = gc.sttDeadlineHedgeUsage || (gc.sttDeadlineHedgeUsage = xy());
    ((e.completedFallbackCount += 1),
      (e.fallbackBillableAudioMs += n),
      (e.fallbackCostUSD = nP(e.fallbackCostUSD + a)));
  }
  (Vh(e),
    Nx(
      "stt.batch.deadline_hedge_attempt_end",
      {
        segmentId: e.attemptSegment?.id,
        role: e.role,
        provider: e.provider,
        ok: Boolean(e.ok),
        outcome: e.classification?.kind || (e.ok ? "result" : "error"),
        latencyMs: Math.round(e.latencyMs || 0),
        textChars: Array.from(e.classification?.text || "").length,
        billableDurationMs: Math.round(n),
        costUSD: nP(a),
        reserveMs: Math.round(t.reserveMs || 0),
        ticketPrefetchStatus:
          e.attemptSegment?.sttDeadlineHedgeFallbackPrefetchStatus || "",
        ticketPrefetchLatencyMs: Math.max(
          0,
          Math.round(
            rP(e.attemptSegment?.sttDeadlineHedgeFallbackPrefetchLatencyMs) ||
              0,
          ),
        ),
        ticketLatencyMs: Math.max(
          0,
          Math.round(
            rP(e.attemptSegment?.sttDeadlineHedgeFallbackTicketLatencyMs) || 0,
          ),
        ),
        error: e.error?.message || "",
      },
      {
        source: "offscreen",
        provider: e.provider,
        level: e.ok ? "info" : "warn",
      },
    ));
}
function cS(e, t = 1, n = {}) {
  const a = n.plan && "object" == typeof n.plan ? n.plan : null;
  let r = a || Zh(e);
  const i = "function" != typeof n.transcribe,
    o = i ? fM : n.transcribe;
  if (!r?.enabled) return o(e, t, { role: "primary", provider: fg(e) });
  const s = LP(r.primaryProvider || fg(e));
  let l = LP(r.fallbackProvider || Tt),
    c = l;
  i && nS(e, r);
  const d = Date.now();
  return (
    Nx(
      "stt.batch.deadline_hedge_scheduled",
      {
        segmentId: e.id,
        primaryProvider: s,
        fallbackProvider: l,
        mediaStartTime: aP(sp(e)?.start),
        mediaEndTime: aP(sp(e)?.end),
        displayDeadlineMs: Math.round(r.displayDeadlineMs || 0),
        launchDelayMs: Math.round(r.launchDelayMs || 0),
        latestSafeLaunchDelayMs: Math.round(r.latestSafeLaunchDelayMs || 0),
        launchAtMs: rP(r.launchAtMs),
        latestSafeLaunchAtMs: rP(r.latestSafeLaunchAtMs),
        reserveMs: Math.round(r.reserveMs || 0),
        primarySttP90Ms: Math.round(r.primarySttP90Ms || 0),
        primaryObservationMs: Math.round(r.primaryObservationMs || 0),
        deadlineOnlyHedge: Boolean(r.deadlineOnlyHedge),
        fallbackSttP90Ms: Math.round(r.fallbackSttP90Ms || 0),
        fastLlmP90Ms: Math.round(r.fastLlmP90Ms || 0),
        batchWaitMs: Math.round(r.batchWaitMs || 0),
        predictedRescueLatenessMs: Math.round(r.predictedRescueLatenessMs || 0),
      },
      { source: "offscreen", provider: s },
    ),
    new Promise((n, i) => {
      let u = !1,
        m = !1,
        g = !1,
        p = null,
        f = null,
        h = null,
        S = null,
        M = "";
      const v = () => {
          p && (clearTimeout(p), (p = null));
        },
        y = (t = "deadline-hedge") => {
          if (u || !PS(e, t)) return !1;
          ((u = !0), v());
          const n = new Error(
            "STT deadline hedge cancelled after timeline change",
          );
          return (
            (n.sttDeadlineHedgeCancelled = !0),
            (n.sttDeadlineHedgeExhausted = !0),
            i(n),
            !0
          );
        },
        b = (t) => {
          if (u || !t?.ok) return !1;
          if (
            ((u = !0),
            v(),
            aS(e, t.attemptSegment),
            (e.batchSttProviderOverride = t.provider),
            (e.sttDeadlineHedgeTriggered = m),
            (e.sttDeadlineHedgeRescue = m && "fallback" === t.role),
            (e.sttDeadlineHedgeTriggerReason = M),
            (e.sttDeadlineHedgeWinnerRole = t.role),
            (e.sttDeadlineHedgeWinnerProvider = t.provider),
            (e.sttDeadlineHedgeReserveMs = Math.round(r.reserveMs || 0)),
            m)
          ) {
            const e =
              gc.sttDeadlineHedgeUsage || (gc.sttDeadlineHedgeUsage = xy());
            ((e.lastWinnerProvider = t.provider),
              "fallback" === t.role
                ? (e.fallbackWinCount += 1)
                : (e.primaryWinAfterLaunchCount += 1));
          }
          return (
            Nx(
              "stt.batch.deadline_hedge_winner",
              {
                segmentId: e.id,
                role: t.role,
                provider: t.provider,
                fallbackStarted: m,
                rescue: m && "fallback" === t.role,
                triggerReason: M,
                elapsedMs: Math.max(0, Date.now() - d),
                resultLatencyMs: Math.round(t.latencyMs || 0),
                displayDeadlineAtMs: rP(r.displayDeadlineAtMs),
                remainingDisplayMs:
                  null === rP(r.displayDeadlineAtMs)
                    ? null
                    : Math.round(r.displayDeadlineAtMs - Date.now()),
                textChars: Array.from(t.classification?.text || "").length,
                plannedFallbackProvider: l,
                actualFallbackProvider:
                  "fallback" === t.role ? t.provider : m ? c : "",
                compatFallbackStarted: g,
                ticketPrefetchStatus:
                  e.sttDeadlineHedgeFallbackPrefetchStatus || "",
                ticketPrefetchLatencyMs: Math.max(
                  0,
                  Math.round(
                    rP(e.sttDeadlineHedgeFallbackPrefetchLatencyMs) || 0,
                  ),
                ),
                ticketLatencyMs: Math.max(
                  0,
                  Math.round(
                    rP(e.sttDeadlineHedgeFallbackTicketLatencyMs) || 0,
                  ),
                ),
              },
              {
                source: "offscreen",
                provider: t.provider,
                level: "fallback" === t.role ? "warn" : "info",
              },
            ),
            n(t.result),
            !0
          );
        },
        T = () => {
          if (u) return;
          ((u = !0), v());
          const e =
            f?.error || h?.error || new Error("STT deadline hedge exhausted");
          ((e.sttDeadlineHedgeExhausted = Boolean(m)), i(e));
        },
        w = (t) => {
          if ((lS(t, r), u))
            ((t) => {
              Nx(
                "stt.batch.deadline_hedge_loser_ignored",
                {
                  segmentId: e.id,
                  role: t.role,
                  provider: t.provider,
                  ok: Boolean(t.ok),
                  outcome: t.classification?.kind || "error",
                  latencyMs: Math.round(t.latencyMs || 0),
                  winnerProvider: e.sttDeadlineHedgeWinnerProvider || "",
                },
                { source: "offscreen", provider: t.provider },
              );
            })(t);
          else if (
            !y("stt-deadline-hedge-result") &&
            ("primary" === t.role
              ? (f = t)
              : g && t.provider === wt
                ? (S = t)
                : (h = t),
            !t.ok ||
              (!t.classification?.usable &&
                "text" !== t.classification?.kind) ||
              !b(t))
          ) {
            if (
              "primary" !== t.role ||
              m ||
              ("empty-speech" !== t.classification?.kind &&
                (t.ok || !Nh(t.error)))
            ) {
              if ("primary" === t.role && !t.ok && !m) return void T();
              "fallback" === t.role &&
              t.provider === ae &&
              t.ok &&
              "empty-speech" === t.classification?.kind &&
              !f
                ? k("speechEngineA-empty-with-speech")
                : "fallback" === t.role &&
                  t.provider === ae &&
                  !t.ok &&
                  Nh(t.error) &&
                  k("speechEngineA-transient-error");
            } else
              C(t.ok ? "primary-empty-with-speech" : "primary-transient-error");
            (() => {
              if (u) return;
              const e = [f, h, S].filter(Boolean),
                t = e
                  .filter((e) => e.ok && "text" === e.classification?.kind)
                  .sort((e, t) => e.completedAtMs - t.completedAtMs)[0];
              if (t && b(t)) return;
              const n = e.find(
                (e) => e.ok && "decode-partial" === e.classification?.kind,
              );
              if (n && b(n)) return;
              if (h?.ok && "silence" === h.classification?.kind && f)
                return void b(h);
              if (f?.ok && "silence" === f.classification?.kind && !m)
                return void b(f);
              const a = Boolean(f),
                r = !m || Boolean(h),
                i = !g || Boolean(S);
              if (!a || !r || !i) return;
              const o = e
                .filter((e) => e.ok)
                .sort((e, t) => e.completedAtMs - t.completedAtMs)[0];
              o ? b(o) : T();
            })();
          }
        },
        k = (n = "speechEngineA-empty-with-speech") => {
          if (u || g) return !1;
          if (!Wy(wt, "rescue")) return !1;
          if (c !== ae) return !1;
          if (!BP(wt, gc.config?.sourceLang)) return !1;
          if (y("stt-deadline-hedge-compat-fallback")) return !1;
          g = !0;
          const a =
            gc.sttDeadlineHedgeUsage || (gc.sttDeadlineHedgeUsage = xy());
          return (
            (a.compatLaunchedCount =
              Math.max(0, Math.round(a.compatLaunchedCount || 0)) + 1),
            Nx(
              "stt.batch.deadline_hedge_compat_launched",
              {
                segmentId: e.id,
                reason: n,
                primaryProvider: s,
                firstFallbackProvider: c,
                fallbackProvider: wt,
                elapsedMs: Math.max(0, Date.now() - d),
                remainingDisplayMs:
                  null === rP(r.displayDeadlineAtMs)
                    ? null
                    : Math.round(r.displayDeadlineAtMs - Date.now()),
              },
              { source: "offscreen", provider: wt, level: "warn" },
            ),
            iS({
              segment: e,
              provider: wt,
              role: "fallback",
              audioSpeed: t,
              timeoutMs: Math.max(Pt, Math.round(r.fallbackTimeoutMs || 0)),
              transcribe: o,
            }).then(w),
            !0
          );
        },
        C = (n = "display-deadline") => {
          if (u || m) return !1;
          if (y("stt-deadline-hedge-fallback")) return !1;
          ((l = LP(r.fallbackProvider || l || Tt)),
            (c = l),
            l === ae &&
              "failed" === e.sttDeadlineHedgeFallbackPrefetchStatus &&
              BP(wt, gc.config?.sourceLang) &&
              (c = wt),
            (m = !0),
            (M = n),
            (e.walletSttRescueReason = /empty|speech|quality/.test(n)
              ? "quality"
              : /error/.test(n)
                ? "error"
                : "latency"),
            v(),
            (e.batchSttProviderFailoverUsed = !0),
            (e.sttDeadlineHedgeTriggered = !0));
          const a =
            gc.sttDeadlineHedgeUsage || (gc.sttDeadlineHedgeUsage = xy());
          return (
            (a.launchedCount += 1),
            (a.lastTriggerReason = n),
            Nx(
              "stt.batch.deadline_hedge_launched",
              {
                segmentId: e.id,
                reason: n,
                primaryProvider: s,
                fallbackProvider: c,
                plannedFallbackProvider: l,
                elapsedMs: Math.max(0, Date.now() - d),
                remainingDisplayMs:
                  null === rP(r.displayDeadlineAtMs)
                    ? null
                    : Math.round(r.displayDeadlineAtMs - Date.now()),
                reserveMs: Math.round(r.reserveMs || 0),
                primarySttP90Ms: Math.round(r.primarySttP90Ms || 0),
                primaryObservationMs: Math.round(r.primaryObservationMs || 0),
                fallbackTimeoutMs: Math.round(r.fallbackTimeoutMs || Pt),
                ticketPrefetchStatus:
                  e.sttDeadlineHedgeFallbackPrefetchStatus || "",
                ticketPrefetchLatencyMs: Math.max(
                  0,
                  Math.round(
                    rP(e.sttDeadlineHedgeFallbackPrefetchLatencyMs) || 0,
                  ),
                ),
                ticketLatencyMs: Math.max(
                  0,
                  Math.round(
                    rP(e.sttDeadlineHedgeFallbackTicketLatencyMs) || 0,
                  ),
                ),
                ticketPrefetchError:
                  e.sttDeadlineHedgeFallbackPrefetchError || "",
              },
              { source: "offscreen", provider: c, level: "warn" },
            ),
            iS({
              segment: e,
              provider: c,
              role: "fallback",
              audioSpeed: t,
              timeoutMs: r.fallbackTimeoutMs || Pt,
              transcribe: o,
            }).then(w),
            !0
          );
        },
        A = () => {
          if (u || m) return;
          if (y("stt-deadline-hedge-timer")) return;
          const t = Math.max(0, Math.round(r.launchDelayMs || 0)),
            n = rP(r.latestSafeLaunchAtMs),
            i = null === n ? t : Math.max(0, Math.round(n - Date.now())),
            o = Math.min(t, i);
          o <= Et
            ? C("display-deadline")
            : (p = setTimeout(() => {
                if (((p = null), !u && !m)) {
                  if (!a) {
                    const t = Zh(e);
                    if (!t.enabled) return;
                    ((r = t), (l = LP(t.fallbackProvider || l)));
                    const n = rP(t.latestSafeLaunchAtMs),
                      a =
                        null === n
                          ? Math.max(0, Math.round(t.launchDelayMs || 0))
                          : Math.max(0, Math.round(n - Date.now()));
                    if (
                      Math.min(
                        Math.max(0, Math.round(t.launchDelayMs || 0)),
                        a,
                      ) > Et
                    )
                      return void A();
                  }
                  C("display-deadline");
                }
              }, o));
        },
        R = iS({
          segment: e,
          provider: s,
          role: "primary",
          audioSpeed: t,
          transcribe: o,
        });
      (A(), R.then(w));
    })
  );
}
function dS(e, t, n) {
  if (
    n?.sttTransportFailure ||
    /^(wallet_stt_parent_|wallet_request_conflict|wallet_session_changed|wallet_operation_|wallet_reply_)/.test(
      n?.code || "",
    )
  )
    return !1;
  if (!e || !t || gc.isStopping || !1 === gc.acceptingNewSttWork) return !1;
  const a = Gh(t, n);
  if (!a) return !1;
  const r = LP(t.lastBatchSttAttemptProvider || fg(t));
  return (
    jh(r, n, "segment-provider-failover"),
    (t.batchSttProviderOverride = a),
    (t.lastBatchSttAttemptProvider = ""),
    (t.batchSttProviderFailoverUsed = !0),
    (t.transientSttRetryAttempts = 0),
    (t.mseBackfillUrgent = !0),
    up(t, "stt-provider-failover-wait"),
    Iu(t, "retry-wait", { outcome: "stt-provider-failover" }),
    nh(t, "stt-provider-failover-wait", {
      active: !0,
      reason: n?.message || String(n || "transient-stt-error"),
    }),
    Nx(
      "stt.batch.provider_failover_scheduled",
      {
        segmentId: t.id,
        fromProvider: r,
        toProvider: a,
        delayMs: Mt,
        mediaStartTime: aP(sp(t)?.start),
        mediaEndTime: aP(sp(t)?.end),
        error: n?.message || String(n || ""),
      },
      { source: "offscreen", level: "warn", provider: a },
    ),
    setTimeout(() => {
      if (
        gc.isStopping ||
        !1 === gc.acceptingNewSttWork ||
        PS(t, "stt-provider-failover")
      )
        return (
          lp(t, "stt-provider-failover-cancelled"),
          _u(t, "stt-provider-failover-cancelled"),
          void nh(t, "ignored", {
            done: !0,
            active: !1,
            reason: "stt-provider-failover-cancelled",
          })
        );
      (e.queue.push(t),
        up(t, "queued"),
        Iu(t, "queued", { outcome: "stt-provider-failover" }),
        nh(t, "queued", { active: !0, reason: "stt-provider-failover" }),
        Nx(
          "stt.batch.provider_failover_enqueued",
          { segmentId: t.id, provider: a, queuedSegments: e.queue.length },
          { source: "offscreen", level: "warn", provider: a },
        ),
        hS());
    }, Mt),
    !0
  );
}
function uS(e, t, n) {
  if (!e || !t || gc.isStopping || !1 === gc.acceptingNewSttWork) return !1;
  if (!Nh(n)) return !1;
  const a = Math.max(0, Math.round(Number(t.transientSttRetryAttempts) || 0));
  if (a >= 2) return !1;
  const r = a + 1,
    i = St[Math.min(r - 1, St.length - 1)];
  return (
    (t.transientSttRetryAttempts = r),
    (t.mseBackfillUrgent = !0),
    up(t, "stt-retry-wait"),
    Iu(t, "retry-wait", { outcome: "transient-stt-error" }),
    nh(t, "stt-retry-wait", {
      active: !0,
      reason: n?.message || String(n || "transient-stt-error"),
    }),
    Nx(
      "stt.batch.transient_retry_scheduled",
      {
        segmentId: t.id,
        attempt: r,
        maxAttempts: 2,
        delayMs: i,
        mediaStartTime: aP(sp(t)?.start),
        mediaEndTime: aP(sp(t)?.end),
        error: n?.message || String(n || ""),
      },
      { source: "offscreen", level: "warn" },
    ),
    setTimeout(() => {
      if (
        gc.isStopping ||
        !1 === gc.acceptingNewSttWork ||
        PS(t, "transient-retry")
      )
        return (
          lp(t, "stt-retry-cancelled"),
          _u(t, "stt-retry-cancelled"),
          void nh(t, "ignored", {
            done: !0,
            active: !1,
            reason: "transient-retry-cancelled",
          })
        );
      (e.queue.push(t),
        up(t, "queued"),
        Iu(t, "queued", { outcome: "transient-stt-retry" }),
        nh(t, "queued", { active: !0, reason: "transient-stt-retry" }),
        Nx(
          "stt.batch.transient_retry_enqueued",
          { segmentId: t.id, attempt: r, queuedSegments: e.queue.length },
          { source: "offscreen", level: "warn" },
        ),
        hS());
    }, i),
    !0
  );
}
function mS() {
  return gc.activeBatchSttUploads instanceof Map
    ? gc.activeBatchSttUploads.size
    : 0;
}
function gS(e = {}) {
  gc.activeBatchSttUploads instanceof Map ||
    (gc.activeBatchSttUploads = new Map());
  const t = ++gc.batchSttUploadSequence,
    n = new AbortController(),
    a = {
      uploadId: t,
      controller: n,
      segmentId: e.id ?? null,
      sessionId: wD(e.sessionId || gc.sessionId || ""),
      timelineRevision: rP(e.timelineRevision) ?? gc.timelineRevision,
      provider: LP(fg(e)),
      startedAtMs: Date.now(),
      abortReason: "",
    };
  return (
    gc.activeBatchSttUploads.set(t, a),
    (e.activeBatchSttUploadId = t),
    (e.sttUploadAbortController = n),
    a
  );
}
function pS(e = {}, t = null) {
  const n = rP(t?.uploadId ?? e.activeBatchSttUploadId);
  return (
    null !== n &&
      gc.activeBatchSttUploads instanceof Map &&
      gc.activeBatchSttUploads.delete(n),
    e.sttUploadAbortController === t?.controller &&
      delete e.sttUploadAbortController,
    delete e.activeBatchSttUploadId,
    mS()
  );
}
function fS(e = "timeline-reset", t = gc.timelineRevision) {
  if (
    !(gc.activeBatchSttUploads instanceof Map && gc.activeBatchSttUploads.size)
  )
    return 0;
  const n = rP(t) ?? gc.timelineRevision;
  let a = 0;
  for (const t of gc.activeBatchSttUploads.values())
    (t.timelineRevision === n && t.sessionId === wD(gc.sessionId || "")) ||
      t.controller.signal.aborted ||
      ((t.abortReason = e), t.controller.abort(), (a += 1));
  return (
    a &&
      Nx(
        "stt.batch.active_uploads_abort_requested",
        {
          reason: e,
          currentRevision: n,
          currentSessionId: wD(gc.sessionId || ""),
          aborted: a,
          activeUploads: mS(),
        },
        { source: "offscreen", level: "warn" },
      ),
    a
  );
}
function hS() {
  const e = sy();
  if (gc.isStopping || !1 === gc.acceptingNewSttWork) return;
  if (NP(pg())) return void SS(e);
  e.activeUploads = mS();
  const t = Vm();
  for (; e.queue.length && mS() < t; ) {
    const t = Uh(e);
    if (!t) break;
    const n = gS(t);
    ((e.activeUploads = mS()),
      (e.isUploading = !0),
      up(t, "stt-uploading"),
      Iu(t, "uploading"),
      nh(t, "stt-uploading"),
      bS(t)
        .catch((n) => {
          const a = aD(t.lastBatchSttAttemptProvider || fg(t));
          if (n?.sttRequestOwnershipCancelled)
            return (
              lp(t, "stale-request-owner"),
              _u(t, "stale-request-owner"),
              void nh(t, "ignored", {
                done: !0,
                active: !1,
                reason: "stale-request-owner",
              })
            );
          if (n?.sttStopCancelled || PS(t, "upload-error"))
            return (
              lp(t, "capture-stop"),
              _u(t, "capture-stop"),
              void nh(t, "ignored", {
                done: !0,
                active: !1,
                reason: "capture-stop",
              })
            );
          if (
            (console.warn(`[offscreen] ${a} STT failed:`, n.message),
            n?.sttDeadlineHedgeCancelled)
          )
            return (
              lp(t, "stt-deadline-hedge-cancelled"),
              _u(t, "stt-deadline-hedge-cancelled"),
              void nh(t, "ignored", {
                done: !0,
                active: !1,
                reason: "timeline-changed",
              })
            );
          if (Ax(n))
            return (
              lp(t, "billing-lease-terminal"),
              Iu(t, "failed", { outcome: "billing-lease-terminal" }),
              nh(t, "error", { done: !0, active: !1, reason: n.message }),
              void qx(n, "stt-paid-endpoint")
            );
          if (!n?.sttDeadlineHedgeExhausted) {
            if (dS(e, t, n)) return;
            if (uS(e, t, n)) return;
          }
          (lp(t, "stt-error"),
            Iu(t, "failed", { outcome: "stt-terminal-error" }) ||
              nx("stt-terminal-error", 1, sp(t)),
            Au(t, "error") || _u(t, "stt-error"),
            nh(t, "error", { done: !0, active: !1, reason: n.message }),
            yP(`${a} 轉錄失敗: ${n.message}`));
        })
        .finally(() => {
          pS(t, n);
          const e = sy();
          ((e.activeUploads = mS()),
            (e.isUploading = e.activeUploads > 0),
            e.queue.length && !1 !== gc.acceptingNewSttWork && !gc.isStopping
              ? hS()
              : e.isUploading || NE());
        }));
  }
}
function SS(e = sy()) {
  if (!gc.isStopping && !1 !== gc.acceptingNewSttWork)
    for (
      e.activeUploads = Math.max(0, Number(e.activeUploads) || 0);
      e.queue.length && e.activeUploads < jP();

    ) {
      const t = Uh(e);
      if (!t) break;
      ((e.activeUploads += 1),
        (e.isUploading = !0),
        up(t, "integrated-uploading"),
        Iu(t, "uploading"),
        nh(t, "integrated-uploading"),
        kS(t)
          .catch((e) => {
            const n = aD(pg());
            if ((console.warn(`[offscreen] ${n} failed:`, e.message), Ax(e)))
              return (
                lp(t, "billing-lease-terminal"),
                Iu(t, "failed", { outcome: "billing-lease-terminal" }),
                nh(t, "error", { done: !0, active: !1, reason: e.message }),
                void qx(e, "integrated-paid-endpoint")
              );
            (lp(t, "integrated-error"),
              _u(t, "integrated-error"),
              nh(t, "error", { done: !0, active: !1, reason: e.message }),
              yP(`${n} 轉錄失敗: ${e.message}`));
          })
          .finally(() => {
            ((e.activeUploads = Math.max(
              0,
              (Number(e.activeUploads) || 1) - 1,
            )),
              (e.isUploading = e.activeUploads > 0),
              e.queue.length && !1 !== gc.acceptingNewSttWork && !gc.isStopping
                ? SS(e)
                : e.isUploading || NE());
          }));
    }
}
function MS(e = {}, t = {}) {
  if (!1 === e?.sttQuality?.accepted) return e.sttQuality;
  const n = Array.from(String(e?.text || e?.transcript || "").trim()).length,
    a = Number(t.durationMs || t.audioDurationMs || t.sttSegmentDurationMs);
  if (!Number.isFinite(a) || a <= 0) return null;
  const r = Math.max(256, Math.ceil((a / 1e3) * 60 + 64));
  return n > r
    ? {
        accepted: !1,
        reason: "impossible-text-density",
        characters: n,
        maxCharacters: r,
      }
    : null;
}
function vS(e, t) {
  const n = MS(e, t);
  return (
    !!n &&
    (Iu(t, "failed", { outcome: "stt-quality-rejected" }),
    nx("stt-quality-rejected", 1, sp(t)),
    nh(t, "error", { done: !0, active: !1, reason: "stt-quality-rejected" }),
    Nx(
      "stt.batch.quality_rejected",
      {
        segmentId: t.id,
        reason: n.reason,
        textChars: n.characters,
        maxCharacters: n.maxCharacters,
        durationMs: t.durationMs,
      },
      { source: "offscreen", level: "warn" },
    ),
    vP("stt-quality-rejected", "這小段語音辨識異常，已略過，繼續處理後續字幕"),
    !0)
  );
}
async function yS(e, t) {
  const n = t?.transcriptionSegment || e,
    a = MS(t?.data, n);
  if (!a) return { recovered: !1, reason: "not-rejected" };
  const r = nE(e),
    i = Y,
    o = (t) => (
      Nx(
        "stt.batch.quality_rescue_skipped",
        { segmentId: e.id, reason: t },
        { source: "offscreen", level: "warn" },
      ),
      { recovered: !1, reason: t }
    );
  if (
    gc.isStopping ||
    !1 === gc.acceptingNewSttWork ||
    sE(r, "before-quality-rescue", { log: !1 })
  )
    return o("stale-or-stopped");
  if (
    "sql-wallet-v1" !== gc.config?.walletBillingProtocol ||
    !ib(e) ||
    LP(gc.config.sttProvider) !== oe ||
    LP(fg(n)) !== oe ||
    "fallback" === n.sttDeadlineHedgeAttemptRole
  )
    return o("not-primary-speechEngineI");
  if (
    !1 === gc.config.sttEmptyRetryEnabled ||
    !Wy(i, "rescue") ||
    !BP(i, gc.config.sourceLang)
  )
    return o("not-authorized");
  const s = t?.data?.receipt?.requestId,
    l = gc.walletSttRequestOwners?.get(s);
  if (!String(s || "").startsWith("stt:") || !l)
    return o("missing-primary-receipt");
  const c = l.deadlineAt - performance.now();
  if (!Number.isFinite(c) || c < 1e3) return o("parent-deadline");
  const d = sp(e);
  if (!d || !Number.isFinite(d.start) || !Number.isFinite(d.end))
    return o("missing-audio-range");
  const u = JSON.stringify(rE(r));
  let m = gc.sttQualityRecoveryBudget;
  (m && m.ownerKey === u) ||
    (m = gc.sttQualityRecoveryBudget =
      { ownerKey: u, attempts: [], ranges: new Set() });
  const g = `${r.timelineRevision}:${Math.round(1e3 * d.start)}:${Math.round(1e3 * d.end)}`,
    p = Date.now();
  if (
    ((m.attempts = m.attempts.filter((e) => p - e < 6e4)),
    e.qualitySttRescueUsed || m.ranges.has(g))
  )
    return o("already-attempted");
  if (m.attempts.length >= 3) return o("quality-rescue-rate-limit");
  ((e.qualitySttRescueUsed = !0),
    m.attempts.push(p),
    m.ranges.add(g),
    m.ranges.size > 512 && m.ranges.delete(m.ranges.values().next().value));
  const f = eS(e, i, {
    role: "fallback",
    providerSelectionLockReason: "quality-rejected-rescue",
    timeoutMs: Math.min(1e4, c),
  });
  ((f.walletSttRescueReason = "quality"),
    (f.sttDeadlineHedgeAttemptStartedAtMs = p),
    nh(e, "stt-uploading", { reason: "stt-quality-rescue" }),
    Nx(
      "stt.batch.quality_rescue_started",
      {
        segmentId: e.id,
        fromProvider: oe,
        toProvider: i,
        reason: a.reason,
        textChars: a.characters,
        parentRequestId: s,
        timeoutMs: f.batchSttClientTimeoutMsOverride,
      },
      { source: "offscreen", level: "warn" },
    ),
    vP("stt-quality-rescue", "這小段辨識異常，正在嘗試一次辨識救援"));
  try {
    const t = await fM(f, 1);
    if (
      gc.isStopping ||
      !1 === gc.acceptingNewSttWork ||
      sE(r, "after-quality-rescue", { log: !1 })
    )
      return o("stale-or-stopped");
    const n = t.transcriptionSegment || f,
      a = wD(t.data?.text || t.data?.transcript || ""),
      s = MS(t.data, n),
      l = Boolean(a && !s && !t.mseDecodePartial);
    return (
      Nx(
        "stt.batch.quality_rescue_completed",
        {
          segmentId: e.id,
          recovered: l,
          reason: s?.reason || (a ? "accepted" : "empty"),
          latencyMs: Date.now() - p,
          requestId: t.data?.receipt?.requestId || "",
        },
        { source: "offscreen", level: l ? "info" : "warn" },
      ),
      l
        ? { recovered: !0, result: t, transcriptionSegment: n, provider: i }
        : { recovered: !1, reason: "rescue-unusable" }
    );
  } catch (t) {
    if (Ax(t) || t?.sttStopCancelled || gc.isStopping) throw t;
    return (
      Nx(
        "stt.batch.quality_rescue_failed",
        {
          segmentId: e.id,
          code: t.code || "stt-rescue-failed",
          latencyMs: Date.now() - p,
        },
        { source: "offscreen", level: "warn" },
      ),
      { recovered: !1, reason: "rescue-failed" }
    );
  }
}
async function bS(e) {
  if (PS(e, "before-upload"))
    return void nh(e, "ignored", {
      done: !0,
      active: !1,
      reason: "before-upload",
    });
  if (NP(pg())) return void (await kS(e));
  e.pcmWindowVadSharedState = e.pcmWindowVadSharedState || {};
  const t = qM(e);
  let n = 1,
    a = await cS(e, t),
    r = a?.transcriptionSegment || e;
  if (
    ((e.speechIntervalOffsets =
      r.speechIntervalOffsets || e.speechIntervalOffsets || null),
    (e.speechIntervalsPromise =
      r.speechIntervalsPromise || e.speechIntervalsPromise || null),
    PS(e, "after-upload"))
  )
    return void nh(e, "ignored", {
      done: !0,
      active: !1,
      reason: "after-upload",
    });
  if (a?.mseDecodePartial)
    return (
      await wS(e, a),
      void nh(e, "partial-decode", { done: !0, active: !1 })
    );
  ((a.data = Rv(a.data || {}, r)),
    (a.data = nv(a.data || {}, r, a.appliedSpeed)),
    (a.data = BM(a.data || {}, r)));
  let i = wD(a.data?.text || a.data?.transcript || "");
  if ((IM(e, a, { retry: !1, text: i }), MS(a.data, r))) {
    const t = a.data,
      o = await yS(e, a);
    if (PS(e, "after-quality-rescue")) return;
    if (!o.recovered) return void vS(a.data, e);
    const s = Math.max(0, Number(a.billableDurationMs) || 0);
    if (
      ((n += 1),
      (a = o.result),
      (r = o.transcriptionSegment),
      (e.batchSttProviderOverride = o.provider),
      (e.speechIntervalOffsets = r.speechIntervalOffsets || null),
      (e.speechIntervalsPromise = r.speechIntervalsPromise || null),
      (a.data = Rv(a.data || {}, r)),
      (a.data = nv(a.data, r, a.appliedSpeed)),
      (a.data = BM(a.data, r)),
      (a.billableDurationMs =
        Math.max(0, Number(a.billableDurationMs) || 0) + s),
      (i = wD(a.data?.text || a.data?.transcript || "")),
      IM(e, a, { retry: !0, text: i }),
      !i)
    )
      return void vS(t, e);
    if (vS(a.data, e)) return;
  }
  let o = null;
  if (!i) {
    (await JM(e), (o = DM(e)));
    const n = KP(t, fg(e));
    n > 1 &&
      !1 !== (gc.config?.sttEmptyRetryEnabled ?? !0) &&
      Math.max(0, rP(e.durationMs) || 0) >= Ga &&
      !o.confirmed &&
      Nx(
        "stt.batch.empty_retry_suppressed",
        {
          segmentId: e.id,
          durationMs: Math.round(e.durationMs || 0),
          audioSpeed: n,
          reason: o.source,
          speechIntervalCount: o.intervalCount,
          maxSpeechIntervalMs: Math.round(o.maxSpeechIntervalMs),
          maxSileroSpeechRunMs: Math.round(o.maxSileroSpeechRunMs),
        },
        { source: "offscreen" },
      );
  }
  if (!i && wM(e, t)) {
    const s = o || DM(e);
    Nx(
      "stt.batch.empty_retry",
      {
        segmentId: e.id,
        durationMs: Math.round(e.durationMs || 0),
        fromAudioSpeed: t,
        toAudioSpeed: 1,
        firstAttemptLatencyMs: a.uploadLatencyMs,
        firstAttemptBillableDurationMs: Math.round(a.billableDurationMs || 0),
        speechEvidenceSource: s.source,
        maxSpeechIntervalMs: Math.round(s.maxSpeechIntervalMs),
        maxSileroSpeechRunMs: Math.round(s.maxSileroSpeechRunMs),
      },
      { source: "offscreen", level: "warn" },
    );
    const l = Math.max(0, rP(a.billableDurationMs) || 0);
    e.emptySttRetryActive = !0;
    try {
      ((n += 1), (a = await fM(e, 1)));
    } finally {
      e.emptySttRetryActive = !1;
    }
    if (PS(e, "after-retry"))
      return void nh(e, "ignored", {
        done: !0,
        active: !1,
        reason: "after-retry",
      });
    if (a?.mseDecodePartial)
      return (
        await wS(e, a),
        void nh(e, "partial-decode", { done: !0, active: !1 })
      );
    ((r = a?.transcriptionSegment || e),
      (e.speechIntervalOffsets =
        r.speechIntervalOffsets || e.speechIntervalOffsets || null),
      (e.speechIntervalsPromise =
        r.speechIntervalsPromise || e.speechIntervalsPromise || null),
      (a.data = Rv(a.data || {}, r)),
      (a.data = nv(a.data || {}, r, a.appliedSpeed)),
      (a.data = BM(a.data || {}, r)),
      (i = wD(a.data?.text || a.data?.transcript || "")),
      (a.billableDurationMs += l),
      IM(e, a, { retry: !0, text: i }));
  }
  let s = null;
  if (!i) {
    const t = Math.max(0, rP(a.billableDurationMs) || 0);
    ((s = await RM(e, a)),
      s.result &&
        ((n += 1),
        (a = s.result),
        (r = s.transcriptionSegment || e),
        (e.batchSttProviderOverride = s.decision.provider),
        (e.speechIntervalOffsets =
          r.speechIntervalOffsets || e.speechIntervalOffsets || null),
        (e.speechIntervalsPromise =
          r.speechIntervalsPromise || e.speechIntervalsPromise || null),
        (a.data = Rv(a.data || {}, r)),
        (a.data = nv(a.data || {}, r, a.appliedSpeed)),
        (a.data = BM(a.data || {}, r)),
        (i = wD(a.data?.text || a.data?.transcript || "")),
        (a.billableDurationMs = Math.max(0, rP(a.billableDurationMs) || 0) + t),
        IM(e, a, { retry: !0, text: i })));
  }
  if (vS(a.data, r)) return;
  ((e.sttAudioSpeed = a.appliedSpeed),
    (e.billableDurationMs = a.billableDurationMs));
  const l = Math.max(
    0,
    rP(a.transcriptionDurationMs) ||
      oy(a.uploadChunks) ||
      rP(e.durationMs) ||
      0,
  );
  ((e.durationMs = l),
    (e.chunks = ry(
      a.uploadChunks,
      a.appliedSpeed,
      Math.max(0, a.billableDurationMs - l / a.appliedSpeed),
    )),
    (YM(e) || e.msePcmPrimaryCoreChunks?.length) &&
      ((e.msePcmPrimaryContextOverlap = Boolean(a.msePcmPrimaryContextApplied)),
      (e.msePcmPrimaryContextSeconds = a.msePcmPrimaryContextApplied
        ? Math.max(0, rP(r.msePcmPrimaryContextSeconds) || 0)
        : 0),
      (e.msePcmPrimaryContextStartMediaTime = sP(
        e.chunks.map((e) => rP(e?.sourceMediaStartTime)),
      )),
      (e.sttProviderAudioView =
        a.sttProviderAudioView ||
        (a.msePcmPrimaryContextApplied ? "context-plus-core" : "core")),
      delete e.msePcmPrimaryCoreChunks),
    await JM(e));
  const c = ov(e, a.data || {}, a.appliedSpeed);
  (c.count ? iv(e, c.ranges) : om(e),
    Iu(e, "transcribed", {
      outcome: c.count ? "partial-text-speech-retry" : i ? "text" : "silence",
    }));
  const d = qv(e);
  if (!Av(a.data, e, { sentBaseMs: d, uploadLatencyMs: a.uploadLatencyMs })) {
    const t = Boolean(i && ED(i)),
      r = EM({
        text: i,
        detectedSpeechIntervals: Array.isArray(
          e.speechIntervalOffsets?.intervals,
        )
          ? e.speechIntervalOffsets.intervals
          : [],
        partialSpeechRetryCount: c.count,
        alternateRescue: s,
      });
    if (r.handled) {
      const t = Iu(e, r.stage, { outcome: r.outcome });
      t || nx(r.outcome, 1, sp(e));
      const i = sp(e);
      Nx(
        r.eventType,
        {
          segmentId: e.id,
          reason: r.outcome,
          attempts: n,
          alternateProvider: s?.decision?.provider || "",
          alternateCompletedEmpty: r.playbackReady,
          audioSpeed: a.appliedSpeed,
          billableDurationMs: Math.round(a.billableDurationMs || 0),
          sourceMediaStartTime: aP(
            i?.sourceMediaStartTime ?? i?.mediaTime ?? i?.start,
          ),
          sourceMediaEndTime: aP(
            i?.sourceMediaEndTime ?? i?.mediaTimeEnd ?? i?.end,
          ),
          coverageClaimsUpdated: t,
        },
        { source: "offscreen", level: r.playbackReady ? "info" : "warn" },
      );
      const o = Dp(r.readinessReason, _p());
      return (
        await TS(o, bv(e), r.readinessReason),
        void nh(e, r.pipelineStage, { done: !0, active: !1, reason: r.outcome })
      );
    }
    if (
      !Au(
        e,
        t
          ? "filtered-noise"
          : i
            ? "retry-no-translation-needed"
            : "retry-silence",
      )
    ) {
      const n = t ? "filtered-noise" : i ? "no-translation-needed" : "silence";
      Iu(e, "subtitle-ready", { outcome: n }) ||
        fx(sp(e) || {}, {
          source: "stt-result",
          reason: n,
          status: "complete",
        });
    }
    const o = Dp("stt-coverage-ready", _p());
    (await TS(o, bv(e), "stt-coverage-ready"),
      nh(e, "no-text", {
        done: !0,
        active: !1,
        reason: t ? "filtered-noise" : i ? "no-translation-needed" : "silence",
      }));
  }
}
async function TS(e = null, t = null, n = "mse-readiness") {
  if (!e || !zm()) return !1;
  const a = Kp(t || {}, e),
    r = await TP({
      kind: "mse-readiness",
      reason: n,
      mediaTime: a.mediaTime,
      mediaTimeEnd: a.mediaTimeEnd,
      sync: a,
    });
  return (
    !!CP(r) ||
    (Nx(
      "mse.audio_buffer.readiness_delivery_failed",
      {
        reason: r?.reason || r?.error || "display-not-acknowledged",
        readinessReason: n,
        mediaTime: aP(a.mediaTime),
        mediaTimeEnd: aP(a.mediaTimeEnd),
        readySubtitleLeadSeconds: aP(e.readySubtitleLeadSeconds),
        releaseRequiredLeadSeconds: aP(e.releaseRequiredLeadSeconds),
        startupReleaseLeadSeconds: aP(e.startupReleaseLeadSeconds),
        startupReleaseReadyLeadSeconds: aP(e.startupReleaseReadyLeadSeconds),
        startupReleaseReadyRanges: Wp(e.startupReleaseReadyRanges),
        startupReleaseReadyDecision: e.startupReleaseReadyDecision || null,
        startupReleaseReady: Boolean(e.startupReleaseReady),
      },
      { source: "offscreen", level: "error" },
    ),
    !1)
  );
}
async function wS(e = {}, t = {}) {
  const n = sp(e),
    a = Math.max(
      0,
      ...(e.chunks || []).map((e) =>
        Math.round(Number(e.mseRepostAttempt || 0) || 0),
      ),
    ),
    r = lp(e, "mse-decode-partial");
  if (
    (_u(e, "mse-decode-partial"),
    Nx(
      "mse.audio_buffer.uncovered_range",
      {
        reason: "mse-decode-partial",
        segmentId: e.id,
        mediaStartTime: aP(n?.start),
        mediaEndTime: aP(n?.end),
        durationMs: Math.round(rP(e.durationMs) || 0),
        decodedMs: Math.round(rP(t.partialDecode?.decodedMs) || 0),
        expectedMs: Math.round(rP(t.partialDecode?.expectedMs) || 0),
        ratio: aP(t.partialDecode?.ratio),
        repostAttempt: a,
        removedScheduledRanges: r,
      },
      { source: "offscreen", level: "warn" },
    ),
    !n || a >= 1)
  )
    return void Nx(
      "mse.audio_buffer.repost_skipped",
      {
        reason: a >= 1 ? "max-repost-attempt-reached" : "missing-media-range",
        segmentId: e.id,
        repostAttempt: a,
      },
      { source: "offscreen", level: "warn" },
    );
  const i = await chrome.runtime
      .sendMessage({
        type: "LIVE_SUBTITLE_MSE_AUDIO_REPOST_REQUEST",
        sessionId: gc.sessionId || "",
        mediaStartTime: n.start,
        mediaEndTime: n.end,
        reason: "mse-decode-partial",
        maxAttempt: 1,
      })
      .catch((e) => ({
        ok: !1,
        error: e?.message || "mse repost request failed",
      })),
    o = Boolean(i?.requestPosted ?? i?.requested);
  Nx(
    "mse.audio_buffer.repost_requested",
    {
      segmentId: e.id,
      mediaStartTime: aP(n.start),
      mediaEndTime: aP(n.end),
      ok: Boolean(i?.ok),
      ignored: Boolean(i?.ignored),
      requestPosted: o,
      recoveredUnknownUntilHookDiagnostic: o,
      reason: i?.reason || i?.error || "",
      repostAttempt: a,
    },
    { source: "offscreen", level: i?.ok && o ? "warn" : "error" },
  );
}
async function kS(e) {
  if (PS(e, "before-integrated-upload"))
    return void nh(e, "ignored", {
      done: !0,
      active: !1,
      reason: "before-integrated-upload",
    });
  const t = LP(pg()),
    n = (e.chunks || []).map((e) => ({
      ...Df(e, { audioSpeedOverride: 1, force: !0 }),
      billableDurationMs: 0,
      sttAudioSpeed: 1,
    })),
    a = FM(n)
      ? HM(n, { filenamePrefix: "caption-mse-integrated", segmentId: e.id })
      : null,
    r = a ? new Float32Array() : Hv(n);
  if (!a && !r.byteLength) return;
  const i = a?.bytes || vD(r, Ge),
    o = a?.mimeType || "audio/wav",
    s = a?.filename || `caption-integrated-${e.id}.wav`;
  a && zM(e, a.bytes);
  const l = bv(e, { isFinal: !0 }),
    c = tC(l, Date.now()),
    d = AC(!0, c),
    u = gc.translationRequestId + 1;
  gc.translationRequestId = u;
  const m = nE({
    requestId: u,
    timelineRevision: rP(e.timelineRevision) ?? gc.timelineRevision,
  });
  if (
    sE(m, "integrated-before-upload", {
      requestId: u,
      provider: $P(),
      mediaStartTime: aP(eh(e)),
      mediaEndTime: aP(th(e)),
    })
  )
    return void nh(e, "ignored", {
      done: !0,
      active: !1,
      reason: "stale-request-context",
    });
  gc.subtitlePipelineStats.translationRequests += 1;
  const g = Date.now(),
    p = {
      ...pM(e, { requestId: u }),
      sourceLang: gc.config.sourceLang || "auto",
      targetLang: gc.config.targetLang || "zh",
      provider: $P(),
      sttProvider: t,
      mimeType: o,
      filename: s,
      originalDurationMs: e.durationMs,
      billableDurationMs: 0,
      maxOriginalChars: d.maxOriginalChars,
      maxSegments: d.maxSegments,
      segmentationMode: gc.config.segmentationMode || "auto",
      llmFallbackMode: "off",
      syncDelaySeconds: rP(gc.config.syncDelaySeconds),
      baseSyncDelaySeconds: rP(gc.config.baseSyncDelaySeconds),
      batchWaitSeconds: rP(gc.config.batchWaitSeconds),
      effectiveSyncDelaySeconds: rP(gc.config.effectiveSyncDelaySeconds),
      translationDeadlineMs: c.remainingDeadlineMs,
      translationDisplayDeadlineMs: c.displayDeadlineMs,
      translationEndDeadlineMs: c.remainingDeadlineMs,
      estimatedTranslationLatencyMs: c.estimatedTranslationLatencyMs,
      latencyMode: d.latencyMode,
      latencySlackMs: d.latencySlackMs,
      sessionId: m.sessionId || gc.sessionId || null,
      pageUrl: m.pageUrl || gc.config?.pageUrl || "",
      mediaContextKey: m.mediaContextKey || "",
      requestId: u,
      translationStyle: gc.config.translationStyle || "",
    };
  (vP("integrated-caption", `${aD(t)} 處理中`),
    Nx(
      "llm.integrated.start",
      {
        requestId: u,
        segmentId: e.id,
        durationMs: Math.round(e.durationMs || 0),
        audioBytes: i.byteLength,
        provider: p.provider,
        requestPlan: d,
        budget: c,
      },
      { source: "offscreen", requestId: u, provider: p.provider },
    ));
  const f = await vv(i, p, { segment: e });
  if (!f.ok) {
    const n = await f.text().catch(() => "");
    if (
      CS(f.status, n) &&
      AS(e, f, n, { provider: t, llmProvider: p.provider, requestId: u })
    )
      return;
    throw new Error(CD(f.status, n));
  }
  const h = await f.json();
  if (
    sE(m, "integrated-response", {
      requestId: u,
      provider: h.provider || p.provider || "",
      latencyMs: Date.now() - g,
      mediaStartTime: aP(eh(e)),
      mediaEndTime: aP(th(e)),
    })
  )
    return void nh(e, "ignored", {
      done: !0,
      active: !1,
      reason: "stale-request-context",
    });
  if (PS(e, "after-integrated-upload"))
    return void nh(e, "ignored", {
      done: !0,
      active: !1,
      reason: "after-integrated-upload",
    });
  ((e.chunks = n),
    (e.sttAudioSpeed = 1),
    (e.billableDurationMs = 0),
    om(e),
    Iu(e, "transcribed", { outcome: "integrated-text" }));
  const S = qv(e);
  (await JM(e),
    Cv(h, e, {
      sentBaseMs: S,
      timing: l,
      requestId: u,
      requestContext: m,
      startedAtMs: g,
      uploadLatencyMs: Date.now() - g,
    }),
    nh(e, "complete", {
      done: !0,
      active: !1,
      reason: "integrated-caption-ready",
    }));
}
function CS(e, t = "") {
  const n = Number(e) || 0;
  return (
    425 === n ||
    429 === n ||
    /CAPTION_GENERATION_IN_PROGRESS|rate.?limit|quota|resource_exhausted|too many requests/i.test(
      String(t || ""),
    )
  );
}
function AS(e = {}, t = null, n = "", a = {}) {
  if (PS(e, "integrated-rate-limit-retry-schedule")) return !1;
  const r =
    Math.max(0, Math.round(Number(e.integratedCaptionRetryCount || 0) || 0)) +
    1;
  if ("sql-wallet-v1" === gc.config?.walletBillingProtocol && r > 3) return !1;
  const i = RS(t, n, r),
    o = {
      ...e,
      integratedCaptionRetryCount: r,
      integratedCaptionRetryScheduledAtMs: Date.now(),
    },
    s = a.provider || gc.config?.sttProvider || gc.activeSttProvider;
  (vP("integrated-caption-retry", `${aD(s)} 速率限制，${sb(i)} 後重試`),
    Nx(
      "llm.integrated.rate_limit_retry_scheduled",
      {
        requestId: a.requestId || 0,
        segmentId: e.id,
        retryCount: r,
        retryAfterMs: i,
        sttProvider: LP(s),
        provider: a.llmProvider || $P(),
        status: Number(t?.status || 0) || 0,
        error: kD(n, 180),
      },
      {
        source: "offscreen",
        level: "warn",
        requestId: a.requestId || 0,
        provider: a.llmProvider || $P(),
      },
    ));
  const l = rP(e.timelineRevision),
    c = setTimeout(() => {
      if ((gc.finalTranslationRetryTimers.delete(c), gc.isStopping)) return;
      if (null !== l && l !== gc.timelineRevision) return;
      const e = sy();
      (e.queue.push(o),
        nh(o, "queued", { reason: "integrated-rate-limit-retry" }),
        SS(e));
    }, i);
  return (gc.finalTranslationRetryTimers.add(c), !0);
}
function RS(e = null, t = "", n = 1) {
  const a = ES(t),
    r = rP(
      a.retryAfterMs ??
        a.retry_after_ms ??
        a.error?.retryAfterMs ??
        a.error?.retry_after_ms,
    );
  if (null !== r && r >= 0) return dP(r, 500, Ft);
  const i = xS(
    e?.headers?.get?.("retry-after") || e?.headers?.get?.("Retry-After") || "",
  );
  return dP(null !== i ? i : qt * 2 ** Math.max(0, n - 1), 500, Ft);
}
function xS(e = "") {
  const t = String(e || "").trim();
  if (!t) return null;
  const n = Number(t);
  if (Number.isFinite(n) && n >= 0) return Math.round(1e3 * n);
  const a = Date.parse(t);
  return Number.isFinite(a) ? Math.max(0, a - Date.now()) : null;
}
function ES(e = "") {
  try {
    return JSON.parse(String(e || ""));
  } catch {
    return {};
  }
}
function PS(e = {}, t = "") {
  if (gc.stopRequestedAtMs) return !0;
  if (gc.isStopping) return !0;
  const n = rP(e.timelineRevision),
    a = wD(e.sessionId || ""),
    r = wD(gc.sessionId || ""),
    i = null !== n && n !== gc.timelineRevision,
    o = Boolean(a && a !== r),
    s =
      null != e.captureGeneration &&
      e.captureGeneration !== gc.captureGeneration,
    l = null != e.authUid && e.authUid !== (gc.config?.auth?.uid || "");
  return (
    !!(i || o || s || l) &&
    (e.timelineRevisionIgnored ||
      ((e.timelineRevisionIgnored = !0),
      Nx(
        "stt.batch.response_ignored",
        {
          segmentId: e.id,
          phase: t,
          requestSessionId: a,
          currentSessionId: r,
          requestRevision: n,
          currentRevision: gc.timelineRevision,
          durationMs: Math.round(e.durationMs || 0),
        },
        { source: "offscreen", level: "warn" },
      )),
    !0)
  );
}
function DS(e = {}, t = null, n = "transcript") {
  if (!ib(e)) return !1;
  const a = Fk(Date.now());
  if (null === a) return !1;
  const r = sp(e),
    i = sP([UC(t), r?.end]);
  if (null === i) return !1;
  const o = Math.max(pl, 2 * wk()),
    s = a - i;
  return !(
    s <= o ||
    (Nx(
      "stt.batch.response_ignored",
      {
        segmentId: e.id,
        phase: n,
        reason: "mse-result-behind-viewer",
        viewerMediaTime: aP(a),
        mediaStartTime: aP(sP([BC(t), r?.start])),
        mediaEndTime: aP(i),
        behindSeconds: aP(s),
        maxBehindSeconds: aP(o),
        timelineRevision: rP(e.timelineRevision),
        currentRevision: gc.timelineRevision,
      },
      { source: "offscreen", level: "warn" },
    ),
    0)
  );
}
async function IS(e, t = [], n = ne) {
  const a = LP(n),
    r = a === ae,
    i = r ? "stt.speechEngineA_realtime" : "stt.local_speechEngineA",
    o = Math.max(0, rP(e.durationMs) || oy(t));
  let s = new Float32Array(),
    l = t;
  if (FM(t)) {
    const n = HM(t, {
        filenamePrefix: r
          ? "caption-mse-speechEngineA-realtime"
          : "caption-mse-local-speechEngineA",
        segmentId: e.id,
      }),
      c = await VM(n.bytes),
      d = Math.max(0, 1e3 * (rP(c?.durationSeconds) || 0));
    if (!c?.samples?.length || (o > 1e3 && d < 0.9 * o)) {
      const s = SM(e, t);
      return (
        Nx(
          `${i}.mse_decode_incomplete`,
          {
            segmentId: e.id,
            expectedMs: Math.round(o),
            decodedMs: Math.round(d),
            ratio: o > 0 ? aP(d / o) : 0,
            encodedBytes: n.bytes.byteLength,
            chunks: t.length,
            repostAttempt: s,
          },
          { source: "offscreen", level: "warn", provider: a },
        ),
        r &&
          tD("mse-decode-incomplete", {
            segmentId: e.id,
            expectedMs: Math.round(o),
            decodedMs: Math.round(d),
            ratio: o > 0 ? aP(d / o) : 0,
            repostAttempt: s,
          }),
        {
          data: {},
          uploadChunks: t,
          appliedSpeed: 1,
          billableDurationMs: 0,
          uploadLatencyMs: 0,
          audioSpeed: 1,
          trailingSilenceMs: 0,
          mseDecodePartial: !0,
          partialDecode: {
            expectedMs: o,
            decodedMs: d,
            ratio: o > 0 ? d / o : 0,
            encodedBytes: n.bytes.byteLength,
          },
        }
      );
    }
    const u = KM(c.scanSamples, c.scanSampleRate, c.durationSeconds);
    ((e.speechIntervalOffsets = u),
      (e.speechIntervalsPromise = Promise.resolve(u)));
    const m = await yy(e, c.samples);
    if (
      ((l = yM(e, t, c.samples, { billableDurationMs: o, audioSpeed: 1 })),
      Ay() && !u?.intervals?.length && !m.isSpeech)
    )
      return (
        Nx(
          `${i}.mse_vad_skipped`,
          {
            segmentId: e.id,
            durationMs: Math.round(o),
            rms: aP(m.rms),
            peak: aP(m.peak),
          },
          { source: "offscreen", provider: a },
        ),
        {
          data: { provider: a },
          uploadChunks: l,
          appliedSpeed: 1,
          billableDurationMs: 0,
          uploadLatencyMs: 0,
          audioSpeed: 1,
          trailingSilenceMs: 0,
        }
      );
    s = c.samples;
  } else {
    s = Hv(t);
    const n = by(e.chunks || t);
    (await yy(e, n.length ? n : s), QM(e, s, o));
  }
  if (!s.byteLength)
    return {
      data: { provider: a },
      uploadChunks: l,
      appliedSpeed: 1,
      billableDurationMs: 0,
      uploadLatencyMs: 0,
      audioSpeed: 1,
      trailingSilenceMs: 0,
    };
  const c = Date.now(),
    d = rP(e.batchSttClientTimeoutMsOverride),
    u = rP(e.sttDeadlineHedgeAttemptStartedAtMs),
    m = await BS(
      s,
      {
        ...("sql-wallet-v1" === gc.config?.walletBillingProtocol && r
          ? {
              walletRequestContext: pM({ ...e, chunks: l }, { sttProvider: a }),
            }
          : {}),
        segmentId: e.id,
        timelineRevision: rP(e.timelineRevision) ?? gc.timelineRevision,
        durationMs: o,
        timeoutMs: d,
        deadlineAtMs: null === d ? null : (u ?? c) + d,
        connectionOutcomePromise:
          e.sttDeadlineHedgeFallbackConnectionOutcomePromise || null,
        preferHttpUpload: r,
      },
      a,
    ),
    g = wD(m.transcript || m.text || ""),
    p = Date.now(),
    f = p - c;
  return (
    Nx(
      `${i}.mse_result`,
      {
        requestId: m.requestId,
        segmentId: e.id,
        durationMs: Math.round(o),
        samples: s.length,
        textChars: Array.from(g).length,
        latencyMs: f,
        requestStartedAtMs: c,
        requestCompletedAtMs: p,
        transport:
          m.transport || (r ? "direct-salad-websocket" : "local-websocket"),
        connectionWaitMs: Math.max(0, Math.round(rP(m.connectionWaitMs) || 0)),
        ticketLatencyMs: Math.max(0, Math.round(rP(m.ticketLatencyMs) || 0)),
      },
      { source: "offscreen", provider: a },
    ),
    {
      data: {
        text: g,
        transcript: g,
        language_code: oD(gc.config.sourceLang),
        provider: a,
      },
      uploadChunks: l,
      appliedSpeed: 1,
      billableDurationMs: o,
      uploadLatencyMs: f,
      requestStartedAtMs: c,
      requestCompletedAtMs: p,
      audioSpeed: 1,
      trailingSilenceMs: 0,
    }
  );
}
function LS(e) {
  const t = new Uint8Array(e.length * Float32Array.BYTES_PER_ELEMENT),
    n = new DataView(t.buffer);
  for (let t = 0; t < e.length; t += 1)
    n.setFloat32(t * Float32Array.BYTES_PER_ELEMENT, e[t], !0);
  return t;
}
async function _S(e, t = {}, n = {}) {
  const a = "迅聽 Mini HTTP 救援",
    r = rP(t.timelineRevision) ?? gc.timelineRevision,
    i = rP(t.deadlineAtMs) ?? Date.now() + Lo,
    o = Math.max(0, i - Date.now());
  if (o <= 0) throw new Error(`${a} 轉錄逾時`);
  if (!n.httpUrl || !n.httpHeaders) throw new Error(`${a} 端點尚未提供`);
  if (r !== gc.timelineRevision || gc.isStopping)
    throw new Error(`${a} request 已因時間軸更新取消`);
  const s = new AbortController();
  ((s.__mseCancelReason = ""), gc.localSpeechEngineAHttpControllers.add(s));
  const l = setTimeout(() => {
      ((s.__mseCancelReason = "deadline"), s.abort());
    }, o),
    c = Date.now();
  try {
    const i = await fetch(n.httpUrl, {
        method: "POST",
        headers: n.httpHeaders,
        body: LS(e),
        signal: s.signal,
      }),
      o = await i.text();
    let l = {};
    try {
      l = o ? JSON.parse(o) : {};
    } catch {
      l = {};
    }
    if (!i.ok) {
      const e = new Error(l.error || `${a} HTTP ${i.status}`);
      throw ((e.httpStatus = i.status), e);
    }
    if (r !== gc.timelineRevision || gc.isStopping)
      throw new Error(`${a} response 屬於舊時間軸`);
    return {
      requestId: l.request_id || t.requestId || "",
      transcript: wD(l.transcript || l.text || ""),
      segmentId: t.segmentId,
      durationMs: t.durationMs,
      transport: l.transport || "direct-salad-http-upload",
      httpLatencyMs: Math.max(0, Date.now() - c),
      server: l.server || null,
    };
  } catch (e) {
    if (s.signal.aborted || "AbortError" === e?.name) {
      const e = s.__mseCancelReason || "deadline";
      throw new Error("deadline" === e ? `${a} 轉錄逾時` : `${a} 已取消：${e}`);
    }
    throw e;
  } finally {
    (clearTimeout(l), gc.localSpeechEngineAHttpControllers.delete(s));
  }
}
async function BS(e, t = {}, n = ne) {
  const a = LP(n) === ae;
  if (a && "sql-wallet-v1" === gc.config?.walletBillingProtocol)
    return cv(e, t);
  const r = a ? "迅聽 Mini 即時版 MSE" : "本機 speechEngineA MSE",
    i = rP(t.timelineRevision) ?? gc.timelineRevision,
    o = `${a ? "remote" : "local"}-mse-${gc.localSpeechEngineAMseRequestSequence + 1}`;
  gc.localSpeechEngineAMseRequestSequence += 1;
  const s = Math.max(1e3, Math.round(rP(t.timeoutMs) || Lo)),
    l = rP(t.deadlineAtMs) ?? Date.now() + s,
    c = Date.now();
  let d;
  if (a) {
    const e = t.connectionOutcomePromise
        ? Promise.resolve(t.connectionOutcomePromise)
        : Vd().then(
            (e) => ({ ok: !0, connection: e }),
            (e) => ({ ok: !1, error: e }),
          ),
      n = Math.max(0, l - Date.now());
    if (n <= 0) throw new Error(`${r} 轉錄逾時（${Math.round(s / 1e3)}s）`);
    let a,
      i = null;
    try {
      a = await Promise.race([
        e,
        new Promise((e) => {
          i = setTimeout(
            () =>
              e({
                ok: !1,
                error: new Error(
                  `${r} 連線準備逾時（${Math.round(s / 1e3)}s）`,
                ),
              }),
            n,
          );
        }),
      ]);
    } finally {
      i && clearTimeout(i);
    }
    if (!a?.ok || !a.connection)
      throw a?.error || new Error(`${r} 無法取得連線票券`);
    d = a.connection;
  } else d = { url: Kd(), protocols: [] };
  const u = Math.max(0, Date.now() - c),
    m = Math.max(0, l - Date.now());
  if (m <= 0) throw new Error(`${r} 轉錄逾時（${Math.round(s / 1e3)}s）`);
  return a && t.preferHttpUpload && d.httpUrl && d.httpHeaders
    ? {
        ...(await _S(e, { ...t, requestId: o, deadlineAtMs: l }, d)),
        requestId: o,
        connectionWaitMs: u,
        ticketLatencyMs: Math.max(0, Math.round(rP(d.ticketLatencyMs) || 0)),
      }
    : new Promise((n, l) => {
        const c = d.protocols?.length
          ? new WebSocket(d.url, d.protocols)
          : new WebSocket(d.url);
        ((c.binaryType = "arraybuffer"),
          gc.localSpeechEngineAMseSockets.add(c));
        let g = !1,
          p = !1,
          f = "";
        const h = (e = null, t = null) => {
            if (!g) {
              ((g = !0),
                clearTimeout(T),
                gc.localSpeechEngineAMseSockets.delete(c),
                c.removeEventListener?.("open", M),
                c.removeEventListener?.("message", v),
                c.removeEventListener?.("error", y),
                c.removeEventListener?.("close", b),
                e ? l(e) : n(t || { requestId: o, transcript: f }));
              try {
                c.close(1e3, e ? "segment failed" : "segment complete");
              } catch {}
            }
          },
          S = () => {
            if (!p && !g)
              if (i !== gc.timelineRevision || gc.isStopping)
                h(new Error(`${r} request 已因時間軸更新取消`));
              else {
                p = !0;
                try {
                  for (let t = 0; t < e.length; t += _o) {
                    const n = Math.min(e.length, t + _o);
                    c.send(e.slice(t, n).buffer);
                  }
                  c.send(JSON.stringify({ type: "stop" }));
                } catch (e) {
                  h(e);
                }
              }
          },
          M = () => {
            if (i !== gc.timelineRevision || gc.isStopping)
              h(new Error(`${r} request 已因時間軸更新取消`));
            else
              try {
                (c.send(
                  JSON.stringify({
                    type: "config",
                    language: oD(gc.config.sourceLang),
                  }),
                ),
                  a || S());
              } catch (e) {
                h(e);
              }
          },
          v = (e) => {
            let n;
            try {
              n = JSON.parse(PT(e.data));
            } catch {
              return;
            }
            "ready" !== n.type
              ? "partial" !== n.type
                ? "error" !== n.type
                  ? "final" === n.type &&
                    (i === gc.timelineRevision
                      ? ((f = wD(n.transcript || f || n.text || "")),
                        h(null, {
                          requestId: o,
                          transcript: f,
                          segmentId: t.segmentId,
                          durationMs: t.durationMs,
                          connectionWaitMs: u,
                          ticketLatencyMs: Math.max(
                            0,
                            Math.round(rP(d.ticketLatencyMs) || 0),
                          ),
                        }))
                      : h(new Error(`${r} response 屬於舊時間軸`)))
                  : h(new Error(n.message || `${r} 轉錄錯誤`))
                : (f = wD(n.transcript || f || n.text || ""))
              : a && S();
          },
          y = () => h(new Error(`${r} WebSocket 發生錯誤`)),
          b = (e) => {
            if (g) return;
            const t =
              c.__mseCancelReason || e?.reason || `code ${e?.code || 0}`;
            h(new Error(`${r} request 在 final 前關閉：${t}`));
          },
          T = setTimeout(() => {
            h(new Error(`${r} 轉錄逾時（${Math.round(s / 1e3)}s）`));
          }, m);
        (c.addEventListener("open", M),
          c.addEventListener("message", v),
          c.addEventListener("error", y),
          c.addEventListener("close", b));
      });
}
function US(e) {
  const t = String(e || "auto")
    .toLowerCase()
    .trim();
  return ["auto", "single", "multi"].includes(t) ? t : "auto";
}
function qS(e, t = 24) {
  let n = [],
    a = !1;
  if (Array.isArray(e)) n = e;
  else {
    const t = String(e || "").trim();
    if (!t) return [];
    if (t.startsWith("["))
      try {
        const e = JSON.parse(t);
        Array.isArray(e) && ((n = e), (a = !0));
      } catch {
        n = [];
      }
    a || (n = t.split(/[\n,;]+/u));
  }
  return n
    .map((e) => String(e || "").trim())
    .filter(Boolean)
    .slice(0, t);
}
function FS(e, t = 24) {
  return JSON.stringify(qS(e, t));
}
function OS(e, t) {
  return Array.from(String(e || ""))
    .slice(0, Math.max(0, t))
    .join("");
}
function NS(e, t = 992) {
  const n = [],
    a = new Set();
  for (const r of qS(e, Math.max(2 * t, t))) {
    const e = OS(
      String(r || "")
        .replace(/[\u0000-\u001f\u007f<>]/gu, " ")
        .replace(/\s+/gu, " ")
        .trim(),
      u,
    );
    if (!e) continue;
    let i = e.toLowerCase();
    try {
      i = e.normalize("NFKC").toLocaleLowerCase("und");
    } catch {}
    if (!a.has(i) && (a.add(i), n.push(e), n.length >= t)) break;
  }
  return n;
}
function HS(e = gc.config || {}) {
  const t = String(e?.youtubeVideoId || "").trim();
  if (/^[A-Za-z0-9_-]{11}$/u.test(t)) return t;
  const n = String(
    e?.viewerMediaContextKey ||
      e?.sourceMediaContextKey ||
      e?.cacheVideoKey ||
      "",
  ).trim();
  if (n.startsWith("youtube:")) {
    const e = n.slice(8);
    if (/^[A-Za-z0-9_-]{11}$/u.test(e)) return e;
  }
  const a = cE(String(e?.canonicalPageUrl || e?.pageUrl || "").trim());
  if (a.startsWith("youtube:")) {
    const e = a.slice(8);
    if (/^[A-Za-z0-9_-]{11}$/u.test(e)) return e;
  }
  return "";
}
function GS(e = gc.config || {}) {
  return OS(e?.sttContextSearchDirection || "", 1e3).trim();
}
function WS(e) {
  let t = 0xcbf29ce484222325n;
  for (const n of Array.from(String(e || "")))
    ((t ^= BigInt(n.codePointAt(0))),
      (t = BigInt.asUintN(64, 0x100000001b3n * t)));
  return t.toString(16).padStart(16, "0");
}
function $S(e = gc.config || {}) {
  const t = GS(e),
    n = HS(e);
  return t
    ? { id: `prompt-${WS(t)}`, videoId: n, researchPrompt: t, promptFirst: !0 }
    : { id: n, videoId: n, researchPrompt: "", promptFirst: !1 };
}
function VS(e = gc.config || {}) {
  const t = LP(e?.sttProvider);
  return (
    !![re, Y, oe].includes(t) &&
    !1 !== e?.sttContextAutoResearchEnabled &&
    !0 !== e?.sttContextCustom &&
    Boolean($S(e).id)
  );
}
function jS(e = gc.config || {}) {
  if (!gc.remoteSessionStarted || !gc.sessionId) return !1;
  if (!VS(e)) return !1;
  const t = $S(e).id,
    n = String(e?.automaticSttContextVideoId || "").trim(),
    a = String(e?.automaticSttContextStatus || "idle").toLowerCase();
  return !(
    (n === t && ["ready", "error"].includes(a)) ||
    (n === t &&
      "loading" === a &&
      gc.automaticSttContextResearchController &&
      gc.automaticSttContextResearchSessionId === String(gc.sessionId || "") &&
      gc.automaticSttContextResearchVideoId === t)
  );
}
function KS(e = gc.config || {}) {
  const t = !0 === e?.automaticSttContextEditableApplied;
  return {
    prompt: OS(t ? e?.automaticSttContextBasePrompt : e?.sttPrompt, c).trim(),
    keywords: NS(t ? e?.automaticSttContextBaseKeywords : e?.sttKeywords),
  };
}
function zS(e, t, n = {}) {
  const a = OS(e, c).trim(),
    r = OS(n.prompt, c).trim(),
    i = [];
  for (const e of [a, r]) e && !i.includes(e) && i.push(e);
  return {
    prompt: OS(i.join("\n\n"), c).trim(),
    keywords: NS([...NS(t), ...NS(n.keywords)]),
  };
}
function QS(e = gc.config || {}) {
  return {
    prompt: OS(e?.automaticSttContextReviewPrompt, 1600).trim(),
    keywords: NS(e?.automaticSttContextReviewKeywords, 100),
    translationPrompt: OS(
      e?.automaticSttContextReviewTranslationPrompt,
      800,
    ).trim(),
  };
}
function JS(e = gc.config || {}) {
  const t = QS(e),
    n = OS(e?.automaticSttPrompt, c).trim(),
    a = [];
  for (const e of [t.prompt, n]) e && !a.includes(e) && a.push(e);
  const r = OS(e?.automaticTranslationPrompt, p).trim(),
    i = [];
  for (const e of [t.translationPrompt, r]) e && !i.includes(e) && i.push(e);
  return {
    prompt: OS(a.join("\n\n"), c).trim(),
    keywords: NS([...t.keywords, ...NS(e?.automaticSttKeywords)]),
    translationPrompt: OS(i.join("\n\n"), p).trim(),
    review: t,
  };
}
function XS(e = "") {
  const t = $S();
  return t.promptFirst ? t.id : String(e || t.id || "").trim();
}
function ZS(e = "") {
  const t = XS(e),
    n = OS(gc.config?.sttPrompt, c).trim(),
    a = NS(gc.config?.sttKeywords),
    r = Boolean(
      t &&
        "ready" === gc.config?.automaticSttContextStatus &&
        String(gc.config?.automaticSttContextVideoId || "") === t,
    ),
    i = r ? JS(gc.config) : { prompt: "", keywords: [] },
    o = i.prompt,
    s = i.keywords;
  if (!0 === gc.config?.automaticSttContextEditableApplied) {
    if (r)
      return {
        prompt: n,
        keywords: a,
        automaticApplied: Boolean(n || a.length),
      };
    const e = KS(gc.config);
    return { prompt: e.prompt, keywords: e.keywords, automaticApplied: !1 };
  }
  return {
    prompt: OS([o, n].filter(Boolean).join("\n\n"), c),
    keywords: NS([...s, ...a], d),
    automaticApplied: r && Boolean(o || s.length),
  };
}
function YS(e = "") {
  const t = XS(e),
    n = Boolean(
      t &&
        "ready" === gc.config?.automaticSttContextStatus &&
        String(gc.config?.automaticSttContextVideoId || "") === t,
    )
      ? JS(gc.config).translationPrompt
      : "";
  return n
    ? OS(n, p).trim()
    : Boolean(t && String(gc.config?.translationPromptVideoId || "") === t)
      ? OS(gc.config?.translationPrompt, p).trim()
      : "";
}
function eM(e = HS()) {
  return YS(e) ? [] : NS(ZS(e).keywords, m);
}
function tM(e = HS()) {
  return YS(e) || OS(ZS(e).prompt, g).trim();
}
function nM(e = "cancelled") {
  (pP(), (gc.automaticSttContextResearchGeneration += 1));
  const t = gc.automaticSttContextResearchController;
  if (
    ((gc.automaticSttContextResearchController = null),
    (gc.automaticSttContextResearchSessionId = ""),
    (gc.automaticSttContextResearchVideoId = ""),
    !t)
  )
    return !1;
  t.__automaticSttContextCancelReason = e;
  try {
    t.abort();
  } catch {}
  return !0;
}
function aM(e = {}) {
  if (
    (e.abort && pP(),
    gc.automaticSttContextReviewTimer &&
      (clearTimeout(gc.automaticSttContextReviewTimer),
      (gc.automaticSttContextReviewTimer = null)),
    e.abort && gc.automaticSttContextReviewController)
  )
    try {
      gc.automaticSttContextReviewController.abort();
    } catch {}
  e.abort && (gc.automaticSttContextReviewController = null);
}
function rM(e = gc.config || {}) {
  const t = Math.round(Number(e?.sttContextRefreshIntervalMinutes || 3));
  return 60 * ([3, 5, 10].includes(t) ? t : 3) * 1e3;
}
function iM(e = gc.config || {}) {
  return Object.values(oM(e)).every(Boolean);
}
function oM(e = gc.config || {}) {
  return {
    remoteSessionStarted: Boolean(gc.remoteSessionStarted),
    sessionId: Boolean(gc.sessionId),
    providerAndVideoEligible: VS(e),
    refreshEnabled: !1 !== e?.sttContextRefreshEnabled,
    contextReady: "ready" === e?.automaticSttContextStatus,
  };
}
function sM() {
  aM();
  const e = oM();
  if (!Object.values(e).every(Boolean))
    return (
      Nx("stt.context.review_schedule_skipped", e, { source: "offscreen" }),
      !1
    );
  const t = rM();
  return (
    (gc.automaticSttContextReviewTimer = setTimeout(() => {
      ((gc.automaticSttContextReviewTimer = null),
        lM()
          .catch((e) => {
            Nx(
              "stt.context.review_failed",
              { error: e?.message || String(e || "") },
              { source: "offscreen", level: "warn" },
            );
          })
          .finally(() => {
            sM();
          }));
    }, t)),
    Nx(
      "stt.context.review_scheduled",
      { intervalMs: t, videoId: HS() },
      { source: "offscreen" },
    ),
    !0
  );
}
async function lM() {
  if (!iM() || gc.automaticSttContextReviewInFlight)
    return { reviewed: !1, reason: "not-eligible-or-in-flight" };
  const e = OS(wD(gc.displayedOriginalText), 8e3).trim();
  if (Array.from(e).length < v)
    return (
      Nx(
        "stt.context.review_skipped",
        {
          reason: "insufficient-transcript",
          transcriptChars: Array.from(e).length,
          minimumChars: v,
        },
        { source: "offscreen" },
      ),
      { reviewed: !1, reason: "insufficient-transcript" }
    );
  if (e === gc.automaticSttContextLastReviewedTranscript)
    return (
      Nx(
        "stt.context.review_skipped",
        {
          reason: "unchanged-transcript",
          transcriptChars: Array.from(e).length,
        },
        { source: "offscreen" },
      ),
      { reviewed: !1, reason: "unchanged-transcript" }
    );
  const t = String(gc.sessionId || ""),
    n = $S(),
    a = n.id,
    r = n.videoId,
    i = ++gc.automaticSttContextReviewSequence,
    o = new AbortController();
  ((gc.automaticSttContextReviewController = o),
    (gc.automaticSttContextReviewInFlight = !0));
  const s = Date.now();
  try {
    const n = ZS(a),
      l = await fP(
        S,
        {
          method: "POST",
          headers: await SP(),
          body: JSON.stringify({
            youtubeUrl: r ? `https://www.youtube.com/watch?v=${r}` : "",
            contextId: a,
            sourceLanguageHint:
              "auto" === gc.config?.sourceLang
                ? ""
                : gc.config?.sourceLang || "",
            searchDirection: gc.config?.sttContextSearchDirection || "",
            currentPrompt: n.prompt,
            currentKeywords: n.keywords,
            currentTranslationPrompt: YS(a),
            recentTranscript: e,
            sessionId: t,
            requestId: `stt-context-review:${t.slice(0, 110)}:${a}:${i}`,
          }),
          signal: o.signal,
        },
        M,
        "智慧辨識情境換題檢查",
      ),
      c = await gD(l, "json", 5e3, "智慧辨識情境換題回應");
    if (!l.ok) {
      const e = new Error(
        c?.error || `智慧辨識情境換題檢查失敗 (HTTP ${l.status})`,
      );
      throw ((e.statusCode = l.status), e);
    }
    if (!Boolean(!o.signal.aborted && gc.sessionId === t && $S().id === a))
      return { reviewed: !1, reason: "stale-result" };
    if (
      ((gc.automaticSttContextLastReviewedTranscript = e),
      c?.billing &&
        NE(c.billing, { forceEventLog: !0, reason: "stt-context-review" }),
      Nx(
        "stt.context.reviewed",
        {
          contextId: a,
          videoId: r,
          changed: !0 === c?.changed,
          confidence: Math.max(0, Number(c?.confidence || 0)),
          reason: String(c?.reason || "").slice(0, 300),
          transcriptChars: Array.from(e).length,
          elapsedMs: Math.max(0, Number(c?.elapsedMs || Date.now() - s)),
          chargedCredits: Math.max(0, Number(c?.contextCharge?.credits || 0)),
          chargedCostUSD: Math.max(0, Number(c?.contextCharge?.costUSD || 0)),
          webSearchTriggered: !0 === c?.webSearchTriggered,
        },
        { source: "offscreen" },
      ),
      !0 !== c?.changed)
    )
      return { reviewed: !0, changed: !1 };
    const d = OS(c?.promptUpdate, 1600).trim(),
      u = NS(c?.keywords, 100),
      m = OS(c?.translationPromptUpdate, 800).trim();
    if (!d && !u.length && !m)
      return { reviewed: !0, changed: !1, reason: "empty-update" };
    const g = {
        ...(gc.config || {}),
        automaticSttContextReviewPrompt: d,
        automaticSttContextReviewKeywords: u,
        automaticSttContextReviewTranslationPrompt: m,
        automaticSttContextReviewGeneratedAt: new Date().toISOString(),
      },
      p = JS(g),
      f = KS(g),
      h = zS(p.prompt, p.keywords, f);
    return (
      (gc.config = { ...g, sttPrompt: h.prompt, sttKeywords: h.keywords }),
      Nx(
        "stt.context.review_applied",
        {
          contextId: a,
          videoId: r,
          topic: String(c?.topic || "").slice(0, 300),
          promptChars: Array.from(d).length,
          keywordCount: u.length,
          translationPromptChars: Array.from(m).length,
          webSearchTriggered: !1,
        },
        { source: "offscreen" },
      ),
      cM("ready", {
        contextId: a,
        videoId: r,
        prompt: gc.config?.automaticSttPrompt || "",
        keywords: gc.config?.automaticSttKeywords || [],
        translationPrompt: gc.config?.automaticTranslationPrompt || "",
        translationPromptEstimatedTokens:
          gc.config?.automaticTranslationPromptEstimatedTokens || 0,
        reviewPrompt: d,
        reviewKeywords: u,
        reviewTranslationPrompt: m,
        reviewGeneratedAt:
          gc.config?.automaticSttContextReviewGeneratedAt || "",
        editablePrompt: h.prompt,
        editableKeywords: h.keywords,
        basePrompt: f.prompt,
        baseKeywords: f.keywords,
        generatedAt: gc.config?.automaticSttContextGeneratedAt || "",
        cacheHit: !0 === gc.config?.automaticSttContextCacheHit,
        promptChars: Array.from(p.prompt).length,
        keywordCount: p.keywords.length,
        elapsedMs: Math.max(0, Number(c?.elapsedMs || Date.now() - s)),
      }),
      {
        reviewed: !0,
        changed: !0,
        updated: !0,
        webSearchTriggered: !1,
        promptChars: Array.from(d).length,
        keywordCount: u.length,
      }
    );
  } finally {
    (gc.automaticSttContextReviewController === o &&
      (gc.automaticSttContextReviewController = null),
      (gc.automaticSttContextReviewInFlight = !1));
  }
}
async function cM(e, t = {}) {
  try {
    return await chrome.runtime.sendMessage({
      type: "AUTOMATIC_STT_CONTEXT_STATUS",
      sessionId: gc.sessionId || "",
      contextId: t.contextId || $S().id,
      videoId: t.videoId || HS(),
      status: e,
      prompt: t.prompt || "",
      keywords: t.keywords || [],
      translationPrompt: t.translationPrompt || "",
      translationPromptEstimatedTokens: Math.max(
        0,
        Number(t.translationPromptEstimatedTokens || 0),
      ),
      searchDirection:
        t.searchDirection || gc.config?.sttContextSearchDirection || "",
      editablePrompt: t.editablePrompt || "",
      editableKeywords: t.editableKeywords || [],
      basePrompt: t.basePrompt || "",
      baseKeywords: t.baseKeywords || [],
      reviewPrompt: t.reviewPrompt || "",
      reviewKeywords: t.reviewKeywords || [],
      reviewTranslationPrompt: t.reviewTranslationPrompt || "",
      reviewGeneratedAt: t.reviewGeneratedAt || "",
      generatedAt: t.generatedAt || "",
      cacheHit: !0 === t.cacheHit,
      promptChars: Math.max(0, Number(t.promptChars || 0)),
      keywordCount: Math.max(0, Number(t.keywordCount || 0)),
      elapsedMs: Math.max(0, Number(t.elapsedMs || 0)),
      error: t.error || "",
    });
  } catch {
    return null;
  }
}
async function dM(e = {}) {
  const t = !0 === e.forceRefresh;
  if ((!t && !jS()) || (t && !VS()))
    return (sM(), { started: !1, reason: "not-eligible-or-already-requested" });
  const n = String(gc.sessionId || ""),
    a = $S(),
    r = a.id,
    i = a.videoId;
  nM("superseded");
  const o = gc.automaticSttContextResearchGeneration,
    s = new AbortController();
  ((gc.automaticSttContextResearchController = s),
    (gc.automaticSttContextResearchSessionId = n),
    (gc.automaticSttContextResearchVideoId = r));
  const l = KS(gc.config);
  ((gc.config = {
    ...(gc.config || {}),
    sttPrompt: l.prompt,
    sttKeywords: l.keywords,
    automaticSttContextStatus: "loading",
    automaticSttContextVideoId: r,
    automaticSttPrompt: "",
    automaticSttKeywords: [],
    automaticTranslationPrompt: "",
    automaticTranslationPromptEstimatedTokens: 0,
    automaticSttContextEditableApplied: !1,
    automaticSttContextBasePrompt: l.prompt,
    automaticSttContextBaseKeywords: l.keywords,
    automaticSttContextReviewPrompt: "",
    automaticSttContextReviewKeywords: [],
    automaticSttContextReviewTranslationPrompt: "",
    automaticSttContextReviewGeneratedAt: "",
    automaticSttContextStartedAt: new Date().toISOString(),
  }),
    Nx(
      "stt.context.auto_started",
      {
        contextId: r,
        videoId: i,
        promptFirst: a.promptFirst,
        sourceLanguageHint:
          "auto" === gc.config?.sourceLang ? "" : gc.config?.sourceLang || "",
      },
      { source: "offscreen" },
    ),
    cM("loading", {
      contextId: r,
      videoId: i,
      basePrompt: l.prompt,
      baseKeywords: l.keywords,
    }));
  const d = Date.now(),
    u = ++gc.automaticSttContextRequestSequence,
    m = OS(
      e.searchDirection || gc.config?.sttContextSearchDirection || "",
      1e3,
    ).trim(),
    g = OS(e.recentTranscript || "", 8e3).trim(),
    S = () =>
      Boolean(
        o === gc.automaticSttContextResearchGeneration &&
          gc.automaticSttContextResearchController === s &&
          gc.sessionId === n &&
          $S().id === r,
      );
  try {
    const e = await fP(
        f,
        {
          method: "POST",
          headers: await SP(),
          body: JSON.stringify({
            youtubeUrl: i ? `https://www.youtube.com/watch?v=${i}` : "",
            pageUrl: String(
              gc.config?.canonicalPageUrl || gc.config?.pageUrl || "",
            ).slice(0, 1200),
            sourceLanguageHint:
              "auto" === gc.config?.sourceLang
                ? ""
                : gc.config?.sourceLang || "",
            pageDescription: String(gc.config?.pageTitle || "").slice(0, 1e3),
            researchPrompt: a.researchPrompt,
            promptFirst: a.promptFirst,
            searchDirection: m,
            recentTranscript: g,
            forceRefresh: t,
            customPrompt: !1,
            existingSttPrompt: l.prompt,
            existingSttKeywords: l.keywords,
            sessionId: n,
            requestId: `stt-context:${n.slice(0, 120)}:${r}:${u}`,
          }),
          signal: s.signal,
        },
        h,
        "智慧辨識情境搜尋",
      ),
      o = await gD(e, "json", 5e3, "智慧辨識情境回應");
    if (!e.ok) {
      const t = new Error(
        o?.error || `智慧辨識情境搜尋失敗 (HTTP ${e.status})`,
      );
      throw ((t.statusCode = e.status), t);
    }
    if (!S()) return { started: !0, ignored: !0, reason: "stale-result" };
    if (!a.promptFirst && String(o?.videoId || "") !== i)
      throw new Error("智慧辨識情境回傳了不同影片的資料");
    if (a.promptFirst && "prompt-first" !== o?.researchMode)
      throw new Error("智慧辨識情境未依照使用者研究指令處理");
    const M = OS(o?.context?.prompt, c).trim(),
      v = NS(o?.context?.keywords);
    let y = OS(o?.context?.translationPrompt, p).trim();
    if (!M && !v.length) throw new Error("智慧辨識情境沒有可用的提示或關鍵字");
    const b = KS(gc.config),
      T = Boolean(
        b.prompt !== l.prompt ||
          JSON.stringify(b.keywords) !== JSON.stringify(l.keywords),
      );
    T && (y = "");
    const w = y
        ? Math.max(0, Number(o?.context?.translationPromptEstimatedTokens || 0))
        : 0,
      k = zS(M, v, b),
      C = Math.max(0, Number(o?.timings?.totalMs || Date.now() - d)),
      A = String(o?.generatedAt || new Date().toISOString());
    return (
      (gc.config = {
        ...(gc.config || {}),
        sttPrompt: k.prompt,
        sttKeywords: k.keywords,
        automaticSttContextStatus: "ready",
        automaticSttContextVideoId: r,
        automaticSttPrompt: M,
        automaticSttKeywords: v,
        automaticTranslationPrompt: y,
        automaticTranslationPromptEstimatedTokens: w,
        automaticSttContextEditableApplied: !0,
        automaticSttContextBasePrompt: b.prompt,
        automaticSttContextBaseKeywords: b.keywords,
        automaticSttContextReviewPrompt: "",
        automaticSttContextReviewKeywords: [],
        automaticSttContextReviewTranslationPrompt: "",
        automaticSttContextReviewGeneratedAt: "",
        automaticSttContextGeneratedAt: A,
        automaticSttContextCacheHit: !0 === o?.cacheHit,
        automaticSttContextElapsedMs: C,
        sttContextSearchDirection: m,
      }),
      o?.billing &&
        NE(o.billing, { forceEventLog: !0, reason: "stt-context-research" }),
      Nx(
        "stt.context.auto_ready",
        {
          contextId: r,
          videoId: i,
          promptFirst: a.promptFirst,
          promptChars: Array.from(M).length,
          keywordCount: v.length,
          translationPromptChars: Array.from(y).length,
          translationPromptEstimatedTokens: w,
          translationPromptSource: String(
            o?.context?.translationPromptSource || "",
          ),
          translationPromptInvalidatedByContextEdit: T,
          cacheHit: !0 === o?.cacheHit,
          metadataMs: Math.max(0, Number(o?.timings?.metadataMs || 0)),
          researchMs: Math.max(0, Number(o?.timings?.providerMs || 0)),
          elapsedMs: C,
          chargedCredits: Math.max(0, Number(o?.contextCharge?.credits || 0)),
          chargedCostUSD: Math.max(0, Number(o?.contextCharge?.costUSD || 0)),
          contextInputTokens: Math.max(
            0,
            Number(o?.contextCharge?.inputTokens || 0),
          ),
          contextOutputTokens: Math.max(
            0,
            Number(o?.contextCharge?.outputTokens || 0),
          ),
        },
        { source: "offscreen" },
      ),
      cM("ready", {
        contextId: r,
        videoId: i,
        prompt: M,
        keywords: v,
        translationPrompt: y,
        translationPromptEstimatedTokens: w,
        editablePrompt: k.prompt,
        editableKeywords: k.keywords,
        basePrompt: b.prompt,
        baseKeywords: b.keywords,
        generatedAt: A,
        cacheHit: !0 === o?.cacheHit,
        promptChars: Array.from(M).length,
        keywordCount: v.length,
        elapsedMs: C,
      }),
      {
        started: !0,
        ready: !0,
        contextId: r,
        videoId: i,
        promptChars: M.length,
        keywordCount: v.length,
        translationPromptChars: Array.from(y).length,
      }
    );
  } catch (e) {
    if (!S() || s.signal.aborted)
      return { started: !0, ignored: !0, reason: "cancelled" };
    const t = Math.max(0, Date.now() - d);
    return (
      (gc.config = {
        ...(gc.config || {}),
        automaticSttContextStatus: "error",
        automaticSttContextVideoId: r,
        automaticSttPrompt: "",
        automaticSttKeywords: [],
        automaticTranslationPrompt: "",
        automaticTranslationPromptEstimatedTokens: 0,
        automaticSttContextReviewPrompt: "",
        automaticSttContextReviewKeywords: [],
        automaticSttContextReviewTranslationPrompt: "",
        automaticSttContextReviewGeneratedAt: "",
        automaticSttContextError: String(
          e?.message || e || "智慧辨識情境搜尋失敗",
        ).slice(0, 300),
        automaticSttContextElapsedMs: t,
      }),
      Nx(
        "stt.context.auto_failed",
        {
          contextId: r,
          videoId: i,
          elapsedMs: t,
          statusCode: Math.max(0, Number(e?.statusCode || 0)),
          error: e?.message || String(e || ""),
        },
        { source: "offscreen", level: "warn" },
      ),
      cM("error", {
        contextId: r,
        videoId: i,
        basePrompt: l.prompt,
        baseKeywords: l.keywords,
        elapsedMs: t,
        error: String(e?.message || e || "智慧辨識情境搜尋失敗").slice(0, 300),
      }),
      { started: !0, ready: !1, error: e?.message || String(e || "") }
    );
  } finally {
    (gc.automaticSttContextResearchController === s &&
      ((gc.automaticSttContextResearchController = null),
      (gc.automaticSttContextResearchSessionId = ""),
      (gc.automaticSttContextResearchVideoId = "")),
      sM());
  }
}
function uM(e = "") {
  const t = String(e || "").trim();
  if (!t) return "";
  const n = ZR(t);
  if (n) return n;
  const a = /^missav:/i.test(t)
    ? "missav"
    : /^xvideos:/i.test(t)
      ? "xvideos"
      : "";
  if (!a) return "";
  const r = t.slice(t.indexOf(":") + 1).split("/");
  return !r.length ||
    r.some((e) => !e || !/^[A-Za-z0-9._~!$&'()*+,;=:@%-]+$/.test(e))
    ? ""
    : `${a}:${r.join("/").toLowerCase()}`;
}
function mM(e = {}) {
  const t = e.chunks || [],
    n = t.some((e) => String(e.sourceType || "").includes("mse")),
    a = sp(e),
    r = sP(
      n
        ? [e.mseCoverageCoreStartMediaTime, a?.start]
        : t.map((e) => e.captureStartMs),
    ),
    i = n
      ? sP([e.mseCoverageCoreEndMediaTime, a?.end])
      : lP(t.map((e) => e.captureEndMs)),
    o = n && null !== r ? 1e3 * r : r,
    s = n && null !== i ? 1e3 * i : i;
  return null === o ||
    null === s ||
    !Number.isFinite(o) ||
    !Number.isFinite(s) ||
    s <= o
    ? null
    : {
        domain: n ? "mse" : "capture",
        generation: n
          ? Math.max(
              0,
              Math.round(e.timelineRevision ?? gc.timelineRevision ?? 0),
            )
          : 0,
        startMs: Math.round(o),
        endMs: Math.round(s),
      };
}
function gM(e = {}) {
  return "sql-wallet-v1" !== gc.config?.walletBillingProtocol
    ? {}
    : e.emptySttRetryActive
      ? { walletSttPurpose: "rescue", walletSttRescueReason: "quality" }
      : "fallback" === e.sttDeadlineHedgeAttemptRole
        ? {
            walletSttPurpose: "rescue",
            walletSttRescueReason: e.walletSttRescueReason || "latency",
          }
        : {};
}
function pM(e = {}, t = {}) {
  const n = sp(e),
    a = LP(t.sttProvider || gc.config?.sttProvider || gc.activeSttProvider),
    r = a === re || a === oe,
    i = r || a === Y,
    o = a === re,
    s = String(gc.config?.canonicalPageUrl || gc.config?.pageUrl || ""),
    l = uM(tE() || cE(s)),
    c = l.startsWith("youtube:") ? l.slice(8) : HS(),
    d = i ? ZS(c) : { prompt: "", keywords: [], automaticApplied: !1 },
    u = rP(e.timelineRevision);
  return {
    sessionId: wD(e.sessionId || "") || gc.sessionId || "",
    captureGeneration: e.captureGeneration ?? gc.captureGeneration,
    authUid: e.authUid ?? gc.config?.auth?.uid ?? "",
    requestId: String(t.requestId || e.id || ""),
    pageUrl: s,
    pageTitle: String(gc.config?.pageTitle || "").slice(0, 300),
    canonicalPageUrl: s,
    mediaContextKey: l,
    videoKey: l,
    videoId: c,
    mediaStartTime: rP(t.mediaStartTime ?? n?.start),
    mediaEndTime: rP(t.mediaEndTime ?? n?.end),
    sourceIsLiveStream: !0 === gc.config?.sourceIsLiveStream,
    sttLanguageMode: o ? US(gc.config?.sttLanguageMode) : "auto",
    sttPrompt: r ? d.prompt : "",
    sttKeywords: i ? JSON.stringify(d.keywords) : "[]",
    translationKeywords: JSON.stringify(eM(c)),
    translationContext: tM(c),
    sourceLanguageHints: o ? FS(gc.config?.sourceLanguageHints, 4) : "[]",
    timelineRevision: null !== u ? u : gc.timelineRevision,
    ...gM(e),
    ...("sql-wallet-v1" === gc.config?.walletBillingProtocol
      ? { walletAudioWindow: mM(e) }
      : {}),
  };
}
async function fM(e, t = 1) {
  const a = fg(e);
  e.lastBatchSttAttemptProvider = a;
  const r = Gu(e, a),
    i = KP(t, a),
    o = i > 1 ? Ke : 0,
    s = (r.chunks || []).map((e) =>
      Df(e, { audioSpeedOverride: i, force: !0 }),
    );
  if (!FM(s)) {
    const e = by(r.chunks || s);
    e.length && (await yy(r, e));
  }
  const l = (t = {}) => (
    (e.speechIntervalOffsets = r.speechIntervalOffsets || null),
    (e.speechIntervalsPromise = r.speechIntervalsPromise
      ? Promise.resolve(r.speechIntervalsPromise).then(
          (t) => ((e.speechIntervalOffsets = t || null), t || null),
        )
      : null),
    (e.pcmWindowVadSharedState =
      r.pcmWindowVadSharedState || e.pcmWindowVadSharedState || null),
    (e.pcmWindowVadDecision =
      r.pcmWindowVadDecision || e.pcmWindowVadDecision || null),
    {
      ...t,
      transcriptionSegment: r,
      transcriptionDurationMs: r.durationMs,
      msePcmPrimaryContextApplied: Boolean(r.msePcmPrimaryContextOverlap),
      sttProviderAudioView: r.sttProviderAudioView || "",
    }
  );
  if (a === ne || a === ae) return l(await IS(r, s, a));
  if (FM(s)) return l(await hM(r, s, i));
  const c = Hv(s);
  QM(r, c, r.durationMs);
  const d = o > 0 ? ny(c, o) : c;
  if (!d.byteLength)
    return l({
      data: {},
      uploadChunks: s,
      appliedSpeed: i,
      billableDurationMs: 0,
      uploadLatencyMs: 0,
      audioSpeed: i,
      trailingSilenceMs: o,
    });
  const u = i > 1 ? r.durationMs / i + o : r.durationMs,
    m = vD(d, Ge),
    g = Date.now(),
    p = {
      ...pM(r),
      sourceLang: gc.config.sourceLang || "auto",
      targetLang: gc.config.targetLang || "zh",
      modelId: n,
      sttProvider: a,
      mimeType: "audio/wav",
      filename: `caption-batch-${r.id}.wav`,
      audioSpeed: i,
      audioSpeedAlreadyApplied: i > 1,
      trailingSilenceMs: o,
      originalDurationMs: r.durationMs,
      billableDurationMs: u,
    },
    f = await pv(m, p, {
      timeoutMs: Yh(r, a),
      label: `${aD(a)} STT`,
      signal: r.sttUploadAbortController?.signal,
    });
  if (!f.ok) throw await TM(f);
  const h = await f.json(),
    S = Date.now();
  Kh(a);
  const M = !1 === h.audioSpeedApplied ? 1 : KP(h.audioSpeed || i, a),
    v = Math.max(0, rP(h.billableDurationMs) || (M > 1 ? u : r.durationMs));
  return (
    Nx(
      "stt.batch.pcm_upload",
      {
        segmentId: r.id,
        retry: Boolean(r.emptySttRetryActive),
        durationMs: Math.round(r.durationMs || 0),
        billableDurationMs: Math.round(v),
        audioSpeed: i,
        sourceType: Uf(s[0] || {}),
        mseGapBackfill: Boolean(
          void 0 !== e.mseBackfillTargetStartMediaTime ||
            s.some((e) => e?.mseGapBackfill),
        ),
        msePcmPrimaryContextOverlap: Boolean(r.msePcmPrimaryContextOverlap),
        sttProviderAudioView: r.sttProviderAudioView || "",
        mediaStartTime: aP(sP(s.map((e) => rP(e.sourceMediaStartTime)))),
        mediaEndTime: aP(lP(s.map((e) => rP(e.sourceMediaEndTime)))),
        targetStartMediaTime: aP(
          sP([
            e.mseBackfillTargetStartMediaTime,
            r.mseCoverageCoreStartMediaTime,
          ]),
        ),
        targetEndMediaTime: aP(
          sP([e.mseBackfillTargetEndMediaTime, r.mseCoverageCoreEndMediaTime]),
        ),
        contextSeconds: aP(
          sP([e.mseBackfillContextSeconds, r.msePcmPrimaryContextSeconds]) || 0,
        ),
        wavBytes: m.byteLength,
        latencyMs: S - g,
        requestStartedAtMs: g,
        requestCompletedAtMs: S,
      },
      { source: "offscreen" },
    ),
    l({
      data: h,
      uploadChunks: s,
      appliedSpeed: M,
      billableDurationMs: v,
      uploadLatencyMs: S - g,
      requestStartedAtMs: g,
      requestCompletedAtMs: S,
      audioSpeed: i,
      trailingSilenceMs: o,
    })
  );
}
async function hM(e, t = [], a = 1) {
  const r = fg(e),
    i = HM(t, { filenamePrefix: "caption-mse-batch", segmentId: e.id });
  if (!i.bytes.byteLength)
    return {
      data: {},
      uploadChunks: t,
      appliedSpeed: 1,
      billableDurationMs: 0,
      uploadLatencyMs: 0,
      audioSpeed: 1,
      trailingSilenceMs: 0,
    };
  if (i.mimeType.includes("webm") && !OM(i.bytes)) {
    const n = Math.max(0, rP(e.durationMs) || oy(t));
    return (
      Nx(
        "stt.batch.mse_init_missing",
        {
          segmentId: e.id,
          durationMs: n,
          encodedBytes: i.bytes.byteLength,
          repostAttempt: SM(e, t),
        },
        { source: "offscreen", level: "warn" },
      ),
      {
        data: {},
        uploadChunks: t,
        appliedSpeed: 1,
        billableDurationMs: 0,
        uploadLatencyMs: 0,
        audioSpeed: 1,
        trailingSilenceMs: 0,
        mseDecodePartial: !0,
        partialDecode: {
          expectedMs: n,
          decodedMs: 0,
          ratio: 0,
          reason: "missing-webm-init",
        },
      }
    );
  }
  const o = await MM(e, t, i, a);
  if (o) return o;
  zM(e, i.bytes);
  const s = Math.max(0, rP(e.durationMs) || oy(t)),
    l = Date.now(),
    c = {
      ...pM(e),
      sourceLang: gc.config.sourceLang || "auto",
      targetLang: gc.config.targetLang || "zh",
      modelId: n,
      sttProvider: r,
      mimeType: i.mimeType,
      filename: i.filename,
      audioSpeed: 1,
      audioSpeedAlreadyApplied: !0,
      trailingSilenceMs: 0,
      originalDurationMs: s,
      billableDurationMs: s,
    },
    d = await pv(i.bytes, c, {
      timeoutMs: Yh(e, r),
      label: `${aD(r)} STT`,
      signal: e.sttUploadAbortController?.signal,
    });
  if (!d.ok) throw await TM(d);
  const u = await d.json(),
    m = Date.now();
  return (
    Kh(r),
    {
      data: u,
      uploadChunks: t,
      appliedSpeed: 1,
      billableDurationMs: Math.max(0, rP(u.billableDurationMs) || s),
      uploadLatencyMs: m - l,
      requestStartedAtMs: l,
      requestCompletedAtMs: m,
      audioSpeed: 1,
      trailingSilenceMs: 0,
    }
  );
}
function SM(e = {}, t = null) {
  const n = Array.isArray(t) ? t : e.chunks || [];
  return Math.max(
    0,
    ...n.map((e) => Math.round(Number(e?.mseRepostAttempt || 0) || 0)),
  );
}
async function MM(e, t = [], a = {}, r = 1) {
  const i = fg(e),
    o = KP(r, i),
    s = await VM(a.bytes);
  if (!s?.samples?.length)
    return (
      Nx(
        "stt.batch.mse_decode_unavailable",
        {
          segmentId: e.id,
          durationMs: Math.round(rP(e.durationMs) || oy(t)),
          encodedBytes: a.bytes?.byteLength || 0,
          chunks: t.length,
        },
        { source: "offscreen", level: "warn" },
      ),
      null
    );
  const l = Math.max(
      0,
      rP(e.durationMs) || 1e3 * (rP(s.durationSeconds) || 0) || oy(t),
    ),
    c = Math.max(0, 1e3 * (rP(s.durationSeconds) || 0));
  if (l > 1e3 && c > 0 && c < 0.9 * l) {
    const n = SM(e, t),
      r = n >= 1;
    return (
      Nx(
        "stt.batch.mse_decode_partial",
        {
          segmentId: e.id,
          expectedMs: Math.round(l),
          decodedMs: Math.round(c),
          ratio: aP(c / l),
          encodedBytes: a.bytes?.byteLength || 0,
          chunks: t.length,
          repostAttempt: n,
          action: r ? "fallback-encoded" : "repost-range",
        },
        { source: "offscreen", level: "warn" },
      ),
      r
        ? null
        : {
            data: {},
            uploadChunks: t,
            appliedSpeed: o,
            billableDurationMs: 0,
            uploadLatencyMs: 0,
            audioSpeed: o,
            trailingSilenceMs: 0,
            mseDecodePartial: !0,
            partialDecode: {
              expectedMs: l,
              decodedMs: c,
              ratio: c / l,
              encodedBytes: a.bytes?.byteLength || 0,
            },
          }
    );
  }
  const d = KM(s.scanSamples, s.scanSampleRate, s.durationSeconds);
  ((e.speechIntervalOffsets = d),
    (e.speechIntervalsPromise = Promise.resolve(d)));
  const u = await yy(e, s.samples);
  if (Ay() && !d?.intervals?.length && !u.isSpeech)
    return (
      Nx(
        "stt.batch.mse_vad_skipped",
        {
          segmentId: e.id,
          durationMs: Math.round(l),
          chunks: t.length,
          rms: aP(u.rms),
          peak: aP(u.peak),
          provider: i,
        },
        { source: "offscreen" },
      ),
      {
        data: {},
        uploadChunks: yM(e, t, s.samples, {
          billableDurationMs: 0,
          audioSpeed: o,
        }),
        appliedSpeed: o,
        billableDurationMs: 0,
        uploadLatencyMs: 0,
        audioSpeed: o,
        trailingSilenceMs: 0,
      }
    );
  const m = o > 1 ? Ke : 0,
    g = Wv(s.samples, o),
    p = m > 0 ? ny(g, m) : g;
  if (!p.byteLength) return null;
  const f = o > 1 ? l / o + m : l,
    h = vD(p, Ge),
    S = Date.now(),
    M = {
      ...pM(e),
      sourceLang: gc.config.sourceLang || "auto",
      targetLang: gc.config.targetLang || "zh",
      modelId: n,
      sttProvider: i,
      mimeType: "audio/wav",
      filename: `caption-mse-decoded-${e.id}.wav`,
      audioSpeed: o,
      audioSpeedAlreadyApplied: o > 1,
      trailingSilenceMs: m,
      originalDurationMs: l,
      billableDurationMs: f,
      sourceAudioMimeType: a.mimeType || "",
    },
    v = await pv(h, M, {
      timeoutMs: Yh(e, i),
      label: `${aD(i)} STT`,
      signal: e.sttUploadAbortController?.signal,
    });
  if (!v.ok) throw await TM(v);
  const y = await v.json(),
    b = Date.now(),
    T = o,
    w = Math.max(0, rP(y.billableDurationMs) || (T > 1 ? f : l));
  return (
    Nx(
      "stt.batch.mse_decoded_upload",
      {
        segmentId: e.id,
        retry: Boolean(e.emptySttRetryActive),
        durationMs: Math.round(l),
        billableDurationMs: Math.round(w),
        audioSpeed: o,
        speedReason: vM(e, o),
        speechIntervalCount: d?.intervals?.length || 0,
        encodedBytes: a.bytes?.byteLength || 0,
        wavBytes: h.byteLength,
        requestStartedAtMs: S,
        requestCompletedAtMs: b,
      },
      { source: "offscreen" },
    ),
    {
      data: y,
      uploadChunks: yM(e, t, s.samples, {
        billableDurationMs: w,
        audioSpeed: o,
      }),
      appliedSpeed: T,
      billableDurationMs: w,
      uploadLatencyMs: b - S,
      requestStartedAtMs: S,
      requestCompletedAtMs: b,
      audioSpeed: o,
      trailingSilenceMs: m,
    }
  );
}
function vM(e = {}, t = 1) {
  return bh(e)
    ? "gap-recovery"
    : eb(e)
      ? "startup"
      : KP(t, gc.config?.sttProvider || gc.activeSttProvider) > 1
        ? "configured"
        : "normal";
}
function yM(e = {}, t = [], n = new Float32Array(), a = {}) {
  const r = t[0] || {},
    i = t[t.length - 1] || r,
    o = Math.max(0, rP(e.durationMs) || oy(t)),
    s = Math.max(0, rP(a.billableDurationMs) ?? o),
    l = bM(e, t, o);
  return [
    {
      ...r,
      encodedAudio: !1,
      bytes: new Uint8Array(),
      initBytes: null,
      mimeType: "audio/wav",
      extension: "wav",
      samples: n,
      rawCaptureSamples: n,
      captureSamples: n,
      sourceType: "mse-audio-buffer",
      durationMs: o,
      captureDurationMs: o,
      captureStartMs: sP(t.map((e) => rP(e.captureStartMs))),
      captureEndMs: lP(t.map((e) => rP(e.captureEndMs))),
      captureStartWallTimeMs: sP(t.map((e) => rP(e.captureStartWallTimeMs))),
      captureEndWallTimeMs: lP(
        t.map((e) => rP(e.captureEndWallTimeMs ?? e.capturedAtMs)),
      ),
      sourceMediaStartTime: sP(t.map((e) => rP(e.sourceMediaStartTime))),
      sourceMediaEndTime: lP(t.map((e) => rP(e.sourceMediaEndTime))),
      sourcePlaybackRate: 1,
      sttAudioSpeed: Math.max(1, rP(a.audioSpeed) || 1),
      sttAudioSpeedAlreadyApplied: Math.max(1, rP(a.audioSpeed) || 1) > 1,
      billableDurationMs: s,
      preparedForStt: !0,
      mseDecodedFromEncoded: !0,
      mseOriginalChunkCount: t.length,
      originalChunkMediaRanges: l,
      mseSequence: r.mseSequence,
      mseLastSequence: i.mseSequence,
    },
  ];
}
function bM(e = {}, t = [], n = null) {
  const a = Tv(t),
    r = sP((t || []).map((e) => rP(e.sourceMediaStartTime))),
    i = lP((t || []).map((e) => rP(e.sourceMediaEndTime))),
    o = Math.max(0, rP(n) || rP(e.durationMs) || oy(t)) / 1e3;
  if (null === r || null === i || !(i > r)) return a;
  const s = i - r,
    l = sP(a.map((e) => rP(e.start))),
    c = lP(a.map((e) => rP(e.end))),
    d = null !== l && null !== c && c > l ? c - l : null;
  return null !== d &&
    Math.abs(l - r) <= 0.35 &&
    Math.abs(c - i) <= 0.35 &&
    d >= 0.75 * s
    ? a
    : [
        {
          sequence: sP((t || []).map((e) => rP(e.mseSequence))),
          start: aP(r),
          end: aP(i),
          durationMs: Math.round(1e3 * Math.max(o, s)),
          decoded: !0,
          clusterSliceIndex: null,
          clusterSliceCount: null,
          rangeSource:
            null === d
              ? "decoded-explicit-range"
              : "decoded-explicit-range-reanchored",
          originalRangeStart: aP(l),
          originalRangeEnd: aP(c),
          originalRangeDurationMs: null !== d ? Math.round(1e3 * d) : null,
        },
      ];
}
async function TM(e) {
  const t = Number(e?.status) || 0,
    n = "function" == typeof e?.text ? await e.text().catch(() => "") : "";
  let a = "",
    r = "";
  if (n)
    try {
      const e = JSON.parse(n);
      ((r = wD(e.code || "")),
        (a = wD(`${e.code || ""} ${e.error || e.message || e.details || n}`)));
    } catch {
      a = wD(n);
    }
  const i = a ? `: ${a.slice(0, 220)}` : "",
    o = new Error(`HTTP ${t}${i}`);
  return ((o.status = t), (o.code = r), o);
}
function wM(e = {}, t = 1) {
  return (
    !(KP(t, fg(e)) <= 1) &&
    !1 !== (gc.config?.sttEmptyRetryEnabled ?? !0) &&
    !(Math.max(0, rP(e.durationMs) || 0) < Ga) &&
    DM(e).confirmed
  );
}
function kM(e = {}) {
  const t = LP(fg(e)),
    n = gc.config?.sourceLang,
    a = LP(gc.config?.sttProvider),
    r = _P(n);
  return (
    (t === Y
      ? [oe, ...(a === oe && t === Y && "jpn" === r ? [re] : []), ee]
      : t === oe
        ? [Y, ee]
        : [Y, oe]
    ).find((e) => e !== t && BP(e, n) && !$h(e)) || ""
  );
}
function CM(e = "") {
  return kM({ batchSttProviderOverride: LP(e || pg()) });
}
function AM(e = {}, t = {}) {
  if (!1 === (gc.config?.sttEmptyRetryEnabled ?? !0))
    return { eligible: !1, reason: "disabled" };
  if (!ib(e)) return { eligible: !1, reason: "not-mse" };
  if (e.emptySttAlternateRescueUsed)
    return { eligible: !1, reason: "already-used" };
  const n = Math.max(
    0,
    rP(t.transcriptionDurationMs) ||
      oy(t.uploadChunks) ||
      rP(e.durationMs) ||
      0,
  );
  if (n < Ga) return { eligible: !1, reason: "too-short", durationMs: n };
  const a = kM(e);
  if (!a)
    return { eligible: !1, reason: "no-alternate-provider", durationMs: n };
  const r = Hv(t.uploadChunks || e.chunks || []),
    i =
      e.pcmWindowVadDecision ||
      (r.length
        ? fy(r, { useRecentSilero: !1 })
        : { rms: 0, peak: 0, zcr: 0, isSpeech: !1 }),
    o = Math.max(0, PM(e) || 0),
    s = gc.config?.localVadSilenceThreshold ?? jt,
    l = Boolean(
      r.length &&
        i.rms >= Math.max(0.0015, 0.9 * s) &&
        i.peak >= Math.max(0.004, 1.8 * s),
    ),
    c = DM(e),
    d = a === ee || a === re,
    u = c.confirmed;
  return {
    eligible: u,
    reason: u ? c.source : "no-confirmed-speech",
    provider: a,
    currentProvider: LP(fg(e)),
    usingTertiaryProvider: d,
    durationMs: n,
    intervalCount: o,
    speechEvidenceSource: c.source,
    maxSpeechIntervalMs: c.maxSpeechIntervalMs,
    maxSileroSpeechRunMs: c.maxSileroSpeechRunMs,
    rms: i.rms,
    peak: i.peak,
    zcr: i.zcr,
    vadSpeech: Boolean(i.isSpeech),
    nonSilent: l,
  };
}
async function RM(e = {}, t = {}) {
  await JM(e);
  const n = AM(e, t);
  if (!n.eligible)
    return (
      "no-confirmed-speech" === n.reason &&
        Nx(
          "stt.batch.empty_alternate_rescue_suppressed",
          {
            segmentId: e.id,
            provider: n.provider,
            durationMs: Math.round(n.durationMs || 0),
            reason: n.reason,
            speechIntervalCount: n.intervalCount,
            maxSpeechIntervalMs: Math.round(n.maxSpeechIntervalMs || 0),
            maxSileroSpeechRunMs: Math.round(n.maxSileroSpeechRunMs || 0),
            vadSpeech: n.vadSpeech,
            nonSilent: n.nonSilent,
            rms: aP(n.rms),
            peak: aP(n.peak),
            zcr: aP(n.zcr),
          },
          { source: "offscreen" },
        ),
      { attempted: !1, decision: n }
    );
  e.emptySttAlternateRescueUsed = !0;
  const a = eS(e, n.provider, {
      role: "fallback",
      providerSelectionLockReason: "empty-alternate-rescue",
    }),
    r = fg(a);
  Nx(
    "stt.batch.empty_alternate_rescue_started",
    {
      segmentId: e.id,
      fromProvider: fg(e),
      toProvider: n.provider,
      requestedProvider: n.provider,
      actualProvider: r,
      providerSelectionLockReason: a.batchSttProviderSelectionLockReason,
      usingTertiaryProvider: n.usingTertiaryProvider,
      durationMs: Math.round(n.durationMs),
      speechIntervalCount: n.intervalCount,
      speechEvidenceSource: n.speechEvidenceSource,
      maxSpeechIntervalMs: Math.round(n.maxSpeechIntervalMs || 0),
      maxSileroSpeechRunMs: Math.round(n.maxSileroSpeechRunMs || 0),
      vadSpeech: n.vadSpeech,
      nonSilent: n.nonSilent,
      rms: aP(n.rms),
      peak: aP(n.peak),
      zcr: aP(n.zcr),
    },
    { source: "offscreen", provider: n.provider, level: "warn" },
  );
  const i = Date.now();
  try {
    const t = await fM(a, 1);
    (await JM(a), (t.data = BM(t?.data || {}, a)));
    let r = wD(t?.data?.text || t?.data?.transcript || "");
    const o = xM(r, n.provider, t?.data || {});
    return (
      o.rejected &&
        ((t.data = {
          ...(t.data || {}),
          text: "",
          transcript: "",
          words: [],
          emptyAlternateHallucinationRejected: !0,
          emptyAlternateHallucinationReason: o.reason,
        }),
        (r = ""),
        Nx(
          "stt.batch.empty_alternate_rescue_hallucination_rejected",
          {
            segmentId: e.id,
            provider: n.provider,
            reason: o.reason,
            stockPhraseCount: o.stockPhraseCount,
            residualChars: o.residualChars,
            textChars: o.textChars,
            wordCount: o.wordCount,
            sourceLang: _P(gc.config?.sourceLang),
          },
          { source: "offscreen", provider: n.provider, level: "warn" },
        )),
      Nx(
        "stt.batch.empty_alternate_rescue_completed",
        {
          segmentId: e.id,
          provider: n.provider,
          textChars: Array.from(r).length,
          latencyMs: Math.max(0, Date.now() - i),
          billableDurationMs: Math.round(t?.billableDurationMs || 0),
          recovered: Boolean(r),
        },
        {
          source: "offscreen",
          provider: n.provider,
          level: r ? "info" : "warn",
        },
      ),
      {
        attempted: !0,
        decision: n,
        result: t,
        transcriptionSegment: a,
        text: r,
      }
    );
  } catch (t) {
    return (
      Nx(
        "stt.batch.empty_alternate_rescue_failed",
        {
          segmentId: e.id,
          provider: n.provider,
          latencyMs: Math.max(0, Date.now() - i),
          error: t?.message || String(t || ""),
        },
        { source: "offscreen", provider: n.provider, level: "warn" },
      ),
      { attempted: !0, decision: n, error: t }
    );
  }
}
function xM(e = "", t = "", n = {}) {
  const a = wD(e),
    r = _P(gc.config?.sourceLang),
    i = LP(t),
    o = {
      rejected: !1,
      reason: "",
      stockPhraseCount: 0,
      residualChars: Array.from(a).length,
      textChars: Array.from(a).length,
      wordCount: AR(n?.words).length,
    };
  if (!a || "jpn" !== r || i !== ee) return o;
  let s = a.replace(/[^\p{L}\p{N}]/gu, "");
  const l = [
    "ご視聴ありがとうございました",
    "ありがとうございました",
    "お疲れ様でした",
    "おめでとう",
    "アーメンス",
    "アーメン",
  ];
  let c = 0;
  for (const e of l) for (; s.includes(e); ) ((s = s.replace(e, "")), (c += 1));
  s = s.replace(
    /(?:はい|うん|ん|あ|え|お|はぁ|パー|パーン|とてもいいです)+/gu,
    "",
  );
  const d = Array.from(s).length,
    u = /^(?:ん+|はい+|うん+|あ+|え+|お+|はぁ+|パー+|パーン+)$/u.test(
      a.replace(/[^\p{L}]/gu, ""),
    );
  let m = "";
  return (
    c >= 2
      ? (m = "repeated-stock-phrase")
      : c >= 1 && d <= 10
        ? (m = "stock-phrase-dominant")
        : u && (m = "short-filler-only"),
    {
      ...o,
      rejected: Boolean(m),
      reason: m,
      stockPhraseCount: c,
      residualChars: d,
    }
  );
}
function EM(e = {}) {
  const t = wD(e.text || ""),
    n = Array.isArray(e.detectedSpeechIntervals)
      ? e.detectedSpeechIntervals
      : [],
    a = Math.max(0, Math.round(Number(e.partialSpeechRetryCount) || 0));
  if (t || 0 === n.length || a > 0) return { handled: !1 };
  const r = e.alternateRescue || null,
    i = wD(
      r?.text || r?.result?.data?.text || r?.result?.data?.transcript || "",
    );
  return Boolean(!0 === r?.attempted && r?.result && !r?.error && !i)
    ? {
        handled: !0,
        stage: "subtitle-ready",
        outcome: "unverified-dual-provider-empty",
        eventType: "stt.batch.empty_range_confirmed_no_text",
        readinessReason: "stt-coverage-ready-confirmed-empty",
        pipelineStage: "no-text",
        playbackReady: !0,
      }
    : {
        handled: !0,
        stage: "subtitle-unavailable",
        outcome: "stt-empty-with-detected-speech",
        eventType: "stt.batch.empty_range_suppressed",
        readinessReason: "stt-coverage-unavailable",
        pipelineStage: "error",
        playbackReady: !1,
      };
}
function PM(e = {}) {
  const t = e.speechIntervalOffsets;
  return t && Array.isArray(t.intervals) ? t.intervals.length : null;
}
function DM(e = {}) {
  const t = Array.isArray(e.speechIntervalOffsets?.intervals)
    ? e.speechIntervalOffsets.intervals
    : [];
  let n = 0;
  for (const e of t) {
    const t = rP(e?.start),
      a = rP(e?.end);
    null === t || null === a || a <= t || (n = Math.max(n, 1e3 * (a - t)));
  }
  let a = 0,
    r = Math.max(0, rP(e.pcmWindowVadDecision?.maxSpeechRunMs) || 0);
  for (const t of Array.isArray(e.chunks) ? e.chunks : [])
    Boolean(
      !0 === t?.localVadAnalyzed &&
        t.localVadProvider === $t &&
        !0 === t.localVadSpeech,
    )
      ? ((a += Math.max(0, rP(t.durationMs) || 0)), (r = Math.max(r, a)))
      : (a = 0);
  const i = n >= Wa,
    o = r >= Wa;
  return {
    confirmed: i || o,
    source: i
      ? "confirmed-speech-interval"
      : o
        ? "confirmed-silero-speech"
        : "no-confirmed-speech",
    intervalCount: t.length,
    maxSpeechIntervalMs: n,
    maxSileroSpeechRunMs: r,
  };
}
function IM(e = {}, t = {}, n = {}) {
  const a = t.data || {},
    r = wD(n.text ?? a.text ?? a.transcript ?? ""),
    i = a.provider || fg(e),
    o = Math.max(0, rP(t.uploadLatencyMs) || 0),
    s = Math.max(0, rP(a.latencyMs) || 0),
    l = a.model || a.provider || i;
  (UM(e, Boolean(r)),
    Nx(
      r ? "stt.batch.result" : "stt.batch.empty_result",
      {
        segmentId: e.id,
        retry: Boolean(n.retry),
        text: r,
        textChars: Array.from(r).length,
        audioSpeed: t.audioSpeed,
        appliedSpeed: t.appliedSpeed,
        durationMs: Math.round(
          rP(t.transcriptionDurationMs) ||
            oy(t.uploadChunks) ||
            e.durationMs ||
            0,
        ),
        billableDurationMs: Math.round(t.billableDurationMs || 0),
        latencyMs: o,
        requestStartedAtMs: rP(t.requestStartedAtMs),
        requestCompletedAtMs: rP(t.requestCompletedAtMs),
        backendLatencyMs: s,
        gatewayAndTransportOverheadMs: Math.max(0, o - s),
        provider: i,
        model: l,
        queueWaitMs: a.queueWaitMs || 0,
        generationRole: a.generation?.role || "",
        generationShared: !0 === a.generation?.shared,
        generationWaitMs: Math.max(
          0,
          Math.round(rP(a.generation?.waitMs) || 0),
        ),
        generationWorkId: wD(a.generation?.workId || ""),
        sttProviderAudioView: t.sttProviderAudioView || "",
      },
      {
        source: "offscreen",
        level: r ? "info" : "warn",
        provider: i,
        model: l,
      },
    ));
}
function LM(e = "") {
  const t = String(e || "")
    .toLowerCase()
    .trim()
    .replace(/_/g, "-");
  return t
    ? /^(?:ja|jpn|japanese)(?:-|$)/.test(t)
      ? "jpn"
      : /^(?:zh|zho|cmn|chinese|mandarin)(?:-|$)/.test(t)
        ? "zho"
        : /^(?:en|eng|english)(?:-|$)/.test(t)
          ? "eng"
          : t
    : "";
}
function _M(e = "") {
  const t = wD(e),
    n = Array.from(t),
    a = {
      total: n.length,
      kana: 0,
      han: 0,
      latin: 0,
      hangul: 0,
      letters: 0,
      latinWords: (t.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g) || []).length,
      simplifiedChineseMarkers: (
        t.match(
          /[这们个为从发后里时对会说还没边东过种样让给吗吧哦气较辑装]/gu,
        ) || []
      ).length,
      chineseLexicalMarkers: (
        t.match(
          /(?:我們|你們|他們|他们|這是|这是|這個|这个|那個|那个|就是|真的|因為|因为|所以|但是|然後|然后|沒有|没有|今天|那邊|那边|比較|比较|怎麼|怎么|什麼|什么|的是|我是|我說|我说)/gu,
        ) || []
      ).length,
    };
  for (const e of n)
    (/^[\u3040-\u30ff\u31f0-\u31ff]$/u.test(e)
      ? (a.kana += 1)
      : /^[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]$/u.test(e)
        ? (a.han += 1)
        : /^[A-Za-z]$/u.test(e)
          ? (a.latin += 1)
          : /^[\uac00-\ud7af]$/u.test(e) && (a.hangul += 1),
      /\p{L}/u.test(e) && (a.letters += 1));
  return a;
}
function BM(e = {}, t = {}) {
  const n = LP(e.provider || t.batchSttProviderOverride || fg(t)),
    a = _P(gc.config?.sourceLang),
    r = wD(e.text || e.transcript || "");
  if (
    (n !== oe && n !== Y && n !== ee && n !== re) ||
    "jpn" !== a ||
    !ib(t) ||
    !r
  )
    return e;
  const i = wD(e.detected_language || e.language_code || e.language || ""),
    o = LM(i),
    s = _M(r),
    l = s.letters > 0 ? s.latin / s.letters : 0,
    c = Boolean(
      s.simplifiedChineseMarkers >= 2 || s.chineseLexicalMarkers >= 2,
    );
  let d = "";
  return (
    "zho" === o && 0 === s.kana && s.han >= 6
      ? (d = "detected-chinese-without-kana")
      : 0 === s.kana && s.han >= 10 && c
        ? (d = "script-chinese-dominant")
        : 0 === s.kana &&
          0 === s.hangul &&
          s.latin >= zs &&
          s.latinWords >= 4 &&
          l >= 0.8 &&
          (d =
            "eng" === o
              ? "detected-english-dominant"
              : "script-english-dominant"),
    d
      ? (Nx(
          n === oe
            ? "stt.batch.speechEngineI_language_mismatch_rejected"
            : "stt.batch.source_language_mismatch_rejected",
          {
            segmentId: t.id,
            provider: n,
            sourceLang: a,
            detectedLanguage: i,
            normalizedDetectedLanguage: o,
            mismatchReason: d,
            textChars: s.total,
            scriptCounts: s,
            durationMs: Math.round(rP(t.durationMs) || 0),
          },
          { source: "offscreen", provider: oe, level: "warn" },
        ),
        {
          ...e,
          text: "",
          transcript: "",
          words: [],
          sourceLanguageMismatchRejected: !0,
          sourceLanguageMismatchReason: d,
          speechEngineILanguageMismatchRejected: n === oe,
          speechEngineILanguageMismatchReason: n === oe ? d : "",
        })
      : e
  );
}
function UM(e = {}, t = !1) {
  ib(e) &&
    (t
      ? (gc.mseSttEmptyStreak = 0)
      : ((gc.mseSttEmptyStreak = (gc.mseSttEmptyStreak || 0) + 1),
        3 === gc.mseSttEmptyStreak &&
          (Nx(
            "stt.batch.mse_empty_streak",
            {
              streak: gc.mseSttEmptyStreak,
              segmentId: e.id,
              durationMs: Math.round(e.durationMs || 0),
            },
            { source: "offscreen", level: "warn" },
          ),
          vP(
            "mse-audio-buffer",
            "MSE 音訊持續辨識為空，字幕可能缺漏（收集診斷中）",
          ))));
}
function qM(e = {}) {
  if (bh(e)) return 1;
  if (ib(e) && FM(e.chunks || [])) return KP(gc.config?.sttAudioSpeed, fg(e));
  const t = (e.chunks || [])
    .map((e) => rP(e.sttAudioSpeed))
    .filter((e) => null !== e);
  return t.length ? KP(Math.max(...t), fg(e)) : zP();
}
function FM(e = []) {
  return (e || []).some((e) => e?.encodedAudio && yp(e.bytes).byteLength > 0);
}
function OM(e) {
  return (
    e?.length >= 4 && 26 === e[0] && 69 === e[1] && 223 === e[2] && 163 === e[3]
  );
}
function NM(e) {
  const t = yp(e),
    n = [],
    a = [];
  let r = 0,
    i = 0,
    o = !1,
    s = !1;
  for (; r + 8 <= t.length && i++ < 1024; ) {
    const e = new DataView(t.buffer, t.byteOffset + r, t.length - r);
    let i = e.getUint32(0),
      l = 8;
    const c = String.fromCharCode(...t.subarray(r + 4, r + 8));
    if (1 === i) {
      if (e.byteLength < 16) return null;
      ((i = Number(e.getBigUint64(8))), (l = 16));
    } else 0 === i && (i = t.length - r);
    if (!Number.isSafeInteger(i) || i < l || r + i > t.length) return null;
    const d = t.subarray(r, r + i);
    (("ftyp" === c || "moov" === c ? n : a).push(d),
      (o ||= "moof" === c),
      (s ||= "mdat" === c),
      (r += i));
  }
  if (r !== t.length || (!o && s) || (!o && !n.length)) return null;
  const l = (e) => {
    const t = new Uint8Array(e.reduce((e, t) => e + t.length, 0));
    let n = 0;
    for (const a of e) (t.set(a, n), (n += a.length));
    return t;
  };
  return { initBytes: l(n), mediaBytes: l(a), hasMoof: o };
}
function HM(e = [], t = {}) {
  const n = (e || []).filter((e) => e?.encodedAudio).map((e) => Df(e)),
    a = n.find((e) => yp(e.bytes).byteLength > 0) || {},
    r = bp(a.mimeType),
    i = Tp(a.extension, r),
    o = [],
    s = n.find((e) => yp(e.initBytes).byteLength > 0),
    l = r.includes("mp4") || r.includes("m4a"),
    c = l ? n.map((e) => NM(e.bytes)) : [],
    d = l && s ? NM(s.initBytes)?.initBytes : null,
    u = d?.length ? d : c.find((e) => e?.initBytes.length)?.initBytes;
  if (u?.length && c.length && c.every((e) => e?.hasMoof))
    o.push(u, ...c.map((e) => e.mediaBytes));
  else {
    s && o.push(yp(s.initBytes));
    for (const e of n) {
      const t = yp(e.bytes);
      t.byteLength && o.push(t);
    }
  }
  const m = o.reduce((e, t) => e + t.byteLength, 0),
    g = new Uint8Array(m);
  let p = 0;
  for (const e of o) (g.set(e, p), (p += e.byteLength));
  const f = t.segmentId ?? "chunk";
  return {
    bytes: g,
    mimeType: r,
    extension: i,
    filename: `${String(t.filenamePrefix || "caption-mse").replace(/[^a-zA-Z0-9_.-]/g, "-")}-${f}.${i}`,
  };
}
(chrome.runtime.onMessage.addListener((e, t, n) => {
  if ("offscreen" === e?.target && !ic) {
    const trustedWorker=t?.id===chrome.runtime.id && !t.tab && (!t.url || t.url===chrome.runtime.getURL('service-worker.js'));
    // Content scripts only submit their existing diagnostic event. They may
    // not command the capture manager to relay privileged provider operations.
    if (!trustedWorker && !(t?.id===chrome.runtime.id && e.type==='APPEND_EVENT_LOG')) {
      n({ok:false,error:'無效的字幕擷取控制來源'}); return false;
    }
    return (
      fc(e)
        .then(n)
        .catch((e) =>
          n({ ok: !1, error: e?.message || "offscreen manager failed" }),
        ),
      !0
    );
  }
}),
  ic &&
    window.addEventListener("message", (e) => {
      if (e.source !== window.parent || e.origin !== rc) return;
      const t = e.data || {};
      if ("offscreen-runner" !== t?.target || t.runnerSessionId !== ic) return;
      const n = t.requestId || "";
      pc(t.message || {})
        .then((t) => {
          e.source?.postMessage(
            {
              target: "offscreen-manager",
              runnerSessionId: ic,
              requestId: n,
              result: t,
            },
            e.origin || "*",
          );
        })
        .catch((t) => {
          e.source?.postMessage(
            {
              target: "offscreen-manager",
              runnerSessionId: ic,
              requestId: n,
              result: {
                ok: !1,
                error: t?.message || "offscreen runner failed",
              },
            },
            e.origin || "*",
          );
        });
    }));
let GM = null;
function WM() {
  return "undefined" == typeof OfflineAudioContext
    ? null
    : (GM || (GM = new OfflineAudioContext(1, Ge, Ge)), GM);
}
async function $M(e) {
  const t = await VM(e);
  return t ? KM(t.scanSamples, t.scanSampleRate, t.durationSeconds) : null;
}
async function VM(e, t = {}) {
  const n = WM();
  if (!n || !e?.byteLength) return null;
  try {
    const t = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength),
      a = await n.decodeAudioData(t),
      r = jM(a);
    return {
      samples: SD(r, a.sampleRate, Ge),
      scanSamples: r,
      scanSampleRate: a.sampleRate,
      durationSeconds: a.duration,
    };
  } catch (n) {
    return (
      t.reportError &&
        t.sessionId === gc.sessionId &&
        t.timelineRevision === gc.timelineRevision &&
        Nx(
          "mse.audio_decode.error",
          {
            sequence: t.sequence,
            mimeType: t.mimeType || "",
            encodedBytes: e.byteLength,
            errorName: String(n?.name || "Error").slice(0, 80),
            error: String(n?.message || "Audio decoding failed").slice(0, 160),
          },
          { source: "offscreen", level: "warn" },
        ),
      null
    );
  }
}
function jM(e) {
  const t = Math.max(1, e?.numberOfChannels || 1),
    n = Math.max(0, e?.length || 0);
  if (1 === t) return new Float32Array(e.getChannelData(0));
  const a = new Float32Array(n);
  for (let r = 0; r < t; r += 1) {
    const i = e.getChannelData(r);
    for (let e = 0; e < n; e += 1) a[e] += (i[e] || 0) / t;
  }
  return a;
}
function KM(e, t, n) {
  const a = rP(n);
  if (!e?.length || !(t > 0) || null === a || a <= 0.5) return null;
  const r = Math.max(64, Math.round(t * Ps)),
    i = Math.floor(e.length / r);
  if (i < 10) return null;
  const o = new Float64Array(i);
  for (let t = 0; t < i; t += 1) {
    let n = 0;
    const a = t * r;
    for (let t = 0; t < r; t += 1) {
      const r = e[a + t];
      n += r * r;
    }
    o[t] = Math.sqrt(n / r);
  }
  const s = Array.from(o).sort((e, t) => e - t),
    l = s[Math.floor(0.2 * i)],
    c = s[Math.min(i - 1, Math.floor(0.95 * i))],
    d = Math.max(0.003, 3 * l);
  if (!(c > 1.4 * d)) return null;
  const u = r / t,
    m = [];
  let g = null;
  for (let e = 0; e <= i; e += 1) {
    const t = e < i && o[e] >= d;
    t && null === g
      ? (g = e * u)
      : t || null === g || (m.push({ start: g, end: e * u }), (g = null));
  }
  if (!m.length) return null;
  const p = [];
  for (const e of m) {
    const t = {
        start: Math.max(0, e.start - Ls),
        end: Math.min(a, e.end + _s),
      },
      n = p[p.length - 1];
    n && t.start - n.end <= Is ? (n.end = Math.max(n.end, t.end)) : p.push(t);
  }
  const f = p.filter((e) => e.end - e.start >= Ds);
  if (!f.length) return null;
  const h = f.reduce((e, t) => e + (t.end - t.start), 0) / a;
  return h < Bs || h > Us ? null : { intervals: f, durationSeconds: a };
}
function zM(e, t) {
  e &&
    !e.speechIntervalsPromise &&
    (e.speechIntervalsPromise = $M(t)
      .then((t) => ((e.speechIntervalOffsets = t), t))
      .catch(() => null));
}
function QM(e, t, n = null) {
  if (!e || e.speechIntervalsPromise) return;
  const a = t instanceof Float32Array ? t : new Float32Array();
  if (!a.length) return;
  const r = Math.max(0, null !== rP(n) ? rP(n) / 1e3 : a.length / Ge);
  if (r <= 0) return;
  const i = KM(a, Ge, r);
  ((e.speechIntervalOffsets = i),
    (e.speechIntervalsPromise = Promise.resolve(i)));
}
async function JM(e) {
  if (!e?.speechIntervalsPromise) return null;
  try {
    return await Promise.race([
      e.speechIntervalsPromise,
      new Promise((e) => setTimeout(() => e(null), qs)),
    ]);
  } catch {
    return null;
  }
}
function XM(e, t, n) {
  if (!e?.intervals?.length) return null;
  const a = rP(t),
    r = rP(n),
    i = rP(e.durationSeconds);
  if (null === a || null === r || r <= a || null === i || i <= 0) return null;
  const o = (r - a) / i,
    s = e.intervals
      .map((e) => ({
        start: aP(dP(a + e.start * o, a, r)),
        end: aP(dP(a + e.end * o, a, r)),
      }))
      .filter((e) => e.end > e.start);
  return s.length ? s : null;
}
function ZM(e = {}) {
  return Boolean(
    e.msePartialSpeechRetry ||
      "mse-partial-speech-retry" === String(e.reason || "") ||
      (e.chunks || []).some((e) => e?.msePartialSpeechRetry),
  );
}
function YM(e = {}) {
  return Boolean(
    e.msePcmPrimaryContextOverlap ||
      (e.chunks || []).some((e) => e?.msePcmPrimaryContextOverlap),
  );
}
function ev(e = {}) {
  return ZM(e)
    ? iu(e.mseBackfillTargetStartMediaTime, e.mseBackfillTargetEndMediaTime)
    : YM(e)
      ? iu(e.mseCoverageCoreStartMediaTime, e.mseCoverageCoreEndMediaTime)
      : null;
}
function tv(e = {}, t = {}, n = 1) {
  const a = ev(t);
  if (!a) return e;
  const r = a.start,
    i = a.end,
    o = sp(t),
    s = Math.max(0, (rP(t.durationMs) || 0) / 1e3);
  if (null === r || null === i || i <= r || !o || !s || o.end <= o.start)
    return e;
  const l = Array.isArray(e.words) ? e.words : [],
    c = AR(Ov(l, n));
  if (!c.length) return e;
  const d = o.end - o.start,
    u = c.filter((e) => {
      const t = (e.startSeconds + e.endSeconds) / 2,
        n = o.start + dP(t / s, 0, 1) * d;
      return n >= r - yi && n <= i + yi;
    }),
    m = new Set(u.map((e) => e.index)),
    g = l.filter((e, t) => m.has(t)),
    p = wD(u.map((e) => e.text).join(" ")).replace(
      /\s+([,.;!?！？。，、])/g,
      "$1",
    ),
    f = ZM(t) ? "partial-speech-retry" : "pcm-primary-context";
  return (
    Nx(
      "partial-speech-retry" === f
        ? "stt.batch.partial_speech_retry_cropped"
        : "stt.batch.context_overlap_cropped",
      {
        segmentId: t.id,
        mode: f,
        inputWordCount: c.length,
        outputWordCount: u.length,
        inputTextChars: Array.from(wD(e.text || e.transcript || "")).length,
        outputTextChars: Array.from(p).length,
        targetStartMediaTime: aP(r),
        targetEndMediaTime: aP(i),
        contextStartMediaTime: aP(o.start),
        contextEndMediaTime: aP(o.end),
      },
      { source: "offscreen", level: u.length ? "info" : "warn" },
    ),
    { ...e, text: p, transcript: p, words: g }
  );
}
function nv(e = {}, t = {}, n = 1) {
  return tv(e, t, n);
}
function av(e = {}, t = {}, n = 1) {
  const a = e.speechIntervalOffsets;
  if (!a?.intervals?.length || ZM(e)) return [];
  const r = LP(t.provider || fg(e));
  if (!nD(r)) return [];
  if (
    "discard-incompatible-word-timing" ===
      wD(t.transcriptConsistency?.action || "") &&
    wD(t.text || t.transcript || "")
  )
    return (
      Nx(
        "stt.batch.partial_speech_retry_skipped",
        {
          segmentId: e.id,
          reason: "incompatible-word-timing",
          textChars: Array.from(wD(t.text || t.transcript || "")).length,
          speechIntervalCount: a.intervals.length,
        },
        { source: "offscreen", level: "warn", provider: r },
      ),
      []
    );
  const i = Math.max(
    0,
    rP(a.durationSeconds) || Math.max(0, rP(e.durationMs) || 0) / 1e3,
  );
  if (!i) return [];
  const o = sp(e),
    s = ev(e),
    l =
      o && s
        ? dP(((s.start - o.start) / Math.max(0.001, o.end - o.start)) * i, 0, i)
        : 0,
    c =
      o && s
        ? dP(((s.end - o.start) / Math.max(0.001, o.end - o.start)) * i, l, i)
        : i,
    d = AR(Ov(t.words, n))
      .map((e) => ({
        start: Math.max(0, e.startSeconds - hi),
        end: Math.min(i, e.endSeconds + hi),
      }))
      .filter((e) => e.end > e.start)
      .sort((e, t) => e.start - t.start),
    u = [];
  for (const e of d) {
    const t = u[u.length - 1];
    t && e.start <= t.end + hi
      ? (t.end = Math.max(t.end, e.end))
      : u.push({ ...e });
  }
  const m = [];
  for (const e of a.intervals) {
    const t = dP(rP(e?.start) || 0, l, c),
      n = dP(rP(e?.end) || 0, t, c);
    if (n <= t) continue;
    let a = t;
    for (const e of u)
      if (
        !(e.end <= a || e.start >= n) &&
        (e.start > a &&
          m.push({
            start: a,
            end: Math.min(n, e.start),
            leading: a <= t + 0.001,
          }),
        (a = Math.max(a, Math.min(n, e.end))),
        a >= n)
      )
        break;
    a < n && m.push({ start: a, end: n, leading: a <= t + 0.001 });
  }
  const g = m
      .filter((e) => e.end - e.start >= (e.leading ? 2 : 3))
      .sort((e, t) => e.start - t.start),
    p = [];
  for (const e of g) {
    const t = p[p.length - 1];
    t && e.start <= t.end + hi
      ? (t.end = Math.max(t.end, e.end))
      : p.push({ ...e });
  }
  return p.slice(0, 2);
}
function rv(e = {}, t = []) {
  const n = sp(e),
    a = Math.max(
      0,
      rP(e.speechIntervalOffsets?.durationSeconds) ||
        Math.max(0, rP(e.durationMs) || 0) / 1e3,
    );
  if (!n || !a || !t.length) return [];
  const r = (n.end - n.start) / a;
  return t
    .map((e) => ({
      start: dP(n.start + e.start * r - Si, n.start, n.end),
      end: dP(n.start + e.end * r + Si, n.start, n.end),
    }))
    .filter((e) => e.end > e.start)
    .map((e) => ({ start: aP(e.start), end: aP(e.end) }));
}
function iv(e = {}, t = []) {
  const n = sp(e);
  if (!n) return;
  const a = (t || [])
    .map((e) => iu(e?.start, e?.end))
    .filter(Boolean)
    .sort((e, t) => e.start - t.start);
  let r = n.start;
  for (const e of a) {
    const t = dP(e.start, n.start, n.end),
      a = dP(e.end, t, n.end);
    (t > r && im(r, t), (r = Math.max(r, a)));
  }
  r < n.end && im(r, n.end);
}
function ov(e = {}, t = {}, n = 1) {
  if (!ib(e) || ZM(e)) return { count: 0, ranges: [] };
  const a = DM(e);
  if (!a.confirmed)
    return (
      null !== PM(e) &&
        Nx(
          "stt.batch.partial_speech_retry_suppressed",
          {
            segmentId: e.id,
            reason: a.source,
            speechIntervalCount: a.intervalCount,
            maxSpeechIntervalMs: Math.round(a.maxSpeechIntervalMs),
            maxSileroSpeechRunMs: Math.round(a.maxSileroSpeechRunMs),
          },
          { source: "offscreen" },
        ),
      { count: 0, ranges: [] }
    );
  const r = rv(e, av(e, t, n));
  if (!r.length) return { count: 0, ranges: [] };
  const i = gc.pcmGroundTruthRing || [],
    o = vu(e),
    s = [];
  for (const t of r) {
    const n = pm(i, t.start, t.end),
      a = Math.max(0.001, t.end - t.start);
    if (!n.chunks.length || n.coveredSeconds / a < 0.95) {
      Nx(
        "stt.batch.partial_speech_retry_unavailable",
        {
          segmentId: e.id,
          mediaStartTime: aP(t.start),
          mediaEndTime: aP(t.end),
          coveredSeconds: aP(n.coveredSeconds),
          targetSeconds: aP(a),
          ringSpanSeconds: aP((gc.pcmGroundTruthRingMs || 0) / 1e3),
        },
        { source: "offscreen", level: "error" },
      );
      continue;
    }
    const r = pm(i, Math.max(0, t.start - Mi), t.end + 3),
      l = r.chunks.length ? r.chunks : n.chunks,
      c = sP(l.map((e) => rP(e.sourceMediaStartTime))) ?? t.start,
      d = lP(l.map((e) => rP(e.sourceMediaEndTime))) ?? t.end,
      u = sy(),
      m = l.map((e) =>
        Df({
          ...e,
          sourceType: "mse-audio-buffer",
          mseGapBackfill: !0,
          msePartialSpeechRetry: !0,
        }),
      ),
      g = {
        id: u.nextSegmentId,
        chunks: m,
        durationMs: Math.round(
          m.reduce((e, t) => e + (rP(t.durationMs) || 0), 0),
        ),
        reason: "mse-partial-speech-retry",
        deadlineMediaTime: t.start,
        mseBackfillUrgent: !0,
        msePartialSpeechRetry: !0,
        mseStartupCatchup: Boolean(e.mseStartupCatchup),
        batchSttProviderOverride: e.batchSttProviderOverride,
        mseSpeechRetryClaimIds: o,
        mseBackfillTargetStartMediaTime: t.start,
        mseBackfillTargetEndMediaTime: t.end,
        mseBackfillContextStartMediaTime: c,
        mseBackfillContextEndMediaTime: d,
        mseBackfillContextSeconds: Math.max(0, t.start - c),
        timelineRevision: gc.timelineRevision,
        createdAtMs: Date.now(),
      };
    ((u.nextSegmentId += 1),
      s.push(t),
      nh(g, "partial-speech-retry-queued", {
        done: !1,
        active: !0,
        reason: "stt-word-coverage-hole",
      }),
      Yf(g));
  }
  return (
    s.length &&
      (ku(o, s.length, { segmentId: e.id, ranges: s }),
      Nx(
        "stt.batch.partial_speech_retry_queued",
        {
          segmentId: e.id,
          claimIds: o,
          retryCount: s.length,
          mediaRanges: s,
          wordCount: AR(Ov(t.words, n)).length,
          speechIntervalCount: e.speechIntervalOffsets?.intervals?.length || 0,
        },
        { source: "offscreen", level: "warn" },
      )),
    { count: s.length, ranges: s }
  );
}
function sv(e = {}, t = "before-fetch") {
  const n = wD(e?.sessionId || ""),
    a = wD(gc.sessionId || ""),
    r = rP(e?.timelineRevision),
    i = rP(gc.timelineRevision) ?? 0,
    o = Boolean(n && n !== a),
    s = null !== r && r !== i,
    l =
      null != e.captureGeneration &&
      e.captureGeneration !== gc.captureGeneration,
    c = null != e.authUid && e.authUid !== (gc.config?.auth?.uid || "");
  if (!(o || s || l || c)) return !0;
  Nx(
    "stt.batch.upload_cancelled_stale_owner",
    {
      phase: t,
      requestId: wD(e?.requestId || e?.segmentId || ""),
      requestSessionId: n,
      currentSessionId: a,
      requestRevision: r,
      currentRevision: i,
      staleSession: o,
      staleRevision: s,
    },
    { source: "offscreen", provider: LP(e?.sttProvider), level: "warn" },
  );
  const d = new Error("STT upload cancelled because request ownership changed");
  throw ((d.sttRequestOwnershipCancelled = !0), (d.sttStopCancelled = !0), d);
}
function lv(e = {}, t = "in-flight") {
  const n = new Error(`STT upload cancelled during ${t}`);
  return (
    (n.name = "AbortError"),
    (n.sttRequestOwnershipCancelled = !0),
    (n.sttStopCancelled = !0),
    (n.requestId = wD(e?.requestId || e?.segmentId || "")),
    n
  );
}
async function cv(e, t) {
  const n = t.walletRequestContext;
  if (!n?.requestId || !n.sessionId) throw new Error("缺少音訊工作識別碼");
  sv(n, "wallet-speechEngineA-before-upload");
  const a = t.deadlineAtMs ?? Date.now() + (Number(t.timeoutMs) || Lo),
    r = Math.min(3e4, Math.floor(a - Date.now()));
  if (r < 500) throw new Error("即時辨識時間已不足");
  const i = new AbortController();
  gc.localSpeechEngineAHttpControllers.add(i);
  try {
    const t = await pv(
        vD(e, Ge),
        {
          ...n,
          sttProvider: ae,
          sourceLang: gc.config.sourceLang || "auto",
          audioSpeed: 1,
          mimeType: "audio/wav",
        },
        { signal: i.signal, timeoutMs: r },
      ),
      o = await gD(t, "json", Math.max(1, a - Date.now()), "即時辨識字幕");
    if (!t.ok)
      throw Object.assign(new Error(o.error || "即時辨識失敗"), {
        code: o.error,
        status: t.status,
      });
    if (
      (sv(n, "wallet-speechEngineA-completed"),
      gc.isStopping || i.signal.aborted)
    )
      throw new Error("字幕工作已停止");
    return {
      ...o,
      transcript: o.text,
      transport: "wallet-upload",
      requestId: n.requestId,
    };
  } finally {
    gc.localSpeechEngineAHttpControllers.delete(i);
  }
}
async function dv(e, t) {
  const n = [
      String(e.authUid ?? gc.config?.auth?.uid ?? ""),
      t,
      String(e.captureGeneration ?? gc.captureGeneration ?? ""),
      String(e.requestId || e.segmentId),
      e.timelineRevision ?? gc.timelineRevision ?? 0,
      e.mediaContextKey || e.videoKey || tE() || "",
      e.mediaStartTime ?? e.sourceMediaStartTime ?? null,
      e.mediaEndTime ?? e.sourceMediaEndTime ?? null,
    ],
    a = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(JSON.stringify(n)),
    );
  return `stt:${Array.from(new Uint8Array(a), (e) => e.toString(16).padStart(2, "0")).join("")}`;
}
async function uv(e, t) {
  return `llm:${(await dv({ ...e, requestId: `llm:${e.walletRequestSequence ?? e.requestId}` }, t)).slice(4)}`;
}
function mv(e) {
  return Object.keys(Be).find((t) => Be[t] === e) || e;
}
function gv(e = {}, t = null) {
  if (
    !0 === e.sourceIsLiveStream ||
    !0 === gc.config?.sourceIsLiveStream ||
    !0 === gc.config?.sttContextCustom
  )
    return null;
  const n = e.videoKey || e.mediaContextKey || "";
  if (
    !/^youtube:[A-Za-z0-9_-]{11}$/.test(n) ||
    null == e.mediaStartTime ||
    null == e.mediaEndTime
  )
    return null;
  const a = Math.round(1e3 * Number(e.mediaStartTime)),
    r = Math.round(1e3 * Number(e.mediaEndTime)),
    i = e.timelineRevision ?? gc.timelineRevision ?? 0;
  if (
    ![a, r, i].every(Number.isSafeInteger) ||
    a < 0 ||
    r <= a ||
    r - a > 6e4 ||
    i < 0 ||
    i > 1e6
  )
    return null;
  const o = { videoKey: n, timelineRevision: i, startMs: a, endMs: r };
  if (null !== t) {
    if (
      !Array.isArray(t) ||
      !t.length ||
      t.length > 18 ||
      t.some((e) => "string" != typeof e || !e || e.length > 200)
    )
      return null;
    o.sttRequestIds = [...new Set(t)];
  }
  return o;
}
async function pv(e, t, n = {}) {
if(gc.isStopping || gc.stopRequestedAtMs || n.signal?.aborted) throw lv(t,'textamisu-upload');
  if(gc.remoteSessionStartPromise) await gc.remoteSessionStartPromise;
  const localId=gc.sessionId;
  const data=await TextamisuPipeline.stt(localId,e,t,n.signal);
  if(gc.sessionId!==localId || gc.isStopping) throw lv(t,'textamisu-session-changed');
  gc.textamisuSttLanguages ||= new Map();
  for(const id of data.sttRequestIds) gc.textamisuSttLanguages.set(id,data.language);
  return new Response(JSON.stringify(data),{status:200,headers:{'Content-Type':'application/json'}});
}
function fv(e = {}) {
  if (
    e?.encoded &&
    Number.isFinite(e?.byteLength) &&
    Number.isFinite(e?.chunkCount)
  )
    return e;
  const t = {};
  for (const n of i) {
    const a = e?.[n];
    null != a && "" !== a && (t[n] = a);
  }
  if (!Object.keys(t).length)
    return { context: {}, encoded: "", byteLength: 0, chunkCount: 0 };
  const n = new TextEncoder().encode(JSON.stringify(t)),
    a = TD(n),
    r = Math.ceil(a.length / o);
  return { context: t, encoded: a, byteLength: n.byteLength, chunkCount: r };
}
function hv(e = {}) {
  const t = fv(e);
  return t.byteLength > l || t.chunkCount > 8;
}
function Sv(e = {}) {
  const t = fv(e);
  if (!t.encoded) return {};
  const n = {
    "X-Caption-STT-Context-Version": "1",
    "X-Caption-STT-Context-Count": String(t.chunkCount),
  };
  for (let e = 0; e < t.chunkCount; e += 1)
    n[`X-Caption-STT-Context-${e}`] = t.encoded.slice(e * o, (e + 1) * o);
  return n;
}
async function Mv(e, t, n = {}) {
  const a = gc.sessionId,
    r = gc.config.backendUrl,
    i = n.segment || {};
  if (!a || (!i.id && !t.requestId)) throw new Error("缺少整合辨識工作識別碼");
  if (
    (sv(t, "integrated-before-wallet-upload"),
    gc.isStopping || gc.stopRequestedAtMs)
  )
    throw lv(t);
  const o = `integrated:${await dv({ ...t, requestId: i.id || t.requestId }, a)}`,
    s = {};
  for (const e of [
    "translationStyle",
    "isFinal",
    "latencyMode",
    "latencySlackMs",
    "syncDelaySeconds",
    "translationDeadlineMs",
    "translationDisplayDeadlineMs",
    "translationEndDeadlineMs",
    "estimatedTranslationLatencyMs",
  ])
    void 0 !== t[e] && (s[e] = t[e]);
  const l = {};
  for (const e of [
    "sttPrompt",
    "sttKeywords",
    "sourceLanguageHints",
    "sttLanguageMode",
  ])
    void 0 !== t[e] && (l[e] = t[e]);
  let c = {
    sourceLanguage: t.sourceLang || "auto",
    targetLanguage: t.targetLang || "zh",
    maxOriginalChars: t.maxOriginalChars || 900,
    maxSegments: t.maxSegments || 8,
    segmentationMode: t.segmentationMode || "auto",
    sttContext: l,
    translationContext: String(t.translationContext || "").slice(0, 2e3),
    translationKeywords: Array.isArray(t.translationKeywords)
      ? t.translationKeywords.slice(0, 50)
      : [],
  };
  const d = {
    ...c,
    captionOptions: Object.fromEntries(
      Object.entries(s).filter(([e]) =>
        ["translationStyle", "isFinal", "latencyMode"].includes(e),
      ),
    ),
  };
  i.walletIntegratedRequest?.requestId === o
    ? (c = { ...i.walletIntegratedRequest.content })
    : (i.walletIntegratedRequest = {
        requestId: o,
        content: structuredClone(d),
      });
  const u = {
      ...c,
      captionOptions: { ...s, ...(c.captionOptions || d.captionOptions) },
      requestId: o,
      mimeType: t.mimeType || "audio/wav",
      durationMs: t.originalDurationMs,
      audioBase64: TD(e instanceof Uint8Array ? e : new Uint8Array(e)),
      timeoutMs: Math.max(500, Math.min(12e4, Math.round(VP()))),
    },
    m = Date.now(),
    g = new AbortController();
  gc.localSpeechEngineAHttpControllers.add(g);
  try {
    const e = await SP();
    if (
      (sv(t, "integrated-wallet-headers-ready"),
      t.walletAudioWindow &&
        (e["x-audio-window"] = TD(
          new TextEncoder().encode(
            JSON.stringify({ ...t.walletAudioWindow, paddingMs: 0 }),
          ),
        )),
      gc.sessionId !== a ||
        gc.config.backendUrl !== r ||
        gc.isStopping ||
        gc.stopRequestedAtMs ||
        g.signal.aborted)
    )
      throw lv(t);
    const n = await mD(
        `${r}/caption-wallet-sessions/${encodeURIComponent(a)}/integrated`,
        {
          method: "POST",
          headers: e,
          body: JSON.stringify(u),
          signal: g.signal,
        },
        u.timeoutMs,
        "整合辨識與翻譯",
      ),
      i = await gD(
        n,
        "text",
        Math.max(1, u.timeoutMs - (Date.now() - m)),
        "整合字幕回應",
      );
    if (
      (sv(t, "integrated-wallet-response-ready"),
      g.signal.aborted ||
        gc.isStopping ||
        gc.stopRequestedAtMs ||
        gc.sessionId !== a ||
        gc.config.backendUrl !== r)
    )
      throw lv(t);
    return new Response(i, { status: n.status, headers: n.headers });
  } finally {
    gc.localSpeechEngineAHttpControllers.delete(g);
  }
}
async function vv(e, t, n = {}) {
  if ("sql-wallet-v1" === gc.config?.walletBillingProtocol) return Mv(e, t, n);
  const a = new URLSearchParams();
  for (const [e, n] of Object.entries(t || {}))
    null != n && "" !== n && (i.has(e) || a.set(e, String(n)));
  const r = `${gc.config.backendUrl}${b}?${a.toString()}`,
    o = e instanceof Uint8Array ? e : new Uint8Array(e || []),
    s = bp(t?.mimeType || "audio/wav"),
    l = fv(t),
    c = (e) =>
      Px(e, { endpoint: b, requestId: t?.requestId || t?.segmentId || "" });
  if (hv(l))
    return (
      Nx(
        "stt.integrated_context_json_upload",
        {
          provider: t?.provider || "",
          durationMs: t?.originalDurationMs || 0,
          contextBytes: l.byteLength,
          contextHeaderChunks: l.chunkCount,
        },
        { source: "offscreen" },
      ),
      c(async () =>
        mD(
          `${gc.config.backendUrl}${b}`,
          {
            method: "POST",
            headers: await SP(),
            body: JSON.stringify({ ...t, audioBase64: TD(o) }),
          },
          VP(),
          aD(t.sttProvider),
        ),
      )
    );
  const d = await c(async () => {
    const e = await SP(s);
    return (
      Object.assign(e, Sv(l)),
      mD(r, { method: "POST", headers: e, body: o }, VP(), aD(t.sttProvider))
    );
  });
  return yv(d)
    ? (Nx(
        "stt.integrated_binary_upload_fallback",
        {
          status: d.status,
          provider: t?.provider || "",
          durationMs: t?.originalDurationMs || 0,
        },
        { source: "offscreen" },
      ),
      c(async () =>
        mD(
          `${gc.config.backendUrl}${b}`,
          {
            method: "POST",
            headers: await SP(),
            body: JSON.stringify({ ...t, audioBase64: TD(o) }),
          },
          VP(),
          aD(t.sttProvider),
        ),
      ))
    : d;
}
function yv(e) {
  return e && [400, 404, 415].includes(Number(e.status));
}
function bv(e = {}, t = {}) {
  const n = Array.isArray(e.chunks) ? e.chunks : [],
    a = n[0] || {},
    r =
      (n[n.length - 1],
      n.length && n.every((e) => "mse-audio-buffer" === Uf(e))
        ? "mse-audio-buffer"
        : n.length
          ? Uf(a)
          : ""),
    i = sP(n.map((e) => e.sourceMediaStartTime)),
    o = lP(n.map((e) => e.sourceMediaEndTime)),
    s = sP(n.map((e) => e.captureStartWallTimeMs)),
    l = lP(n.map((e) => e.captureEndWallTimeMs ?? e.capturedAtMs)),
    c = Math.max(0, rP(e.durationMs) || oy(n)),
    d = wv(i, o, c),
    u = d.start,
    m = d.end,
    g = Date.now(),
    p = VA(g) ?? gc.captureMediaClock?.mediaTime ?? null,
    f = m ?? p,
    h = ZM(e),
    S = rP(t.sentBaseMs ?? t.audioStartMs),
    M = rP(t.sentEndMs ?? t.audioEndMs),
    v = sP(n.map((e) => e.captureStartMs)),
    y = lP(n.map((e) => e.captureEndMs)),
    b = S ?? v,
    T = M ?? y ?? (null !== b ? b + c : gc.sttTimingAudioMs + c);
  return {
    isFinal: Boolean(t.isFinal),
    mediaTime: f,
    mediaTimeEnd: m,
    audioStartMs: b,
    audioEndMs: T,
    audioDurationMs: c || null,
    audioStartMediaTime: u,
    audioEndMediaTime: m,
    audioStartWallTimeMs: s,
    audioEndWallTimeMs: l,
    words: [],
    transcriptReceivedAtMs: g,
    sourceWallTimeMs: l || g,
    sourceProgramClock: DD(n),
    fallbackLagSeconds: 0,
    sourceMediaDelaySeconds: gc.sourceMediaTiming?.actualDelaySeconds ?? null,
    sourceMediaStartTime: u,
    sourceMediaEndTime: m,
    sourceMediaRangeRepaired: d.repaired,
    speechIntervals: XM(e.speechIntervalOffsets, u, m),
    sourceType: r,
    audioInputMode:
      "mse-audio-buffer" === r
        ? "mse-audio-buffer"
        : gc.config?.audioInputMode || "",
    sttProvider: LP(
      "mse-audio-buffer" === r
        ? fg(e)
        : gc.config?.sttProvider || gc.activeSttProvider,
    ),
    sttSegmentId: e.id,
    sttSegmentIds: [e.id],
    mseCoverageClaimIds: h ? yu(e) : vu(e),
    msePartialSpeechRetry: h,
    mseStartupCatchup: Boolean(e.mseStartupCatchup),
    sttDeadlineHedgeTriggered: Boolean(e.sttDeadlineHedgeTriggered),
    sttDeadlineHedgeRescue: Boolean(e.sttDeadlineHedgeRescue),
    sttDeadlineHedgeTriggerReason: e.sttDeadlineHedgeTriggerReason || "",
    sttDeadlineHedgeWinnerRole: e.sttDeadlineHedgeWinnerRole || "",
    sttDeadlineHedgeWinnerProvider: e.sttDeadlineHedgeWinnerProvider || "",
    sttDeadlineHedgeReserveMs: Math.max(
      0,
      Math.round(rP(e.sttDeadlineHedgeReserveMs) || 0),
    ),
    sttSegmentDurationMs: c,
    segmentReason: e.reason || "",
    mseGapRecovery: bh(e),
    chunkMediaRanges: Tv(n),
  };
}
function Tv(e = []) {
  const t = [];
  for (const n of e || [])
    Array.isArray(n?.originalChunkMediaRanges) &&
    n.originalChunkMediaRanges.length
      ? t.push(...n.originalChunkMediaRanges)
      : t.push({
          sequence: rP(n?.mseSequence),
          start: rP(n?.sourceMediaStartTime),
          end: rP(n?.sourceMediaEndTime),
          durationMs: Math.round(Math.max(0, rP(n?.durationMs) || 0)),
          decoded: Boolean(n?.mseDecodedFromEncoded),
          clusterSliceIndex: rP(n?.mseClusterSliceIndex),
          clusterSliceCount: rP(n?.mseClusterSliceCount),
          rangeSource: n?.mseMediaRangeSource || "",
        });
  return t;
}
function wv(e, t, n) {
  const a = rP(n),
    r = null !== a && a > 0 ? a / 1e3 : null;
  let i = rP(e),
    o = rP(t),
    s = !1;
  return (
    null !== r &&
      (null === i && null !== o
        ? ((i = Math.max(0, o - r)), (s = !0))
        : null !== i && null === o
          ? ((o = i + r), (s = !0))
          : null !== i &&
            null !== o &&
            o > i &&
            kv(o - i, r) &&
            ((i = Math.max(0, o - r)), (s = !0))),
    { start: aP(i), end: aP(o), repaired: s }
  );
}
function kv(e, t) {
  const n = rP(e),
    a = rP(t);
  return (
    !(null === n || null === a || a < 0.5) && (n < 0.55 * a || n > 2.25 * a)
  );
}
function Cv(e = {}, t = {}, n = {}) {
  if (PS(t, "integrated-result")) return;
  if (
    sE(n.requestContext, "integrated-result", {
      requestId: n.requestId,
      provider: e.provider || $P(),
      mediaStartTime: aP(eh(t)),
      mediaEndTime: aP(th(t)),
    })
  )
    return void nh(t, "ignored", {
      done: !0,
      active: !1,
      reason: "stale-request-context",
    });
  const a = wD(
      e.originalText || e.processedText || e.transcript || e.original || "",
    ),
    r = IA(e, a);
  (FE(e.usage, e.pricing, e.provider, e.providerName, {
    fallbackFromProvider: e.fallbackFromProvider,
    fallbackReason: e.fallbackReason,
    fallbackKind: e.fallbackKind,
  }),
    NE());
  const i = Date.now(),
    o = rP(n.startedAtMs) || i,
    s = rR(n.timing || bv(t, { isFinal: !0 }), i, o);
  if (
    (s.speechIntervals ||
      (s.speechIntervals = XM(t.speechIntervalOffsets, BC(s), UC(s))),
    !r.length)
  )
    return (
      (Array.isArray(t.speechIntervalOffsets?.intervals)
        ? t.speechIntervalOffsets.intervals
        : []
      ).length > 0
        ? Iu(t, "failed", {
            outcome: "integrated-empty-with-detected-speech",
          }) || nx("integrated-empty-with-detected-speech", 1, sp(t))
        : (Iu(t, "subtitle-ready", { outcome: "integrated-silence" }) ||
            fx(sp(t) || {}, {
              source: "integrated-result",
              reason: "integrated-silence",
              status: "complete",
            }),
          Dp("integrated-silence-ready", _p(n.timing))),
      void Nx(
        "llm.integrated.empty_result",
        {
          requestId: n.requestId,
          segmentId: t.id,
          provider: e.provider || $P(),
          latencyMs: n.uploadLatencyMs || e.latencyMs || 0,
        },
        {
          source: "offscreen",
          requestId: n.requestId,
          provider: e.provider || $P(),
          level: "warn",
        },
      )
    );
  (NC(i - o), HC(s), (gc.lastPipelineLatency = iR(s)));
  const l = oR(
      ow(r, { timing: s }),
      s,
      a || r.map((e) => e.original).join(" "),
    ),
    c = l.map((e) => e.translation).join(" ");
  if (!c) return void (gc.subtitlePipelineStats.emptyTranslations += 1);
  const d = Up(l, s, "integrated-caption"),
    u = Kp(s, d),
    m = l.map((e) => e.original).join(" ");
  (UR(e.processedText || m || a),
    (gc.subtitlePipelineStats.finalTranscripts += 1),
    (gc.subtitlePipelineStats.finalTranscriptChars += Array.from(m).length),
    (gc.subtitlePipelineStats.translationResponses += 1),
    (gc.subtitlePipelineStats.emittedSegments += l.length),
    (gc.confirmedSegments = []));
  const g = sx(
    l.map((t) => ({
      ...t,
      ...ax(e, t),
      sttProvider:
        e.sttProvider || gc.config?.sttProvider || gc.activeSttProvider,
      sttModel: e.sttModel || e.model || "",
      sttModelVersion: e.sttModelVersion || e.sttModel || "",
      llmProvider: e.provider || $P(),
      llmModel: e.model || "",
      llmModelVersion: e.modelVersion || e.model || "",
    })),
    {
      requestId: n.requestId || "",
      walletTranslationRequestId: e.cacheEvidenceRecorded
        ? e.receipt?.requestId
        : "",
      language: e.detectedLang || e.segmentation?.sourceLanguage || null,
      translatedTo: e.translatedTo || gc.config.targetLang,
      latency: gc.lastPipelineLatency,
    },
  );
  for (let e = 0; e < l.length; e += 1) g[e] && (l[e].cacheCandidateId = g[e]);
  (Nx(
    "llm.integrated.end",
    {
      requestId: n.requestId,
      segmentId: t.id,
      provider: e.provider || "",
      providerName: e.providerName || "",
      latencyMs: i - o,
      segmentCount: l.length,
      usage: e.usage || null,
      pricing: e.pricing || null,
      sync: u,
    },
    {
      source: "offscreen",
      requestId: n.requestId,
      provider: e.provider || $P(),
    },
  ),
    bP(
      lE(
        {
          kind: "translation",
          isFinal: !0,
          original: m,
          translation: c,
          segments: l,
          segmentation: e.segmentation || null,
          queueId: e.queueId || null,
          latencyMs: e.latencyMs || n.uploadLatencyMs || null,
          pipelineLatencyMs: s.pipelineLatencyMs,
          latency: gc.lastPipelineLatency,
          mediaTime: u.mediaTime,
          displayAfterMediaTime: u.mediaTime,
          sync: u,
          mseStartupReadiness: d,
          provider: e.provider || $P(),
          usage: e.usage || null,
        },
        n.requestContext,
      ),
    ));
}
function Av(e = {}, t = {}, n = {}) {
  if (PS(t, "transcript")) return !1;
  const a = wD(e.text || e.transcript || ""),
    r = rP(n.sentBaseMs) || 0,
    i = bv(t, { isFinal: !0, sentBaseMs: r }),
    o = Fv(Ov(e.words, rP(t.sttAudioSpeed) || 1), r / 1e3),
    s = Array.isArray(e.detected_languages)
      ? e.detected_languages
          .map((e) => String(e?.code || e || "").trim())
          .filter(Boolean)
      : [],
    l = e.language_code || s[0] || e.language || gc.config.sourceLang || null,
    c = {
      ...QA({ words: o }, { isFinal: !0, segmentTiming: i }),
      sttProvider: e.provider || fg(t),
      sttSegmentId: t.id,
      sttSegmentIds: [t.id],
      walletSttRequestIds: Array.isArray(e.sttRequestIds) ? e.sttRequestIds : [],
      mseCoverageClaimIds: vu(t),
      sttSegmentDurationMs: t.durationMs,
      sttUploadLatencyMs: n.uploadLatencyMs || null,
      detectedLanguage: s[0] || null,
      detectedLanguages: s,
    };
  if (DS(t, c, "transcript-viewer-behind")) return !1;
  if (!a || ED(a)) return !1;
  if (ib(t))
    return (
      Nx(
        "stt.transcript.coverage_owned",
        {
          segmentId: t.id,
          claimIds: vu(t),
          textChars: Array.from(a).length,
          mediaStartTime: aP(BC(c)),
          mediaEndTime: aP(UC(c)),
        },
        { source: "offscreen" },
      ),
      Ev(a, c, { language: l, languages: s, words: o, allowRepeatedText: !0 })
    );
  const delta = { timing: c, language: l },
    d = Dv(a, delta);
  return (
    !(!d || ED(d) || d === gc.lastFinalText) &&
    Ev(d, delta.timing, { language: l, languages: s, words: o })
  );
}
function Rv(e = {}, t = {}) {
  const n = LP(e.provider || fg(t));
  if (!nD(n)) return e;
  const a = wD(e.text || e.transcript || ""),
    r = AR(e.words),
    i = xv(r),
    o = OR(a),
    s = OR(i),
    l =
      e.transcriptConsistency && "object" == typeof e.transcriptConsistency
        ? e.transcriptConsistency
        : null;
  let c = "unchanged",
    d = a,
    u = Array.isArray(e.words) ? e.words : [];
  s && !o
    ? ((c = "use-timed-words-text"), (d = i))
    : s &&
      o !== s &&
      (s.includes(o)
        ? ((c = "use-timed-words-text"), (d = i))
        : ((c = "discard-incompatible-word-timing"), (u = [])));
  const m = wD(l?.action || "");
  return (
    ("unchanged" !== c || (m && "unchanged" !== m)) &&
      Nx(
        "stt.batch.transcript_consistency_repaired",
        {
          segmentId: t.id,
          action: c,
          backendAction: m,
          responseText: a,
          wordsText: i,
          responseTextChars: Array.from(a).length,
          wordsTextChars: Array.from(i).length,
          inputWordCount: r.length,
          outputWordCount: u.length,
          responseContainedByWords: Boolean(o && s && s.includes(o)),
        },
        {
          source: "offscreen",
          level: "discard-incompatible-word-timing" === c ? "warn" : "info",
          provider: n,
        },
      ),
    d === a && u === e.words
      ? e
      : {
          ...e,
          text: d,
          transcript: d,
          words: u,
          transcriptConsistency: {
            ...(l || {}),
            action: c,
            responseTextChars: Array.from(a).length,
            wordsTextChars: Array.from(i).length,
            inputWordCount: r.length,
            outputWordCount: u.length,
          },
        }
  );
}
function xv(e = []) {
  let t = "";
  for (const n of e || []) {
    const e = wD(n?.text || "");
    if (!e) continue;
    const a =
      /^[,.;:!?%…。，、！？；：）)\]}]+$/u.test(e) ||
      /^[\u2019\x27](?:s|t|re|ve|ll|d|m)\b/iu.test(e);
    t ? (t += a ? e : ` ${e}`) : (t = e);
  }
  return wD(t)
    .replace(/\s+([,.;:!?%…。，、！？；：）)\]}])/gu, "$1")
    .replace(/([（(\[{])\s+/gu, "$1");
}
function Ev(e, t = null, n = {}) {
  const a = wD(e);
  return !(
    !a ||
    ED(a) ||
    (!n.allowRepeatedText && a === gc.lastFinalText) ||
    Pv(t) ||
    ((gc.lastFinalText = e),
    WR(e),
    (gc.lastTranscriptTiming = t),
    HT({ invalidate: !0 }),
    bP({
      kind: "transcript",
      isFinal: !0,
      text: e,
      language: n.language || gc.config.sourceLang || null,
      languages: Array.isArray(n.languages) ? n.languages : [],
      words: Array.isArray(n.words) ? n.words : [],
      mediaTime: t?.mediaTime ?? null,
      sync: { ...(t || {}) },
    }),
    dw(e, t),
    0)
  );
}
function Pv(e = null) {
  if (!gc.sourceEndedGuardActive) return !1;
  const t = rP(e?.mediaTime),
    n = rP(gc.sourceMediaTiming?.duration),
    a = null === t || t <= 25;
  return (
    a &&
      Nx(
        "source.vod_end_guard.drop_transcript",
        {
          mediaTime: t,
          duration: n,
          cutoff: 25,
          reason: gc.sourceEndedGuardReason || "source-vod-ended",
        },
        { source: "offscreen", level: "warn" },
      ),
    a
  );
}
function Dv(e, t = {}) {
  const n = sy(),
    a = wD(e);
  if (!a) return "";
  const r = wD(n.committedText),
    i = wD(r ? qR(a, r).text : a);
  if (!i) return "";
  const o = Lv(n.pendingDeltaText, i);
  // A short held transcript can span several STT operations. Keep their
  // evidence when the next transcript releases it, without changing the
  // existing choice of media timing for the combined text.
  if (wD(n.pendingDeltaText) && n.pendingDeltaTiming) {
    t.timing = {
      ...(t.timing || n.pendingDeltaTiming),
      walletSttRequestIds: [...new Set([
        ...(n.pendingDeltaTiming.walletSttRequestIds || []),
        ...(t.timing?.walletSttRequestIds || []),
      ].filter(id => typeof id === "string" && id))],
    };
  }
  return (
    n.pendingDeltaQueuedAtMs || (n.pendingDeltaQueuedAtMs = Date.now()),
    _v(o)
      ? ((n.pendingDeltaText = o),
        (n.pendingDeltaTiming = t.timing || n.pendingDeltaTiming || null),
        (n.pendingDeltaLanguage = t.language || n.pendingDeltaLanguage || null),
        Nx(
          "stt.transcript.delta_held",
          {
            text: o,
            textChars: Array.from(o).length,
            minStableChars: Uv(),
            hasStableBoundary: Bv(o),
          },
          { source: "offscreen", level: "debug" },
        ),
        "")
      : ((n.pendingDeltaText = ""),
        (n.pendingDeltaQueuedAtMs = 0),
        (n.pendingDeltaTiming = null),
        (n.pendingDeltaLanguage = null),
        (n.committedText = GR(wD(`${r} ${o}`), xn)),
        o)
  );
}
function Iv(e = "flush") {
  const t = sy(),
    n = wD(t.pendingDeltaText);
  if (!n || ED(n)) return !1;
  ((t.pendingDeltaText = ""), (t.pendingDeltaQueuedAtMs = 0));
  const a =
      t.pendingDeltaTiming ||
      gc.lastTranscriptTiming ||
      QA(null, { isFinal: !0 }),
    r = t.pendingDeltaLanguage || gc.config.sourceLang || null;
  ((t.pendingDeltaTiming = null),
    (t.pendingDeltaLanguage = null),
    (t.committedText = GR(wD(`${t.committedText || ""} ${n}`), xn)));
  const i = Ev(n, a, { language: r, words: a?.words || [] });
  return (
    i &&
      Nx(
        "stt.transcript.pending_flushed",
        { reason: e, text: n, textChars: Array.from(n).length },
        { source: "offscreen", level: "warn" },
      ),
    i
  );
}
function Lv(e, t) {
  const n = wD(e),
    a = wD(t);
  if (!n) return a;
  if (!a) return n;
  const r = OR(n),
    i = OR(a);
  return i.startsWith(r) ? a : r.endsWith(i) ? n : wD(`${n} ${a}`);
}
function _v(e) {
  const t = wD(e);
  return !t || (!Bv(t) && Array.from(OR(t)).length < Uv());
}
function Bv(e) {
  return /[。！？!?….,，]$/.test(wD(e));
}
function Uv() {
  const e = dP(rP(gc.config?.syncDelaySeconds) || 6, 2, ma);
  return e <= 5 ? 3 : e <= 6 ? 5 : 8;
}
function qv(e) {
  const t = gc.sttTimingAudioMs;
  for (const t of e.chunks || []) _f(t);
  return t;
}
function Fv(e, t) {
  const n = Math.max(0, rP(t) || 0);
  return Array.isArray(e) && e.length
    ? e.map((e) => {
        const t = rP(e.start ?? e.start_time ?? e.startTime ?? e.begin),
          a = rP(e.end ?? e.end_time ?? e.endTime ?? e.stop);
        return null === t || null === a
          ? e
          : { ...e, start: t + n, end: a + n };
      })
    : [];
}
function Ov(e, t = 1) {
  const n = Math.max(1, rP(t) || 1);
  return 1 !== n && Array.isArray(e) && e.length
    ? e.map((e) => {
        const t = rP(e.start ?? e.start_time ?? e.startTime ?? e.begin),
          a = rP(e.end ?? e.end_time ?? e.endTime ?? e.stop);
        return null === t || null === a
          ? e
          : { ...e, start: t * n, end: a * n };
      })
    : e || [];
}
function Nv(e = {}, t = 1) {
  const n = Math.max(1, rP(t) || 1);
  return 1 === n ? e : { ...e, words: Ov(e.words, n) };
}
function Hv(e) {
  const t = (e || []).reduce((e, t) => e + (t.samples?.length || 0), 0),
    n = new Float32Array(t);
  let a = 0;
  for (const t of e || [])
    t.samples?.length && (n.set(t.samples, a), (a += t.samples.length));
  return n;
}
function Gv(e, t = 1) {
  const n = Math.max(1, rP(t) || 1);
  return 1 !== n && e?.length ? (e.length > 96e3 ? Kv(e, n) : zv(e, n)) : e;
}
function Wv(e, t = 1) {
  const n = dP(rP(t) || 1, 0.5, 2);
  return !e?.length || Math.abs(n - 1) <= 0.03
    ? e || new Float32Array()
    : n > 1
      ? Gv(e, n)
      : $v(e, 1 / n);
}
function $v(e, t = 1) {
  const n = Math.max(1, rP(t) || 1);
  return 1 !== n && e?.length
    ? e.length > 96e3
      ? Vv(e, n)
      : jv(e, n)
    : e || new Float32Array();
}
function Vv(e, t = 1) {
  const n = Math.round(64e3),
    a = Math.round(320),
    r = [];
  for (let a = 0; a < e.length; a += n) {
    const i = Math.min(e.length, a + n);
    r.push(jv(e.subarray(a, i), t));
  }
  return Qv(r, a);
}
function jv(e, t = 1) {
  const n = Math.max(1, rP(t) || 1),
    a = e?.length || 0;
  if (1 === n || !a) return e || new Float32Array();
  if (a < 1024) return ty(e, 1 / n);
  const r = Math.max(1, Math.round(a * n)),
    i = Math.min(a, Math.round(1024)),
    o = Math.min(Math.floor(i / 2), Math.round(512)),
    s = Math.max(1, i - o),
    l = Math.max(1, s / n),
    c = Math.min(Math.round(288), Math.floor(i / 2)),
    d = Math.max(0, a - i),
    u = new Float32Array(r + i + o);
  Yv(e, 0, u, 0, Math.min(i, a));
  let m = s,
    g = 0;
  for (; m < r; ) {
    const t = Math.round(g + l),
      n = ay(t - c, 0, d),
      a = Jv(e, u, m, n, ay(t + c, n, d), o);
    (Zv(e, a, u, m, i, o), (g = a), (m += s));
  }
  return u.slice(0, r);
}
function Kv(e, t = 1) {
  const n = Math.max(1, rP(t) || 1),
    a = Math.round(64e3),
    r = Math.round(320),
    i = Math.round(r * n),
    o = Math.max(1, a - i),
    s = [];
  for (let t = 0; t < e.length; t += o) {
    const r = Math.min(e.length, t + a);
    if ((s.push(zv(e.subarray(t, r), n)), r === e.length)) break;
  }
  return Qv(s, r);
}
function zv(e, t = 1) {
  const n = Math.max(1, rP(t) || 1),
    a = e?.length || 0;
  if (1 === n || a < 1024) return ey(e, n);
  const r = Math.max(1, Math.round(a / n)),
    i = Math.min(a, Math.round(1024)),
    o = Math.min(Math.floor(i / 2), Math.round(512)),
    s = Math.max(1, i - o),
    l = s * n,
    c = Math.min(Math.round(288), Math.floor(i / 2)),
    d = Math.max(0, a - i),
    u = new Float32Array(r + i + o);
  Yv(e, 0, u, 0, Math.min(i, a));
  let m = s,
    g = 0;
  for (; m < r; ) {
    const t = Math.round(g + l),
      n = ay(t - c, 0, d),
      a = Jv(e, u, m, n, ay(t + c, n, d), o);
    (Zv(e, a, u, m, i, o), (g = a), (m += s));
  }
  return u.slice(0, r);
}
function Qv(e, t = 0) {
  const n = (e || []).filter((e) => e?.length);
  if (!n.length) return new Float32Array();
  const a = Math.max(0, Math.round(rP(t) || 0)),
    r = n.reduce(
      (e, t, r) =>
        e + t.length - (r > 0 ? Math.min(a, t.length, n[r - 1].length) : 0),
      0,
    ),
    i = new Float32Array(Math.max(1, r));
  let o = 0;
  for (let e = 0; e < n.length; e += 1) {
    const t = n[e];
    if (0 === e || !a) {
      (i.set(t, o), (o += t.length));
      continue;
    }
    const r = Math.min(a, t.length, o),
      s = o - r;
    for (let e = 0; e < r; e += 1) {
      const n = e / Math.max(1, r);
      i[s + e] = i[s + e] * (1 - n) + t[e] * n;
    }
    (i.set(t.subarray(r), o), (o += t.length - r));
  }
  return i.slice(0, o);
}
function Jv(e, t, n, a, r, i) {
  if (i <= 0 || a >= r) return a;
  let o = a,
    s = -1 / 0;
  for (let l = a; l <= r; l += 8) {
    const a = Xv(e, l, t, n, i);
    a > s && ((s = a), (o = l));
  }
  const l = Math.max(a, o - 8),
    c = Math.min(r, o + 8);
  for (let a = l; a <= c; a += 1) {
    const r = Xv(e, a, t, n, i);
    r > s && ((s = r), (o = a));
  }
  return o;
}
function Xv(e, t, n, a, r) {
  let i = 0,
    o = 0,
    s = 0;
  for (let l = 0; l < r; l += 1) {
    const r = e[t + l] || 0,
      c = n[a + l] || 0;
    ((i += r * c), (o += r * r), (s += c * c));
  }
  return o <= 1e-9 || s <= 1e-9 ? -1 / 0 : i / Math.sqrt(o * s);
}
function Zv(e, t, n, a, r, i) {
  const o = Math.min(r, n.length - a, e.length - t);
  if (o <= 0) return;
  const s = Math.min(i, o);
  for (let r = 0; r < s; r += 1) {
    const i = r / Math.max(1, s),
      o = 1 - i;
    n[a + r] = (n[a + r] || 0) * o + (e[t + r] || 0) * i;
  }
  for (let r = s; r < o; r += 1) n[a + r] = e[t + r] || 0;
}
function Yv(e, t, n, a, r) {
  const i = Math.min(r, e.length - t, n.length - a);
  i <= 0 || n.set(e.subarray(t, t + i), a);
}
function ey(e, t = 1) {
  const n = Math.max(1, rP(t) || 1);
  return 1 !== n && e?.length ? ty(e, n) : e || new Float32Array();
}
function ty(e, t = 1) {
  const n = Math.max(0.25, rP(t) || 1);
  if (Math.abs(n - 1) <= 0.001 || !e?.length) return e || new Float32Array();
  const a = Math.max(1, Math.round(e.length / n)),
    r = new Float32Array(a);
  for (let t = 0; t < a; t += 1) {
    const a = t * n,
      i = Math.floor(a),
      o = Math.min(e.length - 1, i + 1),
      s = a - i;
    r[t] = e[i] * (1 - s) + e[o] * s;
  }
  return r;
}
function ny(e, t = 0) {
  const n = Math.max(0, Math.round(((rP(t) || 0) * Ge) / 1e3));
  if (!n) return e;
  const a = new Float32Array(e.length + n);
  return (a.set(e, 0), a);
}
function ay(e, t, n) {
  return Math.round(dP(e, t, n));
}
function ry(e, t = 1, n = 0) {
  const a = Math.max(1, rP(t) || 1),
    r = Math.max(0, (e || []).length - 1);
  return (e || []).map((e, t) => {
    const i = Math.max(0, rP(e.durationMs) || 0);
    return {
      ...e,
      billableDurationMs: i / a + (t === r ? Math.max(0, rP(n) || 0) : 0),
    };
  });
}
function iy(e, t) {
  const n = [];
  let a = 0;
  for (let r = e.length - 1; r >= 0 && a < t; r -= 1) {
    const t = e[r];
    (n.unshift(t), (a += t.durationMs));
  }
  return n;
}
function oy(e) {
  return (e || []).reduce((e, t) => e + Math.max(0, rP(t.durationMs) || 0), 0);
}
function sy() {
  return (gc.batchStt || (gc.batchStt = Ey()), gc.batchStt);
}
function ly(e, t) {
  const n = SD(e, t, Ge);
  if (!n.byteLength) return null;
  const a = (n.length / Ge) * 1e3,
    r = Date.now(),
    i = cy(r),
    o = Math.max(0, a * i),
    s = r - a,
    l = gc.captureAudioMs,
    c = l + o,
    d = VA(r);
  return {
    samples: n,
    sourceType: "tab-capture",
    durationMs: o,
    captureDurationMs: a,
    capturedAtMs: r,
    captureStartWallTimeMs: s,
    captureEndWallTimeMs: r,
    captureStartMs: l,
    captureEndMs: c,
    sourceMediaStartTime: null !== d ? Math.max(0, d - o / 1e3) : null,
    sourceMediaEndTime: d,
    sourceProgramClock: PD(d, r),
    sourcePlaybackRate: i,
  };
}
function cy(e = Date.now()) {
  if (!gc.config?.sourcePreloadEnabled) return 1;
  const t = gc.sourceMediaTiming;
  if (!t || t.paused || t.adPlaying) return 1;
  const n = rP(t.playbackRate);
  return null !== n ? dP(n, 1, 2) : 1;
}
function dy(e) {
  if (uy()) return (my(e), []);
  const t = fy(e.samples);
  ((e.localVadAnalyzed = !0),
    (e.localVadSpeech = !0 === t.isSpeech),
    (e.localVadRms = t.rms),
    (e.localVadPeak = t.peak),
    (e.localVadZcr = t.zcr),
    (e.localVadProvider = t.source || Wt),
    (e.localVadSpeechProbability = rP(t.speechProbability)));
  const n = Ay();
  if ((gy(t, e, t.source || (n ? "vad" : "energy")), !n)) return [e];
  const a = gc.vad || (gc.vad = Ry());
  if (
    ((a.lastScore = t.rms),
    (a.lastPeak = t.peak),
    (a.capturedAudioMs += e.durationMs),
    a.inSpeech)
  )
    return t.isSpeech
      ? ((a.silenceMs = 0), (a.lastVoiceAtMs = e.capturedAtMs), [e])
      : ((a.silenceMs += e.durationMs),
        a.silenceMs <= gc.config.localVadHangoverMs
          ? [e]
          : ((a.inSpeech = !1),
            (a.speechMs = 0),
            (a.silenceMs = 0),
            py(a, e),
            []));
  if (
    (py(a, e),
    t.isSpeech
      ? ((a.speechMs += e.durationMs),
        (a.silenceMs = 0),
        (a.lastVoiceAtMs = e.capturedAtMs))
      : ((a.speechMs = 0), (a.silenceMs += e.durationMs)),
    a.speechMs < gc.config.localVadMinSpeechMs)
  )
    return [];
  ((a.inSpeech = !0), (a.silenceMs = 0));
  const r = a.prefixBuffer.slice();
  return ((a.prefixBuffer = []), (a.prefixBufferMs = 0), r);
}
function uy() {
  return Boolean(gc.sourceMediaTiming?.adPlaying);
}
function my(e = {}) {
  const t = Math.max(0, rP(e.durationMs) || rP(e.captureDurationMs) || 0);
  gc.sourceAdAudioSkippedMs += t;
  const n = Date.now();
  n - (gc.sourceAdLastSkipLogAt || 0) < 5e3 ||
    ((gc.sourceAdLastSkipLogAt = n),
    Nx(
      "ad.source.audio_skipped",
      {
        skippedAudioMs: Math.round(gc.sourceAdAudioSkippedMs || 0),
        chunkDurationMs: Math.round(t),
        platform: gc.sourceMediaTiming?.adPlatform || "",
        reason: gc.sourceMediaTiming?.adReason || "",
      },
      { source: "offscreen", level: "warn" },
    ));
}
function gy(e = {}, t = {}, n = "vad") {
  if (!e.isSpeech) return;
  const a = Date.now();
  if (gc.activeSttProvider === ae) {
    const e = rP(gc.speechEngineARealtimeLastSpeechAtMs) || 0;
    ((!e || a - e > $o) && (gc.speechEngineARealtimeSpeechRunStartedAtMs = a),
      (gc.speechEngineARealtimeLastSpeechAtMs = a));
  }
  a - (gc.lastSpeechActivityEventAt || 0) < nn ||
    ((gc.lastSpeechActivityEventAt = a),
    bP({
      kind: "speech-activity",
      active: !0,
      speech: !0,
      source: n,
      provider: gc.config?.vadProvider || Wt,
      capturedAtMs: rP(t.capturedAtMs) || a,
      sourceMediaTime: rP(t.sourceMediaEndTime),
      score: aP(e.rms),
      peak: aP(e.peak),
    }));
}
function py(e, t) {
  (e.prefixBuffer.push(t), (e.prefixBufferMs += t.durationMs));
  const n = Math.max(t.durationMs, gc.config.localVadPrefixPaddingMs);
  for (; e.prefixBuffer.length > 1 && e.prefixBufferMs > n; ) {
    const t = e.prefixBuffer.shift();
    e.prefixBufferMs -= t.durationMs;
  }
}
function fy(e, t = {}) {
  let n = 0,
    a = 0,
    r = 0,
    i = e[0] || 0;
  for (let t = 0; t < e.length; t += 1) {
    const o = e[t],
      s = Math.abs(o);
    ((a = Math.max(a, s)),
      (n += o * o),
      t > 0 && ((o >= 0 && i < 0) || (o < 0 && i >= 0)) && (r += 1),
      (i = o));
  }
  const o = Math.sqrt(n / Math.max(1, e.length)),
    s = r / Math.max(1, e.length - 1),
    l = gc.config?.localVadEnergyThreshold ?? Vt,
    c = gc.config?.localVadSilenceThreshold ?? jt,
    d = o >= l || (a >= 2.4 * l && o >= c),
    u = s >= 0.006 && s <= 0.45,
    m = !1 === t.useRecentSilero ? null : ky();
  return {
    rms: o,
    peak: a,
    zcr: s,
    isSpeech: m?.isSpeech ?? (d && u),
    speechProbability: m?.speechProbability ?? null,
    source: m ? $t : Wt,
  };
}
function hy() {
  const e = new Error("PCM Silero VAD cancelled after timeline change");
  return (
    (e.name = "AbortError"),
    (e.sttRequestOwnershipCancelled = !0),
    (e.sttStopCancelled = !0),
    e
  );
}
async function Sy() {
  if (gc.sileroPcmVad) return gc.sileroPcmVad;
  if (gc.sileroPcmVadInitPromise) return gc.sileroPcmVadInitPromise;
  if ("function" != typeof globalThis.vad?.MicVAD?.new) return null;
  gc.sileroPcmVadState = "loading";
  const e = chrome.runtime.getURL("vendor/silero-vad/");
  return (
    (gc.sileroPcmVadInitPromise = globalThis.vad.MicVAD.new({
      model: "v5",
      startOnLoad: !1,
      baseAssetPath: e,
      onnxWASMBasePath: e,
      positiveSpeechThreshold: Jt,
      negativeSpeechThreshold: Xt,
      redemptionMs: et,
      preSpeechPadMs: 96,
      minSpeechMs: 64,
      submitUserSpeechOnPause: !1,
      ortConfig: (e) => {
        ((e.env.logLevel = "error"), (e.env.wasm.numThreads = 1));
      },
      onFrameProcessed: (e) => {
        gc.sileroPcmVadFrameCollector?.(dP(e?.isSpeech || 0, 0, 1));
      },
      onSpeechStart: () => {},
      onSpeechRealStart: () => {},
      onSpeechEnd: () => {},
      onVADMisfire: () => {},
    })
      .then((e) => {
        if (
          !e ||
          "function" != typeof e.processFrame ||
          "function" != typeof e.frameProcessor?.resume ||
          "function" != typeof e.frameProcessor?.pause
        )
          throw new Error("Silero PCM processor API unavailable");
        return (
          (gc.sileroPcmVad = e),
          (gc.sileroPcmVadState = "ready"),
          Nx(
            "vad.silero.pcm_ready",
            {
              model: "v5",
              frameSamples: Yt,
              frameMs: en,
              role: "per-stt-pcm-window",
            },
            { source: "offscreen" },
          ),
          e
        );
      })
      .catch(
        (e) => (
          (gc.sileroPcmVadState = "fallback"),
          Nx(
            "vad.silero.pcm_load_failed",
            { message: e?.message || String(e), fallback: Wt },
            { source: "offscreen", level: "warn" },
          ),
          null
        ),
      )
      .finally(() => {
        gc.sileroPcmVadInitPromise = null;
      })),
    gc.sileroPcmVadInitPromise
  );
}
function My(e = [], t = {}) {
  let n = !1,
    a = 0,
    r = 0,
    i = 0,
    o = 0,
    s = 0;
  for (const t of e) {
    const e = dP(t || 0, 0, 1);
    ((o = Math.max(o, e)),
      (s += e),
      e >= Jt ? (n = !0) : e <= Xt && (n = !1),
      n ? ((a += 1), (r += 1), (i = Math.max(i, r))) : (r = 0));
  }
  return {
    ...t,
    isSpeech: i >= 2,
    speechProbability: o,
    meanSpeechProbability: e.length ? s / e.length : 0,
    maxSpeechProbability: o,
    frameCount: e.length,
    speechFrameCount: a,
    speechMs: a * en,
    maxSpeechRunMs: i * en,
    source: $t,
    sileroAnalyzed: !0,
  };
}
async function vy(e, t = {}) {
  const n = e instanceof Float32Array ? e : new Float32Array(e || []),
    a = fy(n, { useRecentSilero: !1 }),
    r = t.signal || null,
    i = gc.sileroPcmVadAnalysisQueue || Promise.resolve(),
    o = Promise.resolve(i)
      .catch(() => {})
      .then(async () => {
        if (r?.aborted) throw hy();
        const e = await Sy();
        if (r?.aborted) throw hy();
        if (!e || !n.length)
          return (
            (gc.sileroPcmVadFallbackCount += 1),
            {
              ...a,
              sileroAnalyzed: !1,
              sileroUnavailable: !0,
              frameCount: 0,
              speechFrameCount: 0,
              speechMs: 0,
              maxSpeechRunMs: 0,
            }
          );
        const i = [],
          o = Date.now();
        ((gc.sileroPcmVadFrameCollector = (e) => i.push(e)),
          e.frameProcessor.pause(() => {}),
          e.frameProcessor.resume());
        try {
          for (let t = 0; t < n.length; t += Yt) {
            if (r?.aborted) throw hy();
            const a = new Float32Array(Yt);
            (a.set(n.subarray(t, t + Yt)), await e.processFrame(a));
          }
        } finally {
          (e.frameProcessor.pause(() => {}),
            (gc.sileroPcmVadFrameCollector = null));
        }
        const s = My(i, a);
        return (
          (s.inferenceMs = Math.max(0, Date.now() - o)),
          (gc.sileroPcmVadWindowCount += 1),
          Nx(
            "vad.silero.pcm_window",
            {
              segmentId: t.segmentId ?? null,
              timelineRevision: rP(t.timelineRevision) ?? gc.timelineRevision,
              durationMs: Math.round((n.length / Ge) * 1e3),
              frameCount: s.frameCount,
              speechFrameCount: s.speechFrameCount,
              speechMs: s.speechMs,
              maxSpeechRunMs: s.maxSpeechRunMs,
              maxSpeechProbability: aP(s.maxSpeechProbability),
              meanSpeechProbability: aP(s.meanSpeechProbability),
              isSpeech: s.isSpeech,
              inferenceMs: s.inferenceMs,
            },
            { source: "offscreen", provider: $t },
          ),
          s
        );
      });
  return ((gc.sileroPcmVadAnalysisQueue = o.catch(() => {})), o);
}
async function yy(e = {}, t = new Float32Array()) {
  const n = t instanceof Float32Array ? t : new Float32Array(t || []),
    a = e.pcmWindowVadSharedState || (e.pcmWindowVadSharedState = {}),
    r = n.length;
  if (a.decision && a.sampleCount === r)
    return ((e.pcmWindowVadDecision = a.decision), a.decision);
  (a.promise && a.sampleCount === r) ||
    ((a.sampleCount = r),
    (a.promise = vy(n, {
      segmentId: e.id,
      timelineRevision: rP(e.timelineRevision) ?? gc.timelineRevision,
      signal: e.sttUploadAbortController?.signal,
    })
      .then((e) => ((a.decision = e), e))
      .finally(() => {
        a.promise = null;
      })));
  const i = await a.promise;
  return ((e.pcmWindowVadDecision = i), i);
}
function by(e = []) {
  const t = (e || []).map((e) => {
      const t = e?.rawCaptureSamples || e?.captureSamples || e?.samples;
      return t instanceof Float32Array ? t : new Float32Array(t || []);
    }),
    n = t.reduce((e, t) => e + t.length, 0),
    a = new Float32Array(n);
  let r = 0;
  for (const e of t) (a.set(e, r), (r += e.length));
  return a;
}
function Ty() {
  return Boolean(
    gc.audioContext &&
      gc.mediaStream &&
      Of() &&
      "function" == typeof globalThis.vad?.MicVAD?.new,
  );
}
async function wy() {
  if (!Ty()) return null;
  if (gc.sileroVad) return gc.sileroVad;
  if (gc.sileroVadInitPromise) return gc.sileroVadInitPromise;
  const e = ++gc.sileroVadGeneration,
    t = gc.sessionId;
  gc.sileroVadState = "loading";
  const n = chrome.runtime.getURL("vendor/silero-vad/");
  return (
    (gc.sileroVadInitPromise = (async () => {
      const a = await globalThis.vad.MicVAD.new({
        model: "v5",
        startOnLoad: !1,
        processorType: "ScriptProcessor",
        baseAssetPath: n,
        onnxWASMBasePath: n,
        positiveSpeechThreshold: Jt,
        negativeSpeechThreshold: Xt,
        redemptionMs: et,
        preSpeechPadMs: 96,
        minSpeechMs: 160,
        submitUserSpeechOnPause: !1,
        getStream: async () => gc.mediaStream,
        pauseStream: async () => {},
        resumeStream: async () => gc.mediaStream,
        ortConfig: (e) => {
          ((e.env.logLevel = "error"), (e.env.wasm.numThreads = 1));
        },
        onFrameProcessed: (e) => {
          const t = dP(e?.isSpeech || 0, 0, 1);
          ((gc.sileroVadProbability = t),
            (gc.sileroVadLastFrameAtMs = Date.now()),
            t >= Jt
              ? (gc.sileroVadSpeech = !0)
              : t <= Xt && (gc.sileroVadSpeech = !1));
        },
        onSpeechStart: () => {},
        onSpeechRealStart: () => {},
        onSpeechEnd: () => {},
        onVADMisfire: () => {},
      });
      return e === gc.sileroVadGeneration &&
        t === gc.sessionId &&
        gc.mediaStream &&
        gc.audioContext
        ? (await a.start(),
          (gc.sileroVad = a),
          (gc.sileroVadState = "ready"),
          Nx(
            "vad.silero.ready",
            {
              model: "v5",
              frameMs: 32,
              positiveSpeechThreshold: Jt,
              negativeSpeechThreshold: Xt,
              role: "adaptive-segmentation",
            },
            { source: "offscreen" },
          ),
          a)
        : null;
    })()
      .catch((t) => {
        throw (
          e === gc.sileroVadGeneration &&
            ((gc.sileroVadState = "fallback"),
            Nx(
              "vad.silero.load_failed",
              { message: t?.message || String(t), fallback: Wt },
              { source: "offscreen", level: "warn" },
            )),
          t
        );
      })
      .finally(() => {
        e === gc.sileroVadGeneration && (gc.sileroVadInitPromise = null);
      })),
    gc.sileroVadInitPromise
  );
}
function ky(e = Date.now()) {
  if ("ready" !== gc.sileroVadState) return null;
  const t = rP(gc.sileroVadProbability),
    n = rP(gc.sileroVadLastFrameAtMs) || 0;
  return null === t || e - n > Zt
    ? null
    : { speechProbability: t, isSpeech: !0 === gc.sileroVadSpeech };
}
async function Cy() {
  gc.sileroVadGeneration += 1;
  const e = gc.sileroVad;
  if (
    ((gc.sileroVad = null),
    (gc.sileroVadInitPromise = null),
    (gc.sileroVadState = "idle"),
    (gc.sileroVadProbability = null),
    (gc.sileroVadSpeech = !1),
    (gc.sileroVadLastFrameAtMs = 0),
    e)
  ) {
    try {
      await e.pause();
    } catch {}
    try {
      e.destroy();
    } catch {}
  }
}
function Ay() {
  return (
    !!gc.config &&
    Boolean(
      !0 === gc.config?.localVadGateEnabled &&
        !1 !== gc.config?.vadEnabled &&
        gc.config?.vadProvider !== Gt,
    )
  );
}
function Ry() {
  return {
    inSpeech: !1,
    speechMs: 0,
    silenceMs: 0,
    prefixBuffer: [],
    prefixBufferMs: 0,
    capturedAudioMs: 0,
    lastVoiceAtMs: 0,
    lastScore: 0,
    lastPeak: 0,
  };
}
function xy() {
  return {
    launchedCount: 0,
    compatLaunchedCount: 0,
    completedFallbackCount: 0,
    fallbackWinCount: 0,
    primaryWinAfterLaunchCount: 0,
    fallbackBillableAudioMs: 0,
    fallbackCostUSD: 0,
    lastTriggerReason: "",
    lastWinnerProvider: "",
  };
}
function Ey() {
  return {
    chunks: [],
    durationMs: 0,
    queue: [],
    isUploading: !1,
    activeUploads: 0,
    nextSegmentId: 1,
    committedText: "",
    pendingDeltaText: "",
    pendingDeltaQueuedAtMs: 0,
    pendingDeltaTiming: null,
    pendingDeltaLanguage: null,
    mseIdleFlushTimer: null,
  };
}
function Py() {
  return {
    enabled: !1,
    startedAtMs: 0,
    lastSegmentAtMs: 0,
    segmentsReceived: 0,
    segmentsQueued: 0,
    segmentsBuffered: 0,
    bytesReceived: 0,
    lastSequence: 0,
    lastLeadSeconds: null,
    maxLeadSeconds: 0,
    lastBufferedStart: null,
    lastBufferedEnd: null,
    lastSourceCurrentTime: null,
    lastSourceCurrentTimeAtMs: 0,
    lastSourcePlaybackRate: 1,
    lastMimeType: "",
    mediaContextKey: "",
    hookVersion: null,
    hookVersionMismatchLogged: !1,
    staleHookSegmentsIgnored: 0,
    staleHookFallbackTimer: null,
    staleHookFallbackActivated: !1,
    staleHookFallbackUnavailableLogged: !1,
    noSegmentFallbackTimer: null,
    noSegmentFallbackActivated: !1,
    noSegmentFallbackUnavailableLogged: !1,
    noSegmentFallbackCountdownStartedAtMs: 0,
    noSegmentFallbackEvidence: "",
    noSegmentFallbackHookActivityAtMs: 0,
    noSegmentFallbackHookSourceBufferCount: 0,
    noSegmentFallbackHookAppendCount: 0,
    noSegmentFallbackOriginalConfig: null,
    noSegmentFallbackOriginalBoost: null,
    noSegmentFallbackActivatedAtMs: 0,
    noSegmentFallbackRecoveredAtMs: 0,
    noSegmentFallbackRecoveryCount: 0,
    resetAtMs: 0,
    seekTargetMediaTime: null,
    seekAnchorEstablished: !1,
    seekAnchorEstablishedAtMs: 0,
    seekAnchorSource: "",
    seekAnchorWaitLogAtMs: 0,
    seekDeferredSegments: new Map(),
    seekDeferredBytes: 0,
    firstAcceptedMediaStartTime: null,
    lastAcceptedMediaStartTime: null,
    lastAcceptedMediaEndTime: null,
    maxAcceptedMediaEndTime: null,
    leadingCoverageBackfillEndTime: null,
    scheduledRanges: [],
    fastCoveredRanges: [],
    cacheCoveredRanges: [],
    schedulerLastLogAtMs: 0,
    standardSegmentsScheduled: 0,
    fastFallbackSegments: 0,
    cacheCoveredSegments: 0,
    duplicateSegmentsSkipped: 0,
    bridgeClosedAtMs: 0,
    bridgeClosedReason: "",
    tabCaptureBridgeDisabledLogged: !1,
    aheadDecodeQueue: [],
    aheadDecodeActive: 0,
    aheadDecodePendingKeys: new Set(),
    aheadDeferredAtByKey: new Map(),
    gapRepostAtByKey: new Map(),
    aheadDecodedPcmChunks: [],
    aheadDecodedPcmMs: 0,
    aheadDecodeScheduled: 0,
    aheadDecodeCompleted: 0,
    aheadDecodeRejected: 0,
    aheadDecodeStale: 0,
    aheadDecodedPcmLeadSeconds: 0,
    aheadDecodedPcmMaxLeadSeconds: 0,
    lastAheadDecodeLogAtMs: 0,
    lastAheadDecodeCompletedAtMs: 0,
    aheadDecodedIdleTailFlushTimer: null,
  };
}
function Dy() {
  return {
    enabled: !1,
    active: !1,
    switched: !1,
    mode: Rl,
    startedAtMs: 0,
    switchedAtMs: 0,
    targetReadySeconds: kl,
    standardSttProvider: "",
    standardProvider: "",
    fastSttProvider: Pl,
    fastProvider: Dl,
    readySubtitleEndMediaTime: null,
    readySubtitleRanges: [],
    readySubtitleLeadSeconds: 0,
    usableMseLeadSeconds: 0,
    recommendedStartupWaitSeconds: null,
    releaseRequiredLeadSeconds: null,
    startupReleaseLeadSeconds: 7,
    startupReleaseReadyLeadSeconds: 0,
    startupReleaseReadyOnlyLeadSeconds: 0,
    startupReleasePendingTranslationReserveSeconds: 0,
    startupReleaseUsedPendingFinalStt: !1,
    startupReleaseReadyRanges: [],
    startupProcessedAudioRanges: [],
    startupFinalSttAudioRanges: [],
    startupReleaseReadyDecision: null,
    startupReleaseReady: !1,
    startupReleaseReadyCurrent: !1,
    startupReleaseReadyAtMs: 0,
    initialBatchCatchupStarted: !1,
    initialBatchCatchupStartedAtMs: 0,
    initialBatchCatchupReason: "",
    initialBatchCatchupStartMediaTime: null,
    initialBatchCatchupSegmentsQueued: 0,
    initialBatchCatchupFirstReady: !1,
    initialBatchCatchupFirstReadyAtMs: 0,
    initialBatchCatchupReadySegmentId: null,
    initialBatchCatchupLastDeferredSignature: "",
    initialBatchCatchupFastLlmClaimKey: "",
    initialBatchCatchupFastLlmClaimedAtMs: 0,
    initialRealtimeBridgeClosedAtMs: 0,
    startupReadyFrontierMediaTime: null,
    startupReadyFrontierAtMs: 0,
    startupReadyIntervalSamplesMs: [],
    batchOnlyAfterSeek: !1,
    seekRealtimeBridge: !1,
    lastStatusAtMs: 0,
  };
}
function Iy() {
  return {
    armed: !1,
    active: !1,
    lastLeadSeconds: null,
    armedAtMs: 0,
    enteredAtMs: 0,
    exitedAtMs: 0,
  };
}
function Ly(e = {}) {
  const t = Uy(e),
    n = LP(e.sttProvider || Y),
    a = _y(n, e.sourceLang),
    r = Fy(e.mseStartupBoostMode),
    i = r === Rl && a === n ? El : r;
  return {
    ...Dy(),
    enabled: t,
    active: t,
    mode: i,
    startedAtMs: t ? Date.now() : 0,
    targetReadySeconds: qy(e.mseStartupBoostTargetSeconds),
    standardSttProvider: n,
    standardProvider: qP(e.provider || "lt-l"),
    fastSttProvider: a,
    fastProvider: vw(e),
  };
}
function _y(e, t = "auto") {
  const n = LP(e);
  return n === Z || n === ne || (n === ae && BP(ae, t))
    ? n
    : BP(ae, t)
      ? Pl
      : Z;
}
function By(e = gc.activeSttProvider) {
  const t = gc.mseStartupBoost || {};
  if (
    !t.enabled ||
    !t.active ||
    t.switched ||
    t.mode !== Rl ||
    !0 === t.batchOnlyAfterSeek
  )
    return !1;
  const n = LP(e),
    a = LP(t.fastSttProvider || Pl),
    r = LP(t.standardSttProvider || gc.config?.sttProvider);
  return n === a && a !== r;
}
function Uy(e = gc.config || {}) {
  return (
    !0 === e.mseStartupBoostEnabled &&
    (!0 === e.mseAudioBufferEnabled ||
      "mse-audio-buffer" === e.audioInputMode) &&
    !e.mirrorDelayEnabled &&
    !e.nativeStreamDelayEnabled &&
    LP(e.sttProvider) !== Z &&
    JP(e.sttProvider)
  );
}
function qy(e) {
  const t = Number(e);
  return Number.isFinite(t) ? dP(t, Cl, Al) : kl;
}
function Fy(e) {
  const t = String(e || Rl)
    .toLowerCase()
    .trim();
  return t === xl ? xl : t === El ? El : Rl;
}
function Oy(e) {
  gc.config.walletSttPolicy = e || { startup: [], rescue: [] };
  const t = gc.mseStartupBoost;
  "sql-wallet-v1" === gc.config.walletBillingProtocol &&
    t?.active &&
    t.mode === Rl &&
    !Wy(t.fastSttProvider || Pl, "startup") &&
    ((t.mode = xl), (t.walletStartupDenied = !0));
}
function Ny(e) {
return false;
}
function Hy(e) {
  const t = qP(e);
  return Object.keys(_e).find((e) => _e[e] === t) || t;
}
function Gy(e) {
  return "sql-wallet-v1" !== gc.config?.walletBillingProtocol ||
    (!0 === gc.config.walletAllowAlternateLlm &&
      "off" !== gc.config.llmFallbackMode)
    ? qP(e)
    : qP(gc.config.provider);
}
function Wy(e, t) {
return false;
}
function $y() {
return Y;
}
function Vy() {
  return {
    inputAudioTokens: 0,
    outputAudioTokens: 0,
    totalAudioTokens: 0,
    costUSD: 0,
  };
}
function jy() {
  return {
    finalTranscripts: 0,
    finalTranscriptChars: 0,
    translationRequests: 0,
    translationResponses: 0,
    translationErrors: 0,
    emptyTranslations: 0,
    emittedSegments: 0,
    pendingFinalMerges: 0,
    translationRetries: 0,
    fallbackDisplayedSegments: 0,
  };
}
function Ky(e = {}) {
  if (ib(e)) return eb(e) ? (nb(e) ? ab() : tb(e) ? $s : Hs) : Fs;
  const t = qP(gc.config?.provider),
    n = rP(gc.config?.syncDelaySeconds);
  if (
    !0 === gc.config?.syncEnabled &&
    !0 !== gc.config?.singleTabMediaSync &&
    null !== n &&
    n <= 6 &&
    Object.prototype.hasOwnProperty.call(So, t) &&
    ("lt-a" === t || "lt-b" === t)
  ) {
    const e = So[t] || ze,
      n = oP(gc.config?.batchSttMinSegmentMs),
      a = dP(e, 1e3, ze);
    return null !== n ? dP(n, 1e3, 6e3) : a;
  }
  const a = Nf(e) ? tt : rb() ? Je : ze;
  return dP(gc.config?.batchSttMinSegmentMs || a, a, 6e3);
}
function zy(e = {}) {
  if (ib(e)) return eb(e) ? (nb(e) ? Xs : tb(e) ? js : Ws) : Ns;
  const t = Ky(e),
    n = Nf(e) ? at : rb() ? Ze : Qe,
    a = oP(gc.config?.batchSttMaxSegmentMs),
    r = null !== a ? a : Math.min(n, Qy());
  return Math.max(t, dP(r, t, 15e3));
}
function Qy() {
  const e = bk();
  if (e > 0) return dP(e, Xe, Qe);
  if (rb()) return Ze;
  const t = String(gc.config?.provider || "").toLowerCase(),
    n = ot[t],
    a = Math.max(0, 1e3 * (rP(gc.config?.syncDelaySeconds) || 6)),
    r = Jy(),
    i = a > 0 ? Math.max(Ze, Math.round(0.32 * (a - r))) : it;
  return dP(Math.min(n || it, i), Xe, Qe);
}
function Jy() {
  const e = oP(gc.config?.batchSttPipelineReserveMs);
  return dP(null !== e ? e : ho[gc.config?.provider] || st, 1500, lt);
}
function Xy(e = {}) {
  if (ib(e)) {
    const t = Yy(e);
    if (eb(e)) return dP(nb(e) ? ab() : (t ?? (tb(e) ? Vs : Gs)), Ky(e), zy(e));
    const n = bk(),
      a = n > 0 ? Math.max(Os, n) : Os;
    return dP(null !== t ? Math.min(a, t) : a, Ky(e), zy(e));
  }
  const t = rP(gc.config?.batchSttTargetSegmentMs),
    n = Ky(e),
    a = zy(e);
  if (null !== t) return dP(t, n, a);
  const r = bk();
  if (r > 0) return dP(r, n, a);
  const i = Zy(e, n, a);
  return null !== i
    ? i
    : Nf(e)
      ? dP(nt, n, a)
      : rb()
        ? dP(Xe, n, a)
        : dP(
            Math.max(0, 1e3 * (rP(gc.config?.syncDelaySeconds) || 6)) - Jy(),
            n,
            a,
          );
}
function Zy(e = {}, t, n) {
  if (
    !0 !== gc.config?.syncEnabled ||
    !0 === gc.config?.singleTabMediaSync ||
    ib(e)
  )
    return null;
  const a = Array.isArray(e.chunks) ? e.chunks : [];
  if (a.length && !a.every((e) => "tab-capture" === Uf(e))) return null;
  const r = fg(e);
  if (!QP(r)) return null;
  const i = Math.max(
    0,
    1e3 *
      (rP(
        gc.config?.effectiveSyncDelaySeconds ?? gc.config?.syncDelaySeconds,
      ) || 0),
  );
  if (i <= 0) return null;
  const o = qP(gc.config?.provider),
    s =
      i -
      (Math.max(1, Math.round(Xh(r))) +
        Math.max(1, Math.round(So[o] || Ma)) +
        Math.max(0, Math.round(Sk())) +
        At +
        ba);
  return dP(Math.max(Xe, s), t, n);
}
function Yy(e = {}) {
  const t = Array.isArray(e.chunks) ? e.chunks : [];
  if (!t.length) return null;
  if (!t.every((e) => e?.encodedAudio && "mse-audio-buffer" === Uf(e)))
    return null;
  const n = Math.max(0, rP(t[t.length - 1]?.durationMs) || 0),
    a = Math.max(Fs, Ky(e));
  return n < a ? null : dP(n, a, zy(e));
}
function eb(e = {}) {
  if (!ib(e)) return !1;
  const t = gc.mseStartupBoost || {};
  if (t.switched) return !1;
  if ((rP(t.readySubtitleLeadSeconds) || 0) >= Math.max(Qs, Cp())) return !1;
  if (yh().active) return !0;
  const n = gc.mseAudio || {};
  return (Number(n.standardSegmentsScheduled) || 0) < 8;
}
function tb(e = {}) {
  return !!ib(e) && !!eb(e) && LP(e.batchSttProviderOverride || pg()) === oe;
}
function nb(e = {}) {
  if (!ib(e)) return !1;
  const t = gc.mseStartupBoost || {},
    n = Xk();
  return t.enabled && t.active && !t.switched
    ? (t.mode === xl || t.mode === El) &&
        (rP(t.readySubtitleLeadSeconds) || 0) < Cp()
    : n;
}
function ab() {
  return dP(1e3 * Cp() + Js, Fs, Xs);
}
function rb() {
  return Boolean(
    gc.config?.lowLatencyStt ||
      "instant-overlay" === gc.config?.captionMode ||
      gc.config?.singleTabMediaSync ||
      !1 === gc.config?.syncEnabled,
  );
}
function ib(e = {}) {
  if ("mse-audio-buffer" === e.sourceType) return !0;
  if ("mse-audio-buffer" === e.audioInputMode) return !0;
  if (/^mse(?:-|_)/i.test(String(e.reason || ""))) return !0;
  const t = Array.isArray(e.chunks) ? e.chunks : null;
  return (
    !(!t?.length || !t.every((e) => "mse-audio-buffer" === Uf(e))) ||
    (!!t?.length &&
      !!sp(e) &&
      t.some(
        (e) =>
          e?.encodedAudio ||
          !0 === e?.mseGapBackfill ||
          void 0 !== e?.mseSequence ||
          e?.mseMediaRangeSource,
      ))
  );
}
function ob(e = {}) {
  const t = oP(gc.config?.batchSttOverlapMs),
    n = Nf(e) ? rt : ct;
  return dP(null !== t ? t : n, 0, 1800);
}
function sb(e) {
  return `${(Math.max(0, e) / 1e3).toFixed(1)}s`;
}
async function lb(e = 9e3) {
  const t = Date.now();
  for (; Date.now() - t < e; ) {
    const e = sy();
    if (!e.isUploading && !e.queue.length) return !0;
    await fD(dt);
  }
  return !1;
}
async function cb(e = 2e4) {
  const t = Date.now();
  let n = !1;
  for (; Date.now() - t < e; ) {
    (Iv("stop-drain"),
      pA(),
      gc.finalTranslationBatch.length && iA() && Nw({ force: !0 }));
    const e = sy(),
      t = Boolean(e.isUploading || e.queue.length || e.chunks.length),
      a = Boolean(
        gc.pendingFinalTranslation ||
          gc.finalTranslationBatch.length ||
          dA() > 0 ||
          (gc.finalTranslationRetryTimers instanceof Set &&
            gc.finalTranslationRetryTimers.size > 0),
      );
    if (!t && !a) {
      n = !0;
      break;
    }
    await fD(dt);
  }
  return (
    n ||
      Nx(
        "pipeline.stop_drain_timeout",
        {
          waitMs: e,
          pendingFinalBatch: gc.finalTranslationBatch.length,
          pendingFinalTranslation: Boolean(gc.pendingFinalTranslation),
          activeFinalTranslations: dA(),
          retryTimers:
            gc.finalTranslationRetryTimers instanceof Set
              ? gc.finalTranslationRetryTimers.size
              : 0,
        },
        { source: "offscreen", level: "warn" },
      ),
    n
  );
}
function db(e) {
  const t = e?.outputBuffer;
  if (t)
    for (let e = 0; e < t.numberOfChannels; e += 1) t.getChannelData(e).fill(0);
}
async function ub(e, t = {}) {
  const n = { mandatory: { chromeMediaSource: "tab", chromeMediaSourceId: e } },
    a = [],
    r = Boolean(t.video);
  if (r)
    try {
      return await navigator.mediaDevices.getUserMedia({ audio: n, video: n });
    } catch (e) {
      return (
        a.push(e),
        vP("capture-retry", "音訊與畫面擷取重試中"),
        await mb(a, { video: !0 })
      );
    }
  try {
    return await navigator.mediaDevices.getUserMedia({ audio: n, video: !1 });
  } catch (e) {
    (a.push(e), vP("capture-retry", "音訊擷取重試中"));
  }
  try {
    const e = await navigator.mediaDevices.getUserMedia({ audio: n, video: n });
    return (e.getVideoTracks().forEach((e) => e.stop()), e);
  } catch (e) {
    return (a.push(e), await mb(a, { video: r }));
  }
}
async function mb(e, t = {}) {
  if (!chrome?.tabCapture?.capture) throw new Error(xb(e));
  try {
    return await new Promise((e, n) => {
      chrome.tabCapture.capture({ audio: !0, video: Boolean(t.video) }, (t) => {
        const a = chrome.runtime.lastError;
        !a && t
          ? e(t)
          : n(
              new Error(
                a?.message || "chrome.tabCapture.capture returned no stream",
              ),
            );
      });
    });
  } catch (t) {
    throw new Error(xb([...e, t]));
  }
}
function gb() {
  if (!gc.config?.mirrorDelayEnabled) return;
  if (gc.config?.nativeStreamDelayEnabled)
    return (
      vP("native-stream-delay", `${hb()} 原始串流延遲啟用`),
      void Nx(
        "mirror.recorder.skipped",
        {
          reason: "native-stream-delay",
          kind: gc.config.nativeStreamDelayKind || "",
          delaySeconds: gc.config.syncDelaySeconds,
        },
        { source: "offscreen" },
      )
    );
  if (!gc.mediaStream?.getVideoTracks?.().length)
    throw new Error(
      "鏡像延遲模式需要擷取分頁畫面，請重新啟動字幕並允許分頁擷取。",
    );
  if ("undefined" == typeof MediaRecorder)
    throw new Error("目前瀏覽器不支援 MediaRecorder，無法啟用鏡像延遲模式。");
  const e = kb();
  if (
    ((gc.mirrorChunkSequence = 0),
    (gc.mirrorBroadcastChannel = Sb()),
    !pb(bb(), 0, e, "initial"))
  )
    throw (Mb(), new Error("鏡像錄製沒有可用的瀏覽器編碼器。"));
  vP("mirror-delay", `鏡像延遲 ${sb(1e3 * gc.config.syncDelaySeconds)} 啟用`);
}
function pb(e, t, n, a = "fallback") {
  const r = Array.isArray(e) && e.length ? e : [""];
  for (let e = Math.max(0, Number(t) || 0); e < r.length; e += 1) {
    const t = r[e] || "",
      i = LD(t),
      o = wb(t, n, i);
    let s = null,
      l = !1,
      c = !1,
      d = null,
      u = Date.now(),
      m = 0;
    try {
      ((s = new MediaRecorder(gc.mediaStream, o)),
        (gc.mirrorRecorder = s),
        (gc.mirrorMimeType = t));
      const g = () => {
          (null !== d && clearTimeout(d), (d = null));
        },
        p = (a, i = null) => {
          if (c || l || gc.isStopping || gc.mirrorRecorder !== s) return !1;
          ((c = !0), g());
          const o = String(i?.message || i || a || "encoder failed").slice(
              0,
              240,
            ),
            d = r[e + 1] ?? null;
          if (
            (Nx(
              "mirror.recorder.failed",
              {
                reason: a,
                message: o,
                mimeType: t || "browser-default",
                recorderState: s?.state || "unknown",
                beforeFirstChunk: !0,
                nextMimeType: null === d ? "" : d || "browser-default",
                attemptIndex: e,
              },
              { source: "offscreen", level: "warn" },
            ),
            (gc.mirrorRecorder = null),
            (gc.mirrorMimeType = ""),
            s?.state && "inactive" !== s.state)
          )
            try {
              s.stop();
            } catch {}
          return null !== d
            ? (vP(
                "mirror-recorder-retry",
                `鏡像編碼器無法啟動，改用 ${d || "瀏覽器預設格式"}`,
              ),
              Nx(
                "mirror.recorder.fallback",
                {
                  reason: a,
                  fromMimeType: t || "browser-default",
                  toMimeType: d || "browser-default",
                  attemptIndex: e + 1,
                },
                { source: "offscreen", level: "warn" },
              ),
              setTimeout(() => {
                gc.isStopping ||
                  gc.mirrorRecorder ||
                  pb(r, e + 1, n, a) ||
                  yP("鏡像錄製的所有可用編碼器都啟動失敗");
              }, 0),
              !0)
            : (yP(`鏡像錄製失敗：${o}`), !1);
        };
      return (
        s.addEventListener("start", () => {
          gc.mirrorRecorder === s &&
            vP(
              "mirror-recorder",
              `鏡像錄製啟動 · ${gc.mirrorMimeType || "瀏覽器預設格式"} · ${n}ms`,
            );
        }),
        s.addEventListener("dataavailable", (e) => {
          if (
            !e.data ||
            e.data.size <= 0 ||
            gc.isStopping ||
            gc.mirrorRecorder !== s
          )
            return;
          ((l = !0), g(), (m += e.data.size));
          const n = Date.now() - u;
          (n >= ys &&
            (Nx(
              "mirror.recorder.quality",
              {
                ...ID(),
                qualityPolicy: i.policy,
                recommendedVideoBitsPerSecond: i.recommendedVideoBitsPerSecond,
                requestedVideoBitsPerSecond: o.videoBitsPerSecond || 0,
                actualVideoBitsPerSecond: s.videoBitsPerSecond || 0,
                encodedTotalBitsPerSecond: Math.round((8e3 * m) / n),
                sampleDurationMs: n,
                mimeType: s.mimeType || t || "browser-default",
              },
              { source: "offscreen" },
            ),
            (u = Date.now()),
            (m = 0)),
            Ab(e.data).catch((e) => {
              (console.warn(
                "[offscreen] mirror chunk relay skipped:",
                e.message,
              ),
                vP("mirror-chunk-error", `鏡像 chunk 傳送失敗：${e.message}`));
            }));
        }),
        s.addEventListener("error", (e) => {
          const t = e?.error || new Error("鏡像錄製失敗");
          p("encoder-error", t) || yP(t.message || "鏡像錄製失敗");
        }),
        s.addEventListener("stop", () => {
          gc.mirrorRecorder !== s ||
            gc.isStopping ||
            l ||
            p(
              "stopped-before-first-chunk",
              new Error("編碼器在第一段影片前停止"),
            );
        }),
        s.start(n),
        (d = setTimeout(() => {
          p("first-chunk-timeout", new Error("等待第一段鏡像影片逾時"));
        }, Cs)),
        Nx(
          "mirror.recorder.start",
          {
            ...i.capture,
            qualityPolicy: i.policy,
            recommendedVideoBitsPerSecond: i.recommendedVideoBitsPerSecond,
            softwareBitrateLimited: i.softwareBitrateLimited,
            bufferBitrateLimited: i.bufferBitrateLimited,
            mimeType: gc.mirrorMimeType || "browser-default",
            relay: gc.mirrorBroadcastChannel
              ? "broadcast-channel-blob"
              : "service-worker-base64",
            videoBitsPerSecond: o?.videoBitsPerSecond || 0,
            audioBitsPerSecond: o?.audioBitsPerSecond || 0,
            actualVideoBitsPerSecond: s?.videoBitsPerSecond || 0,
            actualAudioBitsPerSecond: s?.audioBitsPerSecond || 0,
            requestedKeyFrameIntervalMs: o?.videoKeyFrameIntervalDuration || 0,
            timesliceMs: n,
            delaySeconds: gc.config.syncDelaySeconds,
            attemptIndex: e,
            reason: a,
          },
          { source: "offscreen" },
        ),
        !0
      );
    } catch (n) {
      (null !== d && clearTimeout(d),
        gc.mirrorRecorder === s && (gc.mirrorRecorder = null),
        (gc.mirrorMimeType = ""),
        Nx(
          "mirror.recorder.failed",
          {
            reason: "start-threw",
            message: String(n?.message || n || "encoder failed").slice(0, 240),
            mimeType: t || "browser-default",
            recorderState: s?.state || "unavailable",
            beforeFirstChunk: !0,
            nextMimeType: r[e + 1] || "browser-default",
            attemptIndex: e,
          },
          { source: "offscreen", level: "warn" },
        ));
    }
  }
  return !1;
}
function fb() {
  const e = gc.mirrorRecorder;
  if (
    ((gc.mirrorRecorder = null),
    (gc.mirrorMimeType = ""),
    (gc.mirrorChunkSequence = 0),
    Mb(),
    e && "inactive" !== e.state)
  )
    try {
      e.stop();
    } catch {}
}
function hb() {
  const e = String(gc.config?.nativeStreamDelayKind || "").trim();
  return "twitch-hls" === e
    ? "Twitch HLS"
    : "instagram-native" === e
      ? "Instagram"
      : "直播";
}
function Sb() {
  if ((Mb(), "undefined" == typeof BroadcastChannel)) return null;
  try {
    return new BroadcastChannel(vb(gc.sessionId));
  } catch {
    return null;
  }
}
function Mb() {
  const e = gc.mirrorBroadcastChannel;
  if (((gc.mirrorBroadcastChannel = null), e))
    try {
      e.close();
    } catch {}
}
function vb(e) {
  return `live-subtitle-mirror:${e || "default"}`;
}
function yb() {
  return bb()[0] || "";
}
function bb() {
  const e = [
      'video/mp4;codecs="avc1.42E01E,mp4a.40.2"',
      "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
      "video/webm;codecs=vp8,opus",
      "video/webm;codecs=vp9,opus",
      "video/webm",
    ],
    t = [],
    n = new Set();
  for (const a of e) {
    if (!Tb(a)) continue;
    const e = a.toLowerCase().replace(/[\s"]/g, "");
    n.has(e) || (n.add(e), t.push(a));
  }
  return (t.push(""), t);
}
function Tb(e) {
  return (
    !!MediaRecorder.isTypeSupported(e) &&
    ("undefined" == typeof MediaSource ||
      !MediaSource.isTypeSupported ||
      MediaSource.isTypeSupported(e))
  );
}
function wb(e, t = 1e3, n = LD(e)) {
  const a = {};
  return (
    e && (a.mimeType = e),
    (a.videoKeyFrameIntervalDuration = Math.max(
      250,
      Math.min(ks, Number(t) || ks),
    )),
    n.videoBitsPerSecond > 0 && (a.videoBitsPerSecond = n.videoBitsPerSecond),
    a
  );
}
function kb() {
  return Cb() ? ws : Ts;
}
function Cb() {
  const e = String(gc.config?.videoPlatform || "").toLowerCase(),
    t = String(gc.config?.pageUrl || gc.config?.sourceUrl || "").toLowerCase();
  return "instagram" === e || t.includes("instagram.com");
}
async function Ab(e) {
  const t = Date.now(),
    n = ++gc.mirrorChunkSequence,
    a = Date.now(),
    r = gc.mirrorMimeType || e.type || "video/webm",
    i = e.size || 0;
  let o = "broadcast-channel-blob",
    s = !0,
    l = null,
    c = t;
  if (gc.mirrorBroadcastChannel)
    try {
      gc.mirrorBroadcastChannel.postMessage({
        type: "MIRROR_MEDIA_CHUNK",
        sessionId: gc.sessionId || null,
        mimeType: r,
        sequence: n,
        capturedAtMs: a,
        byteLength: i,
        chunkBlob: e,
      });
    } catch (t) {
      ((o = "service-worker-base64"),
        (l = await e.arrayBuffer()),
        (c = Date.now()),
        await Rb({ chunk: l, mimeType: r, sequence: n, capturedAtMs: a }).catch(
          (e) => {
            throw ((s = !1), e || t);
          },
        ));
    }
  else
    ((o = "service-worker-base64"),
      (l = await e.arrayBuffer()),
      (c = Date.now()),
      await Rb({ chunk: l, mimeType: r, sequence: n, capturedAtMs: a }).catch(
        (e) => {
          throw ((s = !1), e);
        },
      ));
  ((n <= 3 || n % 10 == 0) &&
    Nx(
      "mirror.chunk.sent",
      {
        sequence: n,
        relay: o,
        byteLength: i,
        blobToArrayBufferMs: c - t,
        sendMs: Date.now() - c,
      },
      { source: "offscreen" },
    ),
    (n <= 3 || n % 5 == 0) &&
      vP(
        s ? "mirror-chunk" : "mirror-chunk-error",
        s
          ? `鏡像 chunk ${n} · ${Eb(i)} · ${"broadcast-channel-blob" === o ? "直傳" : "fallback"}`
          : `鏡像 chunk ${n} 傳送失敗`,
      ));
}
async function Rb({ chunk: e, mimeType: t, sequence: n, capturedAtMs: a }) {
  const r = Pb(e);
  await chrome.runtime.sendMessage({
    type: "MIRROR_MEDIA_CHUNK",
    sessionId: gc.sessionId || null,
    mimeType: t,
    sequence: n,
    capturedAtMs: a,
    byteLength: e.byteLength,
    chunkBase64: r,
  });
}
function xb(e) {
  return `Tab audio capture failed: ${e
    .map((e) => `${e?.name || "Error"}: ${e?.message || String(e)}`)
    .filter(Boolean)
    .join(" | ")}`;
}
function Eb(e) {
  const t = Number(e) || 0;
  return t >= 1048576
    ? `${(t / 1024 / 1024).toFixed(1)}MB`
    : t >= 1024
      ? `${Math.round(t / 1024)}KB`
      : `${t}B`;
}
function Pb(e) {
  const t = new Uint8Array(e);
  let n = "";
  for (let e = 0; e < t.length; e += 32768)
    n += String.fromCharCode(...t.subarray(e, e + 32768));
  return btoa(n);
}
function Db(e) {
  let n;
  try {
    n = JSON.parse(e);
  } catch {
    return void console.warn("[offscreen] Non-JSON STT message:", e);
  }
  const a = n.message_type || n.type;
  if ("session_started" === a)
    return (
      Nx(
        "stt.realtime.session_started",
        {
          includeTimestamps: Boolean(n.config?.include_timestamps),
          timestampsGranularity: n.config?.timestamps_granularity || "",
          commitStrategy: n.config?.vad_commit_strategy ? "vad" : "manual",
          model: n.config?.model_id || t,
        },
        { source: "offscreen", provider: Z },
      ),
      void vP("listening", "STT session started")
    );
  if ("partial_transcript" === a) {
    const e = wD(n.text);
    if (!e || ED(e)) return;
    gc.lastRealtimeTranscriptAtMs = Date.now();
    const t = QA(Nv(n, zP()), {
      isFinal: !1,
      sourceType: "tab-capture",
      audioInputMode: "tab-capture",
      sttProvider: gc.activeSttProvider || Z,
    });
    if (Pv(t)) return;
    return (
      (gc.currentInterimText = e),
      (gc.currentInterimTiming = t),
      OT() &&
        bP({
          kind: "transcript",
          isFinal: !1,
          text: e,
          language: n.language_code || null,
          mediaTime: t.mediaTime,
          sync: t,
        }),
      void IT(e, t)
    );
  }
  "committed_transcript" !== a
    ? "committed_transcript_with_timestamps" !== a
      ? "error" === a && yP(n.error || n.message || "STT transcriber error")
      : Lb(n)
    : Ib(n);
}
function Ib(e = {}) {
  const t = wD(e.text);
  if (!t || ED(t)) return !1;
  const n = {
    id: ++gc.realtimeCommittedSequence,
    text: t,
    data: e,
    realtimeProcessedAudioRanges: Mf(),
    timelineRevision: gc.timelineRevision,
    receivedAtMs: Date.now(),
    timer: null,
  };
  return (
    (n.timer = setTimeout(() => {
      _b(n, "timestamp-timeout");
    }, R)),
    gc.pendingRealtimeCommittedTranscripts.push(n),
    Nx(
      "stt.realtime.commit_waiting_for_timestamps",
      { commitId: n.id, textChars: Array.from(t).length, waitMs: R },
      { source: "offscreen", provider: Z },
    ),
    !0
  );
}
function Lb(e = {}) {
  const t = wD(e.text);
  if (!t || ED(t)) return !1;
  let n = [],
    a = gc.pendingRealtimeCommittedTranscripts.findIndex((e) => e.text === t);
  if (
    (a < 0 &&
      (a = gc.pendingRealtimeCommittedTranscripts.findIndex(
        (e) =>
          e.timelineRevision === gc.timelineRevision &&
          Date.now() - e.receivedAtMs <= 1e3,
      )),
    a >= 0)
  ) {
    const [r] = gc.pendingRealtimeCommittedTranscripts.splice(a, 1);
    (r.timer && clearTimeout(r.timer),
      (n = r.realtimeProcessedAudioRanges || []),
      Nx(
        "stt.realtime.timestamped_commit_paired",
        {
          commitId: r.id,
          waitMs: Math.max(0, Date.now() - r.receivedAtMs),
          wordCount: Array.isArray(e.words) ? e.words.length : 0,
          textChars: Array.from(t).length,
        },
        { source: "offscreen", provider: Z },
      ));
  } else {
    Ub();
    const a = Number(gc.realtimePlainCommitFallbacks.get(t) || 0);
    if (a && Date.now() - a <= x)
      return (
        gc.realtimePlainCommitFallbacks.delete(t),
        Nx(
          "stt.realtime.timestamped_commit_late_ignored",
          {
            delayMs: Math.max(0, Date.now() - a),
            wordCount: Array.isArray(e.words) ? e.words.length : 0,
            textChars: Array.from(t).length,
          },
          { source: "offscreen", provider: Z, level: "warn" },
        ),
        !1
      );
    n = Mf();
  }
  return Bb(e, { timestamped: !0, realtimeProcessedAudioRanges: n });
}
function _b(e = null, t = "timestamp-timeout") {
  if (!e) return !1;
  const n = gc.pendingRealtimeCommittedTranscripts.indexOf(e);
  return (
    !(n < 0) &&
    (gc.pendingRealtimeCommittedTranscripts.splice(n, 1),
    e.timer && clearTimeout(e.timer),
    e.timelineRevision === gc.timelineRevision &&
      !gc.isStopping &&
      (gc.realtimePlainCommitFallbacks.set(e.text, Date.now()),
      Ub(),
      Nx(
        "stt.realtime.plain_commit_fallback",
        {
          commitId: e.id,
          reason: t,
          waitedMs: Math.max(0, Date.now() - e.receivedAtMs),
          textChars: Array.from(e.text).length,
        },
        { source: "offscreen", provider: Z, level: "warn" },
      ),
      Bb(e.data, {
        timestamped: !1,
        realtimeProcessedAudioRanges: e.realtimeProcessedAudioRanges || [],
      })))
  );
}
function Bb(e = {}, t = {}) {
  const n = wD(e.text);
  if (!n || ED(n)) return !1;
  ((gc.lastRealtimeTranscriptAtMs = Date.now()),
    (gc.realtimeCommitPending = !1),
    (gc.realtimeCommitSentAtMs = 0),
    (gc.lastRealtimeCommitAudioMs = Math.max(
      Math.max(0, rP(gc.lastRealtimeCommitAudioMs) || 0),
      Math.max(0, rP(gc.sttTimingAudioMs) || 0),
    )));
  const a = Nv(e, zP()),
    r = $p(t.realtimeProcessedAudioRanges || [], Qr),
    i = 1 === r.length ? r[0] : null,
    o = {
      ...QA(a, {
        isFinal: !0,
        sourceType: "tab-capture",
        audioInputMode: "tab-capture",
        sttProvider: Z,
        sourceMediaStartTime: i?.start,
        sourceMediaEndTime: i?.end,
      }),
      realtimeProcessedAudioRanges: r,
    };
  if (Pv(o)) return !1;
  ((gc.realtimeFinalTranscriptSeen = !0),
    (gc.lastFinalText = n),
    HT({ invalidate: !0 }),
    WR(n),
    (gc.lastTranscriptTiming = o));
  const s = xp(o);
  return (
    bP({
      kind: "transcript",
      isFinal: !0,
      text: n,
      language: e.language_code || null,
      words: a.words || null,
      mediaTime: o.mediaTime,
      sync: o,
      realtimeTimestampedCommit: Boolean(t.timestamped),
    }),
    dw(n, o),
    s.length &&
      TS(
        Dp("realtime-final-stt-queued", _p(o)),
        o,
        "realtime-final-stt-queued",
      ).catch((e) => {
        Nx(
          "mse.audio_buffer.readiness_delivery_failed",
          {
            reason: e?.message || String(e),
            readinessReason: "realtime-final-stt-queued",
            finalSttAudioRanges: s.map((e) => ({
              start: aP(e.start),
              end: aP(e.end),
            })),
          },
          { source: "offscreen", level: "error" },
        );
      }),
    !0
  );
}
function Ub(e = Date.now()) {
  for (const [t, n] of gc.realtimePlainCommitFallbacks)
    e - n > x && gc.realtimePlainCommitFallbacks.delete(t);
}
function qb() {
  for (const e of gc.pendingRealtimeCommittedTranscripts)
    e?.timer && clearTimeout(e.timer);
  ((gc.pendingRealtimeCommittedTranscripts = []),
    (gc.realtimePlainCommitFallbacks = new Map()),
    (gc.pendingRealtimeCommitCoverageRanges = []));
}
function Fb(e) {
  let t;
  try {
    t = JSON.parse(PT(e));
  } catch {
    return void console.warn("[offscreen] Non-JSON speechEngineA message:", e);
  }
  const n =
    gc.activeSttProvider === ae
      ? "迅聽 Mini 即時版"
      : "speechEngineA local ASR";
  if ("ready" === t.type)
    return (
      gc.websocket && (gc.websocket.__liveSubtitleSessionReady = !0),
      wd({ resetAttempts: !0 }),
      Nx(
        "stt.speechEngineA.session_started",
        {
          configuredSourceLang: gc.config.sourceLang || "auto",
          upstreamLanguage: t.language || oD(gc.config.sourceLang),
          commitIntervalMs: Zb(),
          subtitleBatchMaxMs: To,
          executionProvider: t.execution_provider || "",
          model: t.model || "",
        },
        { source: "offscreen", provider: gc.activeSttProvider || ne },
      ),
      void vP(
        "listening",
        `${n} ready (${t.language || gc.config.sourceLang || "auto"})`,
      )
    );
  if ("status" === t.type)
    return (
      /stream rotated/i.test(String(t.message || "")) &&
        ((gc.speechEngineARotationPending = !0),
        Nx(
          "stt.speechEngineA.rotation_started",
          { rotation: Number(t.rotation) || 0, reason: t.reason || "" },
          { source: "offscreen", provider: gc.activeSttProvider || ne },
        )),
      void vP("listening", t.message || `${n} status`)
    );
  if ("partial" !== t.type && "final" !== t.type) {
    if ("error" === t.type) {
      if (
        gc.activeSttProvider === ae &&
        [
          "speechEngineA_CAPACITY_FULL",
          "speechEngineA_UPSTREAM_REJECTED",
        ].includes(String(t.code || ""))
      ) {
        if (
          (Nx(
            "stt.speechEngineA_realtime.upstream_unavailable",
            { code: t.code, message: t.message || "" },
            { source: "offscreen", level: "warn", provider: ae },
          ),
          md("upstream-unavailable", {
            upstreamCode: wD(t.code || ""),
            upstreamMessage: wD(t.message || ""),
          }))
        )
          return;
        return void vP("connecting", "迅聽 Mini GPU 節點暫不可用，將自動重試");
      }
      yP(t.message || `${n} error`);
    }
  } else Ob(t);
}
function Ob(e = {}) {
  const t = "final" === e.type,
    n = t && !0 === e.endpoint,
    a = t && !n,
    r = wD(e.transcript || e.text),
    i = wD(e.text || ""),
    o = wD(gc.speechEngineALastTranscript),
    s = Date.now(),
    l = t ? Nb(r, i, o) : r ? $b(r) : i,
    c = wD(l || i || r),
    d = t && o && !l;
  if (!c || d || ED(c))
    return (
      d &&
        Nx(
          "stt.speechEngineA.final_boundary",
          {
            transcriptChars: Array.from(r).length,
            pendingChars: Array.from(wD(gc.speechEngineAPendingText)).length,
            rotation: gc.speechEngineARotationPending,
          },
          { source: "offscreen", provider: gc.activeSttProvider || ne },
        ),
      void dT(t)
    );
  ((gc.lastRealtimeTranscriptAtMs = s),
    r && (gc.speechEngineALastTranscript = r));
  const u = QA(Nv(e, zP()), {
    isFinal: t,
    sourceType: "tab-capture",
    audioInputMode: "tab-capture",
    sttProvider: gc.activeSttProvider || ne,
  });
  if (Pv(u)) return;
  (gc.speechEngineAPendingStartedAt || (gc.speechEngineAPendingStartedAt = s),
    (gc.speechEngineAPendingUpdatedAt = s),
    (gc.speechEngineAPendingTiming = Hb(gc.speechEngineAPendingTiming, u)),
    (gc.speechEngineAPendingText = c),
    Jb(c, s),
    sT(),
    (gc.currentInterimText = c),
    (gc.currentInterimTiming = u),
    OT() &&
      bP({
        kind: "transcript",
        isFinal: !1,
        text: c,
        language: oD(gc.config.sourceLang),
        mediaTime: u.mediaTime,
        sync: u,
      }),
    IT(c, u));
  const m = jb(c, { isFinal: a, quiet: n, softEndpoint: n, nowMs: s });
  (m.text
    ? fT(m.text, r, gc.speechEngineAPendingTiming || u, {
        reason: m.reason,
        pendingText: c,
        pendingAgeMs: m.pendingAgeMs,
        softEndpoint: n,
        endpointKind: wD(e.endpoint_kind || ""),
      })
    : n &&
      Nx(
        "stt.speechEngineA.soft_endpoint_held",
        {
          endpointKind: wD(e.endpoint_kind || ""),
          pendingChars: Array.from(c).length,
          pendingAgeMs: m.pendingAgeMs,
          reason: m.reason,
        },
        { source: "offscreen", provider: gc.activeSttProvider || ne },
      ),
    dT(a));
}
function Nb(e, t, n) {
  const a = wD(gc.speechEngineAPendingText),
    r = wD(n),
    i = wD(e);
  let o = "";
  return (
    r && i.startsWith(r) && (o = wD(i.slice(r.length))),
    a || o ? mT(a, o) : r ? "" : wD(t || i)
  );
}
function Hb(e = null, t = null) {
  if (!t || "object" != typeof t) return e;
  if (!e || "object" != typeof e) return { ...t };
  if (
    (Array.isArray(t.words) ? t.words : []).some(
      (e) => null !== rP(e?.mediaStartTime) || null !== rP(e?.mediaEndTime),
    )
  )
    return { ...t };
  const n = BC(e),
    a = UC(e),
    r = UC(t);
  if (null === n || null === r || r < n - 0.25) return { ...t };
  const i = Math.max(n, a ?? n, r);
  if (i <= n) return { ...t };
  const o = sP([e.audioStartMs, e.audioEndMs]),
    s = sP([t.audioEndMs, t.audioStartMs]),
    l = sP([e.audioEndMs, e.audioStartMs]),
    c = null !== s || null !== l ? Math.max(s ?? 0, l ?? 0) : null,
    d = null !== o && null !== c && c >= o ? c - o : Math.max(0, 1e3 * (i - n)),
    u = sP([e.audioStartWallTimeMs, e.audioEndWallTimeMs, e.sourceWallTimeMs]),
    m = sP([t.audioEndWallTimeMs, t.sourceWallTimeMs]);
  return {
    ...t,
    mediaTime: i,
    mediaTimeEnd: i,
    audioStartMs: o,
    audioEndMs: c,
    audioDurationMs: d,
    audioStartMediaTime: n,
    audioEndMediaTime: i,
    sourceMediaStartTime: n,
    sourceMediaEndTime: i,
    displayAfterMediaTimeStart: n,
    displayAfterMediaTimeEnd: i,
    audioStartWallTimeMs: u,
    audioEndWallTimeMs: m,
    preserveExplicitMediaRange: !0,
    timingSource: "stt-realtime-interim-range",
  };
}
function Gb(e = null) {
  if (!e || "object" != typeof e) return e;
  const t = UC(e),
    n = sP([e.audioEndMs, e.audioStartMs]),
    a = sP([e.audioEndWallTimeMs, e.sourceWallTimeMs, e.audioStartWallTimeMs]);
  return null === t
    ? { ...e }
    : {
        ...e,
        mediaTime: t,
        mediaTimeEnd: t,
        audioStartMs: n,
        audioEndMs: n,
        audioDurationMs: 0,
        audioStartMediaTime: t,
        audioEndMediaTime: t,
        sourceMediaStartTime: t,
        sourceMediaEndTime: t,
        displayAfterMediaTimeStart: t,
        displayAfterMediaTimeEnd: t,
        audioStartWallTimeMs: a,
        audioEndWallTimeMs: a,
        preserveExplicitMediaRange: !1,
        timingSource: "",
      };
}
function Wb(e = null, t = "", n = "") {
  if (!e || "object" != typeof e)
    return { committedTiming: e, remainingTiming: null, splitApplied: !1 };
  const a = wD(t),
    r = wD(n),
    i = Array.from(a).length,
    o = Array.from(r).length,
    s = BC(e),
    l = UC(e);
  if (
    !a ||
    !r.startsWith(a) ||
    i <= 0 ||
    o <= i ||
    null === s ||
    null === l ||
    l - s < 0.08
  )
    return { committedTiming: e, remainingTiming: null, splitApplied: !1 };
  const c = dP(i / o, 0.02, 0.98),
    d = s + (l - s) * c,
    u = sP([e.audioStartMs, e.audioEndMs]),
    m = sP([e.audioEndMs, e.audioStartMs]),
    g = null !== u && null !== m ? u + (m - u) * c : null,
    p = sP([e.audioStartWallTimeMs, e.audioEndWallTimeMs, e.sourceWallTimeMs]),
    f = sP([e.audioEndWallTimeMs, e.sourceWallTimeMs, e.audioStartWallTimeMs]),
    h = null !== p && null !== f ? p + (f - p) * c : null,
    S = e.timingSource || "stt-realtime-interim-range";
  return {
    committedTiming: {
      ...e,
      mediaTime: d,
      mediaTimeEnd: d,
      audioStartMediaTime: s,
      audioEndMediaTime: d,
      sourceMediaStartTime: s,
      sourceMediaEndTime: d,
      displayAfterMediaTimeStart: s,
      displayAfterMediaTimeEnd: d,
      audioStartMs: u,
      audioEndMs: g,
      audioDurationMs:
        null !== u && null !== g
          ? Math.max(0, g - u)
          : Math.max(0, 1e3 * (d - s)),
      audioStartWallTimeMs: p,
      audioEndWallTimeMs: h,
      sourceWallTimeMs: h ?? e.sourceWallTimeMs,
      preserveExplicitMediaRange: !0,
      timingSource: S,
    },
    remainingTiming: {
      ...e,
      mediaTime: l,
      mediaTimeEnd: l,
      audioStartMediaTime: d,
      audioEndMediaTime: l,
      sourceMediaStartTime: d,
      sourceMediaEndTime: l,
      displayAfterMediaTimeStart: d,
      displayAfterMediaTimeEnd: l,
      audioStartMs: g,
      audioEndMs: m,
      audioDurationMs:
        null !== g && null !== m
          ? Math.max(0, m - g)
          : Math.max(0, 1e3 * (l - d)),
      audioStartWallTimeMs: h,
      audioEndWallTimeMs: f,
      sourceWallTimeMs: f ?? e.sourceWallTimeMs,
      preserveExplicitMediaRange: !0,
      timingSource: S,
    },
    splitApplied: !0,
    splitRatio: c,
    splitMediaTime: d,
  };
}
function $b(e) {
  const t = wD(e),
    n = wD(gc.speechEngineACommittedTranscript);
  if (!t) return "";
  if (!n) return t;
  if (t.startsWith(n)) return wD(t.slice(n.length));
  const a = qR(t, n);
  return (
    a.overlapChars < 6 && (gc.speechEngineATranscriptRevisionCount += 1),
    a.text
  );
}
function Vb(e, t) {
  return Boolean(jb(e, { isFinal: t }).text);
}
function jb(e, t = {}) {
  const n = wD(e);
  if (!n) return { text: "", reason: "empty", pendingAgeMs: 0 };
  const a = rP(t.nowMs) ?? Date.now(),
    r = rP(gc.speechEngineAPendingStartedAt) || a,
    i = Math.max(0, a - r),
    o = rT(n),
    s = Array.from(n).length,
    l = aT(n),
    c = Yb(o),
    d = o ? 4 : ko,
    u = wD(void 0 === t.stableText ? Xb(n) : t.stableText);
  if (t.isFinal) return { text: n, reason: "upstream-final", pendingAgeMs: i };
  const m = iT(n);
  if (m && Array.from(m).length >= Math.min(l, 4))
    return { text: m, reason: "sentence-boundary", pendingAgeMs: i };
  if (!0 === t.quiet) {
    const e = Kb(n, {
      isCjk: o,
      minChars: o ? 7 : Co,
      minWords: !0 === t.softEndpoint ? 3 : 4,
    });
    return {
      text: e ? n : "",
      reason: e
        ? !0 === t.softEndpoint
          ? "soft-endpoint-boundary"
          : "quiet-boundary"
        : "quiet-too-short",
      pendingAgeMs: i,
    };
  }
  if (i >= To && s >= d) {
    const e = u,
      t = Kb(e, { isCjk: o, minChars: d }) ? e : "";
    return {
      text: t || zb(n, { isCjk: o, minChars: d }),
      reason: t
        ? "subtitle-batch-max-local-agreement"
        : "subtitle-batch-max-stable-prefix",
      pendingAgeMs: i,
    };
  }
  if (s >= c) {
    const e = Array.from(u).length > c ? oT(u, c, { isCjk: o, force: !0 }) : u;
    if (Kb(e, { isCjk: o, minChars: l }))
      return {
        text: e,
        reason: "target-size-local-agreement",
        pendingAgeMs: i,
      };
  }
  if (i >= Zb()) {
    const e = u;
    if (Kb(e, { isCjk: o, minChars: l }))
      return {
        text: e,
        reason: "stable-interval-local-agreement",
        pendingAgeMs: i,
      };
  }
  return { text: "", reason: "collecting", pendingAgeMs: i };
}
function Kb(e = "", t = {}) {
  const n = wD(e);
  if (!n) return !1;
  const a = t.isCjk ?? rT(n),
    r = Math.max(1, Math.round(Number(t.minChars) || aT(n)));
  if (Array.from(n).length < r) return !1;
  if (a) return !0;
  const i = Math.max(3, Math.round(Number(t.minWords) || 4));
  return n.split(/\s+/u).filter(Boolean).length >= i;
}
function zb(e = "", t = {}) {
  const n = wD(e);
  if (!n) return "";
  const a = t.isCjk ?? rT(n),
    r = Math.max(1, Math.round(Number(t.minChars) || 1));
  if (a) {
    const e = Array.from(n);
    if (e.length < r) return "";
    const t = e.length >= r + 2 ? e.length - 2 : e.length;
    return wD(e.slice(0, t).join(""));
  }
  const i = n.split(/\s+/u).filter(Boolean);
  if (i.length < 3 || Array.from(n).length < r) return "";
  const o = Qb(
    wD(
      (i.length > 4 ? i.slice(0, -2) : i.length >= 4 ? i.slice(0, -1) : i).join(
        " ",
      ),
    ),
  );
  return Array.from(o).length >= r ? o : "";
}
function Qb(e = "") {
  let t = wD(e);
  if (!t || rT(t) || pT(t)) return t;
  const n = (
      Array.isArray(gc.speechEngineAHypothesisHistory)
        ? gc.speechEngineAHypothesisHistory
        : []
    )
      .map((e) => wD(e?.text || e))
      .filter(Boolean),
    a = (e) =>
      n.some((t) => {
        if (!t.startsWith(e)) return !1;
        const n = t.slice(e.length, e.length + 1);
        return Boolean(n && /[\s,.;:!?\-)]/u.test(n));
      });
  for (; t && !a(t); ) {
    const e = t.split(/\s+/u).filter(Boolean);
    if (e.length <= 1) return "";
    (e.pop(), (t = wD(e.join(" "))));
  }
  return t;
}
function Jb(e, t = Date.now()) {
  const n = wD(e);
  if (!n) return "";
  Array.isArray(gc.speechEngineAHypothesisHistory) ||
    (gc.speechEngineAHypothesisHistory = []);
  const a = gc.speechEngineAHypothesisHistory.at(-1);
  return a?.text === n
    ? ((a.observedAtMs = t), Xb(n))
    : (gc.speechEngineAHypothesisHistory.push({ text: n, observedAtMs: t }),
      (gc.speechEngineAHypothesisHistory =
        gc.speechEngineAHypothesisHistory.slice(-3)),
      Xb(n));
}
function Xb(e = "") {
  const t = wD(e),
    n = (
      Array.isArray(gc.speechEngineAHypothesisHistory)
        ? gc.speechEngineAHypothesisHistory
        : []
    )
      .map((e) => wD(e?.text || e))
      .filter(Boolean);
  if (!t || n.length < 3) return "";
  const a = n.slice(-3);
  a.at(-1) !== t && a.push(t);
  let r = Array.from(a[0] || "");
  for (const e of a.slice(1)) {
    const t = Array.from(e);
    let n = 0;
    for (; n < r.length && n < t.length && r[n] === t[n]; ) n += 1;
    if (((r = r.slice(0, n)), !r.length)) return "";
  }
  const i = wD(r.join(""));
  if (!i || pT(i)) return i;
  if (rT(i)) {
    const e = Array.from(i);
    return e.length > 2 ? wD(e.slice(0, -2).join("")) : "";
  }
  const o = i.split(/\s+/u).filter(Boolean);
  return o.length <= 2 ? "" : Qb(wD(o.slice(0, -2).join(" ")));
}
function Zb() {
  const e = Math.max(
    800,
    Math.round(Number(gc.config?.speechEngineACommitIntervalMs) || yo),
  );
  if (!WT()) return e;
  const t = nT(yo, es);
  return Math.max(e, t);
}
function Yb(e = !1) {
  const t = e ? xo : Ao;
  return WT() ? nT(t, e ? ns : ts) : t;
}
function eT() {
  const e = nT(Qo, Xo);
  return Boolean(
    gc.config?.mirrorDelayEnabled || "mirror-delay" === gc.config?.captionMode,
  )
    ? Math.min(e, Zo)
    : e;
}
function tT() {
  return nT(2, 3);
}
function nT(e, t) {
  const n = dP((wk() - 5) / 5, 0, 1);
  return Math.round(e + (t - e) * n);
}
function aT(e = "") {
  const t = Math.max(
    1,
    Math.round(Number(gc.config?.speechEngineACommitMinChars) || bo),
  );
  return rT(e) ? Math.max(7, Math.min(t, 12)) : Math.max(Co, t);
}
function rT(e = "") {
  return (
    ZT(gc.config?.sourceLang) ||
    /[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7a3]/u.test(String(e || ""))
  );
}
function iT(e = "") {
  const t = Array.from(wD(e));
  let n = -1;
  for (let e = 0; e < t.length; e += 1) /[。！？!?…]/u.test(t[e]) && (n = e);
  return n >= 0 ? wD(t.slice(0, n + 1).join("")) : "";
}
function oT(e = "", t = 0, n = {}) {
  const a = wD(e),
    r = Array.from(a);
  if (!r.length) return "";
  const i = Math.max(1, Math.min(r.length, Math.round(t) || r.length));
  if (n.isCjk) {
    let e = -1;
    for (let t = 0; t < Math.min(r.length, i); t += 1)
      /[，、,：:；;]/u.test(r[t]) && (e = t + 1);
    if (e >= 7) return wD(r.slice(0, e).join(""));
    const t = n.force ? 0 : 2,
      a = Math.max(0, Math.min(i, r.length - t));
    return wD(r.slice(0, a).join(""));
  }
  const o = Math.min(a.length, r.slice(0, i).join("").length),
    s = a.slice(0, o),
    l = Math.max(
      s.lastIndexOf(" "),
      s.lastIndexOf(","),
      s.lastIndexOf(";"),
      s.lastIndexOf(":"),
      s.lastIndexOf("."),
    );
  if (l > 0) {
    const e = /[,;:.]/.test(s[l]);
    return wD(s.slice(0, l + (e ? 1 : 0)));
  }
  return n.force && r.length >= Ao ? wD(r.slice(0, i).join("")) : "";
}
function sT() {
  if (gc.speechEngineAHardCommitTimer || !gc.speechEngineAPendingStartedAt)
    return;
  const e = Math.max(0, To - (Date.now() - gc.speechEngineAPendingStartedAt));
  gc.speechEngineAHardCommitTimer = setTimeout(() => {
    if (
      ((gc.speechEngineAHardCommitTimer = null),
      gc.isStopping || !gc.speechEngineAPendingStartedAt)
    )
      return;
    const e = wD(gc.speechEngineALastTranscript),
      t = e ? $b(e) : wD(gc.speechEngineAPendingText || gc.currentInterimText),
      n = jb(t, { nowMs: Date.now() });
    n.text
      ? fT(
          n.text,
          e,
          gc.speechEngineAPendingTiming ||
            gc.currentInterimTiming ||
            QA(null, { isFinal: !0 }),
          { reason: n.reason, pendingText: t, pendingAgeMs: n.pendingAgeMs },
        )
      : (gc.speechEngineAHardCommitTimer = setTimeout(() => {
          ((gc.speechEngineAHardCommitTimer = null), sT());
        }, 250));
  }, e);
}
function lT() {
  (gc.speechEngineAQuietCommitTimer &&
    clearTimeout(gc.speechEngineAQuietCommitTimer),
    (gc.speechEngineAQuietCommitTimer = null));
}
function cT() {
  (gc.speechEngineAHardCommitTimer &&
    clearTimeout(gc.speechEngineAHardCommitTimer),
    (gc.speechEngineAHardCommitTimer = null));
}
function dT(e) {
  if (!e || !gc.speechEngineARotationPending) return !1;
  const t = gc.speechEngineATranscriptRevisionCount;
  return (
    uT(),
    Nx(
      "stt.speechEngineA.rotation_completed",
      { transcriptRevisionCount: t },
      { source: "offscreen", provider: gc.activeSttProvider || ne },
    ),
    !0
  );
}
function uT() {
  (lT(),
    cT(),
    (gc.speechEngineALastTranscript = ""),
    (gc.speechEngineACommittedTranscript = ""),
    (gc.speechEngineAPendingStartedAt = 0),
    (gc.speechEngineAPendingUpdatedAt = 0),
    (gc.speechEngineAPendingTiming = null),
    (gc.speechEngineAPendingText = ""),
    (gc.speechEngineAHypothesisHistory = []),
    (gc.speechEngineARotationPending = !1),
    (gc.speechEngineATranscriptRevisionCount = 0));
}
function mT(e, t) {
  const n = wD(e),
    a = wD(t);
  if (!n) return a;
  if (!a) return n;
  const r = Array.from(n).at(-1) || "",
    i = Array.from(a)[0] || "";
  return wD(
    `${n}${/[a-z0-9]/iu.test(r) && /[a-z0-9]/iu.test(i) ? " " : ""}${a}`,
  );
}
function gT(e, t) {
  const n = wD(e),
    a = wD(gc.speechEngineACommittedTranscript),
    r = wD(t);
  if (!r) return a;
  if (n) {
    const e = a && n.startsWith(a) ? a.length : a ? -1 : 0;
    if (e >= 0) {
      const t = n.slice(e),
        a = e + (t.match(/^\s*/u)?.[0]?.length || 0);
      if (n.slice(a).startsWith(r)) return wD(n.slice(0, a + r.length));
    }
  }
  return mT(a, r);
}
function pT(e) {
  return /[。！？!?…]$/.test(wD(e));
}
function fT(e, t, n, a = {}) {
  const r = wD(e);
  if (!r) return !1;
  cT();
  const i = Array.from(Xb(a.pendingText || r)).length,
    o = vf(),
    s = 1 === o.length ? o[0] : null,
    l = {
      ...n,
      isFinal: !0,
      transcriptReceivedAtMs: Date.now(),
      sourceType: "tab-capture",
      audioInputMode: "tab-capture",
      sttProvider: gc.activeSttProvider || ne,
      realtimeProcessedAudioRanges: o,
      ...(s
        ? {
            mediaTime: s.end,
            mediaTimeEnd: s.end,
            audioStartMediaTime: s.start,
            audioEndMediaTime: s.end,
            sourceMediaStartTime: s.start,
            sourceMediaEndTime: s.end,
            displayAfterMediaTimeStart: s.start,
            displayAfterMediaTimeEnd: s.end,
            timingSource: "source-media-range",
          }
        : {}),
    },
    c = Wb(l, r, a.pendingText || r),
    d = c.committedTiming || l;
  if (Pv(d)) return;
  (gc.activeSttProvider === ae && Cf(d),
    (gc.lastFinalText = r),
    WR(r),
    HT({ invalidate: !0 }),
    (gc.lastTranscriptTiming = d));
  const u = xp(d);
  gc.speechEngineACommittedTranscript = gT(t, r);
  const m = Date.now();
  gc.speechEngineALastCommitAt = m;
  const g = t ? $b(t) : "";
  return (
    (gc.speechEngineAPendingStartedAt = g ? m : 0),
    (gc.speechEngineAPendingUpdatedAt = g ? m : 0),
    (gc.speechEngineAPendingTiming = g ? c.remainingTiming || Gb(n) : null),
    (gc.speechEngineAPendingText = g),
    (gc.speechEngineAHypothesisHistory = g
      ? [{ text: g, observedAtMs: m }]
      : []),
    Nx(
      "stt.speechEngineA.commit",
      {
        reason: a.reason || "unspecified",
        textChars: Array.from(r).length,
        pendingChars: Array.from(wD(a.pendingText || r)).length,
        remainingChars: Array.from(g).length,
        pendingAgeMs: Math.max(0, Math.round(Number(a.pendingAgeMs) || 0)),
        timingSource: d.timingSource || "",
        audioStartMediaTime: aP(BC(d)),
        audioEndMediaTime: aP(UC(d)),
        audioRangeMs: Math.max(
          0,
          Math.round(1e3 * ((UC(d) ?? 0) - (BC(d) ?? 0))),
        ),
        sourceLang: gc.config.sourceLang || "auto",
        mappedLanguage: oD(gc.config.sourceLang),
        transcriptRevisionCount: gc.speechEngineATranscriptRevisionCount,
        timingSplitApplied: c.splitApplied,
        timingSplitRatio: c.splitApplied ? aP(c.splitRatio) : null,
        localAgreementChars: i,
        softEndpoint: !0 === a.softEndpoint,
        endpointKind: wD(a.endpointKind || ""),
      },
      { source: "offscreen", provider: gc.activeSttProvider || ne },
    ),
    bP({
      kind: "transcript",
      isFinal: !0,
      text: r,
      language: oD(gc.config.sourceLang),
      mediaTime: d.mediaTime,
      commitReason: a.reason || "unspecified",
      commitPendingAgeMs: Math.max(0, Math.round(Number(a.pendingAgeMs) || 0)),
      commitPendingChars: Array.from(wD(a.pendingText || r)).length,
      commitLocalAgreementChars: i,
      commitSoftEndpoint: !0 === a.softEndpoint,
      commitEndpointKind: wD(a.endpointKind || ""),
      sync: d,
    }),
    dw(r, d),
    u.length &&
      TS(
        Dp("realtime-final-stt-queued", _p(d)),
        d,
        "realtime-final-stt-queued",
      ).catch((e) => {
        Nx(
          "mse.audio_buffer.readiness_delivery_failed",
          {
            reason: e?.message || String(e),
            readinessReason: "realtime-final-stt-queued",
            finalSttAudioRanges: u.map((e) => ({
              start: aP(e.start),
              end: aP(e.end),
            })),
          },
          { source: "offscreen", level: "error" },
        );
      }),
    g && sT(),
    !0
  );
}
function hT(e) {
  let t;
  try {
    t = JSON.parse(PT(e));
  } catch {
    return void console.warn(
      "[offscreen] Non-JSON 即時翻譯實驗模式 message:",
      e,
    );
  }
  if ("ready" !== t.type)
    if ("setup_complete" !== t.type)
      if ("input_transcript" !== t.type) {
        if ("output_transcript" !== t.type)
          return "usage" === t.type
            ? (wT(t.usage), void NE())
            : void ("error" !== t.type
                ? "closed" === t.type && vP("closed", "即時翻譯實驗模式 已關閉")
                : yP(t.message || "即時翻譯實驗模式 error"));
        MT(t);
      } else ST(t);
    else vP("listening", "即時翻譯實驗模式 setup complete");
  else vP("listening", "即時翻譯實驗模式 ready");
}
function ST(e = {}) {
  const t = wD(e.text || "");
  if (!t || ED(t)) return;
  const n = vT(t, { committedText: gc.textEngineCLiveInputTranscript });
  n &&
    ((gc.textEngineCLiveInputTranscript = yT(
      gc.textEngineCLiveInputTranscript,
      n,
    )),
    (gc.textEngineCLiveLastInputDelta = n),
    (gc.textEngineCLiveLastInputAtMs = Date.now()));
}
function MT(e = {}) {
  const t = wD(e.text || "");
  if (!t || ED(t)) return;
  const n = vT(t, { committedText: gc.textEngineCLiveCommittedOutput });
  if (!n || ED(n)) return;
  const a = Date.now();
  ((gc.textEngineCLiveOutputTranscript = yT(
    gc.textEngineCLiveOutputTranscript,
    n,
  )),
    (gc.textEngineCLiveCommittedOutput = yT(
      gc.textEngineCLiveCommittedOutput,
      n,
    )));
  const r = wD(
    gc.textEngineCLiveLastInputDelta || gc.textEngineCLiveInputTranscript || "",
  );
  ((gc.textEngineCLiveLastInputDelta = ""),
    bT({ original: r, translation: n, receivedAtMs: a }));
}
function vT(e, { committedText: t = "" } = {}) {
  const n = wD(e),
    a = wD(t);
  if (!n) return "";
  if (!a) return n;
  const r = OR(n),
    i = OR(a);
  if (!r || !i) return n;
  if (i.endsWith(r)) return "";
  if (r.startsWith(i)) return wD(n.slice(a.length));
  const o = wD(qR(n, a).text);
  if (!o) return "";
  const s = OR(o);
  return s && i.includes(s) ? "" : o;
}
function yT(e, t) {
  return GR(wD(`${e || ""} ${t || ""}`), xn);
}
function bT({
  original: e = "",
  translation: t = "",
  receivedAtMs: n = Date.now(),
} = {}) {
  const a = wD(t);
  if (!a) return;
  const r = TT(n);
  if (Pv(r)) return;
  const i = rR(r, n, n);
  gc.lastPipelineLatency = iR(i);
  const o = wD(e),
    s = o || a,
    l = oR(
      [
        {
          id: `${Ie}-${Date.now()}`,
          order: 0,
          original: o,
          translation: a,
          segmentationMethod: "managed_live_translate",
          splitReason: "output_audio_transcription",
          isComplete: !0,
        },
      ],
      i,
      s,
    );
  ((gc.lastFinalText = s),
    WR(s),
    UR(s),
    (gc.lastTranscriptTiming = r),
    (gc.subtitlePipelineStats.translationResponses += 1),
    (gc.subtitlePipelineStats.emittedSegments += l.length),
    HT({ invalidate: !0 }),
    hx(l, { reason: "managed-live-translation", source: "processed-audio" }));
  for (const e of l)
    yx({
      original: e.original || o,
      translation: e.translation,
      language: gc.config.sourceLang || null,
      translatedTo: gc.config.targetLang || "zh",
      segmentationMethod: e.segmentationMethod || "managed_live_translate",
      splitReason: e.splitReason || null,
      order: e.order,
      mediaTime: e.mediaTime,
      displayAfterMediaTime: e.displayAfterMediaTime,
      audioStartMediaTime: e.audioStartMediaTime,
      audioEndMediaTime: e.audioEndMediaTime,
      requestId: `textEngineC-live-${n}`,
      latency: gc.lastPipelineLatency,
      createdAt: new Date(n).toISOString(),
    });
  bP({
    kind: "translation",
    isFinal: !0,
    original: o,
    translation: a,
    segments: l,
    segmentation: {
      method: "managed_live_translate",
      preference: "managed_live_translate",
      reason:
        "textEngineC Live output audio transcription is used as translated subtitle text.",
      targetLanguage: gc.config.targetLang || "zh",
      coverageAccepted: !0,
    },
    latencyMs: 0,
    pipelineLatencyMs: i.pipelineLatencyMs,
    latency: gc.lastPipelineLatency,
    mediaTime: i.mediaTime,
    displayAfterMediaTime: i.mediaTime,
    sync: i,
    provider: se,
    model: ge,
  });
}
function TT(e = Date.now()) {
  return {
    isFinal: !0,
    mediaTime: VA(e) ?? gc.captureMediaClock?.mediaTime ?? null,
    audioStartMs: null,
    audioEndMs: gc.captureMediaClock?.audioMs ?? gc.totalAudioMs,
    audioDurationMs: null,
    audioStartWallTimeMs: null,
    audioEndWallTimeMs: null,
    words: [],
    transcriptReceivedAtMs: e,
    sourceWallTimeMs: e,
    fallbackLagSeconds: 0,
    sourceMediaDelaySeconds: gc.sourceMediaTiming?.actualDelaySeconds ?? null,
    sttProvider: se,
  };
}
function wT(e = null) {
  const t = kT(e);
  t.totalAudioTokens &&
    ((gc.textEngineCLiveUsage.inputAudioTokens = Math.max(
      gc.textEngineCLiveUsage.inputAudioTokens,
      t.inputAudioTokens,
    )),
    (gc.textEngineCLiveUsage.outputAudioTokens = Math.max(
      gc.textEngineCLiveUsage.outputAudioTokens,
      t.outputAudioTokens,
    )),
    (gc.textEngineCLiveUsage.totalAudioTokens = Math.max(
      gc.textEngineCLiveUsage.totalAudioTokens,
      t.inputAudioTokens + t.outputAudioTokens,
    )),
    (gc.textEngineCLiveUsage.costUSD = Math.max(
      gc.textEngineCLiveUsage.costUSD,
      t.costUSD,
    )));
}
function kT(e = null) {
  if (!e || "object" != typeof e)
    return {
      inputAudioTokens: 0,
      outputAudioTokens: 0,
      totalAudioTokens: 0,
      costUSD: 0,
    };
  const t = CT(e.promptTokensDetails || e.prompt_tokens_details),
    n = CT(
      e.responseTokensDetails ||
        e.response_tokens_details ||
        e.candidatesTokensDetails ||
        e.candidates_tokens_details,
    ),
    a =
      AT(t, "AUDIO") ||
      eP(e, [
        "promptTokenCount",
        "prompt_token_count",
        "inputTokens",
        "input_tokens",
      ]),
    r =
      AT(n, "AUDIO") ||
      eP(e, [
        "responseTokenCount",
        "response_token_count",
        "candidatesTokenCount",
        "candidates_token_count",
        "outputTokens",
        "output_tokens",
      ]);
  return {
    inputAudioTokens: a,
    outputAudioTokens: r,
    totalAudioTokens: a + r,
    costUSD: RT(a, r),
  };
}
function CT(e) {
  return Array.isArray(e) ? e : [];
}
function AT(e, t) {
  const n = String(t || "").toUpperCase();
  let a = 0;
  for (const t of e)
    String(t?.modality || "").toUpperCase() === n &&
      (a += eP(t, ["tokenCount", "token_count"]));
  return a;
}
function RT(e, t) {
  return nP(
    Math.max(0, Number(e) || 0) * $n + Math.max(0, Number(t) || 0) * Vn,
  );
}
function xT() {
  (uT(), (gc.speechEngineALastCommitAt = 0));
}
function ET() {
  ((gc.textEngineCLiveInputTranscript = ""),
    (gc.textEngineCLiveOutputTranscript = ""),
    (gc.textEngineCLiveCommittedOutput = ""),
    (gc.textEngineCLiveLastInputDelta = ""),
    (gc.textEngineCLiveLastInputAtMs = 0),
    (gc.textEngineCLiveUsage = Vy()),
    (gc.lastHeartbeatTextEngineCLiveUsage = Vy()));
}
function PT(e) {
  if ("string" == typeof e) return e;
  if (e instanceof ArrayBuffer) return new TextDecoder().decode(e);
  if (e?.arrayBuffer) throw new Error("Unexpected Blob WebSocket message");
  return String(e || "");
}
function DT() {
  LT();
}
function IT(e, t = null) {
  if (!FT()) return;
  if (Sg() && gc.mseStartupInterimTranslationRequested) return;
  if (!_T(wD(e)) || gc.interimTranslationTimeout) return;
  const n = qT(Date.now() - gc.lastInterimTranslationAt);
  gc.interimTranslationTimeout = setTimeout(() => {
    ((gc.interimTranslationTimeout = null), LT(t));
  }, n);
}
function LT(e = null) {
  if (!FT()) return;
  if (Sg() && gc.mseStartupInterimTranslationRequested) return;
  const t = wD(gc.currentInterimText);
  if (!_T(t)) return;
  if (Date.now() - gc.lastInterimTranslationAt < vn) return void IT(t, e);
  ((gc.lastInterimText = t), (gc.lastInterimTranslationAt = Date.now()));
  const n =
    e ||
    gc.currentInterimTiming ||
    gc.lastTranscriptTiming ||
    QA(null, { isFinal: !1 });
  (Sg() && (gc.mseStartupInterimTranslationRequested = !0),
    wA(t, {
      isFinal: !1,
      timing: n,
      providerOverride: xw(n),
      interimVersion: gc.interimTranslationVersion,
    }));
}
function _T(e) {
  return Boolean(FT() && e && e !== gc.lastInterimText && e.length >= UT());
}
function BT() {
  return Boolean(Sg() && !gc.mseStartupInterimTranslationRequested);
}
function UT() {
  return BT() ? 8 : fn;
}
function qT(e = 0) {
  if (BT()) return 0;
  const t = Math.max(0, Number(e) || 0);
  return t >= vn ? Sn : Math.max(Sn, vn - t);
}
function FT() {
  return !(
    fA(gc.config?.provider) ||
    !1 === gc.config?.interimTranslationsEnabled ||
    !1 === gc.config?.syncInterimTranslationsEnabled ||
    (gc.activeSttProvider === Z && gc.realtimeFinalTranscriptSeen)
  );
}
function OT() {
  return FT();
}
function NT() {
  (clearTimeout(gc.interimTranslationTimeout),
    (gc.interimTranslationTimeout = null));
}
function HT(e = {}) {
  (NT(),
    (gc.currentInterimText = ""),
    (gc.currentInterimTiming = null),
    (gc.lastInterimText = ""),
    (gc.pendingInterimTranslation = null),
    e.invalidate && (gc.interimTranslationVersion += 1));
}
function GT(e = null) {
  const t = gc.config || {};
  if (fA(t.provider)) return !1;
  if (
    t.sttProvider === ne &&
    Boolean(
      t.singleTabMediaSync ||
        t.mseAudioBufferSingleTab ||
        "mse-audio-buffer" === t.captionMode,
    )
  )
    return !1;
  if (!t.syncEnabled) return !1;
  const n = VT(e),
    a = WT();
  return (
    !(!1 === gc.config?.finalBatchingEnabled && !n && !a) &&
    (n || a || bk() > 0 || wk() > 5)
  );
}
function WT() {
  return $T();
}
function $T() {
  const e = gc.config || {},
    t = LP(e.sttProvider);
  return (
    (t === ne || t === ae) &&
    !!UE(e.provider) &&
    !!e.syncEnabled &&
    !e.singleTabMediaSync &&
    !e.mseAudioBufferSingleTab &&
    "mse-audio-buffer" !== e.captionMode &&
    wk() >= 5
  );
}
function VT(e = null) {
  return (
    !!gc.config?.syncEnabled &&
    "instant-overlay" !== gc.config?.captionMode &&
    Boolean(zp(e) || zm())
  );
}
function jT(e = null) {
  if (!e || "object" != typeof e) return !1;
  const t = rP(e.unitsPerLine);
  if (null === t || t <= 0) return !1;
  const n = gc.subtitleDisplayMetrics,
    a = {
      unitsPerLine: dP(Math.round(t), 6, 200),
      narrowCharWeight: dP(rP(e.narrowCharWeight) ?? za, 0.3, 1),
      rowsPerSegment: dP(Math.round(rP(e.rowsPerSegment) ?? 2), 1, 4),
      originalFontScale: dP(rP(e.originalFontScale) ?? Ja, 0.3, 1),
      widthPx: rP(e.widthPx),
      fontSizePx: rP(e.fontSizePx),
      receivedAtMs: Date.now(),
    };
  return (
    (gc.subtitleDisplayMetrics = a),
    (!n ||
      Math.abs(n.unitsPerLine - a.unitsPerLine) >= 2 ||
      n.rowsPerSegment !== a.rowsPerSegment ||
      n.originalFontScale !== a.originalFontScale) &&
      Nx(
        "subtitle.display_metrics",
        {
          unitsPerLine: a.unitsPerLine,
          narrowCharWeight: a.narrowCharWeight,
          rowsPerSegment: a.rowsPerSegment,
          originalFontScale: a.originalFontScale,
          widthPx: a.widthPx,
          fontSizePx: a.fontSizePx,
          originalBudgetUnits: JT("original"),
          translationBudgetUnits: JT("translation"),
        },
        { source: "offscreen" },
      ),
    !0
  );
}
function KT(e) {
  return /[\u1100-\u115F\u2E80-\u303E\u3041-\u33FF\u3400-\u4DBF\u4E00-\u9FFF\uA000-\uA4CF\uAC00-\uD7A3\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFF60\uFFE0-\uFFE6]/.test(
    e,
  );
}
function zT() {
  return dP(rP(gc.subtitleDisplayMetrics?.narrowCharWeight) ?? za, 0.3, 1);
}
function QT(e) {
  const t = zT();
  let n = 0;
  for (const a of Array.from(wD(e))) n += KT(a) ? 1 : t;
  return n;
}
function JT(e = "translation") {
  const t = gc.subtitleDisplayMetrics;
  let n = rP(t?.unitsPerLine) ?? Ka;
  const a = rP(t?.rowsPerSegment) ?? 2;
  return (
    "original" === e && (n /= dP(rP(t?.originalFontScale) ?? Ja, 0.3, 1)),
    dP(Math.round(n * a), Xa, Za)
  );
}
function XT(e, t) {
  const n = JT(e);
  let a = zT();
  const r = wD(t);
  return (
    r && Array.from(r).length >= 4
      ? (a = QT(r) / Array.from(r).length)
      : ZT(t) && (a = 1),
    dP(Math.round(n / Math.max(0.3, a)), 16, 400)
  );
}
function ZT(e) {
  return /^(zh|zho|yue|cmn|ja|jpn|ko|kor)/i.test(String(e || "").trim());
}
function YT(e) {
  const t = [];
  for (let n = 0; n < e.length - 1; n += 1) {
    const a = e[n];
    let r = 0;
    if (
      (/[。．！？!?…;；]/.test(a)
        ? (r = 3)
        : /[，、,：:]/.test(a)
          ? (r = 2)
          : (/\s/.test(e[n + 1]) || /\s/.test(a)) && (r = 1),
      !r)
    )
      continue;
    let i = n;
    for (; i < e.length - 2 && /[」』）)\]}\u0022\u0027”’…]/.test(e[i + 1]); )
      i += 1;
    t.push({ cutAfterIndex: i, priority: r });
  }
  return t;
}
function ew(e, t, n = {}) {
  const a = wD(e);
  if (!a) return [];
  const r = Array.from(a),
    i = zT(),
    o = new Array(r.length);
  let s = 0;
  for (let e = 0; e < r.length; e += 1) ((s += KT(r[e]) ? 1 : i), (o[e] = s));
  const l = s,
    c = iP(n.pieceCount),
    d = Math.max(Xa, rP(t) || Za),
    u = dP(c ?? Math.ceil(l / d), 1, Ya);
  if (u <= 1) return [a];
  const m = YT(r),
    g = l / u,
    p = Math.max(3, 0.45 * g),
    f = [];
  let h = -1,
    S = 0;
  for (let e = 1; e < u; e += 1) {
    const t = e * g;
    let n = null;
    for (const e of m) {
      if (e.cutAfterIndex <= h || e.cutAfterIndex >= r.length - 1) continue;
      const a = o[e.cutAfterIndex];
      if (a - S < 4) continue;
      const i = Math.abs(a - t);
      i > p ||
        ((!n ||
          e.priority > n.priority ||
          (e.priority === n.priority && i < n.distance)) &&
          (n = {
            cutAfterIndex: e.cutAfterIndex,
            priority: e.priority,
            distance: i,
          }));
    }
    let a = n ? n.cutAfterIndex : null;
    if (null === a)
      for (let e = h + 1; e < r.length - 1; e += 1)
        if (o[e] >= t) {
          a = e;
          break;
        }
    null === a ||
      a <= h ||
      a >= r.length - 1 ||
      (f.push(a), (h = a), (S = o[a]));
  }
  if (!f.length) return [a];
  const M = [];
  let v = 0;
  for (const e of f) (M.push(r.slice(v, e + 1).join("")), (v = e + 1));
  return (M.push(r.slice(v).join("")), M.map(wD).filter(Boolean));
}
function tw(e, t) {
  const n = wD(e),
    a = wD(t);
  if (!n) return a;
  if (!a) return n;
  const r = Array.from(n).pop(),
    i = Array.from(a)[0];
  return KT(r) && KT(i) ? `${n}${a}` : `${n} ${a}`;
}
function nw(e, t, n) {
  if (!Array.isArray(e) || !e.length) return [wD(n)];
  if (e.length <= t) return e;
  const a = e.slice(0, t - 1);
  let r = "";
  for (const n of e.slice(t - 1)) r = tw(r, n);
  return [...a, r];
}
function aw(e, t = null) {
  const n = wD(e);
  if (!n) return [];
  const a = JT("original"),
    r = QT(n);
  if (r <= a) return [{ text: n, timing: t }];
  const i = ew(n, a);
  if (i.length <= 1) return [{ text: n, timing: t }];
  const o = rw(i, t);
  return (
    Nx(
      "subtitle.display_split.final_transcript",
      {
        pieces: i.length,
        textChars: Array.from(n).length,
        textUnits: Math.round(r),
        budgetUnits: a,
        pieceChars: i.map((e) => Array.from(e).length),
        timingSources: o.map((e) => e.timingSource),
      },
      { source: "offscreen" },
    ),
    o
  );
}
function rw(e, t = null) {
  const n = Array.isArray(t?.words) ? t.words : [],
    a = n.length >= e.length ? yR(n) : null,
    r = BC(t),
    i = UC(t),
    o = null !== r && null !== i && i > r,
    s = e.reduce((e, t) => e + QT(t), 0) || e.length;
  let l = 0,
    c = 0,
    d = null;
  return e.map((n, u) => {
    const m = c / s;
    c += QT(n);
    const g = u === e.length - 1 ? 1 : c / s;
    let p = null,
      f = null,
      h = "";
    if (a) {
      const e = bR(a, n, l);
      e &&
        ((p = e.mediaStartTime),
        (f = e.mediaEndTime),
        (l = Math.max(l, e.canonicalEnd)),
        (h = "stt-word-timing"));
    }
    return (
      (null === p || null === f || f <= p) &&
        o &&
        ((p = r + m * (i - r)),
        (f = r + g * (i - r)),
        (h = "proportional-estimate")),
      null !== d && null !== p && p < d && (p = d),
      null !== p && null !== f && f < p && (f = p),
      null !== f && (d = f),
      t && null !== p && null !== f
        ? {
            text: n,
            timing: iw(t, p, f, m, g, {
              includeWordTiming: "stt-word-timing" === h,
            }),
            timingSource: h,
          }
        : {
            text: n,
            timing: t ? { ...t } : null,
            timingSource: h || "parent-timing",
          }
    );
  });
}
function iw(e, t, n, a, r, i = {}) {
  const o =
      i.includeWordTiming && Array.isArray(e.words)
        ? e.words
            .map((e) => {
              const a = rP(e.mediaStartTime),
                r = rP(e.mediaEndTime);
              if (null === a || null === r) return null;
              const i = (a + r) / 2;
              return i < t - 0.05 || i > n + 0.05
                ? null
                : {
                    ...e,
                    mediaStartTime: aP(Math.max(t, a)),
                    mediaEndTime: aP(Math.min(n, r)),
                  };
            })
            .filter((e) => {
              if (!e) return !1;
              const t = rP(e.mediaStartTime),
                n = rP(e.mediaEndTime);
              return null !== t && null !== n && n > t;
            })
        : [],
    s = rP(e.audioStartMs),
    l = rP(e.audioEndMs),
    c = null !== s && null !== l && l > s,
    d = rP(e.audioDurationMs),
    u = Array.isArray(e.speechIntervals)
      ? e.speechIntervals
          .map((e) => {
            const a = rP(e?.start),
              r = rP(e?.end);
            if (null === a || null === r) return null;
            const i = Math.max(a, t),
              o = Math.min(r, n);
            return o <= i ? null : { ...e, start: i, end: o };
          })
          .filter(Boolean)
      : e.speechIntervals;
  return {
    ...e,
    mediaTime: aP(n),
    mediaTimeEnd: aP(n),
    mediaStartTime: aP(t),
    audioStartMediaTime: aP(t),
    audioEndMediaTime: aP(n),
    sourceMediaStartTime: aP(t),
    sourceMediaEndTime: aP(n),
    displayAfterMediaTimeStart: aP(t),
    displayAfterMediaTimeEnd: aP(n),
    audioStartMs: c ? Math.round(s + a * (l - s)) : s,
    audioEndMs: c ? Math.round(s + r * (l - s)) : l,
    audioDurationMs:
      null !== d ? Math.max(0, Math.round(d * Math.max(0, r - a))) : d,
    words: o,
    speechIntervals: u,
    displaySplitPiece: !0,
  };
}
function ow(e, t = {}) {
  if (!Array.isArray(e) || !e.length) return e;
  const n = zp(t.timing),
    a = JT("original"),
    r = JT("translation"),
    i = n ? Math.min(a, tr) : a,
    o = n ? Math.min(r, nr) : r,
    s = [],
    l = [];
  for (const t of e) {
    const e = QT(t.original),
      a = QT(t.translation);
    if (e <= i && a <= o) {
      s.push(t);
      continue;
    }
    const r = dP(Math.max(Math.ceil(e / i), Math.ceil(a / o)), 2, Ya),
      c = ew(t.original, i, { pieceCount: r }),
      d = ew(t.translation, o, { pieceCount: r }),
      u = Math.min(c.length, d.length);
    if (u <= 1) {
      s.push(t);
      continue;
    }
    const m = nw(c, u, t.original),
      g = nw(d, u, t.translation);
    for (let e = 0; e < u; e += 1)
      s.push({
        ...t,
        id: `${t.id}-d${e + 1}`,
        original: m[e],
        translation: g[e],
        segmentationMethod: n
          ? "mse-readability-split"
          : "display-budget-split",
        splitReason: n
          ? "mse-subtitle-reading-rhythm"
          : "subtitle-display-char-budget",
        isComplete: e < u - 1 || t.isComplete,
      });
    l.push({
      id: t.id,
      pieces: u,
      originalUnits: Math.round(e),
      translationUnits: Math.round(a),
    });
  }
  return (
    l.length &&
      Nx(
        "subtitle.display_split.segments",
        {
          splits: l,
          originalBudgetUnits: i,
          translationBudgetUnits: o,
          measuredOriginalBudgetUnits: a,
          measuredTranslationBudgetUnits: r,
          mseReadabilityCap: n,
          segmentsBefore: e.length,
          segmentsAfter: s.length,
        },
        { source: "offscreen" },
      ),
    s.map((e, t) => ({ ...e, order: t }))
  );
}
function sw(e = [], t = null) {
  const n = Array.isArray(e) ? e : [],
    a = Array.from(
      new Set(
        (Array.isArray(t?.mseCoverageClaimIds)
          ? t.mseCoverageClaimIds
          : []
        ).filter(Boolean),
      ),
    );
  if (!n.length || !a.length || !zp(t)) return n;
  gc.mseTranslationGroupSequence =
    Math.max(0, Math.round(Number(gc.mseTranslationGroupSequence) || 0)) + 1;
  const r = t?.msePartialSpeechRetry ? "speech-retry" : "primary",
    i = [
      "mse-translation",
      gc.timelineRevision,
      t?.sttSegmentId ?? "segment",
      gc.mseTranslationGroupSequence,
    ].join(":"),
    o = Tu({
      claimIds: a,
      groupId: i,
      kind: r,
      pieceCount: n.length,
      sttSegmentId: t?.sttSegmentId ?? null,
    });
  return o.length
    ? n.map((e, t) => ({
        ...e,
        timing: e?.timing
          ? {
              ...e.timing,
              mseTranslationPieces: [
                {
                  groupId: i,
                  pieceIndex: t,
                  pieceCount: n.length,
                  kind: r,
                  claimIds: o,
                },
              ],
            }
          : e?.timing,
      }))
    : n;
}
function lw(e, t = null) {
  const n = wD(e);
  if (!n) return [];
  const a = BC(t),
    r = UC(t);
  return null !== a && null !== r && r > a + 0.05
    ? gw(n, t).flatMap(mw).filter(Boolean)
    : [{ text: n, timing: t }];
}
function cw(e = null) {
  if (!zm()) return !1;
  const t = Rp(e),
    n = Array.from(
      new Set(
        (Array.isArray(e?.mseCoverageClaimIds)
          ? e.mseCoverageClaimIds
          : []
        ).filter(Boolean),
      ),
    );
  if (!n.length && !t.length) return !1;
  const a = Pu(n, "subtitle-ready", {
      segmentId: e?.sttSegmentId ?? null,
      outcome: "ready-timeline-already-covered",
    }),
    r =
      xu(n) ||
      (t.length
        ? {
            start: Math.min(...t.map((e) => e.start)),
            end: Math.max(...t.map((e) => e.end)),
          }
        : null),
    i = Bp(e, r, "ready-timeline-already-covered"),
    o = Dp("ready-timeline-already-covered", _p(e));
  return (
    Nx(
      "mse.coverage.ready_timeline_reused",
      {
        claimIds: n,
        updated: a,
        realtimeProcessedAudioRanges: t.map((e) => ({
          start: aP(e.start),
          end: aP(e.end),
        })),
        segmentId: e?.sttSegmentId ?? null,
        mediaStartTime: aP(r?.start),
        mediaEndTime: aP(r?.end),
        initialBatchCatchupReady: i,
        batchHandoffDeferred: $u(),
        startupReleaseReady: Boolean(o.startupReleaseReady),
        startupReleaseReadyLeadSeconds: aP(o.startupReleaseReadyLeadSeconds),
      },
      { source: "offscreen" },
    ),
    TS(o, e, "ready-timeline-already-covered").catch((e) => {
      Nx(
        "mse.audio_buffer.readiness_delivery_failed",
        {
          reason: e?.message || String(e),
          readinessReason: "ready-timeline-already-covered",
          mediaStartTime: aP(r?.start),
          mediaEndTime: aP(r?.end),
        },
        { source: "offscreen", level: "error" },
      );
    }),
    t.length > 0 || a > 0 || Ru(n)
  );
}
function dw(e, t = null) {
  const n = wD(e);
  if (!n) return;
  const a = sw(lw(n, t), t);
  if (!a.length)
    return (
      cw(t),
      void ah(t, "ignored", {
        reason: "ready-timeline-already-covered",
        done: !0,
        active: !1,
      })
    );
  if (a.length > 1) {
    let e = !1;
    for (const t of a) e = Sw(t.text, t.timing, { deferFlush: !0 }) || e;
    e && Mw();
  } else Sw(a[0].text, a[0].timing);
}
function uw(e, t) {
  const n = xv(t),
    a = sP(t.map((e) => rP(e?.mediaStartTime))),
    r = lP(t.map((e) => rP(e?.mediaEndTime)));
  return !n || null === a || null === r || r <= a
    ? null
    : {
        ...e,
        text: n,
        timing: {
          ...e.timing,
          mediaTime: aP(r),
          mediaTimeEnd: aP(r),
          mediaStartTime: aP(a),
          audioStartMediaTime: aP(a),
          audioEndMediaTime: aP(r),
          sourceMediaStartTime: aP(a),
          sourceMediaEndTime: aP(r),
          displayAfterMediaTimeStart: aP(a),
          displayAfterMediaTimeEnd: aP(r),
          audioDurationMs: Math.max(0, Math.round(1e3 * (r - a))),
          words: t,
          timelineCoverageTrimmed: !0,
        },
      };
}
function mw(e = null) {
  if (!e || !zm()) return e ? [e] : [];
  const t = e.timing || null,
    n = BC(t),
    a = UC(t);
  if (null === n || null === a || a <= n) return [e];
  const r = Op(gc.mseStartupBoost?.readySubtitleRanges),
    i = (
      Array.isArray(gc.translationTimelineReservations)
        ? gc.translationTimelineReservations
        : []
    )
      .map((e) => ({ start: rP(e?.start), end: rP(e?.end) }))
      .filter((e) => null !== e.start && null !== e.end && e.end > e.start),
    o = r.concat(i),
    s = fm(o, n, a),
    l = s / Math.max(0.001, a - n);
  if (a - n <= zl && l < Kl) return [e];
  const c = $p(o, zl),
    d = [];
  let u = n;
  for (const e of c)
    if (
      !(e.end <= u + 0.001 || e.start >= a - 0.001) &&
      (e.start > u + zl && d.push({ start: u, end: Math.min(a, e.start) }),
      (u = Math.max(u, Math.min(a, e.end))),
      u >= a - 0.001)
    )
      break;
  if ((u < a - zl && d.push({ start: u, end: a }), !d.length))
    return (
      Nx(
        "stt.transcript.timeline_coverage_drop",
        {
          mediaStartTime: aP(n),
          mediaEndTime: aP(a),
          textChars: Array.from(wD(e.text || "")).length,
          coveredSeconds: aP(s),
          coverageRatio: aP(l),
          occupiedRangeCount: o.length,
        },
        { source: "offscreen" },
      ),
      []
    );
  if (1 === d.length && d[0].start <= n + 0.05 && d[0].end >= a - 0.05)
    return [e];
  const m = Array.isArray(t?.words) ? t.words : [],
    g = d
      .map((t) => {
        const n = m.filter((e) => {
          const n = rP(e?.mediaStartTime),
            a = rP(e?.mediaEndTime);
          if (null === n || null === a || a <= n) return !1;
          const r = (n + a) / 2;
          return r > t.start + 0.01 && r < t.end - 0.01;
        });
        return uw(e, n);
      })
      .filter(Boolean);
  return g.length
    ? (Nx(
        "stt.transcript.timeline_uncovered_pieces",
        {
          mediaStartTime: aP(n),
          mediaEndTime: aP(a),
          uncoveredRanges: d.map((e) => ({
            start: aP(e.start),
            end: aP(e.end),
          })),
          pieces: g.map((e) => ({
            mediaStartTime: aP(BC(e.timing)),
            mediaEndTime: aP(UC(e.timing)),
            textChars: Array.from(e.text).length,
          })),
        },
        { source: "offscreen" },
      ),
      g)
    : (Nx(
        "stt.transcript.timeline_prefix_trim_skipped",
        {
          reason: "missing-word-timestamps",
          mediaStartTime: aP(n),
          mediaEndTime: aP(a),
          uncoveredRanges: d.map((e) => ({
            start: aP(e.start),
            end: aP(e.end),
          })),
          wordCount: m.length,
          textChars: Array.from(wD(e.text || "")).length,
        },
        { source: "offscreen", level: "warn" },
      ),
      [e]);
}
function gw(e, t = null) {
  const n = wD(e),
    a = Array.isArray(t?.words)
      ? t.words.filter(
          (e) => null !== rP(e?.mediaStartTime) && null !== rP(e?.mediaEndTime),
        )
      : [];
  if (!n || a.length < 2) return [{ text: n, timing: t }];
  const r = [[]];
  for (const e of a) {
    const t = r[r.length - 1],
      n = t[t.length - 1] || null,
      a = rP(n?.mediaEndTime),
      i = rP(e.mediaStartTime);
    (null !== a && null !== i && (i < a - 0.25 || i - a > 3) && r.push([]),
      r[r.length - 1].push(e));
  }
  if (r.length <= 1) return [{ text: n, timing: t }];
  const i = r
    .map((e) => {
      const n = xv(e),
        a = sP(e.map((e) => rP(e.mediaStartTime))),
        r = lP(e.map((e) => rP(e.mediaEndTime)));
      return !n || null === a || null === r || r <= a
        ? null
        : {
            text: n,
            timing: {
              ...t,
              mediaTime: aP(r),
              mediaTimeEnd: aP(r),
              mediaStartTime: aP(a),
              audioStartMediaTime: aP(a),
              audioEndMediaTime: aP(r),
              sourceMediaStartTime: aP(a),
              sourceMediaEndTime: aP(r),
              displayAfterMediaTimeStart: aP(a),
              displayAfterMediaTimeEnd: aP(r),
              audioDurationMs: Math.max(0, Math.round(1e3 * (r - a))),
              speechIntervals: [{ start: aP(a), end: aP(r) }],
              words: e,
              mediaTimingDiscontinuitySplit: !0,
            },
          };
    })
    .filter(Boolean);
  return i.length <= 1
    ? [{ text: n, timing: t }]
    : (Nx(
        "stt.transcript.media_discontinuity_split",
        {
          inputTextChars: Array.from(n).length,
          inputWordCount: a.length,
          pieces: i.map((e) => ({
            mediaStartTime: aP(BC(e.timing)),
            mediaEndTime: aP(UC(e.timing)),
            textChars: Array.from(e.text).length,
            wordCount: e.timing.words.length,
          })),
        },
        { source: "offscreen", level: "warn" },
      ),
      i);
}
function pw(e = null) {
  return mw(e)[0] || null;
}
function fw(e = null) {
  if (!e || !zm()) return e;
  if (e.translationTimelineReservationId) return e;
  const t = BC(e),
    n = UC(e);
  if (null === t || null === n || n <= t) return e;
  gc.translationTimelineReservationSequence =
    Math.max(
      0,
      Math.round(Number(gc.translationTimelineReservationSequence) || 0),
    ) + 1;
  const a = `translation:${gc.timelineRevision}:${gc.translationTimelineReservationSequence}`;
  return (
    gc.translationTimelineReservations.push({
      id: a,
      start: t,
      end: n,
      timelineRevision: gc.timelineRevision,
      createdAtMs: Date.now(),
    }),
    gc.translationTimelineReservations.length > Ql &&
      gc.translationTimelineReservations.splice(
        0,
        gc.translationTimelineReservations.length - Ql,
      ),
    Nx(
      "llm.translation.timeline_reserved",
      {
        reservationId: a,
        mediaStartTime: aP(t),
        mediaEndTime: aP(n),
        timelineRevision: gc.timelineRevision,
      },
      { source: "offscreen" },
    ),
    {
      ...e,
      translationTimelineReservationId: a,
      translationTimelineReservationIds: [a],
    }
  );
}
function hw(e = null, t = "translation-ready") {
  const n = Array.from(
    new Set(
      [
        ...(Array.isArray(e?.translationTimelineReservationIds)
          ? e.translationTimelineReservationIds
          : []),
        e?.translationTimelineReservationId,
      ]
        .map((e) => wD(e || ""))
        .filter(Boolean),
    ),
  );
  if (!n.length || !Array.isArray(gc.translationTimelineReservations))
    return !1;
  let a = 0;
  for (const e of n) {
    const n = gc.translationTimelineReservations.findIndex((t) => t?.id === e);
    if (n < 0) continue;
    const [r] = gc.translationTimelineReservations.splice(n, 1);
    ((a += 1),
      Nx(
        "llm.translation.timeline_resolved",
        {
          reservationId: e,
          reason: t,
          mediaStartTime: aP(r.start),
          mediaEndTime: aP(r.end),
          timelineRevision: r.timelineRevision,
        },
        { source: "offscreen" },
      ));
  }
  return a > 0;
}
function Sw(e, t = null, n = {}) {
  const a = wD(e);
  if (!a) return !1;
  const r = nE();
  if (
    sE(r, "queue-final-translation", {
      mediaStartTime: aP(BC(t)),
      mediaEndTime: aP(UC(t)),
      log: !1,
    })
  )
    return !1;
  ah(t, "translation-queued");
  const i = Em([], t);
  if (i.ignored)
    return (
      Nx(
        "llm.final_batch.drop_ready_covered",
        {
          reason: i.reason,
          mediaStartTime: aP(i.range?.start),
          mediaEndTime: aP(i.range?.end),
          coverageRatio: aP(i.coverageRatio),
          coveredSeconds: aP(i.coveredSeconds),
          chars: Array.from(a).length,
        },
        { source: "offscreen", level: "warn" },
      ),
      ah(t, "ignored", { reason: i.reason, done: !0, active: !1 }),
      !1
    );
  const o = xw((t = fw(t)));
  if (!GT(t))
    return (
      wA(a, { isFinal: !0, timing: t, providerOverride: o, requestContext: r }),
      !1
    );
  (gc.finalTranslationBatch.push({
    text: a,
    timing: t,
    providerOverride: o,
    requestContext: r,
    queuedAtMs: Date.now(),
    shortFragmentOnly: xD(a),
  }),
    (gc.finalBatchStats.enabled = !0),
    (gc.finalBatchStats.queuedSegments += 1),
    (gc.finalBatchStats.estimatedCallsWithoutBatch += 1));
  const s = gc.finalTranslationBatch.length;
  return (
    Array.from(gc.finalTranslationBatch.map((e) => e.text).join(" ")).length,
    vP("batching", `累積翻譯批次 ${s} 段`),
    NE(),
    n.deferFlush || Mw(),
    !0
  );
}
function Mw() {
  return (
    !!gc.finalTranslationBatch.length &&
    ($w(),
    gc.finalTranslationBatch.every((e) => !0 === e?.shortFragmentOnly)
      ? (Bw(), !1)
      : Bk({
            segmentCount: gc.finalTranslationBatch.length,
            totalChars: Array.from(
              gc.finalTranslationBatch.map((e) => e.text).join(" "),
            ).length,
          })
        ? (Nw({ force: !0 }), !0)
        : (Bw(), !1))
  );
}
function vw(e = {}) {
  if (
    "sql-wallet-v1" === e.walletBillingProtocol &&
    Object.hasOwn(e, "walletLlmFallbackRoute")
  ) {
    const t = e.walletLlmFallbackRoute;
    return qP(t ? _e[t] || t : e.provider);
  }
  return qP(e.mseStartupBoostProvider || Dl);
}
function yw() {
  return vw(gc.config);
}
function bw() {
  const e = rP(gc.config?.mseLowLeadFastLlmEnterSeconds);
  return dP(null !== e ? e : Il, 0, Al);
}
function Tw() {
  const e = rP(gc.config?.mseLowLeadFastLlmExitSeconds);
  return dP(null !== e ? e : Ll, bw() + 2, Al);
}
function ww() {
  if (!zm()) return !1;
  if (NP()) return !1;
  if ("off" === lD(gc.config?.llmFallbackMode)) return !1;
  const e = gc.mseStartupBoost || {};
  return (
    !(e.enabled && e.active && !e.switched) && qP(gc.config?.provider) !== yw()
  );
}
function kw(e = "mse-audio", t = null) {
  const n = gc.lowLeadFastLlm || (gc.lowLeadFastLlm = Iy());
  if (!ww())
    return (
      n.active &&
        ((n.active = !1),
        (n.exitedAtMs = Date.now()),
        Nx(
          "llm.low_lead_fast.exit",
          { reason: `disabled:${e}`, leadSeconds: n.lastLeadSeconds },
          { source: "offscreen" },
        )),
      (n.armed = !1),
      (n.armedAtMs = 0),
      n
    );
  const a = Date.now(),
    r = rP(t) ?? Nk(a) ?? zA(a);
  if (null === r) return n;
  const i = Lp(r);
  n.lastLeadSeconds = aP(i);
  const o = bw(),
    s = Tw();
  if (!n.armed) {
    const t = Boolean(
      ou({ readyOnly: !0 }).length ||
        Op(gc.mseStartupBoost?.readySubtitleRanges).length ||
        null !== rP(gc.mseStartupBoost?.readySubtitleEndMediaTime),
    );
    if (i < s && !t) return n;
    ((n.armed = !0),
      (n.armedAtMs = a),
      Nx(
        "llm.low_lead_fast.armed",
        {
          reason: e,
          leadSeconds: n.lastLeadSeconds,
          exitSeconds: s,
          firstReadyRecovery: i < s,
          provider: qP(gc.config?.provider),
        },
        { source: "offscreen" },
      ));
  }
  return (
    n.active
      ? i >= s &&
        ((n.active = !1),
        (n.exitedAtMs = a),
        Nx(
          "llm.low_lead_fast.exit",
          {
            reason: e,
            leadSeconds: n.lastLeadSeconds,
            exitSeconds: s,
            provider: qP(gc.config?.provider),
          },
          { source: "offscreen" },
        ))
      : i < o &&
        ((n.active = !0),
        (n.enteredAtMs = a),
        Nx(
          "llm.low_lead_fast.enter",
          {
            reason: e,
            leadSeconds: n.lastLeadSeconds,
            enterSeconds: o,
            fastProvider: yw(),
          },
          { source: "offscreen" },
        )),
    n
  );
}
function Cw() {
  return Boolean(gc.lowLeadFastLlm?.armed && gc.lowLeadFastLlm?.active) && ww();
}
function Aw(e = null) {
  const t = gc.mseStartupBoost || {};
  if (
    !Sg() ||
    !zp(e) ||
    !0 !== t.initialBatchCatchupStarted ||
    !0 === t.initialBatchCatchupFirstReady
  )
    return !1;
  const n = _p(e),
    a = BC(e),
    r = UC(e);
  if (null === n || null === r) return !1;
  const i = Math.max(0, r - n);
  if (i + Jr < 7) return !1;
  const o = [gc.timelineRevision, e?.sttSegmentId ?? "", aP(a), aP(r)].join(
    ":",
  );
  return t.initialBatchCatchupFastLlmClaimKey
    ? t.initialBatchCatchupFastLlmClaimKey === o
    : ((t.initialBatchCatchupFastLlmClaimKey = o),
      (t.initialBatchCatchupFastLlmClaimedAtMs = Date.now()),
      Nx(
        "mse.startup_boost.batch_catchup_fast_llm_claimed",
        {
          claimKey: o,
          segmentId: e?.sttSegmentId ?? null,
          playbackTime: aP(n),
          mediaStartTime: aP(a),
          mediaEndTime: aP(r),
          leadSeconds: aP(i),
          provider: qP(t.fastProvider || Dl),
        },
        { source: "offscreen" },
      ),
      !0);
}
function Rw(e = null) {
  return Boolean(
    !0 === e?.sttDeadlineHedgeRescue &&
      "fallback" === e?.sttDeadlineHedgeWinnerRole,
  );
}
function xw(e = null) {
  if (Rw(e) && "off" !== lD(gc.config?.llmFallbackMode)) return yw();
  if (Sg() && (!zp(e) || Aw(e)))
    return qP(gc.mseStartupBoost?.fastProvider || Dl);
  if (Mg() && zp(e)) return qP(gc.mseStartupBoost?.fastProvider || Dl);
  if (rk(e)) {
    const t = yw();
    return (
      Nx(
        "llm.startup_deadline_fast_provider",
        {
          provider: qP(gc.config?.provider),
          fastProvider: t,
          remainingMs: ak(),
          estimatedPrimaryLatencyMs: Math.round(qC()),
          reserveMs: At,
          mediaStartTime: aP(BC(e)),
          mediaEndTime: aP(UC(e)),
        },
        { source: "offscreen", provider: t, level: "warn" },
      ),
      t
    );
  }
  return nk(e)
    ? yw()
    : (kw("provider-decision"),
      zp(e) && Cw() && !Yw(e) ? yw() : qP(gc.config?.provider));
}
function Ew(e = null) {
  const t = String(e?.message || e || "");
  return (
    !!t &&
    (/live-caption-translate failed:\s*(408|429|5\d\d)\b/i.test(t) ||
      /timeout|timed\s*out|network|failed\s*to\s*fetch|empty translation response|upstream request failed|upstream provider error|insufficient_user_quota|(?:額度|额度)不足|model_not_found|no available|unavailable|overloaded|rate.?limit|distributor|渠道|truncated response|finish_reason=(?:MAX_TOKENS|MAX_OUTPUT_TOKENS|TOKEN_LIMIT|LENGTH)/i.test(
        t,
      ))
  );
}
function Pw(e, t = null, n = null, a = Date.now()) {
  const r = qP(gc.config?.provider || "lt-e");
  if (!r || e !== r) return !1;
  if (!Yw(t, a)) return !1;
  const i = String(n?.message || n || "");
  return (
    !/upstream provider error|upstream request failed|\b(?:401|403|404|429)\b|model_not_found|unavailable|overloaded|rate.?limit|quota/i.test(
      i,
    ) &&
    /timeout|timed\s*out|truncated response|finish_reason=(?:MAX_TOKENS|MAX_OUTPUT_TOKENS|TOKEN_LIMIT|LENGTH)/i.test(
      i,
    )
  );
}
function Dw({
  timing: e = null,
  providerOverride: t = null,
  error: n = null,
  retryCount: a = 0,
  translationBudget: r = null,
} = {}) {
  const i = qP(t || gc.config?.provider || "lt-e");
  if (Hh(n)) return i;
  if (!zp(e)) return i;
  if (!ww()) return i;
  if (!Ew(n)) return i;
  const o = yw();
  if (!o) return i;
  if (i === o) {
    const e = qP(gc.config?.provider || "lt-e");
    return e && e !== i
      ? (Nx(
          "llm.request.retry_provider_recovery",
          {
            retryCount: Math.max(0, Math.round(Number(a) || 0)) + 1,
            fromProvider: i,
            toProvider: e,
            error: String(n?.message || n || "").slice(0, 240),
            reason: "fast-provider-failed",
          },
          { source: "offscreen", provider: e, level: "warn" },
        ),
        e)
      : i;
  }
  if (Pw(i, e, n)) {
    const t = Date.now();
    return (
      Nx(
        "llm.request.retry_low_cost_preserved",
        {
          retryCount: Math.max(0, Math.round(Number(a) || 0)) + 1,
          provider: i,
          error: String(n?.message || n || "").slice(0, 240),
          thresholdSeconds: aP(Zw()),
          startLeadSeconds: aP(zw(e, t)),
          endLeadSeconds: aP(Qw(e, t)),
          reason: "request-local-lead-available",
        },
        { source: "offscreen", provider: i, level: "warn" },
      ),
      i
    );
  }
  const s = Date.now(),
    l = ek(s),
    c = zw(e, s),
    d = Qw(e, s);
  return (
    Nx(
      "llm.request.retry_provider_failover",
      {
        retryCount: Math.max(0, Math.round(Number(a) || 0)) + 1,
        fromProvider: i,
        toProvider: o,
        error: String(n?.message || n || "").slice(0, 240),
        readySubtitleLeadSeconds: aP(l),
        startLeadSeconds: aP(c),
        endLeadSeconds: aP(d),
        budgetReadySubtitleLeadSeconds: aP(r?.readySubtitleLeadSeconds),
        budgetEffectiveLeadSeconds: aP(r?.effectiveLeadSeconds),
        budgetBypassReason: r?.deadlineBudgetBypassReason || "",
      },
      { source: "offscreen", provider: o, level: "warn" },
    ),
    o
  );
}
function Iw(e = null, t = null) {
  const n = BC(e?.timing),
    a = UC(e?.timing),
    r = BC(t?.timing),
    i = UC(t?.timing);
  return null === n || null === a || null === r || null === i
    ? 0
    : a < r
      ? r - a
      : i < n
        ? n - i
        : 0;
}
function Lw(e = null, t = "standalone-short-fragment") {
  if (!e) return !1;
  hw(e.timing, t);
  const n = Array.from(
    new Set(
      (Array.isArray(e.timing?.mseCoverageClaimIds)
        ? e.timing.mseCoverageClaimIds
        : []
      ).filter(Boolean),
    ),
  );
  if (n.length)
    (Pu(n, "subtitle-ready", {
      segmentId: e.timing?.sttSegmentId ?? null,
      outcome: "short-fragment-suppressed",
    }),
      Dp("short-fragment-suppressed", _p(e.timing)));
  else if (zp(e.timing)) {
    const n = BC(e.timing),
      a = UC(e.timing);
    null !== n &&
      null !== a &&
      a > n &&
      fx(
        { start: n, end: a },
        { source: "short-fragment-suppressed", reason: t, status: "complete" },
      );
  }
  return (
    ah(e.timing, "no-text", { reason: t, done: !0, active: !1 }),
    Nx(
      "llm.short_fragment.suppressed",
      {
        text: e.text,
        textChars: Array.from(wD(e.text || "")).length,
        mediaStartTime: aP(BC(e.timing)),
        mediaEndTime: aP(UC(e.timing)),
        queuedMs: Math.max(0, Date.now() - (rP(e.queuedAtMs) || Date.now())),
        reason: t,
      },
      { source: "offscreen" },
    ),
    !0
  );
}
function _w() {
  if (!gc.finalTranslationBatch.length) return !1;
  $w();
  const e = gc.finalTranslationBatch.filter((e) => !0 !== e?.shortFragmentOnly);
  if (!e.length) {
    for (const e of gc.finalTranslationBatch) Lw(e);
    return ((gc.finalTranslationBatch = []), Uw(), NE(), !1);
  }
  const t = [];
  let n = 0,
    a = 0;
  for (const r of gc.finalTranslationBatch) {
    if (!0 !== r?.shortFragmentOnly) {
      t.push(r);
      continue;
    }
    const i =
      e
        .filter(
          (e) =>
            iE(r.requestContext, e.requestContext) &&
            zp(r.timing) === zp(e.timing),
        )
        .map((e) => ({ candidate: e, gapSeconds: Iw(r, e) }))
        .sort((e, t) => e.gapSeconds - t.gapSeconds)[0] || null;
    !i || i.gapSeconds > oa
      ? (Lw(r, "short-fragment-no-adjacent-sentence"), (a += 1))
      : ((r.providerOverride = i.candidate.providerOverride),
        (r.shortFragmentMergedWithSemantic = !0),
        t.push(r),
        (n += 1));
  }
  return (
    (gc.finalTranslationBatch = t),
    (n || a) &&
      Nx(
        "llm.short_fragment.batch_prepared",
        { merged: n, suppressed: a, remaining: t.length, maxGapSeconds: oa },
        { source: "offscreen" },
      ),
    gc.finalTranslationBatch.length > 0
  );
}
function Bw() {
  if ((Uw(), !gc.finalTranslationBatch.length)) return;
  const e = gc.finalTranslationBatch.every((e) => !0 === e?.shortFragmentOnly),
    t = e
      ? Math.min(
          ...gc.finalTranslationBatch.map(
            (e) => rP(e?.queuedAtMs) || Date.now(),
          ),
        )
      : 0,
    n = e ? Math.max(0, t + ia - Date.now()) : Math.max(0, Math.round(Lk()));
  ((gc.finalBatchStats.lastWaitMs = n),
    n <= 0
      ? Nw({ force: !0 })
      : (gc.finalTranslationBatchTimer = setTimeout(() => {
          ((gc.finalTranslationBatchTimer = null), Nw({ force: !0 }));
        }, n)));
}
function Uw() {
  gc.finalTranslationBatchTimer &&
    (clearTimeout(gc.finalTranslationBatchTimer),
    (gc.finalTranslationBatchTimer = null));
}
function qw(e) {
  const t = rP(e);
  return null === t ? null : Math.round(t);
}
function Fw() {
  const e = rP(gc.finalTranslationBatch[0]?.queuedAtMs) || Date.now();
  return {
    coalesceWaitMs: Math.round(_k()),
    playbackSafeFlushWaitMs: qw(Uk()),
    playbackSafeBatchWaitMs: qw(qk()),
    configuredWaitMs: Math.round(Sk()),
    oldestQueuedMs: Math.max(0, Math.round(Date.now() - e)),
  };
}
function Ow() {
  if (gc.finalTranslationRetryTimers instanceof Set) {
    for (const e of gc.finalTranslationRetryTimers) clearTimeout(e);
    gc.finalTranslationRetryTimers.clear();
  } else gc.finalTranslationRetryTimers = new Set();
}
function Nw(e = {}) {
  const t = Boolean(e.force);
  if (!gc.finalTranslationBatch.length) return;
  if ((Hw(), Gw(), !gc.finalTranslationBatch.length)) return;
  if (!_w()) return;
  const n = gc.finalTranslationBatch.length;
  if (!t && n < dk()) return void Bw();
  if (!iA())
    return (
      Uw(),
      void (gc.finalTranslationBatchTimer = setTimeout(() => {
        ((gc.finalTranslationBatchTimer = null), Nw({ force: !0 }));
      }, qa))
    );
  (Uw(), $w());
  const a = Fw(),
    r = Ww(),
    i = wD(r.map((e) => e.text).join(" ")),
    o = ck(r),
    s = sP(r.map((e) => BC(e.timing))),
    l = lP(r.map((e) => UC(e.timing))),
    c = BC(o),
    d = UC(o),
    u = Math.max(
      0,
      ...r.map((e) => Math.round(Number(e.retryCount || 0) || 0)),
    ),
    m = jw(r),
    g = oE(r);
  (sk(r.length),
    vP("translating", `批次翻譯 ${r.length} 段`),
    Nx(
      "llm.final_batch.flush",
      {
        batchSize: r.length,
        provider: m || qP(gc.config?.provider),
        mseAudio: fk(r),
        mediaStartTime: aP(c),
        mediaEndTime: aP(d),
        queuedFirstMediaStartTime: aP(s),
        queuedLastMediaEndTime: aP(l),
        timingUnionExpanded: Boolean(
          (null !== c && null !== s && c < s - 0.001) ||
            (null !== d && null !== l && d > l + 0.001),
        ),
        chars: Array.from(i).length,
        remainingQueued: gc.finalTranslationBatch.length,
        maxSegments: uk(m || gc.config?.provider, r),
        maxChars: mk(m || gc.config?.provider, r),
        coalesceWaitMs: a.coalesceWaitMs,
        playbackSafeFlushWaitMs: a.playbackSafeFlushWaitMs,
        playbackSafeBatchWaitMs: a.playbackSafeBatchWaitMs,
        configuredWaitMs: a.configuredWaitMs,
        oldestQueuedMs: a.oldestQueuedMs,
      },
      { source: "offscreen", provider: m || qP(gc.config?.provider) },
    ),
    wA(i, {
      isFinal: !0,
      timing: o,
      retryCount: u,
      providerOverride: m,
      requestContext: g,
    }),
    gc.finalTranslationBatch.length &&
      ("lt-n" === Vw(gc.finalTranslationBatch[0])
        ? setTimeout(() => Nw({ force: !0 }), 0)
        : Bw()));
}
function Hw() {
  if (!gc.finalTranslationBatch.length || !fk(gc.finalTranslationBatch))
    return 0;
  const e = [];
  let t = 0;
  for (const n of gc.finalTranslationBatch) {
    const a = Em([], n?.timing);
    a.ignored
      ? ((t += 1),
        Nx(
          "llm.final_batch.drop_ready_covered",
          {
            reason: a.reason,
            mediaStartTime: aP(a.range?.start),
            mediaEndTime: aP(a.range?.end),
            coverageRatio: aP(a.coverageRatio),
            coveredSeconds: aP(a.coveredSeconds),
            chars: Array.from(wD(n?.text || "")).length,
          },
          { source: "offscreen", level: "warn" },
        ),
        ah(n?.timing, "ignored", { reason: a.reason, done: !0, active: !1 }))
      : e.push(n);
  }
  return ((gc.finalTranslationBatch = e), t);
}
function Gw() {
  if (!gc.finalTranslationBatch.length) return 0;
  const e = [];
  let t = 0;
  for (const n of gc.finalTranslationBatch)
    sE(n?.requestContext, "final-batch-before-flush", {
      provider: n?.providerOverride || gc.config?.provider || "",
      mediaStartTime: aP(BC(n?.timing)),
      mediaEndTime: aP(UC(n?.timing)),
      log: t < 3,
    })
      ? ((t += 1),
        ah(n?.timing, "ignored", {
          reason: "stale-request-context",
          done: !0,
          active: !1,
        }))
      : e.push(n);
  return ((gc.finalTranslationBatch = e), t);
}
function Ww() {
  if (!gc.finalTranslationBatch.length) return [];
  const e = [],
    t = Vw(gc.finalTranslationBatch[0]),
    n = uk(t);
  for (const a of gc.finalTranslationBatch) {
    if (e.length > 0 && Vw(a) !== t) break;
    if (e.length > 0 && !ok(e[e.length - 1], a)) break;
    const r = [...e, a],
      i = wD(r.map((e) => e.text).join(" ")),
      o = AC(!0, tC(ck(r))),
      s = fk(r),
      l = s ? n : Math.min(n, o.maxSegments),
      c = mk(t, r),
      d = s ? c : Math.min(o.maxOriginalChars, c),
      u = Array.from(i).length,
      m = s ? yk(r) : null,
      g = s ? vk(r) : null;
    if (
      e.length > 0 &&
      (r.length > l || u > d || (null !== m && null !== g && g > m))
    )
      break;
    if ((e.push(a), e.length >= l)) break;
  }
  const a = Math.max(1, e.length);
  return gc.finalTranslationBatch.splice(0, a);
}
function $w() {
  fk(gc.finalTranslationBatch) &&
    (gc.finalTranslationBatch = gc.finalTranslationBatch
      .map((e, t) => ({ item: e, index: t }))
      .sort((e, t) => {
        const n = BC(e.item?.timing),
          a = BC(t.item?.timing);
        return null !== n && null !== a && n !== a
          ? n - a
          : null !== n && null === a
            ? -1
            : null === n && null !== a
              ? 1
              : e.index - t.index;
      })
      .map((e) => e.item));
}
function Vw(e = null) {
  return "sql-wallet-v1" !== gc.config?.walletBillingProtocol ||
    (!0 === gc.config.walletAllowAlternateLlm &&
      "off" !== gc.config.llmFallbackMode)
    ? (Rw(e?.timing) && "off" !== lD(gc.config?.llmFallbackMode)) ||
      nk(e?.timing)
      ? yw()
      : zp(e?.timing) && Kw(e)
        ? qP(gc.config?.provider || "lt-e")
        : qP(e?.providerOverride || gc.config?.provider || "lt-e")
    : qP(gc.config.provider);
}
function jw(e = []) {
  ik(e);
  const t = Vw(e[0]),
    n = qP(gc.config?.provider || "lt-e");
  return t && t !== n ? t : null;
}
function Kw(e = null, t = Date.now()) {
  const n = e && "object" == typeof e,
    a = n ? t : (rP(e) ?? t);
  if (!zm()) return !1;
  const r = qP(gc.config?.provider || "lt-e");
  if (!r || r === yw()) return !1;
  if (n && zp(e?.timing)) return Yw(e.timing, a);
  const i = Nk(a) ?? zA(a);
  return null !== i && Lp(i) >= _l;
}
function zw(e = null, t = Date.now()) {
  if (!zp(e)) return null;
  const n = BC(e) ?? UC(e);
  if (null === n) return null;
  const a = Gk(t),
    r = a.mediaTime ?? zA(t),
    i = $k(n, a);
  return null === i || null === r ? null : i - r;
}
function Qw(e = null, t = Date.now()) {
  if (!zp(e)) return null;
  const n = UC(e) ?? BC(e);
  if (null === n) return null;
  const a = Gk(t),
    r = a.mediaTime ?? zA(t),
    i = $k(n, a);
  return null === i || null === r ? null : i - r;
}
function Jw(e = null, t = Date.now()) {
  const n = Qw(e, t);
  return null !== n && n >= _l;
}
function Xw(e = null, t = Date.now()) {
  const n = zw(e, t);
  return null !== n && n >= _l;
}
function Zw() {
  return dP(Math.max(0, qC()) / 1e3 + 1.2 + 3, bw() + 2, _l);
}
function Yw(e = null, t = Date.now()) {
  if (!zp(e)) return !1;
  const n = Zw(),
    a = zw(e, t),
    r = Qw(e, t);
  return null !== a && null !== r && a >= n && r >= n;
}
function ek(e = Date.now()) {
  const t = Nk(e) ?? zA(e);
  return null === t ? null : Lp(t);
}
function tk(e = gc.finalTranslationBatch, t = Date.now()) {
  const n = Array.isArray(e) ? e : [];
  if (!fk(n)) return !1;
  if (fh(t)) return !0;
  if (Cw() && n.some((e) => Vw(e) === yw())) return !0;
  const a = n.find((e) => zp(e?.timing)),
    r = zw(a?.timing, t);
  if (null !== r && r < _l) return !0;
  const i = Qw(a?.timing, t);
  return null !== i && i < _l;
}
function nk(e = null, t = Date.now()) {
  if (!zp(e)) return !1;
  if (!ww()) return !1;
  if (!gc.lowLeadFastLlm?.armed || !gc.lowLeadFastLlm?.active) return !1;
  const n = bw(),
    a = zw(e, t);
  if (null !== a && a < n) return !0;
  const r = Qw(e, t);
  if (null === r) {
    const e = ek(t);
    return null !== e && e < n;
  }
  return r < n;
}
function ak(e = Date.now()) {
  const t = Date.parse(gc.config?.startedAt || "");
  if (!Number.isFinite(t)) return null;
  const n = Math.max(0, Math.round(1e3 * wk()));
  return Math.round(t + n - e);
}
function rk(e = null, t = Date.now()) {
  if (!zp(e)) return !1;
  if (!ww()) return !1;
  if (!Yk(e, t)) return !1;
  const n = ak(t);
  return null !== n && n <= Math.max(0, Math.round(qC())) + At;
}
function ik(e = []) {
  if (!fk(e)) return !1;
  if (!Kw()) return !1;
  const t = qP(gc.config?.provider || "lt-e"),
    n = (e || []).filter((e) => {
      if (!zp(e?.timing)) return !1;
      const n = qP(e?.providerOverride || "");
      return n && n !== t;
    }).length;
  if (!n) return !1;
  const a = Nk() ?? zA();
  return (
    Nx(
      "llm.final_batch.provider_override_reset",
      {
        resetCount: n,
        provider: t,
        readySubtitleLeadSeconds: aP(Lp(a)),
        thresholdSeconds: _l,
      },
      { source: "offscreen", provider: t },
    ),
    !0
  );
}
function ok(e = null, t = null) {
  if (!e || !t) return !0;
  if (!iE(e.requestContext, t.requestContext)) return !1;
  if (
    e.timing?.mediaTimingDiscontinuitySplit ||
    t.timing?.mediaTimingDiscontinuitySplit
  )
    return !1;
  const n = zp(e.timing),
    a = zp(t.timing);
  if (!n && !a) return !0;
  const r = UC(e.timing),
    i = BC(t.timing);
  return (
    null === r ||
    null === i ||
    i <=
      r +
        (e?.shortFragmentOnly || t?.shortFragmentOnly
          ? oa
          : n && a && !tk([e, t])
            ? Jl
            : Vl)
  );
}
function sk(e) {
  const t = Math.max(0, Math.round(Number(e) || 0));
  t &&
    ((gc.finalBatchStats.enabled = !0),
    (gc.finalBatchStats.batchesSent += 1),
    (gc.finalBatchStats.segmentsSent += t),
    (gc.finalBatchStats.lastBatchSize = t),
    (gc.finalBatchStats.savedCalls = Math.max(
      0,
      gc.finalBatchStats.estimatedCallsWithoutBatch -
        gc.finalBatchStats.batchesSent,
    )));
}
function lk(e = []) {
  const t = e.map((e) => {
      const t = e?.timing || {},
        n = BC(t),
        a = UC(t),
        r = null !== n && null !== a && a > n,
        i = (Array.isArray(t.speechIntervals) ? t.speechIntervals : [])
          .map((e) => {
            let t = rP(e?.start),
              i = rP(e?.end);
            return null === t || null === i || i <= t
              ? null
              : (r && ((t = Math.max(t, n)), (i = Math.min(i, a))),
                i <= t ? null : { ...e, start: t, end: i });
          })
          .filter(Boolean);
      return { itemStart: n, itemEnd: a, hasItemRange: r, itemIntervals: i };
    }),
    n = [];
  for (const {
    itemStart: e,
    itemEnd: a,
    hasItemRange: r,
    itemIntervals: i,
  } of t)
    i.length ? n.push(...i) : r && n.push({ start: e, end: a, coarse: !0 });
  return n.sort((e, t) => e.start - t.start || e.end - t.end);
}
function ck(e) {
  const t = Array.isArray(e) ? e.filter((e) => e?.timing) : [];
  if (!t.length) return gc.lastTranscriptTiming || QA(null, { isFinal: !0 });
  const n = t.map((e, t) => ({
      item: e,
      index: t,
      timing: e.timing || {},
      start: BC(e.timing),
      end: UC(e.timing),
    })),
    a = [...n].sort(
      (e, t) => (e.start ?? 1 / 0) - (t.start ?? 1 / 0) || e.index - t.index,
    ),
    r = [...n].sort(
      (e, t) => (t.end ?? -1 / 0) - (e.end ?? -1 / 0) || e.index - t.index,
    ),
    i = a.find((e) => null !== e.start) || n[0],
    o = r.find((e) => null !== e.end) || n[n.length - 1],
    s = i.timing,
    l = o.timing,
    c = t.flatMap((e) =>
      Array.isArray(e.timing?.words) ? e.timing.words : [],
    ),
    d = Array.from(
      new Set(
        t
          .flatMap((e) =>
            Array.isArray(e.timing?.sttSegmentIds)
              ? e.timing.sttSegmentIds
              : [e.timing?.sttSegmentId],
          )
          .filter((e) => null != e),
      ),
    ),
    u = Array.from(
      new Set(t.flatMap((e) => e.timing?.walletSttRequestIds || [])),
    ),
    m = Array.from(
      new Set(
        t
          .flatMap((e) =>
            Array.isArray(e.timing?.mseCoverageClaimIds)
              ? e.timing.mseCoverageClaimIds
              : [],
          )
          .filter(Boolean),
      ),
    ),
    g = t
      .flatMap((e) =>
        Array.isArray(e.timing?.mseTranslationPieces)
          ? e.timing.mseTranslationPieces
          : [],
      )
      .map((e) => ({
        ...e,
        claimIds: Array.isArray(e?.claimIds) ? [...e.claimIds] : [],
      })),
    p = Array.from(
      new Set(
        t
          .flatMap((e) =>
            Array.isArray(e.timing?.translationTimelineReservationIds)
              ? e.timing.translationTimelineReservationIds
              : [e.timing?.translationTimelineReservationId],
          )
          .filter(Boolean),
      ),
    ),
    f = lk(t),
    h = t
      .flatMap((e) =>
        Array.isArray(e.timing?.chunkMediaRanges)
          ? e.timing.chunkMediaRanges
          : [],
      )
      .map((e) => ({ ...e }))
      .sort((e, t) => (rP(e?.start) ?? 1 / 0) - (rP(t?.start) ?? 1 / 0)),
    S = $p(
      t.flatMap((e) =>
        Array.isArray(e.timing?.realtimeProcessedAudioRanges)
          ? e.timing.realtimeProcessedAudioRanges
          : [],
      ),
      Qr,
    ),
    M = i.start,
    v = o.end,
    y = sP([s.audioStartMs, ...a.map((e) => e.timing.audioStartMs)]),
    b = sP([l.audioEndMs, ...r.map((e) => e.timing.audioEndMs)]),
    T = null !== M && null !== v ? Math.max(0, 1e3 * (v - M)) : null,
    w =
      null !== y && null !== b && b >= y
        ? b - y
        : (T ?? cP(t.map((e) => e.timing?.audioDurationMs))),
    k = sP([
      s.audioStartWallTimeMs,
      ...a.map((e) => e.timing.audioStartWallTimeMs),
    ]),
    C = sP([
      l.audioEndWallTimeMs,
      ...r.map((e) => e.timing.audioEndWallTimeMs),
    ]),
    A = t.map((e) => e.timing || {}).filter((e) => e.sttDeadlineHedgeTriggered),
    R = A.find((e) => e.sttDeadlineHedgeRescue) || null;
  return {
    ...l,
    sourceProgramClock: DD(t.map((e) => e.timing)),
    isFinal: !0,
    preserveExplicitMediaRange: !0,
    mediaTime: v ?? rP(l.mediaTime),
    mediaTimeEnd: v,
    audioStartMediaTime: M,
    audioEndMediaTime: v,
    sourceMediaStartTime: M,
    sourceMediaEndTime: v,
    displayAfterMediaTimeStart: M,
    displayAfterMediaTimeEnd: v,
    audioStartMs: y,
    audioEndMs: b,
    audioDurationMs: w,
    audioStartWallTimeMs: k,
    audioEndWallTimeMs: C,
    words: c,
    speechIntervals: f,
    chunkMediaRanges: h,
    realtimeProcessedAudioRanges: S,
    transcriptReceivedAtMs:
      Math.max(0, ...t.map((e) => rP(e.timing?.transcriptReceivedAtMs) || 0)) ||
      Date.now(),
    sourceWallTimeMs:
      rP(s.sourceWallTimeMs) || rP(s.transcriptReceivedAtMs) || Date.now(),
    fallbackLagSeconds: Math.max(
      0,
      ...t.map((e) => rP(e.timing?.fallbackLagSeconds) || 0),
    ),
    sourceMediaDelaySeconds:
      l.sourceMediaDelaySeconds ?? s.sourceMediaDelaySeconds ?? null,
    sttSegmentId: 1 === d.length ? d[0] : null,
    sttSegmentIds: d,
    walletSttRequestIds: u,
    mseCoverageClaimIds: m,
    mseTranslationPieces: g,
    translationTimelineReservationId: 1 === p.length ? p[0] : null,
    translationTimelineReservationIds: p,
    sttDeadlineHedgeTriggered: A.length > 0,
    sttDeadlineHedgeRescue: Boolean(R),
    sttDeadlineHedgeTriggerReason: R?.sttDeadlineHedgeTriggerReason || "",
    sttDeadlineHedgeWinnerRole: R?.sttDeadlineHedgeWinnerRole || "",
    sttDeadlineHedgeWinnerProvider: R?.sttDeadlineHedgeWinnerProvider || "",
    sttDeadlineHedgeReserveMs: Math.max(
      0,
      ...A.map((e) => Math.round(rP(e.sttDeadlineHedgeReserveMs) || 0)),
    ),
    batchSize: t.length,
  };
}
function dk() {
  const e = oP(gc.config?.finalBatchMinSegments);
  return Number.isFinite(e) ? dP(Math.round(e), 1, 8) : 1;
}
function uk(e = gc.config?.provider, t = gc.finalTranslationBatch) {
  const n = dk();
  if (fk(t)) {
    const a = oP(gc.config?.finalBatchMaxSegments);
    let r = tk(t) ? 4 : Aa;
    "lt-n" === qP(e) && (r = Math.min(r, 3));
    const i = null !== a ? Math.round(a) : r;
    return dP(Math.max(n, i), n, r);
  }
  const a = oP(gc.config?.finalBatchMaxSegments),
    r = null !== a ? Math.round(a) : WT() ? tT() : Ek(),
    i = gk(e, t);
  return dP(Math.max(n, r), n, i);
}
function mk(e = gc.config?.provider, t = gc.finalTranslationBatch) {
  if (fk(t)) {
    const n = oP(gc.config?.finalBatchMaxChars);
    let a = tk(t) ? Ea : Ra;
    return (
      "lt-n" === qP(e) && (a = Math.min(a, Da)),
      dP(null !== n ? Math.round(n) : a, 160, a)
    );
  }
  const n = oP(gc.config?.finalBatchMaxChars);
  return dP(null !== n ? Math.round(n) : Pk(), 160, pk(e, t));
}
function gk(e = gc.config?.provider, t = gc.finalTranslationBatch) {
  if (fk(t)) return tk(t) ? 4 : Aa;
  if (WT()) return 3;
  if (bk() > 0) return 8;
  const n = Mo[qP(e)] || 2,
    a = dk();
  return dP(Math.round(n), a, 8);
}
function pk(e = gc.config?.provider, t = gc.finalTranslationBatch) {
  if (fk(t)) return tk(t) ? Ea : Ra;
  if (bk() > 0) return 1600;
  const n = vo[qP(e)] || Ca;
  return dP(Math.round(n), 160, 1600);
}
function fk(e = gc.finalTranslationBatch) {
  return (Array.isArray(e) ? e : []).some((e) => zp(e?.timing));
}
function hk(e = gc.finalTranslationBatch) {
  return (
    !!Sg() &&
    (Array.isArray(e) ? e : []).some((e) => {
      const t = e?.timing || {};
      return (
        "tab-capture" === t.sourceType &&
        LP(t.sttProvider) === Z &&
        Op(t.realtimeProcessedAudioRanges).length > 0
      );
    })
  );
}
function Sk() {
  const e = bk();
  if (hk()) return !0 === gc.mseStartupBoost?.startupReleaseReady ? Ba : La;
  if (fk()) return Mk(e);
  const t = WT() ? eT() : 0,
    n = oP(gc.config?.finalBatchWaitMs);
  if (null !== n) {
    const e = dP(Math.round(n), na, ra);
    return Math.max(t, e);
  }
  if (e > 0) {
    const n = dP(e, na, la);
    return Math.max(t, n);
  }
  return Math.max(t, Dk());
}
function Mk(e = bk()) {
  const t = gc.mseStartupBoost || {};
  return t.enabled &&
    t.active &&
    !t.switched &&
    t.mode === Rl &&
    !0 === t.batchOnlyAfterSeek &&
    !0 === t.startupReleaseReady
    ? Ba
    : fh()
      ? La
      : tk()
        ? _a
        : e > 0
          ? dP(e, na, la)
          : Ia;
}
function vk(e = []) {
  const t = Array.isArray(e) ? e : [],
    n = sP(t.map((e) => BC(e?.timing))),
    a = lP(t.map((e) => UC(e?.timing)));
  return null === n || null === a ? null : Math.max(0, a - n);
}
function yk(e = gc.finalTranslationBatch) {
  return fk(e) ? (tk(e) ? Xl : Zl) : null;
}
function bk() {
  return Math.round(1e3 * Tk(gc.config?.batchWaitSeconds));
}
function Tk(e) {
  const t = Number(e);
  return Number.isFinite(t) ? dP(t, 0, sa) : 0;
}
function wk() {
  const e =
      rP(gc.config?.effectiveSyncDelaySeconds) ||
      rP(gc.config?.syncDelaySeconds) ||
      6,
    t = Ak() ? rP(gc.adaptiveSyncDelaySeconds) : null,
    n = kk();
  return dP(Math.max(e, t || 0, n || 0), 2, ga);
}
function kk() {
  if (!gc.config?.syncEnabled || gc.config?.singleTabMediaSync) return null;
  const e = rP(gc.viewerMediaTiming?.actualDelaySeconds);
  return null === e || e < 0 || e > ga ? null : e;
}
function Ck() {
  return Math.min(wk(), pa);
}
function Ak() {
  return Boolean(
    gc.config?.adaptiveSyncDelayEnabled &&
      gc.config?.syncEnabled &&
      !gc.config?.singleTabMediaSync,
  );
}
function Rk() {
  return Ak() ? dP(gc.config?.subtitleBufferTargetSegments || 3, 1, 8) : 0;
}
function xk() {
  const e = Rk();
  return e ? Math.max(ao, 1e3 * e) : ao;
}
function Ek() {
  const e = Ck();
  return e <= 6 ? 2 : Math.round(Ik(e, 6, pa, 2, 3));
}
function Pk() {
  const e = Ck();
  return e <= 6 ? ta : Math.round(Ik(e, 6, pa, ta, 700));
}
function Dk() {
  const e = Ck();
  return e <= 6 ? aa : e <= da ? Ik(e, 6, da, aa, ha) : Ik(e, da, ua, ha, Sa);
}
function Ik(e, t, n, a, r) {
  const i = dP((e - t) / (n - t), 0, 1);
  return Math.round(a + (r - a) * i);
}
function Lk() {
  const e = _k(),
    t = Uk();
  return null === t ? e : Math.min(e, t);
}
function _k() {
  return (
    (rP(gc.finalTranslationBatch[0]?.queuedAtMs) || Date.now()) +
    Sk() -
    Date.now()
  );
}
function Bk({ segmentCount: e, totalChars: t }) {
  const n = Uk();
  return e >= uk() || t >= mk() || _k() <= 0 || (null !== n && n <= Ta);
}
function Uk() {
  const e = qk();
  return null === e ? null : e - _C();
}
function qk() {
  const e = gc.finalTranslationBatch[0],
    t = BC(e?.timing),
    n = Gk(),
    a = n.mediaTime,
    r = $k(t, n);
  return null === r || null === a ? null : 1e3 * (r - a) - qC() - IC() - LC();
}
function Fk(e = Date.now()) {
  const t = gc.viewerMediaTiming;
  if (!t || t.adPlaying) return null;
  const n = rP(t.currentTime);
  if (null === n) return null;
  const a = rP(gc.viewerTimingReceivedAt) || rP(t.wallTimeMs) || 0;
  if (a <= 0 || e - a > tc) return null;
  const r = t.paused ? 0 : rP(t.playbackRate) || 1,
    i = rP(t.wallTimeMs) || a;
  return n + (Math.max(0, e - i) / 1e3) * r;
}
function Ok(e = Date.now()) {
  const t = gc.viewerMediaTiming;
  if (!t || t.adPlaying) return null;
  const n = rP(t.sourceMediaTime);
  if (null === n) return null;
  const a = rP(gc.viewerTimingReceivedAt) || rP(t.wallTimeMs) || 0;
  if (a <= 0 || e - a > tc) return null;
  const r = gc.sourceMediaTiming,
    i = r?.paused ? 0 : rP(r?.playbackRate) || 1,
    o = rP(t.wallTimeMs) || a;
  return n + (Math.max(0, e - o) / 1e3) * i;
}
function Nk(e = Date.now(), t = null) {
  return Gk(e, t).mediaTime;
}
function Hk(e = Date.now()) {
  if (!0 !== gc.config?.singleTabMediaSync || !zm()) return null;
  const t = gc.sourceMediaTiming;
  if (!0 === t?.isLiveStream || !0 === gc.config.sourceIsLiveStream)
    return null;
  const n = t?.captionStartup,
    a = e - (rP(gc.sourceTimingReceivedAt) || 0),
    r = rP(n?.anchorMediaTime),
    i = rP(n?.remainingMs),
    o = tE();
  return !n?.active ||
    !["preloading", "waiting-subtitles", "rewinding"].includes(n.phase) ||
    n.sessionId !== gc.sessionId ||
    !o ||
    n.mediaContextKey !== o ||
    a < 0 ||
    a > 3e3 ||
    null === r ||
    r < 0 ||
    null === i ||
    i <= a
    ? null
    : { anchorMediaTime: r, remainingMs: Math.min(12e4, i - a) };
}
function Gk(e = Date.now(), t = null) {
  const n = t ?? zA(e),
    a = Hk(e);
  if (a)
    return {
      mediaTime: a.anchorMediaTime,
      source: "single-tab-startup-anchor",
      sourceMediaTime: n,
      rawSourceMediaTime: n,
      viewerProbeMediaTime: null,
      viewerProbeRejectedReason: "",
      startupRemainingMs: a.remainingMs,
    };
  const r = Ok(e) ?? n,
    i = Fk(e);
  if (null !== i) {
    const e = null !== r ? i - r : null;
    return !0 === gc.config?.syncEnabled &&
      !0 !== gc.config?.singleTabMediaSync &&
      eD() &&
      null !== e &&
      e > us
      ? {
          mediaTime: Math.max(0, r - wk()),
          source: "source-minus-delay-reversed-viewer-probe",
          sourceMediaTime: r,
          rawSourceMediaTime: n,
          viewerProbeMediaTime: i,
          viewerProbeRejectedReason: "viewer-ahead-of-source",
        }
      : {
          mediaTime: i,
          source: "viewer-probe",
          sourceMediaTime: r,
          rawSourceMediaTime: n,
          viewerProbeMediaTime: i,
          viewerProbeRejectedReason: "",
        };
  }
  const o = !0 === gc.config?.singleTabMediaSync;
  return {
    mediaTime: null === r ? null : Math.max(0, r - (o ? 0 : wk())),
    source:
      null === r ? "none" : o ? "source-single-tab" : "source-minus-delay",
    sourceMediaTime: r,
    rawSourceMediaTime: n,
    viewerProbeMediaTime: null,
    viewerProbeRejectedReason: "",
  };
}
function Wk(e = null) {
  const t = e || Gk(),
    n = rP(t?.sourceMediaTime),
    a = rP(t?.rawSourceMediaTime);
  return null === n || null === a ? 0 : n - a;
}
function $k(e, t = null) {
  const n = rP(e);
  return null === n
    ? null
    : !gc.config?.syncEnabled || gc.config?.singleTabMediaSync
      ? n
      : n + Wk(t);
}
function Vk(e = Date.now()) {
  const t = Hk(e);
  if (t) return t.remainingMs;
  if (!gc.config?.syncEnabled || gc.config?.singleTabMediaSync) return 0;
  const n = gc.viewerMediaTiming;
  if (!n || !0 !== n.paused) return 0;
  const a = rP(gc.config?.syncDelaySeconds),
    r = rP(n.actualDelaySeconds);
  if (null === a || null === r) return 0;
  const i = rP(gc.viewerTimingReceivedAt) || rP(n.wallTimeMs) || e,
    o = 1e3 * (a - r) - Math.max(0, e - i);
  return dP(Math.round(o), 0, fa);
}
function jk(e = null) {
  return Boolean(zp(e) && !0 === gc.config?.singleTabMediaSync && zm());
}
function Kk(e, t = Date.now(), n = {}) {
  const a =
    !0 === n?.mseAudioTiming && !0 === gc.config?.singleTabMediaSync && zm();
  if (!gc.config?.syncEnabled && !a) return null;
  const r = rP(e),
    i = Gk(t),
    o = i.mediaTime,
    s = $k(r, i);
  if (null === s || null === o) return null;
  const l = 1e3 * (s - o) + Vk(t) - _C() + (Ak() ? xk() : 0);
  return dP(Math.round(l), 0, fa);
}
function zk(e = null, t = Date.now()) {
  return Kk(Qk(e), t, { mseAudioTiming: jk(e) });
}
function Qk(e = null) {
  const t = BC(e),
    n = UC(e);
  if (!e) return t;
  const a = (Array.isArray(e.words) ? e.words : [])
      .map((e) => rP(e?.mediaStartTime))
      .filter((e) => null !== e),
    r = (Array.isArray(e.speechIntervals) ? e.speechIntervals : [])
      .map((e) => rP(e?.start))
      .filter((e) => null !== e),
    i = a.length ? Math.min(...a) : r.length ? Math.min(...r) : null;
  return null === i ||
    (null !== t && i < t - 0.1) ||
    (null !== n && i > n + 0.1)
    ? t
    : i;
}
function Jk(e = null, t = Date.now()) {
  const n = { mseAudioTiming: jk(e) },
    a = Kk(UC(e), t, n);
  return null !== a ? a : zk(e, t);
}
function Xk() {
  return !(!gc.config?.syncEnabled || gc.config?.singleTabMediaSync) && zm();
}
function Zk(e = Date.now()) {
  const t =
    rP(gc.mseAudio?.startedAtMs) || rP(gc.mseStartupBoost?.startedAtMs) || 0;
  return (
    t <= 0 ||
    e - t <=
      Math.max(
        0,
        1e3 *
          (rP(
            gc.config?.effectiveSyncDelaySeconds ?? gc.config?.syncDelaySeconds,
          ) || 0),
      ) +
        ec
  );
}
function Yk(e = null, t = Date.now()) {
  if (!zp(e)) return !1;
  const n = gc.mseStartupBoost || {};
  if (!n.enabled) return Xk() && Zk(t) && !hh(t);
  const a = rP(n.readySubtitleEndMediaTime);
  return (
    !(null !== a && a > 0) &&
    (n.enabled
      ? !(!n.active || n.switched || (n.mode !== xl && n.mode !== El))
      : Xk() && Zk(t))
  );
}
function eC(e = null, t = null, n = Date.now()) {
  if (!zp(e)) return "";
  if (Yk(e, n)) return "";
  const a = UC(e),
    r = Gk(n),
    i = r.mediaTime,
    o = $k(a, r);
  return null !== o && null !== i && i - o > pl
    ? ""
    : e?.mseGapRecovery
      ? null !== i && Lp(i) >= _l
        ? ""
        : "mse-gap-recovery-catchup"
      : "";
}
function tC(e = null, t = Date.now()) {
  const n = gc.config?.syncEnabled ? wk() : null,
    a = null !== n ? Math.round(1e3 * n) : null,
    r = Jk(e, t),
    i = zk(e, t),
    o = Yk(e, t),
    s = eC(e, r, t),
    l = o || Boolean(s),
    c = l ? null : r,
    d = l ? null : i,
    u = DC(e, t),
    m = Math.round(qC()),
    g = BC(e),
    p = UC(e),
    f = KA(t),
    h = f.mediaTime,
    S = Gk(t, h),
    M = S.mediaTime,
    v = Wk(S),
    y = $k(g, S),
    b = $k(p, S),
    T = null !== p && null !== h ? Math.max(0, p - h) : null,
    w = null !== b && null !== M ? b - M : null,
    k = $k(
      rP(
        gc.mseAudio?.lastAcceptedMediaEndTime ?? gc.mseAudio?.lastBufferedEnd,
      ) ?? p,
      S,
    ),
    C = zp(e) && null !== M ? Math.max(0, (k ?? M) - M) : null,
    A = zp(e) ? Lp(M) : null,
    R = o ? ak(t) : null,
    x = jk(e);
  return {
    fixedDelayMs: a,
    remainingDeadlineMs: c,
    displayDeadlineMs: d,
    originalFallbackDeadlineMs: nC(d, c),
    startupWaitBudgetBypassed: o,
    deadlineBudgetBypassed: l,
    startupWaitBudgetReason: o
      ? gc.mseStartupBoost?.enabled
        ? "wait-first-mse-first-subtitle"
        : "mse-sync-startup-first-subtitle"
      : "",
    startupWallClockRemainingMs: R,
    singleTabMseDeadlineEnabled: x,
    deadlineBudgetBypassReason: o
      ? gc.mseStartupBoost?.enabled
        ? "wait-first-mse-first-subtitle"
        : "mse-sync-startup-first-subtitle"
      : s,
    bypassedRemainingDeadlineMs: l ? r : null,
    bypassedDisplayDeadlineMs: l ? i : null,
    sttElapsedMs: u,
    estimatedTranslationLatencyMs: m,
    targetMediaTime: g,
    targetEndMediaTime: p,
    projectedTargetMediaTime: y,
    projectedTargetEndMediaTime: b,
    sourceTimelineOffsetSeconds: v,
    sourceMediaTime: h,
    viewerMediaTime: M,
    viewerClockSource: S.source,
    viewerProbeMediaTime: S.viewerProbeMediaTime,
    viewerProbeRejectedReason: S.viewerProbeRejectedReason,
    mseAudioTiming: zp(e),
    sourceProbeMediaTime: f.sourceMediaTime,
    msePlaybackMediaTime: f.mseMediaTime,
    playbackClockSource: f.source,
    playbackClockAgeMs: f.ageMs,
    sourceBufferLeadSeconds: T,
    mseLeadSeconds: T,
    rawMseLeadSeconds: C,
    readySubtitleLeadSeconds: A,
    mseReadySubtitleLeadSeconds: A,
    effectiveLeadSeconds: w,
  };
}
function nC(e, t) {
  const n = rP(e),
    a = rP(t);
  return null !== n && null !== a && a > n
    ? dP(Math.round(Math.min(a, n + 0)), 0, fa)
    : (n ?? a ?? null);
}
function aC(e = {}, t = !0, n = gc.config?.provider) {
  const a = rP(e.remainingDeadlineMs),
    r = rP(e.estimatedTranslationLatencyMs),
    i = rC(r, t),
    o =
      !t ||
      !0 !== e?.mseAudioTiming ||
      ("lt-j" !== qP(n) && "textGatewayA-gpt-5.6-luna" !== qP(n))
        ? 0
        : Fi;
  if (!0 === e?.startupWaitBudgetBypassed || !0 === e?.deadlineBudgetBypassed)
    return dP(Math.max(i, Ui, o), Bi, qi);
  if (null !== a) {
    const n = Math.round(a + Oi),
      s = rP(e.effectiveLeadSeconds),
      l = i > Ui,
      c =
        t &&
        ((null !== r && r > a) ||
          l ||
          (null !== s && s > 0.5) ||
          !0 === e?.mseAudioTiming)
          ? l
            ? i
            : Math.min(i, Ui)
          : t && a <= 0
            ? Gi
            : Bi;
    return dP(Math.max(n, c, o), Bi, qi);
  }
  return dP(Math.max(Math.round(i), o), Bi, qi);
}
function rC(e, t = !0) {
  const n = rP(e);
  if (null === n || n <= 0) return Ui;
  const a = t ? Ni : Hi,
    r = t ? Gi : Bi;
  return Math.max(r, n + a);
}
function iC(e = null) {
  return (
    !(!e || !zp(e)) &&
    Boolean(
      e.mseGapRecovery ||
        "mse-gap-backfill" === e.segmentReason ||
        "mse-gap-backfill" === e.reason,
    )
  );
}
function oC(e = null) {
  return iC(e);
}
function sC(e = null, t = null) {
  if (!iC(e)) return !1;
  const n = String(t?.deadlineBudgetBypassReason || "");
  return !n || "mse-gap-recovery-catchup" === n;
}
function lC(e = {}, t = null) {
  let n = rP(e?.displayDeadlineMs ?? e?.originalFallbackDeadlineMs),
    a = rP(e?.remainingDeadlineMs);
  null === n &&
    null === a &&
    zp(t) &&
    !0 === e?.deadlineBudgetBypassed &&
    ((n = rP(e?.bypassedDisplayDeadlineMs)),
    (a = rP(e?.bypassedRemainingDeadlineMs)));
  let r = nC(n, a);
  return (
    Boolean(
      gc.config?.syncEnabled &&
        !gc.config?.singleTabMediaSync &&
        !zp(t) &&
        "tab-capture" === String(t?.sourceType || t?.audioInputMode || "") &&
        (!0 === gc.sourceMediaTiming?.isLiveStream ||
          !0 === gc.config?.sourceIsLiveStream) &&
        (!$T() || (null !== n && n > 0)),
    ) &&
      null !== n &&
      null !== a &&
      a > n &&
      (r = Math.max(r ?? 0, Math.min(a, n + no))),
    null !== r ? r : sC(t, e) ? Gi : null
  );
}
function cC(e = {}, t = null) {
  const n = lD(gc.config?.llmFallbackMode),
    a = lC(e, t);
  if (null === a) return null;
  const r = sC(t, e);
  if (a <= 0) return zp(t) ? ("off" === n ? 0 : Ji) : $T() ? mC(e) : 0;
  const i = "off" === n ? 0 : Wi,
    o = Math.max(0, Math.round(a - i + pC(e, t)));
  return r && "off" !== n ? Math.max(o, Ji) : o;
}
function dC() {
  return {
    consecutiveExpired: 0,
    consecutiveOnTime: 0,
    structuralLateness: !1,
    activatedAtMs: 0,
    lastRecommendedDelaySeconds: null,
  };
}
function uC(e = {}, t = null, n = 0) {
  const a = rP(lC(e, t)),
    r =
      gc.originalFallbackDeadlineHealth ||
      (gc.originalFallbackDeadlineHealth = dC());
  if (null === a) return r;
  if (a <= 0) {
    if (
      ((r.consecutiveExpired += 1),
      (r.consecutiveOnTime = 0),
      !r.structuralLateness && r.consecutiveExpired >= 5)
    ) {
      ((r.structuralLateness = !0), (r.activatedAtMs = Date.now()));
      const t = rP(e?.fixedDelayMs) || 0,
        i = rP(e?.sttElapsedMs) || 0,
        o = rP(e?.estimatedTranslationLatencyMs) || 0;
      ((r.lastRecommendedDelaySeconds = Math.max(
        2,
        Math.ceil((Math.max(t, i + o) + 1e3) / 1e3),
      )),
        Nx(
          "llm.request.fallback_structural_lateness",
          {
            requestId: n,
            consecutiveExpired: r.consecutiveExpired,
            deadlineMs: a,
            recommendedDelaySeconds: r.lastRecommendedDelaySeconds,
            fixedDelayMs: rP(e?.fixedDelayMs),
            sttElapsedMs: rP(e?.sttElapsedMs),
            estimatedTranslationLatencyMs: rP(e?.estimatedTranslationLatencyMs),
          },
          {
            source: "offscreen",
            requestId: n,
            provider: gc.config?.provider || "",
            level: "warn",
          },
        ),
        vP(
          "delay-undershoot",
          `連續字幕超過顯示期限；下次建議延遲至少 ${r.lastRecommendedDelaySeconds} 秒`,
        ));
    }
    return r;
  }
  return (
    (r.consecutiveExpired = 0),
    (r.consecutiveOnTime += 1),
    r.structuralLateness &&
      r.consecutiveOnTime >= 3 &&
      (Nx(
        "llm.request.fallback_structural_lateness_recovered",
        {
          requestId: n,
          consecutiveOnTime: r.consecutiveOnTime,
          activeForMs: Math.max(0, Date.now() - r.activatedAtMs),
        },
        {
          source: "offscreen",
          requestId: n,
          provider: gc.config?.provider || "",
          level: "info",
        },
      ),
      (gc.originalFallbackDeadlineHealth = dC())),
    gc.originalFallbackDeadlineHealth
  );
}
function mC(e = {}) {
  const t = rP(e?.estimatedTranslationLatencyMs);
  return dP(Math.max(os, null === t ? 0 : t + ls), os, ss);
}
function gC(e = null) {
  return (
    !(!e || zp(e) || !Sg()) &&
    !0 !== gc.mseStartupBoost?.startupReleaseReady &&
    LP(e.sttProvider) === Z &&
    Array.isArray(e.realtimeProcessedAudioRanges) &&
    e.realtimeProcessedAudioRanges.length > 0
  );
}
function pC(e = {}, t = null) {
  const n = zp(t),
    a = gC(t);
  if (!n && !a) return 0;
  if (sC(t, e)) return 0;
  if ("off" === lD(gc.config?.llmFallbackMode)) return 0;
  if (a) {
    const n = qP(gc.mseStartupBoost?.fastProvider || Dl),
      a = dP((So[n] || Ma) + Ki, zi, Qi),
      r = lC(e, t),
      i = null === r ? 0 : Math.max(0, Math.round(r - Wi));
    return Math.max(0, Math.round(a - i));
  }
  const r = rP(e?.effectiveLeadSeconds),
    i = rP(e?.readySubtitleLeadSeconds ?? e?.mseReadySubtitleLeadSeconds),
    o = rP(e?.rawMseLeadSeconds ?? e?.mseLeadSeconds);
  return (null !== r && r >= 1.5) ||
    (null !== i && i >= 1.5) ||
    (null !== o && o >= 4)
    ? ji
    : 0;
}
function fC(e = {}, t = null) {
  const n = lD(gc.config?.llmFallbackMode),
    a = lC(e, t);
  return null === a
    ? "no-playback-deadline"
    : a <= 0
      ? "off" === n
        ? "stt-arrived-after-display-deadline"
        : "stt-arrived-after-translation-deadline"
      : "";
}
function hC(e = "") {
  const t = String(e || "")
    .trim()
    .toLowerCase();
  return t && "auto" !== t
    ? /^(zh|zho|cmn|yue|chinese)/.test(t)
      ? "zh"
      : /^(en|eng|english)/.test(t)
        ? "en"
        : /^(ja|jpn|japanese)/.test(t)
          ? "ja"
          : /^(ko|kor|korean)/.test(t)
            ? "ko"
            : t.split(/[-_]/)[0] || t
    : "auto";
}
function SC(e = null) {
  if (!zp(e)) return !1;
  const t = BC(e),
    n = UC(e);
  return (
    !(null === t || null === n || n <= t) &&
    ou({ readyOnly: !0 }).some((e) => e.start <= t + Qr && e.end >= n - Qr)
  );
}
function MC(e = null, t = null) {
  return (
    !0 === gc.config?.suppressOriginalDeadlineFallback ||
    (!(!Sg() || !zp(e)) && SC(e))
  );
}
function vC(e = null, t = null, n = Date.now()) {
  if ("sql-wallet-v1" !== gc.config?.walletBillingProtocol || zp(e)) return 0;
  if ("tab-capture" !== String(e?.sourceType || e?.audioInputMode || ""))
    return 0;
  if (
    !0 !== gc.sourceMediaTiming?.isLiveStream &&
    !0 !== gc.config?.sourceIsLiveStream
  )
    return 0;
  if (t?.cancelled || t?.displayed || gc.isStopping) return 0;
  const a = rP(t?.translationStartedAtMs),
    r = rP(t?.requestTimeoutMs);
  if (null === a || a <= 0 || null === r || r <= 0) return 0;
  const i = a + Math.min(r + eo, $i);
  return Math.max(0, Math.min(Vi, i - n));
}
function yC(e = null, t = null, n = Date.now()) {
  if (!zp(e)) return 0;
  if ("off" === lD(gc.config?.llmFallbackMode)) return 0;
  if (!0 === gc.sourceMediaTiming?.isLiveStream) return 0;
  const a = Math.max(0, rP(t?.deferredMs) || 0),
    r = Math.max(0, rP(t?.requestTimeoutMs) || 0),
    i = Math.max(0, rP(t?.translationStartedAtMs) || 0);
  if (r > 0 && i > 0) {
    const e = i + r + eo,
      t = Math.max(0, e - n),
      o = Math.max(0, Yi - a);
    if (t > 0 && o > 0) return Math.min(Xi, t, o);
  }
  const o = gc.viewerMediaTiming,
    s = rP(gc.viewerTimingReceivedAt) || rP(o?.wallTimeMs) || 0;
  if (!o || !0 !== o.paused || !0 === o.adPlaying || s <= 0 || n - s > tc)
    return 0;
  const l = Math.max(0, Zi - a);
  return Math.min(Xi, l);
}
function bC({
  text: e,
  timing: t = null,
  isFinal: n = !0,
  requestId: a = 0,
  requestRevision: r = gc.timelineRevision,
  requestContext: i = null,
  translationBudget: o = null,
  translationStartedAt: s = Date.now(),
  requestTimeoutMs: l = 0,
} = {}) {
  const c = {
      scheduled: !1,
      displayed: !1,
      timer: null,
      delayMs: null,
      deferredMs: 0,
      cancelled: !1,
      deadlineMs: rP(lC(o, t)),
      requestTimeoutMs: Math.max(0, rP(l) || 0),
      translationStartedAtMs: Math.max(0, rP(s) || 0),
      skipReason: "",
    },
    d = Boolean(Hk());
  if (!n) return c;
  if (i?.walletRequestState?.originalFallbackAttempted)
    return (
      (c.displayed = !0 === i.walletRequestState.originalFallbackDelivered),
      (c.skipReason = "fallback-already-attempted"),
      c
    );
  if (MC(t, o))
    return (
      (c.skipReason = "translated-target-suppresses-original-fallback"),
      Nx(
        "llm.request.original_fallback_skipped",
        {
          requestId: a,
          reason: c.skipReason,
          sourceLang: gc.config?.sourceLang || "auto",
          targetLang: gc.config?.targetLang || "zh",
          budget: o || null,
        },
        {
          source: "offscreen",
          requestId: a,
          provider: gc.config?.provider || "",
          level: "info",
        },
      ),
      c
    );
  const u = wD(e);
  if (!u) return ((c.skipReason = "empty-original"), c);
  const m = uC(o, t, a);
  if (
    m.structuralLateness &&
    null !== c.deadlineMs &&
    c.deadlineMs <= 0 &&
    "off" !== lD(gc.config?.llmFallbackMode)
  )
    return (
      (c.skipReason = "structural-lateness-await-translation"),
      Nx(
        "llm.request.original_fallback_skipped",
        {
          requestId: a,
          reason: c.skipReason,
          consecutiveExpired: m.consecutiveExpired,
          recommendedDelaySeconds: m.lastRecommendedDelaySeconds,
          budget: o || null,
        },
        {
          source: "offscreen",
          requestId: a,
          provider: gc.config?.provider || "",
          level: "warn",
        },
      ),
      c
    );
  const g = cC(o, t);
  if (null === g)
    return (
      (c.skipReason = fC(o, t)),
      c.skipReason.startsWith("stt-arrived-after-") &&
        Nx(
          "llm.request.original_fallback_skipped",
          { requestId: a, reason: c.skipReason, budget: o || null },
          {
            source: "offscreen",
            requestId: a,
            provider: gc.config?.provider || "",
            level: "warn",
          },
        ),
      c
    );
  ((c.scheduled = !0), (c.delayMs = g));
  const p = pC(o, t),
    f = null !== c.deadlineMs && c.deadlineMs <= 0 ? g : 0;
  (p > 0 || f > 0) &&
    Nx(
      "llm.request.original_fallback_delayed",
      {
        requestId: a,
        delayMs: g,
        graceMs: Math.max(p, f),
        deadlineMs: c.deadlineMs,
        structuralLateness: m.structuralLateness,
        consecutiveExpired: m.consecutiveExpired,
        budget: o || null,
      },
      {
        source: "offscreen",
        requestId: a,
        provider: gc.config?.provider || "",
        level: "info",
      },
    );
  const h = async () => {
    if (
      ((c.timer = null),
      c.cancelled || c.displayed || gc.isStopping || r !== gc.timelineRevision)
    )
      return;
    if (
      sE(i, "deadline-fallback", {
        requestId: a,
        provider: gc.config?.provider || "",
      })
    )
      return;
    if (d) {
      const e = tC(t),
        n = cC(e, t);
      if (null !== n && n > 0)
        return void (c.timer = setTimeout(h, Math.min(250, n)));
      !Hk() &&
        Number.isFinite(e.remainingDeadlineMs) &&
        (c.requestTimeoutMs = Math.min(
          c.requestTimeoutMs,
          Math.max(
            0,
            Date.now() - c.translationStartedAtMs + e.remainingDeadlineMs,
          ),
        ));
    }
    const e = vC(t, c),
      n = e || yC(t, c);
    if (n > 0) {
      const r = c.deferredMs <= 0;
      if (((c.deferredMs += n), r)) {
        const r =
          c.requestTimeoutMs > 0 &&
          c.translationStartedAtMs > 0 &&
          Date.now() < c.translationStartedAtMs + c.requestTimeoutMs + eo;
        Nx(
          e > 0
            ? "llm.request.original_fallback_pending_translation_deferred"
            : r
              ? "llm.request.original_fallback_inflight_deferred"
              : "llm.request.original_fallback_paused_viewer_deferred",
          {
            requestId: a,
            deferMs: n,
            maxDeferMs: e > 0 ? $i : r ? Yi : Zi,
            requestTimeoutMs: c.requestTimeoutMs,
            deadlineMs: c.deadlineMs,
            viewerMediaTime: rP(gc.viewerMediaTiming?.currentTime),
            mediaStartTime: aP(BC(t)),
            mediaEndTime: aP(UC(t)),
          },
          {
            source: "offscreen",
            requestId: a,
            provider: gc.config?.provider || "",
            level: "info",
          },
        );
      }
      c.timer = setTimeout(h, n);
    } else
      c.displayed = await CA({
        text: u,
        timing: t,
        error: new Error("translation deadline reached before LLM response"),
        requestId: a,
        requestContext: i,
        translationStartedAt: s,
        splitReason: "llm-deadline-fallback-original",
        segmentationMethod: "deadline_fallback_original",
        segmentationReason:
          "LLM did not finish before the playback deadline; displayed source text to preserve subtitle timing",
        fallbackReason: "translation-deadline",
        logLevel: "warn",
      });
  };
  return ((c.timer = setTimeout(h, d ? Math.min(250, g) : g)), c);
}
function TC(e = null) {
  (e && (e.cancelled = !0),
    e?.timer && (clearTimeout(e.timer), (e.timer = null)));
}
function wC(e = null, t = Date.now()) {
  if ("sql-wallet-v1" !== gc.config?.walletBillingProtocol || !zp(e)) return !0;
  if (Hk(t)) return !0;
  const n = UC(e),
    a = Nk(t);
  return null === n || null === a || n > a;
}
function kC(e = [], t = null, n = Date.now()) {
  if ("sql-wallet-v1" !== gc.config?.walletBillingProtocol || !zp(t) || Hk(n))
    return e;
  const a = Nk(n);
  return null === a
    ? e
    : e.filter((e) => {
        const t = rP(e.mediaTimeEnd ?? e.audioEndMediaTime ?? e.mediaEndTime);
        return null === t || t > a;
      });
}
function CC(e = [], t = null) {
  if ("sql-wallet-v1" !== gc.config?.walletBillingProtocol || !zp(t)) return e;
  const n = e.map((e) => ({ ...e })),
    a = (e) => Number(e.mediaTimeEnd) - Number(e.mediaTime),
    r = (e, t) => {
      if (
        e.translationQualityFallback ||
        t.translationQualityFallback ||
        e.fallbackDisplayed ||
        t.fallbackDisplayed ||
        (e.speakerId || e.speaker_id || "") !==
          (t.speakerId || t.speaker_id || "")
      )
        return null;
      const n = rP(e.mediaTime),
        a = rP(t.mediaTimeEnd),
        r = Number(t.mediaTime) - Number(e.mediaTimeEnd),
        i = `${e.original || ""} ${t.original || ""}`.trim(),
        o = `${e.translation || ""} ${t.translation || ""}`.trim();
      return null === n ||
        null === a ||
        !Number.isFinite(r) ||
        r > 0.35 ||
        r < -0.35 ||
        a - n > 8 ||
        i.length > 168 ||
        o.length > 52
        ? null
        : {
            ...e,
            original: i,
            translation: o,
            mediaTimeEnd: a,
            audioEndMediaTime: a,
            isComplete: !1 !== e.isComplete && !1 !== t.isComplete,
            segmentationMethod: "mse-readability-merge",
          };
    };
  for (let e = 0; e < n.length; e++) {
    if (!(a(n[e]) > 0 && a(n[e]) < 1.5)) continue;
    const t = e > 0 ? r(n[e - 1], n[e]) : null;
    if (t) {
      (n.splice(e - 1, 2, t), (e = Math.max(-1, e - 2)));
      continue;
    }
    const i = e + 1 < n.length ? r(n[e], n[e + 1]) : null;
    i && (n.splice(e, 2, i), e--);
  }
  return n.map((e, t) => ({ ...e, order: t }));
}
function AC(e, t = {}) {
  const n = EC(t),
    a = PC(n),
    r = e
      ? {
          critical: { maxOriginalChars: 260, maxSegments: 2 },
          tight: { maxOriginalChars: 360, maxSegments: 2 },
          balanced: { maxOriginalChars: 520, maxSegments: 3 },
          relaxed: { maxOriginalChars: 700, maxSegments: 4 },
          unknown: { maxOriginalChars: 420, maxSegments: 3 },
        }
      : {
          critical: { maxOriginalChars: 240, maxSegments: 2 },
          tight: { maxOriginalChars: 360, maxSegments: 3 },
          balanced: { maxOriginalChars: 650, maxSegments: 5 },
          relaxed: { maxOriginalChars: 1e3, maxSegments: 8 },
          unknown: { maxOriginalChars: 600, maxSegments: 5 },
        },
    i = r[a] || r.unknown,
    o = iP(gc.config?.maxOriginalChars),
    s = iP(gc.config?.maxSegments);
  return {
    latencyMode: a,
    latencySlackMs: n,
    maxOriginalChars:
      null !== o ? Math.min(o, i.maxOriginalChars) : i.maxOriginalChars,
    maxSegments: null !== s ? Math.min(s, i.maxSegments) : i.maxSegments,
  };
}
function RC(e = "") {
  const t = wD(e);
  if (!t) return 0;
  const n = t.match(/[。．！？!?…]+|[.](?=\s|$)/g);
  return n ? n.length : 0;
}
function xC(e, t, n) {
  if (!e) return t;
  const a = Array.from(wD(n)).length;
  if (!a) return t;
  const r = JT("original"),
    i = QT(n),
    o = Math.max(RC(n), Math.ceil(a / Va), Math.ceil(i / r)),
    s = iP(gc.config?.maxSegments),
    l = dP(Math.max(t.maxSegments, o), t.maxSegments, ja),
    c = null !== s ? Math.min(l, s) : l;
  return {
    ...t,
    maxOriginalChars: dP(Math.max(t.maxOriginalChars, a), 120, $a),
    maxSegments: c,
    inputCharCount: a,
    maxSegmentOriginalChars: XT("original", n),
    maxSegmentTranslationChars: XT(
      "translation",
      gc.config?.targetLang || "zh",
    ),
    preservesFullFinalInput: a <= $a,
  };
}
function EC(e = {}) {
  const t = rP(e.estimatedTranslationLatencyMs);
  if (null === t) return null;
  const n = [],
    a = rP(e.remainingDeadlineMs);
  null !== a && n.push(a - t);
  const r = rP(e.fixedDelayMs),
    i = rP(e.sttElapsedMs);
  return (
    null !== r && null !== i && n.push(r - i - t),
    n.length ? Math.round(Math.min(...n)) : null
  );
}
function PC(e) {
  const t = rP(e);
  return null === t
    ? "unknown"
    : t <= Ii
      ? "critical"
      : t <= Li
        ? "tight"
        : t <= _i
          ? "balanced"
          : "relaxed";
}
function DC(e = null, t = Date.now()) {
  const n = rP(e?.sttUploadLatencyMs);
  if (null !== n) return dP(Math.round(n), 0, 6e4);
  const a = rP(e?.transcriptReceivedAtMs) || t,
    r = rP(e?.sourceWallTimeMs);
  if (null !== r) return dP(Math.round(a - r), 0, 6e4);
  const i = rP(e?.fallbackLagSeconds);
  return null !== i ? dP(Math.round(1e3 * i), 0, 6e4) : null;
}
function IC() {
  if (WT()) return as;
  const e = Ck();
  if (e >= da) return va;
  const t = Ik(e, 6, da, ya, 0);
  return va + t;
}
function LC() {
  return WT() && "off" !== lD(gc.config?.llmFallbackMode) ? is : 0;
}
function _C() {
  if (WT()) return rs;
  const e = Ck();
  if (e >= da) return ba;
  const t = Ik(e, 6, da, ba, 0);
  return ba + t;
}
function BC(e = null) {
  if (!e) return null;
  if (e.preserveExplicitMediaRange) {
    const t = sP([
      e.sourceMediaStartTime,
      e.audioStartMediaTime,
      e.displayAfterMediaTimeStart,
      e.mediaStartTime,
    ]);
    if (null !== t) return t;
  }
  const t = sP(
    (Array.isArray(e.words) ? e.words : []).map((e) => e.mediaStartTime),
  );
  if (null !== t) return t;
  const n = sP([
    e.sourceMediaStartTime,
    e.audioStartMediaTime,
    e.displayAfterMediaTimeStart,
    e.mediaStartTime,
  ]);
  if (null !== n) return n;
  const a = rP(e.mediaTime);
  if (null === a) return null;
  const r = rP(e.audioDurationMs);
  return null !== r && r > 0 ? Math.max(0, a - r / 1e3) : a;
}
function UC(e = null) {
  if (!e) return null;
  if (e.preserveExplicitMediaRange) {
    const t = sP([
      e.sourceMediaEndTime,
      e.mediaEndTime,
      e.mediaTimeEnd,
      e.audioEndMediaTime,
      e.displayAfterMediaTimeEnd,
    ]);
    if (null !== t) return t;
  }
  const t = lP(
    (Array.isArray(e.words) ? e.words : []).map((e) => e.mediaEndTime),
  );
  if (null !== t) return t;
  const n = sP([
    e.sourceMediaEndTime,
    e.mediaEndTime,
    e.mediaTimeEnd,
    e.audioEndMediaTime,
    e.displayAfterMediaTimeEnd,
  ]);
  return null !== n ? n : rP(e.mediaTime);
}
function qC() {
  const e = FC();
  if (!gc.translationLatencySamples.length) return e;
  const t = [...gc.translationLatencySamples].sort((e, t) => e - t),
    n = OC(),
    a = t[Math.min(t.length - 1, Math.ceil(t.length * n) - 1)] || e;
  return Math.max(e, a);
}
function FC() {
  return So[gc.config?.provider] || Ma;
}
function OC() {
  const e = qP(gc.config?.provider);
  return "lt-c" === e || "lt-d" === e ? 0.9 : 0.85;
}
function NC(e) {
  const t = rP(e);
  null === t ||
    t <= 0 ||
    (gc.translationLatencySamples.push(t),
    gc.translationLatencySamples.length > wa &&
      (gc.translationLatencySamples = gc.translationLatencySamples.slice(-20)));
}
function HC(e = {}) {
  if (!Ak()) return;
  const t = rP(e.pipelineLatencyMs);
  if (null === t || t <= 0) return;
  WC(t);
  const n = wk(),
    a = $C(n);
  null !== a && (Math.abs(a - n) < 0.05 || (gc.adaptiveSyncDelaySeconds = a));
}
function GC(e = {}) {
  if (!Ak()) return;
  const t = wk(),
    n = rP(e.fixedDelayMs) || 1e3 * t,
    a =
      ((rP(e.sttElapsedMs) || 0) +
        (rP(e.estimatedTranslationLatencyMs) || qC()) +
        ro) /
      1e3;
  gc.adaptiveSyncDelaySeconds = dP(
    a <= n / 1e3 + 0.35 ? t + 1 : Math.min(a, t + 1),
    2,
    ma,
  );
}
function WC(e) {
  const t = rP(e);
  null === t ||
    t <= 0 ||
    (gc.pipelineLatencySamples.push(t),
    gc.pipelineLatencySamples.length > oo &&
      (gc.pipelineLatencySamples = gc.pipelineLatencySamples.slice(-80)),
    KC(t),
    (gc.pipelineLatencyStats = jC(gc.pipelineLatencySamples)));
}
function $C(e = wk()) {
  const t = zC(),
    n = t.samples.length >= 5,
    a = n ? t.samples : VC(gc.pipelineLatencySamples, so);
  if (
    ((gc.pipelineLatencyStats = jC(a, n ? t.source : "pipeline:recent")),
    a.length < 5)
  )
    return null;
  const r = gc.pipelineLatencyStats,
    i =
      (1e3 *
        (a.length >= 20
          ? r.p97Seconds
          : a.length >= 12
            ? r.p95Seconds
            : r.p80Seconds) +
        ro) /
      1e3,
    o = rP(gc.adaptiveSyncDelaySeconds),
    s = null !== o ? o : e;
  return dP(i > s ? Math.min(i, s + 1) : Math.max(i, s - uo), 2, ma);
}
function VC(e, t) {
  return (Array.isArray(e) ? e : [])
    .slice(-t)
    .map(rP)
    .filter((e) => null !== e && e > 0);
}
function jC(e = [], t = "pipeline") {
  const n = VC(e, e.length || 0);
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
    r = (e) => {
      const t = Math.min(
        a.length - 1,
        Math.max(0, Math.ceil(a.length * e) - 1),
      );
      return a[t] / 1e3;
    },
    i = r(0.95),
    o = r(0.99);
  return {
    source: t,
    sampleCount: a.length,
    p50Seconds: r(0.5),
    p80Seconds: r(0.8),
    p90Seconds: r(0.9),
    p95Seconds: i,
    p97Seconds: r(co),
    p99Seconds: o,
    tailGapSeconds: Math.max(0, o - i),
  };
}
function KC(e, t = Date.now()) {
  const n = rP(e);
  if (null === n || n <= 0) return;
  const a = eA(t);
  for (const e of [ZC(), "all"]) {
    const r = JC(e, a);
    r.samples = XC([...(r.samples || []), { ms: n, t: t }]);
  }
}
function zC(e = Date.now()) {
  const t = tA(e),
    n = ZC(),
    a = QC(n, t);
  if (a.length >= 5)
    return { samples: a, source: `pipeline:time ${aA(e)} ${n}` };
  const r = "all" === n ? [] : QC("all", t);
  return r.length >= 5
    ? { samples: r, source: `pipeline:time ${aA(e)} all` }
    : { samples: [], source: "" };
}
function QC(e, t = []) {
  const n = gc.pipelineLatencyBuckets?.[YC(e)] || {};
  return t.flatMap((e) => XC(n[e]?.samples || []).map((e) => e.ms));
}
function JC(e, t) {
  const n = YC(e);
  return (
    (gc.pipelineLatencyBuckets[n] = gc.pipelineLatencyBuckets[n] || {}),
    (gc.pipelineLatencyBuckets[n][t] = gc.pipelineLatencyBuckets[n][t] || {
      samples: [],
    }),
    gc.pipelineLatencyBuckets[n][t]
  );
}
function XC(e = []) {
  const t = Date.now();
  return (Array.isArray(e) ? e : [])
    .map((e) =>
      "number" == typeof e ? { ms: e, t: t } : { ms: rP(e?.ms), t: rP(e?.t) },
    )
    .filter((e) => null !== e.ms && e.ms > 0 && null !== e.t && t - e.t <= fo)
    .slice(-80);
}
function ZC() {
  return YC(gc.config?.provider || gc.llmUsage?.provider || "default");
}
function YC(e) {
  return (
    String(e || "default")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9._:-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "default"
  );
}
function eA(e = Date.now()) {
  const t = nA(e);
  return `h${String(t).padStart(2, "0")}`;
}
function tA(e = Date.now()) {
  const t = nA(e);
  return [(t - 2 + 24) % 24, t, (t + 2) % 24].map(
    (e) => `h${String(e).padStart(2, "0")}`,
  );
}
function nA(e = Date.now()) {
  const t = new Date(e).getHours();
  return 2 * Math.floor(t / 2);
}
function aA(e = Date.now()) {
  const t = nA(e),
    n = (t + 2) % 24;
  return `h${String(t).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function rA(e) {
  return e ? !iA() : cA() > 0;
}
function iA() {
  return dA() < oA();
}
function oA() {
  return Ua;
}
function sA(e, t) {
  (uA().set(t, { isFinal: Boolean(e), startedAtMs: Date.now() }),
    gA(),
    (gc.isTranslating = !0),
    (gc.activeTranslationRequestId = t));
}
function lA(e, t) {
  (uA().delete(t) && gA(),
    gc.isTranslating
      ? gc.activeTranslationRequestId === t &&
        (gc.activeTranslationRequestId = mA())
      : (gc.activeTranslationRequestId = 0),
    pA());
}
function cA() {
  return gc.activeTranslationRequests instanceof Map &&
    gc.activeTranslationRequests.size > 0
    ? gc.activeTranslationRequests.size
    : Math.max(0, Math.round(Number(gc.activeTranslationCount) || 0)) ||
        (gc.isTranslating ? 1 : 0);
}
function dA() {
  if (
    gc.activeTranslationRequests instanceof Map &&
    gc.activeTranslationRequests.size > 0
  ) {
    let e = 0;
    for (const t of gc.activeTranslationRequests.values())
      t?.isFinal && (e += 1);
    return e;
  }
  return Math.max(0, Math.round(Number(gc.activeFinalTranslationCount) || 0));
}
function uA() {
  return (
    gc.activeTranslationRequests instanceof Map ||
      (gc.activeTranslationRequests = new Map()),
    gc.activeTranslationRequests
  );
}
function mA() {
  const e = uA();
  let t = 0;
  for (const n of e.keys()) {
    const e = Math.round(Number(n) || 0);
    e > t && (t = e);
  }
  return t;
}
function gA() {
  const e = uA();
  ((gc.activeTranslationCount = e.size),
    (gc.activeFinalTranslationCount = Array.from(e.values()).filter(
      (e) => e?.isFinal,
    ).length),
    (gc.isTranslating = gc.activeTranslationCount > 0));
}
function pA() {
  for (; gc.pendingFinalTranslation && iA(); ) {
    const e = jR();
    if (!e || !e.isFinal) break;
    wA(e.text, {
      isFinal: !0,
      timing: e.timing || null,
      interimVersion: e.interimVersion ?? null,
      retryCount: e.retryCount || 0,
      providerOverride: e.providerOverride || null,
      requestContext: e.requestContext || null,
    });
  }
  if (
    (gc.finalTranslationBatch.length &&
      iA() &&
      (Bk({
        segmentCount: gc.finalTranslationBatch.length,
        totalChars: Array.from(
          gc.finalTranslationBatch.map((e) => e.text).join(" "),
        ).length,
      })
        ? Nw({ force: !0 })
        : Bw()),
    !gc.pendingFinalTranslation && gc.pendingInterimTranslation && 0 === cA())
  ) {
    const e = jR();
    e &&
      wA(e.text, {
        isFinal: e.isFinal,
        timing: e.timing || null,
        interimVersion: e.interimVersion ?? null,
        retryCount: e.retryCount || 0,
        providerOverride: e.providerOverride || null,
        requestContext: e.requestContext || null,
      });
  }
}
function fA(e) {
  return qP(e) === Se;
}
function hA(e = gc.config?.targetLang) {
  const t = String(e || "zh")
    .toLowerCase()
    .trim()
    .replace(/_/g, "-");
  return "zh" === t || "zho" === t || "zh-hant" === t || "zh-tw" === t;
}
function SA(e, t, n) {
  const a = Math.max(250, Math.round(Number(t) || 0));
  let r = null;
  return Promise.race([
    e,
    new Promise((e, t) => {
      r = setTimeout(() => t(new Error(`${n}逾時`)), a);
    }),
  ]).finally(() => clearTimeout(r));
}
async function MA({ text: e, originalText: t, requestId: n, timeoutMs: a }) {
  const r = Date.now(),
    i = await SA(
      xd(),
      Math.min(Math.max(1e3, Number(a) || be), be),
      "Salad 即譯實驗引擎 連線",
    );
  if (
    !1 === gc.textEngineGAccepting ||
    i !== gc.textEngineGSocket ||
    i.readyState !== WebSocket.OPEN ||
    !0 !== i.__textEngineGReady
  )
    throw new Error("Salad 即譯實驗引擎 WebSocket 尚未就緒");
  const o = r + Math.max(500, Number(a) || Te),
    s = Math.max(1, Math.round(Number(i.__textEngineGMaxInflight || 1)));
  for (; qd(i.__textEngineGConnectionId) >= s; ) {
    if (
      Date.now() >= o ||
      i !== gc.textEngineGSocket ||
      i.readyState !== WebSocket.OPEN ||
      !0 !== i.__textEngineGReady
    ) {
      const e = new Error("Salad 即譯實驗引擎 inflight 額度等待逾時");
      throw ((e.code = "textEngineG_inflight_timeout"), e);
    }
    await new Promise((e) => setTimeout(e, 10));
  }
  gc.textEngineGRequestSequence =
    Math.max(0, Number(gc.textEngineGRequestSequence) || 0) + 1;
  const l = `opus-${gc.timelineRevision}-${n}-${gc.textEngineGRequestSequence}`,
    c = Math.max(500, Math.round((Number(a) || be) - (Date.now() - r)));
  return new Promise((a, o) => {
    const s = setTimeout(() => {
      gc.textEngineGPending.delete(l);
      const e = new Error("Salad 即譯實驗引擎 翻譯逾時");
      ((e.code = "textEngineG_timeout"), o(e));
    }, c);
    gc.textEngineGPending.set(l, {
      connectionId: i.__textEngineGConnectionId,
      originalText: t,
      requestId: n,
      startedAtMs: r,
      timeout: s,
      resolve: a,
      reject: o,
    });
    try {
      i.send(
        JSON.stringify({
          type: "translate",
          id: l,
          text: e,
          source_language: "en",
          target_language: "zh_Hant",
        }),
      );
    } catch (e) {
      (gc.textEngineGPending.delete(l), clearTimeout(s), o(e));
    }
  });
}
function vA(e = {}, t = "") {
  const n = wD(t),
    a = wD(e.translation || ""),
    r = e.quality && "object" == typeof e.quality ? e.quality : null;
  if (!1 === r?.ok) {
    const e = Array.isArray(r.reasons)
        ? r.reasons.filter(Boolean).join(",")
        : "quality_failed",
      t = new Error(
        `Salad 即譯實驗引擎 quality check failed: ${e || "quality_failed"}`,
      );
    throw ((t.code = "textEngineG_quality_failed"), (t.quality = r), t);
  }
  if (!n || !AD(a)) {
    const e = new Error("Salad 即譯實驗引擎 returned an empty translation");
    throw ((e.code = "textEngineG_empty_translation"), e);
  }
  const i = Math.max(0, Math.round(Number(e.input_tokens || 0))),
    o = Math.max(0, Math.round(Number(e.output_tokens || 0)));
  return {
    original: n,
    processedText: n,
    translation: a,
    segments: [
      {
        id: String(e.request_id || "opus-segment-1"),
        order: 0,
        original: n,
        translation: a,
        segmentationMethod: "textEngineG_direct_piece",
        splitReason: "client-timed-final-piece",
        isComplete: !0,
      },
    ],
    segmentation: { method: "textEngineG_direct_piece", segmentCount: 1 },
    detectedLang: e.source_language || "en",
    translatedTo: e.target_language || "zh_Hant",
    provider: Se,
    providerName: e.model || "Salad 即譯實驗引擎",
    model: e.model || "",
    queueId: e.batch?.id || null,
    latencyMs: Number(e.timing?.total_ms || 0) || null,
    usage: null,
    textEngineGUsage: {
      inputTokens: i,
      outputTokens: o,
      visibleOutputTokens: o,
      totalTokens: i + o,
    },
    quality: r,
    textEngineGTiming: e.timing || null,
    textEngineGBatch: e.batch || null,
  };
}
function yA() {
  return (
    gc.walletCaptionTransport ||
      (gc.walletCaptionTransport = window.LiveSubtitleWalletTransport.create({
        report: (e) =>
          Nx("caption.transport.completed", e, {
            source: "offscreen",
            requestId: e.requestId,
            level: e.errorCode ? "warn" : "info",
          }),
      })),
    gc.walletCaptionTransport
  );
}
async function bA(e, t) {
if(gc.remoteSessionStartPromise) await gc.remoteSessionStartPromise;
  const localId=gc.sessionId;
  const ids=[...new Set(e.walletSttRequestIds||[])];
  if(!ids.length) throw new Error('字幕缺少對應的 Textamisu 語音辨識工作');
  const source=(!e.sourceLang||e.sourceLang==='auto') ? ids.map(id=>gc.textamisuSttLanguages?.get(id)).find(Boolean) : e.sourceLang;
  const data=await TextamisuPipeline.translate(localId,{requestId:String(e.requestId),sttRequestIds:ids,text:e.text,sourceLanguage:TextamisuPipeline.language(source),targetLanguage:TextamisuPipeline.language(e.targetLang),previousSourceContext:String(e.previousSourceContext||'').slice(-1500)});
  if(gc.sessionId!==localId || gc.isStopping) throw new Error('字幕工作階段已切換');
  return {...data,original:e.text,provider:'textamisu',usage:null};
}
async function TA({
  requestProvider: e,
  isFinal: t,
  text: n,
  originalText: a,
  requestId: r,
  timeoutMs: i,
  httpBody: o,
}) {
return bA(o,i);
}
async function wA(
  e,
  {
    isFinal: t,
    timing: n = null,
    interimVersion: a = null,
    retryCount: r = 0,
    providerOverride: i = null,
    requestContext: o = null,
  },
) {
  if (gc.isStopping) return;
  if (!t && !KR(a)) return;
  const s = Gy(i || gc.config?.provider || "lt-e"),
    l = o || nE();
  if (
    sE(l, "translation-before-start", {
      provider: s,
      isFinal: Boolean(t),
      retryCount: r,
    })
  )
    return;
  if (rA(t)) return void $R(e, t, n, a, r, s, l);
  const c = gc.translationRequestId + 1;
  ((gc.translationRequestId = c),
    sA(t, c),
    t && (gc.subtitlePipelineStats.translationRequests += 1));
  const d = gc.timelineRevision,
    u = {
      ...l,
      requestId: c,
      walletRequestSequence: l.walletRequestSequence ?? c,
      walletRequestState: l.walletRequestState || {},
      timelineRevision: d,
    };
  let m = null,
    g = Date.now(),
    p = null;
  try {
    if (
      sE(u, "translation-start", {
        provider: s,
        isFinal: Boolean(t),
        retryCount: r,
      })
    )
      return;
    g = Date.now();
    const i = IR(e, n);
    if (!i.text) return;
    if (!t && !KR(a)) return;
    m = tC(n, g);
    const o = xC(t, AC(t, m), i.text),
      l = String(u.mediaContextKey || tE() || ""),
      f = l.startsWith("youtube:") ? l.slice(8) : "",
      h = eM(f),
      S = tM(f),
      M = dA(),
      v = oA(),
      y = aC(m, t, s);
    (t && ah(n, "translation-started", { requestId: c, timelineRevision: d }),
      (p = bC({
        text: e,
        timing: n,
        isFinal: t,
        requestId: c,
        requestRevision: d,
        requestContext: u,
        translationBudget: m,
        translationStartedAt: g,
        requestTimeoutMs: y,
      })),
      Nx(
        "llm.request.start",
        {
          llmFallbackMode: lD(gc.config?.llmFallbackMode),
          requestId: c,
          isFinal: Boolean(t),
          retryCount: r,
          sttSegmentId: n?.sttSegmentId ?? null,
          sttSegmentIds: Array.isArray(n?.sttSegmentIds)
            ? n.sttSegmentIds
            : null != n?.sttSegmentId
              ? [n.sttSegmentId]
              : [],
          mediaStartTime: aP(BC(n)),
          mediaEndTime: aP(UC(n)),
          batchSize: Math.max(1, Math.round(rP(n?.batchSize) || 1)),
          inputChars: Array.from(i.text).length,
          originalChars: Array.from(wD(e)).length,
          translationKeywordCount: h.length,
          translationContextChars: Array.from(S).length,
          overlapChars: i.overlapChars,
          trimDisabledReason: i.trimDisabledReason || "",
          provider: s,
          requestTimeoutMs: y,
          syncDelaySeconds: rP(gc.config.syncDelaySeconds),
          baseSyncDelaySeconds: rP(gc.config.baseSyncDelaySeconds),
          batchWaitSeconds: rP(gc.config.batchWaitSeconds),
          effectiveSyncDelaySeconds: rP(gc.config.effectiveSyncDelaySeconds),
          budget: m,
          requestPlan: o,
          activeFinalRequestsAtStart: M,
          maxFinalTranslationRequests: v,
        },
        { source: "offscreen", requestId: c, provider: s },
      ));
    const b = {
        text: i.text,
        originalText: e,
        displayedOriginalText: gc.displayedOriginalText,
        scheduledOriginalText: gc.scheduledOriginalText,
        previousSourceContext: _R(),
        translationKeywords: h,
        translationContext: S,
        displayedOverlapChars: i.overlapChars,
        knownOverlapChars: i.overlapChars,
        sessionId: u.sessionId || gc.sessionId || null,
        requestId: c,
        walletRequestSequence: u.walletRequestSequence,
        walletRequestState: u.walletRequestState,
        captureGeneration: u.captureGeneration,
        authUid: u.authUid,
        pageUrl: u.pageUrl || gc.config?.pageUrl || "",
        mediaContextKey: u.mediaContextKey || "",
        videoKey: u.mediaContextKey || tE() || "",
        mediaStartTime: BC(n),
        mediaEndTime: UC(n),
        walletSttRequestIds: n?.walletSttRequestIds || [], timelineRevision: d,
        sourceIsLiveStream: !0 === gc.config?.sourceIsLiveStream,
        sourceLang: gc.config.sourceLang || "auto",
        targetLang: gc.config.targetLang || "zh",
        isFinal: t,
        maxOriginalChars: o.maxOriginalChars,
        maxSegments: o.maxSegments,
        maxSegmentOriginalChars: o.maxSegmentOriginalChars ?? null,
        maxSegmentTranslationChars: o.maxSegmentTranslationChars ?? null,
        segmentationMode: gc.config.segmentationMode || "auto",
        provider: s,
        llmFallbackMode: gc.config.llmFallbackMode || "auto",
        syncDelaySeconds: rP(gc.config.syncDelaySeconds),
        baseSyncDelaySeconds: rP(gc.config.baseSyncDelaySeconds),
        batchWaitSeconds: rP(gc.config.batchWaitSeconds),
        effectiveSyncDelaySeconds: rP(gc.config.effectiveSyncDelaySeconds),
        translationDeadlineMs: m.remainingDeadlineMs,
        translationDisplayDeadlineMs: m.displayDeadlineMs,
        translationEndDeadlineMs: m.remainingDeadlineMs,
        translationRequestTimeoutMs: y,
        sttElapsedMs: m.sttElapsedMs,
        estimatedTranslationLatencyMs: m.estimatedTranslationLatencyMs,
        latencyMode: o.latencyMode,
        latencySlackMs: o.latencySlackMs,
        translationBudget: {
          ...m,
          requestTimeoutMs: y,
          translationRequestTimeoutMs: y,
          requestPlan: o,
        },
        translationStyle: gc.config.translationStyle || "",
      },
      T = await TA({
        requestProvider: s,
        isFinal: t,
        text: i.text,
        originalText: i.text,
        requestId: c,
        timeoutMs: y,
        httpBody: b,
      });
    TC(p);
    const w = Date.now();
    if (
      sE(u, "translation-response", {
        requestId: c,
        provider: T.provider || s || "",
        latencyMs: Date.now() - g,
      })
    )
      return;
    const k = qP(gc.config?.provider || "lt-e"),
      C = qP(T.provider || s),
      A = Boolean(Rw(n) && s === yw() && s !== k);
    if (
      (FE(T.usage, T.pricing, C || s, T.providerName, {
        fallbackFromProvider: T.fallbackFromProvider || (A ? k : ""),
        fallbackReason:
          T.fallbackReason ||
          (A
            ? `STT deadline hedge (${n.sttDeadlineHedgeWinnerProvider || "fallback"}) left limited translation runway`
            : ""),
        fallbackKind: T.fallbackKind || (A ? "deadline_rescue" : ""),
      }),
      A &&
        Nx(
          "llm.request.stt_deadline_rescue",
          {
            requestId: c,
            fromProvider: k,
            toProvider: C || s,
            sttWinnerProvider: n.sttDeadlineHedgeWinnerProvider || "",
            sttWinnerRole: n.sttDeadlineHedgeWinnerRole || "",
            sttTriggerReason: n.sttDeadlineHedgeTriggerReason || "",
            sttReserveMs: Math.round(rP(n.sttDeadlineHedgeReserveMs) || 0),
          },
          {
            source: "offscreen",
            requestId: c,
            provider: C || s,
            level: "warn",
          },
        ),
      NE(),
      gc.isStopping || d !== gc.timelineRevision)
    )
      return void Nx(
        "llm.response.ignored",
        {
          requestId: c,
          isFinal: Boolean(t),
          retryCount: r,
          reason: gc.isStopping
            ? "capture-stopping"
            : "timeline-revision-changed",
          requestRevision: d,
          currentRevision: gc.timelineRevision,
          provider: T.provider || s || "",
          latencyMs: Date.now() - g,
        },
        {
          source: "offscreen",
          requestId: c,
          provider: T.provider || s || "",
          level: "warn",
        },
      );
    const R = Boolean(p?.displayed);
    if (
      (R &&
        Nx(
          "llm.response.late_after_original_fallback",
          {
            requestId: c,
            isFinal: Boolean(t),
            retryCount: r,
            reason: "translation-arrived-after-original-fallback",
            requestRevision: d,
            currentRevision: gc.timelineRevision,
            provider: T.provider || s || "",
            latencyMs: Date.now() - g,
            fallbackDelayMs: p.delayMs,
            remainingDeadlineMs: p.deadlineMs,
          },
          {
            source: "offscreen",
            requestId: c,
            provider: T.provider || s || "",
            level: "warn",
          },
        ),
      !t && !KR(a))
    )
      return;
    NC(w - g);
    const x = rR(n, w, g);
    (HC(x), (gc.lastPipelineLatency = iR(x)));
    const E = CC(oR(ow(IA(T, e), { timing: x }), x, i.text), x),
      P = kC(E, x),
      D = E.length - P.length;
    if (
      D &&
      (nx("translation-piece-expired", D, { start: BC(x), end: UC(x) }),
      Nx(
        "llm.response.expired_pieces_removed",
        { requestId: c, droppedSegments: D, retainedSegments: P.length },
        { source: "offscreen", requestId: c, level: "warn" },
      ),
      !P.length)
    )
      return (
        hw(x, "display-window-expired"),
        void ah(x, "ignored", {
          requestId: c,
          done: !0,
          active: !1,
          reason: "display-window-expired",
        })
      );
    const I = Em(P, x);
    if (t && Pm(I, R))
      return (
        hw(x, "ready-coverage-won-race"),
        cw(x),
        Nx(
          "llm.response.ignored",
          {
            requestId: c,
            isFinal: Boolean(t),
            retryCount: r,
            reason: I.reason,
            requestRevision: d,
            currentRevision: gc.timelineRevision,
            provider: T.provider || s || "",
            latencyMs: Date.now() - g,
            mediaStartTime: aP(I.range?.start),
            mediaEndTime: aP(I.range?.end),
            coverageRatio: aP(I.coverageRatio),
            coveredSeconds: aP(I.coveredSeconds),
          },
          {
            source: "offscreen",
            requestId: c,
            provider: T.provider || s || "",
            level: "warn",
          },
        ),
        void ah(x, "ignored", {
          requestId: c,
          timelineRevision: d,
          reason: I.reason,
          done: !0,
          active: !1,
        })
      );
    t &&
      I.ignored &&
      R &&
      Nx(
        "llm.response.ready_coverage_replacement",
        {
          requestId: c,
          reason: "replace-original-fallback",
          mediaStartTime: aP(I.range?.start),
          mediaEndTime: aP(I.range?.end),
          coverageRatio: aP(I.coverageRatio),
          coveredSeconds: aP(I.coveredSeconds),
        },
        { source: "offscreen", requestId: c, provider: T.provider || s || "" },
      );
    const L = P.map((e) => e.translation).join(" ");
    if (!L)
      throw (
        t && (gc.subtitlePipelineStats.emptyTranslations += 1),
        new Error(T?.error || "empty translation response")
      );
    if (!wC(x))
      return (
        hw(x, "display-window-expired"),
        nx("translation-display-expired", 1, { start: BC(x), end: UC(x) }),
        ah(x, "ignored", {
          requestId: c,
          done: !0,
          active: !1,
          reason: "display-window-expired",
        }),
        void Nx(
          "llm.response.ignored",
          {
            requestId: c,
            reason: "display-window-expired",
            mediaStartTime: aP(BC(x)),
            mediaEndTime: aP(UC(x)),
          },
          { source: "offscreen", requestId: c, level: "warn" },
        )
      );
    TC(p);
    const _ = P.map((e) => e.original).join(" ") || wD(T.original) || e;
    if (t && !D) {
      const e = sx(
        P.map((e) => ({
          ...e,
          ...ax(T, e),
          lateAfterOriginalFallback: R,
          sttProvider:
            x.sttProvider || gc.config?.sttProvider || gc.activeSttProvider,
          sttModel: x.sttModel || "",
          sttModelVersion: x.sttModelVersion || x.sttModel || "",
          llmProvider: T.provider || s || gc.config?.provider || "",
          llmModel: T.model || "",
          llmModelVersion: T.modelVersion || T.model || "",
        })),
        {
          requestId: c,
          walletTranslationRequestId: T.cacheEvidenceRecorded
            ? T.receipt?.requestId
            : "",
          language: T.detectedLang || null,
          translatedTo: T.translatedTo || gc.config.targetLang,
          latency: gc.lastPipelineLatency,
        },
      );
      for (let t = 0; t < P.length; t += 1)
        e[t] && (P[t].cacheCandidateId = e[t]);
    }
    const B = lE(
        {
          kind: "translation",
          isFinal: t,
          original: _,
          translation: L,
          segments: P,
          segmentation: T.segmentation || null,
          queueId: T.queueId || null,
          latencyMs: T.latencyMs || null,
          pipelineLatencyMs: x.pipelineLatencyMs,
          lateAfterOriginalFallback: R,
          reason: t && zp(x) ? "llm-final-translation" : "",
          latency: gc.lastPipelineLatency,
          mediaTime: x.mediaTime,
          displayAfterMediaTime: x.mediaTime,
          sync: x,
          provider: T.provider || s || null,
          model: T.model || null,
          usage: T.usage || null,
        },
        u,
      ),
      U = Date.now(),
      q = t ? await TP(B) : (bP(B), { ok: !0, delivered: !0, accepted: !0 }),
      F = Date.now();
    if (sE(u, "translation-after-delivery", { requestId: c })) return;
    if (t && !CP(q)) {
      const e = new Error(
        `final subtitle delivery was not acknowledged: ${q?.reason || q?.error || "unknown"}`,
      );
      throw ((e.skipTranslationRetry = !0), (e.deliveryResult = q), e);
    }
    t &&
      T.provider === Se &&
      console.info(
        "[textEngineG_E2E_METRIC]",
        JSON.stringify({
          requestId: c,
          metricScope: "audio-to-display-relay-ack",
          pipeline: gc.lastPipelineLatency,
          displayRelay: {
            ackMs: Math.max(0, F - U),
            translationReadyToAckMs: Math.max(
              0,
              F - Number(x.translationReadyAtMs || U),
            ),
            audioStartToAckMs: x.audioStartWallTimeMs
              ? Math.max(0, F - Number(x.audioStartWallTimeMs))
              : null,
            audioEndToAckMs: x.audioEndWallTimeMs
              ? Math.max(0, F - Number(x.audioEndWallTimeMs))
              : null,
          },
          serverTiming: T.textEngineGTiming || null,
          batch: T.textEngineGBatch || null,
          qualityOk: !1 !== T.quality?.ok,
          delivered: !0,
        }),
      );
    const O = t ? qp(P, x, "llm-final-translation-delivered") : null;
    t && hw(x, "llm-final-translation-delivered");
    const N = Kp(x, O);
    if (t && O) {
      const e = lE(
          {
            kind: "mse-readiness",
            reason: "llm-final-translation-delivered",
            mediaTime: N.mediaTime,
            mediaTimeEnd: N.mediaTimeEnd,
            sync: N,
          },
          u,
        ),
        t = await TP(e);
      CP(t) ||
        Nx(
          "mse.audio_buffer.readiness_delivery_failed",
          {
            reason: t?.reason || t?.error || "display-not-acknowledged",
            mediaTime: aP(N.mediaTime),
            mediaTimeEnd: aP(N.mediaTimeEnd),
            readySubtitleLeadSeconds: aP(O.readySubtitleLeadSeconds),
            releaseRequiredLeadSeconds: aP(O.releaseRequiredLeadSeconds),
          },
          { source: "offscreen", level: "error" },
        );
    }
    (Nx(
      "llm.request.end",
      {
        requestId: c,
        isFinal: Boolean(t),
        retryCount: r,
        provider: T.provider || "",
        providerName: T.providerName || "",
        fallbackFromProvider: T.fallbackFromProvider || "",
        fallbackReason: T.fallbackReason || "",
        fallbackKind: T.fallbackKind || "",
        latencyMs: w - g,
        segmentCount: P.length,
        usage: T.usage || null,
        pricing: T.pricing || null,
        quality: T.quality || null,
        textEngineGUsage: T.textEngineGUsage || null,
        textEngineGTiming: T.textEngineGTiming || null,
        textEngineGBatch: T.textEngineGBatch || null,
        timeoutPolicy: T.timeoutPolicy || null,
        latencyEstimate: T.latencyEstimate || null,
        sync: N,
      },
      {
        source: "offscreen",
        requestId: c,
        provider: T.provider || s || "",
        level: T.fallbackFromProvider ? "warn" : "info",
      },
    ),
      UR(T.processedText || _ || i.text),
      t &&
        ((gc.subtitlePipelineStats.translationResponses += 1),
        (gc.subtitlePipelineStats.emittedSegments += P.length),
        (gc.confirmedSegments = [])),
      t &&
        ah(N, "complete", {
          requestId: c,
          timelineRevision: d,
          done: !0,
          active: !1,
          reason: "translation-ready",
        }));
  } catch (a) {
    if (
      (TC(p),
      console.warn("[offscreen] translation skipped:", a.message),
      sE(u, "translation-error", { requestId: c }))
    )
      return;
    if (
      gc.isStopping ||
      d !== gc.timelineRevision ||
      "wallet_session_changed" === a?.code
    )
      return void Nx(
        "llm.request.cancelled",
        {
          requestId: c,
          reason: a?.code || "capture-stopped",
          timelineRevision: d,
        },
        { source: "offscreen", requestId: c },
      );
    (!t && Sg() && (gc.mseStartupInterimTranslationRequested = !1),
      Nx(
        "llm.request.error",
        {
          requestId: c,
          isFinal: Boolean(t),
          retryCount: r,
          error: a.message,
          latencyMs: Date.now() - g,
          budget: m || null,
        },
        {
          source: "offscreen",
          requestId: c,
          provider: s || "",
          level: "error",
        },
      ),
      p?.displayed &&
        Nx(
          "llm.request.error_after_original_fallback",
          {
            requestId: c,
            isFinal: Boolean(t),
            retryCount: r,
            error: a.message,
            latencyMs: Date.now() - g,
            fallbackDelayMs: p.delayMs,
            remainingDeadlineMs: p.deadlineMs,
            budget: m || null,
          },
          {
            source: "offscreen",
            requestId: c,
            provider: s || "",
            level: "warn",
          },
        ),
      t &&
        (GC("object" == typeof m && m ? m : {}),
        (gc.subtitlePipelineStats.translationErrors += 1),
        (!0 !== a?.skipTranslationRetry &&
          kA({
            text: e,
            timing: n,
            retryCount: r,
            providerOverride: s,
            error: a,
            requestId: c,
            requestRevision: d,
            requestContext: u,
            translationBudget: m,
          })) ||
        !0 === a?.skipTranslationRetry
          ? !0 === a?.skipTranslationRetry &&
            (nx("translation-delivery-failed", 1, { start: BC(n), end: UC(n) }),
            hw(n, "delivery-failed-terminal"),
            ah(n, "delivery-failed", {
              requestId: c,
              timelineRevision: d,
              done: !0,
              active: !1,
              reason: a.message,
            }))
          : (p?.displayed ||
              (await CA({
                text: e,
                timing: n,
                error: a,
                requestId: c,
                requestContext: u,
                translationStartedAt: g,
              })),
            hw(n, "translation-terminal"),
            ah(n, "error", {
              requestId: c,
              timelineRevision: d,
              done: !0,
              active: !1,
              reason: a.message,
            }))));
  } finally {
    (TC(p), sE(u, "translation-finished", { log: !1 }) || lA(t, c));
  }
}
function kA({
  text: e,
  timing: t = null,
  retryCount: n = 0,
  providerOverride: a = null,
  error: r = null,
  requestId: i = 0,
  requestRevision: o = gc.timelineRevision,
  requestContext: s = null,
  translationBudget: l = null,
} = {}) {
  const c = wD(e),
    d = Math.max(0, Math.round(Number(n) || 0));
  if (
    /^(wallet_session_changed|wallet_request_conflict|wallet_request_invalid|wallet_translation_invalid|wallet_translation_failed|wallet_language_invalid|wallet_deadline_expired|wallet_operation_|wallet_reply_)/.test(
      r?.code || "",
    )
  )
    return !1;
  const u = s?.walletRequestState;
  if (u?.deadlineAt && performance.now() >= u.deadlineAt) return !1;
  if (!c || d >= 3) return !1;
  if (o !== gc.timelineRevision || gc.isStopping) return !1;
  const m = d + 1,
    g = Dw({
      timing: t,
      providerOverride: a,
      error: r,
      retryCount: d,
      translationBudget: l,
    }),
    p = Math.min(Na, Math.round(Oa * 2 ** d)),
    f = Math.max(0, Math.round(Number(r?.retryAfterMs || 0) || 0)),
    h = Math.min(Na, Math.max(p, f));
  ((gc.subtitlePipelineStats.translationRetries += 1),
    vP("translation-retry", `翻譯重試中 ${m}/3`),
    Nx(
      "llm.request.retry_scheduled",
      {
        requestId: i,
        retryCount: m,
        maxRetries: 3,
        delayMs: h,
        error: r?.message || String(r || ""),
        budget: l || null,
        originalProvider: a || gc.config?.provider || "",
        retryProvider: g || "",
        text: c,
      },
      {
        source: "offscreen",
        requestId: i,
        provider: g || a || gc.config?.provider || "",
        level: "warn",
      },
    ));
  const S = setTimeout(() => {
    (gc.finalTranslationRetryTimers.delete(S),
      o !== gc.timelineRevision ||
        gc.isStopping ||
        sE(s, "translation-retry", {
          requestId: i,
          retryCount: m,
          provider: g || gc.config?.provider || "",
        }) ||
        wA(c, {
          isFinal: !0,
          timing: t,
          retryCount: m,
          providerOverride: g,
          requestContext: s,
        }));
  }, h);
  return (gc.finalTranslationRetryTimers.add(S), !0);
}
async function CA({
  text: e,
  timing: t = null,
  error: n = null,
  requestId: a = 0,
  requestContext: r = null,
  translationStartedAt: i = Date.now(),
  splitReason: o = "llm-final-fallback-original",
  segmentationMethod: s = "fallback_original",
  segmentationReason:
    l = "LLM failed after retries; displayed source text to preserve subtitle continuity",
  fallbackReason: c = "llm-final-fallback",
  logLevel: d = "error",
} = {}) {
  if (
    gc.isStopping ||
    !1 === gc.acceptingNewSttWork ||
    "wallet_session_changed" === n?.code
  )
    return !1;
  const u = r?.walletRequestState;
  if (u?.originalFallbackAttempted) return !0 === u.originalFallbackDelivered;
  if (MS({ text: e }, t || {})) return !1;
  const m = wD(e);
  if (!m) return !1;
  if (!wC(t)) return !1;
  if (
    sE(r, "fallback-display", {
      requestId: a,
      provider: gc.config?.provider || "",
      mediaStartTime: aP(BC(t)),
      mediaEndTime: aP(UC(t)),
    })
  )
    return !1;
  if (MC(t, null))
    return (
      Nx(
        "llm.request.fallback_suppressed",
        {
          requestId: a,
          reason: "translated-target-suppresses-original-error-fallback",
          error: n?.message || String(n || ""),
          sourceLang: gc.config?.sourceLang || "auto",
          targetLang: gc.config?.targetLang || "zh",
        },
        {
          source: "offscreen",
          requestId: a,
          provider: gc.config?.provider || "",
          level: "warn",
        },
      ),
      !1
    );
  const g = rR(t, Date.now(), i);
  gc.lastPipelineLatency = iR(g);
  const p = oR(
      [
        {
          id: "segment-1",
          order: 0,
          original: m,
          translation: m,
          segmentationMethod: "fragment",
          splitReason: o,
          isComplete: !1,
        },
      ],
      g,
      m,
    ),
    f = lE(
      {
        kind: "translation",
        isFinal: !0,
        fallbackDisplayed: !0,
        original: m,
        translation: m,
        segments: p,
        segmentation: {
          method: s,
          preference: gc.config?.segmentationMode || "auto",
          reason: l,
          targetLanguage: gc.config?.targetLang || "zh",
          coverageAccepted: !1,
        },
        latencyMs: Date.now() - i,
        pipelineLatencyMs: g.pipelineLatencyMs,
        latency: gc.lastPipelineLatency,
        mediaTime: g.mediaTime,
        displayAfterMediaTime: g.mediaTime,
        sync: g,
        provider: gc.config?.provider || null,
      },
      r,
    );
  u && (u.originalFallbackAttempted = !0);
  const h = await TP(f);
  return CP(h)
    ? (u && (u.originalFallbackDelivered = !0),
      UR(m),
      nx(c, 1, { start: BC(g), end: UC(g) }),
      hw(g, "llm-original-fallback-delivered"),
      (gc.subtitlePipelineStats.fallbackDisplayedSegments += p.length),
      Nx(
        "llm.request.fallback_displayed",
        {
          requestId: a,
          error: n?.message || String(n || ""),
          fallbackReason: c,
          segmentCount: p.length,
          text: m,
          sync: g,
        },
        {
          source: "offscreen",
          requestId: a,
          provider: gc.config?.provider || "",
          level: d,
        },
      ),
      !0)
    : (Nx(
        "llm.request.fallback_delivery_failed",
        {
          requestId: a,
          error: n?.message || String(n || ""),
          fallbackReason: c,
          deliveryReason: h?.reason || h?.error || "display-not-acknowledged",
          segmentCount: p.length,
          sync: g,
        },
        {
          source: "offscreen",
          requestId: a,
          provider: gc.config?.provider || "",
          level: "error",
        },
      ),
      !1);
}
function AA(e = {}) {
  if (!0 !== e.cachedSubtitleReplay) return [];
  const t = rP(e.targetMediaTime);
  if (null === t) return [];
  const n = Op(e.cachedSubtitleCoverageRanges)
    .filter((e) => e.end >= t - 1)
    .slice(0, Yl);
  return n.some((e) => e.start <= t + Jr && e.end >= t - Jr) ? n : [];
}
function RA(e = [], t = null) {
  const n = $p(Op(e), $e);
  if (!n.length) return 0;
  const a = $p(n, 1),
    r = gc.mseStartupBoost || (gc.mseStartupBoost = Dy());
  ((r.readySubtitleRanges = a),
    (r.readySubtitleEndMediaTime = lP(a.map((e) => e.end))),
    (gc.mseTranscribedAudioRanges = n.map((e) => ({ ...e }))));
  let i = 0;
  for (const e of n)
    Mu(e.start, e.end, {
      owner: "cache",
      route: "session-replay",
      stage: "cache-ready",
    }).claimed && (i += 1);
  return (
    Nx(
      "mse.session_cache.seeded",
      {
        targetMediaTime: aP(t),
        rangeCount: n.length,
        readinessRangeCount: a.length,
        seededClaims: i,
        mediaStartTime: aP(sP(n.map((e) => e.start))),
        mediaEndTime: aP(lP(n.map((e) => e.end))),
      },
      { source: "offscreen" },
    ),
    i
  );
}
async function xA(e = {}) {
  gc.audioPrefetchController && tg();
  const t = Date.now(),
    n = AA(e);
  ((gc.expectedSourceSeekTargetMediaTime = rP(e.targetMediaTime)),
    (gc.expectedViewerSeekTargetMediaTime = sP([
      e.viewerTargetMediaTime,
      e.targetMediaTime,
    ])),
    (gc.expectedSourceSeekId = wD(e.seekId || "")),
    (gc.expectedSourceSeekStartedAtMs = t),
    (gc.expectedSourceSeekConfirmedAtMs = 0),
    (gc.expectedSourceSeekConfirmedWallTimeMs = 0),
    (gc.expectedSourceSeekUntilMs = t + mn),
    (gc.lastIgnoredSourceSeekTimingAtMs = 0),
    NA("viewer-seek-reset"),
    du(e.reason || "viewer-seek"),
    (gc.timelineRevision += 1),
    (gc.prefetchPcmGeneration = null),
    fS(e.reason || "viewer-seek", gc.timelineRevision));
  const a = null,
    r = _m(a),
    i = Um(a),
    o = Fm(a);
  ((gc.pcmGroundTruthRing = []),
    (gc.pcmGroundTruthRingMs = 0),
    (gc.pcmGroundTruthClock = null),
    (gc.mseCoverageHoles = []),
    (gc.msePcmCoverageWatchdog = ym()),
    (gc.mseCoverageLedger = Jd()),
    (gc.mseCoverageLedger.sessionId = gc.sessionId || ""),
    (gc.mseCoverageLedger.timelineRevision = gc.timelineRevision),
    (gc.mseTranscribedAudioRanges = []),
    (gc.isTranslating = !1),
    (gc.activeTranslationRequestId = 0),
    (gc.activeTranslationCount = 0),
    (gc.activeFinalTranslationCount = 0),
    (gc.activeTranslationRequests = new Map()),
    PA(),
    EP(),
    (gc.sourceMediaTiming = null),
    (gc.sourceTimingReceivedAt = 0),
    (gc.viewerMediaTiming = null),
    (gc.viewerTimingReceivedAt = 0),
    (gc.captureMediaClock = null),
    (gc.lastTranscriptTiming = null),
    (gc.lastPipelineLatency = null),
    (gc.originalFallbackDeadlineHealth = dC()),
    (gc.adaptiveSyncDelaySeconds = null),
    (gc.pipelineLatencySamples = []),
    (gc.pipelineLatencyBuckets = {}),
    (gc.pipelineLatencyStats = null),
    Zg(gc.mseAudio),
    (gc.mseAudio = {
      ...Py(),
      enabled: zm(),
      startedAtMs: gc.mseAudio?.startedAtMs || t,
      resetAtMs: t,
      seekTargetMediaTime: gc.expectedSourceSeekTargetMediaTime,
      scheduledRanges: o,
    }));
  const s = Boolean(gc.mseStartupBoost?.switched),
    l = rP(gc.mseStartupBoost?.switchedAtMs) || 0;
  gc.mseStartupBoost = Ly(gc.config);
  const c = RA(n, gc.expectedSourceSeekTargetMediaTime);
  (Boolean(
    s &&
      0 === c &&
      gc.mseStartupBoost.enabled &&
      gc.mseStartupBoost.mode === Rl,
  )
    ? ((gc.mseStartupBoost.batchOnlyAfterSeek = !1),
      (gc.mseStartupBoost.seekRealtimeBridge = !0),
      Nx(
        "mse.startup_boost.seek_rearmed",
        {
          reason: e.reason || "viewer-seek",
          mode: gc.mseStartupBoost.mode,
          route: "realtime-bridge",
          targetReadySeconds: gc.mseStartupBoost.targetReadySeconds,
          startupReleaseLeadSeconds: 4,
          standardSttProvider: gc.mseStartupBoost.standardSttProvider,
          fastSttProvider: gc.mseStartupBoost.fastSttProvider,
          standardProvider: gc.mseStartupBoost.standardProvider,
          fastProvider: gc.mseStartupBoost.fastProvider,
        },
        { source: "offscreen" },
      ))
    : s &&
      gc.mseStartupBoost.enabled &&
      ((gc.mseStartupBoost.active = !1),
      (gc.mseStartupBoost.switched = !0),
      (gc.mseStartupBoost.switchedAtMs = l || t),
      Nx(
        "mse.startup_boost.seek_retained",
        {
          reason: e.reason || "viewer-seek",
          mode: gc.mseStartupBoost.mode,
          sessionCacheCoverageSeeded: c,
          standardProvider: gc.mseStartupBoost.standardProvider,
          fastProvider: gc.mseStartupBoost.fastProvider,
        },
        { source: "offscreen" },
      )),
    (gc.activeSttProvider = $y()),
    Nx(
      "caption.timeline_reset",
      {
        reason: e.reason || "viewer-seek",
        seekId: e.seekId || null,
        targetMediaTime: gc.expectedSourceSeekTargetMediaTime,
        viewerTargetMediaTime: gc.expectedViewerSeekTargetMediaTime,
        targetDelaySeconds: rP(e.targetDelaySeconds),
        timelineRevision: gc.timelineRevision,
        retainedFinalBatchSegments: r.length,
        retainedSttQueueSegments: i?.queue.length || 0,
        retainedScheduledRanges: o.length,
        sessionCacheCoverageRanges: n.length,
        sessionCacheCoverageSeeded: c,
        mseAudioBufferEnabled: Boolean(gc.config?.mseAudioBufferEnabled),
      },
      { source: "offscreen", level: "warn" },
    ),
    vP("sync-seek", "跳轉後重新建立字幕延遲"),
    await DA(),
    qm(i),
    !0 === gc.config?.audioPrefetchEnabled && ng(),
    r.length &&
      ((gc.finalTranslationBatch = gc.finalTranslationBatch.concat(r)),
      Nx(
        "llm.final_batch.seek_retained",
        {
          batchSize: r.length,
          mediaStartTime: aP(sP(r.map((e) => BC(e.timing)))),
          mediaEndTime: aP(lP(r.map((e) => UC(e.timing)))),
        },
        { source: "offscreen" },
      ),
      Bw()));
}
async function EA(e = {}) {
  if (!gc.sessionId || e.sessionId !== gc.sessionId || gc.isStopping)
    return { ok: !1, reason: "stale-session" };
  if (
    gc.config?.syncEnabled ||
    gc.config?.mseAudioBufferEnabled ||
    gc.config?.mirrorDelayEnabled
  )
    return { ok: !1, reason: "not-instant-capture" };
  const t = e.config || {},
    n = String(t.sourceMediaContextKey || "");
  if (
    !n ||
    n !== t.viewerMediaContextKey ||
    !/^https?:\/\//.test(t.pageUrl || "")
  )
    return { ok: !1, reason: "invalid-media-context" };
  if (gc.captureContextSwitchInFlight)
    return { ok: !1, retryable: !0, reason: "context-switch-busy" };
  gc.captureContextSwitchInFlight = !0;
  try {
    (nM("media-context-change"), aM({ abort: !0 }));
    const a = {};
    for (const e of [
      "pageUrl",
      "canonicalPageUrl",
      "sourceMediaContextKey",
      "viewerMediaContextKey",
      "youtubeVideoId",
      "pageTitle",
      "videoPlatform",
      "sourceIsLiveStream",
      "sourceLiveClassification",
      "initialPlaybackMediaTime",
      "pageDurationSeconds",
    ])
      Object.hasOwn(t, e) && (a[e] = t[e]);
    return (
      (gc.config = PP({ ...gc.config, ...a })),
      await xA({
        reason: "instant-media-change",
        targetMediaTime: e.targetMediaTime,
      }),
      (gc.digitalSilenceDurationMs = 0),
      (gc.lastDigitalSilenceLogAtMs = 0),
      Nx(
        "capture.media_context.changed",
        { mediaContextKey: n, timelineRevision: gc.timelineRevision },
        { source: "offscreen" },
      ),
      dM(),
      {
        ok: !0,
        sessionId: gc.sessionId,
        timelineRevision: gc.timelineRevision,
        mediaContextKey: n,
      }
    );
  } finally {
    gc.captureContextSwitchInFlight = !1;
  }
}
function PA() {
  ((gc.pendingFinalTranslation = null),
    (gc.finalTranslationBatch = []),
    Uw(),
    Ow(),
    HT({ invalidate: !0 }),
    qb(),
    (gc.realtimeFinalTranscriptSeen = !1),
    (gc.mseStartupInterimTranslationRequested = !1),
    (gc.translationTimelineReservations = []),
    (gc.translationTimelineReservationSequence = 0),
    (gc.lastFinalText = ""),
    (gc.lastInterimTranslationAt = 0),
    (gc.lastRealtimeAudioSentAtMs = 0),
    (gc.lastRealtimeTranscriptAtMs = 0),
    (gc.speechEngineARealtimeLastUpstreamMessageAtMs = 0),
    (gc.speechEngineARealtimeStallRotateAtMs = 0),
    (gc.speechEngineARealtimeLastSpeechAtMs = 0),
    (gc.speechEngineARealtimeSpeechRunStartedAtMs = 0),
    wf(),
    (gc.speechEngineARealtimeRecoveryActive = !1),
    (gc.speechEngineARealtimeRecoveryLastLogAtMs = 0),
    (gc.lastRealtimeCommitAudioMs = 0),
    (gc.realtimeCommitPending = !1),
    (gc.realtimeCommitSentAtMs = 0),
    (gc.realtimeCommitSequence = 0),
    (gc.displayedOriginalText = ""),
    (gc.scheduledOriginalText = ""),
    (gc.originalFallbackDeadlineHealth = dC()),
    (gc.confirmedSegments = []),
    xT());
}
async function DA() {
  if ((Fc("timeline-reset"), QP() || XP())) return void EP();
  const e = Boolean(
    gc.websocket?.__speechEngineARealtimeManaged ||
      gc.speechEngineARealtimeStandbySocket ||
      gc.speechEngineARealtimeDrainingSocket,
  );
  if (gc.websocket || e) {
    ((gc.isResettingWebSocket = !0),
      (gc.suppressWebSocketCloseUntilMs = Date.now() + 5e3));
    try {
      if (e) Td("sync seek reset");
      else
        try {
          gc.websocket.close(1e3, "sync seek reset");
        } catch {}
      ((gc.websocket = null), gc.isStopping || (await Uc()));
    } finally {
      gc.isResettingWebSocket = !1;
    }
  } else !gc.isStopping && hg() && (await Uc());
}
function IA(e, t) {
  const n = (Array.isArray(e.segments) ? e.segments : [])
    .map((e, t) => ({
      id: String(e.id || `segment-${t + 1}`),
      order: Number.isFinite(Number(e.order)) ? Number(e.order) : t,
      original: wD(e.original),
      translation: wD(e.translation),
      segmentationMethod: wD(e.segmentationMethod || e.method || ""),
      splitReason: wD(e.splitReason || e.reason || ""),
      isComplete: Boolean(e.isComplete),
    }))
    .filter((e) => e.original && AD(e.translation))
    .sort((e, t) => e.order - t.order)
    .map((e, t) => ({ ...e, order: t }));
  if (n.length > 0) return n;
  const a = wD(e.original || e.processedText || t),
    r = wD(e.translation);
  return a && AD(r)
    ? [
        {
          id: "segment-1",
          order: 0,
          original: a,
          translation: r,
          segmentationMethod: "fallback",
          splitReason: "single-pair-fallback",
          isComplete: !0,
        },
      ]
    : [];
}
function LA(e = null) {
  if (!e || !1 === e.found) return;
  const t = rP(e.currentTime);
  if (null === t) return;
  const n = Boolean(e.adPlaying),
    a = Boolean(e.paused),
    r = {
      ...e,
      currentTime: t,
      duration: rP(e.duration),
      ended: Boolean(e.ended),
      isLiveStream: Boolean(e.isLiveStream),
      paused: a,
      pauseAffectsStt: !1 !== e.pauseAffectsStt,
      internalPlaybackPause: Boolean(e.internalPlaybackPause),
      playbackRate: rP(e.playbackRate) || 1,
      wallTimeMs: rP(e.wallTimeMs) || Date.now(),
      liveEdgeSeconds: rP(e.liveEdgeSeconds),
      actualDelaySeconds: rP(e.actualDelaySeconds),
      sourceProgramClock: e.sourceProgramClock || null,
      adPlaying: n,
      adSkippable: Boolean(e.adSkippable),
      adReason: e.adReason || "",
      adPlatform: e.adPlatform || e.platform || "",
      pauseContinuationUntilMs: rP(e.pauseContinuationUntilMs),
      pauseContinuationExpired: Boolean(e.pauseContinuationExpired),
      sourcePreloadRate: rP(e.sourcePreloadRate),
      sourcePreloadLeadSeconds: rP(e.sourcePreloadLeadSeconds),
      sourcePreloadMaxLeadSeconds: rP(e.sourcePreloadMaxLeadSeconds),
      captionStartup:
        e.captionStartup && "object" == typeof e.captionStartup
          ? {
              active: !0 === e.captionStartup.active,
              phase: String(e.captionStartup.phase || "").slice(0, 40),
              sessionId: String(e.captionStartup.sessionId || "").slice(0, 200),
              mediaContextKey: String(
                e.captionStartup.mediaContextKey || "",
              ).slice(0, 300),
              anchorMediaTime: rP(e.captionStartup.anchorMediaTime),
              remainingMs: rP(e.captionStartup.remainingMs),
            }
          : null,
    },
    i = _A(r);
  if (i.ignore) {
    const e = Date.now();
    return void (
      e - (gc.lastIgnoredSourceSeekTimingAtMs || 0) >= 1e3 &&
      ((gc.lastIgnoredSourceSeekTimingAtMs = e),
      Nx(
        "source.timing.seek_stale_ignored",
        {
          reason: i.reason,
          seekId: wD(r.seekId || ""),
          expectedSeekId: gc.expectedSourceSeekId || "",
          currentTime: aP(t),
          expectedTargetMediaTime: aP(gc.expectedSourceSeekTargetMediaTime),
          previousAcceptedMediaTime: aP(gc.sourceMediaTiming?.currentTime),
          seekConfirmed: Boolean(gc.expectedSourceSeekConfirmedAtMs),
          timingWallTimeMs: aP(r.wallTimeMs),
          confirmedWallTimeMs: aP(gc.expectedSourceSeekConfirmedWallTimeMs),
        },
        { source: "offscreen", level: "warn" },
      ))
    );
  }
  if (i.confirm && !gc.expectedSourceSeekConfirmedAtMs) {
    const e = gc.pcmGroundTruthRing?.length || 0,
      n = gc.pcmGroundTruthRingMs || 0;
    ((gc.expectedSourceSeekConfirmedAtMs = Date.now()),
      (gc.expectedSourceSeekConfirmedWallTimeMs =
        rP(r.wallTimeMs) || Date.now()),
      (gc.pcmGroundTruthRing = []),
      (gc.pcmGroundTruthRingMs = 0),
      (gc.pcmGroundTruthClock = null),
      (gc.msePcmCoverageWatchdog = ym()),
      gc.mseAudio &&
        ((gc.mseAudio.seekAnchorEstablished = !0),
        (gc.mseAudio.seekAnchorEstablishedAtMs = Date.now()),
        (gc.mseAudio.seekAnchorSource = "source-seek-timing"),
        (gc.mseAudio.lastSourceCurrentTime = t),
        (gc.mseAudio.lastSourceCurrentTimeAtMs = Date.now()),
        (gc.mseAudio.lastSourcePlaybackRate = rP(r.playbackRate) || 1)),
      Nx(
        "source.timing.seek_confirmed",
        {
          reason: i.reason,
          seekId: wD(r.seekId || ""),
          expectedSeekId: gc.expectedSourceSeekId || "",
          currentTime: aP(t),
          expectedTargetMediaTime: aP(gc.expectedSourceSeekTargetMediaTime),
          droppedPcmChunks: e,
          droppedPcmMs: Math.round(n),
        },
        { source: "offscreen" },
      ));
  }
  const o = gc.sourceMediaTiming,
    s = Boolean(o?.adPlaying),
    l = Boolean(o?.paused),
    c = Boolean(l && !1 !== o?.pauseAffectsStt),
    d = Boolean(a && !1 !== r.pauseAffectsStt);
  if (OA(r)) NA("expected-source-seek");
  else if (qA(o, r))
    return (
      (gc.sourceMediaTiming = r),
      (gc.sourceTimingReceivedAt = Date.now()),
      Vg("source-media-timing"),
      void HA(r, o)
    );
  ((gc.sourceMediaTiming = r),
    (gc.sourceTimingReceivedAt = Date.now()),
    Vg("source-media-timing"),
    r.isLiveStream &&
      tD("live-stream-detected", {
        currentTime: aP(r.currentTime),
        liveEdgeSeconds: aP(r.liveEdgeSeconds),
      }),
    c || !d || n || of()
      ? c && !d
        ? (ef(), tf() || cf())
        : !l &&
          a &&
          r.internalPlaybackPause &&
          Nx(
            "capture.stt_pause_suppressed",
            {
              reason: "internal-single-tab-seek-pause",
              currentTime: aP(t),
              pauseAffectsStt: !1,
            },
            { source: "offscreen" },
          )
      : Xp(r)
        ? Yp("source-media-paused")
        : lf("source-media-paused"),
    s !== n &&
      (n
        ? (Xf({ force: !0, reason: "source-ad-start" }),
          vP("ad-hold", "偵測到廣告，暫停字幕音訊擷取"),
          Nx(
            "ad.source.start",
            {
              platform: gc.sourceMediaTiming.adPlatform,
              reason: gc.sourceMediaTiming.adReason,
              skippable: gc.sourceMediaTiming.adSkippable,
            },
            { source: "offscreen", level: "warn" },
          ))
        : (vP("listening", "廣告結束，重新同步字幕"),
          Nx(
            "ad.source.end",
            { skippedAudioMs: Math.round(gc.sourceAdAudioSkippedMs || 0) },
            { source: "offscreen" },
          ),
          (gc.sourceAdAudioSkippedMs = 0))),
    $A(),
    BA(r),
    UA(r));
}
function _A(e = null, t = Date.now()) {
  const n = rP(gc.expectedSourceSeekTargetMediaTime),
    a = rP(gc.expectedSourceSeekStartedAtMs) || 0,
    r = rP(e?.currentTime);
  if (null === n || null === r || a <= 0)
    return { ignore: !1, confirm: !1, reason: "no-expected-seek" };
  const i = wD(gc.expectedSourceSeekId || ""),
    o = wD(e?.seekId || ""),
    s = Boolean(e?.seekSucceeded && (!i || o === i) && Math.abs(r - n) <= pn),
    l = Math.abs(r - n) <= pn,
    c = Boolean(gc.expectedSourceSeekConfirmedAtMs);
  if (!c && (s || l))
    return {
      ignore: !1,
      confirm: !0,
      reason: s ? "matching-seek-ack" : "near-seek-target",
    };
  if (!(t <= a + gn))
    return { ignore: !1, confirm: !1, reason: "seek-guard-expired" };
  if (!c)
    return {
      ignore: !l,
      confirm: !1,
      reason: l ? "near-seek-target" : "pre-confirmation-old-clock",
    };
  const d = rP(gc.expectedSourceSeekConfirmedWallTimeMs),
    u = rP(e?.wallTimeMs),
    m = null !== d && null !== u && u + 1 < d;
  return {
    ignore: m,
    confirm: !1,
    reason: m
      ? "pre-confirmation-observation-arrived-late"
      : "confirmed-seek-clock",
  };
}
function BA(e = null) {
  nf(e)
    ? lf("hybrid-cache-covered")
    : gc.mediaPlaybackPausedForStt &&
      "hybrid-cache-covered" === gc.mediaPlaybackPausedReason &&
      !tf() &&
      cf();
}
function UA(e = {}) {
  if (!QR()) return;
  if (
    (!gc.videoSubtitleCacheQueue.length &&
      !gc.videoSubtitleCacheCoverageQueue.length) ||
    !gc.sessionId ||
    !gc.config
  )
    return;
  if (!JR(gc.config.pageUrl) || e.isLiveStream || e.adPlaying) return;
  const t = rP(e.duration),
    n = rP(e.currentTime);
  if (null === t || null === n || t <= 0) return;
  const a = t - n;
  if (!(e.ended || a <= G || n >= 0.985 * t)) return;
  const r = Date.now();
  r - Number(gc.videoSubtitleCacheEndFlushAt || 0) < W ||
    ((gc.videoSubtitleCacheEndFlushAt = r),
    vx({
      force: !0,
      final: !0,
      reason: e.ended ? "source-ended" : "source-near-end",
    }).catch((e) => {
      console.warn(
        "[offscreen] near-end subtitle cache flush skipped:",
        e.message,
      );
    }));
}
function qA(e = null, t = null) {
  if (!gc.config?.syncEnabled || gc.config?.singleTabMediaSync) return !1;
  if (!t || t.isLiveStream || t.adPlaying) return !1;
  if (OA(t)) return !1;
  const n = rP(t.duration) ?? rP(e?.duration),
    a = rP(t.currentTime);
  if (null === n || null === a || n < ln) return !1;
  if (t.ended && FA(t, n)) return !0;
  if (!e) return !1;
  const r = rP(e.currentTime);
  if (null === r) return !1;
  const i = FA(e, rP(e.duration) ?? n),
    o = a <= 5,
    s = r - a >= Math.min(un, 0.25 * n);
  return i && o && s;
}
function FA(e = null, t = null) {
  const n = rP(e?.currentTime),
    a = rP(t ?? e?.duration);
  return null !== n && null !== a && (n >= a - 3 || n >= 0.97 * a);
}
function OA(e = null, t = Date.now()) {
  const n = rP(gc.expectedSourceSeekTargetMediaTime),
    a = rP(gc.expectedSourceSeekUntilMs) || 0,
    r = rP(e?.currentTime);
  return !(null === n || null === r || t > a) && Math.abs(r - n) <= 5;
}
function NA(e = "clear") {
  if (!gc.sourceEndedGuardActive) return;
  const t = Math.max(0, Number(gc.sourceEndedGuardMseSegmentsIgnored) || 0);
  ((gc.sourceEndedGuardActive = !1),
    (gc.sourceEndedGuardStartedAt = 0),
    (gc.sourceEndedGuardReason = ""),
    (gc.sourceEndedGuardMseSegmentsIgnored = 0),
    "source-vod-ended" === gc.mediaPlaybackPausedReason && cf(),
    Nx(
      "source.vod_end_guard.clear",
      { reason: e, ignoredMseSegments: t },
      { source: "offscreen" },
    ));
}
function HA(e = {}, t = null) {
  if (gc.sourceEndedGuardActive) return !1;
  ((gc.sourceEndedGuardActive = !0),
    (gc.sourceEndedGuardStartedAt = Date.now()),
    (gc.sourceEndedGuardReason = e.ended
      ? "source-ended"
      : "source-loop-restart"),
    (gc.sourceEndedGuardMseSegmentsIgnored = 0),
    HT({ invalidate: !0 }));
  const n = Array.isArray(gc.batchStt?.chunks) ? gc.batchStt.chunks.length : 0,
    a = Array.isArray(gc.batchStt?.queue) ? gc.batchStt.queue.length : 0,
    r = gc.finalTranslationBatch.length,
    i = Xf({ force: !0, reason: "source-vod-ended" }),
    o = gc.finalTranslationBatch.length > 0;
  return (
    o && Nw({ force: !0 }),
    Nx(
      "source.vod_end_guard.drain",
      {
        reason: gc.sourceEndedGuardReason,
        pendingSttChunks: n,
        pendingSttSegments: a,
        pendingFinalSegments: r,
        flushedSttTail: i,
        flushedFinalTail: o,
        activeFinalRequests: dA(),
        retryTimers:
          gc.finalTranslationRetryTimers instanceof Set
            ? gc.finalTranslationRetryTimers.size
            : 0,
      },
      { source: "offscreen", level: r || n ? "warn" : "info" },
    ),
    lf("source-vod-ended"),
    vP("source-ended", "source 影片已結束，已停止字幕音訊擷取"),
    Nx(
      "source.vod_end_guard.activate",
      {
        reason: gc.sourceEndedGuardReason,
        currentTime: rP(e.currentTime),
        duration: rP(e.duration),
        ended: Boolean(e.ended),
        previousCurrentTime: rP(t?.currentTime),
        previousDuration: rP(t?.duration),
        sttBillableAudioMs: Math.round(gc.sttBillableAudioMs || 0),
      },
      { source: "offscreen", level: "warn" },
    ),
    GA(e),
    UA(e),
    !0
  );
}
function GA(e = {}) {
  chrome.runtime
    .sendMessage({
      type: "LIVE_SUBTITLE_SOURCE_END_GUARD",
      sessionId: gc.sessionId || null,
      reason: gc.sourceEndedGuardReason || "source-vod-ended",
      timing: e,
    })
    .catch(() => {});
}
function WA(e = null) {
  if (!e || !1 === e.found) return;
  const t = rP(e.actualDelaySeconds);
  if (
    null === t &&
    void 0 === e.paused &&
    void 0 === e.pauseContinuationUntilMs
  )
    return;
  const n = Boolean(gc.viewerMediaTiming?.paused),
    a = void 0 === e.paused ? n : Boolean(e.paused);
  ((gc.viewerMediaTiming = {
    ...e,
    currentTime: rP(e.currentTime),
    sourceMediaTime: rP(e.sourceMediaTime),
    sourceTimelineOffsetSeconds: rP(e.sourceTimelineOffsetSeconds),
    sourceTimelineOffsetStable: Boolean(e.sourceTimelineOffsetStable),
    actualDelaySeconds: t ?? rP(gc.viewerMediaTiming?.actualDelaySeconds),
    paused: a,
    playbackRate: rP(e.playbackRate) || 1,
    adPlaying: Boolean(e.adPlaying),
    adSkippable: Boolean(e.adSkippable),
    adReason: e.adReason || "",
    adPlatform: e.adPlatform || e.platform || "",
    pauseContinuationUntilMs: rP(e.pauseContinuationUntilMs),
    continuedLoadingMs: rP(e.continuedLoadingMs),
    wallTimeMs: rP(e.wallTimeMs) || Date.now(),
  }),
    (gc.viewerTimingReceivedAt = Date.now()),
    n || !a || gc.viewerMediaTiming.adPlaying || !rf() || of()
      ? !n || a || tf() || cf()
      : lf("viewer-media-paused"));
}
function $A() {
  const e = VA();
  null !== e &&
    (gc.captureMediaClock = {
      audioMs: gc.captureAudioMs,
      sentAudioMs: gc.sttTimingAudioMs,
      mediaTime: e,
      wallTimeMs: Date.now(),
    });
}
function VA(e = Date.now()) {
  const t = gc.sourceMediaTiming;
  if (!t || null === rP(t.currentTime)) return null;
  if (t.adPlaying) return null;
  const n = t.paused ? 0 : rP(t.playbackRate) || 1,
    a =
      Math.max(0, e - (rP(t.wallTimeMs) || gc.sourceTimingReceivedAt || e)) /
      1e3,
    r = t.currentTime + a * n,
    i = rP(t.liveEdgeSeconds);
  return null !== i ? Math.min(r, i + a * n) : r;
}
function jA(e = Date.now()) {
  const t = gc.mseAudio || null,
    n = rP(t?.lastSourceCurrentTime),
    a = rP(t?.lastSourceCurrentTimeAtMs);
  if (null === n || null === a || a <= 0) return null;
  const r = rP(t?.lastSourcePlaybackRate) || 1;
  return n + (Math.max(0, e - a) / 1e3) * r;
}
function KA(e = Date.now()) {
  const t = VA(e),
    n = jA(e),
    a =
      rP(gc.sourceTimingReceivedAt) ||
      rP(gc.sourceMediaTiming?.wallTimeMs) ||
      0,
    r = rP(gc.mseAudio?.lastSourceCurrentTimeAtMs) || 0;
  return null === t && null === n
    ? {
        mediaTime: null,
        source: "none",
        ageMs: null,
        sourceMediaTime: t,
        mseMediaTime: n,
      }
    : null === t
      ? {
          mediaTime: n,
          source: "mse-current-time",
          ageMs: Math.max(0, e - r),
          sourceMediaTime: t,
          mseMediaTime: n,
        }
      : null === n || a >= r
        ? {
            mediaTime: t,
            source: "source-probe",
            ageMs: a > 0 ? Math.max(0, e - a) : null,
            sourceMediaTime: t,
            mseMediaTime: n,
          }
        : {
            mediaTime: n,
            source: "mse-current-time",
            ageMs: Math.max(0, e - r),
            sourceMediaTime: t,
            mseMediaTime: n,
          };
}
function zA(e = Date.now()) {
  return KA(e).mediaTime;
}
function QA(e = null, t = {}) {
  const n = Date.now(),
    a = AR(e?.words),
    r = xR(a),
    i = null !== r.endSeconds,
    o = t.segmentTiming || t.timing || null,
    s = sP([t.sourceMediaStartTime, t.audioStartMediaTime, BC(o)]),
    l = sP([t.sourceMediaEndTime, t.audioEndMediaTime, t.mediaTimeEnd, UC(o)]),
    c = sP([t.audioStartMs, o?.audioStartMs]),
    d = sP([t.audioEndMs, o?.audioEndMs]),
    u = sP([t.audioDurationMs, o?.audioDurationMs]),
    m = sP([t.audioStartWallTimeMs, o?.audioStartWallTimeMs]),
    g = sP([t.audioEndWallTimeMs, o?.audioEndWallTimeMs]),
    p = JA(RR(a, 0), a, s, l),
    f = p.words,
    h = f.map((e) => rP(e.mediaStartTime)).filter((e) => null !== e),
    S = f.map((e) => rP(e.mediaEndTime)).filter((e) => null !== e),
    M = h.length ? Math.min(...h) : null,
    v = S.length ? Math.max(...S) : null,
    y = i ? 0 : aR(t),
    b = v,
    T = gc.captureMediaClock?.mediaTime ?? VA(n),
    w = b ?? l ?? T,
    k = null === b && null !== l ? 0 : y,
    C = null !== w ? Math.max(0, w - k) : null,
    A =
      null !== r.endSeconds
        ? 1e3 * r.endSeconds
        : (d ?? gc.captureMediaClock?.audioMs ?? gc.totalAudioMs),
    R = Math.max(0, A - 1e3 * k),
    x =
      null !== r.startSeconds
        ? 1e3 * r.startSeconds
        : (c ?? (null !== d && null !== u ? Math.max(0, d - u) : null)),
    E =
      null !== r.durationSeconds
        ? 1e3 * r.durationSeconds
        : (u ?? (null !== x && null !== R ? Math.max(0, R - x) : null)),
    P = null !== r.startSeconds ? DR(Math.max(0, r.startSeconds - k)) : m,
    D = null !== r.endSeconds ? DR(Math.max(0, r.endSeconds - k)) : g,
    I = Math.max(0, (gc.captureMediaClock?.wallTimeMs || n) - 1e3 * k),
    L = Math.max(0, D || I),
    _ = M ?? s,
    B = v ?? l,
    U = f.length
      ? p.source
      : null !== _ && null !== B && B > _
        ? "source-media-range"
        : "";
  return {
    isFinal: Boolean(t.isFinal),
    mediaTime: C,
    mediaTimeEnd: B,
    audioStartMs: x,
    audioEndMs: R,
    audioDurationMs: E,
    audioStartMediaTime: _,
    audioEndMediaTime: B,
    sourceMediaStartTime: _,
    sourceMediaEndTime: B,
    displayAfterMediaTimeStart: _,
    displayAfterMediaTimeEnd: B,
    audioStartWallTimeMs: P,
    audioEndWallTimeMs: D,
    words: f,
    transcriptReceivedAtMs: n,
    sourceWallTimeMs: L,
    sourceProgramClock: o?.sourceProgramClock || null,
    fallbackLagSeconds: k,
    sourceMediaDelaySeconds: gc.sourceMediaTiming?.actualDelaySeconds ?? null,
    timingSource: U,
    speechIntervals: o?.speechIntervals || null,
    chunkMediaRanges: Array.isArray(o?.chunkMediaRanges)
      ? o.chunkMediaRanges
      : [],
    sourceMediaRangeRepaired: Boolean(o?.sourceMediaRangeRepaired),
    sourceType: o?.sourceType || t.sourceType || "",
    audioInputMode:
      o?.audioInputMode || t.audioInputMode || gc.config?.audioInputMode || "",
    segmentReason: o?.segmentReason || t.segmentReason || "",
    mseGapRecovery: Boolean(o?.mseGapRecovery || t.mseGapRecovery),
    sttDeadlineHedgeTriggered: Boolean(o?.sttDeadlineHedgeTriggered),
    sttDeadlineHedgeRescue: Boolean(o?.sttDeadlineHedgeRescue),
    sttDeadlineHedgeTriggerReason: o?.sttDeadlineHedgeTriggerReason || "",
    sttDeadlineHedgeWinnerRole: o?.sttDeadlineHedgeWinnerRole || "",
    sttDeadlineHedgeWinnerProvider: o?.sttDeadlineHedgeWinnerProvider || "",
    sttDeadlineHedgeReserveMs: Math.max(
      0,
      Math.round(rP(o?.sttDeadlineHedgeReserveMs) || 0),
    ),
    sttSegmentId: o?.sttSegmentId ?? t.sttSegmentId ?? null,
    sttSegmentIds: Array.isArray(o?.sttSegmentIds)
      ? o.sttSegmentIds
      : null != o?.sttSegmentId
        ? [o.sttSegmentId]
        : [],
    walletSttRequestIds: Array.isArray(o?.walletSttRequestIds)
      ? o.walletSttRequestIds
      : [],
    mseCoverageClaimIds: Array.isArray(o?.mseCoverageClaimIds)
      ? o.mseCoverageClaimIds
      : [],
    sttProvider: LP(
      o?.sttProvider ||
        t.sttProvider ||
        gc.activeSttProvider ||
        gc.config?.sttProvider,
    ),
  };
}
function JA(e, t, n, a) {
  const r = Array.isArray(e) ? e : [],
    i = Array.isArray(t) ? t : [],
    o = rP(n),
    s = rP(a);
  if (null === o || null === s || s <= o || !i.length)
    return { words: r, source: r.length ? "stt-word-timing" : "" };
  if (r.length && ZA(r, o, s) && XA(r, i))
    return { words: r, source: "stt-word-timing" };
  if (YA(i, o, s)) {
    const e = tR(i);
    if (e.length) return { words: e, source: "stt-word-timing-source-clock" };
  }
  const l = nR(i, o, s);
  return l.length
    ? { words: l, source: "stt-word-timing-remapped-to-source-range" }
    : { words: r, source: r.length ? "stt-word-timing" : "" };
}
function XA(e, t) {
  const n = (e || [])
      .map((e) => rP(e.mediaStartTime))
      .filter((e) => null !== e),
    a = (e || []).map((e) => rP(e.mediaEndTime)).filter((e) => null !== e),
    r = n.length ? Math.min(...n) : null,
    i = a.length ? Math.max(...a) : null,
    o = xR(t || []);
  return (
    null === r ||
    null === i ||
    i < r ||
    null === o.durationSeconds ||
    o.durationSeconds < 0.5 ||
    i - r >= 0.45 * o.durationSeconds
  );
}
function ZA(e, t, n) {
  const a = e.map((e) => rP(e.mediaStartTime)).filter((e) => null !== e),
    r = e.map((e) => rP(e.mediaEndTime)).filter((e) => null !== e),
    i = a.length ? Math.min(...a) : null,
    o = r.length ? Math.max(...r) : null;
  if (null === i || null === o || o < i) return !1;
  const s = eR(t, n);
  return (
    (i >= t - s && o <= n + s) ||
    Math.max(0, Math.min(o, n + s) - Math.max(i, t - s)) /
      Math.max(0.001, o - i) >=
      0.65
  );
}
function YA(e, t, n) {
  const a = sP(e.map((e) => e.startSeconds)),
    r = lP(e.map((e) => e.endSeconds));
  if (null === a || null === r || r < a) return !1;
  const i = eR(t, n);
  return a >= t - i && r <= n + i;
}
function eR(e, t) {
  return dP(0.2 * (t - e), 0.75, 3);
}
function tR(e) {
  return Array.isArray(e) && e.length
    ? e
        .map((e) => {
          const t = rP(e.startSeconds),
            n = rP(e.endSeconds);
          return null === t || null === n
            ? null
            : {
                index: e.index,
                text: e.text,
                startSeconds: aP(t),
                endSeconds: aP(n),
                mediaStartTime: aP(Math.max(0, Math.min(t, n))),
                mediaEndTime: aP(Math.max(t, n)),
              };
        })
        .filter((e) => e && e.mediaEndTime >= e.mediaStartTime)
    : [];
}
function nR(e, t, n) {
  if (!Array.isArray(e) || !e.length) return [];
  const a = xR(e);
  if (
    null === a.startSeconds ||
    null === a.endSeconds ||
    a.endSeconds <= a.startSeconds
  )
    return [];
  const r = n - t,
    i = a.endSeconds - a.startSeconds;
  return e
    .map((e) => {
      const n = rP(e.startSeconds),
        o = rP(e.endSeconds);
      if (null === n || null === o) return null;
      const s = dP((Math.min(n, o) - a.startSeconds) / i, 0, 1),
        l = dP((Math.max(n, o) - a.startSeconds) / i, 0, 1),
        c = t + s * r,
        d = t + l * r;
      return {
        index: e.index,
        text: e.text,
        startSeconds: aP(n),
        endSeconds: aP(o),
        mediaStartTime: aP(c),
        mediaEndTime: aP(Math.max(c, d)),
      };
    })
    .filter((e) => e && e.mediaEndTime >= e.mediaStartTime);
}
function aR(e = {}) {
  if (!e.isFinal) return Xn;
  const t = Math.max(0, rP(gc.config?.minSilenceDurationMs) ?? A) / 1e3,
    n = rP(gc.config?.vadSilenceThresholdSecs),
    a = null !== n ? n : w;
  return dP(Math.max(t, a) + Jn, 0.35, 1.4);
}
function rR(e = null, t = Date.now(), n = null) {
  const a = e || gc.lastTranscriptTiming || QA(null, {}),
    r = rP(a.mediaTime),
    i = rP(a.transcriptReceivedAtMs),
    o = rP(a.audioStartWallTimeMs),
    s = rP(a.audioEndWallTimeMs),
    l = rP(a.sourceWallTimeMs),
    c = rP(n) || t,
    d = o || l || i || t,
    u = o || s || l || null,
    m = i || c,
    g = null !== u && null !== m ? Math.max(0, m - u) : null,
    p = null !== s && null !== m ? Math.max(0, m - s) : null,
    f = null !== i ? Math.max(0, c - i) : null,
    h = Math.max(0, t - c);
  return {
    ...a,
    mediaTime: r,
    audioStartWallTimeMs: o,
    audioEndWallTimeMs: s,
    transcriptReceivedAtMs: i,
    translationStartedAtMs: c,
    translationReadyAtMs: t,
    pipelineStartMs: d,
    sttLatencyMs: g,
    sttFromAudioEndMs: p,
    translationQueueMs: f,
    translationLatencyMs: h,
    pipelineLatencyMs: Math.max(0, t - d),
  };
}
function iR(e = {}) {
  const t = rP(e.pipelineLatencyMs),
    n = rP(e.sttLatencyMs),
    a = rP(e.sttFromAudioEndMs),
    r = rP(e.translationQueueMs),
    i = rP(e.translationLatencyMs);
  return null === t && null === n && null === i
    ? null
    : {
        totalMs: null !== t ? Math.round(t) : null,
        totalSeconds: null !== t ? t / 1e3 : null,
        sttMs: null !== n ? Math.round(n) : null,
        sttSeconds: null !== n ? n / 1e3 : null,
        sttFromAudioEndMs: null !== a ? Math.round(a) : null,
        sttFromAudioEndSeconds: null !== a ? a / 1e3 : null,
        queueMs: null !== r ? Math.round(r) : null,
        queueSeconds: null !== r ? r / 1e3 : null,
        llmMs: null !== i ? Math.round(i) : null,
        llmSeconds: null !== i ? i / 1e3 : null,
        audioStartWallTimeMs: rP(e.audioStartWallTimeMs),
        audioEndWallTimeMs: rP(e.audioEndWallTimeMs),
        transcriptReceivedAtMs: rP(e.transcriptReceivedAtMs),
        translationStartedAtMs: rP(e.translationStartedAtMs),
        translationReadyAtMs: rP(e.translationReadyAtMs),
      };
}
function oR(e, t, n) {
  if (!e.length) return e;
  const a = uR(e, t, n),
    r = hR(a, t?.words, n) || a;
  return (sR(r, t), lR(r, t, n), r);
}
function sR(e, t) {
  if (!t?.isFinal || !e.length) return;
  const n = {};
  for (const t of e) {
    const e = t.timingSource || "none";
    n[e] = (n[e] || 0) + 1;
  }
  Nx(
    "subtitle.timing_sources",
    {
      segments: e.length,
      counts: n,
      wordCount: Array.isArray(t?.words) ? t.words.length : 0,
      speechIntervalCount: Array.isArray(t?.speechIntervals)
        ? t.speechIntervals.length
        : 0,
      coarseSpeechIntervalCount: Array.isArray(t?.speechIntervals)
        ? t.speechIntervals.filter((e) => e?.coarse).length
        : 0,
      audioStartMediaTime: rP(BC(t)),
      audioEndMediaTime: rP(UC(t)),
    },
    { source: "offscreen" },
  );
}
function lR(e, t, n = "") {
  if (!t?.isFinal || "mse-audio-buffer" !== t.sourceType) return;
  const a = rP(t.sttSegmentDurationMs),
    r = rP(t.audioDurationMs),
    i = BC(t),
    o = UC(t),
    s = null !== i && null !== o && o > i ? 1e3 * (o - i) : null,
    l = sP([s, r, a]);
  if (null === l || l <= 3e3) return;
  const c = cR(t.speechIntervals),
    d = dR(t.speechIntervals),
    u = (e || [])
      .map((e) =>
        rP(e.audioStartMediaTime ?? e.mediaTime ?? e.displayAfterMediaTime),
      )
      .filter((e) => null !== e),
    m = (e || [])
      .map((e) =>
        rP(
          e.audioEndMediaTime ??
            e.mediaTimeEnd ??
            e.mediaTime ??
            e.displayAfterMediaTime,
        ),
      )
      .filter((e) => null !== e);
  if (!u.length || !m.length) return;
  const g = Math.min(...u),
    p = Math.max(...m),
    f = Math.max(0, 1e3 * (p - g)),
    h = OR(n || ""),
    S = OR((e || []).map((e) => e.original || "").join(" ")),
    M = h ? S.length / Math.max(1, h.length) : null,
    v = (e || []).reduce((e, t) => {
      const n = t.timingSource || "none";
      return ((e[n] = (e[n] || 0) + 1), e);
    }, {});
  if (
    (e || []).length > 0 &&
    (e || []).every((e) =>
      String(e.timingSource || "").startsWith("stt-word-timing"),
    ) &&
    f >= 500 &&
    null !== M &&
    M >= 0.75
  )
    return;
  const y = null !== c && c >= 400 ? Math.min(l, c) : l,
    b = y - f;
  b <= 3e3 ||
    Nx(
      "stt.batch.range_mismatch",
      {
        segmentId: t.sttSegmentId,
        audioDurationMs: Math.round(l),
        sttSegmentDurationMs: null !== a ? Math.round(a) : null,
        timingAudioDurationMs: null !== r ? Math.round(r) : null,
        explicitRangeMs: null !== s ? Math.round(s) : null,
        expectedCoverageMs: Math.round(y),
        mappedSpanMs: Math.round(f),
        missingMs: Math.round(b),
        speechSpanMs: null !== c ? Math.round(c) : null,
        speechCoverageMs: null !== d ? Math.round(d) : null,
        spanStart: aP(g),
        spanEnd: aP(p),
        segments: e.length,
        sourceTextChars: h.length,
        emittedTextChars: S.length,
        sourceTextCoverageRatio: aP(M),
        timingSourceCounts: v,
        wordCount: Array.isArray(t.words) ? t.words.length : 0,
        speechIntervalCount: Array.isArray(t.speechIntervals)
          ? t.speechIntervals.length
          : 0,
        chunkMediaRanges: Array.isArray(t.chunkMediaRanges)
          ? t.chunkMediaRanges
          : [],
      },
      { source: "offscreen", level: "warn" },
    );
}
function cR(e = null) {
  if (!Array.isArray(e) || !e.length) return null;
  const t = e.map((e) => rP(e?.start)).filter((e) => null !== e),
    n = e.map((e) => rP(e?.end)).filter((e) => null !== e);
  if (!t.length || !n.length) return null;
  const a = Math.max(...n) - Math.min(...t);
  return a > 0 ? 1e3 * a : null;
}
function dR(e = null) {
  if (!Array.isArray(e) || !e.length) return null;
  const t = e.reduce((e, t) => {
    const n = rP(t?.start),
      a = rP(t?.end);
    return null === n || null === a || a <= n ? e : e + (a - n);
  }, 0);
  return t > 0 ? 1e3 * t : null;
}
function uR(e, t, n) {
  const a = BC(t),
    r = UC(t),
    i = null !== a && null !== r && r > a,
    o = i ? r : rP(t?.mediaTime);
  if (null === o) return e;
  const s = i ? dP(r - a, 0.2, 120) : kR(n, e, t);
  let l = 0;
  const c = e.reduce((e, t) => e + CR(t), 0) || e.length,
    d = i ? a : Math.max(0, o - s),
    u = gR(t?.words),
    m = Array.isArray(t?.speechIntervals) ? t.speechIntervals : [],
    g = i ? pR([...u, ...m], a, r) : null,
    p = u.length > 0;
  return e.map((e, t) => {
    const n = CR(e),
      a = l / c;
    l += n;
    const r = l / c,
      u = g ? fR(g, a) : d + a * s,
      m = g ? fR(g, r) : d + r * s;
    return {
      ...e,
      mediaTime: aP(u),
      displayAfterMediaTime: aP(u),
      audioStartMediaTime: aP(u),
      audioEndMediaTime: aP(Math.min(m, o)),
      mediaTimeEnd: aP(Math.min(m, o)),
      timingSource: p
        ? "stt-word-timing-estimate"
        : g
          ? "speech-interval-estimate"
          : i
            ? "source-media-range-estimate"
            : e.timingSource,
    };
  });
}
function mR(e, t, n) {
  return pR(gR(e), t, n);
}
function gR(e) {
  return Array.isArray(e) && e.length
    ? e
        .map((e) => ({
          start: rP(e?.mediaStartTime),
          end: rP(e?.mediaEndTime),
        }))
        .filter((e) => null !== e.start && null !== e.end && e.end > e.start)
    : [];
}
function pR(e, t, n) {
  if (!Array.isArray(e) || !e.length) return null;
  const a = rP(t),
    r = rP(n);
  if (null === a || null === r || r <= a) return null;
  const i = [];
  for (const t of e) {
    const e = dP(rP(t.start) ?? a, a, r),
      n = dP(rP(t.end) ?? a, a, r);
    n > e && i.push({ start: e, end: n });
  }
  if (!i.length) return null;
  i.sort((e, t) => e.start - t.start);
  const o = [];
  for (const e of i) {
    const t = o[o.length - 1];
    t && e.start <= t.end + 0.001
      ? (t.end = Math.max(t.end, e.end))
      : o.push({ ...e });
  }
  let s = 0;
  const l = o.map((e) => {
    const t = { start: e.start, end: e.end, cumulativeStart: s };
    return ((s += e.end - e.start), t);
  });
  return s < 0.4 ? null : { spans: l, total: s };
}
function fR(e, t) {
  const n = dP(t, 0, 1) * e.total;
  for (const t of e.spans) {
    const e = t.end - t.start;
    if (n <= t.cumulativeStart + e + 1e-9)
      return t.start + Math.max(0, n - t.cumulativeStart);
  }
  return e.spans[e.spans.length - 1].end;
}
function hR(e, t, n) {
  if (!Array.isArray(t) || !t.length || !e.length) return null;
  const a = yR(t);
  if (!a || !a.canonical) return null;
  const r = OR(n);
  let i = r ? a.canonical.indexOf(r) : 0;
  i < 0 && (i = 0);
  const o = e.map((e) => {
    const t = bR(a, e.original, i);
    return t ? ((i = Math.max(i, t.canonicalEnd)), SR(t, e)) : null;
  });
  if (!o.some(Boolean)) return null;
  const s = e.map((e, t) => {
    const n = o[t];
    return n
      ? {
          ...e,
          mediaTime: aP(n.mediaStartTime),
          displayAfterMediaTime: aP(n.mediaStartTime),
          audioStartMediaTime: aP(n.mediaStartTime),
          audioEndMediaTime: aP(n.mediaEndTime),
          mediaTimeEnd: aP(n.mediaEndTime),
          timingSource:
            "exact" === n.matchKind
              ? "stt-word-timing"
              : "stt-word-timing-partial-estimate",
        }
      : { ...e };
  });
  return (vR(s, o), MR(s) ? null : s);
}
function SR(e, t) {
  if (!e || "exact" === e.matchKind) return e;
  const n = rP(
      t?.audioStartMediaTime ?? t?.mediaTime ?? t?.displayAfterMediaTime,
    ),
    a = rP(t?.audioEndMediaTime ?? t?.mediaTimeEnd ?? t?.mediaTime);
  let r = rP(e.mediaStartTime),
    i = rP(e.mediaEndTime);
  return null === r || null === i
    ? e
    : ("suffix" === e.matchKind && null !== n && (r = Math.min(r, n)),
      "prefix" === e.matchKind && null !== a && (i = Math.max(i, a)),
      { ...e, mediaStartTime: r, mediaEndTime: Math.max(r, i) });
}
function MR(e = []) {
  if (!Array.isArray(e) || !e.length) return !1;
  let t = null;
  for (const n of e) {
    const e = rP(
        n?.audioStartMediaTime ?? n?.mediaTime ?? n?.displayAfterMediaTime,
      ),
      a = rP(n?.audioEndMediaTime ?? n?.mediaTimeEnd ?? n?.mediaTime);
    if (null === e || null === a || a - e < 0.12) return !0;
    if (null !== t && e < t - 0.02) return !0;
    t = a;
  }
  return !1;
}
function vR(e, t) {
  let n = 0;
  for (; n < e.length; ) {
    if (t[n]) {
      n += 1;
      continue;
    }
    let a = n;
    for (; a < e.length && !t[a]; ) a += 1;
    const r = n > 0 ? rP(e[n - 1].audioEndMediaTime) : null,
      i = a < e.length ? rP(e[a].audioStartMediaTime) : null,
      o = rP(e[n].audioStartMediaTime),
      s = rP(e[a - 1].audioEndMediaTime);
    let l = r ?? o,
      c = i ?? s;
    if (null === l && null === c) {
      n = a;
      continue;
    }
    (null === l && (l = Math.min(c, o ?? c)),
      null === c && (c = Math.max(l, s ?? l)),
      c < l && (c = l));
    const d = e.slice(n, a),
      u = d.reduce((e, t) => e + CR(t), 0) || d.length;
    let m = 0;
    for (let t = n; t < a; t += 1) {
      const n = l + (m / u) * (c - l);
      m += CR(e[t]);
      const a = l + (m / u) * (c - l);
      e[t] = {
        ...e[t],
        mediaTime: aP(n),
        displayAfterMediaTime: aP(n),
        audioStartMediaTime: aP(n),
        audioEndMediaTime: aP(a),
        mediaTimeEnd: aP(a),
        timingSource: "stt-word-timing-interpolated",
      };
    }
    n = a;
  }
}
function yR(e) {
  const t = [],
    n = [];
  let a = "";
  for (const r of e) {
    const e = rP(r.mediaStartTime),
      i = rP(r.mediaEndTime),
      o = OR(r.text);
    if (!o || null === e || null === i) continue;
    const s = t.length,
      l = a.length;
    a += o;
    for (let e = 0; e < o.length; e += 1) n.push(s);
    t.push({
      text: r.text,
      canonicalStart: l,
      canonicalEnd: a.length,
      mediaStartTime: e,
      mediaEndTime: Math.max(e, i),
    });
  }
  return t.length
    ? { canonical: a, entries: t, wordIndexByCanonicalIndex: n }
    : null;
}
function bR(e, t, n) {
  const a = OR(t);
  if (!a) return null;
  const r = Math.max(0, n - 12),
    i = e.canonical.indexOf(a, r);
  if (i >= 0) {
    const t = TR(e, i, i + a.length);
    return t ? { ...t, matchKind: "exact" } : null;
  }
  const o = Math.min(48, a.length),
    s = Math.min(o, Math.max(6, Math.floor(0.6 * a.length)));
  for (let t = o; t >= s; t -= 1) {
    const n = a.slice(0, t),
      i = e.canonical.indexOf(n, r);
    if (i >= 0) {
      const n = TR(e, i, i + t);
      return n ? { ...n, matchKind: "prefix" } : null;
    }
    const o = a.slice(-t),
      s = e.canonical.indexOf(o, r);
    if (s >= 0) {
      const n = TR(e, s, s + t);
      return n ? { ...n, matchKind: "suffix" } : null;
    }
  }
  return null;
}
function TR(e, t, n) {
  const a = e.wordIndexByCanonicalIndex[t],
    r = e.wordIndexByCanonicalIndex[Math.max(t, n - 1)];
  if (!Number.isInteger(a) || !Number.isInteger(r)) return null;
  const i = e.entries[a],
    o = e.entries[r];
  if (!i || !o) return null;
  const s = wR(i, t),
    l = wR(o, n);
  return {
    canonicalStart: t,
    canonicalEnd: n,
    mediaStartTime: s,
    mediaEndTime: Math.max(s, l),
  };
}
function wR(e, t) {
  const n = rP(e?.canonicalStart),
    a = rP(e?.canonicalEnd),
    r = rP(e?.mediaStartTime),
    i = rP(e?.mediaEndTime);
  return null === n ||
    null === a ||
    null === r ||
    null === i ||
    a <= n ||
    i <= r
    ? (r ?? i ?? 0)
    : r + dP((Number(t) - n) / (a - n), 0, 1) * (i - r);
}
function kR(e, t, n) {
  const a = rP(n.audioDurationMs);
  return null !== a && a > 0
    ? dP(a / 1e3, 0.8, 16)
    : dP(
        Array.from(wD(e || t.map((e) => e.original).join(" "))).length / 8,
        0.8,
        Math.max(2.4, 1.2 * t.length),
      );
}
function CR(e) {
  const t = Array.from(wD(e.original)).length,
    n = Array.from(wD(e.translation)).length;
  return Math.max(4, t, Math.round(0.75 * n));
}
function AR(e) {
  return Array.isArray(e) && e.length
    ? e
        .map((e, t) => {
          const n = wD(
              e.text ??
                e.word ??
                e.value ??
                e.token ??
                e.content ??
                e.label ??
                "",
            ),
            a = rP(e.start ?? e.start_time ?? e.startTime ?? e.begin),
            r = rP(e.end ?? e.end_time ?? e.endTime ?? e.stop);
          return n && null !== a && null !== r
            ? {
                index: t,
                text: n,
                startSeconds: Math.max(0, Math.min(a, r)),
                endSeconds: Math.max(a, r),
              }
            : null;
        })
        .filter(Boolean)
        .slice(-600)
    : [];
}
function RR(e, t = 0) {
  return Array.isArray(e) && e.length
    ? e
        .map((e) => {
          let n = ER(e.startSeconds);
          const a = ER(e.endSeconds);
          if (null === n || null === a) return null;
          const r = Math.max(0, e.endSeconds - e.startSeconds);
          let i = !1;
          if (a - n > Math.max(rn, r * on + 0.5)) {
            const e = cy();
            ((n = Math.max(0, a - r * e)), (i = !0));
          }
          return {
            index: e.index,
            text: e.text,
            startSeconds: aP(e.startSeconds),
            endSeconds: aP(e.endSeconds),
            mediaStartTime: aP(Math.max(0, n - t)),
            mediaEndTime: aP(Math.max(0, a - t)),
            mediaTimingDiscontinuityRepaired: i,
          };
        })
        .filter((e) => e && e.mediaEndTime >= e.mediaStartTime)
    : [];
}
function xR(e) {
  if (!Array.isArray(e) || !e.length)
    return { startSeconds: null, endSeconds: null, durationSeconds: null };
  const t = [],
    n = [];
  for (const a of e) {
    const e = rP(
        a.startSeconds ?? a.start ?? a.start_time ?? a.startTime ?? a.begin,
      ),
      r = rP(a.endSeconds ?? a.end ?? a.end_time ?? a.endTime ?? a.stop);
    (null !== e && t.push(e), null !== r && n.push(r));
  }
  const a = t.length ? Math.min(...t) : null,
    r = n.length ? Math.max(...n) : null;
  return {
    startSeconds: a,
    endSeconds: r,
    durationSeconds: null !== a && null !== r ? Math.max(0, r - a) : null,
  };
}
function ER(e) {
  const t = rP(e),
    n = PR(t);
  if (null !== n) return n;
  const a = gc.captureMediaClock;
  return null !== t && a
    ? a.mediaTime - Math.max(0, a.audioMs / 1e3 - t)
    : null;
}
function PR(e) {
  const t = rP(e);
  if (null === t) return null;
  const n = 1e3 * t,
    a = gc.sentAudioTimeline || [];
  for (let e = a.length - 1; e >= 0; e -= 1) {
    const t = a[e],
      r = rP(t.sentStartMs),
      i = rP(t.sentEndMs);
    if (null === r || null === i) continue;
    if (n < r - 1 || n > i + 80) continue;
    const o = rP(t.sourceMediaStartTime),
      s = rP(t.sourceMediaEndTime);
    return null === o && null === s
      ? null
      : null === o
        ? s
        : null === s
          ? o
          : o + (s - o) * dP((n - r) / Math.max(1, i - r), 0, 1);
  }
  const r = a[a.length - 1],
    i = rP(r?.sentEndMs),
    o = rP(r?.sourceMediaEndTime);
  return null !== i && null !== o && n > i ? o + (n - i) / 1e3 : null;
}
function DR(e) {
  const t = rP(e);
  if (null === t) return null;
  const n = 1e3 * t,
    a = gc.sentAudioTimeline || [];
  for (let e = a.length - 1; e >= 0; e -= 1) {
    const t = a[e],
      r = rP(t.sentStartMs),
      i = rP(t.sentEndMs);
    if (null === r || null === i) continue;
    if (n < r - 1 || n > i + 80) continue;
    const o = rP(t.captureStartWallTimeMs),
      s = rP(t.captureEndWallTimeMs);
    return null === o && null === s
      ? null
      : null === o
        ? s
        : null === s
          ? o
          : o + (s - o) * dP((n - r) / Math.max(1, i - r), 0, 1);
  }
  const r = a[a.length - 1],
    i = rP(r?.sentEndMs),
    o = rP(r?.captureEndWallTimeMs);
  return null !== i && null !== o && n > i ? o + (n - i) : null;
}
function IR(e, t = null) {
  const n = wD(e);
  if (zm() && null !== BC(t) && null !== UC(t))
    return {
      text: n,
      overlapChars: 0,
      trimDisabledReason: "media-timeline-coverage",
    };
  if (oC(t))
    return { text: n, overlapChars: 0, trimDisabledReason: "mse-gap-recovery" };
  const a = qR(n, LR());
  return (
    a.overlapChars >= 6 &&
      console.log(
        `[offscreen] trimmed known prefix: ${a.overlapChars} chars, ${n.length} -> ${a.text.length}`,
      ),
    a
  );
}
function LR() {
  return GR(wD(gc.displayedOriginalText), xn);
}
function _R() {
  const e = wD(gc.scheduledOriginalText),
    t = wD(gc.displayedOriginalText);
  return GR(
    e || t,
    UE(tP(gc.config?.provider)) ? (ZT(gc.config?.sourceLang) ? Pn : Dn) : En,
  );
}
function BR(e) {
  const t = wD(e);
  t &&
    (gc.displayedOriginalText.endsWith(t) ||
      (gc.displayedOriginalText = GR(
        wD(`${gc.displayedOriginalText} ${t}`),
        An,
      )));
}
function UR(e) {
  const t = wD(e);
  t &&
    (gc.scheduledOriginalText.endsWith(t) ||
      (gc.scheduledOriginalText = GR(
        wD(`${gc.scheduledOriginalText} ${t}`),
        Rn,
      )));
}
function qR(e, t) {
  const n = FR(e),
    a = NR(t, In);
  for (let t = Math.min(a.length, n.canonical.length, 900); t >= 6; t -= 1) {
    const r = n.canonical.slice(0, t);
    if (a.slice(-t) !== r) continue;
    const i = n.rawEndByCanonicalIndex[t - 1] ?? 0;
    return {
      text: wD(
        e
          .slice(i)
          .replace(
            /^[\s、。，,.!?！？?…・「」『』（）()[\]{}"'`~\-—_:：;；/\\|]+/,
            "",
          ),
      ),
      overlapChars: t,
    };
  }
  return { text: e, overlapChars: 0 };
}
function FR(e) {
  const t = String(e || ""),
    n = Array.from(t);
  let a = "";
  const r = [];
  let i = 0;
  for (const e of n) ((i += e.length), HR(e) || ((a += e), r.push(i)));
  return { canonical: a, rawEndByCanonicalIndex: r };
}
function OR(e) {
  return FR(e).canonical;
}
function NR(e, t) {
  const n = Array.from(OR(e));
  return n.length <= t ? n.join("") : n.slice(-t).join("");
}
function HR(e) {
  return /[\s、。，,.!?！？?…・「」『』（）()[\]{}"'`~\-—_:：;；/\\|]/.test(e);
}
function GR(e, t) {
  const n = Array.from(e);
  return n.length <= t ? e : n.slice(-t).join("").trim();
}
function WR(e) {
  const t = wD(e);
  t &&
    ((gc.subtitlePipelineStats.finalTranscripts += 1),
    (gc.subtitlePipelineStats.finalTranscriptChars += Array.from(t).length));
}
function $R(e, t, n = null, a = null, r = 0, i = null, o = null) {
  if (!t && !KR(a)) return;
  const s = i ? qP(i) : null,
    l = o || nE();
  if (t) {
    const t = wD(e);
    if (!t) return;
    (GT(n)
      ? (gc.finalTranslationBatch.push({
          text: t,
          timing: n,
          retryCount: Math.max(0, Math.round(Number(r) || 0)),
          providerOverride: s,
          requestContext: l,
          queuedAtMs: Date.now(),
        }),
        (gc.finalBatchStats.queuedSegments += 1),
        (gc.finalBatchStats.estimatedCallsWithoutBatch += 1),
        (gc.finalBatchStats.enabled = !0))
      : (gc.pendingFinalTranslation = {
          text: t,
          isFinal: !0,
          timing: n,
          interimVersion: a,
          retryCount: Math.max(0, Math.round(Number(r) || 0)),
          providerOverride: s,
          requestContext: l,
        }),
      (gc.subtitlePipelineStats.pendingFinalMerges += 1));
  } else
    gc.pendingInterimTranslation = {
      text: e,
      isFinal: !1,
      timing: n,
      interimVersion: a,
      retryCount: 0,
      providerOverride: s,
      requestContext: l,
    };
}
function VR(e, t) {
  const n = wD([e?.text, t?.text].filter(Boolean).join(" ")),
    a = [e?.timing, t?.timing].filter(Boolean).map((e) => ({ timing: e }));
  return {
    text: n,
    isFinal: !0,
    timing: a.length > 0 ? ck(a) : t?.timing || e?.timing || null,
    providerOverride: t?.providerOverride || e?.providerOverride || null,
    retryCount: Math.max(
      0,
      Math.round(Number(e?.retryCount || 0) || 0),
      Math.round(Number(t?.retryCount || 0) || 0),
    ),
  };
}
function jR() {
  if (gc.pendingFinalTranslation) {
    const e = gc.pendingFinalTranslation;
    return ((gc.pendingFinalTranslation = null), e);
  }
  if (gc.pendingInterimTranslation) {
    const e = gc.pendingInterimTranslation;
    return ((gc.pendingInterimTranslation = null), e);
  }
  return null;
}
function KR(e) {
  return null == e ? FT() : FT() && e === gc.interimTranslationVersion;
}
function zR() {
  (gc.walletCachePublicationQueue?.close("capture-reset"),
    (gc.walletCachePublicationQueue = null),
    gc.videoSubtitleCacheFlushTimer &&
      clearTimeout(gc.videoSubtitleCacheFlushTimer),
    (gc.videoSubtitleCacheQueue = []),
    (gc.videoSubtitleCacheCoverageQueue = []),
    (gc.videoSubtitleCachePendingDisplayCandidates = new Map()),
    (gc.videoSubtitleCacheContextKey = ""),
    (gc.videoSubtitleCacheFlushTimer = null),
    (gc.videoSubtitleCacheFlushInFlight = !1),
    (gc.videoSubtitleCacheDropped = 0),
    (gc.videoSubtitleCacheQualityRejectedCount = 0),
    (gc.videoSubtitleCacheQualityRejectionReasons = {}),
    (gc.videoSubtitleCacheFirstQueuedAt = 0),
    (gc.videoSubtitleCacheLastFlushAt = 0),
    (gc.videoSubtitleCacheEndFlushAt = 0));
}
function QR() {
  return Boolean(
    gc.config &&
      !0 !== gc.config.disableSubtitleCache &&
      !0 !== gc.config.sttContextCustom,
  );
}
function JR(e = gc.config?.canonicalPageUrl || gc.config?.pageUrl || "") {
return false;
}
function XR() {
  const e = String(gc.config?.canonicalPageUrl || gc.config?.pageUrl || ""),
    t = ZR(tE() || cE(e));
  return { pageUrl: e, mediaContextKey: t, videoKey: t };
}
function ZR(e = "") {
  const t = String(e || "").trim();
  if (!t) return "";
  if (/^youtube:[A-Za-z0-9_-]{6,}$/i.test(t)) {
    const e = t.slice(t.indexOf(":") + 1).replace(/[^A-Za-z0-9_-]/g, "");
    return e ? `youtube:${e}` : "";
  }
  return /^[A-Za-z0-9_-]{6,}$/.test(t) ? `youtube:${t}` : "";
}
function YR(e = {}) {
  return ZR(
    e.mediaContextKey ||
      e.videoKey ||
      e.cacheVideoKey ||
      e.context?.mediaContextKey ||
      e.context?.videoKey ||
      "",
  );
}
function ex(e = {}, t = XR()) {
  const n = ZR(t.mediaContextKey);
  if (!n) return !1;
  const a = YR(e);
  return Boolean(a && a === n);
}
function tx(e, t = [], n = XR()) {
  if (!Array.isArray(t) || !t.length) return;
  const a = [...new Set(t.map(YR).filter(Boolean))].slice(0, 8);
  ((gc.videoSubtitleCacheDropped += t.length),
    Nx(
      "subtitle.cache.drop_context_mismatch",
      {
        kind: e,
        dropped: t.length,
        currentContext: ZR(n.mediaContextKey),
        droppedContexts: a,
        pageUrl: n.pageUrl || gc.config?.pageUrl || "",
      },
      { source: "offscreen", level: "warn" },
    ));
}
function nx(e = "quality-rejected", t = 1, n = null) {
  const a = wD(e) || "quality-rejected",
    r = Math.max(1, Math.round(Number(t) || 1)),
    i = rP(
      n?.audioStartMediaTime ??
        n?.displayAfterMediaTime ??
        n?.mediaTime ??
        n?.start,
    ),
    o = rP(
      n?.audioEndMediaTime ?? n?.mediaTimeEnd ?? n?.mediaEndTime ?? n?.end,
    );
  null !== i && null !== o && o > i
    ? fx(
        { sourceMediaStartTime: i, sourceMediaEndTime: o },
        { source: "pipeline-quality", reason: a, status: "failed" },
      )
    : (gc.videoSubtitleCacheQualityRejectedCount =
        Math.max(
          0,
          Math.round(Number(gc.videoSubtitleCacheQualityRejectedCount) || 0),
        ) + r);
  const s =
    gc.videoSubtitleCacheQualityRejectionReasons &&
    "object" == typeof gc.videoSubtitleCacheQualityRejectionReasons
      ? gc.videoSubtitleCacheQualityRejectionReasons
      : {};
  ((s[a] = Math.max(0, Math.round(Number(s[a]) || 0)) + r),
    (gc.videoSubtitleCacheQualityRejectionReasons = s));
}
function ax(e = {}, t = {}, n = {}) {
  const a =
      e?.segmentation && "object" == typeof e.segmentation
        ? e.segmentation
        : {},
    r =
      a.translationQuality && "object" == typeof a.translationQuality
        ? a.translationQuality
        : {},
    i = !0 === n.coverageAccepted || !0 === a.coverageAccepted,
    o = !0 === n.translationQualityAccepted || !0 === r.accepted,
    s = !1 !== t.isComplete,
    l = i && o && s;
  return {
    cacheSchemaVersion: 3,
    coverageAccepted: i,
    translationQualityAccepted: o,
    isComplete: s,
    translationStatus: l ? "translated" : "incomplete",
    cacheEligibility: l ? "translated-final" : "incomplete",
    qualityStatus: l ? "verified" : "incomplete",
  };
}
function rx() {
  return (
    gc.videoSubtitleCachePendingDisplayCandidates instanceof Map ||
      (gc.videoSubtitleCachePendingDisplayCandidates = new Map()),
    gc.videoSubtitleCachePendingDisplayCandidates
  );
}
function ix(e) {
  return (
    "sql-wallet-v1" === gc.config?.walletBillingProtocol &&
    !0 !== gc.config.sourceIsLiveStream &&
    gc.sessionId === e.sessionId &&
    gc.config.backendUrl === e.backendUrl &&
    gc.config.auth?.uid === e.uid &&
    XR().mediaContextKey === e.mediaKey &&
    QR()
  );
}
function ox() {
  const e = gc.walletCachePublicationQueue;
  if (e && !e.snapshot().closed && ix(e.owner)) return e;
  if (
    (e?.close("owner-changed"),
    (gc.walletCachePublicationQueue = null),
    !(
      globalThis.SubruuWalletCachePublication &&
      gc.config?.auth?.uid &&
      gc.sessionId &&
      "sql-wallet-v1" === gc.config?.walletBillingProtocol &&
      !0 !== gc.config.sourceIsLiveStream &&
      QR()
    ))
  )
    return null;
  const t = {
    uid: gc.config.auth.uid,
    sessionId: gc.sessionId,
    backendUrl: gc.config.backendUrl,
    mediaKey: XR().mediaContextKey,
  };
  return /^youtube:[A-Za-z0-9_-]{11}$/.test(t.mediaKey)
    ? ((gc.walletCachePublicationQueue =
        globalThis.SubruuWalletCachePublication.create({
          owner: t,
          isCurrent: ix,
          log: (e, n) => {
            ix(t) &&
              Nx(`subtitle.cache.wallet_${e}`, n, {
                source: "offscreen",
                requestId: n.requestId,
                level: "published" === e ? "info" : "warn",
              });
          },
          send: async ({ owner: e, body: t, signal: n }) => {
            const a = await uP();
            if (n.aborted || !ix(e) || a?.uid !== e.uid || !a?.idToken)
              throw Object.assign(new Error("字幕快取工作已切換"), {
                status: 403,
              });
            const r = await mD(
                `${e.backendUrl}/caption-wallet-sessions/${encodeURIComponent(e.sessionId)}/cache/segments`,
                {
                  method: "POST",
                  headers: hP(a),
                  body: t,
                  signal: n,
                  cache: "no-store",
                  redirect: "error",
                },
                q,
                "subtitle cache publication",
              ),
              i = await gD(r, "json", q, "subtitle cache publication");
            if (!r.ok)
              throw Object.assign(new Error(i.error || "字幕快取寫入失敗"), {
                status: r.status,
                code: i.error,
              });
            return i;
          },
        })),
      gc.walletCachePublicationQueue)
    : null;
}
function sx(e = [], t = {}) {
  if (!QR()) return [];
  if (!gc.sessionId || !gc.config || !JR(gc.config.pageUrl)) return [];
  const n = rx(),
    a = wD(t.requestId || "cache-request");
  let r = null;
  if ("sql-wallet-v1" === gc.config.walletBillingProtocol) {
    if (!t.walletTranslationRequestId || gc.isStopping || gc.stopRequestedAtMs)
      return [];
    const n = e.map((e) => ux(e));
    if (!n.length || n.some((e) => !e.accepted)) return [];
    const a = ox(),
      i = e.map((e, t) => ({
        original: e.original,
        translation: e.translation,
        startMs: Math.round(1e3 * n[t].start),
        endMs: Math.round(1e3 * n[t].end),
      }));
    if (!a?.register(t.walletTranslationRequestId, i)) return [];
    r = { queue: a, requestId: t.walletTranslationRequestId };
  }
  const i = [];
  let o = 0,
    s = 0;
  for (let l = 0; l < e.length; l += 1) {
    const c = e[l] || {},
      d = ux(c);
    if (!d.accepted) {
      for (const e of d.reasons) nx(e, 1, c);
      (i.push(""), (s += 1));
      continue;
    }
    const u = Math.round(1e3 * (d.start || 0)),
      m = Math.round(1e3 * (d.end ?? d.start ?? 0)),
      g = [gc.sessionId, gc.timelineRevision, a, l, u, m].join(":");
    (n.set(g, {
      ...c,
      cacheCandidateId: g,
      ...(r ? { walletPublication: { ...r, index: l } } : {}),
      language: t.language || null,
      translatedTo: t.translatedTo || gc.config.targetLang,
      requestId: a,
      latency: t.latency || gc.lastPipelineLatency,
      createdAt: t.createdAt || new Date().toISOString(),
      displayVerificationRequired: !0,
    }),
      i.push(g),
      (o += 1));
  }
  for (; n.size > V; ) {
    const e = n.keys().next().value,
      t = n.get(e);
    (n.delete(e),
      t?.walletPublication?.queue.reject(
        t.walletPublication.requestId,
        "display-confirmation-evicted",
      ),
      nx("display-confirmation-evicted", 1, t || {}));
  }
  return (
    (o || s) &&
      Nx(
        "subtitle.cache.display_candidates_registered",
        { requestId: a, registered: o, rejected: s, pending: n.size },
        { source: "offscreen", requestId: a, level: s ? "warn" : "info" },
      ),
    i
  );
}
function lx(e, t, n, a = {}) {
  return (
    t?.walletPublication?.queue.reject(t.walletPublication.requestId, n),
    nx(n, 1, t || a || {}),
    Nx(
      "subtitle.cache.display_candidate_rejected",
      {
        candidateId: e,
        requestId: t?.requestId || "",
        reason: n,
        syncDisplayErrorSeconds: rP(a?.syncDisplayErrorSeconds),
        plannedDisplayDurationMs: rP(a?.plannedDisplayDurationMs),
        mediaStartTime: aP(
          t?.audioStartMediaTime ?? t?.displayAfterMediaTime ?? t?.mediaTime,
        ),
        mediaEndTime: aP(t?.audioEndMediaTime ?? t?.mediaTimeEnd),
      },
      { source: "offscreen", requestId: t?.requestId || "", level: "warn" },
    ),
    { accepted: !1, rejected: !0, reason: n }
  );
}
function cx(e = {}) {
  const t = wD(e.cacheCandidateId || "");
  if (!t) return { accepted: !1, rejected: !1, reason: "no-cache-candidate" };
  const n = rx(),
    a = n.get(t);
  if (!a)
    return { accepted: !1, rejected: !1, reason: "cache-candidate-not-found" };
  n.delete(t);
  const r = OR(e.original),
    i = OR(e.translation);
  if (r !== OR(a.original) || i !== OR(a.translation))
    return lx(t, a, "display-content-mismatch", e);
  if (e.skipped) return lx(t, a, "display-skipped", e);
  if (
    e.fallbackDisplayed ||
    e.lateAfterOriginalFallback ||
    a.originalFallback ||
    a.fallbackDisplayed ||
    a.lateAfterOriginalFallback
  )
    return lx(t, a, "display-original-fallback", e);
  const o = rP(e.syncDisplayErrorSeconds);
  if (null === o) return lx(t, a, "display-timing-unverified", e);
  if (Math.abs(o) > 1)
    return lx(t, a, o > 0 ? "display-too-late" : "display-too-early", e);
  const s = {
    ...a,
    displayVerified: !0,
    displaySyncErrorSeconds: o,
    displayVerifiedAt: e.displayedAt || new Date().toISOString(),
  };
  if (a.walletPublication) {
    const { queue: n, requestId: r, index: i } = a.walletPublication;
    if (!n.confirm(r, i, e)) return lx(t, a, "wallet-publication-invalid", e);
  } else
    (Sx(s),
      hx([s], {
        reason: "display-verified-translation",
        source: "display-confirmation",
      }));
  return (
    Nx(
      "subtitle.cache.display_candidate_accepted",
      {
        candidateId: t,
        requestId: a.requestId || "",
        syncDisplayErrorSeconds: o,
        pending: n.size,
        mediaStartTime: aP(
          s.audioStartMediaTime ?? s.displayAfterMediaTime ?? s.mediaTime,
        ),
        mediaEndTime: aP(s.audioEndMediaTime ?? s.mediaTimeEnd),
      },
      { source: "offscreen", requestId: a.requestId || "" },
    ),
    { accepted: !0, rejected: !1, reason: "display-verified" }
  );
}
function dx(e = "session-ended-before-display") {
  const t = rx();
  if (!t.size) return 0;
  const n = Array.from(t.values());
  t.clear();
  for (const t of n)
    (t?.walletPublication?.queue.reject(t.walletPublication.requestId, e),
      nx(e, 1, t || {}));
  return (
    Nx(
      "subtitle.cache.pending_display_candidates_rejected",
      { reason: e, rejected: n.length },
      { source: "offscreen", level: "warn" },
    ),
    n.length
  );
}
function ux(e = {}) {
  const t = [],
    n = rP(e.audioStartMediaTime ?? e.displayAfterMediaTime ?? e.mediaTime),
    a = rP(e.audioEndMediaTime ?? e.mediaTimeEnd ?? e.mediaEndTime),
    r = wD(e.original),
    i = wD(e.translation);
  (null === n && t.push("invalid-start-time"),
    r || t.push("missing-original"),
    i || t.push("missing-translation"),
    null !== a && null !== n && a <= n && t.push("invalid-end-time"),
    !1 === e.isComplete && t.push("incomplete-segment"),
    Number(e.cacheSchemaVersion || 0) < 3 && t.push("legacy-quality-contract"),
    !0 !== e.coverageAccepted && t.push("incomplete-coverage"),
    !0 !== e.translationQualityAccepted &&
      t.push("translation-quality-unverified"),
    "translated" !== String(e.translationStatus || "").toLowerCase() &&
      t.push("translation-not-final"),
    "translated-final" !== String(e.cacheEligibility || "").toLowerCase() &&
      t.push("cache-ineligible"));
  const o = [
    e.translationStatus,
    e.qualityStatus,
    e.cacheEligibility,
    e.segmentationMethod,
    e.splitReason,
    e.fallbackReason,
    e.fallbackKind,
  ]
    .map((e) =>
      String(e || "")
        .trim()
        .toLowerCase(),
    )
    .filter(Boolean)
    .join(" ");
  return (
    (e.originalFallback ||
      e.isOriginalFallback ||
      e.fallbackDisplayed ||
      e.lateAfterOriginalFallback ||
      e.translationFailed ||
      /(?:original[\s_-]*fallback|fallback[\s_-]*original|original[\s_-]*only|source[\s_-]*only|deadline[\s_-]*original|translation[\s_-]*(?:failed|error))/.test(
        o,
      )) &&
      t.push("original-fallback"),
    String(gc.config?.sourceLang || "auto").toLowerCase() !==
      String(gc.config?.targetLang || "zh").toLowerCase() &&
      OR(r) &&
      OR(r) === OR(i) &&
      Array.from(r).length >= 8 &&
      t.push("likely-untranslated-copy"),
    {
      accepted: 0 === t.length,
      reasons: [...new Set(t)],
      start: n,
      end: a,
      original: r,
      translation: i,
    }
  );
}
function mx(e = {}) {
  const t = ux(e);
  if (!t.accepted) return null;
  const { start: n, end: a, original: r, translation: i } = t,
    o = XR();
  return o.mediaContextKey
    ? {
        ...e,
        original: r,
        translation: i,
        mediaTime: n,
        displayAfterMediaTime: rP(e.displayAfterMediaTime) ?? n,
        audioStartMediaTime: n,
        audioEndMediaTime: null !== a && a > n ? a : n + 2.4,
        mediaTimeEnd: null !== a && a > n ? a : n + 2.4,
        order: Math.max(
          0,
          Math.round(Number(e.order || gc.videoSubtitleCacheQueue.length)),
        ),
        isComplete: !0,
        cacheSchemaVersion: 3,
        coverageAccepted: !0,
        translationQualityAccepted: !0,
        cacheEligibility: e.cacheEligibility,
        translationStatus: e.translationStatus,
        qualityStatus: e.qualityStatus || "verified",
        pageUrl: o.pageUrl,
        mediaContextKey: o.mediaContextKey,
        videoKey: o.videoKey,
        cacheVideoKey: o.videoKey,
      }
    : null;
}
function gx(e = {}, t = {}) {
  let n = rP(e.startMs ?? e.start_ms),
    a = rP(e.endMs ?? e.end_ms);
  if (null === n || null === a) {
    const t = sP([
        e.sourceMediaStartTime,
        e.audioStartMediaTime,
        e.displayAfterMediaTimeStart,
        e.mediaTimeStart,
        e.mediaTime,
        e.startSeconds,
        e.start,
      ]),
      r = sP([
        e.sourceMediaEndTime,
        e.audioEndMediaTime,
        e.displayAfterMediaTimeEnd,
        e.mediaTimeEnd,
        e.mediaEndTime,
        e.endSeconds,
        e.end,
      ]);
    null !== t && null !== r && ((n = 1e3 * t), (a = 1e3 * r));
  }
  if (null === n || null === a || a <= n) return null;
  const r = XR(),
    i = ZR(
      t.mediaContextKey ||
        e.mediaContextKey ||
        e.videoKey ||
        e.cacheVideoKey ||
        r.mediaContextKey,
    );
  if (!i) return null;
  const o = String(t.status || e.status || e.processingStatus || "complete")
      .trim()
      .toLowerCase(),
    s = "failed" === o || "incomplete" === o ? o : "complete";
  return {
    startMs: Math.max(0, Math.round(n)),
    endMs: Math.max(0, Math.round(a)),
    segments:
      Math.max(
        0,
        Math.round(Number(e.segments ?? e.segmentCount ?? t.segments ?? 0)),
      ) || 1,
    source: String(t.source || e.source || "processed-audio"),
    reason: String(t.reason || e.reason || ""),
    status: s,
    pageUrl: r.pageUrl,
    mediaContextKey: i,
    videoKey: i,
    cacheVideoKey: i,
  };
}
function px(e = []) {
  const t = (Array.isArray(e) ? e : [])
      .map((e) => gx(e))
      .filter(Boolean)
      .sort((e, t) => e.startMs - t.startMs || e.endMs - t.endMs),
    n = [];
  for (const e of t) {
    const t = n[n.length - 1];
    !t ||
    t.status !== e.status ||
    t.reason !== e.reason ||
    e.startMs - t.endMs > 150
      ? n.push({ ...e })
      : ((t.endMs = Math.max(t.endMs, e.endMs)),
        (t.segments =
          Math.max(1, Math.round(Number(t.segments || 0))) +
          Math.max(1, Math.round(Number(e.segments || 0)))));
  }
  return n;
}
function fx(e = {}, t = {}) {
  if ("sql-wallet-v1" === gc.config?.walletBillingProtocol) return;
  if (!QR()) return;
  if (!gc.sessionId || !gc.config || !JR(gc.config.pageUrl)) return;
  const n = gx(e, t);
  if (n) {
    if (
      ((gc.videoSubtitleCacheContextKey =
        gc.videoSubtitleCacheContextKey || n.mediaContextKey || ""),
      gc.videoSubtitleCacheQueue.length ||
        gc.videoSubtitleCacheCoverageQueue.length ||
        (gc.videoSubtitleCacheFirstQueuedAt = Date.now()),
      (gc.videoSubtitleCacheCoverageQueue = px([
        ...gc.videoSubtitleCacheCoverageQueue,
        n,
      ])),
      gc.videoSubtitleCacheCoverageQueue.length > H)
    ) {
      const e = gc.videoSubtitleCacheCoverageQueue.length - H;
      (gc.videoSubtitleCacheCoverageQueue.splice(0, e),
        (gc.videoSubtitleCacheDropped += e));
    }
    gc.videoSubtitleCacheCoverageQueue.length >= N
      ? vx().catch((e) => {
          console.warn(
            "[offscreen] subtitle cache coverage flush skipped:",
            e.message,
          );
        })
      : Mx();
  }
}
function hx(e = [], t = {}) {
  if (!Array.isArray(e) || !e.length) return !1;
  let n = 0;
  for (const a of e) {
    const e = mx(a);
    e && (fx(e, { ...t, segments: 1 }), (n += 1));
  }
  return n > 0;
}
function Sx(e = {}) {
  if ("sql-wallet-v1" === gc.config?.walletBillingProtocol) return;
  if (!QR()) return;
  if (!gc.sessionId || !gc.config || !JR(gc.config.pageUrl)) return;
  const t = mx(e);
  if (t) {
    if (
      ((gc.videoSubtitleCacheContextKey =
        gc.videoSubtitleCacheContextKey || t.mediaContextKey || ""),
      gc.videoSubtitleCacheQueue.length ||
        (gc.videoSubtitleCacheFirstQueuedAt = Date.now()),
      gc.videoSubtitleCacheQueue.push(t),
      gc.videoSubtitleCacheQueue.length > H)
    ) {
      const e = gc.videoSubtitleCacheQueue.length - H;
      (gc.videoSubtitleCacheQueue.splice(0, e),
        (gc.videoSubtitleCacheDropped += e));
    }
    gc.videoSubtitleCacheQueue.length >= O
      ? vx().catch((e) => {
          console.warn("[offscreen] subtitle cache flush skipped:", e.message);
        })
      : Mx();
  } else {
    const t = ux(e);
    for (const n of t.reasons) nx(n, 1, e);
    Nx(
      "subtitle.cache.quality_rejected",
      {
        requestId: e.requestId || "",
        reasons: t.reasons,
        mediaStartTime: aP(t.start),
        mediaEndTime: aP(t.end),
        cacheSchemaVersion: Number(e.cacheSchemaVersion || 0),
      },
      { source: "offscreen", requestId: e.requestId || "", level: "warn" },
    );
  }
}
function Mx() {
  if (!QR()) return;
  if (gc.videoSubtitleCacheFlushTimer || gc.videoSubtitleCacheFlushInFlight)
    return;
  const e = Date.now(),
    t = Number(gc.videoSubtitleCacheFirstQueuedAt || e),
    n = Math.max(0, e - t),
    a = Math.max(0, F - n);
  gc.videoSubtitleCacheFlushTimer = setTimeout(() => {
    ((gc.videoSubtitleCacheFlushTimer = null),
      vx().catch((e) => {
        console.warn("[offscreen] subtitle cache flush skipped:", e.message);
      }));
  }, a);
}
async function vx(e = {}) {
  if (
    (gc.videoSubtitleCacheFlushTimer &&
      (clearTimeout(gc.videoSubtitleCacheFlushTimer),
      (gc.videoSubtitleCacheFlushTimer = null)),
    "sql-wallet-v1" === gc.config?.walletBillingProtocol)
  ) {
    ((gc.videoSubtitleCacheQueue = []),
      (gc.videoSubtitleCacheCoverageQueue = []));
    const t = gc.walletCachePublicationQueue;
    return (
      !!t &&
      (ix(t.owner)
        ? e.close
          ? t.finish()
          : t.flush({ force: !0 === e.force })
        : (t.close("owner-changed"), !1))
    );
  }
  if (!QR())
    return (
      (gc.videoSubtitleCacheQueue = []),
      (gc.videoSubtitleCacheCoverageQueue = []),
      (gc.videoSubtitleCacheContextKey = ""),
      (gc.videoSubtitleCacheFirstQueuedAt = 0),
      !1
    );
  if (gc.videoSubtitleCacheFlushInFlight) return !1;
  if (
    (!e.final &&
      !gc.videoSubtitleCacheQueue.length &&
      !gc.videoSubtitleCacheCoverageQueue.length) ||
    !gc.sessionId ||
    !gc.config
  )
    return !1;
  if (!JR())
    return (
      (gc.videoSubtitleCacheQueue = []),
      (gc.videoSubtitleCacheCoverageQueue = []),
      (gc.videoSubtitleCacheContextKey = ""),
      !1
    );
  const t = XR();
  if (!t.mediaContextKey) {
    const e = gc.videoSubtitleCacheQueue.splice(0),
      n = gc.videoSubtitleCacheCoverageQueue.splice(0);
    return (
      tx("missing-current-context:segments", e, t),
      tx("missing-current-context:coverage", n, t),
      (gc.videoSubtitleCacheContextKey = ""),
      (gc.videoSubtitleCacheFirstQueuedAt = 0),
      !1
    );
  }
  const n = await uP();
  if (!n) return (e.force || Mx(), !1);
  gc.videoSubtitleCacheFlushInFlight = !0;
  let a = [],
    r = [],
    i = !1;
  try {
    do {
      ((a = gc.videoSubtitleCacheQueue.splice(0, O)),
        (r = gc.videoSubtitleCacheCoverageQueue.splice(0, N)));
      const o = a.filter((e) => !ex(e, t)),
        s = r.filter((e) => !ex(e, t));
      if (
        (o.length && tx("segments", o, t),
        s.length && tx("coverage", s, t),
        (a = a.filter((e) => ex(e, t))),
        (r = r.filter((e) => ex(e, t))),
        !a.length && !r.length && !e.final)
      ) {
        if (
          e.force &&
          (gc.videoSubtitleCacheQueue.length ||
            gc.videoSubtitleCacheCoverageQueue.length)
        )
          continue;
        break;
      }
      const l = Boolean(
          e.final &&
            !gc.videoSubtitleCacheQueue.length &&
            !gc.videoSubtitleCacheCoverageQueue.length,
        ),
        c = r.filter((e) => "complete" === e.status),
        d = ZS(),
        u = await mD(
          `${gc.config.backendUrl}/caption-video-subtitles/segments`,
          {
            method: "POST",
            headers: hP(n),
            body: JSON.stringify({
              uid: n.uid,
              idToken: n.idToken,
              sessionId: gc.sessionId,
              pageUrl: t.pageUrl,
              originalPageUrl: gc.config.pageUrl || "",
              pageTitle: gc.config.pageTitle || "",
              durationSeconds: rP(
                gc.config.pageDurationSeconds ?? gc.config.durationSeconds,
              ),
              mediaContextKey: t.mediaContextKey,
              videoKey: t.videoKey,
              sourceLang: gc.config.sourceLang || "auto",
              targetLang: gc.config.targetLang || "zh",
              sttProvider: gc.config.sttProvider || gc.activeSttProvider,
              sttAudioSpeed: zP(),
              sttPromptApplied: Boolean(d.prompt),
              sttKeywordCount: d.keywords.length,
              sttContextSource: d.automaticApplied
                ? "perplexity"
                : d.prompt || d.keywords.length
                  ? "configured"
                  : "none",
              sttContextCustom: !0 === gc.config.sttContextCustom,
              llmProvider: gc.config.provider,
              translationProvider: gc.config.provider,
              captionMode: gc.config.captionMode || "",
              finalFlush: l,
              flushReason: e.reason || (e.final ? "final" : "periodic"),
              processingRanges: r,
              coverageRanges: c,
              coverageSource: c.length ? "processed-audio" : "",
              coverageReliable: c.length > 0,
              qualityRejectedCount: Math.max(
                0,
                Math.round(
                  Number(gc.videoSubtitleCacheQualityRejectedCount) || 0,
                ) + Math.round(Number(gc.videoSubtitleCacheDropped) || 0),
              ),
              qualityRejectionReasons: {
                ...(gc.videoSubtitleCacheQualityRejectionReasons || {}),
                ...(gc.videoSubtitleCacheDropped > 0
                  ? {
                      "client-cache-queue-dropped":
                        gc.videoSubtitleCacheDropped,
                    }
                  : {}),
              },
              segments: a,
            }),
          },
          q,
          "subtitle cache write",
        );
      if (!u.ok) throw new Error(`subtitle cache write ${u.status}`);
      const m = await u.json().catch(() => ({}));
      ((i = !0),
        (gc.videoSubtitleCacheQualityRejectedCount = 0),
        (gc.videoSubtitleCacheQualityRejectionReasons = {}),
        (gc.videoSubtitleCacheDropped = 0),
        Nx(
          "subtitle.cache.write",
          {
            batchSize: a.length,
            coverageRangeCount: r.length,
            stored: Boolean(m.stored),
            upserted: m.upserted || 0,
            replaced: m.replaced || 0,
            skipped: m.skipped || 0,
            coverageReliable: Boolean(m.track?.coverageReliable),
            coverageSource: m.track?.coverageSource || "",
            summaryMode: m.summaryMode || "",
            finalFlush: l,
            flushReason: e.reason || "",
            trackId: m.track?.trackId || "",
            videoKey: m.video?.videoKey || m.track?.videoKey || "",
          },
          { source: "offscreen", level: m.stored ? "info" : "warn" },
        ),
        (a = []),
        (r = []));
    } while (
      e.force &&
      (gc.videoSubtitleCacheQueue.length ||
        gc.videoSubtitleCacheCoverageQueue.length)
    );
    return (
      (gc.videoSubtitleCacheLastFlushAt = Date.now()),
      gc.videoSubtitleCacheQueue.length ||
        gc.videoSubtitleCacheCoverageQueue.length ||
        ((gc.videoSubtitleCacheFirstQueuedAt = 0),
        (gc.videoSubtitleCacheContextKey = "")),
      i
    );
  } catch (e) {
    throw (
      (gc.videoSubtitleCacheQueue = a
        .concat(gc.videoSubtitleCacheQueue)
        .slice(-800)),
      (gc.videoSubtitleCacheCoverageQueue = px(
        r.concat(gc.videoSubtitleCacheCoverageQueue),
      ).slice(-800)),
      (!gc.videoSubtitleCacheQueue.length &&
        !gc.videoSubtitleCacheCoverageQueue.length) ||
        gc.videoSubtitleCacheFirstQueuedAt ||
        (gc.videoSubtitleCacheFirstQueuedAt = Date.now()),
      e
    );
  } finally {
    ((gc.videoSubtitleCacheFlushInFlight = !1),
      (!gc.videoSubtitleCacheQueue.length &&
        !gc.videoSubtitleCacheCoverageQueue.length) ||
        e.force ||
        Mx());
  }
}
async function yx(e) {
  if ((Sx(e), !gc.config.saveEnabled || !gc.sessionId)) return;
  if (await wx(e)) return;
  await TextamisuPipeline.saveSegment(gc.sessionId,{
      pageUrl: gc.config.pageUrl || "",
      pageTitle: gc.config.pageTitle || "",
      sourceLang: gc.config.sourceLang,
      targetLang: gc.config.targetLang,
      startedAt: gc.config.startedAt || new Date().toISOString(),
    },e);
}
function bx(e) {
  const t = !1 === e?.newRequestsAllowed,
    n = gc.config.walletPrepaidCacheOnly !== t;
  ((gc.config.walletPrepaidCacheOnly = t),
    (gc.config.walletSpendingBlockedReason = t
      ? String(e.reason || "credits-unavailable")
      : ""),
    n &&
      t &&
      vP("cache-prepaid", "繼續顯示已預留的字幕；新增字幕需要可用額度。"));
}
async function Tx() {
delete gc.config.auth; delete gc.config.walletBillingProtocol; delete gc.config.walletSessionStart;
  const current=gc.sessionId;
  const reply=await chrome.runtime.sendMessage({type:'TEXTAMISU_SESSION_START',sessionId:current});
  if(!reply?.ok) throw Object.assign(new Error(reply?.error||'Textamisu 工作階段建立失敗'),{status:reply?.status});
  if(gc.sessionId!==current) return;
  gc.remoteSessionStarted=true; gc.usageHeartbeatConsecutiveFailures=0; gc.usageHeartbeatLastSuccessAtMs=Date.now();
  gc.textamisuSttLanguages=new Map();
  vP('saving','Textamisu HTTP 分段字幕已啟用');
}
async function wx(e) {
return false;
}
async function kx() {
if(!gc.remoteSessionStarted || !gc.sessionId) return;
  const result=await chrome.runtime.sendMessage({type:'TEXTAMISU_SESSION_END',sessionId:gc.sessionId});
  if(!result?.ok) console.warn('[Textamisu] session end:',result?.error);
  gc.remoteSessionStarted=false;
}
async function Cx(e = {}) {
if(gc.remoteSessionStartPromise) await gc.remoteSessionStartPromise;
  if(!gc.remoteSessionStarted || !gc.sessionId) return false;
  const current=gc.sessionId, value=await TextamisuPipeline.status(current);
  if(gc.sessionId!==current) return false;
  gc.usageHeartbeatConsecutiveFailures=0; gc.usageHeartbeatLastSuccessAtMs=Date.now();
  gc.textamisuBilling=value.billing; return true;
}
function Ax(e = {}) {
  const t = Number(e?.status || e?.statusCode || 0),
    n = wD(e?.code || "").toLowerCase(),
    a = wD(e?.message || e?.error || String(e || "")).toLowerCase();
  return (
    428 === t &&
    ("caption_billing_heartbeat_expired" === n ||
      "caption_billing_heartbeat_required" === n ||
      a.includes("caption_billing_heartbeat_expired") ||
      a.includes("caption_billing_heartbeat_required") ||
      a.includes("usage heartbeat expired") ||
      a.includes("billing heartbeat was not established"))
  );
}
async function Rx(e) {
  if (428 !== Number(e?.status || 0)) return null;
  let t = {};
  try {
    const n = "function" == typeof e.clone ? e.clone() : e;
    t = "function" == typeof n?.json ? await n.json() : {};
  } catch {
    t = {};
  }
  const n = new Error(
    wD(t.error || t.message || "Caption billing heartbeat expired"),
  );
  return ((n.status = 428), (n.code = wD(t.code || "")), Ax(n) ? n : null);
}
async function xx(e = 4e3) {
  const t = Date.now() + Math.max(0, Number(e) || 0);
  for (; gc.usageHeartbeatInFlight && Date.now() < t; ) await fD(50);
  return !gc.usageHeartbeatInFlight;
}
async function Ex(e = {}) {
  const t = Math.max(0, Number(gc.usageHeartbeatLastSuccessAtMs) || 0);
  if (
    gc.usageHeartbeatInFlight &&
    (await xx(), (Number(gc.usageHeartbeatLastSuccessAtMs) || 0) > t)
  )
    return !0;
  try {
    const n = await Cx({
      force: !0,
      keepalive: !0,
      reason: wD(e.reason || "paid-endpoint-lease-recovery"),
    });
    return Boolean(n || (Number(gc.usageHeartbeatLastSuccessAtMs) || 0) > t);
  } catch (t) {
    return (
      Nx(
        "billing.lease_recovery_failed",
        {
          endpoint: wD(e.endpoint || ""),
          error: t?.message || String(t || ""),
          status: Number(t?.status || t?.statusCode || 0),
        },
        { source: "offscreen", level: "error" },
      ),
      !1
    );
  }
}
async function Px(e, t = {}) {
  let n = await e();
  const a = await Rx(n);
  if (!a) return n;
  if (
    (Nx(
      "billing.lease_recovery_started",
      {
        endpoint: wD(t.endpoint || ""),
        requestId: wD(t.requestId || ""),
        code: a.code || "caption_billing_heartbeat_expired",
      },
      { source: "offscreen", level: "warn" },
    ),
    !(await Ex({ ...t, reason: "paid-endpoint-428" })))
  )
    return n;
  n = await e();
  const r = await Rx(n);
  return (
    Nx(
      r
        ? "billing.lease_recovery_exhausted"
        : "billing.lease_recovery_succeeded",
      {
        endpoint: wD(t.endpoint || ""),
        requestId: wD(t.requestId || ""),
        retryStatus: Number(n?.status || 0),
        code: r?.code || "",
      },
      { source: "offscreen", level: r ? "error" : "info" },
    ),
    n
  );
}
function Dx() {
  const e = Math.max(0, Number(gc.usageHeartbeatConsecutiveFailures || 0));
  ((gc.usageHeartbeatConsecutiveFailures = 0),
    (gc.usageHeartbeatLastSuccessAtMs = Date.now()),
    e > 0 &&
      Nx(
        "billing.usage_heartbeat_recovered",
        {
          recoveredFailures: e,
          lastSuccessAtMs: gc.usageHeartbeatLastSuccessAtMs,
        },
        { source: "offscreen" },
      ));
}
function Ix(e) {
  const t = Number(e?.status || e?.statusCode || 0);
  gc.usageHeartbeatConsecutiveFailures =
    Math.max(0, Number(gc.usageHeartbeatConsecutiveFailures || 0)) + 1;
  const n = gc.usageHeartbeatConsecutiveFailures;
  (Nx(
    "billing.usage_heartbeat_failed",
    {
      error: e?.message || String(e || ""),
      status: t,
      consecutiveFailures: n,
      lastSuccessAtMs: gc.usageHeartbeatLastSuccessAtMs || 0,
    },
    { source: "offscreen", level: "error" },
  ),
    console.warn(`[offscreen] usage heartbeat failed (${n}):`, e?.message || e),
    [401, 402, 403, 409, 426, 428].includes(t)
      ? qx(e, "usage-heartbeat")
      : (3 !== n && n % 6 != 0) ||
        Nx(
          "billing.usage_heartbeat_degraded",
          {
            status: t,
            consecutiveFailures: n,
            lastSuccessAtMs: gc.usageHeartbeatLastSuccessAtMs || 0,
            backendLeaseRemainsAuthoritative: !0,
          },
          { source: "offscreen", level: "warn" },
        ));
}
function Lx(e, t, n, a, r) {
  if (
    503 !== t ||
    "wallet_cost_pending_stop" !== e?.error ||
    !0 !== e?.usagePending ||
    "sql-wallet-v1" !== gc.config?.walletBillingProtocol ||
    gc.sessionId !== n ||
    gc.config.backendUrl !== a
  )
    return;
  const i = Object.assign(new Error("字幕服務暫時失敗，費用確認中"), {
    code: "wallet_cost_pending_stop",
    status: t,
  });
  throw (qx(i, r), i);
}
function _x(e, t, n) {
  if (
    "wallet_translation_unavailable_stop" !== e?.error ||
    !0 !== e.sessionStopped ||
    "sql-wallet-v1" !== gc.config?.walletBillingProtocol ||
    gc.sessionId !== t ||
    gc.config.backendUrl !== n
  )
    return;
  const a = Object.assign(
    new Error(
      "翻譯服務暫時不可用，已停止收音以避免持續產生辨識費用。請稍後重新開始或更換翻譯模式。",
    ),
    { code: "wallet_translation_unavailable_stop", status: 503 },
  );
  throw (qx(a, "translation-provider-unavailable"), a);
}
function Bx(e, t, n, a) {
  "wallet_session_not_authorized" === e?.code &&
    "sql-wallet-v1" === gc.config?.walletBillingProtocol &&
    gc.sessionId === t &&
    gc.config.backendUrl === n &&
    qx(
      Object.assign(
        new Error("這場字幕已結束，已停止後續收音。請重新開始字幕。"),
        { code: "wallet_session_not_authorized", status: 403 },
      ),
      a,
    );
}
function Ux(e, t, n, a) {
  "sql-wallet-v1" === gc.config?.walletBillingProtocol &&
    gc.sessionId === t &&
    gc.config.backendUrl === n &&
    (402 === e?.status &&
    ["general_credits_exhausted", "economy_credits_exhausted"].includes(e.code)
      ? qx(
          Object.assign(
            new Error(
              "可用字幕額度不足，已停止收音。請到會員中心查看額度，補充後再開始。",
            ),
            { code: "wallet_credits_exhausted", status: 402 },
          ),
          a,
        )
      : !0 === e?.terminal &&
        (!0 === e.usagePending &&
          Lx(
            { error: "wallet_cost_pending_stop", usagePending: !0 },
            503,
            t,
            n,
            a,
          ),
        "wallet_stt_provider_unavailable" === e.code &&
          !1 === e.providerCalled &&
          qx(
            Object.assign(
              new Error(
                "目前沒有可用的語音辨識服務，已停止收音。尚未送出的音訊不會扣款；請稍候再試或切換辨識模式。",
              ),
              { code: e.code, status: 503 },
            ),
            a,
          )));
}
function qx(e, t = "billing") {
  if (gc.billingStopRequested || gc.isStopping || !gc.sessionId) return !1;
  ((gc.billingStopRequested = !0),
    (gc.acceptingNewSttWork = !1),
    (gc.textEngineGAccepting = !1));
  const n = wD(e?.message || String(e || "")).slice(0, 240);
  Nx(
    "billing.integrity_stop",
    {
      source: t,
      error: n,
      status: Number(e?.status || e?.statusCode || 0),
      consecutiveFailures: gc.usageHeartbeatConsecutiveFailures || 0,
    },
    { source: "offscreen", level: "error" },
  );
  const a = "wallet_cost_pending_stop" === e?.code,
    r = [
      "wallet_translation_unavailable_stop",
      "wallet_session_not_authorized",
      "wallet_stt_provider_unavailable",
      "wallet_credits_exhausted",
    ].includes(e?.code);
  return (
    yP(
      r
        ? n
        : a
          ? "字幕服務暫時失敗，為避免持續產生費用，已停止收音。部分額度等待確認，請稍後再試。"
          : "額度驗證暫時失敗，為避免未記帳使用，字幕已自動停止。請檢查網路或重新登入後再試。",
    ),
    bc(() =>
      Pc(r ? n : a ? "字幕服務失敗，已停止收音" : "額度驗證失敗", {
        notify: !0,
        failureNotice: n,
        drainBatchPipeline: !1,
        skipFinalUsageHeartbeat: !0,
      }),
    ).catch((e) => {
      console.warn(
        "[offscreen] billing integrity stop failed:",
        e?.message || e,
      );
    }),
    !0
  );
}
function Fx() {
  if (gc.pendingUsageHeartbeatId) return gc.pendingUsageHeartbeatId;
  gc.usageHeartbeatSequence =
    Math.max(0, Math.round(Number(gc.usageHeartbeatSequence || 0))) + 1;
  const e = tP(gc.sessionId || "session");
  return (
    (gc.pendingUsageHeartbeatId = `${e}:${gc.usageHeartbeatSequence}`),
    gc.pendingUsageHeartbeatId
  );
}
function Ox(e = {}) {
  if (e && "object" == typeof e) {
    if ("status" === e.kind) {
      const t = `${tP(e.status || "")}|${tP(e.message || "")}`,
        n = Date.now();
      if (
        t === gc.lastClientStatusLogSignature &&
        n - (gc.lastClientStatusLoggedAtMs || 0) < ur
      )
        return;
      return (
        (gc.lastClientStatusLogSignature = t),
        (gc.lastClientStatusLoggedAtMs = n),
        void Nx(
          "client.status",
          { status: e.status || "", message: e.message || "" },
          { source: "offscreen" },
        )
      );
    }
    if ("error" !== e.kind)
      if ("transcript" !== e.kind)
        if ("translation" !== e.kind) {
          if ("mse-readiness" === e.kind) {
            const t =
                e.sync?.mseStartupReadiness || e.mseStartupReadiness || {},
              n = [
                tP(e.reason || ""),
                Boolean(t.startupReleaseReady),
                Boolean(t.startupReleaseReadyCurrent),
                Math.round(2 * Number(t.readySubtitleLeadSeconds || 0)) / 2,
                Math.round(2 * Number(t.releaseRequiredLeadSeconds || 0)) / 2,
                Array.isArray(t.readySubtitleRanges)
                  ? t.readySubtitleRanges.length
                  : 0,
              ].join("|"),
              a = Date.now();
            if (
              n === gc.lastMseReadinessLogSignature &&
              a - (gc.lastMseReadinessLoggedAtMs || 0) < mr
            )
              return;
            return (
              (gc.lastMseReadinessLogSignature = n),
              (gc.lastMseReadinessLoggedAtMs = a),
              void Nx(
                "mse.audio_buffer.readiness_delivery",
                {
                  reason: e.reason || "",
                  mediaTime: aP(e.sync?.mediaTime ?? e.mediaTime),
                  mediaTimeEnd: aP(e.sync?.mediaTimeEnd ?? e.mediaTimeEnd),
                  readySubtitleLeadSeconds: aP(t.readySubtitleLeadSeconds),
                  releaseRequiredLeadSeconds: aP(t.releaseRequiredLeadSeconds),
                  startupReleaseLeadSeconds: aP(t.startupReleaseLeadSeconds),
                  startupReleaseReadyLeadSeconds: aP(
                    t.startupReleaseReadyLeadSeconds,
                  ),
                  startupReleaseReadyRanges: Wp(t.startupReleaseReadyRanges),
                  startupReleaseReadyDecision:
                    t.startupReleaseReadyDecision || null,
                  startupReleaseReady: Boolean(t.startupReleaseReady),
                  startupReleaseReadyCurrent: Boolean(
                    t.startupReleaseReadyCurrent,
                  ),
                  startupReleaseReadyAtMs: rP(t.startupReleaseReadyAtMs) || 0,
                  readySubtitleRanges: Wp(t.readySubtitleRanges),
                  readySubtitleLeadDecision:
                    t.readySubtitleLeadDecision || null,
                },
                { source: "offscreen" },
              )
            );
          }
          if ("translation-error" !== e.kind)
            if ("subtitle-pipeline-range" !== e.kind) {
              if ("usage" === e.kind) {
                const t = e.usage || {},
                  n = [
                    gc.sessionId,
                    Math.round(Number(t.creditsUsed || 0)),
                    t.totalCostUSD,
                    t.sttDurationSeconds,
                    t.capturedAudioSeconds,
                    t.totalTokens,
                    t.llmCallCount,
                  ].join("|"),
                  a = Date.now(),
                  r = Boolean(e.forceEventLog || e.final),
                  i = n === gc.lastUsageSnapshotSignature ? dr : cr;
                if (
                  !r &&
                  gc.lastUsageSnapshotLoggedAtMs > 0 &&
                  a - gc.lastUsageSnapshotLoggedAtMs < i
                )
                  return;
                ((gc.lastUsageSnapshotSignature = n),
                  (gc.lastUsageSnapshotLoggedAtMs = a),
                  Nx(
                    "billing.usage_snapshot",
                    {
                      creditsUsed: Math.max(
                        0,
                        Math.round(Number(t.creditsUsed || 0)),
                      ),
                      totalCostUSD: nP(t.totalCostUSD),
                      sttCostUSD: nP(t.sttCostUSD),
                      llmCostUSD: nP(t.llmCostUSD),
                      sttDurationSeconds: aP(t.sttDurationSeconds),
                      sttRawDurationSeconds: aP(t.sttRawDurationSeconds),
                      capturedAudioSeconds: aP(t.capturedAudioSeconds),
                      mseProcessedCoverageSeconds: aP(
                        t.mseProcessedCoverageSeconds,
                      ),
                      llmBillingMode: t.llmBillingMode || "provider-usage",
                      llmFixedUsageSeconds: aP(t.llmFixedUsageSeconds),
                      llmUserCreditsPerHour: Math.max(
                        0,
                        Math.round(Number(t.llmUserCreditsPerHour || 0)),
                      ),
                      sttBillingAmplification: aP(t.sttBillingAmplification),
                      sttCreditsPerConvertedHour: Math.max(
                        0,
                        Math.round(Number(t.sttCreditsPerConvertedHour || 0)),
                      ),
                      llmCreditsPerConvertedHour: Math.max(
                        0,
                        Math.round(Number(t.llmCreditsPerConvertedHour || 0)),
                      ),
                      totalCreditsPerConvertedHour: Math.max(
                        0,
                        Math.round(Number(t.totalCreditsPerConvertedHour || 0)),
                      ),
                      vadSkippedAudioSeconds: aP(t.vadSkippedAudioSeconds),
                      sttAudioSpeed: Math.max(1, Number(t.sttAudioSpeed || 1)),
                      sttSpeedSavedAudioSeconds: aP(
                        t.sttSpeedSavedAudioSeconds,
                      ),
                      totalTokens: Math.max(
                        0,
                        Math.round(Number(t.totalTokens || 0)),
                      ),
                      inputTokens: Math.max(
                        0,
                        Math.round(Number(t.inputTokens || 0)),
                      ),
                      outputTokens: Math.max(
                        0,
                        Math.round(Number(t.outputTokens || 0)),
                      ),
                      visibleOutputTokens: Math.max(
                        0,
                        Math.round(Number(t.visibleOutputTokens || 0)),
                      ),
                      thinkingTokens: Math.max(
                        0,
                        Math.round(Number(t.thinkingTokens || 0)),
                      ),
                      llmCallCount: Math.max(
                        0,
                        Math.round(Number(t.llmCallCount || 0)),
                      ),
                      llmFallbackCount: Math.max(
                        0,
                        Math.round(Number(t.llmFallbackCount || 0)),
                      ),
                      inputCostUSD: nP(t.inputCostUSD),
                      outputCostUSD: nP(t.outputCostUSD),
                      visibleOutputCostUSD: nP(t.visibleOutputCostUSD),
                      thinkingCostUSD: nP(t.thinkingCostUSD),
                      provider: t.provider || "",
                      providerName: t.providerName || "",
                      sttProvider: t.sttProvider || "",
                      source: t.source || "local-estimate",
                      latency: dE(t.latency || {}),
                    },
                    { source: "offscreen" },
                  ));
              }
            } else
              Nx(
                "subtitle.pipeline_range",
                {
                  stage: e.stage || "",
                  segmentId: e.segmentId || "",
                  pipelineRangeId: e.pipelineRangeId || "",
                  mediaStartTime: aP(e.mediaStartTime),
                  mediaEndTime: aP(e.mediaEndTime),
                  durationMs: Math.round(rP(e.durationMs) || 0),
                  timelineRevision: rP(e.timelineRevision),
                  requestId: e.requestId || "",
                  reason: e.reason || "",
                  done: Boolean(e.done),
                  active: !1 !== e.active,
                },
                { source: "offscreen", level: e.done ? "info" : "debug" },
              );
          else
            Nx(
              "llm.translation.error",
              {
                original: e.original || "",
                message: e.message || "",
                sync: Yx(e.sync || {}),
              },
              { source: "offscreen", level: "error" },
            );
        } else {
          const t = eE(e);
          Nx(
            e.fallbackDisplayed
              ? "subtitle.original_fallback"
              : e.isFinal
                ? "llm.translation.final"
                : "llm.translation.interim",
            {
              isFinal: Boolean(e.isFinal),
              original: e.original || "",
              translation: e.translation || "",
              segmentCount: Array.isArray(e.segments) ? e.segments.length : 0,
              detectedLang: e.detectedLang || "",
              translatedTo: e.translatedTo || "",
              fallbackDisplayed: Boolean(e.fallbackDisplayed),
              lateAfterOriginalFallback: Boolean(e.lateAfterOriginalFallback),
              pageUrl: t.pageUrl,
              mediaContextKey: t.mediaContextKey,
              sync: Yx(e.sync || {}),
              latency: dE(e.latency || e.sync || {}),
            },
            { source: "offscreen", provider: e.provider, model: e.model },
          );
        }
      else {
        const t = eE(e);
        Nx(
          e.isFinal ? "stt.transcript.final" : "stt.transcript.interim",
          {
            isFinal: Boolean(e.isFinal),
            text: e.text || "",
            textChars: Array.from(wD(e.text || "")).length,
            language: e.language || "",
            mediaTime: aP(e.mediaTime),
            wordCount: Array.isArray(e.words) ? e.words.length : 0,
            commitReason: e.commitReason || "",
            commitPendingAgeMs: rP(e.commitPendingAgeMs),
            commitPendingChars: rP(e.commitPendingChars),
            commitLocalAgreementChars: rP(e.commitLocalAgreementChars),
            commitSoftEndpoint: Boolean(e.commitSoftEndpoint),
            commitEndpointKind: e.commitEndpointKind || "",
            pageUrl: t.pageUrl,
            mediaContextKey: t.mediaContextKey,
            sync: Yx(e.sync || {}),
          },
          { source: "offscreen" },
        );
      }
    else
      Nx(
        "client.error",
        { message: e.message || "" },
        { source: "offscreen", level: "error" },
      );
  }
}
function Nx(e, t = {}, n = {}) {
return;
}
function Hx(e) {
  let t = Math.max(0, Math.round(Number(e) || 0));
  if (!t) return;
  const n = {},
    a = (e) => {
      const [a] = gc.eventLogQueue.splice(e, 1),
        r = a?.type || "unknown";
      ((n[r] = (n[r] || 0) + 1),
        (gc.eventLogDropped += 1),
        (gc.eventLogDroppedTotal += 1),
        (t -= 1));
    };
  for (const e of [Wx, (e) => !Gx(e?.type), () => !0]) {
    for (let n = 0; n < gc.eventLogQueue.length && t > 0; )
      e(gc.eventLogQueue[n]) ? a(n) : (n += 1);
    if (t <= 0) break;
  }
  gc.eventLogLastDroppedTypes = n;
}
function Gx(e = "") {
  const t = String(e || "");
  return (
    "subtitle.displayed" === t ||
    "capture.stop_requested" === t ||
    "stt.transcript.final" === t ||
    "llm.request.start" === t ||
    "llm.request.end" === t ||
    "llm.request.error" === t ||
    "llm.translation.final" === t ||
    "subtitle.original_fallback" === t ||
    "caption.transport.completed" === t ||
    "mse.single_tab_startup.failed" === t ||
    "llm.response.ignored" === t ||
    "mse.audio_buffer.anomaly" === t ||
    "mse.audio_buffer.state_changed" === t ||
    "async_work.context_stale_drop" === t ||
    "client.event_log_dropped_total" === t ||
    t.startsWith("subtitle.queue.drop_") ||
    t.startsWith("mse.audio_buffer.discontinuity") ||
    t.startsWith("stt.batch.")
  );
}
function Wx(e = {}) {
  const t = String(e?.type || "");
  return (
    "subtitle.pipeline_range" === t ||
    "billing.usage_snapshot" === t ||
    "client.status" === t ||
    "mse.audio_buffer.status" === t ||
    "mse.audio_buffer.summary" === t ||
    "mse.audio_buffer.readiness" === t
  );
}
function $x() {
  !gc.remoteSessionStarted ||
    gc.eventLogFlushTimer ||
    gc.eventLogFlushInFlight ||
    (gc.eventLogFlushTimer = setTimeout(() => {
      ((gc.eventLogFlushTimer = null),
        jx().catch((e) => {
          console.warn("[offscreen] event log flush skipped:", e.message);
        }));
    }, z));
}
function Vx() {
  gc.eventLogFlushTimer &&
    (clearTimeout(gc.eventLogFlushTimer), (gc.eventLogFlushTimer = null));
}
async function jx(e = {}) {
  if (gc.eventLogFlushInFlight) {
    if (!e.force) return !1;
    await Qx();
  }
  if (gc.eventLogFlushInFlight || !gc.eventLogQueue.length) return !1;
  if (!gc.remoteSessionStarted || !gc.sessionId) return !1;
  const t = await uP();
  if (!t) return !1;
  ((gc.eventLogFlushInFlight = !0), Vx(), Jx());
  let n = [];
  try {
    do {
      if (((n = gc.eventLogQueue.splice(0, Q)), !n.length)) break;
      const e = await mD(
          `${gc.config.backendUrl}/caption-sessions/${gc.sessionId}/events`,
          {
            method: "POST",
            headers: hP(t),
            body: JSON.stringify({ uid: t.uid, idToken: t.idToken, events: n }),
          },
          K,
          "event log",
        ),
        a = await e.json().catch(() => null);
      if (!e.ok) {
        const t = tP(a?.error || a?.message || "");
        throw new Error(`event log ${e.status}${t ? `: ${t}` : ""}`);
      }
      (Kx(a, n.length), (n = []));
    } while (gc.eventLogQueue.length);
    return !0;
  } catch (e) {
    throw (
      (gc.eventLogQueue = n.concat(gc.eventLogQueue)),
      gc.eventLogQueue.length > J && Hx(gc.eventLogQueue.length - J),
      e
    );
  } finally {
    ((gc.eventLogFlushInFlight = !1),
      gc.eventLogQueue.length && gc.remoteSessionStarted && $x());
  }
}
function Kx(e = {}, t = 0) {
  const n = Math.max(0, Math.round(Number(t) || 0));
  if ("disabled" === tP(e?.sink || "")) return !0;
  const a = rP(e?.stored);
  if (null === a || a < n)
    throw new Error(
      `event log persisted ${null === a ? "unknown" : a} of ${n} events`,
    );
  return !0;
}
async function zx(e = {}) {
  let t = null;
  for (const n of X) {
    n > 0 && (await fD(n));
    try {
      return (await jx({ ...e, force: !0 }), !0);
    } catch (e) {
      t = e;
    }
  }
  throw t || new Error("event log final flush failed");
}
async function Qx(e = 9e3) {
  const t = Date.now();
  for (; gc.eventLogFlushInFlight && Date.now() - t < e; ) await fD(50);
}
function Jx() {
  const e = Math.max(0, Math.round(Number(gc.eventLogDroppedTotal || 0) || 0)),
    t = Math.max(
      0,
      Math.round(Number(gc.eventLogDroppedReportedTotal || 0) || 0),
    );
  return !(
    e <= t ||
    !gc.sessionId ||
    ((gc.eventLogDroppedReportedTotal = e),
    (gc.eventLogSequence += 1),
    gc.eventLogQueue.push({
      eventId: `${Date.now()}_${gc.eventLogSequence}`,
      type: "client.event_log_dropped_total",
      level: "warn",
      source: "offscreen",
      sdk: "chrome-extension",
      sequence: gc.eventLogSequence,
      requestId: "",
      provider: "",
      model: "",
      clientTimeMs: Date.now(),
      data: uE({
        droppedClientEventsTotal: e,
        droppedSinceLastReport: e - t,
        droppedTypes: gc.eventLogLastDroppedTypes || {},
      }),
    }),
    gc.eventLogQueue.length > J && Hx(gc.eventLogQueue.length - J),
    0)
  );
}
function Xx(e = {}) {
  return {
    original: e.original || "",
    translation: e.translation || "",
    order: rP(e.order),
    segmentationMethod: e.segmentationMethod || "",
    mediaTime: aP(e.mediaTime),
    displayAfterMediaTime: aP(e.displayAfterMediaTime),
    audioStartMediaTime: aP(e.audioStartMediaTime),
    audioEndMediaTime: aP(e.audioEndMediaTime),
    mediaTimeEnd: aP(e.mediaTimeEnd),
    targetMediaTime: aP(e.targetMediaTime),
    targetMediaTimeEnd: aP(e.targetMediaTimeEnd),
    timingSource: e.timingSource || "",
    queueSequence: rP(e.queueSequence),
    displaySequence: rP(e.displaySequence),
    seekSequence: rP(e.seekSequence),
    syncDisplayErrorSeconds: aP(e.syncDisplayErrorSeconds),
    subtitleEffectiveOffsetSeconds: aP(e.subtitleEffectiveOffsetSeconds),
    subtitlePresentationLeadSeconds: aP(e.subtitlePresentationLeadSeconds),
    queuedAtMs: rP(e.queuedAtMs),
    queuedViewerMediaTime: aP(e.queuedViewerMediaTime),
    queuedTargetMediaTime: aP(e.queuedTargetMediaTime),
    queuedSecondsUntilDisplay: aP(e.queuedSecondsUntilDisplay),
    queueBacklogAtEnqueue: rP(e.queueBacklogAtEnqueue),
    incomingBatchIndex: rP(e.incomingBatchIndex),
    incomingBatchSize: rP(e.incomingBatchSize),
    plannedDisplayDurationMs: rP(e.plannedDisplayDurationMs),
    sourceTimelineOffsetSeconds: aP(e.sourceTimelineOffsetSeconds),
    sourceTimelineOffsetStable: Boolean(e.sourceTimelineOffsetStable),
    viewerMediaTime: aP(e.viewerMediaTime),
    viewerPlaybackRate: aP(e.viewerPlaybackRate),
    viewerPaused: Boolean(e.viewerPaused),
    viewerVideoVisible: Boolean(e.viewerVideoVisible),
    viewerVideoCandidateCount: rP(e.viewerVideoCandidateCount),
    viewerClockSource: e.viewerClockSource || "",
    fallbackDisplayed: Boolean(e.fallbackDisplayed),
    lateAfterOriginalFallback: Boolean(e.lateAfterOriginalFallback),
    skipped: Boolean(e.skipped),
    displayedAt: e.displayedAt || new Date().toISOString(),
  };
}
function Zx(e = []) {
  const t = (Array.isArray(e) ? e : [])
      .map((e) => ({ start: rP(e?.mediaStartTime), end: rP(e?.mediaEndTime) }))
      .filter((e) => null !== e.start && null !== e.end && e.end > e.start)
      .sort((e, t) => e.start - t.start),
    n = [];
  for (const e of t) {
    const t = n[n.length - 1];
    t && e.start <= t.end + 0.8
      ? (t.end = Math.max(t.end, e.end))
      : n.push({ ...e });
  }
  return n.slice(0, 32).map((e) => ({ start: aP(e.start), end: aP(e.end) }));
}
function Yx(e = {}) {
  return e && "object" == typeof e
    ? uE({
        mediaTime: aP(e.mediaTime),
        mediaEndTime: aP(e.mediaEndTime),
        mediaTimeEnd: aP(e.mediaTimeEnd),
        displayAfterMediaTimeStart: aP(e.displayAfterMediaTimeStart),
        displayAfterMediaTimeEnd: aP(e.displayAfterMediaTimeEnd),
        audioStartWallTimeMs: rP(e.audioStartWallTimeMs),
        audioEndWallTimeMs: rP(e.audioEndWallTimeMs),
        sourceWallTimeMs: rP(e.sourceWallTimeMs),
        sourceProgramClock: e.sourceProgramClock || null,
        transcriptReceivedAtMs: rP(e.transcriptReceivedAtMs),
        translationStartedAtMs: rP(e.translationStartedAtMs),
        translationReadyAtMs: rP(e.translationReadyAtMs),
        audioStartMediaTime: aP(e.audioStartMediaTime),
        audioEndMediaTime: aP(e.audioEndMediaTime),
        sourceMediaStartTime: aP(e.sourceMediaStartTime),
        sourceMediaEndTime: aP(e.sourceMediaEndTime),
        audioDurationMs: Math.max(
          0,
          Math.round(Number(e.audioDurationMs || 0)),
        ),
        sttElapsedMs: Math.max(
          0,
          Math.round(Number(e.sttElapsedMs || e.sttLatencyMs || 0)),
        ),
        sttUploadLatencyMs: Math.max(
          0,
          Math.round(Number(e.sttUploadLatencyMs || 0)),
        ),
        pipelineLatencyMs: Math.max(
          0,
          Math.round(Number(e.pipelineLatencyMs || 0)),
        ),
        translationLatencyMs: Math.max(
          0,
          Math.round(Number(e.translationLatencyMs || 0)),
        ),
        translationQueueMs: Math.max(
          0,
          Math.round(Number(e.translationQueueMs || 0)),
        ),
        translationDeadlineMs: Math.max(
          0,
          Math.round(Number(e.translationDeadlineMs || 0)),
        ),
        sourceMediaTime: aP(e.sourceMediaTime),
        sourceTimelineOffsetSeconds: aP(e.sourceTimelineOffsetSeconds),
        sourceTimelineOffsetStable: Boolean(e.sourceTimelineOffsetStable),
        projectedTargetMediaTime: aP(e.projectedTargetMediaTime),
        projectedTargetEndMediaTime: aP(e.projectedTargetEndMediaTime),
        syncDelaySeconds: aP(e.syncDelaySeconds),
        speechIntervals: Array.isArray(e.speechIntervals)
          ? e.speechIntervals
              .map((e) => ({ start: aP(e?.start), end: aP(e?.end) }))
              .filter(
                (e) => null !== e.start && null !== e.end && e.end > e.start,
              )
          : [],
        wordIntervals: Zx(e.words),
        timingSource: e.timingSource || "",
        latencyMode: e.latencyMode || "",
        sourceType: e.sourceType || "",
        audioInputMode: e.audioInputMode || "",
        sttProvider: e.sttProvider || "",
        timelineCoverageTrimmed: Boolean(e.timelineCoverageTrimmed),
      })
    : {};
}
function eE(e = {}) {
  const t = String(
    e.pageUrl ||
      e.context?.pageUrl ||
      gc.config?.pageUrl ||
      gc.sourceMediaTiming?.href ||
      "",
  ).trim();
  return {
    pageUrl: t,
    mediaContextKey: String(
      e.mediaContextKey || e.context?.mediaContextKey || tE() || cE(t) || "",
    ).trim(),
  };
}
function tE() {
  return String(
    gc.config?.viewerMediaContextKey ||
      gc.config?.sourceMediaContextKey ||
      gc.config?.cacheVideoKey ||
      "",
  ).trim();
}
function nE(e = {}) {
  const t = String(
      e.pageUrl || gc.config?.pageUrl || gc.sourceMediaTiming?.href || "",
    ).trim(),
    n = String(e.mediaContextKey || tE() || cE(t) || "").trim();
  return {
    sessionId: String(e.sessionId || gc.sessionId || "").trim(),
    authUid: String(e.authUid ?? gc.config?.auth?.uid ?? ""),
    captureGeneration: String(
      e.captureGeneration ?? gc.captureGeneration ?? "",
    ),
    pageUrl: t,
    mediaContextKey: n,
    videoKey: String(e.videoKey || n || "").trim(),
    timelineRevision: rP(e.timelineRevision ?? gc.timelineRevision),
    requestId: e.requestId || "",
  };
}
function aE() {
  return nE();
}
function rE(e = null) {
  const t = e || {},
    n = String(t.mediaContextKey || cE(t.pageUrl || "") || "").trim();
  return {
    sessionId: String(t.sessionId || "").trim(),
    authUid: String(t.authUid || ""),
    captureGeneration: String(t.captureGeneration || ""),
    mediaContextKey: n,
  };
}
function iE(e = null, t = null) {
  if (!e || !t) return !0;
  const n = rE(e),
    a = rE(t);
  return !(
    (n.sessionId && a.sessionId && n.sessionId !== a.sessionId) ||
    n.authUid !== a.authUid ||
    n.captureGeneration !== a.captureGeneration ||
    (n.mediaContextKey &&
      a.mediaContextKey &&
      n.mediaContextKey !== a.mediaContextKey)
  );
}
function oE(e = []) {
  const t =
    (Array.isArray(e) ? e : [])
      .map((e) => e?.requestContext)
      .filter(Boolean)[0] || aE();
  return {
    ...t,
    requestId: "",
    timelineRevision: rP(t.timelineRevision ?? gc.timelineRevision),
  };
}
function sE(e = null, t = "stale-context", n = {}) {
  if (!e) return !1;
  const a = nE(e),
    r = aE(),
    i = rE(a),
    o = rE(r),
    s =
      i.authUid !== o.authUid ||
      i.captureGeneration !== o.captureGeneration ||
      Boolean(i.sessionId && o.sessionId && i.sessionId !== o.sessionId) ||
      Boolean(
        i.mediaContextKey &&
          o.mediaContextKey &&
          i.mediaContextKey !== o.mediaContextKey,
      ),
    l = rP(a.timelineRevision),
    c = Boolean(
      !1 !== n.checkTimelineRevision && null !== l && l !== gc.timelineRevision,
    );
  return !(
    (!s && !c) ||
    (!1 === n.log ||
      Nx(
        "async_work.context_stale_drop",
        {
          reason: t,
          requestId: n.requestId || a.requestId || "",
          provider: n.provider || "",
          expectedSessionId: i.sessionId,
          currentSessionId: o.sessionId,
          expectedMediaContextKey: i.mediaContextKey,
          currentMediaContextKey: o.mediaContextKey,
          expectedRevision: l,
          currentRevision: gc.timelineRevision,
          mediaStartTime: n.mediaStartTime ?? null,
          mediaEndTime: n.mediaEndTime ?? null,
          latencyMs: n.latencyMs ?? null,
        },
        {
          source: "offscreen",
          level: "warn",
          requestId: n.requestId || a.requestId || "",
          provider: n.provider || "",
        },
      ),
    0)
  );
}
function lE(e = {}, t = null) {
  if (!t) return e;
  const n = nE(t),
    a = e.pageUrl || n.pageUrl || "",
    r = e.mediaContextKey || n.mediaContextKey || cE(a);
  return {
    ...e,
    sessionId: e.sessionId || n.sessionId || null,
    timelineRevision: rP(e.timelineRevision) ?? rP(n.timelineRevision),
    pageUrl: a,
    mediaContextKey: r,
    videoKey: e.videoKey || r || "",
    context: {
      ...(e.context && "object" == typeof e.context ? e.context : {}),
      pageUrl: a,
      sourceUrl: e.context?.sourceUrl || a,
      mediaContextKey: r,
      videoKey: e.context?.videoKey || r || "",
      sessionId: n.sessionId || null,
      timelineRevision: rP(n.timelineRevision),
    },
  };
}
function cE(e = "") {
  try {
    const t = new URL(e),
      n = t.hostname.toLowerCase();
    if (/(^|\.)youtube\.com$/i.test(n) || /(^|\.)youtu\.be$/i.test(n)) {
      const e = t.hostname.toLowerCase().endsWith("youtu.be")
        ? t.pathname.split("/").filter(Boolean)[0]
        : t.searchParams.get("v");
      return e ? `youtube:${e}` : "";
    }
    if (/(^|\.)twitch\.tv$/i.test(n)) {
      const e = t.pathname.split("/").filter(Boolean);
      if ("videos" === e[0] && e[1])
        return `twitch:video:${e[1].toLowerCase()}`;
      if ("popout" === e[0] && e[1])
        return `twitch:channel:${e[1].toLowerCase()}`;
      if (e[0]) return `twitch:channel:${e[0].toLowerCase()}`;
    }
    if (/(^|\.)instagram\.com$/i.test(n)) {
      const e = t.pathname.split("/").filter(Boolean);
      if (e.length) return `instagram:${e.join("/").toLowerCase()}`;
    }
    if (/(^|\.)missav\.(?:ai|ws)$/i.test(n)) {
      const e = t.pathname.split("/").filter(Boolean);
      if (e.length) return `missav:${e.join("/").toLowerCase()}`;
    }
    if (/(^|\.)xvideos\.com$/i.test(n)) {
      const e = t.pathname.split("/").filter(Boolean),
        n = String(e[0] || "").toLowerCase();
      if (/^video(?:\.|\d)/i.test(n)) return `xvideos:${n}`;
      if ("embedframe" === n && e[1])
        return `xvideos:embedframe:${String(e[1]).toLowerCase()}`;
    }
  } catch {
    return "";
  }
  return "";
}
function dE(e = {}) {
  return e && "object" == typeof e
    ? uE({
        totalMs: Math.max(
          0,
          Math.round(Number(e.totalMs || e.pipelineLatencyMs || 0)),
        ),
        sttMs: Math.max(0, Math.round(Number(e.sttMs || e.sttLatencyMs || 0))),
        sttFromAudioEndMs: Math.max(
          0,
          Math.round(Number(e.sttFromAudioEndMs || 0)),
        ),
        queueMs: Math.max(
          0,
          Math.round(Number(e.queueMs || e.translationQueueMs || 0)),
        ),
        llmMs: Math.max(
          0,
          Math.round(Number(e.llmMs || e.translationLatencyMs || 0)),
        ),
      })
    : {};
}
function uE(e, t = 0, n = "") {
  if (null == e) return null;
  if (t > 4) return "[max-depth]";
  if ("boolean" == typeof e) return e;
  if ("number" == typeof e) return Number.isFinite(e) ? e : null;
  if ("string" == typeof e) return mE(e, n);
  if (Array.isArray(e)) return e.slice(0, 24).map((e) => uE(e, t + 1, n));
  if ("object" != typeof e) return tP(e);
  const a = {};
  for (const [n, r] of Object.entries(e).slice(0, 40)) {
    const e = String(n || "")
      .replace(/[.$#[\]/]/g, "_")
      .slice(0, 80);
    e && (a[e] = uE(r, t + 1, e));
  }
  return a;
}
function mE(e, t = "") {
  const n = String(e || "");
  return /token|authorization|api[_-]?key|secret|password|base64|audioBuffer|audioBytes|wavData|pcmData/i.test(
    t,
  )
    ? "[redacted]"
    : /^(text|original|translation|originalText|processedText|prompt|response|displayedOriginalText|scheduledOriginalText)$/i.test(
          t,
        )
      ? { chars: Array.from(n).length, preview: n.slice(0, 80) }
      : n.slice(0, 1e3);
}
function gE(e) {
  return String(e || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_.:-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 120);
}
function pE(e) {
  const t = String(e || "info")
    .toLowerCase()
    .trim();
  return ["debug", "info", "warn", "error"].includes(t) ? t : "info";
}
function fE() {
  const e = Date.now(),
    t = QE();
  if (t > (gc.sttBillingWatchdogBillableAudioMs || 0))
    return (
      (gc.sttBillingWatchdogBillableAudioMs = t),
      void (gc.sttBillingWatchdogGrowthAtMs = e)
    );
  !gc.isStopping &&
    gc.config &&
    zm() &&
    gc.mseAudio?.enabled &&
    (gc.mediaPlaybackPausedForStt ||
      (gc.sourceMediaTiming?.paused && !gc.sourceMediaTiming?.adPlaying) ||
      hE() ||
      e - (Number(gc.sttBillingWatchdogGrowthAtMs) || e) < 3e4 ||
      e - (Number(gc.sttBillingWatchdogLastLogAtMs) || 0) < 3e4 ||
      ((gc.sttBillingWatchdogLastLogAtMs = e),
      Nx(
        "stt.billing.stalled",
        {
          sttBillableAudioMs: Math.round(t),
          capturedAudioMs: Math.round(gc.captureAudioMs || 0),
          totalAudioMs: Math.round(gc.totalAudioMs || 0),
          mseSegmentsReceived: Math.round(gc.mseAudio?.segmentsReceived || 0),
          mseLastSegmentAgeMs: gc.mseAudio?.lastSegmentAtMs
            ? Math.max(0, e - gc.mseAudio.lastSegmentAtMs)
            : null,
          sourcePaused: Boolean(gc.sourceMediaTiming?.paused),
          mediaPlaybackPausedForStt: Boolean(gc.mediaPlaybackPausedForStt),
        },
        { source: "offscreen", level: "warn" },
      )));
}
function hE() {
  const e = rP(gc.sourceMediaTiming?.duration);
  if (null === e || e <= 0) return !1;
  const t = rP(
    gc.mseAudio?.lastBufferedEnd ?? gc.mseAudio?.lastAcceptedMediaEndTime,
  );
  return (
    null !== t &&
    (t >= e - 1.5 || Boolean(gc.vodEndGuard?.active && t >= e - 5))
  );
}
function SE(e = {}, t = {}) {
  fE();
  const n = QE(),
    a = Math.max(0, gc.totalAudioMs),
    r = Math.max(0, gc.captureAudioMs),
    i = JE(),
    o = Math.max(0, Math.round(n - gc.lastUsageHeartbeatBillableAudioMs)),
    s = Math.max(0, Math.round(a - gc.lastUsageHeartbeatAudioMs)),
    l = Math.max(0, Math.round(r - a)),
    c = Math.max(0, Math.round(a - n)),
    d = qP(gc.config?.provider) === zn,
    u = GE(),
    m = Math.max(
      0,
      Math.round(u) - Math.round(gc.lastUsageHeartbeatContentMs || 0),
    ),
    g = d ? m : 0,
    p = {
      deltaUsageMs: g,
      totalUsageMs: Math.max(0, Math.round(gc.lunaBillingUsageMs || 0) + g),
      deltaInputTokens: Math.max(
        0,
        gc.llmUsage.inputTokens - gc.lastHeartbeatLLMUsage.inputTokens,
      ),
      deltaOutputTokens: Math.max(
        0,
        gc.llmUsage.outputTokens - gc.lastHeartbeatLLMUsage.outputTokens,
      ),
      deltaVisibleOutputTokens: Math.max(
        0,
        gc.llmUsage.visibleOutputTokens -
          gc.lastHeartbeatLLMUsage.visibleOutputTokens,
      ),
      deltaThinkingTokens: Math.max(
        0,
        gc.llmUsage.thinkingTokens - gc.lastHeartbeatLLMUsage.thinkingTokens,
      ),
      deltaTotalTokens: Math.max(
        0,
        gc.llmUsage.totalTokens - gc.lastHeartbeatLLMUsage.totalTokens,
      ),
      deltaCallCount: Math.max(
        0,
        gc.llmUsage.callCount - gc.lastHeartbeatLLMUsage.callCount,
      ),
      deltaCostUSD: nP(gc.llmUsage.costUSD - gc.lastHeartbeatLLMUsage.costUSD),
      deltaInputCostUSD: nP(
        gc.llmUsage.inputCostUSD - gc.lastHeartbeatLLMUsage.inputCostUSD,
      ),
      deltaOutputCostUSD: nP(
        gc.llmUsage.outputCostUSD - gc.lastHeartbeatLLMUsage.outputCostUSD,
      ),
      deltaVisibleOutputCostUSD: nP(
        gc.llmUsage.visibleOutputCostUSD -
          gc.lastHeartbeatLLMUsage.visibleOutputCostUSD,
      ),
      deltaThinkingCostUSD: nP(
        gc.llmUsage.thinkingCostUSD - gc.lastHeartbeatLLMUsage.thinkingCostUSD,
      ),
      deltaFallbackCount: Math.max(
        0,
        gc.llmUsage.fallbackCount - gc.lastHeartbeatLLMUsage.fallbackCount,
      ),
      deltaFallbackInputTokens: Math.max(
        0,
        gc.llmUsage.fallbackInputTokens -
          (gc.lastHeartbeatLLMUsage.fallbackInputTokens || 0),
      ),
      deltaFallbackOutputTokens: Math.max(
        0,
        gc.llmUsage.fallbackOutputTokens -
          (gc.lastHeartbeatLLMUsage.fallbackOutputTokens || 0),
      ),
      deltaFallbackVisibleOutputTokens: Math.max(
        0,
        gc.llmUsage.fallbackVisibleOutputTokens -
          (gc.lastHeartbeatLLMUsage.fallbackVisibleOutputTokens || 0),
      ),
      deltaFallbackThinkingTokens: Math.max(
        0,
        gc.llmUsage.fallbackThinkingTokens -
          (gc.lastHeartbeatLLMUsage.fallbackThinkingTokens || 0),
      ),
      deltaFallbackTotalTokens: Math.max(
        0,
        gc.llmUsage.fallbackTotalTokens -
          (gc.lastHeartbeatLLMUsage.fallbackTotalTokens || 0),
      ),
      deltaFallbackCostUSD: nP(
        gc.llmUsage.fallbackCostUSD -
          (gc.lastHeartbeatLLMUsage.fallbackCostUSD || 0),
      ),
      deltaFallbackInputCostUSD: nP(
        gc.llmUsage.fallbackInputCostUSD -
          (gc.lastHeartbeatLLMUsage.fallbackInputCostUSD || 0),
      ),
      deltaFallbackOutputCostUSD: nP(
        gc.llmUsage.fallbackOutputCostUSD -
          (gc.lastHeartbeatLLMUsage.fallbackOutputCostUSD || 0),
      ),
      deltaFallbackVisibleOutputCostUSD: nP(
        gc.llmUsage.fallbackVisibleOutputCostUSD -
          (gc.lastHeartbeatLLMUsage.fallbackVisibleOutputCostUSD || 0),
      ),
      deltaFallbackThinkingCostUSD: nP(
        gc.llmUsage.fallbackThinkingCostUSD -
          (gc.lastHeartbeatLLMUsage.fallbackThinkingCostUSD || 0),
      ),
      deltaDeadlineRescueCount: Math.max(
        0,
        (gc.llmUsage.deadlineRescueCount || 0) -
          (gc.lastHeartbeatLLMUsage.deadlineRescueCount || 0),
      ),
      deltaDeadlineRescueCostUSD: nP(
        (gc.llmUsage.deadlineRescueCostUSD || 0) -
          (gc.lastHeartbeatLLMUsage.deadlineRescueCostUSD || 0),
      ),
      deltaProviderErrorRescueCount: Math.max(
        0,
        (gc.llmUsage.providerErrorRescueCount || 0) -
          (gc.lastHeartbeatLLMUsage.providerErrorRescueCount || 0),
      ),
      deltaProviderErrorRescueCostUSD: nP(
        (gc.llmUsage.providerErrorRescueCostUSD || 0) -
          (gc.lastHeartbeatLLMUsage.providerErrorRescueCostUSD || 0),
      ),
      deltaProviderFailoverCount: Math.max(
        0,
        (gc.llmUsage.providerFailoverCount || 0) -
          (gc.lastHeartbeatLLMUsage.providerFailoverCount || 0),
      ),
      totalInputTokens: gc.llmUsage.inputTokens,
      totalOutputTokens: gc.llmUsage.outputTokens,
      totalVisibleOutputTokens: gc.llmUsage.visibleOutputTokens,
      totalThinkingTokens: gc.llmUsage.thinkingTokens,
      totalTokens: gc.llmUsage.totalTokens,
      totalCallCount: gc.llmUsage.callCount,
      totalCostUSD: nP(gc.llmUsage.costUSD),
      totalInputCostUSD: nP(gc.llmUsage.inputCostUSD),
      totalOutputCostUSD: nP(gc.llmUsage.outputCostUSD),
      totalVisibleOutputCostUSD: nP(gc.llmUsage.visibleOutputCostUSD),
      totalThinkingCostUSD: nP(gc.llmUsage.thinkingCostUSD),
      totalFallbackCount: gc.llmUsage.fallbackCount,
      totalFallbackInputTokens: gc.llmUsage.fallbackInputTokens,
      totalFallbackOutputTokens: gc.llmUsage.fallbackOutputTokens,
      totalFallbackVisibleOutputTokens: gc.llmUsage.fallbackVisibleOutputTokens,
      totalFallbackThinkingTokens: gc.llmUsage.fallbackThinkingTokens,
      totalFallbackTotalTokens: gc.llmUsage.fallbackTotalTokens,
      totalFallbackCostUSD: nP(gc.llmUsage.fallbackCostUSD),
      totalFallbackInputCostUSD: nP(gc.llmUsage.fallbackInputCostUSD),
      totalFallbackOutputCostUSD: nP(gc.llmUsage.fallbackOutputCostUSD),
      totalFallbackVisibleOutputCostUSD: nP(
        gc.llmUsage.fallbackVisibleOutputCostUSD,
      ),
      totalFallbackThinkingCostUSD: nP(gc.llmUsage.fallbackThinkingCostUSD),
      totalDeadlineRescueCount: gc.llmUsage.deadlineRescueCount || 0,
      totalDeadlineRescueCostUSD: nP(gc.llmUsage.deadlineRescueCostUSD || 0),
      totalProviderErrorRescueCount: gc.llmUsage.providerErrorRescueCount || 0,
      totalProviderErrorRescueCostUSD: nP(
        gc.llmUsage.providerErrorRescueCostUSD || 0,
      ),
      totalProviderFailoverCount: gc.llmUsage.providerFailoverCount || 0,
      fallbackProvider: gc.llmUsage.lastFallbackProvider,
      fallbackFromProvider: gc.llmUsage.lastFallbackFromProvider,
      fallbackReason: gc.llmUsage.lastFallbackReason,
      fallbackKind: gc.llmUsage.lastFallbackKind,
      requestedProvider: gc.config?.provider || "",
      provider: gc.llmUsage.provider,
      providerName: gc.llmUsage.providerName,
    };
  return kE(
    {
      deltaAudioMs: o,
      deltaRawAudioMs: s,
      totalAudioMs: Math.round(n),
      audioSeconds: n / 1e3,
      sessionElapsedSeconds: i,
      sttRawAudioMs: Math.round(a),
      sttRawDurationSeconds: a / 1e3,
      sttAudioSpeed: zP(),
      sttSpeedSavedAudioMs: c,
      sttSpeedSavedAudioSeconds: c / 1e3,
      capturedAudioMs: Math.round(r),
      capturedAudioSeconds: r / 1e3,
      vadSkippedAudioMs: l,
      vadSkippedAudioSeconds: l / 1e3,
      vadEnabled: Ay(),
      vadProvider: gc.config?.vadProvider || Wt,
      textEngineCLive: zE(),
      llm: p,
      sttProvider: gc.config?.sttProvider || Z,
      finalBatch: LE(),
      subtitlePipeline: _E(),
      latency: gc.lastPipelineLatency,
      audioChunks: gc.sentAudioChunks,
      final: Boolean(e.final),
      sentAt: new Date().toISOString(),
    },
    t.panelUsageDelta,
  );
}
function ME(e = null) {
  const t = vE(e);
  return (
    !!PE(t) &&
    ((gc.pendingPanelUsageDelta = bE(gc.pendingPanelUsageDelta, t)), !0)
  );
}
function vE(e = {}) {
  const t = e && "object" == typeof e ? e : {},
    n = t.llm && "object" == typeof t.llm ? t.llm : {};
  return {
    deltaAudioMs: 0,
    totalAudioMs: 0,
    sessionElapsedSeconds: Math.max(0, Number(t.sessionElapsedSeconds) || 0),
    audioChunks: 0,
    usageCategory: tP(t.usageCategory || ""),
    llm: {
      deltaUsageMs: IE(n.deltaUsageMs),
      totalUsageMs: IE(n.totalUsageMs),
      deltaInputTokens: IE(n.deltaInputTokens),
      deltaOutputTokens: IE(n.deltaOutputTokens),
      deltaVisibleOutputTokens: IE(n.deltaVisibleOutputTokens),
      deltaThinkingTokens: IE(n.deltaThinkingTokens),
      deltaTotalTokens: IE(n.deltaTotalTokens),
      deltaCallCount: IE(n.deltaCallCount),
      deltaCostUSD: nP(n.deltaCostUSD),
      deltaInputCostUSD: nP(n.deltaInputCostUSD),
      deltaOutputCostUSD: nP(n.deltaOutputCostUSD),
      deltaVisibleOutputCostUSD: nP(n.deltaVisibleOutputCostUSD),
      deltaThinkingCostUSD: nP(n.deltaThinkingCostUSD),
      deltaFallbackCount: IE(n.deltaFallbackCount),
      fallbackProvider: tP(n.fallbackProvider),
      fallbackFromProvider: tP(n.fallbackFromProvider),
      fallbackReason: tP(n.fallbackReason),
      requestedProvider: tP(n.requestedProvider),
      provider: tP(n.provider),
      providerName: tP(n.providerName),
      purpose: tP(n.purpose),
      itemCount: IE(n.itemCount),
    },
    liveChatUsage: yE(t.liveChatUsage || t.chatUsage || t.liveChat),
    replyUsage: yE(t.replyUsage || t.reply),
  };
}
function yE(e = {}) {
  const t = e && "object" == typeof e ? e : {};
  return {
    creditsUsed: IE(t.creditsUsed || t.credits),
    totalCostUSD: nP(t.totalCostUSD || t.costUSD || t.deltaCostUSD),
    totalTokens: IE(t.totalTokens || t.deltaTotalTokens),
    inputTokens: IE(t.inputTokens || t.deltaInputTokens),
    outputTokens: IE(t.outputTokens || t.deltaOutputTokens),
    visibleOutputTokens: IE(
      t.visibleOutputTokens || t.deltaVisibleOutputTokens,
    ),
    thinkingTokens: IE(t.thinkingTokens || t.deltaThinkingTokens),
    llmCallCount: IE(t.llmCallCount || t.deltaCallCount),
    llmFallbackCount: IE(t.llmFallbackCount || t.deltaFallbackCount),
    inputCostUSD: nP(t.inputCostUSD || t.deltaInputCostUSD),
    outputCostUSD: nP(t.outputCostUSD || t.deltaOutputCostUSD),
    visibleOutputCostUSD: nP(
      t.visibleOutputCostUSD || t.deltaVisibleOutputCostUSD,
    ),
    thinkingCostUSD: nP(t.thinkingCostUSD || t.deltaThinkingCostUSD),
    itemCount: IE(t.itemCount),
    updatedAt: tP(t.updatedAt),
  };
}
function bE(e = null, t = null) {
  const n = vE(e),
    a = vE(t);
  return {
    deltaAudioMs: 0,
    totalAudioMs: 0,
    sessionElapsedSeconds: Math.max(
      n.sessionElapsedSeconds,
      a.sessionElapsedSeconds,
    ),
    audioChunks: 0,
    usageCategory: a.usageCategory || n.usageCategory,
    llm: TE(n.llm, a.llm),
    liveChatUsage: wE(n.liveChatUsage, a.liveChatUsage),
    replyUsage: wE(n.replyUsage, a.replyUsage),
  };
}
function TE(e = {}, t = {}) {
  return {
    deltaUsageMs: IE(e.deltaUsageMs) + IE(t.deltaUsageMs),
    totalUsageMs: Math.max(IE(e.totalUsageMs), IE(t.totalUsageMs)),
    deltaInputTokens: IE(e.deltaInputTokens) + IE(t.deltaInputTokens),
    deltaOutputTokens: IE(e.deltaOutputTokens) + IE(t.deltaOutputTokens),
    deltaVisibleOutputTokens:
      IE(e.deltaVisibleOutputTokens) + IE(t.deltaVisibleOutputTokens),
    deltaThinkingTokens: IE(e.deltaThinkingTokens) + IE(t.deltaThinkingTokens),
    deltaTotalTokens: IE(e.deltaTotalTokens) + IE(t.deltaTotalTokens),
    deltaCallCount: IE(e.deltaCallCount) + IE(t.deltaCallCount),
    deltaCostUSD: nP(Number(e.deltaCostUSD || 0) + Number(t.deltaCostUSD || 0)),
    deltaInputCostUSD: nP(
      Number(e.deltaInputCostUSD || 0) + Number(t.deltaInputCostUSD || 0),
    ),
    deltaOutputCostUSD: nP(
      Number(e.deltaOutputCostUSD || 0) + Number(t.deltaOutputCostUSD || 0),
    ),
    deltaVisibleOutputCostUSD: nP(
      Number(e.deltaVisibleOutputCostUSD || 0) +
        Number(t.deltaVisibleOutputCostUSD || 0),
    ),
    deltaThinkingCostUSD: nP(
      Number(e.deltaThinkingCostUSD || 0) + Number(t.deltaThinkingCostUSD || 0),
    ),
    deltaFallbackCount: IE(e.deltaFallbackCount) + IE(t.deltaFallbackCount),
    fallbackProvider: t.fallbackProvider || e.fallbackProvider || "",
    fallbackFromProvider:
      t.fallbackFromProvider || e.fallbackFromProvider || "",
    fallbackReason: t.fallbackReason || e.fallbackReason || "",
    requestedProvider: e.requestedProvider || t.requestedProvider || "",
    provider: e.provider || t.provider || "",
    providerName: e.providerName || t.providerName || "",
    purpose: t.purpose || e.purpose || "",
    itemCount: IE(e.itemCount) + IE(t.itemCount),
  };
}
function wE(e = {}, t = {}) {
  return {
    creditsUsed: IE(e.creditsUsed) + IE(t.creditsUsed),
    totalCostUSD: nP(Number(e.totalCostUSD || 0) + Number(t.totalCostUSD || 0)),
    totalTokens: IE(e.totalTokens) + IE(t.totalTokens),
    inputTokens: IE(e.inputTokens) + IE(t.inputTokens),
    outputTokens: IE(e.outputTokens) + IE(t.outputTokens),
    visibleOutputTokens: IE(e.visibleOutputTokens) + IE(t.visibleOutputTokens),
    thinkingTokens: IE(e.thinkingTokens) + IE(t.thinkingTokens),
    llmCallCount: IE(e.llmCallCount) + IE(t.llmCallCount),
    llmFallbackCount: IE(e.llmFallbackCount) + IE(t.llmFallbackCount),
    inputCostUSD: nP(Number(e.inputCostUSD || 0) + Number(t.inputCostUSD || 0)),
    outputCostUSD: nP(
      Number(e.outputCostUSD || 0) + Number(t.outputCostUSD || 0),
    ),
    visibleOutputCostUSD: nP(
      Number(e.visibleOutputCostUSD || 0) + Number(t.visibleOutputCostUSD || 0),
    ),
    thinkingCostUSD: nP(
      Number(e.thinkingCostUSD || 0) + Number(t.thinkingCostUSD || 0),
    ),
    itemCount: IE(e.itemCount) + IE(t.itemCount),
    updatedAt: t.updatedAt || e.updatedAt || "",
  };
}
function kE(e = {}, t = null) {
  const n = vE(t);
  if (!PE(n)) return e;
  const a = { ...e, llm: TE(e.llm || {}, n.llm) };
  return (
    DE(n.liveChatUsage) &&
      (a.liveChatUsage = wE(e.liveChatUsage || {}, n.liveChatUsage)),
    DE(n.replyUsage) && (a.replyUsage = wE(e.replyUsage || {}, n.replyUsage)),
    a
  );
}
function CE(e = null) {
  const t = vE(e);
  return PE(t) ? JSON.parse(JSON.stringify(t)) : null;
}
function AE(e = null) {
  if (!PE(e) || !PE(gc.pendingPanelUsageDelta)) return;
  const t = vE(gc.pendingPanelUsageDelta);
  ((gc.pendingPanelUsageDelta = RE(t, e)),
    PE(gc.pendingPanelUsageDelta) || (gc.pendingPanelUsageDelta = null));
}
function RE(e = {}, t = {}) {
  return {
    deltaAudioMs: 0,
    totalAudioMs: 0,
    sessionElapsedSeconds: Math.max(
      0,
      e.sessionElapsedSeconds - t.sessionElapsedSeconds,
    ),
    audioChunks: 0,
    usageCategory: e.usageCategory || t.usageCategory || "",
    llm: xE(e.llm, t.llm),
    liveChatUsage: EE(e.liveChatUsage, t.liveChatUsage),
    replyUsage: EE(e.replyUsage, t.replyUsage),
  };
}
function xE(e = {}, t = {}) {
  const n = {};
  for (const a of [
    "deltaUsageMs",
    "deltaInputTokens",
    "deltaOutputTokens",
    "deltaVisibleOutputTokens",
    "deltaThinkingTokens",
    "deltaTotalTokens",
    "deltaCallCount",
    "deltaFallbackCount",
    "itemCount",
  ])
    n[a] = Math.max(0, IE(e[a]) - IE(t[a]));
  for (const a of [
    "deltaCostUSD",
    "deltaInputCostUSD",
    "deltaOutputCostUSD",
    "deltaVisibleOutputCostUSD",
    "deltaThinkingCostUSD",
  ])
    n[a] = nP(Math.max(0, Number(e[a] || 0) - Number(t[a] || 0)));
  return (
    (n.fallbackProvider = e.fallbackProvider || ""),
    (n.fallbackFromProvider = e.fallbackFromProvider || ""),
    (n.fallbackReason = e.fallbackReason || ""),
    (n.totalUsageMs = IE(e.totalUsageMs)),
    (n.requestedProvider = e.requestedProvider || ""),
    (n.provider = e.provider || ""),
    (n.providerName = e.providerName || ""),
    (n.purpose = e.purpose || ""),
    n
  );
}
function EE(e = {}, t = {}) {
  const n = {};
  for (const a of [
    "creditsUsed",
    "totalTokens",
    "inputTokens",
    "outputTokens",
    "visibleOutputTokens",
    "thinkingTokens",
    "llmCallCount",
    "llmFallbackCount",
    "itemCount",
  ])
    n[a] = Math.max(0, IE(e[a]) - IE(t[a]));
  for (const a of [
    "totalCostUSD",
    "inputCostUSD",
    "outputCostUSD",
    "visibleOutputCostUSD",
    "thinkingCostUSD",
  ])
    n[a] = nP(Math.max(0, Number(e[a] || 0) - Number(t[a] || 0)));
  return ((n.updatedAt = e.updatedAt || ""), n);
}
function PE(e = null) {
  const t = vE(e);
  return (
    IE(t.llm.deltaTotalTokens) > 0 ||
    IE(t.llm.deltaCallCount) > 0 ||
    Number(t.llm.deltaCostUSD || 0) > 0 ||
    DE(t.liveChatUsage) ||
    DE(t.replyUsage)
  );
}
function DE(e = {}) {
  return (
    IE(e.totalTokens) > 0 ||
    IE(e.llmCallCount) > 0 ||
    Number(e.totalCostUSD || 0) > 0 ||
    IE(e.itemCount) > 0
  );
}
function IE(e) {
  const t = Number(e);
  return !Number.isFinite(t) || t <= 0 ? 0 : Math.round(t);
}
function LE() {
  const e = gc.finalBatchStats || {},
    t = gc.finalTranslationBatch.length,
    n = Math.max(0, Math.round(e.batchesSent || 0)),
    a = Math.max(0, Math.round(e.segmentsSent || 0)),
    r = Math.max(0, Math.round(e.estimatedCallsWithoutBatch || 0)),
    i = Math.max(0, r - n),
    o = qk();
  return {
    enabled: Boolean(e.enabled || GT()),
    queuedSegments: Math.max(0, Math.round(e.queuedSegments || 0)),
    pendingSegments: t,
    batchesSent: n,
    segmentsSent: a,
    estimatedCallsWithoutBatch: r,
    savedCalls: i,
    averageSegmentsPerCall: n > 0 ? a / n : 0,
    lastBatchSize: Math.max(0, Math.round(e.lastBatchSize || 0)),
    lastWaitMs: Math.max(0, Math.round(e.lastWaitMs || 0)),
    targetWaitMs: Math.max(0, Math.round(Sk())),
    batchWaitSeconds: Tk(gc.config?.batchWaitSeconds),
    playbackSafeWaitMs: null === o ? null : Math.max(0, Math.round(o)),
    delaySeconds: wk(),
    maxSegments: uk(),
    maxChars: mk(),
    latency: gc.pipelineLatencyStats || jC([], "pipeline"),
  };
}
function _E() {
  const e = gc.subtitlePipelineStats || {};
  return {
    finalTranscripts: Math.max(0, Math.round(e.finalTranscripts || 0)),
    finalTranscriptChars: Math.max(0, Math.round(e.finalTranscriptChars || 0)),
    translationRequests: Math.max(0, Math.round(e.translationRequests || 0)),
    translationResponses: Math.max(0, Math.round(e.translationResponses || 0)),
    translationErrors: Math.max(0, Math.round(e.translationErrors || 0)),
    emptyTranslations: Math.max(0, Math.round(e.emptyTranslations || 0)),
    emittedSegments: Math.max(0, Math.round(e.emittedSegments || 0)),
    pendingFinalMerges: Math.max(0, Math.round(e.pendingFinalMerges || 0)),
    translationRetries: Math.max(0, Math.round(e.translationRetries || 0)),
    fallbackDisplayedSegments: Math.max(
      0,
      Math.round(e.fallbackDisplayedSegments || 0),
    ),
  };
}
function BE(e = "", t = "", n = "") {
  return (
    tP(e).toLowerCase() ||
    (n ? (UE(t) ? "provider_error_rescue" : "provider_failover") : "")
  );
}
function UE(e = "") {
  const t = qP(e);
  return "lt-h" === t || "lt-h" === t || "lt-i" === t || "lt-i" === t;
}
function qE(e = "", t = "") {
  const n = BE(e, t, "");
  return "provider_failover" !== n && (!!n.includes("rescue") || UE(t));
}
function FE(e = null, t = null, n = "", a = "", r = {}) {
  const i = tP(r.fallbackFromProvider);
  let o = !1,
    s = "";
  if (
    (i &&
      ((s = BE(r.fallbackKind, n, i)),
      (o = qE(s, n)),
      o
        ? ((gc.llmUsage.fallbackCount += 1),
          "provider_error_rescue" === s
            ? (gc.llmUsage.providerErrorRescueCount =
                Math.max(0, Number(gc.llmUsage.providerErrorRescueCount || 0)) +
                1)
            : (gc.llmUsage.deadlineRescueCount =
                Math.max(0, Number(gc.llmUsage.deadlineRescueCount || 0)) + 1))
        : (gc.llmUsage.providerFailoverCount =
            Math.max(0, Number(gc.llmUsage.providerFailoverCount || 0)) + 1),
      (gc.llmUsage.lastFallbackProvider =
        tP(n) || gc.llmUsage.lastFallbackProvider),
      (gc.llmUsage.lastFallbackFromProvider = i),
      (gc.llmUsage.lastFallbackReason = tP(r.fallbackReason)),
      (gc.llmUsage.lastFallbackKind = s)),
    !e)
  )
    return (
      (gc.llmUsage.provider = n || gc.llmUsage.provider),
      void (gc.llmUsage.providerName = a || gc.llmUsage.providerName)
    );
  const l = eP(e, [
      "inputTokens",
      "input_tokens",
      "promptTokens",
      "prompt_tokens",
    ]),
    c = eP(e, [
      "visibleOutputTokens",
      "visible_output_tokens",
      "candidatesTokenCount",
    ]),
    d = eP(e, ["thinkingTokens", "thinking_tokens", "thoughtsTokenCount"]),
    u =
      eP(e, [
        "outputTokens",
        "output_tokens",
        "completionTokens",
        "completion_tokens",
      ]) || c + d,
    m = eP(e, ["totalTokens", "total_tokens"]) || l + u,
    g = Number(t?.outputPerMillion || 0),
    p = Math.min(
      l,
      eP(e, [
        "cachedInputTokens",
        "cached_input_tokens",
        "cachedPromptTokens",
        "cached_prompt_tokens",
      ]),
    ),
    f = ZE(
      l,
      p,
      Math.min(
        Math.max(0, l - p),
        eP(e, [
          "cacheWriteInputTokens",
          "cache_write_input_tokens",
          "cacheCreationInputTokens",
          "cache_creation_input_tokens",
        ]),
      ),
      t,
    ),
    h = YE(c || u, g),
    S = YE(d, g),
    M = YE(u, g),
    v = f + M,
    y = eP(e, ["costUSD", "cost_usd", "cost"]) || v;
  ((gc.llmUsage.inputTokens += l),
    (gc.llmUsage.outputTokens += u),
    (gc.llmUsage.visibleOutputTokens += c || (d ? 0 : u)),
    (gc.llmUsage.thinkingTokens += d),
    (gc.llmUsage.totalTokens += m),
    (gc.llmUsage.callCount += 1),
    (gc.llmUsage.costUSD = nP(gc.llmUsage.costUSD + y)),
    (gc.llmUsage.inputCostUSD = nP(gc.llmUsage.inputCostUSD + f)),
    (gc.llmUsage.outputCostUSD = nP(gc.llmUsage.outputCostUSD + M)),
    (gc.llmUsage.visibleOutputCostUSD = nP(
      gc.llmUsage.visibleOutputCostUSD + h,
    )),
    (gc.llmUsage.thinkingCostUSD = nP(gc.llmUsage.thinkingCostUSD + S)),
    o &&
      ((gc.llmUsage.fallbackInputTokens += l),
      (gc.llmUsage.fallbackOutputTokens += u),
      (gc.llmUsage.fallbackVisibleOutputTokens += c || (d ? 0 : u)),
      (gc.llmUsage.fallbackThinkingTokens += d),
      (gc.llmUsage.fallbackTotalTokens += m),
      (gc.llmUsage.fallbackCostUSD = nP(gc.llmUsage.fallbackCostUSD + y)),
      (gc.llmUsage.fallbackInputCostUSD = nP(
        gc.llmUsage.fallbackInputCostUSD + f,
      )),
      (gc.llmUsage.fallbackOutputCostUSD = nP(
        gc.llmUsage.fallbackOutputCostUSD + M,
      )),
      (gc.llmUsage.fallbackVisibleOutputCostUSD = nP(
        gc.llmUsage.fallbackVisibleOutputCostUSD + h,
      )),
      (gc.llmUsage.fallbackThinkingCostUSD = nP(
        gc.llmUsage.fallbackThinkingCostUSD + S,
      )),
      "provider_error_rescue" === s
        ? (gc.llmUsage.providerErrorRescueCostUSD = nP(
            (gc.llmUsage.providerErrorRescueCostUSD || 0) + y,
          ))
        : (gc.llmUsage.deadlineRescueCostUSD = nP(
            (gc.llmUsage.deadlineRescueCostUSD || 0) + y,
          ))),
    (gc.llmUsage.provider = n || gc.llmUsage.provider),
    (gc.llmUsage.providerName = a || gc.llmUsage.providerName));
}
function OE(e, t = null) {
  const n = gc.sessionId,
    a =
      gc.walletBillingSnapshot?.sessionId === n
        ? gc.walletBillingSnapshot
        : null;
  "sql-wallet-v1" === t?.billingProtocol &&
    t.sessionId === n &&
    Number.isSafeInteger(t.revision) &&
    t.revision >= (a?.revision ?? 0) &&
    (gc.walletBillingSnapshot = { ...t });
  const r =
      gc.walletBillingSnapshot?.sessionId === n
        ? gc.walletBillingSnapshot
        : null,
    i = (e) => Math.max(0, Number(r?.[e]) || 0),
    o =
      e.mseProcessedCoverageSeconds > 0
        ? 3600 / e.mseProcessedCoverageSeconds
        : 0,
    s = { ...e };
  for (const e of [
    "sttCostUSD",
    "llmCostUSD",
    "inputCostUSD",
    "outputCostUSD",
    "visibleOutputCostUSD",
    "thinkingCostUSD",
    "fallbackCostUSD",
    "fallbackInputCostUSD",
    "fallbackOutputCostUSD",
    "fallbackVisibleOutputCostUSD",
    "fallbackThinkingCostUSD",
    "deadlineRescueCostUSD",
    "providerErrorRescueCostUSD",
    "llmUserCreditsPerHour",
    "llmFixedUsageSeconds",
    "contextResearchCostUSD",
    "contextResearchCreditsUsed",
    "contextResearchRequestCount",
    "contextResearchInputTokens",
    "contextResearchOutputTokens",
    "contextResearchTotalTokens",
    "fallbackInputTokens",
    "fallbackOutputTokens",
    "fallbackVisibleOutputTokens",
    "fallbackThinkingTokens",
    "fallbackTotalTokens",
    "deadlineRescueCount",
    "providerErrorRescueCount",
  ])
    s[e] = 0;
  return {
    ...s,
    source: r ? "remote-billing" : "wallet-pending",
    billingProtocol: "sql-wallet-v1",
    billingSessionId: n,
    billingRevision: r?.revision ?? -1,
    fundingWallet: gc.config.fundingWallet || "",
    passCreditsUsed: i("passCreditsUsed"),
    passCallCount: i("passCallCount"),
    passAudioSeconds: i("passAudioSeconds"),
    generalCreditsUsed: Number(r?.walletCharges?.general) || 0,
    economyCreditsUsed: Number(r?.walletCharges?.economy) || 0,
    creditsUsed: i("totalCreditsUsed"),
    totalCostUSD: i("totalCostUSD"),
    sttCostUSD: i("sttCostUSD"),
    llmCostUSD: i("llmCostUSD"),
    sttDurationSeconds: i("sttDurationSeconds"),
    localSttAudioSeconds: i("localSttAudioSeconds"),
    sttUsageSource: r?.sttUsageSource || "",
    sttCallCount: i("sttCallCount"),
    llmCallCount: i("llmCallCount"),
    totalTokens: i("totalTokens"),
    inputTokens: i("llmInputTokens"),
    outputTokens: i("llmOutputTokens"),
    thinkingTokens: i("llmThinkingTokens"),
    cachedInputTokens: i("llmCachedInputTokens"),
    visibleOutputTokens: i("llmVisibleOutputTokens"),
    llmFallbackCount: i("llmFallbackCount"),
    fallbackCount: i("llmFallbackCount"),
    sttDeadlineHedgeCostUSD: 0,
    fallbackCostUSD: i("llmFallbackCostUSD"),
    llmRepairCount: i("llmRepairCount"),
    sttCreditsPerConvertedHour: Math.round(1e5 * i("sttCostUSD") * o),
    llmCreditsPerConvertedHour: Math.round(1e5 * i("llmCostUSD") * o),
    totalCreditsPerConvertedHour: Math.round(i("totalCreditsUsed") * o),
    llmBillingMode: r?.llmBillingMode || "wallet-usage",
    llmUsageDetailsHidden: !0 === r?.llmUsageDetailsHidden,
    llmUserCreditsPerHour: i("llmUserCreditsPerHour"),
    llmFixedUsageSeconds: i("llmFixedUsageSeconds"),
    contextResearchCostUSD: Number(r?.contextResearchUsage?.totalCostUSD) || 0,
    contextResearchCreditsUsed:
      Number(r?.contextResearchUsage?.creditsUsed) || 0,
    contextResearchRequestCount:
      Number(r?.contextResearchUsage?.llmCallCount) || 0,
    contextResearchInputTokens:
      Number(r?.contextResearchUsage?.inputTokens) || 0,
    contextResearchOutputTokens:
      Number(r?.contextResearchUsage?.outputTokens) || 0,
    contextResearchTotalTokens:
      Number(r?.contextResearchUsage?.totalTokens) || 0,
    contextResearchUsage: r?.contextResearchUsage || {},
    liveChatUsage: r?.liveChatUsage || {},
    replyUsage: r?.replyUsage || {},
  };
}
function NE(e = null, t = {}) {
  zm() && Xu("periodic");
  const n = { ...$E(t), billingSessionId: gc.sessionId };
  if ("sql-wallet-v1" === gc.config?.walletBillingProtocol)
    return void bP({
      kind: "usage",
      final: Boolean(t.final),
      forceEventLog: Boolean(t.forceEventLog || t.final),
      usage: OE(n, e),
    });
  const a = "fixed-time" === (e?.llmBillingMode || n.llmBillingMode);
  bP({
    kind: "usage",
    final: Boolean(t.final),
    forceEventLog: Boolean(t.forceEventLog || t.final),
    usage: e
      ? {
          ...n,
          source: "remote-billing",
          creditsUsed: Math.max(n.creditsUsed, Number(e.totalCreditsUsed || 0)),
          totalCostUSD: Math.max(n.totalCostUSD, Number(e.totalCostUSD || 0)),
          sessionElapsedSeconds: Math.max(
            n.sessionElapsedSeconds,
            Number(e.sessionElapsedSeconds || 0),
          ),
          sttDurationSeconds: Number(
            e.sttDurationSeconds || n.sttDurationSeconds,
          ),
          sttCostUSD: Number(e.sttCostUSD || n.sttCostUSD),
          contextResearchRequestCount: Number(
            e.contextResearchRequestCount || 0,
          ),
          contextResearchInputTokens: Number(e.contextResearchInputTokens || 0),
          contextResearchOutputTokens: Number(
            e.contextResearchOutputTokens || 0,
          ),
          contextResearchTotalTokens: Number(e.contextResearchTotalTokens || 0),
          contextResearchCostUSD: Number(e.contextResearchCostUSD || 0),
          contextResearchCreditsUsed: Number(e.contextResearchCreditsUsed || 0),
          llmCostUSD: Number(e.llmCostUSD || n.llmCostUSD),
          llmBillingMode: e.llmBillingMode || n.llmBillingMode,
          llmUserCreditsPerHour: Number(
            e.llmUserCreditsPerHour || n.llmUserCreditsPerHour || 0,
          ),
          llmFixedUsageSeconds: Number(
            e.llmFixedUsageSeconds || n.llmFixedUsageSeconds || 0,
          ),
          llmUsageDetailsHidden: a,
          totalTokens: a ? 0 : Number(e.totalTokens || n.totalTokens),
          inputTokens: a ? 0 : Number(e.llmInputTokens || n.inputTokens),
          outputTokens: a ? 0 : Number(e.llmOutputTokens || n.outputTokens),
          visibleOutputTokens: a
            ? 0
            : Number(e.llmVisibleOutputTokens || n.visibleOutputTokens),
          thinkingTokens: a
            ? 0
            : Number(e.llmThinkingTokens || n.thinkingTokens),
          llmCallCount: a ? 0 : Number(e.llmCallCount || n.llmCallCount),
          llmFallbackCount: a
            ? 0
            : Number(e.llmFallbackCount ?? n.llmFallbackCount),
          fallbackCount: a
            ? 0
            : Number(e.llmFallbackCount ?? n.llmFallbackCount),
          fallbackInputTokens: a
            ? 0
            : Number(e.llmFallbackInputTokens || n.fallbackInputTokens),
          fallbackOutputTokens: a
            ? 0
            : Number(e.llmFallbackOutputTokens || n.fallbackOutputTokens),
          fallbackVisibleOutputTokens: a
            ? 0
            : Number(
                e.llmFallbackVisibleOutputTokens ||
                  n.fallbackVisibleOutputTokens,
              ),
          fallbackThinkingTokens: a
            ? 0
            : Number(e.llmFallbackThinkingTokens || n.fallbackThinkingTokens),
          fallbackTotalTokens: a
            ? 0
            : Number(e.llmFallbackTotalTokens || n.fallbackTotalTokens),
          fallbackCostUSD: Number(e.llmFallbackCostUSD || n.fallbackCostUSD),
          fallbackInputCostUSD: Number(
            e.llmFallbackInputCostUSD || n.fallbackInputCostUSD,
          ),
          fallbackOutputCostUSD: Number(
            e.llmFallbackOutputCostUSD || n.fallbackOutputCostUSD,
          ),
          fallbackVisibleOutputCostUSD: Number(
            e.llmFallbackVisibleOutputCostUSD || n.fallbackVisibleOutputCostUSD,
          ),
          fallbackThinkingCostUSD: Number(
            e.llmFallbackThinkingCostUSD || n.fallbackThinkingCostUSD,
          ),
          deadlineRescueCount: a
            ? 0
            : Number(e.llmDeadlineRescueCount ?? n.deadlineRescueCount),
          deadlineRescueCostUSD: Number(
            e.llmDeadlineRescueCostUSD || n.deadlineRescueCostUSD,
          ),
          providerErrorRescueCount: a
            ? 0
            : Number(
                e.llmProviderErrorRescueCount ?? n.providerErrorRescueCount,
              ),
          providerErrorRescueCostUSD: Number(
            e.llmProviderErrorRescueCostUSD || n.providerErrorRescueCostUSD,
          ),
          providerFailoverCount: Number(
            e.llmProviderFailoverCount ?? n.providerFailoverCount,
          ),
          fallbackProvider: e.fallbackProvider || n.fallbackProvider,
          fallbackFromProvider:
            e.fallbackFromProvider || n.fallbackFromProvider,
          fallbackReason: e.fallbackReason || n.fallbackReason,
          inputCostUSD: Number(e.llmInputCostUSD || n.inputCostUSD),
          outputCostUSD: Number(e.llmOutputCostUSD || n.outputCostUSD),
          visibleOutputCostUSD: Number(
            e.llmVisibleOutputCostUSD || n.visibleOutputCostUSD,
          ),
          thinkingCostUSD: Number(e.llmThinkingCostUSD || n.thinkingCostUSD),
          provider: e.provider || n.provider,
          providerName: e.providerName || n.providerName,
          sttProvider: e.sttProvider || n.sttProvider,
        }
      : n,
  });
}
function HE() {
  return qP(gc.config?.provider) === zn;
}
function GE() {
  const e = Math.max(0, Number(gc.captureAudioMs) || 0);
  return zm() ? Math.max(0, Math.round(1e3 * lu())) : e;
}
function WE(e) {
  return ((Math.max(0, Number(e) || 0) / 1e3 / 3600) * Qn) / Kn;
}
function $E(e = {}) {
  const t = QE(),
    n = Math.max(0, gc.totalAudioMs),
    a = JE(),
    r = t / 1e3,
    i = n / 1e3,
    o = gc.captureAudioMs / 1e3,
    s = Math.max(0, o - i),
    l = Math.max(0, i - r),
    c = KE(r, i),
    d = HE(),
    u = GE(),
    m = d ? WE(u) : gc.llmUsage.costUSD,
    g = nP(c + m),
    p = lu(),
    f = p > 0 ? r / p : 1,
    h = p > 0 ? 3600 / p : 0;
  return {
    source: "local-estimate",
    creditsUsed: Math.ceil(g * Kn),
    totalCostUSD: g,
    sttDurationSeconds: r,
    sessionElapsedSeconds: a,
    sttRawDurationSeconds: i,
    sttAudioSpeed: zP(),
    sttSpeedSavedAudioSeconds: l,
    sttCostUSD: nP(c),
    sttDeadlineHedgeCount: Math.max(
      0,
      Math.round(gc.sttDeadlineHedgeUsage?.launchedCount || 0),
    ),
    sttDeadlineHedgeCompatCount: Math.max(
      0,
      Math.round(gc.sttDeadlineHedgeUsage?.compatLaunchedCount || 0),
    ),
    sttDeadlineHedgeCompletedCount: Math.max(
      0,
      Math.round(gc.sttDeadlineHedgeUsage?.completedFallbackCount || 0),
    ),
    sttDeadlineHedgeWinCount: Math.max(
      0,
      Math.round(gc.sttDeadlineHedgeUsage?.fallbackWinCount || 0),
    ),
    sttDeadlineHedgePrimaryWinCount: Math.max(
      0,
      Math.round(gc.sttDeadlineHedgeUsage?.primaryWinAfterLaunchCount || 0),
    ),
    sttDeadlineHedgeBillableAudioSeconds:
      Math.max(
        0,
        Number(gc.sttDeadlineHedgeUsage?.fallbackBillableAudioMs || 0),
      ) / 1e3,
    sttDeadlineHedgeCostUSD: nP(gc.sttDeadlineHedgeUsage?.fallbackCostUSD || 0),
    mseProcessedCoverageSeconds: aP(p),
    sttBillingAmplification: aP(f),
    sttCreditsPerConvertedHour: h > 0 ? Math.round(c * Kn * h) : 0,
    llmCreditsPerConvertedHour: h > 0 ? Math.round(m * Kn * h) : 0,
    totalCreditsPerConvertedHour: h > 0 ? Math.round(g * Kn * h) : 0,
    capturedAudioSeconds: o,
    vadSkippedAudioSeconds: s,
    vadSentRatio: o > 0 ? i / o : 1,
    vadEnabled: Ay(),
    vadProvider: gc.config?.vadProvider || Wt,
    llmCostUSD: nP(m),
    llmBillingMode: d ? "fixed-time" : "provider-usage",
    llmUserCreditsPerHour: d ? Qn : 0,
    llmFixedUsageSeconds: d ? u / 1e3 : 0,
    llmUsageDetailsHidden: d,
    totalTokens: d ? 0 : gc.llmUsage.totalTokens,
    inputTokens: d ? 0 : gc.llmUsage.inputTokens,
    outputTokens: d ? 0 : gc.llmUsage.outputTokens,
    visibleOutputTokens: d ? 0 : gc.llmUsage.visibleOutputTokens,
    thinkingTokens: d ? 0 : gc.llmUsage.thinkingTokens,
    llmCallCount: d ? 0 : gc.llmUsage.callCount,
    llmFallbackCount: d ? 0 : gc.llmUsage.fallbackCount,
    fallbackCount: d ? 0 : gc.llmUsage.fallbackCount,
    fallbackInputTokens: d ? 0 : gc.llmUsage.fallbackInputTokens,
    fallbackOutputTokens: d ? 0 : gc.llmUsage.fallbackOutputTokens,
    fallbackVisibleOutputTokens: d
      ? 0
      : gc.llmUsage.fallbackVisibleOutputTokens,
    fallbackThinkingTokens: d ? 0 : gc.llmUsage.fallbackThinkingTokens,
    fallbackTotalTokens: d ? 0 : gc.llmUsage.fallbackTotalTokens,
    fallbackCostUSD: d ? 0 : nP(gc.llmUsage.fallbackCostUSD),
    fallbackInputCostUSD: d ? 0 : nP(gc.llmUsage.fallbackInputCostUSD),
    fallbackOutputCostUSD: d ? 0 : nP(gc.llmUsage.fallbackOutputCostUSD),
    fallbackVisibleOutputCostUSD: d
      ? 0
      : nP(gc.llmUsage.fallbackVisibleOutputCostUSD),
    fallbackThinkingCostUSD: d ? 0 : nP(gc.llmUsage.fallbackThinkingCostUSD),
    deadlineRescueCount: d ? 0 : gc.llmUsage.deadlineRescueCount || 0,
    deadlineRescueCostUSD: d ? 0 : nP(gc.llmUsage.deadlineRescueCostUSD || 0),
    providerErrorRescueCount: d ? 0 : gc.llmUsage.providerErrorRescueCount || 0,
    providerErrorRescueCostUSD: d
      ? 0
      : nP(gc.llmUsage.providerErrorRescueCostUSD || 0),
    providerFailoverCount: gc.llmUsage.providerFailoverCount || 0,
    fallbackProvider: gc.llmUsage.lastFallbackProvider,
    fallbackFromProvider: gc.llmUsage.lastFallbackFromProvider,
    fallbackReason: gc.llmUsage.lastFallbackReason,
    inputCostUSD: d ? 0 : nP(gc.llmUsage.inputCostUSD),
    outputCostUSD: d ? 0 : nP(gc.llmUsage.outputCostUSD),
    visibleOutputCostUSD: d ? 0 : nP(gc.llmUsage.visibleOutputCostUSD),
    thinkingCostUSD: d ? 0 : nP(gc.llmUsage.thinkingCostUSD),
    provider: gc.llmUsage.provider,
    providerName: gc.llmUsage.providerName,
    sttProvider: gc.config?.sttProvider || Z,
    textEngineCLive: { ...gc.textEngineCLiveUsage },
    latency: gc.lastPipelineLatency,
    audioChunks: gc.sentAudioChunks,
    finalBatch: LE(),
    subtitlePipeline: _E(),
    final: Boolean(e.final),
    updatedAt: new Date().toISOString(),
  };
}
function VE() {
  return gc.config?.sttProvider === ne
    ? 0
    : gc.config?.sttProvider === ae
      ? Wn
      : gc.config?.sttProvider === re
        ? Un
        : gc.config?.sttProvider === ie
          ? qn
          : gc.config?.sttProvider === oe
            ? Fn
            : NP(gc.config?.sttProvider)
              ? 0
              : gc.config?.sttProvider === se
                ? jn
                : gc.config?.sttProvider === ee
                  ? 6666666666666667e-21
                  : gc.config?.sttProvider === te
                    ? Gn
                    : gc.config?.sttProvider === Y
                      ? Bn
                      : _n;
}
function jE(e) {
  const t = dP(e, 1, 2);
  return On * (1.5 - 0.5 * t);
}
function KE(e, t) {
  if (gc.config?.sttProvider === se && gc.textEngineCLiveUsage.costUSD > 0)
    return gc.textEngineCLiveUsage.costUSD;
  const n = Math.max(0, e);
  if (gc.config?.sttProvider === Y) {
    const e = Math.max(n, rP(t) ?? n);
    return ((e / 3600) * jE(n > 0 ? dP(e / n, 1, 2) : 1)) / Kn;
  }
  return n * VE();
}
function zE() {
  return {
    deltaInputAudioTokens: Math.max(
      0,
      gc.textEngineCLiveUsage.inputAudioTokens -
        gc.lastHeartbeatTextEngineCLiveUsage.inputAudioTokens,
    ),
    deltaOutputAudioTokens: Math.max(
      0,
      gc.textEngineCLiveUsage.outputAudioTokens -
        gc.lastHeartbeatTextEngineCLiveUsage.outputAudioTokens,
    ),
    deltaTotalAudioTokens: Math.max(
      0,
      gc.textEngineCLiveUsage.totalAudioTokens -
        gc.lastHeartbeatTextEngineCLiveUsage.totalAudioTokens,
    ),
    deltaCostUSD: nP(
      gc.textEngineCLiveUsage.costUSD -
        gc.lastHeartbeatTextEngineCLiveUsage.costUSD,
    ),
    totalInputAudioTokens: gc.textEngineCLiveUsage.inputAudioTokens,
    totalOutputAudioTokens: gc.textEngineCLiveUsage.outputAudioTokens,
    totalAudioTokens: gc.textEngineCLiveUsage.totalAudioTokens,
    totalCostUSD: nP(gc.textEngineCLiveUsage.costUSD),
  };
}
function QE() {
  const e = rP(gc.sttBillableAudioMs);
  return null !== e ? Math.max(0, e) : Math.max(0, gc.totalAudioMs);
}
function JE() {
  const e = Date.parse(gc.config?.startedAt || "");
  return Number.isFinite(e) ? Math.max(0, (Date.now() - e) / 1e3) : 0;
}
function XE(e, t, n) {
  const a = Number(n?.outputPerMillion || 0);
  return Number(n?.inputPerMillion || 0) || a ? ZE(e, 0, 0, n) + YE(t, a) : 0;
}
function ZE(e, t, n, a) {
  const r = Number(a?.inputPerMillion || 0),
    i =
      Number(
        a?.cachedInputPerMillion ??
          a?.cacheReadPerMillion ??
          a?.cacheHitPerMillion ??
          r,
      ) || 0,
    o =
      Number(
        a?.cacheWriteInputPerMillion ??
          a?.cacheCreateInputPerMillion ??
          a?.cacheWritePerMillion ??
          r,
      ) || 0,
    s = Math.max(0, Number(e) || 0),
    l = Math.min(s, Math.max(0, Number(t) || 0)),
    c = Math.min(Math.max(0, s - l), Math.max(0, Number(n) || 0));
  return YE(Math.max(0, s - l - c), r) + YE(l, i) + YE(c, o);
}
function YE(e, t) {
  const n = Number(e) || 0,
    a = Number(t) || 0;
  return n <= 0 || a <= 0 ? 0 : (n * a) / 1e6;
}
function eP(e, t) {
  for (const n of t) {
    const t = Number(e?.[n]);
    if (Number.isFinite(t) && t > 0) return t;
  }
  return 0;
}
function tP(e) {
  return String(e || "")
    .trim()
    .slice(0, 160);
}
function nP(e) {
  const t = Number(e);
  return !Number.isFinite(t) || t <= 0 ? 0 : Math.round(1e9 * t) / 1e9;
}
function aP(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.round(1e3 * t) / 1e3 : null;
}
function rP(e) {
  if (null == e || "" === e) return null;
  const t = Number(e);
  return Number.isFinite(t) ? t : null;
}
function iP(e) {
  const t = rP(e);
  return null === t || t <= 0 ? null : Math.round(t);
}
function oP(e) {
  return rP(e);
}
function sP(e) {
  for (const t of e) {
    const e = rP(t);
    if (null !== e) return e;
  }
  return null;
}
function lP(e) {
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const n = rP(e[t]);
    if (null !== n) return n;
  }
  return null;
}
function cP(e) {
  return e.reduce((e, t) => {
    const n = rP(t);
    return null !== n ? e + n : e;
  }, 0);
}
function dP(e, t, n) {
  const a = Number(e);
  return Number.isFinite(a) ? Math.min(Math.max(a, t), n) : t;
}
async function uP() {
return null;
}
async function mP() {
return null;
}
async function gP() {
return null;
}
function pP() {
  const e = gc.walletContextClient;
  if (((gc.walletContextClient = null), !e)) return;
  const t = Promise.allSettled([gc.walletContextClosing, e.close()]).then(
    (e) => {
      e.some((e) => "rejected" === e.status) &&
        console.warn(
          "[wallet] context cancellation pending; session end remains the final fence",
        );
    },
  );
  ((gc.walletContextClosing = t),
    t.finally(() => {
      gc.walletContextClosing === t && (gc.walletContextClosing = null);
    }));
}
async function fP(e, t, n, a) {
  if ("sql-wallet-v1" !== gc.config?.walletBillingProtocol)
    return mD(`${gc.config.backendUrl}${e}`, t, n, a);
  const r = gc.sessionId,
    i = gc.config.backendUrl,
    o = $S().id,
    s = await uP(),
    l = () =>
      gc.sessionId === r &&
      gc.config?.backendUrl === i &&
      $S().id === o &&
      gc.config?.auth?.uid === s?.uid &&
      !gc.isStopping,
    c = await chrome.runtime.sendMessage({
      type: "GET_WALLET_CONTEXT_CONSENT",
      uid: s?.uid,
      backendUrl: i,
    });
  if (!c?.allowed || !l() || t.signal?.aborted)
    throw new Error(
      "智慧搜尋尚未取得通用額度授權，請在插件設定開啟；字幕仍會正常繼續。",
    );
  if (
    (gc.walletContextClosing && (await gc.walletContextClosing),
    !l() || t.signal?.aborted)
  )
    throw new Error("智慧搜尋已取消");
  const d = (gc.walletContextClient ||=
      globalThis.SubruuWalletInteractions.create({
        confirmCharge: async (e, t) => {
          const n = await chrome.runtime.sendMessage({
            type: "GET_WALLET_CONTEXT_CONSENT",
            uid: s?.uid,
            backendUrl: i,
          });
          return !t.aborted && l() && !0 === n?.allowed;
        },
      })),
    u = () => {
      gc.walletContextClient === d && pP();
    },
    m = setTimeout(u, n);
  t.signal?.addEventListener("abort", u, { once: !0 });
  try {
    const n = await d.research(
      {
        uid: s.uid,
        sessionId: r,
        backendUrl: i,
        contextKey: o,
        walletMode: !0,
        isCurrent: l,
        headers: hP(s),
      },
      JSON.parse(t.body),
      e.endsWith("/review") ? "review" : "research",
    );
    if (!n || t.signal?.aborted || !l()) throw new Error("智慧搜尋已取消");
    return Response.json(n);
  } finally {
    (clearTimeout(m), t.signal?.removeEventListener("abort", u));
  }
}
function hP(e, t = "application/json") {
  const n = {};
  (t && (n["Content-Type"] = t),
    e?.idToken && (n.Authorization = `Bearer ${e.idToken}`),
    (n["X-Caption-Billing-Protocol"] = String(2)),
    gc.sessionId && (n["X-Caption-Session-Id"] = String(gc.sessionId)));
  const a = chrome.runtime?.getManifest?.().version || "";
  return (a && (n["X-Caption-Extension-Version"] = a), n);
}
async function SP(e = "application/json") {
  const t = await uP();
  if (!t?.idToken)
    throw new Error("請先在插件登入，後端服務需要 Firebase token。");
  return hP(t, e);
}
function MP({ endStream: e = !1 } = {}) {
  return QP()
    ? (Xf({ force: !0, reason: "commit" }), 0)
    : gc.websocket && gc.websocket.readyState === WebSocket.OPEN
      ? gc.activeSttProvider === ne || gc.activeSttProvider === ae
        ? e
          ? (gc.websocket.send(JSON.stringify({ type: "stop" })), 800)
          : 0
        : gc.activeSttProvider === se
          ? e
            ? (gc.websocket.send(JSON.stringify({ type: "audioStreamEnd" })),
              800)
            : 0
          : (gc.websocket.send(
              JSON.stringify({
                message_type: "input_audio_chunk",
                audio_base_64: "",
                commit: !0,
                sample_rate: Ge,
              }),
            ),
            250)
      : 0;
}
function vP(e, t) {
  bP({ kind: "status", status: e, message: t });
}
function yP(e) {
  bP({ kind: "error", message: e });
}
function bP(e) {
  const t = wP(e);
  return (Ox(t), AP(t, { retry: kP(t) }).catch(() => {}), t);
}
async function TP(e) {
  const t = wP(e);
  return (Ox(t), AP(t, { retry: !0 }));
}
function wP(e = {}) {
  gc.eventDeliverySequence =
    Math.max(0, Number(gc.eventDeliverySequence) || 0) + 1;
  const t = RP(e);
  return {
    ...t,
    deliverySequence: rP(t.deliverySequence) ?? gc.eventDeliverySequence,
    deliveryId:
      t.deliveryId ||
      [
        gc.sessionId || "session",
        gc.timelineRevision,
        gc.eventDeliverySequence,
      ].join(":"),
  };
}
function kP(e = {}) {
  return (
    "subtitle-pipeline-range" === e.kind ||
    "mse-readiness" === e.kind ||
    ("translation" === e.kind && !0 === e.isFinal) ||
    ("transcript" === e.kind && !0 === e.isFinal)
  );
}
function CP(e = null) {
  return (
    !(!e || !1 === e.ok) &&
    !1 !== e.delivered &&
    !1 !== e.accepted &&
    !0 === e.ok
  );
}
async function AP(e = {}, t = {}) {
  const n = !0 === t.retry,
    a = n ? dc : [0];
  let r = null;
  for (let t = 0; t < a.length; t += 1) {
    const i = a[t];
    if (
      (i > 0 && (await fD(i)),
      gc.isStopping ||
        (e.sessionId && e.sessionId !== gc.sessionId) ||
        (null !== rP(e.timelineRevision) &&
          rP(e.timelineRevision) !== gc.timelineRevision))
    )
      return {
        ok: !1,
        delivered: !1,
        accepted: !1,
        retryable: !1,
        reason: "event-context-expired",
        attempts: t,
      };
    try {
      const t = await chrome.runtime.sendMessage({
        type: "OFFSCREEN_EVENT",
        sessionId: gc.sessionId || null,
        event: e,
      });
      r =
        void 0 === t
          ? {
              ok: !0,
              delivered: !0,
              accepted: !0,
              reason: "legacy-listener-ack",
            }
          : t;
    } catch (e) {
      r = {
        ok: !1,
        delivered: !1,
        accepted: !1,
        retryable: !0,
        reason: "runtime-message-failed",
        error: e?.message || String(e),
      };
    }
    if (CP(r))
      return (
        n &&
          t > 0 &&
          Nx(
            "subtitle.delivery.recovered",
            {
              deliveryId: e.deliveryId || "",
              kind: e.kind || "",
              attempts: t + 1,
              reason: r?.reason || "display-acknowledged",
            },
            { source: "offscreen", level: "warn" },
          ),
        { ...r, ok: !0, delivered: !0, accepted: !0, attempts: t + 1 }
      );
    if (!1 === r?.retryable || !n) break;
    Nx(
      "subtitle.delivery.retry",
      {
        deliveryId: e.deliveryId || "",
        kind: e.kind || "",
        attempt: t + 1,
        nextDelayMs: a[t + 1] ?? null,
        reason: r?.reason || "display-not-acknowledged",
        error: r?.error || "",
      },
      { source: "offscreen", level: "warn" },
    );
  }
  return n || kP(e)
    ? (Nx(
        "subtitle.delivery.failed",
        {
          deliveryId: e.deliveryId || "",
          kind: e.kind || "",
          attempts: a.length,
          reason: r?.reason || "display-not-acknowledged",
          error: r?.error || "",
        },
        { source: "offscreen", level: "error" },
      ),
      { ...(r || {}), ok: !1, delivered: !1, accepted: !1, attempts: a.length })
    : {
        ...(r || {}),
        ok: !1,
        delivered: !1,
        accepted: !1,
        noncritical: !0,
        attempts: a.length,
      };
}
function RP(e = {}) {
  if (!e || "object" != typeof e) return e;
  const t = e.context && "object" == typeof e.context ? e.context : {},
    n = rP(e.timelineRevision) ?? gc.timelineRevision,
    a =
      e.pageUrl ||
      t.pageUrl ||
      gc.config?.pageUrl ||
      gc.sourceMediaTiming?.href ||
      "",
    r = e.sessionId || t.sessionId || gc.sessionId || null,
    i = e.mediaContextKey || t.mediaContextKey || tE() || cE(a),
    o = {
      ...t,
      pageUrl: a,
      sourceUrl: t.sourceUrl || a,
      mediaContextKey: i,
      videoKey: t.videoKey || i || "",
      videoPlatform: gc.config?.videoPlatform || "",
      sessionId: r,
      timelineRevision: n,
    };
  return {
    ...e,
    sessionId: r,
    timelineRevision: n,
    pageUrl: e.pageUrl || a,
    mediaContextKey: e.mediaContextKey || i || "",
    videoKey: e.videoKey || i || "",
    context: o,
  };
}
function xP() {
  (gc.walletCaptionTransport?.close(),
    (gc.walletSttRequestOwners = new Map()),
    (gc.captureGeneration = crypto.randomUUID()),
    aM({ abort: !0 }),
    bm(),
    Fc("transcript-reset"),
    Td("transcript-reset"),
    Od({ resetAttempts: !0 }),
    Gd("transcript-reset", { rejectPending: !0 }),
    ef(),
    (gc.isTranslating = !1),
    (gc.subtitleDisplayMetrics = null),
    (gc.activeSttProvider = gc.config?.sttProvider || Z),
    (gc.timelineRevision = 0),
    (gc.pcmGroundTruthRing = []),
    (gc.pcmGroundTruthRingMs = 0),
    (gc.pcmGroundTruthClock = null),
    (gc.mseCoverageHoles = []),
    (gc.msePcmCoverageWatchdog = ym()),
    (gc.mseCoverageLedger = Jd()),
    (gc.mseCompletedTimelineProcessedCoverageSeconds = 0),
    (gc.mseTranscribedAudioRanges = []),
    (gc.transcriberConnectionId =
      Math.max(0, Number(gc.transcriberConnectionId) || 0) + 1),
    (gc.textEngineGRequestSequence = 0),
    (gc.textEngineGConnectPromise = null),
    (gc.textEngineGPending = new Map()),
    (gc.textEngineGLastInboundAtMs = 0),
    (gc.textEngineGAccepting = !0),
    (gc.localSpeechEngineAMseSockets = new Set()),
    (gc.localSpeechEngineAHttpControllers = new Set()),
    (gc.localSpeechEngineAMseRequestSequence = 0),
    (gc.speechEngineARealtimeFallbackPending = !1),
    (gc.speechEngineARealtimeConnectPromise = null),
    (gc.speechEngineARealtimeStandbySocket = null),
    (gc.speechEngineARealtimeDrainingSocket = null),
    (gc.speechEngineARealtimeRotationPrepareTimer = null),
    (gc.speechEngineARealtimeRotationForceTimer = null),
    (gc.speechEngineARealtimeRotationDrainTimer = null),
    (gc.speechEngineARealtimeRotationPreparing = !1),
    (gc.speechEngineARealtimeRotationForcePending = !1),
    (gc.speechEngineARealtimeRotationDeadlineAtMs = 0),
    (gc.speechEngineARealtimeRotationBufferedMessages = []),
    (gc.speechEngineARealtimeRotationSequence = 0),
    (gc.speechEngineARealtimeRotationEpoch = 0),
    (gc.speechEngineARealtimeLastSpeechAtMs = 0),
    (gc.speechEngineARealtimeSpeechRunStartedAtMs = 0),
    wf(),
    (gc.speechEngineARealtimeRecoveryActive = !1),
    (gc.speechEngineARealtimeRecoveryLastLogAtMs = 0),
    (gc.translationRequestId = 0),
    (gc.activeTranslationRequestId = 0),
    (gc.activeTranslationCount = 0),
    (gc.activeFinalTranslationCount = 0),
    (gc.activeTranslationRequests = new Map()),
    (gc.pendingFinalTranslation = null),
    (gc.finalTranslationBatch = []),
    (gc.finalBatchStats = {
      enabled: !1,
      queuedSegments: 0,
      batchesSent: 0,
      segmentsSent: 0,
      estimatedCallsWithoutBatch: 0,
      savedCalls: 0,
      lastBatchSize: 0,
      lastWaitMs: 0,
    }),
    (gc.translationLatencySamples = []),
    (gc.sttLatencySamplesByProvider = {}),
    (gc.sttDeadlineHedgeProviderHealth = {}),
    (gc.sttDeadlineHedgeUsage = xy()),
    (gc.pipelineLatencySamples = []),
    (gc.pipelineLatencyBuckets = {}),
    (gc.pipelineLatencyStats = null),
    Ow(),
    Vx(),
    (gc.eventLogQueue = []),
    (gc.eventLogSequence = 0),
    (gc.eventDeliverySequence = 0),
    (gc.eventLogFlushInFlight = !1),
    (gc.eventLogDropped = 0),
    (gc.lastClientStatusLogSignature = ""),
    (gc.lastClientStatusLoggedAtMs = 0),
    (gc.lastMseReadinessLogSignature = ""),
    (gc.lastMseReadinessLoggedAtMs = 0),
    (gc.lastUsageSnapshotSignature = ""),
    (gc.lastUsageSnapshotLoggedAtMs = 0),
    (gc.adaptiveSyncDelaySeconds = null),
    (gc.pipelineLatencySamples = []),
    (gc.pipelineLatencyBuckets = {}),
    (gc.pipelineLatencyStats = null),
    Uw(),
    HT({ invalidate: !0 }),
    qb(),
    (gc.lastFinalText = ""),
    (gc.realtimeCommittedSequence = 0),
    (gc.realtimeFinalTranscriptSeen = !1),
    (gc.mseStartupInterimTranslationRequested = !1),
    (gc.translationTimelineReservations = []),
    (gc.translationTimelineReservationSequence = 0),
    (gc.lastInterimTranslationAt = 0),
    (gc.displayedOriginalText = ""),
    (gc.automaticSttContextRequestSequence = 0),
    (gc.automaticSttContextReviewSequence = 0),
    (gc.automaticSttContextLastReviewedTranscript = ""),
    (gc.scheduledOriginalText = ""),
    (gc.confirmedSegments = []),
    (gc.sourceMediaTiming = null),
    (gc.sourceTimingReceivedAt = 0),
    (gc.sourceEndedGuardActive = !1),
    (gc.sourceEndedGuardStartedAt = 0),
    (gc.sourceEndedGuardReason = ""),
    (gc.sourceEndedGuardMseSegmentsIgnored = 0),
    (gc.expectedSourceSeekTargetMediaTime = null),
    (gc.expectedViewerSeekTargetMediaTime = null),
    (gc.expectedSourceSeekId = ""),
    (gc.expectedSourceSeekStartedAtMs = 0),
    (gc.expectedSourceSeekConfirmedAtMs = 0),
    (gc.expectedSourceSeekConfirmedWallTimeMs = 0),
    (gc.expectedSourceSeekUntilMs = 0),
    (gc.lastIgnoredSourceSeekTimingAtMs = 0),
    (gc.sourceAdAudioSkippedMs = 0),
    (gc.sourceAdLastSkipLogAt = 0),
    (gc.viewerMediaTiming = null),
    (gc.viewerTimingReceivedAt = 0),
    (gc.mediaPlaybackPausedForStt = !1),
    (gc.mediaPlaybackPausedReason = ""),
    (gc.captureMediaClock = null),
    (gc.lastTranscriptTiming = null),
    (gc.lastPipelineLatency = null),
    (gc.subtitlePipelineStats = jy()),
    xT(),
    ET(),
    (gc.sentAudioChunks = 0),
    (gc.totalAudioMs = 0),
    (gc.sttBillableAudioMs = 0),
    (gc.captureAudioMs = 0),
    (gc.digitalSilenceDurationMs = 0),
    (gc.lastDigitalSilenceLogAtMs = 0),
    (gc.captureContextSwitchInFlight = !1),
    EP(),
    (gc.mseAudio = Py()),
    (gc.mseStartupBoost = Dy()),
    (gc.prefetchPcmGeneration = null),
    (gc.lastUsageHeartbeatAudioMs = 0),
    (gc.walletBillingSnapshot = null),
    (gc.lastUsageHeartbeatBillableAudioMs = 0),
    (gc.lastUsageHeartbeatContentMs = 0),
    (gc.lunaBillingUsageMs = 0),
    (gc.sttBillingWatchdogBillableAudioMs = 0),
    (gc.sttBillingWatchdogGrowthAtMs = Date.now()),
    (gc.sttBillingWatchdogLastLogAtMs = 0),
    (gc.usageHeartbeatSequence = 0),
    (gc.pendingUsageHeartbeatId = ""),
    (gc.usageHeartbeatConsecutiveFailures = 0),
    (gc.usageHeartbeatLastSuccessAtMs = 0),
    (gc.billingStopRequested = !1),
    (gc.llmUsage = {
      inputTokens: 0,
      outputTokens: 0,
      visibleOutputTokens: 0,
      thinkingTokens: 0,
      totalTokens: 0,
      callCount: 0,
      costUSD: 0,
      inputCostUSD: 0,
      outputCostUSD: 0,
      visibleOutputCostUSD: 0,
      thinkingCostUSD: 0,
      fallbackInputTokens: 0,
      fallbackOutputTokens: 0,
      fallbackVisibleOutputTokens: 0,
      fallbackThinkingTokens: 0,
      fallbackTotalTokens: 0,
      fallbackCostUSD: 0,
      fallbackInputCostUSD: 0,
      fallbackOutputCostUSD: 0,
      fallbackVisibleOutputCostUSD: 0,
      fallbackThinkingCostUSD: 0,
      fallbackCount: 0,
      deadlineRescueCount: 0,
      deadlineRescueCostUSD: 0,
      providerErrorRescueCount: 0,
      providerErrorRescueCostUSD: 0,
      providerFailoverCount: 0,
      lastFallbackProvider: "",
      lastFallbackFromProvider: "",
      lastFallbackReason: "",
      lastFallbackKind: "",
      provider: "",
      providerName: "",
    }),
    (gc.lastHeartbeatLLMUsage = { ...gc.llmUsage }));
}
function EP() {
  ((gc.sttTimingAudioMs = 0),
    (gc.sentAudioTimeline = []),
    (gc.lastRealtimeCommitAudioMs = 0),
    (gc.realtimeCommitPending = !1),
    (gc.realtimeCommitSentAtMs = 0),
    (gc.lastRealtimeCoverageCommitAudioMs = 0),
    (gc.pendingRealtimeCommitCoverageRanges = []),
    (gc.lastSpeechActivityEventAt = 0),
    (gc.speechEngineARealtimeLastSpeechAtMs = 0),
    (gc.speechEngineARealtimeSpeechRunStartedAtMs = 0),
    wf(),
    (gc.vad = Ry()),
    $f(gc.batchStt),
    (gc.batchStt = Ey()),
    (gc.batchStt.activeUploads = mS()),
    (gc.batchStt.isUploading = gc.batchStt.activeUploads > 0));
}
function PP(e = {}) {
 e={...e,apiProvider:'textamisu',sttProvider:'st-a',provider:'lt-n',sttAudioSpeed:1,disableSubtitleCache:true,liveSharedEnabled:false,sttContextAutoResearchEnabled:false,sttContextRefreshEnabled:false,llmFallbackMode:'off',sttEmptyRetryEnabled:false,mseStartupBoostEnabled:false};
 delete e.auth; delete e.walletBillingProtocol;
  const t = _P(e.sourceLang || "auto"),
    n = UP(e.sttProvider, t).provider,
    a = KP(e.sttAudioSpeed, n),
    r = WP(n, qP(e.provider)),
    i =
      (String(e.videoPlatform || "").toLowerCase(),
      e.nativeStreamDelayEnabled ? 30 : ma),
    o = Tk(e.batchWaitSeconds),
    s = dP(e.syncDelaySeconds || 6, 2, i),
    l = oP(e.baseSyncDelaySeconds),
    c = null !== l ? dP(l, 2, i) : s,
    d = oP(e.effectiveSyncDelaySeconds),
    u = dP(null !== d ? d : null !== l ? s : s + o, 2, i),
    m = Boolean(e.disableSubtitleCache || !0 === e.sttContextCustom),
    g = [3, 5, 10].includes(
      Math.round(Number(e.sttContextRefreshIntervalMinutes)),
    )
      ? Math.round(Number(e.sttContextRefreshIntervalMinutes))
      : 3;
  return {
    ...e,
    backendUrl: (e.backendUrl || T).replace(/\/+$/, ""),
    audioPrefetchEnabled: !0 === e.audioPrefetchEnabled,
    sourceLang: t,
    targetLang: e.targetLang || "zh",
    sttLanguageMode: US(e.sttLanguageMode),
    sttContextAutoResearchEnabled: !1 !== e.sttContextAutoResearchEnabled,
    sttContextSearchDirection: OS(
      e.sttContextSearchDirection || "",
      1e3,
    ).trim(),
    sttContextRefreshEnabled: !1 !== e.sttContextRefreshEnabled,
    sttContextRefreshIntervalMinutes: g,
    sttContextCustom: !0 === e.sttContextCustom,
    sttProvider: n,
    sttAudioSpeed: a,
    speechEngineAWsUrl: iD(e.speechEngineAWsUrl),
    vadEnabled: !1,
    vadProvider: rD(e.vadProvider),
    localVadGateEnabled: !0 === e.localVadGateEnabled,
    localVadEnergyThreshold: dP(e.localVadEnergyThreshold || Vt, 0.002, 0.08),
    localVadSilenceThreshold: dP(e.localVadSilenceThreshold || jt, 0.001, 0.06),
    localVadMinSpeechMs: dP(e.localVadMinSpeechMs || Kt, 40, 1e3),
    localVadHangoverMs: dP(e.localVadHangoverMs || zt, 100, 3e3),
    localVadPrefixPaddingMs: dP(e.localVadPrefixPaddingMs || Qt, 0, 1200),
    batchSttMinSegmentMs: cD(e.batchSttMinSegmentMs, 600, 6e3),
    batchSttMaxSegmentMs: cD(e.batchSttMaxSegmentMs, 1200, 15e3),
    batchSttTargetSegmentMs: cD(e.batchSttTargetSegmentMs, 600, 15e3),
    batchSttPipelineReserveMs: cD(e.batchSttPipelineReserveMs, 1500, lt),
    batchSttOverlapMs: cD(e.batchSttOverlapMs, 0, 1800),
    speechEngineACommitIntervalMs: dP(
      e.speechEngineACommitIntervalMs || yo,
      400,
      8e3,
    ),
    speechEngineACommitMinChars: dP(e.speechEngineACommitMinChars || bo, 4, 80),
    provider: r,
    llmFallbackMode: lD(e.llmFallbackMode),
    segmentationMode: sD(e.segmentationMode),
    auth: e.auth || null,
    saveEnabled: !1,
    disableSubtitleCache: m,
    syncEnabled: !1 !== e.syncEnabled,
    singleTabMediaSync: Boolean(e.singleTabMediaSync),
    sourceIsLiveStream: Boolean(e.sourceIsLiveStream || e.isLiveStream),
    liveMseFallbackApplied: Boolean(e.liveMseFallbackApplied),
    mseAudioBufferEnabled: Boolean(e.mseAudioBufferEnabled),
    audioInputMode:
      "mse-audio-buffer" === e.audioInputMode
        ? "mse-audio-buffer"
        : e.audioInputMode || "",
    mirrorDelayEnabled: Boolean(
      e.mirrorDelayEnabled || "mirror-delay" === e.captionMode,
    ),
    nativeStreamDelayEnabled: Boolean(e.nativeStreamDelayEnabled),
    nativeStreamDelayKind: e.nativeStreamDelayKind || "",
    sourcePreloadEnabled: !1,
    sourcePreloadPlaybackRate: 1,
    sourcePreloadMaxLeadSeconds: dP(
      e.sourcePreloadMaxLeadSeconds || 60,
      10,
      60,
    ),
    lowLatencyStt: Boolean(
      e.lowLatencyStt ||
        "instant-overlay" === e.captionMode ||
        e.singleTabMediaSync ||
        !1 === e.syncEnabled,
    ),
    interimTranslationsEnabled: !1 !== e.interimTranslationsEnabled,
    syncInterimTranslationsEnabled: !1 !== e.syncInterimTranslationsEnabled,
    syncDelayMode: IP(e.syncDelayMode),
    syncDelaySeconds: u,
    baseSyncDelaySeconds: c,
    batchWaitSeconds: o,
    effectiveSyncDelaySeconds: u,
    mseStartupBoostEnabled: Boolean(e.mseStartupBoostEnabled),
    mseSeekCatchupEnabled: !1 !== e.mseSeekCatchupEnabled,
    mseStartupBoostMode: Fy(e.mseStartupBoostMode),
    mseStartupBoostTargetSeconds: qy(e.mseStartupBoostTargetSeconds),
    mseStartupBoostProvider: qP(e.mseStartupBoostProvider || Dl),
    adaptiveSyncDelayEnabled: Boolean(e.adaptiveSyncDelayEnabled),
    subtitleBufferTargetSegments: dP(e.subtitleBufferTargetSegments || 3, 1, 8),
    syncSubtitleOffsetSeconds: dP(e.syncSubtitleOffsetSeconds || 0, -2, 2),
    finalBatchingEnabled: !1 !== e.finalBatchingEnabled,
    finalBatchMinSegments: cD(e.finalBatchMinSegments, 1, 8),
    finalBatchMaxSegments: cD(e.finalBatchMaxSegments, 1, 10),
    finalBatchMaxChars: cD(e.finalBatchMaxChars, 160, 1600),
    finalBatchWaitMs: cD(e.finalBatchWaitMs, na, ra),
    hybridSubtitleCacheMode: !m && Boolean(e.hybridSubtitleCacheMode),
    cacheReplayMode: !m && Boolean(e.cacheReplayMode),
    cachedSubtitleCoverageRanges: m ? [] : DP(e.cachedSubtitleCoverageRanges),
    cachedSubtitleCoverageReliable:
      !m && !0 === e.cachedSubtitleCoverageReliable,
    cachedSubtitleCoverageSource: m
      ? ""
      : String(e.cachedSubtitleCoverageSource || ""),
  };
}
function DP(e = []) {
  return (Array.isArray(e) ? e : [])
    .map((e) => {
      const t = rP(e.startMs ?? e.start_ms),
        n = rP(e.endMs ?? e.end_ms);
      if (null === t || null === n || n <= t) return null;
      const a = Math.max(
        0,
        Math.round(
          Number(
            e.segments ??
              e.segmentCount ??
              e.segment_count ??
              e.subtitleCount ??
              0,
          ) || 0,
        ),
      );
      return {
        startMs: Math.max(0, Math.round(t)),
        endMs: Math.max(0, Math.round(n)),
        segments: a,
        source: String(e.source || ""),
        reason: String(e.reason || ""),
      };
    })
    .filter(Boolean)
    .sort((e, t) => e.startMs - t.startMs || e.endMs - t.endMs);
}
function IP(e) {
  return "auto" ===
    String(e || "")
      .toLowerCase()
      .trim()
    ? "auto"
    : "fixed";
}
function LP(e) {
  const t = String(e || Z)
      .toLowerCase()
      .trim(),
    n = Be[t] || t;
  return n === ne
    ? ne
    : n === ae
      ? ae
      : n === re
        ? re
        : n === ie
          ? ie
          : n === oe
            ? oe
            : n === te
              ? te
              : n === ce || "st-h" === n || "st-h" === n || "st-h" === n
                ? ce
                : n === de ||
                    n === le ||
                    "st-e" === n ||
                    "t3-integrated" === n ||
                    "st-e" === n ||
                    "st-e" === n
                  ? de
                  : n === ue || "st-f" === n || "st-f" === n
                    ? ue
                    : n === me || "st-g" === n || "st-g" === n || "st-g" === n
                      ? me
                      : n === ee
                        ? ee
                        : n === Y
                          ? Y
                          : Z;
}
function _P(e) {
  const t = String(e || "auto")
    .toLowerCase()
    .trim();
  if (!t || "auto" === t) return "auto";
  const n = Ue[t] || t;
  return qe.has(n) ? n : "auto";
}
function BP(e, t) {
  const n = LP(e),
    a = _P(t);
  return (
    !a ||
    "auto" === a ||
    (n === te || n === ae
      ? Fe.has(a)
      : n === ee
        ? Boolean(Ne[a])
        : n === oe
          ? Oe.has(a)
          : n === re || n === ie || (n !== Z && n !== Y) || qe.has(a))
  );
}
function UP(e, t) {
  const n = LP(e),
    a = _P(t);
  return a && "auto" !== a
    ? BP(n, a)
      ? { provider: n, sourceLang: a, switched: !1, reason: "" }
      : QP(n)
        ? n === ee && BP(Y, a)
          ? {
              provider: Y,
              sourceLang: a,
              switched: !0,
              reason: "language-not-supported-by-speechEngineB",
            }
          : n === te && BP(Y, a)
            ? {
                provider: Y,
                sourceLang: a,
                switched: !0,
                reason: "language-not-supported-by-speechEngineA",
              }
            : n === oe && BP(Y, a)
              ? {
                  provider: Y,
                  sourceLang: a,
                  switched: !0,
                  reason: "language-not-supported-by-speechEngineI",
                }
              : {
                  provider: n,
                  sourceLang: a,
                  switched: !1,
                  reason: "language-not-supported",
                }
        : {
            provider: n,
            sourceLang: a,
            switched: !1,
            reason: "language-not-supported",
          }
    : { provider: n, sourceLang: a, switched: !1, reason: "" };
}
function qP(e) {
  const t = String(e || "lt-e")
    .toLowerCase()
    .trim();
  return _e[t] || t || "lt-e";
}
function FP(e) {
  const t = Number(e);
  return je.has(t) ? t : 1;
}
function OP(e) {
  const t = LP(e);
  return t === Y || t === re;
}
function NP(e = gc.activeSttProvider || gc.config?.sttProvider) {
  const t = LP(e);
  return t === de || t === le || t === ce || t === ue || t === me;
}
function HP(e = gc.activeSttProvider || gc.config?.sttProvider) {
  const t = LP(e);
  return t === ue || t === me;
}
function GP(e = gc.activeSttProvider || gc.config?.sttProvider) {
  return NP(e);
}
function WP(e, t) {
  const n = LP(e),
    a = qP(t);
  return n === ue
    ? "lt-e"
    : n === me
      ? "lt-f"
      : n === ce
        ? "lt-a"
        : n === de
          ? "lt-b"
          : a;
}
function $P() {
  return WP(
    gc.config?.sttProvider || gc.activeSttProvider,
    gc.config?.provider,
  );
}
function VP() {
  const e = $P();
  return dP((So[e] || Ma) + 12e3, Bi, qi);
}
function jP() {
  return "sql-wallet-v1" === gc.config?.walletBillingProtocol
    ? 15
    : HP()
      ? Number.POSITIVE_INFINITY
      : dP(gc.config?.integratedT3CaptionMaxConcurrentUploads || 3, 1, 5);
}
function KP(e, t) {
  return OP(t) ? FP(e) : 1;
}
function zP() {
  const e = gc.activeSttProvider || gc.config?.sttProvider;
  return QP(e) ? KP(gc.config?.sttAudioSpeed, e) : 1;
}
function QP(e = gc.activeSttProvider || gc.config?.sttProvider) {
  const t = LP(e);
  return (
    t === Y || t === ee || t === te || t === re || t === ie || t === oe || NP(t)
  );
}
function JP(e = gc.activeSttProvider || gc.config?.sttProvider) {
  const t = LP(e);
  return t === ne || t === ae || QP(t);
}
function XP(e = gc.activeSttProvider || gc.config?.sttProvider) {
  return Boolean(zm() && LP(e) === ne && !gc.mediaStream);
}
function ZP(e = gc.activeSttProvider || gc.config?.sttProvider) {
  return Boolean(zm() && LP(e) === ae && !By(e) && !eD());
}
function YP(e = gc.activeSttProvider || gc.config?.sttProvider) {
  return XP(e) || ZP(e);
}
function eD() {
  const e = String(gc.config?.sourceLiveClassification || "")
    .trim()
    .toLowerCase();
  return (
    "vod" !== e &&
    ("live" === e ||
      Boolean(
        !0 === gc.config?.sourceIsLiveStream ||
          !0 === gc.config?.isLiveStream ||
          !0 === gc.sourceMediaTiming?.isLiveStream ||
          !0 === gc.viewerMediaTiming?.isLiveStream,
      ))
  );
}
function tD(e = "mse-unavailable", t = {}) {
  if (gc.isStopping || LP(gc.activeSttProvider) !== ae) return !1;
  if (!zm() || !gc.mediaStream) return !1;
  const n = gc.mseAudio || (gc.mseAudio = Py());
  if (
    "mse-decode-incomplete" === e &&
    ((n.remoteSpeechEngineADecodeFailureStreak =
      Math.max(0, Number(n.remoteSpeechEngineADecodeFailureStreak) || 0) + 1),
    n.remoteSpeechEngineADecodeFailureStreak < 2)
  )
    return !1;
  if (n.remoteSpeechEngineATabCaptureFallbackActivated) return !1;
  ((n.remoteSpeechEngineATabCaptureFallbackActivated = !0),
    (n.enabled = !1),
    (n.bridgeClosedAtMs = n.bridgeClosedAtMs || Date.now()),
    (n.bridgeClosedReason = e),
    Xg(n),
    Jg(n));
  const a = Yg(e);
  (Fc(e),
    (gc.config = {
      ...(gc.config || {}),
      captionMode:
        "mse-audio-buffer" === gc.config?.captionMode
          ? "instant-overlay"
          : gc.config?.captionMode,
      sourceIsLiveStream:
        "live-stream-detected" === e || !0 === gc.config?.sourceIsLiveStream,
      liveMseFallbackApplied:
        "live-stream-detected" === e ||
        !0 === gc.config?.liveMseFallbackApplied,
      mseAudioBufferEnabled: !1,
      audioInputMode: "tab-capture",
      mseStartupBoostEnabled: !1,
      mseStartupBoostMode: "",
      mseStartupBoostActive: !1,
    }),
    (gc.mseStartupBoost = Ly(gc.config)));
  const r = Qg(e);
  return (
    Nx(
      "stt.speechEngineA_realtime.mse_fallback",
      {
        reason: e,
        connectionStarted: r,
        decodeFailureStreak: Math.max(
          0,
          Number(n.remoteSpeechEngineADecodeFailureStreak) || 0,
        ),
        droppedMseChunks: a.chunks,
        droppedMseDurationMs: a.durationMs,
        audioInputMode: gc.config.audioInputMode,
        ...t,
      },
      { source: "offscreen", level: "warn", provider: ae },
    ),
    vP(
      "speechEngineA-realtime-fallback",
      "live-stream-detected" === e
        ? "直播改用迅聽 Mini GPU 即時串流"
        : "MSE 音訊不可用，已改用迅聽 Mini GPU 即時串流",
    ),
    r
  );
}
function nD(e) {
  const t = LP(e);
  return t === ee || t === te;
}
function aD(e = gc.activeSttProvider || gc.config?.sttProvider) {
  return "Textamisu 語音辨識";
}
function rD(e) {
  const t = String(e || Wt)
    .toLowerCase()
    .trim();
  return ["none", "disabled", "false", "0", Gt].includes(t)
    ? Gt
    : t === $t
      ? $t
      : Wt;
}
function iD(e) {
  return String(e || He).trim() || He;
}
function oD(e = "auto") {
  return (
    {
      auto: "auto",
      eng: "en-US",
      en: "en-US",
      jpn: "ja-JP",
      ja: "ja-JP",
      kor: "ko-KR",
      ko: "ko-KR",
      zho: "zh-CN",
      cmn: "zh-CN",
      zh: "zh-CN",
      yue: "zh-CN",
      spa: "es-ES",
      es: "es-ES",
      fra: "fr-FR",
      fr: "fr-FR",
      deu: "de-DE",
      de: "de-DE",
      por: "pt-PT",
      pt: "pt-PT",
      vie: "vi-VN",
      vi: "vi-VN",
      tha: "th-TH",
      th: "th-TH",
    }[String(e || "auto").toLowerCase()] ||
    e ||
    "auto"
  );
}
function sD(e) {
  const t = String(e || "auto")
    .toLowerCase()
    .trim();
  return ["auto", "sentence", "clause", "semantic", "length", "pause"].includes(
    t,
  )
    ? t
    : "auto";
}
function lD(e) {
  const t = String(e || "auto")
    .toLowerCase()
    .trim();
  return ["off", "none", "disabled", "disable", "false", "0"].includes(t)
    ? "off"
    : "auto";
}
function cD(e, t, n) {
  const a = oP(e);
  return null === a ? null : dP(a, t, n);
}
function dD(e) {
  return e.readyState === WebSocket.OPEN
    ? Promise.resolve()
    : new Promise((t, n) => {
        const a = setTimeout(() => {
            (s(), n(new Error("STT WebSocket 連線逾時")));
          }, 12e3),
          r = () => {
            (s(), t());
          },
          i = () => {
            (s(), n(new Error("STT WebSocket 無法連線")));
          },
          o = (e) => {
            (s(), n(new Error(pD("STT WebSocket 連線已關閉", e))));
          },
          s = () => {
            (clearTimeout(a),
              e.removeEventListener("open", r),
              e.removeEventListener("error", i),
              e.removeEventListener("close", o));
          };
        (e.addEventListener("open", r),
          e.addEventListener("error", i),
          e.addEventListener("close", o));
      });
}
function uD(e, t) {
  return !0 === e?.__liveSubtitleSessionReady
    ? Promise.resolve()
    : new Promise((n, a) => {
        const r = setTimeout(() => {
            (l(), a(new Error("迅聽 Mini GPU ready 逾時")));
          }, sc),
          i = (a) => {
            if (t !== gc.transcriberConnectionId) return;
            let r = null;
            try {
              r = JSON.parse(PT(a.data));
            } catch {
              return;
            }
            "ready" === r?.type &&
              ((e.__liveSubtitleSessionReady = !0), l(), n());
          },
          o = () => {
            (l(), a(new Error("迅聽 Mini GPU 無法就緒")));
          },
          s = (e) => {
            (l(), a(new Error(pD("迅聽 Mini GPU 連線已關閉", e))));
          },
          l = () => {
            (clearTimeout(r),
              e.removeEventListener("message", i),
              e.removeEventListener("error", o),
              e.removeEventListener("close", s));
          };
        (e.addEventListener("message", i),
          e.addEventListener("error", o),
          e.addEventListener("close", s));
      });
}
async function mD(e, t = {}, n = 5e3, a = "後端請求") {
  const r = new AbortController(),
    i = t.signal,
    o = () => r.abort();
  i?.aborted ? r.abort() : i?.addEventListener?.("abort", o, { once: !0 });
  const s = setTimeout(() => r.abort(), Math.max(1e3, n)),
    { signal: l, ...c } = t;
  try {
    return await fetch(e, { ...c, signal: r.signal });
  } catch (e) {
    if ("AbortError" === e?.name) throw new Error(`${a}逾時`);
    throw e;
  } finally {
    (clearTimeout(s), i?.removeEventListener?.("abort", o));
  }
}
async function gD(e, t = "json", n = 5e3, a = "後端回應") {
  const r = e?.[t];
  if ("function" != typeof r) throw new Error(`${a}缺少 ${t} reader`);
  const i = Math.max(1, Math.round(Number(n) || 5e3));
  let o = null;
  try {
    return await Promise.race([
      r.call(e),
      new Promise((t, n) => {
        o = setTimeout(() => {
          try {
            const t = e?.body?.cancel?.();
            t?.catch?.(() => {});
          } catch {}
          n(new Error(`${a}逾時`));
        }, i);
      }),
    ]);
  } finally {
    o && clearTimeout(o);
  }
}
function pD(e, t = {}) {
  const n = Number.isFinite(Number(t.code)) ? Number(t.code) : 0,
    a = wD(t.reason || "");
  return `${e}${n ? ` (${n})` : ""}${a ? `: ${a}` : ""}`;
}
function fD(e) {
  return new Promise((t) => setTimeout(t, e));
}
function hD(e, t, n) {
  if (n === t) return MD(e);
  const a = t / n,
    r = Math.floor(e.length / a),
    i = new Int16Array(r);
  for (let t = 0; t < r; t += 1) {
    const n = Math.floor(t * a),
      r = Math.min(Math.floor((t + 1) * a), e.length);
    let o = 0;
    for (let t = n; t < r; t += 1) o += e[t];
    const s = o / Math.max(1, r - n);
    i[t] = bD(s);
  }
  return i;
}
function SD(e, t, n) {
  if (n === t) return new Float32Array(e);
  const a = t / n,
    r = Math.floor(e.length / a),
    i = new Float32Array(r);
  for (let t = 0; t < r; t += 1) {
    const n = Math.floor(t * a),
      r = Math.min(Math.floor((t + 1) * a), e.length);
    let o = 0;
    for (let t = n; t < r; t += 1) o += e[t];
    i[t] = o / Math.max(1, r - n);
  }
  return i;
}
function MD(e) {
  const t = new Int16Array(e.length);
  for (let n = 0; n < e.length; n += 1) t[n] = bD(e[n]);
  return t;
}
function vD(e, t = 16e3) {
  const n = MD(e),
    a = n.byteLength,
    r = new ArrayBuffer(44 + a),
    i = new DataView(r);
  return (
    yD(i, 0, "RIFF"),
    i.setUint32(4, 36 + a, !0),
    yD(i, 8, "WAVE"),
    yD(i, 12, "fmt "),
    i.setUint32(16, 16, !0),
    i.setUint16(20, 1, !0),
    i.setUint16(22, 1, !0),
    i.setUint32(24, t, !0),
    i.setUint32(28, 2 * t, !0),
    i.setUint16(32, 2, !0),
    i.setUint16(34, 16, !0),
    yD(i, 36, "data"),
    i.setUint32(40, a, !0),
    new Uint8Array(r, 44).set(
      new Uint8Array(n.buffer, n.byteOffset, n.byteLength),
    ),
    new Uint8Array(r)
  );
}
function yD(e, t, n) {
  for (let a = 0; a < n.length; a += 1) e.setUint8(t + a, n.charCodeAt(a));
}
function bD(e) {
  const t = Math.max(-1, Math.min(1, e));
  return t < 0 ? 32768 * t : 32767 * t;
}
function TD(e) {
  let t = "";
  for (let n = 0; n < e.length; n += 32768)
    t += String.fromCharCode(...e.subarray(n, n + 32768));
  return btoa(t);
}
function wD(e = "") {
  return null == e ? "" : String(e).replace(/\s+/g, " ").trim();
}
function kD(e = "", t = 240) {
  const n = wD(e);
  if (!n) return "";
  if (/^<!doctype html/i.test(n) || /^<html[\s>]/i.test(n)) return "";
  const a = ES(n),
    r = wD(
      (a.error && "object" == typeof a.error ? a.error.message : a.error) ||
        a.message ||
        "",
    );
  return r ? r.slice(0, t) : n.slice(0, t);
}
function CD(e, t = "") {
  const n = Number(e) || 0;
  if (404 === n)
    return "T3 一體式字幕端點不存在：正式後端尚未部署 /live-caption-integrated，請更新 Cloud Run 後重試。";
  if (429 === n) return "官方 textEngineC 配額或速率限制，已排隊稍後重試。";
  const a = kD(t);
  return `live-caption-integrated failed: ${e}${a ? ` ${a}` : ""}`;
}
function AD(e) {
  const t = wD(e);
  return Boolean(t) && !(t.startsWith("[") && t.endsWith("]")) && !RD(t);
}
function RD(e) {
  const t = wD(e)
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
  return (
    (/^[{\[]/.test(t) &&
      /"(segments|segmentation|translation|original)"\s*:/.test(t)) ||
    /"method"\s*:\s*"llm_subtitle_queue"/.test(t)
  );
}
function xD(e) {
  const t = wD(e).toLowerCase();
  if (!t) return !1;
  const n = t.replace(/[\s\p{P}\p{S}]/gu, "").replace(/[～〜]/gu, "ー");
  return (
    !(!n || Array.from(n).length > 16) &&
    (!!(
      /^(?:(?:う+ん+|ん+|はい|はー+い|え+え*|えー+|あ+ぁ+|あ+|あー+|お+|おー+|は+ぁ+|ふ+ん+|ふー+ん+|へ+え+|ほ+う+|まあ+|わ+あ+|わー+|ふふ+|はは+|へへ+|えへ+|あは+|く+|ぐ+))+$/u.test(
        n,
      ) ||
      /^(?:(?:嗯+|啊+|阿+|喔+|哦+|欸+|诶+|誒+|唉+|呃+|哇+|哈+|呵+|嘿+))+$/u.test(
        n,
      ) ||
      /^(?:(?:응+|네+|어+|음+|아+|오+|흠+|하+))+$/u.test(n)
    ) ||
      /^(?:uh+|um+|umm+|hm+|hmm+|mm+|mhm+|ah+|oh+|ha+|heh+|yeah|yep|yup|okay|ok)$/iu.test(
        t,
      ))
  );
}
function ED(e) {
  const t = wD(e);
  return (
    !(!t || /[\p{L}\p{N}]/u.test(t)) ||
    (!xD(t) &&
      new Set([
        "嗯",
        "嗯。",
        "啊",
        "啊。",
        "喔",
        "喔。",
        "好",
        "好。",
        "謝謝",
        "謝謝觀看",
        "uh",
        "um",
        "hmm",
        "yeah",
        "okay",
        "thanks for watching",
      ]).has(t.toLowerCase()))
  );
}
function PD(e, t) {
  const n = gc.sourceMediaTiming,
    a = n?.sourceProgramClock;
  if (
    "twitch-hls" !== gc.config?.nativeStreamDelayKind ||
    !a ||
    n.paused ||
    n.adPlaying
  )
    return null;
  const r = t - a.observedAtMs;
  return null === e ||
    !Number.isFinite(e) ||
    !Number.isFinite(a.programTimeMs) ||
    !Number.isFinite(a.mediaTime) ||
    !Number.isFinite(r) ||
    r < 0 ||
    r > 2500
    ? null
    : {
        programTimeMs: a.programTimeMs + 1e3 * (e - a.mediaTime),
        mediaTime: e,
        observedAtMs: a.observedAtMs,
        broadcasterLatencySeconds: a.broadcasterLatencySeconds,
        method: a.method,
      };
}
function DD(e) {
  const t = e.map((e) => e.sourceProgramClock).filter(Boolean);
  if (!t.length) return null;
  const n = t.map((e) => e.programTimeMs - 1e3 * e.mediaTime);
  return n.some((e) => !Number.isFinite(e)) ||
    Math.max(...n) - Math.min(...n) > 1e3
    ? null
    : { ...t[t.length - 1] };
}
function ID(e = gc.mediaStream) {
  let t = {};
  try {
    t = e?.getVideoTracks?.()[0]?.getSettings?.() || {};
  } catch {}
  const n = (e, t) =>
    Number.isFinite(Number(e)) && Number(e) > 0 ? Math.min(t, Number(e)) : null;
  return {
    captureWidth: n(t.width, 16384),
    captureHeight: n(t.height, 16384),
    captureFrameRate: n(t.frameRate, 240),
  };
}
function LD(e, t = ID()) {
  if (!e)
    return {
      capture: t,
      policy: "browser-default-fallback",
      recommendedVideoBitsPerSecond: 0,
      videoBitsPerSecond: 0,
      softwareBitrateLimited: !1,
      bufferBitrateLimited: !1,
    };
  const n = t.captureWidth > 0 && t.captureHeight > 0,
    a = n ? hs.find((e) => t.captureWidth * t.captureHeight <= e.pixels) : null,
    r = n ? a[t.captureFrameRate > 30 ? "high" : "standard"] : fs,
    i = /video\/webm/i.test(e),
    o = i ? ps : gs,
    s = Number(gc.config?.syncDelaySeconds),
    l = Number.isFinite(s) && s > 0 ? Math.min(120, s) : 10,
    c = 1e6 * Math.floor(1610612736 / (2 * (l + vs)) / 1e6),
    d = Math.min(o, c);
  return {
    capture: t,
    policy: n ? "youtube-live-h264-v1" : "youtube-live-h264-assumed-1080p30-v1",
    recommendedVideoBitsPerSecond: r,
    videoBitsPerSecond: Math.max(ms, Math.min(d, r)),
    softwareBitrateLimited: i && r > o,
    bufferBitrateLimited: r > c,
  };
}
