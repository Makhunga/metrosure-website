"use client";

import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-24 px-4 bg-[rgb(var(--color-surface-card))] transition-colors duration-300">
      <div className="max-w-6xl mx-auto bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
        {/* Decorative Blurs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 flex flex-col items-center gap-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Ready to feel secure?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl font-medium">
            Join thousands of others who have switched to a smarter, more human way of insuring
            their future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/quote"
              className="bg-white text-primary text-lg font-bold py-4 px-10 rounded-lg hover:bg-gray-50 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              Get Your Free Quote
            </Link>
            <Link
              href="/contact"
              className="bg-[rgb(var(--color-primary-hover))] border border-white/20 text-white text-lg font-bold py-4 px-10 rounded-lg hover:bg-black/20 transition-colors"
            >
              Contact Sales
            </Link>
          </div>

          <p className="text-sm text-white/70 mt-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">lock</span>
            Secure & Confidential. No spam.
          </p>
        </div>
      </div>
    </section>
  );
}
