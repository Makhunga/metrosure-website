"use client";

import Link from "next/link";
import { Header, Footer, ScrollToTop } from "@/components";
import { useRef } from "react";
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
  hidden: { opacity: 0, y: 20 },
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

// Sample policy data for UI mockup
const samplePolicies = [
  {
    type: "Car Insurance",
    icon: "directions_car",
    policyNumber: "AUTO-2024-XXXXX",
    status: "Active",
    statusColor: "bg-green-500",
    insurer: "King Price Insurance",
    renewalDate: "15 Mar 2026",
    premium: "R 1,250.00",
  },
  {
    type: "Home Insurance",
    icon: "home",
    policyNumber: "HOME-2024-XXXXX",
    status: "Active",
    statusColor: "bg-green-500",
    insurer: "MiWay",
    renewalDate: "22 Jun 2025",
    premium: "R 850.00",
  },
  {
    type: "Life Cover",
    icon: "favorite",
    policyNumber: "LIFE-2023-XXXXX",
    status: "Active",
    statusColor: "bg-green-500",
    insurer: "Liberty",
    renewalDate: "01 Jan 2026",
    premium: "R 450.00",
  },
];

const features = [
  {
    icon: "visibility",
    title: "View All Policies",
    description: "See all your insurance policies in one place",
  },
  {
    icon: "receipt_long",
    title: "Download Documents",
    description: "Access policy schedules, certificates, and invoices",
  },
  {
    icon: "edit_note",
    title: "Request Changes",
    description: "Update your details or modify your cover",
  },
  {
    icon: "payments",
    title: "Payment History",
    description: "Track your premium payments and invoices",
  },
  {
    icon: "notifications",
    title: "Renewal Alerts",
    description: "Never miss a renewal date with automatic reminders",
  },
  {
    icon: "support_agent",
    title: "Direct Support",
    description: "Chat with your portfolio manager instantly",
  },
];

