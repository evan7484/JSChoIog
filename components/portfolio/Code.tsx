import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import type { CodeSample } from "@/lib/portfolio-data";

hljs.registerLanguage("typescript", typescript);

// 서버에서 하이라이트해 정적 HTML로 내보낸다. 토큰 색은 globals.css의 github-dark 테마.
export default function Code({ sample }: { sample: CodeSample }) {
  const html = hljs.highlight(sample.code, { language: "typescript" }).value;
  return (
    <figure className="overflow-hidden rounded-xl bg-gray-900 ring-1 ring-black/10 dark:ring-white/10">
      <figcaption className="flex items-center gap-2 border-b border-white/10 px-4 py-2 font-mono text-xs text-gray-400">
        <span className="size-2 rounded-full bg-gray-600" aria-hidden />
        {sample.file}
      </figcaption>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="hljs language-typescript" dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </figure>
  );
}
