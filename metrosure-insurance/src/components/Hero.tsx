"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MagneticButton } from "./animations";

export default function Hero() {
  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-[rgb(var(--color-surface-card))] transition-colors duration-300 pt-36"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none opacity-60 animate-[grid-flow_20s_linear_infinite]" />

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        {/* Centered Content */}
        <div className="flex flex-col gap-8 text-center items-center max-w-6xl mx-auto">
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
              Trusted by Families,
            </motion.span>{" "}
            <br />
            <motion.span
              className="text-primary inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Powered by Partnerships
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg sm:text-xl text-[rgb(var(--color-text-body))] max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            From protecting your home and loved ones to transforming your retail space into a revenue stream—we help families feel secure and businesses grow. Join the network that&apos;s created over 5,000 jobs across South Africa.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <MagneticButton strength={0.4}>
              <Link href="/quote">
                <motion.span
                  className="h-14 px-8 rounded-xl bg-primary text-white text-lg font-bold transition-colors shadow-lg shadow-primary/25 flex items-center justify-center"
                  whileHover={{
                    boxShadow: "0 20px 40px -10px rgba(191, 6, 3, 0.5)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Start Your Quote
                </motion.span>
              </Link>
            </MagneticButton>
            <Link href="#products">
              <motion.span
                className="h-14 px-8 rounded-xl border-2 border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface-card))] text-[rgb(var(--color-text-main))] text-lg font-bold transition-colors flex items-center gap-2 group justify-center"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span>Explore Plans</span>
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

          {/* Partner Link - Secondary B2B CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 text-sm text-[rgb(var(--color-text-muted))] hover:text-primary transition-colors group"
            >
              <span className="material-symbols-outlined text-base">storefront</span>
              <span>
                Are you a retailer?{" "}
                <span className="font-semibold group-hover:underline">Partner with us</span>
              </span>
              <motion.span
                className="material-symbols-outlined text-base"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
              >
                arrow_forward
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
