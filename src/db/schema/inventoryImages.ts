import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const inventoryImages = sqliteTable('inventoryImages', {
  id: integer('id').primaryKey().notNull(),
  inventoryId: integer('inventoryId').notNull(),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  url: text('url').notNull(),
  main: integer('main', { mode: 'boolean' }).notNull()
});
