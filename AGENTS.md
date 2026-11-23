# SaferStreets Agent Rules
Source of truth: docs/blueprint/ (index: docs/INDEX.md). Read ONLY the sections a task names.
Stack: pnpm monorepo. apps/web = Next.js App Router + TS + Tailwind + shadcn/ui + TanStack Query + React Hook Form + Zod.
apps/api = Express + TS + Prisma + PostgreSQL. packages/shared = Zod schemas, enums, types.

Rules
1. No mock data in shipped code. Real DB, real endpoints. Demo data only via the seed script.
2. Every endpoint: Zod validation, requireAuth/RBAC, central error shape, rate limit (blueprint 07, 09).
3. Every screen: skeleton loading, empty, error, success states. Mobile-first. WCAG 2.2 AA.
4. Design tokens only, no hard-coded colours. Red is for emergencies/destructive actions only.
5. Never claim or build live GPS, police integration, push notifications, or payments.
6. Before finishing: run typecheck, lint and tests. Fix failures. Never report untested work as done.
7. Make small commits with clear messages.
8. Update docs/PROGRESS.md (max 15 lines: done / next / known issues).
9. Final report: max 10 lines. Do not restate the task or explain basics.
10. Ask only if truly blocked. Otherwise decide, and note the decision in PROGRESS.md.