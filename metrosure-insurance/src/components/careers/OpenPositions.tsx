"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

interface Job {
  id: string;
  title: string;
  department: string;
  category: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  offers: string[];
}

const jobs: Job[] = [
  {
    id: "sales-consultant",
    title: "Insurance Sales Consultant",
    department: "Sales",
    category: "sales",
    location: "All Provinces",
    type: "Full-time",
    description:
      "Join our sales team and help South Africans protect what matters most. Build relationships, provide advice, and earn competitive commissions.",
    responsibilities: [
      "Engage with potential clients and explain insurance products",
      "Build and maintain strong customer relationships",
      "Achieve monthly and quarterly sales targets",
      "Provide exceptional after-sales support",
    ],
    requirements: [
      "Matric certificate (Grade 12)",
      "Strong communication and interpersonal skills",
      "Sales experience preferred but not required",
      "Valid driver's license is an advantage",
    ],
    offers: [
      "Competitive base salary + uncapped commission",
      "Full product training provided",
      "Career growth opportunities",
      "Supportive team environment",
    ],
  },
  {
    id: "call-centre-agent",
    title: "Call Centre Agent",
    department: "Customer Service",
    category: "call-centre",
    location: "KwaZulu-Natal",
    type: "Full-time",
    description:
      "Be the friendly voice of Metrosure. Handle customer inquiries, process requests, and ensure every client feels valued and heard.",
    responsibilities: [
      "Answer inbound calls and assist customers professionally",
      "Process policy queries and update customer information",
      "Resolve customer complaints with empathy and efficiency",
      "Meet call quality and productivity targets",
    ],
    requirements: [
      "Matric certificate (Grade 12)",
      "Excellent verbal communication skills",
      "Basic computer literacy",
      "Ability to work in a fast-paced environment",
    ],
    offers: [
      "Competitive salary with performance bonuses",
      "Comprehensive training program",
      "Medical aid contributions",
      "Opportunities for advancement",
    ],
  },
  {
    id: "telesales-rep",
    title: "Telesales Representative",
    department: "Sales",
    category: "sales",
    location: "Gauteng",
    type: "Full-time",
    description:
      "Drive sales through outbound calling. Connect with potential customers, present insurance solutions, and close deals over the phone.",
    responsibilities: [
      "Make outbound calls to potential customers",
      "Present and sell insurance products effectively",
      "Follow up on leads and convert them to sales",
      "Maintain accurate records of all interactions",
    ],
    requirements: [
      "Matric certificate (Grade 12)",
      "Persuasive communication skills",
      "Target-driven mindset",
      "Previous telesales experience is a plus",
    ],
    offers: [
      "Base salary + attractive commission structure",
      "Weekly and monthly incentives",
      "Training and coaching support",
      "Clear career progression path",
    ],
  },
  {
    id: "client-service-admin",
    title: "Client Service Administrator",
    department: "Operations",
    category: "admin",
    location: "Gauteng",
    type: "Full-time",
    description:
      "Keep our operations running smoothly. Manage policy documentation, process applications, and support our sales and service teams.",
    responsibilities: [
      "Process new policy applications accurately",
      "Maintain and update client records",
      "Coordinate between departments for smooth service delivery",
      "Handle administrative queries from clients and staff",
    ],
    requirements: [
      "Matric certificate with good grades",
      "Strong attention to detail",
      "Proficiency in Microsoft Office",
      "Organizational skills and ability to multitask",
    ],
    offers: [
      "Competitive salary",
      "Stable office environment",
      "Professional development opportunities",
      "Team-oriented culture",
    ],
  },
  {
    id: "trainee-sales",
    title: "Trainee Sales Agent",
    department: "Sales",
    category: "sales",
    location: "All Provinces",
    type: "Full-time",
    description:
      "Start your insurance career with us. No experience needed, we'll teach you everything. Perfect for motivated individuals ready to learn and grow.",
    responsibilities: [
      "Complete our comprehensive training program",
      "Shadow experienced sales consultants",
      "Learn insurance products and sales techniques",
      "Gradually take on sales responsibilities",
    ],
    requirements: [
      "Matric certificate (Grade 12)",
      "Eagerness to learn and grow",
      "Positive attitude and strong work ethic",
      "Good communication skills",
    ],
    offers: [
      "Paid training program",
      "Mentorship from top performers",
      "Fast-track to full sales consultant role",
      "No experience necessary",
    ],
  },
];

