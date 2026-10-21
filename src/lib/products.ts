// Server-side catalog queries. Import only from server code.
// Reads are cached and tagged "catalog"; call revalidateTag("catalog") after writes.

import { desc, eq, ne, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { categoryHref, type Collection, type Product } from "@/lib/catalog";

function cacheCatalog() {
  cacheTag("catalog");
  cacheLife("hours");
}

function selectProducts() {
  return db
    .select({
      id: products.id,
      sku: products.sku,
      slug: products.slug,
      name: products.name,
      description: products.description,
      details: products.details,
      images: products.images,
      priceCents: products.priceCents,
      stock: products.stock,
      label: products.label,
      categorySlug: categories.slug,
      categoryName: categories.name,
    })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .$dynamic();
}

type ProductQueryRow = Awaited<ReturnType<typeof selectProducts>>[number];

function toProduct({ priceCents, categorySlug, categoryName, ...row }: ProductQueryRow): Product {
  return {
    ...row,
    price: priceCents / 100,
    category: { slug: categorySlug, name: categoryName },
  };
}

const newestFirst = [desc(products.createdAt), desc(products.id)];

export async function getFeaturedCategories(): Promise<Collection[]> {
  "use cache";
  cacheCatalog();

  const rows = await db
    .select()
    .from(categories)
    .where(eq(categories.featured, true))
    .orderBy(categories.sortOrder, categories.name);

  return rows.flatMap((category) =>
    category.imageUrl
      ? [
          {
            slug: category.slug,
            title: category.name,
            href: categoryHref(category.slug),
            image: { src: category.imageUrl, alt: category.imageAlt ?? "" },
          },
        ]
      : [],
  );
}

export async function getNewArrivals(limit = 8) {
  "use cache";
  cacheCatalog();

  const rows = await selectProducts()
    .orderBy(...newestFirst)
    .limit(limit);
  return rows.map(toProduct);
}

export async function getGiftEdit(limit = 12) {
  "use cache";
  cacheCatalog();

  const rows = await selectProducts()
    .where(eq(products.isGift, true))
    .orderBy(...newestFirst)
    .limit(limit);
  return rows.map(toProduct);
}

export async function getProduct(slug: string) {
  "use cache";
  cacheCatalog();

  const [row] = await selectProducts().where(eq(products.slug, slug)).limit(1);
  return row ? toProduct(row) : null;
}

/** Other products, same category first */
export async function getRelatedProducts(productId: number, categorySlug: string, limit = 4) {
  "use cache";
  cacheCatalog();

  const rows = await selectProducts()
    .where(ne(products.id, productId))
    .orderBy(desc(sql`${categories.slug} = ${categorySlug}`), ...newestFirst)
    .limit(limit);
  return rows.map(toProduct);
}

export async function getProductSlugs() {
  "use cache";
  cacheCatalog();

  return db.select({ slug: products.slug }).from(products);
}
