import { useState } from 'react';
import { timelineData } from '../data/portfolioData';
import { TimelineItem } from '../types';
import { Briefcase, GraduationCap, Calendar, MapPin, Code } from 'lucide-react';

export default function Timeline() {
  const [filter, setFilter] = useState<'all' | 'experience' | 'education'>('all');

  const filteredTimeline = filter === 'all'
    ? timelineData
    : timelineData.filter((item) => item.type === filter);

  return (
    <div className="space-y-8" id="timeline-component">
      {/* Sub tabs filtering */}
      <div className="flex gap-2 justify-center" id="timeline-filter-nav">
        {(['all', 'experience', 'education'] as const).map((type) => {
          const label = type === 'all' ? 'Full Timeline' : type === 'experience' ? 'Work History' : 'Academic Profile';
          const isSelected = filter === type;
          return (
            <button
              key={type}
              id={`timeline-filter-${type}`}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border ${
                isSelected
                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/35 font-bold'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:border-slate-705'
              } cursor-pointer`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Visual vertical line timeline rendering */}
      <div className="relative border-l border-slate-805 pl-6 md:pl-8 space-y-10 max-w-3xl mx-auto py-4" id="timeline-milestones-list">
        {filteredTimeline.map((item, index) => {
          const IsJob = item.type === 'experience';
          const Icon = IsJob ? Briefcase : GraduationCap;

          return (
            <div
              key={item.id}
              id={`timeline-item-${item.id}`}
              className="relative group transition-all"
            >
              {/* Timeline marker icon node */}
              <div className="absolute -left-[39px] md:-left-[47px] top-1.5 p-2 rounded-full border border-slate-800 bg-slate-950 group-hover:border-indigo-500/40 group-hover:text-indigo-400 text-slate-500 transition-all shadow-md">
                <Icon className="w-4 h-4" />
              </div>

              {/* Main Content card */}
              <div className="bg-slate-900/40 border border-slate-800/60 hover:border-slate-700/60 group-hover:bg-slate-900/50 rounded-2xl p-6 transition-all space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-lg font-serif text-slate-100 group-hover:text-indigo-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm font-semibold text-indigo-400 font-mono">
                      {item.organization}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 items-center text-xs text-slate-505 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-600" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Bullets description layout */}
                <ul className="space-y-2 pl-4 list-disc text-xs text-slate-400 font-sans leading-relaxed">
                  {item.description.map((bullet, idx) => (
                    <li key={idx} className="marker:text-indigo-505/65">
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tagged systems / technologies lists */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono font-medium uppercase mr-1">
                      <Code className="w-3 h-3 text-slate-600" />
                      Stack:
                    </div>
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded-md border border-slate-850 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
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
