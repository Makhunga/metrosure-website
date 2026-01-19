import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        // ═══════════════════════════════════════════════════════════════════════════
        // PORTAL STATUS VARIANTS
        // Policy & claim status badges with consistent dark mode support
        // ═══════════════════════════════════════════════════════════════════════════
        success:
          "border-transparent bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
        warning:
          "border-transparent bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
        error:
          "border-transparent bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
        info:
          "border-transparent bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
        neutral:
          "border-transparent bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400",
        // ═══════════════════════════════════════════════════════════════════════════
        // TIER BADGES
        // Membership tier indicators with metallic styling
        // ═══════════════════════════════════════════════════════════════════════════
        bronze:
          "border-transparent bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
        silver:
          "border-transparent bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
        gold:
          "border-transparent bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
        platinum:
          "border-transparent bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ═══════════════════════════════════════════════════════════════════════════
// STATUS VARIANT MAPPING
// Maps policy/claim statuses to badge variants for easy lookup
// ═══════════════════════════════════════════════════════════════════════════

export type PolicyStatus = 'active' | 'pending' | 'expired' | 'cancelled' | 'lapsed';
export type ClaimStatus = 'submitted' | 'under_review' | 'approved' | 'rejected' | 'paid' | 'pending_documents';
export type TierStatus = 'bronze' | 'silver' | 'gold' | 'platinum';
export type DocumentStatus = 'approved' | 'rejected' | 'pending';

export const statusVariantMap: Record<PolicyStatus | ClaimStatus | DocumentStatus, VariantProps<typeof badgeVariants>['variant']> = {
  // Policy statuses
  active: 'success',
  pending: 'warning',
  expired: 'neutral',
  cancelled: 'error',
  lapsed: 'neutral',
  // Claim statuses
  submitted: 'info',
  under_review: 'info',
  approved: 'success',
  rejected: 'error',
  paid: 'success',
  pending_documents: 'warning',
};

export const tierVariantMap: Record<TierStatus, VariantProps<typeof badgeVariants>['variant']> = {
  bronze: 'bronze',
  silver: 'silver',
  gold: 'gold',
  platinum: 'platinum',
};

/**
 * Get the appropriate badge variant for a given status
 */
export function getStatusBadgeVariant(
  status: PolicyStatus | ClaimStatus | DocumentStatus
): NonNullable<VariantProps<typeof badgeVariants>['variant']> {
  return statusVariantMap[status] || 'neutral';
}

/**
 * Get the appropriate badge variant for a membership tier
 */
export function getTierBadgeVariant(
  tier: TierStatus
): NonNullable<VariantProps<typeof badgeVariants>['variant']> {
  return tierVariantMap[tier] || 'neutral';
}

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
