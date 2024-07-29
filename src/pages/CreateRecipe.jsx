import '../styles/createRecipe.css'
import { FormRecipe } from '../components/RecipesForm'

export const CreateRecipe = () => {
  return (
    <main className='create-recipe-main'>
      <div className='create-recipe-container'>
        <div className='page-title'>
          <h2>Crear una receta</h2>
        </div>
        <FormRecipe />
      </div>
    </main>
  )
}


