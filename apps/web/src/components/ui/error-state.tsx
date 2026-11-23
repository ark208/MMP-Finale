import * as React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  errorCode?: string;
  onRetry?: () => void;
  reportProblemUrl?: string;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this information. Please check your connection and try again.",
  errorCode,
  onRetry,
  reportProblemUrl = "/support",
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-destructive/20 bg-destructive/[0.03] my-4",
        className,
      )}
      role="alert"
    >
      <div className="w-12 h-12 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive mb-3.5">
        <AlertTriangle className="w-6 h-6" aria-hidden="true" />
      </div>
      <h4 className="font-heading font-semibold text-lg text-foreground">{title}</h4>
      <p className="mt-1.5 max-w-md text-sm text-muted-foreground leading-relaxed">{message}</p>

      {errorCode && (
        <span className="mt-2 text-[11px] font-mono text-muted-foreground/80 bg-muted/60 px-2 py-0.5 rounded border border-border">
          Error code: {errorCode}
        </span>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <Button
            variant="primary"
            size="md"
            onClick={onRetry}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Try again
          </Button>
        )}
        <Button variant="ghost" size="md" asChild>
          <a
            href={reportProblemUrl}
            className="text-muted-foreground hover:text-foreground text-xs"
          >
            Report a problem
          </a>
        </Button>
      </div>
    </div>
  );
}
