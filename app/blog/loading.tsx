// /blog 로딩 스켈레톤 — 목록 그리드 형태를 미리 잡아 레이아웃 시프트 방지
export default function BlogLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-64 animate-pulse" />
        </aside>
        <div className="flex-1">
          <div className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8 animate-pulse" />
          <div className="h-12 w-full bg-white dark:bg-gray-800 rounded-full shadow-md mb-8 animate-pulse" />
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg animate-pulse"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 w-full bg-gray-100 dark:bg-gray-700/60 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
