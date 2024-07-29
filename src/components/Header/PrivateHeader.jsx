import { useNavigate } from "react-router-dom"
import { Menu } from "./PublicMenu"
import { UsersMenu } from "./PrivateMenu"
import { userStore } from "../../context/userStore"
import '../../styles/headers.css'
import { SearchBar } from "./SearchBar"


export const PrivateHeader = () => {

  const user = userStore(state => state.user)

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

      <div className="user-container-menu">
        <div className="username-container">
          <p>{user.userName}</p>
        </div>
        <UsersMenu />
      </div>

    </header>

  )
}
