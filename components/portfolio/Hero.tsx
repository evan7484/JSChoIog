import Image from "next/image";
import { caseStudies, profile } from "@/lib/portfolio-data";

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-6 sm:pt-10">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-full shadow-lg ring-2 ring-orange-200 dark:ring-orange-900">
          <Image src="/images/profile3.webp" alt="최준서 프로필" fill sizes="96px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
            {profile.name}
            <span className="ml-3 text-lg font-medium text-gray-500 dark:text-gray-400 sm:text-xl">
              {profile.title}
            </span>
          </h1>

          <div className="mt-6 max-w-2xl space-y-3">
            {profile.intro.map((line, i) => (
              <p
                key={i}
                className={`leading-relaxed break-keep ${
                  i === 0
                    ? "text-lg text-gray-900 dark:text-gray-50"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {line}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {profile.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="font-medium text-orange-700 underline decoration-orange-300 underline-offset-4 hover:decoration-orange-600 dark:text-orange-400"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 목차 — 이 페이지에서 읽을 두 사례 */}
      <nav aria-label="사례" className="mt-14 grid gap-4 sm:grid-cols-2">
        {caseStudies.map((cs) => (
          <a
            key={cs.id}
            href={`#${cs.id}`}
            className="group flex min-w-0 items-center gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white/70 p-4 transition-colors hover:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 dark:border-gray-800 dark:bg-gray-900/60 dark:hover:border-gray-600"
          >
            <Image src={cs.icon} alt="" width={48} height={48} className="size-12 rounded-xl object-contain" />
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 dark:text-gray-50">
                {cs.name} <span className="font-normal text-gray-500">{cs.subtitle}</span>
              </p>
              <p className="mt-0.5 truncate text-sm text-gray-600 dark:text-gray-400">{cs.deepDive.headline}</p>
            </div>
          </a>
        ))}
      </nav>
    </section>
  );
}
