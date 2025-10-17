import { create } from "zustand";
import {products} from "../data/products";

interface FavoritesStore {
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  getFavoritesCount: () => ReturnType<typeof products.filter>;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
    favorites: [],

    toggleFavorite: (productId) => {
        const favorites = get().favorites;
        if (favorites.includes(productId)) {
            //remove dos favoritos
            set({favorites: favorites.filter((id) => id !== productId)});
        } else {
            //adiciona aos favoritos
            set({favorites: [...favorites, productId]});
        }

        // Salva no localStorage manualmente
        localStorage.setItem(
            "favorites-storage",
            JSON.stringify({favorites: get().favorites})
        );
    },

    isFavorite: (productId) => {
        return get().favorites.includes(productId);
    },

    getFavoritesCount: () => {
        const favoriteIds = get().favorites;
        return products.filter((product) => favoriteIds.includes(product.id));
    }
}));

 // Carrega favoritos do localStorage ao iniciar a loja
    if (typeof window !== "undefined") {
        const savedFavorites = localStorage.getItem("favorites-storage");
        if (savedFavorites) {
            try {
                const {favorites} = JSON.parse(savedFavorites);
                useFavoritesStore.setState({favorites});
            } catch (error) {
                console.error("Erro ao carregar favoritos do localStorage:", error);
            }
        }
    }