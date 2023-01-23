import {Link} from 'react-router-dom'
import './index.css'

const NoOrdersContainer = () => (
  <div className="noOrder-container">
    <img
      src="https://res.cloudinary.com/dffvdqu7f/image/upload/v1673600969/cooking_1_rusfrb.png"
      alt="empty cart"
    />
    <h1>No Order Yet!</h1>
    <p>Your cart is empty. Add something from the menu.</p>
    <Link to="/">
      <button className="ordernow-button" type="button">
        Order Now
      </button>
    </Link>
  </div>
)

export default NoOrdersContainer
