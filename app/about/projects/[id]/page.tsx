"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BlogPost from "@/components/BlogPost";
import type { BlogPost as BlogPostType } from "@/lib/notion/types";
import { useBlogStore } from "@/stores/blogStore";

export default function BlogPostPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { posts, getPostById, upsertPost } = useBlogStore();

  const cached = useMemo(
    () => (id ? getPostById(id) : undefined),
    [id, getPostById]
  );

  const [post, setPost] = useState<BlogPostType | null>(cached ?? null);
  const [isLoading, setIsLoading] = useState(!cached);

  useEffect(() => {
    if (!id) return;

    const fromCache = getPostById(id);
    if (fromCache) {
      setPost(fromCache);
      setIsLoading(false);
      // content 없으면 단건만 보강 fetch(선택)
      if (fromCache.content) return;
    }

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
      post={post}
      allPosts={posts} // 목록/prev-next 용
      isLoading={isLoading}
      onBack={() => router.push("/blog")}
    />
  );
}
