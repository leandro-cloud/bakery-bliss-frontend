import { useNavigate } from "react-router-dom"
import { axiosPrivateInstance } from "../../api/axios"
import { WarningIcon } from "../icons/Icons"
import { useState } from "react"
import { toast, Toaster } from "sonner"

export const DeleteUpdate = ({ recipeId }) => {
  const [modalOn, setModalOn] = useState(false)
  const navigate = useNavigate()

  const handleUpdateRecipe = async () => {
    navigate(`/modificar-receta/${recipeId}`)
  }

  const handleDeleteRecipe = async () => {
    try {
      await axiosPrivateInstance.delete('/recipes/delete-recipe', {
        data: {
          recipeId
        }
      })
      toast.success('Receta eliminada', {
        className: 'toast-success'
      })

      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message, {
        className: 'toast-error'
      })
    }
  }

  return (
    <>
      <div className="update-delete-buttons">
        <button className="modificar" onClick={handleUpdateRecipe}>Modificar Receta</button>
        <button className="eliminar" onClick={() => setModalOn(true)}>Eliminar Receta</button>
      </div>

      <div className={`delete-modal ${modalOn ? 'modal-visible' : ''}`}>
        <div className="modal-container">
          <div className="modal-icon">
            <WarningIcon />
          </div>

          <div className="modal-warning">
            <h3>Estas seguro que quieres borrar esta receta?</h3>
            <p>Esta accion es irreversible</p>
          </div>
          <div className="modal-buttons">
            <button className="eliminar" onClick={handleDeleteRecipe}>Eliminar</button>
            <button className="cancelar" onClick={() => setModalOn(false)}>Cancelar</button>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}
