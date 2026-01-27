# Metrosure Insurance Brokers - Session Handover

**Updated:** 27 January 2026 (Session 145)
**Stack:** Next.js 16.1.4 | React 19 | TypeScript 5 | Tailwind CSS 4 | Framer Motion 12 | shadcn/ui
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 54 pages + 7 API routes
- **Last Build:** 27 January 2026
- **Branch:** `main`

---

## CURRENT SESSION (145) - 27 Jan 2026

### Broker Narrative Fix: Home & Partners Pages

**Goal:** Correct content that incorrectly positions Metrosure as a direct insurer/product provider. Metrosure is a broker/intermediary (FSP 47089), outsourced sales & marketing, outbound call centre services, and financial services facilitator. Both Metrosure and its agents earn commission from partner insurers.

### Completed Tasks

| Task | Status | Details |
|------|--------|---------|
| **Products.tsx** | ✅ | Updated Life & Funeral, Health & Income descriptions to clarify partner relationship |
| **Features.tsx** | ✅ | In-Store Campaigns: "policy sold" → "product arranged through our partners" |
| **PartnersCTA.tsx** | ✅ | Emphasise trained teams arranging products from partners + commission earning |
| **PartnersHero.tsx** | ✅ | "sell insurance" → "arrange financial products from our partners" |
| **opportunities.ts** | ✅ | Retail Partner: "hosting our sales teams who arrange financial products from our partners" |
| **partnerServices.ts** | ✅ | Credit Facility, Device Leasing, Commission FAQ updated with partner language |
| **OG Image Removal** | ✅ | Temporarily removed og-image.png/html and all metadata references (13 files) |
| **Build Verification** | ✅ | All changes compile successfully |
| **Commit & Push** | ✅ | `4d258c0` (broker narrative), `4f09e51` (og-image removal) |

### Key Language Changes Applied

| Avoid | Use Instead |
|-------|-------------|
| "We sell insurance" | "We arrange/facilitate products from partner providers" |
| "Our insurance products" | "Financial products from our partners" |
| "We offer" | "We connect you with" / "We arrange" |
| "Policy sold" | "Product arranged through our partners" |
| Overuse of "insurance" | "Financial products" (reflects broader offering: credit, leasing, cover) |

### Files Modified

| File | Changes |
|------|---------|
| `src/components/Products.tsx` | 3 text changes (Life & Funeral, Health & Income, section description) |
| `src/components/Features.tsx` | 1 text change (In-Store Campaigns) |
| `src/components/PartnersCTA.tsx` | 1 text change (subheadline) |
| `src/components/partners/PartnersHero.tsx` | 1 text change (subheadline) |
| `src/data/opportunities.ts` | 1 text change (Retail Partner description) |
| `src/data/partnerServices.ts` | 3 text changes (Credit Facility, Device Leasing, Commission FAQ) |
| `src/app/layout.tsx` | Removed og-image references |
| `src/app/*/layout.tsx` & `page.tsx` | Removed og-image references (12 additional files) |
| `public/og-image.png` | Deleted |
| `public/og-image.html` | Deleted |

### Blockers / Issues

| Issue | Status | Notes |
|-------|--------|-------|
| OG Image | Deferred | Temporarily removed; needs proper design before re-adding |
| Untracked team photos | Pending | `public/images/metrosure-team-pic*.webp` not committed (separate task) |

### Skipped / Deferred Tasks

| Task | Reason | Notes |
|------|--------|-------|
| About page narrative check | Next session | Priority for Session 146 |
| FAQ narrative audit | Next session | Check all FAQ data files for broker compliance |
| OG Image redesign | Design needed | Awaiting proper branded image |

---

## NEXT SESSION PRIORITIES (Session 146)

### Priority 1: Broker Narrative Audit - Remaining Pages (CRITICAL)

Audit and fix broker narrative on remaining important pages:

