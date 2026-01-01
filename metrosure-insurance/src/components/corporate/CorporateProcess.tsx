"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MagneticButton } from "@/components/animations";
import { processSteps } from "@/data/corporateServices";

const stepTags: Record<number, string[]> = {
  1: ["Workforce analysis", "Budget review", "Gap assessment"],
  2: ["Provider comparison", "Custom pricing", "Benefit tiers"],
  3: ["FSCA registration", "Payroll setup", "Employee comms"],
  4: ["Annual reviews", "Claims support", "Renewal negotiation"],
};

export default function CorporateProcess() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="relative py-24 bg-[rgb(var(--color-surface-card))] transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
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
            Here&apos;s How It Works
          </motion.h2>
          <motion.p
            className="text-lg text-[rgb(var(--color-text-body))] max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Implementing employee benefits doesn&apos;t have to be complicated.
            Our streamlined process gets you from initial consultation to fully
            operational benefits in as little as 4-6 weeks.
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative pt-10"
            >
              {/* Number Circle - Positioned to overlap card */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                <div className="w-20 h-20 rounded-full bg-[rgb(var(--color-secondary))] flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">
                    {String(step.step).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Card - With padding-top to make room for overlapping number */}
              <motion.div
                className="h-full pt-14 pb-6 px-6 rounded-3xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] shadow-sm text-center"
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-3">
                  {step.title}
                </h3>
                <p className="text-[rgb(var(--color-text-body))] text-sm leading-relaxed mb-4">
                  {step.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {stepTags[step.step]?.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-muted))] text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
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
          <MagneticButton strength={0.4}>
            <motion.a
              href="#corporate-inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Start Your Benefits Journey</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </motion.a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
