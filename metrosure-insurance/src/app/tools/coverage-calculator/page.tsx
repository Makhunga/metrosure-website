"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LifeCoverCalculator } from "@/components/tools/LifeCoverCalculator";
import { FuneralCoverCalculator } from "@/components/tools/FuneralCoverCalculator";
import { FAQAccordion } from "@/components/tools/FAQAccordion";
import {
  calculatorTabs,
  lifeCoverFAQs,
  funeralCoverFAQs,
  educationalPoints,
  heroKeyPoints,
} from "@/data/calculatorData";

type CalculatorTab = "life" | "funeral";

export default function CoverageCalculatorPage() {
  const [activeTab, setActiveTab] = useState<CalculatorTab>("life");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="hero-grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.5" fill="currentColor" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#690025]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6"
              >
                <span className="material-symbols-outlined text-primary text-lg">
                  calculate
                </span>
                <span className="text-sm font-medium text-white/90">
                  Free Calculator Tool
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                How Much{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#EF4444]">
                  Cover
                </span>{" "}
                Do You Need?
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
                Not sure how much insurance you need? Our free calculator helps you understand
                your coverage requirements based on your unique circumstances. No obligations,
                just clarity.
              </p>

              {/* Key Points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {heroKeyPoints.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-lg">
                        {item.icon}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 100"
              className="w-full h-16 sm:h-24"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
                className="fill-slate-50 dark:fill-slate-900"
              />
            </svg>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200 dark:border-slate-700">
              {calculatorTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 flex items-center gap-4 px-6 py-5 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-br from-primary to-[#a50502] text-white shadow-lg shadow-primary/20"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      activeTab === tab.id
                        ? "bg-white/20"
                        : "bg-slate-100 dark:bg-slate-700"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-2xl ${
                        activeTab === tab.id ? "text-white" : "text-primary"
                      }`}
                    >
                      {tab.icon}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg">{tab.label}</p>
                    <p
                      className={`text-sm ${
                        activeTab === tab.id ? "text-white/80" : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {tab.description}
                    </p>
                  </div>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-[#a50502] -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Calculator Content - Both mounted to preserve state */}
          <div className="relative">
            {/* Life Cover Calculator */}
            <motion.div
              initial={false}
              animate={{
                opacity: activeTab === "life" ? 1 : 0,
                scale: activeTab === "life" ? 1 : 0.98,
                zIndex: activeTab === "life" ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className={activeTab === "life" ? "relative" : "absolute inset-0 pointer-events-none"}
              aria-hidden={activeTab !== "life"}
            >
              <LifeCoverCalculator />
            </motion.div>

            {/* Funeral Cover Calculator */}
            <motion.div
              initial={false}
              animate={{
                opacity: activeTab === "funeral" ? 1 : 0,
                scale: activeTab === "funeral" ? 1 : 0.98,
                zIndex: activeTab === "funeral" ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className={activeTab === "funeral" ? "relative" : "absolute inset-0 pointer-events-none"}
              aria-hidden={activeTab !== "funeral"}
            >
              <FuneralCoverCalculator />
            </motion.div>
          </div>
        </section>

        {/* Educational Section */}
        <section className="bg-white dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Why Calculate Your Coverage?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Understanding your insurance needs is the first step to protecting what matters most.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {educationalPoints.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <FAQAccordion
                faqs={activeTab === "life" ? lifeCoverFAQs : funeralCoverFAQs}
                title={`${activeTab === "life" ? "Life Cover" : "Funeral Cover"} FAQs`}
              />
            </motion.div>
          </AnimatePresence>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-primary via-primary to-[#690025] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="material-symbols-outlined text-6xl text-white/30 mb-4">
                support_agent
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Need Help Understanding Your Results?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Our insurance advisors are ready to explain your options and help you find
                the perfect coverage for your situation. No pressure, just expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:0872651891"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
                >
                  <span className="material-symbols-outlined">call</span>
                  Call 087 265 1891
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <span className="material-symbols-outlined">mail</span>
                  Request a Callback
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
