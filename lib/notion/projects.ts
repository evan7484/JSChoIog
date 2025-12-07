import { notionApi } from "./client";
import type { Project } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getProjects(): Promise<Project[]> {
  try {
    if (!process.env.NOTION_PROJECTS_DATABASE_ID) {
      throw new Error("NOTION_PROJECTS_DATABASE_ID is not set");
    }

    const response = await notionApi.queryDatabase(
      process.env.NOTION_PROJECTS_DATABASE_ID,
      undefined,
      [
        {
          property: "order",
          direction: "ascending",
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
        period: props.period?.rich_text?.[0]?.plain_text || "",
        description: props.description?.rich_text?.[0]?.plain_text || "",
        tags:
          props.tags?.multi_select?.map(
            (tag: Record<string, string>) => tag.name
          ) || [],
        color: props.color?.select?.name || "from-blue-400 to-cyan-400",
        icon: props.icon?.rich_text?.[0]?.plain_text || "📋",
        details: {
          overview: props.overview?.rich_text?.[0]?.plain_text || "",
          features:
            props.features?.rich_text?.[0]?.plain_text?.split("\n") || [],
          tech: props.tech?.rich_text?.[0]?.plain_text || "",
          role: props.role?.rich_text?.[0]?.plain_text || "",
          outcome: props.outcome?.rich_text?.[0]?.plain_text || "",
        },
      };
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw error;
  }
}
