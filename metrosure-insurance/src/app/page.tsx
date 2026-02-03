import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header, Hero, StatsBar, Footer } from "@/components";

export const metadata: Metadata = {
  title: "Metrosure Insurance Brokers | Trusted SA Insurance Since 2016",
  description:
    "South Africa's trusted financial services broker connecting families with the right cover. Life, funeral, car and home products from leading insurers. 5,000+ jobs created. FSP 47089.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Metrosure Insurance Brokers | Trusted SA Insurance Since 2016",
    description:
      "South Africa's trusted financial services broker connecting families with the right cover. Life, funeral, car and home products from leading insurers. 5,000+ jobs created. FSP 47089.",
    url: "/",
  },
};

// Below-fold components - dynamically imported for code splitting
// SSR is enabled to maintain SEO, but JS bundle is split for faster hydration
const PartnerShowcase = dynamic(() => import("@/components/PartnerShowcase"));
const Features = dynamic(() => import("@/components/Features"));
const TrustedBy = dynamic(() => import("@/components/TrustedBy"));
const Approach = dynamic(() => import("@/components/Approach"));
const Products = dynamic(() => import("@/components/Products"));
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"));
const LatestOpportunities = dynamic(() => import("@/components/LatestOpportunities"));
const PartnersCTA = dynamic(() => import("@/components/PartnersCTA"));
// Testimonial Section - Trullion-inspired Carousel (Session 118)
const TestimonialsCarousel = dynamic(
  () => import("@/components/testimonials/TestimonialsCarousel")
);
const CallToAction = dynamic(() => import("@/components/CallToAction"));

// Loading skeleton for Suspense fallback
// Note: We intentionally don't render Header/Footer here to avoid IntersectionObserver issues
function HomeLoadingSkeleton() {
  return (
    <div className="bg-stone-50 dark:bg-slate-900 min-h-screen animate-pulse">
      {/* Header skeleton */}
      <div className="h-16 bg-gray-200 dark:bg-gray-800" />
      {/* Hero skeleton */}
      <div className="h-[80vh] bg-gray-100 dark:bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32">
          {/* Badge skeleton */}
          <div className="h-8 w-56 bg-gray-200 dark:bg-gray-800 rounded-full mb-6" />
          {/* Large heading */}
          <div className="h-16 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
          <div className="h-16 w-1/2 bg-gray-200 dark:bg-gray-800 rounded mb-6" />
          {/* Subtitle lines */}
          <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
          <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-800 rounded mb-8" />
          {/* CTA buttons */}
          <div className="flex gap-4">
            <div className="h-14 w-44 bg-gray-200 dark:bg-gray-800 rounded-xl" />
            <div className="h-14 w-44 bg-gray-200 dark:bg-gray-800 rounded-xl" />
          </div>
        </div>
      </div>
      {/* Stats bar skeleton */}
      <div className="py-8 bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-8 bg-white/20 rounded mb-2 mx-auto w-20" />
                <div className="h-4 bg-white/10 rounded mx-auto w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Partner logos hint */}
      <div className="h-20 bg-gray-50 dark:bg-gray-900" />
    </div>
  );
}

function HomeContent() {
  return (
    <div className="bg-stone-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <PartnerShowcase />
        <Features />
        <TrustedBy />
        <Approach />
        <Products />
        <WhyChooseUs />
        <LatestOpportunities />
        <PartnersCTA />
        <TestimonialsCarousel />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomeLoadingSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
