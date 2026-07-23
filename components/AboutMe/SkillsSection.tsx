import Icon from "@/components/icons";
import type { Skill } from "@/lib/notion/types";

interface SkillsSectionProps {
  skills: Skill[];
}

// 숙련도 수치(% 바) 없이 도구 목록만 — 근거 없는 숫자는 신뢰를 깎는다
export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <div className="mb-24">
      <h3 className="mb-8 flex items-center gap-3">
        <Icon name="code" size={30} className="text-orange-500" />
        <span>Skills</span>
      </h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2.5 bg-white dark:bg-gray-800 rounded-xl px-4 py-2.5 shadow-md hover:shadow-lg transition-shadow"
          >
            {skill.icon}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
