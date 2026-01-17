# Metrosure Insurance Brokers - Strategic Roadmap

**Document Type:** Future Implementation Plan
**Created:** 17 January 2026
**Status:** For Review & Discussion

---

## Executive Summary

This roadmap outlines strategic improvements to transform Metrosure from a solid insurance broker website into an industry-leading digital platform. Based on competitive analysis (Groups R Us) and industry best practices, we've identified key gaps and high-impact opportunities organised into three implementation phases.

**Current Strengths:**
- Modern tech stack (Next.js 16, React 19, TypeScript)
- Superior visual design and animations
- Interactive calculators (life cover, funeral cover)
- Comprehensive multi-step quote system
- Well-organised FAQ system (100+ entries, 11 categories)

**Key Opportunity Areas:**
- B2B2C channel expansion (brokers, credit providers, funeral parlours)
- Value-added service bundles
- Client self-service portal
- Content marketing & thought leadership
- Trust signals and social proof

---

## Competitive Analysis: Metrosure vs Groups R Us

| Feature | Metrosure | Groups R Us | Gap? |
|---------|-----------|-------------|------|
| Visual Design | ✅ Modern, animated | ⚠️ Functional, basic | GRU behind |
| Quote System | ✅ Multi-step with calculator | ⚠️ Basic forms | GRU behind |
| Interactive Calculators | ✅ Life + Funeral | ❌ None visible | GRU behind |
| FAQ System | ✅ 100+ organised by category | ⚠️ Basic | GRU behind |
| Client Segmentation | ⚠️ Partners + Corporate | ✅ 5+ distinct segments | **GAP** |
| Value-Added Services | ❌ None | ✅ Airtime, grocery, legal | **GAP** |
| Hospital Cashback | ❌ None | ✅ Offered | **GAP** |
| Loyalty Programme | ❌ None | ✅ Employee rewards | **GAP** |
| Claims Documentation | ⚠️ Process steps | ✅ Detailed by client type | **GAP** |
| Blog/Media Centre | ❌ None | ✅ Media section | **GAP** |
| Dedicated Specialists | ⚠️ General contact | ✅ Named per segment | **GAP** |
| Credit Provider Tools | ❌ None | ✅ Integrated products | **GAP** |
| Social Media Integration | ⚠️ Links only | ✅ Active presence | **GAP** |

---

## Phase 1: Quick Wins (1-2 Weeks)

High-impact, low-effort improvements for immediate presentation value.

### 1.1 Client Segmentation Pages
**Business Value:** Demonstrates understanding of diverse client needs; increases conversion by speaking directly to each audience.

| Page | Target Audience | Key Content |
|------|-----------------|-------------|
| `/brokers` | Insurance brokers, FSP holders | Commission structure, product portfolio, support tools, dedicated contact |
| `/credit-providers` | Micro-lenders, loan providers | Credit life integration, API capabilities, loan protection products |
| `/funeral-parlours` | Funeral homes, burial societies | Administration solutions, group policies, repatriation services |
| `/employer-groups` | HR managers, trade unions | Group benefits overview, staff wellness, bulk admin |

**Deliverables:**
- 4 new landing pages with segment-specific messaging
- Named specialist contact per segment
- Tailored CTAs and inquiry forms

### 1.2 Trust Signals Enhancement
**Business Value:** Builds credibility; addresses "can I trust this company?" concerns.

| Element | Description |
|---------|-------------|
| **Partner Logos Section** | Display underwriter partnerships prominently (Sanlam, Old Mutual, etc.) |
| **Statistics with Sources** | Add citation badges (ASISA, FSC, industry reports) |
| **Awards & Accreditations** | FSP licence display, industry memberships |
| **Client Counter** | "X policies administered" or "X families protected" |

### 1.3 Claims Centre Enhancement
**Business Value:** Reduces support queries; demonstrates service quality.

| Feature | Description |
|---------|-------------|
| Claims documentation by product type | Step-by-step guides with downloadable checklists |
| Required documents list | Clear, scannable requirements |
| Estimated processing times | Set expectations upfront |
| Emergency contacts | 24/7 numbers prominently displayed |

---

## Phase 2: Feature Expansion (2-4 Weeks)

Significant new features that differentiate from competitors.

### 2.1 Value-Added Services Bundle
**Business Value:** Increases policy attractiveness; matches competitor offerings; creates upsell opportunities.

| Service | Description | Implementation |
|---------|-------------|----------------|
| **Grocery Benefit** | Monthly grocery voucher with policies | Partner integration or voucher system |
| **Airtime/Data Benefit** | Mobile top-up rewards | Voucher code distribution |
| **Legal Assistance** | Basic legal helpline access | Third-party partnership |
| **Funeral Administration** | Assistance with arrangements | Service provider network |
| **Tombstone Benefit** | Contribution toward memorial | Included in funeral cover tiers |

**New Component:** Product comparison cards showing included value-adds per tier.

### 2.2 Product Recommendation Wizard
**Business Value:** Guides confused visitors; increases qualified leads; demonstrates expertise.

**Flow:**
```
Step 1: Life stage → Individual / Family / Business Owner / Retiree
Step 2: Primary concern → Income protection / Funeral costs / Asset protection / Employee benefits
Step 3: Budget range → Entry / Standard / Premium
Step 4: Personalised recommendations with reasons
```

**Deliverables:**
- Interactive wizard component
- Recommendation algorithm
- Save/email results functionality

### 2.3 Blog & Resource Centre
**Business Value:** SEO value; thought leadership; answers pre-sales questions.

