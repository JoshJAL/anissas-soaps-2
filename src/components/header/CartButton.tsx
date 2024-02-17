'use client';

import { IoCart } from 'react-icons/io5';

export function CartButton() {
  return (
    <button
      type='button'
      onClick={() => console.log('Cart clicked')}
      className={`hidden md:flex text-2xl border-4 border-red-800 px-5 bg-white py-3 rounded-full hover:scale-110 items-center justify-center transition-all duration-200 ease-in-out flex-col gap-1 text-center flex-wrap`}
    >
      <IoCart />
      <p className='text-xs md:text-sm'>Cart</p>
    </button>
  );
}

export function CartButtonMobile() {
  return (
    <button
      type='button'
      onClick={() => console.log('Cart clicked')}
      className={`md:hidden text-2xl hover:scale-110 items-center justify-center transition-all duration-200 ease-in-out flex flex-col gap-1 text-center flex-wrap`}
    >
      <IoCart />
      <p className='text-xs md:text-sm'>Cart</p>
    </button>
  );
}
