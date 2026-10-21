// Seeds the sample catalog. Run with `pnpm db:seed` after `pnpm db:migrate`.
// Upserts on slug, so it is safe to re-run.

import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { getTableColumns, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import type { PgTable } from "drizzle-orm/pg-core";
import { categories, products } from "./schema.ts";
import { seedCategories, seedProducts } from "./seed-data.ts";

config({ path: [".env.local", ".env"], quiet: true });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const db = drizzle(neon(process.env.DATABASE_URL));

/** `SET col = excluded.col` for every column except the listed ones */
function excludedExcept<T extends PgTable>(table: T, skip: string[]) {
  return Object.fromEntries(
    Object.entries(getTableColumns(table))
      .filter(([key]) => !skip.includes(key))
      .map(([key, column]) => [key, sql.raw(`excluded."${column.name}"`)]),
  );
}

// Fixed timestamps keep re-runs idempotent and preserve the list order (first = newest)
const seededAt = new Date("2026-01-01T00:00:00Z").getTime();
const hour = 60 * 60 * 1000;

const categoryRows = await db
  .insert(categories)
  .values(
    seedCategories.map((category) => ({
      slug: category.slug,
      name: category.name,
      imageUrl: category.image?.src ?? null,
      imageAlt: category.image?.alt ?? null,
      featured: category.featured ?? false,
      sortOrder: category.sortOrder ?? 0,
    })),
  )
  .onConflictDoUpdate({
    target: categories.slug,
    set: excludedExcept(categories, ["id", "slug", "createdAt"]),
  })
  .returning({ id: categories.id, slug: categories.slug });

const categoryIds = new Map(categoryRows.map((row) => [row.slug, row.id]));

const productRows = await db
  .insert(products)
  .values(
    seedProducts.map((product, index) => {
      const categoryId = categoryIds.get(product.categorySlug);
      if (!categoryId) throw new Error(`Unknown category "${product.categorySlug}"`);

      return {
        sku: product.sku,
        slug: product.slug,
        name: product.name,
        categoryId,
        description: product.description,
        details: product.details,
        images: product.images,
        priceCents: Math.round(product.price * 100),
        stock: product.stock,
        label: product.label ?? null,
        isGift: product.isGift ?? false,
        createdAt: new Date(seededAt - index * hour),
      };
    }),
  )
  .onConflictDoUpdate({
    target: products.slug,
    set: { ...excludedExcept(products, ["id", "slug", "updatedAt"]), updatedAt: sql`now()` },
  })
  .returning({ id: products.id });

console.log(`Seeded ${categoryRows.length} categories and ${productRows.length} products.`);
