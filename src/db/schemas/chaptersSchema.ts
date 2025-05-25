import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { books } from "./bookSchema";

export const chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id")
    .references(() => books.id)
    .notNull(),
  chapterNumber: integer("chapter_number").notNull(),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
