import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

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

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

/**
 * Generates a Google Maps embed URL from coordinates or address
 * @param lat - Latitude coordinate
 * @param lng - Longitude coordinate
 * @param address - Optional address string (used as fallback if coordinates not provided)
 * @returns Google Maps embed URL
 */
export function generateGoogleMapsEmbedUrl(
  lat?: number | null,
  lng?: number | null,
  address?: string | null
): string {
  // If we have coordinates, use them for precise location
  if (lat && lng) {
    // Use a simpler embed URL format that properly centers on coordinates
    return `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${lat},${lng}&zoom=14`;
  }
  if (address) {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodedAddress}&zoom=14`;
  }

  // If we have an address but no coordinates, use the address

  // Default fallback to a general location (Kigali, Rwanda)
  return `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=Kigali,Rwanda&zoom=12`;
}

/**
 * Extracts coordinates from a Google Maps URL
 * @param url - Google Maps URL
 * @returns Object with lat and lng, or null if not found
 */
export function extractCoordinatesFromUrl(
  url: string
): { lat: number; lng: number } | null {
  try {
    // Handle different Google Maps URL formats
    const urlObj = new URL(url);

    // Format: https://www.google.com/maps?q=lat,lng
    if (urlObj.searchParams.has("q")) {
      const q = urlObj.searchParams.get("q");
      const coords = q?.split(",").map(Number);
      if (
        coords &&
        coords.length === 2 &&
        !isNaN(coords[0]) &&
        !isNaN(coords[1])
      ) {
        return { lat: coords[0], lng: coords[1] };
      }
    }

    // Format: https://www.google.com/maps/@lat,lng,zoom
    const pathMatch = urlObj.pathname.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (pathMatch) {
      const lat = parseFloat(pathMatch[1]);
      const lng = parseFloat(pathMatch[2]);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }

    // Format: https://www.google.com/maps/place/.../@lat,lng,zoom
    const placeMatch = url.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (placeMatch) {
      const lat = parseFloat(placeMatch[1]);
      const lng = parseFloat(placeMatch[2]);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }

    return null;
  } catch {
    return null;
  }
}
