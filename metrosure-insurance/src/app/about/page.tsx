"use client";

import Link from "next/link";
import { Header, Footer, ScrollToTop } from "@/components";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

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

const stats = [
  { value: "5000+", label: "Jobs Created" },
  { value: "2016", label: "Established" },
  { value: "5", label: "Offices Nationwide" },
  { value: "30+", label: "Insurance Partners" },
];

const values = [
  {
    icon: "groups",
    title: "Respect",
    description:
      "We acknowledge that everyone has a unique role. No one person is more important than another, we value your story and treat you as an individual.",
  },
  {
    icon: "workspace_premium",
    title: "Quality",
    description:
      "We always strive to achieve the best. You deserve the best advice and the best service, every single time.",
  },
  {
    icon: "favorite",
    title: "Passion",
    description:
      "We are passionate about what we do. This isn't just a job for us, it's our purpose to help you and your family feel secure.",
  },
  {
    icon: "handshake",
    title: "Integrity",
    description:
      "We do the right thing no matter who is watching. Honesty is at the heart of everything we do.",
  },
  {
    icon: "star",
    title: "Excellence",
    description:
      "We strive to excel at everything we do. Good enough isn't enough, we push ourselves to go above and beyond for you.",
  },
];

const timeline = [
  {
    icon: "flag",
    year: "2016",
    number: "16",
    title: "The Beginning",
    description:
      "Metrosure Insurance Brokers was founded in Durban by BG Chiliza with a vision to take the company to a formidable position in the South African market.",
  },
  {
    icon: "verified",
    year: "2017",
    number: "17",
    title: "FSP Authorisation",
    description:
      "Became an Authorised Financial Service Provider (FSP 47089), regulated by the Financial Services Conduct Authority.",
  },
  {
    icon: "location_on",
    year: "2020",
    number: "20",
    title: "National Expansion",
    description:
      "Expanded across South Africa with regional offices in Johannesburg, Pretoria, Pietermaritzburg, Bloemfontein, and more.",
  },
  {
    icon: "storefront",
    year: "2022",
    number: "22",
    title: "100+ Retail Partners",
    description:
      "Reached a milestone of 100+ retail partnerships across South Africa, creating employment opportunities in local communities.",
  },
  {
    icon: "groups",
    year: "2025",
    number: "25",
    title: "5,000+ Jobs Created",
    description:
      "Proud to have created over 5,000 employment opportunities through our retail partnership programme, with a commitment to grow even more.",
    isSpecial: true,
  },
];

