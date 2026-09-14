import { Metadata } from "next";
import Blog from "@/components/Blog";
import { getBlogPosts } from "@/lib/notion/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "웹 개발, 알고리즘, 회고를 기록하는 JSChoIog의 블로그 글 목록입니다.",
  alternates: { canonical: "/blog" },
};

// 30분마다 백그라운드 재생성 (ISR) — Notion 커버 이미지 URL 만료(약 1시간)보다
// 짧게 유지해 깨진 이미지를 방지한다
export const revalidate = 1800;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <Blog posts={posts} />;
}
