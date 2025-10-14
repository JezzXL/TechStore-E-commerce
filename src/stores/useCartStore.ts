import { create } from 'zustand';
import type { Product, CartItem, User } from '../types';

interface CartStore {
  cart: CartItem[];
  user: User | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  setUser: (user: User | null) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  user: null,

  addToCart: (product) => {
    const cart = get().cart;
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      set({
        cart: cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ cart: [...cart, { product, quantity: 1 }] });
    }

    // Salva no localStorage manualmente
    localStorage.setItem('cart-storage', JSON.stringify({ cart: get().cart }));
  },

  removeFromCart: (productId) => {
    set({ cart: get().cart.filter((item) => item.product.id !== productId) });
    localStorage.setItem('cart-storage', JSON.stringify({ cart: get().cart }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }

    set({
      cart: get().cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    });
    localStorage.setItem('cart-storage', JSON.stringify({ cart: get().cart }));
  },

  clearCart: () => {
    set({ cart: [] });
    localStorage.setItem('cart-storage', JSON.stringify({ cart: [] }));
  },

  getCartTotal: () => {
    return get().cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },

  getCartItemsCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  },

  setUser: (user) => {
    set({ user });
  },
}));

// Carrega do localStorage ao iniciar
if (typeof window !== 'undefined') {
  const savedCart = localStorage.getItem('cart-storage');
  if (savedCart) {
    try {
      const { cart } = JSON.parse(savedCart);
      useCartStore.setState({ cart });
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  }
}