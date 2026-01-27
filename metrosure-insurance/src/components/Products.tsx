"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "./animations";

const products = [
  {
    icon: "favorite",
    title: "Life & Funeral Cover",
    description:
      "Ensure your loved ones are looked after. From individual life policies to group funeral cover and credit life, we connect you with trusted partners who've got your family covered.",
    features: ["Life Insurance", "Funeral Plans", "Credit Life"],
    href: "/insurance/life",
  },
  {
    icon: "health_and_safety",
    title: "Health & Income Protection",
    description:
      "Safeguard your income when life happens. We arrange cover from leading partners for hospitalisation, disability, and income protection to keep you financially secure.",
    features: ["Hospitalisation", "Disability Cover", "Income Protection"],
    href: "/insurance/life",
  },
  {
    icon: "directions_car",
    title: "Car & Home Insurance",
    description:
      "Protect your vehicle and property with comprehensive short-term cover. We work with top SA insurers to find you the right fit.",
    features: ["Vehicle Cover", "Home Contents", "Buildings"],
    href: "/insurance/auto",
  },
  {
    icon: "storefront",
    title: "Retail Partnerships",
    description:
      "Turn your store into a revenue engine. We bring trained staff, handle compliance, and share profits - you focus on your business.",
    features: ["Revenue Share", "Staff Provided", "Zero Overhead"],
    href: "/partners",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Products() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="products"
      className="py-32 bg-[rgb(var(--color-surface-card))] transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <motion.span
              className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              For You & Your Business
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold text-[rgb(var(--color-text-main))]">
              <TextReveal text="Solutions That Grow With You" delay={0.3} staggerDelay={0.04} />
            </h2>
          </div>
          <motion.p
            className="text-[rgb(var(--color-text-body))] max-w-md text-left"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We connect families with the right financial products from leading insurers, and create partnership opportunities for retailers to earn commission.
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[rgb(var(--color-border-light))]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {products.map((product, index) => (
            <motion.div key={product.title} variants={cardVariants}>
              <Link
                href={product.href}
                className="group relative p-8 border-r border-b border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface-card))] hover:bg-[rgb(var(--color-surface))] transition-all duration-300 block h-full"
              >
                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />

                {/* Icon and Arrow */}
                <div className="mb-8 flex justify-between items-start relative z-10">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="material-symbols-outlined text-primary text-3xl">
                      {product.icon}
                    </span>
                  </motion.div>
                  <motion.span
                    className="material-symbols-outlined text-[rgb(var(--color-border-light))] group-hover:text-primary transition-colors"
                    initial={{ x: 0, y: 0 }}
                    whileHover={{ x: 4, y: -4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    arrow_outward
                  </motion.span>
                </div>

                {/* Content */}
                <motion.h3
                  className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-3 group-hover:text-primary transition-colors relative z-10"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {product.title}
                </motion.h3>
                <p className="text-sm text-[rgb(var(--color-text-body))] leading-relaxed mb-6 relative z-10">
                  {product.description}
                </p>

                {/* Features as Tags */}
                <div className="flex flex-wrap gap-1.5 mb-8 relative z-10">
                  {product.features.map((feature, featureIndex) => (
                    <motion.span
                      key={feature}
                      className="px-2.5 py-1 rounded-full bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-muted))] text-xs font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.5 + index * 0.1 + featureIndex * 0.05 }}
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Calculator Quick Link */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link
            href="/tools/coverage-calculator"
            className="group inline-flex items-center gap-3 h-12 px-6 rounded-xl border-2 border-[rgb(var(--color-border-light))] hover:border-primary bg-[rgb(var(--color-surface))] hover:bg-primary/5 transition-all duration-300"
          >
            <span className="material-symbols-outlined text-primary text-xl">
              calculate
            </span>
            <span className="text-[rgb(var(--color-text-main))] font-semibold">
              Not sure how much cover you need?
            </span>
            <span className="text-primary font-bold group-hover:underline">
              Try our calculator
            </span>
            <span className="material-symbols-outlined text-primary text-lg group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
