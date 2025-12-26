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

export default function Hero() {
  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-[rgb(var(--color-surface-card))] transition-colors duration-300 pt-36"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none opacity-60 animate-[grid-flow_20s_linear_infinite]" />

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

        {/* Small floating square - top right */}
        <FloatingShape
          className="absolute top-32 right-[20%] w-20 h-20 rounded-2xl bg-[#F2CC8E]/[0.1] dark:bg-[#F2CC8E]/[0.05] hidden lg:block"
          animate={{
            y: [0, 25, 0],
            x: [0, 15, 0],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
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

        {/* Tiny accent square - floating center-right */}
        <FloatingShape
          className="absolute top-[40%] right-[30%] w-10 h-10 rounded-lg bg-[#DF7A5E]/[0.12] dark:bg-[#DF7A5E]/[0.06] hidden lg:block"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        />

        {/* Arc shape - top center-right */}
        <FloatingShape
          className="absolute top-20 right-[35%] w-32 h-16 rounded-t-full bg-[#3C405B]/[0.05] dark:bg-[#F4F1DE]/[0.03] hidden xl:block"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />

        {/* Small quarter-circle - bottom center */}
        <FloatingShape
          className="absolute bottom-20 left-[40%] w-16 h-16 rounded-bl-full bg-[#F4F1DE]/[0.15] dark:bg-[#F4F1DE]/[0.05] hidden md:block"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
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
      </div>

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
