import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar().notNull().unique(),
  password: varchar().notNull(),
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
