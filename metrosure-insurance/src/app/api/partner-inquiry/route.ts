import { NextRequest, NextResponse } from "next/server";

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
  "outsourced-sales": "Outsourced Sales & Marketing",
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

    // Log the submission (in production, this would send an email or save to database)
    console.log("=== NEW PARTNER INQUIRY ===");
    console.log(JSON.stringify(data, null, 2));
    console.log("===========================");

    // Generate email content for when email is configured
    const emailHtml = generateEmailTemplate(data);
    console.log("Email template generated:");
    console.log(emailHtml);

    // TODO: When SMTP is configured, uncomment and configure:
    //
    // import nodemailer from 'nodemailer';
    //
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: parseInt(process.env.SMTP_PORT || '587'),
    //   secure: false,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });
    //
    // await transporter.sendMail({
    //   from: process.env.SMTP_FROM || 'no-reply@metrosuregroup.co.za',
    //   to: process.env.PARTNER_INQUIRY_EMAIL || 'partnerships@metrosuregroup.co.za',
    //   subject: `New Partnership Inquiry: ${data.companyName}`,
    //   html: emailHtml,
    // });
    //
    // // Send confirmation email to the inquirer
    // await transporter.sendMail({
    //   from: process.env.SMTP_FROM || 'no-reply@metrosuregroup.co.za',
    //   to: data.email,
    //   subject: `Thank you for your partnership inquiry - Metrosure`,
    //   html: generateConfirmationEmail(data),
    // });

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

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Partnership Inquiry</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #BF0603, #690025); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 14px; font-weight: bold; color: #BF0603; text-transform: uppercase; margin-bottom: 10px; border-bottom: 2px solid #BF0603; padding-bottom: 5px; }
        .field { margin-bottom: 10px; }
        .label { font-weight: bold; color: #555; }
        .value { color: #333; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">New Partnership Inquiry</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Received from ${data.companyName}</p>
        </div>

        <div class="content">
          <div class="section">
            <div class="section-title">Business Information</div>
            <div class="field">
              <span class="label">Company Name:</span>
              <span class="value">${data.companyName}</span>
            </div>
            <div class="field">
              <span class="label">Business Type:</span>
              <span class="value">${data.businessType}</span>
            </div>
            <div class="field">
              <span class="label">Number of Locations:</span>
              <span class="value">${data.numberOfLocations}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Contact Information</div>
            <div class="field">
              <span class="label">Contact Name:</span>
              <span class="value">${data.contactName}</span>
            </div>
            <div class="field">
              <span class="label">Job Title:</span>
              <span class="value">${data.jobTitle}</span>
            </div>
            <div class="field">
              <span class="label">Email:</span>
              <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
            </div>
            <div class="field">
              <span class="label">Phone:</span>
              <span class="value"><a href="tel:${data.phone}">${data.phone}</a></span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Location</div>
            <div class="field">
              <span class="label">Province:</span>
              <span class="value">${data.province}</span>
            </div>
            <div class="field">
              <span class="label">City/Town:</span>
              <span class="value">${data.city}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Partnership Interest</div>
            <div class="field">
              <span class="label">Services Interested:</span>
              <span class="value">${servicesHtml}</span>
            </div>
            <div class="field">
              <span class="label">Current Foot Traffic:</span>
              <span class="value">${data.currentFootTraffic || "Not specified"}</span>
            </div>
          </div>

          ${data.message ? `
          <div class="section">
            <div class="section-title">Additional Message</div>
            <p>${data.message}</p>
          </div>
          ` : ""}

          <div class="section">
            <div class="section-title">Consent</div>
            <div class="field">
              <span class="label">Marketing Consent:</span>
              <span class="value">${data.marketingConsent ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>

        <div class="footer">
          <p>This inquiry was submitted via the Metrosure Partners page.</p>
          <p>Please respond within 24 hours.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateConfirmationEmail(data: PartnerInquiryData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank You for Your Inquiry</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #BF0603, #690025); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .cta { display: inline-block; background: #BF0603; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; margin-top: 20px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">Thank You, ${data.contactName}!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your partnership inquiry</p>
        </div>

        <div class="content">
          <p>Dear ${data.contactName},</p>

          <p>Thank you for your interest in partnering with Metrosure Insurance Brokers. We're excited about the possibility of working with <strong>${data.companyName}</strong>.</p>

          <p>Our partnership team will review your inquiry and get back to you within <strong>24 hours</strong>. In the meantime, here's what you can expect:</p>

          <ul>
            <li>A call from our partnership manager to discuss your needs</li>
            <li>A customized proposal based on your business profile</li>
            <li>Information about our revenue-sharing model</li>
          </ul>

          <p>If you have any urgent questions, feel free to contact us:</p>
          <ul>
            <li>Phone: <a href="tel:+27313011192">+27 31 301 1192</a></li>
            <li>Email: <a href="mailto:partnerships@metrosuregroup.co.za">partnerships@metrosuregroup.co.za</a></li>
          </ul>

          <p>We look forward to helping you transform your retail space into a revenue engine!</p>

          <p>
            Best regards,<br>
            <strong>Metrosure Partnership Team</strong>
          </p>
        </div>

        <div class="footer">
          <p>Metrosure Insurance Brokers (Pty) Ltd | FSP 47089</p>
          <p>391 Anton Lembede Street, Metropolitan Life Building, 5th Floor, Durban 4001</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
