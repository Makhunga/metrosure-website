"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function QuoteCTABanner() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-24"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[#8a0502]" />

      {/* Chevron Pattern Overlay - suggests protection/shelter */}
      <div className="absolute inset-0 opacity-[0.08]">
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            <pattern
              id="chevron-pattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-15)"
            >
              <path
                d="M0 10 L10 0 L20 10"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#chevron-pattern)" />
        </svg>
      </div>

      {/* Diagonal accent line */}
      <motion.div
        className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent transform skew-x-[-12deg] origin-top-right"
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      {/* Floating shield accent */}
      <motion.div
        className="absolute right-[10%] top-1/2 -translate-y-1/2 opacity-10 hidden lg:block"
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={isInView ? { opacity: 0.1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -10 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span className="material-symbols-outlined text-white text-[200px]">
          shield
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Trust badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="material-symbols-outlined text-white/90 text-sm">
                verified
              </span>
              <span className="text-white/90 text-sm font-medium tracking-wide">
                5,000+ families trust us
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Ready to get{" "}
              <span className="relative">
                protected
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-1 bg-white/30 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  style={{ originX: 0 }}
                />
              </span>
              ?
            </motion.h2>

            {/* Subtext */}
            <motion.p
              className="text-lg text-white/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Get your personalised quote in minutes. Our team compares 30+ insurers to find you the best cover at the best price.
            </motion.p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Primary CTA */}
            <Link href="/quote">
              <motion.div
                className="group relative inline-flex items-center justify-center gap-3 h-12 px-8 rounded-xl bg-white text-primary font-bold text-base shadow-lg shadow-black/20 overflow-hidden"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {/* Hover gradient overlay */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                <span className="material-symbols-outlined text-xl">
                  bolt
                </span>
                <span className="relative">Get a Free Quote</span>
                <motion.span
                  className="material-symbols-outlined text-lg"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  arrow_forward
                </motion.span>
              </motion.div>
            </Link>

            {/* Secondary CTA */}
            <a href="tel:+27313011192">
              <motion.div
                className="group inline-flex items-center justify-center gap-3 h-12 px-8 rounded-xl border-2 border-white/40 text-white font-bold text-base hover:bg-white/10 hover:border-white/60 transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="material-symbols-outlined text-xl">
                  call
                </span>
                <span>Talk to an Agent</span>
              </motion.div>
            </a>
          </motion.div>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
      </div>
    </section>
  );
}
