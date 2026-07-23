/**
 * 커스텀 아이콘 지오메트리 단일 소스 (Issue #5 — 이모지 대체, 시안 B 채택).
 *
 * 규격: 24×24 viewBox · 1.8px 스트로크 · 라운드 캡/조인 · currentColor 상속.
 * 값은 <svg> 내부에 들어갈 마크업 문자열이다. 채움이 필요한 점은
 * fill="currentColor" stroke="none"을 인라인으로 지정한다.
 *
 * 소비처:
 * - 앱: components/icons.tsx (React 렌더러)
 * - design-sync 생성기: .claude/skills/design-sync/generate.js
 */
const ICONS = {
  // 카테고리
  cpu: '<rect x="6.5" y="6.5" width="11" height="11" rx="2"/><rect x="10.2" y="10.2" width="3.6" height="3.6" rx="1"/><path d="M9 3v3.5M15 3v3.5M9 17.5V21M15 17.5V21M3 9h3.5M3 15h3.5M17.5 9H21M17.5 15H21"/>',
  browser: '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="M3 9.2h18"/><circle cx="5.9" cy="6.9" r=".95" fill="currentColor" stroke="none"/><circle cx="8.8" cy="6.9" r=".95" fill="currentColor" stroke="none"/>',
  flow: '<circle cx="6.5" cy="5.8" r="2.4"/><circle cx="17.5" cy="5.8" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M8.9 5.8h6.2M7.5 7.9l3.4 8M16.5 7.9l-3.4 8"/>',
  server: '<rect x="3.5" y="4" width="17" height="6.3" rx="1.8"/><rect x="3.5" y="13.7" width="17" height="6.3" rx="1.8"/><circle cx="7" cy="7.1" r="1" fill="currentColor" stroke="none"/><circle cx="7" cy="16.8" r="1" fill="currentColor" stroke="none"/><path d="M13.5 7.1h3.8M13.5 16.8h3.8"/>',
  rocket: '<path d="M12 2.8c3 1.9 4.4 5 4.4 8.3 0 1.5-.3 2.9-.85 4.2H8.45A10.8 10.8 0 0 1 7.6 11c0-3.2 1.4-6.4 4.4-8.2Z"/><circle cx="12" cy="9.3" r="1.7"/><path d="M8.6 14.6 6.2 18.6l3.1-.8M15.4 14.6l2.4 4-3.1-.8M12 18.2v2.8"/>',
  book: '<path d="M18.8 21H7a2.6 2.6 0 0 1-2.6-2.6V5.4A2.4 2.4 0 0 1 6.8 3h12v14.6"/><path d="M4.4 18.4A2.6 2.6 0 0 1 7 15.8h11.8"/>',
  sparkle: '<path d="M11 4.6l1.8 4.5 4.5 1.8-4.5 1.8L11 17.2l-1.8-4.5-4.5-1.8 4.5-1.8Z"/><path d="M18.6 15.4v4M16.6 17.4h4"/>',
  grid: '<rect x="3.6" y="3.6" width="7.2" height="7.2" rx="1.8"/><rect x="13.2" y="3.6" width="7.2" height="7.2" rx="1.8"/><rect x="3.6" y="13.2" width="7.2" height="7.2" rx="1.8"/><rect x="13.2" y="13.2" width="7.2" height="7.2" rx="1.8"/>',
  // 액션
  heart: '<path d="M12 20s-7.5-4.7-7.5-10a4.3 4.3 0 0 1 7.5-2.8A4.3 4.3 0 0 1 19.5 10c0 5.3-7.5 10-7.5 10Z"/>',
  link: '<path d="M9.5 14.5l5-5"/><path d="M11.2 17l-2.1 2.1a3.6 3.6 0 0 1-5.1-5.1L6.1 11.9"/><path d="M12.8 7l2.1-2.1a3.6 3.6 0 0 1 5.1 5.1L17.9 12.1"/>',
  // 소셜
  instagram: '<rect x="4" y="4" width="16" height="16" rx="4.6"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r="1.05" fill="currentColor" stroke="none"/>',
  linkedin: '<rect x="3.6" y="3.6" width="16.8" height="16.8" rx="3.4"/><path d="M8 11v5.6"/><circle cx="8" cy="7.9" r="1.05" fill="currentColor" stroke="none"/><path d="M11.7 16.6v-3.4a2.5 2.5 0 0 1 5 0v3.4"/>',
  github: '<path d="M9.4 20.6c-4.9-1.4-6.2-5.9-4.6-9.5-.8-2 .2-3.6.2-3.6s1.4-.3 3.4 1.2a10.4 10.4 0 0 1 7.2 0c2-1.5 3.4-1.2 3.4-1.2s1 1.6.2 3.6c1.6 3.6.3 8.1-4.6 9.5"/><path d="M9.4 20.6v-2.5c0-.9.3-1.5.8-1.9"/><path d="M14.6 20.6v-2.5c0-.9-.3-1.5-.8-1.9"/>',
  chat: '<path d="M20 14.5a2 2 0 0 1-2 2H8.2L4 20V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z"/><path d="M8.5 9.3h7M8.5 12.3h4.5"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/>',
  // 섹션·상태
  inbox: '<path d="M4 13.2 6.7 6.3a2 2 0 0 1 1.9-1.3h6.8a2 2 0 0 1 1.9 1.3l2.7 6.9v4.3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M4 13.2h4.6l1 2h4.8l1-2H20"/>',
  folder: '<path d="M3.6 6.6a2 2 0 0 1 2-2h3.9l2 2.5h6.9a2 2 0 0 1 2 2v8.3a2 2 0 0 1-2 2H5.6a2 2 0 0 1-2-2Z"/>',
  code: '<path d="M8.5 8 4.5 12l4 4M15.5 8l4 4-4 4"/>',
  // 히어로 칩
  target: '<circle cx="12" cy="12" r="7.6"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none"/>',
  bulb: '<path d="M12 3.4a5.6 5.6 0 0 1 3.1 10.3c-.6.4-1.1 1-1.1 1.8v.2h-4v-.2c0-.8-.5-1.4-1.1-1.8A5.6 5.6 0 0 1 12 3.4Z"/><path d="M9.6 18.6h4.8M10.6 21.2h2.8"/>',
};

module.exports = { ICONS };
