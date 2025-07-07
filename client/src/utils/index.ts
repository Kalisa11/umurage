import { BookOpen, Languages, Music, Paintbrush, MessageSquare } from "lucide-react";

export const getTypeIcon = (type: string) => {
  switch (type) {
    case "workshop":
      return "🎨";
    case "performance":
      return "🎭";
    case "cultural":
      return "📚";
    case "tour":
      return "🚶";
    default:
      return "📅";
  }
};

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Stories":
      return BookOpen;
    case "Proverbs":
      return MessageSquare;
    case "Music":
      return Music;
    case "Art":
      return Paintbrush;
    case "language":
      return Languages;
    default:
      return BookOpen;
  }
};
