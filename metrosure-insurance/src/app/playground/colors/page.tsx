"use client";

import { motion } from "framer-motion";

export default function ColorsPage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Color Palette
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Brand colors, gradients, and theme swatches
        </p>
      </motion.div>

      <div className="space-y-12">
        {/* Brand Colors */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Brand Colors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="h-24 bg-primary rounded-xl mb-2" />
              <p className="text-sm font-medium text-slate-900 dark:text-white">Primary</p>
              <p className="text-xs text-slate-500">#BF0603</p>
            </div>
            <div>
              <div className="h-24 bg-[#a50502] rounded-xl mb-2" />
              <p className="text-sm font-medium text-slate-900 dark:text-white">Primary Hover</p>
              <p className="text-xs text-slate-500">#a50502</p>
            </div>
            <div>
              <div className="h-24 bg-primary/20 rounded-xl mb-2" />
              <p className="text-sm font-medium text-slate-900 dark:text-white">Primary Light</p>
              <p className="text-xs text-slate-500">primary/20</p>
            </div>
            <div>
              <div className="h-24 bg-primary/10 rounded-xl mb-2" />
              <p className="text-sm font-medium text-slate-900 dark:text-white">Primary Subtle</p>
              <p className="text-xs text-slate-500">primary/10</p>
            </div>
          </div>
        </section>

        {/* Status Colors */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Status Colors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="h-24 bg-emerald-500 rounded-xl mb-2" />
              <p className="text-sm font-medium text-slate-900 dark:text-white">Success</p>
              <p className="text-xs text-slate-500">emerald-500</p>
            </div>
            <div>
              <div className="h-24 bg-amber-500 rounded-xl mb-2" />
              <p className="text-sm font-medium text-slate-900 dark:text-white">Warning</p>
              <p className="text-xs text-slate-500">amber-500</p>
            </div>
            <div>
              <div className="h-24 bg-red-500 rounded-xl mb-2" />
              <p className="text-sm font-medium text-slate-900 dark:text-white">Error</p>
              <p className="text-xs text-slate-500">red-500</p>
            </div>
            <div>
              <div className="h-24 bg-blue-500 rounded-xl mb-2" />
              <p className="text-sm font-medium text-slate-900 dark:text-white">Info</p>
              <p className="text-xs text-slate-500">blue-500</p>
            </div>
          </div>
        </section>

        {/* Slate Scale */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Slate Scale
          </h2>
          <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
              (shade) => (
                <div key={shade}>
                  <div
                    className={`h-16 rounded-lg mb-1 bg-slate-${shade}`}
                    style={{
                      backgroundColor:
                        shade === 50
                          ? "#f8fafc"
                          : shade === 100
                          ? "#f1f5f9"
                          : shade === 200
                          ? "#e2e8f0"
                          : shade === 300
                          ? "#cbd5e1"
                          : shade === 400
                          ? "#94a3b8"
                          : shade === 500
                          ? "#64748b"
                          : shade === 600
                          ? "#475569"
                          : shade === 700
                          ? "#334155"
                          : shade === 800
                          ? "#1e293b"
                          : shade === 900
                          ? "#0f172a"
                          : "#020617",
                    }}
                  />
                  <p className="text-xs text-center text-slate-500">{shade}</p>
                </div>
              )
            )}
          </div>
        </section>

        {/* Gradients */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Gradients
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <div className="h-24 bg-gradient-to-br from-primary to-[#a50502] rounded-xl mb-2" />
              <p className="text-sm font-medium text-slate-900 dark:text-white">Primary</p>
            </div>
            <div>
              <div className="h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-2" />
              <p className="text-sm font-medium text-slate-900 dark:text-white">Ocean</p>
            </div>
            <div>
              <div className="h-24 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl mb-2" />
              <p className="text-sm font-medium text-slate-900 dark:text-white">Violet</p>
            </div>
            <div>
              <div className="h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl mb-2" />
              <p className="text-sm font-medium text-slate-900 dark:text-white">Emerald</p>
            </div>
            <div>
              <div className="h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl mb-2" />
              <p className="text-sm font-medium text-slate-900 dark:text-white">Sunset</p>
            </div>
            <div>
              <div className="h-24 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl mb-2" />
              <p className="text-sm font-medium text-slate-900 dark:text-white">Rose</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
