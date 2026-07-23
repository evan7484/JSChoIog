// 사이트 절대 URL 단일 소스.
// 환경변수 값 끝에 슬래시가 있어도 URL이 "//"로 이어붙지 않도록 정규화한다
// (실서비스 sitemap이 https://…store//about 형태로 나가던 버그의 원인).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
).replace(/\/+$/, "");

// 포스트 경로 단일 소스 — 슬러그가 있으면 슬러그, 없으면 UUID
export function postPath(post: { id: string; slug?: string }): string {
  return `/blog/post/${post.slug || post.id}`;
}

// Notion 페이지 ID 판별 (하이픈 유무 모두)
export const UUID_RE =
  /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
