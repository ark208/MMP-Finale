"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, Search, AlertOctagon, User as UserIcon, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/theme-toggle";
import { Wordmark } from "../brand/Wordmark";

export interface TopBarProps {
  onOpenEmergency: () => void;
  onToggleSidebar?: () => void;
  unreadNotifications?: number;
  userName?: string;
  className?: string;
}

export function TopBar({
  onOpenEmergency,
  onToggleSidebar,
  unreadNotifications = 3,
  userName = "Arnav",
  className,
}: TopBarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-16 w-full border-b border-border/80 bg-background/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 select-none",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="md:flex -ml-2 text-muted-foreground hover:text-foreground"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}

        {/* Mobile Wordmark */}
        <div className="md:hidden">
          <Link href="/dashboard" className="block">
            <Wordmark size="sm" />
          </Link>
        </div>

        {/* Search Input (Desktop) */}
        <div className="hidden lg:flex items-center relative w-72">
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            placeholder="Search reports, routes, rides..."
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-muted/60 border border-input text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Persistent Emergency Chip (Section 4.2: Red reserved for emergency) */}
        <button
          type="button"
          onClick={onOpenEmergency}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-emergency text-white text-xs sm:text-sm font-bold shadow-glow-emergency animate-emergency-pulse active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Open emergency assistance sheet"
        >
          <AlertOctagon className="w-4 h-4 shrink-0" />
          <span>Emergency</span>
        </button>

        {/* Theme Toggle */}
        <ThemeToggle className="text-muted-foreground hover:text-foreground" />

        {/* Notification Bell */}
        <Link
          href="/notifications"
          className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label={`Notifications, ${unreadNotifications} unread`}
        >
          <Bell className="w-5 h-5" />
          {unreadNotifications > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-emergency text-[10px] font-bold text-white leading-none">
              {unreadNotifications > 9 ? "9+" : unreadNotifications}
            </span>
          )}
        </Link>

        {/* Profile Avatar / Menu shortcut */}
        <Link
          href="/profile"
          className="flex items-center gap-2 p-1 pl-1.5 rounded-full hover:bg-muted transition-colors border border-border/60"
        >
          <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
            {userName[0]?.toUpperCase() || <UserIcon className="w-4 h-4" />}
          </div>
          <span className="hidden sm:inline text-xs font-medium text-foreground pr-1">
            {userName}
          </span>
        </Link>
      </div>
    </header>
  );
}
