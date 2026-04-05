"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import { useRef } from "react";

export const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "start 10%"], // Extended range for sequential appearances
  });

  // Add smooth spring physics for buttery scroll animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // Scroll phase 1: The Story Behind the Data
  const headerY = useTransform(smoothProgress, [0, 0.25], ["80px", "0px"]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.25], [0, 1]);

  // Scroll phase 2: Biography Widget
  const card1Y = useTransform(smoothProgress, [0.25, 0.5], ["80px", "0px"]);
  const card1Opacity = useTransform(smoothProgress, [0.25, 0.5], [0, 1]);

  // Scroll phase 3: India Widget
  const card2Y = useTransform(smoothProgress, [0.5, 0.75], ["80px", "0px"]);
  const card2Opacity = useTransform(smoothProgress, [0.5, 0.75], [0, 1]);

  // Scroll phase 4: B.Tech and Pixel Widgets together
  const card3Y = useTransform(smoothProgress, [0.75, 1.0], ["80px", "0px"]);
  const card3Opacity = useTransform(smoothProgress, [0.75, 1.0], [0, 1]);

  const card4Y = useTransform(smoothProgress, [0.75, 1.0], ["80px", "0px"]);
  const card4Opacity = useTransform(smoothProgress, [0.75, 1.0], [0, 1]);

  return (
    <section ref={containerRef} id="about" className="py-32 bg-[var(--color-background)] relative overflow-hidden">
      {/* Decorative blurry gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D0B8AC]/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F1E8DC]/40 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-serif text-black tracking-tight leading-tight">
            The <span className="italic text-[#D0B8AC]">Story</span> <br />
            Behind the Data.
          </h2>

        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 auto-rows-[220px]">
          {/* Main Editorial Bio block (Spans 2x2) */}
          <motion.div
            style={{ y: card1Y, opacity: card1Opacity }}
            className="md:col-span-2 md:row-span-2 rounded-[2.5rem] bg-gradient-to-br from-white to-[#F9F7F3] border border-black/5 p-10 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.06)] transition-all duration-500 overflow-hidden relative group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8DCCB]/20 rounded-full blur-[50px] group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            
            <QuoteIcon className="text-[#D0B8AC]/20 w-20 h-20 absolute top-8 right-8" />

            <div className="relative z-10">
               <h3 className="text-xs font-bold uppercase tracking-widest text-[#D0B8AC] mb-8">Biography</h3>
               <p className="text-2xl md:text-3xl font-serif text-black leading-[1.4]">
                 "I believe that code should not only be highly functional, but <span className="italic text-[#D0B8AC]">beautiful</span>. As a Data Science student, my goal is to bridge the gap between complex algorithms and human-centric design."
               </p>
            </div>
            <div className="relative z-10 mt-12 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#D0B8AC] to-[#F1E8DC] animate-pulse shadow-inner border-2 border-white" />
              <div>
                <p className="font-bold text-black font-serif text-xl">Sudhakar Babu</p>
                <p className="text-black/50 text-xs font-bold uppercase tracking-wider mt-1">Data Science • Engineering</p>
              </div>
            </div>
          </motion.div>

          {/* Location Block (Spans 2 cols, 1 row) */}
          <motion.div
            style={{ y: card2Y, opacity: card2Opacity }}
            className="md:col-span-2 md:row-span-1 rounded-[2.5rem] bg-white border border-black/5 p-8 flex items-center shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.04)] transition-shadow duration-500 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:12px_12px] opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="relative z-10 flex w-full items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#D0B8AC] mb-3">Base of Operations</h3>
                <h4 className="text-4xl font-serif font-bold text-black mb-2">India</h4>
                <p className="text-black/60 font-medium text-sm">Available for global opportunities & remote work.</p>
              </div>
              <div className="p-5 bg-gradient-to-br from-white to-[#F9F7F3] rounded-full border border-black/5 shadow-sm text-[#D0B8AC] group-hover:text-black group-hover:scale-110 transition-all duration-500">
                <MapPin size={32} />
              </div>
            </div>
          </motion.div>

          {/* Education Block (Spans 1 col, 1 row) */}
          <motion.div
            style={{ y: card3Y, opacity: card3Opacity }}
            className="md:col-span-1 md:row-span-1 rounded-[2.5rem] bg-white border border-black/5 p-8 flex flex-col justify-center items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.04)] transition-shadow duration-500 group"
          >
            <GraduationCap size={36} className="text-[#D0B8AC] mb-5 group-hover:-translate-y-1 transition-transform duration-300" />
            <h4 className="text-2xl font-bold font-serif text-black mb-1">B.Tech</h4>
            <p className="text-black/60 text-sm font-medium leading-relaxed">Data Science<br/>Class of 2026</p>
          </motion.div>

          {/* Approach / Sparkles Block (Spans 1 col, 1 row) */}
          <motion.div
            style={{ y: card4Y, opacity: card4Opacity }}
            className="md:col-span-1 md:row-span-1 rounded-[2.5rem] bg-black border border-black/5 p-8 flex flex-col justify-center items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.1)] transition-shadow duration-500 group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[30px] group-hover:bg-white/20 transition-colors duration-500" />
            <Sparkles size={36} className="text-[#D0B8AC] mb-5 group-hover:rotate-12 transition-transform duration-300" />
            <h4 className="text-2xl font-bold font-serif text-white mb-1">Pixel</h4>
            <p className="text-white/70 text-sm font-medium">Perfect, every time.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const QuoteIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z" />
  </svg>
);
