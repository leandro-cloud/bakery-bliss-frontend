import { useEffect, useState } from 'react'
import { axiosInstance, BASE_URL } from '../api/axios'
import defaultImage from '../assets/images/default-recipe-image.jpg'
import '../styles/carrousel.css'
import { MedalIcon, NextIcon, PrevIcon } from './icons/Icons'
import { useNavigate } from 'react-router-dom'
import { userStore } from '../context/userStore'
import { DIFFICULTY_LEVELS } from '../utils/constants'
import { BarComponent } from './Bars'

export const Carrousel = () => {
  const [images, setImages] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()
  const user = userStore(state => state.user)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosInstance.get('/recipes/best-recipes')
        setImages(response.data.topRatedRecipes)

      } catch (error) {
        console.log(error)
      }
    }
    fetchRecipes()
  }, [user])


  useEffect(() => {
    const interval = setTimeout(() => {
      setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }, 6000)
    return () => clearInterval(interval)
  }, [selectedIndex])

  const previous = () => {
    setSelectedIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const next = () => {
    setSelectedIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const handleReceta = () => {
    navigate(`/receta/${images[selectedIndex]._id}`)
  }


  return (
    <>
      <main className="main-carrousel">
        {images.length === 0 ? (
          <p>No hay imágenes que mostrar</p>
        ) : (
          <section className='carrousel-section'>
            <div className='carrousel-conainer'>
              <div className='top-title'>
                <MedalIcon />
                Mejores Recetas
                </div>
              <button onClick={previous} className='prev-button button'>
                <PrevIcon />
              </button>
              {images.map((image, index) => (
                <div key={index} className={`carousel-item ${index === selectedIndex ? 'active' : ''}`}>
                  <img
                    src={image.image === 'default.png' ? defaultImage : `${BASE_URL}/recipes/recipe-image/${image.image}`}
                    alt="Recipe"
                    className={index === selectedIndex ? 'image active' : 'image'}
                  />
                  <div className={index === selectedIndex ? 'detail active' : 'detail'}>
                    <h3>{image.title}</h3>
                    <BarComponent rate={image.averageRating}/>
                    <p>Dificultad: <strong>{DIFFICULTY_LEVELS[image.difficulty]}</strong></p>
                    <button onClick={handleReceta}>VER RECETA</button>
                  </div>
                </div>
              ))}
              <button onClick={next} className='next-button button'>
                <NextIcon />
              </button>
              <div className='dot-container'>
                {images.map((_, index) => {
                  const classname = index === selectedIndex ? 'selected' : ''
                  return (
                    <div key={index} className={`dot ${classname}`}></div>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
}
