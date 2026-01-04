import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useEffect, useMemo } from "react";
import type { Project } from "@/lib/notion/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    // 모달이 열리면 body 스크롤 막기
    document.body.style.overflow = "hidden";

    // ESC 키로 모달 닫기
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    // 모달이 닫히면 body 스크롤 복원 및 이벤트 리스너 제거
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [project, onClose]);

  // 마크다운 콘텐츠 메모이제이션
  const memoizedContent = useMemo(
    () => project?.content || "",
    [project?.content]
  );

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-auto pt-8 md:pt-16"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div
          className={`relative h-48 bg-linear-to-br ${project.color} overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/20" />
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-lg z-10"
          >
            <span className="text-xl">✕</span>
          </button>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-8xl mb-4">{project.icon}</span>
            <h2 className="text-white mb-2">{project.title}</h2>
            <p className="text-white/90">{project.period}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-200">
            {project.tags
              .filter((tag) => tag && tag.trim())
              .map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
          </div>

          {/* Project Content */}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h2: ({ node, ...props }) => (
                <h2
                  className="text-2xl font-bold mt-6 mb-3 pb-2 border-b border-gray-200 text-gray-900"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-xl font-bold mt-6 mb-3 text-gray-800"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p className="text-gray-700 leading-relaxed mb-4" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc list-inside my-4 space-y-2 text-gray-700"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal list-inside my-4 space-y-2 text-gray-700"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li className="leading-relaxed" {...props} />
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
                  className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"
                  {...props}
                />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-gray-900" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-orange-500 hover:text-orange-600 underline break-words"
                  target="_blank"
                  {...props}
                />
              ),
              img: ({ node, ...props }) => (
                <img className="rounded-lg my-4 w-full" {...props} />
              ),
            }}
          >
            {memoizedContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
