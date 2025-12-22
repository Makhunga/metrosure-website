"use client";

import Link from "next/link";

interface ContactCardProps {
  icon: string;
  title: string;
  description: string;
  linkText: string;
  href: string;
}

function ContactCard({ icon, title, description, linkText, href }: ContactCardProps) {
  return (
    <Link
      href={href}
      className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-start h-full"
    >
      {/* Icon */}
      <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
        <span className="material-symbols-outlined text-primary text-2xl group-hover:text-white transition-colors duration-300">
          {icon}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-grow">
        {description}
      </p>

      {/* Link */}
      <span className="inline-flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
        {linkText}
        <span className="material-symbols-outlined text-base ml-1 group-hover:translate-x-1 transition-transform">
          arrow_forward
        </span>
      </span>
    </Link>
  );
}

const contactOptions = [
  {
    icon: "trending_up",
    title: "Sales Inquiries",
    description:
      "Looking for a new policy? Our agents are ready to build a custom plan that fits your life.",
    linkText: "Contact Sales",
    href: "/quote",
  },
  {
    icon: "headset_mic",
    title: "Customer Support",
    description:
      "Already a customer? Get help from our dedicated service team for billing or policy changes.",
    linkText: "Get Support",
    href: "/help",
  },
  {
    icon: "assignment_turned_in",
    title: "File a Claim",
    description:
      "Emergencies happen. Report an incident quickly and track the status of your existing claims.",
    linkText: "Claims Center",
    href: "/claims",
  },
  {
    icon: "newspaper",
    title: "Media Inquiries",
    description:
      "For press releases, brand assets, or interview requests, please reach out to our PR department.",
    linkText: "Contact PR Team",
    href: "/press",
  },
];

export default function ContactOptions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
      {contactOptions.map((option) => (
        <ContactCard key={option.title} {...option} />
      ))}
    </div>
  );
}
