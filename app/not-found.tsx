import Link from "next/link";

// 전역 404 — 포스트 notFound() 및 없는 경로 접근 시
export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="text-7xl font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
        404
      </p>
      <h1 className="mt-4 mb-3 text-gray-900 dark:text-gray-50">
        페이지를 찾을 수 없어요
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 break-keep">
        주소가 바뀌었거나 삭제된 글일 수 있습니다. 목록에서 다시 찾아보세요.
      </p>
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-full hover:shadow-lg hover:scale-105 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
      >
        블로그 목록으로
      </Link>
    </div>
  );
}
