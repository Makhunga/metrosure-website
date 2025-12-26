import Link from "next/link";
import { Header, Footer } from "@/components";

export default function NotFound() {
  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 pt-56 pb-24">
        <div className="text-center max-w-3xl">
          {/* 404 Number */}
          <div className="relative mb-8">
            <span className="text-[180px] md:text-[240px] font-bold text-primary leading-none select-none opacity-20">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-8xl text-primary">
                search_off
              </span>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-main))] mb-4">
            Page Not Found
          </h1>
          <p className="text-[rgb(var(--color-text-body))] text-lg mb-8 leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
            moved, deleted, or never existed in the first place.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-[rgb(var(--color-primary-hover))] transition-all h-12 px-8 text-white font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined text-xl">home</span>
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[rgb(var(--color-border-light))] hover:border-primary transition-all h-12 px-8 text-[rgb(var(--color-text-main))] font-bold hover:text-primary"
            >
              <span className="material-symbols-outlined text-xl">mail</span>
              Contact Support
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8">
            <p className="text-sm text-[rgb(var(--color-text-muted))] mb-4">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                href="/quote"
                className="text-primary font-medium hover:opacity-80 transition-opacity"
              >
                Get a Quote
              </Link>
              <span className="text-[rgb(var(--color-text-muted))]">•</span>
              <Link
                href="/claims"
                className="text-primary font-medium hover:opacity-80 transition-opacity"
              >
                File a Claim
              </Link>
              <span className="text-[rgb(var(--color-text-muted))]">•</span>
              <Link
                href="/help"
                className="text-primary font-medium hover:opacity-80 transition-opacity"
              >
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
