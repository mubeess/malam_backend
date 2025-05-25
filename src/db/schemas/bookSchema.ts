import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  text,
} from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }),
  description: text("description"),
  coverImage: varchar("cover_image", { length: 255 }),
  category: varchar("category", { length: 100 }), // e.g., 'Fiqh', 'Tafsir', 'Hadith', etc.
  language: varchar("language", { length: 50 }).default("Arabic"),
  publishYear: integer("publish_year"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
