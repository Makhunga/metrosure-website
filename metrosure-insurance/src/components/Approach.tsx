"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "./animations";
import Image from "next/image";

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
      className="py-32 bg-[rgb(var(--color-surface))] border-y border-[rgb(var(--color-border-light))] overflow-hidden transition-colors duration-300 relative"
    >
      {/* Geometric Pattern - Top Right Corner */}
      <motion.div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none hidden md:block"
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white_0%,transparent_70%)]">
          <Image
            src="/resources/vecteezy_abstract-geometric-pattern-artwork-retro-colors-and-color_6253957.svg"
            alt="Abstract geometric pattern decoration"
            fill
            className="object-cover opacity-[0.08] dark:opacity-[0.04] scale-150"
            aria-hidden="true"
          />
        </div>
      </motion.div>

      {/* Geometric Pattern - Bottom Left Corner */}
      <motion.div
        className="absolute -bottom-32 -left-32 w-[600px] h-[600px] pointer-events-none hidden md:block"
        initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white_0%,transparent_70%)]">
          <Image
            src="/resources/vecteezy_abstract-geometric-pattern-artwork-retro-colors-and-color_6253957.svg"
            alt="Abstract geometric pattern decoration"
            fill
            className="object-cover opacity-[0.08] dark:opacity-[0.04] scale-150 rotate-180"
            aria-hidden="true"
          />
        </div>
      </motion.div>

      {/* Subtle floating geometric accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Quarter-circle accent - top left */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 rounded-br-full bg-[#82B29A]/10 dark:bg-[#82B29A]/5 hidden lg:block"
          animate={{
            y: [0, 8, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Small square - right side */}
        <motion.div
          className="absolute top-1/3 right-16 w-8 h-8 bg-[#F2CC8E]/10 dark:bg-[#F2CC8E]/5 rounded-lg hidden lg:block"
          animate={{
            y: [0, -12, 0],
            rotate: [0, 45, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        {/* Quarter-circle - bottom right */}
        <motion.div
          className="absolute bottom-32 right-20 w-12 h-12 rounded-tl-full bg-[#DF7A5E]/10 dark:bg-[#DF7A5E]/5 hidden lg:block"
          animate={{
            y: [0, 10, 0],
            x: [0, -5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Diamond shape - left side */}
        <motion.div
          className="absolute top-2/3 left-20 w-6 h-6 bg-[#3C405B]/10 dark:bg-[#F4F1DE]/5 rotate-45 hidden lg:block"
          animate={{
            y: [0, -8, 0],
            rotate: [45, 90, 45]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            className="grid grid-cols-1 gap-6 pt-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {values.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4 p-5 rounded-xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-primary/30 transition-all shadow-sm hover:shadow-md group cursor-pointer backdrop-blur-sm"
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
