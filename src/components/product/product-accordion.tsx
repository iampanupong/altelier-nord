import type { ReactNode } from "react";

export function ProductAccordion({ items }: { items: { title: string; content: ReactNode }[] }) {
  return (
    <div className="divide-hairline hairline-t hairline-b">
      {items.map((item) => (
        <details key={item.title} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
            {item.title}
            <span
              className="relative size-3 before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-px after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0"
              aria-hidden="true"
            />
          </summary>
          <div className="pb-6 type-caption text-muted">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
