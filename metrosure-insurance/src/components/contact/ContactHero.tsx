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
        className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Whether you&apos;re looking for personal cover, need help with a claim, or want to explore business partnerships,
        we&apos;re here for you. Our team across South Africa is ready to help individuals and businesses alike.
      </motion.p>
    </motion.div>
  );
}
