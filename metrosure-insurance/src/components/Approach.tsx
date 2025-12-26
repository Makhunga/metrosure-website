"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "./animations";

const values = [
  {
    title: "Respect",
    description: "Everyone has a unique role. We value your story and treat you as an individual, not a number.",
    icon: "diversity_1",
  },
  {
    title: "Quality",
    description: "We don't cut corners. You deserve the best advice and the best service, every time.",
    icon: "verified",
  },
  {
    title: "Passion",
    description: "We genuinely care about your wellbeing. This isn't just a job for us, it's our purpose.",
    icon: "favorite",
  },
  {
    title: "Integrity",
    description: "We do the right thing, even when no one's watching. Honesty is at the heart of everything we do.",
    icon: "shield",
  },
  {
    title: "Excellence",
    description: "Good enough isn't enough. We push ourselves to go above and beyond for you.",
    icon: "star",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      className="py-24 bg-[rgb(var(--color-surface-card))] overflow-hidden transition-colors duration-300 relative"
    >
      {/* Subtle diagonal pattern background */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              rgb(var(--color-text-main)) 0,
              rgb(var(--color-text-main)) 1px,
              transparent 0,
              transparent 50%
            )`,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header - Centered */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-[rgb(var(--color-text-main))] mb-6">
            <TextReveal text="What we believe in" delay={0.2} staggerDelay={0.03} />
          </h2>
          <motion.p
            className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            These aren&apos;t just words on a wall. They&apos;re the values that guide every conversation and every decision. This is how we&apos;ve built trust with over 5,000 individuals and 100+ retail partners.
          </motion.p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Card 1 - Respect (spans 2 cols) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 group"
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 17 } }}
          >
            <div className="h-full p-6 lg:p-8 rounded-2xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] hover:border-primary/40 transition-all shadow-sm hover:shadow-xl cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:bg-primary/10 transition-colors" />
              <span className="material-symbols-outlined text-4xl text-primary mb-4 block relative z-10">
                {values[0].icon}
              </span>
              <h4 className="font-bold text-xl text-[rgb(var(--color-text-main))] mb-2 relative z-10">{values[0].title}</h4>
              <p className="text-[rgb(var(--color-text-body))] relative z-10">{values[0].description}</p>
            </div>
          </motion.div>

          {/* Card 2 - Quality (spans 2 cols) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 group"
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 17 } }}
          >
            <div className="h-full p-6 lg:p-8 rounded-2xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] hover:border-primary/40 transition-all shadow-sm hover:shadow-xl cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:bg-primary/10 transition-colors" />
              <span className="material-symbols-outlined text-4xl text-primary mb-4 block relative z-10">
                {values[1].icon}
              </span>
              <h4 className="font-bold text-xl text-[rgb(var(--color-text-main))] mb-2 relative z-10">{values[1].title}</h4>
              <p className="text-[rgb(var(--color-text-body))] relative z-10">{values[1].description}</p>
            </div>
          </motion.div>

          {/* Card 3 - Passion (spans 2 cols) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 group"
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 17 } }}
          >
            <div className="h-full p-6 lg:p-8 rounded-2xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] hover:border-primary/40 transition-all shadow-sm hover:shadow-xl cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:bg-primary/10 transition-colors" />
              <span className="material-symbols-outlined text-4xl text-primary mb-4 block relative z-10">
                {values[2].icon}
              </span>
              <h4 className="font-bold text-xl text-[rgb(var(--color-text-main))] mb-2 relative z-10">{values[2].title}</h4>
              <p className="text-[rgb(var(--color-text-body))] relative z-10">{values[2].description}</p>
            </div>
          </motion.div>

          {/* Card 4 - Integrity (spans 3 cols - larger) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 group"
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 17 } }}
          >
            <div className="h-full p-6 lg:p-8 rounded-2xl bg-primary text-white border border-primary hover:bg-[rgb(var(--color-primary-hover))] transition-all shadow-lg hover:shadow-2xl cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl transform translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl transform -translate-x-10 translate-y-10" />
              <span className="material-symbols-outlined text-5xl mb-4 block relative z-10 opacity-90">
                {values[3].icon}
              </span>
              <h4 className="font-bold text-2xl mb-3 relative z-10">{values[3].title}</h4>
              <p className="text-white/90 text-lg relative z-10">{values[3].description}</p>
            </div>
          </motion.div>

          {/* Card 5 - Excellence (spans 3 cols - larger) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 group"
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 17 } }}
          >
            <div className="h-full p-6 lg:p-8 rounded-2xl bg-[rgb(var(--color-surface))] border-2 border-primary/20 hover:border-primary/50 transition-all shadow-sm hover:shadow-xl cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:bg-primary/10 transition-colors" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl transform -translate-x-10 translate-y-10 group-hover:bg-primary/10 transition-colors" />
              <span className="material-symbols-outlined text-5xl text-primary mb-4 block relative z-10">
                {values[4].icon}
              </span>
              <h4 className="font-bold text-2xl text-[rgb(var(--color-text-main))] mb-3 relative z-10">{values[4].title}</h4>
              <p className="text-[rgb(var(--color-text-body))] text-lg relative z-10">{values[4].description}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
