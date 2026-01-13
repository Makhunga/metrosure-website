"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// TESTIMONIALS MINIMAL
// Refined elegance with focus on typography and generous whitespace
// Giant quotation marks, centred layout, fraction counter navigation
// ═══════════════════════════════════════════════════════════════════════════

interface Testimonial {
  text: string;
  name: string;
  role: string;
  isPartner: boolean;
}

const testimonialsData: Testimonial[] = [
  {
    text: "When my car was hijacked in Joburg, Metrosure handled everything before I could even stress. It wasn't just about the payout, it was knowing someone had my back.",
    name: "Thabo Molefe",
    role: "Home & Auto",
    isPartner: false,
  },
  {
    text: "Partnering with Metrosure was the best decision for our stores. They brought trained staff, handled everything, and we've seen a 30% boost in foot traffic.",
    name: "Lerato Mokoena",
    role: "Retail Partner",
    isPartner: true,
  },
  {
    text: "I never understood my life insurance policy until I sat down with Metrosure. Now I feel genuinely confident about my family's future.",
    name: "Sipho Mthembu",
    role: "Life Insurance",
    isPartner: false,
  },
  {
    text: "We've created 15 jobs in our community through this partnership. Metrosure handles compliance and training - we just provide the space. Win-win.",
    name: "Ahmed Patel",
    role: "Retail Partner",
    isPartner: true,
  },
  {
    text: "The funeral cover gave us peace of mind during the hardest time of our lives. They handled everything with dignity and speed.",
    name: "Nomsa Dlamini",
    role: "Funeral Cover",
    isPartner: false,
  },
];

// Avatar gradient palette
const avatarGradients = [
  "from-rose-500 to-orange-400",
  "from-violet-500 to-purple-500",
  "from-cyan-500 to-blue-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-yellow-500",
];

// Animation variants
const quoteVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function TestimonialsMinimal() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  }, []);

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused || !isInView || prefersReducedMotion) return;
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [isPaused, isInView, goToNext, prefersReducedMotion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInView) return;
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isInView, goToPrevious, goToNext]);

  const current = testimonialsData[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 lg:py-48 bg-white dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Customer testimonials"
    >
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Giant Opening Quote Mark */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-[200px] md:text-[280px] font-serif text-slate-100 dark:text-white/[0.03] leading-none select-none pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          aria-hidden="true"
        >
          &ldquo;
        </motion.div>

        {/* Testimonial Content */}
        <div className="relative z-10 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={prefersReducedMotion ? {} : quoteVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Quote Text */}
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-slate-800 dark:text-white/90 mb-12">
                {current.text}
              </blockquote>

              {/* Author Section */}
              <div className="flex flex-col items-center gap-4">
                {/* Avatar */}
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                    avatarGradients[activeIndex % avatarGradients.length]
                  } flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                >
                  {current.name.charAt(0)}
                </div>

                {/* Name & Role */}
                <div className="text-center">
                  <p className="font-semibold text-slate-900 dark:text-white text-lg">
                    {current.name}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center justify-center gap-2">
                    {current.isPartner && (
                      <span className="material-symbols-outlined text-primary text-sm">
                        storefront
                      </span>
                    )}
                    {current.role}
                  </p>
                </div>

                {/* 5 Stars */}
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-amber-400 text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Giant Closing Quote Mark */}
        <motion.div
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-[200px] md:text-[280px] font-serif text-slate-100 dark:text-white/[0.03] leading-none select-none pointer-events-none rotate-180"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          aria-hidden="true"
        >
          &ldquo;
        </motion.div>

        {/* Navigation: Fraction Counter with Arrows */}
        <div className="flex justify-center items-center gap-8 mt-16">
          {/* Previous Arrow */}
          <motion.button
            onClick={goToPrevious}
            className="text-slate-400 hover:text-primary transition-colors"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous testimonial"
          >
            <span className="material-symbols-outlined text-2xl">
              chevron_left
            </span>
          </motion.button>

          {/* Fraction Counter */}
          <div className="text-slate-500 dark:text-slate-400 font-mono text-sm tracking-widest">
            <span className="text-primary font-bold text-lg">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="mx-2">/</span>
            <span>{String(testimonialsData.length).padStart(2, "0")}</span>
          </div>

          {/* Next Arrow */}
          <motion.button
            onClick={goToNext}
            className="text-slate-400 hover:text-primary transition-colors"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next testimonial"
          >
            <span className="material-symbols-outlined text-2xl">
              chevron_right
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
