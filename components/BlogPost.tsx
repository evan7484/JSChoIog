"use client";

import { motion } from "motion/react";
import { ArrowLeft, Check } from "lucide-react";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import type { BlogPost as BlogPostType } from "@/lib/notion/types";

type Props = {
  postId: string;
  post: BlogPostType | null;
  allPosts?: BlogPostType[]; // (옵션) 추후 prev/next 등에 쓰면 됨
  isLoading?: boolean;
  onBack: () => void;
};

export default function BlogPost({ post, isLoading, onBack }: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const [likes, setLikes] = useState(post?.likes || 0);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  // 컴포넌트 마운트 시 localStorage에서 좋아요 여부 확인
  useEffect(() => {
    if (post?.id) {
      const likedPosts = JSON.parse(
        localStorage.getItem("liked_posts") || "[]"
      );
      setHasLiked(likedPosts.includes(post.id));
      setLikes(post.likes || 0);
    }
  }, [post]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleLike = async () => {
    if (!post || isLiking) return;

    setIsLiking(true);
    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: hasLiked ? "DELETE" : "POST",
      });

      if (!response.ok) throw new Error("Failed to update like");

      const data = await response.json();
      setLikes(data.likes);
      setHasLiked(!hasLiked);

      // localStorage 업데이트
      const likedPosts = JSON.parse(
        localStorage.getItem("liked_posts") || "[]"
      );
      
      if (hasLiked) {
        // 좋아요 취소: 배열에서 제거
        const filtered = likedPosts.filter((id: string) => id !== post.id);
        localStorage.setItem("liked_posts", JSON.stringify(filtered));
      } else {
        // 좋아요: 배열에 추가
        likedPosts.push(post.id);
        localStorage.setItem("liked_posts", JSON.stringify(likedPosts));
      }
    } catch (err) {
      console.error("Failed to update like:", err);
    } finally {
      setIsLiking(false);
    }
  };

  // ✅ 1) 로딩 상태
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>목록으로 돌아가기</span>
          </motion.button>
        </div>

        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-10 w-10 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin" />
          <p className="mt-4 text-gray-500">포스트를 불러오는 중…</p>
        </div>
      </div>
    );
  }

  // ✅ 2) 없는 경우
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>목록으로 돌아가기</span>
          </motion.button>
        </div>
        <p className="text-gray-600">포스트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  // ✅ 3) 정상 렌더
  return (
    <div className="min-h-screen">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>목록으로 돌아가기</span>
        </motion.button>
      </div>

      {/* Hero */}
      <motion.div
        className={`relative h-80 bg-linear-to-br ${post.color} overflow-hidden mb-12`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full">
                {post.category}
              </span>
              <span className="text-white/90">읽는데 {post.readTime}분</span>
              <span className="text-white/90">•</span>
              <span className="text-white/90">{post.date}</span>
            </div>
            <h1 className="text-white mb-0 text-4xl md:text-5xl">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.article
        className="max-w-4xl mx-auto px-6 pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-gray-200">
          {post.tags.map((tag) => (
            <motion.span
              key={tag}
              className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full hover:bg-orange-100 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              #{tag}
            </motion.span>
          ))}
        </div>

        {/* Markdown */}
        <div className="max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ ...props }) => (
                <h1
                  className="text-4xl font-bold mt-8 mb-4 text-gray-900"
                  {...props}
                />
              ),
              h2: ({ ...props }) => (
                <h2
                  className="text-3xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200 text-gray-900"
                  {...props}
                />
              ),
              h3: ({ ...props }) => (
                <h3
                  className="text-2xl font-bold mt-6 mb-3 text-gray-800"
                  {...props}
                />
              ),
              p: ({ ...props }) => (
                <p className="text-gray-700 leading-relaxed mb-6" {...props} />
              ),
              ul: ({ ...props }) => (
                <ul
                  className="list-disc list-inside my-6 space-y-2 text-gray-700"
                  {...props}
                />
              ),
              ol: ({ ...props }) => (
                <ol
                  className="list-decimal list-inside my-6 space-y-2 text-gray-700"
                  {...props}
                />
              ),
              blockquote: ({ ...props }) => (
                <blockquote
                  className="border-l-4 border-orange-400 bg-orange-50 py-4 px-6 rounded-r-lg my-6 text-gray-800 italic"
                  {...props}
                />
              ),
              code: ({ inline, ...props }: any) =>
                inline ? (
                  <code
                    className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800"
                    {...props}
                  />
                ) : (
                  <code
                    className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm"
                    {...props}
                  />
                ),
              pre: ({ ...props }) => (
                <pre
                  className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6"
                  {...props}
                />
              ),
              a: ({ ...props }) => (
                <a
                  className="text-orange-500 hover:text-orange-600 underline"
                  {...props}
                />
              ),
              img: ({ ...props }) => (
                <img className="rounded-lg my-6 w-full" {...props} />
              ),
              hr: ({ ...props }) => (
                <hr className="my-8 border-gray-200" {...props} />
              ),
              table: ({ ...props }) => (
                <table className="w-full my-6 border-collapse" {...props} />
              ),
              thead: ({ ...props }) => (
                <thead className="bg-gray-50" {...props} />
              ),
              tbody: ({ ...props }) => (
                <tbody className="divide-y divide-gray-200" {...props} />
              ),
              tr: ({ ...props }) => (
                <tr className="border-b border-gray-200" {...props} />
              ),
              th: ({ ...props }) => (
                <th
                  className="px-4 py-2 text-left font-semibold text-gray-900"
                  {...props}
                />
              ),
              td: ({ ...props }) => (
                <td className="px-4 py-2 text-gray-700" {...props} />
              ),
            }}
          >
            {post.content ?? ""}
          </ReactMarkdown>
        </div>

        {/* Actions */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-gray-600">이 글이 도움이 되셨나요?</p>
            <div className="flex gap-3">
              <motion.button
                onClick={handleLike}
                disabled={isLiking}
                className={`px-6 py-2 rounded-full transition-colors ${
                  hasLiked
                    ? "bg-orange-200 text-orange-700 hover:bg-orange-300"
                    : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLiking
                  ? "👍 처리중..."
                  : hasLiked
                  ? `❤️ 좋아요 ${likes}`
                  : `👍 좋아요 ${likes}`}
              </motion.button>
              <motion.button
                onClick={handleShare}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 inline mr-1 text-green-600" />
                    <span className="text-green-600">복사됨!</span>
                  </>
                ) : (
                  "🔗 공유하기"
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Back to list */}
        <div className="mt-12 text-center">
          <motion.button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-full hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>다른 글 보러가기</span>
          </motion.button>
        </div>
      </motion.article>
    </div>
  );
}
