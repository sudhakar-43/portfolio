"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, MotionValue } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ExternalLink, ArrowUpRight, Layers, Sparkles, ChevronRight } from "lucide-react";

/* ─── GitHub SVG Icon ─── */
const GithubIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

/* ─── Project Data ─── */
const PROJECTS = [
  {
    title: "AgriAid",
    description: "A comprehensive smart farming application featuring a native AI voice assistant designed specifically to help farmers optimize their yield and troubleshoot agricultural issues.",
    tags: ["Python", "React Native", "Supabase", "Machine Learning", "Voice UI"],
    featured: true,
    github: "#",
    demo: "#",
    category: "AI / ML",
    year: "2025",
    color: "#D0B8AC",
  },
  {
    title: "Neural Vision API",
    description: "Scalable computer vision API for real-time object detection and anomaly recognition using optimized machine learning models.",
    tags: ["Python", "TensorFlow", "FastAPI", "Docker"],
    featured: false,
    github: "#",
    demo: "#",
    category: "Computer Vision",
    year: "2025",
    color: "#C4A882",
  },
  {
    title: "Data Insights Platform",
    description: "An interactive dashboard for visualizing complex datasets, tracking KPIs, and generating automated reports using predictive analytics.",
    tags: ["Next.js", "TypeScript", "D3.js", "PostgreSQL"],
    featured: false,
    github: "#",
    demo: "#",
    category: "Data Science",
    year: "2024",
    color: "#B8A090",
  },
  {
    title: "SmartDoc AI",
    description: "An intelligent document processing pipeline that extracts, classifies, and summarizes information from unstructured documents using NLP.",
    tags: ["Python", "SpaCy", "Transformers", "Redis", "AWS"],
    featured: false,
    github: "#",
    demo: "#",
    category: "NLP",
    year: "2024",
    color: "#A89080",
  },
];

/* ─── Utility: useParallax ─── */
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

/* ─── 3D Tilt Card Component ─── */
const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { damping: 20, stiffness: 150 });
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { damping: 20, stiffness: 150 });
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { damping: 20, stiffness: 150 });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  // Staggered index number for the large background digit
  const displayIndex = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={cardRef}
      initial={{ y: 80, opacity: 0, scale: 0.95 }}
      animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer will-change-transform"
    >
      {/* Card Body */}
      <div className="relative p-8 md:p-10 rounded-[2rem] border border-[var(--color-surface-border)] overflow-hidden bg-gradient-to-br from-white via-[#FCFAFC] to-[#F2EFEA] min-h-[480px] flex flex-col justify-between transition-shadow duration-700 hover:shadow-[0_25px_60px_-15px_rgba(208,184,172,0.35)]">
        
        {/* Animated Glare Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[1] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
          }}
        />

        {/* Background Number */}
        <div className="absolute -top-6 -right-4 text-[10rem] font-serif font-bold leading-none text-black/[0.03] select-none pointer-events-none z-0 transition-all duration-700 group-hover:text-black/[0.06] group-hover:-translate-y-2">
          {displayIndex}
        </div>

        {/* Ambient Glow */}
        <div
          className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-[80px] pointer-events-none z-0 transition-all duration-700 group-hover:scale-125"
          style={{ backgroundColor: `${project.color}20` }}
        />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full blur-[60px] pointer-events-none z-0 bg-[#F5E6E8]/30" />

        {/* Top Row */}
        <div className="relative z-10 flex justify-between items-start mb-auto">
          <div className="flex items-center gap-3">
            {project.featured && (
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black bg-black/5 rounded-full border border-black/10 backdrop-blur-sm flex items-center gap-1.5"
              >
                <Sparkles size={10} /> Featured
              </motion.span>
            )}
            <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] bg-black/[0.03] rounded-full">
              {project.category}
            </span>
          </div>

          {/* Action Links */}
          <div className="flex gap-3 items-center">
            <motion.a
              href={project.github}
              whileHover={{ scale: 1.15, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl text-black/30 hover:text-black hover:bg-black/5 transition-all duration-300"
            >
              <GithubIcon size={18} />
            </motion.a>
            <motion.a
              href={project.demo}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl text-black/30 hover:text-black hover:bg-black/5 transition-all duration-300"
            >
              <ExternalLink size={18} />
            </motion.a>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 mt-auto">
          {/* Year */}
          <motion.span
            className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--color-text-secondary)]/60 mb-3 block"
            initial={{ x: -20, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
          >
            {project.year}
          </motion.span>

          {/* Title with underline animation */}
          <div className="relative inline-block mb-4">
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-black tracking-tight">
              {project.title}
            </h3>
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] rounded-full"
              style={{ backgroundColor: project.color }}
              initial={{ width: 0 }}
              animate={isHovered ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Description */}
          <p className="text-black/60 leading-relaxed mb-8 text-sm font-medium max-w-md">
            {project.description}
          </p>

          {/* Tags with staggered reveal */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIdx) => (
              <motion.span
                key={tag}
                initial={{ y: 10, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  delay: index * 0.15 + 0.3 + tagIdx * 0.05,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="px-3 py-1.5 text-[11px] font-semibold text-black/70 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-lg border border-[var(--color-surface-border)] hover:border-[var(--color-primary-accent)] hover:shadow-[0_4px_16px_rgba(208,184,172,0.2)] transition-all duration-300"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bottom Action Hint */}
        <motion.div
          className="absolute bottom-8 right-8 z-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-black/20 group-hover:text-black/50 transition-all duration-500"
          animate={isHovered ? { x: 4 } : { x: 0 }}
        >
          View Project <ArrowUpRight size={14} className="group-hover:rotate-12 transition-transform duration-300" />
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ─── Scroll Progress Bar ─── */
const ScrollProgress = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--color-primary-accent), #C4A882, var(--color-secondary-accent))",
      }}
    />
  );
};

