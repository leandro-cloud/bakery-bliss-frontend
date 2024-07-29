import { userStore } from "../../context/userStore"
import { Star } from "../icons/Icons"
import defaultUser from '../../assets/images/user.png'

export const Rate = ({ handleRateValue }) => {

  const user = userStore(state => state.user)

  return (
    <>
      <div className="rate-container">
        <h2>Califica esta receta</h2>
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1

          return (
            <label key={index}>
              <input type="radio"
                name="rating"
                value={ratingValue}

                // pasar como handleValue
                onClick={() => handleRateValue(ratingValue)}
                hidden />
                {/* pasar como valor especifico para cada caso */}
              <Star color={ratingValue <= rateToCreate.rate ? "#ffc107" : "#e4e5e9"} />
            </label>
          )
        })}
      </div>
      <div className="comentario-container">
        <div className="image-user">
          <img src={defaultUser} />
        </div>
        <div className="comentario">
          <h5>{user.firstName} {user.lastName}</h5>

          {/* pasar como comment */}
          <textarea value={comment} placeholder="Escribe tu comentario sobre la receta" className="input-comentario"
          // misma funcion
            onChange={handleCommentChange}
          />
          <div className="button-valoracion">
            {/* Este depende de la accion */}
            <button type="submit" onClick={handleSubmit}>Enviar</button>
          </div>
        </div>
      </div>
    </>
  )
}
