"use client";

import { useState } from "react";

type ContactTab = "message" | "callback";

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState<ContactTab>("message");
  const [messageSent, setMessageSent] = useState(false);
  const [callbackSent, setCallbackSent] = useState(false);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackSent(true);
  };

  const inputClasses =
    "w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-700 transition-all py-3.5 px-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500";

  const labelClasses =
    "block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider ml-1 mb-2";

  return (
    <div className="max-w-4xl mx-auto mb-24">
      <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 relative z-10">
          <button
            onClick={() => setActiveTab("message")}
            className="flex-1 cursor-pointer select-none relative group"
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
              <div
                className={`absolute bottom-0 left-0 w-full h-1 bg-primary transition-transform duration-300 origin-center rounded-t-full ${
                  activeTab === "message" ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </div>
          </button>

          <button
            onClick={() => setActiveTab("callback")}
            className="flex-1 cursor-pointer select-none relative group border-l border-slate-200 dark:border-slate-700"
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
              <div
                className={`absolute bottom-0 left-0 w-full h-1 bg-primary transition-transform duration-300 origin-center rounded-t-full ${
                  activeTab === "callback" ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Form Content */}
        <div className="p-8 md:p-12 bg-white dark:bg-slate-800">
          {/* Message Tab */}
          {activeTab === "message" && (
            <div className="animate-fade-in relative">
              {messageSent ? (
                <SuccessMessage
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
                      <div>
                        <label className={labelClasses} htmlFor="name">
                          Name
                        </label>
                        <input
                          className={inputClasses}
                          id="name"
                          placeholder="Jane Doe"
                          required
                          type="text"
                        />
                      </div>
                      <div>
                        <label className={labelClasses} htmlFor="email">
                          Work Email
                        </label>
                        <input
                          className={inputClasses}
                          id="email"
                          placeholder="jane@company.com"
                          required
                          type="email"
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClasses} htmlFor="subject">
                        Topic
                      </label>
                      <div className="relative">
                        <select className={`${inputClasses} appearance-none pr-12`} id="subject">
                          <option>General Inquiry</option>
                          <option>Claim Status</option>
                          <option>Partnership Opportunity</option>
                          <option>Feedback</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                          <span className="material-symbols-outlined text-xl">expand_more</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className={labelClasses} htmlFor="message">
                        Message
                      </label>
                      <textarea
                        className={`${inputClasses} resize-none`}
                        id="message"
                        placeholder="How can we help?"
                        required
                        rows={4}
                      />
                    </div>
                    <div className="pt-2 text-center md:text-left">
                      <button
                        className="w-full md:w-auto min-w-[200px] bg-primary hover:bg-[rgb(165,5,2)] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5"
                        type="submit"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          )}

          {/* Callback Tab */}
          {activeTab === "callback" && (
            <div className="animate-fade-in relative">
              {callbackSent ? (
                <SuccessMessage
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
                    <div>
                      <label className={labelClasses} htmlFor="cb_name">
                        Full Name
                      </label>
                      <input
                        className={inputClasses}
                        id="cb_name"
                        placeholder="John Smith"
                        required
                        type="text"
                      />
                    </div>
                    <div>
                      <label className={labelClasses} htmlFor="cb_phone">
                        Phone Number
                      </label>
                      <input
                        className={inputClasses}
                        id="cb_phone"
                        placeholder="+1 (555) 000-0000"
                        required
                        type="tel"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClasses} htmlFor="cb_date">
                          Preferred Date
                        </label>
                        <input className={inputClasses} id="cb_date" required type="date" />
                      </div>
                      <div>
                        <label className={labelClasses} htmlFor="cb_time">
                          Preferred Time
                        </label>
                        <div className="relative">
                          <select
                            className={`${inputClasses} appearance-none pr-12`}
                            id="cb_time"
                          >
                            <option>Morning (9AM - 12PM)</option>
                            <option>Afternoon (12PM - 4PM)</option>
                            <option>Evening (4PM - 6PM)</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-xl">expand_more</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 text-center">
                      <button
                        className="w-full md:w-auto min-w-[200px] bg-primary hover:bg-[rgb(165,5,2)] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5"
                        type="submit"
                      >
                        Schedule Call
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface SuccessMessageProps {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  onReset: () => void;
}

function SuccessMessage({ icon, title, description, buttonText, onReset }: SuccessMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
      <div className="w-20 h-20 bg-green-500/10 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <span className="material-symbols-outlined text-green-600 dark:text-green-500 text-4xl">{icon}</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
        {title}
      </h2>
      <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto">
        {description}
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center justify-center bg-primary hover:bg-[rgb(165,5,2)] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
      >
        {buttonText}
      </button>
    </div>
  );
}
