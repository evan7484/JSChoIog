/* JSChoIog design-system card bundle generator (design-sync skill).
 * Emits self-contained HTML cards (first line: @dsCard marker) into ./out.
 *
 * 토큰은 lib/design/tokens.js(단일 소스)를 직접 require한다 — 수동 사본 없음.
 * 토큰을 바꾸면 재생성해서 재푸시만 하면 된다 (SKILL.md 참고).
 * Run: node .claude/skills/design-sync/generate.js */
const fs = require("fs");
const path = require("path");
const {
  BRAND,
  GRAY,
  CATEGORY_COLORS,
  CATEGORY_ICONS: TOKEN_ICONS,
  DEFAULT_CATEGORY_ICON,
} = require("../../../lib/design/tokens.js");
const { ICONS } = require("../../../lib/design/icons.js");

const OUT = path.join(__dirname, "out");

// 생성기 내부 표현으로 변환 (카드 렌더링에는 hex만 필요)
const CATEGORY_GRADIENTS = Object.fromEntries(
  Object.entries(CATEGORY_COLORS).map(([name, { hex }]) => [name, hex])
);
const CATEGORY_ICONS = { ...TOKEN_ICONS, "(기타)": DEFAULT_CATEGORY_ICON };

// 커스텀 아이콘 인라인 렌더 (시안 B — 지오메트리는 lib/design/icons.js)
const icon = (name, size = 20, color = "#fff", filled = false) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${filled ? color : "none"}" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="color:${color};flex-shrink:0">${ICONS[name] || ""}</svg>`;

// 앱 전역 배경: bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 (app/layout.tsx)
const PAGE_BG = `linear-gradient(135deg, ${BRAND.orange50}, ${BRAND.amber50}, ${BRAND.yellow50})`;
// 브랜드 CTA: from-orange-500 to-red-500
const CTA = `linear-gradient(90deg, ${BRAND.orange500}, ${BRAND.red500})`;
// Geist는 카드에서 로드하지 않는다 (CSP/휴대성) — 시스템 산세리프 폴백
const FONT = `'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Apple SD Gothic Neo', sans-serif`;
const MONO = `'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace`;

const page = (group, title, body, extraCss = "") => `<!-- @dsCard group="${group}" -->
<!doctype html>
<meta charset="utf-8">
<title>${title}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: ${FONT}; background: ${PAGE_BG}; color: ${GRAY.g800}; padding: 24px; }
  h1 { font-size: 18px; font-weight: 600; margin-bottom: 4px; }
  .sub { font-size: 12px; color: ${GRAY.g500}; margin-bottom: 20px; }
  .section { font-size: 12px; font-weight: 600; color: ${GRAY.g500}; margin: 20px 0 8px; text-transform: uppercase; letter-spacing: .04em; }
  ${extraCss}
</style>
<body>
<h1>${title}</h1>
${body}
</body>
`;

const out = (rel, html) => {
  const p = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, html);
  console.log("wrote", rel);
};

