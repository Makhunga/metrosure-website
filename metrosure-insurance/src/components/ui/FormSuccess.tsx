"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FormSuccessProps {
  icon?: string;
  title: string;
  description: string;
  buttonText: string;
  onReset: () => void;
  accentColor?: "green" | "primary";
  children?: ReactNode;
}

// Animated checkmark SVG path
function AnimatedCheckmark({
  size = 40,
  color = "currentColor",
  delay = 0.3
}: {
  size?: number;
  color?: string;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      className="overflow-visible"
    >
      {/* Circle background */}
      <motion.circle
        cx="26"
        cy="26"
        r="25"
        fill="none"
        stroke={color}
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.2 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.5, delay, ease: "easeOut" }
        }
      />

      {/* Checkmark path */}
      <motion.path
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: 0.4,
                delay: delay + 0.3,
                ease: [0.65, 0, 0.35, 1]
              }
        }
      />
    </svg>
  );
}

export function FormSuccess({
  icon,
  title,
  description,
  buttonText,
  onReset,
  accentColor = "green",
  children
}: FormSuccessProps) {
  const prefersReducedMotion = useReducedMotion();

  const colorClasses = {
    green: {
      bg: "bg-green-500/10 dark:bg-green-500/20",
      text: "text-green-600 dark:text-green-500",
      iconColor: "rgb(22, 163, 74)" // green-600
    },
    primary: {
      bg: "bg-primary/10",
      text: "text-primary",
      iconColor: "rgb(191, 6, 3)" // primary
    }
  };

  const colors = colorClasses[accentColor];

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center py-12"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4 }}
    >
      {/* Animated Icon Container */}
      <motion.div
        className={`w-20 h-20 ${colors.bg} rounded-full flex items-center justify-center mb-6 relative`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 200, damping: 15, delay: 0.1 }
        }
      >
        {/* Ripple effect */}
        {!prefersReducedMotion && (
          <motion.div
            className={`absolute inset-0 ${colors.bg} rounded-full`}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        )}

        {/* Icon - either custom material icon or animated SVG checkmark */}
        {icon ? (
          <motion.span
            className={`material-symbols-outlined ${colors.text} text-4xl`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 300, delay: 0.2 }
            }
          >
            {icon}
          </motion.span>
        ) : (
          <AnimatedCheckmark
            size={40}
            color={colors.iconColor}
            delay={0.2}
          />
        )}
      </motion.div>

      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-main))] dark:text-white mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.3 }}
      >
        {title}
      </motion.h2>

      {/* Description */}
      <motion.p
        className="text-lg text-[rgb(var(--color-text-body))] dark:text-slate-400 mb-8 max-w-lg mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.4 }}
      >
        {description}
      </motion.p>

      {/* Optional children (e.g., additional info) */}
      {children}

      {/* Reset Button */}
      <motion.button
        onClick={onReset}
        className="inline-flex items-center justify-center bg-primary hover:bg-[rgb(var(--color-primary-hover))] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.5 }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      >
        {buttonText}
      </motion.button>
    </motion.div>
  );
}

export default FormSuccess;
