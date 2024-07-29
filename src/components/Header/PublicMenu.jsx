import { useEffect, useState } from "react"
import { HambuegerIcon } from "../icons/Icons"
import { axiosInstance } from "../../api/axios"
import { useNavigate } from "react-router-dom"
import { DIFFICULTY_LEVELS } from "../../utils/constants"

export const Menu = () => {

  const [categorias, setCategorias] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/categories/get-categories')
        setCategorias(response.data.categories)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories()
  }, [])

  const handleCategory = (id, name) => {
    navigate(`/buscar-por-categoria?category=${id}&name=${name}`)
  }

  const handleDifficulty = (key, name) => {
    navigate(`/buscar-por-dificultad?difficulty=${key}&name=${name}`)
  }

  return (
    <aside className="menu-container">
      
      <div className="menu">
        <HambuegerIcon />
        <div className="menu-desplegable">
          <div className="menu-categorias">
            <h3>BUSCAR POR CATEGORIA</h3>
            <div className="categorias-container">
              <ul className="uls ul-categorias">
                {categorias?.map((categoria) => (
                  <li key={categoria._id} onClick={() => handleCategory(categoria._id, categoria.category)}>{categoria.category}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="menu-dificultad">
            <h3>BUSCAR POR DIFICULTAD</h3>
            <div className="difficultad-container">
              <ul className="uls ul-dificultad">
                {Object.entries(DIFFICULTY_LEVELS).map(([key, value]) => (
                  <li key={key} onClick={() => handleDifficulty(key, value)}>{value}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
