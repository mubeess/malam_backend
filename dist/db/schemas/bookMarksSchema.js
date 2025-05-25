"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarks = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const usersSchema_1 = require("./usersSchema");
exports.bookmarks = (0, pg_core_1.pgTable)("bookmarks", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id")
        .references(() => usersSchema_1.users.id)
        .notNull(),
    // mediaId: integer('media_id').references(() => media.id).notNull(),
    position: (0, pg_core_1.integer)("position").notNull(), // bookmark position in seconds
    note: (0, pg_core_1.text)("note"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
