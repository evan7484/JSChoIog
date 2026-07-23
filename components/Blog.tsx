"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { postPath } from "@/lib/site";
import type { BlogPost } from "@/lib/notion/types";
import { CATEGORY_ICONS, DEFAULT_CATEGORY_ICON } from "@/lib/design/tokens";
import Icon from "@/components/icons";

interface Category {
  name: string;
  count: number;
  icon: string;
}

interface BlogProps {
  posts: BlogPost[];
}

function getCategoryIcon(category: string): string {
  return (
    (CATEGORY_ICONS as Record<string, string>)[category] ||
    DEFAULT_CATEGORY_ICON
  );
}

export default function Blog({ posts }: BlogProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // 동적 카테고리 계산
  const uniqueCategories = Array.from(
    new Map(
      posts.map((post) => [post.category, { name: post.category, icon: "" }])
    ).values()
  );

  const allCategories: Category[] = [
    { name: "All", count: posts.length, icon: "grid" },
    ...uniqueCategories.map((cat) => ({
      ...cat,
      count: posts.filter((p) => p.category === cat.name).length,
      icon: getCategoryIcon(cat.name),
    })),
  ];

  const byCategory =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  // 제목·요약·태그·카테고리 클라이언트 검색 (카테고리 필터와 조합)
  const query = searchQuery.trim().toLowerCase();
  const filteredPosts = query
    ? byCategory.filter((post) =>
        [post.title, post.excerpt, post.category, ...post.tags]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
    : byCategory;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:sticky lg:top-28">
            <h3 className="mb-6 flex items-center gap-2">
              <Icon name="book" size={22} className="text-orange-500" />
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
                    <Icon
                      name={category.icon}
                      size={18}
                      className={
                        selectedCategory === category.name
                          ? ""
                          : "text-orange-500"
                      }
                    />
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

          {/* Search */}
          <div className="relative mb-8">
            <Icon
              name="search"
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="제목, 태그, 내용으로 검색…"
              aria-label="블로그 글 검색"
              className="w-full pl-11 pr-4 py-3 bg-white rounded-full shadow-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400 transition-shadow"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={postPath(post)}
                className="group relative block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all"
              >
                <article>
                  <div
                    className={`h-48 flex items-center justify-center relative overflow-hidden ${
                      post.cover ? "" : `bg-linear-to-br ${post.color}`
                    }`}
                  >
                    {post.cover && (
                      <Image
                        src={post.cover}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    {!post.cover && (
                      <Icon
                        name={getCategoryIcon(post.category)}
                        size={52}
                        className="text-white drop-shadow-md group-hover:scale-110 transition-transform relative z-10"
                      />
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm">
                        읽는데 {post.readTime}분
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
                </article>

                <div className="absolute inset-0 border-2 border-orange-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <Icon
                name="inbox"
                size={56}
                className="text-gray-400 mx-auto mb-4"
              />
              <p className="text-gray-500">
                {query
                  ? `"${searchQuery.trim()}" 검색 결과가 없습니다.`
                  : "해당 카테고리에 포스트가 없습니다."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
