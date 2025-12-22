import {
  Header,
  Hero,
  StatsBar,
  Features,
  Approach,
  Products,
  Difference,
  WhyChooseUs,
  Testimonials,
  CallToAction,
  Footer,
  ScrollToTop,
} from "@/components";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        <StatsBar />
        <Features />
        <Approach />
        <Products />
        <Difference />
        <WhyChooseUs />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
