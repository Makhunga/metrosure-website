"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { employeeTestimonials } from "@/data/employeeTestimonials";

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT 4: FEATURED SPOTLIGHT
// One large featured testimonial with supporting thumbnails
// Click to switch featured employee - interactive storytelling
// ═══════════════════════════════════════════════════════════════════════════

export default function TestimonialsFeatured() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(employeeTestimonials[0].id);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const activeEmployee = employeeTestimonials.find((e) => e.id === activeId)!;

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white dark:bg-slate-950 overflow-hidden"
      aria-labelledby="testimonials-featured-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23BF0603' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="inline-block text-primary text-sm font-bold uppercase tracking-[0.2em] mb-3">
                Employee Spotlight
              </span>
              <h2
                id="testimonials-featured-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--color-text-main))]"
              >
                Faces of Success
              </h2>
            </div>
            <p className="text-lg text-[rgb(var(--color-text-body))] max-w-md">
              Click on any team member to hear their story
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Featured Employee - Large Card */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative bg-slate-900 rounded-3xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEmployee.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={activeEmployee.image}
                      alt={activeEmployee.name}
                      fill
                      className="object-cover"
                      sizes="60vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    {/* Quote */}
                    <motion.blockquote
                      className="text-lg md:text-xl lg:text-2xl text-white font-light leading-relaxed mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      "{activeEmployee.quote}"
                    </motion.blockquote>

                    {/* Employee Details */}
                    <motion.div
                      className="flex flex-wrap items-center gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-10 bg-primary rounded-full" />
                        <div>
                          <p className="text-white font-bold text-lg">
                            {activeEmployee.name}
                          </p>
                          <p className="text-white/60">
                            {activeEmployee.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 ml-auto">
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/10">
                          {activeEmployee.tenure}
                        </span>
                        {activeEmployee.location && (
                          <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/10 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">
                              location_on
                            </span>
                            {activeEmployee.location}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Thumbnail Grid */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="grid grid-cols-3 lg:grid-cols-2 gap-4">
              {employeeTestimonials.map((employee) => (
                <motion.button
                  key={employee.id}
                  onClick={() => setActiveId(employee.id)}
                  className={`group relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 ${
                    employee.id === activeId
                      ? "ring-4 ring-primary ring-offset-4 ring-offset-white dark:ring-offset-slate-950"
                      : "hover:ring-2 hover:ring-primary/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`View testimonial from ${employee.name}`}
                  aria-pressed={employee.id === activeId}
                >
                  <Image
                    src={employee.image}
                    alt={employee.name}
                    fill
                    className={`object-cover transition-all duration-300 ${
                      employee.id === activeId
                        ? "grayscale-0"
                        : "grayscale group-hover:grayscale-0"
                    }`}
                    sizes="(max-width: 1024px) 33vw, 20vw"
                  />

                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      employee.id === activeId
                        ? "bg-primary/20"
                        : "bg-slate-900/40 group-hover:bg-slate-900/20"
                    }`}
                  />

                  {/* Name Tag */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-900/90 to-transparent">
                    <p className="text-white text-sm font-medium truncate">
                      {employee.name.split(" ")[0]}
                    </p>
                    <p className="text-white/60 text-xs truncate">
                      {employee.department}
                    </p>
                  </div>

                  {/* Active Indicator */}
                  {employee.id === activeId && (
                    <motion.div
                      className="absolute top-3 right-3 w-3 h-3 bg-primary rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Navigation Hint */}
            <p className="mt-6 text-center text-sm text-[rgb(var(--color-text-muted))]">
              <span className="material-symbols-outlined text-base align-middle mr-1">
                touch_app
              </span>
              Tap a photo to read their story
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
