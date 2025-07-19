import { useMemo } from "react";
import { Story, Music, Art, Proverb } from "@/types";

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

export const useFilteredMusic = (
  music: Music[],
  searchTerm: string,
  selectedRegion: string
) => {
  return useMemo(() => {
    return music.filter((song) => {
      const matchesSearch =
        searchTerm === "" ||
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.content.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRegion =
        selectedRegion === "All Regions" || song.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [music, searchTerm, selectedRegion]);
};

export const useFilteredArt = (
  art: Art[],
  searchTerm: string,
  selectedRegion: string
) => {
  return useMemo(() => {
    return art.filter((art) => {
      const matchesSearch =
        searchTerm === "" ||
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.content.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRegion =
        selectedRegion === "All Regions" || art.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [art, searchTerm, selectedRegion]);
};

export const useFilteredProverbs = (
  proverbs: Proverb[],
  searchTerm: string,
  selectedRegion: string
) => {
  return useMemo(() => {
    return proverbs.filter((proverb) => {
      const matchesSearch =
        searchTerm === "" ||
        proverb.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proverb.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proverb.content.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRegion =
        selectedRegion === "All Regions" || proverb.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [proverbs, searchTerm, selectedRegion]);
};
