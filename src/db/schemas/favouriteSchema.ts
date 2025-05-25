import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./usersSchema";
import { books } from "./bookSchema";
export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  bookId: integer("book_id").references(() => books.id),
  // mediaId: integer('media_id').references(() => media.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
