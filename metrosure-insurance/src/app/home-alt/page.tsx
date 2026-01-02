import {
  Header,
  StatsBar,
  Features,
  Approach,
  Products,
  WhyChooseUs,
  PartnersCTA,
  Testimonials,
  CallToAction,
  Footer,
} from "@/components";
import HeroCentered from "@/components/HeroCentered";

export default function HomeAlt() {
  return (
    <div className="bg-stone-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <Header />
      <main>
        <HeroCentered />
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
    </div>
  );
}
