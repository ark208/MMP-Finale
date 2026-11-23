"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (val: string) => void;
  onComplete?: (val: string) => void;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export function OTPInput({
  length = 6,
  value = "",
  onChange,
  onComplete,
  disabled = false,
  error = false,
  autoFocus = false,
  className,
}: OTPInputProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(() => {
    const arr = value.split("").slice(0, length);
    while (arr.length < length) arr.push("");
    return arr;
  });

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    const arr = value.split("").slice(0, length);
    while (arr.length < length) arr.push("");
    setInternalValue(arr);
  }, [value, length]);

  React.useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const updateDigit = (index: number, digit: string) => {
    const updated = [...internalValue];
    updated[index] = digit;
    setInternalValue(updated);
    const combined = updated.join("");
    onChange?.(combined);

    if (combined.length === length && !updated.includes("")) {
      onComplete?.(combined);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!internalValue[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        updateDigit(index - 1, "");
      } else {
        updateDigit(index, "");
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) {
      updateDigit(index, "");
      return;
    }
    const digit = val.slice(-1);
    updateDigit(index, digit);

    // Auto-advance
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;

    const updated = pasted.split("");
    while (updated.length < length) updated.push("");
    setInternalValue(updated);

    const combined = updated.join("");
    onChange?.(combined);

    const nextIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[nextIndex]?.focus();

    if (pasted.length === length) {
      onComplete?.(pasted);
    }
  };

  return (
    <div
      className={cn("flex items-center justify-center gap-2 sm:gap-3", className)}
      role="group"
      aria-label="One-time verification code"
    >
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={internalValue[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          aria-label={`Digit ${index + 1}`}
          className={cn(
            "h-12 w-10 sm:h-14 sm:w-12 text-center text-xl font-bold font-mono rounded-lg border border-input bg-background text-foreground shadow-sm transition-all focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/40 focus:outline-none disabled:opacity-50",
            error && "border-destructive text-destructive focus:ring-destructive/40 animate-pulse",
            internalValue[index] && "border-primary/60 bg-primary/5",
          )}
        />
      ))}
    </div>
  );
}