const categories = [
  { id: "all", label: "All Positions" },
  { id: "sales", label: "Sales" },
  { id: "call-centre", label: "Call Centre" },
  { id: "admin", label: "Administration" },
];

interface OpenPositionsProps {
  onApplyClick: (position: string) => void;
}

export default function OpenPositions({ onApplyClick }: OpenPositionsProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const filteredJobs =
    activeCategory === "all"
      ? jobs
      : jobs.filter((job) => job.category === activeCategory);

  const toggleExpand = (jobId: string) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  return (
    <section
      ref={sectionRef}
      id="open-positions"
      className="py-24 bg-[rgb(var(--color-surface-card))]/80 backdrop-blur-sm relative z-10"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Current Opportunities
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Find Your <span className="text-primary">Role</span>
          </motion.h2>

          <motion.p
            className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We&apos;re always looking for talented people in sales and customer
            service. Find the perfect role for you below.
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-body))] border border-[rgb(var(--color-border-light))] hover:border-primary/30"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Job Listings */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-[rgb(var(--color-surface))] rounded-2xl border border-[rgb(var(--color-border-light))] overflow-hidden hover:border-primary/30 transition-colors"
              >
                {/* Job Header (Always Visible) */}
                <motion.div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleExpand(job.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          <span className="material-symbols-outlined text-sm">
                            work
                          </span>
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
                      <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-2">
                        {job.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[rgb(var(--color-text-body))] text-sm">
                        {job.description}
                      </p>
                    </div>

                    {/* Expand Button */}
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <span className="text-sm hidden sm:inline">
                        {expandedJob === job.id ? "Less" : "More"}
                      </span>
                      <motion.span
                        className="material-symbols-outlined"
                        animate={{ rotate: expandedJob === job.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        expand_more
                      </motion.span>
                    </div>
                  </div>
                </motion.div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedJob === job.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-[rgb(var(--color-border-light))]">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                          {/* Responsibilities */}
                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-[rgb(var(--color-text-muted))] mb-3 flex items-center gap-2">
                              <span className="material-symbols-outlined text-primary text-lg">
                                task_alt
                              </span>
                              Key Responsibilities
                            </h4>
                            <ul className="space-y-2">
                              {job.responsibilities.map((item, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-[rgb(var(--color-text-body))]"
                                >
                                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">
                                    check
                                  </span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Requirements */}
                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-[rgb(var(--color-text-muted))] mb-3 flex items-center gap-2">
                              <span className="material-symbols-outlined text-primary text-lg">
                                person_check
                              </span>
                              Requirements
                            </h4>
                            <ul className="space-y-2">
                              {job.requirements.map((item, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-[rgb(var(--color-text-body))]"
                                >
                                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">
                                    check
                                  </span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* What We Offer */}
                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-[rgb(var(--color-text-muted))] mb-3 flex items-center gap-2">
                              <span className="material-symbols-outlined text-primary text-lg">
                                redeem
                              </span>
                              What We Offer
                            </h4>
                            <ul className="space-y-2">
                              {job.offers.map((item, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-[rgb(var(--color-text-body))]"
                                >
                                  <span className="material-symbols-outlined text-green-500 text-sm mt-0.5">
                                    check_circle
                                  </span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Apply Button */}
                        <div className="mt-6 pt-4 border-t border-[rgb(var(--color-border-light))]">
                          <motion.button
                            onClick={() => onApplyClick(job.title)}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span>Apply for This Role</span>
                            <span className="material-symbols-outlined">
                              arrow_forward
                            </span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="material-symbols-outlined text-6xl text-[rgb(var(--color-text-muted))] mb-4">
              search_off
            </span>
            <p className="text-[rgb(var(--color-text-body))]">
              No positions found in this category. Check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
