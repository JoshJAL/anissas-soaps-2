import { relations } from 'drizzle-orm';
import { customers } from './customers';
import { orders } from './orders';

export const customerRelations = relations(customers, ({ many }) => ({
  orders: many(orders)
}));

export const orderRelations = relations(orders, ({ one }) => ({
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id]
  })
}));
