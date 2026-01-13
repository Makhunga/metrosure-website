# Metrosure Insurance Brokers - Session Handover

**Updated:** 13 January 2026 (Session 103)
**Stack:** Next.js 16, TypeScript, Tailwind CSS v4, React 19, Framer Motion
**Dev:** `http://localhost:3000` | **Prod:** Vercel
**Repo:** `git@github.com:Makhunga/metrosure-website.git`

---

## BUILD STATUS: Passing

- **Routes:** 45 (38 pages + 7 API routes)
- **Last Build:** 13 January 2026

---

## NEXT SESSION PRIORITIES (Session 104)

### Priority 1: Unused Variant Cleanup
**Status:** Variant selections made in Session 103, unused files can be deleted
**Files to Delete:**

| File | Reason |
|------|--------|
| `src/components/testimonials/TestimonialsSplitScreen.tsx` | Not selected (Bold + Minimal kept) |
| `src/components/testimonials/TestimonialsCardStack.tsx` | Not selected (Bold + Minimal kept) |
| `src/components/careers/testimonial-variants/TestimonialsFeatured.tsx` | Not selected (Carousel kept) |
| `src/components/careers/testimonial-variants/TestimonialsVariantSwitcher.tsx` | Switcher no longer needed |
| `src/components/about/timeline-variants/TimelineAlternating.tsx` | Not selected (Original kept) |
| `src/components/about/timeline-variants/TimelineVariantSwitcher.tsx` | Switcher no longer needed |

### Priority 2: Production Readiness Review
- [ ] Verify all watermarks visible in both light and dark mode
- [ ] Cross-browser testing (Chrome, Firefox, Edge)
- [ ] Mobile responsive testing (375px, 768px, 1024px)
- [ ] Accessibility check (keyboard navigation, focus states)
- [ ] Final content review

### Priority 3: CaseStudies Reinstatement Decision
- [ ] Awaiting stakeholder meeting decision
- [ ] If approved, uncomment on Partners page

### Priority 4: Gallery Reimplementation (If Desired)
- [ ] About page gallery currently removed
- [ ] Careers page gallery currently removed
- [ ] Decide if galleries add value or should remain removed

### Priority 5: Development Banner Removal
- [ ] Remove `src/components/DevelopmentBanner.tsx` before production
- [ ] Update `src/components/ClientLayout.tsx` to remove import

---

## SESSION 103 (13 Jan 2026) - Style Guide Finalisation & Variant Selection

### Focus
Integrated partner showcase images, finalised variant selections for testimonials and timeline, and documented style guide patterns in CLAUDE.md.

### Completed Tasks
| Task | Status |
|------|--------|
| Copy 4 partner images to public/images/partners/ | Complete |
| Update partnerShowcase.ts with new image paths | Complete |
| Review home page testimonial variants in browser | Complete |
| Select home testimonial variants (Bold + Minimal) | Complete |
| Review careers page testimonial variants | Complete |
| Select careers testimonial (Cinematic Carousel) | Complete |
| Review about page timeline variants | Complete |
| Select about timeline (Original) | Complete |
| Update CLAUDE.md with style guide patterns | Complete |
| Build verification | Complete |

### Files Created
| File | Description |
|------|-------------|
| `public/images/partners/Avbob-slide.jpg` | AVBOB family protection image |
| `public/images/partners/bolttech-slide.jpg` | bolttech digital insurance image |
| `public/images/partners/metropolitan-slide.jpg` | Metropolitan family life image |
| `public/images/partners/tfg-slide.jpg` | TFG retail environment image |

### Files Modified
| File | Change |
|------|--------|
| `src/data/partnerShowcase.ts` | Updated image paths and alt text for all 4 partners |
| `src/components/testimonials/TestimonialsVariantSwitcher.tsx` | Reduced from 4 to 2 variants (Bold + Minimal) |
| `src/app/careers/page.tsx` | Changed to use TestimonialsCarousel directly (removed switcher logic) |
| `src/app/about/page.tsx` | Changed to use TimelineOriginal directly (removed switcher logic) |
| `CLAUDE.md` | Added card hover, watermark, and z-index patterns |

### Variant Selections Made
| Page | Selected Variant | Removed Variants |
|------|-----------------|------------------|
| Home (testimonials) | Bold Statement + Minimal | Split Screen, Card Stack |
| Careers (testimonials) | Cinematic Carousel | Featured Spotlight |
| About (timeline) | Original | Alternating |

### Style Guide Patterns Added to CLAUDE.md
| Pattern | Value |
|---------|-------|
| Card hover animation | `y: -8, scale: 1.02` with spring physics |
| Shadow escalation | `shadow-lg shadow-primary/25` → `shadow-xl shadow-primary/40` |
| Watermark opacity (light) | `text-white/[0.03]` |
| Watermark opacity (dark) | `text-white/[0.025]` |
| Watermark responsive sizing | `text-[6rem] md:text-[10rem] lg:text-[14rem]` |
| Z-index scale | Base `z-10`, Sticky `z-40`, Modals `z-50` |

