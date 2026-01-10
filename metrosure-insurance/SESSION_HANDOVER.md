# Metrosure Insurance Brokers - Session Handover

**Updated:** 10 January 2026 (Session 92)
**Stack:** Next.js 16, TypeScript, Tailwind CSS v4, React 19, Framer Motion
**Dev:** `http://localhost:3000` | **Prod:** Vercel
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: Passing

- **Routes:** 45 (38 pages + 7 API routes)
- **Last Build:** 10 January 2026

---

## SESSION 92 (10 Jan 2026) - Content Accuracy & Copy Consistency

### Focus
Replaced placeholder policy numbers, updated years experience from 12+ to 13+, and fixed British English terminology ("coverage" → "cover") in calculator components. Reviewed Service Letter document - AVBOB and 1Life already listed as partners; workplace wellness content deemed redundant with existing B2B pages.

### Completed Tasks
| Task | Status |
|------|--------|
| Replace placeholder policy numbers (XXXXX → realistic) | Complete |
| Update years experience (12+ → 13+) | Complete |
| British English fixes (coverage → cover) | Complete |
| Review Service Letter document | Complete |
| Run build and verify | Complete |

### Files Modified
| File | Change |
|------|--------|
| `src/data/policies.ts` | Replaced XXXXX with realistic policy numbers (AUTO-2024-00147, HOME-2024-00089, LIFE-2023-00256) |
| `src/data/corporateServices.ts` | Updated "12+" to "13+" Years Experience |
| `src/components/tools/FuneralCoverCalculator.tsx` | "Your Coverage Includes" → "Your Cover Includes" |
| `src/components/tools/CalculatorProgress.tsx` | Step label "Coverage" → "Cover" |
| `src/components/tools/CalculatorResult.tsx` | "Coverage Breakdown" → "Cover Breakdown" |
| `src/components/tools/FuneralCostBreakdown.tsx` | "fuller coverage" → "fuller cover" |

### Service Letter Review
Reviewed `/resources/info/Service Letter- Metrosure Insurance Brokers (Field Representatives).docx`:
- **Purpose:** B2B proposal for on-site marketing representatives offering funeral insurance (AVBOB & 1LIFE)
- **Finding:** AVBOB and 1Life already listed in `src/data/partners.ts`
- **Decision:** Workplace wellness content skipped - existing `/corporate` and `/partners` pages are sufficient

### Content Audit Findings
| Item | Status | Notes |
|------|--------|-------|
| Phone numbers | ✓ Verified | +27 31 301 1192 correct across 25+ locations |
| Homepage statistics | ✓ Verified | 5,000+ jobs, 100+ partners, 2013 established |
| "Since 2013" claims | ✓ Verified | 16 occurrences, all accurate |
| Regional offices | ✓ Verified | "5+" acceptable (6 actual offices) |

### Stakeholder Questions for Product Team
The following calculator assumptions require validation before production:

| Assumption | Current Value | Question |
|------------|---------------|----------|
| Base premium rate | R1.00 per R1,000 cover | Is this market-accurate for SA? |
| Smoker loading | 1.5x (50% increase) | Aligned with actual underwriting? |
| Age factors | 0.5x (age 20) to 5x (age 70) | Correct age-banding approach? |
| Premium variance | ±25% range | Appropriate estimate range? |
| Funeral Basic tier | R99/month for R15,000 cover | Competitive pricing? |
| Funeral Standard tier | R199/month for R30,000 cover | Competitive pricing? |
| Funeral Premium tier | R349/month for R50,000 cover | Competitive pricing? |

Data sources documented in `src/data/calculatorData.ts`: ASISA 2025, Stats SA 2025, 1Life, MiWayLife, Metropolitan.

---

## SESSION 91 (9 Jan 2026) - Quick Wins & Data Cleanup

### Focus
Enabled gallery components, fixed expired job listings and policy dates, and completed icon standardisation across additional components.