/* ---------- foundations/colors ---------- */
{
  const sw = (name, val, ink = "#fff") => `
    <div class="sw">
      <div class="chip" style="background:${val};color:${ink}"></div>
      <div class="meta"><b>${name}</b><span>${val}</span></div>
    </div>`;
  const grad = (name, [a, b]) => `
    <div class="sw">
      <div class="chip" style="background:linear-gradient(135deg,${a},${b})"></div>
      <div class="meta"><b>${name}</b><span>${a} → ${b}</span></div>
    </div>`;

  const body = `
  <p class="sub">Tailwind 유틸리티 팔레트 사본 — 원본은 components/**의 클래스와 lib/notion/colors.ts</p>
  <div class="section">Brand ramp (orange)</div>
  <div class="row">${Object.entries(BRAND)
    .filter(([k]) => k.startsWith("orange"))
    .map(([k, v]) => sw(k, v, k === "orange50" || k === "orange100" || k === "orange200" ? GRAY.g700 : "#fff"))
    .join("")}</div>
  <div class="section">Accent (red · amber · yellow)</div>
  <div class="row">${["red400", "red500", "red600", "amber50", "amber100", "amber400", "yellow50"]
    .map((k) => sw(k, BRAND[k], k.includes("50") || k.includes("100") ? GRAY.g700 : "#fff"))
    .join("")}</div>
  <div class="section">Grays (텍스트·보더·서피스)</div>
  <div class="row">${Object.entries(GRAY)
    .map(([k, v]) => sw("gray-" + k.slice(1), v))
    .join("")}</div>
  <div class="section">Brand gradients</div>
  <div class="row">
    ${grad("CTA · active nav", [BRAND.orange500, BRAND.red500])}
    ${grad("category active", [BRAND.orange400, BRAND.red400])}
    ${grad("footer", [BRAND.orange100, BRAND.amber100])}
    ${grad("page bg", [BRAND.orange50, BRAND.yellow50])}
  </div>
  <div class="section">Category gradients (lib/notion/colors.ts)</div>
  <div class="row">${Object.entries(CATEGORY_GRADIENTS)
    .map(([k, v]) => grad(k, v))
    .join("")}</div>`;

  out(
    "foundations/colors.html",
    page("Foundations", "Colors", body, `
    .row { display: flex; flex-wrap: wrap; gap: 10px; }
    .sw { width: 108px; }
    .chip { height: 56px; border-radius: 10px; border: 1px solid rgba(0,0,0,.06); }
    .meta { margin-top: 4px; font-size: 11px; display: flex; flex-direction: column; }
    .meta b { color: ${GRAY.g700}; font-weight: 600; }
    .meta span { color: ${GRAY.g500}; font-family: ${MONO}; font-size: 10px; }`)
  );
}

/* ---------- foundations/typography ---------- */
{
  const body = `
  <p class="sub">Geist Sans / Geist Mono (next/font, app/layout.tsx) — 카드에서는 시스템 폴백으로 렌더</p>
  <div class="section">Display (컴포넌트 오버라이드)</div>
  <div class="spec"><span class="label">post hero · text-4xl/5xl bold</span>
    <div style="font-size:36px;font-weight:700;color:#fff;background:${CTA};padding:12px 16px;border-radius:12px">포스트 제목이 이렇게</div></div>
  <div class="spec"><span class="label">logo · text-2xl bold + gradient text</span>
    <div style="font-size:24px;font-weight:700;background:linear-gradient(90deg,${BRAND.orange600},${BRAND.red600});-webkit-background-clip:text;background-clip:text;color:transparent">JSChoIog!</div></div>
  <div class="section">Base scale (app/globals.css @layer base — weight 500, line-height 1.5)</div>
  <div class="spec"><span class="label">h1 · text-2xl</span><div style="font-size:24px;font-weight:500">긍정적인 사고를 바탕으로</div></div>
  <div class="spec"><span class="label">h2 · text-xl</span><div style="font-size:20px;font-weight:500">모든 글</div></div>
  <div class="spec"><span class="label">h3 · text-lg</span><div style="font-size:18px;font-weight:500">Categories</div></div>
  <div class="spec"><span class="label">h4 / p · text-base</span><div style="font-size:16px">본문은 16px, line-height 1.5로 렌더링됩니다.</div></div>
  <div class="section">Supporting</div>
  <div class="spec"><span class="label">meta · text-sm gray-500</span><div style="font-size:14px;color:${GRAY.g500}">읽는데 5분 · 2026-07-23</div></div>
  <div class="spec"><span class="label">code · Geist Mono</span><div style="font-family:${MONO};font-size:13px;background:${GRAY.g900};color:${GRAY.g100};padding:8px 12px;border-radius:8px;display:inline-block">const posts = await getBlogPosts()</div></div>`;

  out(
    "foundations/typography.html",
    page("Foundations", "Typography", body, `
    .spec { display: flex; align-items: center; gap: 16px; padding: 10px 0; border-bottom: 1px dashed ${GRAY.g200}; }
    .label { width: 220px; flex-shrink: 0; font-size: 11px; color: ${GRAY.g500}; font-family: ${MONO}; }`)
  );
}

