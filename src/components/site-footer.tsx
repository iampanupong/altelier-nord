import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { footerNav, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="hairline-t">
      <div className="container-page section grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="mb-4 type-overline">{group.title}</h2>
            <ul className="flex flex-col gap-3 type-caption">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link text-muted hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2 className="mb-4 type-overline">Newsletter</h2>
          <p className="mb-6 type-caption text-muted">
            New collections, private events and stories from the atelier.
          </p>
          <NewsletterForm />
        </div>
      </div>
      <div className="hairline-t">
        <div className="container-page flex flex-col items-center gap-2 py-8 text-center">
          <Link href="/" className="text-heading-s tracking-[0.2em] uppercase">
            {siteConfig.name}
          </Link>
          <p className="type-caption text-muted">{siteConfig.description}</p>
        </div>
      </div>
    </footer>
  );
}
