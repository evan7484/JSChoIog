import { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/notion/blog";
import { SITE_URL, postPath } from "@/lib/site";

// 빌드 시점 캐시로 고정되지 않도록 1시간마다 재생성
// (슬러그 도입처럼 URL이 바뀌어도 재배포 없이 sitemap이 따라오게)
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  try {
    const posts = await getBlogPosts();

    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}${postPath(post)}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticPages, ...postEntries];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // 포스트 조회에 실패하면 정적 페이지만 반환
    return staticPages;
  }
}
