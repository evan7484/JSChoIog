import { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    // Fetch post data for metadata
    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/posts/${id}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      return {
        title: "Post Not Found",
      };
    }

    const post = await res.json();

    return {
      title: post.title,
      description: post.description || post.title,
      openGraph: {
        title: post.title,
        description: post.description || post.title,
        type: "article",
        publishedTime: post.date,
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description || post.title,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post",
    };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;

  return <BlogPostClient id={id} />;
}
