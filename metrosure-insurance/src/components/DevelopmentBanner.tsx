"use client";

import { motion } from "framer-motion";

export default function DevelopmentBanner() {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-[200]"
    >
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm">
          {/* Construction Icon */}
          <span className="material-symbols-outlined text-amber-900 text-lg shrink-0">
            construction
          </span>

          {/* Message */}
          <p className="text-amber-900 font-medium text-center">
            <span className="font-bold">Website Under Development</span>
            <span className="hidden sm:inline">
              {" "}— Some features may be unavailable. Your feedback helps us improve!
            </span>
            <span className="sm:hidden">
              {" "}— Feedback welcome!
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
