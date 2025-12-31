/**
 * Zod validation schemas for API routes
 * Server-side validation with type-safe schemas
 */

import { z } from "zod";

// ============================================
// SHARED VALIDATORS
// ============================================

// SA phone format: +27, 0, or just digits (min 10 digits)
const saPhoneRegex = /^(\+27|0)?[0-9]{9,}$/;

export const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .transform((val) => val.replace(/[\s\-\(\)]/g, "")) // Strip formatting
  .refine((val) => val.length >= 10, "Phone number must be at least 10 digits")
  .refine((val) => saPhoneRegex.test(val), "Please enter a valid SA phone number");

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

export const requiredString = (fieldName: string) =>
  z.string().min(1, `${fieldName} is required`).trim();

export const optionalString = z.string().optional().default("");

// Message field with character limit (2000 chars)
export const messageSchema = z
  .string()
  .max(2000, "Message must be 2000 characters or less")
  .optional()
  .default("");

export const requiredMessageSchema = z
  .string()
  .min(1, "Message is required")
  .max(2000, "Message must be 2000 characters or less");

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
  name: requiredString("Name"),
  email: emailSchema.optional().default(""),
  companyName: optionalString,
});

export const contactMessageSchema = contactFormBase.extend({
  type: z.literal("message"),
  email: emailSchema,
  subject: requiredString("Subject"),
  message: requiredMessageSchema,
});

export const contactCallbackSchema = contactFormBase.extend({
  type: z.literal("callback"),
  phone: phoneSchema,
  reason: requiredString("Reason"),
  otherReason: optionalString,
  preferredDate: requiredString("Preferred date"),
  preferredTime: requiredString("Preferred time"),
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
  firstName: requiredString("First name"),
  lastName: requiredString("Last name"),
  email: emailSchema,
  phone: phoneSchema,
  zipCode: requiredString("Area code"),
  coverageType: z.enum(coverageTypes, { message: "Invalid coverage type" }),
  coverageAmount: requiredString("Coverage amount"),
  deductible: requiredString("Excess"),
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
  companyName: requiredString("Company name"),
  businessType: z.enum(businessTypes, { message: "Invalid business type" }),
  numberOfEmployees: z.enum(employeeRanges, { message: "Please select employee range" }),
  industry: optionalString,
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
  companyName: optionalString,
  businessType: z.enum([...businessTypes, ""]).optional(),
  numberOfEmployees: z.enum([...employeeRanges, ""]).optional(),
  industry: optionalString,
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
export type IndividualQuoteData = z.infer<typeof individualQuoteSchema>;
export type BusinessQuoteData = z.infer<typeof businessQuoteSchema>;
export type LegacyQuoteFormData = z.infer<typeof legacyQuoteFormSchema>;

// ============================================
// PARTNER INQUIRY SCHEMA
// ============================================

export const partnerInquirySchema = z.object({
  companyName: requiredString("Company name"),
  businessType: requiredString("Business type"),
  numberOfLocations: requiredString("Number of locations"),
  contactName: requiredString("Contact name"),
  jobTitle: requiredString("Job title"),
  email: emailSchema,
  phone: phoneSchema,
  province: requiredString("Province"),
  city: requiredString("City"),
  servicesInterested: z.array(z.string()).optional().default([]),
  currentFootTraffic: optionalString,
  message: messageSchema,
  marketingConsent: z.boolean().optional().default(false),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "Privacy policy consent is required",
  }),
});

export type PartnerInquiryData = z.infer<typeof partnerInquirySchema>;

// ============================================
// CAREERS APPLICATION SCHEMA
// Note: This route uses FormData, so validation is done differently
// ============================================

const validPositions = [
  "sales-consultant",
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
  fullName: requiredString("Full name"),
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