### Completed Tasks
| Task | Status |
|------|--------|
| Enable AboutGallery (remove isDev gate) | Complete |
| Enable CultureGallery (remove isDev gate) | Complete |
| Update 5 expired job listing dates | Complete |
| Update 2 expired policy renewal dates | Complete |
| Icon standardisation (7 components) | Complete |
| Run build and verify | Complete |

### Files Modified
| File | Change |
|------|--------|
| `src/app/about/page.tsx` | Removed isDev gate for AboutGallery |
| `src/app/careers/page.tsx` | Removed isDev gate for CultureGallery |
| `src/data/jobs.ts` | Updated datePosted (2026-01-09) and validThrough (2026-07-09) for all 5 jobs |
| `src/data/policies.ts` | Updated Home Insurance (Jun 2026) and Life Cover (Jan 2027) renewal dates |
| `src/components/WhyChooseUs.tsx` | Arrow icon standardised to text-lg |
| `src/components/Testimonials.tsx` | Arrow icons standardised to text-lg |
| `src/components/OurImpact.tsx` | Arrow icons changed from text-xl/text-2xl to text-lg |
| `src/components/PartnersCTA.tsx` | Arrow icon changed from text-xl to text-lg |
| `src/app/quote/page.tsx` | Back/Continue arrow icons standardised to text-lg |
| `src/components/insurance/InsurancePageTemplate.tsx` | Arrow icons standardised to text-lg |
| `src/components/HeroCentered.tsx` | Arrow icons standardised to text-lg |

### Technical Changes
- **Galleries enabled** - AboutGallery and CultureGallery now visible in production
- **Job data updated** - All 5 job listings now have current dates (6-month validity)
- **Policy data updated** - Demo renewal dates now show future dates
- **Icon standardisation complete** - Navigation arrows consistently use `text-lg` across all components

---

## SESSION 90 (9 Jan 2026) - Revert to Standard Labels & UI Polish

### Focus
Reverted all forms from floating labels to standard labels (label above input). Created new Labelled* components, migrated all 7 forms, standardised icons, removed CareersHero radial backgrounds, and documented shadow/icon systems in CLAUDE.md.

### Skills Used
- `frontend-design` - Component design and form migration

### Completed Tasks
| Task | Status |
|------|--------|
| Create LabelledInput component | Complete |
| Create LabelledSelect component | Complete |
| Create LabelledTextarea component | Complete |
| Create LabelledDateInput component | Complete |
| Update ui/index.ts barrel exports | Complete |
| Migrate EmailResultsModal (1 field) | Complete |
| Migrate ApplicationModal (7 fields) | Complete |
| Migrate ApplicationForm (7 fields) | Complete |
| Migrate ContactForm (11 fields) | Complete |
| Migrate PartnerInquiryForm (10 fields) | Complete |
| Migrate CorporateInquiryForm (10 fields) | Complete |
| Migrate Quote Page (18 fields) | Complete |
| Standardise arrow icons to text-lg | Complete |
| Remove CareersHero radial backgrounds | Complete |
| Document shadow system in CLAUDE.md | Complete |
| Run build and verify | Complete |

### Files Created
| File | Description |
|------|-------------|
| `src/components/ui/LabelledInput.tsx` | Standard input with label above, validation states, character count |
| `src/components/ui/LabelledSelect.tsx` | Standard select with label above, supports string[] and {value,label}[] |
| `src/components/ui/LabelledTextarea.tsx` | Textarea with label above, character count, helper text |
| `src/components/ui/LabelledDateInput.tsx` | Date input with custom calendar icon |

