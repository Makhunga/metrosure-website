"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonialsData = [
  {
    text: "Partnering with Metrosure has been transformative. We've seen a 25% increase in foot traffic, and the additional revenue has exceeded expectations.",
    name: "Themba Ndlovu",
    role: "Regional Manager",
    company: "Durban Retail Group",
    image: "/images/testimonials/themba.png",
  },
  {
    text: "The Metrosure team handles everything professionally. From training to compliance, we don't worry about a thing. Our customers love the convenience.",
    name: "Sarah van der Merwe",
    role: "Store Owner",
    company: "Lifestyle Furniture",
    image: "/images/testimonials/sarah.png",
  },
  {
    text: "The job creation aspect is impressive. We've helped create 15 jobs in our community. It's good for business and good for our neighbourhood.",
    name: "Mohammed Patel",
    role: "Franchise Director",
    company: "Home & Living Stores",
    image: "/images/testimonials/mohammed.png",
  },
  {
    text: "The setup was seamless. Within two weeks we had trained staff and sales were flowing. The revenue share is fair and transparent.",
    name: "Linda Khumalo",
    role: "Operations Manager",
    company: "Township Electronics",
    image: "/images/testimonials/linda.png",
  },
];

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
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Client Success Stories
          </h2>
        </motion.div>

        <div className="relative">
          {/* Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-6 md:-left-24 z-20">
            <button
              onClick={goToPrevious}
              className="p-3 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-lg hover:scale-110 transition-transform"
              aria-label="Previous"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-6 md:-right-24 z-20">
            <button
              onClick={goToNext}
              className="p-3 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-lg hover:scale-110 transition-transform"
              aria-label="Next"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                {/* Avatar Image */}
                <div className="relative w-24 h-24 mb-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-orange-500 p-1 shadow-xl shadow-orange-500/20">
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-slate-800">
                      <Image
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <blockquote className="text-xl md:text-3xl font-medium text-slate-900 dark:text-white leading-relaxed mb-10 max-w-3xl">
                  &quot;{currentTestimonial.text}&quot;
                </blockquote>

                <div>
                  <div className="font-bold text-lg text-slate-900 dark:text-white">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-primary font-medium">
                    {currentTestimonial.role}, {currentTestimonial.company}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === activeIndex
                  ? "bg-primary"
                  : "bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
