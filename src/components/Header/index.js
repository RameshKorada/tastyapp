import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import Cookies from 'js-cookie'
import Hamburger from '../Hamburger'

import './index.css'

class Header extends Component {
  state = {status: true, statusCart: true, hambergerStatus: false}

  componentDidMount() {
    this.setState({status: true, statusCart: false})
  }

  onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
    console.log(history)
  }

  onHome = () => {
    this.setState({status: false, statusCart: true})
  }

  onCart = () => {
    this.setState({statusCart: true, status: false})
  }

  onhamburger = () => {
    this.setState(prevState => ({hambergerStatus: !prevState.hambergerStatus}))
  }

  render() {
    const {status, statusCart, hambergerStatus} = this.state
    const fontColor = status ? 'header-home-cart' : 'header-home-cart-false'
    const fontColorCart = statusCart
      ? 'header-home-cart'
      : 'header-home-cart-false'

    return (
      <>
        <div className="header-container">
          <div className="header-logo-name">
            <Link className="linked-elements" to="/">
              <img
                src="https://res.cloudinary.com/dffvdqu7f/image/upload/v1673446497/Vector_lnt1u6.png"
                alt="website logo"
              />
            </Link>
            <p className="header-tasty-kitchens">Tasty Kitchens</p>
          </div>
          <ul className="header-list-items">
            <Link className="linked-elements" to="/">
              <li className={fontColor} onClick={this.onHome}>
                Home
              </li>
            </Link>
            <Link className="linked-elements" to="/Cart">
              <li className={fontColorCart} onClick={this.onCart}>
                Cart
              </li>
            </Link>
            <li>
              <button
                type="button"
                onClick={this.onLogout}
                className="header-logout"
              >
                Logout
              </button>
            </li>
          </ul>
          <div className="hamburger-container">
            <GiHamburgerMenu onClick={this.onhamburger} />
          </div>
        </div>
        <div>
          {hambergerStatus && (
            <Hamburger
              fontColor={fontColor}
              fontColorCart={fontColorCart}
              onHome={this.onHome}
              onCart={this.onCart}
              onLogout={this.onLogout}
              onhamburger={this.onhamburger}
            />
          )}
        </div>
      </>
    )
  }
}
export default withRouter(Header)
