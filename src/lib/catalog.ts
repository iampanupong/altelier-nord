// Catalog types and pure helpers, safe to import from client components.
// Data comes from the database via src/lib/products.ts.

import type { ImageAsset, ProductRow } from "@/db/schema";

export type { ImageAsset };

export type ProductLabel = NonNullable<ProductRow["label"]>;

export type Product = {
  id: number;
  /** Customer-facing reference, e.g. "P-001" */
  sku: string;
  slug: string;
  name: string;
  category: { slug: string; name: string };
  /** In dollars */
  price: number;
  label: ProductLabel | null;
  description: string;
  details: string[];
  stock: number;
  /** First image is the primary/listing image */
  images: ImageAsset[];
};

export type Collection = {
  slug: string;
  title: string;
  href: string;
  image: ImageAsset;
};

export function categoryHref(categorySlug: string) {
  return `/${categorySlug}`;
}

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export const LOW_STOCK_THRESHOLD = 3;

export function getStockStatus(stock: number): StockStatus {
  if (stock <= 0) return "out-of-stock";
  if (stock <= LOW_STOCK_THRESHOLD) return "low-stock";
  return "in-stock";
}
