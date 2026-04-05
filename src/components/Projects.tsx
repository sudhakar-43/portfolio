"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PROJECTS = [
  {
    title: "AgriAid",
    description: "A comprehensive smart farming application featuring a native AI voice assistant designed specifically to help farmers optimize their yield and troubleshoot agricultural issues.",
    tags: ["Python", "React Native", "Supabase", "Machine Learning", "Voice UI"],
    featured: true,
    github: "#",
    demo: "#",
  },
  {
    title: "Neural Vision API",
    description: "Scalable computer vision API for real-time object detection and anomaly recognition using optimized machine learning models.",
    tags: ["Python", "TensorFlow", "FastAPI", "Docker"],
    featured: false,
    github: "#",
    demo: "#",
  },
  {
    title: "Data Insights Platform",
    description: "An interactive dashboard for visualizing complex datasets, tracking KPIs, and generating automated reports using predictive analytics.",
    tags: ["Next.js", "TypeScript", "D3.js", "PostgreSQL"],
    featured: false,
    github: "#",
    demo: "#",
  }
];

export const Projects = () => {
  return (
    <section id="work" className="py-24 relative bg-[var(--color-surface)]/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 font-serif text-black">
            Selected <span className="italic text-[var(--color-primary-accent)]">Works</span>.
          </h2>
          <p className="text-black/70 text-lg max-w-2xl font-sans font-light">
            A showcase of my recent endeavors in machine learning, full-stack development, and data science.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
              className="group p-8 flex flex-col justify-between h-full min-h-[420px] rounded-[2rem] border border-[var(--color-surface-border)] overflow-hidden relative shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-white via-[#FCFAFC] to-[#F2EFEA]"
            >
              {/* Aesthetic light glow inside the card */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--color-primary-accent)]/15 rounded-full blur-[60px] group-hover:bg-[var(--color-primary-accent)]/25 transition-colors duration-500 pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F5E6E8]/40 rounded-full blur-[60px] pointer-events-none" />

              <div className="flex justify-between items-start mb-8 relative z-10 transition-transform duration-500">
                {project.featured ? (
                  <span className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black bg-black/5 rounded-full border border-black/10 backdrop-blur-sm">
                    Featured
                  </span>
                ) : (
                  <span className="px-4 py-1.5 opacity-0">Placeholder</span> 
                )}
                <div className="flex gap-4">
                  <a href={project.github} className="text-black/40 hover:text-black transition-colors transform hover:scale-110"><GithubIcon size={22} /></a>
                  <a href={project.demo} className="text-black/40 hover:text-black transition-colors transform hover:scale-110"><ExternalLink size={22} /></a>
                </div>
              </div>

              <div className="mt-auto relative z-10">
                <h3 className="text-2xl font-bold mb-4 font-serif text-black">{project.title}</h3>
                <p className="text-black/80 leading-relaxed mb-8 text-sm font-medium">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 text-xs font-semibold text-black/90 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] rounded-lg border border-[var(--color-surface-border)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
