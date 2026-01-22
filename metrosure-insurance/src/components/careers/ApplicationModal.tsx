"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Modal,
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

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPosition?: string;
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

export default function ApplicationModal({
  isOpen,
  onClose,
  selectedPosition,
}: ApplicationModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
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

  // Update form when selectedPosition changes
  useEffect(() => {
    if (selectedPosition && isOpen) {
      const matchedPosition = positions.find(
        (p) =>
          p.label.toLowerCase() === selectedPosition.toLowerCase() ||
          selectedPosition.toLowerCase().includes(p.label.toLowerCase())
      );
      if (matchedPosition) {
        setFormData((prev) => ({ ...prev, position: matchedPosition.value }));
      }
    }
  }, [selectedPosition, isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Small delay to allow animation to complete
      const timeout = setTimeout(() => {
        setFormData(initialFormData);
        setFileName("");
        setIsSubmitted(false);
        setError(null);
        setFieldStates({});
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

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
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
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
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <FormSuccess
            key="success"
            title="Application Received!"
            description="Thank you for applying to join Metrosure. We'll review your application and get back to you within 48 hours."
            buttonText="Apply for Another Position"
            onReset={handleReset}
            accentColor="green"
          />
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold mb-3">
                <span className="inline-flex rounded-full h-2 w-2 bg-green-500" />
                Actively Hiring
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Quick Apply
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mt-1 text-sm">
                Takes less than 2 minutes
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/15 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">error</span>
                  <span>{error}</span>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  onBlur={(e) => validateField("email", e.target.value, validateEmail)}
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
                onBlur={(e) => validateField("phone", e.target.value, validatePhone)}
                fieldState={getFieldState("phone")}
                inputClassName="placeholder:text-slate-300 dark:placeholder:text-slate-600"
              />

              {/* Position & Province */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              {/* CV Upload */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Upload CV (Optional)</label>
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
                      <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-2xl mb-1">
                        cloud_upload
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        <span className="text-primary font-semibold">Click to upload</span> or
                        drag and drop
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
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary"
                />
                <span className="text-xs text-slate-600 dark:text-slate-300">
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
                whileHover={!isSubmitting ? { scale: 1.03, y: -2 } : {}}
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
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
