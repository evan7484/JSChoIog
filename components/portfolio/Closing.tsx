import { profile, sideProjects } from "@/lib/portfolio-data";
import { Rich, SectionTitle } from "./Blocks";
import { Kicker } from "./Project";

/** 마지막 쪽 — 작은 프로젝트, 여기까지 온 길, 배운 것 */
export default function Closing() {
  return (
    <article id={sideProjects.id} className="scroll-mt-28 space-y-12">
      <Kicker no={sideProjects.no} name={sideProjects.name} link={sideProjects.link} />

      <div className="space-y-10">
        {sideProjects.items.map((p) => (
          <section key={p.name} className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-(--pf-ink)">{p.name}</h2>
            <p className="text-sm leading-relaxed text-(--pf-sub) break-keep">{p.meta}</p>
            <ul className="list-disc space-y-1.5 pl-5 leading-[1.7] text-(--pf-body) marker:text-(--pf-mute) break-keep">
              {p.points.map((pt) => (
                <li key={pt}>
                  <Rich text={pt} />
                </li>
              ))}
            </ul>
            <p className="text-xs leading-relaxed text-(--pf-sub)">{p.stack}</p>
          </section>
        ))}
      </div>

      <section className="space-y-4">
        <SectionTitle>여기까지 온 길과 앞으로</SectionTitle>
        <p className="leading-[1.7] text-(--pf-body) break-keep">
          <Rich text={profile.path} />
        </p>
      </section>

      <section className="space-y-1">
        <SectionTitle>배운 것</SectionTitle>
        <dl>
          {profile.principles.map((p) => (
            <div
              key={p.name}
              className="flex flex-col gap-x-4 gap-y-0.5 border-b border-(--pf-line) py-3 text-sm leading-relaxed sm:flex-row"
            >
              <dt className="shrink-0 font-bold text-(--pf-ink) sm:w-52">{p.name}</dt>
              <dd className="text-(--pf-body) break-keep">{p.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <footer className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-t-[1.5px] border-(--pf-ink) pt-6">
        <p className="text-2xl font-bold tracking-tight text-(--pf-ink)">감사합니다.</p>
        <p className="text-sm text-(--pf-ink)">
          {profile.links
            .filter((l) => l.label !== "LinkedIn")
            .map((l) => l.text)
            .join(" · ")}
        </p>
      </footer>
    </article>
  );
}
