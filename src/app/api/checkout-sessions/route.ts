import type { CartItem } from '@/types/cartItem';
import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY!, {
  typescript: true,
  apiVersion: '2023-10-16'
});

export async function POST(req: NextRequest) {
  const { cartItems } = await req.json();
  const headersList = headers();
  const cartDetailsArray: CartItem[] = Object.values(cartItems) as CartItem[];

  const lineItems = cartDetailsArray.map((item: CartItem) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.itemName + ' ' + item.itemScent,
          description: item.itemScent
        },
        unit_amount: Number(item.itemPrice) * 100
      },
      quantity: item.quantity
    };
  });

  try {
    const paymentIntent = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      invoice_creation: {
        enabled: true
      },
      success_url: `${headersList.get('origin')}?success=true&orderId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${headersList.get('origin')}?success=false`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA']
      }
    });

    return NextResponse.json({ status: 200, url: paymentIntent.url });
  } catch (error: any) {
    console.error('this is the error: ', error);
    return new NextResponse(error, {
      status: 400
    });
  }
}
