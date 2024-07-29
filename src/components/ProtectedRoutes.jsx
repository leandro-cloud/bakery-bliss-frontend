import { userStore } from '../context/userStore'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoutes = () => {
  const user = userStore(state => state.user)
  
  if (!user) {
    return <Navigate to='/' replace/>
  }

  return  <Outlet />
}
