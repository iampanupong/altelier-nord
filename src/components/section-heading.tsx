import Link from "next/link";

export function SectionHeading({
  title,
  link,
}: {
  title: string;
  link?: { label: string; href: string };
}) {
  return (
    <div className="mb-8 flex flex-col items-center gap-3 text-center md:mb-10">
      <h2 className="type-title">{title}</h2>
      {link && (
        <Link href={link.href} className="link-cta type-caption">
          {link.label}
        </Link>
      )}
    </div>
  );
}
