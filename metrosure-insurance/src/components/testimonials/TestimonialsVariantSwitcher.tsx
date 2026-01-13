"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// ═══════════════════════════════════════════════════════════════════════════
// TESTIMONIALS VARIANT SWITCHER
// Sticky bar for toggling between Bold and Minimal testimonial variants
// Session 103: Narrowed from 4 to 2 variants per user decision
// ═══════════════════════════════════════════════════════════════════════════

// Dynamic imports for code splitting
const TestimonialsBoldStatement = dynamic(
  () => import("./TestimonialsBoldStatement")
);
const TestimonialsMinimal = dynamic(() => import("./TestimonialsMinimal"));

type VariantKey = "bold" | "minimal";

interface Variant {
  key: VariantKey;
  label: string;
  icon: string;
  description: string;
  component: React.ComponentType;
}

const variants: Variant[] = [
  {
    key: "bold",
    label: "Bold Statement",
    icon: "format_quote",
    description: "Large stacked typography with floating card overlay",
    component: TestimonialsBoldStatement,
  },
  {
    key: "minimal",
    label: "Minimal",
    icon: "format_size",
    description: "Typography-focused elegance with giant quotation marks",
    component: TestimonialsMinimal,
  },
];

export default function TestimonialsVariantSwitcher() {
  const [activeVariant, setActiveVariant] = useState<VariantKey>("bold");

  const currentVariant = variants.find((v) => v.key === activeVariant)!;
  const VariantComponent = currentVariant.component;

  return (
    <>
      {/* Sticky Switcher Bar */}
      <div className="sticky top-16 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Label */}
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">
                science
              </span>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Testimonial Variant:
              </span>
              <span className="text-sm font-bold text-primary">
                {currentVariant.label}
              </span>
            </div>

            {/* Variant Buttons */}
            <div className="flex flex-wrap gap-2">
              {variants.map((variant) => (
                <motion.button
                  key={variant.key}
                  onClick={() => setActiveVariant(variant.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeVariant === variant.key
                      ? "bg-primary text-white shadow-md shadow-primary/30"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="material-symbols-outlined text-lg">
                    {variant.icon}
                  </span>
                  <span className="hidden sm:inline">{variant.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {currentVariant.description}
          </p>
        </div>
      </div>

      {/* Active Variant Component */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVariant}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <VariantComponent />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
