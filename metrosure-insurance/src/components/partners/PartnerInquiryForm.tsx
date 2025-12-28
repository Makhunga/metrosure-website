"use client";

import { useState, useRef, useCallback } from "react";
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
  getInputClassesWithIcon
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
  { id: "instore-campaigns", label: "In-Store Insurance Campaigns" },
  { id: "outsourced-sales", label: "Outsourced Sales & Marketing" },
  { id: "credit-facility", label: "In-Store Credit Facility" }
];

export default function PartnerInquiryForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldStates, setFieldStates] = useState<FieldStates>({});

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

  const inputClasses =
    "w-full rounded-xl border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-[rgb(var(--color-surface-card))] transition-all py-3.5 px-4 text-[rgb(var(--color-text-main))] placeholder:text-[rgb(var(--color-text-subtle))]";

  const labelClasses =
    "block text-xs font-bold uppercase text-[rgb(var(--color-text-muted))] tracking-wider ml-1 mb-2";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
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
  };

  return (
    <section
      ref={ref}
      id="partner-inquiry"
      className="relative py-24 bg-[rgb(var(--color-surface-card))] transition-colors duration-300"
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
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              Start Your Partnership
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6">
              Ready to Partner With Us?
            </h2>
            <p className="text-xl text-[rgb(var(--color-text-body))] mb-8">
              Fill out the form and our partnership team will get back to you within
              <strong className="text-[rgb(var(--color-text-main))]"> 24 hours</strong>.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">call</span>
                </div>
                <div>
                  <div className="text-sm text-[rgb(var(--color-text-muted))]">Phone</div>
                  <a href="tel:+27313011192" className="font-semibold text-[rgb(var(--color-text-main))] hover:text-primary transition-colors">
                    +27 31 301 1192
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">mail</span>
                </div>
                <div>
                  <div className="text-sm text-[rgb(var(--color-text-muted))]">Email</div>
                  <a href="mailto:partnerships@metrosuregroup.co.za" className="font-semibold text-[rgb(var(--color-text-main))] hover:text-primary transition-colors">
                    partnerships@metrosuregroup.co.za
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                </div>
                <div>
                  <div className="text-sm text-[rgb(var(--color-text-muted))]">Head Office</div>
                  <div className="font-semibold text-[rgb(var(--color-text-main))]">
                    391 Anton Lembede Street, Metropolitan Life Building, 5th Floor, Durban, 4001
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))]">
                <span className="material-symbols-outlined text-primary text-lg">verified</span>
                <span className="text-sm font-medium text-[rgb(var(--color-text-body))]">FSP Licensed</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))]">
                <span className="material-symbols-outlined text-primary text-lg">security</span>
                <span className="text-sm font-medium text-[rgb(var(--color-text-body))]">POPIA Compliant</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[rgb(var(--color-surface))] rounded-3xl p-8 md:p-10 shadow-xl border border-[rgb(var(--color-border-light))]">
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
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Error Message */}
                    {error && (
                      <motion.div
                        className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-lg">error</span>
                          <span>{error}</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Business Information Section */}
                    <div className="pb-6 border-b border-[rgb(var(--color-border-light))]">
                      <h3 className="text-lg font-bold text-[rgb(var(--color-text-main))] mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">business</span>
                        Business Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClasses} htmlFor="companyName">Company Name *</label>
                          <input
                            className={inputClasses}
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="Your company name"
                            required
                          />
                        </div>
                        <div>
                          <label className={labelClasses} htmlFor="businessType">Business Type *</label>
                          <div className="relative">
                            <select
                              className={`${inputClasses} appearance-none pr-12`}
                              id="businessType"
                              name="businessType"
                              value={formData.businessType}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select type...</option>
                              {businessTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[rgb(var(--color-text-muted))]">
                              <span className="material-symbols-outlined text-xl">expand_more</span>
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <label className={labelClasses} htmlFor="numberOfLocations">Number of Locations *</label>
                          <div className="relative">
                            <select
                              className={`${inputClasses} appearance-none pr-12`}
                              id="numberOfLocations"
                              name="numberOfLocations"
                              value={formData.numberOfLocations}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select...</option>
                              {locationCounts.map(count => (
                                <option key={count} value={count}>{count}</option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[rgb(var(--color-text-muted))]">
                              <span className="material-symbols-outlined text-xl">expand_more</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="pb-6 border-b border-[rgb(var(--color-border-light))]">
                      <h3 className="text-lg font-bold text-[rgb(var(--color-text-main))] mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">person</span>
                        Contact Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClasses} htmlFor="contactName">Your Name *</label>
                          <div className="relative">
                            <InputIcon
                              icon="person"
                              valid={getFieldState("contactName").valid}
                              touched={getFieldState("contactName").touched}
                            />
                            <input
                              className={getInputClassesWithIcon(getFieldState("contactName"))}
                              id="contactName"
                              name="contactName"
                              value={formData.contactName}
                              onChange={handleInputChange}
                              onBlur={(e) => validateField("contactName", e.target.value, (v) => validateRequired(v, "Name"))}
                              placeholder="Full name"
                              required
                            />
                          </div>
                          <InlineError error={getFieldState("contactName").error} />
                        </div>
                        <div>
                          <label className={labelClasses} htmlFor="jobTitle">Job Title *</label>
                          <div className="relative">
                            <InputIcon
                              icon="badge"
                              valid={getFieldState("jobTitle").valid}
                              touched={getFieldState("jobTitle").touched}
                            />
                            <input
                              className={getInputClassesWithIcon(getFieldState("jobTitle"))}
                              id="jobTitle"
                              name="jobTitle"
                              value={formData.jobTitle}
                              onChange={handleInputChange}
                              onBlur={(e) => validateField("jobTitle", e.target.value, (v) => validateRequired(v, "Job title"))}
                              placeholder="Your role"
                              required
                            />
                          </div>
                          <InlineError error={getFieldState("jobTitle").error} />
                        </div>
                        <div>
                          <label className={labelClasses} htmlFor="email">Email Address *</label>
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
                              onBlur={(e) => validateField("email", e.target.value, validateEmail)}
                              placeholder="you@company.com"
                              required
                            />
                          </div>
                          <InlineError error={getFieldState("email").error} />
                        </div>
                        <div>
                          <label className={labelClasses} htmlFor="phone">Phone Number *</label>
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
                              onBlur={(e) => validateField("phone", e.target.value, validatePhone)}
                              placeholder="+27 XX XXX XXXX"
                              required
                            />
                          </div>
                          <InlineError error={getFieldState("phone").error} />
                        </div>
                      </div>
                    </div>

                    {/* Location Section */}
                    <div className="pb-6 border-b border-[rgb(var(--color-border-light))]">
                      <h3 className="text-lg font-bold text-[rgb(var(--color-text-main))] mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">location_on</span>
                        Location
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClasses} htmlFor="province">Province *</label>
                          <div className="relative">
                            <select
                              className={`${inputClasses} appearance-none pr-12`}
                              id="province"
                              name="province"
                              value={formData.province}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select province...</option>
                              {provinces.map(province => (
                                <option key={province} value={province}>{province}</option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[rgb(var(--color-text-muted))]">
                              <span className="material-symbols-outlined text-xl">expand_more</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className={labelClasses} htmlFor="city">City/Town *</label>
                          <input
                            className={inputClasses}
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="City or town"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Services Interested Section */}
                    <div className="pb-6 border-b border-[rgb(var(--color-border-light))]">
                      <h3 className="text-lg font-bold text-[rgb(var(--color-text-main))] mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">interests</span>
                        Services Interested In
                      </h3>
                      <div className="space-y-3">
                        {services.map(service => (
                          <label
                            key={service.id}
                            className="flex items-center gap-3 p-4 rounded-xl border border-[rgb(var(--color-border-light))] cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
                          >
                            <input
                              type="checkbox"
                              checked={formData.servicesInterested.includes(service.id)}
                              onChange={() => handleServiceChange(service.id)}
                              className="w-5 h-5 rounded border-[rgb(var(--color-border-medium))] text-primary focus:ring-primary"
                            />
                            <span className="text-[rgb(var(--color-text-main))] font-medium">{service.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Additional Information Section */}
                    <div className="pb-6 border-b border-[rgb(var(--color-border-light))]">
                      <h3 className="text-lg font-bold text-[rgb(var(--color-text-main))] mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">info</span>
                        Additional Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className={labelClasses} htmlFor="currentFootTraffic">Current Customer Foot Traffic</label>
                          <div className="relative">
                            <select
                              className={`${inputClasses} appearance-none pr-12`}
                              id="currentFootTraffic"
                              name="currentFootTraffic"
                              value={formData.currentFootTraffic}
                              onChange={handleInputChange}
                            >
                              <option value="">Select range...</option>
                              {trafficLevels.map(level => (
                                <option key={level} value={level}>{level}</option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[rgb(var(--color-text-muted))]">
                              <span className="material-symbols-outlined text-xl">expand_more</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className={labelClasses} htmlFor="message">Message (Optional)</label>
                          <textarea
                            className={`${inputClasses} resize-none`}
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell us more about your business and partnership goals..."
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Consent Checkboxes */}
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="privacyConsent"
                          checked={formData.privacyConsent}
                          onChange={handleInputChange}
                          required
                          className="w-5 h-5 mt-0.5 rounded border-[rgb(var(--color-border-medium))] text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-[rgb(var(--color-text-body))]">
                          I agree to the <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and consent to Metrosure processing my data for this inquiry. *
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="marketingConsent"
                          checked={formData.marketingConsent}
                          onChange={handleInputChange}
                          className="w-5 h-5 mt-0.5 rounded border-[rgb(var(--color-border-medium))] text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-[rgb(var(--color-text-body))]">
                          I would like to receive updates about Metrosure partnership opportunities and news.
                        </span>
                      </label>
                    </div>

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
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Partnership Inquiry</span>
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
