import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const apiKey = process.env.NOTION_API_KEY;
if (!apiKey) {
  throw new Error("NOTION_API_KEY environment variable is not set");
}

export const notion = new Client({
  auth: apiKey,
});

export const n2m = new NotionToMarkdown({ notionClient: notion });

export const notionApi = {
  async queryDatabase(database_id: string, filter?: unknown, sorts?: unknown) {
    const payload = {
      filter,
      sorts,
    };

    console.log(
      "[Notion API] Query payload:",
      JSON.stringify(payload, null, 2)
    );

    const response = await fetch(
      "https://api.notion.com/v1/databases/" + database_id + "/query",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Notion API] Error response:", errorText);
      throw new Error(
        `Notion API error: ${response.status} ${response.statusText}\n${errorText}`
      );
    }

    return response.json();
  },

  async getPageBlocks(page_id: string) {
    const response = await fetch(
      `https://api.notion.com/v1/blocks/${page_id}/children`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Notion-Version": "2022-06-28",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Notion API] Error getting blocks:", errorText);
      throw new Error(
        `Notion API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.results;
  },

  blocksToHtml(blocks: any[]): string {
    return blocks
      .map((block: any) => {
        const type = block.type;

        switch (type) {
          case "paragraph":
            const text = block.paragraph?.rich_text?.[0]?.plain_text || "";
            return `<p>${text}</p>`;

          case "heading_1":
            const h1 = block.heading_1?.rich_text?.[0]?.plain_text || "";
            return `<h1>${h1}</h1>`;

          case "heading_2":
            const h2 = block.heading_2?.rich_text?.[0]?.plain_text || "";
            return `<h2>${h2}</h2>`;

          case "heading_3":
            const h3 = block.heading_3?.rich_text?.[0]?.plain_text || "";
            return `<h3>${h3}</h3>`;

          case "bulleted_list_item":
            const li =
              block.bulleted_list_item?.rich_text?.[0]?.plain_text || "";
            return `<li>${li}</li>`;

          case "numbered_list_item":
            const nli =
              block.numbered_list_item?.rich_text?.[0]?.plain_text || "";
            return `<li>${nli}</li>`;

          case "quote":
            const quote = block.quote?.rich_text?.[0]?.plain_text || "";
            return `<blockquote>${quote}</blockquote>`;

          case "code":
            const code = block.code?.rich_text?.[0]?.plain_text || "";
            return `<pre><code>${code}</code></pre>`;

          default:
            return "";
        }
      })
      .join("\n");
  },
};
