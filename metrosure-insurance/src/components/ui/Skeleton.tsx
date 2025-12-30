"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  /** Variant type for the skeleton */
  variant?: "text" | "circle" | "rectangular" | "card";
  /** Width - can be Tailwind class or CSS value */
  width?: string;
  /** Height - can be Tailwind class or CSS value */
  height?: string;
  /** Additional className for customization */
  className?: string;
  /** Number of text lines (only for text variant) */
  lines?: number;
  /** Whether to show animation */
  animate?: boolean;
}

/**
 * Skeleton - Loading placeholder component
 *
 * Matches Metrosure design system with subtle shimmer animation.
 * Uses CSS variables for theme-aware colors.
 *
 * @example
 * // Basic usage
 * <Skeleton variant="text" />
 * <Skeleton variant="circle" width="w-12" height="h-12" />
 * <Skeleton variant="rectangular" width="w-full" height="h-48" />
 *
 * // Card skeleton
 * <Skeleton variant="card" />
 *
 * // Multi-line text
 * <Skeleton variant="text" lines={3} />
 *
 * // Composable card example
 * <div className="p-4 rounded-lg border border-[rgb(var(--color-border-light))]">
 *   <div className="flex gap-4">
 *     <Skeleton variant="circle" width="w-12" height="h-12" />
 *     <div className="flex-1 space-y-2">
 *       <Skeleton variant="text" width="w-1/3" />
 *       <Skeleton variant="text" width="w-2/3" />
 *     </div>
 *   </div>
 * </div>
 */
export function Skeleton({
  variant = "rectangular",
  width,
  height,
  className,
  lines = 1,
  animate = true,
}: SkeletonProps) {
  // Base skeleton styles with shimmer animation
  const baseStyles = cn(
    "bg-[rgb(var(--color-surface-inset))]",
    "relative overflow-hidden",
    animate && "after:absolute after:inset-0 after:translate-x-[-100%] after:animate-[shimmer-slide_1.5s_infinite] after:bg-gradient-to-r after:from-transparent after:via-[rgb(var(--color-surface-elevated)/0.5)] after:to-transparent"
  );

  // Variant-specific styles
  const variantStyles = {
    text: cn(
      baseStyles,
      "h-4 rounded",
      width || "w-full",
      height
    ),
    circle: cn(
      baseStyles,
      "rounded-full",
      width || "w-10",
      height || "h-10"
    ),
    rectangular: cn(
      baseStyles,
      "rounded-lg",
      width || "w-full",
      height || "h-24"
    ),
    card: cn(
      baseStyles,
      "rounded-xl",
      width || "w-full",
      height || "h-48"
    ),
  };

  // For text variant with multiple lines
  if (variant === "text" && lines > 1) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              variantStyles.text,
              // Last line is shorter for natural look
              i === lines - 1 && "w-3/4"
            )}
            style={width && !width.startsWith("w-") ? { width } : undefined}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(variantStyles[variant], className)}
      style={{
        ...(width && !width.startsWith("w-") ? { width } : {}),
        ...(height && !height.startsWith("h-") ? { height } : {}),
      }}
      role="status"
      aria-label="Loading..."
    />
  );
}

/**
 * SkeletonCard - Pre-composed card skeleton
 *
 * Common pattern for loading cards with image, title, and description.
 */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface-card))]",
        className
      )}
    >
      <Skeleton variant="rectangular" height="h-32" className="mb-4" />
      <Skeleton variant="text" width="w-2/3" className="mb-2" />
      <Skeleton variant="text" lines={2} />
    </div>
  );
}

/**
 * SkeletonAvatar - Avatar with text skeleton
 */
export function SkeletonAvatar({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Skeleton variant="circle" width="w-10" height="h-10" />
      <div className="flex-1 space-y-1.5">
        <Skeleton variant="text" width="w-24" height="h-3" />
        <Skeleton variant="text" width="w-16" height="h-2.5" />
      </div>
    </div>
  );
}

/**
 * SkeletonForm - Form skeleton with fields
 */
export function SkeletonForm({
  fields = 3,
  className
}: {
  fields?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-1.5">
          <Skeleton variant="text" width="w-20" height="h-3" />
          <Skeleton variant="rectangular" height="h-10" />
        </div>
      ))}
      <Skeleton variant="rectangular" width="w-32" height="h-10" className="mt-6" />
    </div>
  );
}

/**
 * SkeletonTestimonial - Testimonial card skeleton
 */
export function SkeletonTestimonial({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface-card))]",
        "flex flex-col justify-between h-[300px]",
        className
      )}
    >
      <div>
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} variant="circle" width="w-4" height="h-4" />
          ))}
        </div>
        {/* Quote */}
        <Skeleton variant="text" lines={4} />
      </div>
      {/* Author */}
      <SkeletonAvatar className="mt-4 pt-4 border-t border-[rgb(var(--color-border-light))]" />
    </div>
  );
}

export default Skeleton;
