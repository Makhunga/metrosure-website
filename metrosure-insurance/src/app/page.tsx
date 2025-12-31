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
        <PartnerLogos />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
