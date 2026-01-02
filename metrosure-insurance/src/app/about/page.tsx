"use client";

import Link from "next/link";
import Image from "next/image";
import { Header, Footer } from "@/components";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MagneticButton } from "@/components/animations";
import AboutGallery from "@/components/about/AboutGallery";
import {
  companyStats as stats,
  coreValues as values,
  companyTimeline as timeline,
  executiveTeam as team,
} from "@/data/aboutPage";

const isDev = process.env.NODE_ENV === "development";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function AboutPage() {
  const [hoveredTeamMember, setHoveredTeamMember] = useState<number | null>(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const timelineRef = useRef(null);
  const teamRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <div className="bg-stone-50 dark:bg-slate-900 min-h-screen transition-colors duration-300 relative">
      <Header />

      {/* Hero Section with Portrait Image */}
      <section ref={heroRef} className="relative pt-56 pb-24 overflow-hidden">
        {/* Hero Image - Horizontally Flipped (face on right) */}
        <div
          className="absolute inset-0 bg-cover bg-right -scale-x-100"
          style={{ backgroundImage: 'url("/images/about-hero.jpg")' }}
        />

        {/* Gradient Overlay - Dark to transparent (left to right) for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 via-40% to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-wider mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="material-symbols-outlined text-sm">info</span>
              About Us
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Taking You
              <br />
              <span className="text-primary">to the Future</span>
            </motion.h1>
            <motion.p
              className="text-xl text-white/90 leading-relaxed mb-8 max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              A proudly South African financial services company protecting families and partnering with retail businesses. Real people, real advice, real partnerships.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <MagneticButton strength={0.3}>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-[rgb(var(--color-primary-hover))] transition-all h-12 px-8 text-white font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                  >
                    Get a Quote
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </motion.div>
              </MagneticButton>
              <MagneticButton strength={0.3}>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all h-12 px-8 text-white font-bold"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </MagneticButton>
            </motion.div>

            {/* B2B Cross-link */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                href="/partners"
                className="group inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
              >
                <span className="material-symbols-outlined text-base">storefront</span>
                <span>Own a retail space? <span className="font-semibold">Partner with us</span></span>
                <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Light Style (Matching Home Page) */}
      <section ref={statsRef} className="relative z-10 border-y border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[rgb(var(--color-border-light))]"
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="px-6 py-6 md:py-8 flex flex-col items-center text-center bg-[rgb(var(--color-surface-card))] hover:bg-[rgb(var(--color-surface))] transition-colors duration-300"
                variants={itemVariants}
              >
                <span className="text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-[rgb(var(--color-text-body))]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section - Editorial Layout */}
      <section ref={missionRef} className="bg-slate-900 dark:bg-slate-950 relative pb-8">
        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-0">
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 pb-20">
            {/* Left Column - Bold Heading */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.h2
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Building a nation
                <br />
                <span className="text-white/60">where everyone</span>
                <br />
                <span className="text-white/60">is protected.</span>
              </motion.h2>
            </motion.div>

            {/* Right Column - Content with vertical line */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Vertical accent line */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent"
                initial={{ scaleY: 0, originY: 0 }}
                animate={missionInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              />

              <div className="pl-8 space-y-6">
                <motion.p
                  className="text-lg md:text-xl text-white font-medium leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  We&apos;re not just an insurance broker, we&apos;re a fast-growing sales and marketing company that delivers results. For families seeking peace of mind. For retailers seeking proven growth.
                </motion.p>

                <motion.p
                  className="text-base md:text-lg text-white/70 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Our data-driven approach and quality assurance team (95% daily average) have delivered 75% average sales increases for retail partners within the first 6 months. Partners like TFG trust us to drive their financial services growth.
                </motion.p>

                <motion.p
                  className="text-base md:text-lg text-white/70 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  We recruit and develop young individuals, they are the future. Since 2013, this model has created over 5,000 jobs across 7 provinces. Every partnership we form moves us closer to consistent, reliable growth for all.
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Image - positioned to extend below the dark section */}
          <motion.div
            className="relative z-20 max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={missionInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            style={{ transform: 'translateY(6rem)' }}
          >
            <motion.div
              className="relative w-full aspect-[16/9] md:aspect-[2/1] overflow-hidden rounded-xl shadow-2xl cursor-pointer"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src="/images/mission-image.jpg"
                alt="The Metrosure team"
                fill
                className="object-cover object-top transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1400px) 100vw, 1400px"
                loading="lazy"
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-primary/0 hover:bg-primary/5 transition-colors duration-500" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section - extra top padding to accommodate image overflow from above */}
      <section ref={valuesRef} className="relative z-10 pt-40 md:pt-48 pb-24 section-warm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-main))] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our Values
            </motion.h2>
            <motion.p
              className="text-lg text-[rgb(var(--color-text-body))] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              These core principles guide everything we do, from how we serve our
              customers to how we partner with retailers across South Africa.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-5 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-2xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] hover:shadow-lg transition-all duration-300 group cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              >
                <motion.div
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
                >
                  <span className="material-symbols-outlined text-primary text-3xl group-hover:text-white transition-colors duration-300">
                    {value.icon}
                  </span>
                </motion.div>
                <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-3 group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                <p className="text-[rgb(var(--color-text-body))] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section - Enhanced Visual Design (Static Style with Current Dates) */}
      <section ref={timelineRef} className="relative z-10 py-24 md:py-32 bg-[rgb(var(--color-surface))] overflow-hidden">
        {/* Decorative watermark - centered, partially hidden behind top section */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -top-[2.4rem] text-[12rem] font-black text-slate-100 dark:text-white/5 select-none z-0 whitespace-nowrap pointer-events-none uppercase tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          History
        </motion.div>
        <div className="max-w-4xl mx-auto px-6 lg:px-12 relative">
          <motion.div
            className="flex flex-col gap-6 mb-24 text-center items-center relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-black tracking-tight text-[rgb(var(--color-text-main))]"
              initial={{ opacity: 0, y: 20 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our Journey
            </motion.h2>
            <motion.p
              className="text-xl text-[rgb(var(--color-text-body))] max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              From a local startup to a national shield. A timeline of trust built
              over years.
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Vertical Line - connects icon centers from first to last item */}
            <motion.div
              className="absolute left-[40px] top-10 w-0.5 bg-[rgb(var(--color-border-light))]"
              style={{ height: 'calc(100% - 300px)' }}
              initial={{ scaleY: 0, originY: 0 }}
              animate={timelineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            />

            <div className="flex flex-col space-y-20">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative pl-32 md:pl-48 group"
                  initial={{ opacity: 0, x: -30 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
                >
                  {/* Timeline Icon Box */}
                  <div
                    className={`absolute left-0 top-0 w-20 h-20 rounded-2xl flex items-center justify-center z-10 transition-all duration-500 group-hover:scale-110 ${
                      item.isSpecial
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "bg-[rgb(var(--color-surface-card))] border-2 border-[rgb(var(--color-border-light))] shadow-lg group-hover:border-primary/30"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-2xl ${
                        item.isSpecial ? "hidden" : ""
                      }`}
                    />
                    <span
                      className={`material-symbols-outlined text-4xl relative z-10 transition-colors duration-300 ${
                        item.isSpecial
                          ? "text-white"
                          : "text-[rgb(var(--color-text-muted))] group-hover:text-primary"
                      }`}
                    >
                      {item.icon}
                    </span>
                  </div>

                  {/* Connector Line */}
                  <div
                    className={`absolute left-20 top-10 w-12 md:w-28 h-px transition-colors duration-500 ${
                      item.isSpecial
                        ? "bg-primary/20"
                        : "bg-[rgb(var(--color-border-light))] group-hover:bg-primary/30"
                    }`}
                  >
                    <div
                      className={`absolute right-0 -top-[3px] w-2 h-2 rounded-full transition-colors duration-500 ${
                        item.isSpecial
                          ? "bg-primary/50 animate-pulse"
                          : "bg-[rgb(var(--color-border-light))] group-hover:bg-primary"
                      }`}
                    />
                  </div>

                  {/* Content Card */}
                  <motion.div
                    className={`p-8 md:p-10 rounded-3xl border shadow-sm relative overflow-hidden ${
                      item.isSpecial
                        ? "bg-[rgb(var(--color-surface-card))] border-primary/20"
                        : "bg-[rgb(var(--color-surface-card))] border-[rgb(var(--color-border-light))]"
                    }`}
                    initial="rest"
                    whileHover="hover"
                    variants={{
                      rest: { y: 0, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" },
                      hover: {
                        y: -4,
                        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
                        transition: { type: "spring", stiffness: 300, damping: 20 }
                      }
                    }}
                  >
                    <motion.div
                      className="absolute right-4 -bottom-6 text-9xl font-black text-primary/10 dark:text-primary/20 select-none z-0"
                      variants={{
                        rest: { y: 30, opacity: 0.6 },
                        hover: {
                          y: 0,
                          opacity: 1,
                          transition: { type: "spring", stiffness: 150, damping: 15 }
                        }
                      }}
                    >
                      {item.number}
                    </motion.div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        {item.isSpecial && (
                          <span className="px-2 py-1 bg-primary text-white text-xs font-bold rounded uppercase tracking-wider">
                            Present
                          </span>
                        )}
                        <span className="text-primary font-bold text-lg">
                          {item.year}
                        </span>
                        <div className="h-px w-8 bg-primary/30" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[rgb(var(--color-text-main))]">
                        {item.title}
                      </h3>
                      <p className="text-[rgb(var(--color-text-body))] text-lg leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Flip Card Hover (Static Style with Current Names) */}
      <section ref={teamRef} className="relative z-10 py-24 md:py-32 bg-[rgb(var(--color-surface-card))] overflow-hidden">
        {/* Decorative watermark - mirrors timeline card treatment */}
        <motion.div
          className="absolute left-2 md:left-6 lg:left-12 top-6 md:top-8 text-9xl font-black text-slate-100 dark:text-white/5 select-none z-0 whitespace-nowrap pointer-events-none uppercase"
          initial={{ opacity: 0, x: -20 }}
          animate={teamInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Executive Team
        </motion.div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">

        <motion.div
          className="flex flex-col gap-6 mb-20 items-center text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-black tracking-tight text-[rgb(var(--color-text-main))]"
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Leadership
          </motion.h2>
          <motion.p
            className="text-lg text-[rgb(var(--color-text-body))] max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            The strategic minds and empathetic hearts guiding Metrosure forward.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              className={`group h-[500px] relative w-full rounded-2xl hover:z-20 ${
                index === 1 ? "lg:mt-12" : ""
              }`}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              onMouseEnter={() => setHoveredTeamMember(index)}
              onMouseLeave={() => setHoveredTeamMember(null)}
            >
              <motion.div
                className="relative w-full h-full shadow-xl rounded-2xl overflow-hidden bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))]"
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(191, 6, 3, 0.25)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Image Section - takes most of the card */}
                <div className="absolute inset-0 flex flex-col h-full">
                  <div className="relative flex-1 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div
                      className="w-full h-full bg-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                      style={{
                        backgroundImage: member.image ? `url("${member.image}")` : 'none',
                        backgroundPosition: 'center 15%',
                        backgroundColor: !member.image ? '#475569' : undefined
                      }}
                    >
                      {/* Placeholder initials when no image */}
                      {!member.image && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-32 h-32 rounded-full bg-slate-600 group-hover:bg-primary/90 flex items-center justify-center shadow-xl transition-colors duration-700">
                            <span className="text-5xl font-bold text-white/90 group-hover:text-white tracking-wide transition-colors duration-700">
                              {(member as { initials?: string }).initials || member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Name and Title - auto-height section at bottom */}
                  <div className="p-6 bg-[rgb(var(--color-surface-card))] relative z-20">
                    <h3 className="text-2xl font-bold text-[rgb(var(--color-text-main))]">
                      {member.name}
                    </h3>
                    <p className="text-sm font-bold uppercase tracking-wider text-[rgb(var(--color-text-muted))] mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Hover State - Slide up panel covering full card with transparency */}
                <motion.div
                  className="absolute inset-0 bg-primary/90 backdrop-blur-sm text-white p-6 pt-16 flex flex-col justify-start"
                  initial={{ y: "100%" }}
                  animate={{
                    y: hoveredTeamMember === index ? 0 : "100%"
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                  }}
                >
                  <div className="absolute top-4 right-4 opacity-30">
                    <span className="material-symbols-outlined text-3xl">
                      {member.icon}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-white/80 text-sm font-bold uppercase tracking-wider mb-4">
                    {member.role}
                  </p>
                  <div className="w-10 h-0.5 bg-white/30 mb-4 rounded-full" />
                  <p className="text-base leading-relaxed font-medium mb-4">
                    &quot;{member.quote}&quot;
                  </p>
                  <ul className="space-y-2 text-sm text-white/90">
                    {member.badges.map((badge, badgeIndex) => (
                      <li key={badgeIndex} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">
                          check_circle
                        </span>
                        {badge}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </section>

      {/* Visual Gallery - Dev Only (pending more images) */}
      {isDev && <AboutGallery />}

      {/* CTA Section - Matching Landing Page Design */}
      <section ref={ctaRef} className="relative z-10 py-24 px-4 bg-[rgb(var(--color-surface-card))] transition-colors duration-300">
        <motion.div
          className="max-w-6xl mx-auto bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          whileHover={{ scale: 1.01 }}
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
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to grow with us?
            </motion.h2>
            <motion.p
              className="text-xl text-white/90 max-w-2xl font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Whether you&apos;re protecting your family or transforming your retail space into a
              revenue stream, we&apos;re here to help you move forward.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <MagneticButton strength={0.3}>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/quote"
                    className="block bg-white text-primary text-lg font-bold py-4 px-10 rounded-lg hover:bg-gray-50 transition-colors shadow-xl hover:shadow-2xl"
                  >
                    Get Your Free Quote
                  </Link>
                </motion.div>
              </MagneticButton>
              <MagneticButton strength={0.3}>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/partners"
                    className="block bg-[rgb(var(--color-primary-hover))] border border-white/20 text-white text-lg font-bold py-4 px-10 rounded-lg hover:bg-black/20 transition-colors"
                  >
                    Become a Partner
                  </Link>
                </motion.div>
              </MagneticButton>
            </motion.div>

            <motion.p
              className="text-sm text-white/70 mt-2 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="material-symbols-outlined text-sm">lock</span>
              Secure & Confidential. No spam.
            </motion.p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
