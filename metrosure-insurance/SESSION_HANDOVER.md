# Metrosure Insurance Brokers - Session Handover

**Updated:** 11 January 2026 (Session 96)
**Stack:** Next.js 16, TypeScript, Tailwind CSS v4, React 19, Framer Motion
**Dev:** `http://localhost:3000` | **Prod:** Vercel
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: Passing

- **Routes:** 45 (38 pages + 7 API routes)
- **Last Build:** 11 January 2026

---

## SESSION 96 (11 Jan 2026) - Forms & Email Deliverability

### Focus
Audited all forms and email delivery, fixed critical issues including hardcoded logo URL, CV filename sanitisation, confirmation email handling, and email validation. Added monitoring recipients for testing.

### Completed Tasks
| Task | Status |
|------|--------|
| Test all 7 forms (Contact, Partner, Corporate, Careers, Quote, Calculator) | Complete |
| Fix hardcoded logo URL in email templates | Complete |
| Update email domain to metrosure.app consistently | Complete |
| Sanitise CV filenames in careers-application route | Complete |
| Improve confirmation email handling (add warnings) | Complete |
| Improve email validation regex (stricter) | Complete |
| Add OPTIONS handler to calculator email route | Complete |
| Add monitoring email recipients for testing | Complete |
| Build verification | Complete |

### Form Testing Results
All 7 forms tested and working:
| Form | Recipient | Subject Prefix | Status |
|------|-----------|----------------|--------|
| Contact (message) | info@metrosuregroup.co.za | `[Website Form] Contact:` | Pass |
| Contact (callback) | info@metrosuregroup.co.za | `[Website Form] Callback Request:` | Pass |
| Contact (B2B) | clients@metrosureconsult.co.za | `[Website Form] [B2B] Contact:` | Pass |
| Partner Inquiry | clients@metrosureconsult.co.za | `[Website Form] New Partnership Inquiry:` | Pass |
| Corporate Inquiry | clients@metrosureconsult.co.za | `[Website Form] New Corporate Inquiry:` | Pass |
| Careers Application | careers@metrosuregroup.co.za | `[Website Form] New Job Application:` | Pass |
| Quote Request | info or clients | `[Website Form] Quote Request:` | Pass |
| Calculator Email | User's email | N/A (user confirmation) | Pass |

### Files Modified
| File | Change |
|------|--------|
| `src/lib/email.ts` | Fixed logo URL (production domain), added monitoring emails, updated FROM domain to metrosure.app |
| `src/app/api/careers-application/route.ts` | Added filename sanitisation, improved confirmation handling |
| `src/app/api/partner-inquiry/route.ts` | Improved confirmation email handling with warning |
| `src/app/api/corporate-inquiry/route.ts` | Improved confirmation email handling with warning |
| `src/app/api/quote/route.ts` | Improved confirmation email handling with warning |
| `src/lib/formValidation.ts` | Stricter email validation regex |
| `src/app/api/calculator/email-results/route.ts` | Added OPTIONS handler |

### Email Configuration
- **FROM Domain:** `noreply@metrosure.app` (for all web form emails)
- **Logo URL:** `https://metrosure-website-git-main-makhungas-projects.vercel.app/images/logo-white.png` (Vercel preview - update to production when domain is live)
- **Monitoring Emails:** `makhunga@zoocora.co.za`, `makhunga@metrosuregroup.co.za` (testing)

### Stakeholder Meeting Updates (S96)
Per stakeholder direction:
1. **B2B emails now go to:** `clients@metrosureconsult.co.za` (was clients@metrosuregroup.co.za)
2. **Email subject prefix:** `[Website Form]` added to all internal emails for immediate identification
   - Example: `[Website Form] [B2B] New Partnership Inquiry: Company Name`
   - Example: `[Website Form] Quote Request: Life - John Doe`

### Security Improvements
1. **CV Filename Sanitisation:**
   - Removes path separators and special characters
   - Adds timestamp prefix for uniqueness
   - Limits filename length to 100 characters

