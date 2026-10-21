import { ProductRail } from "@/components/home/product-rail";
import { SectionHeading } from "@/components/section-heading";
import { getGiftEdit } from "@/lib/products";

export async function GiftEdit() {
  const giftEdit = await getGiftEdit();

  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading title="The Gift Edit" link={{ label: "Shop all gifts", href: "/gifts" }} />
      </div>
      <ProductRail products={giftEdit} label="Gift ideas" />
    </section>
  );
}
