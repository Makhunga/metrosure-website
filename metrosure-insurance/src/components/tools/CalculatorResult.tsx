"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { track } from "@vercel/analytics";
import {
  CalculatorResultData,
  generateCalculatorWhatsAppUrl,
} from "@/lib/whatsapp";
import { EmailResultsModal } from "./EmailResultsModal";

interface BreakdownItem {
  label: string;
  value: number;
  color: string;
}

interface CalculatorResultProps {
  title: string;
  totalAmount: number;
  monthlyPremium?: number;
  /** Low end of premium range (for age/health factors) */
  premiumLow?: number;
  /** High end of premium range (for age/health factors) */
  premiumHigh?: number;
  breakdown: BreakdownItem[];
  comparisonText: string;
  ctaText: string;
  ctaLink: string;
  isVisible: boolean;
  /** Calculator type for sharing */
  calculatorType?: "life" | "funeral";
  /** Additional share data */
  shareData?: {
    yearsOfSupport?: number;
    dependents?: number;
    planName?: string;
    memberCount?: number;
  };
}

// Animated counter with spring physics
function AnimatedAmount({
  value,
  prefix = "R",
  className = "",
}: {
  value: number;
  prefix?: string;
  className?: string;
}) {
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  return (
    <span className={className}>
      {prefix}
      {displayValue.toLocaleString("en-ZA")}
    </span>
  );
}

// CSS-based pie chart
function PieChart({ breakdown, total }: { breakdown: BreakdownItem[]; total: number }) {
  let cumulativePercent = 0;

  const segments = breakdown.map((item) => {
    const percent = (item.value / total) * 100;
    const startPercent = cumulativePercent;
    cumulativePercent += percent;

    return {
      ...item,
      percent,
      startPercent,
    };
  });

  // Create conic gradient
  const gradientStops = segments
    .map((seg) => `${seg.color} ${seg.startPercent}% ${seg.startPercent + seg.percent}%`)
    .join(", ");

  return (
    <div className="relative w-full">
      <motion.div
        className="w-40 h-40 mx-auto rounded-full shadow-lg"
        style={{
          background: `conic-gradient(${gradientStops})`,
        }}
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Inner circle for donut effect */}
        <div className="absolute inset-5 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-inner">
          <div className="text-center">
            <span className="material-symbols-outlined text-primary text-2xl">
              shield
            </span>
          </div>
        </div>
      </motion.div>

      {/* Legend - inline styles to bypass CSS issues */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{ marginTop: '1.5rem', width: '100%', overflow: 'visible' }}
      >
        {segments.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.375rem 0',
              fontSize: '0.875rem',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: item.color,
                  flexShrink: 0,
                }}
              />
              <span className="text-slate-600 dark:text-slate-400">
                {item.label}
              </span>
            </div>
            <span className="font-semibold text-slate-900 dark:text-white" style={{ whiteSpace: 'nowrap' }}>
              R{item.value.toLocaleString("en-ZA")}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Bar chart alternative
function BarChart({ breakdown, total }: { breakdown: BreakdownItem[]; total: number }) {
  return (
    <div className="space-y-4">
      {breakdown.map((item, index) => {
        const percent = (item.value / total) * 100;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {item.label}
              </span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                R{item.value.toLocaleString("en-ZA")}
              </span>
            </div>
            <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function CalculatorResult({
  title,
  totalAmount,
  monthlyPremium,
  premiumLow,
  premiumHigh,
  breakdown,
  comparisonText,
  ctaText,
  ctaLink,
  isVisible,
  calculatorType = "life",
  shareData,
}: CalculatorResultProps) {
  if (!isVisible) return null;

  const total = breakdown.reduce((sum, item) => sum + item.value, 0);

  // Email modal state
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Build share data for WhatsApp and Email
  const sharePayload: CalculatorResultData = {
    calculatorType,
    totalAmount,
    premiumLow,
    premiumHigh,
    monthlyPremium,
    breakdown: breakdown.map((item) => ({ label: item.label, value: item.value })),
    ...shareData,
  };

  const handleWhatsAppShare = () => {
    const url = generateCalculatorWhatsAppUrl(sharePayload);
    window.open(url, "_blank", "noopener,noreferrer");

    // Track WhatsApp share
    track("calculator_results_shared", {
      method: "whatsapp",
      calculatorType,
    });
  };
  // Always use BarChart - provides clearer visual representation and avoids
  // layout issues that affected the PieChart legend in some browsers
  const showPieChart = false;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-primary via-primary to-[#a50502] p-8 text-white relative overflow-hidden rounded-t-3xl">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="result-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#result-grid)" />
            </svg>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 mb-2"
            >
              <span className="material-symbols-outlined text-white/80">calculate</span>
              <span className="text-sm text-white/80 uppercase tracking-wider font-medium">
                {title}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <AnimatedAmount
                value={totalAmount}
                className="text-5xl md:text-6xl font-bold tracking-tight"
              />
            </motion.div>

            {(premiumLow && premiumHigh) ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-3"
              >
                <p className="text-white/80">
                  Estimated premium:{" "}
                  <span className="font-semibold text-white">
                    R{premiumLow.toLocaleString("en-ZA")}–R{premiumHigh.toLocaleString("en-ZA")}/month
                  </span>
                </p>
                <p className="mt-1 text-xs text-white/60">
                  Varies by age, health, and smoking status
                </p>
              </motion.div>
            ) : monthlyPremium && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-2 text-white/80"
              >
                Estimated premium:{" "}
                <span className="font-semibold text-white">
                  R{monthlyPremium.toLocaleString("en-ZA")}/month
                </span>
              </motion.p>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Breakdown */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
              Coverage Breakdown
            </h3>
            {showPieChart ? (
              <PieChart breakdown={breakdown} total={total} />
            ) : (
              <BarChart breakdown={breakdown} total={total} />
            )}
          </div>

          {/* Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/15 rounded-xl border border-amber-200 dark:border-amber-800"
          >
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 mt-0.5">
                lightbulb
              </span>
              <div>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                  Did you know?
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                  {comparisonText}
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            <Link
              href={ctaLink}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-[#a50502] text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 group"
            >
              {ctaText}
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>

            {/* Share Buttons Row */}
            <div className="flex gap-3">
              {/* Email Results Button */}
              <motion.button
                onClick={() => setIsEmailModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="material-symbols-outlined text-xl">mail</span>
                <span className="hidden sm:inline">Email Results</span>
              </motion.button>

              {/* WhatsApp Share Button */}
              <motion.button
                onClick={handleWhatsAppShare}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-[#128C7E] bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 hover:border-[#25D366]/50 transition-all duration-300"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="hidden sm:inline">WhatsApp</span>
              </motion.button>
            </div>

            <p className="text-center text-xs text-slate-500 dark:text-slate-400">
              No obligation. Get your personalised quote in minutes.
            </p>
          </motion.div>
        </div>

        {/* Email Results Modal */}
        <EmailResultsModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          calculatorData={sharePayload}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default CalculatorResult;
