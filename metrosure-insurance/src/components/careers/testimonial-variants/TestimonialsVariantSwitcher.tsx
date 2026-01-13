"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TestimonialsCarousel from "./TestimonialsCarousel";
import TestimonialsFeatured from "./TestimonialsFeatured";

// ═══════════════════════════════════════════════════════════════════════════
// TESTIMONIALS VARIANT SWITCHER
// Toggle between Cinematic Carousel and Featured Spotlight
// For stakeholder review - remove after selection
// ═══════════════════════════════════════════════════════════════════════════

type VariantKey = "carousel" | "featured";

interface Variant {
  key: VariantKey;
  label: string;
  description: string;
  icon: string;
}

const variants: Variant[] = [
  {
    key: "carousel",
    label: "Cinematic Carousel",
    description: "Large-scale slider with dramatic quotes and full-bleed photography",
    icon: "view_carousel",
  },
  {
    key: "featured",
    label: "Featured Spotlight",
    description: "Interactive spotlight with clickable employee thumbnails",
    icon: "person_pin",
  },
];

export default function TestimonialsVariantSwitcher() {
  const [activeVariant, setActiveVariant] = useState<VariantKey>("carousel");

  const renderVariant = () => {
    switch (activeVariant) {
      case "carousel":
        return <TestimonialsCarousel />;
      case "featured":
        return <TestimonialsFeatured />;
      default:
        return <TestimonialsCarousel />;
    }
  };

  const activeInfo = variants.find((v) => v.key === activeVariant);

  return (
    <div>
      {/* Sticky Switcher Bar */}
      <div className="sticky top-16 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10 py-4">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Variant Label */}
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">
                {activeInfo?.icon}
              </span>
              <div>
                <p className="text-white font-bold">{activeInfo?.label}</p>
                <p className="text-white/50 text-sm hidden md:block">
                  {activeInfo?.description}
                </p>
              </div>
            </div>

            {/* Variant Buttons */}
            <div className="flex gap-2 sm:ml-auto">
              {variants.map((variant) => (
                <motion.button
                  key={variant.key}
                  onClick={() => setActiveVariant(variant.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    variant.key === activeVariant
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="material-symbols-outlined text-lg">
                    {variant.icon}
                  </span>
                  <span>{variant.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Variant */}
      {renderVariant()}
    </div>
  );
}
