"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const products = [
  {
    icon: "directions_car",
    title: "Car & Home Insurance",
    description:
      "Protect your vehicle and property with comprehensive short-term cover. We work with top SA insurers to find you the right fit.",
    features: ["Vehicle Cover", "Home Contents", "Buildings"],
    href: "/insurance/auto",
  },
  {
    icon: "favorite",
    title: "Life & Funeral Cover",
    description:
      "Ensure your loved ones are looked after. From individual life policies to group funeral cover and credit life, we've got your family covered.",
    features: ["Life Insurance", "Funeral Plans", "Credit Life", "Estate Planning"],
    href: "/insurance/life",
  },
  {
    icon: "savings",
    title: "Retirement & Investments",
    description:
      "Plan your future today. We help you build wealth and prepare for retirement with personalised investment strategies.",
    features: ["Retirement Funds", "Investment Planning", "Tax Benefits"],
    href: "/insurance/life",
  },
  {
    icon: "business_center",
    title: "Business & Employee Benefits",
    description:
      "Keep your business and team protected. Group schemes, commercial insurance, and employee benefits made simple.",
    features: ["Commercial Cover", "Group Retirement", "Employee Benefits"],
    href: "/insurance/business",
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
      className="py-24 bg-[rgb(var(--color-surface-card))] transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
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
              What We Offer
            </motion.span>
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-[rgb(var(--color-text-main))]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Cover for Every Stage of Life
            </motion.h2>
          </div>
          <motion.p
            className="text-[rgb(var(--color-text-body))] max-w-md text-right md:text-left"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            From your first car to your retirement, we&apos;re here to help you and your family feel secure.
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
                    className="w-12 h-12 rounded-lg bg-[rgb(var(--color-surface))] flex items-center justify-center group-hover:bg-[rgb(var(--color-surface-card))] group-hover:shadow-md transition-all"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="material-symbols-outlined text-primary text-2xl">
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

                {/* Features */}
                <ul className="space-y-2 mb-8 relative z-10">
                  {product.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      className="text-xs font-semibold text-[rgb(var(--color-text-muted))] flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: 0.5 + index * 0.1 + featureIndex * 0.05 }}
                    >
                      <motion.span
                        className="w-1 h-1 rounded-full bg-primary"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: featureIndex * 0.5,
                        }}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
