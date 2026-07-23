// 사이트 절대 URL 단일 소스.
// 환경변수 값 끝에 슬래시가 있어도 URL이 "//"로 이어붙지 않도록 정규화한다
// (실서비스 sitemap이 https://…store//about 형태로 나가던 버그의 원인).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
).replace(/\/+$/, "");
