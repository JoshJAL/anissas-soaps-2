import { create } from 'zustand';

interface CartStore {
  cartOpen: boolean;
  setCartOpen: (cartOpen: boolean) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartOpen: false,
  setCartOpen: (cartOpen) => set({ cartOpen })
}));
