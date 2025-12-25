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

interface PartnerInquiryData {
  companyName: string;
  businessType: string;
  numberOfLocations: string;
  contactName: string;
  jobTitle: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  servicesInterested: string[];
  currentFootTraffic: string;
  message: string;
  marketingConsent: boolean;
  privacyConsent: boolean;
}

// Service label mapping
const serviceLabels: Record<string, string> = {
  "instore-campaigns": "In-Store Insurance Campaigns",
  "outsourced-sales": "Outsourced Sales &amp; Marketing",
  "credit-facility": "In-Store Credit Facility"
};

export async function POST(request: NextRequest) {
  try {
    const data: PartnerInquiryData = await request.json();

    // Validate required fields
    const requiredFields: (keyof PartnerInquiryData)[] = [
      "companyName",
      "businessType",
      "numberOfLocations",
      "contactName",
      "jobTitle",
      "email",
      "phone",
      "province",
      "city"
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Privacy consent is required
    if (!data.privacyConsent) {
      return NextResponse.json(
        { error: "Privacy policy consent is required" },
        { status: 400 }
      );
    }

    // Generate email content
    const emailHtml = generateEmailTemplate(data);

    // Send notification email to partnerships team
    await sendEmail({
      to: emailTo.partnerships,
      subject: `New Partnership Inquiry: ${data.companyName}`,
      html: emailHtml,
      replyTo: data.email,
    });

    // Log the submission
    console.log("=== NEW PARTNER INQUIRY ===");
    console.log(JSON.stringify(data, null, 2));
    console.log("===========================");

    // Send confirmation email to the inquirer
    await sendEmail({
      to: data.email,
      subject: `Thank you for your partnership inquiry - Metrosure`,
      html: generateConfirmationEmail(data),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Partnership inquiry submitted successfully"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Partner inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry. Please try again." },
      { status: 500 }
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
      "A customized proposal based on your business profile",
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
    ${createFieldRow("Email:", createLink("mailto:partnerships@metrosuregroup.co.za", "partnerships@metrosuregroup.co.za"))}

    ${createParagraph("We look forward to helping you transform your retail space into a revenue engine!")}

    ${createParagraph("Best regards,<br /><strong>Metrosure Partnership Team</strong>")}
  `;

  return wrapEmailTemplate(content, "Thank You for Your Partnership Inquiry");
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
