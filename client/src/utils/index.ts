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