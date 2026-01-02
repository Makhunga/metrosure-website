import { NextRequest, NextResponse } from "next/server";
import {
  sendEmail,
  wrapEmailTemplate,
  createEmailHeader,
  createSectionTitle,
  createFieldRow,
  createMessageBox,
  createAlertBox,
  createSection,
  createBulletList,
  createParagraph,
  createLink,
  generateCalculatorResultsEmail,
} from "@/lib/email";

// Only allow in development mode
const isDev = process.env.NODE_ENV === "development";

// Template types available for testing
type TemplateType =
  | "contact"
  | "quote"
  | "partner-inquiry"
  | "corporate-inquiry"
  | "calculator-life"
  | "calculator-funeral"
  | "careers";

interface TestEmailRequest {
  to: string;
  template: TemplateType;
}

/**
 * Generate sample email content for each template type
 */
function generateTestEmail(template: TemplateType): { subject: string; html: string } {
  switch (template) {
    case "contact": {
      const content = `
        ${createEmailHeader("New Contact Message", "From Test User")}

        ${createSection(`
          ${createSectionTitle("Contact Details")}
          ${createFieldRow("Name:", "Test User")}
          ${createFieldRow("Email:", createLink("mailto:test@example.com", "test@example.com"))}
          ${createFieldRow("Company:", "Test Company Ltd")}
          ${createFieldRow("Topic:", "General Inquiry")}
        `)}

        ${createSection(`
          ${createSectionTitle("Message")}
          ${createMessageBox("This is a test message to verify email template rendering across different email clients, including Outlook desktop, Outlook.com, and Outlook mobile.<br /><br />Please check that all formatting appears correctly.")}
        `)}
      `;
      return {
        subject: "[TEST] Contact Form: General Inquiry - Test User",
        html: wrapEmailTemplate(content, "New Contact Message"),
      };
    }

    case "quote": {
      const content = `
        ${createEmailHeader("New Quote Request", "Home & Property Insurance")}

        ${createSection(`
          ${createSectionTitle("Customer Details")}
          ${createFieldRow("Name:", "Test Customer")}
          ${createFieldRow("Email:", createLink("mailto:customer@example.com", "customer@example.com"))}
          ${createFieldRow("Phone:", createLink("tel:+27821234567", "+27 82 123 4567"))}
          ${createFieldRow("Area Code:", "4001")}
        `)}

        ${createSection(`
          ${createSectionTitle("Coverage Requirements")}
          ${createFieldRow("Coverage Type:", "Home & Property")}
          ${createFieldRow("Coverage Amount:", "R2,500,000")}
          ${createFieldRow("Excess:", "R5,000")}
          ${createFieldRow("Desired Start Date:", "Monday, 15 January 2026")}
        `)}

        ${createSection(`
          ${createSectionTitle("Additional Coverage Requested")}
          ${createBulletList([
            "Flood Protection",
            "Earthquake Coverage",
            "Valuable Items",
          ])}
        `)}

        ${createAlertBox("<strong>Action Required:</strong> Please prepare a quote and contact this customer within 24 hours.", "warning")}
      `;
      return {
        subject: "[TEST] Quote Request: Home & Property - Test Customer",
        html: wrapEmailTemplate(content, "New Quote Request"),
      };
    }

    case "partner-inquiry": {
      const content = `
        ${createEmailHeader("New B2B Partner Inquiry", "Retail Partnership")}

        ${createSection(`
          ${createSectionTitle("Business Details")}
          ${createFieldRow("Company:", "Test Retail Store")}
          ${createFieldRow("Contact Person:", "John Smith")}
          ${createFieldRow("Email:", createLink("mailto:john@testretail.co.za", "john@testretail.co.za"))}
          ${createFieldRow("Phone:", createLink("tel:+27831234567", "+27 83 123 4567"))}
          ${createFieldRow("Business Type:", "Retail Store")}
          ${createFieldRow("Locations:", "6-10 stores")}
        `)}

        ${createSection(`
          ${createSectionTitle("Services of Interest")}
          ${createBulletList([
            "In-Store Campaigns",
            "Device Leasing",
            "Call Centre Services",
          ])}
        `)}

        ${createSection(`
          ${createSectionTitle("Additional Information")}
          ${createMessageBox("We are looking to expand our insurance offerings and would like to explore partnership opportunities with Metrosure.")}
        `)}

        ${createAlertBox("<strong>B2B Inquiry:</strong> This is a business partnership request. Please assign to the B2B team for follow-up.", "info")}
      `;
      return {
        subject: "[TEST] B2B Partner Inquiry: Test Retail Store",
        html: wrapEmailTemplate(content, "New B2B Partner Inquiry"),
      };
    }

    case "corporate-inquiry": {
      const content = `
        ${createEmailHeader("New Corporate Inquiry", "Employee Benefits")}

        ${createSection(`
          ${createSectionTitle("Company Information")}
          ${createFieldRow("Company:", "Test Corporation (Pty) Ltd")}
          ${createFieldRow("Industry:", "Financial Services")}
          ${createFieldRow("Employees:", "51-200")}
        `)}

        ${createSection(`
          ${createSectionTitle("Contact Person")}
          ${createFieldRow("Name:", "Sarah Johnson")}
          ${createFieldRow("Position:", "HR Director")}
          ${createFieldRow("Email:", createLink("mailto:sarah@testcorp.co.za", "sarah@testcorp.co.za"))}
          ${createFieldRow("Phone:", createLink("tel:+27841234567", "+27 84 123 4567"))}
        `)}

        ${createSection(`
          ${createSectionTitle("Services Required")}
          ${createBulletList([
            "Group Medical Aid",
            "Group Funeral Cover",
            "Retirement Fund Administration",
          ])}
        `)}

        ${createAlertBox("<strong>Corporate Inquiry:</strong> Please assign to the corporate benefits team for consultation scheduling.", "info")}
      `;
      return {
        subject: "[TEST] Corporate Inquiry: Test Corporation (Pty) Ltd",
        html: wrapEmailTemplate(content, "New Corporate Inquiry"),
      };
    }

    case "calculator-life": {
      return {
        subject: "[TEST] Your Life Cover Calculation - Metrosure",
        html: generateCalculatorResultsEmail({
          calculatorType: "life",
          totalAmount: 5250000,
          premiumLow: 3938,
          premiumHigh: 6563,
          breakdown: [
            { label: "Income Replacement", value: 3000000 },
            { label: "Debt Clearance", value: 1500000 },
            { label: "Emergency Fund", value: 250000 },
            { label: "Education Fund", value: 500000 },
          ],
          yearsOfSupport: 5,
          dependents: 2,
        }),
      };
    }

    case "calculator-funeral": {
      return {
        subject: "[TEST] Your Funeral Cover Plan - Metrosure",
        html: generateCalculatorResultsEmail({
          calculatorType: "funeral",
          totalAmount: 50000,
          monthlyPremium: 349,
          breakdown: [
            { label: "Main Member Cover", value: 50000 },
            { label: "Spouse Cover", value: 20000 },
            { label: "Child Cover (x2)", value: 20000 },
          ],
          planName: "Comprehensive",
          memberCount: 4,
        }),
      };
    }

    case "careers": {
      const content = `
        ${createEmailHeader("New Job Application", "Insurance Sales Consultant")}

        ${createSection(`
          ${createSectionTitle("Applicant Details")}
          ${createFieldRow("Name:", "Test Applicant")}
          ${createFieldRow("Email:", createLink("mailto:applicant@example.com", "applicant@example.com"))}
          ${createFieldRow("Phone:", createLink("tel:+27851234567", "+27 85 123 4567"))}
          ${createFieldRow("Province:", "KwaZulu-Natal")}
        `)}

        ${createSection(`
          ${createSectionTitle("Application Details")}
          ${createFieldRow("Position:", "Insurance Sales Consultant")}
          ${createFieldRow("Experience:", "3-5 years")}
          ${createFieldRow("Notice Period:", "1 month")}
        `)}

        ${createSection(`
          ${createSectionTitle("Cover Letter")}
          ${createMessageBox("I am writing to express my interest in the Insurance Sales Consultant position at Metrosure Insurance Brokers. With over 4 years of experience in the insurance industry, I believe I would be a valuable addition to your team.<br /><br />I am particularly drawn to Metrosure's commitment to quality assurance and job creation in the community.")}
        `)}

        ${createAlertBox("<strong>Note:</strong> CV attachment would be included in the actual application email.", "info")}
      `;
      return {
        subject: "[TEST] Job Application: Insurance Sales Consultant - Test Applicant",
        html: wrapEmailTemplate(content, "New Job Application"),
      };
    }

    default:
      throw new Error(`Unknown template type: ${template}`);
  }
}