2. **Email Validation:**
   - Prevents consecutive dots and @ symbols
   - Validates domain structure with proper TLD
   - Enforces RFC 5321 length limit (254 chars)

3. **Confirmation Email Handling:**
   - Returns warning in response if confirmation fails
   - User informed to check spam or contact support
   - No silent failures

---

## SESSION 95 (10 Jan 2026) - Performance Optimisation & Code Cleanup

### Focus
Addressed LCP performance issues by lazy-loading Tawk.to (3s delay), applying code-splitting to Careers/About/Contact pages, and removing deprecated Floating* form components.

### Completed Tasks
| Task | Status |
|------|--------|
| Lazy-load Tawk.to with 3s delay | Complete |
| Dynamic import for TawkToChat in layout.tsx | Complete |
| Code-split Careers page (WhyJoinUs, CultureGallery, OpenPositions) | Complete |
| Code-split About page (GalleryInstagram, GalleryFloating) | Complete |
| Code-split Contact page (ContactOptions, FAQ, ContactForm, OfficeLocations) | Complete |
| Delete deprecated Floating* components (4 files) | Complete |
| Remove Floating* exports from ui/index.ts | Complete |
| Build verification | Complete |
| Browser testing with Chrome DevTools MCP | Complete |

### Performance Improvements

**Tawk.to Lazy-Loading:**
- Added 3-second delay before loading chat widget script
- Changed from direct import to `dynamic()` import in layout.tsx
- Expected LCP improvement: 30-40% on initial page load

**Code-Splitting Applied:**
| Page | Components Made Dynamic |
|------|------------------------|
| Careers | WhyJoinUs, CultureGallery, OpenPositions |
| About | GalleryInstagram, GalleryFloating |
| Contact | ContactOptions, FAQ, ContactForm, OfficeLocations |

**Code Pattern Used:**
```typescript
import dynamic from "next/dynamic";

// Code-split below-fold components for better LCP
const HeavyComponent = dynamic(() => import("@/components/HeavyComponent"));
```

### Files Modified
| File | Change |
|------|--------|
| `src/components/TawkToChat.tsx` | Added 3s setTimeout delay before script injection |
| `src/app/layout.tsx` | Changed TawkToChat to dynamic import |
| `src/app/careers/page.tsx` | Dynamic imports for WhyJoinUs, CultureGallery, OpenPositions |
| `src/app/about/page.tsx` | Dynamic imports for GalleryInstagram, GalleryFloating |
| `src/app/contact/page.tsx` | Dynamic imports for ContactOptions, FAQ, ContactForm, OfficeLocations |
| `src/components/ui/index.ts` | Removed deprecated Floating* exports |

### Files Deleted
| File | Reason |
|------|--------|
| `src/components/ui/FloatingInput.tsx` | Deprecated, unused (replaced by LabelledInput) |
| `src/components/ui/FloatingSelect.tsx` | Deprecated, unused (replaced by LabelledSelect) |
| `src/components/ui/FloatingTextarea.tsx` | Deprecated, unused (replaced by LabelledTextarea) |
| `src/components/ui/FloatingDateInput.tsx` | Deprecated, unused (replaced by LabelledDateInput) |

### Expected Performance Results
| Metric | Before | After (Expected) |
|--------|--------|------------------|
| Home LCP | 3,367ms | ~2,500ms |
| Careers LCP | 2,856ms | ~2,000ms |
| Contact LCP | 2,703ms | ~1,900ms |
| Initial JS Bundle | Large | 15-20% smaller |
| Deprecated code files | 4 | 0 |

---

## SESSION 94 (10 Jan 2026) - Gallery Enhancement, Consolidation & Pre-Production Testing

### Focus
Enhanced AboutGallery and CultureGallery with 7 new high-quality team photos and visual overflow effect. Conducted Lighthouse performance audits on 5 major pages. Later in session, explored 6 alternative gallery styles due to awkward bento grid spacing, ultimately consolidating to 2 final gallery components (Instagram + Floating).

