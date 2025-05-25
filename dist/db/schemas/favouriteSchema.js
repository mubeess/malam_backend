"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favorites = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const usersSchema_1 = require("./usersSchema");
const bookSchema_1 = require("./bookSchema");
exports.favorites = (0, pg_core_1.pgTable)("favorites", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id")
        .references(() => usersSchema_1.users.id)
        .notNull(),
    bookId: (0, pg_core_1.integer)("book_id").references(() => bookSchema_1.books.id),
    // mediaId: integer('media_id').references(() => media.id),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
