"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  funeralCostBreakdown,
  getFuneralCostTotals,
  FuneralCostItem,
} from "@/data/calculatorData";

interface FuneralCostBreakdownProps {
  /** Selected tier cover amount to compare against */
  selectedCoverAmount: number;
}

export function FuneralCostBreakdown({ selectedCoverAmount }: FuneralCostBreakdownProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const totals = getFuneralCostTotals();

  // Calculate what percentage of costs the selected cover would meet
  const coveragePercentMin = Math.min(100, Math.round((selectedCoverAmount / totals.max) * 100));
  const coveragePercentMax = Math.min(100, Math.round((selectedCoverAmount / totals.min) * 100));

  return (
    <div className="mt-6">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 transition-colors group"
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">
            receipt_long
          </span>
          <div className="text-left">
            <span className="text-sm font-semibold text-slate-900 dark:text-white block">
              What does a funeral cost?
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Typical costs: R{totals.min.toLocaleString("en-ZA")} – R{totals.max.toLocaleString("en-ZA")}
            </span>
          </div>
        </div>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors"
        >
          expand_more
        </motion.span>
      </motion.button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-3">
              {/* Coverage Status */}
              <div className="p-3 rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-sm">
                    {coveragePercentMin >= 80 ? "check_circle" : coveragePercentMin >= 50 ? "info" : "warning"}
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    Your Cover: R{selectedCoverAmount.toLocaleString("en-ZA")}
                  </span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${coveragePercentMin}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`h-full rounded-full ${
                      coveragePercentMin >= 80
                        ? "bg-emerald-500"
                        : coveragePercentMin >= 50
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                  />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                  {coveragePercentMin >= 100
                    ? "Covers typical funeral costs comfortably"
                    : coveragePercentMin >= 80
                    ? `Covers ${coveragePercentMin}–${coveragePercentMax}% of typical costs`
                    : coveragePercentMin >= 50
                    ? "Consider upgrading for fuller coverage"
                    : "May not cover all expenses - consider a higher tier"}
                </p>
              </div>

              {/* Cost Items */}
              <div className="space-y-2">
                {funeralCostBreakdown.map((item, index) => (
                  <CostItem key={item.id} item={item} index={index} />
                ))}
              </div>

              {/* Total */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-600">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Total Typical Cost
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    R{totals.min.toLocaleString("en-ZA")} – R{totals.max.toLocaleString("en-ZA")}
                  </span>
                </div>
              </div>

              {/* Note */}
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                Costs vary by location, service providers, and ceremony preferences. These are indicative ranges for the Gauteng/Western Cape region.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CostItem({ item, index }: { item: FuneralCostItem; index: number }) {
  const total = item.costRange.min + item.costRange.max;
  const allTotals = funeralCostBreakdown.reduce(
    (sum, i) => sum + i.costRange.min + i.costRange.max,
    0
  );
  const percent = (total / allTotals) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
    >
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="material-symbols-outlined text-primary text-sm">
          {item.icon}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-slate-900 dark:text-white truncate">
            {item.label}
          </span>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
            R{item.costRange.min.toLocaleString("en-ZA")}–R{item.costRange.max.toLocaleString("en-ZA")}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-600 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
              className="h-full bg-primary/60 rounded-full"
            />
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 w-8 text-right">
            {Math.round(percent)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default FuneralCostBreakdown;
