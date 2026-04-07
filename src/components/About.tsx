"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
} from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import {
  Sparkles,
  GraduationCap,
  Code2,
  BrainCircuit,
  MapPin,
  Calendar,
  Coffee,
  Rocket,
  ArrowUpRight,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const JOURNEY = [
  {
    year: "2004",
    title: "Born with Curiosity",
    desc: "From taking apart gadgets to writing first lines of code — the spark started early.",
    icon: Sparkles,
    color: "#D0B8AC",
  },
  {
    year: "2022",
    title: "University Begins",
    desc: "B.Tech journey in Computer Science — diving deep into algorithms and AI foundations.",
    icon: GraduationCap,
    color: "#A8C5DA",
  },
  {
    year: "2023",
    title: "Full-Stack & ML",
    desc: "Building production-grade apps blending React, Python, and machine learning.",
    icon: Code2,
    color: "#B8D4BE",
  },
  {
    year: "2025",
    title: "AI Architect",
    desc: "Designing intelligent systems bridging advanced AI research and real outcomes.",
    icon: BrainCircuit,
    color: "#C5B3D4",
  },
];

const FACTS = [
  { icon: MapPin, label: "Based in", value: "India", num: "IN" },
  { icon: Calendar, label: "Age", value: "21", num: "21" },
  { icon: Coffee, label: "Fueled by", value: "Curiosity", num: "∞" },
  { icon: Rocket, label: "Mission", value: "Build Future", num: "01" },
];

const PRINCIPLES = [
  {
    num: "01",
    title: "Think in Systems",
    desc: "Design architectures that scale and adapt to the unknown.",
    emoji: "🧠",
  },
  {
    num: "02",
    title: "Ship with Purpose",
    desc: "Impact over perfection — iterate fast, stay clear.",
    emoji: "🚀",
  },
  {
    num: "03",
    title: "Never Stop Learning",
    desc: "Experiment, read papers, build constantly, repeat.",
    emoji: "📚",
  },
];

const MARQUEE_TEXT = "ABOUT • SUDHAKAR • DATA SCIENCE • AI ENGINEER • FULL STACK • CREATIVE TECH • ";

/* ═══════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════ */

/* Animated counter (counts from 0 → target as element scrolls in) */
function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return { count, ref };
}

/* Mouse-aware parallax */
function useMouseParallax(strength: number = 20) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = useCallback(
    (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      x.set(((e.clientX - cx) / cx) * strength);
      y.set(((e.clientY - cy) / cy) * strength);
    },
    [x, y, strength]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [handleMouse]);

  return { x, y };
}

/* ═══════════════════════════════════════════════════════
   ANIMATED TEXT  — letter-by-letter split
   ═══════════════════════════════════════════════════════ */

const SplitText = ({
  children,
  className = "",
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, rotateX: 0 }
              : { opacity: 0, y: 40, rotateX: -90 }
          }
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

/* ═══════════════════════════════════════════════════════
   WORD-BY-WORD REVEAL (scroll-linked)
   ═══════════════════════════════════════════════════════ */

const ScrollRevealWords = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.6"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <WordSpan key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </WordSpan>
        );
      })}
    </p>
  );
};

const WordSpan = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [8, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="mr-[0.35em] mb-1 inline-block will-change-transform"
    >
      {children}
    </motion.span>
  );
};

/* ═══════════════════════════════════════════════════════
   MAGNETIC BUTTON HOVER EFFECT
   ═══════════════════════════════════════════════════════ */

const MagneticWrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.3);
    y.set(dy * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const springX = useSpring(x, { damping: 15, stiffness: 150 });
  const springY = useSpring(y, { damping: 15, stiffness: 150 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════
   3D TILT CARD
   ═══════════════════════════════════════════════════════ */

const TiltCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springRotateX = useSpring(rotateX, { damping: 20, stiffness: 200 });
  const springRotateY = useSpring(rotateY, { damping: 20, stiffness: 200 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 8);
    rotateY.set(dx * 8);
    glareX.set(((e.clientX - rect.left) / rect.width) * 100);
    glareY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1000,
      }}
      className={`${className} will-change-transform`}
    >
      {/* Glare overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════
   HORIZONTAL SCROLL SECTION (pinned)
   ═══════════════════════════════════════════════════════ */

const HorizontalScroll = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const springX = useSpring(x, { damping: 60, stiffness: 30, mass: 1.5 });

  return (
    <div ref={containerRef} className="relative h-[120vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x: springX }} className="flex gap-8 pl-[10vw]">
          {children}
        </motion.div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   FADE SECTION (with fade-out on scroll past)
   ═══════════════════════════════════════════════════════ */

const FadeSection = ({
  children,
  className = "",
  fadeOut = true,
}: {
  children: React.ReactNode;
  className?: string;
  fadeOut?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 0.2"],
  });

  const smooth = useSpring(scrollYProgress, { damping: 20, stiffness: 80, restDelta: 0.001 });

  const opacity = useTransform(
    smooth,
    fadeOut ? [0, 0.15, 0.85, 1] : [0, 0.15, 1],
    fadeOut ? [0, 1, 1, 0] : [0, 1, 1]
  );
  const y = useTransform(
    smooth,
    fadeOut ? [0, 0.15, 0.85, 1] : [0, 0.15, 1],
    fadeOut ? [30, 0, 0, -20] : [30, 0, 0]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity, y }}>{children}</motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   STAGGERED ENTRANCE (child with cascade delay)
   ═══════════════════════════════════════════════════════ */

const Cascade = ({
  children,
  className = "",
  index = 0,
  direction = "up" as "up" | "left" | "right",
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
  direction?: "up" | "left" | "right";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      scale: 0.95,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};



/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */

export const About = () => {
  const mouse = useMouseParallax(15);
  const sectionRef = useRef<HTMLElement>(null);

  /* Hero scroll-linked transforms */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroP } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroP, [0, 0.45], [1, 0]);
  const heroY = useTransform(heroP, [0, 0.5], [0, -100]);
  const heroScale = useTransform(heroP, [0, 0.5], [1, 0.92]);
  const heroBgScale = useTransform(heroP, [0, 1], [1, 1.2]);

  /* Stats counter */
  const proj = useCounter(15);
  const tech = useCounter(25);
  const coffee = useCounter(999);

  return (
    <section id="about" ref={sectionRef} className="relative bg-[var(--color-background)] overflow-hidden pt-28 md:pt-32">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ✦  SECTION 1 — CINEMATIC HERO
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated mesh gradient blobs */}
        <motion.div
          style={{ x: mouse.x, y: mouse.y, scale: heroBgScale }}
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-[var(--color-primary-accent)] opacity-25 blur-[130px] pointer-events-none animate-mesh"
        />
        <motion.div
          style={{
            x: useTransform(mouse.x, (v) => -v * 0.7),
            y: useTransform(mouse.y, (v) => -v * 0.7),
          }}
          className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-[var(--color-secondary-accent)] opacity-30 blur-[100px] pointer-events-none"
        />

        {/* Giant rotated watermark */}
        <motion.div
          style={{ y: useTransform(heroP, [0, 1], [0, -200]) }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span className="text-[22vw] font-bold text-[var(--color-foreground)] opacity-[0.025] tracking-tighter whitespace-nowrap rotate-[-5deg]">
            ABOUT ME
          </span>
        </motion.div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl"
        >
          {/* Tag */}
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[var(--color-surface-border)] bg-white/70 backdrop-blur-xl text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-text-secondary)] mb-10 shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary-accent)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-primary-accent)]" />
            </span>
            The Person Behind the Code
          </motion.span>

          {/* Heading — letter-by-letter split */}
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-[0.92]">
            <SplitText delay={0.4}>Crafting the</SplitText>
            <br />
            <span className="italic text-[var(--color-primary-accent)] relative inline-block">
              <SplitText delay={0.7}>Future</SplitText>
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 w-full h-4 text-[var(--color-primary-accent)] opacity-40"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M0 8 Q50 0 100 8 T200 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                />
              </motion.svg>
            </span>
            <br />
            <SplitText delay={0.9}>with Intelligence</SplitText>
          </h2>

          {/* Paragraph — word-by-word reveal */}
          <ScrollRevealWords
            text="I'm Sudhakar — a Data Science student, AI engineer, and creative technologist passionate about solving real-world problems through elegant code and intelligent systems."
            className="mt-10 text-lg md:text-xl leading-relaxed text-[var(--color-text-secondary)] max-w-2xl font-light justify-center"
          />

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-7 h-11 rounded-full border-2 border-[var(--color-foreground)]/15 flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-accent)]"
              />
            </motion.div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-text-secondary)]/40 font-bold">
              Scroll to explore
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ✦  MARQUEE DIVIDER — infinite scrolling text
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <FadeSection className="py-4 overflow-hidden border-y border-[var(--color-surface-border)]/50" fadeOut={true}>
        <div className="mask-horizontal-fades">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="text-[5vw] md:text-[3vw] font-bold tracking-wider text-[var(--color-foreground)] opacity-[0.06] uppercase mx-2 select-none"
              >
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ✦  SECTION 2 — BIO BENTO GRID (3D tilt cards)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <FadeSection className="relative w-full py-10 md:py-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section label with animated lines */}
          <Cascade>
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-px flex-1 bg-[var(--color-surface-border)] origin-right"
              />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-[var(--color-text-secondary)]">
                Who I Am
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-px flex-1 bg-[var(--color-surface-border)] origin-left"
              />
            </div>
          </Cascade>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
            {/* Main bio — 3D tilt */}
            <Cascade direction="left" index={0} className="md:col-span-7">
              <TiltCard className="group h-full p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-white via-[#FDFBF9] to-[#F8F3EE] border border-[var(--color-surface-border)] shadow-sm relative overflow-hidden cursor-default">
                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[var(--color-primary-accent)]/10 blur-[70px] group-hover:bg-[var(--color-primary-accent)]/25 transition-colors duration-700 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-primary-accent)]/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />

                <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-primary-accent)] mb-5">
                  Biography
                </span>

                <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-[var(--color-foreground)] leading-tight mb-6">
                  Turning Data into{" "}
                  <span className="italic text-[var(--color-primary-accent)] relative">
                    Decisions
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--color-primary-accent)]/40 origin-left"
                    />
                  </span>
                </h3>

                <div className="space-y-4 text-[var(--color-text-secondary)] leading-relaxed font-light text-[15px]">
                  <p>
                    I&apos;m a B.Tech Computer Science student with a relentless drive
                    to build AI-powered solutions that make a real difference. My
                    journey started with a fascination for how machines can learn
                    patterns the way humans do.
                  </p>
                  <p>
                    From developing smart farming assistants with voice AI to
                    architecting scalable data pipelines, every project is a step
                    toward bridging cutting-edge research and practical impact.
                  </p>
                </div>
              </TiltCard>
            </Cascade>

            {/* Right column — stacked */}
            <div className="md:col-span-5 flex flex-col gap-5 md:gap-6">
              {/* Quick Facts with counters */}
              <Cascade direction="right" index={1}>
                <TiltCard className="group p-7 rounded-[2rem] bg-white border border-[var(--color-surface-border)] shadow-sm relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-secondary-accent)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />

                  <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-primary-accent)] mb-5">
                    Quick Facts
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    {FACTS.map((fact, fi) => {
                      const Icon = fact.icon;
                      return (
                        <Cascade key={fact.label} index={fi + 2} direction="up">
                          <div className="flex items-start gap-3 group/fact">
                            <div className="mt-0.5 p-2.5 rounded-xl bg-[var(--color-secondary-accent)]/30 group-hover/fact:bg-[var(--color-primary-accent)]/20 transition-colors duration-300">
                              <Icon
                                size={17}
                                className="text-[var(--color-foreground)] group-hover/fact:text-[var(--color-primary-accent)] transition-colors duration-300"
                                strokeWidth={1.8}
                              />
                            </div>
                            <div>
                              <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                                {fact.label}
                              </span>
                              <span className="block text-sm font-semibold text-[var(--color-foreground)] mt-0.5">
                                {fact.value}
                              </span>
                            </div>
                          </div>
                        </Cascade>
                      );
                    })}
                  </div>
                </TiltCard>
              </Cascade>

              {/* Quote card */}
              <Cascade direction="right" index={3}>
                <TiltCard className="group relative p-7 rounded-[2rem] bg-[var(--color-foreground)] text-white shadow-lg overflow-hidden">
                  {/* Animated rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                    className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full border border-white/10 pointer-events-none"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                    className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full border border-white/5 pointer-events-none"
                  />

                  <span className="text-6xl font-serif leading-none opacity-20 absolute top-4 left-6 select-none">
                    &ldquo;
                  </span>
                  <p className="relative text-lg md:text-xl font-serif italic leading-relaxed mt-6 mb-4 opacity-95">
                    The best way to predict the future is to build it with
                    data, design, and determination.
                  </p>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.25em] opacity-40">
                    — My Guiding Principle
                  </span>
                </TiltCard>
              </Cascade>
            </div>
          </div>

          {/* Stats Bar */}
          <Cascade index={4} className="mt-5">
            <div className="grid grid-cols-3 gap-4">
              {[
                { refObj: proj, label: "Projects Built", suffix: "+" },
                { refObj: tech, label: "Technologies", suffix: "+" },
                { refObj: coffee, label: "Cups of Chai", suffix: "+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  ref={stat.refObj.ref}
                  className="group text-center p-6 rounded-2xl border border-[var(--color-surface-border)] bg-white/50 hover:bg-white hover:shadow-lg transition-all duration-500"
                >
                  <span className="block text-3xl md:text-4xl font-serif font-bold text-[var(--color-foreground)] tabular-nums">
                    {stat.refObj.count}
                    <span className="text-[var(--color-primary-accent)]">{stat.suffix}</span>
                  </span>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-secondary)] mt-2">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Cascade>
        </div>
      </FadeSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ✦  SECTION 3 — HORIZONTAL SCROLL TIMELINE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative overflow-hidden">
        <HorizontalScroll>
          {/* Intro panel */}
          <div className="flex-shrink-0 w-[90vw] md:w-[40vw] flex flex-col justify-center pr-12">
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[var(--color-primary-accent)] mb-3">
              My Path
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[var(--color-foreground)] leading-[0.92]">
              The <span className="italic text-[var(--color-primary-accent)]">Journey</span>
              <br />
              So Far
            </h2>
            <p className="mt-6 text-lg text-[var(--color-text-secondary)] font-light max-w-md leading-relaxed">
              Scroll horizontally through the milestones that shaped my career in technology and AI.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm font-bold text-[var(--color-text-secondary)]">
              <motion.div
                animate={{ x: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                →
              </motion.div>
              <span className="uppercase tracking-[0.2em] text-xs">Keep scrolling</span>
            </div>
          </div>

          {/* Journey cards */}
          {JOURNEY.map((item) => {
            const Icon = item.icon;
            return (
              <MagneticWrap
                key={item.year}
                className="flex-shrink-0 w-[85vw] md:w-[32vw] min-w-[320px]"
              >
                <div
                  className="group relative h-[50vh] max-h-[420px] p-8 md:p-10 rounded-[2.5rem] border border-[var(--color-surface-border)] bg-white shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden flex flex-col justify-between cursor-default"
                  style={{
                    background: `linear-gradient(135deg, white 60%, ${item.color}15 100%)`,
                  }}
                >
                  {/* Big number watermark */}
                  <span
                    className="absolute -top-6 -right-4 text-[10rem] font-bold leading-none opacity-[0.04] select-none pointer-events-none font-serif"
                  >
                    {item.year}
                  </span>

                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at top right, ${item.color}30, transparent 70%)`,
                    }}
                  />

                  {/* Top */}
                  <div>
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
                      style={{ backgroundColor: `${item.color}25` }}
                    >
                      <Icon
                        size={24}
                        strokeWidth={1.8}
                        style={{ color: item.color }}
                      />
                    </div>

                    <span
                      className="inline-block text-sm font-extrabold tracking-wider mb-2"
                      style={{ color: item.color }}
                    >
                      {item.year}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-foreground)] leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Bottom */}
                  <div>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed font-light text-[15px] mb-5">
                      {item.desc}
                    </p>

                    {/* Animated underline */}
                    <div className="h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              </MagneticWrap>
            );
          })}
        </HorizontalScroll>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ✦  SECTION 4 — CORE PRINCIPLES (flip reveal)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <FadeSection className="relative w-full py-10 md:py-16 overflow-hidden -mt-[114px]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Cascade>
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-[var(--color-primary-accent)]">
                What Drives Me
              </span>
              <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[var(--color-foreground)]">
                Core{" "}
                <span className="italic text-[var(--color-primary-accent)]">Principles</span>
              </h2>
            </div>
          </Cascade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {PRINCIPLES.map((p, i) => (
              <Cascade key={p.num} index={i} direction={i === 0 ? "left" : i === 2 ? "right" : "up"}>
                <MagneticWrap>
                  <div className="group relative p-8 md:p-10 rounded-[2.5rem] bg-white border border-[var(--color-surface-border)] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-full cursor-default">
                    {/* Watermark number */}
                    <span className="absolute -top-8 -right-4 text-[10rem] font-bold leading-none text-[var(--color-foreground)] opacity-[0.025] select-none pointer-events-none font-serif">
                      {p.num}
                    </span>

                    {/* Emoji that scales on hover */}
                    <motion.span
                      whileHover={{ scale: 1.3, rotate: 10 }}
                      className="inline-block text-4xl mb-5 cursor-default"
                    >
                      {p.emoji}
                    </motion.span>

                    <span className="block text-sm font-extrabold text-[var(--color-primary-accent)] mb-2 tracking-wider">
                      {p.num}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-foreground)] mb-3 leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed font-light text-[15px]">
                      {p.desc}
                    </p>

                    {/* Hover reveal line */}
                    <div className="mt-6 h-[2px] w-0 group-hover:w-full bg-[var(--color-primary-accent)] transition-all duration-700 ease-out" />

                    {/* Corner arrow */}
                    <div className="absolute top-8 right-8 w-10 h-10 rounded-full border border-[var(--color-surface-border)] flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-75 transition-all duration-500">
                      <ArrowUpRight size={16} className="text-[var(--color-primary-accent)]" />
                    </div>
                  </div>
                </MagneticWrap>
              </Cascade>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ✦  CLOSING QUOTE + BOTTOM MARQUEE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <FadeSection className="relative w-full py-10 overflow-hidden" fadeOut={false}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollRevealWords
            text="Every dataset tells a story. Every model solves a puzzle. Every line of code builds a bridge to tomorrow."
            className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-[var(--color-foreground)]/80 leading-relaxed justify-center"
          />

          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 mx-auto w-px h-10 bg-gradient-to-b from-[var(--color-primary-accent)] to-transparent origin-top"
          />
        </div>
      </FadeSection>
    </section>
  );
};
