/**
 * Form Options Data
 *
 * Centralised dropdown options for forms across the site.
 * Ensures consistency for South African-specific data.
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface SelectOption {
  value: string;
  label: string;
}

// =============================================================================
// SOUTH AFRICAN PROVINCES
// =============================================================================

/**
 * Full list of South African provinces
 * Standard value/label format for use in select dropdowns
 */
export const provinces: SelectOption[] = [
  { value: "gauteng", label: "Gauteng" },
  { value: "kwazulu-natal", label: "KwaZulu-Natal" },
  { value: "western-cape", label: "Western Cape" },
  { value: "eastern-cape", label: "Eastern Cape" },
  { value: "free-state", label: "Free State" },
  { value: "limpopo", label: "Limpopo" },
  { value: "mpumalanga", label: "Mpumalanga" },
  { value: "north-west", label: "North West" },
  { value: "northern-cape", label: "Northern Cape" },
];

/**
 * Provinces with "Any Province" option for job applications
 */
export const provincesWithAny: SelectOption[] = [
  ...provinces,
  { value: "any", label: "Any Province" },
];

/**
 * Province labels only (for simple string arrays in partner forms)
 */
export const provinceLabels: string[] = provinces.map((p) => p.label);

// =============================================================================
// BUSINESS TYPES (Partner Forms)
// =============================================================================

export const businessTypes: string[] = [
  "Retail Store",
  "Franchise",
  "Supermarket/Grocery",
  "Furniture Store",
  "Electronics Store",
  "Clothing Store",
  "Wholesale",
  "Other",
];

// =============================================================================
// LOCATION COUNTS (Partner Forms)
// =============================================================================

export const locationCounts: string[] = [
  "1 location",
  "2-5 locations",
  "6-10 locations",
  "11-50 locations",
  "50+ locations",
];

// =============================================================================
// TRAFFIC LEVELS (Partner Forms)
// =============================================================================

export const trafficLevels: string[] = [
  "Under 100 customers/day",
  "100-500 customers/day",
  "500-1000 customers/day",
  "1000+ customers/day",
];

// =============================================================================
// EXPERIENCE LEVELS (Career Forms)
// =============================================================================

export const experienceLevels: SelectOption[] = [
  { value: "none", label: "No Experience" },
  { value: "0-1", label: "Less than 1 year" },
  { value: "1-3", label: "1-3 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "5+", label: "5+ years" },
];

// =============================================================================
// JOB POSITIONS (Career Forms)
// =============================================================================

export const jobPositions: SelectOption[] = [
  { value: "sales-consultant", label: "Sales Consultant" },
  { value: "call-centre-agent", label: "Call Centre Agent" },
  { value: "telesales-rep", label: "Telesales Representative" },
  { value: "client-service-admin", label: "Client Service Administrator" },
  { value: "trainee-sales", label: "Trainee/Entry Level" },
  { value: "other", label: "Other" },
];
