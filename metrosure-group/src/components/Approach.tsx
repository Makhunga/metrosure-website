"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const values = [
  {
    title: "Respect",
    description: "Everyone has a unique role. We value your story and treat you as an individual, not a number.",
  },
  {
    title: "Quality",
    description: "We don't cut corners. You deserve the best advice and the best service, every time.",
  },
  {
    title: "Passion",
    description: "We genuinely care about your wellbeing. This isn't just a job for us — it's our purpose.",
  },
  {
    title: "Integrity",
    description: "We do the right thing, even when no one's watching. Honesty is at the heart of everything we do.",
  },
  {
    title: "Excellence",
    description: "Good enough isn't enough. We push ourselves to go above and beyond for you.",
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

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
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

export default function Approach() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="py-24 bg-[rgb(var(--color-surface))] border-y border-[rgb(var(--color-border-light))] overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Left Content */}
          <motion.div
            className="flex-1 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.h2
              className="text-4xl lg:text-5xl font-bold leading-tight text-[rgb(var(--color-text-main))]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              What we <br />
              <motion.span
                className="text-primary italic font-serif"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                believe in.
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              These aren&apos;t just words on a wall — they&apos;re the values that guide every conversation we have
              and every decision we make. This is how we&apos;ve built trust with over 5,000 people across South Africa.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 gap-6 pt-4"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {values.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-primary/30 transition-all shadow-sm hover:shadow-md group cursor-pointer"
                  whileHover={{
                    scale: 1.02,
                    y: -4,
                    transition: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                >
                  <div className="mt-1 min-w-[24px]">
                    <motion.span
                      className="material-symbols-outlined text-primary inline-block"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      check_circle
                    </motion.span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[rgb(var(--color-text-main))]">{item.title}</h4>
                    <p className="text-sm text-[rgb(var(--color-text-body))] mt-1">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[rgb(var(--color-border-light))] group bg-gradient-to-br from-slate-100 via-slate-50 to-white dark:from-slate-800 dark:via-slate-700 dark:to-slate-600">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              {/* Decorative Elements */}
              <div className="absolute inset-0 opacity-30">
                <motion.div
                  className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/30 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-[rgb(var(--color-secondary))]/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </div>
              {/* Meeting Icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="material-symbols-outlined text-[140px] text-primary/15 group-hover:scale-105 transition-transform duration-700">
                  groups
                </span>
              </motion.div>

              {/* Floating Metric Card */}
              <motion.div
                className="absolute bottom-6 left-6 z-20 bg-[rgb(var(--color-surface-card))]/95 backdrop-blur px-6 py-5 rounded-xl border border-[rgb(var(--color-border-light))] max-w-xs shadow-lg"
                initial={{ opacity: 0, y: 30, x: -20 }}
                animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 30, x: -20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <motion.span
                      className="flex h-3 w-3 rounded-full bg-green-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <p className="text-xs font-bold uppercase text-[rgb(var(--color-text-muted))]">
                      Since 2016
                    </p>
                  </div>
                  <p className="text-[rgb(var(--color-text-main))] font-bold text-3xl mb-1">5,000+</p>
                  <p className="text-sm text-[rgb(var(--color-text-body))] font-medium">
                    Jobs created across South Africa.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
