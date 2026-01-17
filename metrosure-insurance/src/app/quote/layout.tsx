import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote | Metrosure Insurance Brokers",
  description: "Get a free insurance quote from Metrosure Insurance Brokers. Car, home, life, funeral, and business insurance with real-time pricing. No obligations, instant estimates.",
  openGraph: {
    title: "Get a Quote | Metrosure Insurance Brokers",
    description: "Get a free insurance quote with real-time pricing. Car, home, life, funeral, and business insurance. No obligations, instant estimates.",
    url: "/quote",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get a Quote | Metrosure Insurance Brokers",
    description: "Get a free insurance quote with real-time pricing. Car, home, life, funeral, and business insurance. No obligations, instant estimates.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/quote",
  },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
