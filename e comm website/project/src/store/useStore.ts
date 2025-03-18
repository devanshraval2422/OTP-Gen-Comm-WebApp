import { create } from 'zustand';
import { CartItem, Product, User, ThemeStore } from '../types';

interface Store extends ThemeStore {
  user: User | null;
  isAuthenticated: boolean;
  cart: CartItem[];
  setUser: (user: User | null) => void;
  setAuthenticated: (status: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  isAuthenticated: false,
  cart: [],
  darkMode: false,
  setUser: (user) => set({ user }),
  setAuthenticated: (status) => set({ isAuthenticated: status }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
}));