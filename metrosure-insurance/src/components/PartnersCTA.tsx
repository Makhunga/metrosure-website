"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MagneticButton } from "./animations";

const highlights = [
  {
    icon: "trending_up",
    title: "Proven Sales Growth",
    description: "Our retail partners see average sales increases within the first 6 months of partnership",
    stat: "75%",
    statLabel: "average increase",
  },
  {
    icon: "verified",
    title: "Quality Assurance",
    description: "Our dedicated QA team ensures every sale is compliant and meets the highest standards",
    stat: "95%",
    statLabel: "daily QA average",
  },
  {
    icon: "groups",
    title: "Youth Employment",
    description: "We recruit and develop young individuals, creating jobs across 7 provinces",
    stat: "5,000+",
    statLabel: "jobs created",
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
      className="relative py-24 md:py-32 overflow-hidden bg-primary"
      aria-label="Partnership Opportunities"
    >
      {/* Geometric Pattern - Left Side */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[40%] pointer-events-none hidden lg:block"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 [mask-image:linear-gradient(to_right,white_0%,white_30%,transparent_100%)]">
          <Image
            src="/resources/vecteezy_abstract-geometric-pattern-artwork-retro-colors-and-color_6253957.svg"
            alt="Abstract geometric pattern decoration"
            fill
            className="object-cover object-right opacity-20 mix-blend-soft-light scale-150"
            aria-hidden="true"
          />
        </div>
        {/* Color overlay to blend with primary */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/60 to-primary" />
      </motion.div>

      {/* Geometric Pattern - Right Side */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-[40%] pointer-events-none hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        <div className="absolute inset-0 [mask-image:linear-gradient(to_left,white_0%,white_30%,transparent_100%)]">
          <Image
            src="/resources/vecteezy_abstract-geometric-pattern-artwork-retro-colors-and-color_6253957.svg"
            alt="Abstract geometric pattern decoration"
            fill
            className="object-cover object-left opacity-20 mix-blend-soft-light scale-150 -scale-x-100"
            aria-hidden="true"
          />
        </div>
        {/* Color overlay to blend with primary */}
        <div className="absolute inset-0 bg-gradient-to-l from-primary/40 via-primary/60 to-primary" />
      </motion.div>

      {/* Subtle animated geometric accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating quarter-circle accent - top left */}
        <motion.div
          className="absolute -top-16 -left-16 w-32 h-32 rounded-br-full bg-[#F2CC8E]/10"
          animate={{
            y: [0, 10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Floating quarter-circle accent - bottom right */}
        <motion.div
          className="absolute -bottom-16 -right-16 w-40 h-40 rounded-tl-full bg-[#82B29A]/10"
          animate={{
            y: [0, -10, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        {/* Small floating square - middle left */}
        <motion.div
          className="absolute top-1/3 left-8 w-8 h-8 bg-[#DF7A5E]/15 rounded-lg hidden md:block"
          animate={{
            y: [0, 15, 0],
            x: [0, 5, 0],
            rotate: [0, 45, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Small floating square - middle right */}
        <motion.div
          className="absolute top-2/3 right-12 w-6 h-6 bg-[#F4F1DE]/15 rounded-md hidden md:block"
          animate={{
            y: [0, -12, 0],
            x: [0, -5, 0],
            rotate: [45, 0, 45]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      {/* Background Pattern - subtle grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
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
            Retail partners like TFG trust us to grow their in-store financial
            product sales. Our trained teams arrange cover and other financial
            products from leading partners, and both you and your staff earn
            commission on every sale.
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
              className="group relative p-6 md:p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500 shadow-xl shadow-black/10"
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
            >
              {/* Icon */}
              <motion.div
                className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-5 group-hover:bg-white/30 transition-all duration-500"
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
                <span className="text-xs text-white/70 uppercase tracking-wide">
                  {item.statLabel}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>

              {/* Description */}
              <p className="text-white/80 text-sm leading-relaxed">
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
                  className="material-symbols-outlined text-lg"
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
              Since 2013
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
