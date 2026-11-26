import type { Block, Case, Project as ProjectData } from "@/lib/portfolio-data";
import { BlockView, Caption, SectionTitle, ShotFrame, Stats } from "./Blocks";

/** 쪽 머리 — 왼쪽에 번호·이름, 오른쪽에 링크 */
export function Kicker({ no, name, link }: { no: string; name: string; link: { label: string; href: string } }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b-[1.5px] border-(--pf-ink) pb-2.5 text-xs">
      <p className="font-bold tracking-[0.12em] text-(--pf-acc)">
        {no} · {name}
      </p>
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="truncate text-(--pf-mute) hover:text-(--pf-acc)"
      >
        {link.label}
      </a>
    </div>
  );
}

function Columns({ left, right }: { left: Block[]; right: Block[] }) {
  return (
    <div className="grid gap-x-10 gap-y-5 md:grid-cols-2">
      <div className="min-w-0 space-y-4">
        {left.map((b, i) => (
          <BlockView key={i} block={b} />
        ))}
      </div>
      <div className="min-w-0 space-y-4">
        {right.map((b, i) => (
          <BlockView key={i} block={b} />
        ))}
      </div>
    </div>
  );
}

function CaseView({ data }: { data: Case }) {
  return (
    <section className="space-y-5">
      <SectionTitle>{data.title}</SectionTitle>
      {data.lead?.map((b, i) => <BlockView key={i} block={b} />)}
      {data.left && data.right && <Columns left={data.left} right={data.right} />}
      {data.second && <Columns left={data.second.left} right={data.second.right} />}
      {data.tail?.map((b, i) => <BlockView key={i} block={b} />)}
    </section>
  );
}

export default function Project({ data, first }: { data: ProjectData; first?: boolean }) {
  return (
    <article id={data.id} className="scroll-mt-28 space-y-12">
      <Kicker no={data.no} name={data.name} link={data.link} />

      <header className="space-y-4">
        <h2 className="text-4xl font-bold leading-tight tracking-tight text-(--pf-ink) break-all sm:text-[40px]">
          {data.name}
        </h2>
        <p className="leading-[1.7] text-(--pf-sub) break-keep">{data.tagline}</p>

        <dl className="grid grid-cols-2 overflow-hidden rounded-lg border border-(--pf-line) sm:grid-cols-4">
          {data.overview.map((o, i) => (
            <div
              key={o.label}
              className={`px-4 py-3 ${i % 2 === 1 ? "border-l border-(--pf-line)" : ""} ${
                i >= 2 ? "border-t border-(--pf-line) sm:border-t-0" : ""
              } ${i === 2 ? "sm:border-l" : ""}`}
            >
              <dt className="text-xs font-bold tracking-[0.12em] text-(--pf-sub)">{o.label}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-(--pf-ink)">
                {o.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>

        {data.metrics && (
          <div className="pt-2">
            <Stats items={data.metrics} />
          </div>
        )}

        {data.intro.map((b, i) => (
          <BlockView key={i} block={b} />
        ))}
      </header>

      {data.screens && (
        <section className="space-y-3">
          <SectionTitle>{data.screens.title}</SectionTitle>
          <ShotFrame shot={data.screens.main} sizes="(min-width: 1024px) 976px, 100vw" priority={first} />
          <div className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {data.screens.pair.map((s) => (
              <ShotFrame key={s.src} shot={s} sizes="(min-width: 640px) 468px, 100vw" />
            ))}
          </div>
          <Caption>{data.screens.caption}</Caption>
        </section>
      )}

      {data.cases.map((c) => (
        <CaseView key={c.title} data={c} />
      ))}

      {data.stats && (
        <section className="space-y-5">
          <SectionTitle>{data.stats.title}</SectionTitle>
          <Stats items={data.stats.items} />
        </section>
      )}

      {data.closing && <BlockView block={data.closing} />}
    </article>
  );
}
