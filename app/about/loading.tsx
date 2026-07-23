// /about 로딩 — 정적 페이지라 짧게 지나가므로 간단한 스피너
export default function AboutLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center justify-center">
      <div className="h-10 w-10 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin" />
      <p className="mt-4 text-gray-500">불러오는 중…</p>
    </div>
  );
}
