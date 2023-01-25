import {Link} from 'react-router-dom'
import {MdCancel} from 'react-icons/md'
import './index.css'

const Hamburger = props => {
  const {
    fontColor,
    fontColorCart,
    onHome,
    onCart,
    onLogout,
    onhamburger,
  } = props
  const onhamburgerH = () => {
    onhamburger()
  }
  const onHomeH = () => {
    onHome()
  }
  const onCartH = () => {
    onCart()
  }
  const onLogoutH = () => {
    onLogout()
  }
  return (
    <div className="hamburger-container-div">
      <ul className="header-list-item-container">
        <Link className="linked-elements" to="/">
          <li className={fontColor} onClick={onHomeH}>
            Home
          </li>
        </Link>
        <Link className="linked-elements" to="/Cart">
          <li className={fontColorCart} onClick={onCartH}>
            Cart
          </li>
        </Link>
        <li>
          <button onClick={onLogoutH} type="button" className="header-logout">
            Logout
          </button>
        </li>
      </ul>
      <div className="cancel-button">
        <MdCancel className="cancel" onClick={onhamburgerH} />
      </div>
    </div>
  )
}
export default Hamburger
