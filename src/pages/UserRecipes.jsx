import { useEffect, useState } from "react"
import { recipeStore } from "../context/recipeStore"
import { axiosPrivateInstance } from "../api/axios"
import { RecipesList } from "../components/RecipesList"
import { userStore } from "../context/userStore"
import '../styles/lists.css'
import { toast, Toaster } from "sonner"
import { NoResults } from "../components/NoResults"

export const UserRecipes = () => {
  const recipesList = recipeStore(state => state.recipesList)
  const setRecipes = recipeStore(state => state.setRecipeList)
  const user = userStore(state => state.user)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await axiosPrivateInstance(`/recipes/user-recipes/${user.userId}/${page}`)
        setRecipes(response.data.recipes)
      } catch (error) {
        console.log(error)
        setRecipes([])
        toast.error(error.response.data.message, {
          className: 'toast-error'
        })
      }
    }

    if (user.userId) {
      fetchMyRecipes()
    }
  }, [user, page])

  return (
    <>
      <main className="main">
        <div className="container">
          {recipesList.totalDocs <= 0 ?
            <NoResults /> :
            <>
              <h2>Mis Recetas</h2>
              <RecipesList page={page} setPage={setPage} />
            </>
          }
        </div>
        <Toaster />
      </main>
    </>
  )
}
