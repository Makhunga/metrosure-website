"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// =============================================================================
// Types
// =============================================================================

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  title?: string;
  className?: string;
}

// =============================================================================
// Animation Variants
// =============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 30,
    },
  },
};

const contentVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: "easeInOut" as const },
      opacity: { duration: 0.2 },
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: "easeInOut" as const },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
};

// =============================================================================
// Component
// =============================================================================

export function FAQAccordion({ faqs, title, className = "" }: FAQAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={className}>
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
        >
          {title}
        </motion.h2>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {faqs.map((faq, index) => {
          const isExpanded = expandedIndex === index;
          const itemId = `faq-item-${index}`;
          const contentId = `faq-content-${index}`;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div
                className={`
                  relative overflow-hidden rounded-xl border transition-all duration-300
                  ${isExpanded
                    ? "border-primary/30 bg-white shadow-lg shadow-primary/5 dark:border-primary/40 dark:bg-slate-800/80"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
                  }
                `}
              >
                {/* Accent bar on expanded */}
                <motion.div
                  initial={false}
                  animate={{
                    scaleY: isExpanded ? 1 : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 top-0 h-full w-1 origin-top bg-gradient-to-b from-primary to-[#a50502]"
                />

                {/* Question button */}
                <button
                  id={itemId}
                  onClick={() => toggleItem(index)}
                  aria-expanded={isExpanded}
                  aria-controls={contentId}
                  className={`
                    flex w-full items-center justify-between gap-4 p-5 text-left
                    transition-colors duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2
                    dark:focus-visible:ring-offset-slate-900
                    ${isExpanded ? "pl-6" : ""}
                  `}
                >
                  <span
                    className={`
                      text-base font-semibold leading-relaxed transition-colors duration-200 sm:text-lg
                      ${isExpanded
                        ? "text-primary dark:text-red-400"
                        : "text-slate-800 group-hover:text-slate-900 dark:text-slate-200 dark:group-hover:text-white"
                      }
                    `}
                  >
                    {faq.question}
                  </span>

                  {/* Chevron icon */}
                  <motion.div
                    initial={false}
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                    className={`
                      flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full
                      transition-colors duration-200
                      ${isExpanded
                        ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-red-400"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:group-hover:bg-slate-600"
                      }
                    `}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>

                {/* Answer content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={itemId}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      variants={contentVariants}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-100 px-5 pb-5 pt-4 dark:border-slate-700/50">
                        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Subtle bottom decoration */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600"
      />
    </div>
  );
}

export default FAQAccordion;