/* ---------- foundations/spacing-radius ---------- */
{
  const r = (name, px, usage) => `
    <div class="rrow">
      <div class="rbox" style="border-radius:${px}px"></div>
      <div class="meta"><b>${name} · ${px}px</b><span>${usage}</span></div>
    </div>`;
  const body = `
  <p class="sub">radius·그림자·페이지 리듬 — 컴포넌트 클래스 사본</p>
  <div class="section">Radius</div>
  ${r("rounded-md", 6, "작은 태그 (#tag)")}
  ${r("rounded-xl", 12, "사이드바 카테고리 버튼")}
  ${r("rounded-2xl", 16, "카드 (블로그·프로젝트·사이드바)")}
  ${r("rounded-3xl", 24, "모달, 프로필 이미지")}
  ${r("rounded-full", 999, "필 버튼·칩·소셜 아이콘")}
  <div class="section">Shadow</div>
  <div class="shrow">
    <div class="shbox" style="box-shadow:0 4px 6px -1px rgb(0 0 0/.1),0 2px 4px -2px rgb(0 0 0/.1)">shadow-lg<br><span>카드 기본</span></div>
    <div class="shbox" style="box-shadow:0 25px 50px -12px rgb(0 0 0/.25)">shadow-2xl<br><span>카드 hover · 모달</span></div>
  </div>
  <div class="section">Page rhythm</div>
  <div class="meta2">컨테이너 max-w-7xl(목록·헤더) / max-w-4xl(포스트 본문) · 좌우 px-6 · 상하 py-12 · 카드 그리드 gap-6 · hover 리프트 -translate-y-2 + 오렌지 보더 오버레이</div>`;

  out(
    "foundations/spacing-radius.html",
    page("Foundations", "Spacing · Radius", body, `
    .rrow { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
    .rbox { width: 72px; height: 40px; background: #fff; border: 2px solid ${BRAND.orange400}; }
    .meta b { font-size: 12px; color: ${GRAY.g700}; display: block; }
    .meta span { font-size: 11px; color: ${GRAY.g500}; }
    .shrow { display: flex; gap: 20px; }
    .shbox { width: 140px; height: 72px; background: #fff; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; text-align: center; }
    .shbox span { font-weight: 400; font-size: 10px; color: ${GRAY.g500}; }
    .meta2 { font-size: 12px; color: ${GRAY.g600}; line-height: 1.7; }`)
  );
}

/* ---------- components/buttons ---------- */
{
  const body = `
  <p class="sub">components/Header·Blog·BlogPost의 버튼·필 상태</p>
  <div class="section">CTA (gradient pill)</div>
  <div class="row">
    <button class="cta">← 다른 글 보러가기</button>
    <button class="cta">Blog</button>
  </div>
  <div class="section">Nav pill (Header)</div>
  <div class="row">
    <button class="cta">Blog</button>
    <button class="nav">About Me</button>
  </div>
  <div class="section">Sidebar category (Blog)</div>
  <div class="col">
    <button class="cat active"><span class="lbl">${icon("grid", 16)} All</span><span class="badge on">12</span></button>
    <button class="cat"><span class="lbl">${icon("cpu", 16, BRAND.orange500)} Tech</span><span class="badge">5</span></button>
  </div>
  <div class="section">Like / Share (BlogPost)</div>
  <div class="row">
    <button class="like">${icon("heart", 14, BRAND.orange600)} 좋아요 12</button>
    <button class="like liked">${icon("heart", 14, BRAND.red500, true)} 좋아요 13</button>
    <button class="like" disabled>${icon("heart", 14, BRAND.orange600)} 처리중...</button>
    <button class="share">${icon("link", 14, GRAY.g700)} 공유하기</button>
    <button class="share copied">✓ 복사됨!</button>
  </div>`;

  out(
    "components/buttons.html",
    page("Components", "Buttons · Pills", body, `
    .row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
    .col { display: flex; flex-direction: column; gap: 8px; max-width: 240px; }
    button { border: 0; cursor: pointer; font-family: inherit; font-size: 14px; font-weight: 500; }
    .cta { padding: 10px 24px; border-radius: 999px; color: #fff; background: ${CTA}; box-shadow: 0 10px 15px -3px rgb(0 0 0/.1); }
    .nav { padding: 10px 24px; border-radius: 999px; background: transparent; color: ${GRAY.g700}; }
    .nav:hover { background: ${BRAND.orange50}; }
    .cat { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-radius: 12px; background: ${GRAY.g50}; color: ${GRAY.g700}; }
    .cat .lbl { display: inline-flex; align-items: center; gap: 7px; }
    .like, .share { display: inline-flex; align-items: center; gap: 6px; }
    .cat.active { background: linear-gradient(90deg, ${BRAND.orange400}, ${BRAND.red400}); color: #fff; box-shadow: 0 10px 15px -3px rgb(0 0 0/.1); }
    .badge { padding: 2px 8px; border-radius: 999px; font-size: 12px; background: ${BRAND.orange100}; color: ${BRAND.orange600}; }
    .badge.on { background: rgba(255,255,255,.2); color: #fff; }
    .like { padding: 8px 24px; border-radius: 999px; background: ${BRAND.orange100}; color: ${BRAND.orange600}; }
    .like.liked { background: ${BRAND.orange200}; color: ${BRAND.orange700}; }
    .like[disabled] { opacity: .7; cursor: default; }
    .share { padding: 8px 24px; border-radius: 999px; background: ${GRAY.g100}; color: ${GRAY.g700}; }
    .share.copied { color: ${BRAND.green600}; }`)
  );
}

