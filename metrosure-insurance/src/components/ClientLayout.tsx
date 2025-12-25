"use client";

import { ReactNode } from "react";
import { ScrollProgressLine } from "./animations";
import PageTransition from "./PageTransition";
import PageWipe from "./PageWipe";

interface ClientLayoutProps {
  children: ReactNode;
}

// Toggle between transition styles:
// - "wipe": Dramatic brand-red screen wipe
// - "fade": Smooth blur + fade transition
// - "both": Wipe overlay + fade content transition
const TRANSITION_STYLE: "wipe" | "fade" | "both" = "both";

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <ScrollProgressLine color="rgb(191, 6, 3)" />

      {/* Page wipe overlay transition */}
      {(TRANSITION_STYLE === "wipe" || TRANSITION_STYLE === "both") && (
        <PageWipe />
      )}

      {/* Content with blur/fade transition */}
      {(TRANSITION_STYLE === "fade" || TRANSITION_STYLE === "both") ? (
        <PageTransition>
          {children}
        </PageTransition>
      ) : (
        children
      )}
    </>
  );
}
