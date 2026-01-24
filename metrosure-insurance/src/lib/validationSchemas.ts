/**
 * Zod validation schemas for API routes
 * Server-side validation with type-safe schemas
 */

import { z } from "zod";

// ============================================
// SHARED VALIDATORS
// ============================================

// Field length limits (prevents DoS and database issues)
const LIMITS = {
  NAME: 100,           // Personal names
  COMPANY_NAME: 200,   // Company/organisation names
  SUBJECT: 200,        // Email subjects, topics
  JOB_TITLE: 100,      // Job titles
  CITY: 100,           // City names
  INDUSTRY: 100,       // Industry names
  SHORT_TEXT: 500,     // Short free-text fields (otherReason, currentBenefits)
  MESSAGE: 2000,       // Long-form messages
  AREA_CODE: 10,       // Postal/area codes
  PHONE: 20,           // Phone numbers (with formatting)
} as const;

// SA phone format: +27, 0, or just digits (min 10 digits)
const saPhoneRegex = /^(\+27|0)?[0-9]{9,}$/;

export const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .max(LIMITS.PHONE, `Phone number must be ${LIMITS.PHONE} characters or less`)
  .transform((val) => val.replace(/[\s\-\(\)]/g, "")) // Strip formatting
  .refine((val) => val.length >= 10, "Phone number must be at least 10 digits")
  .refine((val) => saPhoneRegex.test(val), "Please enter a valid SA phone number");

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .max(254, "Email address is too long") // RFC 5321
  .email("Please enter a valid email address");

export const requiredString = (fieldName: string, maxLength: number = LIMITS.NAME) =>
  z.string()
    .min(1, `${fieldName} is required`)
    .max(maxLength, `${fieldName} must be ${maxLength} characters or less`)
    .trim();

export const optionalString = (maxLength: number = LIMITS.SHORT_TEXT) =>
  z.string()
    .max(maxLength, `Must be ${maxLength} characters or less`)
    .optional()
    .default("");

// Message field with character limit (2000 chars)
export const messageSchema = z
  .string()
  .max(LIMITS.MESSAGE, `Message must be ${LIMITS.MESSAGE} characters or less`)
  .optional()
  .default("");

export const requiredMessageSchema = z
  .string()
  .min(1, "Message is required")
  .max(LIMITS.MESSAGE, `Message must be ${LIMITS.MESSAGE} characters or less`);

// Export limits for use in form components (maxLength prop)
export { LIMITS };

// Future date validation
export const futureDateSchema = z
  .string()
  .min(1, "Date is required")
  .refine((dateStr) => {
    const selectedDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, "Date must be today or in the future");

// ============================================
// CONTACT FORM SCHEMAS
// ============================================

const contactFormBase = z.object({
  name: requiredString("Name", LIMITS.NAME),
  email: emailSchema.optional().default(""),
  companyName: optionalString(LIMITS.COMPANY_NAME),
});

export const contactMessageSchema = contactFormBase.extend({
  type: z.literal("message"),
  email: emailSchema,
  subject: requiredString("Subject", LIMITS.SUBJECT),
  message: requiredMessageSchema,
});

export const contactCallbackSchema = contactFormBase.extend({
  type: z.literal("callback"),
  phone: phoneSchema,
  reason: requiredString("Reason", LIMITS.SUBJECT),
  otherReason: optionalString(LIMITS.SHORT_TEXT),
  preferredDate: requiredString("Preferred date", 50),
  preferredTime: requiredString("Preferred time", 50),
}).refine(
  (data) => data.reason !== "other" || (data.otherReason && data.otherReason.trim().length > 0),
  { message: "Please specify the reason for your call", path: ["otherReason"] }
);

export const contactFormSchema = z.discriminatedUnion("type", [
  contactMessageSchema,
  contactCallbackSchema,
]);

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ContactMessageData = z.infer<typeof contactMessageSchema>;
export type ContactCallbackData = z.infer<typeof contactCallbackSchema>;

// ============================================
// QUOTE FORM SCHEMA
// ============================================

const coverageTypes = ["home", "auto", "life", "business"] as const;
const customerTypes = ["individual", "business"] as const;
const businessTypes = ["retail", "franchise", "manufacturing", "services", "hospitality", "healthcare", "other"] as const;
const employeeRanges = ["1-10", "11-50", "51-200", "201-500", "500+"] as const;

// Base quote schema without customer type discrimination
const baseQuoteFields = {
  firstName: requiredString("First name", LIMITS.NAME),
  lastName: requiredString("Last name", LIMITS.NAME),
  email: emailSchema,
  phone: phoneSchema,
  zipCode: requiredString("Area code", LIMITS.AREA_CODE),
  coverageType: z.enum(coverageTypes, { message: "Invalid coverage type" }),
  coverageAmount: requiredString("Coverage amount", 50),
  deductible: requiredString("Excess", 50),
  startDate: futureDateSchema,
  additionalCoverage: z.array(z.string()).optional().default([]),
};

// Individual quote schema
export const individualQuoteSchema = z.object({
  ...baseQuoteFields,
  customerType: z.literal("individual"),
});

// Business quote schema with additional business fields
export const businessQuoteSchema = z.object({
  ...baseQuoteFields,
  customerType: z.literal("business"),
  companyName: requiredString("Company name", LIMITS.COMPANY_NAME),
  businessType: z.enum(businessTypes, { message: "Invalid business type" }),
  numberOfEmployees: z.enum(employeeRanges, { message: "Please select employee range" }),
  industry: optionalString(LIMITS.INDUSTRY),
});

// Combined quote form schema using discriminated union
export const quoteFormSchema = z.discriminatedUnion("customerType", [
  individualQuoteSchema,
  businessQuoteSchema,
]);

// Legacy schema for backwards compatibility (optional, for existing submissions)
export const legacyQuoteFormSchema = z.object({
  ...baseQuoteFields,
  customerType: z.enum(customerTypes).optional().default("individual"),
  companyName: optionalString(LIMITS.COMPANY_NAME),
  businessType: z.enum([...businessTypes, ""]).optional(),
  numberOfEmployees: z.enum([...employeeRanges, ""]).optional(),
  industry: optionalString(LIMITS.INDUSTRY),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
export type IndividualQuoteData = z.infer<typeof individualQuoteSchema>;
export type BusinessQuoteData = z.infer<typeof businessQuoteSchema>;
export type LegacyQuoteFormData = z.infer<typeof legacyQuoteFormSchema>;

// ============================================
// PARTNER INQUIRY SCHEMA
// ============================================

export const partnerInquirySchema = z.object({
  companyName: requiredString("Company name", LIMITS.COMPANY_NAME),
  businessType: requiredString("Business type", LIMITS.INDUSTRY),
  numberOfLocations: requiredString("Number of locations", 50),
  contactName: requiredString("Contact name", LIMITS.NAME),
  jobTitle: requiredString("Job title", LIMITS.JOB_TITLE),
  email: emailSchema,
  phone: phoneSchema,
  province: requiredString("Province", LIMITS.CITY),
  city: requiredString("City", LIMITS.CITY),
  servicesInterested: z.array(z.string()).optional().default([]),
  currentFootTraffic: optionalString(LIMITS.SHORT_TEXT),
  message: messageSchema,
  marketingConsent: z.boolean().optional().default(false),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "Privacy policy consent is required",
  }),
});

export type PartnerInquiryData = z.infer<typeof partnerInquirySchema>;

// ============================================
// CORPORATE INQUIRY SCHEMA
// ============================================

export const corporateInquirySchema = z.object({
  companyName: requiredString("Company name", LIMITS.COMPANY_NAME),
  industry: requiredString("Industry", LIMITS.INDUSTRY),
  employeeCount: requiredString("Number of employees", 50),
  contactName: requiredString("Contact name", LIMITS.NAME),
  jobTitle: requiredString("Job title", LIMITS.JOB_TITLE),
  email: emailSchema,
  phone: phoneSchema,
  servicesInterested: z.array(z.string()).optional().default([]),
  currentBenefits: optionalString(LIMITS.SHORT_TEXT),
  message: messageSchema,
  marketingConsent: z.boolean().optional().default(false),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "Privacy policy consent is required",
  }),
});

