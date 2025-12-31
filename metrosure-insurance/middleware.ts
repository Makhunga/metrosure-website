import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Routes that are under development and should redirect to /under-development in production.
 * Remove routes from this list when they're ready for production.
 */
const underDevelopmentRoutes = [
  '/insurance/auto',
  '/insurance/home',
  '/insurance/life',
  '/insurance/business',
  '/legal',
  '/claims',
  '/policies',
  '/tools/coverage-calculator',
];

// Job detail pages pattern (matches /careers/[slug] but not /careers itself)
const jobDetailPattern = /^\/careers\/[^/]+$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only redirect in production
  if (process.env.NODE_ENV === 'production') {
    // Check if current path matches any under-development route
    const isUnderDevelopment = underDevelopmentRoutes.some(
      route => pathname === route || pathname.startsWith(route + '/')
    );

    // Check if it's a job detail page (e.g., /careers/insurance-sales-consultant)
    const isJobDetailPage = jobDetailPattern.test(pathname);

    if (isUnderDevelopment || isJobDetailPage) {
      const url = new URL('/under-development', request.url);
      // Pass the original path as a query param for context
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/insurance/:path*',
    '/legal',
    '/claims',
    '/policies',
    '/tools/:path*',
    '/careers/:slug',
  ],
};
