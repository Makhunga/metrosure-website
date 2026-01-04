/**
 * Metrosure Design System Tokens
 *
 * Centralised design tokens for consistent styling across the application.
 * These values correspond to CSS variables in globals.css and Tailwind classes.
 *
 * Usage:
 *   import { colors, radii, shadows, spacing } from '@/lib/designTokens';
 *
 * Created: Session 83 (January 2026)
 */

// =============================================================================
// BRAND COLOURS
// =============================================================================

/**
 * Brand colour palette
 * Primary: Metrosure Red - Used for CTAs, highlights, primary actions
 * Secondary: Metrosure Maroon - Used for depth, gradients, secondary elements
 * Accent: Metrosure Yellow - Used sparingly for emphasis
 */
export const colors = {
  // Brand colours (hex values)
  brand: {
    primary: "#BF0603",
    primaryHover: "#A50502",
    secondary: "#690025",
    accent: "#F2CC8E",
    accentLight: "#F7F8DC",
    accentDark: "#C8CC60",
  },

  // Primary scale (for backgrounds, borders at various opacities)
  primary: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#BF0603", // Base primary
    600: "#A50502",
    700: "#7F0402",
    800: "#590301",
    900: "#330201",
  },

  // Secondary scale
  secondary: {
    50: "#FDF2F8",
    100: "#FCE7F3",
    200: "#FBCFE8",
    300: "#F9A8D4",
    400: "#F472B6",
    500: "#690025", // Base secondary
    600: "#55001E",
    700: "#410017",
  },

  // Semantic colours for feedback
  semantic: {
    success: "#22C55E",
    successLight: "#DCFCE7",
    warning: "#F59E0B",
    warningLight: "#FEF3C7",
    error: "#EF4444",
    errorLight: "#FEE2E2",
    info: "#3B82F6",
    infoLight: "#DBEAFE",
  },
} as const;

// =============================================================================
// CSS VARIABLE REFERENCES
// =============================================================================

/**
 * CSS variable names for dynamic theming (light/dark mode)
 * Use with: `rgb(var(--color-surface))`
 */
export const cssVars = {
  // Surfaces
  surface: "--color-surface",
  surfaceCard: "--color-surface-card",
  surfaceElevated: "--color-surface-elevated",
  surfaceInset: "--color-surface-inset",

  // Text
  textMain: "--color-text-main",
  textBody: "--color-text-body",
  textMuted: "--color-text-muted",
  textSubtle: "--color-text-subtle",

  // Borders
  borderLight: "--color-border-light",
  borderMedium: "--color-border-medium",
  borderStrong: "--color-border-strong",

  // Brand
  primary: "--color-primary",
  primaryHover: "--color-primary-hover",
  secondary: "--color-secondary",
  accent: "--color-accent",
} as const;

/**
 * Helper to generate rgb() CSS value from variable
 */
export function cssVar(name: keyof typeof cssVars): string {
  return `rgb(var(${cssVars[name]}))`;
}

// =============================================================================
// BORDER RADIUS
// =============================================================================

/**
 * Border radius scale
 * Follows Tailwind naming convention with pixel values
 */
export const radii = {
  none: "0px",
  sm: "4px", // rounded-sm
  DEFAULT: "6px", // rounded
  md: "8px", // rounded-md
  lg: "8px", // rounded-lg - Inputs, small UI elements
  xl: "12px", // rounded-xl - Buttons, small cards
  "2xl": "16px", // rounded-2xl - Feature cards
  "3xl": "24px", // rounded-3xl - Hero containers
  full: "9999px", // rounded-full - Pills, avatars

  // Named semantic values
  input: "8px", // Form inputs
  button: "12px", // Buttons
  card: "16px", // Cards
  cardLarge: "24px", // Large cards, hero sections
  footer: "48px", // Footer top corners (mobile)
  footerLg: "64px", // Footer top corners (desktop)
} as const;

/**
 * Tailwind class mapping for radii
 */
export const radiusClasses = {
  input: "rounded-lg",
  button: "rounded-xl",
  card: "rounded-2xl",
  cardLarge: "rounded-3xl",
  pill: "rounded-full",
  footer: "rounded-t-[48px] md:rounded-t-[64px]",
} as const;

// =============================================================================
// SHADOWS
// =============================================================================

/**
 * Shadow scale for elevation
 */
export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",

  // Brand shadows (with primary colour)
  primarySm: "0 1px 2px 0 rgb(191 6 3 / 0.15)",
  primaryMd: "0 4px 6px -1px rgb(191 6 3 / 0.2)",
  primaryLg: "0 10px 15px -3px rgb(191 6 3 / 0.25)",
  primaryXl: "0 20px 25px -5px rgb(191 6 3 / 0.3)",
} as const;

/**
 * Tailwind class mapping for shadows
 */
export const shadowClasses = {
  card: "shadow-sm",
  cardHover: "shadow-xl",
  button: "shadow-lg shadow-primary/25",
  buttonHover: "shadow-xl shadow-primary/40",
  hero: "shadow-2xl",
} as const;

// =============================================================================
// SPACING
// =============================================================================

/**
 * Spacing scale (in pixels)
 * Follows Tailwind 4px base unit
 */
