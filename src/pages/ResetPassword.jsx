import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast, Toaster } from 'sonner'
import { resetPasswordSchema } from '../schemas/registerLoginEditSchema'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/resetPassword.css'
import { axiosInstance } from '../api/axios'

export const ResetPassword = () => {

  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: zodResolver(resetPasswordSchema)
  })
  const navigate = useNavigate()

  const { token } = useParams()

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post(`/user/reset-password/${token}`, { password: data.newPassword })
      toast.success('Contraseña restablecida', {
        className: 'toast-success'
      })
      setTimeout(() => {
        navigate(`/login`)
      }, 2000)
    } catch (error) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message, {
        className: 'toast-error'
      })
    }
  }

  return (
    <main className='main-reset-password'>
      <section className='reset-password-modal'>
        <h2>Restablece tu contraseña</h2>
        <form className='reset-password-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='new-password'>
            <label>Contraseña nueva</label>
            <input type='password' {...register('newPassword')} />
            {errors.newPassword?.type && <p>{errors.newPassword.message}</p>}
          </div>

          <div className='repeat-new-password'>
            <label>Repite la contraseña</label>
            <input type='password' {...register('confirmNewPassword')} />
            {errors.confirmNewPassword?.type && <p className='errors-reset-password'>{errors.confirmNewPassword.message}</p>}
          </div>

          <button>Cambiar Contraseña</button>
        </form>
      </section>
      <Toaster />
    </main>
  )
}
