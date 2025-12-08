import { getBlogPosts } from "@/lib/notion/blog";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    console.log("Fetching blog posts...");
    console.log("API Key:", process.env.NOTION_API_KEY ? "✓ Set" : "✗ Not set");
    console.log("Database ID:", process.env.NOTION_POSTS_DATABASE_ID);

    const posts = await getBlogPosts();
    console.log("Successfully fetched posts:", posts.length);
    return Response.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return Response.json(
      { error: "Failed to fetch posts", details: errorMessage },
      { status: 500 }
    );
  }
}
