import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import { getNewArrivals } from "@/lib/products";

export async function NewArrivals() {
  const newArrivals = await getNewArrivals();

  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading title="New Arrivals" link={{ label: "View all", href: "/new" }} />
      </div>
      {/* Full-bleed grid, tiles touching */}
      <ul className="grid-products">
        {newArrivals.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} sizes="(min-width: 48rem) 25vw, 50vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}
