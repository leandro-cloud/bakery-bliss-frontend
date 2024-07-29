import { useEffect, useState } from "react"
import { RecipesList } from "../components/RecipesList"
import { recipeStore } from "../context/recipeStore"
import { axiosInstance } from "../api/axios"
import { useSearchParams } from "react-router-dom"
import { toast, Toaster } from "sonner"
import { NoResults } from "../components/NoResults"


export const SearchByCategory = () => {

  const recipesList = recipeStore(state => state.recipesList)
  const [params] = useSearchParams()
  const categoryId = params.get('category')
  const categoryName = params.get('name')
  const setRecipes = recipeStore(state => state.setRecipeList)
  const [page, setPage] = useState(1)

  useEffect(() => { 
    const fetchRecipeByCategory = async () => {
      try {
        const response = await axiosInstance.get(`/recipes/by-category/${categoryId}/${page}`)
        setRecipes(response.data.recipes)
      }
       catch (error) {
        console.log(error)
        toast.error(error.response.data.message, {
          className: 'toast-error'
        })
       }
    }
    fetchRecipeByCategory()
  }, [page, params])

  return (
    <main className="main">
        <div className="container">
          {recipesList.totalDocs <= 0 ?
            <NoResults /> :
            <>
              <h2>Categoria: {categoryName}</h2>
              <RecipesList page={page} setPage={setPage}/>
            </>
          }
        </div>
        <Toaster />
      </main>
  )
}
