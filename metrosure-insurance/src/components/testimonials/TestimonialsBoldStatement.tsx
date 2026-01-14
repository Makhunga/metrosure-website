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
      className="relative py-32 md:py-48 bg-[rgb(var(--color-secondary))] dark:bg-[#110005] overflow-hidden transition-colors duration-500"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Customer testimonials"
    >
      {/* Dynamic Background Noise & Texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        {/* Giant Watermark Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
          <span className="text-[15vw] leading-none font-black text-white/[0.03] tracking-tighter whitespace-nowrap">
            VOICES
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

          {/* Photos/Avatars Column */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.6, ease: "circOut" }}
                  className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 border-4 border-white/10 bg-slate-800"
                >
                  {/* Placeholder for real image - using gradient for now */}
                  <div className={`w-full h-full bg-gradient-to-br ${avatarGradients[activeIndex % avatarGradients.length]} flex items-center justify-center`}>
                    <span className="text-8xl font-black text-white/20 select-none">
                      {getInitials(current.name)}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Decorative Frame */}
              <div className="absolute -inset-4 border-2 border-[rgb(var(--color-accent))]/30 rounded-[2.5rem] z-[-1]" />
            </div>

            <div className="mt-8 text-center lg:text-right">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${activeIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-2xl font-bold text-white">{current.name}</h3>
                  <p className="text-[rgb(var(--color-accent))] font-medium mt-1">{current.role}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Quote Column */}
          <div className="lg:col-span-7 lg:pl-12">
            <span className="block text-[rgb(var(--color-accent))] text-6xl font-serif leading-none mb-6 opacity-80">
              &ldquo;
            </span>

            <div className="min-h-[200px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight"
                >
                  {current.text}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 mt-12">
              <button
                onClick={goToPrevious}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[rgb(var(--color-secondary))] transition-colors"
              >
                <span className="material-symbols-outlined">west</span>
              </button>

              <div className="flex gap-3">
                {testimonialsData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 transition-all duration-300 rounded-full ${idx === activeIndex ? 'w-8 bg-[rgb(var(--color-accent))]' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[rgb(var(--color-secondary))] transition-colors"
              >
                <span className="material-symbols-outlined">east</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
