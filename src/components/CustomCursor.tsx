"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <>
      {/* Subtle flashlight glow behind the cursor */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(0,0,0,0) 70%)",
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
    </>
  );
};
