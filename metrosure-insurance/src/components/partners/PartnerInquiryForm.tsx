"use client";

import { useState, useRef, useCallback, Fragment } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { InlineError } from "@/components/ui/InlineError";
import {
  FieldState,
  FieldStates,
  validateEmail,
  validatePhone,
  validateRequired,
} from "@/lib/formValidation";

interface FormData {
  // Business Information
  companyName: string;
  businessType: string;
  numberOfLocations: string;
  // Contact Information
  contactName: string;
  jobTitle: string;
  email: string;
  phone: string;
  // Location Details
  province: string;
  city: string;
  // Services Interested
  servicesInterested: string[];
  // Additional Information
  currentFootTraffic: string;
  message: string;
  // Consent
  marketingConsent: boolean;
  privacyConsent: boolean;
}

const initialFormData: FormData = {
  companyName: "",
  businessType: "",
  numberOfLocations: "",
  contactName: "",
  jobTitle: "",
  email: "",
  phone: "",
  province: "",
  city: "",
  servicesInterested: [],
  currentFootTraffic: "",
  message: "",
  marketingConsent: false,
  privacyConsent: false
};

const provinces = [
  "Gauteng",
  "KwaZulu-Natal",
  "Western Cape",
  "Eastern Cape",
  "Free State",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape"
];

const businessTypes = [
  "Retail Store",
  "Franchise",
  "Supermarket/Grocery",
  "Furniture Store",
  "Electronics Store",
  "Clothing Store",
  "Wholesale",
  "Other"
];

const locationCounts = [
  "1 location",
  "2-5 locations",
  "6-10 locations",
  "11-50 locations",
  "50+ locations"
];

const trafficLevels = [
  "Under 100 customers/day",
  "100-500 customers/day",
  "500-1000 customers/day",
  "1000+ customers/day"
];

const services = [
  { id: "instore-campaigns", label: "In-Store Campaigns", description: "Insurance sales at point of purchase" },
  { id: "outsourced-sales", label: "Sales & Marketing", description: "Dedicated sales team support" },
  { id: "credit-facility", label: "Credit Facility", description: "In-store financing options" }
];

const MAX_MESSAGE_CHARS = 2000;

// Step configuration
const steps = [
  { id: 0, title: "Business", icon: "business" },
  { id: 1, title: "Contact", icon: "person" },
  { id: 2, title: "Services", icon: "handshake" }
];

