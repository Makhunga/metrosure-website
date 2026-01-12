"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TimelineItem } from "@/data/aboutPage";

interface TimelineAlternatingProps {
  items: TimelineItem[];
}

/**
 * Variant 2: Alternating Zigzag Timeline
 *
 * Classic alternating left-right layout with center spine.
 * Cards zigzag creating visual rhythm and flow.
 * Emphasises the journey through time.
 */
export default function TimelineAlternating({ items }: TimelineAlternatingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Our Journey
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Key milestones that shaped who we are today
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary/20 via-primary to-primary/20 hidden md:block"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
          />

          {/* Mobile Line */}
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20 md:hidden"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
          />

          <div className="space-y-12 md:space-y-0">
            {items.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  className={`relative md:flex md:items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                >
                  {/* Card Side */}
                  <div className="md:w-1/2 pl-20 md:pl-0 md:pr-12 md:even:pr-0 md:even:pl-12">
                    <motion.div
                      className={`p-6 md:p-8 rounded-2xl border bg-white dark:bg-slate-900 ${
                        item.isSpecial
                          ? "border-primary/30 shadow-lg shadow-primary/10"
                          : "border-slate-200 dark:border-slate-800"
                      }`}
                      whileHover={{
                        y: -4,
                        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)",
                      }}
                    >
                      {/* Year Badge */}
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
                            item.isSpecial
                              ? "bg-primary text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {item.year}
                        </span>
                        {item.isSpecial && (
                          <span className="flex items-center gap-1 text-xs text-primary font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Today
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                        {item.title}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Point - Desktop */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center z-10 ${
                        item.isSpecial
                          ? "bg-primary text-white shadow-lg shadow-primary/30"
                          : "bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-2xl ${
                          item.isSpecial
                            ? "text-white"
                            : "text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {item.icon}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Point */}
                  <div className="absolute left-8 top-8 -translate-x-1/2 md:hidden">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        item.isSpecial
                          ? "bg-primary text-white"
                          : "bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-xl ${
                          item.isSpecial
                            ? "text-white"
                            : "text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {item.icon}
                      </span>
                    </div>
                  </div>

                  {/* Empty Side */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
