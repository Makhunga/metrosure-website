# Metrosure Insurance Brokers - Session Handover

**Updated:** 21 January 2026 (Session 132)
**Stack:** Next.js 16 | React 19 | TypeScript 5 | Tailwind CSS 4 | Framer Motion 12 | shadcn/ui
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 52 pages + 7 API routes
- **Last Build:** 21 January 2026
- **Branch:** `main`

---

## CURRENT SESSION (132) - 21 Jan 2026

### SEO Research & Setup (Complete)

**Goal:** Ensure Metrosure website is in peak SEO form before launch, with focus on findability for Careers and Partners pages.

### Completed Tasks

| Task | Status | Details |
|------|--------|---------|
| **Sitemap Cleanup** | ✅ | Excluded `/playground/*`, `/careers/test/*`, `/under-development`, `/home-alt`, `/login` |
| **FAQPage Schema Utility** | ✅ | Created `src/lib/generateFAQSchema.ts` |
| **BreadcrumbList Schema Utility** | ✅ | Created `src/lib/generateBreadcrumbSchema.ts` |
| **Job Schema Enhancement** | ✅ | Added estimated salary ranges for Google Jobs ranking |
| **Partners Page SEO** | ✅ | Added FAQPage schema (8 FAQs) |
| **Corporate Page SEO** | ✅ | Added FAQPage schema, breadcrumbs, full metadata |
| **Claims Page SEO** | ✅ | Refactored to Server Component, added FAQ schema (6 FAQs), breadcrumbs, full metadata |

### Files Created

| File | Purpose |
|------|---------|
| `src/lib/generateFAQSchema.ts` | Generates FAQPage JSON-LD for Google rich results |
| `src/lib/generateBreadcrumbSchema.ts` | Generates BreadcrumbList JSON-LD for breadcrumb rich results |
| `src/app/claims/ClaimsPageClient.tsx` | Client component for claims page interactivity |

### Files Modified

| File | Changes |
|------|---------|
| `next-sitemap.config.js` | Added exclusions for dev/test pages in sitemap and robots.txt |
| `src/lib/generateJobSchema.ts` | Added salary estimates by job category for Google Jobs |
| `src/app/partners/page.tsx` | Added FAQPage schema import and JSON-LD script |
| `src/app/corporate/page.tsx` | Added metadata, FAQPage schema, BreadcrumbList schema |
| `src/app/claims/page.tsx` | Refactored to Server Component with schemas and metadata |
| `src/data/claims.ts` | Added `claimsFAQs` and `claimsSEO` exports |
| `src/app/careers/[slug]/page.tsx` | Added JobPosting + BreadcrumbList schemas |

### Salary Estimates (Job Schema)

| Category | Min (ZAR) | Max (ZAR) |
|----------|-----------|-----------|
| Sales | R8,000 | R25,000 |
| Call Centre | R7,500 | R15,000 |
| Admin | R10,000 | R18,000 |
| Trainee | R6,000 | R10,000 |

### Schema Implementation Summary

| Page | FAQPage | Breadcrumbs | Metadata |
|------|---------|-------------|----------|
| `/partners` | ✅ 8 FAQs | - | Already had |
| `/corporate` | ✅ 8 FAQs | ✅ | ✅ Added |
| `/claims` | ✅ 6 FAQs | ✅ | ✅ Added |
| `/careers/[slug]` | - | ✅ | Already had |

---

## DEFERRED TASKS (Session 132)

### Phase 2: Medium Priority (Deferred to Future Session)

| Task | Reason | Notes |
|------|--------|-------|
| Location-specific pages | Time | `/locations/durban`, `/locations/pietermaritzburg`, etc. with LocalBusiness schema |
| Service page geo-optimisation | Time | Add location keywords to insurance pages |
| Partners page content enhancement | Time | Add testimonials, partner success stories |
| Careers page content enhancement | Time | Add "Life at Metrosure" section, employee testimonials |

### Phase 3: Technical SEO Audit (Deferred)

| Task | Reason | Notes |
|------|--------|-------|
| Image alt text audit | Time | Scan all components for missing/generic alt text |
| Meta description review | Time | Verify 150-160 chars, unique per page |
| Heading hierarchy audit | Time | Ensure proper H1 → H2 → H3 structure |
| Core Web Vitals check | Time | Run PageSpeed Insights on key pages |

### Phase 4: External SEO Setup (Documentation Needed)

| Task | Notes |
|------|-------|
| Google Business Profile setup | Create guide for client - 5 locations |
| Google Search Console setup | Domain verification, sitemap submission |
| Citation building checklist | Yelp SA, Yellow Pages, industry directories |

---

## NEXT SESSION PRIORITIES

### Priority 1: SEO Phase 2 (Recommended)

