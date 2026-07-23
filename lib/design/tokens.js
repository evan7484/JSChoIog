/**
 * 디자인 토큰 단일 소스.
 *
 * 소비처:
 * - 앱: lib/notion/colors.ts (카테고리 그라디언트), components/Blog.tsx (아이콘)
 * - design-sync 생성기: .claude/skills/design-sync/generate.js 가 직접 require
 *
 * CJS인 이유: Node 생성기가 빌드 없이 require()로 읽어야 해서.
 * Tailwind가 gradientClass 문자열을 스캔할 수 있도록 클래스명은 여기에 온전히 적는다.
 */

// Tailwind 팔레트 중 실제 사용하는 스텝 (hex는 카드 렌더링용 사본)
const BRAND = {
  orange50: "#fff7ed",
  orange100: "#ffedd5",
  orange200: "#fed7aa",
  orange300: "#fdba74",
  orange400: "#fb923c",
  orange500: "#f97316",
  orange600: "#ea580c",
  orange700: "#c2410c",
  red400: "#f87171",
  red500: "#ef4444",
  red600: "#dc2626",
  amber50: "#fffbeb",
  amber100: "#fef3c7",
  amber400: "#fbbf24",
  yellow50: "#fefce8",
  green600: "#16a34a",
};

const GRAY = {
  g50: "#f9fafb",
  g100: "#f3f4f6",
  g200: "#e5e7eb",
  g400: "#9ca3af",
  g500: "#6b7280",
  g600: "#4b5563",
  g700: "#374151",
  g800: "#1f2937",
  g900: "#111827",
};

// Notion Color select 값 → 그라디언트 (앱은 gradientClass, 생성기는 hex 사용)
const CATEGORY_COLORS = {
  Blue: { gradientClass: "from-blue-400 to-cyan-400", hex: ["#60a5fa", "#22d3ee"] },
  Green: { gradientClass: "from-green-400 to-emerald-400", hex: ["#4ade80", "#34d399"] },
  Red: { gradientClass: "from-red-400 to-pink-400", hex: ["#f87171", "#f472b6"] },
  Orange: { gradientClass: "from-orange-400 to-amber-400", hex: ["#fb923c", "#fbbf24"] },
  Purple: { gradientClass: "from-purple-400 to-violet-400", hex: ["#c084fc", "#a78bfa"] },
  Pink: { gradientClass: "from-pink-400 to-rose-400", hex: ["#f472b6", "#fb7185"] },
  Yellow: { gradientClass: "from-yellow-400 to-orange-400", hex: ["#facc15", "#fb923c"] },
  Gray: { gradientClass: "from-gray-400 to-slate-400", hex: ["#9ca3af", "#94a3b8"] },
};
const DEFAULT_CATEGORY = "Blue";

// 블로그 카테고리 → 커스텀 아이콘 키 (지오메트리는 lib/design/icons.js)
const CATEGORY_ICONS = {
  Tech: "cpu",
  Frontend: "browser",
  Algorithm: "flow",
  Backend: "server",
  DevOps: "rocket",
  BookReview: "book",
};
const DEFAULT_CATEGORY_ICON = "sparkle";

module.exports = {
  BRAND,
  GRAY,
  CATEGORY_COLORS,
  DEFAULT_CATEGORY,
  CATEGORY_ICONS,
  DEFAULT_CATEGORY_ICON,
};
