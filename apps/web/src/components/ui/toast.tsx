"use client";

import * as React from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = React.useCallback(
    (toast: Omit<ToastMessage, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { ...toast, id }]);
      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Toast viewport */}
      <div
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-4 sm:p-0"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-xl border bg-card text-card-foreground shadow-elevated animate-in slide-in-from-bottom-3 duration-200",
              toast.type === "success" && "border-emerald-500/40 bg-card",
              toast.type === "error" && "border-destructive/40 bg-card",
              toast.type === "warning" && "border-amber-500/40 bg-card",
              toast.type === "info" && "border-primary/40 bg-card",
            )}
            role="status"
          >
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 shrink-0">
                {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                {toast.type === "error" && <AlertCircle className="w-5 h-5 text-destructive" />}
                {toast.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                {toast.type === "info" && <Info className="w-5 h-5 text-primary" />}
              </div>
              <div className="space-y-0.5">
                <div className="font-heading font-semibold text-sm text-foreground">
                  {toast.title}
                </div>
                {toast.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {toast.description}
                  </p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-muted-foreground hover:text-foreground rounded p-0.5"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
