import React, { useEffect, useRef, useState } from 'react';

const StatItem: React.FC<{ stat: { value: string, label: string }, index: number, isVisible: boolean }> = ({ stat, index, isVisible }) => {
  const [displayValue, setDisplayValue] = useState("0");
  
  useEffect(() => {
    // Determine initial state formatting
    const match = stat.value.match(/^(\D*)(\d+)(.*)$/);
    if (match) {
      setDisplayValue(`${match[1]}0${match[3]}`);
    } else {
      setDisplayValue(stat.value);
    }
  }, [stat.value]);

  useEffect(() => {
    if (!isVisible) return;

    const match = stat.value.match(/^(\D*)(\d+)(.*)$/);
    if (!match) return;

    const prefix = match[1];
    const target = parseInt(match[2], 10);
    const suffix = match[3];

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds for full count
    const delay = index * 150; // Sync with the CSS entrance delay

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Wait for delay before starting count
      if (elapsed < delay) {
        requestAnimationFrame(animate);
        return;
      }

      // Calculate progress after delay
      const progress = Math.min((elapsed - delay) / duration, 1);
      
      // Easing function: Cubic ease out
      const ease = 1 - Math.pow(1 - progress, 3);
      
      const current = Math.floor(ease * target);
      setDisplayValue(`${prefix}${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, index, stat.value]);

  return (
    <div 
      className="px-6 py-6 md:py-8 flex flex-col items-center justify-center text-center group bg-surface-card hover:bg-surface transition-colors duration-300"
    >
      <div 
        className={`transform transition-all duration-700 ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-12 scale-75'
        }`}
        style={{ 
            transitionDelay: `${index * 150}ms`,
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' 
        }}
      >
        <span className="text-3xl font-bold text-primary mb-1 block transition-transform duration-300 group-hover:scale-110">
          {displayValue}
        </span>
        <span className="text-sm font-medium text-text-body">
          {stat.label}
        </span>
      </div>
    </div>
  );
};

const StatsBar: React.FC = () => {
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

  const stats = [
    { value: "98%", label: "Claims Paid Out" },
    { value: "24hr", label: "Turnaround Time" },
    { value: "24/7", label: "Human Support" },
    { value: "$500+", label: "Average Savings" }
  ];

  return (
    <section ref={sectionRef} className="border-y border-border-light bg-surface overflow-hidden transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border-light">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;