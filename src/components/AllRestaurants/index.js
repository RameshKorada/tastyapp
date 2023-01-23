import './index.css'
import {Link} from 'react-router-dom'

const AllRestaurants = props => {
  const {allRestauratnsList} = props
  const {resName, imageUrl, userRating, totalReview, id} = allRestauratnsList
  return (
    <li className="rest-list">
      <Link className="linked-elements" to={`/restaurant/${id}`}>
        <div className="restimage-name-container">
          <img
            className="restaurant-images"
            src={imageUrl}
            alt="restaurant name"
          />
          <div className="name-fast-rating">
            <p className="res-name">{resName}</p>
            <p className="fast-foodItems">Faast Food</p>
            <p className="reviews">
              {userRating}
              <span className="total-span">({totalReview} ratings)</span>
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default AllRestaurants
