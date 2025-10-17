import { create } from 'zustand';
import type { Product } from '../types';
import { products } from '../data/products';

interface FavoritesStore {
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  getFavoriteProducts: () => Product[];
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],

  toggleFavorite: (productId) => {
    const favorites = get().favorites;
    
    if (favorites.includes(productId)) {
      // Remove dos favoritos
      set({ favorites: favorites.filter((id) => id !== productId) });
    } else {
      // Adiciona aos favoritos
      set({ favorites: [...favorites, productId] });
    }

    // Salva no localStorage
    localStorage.setItem('favorites-storage', JSON.stringify({ favorites: get().favorites }));
  },

  isFavorite: (productId) => {
    return get().favorites.includes(productId);
  },

  getFavoriteProducts: () => {
    const favoriteIds = get().favorites;
    return products.filter((product) => favoriteIds.includes(product.id));
  },
}));

// Carrega favoritos do localStorage ao iniciar
if (typeof window !== 'undefined') {
  const savedFavorites = localStorage.getItem('favorites-storage');
  if (savedFavorites) {
    try {
      const { favorites } = JSON.parse(savedFavorites);
      useFavoritesStore.setState({ favorites });
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  }
}