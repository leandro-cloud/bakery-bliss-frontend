import { zodResolver } from '@hookform/resolvers/zod'
import { registerEditSchema } from '../schemas/registerLoginEditSchema'
import { userStore } from '../context/userStore'
import { useForm } from 'react-hook-form'
import { axiosPrivateInstance } from '../api/axios'
import { toast, Toaster } from 'sonner'

export const ChangeUserData = ({ editPassword, setEditPassword }) => {

  const user = userStore(state => state.user)
  const setUser = userStore(state => state.setUser)

  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: zodResolver(registerEditSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email
    } || {}
  })

  const onClick = async (data) => {
    try {
      const response = await axiosPrivateInstance.put('/user/update', data)
      setUser(response.data.user)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      toast.success('Datos actualizados', {
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
      <h2>Editar datos personales</h2>
      <form onSubmit={handleSubmit(onClick)}>
        <div>
          <label>Nombre</label>
          <input type="text" {...register("firstName", { required: true })} placeholder="nombre" />
          {errors.firstName?.type && <p>{errors.firstName.message}</p>}
        </div>

        <div>
          <label>Apellido</label>
          <input type="text" {...register("lastName", { required: true })} placeholder="apellido" />
          {errors.lastName?.type && <p>{errors.lastName.message}</p>}
        </div>

        <div>
          <label>Nombre de usuario</label>
          <input type="text" {...register("userName", { required: true })} placeholder="nombre de usuario" />
          {errors.userName?.type && <p>{errors.userName.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />

          {errors.email?.type && <p>{errors.email.message}</p>}
        </div>
        <button type="submit">Editar</button>
      </form>
      <a className='changepasswordlink' onClick={() => setEditPassword(!editPassword)}>Cambiar contraseña</a>
      <Toaster />
    </>
  )
}
