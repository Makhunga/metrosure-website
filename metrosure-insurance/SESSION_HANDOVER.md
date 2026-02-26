# Metrosure Insurance Brokers - Session Handover

**Updated:** 26 February 2026 (Session 155)
**Stack:** Next.js 16.1.4 | React 19 | TypeScript 5 | Tailwind CSS 4 | Framer Motion 12 | shadcn/ui
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 56 pages + 8 API routes
- **Last Build:** 26 February 2026
- **Branch:** `main`

---

## CURRENT SESSION (155) - 26 Feb 2026

### Focus Areas

1. **Fix Google Search Console "Discovered - Currently Not Indexed" (19 URLs)**
2. **Fix JobPosting JSON-LD Schema Validation Errors**

### Completed Tasks

| Task | Status | Commits |
|------|--------|---------|
| **Sitemap Cleanup (25 → 13 URLs)** | ✅ | `4425bb2` |
| **robots.txt Disallow Entries** | ✅ | `4425bb2` |
| **noindex on /under-development** | ✅ | `4425bb2` |
| **JobPosting JSON-LD Schema Fix** | ✅ | `462d626` |

### 1. Google Search Console — Sitemap & Indexing Fix

Google Search Console showed 19 URLs as "Discovered - currently not indexed" (all with "Last crawled: N/A"). Three root causes addressed:

**Cause 1: Middleware-redirected routes in sitemap (Critical)**
8 routes redirect to `/under-development` in production but were listed in the sitemap. Excluded from sitemap and added to robots.txt Disallow:
- `/insurance/auto`, `/insurance/home`, `/insurance/life`, `/insurance/business`
- `/claims`, `/legal`, `/policies`, `/tools/coverage-calculator`

**Cause 2: Non-page assets in sitemap (High)**
3 image generation routes listed as pages. Excluded from sitemap but NOT disallowed in robots.txt (social platforms need to fetch these for preview cards):
- `/apple-icon.png`, `/opengraph-image`, `/twitter-image`

**Cause 3: New domain, low crawl priority (Low)**
9 legitimate live pages just haven't been crawled yet — time will fix this. No action needed.

**Priority map updates:**
- Removed dead routes: `/insurance/auto`, `/insurance/home`, `/insurance/life`, `/insurance/business`, `/claims`
- Added: `/insurance/compare` at 0.8

**Defence-in-depth:** Added `robots: { index: false, follow: false }` to `/under-development` page metadata.

**Files Modified:**

| File | Change |
|------|--------|
| `next-sitemap.config.js` | 11 new excludes, 8 new disallows, priority map update |
| `src/app/under-development/page.tsx` | Added `robots: { index: false, follow: false }` |
| `public/sitemap.xml` | Auto-regenerated (25 → 13 URLs) |
| `public/robots.txt` | Auto-regenerated (8 new Disallow entries) |

**Final Sitemap (13 URLs):**

| URL | Priority |
|-----|----------|
| `/` | 1.0 |
| `/about` | 0.9 |
| `/contact` | 0.9 |
| `/quote` | 0.9 |
| `/careers` | 0.85 |
| `/careers/call-centre-agent` | 0.8 |
| `/careers/sales-agent` | 0.8 |
| `/insurance/compare` | 0.8 |
| `/partners` | 0.8 |
| `/corporate` | 0.7 |
| `/help` | 0.7 |
| `/privacy` | 0.7 |
| `/terms` | 0.7 |

### 2. JobPosting JSON-LD Schema Fix

Google Rich Results Test flagged two issues on job detail pages:

| Issue | Page | Fix |
|-------|------|-----|
| Invalid object type for `jobLocation` | Sales Agent ("All Provinces") | Changed `@type: "Country"` → `@type: "Place"` with full `PostalAddress` |
| Missing `postalCode` and `streetAddress` | Call Centre Agent (KwaZulu-Natal) | Added province-to-city lookup with postal codes |

**Refactored** `src/lib/generateJobSchema.ts`:
- Replaced separate `locationToRegion` function with unified `locationDetails` map
- Each province maps to: `{ region, city, postalCode }` (e.g., KwaZulu-Natal → Durban, 4000)
- `jobLocation` now always uses `@type: "Place"` with complete `PostalAddress`

### Deferred / Manual Tasks

