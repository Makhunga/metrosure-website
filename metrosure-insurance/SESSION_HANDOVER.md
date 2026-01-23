# Metrosure Insurance Brokers - Session Handover

**Updated:** 23 January 2026 (Session 135)
**Stack:** Next.js 16 | React 19 | TypeScript 5 | Tailwind CSS 4 | Framer Motion 12 | shadcn/ui
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 52 pages + 7 API routes
- **Last Build:** 23 January 2026
- **Branch:** `main`

---

## CURRENT SESSION (135) - 23 Jan 2026

### SEO Phase 3: Social Media & Schema Enhancements

**Goal:** Complete comprehensive SEO/social media audit for launch readiness, implementing structured data enhancements and social sharing optimisation.

### Completed Tasks

| Task | Status | Details |
|------|--------|---------|
| **Add Social URLs to Schema** | ✅ | Added Facebook, LinkedIn, Instagram to `sameAs` array in root InsuranceAgency schema |
| **Add Twitter Handle** | ✅ | Added `site: "@metrosure_insurance_"` to root metadata |
| **Home Page Metadata** | ✅ | Added page-specific metadata with targeted keywords ("Trusted SA Insurance Since 2013") |
| **Contact Page Schemas** | ✅ | Added Breadcrumb + FAQ schema (7 FAQs) |
| **About Page Schema** | ✅ | Added Breadcrumb schema via layout |
| **Help Page Schema** | ✅ | Added Breadcrumb schema (FAQ already existed) |
| **Coverage Calculator** | ✅ | Created new layout.tsx with metadata + Breadcrumb schema |
| **Partners Page Schema** | ✅ | Added Breadcrumb schema (FAQ already existed) |
| **Corporate Page Schema** | ✅ | Added Breadcrumb schema via layout |
| **Build Verification** | ✅ | All 52 pages generated successfully |

### Files Modified

| File | Changes |
|------|---------|
| `src/app/layout.tsx` | Added sameAs URLs (social profiles), Twitter handle |
| `src/app/page.tsx` | Added metadata export with home-specific keywords |
| `src/app/contact/page.tsx` | Added FAQ + Breadcrumb schemas |
| `src/app/about/layout.tsx` | Added Breadcrumb schema |
| `src/app/help/page.tsx` | Added Breadcrumb schema |
| `src/app/tools/coverage-calculator/layout.tsx` | **NEW** - metadata + Breadcrumb schema |
| `src/app/partners/page.tsx` | Added Breadcrumb schema |
| `src/app/corporate/layout.tsx` | Added Breadcrumb schema |
| `public/sitemap.xml` | Regenerated with updated timestamps |

### Commit

```
72fce6a feat(seo): complete phase 3 SEO audit - social media & schema enhancements
```

---

## DEFERRED TASKS

### Phase D: OG Image Enhancement (User Decision Pending)

| Task | Status | Notes |
|------|--------|-------|
| OG Image Redesign | Deferred | Current image functional (1200x630px). Awaiting design direction from stakeholder. |
| Page-Specific OG Images | Skipped | Using generic OG image across all pages for launch |

### Location Pages (Future Session)

| Task | Reason | Notes |
|------|--------|-------|
| Location-specific pages | Time | `/locations/durban`, etc. with LocalBusiness schema |
| Service page geo-optimisation | Time | Add location keywords to insurance pages |

### Technical SEO (Post-Deployment)

| Task | Reason | Notes |
|------|--------|-------|
| Core Web Vitals check | Post-deploy | Run PageSpeed Insights on key pages |
| Canonical URL verification | Post-deploy | Ensure no self-referencing loops |

---

## NEXT SESSION PRIORITIES

### Priority 1: SEO Validation Testing (Requires Deployment)

Test deployed site with external validators:

