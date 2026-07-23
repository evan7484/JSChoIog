import { ImageResponse } from "next/og";
import { getBlogPostMeta } from "@/lib/notion/blog";

export const revalidate = 1800;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 한글 렌더링용 폰트 — next/og 기본 폰트에는 한글 글리프가 없다
const FONT_URL =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.otf";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostMeta(id);
  const title = post?.title || "JSChoIog";
  const category = post?.category || "";

  let fonts:
    | { name: string; data: ArrayBuffer; weight: 700; style: "normal" }[]
    | undefined;
  try {
    const data = await fetch(FONT_URL, { cache: "force-cache" }).then((r) =>
      r.arrayBuffer()
    );
    fonts = [{ name: "Pretendard", data, weight: 700, style: "normal" }];
  } catch {
    fonts = undefined; // 폰트 로드 실패 시에도 이미지는 생성
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "linear-gradient(135deg, #f97316, #ef4444)",
          color: "#fff",
          fontFamily: "Pretendard",
        }}
      >
        {category && (
          <div
            style={{
              display: "flex",
              fontSize: 28,
              background: "rgba(255,255,255,.92)",
              color: "#1f2937",
              borderRadius: 999,
              padding: "8px 28px",
              marginBottom: 28,
              alignSelf: "flex-start",
            }}
          >
            {category}
          </div>
        )}
        <div
          style={{
            fontSize: title.length > 30 ? 54 : 66,
            fontWeight: 700,
            lineHeight: 1.25,
            wordBreak: "keep-all",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 30, opacity: 0.9 }}>
          JSChoIog
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
