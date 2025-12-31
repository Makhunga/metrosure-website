"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { TextReveal } from "./animations";

const differentiators = [
  {
    icon: "trending_up",
    title: "75% Sales Increase",
    description:
      "Our retail partners see an average 75% sales increase within the first 6 months. We deliver proven, measurable results.",
  },
  {
    icon: "verified",
    title: "95% QA Average",
    description:
      "Our dedicated quality assurance team maintains a 95% daily average, ensuring every sale is compliant and every interaction meets the highest standards.",
  },
  {
    icon: "analytics",
    title: "Data-Driven Approach",
    description:
      "Customer profiling and segmentation using data analytics. We provide insights that help you make informed business decisions.",
  },
  {
    icon: "location_on",
    title: "7 Provinces",
    description:
      "National footprint across South Africa with offices in Durban, Johannesburg, Pretoria, and Pietermaritzburg. We're where you need us.",
  },
  {
    icon: "groups",
    title: "5,000+ Jobs Created",
    description:
      "We recruit and develop young individuals, they are the future. Since 2013, we've created opportunities for thousands of South Africans.",
  },
  {
    icon: "shield",
    title: "FSP Licensed & Compliant",
    description:
      "We're an FSP-licensed provider (47089). All regulatory requirements, compliance, and auditing are handled by our expert team.",
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
  hidden: { opacity: 0, y: 50, scale: 0.95 },
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

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-[rgb(var(--color-surface-card))] transition-colors duration-300 relative overflow-hidden"
    >
      {/* Subtle background image */}
      <div
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.04]"
        style={{
          backgroundImage: 'url(/images/pexels-gdtography-277628-911738.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'grayscale(100%)',
        }}
      />

      {/* Decorative watermark */}
      <motion.div
        className="absolute left-2 md:left-6 lg:left-12 top-6 md:top-8 text-9xl font-black text-slate-100 dark:text-white/5 select-none z-0 whitespace-nowrap pointer-events-none uppercase"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Why Trust Us
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6 leading-tight">
            <TextReveal text="People trust us because we put them first" delay={0.2} staggerDelay={0.03} />
          </h2>
          <motion.p
            className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We&apos;re not just another insurance company. We&apos;re a team that genuinely cares about securing individuals and empowering business partners.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {differentiators.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className="p-8 rounded-2xl border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface-card))] hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group cursor-pointer"
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
            >
              <motion.div
                className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-500"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="material-symbols-outlined text-primary text-3xl group-hover:text-white transition-colors duration-500">
                  {item.icon}
                </span>
              </motion.div>
              <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-[rgb(var(--color-text-body))] leading-relaxed text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner - Enhanced for visibility */}
        <motion.div
          className="mt-20 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary to-[#8a0502] shadow-xl shadow-primary/20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.01 }}
        >
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          <div className="flex items-center gap-5 relative z-10">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-11 h-11 rounded-full border-2 border-white/30 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: 0.9 + i * 0.1, type: "spring", stiffness: 400 }}
                />
              ))}
            </div>
            <motion.p
              className="text-base md:text-lg font-medium text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 1.3 }}
            >
              Join <span className="font-bold">5,000+</span> individuals and 100+ retail partners since 2013
            </motion.p>
          </div>
          <Link href="/quote" className="group relative z-10">
            <motion.span
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-primary font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Get a free quote today
              <span className="material-symbols-outlined">
                arrow_forward
              </span>
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
