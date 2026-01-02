"use client";

import { useEffect, useState } from "react";

/**
 * Tawk.to API interface
 * @see https://developer.tawk.to/jsapi/
 */
interface TawkAPI {
  onLoad?: () => void;
  onStatusChange?: (status: string) => void;
  onBeforeLoad?: () => void;
  onChatMaximized?: () => void;
  onChatMinimized?: () => void;
  onChatHidden?: () => void;
  onChatStarted?: () => void;
  onChatEnded?: () => void;
  hideWidget?: () => void;
  showWidget?: () => void;
  toggle?: () => void;
  popup?: () => void;
  maximize?: () => void;
  minimize?: () => void;
  getWindowType?: () => string;
  getStatus?: () => string;
  isChatMaximized?: () => boolean;
  isChatMinimized?: () => boolean;
  isChatHidden?: () => boolean;
  isChatOngoing?: () => boolean;
  isVisitorEngaged?: () => boolean;
  setAttributes?: (
    attributes: Record<string, string>,
    callback?: (error?: Error) => void
  ) => void;
  addEvent?: (
    event: string,
    metadata?: Record<string, string>,
    callback?: (error?: Error) => void
  ) => void;
  addTags?: (tags: string[], callback?: (error?: Error) => void) => void;
  removeTags?: (tags: string[], callback?: (error?: Error) => void) => void;
}

declare global {
  interface Window {
    Tawk_API?: TawkAPI;
    Tawk_LoadStart?: Date;
  }
}

interface TawkToChatProps {
  /** Tawk.to Property ID */
  propertyId: string;
  /** Tawk.to Widget ID (defaults to "default") */
  widgetId?: string;
}

/**
 * TawkToChat - Loads Tawk.to live chat widget
 *
 * This component handles the dynamic loading of the Tawk.to chat widget script.
 * It uses hydration-safe patterns to prevent SSR issues in Next.js.
 *
 * @example
 * <TawkToChat
 *   propertyId="6957e95179755a19831386b8"
 *   widgetId="1jdvmepqi"
 * />
 */
export default function TawkToChat({
  propertyId,
  widgetId = "default",
}: TawkToChatProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Mark as hydrated after initial client render
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Load Tawk.to script after hydration
  useEffect(() => {
    if (!isHydrated) return;

    // Prevent duplicate script injection
    if (window.Tawk_API) return;

    // Initialise Tawk.to globals
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Create and inject script
    const script = document.createElement("script");
    script.id = "tawkto-script";
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    // Append to body (Tawk.to recommends body over head)
    document.body.appendChild(script);

    // Cleanup on unmount (rare in production but good practice)
    return () => {
      const existingScript = document.getElementById("tawkto-script");
      if (existingScript?.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, [isHydrated, propertyId, widgetId]);

  // Widget renders via Tawk.to's own DOM manipulation
  return null;
}
