import { notion, notionApi } from "./client";
import type { BlogPost } from "./types";

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.results.map((page: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const props = page.properties as any;
      return {
        id: page.id,
        title: props.Title?.title?.[0]?.plain_text || "",
        category: props.Category?.select?.name || "",
        date: props.Date?.date?.start || "",
        excerpt: props.Excerpt?.rich_text?.[0]?.plain_text || "",
        content: props.Content?.rich_text?.[0]?.plain_text || "",
        readTime: props.ReadTime?.number || 0,
        tags:
          props.Tags?.multi_select?.map(
            (tag: Record<string, string>) => tag.name
          ) || [],
        color: props.Color?.select?.name || "from-blue-400 to-cyan-400",
        releasable: props.Published?.checkbox || false,
      };
    });
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

    return {
      id: page.id,
      title: props.Title?.title?.[0]?.plain_text || "",
      category: props.Category?.select?.name || "",
      date: props.Date?.date?.start || "",
      excerpt: props.Excerpt?.rich_text?.[0]?.plain_text || "",
      content: props.Content?.rich_text?.[0]?.plain_text || "",
      readTime: props.ReadTime?.number || 0,
      tags:
        props.Tags?.multi_select?.map(
          (tag: Record<string, string>) => tag.name
        ) || [],
      color: props.Color?.select?.name || "from-blue-400 to-cyan-400",
      releasable: props.Published?.checkbox || false,
    };
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    return null;
  }
}
