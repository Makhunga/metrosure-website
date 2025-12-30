"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { getAllJobs, getAllCategories, getJobsByCategory } from "@/data/jobs";
import JobCard from "./JobCard";

interface OpenPositionsProps {
  onApplyClick: (position: string) => void;
}

export default function OpenPositions({ onApplyClick }: OpenPositionsProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = getAllCategories();
  const filteredJobs = getJobsByCategory(activeCategory);
  const allJobs = getAllJobs();

  return (
    <section
      ref={sectionRef}
      id="open-positions"
      className="py-24 bg-[rgb(var(--color-surface-card))] transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
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
              Current Opportunities
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Find Your <span className="text-primary">Role</span>
          </motion.h2>

          <motion.p
            className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We&apos;re always looking for talented people in sales and customer
            service. Find the perfect role for you below.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex justify-center gap-8 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <div className="text-center">
              <span className="text-3xl font-bold text-primary">{allJobs.length}</span>
              <p className="text-sm text-[rgb(var(--color-text-muted))]">Open Positions</p>
            </div>
            <div className="w-px bg-[rgb(var(--color-border-light))]" />
            <div className="text-center">
              <span className="text-3xl font-bold text-primary">{categories.length - 1}</span>
              <p className="text-sm text-[rgb(var(--color-text-muted))]">Departments</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-body))] border border-[rgb(var(--color-border-light))] hover:border-primary/30"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.label}
              {category.id !== "all" && (
                <span className="ml-2 text-xs opacity-70">
                  ({getJobsByCategory(category.id).length})
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Job Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                index={index}
                onQuickApply={onApplyClick}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-20 h-20 rounded-full bg-[rgb(var(--color-surface))] mx-auto mb-6 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-[rgb(var(--color-text-muted))]">
                search_off
              </span>
            </div>
            <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-2">
              No positions found
            </h3>
            <p className="text-[rgb(var(--color-text-body))]">
              No positions found in this category. Check back soon!
            </p>
            <motion.button
              onClick={() => setActiveCategory("all")}
              className="mt-6 px-6 py-2.5 rounded-full bg-primary text-white font-semibold text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Positions
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
