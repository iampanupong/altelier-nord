import { getStockStatus } from "@/lib/catalog";

const dotColor = {
  "in-stock": "bg-success",
  "low-stock": "bg-danger",
  "out-of-stock": "bg-muted",
} as const;

export function StockStatus({ stock }: { stock: number }) {
  const status = getStockStatus(stock);
  const label =
    status === "out-of-stock"
      ? "Out of stock"
      : status === "low-stock"
        ? `Only ${stock} left`
        : "In stock";

  return (
    <p className="flex items-center gap-2 type-caption">
      <span className={`size-1.5 rounded-pill ${dotColor[status]}`} aria-hidden="true" />
      {label}
    </p>
  );
}
