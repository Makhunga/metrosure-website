"use client";

import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// DISABLED - Session 78/79
// AnimatePresence causes visibility bugs with Next.js App Router client-side navigation.
// Pages become invisible (only navbar shows) when navigating via Links.
// Multiple approaches tested (initial={false}, mode="sync") - none work reliably.
// Keeping component as passthrough for future investigation.
export default function PageTransition({ children }: PageTransitionProps) {
  return <>{children}</>;
}
