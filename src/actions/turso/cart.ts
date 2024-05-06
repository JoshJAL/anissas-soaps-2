'use server';

import { cart } from '@/db/schema/cart';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';

import type { CartItem } from '@/types/cartItem';

export async function createCart(item: CartItem) {
  try {
    const newCart = await db
      .insert(cart)
      .values({ items: [item] })
      .returning();
    return newCart[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCartById(id: number | string) {
  id = Number(id);
  try {
    const selectedCart = await db.select().from(cart).where(eq(cart.id, id));
    return selectedCart[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function addItemToCart(cartId: number | string, item: CartItem) {
  cartId = Number(cartId);
  try {
    const currentCart = await db.select().from(cart).where(eq(cart.id, cartId));
    const currentItems: CartItem[] = currentCart[0].items;
    for (let i = 0; i < currentItems.length; i++) {
      const currentItem = currentItems[i];
      if (currentItem.itemName === item.itemName && currentItem.itemScent === item.itemScent) {
        currentItem.quantity += item.quantity;
      }
    }
    const newItems = [...currentItems, item];
    const updatedCart = await db.update(cart).set({ items: newItems }).where(eq(cart.id, cartId)).returning();
    return updatedCart[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function removeCartItem(itemName: string, itemScent: string, cartId: number | string) {
  cartId = Number(cartId);

  try {
    const currentCart = await db.select().from(cart).where(eq(cart.id, cartId));
    const currentItems: CartItem[] = currentCart[0].items;
    const newItems = currentItems.filter((item) => item.itemName !== itemName && item.itemScent !== itemScent);
    const updatedCart = await db.update(cart).set({ items: newItems }).where(eq(cart.id, cartId)).returning();
    return updatedCart[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function clearCart(cartId: number | string) {
  cartId = Number(cartId);

  try {
    await db.update(cart).set({ items: [] }).where(eq(cart.id, cartId));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
