# Metrosure Insurance Brokers - Session Handover

**Updated:** December 31, 2025 (Session 58)
**Stack:** Next.js 16, TypeScript, Tailwind CSS v4, React 19, Framer Motion
**Dev:** `http://localhost:3000` | **Prod:** Vercel
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 40 (36 pages + 4 API routes)
- **Last Build:** December 31, 2025

---

## SESSION 58 (Dec 31, 2025)

### Focus: Housekeeping, Legal B2B Updates & Partner Logos

Documentation fixes, legal page B2B content additions, and partner logo integration.

### Completed
| Change | Files |
|--------|-------|
| Corrected claims/policies status (fully built, not under dev) | `SESSION_HANDOVER.md` |
| Removed claims/policies from under-development route mapping | `src/app/under-development/page.tsx` |
| Deleted unused SquigglyDivider component | `src/components/SquigglyDivider.tsx`, `src/components/index.ts` |
| Added B2B Services Data Handling section to Privacy Policy | `src/app/privacy/page.tsx` |
| Added B2B Services & Partnership Terms to Terms of Service | `src/app/terms/page.tsx` |
| Added B2B scope clarification to Legal Information FSP disclosure | `src/app/legal/page.tsx` |
| Added TFG and Bolttech logos to PartnerLogos component | `src/components/PartnerLogos.tsx` |
| Copied TFG/Bolttech SVG logos to public folder | `public/images/partners/` |
| Added PartnerLogos to homepage (dev-only, hidden on Vercel) | `src/app/page.tsx` |

### Legal Page B2B Additions
**Privacy Policy (Section 3):** B2B Services Data Handling
- Device Leasing data (ID, credit assessment, device serials)
- Call Centre data (recordings, 95% QA average)
- In-Store Campaign data (transactions, performance)
- POPIA-compliant data sharing disclosures
- 5-year retention per financial regulations

**Terms of Service (Section 5):** B2B Partnership Terms
- Service agreements scope
- Quality assurance commitments (95% QA)
- Data processing responsibilities (POPIA)
- Intellectual property protection
- Limitation of liability

**Legal Information:** FSP Disclosure Clarification
- Distinguishes regulated services (FSP 47089, FAIS)
- Non-regulated B2B services (In-Store, Device Leasing, Call Centre)

### Partner Logos Enhancement
- Created dedicated "Retail B2B Partners" section
- Added TFG and Bolttech SVG logos with Next.js Image
- Grayscale-to-colour hover effect
- Dark mode support with brightness/invert filters
- Hover tooltips with partner descriptions
- **Dev-only:** Hidden on Vercel production (`NODE_ENV === "development"`)

### Build Status
- Build passing with 40 routes
- Sitemap generated successfully

---

## SESSION 57 (Dec 31, 2025)

### Focus: B2B Form Enhancement & Navigation Updates

Major B2B UX improvements across forms, navigation, and help centre.

### Completed
| Change | Files |
|--------|-------|
| Quote form: Added Customer Type step (Individual/Business) | `src/app/quote/page.tsx` |
| Quote form: Added Business Info step (company, type, employees, industry) | `src/app/quote/page.tsx` |
| Quote form: Dynamic 5/6 step wizard based on customer type | `src/app/quote/page.tsx` |
| Quote API: B2B detection and email routing to clients@ | `src/app/api/quote/route.ts` |
| Validation: Added discriminated union schemas for B2B | `src/lib/validationSchemas.ts` |
| Contact form: Conditional required company name for B2B topics | `src/components/contact/ContactForm.tsx` |
| Contact API: B2B email routing to clients@ | `src/app/api/contact/route.ts` |
| Header: Added "B2B" badge to Partners link | `src/components/Header.tsx` |
| Footer: Added B2B Services section (4 services) | `src/components/Footer.tsx` |
| Help Centre: Added B2B Services category | `src/app/help/page.tsx` |
| Help Centre: Added 4 B2B FAQs (In-Store, Device Leasing, Call Centre, Sales) | `src/app/help/page.tsx` |

### Quote Form Changes
- **Step 1 (NEW):** Customer Type selection (Personal/Business cards)
- **Step 2 (NEW for Business):** Business Info (company name, business type dropdown, employee count, industry)
- **Dynamic steps:** Individual = 5 steps, Business = 6 steps
- **Business Quote Benefits:** Callout showing dedicated account management, group rates

