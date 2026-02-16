"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { toast } from "@/components/ui/sonner";
import { Job } from "@/data/jobs";
import { track } from "@vercel/analytics";
import { fadeInUp, staggerContainer } from "@/components/animations";
import {
  FormSuccess,
  LabelledInput,
  LabelledSelect,
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
  provincesWithAny as provinces,
  experienceLevels,
  jobPositions as positions,
} from "@/data/formOptions";

interface JobDetailSimpleProps {
  job: Job;
}

/**
 * Simplified career detail page component
 * Clean, modern SaaS aesthetic with focused content
 *
 * Design features:
 * - Single-column content with generous whitespace
 * - Brand primary colour accents
 * - Simplified single-column application form
 * - Minimal hero, maximum clarity
 */
export default function JobDetailSimple({ job }: JobDetailSimpleProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section - Clean & Minimal */}
      <HeroSection job={job} />

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-4xl">
          {/* About Metrosure */}
          <ContentSection title="About Metrosure" delay={0}>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Metrosure is a leading South African insurance brokerage dedicated to protecting
              what matters most to our clients. We combine decades of industry expertise with
              modern, client-first service to deliver exceptional insurance solutions.
            </p>
          </ContentSection>

          {/* About the Role */}
          <ContentSection title="About the Role" delay={0.1}>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              {job.description}
            </p>
          </ContentSection>

          {/* What You'll Do */}
          <ContentSection title="What You'll Do" delay={0.2}>
            <BulletList items={job.responsibilities} />
          </ContentSection>

          {/* About You */}
          <ContentSection title="About You" delay={0.3}>
            <BulletList items={job.requirements} />
          </ContentSection>

          {/* What We Offer */}
          {job.offers && job.offers.length > 0 && (
            <ContentSection title="What We Offer" delay={0.4}>
              <BulletList items={job.offers} />
            </ContentSection>
          )}
        </div>
      </main>

      {/* Simplified Application Form */}
      <SimpleApplicationForm id="apply" selectedPosition={job.title} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO SECTION - Simplified
// ═══════════════════════════════════════════════════════════════════════════