/* ---------- components/cards ---------- */
{
  const [ba, bb] = CATEGORY_GRADIENTS.Blue;
  const [oa, ob] = CATEGORY_GRADIENTS.Orange;
  const body = `
  <p class="sub">블로그 포스트 카드(components/Blog.tsx) · 프로젝트 카드(ProjectsSection)</p>
  <div class="grid">
    <div class="card">
      <div class="hero" style="background:linear-gradient(135deg,${ba},${bb})">${icon("cpu", 44)}</div>
      <div class="pad">
        <div class="meta"><span class="chip">Tech</span><span class="dim">읽는데 5분</span></div>
        <div class="title">Next.js 블로그를 서버 컴포넌트로 전환하기</div>
        <p class="ex">클라이언트 fetch 구조를 ISR로 바꾸면서 배운 것들을 정리했습니다.</p>
        <div class="foot"><span class="dim">2026-07-23</span><span class="more">더 보기 →</span></div>
        <div class="tags"><span>#Next.js</span><span>#ISR</span></div>
      </div>
    </div>
    <div class="card hovered">
      <div class="hero" style="background:linear-gradient(135deg,${oa},${ob})">${icon("rocket", 44)}</div>
      <div class="pad">
        <div class="meta"><span class="chip">DevOps</span><span class="dim">읽는데 3분</span></div>
        <div class="title" style="color:${BRAND.orange600}">hover 상태 — 오렌지 보더 + 리프트</div>
        <p class="ex">shadow-2xl, -translate-y-2, 제목 오렌지 전환, 보더 오버레이.</p>
        <div class="foot"><span class="dim">2026-07-22</span><span class="more">더 보기 →</span></div>
        <div class="tags"><span>#UI</span></div>
      </div>
    </div>
    <div class="card proj">
      <div class="hero sm" style="background:linear-gradient(135deg,${CATEGORY_GRADIENTS.Purple[0]},${CATEGORY_GRADIENTS.Purple[1]})"><span>🍷</span></div>
      <div class="pad">
        <div class="title">WINEQUEEN</div>
        <div class="dim" style="margin:2px 0 8px">2025.06 ~ 2025.08</div>
        <p class="ex">와인 추천 및 매칭 서비스 플랫폼</p>
        <div class="tags pill"><span>Next.js</span><span>Supabase</span></div>
      </div>
    </div>
  </div>`;

  out(
    "components/cards.html",
    page("Components", "Cards", body, `
    .grid { display: flex; flex-wrap: wrap; gap: 16px; }
    .card { position: relative; width: 250px; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0/.1); }
    .card.hovered { box-shadow: 0 25px 50px -12px rgb(0 0 0/.25); transform: translateY(-8px); }
    .card.hovered::after { content: ''; position: absolute; inset: 0; border: 2px solid ${BRAND.orange400}; border-radius: 16px; pointer-events: none; }
    .hero { height: 110px; display: flex; align-items: center; justify-content: center; }
    .hero.sm { height: 80px; }
    .hero span { font-size: 44px; }
    .pad { padding: 16px; }
    .meta { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
    .chip { padding: 3px 10px; border-radius: 999px; font-size: 12px; background: ${BRAND.orange100}; color: ${BRAND.orange600}; }
    .dim { font-size: 12px; color: ${GRAY.g500}; }
    .title { font-size: 15px; font-weight: 600; color: ${GRAY.g800}; margin-bottom: 6px; }
    .ex { font-size: 12px; color: ${GRAY.g600}; margin-bottom: 10px; line-height: 1.5; }
    .foot { display: flex; justify-content: space-between; align-items: center; }
    .more { font-size: 12px; color: ${BRAND.orange600}; }
    .tags { display: flex; gap: 6px; margin-top: 10px; }
    .tags span { padding: 2px 8px; border-radius: 6px; font-size: 11px; background: ${GRAY.g100}; color: ${GRAY.g600}; }
    .tags.pill span { border-radius: 999px; background: ${BRAND.orange50}; color: ${BRAND.orange600}; padding: 3px 10px; }`)
  );
}

