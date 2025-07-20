import {
  BookOpen,
  Languages,
  Music,
  Paintbrush,
  MessageSquare,
} from "lucide-react";

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

export const getCategoryIcon = (category: string | undefined) => {
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

export const getCategoryColor = (category: string) => {
  switch (category) {
    case "Stories":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "Music":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Art":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    case "Proverbs":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};
