"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chapters = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const bookSchema_1 = require("./bookSchema");
exports.chapters = (0, pg_core_1.pgTable)("chapters", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    bookId: (0, pg_core_1.integer)("book_id")
        .references(() => bookSchema_1.books.id)
        .notNull(),
    chapterNumber: (0, pg_core_1.integer)("chapter_number").notNull(),
    title: (0, pg_core_1.varchar)("title", { length: 255 }),
    description: (0, pg_core_1.text)("description"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
});
