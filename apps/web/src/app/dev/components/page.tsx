"use client";

import * as React from "react";
import { Mail, AlertOctagon, Sparkles, CheckCircle2, PhoneCall } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Wordmark } from "@/components/brand/Wordmark";
import { LogoMark } from "@/components/brand/LogoMark";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { OTPInput } from "@/components/ui/otp-input";
import { StatusChip, type AnyStatus } from "@/components/ui/status-chip";
import { CategoryIcon, type AnyCategory } from "@/components/ui/category-icon";
import { Card } from "@/components/ui/card";
import { ReportCard, RideCard, AlertCard, JourneyCard } from "@/components/ui/module-cards";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Timeline, type TimelineItem } from "@/components/ui/timeline";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DataTable, type Column } from "@/components/ui/data-table";
import { ImageUploader } from "@/components/ui/image-uploader";
import { EmergencySheet } from "@/components/ui/emergency-sheet";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function DevComponentsPage() {
  const [shellVariant, setShellVariant] = React.useState<"app" | "admin">("app");
  const [otpValue, setOtpValue] = React.useState("");
  const [emergencyOpen, setEmergencyOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const { showToast } = useToast();

  const statuses: AnyStatus[] = [
    "SUBMITTED",
    "UNDER_REVIEW",
    "VERIFIED",
    "IN_PROGRESS",
    "RESOLVED",
    "REJECTED",
    "OPEN",
    "FULL",
    "COMPLETED",
    "CANCELLED",
    "ACTIVE",
    "OVERDUE",
    "SUSPENDED",
    "BANNED",
  ];

  const categories: AnyCategory[] = [
    "BROKEN_STREETLIGHT",
    "POOR_LIGHTING",
    "POTHOLE",
    "DAMAGED_ROAD",
    "DAMAGED_FOOTPATH",
    "ISOLATED_AREA",
    "ROAD_ACCIDENT",
    "MEDICAL",
    "HARASSMENT",
    "FIRE",
    "PUBLIC_HAZARD",
    "OTHER",
  ];

  const timelineEvents: TimelineItem[] = [
    {
      id: "1",
      title: "Journey Started",
      description: "Destination set to Kota Railway Station. Trusted contact notified via email.",
      timestamp: "10:15 PM",
      status: "done",
    },
    {
      id: "2",
      title: "ETA Extension (+15 min)",
      description: "Auto rickshaw delayed in traffic near Aerodrome Circle.",
      timestamp: "10:45 PM",
      status: "done",
    },
    {
      id: "3",
      title: "Active Journey Monitoring",
      description: "Expecting arrival safely in approximately 8 minutes.",
      timestamp: "10:52 PM",
      status: "current",
    },
  ];

  interface DemoRow {
    id: string;
    title: string;
    module: string;
    author: string;
    status: string;
    date: string;
  }

  const tableData: DemoRow[] = [
    {
      id: "rep-101",
      title: "Broken streetlight near Gate 2",
      module: "SafeRoute",
      author: "Pooja S.",
      status: "VERIFIED",
      date: "23 Nov 2026",
    },
    {
      id: "ride-204",
      title: "Campus to Airport ride",
      module: "AutoMate",
      author: "Arnav K.",
      status: "OPEN",
      date: "23 Nov 2026",
    },
    {
      id: "alt-809",
      title: "Two-wheeler collision at Junction",
      module: "SafeAlert",
      author: "Rahul M.",
      status: "ACTIVE",
      date: "23 Nov 2026",
    },
    {
      id: "rep-102",
      title: "Damaged sidewalk & exposed ditch",
      module: "SafeRoute",
      author: "Ananya B.",
      status: "SUBMITTED",
      date: "22 Nov 2026",
    },
  ];

  const tableColumns: Column<DemoRow>[] = [
    { key: "id", header: "ID", className: "font-mono text-xs w-24" },
    { key: "title", header: "Item Title", sortable: true },
    {
      key: "module",
      header: "Module",
      render: (r: DemoRow) => (
        <span className="font-semibold text-xs text-foreground">{r.module}</span>
      ),
    },
    { key: "author", header: "Reported By" },
    {
      key: "status",
      header: "Status",
      render: (r: DemoRow) => <StatusChip status={r.status as AnyStatus} size="sm" />,
    },
    { key: "date", header: "Date", className: "text-xs font-mono text-muted-foreground" },
  ];

  return (
    <AppShell variant={shellVariant}>
      <div className="space-y-12">
        {/* Intro & Layout Switcher */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl bg-card border border-border shadow-soft">
          <div>
            <div className="flex items-center gap-2 text-brand-teal text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Design System Preview & Component Matrix</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
              SaferStreets UI Blueprint
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              Calm, trustworthy, urban-night aesthetic. Design tokens only, WCAG 2.2 AA contrast,
              4px grid, soft layered shadows.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={shellVariant === "app" ? "primary" : "outline"}
              size="sm"
              onClick={() => setShellVariant("app")}
            >
              App Shell
            </Button>
            <Button
              variant={shellVariant === "admin" ? "primary" : "outline"}
              size="sm"
              onClick={() => setShellVariant("admin")}
            >
              Admin Shell
            </Button>
            <ThemeToggle />
          </div>
        </div>

        {/* 1. Brand Identity */}
        <section className="space-y-4">
          <div className="border-b border-border pb-2">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              1. Brand Identity & Motifs
            </h2>
            <p className="text-xs text-muted-foreground">
              Custom SVG emblem with shield/transit motif, wordmark, and tagline.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="p-6 flex flex-col items-center justify-center text-center gap-3">
              <LogoMark size={56} />
              <div className="text-xs font-mono text-muted-foreground">Logo Mark (56px)</div>
            </Card>
            <Card className="p-6 flex flex-col items-center justify-center text-center gap-3">
              <Wordmark size="lg" withTagline />
              <div className="text-xs font-mono text-muted-foreground">
                Full Wordmark with Tagline
              </div>
            </Card>
            <Card className="p-6 flex flex-col items-center justify-center text-center gap-3">
              <div className="flex items-center gap-4">
                <LogoMark size={24} />
                <LogoMark size={32} />
                <LogoMark size={40} />
              </div>
              <div className="text-xs font-mono text-muted-foreground">
                Scale Range (24, 32, 40px)
              </div>
            </Card>
          </div>
        </section>

        {/* 2. Color Tokens */}
        <section className="space-y-4">
          <div className="border-b border-border pb-2">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              2. Module & Brand Color Tokens (Section 4.1)
            </h2>
            <p className="text-xs text-muted-foreground">
              Deep Indigo, Signal Teal, Module Accents, and Status Tones. Red is strictly reserved
              for emergencies.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <div className="p-4 rounded-xl bg-brand-deep text-white flex flex-col justify-between h-24">
              <span className="text-xs font-semibold">Deep Indigo</span>
              <span className="text-[10px] font-mono opacity-80">--brand (#2F2A6B)</span>
            </div>
            <div className="p-4 rounded-xl bg-brand-teal text-white flex flex-col justify-between h-24">
              <span className="text-xs font-semibold">Signal Teal</span>
              <span className="text-[10px] font-mono opacity-80">--brand-accent (#14B8A6)</span>
            </div>
            <div className="p-4 rounded-xl bg-module-saferoute text-white flex flex-col justify-between h-24">
              <span className="text-xs font-semibold">SafeRoute</span>
              <span className="text-[10px] font-mono opacity-80">Amber (#F59E0B)</span>
            </div>
            <div className="p-4 rounded-xl bg-module-automate text-white flex flex-col justify-between h-24">
              <span className="text-xs font-semibold">AutoMate</span>
              <span className="text-[10px] font-mono opacity-80">Sky (#0EA5E9)</span>
            </div>
            <div className="p-4 rounded-xl bg-module-journeyguard text-white flex flex-col justify-between h-24">
              <span className="text-xs font-semibold">JourneyGuard</span>
              <span className="text-[10px] font-mono opacity-80">Violet (#7C3AED)</span>
            </div>
            <div className="p-4 rounded-xl bg-emergency text-white flex flex-col justify-between h-24 shadow-glow-emergency">
              <span className="text-xs font-semibold">SafeAlert / SOS</span>
              <span className="text-[10px] font-mono opacity-80">Crimson (#DC2626)</span>
            </div>
          </div>
        </section>

        {/* 3. Button Variants */}
        <section className="space-y-4">
          <div className="border-b border-border pb-2">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              3. Button Hierarchy & Interactive States
            </h2>
            <p className="text-xs text-muted-foreground">
              Primary, Secondary, Outline, Ghost, Danger, and the pulsating Emergency variant.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger">Destructive / Delete</Button>
            <Button
              variant="emergency"
              onClick={() => setEmergencyOpen(true)}
              leftIcon={<AlertOctagon className="w-4 h-4" />}
            >
              Call 112 / Emergency
            </Button>
            <Button variant="primary" isLoading>
              Loading State
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </section>

        {/* 4. Form Controls */}
        <section className="space-y-4">
          <div className="border-b border-border pb-2">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              4. Form Controls, OTP, and Validation States
            </h2>
            <p className="text-xs text-muted-foreground">
              Text fields with icons, inline validation errors linked via aria-describedby,
              Textarea, and 6-digit OTP input.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <TextField
                label="Email Address"
                placeholder="name@example.com"
                hint="We'll send a 6-digit one-time code."
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />
              <TextField
                label="Registered Mobile Number"
                placeholder="9876543210"
                error="Please enter a valid 10-digit Indian phone number"
                leftIcon={<PhoneCall className="w-4 h-4" />}
                defaultValue="123"
              />
              <Select label="Reporting Category" required>
                <option value="">Select an issue category...</option>
                <option value="BROKEN_STREETLIGHT">Broken Streetlight</option>
                <option value="POOR_LIGHTING">Poor Lighting</option>
                <option value="POTHOLE">Pothole / Road Damage</option>
                <option value="ISOLATED_AREA">Isolated Area</option>
              </Select>
            </div>

            <div className="space-y-4">
              <Textarea
                label="Issue Description"
                placeholder="Describe lighting condition, hazards, or safety concerns..."
                maxLength={300}
                showCount
                defaultValue="Streetlight has been out for 3 consecutive nights near the hostel turnaround."
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  6-Digit OTP Verification (Auto-advance & Paste support)
                </label>
                <OTPInput
                  value={otpValue}
                  onChange={setOtpValue}
                  onComplete={(code: string) =>
                    showToast({
                      type: "success",
                      title: "OTP Verified",
                      description: `Code ${code} validated successfully.`,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. Status Chips & Category Icons */}
        <section className="space-y-4">
          <div className="border-b border-border pb-2">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              5. Status Chips & Category Icons
            </h2>
            <p className="text-xs text-muted-foreground">
              Color is never used alone; status chips feature dedicated semantic icons and text
              labels (WCAG AA).
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase text-muted-foreground">
              Status Chips
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {statuses.map((s) => (
                <StatusChip key={s} status={s} />
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <span className="text-xs font-semibold uppercase text-muted-foreground">
              Category Badges
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {categories.map((c) => (
                <CategoryIcon key={c} category={c} size="md" />
              ))}
            </div>
          </div>
        </section>

        {/* 6. Module Cards */}
        <section className="space-y-4">
          <div className="border-b border-border pb-2">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              6. Specialized Module Cards (Section 4.3)
            </h2>
            <p className="text-xs text-muted-foreground">
              Dedicated visual cards for SafeRoute, AutoMate, SafeAlert, and JourneyGuard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReportCard
              id="r-1"
              title="3 consecutive streetlights dark near Gate 2"
              category="BROKEN_STREETLIGHT"
              status="VERIFIED"
              addressText="Main University Road, near Gate 2"
              confirmationCount={14}
              createdAt="25 min ago"
              onConfirm={() =>
                showToast({
                  type: "success",
                  title: "Report Confirmed",
                  description: "Thank you for confirming this community safety issue.",
                })
              }
            />

            <RideCard
              id="ride-1"
              sourceText="Campus Hostel Block 4"
              destText="Kota Railway Station Platform 1"
              departureAt="Today at 6:30 PM"
              seatsTotal={3}
              seatsTaken={1}
              estimatedTotalFare={150}
              creatorName="Rohit K."
              status="OPEN"
              womenOnly
            />

            <AlertCard
              id="alt-1"
              category="ROAD_ACCIDENT"
              description="Two-wheeler collision at the main signal junction. Local traffic diverted."
              addressText="Station Road Crossing"
              status="ACTIVE"
              confirmCount={6}
              disputeCount={0}
              createdAt="8 min ago"
              onCall112={() => setEmergencyOpen(true)}
            />

            <JourneyCard
              id="j-1"
              destinationText="Indira Market"
              expectedArrivalAt="11:15 PM"
              emergencyContactName="Priya (Sister)"
              status="ACTIVE"
              countdownMinutes={18}
              onArrivedSafely={() =>
                showToast({
                  type: "success",
                  title: "Journey Complete",
                  description: "Emergency contacts notified of your safe arrival.",
                })
              }
            />
          </div>
        </section>

        {/* 7. Global UI States (Skeleton, Empty, Error) */}
        <section className="space-y-4">
          <div className="border-b border-border pb-2">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              7. Global UI States (Section 4.4)
            </h2>
            <p className="text-xs text-muted-foreground">
              Skeleton loading, Empty states with custom vector illustrations, and Error state with
              retry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Skeleton Card */}
            <Card className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-xl" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-4 w-3/4 rounded" />
                  <Skeleton className="h-3 w-1/2 rounded" />
                </div>
              </div>
              <Skeleton className="h-16 w-full rounded-xl" />
              <div className="flex justify-between pt-2">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-7 w-20 rounded-lg" />
              </div>
            </Card>

            {/* Empty State */}
            <EmptyState
              illustration="reports"
              title="All quiet nearby"
              description="No safety hazards reported around your current area."
              actionLabel="Report an Issue"
              onAction={() =>
                showToast({
                  type: "info",
                  title: "New Report",
                  description: "Opening report submission stepper.",
                })
              }
            />

            {/* Error State */}
            <ErrorState
              title="Failed to fetch rides"
              message="The server took too long to respond. Please check your network."
              errorCode="GATEWAY_TIMEOUT"
              onRetry={() =>
                showToast({
                  type: "info",
                  title: "Retrying",
                  description: "Refreshing feed...",
                })
              }
            />
          </div>
        </section>

        {/* 8. Vertical Timeline & Tabs */}
        <section className="space-y-4">
          <div className="border-b border-border pb-2">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              8. Timeline & Tabs Component
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-heading font-semibold text-base mb-4">Journey Guard Timeline</h3>
              <Timeline items={timelineEvents} />
            </Card>

            <Card className="p-6">
              <h3 className="font-heading font-semibold text-base mb-4">Styled Radix Tabs</h3>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="reports">Reports (12)</TabsTrigger>
                  <TabsTrigger value="rides">Rides (4)</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="overview"
                  className="text-sm text-muted-foreground p-3 bg-muted/40 rounded-xl mt-3"
                >
                  Summary snapshot showing real-time community indicators within a 5 km radius.
                </TabsContent>
                <TabsContent
                  value="reports"
                  className="text-sm text-muted-foreground p-3 bg-muted/40 rounded-xl mt-3"
                >
                  Active verified road and lighting hazards in your area.
                </TabsContent>
                <TabsContent
                  value="rides"
                  className="text-sm text-muted-foreground p-3 bg-muted/40 rounded-xl mt-3"
                >
                  Shared commute requests and available seats.
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </section>

        {/* 9. Data Table & Image Uploader */}
        <section className="space-y-4">
          <div className="border-b border-border pb-2">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              9. Admin Data Table & Photo Uploader
            </h2>
          </div>

          <Card className="p-6 space-y-4">
            <h3 className="font-heading font-semibold text-base">Moderation Queue Preview</h3>
            <DataTable<DemoRow>
              columns={tableColumns}
              data={tableData}
              keyExtractor={(r) => r.id}
              pageSize={3}
            />
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="font-heading font-semibold text-base">Evidence Photo Uploader</h3>
            <ImageUploader />
          </Card>
        </section>

        {/* 10. Modals & Emergency Sheet */}
        <section className="space-y-4">
          <div className="border-b border-border pb-2">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              10. Interactive Dialogs & Notifications
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => setModalOpen(true)}>
              Open Centered Modal
            </Button>
            <Button
              variant="emergency"
              onClick={() => setEmergencyOpen(true)}
              leftIcon={<AlertOctagon className="w-4 h-4" />}
            >
              Open Emergency Sheet
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                showToast({
                  type: "success",
                  title: "Success Notification",
                  description: "Report verified by community consensus.",
                })
              }
            >
              Trigger Success Toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                showToast({
                  type: "error",
                  title: "Error Notification",
                  description: "Network timeout while fetching live alerts.",
                })
              }
            >
              Trigger Error Toast
            </Button>
          </div>

          {/* Modal Instance */}
          <Modal open={modalOpen} onOpenChange={setModalOpen}>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Confirm Safety Report</ModalTitle>
                <ModalDescription>
                  Are you currently at this location? Confirming reports alerts nearby residents and
                  campus safety officers.
                </ModalDescription>
              </ModalHeader>
              <div className="p-3 rounded-xl bg-muted/60 text-xs text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                <span>Your confirmation adds to the community trust score.</span>
              </div>
              <ModalFooter>
                <Button variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setModalOpen(false);
                    showToast({
                      type: "success",
                      title: "Report Confirmed",
                      description: "Your confirmation has been recorded.",
                    });
                  }}
                >
                  Confirm Report
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Emergency Sheet Instance */}
          <EmergencySheet open={emergencyOpen} onOpenChange={setEmergencyOpen} />
        </section>
      </div>
    </AppShell>
  );
}
