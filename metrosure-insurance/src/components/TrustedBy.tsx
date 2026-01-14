"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// TRUSTED BY SECTION - Metrosure Maroon
// Bold brand-coloured section with dramatic typography
// ═══════════════════════════════════════════════════════════════════════════

// Animation variants for staggered text reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
} as const;

const lineVariants = {
  hidden: { opacity: 0, y: 80, skewY: 3 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

export default function TrustedBy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 md:py-20 lg:py-24 bg-primary transition-colors duration-300"
    >
      {/* Background Pattern - subtle grid (matching PartnersCTA) */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
      </div>

      {/* Floating geometric accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-16 -left-16 w-32 h-32 rounded-br-full bg-white/5"
          animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-16 -right-16 w-40 h-40 rounded-tl-full bg-white/5"
          animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top left small label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-white/70">
            Trusted Partners
          </span>
        </motion.div>

        {/* Main typography - Full width, stacked */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-left"
        >
          {/* Line 1 */}
          <motion.div variants={lineVariants} className="overflow-hidden">
            <span className="block text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] font-black leading-[0.85] tracking-[-0.04em] text-white">
              TRUSTED BY
            </span>
          </motion.div>

          {/* Line 2 - slightly muted */}
          <motion.div variants={lineVariants} className="overflow-hidden">
            <span className="block text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] font-black leading-[0.85] tracking-[-0.04em] text-white/80">
              BUSINESSES
            </span>
          </motion.div>

          {/* Line 3 */}
          <motion.div variants={lineVariants} className="overflow-hidden">
            <span className="block text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] font-black leading-[0.85] tracking-[-0.04em] text-white">
              SMALL & LARGE
            </span>
          </motion.div>
        </motion.div>

        {/* Subtext - white */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 md:mt-12 text-lg md:text-xl lg:text-2xl font-medium max-w-2xl text-white/80"
        >
          From protecting families to powering retail partnerships. We help
          South African businesses grow with confidence.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 md:mt-10 flex flex-wrap gap-4"
        >
          {/* Primary button - white */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-xl font-semibold bg-white text-primary shadow-lg shadow-black/20 transition-all duration-300 hover:bg-white/90"
          >
            Partner With Us
          </motion.button>

          {/* Secondary button - outline */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-xl font-semibold border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            Explore Solutions
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
