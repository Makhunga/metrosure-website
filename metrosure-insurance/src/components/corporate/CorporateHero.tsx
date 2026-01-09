"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/animations";
import { corporateStats } from "@/data/corporateServices";

const statIcons: Record<string, string> = {
  "Corporate Clients": "apartment",
  "Employees Covered": "groups",
  "Claims Processed": "speed",
  "Years Experience": "workspace_premium",
};

export default function CorporateHero() {
  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-[rgb(var(--color-surface-card))] transition-colors duration-300 pt-36"
    >
      {/* Geometric Shapes Background - Artistic Integration */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base geometric pattern layer */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/geometric-shapes-pattern.svg')",
            opacity: 0.08,
          }}
        />
        {/* Red colour overlay to blend with brand */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(191, 6, 3, 0.15) 0%, rgba(191, 6, 3, 0.08) 50%, transparent 100%)",
            mixBlendMode: "multiply",
          }}
        />
        {/* Radial fade from centre - content area stays clearer */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 70% at 50% 40%, rgb(var(--color-surface-card)) 0%, transparent 70%)",
          }}
        />
        {/* Bottom fade for smooth transition to next section */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 60%, rgb(var(--color-surface-card)) 100%)",
          }}
        />
      </div>

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none opacity-50" />

      {/* Connection Network Lines - Corporate Visual */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="corporate-connection-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="2" fill="rgb(191, 6, 3)" />
            <line x1="50" y1="50" x2="100" y2="0" stroke="rgb(191, 6, 3)" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="100" y2="100" stroke="rgb(191, 6, 3)" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="0" y2="100" stroke="rgb(191, 6, 3)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#corporate-connection-pattern)" />
      </svg>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        {/* Content */}
        <div className="w-full flex flex-col gap-10 text-center items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 py-2 px-5 rounded-full bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] w-fit shadow-sm"
          >
            <span className="text-sm font-bold tracking-wider uppercase text-[rgb(var(--color-text-body))]">
              Corporate Employee Solutions
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
              Comprehensive
            </motion.span>{" "}
            <br className="hidden sm:block" />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Benefits for
            </motion.span>{" "}
            <br className="hidden lg:block" />
            <motion.span
              className="text-primary inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Your Workforce
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl sm:text-2xl lg:text-2xl text-[rgb(var(--color-text-body))] max-w-4xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Attract and retain top talent with comprehensive employee benefits.
            From group medical aid to retirement funds, we design packages that
            protect your employees and strengthen your business.
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
              className="group text-primary font-medium hover:opacity-80 transition-opacity inline-flex items-center gap-1"
            >
              Get a free quote
              <span className="material-symbols-outlined text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1 group-hover:translate-x-0">arrow_forward</span>
            </a>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            {corporateStats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">
                  {statIcons[stat.label] || "check_circle"}
                </span>
                <span className="text-lg font-semibold text-[rgb(var(--color-text-main))]">
                  {stat.value} {stat.label}
                </span>
                {index < corporateStats.length - 1 && (
                  <div className="w-px h-6 bg-[rgb(var(--color-border-medium))] hidden sm:block ml-6" />
                )}
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-5 pt-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <MagneticButton strength={0.4}>
              <Link href="#corporate-inquiry">
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
                  <span>Get a Consultation</span>
                  <span className="material-symbols-outlined">calendar_month</span>
                </motion.span>
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.3}>
              <Link href="#corporate-services">
                <motion.span
                  className="h-16 px-10 rounded-xl border-2 border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface-card))] text-[rgb(var(--color-text-main))] text-lg font-bold transition-colors flex items-center gap-2 group justify-center"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span>Learn More</span>
                  <motion.span
                    className="material-symbols-outlined text-xl"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    arrow_forward
                  </motion.span>
                </motion.span>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
