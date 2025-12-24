"use client";

import { motion, Variants } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// METROSURE INSURANCE ICON LIBRARY
// Custom SVG icons with distinctive geometric style
// ═══════════════════════════════════════════════════════════════════════════

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  animated?: boolean;
}

// Animation variants for icons
const iconVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -10
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
};

const pathVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// CAR INSURANCE ICON - Vehicle with protective shield
// ─────────────────────────────────────────────────────────────────────────────
export function CarInsuranceIcon({
  className = "",
  size = 48,
  color = "currentColor",
  animated = false
}: IconProps) {
  const Wrapper = animated ? motion.svg : "svg";
  const wrapperProps = animated ? { variants: iconVariants, initial: "hidden", animate: "visible" } : {};

  return (
    <Wrapper
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      {...wrapperProps}
    >
      {/* Shield background */}
      <path
        d="M32 4L52 12V28C52 42 42 52 32 56C22 52 12 42 12 28V12L32 4Z"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Car body */}
      <path
        d="M22 36H42L44 42H20L22 36Z"
        fill={color}
        fillOpacity="0.2"
      />
      <path
        d="M24 30L26 24H38L40 30H24Z"
        fill={color}
        fillOpacity="0.3"
      />
      <path
        d="M20 36C20 34.8954 20.8954 34 22 34H42C43.1046 34 44 34.8954 44 36V40C44 41.1046 43.1046 42 42 42H22C20.8954 42 20 41.1046 20 40V36Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Windows */}
      <path
        d="M26 28L27.5 24H36.5L38 28H26Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wheels */}
      <circle cx="26" cy="42" r="3" fill={color} />
      <circle cx="38" cy="42" r="3" fill={color} />
      {/* Headlights */}
      <rect x="21" y="36" width="3" height="2" rx="0.5" fill={color} />
      <rect x="40" y="36" width="3" height="2" rx="0.5" fill={color} />
    </Wrapper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME INSURANCE ICON - House with shield/protection
// ─────────────────────────────────────────────────────────────────────────────
export function HomeInsuranceIcon({
  className = "",
  size = 48,
  color = "currentColor",
  animated = false
}: IconProps) {
  const Wrapper = animated ? motion.svg : "svg";
  const wrapperProps = animated ? { variants: iconVariants, initial: "hidden", animate: "visible" } : {};

  return (
    <Wrapper
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      {...wrapperProps}
    >
      {/* Shield background */}
      <path
        d="M32 4L52 12V28C52 42 42 52 32 56C22 52 12 42 12 28V12L32 4Z"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Roof */}
      <path
        d="M32 18L46 30H18L32 18Z"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* House body */}
      <rect
        x="22"
        y="30"
        width="20"
        height="16"
        fill={color}
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Door */}
      <rect
        x="29"
        y="36"
        width="6"
        height="10"
        fill={color}
        fillOpacity="0.3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Window */}
      <rect
        x="35"
        y="34"
        width="4"
        height="4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Chimney */}
      <rect
        x="38"
        y="20"
        width="4"
        height="8"
        fill={color}
        fillOpacity="0.25"
        stroke={color}
        strokeWidth="1.5"
      />
    </Wrapper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LIFE INSURANCE ICON - Heart/Family with protection
// ─────────────────────────────────────────────────────────────────────────────
export function LifeInsuranceIcon({
  className = "",
  size = 48,
  color = "currentColor",
  animated = false
}: IconProps) {
  const Wrapper = animated ? motion.svg : "svg";
  const wrapperProps = animated ? { variants: iconVariants, initial: "hidden", animate: "visible" } : {};

  return (
    <Wrapper
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      {...wrapperProps}
    >
      {/* Shield background */}
      <path
        d="M32 4L52 12V28C52 42 42 52 32 56C22 52 12 42 12 28V12L32 4Z"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Heart */}
      <path
        d="M32 44C32 44 20 34 20 26C20 22 23 19 27 19C29.5 19 31.5 20.5 32 22C32.5 20.5 34.5 19 37 19C41 19 44 22 44 26C44 34 32 44 32 44Z"
        fill={color}
        fillOpacity="0.25"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Heartbeat line */}
      <path
        d="M24 32H28L30 28L32 36L34 30L36 32H40"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Wrapper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BUSINESS INSURANCE ICON - Building with umbrella/protection