### Partner Showcase Images Updated
| Partner | New Image | Alt Text |
|---------|-----------|----------|
| AVBOB | `Avbob-slide.jpg` | Family protection with AVBOB funeral cover - multi-generational support |
| bolttech | `bolttech-slide.jpg` | Digital insurance innovation - young professional using bolttech mobile app |
| TFG/Jet | `tfg-slide.jpg` | TFG Jet retail in-store insurance sales - customer service at point of sale |
| Metropolitan | `metropolitan-slide.jpg` | Metropolitan life insurance - young family enjoying outdoor moments together |

### Deferred to Session 104
| Task | Reason |
|------|--------|
| Delete unused variant components | Can be done in cleanup session |
| Home testimonials switcher removal | User wants to keep Bold + Minimal for now |

---

## SESSION 102 (13 Jan 2026) - Partner Logo Fixes & Image Prompts

### Focus
Fixed partner logos (Metropolitan SVG, AVBOB higher quality), created AI image generation prompts for partner showcase slides.

### Completed Tasks
| Task | Status |
|------|--------|
| Create Metropolitan SVG logos (light + dark mode) | Complete |
| Update Metropolitan partner config with `logoDark` | Complete |
| Delete old Metropolitan Adobe Illustrator SVG | Complete |
| Download higher quality AVBOB logo from avbob.co.za | Complete |
| Update AVBOB partner config with new logo | Complete |
| Create image prompts for all 4 partners | Complete |
| Visual testing in browser | Complete |
| Build verification | Complete |

