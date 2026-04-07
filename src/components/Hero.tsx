"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    damping: 25, 
    stiffness: 100,
    restDelta: 0.001 
  });

  const heroY = useTransform(smoothProgress, [0, 0.5], ["0px", "-150px"]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);

  // Masking effect state
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
    <section id="home" ref={containerRef} className="relative w-full h-[100dvh] min-h-[800px] overflow-hidden bg-[var(--color-background)] font-sans">
      
      {/* ===== LAYER 0: BACKGROUND WATERMARK & GLOW ===== */}
      <div className="absolute top-10 md:top-20 left-0 w-full flex justify-center pointer-events-none z-0 px-4">
        <h1 className="text-[13vw] font-bold leading-none text-[var(--color-text-secondary)] opacity-[0.08] whitespace-nowrap">
          PRATHIPATI SUDHAKAR
        </h1>
      </div>
      
      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[var(--color-primary-accent)] opacity-40 blur-[100px] pointer-events-none z-0"></div>

      {/* ===== LAYER 1: MID-BACK TEXT ===== */}
      <motion.div 
        style={{ y: heroY, opacity: heroOpacity }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none pb-20 overflow-visible -translate-y-16 md:-translate-y-24 lg:-translate-y-32"
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full relative flex justify-center lg:justify-start lg:pl-[5vw] mb-6"
        >
           {/* Moved left by increasing right margin and font size increased */}
           <p className="text-2xl md:text-3xl lg:text-4xl text-[var(--color-foreground)] font-medium mb-3 mr-[20vw] md:mr-[40vw]">
            Hey <span className="inline-block animate-wave">👋</span>, I specialize in AI & Data Science
          </p>
        </motion.div>

        {/* Scaled vertically to fit width but look tall, plus mouse hover animation */}
        <motion.h1 
          ref={titleRef as any}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-[9vw] md:text-[8.5vw] tracking-tighter leading-none text-center font-bold whitespace-nowrap px-4 drop-shadow-sm transform scale-y-[1.8] origin-center pointer-events-auto"
          style={{
            "--cursor-x": "50%",
            "--cursor-y": "50%",
            "--mask-opacity": "0",
          } as React.CSSProperties}
        >
           {/* Base Layer */}
           <span className="block text-[var(--color-foreground)] pointer-events-none">
             PRATHIPATI SUDHAKAR
           </span>

           {/* Top Masked Overlay for color change on mouse drag/hover */}
           <span 
            aria-hidden="true"
            className="absolute inset-0 block text-[var(--color-primary-accent)] pointer-events-none transition-opacity duration-300 z-10 scale-100"
            style={{
              opacity: "var(--mask-opacity)",
              WebkitMaskImage: "radial-gradient(circle 300px at var(--cursor-x) var(--cursor-y), black 20%, transparent 85%)",
              maskImage: "radial-gradient(circle 300px at var(--cursor-x) var(--cursor-y), black 20%, transparent 85%)",
            }}
          >
            PRATHIPATI SUDHAKAR
          </span>
        </motion.h1>
      </motion.div>

      {/* ===== LAYER 2: PORTRAIT IMAGE ===== */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none z-20 overflow-visible">
        <motion.img 
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src="/profile-transparent.png" 
          alt="Prathipati Sudhakar" 
          /* Scaled to fit 70% of the page height */
          className="h-[70vh] w-auto max-w-full object-contain drop-shadow-2xl brightness-95 origin-bottom"
          onError={(e) => {
             (e.target as HTMLImageElement).src = '/Gemini_Generated_Image_wjy09rwjy09rwjy0.png';
          }}
        />
      </div>

      {/* ===== LAYER 3: FOREGROUND UI ===== */}
      <div className="absolute inset-0 z-30 flex flex-col justify-between pointer-events-none px-6 py-8 md:px-12 md:py-10">
        
        {/* Top Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full flex justify-between items-start pointer-events-auto"
        >
          {/* Changed name to Prathipati, increased font size */}
          <span className="text-xl md:text-2xl uppercase font-extrabold text-[var(--color-foreground)] tracking-wide">
            Prathipati Sudhakar
          </span>
        </motion.div>

        {/* Middle Right Scroll text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 pointer-events-auto"
        >
          <div className="w-[1px] h-20 bg-[var(--color-foreground)]/30"></div>
          <span className="[writing-mode:vertical-rl] text-[12px] tracking-[0.3em] uppercase text-[var(--color-foreground)]/70 font-bold rotate-180">
            SCROLL
          </span>
        </motion.div>

        {/* Bottom Footer - Replaced 2025, increased fonts */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full flex flex-col md:flex-row justify-between items-end text-base text-[var(--color-foreground)]/90 pointer-events-auto mt-auto gap-8"
        >
          
          {/* Contact Info (Bottom Left) */}
          <div className="flex flex-col gap-8 md:w-1/3">
            <div className="text-sm font-bold uppercase tracking-wider">OCT 9 2004</div>
            <div className="flex flex-col gap-2 mt-auto">
              <span className="font-bold text-sm md:text-base tracking-wide flex items-center">
                <span className="opacity-50 mr-3 text-xs">E</span> ben0632h@gmail.com
              </span>
              <span className="font-bold text-sm md:text-base tracking-wide flex items-center">
                <span className="opacity-50 mr-3 text-xs">T</span> 7330983640
              </span>
            </div>
          </div>

          {/* Bio & Social (Bottom Right) */}
          <div className="flex flex-col items-end gap-8 md:w-1/3 text-right">
            <p className="max-w-[380px] leading-relaxed text-sm md:text-base font-semibold">
              I build intelligent algorithms, scalable data pipelines, and forward-looking AI solutions. My main tools of choice are Python, machine learning frameworks, and advanced data analytics ecosystems.
            </p>
            <div className="flex flex-wrap justify-end gap-x-5 gap-y-2 text-sm font-extrabold tracking-wider">
               <a href="#" className="hover:text-[var(--color-primary-accent)] hover:scale-105 transition-all">/ Twitter (X)</a>
               <a href="#" className="hover:text-[var(--color-primary-accent)] hover:scale-105 transition-all">/ LinkedIn</a>
               <a href="#" className="hover:text-[var(--color-primary-accent)] hover:scale-105 transition-all">/ GitHub</a>
               <a href="#" className="hover:text-[var(--color-primary-accent)] hover:scale-105 transition-all">/ CodePen</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
