import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnderDevelopment from "@/components/UnderDevelopment";

// Feature flag: Set to true to enable maintenance mode in production
const CAREERS_MAINTENANCE_MODE = true;

export const metadata: Metadata = {
  title: "Careers | Metrosure Insurance Brokers",
  description: "Join the Metrosure team. We've created over 5,000 jobs across South Africa. Explore career opportunities in insurance, sales, administration, and management.",
  openGraph: {
    title: "Careers | Metrosure Insurance Brokers",
    description: "Join the Metrosure team. We've created over 5,000 jobs across South Africa. Explore career opportunities in insurance and financial services.",
    url: "/careers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Metrosure Insurance Brokers",
    description: "Join the Metrosure team. We've created over 5,000 jobs across South Africa. Explore career opportunities in insurance and financial services.",
  },
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Show maintenance page in production only when flag is enabled
  const isProduction = process.env.NODE_ENV === "production";
  const showMaintenance = CAREERS_MAINTENANCE_MODE && isProduction;

  if (showMaintenance) {
    return (
      <div className="min-h-screen flex flex-col bg-[rgb(var(--color-surface))]">
        <Header />
        <main className="flex-1 flex flex-col pt-24">
          <UnderDevelopment
            pageName="Careers"
            description="We're making improvements to our careers section to better serve you. Check back soon for exciting opportunities at Metrosure."
          />
        </main>
        <Footer />
      </div>
    );
  }

  return children;
}
