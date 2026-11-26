import Image from "next/image";
import type { Block, Shot, Stat } from "@/lib/portfolio-data";
import Code from "./Code";

/** 본문 문자열의 **굵게** 표기를 강조로 렌더한다 */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-bold text-(--pf-ink)">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/** 작은 파란 라벨 — 문제 / 해결 / 측정 … */
export function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold tracking-[0.12em] text-(--pf-acc)">{children}</p>;
}

/** 섹션 제목 — 파란 글자 아래 굵은 먹선 */
export function SectionTitle({ children, as: Tag = "h3" }: { children: React.ReactNode; as?: "h2" | "h3" }) {
  return (
    <Tag className="border-b-[1.5px] border-(--pf-ink) pb-2 text-sm font-bold tracking-[0.05em] text-(--pf-acc) break-keep">
      {children}
    </Tag>
  );
}

export function ShotFrame({ shot, sizes, priority }: { shot: Shot; sizes: string; priority?: boolean }) {
  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      sizes={sizes}
      priority={priority}
      className="h-auto w-full rounded-lg border border-(--pf-line)"
    />
  );
}

export function Caption({ children }: { children: React.ReactNode }) {
  return <p className="text-xs leading-relaxed text-(--pf-sub) break-keep">{children}</p>;
}

/** 굵은 숫자 + 설명 — 표지의 일하는 방식, 프로젝트 지표 */
export function Stats({ items }: { items: Stat[] }) {
  return (
    <dl className={`grid gap-x-6 gap-y-8 ${items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
      {items.map((s) => (
        <div key={s.value} className="border-t-[1.5px] border-(--pf-ink) pt-3">
          {s.label && <Label>{s.label}</Label>}
          <dt className="mt-1 text-[28px] font-bold leading-tight tracking-tight text-(--pf-ink)">{s.value}</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-(--pf-sub) break-keep">{s.body}</dd>
        </div>
      ))}
    </dl>
  );
}

const body = "leading-[1.7] text-(--pf-body) break-keep";

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return (
        <div className="space-y-2">
          {block.label && <Label>{block.label}</Label>}
          <p className={body}>
            <Rich text={block.body} />
          </p>
        </div>
      );

    case "list":
      return (
        <div className="space-y-2">
          {block.label && <Label>{block.label}</Label>}
          <ul className={`list-disc space-y-1.5 pl-5 marker:text-(--pf-mute) ${body}`}>
            {block.items.map((it) => (
              <li key={it}>
                <Rich text={it} />
              </li>
            ))}
          </ul>
        </div>
      );

    case "code":
      return (
        <div className="space-y-2">
          <Code sample={block.sample} />
          {block.caption && <Caption>{block.caption}</Caption>}
        </div>
      );

    case "terminal":
      return (
        <div className="space-y-2">
          <pre className="overflow-x-auto rounded-lg bg-[#14171f] p-4 font-mono text-[13px] leading-relaxed text-[#dfe4f0]">
            {block.lines.map((l, i) => (
              <span
                key={i}
                className={`block ${l.tone === "fail" ? "text-[#ff8f8f]" : l.tone === "pass" ? "text-[#8fe0a8]" : ""}`}
              >
                {l.text || " "}
              </span>
            ))}
          </pre>
          {block.caption && <Caption>{block.caption}</Caption>}
        </div>
      );

    case "flow":
      return (
        <div className="space-y-2.5 rounded-lg bg-(--pf-tint) p-4">
          <Label>{block.title}</Label>
          <ol className="flex flex-wrap gap-1.5">
            {block.steps.map((s) => (
              <li
                key={s}
                className="min-w-20 flex-1 rounded-md border border-(--pf-line) bg-(--pf-surface) px-2 py-2 text-center text-xs whitespace-nowrap text-(--pf-ink)"
              >
                {s}
              </li>
            ))}
          </ol>
        </div>
      );

    case "steps":
      return (
        <div className="space-y-2.5 rounded-lg bg-(--pf-tint) p-4">
          <Label>{block.title}</Label>
          <ol className="list-decimal space-y-1 pl-5 text-sm leading-relaxed text-(--pf-ink) marker:text-(--pf-sub) break-keep">
            {block.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ol>
        </div>
      );

    case "bars":
      return (
        <div className="space-y-4 rounded-lg bg-(--pf-tint) p-4">
          {block.groups.map((g) => (
            <div key={g.title} className="space-y-2">
              <Label>{g.title}</Label>
              {g.rows.map((r) => (
                <div key={r.label} className="flex items-center gap-3 text-xs text-(--pf-ink)">
                  <span className="w-12 shrink-0">{r.label}</span>
                  <span className="h-3 flex-1">
                    <span
                      className={`block h-full rounded-sm ${r.after ? "bg-(--pf-acc)" : "bg-(--pf-bar)"}`}
                      style={{ width: `${Math.round(r.ratio * 100)}%` }}
                    />
                  </span>
                  <span className="w-12 shrink-0 font-bold">{r.value}</span>
                </div>
              ))}
            </div>
          ))}
          <Caption>{block.note}</Caption>
        </div>
      );

    case "coords":
      return <CoordsDiagram />;

    case "shot":
      return <ShotFrame shot={block.shot} sizes="(min-width: 768px) 480px, 100vw" />;

    case "result":
      return (
        <p className={`border-l-[3px] border-(--pf-acc) pl-3.5 ${body}`}>
          <strong className="mr-2 font-bold text-(--pf-ink)">{block.label}</strong>
          <Rich text={block.body} />
        </p>
      );
  }
}

/** 같은 문서가 화면 크기만 달리해 그려지는 모습 — 가구 위치는 방 크기에 대한 비율 */
function CoordsDiagram() {
  const rooms = [
    { name: "폰 · 360px", size: 132 },
    { name: "웹 · 240px", size: 88 },
    { name: "타일 · 120px", size: 46 },
  ];
  return (
    <figure className="space-y-3 rounded-lg bg-(--pf-tint) p-4">
      <Label>같은 문서, 다른 화면</Label>
      <div className="flex items-end gap-4">
        {rooms.map((r) => (
          <div key={r.name} className="space-y-1.5">
            <div
              className="relative rounded-md border border-(--pf-line) bg-(--pf-surface)"
              style={{ width: r.size, height: r.size }}
            >
              <span
                className="absolute block rounded-[3px] bg-(--pf-acc)"
                style={{ left: "45%", top: "40%", width: "22%", height: "22%" }}
              />
            </div>
            <p className="text-xs whitespace-nowrap text-(--pf-sub)">{r.name}</p>
          </div>
        ))}
      </div>
      <figcaption className="font-mono text-xs font-bold text-(--pf-ink)">
        {"{ x: 0.45, y: 0.40, scale: 1 }"}
      </figcaption>
    </figure>
  );
}
