import {
  Header,
  Hero,
  StatsBar,
  Features,
  Approach,
  Products,
  WhyChooseUs,
  PartnersCTA,
  Testimonials,
  CallToAction,
  Footer,
  ScrollToTop,
} from "@/components";

export default function Home() {
  return (
    <div className="bg-stone-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <Header />
      <main className="pt-20">
        <Hero />
        <StatsBar />
        <Features />
        <Approach />
        <Products />
        <WhyChooseUs />
        <PartnersCTA />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
