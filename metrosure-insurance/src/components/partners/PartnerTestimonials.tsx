"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonialsData = [
  {
    text: "Partnering with Metrosure has been transformative for our business. We've seen a 25% increase in foot traffic, and the additional revenue from insurance sales has exceeded our expectations.",
    name: "Themba Ndlovu",
    role: "Regional Manager",
    company: "Durban Retail Group",
  },
  {
    text: "The Metrosure team handles everything professionally. From training to compliance, we don't worry about a thing. Our customers love the convenience of getting insurance while they shop.",
    name: "Sarah van der Merwe",
    role: "Store Owner",
    company: "Lifestyle Furniture & More",
  },
  {
    text: "What impressed me most was the job creation aspect. We've helped create 15 jobs in our community through this partnership. It's good for business and good for our neighbourhood.",
    name: "Mohammed Patel",
    role: "Franchise Director",
    company: "Home & Living Stores",
  },
  {
    text: "The setup was seamless. Within two weeks of signing, we had trained staff at our location and sales were flowing. The revenue share is fair and transparent.",
    name: "Linda Khumalo",
    role: "Operations Manager",
    company: "Township Electronics",
  },
];

// Soft coral/peach color for decorative quotes
const QUOTE_COLOR = "rgba(251, 180, 160, 0.65)";
const QUOTE_COLOR_DARK = "rgba(251, 180, 160, 0.25)";

export default function PartnerTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
  };

  const currentTestimonial = testimonialsData[activeIndex];

  return (
    <section
      className="pt-28 md:pt-36 pb-16 md:pb-20 bg-[#f5f5f7] dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Decorative watermark */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-8 md:top-12 text-[8rem] md:text-[12rem] lg:text-[14rem] font-black text-slate-200/60 dark:text-white/[0.03] select-none z-0 whitespace-nowrap pointer-events-none uppercase tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Success
      </motion.div>

      {/* Full-width container for navigation buttons */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white text-center mb-20 tracking-tight relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Client Success Stories
        </motion.h2>

        {/* Testimonial Wrapper with quote marks */}
        <div className="relative max-w-4xl mx-auto">

          {/* Large Opening Quote Mark - positioned outside content */}
          <motion.div
            className="absolute pointer-events-none select-none z-0"
            style={{
              top: "-3.5rem",
              left: "-2rem",
              fontSize: "clamp(10rem, 18vw, 14rem)",
              lineHeight: 1,
              fontFamily: "Georgia, 'Times New Roman', serif",
              color: QUOTE_COLOR,
            }}
            initial={{ opacity: 0, x: -30, rotate: -10 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <span className="dark:hidden">&ldquo;</span>
            <span className="hidden dark:inline" style={{ color: QUOTE_COLOR_DARK }}>&ldquo;</span>
          </motion.div>

          {/* Large Closing Quote Mark - positioned outside content */}
          <motion.div
            className="absolute pointer-events-none select-none z-0"
            style={{
              bottom: "-5rem",
              right: "-1rem",
              fontSize: "clamp(10rem, 18vw, 14rem)",
              lineHeight: 1,
              fontFamily: "Georgia, 'Times New Roman', serif",
              color: QUOTE_COLOR,
            }}
            initial={{ opacity: 0, x: 30, rotate: 10 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <span className="dark:hidden">&rdquo;</span>
            <span className="hidden dark:inline" style={{ color: QUOTE_COLOR_DARK }}>&rdquo;</span>
          </motion.div>

          {/* Navigation Buttons - positioned relative to outer container */}
          <motion.button
            onClick={goToPrevious}
            className="absolute left-0 md:-left-20 lg:-left-28 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#C80604] text-white hidden md:flex items-center justify-center shadow-xl shadow-red-900/20 hover:bg-[#a50502] hover:shadow-red-900/30 transition-all duration-300 z-20"
            aria-label="Previous testimonial"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6 md:w-7 md:h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          <motion.button
            onClick={goToNext}
            className="absolute right-0 md:-right-20 lg:-right-28 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#C80604] text-white hidden md:flex items-center justify-center shadow-xl shadow-red-900/20 hover:bg-[#a50502] hover:shadow-red-900/30 transition-all duration-300 z-20"
            aria-label="Next testimonial"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6 md:w-7 md:h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>

          {/* Testimonial Content */}
          <div className="px-8 sm:px-16 md:px-24 lg:px-28 py-8 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="text-center"
              >
                {/* Quote Text */}
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-[1.75rem] text-slate-600 dark:text-slate-300 leading-relaxed md:leading-relaxed italic font-light tracking-wide">
                  {currentTestimonial.text}
                </p>

                {/* Author Info */}
                <div className="mt-10 md:mt-12">
                  <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 mt-2 font-medium">
                    {currentTestimonial.role}, {currentTestimonial.company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dot Indicators */}
        <motion.div
          className="flex justify-center items-center gap-3 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {testimonialsData.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full transition-all duration-400 ${
                index === activeIndex
                  ? "bg-[#C80604] w-10 h-3"
                  : "bg-slate-300 dark:bg-slate-600 w-3 h-3 hover:bg-[#C80604]/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                width: index === activeIndex ? 40 : 12,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
