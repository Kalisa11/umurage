import { z } from "zod";
import { CATEGORIES, proverbCategories } from "./utils";

export const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  region: z.string().min(1, { message: "Region is required" }),
  bio: z.string().min(1, { message: "Bio is required" }),
  phone: z.string().optional(),
});

export type SignupSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const passwordResetSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type PasswordResetSchema = z.infer<typeof passwordResetSchema>;

export const newPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type NewPasswordSchema = z.infer<typeof newPasswordSchema>;

// Contribute form schema with conditional validation
export const contributeSchema = z
  .object({
    // Common fields
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    category: z.number().min(1, { message: "Category is required" }),
    region: z.string().min(1, { message: "Region is required" }),
    isFeatured: z.boolean().default(false),
    content: z.string().min(1, { message: "Content is required" }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),

    // Proverbs specific fields
    englishTranslation: z.string().optional(),
    proverbCategory: z.string().optional(),

    // Art specific fields
    coverImage: z.any().optional(), // File validation handled separately
    technique: z.string().optional(),
    timeToCreate: z.string().optional(),
    medium: z.string().optional(),
    bookingName: z.string().optional(),
    bookingAddress: z.string().optional(),
    bookingPhone: z.string().optional(),
    bookingEmail: z.string().email().optional().or(z.literal("")),
    bookingHours: z.string().optional(),
    bookingUrl: z.string().url().optional().or(z.literal("")),
    bookingLat: z.number().optional(),
    bookingLong: z.number().optional(),

    // Story specific fields
    readTime: z.number().optional(),
    moralLesson: z.string().optional(),
    context: z.string().optional(),

    // Song specific fields
    audioFile: z.any().optional(), // File validation handled separately
    tempo: z.string().optional(),
    tags: z.array(z.string()).optional(),
    genre: z.string().optional(),

    // Difficulty field (used by multiple categories)
    difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  })
  .refine(
    (data) => {
      // Proverbs validation
      if (data.category === CATEGORIES.PROVERB) {
        if (!data.englishTranslation) {
          return false;
        }
        if (!data.proverbCategory) {
          return false;
        }
        if (!data.difficulty) {
          return false;
        }
      }

      // Art validation
      if (data.category === CATEGORIES.ART) {
        if (!data.coverImage) {
          return false;
        }
        if (!data.technique) {
          return false;
        }
        if (!data.timeToCreate) {
          return false;
        }
        if (!data.medium) {
          return false;
        }
        if (!data.difficulty) {
          return false;
        }
      }

      // Story validation
      if (data.category === CATEGORIES.STORY) {
        if (!data.coverImage) {
          return true;
        }
        if (!data.readTime) {
          return false;
        }
        if (!data.moralLesson) {
          return false;
        }
        if (!data.context) {
          return false;
        }
        if (!data.difficulty) {
          return false;
        }
      }

      // Song validation
      if (data.category === CATEGORIES.MUSIC) {
        if (!data.coverImage) {
          return false;
        }
        if (!data.audioFile) {
          return false;
        }
        if (!data.genre) {
          return false;
        }
      }

      return true;
    },
    {
      message: "Please fill in all required fields for the selected category",
      path: ["category"], // This will show the error on the category field
    }
  );

export type ContributeSchema = z.infer<typeof contributeSchema>;

// Helper function to validate file size
export const validateFileSize = (file: File, maxSizeMB: number) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return `File size must be less than ${maxSizeMB}MB`;
  }
  return null;
};

// Helper function to validate file type
export const validateFileType = (file: File, allowedTypes: string[]) => {
  if (!allowedTypes.includes(file.type)) {
    return `File type must be one of: ${allowedTypes.join(", ")}`;
  }
  return null;
};

// Helper function to validate avatar file
export const validateAvatarFile = (file: File) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  const typeError = validateFileType(file, allowedTypes);
  if (typeError) return typeError;

  const sizeError = validateFileSize(file, 5);
  if (sizeError) return sizeError;

  return null;
};

export const reportSchema = z.object({
  reason: z.string().min(1, "Please select a reason"),
  details: z.string().min(1, "Please provide additional details"),
});

export type ReportSchema = z.infer<typeof reportSchema>;

export const profileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  region: z.string().min(1, { message: "Region is required" }),
  bio: z.string().min(1, { message: "Bio is required" }),
  avatar: z.instanceof(File).optional().nullable(),
});

// Schema for API submission (without avatar field when not provided)
export const profileSubmissionSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  region: z.string().min(1, { message: "Region is required" }),
  bio: z.string().min(1, { message: "Bio is required" }),
  avatar: z.string().optional(),
});

export type ProfileSubmissionSchema = z.infer<typeof profileSubmissionSchema>;

export type ProfileSchema = z.infer<typeof profileSchema>;
