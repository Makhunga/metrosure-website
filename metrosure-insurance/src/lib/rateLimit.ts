import { LRUCache } from 'lru-cache';
import { NextRequest, NextResponse } from 'next/server';

// Rate limit configuration per route
export interface RateLimitConfig {
  maxRequests: number;  // Maximum requests allowed
  windowMs: number;     // Time window in milliseconds
}

// Pre-configured rate limits for different API routes
export const rateLimits = {
  // Career applications: 3 per hour (expensive - file upload + 2 emails)
  careersApplication: { maxRequests: 3, windowMs: 60 * 60 * 1000 },
  // Partner inquiries: 5 per hour (B2B - less frequent)
  partnerInquiry: { maxRequests: 5, windowMs: 60 * 60 * 1000 },
  // Quote requests: 10 per hour (2 emails per request)
  quote: { maxRequests: 10, windowMs: 60 * 60 * 1000 },
  // Contact form: 15 per hour (most common use case)
  contact: { maxRequests: 15, windowMs: 60 * 60 * 1000 },
} as const;

// Track request counts per IP
interface RequestRecord {
  count: number;
  resetTime: number;
}

// Create a cache instance for storing request counts
// Max 500 unique IPs tracked, entries expire after 1 hour
const cache = new LRUCache<string, RequestRecord>({
  max: 500,
  ttl: 60 * 60 * 1000, // 1 hour TTL
});

/**
 * Get client IP address from request
 * Handles various proxy headers used by Vercel, Cloudflare, etc.
 */
function getClientIP(request: NextRequest): string {
  // Try various headers in order of preference
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }

  // Vercel-specific header
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Cloudflare-specific header
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Fallback to a default identifier
  return 'unknown';
}

/**
 * Check if a request should be rate limited
 * Returns null if allowed, or a NextResponse if rate limited
 */
export function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig,
  routeIdentifier: string
): NextResponse | null {
  const ip = getClientIP(request);
  const key = `${routeIdentifier}:${ip}`;
  const now = Date.now();

  // Get existing record or create new one
  let record = cache.get(key);

  if (!record || now > record.resetTime) {
    // No record or window expired - create new record
    record = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    cache.set(key, record);
    return null; // Allow request
  }

  // Increment count
  record.count++;
  cache.set(key, record);

  // Check if rate limited
  if (record.count > config.maxRequests) {
    const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);

    return NextResponse.json(
      {
        error: 'Too many requests. Please try again later.',
        retryAfter: retryAfterSeconds,
      },
      {
        status: 429,
        headers: {
          'Retry-After': retryAfterSeconds.toString(),
          'X-RateLimit-Limit': config.maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': Math.ceil(record.resetTime / 1000).toString(),
        },
      }
    );
  }

  // Request allowed
  return null;
}

/**
 * Create rate limit response headers for successful requests
 * Call this to add rate limit info to successful responses
 */
export function getRateLimitHeaders(
  request: NextRequest,
  config: RateLimitConfig,
  routeIdentifier: string
): Record<string, string> {
  const ip = getClientIP(request);
  const key = `${routeIdentifier}:${ip}`;
  const record = cache.get(key);

  if (!record) {
    return {
      'X-RateLimit-Limit': config.maxRequests.toString(),
      'X-RateLimit-Remaining': config.maxRequests.toString(),
    };
  }

  const remaining = Math.max(0, config.maxRequests - record.count);

  return {
    'X-RateLimit-Limit': config.maxRequests.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(record.resetTime / 1000).toString(),
  };
}
