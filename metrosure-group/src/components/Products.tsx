"use client";

import Link from "next/link";

const products = [
  {
    icon: "home",
    title: "Home & Property",
    description:
      "Complete protection for your home structure and personal belongings against theft, fire, and natural disasters.",
    features: ["Dwelling Coverage", "Personal Liability"],
    href: "/insurance/home",
  },
  {
    icon: "directions_car",
    title: "Auto & Vehicle",
    description:
      "Keep moving with collision, comprehensive, and liability coverage that travels with you everywhere.",
    features: ["Accident Forgiveness", "Roadside Assist"],
    href: "/insurance/auto",
  },
  {
    icon: "favorite",
    title: "Life & Health",
    description:
      "Flexible term and whole life plans to secure your family's financial future in any circumstance.",
    features: ["Term Life", "Critical Illness"],
    href: "/insurance/life",
  },
  {
    icon: "storefront",
    title: "Business",
    description:
      "Scalable solutions for startups and enterprises, covering liability, property, and employee risks.",
    features: ["General Liability", "Workers Comp"],
    href: "/insurance/business",
  },
];

export default function Products() {
  return (
    <section
      id="products"
      className="py-24 bg-[rgb(var(--color-surface-card))] transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
              Our Products
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[rgb(var(--color-text-main))]">
              Tailored Solutions
            </h2>
          </div>
          <p className="text-[rgb(var(--color-text-body))] max-w-md text-right md:text-left">
            Comprehensive coverage options designed to be modular and clear.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[rgb(var(--color-border-light))]">
          {products.map((product) => (
            <Link
              key={product.title}
              href={product.href}
              className="group relative p-8 border-r border-b border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface-card))] hover:bg-[rgb(var(--color-surface))] transition-all duration-300"
            >
              {/* Icon and Arrow */}
              <div className="mb-8 flex justify-between items-start">
                <div className="w-12 h-12 rounded-lg bg-[rgb(var(--color-surface))] flex items-center justify-center group-hover:bg-[rgb(var(--color-surface-card))] group-hover:shadow-md transition-all">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    {product.icon}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[rgb(var(--color-border-light))] group-hover:text-primary transition-colors group-hover:translate-x-1 group-hover:-translate-y-1">
                  arrow_outward
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-[rgb(var(--color-text-main))] mb-3 group-hover:text-primary transition-colors">
                {product.title}
              </h3>
              <p className="text-sm text-[rgb(var(--color-text-body))] leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-xs font-semibold text-[rgb(var(--color-text-muted))] flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
