"use client";

import { Header, Footer, ScrollToTop } from "@/components";
import CareersHero from "@/components/careers/CareersHero";
import WhyJoinUs from "@/components/careers/WhyJoinUs";
import OpenPositions from "@/components/careers/OpenPositions";
import ApplicationForm from "@/components/careers/ApplicationForm";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
    <div className="bg-[rgb(var(--color-surface))] min-h-screen transition-colors duration-300 relative">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white_80%,transparent)] pointer-events-none opacity-30 animate-[grid-flow_20s_linear_infinite] z-0" />
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none z-0" />

      <Header />
      <main className="relative z-10">
        {/* Hero Section */}
        <CareersHero onApplyClick={() => scrollToForm()} />

      {/* Stats Bar */}
      <section
        ref={statsRef}
        className="py-12 bg-primary relative overflow-hidden"
      >
        {/* Geometric Pattern - Left Side */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[35%] pointer-events-none hidden lg:block"
          initial={{ opacity: 0, x: -30 }}
          animate={statsInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 [mask-image:linear-gradient(to_right,white_0%,white_20%,transparent_100%)]">
            <Image
              src="/resources/vecteezy_abstract-geometric-pattern-artwork-retro-colors-and-color_6253957.svg"
              alt=""
              fill
              className="object-cover object-right opacity-15 mix-blend-soft-light scale-125"
              aria-hidden="true"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/50 to-primary" />
        </motion.div>

        {/* Geometric Pattern - Right Side */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-[35%] pointer-events-none hidden lg:block"
          initial={{ opacity: 0, x: 30 }}
          animate={statsInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
        >
          <div className="absolute inset-0 [mask-image:linear-gradient(to_left,white_0%,white_20%,transparent_100%)]">
            <Image
              src="/resources/vecteezy_abstract-geometric-pattern-artwork-retro-colors-and-color_6253957.svg"
              alt=""
              fill
              className="object-cover object-left opacity-15 mix-blend-soft-light scale-125 -scale-x-100"
              aria-hidden="true"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-primary/30 via-primary/50 to-primary" />
        </motion.div>

        {/* Floating geometric accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-8 -left-8 w-24 h-24 rounded-br-full bg-[#F2CC8E]/10"
            animate={{ y: [0, 6, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-10 -right-10 w-28 h-28 rounded-tl-full bg-[#82B29A]/10"
            animate={{ y: [0, -6, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div
            className="absolute top-1/2 left-12 w-5 h-5 bg-[#DF7A5E]/15 rounded hidden md:block"
            animate={{ y: [0, 10, 0], rotate: [0, 45, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute top-1/3 right-16 w-4 h-4 bg-[#F4F1DE]/15 rounded-sm hidden md:block"
            animate={{ y: [0, -8, 0], rotate: [45, 0, 45] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
        </div>

        {/* Background Pattern - subtle grid */}
        <div className="absolute inset-0 opacity-5">
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
                  className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm"
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
        className="py-24 px-4 bg-[rgb(var(--color-surface-card))] transition-colors duration-300"
      >
        <motion.div
          className="max-w-6xl mx-auto bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Geometric Shape Decorations */}
          <svg
            className="absolute -top-10 -left-10 w-40 h-40 opacity-10"
            viewBox="0 0 100 100"
          >
            <path d="M100 0 A100 100 0 0 1 0 100 L0 0 Z" fill="white" />
          </svg>
          <svg
            className="absolute -bottom-8 -right-8 w-32 h-32 opacity-10 rotate-180"
            viewBox="0 0 100 100"
          >
            <path d="M100 0 A100 100 0 0 1 0 100 L0 0 Z" fill="white" />
          </svg>
          <motion.svg
            className="absolute top-1/4 right-10 w-6 h-6 opacity-30"
            viewBox="0 0 100 100"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <polygon points="50,0 100,50 50,100 0,50" fill="white" />
          </motion.svg>
          <motion.svg
            className="absolute bottom-1/3 left-12 w-4 h-4 opacity-25"
            viewBox="0 0 100 100"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <polygon points="50,0 100,50 50,100 0,50" fill="white" />
          </motion.svg>

          {/* Animated Decorative Blurs */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-80 h-80 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to Start Your Career?
            </motion.h2>
            <motion.p
              className="text-xl text-white/90 max-w-2xl font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Join 5,000+ people who&apos;ve built their future with Metrosure
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                onClick={() => scrollToForm()}
                className="bg-white text-primary text-lg font-bold py-4 px-10 rounded-lg shadow-xl flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span>Apply Now</span>
                <span className="material-symbols-outlined">arrow_upward</span>
              </motion.button>
              <Link href="/contact">
                <motion.span
                  className="bg-[rgb(var(--color-primary-hover))] border border-white/20 text-white text-lg font-bold py-4 px-10 rounded-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="material-symbols-outlined">mail</span>
                  <span>Contact HR</span>
                </motion.span>
              </Link>
            </motion.div>

            {/* Trust Badge */}
            <motion.p
              className="text-sm text-white/70 mt-2 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="material-symbols-outlined text-sm">verified</span>
              FSP 47089 | Authorised Financial Service Provider
            </motion.p>
          </div>
        </motion.div>
      </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
