import type { Metadata } from "next";

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
  return children;
}
