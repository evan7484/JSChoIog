// 포스트 상세 로딩 스켈레톤 — 히어로 + 본문 라인
export default function PostLoading() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="h-80 bg-gray-200 mb-12 animate-pulse" />
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="flex gap-2 mb-12 pb-8 border-b border-gray-200">
          <div className="h-9 w-20 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-9 w-24 bg-gray-100 rounded-full animate-pulse" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-gray-100 rounded animate-pulse"
              style={{ width: `${[100, 92, 96, 70, 88, 100, 60, 84][i]}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
