"use client";

import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "max-w-[calc(100vw-2rem)] sm:max-w-md",
  md: "max-w-[calc(100vw-2rem)] sm:max-w-lg",
  lg: "max-w-[calc(100vw-2rem)] sm:max-w-xl md:max-w-2xl",
  xl: "max-w-[calc(100vw-2rem)] sm:max-w-2xl md:max-w-4xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "lg",
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // Handle click outside
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  // Body scroll lock and keyboard listener
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);

      // Focus trap - focus the modal when opened
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Don't render on server
  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            className={`relative w-full ${sizeClasses[size]} my-8 outline-none`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="bg-[rgb(var(--color-surface-card))] rounded-2xl shadow-2xl border border-[rgb(var(--color-border-light))] overflow-hidden">
              {/* Header */}
              {title && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-[rgb(var(--color-border-light))]">
                  <h2 className="text-xl font-bold text-[rgb(var(--color-text-main))]">
                    {title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-[rgb(var(--color-surface))] transition-colors text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-text-main))]"
                    aria-label="Close modal"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              )}

              {/* Close button when no title */}
              {!title && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-[rgb(var(--color-surface))]/80 backdrop-blur-sm hover:bg-[rgb(var(--color-surface))] transition-colors text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-text-main))]"
                  aria-label="Close modal"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              )}

              {/* Content */}
              <div className="p-4 sm:p-6">{children}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
