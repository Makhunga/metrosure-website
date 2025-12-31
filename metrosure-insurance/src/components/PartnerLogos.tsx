"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Partner data from CONTENT_GUIDE.md
const partners = {
  lifeInvestments: [
    "Liberty",
    "Sanlam",
    "PPS",
    "Discovery",
    "Old Mutual",
    "Metropolitan",
    "Momentum",
    "BrightRock",
    "Allan Gray",
    "1Life",
    "AVBOB",
  ],
  shortTerm: [
    "King Price",
    "MiWay",
    "Auto & General",
    "Budget Insurance",
    "Hollard",
    "Momentum Insure",
    "1st for Women",
    "Dotsure",
    "Virseker",
    "Absa",
  ],
  medical: [
    "Discovery Health",
    "Bonitas",
    "Momentum Medical",
    "Medshield",
    "EssentialMED",
  ],
};

// Retail B2B partners with logos
const retailPartners = [
  {
    name: "TFG",
    logo: "/images/partners/tfg.svg",
    description: "The Foschini Group",
  },
  {
    name: "Bolttech",
    logo: "/images/partners/bolttech.svg",
    description: "Embedded Insurance",
  },
];

// Combine insurance partners for the carousel (excluding retail - they have logos)
const allPartners = [
  ...partners.lifeInvestments,
  ...partners.shortTerm,
  ...partners.medical,
];

export default function PartnerLogos() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-[rgb(var(--color-surface-card))] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/15 border border-primary/20 dark:border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="material-symbols-outlined text-sm">handshake</span>
            Our Partners
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-main))] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            30+ Trusted Insurance Partners
          </motion.h2>
          <motion.p
            className="text-lg text-[rgb(var(--color-text-body))] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We work with South Africa&apos;s leading insurers to find you the best cover at the best price.
          </motion.p>
        </motion.div>

        {/* Scrolling Logos - Row 1 (Left to Right) */}
        <div className="relative mb-4">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[rgb(var(--color-surface-card))] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[rgb(var(--color-surface-card))] to-transparent z-10" />

          <motion.div
            className="flex gap-6"
            animate={prefersReducedMotion ? {} : {
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {/* First set */}
            {allPartners.map((partner, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 px-6 py-4 rounded-xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] hover:border-primary/30 transition-colors min-w-[160px] text-center"
              >
                <span className="text-sm font-bold text-[rgb(var(--color-text-main))] whitespace-nowrap">
                  {partner}
                </span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {allPartners.map((partner, index) => (
              <div
                key={`row1-dup-${index}`}
                className="flex-shrink-0 px-6 py-4 rounded-xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] hover:border-primary/30 transition-colors min-w-[160px] text-center"
              >
                <span className="text-sm font-bold text-[rgb(var(--color-text-main))] whitespace-nowrap">
                  {partner}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scrolling Logos - Row 2 (Right to Left) */}
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[rgb(var(--color-surface-card))] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[rgb(var(--color-surface-card))] to-transparent z-10" />

          <motion.div
            className="flex gap-6"
            animate={prefersReducedMotion ? {} : {
              x: [-1920, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 45,
                ease: "linear",
              },
            }}
          >
            {/* Reversed order for variety */}
            {[...allPartners].reverse().map((partner, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 px-6 py-4 rounded-xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] hover:border-primary/30 transition-colors min-w-[160px] text-center"
              >
                <span className="text-sm font-bold text-[rgb(var(--color-text-main))] whitespace-nowrap">
                  {partner}
                </span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[...allPartners].reverse().map((partner, index) => (
              <div
                key={`row2-dup-${index}`}
                className="flex-shrink-0 px-6 py-4 rounded-xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] hover:border-primary/30 transition-colors min-w-[160px] text-center"
              >
                <span className="text-sm font-bold text-[rgb(var(--color-text-main))] whitespace-nowrap">
                  {partner}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Partner Categories */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="p-6 rounded-xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">favorite</span>
              </div>
              <h3 className="font-bold text-[rgb(var(--color-text-main))]">Life & Investments</h3>
            </div>
            <p className="text-sm text-[rgb(var(--color-text-body))]">
              {partners.lifeInvestments.length}+ partners for life cover, retirement, and investments
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">directions_car</span>
              </div>
              <h3 className="font-bold text-[rgb(var(--color-text-main))]">Short-Term Insurance</h3>
            </div>
            <p className="text-sm text-[rgb(var(--color-text-body))]">
              {partners.shortTerm.length}+ partners for car, home, and commercial cover
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">local_hospital</span>
              </div>
              <h3 className="font-bold text-[rgb(var(--color-text-main))]">Medical Aid</h3>
            </div>
            <p className="text-sm text-[rgb(var(--color-text-body))]">
              {partners.medical.length}+ medical aid partners for comprehensive health cover
            </p>
          </div>
        </motion.div>

        {/* Retail B2B Partners Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgb(var(--color-secondary))]/10 border border-[rgb(var(--color-secondary))]/20 text-[rgb(var(--color-secondary))] text-xs font-bold uppercase tracking-wider mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="material-symbols-outlined text-sm">storefront</span>
            Retail Partners
          </motion.span>
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-[rgb(var(--color-text-main))] mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            B2B Retail Partnerships
          </motion.h3>
          <motion.p
            className="text-[rgb(var(--color-text-body))] max-w-xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Driving sales and delivering financial services at point of sale for leading South African retailers.
          </motion.p>

          {/* Retail Partner Logos */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {retailPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                className="group relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative px-8 py-6 rounded-2xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/5 transition-all duration-300">
                  {/* Logo Container */}
                  <div className="relative h-12 w-32 md:h-14 md:w-40 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      className="object-contain dark:brightness-0 dark:invert dark:group-hover:brightness-100 dark:group-hover:invert-0"
                      sizes="(max-width: 768px) 128px, 160px"
                    />
                  </div>
                  {/* Hover tooltip */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="px-3 py-1.5 rounded-lg bg-[rgb(var(--color-text-main))] text-[rgb(var(--color-surface))] text-xs font-medium whitespace-nowrap shadow-lg">
                      {partner.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
