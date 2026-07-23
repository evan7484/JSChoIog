"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

// 마크다운 코드 블록 래퍼 — 복사 버튼 제공.
// 문법 하이라이팅은 rehype-highlight가 내부 <code>에 입힌다.
export default function CodeBlock({
  children,
  // react-markdown이 넘기는 node는 DOM에 전달하지 않는다
  node: _node,
  ...props
}: React.HTMLAttributes<HTMLPreElement> & { node?: unknown }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = ref.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="relative group/code my-6">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "복사됨" : "코드 복사"}
        className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-1.5 text-xs text-gray-300 backdrop-blur-sm transition-all hover:bg-white/20 opacity-0 group-hover/code:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-400" />
            <span>복사됨</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>복사</span>
          </>
        )}
      </button>
      <pre
        ref={ref}
        className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
