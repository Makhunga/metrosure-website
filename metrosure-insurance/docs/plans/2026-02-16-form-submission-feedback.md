# Form Submission Feedback Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add toast notifications and smooth scroll to career application forms so users always see submission feedback.

**Architecture:** Sonner toast library (already installed and configured) fires top-centre toasts on success/error. For non-modal forms, `scrollIntoView` brings the FormSuccess component into view after state update.

**Tech Stack:** Sonner (toast), React refs, `scrollIntoView` API

---

### Task 1: Set Toaster position to top-centre

**Files:**
- Modify: `src/components/ui/sonner.tsx:17`

**Step 1: Add position prop to Sonner component**

In `src/components/ui/sonner.tsx`, add `position="top-center"` to the `<Sonner>` element:

```tsx
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      icons={{
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build passes with no errors.

**Step 3: Commit**

```bash
git add src/components/ui/sonner.tsx
git commit -m "feat(toast): set Sonner toaster position to top-centre"
```

---

### Task 2: Add toast + scroll to ApplicationForm

**Files:**
- Modify: `src/components/careers/ApplicationForm.tsx`

**Step 1: Add toast import**

At top of file, add:

```typescript
import { toast } from "sonner";
```

**Step 2: Add a ref to the form container for scroll targeting**

The component already has a `<section>` wrapper but no ref on it. Add a ref to the form card `<div>` (the white card at line 329). Add a new ref:

```typescript
const formCardRef = useRef<HTMLDivElement>(null);
```

Then attach it to the form card div (the one with `bg-white dark:bg-slate-800 rounded-2xl`):

```tsx
<div ref={formCardRef} className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-10 shadow-lg dark:shadow-slate-900/30 border border-slate-200 dark:border-slate-700">
```

**Step 3: Add toast.success + scrollIntoView on success**

In `handleSubmit`, after `setIsSubmitted(true)` (line 201), add:

```typescript
      setIsSubmitted(true);
      toast.success("Application Received!", {
        description: "We'll review your application and be in touch soon.",
      });

      // Scroll to success message after brief delay for state update
      setTimeout(() => {
        formCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
```

**Step 4: Add toast.error on error**

In the catch block (line 208), after `setError(...)`, add:

```typescript
      const errorMessage = err instanceof Error ? err.message : "An error occurred. Please try again.";
      setError(errorMessage);
      toast.error("Submission Failed", {
        description: errorMessage,
      });
```

**Step 5: Verify build**

Run: `npm run build`
Expected: Build passes with no errors.

**Step 6: Commit**

```bash
git add src/components/careers/ApplicationForm.tsx
git commit -m "feat(careers): add toast notifications and scroll to ApplicationForm"
```

---

### Task 3: Add toast to ApplicationModal

**Files:**
- Modify: `src/components/careers/ApplicationModal.tsx`

**Step 1: Add toast import**

At top of file, add:

```typescript
import { toast } from "sonner";
```

**Step 2: Add toast.success on success**

In `handleSubmit`, after `setIsSubmitted(true)` (line 213), add:

```typescript
      setIsSubmitted(true);
      toast.success("Application Received!", {
        description: "We'll review your application and be in touch soon.",
      });
```

No scroll needed — this is already a modal overlay.

**Step 3: Add toast.error on error**

In the catch block (line 214), replace the error handling:

```typescript
      const errorMessage = err instanceof Error ? err.message : "An error occurred. Please try again.";
      setError(errorMessage);
      toast.error("Submission Failed", {
        description: errorMessage,
      });
```

**Step 4: Verify build**

Run: `npm run build`
Expected: Build passes with no errors.

**Step 5: Commit**

```bash
git add src/components/careers/ApplicationModal.tsx
git commit -m "feat(careers): add toast notifications to ApplicationModal"
```

---

### Task 4: Add toast + scroll to JobDetailSimple (SimpleApplicationForm)

**Files:**
- Modify: `src/components/careers/JobDetailSimple.tsx`

**Step 1: Add toast import**

At top of file, add:

```typescript
import { toast } from "sonner";
```

**Step 2: Add a ref to the form card for scroll targeting**

Inside `SimpleApplicationForm`, the component already has a `ref` on the outer `<motion.section>`. Add a new ref for the form card div:

```typescript
const formCardRef = useRef<HTMLDivElement>(null);
```

Attach it to the form card div (the `bg-white dark:bg-slate-800 rounded-2xl` div at line 407):

```tsx
<div ref={formCardRef} className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-10 shadow-lg dark:shadow-slate-900/30 border border-slate-200 dark:border-slate-700">
```

**Step 3: Add toast.success + scrollIntoView on success**

In `handleSubmit`, after `setIsSubmitted(true)` (line 361), add:

```typescript
      setIsSubmitted(true);
      toast.success("Application Received!", {
        description: "We'll review your application and be in touch soon.",
      });

      // Scroll to success message after brief delay for state update
      setTimeout(() => {
        formCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
```

**Step 4: Add toast.error on error**

In the catch block (line 366), replace the error handling:

```typescript
      const errorMessage = err instanceof Error ? err.message : "An error occurred. Please try again.";
      setError(errorMessage);
      toast.error("Submission Failed", {
        description: errorMessage,
      });
```

**Step 5: Verify build**

Run: `npm run build`
Expected: Build passes with no errors.

**Step 6: Commit**

```bash
git add src/components/careers/JobDetailSimple.tsx
git commit -m "feat(careers): add toast notifications and scroll to JobDetailSimple"
```

---

### Task 5: Manual verification

**Step 1: Start dev server**

Run: `npm run dev`

**Step 2: Test ApplicationForm on /careers page**

- Navigate to `/careers`
- Scroll to application form
- Submit with valid data
- Verify: toast appears top-centre, page scrolls to success screen

**Step 3: Test JobDetailSimple on a job detail page**

- Navigate to any `/careers/[slug]` page
- Submit the form
- Verify: toast appears top-centre, page scrolls to success screen

**Step 4: Test error case**

- Disconnect network or submit invalid data
- Verify: error toast appears top-centre alongside inline error

**Step 5: Test mobile viewport**

- Resize to 375px width
- Repeat submission test
- Verify: toast is visible and scroll works

**Step 6: Final build check**

Run: `npm run build`
Expected: Build passes with no errors.