| Page/File | Status | Key Areas to Check |
|-----------|--------|-------------------|
| `src/app/about/page.tsx` | Pending | Mission, values, company description |
| `src/components/about/*.tsx` | Pending | All About page sections |
| `src/data/faqs.ts` | Pending | All FAQ answers for broker compliance |
| `src/data/claims.ts` | Pending | Claims FAQs - ensure "we support/guide" not "we handle" |
| `src/data/corporateServices.ts` | Pending | Corporate descriptions and FAQs |
| `src/components/contact/FAQ.tsx` | Pending | Contact page FAQ content |
| `src/app/insurance/*.tsx` | Verify | Insurance product pages (already fixed in Session 141) |

**Audit Checklist:**
- [ ] No text claims Metrosure "sells" insurance directly
- [ ] No text claims Metrosure "handles" claims (we support/guide/advocate)
- [ ] No text claims Metrosure "offers" products (we arrange/facilitate/connect)
- [ ] Commission earning is explicit where relevant
- [ ] Products come from "partners" not from Metrosure directly
- [ ] Use "financial products" not just "insurance" to reflect broader offering

### Priority 2: OG Image

| Task | Notes |
|------|-------|
| Design proper OG image | 1200x630px, branded, professional |
| Re-add to metadata | Once image is ready |

### Priority 3: Production Readiness

| Task | Status | Notes |
|------|--------|-------|
| Remove Development Banner | Pending | `src/components/DevelopmentBanner.tsx` |
| Cross-browser testing | Pending | Chrome, Firefox, Edge, Safari |
| Mobile responsiveness audit | Pending | Test on real devices |

### Priority 4: Domain & Search Console (Post-Deployment)

| Task | Status | Notes |
|------|--------|-------|
| Vercel Domain Setup | Pending | Add `metrosuregroup.co.za` in Dashboard → Settings → Domains |
| DNS Configuration | Pending | A: `76.76.21.21`, CNAME www: `cname.vercel-dns.com` |
| Submit Sitemap | Pending | Google Search Console → Indexing → Sitemaps |

---

## RECOMMENDATIONS FOR NEXT SESSION

### Immediate Actions
1. **Run `npm run build`** - Verify build passes before any new changes
2. **Grep for problematic terms** - Search for "we sell", "we offer insurance", "we handle claims" across all files
3. **Check FAQ data files first** - These are high-impact, user-facing content

### Suggested Search Patterns
```bash
# Find potentially problematic broker language
grep -rn "we sell" src/
grep -rn "we offer insurance" src/
grep -rn "we handle claims" src/
grep -rn "our insurance" src/
grep -rn "our products" src/  # Check context
```

### Narrative Guidelines Summary
- Metrosure is a **broker/intermediary** (FSP 47089)
- We **connect**, **arrange**, **facilitate** - never "sell" or "offer" directly
- Products come from **partners** and **leading insurers**
- For claims: we **support**, **guide**, **advocate** - never "handle" or "process"
- Commission earning should be **explicit** - retailers and agents both earn commission
- Use **"financial products"** over just "insurance" to reflect credit, leasing, cover

---

## PREVIOUS SESSION (144) - 26 Jan 2026

### SEO: WordPress Migration Redirects

**Goal:** Configure 301 redirects to preserve SEO link equity when migrating from existing WordPress site.

### Completed Tasks

| Task | Status | Details |
|------|--------|---------|
| **301 Redirects** | ✅ | Added 10 permanent redirects in `next.config.ts` |
| **Build Verification** | ✅ | All redirects validated, build passes |
| **Redirect Testing** | ✅ | All 5 URL patterns return HTTP 308 (permanent redirect) |
| **Commit & Push** | ✅ | `6b00d04` pushed to main |

### Redirect Mapping

| WordPress URL | → Next.js URL | Status |
|---------------|---------------|--------|
| `/about-us` | `/about` | ✅ 308 |
| `/contact-us` | `/contact` | ✅ 308 |
| `/metrosure-insurance` | `/` | ✅ 308 |
| `/metrosure-consult` | `/corporate` | ✅ 308 |
| `/blog-grid-2-columns-right-sidebar` | `/` | ✅ 308 |

