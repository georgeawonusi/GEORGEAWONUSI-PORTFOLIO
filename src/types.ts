export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Full-Stack' | 'Systems & APIs' | 'AI & Data Engineering' | 'Frontend' | 'DevOps & Cloud';
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  metrics?: string; // e.g. "99.9% uptime achieved", "Reduced database latency by 45%"
  architectureDetails?: string; // Describe system design, e.g. "Event-driven architecture built with Kafka and Go"
  features: string[];
  thumbnailColor: string; // Tailwind class like "from-emerald-500 to-teal-600"
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'Languages' | 'Backend Systems' | 'Cloud & DevOps' | 'Frontend & Tools';
  yearsOfExp: number;
}

export interface TimelineItem {
  id: string;
  type: 'experience' | 'education';
  title: string; // e.g., Senior Software Engineer / Computer Science BS
  organization: string; // e.g., Google, Stanford University
  location: string;
  period: string; // e.g., 2024 - Present
  description: string[];
  technologies?: string[];
}
