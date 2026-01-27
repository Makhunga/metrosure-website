/**
 * Claims page data
 * Centralised data for claim types, process steps, emergency contacts, and FAQs
 */

// =============================================================================
// Types
// =============================================================================

export interface ClaimType {
  id: string;
  icon: string;
  title: string;
  description: string;
  documents: string[];
}

export interface ClaimStep {
  number: string;
  icon: string;
  title: string;
  description: string;
}

export interface EmergencyContact {
  icon: string;
  title: string;
  number: string;
  description: string;
}

export interface ClaimsFAQ {
  question: string;
  answer: string;
}

// =============================================================================
// Data
// =============================================================================

export const claimTypes: ClaimType[] = [
  {
    id: "auto",
    icon: "directions_car",
    title: "Car Insurance",
    description: "Accidents, theft, or damage to your vehicle",
    documents: [
      "Copy of your ID document",
      "Police case number (if applicable)",
      "Photos of damage",
      "Accident report form",
      "Quote for repairs",
    ],
  },
  {
    id: "home",
    icon: "home",
    title: "Home Insurance",
    description: "Property damage, theft, or liability claims",
    documents: [
      "Copy of your ID document",
      "Police case number (for theft/burglary)",
      "Photos of damage or missing items",
      "List of items claimed with values",
      "Proof of ownership (receipts, photos)",
    ],
  },
  {
    id: "life",
    icon: "favorite",
    title: "Life & Funeral",
    description: "Death, disability, or funeral cover claims",
    documents: [
      "Certified copy of death certificate",
      "Certified copy of deceased's ID",
      "Certified copy of claimant's ID",
      "Bank statement (for payment)",
      "Completed claim form",
    ],
  },
  {
    id: "business",
    icon: "business",
    title: "Business Insurance",
    description: "Commercial property, liability, or fleet claims",
    documents: [
      "Company registration documents",
      "Incident report",
      "Police case number (if applicable)",
      "Photos and evidence of loss",
      "Supporting financial documents",
    ],
  },
];

export const claimSteps: ClaimStep[] = [
  {
    number: "01",
    icon: "phone_in_talk",
    title: "Report Your Claim",
    description: "Contact us immediately to report your incident. Have your policy number ready.",
  },
  {
    number: "02",
    icon: "description",
    title: "Gather Documents",
    description: "Collect all required documents based on your claim type. We'll guide you.",
  },
  {
    number: "03",
    icon: "upload_file",
    title: "Submit Documentation",
    description: "Send your documents to us via email or bring them to our nearest office.",
  },
  {
    number: "04",
    icon: "fact_check",
    title: "Assessment",
    description: "The insurer assesses your claim. We advocate on your behalf throughout.",
  },
  {
    number: "05",
    icon: "payments",
    title: "Settlement",
    description: "Once approved, your claim is settled according to your policy terms.",
  },
];

export const emergencyContacts: EmergencyContact[] = [
  {
    icon: "local_police",
    title: "Police",
    number: "10111",
    description: "Report theft, accidents, or criminal incidents",
  },
  {
    icon: "local_hospital",
    title: "Ambulance",
    number: "10177",
    description: "Medical emergencies",
  },
  {
    icon: "local_fire_department",
    title: "Fire",
    number: "10111",
    description: "Fire emergencies",
  },
];

export const claimsFAQs: ClaimsFAQ[] = [
  {
    question: "How do I file an insurance claim?",
    answer:
      "To file a claim: 1) Contact us immediately on +27 31 301 1192 or email claims@metrosuregroup.co.za. 2) Have your policy number, ID, and incident details ready. 3) We'll guide you through the specific documents needed. 4) We submit your claim to the insurer and follow up on your behalf. For emergencies, most insurers have 24-hour claims lines.",
  },
  {
    question: "What documents do I need for a claim?",
    answer:
      "Required documents vary by claim type. Generally you'll need: certified copy of your ID, proof of ownership/value, police report (for theft/accidents), death certificate (for life/funeral claims), medical reports (for disability claims), and photos of damage (for property claims). Your portfolio manager will provide a specific checklist based on your claim.",
  },
  {
    question: "How long does a claim take to process?",
    answer:
      "Claim timelines vary by type and complexity. Funeral claims typically pay out within 24-48 hours. Motor claims for minor damage take 5-10 working days. Life insurance claims usually take 5-14 working days. Complex or disputed claims may take longer. We follow up regularly with insurers and keep you updated throughout the process.",
  },
  {
    question: "What if my claim is rejected?",
    answer:
      "If your claim is rejected, we'll explain the reasons and explore your options. You have the right to dispute the decision through the insurer's internal complaints process. If unresolved, you can escalate to the Ombudsman for Short-term Insurance (OSTI) or Long-term Insurance Ombudsman (free service). We can guide you through the appeals process.",
  },
  {
    question: "Will making a claim affect my premium?",
    answer:
      "Claims can affect future premiums, but not always. Insurers consider claim frequency and type. A single claim usually has minimal impact. Multiple claims in a short period may increase premiums or affect your no-claim bonus. We can advise whether a small claim is worth lodging versus paying excess and preserving your claims record.",
  },
  {
    question: "What happens if I miss a premium payment during a claim?",
    answer:
      "If you have an active claim and miss a premium, contact us immediately. Most policies have a grace period of 30-31 days. If your policy lapses during a claim, it could affect the outcome. We can help arrange payment plans or explore options to keep your cover active while your claim is being processed.",
  },
];

// SEO metadata for claims page
export const claimsSEO = {
  title: "File an Insurance Claim",
  description:
    "Need to file an insurance claim? Metrosure's dedicated claims team guides you through every step. Car, home, life, funeral, and business claims assessed quickly and fairly by our partner insurers.",
  keywords: [
    "insurance claim South Africa",
    "file insurance claim",
    "claims process",
    "car insurance claim",
    "home insurance claim",
    "life insurance claim",
    "funeral claim",
    "business insurance claim",
    "Metrosure claims",
  ],
};

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get a claim type by its ID
 */
export function getClaimTypeById(id: string): ClaimType | undefined {
  return claimTypes.find((type) => type.id === id);
}

/**
 * Get a claim type by its title
 */
export function getClaimTypeByTitle(title: string): ClaimType | undefined {
  return claimTypes.find((type) => type.title.toLowerCase() === title.toLowerCase());
}

/**
 * Get the total number of claim types
 */
export function getClaimTypeCount(): number {
  return claimTypes.length;
}

/**
 * Get the total number of claim steps
 */
export function getClaimStepCount(): number {
  return claimSteps.length;
}
