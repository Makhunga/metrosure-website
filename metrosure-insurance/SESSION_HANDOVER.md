# Metrosure Insurance Brokers - Session Handover

**Updated:** 20 January 2026 (Session 126)
**Stack:** Next.js 16 | React 19 | TypeScript 5 | Tailwind CSS 4 | Framer Motion 12 | shadcn/ui
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 45 (38 pages + 7 API routes)
- **Last Build:** 20 January 2026


---

## SESSION 126 (20 Jan 2026) - Narrative Revamp Phase 3 (Complete)

### Branch
`feature/narrative-b2b-clarity` (continued from Sessions 124-125)

### Summary
Completed the B2B narrative revamp by removing pricing from insurance service pages and reviewing all remaining pages. The website now consistently presents Metrosure as a broker that connects customers with products from partner insurers, rather than implying product ownership.

### Files Modified

| File | Changes |
|------|---------|
| `src/app/insurance/life/page.tsx` | Metadata: "Protect your family" → "Find the right cover"; Removed pricing ("From R150") → "Get a Quote"; "Essential Life" → "Essential Cover" |
| `src/app/insurance/auto/page.tsx` | Metadata: "Protect your vehicle" → "Find the right cover"; Removed all tier pricing → "Get a Quote" |
| `src/app/insurance/business/page.tsx` | Metadata: "Commercial insurance from" → "Find the right commercial insurance through"; Removed all tier pricing → "Get a Quote" |

### Pages Reviewed (No Changes Needed)

| Page | Reason |
|------|--------|
| `src/app/insurance/home/page.tsx` | Just a redirect to `/insurance/auto` |
| `src/app/insurance/compare/page.tsx` | Educational content comparing life vs funeral cover; uses industry data with citations, not ownership language |
| `src/app/contact/page.tsx` | Generic contact page, no ownership language |
| `src/app/claims/page.tsx` | Already has broker language ("The insurer assesses your claim. We advocate on your behalf") |
| `src/components/Footer.tsx` | Navigation links only, no messaging |
| `src/data/faqs.ts` | Already excellent broker language throughout ("we work with over 30 leading insurance companies", "we arrange comprehensive group benefits through leading SA insurers") |

### Key Copy Changes

| Old | New |
|-----|-----|
| "From R150" / "From R350" / etc. | "Get a Quote" |
| "Essential Life" | "Essential Cover" |
| `period: "month"` | `period: ""` |
| "Protect your family's future with" | "Find the right cover for your family through" |

### Pricing Strategy Applied
Kept tier structure (Essential, Family, Premium) for coverage level information, but replaced specific prices with "Get a Quote" positioning. This maintains useful coverage comparison while eliminating the implication of product ownership.

### Build Verification
- ✅ `npm run build` passes (52 static pages)
- ✅ No TypeScript errors

---

## SESSION 127 (20 Jan 2026) - Broker-First Quote Form & Calculator

### Branch
`feature/narrative-b2b-clarity` (continued from Session 126)

### Summary
Completed the broker-first narrative by removing pricing display from the quote form and calculator, and updating terminology from "quotes" to "inquiries". This addresses the functional/interactive elements that still implied pricing authority.

### Files Modified

| File | Changes |
|------|---------|
| `src/app/quote/page.tsx` | Removed PriceBreakdown display; Updated labels ("Coverage Amount" → "Desired Coverage Amount", "Excess" → "Preferred Excess Level"); Updated step titles ("Quote Type" → "Request Type", "Details" → "Requirements"); Updated success message |
| `src/app/api/quote/route.ts` | Updated email templates ("Your Quote Summary" → "Your Request Summary"); Updated "What happens next" bullets |
| `src/lib/whatsapp.ts` | Renamed `generateQuoteReference()` → `generateInquiryReference()`; Changed format QT-XXXX → INQ-XXXX; Updated WhatsApp message text |
| `src/components/ui/FormSuccess.tsx` | Removed premium display; Updated "Quote Reference" → "Reference Number" |
| `src/components/tools/CalculatorResult.tsx` | Changed "Estimated premium" → "Indicative premium range"; Added broker disclaimer |
| `src/app/tools/coverage-calculator/page.tsx` | Updated CTA to mention "partner insurers" |

### Key Copy Changes

| Old | New |
|-----|-----|
| PriceBreakdown showing R847/month | Removed entirely |
| "Quote Reference: QT-2026-XXXXX" | "Reference Number: INQ-2026-XXXXX" |
| "Estimated Premium" | Removed from success screen |
| "Estimated premium" (calculator) | "Indicative premium range" |
| Generic disclaimer | "Your actual premium will be determined by our partner insurers" |

### Why This Matters
The quote form and calculator were the last places showing specific pricing, which implied Metrosure had pricing authority. By removing calculated premiums and reframing as "inquiries" with "indicative ranges", the site now consistently positions Metrosure as a broker that connects customers with partner products rather than a direct provider.