const team = [
  {
    name: "BG Chiliza",
    role: "Managing Director",
    image: "",
    quote: "We're taking South Africa to the future, building a company known for consistency, reliability and integrity.",
    icon: "format_quote",
    badges: ["Founder & Visionary", "Financial Services Expert", "Community Builder"],
  },
  {
    name: "FP Tshabalala",
    role: "Executive Director",
    image: "",
    quote: "Our success is measured by the families and businesses we help protect every day.",
    icon: "trending_up",
    badges: ["Strategic Leadership", "Insurance Industry Veteran", "Growth Driver"],
  },
  {
    name: "S Basi",
    role: "Chief Financial Officer",
    image: "",
    quote: "Sound financial management is the foundation that lets us serve our clients with confidence.",
    icon: "account_balance",
    badges: ["Financial Governance", "Risk Management", "Corporate Finance"],
  },
];

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
      {/* Animated Grid Background */}
      <div className="fixed inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white_80%,transparent)] pointer-events-none opacity-30 animate-[grid-flow_20s_linear_infinite] z-0" />
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none z-0" />

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
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-[rgb(var(--color-primary-hover))] transition-all h-12 px-8 text-white font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
                >
                  Get a Quote
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all h-12 px-8 text-white font-bold"
                >
                  Contact Us
                </Link>
              </motion.div>
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
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
              >
                <span className="material-symbols-outlined text-base">storefront</span>
                <span>Own a retail space? <span className="font-semibold underline">Partner with us</span></span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Light Style (Matching Home Page) */}
      <section ref={statsRef} className="border-y border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] overflow-hidden">
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

      {/* Mission Section - Keep Current */}
      <section ref={missionRef} className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-main))] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Our Mission
              </motion.h2>
              <motion.p
                className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                To always comply with the quality standards of our profession.
                Where our people are known for their innovativeness and problem-solving abilities.
              </motion.p>
              <motion.p
                className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                We&apos;re not just another insurance company. We&apos;re a team of dedicated South Africans
                who genuinely care about your wellbeing. Each portfolio manager is backed by
                dedicated claims and underwriting staff, so your instructions are processed effectively.
              </motion.p>
              <motion.p
                className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Whether you&apos;re protecting your car and home, planning for retirement, or
                looking after your employees, we&apos;re here to help you move forward with confidence.
              </motion.p>
              <motion.p
                className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                But we&apos;re more than just an insurance broker. Through our retail partnership programme,
                we&apos;ve created over 5,000 jobs across South Africa. We partner with store owners to bring
                insurance services into their communities, sharing revenue and creating local employment.
                When you partner with Metrosure, you&apos;re not just adding a service, you&apos;re building something that lasts.
              </motion.p>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              {/* Placeholder for mission image */}
              <motion.div
                className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-[rgb(var(--color-secondary))]/20 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
              >
                <span className="material-symbols-outlined text-[120px] text-primary/30">
                  shield_with_heart
                </span>
              </motion.div>
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-[rgb(var(--color-surface-card))] rounded-xl p-6 shadow-xl border border-[rgb(var(--color-border-light))]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={missionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.5, type: "spring" as const, stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      verified
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-[rgb(var(--color-text-main))]">
                      FSP 47089
                    </div>
                    <div className="text-xs text-[rgb(var(--color-text-muted))]">
                      Reg. 2016/113504/07
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-24 bg-[rgb(var(--color-surface-card))]">
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
      <section ref={timelineRef} className="py-24 md:py-32 bg-[rgb(var(--color-surface))]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            className="flex flex-col gap-6 mb-24 text-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase border border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={timelineInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              History
            </motion.span>
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
            {/* Vertical Line - stops at last item */}
            <motion.div
              className="absolute left-[40px] top-4 w-0.5 bg-[rgb(var(--color-border-light))]"
              style={{ height: 'calc(100% - 180px)' }}
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
                    className={`p-8 md:p-10 rounded-3xl border shadow-sm relative overflow-hidden transition-all duration-300 ${
                      item.isSpecial
                        ? "bg-[rgb(var(--color-surface-card))] border-primary/20 hover:border-primary/40"
                        : "bg-[rgb(var(--color-surface-card))] border-[rgb(var(--color-border-light))] hover:border-primary/30"
                    }`}
                    whileHover={{
                      y: -4,
                      boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                  >
                    <div className="absolute -right-4 -bottom-8 text-[120px] md:text-[150px] font-black select-none z-0 text-slate-200/60 dark:text-white/10 rotate-12 group-hover:rotate-0 group-hover:scale-110 group-hover:text-primary/20 dark:group-hover:text-primary/30 transition-all duration-500 ease-out origin-bottom-right">
                      {item.number}
                    </div>
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
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[rgb(var(--color-text-main))] group-hover:text-primary transition-colors duration-300">
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
      <section ref={teamRef} className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

        <motion.div
          className="flex flex-col gap-6 mb-20 items-center text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase border border-primary/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={teamInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The Team
          </motion.span>
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
                className="relative w-full h-full shadow-xl rounded-2xl overflow-hidden bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-primary/30 transition-all duration-300"
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(191, 6, 3, 0.25)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Front State */}
                <div className="absolute inset-0 flex flex-col h-full">
                  <div className="relative h-[75%] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      style={{ backgroundImage: `url("${member.image}")` }}
                    />
                    <div className="absolute bottom-4 left-4 z-20 text-white translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white mb-3 shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                        <span className="material-symbols-outlined text-xl">add</span>
                      </span>
                    </div>
                  </div>
                  <div className="h-[25%] p-6 flex flex-col justify-center bg-[rgb(var(--color-surface-card))] relative z-20">
                    <h3 className="text-2xl font-bold text-[rgb(var(--color-text-main))] group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-sm font-bold uppercase tracking-wider text-[rgb(var(--color-text-muted))] mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Hover State Overlay */}
                <div
                  className={`absolute inset-0 bg-primary/95 dark:bg-primary/90 backdrop-blur-sm flex flex-col justify-center p-8 text-white transform transition-all duration-500 ease-out ${
                    hoveredTeamMember === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8 pointer-events-none"
                  }`}
                >
                  <div className="absolute top-4 right-4 opacity-50">
                    <span className="material-symbols-outlined text-4xl">
                      {member.icon}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-white/80 text-sm font-bold uppercase tracking-wider mb-6">
                    {member.role}
                  </p>
                  <div className="w-12 h-1 bg-white/30 mb-6 rounded-full" />
                  <p className="text-lg leading-relaxed font-medium mb-6">
                    &quot;{member.quote}&quot;
                  </p>
                  <ul className="space-y-3 text-sm text-white/90">
                    {member.badges.map((badge, badgeIndex) => (
                      <li key={badgeIndex} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-base mt-0.5">
                          check_circle
                        </span>
                        {badge}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex gap-4">
                    <a
                      href="#"
                      className="p-2 bg-white/20 hover:bg-white hover:text-primary rounded-full transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl">link</span>
                    </a>
                    <a
                      href="#"
                      className="p-2 bg-white/20 hover:bg-white hover:text-primary rounded-full transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl">mail</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section - Matching Landing Page Design */}
      <section ref={ctaRef} className="py-24 px-4 bg-[rgb(var(--color-surface-card))] transition-colors duration-300">
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
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/quote"
                  className="block bg-white text-primary text-lg font-bold py-4 px-10 rounded-lg hover:bg-gray-50 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  Get Your Free Quote
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/partners"
                  className="block bg-[rgb(var(--color-primary-hover))] border border-white/20 text-white text-lg font-bold py-4 px-10 rounded-lg hover:bg-black/20 transition-colors"
                >
                  Become a Partner
                </Link>
              </motion.div>
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
      <ScrollToTop />
    </div>
  );
}
