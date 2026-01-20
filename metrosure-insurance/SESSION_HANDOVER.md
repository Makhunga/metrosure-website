# Metrosure Insurance Brokers - Session Handover

**Updated:** 20 January 2026 (Session 125)
**Stack:** Next.js 16 | React 19 | TypeScript 5 | Tailwind CSS 4 | Framer Motion 12 | shadcn/ui
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 45 (38 pages + 7 API routes)
- **Last Build:** 20 January 2026

---

## CURRENT SESSION (125) - 20 Jan 2026

### Changes Made
| Change | Details |
|--------|---------|
| **Favicon updated** | Black top section added (matches main logo), 5% padding, white background |
| **WhatsApp number** | Changed to `+27 67 120 9527` |
| **Head office swapped** | Musgrave (32 Stephen Dlamini Rd) is now Head Office; 391 Anton Lembede is Durban CBD |
| **Map quality fix** | Added `unoptimized` to map images for full resolution in production |
| **Company info centralised** | Created `src/data/companyInfo.ts` for single source of truth |

### Files Modified
- `src/app/favicon.ico`, `src/app/apple-icon.png` - New logo mark with black top
- `src/components/WhatsAppButton.tsx`, `src/lib/whatsapp.ts` - New WhatsApp number
- `src/components/contact/OfficeLocations.tsx` - Musgrave as head office, map quality fix
- `src/components/contact/FAQ.tsx` - Updated office list
- `src/lib/email.ts` - Email footer address
- `src/app/layout.tsx` - SEO structured data
- `src/app/terms/page.tsx`, `src/app/legal/page.tsx`, `src/app/privacy/page.tsx`, `src/app/help/page.tsx` - Legal addresses

### New File
`src/data/companyInfo.ts` - Centralised company info (addresses, contacts, legal details, offices)

---

## ACTIVE BRANCH

**Branch:** `feature/narrative-b2b-clarity` (on origin, not merged)

Contains:
- Narrative updates clarifying B2B broker model
- `docs/PORTAL_ARCHITECTURE.md` - Comprehensive portal plan for stakeholder review
- `docs/NARRATIVE_REVAMP.md` - Planning doc for complete narrative overhaul

---

## NEXT SESSION PRIORITIES

### Priority 1: HUGE NARRATIVE REVAMP ⭐⭐⭐
**Goal:** Complete website narrative overhaul to clarify Metrosure's B2B broker/marketer model.

**Branch:** `feature/narrative-b2b-clarity`
**Planning Doc:** `docs/NARRATIVE_REVAMP.md`

**Key Message:** Metrosure does NOT create/underwrite products. We provide sales agents and marketing services to partners (e.g., Metrosure agents in TFG stores selling TFG financial products).

### Priority 2: Portal Implementation (After Narrative)
- Review `docs/PORTAL_ARCHITECTURE.md` with stakeholders
- Begin Phase 1 (Foundation) once approved

### Priority 3: Production Readiness
- Remove Development Banner before go-live
- Cross-browser testing
- Activate job service when Workable/Indeed ready

---

## KEY LOCATIONS

| Purpose | Location |
|---------|----------|
| Company info | `src/data/companyInfo.ts` |
| Style guide | `CLAUDE.md` |
| Portal architecture | `docs/PORTAL_ARCHITECTURE.md` |
| Narrative plan | `docs/NARRATIVE_REVAMP.md` |
| shadcn components | `src/components/ui/` |
| Centralised data | `src/data/` |

---

## CONTACT INFO (Single Source)

| Type | Value |
|------|-------|
| **Head Office** | 32 Stephen Dlamini Road, Musgrave, Durban, 4001 |
| **Phone** | +27 31 301 1192 |
| **WhatsApp** | +27 67 120 9527 |
| **Email (B2C)** | info@metrosuregroup.co.za |
| **Email (B2B)** | clients@metrosureconsult.co.za |
| **FSP Number** | 47089 |

---

## FEATURE STATUS

| Feature | Status |
|---------|--------|
| Client Portal | Removed (Session 123) - Architecture planned, pending rebuild |
| Login page | Placeholder (redirects to homepage) |
| Cookie consent | Disabled |
| Development Banner | Active (remove before go-live) |
| Partner Testimonials | Stashed |
| Badge variants | Preserved in `src/components/ui/badge.tsx` |

---

## SESSION HISTORY (Recent)

| Session | Date | Focus |
|---------|------|-------|
| 125 | 20 Jan | Favicon, WhatsApp, head office swap, company info centralisation |
| 124 | 20 Jan | Narrative B2B clarity (soft changes), portal architecture docs |
| 123 | 19 Jan | Portal removal (clean slate for proper architecture) |
| 117-122 | 18-19 Jan | Portal development (removed - see Session 123) |
| 117 | 18 Jan | shadcn/ui integration |
| 116 | 18 Jan | WhatsApp auto-hide, footer improvements |

---

## COMMANDS

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build (must pass before commit)
```

---

*For coding conventions and patterns, see `CLAUDE.md`.*
