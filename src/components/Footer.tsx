"use client";

import { motion } from "framer-motion";
import { MoveRight, ArrowUpRight } from "lucide-react";
import React from "react";

export const Footer = () => {
  return (
    <footer 
      id="contact" 
      className="pt-32 pb-12 relative bg-fixed bg-cover bg-center" 
      style={{ backgroundImage: "url('/contact.jpg')" }}
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-12 mb-16 gap-8">
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-serif text-slate-800 tracking-tighter leading-none italic pr-4">
            Let's Talk.
          </h2>
          <div className="text-left md:text-right">
            <p className="text-slate-500 uppercase tracking-[0.2em] text-xs font-bold mb-2">Based in</p>
            <p className="text-slate-800 text-lg font-medium">New York, NY (EST)</p>
          </div>
        </div>

        {/* New Layout replacing Bento Grid */}
        <div className="flex flex-col lg:flex-row w-full gap-16 lg:gap-12 mb-24">
          
          {/* Left Column: Direct links & Socials */}
          <div className="w-full lg:w-1/3 flex flex-col gap-16">
            
            {/* Direct Line */}
            <div>
              <p className="text-slate-500 uppercase tracking-[0.2em] text-xs font-bold mb-6">Direct Line</p>
              <a href="mailto:hello@sudhakar.com" className="text-slate-800 text-3xl lg:text-4xl font-serif hover:text-black hover:italic transition-all duration-300">
                hello@sudhakar.com
              </a>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-slate-500 uppercase tracking-[0.2em] text-xs font-bold mb-6">Socials</p>
              <div className="flex flex-col gap-3">
                {[
                  { name: "LinkedIn", href: "https://linkedin.com" },
                  { name: "GitHub", href: "https://github.com" },
                  { name: "Twitter", href: "https://twitter.com" },
                  { name: "Instagram", href: "https://instagram.com" },
                ].map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between text-slate-700 text-xl font-medium border-b border-black/5 pb-4 hover:border-black/50 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="text-slate-400 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>
            
          </div>

          {/* Right Column: Glassmorphic Contact Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white/20 backdrop-blur-2xl p-8 md:p-12 lg:p-16 rounded-[2.5rem] border border-white/60 shadow-[0_20px_40px_rgb(0,0,0,0.05)]">
              <h3 className="text-2xl font-semibold text-slate-800 mb-10">Send a Message</h3>
              
              <form className="flex flex-col gap-10">
                <div className="flex flex-col md:flex-row gap-10">
                  <div className="w-full relative group">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full bg-transparent border-b border-black/20 pb-4 text-slate-800 placeholder:text-slate-500 outline-none focus:border-black transition-colors peer" 
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 peer-focus:w-full"></div>
                  </div>
                  <div className="w-full relative group">
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full bg-transparent border-b border-black/20 pb-4 text-slate-800 placeholder:text-slate-500 outline-none focus:border-black transition-colors peer" 
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 peer-focus:w-full"></div>
                  </div>
                </div>
                
                <div className="relative group">
                  <textarea 
                    placeholder="Tell me about your project..." 
                    rows={4} 
                    className="w-full bg-transparent border-b border-black/20 pb-4 text-slate-800 placeholder:text-slate-500 outline-none focus:border-black transition-colors resize-none peer"
                  ></textarea>
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 peer-focus:w-full"></div>
                </div>
                
                <button type="button" className="group self-start md:self-end mt-4 flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-slate-900 text-white font-medium hover:bg-black hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Submit 
                  <MoveRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* --- Micro FOOTER line --- */}
        <div className="w-full pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-black/10">
          <p className="text-slate-600 text-sm font-medium">
             © {new Date().getFullYear()} Sudhakar. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm font-serif italic">
            Wishing you a beautiful day.
          </p>
        </div>

      </div>
    </footer>
  );
};