export type CorporateInquiryData = z.infer<typeof corporateInquirySchema>;

// ============================================
// CAREERS APPLICATION SCHEMA
// Note: This route uses FormData, so validation is done differently
// ============================================

const validPositions = [
  "sales-consultant",
  "sales-agent",
  "call-centre-agent",
  "telesales-rep",
  "client-service-admin",
  "trainee-sales",
  "other",
] as const;

const validProvinces = [
  "kwazulu-natal",
  "gauteng",
  "western-cape",
  "eastern-cape",
  "free-state",
  "mpumalanga",
  "limpopo",
  "north-west",
  "northern-cape",
  "any",
] as const;

const validExperience = ["none", "0-1", "1-3", "3-5", "5+"] as const;

const validRelocation = ["yes", "no", "depends"] as const;

export const careersApplicationSchema = z.object({
  fullName: requiredString("Full name", LIMITS.NAME),
  email: emailSchema,
  phone: phoneSchema,
  position: z.enum(validPositions, { message: "Invalid position selected" }),
  province: z.enum(validProvinces, { message: "Invalid province selected" }),
  experience: z.enum(validExperience, { message: "Invalid experience level" }),
  willingToRelocate: z.enum(validRelocation, { message: "Please select relocation preference" }),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "Privacy consent is required",
  }),
});

export type CareersApplicationData = z.infer<typeof careersApplicationSchema>;

// ============================================
// CALCULATOR EMAIL RESULTS
// ============================================

const validCalculatorTypes = ["life", "funeral"] as const;

export const calculatorEmailSchema = z.object({
  email: emailSchema,
  calculatorType: z.enum(validCalculatorTypes, { message: "Invalid calculator type" }),
  totalAmount: z.number().positive("Cover amount must be positive"),
  premiumLow: z.number().optional(),
  premiumHigh: z.number().optional(),
  monthlyPremium: z.number().optional(),
  breakdown: z.array(z.object({
    label: z.string(),
    value: z.number(),
  })),
  // Life cover specific
  yearsOfSupport: z.number().optional(),
  dependents: z.number().optional(),
  // Funeral cover specific
  planName: z.string().optional(),
  memberCount: z.number().optional(),
});

export type CalculatorEmailData = z.infer<typeof calculatorEmailSchema>;

// ============================================
// HELPER: Format Zod errors for API response
// ============================================

export function formatZodErrors(error: z.ZodError): string {
  const issues = error.issues;
  if (issues.length > 0) {
    return issues[0].message;
  }
  return "Validation failed";
}

export function formatZodErrorsDetailed(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join(".");
    if (!fieldErrors[path]) {
      fieldErrors[path] = issue.message;
    }
  }
  return fieldErrors;
}
