"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Job } from "@/data/jobs";

interface JobDetailHeroProps {
  job: Job;
}

export default function JobDetailHero({ job }: JobDetailHeroProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${job.title} at Metrosure`,
          text: job.description,
          url,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative pt-32 pb-16 overflow-hidden bg-[rgb(var(--color-surface-card))] transition-colors duration-300">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large circle accent */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.03]"
          style={{ background: "rgb(191, 6, 3)" }}
        />
        {/* Grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.02]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-grid"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgb(var(--color-text-main))"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <motion.nav
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-[rgb(var(--color-text-muted))] hover:text-primary transition-colors"
              >
                Home
              </Link>
            </li>
            <span className="material-symbols-outlined text-[rgb(var(--color-text-muted))] text-sm">
              chevron_right
            </span>
            <li>
              <Link
                href="/careers"
                className="text-[rgb(var(--color-text-muted))] hover:text-primary transition-colors"
              >
                Careers
              </Link>
            </li>
            <span className="material-symbols-outlined text-[rgb(var(--color-text-muted))] text-sm">
              chevron_right
            </span>
            <li className="text-[rgb(var(--color-text-main))] font-medium truncate max-w-[200px] sm:max-w-none">
              {job.title}
            </li>
          </ol>
        </motion.nav>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Link
            href="/careers#open-positions"
            className="inline-flex items-center gap-2 text-[rgb(var(--color-text-body))] hover:text-primary transition-colors group mb-6"
          >
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="font-medium">Back to all positions</span>
          </Link>
        </motion.div>

        {/* Main hero content */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          {/* Left: Title and badges */}
          <div className="flex-1">
            {/* Badges */}
            <motion.div
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                <span className="material-symbols-outlined text-base">work</span>
                {job.department}
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-body))] text-sm font-medium border border-[rgb(var(--color-border-light))]">
                <span className="material-symbols-outlined text-base">
                  location_on
                </span>
                {job.location}
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-semibold">
                <span className="material-symbols-outlined text-base">
                  schedule
                </span>
                {job.type}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[rgb(var(--color-text-main))] leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {job.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg sm:text-xl text-[rgb(var(--color-text-body))] leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {job.description}
            </motion.p>
          </div>

          {/* Right: Actions */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 lg:flex-col lg:items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Apply button */}
            <Link href="#apply">
              <motion.span
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Apply Now</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </motion.span>
            </Link>

            {/* Share button */}
            <motion.button
              onClick={handleShare}
              className="inline-flex items-center justify-center gap-2 h-14 px-6 rounded-xl border-2 border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-main))] font-semibold transition-all hover:border-primary/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="material-symbols-outlined text-lg">
                {copied ? "check" : "share"}
              </span>
              <span>{copied ? "Link Copied!" : "Share Position"}</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Posted date */}
        <motion.div
          className="mt-8 pt-6 border-t border-[rgb(var(--color-border-light))]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-sm text-[rgb(var(--color-text-muted))]">
            <span className="material-symbols-outlined text-sm align-middle mr-1">
              calendar_today
            </span>
            Posted:{" "}
            {new Date(job.datePosted).toLocaleDateString("en-ZA", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
