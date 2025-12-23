import React, { useEffect, useRef, useState } from 'react';

const Features: React.FC = () => {
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
      { threshold: 0.15 } // Adjusted threshold for earlier trigger
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Common easing for the entrance animation
  const entranceTransition = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
  
  // Icon pop transition
  const iconTransition = "transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]";

  return (
    <section ref={sectionRef} className="py-24 bg-surface-card relative transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 mb-16 items-start">
          <div className={`lg:w-1/3 lg:sticky lg:top-24 ${entranceTransition} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h2 className="text-4xl font-bold text-text-main mb-6 leading-tight">
              Built on trust,<br />driven by <span className="text-primary">integrity.</span>
            </h2>
            <p className="text-lg text-text-body mb-8 leading-relaxed">
              We don't just sell policies; we build partnerships. Our core values define every interaction, ensuring you receive the honest, transparent service you deserve.
            </p>
            <a className="inline-flex items-center text-primary font-bold hover:text-primary-hover transition-colors" href="#">
              Read our full mission <span className="material-symbols-outlined ml-2">arrow_forward</span>
            </a>
          </div>
          
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 border border-border-light rounded-2xl overflow-hidden shadow-sm bg-surface-card">
              
              {/* Feature 1 */}
              <div className="p-10 border-b md:border-b-0 md:border-r border-border-light hover:bg-surface/50 transition-colors group">
                <div 
                  className={`${entranceTransition} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: '100ms' }}
                >
                  <div 
                    className={`w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 ${iconTransition} ${isVisible ? 'scale-100 rotate-0' : 'scale-0 -rotate-12'}`}
                    style={{ transitionDelay: '200ms' }}
                  >
                    <span 
                      className={`material-symbols-outlined text-3xl text-primary transition-transform duration-500 group-hover:rotate-12 ${isVisible ? 'animate-subtle-pulse' : ''}`}
                      style={{ animationDelay: '800ms' }} // Delayed pulse to start after entrance
                    >handshake</span>
                  </div>
                  <h3 className="text-xl font-bold text-text-main mb-3">Unwavering Integrity</h3>
                  <p className="text-text-body leading-relaxed">
                    We do the right thing, even when no one is looking. Honest advice and fair dealings are our absolute baseline for every client relationship.
                  </p>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="p-10 border-b border-border-light hover:bg-surface/50 transition-colors group">
                <div 
                  className={`${entranceTransition} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: '200ms' }}
                >
                  <div 
                    className={`w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 ${iconTransition} ${isVisible ? 'scale-100 rotate-0' : 'scale-0 -rotate-12'}`}
                    style={{ transitionDelay: '300ms' }}
                  >
                    <span 
                      className={`material-symbols-outlined text-3xl text-primary transition-transform duration-500 group-hover:rotate-12 ${isVisible ? 'animate-subtle-pulse' : ''}`}
                      style={{ animationDelay: '900ms' }}
                    >visibility</span>
                  </div>
                  <h3 className="text-xl font-bold text-text-main mb-3">Total Transparency</h3>
                  <p className="text-text-body leading-relaxed">
                    No fine print traps. We ensure you understand every detail of your coverage before you sign, with clear language and no hidden clauses.
                  </p>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="p-10 border-b md:border-b-0 md:border-r border-border-light hover:bg-surface/50 transition-colors group">
                <div 
                  className={`${entranceTransition} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: '300ms' }}
                >
                  <div 
                    className={`w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 ${iconTransition} ${isVisible ? 'scale-100 rotate-0' : 'scale-0 -rotate-12'}`}
                    style={{ transitionDelay: '400ms' }}
                  >
                    <span 
                      className={`material-symbols-outlined text-3xl text-primary transition-transform duration-500 group-hover:rotate-12 ${isVisible ? 'animate-subtle-pulse' : ''}`}
                      style={{ animationDelay: '1000ms' }}
                    >favorite</span>
                  </div>
                  <h3 className="text-xl font-bold text-text-main mb-3">Human-First Empathy</h3>
                  <p className="text-text-body leading-relaxed">
                    We treat clients like family. Compassionate support is guaranteed, especially during the moments when you need us the most.
                  </p>
                </div>
              </div>
              
              {/* Feature 4 */}
              <div className="p-10 hover:bg-surface/50 transition-colors group">
                <div 
                  className={`${entranceTransition} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: '400ms' }}
                >
                  <div 
                    className={`w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 ${iconTransition} ${isVisible ? 'scale-100 rotate-0' : 'scale-0 -rotate-12'}`}
                    style={{ transitionDelay: '500ms' }}
                  >
                    <span 
                      className={`material-symbols-outlined text-3xl text-primary transition-transform duration-500 group-hover:rotate-12 ${isVisible ? 'animate-subtle-pulse' : ''}`}
                      style={{ animationDelay: '1100ms' }}
                    >rocket_launch</span>
                  </div>
                  <h3 className="text-xl font-bold text-text-main mb-3">Modern Innovation</h3>
                  <p className="text-text-body leading-relaxed">
                    We leverage technology to simplify insurance, reducing paperwork and making claims faster, smarter, and easier for you.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;