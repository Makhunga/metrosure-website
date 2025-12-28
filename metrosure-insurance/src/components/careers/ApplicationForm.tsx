"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { InputIcon } from "@/components/ui/InputIcon";
import { InlineError } from "@/components/ui/InlineError";
import {
  FieldState,
  FieldStates,
  validateEmail,
  validatePhone,
  validateRequired,
  getInputClassesWithIcon,
  labelClasses,
} from "@/lib/formValidation";

interface ApplicationFormProps {
  id?: string;
  selectedPosition?: string;
  onPositionChange?: (position: string) => void;
}

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

const positions = [
  { value: "sales-consultant", label: "Sales Consultant" },
  { value: "call-centre-agent", label: "Call Centre Agent" },
  { value: "telesales-rep", label: "Telesales Representative" },
  { value: "client-service-admin", label: "Client Service Administrator" },
  { value: "trainee-sales", label: "Trainee/Entry Level" },
  { value: "other", label: "Other" },
];

const provinces = [
  { value: "kwazulu-natal", label: "KwaZulu-Natal" },
  { value: "gauteng", label: "Gauteng" },
  { value: "western-cape", label: "Western Cape" },
  { value: "eastern-cape", label: "Eastern Cape" },
  { value: "free-state", label: "Free State" },
  { value: "mpumalanga", label: "Mpumalanga" },
  { value: "limpopo", label: "Limpopo" },
  { value: "north-west", label: "North West" },
  { value: "northern-cape", label: "Northern Cape" },
  { value: "any", label: "Any Province" },
];

