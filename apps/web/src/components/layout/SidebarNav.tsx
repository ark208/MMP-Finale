"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Car,
  Shield,
  AlertOctagon,
  Bell,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Wordmark } from "../brand/Wordmark";
import { LogoMark } from "../brand/LogoMark";

export interface SidebarNavProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
  isAdmin?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  accentClass?: string;
}

const mainNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "SafeRoute",
    href: "/saferoute",
    icon: MapPin,
    accentClass: "text-module-saferoute",
  },
  {
    label: "AutoMate",
    href: "/automate",
    icon: Car,
    accentClass: "text-module-automate",
  },
  {
    label: "JourneyGuard",
    href: "/journeyguard",
    icon: Shield,
    accentClass: "text-module-journeyguard",
  },
  {
    label: "SafeAlert",
    href: "/safealert",
    icon: AlertOctagon,
    accentClass: "text-emergency",
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
    badge: 3,
  },
];

export function SidebarNav({
  collapsed = false,
  onToggleCollapse,
  className,
  isAdmin = true,
}: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-r border-border/80 bg-card/60 backdrop-blur-md h-screen sticky top-0 transition-all duration-200 select-none",
        collapsed ? "w-20" : "w-64",
        className,
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border/70">
        {collapsed ? (
          <Link href="/dashboard" className="mx-auto" aria-label="SaferStreets Home">
            <LogoMark size={32} />
          </Link>
        ) : (
          <Link href="/dashboard" className="flex items-center">
            <Wordmark size="md" />
          </Link>
        )}

        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted hidden lg:flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          {!collapsed && "Platform"}
        </div>
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/70",
                collapsed && "justify-center px-2",
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  "w-5 h-5 shrink-0 transition-colors",
                  !isActive && item.accentClass,
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && item.badge && (
                <span
                  className={cn(
                    "ml-auto text-xs px-2 py-0.5 rounded-full font-bold",
                    isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground",
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Navigation (Settings + Admin) */}
      <div className="p-3 border-t border-border/70 space-y-1">
        {isAdmin && (
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors",
              collapsed && "justify-center px-2",
            )}
            title={collapsed ? "Admin Dashboard" : undefined}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Admin Workspace</span>}
          </Link>
        )}

        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
            collapsed && "justify-center px-2",
          )}
          title={collapsed ? "Settings" : undefined}
        >
          <Settings className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
}
