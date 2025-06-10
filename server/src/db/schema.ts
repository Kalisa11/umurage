import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
  serial,
  text,
  date,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";

export const submissionStatusEnum = pgEnum("submission_status", [
  "pending",
  "approved",
  "rejected",
]);
export const contentTypeEnum = pgEnum("content_type", [
  "artwork",
  "song",
  "story",
  "proverb",
]);

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar().notNull().unique(),
  password: varchar().notNull(),
  region: varchar(),
  role: varchar().notNull().default("user"),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const categories = pgTable("categories", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const upcomingActivities = pgTable("upcoming_activities", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  eventDate: date("event_date").notNull(),
  location: varchar("location", { length: 100 }),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const artists = pgTable("artists", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  bio: text("bio"),
  imageUrl: text("image_url"),
  link: text("link"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const submissions = pgTable("submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  artistId: uuid("artist_id").references(() => artists.id),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  categoryId: integer("category_id").references(() => categories.id),
  storageUrl: text("storage_url").notNull(),
  locationName: varchar("location_name", { length: 100 }),
  status: submissionStatusEnum("status").default("pending"),
  reviewedBy: uuid("reviewed_by").references(() => users.id),
  submittedAt: timestamp("submitted_at").defaultNow(),
});
