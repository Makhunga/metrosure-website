"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  QuoteData,
  generateWhatsAppUrl,
  formatCurrency,
} from "@/lib/whatsapp";

interface FormSuccessProps {
  icon?: string;
  title: string;
  description: string;
  buttonText: string;
  onReset: () => void;
  accentColor?: "green" | "primary";
  children?: ReactNode;
  /** Optional quote data for WhatsApp sharing */
  quoteData?: QuoteData;
  /** Show WhatsApp share button */
  showWhatsApp?: boolean;
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
  children,
  quoteData,
  showWhatsApp = false,
}: FormSuccessProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleWhatsAppShare = () => {
    if (quoteData) {
      const url = generateWhatsAppUrl(quoteData);
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

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

      {/* Quote Summary Card (when quote data provided) */}
      {quoteData && (
        <motion.div
          className="w-full max-w-md bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mb-6 border border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.45 }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Quote Reference
            </span>
            <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
              {quoteData.referenceNumber}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Estimated Premium
            </span>
            <span className="text-2xl font-bold text-primary">
              {formatCurrency(quoteData.estimatedPremium)}
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                /month
              </span>
            </span>
          </div>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center">
            This is an estimate only. Final quote may vary based on underwriting.
          </p>
        </motion.div>
      )}

      {/* WhatsApp Share Button */}
      {showWhatsApp && quoteData && (
        <motion.button
          onClick={handleWhatsAppShare}
          className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/30 transition-all duration-300 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.5 }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        >
          {/* WhatsApp Icon */}
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-current"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Share via WhatsApp
        </motion.button>
      )}

      {/* Reset Button */}
      <motion.button
        onClick={onReset}
        className="inline-flex items-center justify-center bg-primary hover:bg-[rgb(var(--color-primary-hover))] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: showWhatsApp ? 0.55 : 0.5 }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      >
        {buttonText}
      </motion.button>
    </motion.div>
  );
}

export default FormSuccess;