const experienceLevels = [
  { value: "none", label: "No Experience" },
  { value: "0-1", label: "Less than 1 year" },
  { value: "1-3", label: "1-3 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "5+", label: "5+ years" },
];

export default function ApplicationForm({
  id,
  selectedPosition,
  onPositionChange,
}: ApplicationFormProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fieldStates, setFieldStates] = useState<FieldStates>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validation callback
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

  // Get field state helper
  const getFieldState = (fieldName: string): FieldState => {
    return fieldStates[fieldName] || { touched: false, error: null, valid: false };
  };

  // Update form when selectedPosition changes from parent
  useEffect(() => {
    if (selectedPosition) {
      // Find matching position value
      const matchedPosition = positions.find(
        (p) =>
          p.label.toLowerCase() === selectedPosition.toLowerCase() ||
          selectedPosition.toLowerCase().includes(p.label.toLowerCase())
      );
      if (matchedPosition) {
        setFormData((prev) => ({ ...prev, position: matchedPosition.value }));
      }
    }
  }, [selectedPosition]);

  // Standard input classes for selects (no icon/validation state)
  const selectClasses =
    "w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-700 transition-all py-3.5 px-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === "position" && onPositionChange) {
        const positionLabel = positions.find((p) => p.value === value)?.label;
        onPositionChange(positionLabel || value);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a PDF or Word document");
        return;
      }
      // Validate file size (5MB max)
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
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred. Please try again."
      );
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
    <section
      ref={ref}
      id={id}
      className="relative py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-semibold mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Actively Hiring
              </span>
            </motion.span>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              We&apos;re Always <span className="text-primary">Hiring</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              Join our sales and customer service teams. Apply now and hear
              back within <strong className="text-slate-900 dark:text-white">48 hours</strong>.
            </p>

            {/* Key Points */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">
                    school
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    No Experience? No Problem
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    We provide full training to get you started
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">
                    location_on
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    Multiple Locations
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Offices across South Africa, find one near you
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">
                    payments
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    Start Earning Fast
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Competitive base + commission structure
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Questions? Contact HR
              </h3>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  mail
                </span>
                <a
                  href="mailto:hr@metrosuregroup.co.za"
                  className="text-slate-900 dark:text-white hover:text-primary transition-colors"
                >
                  hr@metrosuregroup.co.za
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  call
                </span>
                <a
                  href="tel:+27313011192"
                  className="text-slate-900 dark:text-white hover:text-primary transition-colors"
                >
                  +27 31 301 1192
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl border border-slate-200 dark:border-slate-700">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <FormSuccess
                    title="Application Received!"
                    description="Thank you for applying to join Metrosure. We'll review your application and get back to you within 48 hours."
                    buttonText="Apply for Another Position"
                    onReset={resetForm}
                    accentColor="green"
                  />
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Quick Apply
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mt-1">
                        Takes less than 2 minutes
                      </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
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

                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClasses} htmlFor="fullName">
                          Full Name *
                        </label>
                        <div className="relative">
                          <InputIcon
                            icon="person"
                            valid={getFieldState("fullName").valid}
                            touched={getFieldState("fullName").touched}
                          />
                          <input
                            className={getInputClassesWithIcon(getFieldState("fullName"))}
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            onBlur={(e) =>
                              validateField("fullName", e.target.value, (v) =>
                                validateRequired(v, "Full name")
                              )
                            }
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <InlineError error={getFieldState("fullName").error} />
                      </div>
                      <div>
                        <label className={labelClasses} htmlFor="email">
                          Email Address *
                        </label>
                        <div className="relative">
                          <InputIcon
                            icon="mail"
                            valid={getFieldState("email").valid}
                            touched={getFieldState("email").touched}
                          />
                          <input
                            className={getInputClassesWithIcon(getFieldState("email"))}
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            onBlur={(e) =>
                              validateField("email", e.target.value, validateEmail)
                            }
                            placeholder="you@email.com"
                            required
                          />
                        </div>
                        <InlineError error={getFieldState("email").error} />
                      </div>
                    </div>

                    <div>
                      <label className={labelClasses} htmlFor="phone">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <InputIcon
                          icon="call"
                          valid={getFieldState("phone").valid}
                          touched={getFieldState("phone").touched}
                        />
                        <input
                          className={getInputClassesWithIcon(getFieldState("phone"))}
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onBlur={(e) =>
                            validateField("phone", e.target.value, validatePhone)
                          }
                          placeholder="+27 XX XXX XXXX"
                          required
                        />
                      </div>
                      <InlineError error={getFieldState("phone").error} />
                    </div>

                    {/* Position & Province */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClasses} htmlFor="position">
                          Position Interested In *
                        </label>
                        <div className="relative">
                          <select
                            className={`${selectClasses} appearance-none pr-10 sm:pr-12`}
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select position...</option>
                            {positions.map((pos) => (
                              <option key={pos.value} value={pos.value}>
                                {pos.label}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-xl">
                              expand_more
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className={labelClasses} htmlFor="province">
                          Province *
                        </label>
                        <div className="relative">
                          <select
                            className={`${selectClasses} appearance-none pr-10 sm:pr-12`}
                            id="province"
                            name="province"
                            value={formData.province}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select province...</option>
                            {provinces.map((prov) => (
                              <option key={prov.value} value={prov.value}>
                                {prov.label}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-xl">
                              expand_more
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Experience & Relocation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClasses} htmlFor="experience">
                          Years of Experience *
                        </label>
                        <div className="relative">
                          <select
                            className={`${selectClasses} appearance-none pr-10 sm:pr-12`}
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select experience...</option>
                            {experienceLevels.map((exp) => (
                              <option key={exp.value} value={exp.value}>
                                {exp.label}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-xl">
                              expand_more
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className={labelClasses} htmlFor="willingToRelocate">
                          Willing to Relocate? *
                        </label>
                        <div className="relative">
                          <select
                            className={`${selectClasses} appearance-none pr-10 sm:pr-12`}
                            id="willingToRelocate"
                            name="willingToRelocate"
                            value={formData.willingToRelocate}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select...</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="depends">Depends on location</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-xl">
                              expand_more
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CV Upload */}
                    <div>
                      <label className={labelClasses}>
                        Upload CV (Optional)
                      </label>
                      <div
                        className={`relative border-2 border-dashed rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-all ${
                          fileName
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
                            <span className="material-symbols-outlined text-primary text-2xl">
                              description
                            </span>
                            <span className="text-slate-900 dark:text-white font-medium">
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
                              <span className="material-symbols-outlined text-lg">
                                close
                              </span>
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-3xl mb-2">
                              cloud_upload
                            </span>
                            <p className="text-slate-600 dark:text-slate-300">
                              <span className="text-primary font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
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
                        <a
                          href="/privacy"
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </a>{" "}
                        and consent to Metrosure processing my application. *
                      </span>
                    </label>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-8 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                      whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
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
                          <span>Submit Application</span>
                          <span className="material-symbols-outlined">send</span>
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
