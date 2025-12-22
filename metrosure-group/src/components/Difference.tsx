"use client";

export default function Difference() {
  return (
    <section className="py-24 bg-[rgb(var(--color-surface))] border-y border-[rgb(var(--color-border-light))] transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          {/* Left Image */}
          <div className="flex-1 order-2 md:order-1 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[rgb(var(--color-border-light))] group cursor-pointer aspect-[3/2] bg-gradient-to-br from-slate-200 via-slate-100 to-white dark:from-slate-700 dark:via-slate-600 dark:to-slate-500">
              {/* Decorative Elements */}
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-primary/30 rounded-full blur-2xl" />
                <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-[rgb(var(--color-secondary))]/20 rounded-full blur-2xl" />
              </div>
              {/* Team Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[120px] text-primary/15">
                  diversity_3
                </span>
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <button className="w-20 h-20 rounded-full bg-primary/90 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl hover:bg-primary">
                  <span className="material-symbols-outlined text-white text-4xl ml-1">
                    play_arrow
                  </span>
                </button>
              </div>
            </div>

            {/* Decorative Border */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border-2 border-[rgb(var(--color-border-light))] rounded-2xl bg-transparent" />
          </div>

          {/* Right Content */}
          <div className="flex-1 order-1 md:order-2 space-y-6">
            <div className="inline-block px-3 py-1 rounded bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase">
              The Metrosure Difference
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--color-text-main))]">
              Protection that evolves with you
            </h2>
            <p className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed">
              Life doesn&apos;t stand still, and neither should your insurance. We built a dynamic
              coverage model that adapts as your family grows, your assets increase, and your goals
              shift.
            </p>

            {/* Stats */}
            <div className="pt-4 flex gap-8">
              <div>
                <p className="text-3xl font-bold text-[rgb(var(--color-text-main))]">15k+</p>
                <p className="text-sm text-[rgb(var(--color-text-muted))] font-medium mt-1">
                  Policies Updated
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[rgb(var(--color-text-main))]">4.9/5</p>
                <p className="text-sm text-[rgb(var(--color-text-muted))] font-medium mt-1">
                  Customer Satisfaction
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