| Content Category | Example Topics |
|------------------|----------------|
| **Insurance Guides** | "Understanding Credit Life Insurance in SA" |
| **Financial Wellness** | "5 Signs You're Underinsured" |
| **Industry News** | FSCA updates, regulatory changes |
| **Client Stories** | Success stories (anonymised or with permission) |
| **Calculator Guides** | "How Much Life Cover Do You Really Need?" |

**Technical:**
- Blog index page with category filtering
- Individual article pages with related content
- Newsletter signup integration

### 2.4 Hospital Cashback Product
**Business Value:** Fills product gap; popular employee benefit.

| Feature | Description |
|---------|-------------|
| Product page | `/insurance/hospital-cash` |
| Calculator | Daily benefit × expected stay |
| Comparison | Show benefit vs actual hospital costs |
| Integration | Add to group benefits package |

---

## Phase 3: Platform Enhancement (1-2 Months)

Advanced features for competitive advantage.

### 3.1 Client Self-Service Portal
**Business Value:** Reduces admin overhead; improves client satisfaction; modernises service delivery.

| Feature | Description |
|---------|-------------|
| **Policy Dashboard** | View all active policies, coverage summaries |
| **Document Centre** | Download policy documents, tax certificates |
| **Claims Submission** | Upload documents, track claim status |
| **Payment History** | View payments, download statements |
| **Renewal Centre** | Upcoming renewals, easy renewal process |
| **Beneficiary Management** | Update beneficiaries online |

**Technical Considerations:**
- Authentication system (existing login page can be enhanced)
- Integration with policy administration system
- Document storage solution

### 3.2 Broker Portal
**Business Value:** Attracts broker partnerships; provides competitive admin tools.

| Feature | Description |
|---------|-------------|
| **Book Overview** | View all placed policies |
| **Commission Tracker** | Real-time commission visibility |
| **Quote Tool** | Generate quotes on behalf of clients |
| **Application Tracking** | Monitor application status |
| **Marketing Materials** | Download brochures, product sheets |
| **Training Resources** | Product training, compliance updates |

### 3.3 Corporate HR Dashboard
**Business Value:** Simplifies group administration; attracts corporate clients.

| Feature | Description |
|---------|-------------|
| **Employee Roster** | Manage covered employees |
| **Bulk Enrolment** | CSV upload for new employees |
| **Benefit Summary** | Overview of group coverage |
| **Claims Overview** | Aggregated claims data |
| **Renewal Management** | Group renewal facilitation |
| **Reporting** | Utilisation reports, cost analysis |

### 3.4 Loyalty & Rewards Programme
**Business Value:** Increases retention; adds perceived value; engagement driver.

| Feature | Description |
|---------|-------------|
| **Points System** | Earn points for timely payments, referrals |
| **Rewards Catalogue** | Redeem for vouchers, premium discounts |
| **Referral Programme** | "Refer a friend" with tracking |
| **Wellness Rewards** | Discounts for healthy behaviours |

### 3.5 AI-Powered Features
**Business Value:** Demonstrates innovation; improves user experience.

| Feature | Description |
|---------|-------------|
| **Smart Assistant** | AI chatbot for FAQs and guidance |
| **Needs Analysis** | Conversational coverage assessment |
| **Document Upload** | OCR for claim document processing |
| **Risk Profiling** | Automated risk questionnaire |

---

## Priority Matrix

| Feature | Impact | Effort | Priority |
|---------|--------|--------|----------|
| Client Segmentation Pages | High | Low | **P1** |
| Trust Signals Enhancement | High | Low | **P1** |
| Claims Centre Enhancement | Medium | Low | **P1** |
| Value-Added Services | High | Medium | **P2** |
| Product Recommendation Wizard | High | Medium | **P2** |
| Blog & Resource Centre | Medium | Medium | **P2** |
| Hospital Cashback Product | Medium | Low | **P2** |
| Client Self-Service Portal | High | High | **P3** |
| Broker Portal | High | High | **P3** |
| Corporate HR Dashboard | Medium | High | **P3** |
| Loyalty Programme | Medium | High | **P3** |
| AI Features | Medium | High | **P4** |

---

## Presentation Talking Points

When presenting to stakeholders, emphasise:

1. **Beyond GRU:** "We've analysed competitors like Groups R Us and identified where they excel—client segmentation and value-added services. Our roadmap addresses these gaps while leveraging our superior technology and design."

2. **B2B2C Ready:** "The platform will serve both direct consumers AND distribution partners—brokers, credit providers, funeral parlours—each with dedicated tools and support."

3. **Self-Service Future:** "Phase 3 introduces client portals that reduce admin overhead by 40-60% while improving client satisfaction through 24/7 access."

4. **Differentiation:** "No competitor in this space offers the combination of modern UX, interactive calculators, and comprehensive partner tools we're building."

---

## Immediate Next Steps

1. **Finalise Phase 1 Scope** - Which client segments are highest priority?
2. **Content Gathering** - Specialist contact details, value-add partnerships
3. **Design Review** - Approve page layouts for new sections
4. **Begin Implementation** - Start with highest-impact items

---

## Technical Notes (For Implementation)

**New Routes Required:**
```
/brokers
/credit-providers
/funeral-parlours
/employer-groups (enhance existing /corporate)
/blog
/blog/[slug]
/insurance/hospital-cash
/portal (client dashboard)
/portal/policies
/portal/claims
/portal/documents
```

**New Data Files:**
```
src/data/brokerServices.ts
src/data/creditProviderServices.ts
src/data/funeralParlourServices.ts
src/data/valueAddedServices.ts
src/data/blogPosts.ts
```

**Component Patterns:** Follow existing `src/components/{feature}/` structure with barrel exports.

---

*This roadmap is a living document. Priorities may shift based on stakeholder feedback and market conditions.*
