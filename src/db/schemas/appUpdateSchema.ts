import { boolean, timestamp, varchar } from 'drizzle-orm/pg-core';
import { pgTable, uuid } from 'drizzle-orm/pg-core';

export const AppUpdateTable = pgTable('appUpdate', {
  id: uuid('id').defaultRandom().primaryKey(),
  force_update: boolean('force_update').default(false),
  version: varchar('version', { length: 6 }).default('1.0'),
  title: varchar('title'),
  description: varchar('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Types for TypeScript
export type AppUdate = typeof AppUpdateTable.$inferSelect;
export type NewAppUpdate = typeof AppUpdateTable.$inferInsert;
