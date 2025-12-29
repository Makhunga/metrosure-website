"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FormSuccess } from "@/components/ui/FormSuccess";
import {
  validateEmail,
  validatePhone,
  validateRequired,
  type FieldState,
  type FieldStates,
} from "@/lib/formValidation";

type ContactTab = "message" | "callback";

interface FormState {
  isSubmitting: boolean;
  error: string | null;
}

// Inline error message component with ARIA support
function InlineError({ error, id }: { error: string | null; id?: string }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          id={id}
          role="alert"
          aria-live="polite"
          initial={{ opacity: 0, y: -5, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -5, height: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5 mt-1.5 ml-1"
        >
          <span className="material-symbols-outlined text-red-500 text-sm" aria-hidden="true">error</span>
          <span className="text-red-500 text-xs font-medium">{error}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Input wrapper with icon and validation state
function InputIcon({ icon, valid, touched }: { icon: string; valid?: boolean; touched?: boolean }) {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
      <span className={`material-symbols-outlined text-lg transition-colors ${
        touched && valid ? "text-green-500" :
        touched && !valid ? "text-red-400" :
        "text-slate-400"
      }`}>
        {touched && valid ? "check_circle" : icon}
      </span>
    </div>
  );
}

const callbackReasons = [
  { value: "", label: "Select a reason..." },
  { value: "car-insurance", label: "Car Insurance" },
  { value: "home-insurance", label: "Home Insurance" },
  { value: "life-insurance", label: "Life Insurance" },
  { value: "funeral-cover", label: "Funeral Cover" },
  { value: "business-insurance", label: "Business Insurance" },
  { value: "credit-life", label: "Credit Life Insurance" },
  { value: "retirement-planning", label: "Retirement Planning" },
  { value: "employee-benefits", label: "Employee Benefits" },
  { value: "retail-partnership", label: "Retail Partnership" },
  { value: "claims", label: "Claims Enquiry" },
  { value: "policy-changes", label: "Policy Changes" },
  { value: "other", label: "Other" },
];

const MAX_OTHER_CHARS = 150;
const MAX_MESSAGE_CHARS = 2000;

// Message form topic options (including B2B)
const messageTopics = [
  { value: "general", label: "General Inquiry" },
  { value: "claim-status", label: "Claim Status" },
  { value: "retail-partnership", label: "Retail Partnership (B2B)" },
  { value: "business-insurance", label: "Business Insurance (B2B)" },
  { value: "employee-benefits", label: "Employee Benefits (B2B)" },
  { value: "feedback", label: "Feedback" },
];

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState<ContactTab>("message");
  const [messageSent, setMessageSent] = useState(false);
  const [callbackSent, setCallbackSent] = useState(false);
  const [callbackReason, setCallbackReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [formState, setFormState] = useState<FormState>({ isSubmitting: false, error: null });
  const [fieldStates, setFieldStates] = useState<FieldStates>({});
  const ref = useRef(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const cbNameRef = useRef<HTMLInputElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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

  // Reset field states when switching tabs
  const handleTabChange = (tab: ContactTab) => {
    setActiveTab(tab);
    setFieldStates({});
    setMessageContent("");
    setFormState({ isSubmitting: false, error: null });
  };

  // Handle message content change with character limit
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_MESSAGE_CHARS) {
      setMessageContent(value);
    }
  };

  // Validate all message form fields before submit
  const validateMessageForm = (formData: FormData): boolean => {
    const name = formData.get("name") as string || "";
    const email = formData.get("email") as string || "";
    const message = formData.get("message") as string || "";

    let isValid = true;
    const newFieldStates: FieldStates = {};

    // Validate name
    const nameError = validateRequired(name, "Name");
    newFieldStates.name = { touched: true, error: nameError, valid: !nameError && name.length > 0 };
    if (nameError) isValid = false;

    // Validate email
    const emailError = validateEmail(email);
    newFieldStates.email = { touched: true, error: emailError, valid: !emailError && email.length > 0 };
    if (emailError) isValid = false;

    // Validate message
    const messageError = validateRequired(message, "Message");
    newFieldStates.message = { touched: true, error: messageError, valid: !messageError && message.length > 0 };
    if (messageError) isValid = false;

    setFieldStates(prev => ({ ...prev, ...newFieldStates }));

    // Focus first invalid field
    if (!isValid) {
      if (nameError) nameRef.current?.focus();
      else if (emailError) document.getElementById("email")?.focus();
      else if (messageError) document.getElementById("message")?.focus();
    }

    return isValid;
  };

  // Validate all callback form fields before submit
  const validateCallbackForm = (formData: FormData): boolean => {
    const name = formData.get("cb_name") as string || "";
    const phone = formData.get("cb_phone") as string || "";

    let isValid = true;
    const newFieldStates: FieldStates = {};

    // Validate name
    const nameError = validateRequired(name, "Full name");
    newFieldStates.cb_name = { touched: true, error: nameError, valid: !nameError && name.length > 0 };
    if (nameError) isValid = false;

    // Validate phone
    const phoneError = validatePhone(phone);
    newFieldStates.cb_phone = { touched: true, error: phoneError, valid: !phoneError && phone.length > 0 };
    if (phoneError) isValid = false;

    setFieldStates(prev => ({ ...prev, ...newFieldStates }));

    // Focus first invalid field
    if (!isValid) {
      if (nameError) cbNameRef.current?.focus();
      else if (phoneError) document.getElementById("cb_phone")?.focus();
    }

    return isValid;
  };

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Validate all fields before submit
    if (!validateMessageForm(formData)) {
      return;
    }

    setFormState({ isSubmitting: true, error: null });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "message",
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          companyName: formData.get("companyName") || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setMessageSent(true);
      setMessageContent("");
      form.reset();
    } catch (error) {
      setFormState({
        isSubmitting: false,
        error: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleCallbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Validate all fields before submit
    if (!validateCallbackForm(formData)) {
      return;
    }

    setFormState({ isSubmitting: true, error: null });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "callback",
          name: formData.get("cb_name"),
          phone: formData.get("cb_phone"),
          reason: callbackReason,
          otherReason: callbackReason === "other" ? otherReason : undefined,
          preferredDate: formData.get("cb_date"),
          preferredTime: formData.get("cb_time"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit request");
      }

      setCallbackSent(true);
      setCallbackReason("");
      setOtherReason("");
      form.reset();
    } catch (error) {
      setFormState({
        isSubmitting: false,
        error: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleOtherReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_OTHER_CHARS) {
      setOtherReason(value);
    }
  };

  // Dynamic input classes based on validation state
  const getInputClasses = (fieldName?: string) => {
    const state = fieldName ? getFieldState(fieldName) : { touched: false, error: null, valid: false };
    const baseClasses = "w-full rounded-xl shadow-sm transition-all py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500";

    if (state.touched && state.error) {
      return `${baseClasses} border-2 border-red-400 bg-red-50 dark:bg-red-900/15 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800/30 pl-12 pr-4`;
    }
    if (state.touched && state.valid) {
      return `${baseClasses} border-2 border-green-400 bg-green-50 dark:bg-green-900/15 focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800/30 pl-12 pr-4`;
    }
    return `${baseClasses} border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-700 pl-12 pr-4`;
  };

  // Standard input classes without icon
  const inputClasses =
    "w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-700 transition-all py-3.5 px-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500";

  const labelClasses =
    "block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider ml-1 mb-2";

  return (
    <motion.div
      ref={ref}
      className="max-w-4xl mx-auto mb-24"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700"
        whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
        transition={{ duration: 0.3 }}
      >
        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 relative z-10">
          <motion.button
            onClick={() => handleTabChange("message")}
            className="flex-1 cursor-pointer select-none relative group"
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`py-6 px-6 text-center transition-all duration-300 ${
                activeTab === "message"
                  ? "bg-white dark:bg-slate-700"
                  : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <div
                className={`flex items-center justify-center gap-2 font-semibold text-sm md:text-base ${
                  activeTab === "message"
                    ? "text-primary"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                <span className="material-symbols-outlined text-lg">mail</span>
                <span>Contact Us</span>
              </div>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full"
                initial={false}
                animate={{ scaleX: activeTab === "message" ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0.5 }}
              />
            </div>
          </motion.button>

          <motion.button
            onClick={() => handleTabChange("callback")}
            className="flex-1 cursor-pointer select-none relative group border-l border-slate-200 dark:border-slate-700"
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`py-6 px-6 text-center transition-all duration-300 ${
                activeTab === "callback"
                  ? "bg-white dark:bg-slate-700"
                  : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <div
                className={`flex items-center justify-center gap-2 font-semibold text-sm md:text-base ${
                  activeTab === "callback"
                    ? "text-primary"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                <span className="material-symbols-outlined text-lg">call</span>
                <span>Request Call Back</span>
              </div>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full"
                initial={false}
                animate={{ scaleX: activeTab === "callback" ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0.5 }}
              />
            </div>
          </motion.button>
        </div>

        {/* Form Content */}
        <div className="p-8 md:p-12 bg-white dark:bg-slate-800">
          <AnimatePresence mode="wait">
            {/* Message Tab */}
            {activeTab === "message" && (
              <motion.div
                key="message"
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {messageSent ? (
                  <FormSuccess
                    icon="check_circle"
                    title="Message Sent Successfully!"
                    description="Thank you for contacting Metrosure. We have received your message and our team will get back to you shortly."
                    buttonText="Send Another Message"
                    onReset={() => setMessageSent(false)}
                  />
                ) : (
                  <>
                    <div className="text-center mb-10">
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                        Send us a direct message
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400">
                        Prefer to write? Fill out the form below and we&apos;ll route it to the right
                        team.
                      </p>
                    </div>
                    <form className="space-y-6" onSubmit={handleMessageSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <label className={labelClasses} htmlFor="name">
                            Name
                          </label>
                          <div className="relative">
                            <InputIcon
                              icon="person"
                              valid={getFieldState("name").valid}
                              touched={getFieldState("name").touched}
                            />
                            <input
                              ref={nameRef}
                              className={getInputClasses("name")}
                              id="name"
                              name="name"
                              placeholder="Jane Doe"
                              required
                              aria-required="true"
                              aria-invalid={getFieldState("name").error ? "true" : undefined}
                              aria-describedby={getFieldState("name").error ? "name-error" : undefined}
                              type="text"
                              onBlur={(e) => validateField("name", e.target.value, (v) => validateRequired(v, "Name"))}
                            />
                          </div>
                          <InlineError error={getFieldState("name").error} id="name-error" />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                        >
                          <label className={labelClasses} htmlFor="email">
                            Work Email
                          </label>
                          <div className="relative">
                            <InputIcon
                              icon="mail"
                              valid={getFieldState("email").valid}
                              touched={getFieldState("email").touched}
                            />
                            <input
                              className={getInputClasses("email")}
                              id="email"
                              name="email"
                              placeholder="jane@company.com"
                              required
                              aria-required="true"
                              aria-invalid={getFieldState("email").error ? "true" : undefined}
                              aria-describedby={getFieldState("email").error ? "email-error" : undefined}
                              type="email"
                              onBlur={(e) => validateField("email", e.target.value, validateEmail)}
                            />
                          </div>
                          <InlineError error={getFieldState("email").error} id="email-error" />
                        </motion.div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className={labelClasses} htmlFor="subject">
                          Topic
                        </label>
                        <div className="relative">
                          <select className={`${inputClasses} appearance-none pr-12`} id="subject" name="subject">
                            {messageTopics.map((topic) => (
                              <option key={topic.value} value={topic.value}>
                                {topic.label}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-xl">expand_more</span>
                          </div>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.22 }}
                      >
                        <label className={labelClasses} htmlFor="companyName">
                          Company Name <span className="text-slate-400 font-normal normal-case">(optional - for business enquiries)</span>
                        </label>
                        <input
                          className={inputClasses}
                          id="companyName"
                          name="companyName"
                          placeholder="Your company or store name"
                          type="text"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        <label className={labelClasses} htmlFor="message">
                          Message
                        </label>
                        <textarea
                          className={`${inputClasses} resize-none`}
                          id="message"
                          name="message"
                          placeholder="How can we help?"
                          required
                          rows={4}
                          value={messageContent}
                          onChange={handleMessageChange}
                          aria-required="true"
                          aria-invalid={getFieldState("message").error ? "true" : undefined}
                          aria-describedby={getFieldState("message").error ? "message-error" : undefined}
                        />
                        <div className="flex justify-between mt-1.5 ml-1">
                          <InlineError error={getFieldState("message").error} id="message-error" />
                          <span
                            className={`text-xs ${
                              messageContent.length >= MAX_MESSAGE_CHARS
                                ? "text-red-500"
                                : "text-slate-400 dark:text-slate-500"
                            }`}
                          >
                            {messageContent.length}/{MAX_MESSAGE_CHARS}
                          </span>
                        </div>
                      </motion.div>
                      <motion.div
                        className="pt-2 text-center md:text-left"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {formState.error && (
                          <p className="text-red-500 text-sm mb-3">{formState.error}</p>
                        )}
                        <motion.button
                          className="w-full md:w-auto min-w-[200px] bg-primary hover:bg-[rgb(165,5,2)] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          type="submit"
                          disabled={formState.isSubmitting}
                          whileHover={formState.isSubmitting ? {} : { scale: 1.02, y: -2 }}
                          whileTap={formState.isSubmitting ? {} : { scale: 0.98 }}
                        >
                          {formState.isSubmitting ? "Sending..." : "Send Message"}
                        </motion.button>
                      </motion.div>
                    </form>
                  </>
                )}
              </motion.div>
            )}

            {/* Callback Tab */}
            {activeTab === "callback" && (
              <motion.div
                key="callback"
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {callbackSent ? (
                  <FormSuccess
                    icon="phone_callback"
                    title="Request Received!"
                    description="We've scheduled your call back request. One of our agents will be in touch with you at your preferred time."
                    buttonText="Request Another Call"
                    onReset={() => setCallbackSent(false)}
                  />
                ) : (
                  <>
                    <div className="text-center mb-10">
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                        Request a Call Back
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400">
                        Short on time? Leave your details and we&apos;ll contact you when it suits you
                        best.
                      </p>
                    </div>
                    <form className="space-y-6 max-w-2xl mx-auto" onSubmit={handleCallbackSubmit}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label className={labelClasses} htmlFor="cb_name">
                          Full Name
                        </label>
                        <div className="relative">
                          <InputIcon
                            icon="person"
                            valid={getFieldState("cb_name").valid}
                            touched={getFieldState("cb_name").touched}
                          />
                          <input
                            ref={cbNameRef}
                            className={getInputClasses("cb_name")}
                            id="cb_name"
                            name="cb_name"
                            placeholder="John Smith"
                            required
                            aria-required="true"
                            aria-invalid={getFieldState("cb_name").error ? "true" : undefined}
                            aria-describedby={getFieldState("cb_name").error ? "cb_name-error" : undefined}
                            type="text"
                            onBlur={(e) => validateField("cb_name", e.target.value, (v) => validateRequired(v, "Full name"))}
                          />
                        </div>
                        <InlineError error={getFieldState("cb_name").error} id="cb_name-error" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        <label className={labelClasses} htmlFor="cb_phone">
                          Phone Number
                        </label>
                        <div className="relative">
                          <InputIcon
                            icon="call"
                            valid={getFieldState("cb_phone").valid}
                            touched={getFieldState("cb_phone").touched}
                          />
                          <input
                            className={getInputClasses("cb_phone")}
                            id="cb_phone"
                            name="cb_phone"
                            placeholder="+27 XX XXX XXXX"
                            required
                            aria-required="true"
                            aria-invalid={getFieldState("cb_phone").error ? "true" : undefined}
                            aria-describedby={getFieldState("cb_phone").error ? "cb_phone-error" : undefined}
                            type="tel"
                            onBlur={(e) => validateField("cb_phone", e.target.value, validatePhone)}
                          />
                        </div>
                        <InlineError error={getFieldState("cb_phone").error} id="cb_phone-error" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18 }}
                      >
                        <label className={labelClasses} htmlFor="cb_reason">
                          Reason for Call
                        </label>
                        <div className="relative">
                          <select
                            className={`${inputClasses} appearance-none pr-12`}
                            id="cb_reason"
                            value={callbackReason}
                            onChange={(e) => {
                              setCallbackReason(e.target.value);
                              if (e.target.value !== "other") {
                                setOtherReason("");
                              }
                            }}
                            required
                          >
                            {callbackReasons.map((reason) => (
                              <option key={reason.value} value={reason.value}>
                                {reason.label}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-xl">expand_more</span>
                          </div>
                        </div>
                      </motion.div>
                      <AnimatePresence>
                        {callbackReason === "other" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <label className={labelClasses} htmlFor="cb_other_reason">
                              Please Specify
                            </label>
                            <textarea
                              className={`${inputClasses} resize-none`}
                              id="cb_other_reason"
                              placeholder="Briefly describe the reason for your call..."
                              value={otherReason}
                              onChange={handleOtherReasonChange}
                              rows={3}
                              required
                            />
                            <div className="flex justify-end mt-1">
                              <span
                                className={`text-xs ${
                                  otherReason.length >= MAX_OTHER_CHARS
                                    ? "text-red-500"
                                    : "text-slate-400 dark:text-slate-500"
                                }`}
                              >
                                {otherReason.length}/{MAX_OTHER_CHARS} characters
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <label className={labelClasses} htmlFor="cb_date">
                            Preferred Date
                          </label>
                          <input className={inputClasses} id="cb_date" name="cb_date" required type="date" />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                        >
                          <label className={labelClasses} htmlFor="cb_time">
                            Preferred Time
                          </label>
                          <div className="relative">
                            <select
                              className={`${inputClasses} appearance-none pr-12`}
                              id="cb_time"
                              name="cb_time"
                            >
                              <option>Morning (8AM - 12PM)</option>
                              <option>Afternoon (12PM - 5PM)</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                              <span className="material-symbols-outlined text-xl">expand_more</span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                      <motion.div
                        className="pt-4 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {formState.error && (
                          <p className="text-red-500 text-sm mb-3">{formState.error}</p>
                        )}
                        <motion.button
                          className="w-full md:w-auto min-w-[200px] bg-primary hover:bg-[rgb(165,5,2)] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          type="submit"
                          disabled={formState.isSubmitting}
                          whileHover={formState.isSubmitting ? {} : { scale: 1.02, y: -2 }}
                          whileTap={formState.isSubmitting ? {} : { scale: 0.98 }}
                        >
                          {formState.isSubmitting ? "Submitting..." : "Schedule Call"}
                        </motion.button>
                      </motion.div>
                    </form>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

