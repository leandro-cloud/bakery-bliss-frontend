import { userStore } from "../../context/userStore"
import { useState } from "react"
import { Star } from "../icons/Icons"
import { axiosPrivateInstance } from "../../api/axios"
import { Toaster, toast } from "sonner"

export const RateRecipe = ({ recipeID, setIsratedByUser, isRatedByUser, rates, setRates }) => {

  const user = userStore(state => state.user)
  const [rateToCreate, setRateToCreate] = useState({
    rate: 0,
    comment: ''
  })

  const handleRateValue = (ratingValue) => {
    setRateToCreate(prev => ({
      ...prev,
      rate: prev.rate === ratingValue ? 0 : ratingValue
    }))
  }

  const handleCommentChange = (event) => {
    setRateToCreate(prev => ({
      ...prev,
      comment: event.target.value
    }))
  }

  const handleSubmit = async () => {
    try {
      const response = await axiosPrivateInstance.post('/rate/rate-recipe', { 
        recipeId: recipeID, 
        rate: rateToCreate.rate, 
        comment: rateToCreate.comment })
      const newRates = rates
      const newRate = {
        _id: response.data.saveRate._id,
        rate: response.data.saveRate.rate,
        comment: response.data.saveRate.comment,
        userId: {
          _id: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      }
      newRates.unshift(newRate)
      setRates(newRates)
      setIsratedByUser(true)
      setRateToCreate({
        rate: 0,
        comment: null
      })
      toast.success('Calificacion enviada', {
        className: 'toast-success'
      })
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message, {
        className: 'toast-error'
      })
    }
  }

  return (
    <>
      {!isRatedByUser && (
        <section className="valoracion-section">
          <div className="valoracion">
          <div className="rate-container">
              <h2>Califica esta receta</h2>
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1

                return (
                  <label key={index} className="rate-star">
                    <input type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => handleRateValue(ratingValue)}
                      hidden />
                    <Star color={ratingValue <= rateToCreate.rate ? "#ffc107" : "#e4e5e9"} />
                  </label>
                )
              })}
            </div>
            <div className="comentario-container">
              <div className="comentario">
                <h5 className="user-names-rate">{user.firstName} {user.lastName}</h5>
                <textarea value={rateToCreate.comment} placeholder="Escribe tu comentario sobre la receta" className="input-comentario"
                  onChange={handleCommentChange}
                />
                <div className="button-valoracion">
                  <button type="submit" onClick={handleSubmit}>Enviar</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <Toaster />
    </>
  )
}
