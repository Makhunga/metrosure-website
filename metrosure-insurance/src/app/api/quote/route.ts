import { NextRequest, NextResponse } from "next/server";
import {
  sendEmail,
  emailTo,
  wrapEmailTemplate,
  createEmailHeader,
  createSectionTitle,
  createFieldRow,
  createAlertBox,
  createSection,
  createBulletList,
  createLink,
  escapeHtml
} from "@/lib/email";
import { checkRateLimit, rateLimits } from "@/lib/rateLimit";
import { isHoneypotFilledJSON } from "@/lib/honeypot";
import { legacyQuoteFormSchema, formatZodErrorsDetailed, type LegacyQuoteFormData } from "@/lib/validationSchemas";
import {
  validationError,
  emailUnavailableError,
  emailFailedError,
  serverError,
  errorStatusCodes,
  ErrorType
} from "@/lib/errors";

type CoverageType = "home" | "auto" | "life" | "business";
type CustomerType = "individual" | "business";

const coverageTypeLabels: Record<CoverageType, string> = {
  home: "Home & Property",
  auto: "Auto & Vehicle",
  life: "Life & Health",
  business: "Business Insurance",
};

const businessTypeLabels: Record<string, string> = {
  retail: "Retail Store",
  franchise: "Franchise",
  manufacturing: "Manufacturing",
  services: "Professional Services",
  hospitality: "Hospitality",
  healthcare: "Healthcare",
  other: "Other",
};

const additionalCoverageLabels: Record<string, string> = {
  // Home
  flood: "Flood Protection",
  earthquake: "Earthquake Coverage",
  valuables: "Valuable Items",
  liability: "Extended Liability",
  // Auto
  roadside: "Roadside Assistance",
  rental: "Rental Car Coverage",
  gap: "Gap Insurance",
  rideshare: "Rideshare Coverage",
  // Life
  critical: "Critical Illness",
  disability: "Disability Income",
  accidental: "Accidental Death",
  child: "Child Coverage",
  // Business
  cyber: "Cyber Liability",
  professional: "Professional Liability",
  workers: "Workers Compensation",
  equipment: "Equipment Breakdown",
};

function formatCurrency(value: string): string {
  const num = Number(value);
  if (isNaN(num)) return value;
  return `R${num.toLocaleString("en-ZA")}`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-ZA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Africa/Johannesburg",
  });
}

export async function POST(request: NextRequest) {
  // Rate limiting: 10 requests per hour per IP
  const rateLimitResponse = checkRateLimit(request, rateLimits.quote, 'quote');
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const rawData = await request.json();

    // Check honeypot - silently reject bot submissions
    if (isHoneypotFilledJSON(rawData)) {
      return NextResponse.json({ success: true });
    }

    // Validate with Zod schema (includes future date validation)
    const parseResult = legacyQuoteFormSchema.safeParse(rawData);
    if (!parseResult.success) {
      const error = validationError(formatZodErrorsDetailed(parseResult.error));
      return NextResponse.json(
        { success: false, ...error },
        { status: errorStatusCodes[ErrorType.VALIDATION_ERROR] }
      );
    }

    const data = parseResult.data;

    // Determine if this is a B2B quote
    const isB2B = data.customerType === "business";

    // Generate and send email to Metrosure team
    const internalEmailHtml = generateInternalEmail(data);
    const confirmationEmailHtml = generateConfirmationEmail(data);

    // Route B2B quotes to clients email, individual quotes to info
    const emailRecipient = isB2B ? emailTo.clients : emailTo.info;
    const b2bPrefix = isB2B ? "[B2B] " : "";
    const companyNote = isB2B && data.companyName ? ` (${data.companyName})` : "";

    // Send internal notification
    const internalEmailResult = await sendEmail({
      to: emailRecipient,
      subject: `[Metrosure Online] ${b2bPrefix}Quote Request: ${coverageTypeLabels[data.coverageType]} - ${data.firstName} ${data.lastName}${companyNote}`,
      html: internalEmailHtml,
      replyTo: data.email,
    });

    // Handle email failures
    if (!internalEmailResult.success) {
      if (internalEmailResult.unavailable) {
        const error = emailUnavailableError();
        return NextResponse.json(
          { success: false, ...error },
          { status: errorStatusCodes[ErrorType.EMAIL_UNAVAILABLE] }
        );
      }
      const error = emailFailedError();
      return NextResponse.json(
        { success: false, ...error },
        { status: errorStatusCodes[ErrorType.EMAIL_FAILED] }
      );
    }

    // Send confirmation to customer
    const confirmationResult = await sendEmail({
      to: data.email,
      subject: "Your Quote Request - Metrosure Insurance Brokers",
      html: confirmationEmailHtml,
    });

    // Log for development
    console.log("=== Quote Request Received ===");
    console.log(JSON.stringify(data, null, 2));

    // Build response with optional warning about confirmation email
    const response: {
      success: boolean;
      message: string;
      warning?: string;
    } = {
      success: true,
      message: "Your quote request has been submitted successfully. We'll be in touch within 24 hours.",
    };

    if (!confirmationResult.success) {
      console.warn("Customer confirmation email failed:", confirmationResult.error);
      response.warning = "Your request was received, but we couldn't send a confirmation email. Please check your spam folder or contact us if you don't hear back within 24 hours.";
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Quote form error:", error);
    const err = serverError(error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { success: false, ...err },
      { status: errorStatusCodes[ErrorType.SERVER_ERROR] }
    );
  }
}

