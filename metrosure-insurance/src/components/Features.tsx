"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { HoverCard } from "./animations";

const features = [
  {
    icon: "directions_car",
    title: "Car & Home Cover",
    description:
      "Protect your vehicle and property with comprehensive short-term insurance. We find the right cover from our network of trusted insurers, so you can drive and live worry-free.",
    accent: "primary",
    href: "/insurance/auto",
  },
  {
    icon: "family_restroom",
    title: "Life & Funeral Cover",
    description:
      "Give your loved ones peace of mind. Our life insurance and funeral plans ensure your family is looked after when they need it most, because some things are too important to leave to chance.",
    accent: "secondary",
    href: "/insurance/life",
  },
  {
    icon: "savings",
    title: "Retirement Planning",
    description:
      "Start building the future you deserve, today. Whether you're just starting out or nearing retirement, we'll help you create a plan that works for your life and goals.",
    accent: "primary",
    href: "/insurance/business",
  },
  {
    icon: "business_center",
    title: "Employee Benefits",
    description:
      "Take care of your team with group retirement funds and employee benefits. For retailers, our partnership model lets you earn while creating local jobs.",
    accent: "secondary",
    href: "/insurance/business",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
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

const iconContainerVariants = {
  hidden: { scale: 0, rotate: -20 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      delay: 0.1,
    },
  },
};

export default function Features() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-[rgb(var(--color-surface-card))] relative transition-colors duration-300 overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section layout: Asymmetric split */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
          {/* Left sticky content - Narrower */}
          <motion.div
            className="lg:w-[35%] lg:sticky lg:top-28"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Our Services</span>
            </motion.div>

            <motion.h2
              className="text-4xl sm:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6 leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              What we can do
              <br />
              <span>for </span>
              <motion.span
                className="text-primary"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                you
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-lg text-[rgb(var(--color-text-body))] mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              From protecting your car and home to planning for retirement, we&apos;re here to help individuals, families, and businesses feel secure. Real people, real advice, real cover.
            </motion.p>

            {/* CTA link with animated arrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center text-primary font-bold hover:text-[rgb(var(--color-primary-hover))] transition-colors group"
              >
                <span className="flex items-center gap-2">
                  Learn more about us
                  <motion.span
                    className="material-symbols-outlined"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    arrow_forward
                  </motion.span>
                </span>
              </Link>
            </motion.div>

            {/* Trust indicator */}
            <motion.div
              className="mt-12 pt-8 border-t border-[rgb(var(--color-border-light))]"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-sm text-[rgb(var(--color-text-muted))] flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">verified</span>
                <span>FSP 47089 | Authorised Financial Service Provider</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right grid - Wider with staggered layout */}
          <motion.div
            className="lg:w-[65%]"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* 2x2 Grid with offset for visual interest */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {features.map((feature, index) => {
                // Add offset to alternate rows for asymmetric feel
                const isOffsetRow = index >= 2;

                return (
                  <motion.div
                    key={feature.title}
                    className={isOffsetRow ? "md:translate-y-8" : ""}
                    variants={cardVariants}
                  >
                    <HoverCard className="h-full" intensity={5}>
                      <Link href={feature.href} className="block h-full">
                        <div
                          className={`
                            h-full p-8 rounded-2xl
                            bg-[rgb(var(--color-surface-card))]
                            border border-[rgb(var(--color-border-light))]
                            hover:border-primary/30
                            transition-all duration-300
                            group cursor-pointer
                            relative overflow-hidden
                          `}
                        >
                          {/* Subtle gradient overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/3 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                          {/* Corner accent */}
                          <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none overflow-hidden">
                            <motion.div
                              className="absolute top-0 right-0 w-32 h-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              initial={false}
                            />
                          </div>

                          {/* Icon container */}
                          <motion.div
                            className={`
                              w-16 h-16 rounded-xl
                              ${feature.accent === "primary" ? "bg-primary/10" : "bg-[rgb(var(--color-secondary))]/10"}
                              flex items-center justify-center mb-6
                              relative z-10
                            `}
                            variants={iconContainerVariants}
                            whileHover={{
                              scale: 1.1,
                              rotate: 5,
                              transition: { type: "spring", stiffness: 400, damping: 15 }
                            }}
                          >
                            <span
                              className={`material-symbols-outlined text-3xl ${feature.accent === "primary" ? "text-primary" : "text-[rgb(var(--color-secondary))]"}`}
                            >
                              {feature.icon}
                            </span>
                          </motion.div>

                          {/* Content */}
                          <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-3 group-hover:text-primary transition-colors relative z-10">
                            {feature.title}
                          </h3>
                          <p className="text-[rgb(var(--color-text-body))] leading-relaxed relative z-10 text-[15px]">
                            {feature.description}
                          </p>

                          {/* Arrow indicator */}
                          <motion.div
                            className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ x: -10 }}
                            whileHover={{ x: 0 }}
                          >
                            <span>Learn more</span>
                            <motion.span
                              className="material-symbols-outlined text-lg"
                              initial={{ x: 0 }}
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              arrow_forward
                            </motion.span>
                          </motion.div>
                        </div>
                      </Link>
                    </HoverCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
