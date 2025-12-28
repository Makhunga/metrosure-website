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

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: "message" | "callback";
  // B2B fields
  companyName?: string;
  // Callback-specific fields
  phone?: string;
  reason?: string;
  otherReason?: string;
  preferredDate?: string;
  preferredTime?: string;
}

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
    const data: ContactFormData = await request.json();

    // Validate based on type
    if (data.type === "message") {
      if (!data.name || !data.email || !data.subject || !data.message) {
        return NextResponse.json(
          { error: "Missing required fields for message form" },
          { status: 400 }
        );
      }
    } else if (data.type === "callback") {
      if (!data.name || !data.phone || !data.reason || !data.preferredDate || !data.preferredTime) {
        return NextResponse.json(
          { error: "Missing required fields for callback form" },
          { status: 400 }
        );
      }
      if (data.reason === "other" && !data.otherReason) {
        return NextResponse.json(
          { error: "Please specify the reason for your call" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Invalid form type" },
        { status: 400 }
      );
    }

    // Email validation
    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return NextResponse.json(
          { error: "Invalid email address" },
          { status: 400 }
        );
      }
    }

    // Generate and send email
    const emailHtml = data.type === "message"
      ? generateMessageEmail(data)
      : generateCallbackEmail(data);

    // Determine if this is a B2B inquiry
    const isB2B = data.type === "message"
      ? b2bTopics.includes(data.subject)
      : b2bTopics.includes(data.reason || "");

    const b2bPrefix = isB2B ? "[B2B] " : "";

    const emailSubject = data.type === "message"
      ? `${b2bPrefix}Contact Form: ${subjectLabels[data.subject] || data.subject} - ${data.name}`
      : `${b2bPrefix}Callback Request: ${reasonLabels[data.reason!] || data.reason} - ${data.name}`;

    await sendEmail({
      to: emailTo.info,
      subject: emailSubject,
      html: emailHtml,
      replyTo: data.email || undefined,
    });

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
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}

function generateMessageEmail(data: ContactFormData): string {
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

function generateCallbackEmail(data: ContactFormData): string {
  const reason = data.reason === "other" && data.otherReason
    ? `Other: ${data.otherReason}`
    : reasonLabels[data.reason!] || data.reason;

  const isB2B = b2bTopics.includes(data.reason || "");

  const content = `
    ${createEmailHeader(isB2B ? "B2B Callback Request" : "Callback Request", `From ${data.name}`)}

    ${createSection(`
      ${createSectionTitle("Contact Details")}
      ${createFieldRow("Name:", data.name)}
      ${createFieldRow("Phone:", `${createLink(`tel:${data.phone}`, data.phone!)}`)}
      ${data.email ? createFieldRow("Email:", `${createLink(`mailto:${data.email}`, data.email)}`) : ''}
      ${data.companyName ? createFieldRow("Company:", data.companyName) : ''}
    `)}

    ${createSection(`
      ${createSectionTitle("Callback Details")}
      ${createFieldRow("Reason:", reason!)}
      ${createFieldRow("Preferred Date:", data.preferredDate!)}
      ${createFieldRow("Preferred Time:", data.preferredTime!)}
    `)}

    ${createAlertBox("<strong>Action Required:</strong> Please call this customer at their preferred time.", "warning")}
  `;

  return wrapEmailTemplate(content, "Callback Request");
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
