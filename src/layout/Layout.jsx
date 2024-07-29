import { Outlet } from "react-router-dom"
import { Header } from "../components/Header/PublicHeader"
import { userStore } from "../context/userStore"
import { PrivateHeader } from "../components/Header/PrivateHeader"

export const Layout = () => {

  const user = userStore(state => state.user)

  return (
    <>
      {user ?
      <PrivateHeader /> :
      <Header />
      }
       <Outlet />
    </>
  )
}
