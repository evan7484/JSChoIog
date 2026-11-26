import type { Metadata } from "next";
import Hero from "@/components/portfolio/Hero";
import Project from "@/components/portfolio/Project";
import Closing from "@/components/portfolio/Closing";
import JsonLd from "@/components/JsonLd";
import { profile, projects } from "@/lib/portfolio-data";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "최준서 포트폴리오 — 루게더(로그아웃 문제를 서버까지 추적, 신고·차단, 자유 배치 편집기와 렌더 최적화, 웹 버전), SEED+(훅·테스트로 규칙 확인, 배포 캐시, 기능명세서 규칙 번호를 코드·테스트와 대응), Playwright E2E 테스트의 문제 해결 기록.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "최준서 — Software Engineer Portfolio",
    description: "루게더 · SEED+ · E2E 테스트 문제 해결 기록",
    images: ["/portfolio/rougether-editor-selected.jpg"],
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
              .filter((l) => l.href.startsWith("http") && l.label !== "Blog")
              .map((l) => l.href),
          },
        }}
      />
      <div className="pf mx-auto max-w-5xl space-y-28 px-6 pb-28 pt-6 sm:pt-10">
        <Hero />
        {projects.map((p, i) => (
          <Project key={p.id} data={p} first={i === 0} />
        ))}
        <Closing />
      </div>
    </>
  );
}
