/**
 * Insurance Partners Data
 *
 * Centralised data for the PartnerLogos component on the homepage.
 * Partners with logos display images; others show styled text names.
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type PartnerCategory = "life" | "short-term" | "medical" | "retail";

export interface InsurancePartner {
  id: string;
  name: string;
  category: PartnerCategory;
  logo?: string; // Optional - path to logo image
  description?: string; // Optional - shown on hover tooltip
  priority: number; // Lower = higher priority for display order
}

// =============================================================================
// PARTNER DATA
// =============================================================================

/**
 * All insurance partners sorted by priority
 * Partners with logo field display images; others show text names
 */
export const insurancePartners: InsurancePartner[] = [
  // Life & Investments - with logos
  {
    id: "discovery",
    name: "Discovery",
    category: "life",
    logo: "/images/partners/discovery.png",
    description: "Discovery Limited",
    priority: 1,
  },
  {
    id: "sanlam",
    name: "Sanlam",
    category: "life",
    logo: "/images/partners/sanlam.png",
    description: "Sanlam Limited",
    priority: 2,
  },
  {
    id: "old-mutual",
    name: "Old Mutual",
    category: "life",
    logo: "/images/partners/old-mutual.png",
    description: "Old Mutual Limited",
    priority: 3,
  },
  {
    id: "momentum",
    name: "Momentum",
    category: "life",
    logo: "/images/partners/momentum.png",
    description: "Momentum Metropolitan",
    priority: 4,
  },
  {
    id: "metropolitan",
    name: "Metropolitan",
    category: "life",
    logo: "/images/partners/metropolitan.png",
    description: "Metropolitan Life",
    priority: 5,
  },
  {
    id: "pps",
    name: "PPS",
    category: "life",
    logo: "/images/partners/pps.png",
    description: "Professional Provident Society",
    priority: 6,
  },
  {
    id: "brightrock",
    name: "BrightRock",
    category: "life",
    logo: "/images/partners/brightrock.png",
    description: "BrightRock Life",
    priority: 7,
  },
  {
    id: "allan-gray",
    name: "Allan Gray",
    category: "life",
    logo: "/images/partners/allan-gray.png",
    description: "Allan Gray Investments",
    priority: 8,
  },
  {
    id: "1life",
    name: "1Life",
    category: "life",
    logo: "/images/partners/1life.png",
    description: "1Life Insurance",
    priority: 9,
  },
  {
    id: "avbob",
    name: "AVBOB",
    category: "life",
    logo: "/images/partners/avbob.png",
    description: "AVBOB Mutual Assurance",
    priority: 10,
  },
  {
    id: "liberty",
    name: "Liberty",
    category: "life",
    description: "Liberty Group",
    priority: 11,
  },

  // Short-Term Insurance - with logos
  {
    id: "miway",
    name: "MiWay",
    category: "short-term",
    logo: "/images/partners/miway.png",
    description: "MiWay Insurance",
    priority: 12,
  },
  {
    id: "auto-general",
    name: "Auto & General",
    category: "short-term",
    logo: "/images/partners/auto-general.png",
    description: "Auto & General Insurance",
    priority: 13,
  },
  {
    id: "momentum-insure",
    name: "Momentum Insure",
    category: "short-term",
    logo: "/images/partners/momentum-insure.png",
    description: "Momentum Short-term",
    priority: 14,
  },
  {
    id: "1st-for-women",
    name: "1st for Women",
    category: "short-term",
    logo: "/images/partners/1st-for-women.png",
    description: "1st for Women Insurance",
    priority: 15,
  },
  {
    id: "dotsure",
    name: "Dotsure",
    category: "short-term",
    logo: "/images/partners/dotsure.png",
    description: "Dotsure Insurance",
    priority: 16,
  },
  {
    id: "absa",
    name: "Absa",
    category: "short-term",
    logo: "/images/partners/absa.png",
    description: "Absa Insurance",
    priority: 17,
  },
  {
    id: "king-price",
    name: "King Price",
    category: "short-term",
    description: "King Price Insurance",
    priority: 18,
  },
  {
    id: "hollard",
    name: "Hollard",
    category: "short-term",
    description: "Hollard Insurance",
    priority: 19,
  },
  {
    id: "budget-insurance",
    name: "Budget Insurance",
    category: "short-term",
    priority: 20,
  },
  {
    id: "virseker",
    name: "Virseker",
    category: "short-term",
    priority: 21,
  },

  // Medical Aid - with logos
  {
    id: "bonitas",
    name: "Bonitas",
    category: "medical",
    logo: "/images/partners/bonitas.png",
    description: "Bonitas Medical Fund",
    priority: 22,
  },
  {
    id: "essentialmed",
    name: "EssentialMED",
    category: "medical",
    logo: "/images/partners/essentialmed.png",
    description: "EssentialMED Medical Scheme",
    priority: 23,
  },
  {
    id: "discovery-health",
    name: "Discovery Health",
    category: "medical",
    description: "Discovery Health Medical Scheme",
    priority: 24,
  },
  {
    id: "momentum-medical",
    name: "Momentum Medical",
    category: "medical",
    priority: 25,
  },
  {
    id: "medshield",
    name: "Medshield",
    category: "medical",
    priority: 26,
  },

  // Retail B2B Partners
  {
    id: "tfg",
    name: "TFG",
    category: "retail",
    logo: "/images/partners/tfg.svg",
    description: "The Foschini Group",
    priority: 27,
  },
  {
    id: "bolttech",
    name: "Bolttech",
    category: "retail",
    logo: "/images/partners/bolttech.svg",
    description: "Embedded Insurance",
    priority: 28,
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get all partners sorted by priority
 */
export function getSortedPartners(): InsurancePartner[] {
  return [...insurancePartners].sort((a, b) => a.priority - b.priority);
}

/**
 * Get partners that have logos
 */
export function getPartnersWithLogos(): InsurancePartner[] {
  return insurancePartners.filter((p) => p.logo);
}

/**
 * Get partners by category
 */
export function getPartnersByCategory(
  category: PartnerCategory
): InsurancePartner[] {
  return insurancePartners.filter((p) => p.category === category);
}

/**
 * Get a partner by ID
 */
export function getPartnerById(id: string): InsurancePartner | undefined {
  return insurancePartners.find((p) => p.id === id);
}

/**
 * Get total partner count
 */
export function getPartnerCount(): number {
  return insurancePartners.length;
}

/**
 * Get count of partners with logos
 */
export function getLogoCount(): number {
  return getPartnersWithLogos().length;
}
