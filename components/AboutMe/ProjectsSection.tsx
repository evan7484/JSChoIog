import type { Project } from "@/lib/notion/types";
import Icon from "@/components/icons";

interface ProjectsSectionProps {
  projects: Project[];
  onProjectSelect: (id: string) => void;
}

export default function ProjectsSection({
  projects,
  onProjectSelect,
}: ProjectsSectionProps) {
  return (
    <div>
      <h3 className="mb-8 flex items-center gap-3">
        <Icon name="folder" size={30} className="text-orange-500" />
        <span>Projects</span>
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            aria-label={`${project.title} 프로젝트 자세히 보기`}
            className="group relative block w-full text-left bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
            onClick={() => onProjectSelect(String(project.id))}
          >
            <div
              className={`h-32 bg-linear-to-br ${project.color} flex items-center justify-center`}
            >
              {project.icon ? (
                <span className="text-6xl group-hover:scale-110 transition-transform">
                  {project.icon}
                </span>
              ) : (
                <Icon
                  name="folder"
                  size={48}
                  className="text-white drop-shadow-md group-hover:scale-110 transition-transform"
                />
              )}
            </div>
            <div className="p-6">
              <h4 className="mb-2">{project.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {project.period}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 border-2 border-orange-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </button>
        ))}
      </div>
    </div>
  );
}
