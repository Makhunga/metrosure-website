"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MagneticButton, SmoothParallax, Floating } from "./animations";

export default function Hero() {
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
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-[rgb(var(--color-surface-card))] transition-colors duration-300"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none opacity-60 animate-[grid-flow_20s_linear_infinite]" />

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />

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
        {/* Split Layout: Text Left, Image Right (on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Text */}
          <div className="flex flex-col gap-8 text-center lg:text-left items-center lg:items-start">
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
                FSP 47089 | Authorised Financial Service Provider
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
                Taking You
              </motion.span>{" "}
              <br />
              <motion.span
                className="text-primary inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                to the Future
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg sm:text-xl text-[rgb(var(--color-text-body))] max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              We protect what matters most, whether you&apos;re an individual securing your family&apos;s future or a business looking to grow through partnership.
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

          {/* Right Content - Parallax Image (Desktop Only) */}
          <div className="relative h-[500px] hidden lg:block">
            {/* Background gradient layer - moves slower */}
            <SmoothParallax speed={0.2} className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-[rgb(var(--color-secondary))]/20 rounded-3xl" />
            </SmoothParallax>

            {/* Main image - standard speed */}
            <SmoothParallax speed={0.4} className="absolute inset-4">
              <motion.div
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-[rgb(var(--color-border-light))]"
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="/images/family-image-metrosure-1.webp"
                  alt="Happy South African family protected by Metrosure"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 0vw, 50vw"
                  priority
                />
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </motion.div>
            </SmoothParallax>

            {/* Floating accent card - moves faster */}
            <SmoothParallax speed={0.6} className="absolute -bottom-4 -left-4 z-10">
              <Floating duration={4} distance={8}>
                <motion.div
                  className="bg-[rgb(var(--color-surface-card))] rounded-xl p-4 shadow-xl border border-[rgb(var(--color-border-light))] backdrop-blur-sm"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-lg">verified</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[rgb(var(--color-text-main))]">FSP Authorised</p>
                      <p className="text-xs text-[rgb(var(--color-text-muted))]">Since 2017</p>
                    </div>
                  </div>
                </motion.div>
              </Floating>
            </SmoothParallax>

            {/* Second floating card - top right */}
            <SmoothParallax speed={0.5} className="absolute -top-2 -right-2 z-10">
              <Floating duration={5} distance={6}>
                <motion.div
                  className="bg-primary rounded-xl p-4 shadow-xl"
                  initial={{ opacity: 0, x: 30, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-white">
                      <p className="text-2xl font-bold">5,000+</p>
                      <p className="text-xs text-white/80">Jobs Created</p>
                    </div>
                  </div>
                </motion.div>
              </Floating>
            </SmoothParallax>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