/* ─── Section Header with Scroll Reveal ─── */
const SectionHeader = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  const titleChars = "Selected Works".split("");

  return (
    <div ref={headerRef} className="mb-20 md:mb-28 relative">
      {/* Decorative line */}
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: "80px" } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="h-[2px] bg-[var(--color-primary-accent)] mb-8"
      />

      {/* Category Label */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-3 mb-6"
      >
        <Layers size={14} className="text-[var(--color-primary-accent)]" />
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--color-text-secondary)]">
          Portfolio
        </span>
      </motion.div>

      {/* Main Title with per-character animation */}
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight font-serif text-black leading-[1.05] overflow-hidden">
        <span className="inline-flex flex-wrap">
          {titleChars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 80, opacity: 0, rotateX: 40 }}
              animate={isInView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.03,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`inline-block ${char === " " ? "w-[0.3em]" : ""} ${
                i >= 9 ? "italic text-[var(--color-primary-accent)]" : ""
              }`}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.8, type: "spring", stiffness: 200 }}
          className="text-[var(--color-primary-accent)] inline-block ml-1"
        >
          .
        </motion.span>
      </h2>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="text-black/50 text-base md:text-lg max-w-xl mt-6 font-sans font-light leading-relaxed"
      >
        A curated showcase of my recent endeavors in machine learning, full-stack development, and data science — each project a step toward building the future.
      </motion.p>

      {/* Right floating stat */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col items-end gap-1"
      >
        <span className="text-6xl font-serif font-bold text-black/10">{PROJECTS.length}</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
          Projects
        </span>
      </motion.div>
    </div>
  );
};

