import {MdStarRate} from 'react-icons/md'
import {BiRupee} from 'react-icons/bi'

const RestuarentListItem = props => {
  const {each} = props
  const {
    resImg,
    resName,
    kindName,
    location,
    rating,
    reviewCount,
    costPerTwo,
  } = each
  return (
    <li className="restaurant-bg">
      <img className="restaurant-image-banner" src={resImg} alt="restaurant" />
      <div>
        <h1 className="rest-name">{resName}</h1>
        <p className="rest-kindname">{kindName}</p>
        <p className="rest-profile">{location}</p>
        <div className="rating-cost-container">
          <div>
            <p className="cost-rating">
              <MdStarRate className="star" />
              {rating}
            </p>
            <p className="rating-cost">{reviewCount}+ratings</p>
          </div>
          <hr className="hr-line" />
          <div className="cost-per-two">
            <p className="cost-rating">
              <BiRupee /> {costPerTwo}
            </p>
            <p className="rating-cost">cost for two</p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default RestuarentListItem
