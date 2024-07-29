import { useEffect } from "react"
import { Carrousel } from "../components/Carrousel"
import { RecipesList } from "../components/RecipesList"
import { recipeStore } from "../context/recipeStore"
import '../styles/homepage.css'
import { axiosInstance } from "../api/axios"
import { userStore } from "../context/userStore"
import { toast, Toaster } from "sonner"

export const Homepage = () => {

  const setRecipeList = recipeStore(state => state.setRecipeList)
  const recipesList = recipeStore(state => state.recipesList)
  const user = userStore(state => state.user)

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const response = await axiosInstance('/recipes/random-recipes')
        setRecipeList(response.data.randomRecipes)
      } catch (error) {
        console.log(error.message)
        setRecipeList([])
        toast.error(error.response.data.message, {
          className: 'toast-error'
        })
      }
    }
    fetchRandomRecipes()
  }, [user])

  return (
    <main className="homepage">
      <div className="homepage-container">
        <Carrousel />
        {recipesList.totalDocs > 0 && (
          <RecipesList />
        )}
      </div>
      <Toaster />
    </main >

  )
}
