"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const benefits = [
  {
    icon: "trending_up",
    title: "Additional Revenue Stream",
    description: "Earn commission on every insurance product sold in your store. Our partners see significant additional income without any upfront investment.",
  },
  {
    icon: "groups",
    title: "Increased Foot Traffic",
    description: "Insurance campaigns drive customers to your store. People come for insurance and stay to shop, boosting your overall sales.",
  },
  {
    icon: "account_balance_wallet",
    title: "Zero Overhead Costs",
    description: "We handle staffing, training, compliance, and marketing materials. You provide the space; we bring everything else.",
  },
  {
    icon: "verified",
    title: "Brand Enhancement",
    description: "Offer financial services to your customers under a licensed provider. Enhance your store's reputation as a one-stop destination.",
  },
  {
    icon: "volunteer_activism",
    title: "Community Impact",
    description: "Every partnership creates local jobs. You're not just earning revenue, you're contributing to employment in your community.",
  },
  {
    icon: "shield",
    title: "Compliance Handled",
    description: "We're an FSP-licensed provider (47089). All regulatory requirements, compliance, and auditing are our responsibility, not yours.",
  }
];

export default function PartnerBenefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-24 bg-[rgb(var(--color-surface))] transition-colors duration-300">
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
            Why Partner With Us
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Benefits That Impact Your Bottom Line
          </motion.h2>
          <motion.p
            className="text-xl text-[rgb(var(--color-text-body))] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            Our partnership model is designed to maximize value for your business
            while making a positive impact on your community.
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <motion.div
                className="relative h-full p-8 rounded-2xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-transparent transition-all duration-300 overflow-hidden"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/3 group-hover:to-transparent transition-all duration-300" />

                {/* Icon */}
                <motion.div
                  className="relative w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="material-symbols-outlined text-primary group-hover:text-white text-2xl transition-colors duration-300">
                    {benefit.icon}
                  </span>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-[rgb(var(--color-text-body))] leading-relaxed">
                  {benefit.description}
                </p>

                {/* Decorative Corner */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-primary opacity-0 group-hover:opacity-5 blur-2xl transition-all duration-500" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Bar - Matching Home Page Style */}
        <motion.div
          className="mt-16 bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
        >
          {/* Decorative Blurs */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-80 h-80 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tight text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Ready to Transform Your Retail Space?
            </motion.h2>
            <motion.p
              className="text-xl text-white/90 max-w-2xl font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Join over 100 retail partners who are already earning additional revenue
              and creating jobs in their communities.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <motion.a
                href="#partner-inquiry"
                className="bg-white text-primary text-lg font-bold py-4 px-10 rounded-lg shadow-xl flex items-center justify-center"
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Start Your Partnership
              </motion.a>
            </motion.div>

            <motion.p
              className="text-sm text-white/70 mt-2 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <motion.span
                className="material-symbols-outlined text-sm"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                lock
              </motion.span>
              Secure & Confidential. No spam.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
