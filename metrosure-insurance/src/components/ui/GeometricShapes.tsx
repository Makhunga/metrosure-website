"use client";

import { motion, useReducedMotion } from "framer-motion";

// Geometric shape components inspired by African geometric patterns
// Used for adding visual depth to sections

interface ShapeProps {
  className?: string;
  color?: "primary" | "secondary" | "accent" | "muted";
  size?: number;
  animate?: boolean;
  delay?: number;
}

const colorMap = {
  primary: "fill-primary",
  secondary: "fill-[rgb(var(--color-secondary))]",
  accent: "fill-[#C4A052]", // Gold accent from brand
  muted: "fill-[rgb(var(--color-text-muted))]",
};

const colorMapWithOpacity = {
  primary: "fill-primary/20",
  secondary: "fill-[rgb(var(--color-secondary))]/20",
  accent: "fill-[#C4A052]/20",
  muted: "fill-[rgb(var(--color-text-muted))]/10",
};

// Quarter Circle - like in the brand images
export function QuarterCircle({
  className = "",
  color = "primary",
  size = 100,
  animate = true,
  delay = 0,
}: ShapeProps) {
  const prefersReducedMotion = useReducedMotion();
  const colorClass = `${colorMapWithOpacity[color]} ${className}`;

  if (!animate || prefersReducedMotion) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={colorClass}>
        <path d="M0 100 A100 100 0 0 1 100 0 L100 100 Z" />
      </svg>
    );
  }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={colorClass}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      <path d="M0 100 A100 100 0 0 1 100 0 L100 100 Z" />
    </motion.svg>
  );
}

// Full Circle
export function Circle({
  className = "",
  color = "primary",
  size = 60,
  animate = true,
  delay = 0,
}: ShapeProps) {
  const prefersReducedMotion = useReducedMotion();
  const colorClass = `${colorMapWithOpacity[color]} ${className}`;

  if (!animate || prefersReducedMotion) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={colorClass}>
        <circle cx="50" cy="50" r="50" />
      </svg>
    );
  }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={colorClass}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
      viewport={{ once: true }}
    >
      <circle cx="50" cy="50" r="50" />
    </motion.svg>
  );
}

// Triangle
export function Triangle({
  className = "",
  color = "primary",
  size = 80,
  animate = true,
  delay = 0,
}: ShapeProps) {
  const prefersReducedMotion = useReducedMotion();
  const colorClass = `${colorMapWithOpacity[color]} ${className}`;

  if (!animate || prefersReducedMotion) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={colorClass}>
        <polygon points="50,0 100,100 0,100" />
      </svg>
    );
  }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={colorClass}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      <polygon points="50,0 100,100 0,100" />
    </motion.svg>
  );
}

// Half Circle
export function HalfCircle({
  className = "",
  color = "primary",
  size = 80,
  animate = true,
  delay = 0,
}: ShapeProps) {
  const prefersReducedMotion = useReducedMotion();
  const colorClass = `${colorMapWithOpacity[color]} ${className}`;

  if (!animate || prefersReducedMotion) {
    return (
      <svg width={size} height={size / 2} viewBox="0 0 100 50" className={colorClass}>
        <path d="M0 50 A50 50 0 0 1 100 50 Z" />
      </svg>
    );
  }

  return (
    <motion.svg
      width={size}
      height={size / 2}
      viewBox="0 0 100 50"
      className={colorClass}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      <path d="M0 50 A50 50 0 0 1 100 50 Z" />
    </motion.svg>
  );
}

// Diamond/Rhombus
export function Diamond({
  className = "",
  color = "accent",
  size = 40,
  animate = true,
  delay = 0,
}: ShapeProps) {
  const prefersReducedMotion = useReducedMotion();
  const colorClass = `${colorMap[color]} ${className}`;

  if (!animate || prefersReducedMotion) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={colorClass}>
        <polygon points="50,0 100,50 50,100 0,50" />
      </svg>
    );
  }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={colorClass}
      initial={{ opacity: 0, rotate: -45, scale: 0 }}
      whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
      viewport={{ once: true }}
    >
      <polygon points="50,0 100,50 50,100 0,50" />
    </motion.svg>
  );
}

// Decorative dots pattern
export function DotsPattern({
  className = "",
  color = "primary",
  rows = 3,
  cols = 5,
  dotSize = 4,
  gap = 16,
}: {
  className?: string;
  color?: "primary" | "secondary" | "accent" | "muted";
  rows?: number;
  cols?: number;
  dotSize?: number;
  gap?: number;
}) {
  const width = cols * (dotSize + gap) - gap + dotSize;
  const height = rows * (dotSize + gap) - gap + dotSize;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`${colorMapWithOpacity[color]} ${className}`}
    >
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * (dotSize + gap) + dotSize / 2}
            cy={row * (dotSize + gap) + dotSize / 2}
            r={dotSize / 2}
          />
        ))
      )}
    </svg>
  );
}

// Abstract corner decoration - combination of shapes
export function CornerDecoration({
  className = "",
  position = "top-right",
  scale = 1,
}: {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  scale?: number;
}) {
  const transforms: Record<string, string> = {
    "top-left": "rotate(180deg)",
    "top-right": "rotate(-90deg)",
    "bottom-left": "rotate(90deg)",
    "bottom-right": "rotate(0deg)",
  };

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        transform: `${transforms[position]} scale(${scale})`,
      }}
    >
      <QuarterCircle size={120} color="primary" delay={0.1} />
      <div className="absolute top-8 left-8">
        <Circle size={40} color="secondary" delay={0.2} />
      </div>
      <div className="absolute top-20 left-4">
        <Diamond size={16} color="accent" delay={0.3} />
      </div>
    </div>
  );
}

// Floating abstract shapes for section backgrounds
export function FloatingShapes({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "minimal" | "bold";
}) {
  const prefersReducedMotion = useReducedMotion();

  if (variant === "minimal") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <div className="absolute -top-10 -right-10 opacity-30 dark:opacity-10">
          <QuarterCircle size={200} color="primary" />
        </div>
        <div className="absolute bottom-20 -left-6 opacity-20 dark:opacity-10">
          <Circle size={80} color="secondary" delay={0.2} />
        </div>
      </div>
    );
  }

  if (variant === "bold") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <div className="absolute -top-20 -right-20 opacity-40 dark:opacity-15">
          <QuarterCircle size={300} color="primary" />
        </div>
        <div className="absolute top-1/3 -left-10 opacity-30 dark:opacity-10">
          <HalfCircle size={160} color="secondary" delay={0.1} />
        </div>
        <div className="absolute bottom-10 right-1/4 opacity-25 dark:opacity-10">
          <Triangle size={100} color="primary" delay={0.2} />
        </div>
        <motion.div
          className="absolute top-1/2 right-10"
          animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Diamond size={24} color="accent" />
        </motion.div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute -top-16 -right-16 opacity-30 dark:opacity-10">
        <QuarterCircle size={180} color="primary" />
      </div>
      <div className="absolute bottom-1/4 -left-8 opacity-20 dark:opacity-10">
        <Circle size={100} color="secondary" delay={0.15} />
      </div>
      <div className="absolute top-1/3 right-1/4 opacity-15 dark:opacity-5">
        <Triangle size={60} color="muted" delay={0.3} />
      </div>
      <motion.div
        className="absolute bottom-20 right-20"
        animate={prefersReducedMotion ? {} : { rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Diamond size={20} color="accent" animate={false} />
      </motion.div>
    </div>
  );
}
