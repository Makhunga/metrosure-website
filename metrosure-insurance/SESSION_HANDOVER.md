# Metrosure Insurance Brokers - Session Handover

**Updated:** December 31, 2025 (Session 51)
**Stack:** Next.js 16, TypeScript, Tailwind CSS v4, React 19, Framer Motion
**Dev:** `http://localhost:3000` | **Prod:** Vercel
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 40 (36 pages + 4 API routes)
- **Last Build:** December 31, 2025

---

## SESSION 51 (Dec 31, 2025)

### Completed
| Change | Files |
|--------|-------|
| Partners page: Magnetic hero buttons, FAQ grid fix, watermarks | `PartnersHero.tsx`, `PartnerFAQ.tsx`, `ValueProposition.tsx` |
| Home page: PartnersCTA glassmorphism cards | `PartnersCTA.tsx` |
| Contact page: Grid pattern background | `src/app/contact/page.tsx` |
| Quote page: Square pattern bg, "Free Quote" red, FAQ watermark | `src/app/quote/page.tsx` |
| Quote page: Partner link - remove underline, add hover arrow | `src/app/quote/page.tsx` |
| Google Maps: Fixed on Vercel (env var needed redeploy) | `OfficeLocations.tsx` |
| Job detail pages: Redirect to under-development (middleware fix) | `middleware.ts`, `src/app/careers/[slug]/page.tsx` |

### Environment Setup (Vercel)
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` must be set in Vercel dashboard
- Requires redeploy after adding env vars

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

### Under Development (Redirects to /under-development)
- `/insurance/*` (auto, home, life, business)
- `/tools/coverage-calculator`
- `/legal`, `/claims`, `/policies`
- `/careers/[slug]` (job detail pages)

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
```

---

## DEFERRED

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
