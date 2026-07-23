import { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "@/components/BlogPost";
import { getBlogPostById } from "@/lib/notion/blog";

// Notion 커버 이미지 URL 만료(약 1시간)보다 짧게
export const revalidate = 1800;

// generateMetadata와 페이지 렌더링이 같은 요청을 공유하도록 캐싱
const getPost = cache(getBlogPostById);

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const description = post.excerpt || post.title;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      ...(post.cover && { images: [{ url: post.cover }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      ...(post.cover && { images: [post.cover] }),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}
