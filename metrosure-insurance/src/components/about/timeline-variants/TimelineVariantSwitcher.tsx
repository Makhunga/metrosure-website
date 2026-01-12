"use client";

import { useState } from "react";
import { TimelineItem } from "@/data/aboutPage";
import TimelineOriginal from "./TimelineOriginal";
import TimelineAlternating from "./TimelineAlternating";

interface TimelineVariantSwitcherProps {
  items: TimelineItem[];
}

type VariantKey = "original" | "alternating";

const variants: { key: VariantKey; label: string; description: string }[] = [
  {
    key: "original",
    label: "Original",
    description: "Vertical layout with icon boxes and connector lines",
  },
  {
    key: "alternating",
    label: "Alternating",
    description: "Classic zigzag layout with center spine",
  },
];

export default function TimelineVariantSwitcher({
  items,
}: TimelineVariantSwitcherProps) {
  const [activeVariant, setActiveVariant] = useState<VariantKey>("original");

  return (
    <div>
      {/* Variant Switcher Bar */}
      <div className="sticky top-16 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Timeline Variant Preview
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {variants.map((variant) => (
                <button
                  key={variant.key}
                  onClick={() => setActiveVariant(variant.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeVariant === variant.key
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {variant.label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {variants.find((v) => v.key === activeVariant)?.description}
          </p>
        </div>
      </div>

      {/* Active Variant */}
      {activeVariant === "original" && <TimelineOriginal items={items} />}
      {activeVariant === "alternating" && <TimelineAlternating items={items} />}
    </div>
  );
}
