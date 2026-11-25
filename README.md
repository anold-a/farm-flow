# SmartSeason (farm-flow)

A field monitoring app for farm admins and field agents. Admins register fields, crops and users and assign fields to agents. Agents track the fields assigned to them, log updates, and watch crop stages and alerts in one place.

**Live demo:** https://farm-flow-mu.vercel.app
**Backend API:** hosted on Render (free tier, so the first request after idle can take about a minute)



## Features

- **Role-based access:** `ADMIN` and `AGENT` roles, enforced on the server with JWT authentication
- **Fields:** register fields with crop, location, acreage and status, and assign or unassign agents
- **Crops and growth stages:** track expected vs actual stage (planted to harvested)
- **Alerts:** severity levels (info, warning, critical) per field, with resolve state
- **Field updates:** agents log notes, moisture, temperature and humidity
- **Notifications:** in-app notifications for assignments and access requests
- **User management:** admins create and delete users
- **Audit logs:** create, update, delete and assign actions are recorded
- **Sample data for new agents:** every new agent gets one sample field with a crop, alerts and updates, so no page is blank on first login. Admin views hide sample data.
- **Responsive layout** with a mobile drawer navigation

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS v4 |
| Backend | NestJS, TypeScript, Passport JWT, class-validator |
| Database | PostgreSQL with Prisma 7 (driver adapter `@prisma/adapter-pg`) |
| Hosting | Vercel (frontend), Render (backend), Neon (database) |

## Project structure

```
farm-flow/
├── backend/     NestJS API + Prisma schema and migrations
└── frontend/    Next.js app
```

## Getting started locally

### Prerequisites

- Node.js 20 or newer
- pnpm
- A PostgreSQL database (local, or a free Neon project)

### 1. Backend

```bash
cd backend
pnpm install
```

Create `backend/.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require"
JWT_SECRET="a-long-random-string"
FRONTEND_URL="http://localhost:3000"
PORT=4000
```

Apply the migrations and start the API:

```bash
pnpm prisma migrate dev
pnpm start:dev
```

The API runs at `http://localhost:4000/api`.

### 2. Frontend

```bash
cd frontend
pnpm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
```

```bash
pnpm dev
```

Open `http://localhost:3000`.

### 3. Create an admin

New accounts register as `AGENT`. To make yourself an admin, register first, then run in your database:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'you@example.com';
```

Log out and back in so your token picks up the new role.

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `DATABASE_URL` | backend | PostgreSQL connection string |
| `JWT_SECRET` | backend | Secret used to sign login tokens (never expose it) |
| `FRONTEND_URL` | backend | Exact frontend origin for CORS, with no trailing slash |
| `PORT` | backend | Port to listen on (set by the host in production) |
| `NEXT_PUBLIC_API_URL` | frontend | Base URL of the API, including `/api` |

## Scripts (backend)

| Command | What it does |
|---|---|
| `pnpm start:dev` | Run the API in watch mode |
| `pnpm build` | Compile to `dist/` |
| `pnpm start:prod` | Run the compiled app (`node dist/src/main`) |
| `pnpm db:seed` | Run the seed script |
| `pnpm prisma migrate deploy` | Apply migrations in production |

## Deployment

1. **Database:** create a Postgres database on Neon and copy its connection string.
2. **Backend (Render):**
   - Root directory: `backend`
   - Build command: `pnpm install --prod=false && pnpm prisma migrate deploy && pnpm build`
   - Start command: `pnpm start:prod`
   - Environment: `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL`, `NODE_ENV=production`
3. **Frontend (Vercel):** set `NEXT_PUBLIC_API_URL` to the Render URL plus `/api`, then redeploy. `NEXT_PUBLIC_` values are baked in at build time.

## Data model

Main models: `User`, `Field`, `Crop`, `FieldUpdate`, `Alert`, `Notification` and `AuditLog`. A field belongs to the admin who created it and can be assigned to one agent. Crops, alerts and field updates are removed automatically when their field is deleted. The `isDemo` flag on `Field` marks the per-agent sample data.

## What I learned

- Designing a role-based API with NestJS guards and Prisma relations
- Deploying a split stack (Vercel, Render, Neon) and fixing real production issues: CORS origins, build paths, environment variables and Prisma 7 driver adapters
- Handling empty states with seeded sample data so first-time users see how the app works

## Roadmap

- Move the login token from localStorage to an HttpOnly cookie
- Automated tests for the services
- Delete-sample-data button for agents
- Weather forecasts connected to field locations

## Author

**Arnold Amani**, Nyeri, Kenya
GitHub: [anold-a](https://github.com/anold-a)