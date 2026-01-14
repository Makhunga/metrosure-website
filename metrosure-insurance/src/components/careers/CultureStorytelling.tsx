"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Stats to embed in the culture section
const embeddedStats = [
  { value: "5,000+", label: "Jobs Created" },
  { value: "13+", label: "Years Strong" },
  { value: "7", label: "Provinces" },
];

export default function CultureStorytelling() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-32 bg-[rgb(var(--color-surface))] relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(var(--color-text-main))_1px,transparent_0)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Bold Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-[rgb(var(--color-text-main))]">
              In 2013, we started{" "}
              <span className="text-primary">with a mission</span>
            </h2>

            {/* Embedded Stats - Mobile and Desktop */}
            <motion.div
              className="mt-12 flex flex-wrap gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {embeddedStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <span className="text-3xl md:text-4xl font-bold text-primary">
                    {stat.value}
                  </span>
                  <span className="text-sm text-[rgb(var(--color-text-muted))] uppercase tracking-wider mt-1">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Narrative */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            {/* Accent line */}
            <div className="w-16 h-1 bg-primary rounded-full" />

            <p className="text-xl md:text-2xl text-[rgb(var(--color-text-body))] leading-relaxed">
              To take South Africa to the future. Since then, we&apos;ve created
              over 5,000 jobs, built a team known for consistency, reliability,
              and integrity, and helped thousands of families feel secure.
            </p>

            <p className="text-lg text-[rgb(var(--color-text-muted))] leading-relaxed">
              We recruit and develop young individuals &ndash; they are the future.
              This model has created employment across 7 provinces. Every
              partnership moves us closer to consistent, reliable growth for all.
            </p>

            <p className="text-lg text-[rgb(var(--color-text-muted))] leading-relaxed">
              At Metrosure, you&apos;re not just taking a job &ndash; you&apos;re
              joining a movement that&apos;s transforming the insurance industry
              and creating opportunities for communities across South Africa.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
