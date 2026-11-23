import * as React from "react";
import { Check, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  status?: "done" | "current" | "warning" | "pending";
  icon?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div
      className={cn(
        "relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-border",
        className,
      )}
    >
      {items.map((item) => {
        const isDone = item.status === "done";
        const isCurrent = item.status === "current";
        const isWarning = item.status === "warning";

        return (
          <div key={item.id} className="relative group">
            {/* Dot Node */}
            <div
              className={cn(
                "absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] border-2 bg-background transition-transform",
                isDone && "bg-emerald-600 border-emerald-600 text-white",
                isCurrent &&
                  "border-primary bg-primary text-primary-foreground ring-4 ring-primary/20",
                isWarning && "bg-amber-500 border-amber-500 text-white ring-4 ring-amber-500/20",
                !isDone &&
                  !isCurrent &&
                  !isWarning &&
                  "border-muted-foreground/30 text-muted-foreground bg-muted",
              )}
            >
              {item.icon ? (
                item.icon
              ) : isDone ? (
                <Check className="w-3 h-3 stroke-[3]" />
              ) : isWarning ? (
                <AlertTriangle className="w-2.5 h-2.5" />
              ) : (
                <Clock className="w-2.5 h-2.5" />
              )}
            </div>

            {/* Content Box */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-heading font-medium text-sm text-foreground">
                  {item.title}
                </span>
                <span className="text-xs text-muted-foreground font-mono shrink-0">
                  {item.timestamp}
                </span>
              </div>
              {item.description && (
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
