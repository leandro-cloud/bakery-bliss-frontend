import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { passwordChangeShcema } from "../schemas/registerLoginEditSchema"
import { axiosPrivateInstance } from "../api/axios"
import { userStore } from "../context/userStore"
import { toast, Toaster } from "sonner"

export const ChangePassword = ({ setEditPassword, editPassword }) => {

  const setUser = userStore(state => state.setUser)
  const setFavorites = userStore(state => state.setFavorites)

  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: zodResolver(passwordChangeShcema)
  })

  const onSubmit = async (data) => {
    try {
      const newData = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      }
      await axiosPrivateInstance.put('/user/change-password', newData)
      toast.success('Contraseña actualizada', {
        className: 'toast-success'
      })
      setTimeout(() => {
        setUser(null)
        setFavorites([])
        localStorage.removeItem('user')
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
      <h2>Cambiar contraseña</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Contraseña actual</label>
          <input type='password' {...register('oldPassword')} />
          {errors.oldPassword?.type && <p>{errors.oldPassword.message}</p>}
        </div>

        <div>
          <label>Contraseña nueva</label>
          <input type='password' {...register('newPassword')} />
          {errors.newPassword?.type && <p>{errors.newPassword.message}</p>}
        </div>

        <div>
          <label>Repite la contraseña</label>
          <input type='password' {...register('confirmNewPassword')} />
          {errors.confirmNewPassword?.type && <p>{errors.confirmNewPassword.message}</p>}
        </div>

        <button>Cambiar Contraseña</button>
      </form>

      <a className='changepasswordlink' onClick={() => setEditPassword(!editPassword)}>Cambiar datos personales</a>
      <Toaster />
    </>
  )
}
