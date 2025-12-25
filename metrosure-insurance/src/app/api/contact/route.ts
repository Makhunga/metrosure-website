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

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: "message" | "callback";
  // Callback-specific fields
  phone?: string;
  reason?: string;
  otherReason?: string;
  preferredDate?: string;
  preferredTime?: string;
}

const subjectLabels: Record<string, string> = {
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
  "claims": "Claims Enquiry",
  "policy-changes": "Policy Changes",
  "other": "Other",
};

export async function POST(request: NextRequest) {
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

    const emailSubject = data.type === "message"
      ? `Contact Form: ${subjectLabels[data.subject] || data.subject} - ${data.name}`
      : `Callback Request: ${reasonLabels[data.reason!] || data.reason} - ${data.name}`;

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
  const content = `
    ${createEmailHeader("New Contact Message", `From ${data.name}`)}

    ${createSection(`
      ${createSectionTitle("Contact Details")}
      ${createFieldRow("Name:", data.name)}
      ${createFieldRow("Email:", `${createLink(`mailto:${data.email}`, data.email)}`)}
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

  const content = `
    ${createEmailHeader("Callback Request", `From ${data.name}`)}

    ${createSection(`
      ${createSectionTitle("Contact Details")}
      ${createFieldRow("Name:", data.name)}
      ${createFieldRow("Phone:", `${createLink(`tel:${data.phone}`, data.phone!)}`)}
      ${data.email ? createFieldRow("Email:", `${createLink(`mailto:${data.email}`, data.email)}`) : ''}
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
