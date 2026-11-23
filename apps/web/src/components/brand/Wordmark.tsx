import * as React from "react";
import { cn } from "@/lib/utils";
import { LogoMark } from "./LogoMark";

interface WordmarkProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
}

export function Wordmark({ className, size = "md", withTagline = false }: WordmarkProps) {
  const iconSize = size === "sm" ? 24 : size === "lg" ? 40 : 32;
  const textSize = size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl";

  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={iconSize} />
      <div className="flex flex-col">
        <span className={cn("font-heading font-extrabold tracking-tight leading-none", textSize)}>
          <span className="text-foreground">Safer</span>
          <span className="text-brand-teal">Streets</span>
        </span>
        {withTagline && (
          <span className="text-[10px] tracking-wide text-muted-foreground font-medium uppercase mt-0.5">
            Smarter Journeys · Stronger Communities
          </span>
        )}
      </div>
    </div>
  );
}
