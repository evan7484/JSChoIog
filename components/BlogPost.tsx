"use client";

import { motion } from "motion/react";
import { ArrowLeft, Check } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/icons";
import Comments from "@/components/Comments";
import CodeBlock from "@/components/CodeBlock";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import type { BlogPost as BlogPostType } from "@/lib/notion/types";
import { postPath } from "@/lib/site";

type Props = {
  post: BlogPostType;
  newerPost?: BlogPostType | null;
  olderPost?: BlogPostType | null;
};

export default function BlogPost({ post, newerPost, olderPost }: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  // 컴포넌트 마운트 시 localStorage에서 좋아요 여부 확인
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("liked_posts") || "[]");
    setHasLiked(likedPosts.includes(post.id));
    setLikes(post.likes || 0);
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
    if (isLiking) return;

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

  return (
    <div className="min-h-screen">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-orange-600 hover:-translate-x-1 transition-all rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>목록으로 돌아가기</span>
        </Link>
      </div>

      {/* Hero */}
      <motion.div
        className={`relative h-80 overflow-hidden mb-12 ${
          post.cover ? "" : `bg-linear-to-br ${post.color}`
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {post.cover && (
          <Image
            src={post.cover}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
              <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full">
                {post.category}
              </span>
              <span className="text-white/90">읽는데 {post.readTime}분</span>
              <span className="text-white/90 hidden sm:inline">•</span>
              <span className="text-white/90">{post.date}</span>
            </div>
            <h1 className="text-white mb-0 text-3xl sm:text-4xl md:text-5xl break-keep">
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
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
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
              code: ({
                inline,
                className,
                children,
                ...props
              }: {
                inline?: boolean;
                className?: string;
                children?: React.ReactNode;
              }) =>
                inline ? (
                  <code
                    className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  // 블록 코드는 className(hljs·language-*)을 보존해 하이라이팅 유지
                  <code className={className} {...props}>
                    {children}
                  </code>
                ),
              pre: (props) => <CodeBlock {...props} />,
              a: ({ ...props }) => (
                <a
                  className="text-orange-500 hover:text-orange-600 underline"
                  {...props}
                />
              ),
              // 본문 이미지: 치수를 모르므로 반응형 패턴(width/height 0 + sizes)으로
              // next/image 최적화(WebP·지연 로딩) 적용
              img: ({ src, alt }) =>
                typeof src === "string" ? (
                  <Image
                    src={src}
                    alt={alt || ""}
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="rounded-lg my-6"
                    style={{ width: "100%", height: "auto" }}
                  />
                ) : null,
              hr: ({ ...props }) => (
                <hr className="my-8 border-gray-200" {...props} />
              ),
              table: ({ ...props }) => (
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse" {...props} />
                </div>
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
                className={`px-6 py-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 ${
                  hasLiked
                    ? "bg-orange-200 text-orange-700 hover:bg-orange-300"
                    : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon
                    name="heart"
                    size={16}
                    filled={hasLiked}
                    className={hasLiked ? "text-red-500" : ""}
                  />
                  {isLiking ? "처리중..." : `좋아요 ${likes}`}
                </span>
              </motion.button>
              <motion.button
                onClick={handleShare}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 inline mr-1 text-green-600" />
                    <span className="text-green-600">복사됨!</span>
                  </>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <Icon name="link" size={16} />
                    공유하기
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* 이전/다음 글 */}
        {(newerPost || olderPost) && (
          <nav className="mt-12 grid sm:grid-cols-2 gap-4">
            {olderPost ? (
              <Link
                href={postPath(olderPost)}
                className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
              >
                <p className="text-sm text-gray-500 mb-1">← 이전 글</p>
                <p className="text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-1 break-keep">
                  {olderPost.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {newerPost && (
              <Link
                href={postPath(newerPost)}
                className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 text-right"
              >
                <p className="text-sm text-gray-500 mb-1">다음 글 →</p>
                <p className="text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-1 break-keep">
                  {newerPost.title}
                </p>
              </Link>
            )}
          </nav>
        )}

        {/* Comments */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="mb-6 flex items-center gap-2 text-gray-800">
            <Icon name="chat" size={20} className="text-orange-500" />
            <span>댓글</span>
          </h3>
          <Comments term={post.id} />
        </div>

        {/* Back to list */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-full hover:shadow-lg hover:scale-105 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>다른 글 보러가기</span>
          </Link>
        </div>
      </motion.article>
    </div>
  );
}
