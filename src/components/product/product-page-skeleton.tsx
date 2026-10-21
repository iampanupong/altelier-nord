// Mirrors the product page layout so content streams in without shifting.
export function ProductPageSkeleton() {
  return (
    <div
      className="animate-pulse lg:grid lg:grid-cols-[minmax(0,1fr)_28rem] xl:grid-cols-[minmax(0,1fr)_34rem]"
      aria-busy="true"
      aria-label="Loading product"
    >
      <div className="aspect-product bg-surface" />
      <div className="container-page flex flex-col gap-6 py-8 lg:py-12">
        <div className="h-4 w-32 bg-surface" />
        <div className="flex flex-col gap-3">
          <div className="h-7 w-3/4 bg-surface" />
          <div className="h-5 w-24 bg-surface" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-full bg-surface" />
          <div className="h-4 w-full bg-surface" />
          <div className="h-4 w-2/3 bg-surface" />
        </div>
        <div className="h-12 w-full rounded-pill bg-surface" />
      </div>
    </div>
  );
}