// ─────────────────────────────────────────────────────────────────────────────
export function BusinessInsuranceIcon({
  className = "",
  size = 48,
  color = "currentColor",
  animated = false
}: IconProps) {
  const Wrapper = animated ? motion.svg : "svg";
  const wrapperProps = animated ? { variants: iconVariants, initial: "hidden", animate: "visible" } : {};

  return (
    <Wrapper
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      {...wrapperProps}
    >
      {/* Umbrella/protection arc */}
      <path
        d="M12 28C12 18 21 10 32 10C43 10 52 18 52 28"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Umbrella handle */}
      <path
        d="M32 10V48M32 48C32 50 30 52 28 52"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Building left */}
      <rect
        x="18"
        y="32"
        width="12"
        height="18"
        fill={color}
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="2"
      />
      {/* Building right (taller) */}
      <rect
        x="34"
        y="26"
        width="12"
        height="24"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="2"
      />
      {/* Windows left building */}
      <rect x="20" y="36" width="3" height="3" fill={color} fillOpacity="0.4" />
      <rect x="25" y="36" width="3" height="3" fill={color} fillOpacity="0.4" />
      <rect x="20" y="42" width="3" height="3" fill={color} fillOpacity="0.4" />
      <rect x="25" y="42" width="3" height="3" fill={color} fillOpacity="0.4" />
      {/* Windows right building */}
      <rect x="36" y="30" width="3" height="3" fill={color} fillOpacity="0.4" />
      <rect x="41" y="30" width="3" height="3" fill={color} fillOpacity="0.4" />
      <rect x="36" y="36" width="3" height="3" fill={color} fillOpacity="0.4" />
      <rect x="41" y="36" width="3" height="3" fill={color} fillOpacity="0.4" />
      <rect x="36" y="42" width="3" height="3" fill={color} fillOpacity="0.4" />
      <rect x="41" y="42" width="3" height="3" fill={color} fillOpacity="0.4" />
    </Wrapper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FUNERAL COVER ICON - Dignified memorial with care
// ─────────────────────────────────────────────────────────────────────────────
export function FuneralCoverIcon({
  className = "",
  size = 48,
  color = "currentColor",
  animated = false
}: IconProps) {
  const Wrapper = animated ? motion.svg : "svg";
  const wrapperProps = animated ? { variants: iconVariants, initial: "hidden", animate: "visible" } : {};

  return (
    <Wrapper
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      {...wrapperProps}
    >
      {/* Gentle arc/halo */}
      <path
        d="M16 24C16 15.1634 23.1634 8 32 8C40.8366 8 48 15.1634 48 24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
      {/* Candle/memorial flame */}
      <path
        d="M32 16C32 16 36 20 36 24C36 26.2091 34.2091 28 32 28C29.7909 28 28 26.2091 28 24C28 20 32 16 32 16Z"
        fill={color}
        fillOpacity="0.3"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Hands holding/caring */}
      <path
        d="M20 36C20 36 18 38 18 42C18 46 22 50 26 50H38C42 50 46 46 46 42C46 38 44 36 44 36"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 36V42C24 44 26 46 28 46H36C38 46 40 44 40 42V36"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.1"
      />
      {/* Flower/lily */}
      <ellipse
        cx="32"
        cy="40"
        rx="4"
        ry="3"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Ground line */}
      <path
        d="M14 54H50"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Wrapper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RETIREMENT ICON - Growth/future with upward trajectory
