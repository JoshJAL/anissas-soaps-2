'use client';

import { clearCart } from '@/actions/prisma';
import { useEffect } from 'react';

export default function ClearCart({ orderComplete }: { orderComplete: string }) {
  useEffect(() => {
    if (orderComplete === 'completed') {
      const cartId = localStorage.getItem('cartId');
      console.log(cartId);
      if (!cartId) return;
      clearCart(cartId);
    }
  }, [orderComplete]);
  return <></>;
}
