import { useSearchParams } from "react-router-dom"
import { recipeStore } from "../context/recipeStore"
import { useEffect, useState } from "react"
import { axiosInstance } from "../api/axios"
import { RecipesList } from "../components/RecipesList"
import '../styles/lists.css'
import { toast, Toaster } from "sonner"
import { NoResults } from "../components/NoResults"

export const Search = () => {

  const [params] = useSearchParams()
  const title = params.get('title')
  const recipesList = recipeStore(state => state.recipesList)
  const setRecipes = recipeStore(state => state.setRecipeList)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchByTitle = async () => {
      try {
        const response = await axiosInstance.get(`/recipes/by-title/${title}/${page}`)
        setRecipes(response.data.recipes)
      } catch (error) {
        console.log(error)
        setRecipes([])
        toast.error(error.response.data.message, {
          className: 'toast-error'
        })
      }
    }
    fetchByTitle()
  }, [params, page])

  return (
    <>
      <main className="main">
        <div className="container">
          {recipesList.totalDocs <= 0 ?
            <NoResults /> :
            <>
              <h2>Buscar {title}</h2>
              <RecipesList page={page} setPage={setPage}/>
            </>
          }
        </div>
          <Toaster />
      </main>
    </>
  )
}
