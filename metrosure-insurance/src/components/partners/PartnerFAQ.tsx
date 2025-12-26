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
      className="group bg-[rgb(var(--color-surface-card))] rounded-xl border border-[rgb(var(--color-border-light))] overflow-hidden transition-all duration-300 hover:shadow-md open:border-l-4 open:border-l-primary open:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
    >
      <summary className="flex justify-between items-center w-full p-6 text-left cursor-pointer list-none select-none group-hover:bg-[rgb(var(--color-surface))] group-open:bg-transparent transition-colors">
        <span className="font-semibold text-lg text-[rgb(var(--color-text-main))] group-hover:text-primary group-open:text-primary transition-colors pr-8">
          {question}
        </span>
        <div className="w-8 h-8 rounded-full bg-[rgb(var(--color-surface))] flex items-center justify-center group-hover:bg-primary/10 group-open:bg-primary transition-all duration-300 shrink-0">
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

const faqData = [
  {
    question: "What types of businesses can partner with Metrosure?",
    answer: "We partner with a wide range of retail businesses including furniture stores, electronics retailers, clothing stores, supermarkets, and more. If you have a retail location with customer foot traffic, we'd love to explore a partnership. The key requirements are adequate space for our sales team and alignment with our values of community impact."
  },
  {
    question: "How does the revenue-sharing model work?",
    answer: "Our commission structure is transparent and competitive. Partners earn a percentage of each insurance product sold at their location. The exact percentage depends on factors like store volume, product mix, and partnership tier. We provide detailed monthly reports showing all sales and commissions. <strong class=\"text-[rgb(var(--color-text-main))]\">Contact us for a personalized quote.</strong>"
  },
  {
    question: "What training do the in-store sales staff receive?",
    answer: "All our sales representatives undergo comprehensive training before deployment. This includes product knowledge (all insurance types we offer), compliance and regulatory requirements, customer service excellence, and sales techniques. Training is ongoing, with regular refresher courses and updates on new products or regulations."
  },
  {
    question: "How long does it take to set up an in-store campaign?",
    answer: "Typical setup takes <strong class=\"text-[rgb(var(--color-text-main))]\">2-4 weeks</strong> from signing the agreement. This includes: Week 1, Agreement finalization and logistics planning; Week 2, Staff selection and training; Week 3, Marketing materials preparation; Week 4, Soft launch and optimization. Larger deployments may take slightly longer."
  },
  {
    question: "What insurance products are offered through in-store campaigns?",
    answer: "We offer a comprehensive range of products tailored to your customer base: <strong class=\"text-[rgb(var(--color-text-main))]\">Credit Life Insurance</strong>, <strong class=\"text-[rgb(var(--color-text-main))]\">Funeral Cover</strong> (individual and group), <strong class=\"text-[rgb(var(--color-text-main))]\">Life Insurance</strong>, and <strong class=\"text-[rgb(var(--color-text-main))]\">Short-term Insurance</strong> (car, home). Product mix is customized based on your store type and customer demographics."
  },
  {
    question: "Is my business responsible for any compliance requirements?",
    answer: "No. As an <strong class=\"text-[rgb(var(--color-text-main))]\">FSP-licensed provider (47089)</strong>, we handle all regulatory compliance, auditing, and reporting requirements. Your business simply provides the space. Our team manages all FAIS requirements, record-keeping, and regulatory submissions. This is one of the key benefits of partnering with a licensed broker."
  },
  {
    question: "Can we customize the campaign for our brand?",
    answer: "Absolutely! We work with you to create a campaign that complements your store's brand and customer experience. This includes co-branded marketing materials, staff uniforms that match your store aesthetic, and messaging that aligns with your brand values. We believe in partnerships that enhance your brand, not overshadow it."
  },
  {
    question: "What support does Metrosure provide after launch?",
    answer: "Ongoing support includes: <strong class=\"text-[rgb(var(--color-text-main))]\">Dedicated Account Manager</strong> for your partnership; <strong class=\"text-[rgb(var(--color-text-main))]\">Monthly Performance Reviews</strong> with optimization recommendations; <strong class=\"text-[rgb(var(--color-text-main))]\">Staff Management</strong> including replacement if needed; <strong class=\"text-[rgb(var(--color-text-main))]\">Marketing Support</strong> for promotions and campaigns; and <strong class=\"text-[rgb(var(--color-text-main))]\">24/7 Claims Support</strong> for your customers."
  }
];

export default function PartnerFAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-24 bg-[rgb(var(--color-surface))] transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Partnership FAQ
          </motion.span>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto">
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
              href="mailto:partnerships@metrosuregroup.co.za"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[rgb(var(--color-border-light))] rounded-xl text-[rgb(var(--color-text-main))] font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-xl">mail</span>
              <span>partnerships@metrosuregroup.co.za</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
