import { contents, profile } from "@/lib/portfolio-data";
import { Label, SectionTitle, Stats } from "./Blocks";

/** 표지 — 소개, 일하는 방식, 목차, 연락처 */
export default function Hero() {
  return (
    <section className="space-y-14">
      <div className="flex items-end justify-between border-b-[1.5px] border-(--pf-ink) pb-2.5 text-xs">
        <p className="font-bold tracking-[0.12em] text-(--pf-acc)">PORTFOLIO</p>
        <p className="text-(--pf-mute)">2026</p>
      </div>

      <header className="pt-6 sm:pt-12">
        <Label>{profile.title.toUpperCase()}</Label>
        <h1 className="mt-3 text-5xl font-black leading-[1.15] tracking-tight text-(--pf-ink) sm:text-[64px]">
          {profile.name}
        </h1>
        <p className="mt-5 max-w-2xl text-xl leading-[1.7] text-(--pf-ink) break-keep">{profile.lead}</p>
        <p className="mt-4 max-w-3xl leading-[1.7] text-(--pf-sub) break-keep">{profile.intro}</p>
      </header>

      <div className="space-y-5">
        <SectionTitle as="h2">일하는 방식</SectionTitle>
        <Stats items={profile.highlights} />
      </div>

      <nav aria-label="목차" className="space-y-1">
        <SectionTitle as="h2">CONTENTS</SectionTitle>
        <div
          aria-hidden
          className="hidden gap-4 border-b border-(--pf-line) py-2.5 text-xs font-bold tracking-[0.12em] text-(--pf-mute) sm:flex"
        >
          <span className="w-8 shrink-0">No</span>
          <span className="w-44 shrink-0">프로젝트</span>
          <span className="flex-1">다루는 내용</span>
          <span className="w-28 shrink-0">기간</span>
        </div>
        <ul>
          {contents.map((c) => (
            <li key={c.id} className="border-b border-(--pf-line)">
              <a
                href={`#${c.id}`}
                className="group flex flex-wrap gap-x-4 gap-y-1 py-3 text-sm leading-relaxed focus:outline-none focus-visible:ring-2 focus-visible:ring-(--pf-acc) sm:flex-nowrap"
              >
                <span className="w-8 shrink-0 text-(--pf-sub)">{c.no}</span>
                <span className="shrink-0 font-bold text-(--pf-ink) group-hover:text-(--pf-acc) sm:w-44">{c.name}</span>
                <span className="w-full text-(--pf-body) break-keep sm:w-auto sm:flex-1">{c.covers}</span>
                <span className="shrink-0 text-(--pf-sub) sm:w-28">{c.period}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-4">
        <SectionTitle as="h2">CONTACT</SectionTitle>
        <dl className="grid gap-x-10 gap-y-1.5 text-sm leading-relaxed sm:grid-cols-2">
          {profile.links.map((l) => (
            <div key={l.label} className="flex gap-3">
              <dt className="w-16 shrink-0 font-bold text-(--pf-sub)">{l.label}</dt>
              <dd className="min-w-0">
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-(--pf-ink) underline decoration-(--pf-line) underline-offset-4 hover:decoration-(--pf-acc) break-all"
                >
                  {l.text}
                </a>
              </dd>
            </div>
          ))}
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 font-bold text-(--pf-sub)">학력</dt>
            <dd className="text-(--pf-ink) break-keep">{profile.education}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
