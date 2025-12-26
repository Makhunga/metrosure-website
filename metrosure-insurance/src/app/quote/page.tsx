"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Header, Footer } from "@/components";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FormSuccess } from "@/components/ui/FormSuccess";

type CoverageType = "home" | "auto" | "life" | "business" | null;

interface FormData {
  // Step 1: Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  // Step 2: Coverage Type
  coverageType: CoverageType;
  // Step 3: Coverage Details
  coverageAmount: string;
  deductible: string;
  startDate: string;
  additionalCoverage: string[];
}

const coverageOptions = [
  {
    id: "home" as const,
    icon: "home",
    title: "Home & Property",
    description: "Protect your home, belongings, and liability",
    popular: false,
  },
  {
    id: "auto" as const,
    icon: "directions_car",
    title: "Auto & Vehicle",
    description: "Comprehensive coverage for cars, trucks, and motorcycles",
    popular: true,
  },
  {
    id: "life" as const,
    icon: "favorite",
    title: "Life & Health",
    description: "Secure your family's future with life insurance",
    popular: false,
  },
  {
    id: "business" as const,
    icon: "business",
    title: "Business",
    description: "Commercial insurance for businesses of all sizes",
    popular: false,
  },
];

const additionalCoverageOptions: Record<CoverageType & string, { id: string; label: string }[]> = {
  home: [
    { id: "flood", label: "Flood Protection" },
    { id: "earthquake", label: "Earthquake Coverage" },
    { id: "valuables", label: "Valuable Items" },
    { id: "liability", label: "Extended Liability" },
  ],
  auto: [
    { id: "roadside", label: "Roadside Assistance" },
    { id: "rental", label: "Rental Car Coverage" },
    { id: "gap", label: "Gap Insurance" },
    { id: "rideshare", label: "Rideshare Coverage" },
  ],
  life: [
    { id: "critical", label: "Critical Illness" },
    { id: "disability", label: "Disability Income" },
    { id: "accidental", label: "Accidental Death" },
    { id: "child", label: "Child Coverage" },
  ],
  business: [
    { id: "cyber", label: "Cyber Liability" },
    { id: "professional", label: "Professional Liability" },
    { id: "workers", label: "Workers Compensation" },
    { id: "equipment", label: "Equipment Breakdown" },
  ],
};

