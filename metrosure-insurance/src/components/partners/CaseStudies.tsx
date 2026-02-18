"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  caseStudies,
  caseStudyHeroStats,
  type CaseStudy,
} from "@/data/caseStudies";
import { contactDetails } from "@/data/companyInfo";

/**
 * CaseStudyCard - Expandable card showing Challenge → Solution → Results
 */
function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
      className="group"
    >
      <motion.div
        className="relative h-full rounded-2xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-primary/30 transition-all duration-300 overflow-hidden"
        layout
      >
        {/* Featured Badge */}
        {study.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold z-10">
            Featured
          </div>
        )}

        {/* Header Section - Always Visible */}
        <div className="p-6 md:p-8">
          {/* Partner Info */}
          <div className="flex items-start gap-4 mb-6">
            {/* Logo Placeholder */}
            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
              <span className="text-primary font-bold text-lg">
                {study.logoPlaceholder}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-1">
                {study.partnerName}
              </h3>
              <p className="text-sm text-[rgb(var(--color-text-body))]">
                {study.partnerType} &bull; {study.industry}
              </p>
              <div className="flex items-center gap-1 mt-1 text-xs text-[rgb(var(--color-text-body))]">
                <span className="material-symbols-outlined text-sm">
                  location_on
                </span>
                {study.location}
              </div>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {study.metrics.map((metric, i) => (
              <motion.div
                key={i}
                className="p-3 rounded-xl bg-[rgb(var(--color-surface))]/50 border border-[rgb(var(--color-border-light))] text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.5 + index * 0.15 + i * 0.1 }}
              >
                <span className="material-symbols-outlined text-primary text-lg mb-1 block">
                  {metric.icon}
                </span>
                <div className="text-xl font-bold text-[rgb(var(--color-text-main))]">
                  {metric.value}
                </div>
                <div className="text-xs text-[rgb(var(--color-text-body))]">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Challenge Preview */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                flag
              </span>
              The Challenge
            </h4>
            <p className="text-[rgb(var(--color-text-body))] text-sm leading-relaxed line-clamp-3">
              {study.challenge}
            </p>
          </div>

          {/* Expand/Collapse Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-primary font-medium text-sm hover:text-primary/80 transition-colors"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            {isExpanded ? "Show less" : "Read full case study"}
            <motion.span
              className="material-symbols-outlined text-lg"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              expand_more
            </motion.span>
          </motion.button>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-8 pt-2 border-t border-[rgb(var(--color-border-light))]">
                {/* Full Challenge */}
                <div className="mb-6 pt-4">
                  <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">
                      flag
                    </span>
                    The Challenge
                  </h4>
                  <p className="text-[rgb(var(--color-text-body))] leading-relaxed">
                    {study.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">
                      lightbulb
                    </span>
                    Our Solution
                  </h4>
                  <ul className="space-y-2">
                    {study.solution.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="material-symbols-outlined text-primary text-sm mt-1 flex-shrink-0">
                          check_circle
                        </span>
                        <span className="text-[rgb(var(--color-text-body))] text-sm">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Results */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">
                      trending_up
                    </span>
                    The Results
                  </h4>
                  <ul className="space-y-2">
                    {study.results.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <span className="material-symbols-outlined text-emerald-500 text-sm mt-1 flex-shrink-0">
                          check_circle
                        </span>
                        <span className="text-[rgb(var(--color-text-body))] text-sm">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Partner Quote */}
                <motion.div
                  className="relative p-6 rounded-xl bg-primary/5 border-l-4 border-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="material-symbols-outlined text-primary/20 text-5xl absolute top-2 right-4">
                    format_quote
                  </span>
                  <blockquote className="text-[rgb(var(--color-text-body))] italic mb-4 relative z-10">
                    &ldquo;{study.quote.text}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">
                        {study.quote.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-[rgb(var(--color-text-main))] text-sm">
                        {study.quote.author}
                      </div>
                      <div className="text-xs text-[rgb(var(--color-text-body))]">
                        {study.quote.role}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Duration & Services */}
                <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-[rgb(var(--color-border-light))]">
                  <div className="flex items-center gap-2 text-sm text-[rgb(var(--color-text-body))]">
                    <span className="material-symbols-outlined text-sm text-primary">
                      schedule
                    </span>
                    Partnership: {study.duration}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {study.servicesUsed.map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 text-xs rounded-full bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] text-[rgb(var(--color-text-body))]"
                      >
                        {service.replace(/-/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/**
 * CaseStudies - Main component for partnership success stories
 */
export default function CaseStudies() {
  return (
    <section
      className="relative py-24 bg-[rgb(var(--color-surface))] transition-colors duration-300 overflow-hidden"
    >
      {/* Extended decorative watermark - Proven Results */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 md:top-4 text-[8rem] md:text-[12rem] lg:text-[14rem] font-black text-slate-200/40 dark:text-white/[0.04] select-none z-0 whitespace-nowrap pointer-events-none uppercase tracking-tighter"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        Proven Results
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
          >
            Partnership Success Stories
          </motion.h2>
          <motion.p
            className="text-xl text-[rgb(var(--color-text-body))] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.4 }}
          >
            See how South African retailers are growing their businesses with Metrosure.
            Real partners, real results, real impact.
          </motion.p>
        </motion.div>

        {/* Hero Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {caseStudyHeroStats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative p-6 rounded-2xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] text-center group hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <motion.div
                className="text-4xl md:text-5xl font-black text-primary mb-2"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm font-semibold text-[rgb(var(--color-text-main))] mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-[rgb(var(--color-text-body))]">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Case Study Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              index={index}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center rounded-2xl p-8 md:p-12 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[rgb(var(--color-text-main))] mb-4">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-[rgb(var(--color-text-body))] mb-6 max-w-2xl mx-auto">
            Join over 100 retail partners across South Africa. Let&apos;s discuss how we can
            help you grow your business with proven sales and insurance solutions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#partner-inquiry"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Your Partnership
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={contactDetails.phone.href}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-[rgb(var(--color-border-light))] text-[rgb(var(--color-text-main))] font-medium hover:bg-[rgb(var(--color-surface-card))] transition-all duration-300"
              >
                <span className="material-symbols-outlined text-primary text-lg">
                  call
                </span>
                Call {contactDetails.phone.display}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
