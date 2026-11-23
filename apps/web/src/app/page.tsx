import Link from "next/link";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center space-y-6 relative z-10">
        <div className="flex justify-center">
          <Wordmark size="lg" withTagline />
        </div>

        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Community Safety Reporting, Shared Transit Coordination, Personal Journey Tracking, and
          Urgent Community Alerts.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="primary" size="lg" asChild className="w-full sm:w-auto">
            <Link href="/dev/components">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Explore Design System (/dev/components)</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="pt-8 border-t border-border/60 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-brand-teal" />
            <span>WCAG 2.2 AA Contrast</span>
          </span>
          <span>·</span>
          <span>Mobile-first (360px+)</span>
          <span>·</span>
          <span>Design Tokens Only</span>
        </div>
      </div>
    </main>
  );
}
