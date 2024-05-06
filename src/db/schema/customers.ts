import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const customers = sqliteTable('customers', {
  id: integer('id').primaryKey().notNull(),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  email: text('email').notNull(),
  name: text('name').notNull()
});
