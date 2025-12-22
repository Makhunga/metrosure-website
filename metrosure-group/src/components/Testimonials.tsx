"use client";

import { useRef, useState, useEffect } from "react";

const testimonialsData = [
  {
    text: "Metrosure handled my claim before I even panicked. It wasn't just about the money; it was the reassurance that someone was in my corner immediately.",
    name: "Sarah Jenkins",
    role: "Home & Auto",
  },
  {
    text: "Switching was seamless. The advisor actually looked at my business needs and saved me money while increasing my coverage.",
    name: "Mark Thompson",
    role: "Business Owner",
  },
  {
    text: "I never understood my life insurance policy until I sat down with Metrosure. Now I feel genuinely confident about my family's future.",
    name: "Elena Rodriguez",
    role: "Life Insurance",
  },
];

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
      id="stories"
      className="py-24 bg-[rgb(var(--color-surface-card))] overflow-hidden transition-colors duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
        <h2 className="text-3xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] max-w-lg">
          Real stories, real security
        </h2>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-12 h-12 rounded-full border border-[rgb(var(--color-border-light))] flex items-center justify-center hover:bg-[rgb(var(--color-surface))] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[rgb(var(--color-text-main))]"
            aria-label="Previous testimonial"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === testimonialsData.length - 1}
            className="w-12 h-12 rounded-full bg-[rgb(var(--color-text-main))] text-[rgb(var(--color-surface-card))] flex items-center justify-center hover:opacity-90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto pb-8 px-4 sm:px-6 lg:px-8 scrollbar-hide snap-x snap-mandatory"
      >
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className={`min-w-[300px] md:min-w-[420px] bg-[rgb(var(--color-surface-card))] p-8 rounded-2xl border snap-center transition-all duration-500 shadow-sm flex flex-col justify-between h-[340px]
              ${
                index === activeIndex
                  ? "border-primary/50 shadow-md scale-100 opacity-100"
                  : "border-[rgb(var(--color-border-light))] scale-95 opacity-70"
              }
            `}
          >
            <div>
              {/* Stars */}
              <div className="flex gap-1 text-primary mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined fill-current text-lg">
                    star
                  </span>
                ))}
              </div>
              <p className="text-lg text-[rgb(var(--color-text-main))] leading-relaxed font-medium">
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[rgb(var(--color-border-light))]">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 border border-[rgb(var(--color-border-light))]" />
              <div>
                <p className="font-bold text-[rgb(var(--color-text-main))]">{testimonial.name}</p>
                <p className="text-xs text-[rgb(var(--color-text-body))] font-semibold uppercase tracking-wide">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonialsData.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-primary w-8" : "bg-[rgb(var(--color-border-light))] hover:bg-primary/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