### Files Modified
| File | Change |
|------|--------|
| `src/components/ui/index.ts` | Added Labelled* exports, marked Floating* as deprecated |
| `src/components/tools/EmailResultsModal.tsx` | FloatingInput -> LabelledInput |
| `src/components/careers/ApplicationModal.tsx` | Floating* -> Labelled* (7 fields) |
| `src/components/careers/ApplicationForm.tsx` | Floating* -> Labelled* (7 fields) |
| `src/components/contact/ContactForm.tsx` | Floating* -> Labelled* (11 fields) |
| `src/components/partners/PartnerInquiryForm.tsx` | Floating* -> Labelled* (10 fields) |
| `src/components/corporate/CorporateInquiryForm.tsx` | Floating* -> Labelled* (10 fields) |
| `src/app/quote/page.tsx` | Floating* -> Labelled* (18 fields) |
| `src/components/corporate/CorporateHero.tsx` | Arrow icon text-base -> text-lg |
| `src/components/partners/PartnersHero.tsx` | Arrow icon text-base -> text-lg |
| `src/components/HeroCentered.tsx` | Arrow icon text-xl -> text-lg |
| `src/app/about/page.tsx` | Arrow icon text-base -> text-lg |
| `src/components/careers/CareersHero.tsx` | Removed radial backgrounds, icon standardisation |
| `CLAUDE.md` | Added shadow system, icon sizes, form component docs |

### Technical Changes
- **New pattern:** Labels above inputs (simpler, more accessible, no animation bugs)
- **64 form fields migrated** across 7 forms
- **Icon standardisation:** All navigation arrows now use `text-lg` consistently
- **CareersHero cleanup:** Removed animated radial blur-3xl blobs (kept 3D blocks background)
- **Documentation:** CLAUDE.md updated with shadow tiers, icon sizes, form component patterns

### Form Component Pattern (New Standard)
```tsx
// Preferred - Standard labels above inputs
import { LabelledInput, LabelledSelect, LabelledTextarea } from "@/components/ui";

<LabelledInput
  name="email"
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  fieldState={fieldState.email}
/>
```

### Icon Size Standards (Documented in CLAUDE.md)
| Icon | Class | Usage |
|------|-------|-------|
| Arrow (forward/back) | `text-lg` | All navigation arrows |
| Info/status icons | `text-base` | Informational icons |
| Large feature icons | `text-2xl` | Section headers |

### Shadow System (Documented in CLAUDE.md)
| Tier | Class | Usage |
|------|-------|-------|
| Subtle | `shadow-sm` | Inputs, badges |
| Standard | `shadow-lg` | Cards, modals |
| Emphasis | `shadow-xl` | Hover states, CTAs |
| Coloured | `shadow-primary/25` (hover: `/40`) | Primary CTAs |

---

## SESSION 89 (5 Jan 2026) - Complete Form Migration to Floating Labels

### Focus
Migrated all remaining forms to use shared floating label components. This was subsequently reverted in Session 90 due to usability issues.

### Note
**Superseded by Session 90** - All floating label work was reverted to standard labels.

---

## SESSION 88 (5 Jan 2026) - Form UI Standardisation

### Focus
Created shared floating label form components and migrated ContactForm.

### Note
**Superseded by Session 90** - Floating label pattern replaced with standard labels.

---

## SESSION 87 (5 Jan 2026) - UI Consistency Audit & Standardisation

### Focus
Comprehensive UI audit identifying 45+ inconsistencies. Standardised CTAs, section spacing, container widths, and animation timing. Simplified Cookie Consent banner.

### Design System Standards Established
- **Primary CTA:** `h-12 px-8 rounded-xl shadow-lg shadow-primary/25`
- **Hover effect:** `scale: 1.03, y: -2`
- **Major sections:** `py-24 md:py-32`
- **Container:** `max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8`
- **Carousel timing:** `6000ms`

---

## SKIPPED & DEFERRED TASKS

### Deferred to Session 92
| Task | Reason | Priority |
|------|--------|----------|
| Replace placeholder policy numbers (XXXXX) | Low visibility (behind login wall) | Low |
| Remove Development Banner | Awaiting stakeholder approval for production launch | Medium |
| Premium calculation review | Requires stakeholder input | High |

