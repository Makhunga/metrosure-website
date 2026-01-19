"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// TESTIMONIALS CAROUSEL
// Trullion-inspired horizontal carousel with premium dark styling
// ═══════════════════════════════════════════════════════════════════════════

interface Testimonial {
    text: string;
    name: string;
    role: string;
    company?: string;
}

const testimonialsData: Testimonial[] = [
    {
        text: "When my car was hijacked in Joburg, Metrosure handled everything before I could even stress. It wasn't just about the payout, it was knowing someone had my back.",
        name: "Thabo Molefe",
        role: "Home & Auto Policy Holder",
        company: "Personal Client",
    },
    {
        text: "Partnering with Metrosure was the best decision for our stores. They brought trained staff, handled everything, and we've seen a 30% boost in foot traffic.",
        name: "Lerato Mokoena",
        role: "Operations Director",
        company: "Retail Partner",
    },
    {
        text: "I never understood my life insurance policy until I sat down with Metrosure. Now I feel genuinely confident about my family's future.",
        name: "Sipho Mthembu",
        role: "Family Provider",
        company: "Life Insurance Client",
    },
    {
        text: "We've created 15 jobs in our community through this partnership. Metrosure handles compliance and training - we just provide the space. Win-win.",
        name: "Ahmed Patel",
        role: "Franchise Owner",
        company: "Community Retail",
    },
    {
        text: "The funeral cover gave us peace of mind during the hardest time of our lives. They handled everything with dignity and speed.",
        name: "Nomsa Dlamini",
        role: "Beneficiary",
        company: "Funeral Cover Client",
    },
    {
        text: "Metrosure's quick response time and professional service made all the difference when we had a fire at our warehouse. Highly recommended.",
        name: "David Smith",
        role: "Logistics Manager",
        company: "Smith Logistics",
    },
];

export default function TestimonialsCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

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

    // Calculate visible cards based on screen width (approximate)
    const cardsToShow = width < 768 ? 1 : width < 1024 ? 2 : 2.5;
    const cardGap = 32; // gap-8 is 32px

    // Safety check to avoid division by zero or NaN if width isn't ready
    const safeWidth = width || 1200;

    // Calculation: Total width available = (CardWidth * CardsToShow) + (Gap * (CardsToShow - 1))
    // We want to solve for CardWidth
    // CardWidth = (TotalWidth - Gap * (CardsToShow - 1)) / CardsToShow

    // Simplified logic for slide offset:
    // We want to shift by 1 Card Width + 1 Gap for each index increment
    const cardWidthWithGap = (safeWidth / cardsToShow);


    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) =>
            prev === 0 ? testimonialsData.length - 1 : prev - 1
        );
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
                        animate={{ x: -activeIndex * (width < 768 ? width + 32 : (width / cardsToShow)) }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {testimonialsData.map((testimonial, index) => (
                            <div
                                key={index}
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
