"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { track } from "@vercel/analytics";
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
  attachments: File[];
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
  attachments: [],
  privacyConsent: false,
};

const MAX_TOTAL_SIZE = 5 * 1024 * 1024; // 5MB total
const VALID_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function ApplicationForm({
  id,
  selectedPosition,
  onPositionChange,
}: ApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldStates, setFieldStates] = useState<FieldStates>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Honeypot field for spam prevention (hidden from users, filled by bots)
  const [honeypot, setHoneypot] = useState("");

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

  const getTotalFileSize = (files: File[]) => files.reduce((sum, f) => sum + f.size, 0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!VALID_TYPES.includes(file.type)) {
        setError("Please upload PDF or Word documents only");
        return;
      }
      newFiles.push(file);
    }

    const currentSize = getTotalFileSize(formData.attachments);
    const newSize = getTotalFileSize(newFiles);
    if (currentSize + newSize > MAX_TOTAL_SIZE) {
      setError("Total file size must be less than 5MB");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newFiles]
    }));
    setError(null);

    // Reset input to allow selecting same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
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
      formData.attachments.forEach((file) => {
        formDataToSend.append("attachments", file);
      });

      const response = await fetch("/api/careers-application", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit application");
      }

      setIsSubmitted(true);

      // Track successful submission
      track("career_application_submitted", {
        position: formData.position,
        experience: formData.experience,
      });
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
    setIsSubmitted(false);
    setError(null);
    setFieldStates({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section
      id={id}
      className="relative py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Info */}
          <div className="lg:sticky lg:top-24">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-semibold mb-4">
              Actively Hiring
            </span>

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
            <div className="space-y-3 p-6 rounded-2xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[rgb(var(--color-text-muted))]">
                Questions? Contact HR
              </h3>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  mail
                </span>
                <a
                  href="mailto:hr@metrosureconsult.co.za"
                  className="text-slate-900 dark:text-white hover:text-primary transition-colors"
                >
                  hr@metrosureconsult.co.za
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
          </div>

          {/* Right Column - Form */}
          <div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-10 shadow-lg dark:shadow-slate-900/30 border border-slate-200 dark:border-slate-700">
              {isSubmitted ? (
                <FormSuccess
                  title="Application Received!"
                  description="Thank you for applying to join Metrosure. We'll review your application and get back to you within 48 hours."
                  buttonText="Apply for Another Position"
                  onReset={resetForm}
                  accentColor="green"
                />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="p-4 rounded-xl bg-red-50 dark:bg-red-900/15 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
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
                      label="Position Interested In"
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
                      label="Years of Experience"
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
                        { value: "depends", label: "Depends on location" },
                      ]}
                      value={formData.willingToRelocate}
                      required
                      onChange={handleInputChange}
                      inputClassName={!formData.willingToRelocate ? "text-slate-400 dark:text-slate-500" : ""}
                    />
                  </div>

                  {/* Attachments Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Attachments (Optional)
                    </label>

                    {/* File list */}
                    {formData.attachments.length > 0 && (
                      <div className="mb-3 space-y-2">
                        {formData.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">
                                description
                              </span>
                              <span className="text-slate-900 dark:text-white font-medium truncate">
                                {file.name}
                              </span>
                              <span className="text-xs text-slate-500 flex-shrink-0">
                                ({(file.size / 1024).toFixed(0)} KB)
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors flex-shrink-0"
                            >
                              <span className="material-symbols-outlined text-lg">
                                close
                              </span>
                            </button>
                          </div>
                        ))}
                        <p className="text-xs text-slate-500">
                          Total: {(getTotalFileSize(formData.attachments) / 1024).toFixed(0)} KB / 5 MB
                        </p>
                      </div>
                    )}

                    {/* Upload area */}
                    <div
                      className="relative border-2 border-dashed rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-all border-slate-200 dark:border-slate-600 hover:border-primary/50"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
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
                        CV, cover letter, certificates - PDF, DOC, DOCX (Max 5MB total)
                      </p>
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
                    className="w-full h-12 px-8 bg-primary hover:bg-[rgb(var(--color-primary-hover))] text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    whileHover={!isSubmitting ? { scale: 1.03, y: -2 } : {}}
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
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
