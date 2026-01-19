"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@vercel/analytics";
import {
  FormSuccess,
  LabelledInput,
  LabelledSelect,
  LabelledTextarea,
} from "@/components/ui";
import {
  FieldState,
  FieldStates,
  validateEmail,
  validatePhone,
  validateRequired,
} from "@/lib/formValidation";
import { HONEYPOT_FIELD_NAME, honeypotClassName } from "@/lib/honeypot";
import {
  employeeCountOptions,
  serviceInterestOptions,
} from "@/data/corporateServices";

interface FormData {
  // Company Information
  companyName: string;
  industry: string;
  employeeCount: string;
  // Contact Information
  contactName: string;
  jobTitle: string;
  email: string;
  phone: string;
  // Services Interested
  servicesInterested: string[];
  // Additional Information
  currentBenefits: string;
  message: string;
  // Consent
  marketingConsent: boolean;
  privacyConsent: boolean;
}

const initialFormData: FormData = {
  companyName: "",
  industry: "",
  employeeCount: "",
  contactName: "",
  jobTitle: "",
  email: "",
  phone: "",
  servicesInterested: [],
  currentBenefits: "",
  message: "",
  marketingConsent: false,
  privacyConsent: false,
};

const industries = [
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
  { value: "financial-services", label: "Financial Services" },
  { value: "healthcare", label: "Healthcare" },
  { value: "technology", label: "Technology" },
  { value: "construction", label: "Construction" },
  { value: "hospitality", label: "Hospitality" },
  { value: "professional-services", label: "Professional Services" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

const currentBenefitsOptions = [
  { value: "none", label: "No current benefits" },
  { value: "basic", label: "Basic medical aid only" },
  { value: "medical-retirement", label: "Medical aid and retirement fund" },
  { value: "comprehensive", label: "Comprehensive package" },
  { value: "reviewing", label: "Currently reviewing/changing providers" },
];

const MAX_MESSAGE_CHARS = 2000;

// Step configuration
const steps = [
  { id: 0, title: "Company", icon: "apartment" },
  { id: 1, title: "Contact", icon: "person" },
  { id: 2, title: "Services", icon: "health_and_safety" },
];

export default function CorporateInquiryForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldStates, setFieldStates] = useState<FieldStates>({});
  const [currentStep, setCurrentStep] = useState(0);
  // Honeypot field for spam prevention (hidden from users, filled by bots)
  const [honeypot, setHoneypot] = useState("");

  // Validate a field and update state
  const validateField = useCallback(
    (
      fieldName: string,
      value: string,
      validator: (val: string) => string | null
    ) => {
      const error = validator(value);
      setFieldStates((prev) => ({
        ...prev,
        [fieldName]: {
          touched: true,
          error,
          valid: error === null && value.length > 0,
        },
      }));
      return error === null;
    },
    []
  );

  // Get field state helper
  const getFieldState = (fieldName: string): FieldState => {
    return (
      fieldStates[fieldName] || { touched: false, error: null, valid: false }
    );
  };

  // Check if step is valid
  const isStepValid = useCallback(
    (step: number): boolean => {
      switch (step) {
        case 0:
          return !!(
            formData.companyName &&
            formData.industry &&
            formData.employeeCount
          );
        case 1:
          const emailError = validateEmail(formData.email);
          const phoneError = validatePhone(formData.phone);
          const nameError = validateRequired(formData.contactName, "Name");
          const titleError = validateRequired(formData.jobTitle, "Job title");
          return (
            emailError === null &&
            phoneError === null &&
            nameError === null &&
            titleError === null
          );
        case 2:
          return formData.privacyConsent;
        default:
          return false;
      }
    },
    [formData]
  );

  // Validate step and update field states
  const validateStepFields = (step: number): boolean => {
    if (step === 0) {
      const companyValid = validateField("companyName", formData.companyName, (v) =>
        validateRequired(v, "Company name")
      );
      const industryValid = validateField("industry", formData.industry, (v) =>
        validateRequired(v, "Industry")
      );
      const employeeCountValid = validateField("employeeCount", formData.employeeCount, (v) =>
        validateRequired(v, "Employee count")
      );
      return companyValid && industryValid && employeeCountValid;
    }
    if (step === 1) {
      const emailValid = validateField("email", formData.email, validateEmail);
      const phoneValid = validateField("phone", formData.phone, validatePhone);
      const nameValid = validateField("contactName", formData.contactName, (v) =>
        validateRequired(v, "Name")
      );
      const titleValid = validateField("jobTitle", formData.jobTitle, (v) =>
        validateRequired(v, "Job title")
      );
      return emailValid && phoneValid && nameValid && titleValid;
    }
    return isStepValid(step);
  };

  const canProceed = isStepValid(currentStep);

  const handleNext = () => {
    if (validateStepFields(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "message" && value.length > MAX_MESSAGE_CHARS) {
      return;
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleServiceChange = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      servicesInterested: prev.servicesInterested.includes(serviceId)
        ? prev.servicesInterested.filter((s) => s !== serviceId)
        : [...prev.servicesInterested, serviceId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/corporate-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, [HONEYPOT_FIELD_NAME]: honeypot }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setIsSubmitted(true);

      // Track successful submission
      track("corporate_inquiry_submitted", {
        industry: formData.industry,
        employeeCount: formData.employeeCount,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again."
      );
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

  return (
    <section
      id="corporate-inquiry"
      className="relative py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 overflow-hidden"
    >


      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-slate-900/30 border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          {/* Progress Bar & Header (Only show if not submitted) */}
          {!isSubmitted && (
            <>
              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>

              {/* Internal Header */}
              <div className="px-6 md:px-10 pt-8 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Get Your Benefits Package
                  </h2>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {steps[currentStep].title === "Company" && "We'll get back to you in 24 hours."}
                  {steps[currentStep].title === "Contact" && "How can we reach you?"}
                  {steps[currentStep].title === "Services" && "What benefits interest you?"}
                </p>
              </div>
            </>
          )}

          <div className="p-6 md:p-10 pt-6">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <FormSuccess
                  title="Inquiry Submitted!"
                  description="Thank you for your interest in corporate employee benefits. Our team will review your requirements and contact you within 24 hours with a tailored proposal."
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
                  {/* Honeypot field - hidden from users, filled by bots */}
                  <input
                    type="text"
                    name={HONEYPOT_FIELD_NAME}
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                    className={honeypotClassName}
                  />

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      className="p-4 rounded-xl bg-red-50 dark:bg-red-900/15 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 mb-8"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">
                          error
                        </span>
                        <span>{error}</span>
                      </div>
                    </motion.div>
                  )}

                  <AnimatePresence mode="wait">
                    {/* Step 1: Company Information */}
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
                            Tell us about your company
                          </h3>
                          <p className="text-slate-500 dark:text-slate-400">
                            Help us understand your business so we can design the
                            right benefits package.
                          </p>
                        </div>

                        <LabelledInput
                          name="companyName"
                          label="Company Name"
                          value={formData.companyName}
                          required
                          onChange={handleInputChange}
                          fieldState={getFieldState("companyName")}
                          onBlur={(e) => validateField("companyName", e.target.value, (v) => validateRequired(v, "Company name"))}
                          inputClassName="placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        />

                        <LabelledSelect
                          name="industry"
                          label="Industry"
                          options={industries}
                          value={formData.industry}
                          required
                          onChange={handleInputChange}
                          fieldState={getFieldState("industry")}
                          onBlur={() => validateField("industry", formData.industry, (v) => validateRequired(v, "Industry"))}
                          inputClassName={!formData.industry ? "text-slate-400 dark:text-slate-500" : ""}
                        />

                        <LabelledSelect
                          name="employeeCount"
                          label="Number of Employees"
                          options={employeeCountOptions.map((opt) => ({
                            value: opt.value,
                            label: opt.label,
                          }))}
                          value={formData.employeeCount}
                          required
                          onChange={handleInputChange}
                          fieldState={getFieldState("employeeCount")}
                          onBlur={() => validateField("employeeCount", formData.employeeCount, (v) => validateRequired(v, "Employee count"))}
                          inputClassName={!formData.employeeCount ? "text-slate-400 dark:text-slate-500" : ""}
                        />

                        <LabelledSelect
                          name="currentBenefits"
                          label="Current Benefits Situation (Optional)"
                          options={currentBenefitsOptions}
                          value={formData.currentBenefits}
                          onChange={handleInputChange}
                          inputClassName={!formData.currentBenefits ? "text-slate-400 dark:text-slate-500" : ""}
                        />
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
                            We&apos;ll use this information to send your
                            personalised proposal.
                          </p>
                        </div>

                        <LabelledInput
                          name="contactName"
                          label="Full Name"
                          value={formData.contactName}
                          required
                          onChange={handleInputChange}
                          fieldState={getFieldState("contactName")}
                          onBlur={(e) =>
                            validateField("contactName", e.target.value, (v) =>
                              validateRequired(v, "Name")
                            )
                          }
                          inputClassName="placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        />

                        <LabelledInput
                          name="jobTitle"
                          label="Job Title"
                          value={formData.jobTitle}
                          required
                          onChange={handleInputChange}
                          fieldState={getFieldState("jobTitle")}
                          onBlur={(e) =>
                            validateField("jobTitle", e.target.value, (v) =>
                              validateRequired(v, "Job title")
                            )
                          }
                          inputClassName="placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        />

                        <LabelledInput
                          name="email"
                          label="Email Address"
                          type="email"
                          value={formData.email}
                          required
                          onChange={handleInputChange}
                          fieldState={getFieldState("email")}
                          onBlur={(e) =>
                            validateField("email", e.target.value, validateEmail)
                          }
                          inputClassName="placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        />

                        <LabelledInput
                          name="phone"
                          label="Phone Number"
                          type="tel"
                          value={formData.phone}
                          required
                          onChange={handleInputChange}
                          fieldState={getFieldState("phone")}
                          onBlur={(e) =>
                            validateField("phone", e.target.value, validatePhone)
                          }
                          inputClassName="placeholder:text-slate-300 dark:placeholder:text-slate-600"
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
                            Benefits you&apos;re interested in
                          </h3>
                          <p className="text-slate-500 dark:text-slate-400">
                            Select the employee benefits you&apos;d like to
                            explore.
                          </p>
                        </div>

                        {/* Service Pills */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                            Services you&apos;re interested in
                          </label>
                          <div
                            className="flex flex-wrap gap-3"
                            role="group"
                            aria-label="Select services"
                          >
                            {serviceInterestOptions.map((service) => (
                              <button
                                key={service.id}
                                type="button"
                                onClick={() => handleServiceChange(service.id)}
                                className={`
                                group relative px-5 py-3 rounded-full text-sm font-medium transition-all duration-300
                                ${formData.servicesInterested.includes(
                                  service.id
                                )
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                                  }
                              `}
                                aria-pressed={formData.servicesInterested.includes(
                                  service.id
                                )}
                              >
                                <span className="flex items-center gap-2">
                                  {formData.servicesInterested.includes(
                                    service.id
                                  ) && (
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

                        {/* Message */}
                        <LabelledTextarea
                          name="message"
                          label="Tell us about your employee benefits requirements"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          maxLength={MAX_MESSAGE_CHARS}
                          showCharCount
                          helperText="Optional"
                          inputClassName="placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        />

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
                              I agree to the{" "}
                              <a
                                href="/privacy"
                                className="text-primary hover:underline"
                              >
                                Privacy Policy
                              </a>{" "}
                              and consent to Metrosure processing my data.{" "}
                              <span className="text-primary">*</span>
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
                              Send me updates about corporate benefits and
                              industry news.
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
                          ? "text-slate-300 dark:text-slate-600 cursor-not-allowed"
                          : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                        }
                    `}
                    >
                      <span className="material-symbols-outlined text-xl">
                        arrow_back
                      </span>
                      Back
                    </button>

                    {currentStep < steps.length - 1 ? (
                      <motion.button
                        type="button"
                        onClick={handleNext}
                        disabled={!canProceed}
                        className="flex items-center gap-2 h-12 px-8 bg-primary hover:bg-[rgb(var(--color-primary-hover))] text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        whileHover={canProceed ? { scale: 1.03, y: -2 } : {}}
                        whileTap={canProceed ? { scale: 0.98 } : {}}
                      >
                        Continue
                        <span className="material-symbols-outlined text-xl">
                          arrow_forward
                        </span>
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={isSubmitting || !canProceed}
                        className="flex items-center gap-2 h-12 px-8 bg-primary hover:bg-[rgb(var(--color-primary-hover))] text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        whileHover={
                          !isSubmitting && canProceed ? { scale: 1.03, y: -2 } : {}
                        }
                        whileTap={
                          !isSubmitting && canProceed ? { scale: 0.98 } : {}
                        }
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Inquiry</span>
                            <span className="material-symbols-outlined text-xl">
                              send
                            </span>
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-8 mt-8 pt-8"
        >
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined text-emerald-500 text-lg">
              verified
            </span>
            <span>FSP 47089</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined text-emerald-500 text-lg">
              security
            </span>
            <span>FSCA Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined text-emerald-500 text-lg">
              schedule
            </span>
            <span>24hr Response</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