### Email Routing
| Inquiry Type | Routed To |
|--------------|-----------|
| Individual quotes | info@metrosuregroup.co.za |
| Business quotes | clients@metrosuregroup.co.za |
| B2B contact topics | clients@metrosuregroup.co.za |
| General contact | info@metrosuregroup.co.za |

### B2B Contact Topics
- Retail Partnership (B2B)
- Business Insurance (B2B)
- Employee Benefits (B2B)

### Help Centre Additions
**New Category:** B2B Services
- In-Store Campaign partnerships
- Sales & Marketing support
- Device Leasing program
- Call Centre Services

**New FAQs:**
1. What is the In-Store Campaign program?
2. How does the Device Leasing program work?
3. What Call Centre Services does Metrosure offer?
4. Can Metrosure help with sales and marketing?

### Performance Analysis
| Metric | Value | Status |
|--------|-------|--------|
| CLS | 0.00 | ✅ Excellent |
| LCP (dev) | 3014ms | ⚠️ Dev mode |
| DOM Size | 810 elements | ✅ Reasonable |
| Render Blocking | 30ms CSS | ✅ Minimal |

Note: LCP render delay (2.7s) is due to React hydration + Framer Motion in dev mode. Production with CDN caching would be significantly faster.

### Build Status
- Build passing with 40 routes
- Sitemap generated successfully
- **Commit:** `5039ca3` - Session 56-57 pushed to main

---

## SESSION 56 (Dec 31, 2025)

### Focus: Visual Polish & UI Refinements

Partners page UX improvements and section dividers for visual hierarchy.

### Completed
| Change | Files |
|--------|-------|
| Reduced spacing between testimonials and CTA (pt-28/pb-16) | `src/components/partners/PartnerTestimonials.tsx` |
| Hide testimonial slider arrows on mobile (keep dots for touch) | `src/components/partners/PartnerTestimonials.tsx` |
| Changed email from partnerships@ to clients@metrosuregroup.co.za | `src/lib/email.ts`, `src/app/api/partner-inquiry/route.ts` |
| Removed red dot entirely from B2B badge | `src/components/partners/PartnersHero.tsx` |
| Removed red dot from Features "What we can do" badge | `src/components/Features.tsx` |

### Email Change
- `partnerships@metrosuregroup.co.za` → `clients@metrosuregroup.co.za`
- Updated in email config and partner-inquiry API route

### Build Status
- Build passing with 40 routes
- Sitemap generated successfully

---

## SESSION 55 (Dec 31, 2025)

### Focus: Homepage B2B Enhancement & Quote CTA

Enhanced homepage with stronger B2B positioning and prominent quote call-to-action.

### Completed
| Change | Files |
|--------|-------|
| Added 2 new B2B service cards (In-Store Campaigns, Sales & Marketing) | `src/components/Features.tsx` |
| Updated Features grid from 2x2 to 3x2 layout | `src/components/Features.tsx` |
| Created full-width QuoteCTABanner component | `src/components/QuoteCTABanner.tsx` (NEW) |
| Added QuoteCTABanner to homepage after WhyChooseUs | `src/app/page.tsx` |
| Exported QuoteCTABanner from components index | `src/components/index.ts` |

### New Service Cards Added
1. **In-Store Campaigns** - Deploy trained sales teams in retail spaces
2. **Sales & Marketing** - Data-driven customer acquisition with 95% QA, 75% sales increase

