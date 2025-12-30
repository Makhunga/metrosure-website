import { Metadata } from "next";
import PlaygroundShell from "./PlaygroundShell";

export const metadata: Metadata = {
  title: "Playground | Metrosure",
  robots: "noindex, nofollow",
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PlaygroundShell>{children}</PlaygroundShell>;
}
