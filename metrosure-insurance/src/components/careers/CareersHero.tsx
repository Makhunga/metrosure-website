"use client";

import { motion } from "framer-motion";

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
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-[rgb(var(--color-surface-card))] transition-colors duration-300 pt-36"
    >
      {/* Dotted Pattern Background - transparent center, visible at edges */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.20]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgb(var(--color-text-main)) 1.5px, transparent 0)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 45%, transparent 0%, transparent 50%, black 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 45%, transparent 0%, transparent 50%, black 100%)",
          }}
        />
      </div>

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none opacity-50" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="w-full flex flex-col gap-8 text-center items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 py-2 px-5 rounded-full bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] w-fit shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-sm font-bold tracking-wider uppercase text-[rgb(var(--color-text-body))]">
              We&apos;re Hiring
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-[rgb(var(--color-text-main))]"
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
            </motion.span>{" "}
            <br />
            <motion.span
              className="text-primary inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Future With Us
            </motion.span>
          </motion.h1>

          {/* Story Paragraph */}
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-[rgb(var(--color-text-body))] max-w-4xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            In 2013, we started with a simple mission: to take South Africa to the future.
            Since then, we&apos;ve created over 5,000 jobs, built a team known for consistency,
            reliability, and integrity, and helped thousands of families feel secure.
            Now, we&apos;re looking for passionate people to join us on this journey.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-5 pt-4 justify-center"
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
                className="material-symbols-outlined text-xl"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                arrow_forward
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Secondary Link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <a
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-[rgb(var(--color-text-muted))] hover:text-primary transition-colors group"
            >
              <span className="material-symbols-outlined text-base">info</span>
              <span>
                Want to learn more about us?{" "}
                <span className="font-semibold group-hover:underline">
                  Read our story
                </span>
              </span>
              <motion.span
                className="material-symbols-outlined text-base"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
              >
                arrow_forward
              </motion.span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
