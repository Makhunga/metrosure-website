"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TimelineItem } from "@/data/aboutPage";

interface TimelineOriginalProps {
  items: TimelineItem[];
}

/**
 * Original Timeline - Simplified
 *
 * Vertical layout with icon boxes and connector lines.
 * Cleaner hover effects, reduced decoration.
 */
export default function TimelineOriginal({ items }: TimelineOriginalProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative z-10 py-32 bg-[rgb(var(--color-surface))]"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative">
        <motion.div
          className="flex flex-col gap-6 mb-20 text-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgb(var(--color-text-main))]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our Journey
          </motion.h2>
          <motion.p
            className="text-xl text-[rgb(var(--color-text-muted))] max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From a local startup to a national presence. A timeline of trust.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            className="absolute left-[32px] top-8 w-0.5 bg-[rgb(var(--color-border-light))]"
            style={{ height: "calc(100% - 200px)" }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          <div className="flex flex-col space-y-16">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-24 md:pl-32 group"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                {/* Timeline Icon */}
                <div
                  className={`absolute left-0 top-0 w-16 h-16 rounded-xl flex items-center justify-center z-10 ${
                    item.isSpecial
                      ? "bg-primary text-white"
                      : "bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))]"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-3xl ${
                      item.isSpecial
                        ? "text-white"
                        : "text-[rgb(var(--color-text-muted))] group-hover:text-primary transition-colors"
                    }`}
                  >
                    {item.icon}
                  </span>
                </div>

                {/* Connector Line */}
                <div
                  className={`absolute left-16 top-8 w-8 md:w-16 h-px ${
                    item.isSpecial
                      ? "bg-primary/30"
                      : "bg-[rgb(var(--color-border-light))]"
                  }`}
                />

                {/* Content Card - Simplified */}
                <motion.div
                  className={`p-8 rounded-2xl border ${
                    item.isSpecial
                      ? "bg-[rgb(var(--color-surface-card))] border-primary/20"
                      : "bg-[rgb(var(--color-surface-card))] border-[rgb(var(--color-border-light))] hover:border-primary/30"
                  } transition-colors`}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {item.isSpecial && (
                      <span className="px-2 py-1 bg-primary text-white text-xs font-bold rounded uppercase tracking-wider">
                        Present
                      </span>
                    )}
                    <span className="text-primary font-bold text-lg">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-[rgb(var(--color-text-main))] group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[rgb(var(--color-text-body))] leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
