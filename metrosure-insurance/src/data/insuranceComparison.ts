/**
 * Insurance Comparison Data
 * Life Cover vs Funeral Cover comparison content
 * Sources: ASISA 2025, MiWayLife, 1Life, FNB Retirement Survey
 */

// =============================================================================
// Types
// =============================================================================

export interface ComparisonRow {
  id: string;
  aspect: string;
  icon: string;
  lifeCover: string;
  funeralCover: string;
  highlight?: "life" | "funeral" | "both";
}

export interface Scenario {
  id: string;
  icon: string;
  title: string;
  situation: string;
  recommendation: "life" | "funeral" | "both";
  recommendationText: string;
  reasoning: string;
}

export interface Statistic {
  id: string;
  value: string;
  label: string;
  description: string;
  source: string;
  sourceUrl: string;
}

export interface Misconception {
  id: string;
  myth: string;
  reality: string;
  icon: string;
}

// =============================================================================
// Comparison Table Data
// =============================================================================

export const comparisonRows: ComparisonRow[] = [
  {
    id: "purpose",
    aspect: "Primary Purpose",
    icon: "target",
    lifeCover: "Long-term financial security - replaces income, settles debts, funds education",
    funeralCover: "Immediate funeral expenses - coffin, burial, ceremony, catering",
    highlight: "both",
  },
  {
    id: "payout",
    aspect: "Typical Payout",
    icon: "payments",
    lifeCover: "R100,000 - R12 million",
    funeralCover: "R5,000 - R50,000",
    highlight: "life",
  },
  {
    id: "speed",
    aspect: "Payout Speed",
    icon: "schedule",
    lifeCover: "5-14 working days",
    funeralCover: "24-48 hours",
    highlight: "funeral",
  },
  {
    id: "waiting",
    aspect: "Waiting Period",
    icon: "hourglass_empty",
    lifeCover: "6-24 months (natural death); immediate (accidental)",
    funeralCover: "6 months (natural death); immediate (accidental)",
  },
  {
    id: "cost",
    aspect: "Monthly Cost",
    icon: "savings",
    lifeCover: "R150 - R1,500+",
    funeralCover: "R50 - R500",
    highlight: "funeral",
  },
  {
    id: "medical",
    aspect: "Medical Requirements",
    icon: "medical_services",
    lifeCover: "Health questions required; medical exams for large amounts",
    funeralCover: "Usually none - simple acceptance",
    highlight: "funeral",
  },
  {
    id: "family",
    aspect: "Family Coverage",
    icon: "family_restroom",
    lifeCover: "Individual (spouse add-on available)",
    funeralCover: "Whole family on one policy - spouse, children, parents, extended",
    highlight: "funeral",
  },
];

// =============================================================================
// Scenario Cards
// =============================================================================

export const scenarios: Scenario[] = [
  {
    id: "breadwinner",
    icon: "home",
    title: "Primary Breadwinner",
    situation: "Main income earner with a bond and children in school",
    recommendation: "both",
    recommendationText: "Both Essential",
    reasoning:
      "Your family needs bond repayment (R1.5m+), income replacement for 10+ years, education funding, AND immediate funeral costs. Life cover handles the big picture; funeral cover prevents scrambling for cash in the first 48 hours.",
  },
  {
    id: "single",
    icon: "person",
    title: "Single Person",
    situation: "Unmarried, no dependents, living at home or renting",
    recommendation: "funeral",
    recommendationText: "Funeral Essential",
    reasoning:
      "Your parents shouldn't bear your funeral costs (R20k-R50k). No mortgage or dependents means smaller life cover needs - but start building it now while premiums are low.",
  },
  {
    id: "retired",
    icon: "elderly",
    title: "Retired Individual",
    situation: "Pension income, adult children, home paid off",
    recommendation: "funeral",
    recommendationText: "Funeral Priority",
    reasoning:
      "No income to replace and no dependents relying on you. Focus on funeral cover (R30k-R100k) to spare your family immediate expenses. Life cover optional for legacy or estate duties.",
  },
  {
    id: "young",
    icon: "school",
    title: "Young Professional",
    situation: "First job, renting, building your career",
    recommendation: "both",
    recommendationText: "Start Smart",
    reasoning:
      "Begin with funeral cover (R100-R200/month) and add life cover while you're young. Lock in low premiums now - they only increase with age. Increase cover as you take on a bond or have children.",
  },
];

// =============================================================================
// Statistics
// =============================================================================

