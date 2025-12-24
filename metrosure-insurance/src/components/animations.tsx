"use client";

import { ReactNode, useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, Variants, useSpring, useMotionValue } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// METROSURE ANIMATION LIBRARY
// Distinctive motion patterns for a memorable brand experience
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// BASE ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

// Fade in from bottom animation
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

// Fade in from left animation
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 }
};

// Fade in from right animation
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 }
};

// Scale up animation
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

// ─────────────────────────────────────────────────────────────────────────────
// SIGNATURE METROSURE ANIMATIONS
// ─────────────────────────────────────────────────────────────────────────────

// Diagonal slide - signature Metrosure entrance
export const diagonalSlide: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
    y: 30,
    rotate: -3
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

// Reveal up with overshoot
export const revealUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      mass: 1
    }
  }
};

// Scale rotate entrance for icons
export const scaleRotate: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotate: -15
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
};

// Blur fade for premium feel
export const blurFade: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    y: 20
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Elastic pop for CTAs
export const elasticPop: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// STAGGER CONTAINERS
// ─────────────────────────────────────────────────────────────────────────────

// Standard stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Fast stagger for dense layouts
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

// Slow stagger for emphasis
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

// Diagonal stagger (items come from bottom-left)
export const staggerContainerDiagonal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      staggerDirection: 1
    }
  }
};

// Stagger item (standard)
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

// Stagger item with scale
export const staggerItemScale: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

// Stagger item diagonal
export const staggerItemDiagonal: Variants = {
  hidden: { opacity: 0, x: -20, y: 20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// HOVER ANIMATIONS
// ─────────────────────────────────────────────────────────────────────────────

// Card lift hover
export const cardLiftHover = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Subtle card hover
export const cardSubtleHover = {
  rest: {
    y: 0,
    transition: { duration: 0.3 }
  },
  hover: {
    y: -4,
    transition: { duration: 0.3 }
  }
};

// Icon bounce hover
export const iconBounceHover = {
  rest: {
    scale: 1,
    rotate: 0
  },
  hover: {
    scale: 1.15,
    rotate: [0, -5, 5, 0],
    transition: {
      rotate: {
        duration: 0.4,
        ease: "easeInOut"
      },
      scale: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }
};

// Button press
export const buttonPress = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  tap: { scale: 0.98 }
};

// Link underline grow
export const linkUnderline = {
  rest: { width: "0%" },
  hover: { width: "100%", transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
};

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL REVEAL COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

export function ScrollReveal({
  children,
  className = "",
  variants = fadeInUp,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAGGER REVEAL COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  variant?: "default" | "fast" | "slow" | "diagonal";
}

export function StaggerReveal({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
  variant = "default"
}: StaggerRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.2 });

  const containerVariants: Record<string, Variants> = {
    default: staggerContainer,
    fast: staggerContainerFast,
    slow: staggerContainerSlow,
    diagonal: staggerContainerDiagonal
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants[variant]}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PARALLAX COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export function Parallax({
  children,
  className = "",
  speed = 0.5,
  direction = "up"
}: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [100 * speed, -100 * speed] : [-100 * speed, 100 * speed]
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SMOOTH PARALLAX WITH SPRING
// ─────────────────────────────────────────────────────────────────────────────

export function SmoothParallax({
  children,
  className = "",
  speed = 0.3
}: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const y = useSpring(rawY, { stiffness: 100, damping: 30, mass: 1 });

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TEXT REVEAL (WORD BY WORD)
// ─────────────────────────────────────────────────────────────────────────────

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.05
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + index * staggerDelay,
            ease: [0.25, 0.4, 0.25, 1]
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CHARACTER REVEAL
// ─────────────────────────────────────────────────────────────────────────────

interface CharRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function CharReveal({ text, className = "", delay = 0 }: CharRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <span ref={ref} className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.3,
            delay: delay + index * 0.02,
            ease: [0.25, 0.4, 0.25, 1]
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOVER CARD (3D TILT EFFECT)
// ─────────────────────────────────────────────────────────────────────────────

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function HoverCard({ children, className = "", intensity = 10 }: HoverCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 300,
    damping: 30
  });

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAGNETIC BUTTON
// ─────────────────────────────────────────────────────────────────────────────

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({ children, className = "", strength = 0.3 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) * strength);
    y.set((event.clientY - centerY) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED GRADIENT BACKGROUND
// ─────────────────────────────────────────────────────────────────────────────

export function AnimatedGradient({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      animate={{
        background: [
          "radial-gradient(circle at 0% 0%, rgba(191,6,3,0.08) 0%, transparent 50%)",
          "radial-gradient(circle at 100% 100%, rgba(191,6,3,0.08) 0%, transparent 50%)",
          "radial-gradient(circle at 0% 100%, rgba(191,6,3,0.08) 0%, transparent 50%)",
          "radial-gradient(circle at 100% 0%, rgba(191,6,3,0.08) 0%, transparent 50%)",
          "radial-gradient(circle at 0% 0%, rgba(191,6,3,0.08) 0%, transparent 50%)"
        ]
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED COUNTER
// ─────────────────────────────────────────────────────────────────────────────

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function Counter({
  from = 0,
  to,
  duration = 2,
  className = "",
  prefix = "",
  suffix = ""
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setCount(Math.floor(from + (to - from) * easeProgress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, from, to, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROGRESS LINE (FOR SCROLL PROGRESS)
// ─────────────────────────────────────────────────────────────────────────────

interface ProgressLineProps {
  className?: string;
  color?: string;
}

export function ScrollProgressLine({ className = "", color = "rgb(191, 6, 3)" }: ProgressLineProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 origin-left z-50 ${className}`}
      style={{ scaleX, backgroundColor: color }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING ELEMENT
// ─────────────────────────────────────────────────────────────────────────────

interface FloatingProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}

export function Floating({
  children,
  className = "",
  duration = 3,
  distance = 10
}: FloatingProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -distance, 0],
        rotate: [0, 1, 0, -1, 0]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DRAW SVG PATH
// ─────────────────────────────────────────────────────────────────────────────

interface DrawPathProps {
  d: string;
  className?: string;
  strokeWidth?: number;
  stroke?: string;
  duration?: number;
  delay?: number;
}

export function DrawPath({
  d,
  className = "",
  strokeWidth = 2,
  stroke = "currentColor",
  duration = 1.5,
  delay = 0
}: DrawPathProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.path
      ref={ref}
      d={d}
      className={className}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
      transition={{ duration, delay, ease: "easeInOut" }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCALE ON SCROLL (FOR HERO IMAGES)
// ─────────────────────────────────────────────────────────────────────────────

interface ScaleOnScrollProps {
  children: ReactNode;
  className?: string;
}

export function ScaleOnScroll({ children, className = "" }: ScaleOnScrollProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REVEAL MASK (FOR DRAMATIC REVEALS)
// ─────────────────────────────────────────────────────────────────────────────

interface RevealMaskProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
}

export function RevealMask({
  children,
  className = "",
  direction = "left"
}: RevealMaskProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const clipPaths = {
    left: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
    right: ["inset(0 0 0 100%)", "inset(0 0 0 0%)"],
    up: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
    down: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ clipPath: clipPaths[direction][0] }}
      animate={isInView ? { clipPath: clipPaths[direction][1] } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
