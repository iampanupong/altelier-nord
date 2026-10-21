import Image from "next/image";
import Link from "next/link";
import { WishlistButton } from "@/components/wishlist-button";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product, sizes }: { product: Product; sizes: string }) {
  const [image] = product.images;

  return (
    <article className="group relative flex h-full flex-col bg-surface">
      <div className="media-cover aspect-product">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 px-4 pt-3 pb-5 type-caption md:px-5 md:pb-6">
        {product.stock <= 0 ? (
          <p className="text-muted">Sold Out</p>
        ) : (
          product.label && <p className="text-muted">{product.label}</p>
        )}
        <h3>
          {/* Stretched link: the whole card is clickable */}
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className="text-muted">{formatPrice(product.price)}</p>
      </div>
      <WishlistButton
        productName={product.name}
        className="absolute top-2 right-2 z-10 bg-white/70 backdrop-blur-sm hover:bg-white"
      />
    </article>
  );
}
