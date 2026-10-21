import Link from "next/link";

const services = [
  {
    title: "Complimentary Shipping",
    body: "Free standard delivery on every order, with signature on arrival.",
    href: "/shipping",
  },
  {
    title: "Returns & Exchanges",
    body: "Return or exchange any unworn piece within 30 days.",
    href: "/returns",
  },
  {
    title: "Signature Gift Wrapping",
    body: "Every order arrives boxed and ribboned, ready to give.",
    href: "/services/gifting",
  },
];

export function Services() {
  return (
    <section className="container-page section">
      <h2 className="sr-only">Our services</h2>
      <ul className="grid gap-10 text-center md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
        {services.map((service) => (
          <li key={service.title} className="flex flex-col items-center gap-3 md:px-8">
            <h3 className="type-subtitle">{service.title}</h3>
            <p className="max-w-xs type-caption text-muted">{service.body}</p>
            <Link href={service.href} className="link-cta type-caption">
              Learn more
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
