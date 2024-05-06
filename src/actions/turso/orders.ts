'use server';

import { db } from '@/utils/db';
import { orders } from '@/db/schema/orders';

export async function createOrder(
  orderId: string,
  customerName: string,
  customerEmail: string,
  address: { city: string; country: string; line1: string; line2: string | null; postal_code: string; state: string },
  items: { name: string; quantity: number }[],
  total: number | string,
  customerId: number
) {
  total = Number(total);
  try {
    await db.insert(orders).values({
      items,
      orderId,
      total,
      address,
      email: customerEmail.trim().toLowerCase(),
      name: customerName.trim(),
      customerId
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
