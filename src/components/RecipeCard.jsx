import '../styles/recipeCard.css'
import { FilledFavoriteIcon, TimerIcon } from './icons/Icons'
import defaultImage from '../assets/images/default-recipe-image.jpg'
import { BASE_URL } from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { DIFFICULTY_LEVELS } from '../utils/constants'

export const RecipeCard = ({ title, prepTime, difficulty, image, isUser, isFavorite, id }) => {

  const navigate = useNavigate()

  const handleRecipe = () => {
    navigate(`/receta/${id}`)
  }

  return (
    <div className='recipe-card-container' onClick={handleRecipe}>
      {isUser && (
        <div className='recipe-favorite-icon'>
          <FilledFavoriteIcon color={`${isFavorite ? 'red' : 'gray'}`} />
        </div>
      )}
      <div className='image-card-container'>
        <img src={image === 'default.png' ? defaultImage : `${BASE_URL}/recipes/recipe-image/${image}`} />
      </div>
      <div className='recipe-card-info'>
        <h3>{title}</h3>
        <div className='timer-container'>
          <div className='timer-icon'>
            <TimerIcon />
          </div>
          <p>{prepTime}</p>
        </div>
        <p>Difficultad: <strong>{DIFFICULTY_LEVELS[difficulty]}</strong></p>
      </div>
    </div>
  )
}
