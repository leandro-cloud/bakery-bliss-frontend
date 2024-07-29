import noResultsImage from '../assets/images/no-results.jpeg'
import '../styles/no-results.css'

export const NoResults = () => {
  return (
    <div className="no-results-container-image">
      <img src={noResultsImage} className='no-results-image'/>
    </div>
  )
}
