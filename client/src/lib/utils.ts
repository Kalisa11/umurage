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