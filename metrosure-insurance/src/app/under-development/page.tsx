import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnderDevelopment from "@/components/UnderDevelopment";

export const metadata: Metadata = {
  title: "Under Development | Metrosure Insurance Brokers",
  description: "This page is currently under development. Check back soon for updates.",
};

// Map routes to friendly page names
const routeNames: Record<string, string> = {
  '/insurance/auto': 'Car & Home Insurance',
  '/insurance/home': 'Home Insurance',
  '/insurance/life': 'Life & Funeral Insurance',
  '/insurance/business': 'Business Insurance',
  '/legal': 'Legal Disclosures',
  '/login': 'Client Portal',
};

// Helper to get page name from route
function getPageName(route: string): string {
  // Check static routes first
  if (routeNames[route]) {
    return routeNames[route];
  }
  // Handle career detail pages
  if (route.startsWith('/careers/')) {
    return 'Job Details';
  }
  return 'This Feature';
}

interface PageProps {
  searchParams: Promise<{ from?: string }>;
}

export default async function UnderDevelopmentPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const fromRoute = params.from || '';
  const pageName = getPageName(fromRoute);

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--color-surface))]">
      <Header />
      <main className="flex-1 flex flex-col pt-24">
        <UnderDevelopment pageName={pageName} />
      </main>
      <Footer />
    </div>
  );
}
