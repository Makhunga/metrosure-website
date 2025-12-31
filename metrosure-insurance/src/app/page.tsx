import {
  Header,
  Hero,
  StatsBar,
  Features,
  Approach,
  Products,
  WhyChooseUs,
  PartnersCTA,
  PartnerLogos,
  Testimonials,
  CallToAction,
  Footer,
  ScrollToTop,
} from "@/components";

// Show PartnerLogos only in development (hide on Vercel production)
const showPartnerLogos = process.env.NODE_ENV === "development";

export default function Home() {
  return (
    <div className="bg-stone-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <Features />
        <Approach />
        <Products />
        <WhyChooseUs />
        <PartnersCTA />
        {showPartnerLogos && <PartnerLogos />}
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
