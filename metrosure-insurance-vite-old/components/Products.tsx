import React from 'react';

const Products: React.FC = () => {
  return (
    <section className="py-24 bg-surface-card transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Our Products</span>
            <h2 className="text-3xl md:text-5xl font-bold text-text-main">Tailored Solutions</h2>
          </div>
          <p className="text-text-body max-w-md text-right md:text-left">
            Comprehensive coverage options designed to be modular and clear.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-border-light">
          
          <div className="group relative p-8 border-r border-b border-border-light bg-surface-card hover:bg-surface transition-all duration-300">
            <div className="mb-8 flex justify-between items-start">
              <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center group-hover:bg-surface-card group-hover:shadow-md transition-all">
                <span className="material-symbols-outlined text-primary text-2xl">home</span>
              </div>
              <span className="material-symbols-outlined text-border-light group-hover:text-primary transition-colors">arrow_outward</span>
            </div>
            <h3 className="text-xl font-bold text-text-main mb-3">Home & Property</h3>
            <p className="text-sm text-text-body leading-relaxed mb-6">
              Complete protection for your home structure and personal belongings against theft, fire, and natural disasters.
            </p>
            <ul className="space-y-2 mb-8">
              <li className="text-xs font-semibold text-text-muted flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary"></span>Dwelling Coverage
              </li>
              <li className="text-xs font-semibold text-text-muted flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary"></span>Personal Liability
              </li>
            </ul>
          </div>
          
          <div className="group relative p-8 border-r border-b border-border-light bg-surface-card hover:bg-surface transition-all duration-300">
            <div className="mb-8 flex justify-between items-start">
              <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center group-hover:bg-surface-card group-hover:shadow-md transition-all">
                <span className="material-symbols-outlined text-primary text-2xl">directions_car</span>
              </div>
              <span className="material-symbols-outlined text-border-light group-hover:text-primary transition-colors">arrow_outward</span>
            </div>
            <h3 className="text-xl font-bold text-text-main mb-3">Auto & Vehicle</h3>
            <p className="text-sm text-text-body leading-relaxed mb-6">
              Keep moving with collision, comprehensive, and liability coverage that travels with you everywhere.
            </p>
            <ul className="space-y-2 mb-8">
              <li className="text-xs font-semibold text-text-muted flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary"></span>Accident Forgiveness
              </li>
              <li className="text-xs font-semibold text-text-muted flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary"></span>Roadside Assist
              </li>
            </ul>
          </div>
          
          <div className="group relative p-8 border-r border-b border-border-light bg-surface-card hover:bg-surface transition-all duration-300">
            <div className="mb-8 flex justify-between items-start">
              <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center group-hover:bg-surface-card group-hover:shadow-md transition-all">
                <span className="material-symbols-outlined text-primary text-2xl">favorite</span>
              </div>
              <span className="material-symbols-outlined text-border-light group-hover:text-primary transition-colors">arrow_outward</span>
            </div>
            <h3 className="text-xl font-bold text-text-main mb-3">Life & Health</h3>
            <p className="text-sm text-text-body leading-relaxed mb-6">
              Flexible term and whole life plans to secure your family's financial future in any circumstance.
            </p>
            <ul className="space-y-2 mb-8">
              <li className="text-xs font-semibold text-text-muted flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary"></span>Term Life
              </li>
              <li className="text-xs font-semibold text-text-muted flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary"></span>Critical Illness
              </li>
            </ul>
          </div>
          
          <div className="group relative p-8 border-r border-b border-border-light bg-surface-card hover:bg-surface transition-all duration-300">
            <div className="mb-8 flex justify-between items-start">
              <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center group-hover:bg-surface-card group-hover:shadow-md transition-all">
                <span className="material-symbols-outlined text-primary text-2xl">storefront</span>
              </div>
              <span className="material-symbols-outlined text-border-light group-hover:text-primary transition-colors">arrow_outward</span>
            </div>
            <h3 className="text-xl font-bold text-text-main mb-3">Business</h3>
            <p className="text-sm text-text-body leading-relaxed mb-6">
              Scalable solutions for startups and enterprises, covering liability, property, and employee risks.
            </p>
            <ul className="space-y-2 mb-8">
              <li className="text-xs font-semibold text-text-muted flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary"></span>General Liability
              </li>
              <li className="text-xs font-semibold text-text-muted flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary"></span>Workers Comp
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Products;