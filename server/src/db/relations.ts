import { relations } from "drizzle-orm/relations";
import {
  users,
  submissions,
  artists,
  categories,
  stories,
  content,
  proverbs,
  report,
  art,
} from "./schema";

export const userRelations = relations(users, ({ many }) => ({
  submissions: many(submissions),
  reviewedSubmissions: many(submissions, { relationName: "reviewer" }),
}));

export const submissionRelations = relations(submissions, ({ one }) => ({
  user: one(users, {
    fields: [submissions.userId],
    references: [users.id],
  }),
  artist: one(artists, {
    fields: [submissions.artistId],
    references: [artists.id],
  }),
  category: one(categories, {
    fields: [submissions.categoryId],
    references: [categories.id],
  }),
  reviewer: one(users, {
    fields: [submissions.reviewedBy],
    references: [users.id],
  }),
}));

export const artistRelations = relations(artists, ({ many }) => ({
  submissions: many(submissions),
}));

export const categoryRelations = relations(categories, ({ many }) => ({
  submissions: many(submissions),
}));

export const contentRelations = relations(content, ({ one, many }) => ({
  contributor: one(users, {
    fields: [content.contributorId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [content.categoryId],
    references: [categories.id],
  }),
  story: one(stories, {
    fields: [content.id],
    references: [stories.contentId],
  }),
  proverb: one(proverbs, {
    fields: [content.id],
    references: [proverbs.contentId],
  }),
  reports: many(report),
  art: one(art, {
    fields: [content.id],
    references: [art.contentId],
  }),
}));

export const storyRelations = relations(stories, ({ one }) => ({
  content: one(content, {
    fields: [stories.contentId],
    references: [content.id],
  }),
}));

export const proverbRelations = relations(proverbs, ({ one }) => ({
  content: one(content, {
    fields: [proverbs.contentId],
    references: [content.id],
  }),
}));

export const reportRelations = relations(report, ({ one }) => ({
  user: one(users, {
    fields: [report.userId],
    references: [users.id],
  }),
  content: one(content, {
    fields: [report.contentId],
    references: [content.id],
  }),
}));

export const artRelations = relations(art, ({ one }) => ({
  content: one(content, {
    fields: [art.contentId],
    references: [content.id],
  }),
}));
