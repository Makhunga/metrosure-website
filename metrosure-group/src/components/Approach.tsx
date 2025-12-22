"use client";

const checkpoints = [
  {
    title: "Personalized Life Stage Analysis",
    description: "Coverage that adapts to your age, career, and family needs.",
  },
  {
    title: "Rapid, Empathetic Claims Process",
    description: "Claims handled by humans who care, not automated bots.",
  },
  {
    title: 'Annual "Future-Proof" Reviews',
    description: "Regular check-ins to ensure you're never underinsured.",
  },
];

export default function Approach() {
  return (
    <section
      id="approach"
      className="py-24 bg-[rgb(var(--color-surface))] border-y border-[rgb(var(--color-border-light))] overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-[rgb(var(--color-text-main))]">
              We prioritize people <br />
              <span className="text-primary italic font-serif">over policies.</span>
            </h2>
            <p className="text-lg text-[rgb(var(--color-text-body))] leading-relaxed max-w-xl">
              Our approach moves beyond the standard checklist. We look at your life as a whole to
              provide coverage that actually fits, ensuring you are protected when it matters most.
            </p>

            <div className="grid grid-cols-1 gap-6 pt-4">
              {checkpoints.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-primary/30 transition-all shadow-sm hover:shadow-md group"
                >
                  <div className="mt-1 min-w-[24px]">
                    <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform inline-block">
                      check_circle
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[rgb(var(--color-text-main))]">{item.title}</h4>
                    <p className="text-sm text-[rgb(var(--color-text-body))] mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[rgb(var(--color-border-light))] group bg-gradient-to-br from-slate-100 via-slate-50 to-white dark:from-slate-800 dark:via-slate-700 dark:to-slate-600">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              {/* Decorative Elements */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-[rgb(var(--color-secondary))]/20 rounded-full blur-3xl" />
              </div>
              {/* Meeting Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[140px] text-primary/15 group-hover:scale-105 transition-transform duration-700">
                  groups
                </span>
              </div>

              {/* Floating Metric Card */}
              <div className="absolute bottom-6 left-6 z-20 bg-[rgb(var(--color-surface-card))]/95 backdrop-blur px-6 py-5 rounded-xl border border-[rgb(var(--color-border-light))] max-w-xs shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex h-3 w-3 rounded-full bg-green-500" />
                  <p className="text-xs font-bold uppercase text-[rgb(var(--color-text-muted))]">
                    Metric
                  </p>
                </div>
                <p className="text-[rgb(var(--color-text-main))] font-bold text-3xl mb-1">98%</p>
                <p className="text-sm text-[rgb(var(--color-text-body))] font-medium">
                  Client retention rate year over year.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
