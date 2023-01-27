import {Link} from 'react-router-dom'
import {MdStarRate} from 'react-icons/md'
import './index.css'

const AllRestaurants = props => {
  const {allRestauratnsList} = props
  const {
    resName,
    imageUrl,
    userRating,
    totalReview,
    id,
    kindName,
  } = allRestauratnsList

  return (
    <Link className="linked-elements" to={`/restaurant/${id}`}>
      <li testid="restaurant-item" className="rest-list">
        <div className="restimage-name-container">
          <img
            className="restaurant-images"
            src={imageUrl}
            alt="restaurant name"
          />
          <div className="name-fast-rating">
            <h1 className="res-name">{resName}</h1>
            <p className="fast-foodItems">{kindName}</p>
            <p className="reviews">
              <MdStarRate className="star" /> {userRating}
              <span className="total-span">({totalReview} ratings)</span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default AllRestaurants
