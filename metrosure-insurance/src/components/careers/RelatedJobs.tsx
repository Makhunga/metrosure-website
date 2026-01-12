"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Job, getRelatedJobs, getAllJobs } from "@/data/jobs";

interface RelatedJobsProps {
  currentJob: Job;
}

interface JobCardMiniProps {
  job: Job;
}

function JobCardMini({ job }: JobCardMiniProps) {
  return (
    <div className="flex-shrink-0 w-[300px] sm:w-auto">
      <Link href={`/careers/${job.slug}`} className="block group h-full">
        <div className="h-full bg-[rgb(var(--color-surface))] rounded-2xl p-6 border border-[rgb(var(--color-border-light))] hover:border-primary/30 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <span className="material-symbols-outlined text-xs">work</span>
              {job.department}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium">
              {job.type}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-[rgb(var(--color-text-main))] mb-2 group-hover:text-primary transition-colors">
            {job.title}
          </h3>

          {/* Location */}
          <p className="text-sm text-[rgb(var(--color-text-muted))] flex items-center gap-1 mb-4">
            <span className="material-symbols-outlined text-sm">location_on</span>
            {job.location}
          </p>

          {/* Description */}
          <p className="text-sm text-[rgb(var(--color-text-body))] line-clamp-2 mb-4">
            {job.description}
          </p>

          {/* View link */}
          <div className="flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
            <span>View Position</span>
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function RelatedJobs({ currentJob }: RelatedJobsProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Get related jobs (same category)
  let relatedJobs = getRelatedJobs(currentJob, 3);

  // If not enough related jobs in same category, fill with other jobs
  if (relatedJobs.length < 3) {
    const otherJobs = getAllJobs()
      .filter(
        (j) =>
          j.id !== currentJob.id &&
          !relatedJobs.some((rj) => rj.id === j.id)
      )
      .slice(0, 3 - relatedJobs.length);
    relatedJobs = [...relatedJobs, ...otherJobs];
  }

  if (relatedJobs.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 bg-[rgb(var(--color-surface))] transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header - single animation */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                More Opportunities
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[rgb(var(--color-text-main))]">
              Explore Other <span className="text-primary">Positions</span>
            </h2>
          </div>

          <Link
            href="/careers#open-positions"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            <span>View All Positions</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </motion.div>

        {/* Mobile: Horizontal scroll */}
        <div className="sm:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-4">
            {relatedJobs.map((job) => (
              <JobCardMini key={job.id} job={job} />
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <motion.div
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {relatedJobs.map((job) => (
            <JobCardMini key={job.id} job={job} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
