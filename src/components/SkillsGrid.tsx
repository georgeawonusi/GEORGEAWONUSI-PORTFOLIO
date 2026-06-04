import { useState } from 'react';
import { skillsData, engineerProfile } from '../data/portfolioData';
import { Skill } from '../types';
import { Award, Code2, Cpu, GraduationCap, CheckCircle2 } from 'lucide-react';

export default function SkillsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Languages' | 'Backend Systems' | 'Cloud & DevOps' | 'Frontend & Tools'>('All');

  const categories = ['All', 'Languages', 'Backend Systems', 'Cloud & DevOps', 'Frontend & Tools'] as const;

  const filteredSkills = selectedCategory === 'All'
    ? skillsData
    : skillsData.filter((skill) => skill.category === selectedCategory);

  // Grouped stats for skill categories
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages': return Code2;
      case 'Backend Systems': return Cpu;
      case 'Cloud & DevOps': return Award;
      case 'Frontend & Tools': return GraduationCap;
      default: return Code2;
    }
  };

  return (
    <div className="space-y-8" id="skills-grid-section">
      {/* Filters and Category Selectors */}
      <div className="flex flex-wrap gap-2 justify-center" id="skills-filter-nav">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              id={`skills-filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border ${
                isSelected
                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/35 font-bold'
                  : 'bg-slate-900 border-slate-800/80 hover:text-slate-200 hover:border-slate-705'
              } cursor-pointer`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="skills-display-grid">
        {filteredSkills.map((skill, index) => {
          const CategoryIcon = getCategoryIcon(skill.category);
          return (
            <div
              key={skill.name}
              id={`skill-card-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 rounded-xl p-4 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/20 group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-slate-850 rounded-lg text-slate-400 group-hover:text-indigo-400 transition-colors">
                    <CategoryIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors font-mono">{skill.name}</h4>
                    <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">{skill.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-medium text-indigo-400">{skill.level}%</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                     className="h-full bg-linear-to-r from-indigo-500 to-violet-400 rounded-full group-hover:from-indigo-400 group-hover:to-fuchsia-400 transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>EXP: {skill.yearsOfExp} {skill.yearsOfExp === 1 ? 'Year' : 'Years'}</span>
                  <span>
                    {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Proficient'}
                  </span>
                </div>
              </div>

              {/* Accent microline indicator */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-indigo-500/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          );
        })}
      </div>

      {/* Methodology note */}
      <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex items-start gap-3 max-w-2xl mx-auto" id="skills-matrix-disclaimer">
        <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
        <div className="space-y-1">
          <p className="text-xs font-mono font-semibold text-slate-300">Continuous Assessment & Deployment</p>
          <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
            These rating weights represent actual engineering proficiencies tested on high-throughput, latency-critical systems. Knowledge values are self-calibrated against actual technical design complexity, robust testing intervals, and architectural maintenance loops.
          </p>
        </div>
      </div>
    </div>
  );
}
