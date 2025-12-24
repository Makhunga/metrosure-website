"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const benefits = [
  {
    icon: "trending_up",
    title: "Additional Revenue Stream",
    description: "Earn commission on every insurance product sold in your store. Our partners see significant additional income without any upfront investment.",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: "groups",
    title: "Increased Foot Traffic",
    description: "Insurance campaigns drive customers to your store. People come for insurance and stay to shop — boosting your overall sales.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: "account_balance_wallet",
    title: "Zero Overhead Costs",
    description: "We handle staffing, training, compliance, and marketing materials. You provide the space; we bring everything else.",
    color: "from-amber-500 to-orange-600"
  },
  {
    icon: "verified",
    title: "Brand Enhancement",
    description: "Offer financial services to your customers under a licensed provider. Enhance your store's reputation as a one-stop destination.",
    color: "from-purple-500 to-violet-600"
  },
  {
    icon: "volunteer_activism",
    title: "Community Impact",
    description: "Every partnership creates local jobs. You're not just earning revenue — you're contributing to employment in your community.",
    color: "from-rose-500 to-pink-600"
  },
  {
    icon: "shield",
    title: "Compliance Handled",
    description: "We're an FSP-licensed provider (47089). All regulatory requirements, compliance, and auditing are our responsibility — not yours.",
    color: "from-cyan-500 to-sky-600"
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
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />

                {/* Icon with Gradient Background */}
                <motion.div
                  className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="material-symbols-outlined text-white text-2xl">
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
                <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 blur-2xl transition-all duration-500`} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <motion.div
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary to-[rgb(var(--color-secondary))] text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%221%22%20fill%3D%22%23ffffff%22%2F%3E%3C%2Fsvg%3E')]" />
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Retail Space?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Join over 100 retail partners who are already earning additional revenue
              and creating jobs in their communities.
            </p>
            <motion.a
              href="#partner-inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Start Your Partnership</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
