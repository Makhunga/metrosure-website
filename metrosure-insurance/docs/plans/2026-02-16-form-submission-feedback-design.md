# Design: Improved Form Submission Feedback

**Date:** 16 February 2026
**Session:** 152
**Status:** Approved

---

## Problem

When submitting the job application form, the success confirmation (FormSuccess component) replaces the form in-place. On mobile, if the user has scrolled past the form area, they won't see it. On desktop, it's also easy to miss since there's no attention-grabbing interruption like a toast or modal.

## Solution

Add Sonner toast notifications (top-centre) for both success and error states across all 3 career application form components. Combine with a smooth scroll to the FormSuccess component so the user sees both the toast and the animated checkmark screen.

## Changes

### 1. Toast on success (all 3 forms)

Fire `toast.success("Application Received!", { description: "We'll review your application and be in touch soon." })` immediately on successful API response. This appears at the top of the viewport regardless of scroll position.

### 2. Toast on error (all 3 forms)

Fire `toast.error("Submission Failed", { description: errorMessage })` on API/network errors. The existing inline red error box remains within the form for context.

### 3. Smooth scroll to FormSuccess

After the success state is set, use `scrollIntoView({ behavior: "smooth", block: "center" })` on the form container ref so the user sees the animated checkmark screen. Does not apply to ApplicationModal (already an overlay).

### 4. Toaster position

Add `position="top-center"` to the existing Sonner `<Toaster>` component.

## Files to Modify

| File | Change |
|------|--------|
| `src/components/ui/sonner.tsx` or layout rendering Toaster | Add `position="top-center"` |
| `src/components/careers/ApplicationForm.tsx` | Add `toast.success`/`toast.error` + `scrollIntoView` |
| `src/components/careers/ApplicationModal.tsx` | Add `toast.success`/`toast.error` (no scroll) |
| `src/components/careers/JobDetailSimple.tsx` | Add `toast.success`/`toast.error` + `scrollIntoView` |

## What stays the same

- FormSuccess component (animated checkmark) -- untouched
- Inline error styling -- remains as secondary feedback alongside toast
- ApplicationModal -- shows toast but no scroll (already a modal overlay)
- All existing animations and reduced-motion support
