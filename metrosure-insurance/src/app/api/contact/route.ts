import { NextRequest, NextResponse } from "next/server";
import {
  sendEmail,
  emailTo,
  wrapEmailTemplate,
  createEmailHeader,
  createSectionTitle,
  createFieldRow,
  createMessageBox,
  createAlertBox,
  createSection,
  createLink
} from "@/lib/email";
import { checkRateLimit, rateLimits } from "@/lib/rateLimit";
import {
  contactFormSchema,
  formatZodErrorsDetailed,
  type ContactMessageData,
  type ContactCallbackData
} from "@/lib/validationSchemas";
import {
  validationError,
  emailUnavailableError,
  emailFailedError,
  serverError,
  errorStatusCodes,
  ErrorType
} from "@/lib/errors";

// B2B topics that should be flagged in email subject
const b2bTopics = ["retail-partnership", "business-insurance", "employee-benefits"];

const subjectLabels: Record<string, string> = {
  "general": "General Inquiry",
  "claim-status": "Claim Status",
  "retail-partnership": "Retail Partnership",
  "business-insurance": "Business Insurance",
  "employee-benefits": "Employee Benefits",
  "feedback": "Feedback",
  // Legacy mappings (for backward compatibility)
  "General Inquiry": "General Inquiry",
  "Claim Status": "Claim Status",
  "Partnership Opportunity": "Partnership Opportunity",
  "Feedback": "Feedback",
};

const reasonLabels: Record<string, string> = {
  "car-insurance": "Car Insurance",
  "home-insurance": "Home Insurance",
  "life-insurance": "Life Insurance",
  "funeral-cover": "Funeral Cover",
  "business-insurance": "Business Insurance",
  "credit-life": "Credit Life Insurance",
  "retirement-planning": "Retirement Planning",
  "employee-benefits": "Employee Benefits",
  "retail-partnership": "Retail Partnership",
  "claims": "Claims Enquiry",
  "policy-changes": "Policy Changes",
  "other": "Other",
};

export async function POST(request: NextRequest) {
  // Rate limiting: 15 requests per hour per IP
  const rateLimitResponse = checkRateLimit(request, rateLimits.contact, 'contact');
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const rawData = await request.json();

    // Validate with Zod schema
    const parseResult = contactFormSchema.safeParse(rawData);
    if (!parseResult.success) {
      const error = validationError(formatZodErrorsDetailed(parseResult.error));
      return NextResponse.json(
        { success: false, ...error },
        { status: errorStatusCodes[ErrorType.VALIDATION_ERROR] }
      );
    }

    const data = parseResult.data;

    // Generate and send email
    const emailHtml = data.type === "message"
      ? generateMessageEmail(data)
      : generateCallbackEmail(data);

    // Determine if this is a B2B inquiry and build email subject
    // [Website Form] prefix makes it immediately clear this is from the website
    let isB2B: boolean;
    let emailSubject: string;

    if (data.type === "message") {
      isB2B = b2bTopics.includes(data.subject);
      const b2bPrefix = isB2B ? "[B2B] " : "";
      emailSubject = `[Website Form] ${b2bPrefix}Contact: ${subjectLabels[data.subject] || data.subject} - ${data.name}`;
    } else {
      isB2B = b2bTopics.includes(data.reason);
      const b2bPrefix = isB2B ? "[B2B] " : "";
      emailSubject = `[Website Form] ${b2bPrefix}Callback Request: ${reasonLabels[data.reason] || data.reason} - ${data.name}`;
    }

    // Route B2B inquiries to clients email, others to info
    const emailRecipient = isB2B ? emailTo.clients : emailTo.info;

    const emailResult = await sendEmail({
      to: emailRecipient,
      subject: emailSubject,
      html: emailHtml,
      replyTo: data.email || undefined,
    });

    // Handle email failures
    if (!emailResult.success) {
      if (emailResult.unavailable) {
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

    // Log for development
    console.log(`=== ${data.type === "message" ? "Contact Message" : "Callback Request"} Sent ===`);
    console.log(JSON.stringify(data, null, 2));

    return NextResponse.json(
      {
        success: true,
        message: data.type === "message"
          ? "Your message has been sent successfully"
          : "Your callback request has been received"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    const err = serverError(error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { success: false, ...err },
      { status: errorStatusCodes[ErrorType.SERVER_ERROR] }
    );
  }
}

function generateMessageEmail(data: ContactMessageData): string {
  const isB2B = b2bTopics.includes(data.subject);

  const content = `
    ${createEmailHeader(isB2B ? "New B2B Inquiry" : "New Contact Message", `From ${data.name}`)}

    ${createSection(`
      ${createSectionTitle("Contact Details")}
      ${createFieldRow("Name:", data.name)}
      ${createFieldRow("Email:", `${createLink(`mailto:${data.email}`, data.email)}`)}
      ${data.companyName ? createFieldRow("Company:", data.companyName) : ''}
      ${createFieldRow("Topic:", subjectLabels[data.subject] || data.subject)}
    `)}

    ${createSection(`
      ${createSectionTitle("Message")}
      ${createMessageBox(data.message.replace(/\n/g, '<br />'))}
    `)}
  `;

  return wrapEmailTemplate(content, "New Contact Message");
}

function generateCallbackEmail(data: ContactCallbackData): string {
  const reason = data.reason === "other" && data.otherReason
    ? `Other: ${data.otherReason}`
    : reasonLabels[data.reason] || data.reason;

  const isB2B = b2bTopics.includes(data.reason);

  const content = `
    ${createEmailHeader(isB2B ? "B2B Callback Request" : "Callback Request", `From ${data.name}`)}

    ${createSection(`
      ${createSectionTitle("Contact Details")}
      ${createFieldRow("Name:", data.name)}
      ${createFieldRow("Phone:", `${createLink(`tel:${data.phone}`, data.phone)}`)}
      ${data.email ? createFieldRow("Email:", `${createLink(`mailto:${data.email}`, data.email)}`) : ''}
      ${data.companyName ? createFieldRow("Company:", data.companyName) : ''}
    `)}

    ${createSection(`
      ${createSectionTitle("Callback Details")}
      ${createFieldRow("Reason:", reason)}
      ${createFieldRow("Preferred Date:", data.preferredDate)}
      ${createFieldRow("Preferred Time:", data.preferredTime)}
    `)}

    ${createAlertBox("<strong>Action Required:</strong> Please call this customer at their preferred time.", "warning")}
  `;

  return wrapEmailTemplate(content, "Callback Request");
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
