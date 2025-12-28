"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { FormSuccess } from "@/components/ui/FormSuccess";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const inputClasses =
    "w-full rounded-xl border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-[rgb(var(--color-surface-card))] transition-all py-3.5 px-4 text-[rgb(var(--color-text-main))] placeholder:text-[rgb(var(--color-text-subtle))] text-sm";

  const labelClasses =
    "block text-xs font-bold uppercase text-[rgb(var(--color-text-muted))] tracking-wider ml-1 mb-2";

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
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Actively Hiring
              </div>
              <h3 className="text-2xl font-bold text-[rgb(var(--color-text-main))]">
                Quick Apply
              </h3>
              <p className="text-[rgb(var(--color-text-body))] mt-1 text-sm">
                Takes less than 2 minutes
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm"
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
              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses} htmlFor="modal-fullName">
                    Full Name *
                  </label>
                  <input
                    className={inputClasses}
                    id="modal-fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className={labelClasses} htmlFor="modal-email">
                    Email Address *
                  </label>
                  <input
                    className={inputClasses}
                    id="modal-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses} htmlFor="modal-phone">
                  Phone Number *
                </label>
                <input
                  className={inputClasses}
                  id="modal-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+27 XX XXX XXXX"
                  required
                />
              </div>

              {/* Position & Province */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses} htmlFor="modal-position">
                    Position Interested In *
                  </label>
                  <div className="relative">
                    <select
                      className={`${inputClasses} appearance-none pr-10`}
                      id="modal-position"
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
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[rgb(var(--color-text-muted))]">
                      <span className="material-symbols-outlined text-lg">expand_more</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className={labelClasses} htmlFor="modal-province">
                    Province *
                  </label>
                  <div className="relative">
                    <select
                      className={`${inputClasses} appearance-none pr-10`}
                      id="modal-province"
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
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[rgb(var(--color-text-muted))]">
                      <span className="material-symbols-outlined text-lg">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience & Relocation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses} htmlFor="modal-experience">
                    Years of Experience *
                  </label>
                  <div className="relative">
                    <select
                      className={`${inputClasses} appearance-none pr-10`}
                      id="modal-experience"
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
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[rgb(var(--color-text-muted))]">
                      <span className="material-symbols-outlined text-lg">expand_more</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className={labelClasses} htmlFor="modal-willingToRelocate">
                    Willing to Relocate? *
                  </label>
                  <div className="relative">
                    <select
                      className={`${inputClasses} appearance-none pr-10`}
                      id="modal-willingToRelocate"
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
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[rgb(var(--color-text-muted))]">
                      <span className="material-symbols-outlined text-lg">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CV Upload */}
              <div>
                <label className={labelClasses}>Upload CV (Optional)</label>
                <div
                  className={`relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                    fileName
                      ? "border-primary bg-primary/5"
                      : "border-[rgb(var(--color-border-light))] hover:border-primary/50"
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
                      <span className="text-[rgb(var(--color-text-main))] font-medium text-sm">
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
                      <span className="material-symbols-outlined text-[rgb(var(--color-text-muted))] text-2xl mb-1">
                        cloud_upload
                      </span>
                      <p className="text-[rgb(var(--color-text-body))] text-sm">
                        <span className="text-primary font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-[rgb(var(--color-text-muted))] mt-1">
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
                  className="w-4 h-4 mt-0.5 rounded border-[rgb(var(--color-border-medium))] text-primary focus:ring-primary"
                />
                <span className="text-xs text-[rgb(var(--color-text-body))]">
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
                className="w-full py-3.5 px-8 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isSubmitting ? { scale: 0.99 } : {}}
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
