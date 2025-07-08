"use client";
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
  onClose?: () => void;
}

export function Toast({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
    warning: "bg-yellow-600 text-white",
    info: "bg-blue-600 text-white",
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transition-all",
        typeStyles[type],
      )}
    >
      {message}
    </div>
  );
}

// Simple toast function for immediate use
export function toast(message: string, type: ToastProps["type"] = "info") {
  // This is a simplified version - in production you'd want a toast manager
  const toastContainer = document.getElementById("toast-container");
  if (toastContainer) {
    const event = new CustomEvent("show-toast", {
      detail: { message, type },
    });
    toastContainer.dispatchEvent(event);
  }
}
