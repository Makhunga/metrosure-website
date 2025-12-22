"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const features = [
  {
    icon: "handshake",
    title: "Unwavering Integrity",
    description:
      "We do the right thing, even when no one is looking. Honest advice and fair dealings are our absolute baseline for every client relationship.",
  },
  {
    icon: "visibility",
    title: "Total Transparency",
    description:
      "No fine print traps. We ensure you understand every detail of your coverage before you sign, with clear language and no hidden clauses.",
  },
  {
    icon: "favorite",
    title: "Human-First Empathy",
    description:
      "We treat clients like family. Compassionate support is guaranteed, especially during the moments when you need us the most.",
  },
  {
    icon: "rocket_launch",
    title: "Modern Innovation",
    description:
      "We leverage technology to simplify insurance, reducing paperwork and making claims faster, smarter, and easier for you.",
  },
];

export default function Features() {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const entranceTransition = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
  const iconTransition = "transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]";

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[rgb(var(--color-surface-card))] relative transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 mb-16 items-start">
          {/* Left sticky content */}
          <div
            className={`lg:w-1/3 lg:sticky lg:top-24 ${entranceTransition} ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <h2 className="text-4xl font-bold text-[rgb(var(--color-text-main))] mb-6 leading-tight">
              Built on trust,
              <br />
              driven by <span className="text-primary">integrity.</span>
            </h2>
            <p className="text-lg text-[rgb(var(--color-text-body))] mb-8 leading-relaxed">
              We don&apos;t just sell policies; we build partnerships. Our core values define every
              interaction, ensuring you receive the honest, transparent service you deserve.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-primary font-bold hover:text-[rgb(var(--color-primary-hover))] transition-colors group"
            >
              Read our full mission
              <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Right grid */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 border border-[rgb(var(--color-border-light))] rounded-2xl overflow-hidden shadow-sm bg-[rgb(var(--color-surface-card))]">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`p-10 ${
                    index < 2 ? "border-b" : ""
                  } ${index % 2 === 0 ? "md:border-r" : ""} border-[rgb(var(--color-border-light))] hover:bg-[rgb(var(--color-surface))]/50 transition-colors group`}
                >
                  <div
                    className={`${entranceTransition} ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    }`}
                    style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                  >
                    <div
                      className={`w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 ${iconTransition} ${
                        isVisible ? "scale-100 rotate-0" : "scale-0 -rotate-12"
                      }`}
                      style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                    >
                      <span className="material-symbols-outlined text-3xl text-primary transition-transform duration-500 group-hover:rotate-12">
                        {feature.icon}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-[rgb(var(--color-text-body))] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
