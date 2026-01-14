"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface CareersHeroProps {
  onApplyClick: () => void;
}

export default function CareersHero({ onApplyClick }: CareersHeroProps) {
  const scrollToPositions = () => {
    const positionsSection = document.getElementById("open-positions");
    if (positionsSection) {
      positionsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[rgb(var(--color-surface-card))] transition-colors duration-300 pt-32 pb-16">
      {/* 3D Blocks Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/resources/blocks3D.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.06] dark:opacity-15 dark:invert dark:brightness-50"
          priority
          aria-hidden="true"
        />
        {/* Light mode overlay - subtle gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--color-surface-card))]/60 via-transparent to-[rgb(var(--color-surface-card))]/80 dark:from-[rgb(var(--color-surface))]/70 dark:via-[rgb(var(--color-surface))]/30 dark:to-[rgb(var(--color-surface))]/90" />
      </div>

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none opacity-50" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full flex flex-col gap-10 text-center items-center">
          {/* Badge - Bolder with accent styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 py-3 px-6 rounded-full bg-accent/10 border border-accent/30 w-fit shadow-sm"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
            <span className="text-sm font-bold tracking-wider uppercase text-[rgb(var(--color-text-main))]">
              We&apos;re Hiring
            </span>
          </motion.div>

          {/* Massive Headline - Homerun-inspired */}
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10rem] font-bold leading-[0.9] tracking-tight text-[rgb(var(--color-text-main))]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Build Your
            </motion.span>
            <br />
            <motion.span
              className="text-primary inline-block relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Future
              {/* Hand-drawn underline accent - bolder */}
              <motion.svg
                className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-4 md:h-6"
                viewBox="0 0 200 12"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.path
                  d="M2 8 C50 2, 150 14, 198 6"
                  stroke="#F2CC8E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </motion.svg>
            </motion.span>
          </motion.h1>

          {/* Short tagline - replaces long paragraph */}
          <motion.p
            className="text-xl sm:text-2xl text-[rgb(var(--color-text-muted))] max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Join 5,000+ people transforming the insurance industry across South Africa
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-5 pt-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.button
              onClick={scrollToPositions}
              className="h-16 px-10 rounded-xl bg-primary text-white text-lg font-bold transition-colors shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: "0 20px 40px -10px rgba(191, 6, 3, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span>View Open Positions</span>
              <span className="material-symbols-outlined">arrow_downward</span>
            </motion.button>
            <motion.button
              onClick={onApplyClick}
              className="h-16 px-10 rounded-xl border-2 border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface-card))] text-[rgb(var(--color-text-main))] text-lg font-bold transition-colors flex items-center gap-2 group justify-center"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span>Apply Now</span>
              <motion.span
                className="material-symbols-outlined text-lg"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                arrow_forward
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