/* ─── Horizontal Scroll Featured Showcase ─── */
const FeaturedShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const featured = PROJECTS[0]; // AgriAid

  return (
    <motion.div
      ref={containerRef}
      initial={{ y: 60, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="mb-20 md:mb-32"
    >
      <div className="relative group rounded-[2.5rem] overflow-hidden border border-[var(--color-surface-border)] bg-gradient-to-br from-white via-[#FCFAFC] to-[#F2EFEA] hover:shadow-[0_30px_80px_-20px_rgba(208,184,172,0.4)] transition-all duration-700">
        
        {/* Large Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[20vw] font-serif font-bold text-black/[0.02] whitespace-nowrap select-none group-hover:tracking-[0.05em] transition-all duration-1000">
            FEATURED
          </span>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[var(--color-primary-accent)]/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-[var(--color-primary-accent)]/20 transition-all duration-700" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[var(--color-secondary-accent)]/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-stretch min-h-[400px]">
          {/* Left Content */}
          <div className="flex-1 p-10 md:p-14 lg:p-16 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="p-2 rounded-xl bg-black/5"
                >
                  <Sparkles size={16} className="text-[var(--color-primary-accent)]" />
                </motion.div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
                  Featured Project • {featured.year}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-black tracking-tight mb-6 leading-[1.1]">
                {featured.title}
              </h3>

              <p className="text-black/55 text-base md:text-lg leading-relaxed max-w-lg mb-10 font-light">
                {featured.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {featured.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ y: 15, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.5 }}
                    className="px-4 py-2 text-[11px] font-semibold text-black/65 bg-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-xl border border-[var(--color-surface-border)] backdrop-blur-sm"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-6">
              <motion.a
                href={featured.demo}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-black text-white text-sm font-bold rounded-full hover:bg-black/85 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                View Live <ArrowUpRight size={16} />
              </motion.a>
              <motion.a
                href={featured.github}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-7 py-3.5 text-black text-sm font-bold rounded-full border-2 border-black/10 hover:border-black/30 transition-colors duration-300"
              >
                <GithubIcon size={16} /> Source
              </motion.a>
            </div>
          </div>

          {/* Right Visual Panel */}
          <div className="flex-1 relative flex items-center justify-center p-10 lg:p-16 min-h-[300px]">
            {/* Abstract Decoration */}
            <div className="relative w-full max-w-sm aspect-square">
              {/* Rotating outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--color-primary-accent)]/20"
              />
              {/* Inner ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute inset-6 rounded-full border border-[var(--color-primary-accent)]/15"
              />
              {/* Center dot grid */}
              <div className="absolute inset-12 grid grid-cols-4 grid-rows-4 gap-3 items-center justify-items-center">
                {Array.from({ length: 16 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: [0.15, 0.5, 0.15] } : {}}
                    transition={{
                      scale: { delay: 0.5 + i * 0.04, duration: 0.4 },
                      opacity: { delay: 1 + i * 0.1, duration: 3, repeat: Infinity, repeatType: "reverse" },
                    }}
                    className="w-2 h-2 rounded-full bg-[var(--color-primary-accent)]"
                  />
                ))}
              </div>
              {/* Center Emblem */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--color-primary-accent)]/30 to-[var(--color-secondary-accent)]/20 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-lg"
                >
                  <span className="text-3xl font-serif font-bold text-black/50">A</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Category Filter Chips ─── */
const CategoryFilter = ({
  activeFilter,
  setActiveFilter,
}: {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}) => {
  const categories = ["All", ...new Set(PROJECTS.map((p) => p.category))];
  const filterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(filterRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={filterRef}
      initial={{ y: 20, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-wrap gap-3 mb-16"
    >
      {categories.map((cat, i) => (
        <motion.button
          key={cat}
          onClick={() => setActiveFilter(cat)}
          initial={{ y: 10, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] rounded-full border transition-all duration-300 ${
            activeFilter === cat
              ? "bg-black text-white border-black shadow-lg"
              : "bg-white/60 text-black/50 border-[var(--color-surface-border)] hover:border-[var(--color-primary-accent)] hover:text-black/80"
          }`}
        >
          {cat}
        </motion.button>
      ))}
    </motion.div>
  );
};

/* ─── Main Projects Section ─── */
export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS.filter((p) => !p.featured)
      : PROJECTS.filter((p) => p.category === activeFilter && !p.featured);

  // Background parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* ─── Ambient Background ─── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        {/* Top gradient fade from previous section */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[var(--color-background)] to-transparent" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

        {/* Large ambient glow */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[var(--color-primary-accent)]/8 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[var(--color-secondary-accent)]/10 rounded-full blur-[180px]" />
      </motion.div>

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <ScrollProgress scrollYProgress={scrollYProgress} />

        <SectionHeader />

        {/* Featured Project Showcase */}
        <FeaturedShowcase />

        {/* Filter Chips */}
        <CategoryFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 md:mt-28 flex flex-col items-center text-center"
        >
          <p className="text-[var(--color-text-secondary)] text-sm font-medium mb-6 max-w-md">
            Interested in collaborating or want to see more of my work?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-sm font-bold rounded-full hover:bg-black/85 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Let&apos;s Connect <ChevronRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