const faqs = [
  {
    question: "How long does it take to get a quote?",
    answer:
      "Most quotes are generated instantly after you complete the form. For complex business policies, our team may need 24-48 hours to provide an accurate estimate.",
  },
  {
    question: "Is my information secure?",
    answer:
      "Absolutely. We use bank-level 256-bit SSL encryption to protect your data. Your information is never sold or shared with third parties.",
  },
  {
    question: "Am I obligated to purchase after getting a quote?",
    answer:
      "No, getting a quote is completely free and comes with no obligation. Take your time to compare options and make the best decision for your needs.",
  },
  {
    question: "Can I customize my coverage?",
    answer:
      "Yes! Our quotes are fully customizable. You can adjust coverage amounts, deductibles, and add optional protections to fit your specific needs and budget.",
  },
];

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

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipCode: "",
    coverageType: null,
    coverageAmount: "",
    deductible: "",
    startDate: "",
    additionalCoverage: [],
  });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const heroRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  const steps = [
    { number: 1, title: "Personal Info", icon: "person" },
    { number: 2, title: "Coverage Type", icon: "shield" },
    { number: 3, title: "Details", icon: "tune" },
    { number: 4, title: "Review", icon: "check_circle" },
  ];

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit quote request");
      }

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const handleReset = useCallback(() => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      zipCode: "",
      coverageType: null,
      coverageAmount: "",
      deductible: "",
      startDate: "",
      additionalCoverage: [],
    });
    setCurrentStep(1);
    setIsSubmitted(false);
    setSubmitError(null);
  }, []);

  const toggleAdditionalCoverage = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalCoverage: prev.additionalCoverage.includes(id)
        ? prev.additionalCoverage.filter((c) => c !== id)
        : [...prev.additionalCoverage, id],
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone &&
          formData.zipCode
        );
      case 2:
        return formData.coverageType !== null;
      case 3:
        return formData.coverageAmount && formData.deductible && formData.startDate;
      default:
        return true;
    }
  };

  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen">
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-56 pb-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[rgb(var(--color-secondary))]/5" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="material-symbols-outlined text-sm">bolt</span>
              Quick & Easy
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--color-text-main))] mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Get Your Free Quote
            </motion.h1>
            <motion.p
              className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Protect what matters most in just a few minutes. Our streamlined process
              makes it easy to find the perfect coverage at competitive rates.
            </motion.p>

            {/* B2B Cross-link */}
            <motion.div
              className="mt-6 flex items-center justify-center gap-2 text-sm text-[rgb(var(--color-text-muted))]"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className="material-symbols-outlined text-base">storefront</span>
              <span>Are you a retailer?</span>
              <Link
                href="/partners"
                className="text-primary font-medium hover:underline inline-flex items-center gap-1"
              >
                Explore partnership opportunities
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            {[
              { icon: "verified_user", text: "256-bit SSL Encrypted" },
              { icon: "groups", text: "500,000+ Customers" },
              { icon: "star", text: "4.9/5 Rating" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 text-[rgb(var(--color-text-body))]"
                variants={itemVariants}
              >
                <span className="material-symbols-outlined text-primary">{item.icon}</span>
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="pb-24 pt-8">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between relative px-6">
              {/* Progress Line - starts and ends at step icon centers */}
              <div className="absolute top-6 left-12 right-12 h-0.5 bg-[rgb(var(--color-border-light))]" />
              <div
                className="absolute top-6 left-12 h-0.5 bg-primary transition-all duration-500"
                style={{ width: `${((currentStep - 1) / 3) * (100 - 8)}%` }}
              />

              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center z-10"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "bg-[rgb(var(--color-surface-card))] text-[rgb(var(--color-text-muted))] border-2 border-[rgb(var(--color-border-light))]"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <span className="material-symbols-outlined">check</span>
                    ) : (
                      <span className="material-symbols-outlined">{step.icon}</span>
                    )}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium hidden sm:block ${
                      currentStep >= step.number
                        ? "text-primary"
                        : "text-[rgb(var(--color-text-muted))]"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <motion.div
            className="bg-[rgb(var(--color-surface-card))] rounded-2xl shadow-xl border border-[rgb(var(--color-border-light))] overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-8 md:p-12">
              {isSubmitted ? (
                <FormSuccess
                  title="Quote Request Submitted!"
                  description="Thank you for your interest. One of our licensed advisors will review your requirements and contact you within 24 hours with a personalized quote."
                  buttonText="Request Another Quote"
                  onReset={handleReset}
                  accentColor="green"
                >
                  <motion.div
                    className="mb-8 p-4 bg-[rgb(var(--color-surface))] rounded-xl border border-[rgb(var(--color-border-light))]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <p className="text-sm text-[rgb(var(--color-text-muted))]">
                      A confirmation email has been sent to <strong className="text-[rgb(var(--color-text-main))]">{formData.email}</strong>
                    </p>
                  </motion.div>
                </FormSuccess>
              ) : (
              <>
              <AnimatePresence mode="wait">
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-[rgb(var(--color-text-main))] mb-2">
                    Personal Information
                  </h2>
                  <p className="text-[rgb(var(--color-text-body))] mb-8">
                    Let&apos;s start with some basic information to personalize your quote.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[rgb(var(--color-text-main))] mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => updateFormData({ firstName: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-main))] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[rgb(var(--color-text-main))] mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => updateFormData({ lastName: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-main))] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[rgb(var(--color-text-main))] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-main))] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[rgb(var(--color-text-main))] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData({ phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-main))] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="+27 XX XXX XXXX"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-[rgb(var(--color-text-main))] mb-2">
                        Area Code
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => updateFormData({ zipCode: e.target.value })}
                        className="w-full md:w-1/2 px-4 py-3 rounded-lg border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-main))] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="4001"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Coverage Type */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-[rgb(var(--color-text-main))] mb-2">
                    Choose Your Coverage
                  </h2>
                  <p className="text-[rgb(var(--color-text-body))] mb-8">
                    Select the type of insurance coverage you&apos;re looking for.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {coverageOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => updateFormData({ coverageType: option.id, additionalCoverage: [] })}
                        className={`relative p-6 rounded-xl border-2 text-left transition-all duration-300 group ${
                          formData.coverageType === option.id
                            ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-lg shadow-primary/10"
                            : "border-[rgb(var(--color-border-light))] hover:border-primary/50 hover:shadow-md"
                        }`}
                      >
                        {option.popular && (
                          <span className="absolute -top-3 right-4 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                            Popular
                          </span>
                        )}
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${
                            formData.coverageType === option.id
                              ? "bg-primary text-white"
                              : "bg-primary/10 text-primary group-hover:bg-primary/20"
                          }`}
                        >
                          <span className="material-symbols-outlined text-2xl">
                            {option.icon}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[rgb(var(--color-text-main))] mb-1">
                          {option.title}
                        </h3>
                        <p className="text-sm text-[rgb(var(--color-text-body))]">
                          {option.description}
                        </p>
                        {formData.coverageType === option.id && (
                          <div className="absolute top-4 right-4">
                            <span className="material-symbols-outlined text-primary text-2xl">
                              check_circle
                            </span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Coverage Details */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-[rgb(var(--color-text-main))] mb-2">
                    Customize Your Coverage
                  </h2>
                  <p className="text-[rgb(var(--color-text-body))] mb-8">
                    Adjust the details to match your specific needs.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-[rgb(var(--color-text-main))] mb-2">
                        Coverage Amount
                      </label>
                      <select
                        value={formData.coverageAmount}
                        onChange={(e) => updateFormData({ coverageAmount: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-main))] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      >
                        <option value="">Select coverage amount</option>
                        <option value="1000000">R1,000,000</option>
                        <option value="2500000">R2,500,000</option>
                        <option value="5000000">R5,000,000</option>
                        <option value="10000000">R10,000,000</option>
                        <option value="15000000">R15,000,000</option>
                        <option value="20000000">R20,000,000</option>
                        <option value="custom">Custom Amount</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[rgb(var(--color-text-main))] mb-2">
                        Excess
                      </label>
                      <select
                        value={formData.deductible}
                        onChange={(e) => updateFormData({ deductible: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-main))] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      >
                        <option value="">Select excess</option>
                        <option value="5000">R5,000 (Higher Premium)</option>
                        <option value="10000">R10,000 (Recommended)</option>
                        <option value="25000">R25,000 (Lower Premium)</option>
                        <option value="50000">R50,000 (Lowest Premium)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[rgb(var(--color-text-main))] mb-2">
                        Desired Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => updateFormData({ startDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-main))] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>

                    {formData.coverageType && additionalCoverageOptions[formData.coverageType] && (
                      <div>
                        <label className="block text-sm font-semibold text-[rgb(var(--color-text-main))] mb-4">
                          Additional Coverage (Optional)
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {additionalCoverageOptions[formData.coverageType].map((option) => (
                            <button
                              key={option.id}
                              onClick={() => toggleAdditionalCoverage(option.id)}
                              className={`p-3 rounded-lg border text-sm font-medium text-left transition-all ${
                                formData.additionalCoverage.includes(option.id)
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-[rgb(var(--color-border-light))] text-[rgb(var(--color-text-body))] hover:border-primary/50"
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">
                                  {formData.additionalCoverage.includes(option.id)
                                    ? "check_box"
                                    : "check_box_outline_blank"}
                                </span>
                                {option.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-[rgb(var(--color-text-main))] mb-2">
                    Review Your Quote Request
                  </h2>
                  <p className="text-[rgb(var(--color-text-body))] mb-8">
                    Please review your information before submitting.
                  </p>

                  <div className="space-y-6">
                    {/* Personal Info Summary */}
                    <div className="p-6 rounded-xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))]">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-[rgb(var(--color-text-main))] flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary">person</span>
                          Personal Information
                        </h3>
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="text-primary text-sm font-medium hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-[rgb(var(--color-text-muted))]">Name</span>
                          <p className="text-[rgb(var(--color-text-main))] font-medium">
                            {formData.firstName} {formData.lastName}
                          </p>
                        </div>
                        <div>
                          <span className="text-[rgb(var(--color-text-muted))]">Email</span>
                          <p className="text-[rgb(var(--color-text-main))] font-medium">
                            {formData.email}
                          </p>
                        </div>
                        <div>
                          <span className="text-[rgb(var(--color-text-muted))]">Phone</span>
                          <p className="text-[rgb(var(--color-text-main))] font-medium">
                            {formData.phone}
                          </p>
                        </div>
                        <div>
                          <span className="text-[rgb(var(--color-text-muted))]">Area Code</span>
                          <p className="text-[rgb(var(--color-text-main))] font-medium">
                            {formData.zipCode}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Coverage Summary */}
                    <div className="p-6 rounded-xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))]">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-[rgb(var(--color-text-main))] flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary">shield</span>
                          Coverage Details
                        </h3>
                        <button
                          onClick={() => setCurrentStep(2)}
                          className="text-primary text-sm font-medium hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-[rgb(var(--color-text-muted))]">Coverage Type</span>
                          <p className="text-[rgb(var(--color-text-main))] font-medium capitalize">
                            {coverageOptions.find((o) => o.id === formData.coverageType)?.title}
                          </p>
                        </div>
                        <div>
                          <span className="text-[rgb(var(--color-text-muted))]">Coverage Amount</span>
                          <p className="text-[rgb(var(--color-text-main))] font-medium">
                            R{Number(formData.coverageAmount).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-[rgb(var(--color-text-muted))]">Excess</span>
                          <p className="text-[rgb(var(--color-text-main))] font-medium">
                            R{Number(formData.deductible).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-[rgb(var(--color-text-muted))]">Start Date</span>
                          <p className="text-[rgb(var(--color-text-main))] font-medium">
                            {formData.startDate}
                          </p>
                        </div>
                        {formData.additionalCoverage.length > 0 && (
                          <div className="col-span-2">
                            <span className="text-[rgb(var(--color-text-muted))]">
                              Additional Coverage
                            </span>
                            <p className="text-[rgb(var(--color-text-main))] font-medium">
                              {formData.additionalCoverage
                                .map(
                                  (id) =>
                                    formData.coverageType &&
                                    additionalCoverageOptions[formData.coverageType]?.find(
                                      (o) => o.id === id
                                    )?.label
                                )
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <p className="text-sm text-[rgb(var(--color-text-body))]">
                        By submitting this form, you agree to our{" "}
                        <a href="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                        . A licensed agent will contact you to finalize your quote.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              </AnimatePresence>

              {/* Error Message */}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                    <span className="material-symbols-outlined">error</span>
                    <span className="font-medium">{submitError}</span>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-10 pt-8 border-t border-[rgb(var(--color-border-light))]">
                {currentStep > 1 ? (
                  <motion.button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[rgb(var(--color-border-light))] text-[rgb(var(--color-text-body))] font-medium hover:border-primary hover:text-primary transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back
                  </motion.button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <motion.button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all ${
                      canProceed()
                        ? "bg-primary text-white hover:bg-[rgb(var(--color-primary-hover))] shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                        : "bg-[rgb(var(--color-border-light))] text-[rgb(var(--color-text-muted))] cursor-not-allowed"
                    }`}
                    whileHover={canProceed() ? { scale: 1.02, y: -2 } : {}}
                    whileTap={canProceed() ? { scale: 0.98 } : {}}
                  >
                    Continue
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all ${
                      isSubmitting
                        ? "bg-primary/70 text-white/80 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-[rgb(var(--color-primary-hover))] shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                    }`}
                    whileHover={isSubmitting ? {} : { scale: 1.02, y: -2 }}
                    whileTap={isSubmitting ? {} : { scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined">send</span>
                        Submit Quote Request
                      </>
                    )}
                  </motion.button>
                )}
              </div>
              </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl font-bold text-[rgb(var(--color-text-main))] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              className="text-[rgb(var(--color-text-body))]"
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Have questions about getting a quote? We&apos;ve got answers.
            </motion.p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-[rgb(var(--color-surface-card))] rounded-xl border border-[rgb(var(--color-border-light))] overflow-hidden transition-all hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="flex justify-between items-center w-full p-6 text-left"
                >
                  <span className="font-semibold text-[rgb(var(--color-text-main))] pr-8">
                    {faq.question}
                  </span>
                  <motion.span
                    className="material-symbols-outlined text-primary"
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    expand_more
                  </motion.span>
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-6 pb-6 text-[rgb(var(--color-text-body))] leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Matching Home Page Style */}
      <section ref={ctaRef} className="pb-24 px-4">
        <motion.div
          className="max-w-6xl mx-auto bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={ctaInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Decorative Blurs */}
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
              initial={{ opacity: 0, y: 30 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Need Help Choosing?
            </motion.h2>
            <motion.p
              className="text-xl text-white/90 max-w-2xl font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Our licensed insurance advisors are here to help you find the perfect
              coverage. Schedule a free consultation today.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.a
                href="tel:+27313011192"
                className="bg-white text-primary text-lg font-bold py-4 px-10 rounded-lg shadow-xl flex items-center justify-center gap-2"
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="material-symbols-outlined">call</span>
                +27 31 301 1192
              </motion.a>
              <motion.a
                href="/contact"
                className="bg-[rgb(var(--color-primary-hover))] border border-white/20 text-white text-lg font-bold py-4 px-10 rounded-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="material-symbols-outlined">chat</span>
                Chat with Us
              </motion.a>
            </motion.div>

            <motion.p
              className="text-sm text-white/70 mt-2 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.span
                className="material-symbols-outlined text-sm"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                lock
              </motion.span>
              Secure & Confidential. No spam.
            </motion.p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
