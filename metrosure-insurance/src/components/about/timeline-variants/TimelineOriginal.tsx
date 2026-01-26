"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TimelineItem } from "@/data/aboutPage";

interface TimelineOriginalProps {
  items: TimelineItem[];
}

/**
 * Original Timeline
 *
 * Vertical layout with icon boxes, connector lines, and hover effects.
 * Large number watermarks on cards.
 */
export default function TimelineOriginal({ items }: TimelineOriginalProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative z-10 py-24 md:py-32 bg-[rgb(var(--color-surface))] overflow-hidden"
    >
      {/* Decorative watermark */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -top-[2.4rem] text-9xl font-black text-slate-100 dark:text-white/5 select-none z-0 whitespace-nowrap pointer-events-none uppercase tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        History
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative">
        <motion.div
          className="flex flex-col gap-6 mb-24 text-center items-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-black tracking-tight text-[rgb(var(--color-text-main))]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Journey
          </motion.h2>
          <motion.p
            className="text-xl text-[rgb(var(--color-text-body))] max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            From a local startup to a national shield. A timeline of trust built
            over years.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            className="absolute left-[40px] top-10 w-0.5 bg-[rgb(var(--color-border-light))]"
            style={{ height: "calc(100% - 300px)" }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          />

          <div className="flex flex-col space-y-20">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-32 md:pl-48 group"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
              >
                {/* Timeline Icon Box */}
                <div
                  className={`absolute left-0 top-0 w-20 h-20 rounded-2xl flex items-center justify-center z-10 transition-all duration-500 group-hover:scale-110 ${
                    item.isSpecial
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "bg-[rgb(var(--color-surface-card))] border-2 border-[rgb(var(--color-border-light))] shadow-lg group-hover:border-primary/30"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-2xl ${
                      item.isSpecial ? "hidden" : ""
                    }`}
                  />
                  <span
                    className={`material-symbols-outlined text-4xl relative z-10 transition-colors duration-300 ${
                      item.isSpecial
                        ? "text-white"
                        : "text-[rgb(var(--color-text-muted))] group-hover:text-primary"
                    }`}
                  >
                    {item.icon}
                  </span>
                </div>

                {/* Connector Line */}
                <div
                  className={`absolute left-20 top-10 w-12 md:w-28 h-px transition-colors duration-500 ${
                    item.isSpecial
                      ? "bg-primary/20"
                      : "bg-[rgb(var(--color-border-light))] group-hover:bg-primary/30"
                  }`}
                >
                  <div
                    className={`absolute right-0 -top-[3px] w-2 h-2 rounded-full transition-colors duration-500 ${
                      item.isSpecial
                        ? "bg-primary/50 animate-pulse"
                        : "bg-[rgb(var(--color-border-light))] group-hover:bg-primary"
                    }`}
                  />
                </div>

                {/* Content Card */}
                <motion.div
                  className={`p-8 md:p-10 rounded-3xl border shadow-sm relative overflow-hidden ${
                    item.isSpecial
                      ? "bg-[rgb(var(--color-surface-card))] border-primary/20"
                      : "bg-[rgb(var(--color-surface-card))] border-[rgb(var(--color-border-light))]"
                  }`}
                  initial="rest"
                  whileHover="hover"
                  variants={{
                    rest: { y: 0, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" },
                    hover: {
                      y: -4,
                      boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
                      transition: { type: "spring", stiffness: 300, damping: 20 },
                    },
                  }}
                >
                  <motion.div
                    className="absolute right-4 -bottom-6 text-9xl font-black text-primary/10 dark:text-primary/20 select-none z-0"
                    variants={{
                      rest: { y: 30, opacity: 0.6 },
                      hover: {
                        y: 0,
                        opacity: 1,
                        transition: { type: "spring", stiffness: 150, damping: 15 },
                      },
                    }}
                  >
                    {item.number}
                  </motion.div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      {item.isSpecial && (
                        <span className="px-2 py-1 bg-primary text-white text-xs font-bold rounded uppercase tracking-wider">
                          Present
                        </span>
                      )}
                      <span className="text-primary font-bold text-lg">
                        {item.year}
                      </span>
                      <div className="h-px w-8 bg-primary/30" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[rgb(var(--color-text-main))]">
                      {item.title}
                    </h3>
                    <p className="text-[rgb(var(--color-text-body))] text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
