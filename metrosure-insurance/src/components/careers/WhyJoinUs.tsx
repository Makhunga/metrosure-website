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
      "Attractive commission structures, performance bonuses, and benefits that recognise your hard work and dedication.",
  },
  {
    icon: "school",
    title: "Training & Development",
    description:
      "Continuous learning, product training, and career advancement programmes. We'll help you become the best in the industry.",
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
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
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

export default function WhyJoinUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-[rgb(var(--color-surface))] transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Simplified */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[rgb(var(--color-text-main))] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            More Than <span className="text-primary">Just a Job</span>
          </motion.h2>

          <motion.p
            className="text-xl text-[rgb(var(--color-text-muted))] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Here&apos;s what makes Metrosure a great place to build your career.
          </motion.p>
        </motion.div>

        {/* Benefits Grid - Cleaner spacing */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={cardVariants}
              className="group"
            >
              <motion.div
                className="h-full p-8 rounded-2xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-primary/30 transition-colors duration-300"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Icon - Simplified */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    {benefit.icon}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-[rgb(var(--color-text-body))] leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
