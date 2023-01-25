import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
// import {FaPinterestSquare} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="foot-tasty">
        <img
          className="tasty-foot-image"
          src="https://res.cloudinary.com/dffvdqu7f/image/upload/v1673629419/Vector_1_l9skbt.png"
          alt="website-footer-logo"
        />
        <h1 className="tasty-foot-name">Tasty Kitchens</h1>
      </div>
      <p className="tasty-foot-para">
        The only thing we are serious about is food. Contact us on
      </p>
      <FaPinterestSquare
        testid="pintrest-social-icon"
        className="tasty-foot-icons"
      />
      <FaInstagram
        testid="instagram-social-icon"
        className="tasty-foot-icons"
      />
      <FaTwitter testid="twitter-social-icon" className="tasty-foot-icons" />
      <FaFacebookSquare
        testid="facebook-social-icon"
        className="tasty-foot-icons"
      />
    </div>
  )
}
