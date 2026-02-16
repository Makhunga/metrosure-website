"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <Sonner
      position="top-center"
      theme={isDark ? "dark" : "light"}
      className="toaster group"
      duration={5000}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "rgb(var(--popover))",
          "--normal-text": "rgb(var(--popover-foreground))",
          "--normal-border": "rgb(var(--border))",
          "--success-bg": isDark ? "#052e16" : "#f0fdf4",
          "--success-text": isDark ? "#86efac" : "#166534",
          "--success-border": isDark ? "#14532d" : "#bbf7d0",
          "--error-bg": isDark ? "#450a0a" : "#fef2f2",
          "--error-text": isDark ? "#fca5a5" : "#991b1b",
          "--error-border": isDark ? "#7f1d1d" : "#fecaca",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
