/**
 * Centralised Company Information
 * Single source of truth for addresses, contact details, and legal info.
 * Update this file to change company details across the entire website.
 */

// ═══════════════════════════════════════════════════════════════════════════
// HEAD OFFICE
// ═══════════════════════════════════════════════════════════════════════════

export const headOffice = {
  name: "Musgrave",
  fullName: "Metrosure Head Office - Musgrave",
  street: "32 Stephen Dlamini Road",
  area: "Musgrave",
  city: "Durban",
  province: "KwaZulu-Natal",
  postalCode: "4001",
  country: "South Africa",

  // Formatted versions
  get addressLine1() {
    return this.street;
  },
  get addressLine2() {
    return `${this.area}, ${this.city}, ${this.postalCode}`;
  },
  get fullAddress() {
    return `${this.street}, ${this.area}, ${this.city}, ${this.postalCode}`;
  },
  get legalAddress() {
    return `${this.street}, ${this.area}, ${this.city}, ${this.postalCode}, ${this.country}`;
  },

  // Coordinates for maps
  lat: -29.8450,
  lng: 31.0000,
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// CONTACT DETAILS
// ═══════════════════════════════════════════════════════════════════════════

export const contactDetails = {
  phone: {
    display: "+27 31 301 1192",
    raw: "27313011192",
    href: "tel:+27313011192",
  },
  fax: {
    display: "+27 31 301 1193",
    raw: "27313011193",
  },
  whatsapp: {
    display: "+27 67 120 9527",
    raw: "27671209527",
    href: "https://wa.me/27671209527",
  },
  email: {
    general: "info@metrosuregroup.co.za",
    b2b: "clients@metrosureconsult.co.za",
    hr: "hr@metrosureconsult.co.za",
    hrCC: "lazola@metrosureconsult.co.za",
  },
  website: {
    display: "www.metrosuregroup.co.za",
    url: "https://www.metrosuregroup.co.za",
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// LEGAL & COMPLIANCE
// ═══════════════════════════════════════════════════════════════════════════

export const legalInfo = {
  companyName: "Metrosure Insurance Brokers (Pty) Ltd",
  tradingAs: "Metrosure",
  registrationNumber: "2013/118960/07",
  fspNumber: "47089",
  vatNumber: "", // Add when available

  regulator: "Financial Sector Conduct Authority (FSCA)",
  regulatorWebsite: "https://www.fsca.co.za",

  // Information Officer (POPIA)
  informationOfficer: {
    name: "B.G Chiliza",
    email: "info@metrosuregroup.co.za",
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// SOCIAL MEDIA
// ═══════════════════════════════════════════════════════════════════════════

export const socialMedia = {
  facebook: "https://www.facebook.com/profile.php?id=100083163880679",
  linkedin: "https://za.linkedin.com/company/metrosure",
  instagram: "https://www.instagram.com/metrosure_insurance_/",
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// OFFICE LOCATIONS
// ═══════════════════════════════════════════════════════════════════════════

export interface OfficeLocation {
  id: string;
  name: string;
  isHeadOffice: boolean;
  region: string;
  address1: string;
  address2: string;
  phone?: string;
  lat: number;
  lng: number;
}

export const offices: OfficeLocation[] = [
  {
    id: "msg",
    name: "Musgrave (Head Office)",
    isHeadOffice: true,
    region: "Head Office",
    address1: headOffice.street,
    address2: headOffice.addressLine2,
    phone: contactDetails.phone.display,
    lat: headOffice.lat,
    lng: headOffice.lng,
  },
  {
    id: "dbn",
    name: "Durban CBD",
    isHeadOffice: false,
    region: "Durban",
    address1: "391 Anton Lembede Street, Metropolitan Life Building",
    address2: "5th Floor, Durban, 4001",
    phone: contactDetails.phone.display,
    lat: -29.8579,
    lng: 31.0292,
  },
  {
    id: "pmb",
    name: "Pietermaritzburg",
    isHeadOffice: false,
    region: "KwaZulu-Natal",
    address1: "195 Boom Street",
    address2: "Pietermaritzburg, 3201",
    lat: -29.6006,
    lng: 30.3794,
  },
  {
    id: "pta",
    name: "Pretoria",
    isHeadOffice: false,
    region: "Gauteng",
    address1: "325 Church Street and Thabo Sehume, Berlinton Building",
    address2: "Office 318, Pretoria, 0002",
    lat: -25.7479,
    lng: 28.1879,
  },
  {
    id: "jhb",
    name: "Boksburg",
    isHeadOffice: false,
    region: "Johannesburg",
    address1: "183 Bentel Avenue, Unit 13 Jansen Park",
    address2: "Boksburg, 1459",
    lat: -26.2041,
    lng: 28.2639,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export function getHeadOffice(): OfficeLocation {
  return offices.find(o => o.isHeadOffice) || offices[0];
}

export function getOfficeById(id: string): OfficeLocation | undefined {
  return offices.find(o => o.id === id);
}

/**
 * Get formatted address for legal documents
 */
export function getLegalAddress(): string {
  return headOffice.legalAddress;
}

/**
 * Get formatted address for email footers (HTML)
 */
export function getEmailFooterAddress(): string {
  return `${headOffice.street}<br />${headOffice.area}, ${headOffice.city}, ${headOffice.postalCode}`;
}
