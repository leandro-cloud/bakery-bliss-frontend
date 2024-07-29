import { create } from "zustand"

export const userStore = create(set => ({
  user: JSON.parse(localStorage.getItem('user')),
  favorites: [],
  setUser: (userData) => set({ user: userData } ),
  setFavorites: (favoritesData) => set({ favorites: favoritesData}),
  addToFavorites: (recipeId) => set((state) => ({
    favorites: [...state.favorites, { recipeId }],
  })),
  removeFromFavorites: (recipeId) => set((state) => ({
    favorites: state.favorites.filter((favorite) => favorite.recipeId !== recipeId),
  })),
}))

