# Metrosure Website Narrative Revamp

**Document Version:** 1.0
**Created:** 20 January 2026 (Session 124)
**Status:** Planning - Work begins Session 125
**Branch:** `feature/narrative-b2b-clarity`

---

## Executive Summary

This document tracks a complete narrative revamp of the Metrosure website to accurately reflect the company's B2B business model as a broker/marketer that sells partners' financial products to consumers.

**Core Business Model:**
- Metrosure does NOT create or underwrite insurance products
- Metrosure provides sales agents and marketing services to partners
- Example: TFG agreement places Metrosure agents in TFG stores to sell TFG financial products

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
- [ ] `src/data/partnerShowcase.ts` ✅ (Session 124)
- [ ] `src/data/partners.ts`
- [ ] `src/data/services.ts`
- [ ] `src/data/aboutPage.ts`
- [ ] `src/data/testimonials.ts`
- [ ] `src/data/faq.ts`

### Components
- [ ] `src/components/PartnerLogos.tsx` ✅ (Session 124)
- [ ] `src/components/TrustedBy.tsx` ✅ (Session 124)
- [ ] `src/components/PartnersCTA.tsx` ✅ (Session 124)
- [ ] `src/components/Hero.tsx`
- [ ] `src/components/HeroVariants.tsx`
- [ ] `src/components/Footer.tsx`
- [ ] `src/components/Header.tsx` (navigation labels)
- [ ] `src/components/WhyChooseUs.tsx`
- [ ] `src/components/testimonials/*.tsx`

### Pages
- [ ] `src/app/page.tsx` (Homepage)
- [ ] `src/app/about/page.tsx` ✅ (Session 124)
- [ ] `src/app/partners/page.tsx`
- [ ] `src/app/corporate/page.tsx`
- [ ] `src/app/quote/page.tsx`
- [ ] `src/app/contact/page.tsx`
- [ ] `src/app/claims/page.tsx`
- [ ] `src/app/insurance/*/page.tsx` (all service pages)

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

### Session 125 (Upcoming)
- [ ] Full audit of all pages and components
- [ ] Draft revised copy for homepage
- [ ] Draft revised copy for partners page
- [ ] Review and iterate

---

## Notes

*Add session-by-session notes and decisions here as the revamp progresses.*

---

*This is a living document. Update after each session.*
