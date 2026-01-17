import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claims Centre | Metrosure Insurance Brokers",
  description: "Submit and track insurance claims with Metrosure Insurance Brokers. Easy claims process for car, home, life, funeral, and business insurance. Get support when you need it most.",
  openGraph: {
    title: "Claims Centre | Metrosure Insurance Brokers",
    description: "Submit and track insurance claims easily. Our dedicated team is here to help you through the claims process.",
    url: "/claims",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Claims Centre | Metrosure Insurance Brokers",
    description: "Submit and track insurance claims easily. Our dedicated team is here to help you through the claims process.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/claims",
  },
};

export default function ClaimsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
