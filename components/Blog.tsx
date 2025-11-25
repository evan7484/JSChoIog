import { useState } from "react";

const categories = [
  { name: "All", count: 15, icon: "📚" },
  { name: "Tech", count: 5, icon: "💻" },
  { name: "Frontend", count: 6, icon: "🎨" },
  { name: "Algorithm", count: 4, icon: "🧮" },
];

const posts = [
  {
    id: 1,
    title: "안녕하세요 반가워요 이건 기술블로그",
    category: "Tech",
    date: "2025.11.15",
    excerpt:
      "React와 TypeScript를 활용한 현대적인 웹 개발에 대한 이야기를 시작합니다...",
    readTime: "5분",
    tags: ["React", "TypeScript", "Web Development"],
    color: "from-blue-400 to-cyan-400",
  },
  {
    id: 2,
    title: "Tailwind CSS로 디자인 시스템 구축하기",
    category: "Frontend",
    date: "2025.11.10",
    excerpt:
      "유틸리티 퍼스트 CSS 프레임워크를 활용한 효율적인 스타일링 방법론...",
    readTime: "7분",
    tags: ["Tailwind", "CSS", "Design System"],
    color: "from-purple-400 to-pink-400",
  },
  {
    id: 3,
    title: "동적 프로그래밍 완벽 가이드",
    category: "Algorithm",
    date: "2025.11.05",
    excerpt: "DP 알고리즘의 핵심 개념과 실전 문제 풀이 전략을 소개합니다...",
    readTime: "10분",
    tags: ["Algorithm", "DP", "Problem Solving"],
    color: "from-green-400 to-emerald-400",
  },
  {
    id: 4,
    title: "Next.js 14의 새로운 기능들",
    category: "Tech",
    date: "2025.11.01",
    excerpt:
      "Server Actions와 App Router의 최신 기능을 깊이 있게 탐구합니다...",
    readTime: "8분",
    tags: ["Next.js", "React", "Server Components"],
    color: "from-orange-400 to-red-400",
  },
  {
    id: 5,
    title: "반응형 웹 디자인 베스트 프랙티스",
    category: "Frontend",
    date: "2025.10.28",
    excerpt: "모바일부터 데스크톱까지, 모든 디바이스에서 완벽한 UX 제공하기...",
    readTime: "6분",
    tags: ["Responsive", "UX", "CSS"],
    color: "from-yellow-400 to-orange-400",
  },
  {
    id: 6,
    title: "그래프 알고리즘 마스터하기",
    category: "Algorithm",
    date: "2025.10.25",
    excerpt: "BFS, DFS부터 최단경로 알고리즘까지 완벽 정리...",
    readTime: "12분",
    tags: ["Graph", "Algorithm", "Data Structure"],
    color: "from-indigo-400 to-purple-400",
  },
];

interface BlogProps {
  onPostClick: (postId: number) => void;
}

export default function Blog({ onPostClick }: BlogProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <h3 className="mb-6 flex items-center gap-2">
              <span className="text-2xl">📖</span>
              <span>Categories</span>
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 ${
                    selectedCategory === category.name
                      ? "bg-linear-to-r from-orange-400 to-red-400 text-white shadow-lg"
                      : "bg-gray-50 text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full ${
                      selectedCategory === category.name
                        ? "bg-white/20"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="mb-2">
              {selectedCategory === "All" ? "모든 글" : selectedCategory}
            </h2>
            <p className="text-gray-600">
              총 {filteredPosts.length}개의 포스트
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer"
                onClick={() => {
                  onPostClick(post.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <div
                  className={`h-48 bg-linear-to-br ${post.color} flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <span className="text-6xl group-hover:scale-110 transition-transform relative z-10">
                    {categories.find((c) => c.name === post.category)?.icon}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-gray-500">{post.readTime}</span>
                  </div>

                  <h4 className="mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">{post.date}</span>
                    <span className="text-orange-600 group-hover:gap-2 flex items-center gap-1 transition-all">
                      <span>더 보기</span>
                      <span>→</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 border-2 border-orange-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">📭</span>
              <p className="text-gray-500">
                해당 카테고리에 포스트가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
