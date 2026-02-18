# Metrosure Insurance Brokers - Project Instructions

**Stack:** Next.js 16 | React 19 | TypeScript 5 | Tailwind CSS 4 | Framer Motion 12
**Skills:** `frontend-design`, `content-research-writer`

---

## Quick Reference

```bash
npm run dev     # Start dev server (localhost:3000)
npm run build   # Production build (must pass before commit)
```

### Key Directories
```
src/app/          # Pages (App Router) & API routes
src/components/   # UI components (feature-organised)
src/data/         # Centralised data files
src/lib/          # Utilities, validation, email
public/images/    # Static assets
docs/             # Project documentation
```

---

## Code Conventions

### Component Structure

```typescript
"use client";

import { motion, useInView } from "framer-motion";
import { fadeInUp } from "@/components/animations";

// Interface definitions at top
interface ComponentProps {
  title: string;
  items: Item[];
}

// Animation variants as module-level constants
const cardVariants = { ... };

export default function ComponentName({ title, items }: ComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      {/* Content */}
    </motion.section>
  );
}
```

### Animation Patterns

**Use the project animation library** (`src/components/animations.tsx`):
- `diagonalSlide` - Signature entrance (spring physics)
- `fadeInUp`, `fadeInLeft`, `fadeInRight` - Standard reveals
- `revealUp` - Scale + spring for emphasis
- `blurFade` - Premium blur effect
- `staggerContainer` - Parent for staggered children

**Scroll-triggered animations:**
```typescript
const isInView = useInView(ref, { once: true, margin: "-100px" });
```

**AVOID:** `AnimatePresence` with App Router navigation (causes visibility bugs).

### Data Files

```typescript
// src/data/example.ts

// 1. Type definitions
export interface Item {
  id: string;
  title: string;
  description: string;
}

// 2. Data constant
export const items: Item[] = [
  { id: "item-1", title: "Example", description: "..." },
];

// 3. Utility functions
export function getItemById(id: string): Item | undefined {
  return items.find(item => item.id === id);
}

export function getItemsByCategory(category: string): Item[] {
  return items.filter(item => item.category === category);
}
```

### API Routes

```typescript
// src/app/api/example/route.ts
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, rateLimits } from "@/lib/rateLimit";
import { exampleSchema } from "@/lib/validationSchemas";

export async function POST(request: NextRequest) {
  // 1. Rate limit check
  const rateLimitResponse = checkRateLimit(request, rateLimits.example, 'example');
  if (rateLimitResponse) return rateLimitResponse;

  try {
    // 2. Parse and validate
    const rawData = await request.json();
    const parseResult = exampleSchema.safeParse(rawData);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, errors: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    // 3. Process validated data
    const data = parseResult.data;
    // ... business logic

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Validation Schemas

```typescript
// Use Zod with reusable validators
import { z } from "zod";
import { phoneSchema, emailSchema, requiredString } from "@/lib/validationSchemas";

export const myFormSchema = z.object({
  name: requiredString("Name"),
  email: emailSchema,
  phone: phoneSchema,  // SA format: +27, 0, or 10+ digits
  message: z.string().max(2000).optional(),
});

export type MyFormData = z.infer<typeof myFormSchema>;
```

---

## Styling Guidelines

### Design System

| Element | Class |
|---------|-------|
| Inputs, small UI | `rounded-lg` (8px) |
| Buttons, small cards | `rounded-xl` (12px) |
| Feature cards | `rounded-2xl` (16px) |
| Hero containers | `rounded-3xl` (24px) |
| Footer top corners | `rounded-t-[48px] md:rounded-t-[64px]` |

### Shadow System

| Tier | Class | Usage |
|------|-------|-------|
| Subtle | `shadow-sm` | Inputs, badges, navigation |
| Standard | `shadow-lg` | Cards, modals, dropdowns |
| Emphasis | `shadow-xl` | Hover states, featured CTAs |

**Coloured shadows (CTAs):**
- Default: `shadow-primary/25` (25% opacity primary)
- Hover: `shadow-primary/40` (40% opacity, more pronounced)

Example:
```html
<button className="shadow-lg shadow-primary/25 hover:shadow-primary/40">
  Primary CTA
