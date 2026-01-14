import dynamic from "next/dynamic";
import { Header, Hero, StatsBar, Footer } from "@/components";

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
// Testimonial variant switcher for A/B comparison - REMOVE after selection
const TestimonialsVariantSwitcher = dynamic(
  () => import("@/components/testimonials/TestimonialsVariantSwitcher")
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
        <TestimonialsVariantSwitcher />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