/* ---------- components/tags-chips ---------- */
{
  const body = `
  <p class="sub">칩·태그 변형과 카테고리 아이콘 (components/Blog.tsx)</p>
  <div class="section">Chips</div>
  <div class="row">
    <span class="chip cat">Tech</span>
    <span class="chip tag">#Next.js</span>
    <span class="chip small">#tag</span>
    <span class="chip hero">Frontend</span>
  </div>
  <div class="legend">
    카테고리(orange-100/600) · 포스트 태그(orange-50/600 pill) · 소형 태그(gray-100/600 rounded-md) · 히어로 위 칩(white/90 blur)
  </div>
  <div class="section">Category icons (커스텀 SVG · lib/design/icons.js)</div>
  <div class="row">${Object.entries(CATEGORY_ICONS)
    .map(
      ([k, v]) =>
        `<div class="ico"><span class="ichip">${icon(v, 20)}</span><b>${k}</b></div>`
    )
    .join("")}</div>`;

  out(
    "components/tags-chips.html",
    page("Components", "Tags · Chips", body, `
    .row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
    .chip { font-size: 13px; }
    .chip.cat { padding: 4px 12px; border-radius: 999px; background: ${BRAND.orange100}; color: ${BRAND.orange600}; }
    .chip.tag { padding: 6px 14px; border-radius: 999px; background: ${BRAND.orange50}; color: ${BRAND.orange600}; }
    .chip.small { padding: 3px 8px; border-radius: 6px; background: ${GRAY.g100}; color: ${GRAY.g600}; font-size: 12px; }
    .chip.hero { padding: 5px 14px; border-radius: 999px; background: rgba(255,255,255,.9); color: ${GRAY.g800}; box-shadow: 0 1px 3px rgb(0 0 0/.15); }
    .legend { margin-top: 10px; font-size: 11px; color: ${GRAY.g500}; }
    .ico { width: 84px; text-align: center; background: #fff; border-radius: 12px; padding: 10px 4px 8px; box-shadow: 0 1px 3px rgb(0 0 0/.08); }
    .ico .ichip { width: 38px; height: 38px; margin: 0 auto 5px; border-radius: 999px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, ${BRAND.orange500}, ${BRAND.red500}); }
    .ico b { font-size: 10px; color: ${GRAY.g600}; font-weight: 500; display: block; }`)
  );
}

/* ---------- patterns/header-footer ---------- */
{
  const body = `
  <p class="sub">고정 헤더(white/80 + blur)와 푸터(오렌지→앰버 그라디언트)</p>
  <div class="shell">
    <div class="hd">
      <div class="brand">
        <div class="logo">🙂</div>
        <span class="wordmark">JSChoIog!</span>
      </div>
      <div class="nav">
        <span class="pill on">Blog</span>
        <span class="pill">About Me</span>
      </div>
    </div>
    <div class="body-hint">…page content (pt-20 오프셋)…</div>
    <div class="ft">
      <p>© 2026 JSChoIog. Built with passion and dedication 🚀</p>
      <div class="socials"><span>${icon("instagram", 17, BRAND.orange600)}</span><span>${icon("linkedin", 17, BRAND.orange600)}</span><span>${icon("github", 17, BRAND.orange600)}</span></div>
    </div>
  </div>`;

  out(
    "patterns/header-footer.html",
    page("Patterns", "Header · Footer", body, `
    .shell { border-radius: 16px; overflow: hidden; border: 1px solid ${GRAY.g200}; background: ${PAGE_BG}; }
    .hd { display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; background: rgba(255,255,255,.8); backdrop-filter: blur(8px); border-bottom: 1px solid ${BRAND.orange100}; }
    .brand { display: flex; align-items: center; gap: 10px; }
    .logo { width: 40px; height: 40px; border-radius: 999px; background: linear-gradient(135deg, ${BRAND.orange400}, #fee2e2); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgb(0 0 0/.1); }
    .wordmark { font-size: 20px; font-weight: 700; background: linear-gradient(90deg, ${BRAND.orange600}, ${BRAND.red600}); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .nav { display: flex; gap: 8px; }
    .pill { padding: 8px 20px; border-radius: 999px; font-size: 13px; font-weight: 500; color: ${GRAY.g700}; }
    .pill.on { background: ${CTA}; color: #fff; box-shadow: 0 10px 15px -3px rgb(0 0 0/.1); }
    .body-hint { padding: 40px; text-align: center; font-size: 12px; color: ${GRAY.g400}; }
    .ft { padding: 24px; text-align: center; background: linear-gradient(90deg, ${BRAND.orange100}, ${BRAND.amber100}); }
    .ft p { font-size: 12px; color: ${GRAY.g700}; margin-bottom: 12px; }
    .socials { display: flex; gap: 12px; justify-content: center; }
    .socials span { width: 36px; height: 36px; border-radius: 999px; background: #fff; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgb(0 0 0/.1); }`)
  );
}

