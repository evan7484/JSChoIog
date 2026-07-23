import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useEffect, useMemo } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/lib/notion/types";
import Icon from "@/components/icons";

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
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} 프로젝트`}
        className="bg-white dark:bg-gray-800 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div
          className={`relative h-48 bg-linear-to-br ${project.color} overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/20" />
          <button
            onClick={onClose}
            aria-label="닫기"
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-lg z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {project.icon ? (
              <span className="text-8xl mb-4">{project.icon}</span>
            ) : (
              <Icon
                name="folder"
                size={72}
                className="text-white drop-shadow-md mb-4"
              />
            )}
            <h2 className="text-white mb-2">{project.title}</h2>
            <p className="text-white/90">{project.period}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 md:p-10">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            {project.tags
              .filter((tag) => tag && tag.trim())
              .map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="px-4 py-2 bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300 rounded-full text-sm"
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
                  className="text-2xl font-bold mt-6 mb-3 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-50"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-100"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc list-inside my-4 space-y-2 text-gray-700 dark:text-gray-300"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal list-inside my-4 space-y-2 text-gray-700 dark:text-gray-300"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li className="leading-relaxed" {...props} />
              ),
              code: ({
                node,
                inline,
                ...props
              }: {
                node?: unknown;
                inline?: boolean;
                className?: string;
                children?: React.ReactNode;
              }) =>
                inline ? (
                  <code
                    className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200"
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
                <strong
                  className="font-semibold text-gray-900 dark:text-gray-100"
                  {...props}
                />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-orange-500 hover:text-orange-600 underline break-words"
                  target="_blank"
                  {...props}
                />
              ),
              img: ({ src, alt }) =>
                typeof src === "string" ? (
                  <Image
                    src={src}
                    alt={alt || ""}
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="rounded-lg my-4"
                    style={{ width: "100%", height: "auto" }}
                  />
                ) : null,
            }}
          >
            {memoizedContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
