"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Toaster as Sonner, toast, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <Sonner
      position="top-center"
      theme={isDark ? "dark" : "light"}
      className="toaster group"
      richColors
      duration={7000}
      icons={{
        success: <CircleCheckIcon className="size-5" />,
        info: <InfoIcon className="size-5" />,
        warning: <TriangleAlertIcon className="size-5" />,
        error: <OctagonXIcon className="size-5" />,
        loading: <Loader2Icon className="size-5 animate-spin" />,
      }}
      toastOptions={{
        className: "text-sm md:text-base !py-4 !px-5",
      }}
      style={
        {
          "--normal-bg": "rgb(var(--popover))",
          "--normal-text": "rgb(var(--popover-foreground))",
          "--normal-border": "rgb(var(--border))",
          "--success-bg": "#16a34a",
          "--success-text": "#ffffff",
          "--success-border": "#15803d",
          "--error-bg": "#dc2626",
          "--error-text": "#ffffff",
          "--error-border": "#b91c1c",
          "--width": "400px",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster, toast }
