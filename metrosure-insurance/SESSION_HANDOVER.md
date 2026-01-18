# Metrosure Insurance Brokers - Session Handover

**Updated:** 18 January 2026 (Session 113)
**Stack:** Next.js 16 | React 19 | TypeScript 5 | Tailwind CSS 4 | Framer Motion 12
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: ✅ Passing

- **Routes:** 45 (38 pages + 7 API routes)
- **Last Build:** 18 January 2026

---

## SESSION 113 (18 Jan 2026) - WhatsApp Integration

### Completed
| Task | Status |
|------|--------|
| Create WhatsAppButton component | ✅ Complete |
| Add to ClientLayout for site-wide visibility | ✅ Complete |
| Position above mobile hiring banner | ✅ Complete |
| Export from components index | ✅ Complete |

### Files Created/Modified
- `src/components/WhatsAppButton.tsx` - New floating click-to-chat button
- `src/components/ClientLayout.tsx` - Added WhatsAppButton import and usage
- `src/components/index.ts` - Added WhatsAppButton export

### Technical Notes
- **WhatsApp Number:** +27 71 198 5248
- **Pre-filled message:** "Hi Metrosure, I'd like to enquire about your insurance products."
- **Positioning:** Mobile `bottom-20` (clears hiring banner), Desktop `bottom-8`
- **Animation:** Spring entrance (1.5s delay), hover scale 1.1 + lift
- **Z-index:** 40 (below modals, above content)

---

## SESSION 112 (18 Jan 2026) - Maps, Email Updates & Roadmap

### Completed
| Task | Status |
|------|--------|
| Save strategic roadmap to docs/ROADMAP.md | ✅ Complete |
| Upgrade map images from 800×600 to 1600×1200 | ✅ Complete |
| Add location markers to static maps | ✅ Complete |
| Create map generation script | ✅ Complete |
| Update email subjects to [Metrosure Online] | ✅ Complete |
| Fix email timezone (now uses SAST/GMT+2) | ✅ Complete |

### Files Modified
- `docs/ROADMAP.md` - New strategic roadmap for future development phases
- `scripts/generate-maps.mjs` - Node.js script to regenerate high-res OSM maps
- `public/images/maps/*.png` - All 5 office maps upgraded to 1600×1200
- `src/app/api/contact/route.ts` - Email subject prefix updated
- `src/app/api/quote/route.ts` - Email subject + timezone fix
- `src/app/api/careers-application/route.ts` - Email subject + timezone fix
- `src/app/api/partner-inquiry/route.ts` - Email subject updated
- `src/app/api/corporate-inquiry/route.ts` - Email subject updated
- `package.json` - Added `canvas` dev dependency for map generation

### Technical Notes
- **Map generation:** Run `node scripts/generate-maps.mjs` to regenerate maps from OpenStreetMap tiles
- **Email subjects:** Changed from `[Website Form]` to `[Metrosure Online]` prefix
- **Timezone:** All email timestamps now use `timeZone: 'Africa/Johannesburg'` (SAST/GMT+2)

---

## SESSION 111 (17 Jan 2026) - Employee Testimonials & UI Polish

### Completed
| Task | Status |
|------|--------|
| Update employee testimonials (names, roles, stories) | ✅ Complete |
| Add warning icon to Development Banner | ✅ Complete |
| Fix Development Banner icon alignment | ✅ Complete |
| Fix FAQ accordion height issue (Corporate & Partners) | ✅ Complete |
| Minimise SESSION_HANDOVER.md | ✅ Complete |

### Employee Updates
| Name | Role | Department |
|------|------|------------|
| Khayakazi Cele | Accounts Clerk | Finance |
| Selona Ramjiawan | Executive Administrator | Executive Office |
| Thami Mbambo | Project Manager | Operations |
| Mercutio Buthelezi | Sales Manager | Sales |
| Khwezi Dube | Facilitator | Learning & Development |
| Mvelo Mkhwanazi | Sales Manager | Sales |

