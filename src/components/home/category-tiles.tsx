import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { getFeaturedCategories } from "@/lib/products";

export async function CategoryTiles() {
  const categories = await getFeaturedCategories();

  return (
    <section className="container-page section">
      <SectionHeading title="Shop by Category" />
      <ul className="grid-tiles">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link href={category.href} className="group block">
              <div className="media-cover aspect-product bg-surface">
                <Image
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  sizes="(min-width: 48rem) 25vw, 50vw"
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-4 text-center">{category.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
