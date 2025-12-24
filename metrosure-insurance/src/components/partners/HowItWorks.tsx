"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "We assess your retail environment, understand your customer base, and identify the best partnership model for your business.",
    icon: "handshake",
    details: ["Site assessment", "Customer profiling", "Revenue projections"]
  },
  {
    number: "02",
    title: "Partnership Agreement",
    description: "We create custom terms tailored to your needs — from commission structures to operational requirements.",
    icon: "description",
    details: ["Custom terms", "Commission structure", "Legal framework"]
  },
  {
    number: "03",
    title: "Staff Deployment",
    description: "Our trained sales teams arrive at your location, fully equipped with marketing materials and product knowledge.",
    icon: "groups",
    details: ["Trained personnel", "Marketing materials", "Product training"]
  },
  {
    number: "04",
    title: "Launch & Support",
    description: "We launch your campaign with ongoing support, performance monitoring, and continuous optimization.",
    icon: "rocket_launch",
    details: ["Campaign launch", "Performance tracking", "Continuous support"]
  }
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="relative py-24 bg-[rgb(var(--color-surface-card))] transition-colors duration-300"
    >
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
            The Process
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            From Inquiry to Launch in 4 Steps
          </motion.h2>
          <motion.p
            className="text-xl text-[rgb(var(--color-text-body))] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            We handle the complexity so you can focus on your business.
            Our streamlined process gets you up and running quickly.
          </motion.p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 z-0" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                className="relative"
              >
                {/* Mobile Connection Line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary/20" />
                )}

                <div className="group">
                  {/* Step Number Circle */}
                  <motion.div
                    className="relative w-16 h-16 mx-auto lg:mx-0 mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="absolute inset-0 bg-primary rounded-2xl transform rotate-45 group-hover:rotate-[50deg] transition-transform duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-2xl transform -rotate-0">
                        {step.icon}
                      </span>
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-[rgb(var(--color-surface-card))] border-2 border-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{step.number}</span>
                    </div>
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    className="p-6 rounded-2xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] group-hover:border-primary/30 group-hover:shadow-lg transition-all duration-300 text-center lg:text-left"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[rgb(var(--color-text-body))] mb-4 text-sm leading-relaxed">
                      {step.description}
                    </p>
                    {/* Detail Tags */}
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                      {step.details.map((detail, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-medium"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Arrow to Next Step - Desktop */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-6 -right-4 z-20"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.15 }}
                  >
                    <span className="material-symbols-outlined text-primary text-2xl">
                      arrow_forward
                    </span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <p className="text-[rgb(var(--color-text-muted))] mb-4">
            Ready to start the process?
          </p>
          <motion.a
            href="#partner-inquiry"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Start Your Partnership Journey</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
