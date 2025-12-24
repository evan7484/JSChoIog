"use client";

import { useEffect, useState } from "react";
import Blog from "@/components/Blog";
import { useRouter } from "next/navigation";
import { useBlogStore } from "@/stores/blogStore";

export default function BlogPage() {
  const router = useRouter();
  const { posts, isLoaded, setPosts } = useBlogStore();
  const [isLoading, setIsLoading] = useState(!isLoaded);

  useEffect(() => {
    if (isLoaded) return;

    (async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) return;
        const data = await res.json();
        setPosts(data);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isLoaded, setPosts]);

  return (
    <Blog
      posts={posts}
      isLoading={isLoading}
      onPostClick={(id) => router.push(`/blog/post/${id}`)}
    />
  );
}
