"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MapPin, Car, Shield, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  accentClass: string;
}

const mobileTabs: TabItem[] = [
  {
    label: "Home",
    href: "/dashboard",
    icon: LayoutDashboard,
    accentClass: "text-primary",
  },
  {
    label: "Routes",
    href: "/saferoute",
    icon: MapPin,
    accentClass: "text-module-saferoute",
  },
  {
    label: "Rides",
    href: "/automate",
    icon: Car,
    accentClass: "text-module-automate",
  },
  {
    label: "Journey",
    href: "/journeyguard",
    icon: Shield,
    accentClass: "text-module-journeyguard",
  },
  {
    label: "Alerts",
    href: "/safealert",
    icon: AlertOctagon,
    accentClass: "text-emergency",
  },
];

export function BottomTabBar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-border/80 bg-background/95 backdrop-blur-md px-2 flex items-center justify-around select-none shadow-elevated safe-bottom",
        className,
      )}
      aria-label="Mobile Navigation"
    >
      {mobileTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href || pathname?.startsWith(tab.href + "/");

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full min-h-[44px] min-w-[44px] py-1 text-center transition-all relative",
              isActive
                ? "text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <div className="relative">
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform",
                  isActive ? cn(tab.accentClass, "scale-110") : "text-muted-foreground",
                )}
              />
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-teal" />
              )}
            </div>
            <span className="text-[11px] leading-tight mt-1">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
