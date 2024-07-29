import { useEffect, useState } from "react"
import { RecipesList } from "../components/RecipesList"
import { recipeStore } from "../context/recipeStore"
import { axiosInstance } from "../api/axios"
import { useSearchParams } from "react-router-dom"
import { toast, Toaster } from "sonner"
import { NoResults } from "../components/NoResults"


export const SearchByDifficulty = () => {

  const recipesList = recipeStore(state => state.recipesList)
  const [params] = useSearchParams()
  const difficulty = params.get('difficulty')
  const difficultyName = params.get('name')
  const setRecipes = recipeStore(state => state.setRecipeList)
  const [page, setPage] = useState(1)

  

  useEffect(() => { 
    const fetchRecipeByDifficulty = async () => {
      try {
        const response = await axiosInstance.get(`/recipes/by-difficulty/${difficulty}/${page}`)
        setRecipes(response.data.recipes)
      }
       catch (error) {
        console.log(error)
        toast.error(error.response.data.message, {
          className: 'toast-error'
        })
       }
    }
    fetchRecipeByDifficulty()
  }, [page, params])

  return (
    <main className="main">
        <div className="container">
          {recipesList.totalDocs <= 0 ?
            <NoResults  /> :
            <>
              <h2>Dificultad: {difficultyName}</h2>
              <RecipesList page={page} setPage={setPage}/>
            </>
          }
        </div>
          <Toaster />
      </main>
  )
}