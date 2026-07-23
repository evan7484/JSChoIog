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

export async function queryDatabase(
  database_id: string,
  filter?: unknown,
  sorts?: unknown
) {
  const response = await fetch(
    `https://api.notion.com/v1/databases/${database_id}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filter, sorts }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Notion API error: ${response.status} ${response.statusText}\n${errorText}`
    );
  }

  return response.json();
}
