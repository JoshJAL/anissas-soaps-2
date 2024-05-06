import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const customSoapForm = sqliteTable('customSoapForm', {
  id: integer('id').primaryKey().notNull(),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  phone: text('phone').notNull()
});
