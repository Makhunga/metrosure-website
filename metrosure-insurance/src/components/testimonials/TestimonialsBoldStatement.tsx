"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// TESTIMONIALS BOLD STATEMENT
// Wise-inspired design with large stacked typography and floating card overlay
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

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Animation variants
const cardVariants = {
  enter: { opacity: 0, y: 30, scale: 0.95 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.95 },
};

export default function TestimonialsBoldStatement() {
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
      className="relative py-24 md:py-32 bg-stone-50 dark:bg-slate-900 overflow-hidden transition-colors duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Customer testimonials"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[500px]">
          {/* Left: Bold Stacked Typography */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-1">
              <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-[0.9]">
                Trusted
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-[0.9]">
                By
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-primary leading-[0.9]">
                Thousands
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-[0.9]">
                Of South
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-[0.9]">
                Africans
              </span>
            </div>

            {/* Decorative accent */}
            <motion.div
              className="mt-8 h-2 w-24 bg-primary rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </motion.div>

          {/* Right: Floating Testimonial Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={prefersReducedMotion ? {} : cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/10 dark:shadow-black/30"
              >
                {/* 5-Star Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="material-symbols-outlined text-amber-400 text-2xl"
                      initial={{ opacity: 0, rotate: -30, scale: 0 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      transition={{
                        delay: 0.1 + i * 0.08,
                        type: "spring",
                        stiffness: 200,
                      }}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </motion.span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl leading-relaxed text-slate-700 dark:text-slate-200 mb-8">
                  &ldquo;{current.text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${
                      avatarGradients[activeIndex % avatarGradients.length]
                    } flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                  >
                    {getInitials(current.name)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-lg">
                      {current.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      {current.isPartner && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          storefront
                        </span>
                      )}
                      {current.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-primary w-8"
                      : "bg-slate-300 dark:bg-slate-600 w-3 hover:bg-slate-400 dark:hover:bg-slate-500"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