export const statistics: Statistic[] = [
  {
    id: "gap",
    value: "R50.4 trillion",
    label: "SA Insurance Gap",
    description: "South Africa's life and disability insurance shortfall - 7x our entire GDP",
    source: "ASISA Insurance Gap Study 2025",
    sourceUrl: "https://www.asisa.org.za/media-releases/south-africa-s-life-and-disability-insurance-shortfall-widens-to-r504-trillion/",
  },
  {
    id: "shortfall",
    value: "R1.3 million",
    label: "Average Shortfall",
    description: "The gap between what families have (R800k) and what they need (R2.1m)",
    source: "ASISA 2025",
    sourceUrl: "https://www.asisa.org.za/media-releases/south-africa-s-life-and-disability-insurance-shortfall-widens-to-r504-trillion/",
  },
  {
    id: "coverage",
    value: "78% vs 38%",
    label: "Coverage Gap",
    description: "South Africans with funeral cover vs those with life insurance",
    source: "FNB Retirement Survey 2025",
    sourceUrl: "https://www.fnb.co.za/blog/investments/articles/RetirementPlanning-20250620-d/",
  },
  {
    id: "funeral",
    value: "R20k - R84k",
    label: "Funeral Cost Range",
    description: "From basic burial to full service with catering for 50 guests",
    source: "MiWayLife & 1Life 2025",
    sourceUrl: "https://www.miwaylife.co.za/blog/how-much-does-a-funeral-cost-in-2025/",
  },
];

// =============================================================================
// Misconceptions
// =============================================================================

export const misconceptions: Misconception[] = [
  {
    id: "enough",
    myth: "My funeral cover is enough - I don't need life insurance",
    reality:
      "Funeral cover pays R5k-R50k, but the average SA family needs R2.1 million in life cover. Funeral cover handles burial costs; life cover handles the next 10-20 years of your family's financial needs.",
    icon: "warning",
  },
  {
    id: "afford",
    myth: "I can't afford both policies",
    reality:
      "Basic funeral cover costs R100-R200/month; entry-level life cover starts at R150-R300/month. For R300-R500/month total - less than DSTV and streaming - you can have both.",
    icon: "calculate",
  },
  {
    id: "young",
    myth: "I'm young and healthy - I don't need life insurance yet",
    reality:
      "This is exactly when you should buy it. A 25-year-old pays significantly less than a 40-year-old for the same cover. Health issues develop unpredictably. Lock in low premiums now.",
    icon: "trending_up",
  },
  {
    id: "employer",
    myth: "My employer's group life cover is enough",
    reality:
      "Group life typically covers 2-4x your salary. Experts recommend 10-15x. More importantly, group cover ends when you leave your job - you could be uninsurable by then.",
    icon: "business",
  },
];

// =============================================================================
// Page Content
// =============================================================================

export const pageContent = {
  hero: {
    badge: "Insurance Guide",
    title: "Life Cover vs Funeral Cover",
    subtitle: "Understanding the difference could protect your family's future",
  },
  introduction: {
    heading: "Why This Matters",
    text: "Choosing the right insurance isn't just about ticking a box - it's about ensuring your family's financial security when they need it most. Life cover and funeral cover serve fundamentally different purposes, yet many South Africans confuse the two or assume one can replace the other.",
    highlight: {
      value: "39%",
      label: "of needs covered",
      description: "The average SA family would receive only 39% of what they need if the primary earner passed away today.",
    },
  },
  comparison: {
    heading: "Side-by-Side Comparison",
    subheading: "See the key differences at a glance",
  },
  scenarios: {
    heading: "Which Is Right for You?",
    subheading: "Find your situation and see what experts recommend",
  },
  statistics: {
    heading: "The Numbers Don't Lie",
    subheading: "South Africa's insurance reality in 2025",
  },
  misconceptions: {
    heading: "Common Misconceptions",
    subheading: "Don't let these myths leave your family unprotected",
  },
  calculator: {
    heading: "Not sure how much cover you need?",
    text: "Use our free calculator to work out exactly how much life or funeral cover your family needs based on your unique situation.",
    cta: "Try the Calculator",
  },
  finalCta: {
    heading: "The Best Protection? Both.",
    text: "Experts recommend having both life cover AND funeral cover. Life cover secures your family's long-term future; funeral cover ensures they're not scrambling for cash in the first 48 hours. Start with what you can afford and build from there.",
  },
};

// =============================================================================
// Helper Functions
// =============================================================================

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}

export function getStatisticById(id: string): Statistic | undefined {
  return statistics.find((s) => s.id === id);
}

export function getRecommendationColour(recommendation: "life" | "funeral" | "both"): string {
  switch (recommendation) {
    case "life":
      return "bg-blue-500";
    case "funeral":
      return "bg-amber-500";
    case "both":
      return "bg-primary";
    default:
      return "bg-slate-500";
  }
}
