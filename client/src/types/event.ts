export interface Event {
  id: string;
  title: string;
  description?: string;
  eventDate: string;
  location?: string;
  createdAt?: string;
  isFeatured?: boolean;
  tag?: string | null;
  imageUrl?: string | null;
  price?: number | null;
}
