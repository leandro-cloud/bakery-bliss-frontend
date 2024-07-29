import { useEffect } from "react"
import { axiosPrivateInstance } from "../api/axios"
import { recipeStore } from "../context/recipeStore"
import { RecipesList } from "../components/RecipesList"
import '../styles/lists.css'
import { toast, Toaster } from "sonner"
import { NoResults } from "../components/NoResults"

export const Favorites = () => {
  const recipesList = recipeStore(state => state.recipesList)
  const setRecipes = recipeStore(state => state.setRecipeList)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axiosPrivateInstance.get('/favorites/user-favorites')
        setRecipes(response.data.favorites)
      
      } catch (error) {
        console.log(error)
        setRecipes([])
        toast.error(error.response.data.message, {
          className: 'toast-error'
        })
      }
    }
    fetchFavorites()
  }, [])

  return (
    <>
      <main className="main">
        <div className="container">
          {recipesList.totalDocs <= 0 ?
            <NoResults /> :
            <>
              <h2>Mis Favoritos</h2>
              <RecipesList />
            </>
          }
        </div>

        <Toaster />
      </main>
    </>
  )
}
