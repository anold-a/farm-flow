# SmartSeason

A role-based crop field monitoring system for farm cooperatives and agronomy teams. Admins manage fields, crops, and agents across the whole farm; field agents log conditions and manage what's assigned to them — with alerts, recommendations, and crop intelligence built from real field data, not guesswork.

**Live demo:** [smartseason.vercel.app](coming soon)

---

## What it does

- **Role-based access** — Admins see and manage the whole farm; agents only see their assigned fields, enforced on the backend, not just hidden in the UI.
- **Field & crop management** — register fields, assign agents, track crops through seven growth stages calculated automatically from planting date.
- **Field updates** — agents log soil moisture, temperature, and humidity per field, building a real history over time.
- **Weather integration** — live current conditions and 5-day forecast per field, cached to reduce external API calls.
- **Crop intelligence** — combines growth stage, recent updates, and weather to produce a health status (Healthy / Needs Attention / At Risk) with plain-language insights.
- **Recommendations** — a rule-based engine that turns conditions into concrete advice ("irrigate now," "delay watering," "inspect in person"). High and medium-priority recommendations surface directly on the Alerts page; low-priority ones stay on the field's own detail page, so urgent items aren't buried among routine ones.
- **Alerts** — automatic detection of critical moisture, extreme temperature, declining trends, and overdue updates, with duplicate prevention so the same issue doesn't spam repeatedly.
- **Dark control-room dashboard** — a real-time overview combining field status, crop growth-stage timelines, recent alerts, sensor averages, and moisture trends in one view, built entirely from live data (no fabricated stats).
- **Notifications** — in-app notifications tied to real events (a field assignment, a new update, an alert).
- **Analytics & reporting** — farm-wide or agent-scoped statistics, crop distribution, moisture trends, and CSV export for fields, crops, alerts, and analytics.
- **Audit logging** — every meaningful mutation (user created, field reassigned, crop added) is recorded with who did it and when.
- **Security overview page** — a per-user view of authentication status, permissions, and recent account activity, computed server-side so the frontend never has to guess what a user is allowed to do.

---

## Tech stack

**Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, Recharts
**Backend:** NestJS, TypeScript, Prisma ORM
**Database:** PostgreSQL
**Auth:** JWT-based authentication with role guards (`ADMIN` / `AGENT`)
**External APIs:** OpenWeatherMap (current weather + forecast)

---

## Architecture

```
Next.js (frontend)
      │
      ▼
service layer (fetch + JWT)
      │
      ▼
NestJS controllers
      │
      ▼
JwtAuthGuard → RolesGuard
      │
      ▼
services (business logic)
      │
      ▼
Prisma
      │
      ▼
PostgreSQL
```

Every protected route checks two things in order: **is this user authenticated** (JWT valid), then **is this user authorized** (role and, where relevant, resource ownership — e.g. an agent can only touch fields assigned to them). Authorization is enforced server-side; the frontend's role checks are for UX only.

---

## Getting started

### Prerequisites
- Node.js 20+
- pnpm (or npm)
- A PostgreSQL database
- An OpenWeatherMap API key (free tier)

### Backend

```bash
cd backend
pnpm install
```

Create `backend/.env`:
```
DATABASE_URL="postgresql://user:password@host:port/database"
JWT_SECRET="your-secret-here"
OPENWEATHER_API_KEY="your-key-here"
PORT=4000
```

```bash
npx prisma migrate dev
npx prisma generate
pnpm run start:dev
```

### Frontend

```bash
cd frontend
pnpm install
```

Create `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
```

```bash
pnpm run dev
```

---

## Roles & permissions

| Action | Admin | Agent |
|---|---|---|
| Manage users | ✅ | ❌ |
| View audit logs | ✅ | ❌ |
| Manage all fields | ✅ | ❌ |
| View/update assigned fields | ✅ | ✅ (assigned only) |
| Assign agents to fields | ✅ | ❌ |
| Create/view crops | ✅ | View active crop only |
| View farm-wide analytics | ✅ | Assigned-field analytics only |
| Export reports | ✅ (full) | ✅ (assigned-only) |

---

## Known limitations

- **Database sleep (if hosted on a free tier):** some free-tier PostgreSQL hosts power off after a period of inactivity. If the live demo shows a connection error, the database may need a moment to wake up.
- **Backend cold starts (if hosted on a free tier):** the first request after a period of idle time may take 30–60 seconds while a free-tier host spins back up.
- **No real geographic field map:** the dashboard's field overview uses a stylized plot visualization rather than a real satellite/GPS map, since the `Field` model doesn't currently store coordinates or boundary data.
- **Contact form (marketing site):** currently frontend-only; submissions aren't yet sent anywhere.

---

## Project structure

```
backend/
  src/
    auth/              JWT strategy, guards, decorators
    users/             user management (admin only)
    fields/            field CRUD, assignment
    field-updates/     agent-submitted field conditions
    crops/             crop model, growth-stage calculation
    crop-intelligence/ health status + insights
    recommendations/   rule-based advice engine
    alerts/            automatic alert detection
    notifications/     in-app notifications
    weather/           OpenWeatherMap integration
    reports/           CSV export
    analytics/         role-scoped statistics
    audit/             action logging
    security/          per-user security overview

frontend/
  src/
    app/               Next.js App Router pages
    components/        UI components, organized by feature
    hooks/             data-fetching hooks per feature
    services/          API client functions
    types/             shared TypeScript types
```

---

## Author

Built by **Amani Arnold** — [github.com/amanidy](https://github.com/iam-amani)