export default function PartnerInquiryForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldStates, setFieldStates] = useState<FieldStates>({});
  const [currentStep, setCurrentStep] = useState(0);

  // Validate a field and update state
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

  // Step validation
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!(formData.companyName && formData.businessType && formData.numberOfLocations && formData.province && formData.city);
      case 1:
        const emailValid = validateField("email", formData.email, validateEmail);
        const phoneValid = validateField("phone", formData.phone, validatePhone);
        const nameValid = validateField("contactName", formData.contactName, (v) => validateRequired(v, "Name"));
        const titleValid = validateField("jobTitle", formData.jobTitle, (v) => validateRequired(v, "Job title"));
        return emailValid && phoneValid && nameValid && titleValid;
      case 2:
        return formData.privacyConsent;
      default:
        return false;
    }
  };

  const canProceed = (): boolean => {
    return validateStep(currentStep);
  };

  const handleNext = () => {
    if (canProceed() && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Floating label input classes
  const floatingInputClasses =
    "peer w-full pt-6 pb-3 px-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 focus:border-primary focus:ring-0 transition-all text-slate-900 dark:text-white placeholder-transparent";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === "message" && value.length > MAX_MESSAGE_CHARS) {
      // Enforce character limit for message field
      return;
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleServiceChange = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      servicesInterested: prev.servicesInterested.includes(serviceId)
        ? prev.servicesInterested.filter(s => s !== serviceId)
        : [...prev.servicesInterested, serviceId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/partner-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setIsSubmitted(false);
    setError(null);
    setFieldStates({});
    setCurrentStep(0);
  };

  // Floating label component
  const FloatingInput = ({
    name,
    label,
    type = "text",
    value,
    required = false,
    onBlur
  }: {
    name: string;
    label: string;
    type?: string;
    value: string;
    required?: boolean;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  }) => (
    <div className="relative">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleInputChange}
        onBlur={onBlur}
        placeholder={label}
        required={required}
        className={`${floatingInputClasses} ${getFieldState(name).error ? 'border-red-400 dark:border-red-400' : ''}`}
        aria-required={required}
        aria-invalid={getFieldState(name).error ? "true" : undefined}
        aria-describedby={getFieldState(name).error ? `${name}-error` : undefined}
      />
      <label
        htmlFor={name}
        className="absolute left-4 top-2 text-xs text-slate-400 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
      >
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <InlineError error={getFieldState(name).error} id={`${name}-error`} />
    </div>
  );

  // Select component with floating style
  const FloatingSelect = ({
    name,
    label,
    options,
    value,
    required = false
  }: {
    name: string;
    label: string;
    options: string[];
    value: string;
    required?: boolean;
  }) => (
    <div className="relative">
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleInputChange}
        required={required}
        className={`${floatingInputClasses} appearance-none cursor-pointer ${value ? 'pt-6 pb-3' : 'py-4'}`}
      >
        <option value="">{label}</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {value && (
        <label className="absolute left-4 top-2 text-xs text-slate-400">
          {label} {required && <span className="text-primary">*</span>}
        </label>
      )}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
        <span className="material-symbols-outlined">expand_more</span>
      </div>
    </div>
  );

  return (
    <section
      ref={ref}
      id="partner-inquiry"
      className="relative py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Partner With Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Start Your Partnership
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Complete the form below and we&apos;ll respond within <strong className="text-slate-900 dark:text-white">24 hours</strong>
          </p>
        </motion.div>

        {/* Step Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          {steps.map((step, i) => (
            <Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  className="relative"
                  animate={i === currentStep ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {/* Pulse ring on active step */}
                  {i === currentStep && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-primary"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  <motion.div
                    className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      i < currentStep
                        ? 'bg-emerald-500 text-white'
                        : i === currentStep
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {i < currentStep ? (
                        <motion.span
                          key="check"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="material-symbols-outlined text-xl"
                        >
                          check
                        </motion.span>
                      ) : (
                        <motion.span
                          key="icon"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="material-symbols-outlined text-xl"
                        >
                          {step.icon}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
                <span className={`text-xs font-medium transition-colors ${
                  i <= currentStep ? 'text-slate-900 dark:text-white' : 'text-slate-400'
                }`}>
                  {step.title}
                </span>
              </div>

              {/* Connecting line */}
              {i < steps.length - 1 && (
                <div className="w-16 sm:w-24 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden -mt-6">
                  <motion.div
                    className="h-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: i < currentStep ? '100%' : '0%' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
              )}
            </Fragment>
          ))}
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-10 shadow-lg dark:shadow-slate-900/30 border border-slate-200 dark:border-slate-700"
        >
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <FormSuccess
                title="Inquiry Submitted!"
                description="Thank you for your interest in partnering with Metrosure. Our team will review your inquiry and contact you within 24 hours."
                buttonText="Submit Another Inquiry"
                onReset={resetForm}
                accentColor="green"
              />
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Error Message */}
                {error && (
                  <motion.div
                    className="p-4 rounded-xl bg-red-50 dark:bg-red-900/15 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">error</span>
                      <span>{error}</span>
                    </div>
                  </motion.div>
                )}

                <AnimatePresence mode="wait">
                  {/* Step 1: Business Information */}
                  {currentStep === 0 && (
                    <motion.div
                      key="step-0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                          Tell us about your business
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400">
                          Help us understand your company so we can tailor our partnership offer.
                        </p>
                      </div>

                      <FloatingInput
                        name="companyName"
                        label="Company Name"
                        value={formData.companyName}
                        required
                      />

                      <FloatingSelect
                        name="businessType"
                        label="Business Type"
                        options={businessTypes}
                        value={formData.businessType}
                        required
                      />

                      <FloatingSelect
                        name="numberOfLocations"
                        label="Number of Locations"
                        options={locationCounts}
                        value={formData.numberOfLocations}
                        required
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FloatingSelect
                          name="province"
                          label="Province"
                          options={provinces}
                          value={formData.province}
                          required
                        />

                        <FloatingInput
                          name="city"
                          label="City/Town"
                          value={formData.city}
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Contact Information */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                          Your contact details
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400">
                          We&apos;ll use this information to get in touch with you.
                        </p>
                      </div>

                      <FloatingInput
                        name="contactName"
                        label="Full Name"
                        value={formData.contactName}
                        required
                        onBlur={(e) => validateField("contactName", e.target.value, (v) => validateRequired(v, "Name"))}
                      />

                      <FloatingInput
                        name="jobTitle"
                        label="Job Title"
                        value={formData.jobTitle}
                        required
                        onBlur={(e) => validateField("jobTitle", e.target.value, (v) => validateRequired(v, "Job title"))}
                      />

                      <FloatingInput
                        name="email"
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        required
                        onBlur={(e) => validateField("email", e.target.value, validateEmail)}
                      />

                      <FloatingInput
                        name="phone"
                        label="Phone Number"
                        type="tel"
                        value={formData.phone}
                        required
                        onBlur={(e) => validateField("phone", e.target.value, validatePhone)}
                      />
                    </motion.div>
                  )}

                  {/* Step 3: Services & Submit */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                          Partnership interests
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400">
                          Select the services you&apos;re interested in and add any additional details.
                        </p>
                      </div>

                      {/* Service Pills */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                          Services you&apos;re interested in
                        </label>
                        <div className="flex flex-wrap gap-3" role="group" aria-label="Select services">
                          {services.map(service => (
                            <button
                              key={service.id}
                              type="button"
                              onClick={() => handleServiceChange(service.id)}
                              className={`
                                group relative px-5 py-3 rounded-full text-sm font-medium transition-all duration-300
                                ${formData.servicesInterested.includes(service.id)
                                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                                }
                              `}
                              aria-pressed={formData.servicesInterested.includes(service.id)}
                            >
                              <span className="flex items-center gap-2">
                                {formData.servicesInterested.includes(service.id) && (
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="material-symbols-outlined text-sm"
                                  >
                                    check
                                  </motion.span>
                                )}
                                {service.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Foot Traffic */}
                      <FloatingSelect
                        name="currentFootTraffic"
                        label="Current Customer Foot Traffic (Optional)"
                        options={trafficLevels}
                        value={formData.currentFootTraffic}
                      />

                      {/* Message */}
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your partnership goals..."
                          rows={4}
                          className={`${floatingInputClasses} resize-none pt-4`}
                        />
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-slate-400">Optional</span>
                          <span className={`text-xs ${formData.message.length >= MAX_MESSAGE_CHARS ? 'text-red-500' : 'text-slate-400'}`}>
                            {formData.message.length}/{MAX_MESSAGE_CHARS}
                          </span>
                        </div>
                      </div>

                      {/* Consent Checkboxes */}
                      <div className="space-y-4 pt-4">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            name="privacyConsent"
                            checked={formData.privacyConsent}
                            onChange={handleInputChange}
                            required
                            className="w-5 h-5 mt-0.5 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary focus:ring-offset-0"
                          />
                          <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            I agree to the <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and consent to Metrosure processing my data. <span className="text-primary">*</span>
                          </span>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            name="marketingConsent"
                            checked={formData.marketingConsent}
                            onChange={handleInputChange}
                            className="w-5 h-5 mt-0.5 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary focus:ring-offset-0"
                          />
                          <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            Send me updates about partnership opportunities and news.
                          </span>
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-10 pt-8 border-t border-slate-100 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={`
                      flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                      ${currentStep === 0
                        ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                      }
                    `}
                  >
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                    Back
                  </button>

                  {currentStep < steps.length - 1 ? (
                    <motion.button
                      type="button"
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="flex items-center gap-2 py-3.5 px-8 bg-primary hover:bg-[#a50502] text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      whileHover={canProceed() ? { scale: 1.02, y: -1 } : {}}
                      whileTap={canProceed() ? { scale: 0.98 } : {}}
                    >
                      Continue
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !canProceed()}
                      className="flex items-center gap-2 py-3.5 px-8 bg-primary hover:bg-[#a50502] text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      whileHover={!isSubmitting && canProceed() ? { scale: 1.02, y: -1 } : {}}
                      whileTap={!isSubmitting && canProceed() ? { scale: 0.98 } : {}}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <span className="material-symbols-outlined text-xl">send</span>
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust Badges - Inline below form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-8 mt-8 pt-8"
        >
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined text-emerald-500 text-lg">verified</span>
            <span>FSP Licensed</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined text-emerald-500 text-lg">security</span>
            <span>POPIA Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined text-emerald-500 text-lg">schedule</span>
            <span>24hr Response</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
