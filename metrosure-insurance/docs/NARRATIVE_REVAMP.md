# Metrosure Website Narrative Revamp

**Document Version:** 1.1
**Created:** 20 January 2026 (Session 124)
**Completed:** 20 January 2026 (Session 126)
**Status:** ✅ Complete - Ready for merge
**Branch:** `feature/narrative-b2b-clarity`

---

## Executive Summary

This document tracks a complete narrative revamp of the Metrosure website to accurately reflect the company's B2B business model as a broker/marketer that sells partners' financial products to consumers.

**Core Business Model:**
- Metrosure does NOT create or underwrite insurance products
- Metrosure provides sales agents and marketing services to partners
- Example: TFG agreement places Metrosure agents in TFG stores to sell TFG financial products

---

## Current State Analysis (Session 125)

### 1. Homepage Positioning

**Primary Headline:** "Trusted by Families, Powered by Partnerships"

**Subheading:** "From protecting your home and loved ones to transforming your retail space into a revenue engine - we help families feel secure and businesses grow."

**Key Positioning Elements:**
- Dual target audience: Individual consumers AND retailers/B2B partners
- Emphasis on trust, protection, and growth
- Frame: Insurance provider + B2B sales & marketing platform
- CTAs: "Start Your Quote" (B2C) + "Partner with us" (B2B)

### 2. About Page Messaging

**Hero Headline:** "Taking You to the Future"

**Core Positioning:** "A proudly South African financial services company protecting families and partnering with retail businesses. Real people, real advice, real partnerships."

**Mission Statement:** "We're not just an insurance broker, we're a fast-growing sales and marketing company that delivers results. For families seeking peace of mind. For retailers seeking proven growth."

### 3. How Metrosure Is Currently Described

**Primary Identity:** Hybrid business model with THREE distinct offerings:

1. **Insurance Broker** - For individual consumers (B2C)
   - Life & funeral cover
   - Retirement planning
   - Car & home insurance
   - Credit life insurance

2. **Sales & Marketing Company** - For retailers (B2B)
   - In-store insurance campaigns
   - Outsourced sales divisions
   - Data-driven customer acquisition
   - Quality assurance (95% daily average)

3. **Financial Services Partner**
   - Call centre services
   - Device leasing/financing
   - Credit facilities
   - Employee benefits (corporate)

**Key Phrase:** "Not just an insurance broker, but a sales and marketing company"

### 4. Pages with Significant Narrative Content

| Page | Key Messaging | Content Type |
|------|---------------|--------------|
| **Homepage** | Dual positioning (B2C + B2B), hero statement | Hero section, features grid, stats |
| **About** | Mission, values, company history, team | Hero, mission statement, timeline, values grid |
| **Partners** | Revenue transformation, proven results | Hero, success metrics, partnership models |
| **Features** | What we do for individuals & businesses | 6 service cards (mixed B2C/B2B) |
| **Why Choose Us** | Trust drivers: 75% sales growth, 95% QA, 5,000+ jobs | 6 differentiator cards + CTA |

### 5. Partner Page Messaging

**Hero:** "Transform Your Retail Space Into Revenue"

**Success Metrics:**
- 5,000+ jobs created
- 75% average sales increase (first 6 months)
- 95% daily quality standard
- 7 provinces covered

**Six Partnership Models:**
1. In-Store Insurance Campaigns (Most Popular)
2. Outsourced Sales & Marketing
3. In-Store Credit Facility
4. Device Leasing
5. Device Insurance
6. Call Centre Services (New)

### 6. Core Values (Repeatedly Emphasised)

1. **Respect** - Everyone has a unique role
2. **Quality** - "Good enough isn't enough"
3. **Passion** - Genuine care; this is our purpose
4. **Integrity** - "Do the right thing even when no one's watching"
5. **Excellence** - Go above and beyond

### 7. Key Statistics & Proof Points

| Stat | Value |
|------|-------|
| Jobs created | 5,000+ (since 2013) |
| Partner sales increase | 75% (first 6 months) |
| Quality assurance | 95% daily average |
| Provinces | 7 |
| Retail partners | 100+ |
| Families served | 10,000+ |

### 8. Positioning Tone & Voice

**Language Characteristics:**
- Professional yet personal - "Real people, real advice"
- Data-driven - Specific metrics, proven results
- Community-focused - Job creation emphasis, local empowerment
- Dual messaging - Shifts between B2C protection and B2B growth
- South African pride - "Proudly South African," community impact

### 9. Problems Identified

| Current Copy | Problem |
|--------------|---------|
| "protecting your home and loved ones" | Implies we're the insurer |
| "we help families feel secure" | Implies direct insurance provision |
| "Explore Plans" | Implies we have our own plans |
| "Our life insurance and funeral plans" | Implies we create products |
| "we've got you covered" | Implies direct insurance provision |

