"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Difference() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-[rgb(var(--color-surface))] border-y border-[rgb(var(--color-border-light))] transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          {/* Left Image */}
          <motion.div
            className="flex-1 order-2 md:order-1 relative"
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[rgb(var(--color-border-light))] group cursor-pointer aspect-[3/2] bg-gradient-to-br from-slate-200 via-slate-100 to-white dark:from-slate-700 dark:via-slate-600 dark:to-slate-500">
              {/* Team Icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="material-symbols-outlined text-[120px] text-primary/15">
                  diversity_3
                </span>
              </motion.div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.button
                  className="w-20 h-20 rounded-full bg-primary/90 backdrop-blur-md flex items-center justify-center shadow-xl hover:bg-primary"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                >
                  <motion.span
                    className="material-symbols-outlined text-white text-4xl ml-1"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    play_arrow
                  </motion.span>
                </motion.button>
              </div>
            </div>

            {/* Decorative Border */}
            <motion.div
              className="absolute -z-10 -bottom-6 -right-6 w-full h-full border-2 border-[rgb(var(--color-border-light))] rounded-2xl bg-transparent"
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 20, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
          </motion.div>

          {/* Right Content */}
          <motion.div
            className="flex-1 order-1 md:order-2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="inline-block px-3 py-1 rounded bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              The Metrosure Difference
            </motion.div>
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--color-text-main))]"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Protection that evolves with you
            </motion.h2>
            <motion.p
              className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Life doesn&apos;t stand still, and neither should your insurance. We built a dynamic
              coverage model that adapts as your family grows, your assets increase, and your goals
              shift.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="pt-4 flex gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.p
                  className="text-3xl font-bold text-[rgb(var(--color-text-main))]"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                >
                  15k+
                </motion.p>
                <p className="text-sm text-[rgb(var(--color-text-muted))] font-medium mt-1">
                  Policies Updated
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.p
                  className="text-3xl font-bold text-[rgb(var(--color-text-main))]"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                >
                  4.9/5
                </motion.p>
                <p className="text-sm text-[rgb(var(--color-text-muted))] font-medium mt-1">
                  Customer Satisfaction
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
