"use client";

import { useEffect, useRef } from "react";

// giscus (GitHub Discussions 기반 댓글) — 댓글 작성 시 GitHub 로그인은 위젯이 처리
// repo-id/category-id는 evan7484/JSChoIog의 GraphQL node ID (Discussions 활성화 시 고정)
const GISCUS_CONFIG: Record<string, string> = {
  "data-repo": "evan7484/JSChoIog",
  "data-repo-id": "R_kgDOQIPxTQ",
  "data-category": "Announcements",
  "data-category-id": "DIC_kwDOQIPxTc4DBxXx",
  "data-mapping": "pathname",
  "data-strict": "0",
  "data-reactions-enabled": "1",
  "data-emit-metadata": "0",
  "data-input-position": "top",
  "data-theme": "light",
  "data-lang": "ko",
};

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    Object.entries(GISCUS_CONFIG).forEach(([key, value]) =>
      script.setAttribute(key, value)
    );
    el.appendChild(script);

    // 포스트 간 이동 시 이전 위젯 정리 (pathname 매핑이 새로 잡히도록)
    return () => {
      el.innerHTML = "";
    };
  }, []);

  return <div ref={ref} className="giscus" />;
}
