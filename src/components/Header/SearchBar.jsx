import { useNavigate } from "react-router-dom"
import { SearchIcon } from "../icons/Icons"

export const SearchBar = () => {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target).get('search-recipe')
    navigate(`/search?title=${formData}`)
  }

  return (
    <form className="barra-busqueda-container" onSubmit={handleSubmit}>
      <input type="text" name="search-recipe" placeholder="Buscar receta" className="search-input"/>
      <button type="submit" className="search-icon">
        <SearchIcon />
      </button>
    </form>
  )
}
