"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// TESTIMONIALS SPLIT SCREEN
// Dramatic 50/50 split layout with large photo and elegant quote typography
// ═══════════════════════════════════════════════════════════════════════════

interface Testimonial {
  text: string;
  name: string;
  role: string;
  isPartner: boolean;
  image: string;
}

const testimonialsData: Testimonial[] = [
  {
    text: "When my car was hijacked in Joburg, Metrosure handled everything before I could even stress. It wasn't just about the payout, it was knowing someone had my back.",
    name: "Thabo Molefe",
    role: "Home & Auto",
    isPartner: false,
    image: "/images/team-fp-tshabalala.jpg",
  },
  {
    text: "Partnering with Metrosure was the best decision for our stores. They brought trained staff, handled everything, and we've seen a 30% boost in foot traffic.",
    name: "Lerato Mokoena",
    role: "Retail Partner",
    isPartner: true,
    image: "/images/mission-image.jpg",
  },
  {
    text: "I never understood my life insurance policy until I sat down with Metrosure. Now I feel genuinely confident about my family's future.",
    name: "Sipho Mthembu",
    role: "Life Insurance",
    isPartner: false,
    image: "/images/about-hero.jpg",
  },
  {
    text: "We've created 15 jobs in our community through this partnership. Metrosure handles compliance and training - we just provide the space.",
    name: "Ahmed Patel",
    role: "Retail Partner",
    isPartner: true,
    image: "/images/family-hero-2.webp",
  },
  {
    text: "The funeral cover gave us peace of mind during the hardest time of our lives. They handled everything with dignity and speed.",
    name: "Nomsa Dlamini",
    role: "Funeral Cover",
    isPartner: false,
    image: "/images/team-formal-uniforms.jpg",
  },
];

// Animation variants
const imageVariants = {
  enter: { opacity: 0, scale: 1.1 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

const quoteVariants = {
  enter: { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export default function TestimonialsSplitScreen() {
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
      className="relative bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Customer testimonials"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
        {/* Left: Large Photo */}
        <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex + "-image"}
              variants={prefersReducedMotion ? {} : imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={current.image}
                alt={`${current.name} testimonial`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={activeIndex === 0}
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows on Image */}
          <div className="absolute bottom-8 left-8 flex gap-3 z-10">
            <motion.button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </motion.button>
            <motion.button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </motion.button>
          </div>

          {/* Slide Counter */}
          <div className="absolute bottom-8 right-8 text-white/80 text-sm font-medium z-10">
            <span className="text-white text-lg font-bold">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="mx-1">/</span>
            <span>{String(testimonialsData.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Right: Quote Content */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 xl:p-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex + "-quote"}
              variants={prefersReducedMotion ? {} : quoteVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Large Opening Quote Mark */}
              <span
                className="block text-8xl md:text-9xl font-serif text-primary/20 dark:text-primary/30 leading-none -mb-8 -ml-2"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Quote Text */}
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif leading-snug text-slate-800 dark:text-white mb-10">
                {current.text}
              </blockquote>

              {/* Divider Line */}
              <div className="w-16 h-1 bg-primary rounded-full mb-8" />

              {/* Author Info */}
              <div className="flex items-center gap-4">
                {/* Avatar Circle */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-xl uppercase tracking-wide">
                    {current.name}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      {current.role}
                    </p>
                    <span className="text-slate-300 dark:text-slate-600">|</span>
                    {/* 5 Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-amber-400 text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
