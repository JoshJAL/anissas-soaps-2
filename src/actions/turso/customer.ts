'use server';

import { customSoapForm } from '@/db/schema/customSoapForm';
import { customers } from '@/db/schema/customers';
import { wholesaleInterest } from '@/db/schema/wholesaleInterest';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';

export async function getCustomerByEmail(email: string) {
  try {
    const customer = await db.select().from(customers).where(eq(customers.email, email));
    return customer[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createCustomer(email: string, name: string) {
  try {
    const customer = await db.insert(customers).values({ email, name }).returning();
    return customer[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createWholesaleInterest(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  businessName: string,
  message: string
) {
  try {
    await db.insert(wholesaleInterest).values({
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      businessName: businessName.trim(),
      message: message.trim()
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function createCustomForm(
  firstName: string,
  lastName: string,
  email: string,
  message: string,
  phone: string
) {
  try {
    await db.insert(customSoapForm).values({
      phone: phone.trim(),
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim().toLowerCase(),
      message: message.trim()
    });
  } catch (error) {
    console.error(error);
    return false;
  }
}
