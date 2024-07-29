import { RecipeCard } from "./RecipeCard"
import '../styles/recipesList.css'
import { userStore } from "../context/userStore"
import { recipeStore } from "../context/recipeStore"

export const RecipesList = ({ page, setPage }) => {

  const recipes = recipeStore(state => state.recipesList)
  const user = userStore(state => state.user)
  const favorites = userStore(state => state.favorites)


  const isUser = user ? true : false

  return (
    <>
      {recipes.docs && (
        <div className="recipes-list-container">
          <div className="recipes-list">
            <>
              {recipes.docs.map((recipe) => {
                const isFavorite = user ? favorites.some(receta => receta.recipeId === recipe._id) : false
                return (
                  <RecipeCard key={recipe._id} title={recipe.title} difficulty={recipe.difficulty} prepTime={recipe.prepTime} image={recipe.image} isUser={isUser} isFavorite={isFavorite} id={recipe._id} />
                )
              })}
            </>

          </div>
          {recipes.totalPages > 1 && (
            <div className="paginate-container">
              {[...Array(recipes.totalPages)].map((_, index) => (

                <div className={`button-paginate-container ${page === index + 1 ? 'isSelect' : ''}`} key={index}>
                  <button onClick={() => setPage(index + 1)}>{index + 1}</button>
                </div>

              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
