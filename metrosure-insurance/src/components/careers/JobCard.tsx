"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Job } from "@/data/jobs";

interface JobCardProps {
  job: Job;
  index: number;
  onQuickApply?: (position: string) => void;
}

export default function JobCard({ job, index, onQuickApply }: JobCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <div className="h-full bg-[rgb(var(--color-surface))] rounded-2xl border border-[rgb(var(--color-border-light))] overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 flex flex-col">
        {/* Card Header with accent bar */}
        <div className="h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

        <div className="p-6 flex flex-col flex-1">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <span className="material-symbols-outlined text-sm">work</span>
              {job.department}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[rgb(var(--color-surface-card))] text-[rgb(var(--color-text-muted))] text-xs font-medium">
              <span className="material-symbols-outlined text-sm">
                location_on
              </span>
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium">
              {job.type}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-3 group-hover:text-primary transition-colors">
            {job.title}
          </h3>

          {/* Description */}
          <p className="text-[rgb(var(--color-text-body))] text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
            {job.description}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4 border-t border-[rgb(var(--color-border-light))]">
            <Link href={`/careers/${job.slug}`} className="flex-1">
              <motion.span
                className="inline-flex items-center justify-center gap-2 w-full h-11 px-5 rounded-xl bg-primary text-white font-semibold text-sm shadow-md shadow-primary/20 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>View Details</span>
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </motion.span>
            </Link>

            {onQuickApply && (
              <motion.button
                onClick={() => onQuickApply(job.title)}
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface-card))] text-[rgb(var(--color-text-main))] font-semibold text-sm hover:border-primary/30 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="material-symbols-outlined text-lg text-primary">
                  bolt
                </span>
                <span>Quick Apply</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
