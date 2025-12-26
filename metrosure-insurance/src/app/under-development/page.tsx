import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnderDevelopment from "@/components/UnderDevelopment";

export const metadata: Metadata = {
  title: "Under Development | Metrosure Insurance Brokers",
  description: "This page is currently under development. Check back soon for updates.",
};

export default function UnderDevelopmentPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--color-surface))]">
      <Header />
      <main className="flex-1 flex flex-col pt-56">
        <UnderDevelopment
          pageName="This Feature"
          description="We're working hard to bring you this feature. Check back soon!"
          showProgress={true}
          progress={60}
        />
      </main>
      <Footer />
    </div>
  );
}