export async function POST(request: NextRequest) {
  // Block in production
  if (!isDev) {
    return NextResponse.json(
      { success: false, error: "Test email route is only available in development mode" },
      { status: 403 }
    );
  }

  try {
    const body: TestEmailRequest = await request.json();
    const { to, template } = body;

    // Validate inputs
    if (!to || !template) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: to, template" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate template type
    const validTemplates: TemplateType[] = [
      "contact",
      "quote",
      "partner-inquiry",
      "corporate-inquiry",
      "calculator-life",
      "calculator-funeral",
      "careers",
    ];
    if (!validTemplates.includes(template)) {
      return NextResponse.json(
        { success: false, error: `Invalid template. Valid options: ${validTemplates.join(", ")}` },
        { status: 400 }
      );
    }

    // Generate test email
    const { subject, html } = generateTestEmail(template);

    // Send email
    const result = await sendEmail({
      to,
      subject,
      html,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to send email" },
        { status: 500 }
      );
    }

    console.log(`[TEST EMAIL] Sent ${template} template to ${to}`);

    return NextResponse.json({
      success: true,
      message: `Test email (${template}) sent to ${to}`,
      emailId: result.id,
    });
  } catch (error) {
    console.error("Test email error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to show available templates
 */
export async function GET() {
  if (!isDev) {
    return NextResponse.json(
      { success: false, error: "Test email route is only available in development mode" },
      { status: 403 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Test Email API - Development Only",
    usage: {
      method: "POST",
      body: {
        to: "your-email@example.com",
        template: "contact | quote | partner-inquiry | corporate-inquiry | calculator-life | calculator-funeral | careers",
      },
    },
    templates: [
      { name: "contact", description: "Contact form message" },
      { name: "quote", description: "Quote request confirmation" },
      { name: "partner-inquiry", description: "B2B partner inquiry" },
      { name: "corporate-inquiry", description: "Corporate benefits inquiry" },
      { name: "calculator-life", description: "Life cover calculator results" },
      { name: "calculator-funeral", description: "Funeral cover calculator results" },
      { name: "careers", description: "Job application" },
    ],
  });
}
