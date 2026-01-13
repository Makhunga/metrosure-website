"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import { opportunities, Opportunity } from "@/data/opportunities";

// ═══════════════════════════════════════════════════════════════════════════
// LATEST OPPORTUNITIES SECTION
// Features careers, partnerships, and corporate solutions
// Editorial magazine-style grid inspired by Starbucks About page
// ═══════════════════════════════════════════════════════════════════════════

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// OPPORTUNITY CARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface OpportunityCardProps {
  opportunity: Opportunity;
  index: number;
}

function OpportunityCard({ opportunity, index }: OpportunityCardProps) {
  return (
    <article
      className="group relative"
      role="article"
      aria-labelledby={`opportunity-title-${opportunity.id}`}
    >
      {/* Category Tag with Icon */}
      <motion.div
        className="mb-5 flex items-center gap-2"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 + index * 0.1 }}
      >
        <span
          className="material-symbols-outlined text-primary text-lg"
          aria-hidden="true"
        >
          {opportunity.category.icon}
        </span>
        <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
          {opportunity.category.label}
        </span>
        {opportunity.highlight && (
          <span className="ml-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-primary/10 text-primary rounded-full">
            {opportunity.highlight}
          </span>
        )}
      </motion.div>

      {/* Title with Hover Effects */}
      <Link
        href={opportunity.link}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 rounded-sm"
      >
        <h3
          id={`opportunity-title-${opportunity.id}`}
          className="text-xl md:text-2xl lg:text-[1.65rem] font-bold leading-[1.25] text-[rgb(var(--color-text-main))] mb-4 transition-colors duration-300 group-hover:text-primary"
        >
          <span className="inline">{opportunity.title}</span>

          {/* Arrow Icon - appears on hover */}
          <motion.span
            className="inline-flex items-center ml-2 align-middle opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ x: -8 }}
            whileHover={{ x: 0 }}
          >
            <span
              className="material-symbols-outlined text-primary text-xl"
              aria-hidden="true"
            >
              arrow_forward
            </span>
          </motion.span>
        </h3>

        {/* Animated Underline */}
        <motion.div
          className="h-[2px] bg-primary origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </Link>

      {/* Description */}
      <p className="mt-4 text-sm text-[rgb(var(--color-text-body))] leading-relaxed">
        {opportunity.description}
      </p>

      {/* CTA Link */}
      <div className="mt-5 flex items-center gap-3">
        <Link
          href={opportunity.link}
          className="text-xs font-semibold uppercase tracking-[0.12em] text-primary hover:text-primary/80 transition-colors duration-200 flex items-center gap-1 group/cta"
        >
          {opportunity.ctaText}
          <motion.span
            className="material-symbols-outlined text-sm"
            aria-hidden="true"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            arrow_forward
          </motion.span>
        </Link>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function LatestOpportunities() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[rgb(var(--color-surface))] transition-colors duration-300 overflow-visible"
      aria-labelledby="latest-opportunities-heading"
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          RED ANGLED BACKGROUND SHAPE (Starbucks-inspired)
          Creates visual depth with cards overflowing
      ═══════════════════════════════════════════════════════════════════════ */}
      <div
        className="absolute left-0 right-0 top-0 h-[85%] md:h-[80%] bg-[rgb(var(--color-secondary))] dark:bg-[#1a0a10]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
        }}
        aria-hidden="true"
      >
        {/* Subtle pattern overlay on red background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/15 dark:from-primary/10 dark:via-transparent dark:to-black/20" />

        {/* Large text watermark */}
        <div
          className="absolute right-0 top-1/3 text-[6rem] md:text-[10rem] lg:text-[14rem] font-black text-white/[0.03] dark:text-white/[0.02] select-none pointer-events-none whitespace-nowrap leading-none tracking-tight -mr-8"
          aria-hidden="true"
        >
          OPPORTUNITIES
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - on the red background */}
        <motion.div
          className="mb-14 md:mb-20"
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2
            id="latest-opportunities-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight"
          >
            Latest Opportunities
          </h2>
        </motion.div>

        {/* Opportunities Grid - Cards overflow the red background */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          role="feed"
          aria-label="Latest opportunities"
        >
          {opportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.id}
              variants={itemVariants}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl shadow-black/10 dark:shadow-black/30 cursor-pointer"
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <OpportunityCard opportunity={opportunity} index={index} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
