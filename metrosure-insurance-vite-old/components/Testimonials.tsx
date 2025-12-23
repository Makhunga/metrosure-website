import React, { useRef, useState, useEffect } from 'react';

const testimonialsData = [
  {
    text: "Metrosure handled my claim before I even panicked. It wasn't just about the money; it was the reassurance that someone was in my corner immediately.",
    name: "Sarah Jenkins",
    role: "Home & Auto",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBftwjJmCVssoXsRXB_4mcl34QNEvvautM8lnsVZaqKDqCp4hwD4rV9zrYbcgt7weui3WVd6Rti8KlRV-RmRYRpaqMAw5QALAXmrYdrCauqs7IHAfqFvKNS5ngwWoEesiGmJYG5UmanbUQHyDaZGyAPG9oLAlt8XzEJUmY2mBjLtrXjJz1xqOIqLDumNAmYTtf7vraM151rf3TnJuMSzEEPCdV9KOgenMIEQ4hCxhARe2nhC0uJdUbdO90qbsi0Tr3aU2WhPE2DoIEK"
  },
  {
    text: "Switching was seamless. The advisor actually looked at my business needs and saved me money while increasing my coverage.",
    name: "Mark Thompson",
    role: "Business Owner",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDChLppyvfMrSqj78ITDgV_CdjLNQGaK980MnvNfCyk7Ld-c0M2dRmAoo1XTYgMpQJyxLVweFyg1F5He-NMsJ-w516gy192AcG8XXPAoLeId9SwcaiybOfAuljkX4L-ZCs8eIxGmB0h9_1ibcxllo7w8pyEgHpflHShELRqNlnNyLjjuVZk6l8rkxGY2sBZujCWPqwRClBJloCwS6bunTDEq6PZFfGG2Z9nuGN_PrqbyqCmfGq2WVM_Ca9mDfBLUmp1O9Zc7CSFb3uZ"
  },
  {
    text: "I never understood my life insurance policy until I sat down with Metrosure. Now I feel genuinely confident about my family's future.",
    name: "Elena Rodriguez",
    role: "Life Insurance",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGRi_-6w33zrLytiqo2xlGizhqB4wDmH5UM0tjKVPVB4NShI-04MJkRMH2XAq1ZHiLWeFy0pbVifdzlDnm3zZlG8_6k3fSthswnQN25-bp9eNONYVdHafPzUSxlZx07T_3pXsZWUs-_05R6LY6A-doUkCrbUREFQngz4NLwcf6poWC4WY8uHruBP1O1QTk0F5OG1hVJ2FyvfMgZcqZHQmqk0Ly_AJyV6eVweKGXfZA2d-plu_cGWBYJMd3UG8XzLAwTCP6X1rlEIn4"
  }
];

const Testimonials: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Scroll to a specific index, centering the card
  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    
    // Clamp index
    if (index < 0) index = 0;
    if (index >= testimonialsData.length) index = testimonialsData.length - 1;

    const cards = container.children;
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      // Calculate position to center the card
      const scrollLeft = card.offsetLeft - (container.clientWidth / 2) + (card.offsetWidth / 2);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Autoplay functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      // Calculate next index cyclically
      const nextIndex = (activeIndex + 1) % testimonialsData.length;
      scrollToIndex(nextIndex);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [activeIndex, isPaused]);

  // Handle scroll events to update active index based on scroll position
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    
    // Find the center of the viewport
    const viewportCenter = container.scrollLeft + (container.clientWidth / 2);
    
    let closestIndex = 0;
    let minDistance = Infinity;

    // Find the child closest to the center
    Array.from(container.children).forEach((child, index) => {
      const element = child as HTMLElement;
      const elementCenter = element.offsetLeft + (element.offsetWidth / 2);
      const distance = Math.abs(elementCenter - viewportCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  return (
    <section 
      className="py-24 bg-surface-card overflow-hidden transition-colors duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
        <h2 className="text-3xl md:text-5xl font-bold text-text-main max-w-lg">Real stories, real security</h2>
        <div className="hidden md:flex gap-2">
          <button 
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-12 h-12 rounded-full border border-border-light flex items-center justify-center hover:bg-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-text-main"
            aria-label="Previous testimonial"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button 
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === testimonialsData.length - 1}
            className="w-12 h-12 rounded-full bg-text-main text-surface-card flex items-center justify-center hover:opacity-90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto pb-8 px-4 sm:px-6 lg:px-8 scrollbar-hide snap-x snap-mandatory"
      >
        {testimonialsData.map((testimonial, index) => (
          <div 
            key={index}
            className={`min-w-[300px] md:min-w-[420px] bg-surface-card p-8 rounded-2xl border snap-center transition-all duration-500 shadow-sm flex flex-col justify-between h-[340px]
              ${index === activeIndex 
                ? 'border-primary/50 shadow-md scale-100 opacity-100' 
                : 'border-border-light scale-95 opacity-70'
              }
            `}
          >
            <div>
              <div className="flex gap-1 text-primary mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined fill-current text-lg">star</span>
                ))}
              </div>
              <p className="text-lg text-text-main leading-relaxed font-medium">"{testimonial.text}"</p>
            </div>
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border-light">
              <div 
                className="w-12 h-12 rounded-full bg-cover bg-center border border-border-light" 
                style={{ backgroundImage: `url('${testimonial.image}')` }}
              ></div>
              <div>
                <p className="font-bold text-text-main">{testimonial.name}</p>
                <p className="text-xs text-text-body font-semibold uppercase tracking-wide">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Indicators (Dots) */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonialsData.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-primary w-8' 
                : 'bg-border-light hover:bg-primary/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;