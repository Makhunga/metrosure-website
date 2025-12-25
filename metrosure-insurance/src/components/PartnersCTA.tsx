"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { MagneticButton } from "./animations";

const highlights = [
  {
    icon: "trending_up",
    title: "Earn While You Build",
    description: "Competitive commission rates on every policy sold through your location",
    stat: "15-25%",
    statLabel: "commission rates",
  },
  {
    icon: "groups",
    title: "Create Local Jobs",
    description: "Jobs created nationwide, each partnership directly funds employment",
    stat: "5,000+",
    statLabel: "jobs created",
  },
  {
    icon: "verified",
    title: "Zero Hassle",
    description: "We handle staffing, training, marketing, and full regulatory compliance",
    stat: "100%",
    statLabel: "managed for you",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function PartnersCTA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label="Partnership Opportunities"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgb(105,0,37)] via-[rgb(140,3,20)] to-[rgb(191,6,3)]" />

      {/* Animated gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />

      {/* Connection Network Pattern - B2B Visual Language */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="partners-network"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            {/* Central node */}
            <circle cx="60" cy="60" r="3" fill="white" fillOpacity="0.15" />
            {/* Connection lines radiating out */}
            <line
              x1="60"
              y1="60"
              x2="120"
              y2="0"
              stroke="white"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
            <line
              x1="60"
              y1="60"
              x2="120"
              y2="120"
              stroke="white"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
            <line
              x1="60"
              y1="60"
              x2="0"
              y2="120"
              stroke="white"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
            <line
              x1="60"
              y1="60"
              x2="0"
              y2="0"
              stroke="white"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
            {/* Corner nodes */}
            <circle cx="0" cy="0" r="2" fill="white" fillOpacity="0.1" />
            <circle cx="120" cy="0" r="2" fill="white" fillOpacity="0.1" />
            <circle cx="0" cy="120" r="2" fill="white" fillOpacity="0.1" />
            <circle cx="120" cy="120" r="2" fill="white" fillOpacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#partners-network)" />
      </svg>

      {/* Floating orbs for atmosphere */}
      <motion.div
        className="absolute top-10 left-[10%] w-64 h-64 bg-white/5 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-[10%] w-80 h-80 bg-white/5 rounded-full blur-3xl"
        animate={{
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="material-symbols-outlined text-white/90 text-lg">
              storefront
            </span>
            <span className="text-sm font-semibold tracking-wide text-white/90 uppercase">
              For Retailers & Businesses
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Partner With Purpose
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We&apos;ve created 5,000+ jobs across South Africa by partnering with
            retailers and businesses like yours. Together, we bring trusted insurance
            to communities that need it most, while you earn competitive commissions.
          </motion.p>
        </div>

        {/* Highlight Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {highlights.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className="group relative p-6 md:p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-500"
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
            >
              {/* Icon */}
              <motion.div
                className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-white/20 transition-all duration-500"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="material-symbols-outlined text-white text-3xl">
                  {item.icon}
                </span>
              </motion.div>

              {/* Stat badge */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-bold text-white">{item.stat}</span>
                <span className="text-xs text-white/60 uppercase tracking-wide">
                  {item.statLabel}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
                <div className="absolute top-0 right-0 h-px w-8 bg-gradient-to-l from-white/30 to-transparent" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <MagneticButton strength={0.4}>
            <Link href="/partners">
              <motion.span
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-[rgb(105,0,37)] font-bold text-lg shadow-2xl shadow-black/20 hover:shadow-black/30 transition-shadow"
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span>Become a Partner</span>
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

          {/* Trust indicators */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 mt-8 text-white/60 text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">shield</span>
              FSP 47089 Licensed
            </span>
            <span className="hidden sm:block w-px h-4 bg-white/30" />
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">lock</span>
              POPIA Compliant
            </span>
            <span className="hidden sm:block w-px h-4 bg-white/30" />
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">
                schedule
              </span>
              Since 2016
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
