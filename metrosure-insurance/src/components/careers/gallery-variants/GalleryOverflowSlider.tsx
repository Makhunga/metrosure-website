"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/**
 * VARIATION 3: Clean Overflow Slider
 *
 * Aesthetic: Modern minimal / ThoughtFarmer-inspired
 * - Clean horizontal slider with overflow at edges
 * - Draggable + arrow navigation
 * - Simple rounded corners, consistent sizing
 * - Subtle hover effects
 * - Most similar to professional careers pages
 */

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

const galleryImages: GalleryImage[] = [
  { src: "/images/gallery-team-uniform-full.jpg", alt: "The Metrosure team", caption: "Team Spirit" },
  { src: "/images/gallery-team-women-professional.jpg", alt: "Professional women's team", caption: "Excellence" },
  { src: "/images/gallery-heritage-celebration.jpg", alt: "Heritage Day celebration", caption: "Heritage Day" },
  { src: "/images/gallery-heritage-joy.jpg", alt: "Celebrating with joy", caption: "Celebration" },
  { src: "/images/gallery-leadership-suits.jpg", alt: "Leadership team", caption: "Leadership" },
  { src: "/images/gallery-training-conference.jpg", alt: "Professional training", caption: "Growth" },
  { src: "/images/gallery-heritage-portrait.jpg", alt: "Traditional attire", caption: "Culture" },
];

export default function GalleryOverflowSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 400;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    setTimeout(checkScrollPosition, 300);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-slate-50 dark:bg-slate-900 overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-10 md:mb-14">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div>
            <motion.span
              className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Life at Metrosure
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Our Culture
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                canScrollLeft
                  ? "border-slate-300 dark:border-slate-600 hover:border-primary hover:bg-primary hover:text-white text-slate-600 dark:text-slate-300"
                  : "border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed"
              }`}
              aria-label="Previous images"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                canScrollRight
                  ? "border-slate-300 dark:border-slate-600 hover:border-primary hover:bg-primary hover:text-white text-slate-600 dark:text-slate-300"
                  : "border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed"
              }`}
              aria-label="Next images"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Slider Container - overflows viewport */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Gradient fades at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />

        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-6 md:px-12 lg:px-24 pb-4 cursor-grab active:cursor-grabbing"
          onScroll={checkScrollPosition}
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative flex-shrink-0 group"
              style={{ scrollSnapAlign: "start" }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="relative w-72 md:w-80 lg:w-96 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                />

                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Caption on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white font-medium text-sm">
                    {image.caption}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Optional: Scroll indicator dots */}
      <motion.div
        className="flex items-center justify-center gap-2 mt-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <span className="text-slate-400 dark:text-slate-500 text-sm">
          Drag to explore
        </span>
        <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </motion.div>

      {/* CSS for hiding scrollbar */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
