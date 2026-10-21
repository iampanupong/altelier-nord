"use client";

import { useEffect, useState } from "react";

// Confirms locally; there is no cart yet.
export function AddToBag({ productName, inStock }: { productName: string; inStock: boolean }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timeout = setTimeout(() => setAdded(false), 3000);
    return () => clearTimeout(timeout);
  }, [added]);

  if (!inStock) {
    return (
      <button type="button" className="btn btn-primary btn-block" disabled>
        Sold Out
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button type="button" className="btn btn-primary btn-block" onClick={() => setAdded(true)}>
        {added ? "Added to Bag" : "Add to Bag"}
      </button>
      <p className="min-h-5 text-center type-caption text-muted" aria-live="polite">
        {added && `${productName} has been added to your bag.`}
      </p>
    </div>
  );
}