---

## Session 124 Changes (Completed)

Initial soft narrative updates using Option A language:

| File | Change |
|------|--------|
| `src/data/partnerShowcase.ts` | "Partnering with..." + "Growing TFG financial services in-store" + "Retail locations served" |
| `src/components/PartnerLogos.tsx` | "Financial Partners" heading, "Partnering with..." subheading |
| `src/components/TrustedBy.tsx` | "help grow your financial services reach" |
| `src/components/PartnersCTA.tsx` | "grow their financial services footprint" |
| `src/app/about/page.tsx` | "connects South Africans with the right financial products" |

---

## Session 125+ Revamp Scope (HUGE NARRATIVE CHANGE)

### Pages to Review

| Page | Priority | Current Focus | Notes |
|------|----------|---------------|-------|
| Homepage (`/`) | High | Mixed B2B/B2C | Needs clear value prop for both audiences |
| About (`/about`) | High | Company story | Mission/vision alignment with broker model |
| Partners (`/partners`) | Critical | B2B focus | Primary B2B landing page |
| Corporate (`/corporate`) | High | B2B focus | Enterprise partnerships |
| Quote (`/quote`) | Medium | B2C focus | Consumer-facing, product sourcing clarity |
| Services pages | Medium | Product descriptions | Clarify we match customers with partners |
| Contact (`/contact`) | Low | General | May need B2B/B2C routing clarity |

### Key Narrative Shifts

| Current Messaging | Problem | Proposed Direction |
|-------------------|---------|-------------------|
| "We provide cover" | Implies we're an insurer | "We connect you with the right cover" |
| "Our products" | We don't create products | "Products from our partners" |
| "Insurance partners" | Too narrow | "Financial partners" (broader) |
| "Working with insurers" | Passive | "Partnering with..." or "Growing reach for..." |
| Generic broker language | Doesn't differentiate | Sales & marketing excellence focus |

### Tone & Voice Guidelines

**For B2C (Consumers):**
- Focus on access, affordability, choice
- "We help you find the right cover"
- "Access products from leading insurers"
- "Real advice, real people"

**For B2B (Partners/Retailers):**
- Focus on growth, reach, results
- "Grow your financial services footprint"
- "Data-driven sales and marketing"
- "Proven track record across 7 provinces"

---

## Files to Audit (Complete List)

### Data Files
- [x] `src/data/partnerShowcase.ts` ✅ (Session 124)
- [x] `src/data/partners.ts` ✅ (Session 126 - reviewed, no changes needed)
- [x] `src/data/services.ts` ✅ (Session 126 - reviewed, no changes needed)
- [x] `src/data/aboutPage.ts` ✅ (Session 124)
- [x] `src/data/testimonials.ts` ✅ (Session 126 - reviewed, no changes needed)
- [x] `src/data/faqs.ts` ✅ (Session 126 - reviewed, already has excellent broker language)

### Components
- [x] `src/components/PartnerLogos.tsx` ✅ (Session 124)
- [x] `src/components/TrustedBy.tsx` ✅ (Session 124)
- [x] `src/components/PartnersCTA.tsx` ✅ (Session 124)
- [x] `src/components/Hero.tsx` ✅ (Session 125)
- [x] `src/components/HeroVariants.tsx` ✅ (Session 126 - reviewed, not used)
- [x] `src/components/Footer.tsx` ✅ (Session 126 - reviewed, navigation only)
- [x] `src/components/Header.tsx` ✅ (Session 126 - reviewed, navigation only)
- [x] `src/components/WhyChooseUs.tsx` ✅ (Session 125)
- [x] `src/components/Features.tsx` ✅ (Session 125)
- [x] `src/components/testimonials/*.tsx` ✅ (Session 126 - reviewed, no changes needed)
- [x] `src/components/partners/PartnersHero.tsx` ✅ (Session 125)
- [x] `src/components/corporate/CorporateHero.tsx` ✅ (Session 125)

### Pages
- [x] `src/app/page.tsx` (Homepage) ✅ (Session 125 - via components)
- [x] `src/app/about/page.tsx` ✅ (Session 124)
- [x] `src/app/partners/page.tsx` ✅ (Session 125)
- [x] `src/app/corporate/page.tsx` ✅ (Session 125 - via CorporateHero)
- [x] `src/app/quote/page.tsx` ✅ (Session 125)
- [x] `src/app/contact/page.tsx` ✅ (Session 126 - reviewed, no ownership language)
- [x] `src/app/claims/page.tsx` ✅ (Session 126 - reviewed, already has broker language)
- [x] `src/app/insurance/life/page.tsx` ✅ (Session 126 - pricing removed, metadata updated)
- [x] `src/app/insurance/auto/page.tsx` ✅ (Session 126 - pricing removed, metadata updated)
- [x] `src/app/insurance/home/page.tsx` ✅ (Session 126 - redirect only)
- [x] `src/app/insurance/business/page.tsx` ✅ (Session 126 - pricing removed, metadata updated)
- [x] `src/app/insurance/compare/page.tsx` ✅ (Session 126 - educational content, no changes needed)

