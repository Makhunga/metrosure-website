# Metrosure Insurance Brokers - Session Handover

**Updated:** 5 January 2026 (Session 87)
**Stack:** Next.js 16, TypeScript, Tailwind CSS v4, React 19, Framer Motion
**Dev:** `http://localhost:3000` | **Prod:** Vercel
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 45 (38 pages + 7 API routes)
- **Last Build:** 5 January 2026

---

## SESSION 87 (5 Jan 2026) - UI Consistency Audit & Standardisation

### Focus
Comprehensive UI audit identifying 45+ inconsistencies across the website. Standardised CTAs, section spacing, container widths, and animation timing. Simplified Cookie Consent banner.

### Skills Used
- `frontend-design` - Design system standardisation
- `Explore` agents (3 parallel) - Thorough codebase audit

### Completed Tasks
| Task | Files | Impact |
|------|-------|--------|
| Cookie Consent simplification | 2 | Ultra-minimal design, enabled |
| CTA button standardisation | 12 | h-12, rounded-xl, scale 1.03 hover |
| Section spacing | 5 | py-24 md:py-32 standard |
| Container widths | 3 | max-w-[1400px] standard |
| Animation timing | 1 | Carousels aligned to 6000ms |

### Deferred Tasks
| Task | Reason | Priority |
|------|--------|----------|
| Shared FloatingInput/Select/Textarea components | Time - complex refactor | Medium |
| Form migration to floating labels | Requires shared components first | Medium |
| Icon size standardisation | Lower impact | Low |

### Design System Standards Established

**CTA Buttons:**
```
Primary:   h-12, px-8, rounded-xl, shadow-lg shadow-primary/25
Hover:     scale: 1.03, y: -2
Secondary: h-12, px-8, rounded-xl, border-2
Tertiary:  h-11, px-6, rounded-xl
```

**Section Spacing:**
```
Major sections: py-24 md:py-32
Sub-sections:   py-16 md:py-20
```

**Container Width:** `max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8`

### Files Modified (20 files)
| Category | Files |
|----------|-------|
| Cookie Consent | `CookieConsent.tsx`, `ClientLayout.tsx` |
| CTAs | `Header.tsx`, `Hero.tsx`, `CallToAction.tsx`, `QuoteCTABanner.tsx`, `Products.tsx`, `JobCard.tsx` |
| Forms | `ContactForm.tsx`, `ApplicationForm.tsx`, `ApplicationModal.tsx`, `PartnerInquiryForm.tsx`, `CorporateInquiryForm.tsx` |
| Spacing/Layout | `Features.tsx`, `OurImpact.tsx`, `LatestNews.tsx`, `PartnerLogos.tsx`, `InsurancePageTemplate.tsx` |
| Animation | `Testimonials.tsx` |

### Cookie Consent Changes
| Before | After |
|--------|-------|
| Cookie types grid (3 categories) | Removed |
| `p-6 md:p-8` padding | `p-4 md:p-5` |
| `shadow-2xl` | `shadow-lg` |
| `max-w-6xl` | `max-w-3xl` |
| 1500ms delay | 2500ms delay |
| Spring slide animation | Simple fade |
| Disabled | **Enabled** |

---

## SESSION 86 (5 Jan 2026) - Website Separation Strategy

### Focus
Created comprehensive website separation strategy documentation with research-backed recommendations for splitting Metrosure Insurance from Metrosure Consult.

### Skills Used
- `content-research-writer` - Industry research with citations
- `Explore` agent - Codebase analysis

### Files Created
| File | Description |
|------|-------------|
| `docs/WEBSITE_SEPARATION_STRATEGY.md` | Full strategy document (~950 lines) with playbook, site maps, technical appendix |

### Files Modified
| File | Change |
|------|--------|
| `EMAIL_DRAFT_Website_Separation_Strategy.md` | Transformed into concise executive summary linking to full strategy doc |
| `STAKEHOLDER_EMAIL.md` | Enhanced WhatsApp mentions, added website separation as near-term priority |

