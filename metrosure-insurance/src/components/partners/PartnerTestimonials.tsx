"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "Partnering with Metrosure has been transformative for our business. We've seen a 25% increase in foot traffic, and the additional revenue from insurance sales has exceeded our expectations.",
    author: "Themba Ndlovu",
    role: "Regional Manager",
    company: "Durban Retail Group",
    image: null,
    rating: 5
  },
  {
    quote: "The Metrosure team handles everything professionally. From training to compliance, we don't worry about a thing. Our customers love the convenience of getting insurance while they shop.",
    author: "Sarah van der Merwe",
    role: "Store Owner",
    company: "Lifestyle Furniture & More",
    image: null,
    rating: 5
  },
  {
    quote: "What impressed me most was the job creation aspect. We've helped create 15 jobs in our community through this partnership. It's good for business and good for our neighborhood.",
    author: "Mohammed Patel",
    role: "Franchise Director",
    company: "Home & Living Stores",
    image: null,
    rating: 5
  },
  {
    quote: "The setup was seamless. Within two weeks of signing, we had trained staff at our location and sales were flowing. The revenue share is fair and transparent.",
    author: "Linda Khumalo",
    role: "Operations Manager",
    company: "Township Electronics",
    image: null,
    rating: 5
  }
];

export default function PartnerTestimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="py-24 bg-[rgb(var(--color-surface-card))]/80 backdrop-blur-sm relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Partner Success Stories
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            What Our Partners Say
          </motion.h2>
          <motion.p
            className="text-xl text-[rgb(var(--color-text-body))] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            Hear from retailers who have transformed their business through our partnership program.
          </motion.p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <motion.div
            className="relative bg-[rgb(var(--color-surface))] rounded-3xl p-8 md:p-12 shadow-xl border border-[rgb(var(--color-border-light))]"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="material-symbols-outlined text-amber-400 text-xl fill-current"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </motion.span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-[rgb(var(--color-text-main))] leading-relaxed mb-8 font-medium">
                  &ldquo;{testimonials[activeIndex].quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {/* Avatar Placeholder */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-[rgb(var(--color-secondary))] flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[activeIndex].author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-[rgb(var(--color-text-main))]">
                      {testimonials[activeIndex].author}
                    </div>
                    <div className="text-sm text-[rgb(var(--color-text-muted))]">
                      {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-8">
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-primary w-8"
                        : "bg-[rgb(var(--color-border-medium))] hover:bg-primary/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-3">
                <motion.button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full border border-[rgb(var(--color-border-light))] flex items-center justify-center text-[rgb(var(--color-text-body))] hover:border-primary hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Previous testimonial"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                </motion.button>
                <motion.button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-[rgb(var(--color-primary-hover))] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next testimonial"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
