"use client";

import { motion, AnimatePresence } from "framer-motion";

interface InlineErrorProps {
  error: string | null;
  id?: string;
}

/**
 * Animated inline error message component
 * Displays below form inputs with a smooth entrance/exit animation
 * Supports aria-describedby linking via the id prop
 */
export function InlineError({ error, id }: InlineErrorProps) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          id={id}
          role="alert"
          aria-live="polite"
          initial={{ opacity: 0, y: -5, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -5, height: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5 mt-1.5 ml-1"
        >
          <span className="material-symbols-outlined text-red-500 text-sm" aria-hidden="true">error</span>
          <span className="text-red-500 text-xs font-medium">{error}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
