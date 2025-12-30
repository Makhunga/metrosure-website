"use client";

import { motion } from "framer-motion";

export default function TypographyPage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Typography
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Font scales, heading styles, and text treatments
        </p>
      </motion.div>

      <div className="space-y-12">
        {/* Headings */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Headings
          </h2>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
              Heading 1 - text-5xl
            </h1>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
              Heading 2 - text-4xl
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              Heading 3 - text-3xl
            </h3>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
              Heading 4 - text-2xl
            </h4>
            <h5 className="text-xl font-bold text-slate-900 dark:text-white">
              Heading 5 - text-xl
            </h5>
            <h6 className="text-lg font-bold text-slate-900 dark:text-white">
              Heading 6 - text-lg
            </h6>
          </div>
        </section>

        {/* Body Text */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Body Text
          </h2>
          <div className="space-y-4">
            <p className="text-xl text-slate-600 dark:text-slate-300">
              text-xl - Large body text for emphasis and introductions.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              text-lg - Slightly larger text for subheadings or emphasis.
            </p>
            <p className="text-base text-slate-600 dark:text-slate-300">
              text-base - Regular body text for paragraphs and content. This is
              the default size for most content.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              text-sm - Small text for captions, labels, and metadata.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              text-xs - Extra small text for fine print and legal disclaimers.
            </p>
          </div>
        </section>

        {/* Font Weights */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Font Weights
          </h2>
          <div className="space-y-3 text-xl text-slate-900 dark:text-white">
            <p className="font-light">font-light (300)</p>
            <p className="font-normal">font-normal (400)</p>
            <p className="font-medium">font-medium (500)</p>
            <p className="font-semibold">font-semibold (600)</p>
            <p className="font-bold">font-bold (700)</p>
            <p className="font-extrabold">font-extrabold (800)</p>
            <p className="font-black">font-black (900)</p>
          </div>
        </section>

        {/* Special Styles */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Special Styles
          </h2>
          <div className="space-y-4 text-lg">
            <p className="text-primary font-bold">Primary color text</p>
            <p className="italic text-slate-600 dark:text-slate-300">
              Italic text for emphasis
            </p>
            <p className="underline text-slate-600 dark:text-slate-300">
              Underlined text
            </p>
            <p className="line-through text-slate-400">Strikethrough text</p>
            <p className="uppercase tracking-widest text-sm font-bold text-slate-500">
              Uppercase tracking-widest
            </p>
            <p className="font-mono text-slate-600 dark:text-slate-300">
              Monospace font for code
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
