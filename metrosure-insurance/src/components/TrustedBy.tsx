"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// TRUSTED BY SECTION - Metrosure Maroon
// Split layout with dramatic quarter-circle image
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
  hidden: { opacity: 0, y: 40, skewY: 2 },
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

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, x: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const, // Custom easing
      delay: 0.3,
    },
  },
};

export default function TrustedBy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 md:py-20 lg:py-24 bg-primary dark:bg-neutral-900 transition-colors duration-300"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-[0.03]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Content */}
          <div className="flex flex-col justify-center h-full py-8 lg:py-0">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <span className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-white/70">
                Trusted Partners
              </span>
            </motion.div>

            {/* Typography */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="text-left"
            >
              <motion.div variants={lineVariants} className="overflow-hidden mb-6">
                <span className="block text-4xl sm:text-5xl md:text-6xl font-black leading-[0.9] tracking-tight text-white">
                  TRUSTED BY
                </span>
              </motion.div>
              <motion.div variants={lineVariants} className="overflow-hidden mb-6">
                <span className="block text-4xl sm:text-5xl md:text-6xl font-black leading-[0.9] tracking-tight text-white/80">
                  BUSINESSES
                </span>
              </motion.div>
              <motion.div variants={lineVariants} className="overflow-hidden">
                <span className="block text-4xl sm:text-5xl md:text-6xl font-black leading-[0.9] tracking-tight text-white">
                  SMALL & LARGE
                </span>
              </motion.div>
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-14 text-lg font-medium max-w-lg text-white/80 leading-relaxed"
            >
              From local startups to national enterprises, we provide the
              comprehensive coverage and strategic partnerships that help South
              African businesses thrive.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-14 flex flex-wrap gap-4"
            >
              <Link href="/partners">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-xl font-semibold bg-white text-primary shadow-lg shadow-black/20 transition-all duration-300 hover:bg-white/90"
                >
                  Partner With Us
                </motion.button>
              </Link>

              <Link href="/corporate">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-xl font-semibold border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  Corporate Solutions
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Image with unique shape */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={imageVariants}
            className="relative w-full aspect-square max-w-md lg:max-w-full lg:h-auto mx-auto lg:ml-auto flex items-end"
          >
            {/* 
                QUARTER CIRCLE SHAPE:
                - rounded-tl-[100px] or more creates the curve
                - Zendesk uses a very dramatic curve, likely 100% or close to it on one corner
             */}
            <div className="w-full aspect-square relative overflow-hidden rounded-tl-[100%] bg-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                alt="Business meeting collaboration"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay for better integration */}
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-60" />
            </div>


          </motion.div>

        </div>
      </div>
    </section>
  );
}
