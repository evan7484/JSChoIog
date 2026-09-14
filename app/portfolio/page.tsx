import type { Metadata } from "next";
import Hero from "@/components/portfolio/Hero";
import CaseStudy from "@/components/portfolio/CaseStudy";
import JsonLd from "@/components/JsonLd";
import { caseStudies, profile } from "@/lib/portfolio-data";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "최준서 프론트엔드 포트폴리오 — 루게더(제스처 우선순위 설계, 웹·데스크톱 버전)와 SEED+(기획서 검증 규칙을 코드·테스트와 1:1 대응)의 문제 해결 기록.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "최준서 — Frontend Developer Portfolio",
    description: "루게더 · SEED+ 문제 해결 기록",
    images: ["/portfolio/rougether-my-room.jpg"],
  },
};

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: `${profile.name} 포트폴리오`,
          url: `${SITE_URL}/portfolio`,
          mainEntity: {
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.title,
            // GitHub·LinkedIn을 같은 사람으로 묶어 검색엔진이 프로필을 연결하게 한다
            sameAs: profile.links
              .filter((l) => l.href.startsWith("http"))
              .map((l) => l.href),
          },
        }}
      />
      <Hero />
      <div className="space-y-24 pb-24">
        {caseStudies.map((cs) => (
          <CaseStudy key={cs.id} data={cs} />
        ))}
      </div>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-8 rounded-2xl border border-gray-200 bg-white/70 p-8 dark:border-gray-800 dark:bg-gray-900/60 sm:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-50">활동 · 학력</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {profile.activities.map((a) => (
                <li key={a.name} className="flex flex-wrap gap-x-3 text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-gray-50">{a.name}</span>
                  <span>{a.role}</span>
                  <span className="text-gray-500">{a.period}</span>
                </li>
              ))}
              <li className="flex flex-wrap gap-x-3 text-gray-700 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-gray-50">{profile.education.school}</span>
                <span>{profile.education.major}</span>
                <span className="text-gray-500">{profile.education.period}</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2 text-sm sm:items-end">
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
      </section>
    </>
  );
}