### Deferred to Future Sessions
| Task | Reason | Estimated Session |
|------|--------|-------------------|
| WhatsApp floating widget | Enhancement, not critical | S93+ |
| WhatsApp Business API | Requires API setup and business verification | S95+ |
| Remove deprecated Floating* components | Keep for rollback safety | S94+ |
| Accessibility audit (WCAG 2.1) | Pre-production task | S93 |
| Mobile performance testing | Pre-production task | S93 |

### Not Started (Blocked)
| Task | Blocker |
|------|---------|
| Production deployment | Awaiting stakeholder sign-off |
| Real policy data integration | Requires backend API |
| User authentication | Requires identity provider setup |

---

## NEXT SESSION PLAN (Session 93)

### Recommended Focus: British English Audit & Page Review
Session 93 should focus on comprehensive British English compliance, About Us and Careers page review, and pre-production polish.

### Priority 1: British English Thorough Check
- [ ] Full codebase audit for American English spellings
  - "organization" → "organisation"
  - "color" → "colour"
  - "center" → "centre"
  - "analyze" → "analyse"
  - "customize" → "customise"
- [ ] Remaining "coverage" → "cover" instances (beyond S92 fixes)
- [ ] Check terminology consistency across all pages
- [ ] Review all user-facing copy for UK spelling

### Priority 2: About Us Page Focus
- [ ] Visual review of AboutGallery (enabled in S91)
- [ ] Verify company timeline accuracy (2013-2026)
- [ ] Check executive team information is current
- [ ] Review company statistics and impact numbers
- [ ] Audit copy for British English compliance
- **Files:** `src/app/about/page.tsx`, `src/data/aboutPage.ts`

### Priority 3: Careers Page Focus
- [ ] Visual review of CultureGallery (enabled in S91)
- [ ] Verify job listings are accurate and appealing
- [ ] Check application form functionality
- [ ] Review careers copy and job descriptions
- [ ] Audit for British English (CV not resume, etc.)
- **Files:** `src/app/careers/page.tsx`, `src/data/jobs.ts`, `src/components/careers/*`

### Priority 4: Accessibility & Performance
- [ ] WCAG 2.1 AA compliance check (colour contrast, keyboard nav)
- [ ] Run Lighthouse audits on About and Careers pages
- [ ] Mobile responsive testing (375px, 768px)

### Priority 5: Stakeholder Review
- [ ] Present calculator assumptions for validation (see S92 stakeholder questions)
- [ ] Get sign-off on premium calculation formulas
- [ ] Remove Development Banner (if approved)

### Files to Review
```
src/app/about/page.tsx                # About Us page
src/data/aboutPage.ts                 # About page data
src/app/careers/page.tsx              # Careers page
src/data/jobs.ts                      # Job listings
src/components/careers/*              # Careers components
src/components/about/*                # About components
src/components/DevelopmentBanner.tsx  # Remove when approved
```

---

## RECOMMENDATIONS (Session 92)

### Session 92 Achievements
1. **Placeholder cleanup complete** - Policy numbers now realistic
   - AUTO-2024-00147, HOME-2024-00089, LIFE-2023-00256
   - Improves demo quality for stakeholders

2. **Years experience updated** - Now shows "13+ Years Experience"
   - Accurate for 2026 (since 2013)
   - Corporate page displays correct timeline

3. **British English fixes** - "Coverage" → "Cover" in calculators
   - FuneralCoverCalculator, CalculatorProgress, CalculatorResult, FuneralCostBreakdown
   - Consistent with UK English project standard

4. **Service Letter reviewed** - No new content needed
   - AVBOB and 1Life already partners
   - Workplace wellness content covered by existing B2B pages

### Technical Debt Status
| Issue | Status | Notes |
|-------|--------|-------|
| Placeholder policy numbers | ✅ Resolved | S92 |
| Years experience outdated | ✅ Resolved | S92 - Updated to 13+ |
| "Coverage" terminology | ✅ Resolved | S92 - High-visibility fixes |
| Calculator assumptions | ⏳ Pending | Documented for stakeholder review |
| Development Banner | ⏳ Pending | Awaiting approval |
| Deprecated Floating* components | ⏳ Pending | Keep for now |

