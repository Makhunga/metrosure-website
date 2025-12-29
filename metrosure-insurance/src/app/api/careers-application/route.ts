import { NextRequest, NextResponse } from "next/server";
import {
  sendEmail,
  emailTo,
  wrapEmailTemplate,
  createEmailHeader,
  createSectionTitle,
  createFieldRow,
  createSection,
  createAlertBox,
  createBulletList,
  createParagraph,
  createLink
} from "@/lib/email";
import { checkRateLimit, rateLimits } from "@/lib/rateLimit";
import { careersApplicationSchema, formatZodErrors } from "@/lib/validationSchemas";

// Position labels mapping
const positionLabels: Record<string, string> = {
  "sales-consultant": "Sales Consultant",
  "call-centre-agent": "Call Centre Agent",
  "telesales-rep": "Telesales Representative",
  "client-service-admin": "Client Service Administrator",
  "trainee-sales": "Trainee/Entry Level",
  "other": "Other",
};

// Province labels mapping
const provinceLabels: Record<string, string> = {
  "kwazulu-natal": "KwaZulu-Natal",
  "gauteng": "Gauteng",
  "western-cape": "Western Cape",
  "eastern-cape": "Eastern Cape",
  "free-state": "Free State",
  "mpumalanga": "Mpumalanga",
  "limpopo": "Limpopo",
  "north-west": "North West",
  "northern-cape": "Northern Cape",
  "any": "Any Province",
};

// Experience labels mapping
const experienceLabels: Record<string, string> = {
  "none": "No Experience",
  "0-1": "Less than 1 year",
  "1-3": "1-3 years",
  "3-5": "3-5 years",
  "5+": "5+ years",
};

// Relocation labels mapping
const relocationLabels: Record<string, string> = {
  "yes": "Yes",
  "no": "No",
  "depends": "Depends on location",
};

export async function POST(request: NextRequest) {
  // Rate limiting: 3 requests per hour per IP (file uploads are resource-intensive)
  const rateLimitResponse = checkRateLimit(request, rateLimits.careersApplication, 'careers-application');
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const formData = await request.formData();

    // Extract form fields into object for Zod validation
    const rawData = {
      fullName: formData.get("fullName") as string || "",
      email: formData.get("email") as string || "",
      phone: formData.get("phone") as string || "",
      position: formData.get("position") as string || "",
      province: formData.get("province") as string || "",
      experience: formData.get("experience") as string || "",
      willingToRelocate: formData.get("willingToRelocate") as string || "",
      privacyConsent: formData.get("privacyConsent") === "true",
    };

    // Validate with Zod schema
    const parseResult = careersApplicationSchema.safeParse(rawData);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: formatZodErrors(parseResult.error) },
        { status: 400 }
      );
    }

    const validatedData = parseResult.data;
    const cvFile = formData.get("cv") as File | null;

    // Process CV file if provided
    let cvAttachment = null;
    let cvInfo = null;
    if (cvFile && cvFile.size > 0) {
      // Validate file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(cvFile.type)) {
        return NextResponse.json(
          { error: "Invalid file type. Please upload a PDF or Word document." },
          { status: 400 }
        );
      }

      // Validate file size (5MB max)
      if (cvFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "File size must be less than 5MB" },
          { status: 400 }
        );
      }

      // Convert file to buffer for attachment
      const cvBuffer = Buffer.from(await cvFile.arrayBuffer());
      cvAttachment = {
        filename: cvFile.name,
        content: cvBuffer,
      };

      cvInfo = {
        name: cvFile.name,
        type: cvFile.type,
        size: `${(cvFile.size / 1024).toFixed(1)} KB`,
      };
    }

    // Build application data object using validated data
    const applicationData = {
      fullName: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone,
      position: positionLabels[validatedData.position] || validatedData.position,
      province: provinceLabels[validatedData.province] || validatedData.province,
      experience: experienceLabels[validatedData.experience] || validatedData.experience,
      willingToRelocate: relocationLabels[validatedData.willingToRelocate] || validatedData.willingToRelocate,
      cvAttached: cvInfo ? cvInfo.name : "No CV attached",
      submittedAt: new Date().toISOString(),
    };

    // Generate email content
    const emailHtml = generateApplicationEmail(applicationData, cvInfo);

    // Send email with CV attachment
    await sendEmail({
      to: emailTo.careers,
      subject: `New Job Application: ${applicationData.position} - ${applicationData.fullName}`,
      html: emailHtml,
      replyTo: validatedData.email,
      attachments: cvAttachment ? [cvAttachment] : undefined,
    });

    // Log the application
    console.log("=== New Career Application ===");
    console.log("Application Data:", JSON.stringify(applicationData, null, 2));
    if (cvInfo) {
      console.log("CV File Info:", JSON.stringify(cvInfo, null, 2));
    }

    // Send confirmation email to applicant
    await sendEmail({
      to: validatedData.email,
      subject: `Application Received - ${applicationData.position} at Metrosure`,
      html: generateConfirmationEmail(applicationData),
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      data: {
        applicantName: validatedData.fullName,
        position: positionLabels[validatedData.position] || validatedData.position,
        referenceId: `APP-${Date.now()}`,
      },
    });
  } catch (error) {
    console.error("Error processing career application:", error);
    return NextResponse.json(
      { error: "Failed to process application. Please try again." },
      { status: 500 }
    );
  }
}

interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  province: string;
  experience: string;
  willingToRelocate: string;
  cvAttached: string;
  submittedAt: string;
}

interface CVInfo {
  name: string;
  type: string;
  size: string;
}

function generateApplicationEmail(data: ApplicationData, cvInfo: CVInfo | null): string {
  const submittedDate = new Date(data.submittedAt).toLocaleString('en-ZA', {
    dateStyle: 'full',
    timeStyle: 'short'
  });

  const content = `
    ${createEmailHeader("New Job Application", data.position)}

    ${createSection(`
      ${createSectionTitle("Applicant Details")}
      ${createFieldRow("Full Name:", data.fullName)}
      ${createFieldRow("Email:", createLink(`mailto:${data.email}`, data.email))}
      ${createFieldRow("Phone:", createLink(`tel:${data.phone}`, data.phone))}
    `)}

    ${createSection(`
      ${createSectionTitle("Position Details")}
      ${createFieldRow("Position Applied:", data.position)}
      ${createFieldRow("Preferred Location:", data.province)}
      ${createFieldRow("Experience:", data.experience)}
      ${createFieldRow("Willing to Relocate:", data.willingToRelocate)}
    `)}

    ${createSection(`
      ${createSectionTitle("CV / Resume")}
      ${cvInfo ? `
        ${createFieldRow("File Name:", cvInfo.name)}
        ${createFieldRow("File Size:", cvInfo.size)}
        ${createParagraph("<em style=\"color: #666666;\">CV is attached to this email.</em>")}
      ` : `
        ${createParagraph("<span style=\"color: #999999;\">No CV was uploaded with this application.</span>")}
      `}
    `)}

    ${createAlertBox(`<strong>Submitted:</strong> ${submittedDate}`, "success")}
  `;

  return wrapEmailTemplate(content, "New Job Application");
}

function generateConfirmationEmail(data: ApplicationData): string {
  const content = `
    ${createEmailHeader("Thank You for Applying!", "We've received your application")}

    ${createParagraph(`Dear ${data.fullName},`)}

    ${createParagraph(`Thank you for your interest in joining <strong>Metrosure Insurance Brokers</strong>. We have received your application for the <strong>${data.position}</strong> position.`)}

    ${createSection(`
      ${createSectionTitle("Application Summary")}
      ${createFieldRow("Position:", data.position)}
      ${createFieldRow("Preferred Location:", data.province)}
      ${createFieldRow("CV Attached:", data.cvAttached)}
    `)}

    ${createParagraph("<strong style=\"color: #BF0603;\">What happens next?</strong>")}

    ${createBulletList([
      "Our HR team will review your application within <strong>5-7 business days</strong>",
      "If your profile matches our requirements, we'll contact you to schedule an interview",
      "Shortlisted candidates will be notified via email or phone"
    ])}

    ${createParagraph("In the meantime, feel free to explore our website to learn more about our company culture and the exciting opportunities we offer.")}

    ${createParagraph(`If you have any questions, please don't hesitate to contact us at ${createLink("mailto:careers@metrosuregroup.co.za", "careers@metrosuregroup.co.za")} or call us at ${createLink("tel:+27313011192", "+27 31 301 1192")}.`)}

    ${createParagraph("Best regards,<br /><strong>The Metrosure HR Team</strong>")}
  `;

  return wrapEmailTemplate(content, "Application Received - Metrosure");
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
