import { NextRequest, NextResponse } from "next/server";
import {
  sendEmail,
  isEmailAvailable,
  generateCalculatorResultsEmail,
} from "@/lib/email";
import { checkRateLimit, rateLimits } from "@/lib/rateLimit";
import { isHoneypotFilledJSON } from "@/lib/honeypot";
import {
  calculatorEmailSchema,
  formatZodErrorsDetailed,
} from "@/lib/validationSchemas";
import {
  validationError,
  emailUnavailableError,
  emailFailedError,
  serverError,
  errorStatusCodes,
  ErrorType,
} from "@/lib/errors";

export async function POST(request: NextRequest) {
  // Rate limiting: 10 requests per hour per IP
  const rateLimitResponse = checkRateLimit(
    request,
    rateLimits.calculatorEmail,
    "calculatorEmail"
  );
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const rawData = await request.json();

    // Check honeypot - silently reject bot submissions
    if (isHoneypotFilledJSON(rawData)) {
      return NextResponse.json({ success: true });
    }

    // Validate with Zod schema
    const parseResult = calculatorEmailSchema.safeParse(rawData);
    if (!parseResult.success) {
      const error = validationError(formatZodErrorsDetailed(parseResult.error));
      return NextResponse.json(
        { success: false, ...error },
        { status: errorStatusCodes[ErrorType.VALIDATION_ERROR] }
      );
    }

    const data = parseResult.data;

    // Check if email service is available
    if (!isEmailAvailable()) {
      const error = emailUnavailableError();
      return NextResponse.json(
        { success: false, ...error },
        { status: errorStatusCodes[ErrorType.EMAIL_UNAVAILABLE] }
      );
    }

    // Generate email content
    const emailHtml = generateCalculatorResultsEmail(data);
    const isLife = data.calculatorType === "life";
    const subject = isLife
      ? "Your Life Cover Calculation Results"
      : "Your Funeral Cover Plan Results";

    // Send email to user
    const emailResult = await sendEmail({
      to: data.email,
      subject: `${subject} | Metrosure`,
      html: emailHtml,
    });

    if (!emailResult.success) {
      console.error("Failed to send calculator results email:", emailResult.error);
      const error = emailFailedError();
      return NextResponse.json(
        { success: false, ...error },
        { status: errorStatusCodes[ErrorType.EMAIL_FAILED] }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your calculation results have been sent to your email.",
    });
  } catch (error) {
    console.error("Calculator email error:", error);
    const errorResponse = serverError(
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { success: false, ...errorResponse },
      { status: errorStatusCodes[ErrorType.SERVER_ERROR] }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
