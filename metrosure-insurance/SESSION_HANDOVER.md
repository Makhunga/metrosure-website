# Metrosure Insurance Brokers - Session Handover

**Updated:** 20 January 2026 (Session 131)
**Stack:** Next.js 16 | React 19 | TypeScript 5 | Tailwind CSS 4 | Framer Motion 12 | shadcn/ui
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 45 (38 pages + 7 API routes)
- **Last Build:** 20 January 2026
- **Branch:** `main` (all PRs merged)

---

## CURRENT SESSION (131) - 20 Jan 2026

### CSP Fix for Google Fonts (Complete)

**Issue:** Material Symbols icons not loading on deployed Vercel site after Session 130 security hardening.

**Root Cause:** CSP header blocked Google Fonts:
- `style-src` didn't include `https://fonts.googleapis.com` (CSS)
- `font-src` didn't include `https://fonts.gstatic.com` (font files)

**Fix:** Updated `vercel.json` CSP header to allow Google Fonts sources.

---

## PREVIOUS SESSION (130) - 20 Jan 2026

### Security Hardening (Complete)

**Branches:** `security/email-xss-fix`, `security/input-validation-limits`
**PRs:** #3 and #4 (both merged)

| Fix | Severity | PR | Details |
|-----|----------|-----|---------|
| **Email Template XSS** | HIGH | #3 | Added `escapeHtml()` utility to prevent XSS injection in email templates |
| **Content-Security-Policy** | MEDIUM | #3 | Added CSP header to `vercel.json` |
| **Input Validation Limits** | MEDIUM | #4 | Added max length validation to all Zod schemas |

### Files Modified

**PR #3 - XSS Protection:**
- `src/lib/email.ts` - Added `escapeHtml()` utility function
- `src/app/api/contact/route.ts` - Escape name, message, companyName, otherReason
- `src/app/api/quote/route.ts` - Escape firstName, lastName, companyName
- `src/app/api/partner-inquiry/route.ts` - Escape companyName, contactName, message
- `src/app/api/corporate-inquiry/route.ts` - Escape companyName, contactName, message
- `src/app/api/careers-application/route.ts` - Escape fullName, cvFilename
- `vercel.json` - Added Content-Security-Policy header

**PR #4 - Input Validation:**
- `src/lib/validationSchemas.ts` - Added LIMITS constant, applied max lengths to all fields

### Security Implementation Details

**escapeHtml utility:**
```typescript
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
```

**Validation Limits:**
| Field Type | Max Length |
|------------|------------|
| Personal names | 100 chars |
| Company names | 200 chars |
| Subject/topics | 200 chars |
| Job titles | 100 chars |
| Cities/provinces | 100 chars |
| Short text fields | 500 chars |
| Messages | 2,000 chars |
| Phone numbers | 20 chars |
| Area codes | 10 chars |

**CSP Header (Updated Session 131):**
```
default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel-insights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://*.vercel-insights.com https://*.vercel-analytics.com
```

### Narrative B2B Clarity (Merged)

**Branch:** `feature/narrative-b2b-clarity` (Sessions 124-129)
**PR:** #2 (merged)

Complete narrative revamp to accurately reflect Metrosure's B2B broker/marketer business model. See `docs/NARRATIVE_REVAMP.md` for full details.