### Build Verification
- ✅ `npm run build` passes
- ✅ No TypeScript errors

---

## SESSION 125 (20 Jan 2026) - Narrative Revamp Phase 2

### Branch
`feature/narrative-b2b-clarity` (continued from Session 124)

### Summary
Continued the B2B narrative revamp, updating high-traffic pages to clarify Metrosure's broker/marketer model. Added comprehensive current state analysis to the planning document.

### Files Modified

| File | Changes |
|------|---------|
| `docs/NARRATIVE_REVAMP.md` | Added "Current State Analysis" section with full website audit; updated progress checklist |
| `src/components/Hero.tsx` | Subheadline: "connecting you with the right cover" (was "protecting"); CTA: "Find Your Cover" (was "Explore Plans") |
| `src/components/Features.tsx` | Service descriptions updated to "connect you with" language; sidebar text clarified |
| `src/components/WhyChooseUs.tsx` | Intro: "connecting families with the right cover" (was "protecting families") |
| `src/components/partners/PartnersHero.tsx` | Subheadline: "grow your financial services footprint" |
| `src/components/corporate/CorporateHero.tsx` | Subheadline: "we source the right solutions from leading providers" |
| `src/app/partners/page.tsx` | Metadata updated with B2B messaging |
| `src/app/quote/page.tsx` | Coverage options and FAQ updated with broker language |

### Key Copy Changes

| Old | New |
|-----|-----|
| "protecting your home and loved ones" | "connecting you with the right cover for your family" |
| "we help families feel secure" | "we bring people and products together" |
| "Explore Plans" | "Find Your Cover" |
| "Our life insurance and funeral plans" | "life insurance and funeral plans from trusted partners" |
| "we've got you covered" | "we connect you with the right solutions" |
| "we design packages" | "we source the right solutions from leading providers" |

### Build Verification
- ✅ `npm run build` passes (45 routes)
- ✅ No TypeScript errors

---

## SESSION 124 (20 Jan 2026) - Narrative B2B Clarity & Portal Documentation

### Branch
`feature/narrative-b2b-clarity` (created for isolated work)

### Part 1: Narrative Updates (Option A Selected)
Softened website language to clarify Metrosure's B2B business model (broker/marketer for partners' financial products).

| File | Changes |
|------|---------|
| `src/data/partnerShowcase.ts` | Subheading: "Partnering with..." instead of "Working with..."; TFG title: "Growing TFG financial services in-store"; TFG stat: "Retail locations served" |
| `src/components/PartnerLogos.tsx` | Heading: "Financial Partners" (was "Insurance Partners"); Subheading: "Partnering with..." |
| `src/components/TrustedBy.tsx` | Subtext: "we help grow your financial services reach" instead of "we provide comprehensive coverage" |
| `src/components/PartnersCTA.tsx` | Subheadline: "trust us to grow their financial services footprint" |
| `src/app/about/page.tsx` | Mission: "connects South Africans with the right financial products"; TFG ref: "grow their financial services reach through our national network" |

### Part 2: Portal Architecture Documentation
Created comprehensive `docs/PORTAL_ARCHITECTURE.md` for stakeholder review containing:

| Section | Contents |
|---------|----------|
| ADRs | Authentication (NextAuth.js), Data Layer (React Query), State (Context), Components (shadcn/ui), Routing (nested groups), Theming (scoped CSS vars) |
| User Flows | Login, View Policy, File Claim, Make Payment (with diagrams) |
| Data Models | TypeScript interfaces for User, Policy, Claim, Payment, Document, Notification |
| Component Hierarchy | Layout, Page, and Shared component trees |
| Implementation Roadmap | 5 phases across Sessions 125-135+ |
| Technical Specs | Stack, performance targets, security, accessibility |
| Risk Mitigation | Technical, business, and operational risks |

### Build Verification
- ✅ `npm run build` passes (52 static pages)
- ✅ No TypeScript errors
- ✅ All narrative changes applied correctly

---

## SESSION 123 (19 Jan 2026) - Portal Removal (Clean Slate)

### What Was Done
Removed the entire client portal prototype to prepare for proper architectural planning.

### Why
The portal was built as a rapid prototype with multiple theming iterations (Sessions 114-122) indicating architectural issues. Starting fresh with proper planning will yield better results.

### Deleted
| Path | Contents |
|------|----------|
| `src/app/portal/` | All portal pages (layout, dashboard, claims, documents, payments, policies, settings) |
| `src/components/portal/` | All portal components (PortalLayout, PolicyCard, QuickActions, ClaimsTimeline, charts/) |
| `src/data/portalMockData.ts` | Portal mock data (users, policies, claims, payments, documents) |

### Modified
| File | Change |
|------|--------|
| `src/app/globals.css` | Removed `[data-portal]` theme section (lines 272-341) and `.dark [data-portal]` theme section (lines 347-408) |
| `src/app/login/LoginPageClient.tsx` | Updated redirects from `/portal/dashboard` to `/` (homepage) |

