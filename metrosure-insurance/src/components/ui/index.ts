// ═══════════════════════════════════════════════════════════════════════════
// UI COMPONENTS - BARREL EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

// Form components - Standard label pattern (preferred)
export { LabelledInput } from "./LabelledInput";
export type { LabelledInputProps } from "./LabelledInput";

export { LabelledSelect } from "./LabelledSelect";
export type { LabelledSelectProps, SelectOption } from "./LabelledSelect";

export { LabelledTextarea } from "./LabelledTextarea";
export type { LabelledTextareaProps } from "./LabelledTextarea";

export { LabelledDateInput } from "./LabelledDateInput";
export type { LabelledDateInputProps } from "./LabelledDateInput";

// Form components - Floating label pattern (deprecated)
export { FloatingInput } from "./FloatingInput";
export type { FloatingInputProps } from "./FloatingInput";

export { FloatingSelect } from "./FloatingSelect";
export type { FloatingSelectProps } from "./FloatingSelect";

export { FloatingTextarea } from "./FloatingTextarea";
export type { FloatingTextareaProps } from "./FloatingTextarea";

export { FloatingDateInput } from "./FloatingDateInput";
export type { FloatingDateInputProps } from "./FloatingDateInput";

// Form components - Icon pattern (legacy)
export { InputIcon } from "./InputIcon";

// Form feedback
export { InlineError } from "./InlineError";
export { FormSuccess } from "./FormSuccess";

// Layout & decoration
export {
  QuarterCircle,
  Circle,
  Triangle,
  HalfCircle,
  Diamond,
  DotsPattern,
  CornerDecoration,
  FloatingShapes,
} from "./GeometricShapes";
export { Modal } from "./Modal";
export {
  Skeleton,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonForm,
  SkeletonTestimonial,
} from "./Skeleton";
