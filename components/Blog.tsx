"use client";

import { useState } from "react";
import type { BlogPost } from "@/lib/notion/types";

interface Category {
  name: string;
  count: number;
  icon: string;
}

interface BlogProps {
  onPostClick: (postId: string) => void;
  posts: BlogPost[];
  isLoading: boolean;
}

export default function Blog({ onPostClick, posts, isLoading }: BlogProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 동적 카테고리 계산
  const uniqueCategories = Array.from(
    new Map(
      posts.map((post) => [post.category, { name: post.category, icon: "📚" }])
    ).values()
  );

  const allCategories: Category[] = [
    { name: "All", count: posts.length, icon: "📚" },
    ...uniqueCategories.map((cat) => ({
      ...cat,
      count: posts.filter((p) => p.category === cat.name).length,
      icon: getCategoryIcon(cat.name),
    })),
  ];

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  function getCategoryIcon(category: string): string {
    const iconMap: Record<string, string> = {
      Tech: "💻",
      Frontend: "🎨",
      Algorithm: "🧮",
      Backend: "⚙️",
      DevOps: "🚀",
    };
    return iconMap[category] || "📚";
  }

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
              {allCategories.map((category) => (
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
                  data-color={post.color}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <span className="text-6xl group-hover:scale-110 transition-transform relative z-10">
                    {getCategoryIcon(post.category)}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {post.readTime}분
                    </span>
                  </div>

                  <h4 className="mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">{post.date}</span>
                    <span className="text-orange-600 group-hover:gap-2 flex items-center gap-1 transition-all">
                      <span>더 보기</span>
                      <span>→</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm"
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

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="h-10 w-10 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin" />
              <p className="mt-4 text-gray-500">불러오는 중…</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">📭</span>
              <p className="text-gray-500">
                해당 카테고리에 포스트가 없습니다.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