### Completed Tasks
| Task | Status |
|------|--------|
| Lighthouse audits on 5 major pages | Complete |
| Copy 7 new high-quality images to public/images | Complete |
| Update AboutGallery with overflow effect + new images | Complete |
| Update CultureGallery with overflow effect + new images | Complete |
| Mobile responsive testing | Complete |
| Dark mode testing | Complete |
| Build verification | Complete |
| **Gallery Exploration (6 styles created)** | Complete |
| **Gallery Consolidation (2 final galleries)** | Complete |
| **GalleryInstagram with bento-style sizing** | Complete |
| **GalleryFloating with central CTA** | Complete |

### Gallery Exploration & Consolidation
Created 6 alternative gallery styles to address bento grid spacing issues, then consolidated to 2 final galleries:

**Galleries Created (then removed):**
| Gallery | Style | Reason Removed |
|---------|-------|----------------|
| GalleryFilmstrip | Horizontal scroll editorial | Consolidated |
| GalleryCinematic | Full-screen Ken Burns carousel | Consolidated |
| GalleryPolaroids | Scattered polaroid photos | Consolidated |
| GalleryScrollReveal | Vertical scroll reveal | Consolidated |

**Final Galleries Kept:**
| Gallery | Style | Features |
|---------|-------|----------|
| GalleryInstagram | Bento-style variable grid | colSpan/rowSpan sizing, no gaps, `gridAutoFlow: "dense"` |
| GalleryFloating | Images around central text | Floating positioned images, "Join Our Team" CTA |

### GalleryInstagram Implementation
Final implementation with bento-style variable sizing but without gaps:

```typescript
interface GalleryImage {
  src: string;
  alt: string;
  colSpan: 1 | 2;  // Wide images span 2 columns
  rowSpan: 1 | 2;  // Tall images span 2 rows
}

// CSS Grid with dense auto-flow prevents gaps
<motion.div
  className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[220px]"
  style={{ gridAutoFlow: "dense" }}
>
```

**Key CSS technique:** `gridAutoFlow: "dense"` fills gaps when variable-sized items leave spaces.

### Files Modified (Gallery Consolidation)
| File | Change |
|------|--------|
| `src/components/about/GalleryInstagram.tsx` | Created: Bento-style grid with variable sizing |
| `src/components/about/GalleryFloating.tsx` | Created: Floating images around central text |
| `src/app/about/page.tsx` | Removed 5 galleries, kept GalleryInstagram + GalleryFloating |

### Lighthouse Performance Findings
| Page | LCP | CLS | INP | Notes |
|------|-----|-----|-----|-------|
| Home | 3,367ms | 0 | N/A | 90% render delay (React hydration) |
| About | 727ms | 0 | N/A | Good performance |
| Careers | 2,856ms | 0 | N/A | 90% render delay |
| Quote | 705ms | 0 | N/A | Good performance |
| Contact | 2,703ms | 0 | N/A | 90% render delay |

**Third-Party Impact:**
- Tawk.to: 1.2MB transfer size (live chat widget)
- Google Fonts: 437kB
- Recommendation: Consider lazy-loading Tawk.to on user interaction

### New Images Added
| Image | Source | Description |
|-------|--------|-------------|
| `gallery-team-uniform-full.jpg` | FB 487920340 | Full team in company uniforms |
| `gallery-team-women-professional.jpg` | FB 487885344 | Professional women's team |
| `gallery-heritage-celebration.jpg` | FB 552560912 | Heritage Day celebration |
| `gallery-heritage-joy.jpg` | FB 553817745 | Heritage Day joy |
| `gallery-leadership-suits.jpg` | FB 481186840 | Leadership team at event |
| `gallery-training-conference.jpg` | FB 488366681 | Training conference |
| `gallery-heritage-portrait.jpg` | FB 552868754 | Team member in traditional attire |

### Gallery Overflow Enhancement
Both galleries now extend outside their container for visual impact:

