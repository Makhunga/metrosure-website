# Metrosure Insurance Brokers - Session Handover

**Updated:** 16 February 2026 (Session 151)
**Stack:** Next.js 16.1.4 | React 19 | TypeScript 5 | Tailwind CSS 4 | Framer Motion 12 | shadcn/ui
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 56 pages + 8 API routes
- **Last Build:** 16 February 2026
- **Branch:** `main`

---

## CURRENT SESSION (151) - 16 Feb 2026

### Focus Areas

1. **Executive Name Updates**
2. **OG Image Implementation**

### Completed Tasks

| Task | Status | Commits |
|------|--------|---------|
| **Executive Name Updates** | ✅ | `316433d` |
| **OG Image Implementation** | ✅ | *(this commit)* |

### 1. Executive Name Updates

Updated executive names to full names and removed S Basi across 7 files.

| Change | Files Affected |
|--------|---------------|
| BG Chiliza → Bheka Chiliza | `aboutPage.ts`, `companyInfo.ts`, `legal/page.tsx`, `privacy/page.tsx`, `CONTENT_GUIDE.md` |
| FP Tshabalala → Fezile Tshabalala | `aboutPage.ts`, `legal/page.tsx`, `CONTENT_GUIDE.md` |
| S Basi removed (CFO) | `aboutPage.ts`, `legal/page.tsx`, `CONTENT_GUIDE.md` |
| About page grid: 3-col → 2-col centred | `about/page.tsx` |

### 2. OG Image Implementation

Created dynamic OG image using Next.js file-based metadata convention (`opengraph-image.tsx`).

**Chosen variant:** #4 — Logo + tagline on cream (#FFFDF7) background.

**Files Created:**
- `src/app/opengraph-image.tsx` — Dynamic OG image (1200×630), auto-injected into all pages
- `src/app/twitter-image.tsx` — Re-exports OG image for Twitter cards
- `src/app/api/og/route.tsx` — Generator API with `?variant=1-6` for future use
- `src/app/og-preview/page.tsx` — Preview page at `/og-preview` to compare all variants

**Static PNGs saved** in `public/images/og/` (all 6 variants for future reference):
- `og-1-logo-cream.png`, `og-2-logo-red.png`, `og-3-logo-maroon.png`
- `og-4-logo-tagline-cream.png`, `og-5-logo-tagline-red.png`, `og-6-logo-tagline-maroon.png`

**To switch variant:** Edit `src/app/opengraph-image.tsx` or replace with a static image from `public/images/og/`.

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

## NEXT SESSION PRIORITIES (Session 152)

### Priority 1: Production Readiness

| Task | Status | Notes |
|------|--------|-------|
| Remove Development Banner | Pending | `src/components/DevelopmentBanner.tsx` |
| Cross-browser testing | Pending | Chrome, Firefox, Edge, Safari |
| Mobile responsiveness audit | Pending | Test on real devices |

### Priority 2: Domain & Search Console (Post-Deployment)

| Task | Status | Notes |
|------|--------|-------|
| Vercel Domain Setup | Pending | Add `metrosuregroup.co.za` in Dashboard → Settings → Domains |
| DNS Configuration | Pending | A: `76.76.21.21`, CNAME www: `cname.vercel-dns.com` |
| Submit Sitemap | Pending | Google Search Console → Indexing → Sitemaps |

---

## PAGES UNDER MAINTENANCE (Production Only)

These pages show "Coming Soon" in production but are accessible locally:

| Section | Layout File | Flag |
|---------|-------------|------|
| `/careers/*` | `src/app/careers/layout.tsx` | `CAREERS_MAINTENANCE_MODE` |

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
| `src/components/Features.tsx` | Both B2B feature descriptions |
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
| **151** | 16 Feb | **Executive Names, OG Image** | Full names for executives; removed S Basi; OG image with 6 variants |
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
