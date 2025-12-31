"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SquigglyDividerProps {
  className?: string;
}

export default function SquigglyDivider({ className = "" }: SquigglyDividerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Hand-drawn style squiggly path - intentionally imperfect for organic feel
  // The path creates a gentle wave with subtle irregularities
  const squigglyPath = `
    M 0 12
    C 8 8, 16 16, 24 12
    C 32 8, 40 14, 48 12
    C 56 10, 64 16, 72 12
    C 80 8, 88 15, 96 12
    C 104 9, 112 16, 120 12
    C 128 8, 136 14, 144 12
    C 152 10, 160 16, 168 12
    C 176 8, 184 15, 192 12
    C 200 9, 208 14, 216 12
    C 224 10, 232 16, 240 12
  `;

  return (
    <div
      ref={ref}
      className={`w-full flex justify-center overflow-hidden ${className}`}
    >
      <motion.svg
        viewBox="0 0 240 24"
        preserveAspectRatio="none"
        className="w-full max-w-md h-6"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.path
          d={squigglyPath}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-slate-300 dark:stroke-slate-600"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            delay: 0.1
          }}
        />
      </motion.svg>
    </div>
  );
}
