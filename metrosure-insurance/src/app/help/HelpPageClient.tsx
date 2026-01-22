"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
    allFAQs,
    faqCategories,
    searchFAQs,
    getFAQsByCategory,
    type FAQ,
    type FAQCategory,
} from "@/data/faqs";

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

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

const categories: {
    id: string;
    icon: string;
    title: string;
    description: string;
    articles: { title: string; href: string }[];
}[] = [
        {
            id: "getting-started",
            icon: "rocket_launch",
            title: "Getting Started",
            description: "New to Metrosure? Start here.",
            articles: [
                { title: "How to get an insurance quote", href: "/quote" },
                { title: "Understanding your policy documents", href: "#understanding-policy" },
                { title: "What insurance do I need?", href: "#what-insurance" },
                { title: "How Metrosure works", href: "/about" },
            ],
        },
        {
            id: "managing-policies",
            icon: "folder_managed",
            title: "Managing Your Policy",
            description: "Update, renew, or cancel your cover.",
            articles: [
                { title: "How to update my personal details", href: "#update-details" },
                { title: "Adding or removing items from cover", href: "#add-remove-items" },
                { title: "Renewing your policy", href: "#renew-policy" },
                { title: "Cancelling your policy", href: "#cancel-policy" },
            ],
        },
        {
            id: "claims",
            icon: "assignment",
            title: "Filing Claims",
            description: "Report incidents and track claims.",
            articles: [
                { title: "How to file a claim", href: "/claims" },
                { title: "What documents do I need for a claim?", href: "#claim-documents" },
                { title: "How long does a claim take?", href: "#claim-timeline" },
                { title: "Tracking your claim status", href: "#track-claim" },
            ],
        },
        {
            id: "partnerships",
            icon: "handshake",
            title: "Retail Partnerships",
            description: "Become a B2B partner with Metrosure.",
            articles: [
                { title: "How to become a retail partner", href: "/partners" },
                { title: "Partnership requirements", href: "/partners#how-it-works" },
                { title: "Revenue sharing explained", href: "/partners#partner-benefits" },
                { title: "Contact our partnerships team", href: "/contact" },
            ],
        },
        {
            id: "b2b-services",
            icon: "business_center",
            title: "B2B Services",
            description: "Explore our business-to-business solutions.",
            articles: [
                { title: "In-Store Campaign partnerships", href: "/partners" },
                { title: "Sales & Marketing support", href: "/partners" },
                { title: "Device Leasing Programme", href: "/partners" },
                { title: "Call Centre Services", href: "/partners" },
            ],
        },
    ];

// Popular FAQ IDs for the default view (most commonly asked)
const popularFAQIds = [
    "how-file-claim",
    "which-insurers",
    "how-get-quote",
    "is-metrosure-legit",
    "life-vs-funeral",
    "funeral-payout-speed",
    "claim-timeline",
    "change-beneficiary",
    "become-retail-partner",
    "corporate-group-insurance",
];

// Get popular FAQs from the centralised data
const getPopularFAQs = (): FAQ[] => {
    return allFAQs.filter((faq) => popularFAQIds.includes(faq.id));
};

const contactOptions = [
    {
        icon: "call",
        title: "Call Us",
        description: "Speak to a real person",
        value: "+27 31 301 1192",
        action: "tel:+27313011192",
    },
    {
        icon: "mail",
        title: "Email Us",
        description: "We respond within 24 hours",
        value: "info@metrosuregroup.co.za",
        action: "mailto:info@metrosuregroup.co.za",
    },
    {
        icon: "location_on",
        title: "Visit Us",
        description: "Head Office, Musgrave",
        value: "32 Stephen Dlamini Road",
        action: "/contact",
    },
];

