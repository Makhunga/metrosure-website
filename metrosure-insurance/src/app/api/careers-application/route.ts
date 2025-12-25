import { NextRequest, NextResponse } from "next/server";

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
  try {
    const formData = await request.formData();

    // Extract form fields
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const position = formData.get("position") as string;
    const province = formData.get("province") as string;
    const experience = formData.get("experience") as string;
    const willingToRelocate = formData.get("willingToRelocate") as string;
    const privacyConsent = formData.get("privacyConsent") === "true";
    const cvFile = formData.get("cv") as File | null;

    // Validate required fields
    const requiredFields = ["fullName", "email", "phone", "position", "province", "experience", "willingToRelocate"];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate privacy consent
    if (!privacyConsent) {
      return NextResponse.json(
        { error: "Privacy consent is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Process CV file if provided
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

      cvInfo = {
        name: cvFile.name,
        type: cvFile.type,
        size: cvFile.size,
      };
    }

    // Build application data object
    const applicationData = {
      fullName,
      email,
      phone,
      position: positionLabels[position] || position,
      province: provinceLabels[province] || province,
      experience: experienceLabels[experience] || experience,
      willingToRelocate: relocationLabels[willingToRelocate] || willingToRelocate,
      cvAttached: cvInfo ? cvInfo.name : "No CV attached",
      submittedAt: new Date().toISOString(),
    };

    // Log the application (in production, this would be saved to a database or sent via email)
    console.log("=== New Career Application ===");
    console.log("Application Data:", JSON.stringify(applicationData, null, 2));
    if (cvInfo) {
      console.log("CV File Info:", JSON.stringify(cvInfo, null, 2));
    }

    // TODO: In production, implement one of these options:
    // 1. Save to database
    // 2. Send email notification using nodemailer
    // 3. Send to HR management system via API
    // 4. Store CV in cloud storage (S3, Azure Blob, etc.)

    /*
    // Example nodemailer implementation (uncomment when SMTP is configured):

    import nodemailer from "nodemailer";

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: "hr@metrosuregroup.co.za",
      subject: `New Job Application: ${applicationData.position} - ${applicationData.fullName}`,
      html: `
        <h2>New Career Application</h2>
        <p><strong>Name:</strong> ${applicationData.fullName}</p>
        <p><strong>Email:</strong> ${applicationData.email}</p>
        <p><strong>Phone:</strong> ${applicationData.phone}</p>
        <p><strong>Position:</strong> ${applicationData.position}</p>
        <p><strong>Preferred Location:</strong> ${applicationData.location}</p>
        <p><strong>Experience:</strong> ${applicationData.experience}</p>
        <p><strong>CV:</strong> ${applicationData.cvAttached}</p>
        <p><strong>Submitted:</strong> ${applicationData.submittedAt}</p>
      `,
      attachments: cvFile ? [{
        filename: cvFile.name,
        content: Buffer.from(await cvFile.arrayBuffer()),
      }] : [],
    };

    await transporter.sendMail(mailOptions);
    */

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      data: {
        applicantName: fullName,
        position: positionLabels[position] || position,
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

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
