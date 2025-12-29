"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";

interface BreakdownItem {
  label: string;
  value: number;
  color: string;
}

interface CalculatorResultProps {
  title: string;
  totalAmount: number;
  monthlyPremium?: number;
  breakdown: BreakdownItem[];
  comparisonText: string;
  ctaText: string;
  ctaLink: string;
  isVisible: boolean;
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
    <div className="relative">
      <motion.div
        className="w-48 h-48 mx-auto rounded-full shadow-lg"
        style={{
          background: `conic-gradient(${gradientStops})`,
        }}
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
      >
        {/* Inner circle for donut effect */}
        <div className="absolute inset-6 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-inner">
          <div className="text-center">
            <span className="material-symbols-outlined text-primary text-3xl">
              shield
            </span>
          </div>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        className="mt-6 space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {segments.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
            </div>
            <span className="font-medium text-slate-900 dark:text-white">
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
  breakdown,
  comparisonText,
  ctaText,
  ctaLink,
  isVisible,
}: CalculatorResultProps) {
  if (!isVisible) return null;

  const total = breakdown.reduce((sum, item) => sum + item.value, 0);
  const showPieChart = breakdown.length <= 5;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-primary via-primary to-[#a50502] p-8 text-white relative overflow-hidden">
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

            {monthlyPremium && (
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
            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3">
              No obligation. Get your personalized quote in minutes.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CalculatorResult;
