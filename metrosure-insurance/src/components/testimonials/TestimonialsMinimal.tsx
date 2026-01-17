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

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

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
      className="relative py-32 md:py-48 bg-gray-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Customer testimonials"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

          {/* Left: Static Header & Navigation (Swiss Style) */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full min-h-[300px]">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-12 h-[2px] bg-primary" />
                <span className="text-sm font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400">
                  Client Stories
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                Real feedback from real people.
              </h2>

              <div className="flex gap-2 text-primary">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation Buttons (Bottom Left) */}
            <div className="hidden lg:flex gap-4 mt-auto">
              <button
                onClick={goToPrevious}
                className="w-16 h-16 border border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all duration-300"
              >
                <span className="material-symbols-outlined text-2xl">arrow_back</span>
              </button>
              <button
                onClick={goToNext}
                className="w-16 h-16 border border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all duration-300"
              >
                <span className="material-symbols-outlined text-2xl">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right: Active Testimonial Card */}
          <div className="lg:col-span-8 relative">
            <div className="bg-white dark:bg-slate-800 p-8 md:p-12 lg:p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-black/20 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                <span className="material-symbols-outlined text-[300px] leading-none text-black dark:text-white">format_quote</span>
              </div>

              <div className="relative z-10 min-h-[300px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-primary font-mono text-sm tracking-wider">
                        0{activeIndex + 1} / 0{testimonialsData.length}
                      </span>
                      <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-700" />
                      <span className="text-slate-400 dark:text-slate-500 font-mono text-xs uppercase">
                        Verified Client
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-800 dark:text-slate-100 mb-10">
                      &ldquo;{current.text}&rdquo;
                    </h3>

                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarGradients[activeIndex % avatarGradients.length]} flex items-center justify-center text-white font-bold shadow-md`}>
                        {getInitials(current.name)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{current.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{current.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Nav */}
            <div className="flex lg:hidden justify-center gap-4 mt-8">
              <button onClick={goToPrevious} className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-md"><span className="material-symbols-outlined">arrow_back</span></button>
              <button onClick={goToNext} className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-md"><span className="material-symbols-outlined">arrow_forward</span></button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