| Task | Impact | Effort |
|------|--------|--------|
| Image alt text audit | High | 30-60 mins |
| Meta description review | Medium | 20-30 mins |
| Heading hierarchy audit | Medium | 20-30 mins |
| Add FAQ schema to Help page | Medium | 30 mins |

### Priority 2: Production Readiness

| Task | Status | Notes |
|------|--------|-------|
| Remove Development Banner | Pending | `src/components/DevelopmentBanner.tsx` |
| Cross-browser testing | Pending | Chrome, Firefox, Edge, Safari |
| Mobile responsiveness audit | Pending | Test on real devices |
| Post-deploy CSP verification | Pending | https://securityheaders.com/ |

### Priority 3: Location Pages (If Time Permits)

Create location landing pages with LocalBusiness schema:
- `/locations/durban` (Head Office)
- `/locations/pietermaritzburg`
- `/locations/pretoria`
- `/locations/boksburg`

---

## RECOMMENDATIONS

### SEO Quick Wins (High Impact, Low Effort)

1. **Add FAQ schema to Help page** - Already has 100+ FAQs, just needs schema
2. **Create XML sitemap priority tweaks** - Boost careers/partners priorities
3. **Add Review schema** - When partner testimonials are added

### Content Recommendations

1. **Blog/Articles section** - Regular insurance content builds authority
2. **Location-specific content** - "Insurance in Durban", "Financial Services Pretoria"
3. **Partner success stories** - With Review schema for rich results

### Technical Recommendations

1. **Schema validation** - Test at https://validator.schema.org/
2. **Rich results testing** - https://search.google.com/test/rich-results
3. **Mobile-friendly test** - https://search.google.com/test/mobile-friendly

---

## PREVIOUS SESSION (131) - 20 Jan 2026

### CSP Fix for Google Fonts (Complete)

**Issue:** Material Symbols icons not loading on deployed Vercel site.

**Fix:** Updated `vercel.json` CSP header to allow Google Fonts sources.

---

## KEY FILE LOCATIONS

### SEO Utilities (Session 132)

| File | Purpose |
|------|---------|
| `src/lib/generateFAQSchema.ts` | FAQPage JSON-LD generator |
| `src/lib/generateBreadcrumbSchema.ts` | BreadcrumbList JSON-LD generator |
| `src/lib/generateJobSchema.ts` | JobPosting JSON-LD with salary ranges |
| `next-sitemap.config.js` | Sitemap configuration with exclusions |

### Security (Session 130)

| File | Purpose |
|------|---------|
| `src/lib/email.ts` | `escapeHtml()` utility for XSS prevention |
| `src/lib/validationSchemas.ts` | Zod schemas with LIMITS constant |
| `vercel.json` | Security headers (CSP, X-Frame-Options, etc.) |

### Core Configuration

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Complete style guide, coding conventions |
| `src/data/` | Centralised data files |
| `src/lib/` | Utilities (email, validation, SEO, rate limiting) |

---

## STRUCTURED DATA STATUS

| Schema Type | Pages | Status |
|-------------|-------|--------|
| **InsuranceAgency** | `/` (layout) | ✅ Existing |
| **JobPosting** | `/careers/[slug]` | ✅ Enhanced with salary |
| **FAQPage** | `/partners`, `/corporate`, `/claims` | ✅ Session 132 |
| **BreadcrumbList** | `/careers/[slug]`, `/corporate`, `/claims` | ✅ Session 132 |
| **LocalBusiness** | (not yet) | 📋 Planned for location pages |
| **Review** | (not yet) | 📋 Planned for testimonials |

---

## SITEMAP STATUS

**Production URLs:** 27 (clean, no dev pages)

**Excluded:**
- `/playground/*`
- `/careers/test/*`
- `/under-development`
- `/home-alt`
- `/login`
- `/api/*`

---

## RECENT SESSION HISTORY

| Session | Date | Focus | Key Outcomes |
|---------|------|-------|--------------|
| **132** | 21 Jan | **SEO Research & Setup** | Sitemap cleanup, FAQ/Breadcrumb schema utilities, enhanced job schema with salary, schemas added to partners/corporate/claims |
| **131** | 20 Jan | CSP Fix | Fixed Google Fonts blocking |
| **130** | 20 Jan | Security Hardening | XSS fix, CSP header, input validation limits |
| 127 | 20 Jan | Quote Form & Calculator | Removed pricing display, broker-first language |
| 126 | 20 Jan | Narrative Phase 3 | Insurance pages updated |
| 125 | 20 Jan | Narrative Phase 2 | High-traffic pages updated |

---

## QUICK REFERENCE

### Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build (must pass before commit)
```

### SEO Validation URLs

- Schema validation: https://validator.schema.org/
- Rich results: https://search.google.com/test/rich-results
- Mobile-friendly: https://search.google.com/test/mobile-friendly
- Security headers: https://securityheaders.com/

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
