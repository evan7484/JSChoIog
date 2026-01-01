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
  level: number;
  icon: React.ReactNode;
}
