# Metrosure Insurance Brokers - Session Handover

**Updated:** 27 January 2026 (Session 148)
**Stack:** Next.js 16.1.4 | React 19 | TypeScript 5 | Tailwind CSS 4 | Framer Motion 12 | shadcn/ui
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 54 pages + 7 API routes
- **Last Build:** 27 January 2026
- **Branch:** `main`

---

## CURRENT SESSION (148) - 27 Jan 2026

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

### 1. Mail Server Research

Created comprehensive documentation at `docs/MAIL_SERVER_PLAN.md` covering:
- 5 mail server options compared (Mailcow, Mail-in-a-Box, Stalwart, Poste.io, docker-mailserver)
- Comparison matrix for features, ease of setup, API support
- **Recommendation: Stalwart Mail Server** (modern Rust-based, full REST API, low resource usage)
- VPS specification (Hetzner CX22 @ €4.35/month or Vultr Cape Town @ $14/month)
- Implementation phases (Infrastructure → Configuration → Account Management → Integration)

| Requirement | Selected Option |
|-------------|-----------------|
| Account Volume | Under 50 active accounts |
| Account Management | Web UI + REST API |
| Recommended Server | Stalwart Mail Server |
| Recommended VPS | Hetzner CX22 (2 vCPU, 4GB RAM, €4.35/mo) |
| Domain | metrosure.app |

### 2. Careers Email Routing

Changed careers application delivery from `careers@metrosuregroup.co.za` to `careers@metrosureconsult.co.za` (alias for lazola@metrosureconsult.co.za).

**Files modified:**
- `src/lib/email.ts` - Updated `EMAIL_CAREERS` constant
- `src/app/api/careers-application/route.ts` - Updated reference
- `CLAUDE.md` - Updated documentation

**Note:** Resend may suppress emails to aliases if the underlying mailbox bounces. Solution: Remove from Resend suppression list in dashboard if issues occur.

### 3. Multiple Attachments Support

Enhanced careers application form to accept multiple file attachments (CV, cover letter, certificates).

**Changes:**
- `ApplicationForm.tsx` & `ApplicationModal.tsx` - Changed from single `cv: File | null` to `attachments: File[]`
- `careers-application/route.ts` - Processes `formData.getAll("attachments")`
- Total file size limit: 5MB across all files
- Valid types: PDF, DOC, DOCX
- Max files: 5 attachments per application
- UI shows list of attached files with individual remove buttons

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

## NEXT SESSION PRIORITIES (Session 149)

### Priority 1: OG Image

| Task | Notes |
|------|-------|
| Design proper OG image | 1200x630px, branded, professional |
| Re-add to metadata | Once image is ready |

### Priority 2: Production Readiness

| Task | Status | Notes |
|------|--------|-------|
| Remove Development Banner | Pending | `src/components/DevelopmentBanner.tsx` |
| Cross-browser testing | Pending | Chrome, Firefox, Edge, Safari |
| Mobile responsiveness audit | Pending | Test on real devices |

### Priority 3: Domain & Search Console (Post-Deployment)

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
| **148** | 27 Jan | **Mail Server, Email Routing, Attachments** | Mail server plan; careers email to metrosureconsult; multiple attachments |
| **147** | 27 Jan | Careers Maintenance Mode | Production-only "Coming Soon" for /careers/* |
| **146** | 27 Jan | Broker Narrative: Complete Audit | Fixed 20 files; clarified commission structure |
| **145** | 27 Jan | Broker Narrative: Home & Partners | Fixed 10 text instances; removed og-image temporarily |
| **144** | 26 Jan | SEO: WordPress Redirects | Added 301 redirects for WordPress migration |

---

## SEO IMPLEMENTATION STATUS

### Social Media Metadata

| Platform | Implementation | Status |
|----------|----------------|--------|
| OpenGraph | og:title, og:description, og:url | ✅ All pages (images removed temporarily) |
| Twitter | summary_large_image, site handle | ✅ Root + pages (images removed temporarily) |

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
