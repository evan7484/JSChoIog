import { notFound, permanentRedirect } from "next/navigation";
import { UUID_RE, postPath } from "@/lib/site";
import { resolvePost } from "./resolve";

// 상태 코드를 바꾸는 분기는 반드시 여기(레이아웃)에서 한다.
// page.tsx는 loading.tsx가 만드는 Suspense 경계 안에 있어서, 거기서 notFound()나
// permanentRedirect()를 호출하면 스켈레톤 셸이 200으로 먼저 flush된 뒤라
// 상태 코드를 못 바꾸고 소프트 404·메타 리프레시로 격하된다.
// 레이아웃은 그 경계 바깥이라 응답이 시작되기 전에 상태를 결정할 수 있다.
export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await resolvePost(id);

  if (!post) {
    notFound();
  }

  // 슬러그가 생긴 글의 구 UUID URL은 308로 슬러그 URL에 정착 (기존 색인 보존)
  if (UUID_RE.test(id) && post.slug) {
    permanentRedirect(postPath(post));
  }

  return <>{children}</>;
}
