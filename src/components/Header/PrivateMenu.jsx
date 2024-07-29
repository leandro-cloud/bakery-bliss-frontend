import { useNavigate } from "react-router-dom"
import { userStore } from "../../context/userStore"
import { axiosPrivateInstance, BASE_URL } from "../../api/axios"
import defaultUserImage from '../../assets/images/user.png'
import { BookIcon, ConfigIcon, ExitIcon, FavoriteIcon, UploadIcon } from "../icons/Icons"

export const UsersMenu = () => {

  const navigate = useNavigate()
  const user = userStore(state => state.user)
  const setUser = userStore(state => state.setUser)
  const setFavorites = userStore(state => state.setFavorites)

  const handleNavigate = (ruta) => () => {
    navigate(ruta)
  }

  const handleLogout = async () => {
    try {
      await axiosPrivateInstance.post('/user/logout')
    } catch (error) {
      console.error(error)
    } finally {
      localStorage.removeItem('user')
      setUser(null)
      setFavorites([])
      navigate('/')
    }
  }

  return (
    <aside className="user-menu-container">
      <div className="user-menu">
        <div className="user-image">
          <img src={user.profileImage === 'default.png' || user.profileImage === undefined ? defaultUserImage : `${BASE_URL}/user/profile-picture/${user.profileImage}`} />
        </div>
        <div className="user-menu-desplegable">
          <div onClick={handleNavigate('/favoritos')}>
            <FavoriteIcon />
            MIS FAVORITOS
          </div>
          <div onClick={handleNavigate('/mis-recetas')}>
            <BookIcon />
            MIS RECETAS
          </div>
          <div onClick={handleNavigate('/crear-receta')}>
            <UploadIcon width={'18px'} height={'18px'} />
            CREAR RECETA
          </div>
          <div onClick={handleNavigate('/editar-perfil')}>
            <ConfigIcon />
            EDITAR PERFIL
          </div>
          <div onClick={handleLogout}>
            <ExitIcon />
            CERRAR SESION
          </div>
        </div>
      </div>

    </aside>
  )
}