### Kept
- `/login` page and `LoginPageClient.tsx` (as non-functional placeholder)
- All shadcn/ui components in `src/components/ui/`
- Badge variants in `src/components/ui/badge.tsx` (useful site-wide)

### Build Verification
- ✅ `npm run build` passes (52 static pages generated)
- ✅ No broken imports
- ✅ No `[data-portal]` CSS selectors remain in globals.css

---

## SESSION 122 (19 Jan 2026) - Portal tweakcn Theme Integration

### Problem Solved
Portal dark mode was not displaying correctly despite tweakcn CSS export being added. Root cause: **CSS variable format mismatch**.

| Issue | Base Theme | Portal Theme (was) |
|-------|------------|-------------------|
| Format | `255 255 255` (RGB) | `oklch(0.9779...)` |
| Tailwind | ✅ Works | ❌ Broken |

Tailwind's utility classes (`bg-background`, `text-foreground`, etc.) expect space-separated RGB values. The oklch format from tweakcn wasn't compatible.

### Solution
Converted all tweakcn oklch values to RGB space-separated format using browser canvas API for accurate colour conversion.

### Completed
| Task | Status |
|------|--------|
| Remove custom colour variables from portal components | ✅ Complete |
| Update components to use standard shadcn classes | ✅ Complete |
| Add portal-specific theme to globals.css with `[data-portal]` scope | ✅ Complete |
| Convert tweakcn oklch values to RGB format | ✅ Complete |
| Update chartColours to use CSS variables | ✅ Complete |
| Verify light/dark mode switching | ✅ Complete |

### Files Modified
| File | Change |
|------|--------|
| `src/app/globals.css` | Portal theme converted from oklch to RGB format (lines 277-408) |
| `src/components/portal/PortalLayout.tsx` | Replaced custom vars with shadcn classes (`bg-background`, `text-foreground`, etc.) |
| `src/components/portal/PolicyCard.tsx` | Replaced custom vars with shadcn classes |
| `src/components/portal/ClaimsTimeline.tsx` | Replaced custom vars with shadcn classes |
| `src/components/portal/QuickActions.tsx` | Updated to use `from-primary to-secondary` gradients |
| `src/components/portal/charts/*.tsx` | Updated all 4 chart components to use shadcn classes |
| `src/data/portalMockData.ts` | Updated chartColours to use CSS variables (`var(--chart-1)` etc.) |

### Portal Theme Colours (RGB Format)

**Light Mode (`[data-portal]`):**
| Variable | RGB Value | Colour |
|----------|-----------|--------|
| `--background` | `250 247 245` | Warm cream |
| `--foreground` | `26 26 26` | Near black |
| `--card` | `250 247 245` | Warm cream |
| `--primary` | `193 0 7` | Brand red |
| `--muted` | `240 235 232` | Light grey |
| `--border` | `245 232 210` | Warm beige |

**Dark Mode (`.dark [data-portal]`):**
| Variable | RGB Value | Colour |
|----------|-----------|--------|
| `--background` | `28 25 23` | Warm charcoal |
| `--foreground` | `245 245 244` | Off-white |
| `--card` | `41 37 36` | Dark brown |
| `--primary` | `185 28 28` | Red |
| `--muted` | `31 28 26` | Dark grey |
| `--border` | `68 64 60` | Medium grey |

### Class Replacements Made
| Old (Custom Variable) | New (shadcn Class) |
|----------------------|-------------------|
| `bg-[var(--surface)]` | `bg-background` |
| `bg-[var(--surface-card)]` | `bg-card` |
| `bg-[var(--surface-inset)]` | `bg-muted` |
| `text-[var(--text-main)]` | `text-foreground` |
| `text-[var(--text-muted)]` | `text-muted-foreground` |
| `border-[var(--border-light)]` | `border-border` |
| `from-[#BF0603] to-[#690025]` | `from-primary to-secondary` |

### Technical Notes
- **tweakcn.com** exports oklch format which isn't compatible with Tailwind's RGB-based CSS variable system
- Used browser canvas API to accurately convert oklch → RGB
- Portal theme uses `[data-portal]` CSS scope (applied via `data-portal` attribute on PortalLayout root)
- Chart colours now use `var(--chart-1)` through `var(--chart-5)` from tweakcn export

---

## SESSION 121 (19 Jan 2026) - Portal shadcn/ui Refactor & Theme Tutorial

### Tutorial Delivered
This session taught shadcn/ui theming concepts:
- **Three-layer architecture:** Brand colours → shadcn semantic variables → Tailwind classes
- **How to customise colours:** Edit CSS variables in `globals.css`
- **How to add component variants:** Use `cva()` (class-variance-authority)
- **The `cn()` utility:** Merges Tailwind classes safely

