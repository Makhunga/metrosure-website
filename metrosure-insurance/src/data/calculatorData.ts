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
 * Statistics sourced from ASISA Insurance Gap Study 2025
 */
export const LIFE_COVER_CONSTANTS = {
  /** Amount allocated per dependent for education (ZAR) */
  EDUCATION_FUND_PER_CHILD: 250000,
  /** Emergency fund as multiplier of annual income (0.5 = 6 months) */
  EMERGENCY_FUND_MULTIPLIER: 0.5,
  /** Average SA life cover held (ZAR) - ASISA 2025 */
  AVERAGE_SA_LIFE_COVER: 800000,
  /** Average SA life cover needed (ZAR) - ASISA 2025 */
  AVERAGE_SA_LIFE_COVER_NEEDED: 2100000,
  /** Average SA life cover shortfall (ZAR) - ASISA 2025 */
  AVERAGE_SA_LIFE_COVER_GAP: 1300000,
  /** Total SA insurance gap (ZAR) - ASISA 2025 */
  TOTAL_SA_INSURANCE_GAP: 50400000000000, // R50.4 trillion
  /** Percentage of needs covered - ASISA 2025 */
  COVERAGE_RATIO_PERCENT: 39,
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
 * Cost statistics sourced from 1Life, MiWayLife, Metropolitan 2024/2025
 */
export const FUNERAL_COVER_CONSTANTS = {
  /** Additional member premium multiplier (40% of base) */
  ADDITIONAL_MEMBER_MULTIPLIER: 0.4,
  /** Basic funeral package cost (ZAR) */
  BASIC_FUNERAL_COST: 15000,
  /** Traditional funeral cost (ZAR) */
  TRADITIONAL_FUNERAL_COST: 40000,
  /** Full service funeral with catering (ZAR) */
  FULL_SERVICE_FUNERAL_COST: 84000,
  /** Metropolitan maximum estimate (ZAR) */
  PREMIUM_FUNERAL_COST: 120000,
  /** Minimum funeral cost in SA (ZAR) */
  MIN_FUNERAL_COST: 8000,
  /** Maximum funeral cost in SA (ZAR) */
  MAX_FUNERAL_COST: 120000,
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
 * Calculator page FAQs - Life Cover
 * Enhanced with ASISA 2025 statistics
 */
export const lifeCoverFAQs: CalculatorFAQ[] = [
  {
    question: "How accurate is this calculator?",
    answer:
      "This calculator provides an indicative estimate based on industry-standard formulas and the information you provide. Actual premiums depend on factors like age, health status, smoking habits, occupation, and insurer underwriting criteria. For a personalised quote, speak to one of our advisers.",
  },
  {
    question: "Why do you ask about my dependents?",
    answer:
      "Dependents significantly impact your life cover needs. Each dependent may require ongoing income support, education funding (approximately R250,000 per child through tertiary level), and daily living expenses. The more dependents you have, the higher your coverage should be to maintain their lifestyle.",
  },
  {
    question: "What's included in income replacement?",
    answer:
      "Income replacement covers the years of salary your family would need if you passed away. We calculate this by multiplying your annual income by your chosen support period (typically 5-30 years). This ensures your family can maintain their current standard of living, pay bills, and meet ongoing financial commitments.",
  },
  {
    question: "How much life cover do most South Africans have?",
    answer:
      "According to ASISA's 2025 Insurance Gap Study, the average South African income earner has only R800,000 in life cover—but needs at least R2.1 million. This leaves an average shortfall of R1.3 million per person. Over 60% of families would face financial hardship if the primary earner passed away unexpectedly.",
  },
  {
    question: "Do I need life cover if I have employer group life?",
    answer:
      "Group life benefits from your employer are valuable but often insufficient. They typically provide 2-4 times your annual salary, whereas financial experts recommend 10-15 times. Additionally, group cover ends when you leave your job. A personal policy provides continuous protection regardless of employment status.",
  },
  {
    question: "What happens to my debts when I die?",
    answer:
      "Outstanding debts like home loans, personal loans, and credit cards don't disappear when you pass away. Your estate (and potentially your family) may be responsible for settling these obligations. Life cover can clear these debts, preventing your family from losing assets or facing financial stress.",
  },
];

/**
 * Calculator page FAQs - Funeral Cover
 * Enhanced with 2024/2025 cost statistics
 */
export const funeralCoverFAQs: CalculatorFAQ[] = [
  {
    question: "How much does an average funeral cost in South Africa?",
    answer:
      "Funeral costs in South Africa range widely depending on your choices. A basic burial starts at R8,000-R15,000, while a traditional funeral with catering for 50 guests can cost R70,000-R84,000. Metropolitan estimates many families spend between R23,500 and R120,000 when including tombstones, flowers, and catering.",
  },
  {
    question: "What does funeral cover typically include?",
    answer:
      "Most funeral cover policies provide a lump-sum payout within 24-48 hours of claim submission. This covers funeral parlour fees, coffin or casket, burial plot, hearse, and basic ceremony. Premium plans may include grocery benefits, airtime, and repatriation services. Our plans also include funeral assistance to help with arrangements.",
  },
  {
    question: "Can I cover extended family members?",
    answer:
      "Yes, most funeral policies allow you to add a spouse, children, and parents. Each additional member increases your premium by approximately 40% of the base rate. Children typically receive 50% of the main member's cover amount, while parents receive 75%. This ensures your entire family is protected.",
  },
  {
    question: "Is there a waiting period for funeral cover?",
    answer:
      "Most funeral policies have a waiting period of 6 months for natural death claims. However, accidental death is typically covered immediately from day one. This waiting period helps prevent fraudulent claims and keeps premiums affordable for all policyholders.",
  },
  {
    question: "Why do I need funeral cover if I have savings?",
    answer:
      "While savings can help, they may not be accessible immediately. Banks often freeze accounts upon death notification, and estate processes can take months. Funeral cover pays out within 24-48 hours, ensuring your family can proceed with dignified arrangements without financial stress or delays.",
  },
];

/**
 * Combined FAQs for the calculator page (legacy support)
 */
export const calculatorFAQs: CalculatorFAQ[] = [
  ...lifeCoverFAQs.slice(0, 2),
  ...funeralCoverFAQs.slice(0, 2),
];

/**
 * Educational points about coverage calculation
 * Updated with ASISA 2025 statistics
 */
export const educationalPoints: EducationalPoint[] = [
  {
    icon: "trending_down",
    title: "The R50 Trillion Gap",
    description:
      "South Africa's life insurance gap has widened to R50.4 trillion—that's 7 times our entire GDP. The average family would receive only 39% of what they need if the primary earner passed away today.",
  },
  {
    icon: "savings",
    title: "R1.3 Million Shortfall",
    description:
      "The average South African has R800,000 in life cover but needs R2.1 million. That's a R1.3 million gap that could leave your family struggling to maintain their lifestyle.",
  },
  {
    icon: "family_restroom",
    title: "Your Debts Don't Die",
    description:
      "Outstanding home loans, car finance, and credit cards must still be paid after death. Without adequate life cover, your family may be forced to sell assets or take on debt to settle your estate.",
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
 * Calculator disclaimer text (FSCA-compliant)
 */
export const CALCULATOR_DISCLAIMER = {
  /** Short disclaimer for display near results */
  short:
    "Indicative estimate only. Actual premiums depend on age, health, smoking status, and insurer underwriting. This calculator does not provide financial advice.",
  /** Full disclaimer for footer/legal section */
  full: `This calculator provides indicative estimates only and does not constitute financial advice as defined by the Financial Advisory and Intermediary Services Act (FAIS). Actual premiums are determined through underwriting and depend on factors including age, gender, health status, medical history, smoking status, occupation, and insurer-specific criteria. Results are intended for informational purposes to help you understand your potential coverage needs. For a personalised quote and professional advice, please speak to one of our licensed advisers. Metrosure Insurance Brokers (Pty) Ltd is an authorised Financial Services Provider (FSP 47089).`,
  /** Minimal disclaimer */
  minimal: "Estimates are indicative only. Actual premiums subject to underwriting.",
} as const;

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
 * Updated to reference ASISA 2025 statistics
 */
export function getLifeCoverComparisonText(totalCover: number): string {
  const averageCoverHeld = LIFE_COVER_CONSTANTS.AVERAGE_SA_LIFE_COVER;
  const averageCoverNeeded = LIFE_COVER_CONSTANTS.AVERAGE_SA_LIFE_COVER_NEEDED;

  if (totalCover >= averageCoverNeeded) {
    return `Your recommended cover of R${formatZAR(totalCover)} meets or exceeds the R2.1 million that ASISA recommends for the average income earner. You're taking the right steps to protect your family.`;
  } else if (totalCover > averageCoverHeld) {
    const percentAboveAverage = Math.round(((totalCover - averageCoverHeld) / averageCoverHeld) * 100);
    return `Your recommended cover is ${percentAboveAverage}% higher than what the average South African has (R800,000). However, ASISA research suggests most families need at least R2.1 million.`;
  }
  return `The average South African has only R800,000 in life cover—but needs at least R2.1 million. Consider whether your calculation reflects all your family's needs.`;
}
