"use client";

import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/catalog";

export function ProductRail({ products, label }: { products: Product[]; label: string }) {
  const listRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: 1 | -1) => {
    const list = listRef.current;
    if (!list) return;
    list.scrollBy({ left: direction * list.clientWidth * 0.75, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul ref={listRef} className="scroll-row" aria-label={label}>
        {products.map((product) => (
          <li key={product.id} className="w-[70%] sm:w-[45%] md:w-1/4">
            <ProductCard product={product} sizes="(min-width: 48rem) 25vw, 70vw" />
          </li>
        ))}
      </ul>
      <div className="pointer-events-none absolute inset-x-0 top-[calc(50%-3rem)] hidden justify-between px-4 md:flex">
        <button
          type="button"
          className="btn-icon pointer-events-auto bg-white hover:bg-surface"
          aria-label="Scroll back"
          onClick={() => scroll(-1)}
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          className="btn-icon pointer-events-auto bg-white hover:bg-surface"
          aria-label="Scroll forward"
          onClick={() => scroll(1)}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
