import { Link, useNavigate } from "react-router-dom"
import { Menu } from "./PublicMenu"
import '../../styles/headers.css'
import { SearchBar } from "./SearchBar"


export const Header = () => {

  const navigate = useNavigate()


  return (
    <header className="header">
      <div className="logo-container">
        <Menu />
        <div onClick={() => navigate('/')} className="title-app-container" title="Inicio">
          <h1 className="title">Bakery Bliss</h1>
        </div>
      </div>

      <SearchBar />

      <div className="link-container">
        <Link to='/registro' className="header-link header-register" >Registrate</Link>
        <Link to='/login' className="header-link" >Inicia Sesion</Link>
      </div>

    </header>
  )
}