export const spacing = {
  0: "0px",
  0.5: "2px",
  1: "4px",
  1.5: "6px",
  2: "8px",
  2.5: "10px",
  3: "12px",
  3.5: "14px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  9: "36px",
  10: "40px",
  11: "44px",
  12: "48px",
  14: "56px",
  16: "64px",
  20: "80px",
  24: "96px",
  28: "112px",
  32: "128px",
  36: "144px",
  40: "160px",
  44: "176px",
  48: "192px",
  52: "208px",
  56: "224px",
  60: "240px",
  64: "256px",
  72: "288px",
  80: "320px",
  96: "384px",
} as const;

/**
 * Semantic spacing for common patterns
 */
export const spacingSemantics = {
  // Page padding
  pagePaddingX: "px-4 sm:px-6 lg:px-8",
  pagePaddingXValue: { mobile: "16px", tablet: "24px", desktop: "32px" },

  // Section spacing
  sectionPaddingY: "py-16 md:py-24",
  sectionGap: "gap-8 md:gap-12 lg:gap-16",

  // Container max width
  containerMax: "max-w-[1400px]",
  containerNarrow: "max-w-4xl",
  containerWide: "max-w-7xl",

  // Common patterns
  cardPadding: "p-6 md:p-8",
  inputHeight: "h-12 md:h-14",
  buttonHeight: "h-12 md:h-14",
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================

/**
 * Font family definitions
 */
export const fonts = {
  sans: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
} as const;

/**
 * Font size scale with line heights
 */
export const fontSizes = {
  xs: { size: "12px", lineHeight: "16px" },
  sm: { size: "14px", lineHeight: "20px" },
  base: { size: "16px", lineHeight: "24px" },
  lg: { size: "18px", lineHeight: "28px" },
  xl: { size: "20px", lineHeight: "28px" },
  "2xl": { size: "24px", lineHeight: "32px" },
  "3xl": { size: "30px", lineHeight: "36px" },
  "4xl": { size: "36px", lineHeight: "40px" },
  "5xl": { size: "48px", lineHeight: "1" },
  "6xl": { size: "60px", lineHeight: "1" },
  "7xl": { size: "72px", lineHeight: "1" },
} as const;

/**
 * Font weight scale
 */
export const fontWeights = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
} as const;

// =============================================================================
// BREAKPOINTS
// =============================================================================

/**
 * Responsive breakpoints (min-width)
 */
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/**
 * Media query helpers
 */
export const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  "2xl": `@media (min-width: ${breakpoints["2xl"]})`,
  dark: "@media (prefers-color-scheme: dark)",
} as const;

// =============================================================================
// ANIMATION
// =============================================================================

/**
 * Animation timing functions
 */
export const easings = {
  // Standard easings
  linear: "linear",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",

  // Custom easings for Metrosure
  smooth: [0.22, 1, 0.36, 1] as const, // Used in Framer Motion
  spring: { type: "spring", stiffness: 100, damping: 15 } as const,
  bounce: { type: "spring", stiffness: 400, damping: 10 } as const,
} as const;

/**
 * Animation durations
 */
export const durations = {
  fast: "150ms",
  normal: "300ms",
  slow: "500ms",
  slower: "700ms",

  // Framer Motion durations (in seconds)
  framer: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 0.7,
  },
} as const;

// =============================================================================
// Z-INDEX
// =============================================================================

/**
 * Z-index scale for layering
 */
export const zIndex = {
  behind: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
  max: 9999,
} as const;

// =============================================================================
// COMPONENT PRESETS
// =============================================================================

/**
 * Common component class combinations
 */
export const componentPresets = {
  // Buttons
  buttonPrimary:
    "inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-[rgb(var(--color-primary-hover))] text-white font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all",
  buttonSecondary:
    "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[rgb(var(--color-border-light))] hover:border-primary text-[rgb(var(--color-text-main))] font-bold hover:text-primary transition-all",
  buttonGhost:
    "inline-flex items-center justify-center gap-2 rounded-xl text-[rgb(var(--color-text-body))] hover:text-primary hover:bg-primary/5 transition-all",

  // Cards
  card: "rounded-2xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))]",
  cardHover:
    "rounded-2xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:shadow-lg hover:-translate-y-1 transition-all",
  cardInteractive:
    "rounded-2xl bg-[rgb(var(--color-surface-card))] border border-[rgb(var(--color-border-light))] hover:border-primary/50 hover:shadow-xl transition-all cursor-pointer",

  // Inputs
  input:
    "w-full h-12 md:h-14 px-4 rounded-lg border border-[rgb(var(--color-border-light))] bg-[rgb(var(--color-surface-card))] text-[rgb(var(--color-text-main))] placeholder-[rgb(var(--color-text-muted))] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",

  // Badges
  badge:
    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
  badgePrimary:
    "bg-primary/10 dark:bg-primary/15 border border-primary/20 dark:border-primary/30 text-primary",

  // Container
  container: "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8",
  containerNarrow: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
  containerWide: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
} as const;

// =============================================================================
// EXPORT ALL
// =============================================================================

export const designTokens = {
  colors,
  cssVars,
  radii,
  radiusClasses,
  shadows,
  shadowClasses,
  spacing,
  spacingSemantics,
  fonts,
  fontSizes,
  fontWeights,
  breakpoints,
  mediaQueries,
  easings,
  durations,
  zIndex,
  componentPresets,
} as const;

export default designTokens;