function HeroSection({ job }: { job: Job }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.header
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="pt-32 pb-16 md:pt-40 md:pb-20 bg-[rgb(var(--color-surface-card))] transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <motion.div variants={fadeInUp} className="mb-10">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors group"
          >
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="text-sm font-medium">Back to all positions</span>
          </Link>
        </motion.div>

        {/* Job Title */}
        <motion.h1
          variants={fadeInUp}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6"
        >
          {job.title}
        </motion.h1>

        {/* Job Meta - Simple inline */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap items-center gap-6 text-slate-600 dark:text-slate-300"
        >
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">location_on</span>
            {job.location}
          </span>
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">work</span>
            {job.type}
          </span>
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">category</span>
            {job.department}
          </span>
        </motion.div>
      </div>
    </motion.header>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTENT SECTION
// ═══════════════════════════════════════════════════════════════════════════

function ContentSection({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="mb-16 md:mb-20"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// BULLET LIST
// ═══════════════════════════════════════════════════════════════════════════

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
        >
          <span
            className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SIMPLIFIED APPLICATION FORM - Single column, no side panel
// ═══════════════════════════════════════════════════════════════════════════

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  province: string;
  experience: string;
  willingToRelocate: string;
  cv: File | null;
  privacyConsent: boolean;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  province: "",
  experience: "",
  willingToRelocate: "",
  cv: null,
  privacyConsent: false,
};

function SimpleApplicationForm({
  id,
  selectedPosition,
}: {
  id?: string;
  selectedPosition?: string;
}) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fieldStates, setFieldStates] = useState<FieldStates>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const [honeypot, setHoneypot] = useState("");

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Set position from prop on mount
  useState(() => {
    if (selectedPosition) {
      const matchedPosition = positions.find(
        (p) =>
          p.label.toLowerCase() === selectedPosition.toLowerCase() ||
          selectedPosition.toLowerCase().includes(p.label.toLowerCase())
      );
      if (matchedPosition) {
        setFormData((prev) => ({ ...prev, position: matchedPosition.value }));
      }
    }
  });

  // Scroll to success message after submission
  useEffect(() => {
    if (isSubmitted) {
      formCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isSubmitted]);

  const validateField = useCallback(
    (fieldName: string, value: string, validator: (val: string) => string | null) => {
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

  const getFieldState = (fieldName: string): FieldState => {
    return fieldStates[fieldName] || { touched: false, error: null, valid: false };
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a PDF or Word document");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setFormData((prev) => ({ ...prev, cv: file }));
      setFileName(file.name);
      setError(null);
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, cv: null }));
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("position", formData.position);
      formDataToSend.append("province", formData.province);
      formDataToSend.append("experience", formData.experience);
      formDataToSend.append("willingToRelocate", formData.willingToRelocate);
      formDataToSend.append("privacyConsent", String(formData.privacyConsent));
      formDataToSend.append(HONEYPOT_FIELD_NAME, honeypot);
      if (formData.cv) {
        formDataToSend.append("cv", formData.cv);
      }

      const response = await fetch("/api/careers-application", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit application");
      }

      setIsSubmitted(true);

      toast.success("Application Received!", {
        description: "We'll review your application and be in touch soon.",
      });

      track("career_application_submitted", {
        position: formData.position,
        experience: formData.experience,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred. Please try again.";
      setError(errorMessage);
      toast.error("Submission Failed", {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setFileName("");
    setIsSubmitted(false);
    setError(null);
    setFieldStates({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Apply Now
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Takes less than 2 minutes
          </p>
        </div>

        {/* Form Card */}
        <div ref={formCardRef} className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-10 shadow-lg dark:shadow-slate-900/30 border border-slate-200 dark:border-slate-700">
          {isSubmitted ? (
            <FormSuccess
              title="Application Received!"
              description="Thank you for applying to join Metrosure. We'll review your application and be in touch soon."
              buttonText="Apply for Another Position"
              onReset={resetForm}
              accentColor="green"
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot */}
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
                  className="p-4 rounded-xl bg-red-50 dark:bg-red-900/15 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">error</span>
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabelledInput
                  name="fullName"
                  label="Full Name"
                  value={formData.fullName}
                  required
                  onChange={handleInputChange}
                  onBlur={(e) =>
                    validateField("fullName", e.target.value, (v) =>
                      validateRequired(v, "Full name")
                    )
                  }
                  fieldState={getFieldState("fullName")}
                  inputClassName="placeholder:text-slate-300 dark:placeholder:text-slate-600"
                />
                <LabelledInput
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  required
                  onChange={handleInputChange}
                  onBlur={(e) =>
                    validateField("email", e.target.value, validateEmail)
                  }
                  fieldState={getFieldState("email")}
                  inputClassName="placeholder:text-slate-300 dark:placeholder:text-slate-600"
                />
              </div>

              {/* Phone */}
              <LabelledInput
                name="phone"
                label="Phone Number"
                type="tel"
                value={formData.phone}
                required
                onChange={handleInputChange}
                onBlur={(e) =>
                  validateField("phone", e.target.value, validatePhone)
                }
                fieldState={getFieldState("phone")}
                inputClassName="placeholder:text-slate-300 dark:placeholder:text-slate-600"
              />

              {/* Position & Province */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabelledSelect
                  name="position"
                  label="Position"
                  options={positions}
                  value={formData.position}
                  required
                  onChange={handleInputChange}
                  inputClassName={!formData.position ? "text-slate-400 dark:text-slate-500" : ""}
                />
                <LabelledSelect
                  name="province"
                  label="Province"
                  options={provinces}
                  value={formData.province}
                  required
                  onChange={handleInputChange}
                  inputClassName={!formData.province ? "text-slate-400 dark:text-slate-500" : ""}
                />
              </div>

              {/* Experience & Relocation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabelledSelect
                  name="experience"
                  label="Experience"
                  options={experienceLevels}
                  value={formData.experience}
                  required
                  onChange={handleInputChange}
                  inputClassName={!formData.experience ? "text-slate-400 dark:text-slate-500" : ""}
                />
                <LabelledSelect
                  name="willingToRelocate"
                  label="Willing to Relocate?"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                    { value: "depends", label: "Depends" },
                  ]}
                  value={formData.willingToRelocate}
                  required
                  onChange={handleInputChange}
                  inputClassName={!formData.willingToRelocate ? "text-slate-400 dark:text-slate-500" : ""}
                />
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Upload CV (Optional)
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${fileName
                      ? "border-primary bg-primary/5"
                      : "border-slate-200 dark:border-slate-600 hover:border-primary/50"
                    }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {fileName ? (
                    <div className="flex items-center justify-center gap-3">
                      <span className="material-symbols-outlined text-primary text-xl">
                        description
                      </span>
                      <span className="text-slate-900 dark:text-white font-medium text-sm">
                        {fileName}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile();
                        }}
                        className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-slate-400 text-2xl mb-1">
                        cloud_upload
                      </span>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        <span className="text-primary font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        PDF, DOC, DOCX (Max 5MB)
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Privacy Consent */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleInputChange}
                  required
                  className="w-5 h-5 mt-0.5 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary"
                />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  I agree to the{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>{" "}
                  and consent to Metrosure processing my application. *
                </span>
              </label>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 px-8 bg-primary hover:bg-[rgb(var(--color-primary-hover))] text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                    <span>Submit Application</span>
                    <span className="material-symbols-outlined">send</span>
                  </>
                )}
              </motion.button>
            </form>
          )}
        </div>

        {/* Contact Info - Compact */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
          Questions? Email{" "}
          <a href="mailto:hr@metrosureconsult.co.za" className="text-primary hover:underline">
            hr@metrosureconsult.co.za
          </a>
        </p>
      </div>
    </motion.section>
  );
}
