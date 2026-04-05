"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Home } from "lucide-react";

export const Navigation = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const links = ["About", "Stack", "Home", "Work", "Contact"];

  return (
    <>
      {/* Editorial Logo - Fixed Top Left */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-8 left-8 z-50"
      >
        <Link href="/" className="text-2xl font-bold tracking-tight text-black hover:text-[#D0B8AC] transition-colors font-serif italic">
          Sudhakar.
        </Link>
      </motion.div>

      {/* Floating App-Style Dock - Fixed Bottom Center */}
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md rounded-full p-2 border border-black/5 shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center gap-1"
      >
        {links.map((item) => {
          const isHome = item === "Home";
          return (
            <Link
              key={item}
              href={isHome ? "#home" : `#${item.toLowerCase()}`}
              onMouseEnter={() => setHovered(item)}
              onMouseLeave={() => setHovered(null)}
              className="relative px-6 py-3 text-[10px] md:text-xs font-bold tracking-[0.1em] text-black/50 hover:text-black transition-colors rounded-full uppercase flex items-center justify-center"
            >
              {hovered === item && (
                <motion.div
                  layoutId="nav-hover-bg"
                  className="absolute inset-0 bg-[#F9F7F3]/80 rounded-full z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center">
                {isHome ? (
                  <Home size={22} strokeWidth={hovered === "Home" ? 3 : 2} className="transition-all duration-300" />
                ) : (
                  item
                )}
              </span>
            </Link>
          );
        })}
      </motion.nav>
    </>
  );
};