export default function HelpPageClient() {
    const [searchQuery, setSearchQuery] = useState("");
    const [openFaq, setOpenFaq] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<FAQCategory | null>(null);
    const heroRef = useRef(null);
    const categoriesRef = useRef(null);
    const faqRef = useRef(null);
    const contactRef = useRef(null);

    const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
    const categoriesInView = useInView(categoriesRef, { once: true, margin: "-50px" });
    const faqInView = useInView(faqRef, { once: true, margin: "-50px" });
    const contactInView = useInView(contactRef, { once: true, margin: "-50px" });

    // Get FAQs based on current state
    const getDisplayedFAQs = (): FAQ[] => {
        if (searchQuery) {
            return searchFAQs(searchQuery);
        }
        if (selectedCategory) {
            return getFAQsByCategory(selectedCategory);
        }
        return getPopularFAQs();
    };

    const displayedFAQs = getDisplayedFAQs();
    const currentCategoryInfo = selectedCategory
        ? faqCategories.find((c) => c.id === selectedCategory)
        : null;

    return (
        <>
            <main className="relative z-10">
                {/* Hero Section with Search */}
                <section ref={heroRef} className="relative pt-56 pb-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />

                    <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            {/* Badge */}
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/15 border border-primary/20 dark:border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <span className="material-symbols-outlined text-sm">help</span>
                                Help Center
                            </motion.div>

                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--color-text-main))] mb-6 leading-tight"
                                initial={{ opacity: 0, y: 30 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                How can we help?
                            </motion.h1>
                            <motion.p
                                className="text-xl text-[rgb(var(--color-text-body))] leading-relaxed mb-10 max-w-2xl mx-auto"
                                initial={{ opacity: 0, y: 30 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                Search our knowledge base or browse categories below to find answers to your questions.
                            </motion.p>

                            {/* Search Bar */}
                            <motion.div
                                className="relative max-w-2xl mx-auto"
                                initial={{ opacity: 0, y: 20 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text-muted))]">
                                        search
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Search for answers..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface-card))] text-[rgb(var(--color-text-main))] placeholder-[rgb(var(--color-text-muted))] focus:border-primary focus:outline-none transition-colors text-lg"
                                    />
                                </div>
                                {searchQuery && (
                                    <motion.p
                                        className="text-sm text-[rgb(var(--color-text-muted))] mt-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        Found {displayedFAQs.length} result{displayedFAQs.length !== 1 ? "s" : ""}
                                    </motion.p>
                                )}
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Categories Grid */}
                <section ref={categoriesRef} className="py-16">
                    <div className="max-w-6xl mx-auto px-6 lg:px-12">
                        <motion.h2
                            className="text-2xl font-bold text-[rgb(var(--color-text-main))] mb-8 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        >
                            Browse by Topic
                        </motion.h2>
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate={categoriesInView ? "visible" : "hidden"}
                        >
                            {categories.map((category) => (
                                <motion.div
                                    key={category.id}
                                    className="p-6 rounded-2xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-primary/50 hover:shadow-lg transition-all group"
                                    variants={itemVariants}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                                        <span className="material-symbols-outlined text-2xl text-primary group-hover:text-white transition-colors">
                                            {category.icon}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[rgb(var(--color-text-main))] mb-2">
                                        {category.title}
                                    </h3>
                                    <p className="text-sm text-[rgb(var(--color-text-muted))] mb-4">
                                        {category.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {category.articles.map((article, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={article.href}
                                                    className="text-sm text-[rgb(var(--color-text-body))] hover:text-primary transition-colors flex items-center gap-1"
                                                >
                                                    <span className="material-symbols-outlined text-xs">arrow_right</span>
                                                    {article.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* FAQ Questions */}
                <section ref={faqRef} className="py-16 bg-[rgb(var(--color-surface-card))]">
                    <div className="max-w-4xl mx-auto px-6 lg:px-12">
                        <motion.div
                            className="text-center mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        >
                            <h2 className="text-3xl font-bold text-[rgb(var(--color-text-main))] mb-4">
                                {searchQuery
                                    ? `Search Results`
                                    : currentCategoryInfo
                                        ? currentCategoryInfo.label
                                        : "Popular Questions"}
                            </h2>
                            <p className="text-[rgb(var(--color-text-body))]">
                                {searchQuery
                                    ? `${displayedFAQs.length} result${displayedFAQs.length !== 1 ? "s" : ""} for "${searchQuery}"`
                                    : currentCategoryInfo
                                        ? currentCategoryInfo.description
                                        : "Quick answers to the most common questions"}
                            </p>
                        </motion.div>

                        {/* Category Filter Pills */}
                        <motion.div
                            className="flex flex-wrap gap-2 justify-center mb-8"
                            initial={{ opacity: 0, y: 10 }}
                            animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ delay: 0.1 }}
                        >
                            <button
                                onClick={() => {
                                    setSelectedCategory(null);
                                    setSearchQuery("");
                                }}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedCategory && !searchQuery
                                        ? "bg-primary text-white"
                                        : "bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-body))] hover:bg-primary/10 hover:text-primary border border-[rgb(var(--color-border-light))]"
                                    }`}
                            >
                                Popular
                            </button>
                            {faqCategories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => {
                                        setSelectedCategory(category.id);
                                        setSearchQuery("");
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${selectedCategory === category.id
                                            ? "bg-primary text-white"
                                            : "bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-body))] hover:bg-primary/10 hover:text-primary border border-[rgb(var(--color-border-light))]"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-sm">{category.icon}</span>
                                    {category.label}
                                </button>
                            ))}
                        </motion.div>

                        <motion.div
                            key={selectedCategory || "popular"}
                            className="space-y-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {displayedFAQs.map((faq) => (
                                <motion.div
                                    key={faq.id}
                                    className="rounded-xl border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] overflow-hidden"
                                    variants={itemVariants}
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[rgb(var(--color-surface-card))] transition-colors"
                                    >
                                        <span className="font-bold text-[rgb(var(--color-text-main))] pr-4">
                                            {faq.question}
                                        </span>
                                        <motion.span
                                            className="material-symbols-outlined text-primary flex-shrink-0"
                                            animate={{ rotate: openFaq === faq.id ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            expand_more
                                        </motion.span>
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === faq.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="px-6 pb-4 text-[rgb(var(--color-text-body))] border-t border-[rgb(var(--color-border-light))] pt-4">
                                                    <p className="mb-3">{faq.answer}</p>
                                                    {faq.link && (
                                                        <Link
                                                            href={faq.link}
                                                            className="inline-flex items-center gap-1 text-primary text-sm font-bold hover:underline"
                                                        >
                                                            {faq.linkText || "Learn more"}
                                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                        </Link>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>

                        {displayedFAQs.length === 0 && (
                            <motion.div
                                className="text-center py-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <span className="material-symbols-outlined text-6xl text-[rgb(var(--color-text-muted))] mb-4">
                                    search_off
                                </span>
                                <p className="text-[rgb(var(--color-text-body))] mb-4">
                                    No results found for &quot;{searchQuery}&quot;
                                </p>
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="text-primary font-bold hover:underline"
                                >
                                    Clear search
                                </button>
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* Still Need Help? */}
                <section ref={contactRef} className="py-20">
                    <div className="max-w-6xl mx-auto px-6 lg:px-12">
                        <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        >
                            <h2 className="text-3xl font-bold text-[rgb(var(--color-text-main))] mb-4">
                                Still need help?
                            </h2>
                            <p className="text-[rgb(var(--color-text-body))]">
                                Our team is here for you. Reach out and we&apos;ll get back to you as soon as possible.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid md:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate={contactInView ? "visible" : "hidden"}
                        >
                            {contactOptions.map((option, index) => (
                                <motion.a
                                    key={index}
                                    href={option.action}
                                    className="p-8 rounded-2xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-primary hover:shadow-lg transition-all text-center group"
                                    variants={itemVariants}
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                                        <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white transition-colors">
                                            {option.icon}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-1">
                                        {option.title}
                                    </h3>
                                    <p className="text-sm text-[rgb(var(--color-text-muted))] mb-3">
                                        {option.description}
                                    </p>
                                    <p className="text-primary font-bold">{option.value}</p>
                                </motion.a>
                            ))}
                        </motion.div>

                        <motion.div
                            className="text-center mt-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.4 }}
                        >
                            <p className="text-sm text-[rgb(var(--color-text-muted))] mb-4">
                                Business hours: Mon-Fri 8am-5pm, Sat 8am-1pm SAST
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-[rgb(var(--color-primary-hover))] transition-all h-14 px-8 text-white text-lg font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1"
                            >
                                Contact Us
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
        </>
    );
}
