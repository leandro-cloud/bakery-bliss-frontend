import { useEffect } from 'react'
import { Routing } from './router/Routing'
import { axiosPrivateInstance } from './api/axios'
import { userStore } from './context/userStore'

function App() {

  const setUser = userStore(state => state.setUser)
  const setFavorites = userStore(state => state.setFavorites)
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await axiosPrivateInstance.get('/user/my-profile')
          setUser(response.data.user)
          localStorage.setItem('user', JSON.stringify(response.data.user))
          setFavorites(response.data.favorites)
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
    }
  }, [])

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <>
      <Routing />
    </>
  )
}

export default App
