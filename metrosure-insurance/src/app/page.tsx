import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header, Hero, StatsBar, Footer } from "@/components";

export const metadata: Metadata = {
  title: "Metrosure Insurance Brokers | Trusted SA Insurance Since 2013",
  description:
    "South Africa's trusted insurance broker connecting families with the right cover. Car, home, life insurance & retirement planning. 5,000+ jobs created. FSP 47089.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Metrosure Insurance Brokers | Trusted SA Insurance Since 2013",
    description:
      "South Africa's trusted insurance broker connecting families with the right cover. Car, home, life insurance & retirement planning. 5,000+ jobs created. FSP 47089.",
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
export default function Home() {
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