### Completed
| Task | Status |
|------|--------|
| Install shadcn components (popover, avatar, dropdown-menu, progress, tooltip) | ✅ Complete |
| Create portal badge variants (success, warning, error, info, neutral, tier badges) | ✅ Complete |
| Refactor StatCard to use shadcn Card base | ✅ Complete |
| Refactor notifications dropdown with shadcn Popover | ✅ Complete |
| Refactor search input with shadcn Input | ✅ Complete |
| Update PolicyCard to use Badge for status indicators | ✅ Complete |
| Update ClaimsTimeline to use Badge for status indicators | ✅ Complete |
| Add CSS variable documentation to globals.css | ✅ Complete |

### Files Created
| File | Purpose |
|------|---------|
| `src/components/ui/popover.tsx` | shadcn Popover component (Radix UI) |
| `src/components/ui/avatar.tsx` | shadcn Avatar component |
| `src/components/ui/dropdown-menu.tsx` | shadcn DropdownMenu component |
| `src/components/ui/progress.tsx` | shadcn Progress component |
| `src/components/ui/tooltip.tsx` | shadcn Tooltip component |

### Files Modified
| File | Change |
|------|--------|
| `src/components/ui/badge.tsx` | Added 9 new variants (success, warning, error, info, neutral, bronze, silver, gold, platinum) + helper functions `getStatusBadgeVariant()`, `getTierBadgeVariant()` |
| `src/components/portal/QuickActions.tsx` | Refactored StatCard to use shadcn Card base with `cn()` utility |
| `src/components/portal/PortalLayout.tsx` | Replaced notifications with shadcn Popover, search with shadcn Input, tier badge with Badge component |
| `src/components/portal/PolicyCard.tsx` | Replaced inline status badges with Badge component |
| `src/components/portal/ClaimsTimeline.tsx` | Replaced inline status badges with Badge component (claims + documents) |
| `src/app/globals.css` | Added comprehensive CSS variable documentation at top of file |

### New Badge Variants
```typescript
// Status variants (policies, claims, documents)
success  → green (active, approved, paid)
warning  → amber (pending, pending_documents)
error    → red (rejected, cancelled)
info     → blue (submitted, under_review)
neutral  → stone (expired, lapsed)

// Tier variants (membership)
bronze   → amber metallic
silver   → slate metallic
gold     → yellow metallic
platinum → violet metallic
```

### Usage Examples
```tsx
// Using Badge with status mapping
import { Badge, getStatusBadgeVariant } from '@/components/ui/badge';

<Badge variant={getStatusBadgeVariant(policy.status)}>
  {policy.status}
</Badge>

// Using Badge with tier mapping
import { Badge, getTierBadgeVariant } from '@/components/ui/badge';

<Badge variant={getTierBadgeVariant(user.tier)}>
  {user.tier}
</Badge>
```

### Key Theme Concepts Documented
1. **Colour format:** RGB triplets without `rgb()` wrapper (e.g., `191 6 3`)
2. **Layer 1 (Brand):** `--color-primary`, `--color-secondary` in `:root`
3. **Layer 2 (Semantic):** `--primary`, `--secondary` for shadcn components
4. **Layer 3 (Classes):** `bg-primary`, `text-muted-foreground` in Tailwind

### Technical Notes
- Removed dependency on `getStatusColour()` and `getTierBadgeColour()` from portalMockData
- Badge variants use Tailwind dark mode classes (`dark:bg-*`, `dark:text-*`)
- Popover from Radix UI provides proper keyboard navigation + focus trapping

---

## SESSION 120 (19 Jan 2026) - Portal Analytics & Dark Mode Fixes

### Completed
| Task | Status |
|------|--------|
| Install shadcn chart component (Recharts wrapper) | ✅ Complete |
| Extend portalMockData.ts with analytics data | ✅ Complete |
| Create PremiumTrendChart (Area chart) | ✅ Complete |
| Create PolicyDistributionChart (Donut chart) | ✅ Complete |
| Create ClaimsStatusChart (Horizontal bar) | ✅ Complete |
| Create SpendingTrendsChart (Multi-line chart) | ✅ Complete |
| Add Analytics section to Portal Dashboard | ✅ Complete |
| Fix extensive dark mode visibility issues across portal | ✅ Complete |

### Files Created
| File | Purpose |
|------|---------|
| `src/components/portal/charts/index.ts` | Barrel exports for chart components |
| `src/components/portal/charts/PremiumTrendChart.tsx` | 6-month premium payment trend |
| `src/components/portal/charts/PolicyDistributionChart.tsx` | Policy type distribution donut |
| `src/components/portal/charts/ClaimsStatusChart.tsx` | Claims breakdown by status |
| `src/components/portal/charts/SpendingTrendsChart.tsx` | Premiums vs Claims comparison |

