"use client";

interface InputIconProps {
  icon: string;
  valid?: boolean;
  touched?: boolean;
}

/**
 * Input wrapper with icon and validation state
 * Shows the provided icon by default, or a green checkmark when valid
 * Changes color based on validation state
 */
export function InputIcon({ icon, valid, touched }: InputIconProps) {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
      <span className={`material-symbols-outlined text-lg transition-colors ${
        touched && valid ? "text-green-500" :
        touched && !valid ? "text-red-400" :
        "text-slate-400"
      }`}>
        {touched && valid ? "check_circle" : icon}
      </span>
    </div>
  );
}
