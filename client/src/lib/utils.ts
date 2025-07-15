import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CATEGORIES = {
  PROVERB: 1,
  MUSIC: 2,
  ART: 3,
  STORY: 4,
};

export const REGIONS = [
  { label: "Kigali", value: "Kigali" },
  { label: "Northern Province", value: "Northern Province" },
  { label: "Southern Province", value: "Southern Province" },
  { label: "Eastern Province", value: "Eastern Province" },
  { label: "Western Province", value: "Western Province" },
  { label: "All Regions", value: "All Regions" },
];

export const proverbCategories = [
  { label: "Life Wisdom", value: "Life Wisdom" },
  { label: "Work Ethics", value: "Work Ethics" },
  { label: "Relationships", value: "Relationships" },
  { label: "Nature", value: "Nature" },
  { label: "Community", value: "Community" },
  { label: "Leadership", value: "Leadership" },
  { label: "Wealth & Poverty", value: "Wealth & Poverty" },
  { label: "Health", value: "Health" },
  { label: "Justice & Fairness", value: "Justice & Fairness" },
  { label: "Wisdom & Knowledge", value: "Wisdom & Knowledge" },
  { label: "Time & Patience", value: "Time & Patience" },
  { label: "Humility & Pride", value: "Humility & Pride" },
  { label: "Courage & Fear", value: "Courage & Fear" },
  { label: "Honesty & Deceit", value: "Honesty & Deceit" },
  { label: "Change & Adaptation", value: "Change & Adaptation" },
  { label: "Tradition & Culture", value: "Tradition & Culture" },
  { label: "Luck & Fate", value: "Luck & Fate" },
  { label: "Teaching & Learning", value: "Teaching & Learning" },
  { label: "Self-Control", value: "Self-Control" },
  { label: "Perseverance", value: "Perseverance" },
];
