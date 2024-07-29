import { create } from "zustand"

export const recipeStore = create(set => ({
  recipesList: [],
  setRecipeList: (recipesData) => set({ recipesList: recipesData } ),
}))