### Strategy Document Contents
- **Part 1:** Business case with regulatory analysis (FSCA/FSP compliance)
- **Part 2:** Current state analysis (8.5/10 separation readiness score)
- **Part 3:** Recommended three-site architecture
- **Part 4:** Site structures with navigation maps
- **Part 5:** 12-week migration playbook (5 phases)
- **Part 6:** Risk mitigation (SEO, redirects, analytics)
- **Part 7:** Investment & resources (with removable budget estimates)
- **Part 8:** Success metrics & KPIs
- **Appendices:** Technical specs, redirect map template, launch checklist

### Key Findings
| Aspect | Insurance (B2C) | Consulting (B2B) |
|--------|-----------------|------------------|
| Regulator | FSCA (FSP 47089) | None |
| Decision timeline | Days to weeks | Months to years |
| Average value | R500-R50,000/year | R500,000-R5M/project |

### Industry Precedents Cited
- eBay/PayPal (2015): PayPal grew from $49B to $82B post-separation
- HP/HPE (2015): HPE reported $28B revenue by 2022
- Gap Inc.: Distinct brands, shared backend

### Research Sources
- [Webstacks](https://www.webstacks.com/blog/multi-brand-websites)
- [PwC](https://www.pwc.com/us/en/services/consulting/deals/divestitures/successful-spinoffs.html)
- [EY](https://www.ey.com/en_us/insights/divestitures)
- [FSCA](https://www.fsca.co.za/)

### Stakeholder Email Updates
| Section | Change |
|---------|--------|
| Coverage Calculator | WhatsApp sharing highlighted prominently |
| Platform Stats | "clients share results instantly" emphasis |
| Sharing Features | Expanded WhatsApp benefits description |
| New Section | "Strategic Priority: Website Separation" with 3-site architecture |
| Next Steps | Added separation strategy discussion (30 min) |
| Checklist | Added "Website separation strategy reviewed and approved" |
| All 3 versions | Updated with WhatsApp + separation mentions |

---

## SESSION 85 (5 Jan 2026) - UI Polish & Page Updates

### Focus
UI consistency polish, page updates (About hero, Careers hero). Updated stakeholder email with Sessions 75-84 progress. WhatsApp widget implemented then removed (postponed for later).

### Files Modified
| File | Change |
|------|--------|
| `src/lib/whatsapp.ts` | Added `generateGeneralEnquiryUrl()` function (kept for future use) |
| `src/components/contact/ContactForm.tsx` | Standardised focus rings to `/20`, button hover to CSS variable |
| `src/components/corporate/CorporateInquiryForm.tsx` | Button hover consistency fix |
| `src/components/careers/ApplicationForm.tsx` | Button hover consistency fix |
| `src/components/partners/PartnerInquiryForm.tsx` | Button hover consistency fix |
| `src/components/tools/*.tsx` | Button hover consistency fixes (5 files) |
| `src/app/about/page.tsx` | Removed "About Us" badge from hero |
| `src/components/careers/CareersHero.tsx` | Added blocks3D.jpg background (8% light, 20% inverted dark) |
| `STAKEHOLDER_EMAIL.md` | Updated with Sessions 75-84 features |

### UI Consistency Fixes
| Issue | Fix |
|-------|-----|
| Button hover states | Replaced hardcoded `#a50502` with `rgb(var(--color-primary-hover))` in 10 files |
| Focus ring opacity | Standardised from `/15 dark:/25` to `/20` across all forms |

### Stakeholder Email Updates
Added to email templates:
- Analytics Dashboard feature
- Insurance Comparison Tool feature
- Centralised FAQ System feature
- Updated stats: 45 routes, analytics active, British English copy

---

## SESSION 84 (4 Jan 2026) - Analytics Setup

### Focus
Implemented Vercel Analytics with Speed Insights and custom event tracking for all forms.

### Analytics Solution
Chose Vercel Analytics (already installed) over alternatives:
- **Vercel Analytics** - Free, cookie-free, POPIA compliant, native Next.js integration
- Rejected: Plausible ($19/mo), PostHog (overkill), GA4 (requires consent banner), Fathom ($15/mo)

### Files Modified
| File | Change |
|------|--------|
| `package.json` | Added `@vercel/speed-insights` |
| `src/app/layout.tsx` | Added `<SpeedInsights />` component |
| `src/components/contact/ContactForm.tsx` | Added `track("contact_submitted")` |
| `src/app/quote/page.tsx` | Added `track("quote_submitted")` |
| `src/components/partners/PartnerInquiryForm.tsx` | Added `track("partner_inquiry_submitted")` |
| `src/components/corporate/CorporateInquiryForm.tsx` | Added `track("corporate_inquiry_submitted")` |
| `src/components/careers/ApplicationForm.tsx` | Added `track("career_application_submitted")` |

### New File
| File | Description |
|------|-------------|
| `docs/analytics-report-template.md` | Google Sheets template for analysing exported Vercel data |

### Custom Events Tracked (Conservative - Free Plan)
| Event | Properties | Trigger |
|-------|------------|---------|
| `quote_submitted` | customerType, coverageType | Quote form success |
| `contact_submitted` | formType, topic/reason | Contact form success |
| `partner_inquiry_submitted` | businessType, servicesCount | Partner form success |
| `corporate_inquiry_submitted` | industry, employeeCount | Corporate form success |
| `career_application_submitted` | position, experience | Career form success |

**Note:** Calculator sharing events removed to conserve 2,500 events/month limit on Hobby plan.

### Export Capabilities
- **CSV Export:** Available in Vercel Dashboard under Analytics tab
- **Vercel Drains:** Enterprise feature for streaming to BigQuery, Datadog, etc.

---

## SESSION 83 (4 Jan 2026) - Content Creation, Documentation & Bug Fix

### Focus
Content creation using `content-research-writer` and `frontend-design` skills. Created comparison page, comprehensive FAQ data, case study template, and project-specific CLAUDE.md. Fixed FAQ category animation bug.

### Files Created
| File | Description |
|------|-------------|
| `CLAUDE.md` | Project-specific coding conventions and lessons learned |
| `src/app/insurance/compare/page.tsx` | Life vs Funeral cover comparison page |
| `src/app/insurance/compare/layout.tsx` | SEO metadata for comparison page |
| `src/data/insuranceComparison.ts` | Comparison table, scenarios, statistics, misconceptions |
| `src/data/faqs.ts` | Comprehensive FAQ data (40+ questions across 9 categories) |
| `src/lib/designTokens.ts` | Formalised design system tokens (colours, radii, shadows, typography) |

### Files Modified
| File | Change |
|------|--------|
| `src/data/caseStudies.ts` | Added template and documentation for creating new case studies |
| `src/app/help/page.tsx` | Integrated centralised FAQ data with category filtering; fixed animation bug |

### New Page: `/insurance/compare`
- Side-by-side Life Cover vs Funeral Cover comparison table
- 4 scenario cards (breadwinner, single, retired, young professional)
- Statistics section with ASISA 2025 data
- Common misconceptions myth-busting section
- Calculator CTA and final CTA sections
- Full dark mode support and mobile responsive

### FAQ Data Structure
Created centralised FAQ file with:
- 11 categories: Getting Started, Claims, Policies, Life Cover, Funeral Cover, Auto, Home, Legal, Payments, **Retail Partnerships**, **Business Services**
- 55+ researched questions with detailed answers
- Helper functions: `getFAQsByCategory()`, `searchFAQs()`, `getPopularFAQs()`
- SA-specific content: POPIA rights, FAIS protection, TCF principles, cooling-off period
- **B2B FAQs**: 15 questions covering retail partnerships, device insurance, call centre services, corporate group insurance, outsourced sales

### Case Study Template
Enhanced `caseStudies.ts` with:
- `SERVICE_IDS` constants for consistent service references
- `CASE_STUDY_TEMPLATE` object for easy duplication
- Documentation header explaining how to add new case studies
- Metrics tips and icon suggestions

### CLAUDE.md Contents
Project-specific instructions covering:
- Quick reference commands and directories
- Component, data file, API route patterns
- Design system (colours, radii, shadows)
- South African context (phone validation, currency, dates)
- Lessons learned from 82 sessions (architecture, UI, performance, forms)
- Efficiency tips and common mistakes to avoid

### Design Tokens File (`src/lib/designTokens.ts`)
Formalised design system with:
- Brand colours with full scales (primary, secondary, semantic)
- CSS variable references for theming
- Border radius scale (sm through full, plus semantic names)
- Shadow scale with brand-coloured variants
- Spacing scale (0-96 following Tailwind)
- Typography (fonts, sizes, weights)
- Breakpoints and media query helpers
- Animation easings and durations
- Z-index scale
- Component presets (buttonPrimary, card, input, etc.)

### Help Page FAQ Integration
Updated `/help` page to use centralised FAQ data:
- Replaced hardcoded FAQs with `src/data/faqs.ts` data
- Added category filter pills (Popular, Claims, Life Cover, Funeral Cover, etc.)
- Search now uses `searchFAQs()` function from data file
- FAQ items use unique IDs for accordion state
- Dynamic section title based on selected category or search

### Research Sources Used
- ASISA Insurance Gap Study 2025 (R50.4 trillion gap)
- MiWayLife & 1Life funeral cost data
- FNB Retirement Survey 2025 (78% funeral vs 38% life coverage)
- Old Mutual, Discovery, Standard Bank comparison guides

### Skills Used
- `frontend-design` - Comparison page UI with editorial design
- `content-research-writer` - Research-backed content with citations

### Bug Fix: FAQ Category Animation
**Issue:** FAQ items invisible when switching categories (only first item showing)

**Root Cause:** Framer Motion staggered animation with `useInView({ once: true })` didn't re-trigger when FAQ list changed.

**Fix:** Added `key={selectedCategory || "popular"}` to FAQ container and changed `animate` to always be "visible" since user is already viewing section when switching:

```tsx
<motion.div
  key={selectedCategory || "popular"}
  className="space-y-4"
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
```

**Files Modified:** `src/app/help/page.tsx`

---

## SESSION 82 (4 Jan 2026) - Web Development Brief (Zoocora)

### Focus
Created professional web development requirements brief for Zoocora to send to insurance broker prospects.

### Documents Created
| File | Description |
|------|-------------|
| `docs/zoocora-insurance-broker-website-brief.md` | Full brief with indicative pricing |
| `docs/zoocora-insurance-broker-website-brief.pdf` | PDF version (231 KB) |
| `docs/zoocora-insurance-broker-website-brief-no-pricing.md` | Version without pricing |
| `docs/zoocora-insurance-broker-website-brief-no-pricing.pdf` | PDF version (218 KB) |

### Brief Contents
- Executive summary and value proposition
- Digital landscape statistics (consumer behaviour data)
- Discovery questionnaire (brand, design preferences, content, competitors)
- FSCA/FAIS/TCF regulatory compliance checklist
- Core website features (Essential Package)
- Recommended enhancements (optional add-ons)
- Technical specifications
- Indicative pricing (R25k-R150k by package)
- Project timeline (10 weeks)
- Satisfaction guarantee and payment milestones
- "Why Zoocora" credibility section

### Research Sources Used
- HubSpot Marketing Statistics 2025
- Network Solutions SMB Report
- FSCA/FAIS Act requirements
- Stanford Web Credibility Research
- Industry conversion optimisation best practices

### Skills Used
- `content-research-writer` - Industry research and persuasive copy
- `md-to-pdf` - PDF conversion

---

## SESSION 81 (3 Jan 2026) - British English Compliance

### Focus
Ensured all web copy conforms to British English (South African context).

### British English Fixes
| File | Change |
|------|--------|
| `src/data/partnerServices.ts` | "cell phone" → "mobile", "inhouse" → "in-house" |
| `src/components/partners/PartnerBenefits.tsx` | "optimize" → "optimise" |

### Em Dash Replacements (11 occurrences)
Replaced em dashes (—) with standard dashes (-) or semicolons/commas as contextually appropriate:
| File | Count |
|------|-------|
| `src/components/Testimonials.tsx` | 2 |
| `src/components/about/AboutGallery.tsx` | 1 |
| `src/components/tools/FuneralCoverCalculator.tsx` | 1 |
| `src/components/tools/FuneralCostBreakdown.tsx` | 1 |
| `src/data/caseStudies.ts` | 3 |
| `src/data/calculatorData.ts` | 3 |

### Not Changed (Framework Standards)
- `behavior: "smooth"` - JavaScript API property
- `unoptimized` - Next.js config property
- Tailwind `gray-*` classes - Framework convention
- CSS `center` - Framework standard

---

## SESSION 80 (3 Jan 2026) - UI/Content Polish

### Focus
Used `frontend-design` and `content-research-writer` skills:
1. Careers Hero redesign (asymmetric layout, floating testimonials, growth path)
2. Product messaging update (added Hospitalization & Disability)
3. Content consistency (stats labels, "revenue engine" standardisation)
4. Form UX polish (glow focus effects, smoother transitions)
5. Dark mode warmth (shifted from cold blue slate to warm neutral)

### Files Modified
| File | Change |
|------|--------|
| `src/components/careers/CareersHero.tsx` | Major redesign - split layout, testimonials, milestones |
| `src/components/Products.tsx` | Added "Health & Income Protection" card |
| `src/data/aboutPage.ts` | Stats labels expanded with context |
| `src/components/WhyChooseUs.tsx` | New heading, updated differentiator labels |
| `src/components/Hero.tsx` | "revenue stream" → "revenue engine" |
| `src/components/contact/ContactForm.tsx` | Enhanced focus glow effects |
| `src/app/globals.css` | Dark mode warmer undertones |

### CareersHero New Features
- Asymmetric split layout (text left, visuals right)
- 3 floating testimonial cards with parallax scroll
- 4-step career growth path (Training → Growth → Leadership → Impact)
- Hand-drawn SVG underline accent
- Scroll indicator animation

---

## SESSION 79 (3 Jan 2026) - Visual/UI Polish

### Focus
Visual polish using `frontend-design` skill:
1. SESSION_HANDOVER.md cleanup (reduced from ~2000 to ~205 lines)
2. Button/card consistency (`rounded-lg` → `rounded-xl` in CallToAction.tsx)
3. Dark mode refinement (Footer geometric accents opacity 0.04-0.06)
4. Homepage dark mode polish (OurImpact, LatestNews: `dark:bg-[#1a0a10]`)

### PageTransition: Still Disabled
Attempted re-enable with `initial={false}` pattern - **still causes visibility bug**. Partners page content invisible on client-side navigation. Reverted to passthrough. AnimatePresence fundamentally incompatible with Next.js App Router navigation.

### Files Modified
| File | Change |
|------|--------|
| `SESSION_HANDOVER.md` | Major cleanup - removed S40-74 details |
| `src/components/CallToAction.tsx` | Button radius + shadow standardised |
| `src/components/Footer.tsx` | Dark mode accent opacity increased |
| `src/components/OurImpact.tsx` | Dark mode: `dark:bg-[#1a0a10]` |
| `src/components/LatestNews.tsx` | Dark mode: `dark:bg-[#1a0a10]` |
| `src/components/PageTransition.tsx` | Kept disabled (passthrough only) |

---

## SESSION 78 (3 Jan 2026) - Critical Bug Fixes

### Page Invisibility on Client-Side Navigation - FIXED
**Root Cause:** `PageTransition.tsx` wrapped pages with `AnimatePresence mode="wait"` + `initial: opacity:0`, preventing pages from becoming visible during Next.js App Router navigation.

**Fix:** Disabled PageTransition wrapper. S79 re-enable attempt with `initial={false}` also failed - AnimatePresence incompatible with App Router. Remains disabled.

### Footer Rounded Corners - FIXED
**Root Cause:** Missing negative margin meant no contrast behind corners.

**Fix:** Restored `-mt-8 md:-mt-12` + increased z-index to `z-20`.

---

## SESSION 77 (2 Jan 2026) - Visual Polish

- Fixed SuccessMetrics.tsx animation pattern (3 instances)
- WhyChooseUs: background stone-50, watermark opacity 8%
- LatestNews: dark mode brand consistency, rounded-2xl cards
- Footer: enabled geometric accents in dark mode

---

## SESSION 76 (2 Jan 2026) - Partners Page Fix & Email Logo

- Fixed 8 partner component animation patterns (useInView → whileInView)
- Added white logo to email header template
- Email URL: `https://metrosure-website-git-main-makhungas-projects.vercel.app/images/logo-white.png`

---

## SESSION 75 (2 Jan 2026) - Starbucks-Inspired UI

- Footer rounded corners (48-64px radius)
- LatestNews component (3-column editorial grid)
- OurImpact carousel (auto-play, keyboard nav)
- New data files: `src/data/news.ts`, `src/data/impact.ts`

---

## NEXT SESSION PRIORITIES

### Priority 1: Form UI Standardisation (Deferred from S87)
- [ ] Create shared `FloatingInput.tsx` component
- [ ] Create shared `FloatingSelect.tsx` component
- [ ] Create shared `FloatingTextarea.tsx` component
- [ ] Migrate ContactForm.tsx to floating labels
- [ ] Migrate ApplicationForm.tsx to floating labels
- [ ] Migrate ApplicationModal.tsx to floating labels

### Priority 2: Remaining UI Polish
- [ ] Standardise icon sizes across components
  - Card icons: `text-3xl` (30px)
  - Button icons: `text-xl` (20px)
  - Inline icons: `text-lg` (18px)
- [ ] Enable gallery components (images already exist in `/public/images/`)
  - Remove `isDev` gate from `AboutGallery.tsx`
  - Remove `isDev` gate from `CultureGallery.tsx`

### Priority 3: Stakeholder Review (Premium Calculations)
- [ ] Review premium calculation formulas with product team
- [ ] Validate R1.00/R1,000 base rate
- [ ] Confirm smoker loading (1.5× vs industry 1.5–2.5×)
- [ ] Decide on funeral age-banding and tier pricing

### Priority 4: Pre-Production
- [ ] Remove Development Banner (when ready)
- [ ] Replace placeholder policy data
- [x] ~~Re-enable cookie consent~~ (Done in S87)

### Future Enhancements
- [ ] WhatsApp click-to-chat button (floating widget like Tawk.to)
- [ ] WhatsApp Business API integration (automated replies, chatbots)

---

## RECOMMENDATIONS (Session 87)

### Quick Wins Available
1. **Enable galleries** - Images already exist, just remove `isDev` checks (5 min)
2. **Remove dev banner** - Single component removal when ready for production

### Technical Debt to Address
1. **Form inconsistency** - 3 different label patterns (labels-above, floating, placeholder-only)
   - Recommended: Create shared FloatingInput components, migrate all forms
   - Effort: ~2 hours

2. **Duplicated FloatingInput code** - PartnerInquiryForm and CorporateInquiryForm have identical FloatingInput/FloatingSelect implementations
   - Recommended: Extract to `src/components/ui/` as shared components

3. **Legacy ContactForm** - Largest form, uses labels-above pattern, would benefit most from floating labels migration

### Design System Now Documented
The following standards were established in S87 and should be followed for all future components:

| Element | Standard |
|---------|----------|
| Primary CTA | `h-12 px-8 rounded-xl shadow-lg shadow-primary/25` |
| Hover effect | `scale: 1.03, y: -2` |
| Major sections | `py-24 md:py-32` |
| Container | `max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8` |
| Carousel timing | `6000ms` |

### Cookie Consent Now Live
The simplified cookie consent banner is now enabled. Monitor user interactions and adjust delay (currently 2500ms) if needed based on analytics.

---

## FEATURE STATUS

### Complete ✅
- Live Chat (Tawk.to) - Mon-Fri 08:00-17:00
- Email integration (Resend) - 7 templates, Outlook-compatible
- Coverage Calculator (Life & Funeral) with WhatsApp/email sharing
- B2B Case Studies (TFG/Jet, TechZone, HomeStyle)
- Corporate Solutions page (`/corporate`)
- Dark mode, mobile responsive
- Performance optimised (LCP 67% faster)
- Cookie consent banner (ultra-minimal, POPIA compliant) ✨ NEW
- UI consistency standards (CTAs, spacing, containers) ✨ NEW

### Disabled (Ready to Enable)
- Gallery components (dev-only - images exist, just remove `isDev` gate)
- Development banner (remove when ready for production)

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
| `/api/corporate-inquiry` | 5/hour |
| `/api/calculator/email-results` | 10/hour |
| `/api/quote` | 10/hour |
| `/api/contact` | 15/hour |

### Key Directories
```
src/app/        # Pages & API routes
src/components/ # UI components
src/data/       # Data files
src/lib/        # Utilities
public/images/  # Static assets
```

---

## DESIGN SYSTEM

### Rounded Corners
- `rounded-lg` (8px): Inputs, small UI
- `rounded-xl` (12px): Buttons, small cards
- `rounded-2xl` (16px): Feature cards
- `rounded-3xl` (24px): Hero containers
- `rounded-t-[48px]/[64px]`: Footer

### Shadows
- `shadow-sm`: Default cards
- `shadow-lg shadow-primary/25`: Primary CTA buttons
- `shadow-xl`: Hover states
- `shadow-2xl`: Hero elements

### Brand Colours
- Primary: `#BF0603` (red)
- Secondary: `#690025` (maroon)
- Accent: `#F2CC8E` (yellow)

---

## SESSION HISTORY (40-87)

| Session | Focus |
|---------|-------|
| S87 | UI consistency audit, CTA/spacing/container standardisation, cookie consent |
| S86 | Website separation strategy documentation, migration playbook |
| S85 | UI consistency polish, page updates, stakeholder email update |
| S84 | Analytics setup, Speed Insights, custom event tracking |
| S83 | Content creation, CLAUDE.md, comparison page, FAQ data |
| S82 | Web Development Brief (Zoocora) |
| S81 | British English compliance, em dash cleanup |
| S80 | UI/content polish, Careers Hero, dark mode warmth |
| S79 | Visual polish, dark mode, doc cleanup |
| S78 | Critical bug fixes (page visibility, footer) |
| S77 | Visual polish, animation patterns |
| S76 | Partners page fix, email logo |
| S75 | Starbucks-inspired UI, Footer, LatestNews |
| S74 | Live Chat (Tawk.to), ScrollToTop removal |
| S73 | Performance optimisation (LCP 67% faster) |
| S72 | Email template Outlook compatibility |
| S71 | Premium calculation documentation |
| S70 | B2B Case Studies |
| S69 | Calculator WhatsApp/email sharing |
| S68 | Gallery components (Biologica-inspired) |
| S67 | Calculator premium refinement |
| S66 | Calculator legend bug fix |
| S65 | Calculator UX enhancement |
| S64 | WhyChooseUs CTA simplification |
| S63 | Calculator visual enhancement |
| S62 | Data centralisation (claims, policies) |
| S61 | Partner logos grid |
| S60 | Technical debt (data files) |
| S59 | Corporate Solutions page |
| S58 | Legal B2B content |
| S57 | B2B forms & navigation |
| S56 | Visual polish |
| S55 | Homepage B2B enhancement |
| S54 | Content audit (2013 consistency) |
| S53 | Visual QA |
| S52 | 2025 content update |
| S51 | UI polish |
| S50 | Production readiness |
| S40-49 | Foundation work |

---

*Document updated: 5 January 2026 (Session 87)*
