"use client";

import { motion } from "framer-motion";

export default function ButtonsPage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Buttons
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Button variants, states, sizes, and hover effects
        </p>
      </motion.div>

      <div className="space-y-12">
        {/* Button Variants */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Variants
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="py-3 px-6 bg-primary hover:bg-[rgb(var(--color-primary-hover))] text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
              Primary
            </button>
            <button className="py-3 px-6 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-xl transition-all">
              Secondary
            </button>
            <button className="py-3 px-6 border-2 border-slate-300 dark:border-slate-600 hover:border-primary text-slate-700 dark:text-slate-300 hover:text-primary font-bold rounded-xl transition-all">
              Outline
            </button>
            <button className="py-3 px-6 text-primary hover:text-[#a50502] font-bold transition-all">
              Ghost
            </button>
            <button className="py-3 px-6 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all">
              Subtle
            </button>
          </div>
        </section>

        {/* Sizes */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Sizes
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <button className="py-1.5 px-3 bg-primary text-white text-xs font-bold rounded-lg">
              Extra Small
            </button>
            <button className="py-2 px-4 bg-primary text-white text-sm font-bold rounded-lg">
              Small
            </button>
            <button className="py-3 px-6 bg-primary text-white font-bold rounded-xl">
              Medium
            </button>
            <button className="py-4 px-8 bg-primary text-white text-lg font-bold rounded-2xl">
              Large
            </button>
          </div>
        </section>

        {/* With Icons */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            With Icons
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="py-3 px-6 bg-primary text-white font-bold rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined">arrow_back</span>
              Back
            </button>
            <button className="py-3 px-6 bg-primary text-white font-bold rounded-xl flex items-center gap-2">
              Next
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="py-3 px-6 bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined">check</span>
              Confirm
            </button>
            <button className="py-3 px-6 bg-red-500 text-white font-bold rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined">delete</span>
              Delete
            </button>
          </div>
        </section>

        {/* States */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            States
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="py-3 px-6 bg-primary text-white font-bold rounded-xl">
              Default
            </button>
            <button className="py-3 px-6 bg-primary/50 text-white font-bold rounded-xl cursor-not-allowed opacity-60">
              Disabled
            </button>
            <button className="py-3 px-6 bg-primary text-white font-bold rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined animate-spin text-lg">
                progress_activity
              </span>
              Loading...
            </button>
          </div>
        </section>

        {/* Icon Only */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Icon Only
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">add</span>
            </button>
            <button className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-2xl">add</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
