import * as React from "react";
import {
  LightbulbOff,
  Moon,
  Footprints,
  Construction,
  Compass,
  AlertCircle,
  Car,
  HeartPulse,
  Flame,
  ShieldAlert,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ReportCategory =
  | "BROKEN_STREETLIGHT"
  | "POOR_LIGHTING"
  | "POTHOLE"
  | "DAMAGED_ROAD"
  | "DAMAGED_FOOTPATH"
  | "ISOLATED_AREA"
  | "OTHER";

export type AlertCategory =
  "ROAD_ACCIDENT" | "MEDICAL" | "HARASSMENT" | "FIRE" | "PUBLIC_HAZARD" | "OTHER";

export type AnyCategory = ReportCategory | AlertCategory | string;

interface CategoryConfig {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badgeClass: string;
  iconClass: string;
}

const categoryConfigs: Record<string, CategoryConfig> = {
  // SafeRoute Categories
  BROKEN_STREETLIGHT: {
    icon: LightbulbOff,
    label: "Broken Streetlight",
    badgeClass: "bg-amber-500/10 border-amber-500/20",
    iconClass: "text-amber-600 dark:text-amber-400",
  },
  POOR_LIGHTING: {
    icon: Moon,
    label: "Poor Lighting",
    badgeClass: "bg-amber-500/10 border-amber-500/20",
    iconClass: "text-amber-600 dark:text-amber-400",
  },
  POTHOLE: {
    icon: Construction,
    label: "Pothole",
    badgeClass: "bg-amber-500/10 border-amber-500/20",
    iconClass: "text-amber-600 dark:text-amber-400",
  },
  DAMAGED_ROAD: {
    icon: Construction,
    label: "Damaged Road",
    badgeClass: "bg-amber-500/10 border-amber-500/20",
    iconClass: "text-amber-600 dark:text-amber-400",
  },
  DAMAGED_FOOTPATH: {
    icon: Footprints,
    label: "Damaged Footpath",
    badgeClass: "bg-amber-500/10 border-amber-500/20",
    iconClass: "text-amber-600 dark:text-amber-400",
  },
  ISOLATED_AREA: {
    icon: Compass,
    label: "Isolated Area",
    badgeClass: "bg-amber-500/10 border-amber-500/20",
    iconClass: "text-amber-600 dark:text-amber-400",
  },

  // SafeAlert Categories (Emergency)
  ROAD_ACCIDENT: {
    icon: Car,
    label: "Road Accident",
    badgeClass: "bg-emergency/10 border-emergency/20",
    iconClass: "text-emergency",
  },
  MEDICAL: {
    icon: HeartPulse,
    label: "Medical Emergency",
    badgeClass: "bg-emergency/10 border-emergency/20",
    iconClass: "text-emergency",
  },
  HARASSMENT: {
    icon: ShieldAlert,
    label: "Harassment Concern",
    badgeClass: "bg-emergency/10 border-emergency/20",
    iconClass: "text-emergency",
  },
  FIRE: {
    icon: Flame,
    label: "Fire Hazard",
    badgeClass: "bg-emergency/10 border-emergency/20",
    iconClass: "text-emergency",
  },
  PUBLIC_HAZARD: {
    icon: AlertTriangle,
    label: "Public Hazard",
    badgeClass: "bg-emergency/10 border-emergency/20",
    iconClass: "text-emergency",
  },
  OTHER: {
    icon: AlertCircle,
    label: "Other Issue",
    badgeClass: "bg-slate-500/10 border-slate-500/20",
    iconClass: "text-slate-600 dark:text-slate-400",
  },
};

export interface CategoryIconProps {
  category: AnyCategory;
  size?: "sm" | "md" | "lg";
  variant?: "badge" | "bare";
  className?: string;
}

export function CategoryIcon({
  category,
  size = "md",
  variant = "badge",
  className,
}: CategoryIconProps) {
  const config = categoryConfigs[category] || {
    icon: HelpCircle,
    label: category,
    badgeClass: "bg-muted border-border",
    iconClass: "text-muted-foreground",
  };

  const Icon = config.icon;
  const iconSizeClass = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-6 h-6" : "w-4 h-4";
  const badgeSizeClass =
    size === "sm" ? "p-1.5 rounded-md" : size === "lg" ? "p-3 rounded-2xl" : "p-2 rounded-xl";

  if (variant === "bare") {
    return <Icon className={cn(iconSizeClass, config.iconClass, className)} aria-hidden="true" />;
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center border shrink-0",
        badgeSizeClass,
        config.badgeClass,
        className,
      )}
      title={config.label}
      aria-label={config.label}
    >
      <Icon className={cn(iconSizeClass, config.iconClass)} aria-hidden="true" />
    </div>
  );
}

export function getCategoryLabel(category: string): string {
  return categoryConfigs[category]?.label || category;
}