export default function PoliciesPage() {
  const heroRef = useRef(null);
  const dashboardRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const dashboardInView = useInView(dashboardRef, { once: true, margin: "-50px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-50px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });

  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen relative">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white_80%,transparent)] pointer-events-none opacity-10 animate-[grid-flow_20s_linear_infinite] z-0" />
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none z-0" />

      <Header />

      <main className="relative z-10">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-56 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[rgb(var(--color-secondary))]/5" />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Breadcrumb */}
            <motion.nav
              className="flex items-center justify-center gap-2 text-sm text-[rgb(var(--color-text-muted))] mb-6"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[rgb(var(--color-text-main))]">Policy Management</span>
            </motion.nav>

            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="material-symbols-outlined text-sm">folder_managed</span>
              Policy Dashboard
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Manage Your Policies
            </motion.h1>
            <motion.p
              className="text-xl text-[rgb(var(--color-text-body))] leading-relaxed mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              View all your insurance policies, download documents, and manage your cover,
              all in one convenient place.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-[rgb(var(--color-primary-hover))] transition-all h-14 px-8 text-white font-bold shadow-md shadow-primary/20 text-lg"
              >
                <span className="material-symbols-outlined">login</span>
                Login to View Policies
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[rgb(var(--color-border-light))] hover:border-primary transition-all h-14 px-8 text-[rgb(var(--color-text-main))] font-bold hover:text-primary"
              >
                Contact Support
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview (UI Mockup) */}
      <section ref={dashboardRef} className="py-16 bg-[rgb(var(--color-surface-card))]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={dashboardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          >
            <h2 className="text-2xl font-bold text-[rgb(var(--color-text-main))] mb-2">
              Your Policies at a Glance
            </h2>
            <p className="text-[rgb(var(--color-text-muted))]">
              Preview of your policy dashboard (login required to view your actual policies)
            </p>
          </motion.div>

          {/* Blurred Dashboard Preview */}
          <motion.div
            className="relative rounded-2xl overflow-hidden border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))]"
            initial={{ opacity: 0, y: 20 }}
            animate={dashboardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            {/* Header Bar */}
            <div className="p-6 border-b border-[rgb(var(--color-border-light))] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">person</span>
                </div>
                <div>
                  <p className="font-bold text-[rgb(var(--color-text-main))]">Welcome back!</p>
                  <p className="text-sm text-[rgb(var(--color-text-muted))]">You have 3 active policies</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-[rgb(var(--color-text-muted))]">
                  notifications
                </span>
                <span className="material-symbols-outlined text-[rgb(var(--color-text-muted))]">
                  settings
                </span>
              </div>
            </div>

            {/* Policy Cards */}
            <div className="p-6 relative">
              {/* Blur Overlay */}
              <div className="absolute inset-0 bg-[rgb(var(--color-surface))]/60 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center p-8 bg-[rgb(var(--color-surface-card))] rounded-2xl border border-[rgb(var(--color-border-light))] shadow-xl">
                  <span className="material-symbols-outlined text-5xl text-primary mb-4 block">
                    lock
                  </span>
                  <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-2">
                    Login Required
                  </h3>
                  <p className="text-[rgb(var(--color-text-body))] mb-6">
                    Sign in to view and manage your policies
                  </p>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-[rgb(var(--color-primary-hover))] transition-all h-12 px-8 text-white font-bold"
                  >
                    <span className="material-symbols-outlined">login</span>
                    Login Now
                  </Link>
                </div>
              </div>

              {/* Sample Policy Cards (blurred behind overlay) */}
              <motion.div
                className="grid md:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate={dashboardInView ? "visible" : "hidden"}
              >
                {samplePolicies.map((policy, index) => (
                  <motion.div
                    key={index}
                    className="p-6 rounded-xl border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface-card))]"
                    variants={itemVariants}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl text-primary">
                          {policy.icon}
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold text-white ${policy.statusColor}`}
                      >
                        {policy.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-[rgb(var(--color-text-main))] mb-1">
                      {policy.type}
                    </h3>
                    <p className="text-xs text-[rgb(var(--color-text-muted))] mb-4">
                      {policy.policyNumber}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[rgb(var(--color-text-muted))]">Insurer</span>
                        <span className="text-[rgb(var(--color-text-main))]">{policy.insurer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[rgb(var(--color-text-muted))]">Renewal</span>
                        <span className="text-[rgb(var(--color-text-main))]">{policy.renewalDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[rgb(var(--color-text-muted))]">Premium</span>
                        <span className="font-bold text-primary">{policy.premium}/mo</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          >
            <h2 className="text-3xl font-bold text-[rgb(var(--color-text-main))] mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-[rgb(var(--color-text-body))]">
              Manage your insurance with ease
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-primary/50 hover:shadow-lg transition-all group"
                variants={itemVariants}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-2xl text-primary group-hover:text-white transition-colors">
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[rgb(var(--color-text-main))] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[rgb(var(--color-text-body))]">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Don't Have an Account? */}
      <section ref={ctaRef} className="py-20 bg-[rgb(var(--color-surface-card))]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          >
            <h2 className="text-3xl font-bold text-[rgb(var(--color-text-main))] mb-4">
              Don&apos;t have an account?
            </h2>
            <p className="text-lg text-[rgb(var(--color-text-body))] mb-8">
              If you&apos;re already a Metrosure client but haven&apos;t set up your online account,
              contact us and we&apos;ll help you get started.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
              <div className="p-6 rounded-2xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))]">
                <span className="material-symbols-outlined text-3xl text-primary mb-4 block">
                  person_add
                </span>
                <h3 className="font-bold text-[rgb(var(--color-text-main))] mb-2">New Client?</h3>
                <p className="text-sm text-[rgb(var(--color-text-body))] mb-4">
                  Get a quote and become a Metrosure client
                </p>
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-[rgb(var(--color-primary-hover))] transition-all h-10 px-6 text-white font-bold text-sm"
                >
                  Get a Quote
                </Link>
              </div>
              <div className="p-6 rounded-2xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))]">
                <span className="material-symbols-outlined text-3xl text-primary mb-4 block">
                  support_agent
                </span>
                <h3 className="font-bold text-[rgb(var(--color-text-main))] mb-2">
                  Existing Client?
                </h3>
                <p className="text-sm text-[rgb(var(--color-text-body))] mb-4">
                  Contact us to set up your online access
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[rgb(var(--color-border-light))] hover:border-primary transition-all h-10 px-6 text-[rgb(var(--color-text-main))] font-bold text-sm hover:text-primary"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
