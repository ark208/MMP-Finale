import * as React from "react";
import {
  MapPin,
  Clock,
  ThumbsUp,
  Users,
  IndianRupee,
  Shield,
  AlertOctagon,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./card";
import { StatusChip } from "./status-chip";
import { CategoryIcon, getCategoryLabel } from "./category-icon";
import { Button } from "./button";

// ─── ReportCard (SafeRoute) ───────────────────────────────────────────────────
export interface ReportCardProps {
  id: string;
  title: string;
  category: string;
  status: string;
  addressText?: string;
  confirmationCount: number;
  createdAt: string;
  hasPhotos?: boolean;
  onConfirm?: () => void;
  onClick?: () => void;
  className?: string;
}

export function ReportCard({
  title,
  category,
  status,
  addressText,
  confirmationCount,
  createdAt,
  onConfirm,
  onClick,
  className,
}: ReportCardProps) {
  return (
    <Card
      variant="interactive"
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden border-l-4 border-l-module-saferoute transition-all hover:-translate-y-0.5",
        className,
      )}
    >
      <div className="p-4 sm:p-5 flex flex-col justify-between h-full gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <CategoryIcon category={category} size="md" />
            <div>
              <span className="text-[11px] font-semibold text-module-saferoute uppercase tracking-wider">
                SafeRoute · {getCategoryLabel(category)}
              </span>
              <h4 className="font-heading font-semibold text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {title}
              </h4>
            </div>
          </div>
          <StatusChip status={status} size="sm" />
        </div>

        {addressText && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground line-clamp-1">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-module-saferoute" aria-hidden="true" />
            <span>{addressText}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{createdAt}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onConfirm?.();
              }}
              className="h-7 px-2 text-xs gap-1 border-module-saferoute/30 hover:bg-module-saferoute/10"
            >
              <ThumbsUp className="w-3 h-3 text-module-saferoute" />
              <span>{confirmationCount} Confirm</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── RideCard (AutoMate) ──────────────────────────────────────────────────────
export interface RideCardProps {
  id: string;
  sourceText: string;
  destText: string;
  departureAt: string;
  seatsTotal: number;
  seatsTaken: number;
  estimatedTotalFare: number;
  creatorName: string;
  status: string;
  womenOnly?: boolean;
  onClick?: () => void;
  className?: string;
}

export function RideCard({
  sourceText,
  destText,
  departureAt,
  seatsTotal,
  seatsTaken,
  estimatedTotalFare,
  creatorName,
  status,
  womenOnly,
  onClick,
  className,
}: RideCardProps) {
  const seatsLeft = seatsTotal - seatsTaken;
  const perPersonFare = Math.round(estimatedTotalFare / (seatsTotal + 1));

  return (
    <Card
      variant="interactive"
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden border-l-4 border-l-module-automate transition-all hover:-translate-y-0.5",
        className,
      )}
    >
      <div className="p-4 sm:p-5 flex flex-col justify-between h-full gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-module-automate uppercase tracking-wider">
              AutoMate Shared Ride
            </span>
            {womenOnly && (
              <span className="text-[10px] bg-purple-500/10 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/20 font-medium">
                Women Only
              </span>
            )}
          </div>
          <StatusChip status={status} size="sm" />
        </div>

        {/* Route Details */}
        <div className="space-y-1.5 my-1">
          <div className="flex items-center gap-2 text-sm text-foreground font-medium">
            <span className="w-2 h-2 rounded-full bg-module-automate shrink-0" />
            <span className="truncate">{sourceText}</span>
          </div>
          <div className="pl-1 text-muted-foreground flex items-center">
            <div className="w-0.5 h-3 bg-border ml-[3px]" />
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-teal shrink-0" />
            <span className="truncate">{destText}</span>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-module-automate" />
            <span>{departureAt}</span>
            {creatorName && <span className="hidden sm:inline">· {creatorName}</span>}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 font-medium text-foreground">
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{seatsLeft} left</span>
            </div>
            <div className="flex items-center text-sm font-bold text-foreground">
              <IndianRupee className="w-3.5 h-3.5" />
              <span>{perPersonFare}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── AlertCard (SafeAlert) ────────────────────────────────────────────────────
