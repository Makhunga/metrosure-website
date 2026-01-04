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

*Last updated: 4 January 2026 (Session 83)*
