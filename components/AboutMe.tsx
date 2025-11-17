import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const projects = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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

const skills = [
  { name: "React", level: 90, icon: "⚛️" },
  { name: "TypeScript", level: 85, icon: "📘" },
  { name: "Tailwind CSS", level: 95, icon: "🎨" },
  { name: "Next.js", level: 80, icon: "▲" },
];

export default function AboutMe() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <motion.div
        className="grid md:grid-cols-2 gap-12 items-center mb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="mb-6">
              <span className="block">성실함과 </span>
              <span className="text-red-500">열정</span>
              <span>을 바탕으로</span>
              <span className="block">성장하는 </span>
              <span className="text-yellow-500">긍정</span>
              <span> 개발자</span>
              <span className="block">최준서입니다! 👋</span>
            </h2>
          </motion.div>

          <motion.p
            className="text-gray-700 leading-relaxed mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            항상 프로젝트에서 다양한 분야의 팀원들과 협력하고 재밌게 함께 만들어
            나가는 걸 기대하고 있습니다! 저는 긍정적인 사람으로 팀프로젝트에서도
            제 긍정적인 분위기를 팀원들에게 전달하는 역할을 수행할 수 있을
            것이라고 생각합니다!
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full">
              <span className="mr-2">🎯</span>
              <span className="text-gray-800">팀워크</span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">
              <span className="mr-2">💡</span>
              <span className="text-gray-800">문제 해결</span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
              <span className="mr-2">🚀</span>
              <span className="text-gray-800">빠른 학습</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://placeholder/30"
              alt="Profile"
              className="w-full h-auto"
            />
          </div>
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-orange-300 to-red-300 rounded-full blur-3xl opacity-30 -z-10" />
          <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full blur-3xl opacity-30 -z-10" />
        </motion.div>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        className="mb-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="mb-8 flex items-center gap-3">
          <span className="text-4xl">💪</span>
          <span>Skills</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-medium text-gray-800">
                    {skill.name}
                  </span>
                </div>
                <span className="text-orange-600">{skill.level}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-400 to-red-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Projects Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="mb-8 flex items-center gap-3">
          <span className="text-4xl">📝</span>
          <span>Projects</span>
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedProject(project.id)}
            >
              <div
                className={`h-32 bg-gradient-to-br ${project.color} flex items-center justify-center`}
              >
                <span className="text-6xl group-hover:scale-110 transition-transform">
                  {project.icon}
                </span>
              </div>
              <div className="p-6">
                <h4 className="mb-2">{project.title}</h4>
                <p className="text-gray-600 mb-4">{project.period}</p>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <motion.div
                className="absolute inset-0 border-2 border-orange-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                initial={false}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject &&
          (() => {
            const project = projects.find((p) => p.id === selectedProject);
            if (!project) return null;

            return (
              <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  className="bg-white rounded-3xl max-w-3xl w-full my-8 shadow-2xl overflow-hidden"
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header with gradient */}
                  <div
                    className={`relative h-48 bg-gradient-to-br ${project.color} overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-lg z-10"
                    >
                      <span className="text-xl">✕</span>
                    </button>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-8xl mb-4">{project.icon}</span>
                      <h2 className="text-white mb-2">{project.title}</h2>
                      <p className="text-white/90">{project.period}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-200">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Overview */}
                    <div className="mb-8">
                      <h3 className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">📋</span>
                        <span>개요</span>
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {project.details.overview}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <h3 className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">✨</span>
                        <span>주요 기능</span>
                      </h3>
                      <ul className="space-y-2">
                        {project.details.features.map((feature, index) => (
                          <motion.li
                            key={feature}
                            className="flex items-start gap-3 text-gray-700"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <span className="text-orange-500 mt-1">•</span>
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Technology */}
                    <div className="mb-8">
                      <h3 className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">💻</span>
                        <span>기술 스택</span>
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {project.details.tech}
                      </p>
                    </div>

                    {/* Role */}
                    <div className="mb-8">
                      <h3 className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">👤</span>
                        <span>담당 역할</span>
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {project.details.role}
                      </p>
                    </div>

                    {/* Outcome */}
                    <div className="mb-6">
                      <h3 className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🎯</span>
                        <span>성과</span>
                      </h3>
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border-l-4 border-orange-400">
                        <p className="text-gray-800 leading-relaxed">
                          {project.details.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
      </AnimatePresence>
    </div>
  );
}
