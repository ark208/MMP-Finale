"use client";

import * as React from "react";
import { PhoneCall, ShieldAlert, AlertTriangle, HeartPulse, UserX } from "lucide-react";
import { cn } from "@/lib/utils";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "./modal";

export interface EmergencySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Helpline {
  name: string;
  number: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  isPrimary?: boolean;
}

const emergencyHelplines: Helpline[] = [
  {
    name: "National Emergency Helpline",
    number: "112",
    desc: "Single all-in-one emergency response (Police, Fire, Ambulance)",
    icon: ShieldAlert,
    isPrimary: true,
  },
  {
    name: "Women Helpline (National)",
    number: "1091",
    desc: "24/7 dedicated safety support for women in distress",
    icon: UserX,
  },
  {
    name: "Police Emergency",
    number: "100",
    desc: "Direct law enforcement dispatch",
    icon: AlertTriangle,
  },
  {
    name: "Ambulance / Medical",
    number: "102",
    desc: "Emergency medical transport & first response",
    icon: HeartPulse,
  },
];

export function EmergencySheet({ open, onOpenChange }: EmergencySheetProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-md sm:max-w-lg border-emergency/30 bg-card p-5 sm:p-6">
        <ModalHeader className="text-left space-y-1.5">
          <div className="flex items-center gap-2 text-emergency font-bold text-xs uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-emergency animate-ping" />
            <span>Immediate Emergency Assistance</span>
          </div>
          <ModalTitle className="text-xl sm:text-2xl font-bold font-heading text-foreground flex items-center gap-2">
            <span>Official Helplines</span>
          </ModalTitle>
          <ModalDescription className="text-xs text-muted-foreground leading-relaxed">
            In any immediate danger or medical crisis, please call emergency authorities right away.
          </ModalDescription>
        </ModalHeader>

        {/* Helplines List */}
        <div className="space-y-2.5 mt-2">
          {emergencyHelplines.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.number}
                href={`tel:${item.number}`}
                className={cn(
                  "flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all active:scale-[0.98] select-none",
                  item.isPrimary
                    ? "bg-emergency text-white border-red-500 shadow-glow-emergency hover:bg-emergency/90"
                    : "bg-muted/40 border-border hover:bg-muted text-foreground",
                )}
              >
                <div className="flex items-center gap-3 pr-2">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                      item.isPrimary
                        ? "bg-white/20 text-white"
                        : "bg-card text-foreground border border-border/80",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm sm:text-base leading-tight">
                      {item.name}
                    </div>
                    <p
                      className={cn(
                        "text-xs mt-0.5 line-clamp-1",
                        item.isPrimary ? "text-white/80" : "text-muted-foreground",
                      )}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm sm:text-base font-mono font-extrabold flex items-center gap-1.5 shrink-0",
                    item.isPrimary
                      ? "bg-white text-emergency"
                      : "bg-primary text-primary-foreground",
                  )}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{item.number}</span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Mandatory Safety Disclaimer (Blueprint rule 5) */}
        <div className="mt-4 p-3 rounded-xl bg-muted/60 border border-border/60 text-[11px] text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">Safety Notice:</strong> SaferStreets is a community
            reporting and journey coordination tool. It does not provide real-time GPS tracking or
            automated police dispatch.
          </p>
        </div>
      </ModalContent>
    </Modal>
  );
}
