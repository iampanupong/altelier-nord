import Image from "next/image";
import Link from "next/link";
import { editorialStories } from "@/lib/content";

export function EditorialSplit() {
  return (
    <section className="grid md:grid-cols-2">
      {editorialStories.map((story) => (
        <Link
          key={story.slug}
          href={story.href}
          className="group media-cover scrim relative block aspect-portrait bg-ink text-white"
        >
          <Image
            src={story.image.src}
            alt={story.image.alt}
            fill
            sizes="(min-width: 48rem) 50vw, 100vw"
            className="transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-3 px-(--gutter) pb-10 text-center md:pb-14">
            <p className="type-overline">{story.overline}</p>
            <h2 className="type-title">{story.title}</h2>
            <span className="link-cta mt-1">{story.cta}</span>
          </div>
        </Link>
      ))}
    </section>
  );
}
