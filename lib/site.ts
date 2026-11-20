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

// Notion 페이지 멘션 링크 — 통합이 내려주는 형태(ID만 있는 주소)만 잡는다.
// 사람이 붙여 넣은 공개 Notion 링크는 주소에 제목이 섞여 있어 여기 걸리지 않는다
const NOTION_MENTION_RE =
  /\[([^\]\n]*)\]\(https:\/\/(?:app\.notion\.com\/p|www\.notion\.so)\/([0-9a-f]{32})\)/gi;

// 본문의 Notion 페이지 멘션을 독자가 열 수 있는 형태로 바꾼다.
// 대상이 공개된 글이면 그 글로 잇고, 아니면(비공개 Notion 페이지) 링크를 떼고 제목만 남긴다
export function rewriteNotionMentions(
  markdown: string,
  posts: { id: string; slug?: string }[]
): string {
  const paths = new Map(
    posts.map((p) => [p.id.replace(/-/g, "").toLowerCase(), postPath(p)])
  );
  // 코드 펜스 안은 건드리지 않는다
  return markdown
    .split(/(```[\s\S]*?```)/)
    .map((part, i) =>
      i % 2 === 1
        ? part
        : part.replace(NOTION_MENTION_RE, (_, text: string, id: string) => {
            const path = paths.get(id.toLowerCase());
            return path ? `[${text}](${path})` : text;
          })
    )
    .join("");
}
