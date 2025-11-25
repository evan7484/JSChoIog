interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <div className="mb-24">
      <h3 className="mb-8 flex items-center gap-3">
        <span className="text-4xl">💪</span>
        <span>Skills</span>
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{skill.icon}</span>
                <span className="font-medium text-gray-800">{skill.name}</span>
              </div>
              <span className="text-orange-600">{skill.level}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-orange-400 to-red-500 transition-all duration-1000"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
