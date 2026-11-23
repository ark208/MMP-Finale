"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldAlert,
  Users,
  Flag,
  FileText,
  Settings,
  ArrowLeft,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Wordmark } from "../brand/Wordmark";

const adminNavItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Moderation Queue", href: "/admin/moderation", icon: ShieldAlert, badge: 5 },
  { label: "User Management", href: "/admin/users", icon: Users },
  { label: "Flags", href: "/admin/flags", icon: Flag, badge: 2 },
  { label: "Audit Log", href: "/admin/audit", icon: FileText },
  { label: "System Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col w-64 border-r border-border/80 bg-card/80 backdrop-blur-md h-screen sticky top-0 transition-all select-none",
        className,
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border/70">
        <Link href="/admin">
          <Wordmark size="sm" />
        </Link>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          Admin
        </span>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          Moderation & Ops
        </div>
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/70",
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{item.label}</span>
              {item.badge && (
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

      {/* Return to App */}
      <div className="p-3 border-t border-border/70">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to User App</span>
        </Link>
      </div>
    </aside>
  );
}
