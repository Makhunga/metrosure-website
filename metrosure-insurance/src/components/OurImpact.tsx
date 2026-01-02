"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { impactCards, impactContent } from "@/data/impact";

// ═══════════════════════════════════════════════════════════════════════════
// OUR IMPACT CAROUSEL
// Bold stats showcase inspired by Starbucks impact section
// Deep maroon background with animated stat cards
// ═══════════════════════════════════════════════════════════════════════════

// Animation variants for slide transitions
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

const statVariants = {
  enter: {
    scale: 0.8,
    opacity: 0,
  },
  center: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
      delay: 0.2,
    },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
  },
};

export default function OurImpact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  // Navigation functions
  const goToSlide = useCallback((index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }, [activeIndex]);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) =>
      prev === 0 ? impactCards.length - 1 : prev - 1
    );
  }, []);

  const goToNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % impactCards.length);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused || !isInView || prefersReducedMotion) return;

    const interval = setInterval(() => {
      goToNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, isInView, goToNext, prefersReducedMotion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInView) return;

      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isInView, goToPrevious, goToNext]);

  const currentCard = impactCards[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-36 bg-[rgb(var(--color-secondary))] dark:bg-slate-900 overflow-hidden transition-colors duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-label="Our Impact carousel"
      role="region"
    >
      {/* Background Pattern - Subtle geometric overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-br from-black/10 via-transparent to-black/20"
        aria-hidden="true"
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row: Heading + Supporting Text */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-12 mb-12 md:mb-16 lg:mb-20">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white uppercase tracking-tight leading-none"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {impactContent.heading}
          </motion.h2>

          <motion.p
            className="text-base md:text-lg lg:text-xl text-white/70 max-w-md lg:max-w-sm lg:text-right leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {impactContent.subheading}
          </motion.p>
        </div>

        {/* Carousel Card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-tr-[48px] lg:rounded-tr-[64px] overflow-hidden shadow-2xl shadow-black/30"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${activeIndex + 1} of ${impactCards.length}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] lg:min-h-[380px]">
              {/* Left: Image */}
              <div className="lg:col-span-4 relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentCard.id + "-image"}
                    custom={direction}
                    variants={prefersReducedMotion ? {} : slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentCard.image}
                      alt={currentCard.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      priority={activeIndex === 0}
                    />
                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/5 lg:bg-gradient-to-t lg:from-black/10 lg:via-transparent lg:to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Middle: Title + Read Time */}
              <div className="lg:col-span-5 p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-700/50">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentCard.id + "-content"}
                    custom={direction}
                    variants={prefersReducedMotion ? {} : slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={currentCard.link}
                      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 rounded-lg"
                    >
                      <h3 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-3xl font-bold text-[rgb(var(--color-text-main))] leading-snug mb-4 group-hover:text-primary transition-colors duration-300">
                        {currentCard.title}
                        <motion.span
                          className="inline-flex items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          aria-hidden="true"
                        >
                          <span className="material-symbols-outlined text-primary text-xl">
                            arrow_forward
                          </span>
                        </motion.span>
                      </h3>
                    </Link>

                    <p className="text-xs md:text-sm font-medium uppercase tracking-[0.12em] text-[rgb(var(--color-text-muted))]">
                      {currentCard.readTime} MIN READ
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right: Large Stat */}
              <div className="lg:col-span-3 p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-center items-center lg:items-start bg-slate-50 dark:bg-slate-700/30">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={currentCard.id + "-stat"}
                    variants={prefersReducedMotion ? {} : statVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                    className="text-center lg:text-left"
                  >
                    <span
                      className="block text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-primary leading-none"
                      aria-label={`Statistic: ${currentCard.stat.value}`}
                    >
                      {currentCard.stat.value}
                    </span>
                    <p className="mt-3 md:mt-4 text-sm md:text-base text-[rgb(var(--color-text-body))] leading-relaxed max-w-[200px]">
                      {currentCard.stat.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 md:mt-10">
            {/* Dot Indicators (Left) */}
            <div className="flex gap-2" role="tablist" aria-label="Slide indicators">
              {impactCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--color-secondary))] ${
                    index === activeIndex
                      ? "bg-white w-8"
                      : "bg-white/30 w-3 hover:bg-white/50"
                  }`}
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Go to slide ${index + 1}`}
                  tabIndex={index === activeIndex ? 0 : -1}
                />
              ))}
            </div>

            {/* Arrow Buttons (Right) */}
            <div className="flex gap-3">
              <motion.button
                onClick={goToPrevious}
                className="w-11 h-11 md:w-12 md:h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--color-secondary))]"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous slide"
              >
                <span className="material-symbols-outlined text-xl md:text-2xl" aria-hidden="true">
                  arrow_back
                </span>
              </motion.button>

              <motion.button
                onClick={goToNext}
                className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white text-[rgb(var(--color-secondary))] flex items-center justify-center hover:bg-white/90 transition-colors duration-200 shadow-lg shadow-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--color-secondary))]"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next slide"
              >
                <span className="material-symbols-outlined text-xl md:text-2xl" aria-hidden="true">
                  arrow_forward
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Screen reader announcement for slide changes */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          Showing slide {activeIndex + 1} of {impactCards.length}: {currentCard.title}
        </div>
      </div>
    </section>
  );
}
