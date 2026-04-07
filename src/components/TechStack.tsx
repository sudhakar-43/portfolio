"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  BrainCircuit,
  Database,
  FileCode2,
  Layout,
  Smartphone,
  PieChart,
  Server,
  Terminal,
  Code2,
  GitBranch,
  Globe,
  Palette,
  BarChart3,
  Cpu,
  Cloud,
  Layers,
  Box,
  PenTool,
  Workflow,
  BookOpen,
  Rocket,
  Sparkles,
} from "lucide-react";

/* ──────────────────── SKILL DATA ──────────────────── */

interface Skill {
  name: string;
  icon: React.ElementType;
  proficiency: number; // 0-100
  color: string; // hex for glow
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
  accentGradient: string;
}

const CATEGORIES: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    description: "Building intelligent systems that learn and adapt",
    accentGradient: "from-[#C9A892] to-[#A67F6B]",
    skills: [
      { name: "Machine Learning", icon: BrainCircuit, proficiency: 90, color: "#C9A892" },
      { name: "Deep Learning", icon: Cpu, proficiency: 82, color: "#B89583" },
      { name: "Data Science", icon: PieChart, proficiency: 92, color: "#D0B8AC" },
      { name: "Data Analytics", icon: BarChart3, proficiency: 95, color: "#C2A391" },
      { name: "NLP", icon: BookOpen, proficiency: 78, color: "#BFA089" },
      { name: "Computer Vision", icon: Sparkles, proficiency: 75, color: "#A6887A" },
    ],
  },
  {
    title: "Languages & Frameworks",
    description: "The tools I write intelligent software with",
    accentGradient: "from-[#B89583] to-[#8B7A70]",
    skills: [
      { name: "Python", icon: Terminal, proficiency: 95, color: "#C9A892" },
      { name: "JavaScript", icon: Code2, proficiency: 88, color: "#B89583" },
      { name: "TypeScript", icon: FileCode2, proficiency: 85, color: "#D0B8AC" },
      { name: "React / Next.js", icon: Globe, proficiency: 88, color: "#C2A391" },
      { name: "React Native", icon: Smartphone, proficiency: 82, color: "#BFA089" },
      { name: "Node.js", icon: Server, proficiency: 80, color: "#A6887A" },
    ],
  },
  {
    title: "Design & Frontend",
    description: "Crafting beautiful, accessible user experiences",
    accentGradient: "from-[#D0B8AC] to-[#B89583]",
    skills: [
      { name: "UI/UX Design", icon: Layout, proficiency: 85, color: "#D0B8AC" },
      { name: "Figma", icon: PenTool, proficiency: 88, color: "#C9A892" },
      { name: "Tailwind CSS", icon: Palette, proficiency: 90, color: "#B89583" },
      { name: "Framer Motion", icon: Workflow, proficiency: 82, color: "#C2A391" },
      { name: "Responsive Design", icon: Layers, proficiency: 92, color: "#BFA089" },
      { name: "3D / WebGL", icon: Box, proficiency: 65, color: "#A6887A" },
    ],
  },
  {
    title: "Backend & DevOps",
    description: "Scalable infrastructure and reliable deployments",
    accentGradient: "from-[#A6887A] to-[#8B7A70]",
    skills: [
      { name: "REST APIs", icon: Server, proficiency: 90, color: "#C9A892" },
      { name: "Supabase", icon: Database, proficiency: 88, color: "#B89583" },
      { name: "PostgreSQL", icon: Database, proficiency: 85, color: "#D0B8AC" },
      { name: "Git / GitHub", icon: GitBranch, proficiency: 92, color: "#C2A391" },
      { name: "Cloud Services", icon: Cloud, proficiency: 78, color: "#BFA089" },
      { name: "CI/CD", icon: Rocket, proficiency: 75, color: "#A6887A" },
    ],
  },
];

/* ──────────────── SKILL CARD COMPONENT ──────────────── */

const SkillCard = ({
  skill,
  index,
  categoryIndex,
}: {
  skill: Skill;
  index: number;
  categoryIndex: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const Icon = skill.icon;
  const delay = categoryIndex * 0.1 + index * 0.06;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0.5, y: 0.5 });
      }}
      onMouseMove={handleMouseMove}
      style={{
        transform: isHovered
          ? `perspective(600px) rotateX(${(mousePos.y - 0.5) * -8}deg) rotateY(${(mousePos.x - 0.5) * 8}deg)`
          : "perspective(600px) rotateX(0deg) rotateY(0deg)",
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
      }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
        style={{ backgroundColor: skill.color + "40" }}
      />

      <div className="relative flex flex-col items-center gap-3 p-5 md:p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-surface-border)] transition-all duration-300 group-hover:border-[var(--color-primary-accent)] group-hover:shadow-lg cursor-default overflow-hidden">
        {/* Radial spotlight on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${skill.color}15 0%, transparent 60%)`,
          }}
        />

        {/* Icon */}
        <div className="relative z-10 p-3 rounded-xl bg-gradient-to-br from-[var(--color-background)] to-[var(--color-surface)] border border-[var(--color-surface-border)] transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--color-primary-accent)] group-hover:shadow-md">
          <Icon
            size={28}
            className="text-[var(--color-text-secondary)] transition-colors duration-300 group-hover:text-[var(--color-foreground)]"
            strokeWidth={1.5}
          />
        </div>

        {/* Name */}
        <span className="relative z-10 text-sm font-semibold text-[var(--color-text-secondary)] transition-colors duration-300 group-hover:text-[var(--color-foreground)] text-center leading-tight">
          {skill.name}
        </span>

        {/* Proficiency bar */}
        <div className="relative z-10 w-full mt-1">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]/60">
              Skill
            </span>
            <span className="text-[10px] font-bold text-[var(--color-text-secondary)]/80 tabular-nums">
              {skill.proficiency}%
            </span>
          </div>
          <div className="h-1 w-full rounded-full bg-[var(--color-surface-border)] overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: skill.color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.proficiency}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ──────────── CATEGORY SECTION COMPONENT ──────────── */