</button>
```

### Icon Sizes (Navigation Arrows)

| Icon | Class | Usage |
|------|-------|-------|
| Arrow (forward/back) | `text-lg` | All navigation arrows in CTAs and links |
| Info/status icons | `text-base` | Informational icons, badges |
| Large feature icons | `text-2xl` | Section headers, stats |

### Form Components

**Standard pattern:** `LabelledInput`, `LabelledSelect`, `LabelledTextarea`, `LabelledDateInput`
- Label above input
- No animation on focus
- Cleaner visual hierarchy

*Note: Floating* components were removed in Session 95.*

### Brand Colours

```css
--color-primary: #BF0603;   /* Red */
--color-secondary: #690025; /* Maroon */
--color-accent: #F2CC8E;    /* Yellow */
```

### Container Pattern

```html
<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
```

### Dark Mode

- Use CSS variables: `rgb(var(--color-surface-card))`
- Warm neutrals preferred over cold blue-slate
- Test both modes before committing

### Card Hover Animation (Session 103)

Standard card hover with pronounced lift effect:
```typescript
whileHover={{
  y: -8,
  scale: 1.02,
  transition: { type: "spring", stiffness: 400, damping: 17 }
}}
```

Shadow escalation on hover:
- Default: `shadow-lg shadow-primary/25`
- Hover: `shadow-xl shadow-primary/40`

### Watermark Pattern (Session 103)

Subtle watermark text for section decoration:

**Opacity values:**
- Light mode: `text-white/[0.03]`
- Dark mode: `text-white/[0.025]`

**Responsive sizing:**
```html
<div className="text-[6rem] md:text-[10rem] lg:text-[14rem] font-black">
  WATERMARK
</div>
```

### Z-Index Scale

| Layer | Z-Index | Usage |
|-------|---------|-------|
| Base content | `z-10` | Sections, cards |
| Sticky bars | `z-40` | Variant switchers, toolbars |
| Modals/overlays | `z-50` | Application modals, dialogs |

### Class Utility

Always use `cn()` for conditional classes:
```typescript
import { cn } from "@/lib/utils";

className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === "primary" && "primary-classes"
)}
```

---

## South African Context

### Phone Validation
- Accepts: `+27`, `0`, or raw digits
- Minimum 10 digits required
- Example: `+27 82 123 4567`, `082 123 4567`

### Provinces (formOptions.ts)
Eastern Cape, Free State, Gauteng, KwaZulu-Natal, Limpopo, Mpumalanga, Northern Cape, North West, Western Cape

### Currency
- Format: `R1,000.00` or `R1 000.00` (formal)
- Always South African Rand (ZAR)

### Date Format
- Use: `DD/MM/YYYY` or `D MMMM YYYY`
- Never: `MM/DD/YYYY`

---

## Feature Toggles

### Currently Disabled
- **Cookie consent** - Re-enable in `src/components/ClientLayout.tsx`
- **Gallery components** - Dev-only, pending production images
- **PageTransition** - Incompatible with App Router (passthrough only)

### Development Banner
Remove before production: `src/components/DevelopmentBanner.tsx`

---

## Email Integration

### Service: Resend

```typescript
import { sendEmail } from "@/lib/email";

await sendEmail({
  to: "recipient@example.com",
  subject: "Email Subject",
  html: buildEmailTemplate(data),
});
```

### Templates
Located in API routes, use HTML tables for Outlook compatibility.

### Rate Limits
| Route | Limit |
|-------|-------|
| `/api/careers-application` | 3/hour |
| `/api/partner-inquiry` | 5/hour |
| `/api/corporate-inquiry` | 5/hour |
| `/api/calculator/email-results` | 10/hour |
| `/api/quote` | 10/hour |
| `/api/contact` | 15/hour |

### Email Routing

Configuration: `src/lib/email.ts` (lines 28-34, 100-109)

| Form | Recipient | CC |
|------|-----------|-----|
| Contact (B2C) | `info@metrosuregroup.co.za` | — |
| Contact (Partner) | `clients@metrosureconsult.co.za` | — |
| Quote (B2C) | `info@metrosuregroup.co.za` | — |
| Quote (Partner) | `clients@metrosureconsult.co.za` | — |
| Partner Inquiry | `clients@metrosureconsult.co.za` | — |
| Corporate Inquiry | `clients@metrosureconsult.co.za` | — |
| Careers Application | `careers@metrosureconsult.co.za` | — |
| Calculator Results | *(user's email only)* | — |

---

## Testing Checklist

Before committing:
- [ ] `npm run build` passes
- [ ] Light mode appearance correct
- [ ] Dark mode appearance correct
- [ ] Mobile responsive (375px, 768px, 1024px)
- [ ] Forms validate correctly
- [ ] No console errors
- [ ] British English spelling

---

## Common Patterns

### Section Headers in Code
```typescript
// ═══════════════════════════════════════════════════════════════════════════
// SECTION NAME
// ═══════════════════════════════════════════════════════════════════════════
```

### Feature Directory Structure
```
src/components/feature/
├── index.ts           # Barrel exports
├── FeatureHero.tsx
├── FeatureForm.tsx
├── FeatureCard.tsx
└── FeatureFAQ.tsx
```

### Index Exports
```typescript
// src/components/feature/index.ts
export { default as FeatureHero } from "./FeatureHero";
export { default as FeatureForm } from "./FeatureForm";
```

---

## Skills Usage

### `frontend-design`
Use for:
- UI component creation and enhancement
- Layout design (grids, responsive)
- Animation implementation
- Visual polish and consistency
- Dark mode refinement

### `content-research-writer`
Use for:
- Web copy and messaging
- Industry research with citations
- Persuasive content creation
- SEO-friendly descriptions
- Document creation (briefs, reports)

---

## Commit Standards

### Message Format
```
Session XX: Brief description of changes

