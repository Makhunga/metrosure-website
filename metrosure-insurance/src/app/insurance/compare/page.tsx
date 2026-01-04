"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Header, Footer } from "@/components";
import {
  comparisonRows,
  scenarios,
  statistics,
  misconceptions,
  pageContent,
} from "@/data/insuranceComparison";

// =============================================================================
// Animation Variants
// =============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// =============================================================================
// Hero Section
// =============================================================================

function HeroSection() {
  return (
    <section className="relative pt-44 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[rgb(var(--color-secondary))]/5" />

      {/* Decorative elements */}
      <div className="absolute top-32 right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-[5%] w-96 h-96 bg-[rgb(var(--color-secondary))]/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/15 border border-primary/20 dark:border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <span className="material-symbols-outlined text-sm">menu_book</span>
              {pageContent.hero.badge}
            </span>
          </motion.div>

          {/* Title with VS styling */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--color-text-main))] mb-6 leading-tight"
          >
            <span className="text-primary">Life Cover</span>
            <span className="mx-4 text-[rgb(var(--color-text-muted))] font-light">vs</span>
            <span className="text-[rgb(var(--color-secondary))]">Funeral Cover</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-[rgb(var(--color-text-body))] leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            {pageContent.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-[rgb(var(--color-primary-hover))] transition-all h-14 px-8 text-white text-lg font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1"
            >
              Get a Free Quote
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <a
              href="tel:+27313011192"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[rgb(var(--color-border-light))] hover:border-primary transition-all h-14 px-8 text-[rgb(var(--color-text-main))] text-lg font-bold hover:text-primary"
            >
              <span className="material-symbols-outlined">call</span>
              Talk to an Adviser
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// Introduction Section
// =============================================================================

function IntroductionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-16 bg-[rgb(var(--color-surface-card))] border-y border-[rgb(var(--color-border-light))]"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-6 lg:px-12"
      >
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Text content */}
          <motion.div variants={fadeInUp} className="lg:col-span-3">
            <h2 className="text-2xl md:text-3xl font-bold text-[rgb(var(--color-text-main))] mb-4">
              {pageContent.introduction.heading}
            </h2>
            <p className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed">
              {pageContent.introduction.text}
            </p>
          </motion.div>

          {/* Stat highlight */}
          <motion.div
            variants={scaleIn}
            className="lg:col-span-2 relative"
          >
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-[rgb(var(--color-secondary))]/10 border border-primary/20 overflow-hidden">
              {/* Decorative ring */}
              <div className="absolute -right-8 -top-8 w-32 h-32 border-4 border-primary/10 rounded-full" />
              <div className="absolute -right-4 -top-4 w-24 h-24 border-4 border-primary/20 rounded-full" />

              <div className="relative">
                <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                  {pageContent.introduction.highlight.value}
                </div>
                <div className="text-lg font-semibold text-[rgb(var(--color-text-main))] mb-2">
                  {pageContent.introduction.highlight.label}
                </div>
                <p className="text-sm text-[rgb(var(--color-text-body))]">
                  {pageContent.introduction.highlight.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// =============================================================================
// Comparison Table Section
// =============================================================================

function ComparisonSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-main))] mb-4">
              {pageContent.comparison.heading}
            </h2>
            <p className="text-lg text-[rgb(var(--color-text-body))] max-w-2xl mx-auto">
              {pageContent.comparison.subheading}
            </p>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            variants={fadeInUp}
            className="overflow-hidden rounded-2xl border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface-card))]"
          >
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-[rgb(var(--color-surface))] border-b border-[rgb(var(--color-border-light))]">
              <div className="p-4 md:p-6 flex items-center">
                <span className="font-semibold text-[rgb(var(--color-text-muted))] text-sm uppercase tracking-wider">
                  Aspect
                </span>
              </div>
              <div className="p-4 md:p-6 flex items-center justify-center bg-primary/5 border-x border-[rgb(var(--color-border-light))]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">favorite</span>
                  <span className="font-bold text-primary">Life Cover</span>
                </div>
              </div>
              <div className="p-4 md:p-6 flex items-center justify-center bg-[rgb(var(--color-secondary))]/5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[rgb(var(--color-secondary))]">
                    sentiment_satisfied
                  </span>
                  <span className="font-bold text-[rgb(var(--color-secondary))]">Funeral Cover</span>
                </div>
              </div>
            </div>

            {/* Table Rows */}
            {comparisonRows.map((row, index) => (
              <div
                key={row.id}
                className={`grid grid-cols-3 ${
                  index !== comparisonRows.length - 1
                    ? "border-b border-[rgb(var(--color-border-light))]"
                    : ""
                }`}
              >
                {/* Aspect */}
                <div className="p-4 md:p-6 flex items-start gap-3">
                  <span className="material-symbols-outlined text-[rgb(var(--color-text-muted))] mt-0.5 shrink-0">
                    {row.icon}
                  </span>
                  <span className="font-semibold text-[rgb(var(--color-text-main))] text-sm md:text-base">
                    {row.aspect}
                  </span>
                </div>

                {/* Life Cover */}
                <div
                  className={`p-4 md:p-6 border-x border-[rgb(var(--color-border-light))] ${
                    row.highlight === "life" || row.highlight === "both"
                      ? "bg-primary/5"
                      : ""
                  }`}
                >
                  <p className="text-sm md:text-base text-[rgb(var(--color-text-body))]">
                    {row.lifeCover}
                  </p>
                </div>

                {/* Funeral Cover */}
                <div
                  className={`p-4 md:p-6 ${
                    row.highlight === "funeral" || row.highlight === "both"
                      ? "bg-[rgb(var(--color-secondary))]/5"
                      : ""
                  }`}
                >
                  <p className="text-sm md:text-base text-[rgb(var(--color-text-body))]">
                    {row.funeralCover}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Legend */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-6 justify-center mt-8 text-sm text-[rgb(var(--color-text-muted))]"
          >
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary/20" />
              <span>Life cover advantage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[rgb(var(--color-secondary))]/20" />
              <span>Funeral cover advantage</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// Scenarios Section
// =============================================================================

function ScenariosSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getRecommendationStyle = (rec: "life" | "funeral" | "both") => {
    switch (rec) {
      case "life":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30";
      case "funeral":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
      case "both":
        return "bg-primary/10 text-primary border-primary/30";
    }
  };

  return (
    <section ref={ref} className="py-24 bg-[rgb(var(--color-surface-card))]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-main))] mb-4">
              {pageContent.scenarios.heading}
            </h2>
            <p className="text-lg text-[rgb(var(--color-text-body))] max-w-2xl mx-auto">
              {pageContent.scenarios.subheading}
            </p>
          </motion.div>

          {/* Scenario Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {scenarios.map((scenario) => (
              <motion.div
                key={scenario.id}
                variants={fadeInUp}
                className="group relative p-8 rounded-2xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    {scenario.icon}
                  </span>
                </div>

                {/* Title & Situation */}
                <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-2">
                  {scenario.title}
                </h3>
                <p className="text-[rgb(var(--color-text-muted))] text-sm mb-4">
                  {scenario.situation}
                </p>

                {/* Recommendation Badge */}
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border mb-4 ${getRecommendationStyle(
                    scenario.recommendation
                  )}`}
                >
                  <span className="material-symbols-outlined text-lg">
                    {scenario.recommendation === "both"
                      ? "check_circle"
                      : scenario.recommendation === "life"
                      ? "favorite"
                      : "sentiment_satisfied"}
                  </span>
                  {scenario.recommendationText}
                </div>

                {/* Reasoning */}
                <p className="text-[rgb(var(--color-text-body))] text-sm leading-relaxed">
                  {scenario.reasoning}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// Statistics Section
// =============================================================================

function StatisticsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(var(--color-primary)) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-main))] mb-4">
              {pageContent.statistics.heading}
            </h2>
            <p className="text-lg text-[rgb(var(--color-text-body))] max-w-2xl mx-auto">
              {pageContent.statistics.subheading}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat) => (
              <motion.a
                key={stat.id}
                href={stat.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={scaleIn}
                className="group relative p-6 rounded-2xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-primary/50 hover:shadow-lg transition-all"
              >
                {/* Value */}
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="font-semibold text-[rgb(var(--color-text-main))] mb-2">
                  {stat.label}
                </div>

                {/* Description */}
                <p className="text-sm text-[rgb(var(--color-text-body))] mb-4">
                  {stat.description}
                </p>

                {/* Source */}
                <div className="flex items-center gap-1 text-xs text-[rgb(var(--color-text-muted))] group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                  <span>{stat.source}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// Misconceptions Section
// =============================================================================

function MisconceptionsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-[rgb(var(--color-surface-card))]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-main))] mb-4">
              {pageContent.misconceptions.heading}
            </h2>
            <p className="text-lg text-[rgb(var(--color-text-body))] max-w-2xl mx-auto">
              {pageContent.misconceptions.subheading}
            </p>
          </motion.div>

          {/* Misconception Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {misconceptions.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="relative overflow-hidden rounded-2xl"
              >
                {/* Myth */}
                <div className="p-6 bg-red-500/5 dark:bg-red-500/10 border-l-4 border-red-500">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-red-500">close</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-red-500 mb-1 block">
                        Myth
                      </span>
                      <p className="font-semibold text-[rgb(var(--color-text-main))]">
                        &ldquo;{item.myth}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reality */}
                <div className="p-6 bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] border-t-0">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-green-500">check</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400 mb-1 block">
                        Reality
                      </span>
                      <p className="text-[rgb(var(--color-text-body))] text-sm leading-relaxed">
                        {item.reality}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// Calculator CTA Section
// =============================================================================

function CalculatorCTASection() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(var(--color-primary)) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Icon */}
          <div className="shrink-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-2xl shadow-primary/30 rotate-3 hover:rotate-0 transition-transform duration-300">
              <span className="material-symbols-outlined text-white text-5xl md:text-6xl">
                calculate
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {pageContent.calculator.heading}
            </h3>
            <p className="text-slate-300 text-lg max-w-xl">
              {pageContent.calculator.text}
            </p>
          </div>

          {/* CTA */}
          <div className="shrink-0">
            <Link
              href="/tools/coverage-calculator"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-slate-900 font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <span className="material-symbols-outlined text-primary text-2xl">pie_chart</span>
              {pageContent.calculator.cta}
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Final CTA Section
// =============================================================================

function FinalCTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary to-[rgb(var(--color-secondary))] text-white overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          {/* VS graphic */}
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-10">
            <div className="text-[200px] font-bold leading-none">VS</div>
          </div>

          <div className="relative">
            {/* Icons */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-3xl">favorite</span>
              </div>
              <span className="text-2xl font-bold text-white/60">+</span>
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-3xl">
                  sentiment_satisfied
                </span>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {pageContent.finalCta.heading}
            </h2>
            <p className="text-white/80 mb-8 max-w-xl">
              {pageContent.finalCta.text}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-white text-primary font-bold hover:bg-white/90 transition-all"
              >
                <span className="material-symbols-outlined">bolt</span>
                Get a Free Quote
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border-2 border-white text-white font-bold hover:bg-white/10 transition-all"
              >
                <span className="material-symbols-outlined">call</span>
                Talk to an Adviser
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// Main Page Component
// =============================================================================

export default function InsuranceComparePage() {
  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen">
      <Header />
      <HeroSection />
      <IntroductionSection />
      <ComparisonSection />
      <ScenariosSection />
      <StatisticsSection />
      <MisconceptionsSection />
      <CalculatorCTASection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
