import { notion, notionApi, n2m } from "./client";
import type { BlogPost } from "./types";

function getColorGradient(color: string): string {
  const colorMap: Record<string, string> = {
    Blue: "from-blue-400 to-cyan-400",
    Green: "from-green-400 to-emerald-400",
    Red: "from-red-400 to-pink-400",
    Orange: "from-orange-400 to-amber-400",
    Purple: "from-purple-400 to-violet-400",
    Pink: "from-pink-400 to-rose-400",
    Yellow: "from-yellow-400 to-orange-400",
    Gray: "from-gray-400 to-slate-400",
  };
  return colorMap[color] || "from-blue-400 to-cyan-400";
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    if (!process.env.NOTION_POSTS_DATABASE_ID) {
      throw new Error("NOTION_POSTS_DATABASE_ID is not set");
    }

    const response = await notionApi.queryDatabase(
      process.env.NOTION_POSTS_DATABASE_ID,
      {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      [
        {
          property: "Date",
          direction: "descending",
        },
      ]
    );

    const posts = await Promise.all(
      response.results.map(async (page: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const props = page.properties as any;

        // 페이지의 블록 내용을 마크다운으로 변환
        let content = "";
        try {
          const mdblocks = await n2m.pageToMarkdown(page.id);
          content = n2m.toMarkdownString(mdblocks).parent;
        } catch (error) {
          console.error(`Failed to fetch blocks for page ${page.id}:`, error);
          // content 프로퍼티를 fallback으로 사용
          content = props.Content?.rich_text?.[0]?.plain_text || "";
        }

        const notionColor = props.Color?.select?.name || "Blue";

        return {
          id: page.id,
          title: props.Title?.title?.[0]?.plain_text || "",
          category: props.Category?.select?.name || "",
          date: props.Date?.date?.start || "",
          excerpt: props.Excerpt?.rich_text?.[0]?.plain_text || "",
          content,
          readTime: props.ReadTime?.number || 0,
          tags:
            props.Tags?.multi_select?.map(
              (tag: Record<string, string>) => tag.name
            ) || [],
          color: getColorGradient(notionColor),
          releasable: props.Published?.checkbox || false,
        };
      })
    );

    return posts;
  } catch (error) {
    console.error("❌ Failed to fetch blog posts");
    console.error(
      "Error:",
      error instanceof Error ? error.message : String(error)
    );
    throw error;
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props = (page as any).properties as any;

    // 페이지의 블록 내용을 마크다운으로 변환
    let content = "";
    try {
      const mdblocks = await n2m.pageToMarkdown(id);
      content = n2m.toMarkdownString(mdblocks).parent;
    } catch (error) {
      console.error(`Failed to fetch blocks for page ${id}:`, error);
      content = props.Content?.rich_text?.[0]?.plain_text || "";
    }

    const notionColor = props.Color?.select?.name || "Blue";

    return {
      id: page.id,
      title: props.Title?.title?.[0]?.plain_text || "",
      category: props.Category?.select?.name || "",
      date: props.Date?.date?.start || "",
      excerpt: props.Excerpt?.rich_text?.[0]?.plain_text || "",
      content,
      readTime: props.ReadTime?.number || 0,
      tags:
        props.Tags?.multi_select?.map(
          (tag: Record<string, string>) => tag.name
        ) || [],
      color: getColorGradient(notionColor),
      releasable: props.Published?.checkbox || false,
    };
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    return null;
  }
}
