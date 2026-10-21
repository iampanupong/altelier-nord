"use client";

import { useState } from "react";
import { HeartIcon } from "@/components/icons";

// Local toggle only; not persisted until a wishlist exists.
export function WishlistButton({
  productName,
  className = "",
}: {
  productName: string;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      className={`btn-icon ${className}`}
      aria-label={`Save ${productName} to wishlist`}
      aria-pressed={saved}
      onClick={() => setSaved((value) => !value)}
    >
      <HeartIcon fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
