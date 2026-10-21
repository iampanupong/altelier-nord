import Image from "next/image";
import Link from "next/link";
import { atelierStory } from "@/lib/content";

export function AtelierStory() {
  return (
    <section className="grid bg-surface md:grid-cols-2">
      <div className="media-cover aspect-portrait md:aspect-auto md:min-h-[40rem]">
        <Image
          src={atelierStory.image.src}
          alt={atelierStory.image.alt}
          fill
          sizes="(min-width: 48rem) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-5 px-(--gutter) py-16 text-center md:px-16">
        <p className="type-overline text-muted">{atelierStory.overline}</p>
        <h2 className="type-title">{atelierStory.title}</h2>
        <p className="max-w-md text-muted">{atelierStory.body}</p>
        <Link href={atelierStory.href} className="btn btn-primary mt-3">
          {atelierStory.cta}
        </Link>
      </div>
    </section>
  );
}
