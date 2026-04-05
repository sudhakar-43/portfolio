"use client";

import { CustomCursor } from "@/components/CustomCursor";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-background min-h-screen">
      {/* Global Client-Side Effects */}
      <CustomCursor />
      
      {/* Navigation Layer */}
      <Navigation />

      {/* Main Content Sections */}
      <div className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <TechStack />
        <Projects />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
