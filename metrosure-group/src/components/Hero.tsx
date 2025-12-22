"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-32 overflow-hidden bg-[rgb(var(--color-surface-card))] transition-colors duration-300">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none opacity-60 animate-[grid-flow_20s_linear_infinite]" />

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        {/* Left Content */}
        <div className="flex-1 flex flex-col gap-8 text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 py-1.5 px-4 rounded-full bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border-light))] w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-[rgb(var(--color-text-body))]">
              Future Proof Insurance
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-[rgb(var(--color-text-main))]">
            Your Future, <br />
            <span className="text-primary">Secured Today.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-[rgb(var(--color-text-body))] max-w-lg leading-relaxed text-balance">
            Insurance designed for the complexities of modern life. Experience peace of mind with security that adapts to you, not just a static policy.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/quote"
              className="h-14 px-8 rounded-lg bg-primary text-white text-base font-bold hover:bg-[rgb(var(--color-primary-hover))] transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 flex items-center justify-center"
            >
              Start Your Quote
            </Link>
            <Link
              href="#products"
              className="h-14 px-8 rounded-lg border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface-card))] text-[rgb(var(--color-text-main))] text-base font-bold hover:bg-[rgb(var(--color-surface))] transition-colors flex items-center gap-2 group justify-center"
            >
              <span>Explore Plans</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-6 pt-8 border-t border-[rgb(var(--color-border-light))] mt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-[rgb(var(--color-surface-card))] bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700"
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-[rgb(var(--color-surface-card))] bg-primary flex items-center justify-center text-xs font-bold text-white">
                +2k
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-primary">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="material-symbols-outlined fill-current text-[16px]">
                    star
                  </span>
                ))}
              </div>
              <span className="text-sm font-medium text-[rgb(var(--color-text-body))]">
                Trusted by 2,000+ families
              </span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 w-full relative">
          <div className="relative rounded-2xl overflow-hidden border border-[rgb(var(--color-border-light))] shadow-2xl bg-gradient-to-br from-slate-100 via-slate-50 to-white dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 aspect-[4/3] lg:aspect-square">
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-[rgb(var(--color-secondary))]/20 rounded-full blur-3xl" />
            </div>
            {/* Family Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-[180px] text-primary/20">
                family_restroom
              </span>
            </div>

            {/* Floating Status Card */}
            <div className="absolute top-8 left-8 bg-[rgb(var(--color-surface-card))]/95 backdrop-blur p-4 rounded-xl border border-[rgb(var(--color-border-light))] shadow-xl animate-[float_4s_ease-in-out_infinite]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div>
                  <p className="text-xs text-[rgb(var(--color-text-muted))] font-bold uppercase tracking-wider">
                    Status
                  </p>
                  <p className="text-sm font-bold text-[rgb(var(--color-text-main))]">
                    Policy Active
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Savings Card */}
            <div className="absolute bottom-8 right-8 bg-[rgb(var(--color-surface-card))]/95 backdrop-blur p-5 rounded-xl border border-[rgb(var(--color-border-light))] shadow-xl max-w-[200px]">
              <div className="flex justify-between items-end mb-2">
                <p className="text-xs text-[rgb(var(--color-text-muted))] font-bold uppercase">
                  Savings
                </p>
                <span className="text-green-600 text-xs font-bold">+12%</span>
              </div>
              <div className="h-1.5 w-full bg-[rgb(var(--color-surface))] rounded-full overflow-hidden">
                <div className="h-full bg-primary w-3/4 rounded-full" />
              </div>
              <p className="mt-2 text-lg font-bold text-[rgb(var(--color-text-main))]">$1,240/yr</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
