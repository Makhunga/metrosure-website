"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { Header, Footer } from "@/components";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { MagneticButton } from "@/components/animations";
import { InputIcon } from "@/components/ui/InputIcon";
import { InlineError } from "@/components/ui/InlineError";
import { PriceBreakdown } from "@/components/quote/PriceBreakdown";
import {
  FieldState,
  FieldStates,
  validateEmail,
  validatePhone,
  validateRequired,
  validateFutureDate,
  getInputClassesWithIcon
} from "@/lib/formValidation";
import {
  calculatePremium,
  CoverageType as PricingCoverageType,
  PriceBreakdown as PriceBreakdownType,
} from "@/lib/quoteCalculator";
import { QuoteData, generateQuoteReference } from "@/lib/whatsapp";

type CoverageType = "home" | "auto" | "life" | "business" | null;
type CustomerType = "individual" | "business" | null;
type BusinessType = "retail" | "franchise" | "manufacturing" | "services" | "hospitality" | "healthcare" | "other" | "";
type EmployeeRange = "1-10" | "11-50" | "51-200" | "201-500" | "500+" | "";

interface FormData {
  // Step 1: Customer Type
  customerType: CustomerType;
  // Step 2: Business Info (only for business customers)
  companyName: string;
  businessType: BusinessType;
  numberOfEmployees: EmployeeRange;
  industry: string;
  // Step 3: Contact Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  // Step 4: Coverage Type
  coverageType: CoverageType;
  // Step 5: Coverage Details
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
    popular: false,
  },
  {
    id: "life" as const,
    icon: "favorite",
    title: "Life & Funeral",
    description: "Secure your family's future with life and funeral cover",
    popular: true,
  },
  {
    id: "business" as const,
    icon: "business",
    title: "Business",
    description: "Commercial insurance for businesses of all sizes",
    popular: false,
  },
];

const customerTypeOptions = [
  {
    id: "individual" as const,
    icon: "person",
    title: "Personal Quote",
    description: "I'm getting insurance for myself or my family",
  },
  {
    id: "business" as const,
    icon: "business",
    title: "Business Quote",
    description: "I need coverage for my company or employees",
  },
];

const businessTypeOptions = [
  { id: "retail", label: "Retail Store" },
  { id: "franchise", label: "Franchise" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "services", label: "Professional Services" },
  { id: "hospitality", label: "Hospitality" },
  { id: "healthcare", label: "Healthcare" },
  { id: "other", label: "Other" },
];

