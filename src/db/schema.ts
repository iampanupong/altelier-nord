// Drizzle table definitions live here.
// Better Auth tables can be generated with: npx @better-auth/cli generate
import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export type ImageAsset = {
  src: string;
  alt: string;
};

export const productLabel = pgEnum("product_label", ["New", "Exclusive", "Limited Edition"]);

export const categories = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(),
  name: text().notNull(),
  /** Tile image on the home page; only featured categories need one */
  imageUrl: text("image_url"),
  imageAlt: text("image_alt"),
  featured: boolean().notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const products = pgTable(
  "products",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    /** Customer-facing reference, e.g. "P-001" */
    sku: text().notNull().unique(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    slug: text().notNull().unique(),
    name: text().notNull(),
    description: text().notNull(),
    details: text().array().notNull().default(sql`'{}'::text[]`),
    /** First image is the primary/listing image */
    images: jsonb().$type<ImageAsset[]>().notNull(),
    priceCents: integer("price_cents").notNull(),
    stock: integer().notNull().default(0),
    label: productLabel(),
    isGift: boolean("is_gift").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("products_category_id_idx").on(table.categoryId),
    index("products_created_at_idx").on(table.createdAt),
    check("products_price_cents_nonnegative", sql`${table.priceCents} >= 0`),
    check("products_stock_nonnegative", sql`${table.stock} >= 0`),
  ],
);

export type CategoryRow = typeof categories.$inferSelect;
export type ProductRow = typeof products.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type NewProduct = typeof products.$inferInsert;