export interface AlertCardProps {
  id: string;
  category: string;
  description: string;
  addressText?: string;
  status: string;
  confirmCount: number;
  disputeCount: number;
  createdAt: string;
  isAnonymous?: boolean;
  onCall112?: () => void;
  onClick?: () => void;
  className?: string;
}

export function AlertCard({
  category,
  description,
  addressText,
  status,
  confirmCount,
  createdAt,
  onCall112,
  onClick,
  className,
}: AlertCardProps) {
  return (
    <Card
      variant="interactive"
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden border-l-4 border-l-emergency transition-all hover:-translate-y-0.5 bg-card/95",
        status === "ACTIVE" && "border-emergency/40 bg-emergency/[0.02]",
        className,
      )}
    >
      <div className="p-4 sm:p-5 flex flex-col justify-between h-full gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <CategoryIcon category={category} size="md" />
            <div>
              <span className="text-[11px] font-bold text-emergency uppercase tracking-wider flex items-center gap-1">
                <AlertOctagon className="w-3 h-3 text-emergency shrink-0" />
                Community Alert · {getCategoryLabel(category)}
              </span>
              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                {addressText || "Nearby location"} · {createdAt}
              </p>
            </div>
          </div>
          <StatusChip status={status} size="sm" />
        </div>

        <p className="text-sm text-foreground/90 leading-snug line-clamp-2">{description}</p>

        <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Shield className="w-3.5 h-3.5 text-brand-teal" />
            <span>{confirmCount} confirmed</span>
          </div>

          <Button
            variant="emergency"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onCall112?.();
            }}
            className="h-7 px-3 text-xs gap-1.5"
          >
            <span>Call 112</span>
            <ChevronRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

// ─── JourneyCard (JourneyGuard) ───────────────────────────────────────────────
export interface JourneyCardProps {
  id: string;
  destinationText: string;
  expectedArrivalAt: string;
  emergencyContactName: string;
  status: string;
  countdownMinutes?: number;
  onArrivedSafely?: () => void;
  onClick?: () => void;
  className?: string;
}

export function JourneyCard({
  destinationText,
  expectedArrivalAt,
  emergencyContactName,
  status,
  countdownMinutes,
  onArrivedSafely,
  onClick,
  className,
}: JourneyCardProps) {
  const isOverdue = status === "OVERDUE";

  return (
    <Card
      variant="interactive"
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden border-l-4 border-l-module-journeyguard transition-all hover:-translate-y-0.5",
        isOverdue && "border-l-amber-500 bg-amber-500/[0.04]",
        className,
      )}
    >
      <div className="p-4 sm:p-5 flex flex-col justify-between h-full gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold text-module-journeyguard uppercase tracking-wider flex items-center gap-1">
              <Shield className="w-3 h-3 text-module-journeyguard" />
              JourneyGuard
            </span>
            <h4 className="font-heading font-semibold text-base text-foreground mt-0.5 flex items-center gap-1.5">
              <span>To: {destinationText}</span>
            </h4>
          </div>
          <StatusChip status={status} size="sm" />
        </div>

        <div className="rounded-xl bg-muted/60 p-3 flex items-center justify-between text-xs">
          <div>
            <span className="text-muted-foreground block text-[11px]">Expected arrival:</span>
            <span className="font-semibold text-foreground text-sm">{expectedArrivalAt}</span>
          </div>
          {countdownMinutes !== undefined && (
            <div className="text-right">
              <span className="text-muted-foreground block text-[11px]">Countdown:</span>
              <span
                className={cn(
                  "font-bold font-mono text-sm",
                  isOverdue ? "text-amber-600 dark:text-amber-400" : "text-brand-teal",
                )}
              >
                {countdownMinutes > 0 ? `${countdownMinutes} min left` : "ETA Reached"}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs text-muted-foreground">
          <span className="truncate">
            Contact: <strong className="text-foreground">{emergencyContactName}</strong>
          </span>

          {status === "ACTIVE" && onArrivedSafely && (
            <Button
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onArrivedSafely();
              }}
              className="h-7 px-3 text-xs bg-emerald-600 hover:bg-emerald-700"
            >
              I&apos;ve arrived safely
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