- Bullet point details
- Another change
```

### Pre-commit
1. Run `npm run build`
2. Fix any TypeScript/ESLint errors
3. Test critical user flows
4. Verify dark mode

---

## Known Issues & Workarounds

### AnimatePresence + App Router
**Issue:** Pages invisible on client-side navigation
**Workaround:** PageTransition.tsx is passthrough only - do not wrap with AnimatePresence

### Footer Rounded Corners
**Requirement:** Needs `-mt-8 md:-mt-12` and `z-20` for proper overlap effect

### Image Optimisation
Use `unoptimized` prop for external images or GIFs where Next.js optimisation causes issues.

---

## Performance Notes

- **LCP optimised** (67% faster - Session 73)
- Use `priority` on above-fold images
- Lazy load below-fold components
- Prefer WebP/AVIF for images

---

## Regulatory Compliance

### FSCA/FAIS Requirements
- FSP licence number displayed
- Complaints procedure accessible
- Terms and conditions clear
- Privacy policy compliant with POPIA

### TCF (Treating Customers Fairly)
All customer-facing content must align with TCF principles.

---

---

## Lessons Learned (Sessions 1-82)

### Architecture & Framework

| Lesson | Context | Resolution |
|--------|---------|------------|
| AnimatePresence breaks App Router | S78-79: Pages invisible on navigation | Use `whileInView` instead; PageTransition as passthrough |
| useInView patterns matter | S76-77: Animation inconsistencies | Use `whileInView` on motion elements, not parent containers |
| Data centralisation pays off | S60-62: Repeated content scattered | Create `src/data/` files early; single source of truth |

### Styling & UI

| Lesson | Context | Resolution |
|--------|---------|------------|
| Footer overlap needs negative margin | S78: Rounded corners not visible | Always use `-mt-8 md:-mt-12` + `z-20` |
| Dark mode needs warmth | S80: Cold blue-slate felt clinical | Use warm neutrals; test emotional tone |
| Consistent radii matter | S79: Visual inconsistency | Follow design system strictly |
| Email templates need tables | S72: Outlook rendering broken | Use HTML tables, not flexbox/grid |

### Performance

| Lesson | Context | Resolution |
|--------|---------|------------|
| Hero images block LCP | S73: Slow page loads | Use `priority` prop; optimise images |
| Framer Motion bundles large | S73: Bundle size concerns | Import specific functions, not entire library |

### Content & Copy

| Lesson | Context | Resolution |
|--------|---------|------------|
| British English consistency | S81: Mixed US/UK spelling | Check all copy; use en-GB dictionary |
| Em dashes look wrong | S81: Typography issues | Replace with standard dashes or punctuation |
| Stats need context | S80: Numbers without meaning | Add descriptive labels to statistics |

### Forms & Validation

| Lesson | Context | Resolution |
|--------|---------|------------|
| Rate limiting essential | S60+: Spam concerns | Implement per-route limits with LRU cache |
| SA phone formats vary | S65+: Validation failures | Accept +27, 0, or raw digits; min 10 |
| Zod discriminated unions | S68+: Form type switching | Use `z.discriminatedUnion` for multi-type forms |

### Development Process

| Lesson | Context | Resolution |
|--------|---------|------------|
| SESSION_HANDOVER.md grows fast | S79: 2000+ lines | Prune regularly; keep only recent details |
| Build before commit | S50+: Production failures | Always run `npm run build` before pushing |
| Test both colour modes | S77+: Dark mode regressions | Check light and dark on every change |

### Integration

| Lesson | Context | Resolution |
|--------|---------|------------|
| Tawk.to needs business hours | S74: After-hours confusion | Set Mon-Fri 08:00-17:00 in widget |
| Resend rate limits exist | S72+: Email failures | Handle rate limit responses gracefully |
| Google Maps API key required | S55+: Map not loading | Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` |