const CategorySection = ({
  category,
  categoryIndex,
}: {
  category: SkillCategory;
  categoryIndex: number;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={sectionRef}
      className="relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
    >
      {/* Category header */}
      <motion.div
        className="mb-6 md:mb-8"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: categoryIndex * 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className={`h-[2px] w-8 rounded-full bg-gradient-to-r ${category.accentGradient}`} />
          <h3 className="text-lg md:text-xl font-bold text-[var(--color-foreground)] tracking-tight font-serif">
            {category.title}
          </h3>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] ml-11 font-medium">
          {category.description}
        </p>
      </motion.div>

      {/* Skills grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {category.skills.map((skill, index) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            index={index}
            categoryIndex={categoryIndex}
          />
        ))}
      </div>
    </motion.div>
  );
};

/* ──────────── FLOATING STAT COUNTER ──────────── */

const StatCounter = ({
  value,
  label,
  suffix = "",
  delay = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-1 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)] font-serif tabular-nums"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: delay + 0.2 }}
      >
        {isInView ? value : 0}
        {suffix}
      </motion.span>
      <span className="text-xs md:text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  );
};

/* ══════════════ MAIN TECH STACK COMPONENT ══════════════ */

export const TechStack = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      id="stack"
      ref={containerRef}
      className="relative py-20 md:py-32 bg-[var(--color-background)] overflow-hidden"
    >
      {/* ── Background decorative elements ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        {/* Large accent circle */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[var(--color-primary-accent)] opacity-[0.04] blur-3xl" />
        <div className="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full bg-[var(--color-secondary-accent)] opacity-[0.05] blur-3xl" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </motion.div>

      {/* ── Section Header ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-20">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "auto" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--color-primary-accent)]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
              Skills & Expertise
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--color-primary-accent)]" />
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-foreground)] font-serif leading-[1.1]">
            The{" "}
            <span className="relative inline-block">
              <span className="italic text-[var(--color-primary-accent)]">Arsenal</span>
              {/* Underline accent */}
              <motion.div
                className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-secondary-accent)]"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </h2>

          {/* Subtitle */}
          <motion.p
            className="mt-4 md:mt-6 max-w-xl text-base md:text-lg text-[var(--color-text-secondary)] font-medium leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A curated toolkit of technologies, frameworks, and disciplines I wield to build intelligent, beautiful software.
          </motion.p>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          className="flex justify-center items-center gap-0 mt-10 md:mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <StatCounter value={24} suffix="+" label="Technologies" delay={0.5} />
          <div className="w-[1px] h-10 bg-[var(--color-surface-border)]" />
          <StatCounter value={4} label="Domains" delay={0.6} />
          <div className="w-[1px] h-10 bg-[var(--color-surface-border)]" />
          <StatCounter value={3} suffix="+" label="Years" delay={0.7} />
        </motion.div>
      </div>

      {/* ── Category Sections ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 space-y-14 md:space-y-20">
        {CATEGORIES.map((category, i) => (
          <CategorySection key={category.title} category={category} categoryIndex={i} />
        ))}
      </div>

      {/* ── Bottom Marquee — Infinite Scroll ── */}
      <div className="relative z-10 mt-16 md:mt-24">
        <div className="relative flex w-full overflow-hidden mask-horizontal-fades">
          <div className="flex w-max animate-marquee space-x-6 md:space-x-10 py-4 hover:[animation-play-state:paused]">
            {[...CATEGORIES.flatMap((c) => c.skills), ...CATEGORIES.flatMap((c) => c.skills)].map(
              (skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={`marquee-${skill.name}-${index}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] text-sm font-medium text-[var(--color-text-secondary)] whitespace-nowrap transition-all duration-300 hover:border-[var(--color-primary-accent)] hover:text-[var(--color-foreground)] hover:shadow-sm cursor-default"
                  >
                    <Icon size={14} strokeWidth={1.5} />
                    {skill.name}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-surface-border)] to-transparent" />
    </section>
  );
};
