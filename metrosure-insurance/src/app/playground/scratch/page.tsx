"use client";

import { motion } from "framer-motion";

export default function ScratchPage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Scratch Pad
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Empty canvas for ad-hoc testing and experiments
        </p>
      </motion.div>

      {/* Empty Canvas */}
      <div className="min-h-[60vh] bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center">
        <div className="text-center p-8">
          <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">
            edit_note
          </span>
          <h2 className="text-xl font-bold text-slate-400 dark:text-slate-500 mb-2">
            Your Canvas Awaits
          </h2>
          <p className="text-slate-400 dark:text-slate-500 max-w-md">
            Add your experimental components, styles, and code here.
            This page is isolated from other experiments.
          </p>
          <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-xl text-left max-w-md mx-auto">
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {`// Edit this file:`}
              <br />
              {`// src/app/playground/scratch/page.tsx`}
            </p>
          </div>
        </div>
      </div>

      {/* Example Section (commented out) */}
      {/*
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Example Experiment
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Add your experimental content here.
        </p>
      </div>
      */}
    </div>
  );
}
