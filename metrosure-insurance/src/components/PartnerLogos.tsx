"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { getSortedPartners, type InsurancePartner } from "@/data/partners";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
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

// Partner Grid Item Component - Perfect Square
function PartnerGridItem({ partner }: { partner: InsurancePartner }) {
  const hasLogo = Boolean(partner.logo);

  return (
    <motion.div
      variants={itemVariants}
      className="group relative aspect-square bg-white dark:bg-slate-800 flex items-center justify-center p-6 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
    >
      {hasLogo ? (
        <div className="relative h-16 md:h-20 w-full opacity-80 group-hover:opacity-100 transition-opacity duration-200">
          <Image
            src={partner.logo!}
            alt={`${partner.name} logo`}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        </div>
      ) : (
        <span className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300 opacity-80 group-hover:opacity-100 transition-opacity duration-200 text-center">
          {partner.name}
        </span>
      )}
    </motion.div>
  );
}

export default function PartnerLogos() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  // Get sorted partners
  const partners = getSortedPartners();

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 bg-[rgb(var(--color-surface-card))] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
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
            {partners.length}+ Trusted Insurance Partners
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

        {/* Partner Grid - 4 columns, gray background */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 bg-gray-200 dark:bg-slate-700 gap-px"
          variants={containerVariants}
          initial="hidden"
          animate={prefersReducedMotion ? "visible" : isInView ? "visible" : "hidden"}
        >
          {partners.map((partner) => (
            <PartnerGridItem key={partner.id} partner={partner} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
