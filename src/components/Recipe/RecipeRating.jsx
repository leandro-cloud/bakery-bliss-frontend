import { Star } from "../icons/Icons"
import { userStore } from "../../context/userStore"
import { useEffect, useState } from "react"
import { axiosInstance, axiosPrivateInstance } from "../../api/axios"
import { Toaster, toast } from "sonner"



export const RecipeRating = ({ recipeID, rates, setRates, setIsratedByUser }) => {
  const user = userStore(state => state.user)
  const [updateRate, setUpdateRate] = useState(null)
  const [rateToUpdate, setRateToUpdate] = useState(null)

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axiosInstance.get(`/rate/recipe-rates/${recipeID}`)
        setRates(response.data.recipeRates.docs)
      } catch (error) {
        console.log(error)
      }
    }
    fetchRates()
  }, [recipeID])

  const handleUpdate = (rateData, commentData, id) => {
    setUpdateRate(id)
    setRateToUpdate({
      recipeId: recipeID,
      rate: rateData,
      comment: commentData
    })
  }

  const handleRateValue = (ratingValue) => {
    setRateToUpdate((prev) => ({
      ...prev,
      rate: prev.rate === ratingValue ? 0 : ratingValue
    }))
  }

  const handleCommentChange = (event) => {
    setRateToUpdate((prev) => ({
      ...prev,
      comment: event.target.value
    }))
  }

  const handleSubmit = async () => {
    try {
      const response = await axiosPrivateInstance.put('/rate/update-rate', rateToUpdate)
      const newRates = rates.filter(rate => rate._id !== response.data.updateRate._id)
      const newRate = {
        _id: response.data.updateRate._id,
        rate: response.data.updateRate.rate,
        comment: response.data.updateRate.comment,
        userId: {
          _id: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      }
      newRates.unshift(newRate)
      setRates(newRates)
      toast.success('Calificacion modificada', {
        className: 'toast-success'
      })
      setUpdateRate(null)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message, {
        className: 'toast-error'
      })
    }
  }


  const handleDelete = async (rateId) => {
    try {
      await axiosPrivateInstance.delete('/rate/delete-rate', {
        data: { recipeId: recipeID, user: 'Leandro' }
      })
      const newRates = rates.filter(rate => rate._id !== rateId)
      setRates(newRates)
      setIsratedByUser(false)
      toast.success('Calificacion eliminada', {
        className: 'toast-success'
      })
    } catch(error) {
      console.log(error)
      toast.error(error.response.data.message, {
        className: 'toast-error'
      })

    }
  }

  const handleCancel = () => {
    setUpdateRate(null)
    setRateToUpdate(null)
  }

  return (
    <>
      {(rates && rates.length > 0) && (
        <section className="comentarios-section">
          <div className="comentarios">
            {rates.map((rate) => (
              <div key={rate._id}>
                {updateRate === rate._id ? (
                  <>
                    <div className="rate-container">
                      <h2>Modifica tu calificacion</h2>
                      {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1
                        return (
                          <label key={index}>
                            <input type="radio"
                              name="rating"
                              value={rateToUpdate.rate}
                              onClick={() => handleRateValue(ratingValue)}
                              hidden />
                            <Star color={rateToUpdate.rate  - 1 >= index ? "#ffc107" : "#e4e5e9"} />
                          </label>
                        )
                      })}
                    </div>
                    <div className="comentario-container">
                      <div className="comentario">
                        <h5 className="user-names-rate">{user.firstName} {user.lastName}</h5>
                        <textarea value={rateToUpdate.comment} placeholder="Escribe tu comentario sobre la receta" className="input-comentario"
                        onChange={handleCommentChange}
                        />
                        <div className="button-valoracion">
                          <button type="submit" 
                          onClick={handleSubmit}
                          >Enviar</button>
                          <button onClick={handleCancel} className="cancelar">
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                    <Toaster />
                  </>

                ) : (
                  <>
                  <h2>Calificaciones</h2>
                    {[...Array(5)].map((_, index) => (
                      <label key={index}>
                        <Star color={rate.rate < index + 1 ? "#e4e5e9" : "#ffc107"} />
                      </label>
                    ))}
                    <div className="comentario-container">
                      <div className="comentario">
                        <h5 className="user-names-rate">{rate.userId.firstName} {rate.userId.lastName}</h5>
                        <p className="user-comment-rate">{rate.comment}</p>
                        {(user && user.userId === rate.userId._id) && (
                          <div className="button-valoracion">
                            <button
                              className="modificar"
                              type="button"
                              onClick={() => handleUpdate(rate.rate, rate.comment, rate._id)}
                            >Modificar</button>
                            <button
                              className="eliminar"
                              type="button"
                              onClick={() => handleDelete(rate._id)}
                            >Eliminar</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