---

## Language Reference

### Phrases to Avoid

| Avoid | Why |
|-------|-----|
| "Our insurance products" | We don't create products |
| "We cover you" | We're not the insurer |
| "Our policies" | Policies are from partners |
| "We underwrite" | We're a broker, not an underwriter |
| "Our claims process" | Claims go through partners |

### Preferred Language

| Use | Context |
|-----|---------|
| "Products from our partners" | When referencing insurance products |
| "Connect you with" | Matching customers to products |
| "Access cover from" | Consumer-facing product access |
| "Partnering with" | Relationship with insurers |
| "Grow your financial services reach" | B2B value proposition |
| "Sales and marketing excellence" | Our core competency |
| "Data-driven approach" | Our methodology |
| "Facilitated through" | Transactions/claims |

---

## Progress Log

### Session 124 (20 Jan 2026)
- ✅ Created initial soft changes (Option A)
- ✅ Created this planning document
- ✅ Created portal architecture documentation
- ⏭️ Next: Complete narrative revamp

### Session 125 (20 Jan 2026)
- ✅ Added Current State Analysis section to this document
- ✅ Updated Homepage Hero (subheadline, CTA, image alt text)
- ✅ Updated Features component (service descriptions, sidebar text)
- ✅ Updated WhyChooseUs component (intro paragraph)
- ✅ Updated Partners page (metadata, hero subheadline)
- ✅ Updated Corporate page (hero subheadline)
- ✅ Updated Quote page (coverage options, FAQ)
- ✅ Build verified passing

**Key Changes Made:**
| Old | New |
|-----|-----|
| "protecting your home and loved ones" | "connecting you with the right cover for your family" |
| "we help families feel secure" | "we bring people and products together" |
| "Explore Plans" | "Find Your Cover" |
| "Our life insurance and funeral plans" | "life insurance and funeral plans from trusted partners" |
| "we've got you covered" | "we connect you with the right solutions" |
| "we design packages" | "we source the right solutions from leading providers" |

### Session 126 (20 Jan 2026) - COMPLETE ✅
- ✅ Audited remaining data files (services.ts, faqs.ts, testimonials.ts) - no changes needed
- ✅ Updated insurance service pages (life, auto, business) - removed pricing, updated metadata
- ✅ Reviewed Contact page - no ownership language found
- ✅ Reviewed Claims page - already has broker language ("insurer assesses, we advocate")
- ✅ Reviewed Footer - navigation only, no messaging
- ✅ Reviewed FAQs - excellent broker language throughout
- ✅ Build verified passing

**Key Changes Made:**

| Page | Change |
|------|--------|
| Life Insurance | Removed "From R150/R350" → "Get a Quote"; "Essential Life" → "Essential Cover"; Metadata updated |
| Auto Insurance | Removed "From R250/R450" → "Get a Quote"; Metadata updated |
| Business Insurance | Removed "From R500/R1,500" → "Get a Quote"; Metadata updated |
| Home Insurance | Just a redirect - no changes needed |
| Compare Insurance | Educational content with industry data - no changes needed |

**Pricing Strategy:**
- Kept tier structure (Essential, Family, Premium) for coverage level comparison
- Replaced specific prices with "Get a Quote" positioning
- Removed period ("month") to avoid implying recurring product ownership
- This maintains useful coverage information while eliminating ownership implication

---

## Summary

The narrative revamp is **complete**. The website now consistently presents Metrosure as a broker that:
- **Connects** customers with products from partner insurers
- **Sources** the right solutions from leading providers
- **Advocates** for customers during the claims process
- Does NOT own, underwrite, or create insurance products

**Branch:** `feature/narrative-b2b-clarity` is ready for merge to main.

---

## Notes

**Session 125:** Focused on high-traffic pages (Homepage, Partners, Corporate, Quote). The narrative shift emphasises "connecting" and "sourcing" rather than "providing" or "covering". The B2B messaging now consistently uses "grow your financial services reach/footprint".

**Session 126:** Completed the revamp by addressing insurance service pages (major impact due to pricing display) and reviewing all remaining pages. The FAQs and claims content were already well-written with broker language.

---

*Revamp complete. This document serves as historical reference.*