### Files Created
| File | Description |
|------|-------------|
| `public/images/partners/metropolitan-logo-light.svg` | Navy (#002856) SVG for light mode |
| `public/images/partners/metropolitan-logo-dark.svg` | White (#fff) SVG for dark mode |
| `public/images/partners/avbob-new-logo.png` | Higher quality logo (180x107) from official site |

### Files Modified
| File | Change |
|------|--------|
| `src/data/partnerShowcase.ts` | Metropolitan: added `logoDark`, set `darkModeInvert: false`; AVBOB: updated to `avbob-new-logo.png` |

### Files Deleted
| File | Reason |
|------|--------|
| `public/images/partners/metropolitan-co-za-vector-logo.svg` | Replaced with clean SVG from official site |

### Partner Logo Configuration (Updated)
| Partner | Logo Type | logoDark | darkModeInvert | Notes |
|---------|-----------|----------|----------------|-------|
| AVBOB | PNG (180x107) | - | `false` | Green background works on both modes |
| bolttech | SVG | - | `true` | CSS inversion to white |
| TFG | SVG | - | `false` | Has purple background |
| Metropolitan | SVG | Yes | `false` | Dedicated light/dark SVGs |

### Image Prompts Created
Prompts for generating authentic, documentary-style images for each partner:

**AVBOB (Funeral Cover):**
```
South African extended family gathered in a modest living room, grandmother sitting centrally with adult children around her, warm afternoon light through curtains, comfortable home interior with personal touches, candid moment of togetherness, documentary photography style, natural expressions, 35mm film aesthetic
```

**bolttech (Digital Insurance):**
```
Young South African professional using smartphone app on a modern couch, soft apartment lighting, focused expression, clean contemporary interior, tablet and laptop visible nearby, natural candid moment, editorial lifestyle photography, tech-savvy millennial aesthetic
```

**TFG/Jet (Retail):**
```
Inside a South African clothing retail store, friendly sales assistant helping a customer at the counter, bright store lighting, clothing racks visible in background, point-of-sale terminal, authentic retail moment, candid customer interaction, documentary retail photography
```

**Metropolitan (Life Insurance):**
```
Young South African couple with toddler in a park, casual weekend outing, natural outdoor lighting, genuine family moment, modest urban park setting, documentary family photography, represents life protection and future planning, authentic joy
```

### Prompt Design Principles
- **DO:** South African context, specific lighting, authentic details, documentary style
- **AVOID:** "Perfect", "smiling at camera", "studio lighting", stock photo triggers

---

## SESSION 101 (13 Jan 2026) - Testimonial Variants & Logo Fixes

### Focus
Created 4 home page testimonial variants, fixed partner logo dark mode issues, and replaced 1Life with bolttech partner.

### Completed Tasks
| Task | Status |
|------|--------|
| Create TestimonialsBoldStatement (Wise-inspired) | Complete |
| Create TestimonialsSplitScreen (50/50 dramatic split) | Complete |
| Create TestimonialsCardStack (Parallax layered cards) | Complete |
| Create TestimonialsMinimal (Typography-focused) | Complete |
| Create TestimonialsVariantSwitcher for home page | Complete |
| Add testimonials/index.ts barrel exports | Complete |
| Add `darkModeInvert` property to ShowcasePartner interface | Complete |
| Fix TFG logo overflow and alignment | Complete |
| Configure conditional dark mode inversion for logos | Complete |
| Replace 1Life with bolttech partner | Complete |
| Copy bolttech SVG to public/images/partners/ | Complete |
| Add PartnerShowcase watermark "PARTNERS" | Complete |
| Add LatestOpportunities watermark "OPPORTUNITIES" | Complete |
| Visual testing in browser (light + dark mode) | Complete |
| Build verification | Complete |

### Files Created
| File | Description |
|------|-------------|
| `src/components/testimonials/TestimonialsBoldStatement.tsx` | Wise-inspired with large stacked typography and floating card |
| `src/components/testimonials/TestimonialsSplitScreen.tsx` | Dramatic 50/50 split with large photo and quote |
| `src/components/testimonials/TestimonialsCardStack.tsx` | Layered cards with parallax depth effect |
| `src/components/testimonials/TestimonialsMinimal.tsx` | Typography-focused with giant quotation marks |
| `src/components/testimonials/TestimonialsVariantSwitcher.tsx` | Toggle bar for A/B comparison |
| `src/components/testimonials/index.ts` | Barrel exports for all variants |

### Files Modified
| File | Change |
|------|--------|
| `src/data/partnerShowcase.ts` | Added `darkModeInvert` property; replaced 1Life with bolttech |
| `src/components/PartnerShowcase.tsx` | Conditional dark mode inversion; added "PARTNERS" watermark; fixed logo sizing |
| `src/components/LatestOpportunities.tsx` | Added "OPPORTUNITIES" watermark |
| `src/app/page.tsx` | Added TestimonialsVariantSwitcher dynamic import |

### Partner Logo Configuration
| Partner | Logo Type | darkModeInvert | Notes |
|---------|-----------|----------------|-------|
| AVBOB | PNG | `true` | Inverts to white in dark mode (shows as white rectangle) |
| bolttech | SVG | `true` | Dark purple text inverts cleanly to white |
| TFG | SVG | `false` | Has purple background, no inversion needed |

### Logo Dark Mode Implementation
```tsx
// In PartnerShowcase.tsx
<Image
  src={currentPartner.logo}
  className={`... ${
    currentPartner.darkModeInvert
      ? "dark:brightness-0 dark:invert"
      : ""
  }`}
/>
```

### Watermark Implementation
Both sections now have large text watermarks:
- **PartnerShowcase:** "PARTNERS" - `text-white/[0.025]` light, `text-white/[0.015]` dark
- **LatestOpportunities:** "OPPORTUNITIES" - `text-white/[0.03]` light, `text-white/[0.02]` dark

### Outstanding Issues (Session 102)
1. **AVBOB logo in dark mode** - PNG format shows as solid white rectangle when inverted
   - Consider obtaining official SVG from AVBOB
   - Alternative: Create custom dark mode version of logo

2. **Watermark visibility in dark mode** - May need opacity adjustment
   - LatestOpportunities watermark could be too faint
   - Test and potentially increase to `text-white/[0.04]` or higher

3. **Additional SVG logos needed** - For better dark mode manipulation
   - AVBOB: Try [SeekLogo](https://seeklogo.com/vector-logo/14290/avbob)
   - 1Life (if reinstating): Try [Brandfetch](https://brandfetch.com/1life.co.za)

### Testimonial Variants Summary
| Variant | Style | Key Features |
|---------|-------|--------------|
| BoldStatement | Wise-inspired | Large stacked headline, floating card with photo, maroon background |
| SplitScreen | Dramatic 50/50 | Full-height photo left, large quote right, elegant serif typography |
| CardStack | Parallax depth | Layered cards with rotation, gradient background, arrow navigation |
| Minimal | Typography-focused | Giant quotation marks, centred layout, maximum whitespace, fraction counter |

### Design Decisions Pending
1. **Home page testimonials** - 4 variants created, awaiting selection
2. **Careers page testimonials** - 2 variants (Carousel + Featured), awaiting selection
3. **About page timeline** - 2 variants (Original + Alternating), awaiting selection

---

## SESSION 100 (13 Jan 2026) - Home Page Refactoring & Testimonials

### Focus
Major session covering: Home page section refactoring (OurImpact → PartnerShowcase, LatestNews → LatestOpportunities), Partners page CaseStudies removal, and Careers page testimonial variants creation.

### Completed Tasks
| Task | Status |
|------|--------|
| Convert OurImpact to PartnerShowcase | Complete |
| Create partnerShowcase.ts data file | Complete |
| Convert LatestNews to LatestOpportunities | Complete |
| Create opportunities.ts data file | Complete |
| Add micro-interactions to opportunity cards | Complete |
| Remove "View All Opportunities" link | Complete |
| Comment out CaseStudies from Partners page | Complete |
| Copy 6 staff photos to public/images/staff/ | Complete |
| Create employeeTestimonials.ts data file | Complete |
| Create 4 testimonial variants | Complete |
| Narrow to 2 variants (Carousel + Featured) | Complete |
| Create TestimonialsVariantSwitcher | Complete |
| Delete old components (OurImpact, LatestNews) | Complete |
| Delete old data files (impact.ts, news.ts) | Complete |
| Build verification | Complete |

### Files Created
| File | Description |
|------|-------------|
| `src/data/partnerShowcase.ts` | Partner showcase data (AVBOB, 1Life, TFG) with logos, stats, links |
| `src/data/opportunities.ts` | Opportunities data (Careers, Partners, Corporate) with icons, CTAs |
| `src/data/employeeTestimonials.ts` | 6 employee testimonials with quotes, roles, tenure, locations |
| `src/components/PartnerShowcase.tsx` | Carousel featuring actual partners with logos and stats |
| `src/components/LatestOpportunities.tsx` | Grid of opportunity cards with micro-interactions |
| `src/components/careers/testimonial-variants/TestimonialsCarousel.tsx` | Cinematic slider with dramatic quotes |
| `src/components/careers/testimonial-variants/TestimonialsFeatured.tsx` | Interactive spotlight with clickable thumbnails |
| `src/components/careers/testimonial-variants/TestimonialsVariantSwitcher.tsx` | Sticky switcher bar for A/B comparison |
| `src/components/careers/testimonial-variants/index.ts` | Barrel exports for testimonial variants |

### Files Modified
| File | Change |
|------|--------|
| `src/app/page.tsx` | Updated imports: OurImpact → PartnerShowcase, LatestNews → LatestOpportunities |
| `src/components/index.ts` | Updated exports for new components |
| `src/app/partners/page.tsx` | Commented out CaseStudies import and component |
| `src/app/careers/page.tsx` | Added TestimonialsVariantSwitcher after WhyJoinUs |

### Files Deleted
| File | Reason |
|------|--------|
| `src/components/OurImpact.tsx` | Replaced by PartnerShowcase |
| `src/components/LatestNews.tsx` | Replaced by LatestOpportunities |
| `src/data/impact.ts` | Replaced by partnerShowcase.ts |
| `src/data/news.ts` | Replaced by opportunities.ts |
| `src/components/careers/testimonial-variants/TestimonialsCards.tsx` | User narrowed to 2 variants |
| `src/components/careers/testimonial-variants/TestimonialsMarquee.tsx` | User narrowed to 2 variants |

### Staff Photos Added
| Image | Employee |
|-------|----------|
| `public/images/staff/khayakazi.jpg` | Khayakazi Matomela |
| `public/images/staff/khwezi_2n.jpg` | Khwezi Ndaba |
| `public/images/staff/mercutio_2.jpg` | Mercutio van der Berg |
| `public/images/staff/mvelo.jpg` | Mvelo Dlamini |
| `public/images/staff/selona.jpg` | Selona Mathebula |
| `public/images/staff/thami.jpg` | Thami Zulu |

### New Components Details

**PartnerShowcase (replacing OurImpact)**
- Carousel featuring AVBOB, 1Life, TFG with actual partner logos
- Stats display: "10K+ Policies facilitated", "48hrs Average claims", "100+ Retail locations"
- Auto-advance with keyboard navigation (ArrowLeft/ArrowRight)
- Maroon background with geometric patterns
- All existing carousel mechanics preserved

**LatestOpportunities (replacing LatestNews)**
- 3-card grid: Careers, Partner With Us, Corporate Solutions
- Micro-interactions: hover lift (y: -8), scale (1.02), enhanced shadow
- Category icons and highlight badges ("Hiring Now")
- Red angled background with clip-path preserved
- Removed "View All Opportunities" link per user request

**Testimonial Variants (2 remaining)**
| Variant | Style | Features |
|---------|-------|----------|
| Cinematic Carousel | Large-scale slider | Dramatic quotes, full-bleed photography, auto-advance, keyboard nav |
| Featured Spotlight | Interactive grid | Clickable employee thumbnails, large featured card, grayscale-to-colour effect |

### Stakeholder Notes
- **CaseStudies removed from Partners page** - Add to stakeholder meeting agenda for discussion
- If approved, uncomment in `src/app/partners/page.tsx` (lines ~23-24)

---

## SESSION 99 (12 Jan 2026) - Careers Cleanup & Timeline Variants

### Focus
Major session covering: Session 98 commit, careers page animation simplification, container width fixes, Header/Footer oversight fix, gallery removal for reimplementation, and timeline variant creation.

### Completed Tasks
| Task | Status |
|------|--------|
| Commit Session 98 gallery consolidation | Complete |
| Simplify ApplicationForm.tsx animations (minimal motion) | Complete |
| Fix container width on individual career pages | Complete |
| Add missing Header/Footer to careers/[slug]/page.tsx | Complete |
| Remove galleries from About page (preserve files) | Complete |
| Remove gallery from Careers page (preserve files) | Complete |
| Create 3 timeline variants (Horizontal, Alternating, Minimal) | Complete |
| Narrow down to Original + Alternating only | Complete |
| Create TimelineVariantSwitcher for comparison | Complete |
| Build verification | Complete |

### Files Modified
| File | Change |
|------|--------|
| `src/components/careers/ApplicationForm.tsx` | Removed decorative animations, simplified to minimal motion |
| `src/app/careers/[slug]/page.tsx` | Added Header/Footer, removed redundant max-w-4xl wrapper |
| `src/app/about/page.tsx` | Galleries commented out, timeline variants with switcher added |
| `src/app/careers/page.tsx` | Gallery commented out (preserved for reimplementation) |

### Files Created
| File | Description |
|------|-------------|
| `src/components/about/timeline-variants/TimelineOriginal.tsx` | Vertical layout with icon boxes, connector lines, hover effects |
| `src/components/about/timeline-variants/TimelineAlternating.tsx` | Classic zigzag layout with center spine |
| `src/components/about/timeline-variants/TimelineVariantSwitcher.tsx` | Sticky switcher bar to toggle between variants |
| `src/components/about/timeline-variants/index.ts` | Barrel exports for timeline variants |

### Files Deleted
| File | Reason |
|------|--------|
| `src/components/about/timeline-variants/TimelineHorizontal.tsx` | User narrowed selection to 2 variants |
| `src/components/about/timeline-variants/TimelineMinimal.tsx` | User narrowed selection to 2 variants |

### Key Fixes Applied

**1. Container Width Issue**
- Individual career pages had form looking "squashed"
- Removed redundant `max-w-4xl` wrapper in careers/[slug]/page.tsx
- ApplicationForm now uses full `max-w-[1400px]` container

**2. Missing Header/Footer (Oversight)**
- User noticed career detail pages had no navigation
- Each page imports Header/Footer individually (not in global layout)
- Added proper Header and Footer components

**3. Galleries Temporarily Removed**
- GalleryInstagram and GalleryFloating commented out from About page
- GalleryOverflowSlider commented out from Careers page
- Component files preserved for future reimplementation
- User wants to rethink gallery purpose and design

### Timeline Variants Created
| Variant | Style | Features |
|---------|-------|----------|
| Original | Vertical with connectors | Icon boxes, connector lines, large number watermarks, hover lift |
| Alternating | Zigzag with center spine | Cards alternate left-right, vertical timeline spine, responsive |

### Design Principle Applied
**Minimal Motion**: Remove decorative/entrance animations, keep only essential interactive feedback. Forms should feel calm and professional, not visually busy.

### Animation Changes (ApplicationForm.tsx)
| Element | Before | After |
|---------|--------|-------|
| Left column | `motion.div` with x: -40 slide-in | Regular `<div>` |
| Right column | `motion.div` with x: 40 slide-in | Regular `<div>` |
| "Actively Hiring" badge | Animated ping + scale animation | Static green dot |
| Form wrapper | AnimatePresence + motion.form | Simple conditional render |
| Submit button | ✓ Kept hover/tap effects | ✓ Kept (essential UX) |
| Submit spinner | ✓ Kept | ✓ Kept (essential UX) |
| Error message | ✓ Kept appearance animation | ✓ Kept (essential UX) |

---

## SESSION 98 (12 Jan 2026) - Gallery Consolidation

### Focus
Finalised gallery variant selection. Chose Clean Slider (GalleryOverflowSlider.tsx) as the final gallery component. Removed other variants and gallery switcher.

### Completed Tasks
| Task | Status |
|------|--------|
| Test all 3 gallery variants | Complete |
| Select Clean Slider as final choice | Complete |
| Delete CultureGallery.tsx (old grid) | Complete |
| Delete GalleryMarquee.tsx | Complete |
| Delete gallery-variants/index.ts | Complete |
| Update careers page to use single gallery | Complete |
| Build verification | Complete |

### Files Deleted
| File | Reason |
|------|--------|
| `src/components/careers/CultureGallery.tsx` | Replaced by Clean Slider |
| `src/components/careers/gallery-variants/GalleryMarquee.tsx` | Not selected |
| `src/components/careers/gallery-variants/index.ts` | No longer needed |

### Final Gallery Choice
**GalleryOverflowSlider.tsx** (Clean Slider)
- Arrow navigation with prev/next buttons
- Drag-to-scroll support
- 7 team photos with captions on hover
- Gradient edge fades
- Responsive sizing (288px → 320px → 384px)

---

## SESSION 97 (11 Jan 2026) - Floating Images Gallery Test

### Focus
Updated GalleryFloating component on About page with square images matching reference design. Created new CareersHeroFloating component for testing floating images hero concept on Careers page while maintaining existing hero text content.

### Completed Tasks
| Task | Status |
|------|--------|
| Update GalleryFloating with square images (~250px) | Complete |
| Reposition images for asymmetric scatter pattern | Complete |
| Remove image rotations for clean modern look | Complete |
| Create CareersHeroFloating.tsx test component | Complete |
| Integrate hero toggle in careers page | Complete |
| Build verification | Complete |

### Files Modified
| File | Change |
|------|--------|
| `src/components/about/GalleryFloating.tsx` | Square images, new positions, removed rotations, updated hover effect |
| `src/app/careers/page.tsx` | Added CareersHeroFloating import and USE_FLOATING_HERO toggle |

### Files Created
| File | Description |
|------|-------------|
| `src/components/careers/CareersHeroFloating.tsx` | Test variant combining floating square images with careers hero text |

### GalleryFloating Changes
- **Image sizes:** Changed from rectangular to square (`w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56`)
- **Positions:** Asymmetric scatter matching reference design
- **Rotations:** All set to 0 for clean modern aesthetic
- **Hover effect:** Changed from scale+rotate-reset to scale+lift (`scale: 1.05, y: -8`)

### CareersHeroFloating Features
- 6 floating square images positioned around central text
- Middle images hidden on mobile (`hidden md:block`) to prevent text overlap
- Same prop interface as CareersHero for easy swapping
- Preserves all original hero animations and functionality
- Clean slate-50/slate-950 background with subtle dot pattern

### Testing Toggle
In `src/app/careers/page.tsx`:
```typescript
const USE_FLOATING_HERO = true;  // Set to false to revert
```

### Visual Testing Required
- [ ] About page: Verify square images display correctly
- [ ] Careers page: Test floating hero layout
- [ ] Mobile responsive: Check image hiding on small screens
- [ ] Dark mode: Verify both components
- [ ] Cross-browser: Chrome, Firefox, Edge

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

### Deferred from Session 103
| Task | Reason | Priority |
|------|--------|----------|
| Delete unused variant components | Cleanup task, can be done anytime | Session 104 |
| Remove home testimonials switcher | User wants Bold + Minimal toggle for now | When final decision made |

### Deferred from Session 99/100
| Task | Reason | Priority |
|------|--------|----------|
| Gallery reimplementation (About page) | Temporarily removed for fresh design approach | Session 104+ |
| Gallery reimplementation (Careers page) | Temporarily removed for fresh design approach | Session 104+ |
| About page tagline workshop | User wants to workshop "Building a nation..." wording | Session 104+ |
| CaseStudies reinstatement | Awaiting stakeholder meeting decision | Session 104+ |
| JobDetailContent scroll animation consolidation | Optional refinement, not essential | When convenient |

### Completed in Session 103 (Previously Deferred)
| Task | Resolution |
|------|------------|
| Partner showcase images | ✅ Integrated 4 images from resources folder |
| Home page testimonial variant selection | ✅ Narrowed to Bold + Minimal |
| Careers page testimonial variant selection | ✅ Selected Cinematic Carousel |
| Timeline variant decision | ✅ Selected Original |
| Watermark visibility review | ✅ Kept subtle (documented in CLAUDE.md) |

### Deferred to Future Sessions
| Task | Reason | Estimated Session |
|------|--------|-------------------|
| Update email logo URL to production domain | Production domain not yet configured | When domain is live |
| Remove monitoring emails from email.ts | Testing only | After email testing complete |
| Remove Development Banner | Awaiting stakeholder approval | S102+ |
| WhatsApp floating widget | Enhancement, not critical | S102+ |
| WhatsApp Business API | Requires API setup and business verification | S102+ |

### Not Started (Blocked)
| Task | Blocker |
|------|---------|
| Production deployment | Awaiting stakeholder sign-off |
| Production domain setup | DNS/domain configuration needed |
| Real policy data integration | Requires backend API |
| User authentication | Requires identity provider setup |
| Calculator validation | Awaiting product team confirmation (see S92 questions) |

---

## NEXT SESSION PLAN (Session 100)

### Recommended Focus: Design Decisions & Visual Polish
Session 100 should focus on finalising design decisions (timeline, galleries, tagline) and visual testing of all Session 99 changes.

### Priority 1: Timeline Variant Decision
- [ ] View both variants in browser at `/about`
- [ ] Toggle between Original and Alternating using switcher
- [ ] Choose preferred variant
- [ ] Remove TimelineVariantSwitcher after decision
- [ ] Optional: Enhance chosen variant if desired

### Priority 2: Gallery Reimplementation Strategy
- [ ] Review purpose of galleries on each page
- [ ] Decide on About page gallery approach (or remove entirely)
- [ ] Decide on Careers page gallery approach (or remove entirely)
- [ ] If keeping galleries, design fresh approach:
  - Consider: lightbox, filmstrip, masonry, or simple grid
  - Ensure images serve a purpose (team culture, office environment)
  - Mobile-first responsive design

### Priority 3: Tagline Workshop
- [ ] Current: "Building a nation where everyone is protected"
- [ ] Goal: Wording that works for B2C and B2B without seeming grandiose
- [ ] Consider alternatives:
  - "Your trusted insurance partner since 2013"
  - "Protection that grows with you"
  - "Insurance made personal"

### Priority 4: Visual Testing
- [ ] Test individual career pages (`/careers/[slug]`) in browser
- [ ] Verify Header/Footer displays correctly
- [ ] Check ApplicationForm container width is correct
- [ ] Test minimal motion animations feel professional
- [ ] Mobile responsive testing at 375px, 768px, 1024px
- [ ] Dark mode verification

### Priority 5: Accessibility & Cross-Browser
- [ ] WCAG 2.1 AA colour contrast verification
- [ ] Keyboard navigation testing
- [ ] Firefox/Edge/Safari compatibility
- [ ] Focus states visible and clear

### Reference: Claude Web Development Playbook
Comprehensive workflow documentation created in S93:
`docs/CLAUDE_WEB_DEV_PLAYBOOK.md`
- MCP setup (Chrome DevTools, Context7, Playwright)
- Custom slash commands
- Design inspiration workflow
- Testing procedures

---

## RECOMMENDATIONS (Session 101)

### Session 101 Achievements
1. **4 Home Page Testimonial Variants Created** - Ready for stakeholder review
   - BoldStatement: Wise-inspired with large stacked typography
   - SplitScreen: Dramatic 50/50 layout with serif typography
   - CardStack: Parallax depth with layered rotating cards
   - Minimal: Typography-focused elegance with maximum whitespace

2. **Partner Logo Dark Mode Fixed** - Conditional inversion system
   - Added `darkModeInvert` boolean to `ShowcasePartner` interface
   - TFG SVG (purple background) doesn't need inversion
   - bolttech SVG inverts cleanly to white
   - AVBOB PNG inverts to solid white (needs SVG replacement)

3. **bolttech Replaces 1Life** - Better SVG support
   - Dark purple text with teal accent
   - Inverts cleanly in dark mode
   - Professional insurtech partnership

4. **Section Watermarks Added** - Decorative background text
   - PartnerShowcase: "PARTNERS" watermark
   - LatestOpportunities: "OPPORTUNITIES" watermark

### Recommendations for Session 102

**1. Priority: Fix AVBOB Logo in Dark Mode**
The AVBOB PNG logo appears as a solid white rectangle when inverted. Options:
- **Best:** Obtain official SVG from AVBOB brand assets or [SeekLogo](https://seeklogo.com/vector-logo/14290/avbob)
- **Alternative:** Create a white version of the logo specifically for dark mode
- **Fallback:** Use a placeholder or text-based logo in dark mode

**2. Watermark Visibility Tuning**
Current watermark opacity may be too subtle in dark mode:
```tsx
// Current (may be too faint)
text-white/[0.02]  // dark mode

// Suggested increase
text-white/[0.04]  // more visible
```
Test both PartnerShowcase and LatestOpportunities sections visually.

**3. Testimonial Variant Selection**
With 4 home page variants and 2 careers page variants now complete:
- Schedule stakeholder review session
- View variants side-by-side using switcher
- Consider A/B testing if decision is difficult
- Remove switcher components after final selection

**4. Consider Additional SVG Logos**
For future-proofing dark mode support:
- Check if partner brand guidelines allow SVG usage
- SVG logos can be styled with CSS for any background
- Consider creating a `logoLight` and `logoDark` property if needed

### Technical Notes for Session 102

**Testimonial Variants Location:**
```
src/components/testimonials/
├── TestimonialsBoldStatement.tsx   # Wise-inspired overlay
├── TestimonialsSplitScreen.tsx     # 50/50 dramatic split
├── TestimonialsCardStack.tsx       # Parallax depth cards
├── TestimonialsMinimal.tsx         # Typography elegance
├── TestimonialsVariantSwitcher.tsx # Toggle for comparison
└── index.ts                        # Barrel exports
```

**Partner Logo Configuration:**
```typescript
// src/data/partnerShowcase.ts
{
  id: "avbob",
  logo: "/images/partners/avbob.png",
  darkModeInvert: true,  // PNG inverts to white
},
{
  id: "bolttech",
  logo: "/images/partners/bolttech.svg",
  darkModeInvert: true,  // SVG inverts cleanly
},
{
  id: "tfg",
  logo: "/images/partners/tfg.svg",
  darkModeInvert: false, // Has purple background
}
```

**Watermark Configuration:**
```typescript
// PartnerShowcase.tsx (line 144)
className="... text-white/[0.025] dark:text-white/[0.015] ..."

// LatestOpportunities.tsx (line 197)
className="... text-white/[0.03] dark:text-white/[0.02] ..."
```

---

## RECOMMENDATIONS (Session 99)

### Session 99 Achievements
1. **Session 98 Committed** - Gallery consolidation changes finalised
   - Clean Slider (GalleryOverflowSlider) chosen as final gallery
   - Removed CultureGallery.tsx, GalleryMarquee.tsx, gallery-variants/index.ts

2. **Careers Page Animations Simplified** - Minimal motion approach
   - Removed decorative entrance animations from ApplicationForm
   - Kept essential UX feedback (spinner, errors, button states)
   - Professional, calm user experience

3. **Container Width Fixed** - Individual career pages
   - Removed redundant max-w-4xl wrapper
   - ApplicationForm now displays at full max-w-[1400px] width

4. **Header/Footer Oversight Fixed** - Individual career pages
   - Added missing Header and Footer components
   - Navigation now consistent across all pages

5. **Galleries Temporarily Removed** - For reimplementation
   - About page: GalleryInstagram and GalleryFloating commented out
   - Careers page: GalleryOverflowSlider commented out
   - Component files preserved for future use

6. **Timeline Variants Created** - For About page
   - Created 3 variants (Horizontal, Alternating, Minimal)
   - Narrowed to 2 (Original + Alternating) per user request
   - TimelineVariantSwitcher allows easy comparison

### Technical Notes for Session 100

**Timeline Variants Location:**
```
src/components/about/timeline-variants/
├── TimelineOriginal.tsx      # Vertical with icon boxes
├── TimelineAlternating.tsx   # Zigzag with center spine
├── TimelineVariantSwitcher.tsx
└── index.ts
```

**Galleries (Commented Out, Not Deleted):**
- About page: Lines ~18-20 in `src/app/about/page.tsx`
- Careers page: Line ~12 in `src/app/careers/page.tsx`
- Component files still exist in their directories

**About Page Timeline Toggle:**
```typescript
// In src/app/about/page.tsx
const TIMELINE_VARIANT = "switcher"; // Change to "original" or "alternating" after decision
```

### Design Recommendations

1. **Timeline Decision:**
   - Original: More visual interest, icon boxes add personality
   - Alternating: Cleaner, classic corporate feel
   - Consider the About page's overall visual weight

2. **Gallery Reimplementation:**
   - If galleries return, ensure they have clear purpose
   - Team culture photos should feel authentic, not stock
   - Consider: Do galleries add value, or just visual noise?

3. **Tagline Alternatives:**
   - Current is aspirational but may seem overreaching
   - Consider more grounded options that emphasise trust and local service
   - Must work for both B2C individuals and B2B corporate clients

---

## RECOMMENDATIONS (Session 96)

### Session 96 Achievements
1. **Forms & Email Audit Complete** - All 7 forms tested and working
   - Contact (message + callback), Partner Inquiry, Corporate Inquiry
   - Careers Application (with CV upload), Quote Request, Calculator Email

2. **Email Routing Configured** - Per stakeholder meeting
   - B2B emails → clients@metrosureconsult.co.za
   - General emails → info@metrosuregroup.co.za
   - Careers emails → careers@metrosuregroup.co.za
   - All emails prefixed with [Website Form]

3. **Security Improvements Applied**
   - CV filename sanitisation prevents path traversal
   - Email validation regex prevents invalid addresses
   - Confirmation email failures now visible to users

4. **Monitoring Setup** - Testing emails added
   - makhunga@zoocora.co.za
   - makhunga@metrosuregroup.co.za
   - Remove after production verification complete

### Immediate Actions Required
| Action | Owner | Notes |
|--------|-------|-------|
| Verify email delivery | Stakeholder | Check all mailboxes receive test emails |
| Configure production domain | DevOps | www.metrosuregroup.co.za returns 404 |
| Update logo URL | Dev | When production domain is live |
| Remove monitoring emails | Dev | After email testing complete |

### Technical Notes for Next Session
- Email logo using Vercel preview URL (temporary)
- Production URL in `src/lib/email.ts:381` needs updating
- Monitoring emails in `src/lib/email.ts:34` need removal after testing

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
| Careers page animations | ✅ Resolved | S99 - Minimal motion approach applied |
| Individual career page Header/Footer | ✅ Resolved | S99 - Oversight fixed |
| Individual career page container width | ✅ Resolved | S99 - Removed redundant max-w-4xl |
| Gallery reimplementation | ⏳ Pending | S99 - Temporarily removed for fresh design |
| Timeline variant decision | ⏳ Pending | S99 - Switcher created, awaiting decision |
| Testimonial variant decision | ⏳ Pending | S100 - Switcher created, awaiting decision |
| CaseStudies reinstatement | ⏳ Pending | S100 - Commented out, awaiting stakeholder meeting |
| About page tagline | ⏳ Pending | S99 - Workshop for B2C/B2B wording |
| Home page OurImpact → PartnerShowcase | ✅ Resolved | S100 - Partner carousel with logos and stats |
| Home page LatestNews → LatestOpportunities | ✅ Resolved | S100 - Opportunity cards with micro-interactions |
| Home page testimonial variants | ✅ Resolved | S103 - Narrowed to Bold + Minimal (2 variants) |
| Careers page testimonial variant | ✅ Resolved | S103 - Selected Cinematic Carousel |
| Timeline variant decision | ✅ Resolved | S103 - Selected Original |
| Partner logo dark mode handling | ✅ Resolved | S101 - darkModeInvert property, conditional CSS |
| bolttech replaces 1Life partner | ✅ Resolved | S101 - SVG logo with proper inversion |
| Section watermarks (Partners, Opportunities) | ✅ Resolved | S101 - Added decorative text watermarks |
| Partner showcase images | ✅ Resolved | S103 - 4 images integrated from resources |
| Style guide documentation | ✅ Resolved | S103 - Card hover, watermarks, z-index in CLAUDE.md |
| AVBOB logo dark mode appearance | ⏳ Pending | S101 - PNG inverts to solid white, need SVG |
| Unused variant components | ⏳ Pending | S103 - Can delete Split Screen, Card Stack, Featured, Alternating |
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

## SESSION HISTORY (75-103)

| Session | Focus |
|---------|-------|
| S103 | Style guide finalisation, partner images integrated, variant selections (Bold+Minimal, Carousel, Original), CLAUDE.md style patterns |
| S102 | Partner logo fixes (Metropolitan SVG, AVBOB quality), AI image prompts for partner slides |
| S101 | Home page testimonial variants (4 styles: BoldStatement, SplitScreen, CardStack, Minimal), partner logo dark mode fixes, bolttech replaces 1Life, watermarks added |
| S100 | Home page refactoring (OurImpact → PartnerShowcase, LatestNews → LatestOpportunities), CaseStudies removal, testimonial variants (Carousel + Featured) |
| S99 | Careers animation simplification (minimal motion), Header/Footer fix, galleries removed for reimplementation, timeline variants (Original + Alternating) |
| S98 | Gallery consolidation - Clean Slider variant selected, removed CultureGallery and GalleryMarquee |
| S97 | Floating images gallery test, CareersHeroFloating component, GalleryFloating with square images |
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

*Document updated: 13 January 2026 (Session 103 - Style Guide Finalisation & Variant Selection)*
