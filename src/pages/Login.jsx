import { userStore } from "../context/userStore"
import { Link, Navigate, useNavigate } from "react-router-dom"
import '../styles/loginRegister.css'
import { axiosInstance } from "../api/axios"
import wallper from '../assets/images/walper.jpg'
import { useForm } from "react-hook-form"
import { Toaster, toast } from "sonner"
import { useState } from "react"
import { ForgotPassword } from "../components/ForgotPassword"

export const Login = () => {

  const user = userStore(state => state.user)
  const setUser = userStore(state => state.setUser)
  const setFavorites = userStore(state => state.setFavorites)
  const { register, formState: { errors }, handleSubmit } = useForm()
  const navigate = useNavigate()
  const [forgorPassword, setForgotPassword] = useState(false)

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/user/login', data)
      toast.success('Login exitoso', {
        className: 'toast-success'
      })
      setTimeout(() => {
        setUser(response.data.user)
        setFavorites(response.data.favorites)
        localStorage.setItem('user', true)
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
      <main className="main-container">
        <div className="login-container login">
          <section className="aside-container">
            <div className="image-container">
              <img src={wallper} />
            </div>
          </section>

          {!forgorPassword ? (
            <section className="form-container">
              <h2>Bienvenido</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input type="email" {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i })} placeholder="email" />
                  {errors.email?.type && errors.email?.type !== 'pattern' && <p>Campo requerido</p>}
                  {errors.email?.type === 'pattern' && <p>El formato del email es incorrecto</p>}
                </div>
                <div>
                  <input type="password" {...register("password", {
                    required: true
                  })} placeholder="password" />
                  {errors.password?.type && <p>Campo requerido</p>}
                </div>
                <button type="submit">Iniciar Sesion</button>
              </form>

              <a className='changepasswordlink' onClick={() => setForgotPassword(!forgorPassword)}>Olvidaste tu contraseña?</a>
              <p>No tienes una cuenta? <Link to='/registro' className="form-link">Registrate Aqui!</Link></p>
            </section>
          ) : (

            <ForgotPassword setForgotPassword={setForgotPassword} forgorPassword={forgorPassword}/>
          )}

        </div>

      </main>
      <Toaster />
    </>
  )
}
