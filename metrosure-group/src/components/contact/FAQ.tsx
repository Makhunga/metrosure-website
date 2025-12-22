"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  isInView: boolean;
}

function FAQItem({ question, answer, index, isInView }: FAQItemProps) {
  return (
    <motion.details
      className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-md open:border-l-4 open:border-l-primary open:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
    >
      <summary className="flex justify-between items-center w-full p-6 text-left cursor-pointer list-none select-none group-hover:bg-slate-50 dark:group-hover:bg-slate-700/50 group-open:bg-transparent transition-colors">
        <span className="font-semibold text-lg text-slate-900 dark:text-white group-hover:text-primary group-open:text-primary transition-colors pr-8">
          {question}
        </span>
        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover:bg-primary/10 group-open:bg-primary transition-all duration-300 shrink-0">
          <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 group-hover:text-primary group-open:text-white text-xl transition-transform duration-300 group-open:rotate-180">
            expand_more
          </span>
        </div>
      </summary>
      <div className="px-6 pb-6 pt-2 text-slate-600 dark:text-slate-300 text-base leading-relaxed border-t border-slate-100 dark:border-slate-700">
        <p dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </motion.details>
  );
}

const faqData = [
  {
    question: "How do I report a claim?",
    answer:
      'Contact your dedicated portfolio manager directly, or call our head office at <strong class="text-slate-900 dark:text-white">+27 31 301 1192</strong>. Our claims team will guide you through the process and keep you updated every step of the way.',
  },
  {
    question: "What insurance companies do you work with?",
    answer:
      "We partner with over 30 leading South African insurers including Liberty, Sanlam, Discovery, Old Mutual, Momentum, Hollard, and more. This allows us to shop around and find the best cover and rates for your specific needs.",
  },
  {
    question: "Do I get a dedicated person to help me?",
    answer:
      "Yes! Every client gets a dedicated portfolio manager who knows your policies inside out. You're not passed around between call centres — you'll have a real person who knows your name and your needs.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "We have offices across South Africa — Durban (head office), Johannesburg, Pretoria, Pietermaritzburg, Bloemfontein, Vaal, Randburg, Germiston, and Boksburg. Wherever you are in SA, we can help.",
  },
  {
    question: "Is Metrosure a registered financial services provider?",
    answer:
      'Yes, Metrosure Insurance Brokers (Pty) Ltd is an Authorised Financial Service Provider regulated by the FSCA. Our FSP number is <strong class="text-slate-900 dark:text-white">47089</strong>.',
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-24">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl font-bold text-slate-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Find quick answers to common questions about our policies, claims process, and support
          services before reaching out.
        </motion.p>
      </motion.div>

      {/* FAQ Items */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((item, index) => (
          <FAQItem key={index} {...item} index={index} isInView={isInView} />
        ))}
      </div>
    </div>
  );
}
