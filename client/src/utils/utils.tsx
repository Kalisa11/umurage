import { CATEGORIES } from "@/lib/utils";
import { Category } from "@/types";
import { BookOpen, MessageSquare, Music, Palette } from "lucide-react";
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

export const getTypeIcon = (type: string) => {
  switch (type) {
    case "stories":
      return <BookOpen className="h-4 w-4" />;
    case "music":
      return <Music className="h-4 w-4" />;
    case "art":
      return <Palette className="h-4 w-4" />;
    case "proverbs":
      return <MessageSquare className="h-4 w-4" />;
    default:
      return null;
  }
};

export const getTypeColor = (type: string) => {
  switch (type) {
    case "stories":
      return "bg-blue-100 text-blue-800";
    case "music":
      return "bg-green-100 text-green-800";
    case "art":
      return "bg-purple-100 text-purple-800";
    case "proverbs":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};