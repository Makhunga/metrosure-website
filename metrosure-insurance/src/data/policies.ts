/**
 * Policies page data
 * Centralised data for policy features and sample policies (UI mockup)
 */

// =============================================================================
// Types
// =============================================================================

export interface PolicyFeature {
  icon: string;
  title: string;
  description: string;
}

export interface SamplePolicy {
  type: string;
  icon: string;
  policyNumber: string;
  status: string;
  statusColour: string;
  insurer: string;
  renewalDate: string;
  premium: string;
}

// =============================================================================
// Data
// =============================================================================

export const policyFeatures: PolicyFeature[] = [
  {
    icon: "visibility",
    title: "View All Policies",
    description: "See all your insurance policies in one place",
  },
  {
    icon: "receipt_long",
    title: "Download Documents",
    description: "Access policy schedules, certificates, and invoices",
  },
  {
    icon: "edit_note",
    title: "Request Changes",
    description: "Update your details or modify your cover",
  },
  {
    icon: "payments",
    title: "Payment History",
    description: "Track your premium payments and invoices",
  },
  {
    icon: "notifications",
    title: "Renewal Alerts",
    description: "Never miss a renewal date with automatic reminders",
  },
  {
    icon: "support_agent",
    title: "Direct Support",
    description: "Chat with your portfolio manager instantly",
  },
];

/**
 * Sample policy data for UI mockup
 * These are placeholder values shown behind the login wall
 */
export const samplePolicies: SamplePolicy[] = [
  {
    type: "Car Insurance",
    icon: "directions_car",
    policyNumber: "AUTO-2024-XXXXX",
    status: "Active",
    statusColour: "bg-green-500",
    insurer: "King Price Insurance",
    renewalDate: "15 Mar 2026",
    premium: "R 1,250.00",
  },
  {
    type: "Home Insurance",
    icon: "home",
    policyNumber: "HOME-2024-XXXXX",
    status: "Active",
    statusColour: "bg-green-500",
    insurer: "MiWay",
    renewalDate: "22 Jun 2026",
    premium: "R 850.00",
  },
  {
    type: "Life Cover",
    icon: "favorite",
    policyNumber: "LIFE-2023-XXXXX",
    status: "Active",
    statusColour: "bg-green-500",
    insurer: "Liberty",
    renewalDate: "01 Jan 2027",
    premium: "R 450.00",
  },
];

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get a policy feature by its title
 */
export function getFeatureByTitle(title: string): PolicyFeature | undefined {
  return policyFeatures.find((feature) =>
    feature.title.toLowerCase() === title.toLowerCase()
  );
}

/**
 * Get total number of policy features
 */
export function getFeatureCount(): number {
  return policyFeatures.length;
}

/**
 * Get total number of sample policies (for mockup)
 */
export function getSamplePolicyCount(): number {
  return samplePolicies.length;
}
