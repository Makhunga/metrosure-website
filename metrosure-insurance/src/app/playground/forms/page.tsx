"use client";

import { motion } from "framer-motion";

export default function FormsPage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Form Elements
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Inputs, selects, checkboxes, and validation states
        </p>
      </motion.div>

      <div className="space-y-12 max-w-2xl">
        {/* Text Inputs */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Text Inputs
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Default Input
              </label>
              <input
                type="text"
                placeholder="Enter text..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                With Icon
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Disabled
              </label>
              <input
                type="text"
                placeholder="Disabled input"
                disabled
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>
        </section>

        {/* Validation States */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Validation States
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Error State
              </label>
              <input
                type="text"
                placeholder="Invalid input"
                className="w-full px-4 py-3 rounded-xl border-2 border-red-500 bg-red-50 dark:bg-red-900/20 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500/20"
              />
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">error</span>
                This field is required
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Success State
              </label>
              <input
                type="text"
                defaultValue="Valid input"
                className="w-full px-4 py-3 rounded-xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-slate-900 dark:text-white"
              />
              <p className="text-emerald-500 text-sm mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Looks good!
              </p>
            </div>
          </div>
        </section>

        {/* Select & Textarea */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Select & Textarea
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Select
              </label>
              <select className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Textarea
              </label>
              <textarea
                rows={4}
                placeholder="Enter your message..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              />
            </div>
          </div>
        </section>

        {/* Checkboxes & Radios */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Checkboxes & Radios
          </h2>
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Checkbox option 1
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Checkbox option 2 (checked)
                </span>
              </label>
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="radio-group"
                  className="w-5 h-5 border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Radio option 1
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="radio-group"
                  defaultChecked
                  className="w-5 h-5 border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Radio option 2 (selected)
                </span>
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
