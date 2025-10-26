import { create } from 'zustand';
import type { Product } from '../types';
import { products } from '../data/products';

interface FavoritesStore {
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  getFavoriteProducts: () => Product[];
}

// Função para carregar favoritos do localStorage
const loadFavoritesFromStorage = (): number[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const savedFavorites = localStorage.getItem('favorites-storage');
    if (savedFavorites) {
      const { favorites } = JSON.parse(savedFavorites);
      return Array.isArray(favorites) ? favorites : [];
    }
  } catch (error) {
    console.error('Erro ao carregar favoritos:', error);
  }
  return [];
};

// Função para salvar favoritos no localStorage
const saveFavoritesToStorage = (favorites: number[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('favorites-storage', JSON.stringify({ favorites }));
  } catch (error) {
    console.error('Erro ao salvar favoritos:', error);
  }
};

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: loadFavoritesFromStorage(),

  toggleFavorite: (productId) => {
    const favorites = get().favorites || [];
    
    let newFavorites: number[];
    
    if (favorites.includes(productId)) {
      // Remove dos favoritos
      newFavorites = favorites.filter((id) => id !== productId);
    } else {
      // Adiciona aos favoritos
      newFavorites = [...favorites, productId];
    }

    set({ favorites: newFavorites });
    saveFavoritesToStorage(newFavorites);
  },

  isFavorite: (productId) => {
    const favorites = get().favorites || [];
    return favorites.includes(productId);
  },

  getFavoriteProducts: () => {
    const favoriteIds = get().favorites || [];
    return products.filter((product) => favoriteIds.includes(product.id));
  },
}));