import { Link, Navigate, useNavigate } from "react-router-dom"
import wallper from '../assets/images/walper.jpg'
import { userStore } from "../context/userStore"
import { axiosInstance } from "../api/axios"
import { useForm } from "react-hook-form"
import { Toaster, toast } from "sonner"
import '../styles/loginRegister.css'

export const Register = () => {

  const user = userStore(state => state.user)
  const navigate = useNavigate()
  const { register, formState: { errors }, handleSubmit } = useForm()

  const onClick = async (data) => {
    try {
      await axiosInstance.post('http://localhost:3000/api/user/register', data)
      toast.success('Registro exitoso', {
        className: 'toast-success'
      })
      setTimeout(() => {
        navigate(`/login`)
      }, 2000)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message, {
        className: 'toast-error'
      })
    }
  }

  if (user) {
    return <Navigate to='/' replace />
  }

  return (
    <>
      <main className="main-container">
        <div className="login-container">
          <section className="aside-container">
            <div className="image-container">
              <img src={wallper} />
            </div>
          </section>

          <section className="form-container">
            <h2>Bienvenido</h2>
            <form onSubmit={handleSubmit(onClick)}>
              <div>
                <input type="text" {...register("firstName", { required: true })} placeholder="nombre" />
                {errors.firstName?.type && <p>Campo requedido</p>}
              </div>

              <div>
                <input type="text" {...register("lastName", { required: true })} placeholder="apellido" />
                {errors.lastName?.type && <p>Campo requedido</p>}
              </div>

              <div>
                <input type="text" {...register("userName", { required: true })} placeholder="nombre de usuario" />
                {errors.userName?.type && <p>Campo requedido</p>}
              </div>

              <div>
                <input type="email" {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i })} placeholder="email" />
                {errors.email?.type && errors.email?.type !== 'pattern' && <p>Campo requerido</p>}
                {errors.email?.type === 'pattern' && <p>El formato del email es incorrecto</p>}
              </div>

              <div>
                <input type="password" {...register("password", { required: true })} placeholder="password" />
                {errors.password?.type && <p>Campo requedido</p>}
              </div>
              <button type="submit">Registrarse</button>
            </form>


            <p className="p-link">Ya tienes una cuenta? <Link to='/login' className="form-link">Ingresa Aqui!</Link></p>
          </section>
        </div>
      </main>
      <Toaster />
    </>
  )
}
