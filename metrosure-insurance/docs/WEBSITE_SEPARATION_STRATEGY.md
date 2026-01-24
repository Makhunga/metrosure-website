# Metrosure Group Website Separation Strategy

**Document Version:** 1.0
**Date:** 5 January 2026
**Classification:** Internal Strategy Document
**Author:** Digital Strategy Team

---

## Executive Summary

This document presents a comprehensive strategy for separating the Metrosure Group website into distinct digital properties for its two fundamentally different business units: **Metrosure Insurance Brokers** (regulated financial services) and **Metrosure Consult** (B2B enterprise services).

### Key Recommendation

Implement a **three-site architecture**:
1. **metrosure-insurance.co.za** - Consumer insurance brokerage
2. **metrosure-consult.co.za** - Enterprise B2B consulting services
3. **metrosuregroup.co.za** - Corporate holding company portal

### Why This Matters

| Metric | Current Combined | After Separation (Projected) |
|--------|-----------------|------------------------------|
| Audience clarity | Mixed/confused | Segment-specific |
| SEO ranking potential | Diluted | Focused topical authority |
| Conversion rate | Baseline | +25-40% improvement |
| Regulatory compliance | Risk of confusion | Clear boundaries |
| Brand perception | "Jack of all trades" | Specialist in each domain |

### Industry Precedent

Major corporations have successfully executed similar separations:
- **eBay/PayPal (2015):** PayPal spun off with $49B valuation, grew to $82B by 2024
- **HP/HPE (2015):** Hewlett Packard Enterprise split to focus on IT/cloud, reported $28B revenue in 2022
- **Gap Inc.:** Operates Gap, Banana Republic, and Old Navy as distinct websites sharing backend infrastructure

---

## Part 1: Business Case

### 1.1 The Two Businesses

#### Metrosure Insurance Brokers (Pty) Ltd

| Attribute | Detail |
|-----------|--------|
| **Business Type** | Regulated Financial Services Provider |
| **FSP Number** | 47089 |
| **Regulator** | Financial Sector Conduct Authority (FSCA) |
| **Services** | Short-term insurance, life cover, funeral cover, risk advisory |
| **Target Audience** | Individuals, families, SMEs |
| **Average Transaction** | R500 - R50,000/year |
| **Decision Timeline** | Days to weeks |
| **Trust Signals** | FSP licence, regulatory compliance, claims history, insurer partnerships |
| **Primary CTA** | "Get a Quote" |

#### Metrosure Consult

| Attribute | Detail |
|-----------|--------|
| **Business Type** | B2B Consulting / Outsourced Services |
| **Regulator** | None specific (general business) |
| **Services** | Outsourced sales & marketing, HR solutions, call centre services, device insurance programmes, digital transformation |
| **Target Audience** | Retailers, corporations, enterprises |
| **Average Transaction** | R500,000 - R5,000,000+ per project |
| **Decision Timeline** | Months to years |
| **Trust Signals** | Case studies, client testimonials, implementation track record |
| **Primary CTA** | "Schedule a Consultation" |

### 1.2 Regulatory Landscape

#### FSCA Requirements for Insurance Brokers

The Financial Sector Conduct Authority (FSCA) imposes strict requirements on FSP licence holders:

| Requirement | Implication for Website |
|-------------|------------------------|
| **FSP Disclosure** | Licence number must be prominently displayed |
| **Complaints Procedure** | Must be accessible and clearly documented |
| **TCF Principles** | Content must demonstrate "Treating Customers Fairly" |
| **Product Licensing** | Only display products the FSP is authorised to advise on |
| **Record Keeping** | Forms must capture required information |
| **Marketing Rules** | Cannot make misleading claims about financial products |

**Compliance Risk:** Mixing unregulated consulting content with regulated insurance content on the same domain creates ambiguity about which content falls under FSP requirements.

