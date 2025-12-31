/**
 * Claims page data
 * Centralised data for claim types, process steps, and emergency contacts
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
