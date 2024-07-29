import { useEffect, useState } from 'react'
import { userStore } from '../../context/userStore'
import { axiosPrivateInstance, BASE_URL } from '../../api/axios'
import { FilledFavoriteIcon, TimerIcon } from '../icons/Icons'
import defaultRecipe from '../../assets/images/default-recipe-image.jpg'
import { Checked } from '../Checked'
import { CheckedInstruction } from '../CheckedInstruction'
import { BarComponent } from '../Bars'
import { DIFFICULTY_LEVELS } from '../../utils/constants'
import { toast, Toaster } from 'sonner'

export const RecipeIngredients = ({ id, title, image, prepTime, difficulty, firstName, lastName, categories, ingredients, instructions, averageRating, quantity }) => {

  const user = userStore(state => state.user)
  const favorites = userStore(state => state.favorites)
  const [isFavorite, setIsFavorite] = useState(false)
  const addToFavorites = userStore(state => state.addToFavorites)
  const removeFromFavorites = userStore(state => state.removeFromFavorites)

  useEffect(() => {
    if (user && favorites.length > 0) {
      const isFavorite = favorites.some(favorite => favorite.recipeId === id)
      setIsFavorite(isFavorite)
    }
  }, [user, favorites, id])

  const handleFavorite = async () => {
    if (!isFavorite) {
      try {
        await axiosPrivateInstance.post('/favorites/register-favorite', {
          recipeId: id
        })

        addToFavorites(id)
        setIsFavorite(true)
        toast.success('Agregado a favoritos', {
          className: 'toast-success'
        })
      } catch (error) {
        console.log(error)
      }

    } else {
      try {
        await axiosPrivateInstance.delete('/favorites/delete-favorite', {
          data: {
            recipeId: id
          }
        })
        removeFromFavorites(id)
        setIsFavorite(false)
        toast.success('Borrado de favoritos', {
          className: 'toast-success'
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div className="recipe-main-container">
      <div className="recipe-board">
        {(user && favorites) && (
          <div className="favorite-icon"
            title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            onClick={handleFavorite}>
            <FilledFavoriteIcon color={isFavorite ? 'red' : 'gray'} />
          </div>
        )}
        <div className="title-container-recipe">
          <h2>{title}</h2>
        </div>
        <div className='recipe-container'>
          <section className="image-detail-container">
            <div className="image-recipe-container">
              <img src={image === 'default.png' ? defaultRecipe : `${BASE_URL}/recipes/recipe-image/${image}`} className="imagen" />
            </div>
            <div className="container-details">
              <div className="details">
                {<div className='average-rate-recipe'>
                  <p><strong>Calificacion promedio: </strong> </p>
                  <BarComponent rate={averageRating} />
                </div>}
                <div className="prep-time">
                  <div className="prep-time-icon">
                    <TimerIcon />
                  </div>
                  <p> <strong>Tiempo de preparacion:</strong> {prepTime}</p>
                </div>
                <div>
                  <p><strong>Porciones: </strong> {quantity}</p>
                </div>
                <div className="dificultad">
                  <p><strong>Dificultad: </strong>{DIFFICULTY_LEVELS[difficulty]}</p>
                </div>
                <div>
                  <p><strong>Publicado por: </strong>{firstName} {lastName}</p>
                </div>
                <div className="categorias">
                  <h3>Categorias</h3>
                  <div>
                    <ul className="lista-categorias">
                      {categories.map((category) => (
                        <li key={category._id}>{category.category}</li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>

          </section>

          <section className="recipe-section">
            <div className="ingredients-instructions-container">
              <div className='ingredientes'>
                <h3>Ingredientes</h3>
                <ul className="lista-ingredientes">
                  {ingredients.map((ingredient, index) => (
                    <Checked key={index} ingredient={ingredient} />
                  )
                  )}
                </ul>
              </div>

              <div className="instrucciones">
                <h3>Instrucciones</h3>
                <ul className="lista-ingredientes">
                  {instructions.map((instruction, index) => {
                    return (
                      <CheckedInstruction key={index} instruction={instruction} />
                    )
                  }
                  )}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
