"use client";

export default function ContactHero() {
  return (
    <div className="text-center mb-20 max-w-3xl mx-auto">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
        Contact Us
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
        How can we help you today?
      </h1>

      {/* Subheadline */}
      <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
        Choose the right path for your needs, or send us a direct message. Our team is ready to
        provide the support you need.
      </p>
    </div>
  );
}
