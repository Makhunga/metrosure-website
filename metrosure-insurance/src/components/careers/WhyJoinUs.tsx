"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const benefits = [
  {
    icon: "volunteer_activism",
    title: "Purpose-Driven Work",
    description:
      "Help South African families and businesses feel secure every day. Your work here makes a real difference in people's lives.",
  },
  {
    icon: "trending_up",
    title: "Growth Opportunities",
    description:
      "From local startup to national presence, grow your career with us. We promote from within and invest in your development.",
  },
  {
    icon: "groups",
    title: "Supportive Team",
    description:
      "Work alongside dedicated claims, underwriting, and support professionals. You're never alone in solving challenges.",
  },
  {
    icon: "payments",
    title: "Competitive Rewards",
    description:
      "Attractive commission structures, performance bonuses, and benefits that recognize your hard work and dedication.",
  },
  {
    icon: "school",
    title: "Training & Development",
    description:
      "Continuous learning, product training, and career advancement programs. We'll help you become the best in the industry.",
  },
  {
    icon: "balance",
    title: "Work-Life Balance",
    description:
      "Supportive culture that values your wellbeing. We believe happy team members deliver the best results.",
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

export default function WhyJoinUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-24 relative z-10"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Why Join Us
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            More Than Just a Job
          </motion.h2>

          <motion.p
            className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            At Metrosure, we believe in investing in our people. Here&apos;s what
            makes us a great place to build your career.
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              variants={cardVariants}
              className="group"
            >
              <motion.div
                className="h-full p-8 rounded-2xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/3 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                {/* Icon */}
                <motion.div
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 relative z-10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <span className="material-symbols-outlined text-primary text-2xl">
                    {benefit.icon}
                  </span>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-3 group-hover:text-primary transition-colors relative z-10">
                  {benefit.title}
                </h3>
                <p className="text-[rgb(var(--color-text-body))] leading-relaxed relative z-10">
                  {benefit.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none overflow-hidden">
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
