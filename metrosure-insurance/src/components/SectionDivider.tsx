"use client";

import { motion } from "framer-motion";

type DividerVariant = "wave" | "geometric" | "gradient" | "dots";
type DividerPosition = "top" | "bottom";

interface SectionDividerProps {
  variant?: DividerVariant;
  position?: DividerPosition;
  className?: string;
  flip?: boolean;
}

export default function SectionDivider({
  variant = "geometric",
  position = "bottom",
  className = "",
  flip = false,
}: SectionDividerProps) {
  const isTop = position === "top";
  const shouldFlip = flip || isTop;

  if (variant === "wave") {
    return (
      <div
        className={`relative w-full overflow-hidden pointer-events-none ${className}`}
        style={{ height: "80px" }}
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className={`absolute w-full h-full ${shouldFlip ? "rotate-180" : ""}`}
          fill="none"
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            className="fill-[rgb(var(--color-surface-card))]"
          />
          <path
            d="M0,50 C480,20 960,70 1440,45 L1440,80 L0,80 Z"
            className="fill-[rgb(var(--color-surface))] opacity-50"
          />
        </svg>
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div
        className={`relative w-full h-24 pointer-events-none ${className}`}
      >
        <div
          className={`absolute inset-0 ${
            shouldFlip
              ? "bg-gradient-to-t"
              : "bg-gradient-to-b"
          } from-transparent via-[rgb(var(--color-border-light))]/20 to-transparent`}
        />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div
        className={`relative w-full py-8 flex items-center justify-center gap-3 pointer-events-none ${className}`}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: [
                "#82B29A",
                "#F2CC8E",
                "#DF7A5E",
                "#3C405B",
                "#82B29A",
              ][i],
              opacity: 0.4,
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.4 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            viewport={{ once: true }}
          />
        ))}
      </div>
    );
  }

  // Default: geometric
  return (
    <div
      className={`relative w-full h-16 overflow-hidden pointer-events-none ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Center line with gradient */}
        <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[rgb(var(--color-border-light))] to-transparent" />

        {/* Geometric shapes */}
        <div className="absolute flex items-center gap-4">
          <motion.div
            className="w-3 h-3 rounded-full bg-[#82B29A]/30"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          />
          <motion.div
            className="w-2 h-2 rotate-45 bg-[#F2CC8E]/40"
            initial={{ scale: 0, rotate: 0 }}
            whileInView={{ scale: 1, rotate: 45 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          />
          <motion.div
            className="w-4 h-4 rounded-full border-2 border-[#DF7A5E]/30"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          />
          <motion.div
            className="w-2 h-2 rotate-45 bg-[#3C405B]/30 dark:bg-[#F4F1DE]/30"
            initial={{ scale: 0, rotate: 0 }}
            whileInView={{ scale: 1, rotate: 45 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          />
          <motion.div
            className="w-3 h-3 rounded-full bg-[#82B29A]/30"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          />
        </div>
      </div>

      {/* Side accents */}
      <motion.div
        className="absolute left-[10%] top-1/2 -translate-y-1/2 w-8 h-8 rounded-br-full bg-[#82B29A]/10 hidden lg:block"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      />
      <motion.div
        className="absolute right-[10%] top-1/2 -translate-y-1/2 w-8 h-8 rounded-tl-full bg-[#F2CC8E]/10 hidden lg:block"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
      />
    </div>
  );
}
