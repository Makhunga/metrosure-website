"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ContactHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="text-center mb-20 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Headline */}
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        How can we help you today?
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Whether you&apos;re looking for personal cover, need help with a claim, or want to explore business partnerships,
        we&apos;re here for you. Our team across South Africa is ready to help individuals and businesses alike.
      </motion.p>

      {/* Working Hours */}
      <motion.div
        className="inline-flex items-center gap-6 px-6 py-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">schedule</span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">Working Hours</span>
        </div>
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
        <div className="flex flex-col sm:flex-row sm:gap-6 text-sm text-slate-600 dark:text-slate-300">
          <span><strong>Mon - Fri:</strong> 09:00 - 17:00</span>
          <span><strong>Sat, Sun & Holidays:</strong> Closed</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
