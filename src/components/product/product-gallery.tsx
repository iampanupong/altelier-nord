import Image from "next/image";
import type { ImageAsset } from "@/lib/catalog";

// Mobile/tablet: swipeable row with the next image peeking. Desktop: images stacked full width.
export function ProductGallery({ images }: { images: ImageAsset[] }) {
  const single = images.length === 1;

  return (
    <ul className="scroll-row gap-px lg:grid lg:gap-px lg:overflow-visible" aria-label="Product images">
      {images.map((image, index) => (
        <li
          key={image.src}
          className={`media-cover aspect-product bg-surface lg:w-full ${single ? "w-full" : "w-[88%] md:w-[60%]"}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload={index === 0}
            sizes="(min-width: 64rem) 60vw, (min-width: 48rem) 60vw, 88vw"
          />
        </li>
      ))}
    </ul>
  );
}
