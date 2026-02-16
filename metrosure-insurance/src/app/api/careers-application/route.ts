import { NextRequest, NextResponse } from "next/server";
import {
  sendEmail,
  emailTo,
  emailCc,
  wrapEmailTemplate,
  createEmailHeader,
  createSectionTitle,
  createFieldRow,
  createSection,
  createAlertBox,
  createBulletList,
  createParagraph,
  createLink,
  escapeHtml
} from "@/lib/email";
import { checkRateLimit, rateLimits } from "@/lib/rateLimit";
import { isHoneypotFilled } from "@/lib/honeypot";
import { careersApplicationSchema, formatZodErrorsDetailed } from "@/lib/validationSchemas";
import {
  validationError,
  emailUnavailableError,
  emailFailedError,
  serverError,
  errorStatusCodes,
  ErrorType
} from "@/lib/errors";

// Position labels mapping
const positionLabels: Record<string, string> = {
  "sales-consultant": "Insurance Sales Consultant",
  "sales-agent": "Sales Agent",
  "call-centre-agent": "Call Centre Agent",
  "telesales-rep": "Telesales Representative",
  "client-service-admin": "Client Service Administrator",
  "trainee-sales": "Trainee Sales Agent",
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

/**
 * Sanitise filename to prevent path traversal and special character issues
 * - Removes path separators (/, \)
 * - Removes special characters except dots, dashes, underscores
 * - Adds timestamp prefix to avoid collisions
 * - Preserves file extension
 */
function sanitiseFilename(originalName: string): string {
  // Extract extension
  const lastDot = originalName.lastIndexOf('.');
  const extension = lastDot > 0 ? originalName.slice(lastDot) : '';
  const baseName = lastDot > 0 ? originalName.slice(0, lastDot) : originalName;

  // Remove path separators and dangerous characters
  const sanitised = baseName
    .replace(/[/\\]/g, '') // Remove path separators
    .replace(/[^a-zA-Z0-9\-_\s]/g, '') // Keep only alphanumeric, dash, underscore, space
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .slice(0, 100); // Limit length

  // Add timestamp prefix for uniqueness
  const timestamp = Date.now();
  return `${timestamp}-${sanitised || 'cv'}${extension}`;
}

export async function POST(request: NextRequest) {
  // Rate limiting: 3 requests per hour per IP (file uploads are resource-intensive)
  const rateLimitResponse = checkRateLimit(request, rateLimits.careersApplication, 'careers-application');
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const formData = await request.formData();

    // Check honeypot - silently reject bot submissions
    if (isHoneypotFilled(formData)) {
      return NextResponse.json({ success: true });
    }

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
      const error = validationError(formatZodErrorsDetailed(parseResult.error));
      return NextResponse.json(
        { success: false, ...error },
        { status: errorStatusCodes[ErrorType.VALIDATION_ERROR] }
      );
    }

    const validatedData = parseResult.data;

    // Process attachments if provided
    const attachmentFiles = formData.getAll("attachments") as File[];
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const attachments: { filename: string; content: Buffer }[] = [];
    const attachmentInfos: { name: string; type: string; size: string }[] = [];
    let totalSize = 0;

    for (const file of attachmentFiles) {
      if (!file || file.size === 0) continue;

      // Validate file type
      if (!validTypes.includes(file.type)) {
        const error = validationError({ attachments: `Invalid file type: ${file.name}. Please upload PDF or Word documents only.` });
        return NextResponse.json(
          { success: false, ...error },
          { status: errorStatusCodes[ErrorType.VALIDATION_ERROR] }
        );
      }

      totalSize += file.size;
    }

    // Validate total file size (5MB max)
    if (totalSize > 5 * 1024 * 1024) {
      const error = validationError({ attachments: "Total file size must be less than 5MB" });
      return NextResponse.json(
        { success: false, ...error },
        { status: errorStatusCodes[ErrorType.VALIDATION_ERROR] }
      );
    }

    // Process each file
    for (const file of attachmentFiles) {
      if (!file || file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const sanitisedFilename = sanitiseFilename(file.name);
      attachments.push({
        filename: sanitisedFilename,
        content: buffer,
      });

      attachmentInfos.push({
        name: file.name,
        type: file.type,
        size: `${(file.size / 1024).toFixed(1)} KB`,
      });
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
      attachmentsCount: attachmentInfos.length,
      attachmentNames: attachmentInfos.map(a => a.name).join(", ") || "No attachments",
      submittedAt: new Date().toISOString(),
    };

    // Generate email content
    const emailHtml = generateApplicationEmail(applicationData, attachmentInfos);

    // Send email with attachments
    const internalEmailResult = await sendEmail({
      to: emailTo.careers,
      cc: emailCc.careers,
      subject: `New Job Application: ${applicationData.position} - ${applicationData.fullName}`,
      html: emailHtml,
      replyTo: validatedData.email,
      attachments: attachments.length > 0 ? attachments : undefined,
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

    // Log the application
    console.log("=== New Career Application ===");
    console.log("Application Data:", JSON.stringify(applicationData, null, 2));
    if (attachmentInfos.length > 0) {
      console.log("Attachments:", JSON.stringify(attachmentInfos, null, 2));
    }

    // DISABLED: Confirmation email to applicant (to avoid Resend rate limits during high traffic)
    // To re-enable, uncomment the block below and restore the warning logic
    // const confirmationResult = await sendEmail({
    //   to: validatedData.email,
    //   subject: `Application Received - ${applicationData.position} at Metrosure`,
    //   html: generateConfirmationEmail(applicationData),
    // });

    const response = {
      success: true,
      message: "Application submitted successfully",
      data: {
        applicantName: validatedData.fullName,
        position: positionLabels[validatedData.position] || validatedData.position,
        referenceId: `APP-${Date.now()}`,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error processing career application:", error);
    const err = serverError(error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { success: false, ...err },
      { status: errorStatusCodes[ErrorType.SERVER_ERROR] }
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
  attachmentsCount: number;
  attachmentNames: string;
  submittedAt: string;
}

interface AttachmentInfo {
  name: string;
  type: string;
  size: string;
}

function generateApplicationEmail(data: ApplicationData, attachmentInfos: AttachmentInfo[]): string {
  const submittedDate = new Date(data.submittedAt).toLocaleString('en-ZA', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Africa/Johannesburg',
  });

  // Escape user-provided content to prevent XSS
  const safeFullName = escapeHtml(data.fullName);

  // Build attachments section
  let attachmentsSection = '';
  if (attachmentInfos.length > 0) {
    const filesList = attachmentInfos.map(att =>
      `${createFieldRow(escapeHtml(att.name), att.size)}`
    ).join('');
    attachmentsSection = `
      ${createSectionTitle("Attachments")}
      ${filesList}
      ${createParagraph(`<em style="color: #666666;">${attachmentInfos.length} file(s) attached to this email.</em>`)}
    `;
  } else {
    attachmentsSection = `
      ${createSectionTitle("Attachments")}
      ${createParagraph("<span style=\"color: #999999;\">No files were uploaded with this application.</span>")}
    `;
  }

  const content = `
    ${createEmailHeader("New Job Application", data.position)}

    ${createSection(`
      ${createSectionTitle("Applicant Details")}
      ${createFieldRow("Full Name:", safeFullName)}
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

    ${createSection(attachmentsSection)}

    ${createAlertBox(`<strong>Submitted:</strong> ${submittedDate}`, "success")}
  `;

  return wrapEmailTemplate(content, "New Job Application");
}

function generateConfirmationEmail(data: ApplicationData): string {
  // Escape user-provided content to prevent XSS
  const safeFullName = escapeHtml(data.fullName);
  const attachmentsSummary = data.attachmentsCount > 0
    ? `${data.attachmentsCount} file(s) attached`
    : "No attachments";

  const content = `
    ${createEmailHeader("Thank You for Applying!", "We've received your application")}

    ${createParagraph(`Dear ${safeFullName},`)}

    ${createParagraph(`Thank you for your interest in joining <strong>Metrosure Insurance Brokers</strong>. We have received your application for the <strong>${data.position}</strong> position.`)}

    ${createSection(`
      ${createSectionTitle("Application Summary")}
      ${createFieldRow("Position:", data.position)}
      ${createFieldRow("Preferred Location:", data.province)}
      ${createFieldRow("Attachments:", attachmentsSummary)}
    `)}

    ${createParagraph("<strong style=\"color: #BF0603;\">What happens next?</strong>")}

    ${createBulletList([
      "Our HR team will review your application within <strong>5-7 business days</strong>",
      "If your profile matches our requirements, we'll contact you to schedule an interview",
      "Shortlisted candidates will be notified via email or phone"
    ])}

    ${createParagraph("In the meantime, feel free to explore our website to learn more about our company culture and the exciting opportunities we offer.")}

    ${createParagraph(`If you have any questions, please don't hesitate to contact us at ${createLink("mailto:careers@metrosureconsult.co.za", "careers@metrosureconsult.co.za")} or call us at ${createLink("tel:+27313011192", "+27 31 301 1192")}.`)}

    ${createParagraph("Best regards,<br /><strong>The Metrosure HR Team</strong>")}
  `;

  return wrapEmailTemplate(content, "Application Received - Metrosure");
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
