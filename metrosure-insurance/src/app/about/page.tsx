"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { Header, Footer } from "@/components";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MagneticButton } from "@/components/animations";
import {
  companyStats as stats,
  coreValues as values,
  companyTimeline as timeline,
  executiveTeam as team,
} from "@/data/aboutPage";

// Gallery components temporarily removed - will be reimplemented
// const GalleryInstagram = dynamic(() => import("@/components/about/GalleryInstagram"));
// const GalleryFloating = dynamic(() => import("@/components/about/GalleryFloating"));

// Session 103: Using TimelineOriginal directly (user selected over Alternating)
import { TimelineOriginal } from "@/components/about/timeline-variants";

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
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
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
                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-2xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] hover:border-primary/30 transition-colors duration-300 group"
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    {value.icon}
                  </span>
                </div>
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

      {/* Timeline Section - Original variant (Session 103 selection) */}
      <TimelineOriginal items={timeline} />

      {/* Team Section - Simplified (ThoughtFarmer-inspired) */}
      <section ref={teamRef} className="relative z-10 py-32 bg-[rgb(var(--color-surface-card))]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="flex flex-col gap-6 mb-16 items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgb(var(--color-text-main))]"
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our Leadership
            </motion.h2>
            <motion.p
              className="text-xl text-[rgb(var(--color-text-muted))] max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              The strategic minds guiding Metrosure forward.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
              >
                <motion.div
                  className="bg-[rgb(var(--color-surface))] rounded-2xl overflow-hidden border border-[rgb(var(--color-border-light))] hover:border-primary/30 transition-colors"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div
                      className="w-full h-full bg-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: member.image ? `url("${member.image}")` : 'none',
                        backgroundPosition: 'center 15%',
                        backgroundColor: !member.image ? '#475569' : undefined
                      }}
                    >
                      {!member.image && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-slate-600 flex items-center justify-center">
                            <span className="text-4xl font-bold text-white">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content - Always visible */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium uppercase tracking-wider text-[rgb(var(--color-text-muted))] mt-1 mb-4">
                      {member.role}
                    </p>
                    <p className="text-[rgb(var(--color-text-body))] italic leading-relaxed">
                      &quot;{member.quote}&quot;
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery components temporarily removed - will be reimplemented */}

      {/* CTA Section - Simplified */}
      <section ref={ctaRef} className="relative z-10 py-32 px-4 bg-[rgb(var(--color-surface-card))] transition-colors duration-300">
        <motion.div
          className="max-w-4xl mx-auto bg-primary rounded-3xl p-12 md:p-16 text-center relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Subtle gradient overlay only */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to grow with us?
            </motion.h2>
            <motion.p
              className="text-xl text-white/90 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Whether you&apos;re protecting your family or partnering with us, we&apos;re here to help.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/quote"
                  className="block bg-white text-primary text-lg font-bold py-4 px-10 rounded-xl shadow-lg"
                >
                  Get Your Free Quote
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/partners"
                  className="block bg-white/10 border border-white/20 text-white text-lg font-bold py-4 px-10 rounded-xl backdrop-blur-sm"
                >
                  Become a Partner
                </Link>
              </motion.div>
            </motion.div>

            <motion.p
              className="text-sm text-white/60 mt-4 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className="material-symbols-outlined text-sm">verified</span>
              FSP 47089 | Authorised Financial Service Provider
            </motion.p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