### Common Mistakes to Avoid

1. **Don't use AnimatePresence for page transitions** - Fundamentally incompatible with Next.js App Router
2. **Don't forget mobile testing** - Many issues only appear on small screens
3. **Don't hardcode content** - Always use data files for reusable content
4. **Don't skip dark mode** - Users notice immediately
5. **Don't use US spelling** - Project is South African context
6. **Don't commit without building** - TypeScript errors will break Vercel deploy

---

## Efficiency Tips

### For Speed
- Use `frontend-design` skill for UI work (faster iteration)
- Use `content-research-writer` for copy (researched, professional)
- Run parallel Explore agents for large codebase searches
- Check SESSION_HANDOVER.md before diving into code

### For Quality
- Follow existing patterns in similar components
- Use the animation library instead of custom variants
- Validate with Zod schemas (type inference is free)
- Test the build before marking work complete

### For Consistency
- Reference design system for radii, shadows, colours
- Check British English spelling on all new copy
- Use `cn()` utility for all conditional classes
- Follow feature directory structure for new sections

---

---

## Adding a New Job Vacancy

When adding a new job vacancy, **4 files must be updated** to keep the system in sync:

### Files to Update

| File | What to Add |
|------|-------------|
| `src/data/jobs.ts` | Job listing data (full details) |
| `src/data/formOptions.ts` | Position option in `jobPositions` array |
| `src/lib/validationSchemas.ts` | Position value in `validPositions` tuple |
| `src/app/api/careers-application/route.ts` | Position label in `positionLabels` mapping |

### Step 1: Add Job Data (`src/data/jobs.ts`)

Add a new entry to the `jobs` array:

```typescript
{
  id: "unique-id",              // Used for form values (e.g., "sales-agent")
  slug: "url-slug",             // URL path (e.g., "sales-agent")
  title: "Job Title",           // Display title
  department: "Department",     // e.g., "Sales", "Customer Service", "Operations"
  category: "category",         // "sales" | "call-centre" | "admin"
  location: "Location",         // e.g., "Gauteng", "All Provinces"
  type: "Full-time",            // Employment type
  description: "Brief description for listings",
  metaDescription: "SEO meta description (150-160 chars)",
  responsibilities: [
    "Responsibility 1",
    "Responsibility 2",
  ],
  requirements: [
    "Requirement 1",
    "Requirement 2",
  ],
  offers: [
    "Benefit 1",
    "Benefit 2",
  ],
  datePosted: "2026-01-25",     // ISO date format
  validThrough: "2026-07-25",   // 6 months from posting
}
```

### Step 2: Add Form Option (`src/data/formOptions.ts`)

Add to `jobPositions` array:

```typescript
{ value: "unique-id", label: "Job Title" },
```

### Step 3: Add Validation (`src/lib/validationSchemas.ts`)

Add the position ID to `validPositions` tuple:

```typescript
const validPositions = [
  "sales-consultant",
  "unique-id",  // Add new position
  "other",
] as const;
```

### Step 4: Add Email Label (`src/app/api/careers-application/route.ts`)

Add to `positionLabels` mapping:

```typescript
const positionLabels: Record<string, string> = {
  "unique-id": "Job Title",
  // ...
};
```

### Categories

| Category | Label | Department Examples |
|----------|-------|---------------------|
| `sales` | Sales | Sales, Marketing |
| `call-centre` | Call Centre | Customer Service |
| `admin` | Administration | Operations, HR |

### Auto-Generated Features

Once added, the job automatically gets:
- Individual job page at `/careers/[slug]`
- SEO metadata and JSON-LD schema
- Salary estimation display
- Application form pre-filled with position

### Verification Checklist

- [ ] Job appears on `/careers` listing page
- [ ] Job detail page loads at `/careers/[slug]`
- [ ] Position appears in application form dropdown
- [ ] Form validates the new position
- [ ] Email shows correct position label
- [ ] `npm run build` passes

---

*Last updated: 25 January 2026 (Session 138)*
