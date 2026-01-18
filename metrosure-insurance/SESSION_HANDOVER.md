# Metrosure Insurance Brokers - Session Handover

**Updated:** 18 January 2026 (Session 115)
**Stack:** Next.js 16 | React 19 | TypeScript 5 | Tailwind CSS 4 | Framer Motion 12
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 52 (45 pages + 7 API routes)
- **Last Build:** 18 January 2026

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

### Priority 1: shadcn UI Integration
- Integrate shadcn/ui for UI/UX consistency across portal
- Components needed: Button, Input, Select, Dialog, Toast, Card, Table
- Installation: `npx shadcn@latest init`
- Refactor existing portal components to use shadcn primitives
- Benefits: Accessibility, consistent theming, reduced custom CSS

### Priority 2: Portal Refinements
- Mobile responsive testing for all portal pages
- Claim detail page with full timeline (`/portal/claims/[id]`)
- Notifications page (`/portal/notifications`)
- Add interactivity to Settings toggles (currently visual mockup)

### Priority 3: Job Service Activation (When Ready)
- Client creates Workable account at https://www.workable.com/
- Generate API token, set `WORKABLE_API_TOKEN` and `WORKABLE_SUBDOMAIN` in Vercel
- Alternative: Indeed Publisher API at https://ads.indeed.com/jobroll/

### Priority 4: Production Readiness
- Cross-browser testing (Chrome, Firefox, Edge)
- Remove Development Banner before go-live
- Final testimonial variant decision

---

## KEY FILE LOCATIONS

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
| 115 | Portal Pages & Quick Fixes | Payments, Documents, Settings pages; TrustedBy image update |
| 114 | Client Portal Mockup | Dashboard, Policies, Claims pages; Login with social auth |
| 113 | WhatsApp Integration | Floating click-to-chat button, mobile-safe positioning |
| 112 | Maps, Email & Roadmap | High-res maps (2x), [Metrosure Online] email prefix, SAST timezone |

---

*For detailed coding conventions, patterns, and historical lessons, see `CLAUDE.md`.*
