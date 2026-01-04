import { getBlogPostById } from "@/lib/notion/blog";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return Response.json({ error: "Post ID is required" }, { status: 400 });
    }

    console.log("Fetching blog post with ID:", id);
    const post = await getBlogPostById(id);

    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    console.log("Successfully fetched post:", post.title);
    return Response.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return Response.json(
      { error: "Failed to fetch post", details: errorMessage },
      { status: 500 }
    );
  }
}
