"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { track } from "@vercel/analytics";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { LabelledInput } from "@/components/ui/LabelledInput";
import { LabelledSelect } from "@/components/ui/LabelledSelect";
import { LabelledTextarea } from "@/components/ui/LabelledTextarea";
import {
  validateEmail,
  validatePhone,
  validateRequired,
  type FieldState,
  type FieldStates,
} from "@/lib/formValidation";
import { HONEYPOT_FIELD_NAME, honeypotClassName } from "@/lib/honeypot";

// ═══════════════════════════════════════════════════════════════════════════
// CONTACT FORM COMPONENT
// Migrated to use shared floating label components (Session 88)
// ═══════════════════════════════════════════════════════════════════════════

type ContactTab = "message" | "callback";

interface FormState {
  isSubmitting: boolean;
  error: string | null;
}

const callbackReasons = [
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
  { value: "general", label: "General Enquiry" },
  { value: "claim-status", label: "Claim Status" },
  { value: "retail-partnership", label: "Retail Partnership (B2B)" },
  { value: "business-insurance", label: "Business Insurance (B2B)" },
  { value: "employee-benefits", label: "Employee Benefits (B2B)" },
  { value: "feedback", label: "Feedback" },
];

// B2B topic values for easy checking
const b2bTopicValues = ["retail-partnership", "business-insurance", "employee-benefits"];

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState<ContactTab>("message");
  const [messageSent, setMessageSent] = useState(false);
  const [callbackSent, setCallbackSent] = useState(false);

  // Message form state
  const [messageName, setMessageName] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [messageContent, setMessageContent] = useState("");

  // Callback form state
  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackReason, setCallbackReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [callbackDate, setCallbackDate] = useState("");
  const [callbackTime, setCallbackTime] = useState("Morning (8AM - 12PM)");

  // Honeypot field for spam prevention (hidden from users, filled by bots)
  const [honeypot, setHoneypot] = useState("");

  const [formState, setFormState] = useState<FormState>({ isSubmitting: false, error: null });
  const [fieldStates, setFieldStates] = useState<FieldStates>({});

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Check if current topic is B2B
  const isB2BTopic = b2bTopicValues.includes(selectedTopic);

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
    setFormState({ isSubmitting: false, error: null });
  };

  // Handle message content change with character limit
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_MESSAGE_CHARS) {
      setMessageContent(value);
    }
  };

  // Handle other reason change with character limit
  const handleOtherReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_OTHER_CHARS) {
      setOtherReason(value);
    }
  };

  // Validate message form
  const validateMessageForm = (): boolean => {
    let isValid = true;

    if (!validateField("name", messageName, (v) => validateRequired(v, "Name"))) isValid = false;
    if (!validateField("email", messageEmail, validateEmail)) isValid = false;
    if (isB2BTopic && !validateField("companyName", companyName, (v) => validateRequired(v, "Company name"))) isValid = false;
    if (!validateField("message", messageContent, (v) => validateRequired(v, "Message"))) isValid = false;

    return isValid;
  };

  // Validate callback form
  const validateCallbackForm = (): boolean => {
    let isValid = true;

    if (!validateField("cb_name", callbackName, (v) => validateRequired(v, "Full name"))) isValid = false;
    if (!validateField("cb_phone", callbackPhone, validatePhone)) isValid = false;
    if (!validateField("cb_reason", callbackReason, (v) => validateRequired(v, "Reason"))) isValid = false;
    if (callbackReason === "other" && !validateField("cb_other", otherReason, (v) => validateRequired(v, "Reason"))) isValid = false;

    return isValid;
  };

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateMessageForm()) return;

    setFormState({ isSubmitting: true, error: null });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "message",
          name: messageName,
          email: messageEmail,
          subject: selectedTopic || "general",
          message: messageContent,
          companyName: companyName || undefined,
          [HONEYPOT_FIELD_NAME]: honeypot,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setMessageSent(true);

      // Reset form
      setMessageName("");
      setMessageEmail("");
      setSelectedTopic("");
      setCompanyName("");
      setMessageContent("");
      setFieldStates({});

      // Track successful submission
      track("contact_submitted", {
        formType: "message",
        topic: selectedTopic || "general",
      });
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

    if (!validateCallbackForm()) return;

    setFormState({ isSubmitting: true, error: null });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "callback",
          name: callbackName,
          phone: callbackPhone,
          reason: callbackReason,
          otherReason: callbackReason === "other" ? otherReason : undefined,
          preferredDate: callbackDate,
          preferredTime: callbackTime,
          [HONEYPOT_FIELD_NAME]: honeypot,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit request");
      }

      setCallbackSent(true);

      // Reset form
      setCallbackName("");
      setCallbackPhone("");
      setCallbackReason("");
      setOtherReason("");
      setCallbackDate("");
      setCallbackTime("Morning (8AM - 12PM)");
      setFieldStates({});

      // Track successful submission
      track("contact_submitted", {
        formType: "callback",
        reason: callbackReason,
      });
    } catch (error) {
      setFormState({
        isSubmitting: false,
        error: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <motion.div
      ref={ref}
      className="max-w-4xl mx-auto mb-24"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg dark:shadow-slate-900/30 border border-slate-200 dark:border-slate-700"
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
        <div className="p-6 md:p-10 bg-white dark:bg-slate-800">
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
                        Prefer to write? Fill out the form below and we&apos;ll route it to the right team.
                      </p>
                    </div>
                    <form className="space-y-6" onSubmit={handleMessageSubmit}>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <LabelledInput
                            name="name"
                            label="Full Name"
                            value={messageName}
                            required
                            onChange={(e) => setMessageName(e.target.value)}
                            onBlur={(e) => validateField("name", e.target.value, (v) => validateRequired(v, "Name"))}
                            fieldState={getFieldState("name")}
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                        >
                          <LabelledInput
                            name="email"
                            label="Email Address"
                            type="email"
                            value={messageEmail}
                            required
                            onChange={(e) => setMessageEmail(e.target.value)}
                            onBlur={(e) => validateField("email", e.target.value, validateEmail)}
                            fieldState={getFieldState("email")}
                          />
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <LabelledSelect
                          name="subject"
                          label="Topic"
                          options={messageTopics}
                          value={selectedTopic}
                          onChange={(e) => setSelectedTopic(e.target.value)}
                        />
                      </motion.div>

                      <AnimatePresence>
                        {isB2BTopic && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <LabelledInput
                              name="companyName"
                              label="Company Name"
                              value={companyName}
                              required
                              onChange={(e) => setCompanyName(e.target.value)}
                              onBlur={(e) => validateField("companyName", e.target.value, (v) => validateRequired(v, "Company name"))}
                              fieldState={getFieldState("companyName")}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        <LabelledTextarea
                          name="message"
                          label="Your Message"
                          value={messageContent}
                          required
                          rows={5}
                          maxLength={MAX_MESSAGE_CHARS}
                          showCharCount
                          onChange={handleMessageChange}
                          onBlur={() => validateField("message", messageContent, (v) => validateRequired(v, "Message"))}
                          fieldState={getFieldState("message")}
                        />
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
                          className="w-full md:w-auto min-w-[200px] h-12 px-8 bg-primary hover:bg-[rgb(var(--color-primary-hover))] text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                          type="submit"
                          disabled={formState.isSubmitting}
                          whileHover={formState.isSubmitting ? {} : { scale: 1.03, y: -2 }}
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
                        Short on time? Leave your details and we&apos;ll contact you when it suits you best.
                      </p>
                    </div>
                    <form className="space-y-6 max-w-2xl mx-auto" onSubmit={handleCallbackSubmit}>
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
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <LabelledInput
                          name="cb_name"
                          label="Full Name"
                          value={callbackName}
                          required
                          onChange={(e) => setCallbackName(e.target.value)}
                          onBlur={(e) => validateField("cb_name", e.target.value, (v) => validateRequired(v, "Full name"))}
                          fieldState={getFieldState("cb_name")}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        <LabelledInput
                          name="cb_phone"
                          label="Phone Number"
                          type="tel"
                          value={callbackPhone}
                          required
                          onChange={(e) => setCallbackPhone(e.target.value)}
                          onBlur={(e) => validateField("cb_phone", e.target.value, validatePhone)}
                          fieldState={getFieldState("cb_phone")}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18 }}
                      >
                        <LabelledSelect
                          name="cb_reason"
                          label="Reason for Call"
                          options={callbackReasons}
                          value={callbackReason}
                          required
                          onChange={(e) => {
                            setCallbackReason(e.target.value);
                            if (e.target.value !== "other") {
                              setOtherReason("");
                            }
                          }}
                          onBlur={() => validateField("cb_reason", callbackReason, (v) => validateRequired(v, "Reason"))}
                          fieldState={getFieldState("cb_reason")}
                        />
                      </motion.div>

                      <AnimatePresence>
                        {callbackReason === "other" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <LabelledTextarea
                              name="cb_other"
                              label="Please Specify"
                              value={otherReason}
                              required
                              rows={3}
                              maxLength={MAX_OTHER_CHARS}
                              showCharCount
                              onChange={handleOtherReasonChange}
                              onBlur={() => validateField("cb_other", otherReason, (v) => validateRequired(v, "Reason"))}
                              fieldState={getFieldState("cb_other")}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <LabelledInput
                            name="cb_date"
                            label="Preferred Date"
                            type="date"
                            value={callbackDate}
                            required
                            onChange={(e) => setCallbackDate(e.target.value)}
                            fieldState={getFieldState("cb_date")}
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                        >
                          <LabelledSelect
                            name="cb_time"
                            label="Preferred Time"
                            options={[
                              { value: "Morning (8AM - 12PM)", label: "Morning (8AM - 12PM)" },
                              { value: "Afternoon (12PM - 5PM)", label: "Afternoon (12PM - 5PM)" },
                            ]}
                            value={callbackTime}
                            onChange={(e) => setCallbackTime(e.target.value)}
                          />
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
                          className="w-full md:w-auto min-w-[200px] h-12 px-8 bg-primary hover:bg-[rgb(var(--color-primary-hover))] text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                          type="submit"
                          disabled={formState.isSubmitting}
                          whileHover={formState.isSubmitting ? {} : { scale: 1.03, y: -2 }}
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
