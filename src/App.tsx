/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  MessageCircle,
  Terminal,
  Cpu,
  Database,
  Layers,
  Sparkles,
  Command,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { engineerProfile } from './data/portfolioData';
// @ts-ignore
import founderPortrait from './assets/images/ge.jpg';
import InteractiveTerminal from './components/InteractiveTerminal';
import SkillsGrid from './components/SkillsGrid';
import ProjectsShowcase from './components/ProjectsShowcase';
import Timeline from './components/Timeline';
import ContactForm from './components/ContactForm';

const TYPING_STRINGS = [
  'Full-Stack Web Development.',
  'Corporate Business Logistics.',
  'Artist Promotion & Media.',
  'Precision Farm Orchestration.',
  'Gourmet Agri-Processing.',
  'Real Estate Broker Systems.',
  'Logistics-Driven Laundry Care.',
];

export default function App() {
  const [activeStringIndex, setActiveStringIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Auto-typing simulator hook
  useEffect(() => {
    let timer: any;
    const currentFullStr = TYPING_STRINGS[activeStringIndex];
    
    const typingSpeed = isDeleting ? 30 : 60;
    
    const handleType = () => {
      if (!isDeleting) {
        setDisplayText(currentFullStr.substring(0, displayText.length + 1));
        if (displayText.length === currentFullStr.length) {
          timer = setTimeout(() => setIsDeleting(true), 2500); // Wait on full text
        } else {
          timer = setTimeout(handleType, typingSpeed);
        }
      } else {
        setDisplayText(currentFullStr.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setActiveStringIndex((prev) => (prev + 1) % TYPING_STRINGS.length);
        } else {
          timer = setTimeout(handleType, typingSpeed);
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, activeStringIndex]);

  // Set real time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update active section state index while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'operations', 'skills', 'projects', 'timeline', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
    setActiveSection(id);
  };

  const navLinks = [
    { id: 'hero', label: 'Overview' },
    { id: 'operations', label: 'Engine Shell' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Creations' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-x-hidden">
      {/* Background Decorative Mesh Layout */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1000px] pointer-events-none opacity-25 select-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[130px]" />
        <div className="absolute top-[10%] left-[60%] w-[400px] h-[400px] rounded-full bg-indigo-650/10 blur-[110px]" />
        <div className="absolute top-[40%] left-[10%] w-[450px] h-[450px] rounded-full bg-indigo-950/20 blur-[120px]" />
      </div>

      {/* Global CSS Grid Pattern layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080d24_1px,transparent_1px),linear-gradient(to_bottom,#080d24_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40 z-0" />

      {/* Primary Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection('hero')}
              className="group flex items-center gap-3 text-left cursor-pointer"
            >
              <div className="w-8 h-8 bg-indigo-500 rounded-sm flex items-center justify-center font-bold text-white font-mono text-sm leading-none transition-transform group-hover:scale-105">G</div>
              <span className="text-sm font-semibold tracking-[0.18em] text-white uppercase font-sans">GEORGE AWONUSI</span>
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => scrollToSection(link.id)}
                  className={`py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all border-b-2 ${
                    isActive
                      ? 'text-indigo-400 border-indigo-500/80 font-bold'
                      : 'text-slate-400 hover:text-white border-transparent hover:border-slate-705'
                  } cursor-pointer`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* User Links / Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={engineerProfile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 border border-slate-800 hover:border-slate-705 bg-slate-900/40 rounded-lg text-slate-400 hover:text-indigo-400 transition-all hover:scale-105"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={engineerProfile.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 border border-slate-800 hover:border-slate-705 bg-slate-900/40 rounded-lg text-slate-400 hover:text-pink-400 transition-all hover:scale-105"
              title="Instagram Profile"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={engineerProfile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 border border-slate-800 hover:border-slate-750 bg-slate-900/40 rounded-lg text-slate-400 hover:text-emerald-400 transition-all hover:scale-105"
              title="WhatsApp Chat"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-555 text-white font-semibold text-xs uppercase tracking-wider rounded-md shadow-lg shadow-indigo-950/40 hover:shadow-indigo-500/25 transition-all cursor-pointer font-sans"
            >
              Inquire
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-slate-800 bg-slate-900/30 text-slate-400 hover:text-slate-200 transition-all"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-900 bg-[#020617]/95 backdrop-blur-lg py-4 px-4 space-y-1.5 animate-fade-in shadow-xl">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-mobile-${link.id}`}
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-[0.15em] flex items-center justify-between ${
                    isActive
                      ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              );
            })}
            <div className="pt-4 border-t border-slate-900 flex flex-col gap-2">
              <div className="flex gap-2">
                <a
                  href={engineerProfile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 border border-slate-850 bg-slate-900/20 text-slate-400 rounded-xl flex items-center justify-center gap-2 text-xs font-mono"
                >
                  <Linkedin className="w-4 h-4 text-indigo-400" />
                  LinkedIn
                </a>
                <a
                  href={engineerProfile.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 border border-slate-850 bg-slate-900/20 text-slate-400 rounded-xl flex items-center justify-center gap-2 text-xs font-mono"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  Instagram
                </a>
              </div>
              <a
                href={engineerProfile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 border border-slate-855 bg-slate-900/20 text-slate-400 rounded-xl flex items-center justify-center gap-2 text-xs font-mono"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp Chat
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Structural Layout Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 space-y-28">
        
        {/* SECTION 1: HERO / LANDING */}
        <section id="hero" className="pt-8 md:pt-16 pb-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Biography & Titles */}
            <div className="lg:col-span-7 space-y-6">
              {/* Top micro badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-[#6366f1] uppercase bg-indigo-500/5 border border-indigo-500/15 py-1 px-3 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
                  Observability Standard Verified
                </span>
                <span className="text-[10px] font-mono tracking-widest text-indigo-300 uppercase bg-slate-900 border border-slate-800 py-1 px-3 rounded-full flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  ZALLY ENTERPRISES
                </span>
              </div>

              {/* Title blocks */}
              <div className="space-y-4">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-indigo-400">Hi, my name is GEORGE AWONUSI</h2>
                <h1 className="text-4xl sm:text-5xl lg:text-5xl font-serif text-white leading-tight italic max-w-2xl">
                  Building resilient systems for the modern web.
                </h1>
                
                {/* Dynamically typing phrase */}
                <div className="h-10 flex items-center">
                  <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-slate-450 font-mono">
                    Specializing in <span className="text-indigo-400 font-bold underline decoration-indigo-500/30 underline-offset-4">{displayText}</span>
                    <span className="animate-pulse font-bold text-indigo-500">|</span>
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans max-w-xl">
                {engineerProfile.bio}
              </p>

              {/* Elegant Favorite Quote Block */}
              <div className="relative border-l-2 border-indigo-500 pl-4 py-2 bg-indigo-950/20 rounded-r-xl max-w-xl">
                <p className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold mb-1">Favorite Quote</p>
                <blockquote className="text-xs sm:text-xs text-slate-300 italic font-serif leading-relaxed">
                  "PEOPLE SAYS EVERTHING IS WRITTEN AND NOTHING CAN BE CHANGED, BUT I WANNA CHANGE IT ALL AND GO BACK TO THE BEGINNING, WHEN NOTHING WAS WRITTEN."
                  <span className="block mt-1 font-sans not-italic text-[10px] font-semibold text-indigo-300 tracking-wider">
                    — "ENI NI OLA ANA, MAKE A DIFFERENCE WHILE YOU LIVING"
                  </span>
                </blockquote>
              </div>

              {/* Action Triggers */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollToSection('operations')}
                  className="px-5 py-3 bg-indigo-600 hover:bg-indigo-555 text-white font-semibold text-xs tracking-wider uppercase rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-indigo-500/15 hover:scale-[1.02] cursor-pointer"
                >
                  Launch Engine Shell
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-5 py-3 bg-[#0a0f1e] hover:bg-slate-900 border border-slate-800 hover:border-slate-705 text-slate-400 hover:text-white font-semibold text-xs tracking-wider uppercase rounded-lg flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  Explore Creations
                </button>
              </div>
            </div>

            {/* Quick stats visual widget columns */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full" />
              <div className="relative bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-2xl space-y-5">
                
                {/* Visual Founder Portrait Container */}
                <div className="relative w-full aspect-[3/4] max-w-sm mx-auto rounded-xl overflow-hidden border border-slate-800/80 group bg-slate-950 shadow-xl shadow-indigo-950/30">
                  <img 
                    src={founderPortrait} 
                    referrerPolicy="no-referrer"
                    alt="George Awonusi" 
                    className="w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-transparent opacity-95" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 font-mono">GEORGE AWONUSI</p>
                    <p className="text-[10px] text-slate-300 font-sans leading-tight mt-0.5">Founder, ZALLY ENTERPRISES</p>
                  </div>
                  {/* Technology Overlay Indicators */}
                  <span className="absolute top-3 right-3 text-[8px] font-mono bg-indigo-950/80 border border-indigo-550/45 py-1 px-2.5 rounded-md text-indigo-300 font-bold animate-pulse">
                    PORTRAIT TRACE ACTIVE
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs font-mono text-slate-500 border-b border-slate-800/60 pb-3">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-indigo-450" />
                    <span>system_observability.sys</span>
                  </div>
                  <span>v1.4.2</span>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 gap-4">
                  {engineerProfile.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/60 p-4 rounded-lg border border-slate-850/80 hover:border-slate-800 transition-colors"
                    >
                      <p className="text-xl font-bold text-indigo-400 font-serif">{stat.value}</p>
                      <p className="text-[10px] text-slate-400 font-sans leading-tight mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Trace connection detail */}
                <div className="bg-slate-950/40 border border-slate-850 rounded-lg p-3 flex items-center justify-between text-[11px] font-mono select-none">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-mono text-[9px] text-slate-500">TIMESTAMP:</span>
                    <span className="text-slate-400 text-[10px]">{currentTime || 'calculating...'}</span>
                  </div>
                  <span className="text-[9px] text-emerald-400 font-bold bg-emerald-950/30 border border-emerald-900/30 py-0.5 px-2 rounded tracking-wider">ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: OPERATIONS SANDBOX TERMINAL */}
        <section id="operations" className="space-y-8 scroll-mt-20">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 bg-indigo-505/5 border border-indigo-500/15 py-1 px-4 rounded-full">Interactive Runtime Sandbox</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white leading-tight italic">Active Operation Simulations</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              Interact with deep, live technical mocks outlining my system operation pipelines. Witness the logging structures, benchmark metrics, and disk compaction rates that empower high-performance networks.
            </p>
          </div>

          <InteractiveTerminal />
        </section>

        {/* SECTION 3: SKILLS MATRIX */}
        <section id="skills" className="space-y-8 scroll-mt-20">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 bg-indigo-505/5 border border-indigo-500/15 py-1 px-4 rounded-full">Skill Matrices</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white leading-tight italic">Languages & Core Tooling Stack</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              A comprehensive directory highlighting proficiency weights based on actual engineering implementations. Switch categories to explore language syntax expertise, distributed cloud components, and design capabilities.
            </p>
          </div>

          <SkillsGrid />
        </section>

        {/* SECTION 4: PROJECTS SHOWCASE */}
        <section id="projects" className="space-y-8 scroll-mt-20">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 bg-indigo-505/5 border border-indigo-500/15 py-1 px-4 rounded-full">Featured Systems</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white leading-tight italic">Production & Storage Architectures</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              A showcase of engineered system layouts ranging from write-optimized disk storage key-value engines to real-time container orchestrators. Filter categories to evaluate specific engineering outcomes.
            </p>
          </div>

          <ProjectsShowcase />
        </section>

        {/* SECTION 5: EDUCATION/EXPERIENCE TIMELINE */}
        <section id="timeline" className="space-y-8 scroll-mt-20">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 bg-indigo-505/5 border border-indigo-500/15 py-1 px-4 rounded-full">Milestones Trace</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white leading-tight italic">Work Experience & Academic Foundations</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              A trace log displaying my career trajectory, outlining core microservices migration processes, load optimization SLAs, database tuning achievements, and academic distributed research roots.
            </p>
          </div>

          <Timeline />
        </section>

        {/* SECTION 6: CONTACT FORM */}
        <section id="contact" className="space-y-8 scroll-mt-20">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 bg-indigo-505/5 border border-indigo-500/15 py-1 px-4 rounded-full">Get In Touch</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white leading-tight italic">Relay Communication Stream</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              Reach out to establish professional consultancies, request source audits, or discuss distributed systems engineering, latency benchmarks, and multi-tenant architectures.
            </p>
          </div>

          <ContactForm />
        </section>

      </main>

      {/* Global Systems Footer */}
      <footer className="border-t border-slate-900 bg-[#020617] py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start px-1">
              <div className="w-6 h-6 bg-indigo-500 rounded-sm flex items-center justify-center font-bold text-white font-mono text-xs leading-none">G</div>
              <span className="text-xs font-semibold tracking-[0.18em] text-white uppercase font-sans">GEORGE AWONUSI</span>
            </div>
            <p className="text-[11px] text-slate-500 font-sans mt-2">
              &copy; {new Date().getFullYear()} Zally Enterprises & George Awonusi. All operational systems, rosters, and logs fully compiled.
            </p>
          </div>

          {/* Socials & Status */}
          <div className="flex flex-col items-center md:items-end gap-3.5">
            {/* Icons */}
            <div className="flex gap-4">
              <a
                href={engineerProfile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 hover:text-indigo-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={engineerProfile.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 hover:text-pink-400 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={engineerProfile.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 hover:text-sky-400 transition-colors"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={engineerProfile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 hover:text-emerald-500 transition-colors"
                title="WhatsApp Chat"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            {/* Micro-System status checks */}
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-555 border border-slate-900 px-3 py-1 rounded-lg bg-slate-950">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Zally Secure Gateway Active</span>
              <span className="text-slate-700">•</span>
              <span>SLA Response Rate: 100%</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
