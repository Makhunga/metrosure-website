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
import { partnerInquirySchema, formatZodErrorsDetailed, type PartnerInquiryData } from "@/lib/validationSchemas";
import {
  validationError,
  emailUnavailableError,
  emailFailedError,
  serverError,
  errorStatusCodes,
  ErrorType
} from "@/lib/errors";

// Service label mapping
const serviceLabels: Record<string, string> = {
  "instore-campaigns": "In-Store Insurance Campaigns",
  "outsourced-sales": "Outsourced Sales &amp; Marketing",
  "credit-facility": "In-Store Credit Facility"
};

export async function POST(request: NextRequest) {
  // Rate limiting: 5 requests per hour per IP (B2B inquiries)
  const rateLimitResponse = checkRateLimit(request, rateLimits.partnerInquiry, 'partner-inquiry');
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
    const parseResult = partnerInquirySchema.safeParse(rawData);
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
      subject: `[Metrosure Online] New Partnership Inquiry: ${data.companyName}`,
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
    console.log("=== NEW PARTNER INQUIRY ===");
    console.log(JSON.stringify(data, null, 2));
    console.log("===========================");

    // Send confirmation email to the inquirer
    const confirmationResult = await sendEmail({
      to: data.email,
      subject: `Thank you for your partnership inquiry - Metrosure`,
      html: generateConfirmationEmail(data),
    });

    // Build response with optional warning about confirmation email
    const response: {
      success: boolean;
      message: string;
      warning?: string;
    } = {
      success: true,
      message: "Partnership inquiry submitted successfully"
    };

    if (!confirmationResult.success) {
      console.warn("Partner confirmation email failed:", confirmationResult.error);
      response.warning = "Your inquiry was received, but we couldn't send a confirmation email. Please check your spam folder or contact us if you don't hear back within 24-48 hours.";
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Partner inquiry error:", error);
    const err = serverError(error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { success: false, ...err },
      { status: errorStatusCodes[ErrorType.SERVER_ERROR] }
    );
  }
}

function generateEmailTemplate(data: PartnerInquiryData): string {
  const servicesHtml = data.servicesInterested.length > 0
    ? data.servicesInterested.map(s => serviceLabels[s] || s).join(", ")
    : "Not specified";

  const content = `
    ${createEmailHeader("New Partnership Inquiry", `From ${data.companyName}`)}

    ${createSection(`
      ${createSectionTitle("Business Information")}
      ${createFieldRow("Company Name:", data.companyName)}
      ${createFieldRow("Business Type:", data.businessType)}
      ${createFieldRow("Number of Locations:", data.numberOfLocations)}
    `)}

    ${createSection(`
      ${createSectionTitle("Contact Information")}
      ${createFieldRow("Contact Name:", data.contactName)}
      ${createFieldRow("Job Title:", data.jobTitle)}
      ${createFieldRow("Email:", createLink(`mailto:${data.email}`, data.email))}
      ${createFieldRow("Phone:", createLink(`tel:${data.phone}`, data.phone))}
    `)}

    ${createSection(`
      ${createSectionTitle("Location")}
      ${createFieldRow("Province:", data.province)}
      ${createFieldRow("City/Town:", data.city)}
    `)}

    ${createSection(`
      ${createSectionTitle("Partnership Interest")}
      ${createFieldRow("Services Interested:", servicesHtml)}
      ${createFieldRow("Current Foot Traffic:", data.currentFootTraffic || "Not specified")}
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

  return wrapEmailTemplate(content, "New Partnership Inquiry");
}

function generateConfirmationEmail(data: PartnerInquiryData): string {
  const content = `
    ${createEmailHeader(`Thank You, ${data.contactName}!`, "We've received your partnership inquiry")}

    ${createParagraph(`Dear ${data.contactName},`)}

    ${createParagraph(`Thank you for your interest in partnering with <strong>Metrosure Insurance Brokers</strong>. We're excited about the possibility of working with <strong>${data.companyName}</strong>.`)}

    ${createParagraph("Our partnership team will review your inquiry and get back to you within <strong>24 hours</strong>. In the meantime, here's what you can expect:")}

    ${createBulletList([
      "A call from our partnership manager to discuss your needs",
      "A customised proposal based on your business profile",
      "Information about our revenue-sharing model",
      "Details on how we provide trained staff at zero cost to you"
    ])}

    ${createSection(`
      ${createSectionTitle("Why Partner With Us?")}
      ${createBulletList([
        "<strong>Zero Overhead:</strong> We provide staff, training, and marketing materials",
        "<strong>Revenue Share:</strong> Earn from every policy sold in your store",
        "<strong>Job Creation:</strong> Help create employment in your community",
        "<strong>Full Support:</strong> Ongoing training and management support"
      ])}
    `)}

    ${createParagraph("If you have any urgent questions, feel free to contact us:")}

    ${createFieldRow("Phone:", createLink("tel:+27313011192", "+27 31 301 1192"))}
    ${createFieldRow("Email:", createLink("mailto:clients@metrosuregroup.co.za", "clients@metrosuregroup.co.za"))}

    ${createParagraph("We look forward to helping you transform your retail space into a revenue engine!")}

    ${createParagraph("Best regards,<br /><strong>Metrosure Partnership Team</strong>")}
  `;

  return wrapEmailTemplate(content, "Thank You for Your Partnership Inquiry");
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
