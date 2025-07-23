"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalPortalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  zIndex?: number;
  blurAmount?: string;
  overlayColor?: string;
  animationVariant?: "scale" | "slide-up" | "slide-down" | "fade";
  isLoading?: boolean;
  loadingText?: string;
}

// Top Layer Management System
class TopLayerManager {
  private static instance: TopLayerManager;
  private layers: Set<string> = new Set();
  private zIndexCounter = 2000; // Start from high base

  static getInstance(): TopLayerManager {
    if (!TopLayerManager.instance) {
      TopLayerManager.instance = new TopLayerManager();
    }
    return TopLayerManager.instance;
  }

  addLayer(id: string): number {
    this.layers.add(id);
    return this.zIndexCounter + this.layers.size;
  }

  removeLayer(id: string): void {
    this.layers.delete(id);
  }

  getTopZIndex(): number {
    return this.zIndexCounter + this.layers.size + 1;
  }

  getCurrentLayers(): string[] {
    return Array.from(this.layers);
  }
}

// Innovation: Divine Loading Component
const DivineLoader: React.FC<{ text?: string }> = ({
  text = "Loading divine experience...",
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-2xl"
  >
    <div className="text-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mx-auto"
      >
        <div className="w-16 h-16 bg-gradient-divine rounded-full flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      </motion.div>
      <motion.p
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-lg font-medium bg-gradient-divine bg-clip-text text-transparent"
      >
        {text}
      </motion.p>
    </div>
  </motion.div>
);

export const ModalPortal: React.FC<ModalPortalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  zIndex,
  blurAmount = "backdrop-blur-md",
  overlayColor = "bg-black/60",
  animationVariant = "scale",
  isLoading = false,
  loadingText,
}) => {
  const [mounted, setMounted] = useState(false);
  const [portalContainer, setPortalContainer] = useState<Element | null>(null);
  const modalId = useRef(`modal-${Math.random().toString(36).substr(2, 9)}`);
  const topLayerManager = TopLayerManager.getInstance();
  const [modalZIndex, setModalZIndex] = useState(zIndex || 2000);

  // Innovation: Create dedicated portal container for modals
  useEffect(() => {
    setMounted(true);

    // Check if modal container exists, create if not
    let container = document.getElementById("modal-portal-root");
    if (!container) {
      container = document.createElement("div");
      container.id = "modal-portal-root";
      container.className = "modal-portal-container";
      document.body.appendChild(container);
    }

    setPortalContainer(container);

    return () => {
      // Cleanup on unmount
      if (container && container.children.length === 0) {
        document.body.removeChild(container);
      }
    };
  }, []);

  // Innovation: Top Layer Z-Index Management
  useEffect(() => {
    if (isOpen) {
      const calculatedZIndex =
        zIndex || topLayerManager.addLayer(modalId.current);
      setModalZIndex(calculatedZIndex);

      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "var(--removed-body-scroll-bar-size)";
    } else {
      topLayerManager.removeLayer(modalId.current);

      // Restore body scroll when modal is closed
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      topLayerManager.removeLayer(modalId.current);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen, zIndex]);

  // Innovation: Enhanced Keyboard Navigation
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    const handleFocusTrap = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const modalElement = document.querySelector(
        `[data-modal-id="${modalId.current}"]`,
      );
      if (!modalElement) return;

      const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleFocusTrap);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleFocusTrap);
    };
  }, [isOpen, closeOnEscape, onClose]);

  // Animation variants for different modal types
  const animationVariants = {
    scale: {
      initial: { opacity: 0, scale: 0.8, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.8, y: 20 },
    },
    "slide-up": {
      initial: { opacity: 0, y: "100%" },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: "100%" },
    },
    "slide-down": {
      initial: { opacity: 0, y: "-100%" },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: "-100%" },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  if (!mounted || !portalContainer) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(
            "fixed inset-0 flex items-center justify-center p-4",
            blurAmount,
            overlayColor,
          )}
          style={{ zIndex: modalZIndex }}
          onClick={closeOnOverlayClick ? onClose : undefined}
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
          data-modal-overlay
        >
          <motion.div
            className={cn(
              "relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden",
              className,
            )}
            onClick={(e) => e.stopPropagation()}
            variants={animationVariants[animationVariant]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            data-modal-id={modalId.current}
          >
            {/* Innovation: Divine Close Button */}
            {showCloseButton && (
              <motion.button
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 group"
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
              </motion.button>
            )}

            {/* Modal Content */}
            <div className="relative">
              {children}

              {/* Innovation: Divine Loading Overlay */}
              <AnimatePresence>
                {isLoading && <DivineLoader text={loadingText} />}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalContainer,
  );
};

// Innovation: Hook for Top Layer Management
export const useTopLayer = () => {
  const topLayerManager = TopLayerManager.getInstance();

  return {
    getCurrentLayers: () => topLayerManager.getCurrentLayers(),
    getTopZIndex: () => topLayerManager.getTopZIndex(),
    layerCount: topLayerManager.getCurrentLayers().length,
  };
};

export default ModalPortal;