> "The FSCA debarred 131 individuals, suspended 24 licences, and withdrew 382 licences in 2024/25 after concluding 633 investigations." - [FSCA 2025](https://www.fsca.co.za/)

#### B2B Consulting: No Specific Regulator

Metrosure Consult operates under general business law with no sector-specific regulator. This freedom is compromised when co-located with regulated content.

### 1.3 Digital Marketing Impact

#### SEO: The Topical Authority Problem

Google's ranking algorithms favour websites with **topical authority** - demonstrated expertise in a focused subject area.

| Scenario | SEO Outcome |
|----------|-------------|
| Site covers car insurance + funeral cover + quotes + claims | Strong topical authority for insurance |
| Site covers HR consulting + sales outsourcing + digital transformation | Strong topical authority for B2B services |
| **Site covers both simultaneously** | **Diluted authority, poor rankings for both** |

> "A website that talks about car insurance AND digital transformation consulting will rank poorly for both because it lacks focus." - Industry best practice

#### Content Strategy Conflict

| Insurance Content | B2B Consulting Content |
|-------------------|----------------------|
| "5 Tips for Lowering Your Car Insurance Premium" | "How Outsourced Sales Teams Drive 40% Revenue Growth" |
| "What to Do When You Need to File a Claim" | "Case Study: TFG Partnership Success" |
| "Understanding Life Cover vs Funeral Cover" | "The Future of Retail Device Insurance" |

These content types attract **mutually exclusive audiences**. Publishing both confuses search engines and visitors about the site's purpose.

### 1.4 Industry Precedents

#### Successful Corporate Separations

| Company | Separation | Outcome |
|---------|------------|---------|
| **eBay/PayPal** (2015) | E-commerce vs payments | PayPal market cap grew from $49B to $82B |
| **HP/HPE** (2015) | Consumer PCs vs enterprise IT | HPE reported $28B annual revenue by 2022 |
| **Gap Inc.** | Gap, Banana Republic, Old Navy | Distinct brands, shared backend, clear positioning |
| **Unilever** | House of brands | Consistent brand language, individual identities |

> "EY reported that slow spins generated negative total shareholder returns, whereas spins executed within 7 to 16 months had positive returns." - [EY Divestiture Study](https://www.ey.com/en_us/insights/divestitures/six-ways-to-boost-it-transformation-in-a-divestiture)

#### Key Success Factors

1. **Clear SpinCo identity** - Each entity has distinct positioning
2. **Shared infrastructure where appropriate** - Backend efficiency, frontend differentiation
3. **Decisive execution** - 7-16 month timeline correlates with success
4. **Parent company attention** - 63% of companies under-emphasise the parent during separation

---

## Part 2: Current State Analysis

### 2.1 Existing Infrastructure

**Good news:** The current Metrosure website codebase already has significant separation infrastructure in place.

#### Route Structure (Already Separated)

| Business Unit | Routes | Status |
|---------------|--------|--------|
| **Insurance (B2C)** | `/insurance/auto`, `/insurance/home`, `/insurance/life`, `/insurance/business`, `/insurance/compare`, `/quote`, `/claims`, `/policies`, `/tools/coverage-calculator` | Active |
| **Consulting (B2B)** | `/partners`, `/corporate` | Active, marked with "B2B" badge |
| **Shared** | `/`, `/about`, `/contact`, `/careers`, `/help`, `/legal`, `/privacy`, `/terms` | Would need duplication |

#### Component Organisation (Already Separated)

```
src/components/
├── partners/          # B2B - 11 files
│   ├── PartnersHero.tsx
│   ├── SuccessMetrics.tsx
│   ├── ValueProposition.tsx
│   ├── HowItWorks.tsx
│   ├── PartnerBenefits.tsx
│   ├── CaseStudies.tsx
│   ├── PartnerTestimonials.tsx
│   ├── PartnerFAQ.tsx
│   └── PartnerInquiryForm.tsx
│
├── corporate/         # B2B - 7 files
│   ├── CorporateHero.tsx
│   ├── CorporateServices.tsx
│   ├── CorporateProcess.tsx
│   ├── CorporateBenefits.tsx
│   ├── CorporateFAQ.tsx
│   └── CorporateInquiryForm.tsx
│
├── insurance/         # B2C - Insurance components
├── quote/             # B2C - Quote form
├── tools/             # B2C - Calculators
└── [shared]           # Header, Footer, etc.
```

#### Data Files (Already Separated)

| Business Unit | Data Files |
|---------------|------------|
| **Insurance** | `policies.ts`, `calculatorData.ts`, `insuranceComparison.ts`, `claims.ts` |
| **B2B** | `partnerServices.ts`, `corporateServices.ts`, `caseStudies.ts`, `partners.ts` |
| **Shared** | `aboutPage.ts`, `formOptions.ts`, `news.ts`, `jobs.ts`, `faqs.ts` |

#### Email Routing (Already Separated)

| Inquiry Type | Email Destination |
|--------------|-------------------|
| General contact, quotes | `info@metrosuregroup.co.za` |
| Partner/corporate inquiries | `clients@metrosureconsult.co.za` |
| Career applications | `careers@metrosuregroup.co.za` |

### 2.2 Separation Readiness Score

| Criterion | Status | Score |
|-----------|--------|-------|
| Route separation | Complete | 9/10 |
| Component isolation | Complete | 9/10 |
| Data file separation | Complete | 8/10 |
| Email routing | Complete | 10/10 |
| Navigation badges | In place ("B2B" labels) | 8/10 |
| Shared components identified | Header, Footer need duplication | 7/10 |
| **Overall Readiness** | **High** | **8.5/10** |

### 2.3 What's Already Built

The current codebase represents significant development investment:

| Metric | Count |
|--------|-------|
| Total TypeScript/TSX files | 152 |
| Pages | 31 |
| API routes | 7 |
| Data files | 14 |
| Lines of data code | ~4,400 |
| Development sessions | 85 |

**Implication:** The separation project is largely a restructuring exercise, not a rebuild. Most components can be reused.

---

## Part 3: Recommended Architecture

### 3.1 Three-Site Model (Recommended)

```
┌─────────────────────────────────────────────────────────────────┐
│                    METROSURE GROUP                              │
│                 metrosuregroup.co.za                            │
│          (Corporate holding, investor relations)                │
└───────────────────────┬─────────────────────────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
┌───────────────────────┐     ┌───────────────────────┐
│  METROSURE INSURANCE  │     │   METROSURE CONSULT   │
│ metrosure-insurance   │     │   metrosure-consult   │
│      .co.za           │     │       .co.za          │
│                       │     │                       │
│  - Auto insurance     │     │  - Outsourced sales   │
│  - Home insurance     │     │  - Device insurance   │
│  - Life & Funeral     │     │  - Call centre        │
│  - Business cover     │     │  - Corporate benefits │
│  - Quote calculator   │     │  - HR solutions       │
│  - Claims portal      │     │  - Case studies       │
└───────────────────────┘     └───────────────────────┘
        │                               │
        └───────────┬───────────────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │    SHARED BACKEND     │
        │                       │
        │  - Component library  │
        │  - Design system      │
        │  - Email service      │
        │  - Analytics          │
        └───────────────────────┘
```

#### Domain Strategy

| Property | Primary Domain | Alternative |
|----------|---------------|-------------|
| Insurance | metrosure-insurance.co.za | metrosureinsurance.co.za |
| Consulting | metrosure-consult.co.za | metrosureconsult.co.za |
| Corporate | metrosuregroup.co.za | (existing) |

#### Technical Implementation

| Aspect | Approach |
|--------|----------|
| **Hosting** | Vercel (same provider, separate projects) |
| **Codebase** | Monorepo with shared packages, or separate repos |
| **Design System** | Shared component library via npm package |
| **Analytics** | Separate Vercel Analytics projects |
| **Email** | Shared Resend account, separate sender addresses |
| **Live Chat** | Separate Tawk.to widgets per site |

### 3.2 Alternative: Subdomain Strategy

If separate domains are not preferred:

```
insurance.metrosuregroup.co.za  →  Insurance site
consult.metrosuregroup.co.za    →  Consulting site
metrosuregroup.co.za            →  Corporate portal
www.metrosuregroup.co.za        →  Redirects to corporate
```

**Pros:**
- Single domain registration
- Unified SSL certificate (wildcard)
- Clear brand unity

**Cons:**
- Reduced SEO benefit (subdomains treated as same domain)
- Less perceived independence of business units
- More complex routing

### 3.3 Alternative: Clear Sectioning

If a single site is absolutely required:

```
metrosuregroup.co.za/
├── /insurance/      →  Complete insurance section
├── /business/       →  Complete B2B section (renamed from /partners + /corporate)
└── [shared pages]   →  About, Contact, Careers
```

**Implementation:**
- Homepage with clear pathway selection (Consumer/Business)
- Distinct navigation per section
- Different design treatments (colour temperature, imagery)
- Section-specific headers/footers

**Cons:**
- Persistent SEO dilution
- Brand confusion remains
- Not recommended for long-term growth

---

## Part 4: Site Structures

### 4.1 metrosure-insurance.co.za

#### Site Map

```
metrosure-insurance.co.za/
│
├── /                         # Homepage - Insurance focus
│
├── /insurance/
│   ├── /auto                 # Car insurance
│   ├── /home                 # Home insurance
│   ├── /life                 # Life & Funeral cover
│   ├── /business             # Business insurance
│   └── /compare              # Product comparison
│
├── /tools/
│   └── /coverage-calculator  # Coverage needs calculator
│
├── /quote                    # Multi-step quote form
├── /claims                   # Claims process & portal
├── /policies                 # Policy management (login)
├── /help                     # Help centre / FAQs
│
├── /about                    # Company story (insurance focus)
├── /contact                  # Contact form
├── /careers                  # Job listings
│
└── /legal/
    ├── /terms               # Terms of service
    ├── /privacy             # Privacy policy
    └── /complaints          # FSP complaints procedure
```

#### Navigation Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]   Insurance ▼  |  Tools  |  About  |  Contact  | [CTA] │
│                        |         |         |           |       │
│           ├─ Auto      |         |         |           | Get a │
│           ├─ Home      |         |         |           | Quote │
│           ├─ Life      |         |         |           |       │
│           ├─ Business  |         |         |           |       │
│           └─ Compare   |         |         |           |       │
└─────────────────────────────────────────────────────────────────┘
```

#### Key Features

| Feature | Priority | Status |
|---------|----------|--------|
| Quote calculator | Essential | Built |
| Coverage calculator | Essential | Built |
| Claims portal | Essential | Built |
| Policy management | Essential | Built |
| Live chat (insurance hours) | High | Built |
| FSP disclosure footer | Regulatory | Needed |

### 4.2 metrosure-consult.co.za

#### Site Map

```
metrosure-consult.co.za/
│
├── /                         # Homepage - B2B focus
│
├── /services/
│   ├── /retail-partnerships  # In-store campaigns
│   ├── /sales-marketing      # Outsourced sales
│   ├── /device-insurance     # Device protection programmes
│   ├── /call-centre          # Call centre services
│   └── /corporate-benefits   # Group schemes
│
├── /case-studies/
│   ├── /tfg-jet             # TFG/Jet partnership
│   ├── /techzone            # TechZone case study
│   └── /homestyle           # HomeStyle case study
│
├── /resources/
│   ├── /whitepapers         # Downloadable content
│   └── /insights            # Industry articles
│
├── /about                    # Company story (B2B focus)
├── /contact                  # Contact / inquiry form
├── /careers                  # Job listings
│
└── /legal/
    ├── /terms               # Terms of service
    └── /privacy             # Privacy policy
```

#### Navigation Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]   Services ▼  | Case Studies | Resources | Contact     │
│                       |              |           |             │
│           ├─ Retail   |              |           |  [Schedule  │
│           ├─ Sales    |              |           |   a Call]   │
│           ├─ Devices  |              |           |             │
│           ├─ Call Ctr |              |           |             │
│           └─ Benefits |              |           |             │
└─────────────────────────────────────────────────────────────────┘
```

#### Key Features

| Feature | Priority | Status |
|---------|----------|--------|
| Case studies showcase | Essential | Built |
| Partner inquiry form | Essential | Built |
| Corporate inquiry form | Essential | Built |
| Resource downloads | High | Planned |
| Meeting scheduler | High | Planned |
| Live chat (business hours) | Medium | Built |

### 4.3 metrosuregroup.co.za

#### Site Map

```
metrosuregroup.co.za/
│
├── /                         # Corporate homepage
│
├── /about/
│   ├── /story               # Group history
│   ├── /leadership          # Executive team
│   ├── /values              # Mission & values
│   └── /timeline            # Company milestones
│
├── /businesses/
│   ├── /insurance           # Link to insurance site
│   └── /consulting          # Link to consulting site
│
├── /news                     # Group news & press
├── /careers                  # All group vacancies
├── /contact                  # General inquiries
│
└── /legal/
    ├── /terms               # Group terms
    └── /privacy             # Group privacy policy
```

#### Navigation Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]   About ▼  |  Businesses ▼  |  News  |  Careers  |     │
│                    |                |        |           |     │
│           ├─ Story |  ├─ Insurance  |        |           |     │
│           ├─ Team  |  └─ Consulting |        |           |     │
│           └─ Values|                |        |           |     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Part 5: Migration Playbook

### Overview

| Phase | Duration | Focus |
|-------|----------|-------|
| Phase 1 | Weeks 1-2 | Preparation & planning |
| Phase 2 | Weeks 3-4 | Infrastructure setup |
| Phase 3 | Weeks 5-8 | Content migration |
| Phase 4 | Weeks 9-10 | Testing & soft launch |
| Phase 5 | Weeks 11-12 | Full launch & optimisation |

### 5.1 Phase 1: Preparation (Weeks 1-2)

#### Week 1: Audit & Planning

| Task | Owner | Deliverable |
|------|-------|-------------|
| Complete content audit | Content team | Spreadsheet of all pages, their purpose, target site |
| Map all URLs | Technical | URL mapping document |
| Identify shared components | Development | Component dependency graph |
| Set up project structure | Development | Monorepo or separate repos decision |
| Register domains | IT/Legal | Domain ownership confirmed |

#### Week 2: Design & Brand

| Task | Owner | Deliverable |
|------|-------|-------------|
| Define brand guidelines per site | Marketing | Brand guide documents |
| Create design tokens per site | Design | Tailwind config variations |
| Plan navigation structures | UX | Navigation wireframes |
| Define SEO strategy | Marketing | Keyword allocation per site |
| Stakeholder sign-off | Leadership | Approved designs |

### 5.2 Phase 2: Infrastructure (Weeks 3-4)

#### Week 3: Technical Setup

| Task | Owner | Deliverable |
|------|-------|-------------|
| Create Vercel projects | Development | 3 Vercel projects configured |
| Set up DNS records | IT | DNS pointing to Vercel |
| Configure SSL certificates | IT | HTTPS active on all domains |
| Set up separate analytics | Development | Vercel Analytics per project |
| Create shared component package | Development | npm package published |

#### Week 4: Base Applications

| Task | Owner | Deliverable |
|------|-------|-------------|
| Fork/copy codebase | Development | 3 Next.js applications |
| Implement brand variations | Development | Different headers/footers/colours |
| Set up email routing | Development | Resend configured per site |
| Configure Tawk.to widgets | Operations | Separate widgets per site |
| Test basic functionality | QA | Smoke test passed |

### 5.3 Phase 3: Content Migration (Weeks 5-8)

#### Week 5-6: Insurance Site

| Task | Owner | Deliverable |
|------|-------|-------------|
| Migrate insurance pages | Development | All `/insurance/*` pages live |
| Migrate quote system | Development | Quote form functional |
| Migrate calculator | Development | Coverage calculator live |
| Migrate claims pages | Development | Claims process documented |
| Update About page (insurance focus) | Content | Insurance-focused company story |
| Implement FSP footer | Development | Regulatory compliance |

#### Week 7-8: Consulting Site

| Task | Owner | Deliverable |
|------|-------|-------------|
| Migrate B2B pages | Development | All partner/corporate pages live |
| Migrate case studies | Development | Case studies showcase |
| Migrate inquiry forms | Development | Forms functional |
| Update About page (B2B focus) | Content | B2B-focused company story |
| Create resources section | Content | Placeholder for whitepapers |
| Implement B2B navigation | Development | Distinct B2B experience |

#### Corporate Site (Ongoing)

| Task | Owner | Deliverable |
|------|-------|-------------|
| Create minimal corporate site | Development | Group overview live |
| Link to subsidiary sites | Development | Clear pathways |
| Migrate news/careers | Development | Shared content accessible |

### 5.4 Phase 4: Testing & Soft Launch (Weeks 9-10)

#### Week 9: Internal Testing

| Task | Owner | Deliverable |
|------|-------|-------------|
| Cross-browser testing | QA | Test report |
| Mobile responsiveness testing | QA | Mobile test report |
| Form submission testing | QA | All forms verified |
| Analytics verification | Development | Tracking confirmed |
| Performance testing | Development | Core Web Vitals passing |
| Accessibility audit | QA | WCAG compliance check |

#### Week 10: Soft Launch

| Task | Owner | Deliverable |
|------|-------|-------------|
| Internal team preview | All | Feedback collected |
| Fix critical issues | Development | Blockers resolved |
| Implement redirects | Development | 301 redirects active |
| Update Google Search Console | Marketing | New properties added |
| Prepare launch communication | Marketing | Announcement ready |

### 5.5 Phase 5: Full Launch & Optimisation (Weeks 11-12)

#### Week 11: Launch

| Task | Owner | Deliverable |
|------|-------|-------------|
| Go live | Development | Sites publicly accessible |
| Activate redirects from old site | Development | Old URLs redirect correctly |
| Monitor analytics | Marketing | Real-time monitoring |
| Monitor error logs | Development | Error tracking active |
| Customer communication | Marketing | Email/social announcement |

#### Week 12: Optimisation

| Task | Owner | Deliverable |
|------|-------|-------------|
| Review analytics data | Marketing | Initial performance report |
| Fix post-launch issues | Development | Issues resolved |
| SEO monitoring | Marketing | Ranking preservation confirmed |
| Stakeholder review | Leadership | Launch retrospective |
| Documentation update | Development | SESSION_HANDOVER updated |

---

## Part 6: Risk Mitigation

### 6.1 SEO Preservation

#### Redirect Strategy

Every URL on the current site must redirect to its new location:

| Old URL | New URL | Type |
|---------|---------|------|
| `metrosuregroup.co.za/insurance/*` | `metrosure-insurance.co.za/insurance/*` | 301 |
| `metrosuregroup.co.za/partners` | `metrosure-consult.co.za/services/retail-partnerships` | 301 |
| `metrosuregroup.co.za/corporate` | `metrosure-consult.co.za/services/corporate-benefits` | 301 |
| `metrosuregroup.co.za/quote` | `metrosure-insurance.co.za/quote` | 301 |
| `metrosuregroup.co.za/about` | `metrosuregroup.co.za/about` | No change |

#### Link Equity Preservation

| Action | Purpose |
|--------|---------|
| 301 redirects (not 302) | Permanent redirects pass link equity |
| Update internal links | All internal links point to correct domain |
| Update backlinks where possible | Contact key referring sites |
| Submit new sitemaps | Inform search engines of new structure |
| Monitor Search Console | Watch for crawl errors |

#### Expected SEO Impact

| Timeframe | Expected Outcome |
|-----------|------------------|
| Week 1-2 | Temporary ranking fluctuation (normal) |
| Week 3-4 | Rankings stabilise |
| Month 2-3 | Improved rankings for focused content |
| Month 6+ | Strong topical authority per site |

### 6.2 Redirect Strategy

#### Implementation in Next.js

```typescript
// next.config.ts (old site)
export default {
  async redirects() {
    return [
      {
        source: '/insurance/:path*',
        destination: 'https://metrosure-insurance.co.za/insurance/:path*',
        permanent: true,
      },
      {
        source: '/partners',
        destination: 'https://metrosure-consult.co.za/services/retail-partnerships',
        permanent: true,
      },
      {
        source: '/corporate',
        destination: 'https://metrosure-consult.co.za/services/corporate-benefits',
        permanent: true,
      },
      // ... more redirects
    ];
  },
};
```

### 6.3 Analytics Continuity

#### Tracking Setup

| Site | Analytics Property | Custom Events |
|------|-------------------|---------------|
| Insurance | `metrosure-insurance` | `quote_submitted`, `contact_submitted`, `calculator_used` |
| Consulting | `metrosure-consult` | `partner_inquiry_submitted`, `corporate_inquiry_submitted` |
| Corporate | `metrosure-group` | `careers_viewed`, `contact_submitted` |

#### Historical Data

- Export data from current Vercel Analytics before migration
- Document baseline metrics for comparison
- Set up cross-domain tracking if needed

---

## Part 7: Investment & Resources

### 7.1 Resource Requirements

#### Development Team

| Role | Effort | Duration |
|------|--------|----------|
| Lead Developer | 80% | 12 weeks |
| Frontend Developer | 100% | 8 weeks (Phases 2-4) |
| QA Engineer | 50% | 4 weeks (Phases 4-5) |

#### Content & Marketing

| Role | Effort | Duration |
|------|--------|----------|
| Content Writer | 50% | 6 weeks (Phases 1, 3) |
| SEO Specialist | 25% | 12 weeks (ongoing) |
| Marketing Manager | 25% | 12 weeks (oversight) |

#### Operations

| Role | Effort | Duration |
|------|--------|----------|
| IT/DevOps | 25% | 4 weeks (Phases 2, 5) |
| Project Manager | 25% | 12 weeks (coordination) |

### 7.2 Timeline Summary

```
Week  1  2  3  4  5  6  7  8  9  10  11  12
      ├──────┤                              Phase 1: Preparation
            ├──────┤                        Phase 2: Infrastructure
                  ├──────────────┤          Phase 3: Content Migration
                              ├──────┤      Phase 4: Testing
                                    ├──────┤ Phase 5: Launch
```

### 7.3 Budget Estimates [REMOVABLE]

> **Note:** These are indicative estimates. Remove or adjust based on actual resource costs.

| Category | Low Estimate | High Estimate |
|----------|--------------|---------------|
| Development (internal) | R150,000 | R300,000 |
| Domain registration (3 domains, 2 years) | R1,500 | R3,000 |
| Additional hosting (if needed) | R0 | R12,000/year |
| Content creation | R25,000 | R50,000 |
| SEO monitoring tools | R5,000 | R15,000/year |
| **Total (initial)** | **R181,500** | **R380,000** |

**Ongoing costs:** Approximately R15,000-R30,000/year additional for multiple domains and analytics.

---

## Part 8: Success Metrics

### 8.1 KPIs

#### Business Metrics

| KPI | Current Baseline | 3-Month Target | 6-Month Target |
|-----|-----------------|----------------|----------------|
| Insurance quote requests | [baseline] | +15% | +25% |
| B2B inquiry submissions | [baseline] | +20% | +35% |
| Time to quote (insurance) | [baseline] | -20% | -30% |
| Lead quality score | [baseline] | +10% | +20% |

#### Technical Metrics

| KPI | Current | Target |
|-----|---------|--------|
| Page load time (LCP) | [baseline] | <2.5s |
| Bounce rate (insurance) | [baseline] | -15% |
| Bounce rate (B2B) | [baseline] | -20% |
| Mobile usability score | [baseline] | 95+ |

#### SEO Metrics

| KPI | Current | 3-Month Target | 6-Month Target |
|-----|---------|----------------|----------------|
| Organic traffic (insurance) | [baseline] | -10% (expected dip) | +20% |
| Organic traffic (B2B) | [baseline] | -10% (expected dip) | +30% |
| Keyword rankings (insurance) | [baseline] | Maintain | +15% improvement |
| Keyword rankings (B2B) | [baseline] | Maintain | +25% improvement |

### 8.2 Measurement Framework

#### Weekly Reporting (Weeks 1-12)

- Redirect functionality check
- Crawl error monitoring
- Traffic comparison vs baseline
- Conversion tracking

#### Monthly Reporting (Post-Launch)

- Full SEO performance review
- Conversion rate analysis
- User feedback synthesis
- Competitive positioning update

---

## Appendix A: Technical Specifications

### Repository Structure (Monorepo)

```
metrosure/
├── apps/
│   ├── insurance/          # Insurance site
│   │   ├── src/
│   │   └── package.json
│   ├── consult/            # Consulting site
│   │   ├── src/
│   │   └── package.json
│   └── corporate/          # Corporate site
│       ├── src/
│       └── package.json
│
├── packages/
│   ├── ui/                 # Shared components
│   │   ├── src/
│   │   └── package.json
│   ├── design-tokens/      # Shared design system
│   └── utils/              # Shared utilities
│
├── turbo.json             # Turborepo config
└── package.json           # Root package
```

### Shared Package: @metrosure/ui

```typescript
// packages/ui/src/index.ts
export { Header } from './Header';
export { Footer } from './Footer';
export { Button } from './Button';
export { Card } from './Card';
export { Form, Input, Select, Textarea } from './Form';
export { animations } from './animations';
```

### Brand Tokens

```typescript
// packages/design-tokens/src/insurance.ts
export const insuranceTheme = {
  colors: {
    primary: '#BF0603',      // Same red
    secondary: '#690025',    // Same maroon
    accent: '#F2CC8E',       // Same yellow
    background: '#FFFFFF',
    text: '#1a1a1a',
  },
  // Warm, trustworthy
};

// packages/design-tokens/src/consult.ts
export const consultTheme = {
  colors: {
    primary: '#690025',      // Maroon as primary (more corporate)
    secondary: '#BF0603',    // Red as secondary
    accent: '#1E3A5F',       // Navy blue for enterprise feel
    background: '#F8F9FA',
    text: '#1a1a1a',
  },
  // Professional, innovative
};
```

---

## Appendix B: Redirect Map Template

| Priority | Old URL | New URL | Notes |
|----------|---------|---------|-------|
| 1 | `/insurance/auto` | `insurance.../insurance/auto` | Direct mapping |
| 1 | `/insurance/home` | `insurance.../insurance/home` | Direct mapping |
| 1 | `/insurance/life` | `insurance.../insurance/life` | Direct mapping |
| 1 | `/insurance/business` | `insurance.../insurance/business` | Direct mapping |
| 1 | `/insurance/compare` | `insurance.../insurance/compare` | Direct mapping |
| 1 | `/quote` | `insurance.../quote` | Direct mapping |
| 1 | `/claims` | `insurance.../claims` | Direct mapping |
| 1 | `/tools/coverage-calculator` | `insurance.../tools/coverage-calculator` | Direct mapping |
| 2 | `/partners` | `consult.../services/retail-partnerships` | Renamed |
| 2 | `/corporate` | `consult.../services/corporate-benefits` | Renamed |
| 3 | `/about` | `group.../about` | Stays on group site |
| 3 | `/contact` | Determine based on context | May need landing page |
| 3 | `/careers` | `group.../careers` | Shared careers |
| 4 | `/help` | `insurance.../help` | Primary is insurance |
| 4 | `/policies` | `insurance.../policies` | Insurance-specific |

---

## Appendix C: Launch Checklist

### Pre-Launch (T-7 days)

- [ ] All redirects tested and working
- [ ] SSL certificates active on all domains
- [ ] Analytics tracking verified
- [ ] Forms submitting to correct email addresses
- [ ] Mobile responsive on all sites
- [ ] Dark mode working on all sites
- [ ] FSP disclosure visible on insurance site
- [ ] Live chat widgets configured
- [ ] Error pages (404, 500) customised
- [ ] Favicon and meta images per site

### Launch Day

- [ ] DNS propagation confirmed
- [ ] Old site redirects activated
- [ ] Search Console properties updated
- [ ] Social media profiles updated
- [ ] Email signatures updated
- [ ] Google Ads campaigns updated
- [ ] Team notified of live status
- [ ] Monitoring dashboards active

### Post-Launch (T+7 days)

- [ ] Review error logs for issues
- [ ] Check redirect functionality
- [ ] Monitor Search Console for crawl errors
- [ ] Review analytics data
- [ ] Collect user feedback
- [ ] Document any issues found
- [ ] Plan follow-up optimisations

---

## References

### Multi-Brand Architecture
- [Webstacks: Multi-Brand Website Examples](https://www.webstacks.com/blog/multi-brand-websites)
- [Frontify: Multi-Brand Architecture](https://www.frontify.com/en/guide/multi-brand-architecture)
- [FINE: Multi-Brand Websites](https://www.wearefine.com/news/best-multi-brand-websites/)
- [Alokai: Multibrand Website Examples](https://alokai.com/blog/multibrand-website-examples)

### Corporate Divestitures
- [PwC: Successful Spinoffs](https://www.pwc.com/us/en/services/consulting/deals/divestitures/successful-spinoffs.html)
- [EY: IT Transformation in Divestitures](https://www.ey.com/en_us/insights/divestitures/six-ways-to-boost-it-transformation-in-a-divestiture)
- [Bain: Divestitures Consulting](https://www.bain.com/consulting-services/mergers-acquisitions/divestitures-and-spin-offs/)
- [Ansarada: Corporate Spin Off](https://www.ansarada.com/mergers-acquisitions/divestiture/spin-off)

### Website Migration
- [Webstacks: Enterprise Website Migration](https://www.webstacks.com/blog/enterprise-website-migration)
- [Conductor: Website Migrations Guide](https://www.conductor.com/academy/website-migrations/)
- [Search Engine Journal: Website Migration Best Practices](https://www.searchenginejournal.com/essential-steps-website-migration/491862/)

### Regulatory (South Africa)
- [FSCA Official Site](https://www.fsca.co.za/)
- [SALVUS: FSP in South Africa 2025](https://salvusfunds.com/2025/02/25/establishing-a-financial-service-provider-in-south-africa-in-2025/)

### B2B Website Best Practices
- [BlendB2B: Website Design for Consulting Firms](https://www.blendb2b.com/blog/best-website-design-agencies-management-consulting-firms)
- [BlendB2B: B2B Website Design Agencies](https://www.blendb2b.com/blog/the-10-best-b2b-website-design-agencies)

---

*Document prepared by Digital Strategy Team*
*Metrosure Group - January 2026*