### Files Modified
| File | Change |
|------|--------|
| `src/data/portalMockData.ts` | Added `paymentTrends`, `chartColours`, analytics helper functions |
| `src/app/portal/dashboard/page.tsx` | Added Analytics section with 4 charts |
| `src/components/ui/chart.tsx` | Fixed shadcn theme variables for project CSS variables |
| `src/components/portal/QuickActions.tsx` | Fixed StatCard primary icon dark mode colour |
| `src/components/portal/PortalLayout.tsx` | Fixed avatar gradient colours (hex values) |
| `src/components/portal/PolicyCard.tsx` | Replaced hardcoded stone colours with CSS variables |
| `src/components/portal/ClaimsTimeline.tsx` | Fixed card colours for dark mode |
| `src/app/portal/claims/page.tsx` | Fixed help section colours |
| `src/app/portal/payments/page.tsx` | Fixed card backgrounds |
| `src/app/portal/documents/page.tsx` | Fixed search, cards, view toggle colours |
| `src/app/portal/settings/page.tsx` | Bulk CSS variable replacements |

### Dark Mode Fixes Applied
| Issue | Fix |
|-------|-----|
| shadcn `bg-background` not mapped | Changed to `bg-[var(--surface-card)]` |
| shadcn `text-foreground` not mapped | Changed to `text-[var(--text-main)]` |
| shadcn `text-muted-foreground` not mapped | Changed to `text-[var(--text-muted)]` |
| Avatar gradient `from-[var(--primary)]` broken | Changed to hex `from-[#BF0603] to-[#690025]` |
| StatCard primary icon invisible | Added `dark:text-[#e65350]` variant |
| Chart legend labels black in dark mode | Added `text-[var(--text-body)]` wrapper |
| Hardcoded `stone-*` colours | Replaced with CSS variable equivalents |

### Technical Notes
- **Chart library:** Using Recharts via shadcn/ui `chart` component (~50KB gzipped)
- **CSS variable issue:** Tailwind gradient `from-[var(--primary)]` fails because `--primary` contains raw RGB values (`191 6 3`) without `rgb()` wrapper. Must use explicit hex values for gradients.
- **shadcn theme mismatch:** Project uses custom CSS variables (`--surface-card`, `--text-main`) not shadcn defaults (`background`, `foreground`). Required manual mapping in `chart.tsx`.

---

## SESSION 119 (19 Jan 2026) - Favicon, Logos & Portal Enhancements

### Completed
| Task | Status |
|------|--------|
| Update favicon to new Metrosure logo mark (multi-resolution .ico) | ✅ Complete |
| Create Apple touch icon (180x180) | ✅ Complete |
| CSS variable aliases for dark mode (portal compatibility) | ✅ Complete |
| Settings page shadcn refactoring (Switch, Select, RadioGroup, Button) | ✅ Complete |
| Update logo files (Fixed versions from resources) | ✅ Complete |
| Portal logo with dark/light mode switching | ✅ Complete |
| Add Zoocora logo with glow effect to portal sidebar | ✅ Complete |
| Add dark/light mode toggle to portal (desktop + mobile) | ✅ Complete |

### Files Created/Modified
| File | Change |
|------|--------|
| `src/app/favicon.ico` | Replaced with new Metrosure logo mark (multi-resolution) |
| `src/app/apple-icon.png` | New Apple touch icon |
| `public/images/logo.png` | Updated from `resources/Metrosure-logo-Big-Fixed.png` |
| `public/images/logo-white.png` | Updated from `resources/Metrosure-logo-Big-Fixed-white.png` |
| `src/app/globals.css` | Portal compatibility CSS variable aliases (lines 111-127, 198-213) |
| `src/app/portal/settings/page.tsx` | Refactored with shadcn Switch, Select, RadioGroup, Button |
| `src/components/portal/PortalLayout.tsx` | Logo images (dark/light), Zoocora logo, theme toggle |

### Technical Notes
- **Favicon:** Multi-resolution .ico file (48x48, 32x32) created from `Inkscape-19-01-2026-Metrosure-LogoMark.png`
- **Portal logos:** Now use actual logo images instead of stylised "M" icon, switching for dark/light mode
- **Theme toggle:** Added to both desktop header (with rotation animation) and mobile header
- **Zoocora logo:** Located at bottom of portal sidebar with hover glow effect (`drop-shadow(0 0 8px rgba(130,178,154,0.6))`)
- **CSS aliases:** Variables like `--text-main`, `--surface-card` now map to `--color-text-main`, `--color-surface-card`

---

## SESSION 118 (19 Jan 2026) - Testimonial Refinements

### Completed
| Task | Status |
|------|--------|
| Redesign Home Testimonials (Carousel) | ✅ Complete |
| Refine Corporate/Partner Form Headers | ✅ Complete |
| Add AI Avatars to Partner Testimonials | ✅ Complete |
| Stash Partner Testimonials Section | ✅ Complete |

