import { useForm } from 'react-hook-form'
import { toast, Toaster } from 'sonner'
import { axiosInstance } from '../api/axios'

export const ForgotPassword = ({ setForgotPassword, forgorPassword}) => {

  const { register, formState: { errors }, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post('/user/forgot-password',  data )
      toast.success('Email enviado', {
        className: 'toast-success',
        description: 'El email tiene 5 minutos de validez'
      })
    } catch (error) {
      toast.error(error.response.data.message, {
        className: 'toast-error'
      })
    }
  }


  return (
    <section className='form-container'>
      <h2>Olvidaste tu contraseña?</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" style={{border: 'none'}} {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i })} placeholder="email" />
        {errors.email?.type && errors.email?.type !== 'pattern' && <p>Campo requerido</p>}
        {errors.email?.type === 'pattern' && <p>El formato del email es incorrecto</p>}
        <button type='submit'>Enviar</button>
        <button style={{backgroundColor: 'red'}} type='button' onClick={() => setForgotPassword(!forgorPassword)}>Cancelar</button>
      </form>
      <Toaster />
    </section>
  )
}