---

## PREVIOUS SESSION (142) - 25 Jan 2026

### Production Readiness - Documentation & Package Updates

| Task | Status | Details |
|------|--------|---------|
| **Deployment Checklist** | ✅ | Created `docs/DEPLOYMENT.md` with full deployment procedures |
| **Package Updates** | ✅ | Updated 8 packages to latest patch versions |

---

## PREVIOUS SESSION (141) - 25 Jan 2026

### Broker Narrative Consistency Audit & Fixes

**Goal:** Audit and fix text that incorrectly positions Metrosure as an insurer rather than a broker/intermediary.

### Completed Fixes

| File | Line | Change |
|------|------|--------|
| `src/app/insurance/auto/page.tsx` | 95 | "Priority claims handling" → "Priority claims support" |
| `src/app/insurance/auto/page.tsx` | 103 | "Claims handled by real people..." → "Claims support from real people..." |
| `src/app/insurance/business/page.tsx` | 106 | "Fast claims handling..." → "Fast claims support..." |
| `src/app/insurance/life/page.tsx` | 133 | "we can often approve you" → "you can often be approved" |
| `src/app/claims/ClaimsPageClient.tsx` | 98-99 | "ensure your claim is processed..." → "guide you through the process..." |
| `src/app/api/corporate-inquiry/route.ts` | 207 | "We handle claims..." → "We guide claims submissions..." |
| `src/components/corporate/CorporateServices.tsx` | 51 | "we handle the complexity" → "we arrange comprehensive solutions..." |

---

## DEFERRED TASKS

### OG Image Enhancement

| Task | Status | Notes |
|------|--------|-------|
| OG Image Redesign | Deferred | Removed temporarily; awaiting proper branded design |
| Page-Specific OG Images | Skipped | Using no OG image until proper design available |

### Location Pages (Future Session)

| Task | Reason | Notes |
|------|--------|-------|
| Location-specific pages | Time | `/locations/durban`, etc. with LocalBusiness schema |
| Service page geo-optimisation | Time | Add location keywords to insurance pages |

---

## RECENT SESSION HISTORY

| Session | Date | Focus | Key Outcomes |
|---------|------|-------|--------------|
| **145** | 27 Jan | **Broker Narrative: Home & Partners** | Fixed 10 text instances across 6 files; removed og-image temporarily |
| **144** | 26 Jan | SEO: WordPress Redirects | Added 301 redirects for WordPress migration (5 URL patterns) |
| **142** | 25 Jan | Production Readiness | Created deployment checklist, updated 8 packages |
| **141** | 25 Jan | Broker Narrative Audit | Fixed 7 text instances across 6 files (insurance pages, claims, corporate) |
| **140** | 25 Jan | Testimonials Carousel | Infinite loop implementation, testimonials aligned to broker narrative |
| **139** | 25 Jan | UI: Banner Restyle | Restyled development banner to Glassdoor pattern |

---

## SEO IMPLEMENTATION STATUS

### Social Media Metadata

| Platform | Implementation | Status |
|----------|----------------|--------|
| OpenGraph | og:title, og:description, og:url | ✅ All pages (images removed temporarily) |
| Twitter | summary_large_image, site handle | ✅ Root + pages (images removed temporarily) |
| LinkedIn | Uses OpenGraph tags | ✅ Automatic |

### Structured Data Coverage

| Schema Type | Pages | Status |
|-------------|-------|--------|
| InsuranceAgency | Root layout | ✅ Complete |
| BreadcrumbList | Contact, About, Help, Partners, Corporate, Calculator, Careers | ✅ Complete |
| FAQPage | Contact, Help, Partners | ✅ Complete |
| JobPosting | /careers/[slug] | ✅ Complete |

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
