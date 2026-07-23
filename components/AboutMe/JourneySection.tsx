import Icon from "@/components/icons";

// 사실 기반 여정 — 새 이력이 생기면 맨 앞에 추가
const journey = [
  {
    when: "2026",
    title: "AI·SW마에스트로 17기 합격",
    desc: "연수 과정 시작 — 팀 프로젝트 준비 중",
  },
  {
    when: "2025.06 – 2025.08",
    title: "WINEQUEEN 출시",
    desc: "Next.js · Supabase — AI 와인 추천 플랫폼 풀스택 개발",
  },
  {
    when: "2025.06 ~",
    title: "프로젝트 당번",
    desc: "React · TypeScript — 팀 당번 배정 자동화 서비스",
  },
  {
    when: "2025 ~",
    title: "기술 블로그 · 알고리즘 연재",
    desc: "Notion CMS 블로그 직접 구축, 백준 풀이 기록",
  },
];

export default function JourneySection() {
  return (
    <div className="mb-24">
      <h3 className="mb-8 flex items-center gap-3">
        <Icon name="rocket" size={30} className="text-orange-500" />
        <span>여정</span>
      </h3>
      <div className="relative pl-8 max-w-2xl">
        <div className="absolute left-[7px] top-1 bottom-1 w-0.5 bg-linear-to-b from-orange-400 to-red-400 rounded-full" />
        {journey.map((item) => (
          <div key={item.title} className="relative pb-8 last:pb-0">
            <span className="absolute -left-8 top-1.5 w-4 h-4 rounded-full bg-orange-500 ring-4 ring-orange-100" />
            <p className="text-sm font-semibold text-orange-600">{item.when}</p>
            <h4 className="text-gray-900">{item.title}</h4>
            <p className="text-gray-600 text-sm break-keep">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
