import "../styles/recipe.css"
import { useEffect, useState } from "react"
import { axiosInstance } from "../api/axios"
import { useParams } from "react-router-dom"
import { RecipeIngredients } from "../components/Recipe/RecipeIngredients"
import { RecipeRating } from "../components/Recipe/RecipeRating"
import { RateRecipe } from "../components/Recipe/RateRecipe"
import { userStore } from "../context/userStore"
import { DeleteUpdate } from "../components/Recipe/DeleteUpdate"
import { toast, Toaster } from "sonner"


export const Recipe = () => {
  const [recipe, setRecipe] = useState(null)
  const [publisher, setPublisher] = useState(null)
  const user = userStore(state => state.user)
  const [isRatedByUser, setIsratedByUser] = useState(false)
  const [rates, setRates] = useState(null)

  const { recipeID } = useParams()

  useEffect(() => {
    const fetchRecipe = async () => {
      const url = user && user.userId ? `/recipes/get-recipe/${recipeID}/${user.userId}` : `/recipes/get-recipe/${recipeID}`
      try {
        const response = await axiosInstance.get(url)
        setRecipe(response.data.recipe)
        setPublisher(response.data.publisher)
        setIsratedByUser(response.data.isRatedByUser)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message, {
          className: 'toast-error'
        })
      }
    }
    fetchRecipe()
  }, [recipeID, user])

  return (
    <>
      {!recipe ?
        <p>No hay elementos que mostrar</p> :
        <main className="recipe-main">
          <RecipeIngredients
            id={recipe._id}
            title={recipe.title}
            image={recipe.image}
            prepTime={recipe.prepTime}
            difficulty={recipe.difficulty}
            firstName={publisher.firstName}
            lastName={publisher.lastName}
            categories={recipe.category}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            averageRating={recipe.averageRating}
            quantity={recipe.quantity}
          />
          
          {
            user && user.userId === publisher._id && (
              <DeleteUpdate recipeId={recipeID}/>
            )
          }
         
          {(user && user.userId !== publisher._id) && (
            <RateRecipe 
              recipeID={recipeID} 
              setIsratedByUser={setIsratedByUser} 
              isRatedByUser={isRatedByUser} 
              rates={rates}
              setRates={setRates}
              />
          )}
      
          <RecipeRating recipeID={recipeID} rates={rates} setRates={setRates} setIsratedByUser={setIsratedByUser}/>

        <Toaster />
        </main>
      }
    </>
  )
}
