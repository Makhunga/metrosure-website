"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CallToAction() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 bg-[rgb(var(--color-surface-card))] transition-colors duration-300"
    >
      <motion.div
        className="max-w-6xl mx-auto bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Decorative Blurs */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="relative z-10 flex flex-col items-center gap-8">
          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to feel secure?
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 max-w-2xl font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Join thousands of others who have switched to a smarter, more human way of insuring
            their future.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/quote">
              <motion.span
                className="bg-white text-primary text-lg font-bold py-4 px-10 rounded-lg shadow-xl flex items-center justify-center"
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Get Your Free Quote
              </motion.span>
            </Link>
            <Link href="/contact">
              <motion.span
                className="bg-[rgb(var(--color-primary-hover))] border border-white/20 text-white text-lg font-bold py-4 px-10 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Contact Sales
              </motion.span>
            </Link>
          </motion.div>

          <motion.p
            className="text-sm text-white/70 mt-2 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.span
              className="material-symbols-outlined text-sm"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              lock
            </motion.span>
            Secure & Confidential. No spam.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
