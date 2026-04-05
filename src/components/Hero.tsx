"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useRef } from "react";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Setup scroll-linked parallax for the background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    damping: 25, 
    stiffness: 100,
    restDelta: 0.001 
  });

  // Parallax and fade effects for the background image
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);

  // Main Hero Exit Animations
  // Slower, smoother transitions when scrolling down or returning up
  const heroY = useTransform(smoothProgress, [0, 0.5], ["0px", "-150px"]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.5], [1, 0.85]);

  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (!titleRef.current) return;
    const rect = titleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    titleRef.current.style.setProperty("--cursor-x", `${x}px`);
    titleRef.current.style.setProperty("--cursor-y", `${y}px`);
  };

  const handleMouseEnter = () => {
    if (titleRef.current) {
      titleRef.current.style.setProperty("--mask-opacity", "1");
    }
  };

  const handleMouseLeave = () => {
    if (titleRef.current) {
      titleRef.current.style.setProperty("--mask-opacity", "0");
    }
  };

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image Background Layer */}
      <motion.div 
        className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-[var(--color-background)]"
        style={{ y: bgY, opacity: bgOpacity }}
      >
        <img 
          src="/Gemini_Generated_Image_wjy09rwjy09rwjy0.png" 
          alt="Hero background" 
          className="absolute inset-0 w-full h-full object-cover object-top opacity-50 mix-blend-multiply scale-[1.05] translate-x-[3cm] translate-y-[1cm]"
        />

        {/* Depth Masking: Radial blur center-to-edge + Linear fade downward blending */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--color-background)_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-background)]/40 to-[var(--color-background)] pointer-events-none" />
      </motion.div>

      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-24"
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
      >
        <motion.h1
          ref={titleRef as any}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center justify-center font-bold mb-8 font-serif"
          style={{
            "--cursor-x": "50%",
            "--cursor-y": "50%",
            "--mask-opacity": "0",
          } as React.CSSProperties}
        >
          {/* Base Layer */}
          <span className="flex flex-col items-center w-full">
            <span className="block text-[var(--color-foreground)] text-[clamp(1.8rem,6vw,5.5rem)] leading-[1.1] tracking-[-0.02em] whitespace-nowrap">
              Building Intelligent
            </span>
            <span className="block text-[var(--color-primary-accent)] text-[clamp(2rem,7.5vw,6.5rem)] leading-[1.1] tracking-[-0.02em] whitespace-nowrap drop-shadow-sm italic">
              AI & Data Solutions.
            </span>
          </span>

          {/* Top Masked Layer */}
          <span 
            aria-hidden="true"
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 z-10"
            style={{
              opacity: "var(--mask-opacity)",
              WebkitMaskImage: "radial-gradient(circle 200px at var(--cursor-x) var(--cursor-y), black 20%, transparent 85%)",
              maskImage: "radial-gradient(circle 200px at var(--cursor-x) var(--cursor-y), black 20%, transparent 85%)",
            }}
          >
            <span className="block text-[var(--color-primary-accent)] text-[clamp(1.8rem,6vw,5.5rem)] leading-[1.1] tracking-[-0.02em] whitespace-nowrap">
              Building Intelligent
            </span>
            <span className="block text-[var(--color-foreground)] text-[clamp(2rem,7.5vw,6.5rem)] leading-[1.1] tracking-[-0.02em] whitespace-nowrap drop-shadow-sm italic">
              AI & Data Solutions.
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-xl md:text-2xl text-[var(--color-text-secondary)] leading-[1.6] mb-12 font-sans font-light"
        >
          I build intelligent, scalable applications that solve real-world problems through machine learning and elegant user experiences.
        </motion.p>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="group flex items-center justify-center gap-2 px-8 py-3.5 w-full sm:w-auto text-sm font-semibold text-white bg-[var(--color-foreground)] rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_3px_rgba(0,0,0,0.1)] hover:bg-[var(--color-primary-accent)] hover:text-[var(--color-foreground)] hover:scale-105 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_10px_25px_rgba(0,0,0,0.2)] transition-all duration-300 ease-in-out"
          >
            View Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <a
            href="#contact"
            className="group flex items-center justify-center gap-2 px-8 py-3.5 w-full sm:w-auto text-sm font-semibold text-[var(--color-foreground)] bg-[var(--color-primary-accent)] rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_3px_rgba(0,0,0,0.05)] hover:bg-[var(--color-foreground)] hover:text-white hover:scale-105 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_10px_25px_rgba(0,0,0,0.2)] transition-all duration-300 ease-in-out"
          >
            Let's Connect
            <Mail size={16} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
