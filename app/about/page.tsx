import AboutMe from "@/components/AboutMe";
import { getProjects } from "@/lib/notion/projects";
import type { Project } from "@/lib/notion/types";

export const revalidate = 3600;

export default async function AboutPage() {
  // 랜딩 페이지이므로 Notion 조회가 실패해도 페이지 자체는 뜨도록 한다
  // (빈 배열이면 AboutMe가 기본 프로젝트 데이터로 대체)
  let projects: Project[] = [];
  try {
    projects = await getProjects();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }

  return <AboutMe projects={projects} />;
}
