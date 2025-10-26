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

// Função para carregar o carrinho do localStorage
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const savedCart = localStorage.getItem('cart-storage');
    if (savedCart) {
      const { cart } = JSON.parse(savedCart);
      return Array.isArray(cart) ? cart : [];
    }
  } catch (error) {
    console.error('Erro ao carregar carrinho:', error);
  }
  return [];
};

// Função para salvar o carrinho no localStorage
const saveCartToStorage = (cart: CartItem[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('cart-storage', JSON.stringify({ cart }));
  } catch (error) {
    console.error('Erro ao salvar carrinho:', error);
  }
};

export const useCartStore = create<CartStore>((set, get) => ({
  cart: loadCartFromStorage(),
  user: null,

  addToCart: (product) => {
    const cart = get().cart || [];
    const existingItem = cart.find((item) => item.product.id === product.id);

    let newCart: CartItem[];
    
    if (existingItem) {
      newCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { product, quantity: 1 }];
    }

    set({ cart: newCart });
    saveCartToStorage(newCart);
  },

  removeFromCart: (productId) => {
    const cart = get().cart || [];
    const newCart = cart.filter((item) => item.product.id !== productId);
    set({ cart: newCart });
    saveCartToStorage(newCart);
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }

    const cart = get().cart || [];
    const newCart = cart.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    
    set({ cart: newCart });
    saveCartToStorage(newCart);
  },

  clearCart: () => {
    set({ cart: [] });
    saveCartToStorage([]);
  },

  getCartTotal: () => {
    const cart = get().cart || [];
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },

  getCartItemsCount: () => {
    const cart = get().cart || [];
    return cart.reduce((count, item) => count + item.quantity, 0);
  },

  setUser: (user) => {
    set({ user });
  },
}));