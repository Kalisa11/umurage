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

export interface Music {
  id: string;
  title: string;
  description: string;
  content: string;
  coverImage?: string | null;
  genre?: string;
  audioUrl?: string;
  tags?: string[];
  tempo?: string;
  isFeatured: boolean;
  region?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  contributor: Contributor | null;
}

export interface ContributorContentResponse {
  contributor: Contributor;
  content: ContentItem[];
}

export interface Contributor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  region: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
  role: string;
  phone?: string | null;
  website?: string | null;
  avatar?: string | null;
}

export type ContentType = "stories" | "proverbs" | "art" | "music";

export interface BaseContent {
  id: string;
  title: string;
  description: string;
  isFeatured: boolean;
  region: string | null;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  contentType: ContentType;
}

export type ContentItem =
  | (BaseContent & { contentType: "stories"; typeSpecificData: StoryData })
  | (BaseContent & { contentType: "proverbs"; typeSpecificData: ProverbData })
  | (BaseContent & { contentType: "art"; typeSpecificData: ArtData })
  | (BaseContent & { contentType: "music"; typeSpecificData: MusicData });

export interface StoryData {
  coverImage: string | null;
  readTime: number | null;
  content: string;
  moralLesson: string | null;
  context: string | null;
  difficulty: string | null;
}

export interface ProverbData {
  proverbCategory: string | null;
  difficulty: string | null;
  content: string;
  englishTranslation: string | null;
}

export interface ArtData {
  coverImage: string | null;
  timeToCreate: string | null;
  technique: string | null;
  medium: string | null;
  difficulty: string | null;
  content: string;
  bookingName: string | null;
  bookingAddress: string | null;
  bookingHours: string | null;
  bookingPhone: string | null;
  bookingEmail: string | null;
  bookingUrl: string | null;
  bookingLat: number | null;
  bookingLong: number | null;
}

export interface MusicData {
  genre: string | null;
  audioUrl: string;
  tags: string[] | null;
  tempo: string | null;
  content: string;
  coverImage: string | null;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  region: string;
  bio: string;
  phone?: string;
  avatar?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface PendingContent {
  id: string;
  title: string;
  description: string;
  isFeatured: boolean;
  region: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: string | null;
  updatedAt: string | null;
  contributor: Contributor | null;
  category: Category | null;
}

export interface Content {
  id: string;
  title: string;
  description: string;
  isFeatured: boolean;
  region: string | null;
  status: "pending" | "approved" | "rejected";
  contributorId: string | null;
  categoryId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  reportId: string;
  reason: string;
  details: string;
  status: "pending" | "resolved" | "dismissed" | null;
  createdOn: Date;
  updatedOn: Date;
  createdById: string;
  contentId: string;
  reporter: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  reportedContent: {
    id: string;
    title: string;
    category: string;
    description: string;
    region: string;
    status: string;
    createdOn: Date;
  };
  contributor: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  category: {
    id: string;
    name: string;
  } | null;
}
