# Blueprint Index

## Blueprint Sections

- [docs/blueprint/01-product.md](file:///c:/Users/ARNAV/Documents/College/MMP-finale/MMP-Finale/docs/blueprint/01-product.md): Section 1 – Product definition, overview, problem statement, key flows, non-goals, and boundary conditions.
- [docs/blueprint/02-features.md](file:///c:/Users/ARNAV/Documents/College/MMP-finale/MMP-Finale/docs/blueprint/02-features.md): Section 2 – Feature breakdown for SafeRoute (2A), AutoMate (2B), JourneyGuard (2C), and SafeAlert (2D).
- [docs/blueprint/03-roles.md](file:///c:/Users/ARNAV/Documents/College/MMP-finale/MMP-Finale/docs/blueprint/03-roles.md): Section 3 – User roles (USER, MODERATOR, ADMIN) and detailed RBAC permission matrix.
- [docs/blueprint/04-ui.md](file:///c:/Users/ARNAV/Documents/College/MMP-finale/MMP-Finale/docs/blueprint/04-ui.md): Section 4 – UI/UX blueprint, design tokens, layout shell, global UI states, and screen specs (S1–S33).
- [docs/blueprint/05-flows.md](file:///c:/Users/ARNAV/Documents/College/MMP-finale/MMP-Finale/docs/blueprint/05-flows.md): Section 5 – Complete user flows with Mermaid sequence and state diagrams.
- [docs/blueprint/06-database.md](file:///c:/Users/ARNAV/Documents/College/MMP-finale/MMP-Finale/docs/blueprint/06-database.md): Section 6 – Database design, PostgreSQL schema, tables, enums, relationships, indexes, and retention rules.
- [docs/blueprint/07-backend.md](file:///c:/Users/ARNAV/Documents/College/MMP-finale/MMP-Finale/docs/blueprint/07-backend.md): Section 7 – Backend modular monolith architecture, REST endpoints, services, error format, and background jobs.
- [docs/blueprint/08-stack.md](file:///c:/Users/ARNAV/Documents/College/MMP-finale/MMP-Finale/docs/blueprint/08-stack.md): Section 8 – Technology stack selections, rationale, and deliberately excluded technologies.
- [docs/blueprint/09-security.md](file:///c:/Users/ARNAV/Documents/College/MMP-finale/MMP-Finale/docs/blueprint/09-security.md): Section 9 – Security and privacy specifications, OTP auth rules, rate limits, PII protection, and safety guardrails.
- [docs/blueprint/10-roadmap.md](file:///c:/Users/ARNAV/Documents/College/MMP-finale/MMP-Finale/docs/blueprint/10-roadmap.md): Section 10 – 10-phase development roadmap, implementation order, and milestones.
- [docs/blueprint/11-testing.md](file:///c:/Users/ARNAV/Documents/College/MMP-finale/MMP-Finale/docs/blueprint/11-testing.md): Section 11 – Testing strategy, unit/integration/E2E coverage, edge cases, and permission suites.
- [docs/blueprint/12-checklist.md](file:///c:/Users/ARNAV/Documents/College/MMP-finale/MMP-Finale/docs/blueprint/12-checklist.md): Section 12 – Final project checklist and consistency checks before launch.

## Screen Index (S1–S33)

| Screen ID | Screen Name & Route                            | Module             |
| --------- | ---------------------------------------------- | ------------------ |
| S1        | Landing page (`/`)                             | Public & Auth      |
| S2        | Login / Register (`/login`)                    | Public & Auth      |
| S3        | OTP verification (`/verify`)                   | Public & Auth      |
| S4        | Onboarding / Profile setup (`/welcome`)        | Public & Auth      |
| S5        | Dashboard (`/dashboard`)                       | Dashboard          |
| S6        | Report list/map (`/saferoute`)                 | SafeRoute          |
| S7        | New report (`/saferoute/new`)                  | SafeRoute          |
| S8        | Report detail (`/saferoute/[id]`)              | SafeRoute          |
| S9        | My reports (`/saferoute/mine`)                 | SafeRoute          |
| S10       | Browse rides (`/automate`)                     | AutoMate           |
| S11       | Create ride (`/automate/new`)                  | AutoMate           |
| S12       | Ride detail (`/automate/[id]`)                 | AutoMate           |
| S13       | My rides (`/automate/mine`)                    | AutoMate           |
| S14       | Ride chat (`/automate/[id]/chat`) [OPT]        | AutoMate           |
| S15       | JourneyGuard home (`/journeyguard`)            | JourneyGuard       |
| S16       | Start journey (`/journeyguard/new`)            | JourneyGuard       |
| S17       | Active journey detail (`/journeyguard/[id]`)   | JourneyGuard       |
| S18       | Journey history (`/journeyguard/history`)      | JourneyGuard       |
| S19       | Emergency contacts (`/journeyguard/contacts`)  | JourneyGuard       |
| S20       | Trusted-contact status page (`/track/[token]`) | JourneyGuard       |
| S21       | Alerts feed (`/safealert`)                     | SafeAlert          |
| S22       | New alert (`/safealert/new`)                   | SafeAlert          |
| S23       | Alert detail (`/safealert/[id]`)               | SafeAlert          |
| S24       | Alert preferences (`/settings` tab)            | SafeAlert          |
| S25       | Notification centre (`/notifications`)         | Core / Account     |
| S26       | Profile (`/profile`)                           | Core / Account     |
| S27       | Settings (`/settings`)                         | Core / Account     |
| S28       | Admin overview (`/admin`)                      | Admin / Moderation |
| S29       | Moderation queue (`/admin/moderation`)         | Admin / Moderation |
| S30       | Flags (`/admin/flags`)                         | Admin / Moderation |
| S31       | User management (`/admin/users`)               | Admin / Moderation |
| S32       | Audit log (`/admin/audit`)                     | Admin / Moderation |
| S33       | System settings (`/admin/settings`)            | Admin / Moderation |
