"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { formatRand, getCoverageLabel, getCoverageIcon } from "@/lib/quoteCalculator";

interface PriceBreakdownProps {
  breakdown: {
    basePremium: number;
    coverageAdjustment: number;
    additionalCoverageTotal: number;
    deductibleDiscount: number;
    subtotal: number;
    vat: number;
    total: number;
    addOnBreakdown: Array<{ name: string; cost: number }>;
  };
  coverageType: "home" | "auto" | "life" | "business";
  isVisible: boolean;
}

// Animated number that smoothly transitions between values
function AnimatedPrice({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 20,
    mass: 1,
  });

  const displayValue = useTransform(springValue, (latest) =>
    formatRand(Math.round(latest))
  );

  const [displayText, setDisplayText] = useState(formatRand(0));

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  useEffect(() => {
    const unsubscribe = displayValue.on("change", (v) => {
      setDisplayText(v);
    });
    return () => unsubscribe();
  }, [displayValue]);

  return (
    <motion.span
      className={className}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 0.3 }}
      key={value}
    >
      {displayText}
    </motion.span>
  );
}

// Savings indicator with animated bar
function SavingsIndicator({
  discount,
  percentage,
}: {
  discount: number;
  percentage: number;
}) {
  if (discount <= 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-lg">
            savings
          </span>
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Deductible Savings
          </span>
        </div>
        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
          -{formatRand(discount)}
        </span>
      </div>
      <div className="relative h-2 bg-emerald-200 dark:bg-emerald-800 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage * 100, 100)}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <p className="mt-1.5 text-xs text-emerald-600 dark:text-emerald-400">
        {Math.round(percentage * 100)}% discount applied
      </p>
    </motion.div>
  );
}

export function PriceBreakdown({
  breakdown,
  coverageType,
  isVisible,
}: PriceBreakdownProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const discountPercentage =
    breakdown.subtotal > 0
      ? breakdown.deductibleDiscount /
        (breakdown.subtotal + breakdown.deductibleDiscount)
      : 0;

  if (!isVisible) return null;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="lg:sticky lg:top-32 w-full lg:w-80 xl:w-96"
    >
      {/* Main Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-br from-primary via-primary to-[#a50502] p-6 text-white overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.5" fill="currentColor" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Coverage type badge */}
          <div className="relative flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="material-symbols-outlined text-xl">
                {getCoverageIcon(coverageType)}
              </span>
            </div>
            <div>
              <p className="text-xs text-white/70 uppercase tracking-wider font-medium">
                Your Quote
              </p>
              <p className="text-sm font-semibold">
                {getCoverageLabel(coverageType)}
              </p>
            </div>
          </div>

          {/* Total price */}
          <div className="relative">
            <AnimatedPrice
              value={breakdown.total}
              className="text-4xl xl:text-5xl font-bold tracking-tight"
            />
            <span className="text-lg text-white/80 font-normal ml-1">/mo</span>
          </div>

          {/* Estimate badge */}
          <div className="relative mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 rounded-full backdrop-blur-sm">
            <span className="material-symbols-outlined text-sm">info</span>
            <span className="text-xs font-medium">Estimate only</span>
          </div>
        </div>

        {/* Breakdown section */}
        <div className="p-6">
          {/* Toggle button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between text-left group"
          >
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              Price Breakdown
            </span>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors"
            >
              expand_more
            </motion.span>
          </button>

          {/* Expandable breakdown */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-3">
                  {/* Base premium */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      Base Premium
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {formatRand(breakdown.basePremium)}
                    </span>
                  </div>

                  {/* Coverage adjustment */}
                  {breakdown.coverageAdjustment > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">
                        Coverage Amount
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        +{formatRand(breakdown.coverageAdjustment)}
                      </span>
                    </div>
                  )}

                  {/* Add-ons */}
                  {breakdown.addOnBreakdown.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Add-ons
                      </p>
                      {breakdown.addOnBreakdown.map((addOn, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm py-1"
                        >
                          <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {addOn.name}
                          </span>
                          <span className="font-medium text-slate-900 dark:text-white">
                            +{formatRand(addOn.cost)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Deductible discount */}
                  {breakdown.deductibleDiscount > 0 && (
                    <div className="flex items-center justify-between text-sm text-emerald-600 dark:text-emerald-400">
                      <span>Deductible Discount</span>
                      <span className="font-medium">
                        -{formatRand(breakdown.deductibleDiscount)}
                      </span>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="border-t border-slate-200 dark:border-slate-700 my-3" />

                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      Subtotal
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {formatRand(breakdown.subtotal)}
                    </span>
                  </div>

                  {/* VAT */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      VAT (15%)
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {formatRand(breakdown.vat)}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Monthly Total
                    </span>
                    <span className="text-xl font-bold text-primary">
                      {formatRand(breakdown.total)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Savings indicator */}
          <SavingsIndicator
            discount={breakdown.deductibleDiscount}
            percentage={discountPercentage}
          />

          {/* Quick summary when collapsed */}
          {!isExpanded && breakdown.addOnBreakdown.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-xs text-slate-500 dark:text-slate-400"
            >
              Includes {breakdown.addOnBreakdown.length} add-on
              {breakdown.addOnBreakdown.length !== 1 ? "s" : ""}
              {breakdown.deductibleDiscount > 0 &&
                ` • ${Math.round(discountPercentage * 100)}% savings`}
            </motion.p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-lg">
                  schedule
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  24-hour callback
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Our team will contact you with your final quote within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400"
      >
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm text-emerald-500">
            verified
          </span>
          <span>FSP 47089</span>
        </div>
        <div className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm text-emerald-500">
            lock
          </span>
          <span>Secure</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default PriceBreakdown;