| Task | Status | Notes |
|------|--------|-------|
| **Resubmit Sitemap in GSC** | ⏳ Pending | Chrome extension not connected; do manually post-deploy |
| **Request Indexing on Key Pages** | ⏳ Pending | URL Inspection → Request Indexing for `/`, `/careers`, `/partners`, `/quote`, `/insurance/compare` |
| **Monitor GSC over 1-2 weeks** | ⏳ Pending | Check "Discovered - currently not indexed" count drops |

---

## PREVIOUS SESSION (154) - 18 Feb 2026

### Focus Areas

1. **Remove All "B2B" Terminology from Public Website**

### Completed Tasks

| Task | Status | Commits |
|------|--------|---------|
| **Remove B2B Terminology** | ✅ | `b40878f` |

### 1. Remove All "B2B" Terminology

CEO directive to remove all "B2B" references from the website. Underlying services (partnerships, commercial arrangements) remain unchanged — only the terminology was updated.

**Replacement strategy:**
- "B2B" badges → removed entirely (Header, Footer)
- "B2B Services" → "Partner Services" (Footer, Help page)
- "B2B Partnership Programme" → "Retail Partnership Programme" (Partners hero)
- "business-to-business (B2B)" → "commercial partnership" (legal pages)
- "B2B team" → "partnerships team" (Quote page, FAQs)
- Code variables: `b2b` → `partner` naming convention (ContactForm, API routes)
- Email subject prefix: `[B2B]` → `[Partner]` (contact, quote API routes)
- Property key: `email.b2b` → `email.partners` (companyInfo.ts)

**Scope:** 31 files modified across navigation, pages, components, data files, API routes, and documentation.

---

## PREVIOUS SESSION (153) - 16 Feb 2026

### Focus Areas

1. **Toast Notification Bug Fixes**

### Completed Tasks

| Task | Status | Commits |
|------|--------|---------|
| **Fix Invisible Toast (CSS Variables)** | ✅ | `26ea305` |
| **Fix Toaster Not Rendering (Theme Provider)** | ✅ | `f39e9e4` |
| **High-Contrast Toast Styling** | ✅ | `52dca08` |

### 1. Toast Notification Bug Fixes & Styling

Fixed three issues with Sonner toast notifications after Session 152's implementation.

---

## PREVIOUS SESSION (152) - 16 Feb 2026

### Focus Areas

1. **Form Submission Feedback Improvement**

### Completed Tasks

| Task | Status | Commits |
|------|--------|---------|
| **Toast Notifications + Scroll for Career Forms** | ✅ | `ddcebd1` |

### 1. Form Submission Feedback Improvement

Added Sonner toast notifications (top-centre) and smooth scroll to all 3 career application forms so users always see submission feedback regardless of scroll position.

**Problem:** FormSuccess component replaced the form in-place. On mobile or when scrolled away, users missed the confirmation entirely.

**Solution:**
- Toast notification (success/error) appears at top of viewport on all form submissions
- Page smoothly scrolls to the FormSuccess component after successful submission
- Uses `useEffect` for scroll timing (not `setTimeout`) to avoid race conditions
- ApplicationModal gets toast only (no scroll — already an overlay)

**Files Modified:**

| File | Change |
|------|--------|
| `src/components/ui/sonner.tsx` | Added `position="top-center"` to Toaster |
| `src/components/careers/ApplicationForm.tsx` | Toast + scroll on success/error |
| `src/components/careers/ApplicationModal.tsx` | Toast on success/error (no scroll) |
| `src/components/careers/JobDetailSimple.tsx` | Toast + scroll on success/error |

**Design doc:** `docs/plans/2026-02-16-form-submission-feedback-design.md`

---

## PREVIOUS SESSION (151) - 16 Feb 2026

### Focus Areas

1. **Executive Name Updates**
2. **OG Image Implementation**
3. **Re-enable Careers Pages**
4. **Disable Applicant Confirmation Email**

### Completed Tasks

| Task | Status | Commits |
|------|--------|---------|
| **Executive Name Updates** | ✅ | `316433d` |
| **OG Image Implementation** | ✅ | `89db17d` |
| **Re-enable Careers Pages** | ✅ | `a743f78` |
| **Disable Confirmation Email** | ✅ | `262aad7` |

### 1. Executive Name Updates

Updated executive names to full names and removed S Basi across 7 files.

### 2. OG Image Implementation

Created dynamic OG image using Next.js file-based metadata convention (`opengraph-image.tsx`). Chosen variant: #4 — Logo + tagline on cream (#FFFDF7) background.

### 3. Re-enable Careers Pages

Set `CAREERS_MAINTENANCE_MODE = false` in `src/app/careers/layout.tsx`.