### Files Modified
- `src/data/employeeTestimonials.ts` - Updated 6 employees with new names, roles, professional growth stories
- `src/components/DevelopmentBanner.tsx` - Added warning icon with flex alignment fix
- `src/components/corporate/CorporateFAQ.tsx` - CSS columns for independent accordion heights
- `src/components/partners/PartnerFAQ.tsx` - CSS columns for independent accordion heights
- `src/components/careers/testimonial-variants/TestimonialsCarousel.tsx` - Removed location field reference
- `SESSION_HANDOVER.md` - Reduced from ~1400 to ~160 lines

### Technical Notes
**FAQ Accordion Fix:** Changed from CSS Grid to CSS `columns` for cross-browser compatibility (Firefox). Columns now expand independently without affecting adjacent items.

---

## NEXT SESSION PRIORITIES

### Priority 1: Job Service Activation (When Ready)
- Client creates Workable account at https://www.workable.com/
- Generate API token, set `WORKABLE_API_TOKEN` and `WORKABLE_SUBDOMAIN` in Vercel
- Alternative: Indeed Publisher API at https://ads.indeed.com/jobroll/

### Priority 2: Production Readiness Review
- Cross-browser testing (Chrome, Firefox, Edge)
- Mobile responsive testing (375px, 768px, 1024px)
- Social media metadata testing (OG tags, Twitter cards)

### Priority 3: Final Decisions
- Home testimonials: Decide between Bold Statement or Minimal
- Remove TestimonialsVariantSwitcher when final decision made
- CaseStudies reinstatement (awaiting stakeholder decision)
- Gallery reimplementation (currently removed from About and Careers)

### Priority 4: Pre-Production
- Remove Development Banner before go-live

---

## KEY FILE LOCATIONS

### Core Configuration
| File | Purpose |
|------|---------|
| `CLAUDE.md` | Complete style guide, coding conventions, patterns |
| `src/data/` | Centralised data (jobs, partners, services, testimonials) |
| `src/lib/` | Utilities (email, validation, rate limiting) |

### Job Integration (Session 110)
| File | Purpose |
|------|---------|
| `src/lib/workable.ts` | Workable ATS API client |
| `src/lib/indeed.ts` | Indeed Publisher API client |
| `src/data/jobs.ts` | Job fetching with priority fallback |

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
| Home testimonial switcher | Active | `src/app/page.tsx` |

---

## QUICK REFERENCE

### Commands
```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build (must pass before commit)
```

### Environment Variables (Job Integration)
```bash
# Workable (ATS)
WORKABLE_API_TOKEN=your_token
WORKABLE_SUBDOMAIN=metrosure

# Indeed (Job Board)
INDEED_PUBLISHER_ID=your_id
INDEED_EMPLOYER_ID=your_id
```

### Rate Limits
| Route | Limit |
|-------|-------|
| Careers application | 3/hour |
| Partner/Corporate inquiry | 5/hour |
| Calculator email | 10/hour |
| Quote request | 10/hour |
| Contact form | 15/hour |

---

## LESSONS LEARNED (Summary)

### Critical Patterns
- **AnimatePresence + App Router:** Incompatible - use `whileInView` instead
- **Footer overlap:** Requires `-mt-8 md:-mt-12` + `z-20` for rounded corners
- **Dark mode:** Use warm neutrals, test both modes before committing
- **British English:** Always use en-GB spelling (colour, organisation, programme)

### Form Components
Use `Labelled*` components (LabelledInput, LabelledSelect, LabelledTextarea) - floating labels deprecated.

### Build Discipline
Always run `npm run build` before committing. TypeScript errors will break Vercel deploy.

### Documentation Location
Detailed style guides, coding conventions, and historical lessons are in `CLAUDE.md`.

---

## RECENT SESSION HIGHLIGHTS

| Session | Focus | Key Outcomes |
|---------|-------|--------------|
| 113 | WhatsApp Integration | Floating click-to-chat button, mobile-safe positioning |
| 112 | Maps, Email & Roadmap | High-res maps (2x), [Metrosure Online] email prefix, SAST timezone |
| 111 | Employee Testimonials & UI | Updated 6 staff profiles, FAQ accordion fix, banner icon |
| 110 | Job Service Integration | Workable + Indeed API clients ready, email routing updated |

---

*For detailed coding conventions, patterns, and historical lessons, see `CLAUDE.md`.*
