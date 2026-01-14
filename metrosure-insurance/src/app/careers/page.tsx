"use client";

import dynamic from "next/dynamic";
import { Header, Footer } from "@/components";
import CareersHero from "@/components/careers/CareersHero";
import CareersHeroFloating from "@/components/careers/CareersHeroFloating";
import ApplicationModal from "@/components/careers/ApplicationModal";
import CultureStorytelling from "@/components/careers/CultureStorytelling";

// Toggle for testing floating hero variant (set to true to use floating images hero)
const USE_FLOATING_HERO = false;
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

// Code-split below-fold components for better LCP
const WhyJoinUs = dynamic(() => import("@/components/careers/WhyJoinUs"));
// Session 103: Using Cinematic Carousel directly (user selected over Featured Spotlight)
const TestimonialsCarousel = dynamic(
  () => import("@/components/careers/testimonial-variants/TestimonialsCarousel")
);
const OpenPositions = dynamic(
  () => import("@/components/careers/OpenPositions")
);

export default function CareersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });

  const openApplicationModal = (position?: string) => {
    if (position) {
      setSelectedPosition(position);
    } else {
      setSelectedPosition("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen transition-colors duration-300 relative">
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none z-0" />

      <Header />
      <main className="relative z-10">
        {/* 1. Hero Section - Massive typography, minimal content */}
        {USE_FLOATING_HERO ? (
          <CareersHeroFloating onApplyClick={() => openApplicationModal()} />
        ) : (
          <CareersHero onApplyClick={() => openApplicationModal()} />
        )}

        {/* 2. Culture Storytelling - Who we are, embedded stats */}
        <CultureStorytelling />

        {/* 3. Employee Testimonials - Proof before promises */}
        <TestimonialsCarousel />

        {/* 4. Why Join Us - Benefits (now feel earned after proof) */}
        <WhyJoinUs />

        {/* 5. Open Positions */}
        <OpenPositions onApplyClick={openApplicationModal} />

        {/* 6. Final CTA - Simplified (removed heavy decorations) */}
        <section
          ref={ctaRef}
          className="py-32 px-4 bg-[rgb(var(--color-surface-card))] transition-colors duration-300"
        >
          <motion.div
            className="max-w-4xl mx-auto bg-primary rounded-3xl p-12 md:p-16 text-center relative overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Subtle gradient overlay only */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6">
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ready to Start?
              </motion.h2>
              <motion.p
                className="text-xl text-white/90 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Join thousands who&apos;ve built their future with Metrosure
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.button
                  onClick={() => openApplicationModal()}
                  className="bg-white text-primary text-lg font-bold py-4 px-10 rounded-xl shadow-lg flex items-center justify-center gap-2"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span>Apply Now</span>
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                </motion.button>
                <Link href="/contact">
                  <motion.span
                    className="bg-white/10 border border-white/20 text-white text-lg font-bold py-4 px-10 rounded-xl flex items-center justify-center gap-2 backdrop-blur-sm"
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="material-symbols-outlined text-lg">
                      mail
                    </span>
                    <span>Contact HR</span>
                  </motion.span>
                </Link>
              </motion.div>

              {/* Trust Badge */}
              <motion.p
                className="text-sm text-white/60 mt-4 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={ctaInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span className="material-symbols-outlined text-sm">
                  verified
                </span>
                FSP 47089 | Authorised Financial Service Provider
              </motion.p>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedPosition={selectedPosition}
      />

      <Footer />
    </div>
  );
}