### 4. Disable Applicant Confirmation Email

Temporarily disabled the confirmation email sent to applicants. **To re-enable:** Uncomment the block at lines 238-243 in `src/app/api/careers-application/route.ts`.

---

## PREVIOUS SESSION (150) - 3 Feb 2026

### Focus Areas

1. **Founding Date Correction (2013 → 2016)**

### Completed Tasks

| Task | Status | Commits |
|------|--------|---------|
| **Founding Date Correction** | ✅ | `ec35242` |

### Founding Date Correction

Metrosure Insurance Brokers was launched on **18 March 2016**, not 2013. All references corrected across 16 files.

**Key Changes:**
- Registration number: `2013/118960/07` → `2016/113504/07`
- JSON-LD foundingDate: `"2013"` → `"2016-03-18"`
- All "since 2013" text → "since 2016"
- All "In 2013" text → "In 2016"
- yearsOperating: 12 → 10 (in caseStudies.ts)

---

## PREVIOUS SESSION (149) - 29 Jan 2026

### Focus Areas

1. **Careers Page Updates**
2. **WhatsApp Button Disabled**
3. **Salary Schema Updates**

### Completed Tasks

| Task | Status | Commits |
|------|--------|---------|
| **Disable WhatsApp Button** | ✅ | `224901e` |
| **Remove 48-hour Response Promise** | ✅ | `224901e` |
| **Update Careers Messaging** | ✅ | `36e4ef2` |
| **Update Job Posting Dates** | ✅ | `36e4ef2` |
| **Decrease Salary Estimates** | ✅ | `1b5ae9a` |

### 1. WhatsApp Button Disabled

Temporarily disabled WhatsApp click-to-chat button for later reactivation.

**To re-enable:** Uncomment in `src/components/ClientLayout.tsx`:
- Line 11: `import WhatsAppButton from "./WhatsAppButton";`
- Lines 90-91: `{!isPortalPage && <WhatsAppButton />}`

### 2. Careers Page Messaging Updates

| Change | Old Text | New Text |
|--------|----------|----------|
| Response time | "within 48 hours" | "be in touch soon" |
| Experience messaging | "No Experience? No Problem" | "Full Training Provided" |
| Sub-description | "We provide full training to get you started" | "Comprehensive onboarding for all new team members" |

### 3. Salary Estimates Decreased

Updated salary ranges in `src/lib/generateJobSchema.ts` (decreased by R3,000):

| Category | Old Range | New Range |
|----------|-----------|-----------|
| sales | R8,000 - R25,000 | R5,000 - R22,000 |
| call-centre | R7,500 - R15,000 | R4,500 - R12,000 |
| admin | R10,000 - R18,000 | R7,000 - R15,000 |
| trainee | R6,000 - R10,000 | R3,000 - R7,000 |

---

## PREVIOUS SESSION (148) - 27 Jan 2026

### Focus Areas

1. **Self-Hosted Mail Server Research & Plan**
2. **Careers Email Routing Fix**
3. **Multiple Attachments Feature**

### Completed Tasks

| Task | Status | Commits |
|------|--------|---------|
| **Mail Server Options Research** | ✅ | `9089d48` |
| **Careers Email Routing** | ✅ | `860d50c` |
| **Multiple Attachments Support** | ✅ | `e84b7be` |

### Mail Server Research

Created comprehensive documentation at `docs/MAIL_SERVER_PLAN.md` covering:
- 5 mail server options compared (Mailcow, Mail-in-a-Box, Stalwart, Poste.io, docker-mailserver)
- **Recommendation: Stalwart Mail Server** (modern Rust-based, full REST API, low resource usage)
- VPS specification (Hetzner CX22 @ €4.35/month or Vultr Cape Town @ $14/month)

### Next Steps (When Proceeding with Mail Server)

1. Provision VPS (domain confirmed: metrosure.app)
2. Install Stalwart
3. Configure DNS records
4. Create initial accounts

---

## PREVIOUS SESSION (147) - 27 Jan 2026

### Careers Section Maintenance Mode

**Goal:** Put careers pages under maintenance in production while keeping them accessible locally for development.

### Completed Tasks

| Task | Status | Commits |
|------|--------|---------|
| **Careers Maintenance Mode** | ✅ | `2d0eba0` |

### Implementation Details

- Modified `src/app/careers/layout.tsx` to show "Coming Soon" page in production
- Uses existing `UnderDevelopment` component for consistent styling
- Feature flag `CAREERS_MAINTENANCE_MODE` controls behaviour
- Careers pages remain fully accessible in development (`npm run dev`)

