// Sample catalog used by `pnpm db:seed`. Loaded directly by Node, so imports
// are relative with explicit extensions, and type-only imports use `import type`.

import type { ImageAsset } from "./schema.ts";
import { unsplash, unsplashCloseUp } from "../lib/unsplash.ts";

type SeedCategory = {
  slug: string;
  name: string;
  image?: ImageAsset;
  featured?: boolean;
  sortOrder?: number;
};

type SeedProduct = {
  sku: string;
  slug: string;
  name: string;
  categorySlug: string;
  /** In dollars */
  price: number;
  label?: "New" | "Exclusive" | "Limited Edition";
  description: string;
  details: string[];
  stock: number;
  images: ImageAsset[];
  isGift?: boolean;
};

/** Primary shot plus a 2x close-up crop of the same photo */
function productImages(id: string, alt: string, { closeUp = true } = {}): ImageAsset[] {
  const images = [{ src: unsplash(id), alt }];
  if (closeUp) images.push({ src: unsplashCloseUp(id), alt: `Close-up detail: ${alt}` });
  return images;
}

export const seedCategories: SeedCategory[] = [
  {
    slug: "handbags",
    name: "Handbags",
    featured: true,
    sortOrder: 1,
    image: {
      src: unsplash("1605733513597-a8f8341084e6"),
      alt: "Grey pebbled leather satchel with gold buckles",
    },
  },
  {
    slug: "shoes",
    name: "Shoes",
    featured: true,
    sortOrder: 2,
    image: {
      src: unsplash("1543163521-1bf539c55dd2"),
      alt: "Pair of printed pointed heels against a blue wall",
    },
  },
  {
    slug: "jewelry",
    name: "Jewelry",
    featured: true,
    sortOrder: 3,
    image: {
      src: unsplash("1606760227091-3dd870d97f1d"),
      alt: "Gold rings, chains and hoops spread on a table",
    },
  },
  {
    slug: "eyewear",
    name: "Eyewear",
    featured: true,
    sortOrder: 4,
    image: {
      src: unsplash("1511499767150-a48a237f0083"),
      alt: "Round gold-rimmed sunglasses on a white surface",
    },
  },
  { slug: "bags", name: "Bags" },
  { slug: "watches", name: "Watches" },
  { slug: "ready-to-wear", name: "Ready-to-Wear" },
];

