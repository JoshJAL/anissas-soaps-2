import { sendConfirmationEmail } from '@/actions/nodemailer';
import { createCustomer, createOrder, getCustomerByEmail, getProductMainImage, getProducts } from '@/actions/prisma';
import ClearCart from '@/components/ClearCart';
import WhoWeAre from '@/components/WhoWeAre';
import WholesaleSection from '@/components/WholesaleSection';
import TestimonialSlider from '@/components/sliders/ItemCardSlider';
import { ItemCard } from '@/types/itemCard';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY!, {
  typescript: true,
  apiVersion: '2023-10-16'
});

export default async function Home({
  searchParams
}: {
  searchParams: { orderId: string; success: 'true' | 'false' | 'completed' };
}) {
  const success = searchParams.success && searchParams.success === 'true' ? true : false;
  const orderId = searchParams.orderId ?? '';

  if (success && orderId.trim() !== '') {
    const order = await stripe.checkout.sessions.retrieve(orderId);
    const lineItems = await stripe.checkout.sessions.listLineItems(orderId);

    const customerName = order.customer_details?.name ?? '';
    const customerEmail = order.customer_details?.email ?? '';
    const address = order.shipping_details?.address as {
      city: string;
      country: string;
      line1: string;
      line2: string | null;
      postal_code: string;
      state: string;
    };
    const total = order.amount_total!;
    const items = lineItems.data.map((item) => {
      return {
        name: item.description,
        quantity: item.quantity!
      };
    });

    let customer = await getCustomerByEmail(customerEmail);
    if (!customer) {
      customer = await createCustomer(customerEmail, customerName);
    }
    const orderSuccess = await createOrder(orderId, customerName, customerEmail, address, items, total, customer!.id);
    if (orderSuccess) {
      if (customerEmail) await sendConfirmationEmail(customerEmail);
      redirect('/?success=completed');
    }
  }

  const itemCards: ItemCard[] = [];
  const products = await getProducts();

  for (let i = 0; i < products!.length; i++) {
    const prod = products![i];
    const mainImage = await getProductMainImage(prod.id);
    const mainImageObj = mainImage![0];
    const itemCardObj = {
      name: prod.name,
      price: prod.price,
      imgSrc: mainImageObj.url,
      href: `/shop/${prod.id}`
    };
    itemCards.push(itemCardObj);
  }

  return (
    <article className='flex w-full flex-col gap-5'>
      <ClearCart orderComplete={searchParams.success} />
      <TestimonialSlider cards={itemCards} />
      <WhoWeAre />
      <WholesaleSection />
    </article>
  );
}
