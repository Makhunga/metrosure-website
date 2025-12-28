/**
 * Quote Calculator - Real-time premium estimation
 *
 * Note: These are placeholder rates for demonstration purposes.
 * Actual premiums will be provided by underwriters.
 */

export type CoverageType = "home" | "auto" | "life" | "business";

export interface QuoteInput {
  coverageType: CoverageType;
  coverageAmount: number; // In Rands
  deductible: number; // Excess amount in Rands
  additionalCoverage: string[];
  // Optional risk factors (for future enhancement)
  riskFactor?: number; // 0.8 (low risk) to 1.5 (high risk)
}

export interface PriceBreakdown {
  basePremium: number;
  coverageAdjustment: number;
  additionalCoverageTotal: number;
  deductibleDiscount: number;
  subtotal: number;
  vat: number;
  total: number;
  // Individual add-on costs for display
  addOnBreakdown: Array<{ name: string; cost: number }>;
}

export interface TierInfo {
  name: string;
  description: string;
  coverageMultiplier: number;
  price: number;
  popular?: boolean;
  recommended?: boolean;
}

// Base monthly rates per coverage type
const BASE_RATES: Record<CoverageType, number> = {
  home: 350,
  auto: 450,
  life: 250,
  business: 1200,
};

// Rate per R100,000 of coverage
const COVERAGE_MULTIPLIERS: Record<CoverageType, number> = {
  home: 0.12,    // R120 per R100k
  auto: 0.15,    // R150 per R100k
  life: 0.06,    // R60 per R100k
  business: 0.18, // R180 per R100k
};

// Deductible discount percentages
const DEDUCTIBLE_DISCOUNTS: Record<number, number> = {
  0: 0,        // No excess = no discount
  1000: 0,     // R1,000 excess = no discount
  2500: 0.05,  // R2,500 excess = 5% discount
  5000: 0.10,  // R5,000 excess = 10% discount
  10000: 0.15, // R10,000 excess = 15% discount
  15000: 0.18, // R15,000 excess = 18% discount
  20000: 0.20, // R20,000 excess = 20% discount
};

// Additional coverage options with monthly costs
const ADDITIONAL_COVERAGE_COSTS: Record<string, Record<string, { label: string; cost: number }>> = {
  home: {
    flood: { label: "Flood Cover", cost: 85 },
    earthquake: { label: "Earthquake Cover", cost: 65 },
    valuables: { label: "All-Risk Valuables", cost: 120 },
    liability: { label: "Extended Liability", cost: 95 },
    garden: { label: "Garden & Landscaping", cost: 55 },
    geyser: { label: "Geyser Cover", cost: 45 },
  },
  auto: {
    roadside: { label: "Roadside Assistance", cost: 75 },
    rental: { label: "Car Hire Cover", cost: 110 },
    gap: { label: "Gap Insurance", cost: 85 },
    rideshare: { label: "Rideshare Cover", cost: 65 },
    windscreen: { label: "Windscreen Cover", cost: 45 },
    tyres: { label: "Tyre & Rim Cover", cost: 55 },
  },
  life: {
    critical: { label: "Critical Illness", cost: 95 },
    disability: { label: "Disability Cover", cost: 85 },
    accidental: { label: "Accidental Death", cost: 65 },
    child: { label: "Child Cover", cost: 75 },
    funeral: { label: "Funeral Benefit", cost: 55 },
    retrenchment: { label: "Retrenchment Cover", cost: 45 },
  },
  business: {
    cyber: { label: "Cyber Liability", cost: 250 },
    professional: { label: "Professional Indemnity", cost: 350 },
    workers: { label: "Workers Compensation", cost: 280 },
    equipment: { label: "Equipment Breakdown", cost: 180 },
    interruption: { label: "Business Interruption", cost: 320 },
    directors: { label: "Directors & Officers", cost: 220 },
  },
};

/**
 * Get the closest deductible discount
 */
function getDeductibleDiscount(deductible: number): number {
  const sortedDeductibles = Object.keys(DEDUCTIBLE_DISCOUNTS)
    .map(Number)
    .sort((a, b) => b - a);

  for (const threshold of sortedDeductibles) {
    if (deductible >= threshold) {
      return DEDUCTIBLE_DISCOUNTS[threshold];
    }
  }
  return 0;
}

/**
 * Calculate premium breakdown
 */
