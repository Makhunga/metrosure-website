"use client";

import { Header, Footer, ScrollToTop } from "@/components";
import CareersHero from "@/components/careers/CareersHero";
import WhyJoinUs from "@/components/careers/WhyJoinUs";
import OpenPositions from "@/components/careers/OpenPositions";
import ApplicationForm from "@/components/careers/ApplicationForm";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

// Stats data
const stats = [
  { value: "5000+", label: "Jobs Created", icon: "group" },
  { value: "9+", label: "Years Strong", icon: "calendar_month" },
  { value: "5", label: "Office Locations", icon: "location_on" },
  { value: "Always", label: "Hiring", icon: "trending_up" },
];

export default function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });

  const scrollToForm = (position?: string) => {
    if (position) {
      setSelectedPosition(position);
    }
    const formSection = document.getElementById("application-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen transition-colors duration-300">
      <Header />
      <main>
        {/* Hero Section */}
        <CareersHero onApplyClick={() => scrollToForm()} />

      {/* Stats Bar */}
      <section
        ref={statsRef}
        className="py-12 bg-primary relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/10 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="material-symbols-outlined text-white text-2xl">
                    {stat.icon}
                  </span>
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <WhyJoinUs />

      {/* Open Positions */}
      <OpenPositions onApplyClick={scrollToForm} />

      {/* Application Form */}
      <ApplicationForm
        id="application-form"
        selectedPosition={selectedPosition}
        onPositionChange={setSelectedPosition}
      />

      {/* Final CTA */}
      <section
        ref={ctaRef}
        className="relative py-24 bg-primary overflow-hidden"
      >
        {/* Animated Background Blurs */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[rgb(var(--color-secondary))]/30 rounded-full blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Ready to Start Your Career?
            </motion.h2>
            <motion.p
              className="text-xl text-white/90 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join 5,000+ people who&apos;ve built their future with Metrosure
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.button
                onClick={() => scrollToForm()}
                className="h-14 px-8 rounded-xl bg-white text-primary font-bold shadow-lg shadow-black/20 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span>Apply Now</span>
                <span className="material-symbols-outlined">arrow_upward</span>
              </motion.button>
              <Link href="/contact">
                <motion.span
                  className="h-14 px-8 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur text-white font-bold flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="material-symbols-outlined">mail</span>
                  <span>Contact HR</span>
                </motion.span>
              </Link>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              className="mt-12 flex items-center justify-center gap-2 text-white/70"
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="material-symbols-outlined text-lg">verified</span>
              <span className="text-sm">FSP 47089 | Authorised Financial Service Provider</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