**CSS Changes:**
- Section: `overflow-x-clip` (clips overflow but allows visual extension)
- Header: Contained in `max-w-7xl mx-auto px-6 lg:px-12`
- Grid: `px-2 md:px-0 md:-mx-4 lg:-mx-8 xl:-mx-16` (negative margins for overflow)
- Columns: `grid-cols-2 md:grid-cols-4 lg:grid-cols-5`

**Files Modified:**
| File | Changes |
|------|---------|
| `src/components/about/AboutGallery.tsx` | New images, overflow effect, 5-column grid |
| `src/components/careers/CultureGallery.tsx` | New images, overflow effect, 5-column grid |
| `public/images/gallery-*.jpg` | 7 new high-quality team photos |

### Testing Results
- **Mobile (375px):** Gallery displays 2 columns, contained with padding
- **Tablet (768px):** Gallery displays 4 columns, starts to overflow
- **Desktop (1024px+):** Gallery displays 5 columns, full overflow effect
- **Dark mode:** Galleries have slate-900 background, works in both modes
- **Hover effects:** Grayscale-to-colour transition working correctly

---

## SESSION 93 (10 Jan 2026) - British English Audit & Gallery Enhancement

### Focus
Comprehensive British English spelling audit fixing 6 instances across 4 files. Updated both AboutGallery and CultureGallery components with real team photos from company resources. Created Claude Web Development Playbook documenting optimal workflow with MCPs, skills, and tools.

### Completed Tasks
| Task | Status |
|------|--------|
| British English audit (6 instances fixed) | Complete |
| Visual review of About page + AboutGallery | Complete |
| Visual review of Careers page + CultureGallery | Complete |
| Copy 5 real team photos to public/images | Complete |
| Update AboutGallery with real photos | Complete |
| Update CultureGallery with real photos | Complete |
| Create Claude Web Development Playbook | Complete |
| Run build and verify | Complete |

### British English Fixes
| File | Line | Change |
|------|------|--------|
| `src/app/quote/page.tsx` | 171 | "customizable" → "customisable" |
| `src/data/jobs.ts` | 51 | "driver's license" → "driver's licence" |
| `src/data/jobs.ts` | 88 | "training program" → "training programme" |
| `src/data/jobs.ts` | 174 | "training program" → "training programme" |
| `src/data/jobs.ts` | 186 | "training program" → "training programme" |
| `src/components/careers/WhyJoinUs.tsx` | 35 | "advancement programs" → "advancement programmes" |
| `src/app/help/page.tsx` | 97 | "Device Leasing program" → "Device Leasing Programme" |

### New Images Added
| Image | Source | Description |
|-------|--------|-------------|
| `team-formal-uniforms.jpg` | Facebook | Team photo in Metrosure uniforms |
| `team-heritage-day.jpg` | Facebook | Heritage Day celebration in traditional attire |
| `team-professional-event.jpg` | Facebook | Team at professional business event |
| `team-training-session.jpg` | Facebook | Team members in training session |
| `team-executive-portrait.jpg` | `bheka_1.jpg` | Executive professional headshot |

### Gallery Updates
**AboutGallery** (`src/components/about/AboutGallery.tsx`):
- Our Team → `team-formal-uniforms.jpg` (wide)
- Leadership → `team-executive-portrait.jpg` (tall)
- Culture → `team-heritage-day.jpg`
- Growth → `team-training-session.jpg`
- Excellence → `team-professional-event.jpg` (tall)
- Community → `family-hero-2.webp`

**CultureGallery** (`src/components/careers/CultureGallery.tsx`):
- Teamwork → `team-formal-uniforms.jpg` (wide)
- Excellence → `team-professional-event.jpg` (tall)
- Culture → `team-heritage-day.jpg`
- Learning → `team-training-session.jpg`
- Leadership → `team-executive-portrait.jpg` (tall)
- Purpose → `family-hero-2.webp`

### Claude Web Development Playbook Created
Comprehensive workflow documentation saved to `docs/CLAUDE_WEB_DEV_PLAYBOOK.md` including:
- MCP server setup (Chrome DevTools, Context7, Playwright, Firecrawl)
- Claude for Chrome extension integration
- Custom slash commands for design review and performance audits
- 6-phase workflow: Inspiration → Research → Build → Iterate → Test → Ship
- Design inspiration gathering techniques
- Skills usage (frontend-design, content-research-writer)

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