### Files Modified
| File | Change |
|------|--------|
| `src/components/testimonials/TestimonialsCarousel.tsx` | New carousel design, brand red accents, sans-serif font |
| `src/app/page.tsx` | Swapped old KeyTestimonials for new Carousel |
| `src/components/corporate/CorporateInquiryForm.tsx` | Updated header text "We'll get back to you..." |
| `src/components/partners/PartnerInquiryForm.tsx` | Updated header text "We'll get back to you..." |
| `src/components/partners/PartnerTestimonials.tsx` | Added AI avatars, simplified design (currently stashed) |
| `src/app/partners/page.tsx` | Stashed (commented out) PartnerTestimonials |

### Technical Notes
- **Home Testimonials:** Now uses `TestimonialsCarousel` with framer-motion and brand primary colors.
- **Partner Testimonials:** Images generated with AI (Nano Banana/Gemini) and saved to `public/images/testimonials`. Component is currently commented out in `partners/page.tsx` pending activation.
- **Forms:** Redundant sub-headers removed, "24 hours" promise moved to step subtitles.

---

## SESSION 117 (18 Jan 2026) - shadcn/ui Integration

### Completed
| Task | Status |
|------|--------|
| Add CSS variable aliases for shadcn (light mode) | ✅ Complete |
| Add CSS variable aliases for shadcn (dark mode) | ✅ Complete |
| Add theme mappings to @theme inline block | ✅ Complete |
| Install tw-animate-css for animations | ✅ Complete |
| Initialise shadcn with new-york style | ✅ Complete |
| Install shadcn components | ✅ Complete |
| Add Sonner Toaster to ClientLayout | ✅ Complete |
| Create shadcn playground page | ✅ Complete |

### Files Created
| File | Purpose |
|------|---------|
| `components.json` | shadcn/ui configuration |
| `src/components/ui/button.tsx` | Button component with variants |
| `src/components/ui/input.tsx` | Input component |
| `src/components/ui/select.tsx` | Select dropdown component |
| `src/components/ui/textarea.tsx` | Textarea component |
| `src/components/ui/dialog.tsx` | Modal dialog component |
| `src/components/ui/card.tsx` | Card component with header/footer |
| `src/components/ui/table.tsx` | Table component |
| `src/components/ui/sonner.tsx` | Toast notifications (replaces deprecated toast) |
| `src/app/playground/shadcn/page.tsx` | Component showcase page |

