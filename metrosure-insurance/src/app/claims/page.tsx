"use client";

import Link from "next/link";
import { Header, Footer, ScrollToTop } from "@/components";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

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

const claimTypes = [
  {
    id: "auto",
    icon: "directions_car",
    title: "Car Insurance",
    description: "Accidents, theft, or damage to your vehicle",
    documents: [
      "Copy of your ID document",
      "Police case number (if applicable)",
      "Photos of damage",
      "Accident report form",
      "Quote for repairs",
    ],
  },
  {
    id: "home",
    icon: "home",
    title: "Home Insurance",
    description: "Property damage, theft, or liability claims",
    documents: [
      "Copy of your ID document",
      "Police case number (for theft/burglary)",
      "Photos of damage or missing items",
      "List of items claimed with values",
      "Proof of ownership (receipts, photos)",
    ],
  },
  {
    id: "life",
    icon: "favorite",
    title: "Life & Funeral",
    description: "Death, disability, or funeral cover claims",
    documents: [
      "Certified copy of death certificate",
      "Certified copy of deceased's ID",
      "Certified copy of claimant's ID",
      "Bank statement (for payment)",
      "Completed claim form",
    ],
  },
  {
    id: "business",
    icon: "business",
    title: "Business Insurance",
    description: "Commercial property, liability, or fleet claims",
    documents: [
      "Company registration documents",
      "Incident report",
      "Police case number (if applicable)",
      "Photos and evidence of loss",
      "Supporting financial documents",
    ],
  },
];

const claimSteps = [
  {
    number: "01",
    icon: "phone_in_talk",
    title: "Report Your Claim",
    description: "Contact us immediately to report your incident. Have your policy number ready.",
  },
  {
    number: "02",
    icon: "description",
    title: "Gather Documents",
    description: "Collect all required documents based on your claim type. We'll guide you.",
  },
  {
    number: "03",
    icon: "upload_file",
    title: "Submit Documentation",
    description: "Send your documents to us via email or bring them to our nearest office.",
  },
  {
    number: "04",
    icon: "fact_check",
    title: "Assessment",
    description: "The insurer assesses your claim. We advocate on your behalf throughout.",
  },
  {
    number: "05",
    icon: "payments",
    title: "Settlement",
    description: "Once approved, your claim is settled according to your policy terms.",
  },
];

const emergencyContacts = [
  {
    icon: "local_police",
    title: "Police",
    number: "10111",
    description: "Report theft, accidents, or criminal incidents",
  },
  {
    icon: "local_hospital",
    title: "Ambulance",
    number: "10177",
    description: "Medical emergencies",
  },
  {
    icon: "local_fire_department",
    title: "Fire",
    number: "10111",
    description: "Fire emergencies",
  },
];

