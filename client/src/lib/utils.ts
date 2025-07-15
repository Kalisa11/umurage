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
