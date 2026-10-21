import { AtelierStory } from "@/components/home/atelier-story";
import { CategoryTiles } from "@/components/home/category-tiles";
import { EditorialSplit } from "@/components/home/editorial-split";
import { GiftEdit } from "@/components/home/gift-edit";
import { Hero } from "@/components/home/hero";
import { NewArrivals } from "@/components/home/new-arrivals";
import { Services } from "@/components/home/services";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryTiles />
      <NewArrivals />
      <EditorialSplit />
      <GiftEdit />
      <AtelierStory />
      <Services />
    </>
  );
}
