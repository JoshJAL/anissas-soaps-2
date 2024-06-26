'use client';

import { clearCart } from '@/actions/turso/cart';
import { useEffect } from 'react';

export default function ClearCart({ orderComplete }: { orderComplete: string }) {
  useEffect(() => {
    if (orderComplete === 'completed') {
      const cartId = localStorage.getItem('cartId');
      if (!cartId) return;
      clearCart(cartId);
    }
  }, [orderComplete]);
  return <></>;
}
