import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const inventory = sqliteTable('inventory', {
  id: integer('id').primaryKey().notNull(),
  name: text('name').notNull(),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  price: integer('price').notNull(),
  hidden: integer('hidden', { mode: 'boolean' }).notNull().default(false)
});
