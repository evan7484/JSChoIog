"use client";

import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import type { BlogPost } from "@/lib/notion/types";

interface BlogPostProps {
  postId: string | null;
  onBack: () => void;
  allPosts?: BlogPost[];
}

export default function BlogPost({
  postId,
  onBack,
  allPosts = [],
}: BlogPostProps) {
  // Find post from allPosts array (passed from Blog component)
  const post = allPosts.find((p) => p.id === postId);

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

      {/* Hero section with gradient */}
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
              <span className="text-white/90">{post.readTime}</span>
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

        {/* Article content with improved typography */}
        <div className="max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-4xl font-bold mt-8 mb-4 text-gray-900"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-3xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200 text-gray-900"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-2xl font-bold mt-6 mb-3 text-gray-800"
                  {...props}
                />
              ),
              h4: ({ node, ...props }) => (
                <h4
                  className="text-xl font-bold mt-6 mb-3 text-gray-800"
                  {...props}
                />
              ),
              h5: ({ node, ...props }) => (
                <h5
                  className="text-lg font-bold mt-4 mb-2 text-gray-800"
                  {...props}
                />
              ),
              h6: ({ node, ...props }) => (
                <h6
                  className="text-base font-bold mt-4 mb-2 text-gray-800"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p className="text-gray-700 leading-relaxed mb-6" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc list-inside my-6 space-y-2 text-gray-700"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal list-inside my-6 space-y-2 text-gray-700"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li className="leading-relaxed" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-orange-400 bg-orange-50 py-4 px-6 rounded-r-lg my-6 text-gray-800 italic"
                  {...props}
                />
              ),
              code: ({ node, inline, ...props }: any) =>
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
              pre: ({ node, ...props }) => (
                <pre
                  className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6"
                  {...props}
                />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-gray-900" {...props} />
              ),
              em: ({ node, ...props }) => (
                <em className="italic text-gray-700" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-orange-500 hover:text-orange-600 underline"
                  {...props}
                />
              ),
              img: ({ node, ...props }) => (
                <img className="rounded-lg my-6 w-full" {...props} />
              ),
              hr: ({ node, ...props }) => (
                <hr className="my-8 border-gray-200" {...props} />
              ),
              table: ({ node, ...props }) => (
                <table className="w-full my-6 border-collapse" {...props} />
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-gray-50" {...props} />
              ),
              tbody: ({ node, ...props }) => (
                <tbody className="divide-y divide-gray-200" {...props} />
              ),
              tr: ({ node, ...props }) => (
                <tr className="border-b border-gray-200" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th
                  className="px-4 py-2 text-left font-semibold text-gray-900"
                  {...props}
                />
              ),
              td: ({ node, ...props }) => (
                <td className="px-4 py-2 text-gray-700" {...props} />
              ),
            }}
          >
            {post.content || ""}
          </ReactMarkdown>
        </div>

        {/* Share and actions */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-gray-600">이 글이 도움이 되셨나요?</p>
            <div className="flex gap-3">
              <motion.button
                className="px-6 py-2 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                👍 좋아요
              </motion.button>
              <motion.button
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔗 공유하기
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
