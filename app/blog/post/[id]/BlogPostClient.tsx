"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BlogPost from "@/components/BlogPost";
import type { BlogPost as BlogPostType } from "@/lib/notion/types";
import { useBlogStore } from "@/stores/blogStore";

interface BlogPostClientProps {
  id: string;
}

export default function BlogPostClient({ id }: BlogPostClientProps) {
  const router = useRouter();

  const { posts, getPostById, upsertPost } = useBlogStore();
  const cached = useMemo(
    () => (id ? getPostById(id) : undefined),
    [id, getPostById],
  );

  const [post, setPost] = useState<BlogPostType | null>(cached ?? null);
  const [isLoading, setIsLoading] = useState(!cached);

  useEffect(() => {
    if (!id) return;

    // ✅ 1) 캐시에 있으면 즉시 사용 (추가 fetch 없음)
    const fromCache = getPostById(id);
    if (fromCache) {
      setPost(fromCache);
      setIsLoading(false);

      // content가 필요하고 아직 없으면 단건만 보강 fetch (선택)
      if (fromCache.content) return;
    }

    // ✅ 2) 없거나(content 보강 필요)하면 단건 fetch
    (async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) return;
        const data: BlogPostType = await res.json();
        upsertPost(data);
        setPost(data);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id, getPostById, upsertPost]);

  return (
    <BlogPost
      postId={id}
      post={post} // ✅ 단건 전달
      allPosts={posts} // ✅ (원하면) prev/next, 목록용으로 사용 가능 (추가 fetch 없음)
      isLoading={isLoading}
      onBack={() => router.push("/blog")}
    />
  );
}
