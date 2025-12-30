"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Job } from "@/data/jobs";

interface JobDetailContentProps {
  job: Job;
}

interface InfoColumnProps {
  icon: string;
  iconColor: string;
  title: string;
  items: string[];
  delay: number;
}

function InfoColumn({ icon, iconColor, title, items, delay }: InfoColumnProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="bg-[rgb(var(--color-surface))] rounded-2xl p-6 sm:p-8 border border-[rgb(var(--color-border-light))] hover:border-primary/20 transition-colors h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconColor}`}
        >
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
        <h3 className="text-lg font-bold text-[rgb(var(--color-text-main))]">
          {title}
        </h3>
      </div>

      {/* Items */}
      <ul className="space-y-4">
        {items.map((item, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: delay + 0.1 + i * 0.08 }}
          >
            <span className="material-symbols-outlined text-primary text-lg mt-0.5 flex-shrink-0">
              check_circle
            </span>
            <span className="text-[rgb(var(--color-text-body))] leading-relaxed">
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function JobDetailContent({ job }: JobDetailContentProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 bg-[rgb(var(--color-surface-card))] transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Position Details
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-[rgb(var(--color-text-main))] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            What You&apos;ll <span className="text-primary">Do</span> &{" "}
            <span className="text-primary">Need</span>
          </motion.h2>

          <motion.p
            className="text-lg text-[rgb(var(--color-text-body))] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Here&apos;s everything you need to know about this role and what
            we&apos;re looking for in our ideal candidate.
          </motion.p>
        </motion.div>

        {/* Three-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoColumn
            icon="task_alt"
            iconColor="bg-primary/10 text-primary"
            title="Key Responsibilities"
            items={job.responsibilities}
            delay={0.2}
          />

          <InfoColumn
            icon="person_check"
            iconColor="bg-blue-500/10 text-blue-600 dark:text-blue-400"
            title="Requirements"
            items={job.requirements}
            delay={0.3}
          />

          <InfoColumn
            icon="redeem"
            iconColor="bg-green-500/10 text-green-600 dark:text-green-400"
            title="What We Offer"
            items={job.offers}
            delay={0.4}
          />
        </div>

        {/* Call to action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 sm:p-12 border border-primary/10">
            <h3 className="text-2xl sm:text-3xl font-bold text-[rgb(var(--color-text-main))] mb-4">
              Ready to Make an Impact?
            </h3>
            <p className="text-[rgb(var(--color-text-body))] mb-8 max-w-xl mx-auto">
              Join a team that values growth, supports your development, and
              rewards your success. Apply now and start your journey with
              Metrosure.
            </p>
            <motion.a
              href="#apply"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/25"
              whileHover={{
                scale: 1.02,
                y: -2,
                boxShadow: "0 20px 40px -10px rgba(191, 6, 3, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Apply for This Position</span>
              <span className="material-symbols-outlined">arrow_downward</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
