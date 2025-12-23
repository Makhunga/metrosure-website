import React from 'react';

const Difference: React.FC = () => {
  return (
    <section className="py-24 bg-surface border-y border-border-light transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          <div className="flex-1 order-2 md:order-1 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border-light group cursor-pointer">
              <img alt="Office collaboration" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHvAY9AdUkNDUIWOrPJR4j32K2XoIQUtpf6rZ-k-IJR6vGROi50u4owqR_3VP4VKEwrVsWPAwH4JULUZ3f1JpJ8DbyMAbcRrv7gfz6gW3aaweJFvjQ-Djw0yDZscbQ9GINOyFccrxZoX4rUopgTtTekh5ARw9R9tKSs6Ng8JXqfZLYAc7rJc4OUK6HblYRY5UZU91sg3ZR6Wp4KMbzjaQjxQA9dM02nvBx7KJaDcGwsTNlJ56S7K8Iwu2UG5JnSnrmpDWz9POQ9wbU" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <button className="w-20 h-20 rounded-full bg-primary/90 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <span className="material-symbols-outlined text-white text-4xl ml-1">play_arrow</span>
                </button>
              </div>
            </div>
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border-2 border-border-light rounded-2xl bg-transparent"></div>
          </div>
          
          <div className="flex-1 order-1 md:order-2 space-y-6">
            <div className="inline-block px-3 py-1 rounded bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase">
              The Metrosure Difference
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main">Protection that evolves with you</h2>
            <p className="text-lg text-text-body leading-relaxed">
              Life doesn't stand still, and neither should your insurance. We built a dynamic coverage model that adapts as your family grows, your assets increase, and your goals shift.
            </p>
            <div className="pt-4 flex gap-8">
              <div>
                <p className="text-3xl font-bold text-text-main">15k+</p>
                <p className="text-sm text-text-muted font-medium mt-1">Policies Updated</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-text-main">4.9/5</p>
                <p className="text-sm text-text-muted font-medium mt-1">Customer Satisfaction</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Difference;