"use client";

import { useEffect } from "react";

// 전역 에러 바운더리 — 렌더/데이터 오류 시 기본 Next 화면 대신 노출
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <span className="text-6xl mb-4 block">🌩️</span>
      <h1 className="mb-3 text-gray-900">문제가 발생했어요</h1>
      <p className="text-gray-600 mb-8 break-keep">
        페이지를 불러오는 중 오류가 났습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-full hover:shadow-lg hover:scale-105 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
      >
        다시 시도
      </button>
    </div>
  );
}
