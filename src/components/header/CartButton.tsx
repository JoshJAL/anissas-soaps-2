'use client';

import { useCartStore } from '@/utils/cartStore';
import { IoCart } from 'react-icons/io5';

export function CartButton() {
  const { setCartOpen } = useCartStore();

  return (
    <button
      type='button'
      onClick={() => setCartOpen(true)}
      className={`hidden flex-col flex-wrap items-center justify-center gap-1 rounded-full border-4 border-red-800 bg-white px-5 py-3 text-center text-2xl transition-all duration-200 ease-in-out hover:scale-110 md:flex`}
    >
      <IoCart />
      <p className='text-xs md:text-sm'>Cart</p>
    </button>
  );
}

export function CartButtonMobile() {
  const { setCartOpen } = useCartStore();

  return (
    <button
      type='button'
      onClick={() => setCartOpen(true)}
      className={`flex-col flex-wrap items-center justify-center gap-1 rounded-full border-4 border-red-800 bg-white h-20 w-20 text-center text-2xl transition-all duration-200 ease-in-out hover:scale-110 flex`}
    >
      <IoCart />
      <p className='text-xs md:text-sm'>Cart</p>
    </button>
  );
}
