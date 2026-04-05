"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Database, FileCode2, Layout, Smartphone, PieChart, Server, Terminal } from "lucide-react";

const STACK = [
  { name: "Machine Learning", icon: BrainCircuit, color: "text-purple-500" },
  { name: "Python", icon: Terminal, color: "text-amber-500" },
  { name: "Data Analytics", icon: PieChart, color: "text-blue-500" },
  { name: "React Native", icon: Smartphone, color: "text-indigo-500" },
  { name: "Supabase", icon: Database, color: "text-emerald-500" },
  { name: "UI/UX Design", icon: Layout, color: "text-rose-400" },
  { name: "Frontend Dev", icon: FileCode2, color: "text-orange-500" },
  { name: "Backend APIs", icon: Server, color: "text-red-500" },
];

export const TechStack = () => {
  // Duplicate array for infinite scroll effect
  const loopingStack = [...STACK, ...STACK, ...STACK];

  return (
    <section id="stack" className="py-24 border-y border-[var(--color-surface-border)] bg-[var(--color-background)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-foreground)] text-center font-serif">
          The <span className="italic text-[var(--color-primary-accent)] drop-shadow-sm">ArsenaI</span>
        </h2>
      </div>

      <div className="relative flex w-full overflow-hidden mask-horizontal-fades">
        <div className="flex w-max animate-marquee space-x-12 py-4 hover:[animation-play-state:paused]">
          {loopingStack.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={`${tech.name}-${index}`}
                className="group flex flex-col items-center justify-center gap-4 min-w-[120px] cursor-pointer"
              >
                <div className="p-4 rounded-2xl bg-white border border-[var(--color-surface-border)] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FBFEFB] group-hover:border-[var(--color-primary-accent)] group-hover:shadow-md">
                  <Icon 
                    size={36} 
                    className={`text-[var(--color-text-secondary)] transition-colors duration-300 group-hover:${tech.color}`}
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors duration-300 group-hover:text-[var(--color-foreground)]">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
