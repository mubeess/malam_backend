import {
  pgTable,
  serial,
  integer,
  text,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./usersSchema";
export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  // mediaId: integer('media_id').references(() => media.id).notNull(),
  position: integer("position").notNull(), // bookmark position in seconds
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
