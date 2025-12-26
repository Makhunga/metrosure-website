"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function PartnersHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-[rgb(var(--color-surface-card))] transition-colors duration-300 pt-36"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none opacity-60 animate-[grid-flow_20s_linear_infinite]" />

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />

      {/* Connection Network Lines - B2B Visual */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="connection-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="2" fill="rgb(191, 6, 3)" />
            <line x1="50" y1="50" x2="100" y2="0" stroke="rgb(191, 6, 3)" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="100" y2="100" stroke="rgb(191, 6, 3)" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="0" y2="100" stroke="rgb(191, 6, 3)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#connection-pattern)" />
      </svg>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[rgb(var(--color-secondary))]/10 rounded-full blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20"
      >
        {/* Content */}
        <div className="w-full flex flex-col gap-10 text-center items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 py-2 px-5 rounded-full bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] w-fit shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="text-sm font-bold tracking-wider uppercase text-[rgb(var(--color-text-body))]">
              B2B Partnership Program
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
              Transform Your
            </motion.span>{" "}
            <br className="hidden sm:block" />
            <motion.span
              className="text-primary inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Retail Space
            </motion.span>{" "}
            <br className="hidden lg:block" />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Into Revenue
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl sm:text-2xl lg:text-2xl text-[rgb(var(--color-text-body))] max-w-4xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Partner with Metrosure to bring in-store insurance solutions to your customers.
            We deploy trained sales teams, handle all compliance, and share the revenue,
            you focus on your business while creating local jobs.
          </motion.p>

          {/* Consumer Cross-link */}
          <motion.div
            className="mt-4 flex items-center justify-center gap-2 text-sm text-[rgb(var(--color-text-muted))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.85 }}
          >
            <span className="material-symbols-outlined text-base">person</span>
            <span>Looking for personal insurance?</span>
            <a
              href="/quote"
              className="text-primary font-medium hover:opacity-80 transition-opacity inline-flex items-center gap-1"
            >
              Get a free quote
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </a>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">group</span>
              <span className="text-lg font-semibold text-[rgb(var(--color-text-main))]">5,000+ Jobs Created</span>
            </div>
            <div className="w-px h-6 bg-[rgb(var(--color-border-medium))] hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">storefront</span>
              <span className="text-lg font-semibold text-[rgb(var(--color-text-main))]">100+ Retail Partners</span>
            </div>
            <div className="w-px h-6 bg-[rgb(var(--color-border-medium))] hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">verified</span>
              <span className="text-lg font-semibold text-[rgb(var(--color-text-main))]">FSP Licensed</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-5 pt-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="#partner-inquiry">
              <motion.span
                className="h-16 px-10 rounded-xl bg-primary text-white text-lg font-bold transition-colors shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 20px 40px -10px rgba(191, 6, 3, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span>Become a Partner</span>
                <span className="material-symbols-outlined">handshake</span>
              </motion.span>
            </Link>
            <Link href="#how-it-works">
              <motion.span
                className="h-16 px-10 rounded-xl border-2 border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface-card))] text-[rgb(var(--color-text-main))] text-lg font-bold transition-colors flex items-center gap-2 group justify-center"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span>How It Works</span>
                <motion.span
                  className="material-symbols-outlined text-xl"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  arrow_forward
                </motion.span>
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
