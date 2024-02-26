'use client';

import { useCartStore } from '@/utils/cartStore';
import { createDollarAmount } from '@/utils/createDollarAmount';
import type { Inventory } from '@prisma/client';
import { Oleo_Script_Swash_Caps } from 'next/font/google';
import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Select from './inputs/Select';
import { addItemToCart, createCart } from '@/actions/prisma';
import { CartItem } from '@/types/cartItem';

const oleo = Oleo_Script_Swash_Caps({ weight: '400', subsets: ['latin'] });

export default function AddToCart({ product, mainImage }: { product: Inventory; mainImage: string }) {
  const [quantity, setQuantity] = useState<number>(1);
  const [scent, setScent] = useState<string>('');
  const [adding, setAdding] = useState<boolean>(false);
  const { setCartOpen } = useCartStore();

  function handleDecrement(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function handleIncrement(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setQuantity(quantity + 1);
  }

  async function addToCart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (scent === '') return alert('Please select a scent');
    const item: CartItem = {
      itemId: product.id,
      itemImage: mainImage,
      itemName: product.name,
      itemPrice: product.price,
      itemScent: scent,
      quantity
    };
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      setAdding(true);
      const cart = await createCart(item);
      if (!cart) {
        setAdding(false);
        return alert('There was an error adding this item to your cart, please try again');
      } else {
        localStorage.setItem('cartId', cart!.id.toString());
        setCartOpen(true);
        setAdding(false);
      }
    } else {
      setAdding(true);
      const success = await addItemToCart(cartId, item);
      if (!success) {
        setAdding(false);
        return alert('There was an error adding this item to your cart, please try again');
      } else {
        setCartOpen(true);
        setAdding(false);
      }
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      <p>{createDollarAmount((Number(product.price) * quantity).toFixed(2))}</p>
      <div className='flex w-full items-center gap-3'>
        <button
          type='button'
          onClick={(e) => handleDecrement(e)}
          className='hover:bg-mint rounded-lg border-4 border-red-800 p-3 text-red-800 transition-all duration-200 ease-in-out'
        >
          <FaMinus className='h-6 w-6' />
        </button>
        <p className='w-full rounded-lg border-4 border-red-800 p-3 text-center'>{quantity}</p>
        <button
          type='button'
          onClick={(e) => handleIncrement(e)}
          className='hover:bg-mint rounded-lg border-4 border-red-800 p-3 text-red-800 transition-all duration-200 ease-in-out'
        >
          <FaPlus className='h-6 w-6' />
        </button>
      </div>
      <div className='flex flex-col gap-3'>
        <Select name='scent' value={scent} onChange={(e) => setScent(e.target.value)} label='Scent'>
          <option value={''}>Please Select a Scent</option>
          <option value={'Bay Leaf'}>Bay Leaf</option>
          <option value={'Eucalyptus'}>Eucalyptus</option>
          <option value={'Lavender'}>Lavender</option>
          <option value={'Sage and Rosemary'}>Sage and Rosemary</option>
          <option value={'Tumeric and Rosewater'}>Tumeric and Rosewater</option>
        </Select>
      </div>
      <button
        type='button'
        onClick={(e) => addToCart(e)}
        className={`w-full rounded-lg bg-green-800 px-2 py-3 text-white transition-all duration-200 ease-in-out hover:bg-red-800 ${oleo.className}`}
      >
        {adding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}
