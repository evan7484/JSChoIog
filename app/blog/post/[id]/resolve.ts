import { cache } from "react";
import {
  getBlogPostMeta,
  getBlogPostMetaBySlug,
  getBlogPosts,
  getPageContent,
} from "@/lib/notion/blog";
import type { BlogPost } from "@/lib/notion/types";
import { UUID_RE } from "@/lib/site";

// layout·generateMetadata·page가 같은 요청 안에서 공유하는 캐시 —
// 한 모듈에 두어야 React cache()가 중복 Notion 호출을 합쳐준다

// URL 파라미터는 UUID(구 URL) 또는 슬러그
export const resolvePost = cache(async (param: string) =>
  UUID_RE.test(param) ? getBlogPostMeta(param) : getBlogPostMetaBySlug(param)
);

export const resolveContent = cache(async (post: BlogPost) =>
  getPageContent(post.id, post.excerpt)
);

export const getPosts = cache(getBlogPosts);
