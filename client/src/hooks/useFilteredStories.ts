import { useMemo } from "react";
import { Story } from "@/types";

export const useFilteredStories = (
  stories: Story[],
  searchTerm: string,
  selectedRegion: string
) => {
  return useMemo(() => {
    return stories.filter((story) => {
      const matchesSearch =
        searchTerm === "" ||
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.content.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRegion =
        selectedRegion === "All Regions" || story.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [stories, searchTerm, selectedRegion]);
};