/** Newest first: the seed gives earlier entries a later created_at */
export const seedProducts: SeedProduct[] = [
  {
    sku: "P-001",
    slug: "camille-top-handle-bag",
    name: "Camille Top Handle Bag",
    categorySlug: "handbags",
    price: 2950,
    label: "New",
    description:
      "A structured top handle bag in croc-embossed calf leather, closed with a signature turn-lock. Compact enough for evening, roomy enough for every day.",
    details: [
      "Croc-embossed calf leather",
      "Palladium-finish turn-lock closure",
      "Detachable, adjustable shoulder strap",
      "Microfiber lining with flat pocket",
      "25 x 19 x 11 cm",
    ],
    stock: 12,
    images: productImages(
      "1640901555383-7335ec5a6476",
      "Yellow croc-embossed top handle bag with a silver turn-lock",
    ),
  },
  {
    sku: "P-002",
    slug: "cognac-satchel",
    name: "Cognac Satchel",
    categorySlug: "handbags",
    price: 1850,
    label: "New",
    description:
      "A polished satchel in cognac calf leather with buckled straps and two rolled top handles. Built to carry a full day.",
    details: [
      "Polished calf leather",
      "Buckled front straps",
      "Zip top closure",
      "Detachable shoulder strap",
      "32 x 24 x 14 cm",
    ],
    stock: 3,
    images: productImages(
      "1691480150204-66dd1eb77391",
      "Cognac leather satchel with buckled straps and top handles",
    ),
  },
  {
    sku: "P-003",
    slug: "voyage-leather-backpack",
    name: "Voyage Leather Backpack",
    categorySlug: "bags",
    price: 2400,
    description:
      "A soft, full-grain leather backpack that softens and darkens with wear. Padded for a 14-inch laptop.",
    details: [
      "Full-grain leather",
      "Two-way zip closure",
      "Padded laptop compartment",
      "Adjustable padded straps",
      "30 x 42 x 14 cm",
    ],
    stock: 8,
    images: productImages(
      "1622560480605-d83c853bc5c3",
      "Rose-brown leather backpack on a white background",
    ),
  },
  {
    sku: "P-004",
    slug: "atelier-36-watch",
    name: "Atelier 36 Watch",
    categorySlug: "watches",
    price: 3600,
    label: "Exclusive",
    description:
      "A pared-back 36 mm dial with rose-gold hands and hour markers, on a hand-stitched leather strap.",
    details: [
      "36 mm stainless steel case, rose-gold finish",
      "Swiss quartz movement",
      "Sapphire crystal",
      "Hand-stitched leather strap",
      "Water resistant to 50 m",
    ],
    stock: 0,
    images: productImages(
      "1524592094714-0f0654e20314",
      "Minimal white-dial watch with a brown leather strap held in hand",
    ),
  },
  {
    sku: "P-005",
    slug: "perle-necklace",
    name: "Perle Necklace",
    categorySlug: "jewelry",
    price: 1450,
    description:
      "Graduated freshwater pearls hand-knotted on silk and finished with a pavé clasp.",
    details: [
      "Freshwater pearls, 6 to 8 mm",
      "Hand-knotted on silk thread",
      "Sterling silver pavé clasp",
      "Length 45 cm",
    ],
    stock: 15,
    images: productImages("1515562141207-7a88fb7ce338", "Pearl necklace in an open jewelry box"),
  },
  {
    sku: "P-006",
    slug: "saphir-drop-earrings",
    name: "Saphir Drop Earrings",
    categorySlug: "jewelry",
    price: 2100,
    label: "Limited Edition",
    description:
      "Pear-cut blue stones framed in baguette crystals. Made in a numbered run of 200 pairs.",
    details: [
      "Pear-cut blue glass stones",
      "Baguette crystal surround",
      "Rhodium-plated brass",
      "Post back fastening",
      "Drop 4.5 cm",
    ],
    stock: 2,
    images: productImages(
      "1535632066927-ab7c9ab60908",
      "Blue stone drop earrings resting on a green leaf",
    ),
  },
  {
    sku: "P-007",
    slug: "runner-trainer",
    name: "Runner Trainer",
    categorySlug: "shoes",
    price: 1150,
    label: "New",
    description:
      "A lightweight runner in layered suede and technical mesh, set on a cushioned sole.",
    details: [
      "Suede and technical mesh upper",
      "Leather lining",
      "Cushioned rubber outsole",
      "Made in Italy",
    ],
    stock: 20,
    images: productImages("1560769629-975ec94e6a86", "Pair of multicolor trainers on a white block"),
  },
  {
    sku: "P-008",
    slug: "aviator-bomber-jacket",
    name: "Aviator Bomber Jacket",
    categorySlug: "ready-to-wear",
    price: 3200,
    description:
      "A relaxed bomber in washed technical silk with ribbed trims and a two-way zip.",
    details: [
      "Washed technical silk",
      "Ribbed collar, cuffs and hem",
      "Two-way front zip",
      "Two welt pockets",
      "Relaxed fit",
    ],
    stock: 6,
    images: productImages("1591047139829-d91aecb6caea", "Terracotta bomber jacket on a hanger"),
  },
  {
    sku: "P-009",
    slug: "riviera-floral-wrap-dress",
    name: "Riviera Floral Wrap Dress",
    categorySlug: "ready-to-wear",
    price: 1490,
    description:
      "A fluid wrap dress in printed silk crêpe de chine, cut on the bias to move with you.",
    details: [
      "100% silk crêpe de chine",
      "Wrap front with self-tie waist",
      "Flutter sleeves",
      "Midi length",
    ],
    stock: 9,
    images: productImages(
      "1496747611176-843222e1e57c",
      "Model in a white floral wrap dress by the sea",
      { closeUp: false },
    ),
    isGift: true,
  },
  {
    sku: "P-010",
    slug: "sculpted-gold-earrings",
    name: "Sculpted Gold Earrings",
    categorySlug: "jewelry",
    price: 890,
    description: "Twisted hoops cast in recycled brass and finished in 18k gold.",
    details: ["Recycled brass, 18k gold plated", "Hinged clip fastening", "Diameter 2.5 cm"],
    stock: 25,
    images: productImages("1617038260897-41a1f14a8ca0", "Sculpted gold earrings on a pale stone"),
    isGift: true,
  },
  {
    sku: "P-011",
    slug: "selvedge-denim-jacket",
    name: "Selvedge Denim Jacket",
    categorySlug: "ready-to-wear",
    price: 1350,
    label: "New",
    description:
      "Japanese selvedge denim with a corduroy collar, made to fade into its own shape.",
    details: [
      "14 oz Japanese selvedge denim",
      "Corduroy collar",
      "Chest flap pockets",
      "Engraved metal buttons",
    ],
    stock: 4,
    images: productImages(
      "1611312449408-fcece27cdbb7",
      "Indigo denim jacket with a corduroy collar on a hanger",
    ),
    isGift: true,
  },
  {
    sku: "P-012",
    slug: "cashmere-knit-poncho",
    name: "Cashmere Knit Poncho",
    categorySlug: "ready-to-wear",
    price: 1650,
    description: "An open-knit poncho in pure cashmere, finished with a hand-knotted fringe.",
    details: ["100% cashmere", "Open-stitch knit", "Hand-knotted fringe", "One size"],
    stock: 0,
    images: productImages("1434389677669-e08b4cac3105", "Cream open-knit poncho on a wooden hanger"),
    isGift: true,
  },
  {
    sku: "P-013",
    slug: "weekender-nylon-backpack",
    name: "Weekender Nylon Backpack",
    categorySlug: "bags",
    price: 1280,
    description: "Recycled technical nylon with leather trims, sized for a weekend away.",
    details: [
      "Recycled technical nylon",
      "Leather trims",
      "Water-repellent zip",
      "Padded back panel",
      "29 x 44 x 15 cm",
    ],
    stock: 11,
    images: productImages("1553062407-98eeb64c6a62", "Navy nylon backpack standing on a grey floor"),
    isGift: true,
  },
  {
    sku: "P-014",
    slug: "silk-jogger-trousers",
    name: "Silk Jogger Trousers",
    categorySlug: "ready-to-wear",
    price: 980,
    description: "Sand-washed silk trousers with an elasticated waist and cuffed hems.",
    details: [
      "100% sand-washed silk",
      "Elasticated drawstring waist",
      "Side pockets",
      "Cuffed hems",
    ],
    stock: 7,
    images: productImages(
      "1594633312681-425c7b97ccd1",
      "Model wearing blush pink silk jogger trousers",
    ),
    isGift: true,
  },
];
