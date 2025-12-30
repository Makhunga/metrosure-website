"use client";

import { Header, Footer } from "@/components";
import { motion } from "framer-motion";

const sections = [
  {
    id: "typography",
    title: "Typography",
    description: "Font scales, heading styles, text treatments",
  },
  {
    id: "buttons",
    title: "Buttons",
    description: "Button variants, states, sizes, and hover effects",
  },
  {
    id: "cards",
    title: "Cards",
    description: "Card layouts, shadows, and interactive states",
  },
  {
    id: "forms",
    title: "Form Elements",
    description: "Inputs, selects, checkboxes, validation states",
  },
  {
    id: "animations",
    title: "Animations",
    description: "Framer Motion experiments and micro-interactions",
  },
  {
    id: "colors",
    title: "Color Palette",
    description: "Brand colors, gradients, and theme swatches",
  },
  {
    id: "scratch",
    title: "Scratch Pad",
    description: "Empty section for ad-hoc testing",
  },
];

export default function PlaygroundPage() {
  return (
    <div className="bg-stone-50 dark:bg-slate-900 min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
              <span>Development Only</span>
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Playground
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              UI/UX testing sandbox. Experiment with components, styles, and animations before implementing on production pages.
            </p>
          </motion.div>

          {/* Quick nav */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-colors"
              >
                {section.title}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <div className="max-w-5xl mx-auto px-6 pb-24 space-y-8">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <details className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {section.title}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {section.description}
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-700">
                <SectionContent id={section.id} />
              </div>
            </details>
          </motion.div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

function SectionContent({ id }: { id: string }) {
  switch (id) {
    case "typography":
      return (
        <div className="space-y-6 pt-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white">Heading 1</h1>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Heading 2</h2>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Heading 3</h3>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Heading 4</h4>
            <h5 className="text-xl font-bold text-slate-900 dark:text-white">Heading 5</h5>
            <h6 className="text-lg font-bold text-slate-900 dark:text-white">Heading 6</h6>
          </div>
          <div className="space-y-2">
            <p className="text-lg text-slate-600 dark:text-slate-300">Large body text for emphasis and introductions.</p>
            <p className="text-base text-slate-600 dark:text-slate-300">Regular body text for paragraphs and content.</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Small text for captions and metadata.</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">Extra small text for fine print.</p>
          </div>
        </div>
      );

    case "buttons":
      return (
        <div className="space-y-6 pt-6">
          <div className="flex flex-wrap gap-4">
            <button className="py-3 px-6 bg-primary hover:bg-[#a50502] text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
              Primary Button
            </button>
            <button className="py-3 px-6 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-xl transition-all">
              Secondary Button
            </button>
            <button className="py-3 px-6 border-2 border-slate-300 dark:border-slate-600 hover:border-primary text-slate-700 dark:text-slate-300 hover:text-primary font-bold rounded-xl transition-all">
              Outline Button
            </button>
            <button className="py-3 px-6 text-primary hover:text-[#a50502] font-bold transition-all">
              Ghost Button
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="py-2 px-4 bg-primary text-white text-sm font-bold rounded-lg">Small</button>
            <button className="py-3 px-6 bg-primary text-white font-bold rounded-xl">Medium</button>
            <button className="py-4 px-8 bg-primary text-white text-lg font-bold rounded-2xl">Large</button>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="py-3 px-6 bg-primary/50 text-white font-bold rounded-xl cursor-not-allowed" disabled>Disabled</button>
            <button className="py-3 px-6 bg-primary text-white font-bold rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              Loading...
            </button>
          </div>
        </div>
      );

    case "cards":
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          <div className="p-6 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-200 dark:border-slate-600">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Basic Card</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Simple card with border and subtle background.</p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Elevated Card</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Card with shadow for visual hierarchy.</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-primary to-[#a50502] rounded-2xl text-white">
            <h3 className="font-bold mb-2">Gradient Card</h3>
            <p className="text-sm text-white/80">Primary gradient background for emphasis.</p>
          </div>
        </div>
      );

    case "forms":
      return (
        <div className="space-y-6 pt-6 max-w-md">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Text Input</label>
            <input
              type="text"
              placeholder="Enter text..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">With Error</label>
            <input
              type="text"
              placeholder="Invalid input"
              className="w-full px-4 py-3 rounded-xl border-2 border-red-500 bg-red-50 dark:bg-red-900/20 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500/20"
            />
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Select</label>
            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="check1" className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
            <label htmlFor="check1" className="text-sm text-slate-700 dark:text-slate-300">Checkbox option</label>
          </div>
        </div>
      );

    case "animations":
      return (
        <div className="space-y-8 pt-6">
          <div className="flex flex-wrap gap-4">
            <motion.div
              className="w-20 h-20 bg-primary rounded-xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            />
            <motion.div
              className="w-20 h-20 bg-emerald-500 rounded-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <motion.div
              className="w-20 h-20 bg-amber-500 rounded-xl"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
            <motion.div
              className="w-20 h-20 bg-blue-500 rounded-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Hover, bounce, spin, and pulse animations</p>
        </div>
      );

    case "colors":
      return (
        <div className="space-y-6 pt-6">
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Brand Colors</h4>
            <div className="flex gap-3">
              <div className="w-16 h-16 bg-primary rounded-xl" title="Primary" />
              <div className="w-16 h-16 bg-[#a50502] rounded-xl" title="Primary Hover" />
              <div className="w-16 h-16 bg-primary/20 rounded-xl" title="Primary Light" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Status Colors</h4>
            <div className="flex gap-3">
              <div className="w-16 h-16 bg-emerald-500 rounded-xl" title="Success" />
              <div className="w-16 h-16 bg-amber-500 rounded-xl" title="Warning" />
              <div className="w-16 h-16 bg-red-500 rounded-xl" title="Error" />
              <div className="w-16 h-16 bg-blue-500 rounded-xl" title="Info" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Slate Scale</h4>
            <div className="flex gap-1">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                <div
                  key={shade}
                  className={`w-10 h-10 bg-slate-${shade} rounded`}
                  style={{ backgroundColor: `rgb(var(--tw-slate-${shade}))` }}
                  title={`slate-${shade}`}
                />
              ))}
            </div>
          </div>
        </div>
      );

    case "scratch":
      return (
        <div className="pt-6 min-h-[200px] flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl">
          <p className="text-slate-400 dark:text-slate-500">Add your experimental code here</p>
        </div>
      );

    default:
      return null;
  }
}
