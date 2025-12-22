"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const features = [
  {
    icon: "directions_car",
    title: "Car & Home Cover",
    description:
      "Protect your vehicle and property with comprehensive short-term insurance. We find the right cover from our network of trusted insurers, so you can drive and live worry-free.",
  },
  {
    icon: "family_restroom",
    title: "Life & Funeral Cover",
    description:
      "Give your loved ones peace of mind. Our life insurance and funeral plans ensure your family is looked after when they need it most — because some things are too important to leave to chance.",
  },
  {
    icon: "savings",
    title: "Retirement Planning",
    description:
      "Start building the future you deserve, today. Whether you're just starting out or nearing retirement, we'll help you create a plan that works for your life and goals.",
  },
  {
    icon: "business_center",
    title: "Employee Benefits",
    description:
      "Take care of your team with group retirement funds and employee benefits. Happy, secure employees build stronger businesses — and we make it simple to set up.",
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
} as const;

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

const iconVariants = {
  hidden: { scale: 0, rotate: -45 },
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
      className="py-24 bg-[rgb(var(--color-surface-card))] relative transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 mb-16 items-start">
          {/* Left sticky content */}
          <motion.div
            className="lg:w-1/3 lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.h2
              className="text-4xl font-bold text-[rgb(var(--color-text-main))] mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              What we can
              <br />
              do for <motion.span className="text-primary inline-block" whileHover={{ scale: 1.05 }}>you.</motion.span>
            </motion.h2>
            <motion.p
              className="text-lg text-[rgb(var(--color-text-body))] mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              From protecting your car and home to planning for retirement, we&apos;re here to help you
              and your family feel secure. Real people, real advice, real cover.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center text-primary font-bold hover:text-[rgb(var(--color-primary-hover))] transition-colors group"
              >
                <motion.span
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Learn more about us
                  <motion.span
                    className="material-symbols-outlined ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    arrow_forward
                  </motion.span>
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right grid */}
          <motion.div
            className="lg:w-2/3"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 border border-[rgb(var(--color-border-light))] rounded-2xl overflow-hidden shadow-sm bg-[rgb(var(--color-surface-card))]">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className={`p-10 ${
                    index < 2 ? "border-b" : ""
                  } ${index % 2 === 0 ? "md:border-r" : ""} border-[rgb(var(--color-border-light))] hover:bg-[rgb(var(--color-surface))]/50 transition-colors group cursor-pointer`}
                  variants={cardVariants}
                  whileHover={{
                    backgroundColor: "rgba(var(--color-surface), 0.5)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6"
                    variants={iconVariants}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <motion.span
                      className="material-symbols-outlined text-3xl text-primary"
                      whileHover={{ rotate: 12 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature.icon}
                    </motion.span>
                  </motion.div>
                  <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[rgb(var(--color-text-body))] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