### QuoteCTABanner Component
- Full-width gradient banner with primary red (#BF0603)
- Chevron pattern overlay suggesting protection/shelter
- Animated entrance with Framer Motion
- Two CTAs: "Get a Free Quote" + "Talk to an Agent"
- Mobile responsive
- Trust badge: "5,000+ families trust us"

### Homepage Section Order (Updated)
```
Hero → StatsBar → Features (6 cards) → Approach → Products → WhyChooseUs → QuoteCTABanner (NEW) → PartnersCTA → Testimonials → CallToAction
```

### Build Status
- Build passing with 40 routes
- Sitemap generated successfully

### Deferred to Next Session
- [ ] Update navigation menu to reflect new services
- [ ] Update quote form with B2B options
- [ ] Update contact form with B2B inquiry types
- [ ] Update help centre FAQs with new services
- [ ] Update legal pages to mention new services

---

## SESSION 54 (Dec 31, 2025)

### Focus: Website-Wide Content Audit & Consistency

Comprehensive audit to ensure all pages consistently reflect the 2025 B2B positioning, particularly the founding year (2013 vs 2016).

### Completed
| Change | Files |
|--------|-------|
| Fixed founding year from 2016 → 2013 in 8 locations | Multiple files (see below) |
| Updated structured data `foundingDate` to 2013 | `src/app/layout.tsx` |
| Updated all meta descriptions to reference 2013 | `layout.tsx`, `about/layout.tsx` |
| Enhanced business insurance page with B2B stats | `src/app/insurance/business/page.tsx` |

### Files Modified
```
src/components/WhyChooseUs.tsx         # Line 186: "since 2013"
src/components/StatsBar.tsx            # Line 142: "2013" Established
src/components/careers/CareersHero.tsx # Line 74: "In 2013, we started..."
src/components/contact/FAQ.tsx         # Line 67: "Since 2013, we've created..."
src/app/layout.tsx                     # Lines 23, 78: meta + foundingDate
src/app/about/layout.tsx               # Lines 5, 8, 12: meta descriptions
src/app/help/page.tsx                  # Line 101: "since 2013"
src/app/insurance/business/page.tsx    # B2B stats added to benefits
```

### Business Insurance Page Enhancements
Added B2B differentiators:
- "100+ retail partners including TFG trust us"
- "75% average sales increase within 6 months"
- "95% daily quality assurance average"
- Updated description with TFG partnership mention

### Content Audit Summary
| Page | Status | Notes |
|------|--------|-------|
| Homepage | ✅ Updated | StatsBar now shows 2013 |
| About | ✅ Current | Timeline already correct (2013 Group, 2016 Brokers) |
| Help/FAQ | ✅ Updated | "since 2013" |
| Careers | ✅ Updated | Hero now says "In 2013, we started..." |
| Contact | ✅ Updated | FAQ references 2013 |
| Legal pages | ✅ Current | Dec 2025 dates, FSP 47089 |
| Business Insurance | ✅ Enhanced | B2B stats added |
| Partners | ✅ Current | Already B2B aligned |

### Build Status
- Build passing with 40 routes (36 pages + 4 API routes)
- No console errors
- Sitemap generated successfully

---

## SESSION 53 (Dec 31, 2025)

### Focus: Visual QA & Issue Fixes

Post-Session 52 QA and fixes following the major B2B content overhaul.

### Completed
| Change | Files |
|--------|-------|
| Fixed hardcoded `#1a1a1a` color to use `bg-slate-900 dark:bg-slate-950` | `src/app/about/page.tsx` |
| Fixed FAQ touch targets from 32px to 44px (accessibility) | `src/components/partners/PartnerFAQ.tsx` |
| Added professional placeholder avatar for S Basi (CFO) with "SB" initials | `src/app/about/page.tsx` |
| Team grid restored to 3-column layout with all 3 executives | `src/app/about/page.tsx` |

### Visual QA Results
- Homepage: All components rendering correctly
- Partners page: 6-card grid responsive, all B2B content displaying
- About page: Team section shows 3 members (CEO, COO, CFO with placeholder)
- Dark mode: Tested on all pages - consistent appearance
- No console errors on any page

### Placeholder Avatar Design
- Sophisticated dark gradient background with geometric grid pattern
- Circular "SB" initials with elegant serif typography
- Primary color accent elements
- Grayscale-to-color hover effect matching real photos
- Professional executive aesthetic

### Build Status
- Build passing with 40 routes (36 pages + 4 API routes)
- Sitemap generated successfully

---

## SESSION 52 (Dec 31, 2025)

### Focus: 2025 Content & Narrative Update

Major content overhaul based on 2025 Business Proposal Letter and company documents. Shifted website tone toward B2B sales & marketing positioning.

### Source Documents Analyzed
- `resources/Metrosure Business Proposal Letter 2025.docx`
- `resources/Metrosure 1.pdf`
- `CONTENT_GUIDE.md` (outdated, now updated)

### Completed
| Change | Files |
|--------|-------|
| CONTENT_GUIDE.md complete rewrite with 2025 positioning | `CONTENT_GUIDE.md` |
| Added 3 new B2B services: Device Leasing, Device Insurance, Call Centre | `ValueProposition.tsx`, `PartnerInquiryForm.tsx` |
| Updated success metrics: 75% sales, 95% QA, 7 provinces | `SuccessMetrics.tsx` |
| Partner benefits: Data-driven, QA team, youth employment focus | `PartnerBenefits.tsx` |
| About page: Added 2013 Group founding, B2B mission copy | `src/app/about/page.tsx` |
| Homepage: Updated WhyChooseUs with B2B differentiators | `WhyChooseUs.tsx` |
| Homepage: PartnersCTA with TFG mention, new stats | `PartnersCTA.tsx` |
| Corporate solutions mention with contact CTA | `ValueProposition.tsx` |

### Key Content Changes
| Before | After |
|--------|-------|
| "5+ Offices" | "7 Provinces" |
| Generic benefits | "75% Sales Increase", "95% QA Average" |
| "Since 2016" | "Since 2013" (Metrosure Group) |
| Balanced B2C/B2B tone | B2B-focused with consumer support |
| 3 partnership models | 6 partnership models |

### New Services Added (Partners Page)
1. Device Leasing - Cell phone/device financing at POS
2. Device Insurance - Protection for financed devices
3. Call Centre Services - Lead calling, cold calling, customer acquisition

### User Decisions Captured
- Job count: Keep 5,000+ (not 3,000 from proposal)
- Tone: Shift toward B2B focus
- New services: Add all to Partners page
- Group structure: Mention briefly ("Part of Metrosure Group")
- Office locations: Keep as-is (no changes)
- Bolttech: Add to text lists (no logo yet)

---

## DEFERRED (This Session)

| Feature | Reason |
|---------|--------|
| Corporate Services Page | User chose Option A: retail focus only, document for future |
| Group Medical Aid | Deferred to Corporate Solutions page |
| Group Funeral Insurance | Deferred to Corporate Solutions page |
| Group Retirement Funds | Deferred to Corporate Solutions page |
| Employee Benefits | Deferred to Corporate Solutions page |
| Estate Planning | Deferred to Corporate Solutions page |
| Bolttech Logo | User will provide later |

### Corporate Services (Documented in CONTENT_GUIDE.md)
These are ready to add when presenting MVP or if requested:
- Group Medical Aid
- Group Funeral Insurance
- Group Retirement Funds
- Employee Benefits
- Estate Planning (Life Covers, Will Drafting)
- Investment Planning
- Retirement Planning

---

## NEXT SESSION PLAN

### Priority 1: Content Review
- [ ] Review copy with stakeholder for final accuracy
- [ ] Verify 75% sales stat with stakeholder before production
- [ ] Add TFG logo to partners section if provided
- [ ] Add Bolttech logo when available

### Priority 2: Corporate Solutions (Optional)
If stakeholder wants corporate services visible:
- [ ] Create `/corporate` or `/business-solutions` page
- [ ] Add Group Medical Aid, Retirement, Benefits sections
- [ ] Link from Partners page and footer

### Priority 3: Outstanding Features
- [ ] Claims page functionality
- [ ] Policies page functionality
- [ ] Coverage calculator tool improvements

---

## RECOMMENDATIONS

### Content
1. **Verify 75% stat** - Confirm this figure with stakeholder before production
2. **TFG relationship** - Consider adding TFG logo to partners section if permitted
3. **Testimonials** - Update customer testimonials to reflect B2B success stories
4. **Case studies** - Consider adding a case study section showing TFG/Jet results

### Technical
1. **Services data file** - Consider creating `src/data/services.ts` to centralize service definitions (currently duplicated in ValueProposition + PartnerInquiryForm)
2. **About page data** - Consider extracting timeline, values, team to data files for easier maintenance

### Future Enhancements
1. **B2B Quote Flow** - Consider separate quote form for business partners
2. **Partner Portal** - Login area for existing partners to track performance
3. **Analytics Dashboard** - Show partners their sales metrics (long-term)

---

## FEATURE STATUS

### Complete ✅
- Multi-page navigation with dropdowns
- Email integration (Resend) - all 4 forms
- Quote form with live pricing + WhatsApp delivery
- Dark mode throughout
- Mobile responsive
- Vercel Analytics
- Rate limiting on API routes
- Form validation (client + server-side Zod)
- SEO: OG images, Twitter cards, canonical URLs
- Google Static Maps (grayscale + red markers)
- Accessibility: keyboard nav, focus rings, reduced motion
- Skeleton loaders, LCP optimization
- **2025 Content Update** (Session 52)
- **Website-Wide 2013 Consistency** (Session 54)
- Insurance detail pages (auto, home, life, business)
- Careers job detail pages with SEO
- **Claims page** - Full guide with claim types, required documents, process steps, emergency contacts
- **Policies page** - Dashboard preview with login wall, feature showcase, account prompts

### Under Development (Redirects to /under-development)
- `/tools/coverage-calculator` (functional but could be enhanced)

### Disabled
- Cookie consent banner (re-enable in `ClientLayout.tsx`)

---

## QUICK REFERENCE

### Commands
```bash
npm run dev    # Start dev server
npm run build  # Production build
```

### Required Env Vars
```bash
RESEND_API_KEY=re_xxxxxxxxxx
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
```

### Rate Limits
| Route | Limit |
|-------|-------|
| `/api/careers-application` | 3/hour |
| `/api/partner-inquiry` | 5/hour |
| `/api/quote` | 10/hour |
| `/api/contact` | 15/hour |

### Key Directories
```
src/app/        # Pages & API routes
src/components/ # UI components
src/data/       # Data files (jobs.ts)
src/lib/        # Utilities
resources/      # Source documents (proposals, PDFs)
```

### Key Files Modified (Session 52)
```
CONTENT_GUIDE.md                              # Complete rewrite
src/components/partners/ValueProposition.tsx  # +3 services, corporate mention
src/components/partners/PartnerInquiryForm.tsx # +3 form options
src/components/partners/SuccessMetrics.tsx    # New metrics
src/components/partners/PartnerBenefits.tsx   # B2B focus
src/app/about/page.tsx                        # Timeline, stats, mission
src/components/WhyChooseUs.tsx                # B2B differentiators
src/components/PartnersCTA.tsx                # TFG, new stats
```

---

## LONG-TERM DEFERRED

| Feature | Reason |
|---------|--------|
| Funeral Policy Digital App | Needs stakeholder meeting |
| Customer/Partner Portals | Time constraints |
| reCAPTCHA | Low priority |
| Design System Components | Future session |

---

## SESSION HISTORY

| Session | Focus |
|---------|-------|
| S58 | **Housekeeping & Legal B2B:** Doc fixes, SquigglyDivider removal, legal B2B content, TFG/Bolttech logos |
| S57 | **B2B Forms & Navigation:** Quote form B2B wizard, Contact B2B fields, Header/Footer B2B, Help FAQs |
| S56 | **Visual Polish:** Testimonial arrows mobile, email rename, red dots removed |
| S55 | **Homepage B2B Enhancement:** 2 new B2B cards, QuoteCTABanner component, 6-card grid |
| S54 | **Content Audit:** 2016→2013 fixes (8 files), business page B2B stats, meta updates |
| S53 | **Visual QA & Fixes:** CFO placeholder avatar, dark mode colors, FAQ touch targets |
| S52 | **2025 Content Update:** B2B positioning, new services, metrics, CONTENT_GUIDE rewrite |
| S51 | UI polish: Partners magnetic buttons, Quote pattern bg, Maps fix, Job redirects |
| S50 | Production readiness: env audit, error handling, a11y, performance |
| S49 | Partners hero bg, Careers job detail pages with SEO |
| S48 | Mission image offset, static maps, login mosaic bg |
| S46 | Playground sandbox, Timeline watermark |
| S45 | Leadership watermark |
| S44 | Square pattern backgrounds |
| S43 | Grid removal, dark mode standardization |
| S42 | Partners wizard, Quote FAQ animations |
| S41 | Dismissable banners, quote UI |
| S40 | Zod server validation |

---

*Document updated: December 31, 2025*
