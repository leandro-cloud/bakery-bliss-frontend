import axios from 'axios'
// import { userStore } from '../context/userStore'

export const BASE_URL = 'http://localhost:3000/api'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})


export const axiosPrivateInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

const refreshAccessToken = async () => {
  try {
    await axiosInstance.post('/user/refresh-token')
  } catch (error) {
    localStorage.removeItem('user')
    //userStore.getState().setUser(null)
    throw new Error("Error al refrescar el token")
  }
}

axiosPrivateInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config 
    console.log(originalRequest)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await refreshAccessToken()
        return axiosPrivateInstance(originalRequest)
      } catch (error) {
        throw new Error(error)
      }
    }

    return Promise.reject(error)
  }
)