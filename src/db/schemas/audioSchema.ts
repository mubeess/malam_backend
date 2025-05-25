import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { books } from "./bookSchema";

export const audioSchema = pgTable("audio_references", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id").references(() => books.id),
  title: varchar("title", { length: 255 }).notNull(),
  url: varchar("url", { length: 512 }).notNull(),
  description: text("description"),
  duration: integer("duration"), // in seconds
  speaker: varchar("speaker", { length: 255 }),
  language: varchar("language", { length: 50 }).default("Hausa"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
