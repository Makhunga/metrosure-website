"use client";

import { motion } from "framer-motion";
import { HoverCard } from "@/components/animations";
import { partnerServices } from "@/data/partnerServices";

export default function ValueProposition() {
  return (
    <section className="relative py-24 section-warm transition-colors duration-300 overflow-hidden">
      {/* Decorative watermark - left aligned like "THE TEAM" on About page */}
      <motion.div
        className="absolute left-2 md:left-6 lg:left-12 top-6 md:top-8 text-9xl font-black text-slate-100 dark:text-white/5 select-none z-0 whitespace-nowrap pointer-events-none uppercase"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Partnership Models
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3 }}
          >
            Six Ways We Partner With Retailers
          </motion.h2>
          <motion.p
            className="text-xl text-[rgb(var(--color-text-body))] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.4 }}
          >
            Flexible partnership models designed for your business. From in-store campaigns to call centre
            services, choose what works best for your retail environment.
          </motion.p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partnerServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
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
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
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

        {/* Corporate Solutions Mention */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-[rgb(var(--color-text-body))] mb-4">
            Looking for corporate employee benefits solutions? We also offer Group Medical Aid,
            Group Retirement Funds, and Employee Benefits packages.
          </p>
          <a
            href="/corporate"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Explore our corporate solutions
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
