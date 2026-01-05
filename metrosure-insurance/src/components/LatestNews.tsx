"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import { latestNews, NewsArticle } from "@/data/news";

// ═══════════════════════════════════════════════════════════════════════════
// LATEST NEWS SECTION
// Editorial magazine-style news grid inspired by Starbucks About page
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
// NEWS CARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

function NewsCard({ article, index }: NewsCardProps) {
  return (
    <article
      className="group relative"
      role="article"
      aria-labelledby={`news-title-${article.id}`}
    >
      {/* Category Tag */}
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 + index * 0.1 }}
      >
        <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
          {article.category.label}
        </span>
      </motion.div>

      {/* Title with Hover Effects */}
      <Link
        href={`/news/${article.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 rounded-sm"
      >
        <h3
          id={`news-title-${article.id}`}
          className="text-xl md:text-2xl lg:text-[1.65rem] font-bold leading-[1.25] text-[rgb(var(--color-text-main))] mb-4 transition-colors duration-300 group-hover:text-primary"
        >
          <span className="inline">
            {article.title}
          </span>

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

      {/* Read Time with Separator */}
      <div className="mt-5 flex items-center gap-3 text-[rgb(var(--color-text-muted))]">
        <span className="w-8 h-px bg-[rgb(var(--color-border-medium))]" aria-hidden="true" />
        <span className="text-xs font-medium uppercase tracking-[0.12em]">
          {article.readTime} MIN READ
        </span>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function LatestNews() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[rgb(var(--color-surface))] transition-colors duration-300 overflow-visible"
      aria-labelledby="latest-news-heading"
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          RED ANGLED BACKGROUND SHAPE (Starbucks-inspired)
          Creates visual depth with news cards overflowing
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
            id="latest-news-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight"
          >
            Latest News
          </h2>

          {/* Decorative accent line - white on red */}
          <motion.div
            className="mt-6 h-1 w-20 bg-white rounded-full"
            initial={{ scaleX: 0, originX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />
        </motion.div>

        {/* News Grid - Cards overflow the red background */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          role="feed"
          aria-label="Latest news articles"
        >
          {latestNews.slice(0, 3).map((article, index) => (
            <motion.div
              key={article.id}
              variants={itemVariants}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl shadow-black/10 dark:shadow-black/30"
            >
              <NewsCard article={article} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link - below the cards */}
        <motion.div
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link
            href="/news"
            className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.15em] text-[rgb(var(--color-text-body))] hover:text-primary transition-colors duration-300"
          >
            <span>View All Stories</span>
            <motion.span
              className="material-symbols-outlined text-lg"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              aria-hidden="true"
            >
              arrow_forward
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
