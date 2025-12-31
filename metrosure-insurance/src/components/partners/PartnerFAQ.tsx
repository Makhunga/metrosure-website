"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { partnerFAQs as faqData } from "@/data/partnerServices";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  isInView: boolean;
}

function FAQItem({ question, answer, index, isInView }: FAQItemProps) {
  return (
    <motion.details
      className="group bg-[rgb(var(--color-surface-card))] rounded-xl border border-[rgb(var(--color-border-light))] overflow-hidden transition-all duration-300 hover:shadow-md open:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
    >
      <summary className="flex justify-between items-center w-full p-6 text-left cursor-pointer list-none select-none group-hover:bg-[rgb(var(--color-surface))] group-open:bg-transparent transition-colors">
        <span className="font-semibold text-lg text-[rgb(var(--color-text-main))] group-hover:text-primary group-open:text-primary transition-colors pr-8">
          {question}
        </span>
        <div className="w-11 h-11 rounded-full bg-[rgb(var(--color-surface))] flex items-center justify-center group-hover:bg-primary/10 group-open:bg-primary transition-all duration-300 shrink-0">
          <span className="material-symbols-outlined text-[rgb(var(--color-text-muted))] group-hover:text-primary group-open:text-white text-xl transition-transform duration-300 group-open:rotate-180">
            expand_more
          </span>
        </div>
      </summary>
      <div className="px-6 pb-6 pt-2 text-[rgb(var(--color-text-body))] text-base leading-relaxed border-t border-[rgb(var(--color-border-light))]">
        <p dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </motion.details>
  );
}

export default function PartnerFAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-24 bg-[rgb(var(--color-surface))] transition-colors duration-300 overflow-hidden">
      {/* Decorative watermark - centered like "HISTORY" on About page */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -top-[2.4rem] text-[12rem] font-black text-slate-100 dark:text-white/5 select-none z-0 whitespace-nowrap pointer-events-none uppercase tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        FAQ
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="text-xl text-[rgb(var(--color-text-body))] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to know about partnering with Metrosure.
            Can&apos;t find your answer? <a href="#partner-inquiry" className="text-primary hover:underline">Contact us directly</a>.
          </motion.p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto items-start">
          {faqData.map((item, index) => (
            <FAQItem key={index} {...item} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Still Have Questions */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-[rgb(var(--color-text-muted))] mb-4">
            Still have questions?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+27313011192"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[rgb(var(--color-border-light))] rounded-xl text-[rgb(var(--color-text-main))] font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-xl">call</span>
              <span>+27 31 301 1192</span>
            </a>
            <a
              href="mailto:clients@metrosuregroup.co.za"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[rgb(var(--color-border-light))] rounded-xl text-[rgb(var(--color-text-main))] font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-xl">mail</span>
              <span>clients@metrosuregroup.co.za</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