export function calculatePremium(input: QuoteInput): PriceBreakdown {
  const { coverageType, coverageAmount, deductible, additionalCoverage, riskFactor = 1 } = input;

  // Base premium
  const basePremium = BASE_RATES[coverageType] * riskFactor;

  // Coverage amount adjustment (per R100,000)
  const coverageUnits = coverageAmount / 100000;
  const coverageAdjustment = coverageUnits * COVERAGE_MULTIPLIERS[coverageType] * 100;

  // Calculate additional coverage costs
  const addOnBreakdown: Array<{ name: string; cost: number }> = [];
  let additionalCoverageTotal = 0;

  const availableAddOns = ADDITIONAL_COVERAGE_COSTS[coverageType] || {};
  for (const addOnId of additionalCoverage) {
    const addOn = availableAddOns[addOnId];
    if (addOn) {
      addOnBreakdown.push({ name: addOn.label, cost: addOn.cost });
      additionalCoverageTotal += addOn.cost;
    }
  }

  // Subtotal before discounts
  const subtotalBeforeDiscount = basePremium + coverageAdjustment + additionalCoverageTotal;

  // Deductible discount
  const discountRate = getDeductibleDiscount(deductible);
  const deductibleDiscount = subtotalBeforeDiscount * discountRate;

  // Subtotal after discount
  const subtotal = subtotalBeforeDiscount - deductibleDiscount;

  // VAT (15% in South Africa)
  const vat = subtotal * 0.15;

  // Total
  const total = subtotal + vat;

  return {
    basePremium: Math.round(basePremium),
    coverageAdjustment: Math.round(coverageAdjustment),
    additionalCoverageTotal: Math.round(additionalCoverageTotal),
    deductibleDiscount: Math.round(deductibleDiscount),
    subtotal: Math.round(subtotal),
    vat: Math.round(vat),
    total: Math.round(total),
    addOnBreakdown,
  };
}

/**
 * Get comparison tiers for a coverage type
 */
export function getCoverageTiers(coverageType: CoverageType): TierInfo[] {
  const tierConfigs: Record<CoverageType, { basic: number; standard: number; premium: number }> = {
    home: { basic: 500000, standard: 1000000, premium: 2000000 },
    auto: { basic: 150000, standard: 300000, premium: 500000 },
    life: { basic: 500000, standard: 1000000, premium: 2500000 },
    business: { basic: 1000000, standard: 2500000, premium: 5000000 },
  };

  const config = tierConfigs[coverageType];

  const tiers: TierInfo[] = [
    {
      name: "Basic",
      description: "Essential protection for budget-conscious customers",
      coverageMultiplier: config.basic,
      price: calculatePremium({
        coverageType,
        coverageAmount: config.basic,
        deductible: 2500,
        additionalCoverage: [],
      }).total,
    },
    {
      name: "Standard",
      description: "Balanced coverage for everyday peace of mind",
      coverageMultiplier: config.standard,
      price: calculatePremium({
        coverageType,
        coverageAmount: config.standard,
        deductible: 2500,
        additionalCoverage: [],
      }).total,
      popular: true,
    },
    {
      name: "Premium",
      description: "Comprehensive protection with maximum benefits",
      coverageMultiplier: config.premium,
      price: calculatePremium({
        coverageType,
        coverageAmount: config.premium,
        deductible: 5000,
        additionalCoverage: [],
      }).total,
      recommended: true,
    },
  ];

  return tiers;
}

/**
 * Get available add-ons for a coverage type
 */
export function getAvailableAddOns(coverageType: CoverageType): Array<{
  id: string;
  label: string;
  cost: number;
  description?: string;
}> {
  const addOns = ADDITIONAL_COVERAGE_COSTS[coverageType] || {};
  return Object.entries(addOns).map(([id, data]) => ({
    id,
    label: data.label,
    cost: data.cost,
  }));
}

/**
 * Format currency in South African Rand
 */
export function formatRand(amount: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Get coverage type display label
 */
export function getCoverageLabel(type: CoverageType): string {
  const labels: Record<CoverageType, string> = {
    home: "Home Insurance",
    auto: "Auto Insurance",
    life: "Life & Funeral Cover",
    business: "Business Insurance",
  };
  return labels[type];
}

/**
 * Get coverage type icon
 */
export function getCoverageIcon(type: CoverageType): string {
  const icons: Record<CoverageType, string> = {
    home: "home",
    auto: "directions_car",
    life: "favorite",
    business: "business",
  };
  return icons[type];
}
