"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const experiments = [
  {
    id: "typography",
    title: "Typography",
    description: "Font scales, heading styles, text treatments",
    icon: "text_fields",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "buttons",
    title: "Buttons",
    description: "Button variants, states, sizes, and hover effects",
    icon: "smart_button",
    color: "from-primary to-[#a50502]",
  },
  {
    id: "cards",
    title: "Cards",
    description: "Card layouts, shadows, and interactive states",
    icon: "dashboard",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "forms",
    title: "Form Elements",
    description: "Inputs, selects, checkboxes, validation states",
    icon: "input",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "animations",
    title: "Animations",
    description: "Framer Motion experiments and micro-interactions",
    icon: "animation",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "colors",
    title: "Color Palette",
    description: "Brand colors, gradients, and theme swatches",
    icon: "palette",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "scratch",
    title: "Scratch Pad",
    description: "Empty canvas for ad-hoc testing",
    icon: "edit_note",
    color: "from-slate-500 to-slate-600",
  },
];

export default function PlaygroundIndexPage() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
          <span className="material-symbols-outlined text-sm">science</span>
          Development Only
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          Playground
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          UI/UX testing sandbox. Experiment with components, styles, and
          animations before implementing on production pages.
        </p>
      </motion.div>

      {/* Experiment Cards Grid */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {experiments.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Link
              href={`/playground/${exp.id}`}
              className="group block h-full bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300"
            >
              {/* Gradient header */}
              <div
                className={`h-24 bg-gradient-to-br ${exp.color} flex items-center justify-center`}
              >
                <span className="material-symbols-outlined text-4xl text-white/90 group-hover:scale-110 transition-transform">
                  {exp.icon}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                  {exp.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {exp.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick tips */}
      <motion.div
        className="mt-12 p-6 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">lightbulb</span>
          Quick Tips
        </h3>
        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
          <li>
            • Each experiment page is isolated - styles won&apos;t conflict
          </li>
          <li>• Use the sidebar to quickly switch between experiments</li>
          <li>
            • The Scratch Pad is empty by default - add your experimental code
            there
          </li>
          <li>
            • This page is hidden from search engines (noindex) and navigation
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
