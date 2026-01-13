"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { employeeTestimonials } from "@/data/employeeTestimonials";

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT 1: CINEMATIC CAROUSEL
// Large-scale slider with dramatic quotes and full-bleed photography
// Editorial magazine aesthetic with bold typography
// ═══════════════════════════════════════════════════════════════════════════

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
};

export default function TestimonialsCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex]
  );

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) =>
      prev === 0 ? employeeTestimonials.length - 1 : prev - 1
    );
  }, []);

  const goToNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % employeeTestimonials.length);
  }, []);

  // Auto-play
  useEffect(() => {
    if (isPaused || !isInView || prefersReducedMotion) return;
    const interval = setInterval(goToNext, 7000);
    return () => clearInterval(interval);
  }, [isPaused, isInView, goToNext, prefersReducedMotion]);

  const currentEmployee = employeeTestimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-slate-950 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Employee testimonials carousel"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Large Quote Mark Watermark */}
      <motion.div
        className="absolute top-20 left-10 text-[20rem] font-serif text-white/[0.02] leading-none select-none pointer-events-none"
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
      >
        "
      </motion.div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">
            Our People
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Voices of Metrosure
          </h2>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentEmployee.id}
              custom={direction}
              variants={prefersReducedMotion ? {} : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
            >
              {/* Image Side */}
              <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden">
                <Image
                  src={currentEmployee.image}
                  alt={currentEmployee.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Name Badge on Image */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                    <p className="text-white font-bold text-lg">
                      {currentEmployee.name}
                    </p>
                    <p className="text-white/70 text-sm">
                      {currentEmployee.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote Side */}
              <div className="lg:py-8">
                <div className="relative">
                  {/* Quote Icon */}
                  <span className="material-symbols-outlined text-primary text-5xl mb-6 block">
                    format_quote
                  </span>

                  {/* Quote Text */}
                  <blockquote className="text-xl md:text-2xl lg:text-3xl text-white font-light leading-relaxed mb-8">
                    "{currentEmployee.quote}"
                  </blockquote>

                  {/* Employee Details */}
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-12 bg-primary rounded-full" />
                    <div>
                      <p className="text-white font-semibold text-lg">
                        {currentEmployee.name}
                      </p>
                      <p className="text-white/60">
                        {currentEmployee.role} · {currentEmployee.tenure}
                      </p>
                      {currentEmployee.location && (
                        <p className="text-white/40 text-sm mt-1">
                          {currentEmployee.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            {/* Dots */}
            <div className="flex gap-2">
              {employeeTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-primary w-8"
                      : "bg-white/20 w-2 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <motion.button
                onClick={goToPrevious}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous testimonial"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </motion.button>
              <motion.button
                onClick={goToNext}
                className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next testimonial"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
