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
          name: item.itemName
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
      success_url: `${headersList.get('origin')}?success=true`,
      cancel_url: `${headersList.get('origin')}?success=false`
    });

    return NextResponse.json({ status: 200, url: paymentIntent.url });
  } catch (error: any) {
    console.error('this is the error: ', error);
    return new NextResponse(error, {
      status: 400
    });
  }
}
