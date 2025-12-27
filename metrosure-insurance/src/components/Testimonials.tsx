"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { TextReveal } from "./animations";

// Gradient palette for avatar backgrounds
const avatarGradients = [
  "from-rose-500 to-orange-400",      // warm
  "from-violet-500 to-purple-500",    // royal
  "from-cyan-500 to-blue-500",        // cool
  "from-emerald-500 to-teal-500",     // nature
  "from-amber-500 to-yellow-500",     // gold
  "from-pink-500 to-rose-400",        // soft
  "from-indigo-500 to-blue-600",      // deep
  "from-primary to-secondary",         // brand
];

// Get initials from name (first letter of first name)
function getInitials(name: string): string {
  return name.charAt(0).toUpperCase();
}

// Get gradient class based on index
function getAvatarGradient(index: number): string {
  return avatarGradients[index % avatarGradients.length];
}

const testimonialsData = [
  {
    text: "When my car was hijacked in Joburg, Metrosure handled everything before I could even stress. It wasn't just about the payout, it was knowing someone had my back.",
    name: "Thabo Molefe",
    role: "Home & Auto",
    isPartner: false,
  },
  {
    text: "Partnering with Metrosure was the best decision for our stores. They brought trained staff, handled everything, and we've seen a 30% boost in foot traffic. It's real revenue with zero hassle.",
    name: "Lerato Mokoena",
    role: "Retail Partner • 12 Locations",
    isPartner: true,
  },
  {
    text: "I never understood my life insurance policy until I sat down with Metrosure. Now I feel genuinely confident about my family's future.",
    name: "Sipho Mthembu",
    role: "Life Insurance",
    isPartner: false,
  },
  {
    text: "We've created 15 jobs in our community through this partnership. Metrosure handles compliance and training—we just provide the space. Win-win.",
    name: "Ahmed Patel",
    role: "Retail Partner • Furniture Store",
    isPartner: true,
  },
  {
    text: "After years of feeling like just another policy number, Metrosure made me feel like family. Their team goes above and beyond every single time.",
    name: "David Nkosi",
    role: "Retirement Planning",
    isPartner: false,
  },
  {
    text: "The funeral cover gave us peace of mind during the hardest time of our lives. They handled everything with dignity and speed.",
    name: "Nomsa Dlamini",
    role: "Funeral Cover",
    isPartner: false,
  },
];

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Mark initial animation as complete
  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimated]);

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;

    // Wrap around for cycling
    let targetIndex = index;
    if (index < 0) targetIndex = testimonialsData.length - 1;
    if (index >= testimonialsData.length) targetIndex = 0;

    const cards = container.children;
    if (cards[targetIndex]) {
      const card = cards[targetIndex] as HTMLElement;
      const scrollLeft = card.offsetLeft - container.clientWidth / 2 + card.offsetWidth / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });

      // Directly set activeIndex for reliable state update
      setActiveIndex(targetIndex);
    }
  }, []);

  // Navigate to previous slide (with cycling)
  const goToPrevious = useCallback(() => {
    const prevIndex = activeIndex === 0 ? testimonialsData.length - 1 : activeIndex - 1;
    scrollToIndex(prevIndex);
  }, [activeIndex, scrollToIndex]);

  // Navigate to next slide (with cycling)
  const goToNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % testimonialsData.length;
    scrollToIndex(nextIndex);
  }, [activeIndex, scrollToIndex]);

  // Autoplay with cycling
  useEffect(() => {
    if (isPaused || !isInView) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, isInView, goToNext]);

  // Handle manual scroll to update active index
  const handleScroll = useCallback(() => {
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
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      id="stories"
      className="py-32 bg-[rgb(var(--color-surface-card))] overflow-hidden transition-colors duration-300 relative"
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
        <h2 className="text-3xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] max-w-lg">
          <TextReveal text="From customers & partners" delay={0.2} staggerDelay={0.05} />
        </h2>
        <motion.div
          className="hidden md:flex gap-2"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            onClick={goToPrevious}
            className="w-12 h-12 rounded-full border border-[rgb(var(--color-border-light))] flex items-center justify-center hover:bg-[rgb(var(--color-surface))] hover:border-primary/50 transition-colors text-[rgb(var(--color-text-main))]"
            aria-label="Previous testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </motion.button>
          <motion.button
            onClick={goToNext}
            className="w-12 h-12 rounded-full bg-[rgb(var(--color-text-main))] text-[rgb(var(--color-surface-card))] flex items-center justify-center hover:bg-primary transition-all shadow-lg"
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
        className="flex gap-6 overflow-x-auto py-6 px-4 sm:px-6 lg:px-8 scrollbar-hide snap-x snap-mandatory"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {testimonialsData.map((testimonial, index) => {
          const isActive = index === activeIndex;
          return (
          <motion.div
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`min-w-[300px] md:min-w-[420px] bg-[rgb(var(--color-surface-card))] p-8 pb-6 rounded-2xl border snap-center transition-all duration-300 flex flex-col justify-between h-[340px] cursor-pointer
              ${
                isActive
                  ? "border-primary shadow-lg shadow-primary/10"
                  : "border-[rgb(var(--color-border-light))] shadow-sm"
              }
            `}
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: hasAnimated ? (isActive ? 1 : 0.6) : (isInView ? 1 : 0),
              y: isInView ? 0 : 40,
              scale: hasAnimated ? (isActive ? 1 : 0.95) : 1,
            }}
            transition={{
              duration: hasAnimated ? 0.3 : 0.5,
              delay: hasAnimated ? 0 : 0.5 + index * 0.1
            }}
            whileHover={{ scale: 1.02, y: -5, opacity: 1 }}
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
            <div className="flex items-center gap-4 mt-8 pt-6">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/30 dark:ring-white/10 bg-gradient-to-br ${getAvatarGradient(index)}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {testimonial.isPartner ? (
                  <span className="material-symbols-outlined text-white text-xl drop-shadow-sm">storefront</span>
                ) : (
                  <span className="text-white font-bold text-lg drop-shadow-sm">
                    {getInitials(testimonial.name)}
                  </span>
                )}
              </motion.div>
              <div>
                <p className="font-bold text-[rgb(var(--color-text-main))]">{testimonial.name}</p>
                <p className={`text-xs font-semibold uppercase tracking-wide ${
                  testimonial.isPartner ? "text-primary" : "text-[rgb(var(--color-text-body))]"
                }`}>
                  {testimonial.role}
                </p>
              </div>
            </div>
          </motion.div>
        );
        })}
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
