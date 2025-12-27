"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface UnderDevelopmentProps {
  pageName?: string;
  description?: string;
}

export default function UnderDevelopment({
  pageName = "This Feature",
  description = "We're putting the finishing touches on this page. Check back soon for the full experience.",
}: UnderDevelopmentProps) {
  return (
    <section className="flex-1 flex items-center justify-center px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center"
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 15 }}
          className="mb-12 inline-flex items-center justify-center w-28 h-28 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-500/20 dark:to-amber-600/10 shadow-lg shadow-amber-500/10"
        >
          <motion.span
            className="material-symbols-outlined text-6xl text-amber-600 dark:text-amber-400"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            construction
          </motion.span>
        </motion.div>

        {/* Page name badge */}
        {pageName && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-wide">
              {pageName}
            </span>
          </motion.div>
        )}

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-[rgb(var(--color-text-main))] mb-6 leading-tight"
        >
          Coming Soon
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-xl sm:text-2xl text-[rgb(var(--color-text-body))] mb-16 leading-relaxed max-w-2xl mx-auto"
        >
          {description}
        </motion.p>

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary hover:bg-[rgb(var(--color-primary-hover))] text-white font-bold text-lg transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            Back to Home
          </Link>
        </motion.div>

        {/* Subtle helper text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-sm text-[rgb(var(--color-text-muted))]"
        >
          Have questions?{" "}
          <Link href="/contact" className="text-primary hover:underline font-medium">
            Get in touch
          </Link>
        </motion.p>
      </motion.div>
    </section>
  );
}
