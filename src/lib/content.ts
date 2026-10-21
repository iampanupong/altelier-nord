// Editorial content for the home page (not catalog data).

import type { Collection, ImageAsset } from "@/lib/catalog";
import { unsplash } from "@/lib/unsplash";

export const heroImage: ImageAsset = {
  src: unsplash("1539533018447-63fcce2678e3"),
  alt: "Woman in a camel wool coat walking past a stone wall",
};

export const editorialStories: (Collection & { overline: string; cta: string })[] = [
  {
    slug: "women",
    overline: "Women",
    title: "Tailored for the Cold",
    cta: "Explore the collection",
    href: "/women",
    image: {
      src: unsplash("1485968579580-b6d095142e6e"),
      alt: "Woman in a dark plaid coat on a city street",
    },
  },
  {
    slug: "men",
    overline: "Men",
    title: "The Leather Season",
    cta: "Explore the collection",
    href: "/men",
    image: {
      src: unsplash("1520975954732-35dd22299614"),
      alt: "Man in a black leather jacket and sunglasses crouching against a brick wall",
    },
  },
];

export const atelierStory = {
  overline: "Savoir-Faire",
  title: "Inside the Atelier",
  body: "Every piece begins at the cutting table, where hides are selected by hand and each panel is traced, cut and stitched by a single artisan. It is slow work, and it is meant to be.",
  cta: "Discover our craft",
  href: "/craftsmanship",
  image: {
    src: unsplash("1558769132-cb1aea458c5e"),
    alt: "Rail of neutral-toned knitwear and coats in a bright studio",
  },
};
