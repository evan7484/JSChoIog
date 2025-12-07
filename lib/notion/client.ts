import { Client } from "@notionhq/client";

const apiKey = process.env.NOTION_API_KEY;
if (!apiKey) {
  throw new Error("NOTION_API_KEY environment variable is not set");
}

export const notion = new Client({
  auth: apiKey,
});

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
};