### Suggestions for Future Sessions

**Session 93: Pre-Production Checklist**
- Remove Development Banner (if approved)
- Accessibility audit (WCAG 2.1 AA compliance)
- Mobile performance testing (Lighthouse scores)
- Cross-browser testing (Chrome, Firefox, Safari, Edge)

**Session 94: Code Cleanup**
- Remove deprecated Floating* components
- Audit and remove unused dependencies
- Review and optimise bundle size

**Session 95+: Enhancements**
- WhatsApp click-to-chat floating widget
- WhatsApp Business API integration
- User portal backend integration

### Production Readiness Checklist
| Item | Status | Owner |
|------|--------|-------|
| Build passing | ✅ | Dev |
| All features working | ✅ | Dev |
| Content reviewed | ⏳ | Content team |
| Premium calculations validated | ⏳ | Product team |
| Legal review (T&Cs, Privacy) | ⏳ | Legal |
| Accessibility audit | ⏳ | Dev |
| Performance testing | ⏳ | Dev |
| Stakeholder sign-off | ⏳ | Management |
| DNS/Domain setup | ⏳ | DevOps |
| SSL certificate | ✅ | Vercel (auto) |

### Deprecated Components (Safe to Remove in S94+)
The following components in `src/components/ui/` are no longer used:
- `FloatingInput.tsx`
- `FloatingSelect.tsx`
- `FloatingTextarea.tsx`
- `FloatingDateInput.tsx`

Keep them for now in case of rollback need, but can be removed in Session 94.

---

## FEATURE STATUS

### Complete
- Live Chat (Tawk.to) - Mon-Fri 08:00-17:00
- Email integration (Resend) - 7 templates, Outlook-compatible
- Coverage Calculator (Life & Funeral) with WhatsApp/email sharing
- B2B Case Studies (TFG/Jet, TechZone, HomeStyle)
- Corporate Solutions page (`/corporate`)
- Dark mode, mobile responsive
- Performance optimised (LCP 67% faster)
- Cookie consent banner (ultra-minimal, POPIA compliant)
- UI consistency standards (CTAs, spacing, containers)
- Standard form labels (Labelled* components)
- Icon size standardisation
- Shadow system documentation
- **Gallery components (AboutGallery + CultureGallery)** - NEW (Session 91)

### Disabled (Ready to Enable)
- Development banner (remove when ready for production)

### Deprecated (Can Remove Later)
- Floating* form components (superseded by Labelled* components)

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
| Tier | Class | Usage |
|------|-------|-------|
| Subtle | `shadow-sm` | Inputs, badges, navigation |
| Standard | `shadow-lg` | Cards, modals, dropdowns |
| Emphasis | `shadow-xl` | Hover states, featured CTAs |
| Coloured | `shadow-primary/25` | Primary CTA buttons |

### Icons
| Type | Class |
|------|-------|
| Navigation arrows | `text-lg` |
| Info/status | `text-base` |
| Feature icons | `text-2xl` |

### Brand Colours
- Primary: `#BF0603` (red)
- Secondary: `#690025` (maroon)
- Accent: `#F2CC8E` (yellow)

### Form Components
- **Use:** `LabelledInput`, `LabelledSelect`, `LabelledTextarea`, `LabelledDateInput`
- **Avoid:** `FloatingInput`, `FloatingSelect`, `FloatingTextarea`, `FloatingDateInput` (deprecated)

---

## SESSION HISTORY (75-92)

| Session | Focus |
|---------|-------|
| S92 | Content accuracy, placeholder cleanup, British English fixes (coverage → cover) |
| S91 | Enable galleries, fix expired job/policy dates, complete icon standardisation |
| S90 | Revert to standard labels, icon standardisation, shadow docs, CareersHero cleanup |
| S89 | Complete form migration to floating labels (superseded by S90) |
| S88 | Form UI standardisation, shared FloatingInput/Select/Textarea |
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

---

*Document updated: 10 January 2026 (Session 92)*
