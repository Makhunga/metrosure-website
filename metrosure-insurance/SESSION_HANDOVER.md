# Metrosure Insurance Brokers - Session Handover

**Updated:** 9 January 2026 (Session 90)
**Stack:** Next.js 16, TypeScript, Tailwind CSS v4, React 19, Framer Motion
**Dev:** `http://localhost:3000` | **Prod:** Vercel
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: Passing

- **Routes:** 45 (38 pages + 7 API routes)
- **Last Build:** 9 January 2026

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

## NEXT SESSION PRIORITIES (Session 91)

### Priority 1: Quick Wins Available
- [ ] Enable gallery components (images already exist in `/public/images/`)
  - Remove `isDev` gate from `AboutGallery.tsx`
  - Remove `isDev` gate from `CultureGallery.tsx`
- [ ] Audit remaining icon sizes for consistency (beyond arrow icons)

### Priority 2: Content & Copy Review
- [ ] Review all page copy for consistency and accuracy
- [ ] Verify all statistics and claims are current (2025/2026 data)
- [ ] Check for any remaining placeholder content

### Priority 3: Stakeholder Review (Premium Calculations)
- [ ] Review premium calculation formulas with product team
- [ ] Validate R1.00/R1,000 base rate
- [ ] Confirm smoker loading (1.5x vs industry 1.5-2.5x)
- [ ] Decide on funeral age-banding and tier pricing

### Priority 4: Pre-Production
- [ ] Remove Development Banner (when ready)
- [ ] Replace placeholder policy data
- [ ] Final accessibility audit
- [ ] Performance testing on mobile devices

### Future Enhancements
- [ ] WhatsApp click-to-chat button (floating widget like Tawk.to)
- [ ] WhatsApp Business API integration (automated replies, chatbots)
- [ ] Clean up deprecated Floating* components (can remove once confirmed stable)

---

## RECOMMENDATIONS (Session 90)

### Completed This Session
1. **Form label pattern finalised** - Standard labels above inputs
   - Simpler implementation, no animation bugs
   - Better accessibility (labels always visible)
   - Easier to maintain

2. **Icon consistency established** - All navigation arrows use `text-lg`
   - Documented in CLAUDE.md for future reference

3. **Shadow system documented** - Three-tier system with coloured CTA shadows
   - Subtle, Standard, Emphasis tiers
   - Primary colour shadows for CTAs

### Technical Debt Addressed
| Issue | Status |
|-------|--------|
| Form label inconsistency | Resolved - all use Labelled* components |
| Icon size inconsistency | Resolved - arrows standardised to text-lg |
| Shadow usage undocumented | Resolved - added to CLAUDE.md |
| CareersHero visual clutter | Resolved - radial backgrounds removed |

### Deprecated Components (Safe to Remove Later)
The following components in `src/components/ui/` are no longer used:
- `FloatingInput.tsx`
- `FloatingSelect.tsx`
- `FloatingTextarea.tsx`
- `FloatingDateInput.tsx`

Keep them for now in case of rollback need, but can be removed in a future cleanup session.

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
- **Standard form labels (Labelled* components)** - NEW
- **Icon size standardisation** - NEW
- **Shadow system documentation** - NEW

### Disabled (Ready to Enable)
- Gallery components (dev-only - images exist, just remove `isDev` gate)
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

## SESSION HISTORY (75-90)

| Session | Focus |
|---------|-------|
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

*Document updated: 9 January 2026 (Session 90)*
