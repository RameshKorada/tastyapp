import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import Cookies from 'js-cookie'
import Hamburger from '../Hamburger'

import './index.css'

class Header extends Component {
  state = {
    hambergerStatus: false,
    colorStatus: true,
  }

  componentDidMount() {
    const {match} = this.props
    const {path} = match
    if (path === '/cart') {
      this.setState({colorStatus: false})
    }
  }

  onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
    console.log(history)
  }

  onCart = () => {
    this.setState({colorStatus: false})
  }

  onhamburger = () => {
    this.setState(prevState => ({hambergerStatus: !prevState.hambergerStatus}))
  }

  render() {
    const {hambergerStatus, colorStatus} = this.state

    const fontcolor = colorStatus ? 'home' : 'cart'
    const fontcolorCart = colorStatus ? 'cart' : 'home'

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
            <Link className={`linked-elements ${fontcolor}`} to="/">
              <li onClick={this.onHome}>Home</li>
            </Link>

            <li onClick={this.onCart}>
              <Link className={`linked-elements ${fontcolorCart}`} to="/cart">
                Cart
              </Link>
            </li>
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
              fontColor={fontcolor}
              fontColorCart={fontcolorCart}
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
