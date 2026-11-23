import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-input bg-background/80 px-3.5 py-2 text-base md:text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:ring-destructive/50",
          className,
        )}
        ref={ref}
        aria-invalid={!!error}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export interface TextFieldProps extends InputProps {
  label?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, hint, error, id, leftIcon, rightIcon, className, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <Input
            id={inputId}
            ref={ref}
            error={error}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            className={cn(leftIcon && "pl-10", rightIcon && "pr-10", className)}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <div
            id={errorId}
            className="flex items-center gap-1.5 text-xs text-destructive font-medium mt-1"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        ) : hint ? (
          <p id={hintId} className="text-xs text-muted-foreground mt-1">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
TextField.displayName = "TextField";

export { Input };
