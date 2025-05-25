"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.books = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.books = (0, pg_core_1.pgTable)("books", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.varchar)("title", { length: 255 }).notNull(),
    author: (0, pg_core_1.varchar)("author", { length: 255 }),
    description: (0, pg_core_1.text)("description"),
    coverImage: (0, pg_core_1.varchar)("cover_image", { length: 255 }),
    category: (0, pg_core_1.varchar)("category", { length: 100 }), // e.g., 'Fiqh', 'Tafsir', 'Hadith', etc.
    language: (0, pg_core_1.varchar)("language", { length: 50 }).default("Arabic"),
    publishYear: (0, pg_core_1.integer)("publish_year"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
});
