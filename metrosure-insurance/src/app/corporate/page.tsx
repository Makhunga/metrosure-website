import { Header, Footer } from "@/components";
import {
  CorporateHero,
  CorporateServices,
  CorporateBenefits,
  CorporateProcess,
  CorporateFAQ,
  CorporateInquiryForm,
} from "@/components/corporate";

export default function CorporatePage() {
  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen transition-colors duration-300 relative">
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none z-0" />

      <Header />
      <main className="relative z-10">
        <CorporateHero />
        <CorporateServices />
        <CorporateProcess />
        <CorporateBenefits />
        <CorporateFAQ />
        <CorporateInquiryForm />
      </main>
      <Footer />
    </div>
  );
}