### Files Modified
| File | Change |
|------|--------|
| `src/app/globals.css` | Added shadcn CSS variables (light/dark), theme mappings, tw-animate-css import |
| `src/components/ClientLayout.tsx` | Added Sonner Toaster for notifications |
| `src/lib/utils.ts` | Updated with cn() utility and clsx/tailwind-merge |
| `package.json` | New dependencies: tw-animate-css, sonner, @radix-ui/*, class-variance-authority, clsx, tailwind-merge |

### shadcn Configuration
| Option | Value |
|--------|-------|
| Style | `new-york` |
| Base colour | `stone` |
| CSS variables | `yes` |
| Components path | `src/components/ui` |
| Utils path | `src/lib/utils` |

### Colour Mapping (Metrosure Theme)
| shadcn Variable | Metrosure Colour | Light Value | Dark Value |
|-----------------|------------------|-------------|------------|
| `--primary` | Red (#BF0603) | `191 6 3` | `191 6 3` |
| `--secondary` | Maroon (#690025) | `105 0 37` | `105 0 37` |
| `--accent` | Yellow (#EFF2A0) | `239 242 160` | `239 242 160` |
| `--ring` | Primary (focus) | `191 6 3` | `191 6 3` |
| `--destructive` | Red | `220 38 38` | `248 113 113` |

### Technical Notes
- **Toast replacement:** `toast` component deprecated in shadcn v3.7+; using `sonner` instead
- **Import pattern:** `import { toast } from "sonner"` for toast notifications
- **CSS format:** Using space-separated RGB values (e.g., `191 6 3`) with `rgb(var(...))` wrappers in @theme inline
- **Sidebar variables:** Added for future sidebar component use

### Playground Access
Visit `/playground/shadcn` to see all components with Metrosure theming:
- Buttons (all variants and sizes)
- Toast notifications (success, error, info)
- Form inputs (input, select, textarea)
- Cards (with different button variants)
- Dialog (modal with form)
- Table (claims summary example)
- Colour swatches reference

### Stakeholder Email Revision
| Task | Status |
|------|--------|
| Add critical notice box ("NOT a finished product") | ✅ Complete |
| Add "Information Gap" section (research vs missing data) | ✅ Complete |
| Add "Why These Items Matter" with business rationale | ✅ Complete |
| Strengthen "What I Need" as blockers with consequences | ✅ Complete |
| Revise Version 2 with plain language, remove jargon | ✅ Complete |

**Key Messages Added:**
- 92% of consumers read reviews before purchasing (BrightLocal 2024)
- Real testimonials convert 3-4x better than generic statements
- Placeholder quotes damage credibility
- Inaccurate calculator estimates create disappointment and lost conversions
- Competitors with genuine content win comparison shoppers

**Files Modified:**
- `STAKEHOLDER_EMAIL.md` - Complete revision of both Version 1 (Full) and Version 2 (Executive Summary)

---

## SESSION 116 (18 Jan 2026) - WhatsApp & Footer Improvements

### Completed
| Task | Status |
|------|--------|
| WhatsApp button auto-hide at footer | ✅ Complete |
| Zoocora logo visible on mobile | ✅ Complete |
| Zoocora logo hover glow effect | ✅ Complete |

### Files Modified
| File | Change |
|------|--------|
| `src/components/WhatsAppButton.tsx` | Added IntersectionObserver to hide button when footer visible; initial delay synced with hiring banner |
| `src/components/Footer.tsx` | Zoocora logo now visible on mobile (90px); added Framer Motion glow on hover |

### Technical Notes
- **WhatsApp auto-hide:** Uses IntersectionObserver with 20% threshold to detect footer visibility
- **Initial delay:** WhatsApp button has 1.5s delay on first appearance to sync with mobile hiring banner
- **Re-appearance:** Button reappears instantly (no delay) when scrolling away from footer
- **Zoocora glow:** Uses Framer Motion `whileHover` with `drop-shadow` filter for smooth 300ms animation
- **Mobile sizing:** Zoocora logo is 90px on mobile, 110px on desktop

---

## SESSION 115 (18 Jan 2026) - Portal Pages & Quick Fixes

### Completed
| Task | Status |
|------|--------|
| Update Trusted Partners image to local asset | ✅ Complete |
| Add Payment, PaymentHistory, Document types to mock data | ✅ Complete |
| Create Portal Payments page with stats and history | ✅ Complete |
| Create Portal Documents page with filters and search | ✅ Complete |
| Create Portal Settings page with preferences | ✅ Complete |

### Files Created
| File | Purpose |
|------|---------|
| `src/app/portal/payments/page.tsx` | Payment management, upcoming payments, history table |
| `src/app/portal/documents/page.tsx` | Document library with category filters, grid/list view |
| `src/app/portal/settings/page.tsx` | User settings, notifications, security, communication prefs |

### Files Modified
| File | Change |
|------|--------|
| `src/components/TrustedBy.tsx` | Changed image from Unsplash to `/images/work_1.jpg` |
| `src/data/portalMockData.ts` | Added Payment, PaymentHistory, Document interfaces + mock data + helper functions |

### New Portal Routes
| Route | Description |
|-------|-------------|
| `/portal/payments` | Payment stats, upcoming payments, payment history |
| `/portal/documents` | Filterable document library with search |
| `/portal/settings` | Profile, security, notification preferences |

### Technical Notes
- **Documents page:** Grid/list view toggle, category filters, search functionality
- **Payments page:** Stats row, upcoming payment cards, responsive history table
- **Settings page:** Toggle switches for notifications, radio buttons for document delivery
- **New helper functions:** `getPaymentStatusColour()`, `getPaymentHistoryStatusColour()`, `getDocumentIcon()`, `getPaymentMethodIcon()`

---

## SESSION 114 (18 Jan 2026) - Client Portal Mockup

### Completed
| Task | Status |
|------|--------|
| Create portal mock data with SA context | ✅ Complete |
| Build PortalLayout with sidebar navigation | ✅ Complete |
| Create PolicyCard component (3 variants) | ✅ Complete |
| Create ClaimsTimeline with progress tracker | ✅ Complete |
| Create QuickActions and StatCard components | ✅ Complete |
| Build Dashboard page | ✅ Complete |
| Build Policies page with filters | ✅ Complete |
| Build Claims page with detail panel | ✅ Complete |
| Restore login page with Google/Apple login | ✅ Complete |
| Configure dev-only login (redirects on Vercel) | ✅ Complete |

### Files Created
| File | Purpose |
|------|---------|
| `src/data/portalMockData.ts` | Mock users, policies, claims, notifications |
| `src/components/portal/PortalLayout.tsx` | Sidebar nav, header, notifications dropdown |
| `src/components/portal/PolicyCard.tsx` | Default, compact, expanded variants |
| `src/components/portal/ClaimsTimeline.tsx` | Visual timeline with progress bars |
| `src/components/portal/QuickActions.tsx` | Action cards + StatCard + SectionHeader |
| `src/components/portal/index.ts` | Barrel exports |
| `src/app/portal/layout.tsx` | Portal layout wrapper |
| `src/app/portal/page.tsx` | Redirects to dashboard |
| `src/app/portal/dashboard/page.tsx` | Main dashboard |
| `src/app/portal/policies/page.tsx` | Policy management |
| `src/app/portal/claims/page.tsx` | Claims tracking |
| `src/app/login/LoginPageClient.tsx` | Login UI with social auth |

### Files Modified
| File | Change |
|------|--------|
| `src/app/login/page.tsx` | Environment-based redirect (Vercel only) |

### Portal Routes
| Route | Description |
|-------|-------------|
| `/login` | Login page (dev: full UI, prod: redirects) |
| `/portal` | Redirects to `/portal/dashboard` |
| `/portal/dashboard` | Stats, quick actions, policies, claims |
| `/portal/policies` | Filterable policy list |
| `/portal/claims` | Claims list with timeline detail |

### Technical Notes
- **Login redirect:** Uses `process.env.VERCEL === "1"` to detect Vercel deployments
- **Mock data:** South African context (Rand currency, realistic SA policies)
- **Animation types:** All Framer Motion variants use `as const` for TypeScript compatibility
- **Design system:** Matches existing MetroSure colours, typography, animations

---

## NEXT SESSION PRIORITIES

### Priority 1: ✅ NARRATIVE REVAMP COMPLETE
**Status:** Completed (Sessions 124-126)

**Branch:** `feature/narrative-b2b-clarity` - ready for merge to main

**What was done:**
- Session 124: Initial soft changes to partner language
- Session 125: High-traffic pages (Homepage, Partners, Corporate, Quote)
- Session 126: Insurance service pages (removed pricing), reviewed Contact, Claims, Footer, FAQs

**Outcome:** Website now consistently presents Metrosure as a broker connecting customers with partner products. No more "our products/policies" language or pricing that implies ownership.

### Priority 1: Merge & Deploy Narrative Changes
- Merge `feature/narrative-b2b-clarity` to main
- Deploy to production
- Verify all changes render correctly

### Priority 2: Portal Architecture Stakeholder Review
- Share `docs/PORTAL_ARCHITECTURE.md` with stakeholders
- Collect feedback before beginning implementation
- Portal work paused until architecture approved

### Priority 2: Job Service Activation (When Ready)
- Client creates Workable account at https://www.workable.com/
- Generate API token, set `WORKABLE_API_TOKEN` and `WORKABLE_SUBDOMAIN` in Vercel
- Alternative: Indeed Publisher API at https://ads.indeed.com/jobroll/

### Priority 3: Production Readiness
- Cross-browser testing (Chrome, Firefox, Edge)
- Remove Development Banner before go-live
- Final testimonial variant decision

---

## KEY FILE LOCATIONS

### shadcn/ui (Session 117)
| File | Purpose |
|------|---------|
| `components.json` | shadcn/ui configuration |
| `src/components/ui/` | All shadcn components (button, input, select, badge variants, etc.) |
| `src/lib/utils.ts` | cn() utility for class merging |
| `src/app/playground/shadcn/` | Component showcase page |

### Login (Placeholder)
| File | Purpose |
|------|---------|
| `src/app/login/` | Login page (non-functional placeholder, redirects to homepage) |

### Core Configuration
| File | Purpose |
|------|---------|
| `CLAUDE.md` | Complete style guide, coding conventions, patterns |
| `src/data/` | Centralised data (jobs, partners, services, testimonials) |
| `src/lib/` | Utilities (email, validation, rate limiting) |

### Email Routing
| Type | Address |
|------|---------|
| Careers applications | `hr@metrosureconsult.co.za` |
| CC on applications | `lazola@metrosureconsult.co.za` |
| General contact | `info@metrosuregroup.co.za` |

### Feature Toggles
| Feature | Status | Location |
|---------|--------|----------|
| Cookie consent | Disabled | `src/components/ClientLayout.tsx` |
| Development Banner | Active | `src/components/DevelopmentBanner.tsx` |
| Login page | Non-functional (redirects to homepage) | `src/app/login/page.tsx` |
| Partner Testimonials | Stashed | `src/app/partners/page.tsx` |
| Client Portal | **Removed** (Session 123) | — |

---

## QUICK REFERENCE

### Commands
```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build (must pass before commit)
```

### Login Page
Login page exists as non-functional placeholder (redirects to homepage on form submission).

### Rate Limits
| Route | Limit |
|-------|-------|
| Careers application | 3/hour |
| Partner/Corporate inquiry | 5/hour |
| Calculator email | 10/hour |
| Quote request | 10/hour |
| Contact form | 15/hour |

---

## RECENT SESSION HIGHLIGHTS

| Session | Focus | Key Outcomes |
|---------|-------|--------------|
| 126 | Narrative Revamp Phase 3 (Complete) | Insurance pages updated (pricing removed → "Get a Quote"); Contact, Claims, Footer, FAQs reviewed (all good); Narrative revamp complete |
| 125 | Narrative Revamp Phase 2 | High-traffic pages updated (Homepage, Partners, Corporate, Quote); Current state analysis added to planning doc |
| 124 | Narrative B2B Clarity & Portal Docs | Softened website language to clarify broker/partner model; Created comprehensive `PORTAL_ARCHITECTURE.md` |
| 123 | Portal Removal | Removed entire portal prototype; Clean slate for proper architecture planning |
| 122 | Portal tweakcn Theme | Fixed oklch→RGB format mismatch; Portal theme now works in light/dark mode |

---

*For detailed coding conventions, patterns, and historical lessons, see `CLAUDE.md`.*
