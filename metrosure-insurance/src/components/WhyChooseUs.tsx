"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { TextReveal } from "./animations";
import { QuarterCircle, Triangle, Diamond, DotsPattern, Circle, HalfCircle } from "./ui/GeometricShapes";

const differentiators = [
  {
    icon: "support_agent",
    title: "Dedicated Portfolio Managers",
    description:
      "You get a real person who knows your name and your needs. Each portfolio manager is backed by dedicated claims and underwriting staff.",
  },
  {
    icon: "verified",
    title: "FSP Authorised",
    description:
      "We're a registered Financial Service Provider (FSP 47089), regulated by the FSCA. Your protection and peace of mind is our priority.",
  },
  {
    icon: "handshake",
    title: "30+ Insurance Partners",
    description:
      "We work with South Africa's leading insurers, Liberty, Sanlam, Discovery, Old Mutual, and more, to find you the best cover.",
  },
  {
    icon: "location_on",
    title: "Nationwide Coverage",
    description:
      "With offices in Durban, Pietermaritzburg, Pretoria, and Boksburg, we're never too far away when you need us.",
  },
  {
    icon: "groups",
    title: "5,000+ Jobs Created",
    description:
      "We're proud to be part of building South Africa's economy. Since 2016, we've created opportunities for thousands of people.",
  },
  {
    icon: "timer",
    title: "Fast, Effective Service",
    description:
      "Your time is precious, so we won't waste it. We process your instructions quickly and keep you informed every step of the way.",
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
      className="py-24 bg-[rgb(var(--color-surface-card))] transition-colors duration-300 relative overflow-hidden"
    >
      {/* Decorative geometric shapes - Enhanced visibility */}
      {/* Large corner shapes */}
      <div className="absolute -top-14 -left-14 opacity-40 dark:opacity-25">
        <QuarterCircle size={180} color="primary" />
      </div>
      <div className="absolute -bottom-12 -right-12 rotate-180 opacity-35 dark:opacity-20">
        <QuarterCircle size={150} color="secondary" delay={0.15} />
      </div>

      {/* Mid-section shapes */}
      <div className="absolute top-[20%] right-8 opacity-30 dark:opacity-15 hidden lg:block">
        <HalfCircle size={120} color="primary" delay={0.2} />
      </div>
      <div className="absolute bottom-[25%] left-6 opacity-35 dark:opacity-20 hidden lg:block">
        <Circle size={70} color="secondary" delay={0.25} />
      </div>

      {/* Triangles */}
      <div className="absolute top-1/4 right-[30%] opacity-30 dark:opacity-15 hidden xl:block">
        <Triangle size={60} color="muted" delay={0.3} />
      </div>
      <div className="absolute bottom-[15%] left-[25%] opacity-25 dark:opacity-15 hidden lg:block rotate-180">
        <Triangle size={45} color="primary" delay={0.35} />
      </div>

      {/* Accent diamonds scattered */}
      <div className="absolute top-16 left-[30%] opacity-50 dark:opacity-30">
        <Diamond size={16} color="accent" delay={0.4} />
      </div>
      <div className="absolute top-1/2 right-[15%] -translate-y-1/2 opacity-45 dark:opacity-25 hidden md:block">
        <Diamond size={12} color="primary" delay={0.45} />
      </div>
      <div className="absolute bottom-20 left-[15%] opacity-50 dark:opacity-30 hidden md:block">
        <Diamond size={14} color="accent" delay={0.5} />
      </div>
      <div className="absolute top-[35%] left-[8%] opacity-40 dark:opacity-20 hidden lg:block">
        <Diamond size={10} color="secondary" delay={0.55} />
      </div>
      <div className="absolute bottom-[35%] right-[8%] opacity-45 dark:opacity-25 hidden lg:block">
        <Diamond size={11} color="accent" delay={0.6} />
      </div>

      {/* Dots patterns */}
      <div className="absolute top-24 right-1/4 opacity-35 dark:opacity-20 hidden xl:block">
        <DotsPattern rows={3} cols={5} color="primary" />
      </div>
      <div className="absolute bottom-16 left-[40%] opacity-30 dark:opacity-15 hidden lg:block">
        <DotsPattern rows={2} cols={4} color="secondary" />
      </div>
      <div className="absolute top-[45%] right-6 opacity-25 dark:opacity-15 hidden xl:block">
        <DotsPattern rows={2} cols={3} color="accent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.span
            className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Why Metrosure
          </motion.span>
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

        {/* CTA Banner */}
        <motion.div
          className="mt-20 p-8 rounded-2xl bg-[rgb(var(--color-surface))] border border-dashed border-[rgb(var(--color-border-light))] flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-[rgb(var(--color-surface))] bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: 0.9 + i * 0.1, type: "spring", stiffness: 400 }}
                />
              ))}
            </div>
            <motion.p
              className="text-sm font-medium text-[rgb(var(--color-text-main))]"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 1.3 }}
            >
              Join <span className="text-primary font-bold">5,000+</span> individuals and 100+ retail partners since 2016
            </motion.p>
          </div>
          <Link href="/quote" className="group">
            <motion.span
              className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Get a free quote today
              <motion.span
                className="material-symbols-outlined"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                arrow_forward
              </motion.span>
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
