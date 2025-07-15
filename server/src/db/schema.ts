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
  bio: text(),
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

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  eventDate: date("event_date").notNull(),
  location: varchar("location", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  isFeatured: boolean().default(false),
  tag: varchar("tag", { length: 100 }),
  imageUrl: text("image_url"),
  price: integer("price"),
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
  title: varchar("title", { length: 100 }),
  description: text("description"),
  content: text("content"),
  categoryId: integer("category_id").references(() => categories.id),
  storageUrl: text("storage_url").notNull(),
  locationName: varchar("location_name", { length: 100 }),
  status: submissionStatusEnum("status").default("pending"),
  reviewedBy: uuid("reviewed_by").references(() => users.id),
  submittedAt: timestamp("submitted_at").defaultNow(),
  imageUrl: varchar("image_url", { length: 255 }),
});

export const content = pgTable("content", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar({ length: 100 }).notNull(),
  description: text().notNull(),
  isFeatured: boolean().default(false),
  region: varchar({ length: 100 }),
  status: submissionStatusEnum().default("pending"),
  contributorId: uuid().references(() => users.id),
  categoryId: integer().references(() => categories.id),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const stories = pgTable("stories", {
  contentId: uuid()
    .references(() => content.id)
    .primaryKey()
    .notNull(),
  coverImage: varchar({ length: 255 }),
  readTime: integer(),
  content: text(),
  moralLesson: text(),
  context: text(),
  difficulty: varchar({ length: 255 }),
});

export const proverbs = pgTable("proverbs", {
  contentId: uuid()
    .references(() => content.id)
    .primaryKey()
    .notNull(),
  proverbCategory: text(),
  difficulty: text(),
  content: text(),
  englishTranslation: text(),
});

export const report = pgTable("report", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid().references(() => users.id).notNull(),
  contentId: uuid().references(() => content.id).notNull(),
  reason: text().notNull(),
  details: text(),
  createdOn: timestamp().defaultNow(),
  updatedOn: timestamp().defaultNow(),
});
