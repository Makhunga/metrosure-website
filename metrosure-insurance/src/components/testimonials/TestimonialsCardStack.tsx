"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// TESTIMONIALS CARD STACK
// Modern depth with layered cards, subtle rotation, and parallax effect
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

// Get visible card indices for stack effect
function getVisibleCards(activeIndex: number, total: number): number[] {
  const indices = [activeIndex];
  // Add next 2 cards behind
  for (let i = 1; i <= 2; i++) {
    indices.push((activeIndex + i) % total);
  }
  return indices;
}

// Card position/rotation for stack effect
function getCardStyle(position: number) {
  const styles = [
    { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 30 },
    { x: 20, y: 10, rotate: 2, scale: 0.95, opacity: 0.7, zIndex: 20 },
    { x: 40, y: 20, rotate: 4, scale: 0.9, opacity: 0.4, zIndex: 10 },
  ];
  return styles[position] || styles[2];
}

export default function TestimonialsCardStack() {
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

  const visibleCards = getVisibleCards(activeIndex, testimonialsData.length);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-br from-stone-100 via-white to-stone-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 overflow-hidden transition-colors duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Customer testimonials"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Real stories from real people who trust us with their protection
          </p>
        </motion.div>

        {/* Card Stack Container */}
        <div className="relative flex justify-center items-center min-h-[500px] md:min-h-[550px]">
          <div className="relative w-full max-w-lg">
            {/* Stacked Cards */}
            <AnimatePresence mode="popLayout">
              {visibleCards.map((cardIndex, position) => {
                const testimonial = testimonialsData[cardIndex];
                const style = getCardStyle(position);
                const isActive = position === 0;

                return (
                  <motion.div
                    key={cardIndex}
                    className="absolute top-0 left-0 w-full"
                    initial={{
                      x: 100,
                      opacity: 0,
                      scale: 0.8,
                      rotate: 10
                    }}
                    animate={{
                      x: style.x,
                      y: style.y,
                      rotate: style.rotate,
                      scale: style.scale,
                      opacity: style.opacity,
                      zIndex: style.zIndex,
                    }}
                    exit={{
                      x: -100,
                      opacity: 0,
                      scale: 0.8,
                      rotate: -10
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                    }}
                    onClick={!isActive ? goToNext : undefined}
                    style={{ cursor: !isActive ? "pointer" : "default" }}
                  >
                    <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/40">
                      {/* Card Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={`${testimonial.name} testimonial`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 500px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>

                      {/* Card Content */}
                      <div className="p-6 md:p-8">
                        {/* 5 Stars */}
                        <div className="flex gap-1 mb-4">
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

                        {/* Quote */}
                        <blockquote className="text-slate-700 dark:text-slate-200 leading-relaxed mb-6 line-clamp-3">
                          &ldquo;{testimonial.text}&rdquo;
                        </blockquote>

                        {/* Author */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {testimonial.name}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-6 mt-8">
          {/* Previous Button */}
          <motion.button
            onClick={goToPrevious}
            className="w-12 h-12 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous testimonial"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </motion.button>

          {/* Dot Indicators */}
          <div className="flex gap-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-primary w-8"
                    : "bg-slate-300 dark:bg-slate-600 w-2.5 hover:bg-slate-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            onClick={goToNext}
            className="w-12 h-12 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next testimonial"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
