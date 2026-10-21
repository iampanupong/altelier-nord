import Image from "next/image";
import Link from "next/link";
import { heroImage } from "@/lib/content";

export function Hero() {
  return (
    <section className="media-cover scrim relative h-svh min-h-[36rem] bg-ink text-white">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        preload
        sizes="100vw"
        className="object-[center_35%]"
      />
      {/* Keeps the transparent header legible on bright imagery */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-linear-to-b from-black/40 to-transparent" />
      <div className="container-page absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-4 pb-12 text-center md:pb-16">
        <p className="type-overline">Autumn–Winter 2026</p>
        <h1 className="text-heading-l lg:text-display-m">The Season of Quiet Layers</h1>
        <Link href="/new" className="link-cta mt-2">
          Discover the collection
        </Link>
      </div>
    </section>
  );
}
