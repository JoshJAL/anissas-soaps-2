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
    await prisma.$disconnect();
    return newCart;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return null;
  }
}

export async function removeCartItem(itemName: string, itemScent: string, cartId: string | number) {
  try {
    const cart = await prisma.cart.findUnique({ where: { id: Number(cartId) } });
    const incomingCartItems = cart!.items;
    const cartItems = incomingCartItems as unknown as CartItem[];
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].itemName === itemName && cartItems[i].itemScent === itemScent) {
        cartItems.splice(i, 1);
        await prisma.cart.update({ where: { id: Number(cartId) }, data: { items: cartItems } });
        await prisma.$disconnect();
        return true;
      }
    }
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return false;
  }
}

export async function createOrder(
  orderId: string,
  customerName: string,
  customerEmail: string,
  address: {
    city: string;
    country: string;
    line1: string;
    line2: string | null;
    postal_code: string;
    state: string;
  },
  items: {
    name: string;
    quantity: number;
  }[],
  total: number | string,
  customerId: number
) {
  total = total.toString();
  try {
    const order = await prisma.orders.create({
      data: {
        items,
        name: customerName.trim(),
        email: customerEmail.trim(),
        address,
        orderId,
        total,
        customerId
      }
    });
    await prisma.$disconnect();
    return true;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    return false;
  }
}

export async function clearCart(cartId: string | number) {
  cartId = Number(cartId);
  try {
    await prisma.cart.update({ where: { id: cartId }, data: { items: [] } });
    await prisma.$disconnect();
    return true;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    return false;
  }
}

export async function clearAllOrders() {
  try {
    await prisma.orders.deleteMany();
    await prisma.$disconnect();
    return true;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    return false;
  }
}

export async function getOrders() {
  try {
    const orders = await prisma.orders.findMany();
    await prisma.$disconnect();
    return orders;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    return null;
  }
}

export async function getCustomerByEmail(email: string) {
  try {
    const customer = await prisma.customers.findUnique({ where: { email } });
    await prisma.$disconnect();
    return customer;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    return null;
  }
}

export async function createCustomer(email: string, name: string) {
  try {
    const customer = await prisma.customers.create({ data: { email, name } });
    await prisma.$disconnect();
    return customer;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    return null;
  }
}
