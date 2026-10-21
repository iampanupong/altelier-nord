import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AddToBag } from "@/components/product/add-to-bag";
import { ProductAccordion } from "@/components/product/product-accordion";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPageSkeleton } from "@/components/product/product-page-skeleton";
import { StockStatus } from "@/components/product/stock-status";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { WishlistButton } from "@/components/wishlist-button";
import { categoryHref, getStockStatus } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { getProduct, getProductSlugs, getRelatedProducts } from "@/lib/products";

export async function generateStaticParams() {
  return getProductSlugs();
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0].src, alt: product.images[0].alt }],
    },
  };
}

// The params read lives inside Suspense so the route's shell stays URL-independent
// and client navigations can show it instantly.
export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}

async function ProductDetails({ params }: Pick<PageProps<"/products/[slug]">, "params">) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();

  const inStock = getStockStatus(product.stock) !== "out-of-stock";
  const related = await getRelatedProducts(product.id, product.category.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category.name,
    image: product.images.map((image) => image.src),
    sku: product.sku,
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "USD",
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_28rem] xl:grid-cols-[minmax(0,1fr)_34rem]">
        <ProductGallery images={product.images} />

        <div className="container-page py-8 lg:py-12">
          <div className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--header-height)+3rem)]">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap gap-2 type-caption text-muted">
                <li>
                  <Link href="/" className="link">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={categoryHref(product.category.slug)} className="link">
                    {product.category.name}
                  </Link>
                </li>
              </ol>
            </nav>

            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                {product.label && <p className="type-overline text-muted">{product.label}</p>}
                <h1 className="text-heading-s lg:text-heading-m">{product.name}</h1>
                <p className="text-muted">{formatPrice(product.price)}</p>
              </div>
              <WishlistButton productName={product.name} className="-mt-2 -mr-3 shrink-0" />
            </div>

            <p className="type-body">{product.description}</p>

            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 type-caption">
              <dt className="text-muted">Category</dt>
              <dd>
                <Link href={categoryHref(product.category.slug)} className="link">
                  {product.category.name}
                </Link>
              </dd>
              <dt className="text-muted">Reference</dt>
              <dd>{product.sku}</dd>
              <dt className="text-muted">Availability</dt>
              <dd>
                <StockStatus stock={product.stock} />
              </dd>
            </dl>

            <AddToBag productName={product.name} inStock={inStock} />

            <ProductAccordion
              items={[
                {
                  title: "Product Details",
                  content: (
                    <ul className="flex list-disc flex-col gap-1.5 pl-4">
                      {product.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  ),
                },
                {
                  title: "Care",
                  content: (
                    <p>
                      Store in the dust bag provided, away from direct sunlight and humidity. For
                      cleaning or repairs, book an appointment with our after-care service.
                    </p>
                  ),
                },
                {
                  title: "Delivery & Returns",
                  content: (
                    <p>
                      Complimentary standard delivery in 2 to 4 business days. Unworn pieces can
                      be returned or exchanged within 30 days.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>

      <section className="section hairline-t">
        <div className="container-page">
          <SectionHeading title="You May Also Like" />
        </div>
        <ul className="grid-products">
          {related.map((item) => (
            <li key={item.id}>
              <ProductCard product={item} sizes="(min-width: 48rem) 25vw, 50vw" />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