export default function ClaimsPage() {
  const [selectedClaimType, setSelectedClaimType] = useState<string | null>(null);
  const heroRef = useRef(null);
  const processRef = useRef(null);
  const typesRef = useRef(null);
  const formRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const processInView = useInView(processRef, { once: true, margin: "-50px" });
  const typesInView = useInView(typesRef, { once: true, margin: "-50px" });
  const formInView = useInView(formRef, { once: true, margin: "-50px" });

  const selectedType = claimTypes.find((type) => type.id === selectedClaimType);

  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen relative">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white_80%,transparent)] pointer-events-none opacity-10 animate-[grid-flow_20s_linear_infinite] z-0" />
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none z-0" />

      <Header />

      <main className="relative z-10">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-56 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[rgb(var(--color-secondary))]/5" />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Breadcrumb */}
              <motion.nav
                className="flex items-center gap-2 text-sm text-[rgb(var(--color-text-muted))] mb-6"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-[rgb(var(--color-text-main))]">File a Claim</span>
              </motion.nav>

              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="material-symbols-outlined text-sm">assignment</span>
                Claims
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                File a Claim
              </motion.h1>
              <motion.p
                className="text-xl text-[rgb(var(--color-text-body))] leading-relaxed mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                We&apos;re here to help when you need us most. Each portfolio manager is backed by
                dedicated claims staff to ensure your claim is processed quickly and fairly.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <a
                  href="tel:+27313011192"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-[rgb(var(--color-primary-hover))] transition-all h-14 px-8 text-white font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 text-lg"
                >
                  <span className="material-symbols-outlined">call</span>
                  +27 31 301 1192
                </a>
                <a
                  href="mailto:claims@metrosuregroup.co.za"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[rgb(var(--color-border-light))] hover:border-primary transition-all h-14 px-8 text-[rgb(var(--color-text-main))] text-lg font-bold hover:text-primary"
                >
                  <span className="material-symbols-outlined">mail</span>
                  Email Claims
                </a>
              </motion.div>
            </motion.div>

            {/* Emergency Contacts Card */}
            <motion.div
              className="bg-[rgb(var(--color-surface-card))] rounded-2xl border border-[rgb(var(--color-border-light))] p-8"
              initial={{ opacity: 0, x: 40 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-red-500">emergency</span>
                </div>
                <h3 className="text-lg font-bold text-[rgb(var(--color-text-main))]">
                  Emergency Contacts
                </h3>
              </div>
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[rgb(var(--color-surface-card))] flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl text-[rgb(var(--color-text-muted))]">
                        {contact.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[rgb(var(--color-text-main))]">{contact.title}</p>
                      <p className="text-xs text-[rgb(var(--color-text-muted))]">{contact.description}</p>
                    </div>
                    <a
                      href={`tel:${contact.number}`}
                      className="text-xl font-bold text-primary"
                    >
                      {contact.number}
                    </a>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[rgb(var(--color-text-muted))] mt-4 text-center">
                Always prioritise safety. Call emergency services first if needed.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Claims Process */}
      <section ref={processRef} className="py-20 bg-[rgb(var(--color-surface-card))]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-main))] mb-4">
              The Claims Process
            </h2>
            <p className="text-lg text-[rgb(var(--color-text-body))] max-w-2xl mx-auto">
              We make filing a claim as simple as possible. Here&apos;s what to expect.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
          >
            {claimSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative text-center"
                variants={itemVariants}
              >
                {/* Connector Line */}
                {index < claimSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-[rgb(var(--color-border-light))]" />
                )}

                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                    <span className="material-symbols-outlined text-3xl text-primary">
                      {step.icon}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-primary mb-2 block">{step.number}</span>
                  <h3 className="font-bold text-[rgb(var(--color-text-main))] mb-2">{step.title}</h3>
                  <p className="text-sm text-[rgb(var(--color-text-body))]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Claim Types */}
      <section ref={typesRef} className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={typesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-main))] mb-4">
              What type of claim?
            </h2>
            <p className="text-lg text-[rgb(var(--color-text-body))]">
              Select your claim type to see the required documents
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate={typesInView ? "visible" : "hidden"}
          >
            {claimTypes.map((type) => (
              <motion.button
                key={type.id}
                onClick={() => setSelectedClaimType(selectedClaimType === type.id ? null : type.id)}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  selectedClaimType === type.id
                    ? "border-primary bg-primary/5"
                    : "border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface-card))] hover:border-primary/50"
                }`}
                variants={itemVariants}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    selectedClaimType === type.id ? "bg-primary" : "bg-primary/10"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-2xl transition-colors ${
                      selectedClaimType === type.id ? "text-white" : "text-primary"
                    }`}
                  >
                    {type.icon}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[rgb(var(--color-text-main))] mb-2">
                  {type.title}
                </h3>
                <p className="text-sm text-[rgb(var(--color-text-body))]">{type.description}</p>
              </motion.button>
            ))}
          </motion.div>

          {/* Required Documents */}
          <AnimatePresence>
            {selectedType && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-8 rounded-2xl bg-[rgb(var(--color-surface-card))] border border-primary/20">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-2xl text-primary">
                      checklist
                    </span>
                    <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))]">
                      Required Documents for {selectedType.title} Claim
                    </h3>
                  </div>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {selectedType.documents.map((doc, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-[rgb(var(--color-text-body))]"
                      >
                        <span className="material-symbols-outlined text-primary mt-0.5">
                          check_circle
                        </span>
                        {doc}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-[rgb(var(--color-text-muted))] mt-6">
                    Additional documents may be required depending on your specific circumstances.
                    Contact us for guidance.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Contact Form CTA */}
      <section ref={formRef} className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to File Your Claim?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Contact our dedicated claims team. We&apos;ll guide you through every step of the process.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto mb-8">
              <a
                href="tel:+27313011192"
                className="flex items-center justify-center gap-3 p-6 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <span className="material-symbols-outlined text-2xl">call</span>
                <div className="text-left">
                  <p className="text-sm text-white/70">Call us</p>
                  <p className="font-bold">+27 31 301 1192</p>
                </div>
              </a>
              <a
                href="mailto:claims@metrosuregroup.co.za"
                className="flex items-center justify-center gap-3 p-6 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <span className="material-symbols-outlined text-2xl">mail</span>
                <div className="text-left">
                  <p className="text-sm text-white/70">Email us</p>
                  <p className="font-bold">claims@metrosuregroup.co.za</p>
                </div>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-primary hover:bg-gray-100 transition-all h-12 px-8 font-bold"
              >
                Contact Us
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link
                href="/help"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 hover:border-white/50 transition-all h-12 px-8 font-bold"
              >
                Help Center
              </Link>
            </div>

            <p className="text-sm text-white/60 mt-8">
              Business hours: Mon-Fri 8am-5pm, Sat 8am-1pm SAST
            </p>
          </motion.div>
        </div>
      </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
