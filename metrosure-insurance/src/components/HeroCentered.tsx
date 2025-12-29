"use client";

import Link from "next/link";
import { motion, TargetAndTransition, Transition } from "framer-motion";
import { MagneticButton } from "./animations";

// Floating shape component
function FloatingShape({
  className,
  animate,
  transition,
  style
}: {
  className: string;
  animate: TargetAndTransition;
  transition: Transition;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      animate={animate}
      transition={transition}
      style={style}
    />
  );
}

export default function HeroCentered() {
  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-[rgb(var(--color-surface-card))] transition-colors duration-300 pt-36"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none opacity-10 animate-[grid-flow_20s_linear_infinite]" />

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large quarter-circle - top left */}
        <FloatingShape
          className="absolute -top-20 -left-20 w-80 h-80 rounded-br-full bg-[#82B29A]/[0.07] dark:bg-[#82B29A]/[0.04]"
          animate={{
            y: [0, 30, 0],
            x: [0, 15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Large quarter-circle - bottom right */}
        <FloatingShape
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-tl-full bg-[#F2CC8E]/[0.08] dark:bg-[#F2CC8E]/[0.04]"
          animate={{
            y: [0, -25, 0],
            x: [0, -20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Medium circle - right side */}
        <FloatingShape
          className="absolute top-1/4 right-[10%] w-48 h-48 rounded-full bg-[#DF7A5E]/[0.06] dark:bg-[#DF7A5E]/[0.03] blur-sm"
          animate={{
            y: [0, 40, 0],
            x: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Medium quarter-circle - left side */}
        <FloatingShape
          className="absolute top-1/2 -left-10 w-40 h-40 rounded-tr-full bg-[#3C405B]/[0.06] dark:bg-[#F4F1DE]/[0.03]"
          animate={{
            y: [0, -35, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        {/* Small circle - bottom left area */}
        <FloatingShape
          className="absolute bottom-40 left-[15%] w-24 h-24 rounded-full bg-[#82B29A]/[0.08] dark:bg-[#82B29A]/[0.04] hidden md:block"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        {/* Accent diamond - left side */}
        <FloatingShape
          className="absolute top-[60%] left-[8%] w-12 h-12 bg-[#F2CC8E]/[0.1] dark:bg-[#F2CC8E]/[0.05] hidden lg:block"
          style={{ transform: 'rotate(45deg)' }}
          animate={{
            y: [0, 25, 0],
            rotate: [45, 90, 45],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />

        {/* Additional shape - top right */}
        <FloatingShape
          className="absolute top-[20%] right-[15%] w-20 h-20 rounded-full bg-[#82B29A]/[0.06] dark:bg-[#82B29A]/[0.03] hidden lg:block"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        {/* Centered Content */}
        <div className="w-full flex flex-col gap-10 text-center items-center">
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
            <br className="hidden sm:block" />
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
            className="text-xl sm:text-2xl lg:text-2xl text-[rgb(var(--color-text-body))] max-w-4xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            From protecting your home and loved ones to transforming your retail space into a revenue stream - we help families feel secure and businesses grow.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-5 pt-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <MagneticButton strength={0.4}>
              <Link href="/quote">
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
                  <span>Start Your Quote</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </motion.span>
              </Link>
            </MagneticButton>
            <Link href="#products">
              <motion.span
                className="h-16 px-10 rounded-xl border-2 border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface-card))] text-[rgb(var(--color-text-main))] text-lg font-bold transition-colors flex items-center gap-2 group justify-center"
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
            className="mt-4 flex items-center justify-center gap-2 text-sm text-[rgb(var(--color-text-muted))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.85 }}
          >
            <span className="material-symbols-outlined text-base">storefront</span>
            <span>Are you a retailer?</span>
            <Link
              href="/partners"
              className="text-primary font-medium hover:opacity-80 transition-opacity inline-flex items-center gap-1"
            >
              Partner with us
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
