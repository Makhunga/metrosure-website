# Metrosure Insurance Brokers - Session Handover

**Updated:** 19 January 2026 (Session 120)
**Stack:** Next.js 16 | React 19 | TypeScript 5 | Tailwind CSS 4 | Framer Motion 12 | shadcn/ui
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 53 (46 pages + 7 API routes)
- **Last Build:** 19 January 2026


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

### Priority 1: Portal UI Refactor to shadcn/ui ⭐ (MAJOR)
**Goal:** Replace custom portal styling with customised shadcn/ui components for consistency and maintainability.

**Why this refactor:**
- Current portal uses mix of custom CSS variables and hardcoded Tailwind colours
- Frequent dark mode visibility issues due to inconsistent theming
- shadcn components are already installed but not fully utilised in portal
- Unified component library = fewer bugs, faster development

**Scope:**
- Replace custom StatCard, QuickActions with shadcn Card variants
- Replace custom form controls with shadcn Input, Select, Switch
- Replace notification dropdowns with shadcn Popover/DropdownMenu
- Replace table styling with shadcn Table
- Create portal-specific shadcn theme overrides

**Components to install:**
```bash
npx shadcn@latest add avatar badge dropdown-menu popover tabs accordion alert
```

**Alternative Dashboard Libraries (if shadcn insufficient):**

| Library | Pros | Cons | Bundle |
|---------|------|------|--------|
| **Tremor** | Tailwind-native, beautiful defaults, dark mode built-in | Opinionated, less customisable | ~150KB |
| **Mantine** | Comprehensive, excellent a11y, great docs | Large bundle, different styling approach | ~200KB |
| **NextUI** | Modern design, Tailwind-based, good animations | Newer, smaller community | ~100KB |
| **Radix Themes** | From Radix team, excellent a11y, works with existing Radix | Limited components, newer | ~80KB |
| **Chakra UI** | Mature, excellent DX, good theming | Large bundle, not Tailwind-native | ~180KB |

**Recommendation:** Start with full shadcn/ui adoption. If dashboard-specific components needed (KPIs, data tables, charts), consider **Tremor** as it's Tailwind-native and complements shadcn well.

### Priority 2: Portal Refinements
- Mobile responsive testing for all portal pages
- Claim detail page with full timeline (`/portal/claims/[id]`)
- Notifications page (`/portal/notifications`)
- Add real toast feedback to form submissions

### Priority 3: Additional shadcn Components (As Needed)
- Install additional components: `npx shadcn@latest add [component]`
- Consider: Tabs, Accordion, Alert, Badge, Avatar, Dropdown Menu
- Form components: Checkbox, Radio Group, Switch, Slider

### Priority 4: Job Service Activation (When Ready)
- Client creates Workable account at https://www.workable.com/
- Generate API token, set `WORKABLE_API_TOKEN` and `WORKABLE_SUBDOMAIN` in Vercel
- Alternative: Indeed Publisher API at https://ads.indeed.com/jobroll/

### Priority 5: Production Readiness
- Cross-browser testing (Chrome, Firefox, Edge)
- Remove Development Banner before go-live
- Final testimonial variant decision

---

## KEY FILE LOCATIONS

### shadcn/ui (Session 117)
| File | Purpose |
|------|---------|
| `components.json` | shadcn/ui configuration |
| `src/components/ui/` | All shadcn components (button, input, select, etc.) |
| `src/lib/utils.ts` | cn() utility for class merging |
| `src/app/playground/shadcn/` | Component showcase page |

### Portal (Sessions 114-115)
| File | Purpose |
|------|---------|
| `src/components/portal/` | All portal UI components |
| `src/data/portalMockData.ts` | Mock data (users, policies, claims, payments, documents) + helpers |
| `src/app/portal/` | Portal pages (dashboard, policies, claims, payments, documents, settings) |
| `src/app/login/` | Login page with social auth |

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
| Portal login | Dev only | `src/app/login/page.tsx` |
| Partner Testimonials | Stashed | `src/app/partners/page.tsx` |

---

## QUICK REFERENCE

### Commands
```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build (must pass before commit)
```

### Portal Access (Development Only)
1. Navigate to `/login`
2. Click "Continue with Google" or enter any credentials
3. Access portal dashboard at `/portal/dashboard`

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
| 120 | Portal Analytics & Dark Mode | 4 dashboard charts (Recharts); Extensive dark mode fixes across portal |
| 119 | Favicon, Logos & Portal | New favicon/apple-icon; Portal logos with dark/light switching; Zoocora logo; Theme toggle |
| 118 | Testimonial Refinements | New TestimonialsCarousel; AI avatars for partners; Form header updates |
| 117 | shadcn/ui Integration | 8 components installed; Metrosure theming; Sonner toasts; playground page |
| 116 | WhatsApp & Footer Improvements | WhatsApp auto-hide at footer; Zoocora logo on mobile with glow |

---

*For detailed coding conventions, patterns, and historical lessons, see `CLAUDE.md`.*
