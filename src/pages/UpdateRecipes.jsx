import { useParams } from 'react-router-dom'
import { UpdateFormRecipe } from '../components/RecipeUpdateForm'
import '../styles/createRecipe.css'
import { useEffect, useState } from 'react'
import { axiosInstance, axiosPrivateInstance } from '../api/axios'
import { toast, Toaster } from 'sonner'

export const UpdateRecipe = () => {
  const [categories, setCategories] = useState(null)
  const [recipe, setRecipe] = useState(null)
  const { recipeId } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axiosInstance.get('categories/get-categories')
        setCategories(response1.data.categories)

        const response2 = await axiosPrivateInstance.get(`recipes/get-recipe-to-update/${recipeId}`)
        setRecipe(response2.data.recipe)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message, {
          className: 'toast-error'
        })
      }
    }

    fetchData()
  }, [recipeId])

  return (
    <main className='create-recipe-main'>
      <div className='create-recipe-container'>
        <div className='page-title'>
          <h2>Modificar receta</h2>
        </div>
        <UpdateFormRecipe recipe={recipe} categories={categories} recipeId={recipeId}/>
      </div>
      <Toaster />
    </main>
  )
}