### How to Re-enable Careers in Production

Set `CAREERS_MAINTENANCE_MODE = false` in `src/app/careers/layout.tsx` (line 7).

---

## NEXT SESSION PRIORITIES (Session 156)

### Priority 1: Google Search Console Follow-up (Manual)

| Task | Status | Notes |
|------|--------|-------|
| Resubmit sitemap in GSC | ⏳ Pending | Sitemaps → Add `sitemap.xml` → Submit |
| Request indexing on key pages | ⏳ Pending | URL Inspection → `/`, `/careers`, `/partners`, `/quote`, `/insurance/compare` |
| Validate JobPosting schema | ⏳ Pending | Test `/careers/sales-agent` and `/careers/call-centre-agent` in Rich Results Test |

### Priority 2: Production Readiness

| Task | Status | Notes |
|------|--------|-------|
| Remove Development Banner | Pending | `src/components/DevelopmentBanner.tsx` — remove component and import from `ClientLayout.tsx` |
| Cross-browser testing | Pending | Chrome, Firefox, Edge, Safari |
| Mobile responsiveness audit | Pending | Test on real devices (375px, 768px, 1024px) |

### Priority 3: SEO & Performance

| Task | Status | Notes |
|------|--------|-------|
| Monitor GSC indexing | Pending | Check "Discovered - currently not indexed" count over 1-2 weeks |
| Add canonical URLs | Recommended | Prevent duplicate content if www/non-www both resolve |
| Review Core Web Vitals | Recommended | Check LCP, CLS, INP in GSC after pages are indexed |

### Priority 4: Deferred Features

| Task | Status | Notes |
|------|--------|-------|
| Re-enable WhatsApp button | Deferred | Uncomment in `src/components/ClientLayout.tsx` (lines 11, 90-91) |
| Re-enable applicant confirmation email | Deferred | Uncomment in `src/app/api/careers-application/route.ts` (lines 238-243) |
| Cookie consent banner | Deferred | Re-enable in `src/components/ClientLayout.tsx` |
| Self-hosted mail server | Deferred | Plan at `docs/MAIL_SERVER_PLAN.md` — Stalwart recommended |

---

## PAGES UNDER MAINTENANCE (Production Only)

No pages are currently under maintenance. All routes are live.

**To re-enable maintenance for careers:** Set `CAREERS_MAINTENANCE_MODE = true` in `src/app/careers/layout.tsx`.

---

## BROKER NARRATIVE GUIDELINES (Final)

### Metrosure's Role
- **Broker/Reseller** - FSP 47089 licensed
- **Sales & Marketing Company** - not an insurer
- **Commission-based** - earns from insurers and partners, pays agents

### Language Rules

| Avoid | Use Instead |
|-------|-------------|
| "We sell/offer insurance" | "We sell financial products from partner insurers" |
| "Our insurance products" | "Products from our partner insurers" |
| "We handle claims" | "We guide/support you through claims" |
| "We protect" | "We connect you with the right cover" |
| "in-house insurance arm" | "dedicated sales team" |
| Overuse of "insurance" | "financial products" (broader: credit, leasing, cover) |

### Service Channels
Always mention all three where appropriate:
1. **In-store** - sales agents at partner locations
2. **Call centre** - outbound sales campaigns
3. **Outsourced sales/marketing** - dedicated teams for partners

---

## PREVIOUS SESSION (146) - 27 Jan 2026

### Comprehensive Broker Narrative Audit

**Goal:** Complete broker narrative compliance across all pages.

| Task | Status | Commits |
|------|--------|---------|
| **FAQ & Data Files Audit** | ✅ | `6772e83` |
| **Home Page Components** | ✅ | `d760ac0`, `7bac2ea` |
| **Partners Page Components** | ✅ | `7bac2ea` |
| **About Page** | ✅ | `48b066d` |

### Files Modified (20 total)

