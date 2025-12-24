"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Initial Consultation",
    description:
      "We assess your retail environment, understand your customer base, and identify the best partnership model for your business.",
  },
  {
    number: "02",
    title: "Partnership Agreement",
    description:
      "We create custom terms tailored to your needs — from commission structures to operational requirements.",
  },
  {
    number: "03",
    title: "Staff Deployment",
    description:
      "Our trained sales teams arrive at your location, fully equipped with marketing materials and product knowledge.",
  },
  {
    number: "04",
    title: "Launch & Support",
    description:
      "We launch your campaign with ongoing support, performance monitoring, and continuous optimization.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="relative py-24 bg-[rgb(var(--color-surface))] transition-colors duration-300"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Here&apos;s how it works
          </motion.h2>
          <motion.p
            className="text-lg text-[rgb(var(--color-text-body))] max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            At Metrosure, we know that partnering with an insurance broker is a
            significant decision. We&apos;ve made the process as simple and
            transparent as possible, so you can focus on your business.
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              {/* Number Circle */}
              <motion.div
                className="w-20 h-20 rounded-full bg-[rgb(var(--color-secondary))] flex items-center justify-center mb-6 shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="text-2xl font-bold text-white">
                  {step.number}
                </span>
              </motion.div>

              {/* Card */}
              <div className="flex-1 p-6 rounded-3xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] shadow-sm w-full">
                <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-3">
                  {step.title}
                </h3>
                <p className="text-[rgb(var(--color-text-body))] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="#partner-inquiry"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Start Your Partnership Journey</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
