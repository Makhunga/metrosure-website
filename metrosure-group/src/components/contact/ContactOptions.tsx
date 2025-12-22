"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ContactCardProps {
  icon: string;
  title: string;
  description: string;
  linkText: string;
  href: string;
  index: number;
  isInView: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

function ContactCard({ icon, title, description, linkText, href, index, isInView }: ContactCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 17 } }}
    >
      <Link
        href={href}
        className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group flex flex-col items-start h-full"
      >
        {/* Icon */}
        <motion.div
          className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
        >
          <span className="material-symbols-outlined text-primary text-2xl group-hover:text-white transition-colors duration-300">
            {icon}
          </span>
        </motion.div>

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
          <motion.span
            className="material-symbols-outlined text-base ml-1"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            arrow_forward
          </motion.span>
        </span>
      </Link>
    </motion.div>
  );
}

const contactOptions = [
  {
    icon: "request_quote",
    title: "Get a Quote",
    description:
      "Looking for cover? Tell us about yourself and we'll find the best options from our 30+ insurance partners.",
    linkText: "Get Your Free Quote",
    href: "/quote",
  },
  {
    icon: "support_agent",
    title: "Speak to Your Portfolio Manager",
    description:
      "Already with us? Your dedicated portfolio manager knows your policy inside out and is ready to help.",
    linkText: "Get in Touch",
    href: "tel:+27313011192",
  },
  {
    icon: "emergency",
    title: "Report a Claim",
    description:
      "Had an incident? Our claims team will guide you through the process and keep you updated every step.",
    linkText: "Start Your Claim",
    href: "/claims",
  },
  {
    icon: "help_center",
    title: "General Enquiries",
    description:
      "Questions about our services, partnerships, or career opportunities? We'd love to hear from you.",
    linkText: "Email Us",
    href: "mailto:info@metrosuregroup.co.za",
  },
];

export default function ContactOptions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {contactOptions.map((option, index) => (
        <ContactCard key={option.title} {...option} index={index} isInView={isInView} />
      ))}
    </motion.div>
  );
}
