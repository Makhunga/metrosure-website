"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FormSuccess } from "@/components/ui/FormSuccess";

type ContactTab = "message" | "callback";

interface FormState {
  isSubmitting: boolean;
  error: string | null;
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
  { value: "claims", label: "Claims Enquiry" },
  { value: "policy-changes", label: "Policy Changes" },
  { value: "other", label: "Other" },
];

const MAX_OTHER_CHARS = 150;

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState<ContactTab>("message");
  const [messageSent, setMessageSent] = useState(false);
  const [callbackSent, setCallbackSent] = useState(false);
  const [callbackReason, setCallbackReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [formState, setFormState] = useState<FormState>({ isSubmitting: false, error: null });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ isSubmitting: true, error: null });

    const form = e.currentTarget;
    const formData = new FormData(form);

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
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setMessageSent(true);
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
    setFormState({ isSubmitting: true, error: null });

    const form = e.currentTarget;
    const formData = new FormData(form);

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
            onClick={() => setActiveTab("message")}
            className="flex-1 cursor-pointer select-none relative group"
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`py-6 px-6 text-center transition-all duration-300 ${
                activeTab === "message"
                  ? "bg-white dark:bg-slate-800"
                  : "bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800"
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
            onClick={() => setActiveTab("callback")}
            className="flex-1 cursor-pointer select-none relative group border-l border-slate-200 dark:border-slate-700"
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`py-6 px-6 text-center transition-all duration-300 ${
                activeTab === "callback"
                  ? "bg-white dark:bg-slate-800"
                  : "bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800"
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
                          <input
                            className={inputClasses}
                            id="name"
                            name="name"
                            placeholder="Jane Doe"
                            required
                            type="text"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                        >
                          <label className={labelClasses} htmlFor="email">
                            Work Email
                          </label>
                          <input
                            className={inputClasses}
                            id="email"
                            name="email"
                            placeholder="jane@company.com"
                            required
                            type="email"
                          />
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
                            <option>General Inquiry</option>
                            <option>Claim Status</option>
                            <option>Partnership Opportunity</option>
                            <option>Feedback</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-xl">expand_more</span>
                          </div>
                        </div>
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
                        <input
                          className={inputClasses}
                          id="cb_name"
                          name="cb_name"
                          placeholder="John Smith"
                          required
                          type="text"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        <label className={labelClasses} htmlFor="cb_phone">
                          Phone Number
                        </label>
                        <input
                          className={inputClasses}
                          id="cb_phone"
                          name="cb_phone"
                          placeholder="+27 XX XXX XXXX"
                          required
                          type="tel"
                        />
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
                              <option>Morning (9AM - 12PM)</option>
                              <option>Afternoon (12PM - 4PM)</option>
                              <option>Evening (4PM - 6PM)</option>
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

