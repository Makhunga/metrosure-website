"use client";

import { motion } from "framer-motion";

export default function CardsPage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Cards
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Card layouts, shadows, and interactive states
        </p>
      </motion.div>

      <div className="space-y-12">
        {/* Basic Cards */}
        <section>
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Basic Styles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-200 dark:border-slate-600">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                Bordered Card
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Simple card with border and subtle background.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                Elevated Card
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Card with shadow for visual hierarchy.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-primary to-[#a50502] rounded-2xl text-white">
              <h3 className="font-bold mb-2">Gradient Card</h3>
              <p className="text-sm text-white/80">
                Primary gradient background for emphasis.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Cards */}
        <section>
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Interactive
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer"
              whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)" }}
            >
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                Hover Lift
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Lifts up on hover with shadow.
              </p>
            </motion.div>
            <motion.div
              className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                Hover Scale
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Scales up slightly on hover.
              </p>
            </motion.div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border-2 border-transparent hover:border-primary transition-colors cursor-pointer">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                Border Highlight
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Border changes color on hover.
              </p>
            </div>
          </div>
        </section>

        {/* Card with Header */}
        <section>
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            With Header
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Card Title
                </h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Card content goes here. This pattern is useful for settings panels or data displays.
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-blue-500 to-cyan-500" />
              <div className="p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  Image Header
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Card with gradient or image header section.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Status Cards */}
        <section>
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Status Cards
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <span className="material-symbols-outlined text-emerald-500 text-2xl mb-2">
                check_circle
              </span>
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400">
                Success
              </h3>
            </div>
            <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800">
              <span className="material-symbols-outlined text-amber-500 text-2xl mb-2">
                warning
              </span>
              <h3 className="font-bold text-amber-700 dark:text-amber-400">
                Warning
              </h3>
            </div>
            <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
              <span className="material-symbols-outlined text-red-500 text-2xl mb-2">
                error
              </span>
              <h3 className="font-bold text-red-700 dark:text-red-400">
                Error
              </h3>
            </div>
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
              <span className="material-symbols-outlined text-blue-500 text-2xl mb-2">
                info
              </span>
              <h3 className="font-bold text-blue-700 dark:text-blue-400">
                Info
              </h3>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
