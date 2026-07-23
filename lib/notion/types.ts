import type { ReactNode } from "react";

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: number;
  tags: string[];
  color: string;
  releasable: boolean;
  content?: string;
  likes: number;
  /** Notion 페이지 커버 이미지 URL (없으면 빈 문자열 → 그라디언트 폴백) */
  cover: string;
}

export interface Project {
  id: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
  color: string;
  icon: string;
  content: string;
}

export interface Skill {
  name: string;
  icon: ReactNode;
}
