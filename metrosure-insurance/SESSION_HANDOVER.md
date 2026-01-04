# Metrosure Insurance Brokers - Session Handover

**Updated:** 4 January 2026 (Session 82)
**Stack:** Next.js 16, TypeScript, Tailwind CSS v4, React 19, Framer Motion
**Dev:** `http://localhost:3000` | **Prod:** Vercel
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 44 (37 pages + 7 API routes)
- **Last Build:** 3 January 2026

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

### Priority 1: Stakeholder Review (Premium Calculations)
- [ ] Review premium calculation formulas with product team
- [ ] Validate R1.00/R1,000 base rate
- [ ] Confirm smoker loading (1.5× vs industry 1.5–2.5×)
- [ ] Decide on funeral age-banding and tier pricing

### Priority 2: Content & Assets
- [ ] Add TFG/Bolttech logos (when available)
- [ ] Enable gallery components on production (pending images)
- [ ] Review 75% sales stat with stakeholder

### Priority 3: Pre-Production
- [ ] Remove Development Banner
- [ ] Replace placeholder policy data
- [ ] Re-enable cookie consent

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

### Disabled
- Cookie consent banner (re-enable in `ClientLayout.tsx`)
- Gallery components (dev-only, pending images)

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

## SESSION HISTORY (40-82)

| Session | Focus |
|---------|-------|
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

*Document updated: 4 January 2026 (Session 82)*
