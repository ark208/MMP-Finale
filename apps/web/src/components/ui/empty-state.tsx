import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type IllustrationType = "reports" | "rides" | "journeys" | "alerts" | "general";

interface EmptyStateProps {
  illustration?: IllustrationType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

function Illustration({ type }: { type: IllustrationType }) {
  if (type === "reports") {
    return (
      <svg
        width="120"
        height="96"
        viewBox="0 0 120 96"
        fill="none"
        className="mx-auto"
        aria-hidden="true"
      >
        <circle
          cx="60"
          cy="48"
          r="40"
          className="fill-amber-500/5 stroke-amber-500/20"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Lamp Post Silhouette */}
        <path
          d="M60 20V72M52 24C52 20 68 20 68 24M54 28H66M48 72H72"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-amber-500/60"
        />
        {/* Light Glow */}
        <circle cx="60" cy="24" r="7" className="fill-amber-400/20" />
        <circle cx="60" cy="24" r="3" className="fill-amber-400" />
      </svg>
    );
  }

  if (type === "rides") {
    return (
      <svg
        width="120"
        height="96"
        viewBox="0 0 120 96"
        fill="none"
        className="mx-auto"
        aria-hidden="true"
      >
        <circle
          cx="60"
          cy="48"
          r="40"
          className="fill-sky-500/5 stroke-sky-500/20"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Road & Car Motif */}
        <path
          d="M30 68C45 52 75 52 90 68"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-sky-500/40"
        />
        <path
          d="M48 46L54 36H66L72 46H48Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          className="text-sky-500"
        />
        <circle cx="52" cy="52" r="3" fill="currentColor" className="text-sky-400" />
        <circle cx="68" cy="52" r="3" fill="currentColor" className="text-sky-400" />
      </svg>
    );
  }

  if (type === "journeys") {
    return (
      <svg
        width="120"
        height="96"
        viewBox="0 0 120 96"
        fill="none"
        className="mx-auto"
        aria-hidden="true"
      >
        <circle
          cx="60"
          cy="48"
          r="40"
          className="fill-violet-500/5 stroke-violet-500/20"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Shield with Compass Needle */}
        <path
          d="M60 24L44 30V44C44 54 51 62 60 66C69 62 76 54 76 44V30L60 24Z"
          stroke="currentColor"
          strokeWidth="2"
          className="text-violet-500"
        />
        <path d="M60 36L63 45L60 54L57 45L60 36Z" className="fill-brand-teal" />
      </svg>
    );
  }

  if (type === "alerts") {
    return (
      <svg
        width="120"
        height="96"
        viewBox="0 0 120 96"
        fill="none"
        className="mx-auto"
        aria-hidden="true"
      >
        <circle
          cx="60"
          cy="48"
          r="40"
          className="fill-emerald-500/5 stroke-emerald-500/20"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Peaceful Shield / Check */}
        <path
          d="M60 26L45 32V44C45 53 51 61 60 64C69 61 75 53 75 44V32L60 26Z"
          stroke="currentColor"
          strokeWidth="2"
          className="text-emerald-500"
        />
        <path
          d="M53 45L58 50L68 40"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-500"
        />
      </svg>
    );
  }

  // General empty state
  return (
    <svg
      width="120"
      height="96"
      viewBox="0 0 120 96"
      fill="none"
      className="mx-auto"
      aria-hidden="true"
    >
      <circle cx="60" cy="48" r="38" className="fill-muted stroke-border" strokeWidth="1.5" />
      <rect
        x="44"
        y="34"
        width="32"
        height="28"
        rx="6"
        className="stroke-muted-foreground"
        strokeWidth="2"
      />
      <line
        x1="50"
        y1="42"
        x2="70"
        y2="42"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-muted-foreground/60"
      />
      <line
        x1="50"
        y1="50"
        x2="62"
        y2="50"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-muted-foreground/60"
      />
    </svg>
  );
}

export function EmptyState({
  illustration = "general",
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-border/80 bg-card/40 my-4",
        className,
      )}
    >
      <Illustration type={illustration} />
      <h4 className="mt-4 font-heading font-semibold text-base text-foreground">{title}</h4>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction} className="mt-5">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