### Verification Completed
- ✅ Build passes
- ✅ All 4 PRs merged to main (#1, #2, #3, #4)
- ✅ XSS test: `<script>alert('xss')</script>` in name field → shows `&lt;script&gt;` (escaped)

### Post-Deploy Verification (TODO)
- [ ] Check https://securityheaders.com/ for CSP validation
- [ ] Verify forms accept/reject input at length limits
- [ ] Test email delivery with special characters

---

## ALL OPEN WORK MERGED

| PR | Title | Status |
|----|-------|--------|
| #4 | Security: max length validation | ✅ Merged |
| #3 | Security: XSS protection + CSP header | ✅ Merged |
| #2 | Narrative: B2B broker clarity (Sessions 124-129) | ✅ Merged |
| #1 | Fix: restore banner font colour | ✅ Merged |

**No pending branches or PRs.**

---

## NEXT SESSION PRIORITIES

### Priority 1: Production Readiness
| Task | Status | Notes |
|------|--------|-------|
| Remove Development Banner | Pending | `src/components/DevelopmentBanner.tsx` - remove before go-live |
| Cross-browser testing | Pending | Chrome, Firefox, Edge, Safari |
| Mobile responsiveness audit | Pending | Test on real devices (iOS Safari, Android Chrome) |
| Post-deploy CSP verification | Pending | https://securityheaders.com/ |

### Priority 2: Portal Architecture Review
- Share `docs/PORTAL_ARCHITECTURE.md` with stakeholders
- Collect feedback before beginning implementation
- Portal work paused until architecture approved

### Priority 3: Job Service Activation (When Ready)
- Client creates Workable account at https://www.workable.com/
- Generate API token, set `WORKABLE_API_TOKEN` and `WORKABLE_SUBDOMAIN` in Vercel
- Alternative: Indeed Publisher API at https://ads.indeed.com/jobroll/

---

## RECOMMENDATIONS FOR NEXT SESSION

### Security Follow-up
1. **Rate Limiting Review** - Consider adding rate limiting to the escapeHtml function calls if forms are being abused
2. **CSRF Tokens** - Consider adding CSRF protection to forms (currently relies on SameSite cookies)
3. **Subresource Integrity** - Add SRI hashes to external scripts if any are added

### UI/UX Improvements Identified
| Improvement | Priority | Notes |
|-------------|----------|-------|
| ARIA attributes for header dropdowns | Medium | Add `aria-haspopup`, `aria-expanded` |
| Breadcrumbs component | Low | For sub-pages (insurance/life, careers/job-title) |
| Touch targets audit | Medium | Ensure 44px minimum for mobile |
| Progress indicators | Low | For multi-step forms |

### Business Process Improvements
| Improvement | Priority | Notes |
|-------------|----------|-------|
| Google Analytics 4 | High | Conversion tracking for quote forms |
| UTM parameter capture | Medium | Track campaign effectiveness |
| CRM integration | Medium | HubSpot or Pipedrive for lead management |

### Performance Monitoring
- Consider adding Sentry for error tracking
- Set up Vercel Analytics for Core Web Vitals monitoring
- Review bundle size after narrative changes

---

## KEY FILE LOCATIONS

### Security (Session 130)
| File | Purpose |
|------|---------|
| `src/lib/email.ts` | `escapeHtml()` utility for XSS prevention |
| `src/lib/validationSchemas.ts` | Zod schemas with LIMITS constant |
| `vercel.json` | Security headers (CSP, X-Frame-Options, etc.) |

### Narrative Documentation
| File | Purpose |
|------|---------|
| `docs/NARRATIVE_REVAMP.md` | Complete narrative change documentation |
| `docs/PORTAL_ARCHITECTURE.md` | Portal architecture planning |

### shadcn/ui
| File | Purpose |
|------|---------|
| `components.json` | shadcn/ui configuration |
| `src/components/ui/` | All shadcn components |
| `src/lib/utils.ts` | cn() utility for class merging |

### Core Configuration
| File | Purpose |
|------|---------|
| `CLAUDE.md` | Complete style guide, coding conventions |
| `src/data/` | Centralised data files |
| `src/lib/` | Utilities (email, validation, rate limiting) |

---

## EMAIL ROUTING

| Form | Recipient | CC |
|------|-----------|-----|
| Contact (B2C) | `info@metrosuregroup.co.za` | — |
| Contact (B2B) | `clients@metrosureconsult.co.za` | — |
| Quote (B2C) | `info@metrosuregroup.co.za` | — |
| Quote (B2B) | `clients@metrosureconsult.co.za` | — |
| Partner Inquiry | `clients@metrosureconsult.co.za` | — |
| Corporate Inquiry | `clients@metrosureconsult.co.za` | — |
| Careers Application | `hr@metrosureconsult.co.za` | `lazola@metrosureconsult.co.za` |
| Calculator Results | *(user's email only)* | — |

---

## RATE LIMITS

| Route | Limit |
|-------|-------|
| `/api/careers-application` | 3/hour |
| `/api/partner-inquiry` | 5/hour |
| `/api/corporate-inquiry` | 5/hour |
| `/api/calculator/email-results` | 10/hour |
| `/api/quote` | 10/hour |
| `/api/contact` | 15/hour |

---

## FEATURE TOGGLES

| Feature | Status | Location |
|---------|--------|----------|
| Cookie consent | Disabled | `src/components/ClientLayout.tsx` |
| Development Banner | **Active** (remove before go-live) | `src/components/DevelopmentBanner.tsx` |
| Login page | Non-functional (redirects to homepage) | `src/app/login/page.tsx` |
| Partner Testimonials | Stashed | `src/app/partners/page.tsx` |
| Client Portal | Removed (Session 123) | — |

---

## RECENT SESSION HISTORY

| Session | Date | Focus | Key Outcomes |
|---------|------|-------|--------------|
| **131** | 20 Jan | **CSP Fix** | Fixed Google Fonts blocking - Material Symbols icons now load |
| **130** | 20 Jan | **Security Hardening** | XSS fix (escapeHtml), CSP header, input validation limits; all PRs merged |
| 127 | 20 Jan | Quote Form & Calculator | Removed pricing display, broker-first language |
| 126 | 20 Jan | Narrative Phase 3 | Insurance pages updated, pricing removed |
| 125 | 20 Jan | Narrative Phase 2 | High-traffic pages (Homepage, Partners, Corporate) |
| 124 | 20 Jan | Narrative B2B Clarity | Initial soft changes, portal architecture docs |
| 123 | 19 Jan | Portal Removal | Clean slate for proper architecture planning |

---

## QUICK REFERENCE

### Commands
```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build (must pass before commit)
```

### Contact Info (Single Source: `src/data/companyInfo.ts`)
| Type | Value |
|------|-------|
| **Head Office** | 32 Stephen Dlamini Road, Musgrave, Durban, 4001 |
| **Phone** | +27 31 301 1192 |
| **WhatsApp** | +27 67 120 9527 |
| **Email (B2C)** | info@metrosuregroup.co.za |
| **Email (B2B)** | clients@metrosureconsult.co.za |
| **FSP Number** | 47089 |

---

*For detailed coding conventions, patterns, and historical lessons, see `CLAUDE.md`.*
