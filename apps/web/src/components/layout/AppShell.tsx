"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TopBar } from "./TopBar";
import { SidebarNav } from "./SidebarNav";
import { AdminSidebar } from "./AdminSidebar";
import { BottomTabBar } from "./BottomTabBar";
import { EmergencySheet } from "../ui/emergency-sheet";

export interface AppShellProps {
  children: React.ReactNode;
  variant?: "app" | "admin";
  className?: string;
  userName?: string;
  unreadNotifications?: number;
}

export function AppShell({
  children,
  variant = "app",
  className,
  userName = "Arnav",
  unreadNotifications = 3,
}: AppShellProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [emergencyOpen, setEmergencyOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Left Sidebar (Desktop/Tablet) */}
      {variant === "admin" ? (
        <AdminSidebar />
      ) : (
        <SidebarNav collapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)} />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          onOpenEmergency={() => setEmergencyOpen(true)}
          onToggleSidebar={() => setCollapsed(!collapsed)}
          unreadNotifications={unreadNotifications}
          userName={userName}
        />

        <main className={cn("flex-1 p-4 sm:p-6 pb-20 md:pb-8 max-w-7xl w-full mx-auto", className)}>
          {children}
        </main>

        {/* Bottom Bar (Mobile only) */}
        <BottomTabBar />
      </div>

      {/* Global Emergency Sheet */}
      <EmergencySheet open={emergencyOpen} onOpenChange={setEmergencyOpen} />
    </div>
  );
}
