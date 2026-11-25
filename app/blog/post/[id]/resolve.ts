import { cache } from "react";
import {
  getBlogPostMeta,
  getBlogPostMetaBySlug,
  getBlogPosts,
  getPageContent,
} from "@/lib/notion/blog";
import type { BlogPost } from "@/lib/notion/types";
import { UUID_RE, rewriteNotionMentions } from "@/lib/site";

// layout·generateMetadata·page가 같은 요청 안에서 공유하는 캐시 —
// 한 모듈에 두어야 React cache()가 중복 Notion 호출을 합쳐준다

// URL 파라미터는 UUID(구 URL) 또는 슬러그
export const resolvePost = cache(async (param: string) =>
  UUID_RE.test(param) ? getBlogPostMeta(param) : getBlogPostMetaBySlug(param)
);

export const getPosts = cache(getBlogPosts);

export const resolveContent = cache(async (post: BlogPost) => {
  const content = await getPageContent(post.id, post.excerpt);
  // 멘션 링크 정리는 부가 기능 — 목록 조회가 실패해도 본문은 그대로 보여준다
  const posts = await getPosts().catch(() => []);
  return rewriteNotionMentions(content, posts);
});
