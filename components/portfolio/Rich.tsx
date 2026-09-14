import type { Paragraph } from "@/lib/portfolio-data";

// 데이터 파일의 문단(문자열 또는 strong 표시가 섞인 배열)을 렌더한다
export function Rich({ p, className = "" }: { p: Paragraph; className?: string }) {
  if (typeof p === "string") return <p className={className}>{p}</p>;
  return (
    <p className={className}>
      {p.map((r, i) =>
        r.strong ? (
          <strong key={i} className="font-semibold text-gray-900 dark:text-gray-50">
            {r.text}
          </strong>
        ) : (
          <span key={i}>{r.text}</span>
        ),
      )}
    </p>
  );
}

export function RichList({ items, className = "" }: { items: Paragraph[]; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((p, i) => (
        <Rich key={i} p={p} className="leading-relaxed text-gray-700 dark:text-gray-300 break-keep" />
      ))}
    </div>
  );
}
