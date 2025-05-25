"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioSchema = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const bookSchema_1 = require("./bookSchema");
exports.audioSchema = (0, pg_core_1.pgTable)("audio_references", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    bookId: (0, pg_core_1.integer)("book_id").references(() => bookSchema_1.books.id),
    title: (0, pg_core_1.varchar)("title", { length: 255 }).notNull(),
    url: (0, pg_core_1.varchar)("url", { length: 512 }).notNull(),
    description: (0, pg_core_1.text)("description"),
    duration: (0, pg_core_1.integer)("duration"), // in seconds
    speaker: (0, pg_core_1.varchar)("speaker", { length: 255 }),
    language: (0, pg_core_1.varchar)("language", { length: 50 }).default("Hausa"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
});
