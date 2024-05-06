import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, blob } from 'drizzle-orm/sqlite-core';

import type { CartItem } from '@/types/cartItem';

export const cart = sqliteTable('cart', {
  id: integer('id').primaryKey().notNull(),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  items: blob('items', { mode: 'json' })
    .notNull()
    .default(sql`'[]'`)
    .$type<CartItem[]>()
});
