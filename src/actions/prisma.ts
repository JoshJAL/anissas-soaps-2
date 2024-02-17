'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getProducts() {
  try {
    const products = await prisma.inventory.findMany({ where: { hidden: false }, orderBy: { name: 'asc' } });
    await prisma.$disconnect();
    return products;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return null;
  }
}

export async function getProductMainImage(id: number) {
  try {
    const mainImage = await prisma.inventoryImages.findMany({ where: { inventoryId: id, main: true } });
    await prisma.$disconnect();
    return mainImage;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return null;
  }
}

export async function getProductById(id: number | string) {
  try {
    const product = await prisma.inventory.findUnique({ where: { id: Number(id) } });
    await prisma.$disconnect();
    return product;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return null;
  }
}

export async function getProductImages(id: number | string) {
  try {
    const images = await prisma.inventoryImages.findMany({ where: { inventoryId: Number(id) } });
    await prisma.$disconnect();
    return images;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return null;
  }
}
