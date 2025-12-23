import React from 'react';

const Approach: React.FC = () => {
  return (
    <section className="py-24 bg-surface border-y border-border-light overflow-hidden transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-text-main">
              We prioritize people <br />
              <span className="text-primary italic font-serif">over policies.</span>
            </h2>
            <p className="text-lg text-text-body leading-relaxed max-w-xl">
              Our approach moves beyond the standard checklist. We look at your life as a whole to provide coverage that actually fits, ensuring you are protected when it matters most.
            </p>
            <div className="grid grid-cols-1 gap-6 pt-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-card border border-border-light hover:border-primary/30 transition-colors shadow-sm">
                <div className="mt-1 min-w-[24px]">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                </div>
                <div>
                  <h4 className="font-bold text-text-main">Personalized Life Stage Analysis</h4>
                  <p className="text-sm text-text-body mt-1">Coverage that adapts to your age, career, and family needs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-card border border-border-light hover:border-primary/30 transition-colors shadow-sm">
                <div className="mt-1 min-w-[24px]">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                </div>
                <div>
                  <h4 className="font-bold text-text-main">Rapid, Empathetic Claims Process</h4>
                  <p className="text-sm text-text-body mt-1">Claims handled by humans who care, not automated bots.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-card border border-border-light hover:border-primary/30 transition-colors shadow-sm">
                <div className="mt-1 min-w-[24px]">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                </div>
                <div>
                  <h4 className="font-bold text-text-main">Annual "Future-Proof" Reviews</h4>
                  <p className="text-sm text-text-body mt-1">Regular check-ins to ensure you're never underinsured.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border-light group">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img alt="Advisor meeting" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAETNQAsUQmf3bRO3Osl5mkQzIghS1q63tYNHmyLmXl6CuCobKWF7hgDn3s-t5JIQMvJUfapeyiyM1yzYpAMJO0XFq82SyZKjTMYxDwMiP0IJFdMX9NrvFWTmZycowr9vX_ny7CpOSa-ICeA6OOoSYRuwmmqohtccRCBnSmvxdoGkxr5L3SeWtfI9acUhTkiIR80Jt9mSMc24fI75gMPHBG50g0YkqbK69TCynzrgm6WA7qBrxxadixk1FehQ3lLsnyhbHn-8vxt_yF" />
              <div className="absolute bottom-6 left-6 z-20 bg-surface-card/95 backdrop-blur px-6 py-5 rounded-xl border border-border-light max-w-xs shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex h-3 w-3 rounded-full bg-green-500"></span>
                  <p className="text-xs font-bold uppercase text-text-muted">Metric</p>
                </div>
                <p className="text-text-main font-bold text-3xl mb-1">98%</p>
                <p className="text-sm text-text-body font-medium">Client retention rate year over year.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;