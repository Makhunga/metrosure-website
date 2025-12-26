"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "./animations";

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
    description: "We genuinely care about your wellbeing. This isn't just a job for us, it's our purpose.",
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
      className="py-24 bg-[rgb(var(--color-surface))] border-y border-[rgb(var(--color-border-light))] overflow-hidden transition-colors duration-300 relative"
    >
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-[rgb(var(--color-text-main))] mb-6">
              <TextReveal text="What we believe in" delay={0.2} staggerDelay={0.03} />
            </h2>
            <motion.p
              className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              These aren&apos;t just words on a wall, they&apos;re the values that guide every conversation we have and every decision we make. This is how we&apos;ve built trust with over 5,000 individuals and 100+ retail partners across South Africa.
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 gap-4 pt-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {values.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4 p-5 rounded-xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-primary/30 transition-all shadow-sm hover:shadow-md group cursor-pointer"
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
      </div>
    </section>
  );
}