// ─────────────────────────────────────────────────────────────────────────────
export function RetirementIcon({
  className = "",
  size = 48,
  color = "currentColor",
  animated = false
}: IconProps) {
  const Wrapper = animated ? motion.svg : "svg";
  const wrapperProps = animated ? { variants: iconVariants, initial: "hidden", animate: "visible" } : {};

  return (
    <Wrapper
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      {...wrapperProps}
    >
      {/* Sun/horizon - representing future */}
      <path
        d="M10 48C10 48 20 32 32 32C44 32 54 48 54 48"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill={color}
        fillOpacity="0.1"
      />
      {/* Growth chart bars */}
      <rect
        x="16"
        y="38"
        width="6"
        height="14"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="1.5"
        rx="1"
      />
      <rect
        x="26"
        y="32"
        width="6"
        height="20"
        fill={color}
        fillOpacity="0.3"
        stroke={color}
        strokeWidth="1.5"
        rx="1"
      />
      <rect
        x="36"
        y="24"
        width="6"
        height="28"
        fill={color}
        fillOpacity="0.4"
        stroke={color}
        strokeWidth="1.5"
        rx="1"
      />
      {/* Arrow pointing up */}
      <path
        d="M46 28L50 16L54 28M50 16V36"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Nest egg */}
      <ellipse
        cx="50"
        cy="44"
        rx="6"
        ry="4"
        fill={color}
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="50" cy="42" r="2.5" fill={color} fillOpacity="0.3" />
    </Wrapper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EMPLOYEE BENEFITS ICON - People with growth/support
// ─────────────────────────────────────────────────────────────────────────────
export function EmployeeBenefitsIcon({
  className = "",
  size = 48,
  color = "currentColor",
  animated = false
}: IconProps) {
  const Wrapper = animated ? motion.svg : "svg";
  const wrapperProps = animated ? { variants: iconVariants, initial: "hidden", animate: "visible" } : {};

  return (
    <Wrapper
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      {...wrapperProps}
    >
      {/* Central person */}
      <circle
        cx="32"
        cy="20"
        r="6"
        fill={color}
        fillOpacity="0.3"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M22 44V38C22 34 26 30 32 30C38 30 42 34 42 38V44"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill={color}
        fillOpacity="0.15"
      />
      {/* Left person (smaller) */}
      <circle
        cx="14"
        cy="28"
        r="4"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M8 48V44C8 41 11 38 14 38C17 38 20 41 20 44V48"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill={color}
        fillOpacity="0.1"
      />
      {/* Right person (smaller) */}
      <circle
        cx="50"
        cy="28"
        r="4"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M44 48V44C44 41 47 38 50 38C53 38 56 41 56 44V48"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill={color}
        fillOpacity="0.1"
      />
      {/* Connection lines */}
      <path
        d="M20 26L26 22M44 26L38 22"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 2"
        strokeOpacity="0.5"
      />
      {/* Star/benefit indicator */}
      <path
        d="M32 8L33.5 11L37 11.5L34.5 14L35 17.5L32 16L29 17.5L29.5 14L27 11.5L30.5 11L32 8Z"
        fill={color}
        fillOpacity="0.4"
        stroke={color}
        strokeWidth="1"
      />
    </Wrapper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RISK ADVISORY ICON - Shield with analytics
// ─────────────────────────────────────────────────────────────────────────────
export function RiskAdvisoryIcon({
  className = "",
  size = 48,
  color = "currentColor",
  animated = false
}: IconProps) {
  const Wrapper = animated ? motion.svg : "svg";
  const wrapperProps = animated ? { variants: iconVariants, initial: "hidden", animate: "visible" } : {};

  return (
    <Wrapper
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      {...wrapperProps}
    >
      {/* Shield */}
      <path
        d="M32 4L52 12V28C52 42 42 52 32 56C22 52 12 42 12 28V12L32 4Z"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Chart/graph inside shield */}
      <path
        d="M20 40L26 32L32 36L38 24L44 28"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Data points */}
      <circle cx="20" cy="40" r="2" fill={color} />
      <circle cx="26" cy="32" r="2" fill={color} />
      <circle cx="32" cy="36" r="2" fill={color} />
      <circle cx="38" cy="24" r="2" fill={color} />
      <circle cx="44" cy="28" r="2" fill={color} />
      {/* Checkmark */}
      <path
        d="M28 18L31 21L37 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Wrapper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHIELD ICON - Generic protection/security
// ─────────────────────────────────────────────────────────────────────────────
export function ShieldIcon({
  className = "",
  size = 48,
  color = "currentColor",
  animated = false
}: IconProps) {
  const Wrapper = animated ? motion.svg : "svg";
  const wrapperProps = animated ? { variants: iconVariants, initial: "hidden", animate: "visible" } : {};

  return (
    <Wrapper
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      {...wrapperProps}
    >
      {/* Shield */}
      <path
        d="M32 4L52 12V28C52 42 42 52 32 56C22 52 12 42 12 28V12L32 4Z"
        fill={color}
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Checkmark */}
      <path
        d="M24 32L30 38L42 26"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Wrapper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// METRO/SPEED ICON - Forward momentum
// ─────────────────────────────────────────────────────────────────────────────
export function MetroIcon({
  className = "",
  size = 48,
  color = "currentColor",
  animated = false
}: IconProps) {
  const Wrapper = animated ? motion.svg : "svg";
  const wrapperProps = animated ? { variants: iconVariants, initial: "hidden", animate: "visible" } : {};

  return (
    <Wrapper
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      {...wrapperProps}
    >
      {/* Train body */}
      <rect
        x="12"
        y="20"
        width="40"
        height="24"
        rx="4"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="2"
      />
      {/* Front window */}
      <rect
        x="38"
        y="24"
        width="10"
        height="8"
        rx="1"
        fill={color}
        fillOpacity="0.3"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Side windows */}
      <rect x="16" y="26" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="26" y="26" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5" />
      {/* Wheels */}
      <circle cx="20" cy="44" r="3" fill={color} />
      <circle cx="32" cy="44" r="3" fill={color} />
      <circle cx="44" cy="44" r="3" fill={color} />
      {/* Track */}
      <path
        d="M8 50H56"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Speed lines */}
      <path
        d="M4 26H10M4 32H8M4 38H10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
    </Wrapper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUPPORT/HELP ICON
// ─────────────────────────────────────────────────────────────────────────────
export function SupportIcon({
  className = "",
  size = 48,
  color = "currentColor",
  animated = false
}: IconProps) {
  const Wrapper = animated ? motion.svg : "svg";
  const wrapperProps = animated ? { variants: iconVariants, initial: "hidden", animate: "visible" } : {};

  return (
    <Wrapper
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      {...wrapperProps}
    >
      {/* Headset band */}
      <path
        d="M16 32C16 23.1634 23.1634 16 32 16C40.8366 16 48 23.1634 48 32"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Left earpiece */}
      <rect
        x="12"
        y="30"
        width="8"
        height="14"
        rx="4"
        fill={color}
        fillOpacity="0.3"
        stroke={color}
        strokeWidth="2"
      />
      {/* Right earpiece */}
      <rect
        x="44"
        y="30"
        width="8"
        height="14"
        rx="4"
        fill={color}
        fillOpacity="0.3"
        stroke={color}
        strokeWidth="2"
      />
      {/* Microphone */}
      <path
        d="M48 44V48C48 50 46 52 44 52H38"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="34" cy="52" r="4" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
    </Wrapper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENT/CLAIMS ICON
// ─────────────────────────────────────────────────────────────────────────────
export function ClaimsIcon({
  className = "",
  size = 48,
  color = "currentColor",
  animated = false
}: IconProps) {
  const Wrapper = animated ? motion.svg : "svg";
  const wrapperProps = animated ? { variants: iconVariants, initial: "hidden", animate: "visible" } : {};

  return (
    <Wrapper
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      {...wrapperProps}
    >
      {/* Document */}
      <path
        d="M18 8H38L46 16V56H18V8Z"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Fold corner */}
      <path
        d="M38 8V16H46"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Lines */}
      <path d="M24 26H40" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M24 34H40" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M24 42H34" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Checkmark badge */}
      <circle
        cx="42"
        cy="46"
        r="10"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M37 46L40 49L47 42"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Wrapper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED ICON WRAPPER - For scroll-triggered animations
// ─────────────────────────────────────────────────────────────────────────────
interface AnimatedIconWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedIconWrapper({
  children,
  className = "",
  delay = 0
}: AnimatedIconWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay
      }}
      whileHover={{
        scale: 1.1,
        rotate: 5,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ICON MAP - For dynamic icon rendering
// ─────────────────────────────────────────────────────────────────────────────
export const InsuranceIconMap = {
  car: CarInsuranceIcon,
  home: HomeInsuranceIcon,
  life: LifeInsuranceIcon,
  business: BusinessInsuranceIcon,
  funeral: FuneralCoverIcon,
  retirement: RetirementIcon,
  employee: EmployeeBenefitsIcon,
  risk: RiskAdvisoryIcon,
  shield: ShieldIcon,
  metro: MetroIcon,
  support: SupportIcon,
  claims: ClaimsIcon,
} as const;

export type InsuranceIconType = keyof typeof InsuranceIconMap;

interface DynamicIconProps extends IconProps {
  name: InsuranceIconType;
}

export function InsuranceIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = InsuranceIconMap[name];
  return <IconComponent {...props} />;
}
