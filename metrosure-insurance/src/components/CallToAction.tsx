"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { MagneticButton } from "./animations";

export default function CallToAction() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

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
        {/* Geometric Shape Decorations */}
        <svg
          className="absolute -top-10 -left-10 w-40 h-40 opacity-10"
          viewBox="0 0 100 100"
        >
          <path d="M100 0 A100 100 0 0 1 0 100 L0 0 Z" fill="white" />
        </svg>
        <svg
          className="absolute -bottom-8 -right-8 w-32 h-32 opacity-10 rotate-180"
          viewBox="0 0 100 100"
        >
          <path d="M100 0 A100 100 0 0 1 0 100 L0 0 Z" fill="white" />
        </svg>
        <motion.svg
          className="absolute top-1/4 right-10 w-6 h-6 opacity-30"
          viewBox="0 0 100 100"
          animate={prefersReducedMotion ? {} : { rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <polygon points="50,0 100,50 50,100 0,50" fill="white" />
        </motion.svg>
        <motion.svg
          className="absolute bottom-1/3 left-12 w-4 h-4 opacity-25"
          viewBox="0 0 100 100"
          animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <polygon points="50,0 100,50 50,100 0,50" fill="white" />
        </motion.svg>

        {/* Decorative Blurs */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"
          animate={prefersReducedMotion ? {} : {
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
            Ready to grow together?
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 max-w-2xl font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Whether you're protecting your family or transforming your retail space into a revenue
            stream—your next chapter starts here.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MagneticButton strength={0.3}>
              <Link href="/quote">
                <motion.span
                  className="bg-white text-primary text-lg font-bold py-4 px-10 rounded-lg shadow-xl flex items-center justify-center"
                  whileHover={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Get Your Free Quote
                </motion.span>
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.3}>
              <Link href="/partners">
                <motion.span
                  className="bg-[rgb(var(--color-primary-hover))] border border-white/20 text-white text-lg font-bold py-4 px-10 rounded-lg flex items-center justify-center gap-2"
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="material-symbols-outlined text-xl">storefront</span>
                  Become a Partner
                </motion.span>
              </Link>
            </MagneticButton>
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
