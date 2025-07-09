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

export interface Proverb {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  region: string;
  contributor: string;
  englishTranslation: string;
  proverbCategory: string;
  content: string;
  isFeatured: boolean;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
