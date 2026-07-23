import { queryDatabase, n2m } from "./client";
import { getColorGradient } from "./colors";
import type { Project } from "./types";

export async function getProjects(): Promise<Project[]> {
  if (!process.env.NOTION_PROJECTS_DATABASE_ID) {
    throw new Error("NOTION_PROJECTS_DATABASE_ID is not set");
  }

  const response = await queryDatabase(process.env.NOTION_PROJECTS_DATABASE_ID);

  const projects = await Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response.results.map(async (page: any) => {
      const props = page.properties;

      // 페이지의 블록 내용을 마크다운으로 변환 (모달에서 사용)
      let content = "";
      try {
        const mdblocks = await n2m.pageToMarkdown(page.id);
        content = n2m.toMarkdownString(mdblocks).parent;
      } catch (error) {
        console.error(`Failed to fetch blocks for project ${page.id}:`, error);
      }

      return {
        id: page.id,
        title: props.Title?.title?.[0]?.plain_text || "",
        period: props.Period?.rich_text?.[0]?.plain_text || "",
        description: props.Description?.rich_text?.[0]?.plain_text || "",
        tags:
          props.Tags?.multi_select?.map((tag: { name: string }) => tag.name) ||
          [],
        color: getColorGradient(props.Color?.select?.name || "Blue"),
        icon: props.Icon?.rich_text?.[0]?.plain_text || "📋",
        content,
      };
    })
  );

  return projects;
}
