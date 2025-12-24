"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonialsData = [
  {
    text: "When my car was hijacked in Joburg, Metrosure handled everything before I could even stress. It wasn't just about the payout — it was knowing someone had my back.",
    name: "Thabo Molefe",
    role: "Home & Auto",
  },
  {
    text: "Switching was seamless. The advisor actually looked at my business needs and saved me money while increasing my coverage. No one else took the time.",
    name: "Priya Naidoo",
    role: "Business Owner",
  },
  {
    text: "I never understood my life insurance policy until I sat down with Metrosure. Now I feel genuinely confident about my family's future.",
    name: "Sipho Mthembu",
    role: "Life Insurance",
  },
  {
    text: "After years of feeling like just another policy number, Metrosure made me feel like family. Their team goes above and beyond every single time.",
    name: "David Nkosi",
    role: "Retirement Planning",
  },
  {
    text: "The funeral cover gave us peace of mind during the hardest time of our lives. They handled everything with dignity and speed.",
    name: "Nomsa Dlamini",
    role: "Funeral Cover",
  },
];

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;

    let clampedIndex = index;
    if (index < 0) clampedIndex = 0;
    if (index >= testimonialsData.length) clampedIndex = testimonialsData.length - 1;

    const cards = container.children;
    if (cards[clampedIndex]) {
      const card = cards[clampedIndex] as HTMLElement;
      const scrollLeft = card.offsetLeft - container.clientWidth / 2 + card.offsetWidth / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };

  // Autoplay
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % testimonialsData.length;
      scrollToIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused]);

  // Handle scroll to update active index
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const viewportCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      const element = child as HTMLElement;
      const elementCenter = element.offsetLeft + element.offsetWidth / 2;
      const distance = Math.abs(elementCenter - viewportCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="stories"
      className="py-24 bg-[rgb(var(--color-surface-card))] overflow-hidden transition-colors duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header */}
      <motion.div
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] max-w-lg"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Real stories, real security
        </motion.h2>
        <motion.div
          className="hidden md:flex gap-2"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-12 h-12 rounded-full border border-[rgb(var(--color-border-light))] flex items-center justify-center hover:bg-[rgb(var(--color-surface))] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[rgb(var(--color-text-main))]"
            aria-label="Previous testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </motion.button>
          <motion.button
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === testimonialsData.length - 1}
            className="w-12 h-12 rounded-full bg-[rgb(var(--color-text-main))] text-[rgb(var(--color-surface-card))] flex items-center justify-center hover:opacity-90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Carousel */}
      <motion.div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto pb-8 px-4 sm:px-6 lg:px-8 scrollbar-hide snap-x snap-mandatory"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            className={`min-w-[300px] md:min-w-[420px] bg-[rgb(var(--color-surface-card))] p-8 rounded-2xl border snap-center transition-all duration-500 shadow-sm flex flex-col justify-between h-[340px]
              ${
                index === activeIndex
                  ? "border-primary/50 shadow-md"
                  : "border-[rgb(var(--color-border-light))]"
              }
            `}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={
              isInView
                ? {
                    opacity: index === activeIndex ? 1 : 0.7,
                    y: 0,
                    scale: index === activeIndex ? 1 : 0.95,
                  }
                : { opacity: 0, y: 40, scale: 0.95 }
            }
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div>
              {/* Stars */}
              <div className="flex gap-1 text-primary mb-6">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="material-symbols-outlined fill-current text-lg"
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -180 }}
                    transition={{ delay: 0.6 + index * 0.1 + i * 0.05, type: "spring", stiffness: 400 }}
                  >
                    star
                  </motion.span>
                ))}
              </div>
              <p className="text-lg text-[rgb(var(--color-text-main))] leading-relaxed font-medium">
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[rgb(var(--color-border-light))]">
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 border border-[rgb(var(--color-border-light))]"
                whileHover={{ scale: 1.1 }}
              />
              <div>
                <p className="font-bold text-[rgb(var(--color-text-main))]">{testimonial.name}</p>
                <p className="text-xs text-[rgb(var(--color-text-body))] font-semibold uppercase tracking-wide">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Dots */}
      <motion.div
        className="flex justify-center gap-2 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {testimonialsData.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-primary w-8" : "bg-[rgb(var(--color-border-light))] w-2.5 hover:bg-primary/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{ width: index === activeIndex ? 32 : 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          />
        ))}
      </motion.div>
    </section>
  );
}
