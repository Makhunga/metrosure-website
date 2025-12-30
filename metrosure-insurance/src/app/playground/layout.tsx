import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground | Metrosure",
  robots: "noindex, nofollow",
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
