import { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types';
import { ExternalLink, Github, ChevronRight, Layers, CheckCircle, BarChart3, Database } from 'lucide-react';

export default function ProjectsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const categories = ['All', 'Full-Stack', 'Systems & APIs', 'AI & Data Engineering', 'Frontend', 'DevOps & Cloud'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  const toggleExpand = (id: string) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-12" id="projects-showcase-section">
      {/* Category selector */}
      <div className="flex flex-wrap gap-2 justify-center" id="projects-filter-nav">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              id={`project-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                setSelectedCategory(category);
                setExpandedProjectId(null); // Reset expansions on filter
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border ${
                isSelected
                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/35 font-bold'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:border-slate-705'
              } cursor-pointer`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Projects display grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="projects-display-grid">
        {filteredProjects.map((project) => {
          const isExpanded = expandedProjectId === project.id;
          return (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className={`bg-slate-900/50 border rounded-2xl transition-all duration-300 overflow-hidden group ${
                isExpanded
                  ? 'border-indigo-500/30 ring-1 ring-indigo-500/10 shadow-2xl shadow-indigo-950/25'
                  : 'border-slate-800/80 hover:border-slate-700/80 hover:shadow-xl hover:shadow-slate-950/30'
              }`}
            >
              {/* Card top decorative header color block */}
              <div className={`h-1.5 bg-linear-to-r ${project.thumbnailColor}`} />

              <div className="p-6 space-y-4">
                {/* Header indicators */}
                <div className="flex justify-between items-start gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-wider text-indigo-400 uppercase bg-indigo-500/5 border border-indigo-500/15 py-0.5 px-2 rounded-full font-bold">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-serif text-slate-100 group-hover:text-indigo-300 transition-colors pt-1">
                      {project.title}
                    </h3>
                  </div>

                  {/* External Links */}
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 bg-slate-950/40 transition-all hover:scale-105"
                        title="View source code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg border border-slate-800 hover:border-slate-700 text-indigo-400 hover:text-indigo-300 bg-indigo-500/5 transition-all hover:scale-105"
                        title="View live demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Short core description */}
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {project.description}
                </p>

                {/* Key operational outcome benchmark metric if available */}
                {project.metrics && (
                  <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-3 flex items-center gap-2.5">
                    <BarChart3 className="w-4 h-4 text-indigo-450 shrink-0" />
                    <span className="text-xs font-mono font-medium text-indigo-300">
                      Metric KPI: {project.metrics}
                    </span>
                  </div>
                )}

                {/* Key tags list */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] text-slate-500 bg-slate-950/60 font-mono py-1 px-2.5 rounded-md border border-slate-850">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Toggle details action */}
                <div className="pt-2">
                  <button
                    id={`toggle-details-btn-${project.id}`}
                    onClick={() => toggleExpand(project.id)}
                    className={`text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                      isExpanded
                        ? 'text-indigo-400 font-bold'
                        : 'text-slate-400 hover:text-indigo-300'
                    }`}
                  >
                    <span>{isExpanded ? 'Collapse Architecture Specs' : 'Explore System Architecture'}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90 text-indigo-400' : ''}`} />
                  </button>
                </div>

                {/* Expanded architectural view section */}
                {isExpanded && (
                  <div className="border-t border-slate-800/80 pt-4 mt-4 space-y-4 animate-fade-in" id={`project-details-${project.id}`}>
                    {/* Architecture description block */}
                    {project.architectureDetails && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-slate-300 text-xs font-semibold font-mono">
                          <Layers className="w-3.5 h-3.5 text-slate-400" />
                          <span>System Design Specs</span>
                        </div>
                        <p className="text-xs text-slate-400 font-sans leading-relaxed p-3 bg-slate-950/40 rounded-xl border border-slate-805 select-text">
                          {project.architectureDetails}
                        </p>
                      </div>
                    )}

                    {/* Features list */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-slate-300 text-xs font-semibold font-mono">
                        <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Core Functional Implementations</span>
                      </div>
                      <ul className="space-y-1.5 pl-1.5">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex gap-2 text-xs text-slate-400 font-sans leading-relaxed">
                            <span className="text-indigo-500 font-bold shrink-0 font-mono select-none">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
