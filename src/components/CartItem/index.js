import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import './index.css'

const CartItem = props => {
  const {eachItem} = props
  const {name, cost, imageUrl, count} = eachItem
  return (
    <li className="cart-item-list ">
      <div className="cart-name-container">
        <img className="cart-image" src={imageUrl} alt={name} />
        <p className="item-name">{name}</p>
      </div>
      <div className="add-container">
        <button className="add-remove-button" type="button">
          <BsDashSquare />
        </button>
        <span className="add-element">{count}</span>
        <button className="add-remove-button" type="button">
          <BsPlusSquare className="plus-minus-button" />
        </button>
      </div>
      <p className="cost-element">{cost}</p>
    </li>
  )
}

export default CartItem
