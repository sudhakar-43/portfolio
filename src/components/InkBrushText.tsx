"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const InkBrushText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  // Custom stroke sequence per letter matching the Kamikaze font shapes.
  // Each path corresponds to an actual brush stroke movement.
  const strokes = [
    // S (1 continuous stroke)
    { d: "M 180,80 C 100,0 30,100 110,160 C 190,220 70,280 50,230", duration: 0.6, delay: 0 },
    
    // U (1 stroke down, curve, up)
    { d: "M 230,70 L 230,220 C 230,280 340,280 340,220 L 340,70", duration: 0.5, delay: 0.5 },
    
    // D (2 strokes: Vertical spine, then outer loop)
    { d: "M 410,70 L 410,240", duration: 0.3, delay: 0.9 },
    { d: "M 410,70 C 560,60 560,250 410,240", duration: 0.4, delay: 1.1 },
    
    // H (3 strokes: Left post, right post, crossbar)
    { d: "M 570,70 L 570,240", duration: 0.3, delay: 1.4 },
    { d: "M 690,70 L 690,240", duration: 0.3, delay: 1.6 },
    { d: "M 550,160 L 710,160", duration: 0.2, delay: 1.8 },
    
    // A (3 strokes: Left diag, right diag, cross)
    { d: "M 810,70 L 750,240", duration: 0.3, delay: 2.0 },
    { d: "M 810,70 L 870,240", duration: 0.3, delay: 2.2 },
    { d: "M 760,180 L 860,180", duration: 0.2, delay: 2.4 },
    
    // K (3 strokes: Spine, Upper diag, Lower diag)
    { d: "M 930,70 L 930,240", duration: 0.3, delay: 2.6 },
    { d: "M 1040,70 L 930,150", duration: 0.3, delay: 2.8 },
    { d: "M 960,140 L 1050,240", duration: 0.3, delay: 3.0 },
    
    // A (3 strokes)
    { d: "M 1170,70 L 1110,240", duration: 0.3, delay: 3.2 },
    { d: "M 1170,70 L 1230,240", duration: 0.3, delay: 3.4 },
    { d: "M 1120,180 L 1220,180", duration: 0.2, delay: 3.6 },
    
    // R (3 strokes: Spine, Top lobe, Lower leg)
    { d: "M 1290,70 L 1290,240", duration: 0.3, delay: 3.8 },
    { d: "M 1290,70 C 1430,70 1430,160 1290,160", duration: 0.4, delay: 4.0 },
    { d: "M 1340,160 L 1430,240", duration: 0.3, delay: 4.3 }
  ];

  // Specific positional pinning forces the font layout to perfectly match our stroke paths
  const letters = [
    { char: 'S', x: 110 },
    { char: 'U', x: 285 },
    { char: 'D', x: 460 },
    { char: 'H', x: 630 },
    { char: 'A', x: 810 },
    { char: 'K', x: 990 },
    { char: 'A', x: 1170 },
    { char: 'R', x: 1350 },
  ];

  return (
    <div ref={containerRef} className="relative w-full flex justify-center items-center py-10 block mt-2">
      <svg 
        viewBox="0 0 1500 300" 
        className="w-full h-auto overflow-visible"
        style={{ minWidth: "300px" }}
      >
        <defs>
          {/* 
            Production-grade layer filter: 
            feTurbulence -> feDisplacementMap -> feGaussianBlur -> feColorMatrix
            Produces dense noise + organically rough edges + clamped clamping.
          */}
          <filter id="ink-pipeline" filterUnits="userSpaceOnUse" x="-10%" y="-10%" width="120%" height="120%">
            {/* 1. Generate core noise (Turbulence mapped to Displacement) */}
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="2" result="edgeNoise" />
            
            {/* 2. Displace the clean vector edges of the text using noise */}
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="edgeNoise" 
              scale="20" 
              xChannelSelector="R" 
              yChannelSelector="G" 
              result="roughMask" 
            />
            
            {/* 3. Pre-blur provides the gradient mapping canvas needed for color thresholding (ink spread effect) */}
            <feGaussianBlur in="roughMask" stdDeviation="3" result="blurredMask" />
            
            {/* 4. Threshold the blurred edge to establish harsh contrast ink + thin halo of lower opacity bleed */}
            <feColorMatrix 
              type="matrix" 
              values="
                0 0 0 0 0.1   
                0 0 0 0 0.08  
                0 0 0 0 0.06  
                0 0 0 20 -7" 
              in="blurredMask" 
              result="inkDensity" 
            />

            {/* 5. Add inner surface texture (grain paths) so flat black becomes imperfect */}
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="5" result="grainNoise" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.2 -0.2" in="grainNoise" result="alphaGrain" />
            <feComposite operator="in" in="alphaGrain" in2="inkDensity" result="texturedBody" />
            
            {/* Multiply grain texture to simulate missing ink variations */}
            <feBlend mode="multiply" in="inkDensity" in2="texturedBody" result="finalInk" />

            {/* Micro shadow to seat the ink physically into the 'paper' */}
            <feDropShadow dx="1" dy="3" stdDeviation="4" floodOpacity="0.1" floodColor="#222" />
          </filter>

          <mask id="stroke-mask">
            {/* Background block so text is hidden natively */}
            <rect width="100%" height="100%" fill="black" />
            
            {/* Organic mask shapes wiping up/down/angle */}
            {isInView && strokes.map((stroke, index) => (
              <motion.path
                key={index}
                d={stroke.d}
                stroke="white"
                strokeWidth="110"  // Broad enough to encompass the thickest traits of Kamikaze letters
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                // Adding a softer blur directly on the stroke mask path helps it reveal organically organically 
                // in combination with the `feColorMatrix` clamp, generating sputtering edges during reveal!
                style={{ filter: "blur(10px)" }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: stroke.duration,
                  delay: stroke.delay + 0.2,
                  ease: [0.65, 0.05, 0.2, 1], // Custom cubic bezier: swift action, soft settle
                }}
              />
            ))}
          </mask>
        </defs>

        {/* The target rendering elements */}
        {/* Underlayer: Creates a ghosting/dried ink feeling before the stroke hits, mimicking paper imprint */}
        {isInView && letters.map((l, i) => (
           <motion.text
              key={`ghost-${i}`}
              x={l.x}
              y="55%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#D0B8AC"
              className="font-normal"
              style={{ fontSize: "210px", fontFamily: "'Kamikaze', sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 1.5, delay: i * 0.4 }}
           >
             {l.char}
           </motion.text>
        ))}

        {/* Primary ink elements combined with Mask & advanced Filter pipeline */}
        <g filter="url(#ink-pipeline)" mask="url(#stroke-mask)">
          {letters.map((l, i) => (
             <text 
                key={`ink-${i}`}
                x={l.x} 
                y="55%" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill="#2c2522" // High-contrast deepest brown/black structure
                className="font-normal tracking-wide"
                style={{ fontSize: "210px", fontFamily: "'Kamikaze', sans-serif" }}
             >
               {l.char}
             </text>
          ))}
        </g>
      </svg>
    </div>
  );
};
