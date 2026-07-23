// 마크다운을 평문으로 변환 (검색 스니펫·meta description 생성용)
export function markdownToPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ") // 코드 블록
    .replace(/`[^`]*`/g, " ") // 인라인 코드
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // 이미지
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // 링크 → 텍스트만
    .replace(/<[^>]+>/g, " ") // HTML 태그
    .replace(/^#{1,6}\s+/gm, "") // 헤딩 마커
    .replace(/^[-*+]\s+/gm, "") // 리스트 마커
    .replace(/^>\s*/gm, "") // 인용 마커
    .replace(/[*_~]{1,3}/g, "") // 강조
    .replace(/\|/g, " ") // 표 구분자
    .replace(/\s+/g, " ")
    .trim();
}

// 검색 결과에 나갈 글 설명 — 작성한 excerpt가 충분하면 그대로,
// 없거나 너무 짧으면("독후감", "내 썰" 등) 본문 앞부분을 미리보기로 사용
export function postDescription(post: {
  title: string;
  excerpt: string;
  content?: string;
}): string {
  const excerpt = post.excerpt.trim();
  if (excerpt.length >= 20) return excerpt;

  const plain = markdownToPlainText(post.content || "");
  if (!plain) return excerpt || post.title;

  return plain.length > 155 ? plain.slice(0, 155).trimEnd() + "…" : plain;
}
