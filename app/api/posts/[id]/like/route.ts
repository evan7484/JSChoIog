import { notion } from "@/lib/notion/client";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return Response.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    // 1. 현재 포스트 정보 가져오기
    const page = await notion.pages.retrieve({ page_id: id });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props = (page as any).properties;
    const currentLikes = props.Likes?.number || 0;

    // 2. 좋아요 수 증가
    await notion.pages.update({
      page_id: id,
      properties: {
        Likes: {
          number: currentLikes + 1,
        },
      },
    });

    console.log(`Post ${id} likes updated: ${currentLikes} -> ${currentLikes + 1}`);

    return Response.json({
      success: true,
      likes: currentLikes + 1,
    });
  } catch (error) {
    console.error("Error updating likes:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return Response.json(
      { error: "Failed to update likes", details: errorMessage },
      { status: 500 }
    );
  }
}