const employeeRangeOptions = [
  { id: "1-10", label: "1-10 employees" },
  { id: "11-50", label: "11-50 employees" },
  { id: "51-200", label: "51-200 employees" },
  { id: "201-500", label: "201-500 employees" },
  { id: "500+", label: "500+ employees" },
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
    category: "Process",
  },
  {
    question: "Is my information secure?",
    answer:
      "Absolutely. We use bank-level 256-bit SSL encryption to protect your data. Your information is never sold or shared with third parties.",
    category: "Security",
  },
  {
    question: "Am I obligated to purchase after getting a quote?",
    answer:
      "No, getting a quote is completely free and comes with no obligation. Take your time to compare options and make the best decision for your needs.",
    category: "Pricing",
  },
  {
    question: "Can I customise my coverage?",
    answer:
      "Yes! Our quotes are fully customizable. You can adjust coverage amounts, deductibles, and add optional protections to fit your specific needs and budget.",
    category: "Coverage",
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
    customerType: null,
    companyName: "",
    businessType: "",
    numberOfEmployees: "",
    industry: "",
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

  // Calculate total steps based on customer type (5 for individual, 6 for business)
  const totalSteps = formData.customerType === "business" ? 6 : 5;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldStates, setFieldStates] = useState<FieldStates>({});
  const [quoteReference, setQuoteReference] = useState<string>("");

  // Calculate price breakdown based on form data
  const priceBreakdown = useMemo<PriceBreakdownType | null>(() => {
    if (!formData.coverageType || !formData.coverageAmount || !formData.deductible) {
      return null;
    }

    return calculatePremium({
      coverageType: formData.coverageType as PricingCoverageType,
      coverageAmount: parseInt(formData.coverageAmount) || 0,
      deductible: parseInt(formData.deductible) || 0,
      additionalCoverage: formData.additionalCoverage,
    });
  }, [formData.coverageType, formData.coverageAmount, formData.deductible, formData.additionalCoverage]);

  // Generate quote data for WhatsApp sharing
  const quoteData = useMemo<QuoteData | undefined>(() => {
    if (!priceBreakdown || !formData.coverageType || !quoteReference) {
      return undefined;
    }

    return {
      referenceNumber: quoteReference,
      coverageType: formData.coverageType as PricingCoverageType,
      estimatedPremium: priceBreakdown.total,
      firstName: formData.firstName,
      coverageAmount: parseInt(formData.coverageAmount) || undefined,
      additionalCoverage: formData.additionalCoverage.length > 0 ? formData.additionalCoverage : undefined,
    };
  }, [priceBreakdown, formData.coverageType, formData.firstName, formData.coverageAmount, formData.additionalCoverage, quoteReference]);
  const heroRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  // Dynamic steps based on customer type
  const steps = useMemo(() => {
    const baseSteps = [
      { number: 1, title: "Quote Type", icon: "category" },
    ];

    if (formData.customerType === "business") {
      return [
        ...baseSteps,
        { number: 2, title: "Business Info", icon: "business" },
        { number: 3, title: "Contact Info", icon: "person" },
        { number: 4, title: "Coverage", icon: "shield" },
        { number: 5, title: "Details", icon: "tune" },
        { number: 6, title: "Review", icon: "check_circle" },
      ];
    }

    return [
      ...baseSteps,
      { number: 2, title: "Contact Info", icon: "person" },
      { number: 3, title: "Coverage", icon: "shield" },
      { number: 4, title: "Details", icon: "tune" },
      { number: 5, title: "Review", icon: "check_circle" },
    ];
  }, [formData.customerType]);

  // Update field validation state
  const validateField = useCallback((fieldName: string, value: string, validator: (val: string) => string | null) => {
    const error = validator(value);
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: {
        touched: true,
        error,
        valid: error === null && value.length > 0
      }
    }));
    return error === null;
  }, []);

  // Get field state helper
  const getFieldState = (fieldName: string): FieldState => {
    return fieldStates[fieldName] || { touched: false, error: null, valid: false };
  };

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Get the actual step content based on current step and customer type
  const getStepContent = () => {
    if (currentStep === 1) return "customerType";

    if (formData.customerType === "business") {
      switch (currentStep) {
        case 2: return "businessInfo";
        case 3: return "contactInfo";
        case 4: return "coverageType";
        case 5: return "coverageDetails";
        case 6: return "review";
        default: return "customerType";
      }
    } else {
      switch (currentStep) {
        case 2: return "contactInfo";
        case 3: return "coverageType";
        case 4: return "coverageDetails";
        case 5: return "review";
        default: return "customerType";
      }
    }
  };

  const stepContent = getStepContent();

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    // Generate quote reference before submission
    const ref = generateQuoteReference();
    setQuoteReference(ref);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          quoteReference: ref,
          estimatedPremium: priceBreakdown?.total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit quote request");
      }

      setIsSubmitted(true);

      // Track successful submission
      track("quote_submitted", {
        customerType: formData.customerType || "unknown",
        coverageType: formData.coverageType || "unknown",
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, priceBreakdown]);

  const handleReset = useCallback(() => {
    setFormData({
      customerType: null,
      companyName: "",
      businessType: "",
      numberOfEmployees: "",
      industry: "",
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
    setFieldStates({});
    setQuoteReference("");
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
    switch (stepContent) {
      case "customerType":
        return formData.customerType !== null;
      case "businessInfo":
        return (
          formData.companyName &&
          formData.businessType &&
          formData.numberOfEmployees
        );
      case "contactInfo":
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone &&
          formData.zipCode &&
          !getFieldState("email").error &&
          !getFieldState("phone").error
        );
      case "coverageType":
        return formData.coverageType !== null;
      case "coverageDetails":
        return (
          formData.coverageAmount &&
          formData.deductible &&
          formData.startDate &&
          !getFieldState("startDate").error
        );
      case "review":
        return true;
      default:
        return true;
    }
  };

  return (
    <div className="bg-stone-50 dark:bg-slate-900 min-h-screen relative transition-colors duration-300">
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none z-0" />

      <Header />

      <main className="relative z-10">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-56 pb-12 overflow-hidden">
        {/* Square Pattern Background - fading from top */}
        <div
          className="absolute inset-0 pointer-events-none opacity-100 dark:opacity-10"
          style={{
            backgroundImage: 'url(/images/square-pattern.png)',
            backgroundPosition: 'top center',
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto',
            maskImage: 'linear-gradient(to bottom, white 0%, white 30%, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to bottom, white 0%, white 30%, transparent 70%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Get Your <span className="text-primary">Free Quote</span>
          </motion.h1>
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Complete the form below to receive a personalised insurance quote.
            Our licensed advisors will review your needs and get back to you within 24 hours.
          </motion.p>

          {/* B2B Cross-link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/partners"
              className="group inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm transition-colors"
            >
              <span className="material-symbols-outlined text-base">storefront</span>
              <span>Own a retail space? <span className="font-semibold">Partner with us</span></span>
              <span className="material-symbols-outlined text-base opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1 group-hover:translate-x-0">arrow_forward</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="pb-24 pt-4 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Two column layout: Form + Price Breakdown (only when price visible) */}
          <div className={`flex flex-col gap-8 ${
            (stepContent === "coverageDetails" || stepContent === "review") && formData.coverageType && priceBreakdown
              ? "lg:flex-row lg:gap-12"
              : ""
          }`}>
            {/* Left: Form */}
            <div className={`flex-1 w-full ${
              (stepContent === "coverageDetails" || stepContent === "review") && formData.coverageType && priceBreakdown
                ? "max-w-3xl"
                : "max-w-4xl mx-auto"
            }`}>
          {/* Progress Steps - Enhanced with Animations */}
          <div className="mb-16">
            <div className="flex items-center justify-between relative">
              {/* Progress Line Background */}
              <div className="absolute top-8 left-[10%] right-[10%] h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden" />
              {/* Animated Progress Line Fill */}
              <motion.div
                className="absolute top-8 left-[10%] h-1 bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 80}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />

              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center z-10 flex-1"
                >
                  {/* Pulse Ring for Active Step */}
                  {currentStep === step.number && (
                    <motion.div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-2 border-primary"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.4, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}

                  {/* Completion Glow Effect */}
                  <AnimatePresence>
                    {currentStep > step.number && (
                      <motion.div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-emerald-400"
                        initial={{ scale: 0.8, opacity: 0.6 }}
                        animate={{ scale: 1.3, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </AnimatePresence>

                  <motion.div
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      currentStep > step.number
                        ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/30"
                        : currentStep === step.number
                        ? "bg-primary text-white shadow-xl shadow-primary/40"
                        : "bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-2 border-slate-200 dark:border-slate-600"
                    }`}
                    animate={currentStep === step.number ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence mode="wait">
                      {currentStep > step.number ? (
                        <motion.span
                          key="check"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="material-symbols-outlined text-2xl"
                        >
                          check
                        </motion.span>
                      ) : (
                        <motion.span
                          key="icon"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="material-symbols-outlined text-2xl"
                        >
                          {step.icon}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <span
                    className={`mt-3 text-sm font-bold tracking-wide transition-colors ${
                      currentStep > step.number
                        ? "text-emerald-600 dark:text-emerald-400"
                        : currentStep === step.number
                        ? "text-primary"
                        : "text-slate-400 dark:text-slate-500"
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
            className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
          >
            <div className="p-4 sm:p-6 md:p-8 lg:p-12 bg-white dark:bg-slate-800">
              {isSubmitted ? (
                <FormSuccess
                  title="Quote Request Submitted!"
                  description="Thank you for your interest. One of our licensed advisors will review your requirements and contact you within 24 hours with a personalised quote."
                  buttonText="Request Another Quote"
                  onReset={handleReset}
                  accentColor="green"
                  quoteData={quoteData}
                  showWhatsApp={true}
                >
                  <motion.div
                    className="mb-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      A confirmation email has been sent to <strong className="text-slate-900 dark:text-white">{formData.email}</strong>
                    </p>
                  </motion.div>
                </FormSuccess>
              ) : (
              <>
              <AnimatePresence mode="wait">
              {/* Step: Customer Type */}
              {stepContent === "customerType" && (
                <motion.div
                  key="customerType"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                      Who&apos;s This Quote For?
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                      Select whether you&apos;re looking for personal or business insurance.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {customerTypeOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          updateFormData({ customerType: option.id });
                          // Reset business fields if switching to individual
                          if (option.id === "individual") {
                            updateFormData({
                              companyName: "",
                              businessType: "",
                              numberOfEmployees: "",
                              industry: "",
                            });
                          }
                        }}
                        className={`relative p-8 rounded-xl border-2 text-left transition-all duration-300 group ${
                          formData.customerType === option.id
                            ? "border-primary bg-primary/5 dark:bg-primary/15 shadow-lg shadow-primary/10"
                            : "border-slate-200 dark:border-slate-600 hover:border-primary/50 hover:shadow-md bg-white dark:bg-slate-700/30"
                        }`}
                      >
                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                            formData.customerType === option.id
                              ? "bg-primary text-white"
                              : "bg-primary/10 text-primary group-hover:bg-primary/20"
                          }`}
                        >
                          <span className="material-symbols-outlined text-3xl">
                            {option.icon}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                          {option.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {option.description}
                        </p>
                        {formData.customerType === option.id && (
                          <div className="absolute top-4 right-4">
                            <span className="material-symbols-outlined text-primary text-2xl">
                              check_circle
                            </span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* B2B cross-link for individual users */}
                  {formData.customerType === "individual" && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400"
                    >
                      <span className="material-symbols-outlined text-base align-middle mr-1">info</span>
                      Own a retail business?{" "}
                      <Link href="/partners" className="text-primary hover:underline font-medium">
                        Partner with us
                      </Link>{" "}
                      for in-store insurance campaigns.
                    </motion.p>
                  )}
                </motion.div>
              )}

              {/* Step: Business Info (only for business customers) */}
              {stepContent === "businessInfo" && (
                <motion.div
                  key="businessInfo"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                      Business Details
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                      Tell us about your company so we can tailor your quote.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider ml-1 mb-2">
                        Company Name
                      </label>
                      <div className="relative">
                        <InputIcon
                          icon="business"
                          valid={getFieldState("companyName").valid}
                          touched={getFieldState("companyName").touched}
                        />
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => updateFormData({ companyName: e.target.value })}
                          onBlur={(e) => validateField("companyName", e.target.value, (v) => validateRequired(v, "Company name"))}
                          className={getInputClassesWithIcon(getFieldState("companyName"))}
                          placeholder="Acme Corporation (Pty) Ltd"
                          aria-required="true"
                        />
                      </div>
                      <InlineError error={getFieldState("companyName").error} id="companyName-error" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider ml-1 mb-2">
                        Business Type
                      </label>
                      <div className="relative">
                        <select
                          value={formData.businessType}
                          onChange={(e) => updateFormData({ businessType: e.target.value as BusinessType })}
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-slate-700 transition-all appearance-none pr-10 sm:pr-12"
                        >
                          <option value="">Select business type</option>
                          {businessTypeOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                          <span className="material-symbols-outlined text-xl">expand_more</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider ml-1 mb-2">
                        Number of Employees
                      </label>
                      <div className="relative">
                        <select
                          value={formData.numberOfEmployees}
                          onChange={(e) => updateFormData({ numberOfEmployees: e.target.value as EmployeeRange })}
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-slate-700 transition-all appearance-none pr-10 sm:pr-12"
                        >
                          <option value="">Select employee range</option>
                          {employeeRangeOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                          <span className="material-symbols-outlined text-xl">expand_more</span>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider ml-1 mb-2">
                        Industry <span className="font-normal text-slate-400">(Optional)</span>
                      </label>
                      <div className="relative">
                        <InputIcon
                          icon="category"
                          valid={false}
                          touched={false}
                        />
                        <input
                          type="text"
                          value={formData.industry}
                          onChange={(e) => updateFormData({ industry: e.target.value })}
                          className={getInputClassesWithIcon({ touched: false, error: null, valid: false })}
                          placeholder="e.g. Clothing, Electronics, Furniture"
                        />
                      </div>
                    </div>
                  </div>

                  {/* B2B benefits callout */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 p-4 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20"
                  >
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-xl mt-0.5">verified</span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Business Quote Benefits</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                          Get dedicated account management, group rates, and our B2B team will contact you within 24 hours.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step: Contact Info */}
              {stepContent === "contactInfo" && (
                <motion.div
                  key="contactInfo"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                      Contact Information
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                      {formData.customerType === "business"
                        ? "Who should we contact about this quote?"
                        : "Let's get your contact details to personalize your quote."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider ml-1 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <InputIcon
                          icon="person"
                          valid={getFieldState("firstName").valid}
                          touched={getFieldState("firstName").touched}
                        />
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => updateFormData({ firstName: e.target.value })}
                          onBlur={(e) => validateField("firstName", e.target.value, (v) => validateRequired(v, "First name"))}
                          className={getInputClassesWithIcon(getFieldState("firstName"))}
                          placeholder="John"
                          aria-required="true"
                          aria-invalid={getFieldState("firstName").error ? "true" : undefined}
                          aria-describedby={getFieldState("firstName").error ? "firstName-error" : undefined}
                        />
                      </div>
                      <InlineError error={getFieldState("firstName").error} id="firstName-error" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider ml-1 mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <InputIcon
                          icon="badge"
                          valid={getFieldState("lastName").valid}
                          touched={getFieldState("lastName").touched}
                        />
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => updateFormData({ lastName: e.target.value })}
                          onBlur={(e) => validateField("lastName", e.target.value, (v) => validateRequired(v, "Last name"))}
                          className={getInputClassesWithIcon(getFieldState("lastName"))}
                          placeholder="Doe"
                          aria-required="true"
                          aria-invalid={getFieldState("lastName").error ? "true" : undefined}
                          aria-describedby={getFieldState("lastName").error ? "lastName-error" : undefined}
                        />
                      </div>
                      <InlineError error={getFieldState("lastName").error} id="lastName-error" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider ml-1 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <InputIcon
                          icon="mail"
                          valid={getFieldState("email").valid}
                          touched={getFieldState("email").touched}
                        />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData({ email: e.target.value })}
                          onBlur={(e) => validateField("email", e.target.value, validateEmail)}
                          className={getInputClassesWithIcon(getFieldState("email"))}
                          placeholder="john@example.com"
                          aria-required="true"
                          aria-invalid={getFieldState("email").error ? "true" : undefined}
                          aria-describedby={getFieldState("email").error ? "email-error" : undefined}
                        />
                      </div>
                      <InlineError error={getFieldState("email").error} id="email-error" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider ml-1 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <InputIcon
                          icon="call"
                          valid={getFieldState("phone").valid}
                          touched={getFieldState("phone").touched}
                        />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData({ phone: e.target.value })}
                          onBlur={(e) => validateField("phone", e.target.value, validatePhone)}
                          className={getInputClassesWithIcon(getFieldState("phone"))}
                          placeholder="+27 XX XXX XXXX"
                          aria-required="true"
                          aria-invalid={getFieldState("phone").error ? "true" : undefined}
                          aria-describedby={getFieldState("phone").error ? "phone-error" : undefined}
                        />
                      </div>
                      <InlineError error={getFieldState("phone").error} id="phone-error" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider ml-1 mb-2">
                        Area Code
                      </label>
                      <div className="relative w-full md:w-1/2">
                        <InputIcon
                          icon="location_on"
                          valid={getFieldState("zipCode").valid}
                          touched={getFieldState("zipCode").touched}
                        />
                        <input
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) => updateFormData({ zipCode: e.target.value })}
                          onBlur={(e) => validateField("zipCode", e.target.value, (v) => validateRequired(v, "Area code"))}
                          className={getInputClassesWithIcon(getFieldState("zipCode"))}
                          placeholder="4001"
                          aria-required="true"
                          aria-invalid={getFieldState("zipCode").error ? "true" : undefined}
                          aria-describedby={getFieldState("zipCode").error ? "zipCode-error" : undefined}
                        />
                      </div>
                      <InlineError error={getFieldState("zipCode").error} id="zipCode-error" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step: Coverage Type */}
              {stepContent === "coverageType" && (
                <motion.div
                  key="coverageType"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                      Choose Your Coverage
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                      Select the type of insurance coverage you&apos;re looking for.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {coverageOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => updateFormData({ coverageType: option.id, additionalCoverage: [] })}
                        className={`relative p-6 rounded-xl border-2 text-left transition-all duration-300 group ${
                          formData.coverageType === option.id
                            ? "border-primary bg-primary/5 dark:bg-primary/15 shadow-lg shadow-primary/10"
                            : "border-slate-200 dark:border-slate-600 hover:border-primary/50 hover:shadow-md bg-white dark:bg-slate-700/30"
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
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                          {option.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
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

              {/* Step: Coverage Details */}
              {stepContent === "coverageDetails" && (
                <motion.div
                  key="coverageDetails"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                      Customize Your Coverage
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                      Adjust the details to match your specific needs.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider ml-1 mb-2">
                        Coverage Amount
                      </label>
                      <div className="relative">
                        <select
                          value={formData.coverageAmount}
                          onChange={(e) => updateFormData({ coverageAmount: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-slate-700 transition-all appearance-none pr-10 sm:pr-12"
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
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                          <span className="material-symbols-outlined text-xl">expand_more</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider ml-1 mb-2">
                        Excess
                      </label>
                      <div className="relative">
                        <select
                          value={formData.deductible}
                          onChange={(e) => updateFormData({ deductible: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-slate-700 transition-all appearance-none pr-10 sm:pr-12"
                        >
                          <option value="">Select excess</option>
                          <option value="5000">R5,000 (Higher Premium)</option>
                          <option value="10000">R10,000 (Recommended)</option>
                          <option value="25000">R25,000 (Lower Premium)</option>
                          <option value="50000">R50,000 (Lowest Premium)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                          <span className="material-symbols-outlined text-xl">expand_more</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider ml-1 mb-2">
                        Desired Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => updateFormData({ startDate: e.target.value })}
                        onBlur={(e) => validateField("startDate", e.target.value, (v) => validateFutureDate(v, "Start date"))}
                        className={`w-full px-4 py-3.5 rounded-xl border ${
                          getFieldState("startDate").touched && getFieldState("startDate").error
                            ? "border-2 border-red-400 bg-red-50 dark:bg-red-900/15"
                            : getFieldState("startDate").touched && getFieldState("startDate").valid
                            ? "border-2 border-green-400 bg-green-50 dark:bg-green-900/15"
                            : "border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50"
                        } text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-slate-700 transition-all`}
                        aria-required="true"
                        aria-invalid={getFieldState("startDate").error ? "true" : undefined}
                        aria-describedby={getFieldState("startDate").error ? "startDate-error" : undefined}
                      />
                      <InlineError error={getFieldState("startDate").error} id="startDate-error" />
                    </div>

                    {formData.coverageType && additionalCoverageOptions[formData.coverageType] && (
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-4">
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
                                  : "border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-primary/50 bg-white dark:bg-slate-700/30"
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

              {/* Step: Review */}
              {stepContent === "review" && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                      Review Your Quote Request
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                      Please review your information before submitting.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Business Info Summary (only for business customers) */}
                    {formData.customerType === "business" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800"
                      >
                        <div
                          className="absolute inset-0 opacity-[0.03]"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                          }}
                        />
                        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                          <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/20 rotate-45 transform origin-bottom-left" />
                        </div>
                        <div className="relative px-6 py-5 border-b border-white/10">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                                Business Quote
                              </p>
                              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-400 text-xl">business</span>
                                Company Details
                              </h3>
                            </div>
                            <button
                              onClick={() => setCurrentStep(2)}
                              className="px-3 py-1.5 text-xs font-medium text-blue-400 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                        <div className="relative p-6 grid grid-cols-2 gap-6">
                          {[
                            { label: "Company", value: formData.companyName },
                            { label: "Business Type", value: businessTypeOptions.find((o) => o.id === formData.businessType)?.label || formData.businessType },
                            { label: "Employees", value: formData.numberOfEmployees },
                            { label: "Industry", value: formData.industry || "Not specified" },
                          ].map((item, i) => (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + i * 0.1 }}
                            >
                              <p className="text-xs text-slate-400 mb-1">{item.label}</p>
                              <p className="text-base font-semibold text-white">{item.value}</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Contact Info Summary - Premium Dark Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: formData.customerType === "business" ? 0.15 : 0.1 }}
                      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800"
                    >
                      {/* Subtle Pattern Overlay */}
                      <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      />

                      {/* Corner Accent */}
                      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/20 rotate-45 transform origin-bottom-left" />
                      </div>

                      {/* Card Header */}
                      <div className="relative px-6 py-5 border-b border-white/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                              {formData.customerType === "business" ? "Contact Person" : "Applicant Details"}
                            </p>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                              <span className="material-symbols-outlined text-primary text-xl">person</span>
                              Contact Information
                            </h3>
                          </div>
                          <button
                            onClick={() => setCurrentStep(formData.customerType === "business" ? 3 : 2)}
                            className="px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="relative p-6 grid grid-cols-2 gap-6">
                        {[
                          { label: "Name", value: `${formData.firstName} ${formData.lastName}` },
                          { label: "Email", value: formData.email },
                          { label: "Phone", value: formData.phone },
                          { label: "Area Code", value: formData.zipCode },
                        ].map((item, i) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (formData.customerType === "business" ? 0.25 : 0.2) + i * 0.1 }}
                          >
                            <p className="text-xs text-slate-400 mb-1">{item.label}</p>
                            <p className="text-base font-semibold text-white">{item.value}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Coverage Summary - Premium Dark Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: formData.customerType === "business" ? 0.25 : 0.2 }}
                      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800"
                    >
                      {/* Subtle Pattern Overlay */}
                      <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      />

                      {/* Corner Accent */}
                      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-20 h-20 bg-emerald-500/20 rotate-45 transform origin-bottom-left" />
                      </div>

                      {/* Card Header */}
                      <div className="relative px-6 py-5 border-b border-white/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                              Coverage Summary
                            </p>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                              <span className="material-symbols-outlined text-emerald-400 text-xl">shield</span>
                              {coverageOptions.find((o) => o.id === formData.coverageType)?.title} Protection
                            </h3>
                          </div>
                          <button
                            onClick={() => setCurrentStep(formData.customerType === "business" ? 4 : 3)}
                            className="px-3 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 rounded-lg hover:bg-emerald-500/20 transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="relative p-6 grid grid-cols-2 gap-6">
                        {[
                          { label: "Coverage Type", value: coverageOptions.find((o) => o.id === formData.coverageType)?.title },
                          { label: "Coverage Amount", value: `R${Number(formData.coverageAmount).toLocaleString()}` },
                          { label: "Excess", value: `R${Number(formData.deductible).toLocaleString()}` },
                          { label: "Start Date", value: formData.startDate },
                        ].map((item, i) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                          >
                            <p className="text-xs text-slate-400 mb-1">{item.label}</p>
                            <p className="text-base font-semibold text-white">{item.value}</p>
                          </motion.div>
                        ))}
                        {formData.additionalCoverage.length > 0 && (
                          <motion.div
                            className="col-span-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                          >
                            <p className="text-xs text-slate-400 mb-2">Additional Coverage</p>
                            <div className="flex flex-wrap gap-2">
                              {formData.additionalCoverage
                                .map(
                                  (id) =>
                                    formData.coverageType &&
                                    additionalCoverageOptions[formData.coverageType]?.find(
                                      (o) => o.id === id
                                    )?.label
                                )
                                .filter(Boolean)
                                .map((label, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded-full"
                                  >
                                    {label}
                                  </span>
                                ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    {/* Terms */}
                    <div className="p-4 rounded-lg bg-primary/5 dark:bg-primary/15 border border-primary/20">
                      <p className="text-sm text-slate-600 dark:text-slate-300">
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
                  className="mt-6 p-4 bg-red-50 dark:bg-red-900/15 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                    <span className="material-symbols-outlined">error</span>
                    <span className="font-medium">{submitError}</span>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-10 pt-8 border-t border-slate-200 dark:border-slate-700">
                {currentStep > 1 ? (
                  <motion.button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium hover:border-primary hover:text-primary transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back
                  </motion.button>
                ) : (
                  <div />
                )}

                {currentStep < totalSteps ? (
                  <motion.button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all ${
                      canProceed()
                        ? "bg-primary text-white hover:bg-[rgb(165,5,2)] shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
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
                    className={`flex items-center gap-2 h-14 px-8 rounded-xl text-lg font-bold transition-all ${
                      isSubmitting
                        ? "bg-primary/70 text-white/80 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-[rgb(165,5,2)] shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40"
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

            {/* Right: Price Breakdown (sticky on desktop) */}
            <div className="hidden lg:block">
              <AnimatePresence>
                {(stepContent === "coverageDetails" || stepContent === "review") && formData.coverageType && priceBreakdown && (
                  <PriceBreakdown
                    breakdown={priceBreakdown}
                    coverageType={formData.coverageType}
                    isVisible={stepContent === "coverageDetails" || stepContent === "review"}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Price Summary (shows on mobile when price is available) */}
      <AnimatePresence>
        {(stepContent === "coverageDetails" || stepContent === "review") && formData.coverageType && priceBreakdown && !isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="lg:hidden fixed bottom-12 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4 shadow-2xl z-50"
          >
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Estimated Premium</p>
                <p className="text-2xl font-bold text-primary">
                  R{priceBreakdown.total.toLocaleString()}<span className="text-sm font-normal text-slate-500">/mo</span>
                </p>
              </div>
              <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                Estimate only
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ Section - Card-based Accordion */}
      <section ref={faqRef} className="relative py-24 px-6 overflow-hidden">
        {/* Decorative watermark */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -top-[2.4rem] text-[12rem] font-black text-slate-100 dark:text-white/5 select-none z-0 whitespace-nowrap pointer-events-none uppercase tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          FAQ
        </motion.div>

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl font-bold text-slate-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Common Questions
            </motion.h2>
            <motion.p
              className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Quick answers to help you get started with your quote.
            </motion.p>
          </motion.div>

          {/* FAQ Items - Card-based like Contact page */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-md open:border-l-4 open:border-l-primary open:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <summary className="flex justify-between items-center w-full p-6 text-left cursor-pointer list-none select-none group-hover:bg-slate-50 dark:group-hover:bg-slate-700/50 group-open:bg-transparent transition-colors">
                  <span className="font-semibold text-lg text-slate-900 dark:text-white group-hover:text-primary group-open:text-primary transition-colors pr-8">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover:bg-primary/10 group-open:bg-primary transition-all duration-300 shrink-0">
                    <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 group-hover:text-primary group-open:text-white text-xl transition-transform duration-300 group-open:rotate-180">
                      expand_more
                    </span>
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-2 text-slate-600 dark:text-slate-300 text-base leading-relaxed border-t border-slate-100 dark:border-slate-700">
                  <p>{faq.answer}</p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Matching Partners Page Style */}
      <section ref={ctaRef} className="pt-8 pb-24 px-4">
        <motion.div
          className="max-w-6xl mx-auto bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={ctaInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Organic Blob Pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1008%26quot%3b)' fill='none'%3e%3cpath d='M29.17 140C29.17 131.06 2.86 142.25 0 128.52C-11.73 72.25 -33.5 30.76 0 0C36.5 -33.5 70 0 140 0C210 0 210 0 280 0C350 0 350 0 420 0C490 0 490 0 560 0C630 0 630 0 700 0C770 0 770 0 840 0C896 0 896.37 -2.89 952 0C966.37 0.75 970.32 -2.97 980 7.27C1036.47 67.03 1039.41 69.41 1084.29 140C1109.41 179.52 1098.54 227.5 1120 227.5C1143.32 227.5 1155 187.21 1173.85 140C1200.41 73.46 1178.66 52.25 1210.81 0C1221.73 -17.75 1235.4 0 1260 0C1330 0 1330 0 1400 0C1456 0 1473.99 -24.44 1512 0C1543.99 20.56 1530.85 44.26 1540 90C1544.85 114.26 1540 115 1540 140C1540 157.5 1543.17 157.89 1540 175C1530.2 227.89 1517.5 226.69 1514.07 280C1509.62 349.19 1512.96 353.06 1524.23 420C1525.92 430.06 1538.87 423.96 1540 434C1546.75 493.96 1573.16 530.16 1540 560C1503.16 593.16 1470 560 1400 560C1330 560 1330 560 1260 560C1199.74 560 1191.3 573.9 1139.49 560C1121.3 555.12 1137.07 533.68 1120 522.44C1057.32 481.18 1031.83 444.07 980 455C942.74 462.85 978.44 532.53 941.82 560C908.44 585.03 890.91 560 840 560C770 560 770 560 700 560C637.78 560 629.08 573.38 575.56 560C559.08 555.88 564.58 525 560 525C555.81 525 572.21 556.46 558.03 560C502.21 573.96 489.01 560 420 560C350 560 350 560 280 560C245 560 234.35 579.31 210 560C164.35 523.79 179.96 499.83 140 448.97C124.96 429.83 120.59 433.62 100 420C50.59 387.31 30.41 398.93 0 356.36C-19.59 328.93 0 318.18 0 280C0 225.22 -10.53 220.98 0 170.43C4.05 150.98 29.17 152.02 29.17 140' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M420 91.72C395.2 96.73 388.89 113.9 388.89 140C388.89 184.71 386.56 227.32 420 233.33C472.12 242.7 490.57 203.24 560 170.77C590.36 156.57 619.57 156.12 619.57 140C619.57 123.45 592.8 113.36 560 105.43C493.01 89.22 480.75 79.45 420 91.72' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M840 131.76C838.16 131.76 835 136.49 835 140C835 142.13 837.86 143.04 840 143.04C841.31 143.04 841.89 141.68 841.89 140C841.89 136.04 841.61 131.76 840 131.76' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3cpath d='M280 242.08C241.09 242.08 204.17 263.81 204.17 280C204.17 295.24 241.61 304.93 280 304.93C330.08 304.93 381.11 295.43 381.11 280C381.11 264 329.56 242.08 280 242.08' stroke='rgba(255%2c 255%2c 255%2c 0.12)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1008'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

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
              <MagneticButton strength={0.3}>
                <motion.a
                  href="tel:+27313011192"
                  className="bg-white text-primary text-lg font-bold py-4 px-10 rounded-xl shadow-xl flex items-center justify-center gap-2"
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
              </MagneticButton>
              <MagneticButton strength={0.3}>
                <motion.a
                  href="/contact"
                  className="bg-[rgb(var(--color-primary-hover))] border border-white/20 text-white text-lg font-bold py-4 px-10 rounded-xl flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="material-symbols-outlined">chat</span>
                  Chat with Us
                </motion.a>
              </MagneticButton>
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
      </main>

      <Footer />
    </div>
  );
}
