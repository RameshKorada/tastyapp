import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'

import './index.css'

const CartItem = props => {
  const {eachItem} = props
  const {name, cost, imageUrl, count} = eachItem
  return (
    <li testid="cartItem" className="cart-item-list ">
      <div className="cart-name-container">
        <img className="cart-image" src={imageUrl} alt={name} />
        <h1 className="item-name">{name}</h1>
      </div>
      <div className="add-container">
        <button className="add-remove-button" type="button">
          <BsDashSquare />
        </button>
        <p className="add-element">{count}</p>
        <button className="add-remove-button" type="button">
          <BsPlusSquare className="plus-minus-button" />
        </button>
      </div>
      <div className="cost-rupee">
        <BiRupee />
        <p className="cost-element">{cost}</p>
      </div>

      <div className="cart-item-list-mini ">
        <img className="cart-image" src={imageUrl} alt={name} />

        <div className="add-container-mini">
          <p className="item-name-mini">{name}</p>
          <div className="count-container-mini">
            <button className="add-remove-button" type="button">
              <BsDashSquare />
            </button>
            <span className="add-element">{count}</span>
            <button className="add-remove-button" type="button">
              <BsPlusSquare className="plus-minus-button" />
            </button>
          </div>
          <div className="cost-rupee-mini">
            <BiRupee className="rate" />
            <p className="cost-element-mini">{cost}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartItem
