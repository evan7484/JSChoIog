"use client";

import { useState, useEffect } from "react";
import HeroSection from "./AboutMe/HeroSection";
import SkillsSection from "./AboutMe/SkillsSection";
import ProjectsSection from "./AboutMe/ProjectsSection";
import ProjectModal from "./AboutMe/ProjectModal";
import type { Project, Skill } from "@/lib/notion/types";

const skills: Skill[] = [
  { name: "React", level: 90, icon: "⚛️" },
  { name: "TypeScript", level: 85, icon: "📘" },
  { name: "Tailwind CSS", level: 95, icon: "🎨" },
  { name: "Next.js", level: 80, icon: "▲" },
];

export default function AboutMe() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const response = await fetch("/api/projects");
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || null;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    console.error("Error loading projects:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <HeroSection />
      <SkillsSection skills={skills} />
      <ProjectsSection
        projects={projects.length > 0 ? projects : getDefaultProjects()}
        onProjectSelect={setSelectedProjectId}
      />
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProjectId(null)}
      />
    </div>
  );
}

// 노션 데이터가 없을 때 기본 프로젝트 데이터
function getDefaultProjects(): Project[] {
  return [
    {
      id: "1",
      title: "프로젝트 당번",
      period: "2025.06 ~",
      description: "팀 프로젝트 일정 관리 및 당번 배정 시스템",
      tags: ["React", "TypeScript", "Tailwind"],
      color: "from-orange-400 to-red-400",
      icon: "📋",
      details: {
        overview:
          "팀 프로젝트에서 당번을 자동으로 배정하고 일정을 관리하는 웹 애플리케이션입니다. 공정한 순환 시스템을 통해 팀원들의 업무를 효율적으로 분배합니다.",
        features: [
          "자동 당번 배정 알고리즘",
          "일정 캘린더 뷰",
          "알림 시스템",
          "팀원 관리",
          "통계 대시보드",
        ],
        tech: "이 프로젝트는 React와 TypeScript로 개발되었으며, Tailwind CSS를 사용하여 반응형 디자인을 구현했습니다. 상태 관리는 Zustand를 활용했습니다.",
        role: "Frontend 개발 및 UI/UX 디자인을 담당했으며, 당번 배정 알고리즘을 설계하고 구현했습니다.",
        outcome:
          "팀 프로젝트 관리 시간이 50% 단축되었으며, 당번 배정의 공정성이 크게 향상되었습니다.",
      },
    },
    {
      id: "2",
      title: "WINEQUEEN",
      period: "2025.06 ~ 2025.08",
      description: "와인 추천 및 매칭 서비스 플랫폼",
      tags: ["Next.js", "Supabase", "AI"],
      color: "from-purple-400 to-pink-400",
      icon: "🍷",
      details: {
        overview:
          "AI 기반 와인 추천 플랫폼으로, 사용자의 취향을 분석하여 최적의 와인을 추천하고 음식 페어링 정보를 제공합니다.",
        features: [
          "AI 기반 개인화 추천",
          "음식 페어링 매칭",
          "와인 데이터베이스",
          "사용자 리뷰 시스템",
          "위시리스트 기능",
        ],
        tech: "Next.js 14의 App Router와 Server Components를 활용했으며, Supabase를 백엔드로 사용했습니다. AI 추천 엔진은 OpenAI API를 통합했습니다.",
        role: "풀스택 개발을 담당했으며, AI 추천 로직 설계 및 데이터베이스 스키마 설계를 주도했습니다.",
        outcome:
          "베타 출시 후 1000명 이상의 사용자를 확보했으며, 평균 4.5점의 높은 만족도를 기록했습니다.",
      },
    },
    {
      id: "3",
      title: "Portfolio Site",
      period: "2025.03 ~ 2025.05",
      description: "개인 포트폴리오 및 기술 블로그",
      tags: ["React", "Framer Motion", "MDX"],
      color: "from-blue-400 to-cyan-400",
      icon: "💼",
      details: {
        overview:
          "개인 포트폴리오와 기술 블로그를 통합한 웹사이트입니다. 프로젝트 소개, 기술 스택, 블로그 포스팅을 한 곳에서 관리할 수 있습니다.",
        features: [
          "인터랙티브한 UI/UX",
          "MDX 기반 블로그",
          "다크 모드 지원",
          "반응형 디자인",
          "SEO 최적화",
        ],
        tech: "React와 Framer Motion으로 부드러운 애니메이션을 구현했으며, MDX를 통해 블로그 콘텐츠를 관리합니다. Vite를 빌드 도구로 사용했습니다.",
        role: "기획부터 디자인, 개발, 배포까지 전 과정을 독립적으로 수행했습니다.",
        outcome:
          "월 평균 500명의 방문자를 기록하고 있으며, 여러 기업으로부터 긍정적인 피드백을 받았습니다.",
      },
    },
  ];
}
