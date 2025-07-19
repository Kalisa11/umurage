import { CATEGORIES } from "@/lib/utils";
import { Category } from "@/types";
import Image from "next/image";

export const renderCategoryImage = (category: Category) => {
  if (category.id === CATEGORIES.ART) {
    return (
      <Image
        src={"/art.jpg"}
        alt={category.name}
        fill
        className="object-cover transition-transform"
      />
    );
  }
  if (category.id === CATEGORIES.PROVERB) {
    return (
      <Image
        src={"/proverb.png"}
        alt={category.name}
        fill
        className="object-cover transition-transform"
      />
    );
  }
  if (category.id === CATEGORIES.STORY) {
    return (
      <Image
        src={"/story.jpg"}
        alt={category.name}
        fill
        className="object-cover transition-transform"
      />
    );
  }
  if (category.id === CATEGORIES.MUSIC) {
    return (
      <Image
        src={"/music.png"}
        alt={category.name}
        fill
        className="object-cover transition-transform"
      />
    );
  }
  return (
    <Image
      src={"/placeholder.png"}
      alt={category.name}
      fill
      className="object-cover transition-transform"
    />
  );
};
