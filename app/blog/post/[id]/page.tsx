import { cache } from "react";
import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import BlogPost from "@/components/BlogPost";
import JsonLd from "@/components/JsonLd";
import {
  getBlogPostById,
  getBlogPostBySlug,
  getBlogPosts,
} from "@/lib/notion/blog";
import { SITE_URL, UUID_RE, postPath } from "@/lib/site";
import { postDescription } from "@/lib/text";

// Notion 커버 이미지 URL 만료(약 1시간)보다 짧게
export const revalidate = 1800;

// URL 파라미터는 UUID(구 URL) 또는 슬러그 — generateMetadata와 렌더링이 공유
const resolvePost = cache(async (param: string) =>
  UUID_RE.test(param) ? getBlogPostById(param) : getBlogPostBySlug(param)
);
const getPosts = cache(getBlogPosts);

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await resolvePost(id);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const description = postDescription(post);

  return {
    title: post.title,
    description,
    alternates: { canonical: postPath(post) },
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
  const post = await resolvePost(id);

  if (!post) {
    notFound();
  }

  // 슬러그가 생긴 글의 구 UUID URL은 301로 슬러그 URL에 정착 (기존 색인 보존)
  if (UUID_RE.test(id) && post.slug) {
    permanentRedirect(postPath(post));
  }

  // 이전/다음 글 (목록은 날짜 내림차순)
  const posts = await getPosts();
  const idx = posts.findIndex((p) => p.id === post.id);
  const newerPost = idx > 0 ? posts[idx - 1] : null;
  const olderPost = idx >= 0 && idx < posts.length - 1 ? posts[idx + 1] : null;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: postDescription(post),
          datePublished: post.date,
          author: {
            "@type": "Person",
            name: "최준서",
            url: `${SITE_URL}/about`,
          },
          mainEntityOfPage: `${SITE_URL}${postPath(post)}`,
          ...(post.cover && { image: post.cover }),
          keywords: post.tags.join(", "),
          articleSection: post.category,
          inLanguage: "ko",
        }}
      />
      <BlogPost post={post} newerPost={newerPost} olderPost={olderPost} />
    </>
  );
}
