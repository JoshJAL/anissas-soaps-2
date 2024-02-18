'use client';

import { useRouter } from 'next/navigation';
import { createDollarAmount } from '@/utils/createDollarAmount';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useCartStore } from '@/utils/cartStore';
import type { CartItem } from '@/types/cartItem';
import { getCartById, removeCartItem } from '@/actions/prisma';
import { loadStripe } from '@stripe/stripe-js';

export default function CartFlyout() {
  const { cartOpen, setCartOpen } = useCartStore();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [removing, setRemoving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getCartData() {
      const cartId = localStorage.getItem('cartId');
      if (!cartId) return setCartItems([]);
      const cart = await getCartById(cartId);
      const cartItems = cart?.items;
      setCartItems(cartItems as unknown as CartItem[]);
    }

    getCartData();
  }, [cartOpen, removing]);

  let cartTotal = 0;
  cartItems.map((item) => {
    cartTotal += Number(item.itemPrice) * item.quantity;
  });

  const redirectToCheckout = async () => {
    try {
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_TEST_STRIPE_PUBLISHABLE_KEY as string);

      if (!stripe) throw new Error('Stripe failed to initialize.');

      const checkoutResponse = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItems)
      });

      const { sessionId } = await checkoutResponse.json();
      const stripeError = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        console.error(stripeError);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Transition.Root show={cartOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={() => setCartOpen(!cartOpen)}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                    <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-lg font-medium'>Shopping cart</Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            type='button'
                            className='relative -m-2 p-2 text-red-500 hover:text-red-700'
                            onClick={() => setCartOpen(false)}
                          >
                            <span className='absolute -inset-0.5' />
                            <span className='sr-only'>Close panel</span>
                            <IoClose className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>
                      {cartItems.length === 0 ? (
                        <div className='mt-8'>
                          <p className='text-sm text-gray-500'>Your cart is empty</p>
                          <div className='mt-6 flex justify-center'>
                            <Link
                              href='/shop'
                              className='w-full items-center justify-center rounded-lg border border-transparent bg-green-800 px-2 py-3 text-center text-base font-medium text-white hover:bg-red-800'
                            >
                              Continue Shopping
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className='mt-8'>
                          <div className='flow-root'>
                            <ul role='list' className='divide-mint -my-6 divide-y'>
                              {cartItems.map((product) => {
                                return (
                                  <li key={product.itemId} className='flex py-6'>
                                    <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                      <img
                                        src={product.itemImage}
                                        alt={product.itemName}
                                        className='h-full w-full object-cover object-center'
                                      />
                                    </div>

                                    <div className='ml-4 flex flex-1 flex-col'>
                                      <div>
                                        <div className='flex justify-between text-base font-medium'>
                                          <h3>
                                            <Link onClick={() => setCartOpen(false)} href={'/shop/' + product.itemId}>
                                              {product.itemName}
                                            </Link>
                                          </h3>
                                          <p className='ml-4'>
                                            {createDollarAmount(
                                              (Number(product.itemPrice) * product.quantity).toFixed(2)
                                            )}
                                          </p>
                                        </div>
                                        <p className='mt-1 text-sm text-gray-400'>{product.itemScent}</p>
                                      </div>
                                      <div className='flex flex-1 items-end justify-between text-sm'>
                                        <p className='text-green-800'>Qty {product.quantity}</p>

                                        <div className='flex'>
                                          <button
                                            onClick={async () => {
                                              const cartId = localStorage.getItem('cartId');
                                              if (!cartId) return;
                                              if (!confirm('Are you sure you want to remove this item?')) return;
                                              setRemoving(true);
                                              const success = await removeCartItem(
                                                product.itemName,
                                                product.itemScent,
                                                cartId
                                              );
                                              if (!success) {
                                                alert('There was an error removing the item from your cart');
                                                setRemoving(false);
                                                return;
                                              } else {
                                                router.refresh();
                                                setRemoving(false);
                                              }
                                            }}
                                            type='button'
                                            className='font-medium text-red-500 transition-all duration-200 ease-in-out hover:text-red-700'
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                    {cartItems.length > 0 && (
                      <div className='border-mint border-t px-4 py-6 sm:px-6'>
                        <div className='flex justify-between text-base font-medium text-green-800'>
                          <p>Subtotal</p>
                          <p>{createDollarAmount(cartTotal.toFixed(2))}</p>
                        </div>
                        <p className='mt-0.5 text-sm text-gray-400'>Shipping and taxes calculated at checkout.</p>
                        <div className='mt-6'>
                          <button
                            type='button'
                            onClick={() => {
                              redirectToCheckout();
                            }}
                            className='flex w-full items-center justify-center rounded-md border border-transparent bg-green-800 px-6 py-3 text-base font-medium text-white shadow-sm duration-200 ease-in-out hover:bg-red-800'
                          >
                            Checkout
                          </button>
                        </div>
                        <div className='mt-6 flex justify-center text-center text-sm text-gray-400'>
                          <p>
                            or{' '}
                            <button
                              type='button'
                              className='font-medium text-red-500 transition-all duration-200 ease-in-out hover:text-red-700'
                              onClick={() => setCartOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden='true'> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
