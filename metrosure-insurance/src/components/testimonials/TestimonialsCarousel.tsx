"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// TESTIMONIALS CAROUSEL
// Trullion-inspired horizontal carousel with premium dark styling
// Clone-based infinite loop for seamless navigation
// ═══════════════════════════════════════════════════════════════════════════

interface Testimonial {
    text: string;
    name: string;
    role: string;
    company?: string;
}

const testimonialsData: Testimonial[] = [
    {
        text: "When I was shopping for car insurance, I had no idea where to start. Metrosure compared quotes from multiple insurers and found me comprehensive cover at a rate I could actually afford. They explained everything clearly.",
        name: "Thabo Molefe",
        role: "Motor Insurance Client",
        company: "Personal Client",
    },
    {
        text: "Partnering with Metrosure was the best decision for our stores. Their trained teams handle all the insurance sales and compliance, while we focus on our core business. We've created 15 new jobs and seen steady commission income.",
        name: "Lerato Mokoena",
        role: "Operations Director",
        company: "Retail Partner",
    },
    {
        text: "I had life cover from my employer but never knew if it was enough. Metrosure's advisors reviewed my situation, compared options from different providers, and helped me find a policy that properly protects my family.",
        name: "Sipho Mthembu",
        role: "Life Cover Client",
        company: "Personal Client",
    },
    {
        text: "We've created 15 jobs in our community through our Metrosure partnership. They handle all the regulatory compliance and staff training, we provide the retail space. It's truly a win-win for everyone.",
        name: "Ahmed Patel",
        role: "Franchise Owner",
        company: "Community Retail",
    },
    {
        text: "When we needed funeral cover urgently, Metrosure's advisor sat with us, explained our options from three different providers, and helped us choose a dignified plan we could afford. Their guidance made a difficult decision so much easier.",
        name: "Nomsa Dlamini",
        role: "Funeral Cover Client",
        company: "Personal Client",
    },
    {
        text: "Finding the right commercial insurance was overwhelming until Metrosure stepped in. They sourced quotes from multiple insurers, negotiated better terms, and we ended up with better cover at a lower premium than we expected.",
        name: "David Smith",
        role: "Operations Manager",
        company: "Smith Logistics",
    },
];

export default function TestimonialsCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    // Calculate visible cards based on screen width
    const cardsToShow = width < 768 ? 1 : width < 1024 ? 2 : 2.5;

    // Number of cards to clone at each end for seamless looping
    const cardsNeeded = Math.ceil(cardsToShow) + 1; // 4 for 2.5 visible

    // Create extended testimonials array with clones at both ends
    const extendedTestimonials = [
        ...testimonialsData.slice(-cardsNeeded),  // Clone end at start
        ...testimonialsData,                       // Original cards
        ...testimonialsData.slice(0, cardsNeeded), // Clone start at end
    ];

    // Track display index (starts at first real card, which is at position cardsNeeded)
    const [displayIndex, setDisplayIndex] = useState(cardsNeeded);
    const [isResetting, setIsResetting] = useState(false);

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.offsetWidth);
        }
        const handleResize = () => {
            if (containerRef.current) {
                setWidth(containerRef.current.offsetWidth);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Safety check to avoid division by zero or NaN if width isn't ready
    const safeWidth = width || 1200;

    // Calculate card width including gap consideration
    const cardWidthWithGap = safeWidth / cardsToShow;

    // Handle boundary reset on animation complete
    const handleAnimationComplete = useCallback(() => {
        // At start clones -> jump to real end
        if (displayIndex < cardsNeeded) {
            setIsResetting(true);
            setDisplayIndex(displayIndex + testimonialsData.length);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setIsResetting(false));
            });
        }
        // At end clones -> jump to real start
        if (displayIndex >= cardsNeeded + testimonialsData.length) {
            setIsResetting(true);
            setDisplayIndex(displayIndex - testimonialsData.length);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setIsResetting(false));
            });
        }
    }, [displayIndex, cardsNeeded]);

    const nextTestimonial = () => {
        setDisplayIndex((prev) => prev + 1);
    };

    const prevTestimonial = () => {
        setDisplayIndex((prev) => prev - 1);
    };

    return (
        <section className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-900/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-gradient-to-t from-slate-800/20 to-transparent pointer-events-none rounded-tr-full" />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-xl">
                        <div className="mb-4">
                            <span className="text-primary font-medium tracking-wide text-sm uppercase">Client Stories</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            What our customers <br /> are saying
                        </h2>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex gap-4">
                        <button
                            onClick={prevTestimonial}
                            className="w-14 h-14 rounded-full border border-slate-600 flex items-center justify-center text-slate-300 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 group"
                            aria-label="Previous testimonial"
                        >
                            <span className="material-symbols-outlined transition-transform duration-300 group-hover:-translate-x-1">arrow_back</span>
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="w-14 h-14 rounded-full border border-slate-600 flex items-center justify-center text-slate-300 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 group"
                            aria-label="Next testimonial"
                        >
                            <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div ref={containerRef} className="relative overflow-hidden pl-2 pb-10 -ml-2">
                    <motion.div
                        className="flex gap-8"
                        animate={{ x: -displayIndex * cardWidthWithGap }}
                        transition={isResetting ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
                        onAnimationComplete={handleAnimationComplete}
                    >
                        {extendedTestimonials.map((testimonial, index) => (
                            <div
                                key={`testimonial-${index}-${testimonial.name}`}
                                className="flex-shrink-0 w-full md:w-[45%] lg:w-[38%] bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 md:p-10 flex flex-col justify-between group hover:border-primary/30 transition-colors duration-300 min-h-[400px]"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-8">
                                        {/* Company Logo Placeholder / Icon */}
                                        <div className="p-3 bg-slate-700/50 rounded-xl text-primary">
                                            <span className="material-symbols-outlined">business</span>
                                        </div>
                                        <span className="material-symbols-outlined text-6xl text-slate-600/50 leading-none -mt-4 group-hover:text-primary/20 transition-colors duration-300">format_quote</span>
                                    </div>

                                    <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-light mb-8">
                                        &quot;{testimonial.text}&quot;
                                    </p>
                                </div>

                                <div className="pt-8 border-t border-slate-700/50">
                                    <h4 className="text-xl font-bold text-white mb-1">{testimonial.name}</h4>
                                    <div className="flex flex-col">
                                        <span className="text-slate-400 text-sm font-medium">{testimonial.role}</span>
                                        {testimonial.company && (
                                            <span className="text-slate-500 text-xs mt-1">{testimonial.company}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
