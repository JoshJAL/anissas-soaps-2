import { sql } from 'drizzle-orm';
import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

type Item = {
  name: string;
  quantity: number;
};

export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey().notNull(),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  items: blob('items', { mode: 'json' })
    .notNull()
    .default(sql`'[]'`)
    .$type<Item[]>(),
  total: integer('total').notNull(),
  address: blob('address', { mode: 'json' })
    .notNull()
    .default(sql`'{}'`),
  email: text('email').notNull(),
  name: text('name').notNull(),
  orderId: text('orderId').notNull(),
  customerId: integer('customerId').notNull(),
  orderStatus: text('orderStatus')
    .notNull()
    .default(sql`'pending'`)
});
