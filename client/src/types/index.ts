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

export interface Submission {
  id: string;
  title: string;
  description?: string;
  content?: string;
  categoryId: number;
  storageUrl: string;
  locationName?: string;
  status?: string;
  reviewedBy?: string;
  submittedAt: Date;
  imageUrl?: string;
  category: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface CategoryWithSubmissions extends Category {
  submissions: Submission[];
}

export interface Contributor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  region: string;
  bio: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  content: string;
  coverImage?: string | null;
  readTime?: number;
  moralLesson?: string;
  context?: string;
  difficulty?: string;
  isFeatured: boolean;
  region?: string;
  status: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  contributor: Contributor | null;
}

export interface Proverb {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  proverbCategory: string;
  content: string;
  region: string;
  englishTranslation: string;
  isFeatured: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  contributor: Contributor | null;
}

export interface Art {
  id: string;
  title: string;
  description: string;
  content: string;
  coverImage?: string | null;
  timeToCreate?: string;
  technique?: string;
  medium?: string;
  difficulty?: string;
  isFeatured: boolean;
  region?: string;
  status: string;
  bookingName?: string;
  bookingAddress?: string;
  bookingHours?: string;
  bookingPhone?: string;
  bookingEmail?: string;
  bookingUrl?: string;
  bookingLat?: number;
  bookingLong?: number;
  createdAt: string;
  updatedAt: string;
  contributor: Contributor | null;
}