import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dffvdqu7f/image/upload/v1674365966/Layer_1_oa5h1m.png"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p>
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <div>
      <Link to="/">
        <button className="home-page-button" type="button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