/* ---------- patterns/post-hero ---------- */
{
  const [ga, gb] = CATEGORY_GRADIENTS.Blue;
  const body = `
  <p class="sub">포스트 상세 히어로 (components/BlogPost.tsx) — 카테고리 그라디언트 + 다크 오버레이</p>
  <div class="hero" style="background:linear-gradient(135deg,${ga},${gb})">
    <div class="scrim"></div>
    <div class="inner">
      <div class="meta">
        <span class="chip">Tech</span>
        <span>읽는데 5분</span><span>•</span><span>2026-07-23</span>
      </div>
      <div class="title">Next.js 블로그를 서버 컴포넌트로 전환하기</div>
    </div>
  </div>
  <div class="below">
    <div class="tags"><span>#Next.js</span><span>#ISR</span><span>#SEO</span></div>
    <blockquote>인용구는 오렌지 보더 + orange-50 배경으로 렌더링됩니다.</blockquote>
  </div>`;

  out(
    "patterns/post-hero.html",
    page("Patterns", "Post hero · Article", body, `
    .hero { position: relative; height: 200px; border-radius: 16px; overflow: hidden; }
    .scrim { position: absolute; inset: 0; background: linear-gradient(to top, rgb(0 0 0/.6), rgb(0 0 0/.2), transparent); }
    .inner { position: absolute; left: 24px; right: 24px; bottom: 20px; color: #fff; }
    .meta { display: flex; gap: 10px; align-items: center; font-size: 12px; color: rgba(255,255,255,.9); margin-bottom: 8px; }
    .chip { padding: 4px 12px; border-radius: 999px; background: rgba(255,255,255,.9); color: ${GRAY.g800}; }
    .title { font-size: 26px; font-weight: 700; }
    .below { padding: 20px 4px; }
    .tags { display: flex; gap: 8px; padding-bottom: 16px; border-bottom: 1px solid ${GRAY.g200}; margin-bottom: 16px; }
    .tags span { padding: 6px 14px; border-radius: 999px; font-size: 13px; background: ${BRAND.orange50}; color: ${BRAND.orange600}; }
    blockquote { border-left: 4px solid ${BRAND.orange400}; background: ${BRAND.orange50}; padding: 12px 16px; border-radius: 0 8px 8px 0; font-style: italic; font-size: 13px; color: ${GRAY.g800}; }`)
  );
}

