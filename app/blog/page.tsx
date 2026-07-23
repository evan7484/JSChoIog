import Blog from "@/components/Blog";
import { getBlogPosts } from "@/lib/notion/blog";

// 1시간마다 백그라운드 재생성 (ISR) — 방문마다 Notion을 호출하지 않는다
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <Blog posts={posts} />;
}
