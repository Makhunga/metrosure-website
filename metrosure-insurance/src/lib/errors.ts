/**
 * Standardized API error types and response helpers
 * Provides consistent, user-friendly error responses across all API routes
 */

export enum ErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  EMAIL_UNAVAILABLE = 'EMAIL_UNAVAILABLE',
  EMAIL_FAILED = 'EMAIL_FAILED',
  RATE_LIMITED = 'RATE_LIMITED',
  SERVER_ERROR = 'SERVER_ERROR',
}

export interface ApiError {
  type: ErrorType;
  message: string;
  errors?: Record<string, string>; // Field-level validation errors
  retryable?: boolean;
}

export interface ApiSuccess<T = unknown> {
  success: true;
  data?: T;
  message?: string;
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | { success: false } & ApiError;

/**
 * User-friendly error messages by type
 */
const errorMessages: Record<ErrorType, string> = {
  [ErrorType.VALIDATION_ERROR]: 'Please check the form for errors and try again.',
  [ErrorType.EMAIL_UNAVAILABLE]: 'Our email service is temporarily unavailable. Please try again later or contact us directly.',
  [ErrorType.EMAIL_FAILED]: 'We couldn\'t send your email. Please try again or contact us directly.',
  [ErrorType.RATE_LIMITED]: 'Too many requests. Please wait a few minutes before trying again.',
  [ErrorType.SERVER_ERROR]: 'Something went wrong on our end. Please try again later.',
};

/**
 * Create a validation error response
 */
export function validationError(errors: Record<string, string>): ApiError {
  return {
    type: ErrorType.VALIDATION_ERROR,
    message: errorMessages[ErrorType.VALIDATION_ERROR],
    errors,
    retryable: true,
  };
}

/**
 * Create an email unavailable error response
 */
export function emailUnavailableError(): ApiError {
  return {
    type: ErrorType.EMAIL_UNAVAILABLE,
    message: errorMessages[ErrorType.EMAIL_UNAVAILABLE],
    retryable: true,
  };
}

/**
 * Create an email failed error response
 */
export function emailFailedError(): ApiError {
  return {
    type: ErrorType.EMAIL_FAILED,
    message: errorMessages[ErrorType.EMAIL_FAILED],
    retryable: true,
  };
}

/**
 * Create a rate limited error response
 */
export function rateLimitedError(): ApiError {
  return {
    type: ErrorType.RATE_LIMITED,
    message: errorMessages[ErrorType.RATE_LIMITED],
    retryable: true,
  };
}

/**
 * Create a server error response
 */
export function serverError(details?: string): ApiError {
  // Log details for debugging but don't expose to client
  if (details) {
    console.error('Server error details:', details);
  }
  return {
    type: ErrorType.SERVER_ERROR,
    message: errorMessages[ErrorType.SERVER_ERROR],
    retryable: true,
  };
}

/**
 * HTTP status codes for each error type
 */
export const errorStatusCodes: Record<ErrorType, number> = {
  [ErrorType.VALIDATION_ERROR]: 400,
  [ErrorType.EMAIL_UNAVAILABLE]: 503,
  [ErrorType.EMAIL_FAILED]: 502,
  [ErrorType.RATE_LIMITED]: 429,
  [ErrorType.SERVER_ERROR]: 500,
};
