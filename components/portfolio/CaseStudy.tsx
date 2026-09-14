import Image from "next/image";
import type { CaseStudy as CaseStudyData, Issue } from "@/lib/portfolio-data";
import Code from "./Code";
import { RichList } from "./Rich";

// 소제목 — 섹션의 역할을 이름으로 드러낸다. 장식용 라벨은 두지 않는다.
function Sub({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h3 id={id} className="scroll-mt-28 text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-50">
      {children}
    </h3>
  );
}

export default function CaseStudy({ data }: { data: CaseStudyData }) {
  const { theme, deepDive } = data;
  const style = {
    "--cs-bg": theme.bg,
    "--cs-muted": theme.muted,
    "--cs-accent": theme.accent,
    "--cs-tint": theme.tint,
  } as React.CSSProperties;

  return (
    <article id={data.id} className="scroll-mt-24" style={style}>
      {/* 풀블리드 브랜드 밴드 — 이 페이지에서 유일하게 큰 색면 */}
      <header className="bg-(--cs-bg) text-white">
        <div className="mx-auto max-w-5xl px-6 pb-12 pt-14 sm:pt-16">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="flex items-center gap-4">
                <Image
                  src={data.icon}
                  alt=""
                  width={56}
                  height={56}
                  className="size-14 rounded-2xl bg-white/90 object-contain p-1 shadow-md"
                />
                <div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{data.name}</h2>
                  <p className="text-sm text-(--cs-muted)">{data.subtitle}</p>
                </div>
              </div>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 break-keep sm:text-lg">
                {data.tagline}
              </p>

              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm">
                <div>
                  <dt className="text-(--cs-muted)">역할</dt>
                  <dd className="mt-0.5 font-medium">{data.role}</dd>
                </div>
                <div>
                  <dt className="text-(--cs-muted)">기간</dt>
                  <dd className="mt-0.5 font-medium">{data.period}</dd>
                </div>
                <div className="basis-full">
                  <dt className="text-(--cs-muted)">팀</dt>
                  <dd className="mt-0.5 font-medium">{data.team}</dd>
                </div>
              </dl>

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {data.stack.map((s) => (
                  <li key={s} className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/85">
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                {data.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/30 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-white hover:text-(--cs-bg) focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {data.screenshots && (
              <div className="flex items-end gap-3 md:-mb-20">
                {data.screenshots.map((s, i) => {
                  const portrait = s.height > s.width;
                  return (
                    <Image
                      key={s.src}
                      src={s.src}
                      alt={s.alt}
                      width={s.width}
                      height={s.height}
                      className={`h-auto rounded-2xl shadow-2xl ring-1 ring-black/20 ${
                        portrait ? `w-28 sm:w-32 ${i === 1 ? "-translate-y-6" : ""}` : "w-72 sm:w-80"
                      }`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 pt-16 md:pt-28">
        {/* 담당 — 개요 밴드 바로 아래, 짧게 */}
        <div className="grid gap-8 md:grid-cols-2">
          {data.responsibilities.map((r) => (
            <div key={r.group}>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">{r.group}</h3>
              <ul className="mt-2 space-y-1.5 text-gray-800 dark:text-gray-200">
                {r.items.map((it) => (
                  <li key={it} className="flex gap-2 break-keep">
                    <span className="mt-2.5 size-1 shrink-0 rounded-full bg-(--cs-accent)" aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 딥다이브 — 읽는 열 */}
        <section className="mt-20 max-w-3xl">
          <p className="text-sm font-medium text-(--cs-accent)">문제 해결 기록</p>
          <h2 className="mt-2 text-2xl font-bold leading-snug tracking-tight text-gray-900 break-keep dark:text-gray-50 sm:text-3xl">
            {deepDive.headline}
          </h2>

          <div className="mt-10 space-y-14">
            <div>
              <Sub id={`${data.id}-background`}>배경</Sub>
              <RichList items={deepDive.background} className="mt-4" />
            </div>

            <div>
              <Sub id={`${data.id}-approach`}>시도한 방법</Sub>
              <ol className="mt-5 space-y-5">
                {deepDive.approach.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span
                      className="flex size-7 shrink-0 items-center justify-center rounded-full bg-(--cs-accent) text-sm font-semibold text-white"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-50">{s.title}</p>
                      <p className="mt-1 leading-relaxed text-gray-700 break-keep dark:text-gray-300">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <Sub id={`${data.id}-code`}>관련 코드</Sub>
              <div className="mt-5 space-y-4">
                {deepDive.code.map((c) => (
                  <Code key={c.file} sample={c} />
                ))}
              </div>
              <dl className="mt-6 grid gap-5 sm:grid-cols-3">
                {deepDive.codeNotes.map((n) => (
                  <div key={n.title}>
                    <dt className="font-semibold text-gray-900 dark:text-gray-50">{n.title}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-gray-700 break-keep dark:text-gray-300">
                      {n.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl bg-(--cs-tint) p-6 dark:bg-white/5">
              <Sub id={`${data.id}-result`}>결과</Sub>
              <RichList items={deepDive.result} className="mt-3" />
            </div>

            {deepDive.issues.map((issue, i) => (
              <IssueBlock key={issue.title} issue={issue} index={i} idPrefix={data.id} />
            ))}

            {deepDive.lesson && (
              <div>
                <Sub id={`${data.id}-lesson`}>배운 것</Sub>
                <RichList items={deepDive.lesson} className="mt-4" />
              </div>
            )}
          </div>
        </section>

        {/* 그 밖의 작업 */}
        <section className="mt-20 border-t border-gray-200 pt-12 dark:border-gray-800">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-50">그 밖에 만든 것</h2>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {data.extras.items.map((e) => (
              <div key={e.title}>
                <h3 className="font-semibold text-gray-900 dark:text-gray-50">{e.title}</h3>
                <div className="mt-2 space-y-2">
                  {e.body.map((b, i) => (
                    <p key={i} className="text-sm leading-relaxed text-gray-700 break-keep dark:text-gray-300">
                      {b}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

function IssueBlock({ issue, index, idPrefix }: { issue: Issue; index: number; idPrefix: string }) {
  return (
    <div className="border-l-2 border-(--cs-accent) pl-5">
      <Sub id={`${idPrefix}-issue-${index + 1}`}>만났던 이슈 — {issue.title}</Sub>
      <RichList items={issue.symptom} className="mt-4" />

      {issue.meanings && (
        <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 text-sm dark:border-gray-700">
          {issue.meanings.map((m) => (
            <div
              key={m.area}
              className={`flex items-center gap-3 px-4 py-2.5 ${
                m.kept
                  ? "bg-(--cs-tint) dark:bg-white/5"
                  : "bg-white text-gray-500 line-through decoration-gray-400 dark:bg-transparent dark:text-gray-500"
              }`}
            >
              <span className="w-16 shrink-0 font-medium">{m.area}</span>
              <span aria-hidden>→</span>
              <span>{m.meaning}</span>
            </div>
          ))}
        </div>
      )}

      <h4 className="mt-6 font-semibold text-gray-900 dark:text-gray-50">해결 — {issue.fixTitle}</h4>
      <RichList items={issue.fix} className="mt-3" />

      {issue.code && (
        <div className="mt-5 space-y-4">
          {issue.code.map((c) => (
            <Code key={c.file} sample={c} />
          ))}
        </div>
      )}
    </div>
  );
}
