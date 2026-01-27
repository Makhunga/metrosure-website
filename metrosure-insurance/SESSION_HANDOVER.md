# Metrosure Insurance Brokers - Session Handover

**Updated:** 27 January 2026 (Session 146)
**Stack:** Next.js 16.1.4 | React 19 | TypeScript 5 | Tailwind CSS 4 | Framer Motion 12 | shadcn/ui
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 54 pages + 7 API routes
- **Last Build:** 27 January 2026
- **Branch:** `main`

---

## CURRENT SESSION (146) - 27 Jan 2026

### Comprehensive Broker Narrative Audit

**Goal:** Complete broker narrative compliance across all pages. Metrosure is a broker/reseller (FSP 47089) that:
- Sells financial products FROM partner insurers
- Earns commission from insurers and retail partners
- Pays its own agents from that commission
- Operates via in-store sales, call centre, and outsourced sales/marketing teams

### Completed Tasks

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

### Key Narrative Changes

| Before | After |
|--------|-------|
| "protecting families" | "connecting families with the right products" |
| "Building a nation where everyone is protected" | "Connecting people with the right financial products" |
| "We handle insurance/claims" | "We manage/facilitate/guide" |
| "offer insurance" | "sell financial products from partner insurers" |
| "you and agents earn commission" | "you earn commission on every sale" |
| "in-store" only | "in-store, call centre, or outsourced sales teams" |
| "retail stores" | "stores or businesses" |

### Commission Structure Clarified

```
Partner Insurers → pay commission → Metrosure
Retail Partners → pay/share commission → Metrosure
Metrosure → pays → Sales Agents
```

Partners (retailers/businesses) earn commission on sales made at their location.

---

## NEXT SESSION PRIORITIES (Session 147)

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

## PREVIOUS SESSION (145) - 27 Jan 2026

### Broker Narrative Fix: Home & Partners Pages (Initial)

| Task | Status | Details |
|------|--------|---------|
| **Products.tsx** | ✅ | Updated descriptions to clarify partner relationship |
| **Features.tsx** | ✅ | "policy sold" → "product arranged through our partners" |
| **OG Image Removal** | ✅ | Temporarily removed og-image.png/html and all metadata references |
| **Commit & Push** | ✅ | `4d258c0`, `4f09e51` |

---

## PREVIOUS SESSION (144) - 26 Jan 2026

### SEO: WordPress Migration Redirects

| Task | Status | Details |
|------|--------|---------|
| **301 Redirects** | ✅ | Added 10 permanent redirects in `next.config.ts` |
| **Commit & Push** | ✅ | `6b00d04` |

---

## RECENT SESSION HISTORY

| Session | Date | Focus | Key Outcomes |
|---------|------|-------|--------------|
| **146** | 27 Jan | **Broker Narrative: Complete Audit** | Fixed 20 files; clarified commission structure; added call centre/outsourced language |
| **145** | 27 Jan | Broker Narrative: Home & Partners | Fixed 10 text instances; removed og-image temporarily |
| **144** | 26 Jan | SEO: WordPress Redirects | Added 301 redirects for WordPress migration |
| **142** | 25 Jan | Production Readiness | Created deployment checklist, updated packages |
| **141** | 25 Jan | Broker Narrative Audit | Fixed 7 text instances (insurance pages, claims, corporate) |

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
