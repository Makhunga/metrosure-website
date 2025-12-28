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
  createLink
} from "@/lib/email";
import { checkRateLimit, rateLimits } from "@/lib/rateLimit";

type CoverageType = "home" | "auto" | "life" | "business";

interface QuoteFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  coverageType: CoverageType;
  coverageAmount: string;
  deductible: string;
  startDate: string;
  additionalCoverage: string[];
}

const coverageTypeLabels: Record<CoverageType, string> = {
  home: "Home & Property",
  auto: "Auto & Vehicle",
  life: "Life & Health",
  business: "Business Insurance",
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
  });
}

export async function POST(request: NextRequest) {
  // Rate limiting: 10 requests per hour per IP
  const rateLimitResponse = checkRateLimit(request, rateLimits.quote, 'quote');
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const data: QuoteFormData = await request.json();

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "zipCode",
      "coverageType",
      "coverageAmount",
      "deductible",
      "startDate",
    ];

    for (const field of requiredFields) {
      if (!data[field as keyof QuoteFormData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate coverage type
    if (!["home", "auto", "life", "business"].includes(data.coverageType)) {
      return NextResponse.json(
        { error: "Invalid coverage type" },
        { status: 400 }
      );
    }

    // Generate and send email to Metrosure team
    const internalEmailHtml = generateInternalEmail(data);
    const confirmationEmailHtml = generateConfirmationEmail(data);

    // Send internal notification
    await sendEmail({
      to: emailTo.info,
      subject: `Quote Request: ${coverageTypeLabels[data.coverageType]} - ${data.firstName} ${data.lastName}`,
      html: internalEmailHtml,
      replyTo: data.email,
    });

    // Send confirmation to customer
    await sendEmail({
      to: data.email,
      subject: "Your Quote Request - Metrosure Insurance Brokers",
      html: confirmationEmailHtml,
    });

    // Log for development
    console.log("=== Quote Request Received ===");
    console.log(JSON.stringify(data, null, 2));

    return NextResponse.json(
      {
        success: true,
        message: "Your quote request has been submitted successfully. We'll be in touch within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Quote form error:", error);
    return NextResponse.json(
      { error: "Failed to process your quote request. Please try again." },
      { status: 500 }
    );
  }
}

function generateInternalEmail(data: QuoteFormData): string {
  const additionalCoverageItems = data.additionalCoverage
    .map((id) => additionalCoverageLabels[id] || id)
    .filter(Boolean);

  const content = `
    ${createEmailHeader("New Quote Request", `${coverageTypeLabels[data.coverageType]} Insurance`)}

    ${createSection(`
      ${createSectionTitle("Customer Details")}
      ${createFieldRow("Name:", `${data.firstName} ${data.lastName}`)}
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

    ${createAlertBox("<strong>Action Required:</strong> Please prepare a quote and contact this customer within 24 hours.", "warning")}
  `;

  return wrapEmailTemplate(content, "New Quote Request");
}

function generateConfirmationEmail(data: QuoteFormData): string {
  const additionalCoverageItems = data.additionalCoverage
    .map((id) => additionalCoverageLabels[id] || id)
    .filter(Boolean);

  const content = `
    ${createEmailHeader("Quote Request Received", "Thank you for choosing Metrosure")}

    ${createSection(`
      <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #333333; line-height: 1.6; margin: 0 0 15px 0;">
        Dear ${data.firstName},
      </p>
      <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #333333; line-height: 1.6; margin: 0 0 15px 0;">
        Thank you for your interest in ${coverageTypeLabels[data.coverageType]} insurance with Metrosure Insurance Brokers. We've received your quote request and a licensed insurance advisor will be in touch within 24 hours.
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
