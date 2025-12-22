"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const differentiators = [
  {
    icon: "psychology",
    title: "AI Risk Analysis",
    description:
      "Our proprietary algorithms analyze thousands of data points to offer you more accurate and lower premiums than traditional insurers.",
  },
  {
    icon: "bolt",
    title: "Instant Claims",
    description:
      "Upload photos and documents directly through our app. 85% of standard claims are processed and approved within 24 hours.",
  },
  {
    icon: "support_agent",
    title: "Human-Led Support",
    description:
      "Technology powers our speed, but humans power our heart. Reach a dedicated expert advisor whenever you need real guidance.",
  },
  {
    icon: "settings_input_component",
    title: "Modular Policies",
    description:
      'Stop paying for coverage you don\'t need. Our "Build-Your-Own" policy structure lets you pick and choose specific protections.',
  },
  {
    icon: "verified_user",
    title: "Fraud Protection",
    description:
      "Advanced biometric security and real-time monitoring keep your identity and policy details safe from modern cyber threats.",
  },
  {
    icon: "public",
    title: "Global Portability",
    description:
      "Moving abroad or traveling? Many of our policies offer global extensions, ensuring you're covered across borders seamlessly.",
  },
];

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[rgb(var(--color-surface-card))] transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">
            The Metrosure Edge
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-main))] mb-6 leading-tight">
            Why leading families and businesses choose us
          </h2>
          <p className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed">
            We&apos;ve reimagined insurance from the ground up to solve the frustrations of the
            legacy industry.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((item, index) => (
            <div
              key={item.title}
              className={`p-8 rounded-2xl border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface-card))] hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                <span className="material-symbols-outlined text-primary text-3xl group-hover:text-white transition-colors duration-500">
                  {item.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-[rgb(var(--color-text-body))] leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-20 p-8 rounded-2xl bg-[rgb(var(--color-surface))] border border-dashed border-[rgb(var(--color-border-light))] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-[rgb(var(--color-surface))] bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700"
                />
              ))}
            </div>
            <p className="text-sm font-medium text-[rgb(var(--color-text-main))]">
              Join <span className="text-primary font-bold">50,000+</span> satisfied policyholders
            </p>
          </div>
          <Link
            href="/compare"
            className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all group"
          >
            Compare our rates against competitors
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
