import { notionApi, n2m } from "./client";
import type { Project } from "./types";

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

export async function getProjects(): Promise<Project[]> {
  try {
    if (!process.env.NOTION_PROJECTS_DATABASE_ID) {
      throw new Error("NOTION_PROJECTS_DATABASE_ID is not set");
    }

    const response = await notionApi.queryDatabase(
      process.env.NOTION_PROJECTS_DATABASE_ID,
      undefined,
      undefined
    );

    const projects = await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      response.results.map(async (page: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const props = page.properties as any;

        // 페이지의 블록 내용을 마크다운으로 변환
        let content = "";
        try {
          const mdblocks = await n2m.pageToMarkdown(page.id);
          content = n2m.toMarkdownString(mdblocks).parent;
        } catch (error) {
          console.error(
            `Failed to fetch blocks for project ${page.id}:`,
            error
          );
        }

        const notionColor = props.Color?.select?.name || "Blue";

        return {
          id: page.id,
          title: props.Title?.title?.[0]?.plain_text || "",
          period: props.Period?.rich_text?.[0]?.plain_text || "",
          description: props.Description?.rich_text?.[0]?.plain_text || "",
          tags:
            props.Tags?.multi_select?.map(
              (tag: Record<string, string>) => tag.name
            ) || [],
          color: getColorGradient(notionColor),
          icon: props.Icon?.rich_text?.[0]?.plain_text || "📋",
          content,
        };
      })
    );

    return projects;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw error;
  }
}
