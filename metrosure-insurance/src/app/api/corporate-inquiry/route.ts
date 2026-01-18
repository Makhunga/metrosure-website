import { NextRequest, NextResponse } from "next/server";
import {
  sendEmail,
  emailTo,
  wrapEmailTemplate,
  createEmailHeader,
  createSectionTitle,
  createFieldRow,
  createSection,
  createMessageBox,
  createAlertBox,
  createBulletList,
  createParagraph,
  createLink
} from "@/lib/email";
import { checkRateLimit, rateLimits } from "@/lib/rateLimit";
import { isHoneypotFilledJSON } from "@/lib/honeypot";
import { corporateInquirySchema, formatZodErrorsDetailed, type CorporateInquiryData } from "@/lib/validationSchemas";
import {
  validationError,
  emailUnavailableError,
  emailFailedError,
  serverError,
  errorStatusCodes,
  ErrorType
} from "@/lib/errors";

// Service label mapping for corporate services
const serviceLabels: Record<string, string> = {
  "group-medical": "Group Medical Aid",
  "group-funeral": "Group Funeral Cover",
  "retirement-funds": "Retirement Fund Administration",
  "income-protection": "Income Protection & Disability Cover",
  "estate-planning": "Estate Planning & Life Cover",
  "investment-planning": "Investment & Retirement Planning"
};

export async function POST(request: NextRequest) {
  // Rate limiting: 5 requests per hour per IP (B2B inquiries)
  const rateLimitResponse = checkRateLimit(request, rateLimits.corporateInquiry, 'corporate-inquiry');
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const rawData = await request.json();

    // Check honeypot - silently reject bot submissions
    if (isHoneypotFilledJSON(rawData)) {
      return NextResponse.json({ success: true });
    }

    // Validate with Zod schema (includes message character limit)
    const parseResult = corporateInquirySchema.safeParse(rawData);
    if (!parseResult.success) {
      const error = validationError(formatZodErrorsDetailed(parseResult.error));
      return NextResponse.json(
        { success: false, ...error },
        { status: errorStatusCodes[ErrorType.VALIDATION_ERROR] }
      );
    }

    const data = parseResult.data;

    // Generate email content
    const emailHtml = generateEmailTemplate(data);

    // Send notification email to clients team
    const internalEmailResult = await sendEmail({
      to: emailTo.clients,
      subject: `[Metrosure Online] New Corporate Inquiry: ${data.companyName}`,
      html: emailHtml,
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

    // Log the submission
    console.log("=== NEW CORPORATE INQUIRY ===");
    console.log(JSON.stringify(data, null, 2));
    console.log("=============================");

    // Send confirmation email to the inquirer
    const confirmationResult = await sendEmail({
      to: data.email,
      subject: `Thank you for your corporate inquiry - Metrosure`,
      html: generateConfirmationEmail(data),
    });

    // Build response with optional warning about confirmation email
    const response: {
      success: boolean;
      message: string;
      warning?: string;
    } = {
      success: true,
      message: "Corporate inquiry submitted successfully"
    };

    if (!confirmationResult.success) {
      console.warn("Corporate confirmation email failed:", confirmationResult.error);
      response.warning = "Your inquiry was received, but we couldn't send a confirmation email. Please check your spam folder or contact us if you don't hear back within 24-48 hours.";
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Corporate inquiry error:", error);
    const err = serverError(error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { success: false, ...err },
      { status: errorStatusCodes[ErrorType.SERVER_ERROR] }
    );
  }
}

function generateEmailTemplate(data: CorporateInquiryData): string {
  const servicesHtml = data.servicesInterested.length > 0
    ? data.servicesInterested.map(s => serviceLabels[s] || s).join(", ")
    : "Not specified";

  const content = `
    ${createEmailHeader("New Corporate Inquiry", `From ${data.companyName}`)}

    ${createSection(`
      ${createSectionTitle("Company Information")}
      ${createFieldRow("Company Name:", data.companyName)}
      ${createFieldRow("Industry:", data.industry)}
      ${createFieldRow("Number of Employees:", data.employeeCount)}
    `)}

    ${createSection(`
      ${createSectionTitle("Contact Information")}
      ${createFieldRow("Contact Name:", data.contactName)}
      ${createFieldRow("Job Title:", data.jobTitle)}
      ${createFieldRow("Email:", createLink(`mailto:${data.email}`, data.email))}
      ${createFieldRow("Phone:", createLink(`tel:${data.phone}`, data.phone))}
    `)}

    ${createSection(`
      ${createSectionTitle("Benefits Interest")}
      ${createFieldRow("Services Interested:", servicesHtml)}
      ${createFieldRow("Current Benefits:", data.currentBenefits || "Not specified")}
    `)}

    ${data.message ? createSection(`
      ${createSectionTitle("Additional Message")}
      ${createMessageBox(data.message.replace(/\n/g, '<br />'))}
    `) : ""}

    ${createSection(`
      ${createSectionTitle("Consent")}
      ${createFieldRow("Marketing Consent:", data.marketingConsent ? "Yes" : "No")}
    `)}

    ${createAlertBox("<strong>Action Required:</strong> Please respond within 24 hours.", "warning")}
  `;

  return wrapEmailTemplate(content, "New Corporate Inquiry");
}

function generateConfirmationEmail(data: CorporateInquiryData): string {
  const content = `
    ${createEmailHeader(`Thank You, ${data.contactName}!`, "We've received your corporate benefits inquiry")}

    ${createParagraph(`Dear ${data.contactName},`)}

    ${createParagraph(`Thank you for reaching out to <strong>Metrosure Insurance Brokers</strong> about employee benefits for <strong>${data.companyName}</strong>. We're committed to helping you create a comprehensive benefits package that attracts and retains top talent.`)}

    ${createParagraph("Our corporate solutions team will review your inquiry and contact you within <strong>24 hours</strong>. Here's what you can expect:")}

    ${createBulletList([
      "A consultation call to understand your specific needs",
      "A customised proposal tailored to your workforce",
      "Competitive quotes from leading insurers",
      "Guidance on tax-efficient benefit structures"
    ])}

    ${createSection(`
      ${createSectionTitle("Why Choose Metrosure for Corporate Benefits?")}
      ${createBulletList([
        "<strong>Expert Guidance:</strong> Over 18 years of experience in employee benefits",
        "<strong>Comprehensive Solutions:</strong> Medical aid, retirement, funeral cover, and more",
        "<strong>Administrative Support:</strong> We handle claims, enrollments, and queries",
        "<strong>Compliance Assured:</strong> FSCA-registered and fully compliant",
        "<strong>Cost Optimisation:</strong> Access to competitive group rates"
      ])}
    `)}

    ${createParagraph("If you have any urgent questions, please don't hesitate to contact us:")}

    ${createFieldRow("Phone:", createLink("tel:+27313011192", "+27 31 301 1192"))}
    ${createFieldRow("Email:", createLink("mailto:clients@metrosureconsult.co.za", "clients@metrosureconsult.co.za"))}

    ${createParagraph("We look forward to helping you build a benefits package that your employees will value!")}

    ${createParagraph("Best regards,<br /><strong>Metrosure Corporate Solutions Team</strong>")}
  `;

  return wrapEmailTemplate(content, "Thank You for Your Corporate Inquiry");
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
