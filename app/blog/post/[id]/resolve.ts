import { cache } from "react";
import {
  getBlogPostMeta,
  getBlogPostMetaBySlug,
  getBlogPosts,
} from "@/lib/notion/blog";
import { pageToMarkdown } from "@/lib/notion/client";
import type { BlogPost } from "@/lib/notion/types";
import { UUID_RE } from "@/lib/site";

// layout·generateMetadata·page가 같은 요청 안에서 공유하는 캐시 —
// 한 모듈에 두어야 React cache()가 중복 Notion 호출을 합쳐준다

// URL 파라미터는 UUID(구 URL) 또는 슬러그
export const resolvePost = cache(async (param: string) =>
  UUID_RE.test(param) ? getBlogPostMeta(param) : getBlogPostMetaBySlug(param)
);

// 실패를 excerpt로 대체하지 않는다 — 빌드가 본문 없는 글을 조용히 배포하던 원인.
// ISR 재생성 중 실패면 Next가 직전 페이지를 계속 서빙한다
export const resolveContent = cache(async (post: BlogPost) =>
  pageToMarkdown(post.id)
);

export const getPosts = cache(getBlogPosts);
