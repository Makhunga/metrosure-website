"use client";

import { motion } from "framer-motion";

export default function AnimationsPage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Animations
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Framer Motion experiments and micro-interactions
        </p>
      </motion.div>

      <div className="space-y-12">
        {/* Hover Effects */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Hover Effects
          </h2>
          <div className="flex flex-wrap gap-6">
            <motion.div
              className="w-24 h-24 bg-primary rounded-xl flex items-center justify-center text-white text-xs font-bold cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Scale
            </motion.div>
            <motion.div
              className="w-24 h-24 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xs font-bold cursor-pointer"
              whileHover={{ rotate: 10 }}
            >
              Rotate
            </motion.div>
            <motion.div
              className="w-24 h-24 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xs font-bold cursor-pointer"
              whileHover={{ y: -8 }}
            >
              Lift
            </motion.div>
            <motion.div
              className="w-24 h-24 bg-amber-500 rounded-xl flex items-center justify-center text-white text-xs font-bold cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 5, y: -4 }}
            >
              Combined
            </motion.div>
          </div>
        </section>

        {/* Continuous Animations */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Continuous Animations
          </h2>
          <div className="flex flex-wrap gap-6">
            <motion.div
              className="w-24 h-24 bg-primary rounded-xl flex items-center justify-center text-white text-xs font-bold"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Bounce
            </motion.div>
            <motion.div
              className="w-24 h-24 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xs font-bold"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            >
              Spin
            </motion.div>
            <motion.div
              className="w-24 h-24 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xs font-bold"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Pulse
            </motion.div>
            <motion.div
              className="w-24 h-24 bg-amber-500 rounded-xl flex items-center justify-center text-white text-xs font-bold"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Fade
            </motion.div>
          </div>
        </section>

        {/* Spring Physics */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Spring Physics
          </h2>
          <div className="flex flex-wrap gap-6">
            <motion.div
              className="w-24 h-24 bg-violet-500 rounded-xl flex items-center justify-center text-white text-xs font-bold cursor-pointer"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Bouncy
            </motion.div>
            <motion.div
              className="w-24 h-24 bg-pink-500 rounded-xl flex items-center justify-center text-white text-xs font-bold cursor-pointer"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              Slow
            </motion.div>
            <motion.div
              className="w-24 h-24 bg-cyan-500 rounded-xl flex items-center justify-center text-white text-xs font-bold cursor-pointer"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              Snappy
            </motion.div>
          </div>
        </section>

        {/* Staggered Children */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
            Staggered Reveal
          </h2>
          <motion.div
            className="flex flex-wrap gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="w-16 h-16 bg-slate-200 dark:bg-slate-600 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {i}
              </motion.div>
            ))}
          </motion.div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
            Refresh the page to see the staggered entrance animation
          </p>
        </section>
      </div>
    </div>
  );
}