| File | Changes |
|------|---------|
| `src/app/page.tsx` | Metadata: "financial services broker" |
| `src/app/about/page.tsx` | Hero subtext, mission heading, mission description |
| `src/app/partners/page.tsx` | All metadata descriptions |
| `src/components/Features.tsx` | Both partner feature descriptions |
| `src/components/Products.tsx` | Retail partnerships card |
| `src/components/PartnersCTA.tsx` | Subheadline with commission + services |
| `src/components/contact/ContactOptions.tsx` | Partner link description |
| `src/components/partners/PartnersHero.tsx` | Hero messaging |
| `src/components/partners/PartnerBenefits.tsx` | Zero overhead description |
| `src/components/testimonials/TestimonialsCarousel.tsx` | Partner testimonial |
| `src/data/faqs.ts` | 6 FAQ answers |
| `src/data/claims.ts` | SEO description |
| `src/data/partnerServices.ts` | In-store campaigns, outsourced sales descriptions |
| `src/data/opportunities.ts` | Partner opportunity card |

---

## PREVIOUS SESSION (145) - 27 Jan 2026

### Broker Narrative Fix: Home & Partners Pages (Initial)

| Task | Status | Details |
|------|--------|---------|
| **Products.tsx** | ✅ | Updated descriptions to clarify partner relationship |
| **Features.tsx** | ✅ | "policy sold" → "product arranged through our partners" |
| **OG Image Removal** | ✅ | Temporarily removed og-image.png/html and all metadata references |
| **Commit & Push** | ✅ | `4d258c0`, `4f09e51` |

---

## RECENT SESSION HISTORY

| Session | Date | Focus | Key Outcomes |
|---------|------|-------|--------------|
| **155** | 26 Feb | **GSC Indexing Fix + JSON-LD Schema** | Sitemap 25→13 URLs; excluded redirected routes + image assets; fixed JobPosting jobLocation type; added province postal codes |
| **154** | 18 Feb | **Remove B2B Terminology** | Replaced all "B2B" with "Partner"/"Commercial" across 31 files; zero B2B references remain |
| **153** | 16 Feb | **Toast Bug Fixes** | Fixed invisible toast (CSS vars) and Toaster not rendering (wrong theme provider import) |
| **152** | 16 Feb | **Form Submission Feedback** | Toast notifications + smooth scroll on career application forms |
| **151** | 16 Feb | **Executive Names, OG Image, Careers Live** | Full names for executives; removed S Basi; OG image; careers pages re-enabled |
| **150** | 3 Feb | **Founding Date Correction** | Updated 2013 → 2016 across 16 files; registration number corrected |
| **149** | 29 Jan | Careers Updates, WhatsApp Disabled | Disabled WhatsApp; removed 48hr promise; updated salaries |
| **148** | 27 Jan | Mail Server, Email Routing, Attachments | Mail server plan; careers email to metrosureconsult; multiple attachments |
| **147** | 27 Jan | Careers Maintenance Mode | Production-only "Coming Soon" for /careers/* |
| **146** | 27 Jan | Broker Narrative: Complete Audit | Fixed 20 files; clarified commission structure |

---

## SEO IMPLEMENTATION STATUS

### Social Media Metadata

| Platform | Implementation | Status |
|----------|----------------|--------|
| OpenGraph | og:title, og:description, og:url, og:image | ✅ All pages (dynamic via opengraph-image.tsx) |
| Twitter | summary_large_image, site handle, image | ✅ All pages (dynamic via twitter-image.tsx) |

### Structured Data Coverage

| Schema Type | Pages | Status |
|-------------|-------|--------|
| InsuranceAgency | Root layout | ✅ Complete |
| BreadcrumbList | Contact, About, Help, Partners, Corporate, Calculator, Careers | ✅ Complete |
| FAQPage | Contact, Help, Partners | ✅ Complete |
| JobPosting | /careers/[slug] | ✅ Complete (S155: fixed jobLocation type + added postal codes) |

### Sitemap & Indexing

| Item | Status | Notes |
|------|--------|-------|
| Sitemap generation | ✅ | 13 URLs, auto-generated via `next-sitemap` postbuild |
| robots.txt | ✅ | 16 Disallow entries (8 redirected routes + 8 internal) |
| Non-page assets excluded | ✅ | apple-icon, opengraph-image, twitter-image |
| /under-development noindex | ✅ | `robots: { index: false, follow: false }` |
| GSC sitemap resubmission | ⏳ | Manual step — do after deploy |

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
| **Email (Partner)** | clients@metrosureconsult.co.za |
| **FSP Number** | 47089 |

### Social Media

| Platform | URL |
|----------|-----|
| Facebook | https://www.facebook.com/people/Metrosure-Insurance-Brokers/100083163880679/ |
| LinkedIn | https://za.linkedin.com/company/metrosure |
| Instagram | https://www.instagram.com/metrosure_insurance_/ |
| Twitter Handle | @metrosure_insurance_ |