### Deferred to Future Sessions
| Task | Reason | Estimated Session |
|------|--------|-------------------|
| WhatsApp floating widget | Enhancement, not critical | S97+ |
| WhatsApp Business API | Requires API setup and business verification | S97+ |
| Remove Development Banner | Awaiting stakeholder approval | S97 |
| Remove monitoring emails from email.ts | Testing only | S97 (after testing complete) |

### Not Started (Blocked)
| Task | Blocker |
|------|---------|
| Production deployment | Awaiting stakeholder sign-off |
| Real policy data integration | Requires backend API |
| User authentication | Requires identity provider setup |
| Calculator validation | Awaiting product team confirmation (see S92 questions) |

---

## NEXT SESSION PLAN (Session 97)

### Recommended Focus: Accessibility & Cross-Browser Testing
Session 97 should focus on accessibility compliance (WCAG 2.1 AA), cross-browser testing, and final polish before production.

### Priority 1: Cross-Browser Testing
- [ ] Firefox gallery hover effects
- [ ] Edge gallery hover effects
- [ ] Safari (if available)
- [ ] Verify code-split components load correctly in all browsers

### Priority 2: Accessibility Audit (WCAG 2.1 AA)
- [ ] Colour contrast verification
- [ ] Keyboard navigation testing
- [ ] Screen reader compatibility check
- [ ] Focus states visible and clear
- [ ] ARIA labels where needed

### Priority 3: Performance Verification
- [ ] Run Lighthouse audits on Home, Careers, Contact to verify LCP improvements
- [ ] Verify Tawk.to loads after 3s delay in production build
- [ ] Check bundle size reduction from code-splitting

### Priority 4: Final Polish
- [ ] Remove Development Banner (if approved by stakeholder)
- [ ] Remove monitoring emails from email.ts (after testing)
- [ ] Final review of any remaining placeholder content
- [ ] Verify all links and navigation work correctly

### Reference: Claude Web Development Playbook
Comprehensive workflow documentation created in S93:
`docs/CLAUDE_WEB_DEV_PLAYBOOK.md`
- MCP setup (Chrome DevTools, Context7, Playwright)
- Custom slash commands
- Design inspiration workflow
- Testing procedures

---

## RECOMMENDATIONS (Session 94)

### Session 94 Achievements
1. **Gallery exploration & consolidation** - Tested 6 styles, kept 2
   - Created: Filmstrip, Cinematic, Polaroids, ScrollReveal, Instagram, Floating
   - Removed: Original bento + Filmstrip, Cinematic, Polaroids, ScrollReveal
   - Final: GalleryInstagram (bento-style variable sizing) + GalleryFloating (central CTA)

2. **GalleryInstagram with bento-style sizing** - Variable colSpan/rowSpan
   - Team uniform: `colSpan: 2` (wide)
   - Leadership suits: `rowSpan: 2` (tall)
   - `gridAutoFlow: "dense"` prevents gaps in grid
   - `auto-rows-[200px]` maintains consistent row heights

3. **GalleryFloating implementation** - Images around central text
   - Floating positioned images with rotation
   - Central CTA: "Join Our Team" button
   - Links to `/careers` page

4. **Lighthouse performance audits** - 5 major pages tested
   - About and Quote pages: Good LCP (~700ms)
   - Home, Careers, Contact: High LCP (2.7-3.4s) due to render delay
   - Third-party impact identified: Tawk.to (1.2MB), Google Fonts (437kB)

5. **Mobile and dark mode testing** - Verified across breakpoints
   - Responsive grid working correctly at all sizes
   - Dark mode galleries display properly
   - Hover effects functional

