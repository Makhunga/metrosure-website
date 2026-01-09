"use client";

import Link from "next/link";
import { Header, Footer } from "@/components";

export interface CoverageFeature {
  icon: string;
  title: string;
  description: string;
}

export interface PlanTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface InsurancePageProps {
  badge: string;
  title: string;
  subtitle: string;
  heroIcon: string;
  description: string;
  coverageFeatures: CoverageFeature[];
  planTiers: PlanTier[];
  benefits: string[];
  faqs: FAQ[];
}

export default function InsurancePageTemplate({
  badge,
  title,
  subtitle,
  heroIcon,
  description,
  coverageFeatures,
  planTiers,
  benefits,
  faqs,
}: InsurancePageProps) {
  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-56 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[rgb(var(--color-secondary))]/5" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/15 border border-primary/20 dark:border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                <span className="material-symbols-outlined text-sm">{heroIcon}</span>
                {badge}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--color-text-main))] mb-6 leading-tight">
                {title}
              </h1>
              <p className="text-xl text-[rgb(var(--color-text-body))] leading-relaxed mb-8">
                {subtitle}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-[rgb(var(--color-primary-hover))] transition-all h-12 px-8 text-white text-base font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1"
                >
                  Get a Free Quote
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
                <a
                  href="tel:+27313011192"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[rgb(var(--color-border-light))] hover:border-primary transition-all h-12 px-8 text-[rgb(var(--color-text-main))] text-base font-bold hover:text-primary"
                >
                  <span className="material-symbols-outlined">call</span>
                  +27 31 301 1192
                </a>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative hidden lg:block">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-[rgb(var(--color-secondary))]/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[150px] text-primary/40">
                  {heroIcon}
                </span>
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-[rgb(var(--color-surface-card))] rounded-xl p-5 shadow-xl border border-[rgb(var(--color-border-light))]">
                <div className="text-3xl font-bold text-primary mb-1">30+</div>
                <div className="text-sm text-[rgb(var(--color-text-muted))]">
                  Insurance Partners
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-[rgb(var(--color-surface-card))] rounded-xl p-5 shadow-xl border border-[rgb(var(--color-border-light))]">
                <div className="text-3xl font-bold text-primary mb-1">FSP</div>
                <div className="text-sm text-[rgb(var(--color-text-muted))]">
                  47089 Authorised
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-[rgb(var(--color-surface-card))] border-y border-[rgb(var(--color-border-light))]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* Coverage Features */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-main))] mb-4">
              What&apos;s Covered
            </h2>
            <p className="text-lg text-[rgb(var(--color-text-body))] max-w-2xl mx-auto">
              Comprehensive protection tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coverageFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">
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
            ))}
          </div>
        </div>
      </section>

      {/* Plan Tiers */}
      <section className="py-24 md:py-32 bg-[rgb(var(--color-surface-card))]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-main))] mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-[rgb(var(--color-text-body))] max-w-2xl mx-auto">
              Flexible coverage options to fit your budget and needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {planTiers.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border-2 transition-all ${
                  plan.highlighted
                    ? "border-primary bg-[rgb(var(--color-surface))] shadow-xl scale-105"
                    : "border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface))] hover:border-primary/50"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-bold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-[rgb(var(--color-text-muted))]">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-[rgb(var(--color-text-body))] mt-2">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                        check_circle
                      </span>
                      <span className="text-[rgb(var(--color-text-body))]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/quote"
                  className={`w-full flex items-center justify-center gap-2 rounded-lg h-12 font-bold transition-all ${
                    plan.highlighted
                      ? "bg-primary text-white hover:bg-[rgb(var(--color-primary-hover))] shadow-md shadow-primary/20"
                      : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  Get Started
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgb(var(--color-primary)) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Icon/Visual */}
            <div className="shrink-0">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-2xl shadow-primary/30 rotate-3 hover:rotate-0 transition-transform duration-300">
                <span className="material-symbols-outlined text-white text-5xl md:text-6xl">
                  calculate
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Not sure how much cover you need?
              </h3>
              <p className="text-slate-300 text-lg mb-0 md:mb-0 max-w-xl">
                Use our free coverage calculator to work out exactly how much life or funeral cover your family needs.
              </p>
            </div>

            {/* CTA Button */}
            <div className="shrink-0">
              <Link
                href="/tools/coverage-calculator"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-slate-900 font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <span className="material-symbols-outlined text-primary text-2xl">
                  pie_chart
                </span>
                Try Calculator
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-main))] mb-6">
                Why Choose Metrosure?
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-primary text-lg">
                        check
                      </span>
                    </div>
                    <span className="text-lg text-[rgb(var(--color-text-body))]">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/10 to-[rgb(var(--color-secondary))]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-8xl text-primary/30">
                  verified_user
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[rgb(var(--color-surface-card))]">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-main))] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[rgb(var(--color-text-body))]">
              Get answers to common questions about this coverage
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-[rgb(var(--color-surface))] rounded-xl border border-[rgb(var(--color-border-light))] overflow-hidden"
              >
                <summary className="flex justify-between items-center w-full p-6 text-left cursor-pointer list-none select-none hover:bg-[rgb(var(--color-surface-card))] transition-colors">
                  <span className="font-semibold text-[rgb(var(--color-text-main))] pr-8">
                    {faq.question}
                  </span>
                  <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="px-6 pb-6 text-[rgb(var(--color-text-body))] leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary to-[rgb(var(--color-secondary))] text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            <div className="relative text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Get Protected?
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Get your personalised quote in minutes. Our team is ready to help you find the right cover from our 30+ insurance partners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-white text-primary font-bold hover:bg-white/90 transition-all"
                >
                  <span className="material-symbols-outlined">bolt</span>
                  Get a Free Quote
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border-2 border-white text-white font-bold hover:bg-white/10 transition-all"
                >
                  <span className="material-symbols-outlined">call</span>
                  Talk to an Agent
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