| Validator | URL | Pages to Test |
|-----------|-----|---------------|
| Google Rich Results Test | https://search.google.com/test/rich-results | `/`, `/contact`, `/help`, `/careers/*` |
| Facebook Sharing Debugger | https://developers.facebook.com/tools/debug/ | `/` |
| Twitter Card Validator | https://cards-dev.twitter.com/validator | `/` |
| LinkedIn Post Inspector | https://www.linkedin.com/post-inspector/ | `/partners`, `/corporate` |

### Priority 2: Production Readiness (Critical)

| Task | Status | Notes |
|------|--------|-------|
| Remove Development Banner | Pending | `src/components/DevelopmentBanner.tsx` |
| Cross-browser testing | Pending | Chrome, Firefox, Edge, Safari |
| Mobile responsiveness audit | Pending | Test on real devices |
| Post-deploy CSP verification | Pending | https://securityheaders.com/ |

### Priority 3: Location Pages

Create location landing pages with LocalBusiness schema:
- `/locations/durban` (Head Office)
- `/locations/pietermaritzburg`
- `/locations/pretoria`
- `/locations/boksburg`

---

## RECOMMENDATIONS

### SEO Enhancements (Future Consideration)

1. **AI Search (SGE) Readiness:**
   - Review FAQ sections for natural language questions matching user search intent
   - Consider question-based headers ("What insurance do I need?" vs "Coverage Types")

2. **E-E-A-T Signals:**
   - Add author information to any blog/content pages if created
   - Consider adding team credentials/qualifications to About page

3. **Semantic Keywords:**
   - Ensure coverage of semantic variations in content:
     - "insurance broker Durban" / "Durban insurance company"
     - "car insurance South Africa" / "motor vehicle cover SA"
     - "employee benefits broker" / "corporate insurance solutions"

### OG Image Design Brief (When Ready)

For the redesigned OG image, consider:
- Metrosure logo prominently displayed
- Tagline visible at small sizes (social previews are often thumbnail-sized)
- Brand colours: Primary red #BF0603, Secondary maroon #690025
- Simple, uncluttered design for legibility
- Text readable at 200px width preview size

---

## RECENT SESSION HISTORY

| Session | Date | Focus | Key Outcomes |
|---------|------|-------|--------------|
| **135** | 23 Jan | **SEO Phase 3** | Social URLs, Twitter handle, home metadata, breadcrumb schemas for 6 pages, FAQ schema for Contact |
| **134** | 22 Jan | UI Refinement | Fixed background color on Careers page contact card |
| **133** | 22 Jan | SEO Phase 2 | Image alt text fixes, meta description optimization, Help page FAQ schema |
| **132** | 21 Jan | SEO Research | Sitemap cleanup, FAQ/Breadcrumb schema utilities |
| **131** | 20 Jan | CSP Fix | Fixed Google Fonts blocking |
| **130** | 20 Jan | Security | XSS fix, CSP header, input validation limits |

---

## SEO IMPLEMENTATION STATUS

### Structured Data Coverage

| Schema Type | Pages | Status |
|-------------|-------|--------|
| InsuranceAgency | Root layout | ✅ Complete (with sameAs URLs) |
| BreadcrumbList | Contact, About, Help, Partners, Corporate, Calculator, Careers | ✅ Complete |
| FAQPage | Contact, Help, Partners | ✅ Complete |
| JobPosting | /careers/[slug] | ✅ Complete |

### Social Media Metadata

| Platform | Implementation | Status |
|----------|----------------|--------|
| OpenGraph | og:title, og:description, og:image, og:url | ✅ All pages |
| Twitter | summary_large_image, site handle | ✅ Root + pages |
| LinkedIn | Uses OpenGraph tags | ✅ Automatic |

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

### Social Media

| Platform | URL |
|----------|-----|
| Facebook | https://www.facebook.com/people/Metrosure-Insurance-Brokers/100083163880679/ |
| LinkedIn | https://za.linkedin.com/company/metrosure |
| Instagram | https://www.instagram.com/metrosure_insurance_/ |
| Twitter Handle | @metrosure_insurance_ |
