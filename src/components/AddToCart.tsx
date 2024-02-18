'use client';
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
        setAdding(false);
      }
    } else {
      setAdding(true);
      const success = await addItemToCart(cartId, item);
      if (!success) {
        setAdding(false);
        return alert('There was an error adding this item to your cart, please try again');
      } else {
        setAdding(false);
      }
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      <p>{createDollarAmount((Number(product.price) * quantity).toFixed(2))}</p>
      <div className='flex gap-3 items-center w-full'>
        <button
          type='button'
          onClick={(e) => handleDecrement(e)}
          className='border-4 rounded-lg p-3 border-red-800 text-red-800 hover:bg-mint transition-all duration-200 ease-in-out'
        >
          <FaMinus className='w-6 h-6' />
        </button>
        <p className='border-4 w-full rounded-lg p-3 border-red-800 text-center'>{quantity}</p>
        <button
          type='button'
          onClick={(e) => handleIncrement(e)}
          className='border-4 rounded-lg p-3 border-red-800 text-red-800 hover:bg-mint transition-all duration-200 ease-in-out'
        >
          <FaPlus className='w-6 h-6' />
        </button>
      </div>
      <div className='flex flex-col gap-3'>
        <Select name='scent' value={scent} onChange={(e) => setScent(e.target.value)} label='Scent'>
          <option value={''}>Please Select a Scent</option>
          <option value={'bay leaf'}>Bay Leaf</option>
          <option value={'eucalyptus'}>Eucalyptus</option>
          <option value={'lavender'}>Lavender</option>
          <option value={'sage and rosemary'}>Sage and Rosemary</option>
          <option value={'tumeric and rosewater'}>Tumeric and Rosewater</option>
        </Select>
      </div>
      <button
        type='button'
        onClick={(e) => addToCart(e)}
        className={`w-full rounded-lg text-white bg-green-800 hover:bg-red-800 transition-all duration-200 ease-in-out px-2 py-3 ${oleo.className}`}
      >
        {adding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}
