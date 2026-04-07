"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Mail, Send, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import React, { useRef, useState } from "react";

/* ── Magnetic hover wrapper for social icons ── */
const MagneticIcon = ({ children, href, label }: { children: React.ReactNode; href: string; label: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="group relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-stone-800 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-colors duration-500 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      {/* Tooltip */}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {label}
      </span>
    </motion.a>
  );
};

/* ── Stagger animation variants ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const slideUp = {
  hidden: { y: 60, opacity: 0, filter: "blur(8px)" },
  visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
};

const slideRight = {
  hidden: { x: -40, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export const Footer = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* ═══════════════════ CONTACT SECTION ═══════════════════ */}
      <section
        id="contact"
        className="min-h-[93vh] w-full relative bg-fixed bg-cover bg-center flex flex-col justify-center"
        style={{ backgroundImage: "url('/contact.jpg')" }}
      >
        {/* ── Top gradient blend ── */}
        <div className="absolute -top-6 left-0 right-0 h-12 bg-gradient-to-b from-[var(--color-background)] via-[var(--color-background)]/80 to-transparent z-20 pointer-events-none" />

        {/* ── Tan overlay (unchanged) ── */}
        <div className="absolute inset-0 bg-[#e8dcc7]/30 mix-blend-multiply z-0 pointer-events-none" />

        {/* Google Fonts */}
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap');
        `}} />

        {/* ── Main content ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          variants={containerVariants}
          className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 py-[30px] md:py-[49px]"
        >
          {/* ── Section label ── */}
          <motion.div variants={slideRight} className="flex items-center gap-4 mb-3">
            <div className="w-12 h-[2px] bg-stone-800/40" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-stone-600" style={{ fontFamily: "'Inter', sans-serif" }}>
              Get In Touch
            </span>
          </motion.div>

          {/* ── Hero heading ── */}
          <motion.div variants={slideUp} className="mb-6 md:mb-8">
            <h2 className="flex flex-wrap items-baseline gap-3 md:gap-6">
              <span
                className="text-[2rem] sm:text-[2.8rem] md:text-[3.5rem] lg:text-[4.2rem] leading-[0.85] text-stone-900 tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800 }}
              >
                Let&apos;s
              </span>
              <span
                className="text-[2.5rem] sm:text-[3.2rem] md:text-[4rem] lg:text-[5rem] leading-[0.85] text-stone-800"
                style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
              >
                Talk
              </span>
            </h2>
            <motion.p
              variants={slideUp}
              className="mt-2 md:mt-3 max-w-lg text-stone-600 text-sm md:text-base leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
            >
              Have a project in mind or just want to say hello?
              <br className="hidden md:block" />
              I&apos;d love to hear from you.
            </motion.p>
          </motion.div>

          {/* ── Split layout: Form + Info ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start">

            {/* ──── LEFT: Contact Form (3 cols) ──── */}
            <motion.div variants={slideUp} className="lg:col-span-3">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="relative rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 p-5 md:p-6 shadow-[0_8px_50px_rgba(0,0,0,0.06)] overflow-hidden"
              >
                {/* Subtle ambient glow inside */}
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[var(--color-primary-accent)]/20 blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-[var(--color-secondary-accent)]/15 blur-[60px] pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  {/* Name */}
                  <div className="relative">
                    <motion.label
                      className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500 mb-2"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      animate={{ color: focusedField === "name" ? "#4A3B32" : "#78716c" }}
                    >
                      Your Name
                    </motion.label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="John Doe"
                      className="w-full bg-transparent border-b-2 border-stone-300/60 focus:border-stone-800 text-stone-900 text-lg py-3 outline-none transition-all duration-500 placeholder:text-stone-400/50"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-stone-800"
                      initial={{ width: "0%" }}
                      animate={{ width: focusedField === "name" ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <motion.label
                      className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500 mb-2"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      animate={{ color: focusedField === "email" ? "#4A3B32" : "#78716c" }}
                    >
                      Email Address
                    </motion.label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="john@example.com"
                      className="w-full bg-transparent border-b-2 border-stone-300/60 focus:border-stone-800 text-stone-900 text-lg py-3 outline-none transition-all duration-500 placeholder:text-stone-400/50"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-stone-800"
                      initial={{ width: "0%" }}
                      animate={{ width: focusedField === "email" ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <motion.label
                      className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500 mb-2"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      animate={{ color: focusedField === "message" ? "#4A3B32" : "#78716c" }}
                    >
                      Your Message
                    </motion.label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell me about your project..."
                      rows={4}
                      className="w-full bg-transparent border-b-2 border-stone-300/60 focus:border-stone-800 text-stone-900 text-lg py-3 outline-none transition-all duration-500 resize-none placeholder:text-stone-400/50"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-stone-800"
                      initial={{ width: "0%" }}
                      animate={{ width: focusedField === "message" ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative flex items-center gap-3 bg-stone-900 hover:bg-stone-800 text-white px-10 py-4 rounded-2xl text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-500 shadow-lg hover:shadow-2xl overflow-hidden"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {/* Shine sweep */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                    <span className="relative z-10">Send Message</span>
                    <Send size={16} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* ──── RIGHT: Info + Socials (2 cols) ──── */}
            <motion.div
              variants={containerVariants}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              {/* Contact details */}
              <motion.div variants={slideUp} className="space-y-8">
                <h3
                  className="text-xl font-bold text-stone-900 tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Contact Details
                </h3>

                <div className="space-y-5">
                  {/* Email */}
                  <a
                    href="mailto:ben0632h@gmail.com"
                    className="group flex items-start gap-4 hover:translate-x-1 transition-transform duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center text-stone-700 group-hover:bg-stone-900 group-hover:text-white group-hover:border-stone-900 transition-all duration-400 flex-shrink-0 mt-0.5">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-500 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Email
                      </p>
                      <p className="text-stone-800 font-medium text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                        ben0632h@gmail.com
                      </p>
                    </div>
                    <ArrowUpRight size={14} className="ml-auto text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1" />
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+917330983640"
                    className="group flex items-start gap-4 hover:translate-x-1 transition-transform duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center text-stone-700 group-hover:bg-stone-900 group-hover:text-white group-hover:border-stone-900 transition-all duration-400 flex-shrink-0 mt-0.5">
                      <Phone size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-500 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Phone
                      </p>
                      <p className="text-stone-800 font-medium text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                        +91 7330983640
                      </p>
                    </div>
                    <ArrowUpRight size={14} className="ml-auto text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1" />
                  </a>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center text-stone-700 flex-shrink-0 mt-0.5">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-500 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Location
                      </p>
                      <p className="text-stone-800 font-medium text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Divider */}
              <motion.div variants={scaleIn} className="w-full h-[1px] bg-gradient-to-r from-transparent via-stone-400/40 to-transparent" />

              {/* Social links */}
              <motion.div variants={slideUp} className="space-y-6">
                <h3
                  className="text-xl font-bold text-stone-900 tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Follow Me
                </h3>

                <div className="flex flex-wrap gap-4">
                  <MagneticIcon href="mailto:ben0632h@gmail.com" label="Email">
                    <Mail size={22} />
                  </MagneticIcon>
                  <MagneticIcon href="https://linkedin.com" label="LinkedIn">
                    <FaLinkedin size={22} />
                  </MagneticIcon>
                  <MagneticIcon href="https://github.com" label="GitHub">
                    <FaGithub size={22} />
                  </MagneticIcon>
                  <MagneticIcon href="https://twitter.com" label="Twitter">
                    <FaTwitter size={22} />
                  </MagneticIcon>
                  <MagneticIcon href="https://instagram.com" label="Instagram">
                    <FaInstagram size={22} />
                  </MagneticIcon>
                </div>
              </motion.div>

              {/* Availability badge */}
              <motion.div variants={scaleIn}>
                <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-5 py-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-700" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Available for work
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* --- Actual FOOTER separated with smooth visual transition --- */}
      <footer className="w-full bg-white pt-6 pb-[30px] relative z-20">
        {/* Smooth vertical gradient merging with the section above */}
        <div className="absolute left-0 right-0 bottom-full h-16 bg-gradient-to-b from-transparent via-white/60 to-white pointer-events-none -mb-[1px] z-0"></div>
        
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-stone-800 text-base md:text-xl font-serif italic text-center md:text-left shadow-none relative lg:-left-[4cm]">
            Wishing you a beautiful day.
          </p>
          <p className="text-stone-600 text-xs md:text-sm font-medium text-center md:text-right relative lg:-right-[5cm]">
             © 2026 Sudhakar. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};



