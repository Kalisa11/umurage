import { relations } from "drizzle-orm/relations";
import {
  users,
  upcomingActivities,
  submissions,
  artists,
  categories,
} from "./schema";

export const userRelations = relations(users, ({ many }) => ({
  upcomingActivities: many(upcomingActivities),
  submissions: many(submissions),
  reviewedSubmissions: many(submissions, { relationName: "reviewer" }),
}));

export const upcomingActivityRelations = relations(
  upcomingActivities,
  ({ one }) => ({
    user: one(users, {
      fields: [upcomingActivities.createdBy],
      references: [users.id],
    }),
  })
);

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
