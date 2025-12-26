"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface UnderDevelopmentProps {
  pageName?: string;
  description?: string;
  showProgress?: boolean;
  progress?: number;
}

export default function UnderDevelopment({
  pageName = "This page",
  description = "We're working hard to bring you this feature. Check back soon!",
  showProgress = true,
  progress = 60,
}: UnderDevelopmentProps) {
  return (
    <section className="flex-1 flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Construction Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-amber-100 dark:bg-amber-500/30"
        >
          <span className="material-symbols-outlined text-5xl text-amber-600 dark:text-amber-400">
            engineering
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-4"
        >
          Under Development
        </motion.h1>

        {/* Page name badge */}
        {pageName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-4"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              {pageName}
            </span>
          </motion.div>
        )}

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-[rgb(var(--color-text-body))] mb-8"
        >
          {description}
        </motion.p>

        {/* Progress indicator */}
        {showProgress && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-full max-w-md mx-auto h-2 bg-[rgb(var(--color-border-light))] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-amber-500 rounded-full"
              />
            </div>
            <p className="text-sm text-[rgb(var(--color-text-muted))] mt-2">
              Development in progress...
            </p>
          </motion.div>
        )}

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid md:grid-cols-2 gap-4 mb-10"
        >
          <div className="p-6 rounded-xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-primary/30 transition-colors">
            <span className="material-symbols-outlined text-3xl text-primary mb-3 block">
              notifications_active
            </span>
            <h3 className="font-semibold text-[rgb(var(--color-text-main))] mb-2">
              Get Notified
            </h3>
            <p className="text-sm text-[rgb(var(--color-text-body))]">
              Contact us to be notified when this feature becomes available.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-primary/30 transition-colors">
            <span className="material-symbols-outlined text-3xl text-primary mb-3 block">
              feedback
            </span>
            <h3 className="font-semibold text-[rgb(var(--color-text-main))] mb-2">
              Share Feedback
            </h3>
            <p className="text-sm text-[rgb(var(--color-text-body))]">
              Have suggestions? We&apos;d love to hear what you&apos;d like to see.
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-[rgb(var(--color-primary-hover))] text-white font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-lg">home</span>
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[rgb(var(--color-border-light))] text-[rgb(var(--color-text-main))] hover:bg-[rgb(var(--color-surface-card))] font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-lg">mail</span>
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
