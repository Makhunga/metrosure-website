"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HoverCard } from "@/components/animations";

const services = [
  {
    icon: "campaign",
    title: "In-Store Insurance Campaigns",
    description: "We deploy trained sales representatives directly at your retail locations. Our teams engage customers, explain insurance products, and handle the entire sales process.",
    features: [
      "Dedicated sales teams at your location",
      "Full product training provided",
      "Customer engagement strategies",
      "Performance tracking & reporting"
    ],
    highlight: "Most Popular"
  },
  {
    icon: "groups",
    title: "Outsourced Sales & Marketing",
    description: "Let us handle your insurance sales division entirely. From recruitment to training to performance management, we become your in-house insurance arm.",
    features: [
      "End-to-end sales management",
      "Staff recruitment & training",
      "Marketing collateral provided",
      "Ongoing performance coaching"
    ],
    highlight: null
  },
  {
    icon: "credit_card",
    title: "In-Store Credit Facility",
    description: "Enable your customers to access credit products alongside their purchases. We handle compliance, applications, and disbursements seamlessly.",
    features: [
      "Quick credit assessments",
      "Compliant lending processes",
      "Integration with your POS",
      "Customer support included"
    ],
    highlight: null
  }
];

export default function ValueProposition() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-24 section-warm transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Partnership Models
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Three Ways We Partner With Retailers
          </motion.h2>
          <motion.p
            className="text-xl text-[rgb(var(--color-text-body))] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            Flexible partnership models designed for your business. Choose what works best for your
            retail environment and customer base.
          </motion.p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
            >
              <HoverCard className="h-full" intensity={8}>
                <div className="relative h-full p-8 rounded-2xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-primary/30 transition-all duration-300 hover:shadow-xl group">
                  {/* Highlight Badge */}
                  {service.highlight && (
                    <div className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">
                      {service.highlight}
                    </div>
                  )}

                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <span className="material-symbols-outlined text-primary group-hover:text-white text-3xl transition-colors">
                      {service.icon}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[rgb(var(--color-text-main))] mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[rgb(var(--color-text-body))] mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.15 + i * 0.1 }}
                      >
                        <span className="material-symbols-outlined text-primary text-lg mt-0.5 flex-shrink-0">
                          check_circle
                        </span>
                        <span className="text-[rgb(var(--color-text-body))] text-sm">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Hover Arrow */}
                  <motion.div
                    className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <span className="material-symbols-outlined text-primary text-2xl">
                      arrow_forward
                    </span>
                  </motion.div>
                </div>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
