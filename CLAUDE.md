# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Stack

Next.js 16 (App Router, `src/` dir, `@/*` → `src/*`), React 19, TypeScript, Tailwind CSS v4, Better Auth, Drizzle ORM, Neon Postgres. Package manager is pnpm.

`next.config.ts` enables `cacheComponents` and `partialPrefetching`, and Tailwind runs through Turbopack via `@tailwindcss/turbopack`. Both settings change how data fetching and caching work compared with older Next.js versions, so check the bundled docs in `node_modules/next/dist/docs/` (per AGENTS.md) before writing data-fetching or caching code.

## Commands

- `pnpm dev`: dev server (Turbopack)
- `pnpm build`: production build. Requires `DATABASE_URL` to be set (see below).
- `pnpm lint`: ESLint (flat config, `eslint-config-next`)
- `pnpm typecheck`: `tsc --noEmit`
- `pnpm db:generate` / `db:migrate` / `db:push` / `db:studio`: drizzle-kit. Migrations are written to `./drizzle`.
- `pnpm db:seed`: upserts the sample catalog from `src/db/seed-data.ts`.

No test framework is set up yet.

pnpm is pinned via `packageManager` in `package.json` (run through corepack). pnpm fails installs on unreviewed dependency build scripts; decisions live in `allowBuilds` in `pnpm-workspace.yaml`. `esbuild` and `unrs-resolver` are denied because their platform binaries install as regular optional packages. When a new dependency triggers `ERR_PNPM_IGNORED_BUILDS`, decide with `pnpm approve <pkg>` or `pnpm approve '!<pkg>'`.

## Environment

Copy `.env.example` to `.env.local`. Required: `DATABASE_URL` (Neon), `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`. `.gitignore` ignores `.env*` except `.env.example`.

`src/db/index.ts` throws at import time if `DATABASE_URL` is missing. Because the auth route imports the db, `next build` fails during page-data collection without it, so CI and hosting environments must set it. `drizzle.config.ts` loads `.env.local` then `.env` itself via `dotenv`, since drizzle-kit runs outside Next.

## Architecture

- **Database:** `src/db/index.ts` exports a single `db` built on Drizzle's `neon-http` driver (stateless HTTP, no interactive transactions). All tables are defined in `src/db/schema.ts`, which is both the drizzle-kit schema source and the schema passed to the Drizzle client and to the Better Auth adapter. It currently holds the catalog (`categories`, `products`).
- **Auth:** `src/lib/auth.ts` is the server-side Better Auth instance, using `drizzleAdapter(db, { provider: "pg", schema })`. Keep `nextCookies()` as the last plugin so Server Actions can set auth cookies. `src/app/api/auth/[...all]/route.ts` mounts it with `toNextJsHandler`. `src/lib/auth-client.ts` is the React client (same-origin, no `baseURL`). Import `auth` only in server code and `authClient` in client components.
- **Auth tables are not created yet.** Better Auth needs user/session/account/verification tables. Generate them into the schema with `pnpm dlx @better-auth/cli generate`, then apply them with `db:generate` + `db:migrate`. Re-run the generator whenever Better Auth plugins that add tables are introduced.

## Database conventions

- **Schema changes go through versioned migrations.** Edit `src/db/schema.ts`, run `pnpm db:generate --name <change>`, review the SQL, commit it, then `pnpm db:migrate`. Don't use `db:push`.
- **Naming:** tables are plural snake_case. Columns are snake_case in SQL and camelCase in TypeScript, with an explicit name (`imageUrl: text("image_url")`). Timestamps are `timestamptz` named `created_at` / `updated_at`.
- **Keys:** primary keys are `integer().generatedAlwaysAsIdentity()` and are never shown to customers. Public identifiers are separate unique columns (`slug` for URLs, `sku` for the "Reference").
- **Money** is stored as integer cents (`price_cents`). Convert to dollars only in the data-access mapper, never in components.
- **Put invariants in the database:** `CHECK` constraints (e.g. price and stock `>= 0`), `UNIQUE`, and foreign keys with `onDelete: "restrict"` unless a cascade is deliberate. Closed value sets use `pgEnum`.
- **Keep it simple until a need appears:** a product has one category and one `stock` number (no variants yet). Ordered lists that are only read with their parent go in `jsonb` or `text[]` columns rather than child tables.
- **Data access:** every query lives in a server-only module in `src/lib/` (catalog: `src/lib/products.ts`), uses `"use cache"` + `cacheTag(...)` + `cacheLife(...)`, and maps rows to plain domain types. Any write must call `revalidateTag` for the affected tag (`"catalog"`). Client components import only types and pure helpers (from `src/lib/catalog.ts`), never `@/db` or a query module.
- **neon-http has no interactive transactions.** Use single statements (e.g. `insert ... onConflictDoUpdate`) or `db.batch([...])`.
- **Seeds must be idempotent** (upsert on a unique key, fixed timestamps). They run on Node's built-in TypeScript support, so `src/db/seed*.ts` and anything they import use relative imports with explicit `.ts` extensions and `import type` for types, and can't use the `@/` alias.
- **Order matters:** `next build` prerenders pages from the database, so run migrate, then seed, then build.

## Design system

Styling is Tailwind v4, configured in CSS (no `tailwind.config`). `src/app/globals.css` imports, in order: `src/styles/theme.css` (`@theme` tokens), `src/styles/base.css` (element defaults and the responsive `--gutter` / `--header-height` / `--section-space` variables), and `src/styles/primitives.css` (`@utility` classes: `container-page`, `section`, `grid-products`, `type-*`, `btn` + `btn-primary|secondary|inverse`, `link*`, `hairline*`, `media-tile`, `scrim`).

Tailwind's default colors, font sizes, radii, shadows, tracking and leading are cleared with `--*: initial`, so classes like `text-zinc-500`, `text-3xl` or `rounded-lg` silently generate nothing. Use the tokens (`text-ink`, `text-muted`, `bg-surface`, `border-line`, `text-heading-m`, `rounded-pill`) or the primitives. Breakpoints are `sm` 40rem, `md` 48rem, `lg` 64rem and `xl` 90rem; there is no `2xl`. Corners are square except pill buttons, and only weights 400 and 500 are loaded (Jost, via `next/font` in `src/app/layout.tsx`).
