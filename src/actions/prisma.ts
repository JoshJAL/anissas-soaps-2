'use server';

import { CartItem } from '@/types/cartItem';
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

export async function createCart(item: CartItem) {
  try {
    const cart = await prisma.cart.create({ data: { items: [item] } });
    await prisma.$disconnect();
    return cart;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return null;
  }
}

export async function getCartById(id: number | string) {
  try {
    const cart = await prisma.cart.findUnique({ where: { id: Number(id) } });
    await prisma.$disconnect();
    return cart;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return null;
  }
}

export async function addItemToCart(cartId: string | number, item: CartItem) {
  try {
    const cart = await prisma.cart.findUnique({ where: { id: Number(cartId) } });
    const incomingCartItems = cart!.items;
    const cartItems = incomingCartItems as unknown as CartItem[];
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].itemName === item.itemName && cartItems[i].itemScent === item.itemScent) {
        cartItems[i].quantity += item.quantity;
        const newCart = await prisma.cart.update({ where: { id: Number(cartId) }, data: { items: cartItems } });
        return newCart;
      }
    }
    const newItems = [item, ...cartItems];
    const newCart = await prisma.cart.update({ where: { id: Number(cartId) }, data: { items: newItems } });
    return newCart;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return null;
  }
}
