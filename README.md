# E-commerce Store

Next.js (App Router) + TypeScript + Tailwind CSS, with Better Auth, Drizzle ORM and Neon Postgres.

## Setup

1. Install dependencies: `pnpm install`
2. Copy `.env.example` to `.env.local` and fill in `DATABASE_URL` (Neon) and `BETTER_AUTH_SECRET`.
3. Start the dev server: `pnpm dev`

## Structure

- `src/db/index.ts` - Drizzle client (Neon HTTP driver)
- `src/db/schema.ts` - Drizzle schema (empty)
- `src/lib/auth.ts` - Better Auth server instance (Drizzle adapter)
- `src/lib/auth-client.ts` - Better Auth React client
- `src/app/api/auth/[...all]/route.ts` - Better Auth route handler
- `drizzle.config.ts` - drizzle-kit config

## Scripts

- `pnpm db:generate` / `db:migrate` / `db:push` / `db:studio` - drizzle-kit
- `pnpm typecheck` - TypeScript check
- `pnpm lint` - ESLint
