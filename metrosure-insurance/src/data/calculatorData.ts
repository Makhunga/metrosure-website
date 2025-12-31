/**
 * Coverage Calculator data
 * Centralised data for life and funeral cover calculators
 */

// =============================================================================
// Types
// =============================================================================

export interface FamilyMember {
  id: string;
  label: string;
  icon: string;
  /** Multiplier for cover amount (1 = full, 0.5 = half, etc.) */
  coverMultiplier: number;
}

export interface FuneralTier {
  id: string;
  name: string;
  description: string;
  coverAmount: number;
  basePremium: number;
  isPopular?: boolean;
}

export interface CalculatorTab {
  id: "life" | "funeral";
  label: string;
  icon: string;
  description: string;
}

export interface CalculatorFAQ {
  question: string;
  answer: string;
}

export interface EducationalPoint {
  icon: string;
  title: string;
  description: string;
}

// =============================================================================
// Constants
// =============================================================================

/**
 * Life cover calculator constants
 */
export const LIFE_COVER_CONSTANTS = {
  /** Amount allocated per dependent for education (ZAR) */
  EDUCATION_FUND_PER_CHILD: 250000,
  /** Emergency fund as multiplier of annual income (0.5 = 6 months) */
  EMERGENCY_FUND_MULTIPLIER: 0.5,
  /** Average SA life cover for comparison (ZAR) */
  AVERAGE_SA_LIFE_COVER: 1500000,
  /** Rough premium estimate: ZAR per R1000 cover */
  PREMIUM_PER_THOUSAND: 1,
  /** Minimum years of support */
  MIN_YEARS_SUPPORT: 5,
  /** Maximum years of support */
  MAX_YEARS_SUPPORT: 30,
  /** Default years of support */
  DEFAULT_YEARS_SUPPORT: 10,
  /** Maximum dependents */
  MAX_DEPENDENTS: 10,
} as const;

/**
 * Funeral cover calculator constants
 */
export const FUNERAL_COVER_CONSTANTS = {
  /** Additional member premium multiplier (40% of base) */
  ADDITIONAL_MEMBER_MULTIPLIER: 0.4,
  /** Minimum funeral cost in SA (ZAR) */
  MIN_FUNERAL_COST: 15000,
  /** Maximum funeral cost in SA (ZAR) */
  MAX_FUNERAL_COST: 50000,
} as const;

// =============================================================================
// Data
// =============================================================================

/**
 * Family members for funeral cover selection
 */
export const familyMembers: FamilyMember[] = [
  { id: "self", label: "Yourself", icon: "person", coverMultiplier: 1 },
  { id: "spouse", label: "Spouse", icon: "favorite", coverMultiplier: 1 },
  { id: "children", label: "Children", icon: "child_care", coverMultiplier: 0.5 },
  { id: "parents", label: "Parents", icon: "elderly", coverMultiplier: 0.75 },
];

/**
 * Funeral ceremony tiers
 */
export const funeralTiers: FuneralTier[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Essential funeral expenses",
    coverAmount: 15000,
    basePremium: 99,
  },
  {
    id: "standard",
    name: "Standard",
    description: "Dignified send-off with catering",
    coverAmount: 30000,
    basePremium: 199,
    isPopular: true,
  },
  {
    id: "premium",
    name: "Premium",
    description: "Comprehensive memorial service",
    coverAmount: 50000,
    basePremium: 349,
  },
];

/**
 * Calculator tab configuration
 */
export const calculatorTabs: CalculatorTab[] = [
  {
    id: "life",
    label: "Life Cover",
    icon: "favorite",
    description: "Calculate how much life insurance you need to protect your family",
  },
  {
    id: "funeral",
    label: "Funeral Cover",
    icon: "sentiment_satisfied",
    description: "Find the right funeral plan to honour your loved ones",
  },
];

/**
 * Calculator page FAQs
 */
export const calculatorFAQs: CalculatorFAQ[] = [
  {
    question: "How accurate is this calculator?",
    answer:
      "Our calculator uses industry-standard formulas to provide a reliable estimate. However, your final premium will depend on factors like age, health, and specific policy terms. This tool gives you a solid starting point for conversations with our advisors.",
  },
  {
    question: "Why do you ask about dependents?",
    answer:
      "Each dependent represents additional financial responsibility. We allocate R250,000 per dependent for education and living expenses. This ensures your family can maintain their lifestyle and educational goals.",
  },
  {
    question: "What's included in the income replacement calculation?",
    answer:
      "We multiply your annual income by the number of years you want your family supported. This covers daily expenses, bills, and maintaining your family's standard of living.",
  },
  {
    question: "Do I need to provide personal details?",
    answer:
      "No. This calculator is completely anonymous. You only need to enter financial figures to get your estimate. Personal details are only required when you request an actual quote.",
  },
];

/**
 * Educational points about coverage calculation
 */
export const educationalPoints: EducationalPoint[] = [
  {
    icon: "trending_down",
    title: "Avoid Under-Insurance",
    description:
      "Most South Africans are under-insured. The average life cover is R1.5 million, but many families need 3-5x more based on their circumstances.",
  },
  {
    icon: "savings",
    title: "Don't Overpay",
    description:
      "Over-insurance means wasted premiums every month. Our calculator helps you find the right balance between protection and affordability.",
  },
  {
    icon: "family_restroom",
    title: "Protect Your Family",
    description:
      "Know exactly what your loved ones need if the unexpected happens. Cover income replacement, debts, education, and daily expenses.",
  },
];

/**
 * Hero key points
 */
export const heroKeyPoints = [
  { icon: "timer", text: "Takes 2 minutes" },
  { icon: "lock", text: "No personal details required" },
  { icon: "verified", text: "Expert-backed formulas" },
];

/**
 * Funeral plan benefits shown in results
 */
export const funeralPlanBenefits: string[] = [
  "24-hour claims payout",
  "No waiting period for accidental death",
  "Funeral assistance services included",
];

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get a funeral tier by its ID
 */
export function getFuneralTierById(id: string): FuneralTier | undefined {
  return funeralTiers.find((tier) => tier.id === id);
}

/**
 * Get a family member by their ID
 */
export function getFamilyMemberById(id: string): FamilyMember | undefined {
  return familyMembers.find((member) => member.id === id);
}

/**
 * Get the popular funeral tier
 */
export function getPopularFuneralTier(): FuneralTier | undefined {
  return funeralTiers.find((tier) => tier.isPopular);
}

/**
 * Format currency for display (ZAR)
 */
export function formatZAR(amount: number): string {
  return amount.toLocaleString("en-ZA");
}

/**
 * Calculate comparison text for life cover
 */
export function getLifeCoverComparisonText(totalCover: number): string {
  const averageCover = LIFE_COVER_CONSTANTS.AVERAGE_SA_LIFE_COVER;
  if (totalCover > averageCover) {
    const percentHigher = Math.round(((totalCover - averageCover) / averageCover) * 100);
    return `Your recommended cover is ${percentHigher}% higher than the average South African life cover of R1.5 million. This accounts for your specific financial responsibilities.`;
  }
  return "The average South African has R1.5 million in life cover. Your calculation considers your unique financial situation.";
}
