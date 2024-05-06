'use server';

import { inventory } from '@/db/schema/inventory';
import { inventoryImages } from '@/db/schema/inventoryImages';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';

export async function getProducts() {
  try {
    const products = await db.select().from(inventory).orderBy(inventory.name).where(eq(inventory.hidden, false)).all();
    return products;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProductMainImage(id: number | string) {
  id = Number(id);

  try {
    const mainImage = await db.select().from(inventoryImages).where(eq(inventoryImages.inventoryId, id));
    return mainImage;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProductById(id: number | string) {
  id = Number(id);

  try {
    const product = await db.select().from(inventory).where(eq(inventory.id, id));
    return product[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProductImages(id: number | string) {
  id = Number(id);

  try {
    const images = await db.select().from(inventoryImages).where(eq(inventoryImages.inventoryId, id));
    return images;
  } catch (error) {
    console.error(error);
    return null;
  }
}