/* ---------- patterns/about-journey ---------- */
{
  const body = `
  <p class="sub">About Me 페이지 패턴 (시안 B 채택) — 컴팩트 히어로 + 여정 타임라인 + 도구 칩</p>
  <div class="hero-row">
    <div class="ava">JS</div>
    <div>
      <div class="name">최준서 <span class="gtext">— 긍정을 전파하는 개발자</span></div>
      <div class="tag">다양한 분야의 팀원들과 함께 만드는 과정을 좋아합니다</div>
    </div>
  </div>
  <div class="section">여정 타임라인</div>
  <div class="tl">
    <div class="tli"><b>2026</b><span>AI·SW마에스트로 17기 합격</span></div>
    <div class="tli"><b>2025.06 – 08</b><span>WINEQUEEN 출시</span></div>
    <div class="tli"><b>2025.06 ~</b><span>프로젝트 당번</span></div>
    <div class="tli"><b>2025 ~</b><span>기술 블로그 · 알고리즘 연재</span></div>
  </div>
  <div class="section">도구 칩 (% 바 제거)</div>
  <div class="chips"><span>React</span><span>TypeScript</span><span>Tailwind CSS</span><span>Next.js</span><span>HTML5</span></div>`;

  out(
    "patterns/about-journey.html",
    page("Patterns", "About · Journey", body, `
    .hero-row { display: flex; align-items: center; gap: 14px; margin-bottom: 6px; }
    .ava { width: 56px; height: 56px; border-radius: 999px; background: linear-gradient(135deg, ${BRAND.orange300}, ${BRAND.red400}); display: grid; place-items: center; color: #fff; font-weight: 800; font-size: 18px; box-shadow: 0 0 0 2px ${BRAND.orange200}; }
    .name { font-size: 17px; font-weight: 800; color: ${GRAY.g800}; }
    .gtext { background: linear-gradient(90deg, ${BRAND.orange600}, ${BRAND.red600}); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .tag { font-size: 12px; color: ${GRAY.g500}; }
    .tl { position: relative; padding-left: 22px; max-width: 420px; }
    .tl::before { content: ""; position: absolute; left: 6px; top: 4px; bottom: 4px; width: 2px; border-radius: 2px; background: linear-gradient(${BRAND.orange400}, ${BRAND.red400}); }
    .tli { position: relative; padding-bottom: 12px; }
    .tli::before { content: ""; position: absolute; left: -21px; top: 4px; width: 9px; height: 9px; border-radius: 999px; background: ${BRAND.orange500}; box-shadow: 0 0 0 3px ${BRAND.orange100}; }
    .tli b { display: block; font-size: 11px; color: ${BRAND.orange600}; }
    .tli span { font-size: 13px; font-weight: 600; color: ${GRAY.g800}; }
    .chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .chips span { background: #fff; border-radius: 10px; padding: 8px 14px; font-size: 13px; font-weight: 500; color: ${GRAY.g700}; box-shadow: 0 2px 6px -2px rgb(0 0 0/.15); }`)
  );
}

/* ---------- components/icons ---------- */
{
  const SET = [
    ["cpu", "Tech"],
    ["browser", "Frontend"],
    ["flow", "Algorithm"],
    ["server", "Backend"],
    ["rocket", "DevOps"],
    ["book", "BookReview"],
    ["sparkle", "기타"],
    ["grid", "All"],
    ["heart", "좋아요"],
    ["link", "공유"],
    ["chat", "댓글"],
    ["search", "검색"],
    ["instagram", "Instagram"],
    ["linkedin", "LinkedIn"],
    ["github", "GitHub"],
    ["inbox", "빈 상태"],
    ["folder", "Projects"],
    ["code", "Skills"],
    ["target", "팀워크"],
    ["bulb", "문제 해결"],
  ];
  const body = `
  <p class="sub">이모지를 대체한 커스텀 세트 (Issue #5 · 시안 B 채택) — 24px · 1.8px 스트로크 · currentColor 상속. 원본: lib/design/icons.js, 렌더러: components/icons.tsx</p>
  <div class="grid">${SET.map(
    ([k, label]) => `
    <figure class="cell">
      <span class="chip">${icon(k, 22)}</span>
      <figcaption><b>${label}</b><code>${k}</code></figcaption>
    </figure>`
  ).join("")}</div>`;

  out(
    "components/icons.html",
    page("Components", "Icons", body, `
    .grid { display: flex; flex-wrap: wrap; gap: 12px; }
    .cell { width: 78px; display: flex; flex-direction: column; align-items: center; gap: 6px; }
    .chip { width: 46px; height: 46px; border-radius: 999px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, ${BRAND.orange500}, ${BRAND.red500}); box-shadow: 0 4px 10px -4px rgb(249 115 22 / .55); }
    figcaption { text-align: center; }
    figcaption b { display: block; font-size: 10.5px; color: ${GRAY.g700}; font-weight: 600; }
    figcaption code { font-size: 9.5px; color: ${GRAY.g500}; font-family: ui-monospace, monospace; }`)
  );
}

console.log("done →", OUT);