function generateInternalEmail(data: LegacyQuoteFormData): string {
  const additionalCoverageItems = data.additionalCoverage
    .map((id) => additionalCoverageLabels[id] || id)
    .filter(Boolean);

  // Escape user-provided content to prevent XSS
  const safeFirstName = escapeHtml(data.firstName);
  const safeLastName = escapeHtml(data.lastName);
  const safeCompanyName = data.companyName ? escapeHtml(data.companyName) : '';

  const isB2B = data.customerType === "business";
  const headerSubtitle = isB2B
    ? `B2B ${coverageTypeLabels[data.coverageType]} Insurance - ${safeCompanyName}`
    : `${coverageTypeLabels[data.coverageType]} Insurance`;

  const content = `
    ${createEmailHeader(isB2B ? "New B2B Quote Request" : "New Quote Request", headerSubtitle)}

    ${isB2B && safeCompanyName ? createSection(`
      ${createSectionTitle("Business Details")}
      ${createFieldRow("Company:", safeCompanyName)}
      ${data.businessType ? createFieldRow("Business Type:", businessTypeLabels[data.businessType] || data.businessType) : ""}
      ${data.numberOfEmployees ? createFieldRow("Employees:", data.numberOfEmployees) : ""}
      ${data.industry ? createFieldRow("Industry:", data.industry) : ""}
    `) : ""}

    ${createSection(`
      ${createSectionTitle(isB2B ? "Contact Person" : "Customer Details")}
      ${createFieldRow("Name:", `${safeFirstName} ${safeLastName}`)}
      ${createFieldRow("Email:", createLink(`mailto:${data.email}`, data.email))}
      ${createFieldRow("Phone:", createLink(`tel:${data.phone}`, data.phone))}
      ${createFieldRow("Area Code:", data.zipCode)}
    `)}

    ${createSection(`
      ${createSectionTitle("Coverage Requirements")}
      ${createFieldRow("Coverage Type:", coverageTypeLabels[data.coverageType])}
      ${createFieldRow("Coverage Amount:", formatCurrency(data.coverageAmount))}
      ${createFieldRow("Excess:", formatCurrency(data.deductible))}
      ${createFieldRow("Desired Start Date:", formatDate(data.startDate))}
    `)}

    ${additionalCoverageItems.length > 0 ? createSection(`
      ${createSectionTitle("Additional Coverage Requested")}
      ${createBulletList(additionalCoverageItems)}
    `) : ""}

    ${createAlertBox(
      isB2B
        ? "<strong>B2B Quote:</strong> This is a business inquiry. Please assign to the B2B team and respond within 24 hours."
        : "<strong>Action Required:</strong> Please prepare a quote and contact this customer within 24 hours.",
      isB2B ? "info" : "warning"
    )}
  `;

  return wrapEmailTemplate(content, isB2B ? "New B2B Quote Request" : "New Quote Request");
}

function generateConfirmationEmail(data: LegacyQuoteFormData): string {
  const additionalCoverageItems = data.additionalCoverage
    .map((id) => additionalCoverageLabels[id] || id)
    .filter(Boolean);

  // Escape user-provided content to prevent XSS
  const safeFirstName = escapeHtml(data.firstName);
  const safeCompanyName = data.companyName ? escapeHtml(data.companyName) : '';

  const isB2B = data.customerType === "business";

  const content = `
    ${createEmailHeader("Quote Request Received", "Thank you for choosing Metrosure")}

    ${createSection(`
      <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #333333; line-height: 1.6; margin: 0 0 15px 0;">
        Dear ${safeFirstName},
      </p>
      <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #333333; line-height: 1.6; margin: 0 0 15px 0;">
        ${isB2B
          ? `Thank you for your interest in ${coverageTypeLabels[data.coverageType]} insurance for ${safeCompanyName || "your business"} with Metrosure Insurance Brokers. We've received your quote request and a dedicated B2B account manager will be in touch within 24 hours.`
          : `Thank you for your interest in ${coverageTypeLabels[data.coverageType]} insurance with Metrosure Insurance Brokers. We've received your quote request and a licensed insurance advisor will be in touch within 24 hours.`}
      </p>
    `)}

    ${createSection(`
      ${createSectionTitle("Your Quote Summary")}
      ${createFieldRow("Coverage Type:", coverageTypeLabels[data.coverageType])}
      ${createFieldRow("Coverage Amount:", formatCurrency(data.coverageAmount))}
      ${createFieldRow("Excess:", formatCurrency(data.deductible))}
      ${createFieldRow("Desired Start Date:", formatDate(data.startDate))}
      ${additionalCoverageItems.length > 0 ? createFieldRow("Additional Coverage:", additionalCoverageItems.join(", ")) : ""}
    `)}

    ${createSection(`
      <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #333333; line-height: 1.6; margin: 0 0 15px 0;">
        <strong>What happens next?</strong>
      </p>
      ${createBulletList([
        "One of our licensed advisors will review your requirements",
        "We'll compare options from our network of 30+ insurers",
        "You'll receive a personalised quote within 24 hours",
        "No obligation - take your time to review and decide",
      ])}
    `)}

    ${createAlertBox("If you have any urgent questions, please call us at <a href='tel:+27313011192' style='color: #155724; font-weight: bold;'>+27 31 301 1192</a>", "success")}

    ${createSection(`
      <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #333333; line-height: 1.6; margin: 0;">
        Warm regards,<br />
        <strong>The Metrosure Team</strong>
      </p>
    `)}
  `;

  return wrapEmailTemplate(content, "Quote Request Confirmation");
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
