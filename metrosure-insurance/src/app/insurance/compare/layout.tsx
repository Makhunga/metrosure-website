import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Life Cover vs Funeral Cover - Which Do You Need? | Metrosure Insurance Brokers",
  description:
    "Understand the key differences between life insurance and funeral cover in South Africa. Compare payouts, costs, waiting periods, and find which protection is right for your family. Expert guidance from Metrosure (FSP 47089).",
  openGraph: {
    title: "Life Cover vs Funeral Cover - Which Do You Need?",
    description:
      "Compare life insurance and funeral cover side-by-side. Find out which protection your family needs with our expert guide.",
    type: "article",
  },
  keywords: [
    "life cover vs funeral cover",
    "life insurance South Africa",
    "funeral cover comparison",
    "insurance comparison",
    "life insurance vs funeral policy",
    "which insurance do I need",
    "Metrosure insurance",
  ],
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
