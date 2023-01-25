import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Payment extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="payment-container">
          <img
            src="https://res.cloudinary.com/dffvdqu7f/image/upload/v1674480360/Vector_2_w2rvlu.png"
            alt="success"
          />
          <h1>Payment Successful</h1>
          <p className="thank-you">
            Thank you for ordering Your payment is successfully completed.
          </p>
          <div>
            <Link to="/">
              <button className="goto-home-button" type="button">
                Go To Home Page
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Payment