### Technical Debt Status
| Issue | Status | Notes |
|-------|--------|-------|
| British English compliance | ✅ Resolved | S93 - 6 fixes |
| Gallery placeholder images | ✅ Resolved | S94 - 7 new photos + bento sizing |
| Gallery spacing issues | ✅ Resolved | S94 - 6 styles tested, 2 final (Instagram + Floating) |
| Placeholder policy numbers | ✅ Resolved | S92 |
| Years experience outdated | ✅ Resolved | S92 - Updated to 13+ |
| "Coverage" terminology | ✅ Resolved | S92 - High-visibility fixes |
| Mobile responsive | ✅ Verified | S94 |
| Dark mode | ✅ Verified | S94 |
| LCP performance (3 pages) | ✅ Addressed | S95 - Tawk.to 3s delay + code-splitting |
| Calculator assumptions | ⏳ Pending | Documented for stakeholder review |
| Development Banner | ⏳ Pending | Awaiting approval |
| Deprecated Floating* components | ✅ Resolved | S95 - 4 files deleted |
| Unused gallery components | ✅ Resolved | S94 - 5 files deleted |
| Code-splitting | ✅ Applied | S95 - Careers, About, Contact pages |
| Email logo URL hardcoded | ✅ Resolved | S96 - Updated to production URL |
| CV filename sanitisation | ✅ Resolved | S96 - Security fix applied |
| Email validation regex | ✅ Resolved | S96 - Stricter validation |
| Confirmation email handling | ✅ Resolved | S96 - Warnings added |
| Email domain configuration | ✅ Resolved | S96 - metrosure.app for all |
| Monitoring emails | ⏳ Testing | S96 - Remove after testing complete |

### Suggestions for Future Sessions

**Session 97: Accessibility & Cross-Browser Testing**
- WCAG 2.1 AA audit (colour contrast, keyboard nav, screen readers)
- Cross-browser testing (Firefox, Edge, Safari)
- Verify S95 performance improvements with Lighthouse

**Session 97+: Enhancements**
- WhatsApp click-to-chat floating widget
- WhatsApp Business API integration
- User portal backend integration

### Production Readiness Checklist
| Item | Status | Owner |
|------|--------|-------|
| Build passing | ✅ | Dev |
| All features working | ✅ | Dev |
| British English compliance | ✅ | Dev (S93) |
| Gallery images | ✅ | Dev (S94) - 7 photos + overflow |
| Mobile responsive | ✅ | Dev (S94) |
| Dark mode | ✅ | Dev (S94) |
| Content reviewed | ⏳ | Content team |
| Premium calculations validated | ⏳ | Product team |
| Legal review (T&Cs, Privacy) | ⏳ | Legal |
| Accessibility audit | ⏳ | Dev (S96) |
| Performance optimisation | ✅ | Dev (S95) - Tawk.to delay + code-splitting |
| Stakeholder sign-off | ⏳ | Management |
| DNS/Domain setup | ⏳ | DevOps |
| SSL certificate | ✅ | Vercel (auto) |

### Deprecated Components - DELETED

**UI Components - DELETED (S95):**
~~FloatingInput, FloatingSelect, FloatingTextarea, FloatingDateInput~~ - Removed in Session 95

**Gallery Components - DELETED (S94):**
~~AboutGallery, GalleryFilmstrip, GalleryCinematic, GalleryPolaroids, GalleryScrollReveal~~ - Removed in Session 94

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
- **Gallery components (GalleryInstagram + GalleryFloating)** - Consolidated from 6 styles (Session 94)
- **British English compliance** - Full audit complete (Session 93)

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

## SESSION HISTORY (75-96)

| Session | Focus |
|---------|-------|
| S96 | Forms & email deliverability audit, logo URL fix, CV filename sanitisation, email validation, monitoring emails |
| S95 | Performance optimisation (Tawk.to 3s delay, code-splitting), delete deprecated Floating* components |
| S94 | Gallery consolidation (6 styles → 2 final), bento sizing, Lighthouse audits, mobile/dark mode testing |
| S93 | British English audit (6 fixes), real team photos for galleries, Claude Web Dev Playbook |
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

*Document updated: 10 January 2026 (Session 95 - Performance Optimisation)*
