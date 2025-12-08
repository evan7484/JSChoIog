interface Project {
  id: string | number;
  title: string;
  period: string;
  description: string;
  tags: string[];
  color: string;
  icon: string;
  details: {
    overview: string;
    features: string[];
    tech: string;
    role: string;
    outcome: string;
  };
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto pt-8 md:pt-16"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div
          className={`relative h-48 bg-linear-to-br ${project.color} overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/20" />
          <button
            onClick={onClose}
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
                className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm"
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
              {project.details.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <span className="text-orange-500 mt-1">•</span>
                  <span>{feature}</span>
                </li>
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
            <div className="bg-linear-to-r from-orange-50 to-red-50 rounded-xl p-4 border-l-4 border-orange-400">
              <p className="text-gray-800 leading-relaxed">
                {project.details.outcome}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
