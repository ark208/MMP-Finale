import * as React from "react";
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  PlayCircle,
  Ban,
  Radio,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AnyStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "VERIFIED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "REJECTED"
  | "OPEN"
  | "FULL"
  | "COMPLETED"
  | "CANCELLED"
  | "PENDING"
  | "ACCEPTED"
  | "EXPIRED"
  | "ACTIVE"
  | "OVERDUE"
  | "DISMISSED"
  | "REMOVED"
  | "SUSPENDED"
  | "BANNED"
  | "ACTIONED";

interface StatusConfig {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  classes: string;
}

const statusConfigs: Record<string, StatusConfig> = {
  SUBMITTED: {
    label: "Submitted",
    icon: Clock,
    classes: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30",
  },
  UNDER_REVIEW: {
    label: "Under Review",
    icon: Clock,
    classes: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30",
  },
  VERIFIED: {
    label: "Verified",
    icon: ShieldCheck,
    classes: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  },
  IN_PROGRESS: {
    label: "In Progress",
    icon: PlayCircle,
    classes: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/30",
  },
  RESOLVED: {
    label: "Resolved",
    icon: CheckCircle2,
    classes: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  },
  COMPLETED: {
    label: "Completed",
    icon: CheckCircle2,
    classes: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  },
  ACCEPTED: {
    label: "Accepted",
    icon: CheckCircle2,
    classes: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  },
  ACTIONED: {
    label: "Actioned",
    icon: FileCheck,
    classes: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    classes: "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/30",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    classes: "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/30",
  },
  DISMISSED: {
    label: "Dismissed",
    icon: XCircle,
    classes: "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/30",
  },
  EXPIRED: {
    label: "Expired",
    icon: Clock,
    classes: "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/30",
  },
  OPEN: {
    label: "Open",
    icon: Radio,
    classes: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/30",
  },
  FULL: {
    label: "Full",
    icon: Ban,
    classes: "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/30",
  },
  PENDING: {
    label: "Pending",
    icon: Clock,
    classes: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30",
  },
  ACTIVE: {
    label: "Active",
    icon: Radio,
    classes: "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/30",
  },
  OVERDUE: {
    label: "Overdue",
    icon: AlertTriangle,
    classes: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/40 font-semibold",
  },
  REMOVED: {
    label: "Removed",
    icon: XCircle,
    classes: "bg-destructive/10 text-destructive border-destructive/30",
  },
  SUSPENDED: {
    label: "Suspended",
    icon: AlertTriangle,
    classes: "bg-destructive/10 text-destructive border-destructive/30",
  },
  BANNED: {
    label: "Banned",
    icon: Ban,
    classes: "bg-destructive/15 text-destructive border-destructive/40 font-semibold",
  },
};

export interface StatusChipProps {
  status: AnyStatus | string;
  size?: "sm" | "md";
  className?: string;
}

export function StatusChip({ status, size = "md", className }: StatusChipProps) {
  const normalized = status.toUpperCase();
  const config = statusConfigs[normalized] || {
    label: status,
    icon: Clock,
    classes: "bg-muted text-muted-foreground border-border",
  };

  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium border select-none",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        config.classes,
        className,
      )}
    >
      <Icon
        className={cn("shrink-0", size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5")}
        aria-hidden="true"
      />
      <span>{config.label}</span>
    </span>
  );
}
